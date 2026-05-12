"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizations,
  fetchPayboxes,
  fetchPriceTypes,
  fetchWarehouses,
  setSelectedField,
} from "./FormBlockSlice";

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
      <div className="flex w-[600px] flex-col items-start bg-white border-gray-200 border rounded-[15px] p-[20px] shadow-sm h-fit">
        <h1 className="text-[22px] font-bold text-black mb-2">
          3. Параметры продажи
        </h1>
        <p className="text-gray-500 mb-[30px] text-[18px] font-[400]">
          Счёт, организация, склад и тип цены
        </p>

        <div className="flex flex-col gap-5 w-full items-start">
          {/* Счёт */}
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-black text-[17px] font-semibold">Счёт</Label>
            <Select
              value={selected?.paybox || ""}
              onValueChange={handleChange("paybox")}
            >
              <SelectTrigger className="w-full sm:w-fit min-w-[200px] h-[45px] rounded-[15px] border-[#E8E4DE] bg-white gap-3 px-4">
                <SelectValue placeholder="Выберите счёт" />
              </SelectTrigger>
              <SelectContent className="rounded-[15px]">
                {payboxes?.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label className="text-black text-[17px] font-semibold">
              Организация
            </Label>
            <Select
              value={selected?.organization || ""}
              onValueChange={handleChange("organization")}
            >
              <SelectTrigger className="w-full sm:w-fit min-w-[200px] h-[45px] rounded-[15px] border-[#E8E4DE] bg-white gap-3 px-4">
                <SelectValue placeholder="Выберите организацию" />
              </SelectTrigger>
              <SelectContent className="rounded-[15px]">
                {organizations?.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.short_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label className="text-black text-[17px] font-semibold">
              Склад
            </Label>
            <Select
              value={selected?.warehouse || ""}
              onValueChange={handleChange("warehouse")}
            >
              <SelectTrigger className="w-full sm:w-fit min-w-[200px] h-[45px] rounded-[15px] border-[#E8E4DE] bg-white gap-3 px-4">
                <SelectValue placeholder="Выберите склад" />
              </SelectTrigger>
              <SelectContent className="rounded-[15px]">
                {warehouses?.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label className="text-black text-[17px] font-semibold">
              Тип цены
            </Label>
            <Select
              value={selected?.priceType || ""}
              onValueChange={handleChange("priceType")}
            >
              <SelectTrigger className="w-full sm:w-fit min-w-[200px] h-[45px] rounded-[15px] border-[#E8E4DE] bg-white gap-3 px-4">
                <SelectValue placeholder="Выберите тип цены" />
              </SelectTrigger>
              <SelectContent className="rounded-[15px]">
                {priceTypes?.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBlock2;
