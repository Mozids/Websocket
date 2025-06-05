import { Box, Button, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import { Card } from "../utils/style";
import { SignInContainer } from "../utils/style";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../redux/action/authAction";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { auth } = useSelector(root => root);
  const dispatch = useDispatch();

  const onSubmit = (value) => dispatch(authLogin(value));
  
  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
                <FormLabel htmlFor="username">username</FormLabel>
                <TextField
                // error={emailError}
                // helperText={emailErrorMessage}
                id="username"
                type="username"
                name="username"
                placeholder="username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                {...register("username")}
                // color={emailError 
                // ? 'error' : 'primary'}
                />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                // error={passwordError}
                // helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                {...register("password")}
                // color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            //   onClick={validateInputs}
            >
              Sign in
            </Button>
            <center>
                <Link to={"/register"} style={{ textDecoration: "none" }}>
                    Register Here
                </Link>
            </center>
            {
              !!auth?.err &&
              !!auth?.err?.errors &&
              auth?.err?.errors?.map((e, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  color="error"
                  sx={{ textAlign: "center" }}
                >
                  {e?.path}
                  {e?.msg}
                </Typography>
              ))
            }
        </Box> 
        </Card>
      </SignInContainer>
    </>
  );
};

export default Login;
