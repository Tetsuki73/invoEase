import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Home() {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-4">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Log-In</CardTitle>
              <CardDescription>Enter you email to login into your account</CardDescription>
            </CardHeader>
            <CardTitle>
              <form className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2"> 
                  <Label>Email</Label>
                  <Input placeholder="hello@gmail.com" />
                </div>
                <Button>Submit</Button>
              </form>
            </CardTitle>
          </Card>

      </div>


    </>
  );
}

