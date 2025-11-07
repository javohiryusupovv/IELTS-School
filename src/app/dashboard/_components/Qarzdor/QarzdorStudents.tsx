"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Phone, Mail } from "lucide-react";
import { IStudent } from "@/types/type";
import Link from "next/link";

export function formatCurrency(value: number) {
  return (
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(value) + " so'm"
  );
}

const getStatusBadge = (remainingDebt: number) => {
  if (remainingDebt > 0) {
    return (
      <Badge variant="destructive" className="text-xs">
        Qarzdor
      </Badge>
    );
  }
  return <Badge className="text-xs">To‘liq to‘landi</Badge>;
};

export default function QarzdorStudents({
  students,
}: {
  students: IStudent[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Qarzdorlarni filter qilish
  const debtors = students.filter((student: IStudent) => {
    if (!student.course) return false;
    if (!student.publishStudent) return false;
    return student.balance < 0;
  });

  // 🔹 Qidiruv orqali filter
  const filteredDebtors = debtors.filter((student: IStudent) => {
    const fullName = `${student.name} ${student.surname}`.toLowerCase();
    const course = student.course?.courseTitle?.toLowerCase() || "";
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      course.includes(searchTerm.toLowerCase())
    );
  });
  const visibleDebtors = filteredDebtors.slice(0, 5);

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Qarzdor talabalar
          </CardTitle>
        </div>

        {/* Qidiruv */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <StudentList debtors={visibleDebtors} />
        {filteredDebtors.length > 5 && (
          <div className="mt-3 text-center">
            <Link
              href="/dashboard/students"
              className="text-sm text-orange-600 hover:underline"
            >
              Qolgan qarzdorlarni ko‘rish →
            </Link>
          </div>
        )}
      </CardContent>

      {/* Jami hisob */}
      <div className="mt-4 py-3 border-t border-border">
        <div className="flex items-center justify-between text-sm px-6">
          <span className="text-muted-foreground">Jami qarzdorlar:</span>
          <span className="font-medium text-foreground">
            {debtors.length} ta
          </span>
        </div>
      </div>
    </Card>
  );
}

// 👥 Qarzdor talabalar ro‘yxati
function StudentList({ debtors }: { debtors: IStudent[] }) {
  if (debtors.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Hozircha qarzdorlar topilmadi
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {debtors.map((student: IStudent) => {
        const remainingDebt = Math.abs(student.balance); // qarz miqdori manfiydan ijobiyga
        const isDebtor = student.balance < 0;

        return (
          <div
            key={student._id}
            className="border border-border rounded-lg p-3 hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground truncate">
                  {student.name} {student.surname}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {student.course?.courseTitle || "Kurs tanlanmagan"}
                </p>
              </div>

              {/* Menyu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-xs" asChild>
                    <a
                      href={`tel:+998${student.phone}`}
                      className="flex items-center text-xs"
                    >
                      <Phone className="h-3 w-3 mr-2" />
                      Qo'ng'iroq qilish
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Oxirgi to‘lov yoki kurs narxi */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-foreground">
                {student.course?.price
                  ? formatCurrency(student.course.price)
                  : "Kurs narxi mavjud emas"}
              </div>
              {getStatusBadge(remainingDebt)}
            </div>

            {/* Qolgan qarz yoki to‘liq to‘langan bo‘lsa */}
            <div className="text-xs text-muted-foreground mt-1">
              {isDebtor ? (
                <p>
                  Qolgan qarz:{" "}
                  <span className="font-semibold underline text-red-600">
                    {formatCurrency(remainingDebt)}
                  </span>
                </p>
              ) : (
                "✅ To‘liq to‘landi"
              )}
            </div>

            {/* Keyingi to‘lov sanasi faqat qarzdor bo‘lsa ko‘rsatilsin */}
            {isDebtor && (
              <p className="text-xs text-foreground">
                Keyingi to‘lov:{" "}
                <span className="font-medium text-orange-500">
                  <NextPaymentDate date={student.paymentNext} />
                </span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function NextPaymentDate({ date }: { date: string | Date }) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    if (date) {
      const d = new Date(date);
      setFormatted(d.toLocaleDateString("uz-UZ"));
    }
  }, [date]);

  if (!formatted) return null;

  return formatted;
}
