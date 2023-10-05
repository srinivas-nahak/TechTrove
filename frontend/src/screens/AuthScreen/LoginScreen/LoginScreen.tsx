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
import Loader from "../../../components/Loader.js";
import { RootState } from "../../../store/index.js";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.authReducer);
  const [login, { isLoading, isError }] = useLoginMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  //Input Field states
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const errorText = (
    <p className="text-danger text-start">Invalid email or password!</p>
  );

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

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

    const userData = {
      email: inputEmail,
      password: inputPassword,
    };

    const response = await login(userData);

    if (!("error" in response)) {
      dispatch(authAction.setCredentials(response.data));
      navigate("/");
    }
  };

  // if (error) {
  //   return errorHandler(error);
  // }

  return (
    <div className={styles["auth-page-container"]}>
      <h1>Login</h1>
      <form className={styles["auth-page__form"]} onSubmit={handleSubmit}>
        <div className={styles["auth-page__input-group"]}>
          <label htmlFor="email-login">Email</label>
          <input
            id="email-login"
            name="email-login"
            type="email"
            placeholder="Enter your email"
            value={inputEmail}
            required
            onChange={emailInputHandler}
          />
        </div>
        <div className={styles["auth-page__input-group"]}>
          <label htmlFor="password-login">Password</label>
          <input
            id="password-login"
            name="password-login"
            type="password"
            placeholder="Enter your password"
            value={inputPassword}
            required
            onChange={passwordInputHandler}
          />
        </div>

        {isError && errorText}
        <button type="submit">
          {isLoading ? (
            <Loader customColor="white" customSize="1.5rem" />
          ) : (
            "Login Now"
          )}
        </button>
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
