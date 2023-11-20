import styles from '@/components/create-record/styles.module.css';

const Popup = ({question, firstBtnLabel, secondBtnLabel, firstBtnFunc, secondBtnFunc, isYesNoQuestion, id}) => {
    
    return (
        <div className={`${styles.popupModal}`} id="form-confirm-container">
            <div className={`${styles.popupModalBoxContainer}`}>
                <div className={`${styles.popupModalBoxShadow} pe-2 pb-2`}>
                    <div className={`${styles.popupModalBox}`}>
                        <div className={`${styles.popupModalBoxTop} text-start pt-4 ps-4`}>{question}</div>
                        <div className={`popup-modal text-start py-4 ps-4`}>
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