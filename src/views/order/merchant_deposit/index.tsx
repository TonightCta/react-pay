
import { ConfigProvider, Pagination, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import OrderFilter, { Filter, filterSource } from '../components/order_filter';
import zhCN from 'antd/es/locale/zh_CN';
import { OrderListApi } from '../../../request/api'


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
    url: string
}

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
        render:(_,{ merchant }) => (
            <p>{ merchant.name }</p>
        ),
        align: 'center',
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
        title: '充币地址',
        dataIndex: 'to',
        key: 'to',
        render: (_, { to }): ReactElement => (
            <Tooltip placement="top" title={to}>
                <p className='text-overflow'>{to}</p>
            </Tooltip>
        ),
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

const MerchantDepositList = (): ReactElement<ReactNode> => {
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
            isMerchant: 1,
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
    return (
        <div className='merchant-deposit-list'>
            <OrderFilter dateText="到账时间" status={false} merchantNumber={false} emitFilter={(filter:string) : void => {
                setFilterMsg(JSON.parse(filter))
            }}/>
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

export default MerchantDepositList;