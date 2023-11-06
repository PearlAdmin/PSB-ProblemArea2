import styles from './styles.module.css';

const Textbox = ({ question, required, setValues, type }) => {
    return (
        <div>
            <div className={`${styles.formContainer} col mb-3`}>
                <div className={`${styles.formTitleContainer}`}>
                    <label className={`${styles.formAnswer} ${styles.formTransparent} w-100 fw-bold d-flex me-4 ${!required ? 'flex-grow-1' : ''}`} htmlFor="question">
                        {question}
                        {required && <div className={`${styles.formTitleRequired}`}>*</div>}
                    </label>
                </div>
                <input
                    className={`${styles.input} ${styles.formAnswer} w-100`}
                    type={type}
                    name={question}
                    required={required}
                    onChange={setValues}
                />
            </div>
        </div>
      );
    };
export default Textbox;