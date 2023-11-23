import styles from '@/components/create-record/styles.module.css';
import { Card } from 'react-bootstrap';
import PaginationControls from '../pagination';

const History = ({logs}) => {
    const monthString = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    return (
        <div className={`${styles.popupModal}`} id="form-confirm-container">
            <div className={`${styles.popupModalBoxContainer}`}>
                <div className={`${styles.popupModalBoxShadow} pe-2 pb-2`}>
                    <div className={`${styles.popupModalBox}`}>
                        <div className={`${styles.popupModalBoxTop} text-start ps-4 pt-4`}>Edit History</div>
                        <div className={`histories-container text-start mt-3 pb-1 mx-4`}>
                            {logs.map((log, i) => {
                                console.log('log', log);
                                const date = new Date(log.timestamp);
                                const stringDate = monthString[date.getMonth()] + ' ' + date.getDate() + ', ' +  date.getFullYear();
                                const time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
                                return (
                                    <Card className={`${styles.historyContainer}`}>
                                        <div className={`${styles.historyTitleContainer}`}>
                                            <div className={`${styles.historyDate}`}>{stringDate}</div>
                                        </div>
                                        <div className={`${styles.historyOthersContainer}`}>
                                            <div>Time of Day: <b>{time}</b></div>
                                            <div>Edited by: <b>{log.editedBy}</b></div>
                                        </div>
                                    </Card>
                                )
                            })}
                            <PaginationControls count={1} perpage={3}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default History;