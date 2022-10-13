import { MerchantInfoApi } from "../request/api";
import { Type } from "./interface";
import { useContext } from 'react';
import { IBPay } from '../App';

//邮箱格式校验
export const CheckEmail = (arg: string): boolean => {
    const rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return rule.test(arg);
}

//日期转换
export const DateConvert = (_time: number): string => {
    const date = new Date(_time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const day = date.getDate();
    // const hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    // const min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    // const sec = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    return `${year}-${month}-${day}`
};