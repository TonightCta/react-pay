
import { ReactElement, ReactNode } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, ConfigProvider, message, Pagination, Table, Tooltip } from 'antd';
import OrderFilter, { Filter, filterSource } from '../components/order_filter';
import zhCN from 'antd/es/locale/zh_CN';
import { RebackApi, WithdrawListApi } from '../../../request/api';
import { useState } from 'react';
import { useEffect } from 'react';

interface DataType {
    key: string,
    own_order_sn: string,
    merchant: {
        name: string
    },
    mch_order_sn: string | number,
    created_at: string,
    coin: string,
    amount: number,
    to: string,
    notify_number: number,
    notify_status: number,
    url: string,
    fee: number,
    status: number,
    id:number
}

const UserWithdrawList = (): ReactElement<ReactNode> => {
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
        const result = await WithdrawListApi({
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
    //重新回调
    const rebackService = async (_id:number) => {
        const result = await RebackApi({
            id:_id,
            type:'withdraw'
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
            render: (_, { merchant }) => (
                <p>{merchant.name}</p>
            )
        },
        {
            // merchant_order_number
            title: '商家订单号',
            dataIndex: 'mch_order_sn',
            key: 'mch_order_sn',
            align: 'center',
        },
        {
            title: '下单时间',
            dataIndex: 'created_at',
            align: 'center',
            key: 'created_at',
            render: (_, { created_at }): ReactElement => (
                <p className='font-14'>{created_at}</p>
            )
        },
        {
            title: '币种',
            dataIndex: 'coin',
            align: 'center',
            key: 'coin',
        },
        {
            title: '提币金额',
            dataIndex: 'amount',
            align: 'center',
            key: 'amount',
        },
        {
            title: '手续费',
            dataIndex: 'fee',
            align: 'center',
            key: 'fee',
        },
        {
            title: '用户提币地址',
            dataIndex: 'to',
            key: 'to',
            render: (_, { to }): ReactElement => (
                <Tooltip placement="top" title={to}>
                    <p className='text-overflow'>{to}</p>
                </Tooltip>
            ),
        },
        {
            title: '回调次数',
            dataIndex: 'notify_number',
            key: 'notify_number',
            align: 'center'
        },
        {
            title: '回调状态',
            dataIndex: 'notify_status',
            align: 'center',
            key: 'notify_status',
            render: (_, { notify_status, status,id }): ReactElement => (
                <p className='back-status'>
                    {notify_status === 0 && status === 3 && <Button type='primary' size='small' onClick={() => {
                        rebackService(id)
                    }}>重新回调</Button> || notify_status === 1 && '回调成功' || notify_status === 0 && status !== 3 && '-'}
                </p>
            )
        },
        {
            // status
            title: '订单状态',
            dataIndex: 'status',
            align: 'center',
            key: 'status',
            render: (_, { status }): ReactElement => (
                <p className={`order-status ${status === 3 && 'success-order' || status === 4 && 'failed-order'}`}>
                    {status === 0 && '未处理' || status === 2 && '已拒绝' || status === 1 && '提币中' || status === 3 && '提币完成' || status === 4 && '提币失败'}
                </p>
            )
        },
        {
            title: '交易哈希',
            dataIndex: 'hash',
            key: 'hash',
            align: 'center',
            render: (_, { url }): ReactElement => (
                <p className='liquire-hash' onClick={url ? () => {
                    window.open(url)
                } : () => { }}>{url ? '查看' : '-'}</p>
            )
        },
    ];
    return (
        <div className='user-withdraw-list'>
            <OrderFilter dateText="下单时间" status merchantNumber emitFilter={(filter: string): void => {
                setPageMsg({
                    page:1,
                    limit:10,
                    total:1
                })
                setFilterMsg(JSON.parse(filter))
            }} />
            <div className='table-list'>
                <Table loading={waitResult} rowClassName="table-row-mine" dataSource={dataSource} columns={columns} pagination={false} />
                <div className='page-oper'>
                    <ConfigProvider locale={zhCN}>
                        <Pagination showQuickJumper defaultCurrent={pageMsg.page} total={pageMsg.total} defaultPageSize={pageMsg.limit} onChange={pageChange} />
                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
};

export default UserWithdrawList;