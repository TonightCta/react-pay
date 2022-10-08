
import { Button, ConfigProvider, Pagination, Select, Table } from 'antd';
import { ReactElement, ReactNode } from 'react';
import type { ColumnsType } from 'antd/es/table';
import './index.scss';
import zhCN from 'antd/es/locale/zh_CN';

const { Option } = Select;

interface Data {
    merchant: string,
    coin: string,
    main_coin:string,
    in_fee:number,
    out_fee:number,
    miner_fee:number,
    min_withdraw:number,
    max_withdraw:number,
    udun_address:string,
    back_time:string,
    is_udun: number,
    id: string,
}

const dataSource = [
    {
        key: '1',
        merchant: 'xCyhHSaDmGo3H7BYg2TPGzJ4',
        coin: 'USDT-TRC20',
        main_coin:'TRX',
        in_fee:1.5,
        out_fee:1.5,
        miner_fee:9.8,
        min_withdraw:9.8,
        max_withdraw:9.8,
        udun_address: 'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT',
        back_time:'2017-10-31  23:12:00',
        is_udun: 0,
        id: 'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT',
    },
    {
        key: '2',
        merchant: 'xCyhHSaDmGo3H7BYg2TPGzJ4',
        coin: 'USDT-TRC20',
        main_coin:'TRX',
        in_fee:1.5,
        out_fee:1.5,
        miner_fee:9.8,
        min_withdraw:9.8,
        max_withdraw:9.8,
        udun_address: 'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT',
        back_time:'2017-10-31  23:12:00',
        is_udun: 1,
        id: 'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT',
    },
];

const columns: ColumnsType<Data> = [
    {
        title: '商户号',
        dataIndex: 'merchant',
        key: 'merchant',
    },
    {
        title: '币种',
        dataIndex: 'coin',
        key: 'coin',
        align: 'center',
    },
    {
        title: '主币种',
        dataIndex: 'main_coin',
        key: 'main_coin',
        align: 'center',
    },
    {
        title: '入金手续费',
        dataIndex: 'in_fee',
        key: 'in_fee',
        align: 'center',
    },
    {
        title: '出金手续费',
        dataIndex: 'out_fee',
        key: 'out_fee',
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
        dataIndex: 'udun_address',
        key: 'udun_address',
        align: 'center',
    },
    {
        title: '上次归集时间',
        dataIndex: 'back_time',
        key: 'back_time',
        align: 'center',
    },
    {
        title: '是否UDUN地址',
        dataIndex: 'is_udun',
        key: 'is_udun',
        align: 'center',
        render:(_,{ is_udun }) => (
            <div className='address-wallet'>{is_udun === 1 ? 'UDUN' : '否'}</div>
        )
    },
    {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render:(_,{ id }) => (
            <div className='list-oper'>修改配置</div>
        )
    },
];

const MerchantConfig = (): ReactElement<ReactNode> => {

    const selectStatus = (val: string): void => {
        console.log(val)
    }

    const onChange = (val: number): void => {
        console.log(val)
    }

    return (
        <div className='merchant-config'>
            <div className='fitler-box'>
                <div className='filter-inner'>
                    <p className='inner-label'>商家:</p>
                    <Select style={{ width: 166 }} placeholder="请选择商家" onChange={selectStatus}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div className='filter-btn'>
                    <Button type='primary' className='liquire-btn'>查询</Button>
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

export default MerchantConfig;