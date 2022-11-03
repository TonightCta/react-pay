

import { Context, IAction, State,Type } from "../utils/interface";

export const defaultState : State = {
    language:localStorage.getItem('language') || 'en',
    token_new:sessionStorage.getItem('new_token') || '',
    routeMsg:sessionStorage.getItem('routeMsg') || '',
    merchant_id:sessionStorage.getItem('merchant_id') || '',
    account:sessionStorage.getItem('account') || '',
    merchant_list:JSON.parse(sessionStorage.getItem('merchant_list') || '[]'),
    other_merchant:sessionStorage.getItem('other_merchant') || '',
};

export const defaultContext : Context = {
    state:defaultState,
    dispatch:(_:IAction) => {}
}

export const defaultStateInit = (defaultState:State) => {
    return defaultState
}

export const initState = (state:State,action:IAction) => {
    const { type,payload } = action;
    switch(type){
        case Type.SET_LANGUAGE:
            localStorage.setItem('language',payload.language as string);
            return { ...state,language:payload.language }
        case Type.SET_ROUTE_NAME:
            sessionStorage.setItem('routeMsg',payload.routeMsg as string);
            return { ...state,routeMsg:payload.routeMsg }
        case Type.SET_NEW_TOKEN:
            sessionStorage.setItem('new_token',payload.token_new as string);
            return { ...state,token_new:payload.token_new }
        case Type.SET_MERCHANT_ID:
            sessionStorage.setItem('merchant_id',payload.merchant_id as string);
            return { ...state,merchant_id:payload.merchant_id }
        case Type.SET_ACCOUNT:
            sessionStorage.setItem('account',payload.account as string);
            return { ...state,account:payload.account }
        case Type.SET_MERCHANT_LIST:
            sessionStorage.setItem('merchant_list',JSON.stringify(payload.merchant_list));
            return { ...state,merchant_list:payload.merchant_list }
        case Type.SET_OTHER_MERCHANT:
            sessionStorage.setItem('other_merchant',payload.other_merchant as string);
            return { ...state,other_merchant:payload.other_merchant }
        default:
            return state;
    }
};
