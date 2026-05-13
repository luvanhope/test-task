"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiShoppingCart,
  FiTrash2,
  FiPackage,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { deleteFromCart, updateCartItem } from "./CartSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.CartProducts.cartProducts);

  const handleUpdate = (productId, field, value) => {
    const safeValue = field === "count" ? Math.max(1, Number(value)) : value;
    dispatch(updateCartItem({ productId, field, value: safeValue }));
  };

  return (
    <div className="flex w-full justify-center p-2 sm:p-4">
      <div className="w-full max-w-[600px] space-y-4">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <FiShoppingCart className="text-primary" size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">5. Корзина</h2>
              <p className="hidden sm:block text-sm text-muted-foreground font-medium">
                Позиции в текущем заказе
              </p>
            </div>
          </div>
          <div className="bg-primary text-white px-4 py-1 rounded-full text-xs sm:text-sm font-bold shadow-sm">
            {cartProducts?.length || 0} поз.
          </div>
        </div>

        <div className="grid gap-3">
          {cartProducts?.length > 0 ? (
            cartProducts.map((product) => (
              <Card
                key={product.productId}
                className="border-none shadow-md rounded-[24px] overflow-hidden bg-white"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 sm:p-5 pb-2">
                  <div className="flex items-start gap-2 pt-1">
                    <FiPackage
                      className="text-muted-foreground mt-1 shrink-0"
                      size={16}
                    />
                    <CardTitle className="text-base sm:text-lg font-bold leading-tight break-words">
                      {product.productName}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 shrink-0 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => dispatch(deleteFromCart(product.productId))}
                  >
                    <FiTrash2 size={20} />
                  </Button>
                </CardHeader>

                <CardContent className="p-4 sm:p-5 pt-2 space-y-4">
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Количество
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          className="h-12 rounded-2xl bg-muted/40 border-none focus-visible:ring-primary/20 text-center text-lg font-bold"
                          value={product.count}
                          onChange={(e) =>
                            handleUpdate(
                              product.productId,
                              "count",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Цена за ед. (₽)
                      </Label>
                      <Input
                        type="number"
                        className="h-12 rounded-2xl bg-muted/40 border-none focus-visible:ring-primary/20 text-base font-bold"
                        value={product.price}
                        onChange={(e) =>
                          handleUpdate(
                            product.productId,
                            "price",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>

                  <Separator className="bg-muted/50" />

                  <div className="flex justify-between items-center bg-primary/5 p-4 rounded-2xl border border-primary/10">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-tight">
                      Итого:
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-primary">
                      {(product.count * product.price).toLocaleString()} ₽
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed rounded-[32px] bg-white text-muted-foreground">
              <div className="bg-muted/50 p-6 rounded-full mb-4">
                <FiShoppingCart size={40} className="opacity-20" />
              </div>
              <p className="text-lg font-bold text-foreground">Корзина пуста</p>
              <p className="text-sm text-center opacity-60">
                Добавьте товары, чтобы сформировать заказ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
