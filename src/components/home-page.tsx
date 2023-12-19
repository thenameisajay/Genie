import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function HomePage() {
  return (
    <>
      <div className="flex flex-col  items-center text-center h-screen w-screen  absolute top-36 ">
        <h1>Genie</h1>
        <h3>I know All , I see All</h3>
        <div className=" relative top-20 w-72">
          <Card>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
