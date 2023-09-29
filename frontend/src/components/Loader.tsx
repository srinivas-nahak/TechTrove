import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "4rem",
        width: "4rem",
        margin: "auto",
        display: "block",
      }}
    />
  );
};

export default Loader;
