import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { IPendingReservation } from "@/types/dashboard";
import { formatDate } from "@/helper";

interface PendingReservationsTableProps {
  data: IPendingReservation[];
}

export function PendingReservationsTable({
  data,
}: PendingReservationsTableProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Pending Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[350px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead className="text-right">Available Copies</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No pending reservations
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.user.avatar || ""} />
                        <AvatarFallback>
                          {item.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {item.user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.book.image && (
                          <img
                            src={item.book.image}
                            alt={item.book.title}
                            className="h-8 w-6 object-cover rounded"
                          />
                        )}
                        <span
                          className="text-sm truncate max-w-[150px]"
                          title={item.book.title}
                        >
                          {item.book.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {formatDate(item.requestDate)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          item.book.availableCopiesCount > 0
                            ? "default"
                            : "destructive"
                        }
                        className="p-2"
                      >
                        {item.book.availableCopiesCount}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
