import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useCurrentApp } from "@/app/providers/app.context";
import { BookService } from "@/lib/api";

export const useBookDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated, setIsLoading } = useCurrentApp();
  const [dataDetailBook, setDataDetailBook] = useState<IBook | null>(null);
  const [borrowDuration, setBorrowDuration] = useState("7");
  const fetchBookById = async () => {
    if (!id) return;
    setIsLoading(true);
    const res = await BookService.getBookById(+id);
    if (res.data) {
      setDataDetailBook(res.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchBookById();
  }, [id]);

  return {
    dataDetailBook,
    borrowDuration,
    setBorrowDuration,
    user,
    isAuthenticated,
  };
};
