

import { Context, IAction, State,Type } from "../utils/interface";

export const defaultState : State = {
    test:Number(sessionStorage.getItem('test')) || 0,
    routeMsg:sessionStorage.getItem('routeMsg') || '',
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
        case Type.SET_TEST:
            sessionStorage.setItem('test',String(payload.test));
            return { ...state,test:payload.test };
        case Type.SET_ROUTE_NAME:
            sessionStorage.setItem('routeMsg',payload.routeMsg as string);
            return { ...state,routeMsg:payload.routeMsg }
        default:
            return state;
    }
};
