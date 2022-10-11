
import { ReactElement, useEffect, useContext } from 'react';
import * as echarts from 'echarts';
import { ConfigProvider, DatePicker, Select } from 'antd';
import html2canvas from 'html2canvas';
import zhCN from 'antd/es/locale/zh_CN';
import { BillViewApi } from '../../../request/api';
import { IBPay } from '../../../App';
import { useState } from 'react';


const { RangePicker } = DatePicker;
const { Option } = Select;
let chartsBox: any;

const BillCharts = (): ReactElement => {
    const { state } = useContext(IBPay);
    const [coinList, setCoinList] = useState<string[]>([]);
    const [ filterCoin,setFilterCoin ] = useState<string>('TRX');
    const [filterDate,setFilterDate] = useState<{start:string,end:string}>({
        start:'',
        end:''
    })
    const selectCoin = (e: string): void => {
        setFilterCoin(e as string)
    };
    const selectDate = (e:any) : void => {
        setFilterDate({
            start:e[0].startOf('day').format('YYYY-MM-DD'),
            end:e[1].startOf('day').format('YYYY-MM-DD'),
        });
    }
    const resize = () => {
        chartsBox.resize();
    };
    useEffect(() => {
        window.addEventListener('resize', resize, true);
        const { account } = state;
        const { coinStatementList } =  JSON.parse(account || '{coinStatementList:[]}');
        setCoinList(coinStatementList.map((item:{asset:string}) => {
            return item.asset
        }));
        return () => {
            window.removeEventListener('resize', resize, true)
        }
    }, []);
    const initEcharts = (date: [], deposits: [], withdraw: [], userDeposits: [], userWithdraw: []) => {
        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    let result = "";
                    params.forEach((e: any) => {
                        result +=
                            `<div style="margin-top:12px;display:flex;justify-content: space-between;"><div style="display:flex;"><p style="transform:scale(0.7);">${e.marker}</p>` +
                            `<p>${e.seriesName}</p></div>` +
                            `<p style="margin-left:16px;">${Number(e.value).toFixed(
                                4
                            )}&nbsp;${filterCoin}</p></div>`;
                    });
                    return `<p style="text-align:left;">${params[0].name}</p>` + result;
                },
                extraCssText: 'background:rgba(4, 28, 75, 0.8);padding:16px 26px;border:0;border-radius:20px;backdrop-filter: blur(2px);color:white;'
            },
            legend: {
                data: ['商户充值', '商户提币', '用户提币', '用户充值'],
                icon: "circle",
                itemWidth: 6,
                itemGap: 48,
                textStyle: {
                    fontSize: 14,
                    color: "#999",
                    padding: [0, 0, 0, 10],
                },
            },
            //#BFBFBF
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date,
                offset: 10,
                axisTick: {
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                },
                axisLabel: {
                    color: '#333'
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: '#E6E6E6',
                        type: 'dashed'
                    }
                }
            },
            series: [
                {
                    name: '商户充值',
                    type: 'line',
                    color: '#ED6F86',
                    stack: 'Total',
                    data: deposits
                },
                {
                    name: '商户提币',
                    type: 'line',
                    color: '#2FC25B',
                    stack: 'Total',
                    data: withdraw
                },
                {
                    name: '用户提币',
                    type: 'line',
                    color: '#F5B544',
                    stack: 'Total',
                    data: userWithdraw
                },
                {
                    name: '用户充值',
                    color: '#1890FF',
                    type: 'line',
                    stack: 'Total',
                    data: userDeposits
                },
            ]
        };
        chartsBox = echarts.getInstanceByDom(document.getElementById('charts-box') as HTMLElement);
        if (!chartsBox) {
            chartsBox = echarts.init(document.getElementById('charts-box') as HTMLElement);
        };
        chartsBox.setOption(option);
    };
    const billViewService = async () => {
        const { merchant_id } = state;
        const result = await BillViewApi({
            mch_id: merchant_id,
            coin: filterCoin,
            start: filterDate.start,
            end: filterDate.end
        });
        const { data } = result;
        const date = data.deposits.map((item: { date: string; }) => {
            return item.date.substring(5, 10);
        });
        const deposits = data.deposits.map((item: { total: string; }) => {
            return item.total;
        });
        const withdraw = data.withdraw.map((item: { total: string; }) => {
            return item.total;
        });
        const userDeposits = data.userDeposits.map((item: { total: string; }) => {
            return item.total;
        });
        const userWithdraw = data.userWithdraw.map((item: { total: string; }) => {
            return item.total;
        });
        initEcharts(date, deposits, withdraw, userDeposits, userWithdraw)
    };
    //下载echarts
    const downEcharts = () => {
        html2canvas(document.getElementById("charts-box") as HTMLElement).then(
            (canvas) => {
                const img = canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image-octet/stream");
                const downImg = document.createElement("a");
                downImg.download = "经营概况.png";
                downImg.href = img;
                document.body.appendChild(downImg);
                downImg.click();
                downImg.remove();
            }
        );
    };
    useEffect(() => {
        billViewService();
    }, [state.merchant_id,filterCoin,filterDate.end])
    return (
        <div className='bill-charts'>
            <div className='public-title'>
                <p>经营概况</p>
                <div className='right-oper'>
                    <div className=''>
                        <ConfigProvider locale={zhCN}>
                            <RangePicker suffixIcon={<img src={require('../../../assets/images/date_icon.png')} />} allowClear={false} onChange={selectDate}/>
                        </ConfigProvider>
                    </div>
                    <div className='select-coin'>
                        <Select style={{ width: 108 }} placeholder="币种" defaultValue={filterCoin} suffixIcon={<span className='iconfont icon-cangpeitubiao_xiazaipandiandanxiazaidayinmoban1'></span>} onChange={selectCoin}>
                            {
                                coinList.map((item: string, index: number): ReactElement => {
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className='down-echarts' onClick={() => {
                        downEcharts()
                    }}>
                        <p className='iconfont icon-cangpeitubiao_xiazaipandiandanxiazaidayinmoban'></p>
                    </div>
                </div>
            </div>
            <div className='charts-box' id="charts-box"></div>
        </div>
    )
};

export default BillCharts;