// // src/pages/client/UserFinesPage.tsx

// "use client";

// import { useEffect, useState } from "react";
// import { AlertTriangle, ShieldCheck } from "lucide-react";
// import { toast } from "sonner";

// // Local imports
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { FinePaymentForm } from "@/features/client/fine/FinePaymentForm"; // We will create this next
// import { formatCurrency } from "@/helper";

// // Mock data type based on your Prisma schema
// // In a real app, you would import this from your types file

// // Mock API call
// const fetchUnpaidFines = async (): Promise<IFine> => {
//   // In a real app, you would fetch from an endpoint like GET /api/users/my-fines
//   // For demonstration, we return mock data.
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve();
//     }, 1000)
//   );
// };

// export default function UserFinesPage() {
//   const [fines, setFines] = useState<IFine>();
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedFine, setSelectedFine] = useState<IFine | null>(null);

//   useEffect(() => {
//     const loadFines = async () => {
//       try {
//         const unpaidFines = await fetchUnpaidFines();
//         setFines(unpaidFines);
//       } catch (error) {
//         toast.error("Failed to load your fines.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadFines();
//   },);

//   const handlePaymentSuccess = (paidFineId: number) => {
//     // Remove the paid fine from the list for an instant UI update
//     setFines((prevFines) => prevFines.filter((f) => f.id!== paidFineId));
//     setSelectedFine(null); // Close the dialog
//   };

//   if (isLoading) {
//     return <div className="container mx-auto py-12">Loading fines...</div>;
//   }

//   return (
//     <div className="container mx-auto py-12">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-2">Your Fines</h1>
//         <p className="text-muted-foreground mb-8">
//           Please settle any outstanding fines to continue borrowing books.
//         </p>

//         {fines.length > 0? (
//           <div className="space-y-6">
//             {fines.map((fine) => (
//               <Card key={fine.id} className="bg-amber-50 border-amber-200">
//                 <CardHeader className="flex flex-row items-start justify-between">
//                   <div>
//                     <CardTitle className="text-amber-900">
//                       Fine for: {fine.loan.bookCopy.books.title}
//                     </CardTitle>
//                     <CardDescription className="text-amber-700">
//                       Reason: {fine.reason.replace("_", " ").toLowerCase()}
//                     </CardDescription>
//                   </div>
//                   <AlertTriangle className="h-8 w-8 text-amber-500" />
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-4xl font-bold text-amber-900">
//                     {formatCurrency(fine.amount)}
//                   </p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button onClick={() => setSelectedFine(fine)}>
//                     Pay Now
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 px-8 bg-green-50 border-2 border-dashed border-green-200 rounded-lg">
//             <ShieldCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-green-900">All Clear!</h3>
//             <p className="text-green-700 mt-2">You have no outstanding fines. Happy reading!</p>
//           </div>
//         )}
//       </div>

//       {/* Payment Dialog (Modal) */}
//       <Dialog open={!!selectedFine} onOpenChange={() => setSelectedFine(null)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Pay Fine</DialogTitle>
//           </DialogHeader>
//           {selectedFine && (
//             <FinePaymentForm
//               fine={selectedFine}
//               onSuccess={() => handlePaymentSuccess(selectedFine.id)}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
