import styles from './styles.module.css';

/**
 * Dates component for rendering a question with a date input.
 * @component
 * @param {Object} props - The properties of the Dates component.
 * @param {string} props.question - The text of the question.
 * @param {boolean} props.required - Indicates whether the question is required.
 * @param {Function} props.setValues - A function to handle the onChange event and update values.
 * @returns {JSX.Element} JSX.Element representing the Dates component.
 */
const Dates = ({ question, required, setValues, order }) => {
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
                    type="date"
                    id="answer"
                    name={question}
                    required={required}
                    onChange={setValues}
                />
            </div>
        </div>
    );
};

export default Dates;