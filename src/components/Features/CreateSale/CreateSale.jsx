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
    <div className="sticky bottom-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-lg border-t border-border p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <div className="max-w-[500px] mx-auto space-y-4">
        <div className="flex justify-between items-end px-1">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              К оплате:
            </span>
            <span className="text-3xl font-black tracking-tight tracking-tighter">
              {totalSum.toLocaleString()}{" "}
              <span className="text-xl font-bold">₽</span>
            </span>
          </div>
          {success && (
            <span className="text-green-500 font-bold animate-bounce">
              ✅ Готово!
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 text-base font-bold bg-secondary/50 border-none hover:bg-secondary"
            disabled={loading || cartProducts.length === 0}
            onClick={() => handleCreateSale(true)}
          >
            {loading ? "..." : "Создать продажу"}
          </Button>

          <Button
            className="flex-1 h-12 text-base font-bold shadow-lg shadow-blue-500/20"
            disabled={loading || cartProducts.length === 0}
            onClick={() => handleCreateSale(false)}
          >
            <CheckCircle2 className="mr-2 size-5" />
            {loading ? "..." : "Создать и провести"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSale;
