
import { Pagination, Table, Tooltip, ConfigProvider, Button, message } from 'antd';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import OrderFilter, { Filter, filterSource } from '../components/order_filter';
import type { ColumnsType } from 'antd/es/table';
import { OrderListApi,RebackApi } from '../../../request/api'

interface DataType {
    key: string,
    own_order_sn: string,
    merchant:{
        name:string
    },
    created_at: string,
    coin: string,
    true_amount: number,
    to: string,
    notify_number: number,
    notify_status: number,
    url: string,
    status:number,
    id:number
}
const UserDepositList = (): ReactElement<ReactNode> => {
    const [filterMsg, setFilterMsg] = useState<Filter>(filterSource);
    const [pageMsg, setPageMsg] = useState<{ page: number, limit: number, total: number }>({
        page: 1,
        limit: 10,
        total: 1
    });
    const [dataSource, setDateSource] = useState([]);
    const [waitResult, setWaitResult] = useState<boolean>(false);
    const dataListService = async () => {
        setWaitResult(true)
        const result = await OrderListApi({
            trxNo: filterMsg.order_number,
            asset: filterMsg.coin,
            startTime: filterMsg.start,
            endTime: filterMsg.end,
            amountLowerLimit: filterMsg.min,
            amountUpperLimit: filterMsg.max,
            toAddress: filterMsg.address,
            txHash: filterMsg.hash,
            state:filterMsg.status,
            merchant_id: filterMsg.merchant_id,
            limit: pageMsg.limit,
            isMerchant: 0,
            page: pageMsg.page
        });
        setWaitResult(false);
        const { data } = result;
        setPageMsg({
            ...pageMsg,
            total: data.total
        })
        data.list.forEach((e: any, i: number) => {
            Object.assign(e, { key: String(i + 1) })
        })
        setDateSource(data.list);
    };
    useEffect(() => {
        dataListService();
    }, [filterMsg, pageMsg.page, pageMsg.limit])
    //页码变化
    const pageChange = (page: number, size: number) => {
        setPageMsg({
            ...pageMsg,
            page: page,
            limit: size
        });
    };
    const rebackService = async (_id:number) => {
        const result = await RebackApi({
            id:_id,
            type:'deposit'
        });
        const { code } = result;
        if(code !== 200){
            message.error(result.message);
            return
        };
        message.success('回调成功');
        dataListService();
    };
    const columns: ColumnsType<DataType> = [
        {
            title: '订单号',
            dataIndex: 'own_order_sn',
            key: 'own_order_sn',
            align: 'center',
        },
        {
            title: '商户名称',
            dataIndex: 'merhcant',
            key: 'merhcant',
            align: 'center',
            render:(_,{ merchant }) => (
                <p>{merchant.name}</p>
            )
        },
        {
            title: '到账时间',
            dataIndex: 'created_at',
            align: 'center',
            key: 'created_at',
        },
        {
            title: '币种',
            dataIndex: 'coin',
            align: 'center',
            key: 'coin',
        },
        {
            title: '到账金额',
            dataIndex: 'true_amount',
            align: 'center',
            key: 'true_amount',
        },
        {
            title: '地址',
            dataIndex: 'to',
            key: 'to',
            render: (_, { to }): ReactElement => (
                <Tooltip placement="topLeft" title={to}>
                    <p className='text-overflow'>{to}</p>
                </Tooltip>
            ),
        },
        {
            title: '回调次数',
            dataIndex: 'notify_number',
            key: 'notify_number',
            align:'center'
        },
        {
            title: '回调状态',
            dataIndex: 'notify_status',
            align: 'center',
            key: 'notify_status',
            render: (_, { notify_status,status,id }): ReactElement => (
                <p className='back-status'>
                    {notify_status === 0 && status === 3 && <Button type='primary' size='small' onClick={() => {
                        rebackService(id)
                    }}>重新回调</Button> || notify_status === 1 && '回调成功' || notify_status === 0 && status !== 3 && '-'}
                </p>
            )
        },
        {
            title: '交易哈希',
            dataIndex: 'url',
            key: 'url',
            align: 'center',
            render: (_, { url }): ReactElement => (
                <p className='liquire-hash' onClick={url ? () => {
                    window.open(url)
                } : () => {}}>{ url ? '查看' : '-' }</p>
            )
        },
    ];
    return (
        <div className='user-deposit-list'>
            <OrderFilter dateText="到账时间" status={false} merchantNumber={false} emitFilter={(filter: string): void => {
                setFilterMsg(JSON.parse(filter))
            }} />
            <div className='table-list'>
                <Table loading={waitResult} rowClassName="table-row-mine" dataSource={dataSource} columns={columns} pagination={false} />
                <div className='page-oper'>
                    <ConfigProvider locale={zhCN}>
                        <Pagination showQuickJumper defaultCurrent={pageMsg.page} total={pageMsg.total} onChange={pageChange} />
                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
};

export default UserDepositList;