"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSale } from "./CreateSaleSlice";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";

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
    <div className="sticky bottom-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-xl border-t border-border p-4 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-all">
      <div className="max-w-[600px] mx-auto space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted-foreground">
              Итого к оплате
            </span>
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-primary">
              {totalSum.toLocaleString()}{" "}
              <span className="text-lg sm:text-xl font-bold">₽</span>
            </span>
          </div>

          {success && (
            <div className="flex items-center gap-1 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs sm:text-sm font-bold animate-in fade-in zoom-in duration-300">
              <CheckCircle2 size={16} />
              <span>Создано</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 sm:h-14 text-sm sm:text-base font-bold rounded-2xl bg-secondary/50 border-none hover:bg-secondary transition-all active:scale-95"
            disabled={loading || cartProducts.length === 0}
            onClick={() => handleCreateSale(true)}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Создать"}
          </Button>

          <Button
            className="flex-[1.5] h-12 sm:h-14 text-sm sm:text-base font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95"
            disabled={loading || cartProducts.length === 0}
            onClick={() => handleCreateSale(false)}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="mr-2 hidden sm:block" size={20} />
                <span>Создать и провести</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSale;
