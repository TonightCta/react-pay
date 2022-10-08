
import { Button, ConfigProvider, Input, Pagination, Select, Table } from 'antd';
import { ReactElement, ReactNode } from 'react';
import './index.scss'
import zhCN from 'antd/es/locale/zh_CN';

const { Option } = Select;

const AddressesList = (): ReactElement<ReactNode> => {
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
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
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '是否UDUN地址',
            dataIndex: 'is_udun',
            key: 'is_udun',
        },
        {
            title: '业务ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '回调地址',
            dataIndex: 'back_address',
            key: 'back_address',
        },
    ];

    const selectStatus = (val: string): void => {
        console.log(val)
    };
    const onChange = (val:number) : void => {
        console.log(val)
    }
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