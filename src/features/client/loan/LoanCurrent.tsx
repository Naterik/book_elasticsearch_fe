import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoanItem } from "./LoanItem";
import { getLoanByUserIdAPI } from "@/services/api";

const LoanCurrent = () => {
  const [dataLoan, setDataLoan] = useState<any>();

  useEffect(() => {
    const fetchAllLoans = async () => {
      const res: any = await getLoanByUserIdAPI(25);
      console.log("res :>> ", res.data);
      if (res.data) {
        setDataLoan(res?.data);
      }
    };
    fetchAllLoans();
  }, []);
  console.log("dataLoan :>> ", dataLoan);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Sách đang mượn</CardTitle>
          <CardDescription>
            Danh sách các cuốn sách bạn đang mượn và thông tin trả sách
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataLoan?.length > 0 ? (
              dataLoan.map((loan: ILoan) => (
                <LoanItem key={loan.id} loan={loan} />
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                Bạn không có sách nào đang mượn.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanCurrent;
