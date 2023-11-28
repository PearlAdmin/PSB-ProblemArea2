import { NextResponse } from "next/server";

/**
 * This function is middleware made to handle user authorization using cookies. 
 * @param {IncomingRequest} request - Incoming request object which contains details of the HTTP request. 
 * @returns {Promise<NextResponse>} - Promise which resolves into a Next Response.
 */
export async function cookiesMiddleware(request) {
    if (request.nextUrl.pathname.endsWith('/login')){
        return NextResponse.next()
    }

    //check if cookie with name user exists
    let isCookie = request.cookies.has('user');

    /**
     * This constant is the Login URL for the web application
     * @constant
     */
    const loginURL = process.env.NEXT_PUBLIC_VERCEL_URL + '/login';
   
    
    //if cookie does not exist redirect to login
    if(!isCookie && request.url !== loginURL){
        return NextResponse.redirect(loginURL);
    } 

    // if cookie exists check with database
    if(isCookie){

        /**
         * This constant represents the 'user' cookie obtained from the request
         * @constant
         */
        const userCookie = request.cookies.get('user');

        /**
         * This constant represents the parsed JSON data of the cookie
         * @constant
         */
        const userCookieValue = JSON.parse(userCookie.value);
        
        try {

            /**
             * Constant representing the api response obtained from POST request to 'api/cookies'
             * @constant 
             */
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
                    username: userCookieValue.username,
                    role: userCookieValue.role,
                }),
            });
            
            //redirect to login if the response of api does not exist. 
            if (!response.ok) {
               return NextResponse.redirect(loginURL);
            }

            //Prevent the user from accessing Login URL if they are already logged in
            if(request.url === loginURL){
                return NextResponse.redirect(process.env.NEXT_PUBLIC_VERCEL_URL + '/')
            }
            

            /**
             * This constant represents the last segment of the URL path
             * @constant
             */
            const pageURL = request.url.split('/').pop().split('?')[0];

            /**
             * This constant is an array of URL paths that are for the admin view only. 
             * @constant
             */
            const adminPages = ['manage-user', 'deleted'];
            

            //The code segment bellow checks if the user has the admin role and if they are trying to access an admin page. 
            if (userCookieValue.role === 'admin' && adminPages.includes(pageURL)){
                //Allow user to access the page. 
                return NextResponse.next();
            } else if (userCookieValue.role !== 'admin' && adminPages.includes(pageURL)){
                // Redirect non-admin users to forbidden page. 
                return NextResponse.redirect(process.env.NEXT_PUBLIC_VERCEL_URL + '/forbidden')
            }

            
            //client Value.s still a valid user.
            return NextResponse.next();
        } catch (error) {
            console.log(error);
            return NextResponse.redirect(process.env.NEXT_PUBLIC_VERCEL_URL + '/not-found');
        }
    } 
}

/**
 * Configuration parameters for the cookiesMiddleware.
 * @property {Array<string>} matcher - Array of URL patterns to match for this middleware.
 * @constant
 */
export const config = {
    matcher: ['/login', '/', '/create', '/edit', '/record/:path*', '/manage-user', '/deleted', '/api/:path*', '/forbidden' ]
}

export default cookiesMiddleware;