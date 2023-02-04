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
import { FieldValues } from "react-hook-form/dist/types";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/redux/ConfigureStore";
import { signInUser } from "../../app/redux/slices/accountSlice";

const theme = createTheme();

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "all",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function submitForm(data: FieldValues) {
    await dispatch(signInUser(data));
    navigate("/catalog");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          style={{ width: "500px", height: "500px", padding: "20px" }}
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
              onSubmit={handleSubmit(submitForm)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                autoFocus
                //name="email"
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
                // name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password required",
                })}
              />

              <Grid item>
                <Link to="/register">{"Don't have an account? Sign Up"}</Link>
              </Grid>
              <LoadingButton
                loading={isSubmitting}
                disabled={!isValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
