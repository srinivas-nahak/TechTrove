import styles from "./CustomInputGroup.module.css";

const CustomInputGroup: React.FC<
  { label: string } & React.HTMLProps<HTMLInputElement>
> = ({ label, id, ...otherProps }) => {
  return (
    <div className={styles["input-group"]}>
      <label htmlFor={id}>{label}</label>
      <input {...otherProps} />
    </div>
  );
};

export default CustomInputGroup;
