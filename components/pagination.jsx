"use client";

import {useRouter, useSearchParams} from 'next/navigation';
import { Pagination } from '@/components/bootstrap';

const PaginationControls = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get('page') ?? '1';

    return (
        <Pagination className="justify-content-center mt-2">
            {page > 2 && <Pagination.First onClick={() => {
                router.push(`/?page=1`)
            }}/>}
            {page > 1 && <Pagination.Prev onClick={() => {
                router.push(`/?page=${Number(page) - 1}`)
            }} />}
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next onClick={() => {
                router.push(`/?page=${Number(page) + 1}`)
            }}/>
        </Pagination>
    )
}

export default PaginationControls;