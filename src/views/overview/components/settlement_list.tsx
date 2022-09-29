
import { ConfigProvider, DatePicker, Select, Table, Tooltip } from 'antd';
import { ReactElement } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import type { ColumnsType } from 'antd/es/table';

const { Column } = Table;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface DataType {
    key: string,
    merhcant_name: string,
    before_balance: number,
    coin: string,
    before_balance_chain: number,
    from_address: string,
    to_address: string,
    amount: number,
    date: string,
    remark: string,
    hash: string
}

const dataSource = [
    {
        key: '1',
        merhcant_name: '派大星',
        before_balance: 9.8000000,
        coin: 'USDT-TRC20',
        before_balance_chain: 120.00000,
        from_address: 'TE3kLnT4GJ1pRjhVF94HdwG85AhwBzQNYN',
        to_address: 'TE3kLnT4GJ1pRjhVF94HdwG85AhwBzQNYN',
        amount: 6.600000,
        date: '2017-10-31 23:12:00',
        remark: '',
        hash: 'https://www.baidu.com'
    },
    {
        key: '2',
        merhcant_name: '海绵宝宝',
        before_balance: 9.8000000,
        coin: 'USDT-TRC20',
        before_balance_chain: 120.00000,
        from_address: 'TE3kLnT4GJ1pRjhVF94HdwG85AhwBzQNYN',
        to_address: 'TE3kLnT4GJ1pRjhVF94HdwG85AhwBzQNYN',
        amount: 6.600000,
        date: '2017-10-31 23:12:00',
        remark: '',
        hash: 'https://www.baidu.com'
    },
    {
        key: '2',
        merhcant_name: '章鱼哥',
        before_balance: 9.8000000,
        coin: 'USDT-TRC20',
        before_balance_chain: 120.00000,
        from_address: 'TE3kLnT4GJ1pRjhVF94HdwG85AhwBzQNYN',
        to_address: 'TE3kLnT4GJ1pRjhVF94HdwG85AhwBzQNYN',
        amount: 6.600000,
        date: '2017-10-31 23:12:00',
        remark: '',
        hash: 'https://www.baidu.com'
    },
];

const columns: ColumnsType<DataType> = [
    {
        title: '商户名称',
        dataIndex: 'merhcant_name',
        key: 'merhcant_name',
        align: 'center',
    },
    {
        title: '处理前后台余额',
        dataIndex: 'before_balance',
        align: 'center',
        key: 'before_balance',
    },
    {
        title: '币种',
        dataIndex: 'coin',
        align: 'center',
        key: 'coin',
    },
    {
        title: '处理前链上余额',
        dataIndex: 'before_balance_chain',
        align: 'center',
        key: 'before_balance_chain',
    },
    {
        title: '转出地址',
        dataIndex: 'from_address',
        key: 'from_address',
        render: (_, { from_address }): ReactElement => (
            <Tooltip placement="top" title={from_address}>
                <p className='text-overflow'>{from_address}</p> 
            </Tooltip>
        ),
    },
    {
        title: '目标地址',
        dataIndex: 'to_address',
        key: 'to_address',
        render: (_, { to_address }): ReactElement => (
            <Tooltip placement="top" title={to_address}>
                <p className='text-overflow'>{to_address}</p> 
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
        dataIndex: 'date',
        align: 'center',
        key: 'date',
    },
    {
        title: '交易哈希',
        dataIndex: 'hash',
        key: 'hash',
        align: 'center',
        render: (_, { hash }): ReactElement => (
            <p className='liquire-hash' onClick={() => {
                window.open(hash)
            }}>查看</p>
        )
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        align: 'center',
        render: (_, { remark }): ReactElement => (
            <p>{remark ? remark : '-'}</p>
        )
    },
];

const SettlementList = (): ReactElement => {
    const handleChange = (e: string): void => {
        console.log(e)
    }
    return (
        <div className='settlement-list'>
            <div className='public-title'>
                <p>利润/余额提取</p>
                <div className='right-oper'>
                    <div className='select-coin'>
                        <Select placeholder="类型" allowClear={true} style={{ width: 80 }} suffixIcon={<span className='iconfont icon-cangpeitubiao_xiazaipandiandanxiazaidayinmoban1'></span>} onChange={handleChange}>
                            <Option value="all">全部</Option>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                    <div className='select-coin'>
                        <Select placeholder="币种" style={{ width: 108 }} suffixIcon={<span className='iconfont icon-cangpeitubiao_xiazaipandiandanxiazaidayinmoban1'></span>} onChange={handleChange}>
                            <Option value="all">全部</Option>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                    <div className='select-date'>
                        <ConfigProvider locale={zhCN}>
                            <RangePicker suffixIcon={<img src={require('../../../assets/images/date_icon.png')} />} allowClear={false} />
                        </ConfigProvider>
                    </div>

                </div>
            </div>
            <div className='list-date'>
                <Table dataSource={dataSource} columns={columns} >
                    {/* <Column title="交易哈希" dataIndex="hash" key="hash" render={(hash:string) : ReactElement => (
                        <p>
                            查看
                        </p>
                    )}/> */}
                </Table>
            </div>
        </div>
    )
};

export default SettlementList;