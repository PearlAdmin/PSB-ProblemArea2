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
            <div id="todoContainer" className={`${styles.todoContainer} d-flex justify-content-center m-2 m-md-4`}>
              <div className={styles.header}>
                <h3 style={{ fontWeight: "bolder" }} className="p-2">
                  Child Records
                </h3>
                <Button
                  variant="outline-dark"
                  className={`d-flex align-items-center ms-auto h-25`}
                >
                  <Link href="/create" style={{ textDecoration: "none", color: "inherit" }}>
                      <div className="d-none d-md-inline">+ Create Record</div>
                      <div className="d-inline d-md-none">+</div>
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
