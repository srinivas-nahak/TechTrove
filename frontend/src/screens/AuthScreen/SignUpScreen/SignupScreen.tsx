import { LinkContainer } from "react-router-bootstrap";
import styles from "../AuthScreen.module.css";
import { useSignUpMutation } from "../../../store/apiSlices/userApiSlice";
import { FormEventHandler, useEffect, useState } from "react";
import { UserType } from "../../../utils/customTypes";
import { authAction } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorMessageExtractor } from "../../../utils/errorHandler";
import userFormValidator from "../../../hooks/userFormValidator";
import CustomInputGroup from "../../../components/CustomInputGroup/CustomInputGroup";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import { btnLoaderAction } from "../../../store/buttonLoaderSlice";

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isError, isLoading, error }] = useSignUpMutation();
  const [errorMessage, setErrorMessage] = useState<JSX.Element | null>(null);

  //Using custom hook for form data handling
  const {
    enteredValue: inputUsername,
    valueInputHandler: usernameInputHandler,
  } = userFormValidator();

  const { enteredValue: inputEmail, valueInputHandler: emailInputHandler } =
    userFormValidator();

  const {
    enteredValue: inputPassword,
    valueInputHandler: passwordInputHandler,
  } = userFormValidator();

  const {
    enteredValue: inputConfirmPassword,
    valueInputHandler: confirmPasswordInputHandler,
  } = userFormValidator();

  useEffect(() => {
    if (isError) {
      setErrorMessage(
        <p className="text-danger text-start">
          {errorMessageExtractor(error!)}
        </p>
      );
    }
  }, [isError]);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (inputPassword !== inputConfirmPassword) {
      setErrorMessage(
        <p className="text-danger text-start">Passwords are not matching!</p>
      );

      return;
    }

    const userData: UserType = {
      name: inputUsername,
      email: inputEmail,
      password: inputPassword,
    };

    const response = await signup(userData);

    if (!("error" in response)) {
      dispatch(authAction.setCredentials(response.data));
      dispatch(btnLoaderAction.addProperty({ showLoader: false }));
      navigate("/");
    }
  };

  if (isLoading) {
    dispatch(btnLoaderAction.addProperty({ showLoader: true }));
  }

  return (
    <div className={styles["auth-page-container"]}>
      <h1>Sign Up</h1>
      <form className={styles["auth-page__form"]} onSubmit={handleSubmit}>
        <CustomInputGroup
          label="Username"
          id="username-signup"
          name="username-signup"
          type="text"
          placeholder="Enter your username"
          value={inputUsername}
          onChange={usernameInputHandler}
          required
        />
        <CustomInputGroup
          label="Email"
          id="email-signup"
          name="email-signup"
          type="email"
          placeholder="Enter your email"
          value={inputEmail}
          onChange={emailInputHandler}
          required
        />
        <CustomInputGroup
          label="Password"
          id="password-signup"
          name="password-signup"
          type="password"
          placeholder="Enter your password"
          value={inputPassword}
          onChange={passwordInputHandler}
          required
        />
        <CustomInputGroup
          label="Confirm Password"
          id="confirm-password-signup"
          name="confirm-password-signup"
          type="password"
          placeholder="Confirm your password"
          value={inputConfirmPassword}
          onChange={confirmPasswordInputHandler}
          required
        />
        {errorMessage && errorMessage} {/*//If error message is not null */}
        <CustomButton type="submit">Sign Up Now</CustomButton>
      </form>
      <p className={styles["login-signup-text"]}>
        Already have an account?{" "}
        <LinkContainer to="/login">
          <span className={styles["login-signup-text__link"]}>Login</span>
        </LinkContainer>
      </p>
      <p className={styles["signup-disclaimer-text"]}>
        By creating an account, you agree to our Terms of Use and Privacy
        Policy.
      </p>
    </div>
  );
};

export default SignupScreen;
