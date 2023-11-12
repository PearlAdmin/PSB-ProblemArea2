// 'use client';
// import React, { useState, useRef } from 'react';
// import useSWR from 'swr';
import Navbar from "@/components/navigation"
import CustomView from '@/components/view-edit-questions/customview'
import Textbox from '@/components/view-edit-questions/textbox';
import Date from '@/components/view-edit-questions/date';
import MC from '@/components/view-edit-questions/mc';
import Checkbox from '@/components/view-edit-questions/checkbox';
import Header from '@/components/create-record/header';
import styles from '@/components/create-record/styles.module.css';

// const fetcher = (url) => fetch(url).then((res) => res.json());

const getRecords = async ({scn}) => {
    try {
  
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+`/api/records?scn=${scn}`,{
        cache: 'no-store',
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch records...');
      }
  
      return new Promise((resolve) => 
        setTimeout(() => {
          resolve(response.json())
        }, 1000));
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
}

const Record = async ({params}) => {
    // const [values, setValues] = useState({});
    // const errorMsg = useRef('')
    const data = await getRecords(params);  
    const dataArr = Object.entries(data.record);

    function validateSN(inputID) {
        const input = document.getElementById(inputID);
        const validityState = input.validity;
        console.log(validityState)
      
        if (errorMsg.current == "SN should be unique") {
          input.setCustomValidity(errorMsg.current);
        } else {
          input.setCustomValidity("");
        }
      
        input.reportValidity();
    }

    function validateSCN(inputID) {
        const input = document.getElementById(inputID);
        const validityState = input.validity;
        console.log(validityState)
      
        if (errorMsg.current == "SCN should be unique") {
          input.setCustomValidity(errorMsg.current);
        } else {
          input.setCustomValidity("");
        }
      
        input.reportValidity();
    }

    // const {data, isLoading, error} = useSWR('/api/forms', fetcher);

    // if (isLoading) return (<div>Loading...</div>);
    // if (error) return (<div>{error.message}</div>);
    return (
        <div>
            <Navbar />
            <div className={`${styles.body} container-fluid my-3 px-5 pt-3`}>
                <div className="flex-row justify-content-center align-items-center">

                    {dataArr.map((item, i) => {
                        // [key, value]
                        if(item[1].type) {
                          return <CustomView key={i} question={item[0]} answer={item[1].value} options={item[1].options} required={item[1].required} type={item[1].type}/>
                        }
                    })}

                    {/* <Header header='Background Information' isReadOnly={true}/>
                    <div className="mb-3"></div>
                    <Textbox question={'Name'} answer={"Dela Cruz, Juan"} required={true} />
                    <Date question={'Birthday'} answer={"2023-11-20"} required={true} />
                    <MC question="School Type" options={["Public", "Private"]} answer="Public" required={true} />
                    <Checkbox question="Favorite Subjects" options={["Math", "Science", "History", "Art"]} answer={["Math", "Science"]} required={true} />
                    <MC question="Family Income" options={["10k-50k", "50k-100k", "100k-150k"]} answer="10k-50k" required={true} /> */}
                </div>
            </div>
        </div>

    );
};
export default Record;