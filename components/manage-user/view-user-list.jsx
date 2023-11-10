"use client";
import {InputGroup, Button, Form} from '@/components/bootstrap';
import CardUser from './view-authorized-user-card';
import { useSearchParams } from 'next/navigation';

const UserList = (data) => {    
    const users = data.users;
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? '1';

    return (
        <div>
            <InputGroup>
                <h1 className='flex-grow-1' style={{ fontWeight: 'bolder', paddingTop: '10px', paddingBottom: '10px' }}>User List</h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <InputGroup style={{ marginRight: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Form.Control type="text" placeholder="Search Username..." id="search" name="search" style={{height: '31px'}} />
                        <Button variant="primary" size="sm">
                            <i className="bi bi-search"></i>
                        </Button>
                    </InputGroup>
                </div>
            </InputGroup>

            {/* Dynamic Data*/} 
            {
                users && users.length > 0 ? (
                    users.map((users, index) => (
                        <CardUser
                            key={index}
                            username={users.username}
                            password={users.password}
                            pageNum={page}
                        />
                    ))
                ) : (
                    <p>No users found or data is still loading</p>
                )
            }
        </div>  
    );
};

export default UserList;