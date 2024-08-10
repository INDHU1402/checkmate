import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { credentials } from "../../../Validation/validation";
import { createToast } from "../../../Utils/toastUtils";
import { register } from "../../../Features/Auth/authSlice";
import { useParams } from "react-router-dom";
import background from "../../../assets/Images/background_pattern_decorative.png";
import Logo from "../../../assets/icons/bwu-icon.svg?react";
import Mail from "../../../assets/icons/mail.svg?react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Check from "../../../Components/Check/Check";
import Button from "../../../Components/Button";
import Field from "../../../Components/Inputs/Field";
import axiosInstance from "../../../Utils/axiosConfig";
import "../index.css";

const LandingPage = ({ isAdmin, onSignup }) => {
  const theme = useTheme();

  return (
    <>
      <Stack gap={theme.gap.large} alignItems="center" textAlign="center">
        <Box>
          <Typography component="h1">Sign Up</Typography>
          <Typography>
            Create your {isAdmin ? "admin " : ""}account to get started.
          </Typography>
        </Box>
        <Box width="100%">
          <Button
            level="secondary"
            label="Sign up with Email"
            img={<Mail />}
            onClick={onSignup}
            sx={{
              width: "100%",
              "& svg": {
                mr: theme.gap.small,
              },
            }}
          />
        </Box>
        <Box maxWidth={400}>
          <Typography className="tos-p">
            By signing up, you agree to our{" "}
            <Typography component="span">Terms of Service</Typography> and{" "}
            <Typography component="span">Privacy Policy.</Typography>
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

const StepOne = ({ form, errors, onSubmit, onChange, onBack }) => {
  const theme = useTheme();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Stack gap={theme.gap.large} textAlign="center">
        <Box>
          <Typography component="h1">Sign Up</Typography>
          <Typography>Enter your personal details</Typography>
        </Box>
        <Box textAlign="left">
          <form noValidate spellCheck={false} onSubmit={onSubmit}>
            <Field
              id="register-firstname-input"
              label="Name"
              isRequired={true}
              placeholder="Jordan"
              autoComplete="given-name"
              value={form.firstName}
              onChange={onChange}
              error={errors.firstName}
              ref={inputRef}
            />
          </form>
          <form noValidate spellCheck={false} onSubmit={onSubmit}>
            <Box my={theme.gap.ml}>
              <Field
                id="register-lastname-input"
                label="Surname"
                isRequired={true}
                placeholder="Ellis"
                autoComplete="family-name"
                value={form.lastName}
                onChange={onChange}
                error={errors.lastName}
              />
            </Box>
          </form>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Button
            level="secondary"
            label="Back"
            animate="slideLeft"
            img={<ArrowBackRoundedIcon />}
            onClick={onBack}
            sx={{
              mb: theme.gap.medium,
              px: theme.gap.ml,
              "& svg.MuiSvgIcon-root": {
                mr: theme.gap.xs,
              },
            }}
            props={{ tabIndex: -1 }}
          />
          <Button
            level="primary"
            label="Continue"
            onClick={onSubmit}
            disabled={(errors.firstName || errors.lastName) && true}
            sx={{ width: "30%" }}
          />
        </Stack>
      </Stack>
    </>
  );
};

const StepTwo = ({ form, errors, onSubmit, onChange, onBack }) => {
  const theme = useTheme();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Stack gap={theme.gap.large} textAlign="center">
        <Box>
          <Typography component="h1">Sign Up</Typography>
          <Typography>Enter your email address</Typography>
        </Box>
        <Box textAlign="left">
          <form noValidate spellCheck={false} onSubmit={onSubmit}>
            <Field
              type="email"
              id="register-email-input"
              label="Email"
              isRequired={true}
              placeholder="jordan.ellis@domain.com"
              autoComplete="email"
              value={form.email}
              onChange={onChange}
              error={errors.email}
              ref={inputRef}
            />
          </form>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Button
            level="secondary"
            label="Back"
            animate="slideLeft"
            img={<ArrowBackRoundedIcon />}
            onClick={onBack}
            sx={{
              mb: theme.gap.medium,
              px: theme.gap.ml,
              "& svg.MuiSvgIcon-root": {
                mr: theme.gap.xs,
              },
            }}
            props={{ tabIndex: -1 }}
          />
          <Button
            level="primary"
            label="Continue"
            onClick={onSubmit}
            disabled={errors.email && true}
            sx={{ width: "30%" }}
          />
        </Stack>
      </Stack>
    </>
  );
};

