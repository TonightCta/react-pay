
import { Button, ConfigProvider, Pagination, Popconfirm, Select, Table, notification, message } from 'antd';
import { ReactElement, ReactNode, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import zhCN from 'antd/es/locale/zh_CN';
import './index.scss'
import AddMerchant from './components/add_merchant';
import { MerchantListApi, OperMerchantAPi, DeleteMerchantApi } from '../../../request/api'
import { useEffect } from 'react';
import EditMerchantBox from './components/edit_merchant';

const { Option } = Select;

interface Data {
    name: string,
    mch_id: string,
    email: string,
    ip_list: string | null,
    created_at: string,
    admin: number,
    status: number,
    is_admin: number,
    id: number
}

export interface EditMsg{
    mch_id:string,
    email:string,
    name:string
};

export const editSource : EditMsg = {
    mch_id:'',
    email:'',
    name:''
}




const MerchantList = (): ReactElement<ReactNode> => {
    const [pageMsg, setPageMsg] = useState<{ page: number, limit: number, total: number }>({
        page: 1,
        limit: 10,
        total: 1
    });
    //筛选商家ID
    const [merchantID, setMerchantID] = useState<string>('');
    //商家列表
    const [merchantList, setMerchantList] = useState<{ name: string, mch_id: string }[]>([])
    const [dataSource, setDateSource] = useState([]);
    const [waitResult, setWaitResult] = useState<boolean>(false);
    const dataListService = async () => {
        setWaitResult(true)
        const result = await MerchantListApi({
            merchant_id: merchantID,
            limit: pageMsg.limit,
            isMerchant: 0,
            page: pageMsg.page
        });
        setWaitResult(false);
        const { data } = result;
        const filterMerchant = data.list.map((item: { name: string, mch_id: string }) => {
            return {
                name: item.name,
                mch_id: item.mch_id
            }
        });
        setMerchantList(filterMerchant);
        setPageMsg({
            ...pageMsg,
            total: data.total
        });
        data.list.forEach((e: any, i: number) => {
            Object.assign(e, { key: String(i + 1) })
        })
        setDateSource(data.list);
    };
    //选择商家
    const selectMerchant = (val: string): void => {
        setMerchantID(val === 'all' ? '' : val)
    };
    useEffect(() => {
        dataListService();
    }, [pageMsg.page, pageMsg.limit, merchantID])
    //新增商户
    const [addBox, setAddbox] = useState<boolean>(false);
    //编辑商户
    const [editBox,setEditBox] = useState<boolean>(false);
    //编辑信息
    const [editMsg,setEditMsg] = useState<EditMsg>(editSource);
    //操作商户类型
    const [boxType, setBoxType] = useState<number>(1);
    //编辑商户信息
    const [editMerchant, setEditMerchant] = useState<{ id: number | string }>({
        id: ''
    })
    //操作商家账号
    const changeMerchant = async (_type: string, _status: number, _id: number) => {
        const result = await OperMerchantAPi({
            id: _id,
            key: _type,
            status: _status === 1 ? 0 : 1
        });
        const { code } = result;
        if (code !== 200) {
            message.error(result.message);
            return;
        };
        message.success('操作成功');
        dataListService();
    };
    //删除商户
    const deleteMerchant = async (): Promise<void> => {
        const result = await DeleteMerchantApi({
            id: editMerchant.id
        });
        const { code } = result;
        if (code !== 200) {
            message.error(result.message);
            return;
        };
        message.success('删除成功');
        dataListService();
    }
    //页码变化
    const pageChange = (page: number, size: number) => {
        setPageMsg({
            ...pageMsg,
            page: page,
            limit: size
        });
    };
    const columns: ColumnsType<Data> = [
        {
            title: '商户名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '商户号',
            dataIndex: 'mch_id',
            key: 'mch_id',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '白名单IP',
            dataIndex: 'ip_list',
            key: 'ip_list',
            align: 'center',
            render: (_, { ip_list }) => (
                <div>{ip_list ? ip_list : '-'}</div>
            )
        },
        {
            title: '开户时间',
            dataIndex: 'created_at',
            key: 'created_at',
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
            render: (_, { status, id }) => (
                <div className={`account-status-oper ${status === 1 ? 'open-switch' : 'close-switch'}`} onClick={() => {
                    changeMerchant('status', status, id);
                }}>
                    <div className='status-switch'>
                        <div className='switch-mask'></div>
                    </div>
                </div>
            ),
            align: 'center',
        },
        {
            title: '管理员',
            dataIndex: 'is_admin',
            key: 'is_admin',
            render: (_, { is_admin, id }) => (
                <div className={`account-status-oper ${is_admin === 1 ? 'open-switch' : 'close-switch'}`} onClick={() => {
                    changeMerchant('is_admin', is_admin, id);
                }}>
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
            render: (_, { id,name,email,mch_id }) => (
                <div className='list-oper'>
                    <Button type='primary'>登录</Button>
                    <div className='edit-merchant' onClick={() => {
                        setEditMsg({
                            mch_id:mch_id,
                            name:name,
                            email:email
                        });
                        setEditBox(true);
                    }}>
                        <p className='iconfont icon-bianji'></p>
                    </div>
                    <Popconfirm placement="topLeft" title='确认删除商户？' onConfirm={deleteMerchant} okText="Yes" cancelText="No">
                        <div className='delete-merchant' onClick={() => {
                            setEditMerchant({
                                ...editMerchant,
                                id: id
                            })
                        }}>
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
                    <Select style={{ width: 166 }} defaultValue="all" placeholder="请选择商家" onChange={selectMerchant}>
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
                        dataListService();
                    }}>查询</Button>
                    <Button type='primary' className='primary-2' onClick={() => {
                        setBoxType(1)
                        setAddbox(true)
                    }}>新增商户</Button>
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
            {/* 新增商户 */}
            <AddMerchant value={addBox} type={boxType} resetModal={(val: boolean): void => {
                setAddbox(val);
            }} reloadList={() => {
                dataListService()
            }}/>
            {/* 编辑商户 */}
            <EditMerchantBox editMsg={editMsg} value={editBox} reloadList={() => {
                dataListService()
            }} resetModal={() => {
                setEditBox(false);
            }}/>
        </div>
    );
};

export default MerchantList;