
import { ConfigProvider, DatePicker, Select, Table } from 'antd';
import { ReactElement, useContext } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import type { ColumnsType } from 'antd/es/table';
import { CoinlogApi } from '../../../request/api'
import { IBPay } from '../../../App';
import { useEffect } from 'react';
import { useState } from 'react';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface DataType {
    key: string,
    coin: string,
    todayDeposit: number,
    yesterdayDeposit: string,
    todayWithdraw: number,
    yesterdayWithdraw: number,
}

const columns: ColumnsType<DataType> = [
    {
        title: '币种',
        dataIndex: 'coin',
        align: 'center',
        key: 'coin',
    },
    {
        title: '今日收款',
        dataIndex: 'todayDeposit',
        align: 'center',
        key: 'todayDeposit',
    },
    {
        title: '今日提币',
        dataIndex: 'todayWithdraw',
        align: 'center',
        key: 'todayWithdraw',
    },
    {
        title: '昨日收款',
        dataIndex: 'yesterdayDeposit',
        key: 'yesterdayDeposit'
    },
    {
        title: '昨日提币',
        dataIndex: 'yesterdayWithdraw',
        key: 'yesterdayWithdraw'
    },
];

const CoinList = (): ReactElement => {
    const { state } = useContext(IBPay);
    const [waitResult,setWaitResult] = useState<boolean>(false);
    //支持的币种列表
    const [coinList, setCoinList] = useState<string[]>([]);
    //筛选币种
    const [selectCoin, setSelectCoin] = useState<string>('');
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
        const result = await CoinlogApi({
            page: 1,
            limit: 200,
            mch_id: merchant_id,
            coin: selectCoin,
            start:filterDate.start,
            end:filterDate.end
        });
        setWaitResult(false);
        if(!result.data){
            return
        }
        result.data.forEach((e: any, i: number) => {
            Object.assign(e, { key: String(i + 1) })
        })
        dateSource(result.data)
    };
    //获取支持币种
    useEffect(() => {
        const { account } = state;
        const { coinStatementList } = JSON.parse(account || '{coinStatementList:[]}');
        setCoinList(coinStatementList.map((item: { asset: string }) => {
            return item.asset
        }));
    }, []);
    //选择币种
    const selectCoinEv = (el: string): void => {
        setSelectCoin(el === 'all' ? ' ' : el);
    }
    //筛选时间
    const selectDate = (e:any) : void => {
        setFilterDate({
            start:e[0].startOf('day').format('YYYY-MM-DD'),
            end:e[1].startOf('day').format('YYYY-MM-DD'),
        })
    };
    useEffect(() => {
        buttListService();
    }, [state.merchant_id,selectCoin,filterDate.end]);
    return (
        <div className='settlement-list'>
            <div className='public-title'>
                <p>币种统计</p>
                <div className='right-oper'>
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

export default CoinList;