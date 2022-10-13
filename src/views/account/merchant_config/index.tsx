
import { Button, ConfigProvider, Pagination, Select, Table } from 'antd';
import { ReactElement, ReactNode, useState, useEffect, useContext } from 'react';
import type { ColumnsType } from 'antd/es/table';
import './index.scss';
import zhCN from 'antd/es/locale/zh_CN';
import EditConfig from './components/edit_config';
import { MerchantConfigApi } from '../../../request/api'
import { IBPay } from '../../../App';

const { Option } = Select;

interface Data {
    mch_id: string,
    coin: string,
    mainCoin: string,
    deposit_fee: number,
    withdraw_fee: number,
    miner_fee: number,
    min_withdraw: number,
    max_withdraw: number,
    udun_pool_address: string,
    udun_pool_last_time: string,
    udun: number,
    id: string,
}
export interface EditMerchant {
    id:string,
    coin: string,
    work_fee: number,
    deposit_fee: number,
    withdraw_fee: number,
    min: number,
    max: number,
    address: string
}
const MerchantConfig = (): ReactElement<ReactNode> => {
    const [pageMsg, setPageMsg] = useState<{ page: number, limit: number, total: number }>({
        page: 1,
        limit: 10,
        total: 1
    });
    const { state } = useContext(IBPay);
    //选择商家
    const selectMerchant = (val: string): void => {
        setMerchantID(val === 'all' ? '' : val)
    }
    //商家列表
    const [merchantList, setMerchantList] = useState<{ name: string, mch_id: string }[]>([]);
    //筛选商家ID
    const [merchantID, setMerchantID] = useState<string>('');
    const [dataSource, setDateSource] = useState([]);
    const [waitResult, setWaitResult] = useState<boolean>(false);
    const dataListService = async () => {
        setWaitResult(true)
        const result = await MerchantConfigApi({
            merchant_id: merchantID,
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
        data.forEach((e: any, i: number) => {
            Object.assign(e, { key: String(i + 1) })
        });
        setDateSource(data);
    };
    const [editMerchant, setEditMerchant] = useState<EditMerchant>({
        id:'',
        coin: '',
        work_fee: 0,
        deposit_fee: 0,
        withdraw_fee: 0,
        min: 0,
        max: 0,
        address: ''
    });
    useEffect(() => {
        const { merchant_list } = state;
        const filterMerchant = merchant_list!.map(item => {
            return {
                name: item.name,
                mch_id: item.mch_id
            }
        });
        setMerchantList(filterMerchant);
    }, [])
    useEffect(() => {
        dataListService();
    }, [pageMsg.limit, pageMsg.page])
    //修改商家配置
    const [editConfig, setEditConfig] = useState<boolean>(false);
    const columns: ColumnsType<Data> = [
        {
            title: '商户号',
            dataIndex: 'mch_id',
            key: 'mch_id',
        },
        {
            title: '币种',
            dataIndex: 'coin',
            key: 'coin',
            align: 'center',
        },
        {
            title: '主币种',
            dataIndex: 'mainCoin',
            key: 'mainCoin',
            align: 'center',
        },
        {
            title: '入金手续费',
            dataIndex: 'deposit_fee',
            key: 'deposit_fee',
            align: 'center',
        },
        {
            title: '出金手续费',
            dataIndex: 'withdraw_fee',
            key: 'withdraw_fee',
            align: 'center',
        },
        {
            title: '矿工手续费',
            dataIndex: 'miner_fee',
            key: 'miner_fee',
            align: 'center',
        },
        {
            title: '最低提币数量',
            dataIndex: 'min_withdraw',
            key: 'min_withdraw',
            align: 'center',
        },
        {
            title: '最大提币数量',
            dataIndex: 'max_withdraw',
            key: 'max_withdraw',
            align: 'center',
        },
        {
            title: 'UDUN归集地址',
            dataIndex: 'udun_pool_address',
            key: 'udun_pool_address',
            align: 'center',
        },
        {
            title: '上次归集时间',
            dataIndex: 'udun_pool_last_time',
            key: 'udun_pool_last_time',
            align: 'center',
        },
        {
            title: '是否UDUN地址',
            dataIndex: 'udun',
            key: 'udun',
            align: 'center',
            render: (_, { udun }) => (
                <div className='address-wallet'>{udun === 1 ? 'UDUN' : '自有'}</div>
            )
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (_, { coin,mch_id,miner_fee,deposit_fee,withdraw_fee,min_withdraw,max_withdraw,udun_pool_address }) => (
                <div className='list-oper' onClick={() => {
                    setEditMerchant({
                        ...editMerchant,
                        id:mch_id,
                        coin:coin,
                        work_fee:miner_fee,
                        deposit_fee:deposit_fee,
                        withdraw_fee:withdraw_fee,
                        min:min_withdraw,
                        max:max_withdraw,
                        address:udun_pool_address
                    });
                    setEditConfig(true)
                }}>修改配置</div>
            )
        },
    ];
    //页码变化
    const pageChange = (page: number, size: number) => {
        setPageMsg({
            ...pageMsg,
            page: page,
            limit: size
        });
    };
    return (
        <div className='merchant-config'>
            <div className='fitler-box'>
                <div className='filter-inner'>
                    <p className='inner-label'>商家:</p>
                    <Select style={{ width: 166 }} placeholder="请选择商家" onChange={selectMerchant}>
                        <Option value="all">全部</Option>
                        {
                            merchantList.map((item: { name: string, mch_id: string }, index: number): ReactElement => {
                                return (
                                    <Option value={item.mch_id} key={index}>{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className='filter-btn'>
                    <Button type='primary' className='liquire-btn' onClick={() => {
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
            <EditConfig reloadList={() => {
                dataListService();
            }} editMerchant={editMerchant} value={editConfig} resetModal={(val: boolean): void => {
                setEditConfig(val)
            }} />
        </div>
    )
};

export default MerchantConfig;