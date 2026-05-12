import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { deleteFromCart, updateCartItem } from "./CartSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.CartProducts.cartProducts);

  const handleUpdate = (productId, field, value) => {
    dispatch(updateCartItem({ productId, field, value }));
  };

  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex w-[600px] flex-col items-start bg-white border-gray-200 border rounded-[15px] p-[20px] shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <FiShoppingCart className="text-[22px]" />
          <h1 className="text-[22px] font-bold text-black">Корзина</h1>
        </div>

        <p className="text-gray-500 mb-6 text-[16px]">
          Количество, цена и сумма по позициям
        </p>

        <div className="flex flex-col gap-4 w-full">
          {cartProducts && cartProducts.length > 0 ? (
            cartProducts.map((product) => {
              const total = (product.count * product.price).toFixed(2);

              return (
                <Card
                  key={product.productId}
                  className="w-full border shadow-none"
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center w-full">
                      <CardTitle className="text-[18px] font-bold">
                        {product.productName}
                      </CardTitle>
                      <button
                        onClick={() =>
                          dispatch(deleteFromCart(product.productId))
                        }
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 pt-0 space-y-4">
                    <Separator className="my-2" />

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[14px] text-gray-600">
                          Количество
                        </span>
                        <Input
                          type="number"
                          className="h-10"
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
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[14px] text-gray-600">Цена</span>
                        <Input
                          type="number"
                          className="h-10"
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

                    <div className="flex justify-end pt-2">
                      <p className="font-bold text-[18px]">
                        Сумма: {total.replace(".", ",")} ₽
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="w-full py-20 text-center text-gray-400 border-2 border-dashed rounded-xl">
              Корзина пуста
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
