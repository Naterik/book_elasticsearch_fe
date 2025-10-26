import { useEffect, useState } from "react";
import BookDetailContent from "@/features/client/book-detail/components/BookDetailContent";
import BookDetailInfo from "@/features/client/book-detail/components/BookDetailInfo";
import { useParams } from "react-router";
import { getBookByIdAPI } from "@/services/api";
import { useCurrentApp } from "@/app/providers/app.context";

const DetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useCurrentApp();
  const [dataDetailBook, setDataDetailBook] = useState<IBook | null>(null);
  const [borrowDuration, setBorrowDuration] = useState("7");

  const fetchBookById = async () => {
    const res = await getBookByIdAPI(+id!);
    if (res.data) {
      setDataDetailBook(res.data);
    }
  };

  useEffect(() => {
    fetchBookById();
  }, [id]);

  return (
    <main className="container mx-auto px-4 py-8">
      <BookDetailContent
        borrowDuration={borrowDuration}
        setBorrowDuration={setBorrowDuration}
        dataDetailBook={dataDetailBook}
        user={user}
        isAuthenticated={isAuthenticated}
      />
      <BookDetailInfo item={dataDetailBook} />
    </main>
  );
};

export default DetailPage;
