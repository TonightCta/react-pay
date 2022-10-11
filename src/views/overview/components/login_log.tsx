
import { ReactElement, useContext } from 'react';
import { ConfigProvider, DatePicker, Table, Pagination } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { LoginlogApi } from '../../../request/api'
import { IBPay } from '../../../App';
import { useEffect } from 'react';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;


interface Data{
    key:string,
    merchant:{
        name:string,
    },
    ip:string,
    updated_at:string,
}

const columns : ColumnsType<Data> = [
    {
        title: '商户名称',
        dataIndex: 'merchant',
        key: 'merchant',
        render:(_,{ merchant }) => (
            <p>{merchant.name}</p>
        )
    },
    {
        title: '登录IP',
        dataIndex: 'ip',
        key: 'ip',
    },
    {
        title: '登录时间',
        dataIndex: 'updated_at',
        key: 'updated_at',
    },
];


const LoginLog = (): ReactElement => {
    const { state } = useContext(IBPay);
    const [dataSource,setDataSource] = useState([]);
    const [waitResult,setWaitResult] = useState<boolean>(false);
    const loginLogService = async () => {
        const { merchant_id } = state;
        setWaitResult(true)
        const result = await LoginlogApi({
            mch_id:merchant_id,
            page:1,
            limit:200
        });
        setWaitResult(false);
        if(!result.data.list){
            return
        }
        result.data.list.forEach((e:any,i:number) => {
            Object.assign(e,{key:String(i + 1)})
        });
        setDataSource(result.data.list)
    };
    useEffect(() => {
        loginLogService();
    },[state.merchant_id])
    return (
        <div className='login-log'>
            <div className='public-title'>
                <p>登录日志</p>
                <div className=''>
                    <ConfigProvider locale={zhCN}>
                        <RangePicker suffixIcon={<img src={require('../../../assets/images/date_icon.png')} />} allowClear={false} />
                    </ConfigProvider>
                </div>
            </div>
            <div className='log-list'>
                <Table loading={waitResult} dataSource={dataSource} pagination={{pageSize:6}} columns={columns}/>
            </div>
        </div>
    )
};

export default LoginLog;