import styles from './styles.module.css';

/**
 * Textbox component for rendering a text input in a form.
 * @component
 * @param {Object} props - The properties of the Textbox component.
 * @param {string} props.question - The text of the question associated with the textbox.
 * TODO: why is type being passed?
 * @param {string} props.type - The type of the input (always 'text' for a textbox).
 * @param {boolean} props.required - Indicates whether the textbox is a required field.
 * @param {Function} props.setValues - A function to handle changes to the textbox value.
 * @param {string} props.validation - A regular expression pattern for input validation.
 * @returns {JSX.Element} JSX.Element representing the Textbox component.
 */
const Textbox = ({ question, type, required, setValues, validation }) => {
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
                    id={question}
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