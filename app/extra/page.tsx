import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
export default async function Test() {
  const session = await getServerSession(options);
  if (session?.user.isAdmin) {
    return (
      <div>
        <h1>Admin</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Not Admin</h1>
      </div>
    );
  }

}