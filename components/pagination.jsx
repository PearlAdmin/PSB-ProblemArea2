"use client";

import {useRouter, useSearchParams} from 'next/navigation';
import { Pagination } from '@/components/bootstrap';

/**
 * Pagination controls component for navigating between pages.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {number} props.count - The total number of items.
 * @param {number} props.perpage - The number of items per page.
 * @param {string} props.route - The route for pagination links.
 * @returns {JSX.Element} JSX element representing the pagination controls.
 */
const PaginationControls = ({count, perpage, route}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get('page') ?? '1';
    const maxPage = Math.ceil(count / perpage);
    route = route ?? ''; 
    const basePath = process.env.NEXT_PUBLIC_VERCEL_URL;

    return (
        <Pagination className="justify-content-center mt-2">
            {page > 2 && <Pagination.First onClick={() => {
                router.push(basePath + `/${route}?page=1`)
            }}/>}
            {page > 1 && <Pagination.Prev onClick={() => {
                router.push(basePath + `/${route}?page=${Number(page) - 1}`)
            }} />}
            <Pagination.Item active>{page}</Pagination.Item>
            {page < maxPage && <Pagination.Next onClick={() => {
                router.push(basePath + `/${route}?page=${Number(page) + 1}`)
            }}/>}
            {page < maxPage - 1 && <Pagination.Last onClick={() => {
                router.push(basePath + `/${route}?page=${maxPage}`)
            }}/>}
        </Pagination>
    )
}

export default PaginationControls;