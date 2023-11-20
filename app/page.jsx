import Navbar from "@/components/navigation";
import { Button } from '@/components/bootstrap';
import styles from './homepage.module.css';
import SortBy from "@/components/sort-search";
import Link from 'next/link';

const Home = async () => {
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
              <Link href="/create" style={{ textDecoration: "none", color: "inherit" }}>
              + Create Record
              </Link>
            </Button>
          </div>
          <SortBy />
        </div>
      </div>
    </div>
  );
}

export default Home;
