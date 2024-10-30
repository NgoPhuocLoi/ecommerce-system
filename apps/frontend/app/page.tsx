import { Button } from "@repo/ui/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";

export default function Page() {
  return (
    <main>
      <div className="">
        <Button>Click me</Button>
        <Button>Click me hehe</Button>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Badge>Badge</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </main>
  );
}
