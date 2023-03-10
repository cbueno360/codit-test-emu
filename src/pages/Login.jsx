import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../hooks/useAuth";
import { MicrosoftLoginButton } from "react-social-login-buttons";

export const LoginPage = () => {
  const { login } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5"></Typography>
        <Box>
          <MicrosoftLoginButton onClick={() => login()}>
            Sing in with Microsoft
          </MicrosoftLoginButton>
        </Box>
      </Box>
    </Container>
  );
};
