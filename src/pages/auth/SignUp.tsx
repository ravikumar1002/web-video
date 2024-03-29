import { Container, Grid, Box, Typography, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { FC, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/FormInput";
import { GoogleLogo, GitHubLogo } from "../../assets";
import { LinkItem, OauthMuiLink } from "./Login";
import { useNavigate, useLocation } from "react-router-dom";
import { signupThunk } from "../../thunk/authThunk";
import { useAppDispatch } from "../../store/reduxHook";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const signupSchema = object({
  name: string().min(1, "Name is required").max(70),
  email: string().min(1, "Email is required").email("Email is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

type ISignUpSchema = TypeOf<typeof signupSchema>;

export const SignupPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues: ISignUpSchema = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const methods = useForm<ISignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<ISignUpSchema> = (
    values: ISignUpSchema
  ) => {
    dispatch(signupThunk(values));
    navigate(location?.state?.from?.pathname || "/", { replace: true });
  };

  useEffect(() => {
    useDocumentTitle("SignUP");
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: { xs: "#fff", md: "#f4f4f4" } }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Grid
          item
          sx={{ maxWidth: "70rem", width: "100%", backgroundColor: "#fff" }}
        >
          <Grid
            container
            sx={{
              boxShadow: { sm: "0 0 5px #ddd" },
              py: "1rem",
              px: "1rem",
            }}
          >
            <FormProvider {...methods}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  mb: "1rem",
                  pb: { sm: "1rem" },
                }}
              >
                Welcome To Web Video!
              </Typography>
              <Grid
                item
                container
                justifyContent="center"
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: "45rem" },
                  marginInline: "auto",
                }}
              >
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ paddingRight: { sm: "3rem" } }}
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{ textAlign: "center", mb: "1.5rem" }}
                    >
                      Create new your account
                    </Typography>

                    <FormInput
                      label="Name"
                      type="text"
                      name="name"
                      focused
                      required
                    />
                    <FormInput
                      label="Enter your email"
                      type="email"
                      name="email"
                      focused
                      required
                    />
                    <FormInput
                      type="password"
                      label="Password"
                      name="password"
                      required
                      focused
                    />
                    <FormInput
                      type="password"
                      label="Confirm Password"
                      name="passwordConfirm"
                      required
                      focused
                    />

                    <LoadingButton
                      loading={false}
                      type="submit"
                      variant="contained"
                      sx={{
                        py: "0.8rem",
                        mt: 2,
                        width: "80%",
                        marginInline: "auto",
                      }}
                    >
                      Sign Up
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Stack sx={{ mt: "3rem", textAlign: "center" }}>
                  <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
                    Already have an account?{" "}
                    <LinkItem to="/login" replace={true}>
                      Login
                    </LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
