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

  return (
    <div className="flex w-full justify-center p-4">
      <Card className="w-full max-w-[600px] shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings2 size={20} className="text-primary" />
            </div>
            <CardTitle className="text-2xl">3. Параметры продажи</CardTitle>
          </div>
          <CardDescription className="text-base">
            Настройте счёт, организацию, склад и тип цены для документа
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <CreditCard size={14} /> Счёт
              </Label>
              <Select
                value={selected?.paybox || ""}
                onValueChange={handleChange("paybox")}
              >
                <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-none hover:bg-muted/50 transition-colors">
                  <SelectValue placeholder="Выберите счёт" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  {payboxes?.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Landmark size={14} /> Организация
              </Label>
              <Select
                value={selected?.organization || ""}
                onValueChange={handleChange("organization")}
              >
                <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-none hover:bg-muted/50 transition-colors">
                  <SelectValue placeholder="Выберите организацию" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  {organizations?.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.short_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Warehouse size={14} /> Склад
              </Label>
              <Select
                value={selected?.warehouse || ""}
                onValueChange={handleChange("warehouse")}
              >
                <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-none hover:bg-muted/50 transition-colors">
                  <SelectValue placeholder="Выберите склад" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  {warehouses?.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Tag size={14} /> Тип цены
              </Label>
              <Select
                value={selected?.priceType || ""}
                onValueChange={handleChange("priceType")}
              >
                <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-none hover:bg-muted/50 transition-colors">
                  <SelectValue placeholder="Выберите тип цены" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl">
                  {priceTypes?.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormBlock2;
