import styles from '@/components/create-record/styles.module.css';
import { Card } from 'react-bootstrap';
import PaginationControls from '../pagination';

const History = ({question, answers, closeModal}) => {
    
    return (
        <div className={`${styles.popupModal}`} id="form-confirm-container">
            <div className={`${styles.popupModalBoxContainer}`}>
                <div className={`${styles.popupModalBoxShadow} pe-2 pb-2`}>
                    <div className={`${styles.popupModalBox}`}>
                        <div className={`${styles.popupModalBoxTop} text-end pt-2 pe-4`}><i className={`${styles.button} bi bi-x`} onClick={closeModal}></i></div>
                        <div className={`${styles.popupModalBoxTop} text-start ps-4`}>Edit History of {question}</div>
                        <div className={`histories-container text-start mt-3 pb-1 mx-4`}>
                            {/* Sample Data */}
                            <Card className={`${styles.historyContainer}`}>
                                <div className={`${styles.historyTitleContainer}`}>
                                    <div className='w-auto'>{answers}</div>
                                    <div className={`${styles.historyDate}`}>2023-01-01</div>
                                </div>
                                <div className={`${styles.historyOthersContainer}`}>
                                    <div>Former Value: <b>testttt</b></div>
                                    <div>Edited by: <b>Kyle</b></div>
                                </div>
                            </Card>
                            <Card className={`${styles.historyContainer}`}>
                                <div className={`${styles.historyTitleContainer}`}>
                                    <div className='w-auto'>testttt</div>
                                    <div className={`${styles.historyDate}`}>2022-12-25</div>
                                </div>
                                <div className={`${styles.historyOthersContainer}`}>
                                    <div>Former Value: <b></b></div>
                                    <div>Edited by: <b>Santa</b></div>
                                </div>
                            </Card>
                            <PaginationControls count={1} perpage={3} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default History;