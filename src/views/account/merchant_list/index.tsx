
import { Button, ConfigProvider, Pagination, Popconfirm, Select, Table,notification } from 'antd';
import { ReactElement, ReactNode, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import zhCN from 'antd/es/locale/zh_CN';
import './index.scss'
import AddMerchant from './components/add_merchant';

const { Option } = Select;

interface Data {
    merchant_name: string,
    merchant: string,
    email: string,
    white_ip: string | null,
    create_at: string,
    id: string,
    admin: number,
    status: number
}

const dataSource = [
    {
        key: '1',
        merchant_name: '派大星',
        merchant: 'xCyhHSaDmGo3H7BYg2TPGzJ4',
        email: 'jimmajia112233@gmail.com',
        white_ip: '47.89.186.197',
        create_at: '2017-10-31  23:12:00',
        status: 1,
        admin: 0,
        id: 'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT',
    },
    {
        key: '2',
        merchant_name: '章鱼哥',
        merchant: 'xCyhHSaDmGo3H7BYg2TPGzJ4',
        white_ip: null,
        email: 'jimmajia112233@gmail.com',
        create_at: '2017-10-31  23:12:00',
        status: 0,
        admin: 1,
        id: 'TBZtJSWmL8erD4623x7xFHVe9PPiJDR9ZT',
    },
];



const MerchantList = (): ReactElement<ReactNode> => {

    const selectStatus = (val: number): void => {
        console.log(val)
    }

    const onChange = (val: number): void => {
        console.log(val)
    };

    const [addBox, setAddbox] = useState<boolean>(false);

    const [boxType, setBoxType] = useState<number>(1);

    const deleteMerchant = () : void => {
        console.log('delete');
        notification.info({
            message:'提示',
            description:'确认删除了商户'
        })
    }

    const columns: ColumnsType<Data> = [
        {
            title: '商户名称',
            dataIndex: 'merchant_name',
            key: 'merchant_name',
        },
        {
            title: '商户号',
            dataIndex: 'merchant',
            key: 'merchant',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '白名单IP',
            dataIndex: 'white_ip',
            key: 'white_ip',
            align: 'center',
            render: (_, { white_ip }) => (
                <div>{white_ip ? white_ip : '-'}</div>
            )
        },
        {
            title: '开户时间',
            dataIndex: 'create_at',
            key: 'create_at',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, { status }) => (
                <div className={`address-status ${status === 1 ? 'normal-account' : 'freez-account'}`}>{status === 1 ? '正常' : '冻结'}</div>
            )
        },
        {
            title: '启用/禁用',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => (
                <div className={`account-status-oper ${status === 1 ? 'open-switch' : 'close-switch'}`}>
                    <div className='status-switch'>
                        <div className='switch-mask'></div>
                    </div>
                </div>
            ),
            align: 'center',
        },
        {
            title: '管理员',
            dataIndex: 'admin',
            key: 'admin',
            render: (_, { admin }) => (
                <div className={`account-status-oper ${admin === 1 ? 'open-switch' : 'close-switch'}`}>
                    <div className='status-switch'>
                        <div className='switch-mask'></div>
                    </div>
                </div>
            ),
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 150,
            render: (_, { id }) => (
                <div className='list-oper'>
                    <Button type='primary'>登录</Button>
                    <div className='edit-merchant' onClick={() => {
                        setBoxType(2)
                        setAddbox(true)
                    }}>
                        <p className='iconfont icon-bianji'></p>
                    </div>
                    <Popconfirm placement="topLeft" title='确认删除商户？' onConfirm={deleteMerchant} okText="Yes" cancelText="No">
                        <div className='delete-merchant'>
                            <p className='iconfont icon-shachu'></p>
                        </div>
                    </Popconfirm>
                </div>
            )
        },
    ];
    return (
        <div className='merchant-list'>
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
                    <Button type='primary' className='primary-2' onClick={() => {
                        setBoxType(1)
                        setAddbox(true)
                    }}>新增商户</Button>
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
            {/* 新增商户 */}
            <AddMerchant value={addBox} type={boxType} resetModal={(val: boolean): void => {
                setAddbox(val)
            }} />
        </div>
    );
};

export default MerchantList;