"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const Header = () => {
  const { error, confirmToken } = useSelector((state) => state.Token);
  const notify = () => toast("Wow so easy!");

  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex w-[600px] flex-col items-start bg-white border-gray-200 border rounded-[15px] p-[20px] shadow-sm">
        <h3 className="mb-[14px] text-gray-400 text-[25px] font-light leading-tight">
          tablecrm.com
        </h3>

        <h1 className="mb-[5px] font-bold text-[35px] leading-tight">
          Мобильный заказ
        </h1>

        <p className="text-gray-600 text-[18px]">
          WebApp для создания продажи и проведения в один клик.
        </p>

        <div className="mt-4">
          {confirmToken ? (
            <h1 className="text-green-600 font-medium text-[20px]">
              ✅ Касса подключена
            </h1>
          ) : (
            <h1
              className={
                error ? "text-[18px] text-red-500" : "text-[18px] text-gray-400"
              }
            >
              {error ? ` Ошибка: ${error}` : "⚪ Касса не подключена"}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
