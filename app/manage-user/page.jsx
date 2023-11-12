import Navbar from "@/components/navigation";
import UserList from "@/components/manage-user/view-user-list";
import Register from "@/components/manage-user/register-user";
import PaginationControls from '@/components/pagination';
import './styles.css';

const getUsers = async ({searchParams}) => {
    try {
      const page = searchParams['page'] ?? '1';
    
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+`/api/manage-user?page=${page}`,{
        cache: 'no-store',
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch authorized users records...');
      }

      return response.json();
    } catch (error) {
      console.log("Error loading authorized users: ", error);
    }
}

const ManageUser = async ({searchParams}) => {
    const data = await getUsers({searchParams});

    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center text-align-center">
                <div className="col p-3" style={{ backgroundColor: '#C5E2EA', margin: '10px', borderRadius: '10px' }}>
                    <UserList users={data.users} count={data.limit} perpage={data.per_page}/>
                    <PaginationControls count={data.limit} perpage={data.per_page} route={'manage-user'}/>
                </div>
                <div className="col p-3" style={{ backgroundColor: '#C5E2EA', margin: '10px', borderRadius: '10px' }}>
                    <Register />
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
