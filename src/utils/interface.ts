
export interface State{
    test?:number,
}

export enum Type{
    SET_TEST = 'set_test'
};

export interface IAction{
    type:string,
    payload:State
}

export interface Context{
    state:State,
    dispatch:(action:IAction) => void
}