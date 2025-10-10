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
import testsmall from "@/assets/Screenshot 2025-08-11 171331.png";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
type Props = {
  borrowDuration: string;
  setBorrowDuration: (v: string) => void;
  dataDetailBook: IBook | null;
};
const BookDetailContent = ({
  borrowDuration,
  setBorrowDuration,
  dataDetailBook,
}: Props) => {
  console.log("dataDetailBook :>> ", dataDetailBook);
  return (
    <>
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
            <BreadcrumbPage>{dataDetailBook?.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 space-y-3  md:grid-cols-3 ">
        <div>
          <Card className="w-full h-135 md:max-w-120 max-h-135 overflow-hidden rounded-xl bg-muted">
            <div className="aspect-[5/4] md:aspect-[4/5]">
              <img
                src={dataDetailBook?.image}
                alt="Image"
                className="rounded-md object-cover object-center size-full"
              />
            </div>
          </Card>
        </div>
        <div className="w-full md: max-0 p-3 ">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-center md:text-left leading-snug">
              {dataDetailBook?.title}
            </CardTitle>
            <div className="text-2xl text-center md:flex w-full flex-wrap gap-2">
              {dataDetailBook?.genres?.map((g) => (
                <Badge variant="secondary">{g.genres.name}</Badge>
              ))}
            </div>

            <CardDescription className="font-medium text-center md:text-left w-auto">
              by{" "}
              <span className="font-medium">
                {dataDetailBook?.authors?.name}
              </span>
            </CardDescription>
            <p className="text-center   md:text-left text-xl text-muted-foreground ">
              {dataDetailBook?.shortDesc}
            </p>
          </CardHeader>
        </div>
        <Card className="h-full max-h-90">
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
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Separator className="my-5" />
    </>
  );
};

export default BookDetailContent;
