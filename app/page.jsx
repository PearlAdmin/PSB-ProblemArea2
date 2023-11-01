import Navbar from "@/components/navigation";
import CardIndiv from "@/components/view-all-individual-card";
import { Button, Form, InputGroup } from '@/components/bootstrap';
import styles from './homepage.module.css';
import PaginationControls from "@/components/pagination";

const getRecords = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/records',{
      cache: 'no-store'
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
  const page = searchParams['page'] ?? '1';
  const per_page = '5';

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  // const entries = records.slice(start, end);
  // console.log(entries);

  const samples = await getRecords();
  console.log(samples);

  return (
    <div>
      <Navbar/>
      <div id="todoContainer" className={styles.todoContainer}>
        <div className={styles.header}>
          <h3 style={{fontWeight: 'bolder'}} className="p-2 flex-grow-1">Child Records</h3>
          <Button variant="outline-dark" className={`p-2 ${styles.customHeight31} d-flex align-items-center`} style={{marginRight: '5px'}}>+ Create Record</Button>
        </div>
        
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
        <PaginationControls/>
      </div>
    </div>
  )
}

export default Home;