

import { Context, IAction, State,Type } from "../utils/interface";

export const defaultState : State = {
    test:0
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
        default:
            return state;
    }
};
