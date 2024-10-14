import Signup from "@/components/signup-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServerSignup = () => {
  return (
    <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Signup</CardTitle>
      </CardHeader>
      <CardContent>
        <Signup />
      </CardContent>
    </Card>
  );
};

export default ServerSignup;
