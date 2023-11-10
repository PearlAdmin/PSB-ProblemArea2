import Navbar from "@/components/navigation";
import CardIndiv from "@/components/view-all-individual-card";
import { Button/*, Form, InputGroup*/ } from '@/components/bootstrap';
import styles from './homepage.module.css';
import PaginationControls from "@/components/pagination";
// import SortBy from "@/components/sort-search";
// import { cookies } from 'next/headers';

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

  // const cookieStore = cookies()
  // const cookieUser = cookieStore.get('user')
  // const { username, role } = JSON.parse(cookieUser.value);
  
  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center">
        <div id="todoContainer" className={styles.todoContainer}>
          <div className={styles.header}>
            <h3 style={{ fontWeight: "bolder" }} className="p-2 flex-grow-1">
              Child Records
            </h3>
            <Button
              variant="outline-dark"
              className={`p-2 ${styles.customHeight31} d-flex align-items-center`}
              style={{ marginRight: "5px" }}
            >
              + Create Record
            </Button>
          </div>
          {/* <SortBy items={data} /> */}

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

          {/* Pagination */}
          <PaginationControls count={data.limit} perpage={data.per_page} />
        </div>
      </div>
    </div>
  );
}

export default Home;
