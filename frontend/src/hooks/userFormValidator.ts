import { ChangeEventHandler, useState } from "react";

const userFormValidator = () => {
  const [enteredValue, setEnteredValue] = useState("");

  const valueInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEnteredValue(event.target.value.trim());
  };

  return { enteredValue, valueInputHandler };
};

export default userFormValidator;
