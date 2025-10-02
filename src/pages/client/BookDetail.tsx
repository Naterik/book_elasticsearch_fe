import { useState } from "react";

import BookDetailContent from "@/features/client/book-detail/components/BookDetailContent";
import BookDetailInfo from "@/features/client/book-detail/components/BookDetailInfo";
const DetailPage = () => {
  const [borrowDuration, setBorrowDuration] = useState("7");
  return (
    <div className="container mx-auto">
      <BookDetailContent
        borrowDuration={borrowDuration}
        setBorrowDuration={setBorrowDuration}
      />
      <BookDetailInfo />
    </div>
  );
};

export default DetailPage;
