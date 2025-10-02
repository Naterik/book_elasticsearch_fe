import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function BookCard({ item }: { item: Item }) {
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
        <CardDescription className="truncate">{item.authors}</CardDescription>
      </CardHeader>

      <CardContent className="px-0 space-y-1 text-sm text-muted-foreground">
        {item.meta1 && <p>{item.meta1}</p>}
        {item.meta2 && <p>{item.meta2}</p>}
        <p className="mt-1">{item.publisher}</p>
      </CardContent>
    </Card>
  );
}
