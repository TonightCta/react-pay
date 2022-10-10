import { useRef, useState,useCallback,useEffect } from "react"

export const useCountdown = (propsCount:number,callback = () => {}) =>  {
    const [count,setCount] = useState(propsCount)
    const timer = useRef<NodeJS.Timer>();
    const cbtimer:any = useRef()
    cbtimer.current = ()=>{
        setCount(count - 1)
    }
    const startTimer = useCallback(()=>{
        timer.current = setInterval(()=>{
            cbtimer.current()            
        },1000);
        return count
    },[]);
    useEffect(()=>{
        if(count <= 0){
            callback();
            setCount(propsCount);
            clearInterval(timer.current)
        }
    },[count])
    useEffect(()=>{
        return()=>{
            setCount(propsCount);
            clearInterval(timer.current)
        }
    },[]);
  return {
    count,
    startTimer,
  }
};