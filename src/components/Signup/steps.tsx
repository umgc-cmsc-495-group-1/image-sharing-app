import React from "react";
import {
  TextField
} from "@mui/material";

const username = () => {
  return (
    <>
      <TextField
        required
        fullWidth
        id="username"
        label="User Name"
        name="username"
        autoComplete="username"
        role="username-input"
      />
    </>
  )
}

const displayname = () => {
  return (
    <>
      <TextField
        required
        fullWidth
        id="displayName"
        label="Display Name"
        name="displayName"
        autoComplete="display-name"
        role="display-name-input"
      />
    </>
  )
}

const email = () => {
  return (
    <>
      <TextField
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        role="email-input"
      />
    </>
  )
}

const password = () => {
  return (
    <>
      <TextField
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        role="password-input"
      />
    </>
  )
}

const verifypassword = () => {
  return (
    <>
      <TextField
        required
        fullWidth
        name="verifyPassword"
        label="Verify Password"
        type="password"
        id="verifyPassword"
        autoComplete="new-password"
        role="verify-password-input"
      />
    </>
  )
}

const steps = [
  {
    label: 'Welcome to Hoot!',
    description: `We are a simple image sharing app designed to help you connect with your friends.
    Lets get you started by creating an account.`,
    userInput: <></>,
  },
  {
    label: 'Create Username',
    description:
      'This is the username that is unique to your account. It is used to identify your account.',
    userInput: username(),
  },
  {
    label: 'Create Display Name',
    description:
      'This is the display name that will be shown across the application.',
    userInput: displayname(),
  },
  {
    label: 'Enter your Email Address',
    description:
      'Please enter your email address to create an account.',
    userInput: email(),
  },
  {
    label: 'Enter a Password',
    description:
      'Please enter a password to create an account.',
    userInput: password(),
  },
  {
    label: 'Please Verify Password',
    description:
      'Please verify your password to create an account.',
    userInput: verifypassword(),
  },
]

export {
  steps
}
