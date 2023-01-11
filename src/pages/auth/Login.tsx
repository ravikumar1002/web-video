import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { FC } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "@emotion/styled";
import FormInput from "../../components/FormInput";
import { GoogleLogo, GitHubLogo } from "../../assets";
import { loginThunk } from "../../thunk/authThunk";
import { useAppDispatch } from "../../store/reduxHook";

export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #3683dc;
  &:hover {
    text-decoration: underline;
    color: #5ea1b6;
  }
`;

export const OauthMuiLink = styled(MuiLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6f7;
  border-radius: 1;
  padding: 0.6rem 0;
  column-gap: 1rem;
  text-decoration: none;
  color: #393e45;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
  }
`;

const LoginSchema = object({
  email: string().min(1, "Email is required").email("Email is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

type ILogin = TypeOf<typeof LoginSchema>;

export const LoginPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues: ILogin = {
    email: "",
    password: "",
  };

  const methods = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<ILogin> = (values: ILogin) => {
    dispatch(loginThunk(values));
    navigate(location?.state?.from?.pathname || "/", { replace: true });
  };

  return (
    <Container
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: { xs: "#fff", md: "#f4f4f4" } }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid item xs={8}>
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
              container
              sx={{
                boxShadow: { sm: "0 0 5px #ddd" },
                py: "6rem",
                px: "1rem",
              }}
            >
              <Grid
                item
                container
                justifyContent="space-between"
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: "45rem" },
                  marginInline: "auto",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ borderRight: { sm: "1px solid #ddd" } }}
                >
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
                      Log into your account
                    </Typography>

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
                      Login
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Stack sx={{ mt: "3rem", textAlign: "center" }}>
                <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
                  Need an account?
                  <LinkItem to="/signup">Sign up here</LinkItem>
                </Typography>
              </Stack>
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
    </Container>
  );
};
