import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export async function cookiesMiddleware(request) {
    if (request.nextUrl.pathname.endsWith('/login')){
        return NextResponse.next()
    }

    //check if cookie with name user exists
    let isCookie = request.cookies.has('user');
    const loginURL = process.env.NEXT_PUBLIC_VERCEL_URL + '/login';
    console.log("IN MID", request.nextUrl.pathname);
    
    //if cookie does not exist redirect to login
    if(!isCookie && request.url !== loginURL){
        return NextResponse.redirect(loginURL);
    } 

    // if cookie exists check with database
    if(isCookie){
        const cookie = request.cookies.get('user');

        const cookieValue = JSON.parse(cookie.value);
        console.log(cookieValue);
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_VERCEL_URL+'/api/cookies', {
                // cache: 'no-store',
                next: {
                    revalidate: 5
                },
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: cookieValue.username,
                    role: cookieValue.role,
                }),
            });
      
            if (!response.ok) {
                console.log('COOKIE NOT OK')
               return NextResponse.redirect(loginURL);
            }

            //Prevent the user from accessing Login URL if they are already logged in
            console.log("IF REQ == LOGIN", )
            if(request.url === loginURL){
                return NextResponse.redirect(process.env.NEXT_PUBLIC_VERCEL_URL + '/')
            }

            // const adminPage = ['/manage-user', '/deleted'];
            // const lastSegment = request.url.pathname.split('/');
            
            // console.log('ADMIN Page', lastSegment);
            // if (cookieValue.role === 'admin' && adminPage.includes(lastSegment)){
            //     return NextResponse.next();
            // } 
            const pageURL = request.url.split('/').pop().split('?')[0];
            const adminPages = ['manage-user', 'deleted'];
            console.log("ROLE:", cookieValue.role);
            if (cookieValue.role === 'admin' && adminPages.includes(pageURL)){
                return NextResponse.next();
            } else if (cookieValue.role !== 'admin' && adminPages.includes(pageURL)){
                
                return NextResponse.redirect(process.env.NEXT_PUBLIC_VERCEL_URL + '/forbidden')
            }

            
            //client Value.s still a valid user.
            return NextResponse.next();
        } catch (error) {
            console.log(error);
            return { success: false, error: error.message };
        }
    } 
}

export const config = {
    matcher: ['/login', '/', '/create', '/edit', '/record/:path*', '/manage-user', '/deleted', '/api/:path*', '/forbidden' ]
}

export default cookiesMiddleware;