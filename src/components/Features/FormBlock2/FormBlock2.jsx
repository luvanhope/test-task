"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizations,
  fetchPayboxes,
  fetchPriceTypes,
  fetchWarehouses,
  setSelectedField,
} from "./FormBlockSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings2, Landmark, Warehouse, Tag, CreditCard } from "lucide-react";

const FormBlock2 = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Token.token);

  const { organizations, payboxes, warehouses, priceTypes, selected } =
    useSelector((state) => state.formDetails);

  useEffect(() => {
    if (token) {
      dispatch(fetchOrganizations(token));
      dispatch(fetchPayboxes(token));
      dispatch(fetchWarehouses(token));
      dispatch(fetchPriceTypes(token));
    }
  }, [token, dispatch]);

  const handleChange = (field) => (value) => {
    dispatch(setSelectedField({ field, value }));
  };

  const fields = [
    {
      id: "paybox",
      label: "Счёт",
      icon: CreditCard,
      placeholder: "Выберите счёт",
      data: payboxes,
      key: "name",
    },
    {
      id: "organization",
      label: "Организация",
      icon: Landmark,
      placeholder: "Выберите организацию",
      data: organizations,
      key: "short_name",
    },
    {
      id: "warehouse",
      label: "Склад",
      icon: Warehouse,
      placeholder: "Выберите склад",
      data: warehouses,
      key: "name",
    },
    {
      id: "priceType",
      label: "Тип цены",
      icon: Tag,
      placeholder: "Выберите тип цены",
      data: priceTypes,
      key: "name",
    },
  ];

  return (
    <div className="flex w-full justify-center p-2 sm:p-4">
      <Card className="w-full max-w-[600px] border-none shadow-md rounded-[24px] sm:rounded-[32px] overflow-hidden bg-white">
        <CardHeader className="p-5 sm:p-8 pb-3">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Settings2 size={24} className="text-primary" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-black tracking-tight">
              3. Параметры продажи
            </CardTitle>
          </div>
          <CardDescription className="text-sm sm:text-base font-medium">
            Настройте логистику и финансовые параметры документа
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 sm:p-8 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] text-muted-foreground/80 flex items-center gap-2 ml-1">
                  <field.icon size={14} className="text-primary/60" />
                  {field.label}
                </Label>
                <Select
                  value={selected?.[field.id] || ""}
                  onValueChange={handleChange(field.id)}
                >
                  <SelectTrigger className="h-12 sm:h-13 rounded-2xl bg-muted/40 border-none hover:bg-muted/60 focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base font-bold">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-2xl p-1 max-h-[300px]">
                    {field.data?.length > 0 ? (
                      field.data.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={String(item.id)}
                          className="rounded-xl py-3 focus:bg-primary/10 focus:text-primary transition-colors cursor-pointer"
                        >
                          <span className="font-semibold">
                            {item[field.key]}
                          </span>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-muted-foreground animate-pulse">
                        Загрузка данных...
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormBlock2;
