import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {signInGooglePopup, signup} from "../data/authFunctions"; // , signup
import { UserInterface } from "../types/authentication";
import ErrorsDisplay from "./ErrorsDisplay";
import { useNavigate } from "react-router-dom";
import { uploadProfileImg } from "../data/photoData";
import {EMAIL_REGEX, sanitizeDisplayName, validateImageType} from "../utils/middleware";
import imageCompression from "browser-image-compression";
import { ImageCompressionWorkerInterface } from "../types/appTypes";

export default function HootSignup() {
  const [createdUser, setCreatedUser] = useState<UserInterface>({
    displayName: "",
    photoURL: "",
    email: "",
    isVerified: false,
    password: "",
    verifyPassword: "",
  });
  const [profileImage, setProfileImage] = useState<string>("");
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);
  const [errors, setErrors] = useState<string[]>([]);
  const [registerDisabled, setRegisterDisabled] = useState<boolean>(true);
  const [webWorkerData, setWebWorkerData] = useState<ImageCompressionWorkerInterface>({
    progress: 0,
    inputSize: "",
    outputSize: "",
    inputUrl: "",
    outputUrl: "",
  });
  const navigate = useNavigate();
  const FormControlLabelText: React.ReactNode = (
    <Typography variant="body2" color="textSecondary">
      By signing up, you agree to our{" "}
      <Link href="/terms-of-service" color="inherit">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" color="inherit">
        Privacy Policy
      </Link>
    </Typography>
  );

  /***************** COMPRESSION **********************************/

  const handleOnProgress = (progress: number, useWebWorker: boolean) => {
    if (useWebWorker) {
      setWebWorkerData({
        ...webWorkerData,
        progress,
      });
    }
  };

  const handleCompressImage = async (file: File, fileType: string) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      onProgress: (p: number) => handleOnProgress(p, true),
      fileType: fileType,
    };
    setWebWorkerData({
      ...webWorkerData,
      inputSize: (file.size / 1024 / 1024).toFixed(2),
      inputUrl: URL.createObjectURL(file),
    });
    const result = await imageCompression(file, options);
    setWebWorkerData({
      ...webWorkerData,
      outputSize: (file.size / 1024 / 1024).toFixed(2),
      outputUrl: URL.createObjectURL(file),
    });
    return result;
  };

  const uploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files !== null && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setProfileImage(url);
      await handleCompressImage(files[0], files[0].type).then((result) => {
        const file = new File([result], result.name, { type: result.type });
        setFileToUpload(file);
      });
    } else {
      setFileToUpload(undefined);
      setProfileImage("");
    }
  };

  const checkEmptyValues = () => {
    setErrors([]);
    if (
      createdUser.displayName === "" ||
      createdUser.email === "" ||
      createdUser.password === "" ||
      createdUser.verifyPassword === ""
    ) {
      setErrors((errors) => [...errors, "All fields are required!"]);
      return false;
    }
    if (createdUser.password !== createdUser.verifyPassword) {
      setErrors((errors) => [...errors, "Passwords do not match!"]);
      return false;
    }
    if (
      createdUser.displayName.length < 6 ||
      createdUser.displayName.length > 20
    ) {
      setErrors((errors) => [
        ...errors,
        "Display name must be between 6 and 20 characters!",
      ]);
      return false;
    }
    if (!EMAIL_REGEX.test(createdUser.email)) {
      setErrors((errors) => [...errors, "Email is not valid!"]);
      return false;
    }
    if (fileToUpload === undefined) {
      setErrors((errors) => [...errors, "Please upload a profile image!"]);
      return false;
    }
    if (fileToUpload !== undefined) {
      if (!validateImageType(fileToUpload)) {
        setErrors((errors) => [...errors, "Valid Uploads are JPEG, PNG, or JPG"]);
        return false;
      }
    }

    return true;
  };

  const handleCreateUserSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const user: UserInterface = {
      displayName: createdUser.displayName,
      photoURL: profileImage,
      email: createdUser.email,
      isVerified: false,
      password: createdUser.password,
      verifyPassword: createdUser.verifyPassword,
    };
    // prevent form submission if there are errors
    if (!checkEmptyValues()) return;

    try {
      // sign up the user
      await signup(user)
        .then((res) => {
          if (res !== undefined) {
            uploadProfileImg(res.user, fileToUpload);
            navigate("/explore");
          }
        })
        .catch((err) => {
          console.error([err.code] + `: ${err.message}`);
          if (err.code === "auth/email-already-in-use") {
            setErrors((errors) => [...errors, "Email is already in use!"]);
          } else if (err.code === "auth/invalid-email") {
            setErrors((errors) => [...errors, "Email is not valid!"]);
          } else if (err.code === "auth/weak-password") {
            setErrors((errors) => [...errors, err.message]);
          } else if (err.code === "auth/empty-values") {
            setErrors((errors) => [...errors, "All fields are required!"]);
          } else {
            setErrors((errors) => [...errors, "Something went wrong!"]);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (fileToUpload === undefined) {
      setErrors((errors) => [...errors, "Please upload a profile image!"]);
      return;
    }
    if (fileToUpload !== undefined) {
      if (!validateImageType(fileToUpload)) {
        setErrors((errors) => [...errors, "Valid Uploads are JPEG, PNG, or JPG"]);
        return;
      }
    }

    try {
      await signInGooglePopup()
        .then((res) => {
          if (res.cred !== null && !res.exists) {
            uploadProfileImg(res.cred.user, fileToUpload);
            navigate("/explore");
          } else if (res.cred !== null && res.exists) {
            navigate("/explore");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        role="sign-up-page-container"
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>Sign Up</Typography>
        <Box
          component="form"
          noValidate
          // onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          role="signup-form"
        >
          {" "}
          {/* todo: change the handleSubmit to the button for createAccount - add separate validation for google */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <ErrorsDisplay errors={errors} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                {webWorkerData.progress > 0 && (
                  <span> Compressing {webWorkerData.progress} %</span>
                )}
                {profileImage ? (
                  <>
                    <img src={profileImage} alt="Image Preview" width="100%" />
                  </>
                ) : (
                  <></>
                )}
              </Box>
              <Button
                fullWidth
                component="label"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                Please Select A Profile Image
                <input
                  id="add-image-for-upload"
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  hidden={true}
                  onChange={uploadProfileImage}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setCreatedUser({
                    ...createdUser,
                    displayName: sanitizeDisplayName(event.target.value),
                  });
                }}
                value={createdUser.displayName}
                required
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                autoComplete="display-name"
                role="display-name-input"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setCreatedUser({
                    ...createdUser,
                    email: event.target.value,
                  });
                }}
                value={createdUser.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                role="email-input"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setCreatedUser({
                    ...createdUser,
                    password: event.target.value,
                  });
                }}
                value={createdUser.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                role="password-input"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setCreatedUser({
                    ...createdUser,
                    verifyPassword: event.target.value,
                  });
                }}
                value={createdUser.verifyPassword}
                required
                fullWidth
                name="verifyPassword"
                label="Verify Password"
                type="password"
                id="verifyPassword"
                autoComplete="new-password"
                role="verify-password-input"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!registerDisabled}
                    onChange={(event) => {
                      setRegisterDisabled(!event.target.checked);
                    }}
                    inputProps={{ "aria-label": "submit-checkbox-agreement" }}
                  />
                }
                label={FormControlLabelText}
                labelPlacement="end"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={registerDisabled}
            onClick={handleCreateUserSubmit}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Typography textAlign="center"> - or -</Typography>
          <Button
            fullWidth
            disabled={registerDisabled}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGoogleSignin}
          >
            Sign In with Google!
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
