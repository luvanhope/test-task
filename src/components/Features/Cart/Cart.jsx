"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart, FiTrash2, FiPackage } from "react-icons/fi";
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
    dispatch(updateCartItem({ productId, field, value }));
  };

  return (
    <div className="flex w-full justify-center p-4">
      <div className="w-full max-w-[600px] space-y-4">
        {/* Заголовок секции */}
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FiShoppingCart className="text-primary" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">5. Корзина</h2>
              <p className="text-sm text-muted-foreground font-medium">
                Позиции в текущем заказе
              </p>
            </div>
          </div>
          <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
            {cartProducts?.length || 0} поз.
          </div>
        </div>

        <div className="grid gap-4">
          {cartProducts?.length > 0 ? (
            cartProducts.map((product) => (
              <Card
                key={product.productId}
                className="border-none shadow-sm rounded-[20px] overflow-hidden bg-white"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-2">
                  <div className="flex items-center gap-2">
                    <FiPackage className="text-muted-foreground" size={16} />
                    <CardTitle className="text-lg font-bold truncate max-w-[200px] sm:max-w-[350px]">
                      {product.productName}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => dispatch(deleteFromCart(product.productId))}
                  >
                    <FiTrash2 size={18} />
                  </Button>
                </CardHeader>

                <CardContent className="p-5 pt-2 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Количество
                      </Label>
                      <Input
                        type="number"
                        className="h-11 rounded-xl bg-muted/40 border-none focus-visible:ring-primary/20 text-base font-bold"
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
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Цена за ед. (₽)
                      </Label>
                      <Input
                        type="number"
                        className="h-11 rounded-xl bg-muted/40 border-none focus-visible:ring-primary/20 text-base font-bold"
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

                  <div className="flex justify-between items-center bg-primary/5 p-4 rounded-xl">
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-tight">
                      Итого за позицию:
                    </span>
                    <span className="text-2xl font-black text-primary">
                      {(product.count * product.price).toLocaleString()} ₽
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-[25px] bg-white text-muted-foreground">
              <div className="bg-muted/50 p-6 rounded-full mb-4">
                <FiShoppingCart size={48} className="opacity-20" />
              </div>
              <p className="text-lg font-medium">Корзина пуста</p>
              <p className="text-sm opacity-60">
                Добавьте товары из раздела выше
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
