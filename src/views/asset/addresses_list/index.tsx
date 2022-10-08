
import { Button, ConfigProvider, Input, Pagination, Select, Table } from 'antd';
import { ReactElement, ReactNode } from 'react';
import type { ColumnsType } from 'antd/es/table';
import './index.scss'
import zhCN from 'antd/es/locale/zh_CN';

const { Option } = Select;

interface Data{
    merchant:string,
    address:string,
    coin:string,
    type:number,
    is_udun:number,
    id:string,
    back_address:string
}

const dataSource = [
    {
        key: '1',
        merchant: 'xCyhHSaDmGo3H7BYg2TPGzJ4',
        address: 'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT',
        coin: 'TRX',
        type:1,
        is_udun:0,
        id:'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT',
        back_address:'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT'
    },
    {
        key: '2',
        merchant: 'xCyhHSaDmGo3H7BYg2TPGzJ4',
        address: 'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT',
        coin: 'USDT',
        type:0,
        is_udun:1,
        id:'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT',
        back_address:'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT'
    },
];

const columns : ColumnsType<Data> = [
    {
        title: '商户',
        dataIndex: 'merchant',
        key: 'merchant',
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
        align:'center',
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align:'center',
        render:(_,{type}) => (
            <div className='address-type'>{type === 1 ? '客户钱包' : 'unKnow'}</div>
        )
    },
    {
        title: '是否UDUN地址',
        dataIndex: 'is_udun',
        key: 'is_udun',
        align:'center',
        render:(_,{ is_udun }) => (
            <div className='address-wallet'>{is_udun === 1 ? 'UDUN' : '否'}</div>
        )
    },
    {
        title: '业务ID',
        dataIndex: 'id',
        key: 'id',
        align:'center',
    },
    {
        title: '回调地址',
        dataIndex: 'back_address',
        key: 'back_address',
        align:'center',
    },
];

const AddressesList = (): ReactElement<ReactNode> => {
    
    const selectStatus = (val: string): void => {
        console.log(val)
    };
    const onChange = (val:number) : void => {
        console.log(val)
    };
    return (
        <div className='addresses-list'>
            <div className='filter-box'>
                {/* 选择商家 */}
                <div className='filter-inner'>
                    <p className='filter-label'>商家邮箱:</p>
                    <Select style={{ width: 166 }} placeholder="请选择商家" onChange={selectStatus}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                {/* 选择地址 */}
                <div className='filter-inner'>
                    <p className='filter-label'>地址:</p>
                    <Input type='text' placeholder='请输入地址' />
                </div>
                {/* 选择币种 */}
                <div className='filter-inner'>
                    <p className='filter-label'>币种:</p>
                    <Select style={{ width: 166 }} placeholder="请选择币种" onChange={selectStatus}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                {/* 选择类型 */}
                <div className='filter-inner'>
                    <p className='filter-label'>类型:</p>
                    <Select style={{ width: 166 }} placeholder="请选择类型" onChange={selectStatus}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div className='filter-btn'>
                    <Button type='primary'>查询</Button>
                </div>
            </div>
            <div className='data-list'>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
                <div className='page-oper'>
                    <ConfigProvider locale={zhCN}>
                        <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={onChange} />
                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
};

export default AddressesList;