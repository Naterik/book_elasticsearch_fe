import {
  BookDetailContent,
  BookDetailInfo,
  useBookDetail,
} from "@/features/client/book-detail";

const DetailPage = () => {
  const {
    dataDetailBook,
    borrowDuration,
    setBorrowDuration,
    user,
    isAuthenticated,
  } = useBookDetail();

  return (
    <main className="container mx-auto  py-8">
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
