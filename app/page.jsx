import Navbar from "@/components/navigation";
import CardIndiv from "@/components/view-all-individual-card";
import { Button, Form, InputGroup } from '@/components/bootstrap';
import styles from './homepage.module.css';
import PaginationControls from "@/components/pagination";

const getRecords = async ({searchParams}) => {
  try {
    const page = searchParams['page'] ?? '1';

    const response = await fetch(`http://localhost:3000/api/records?page=${page}`,{
      cache: 'no-store',
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch records...');
    }

    return response.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}

const Home = async ({searchParams}) => {

  const data = await getRecords({searchParams});

  return (
    <div>
      <Navbar/>
      <div id="todoContainer" className={styles.todoContainer}>
        <div className={styles.header}>
          <h3 style={{fontWeight: 'bolder'}} className="p-2 flex-grow-1">Child Records</h3>
          <Button variant="outline-dark" className={`p-2 ${styles.customHeight31} d-flex align-items-center`} style={{marginRight: '5px'}}>+ Create Record</Button>
        </div>
        {data.records.map((sample, i) => {
          return (
            <CardIndiv
              key={i}
              lastName={sample['Last Name: ']}
              firstname={sample['First Name: ']}
              scn={sample['SCN: ']}
              sc={sample['SN: ']}
              date={sample['Assigned Date: ']}
            />
          )
        })}
        {/* <div className={`${styles.header} mb-3`}>

          <Form.Select
            id="searchChild"
            name="searchChild"
            className={`custom-select ${styles.customHeight31}`}
            style={{ width: '80px' }}
            defaultValue={"SCN"}
          >
            <option value="SCN">SCN</option>
            <option value="SC">SC</option>
            <option value="Lastname">Lastname</option>
            <option value="Firstname">Firstname</option>
          </Form.Select>

          <InputGroup style={{marginRight: '5px'}}>
            <Form.Control type="text" placeholder="Search..." id="search" name="search" />
              <Button variant="secondary" size="sm">
                <i className={`${styles.i} bi bi-search`}></i>
              </Button>
          </InputGroup>

          <div className={`${styles.customHeight31}  align-items-center p-2`} style={{width: '90px'}}>Sort By:</div>

          <Form.Select
            id="searchChild"
            name="searchChild"
            className={`custom-select ${styles.customHeight31}`}
            style={{width: '200px'}}
            defaultValue={"SCN"}
          >
            <option value="SCN">SCN</option>
            <option value="SC">SC</option>
            <option value="Lastname">Lastname</option>
            <option value="Firstname">Firstname</option>
          </Form.Select>
        </div> */}
        
        {/* Individual Child Records */}
        {/* Sample input 1 */}
        {/* <CardIndiv
          lastName="Smith"
          firstname="Alice"
          scn="1234"
          sc="0001"
          date="October 18, 2023"
        /> */}

        {/* Sample input 2 */}
        {/* <CardIndiv
          lastName="Johnson"
          firstname="Bob"
          scn="5678"
          sc="0010"
          date="September 25, 2023"
        /> */}

        {/* Pagination */}
        <PaginationControls count={data.limit} perpage={data.per_page}/>
      </div>
    </div>
  )
}

export default Home;