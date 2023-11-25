"use client";
import {Page, Image, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import btnStyle from '@/components/create-record/styles.module.css';
import useSWR from 'swr';
import Navbar from "@/components/navigation";
import Loading from '@/components/loading';
import Error from '@/app/not-found';

const fetcher = (url) => fetch(url).then((res) => res.json());

Font.register({
  family: 'Roboto Condensed',
  fonts: [{
    src: '/RobotoCondensed-Light.ttf',
  },{
    src: '/RobotoCondensed-Bold.ttf',
    fontWeight: 'bold',
  }]
})

const styles = StyleSheet.create({
  body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      fontSize: 12,
      flexDirection: 'row',
      flexWrap: 'wrap',
      
  },    
  imageContainer: {
      flexDirection: 'row',  
      alignItems: 'center',  
      marginTop: 15,
      justifyContent: 'center',
  },
  logo: {
      height: 60,
      width: 60,
      marginRight: 20,
  },
  header: {
      textAlign: 'center'
  },
  leftTitle: {
    fontFamily: 'Roboto Condensed',
    color: '#0872a1',
    fontWeight: 'bold',
  },
  rightTitle: {
    fontFamily: 'Roboto Condensed',
    color: '#0872a1'
  },
  //Questions
  container: {
      marginBottom: 10,
      fontFamily: 'Times-Roman',
  },
  underline: {
      textDecoration: 'underline',
  },
  radioContainer: {
      flexDirection: 'column',
      alignItems: 'left',
  },
  radioOption: {
      marginRight: 10,
  },
  checkboxContainer: {
      flexDirection: 'column',
      alignItems: 'left',
  },
  checkboxOption: {
      marginRight: 10,
  },
  question: {
      fontFamily: 'Times-Bold'
  }
});

const CustomPdfView = ({ question, answer, options, type }) => {
  switch (type) {
    case "number":
    case "alphanumeric":
    case "text":
      return (
        <View style={styles.container}>
          <Text style={styles.question}>{question}</Text>
          <Text style={styles.underline}>{answer}</Text>
        </View>
      );
    case "radio":
      return (
        <View style={styles.container}>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.radioContainer}>
            {options.map((option, index) => (
              <View key={index} style={styles.radioOption}>
                <Text> [{answer === option ? 'X' : ' ' }] {option}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    case "checkbox":
      return (
        <View style={styles.container}>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.checkboxContainer}>
            {options.map((option, index) => (
              <View key={index} style={styles.checkboxOption}>
                <Text> [{answer.includes(option) ? 'X' : ' ' }] {option}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    case "date":
      return (
        <View style={styles.container}>
          <Text style={styles.question}>{question}</Text>
          <Text style={styles.underline}>{answer}</Text>
        </View>
      );
    default:
      return null;
  }
};

const MyDocument = ({record}) => {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.imageContainer}>
          <Image src="/logo.png" style={styles.logo} />
          <Text style={styles.leftTitle}>Pearl S. Buck</Text>
          <Text style={styles.rightTitle}> Foundation Philippines Inc.</Text>
        </View>
        <View>
          <Text style={styles.header}>Family Progress Report Form</Text>
        </View>
        <View style={styles.body}>
            {record.map((item, i) => {
              console.log("ITEM", item);
              if (item[0] !== '_id' && item[0] !== '__v' && item[0] !== 'isdeleted' ) {
                if (item[1].type !== 'header'){
                  return (
                    <View key={i} style={{width: '33.33%', marginBottom: '20px'}}>
                      <CustomPdfView
                        question={item[0]}
                        answer={item[1].value}
                        options={item[1].options}
                        type={item[1].type}
                      />
                    </View>
                  );
                } else {
                  return (
                    <View key={i} style={{width: '100%', marginBottom: '10px'}}>
                      <Text style={[styles.underline, styles.question, {fontSize: 15}]}>{item[0]}</Text>
                    </View>
                  );
                }
              }
            })}
        </View>
      </Page>
    </Document>
  );
};

const ViewRecord = ({params}) => {
  const {data, isLoading, error} = useSWR(`/api/records?id=${params.id}`, fetcher);
  if (isLoading) return (<Loading/>);
  if (error) return (<Error/>);
  
  const record = data.record;
  if (!record) return (<Error/>);
  const filename = record['First Name: '].value + '_' + record['Last Name: '].value + '-' + record['SN: '].value + '-' + record['SCN: '].value + '.pdf';
  const filteredKeys = Object.keys(record).filter((item) => item !== "_id" && item !== 'isdeleted' && item !== 'expirationDate' && item !== '__v');
  const filteredEntries = filteredKeys.map(key => [key, data.record[key]]);
  const dataArr = filteredEntries.sort(([, a], [, b]) => a.order - b.order);
  console.log(filteredKeys);
  return (
      <>
          <Navbar PDF={<MyDocument record={dataArr}/>} filename={filename}/>
            <div className='d-none d-md-block'>
            <PDFViewer style={{width:'100%', height: '88vh'}} showToolbar={false}>
                <MyDocument record={dataArr}/>
            </PDFViewer>
            </div>
            <div className='d-md-none p-5'>
                <div className='mb-3'>This file cannot be previewed on this device.</div>
                <div className='mb-5'>Please download the file to view.</div>
                <a className={``} href='/'>
                    <div className={`${btnStyle.actionBtn} ${btnStyle.bgBlue} ${btnStyle.button} text-center text-white w-25`}>
                        Go Back
                    </div>
                </a>
            </div>

      </>
  )
}

export default ViewRecord;