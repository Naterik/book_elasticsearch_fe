import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helper";

// Interface cho props vẫn giữ nguyên
interface FinePaymentFormProps {
  fine: { id: number; amount: number };
  onSuccess: () => void;
}

export function FinePaymentForm({ fine, onSuccess }: FinePaymentFormProps) {
  // Chỉ cần một state để quản lý trạng thái loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Logic xử lý được chuyển vào một hàm onClick đơn giản
  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/users/fine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fineId: fine.id,
          paymentRef: null, // Gửi `null` vì không có input từ người dùng
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Payment failed.");
      }

      toast.success("Fine paid successfully!");
      onSuccess(); // Báo cho component cha để cập nhật UI
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Phần hiển thị thông tin được giữ nguyên */}
      <div className="p-4 bg-gray-100 rounded-md text-center">
        <p className="text-sm text-gray-600">Amount to pay:</p>
        <p className="text-3xl font-bold">{formatCurrency(fine.amount)}</p>
      </div>

      {/* Thông điệp xác nhận rõ ràng */}
      <p className="text-center text-sm text-muted-foreground">
        Please confirm that you want to proceed with the payment for this fine.
      </p>

      {/* Nút bấm với trình xử lý onClick trực tiếp */}
      <Button
        onClick={handleConfirmPayment}
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Confirm Payment
      </Button>
    </div>
  );
}
