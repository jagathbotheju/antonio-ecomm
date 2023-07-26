import { verifyWithCredentials } from "@/app/actions/authActions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props {
  searchParams: {
    token: string;
  };
}

const VerifyPage = async ({ searchParams }: Props) => {
  const res = await verifyWithCredentials(searchParams.token);

  return (
    <div className="flex h-full justify-center items-center mt-20">
      <Card className="w-[30%] bg-gray-200">
        <CardHeader className="text-2xl font-bold">ECOMM App</CardHeader>
        <CardContent>
          <span>{res?.message}</span>
          <p>Please return to your App</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyPage;
