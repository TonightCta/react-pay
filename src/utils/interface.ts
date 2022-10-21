
export interface State{
    language?:string,
    routeMsg?:string,
    token_new?:string,
    merchant_id?:string,
    account?:string,
    merchant_list?:any[],
    other_merchant?:string
}

export enum Type{
    SET_LANGUAGE = 'set_language',
    SET_ROUTE_NAME = 'set_route_name',
    SET_NEW_TOKEN = 'set_new_token',
    SET_MERCHANT_ID = 'set_merchant_id',
    SET_ACCOUNT = 'set_account',
    SET_MERCHANT_LIST = 'set_merchant_list',
    SET_OTHER_MERCHANT = 'set_other_merchant'
};

export interface IAction{
    type:string,
    payload:State
}

export interface Context{
    state:State,
    dispatch:(action:IAction) => void
}