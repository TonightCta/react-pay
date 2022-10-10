
export interface State{
    routeMsg?:string,
    token_new?:string,
    merchant_id?:string,
    account?:string,
    merchant_list?:any[],
}

export enum Type{
    SET_ROUTE_NAME = 'set_route_name',
    SET_NEW_TOKEN = 'set_new_token',
    SET_MERCHANT_ID = 'set_merchant_id',
    SET_ACCOUNT = 'set_account',
    SET_MERCHANT_LIST = 'set_merchant_list'
};

export interface IAction{
    type:string,
    payload:State
}

export interface Context{
    state:State,
    dispatch:(action:IAction) => void
}