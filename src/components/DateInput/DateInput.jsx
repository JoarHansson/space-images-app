import styles from "./DateInput.module.css";

const DateInput = ({ onChange, imageDate }) => {
  return (
    <input
      type="date"
      className={styles.date}
      onChange={onChange}
      value={imageDate ?? ""}
    />
  );
};

export default DateInput;
