import { useEffect, useState } from "react";

import BookDetailContent from "@/features/client/book-detail/components/BookDetailContent";
import BookDetailInfo from "@/features/client/book-detail/components/BookDetailInfo";
import { useParams } from "react-router";
import { getBookByIdAPI } from "@/services/api";
const DetailPage = () => {
  const { id } = useParams();
  const [dataDetailBook, setDataDetailBook] = useState<IBook | null>(null);

  useEffect(() => {
    const fetchBookById = async () => {
      const res = await getBookByIdAPI(+id!);
      if (res.data) {
        setDataDetailBook(res.data);
      }
    };
    fetchBookById();
  }, []);
  const [borrowDuration, setBorrowDuration] = useState("7");
  return (
    <div className="container mx-auto">
      <BookDetailContent
        borrowDuration={borrowDuration}
        setBorrowDuration={setBorrowDuration}
        dataDetailBook={dataDetailBook}
      />
      <BookDetailInfo item={dataDetailBook} />
    </div>
  );
};

export default DetailPage;