const StepThree = ({ form, errors, onSubmit, onChange, onBack }) => {
  const theme = useTheme();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Stack gap={theme.gap.large} textAlign="center">
        <Box>
          <Typography component="h1">Sign Up</Typography>
          <Typography>Create your password</Typography>
        </Box>
        <Box textAlign="left">
          <form noValidate spellCheck={false} onSubmit={onSubmit}>
            <Field
              type="password"
              id="register-password-input"
              label="Password"
              isRequired={true}
              placeholder="Create a password"
              autoComplete="current-password"
              value={form.password}
              onChange={onChange}
              error={errors.password}
              ref={inputRef}
            />
          </form>
          <form noValidate spellCheck={false} onSubmit={onSubmit}>
            <Box mt={theme.gap.ml}>
              <Field
                type="password"
                id="register-confirm-input"
                label="Confirm password"
                isRequired={true}
                placeholder="Confirm your password"
                autoComplete="current-password"
                value={form.confirm}
                onChange={onChange}
                error={errors.confirm}
              />
            </Box>
          </form>
          <Stack gap={theme.gap.small} my={theme.gap.large}>
            <Check
              text="Must be at least 8 characters long"
              variant={
                errors?.password === "Password is required"
                  ? "error"
                  : form.password === ""
                  ? "info"
                  : form.password.length < 8
                  ? "error"
                  : "success"
              }
            />
            <Check
              text="Must contain one special character and a number"
              variant={
                errors?.password === "Password is required"
                  ? "error"
                  : form.password === ""
                  ? "info"
                  : !/^(?=.*[!@#$%^&*(),.?":{}|])(?=.*\d).+$/.test(
                      form.password
                    )
                  ? "error"
                  : "success"
              }
            />
            <Check
              text="Must contain at least one upper and lower character"
              variant={
                errors?.password === "Password is required"
                  ? "error"
                  : form.password === ""
                  ? "info"
                  : !/^(?=.*[A-Z])(?=.*[a-z]).+$/.test(form.password)
                  ? "error"
                  : "success"
              }
            />
          </Stack>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <Button
            level="secondary"
            label="Back"
            animate="slideLeft"
            img={<ArrowBackRoundedIcon />}
            onClick={onBack}
            sx={{
              mb: theme.gap.medium,
              px: theme.gap.ml,
              "& svg.MuiSvgIcon-root": {
                mr: theme.gap.xs,
              },
            }}
            props={{ tabIndex: -1 }}
          />
          <Button
            level="primary"
            label="Continue"
            onClick={onSubmit}
            disabled={errors.email && true}
            sx={{ width: "30%" }}
          />
        </Stack>
      </Stack>
    </>
  );
};

