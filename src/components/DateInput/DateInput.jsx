import styles from "./DateInput.module.css";

const DateInput = ({ onChange }) => {
  return <input type="date" className={styles.date} onChange={onChange} />;
};

export default DateInput;
