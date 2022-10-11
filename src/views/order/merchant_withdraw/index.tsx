
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Button, ConfigProvider, message, notification, Pagination, Popconfirm, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import OrderFilter, { Filter, filterSource } from '../components/order_filter';
import zhCN from 'antd/es/locale/zh_CN';
import { RejectWithdrawApi, WithdrawListApi } from '../../../request/api'
import SetHash from './components/set_hash';


interface DataType {
    key: string,
    own_order_sn: string,
    merchant: {
        name: string
    },
    created_at: string,
    coin: string,
    true_amount: number,
    fee: number,
    to: string,
    url: string,
    status: number,
    id: number,
    transaction_id:string
}



const MerchantWithdrawList = (): ReactElement<ReactNode> => {
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
            state: filterMsg.status,
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
    //决绝提币
    const rejectWithdraw = async () => {
        const result = await RejectWithdrawApi({
            withdrawId: orderID.id
        });
        const { code } = result;
        if(code !== 200){
            message.error(result.message);
            return;
        };
        message.success('拒绝提币成功');
        dataListService();
    };
    const [visible,setVisible] = useState<boolean>(false);
    const [orderID,setOrderID] = useState<{id:number,hash:string}>({
        id:0,
        hash:''
    });
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
            render: (_, { merchant }) => (
                <p>{merchant.name}</p>
            ),
            align: 'center',
        },
        {
            title: '下单时间',
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
            title: '提币金额',
            dataIndex: 'true_amount',
            align: 'center',
            key: 'true_amount',
        },
        {
            title: '手续费',
            dataIndex: 'fee',
            align: 'center',
            key: 'fee',
        },
        {
            title: '商家提币地址',
            dataIndex: 'to',
            key: 'to',
            render: (_, { to }): ReactElement => (
                <Tooltip placement="top" title={to}>
                    <p className='text-overflow'>{to}</p>
                </Tooltip>
            ),
        },
        {
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
            dataIndex: 'url',
            key: 'url',
            align: 'center',
            render: (_, { url }): ReactElement => (
                <p className='liquire-hash' onClick={() => {
                    window.open(url)
                }}>{url ? '查看' : '-'}</p>
            )
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (_, { status, id,transaction_id }): ReactElement => (
                <div>
                    {
                        status === 0
                            ? <div className='withdraw-box'>
                                <Button size='small' type="primary" onClick={() => {
                                    setVisible(true);
                                    setOrderID({
                                        id:id,
                                        hash:transaction_id
                                    })
                                }}>填写交易HASH</Button>
                                <p></p>
                                <Popconfirm
                                    placement="topRight"
                                    title="此操作将拒绝该笔订单"
                                    onConfirm={rejectWithdraw}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button size='small' type='primary' onClick={() => {
                                        setOrderID({
                                            ...orderID,
                                            id:id,
                                        })
                                    }}>拒绝</Button>
                                </Popconfirm>
                            </div>
                            : <p>-</p>
                    }
                </div>
            )
        },
    ];
    return (
        <div className='merchant-withdraw-list'>
            <OrderFilter dateText="下单时间" status merchantNumber={false} emitFilter={(filter: string): void => {
                setFilterMsg(JSON.parse(filter));
            }} />
            <div className='table-list'>
                <Table loading={waitResult} rowClassName="table-row-mine" dataSource={dataSource} columns={columns} pagination={false} />
                <div className='page-oper'>
                    <ConfigProvider locale={zhCN}>
                        <Pagination showQuickJumper defaultCurrent={pageMsg.page} total={pageMsg.total} onChange={pageChange} />
                    </ConfigProvider>
                </div>
            </div>
            {/* 设置交易HASH */}
            <SetHash value={visible} id={orderID.id} hash={orderID.hash} reloadList={() => {
                dataListService();
            }} resetModal={(val:boolean) => {
                setVisible(val)
            }}/>
        </div>
    )
};

export default MerchantWithdrawList;