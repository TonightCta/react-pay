
import { Input, Select, DatePicker, Button, ConfigProvider } from 'antd';
import { ReactElement, ReactNode, useState } from 'react';
import zhCN from 'antd/es/locale/zh_CN';

import './index.scss'
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface Props {
    status: boolean,
    merchantNumber: boolean,
    emitFilter: (msg: string) => void,
    dateText:string
}

interface Filter {
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
}

const OrderFilter = (props: Props): ReactElement<ReactNode> => {

    const [filterMsg, setFilterMsg] = useState<Filter>({
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
    });
    //选择币种
    const selectCoin = (e: string): void => {
        setFilterMsg({
            ...filterMsg,
            coin: e
        })
    };
    //选择商家
    const selectMerchant = (e: string): void => {
        setFilterMsg({
            ...filterMsg,
            merchant_id: e
        })
    }
    //选择订单状态
    const selectStatus = (e: string): void => {
        setFilterMsg({
            ...filterMsg,
            status: e
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
                        <Select placeholder="选择币种" style={{ width: 166 }} onChange={selectCoin}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
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
                        <Select defaultValue="lucy" style={{ width: 166 }} onChange={selectMerchant}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>

                    {
                        props.status && <div className='order-status select-filter filter-public'>
                            <p>订单状态:</p>
                            <Select defaultValue="lucy" style={{ width: 166 }} onChange={selectStatus}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
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
                                if (e.length && e.length > 1) {
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