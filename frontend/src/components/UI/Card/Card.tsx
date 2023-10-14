import styles from "./Card.module.css";

const Card: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  className,
  children,
  ...otherProps
}) => {
  const copyProps = { className: `${styles.Card} ${className}`, ...otherProps };

  return <div {...copyProps}>{children}</div>;
};

export default Card;
