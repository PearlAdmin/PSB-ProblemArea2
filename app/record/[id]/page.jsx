'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import Navbar from "@/components/navigation";
import CustomView from '@/components/view-edit-questions/customview';
import styles from '@/components/create-record/styles.module.css';
import History from '@/components/view-edit-questions/history';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Record = ({params}) => {
    const [isLogVisible, setLogVisible] = useState(false);
  
    const {data, isLoading, error} = useSWR(`/api/records?id=${params.id}`, fetcher);

    if (isLoading) return (<div>Loading...</div>);
  
    //TODO: error page load component
    if (error) return (<div>Error...</div>);
    const toSort = Object.entries(data.record);
    const dataArr = toSort.sort((a, b) => a[1].order - b[1].order);

    const showLogs = () => {
        setLogVisible(!isLogVisible);
    }
    return (
        <div>
            <Navbar recordId={params.id} showLog={showLogs} isLogVisible={isLogVisible}/>
            <div className={`${styles.body} container-fluid my-3 px-5 pt-3`}>
                <div className="flex-row justify-content-center align-items-center">

                    {dataArr.map((item, i) => {
                        // [key, value]
                        if(item[1].type) {
                            return <CustomView key={i} id={data.record._id} question={item[0]} answer={item[1].value} options={item[1].options} required={item[1].required} type={item[1].type}/>
                        }
                    })}
                    {isLogVisible && (<History/>)}
                </div>
            </div>
        </div>

    );
};
export default Record;