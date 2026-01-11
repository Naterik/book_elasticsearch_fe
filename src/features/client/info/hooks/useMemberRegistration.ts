import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";
import {
  memberRegistrationSchema,
  type MemberRegistrationSchema,
} from "@/lib/validators/member";
import { PaymentService, MemberService } from "@/lib/api";
export const DURATION_COST = {
  "6": 50000,
  "12": 100000,
  COD: 0,
} as const;

export const useMemberRegistration = () => {
  const { user, isAuthenticated } = useCurrentApp();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentRef = uuidv4();
  const userId = user?.id;

  const form = useForm<MemberRegistrationSchema>({
    resolver: zodResolver(memberRegistrationSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      phone: "",
      address: "",
    },
  });

  const selectedDuration = form.watch("duration");

  const onSubmit = async (values: MemberRegistrationSchema) => {
    setIsSubmitting(true);
    let res = null;

    try {
      if (user?.status === "ACTIVE") {
        toast.message("You are already a member.");
        navigate("/");
        return;
      }

      if (values.duration === "COD" || !paymentRef) {
        res = await MemberService.postCreateMemberCard({ ...values, userId });
        if (res.data) {
          toast.success("Registration successful! Please wait for approval.");
          navigate("/");
        }
      } else {
        res = await MemberService.postCreateMemberCard({
          ...values,
          userId,
          paymentRef,
        });
      }

      if (res.data && values.duration !== "COD") {
        const r = await PaymentService.getVNPayUrl(
          res.data.amount,
          "vn",
          res.data.paymentRef,
          "membership"
        );
        if (r.data) {
          window.location.href = r.data.url;
        } else {
          toast.error("Failed to get payment URL");
        }
      }

      if (!res.data) {
        throw new Error(res.message || "An unexpected error occurred.");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    selectedDuration,
    isAuthenticated,
    onSubmit,
  };
};
