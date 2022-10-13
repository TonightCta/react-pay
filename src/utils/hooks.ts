import { useRef, useState, useCallback, useEffect, useContext } from "react"
import { IBPay } from '../App';
import { MerchantInfoApi } from '../request/api'
import { Type } from "./interface";

//倒计时
export const useCountdown = (propsCount: number, callback = () => { }) => {
    const [count, setCount] = useState(propsCount)
    const timer = useRef<NodeJS.Timer>();
    const cbtimer: any = useRef()
    cbtimer.current = () => {
        setCount(count - 1)
    }
    const startTimer = useCallback(() => {
        timer.current = setInterval(() => {
            cbtimer.current()
        }, 1000);
        return count
    }, []);
    useEffect(() => {
        if (count <= 0) {
            callback();
            setCount(propsCount);
            clearInterval(timer.current)
        }
    }, [count])
    useEffect(() => {
        return () => {
            setCount(propsCount);
            clearInterval(timer.current)
        }
    }, []);
    return {
        count,
        startTimer,
    }
};
//更新用户信息
export const useInfo = () => {
    const { dispatch } = useContext(IBPay);
    const up = async () => {
        const result = await MerchantInfoApi({});
        const { data } = result;
        dispatch({
            type: Type.SET_ACCOUNT,
            payload: {
                account: JSON.stringify(data)
            }
        });
    };
    return {
        upUserInfo:up
    }

}