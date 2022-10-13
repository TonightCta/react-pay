
import { Button, ConfigProvider, Input, Pagination, Select, Table } from 'antd';
import { ReactElement, ReactNode, useEffect, useState, useContext } from 'react';
import type { ColumnsType } from 'antd/es/table';
import './index.scss'
import zhCN from 'antd/es/locale/zh_CN';
import { WalletsApi } from '../../../request/api';
import { IBPay } from '../../../App';

const { Option } = Select;

interface Data {
    mch_id: string,
    address: string,
    coin: string,
    is_self: number,
    is_udun_address: number,
    businessId: string,
    notify_url: string
}

const columns: ColumnsType<Data> = [
    {
        title: '商户',
        dataIndex: 'mch_id',
        key: 'mch_id',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '币种',
        dataIndex: 'coin',
        key: 'coin',
        align: 'center',
    },
    {
        title: '类型',
        dataIndex: 'is_self',
        key: 'is_self',
        align: 'center',
        render: (_, { is_self }) => (
            <div className='address-type'>{is_self === 1 && '商户主钱包' || is_self === 2 && '商户手续费钱包' || is_self === 0 && '客户钱包'}</div>
        )
    },
    {
        title: '是否UDUN地址',
        dataIndex: 'is_udun_address',
        key: 'is_udun_address',
        align: 'center',
        render: (_, { is_udun_address }) => (
            <div className='address-wallet'>{is_udun_address === 0 ? '自有' : 'UDUN'}</div>
        )
    },
    {
        title: '业务ID',
        dataIndex: 'businessId',
        key: 'businessId',
        align: 'center',
    },
    {
        title: '回调地址',
        dataIndex: 'notify_url',
        key: 'notify_url',
        align: 'center',
    },
];

const typeList: { label: string, value: number }[] = [
    {
        label: '商户主钱包',
        value: 1,
    },
    {
        label: '商户手续费钱包',
        value: 1,
    },
    {
        label: '客户钱包',
        value: 1,
    }
]

const AddressesList = (): ReactElement<ReactNode> => {
    const { state } = useContext(IBPay);
    const [pageMsg, setPageMsg] = useState<{ page: number, limit: number, total: number }>({
        page: 1,
        limit: 10,
        total: 1
    });
    const [coinList, steCoinList] = useState<string[]>([]);
    const [merchantList, setMerchantList] = useState<{ email: string, mch_id: string }[]>([])
    useEffect(() => {
        const { merchant_list, account } = state;
        const filterMerchant = merchant_list!.map(item => {
            return {
                email: item.email,
                mch_id: item.mch_id
            }
        });
        setMerchantList(filterMerchant);
        const filterCoin = JSON.parse(account || '{}')?.coinStatementList.map((item: { asset: string }) => {
            return item.asset
        }) || [];
        steCoinList(filterCoin)
    }, []);
    //筛选条件
    const [filter, setFilter] = useState<{ merchant: string, address: string, coin: string, type: number | string }>({
        merchant: '',
        address: '',
        coin: '',
        type: ''
    });
    //选择商家
    const selectMerchant = (val: string): void => {
        setFilter({
            ...filter,
            merchant: val === 'all' ? '' : val
        })
    };
    //选择币种
    const selectCoin = (val: string): void => {
        setFilter({
            ...filter,
            coin: val === 'all' ? '' : val
        })
    }
    //选择类型
    const selectStatus = (val: string): void => {
        setFilter({
            ...filter,
            type: val === 'all' ? '' : val
        })
    };
    const [dataSource, setDateSource] = useState([]);
    const [waitResult, setWaitResult] = useState<boolean>(false);
    const dataListService = async () => {
        setWaitResult(true)
        const result = await WalletsApi({
            address: filter.address,
            coin: filter.coin,
            merchant_id: filter.merchant,
            is_self: filter.type,
            limit: pageMsg.limit,
            isMerchant: 0,
            page: pageMsg.page
        });
        setWaitResult(false);
        const { data } = result;
        setPageMsg({
            ...pageMsg,
            total: data.total
        });
        data.list.forEach((e: any, i: number) => {
            Object.assign(e, { key: String(i + 1) })
        })
        setDateSource(data.list);
        console.log(data.list);
    };
    //页码变化
    const pageChange = (page: number, size: number) => {
        setPageMsg({
            ...pageMsg,
            page: page,
            limit: size
        });
    };
    useEffect(() => {
        dataListService()
    }, [pageMsg.page, pageMsg.limit])
    return (
        <div className='addresses-list'>
            <div className='filter-box'>
                {/* 选择商家 */}
                <div className='filter-inner'>
                    <p className='filter-label'>商家邮箱:</p>
                    <Select style={{ width: 166 }} defaultValue="all" placeholder="请选择商家" onChange={selectMerchant}>
                        <Option value="all">全部</Option>
                        {
                            merchantList.map((item: { email: string, mch_id: string }, index: number): ReactElement => {
                                return (
                                    <Option value={item.mch_id} key={index}>{item.email}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                {/* 选择地址 */}
                <div className='filter-inner'>
                    <p className='filter-label'>地址:</p>
                    <Input type='text' placeholder='请输入地址' value={filter.address} onChange={(e) => {
                        setFilter({
                            ...filter,
                            address: e.target.value
                        })
                    }} />
                </div>
                {/* 选择币种 */}
                <div className='filter-inner'>
                    <p className='filter-label'>币种:</p>
                    <Select style={{ width: 166 }} defaultValue="all" placeholder="请选择币种" onChange={selectCoin}>
                        <Option value="all">全部</Option>
                        {
                            coinList.map((item: string, index: number): ReactElement => {
                                return (
                                    <Option value={item} key={index}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                {/* 选择类型 */}
                <div className='filter-inner'>
                    <p className='filter-label'>类型:</p>
                    <Select style={{ width: 166 }} defaultValue="all" placeholder="请选择类型" onChange={selectStatus}>
                        <Option value="all">全部</Option>
                        {
                            typeList.map((item: { label: string, value: number }, index: number): ReactElement => {
                                return (
                                    <Option value={item.value} key={index}>{item.label}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className='filter-btn'>
                    <Button type='primary' onClick={() => {
                        dataListService()
                    }}>查询</Button>
                </div>
            </div>
            <div className='data-list'>
                <Table loading={waitResult} dataSource={dataSource} columns={columns} pagination={false} />
                <div className='page-oper'>
                    <ConfigProvider locale={zhCN}>
                        <Pagination showQuickJumper defaultCurrent={pageMsg.page} total={pageMsg.total} onChange={pageChange} />
                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
};

export default AddressesList;