import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
export async function cookiesMiddleware(request) {

    //check if cookie with name user exists
    let isCookie = request.cookies.has('user');
    const loginURL = process.env.NEXT_PUBLIC_API_BASE_URL + '/login';

    //if cookie does not exist redirect to login
    if(!isCookie && request.url !== loginURL){
        return NextResponse.redirect(loginURL);
    } 

    // if cookie exists check with database
    if(isCookie){
        const cookie = request.cookies.get('user');
        const cookieValue = JSON.parse(cookie.value);
        
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+'/api/cookies', {
                // cache: 'no-store',
                next: {
                    revalidate: 5
                },
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: cookieValue.username
                }),
            });
      
            if (!response.ok) {
               return NextResponse.redirect(loginURL);
            }

            if(request.url === loginURL){
                return NextResponse.redirect(process.env.NEXT_PUBLIC_API_BASE_URL + '/')
            }
            //client is still a valid user.
            return NextResponse.next();
        
        } catch (error) {
            console.log(error);
            return { success: false, error: error.message };
        }
     
    } 
}

export const config = {
    matcher: ['/login', '/', '/create', '/edit', '/record/:path*', '/manage-user', '/deleted', '/api/:path*']
}

export default cookiesMiddleware;