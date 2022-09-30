
import { Pagination, Table, Tooltip, ConfigProvider } from 'antd';
import { ReactElement, ReactNode } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import OrderFilter from '../components/order_filter';
import type { ColumnsType } from 'antd/es/table';
import type { PaginationProps } from 'antd';

interface DataType {
    key: string,
    order_number: string,
    merhcant_name:string,
    date: string,
    coin: string,
    true_amount: number,
    address: string,
    back_number: number,
    back_status: number,
    hash: string
}

const dataSource = [
    {
        key: '1',
        order_number:'2021100100',
        merhcant_name: '派大星',
        coin: 'USDT-TRC20',
        address: 'TE3kLnT4GJ1pRjhVF94HdwG85AhwBzQNYN',
        true_amount: 6.600000,
        date: '2017-10-31 23:12:00',
        back_number:2,
        back_status:1,
        hash: 'https://www.baidu.com'
    },
    {
        key: '2',
        order_number:'2021100100',
        merhcant_name: '章鱼哥',
        coin: 'USDT-TRC20',
        address: 'TE3kLnT4GJ1pRjhVF94HdwG85AhwBzQNYN',
        true_amount: 6.600000,
        date: '2017-10-31 23:12:00',
        back_number:2,
        back_status:0,
        hash: 'https://www.baidu.com'
    },
    {
        key: '3',
        order_number:'2021100100',
        merhcant_name: '海绵宝宝',
        coin: 'USDT-TRC20',
        address: 'TE3kLnT4GJ1pRjhVF94HdwG85AhwBzQNYN',
        true_amount: 6.600000,
        date: '2017-10-31 23:12:00',
        back_number:2,
        back_status:2,
        hash: 'https://www.baidu.com'
    },
];

const columns: ColumnsType<DataType> = [
    {
        title: '订单号',
        dataIndex: 'order_number',
        key: 'order_number',
        align: 'center',
    },
    {
        title: '商户名称',
        dataIndex: 'merhcant_name',
        key: 'merhcant_name',
        align: 'center',
    },
    {
        title: '到账时间',
        dataIndex: 'date',
        align: 'center',
        key: 'date',
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
        dataIndex: 'from_address',
        key: 'from_address',
        render: (_, { address }): ReactElement => (
            <Tooltip placement="top" title={address}>
                <p className='text-overflow'>{address}</p>
            </Tooltip>
        ),
    },
    {
        title: '回调次数',
        dataIndex: 'back_number',
        key: 'back_number',
        align:'center'
    },
    {
        title: '回调状态',
        dataIndex: 'back_status',
        align: 'center',
        key: 'back_status',
        render: (_, { back_status }): ReactElement => (
            <p className='back-status'>
                { back_status ===  0 && '-' || back_status ===  1 && '回调成功' || back_status ===  2 && '回调失败'}
            </p>
        )
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
];

const UserDepositList = (): ReactElement<ReactNode> => {
    const onChange: PaginationProps['onChange'] = pageNumber => {
        console.log('Page: ', pageNumber);
    };
    return (
        <div className='user-deposit-list'>
            <OrderFilter dateText="到账时间" status={false} merchantNumber={false} emitFilter={(filter: string): void => {
                console.log(JSON.parse(filter))
            }} />
            <div className='table-list'>
                <Table rowClassName="table-row-mine" dataSource={dataSource} columns={columns} pagination={false} />
                <div className='page-oper'>
                    <ConfigProvider locale={zhCN}>
                        <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={onChange} />
                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
};

export default UserDepositList;