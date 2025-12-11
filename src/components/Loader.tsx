import { DotLoader } from "react-spinners";

interface ILoaderProps {
  isVisible: boolean;
}

export const GlobalLoader = ({ isVisible }: ILoaderProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <DotLoader size={50} color="#078EF5" />
    </div>
  );
};
