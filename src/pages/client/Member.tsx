import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  memberRegistrationSchema,
  type MemberRegistrationSchema,
} from "@/lib/validators/member";
import { formatCurrency } from "@/helper";
import { getVNPayUrlAPI, postCreateMemberCardAPI } from "@/services/api";
import { useCurrentApp } from "@/app/providers/app.context";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
// Define costs in a constant
const DURATION_COST = {
  "6": 50000,
  "12": 100000,
  COD: 0,
};

export default function MemberPage() {
  const { isAuthenticated } = useCurrentApp();
  console.log("object :>> ", isAuthenticated);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useCurrentApp();
  const navigate = useNavigate();
  const paymentRef = uuidv4();
  const userId = user?.id;

  const form = useForm<MemberRegistrationSchema>({
    resolver: zodResolver(memberRegistrationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
    },
  });

  const selectedDuration = form.watch("duration");

  async function onSubmit(values: MemberRegistrationSchema) {
    setIsSubmitting(true);
    let res = null;
    try {
      if (user?.status === "ACTIVE") {
        toast.message("You are already a member.");
        navigate("/");
        return;
      }
      if (values.duration === "COD" || !paymentRef) {
        res = await postCreateMemberCardAPI({ ...values, userId });
        if (res.data) {
          toast.success("Registration successful! Please wait for approval.");
          navigate("/");
        }
      } else {
        res = await postCreateMemberCardAPI({
          ...values,
          userId,
          paymentRef,
        });
      }

      if (res.data) {
        const r = await getVNPayUrlAPI(
          res.data.amount,
          "vn",
          res.data.paymentRef
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
      toast.success("Registration successful! Please wait for approval.");
      navigate("/");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Membership Registration</CardTitle>
          <CardDescription>
            Complete the form below to become a library member.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="09xxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, Anytown, USA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Membership Duration</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="6" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            6 Months - {formatCurrency(DURATION_COST["6"])}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="12" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            12 Months - {formatCurrency(DURATION_COST["12"])}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="COD" />
                          </FormControl>
                          <FormLabel className="font-normal">COD</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedDuration && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800">
                    Payment Information
                  </h4>
                  <p className="text-sm text-gray-700 mt-2">
                    Please transfer{" "}
                    {!DURATION_COST["COD"] && (
                      <strong className="text-blue-600">
                        {formatCurrency(DURATION_COST[selectedDuration])}
                      </strong>
                    )}
                    to our bank account and enter the transaction reference
                    below (if any).
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
