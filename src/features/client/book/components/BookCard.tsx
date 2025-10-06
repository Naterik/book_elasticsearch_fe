import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function BookCard({ item }: { item: IBook }) {
  return (
    <Card className="w-[240px] border-0 shadow-none hover:shadow-2xl transition p-4">
      <div className="aspect-[3/4] overflow-hidden rounded">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <CardHeader className="px-0 pt-3">
        <CardTitle className="text-base leading-snug truncate">
          {item.title}
        </CardTitle>
        <CardDescription className="truncate space-x-1">
          {item.genres.map((g: any) => (
            <Badge variant="outline" className="" key={g.genres.id}>
              {g.genres.name}
            </Badge>
          ))}
        </CardDescription>
        <CardDescription className="truncate">
          {item.authors.name}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 space-y-1 text-sm text-muted-foreground line-clamp-3">
        {item.shortDesc && <p>{item.shortDesc}</p>}
        {/* <p className="mt-1">{item.publisher}</p> */}
      </CardContent>
    </Card>
  );
}
