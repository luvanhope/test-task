"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createSale } from "./CreateSaleSlice";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const CreateSale = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.Token.token);
  const cartProducts = useSelector((state) => state.CartProducts.cartProducts);
  const selectedClient = useSelector((state) => state.Clients.selectedClient);
  const { selected } = useSelector((state) => state.formDetails);
  const { loading, error, success } = useSelector((state) => state.Sales);

  const totalSum = cartProducts.reduce(
    (sum, item) => sum + item.count * item.price,
    0,
  );

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {}, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleCreateSale = (isDraft = true) => {
    if (!selectedClient?.id) {
      alert("Ошибка: Не выбран клиент");
      return;
    }

    const warehouseId = Number(selected?.warehouse || 0);
    const payboxId = Number(selected?.paybox || 0);
    const orgId = Number(selected?.organization || 0);

    if (!orgId || !payboxId || !warehouseId) {
      alert("Заполните Счёт, Организацию и Склад");
      return;
    }

    const payload = [
      {
        priority: 0,
        dated: Math.floor(Date.now() / 1000),
        operation: "Заказ",
        tax_included: true,
        tax_active: true,
        goods: cartProducts.map((product) => ({
          price: Number(product.price || 0),
          quantity: Number(product.count || 0),
          unit: 116,
          discount: 0,
          sum_discounted: 0,
          nomenclature: Number(product.productId),
        })),
        settings: {},
        warehouse: warehouseId,
        contragent: Number(selectedClient.id),
        paybox: payboxId,
        organization: orgId,
        status: !isDraft,
        paid_rubles: Number(totalSum.toFixed(2)),
        paid_lt: 0,
      },
    ];

    dispatch(createSale({ token, payload }));
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 py-10 px-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col items-center gap-2 w-full max-w-[500px] mx-auto">
        <div className="flex justify-between items-center w-full px-2">
          <span className="text-[14px] font-medium text-slate-500">Итого:</span>
          <span className="text-[18px] font-bold text-black">
            {totalSum.toLocaleString()} ₽
          </span>
        </div>

        <div className="flex flex-row gap-2 w-full">
          <Button
            onClick={() => handleCreateSale(true)}
            disabled={loading || cartProducts.length === 0}
            className="flex-1 h-[40px] bg-sky-500 hover:bg-sky-600 text-white rounded-[10px] text-[14px] font-semibold transition-all active:scale-[0.97]"
          >
            {loading ? "..." : "Создать"}
          </Button>

          <Button
            onClick={() => handleCreateSale(false)}
            disabled={loading || cartProducts.length === 0}
            variant="outline"
            className="flex-1 h-[40px] bg-[#D1E9E6] hover:bg-[#c2deda] text-[#0F3D38] border-none rounded-[10px] text-[14px] font-semibold flex items-center justify-center gap-1 transition-all active:scale-[0.97]"
          >
            <CheckCircle2 size={16} />
            {loading ? "..." : "Провести"}
          </Button>
        </div>

        {success && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full shadow-lg text-[12px] font-medium animate-in fade-in zoom-in duration-300">
            ✅ Успешно создано!
          </div>
        )}
        {error && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full shadow-lg text-[12px] font-medium animate-in fade-in zoom-in duration-300">
            ❌ Ошибка данных
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSale;
