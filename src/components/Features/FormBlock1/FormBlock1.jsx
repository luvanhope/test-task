"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./FormBlockSlice";
import { chekToken } from "./FormBlockSlice";

const FormBlock1 = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Token.token);
  return (
    <>
      <div className="flex w-full justify-center p-4">
        <div className="flex w-[600px] flex-col items-start bg-white border-gray-200 border rounded-[15px] p-[20px] shadow-sm">
          <h1 className="text-[22px] font-bold text-black mb-2">
            1. Подключение кассы
          </h1>
          <p className="text-gray-500 mb-[30px] text-[18px] font-[400]">
            Введите токен и загрузите справочники
          </p>
          <p className="mb-[6px] text-[18px]">Token</p>
          <Input
            className="mb-[20px]"
            value={token}
            onChange={(e) => dispatch(setToken(e.target.value))}
            placeholder="введите token кассы"
          />
          <div className="w-[100%]">
            <Button
              className="w-[100%] text-[20px]"
              onClick={() => dispatch(chekToken(token))}
            >
              Подключить
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormBlock1;
