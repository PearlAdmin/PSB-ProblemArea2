import styles from './styles.module.css';

const Textbox = ({ id, question, required, setValues, validation }) => {
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
                    id={id}
                    type="text"
                    name={question}
                    required={required}
                    pattern={validation}
                    onChange={setValues}
                />
            </div>
        </div>
      );
    };
export default Textbox;