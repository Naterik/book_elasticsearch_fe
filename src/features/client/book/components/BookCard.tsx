import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookCard({ item }: { item: IBook }) {
  const navigate = useNavigate();
  const placeholderImage =
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop";

  return (
    <Card
      className="p-0 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 duration-300 cursor-pointer group"
      onClick={() => navigate(`/book/${item.id}`)}
    >
      <AspectRatio ratio={3 / 4}>
        <img
          src={item.image || placeholderImage}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          draggable={false}
        />
      </AspectRatio>
      <div className="p-3 bg-white">
        <p className="text-sm font-semibold truncate text-gray-900">
          {item.title}
        </p>
        <p className="text-xs text-gray-500 truncate mt-1">
          {item.authors?.name}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-xs font-medium ${
              item.quantity - item.borrowed > 0
                ? "text-blue-600"
                : "text-red-500"
            }`}
          >
            {item.quantity - item.borrowed > 0 ? "AVAILABLE" : "OUT OF STOCK"}
          </span>
          <span className="text-xs text-gray-400 flex items-center">
            <TrendingUp className="h-3 w-3 inline mr-1" />
            {item.borrowed}
          </span>
        </div>
      </div>
    </Card>
  );
}
