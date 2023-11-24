"use client";
import {Page, Image, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import useSWR from 'swr';
import Navbar from "@/components/navigation";
import Loading from '@/components/loading';
import Error from '@/app/not-found'

const fetcher = (url) => fetch(url).then((res) => res.json());

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
  name: {
      height: 40,
      width: 350,
  },
  header: {
      textAlign: 'center'
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
  console.log(record);
  return (
    <Document>
      <Page size="A4">
        <View style={styles.imageContainer}>
          <Image src="/logo.png" style={styles.logo} />
          <Image src="/name.png" style={styles.name} />
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
          <PDFViewer style={{width:'100%', height: '88vh'}} showToolbar={false}>
              <MyDocument record={dataArr}/>
          </PDFViewer>
      </>
  )
}

export default ViewRecord;