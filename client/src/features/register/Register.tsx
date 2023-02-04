import { ThemeProvider } from "@emotion/react";
import {
  Typography,
  createTheme,
  Container,
  CssBaseline,
  Box,
  Avatar,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/redux/ConfigureStore";
import agent from "../../app/api/agent";
import { useState } from "react";
import { Pattern } from "@mui/icons-material";
import { toast } from "react-toastify";
import { Toast } from "react-toastify/dist/components";

const theme = createTheme();

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          style={{ width: "500px", height: "600px", padding: "20px" }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit((data) =>
                agent.Account.register(data)
                  .then(() => {
                    toast.success(
                      "Registration successful - you can now login"
                    );
                    navigate("/account");
                  })
                  .catch((error) => handleApiErrors(error))
              )}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoFocus
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                    message: "Not a valid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors?.email?.message?.toString()}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                {...register("userName", {
                  required: "Username required",
                })}
                error={!!errors.userName}
                helperText={errors?.userName?.message?.toString()}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password required",
                  pattern: {
                    value:
                      /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message: "Password is not complex enough",
                  },
                })}
                error={!!errors.password}
                helperText={errors?.password?.message?.toString()}
              />
              <Grid container>
                <Grid item>
                  <Link to="/account">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>

              <LoadingButton
                loading={isSubmitting}
                disabled={!isValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </LoadingButton>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
