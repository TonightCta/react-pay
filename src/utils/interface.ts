
export interface State{
    test?:number,
    routeMsg?:string
}

export enum Type{
    SET_TEST = 'set_test',
    SET_ROUTE_NAME = 'set_route_name'
};

export interface IAction{
    type:string,
    payload:State
}

export interface Context{
    state:State,
    dispatch:(action:IAction) => void
}