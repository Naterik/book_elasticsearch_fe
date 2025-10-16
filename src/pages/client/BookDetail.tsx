import { use, useEffect, useState } from "react";
import BookDetailContent from "@/features/client/book-detail/components/BookDetailContent";
import BookDetailInfo from "@/features/client/book-detail/components/BookDetailInfo";
import { useParams } from "react-router";
import { getBookByIdAPI, getBookOnLoanAPI } from "@/services/api";
import { useCurrentApp } from "@/app/providers/app.context";
import { toast } from "sonner";
const DetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useCurrentApp();
  const [dataDetailBook, setDataDetailBook] = useState<IBook | null>(null);
  const [dueDate, setDueDate] = useState<string>("");

  let count = 0;
  const fetchBookById = async () => {
    const res = await getBookByIdAPI(+id!);
    if (res.data) {
      setDataDetailBook(res.data);
      count += 1;
    }
  };

  useEffect(() => {
    fetchBookById();
  }, []);

  const [borrowDuration, setBorrowDuration] = useState("7");
  return (
    <div className="container mx-auto">
      <BookDetailContent
        borrowDuration={borrowDuration}
        setBorrowDuration={setBorrowDuration}
        dataDetailBook={dataDetailBook}
        setDueDate={setDueDate}
        user={user}
        isAuthenticated={isAuthenticated}
        dueDate={dueDate}
        count={count}
      />
      <BookDetailInfo item={dataDetailBook} />
    </div>
  );
};

export default DetailPage;
