import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useLoginMutation } from "../../../store/apiSlices/userApiSlice.js";
import styles from "../AuthScreen.module.css";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../store/authSlice.js";
import { RootState } from "../../../store/index.js";
import userFormValidator from "../../../hooks/userFormValidator.js";
import CustomInputGroup from "../../../components/CustomInputGroup/CustomInputGroup.js";
import CustomButton from "../../../components/UI/CustomButton/CustomButton.js";
import { btnLoaderAction } from "../../../store/buttonLoaderSlice.js";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.authReducer);
  const [login, { isLoading, isError }] = useLoginMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  //Using custom hooks for Input Field states
  const { enteredValue: inputEmail, valueInputHandler: emailInputHandler } =
    userFormValidator();
  const {
    enteredValue: inputPassword,
    valueInputHandler: passwordInputHandler,
  } = userFormValidator();

  const errorText = (
    <p className="text-danger text-start">Invalid email or password!</p>
  );

  useEffect(() => {
    if (userInfo && userInfo._id) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const userData = {
      email: inputEmail,
      password: inputPassword,
    };

    const response = await login(userData);

    if (!("error" in response)) {
      dispatch(authAction.setCredentials(response.data));
      dispatch(btnLoaderAction.addProperty({ showLoader: false }));
      navigate("/");
    }
  };

  if (isLoading) {
    dispatch(btnLoaderAction.addProperty({ showLoader: true }));
  }

  // if (error) {
  //   return errorHandler(error);
  // }

  return (
    <div className={styles["auth-page-container"]}>
      <h1>Login</h1>
      <form className={styles["auth-page__form"]} onSubmit={handleSubmit}>
        <CustomInputGroup
          label="Email"
          id="email-login"
          name="email-login"
          type="email"
          placeholder="Enter your email"
          value={inputEmail}
          required
          onChange={emailInputHandler}
        />
        <CustomInputGroup
          label="Password"
          id="password-login"
          name="password-login"
          type="password"
          placeholder="Enter your password"
          value={inputPassword}
          required
          onChange={passwordInputHandler}
        />

        {isError && errorText}

        <CustomButton type="submit">Login Now</CustomButton>
      </form>
      <p className={styles["login-signup-text"]}>
        Don't have an account?{" "}
        <LinkContainer
          to={{
            pathname: "/signup",
            search: redirect ? `?redirect=${redirect}` : "",
          }}
        >
          <span className={styles["login-signup-text__link"]}>Sign Up</span>
        </LinkContainer>
      </p>
    </div>
  );
};

export default LoginScreen;
