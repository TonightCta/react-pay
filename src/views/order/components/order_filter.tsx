
import { Input, Select, DatePicker, Button, ConfigProvider } from 'antd';
import { ReactElement, ReactNode, useState, useContext } from 'react';
import zhCN from 'antd/es/locale/zh_CN';

import './index.scss'
import moment from 'moment';
import { IBPay } from '../../../App';
import { useEffect } from 'react';
import { useRef } from 'react';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface Props {
    status: boolean,
    merchantNumber: boolean,
    emitFilter: (msg: string) => void,
    dateText: string
}

export interface Filter {
    order_number: string | number,
    merchant_order_number: string,
    coin: string,
    hash: string,
    address: string,
    merchant_id: string,
    start: string | number,
    end: string | number,
    min: number | string,
    max: number | string,
    status: number | string
};

export const filterSource : Filter = {
    order_number: '',
    merchant_order_number: '',
    coin: '',
    hash: '',
    address: '',
    merchant_id: '',
    min: '',
    max: '',
    start: '',
    end: '',
    status: ''
}

const OrderFilter = (props: Props): ReactElement<ReactNode> => {
    const { state } = useContext(IBPay);
    const [coinList,steCoinList] = useState<string[]>([]);
    const [merchantList,setMerchantList] = useState<{ name: string, mch_id: string }[]>([])
    useEffect(() => {
        const { merchant_list, account } = state;
        const filterMerchant = merchant_list!.map(item => {
            return {
                name: item.name,
                mch_id: item.mch_id
            }
        });
        setMerchantList(filterMerchant);
        const filterCoin = JSON.parse(account || '{}')?.coinStatementList.map((item: { asset: string }) => {
            return item.asset
        }) || [];
        steCoinList(filterCoin)
    }, []);
    const [filterMsg, setFilterMsg] = useState<Filter>(filterSource);
    //选择币种
    const selectCoin = (e: string): void => {
        setFilterMsg({
            ...filterMsg,
            coin: e === 'all' ? '' : e
        })
    };
    //选择商家
    const selectMerchant = (e: string): void => {
        setFilterMsg({
            ...filterMsg,
            merchant_id: e === 'all' ? '' : e
        })
    }
    //选择订单状态
    const selectStatus = (e: string): void => {
        setFilterMsg({
            ...filterMsg,
            status: e === 'all' ? '' : e
        })
    }
    return (
        <div className='order-tilter'>
            <div className='fliter-inner'>
                <div className='left-normal-filter'>
                    <div className='order-id inp-filter filter-public'>
                        <p>订单号:</p>
                        <Input placeholder='请输入订单号' value={filterMsg.order_number} onChange={(e) => {
                            setFilterMsg({
                                ...filterMsg,
                                order_number: e.target.value
                            })
                        }} width={166} />
                    </div>
                    <div className='coin-type select-filter filter-public'>
                        <p>币种:</p>
                        <Select placeholder="选择币种" defaultValue="all" style={{ width: 166 }} onChange={selectCoin}>
                            <Option value="all">全部</Option>
                            {
                                coinList.map((item: string, index: number): ReactElement => {
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    {
                        props.merchantNumber && <div className='merchant-order-id inp-filter filter-public'>
                            <p>商家订单号:</p>
                            <Input placeholder='请输入商家订单号' value={filterMsg.merchant_order_number} onChange={(e) => {
                                setFilterMsg({
                                    ...filterMsg,
                                    merchant_order_number: e.target.value
                                })
                            }} width={166} />
                        </div>
                    }
                    <div className='trade-hash inp-filter filter-public'>
                        <p>交易HASH:</p>
                        <Input placeholder='请输入交易HASH' value={filterMsg.hash} onChange={(e) => {
                            setFilterMsg({
                                ...filterMsg,
                                hash: e.target.value
                            })
                        }} width={166} />
                    </div>
                    <div className='address inp-filter filter-public'>
                        <p>地址:</p>
                        <Input placeholder='请输入地址' value={filterMsg.address} onChange={(e) => {
                            setFilterMsg({
                                ...filterMsg,
                                address: e.target.value
                            })
                        }} width={166} />
                    </div>
                    <div className='merchant select-filter filter-public'>
                        <p>商家:</p>
                        <Select defaultValue="all" style={{ width: 166 }} onChange={selectMerchant}>
                            <Option value="all">全部</Option>
                            {
                                merchantList.map((item: { mch_id: string, name: string }, index: number): ReactElement => {
                                    return (
                                        <Option key={index} value={item.mch_id}>{item.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>

                    {
                        props.status && <div className='order-status select-filter filter-public'>
                            <p>订单状态:</p>
                            <Select defaultValue="all" style={{ width: 166 }} onChange={selectStatus}>
                                <Option value="all">全部</Option>
                                <Option value="0">提币中</Option>
                                <Option value="-1">已拒绝</Option>
                                <Option value="1">提币完成</Option>
                            </Select>
                        </div>
                    }

                    <div className='filter-public'></div>
                    <div className='filter-public'></div>
                </div>
                <div className='right-other-filter'>
                    <div className='date-filter filter-public'>
                        <p>{props.dateText}:</p>
                        <ConfigProvider locale={zhCN}>
                            <RangePicker onChange={(e: any) => {
                                if (e && e.length > 1) {
                                    setFilterMsg({
                                        ...filterMsg,
                                        start: e[0].startOf('day').format('x'),
                                        end: e[1].startOf('day').format('x')
                                    })
                                } else {
                                    setFilterMsg({
                                        ...filterMsg,
                                        start: '',
                                        end: ''
                                    })
                                }
                            }} />
                        </ConfigProvider>
                    </div>
                    <div className='amount-msg inp-filter-two filter-public'>
                        <p>到账金额:</p>
                        <Input placeholder='最小金额' value={filterMsg.min} onChange={(e) => {
                            setFilterMsg({
                                ...filterMsg,
                                min: e.target.value
                            })
                        }} width={166} />
                        <p className='mask-label'>~</p>
                        <Input placeholder='最大金额' value={filterMsg.max} onChange={(e) => {
                            setFilterMsg({
                                ...filterMsg,
                                max: e.target.value
                            })
                        }} width={166} />
                    </div>
                    <div className='submit-filter filter-public'>
                        <Button type="primary" onClick={() => {
                            props.emitFilter(JSON.stringify(filterMsg));
                        }}>查询</Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OrderFilter;