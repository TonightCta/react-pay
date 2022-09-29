
import { ReactElement } from 'react';
import { ConfigProvider, DatePicker, Table } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const { RangePicker } = DatePicker;

const dataSource = [
    {
        key: '1',
        name: '刘德华',
        ip: '145.25.29.36',
        date: '2022-02-05 14:25:56',
    },
    {
        key: '2',
        name: '胡彦祖',
        ip: '145.25.29.36',
        date: '2022-02-05 14:25:56',
    },
    {
        key: '3',
        name: '胡彦祖',
        ip: '145.25.29.36',
        date: '2022-02-05 14:25:56',
    },
    {
        key: '4',
        name: '胡彦祖',
        ip: '145.25.29.36',
        date: '2022-02-05 14:25:56',
    },
    {
        key: '5',
        name: '胡彦祖',
        ip: '145.25.29.36',
        date: '2022-02-05 14:25:56',
    },
    {
        key: '6',
        name: '胡彦祖',
        ip: '145.25.29.36',
        date: '2022-02-05 14:25:56',
    },
];

const columns = [
    {
        title: '商户名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '登录IP',
        dataIndex: 'ip',
        key: 'ip',
    },
    {
        title: '登录时间',
        dataIndex: 'date',
        key: 'date',
    },
];


const LoginLog = (): ReactElement => {
    return (
        <div className='login-log'>
            <div className='public-title'>
                <p>登录日志</p>
                <div className=''>
                    <ConfigProvider locale={zhCN}>
                        <RangePicker suffixIcon={<img src={require('../../../assets/images/date_icon.png')} />} allowClear={false} />
                    </ConfigProvider>
                </div>
            </div>
            <div className='log-list'>
                <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }}/>
            </div>
        </div>
    )
};

export default LoginLog;