const Register = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const theme = useTheme();
  // TODO If possible, change the IDs of these fields to match the backend
  const idMap = {
    "register-firstname-input": "firstName",
    "register-lastname-input": "lastName",
    "register-email-input": "email",
    "register-password-input": "password",
    "register-confirm-input": "confirm",
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    role: [],
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);

  useEffect(() => {
    const fetchInvite = async () => {
      if (token !== undefined) {
        try {
          const res = await axiosInstance.post(`/auth/invite/verify`, {
            token,
          });
          const { role, email } = res.data.data;
          console.log(role);
          setForm({ ...form, email, role });
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchInvite();
  }, [token]);

  const validateForm = (data, options = {}) => {
    const { error } = credentials.validate(data, {
      abortEarly: false,
      ...options,
    });
    return error;
  };

  const handleError = (error) => {
    const newErrors = {};
    error.details.forEach((err) => {
      newErrors[err.path[0]] = err.message;
    });
    setErrors(newErrors);
    createToast({ body: error.details[0].message || "Error validating data." });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error;
    let registerForm;

    if (step === 1) {
      error = validateForm({
        firstName: form.firstName,
        lastName: form.lastName,
      });
    } else if (step === 2) {
      error = validateForm({ email: form.email });
    } else if (step === 3) {
      registerForm = { ...form, role: isAdmin ? ["admin"] : form.role };
      error = validateForm(registerForm, {
        context: { password: form.password },
      });
    }

    if (error) {
      handleError(error);
      return;
    }

    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      delete registerForm.confirm;
      const action = await dispatch(register(registerForm));
      if (action.payload.success) {
        const token = action.payload.data;
        localStorage.setItem("token", token);
        navigate("/");
        createToast({
          body: "Welcome! Your account was created successfully.",
        });
      } else {
        if (action.payload) {
          // dispatch errors
          createToast({
            body: action.payload.msg,
          });
        } else {
          // unknown errors
          createToast({
            body: "Unknown error.",
          });
        }
      }
    }
  };

  const handleChange = (event) => {
    const { value, id } = event.target;
    const name = idMap[id];
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const { error } = credentials.validate(
      { [name]: value },
      { abortEarly: false, context: { password: form.password } }
    );

    setErrors((prev) => {
      const prevErrors = { ...prev };
      if (error) prevErrors[name] = error.details[0].message;
      else delete prevErrors[name];
      return prevErrors;
    });
  };

  return (
    <Stack className="register-page auth" overflow="hidden">
      <img
        className="background-pattern-svg"
        src={background}
        alt="background pattern"
      />
      <Stack
        direction="row"
        alignItems="center"
        px={theme.gap.large}
        gap={theme.gap.small}
      >
        <Logo style={{ borderRadius: theme.shape.borderRadius }} />
        <Typography sx={{ userSelect: "none" }}>BlueWave Uptime</Typography>
      </Stack>
      <Stack
        width="100%"
        maxWidth={600}
        flex={1}
        justifyContent="center"
        p={theme.gap.xl}
        pb={theme.gap.triplexl}
        mx="auto"
        sx={{
          "& > .MuiStack-root": {
            border: 1,
            borderRadius: theme.shape.borderRadius,
            borderColor: theme.palette.otherColors.graishWhite,
            backgroundColor: theme.palette.otherColors.white,
            padding: {
              xs: theme.gap.large,
              sm: theme.gap.xl,
            },
          },
        }}
      >
        {step === 0 ? (
          <LandingPage isAdmin={isAdmin} onSignup={() => setStep(1)} />
        ) : step === 1 ? (
          <StepOne
            form={form}
            errors={errors}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onBack={() => setStep(0)}
          />
        ) : step === 2 ? (
          <StepTwo
            form={form}
            errors={errors}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onBack={() => setStep(1)}
          />
        ) : step === 3 ? (
          <StepThree
            form={form}
            errors={errors}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onBack={() => setStep(2)}
          />
        ) : (
          ""
        )}
      </Stack>
      <Box textAlign="center" p={theme.gap.large}>
        <Typography display="inline-block">
          Already have an account? —
        </Typography>
        <Typography
          component="span"
          ml={theme.gap.xs}
          onClick={() => {
            navigate("/login");
          }}
          sx={{ userSelect: "none" }}
        >
          Log In
        </Typography>
      </Box>
    </Stack>
  );
};
Register.propTypes = {
  isAdmin: PropTypes.bool,
};
export default Register;
