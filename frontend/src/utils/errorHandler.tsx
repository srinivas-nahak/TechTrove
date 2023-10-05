import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Message from "../components/Message";

export const errorHandler = (error: FetchBaseQueryError | SerializedError) => {
  if ("status" in error) {
    // you can access all properties of `FetchBaseQueryError` here
    const errData = "error" in error ? error.error : JSON.stringify(error.data);
    const errMsg = JSON.parse(errData).message;

    return <Message variant="danger" message={errMsg} />;
  } else {
    // you can access all properties of `SerializedError` here
    return (
      <Message
        variant="danger"
        message={error.message ? error.message : "An error occured!"}
      />
    );
  }
};

export const errorMessageExtractor = (
  error: FetchBaseQueryError | SerializedError
) => {
  if ("status" in error) {
    // you can access all properties of `FetchBaseQueryError` here
    const errData = "error" in error ? error.error : JSON.stringify(error.data);
    const errMsg = JSON.parse(errData).message;
    return errMsg;
  } else {
    // you can access all properties of `SerializedError` here
    return error.message ? error.message : "An error occured!";
  }
};
