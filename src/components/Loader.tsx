import { useCurrentApp } from "@/app/providers/app.context";
import { DotLoader } from "react-spinners";

export const GlobalLoader = () => {
  const { isLoading } = useCurrentApp();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <DotLoader size={50} color="#078EF5" />
    </div>
  );
};
