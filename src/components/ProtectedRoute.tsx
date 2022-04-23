import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import { Backdrop, CircularProgress } from "@mui/material";
import HootLogin from "./HootLogin";

interface Props {
  component: React.ComponentType;
  fallback?: React.ComponentType;
  path?: string;
}

// const LoadingBackdrop = () => {
//   const [open, setOpen] = useState(true);
//   const handleClose = () => {
//     setOpen(!open)
//   }
//   return (
//     <>
//       <Backdrop
//         sx={{
//           color: '#fff',
//           zIndex: (theme) => theme.zIndex.drawer + 1
//         }}
//         open={open}
//         onClick={handleClose}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </>

//   )
// }

export const ProtectedRoute: React.FC<Props> = ({
  component: RouteCompoonent,
  fallback: FallbackComponent,
}) => {
  const authValue = useContext(AuthContext);

  if (!FallbackComponent) FallbackComponent = HootLogin;

  if (authValue) return <RouteCompoonent />;

  return <FallbackComponent />;
};
