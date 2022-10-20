
import { ConfigProvider, DatePicker, Select, Table, Tooltip } from 'antd';
import { ReactElement, useContext } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import type { ColumnsType } from 'antd/es/table';
import { ButtlistApi } from '../../../request/api'
import { IBPay } from '../../../App';
import { useEffect } from 'react';
import { useState } from 'react';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface DataType {
    key: string,
    mch_name: string,
    mch_balance: number,
    coin: string,
    from_before_balance: number,
    from: string,
    to: string,
    amount: number,
    created_at: string,
    comment: string,
    link: string,
    type:number
}

const columns: ColumnsType<DataType> = [
    {
        title: '商户名称',
        dataIndex: 'mch_name',
        key: 'mch_name',
        align: 'center',
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        render:(_,{ type }) => (
            <p>{type === 1 ? '利润结算' : '余额提取'}</p>
        )
    },
    {
        title: '处理前后台余额',
        dataIndex: 'mch_balance',
        align: 'center',
        key: 'mch_balance',
    },
    {
        title: '币种',
        dataIndex: 'coin',
        align: 'center',
        key: 'coin',
    },
    {
        title: '处理前链上余额',
        dataIndex: 'from_before_balance',
        align: 'center',
        key: 'from_before_balance',
    },
    {
        title: '转出地址',
        dataIndex: 'from',
        key: 'from',
        render: (_, { from }): ReactElement => (
            <Tooltip placement="top" title={from}>
                <p className='text-overflow'>{from}</p>
            </Tooltip>
        ),
    },
    {
        title: '目标地址',
        dataIndex: 'to',
        key: 'to',
        render: (_, { to }): ReactElement => (
            <Tooltip placement="top" title={to}>
                <p className='text-overflow'>{to}</p>
            </Tooltip>
        ),
    },
    {
        title: '转出数量',
        dataIndex: 'amount',
        align: 'center',
        key: 'amount',
    },
    {
        title: '操作时间',
        dataIndex: 'created_at',
        align: 'center',
        key: 'created_at',
    },
    {
        title: '交易哈希',
        dataIndex: 'link',
        key: 'link',
        align: 'center',
        render: (_, { link }): ReactElement => (
            <p className='liquire-hash' onClick={() => {
                window.open(link)
            }}>查看</p>
        )
    },
    {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
        align: 'center',
        render: (_, { comment }): ReactElement => (
            <p>{comment ? comment : '-'}</p>
        )
    },
];

const SettlementList = (): ReactElement => {
    const { state } = useContext(IBPay);
    const [waitResult,setWaitResult] = useState<boolean>(false);
    //支持的币种列表
    const [coinList, setCoinList] = useState<string[]>([]);
    //筛选币种
    const [selectCoin, setSelectCoin] = useState<string>('');
    //筛选状态
    const [selectStatus,setSelectStatus] = useState<string>('');
    //筛选时间
    const [filterDate,setFilterDate] = useState<{start:string,end:string}>({
        start:'',
        end:''
    })
    //数据源
    const [dataSource, dateSource] = useState([]);
    //获取数据
    const buttListService = async () => {
        const { merchant_id } = state;
        setWaitResult(true)
        const result = await ButtlistApi({
            page: 1,
            limit: 200,
            mch_id: merchant_id,
            coin: selectCoin,
            type:selectStatus,
            start:filterDate.start,
            end:filterDate.end
        });
        setWaitResult(false);
        if(!result.data.list){
            return
        }
        result.data.list.forEach((e: any, i: number) => {
            Object.assign(e, { key: String(i + 1) })
        })
        dateSource(result.data.list)
    };
    //获取支持币种
    useEffect(() => {
        const { account } = state;
        const { coinStatementList } = JSON.parse(account || '{coinStatementList:[]}');
        setCoinList(coinStatementList.map((item: { asset: string }) => {
            return item.asset
        }));
    }, []);
    //数据状态列表
    const typeList = [
        {
            value: "1",
            label: "利润结算",
        },
        {
            value: "2",
            label: "提取余额",
        },
    ];
    //选择币种
    const selectCoinEv = (el: string): void => {
        setSelectCoin(el === 'all' ? ' ' : el);
    }
    //选择状态
    const selectStatusEv = (el: string): void => {
        setSelectStatus(el === 'all' ? ' ' : el)
    };
    //筛选时间
    const selectDate = (e:any) : void => {
        setFilterDate({
            start:e[0].startOf('day').format('YYYY-MM-DD'),
            end:e[1].startOf('day').format('YYYY-MM-DD'),
        })
    };
    useEffect(() => {
        buttListService();
    }, [state.merchant_id,selectCoin,selectStatus,filterDate.end]);
    return (
        <div className='settlement-list'>
            <div className='public-title'>
                <p>利润/余额提取</p>
                <div className='right-oper'>
                    <div className='select-coin'>
                        <Select placeholder="类型" defaultValue="all" allowClear={true} style={{ width: 120 }} suffixIcon={<span className='iconfont icon-cangpeitubiao_xiazaipandiandanxiazaidayinmoban1'></span>} onChange={selectStatusEv}>
                            <Option value="all">全部</Option>
                            {
                                typeList.map((item: { value: string, label: string },index:number): ReactElement => {
                                    return (
                                        <Option key={index} value={item.value}>{item.label}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className='select-coin'>
                        <Select placeholder="币种" defaultValue="all" style={{ width: 108 }} suffixIcon={<span className='iconfont icon-cangpeitubiao_xiazaipandiandanxiazaidayinmoban1'></span>} onChange={selectCoinEv}>
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
                    <div className='select-date'>
                        <ConfigProvider locale={zhCN}>
                            <RangePicker suffixIcon={<img src={require('../../../assets/images/date_icon.png')} />} allowClear={false} onChange={selectDate}/>
                        </ConfigProvider>
                    </div>

                </div>
            </div>
            <div className='list-date'>
                <Table loading={waitResult} dataSource={dataSource} pagination={{ pageSize: 6 }} columns={columns} />
            </div>
        </div>
    )
};

export default SettlementList;