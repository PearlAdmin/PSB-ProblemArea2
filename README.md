This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Coding Standards
- This guide serves as a fundamental resource, outlining the established guidelines to maintain uniformity and clarity within our codebase.
- By adhering to these coding standards, you contribute significantly to our collaborative development efforts. Consistency in coding practices not only enhances readability but also streamlines the debugging and maintenance processes. We appreciate your attention to detail and commitment to upholding these standards, ensuring the creation of a robust and efficient Next.js React application.
### app/
- main directory for frontend pages and APIs
- corresponds to the page routing
#### api/
- directory that stores the APIs
#### create/
- stores the page for creating new records
#### edit/
- stores the page for editing records
#### login/
- stores the page for user login
#### manage-user
- stores the page for managing the authorized users
#### page.jsx
- store the home page after log in
### components/
- directory for components 
#### create-record/
- stores the components for creating records
#### login/
- stores the components for login page
#### manage-user/
- stores the components for managing user
#### navigation
- component for the nav bar
#### bootstrap
- component for importing the bootstrap
#### pagination
- component for creating pagination feature
#### sort-search
- component for sorting and searching
#### view-all-individual-card
- component for viewing the individual information of records