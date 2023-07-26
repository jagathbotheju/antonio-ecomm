import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

interface Props {
  searchParams: {
    error: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const error = searchParams?.error;
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col">
      <h2>Home Page</h2>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <p>{JSON.stringify(session?.user)}</p>
      {error && <p className="mt-10 p-10 bg-red-200">{error}</p>}
    </main>
  );
}
