import Navbar from "@/components/navigation";
import CardIndiv from "@/components/view-all-individual-card";
import { Button/*, Form, InputGroup*/ } from '@/components/bootstrap';
import styles from './homepage.module.css';
import PaginationControls from "@/components/pagination";
import { handleCookie } from "./login/page";
// import SortBy from "@/components/sort-search";


const getRecords = async ({searchParams}) => {
  try {
    const page = searchParams['page'] ?? '1';

    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+`/api/records?page=${page}`,{
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

const Home = async ({searchParams}) => {
  const data = await getRecords({searchParams});
  const cookieResult = await handleCookie();  
  return (
    <div>
      <Navbar cookie = {cookieResult} />
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

export const dynamic = 'force-dynamic';

export default Home;
