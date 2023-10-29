import { ChangeEventHandler, useState } from "react";

const userFormValidator = (defaultValue = "") => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  const valueInputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEnteredValue(event.target.value);
  };

  return { enteredValue, valueInputHandler };
};

export default userFormValidator;
