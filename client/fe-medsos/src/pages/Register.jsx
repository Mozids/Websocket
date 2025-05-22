import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import { CardRegister } from "../utils/style";
import { SignInContainer } from "../utils/style";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMajor } from "../redux/action/majorAction";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (value) => console.log(value);
  const major = useSelector((root) => root?.major);
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchMajor()), []);

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <CardRegister variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                // error={emailError}
                // helperText={emailErrorMessage}
                id="username"
                type="text"
                name="username"
                placeholder="username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                {...register("username")}
                // color={emailError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                // error={emailError}
                // helperText={emailErrorMessage}
                id="email"
                type="text"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                {...register("email")}
                // color={emailError ? 'error' : 'primary'}
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
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            >
              <Grid size={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <TextField
                    // error={emailError}
                    // helperText={emailErrorMessage}
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    autoComplete="firstName"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    {...register("firstName")}
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <TextField
                    // error={emailError}
                    // helperText={emailErrorMessage}
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    autoComplete="lastName"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    {...register("lastName")}
                    // color={emailError ? 'error' : 'primary'}
                  />
                </FormControl>
              </Grid>
              <Grid size={6} marginTop={1}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    // value={age}
                    label="Gender"
                    {...register("gender")}
                  >
                    <MenuItem value={"M"}>Male</MenuItem>
                    <MenuItem value={"F"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={6} marginTop={1}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Classes</InputLabel>
                  <Select
                    // value={age}
                    label="Classes"
                    {...register("classes")}
                  >
                    <MenuItem value={"X"}>X</MenuItem>
                    <MenuItem value={"XI"}>XI</MenuItem>
                    <MenuItem value={"XII"}>XII</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Majors</InputLabel>
              <Select
                id="demo-simple-select"
                // value={age}
                {...register("major")}
                label="Major"
              >
                {major?.data?.map((m, i) => (
                  <MenuItem key={i} value={"PPLG"}>
                    {m?.name}
                  </MenuItem>
                ))}
              </Select>
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
                Login Here
              </Link>
            </center>
          </Box>
        </CardRegister>
      </SignInContainer>
    </>
  );
};

export default Register;
