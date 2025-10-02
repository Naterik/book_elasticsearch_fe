import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import testimg from "@/assets/1.webp";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
type Props = {
  borrowDuration: string;
  setBorrowDuration: (v: string) => void;
};
const BookDetailContent = ({ borrowDuration, setBorrowDuration }: Props) => {
  return (
    <div className="container mx-auto">
      <Breadcrumb className="my-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/book">Book</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>1</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-3 ">
        <div>
          <Card>
            <AspectRatio ratio={16 / 9}>
              <img
                src={testimg}
                alt="Image"
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </Card>
        </div>
        <div className="max-w-sm p-3">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl leading-snug">
              Big Bang (ed. 3x - 2019)
            </CardTitle>
            <div className="flex w-full flex-wrap gap-2">
              <Badge variant="secondary">novel</Badge>
              <Badge variant="secondary">novel</Badge>
            </div>

            <CardDescription>
              by <span className="font-medium">Jacob, Irene</span>
            </CardDescription>
            <p className="text-muted-foreground text-xl">
              A modal dialog that interrupts the user with important content and
              expects a response.
            </p>
          </CardHeader>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Borrow</CardTitle>
            <div className="space-y-2">
              <Select value={borrowDuration} onValueChange={setBorrowDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 ngày</SelectItem>
                  <SelectItem value="14">14 ngày (Khuyến nghị)</SelectItem>
                  <SelectItem value="21">21 ngày</SelectItem>
                  <SelectItem value="30">30 ngày</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Hạn trả:{" "}
                {new Date(
                  Date.now() +
                    Number.parseInt(borrowDuration) * 24 * 60 * 60 * 1000
                ).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <CardDescription>
              <div
                role="note"
                aria-label="Điều khoản mượn sách"
                className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm"
              >
                <p className="flex items-start gap-2 text-blue-700 font-semibold">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-blue-600" />
                  Điều khoản mượn sách:
                </p>

                <ul className="mt-3 ml-12 list-disc space-y-2 text-blue-700 marker:text-blue-500">
                  <li>Trả sách đúng hạn để tránh phí phạt</li>
                  <li>Giữ gìn sách trong tình trạng tốt</li>
                  <li>Có thể gia hạn 1 lần nếu không có người đặt trước</li>
                </ul>
              </div>
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button type="submit" className="w-2/5">
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
      <hr className="my-5" />
      <div>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="detail">Details</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          <TabsContent value="detail">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="content">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookDetailContent;
