import { Spinner } from "react-bootstrap";
const Loader: React.FC<{ customColor?: string; customSize?: string }> = ({
  customColor = "black",
  customSize = "4rem",
}) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: customSize,
        width: customSize,
        margin: "auto",
        display: "block",
        color: customColor,
      }}
    />
  );
};

export default Loader;
