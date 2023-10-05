import { LinkContainer } from "react-router-bootstrap";
import styles from "../AuthScreen.module.css";
import { useSignUpMutation } from "../../../store/apiSlices/userApiSlice";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { UserType } from "../../../utils/customTypes";
import { authAction } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { errorMessageExtractor } from "../../../utils/errorHandler";

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isError, isLoading, error }] = useSignUpMutation();
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const errorText = (message: string) => (
    <p className="text-danger text-start">{message}</p>
  );

  const usernameInputHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInputUsername(event.target.value);
  };

  const emailInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputEmail(event.target.value);
  };

  const passwordInputHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInputPassword(event.target.value);
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const userData: UserType = {
      name: inputUsername,
      email: inputEmail,
      password: inputPassword,
    };

    const response = await signup(userData);

    if (!("error" in response)) {
      dispatch(authAction.setCredentials(response.data));
      navigate("/");
    }
  };

  return (
    <div className={styles["auth-page-container"]}>
      <h1>Sign Up</h1>
      <form className={styles["auth-page__form"]} onSubmit={handleSubmit}>
        <div className={styles["auth-page__input-group"]}>
          <label htmlFor="email-signup">Username</label>
          <input
            id="username-signup"
            name="username-signup"
            type="text"
            placeholder="Enter your username"
            value={inputUsername}
            onChange={usernameInputHandler}
            required
          />
        </div>
        <div className={styles["auth-page__input-group"]}>
          <label htmlFor="email-signup">Email</label>
          <input
            id="email-signup"
            name="email-signup"
            type="email"
            placeholder="Enter your email"
            value={inputEmail}
            onChange={emailInputHandler}
            required
          />
        </div>
        <div className={styles["auth-page__input-group"]}>
          <label htmlFor="password-signup">Password</label>
          <input
            id="password-signup"
            name="password-signup"
            type="password"
            placeholder="Enter your password"
            value={inputPassword}
            onChange={passwordInputHandler}
            required
          />
        </div>
        {isError && errorText(errorMessageExtractor(error!))}
        <button type="submit">
          {isLoading ? (
            <Loader customColor="white" customSize="1.5rem" />
          ) : (
            "Sign Up Now"
          )}
        </button>
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
