import styles from '@/components/create-record/styles.module.css';

/**
 * Popup component for displaying a confirmation or information message.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.question - The text of the popup message or question.
 * @param {string} props.firstBtnLabel - The label for the first button.
 * @param {string} props.secondBtnLabel - The label for the second button.
 * @param {Function} props.firstBtnFunc - The function to execute when the first button is clicked.
 * @param {Function} props.secondBtnFunc - The function to execute when the second button is clicked.
 * @param {boolean} props.isYesNoQuestion - A flag indicating whether it's a Yes/No question style.
 * @param {string} props.id - The optional ID for the popup component.
 * @returns {JSX.Element} JSX element representing the popup.
 */
const Popup = ({question, firstBtnLabel, secondBtnLabel, firstBtnFunc, secondBtnFunc, isYesNoQuestion, id}) => {
    
    return (
        <div className={`${styles.popupModal}`} id="form-confirm-container">
            <div className={`${styles.popupModalBoxContainer}`}>
                <div className={`${styles.popupModalBoxShadow} pe-2 pb-2 col-md-6`}>
                    <div className={`${styles.popupModalBox} p-4`}>
                        <div className={`${styles.popupModalBoxTop} text-start`}>{question}</div>
                        <div className={`popup-modal text-start pt-3`}>
                            <button className={`${styles.button} ${styles.confirmBtn} ${isYesNoQuestion ? styles.yesBtn : ''} me-2`} onClick={firstBtnFunc}>{firstBtnLabel}</button>
                            <button className={`${styles.button} ${styles.confirmBtn} ${isYesNoQuestion ? styles.noBtn : ''}`} onClick={secondBtnFunc}>{secondBtnLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Popup;