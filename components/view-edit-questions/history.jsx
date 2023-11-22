import styles from '@/components/create-record/styles.module.css';
import { Card } from 'react-bootstrap';
import PaginationControls from '../pagination';

const History = ({answers}) => {
    return (
        <div className={`${styles.popupModal}`} id="form-confirm-container">
            <div className={`${styles.popupModalBoxContainer}`}>
                <div className={`${styles.popupModalBoxShadow} pe-2 pb-2`}>
                    <div className={`${styles.popupModalBox}`}>
                        <div className={`${styles.popupModalBoxTop} text-start ps-4 pt-4`}>Edit History</div>
                        <div className={`histories-container text-start mt-3 pb-1 mx-4`}>
                            {/* TODO: INSERT TRUE DATA HERE */}
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
                            <PaginationControls count={1} perpage={3}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default History;