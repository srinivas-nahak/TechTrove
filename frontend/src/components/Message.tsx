import { Alert } from "react-bootstrap";

const Message: React.FC<{ variant: string; message: string }> = ({
  variant = "info",
  message,
}) => {
  return <Alert variant={variant}>{message}</Alert>;
};

export default Message;
