import styles from '@/components/create-record/styles.module.css';

const Popup = ({question, yesLabel, noLabel, yesFunc, noFunc}) => {
    
    return (
        <div className={`${styles.popupModal}`} id="form-confirm-container">
            <div className={`${styles.popupModalBoxContainer}`}>
                <div className={`${styles.popupModalBoxShadow} pe-2 pb-2`}>
                    <div className={`${styles.popupModalBox}`}>
                        <div className={`${styles.popupModalBoxTop} text-start pt-4 ps-4`}>{question}</div>
                        <div className={`popup=modal-box-low text-start py-4 ps-4`}>
                            <button className={`${styles.button} ${styles.confirmBtn} ${styles.yesBtn}`} onClick={yesFunc}>{yesLabel}</button>
                            <button className={`${styles.button} ${styles.confirmBtn} ${styles.noBtn}`} id="confirm-no-btn" onClick={noFunc}>{noLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Popup;