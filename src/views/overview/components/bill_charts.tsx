
import { ReactElement, useEffect } from 'react';
import * as echarts from 'echarts';
import { ConfigProvider, DatePicker, Select } from 'antd';
import html2canvas from 'html2canvas';
import zhCN from 'antd/es/locale/zh_CN';


const { RangePicker } = DatePicker;
const { Option } = Select;
let chartsBox: any;

const BillCharts = (): ReactElement => {
    const handleChange = (e: string): void => {
        console.log(e)
    };
    const resize = () => {
        chartsBox.resize();
    }
    useEffect(() => {
        window.addEventListener('resize', resize, true);
        return () => {
            window.removeEventListener('resize', resize, true)
        }
    }, []);
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
                        )}&nbsp;${'USDT'
                        }</p></div>`;
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
            fontSize: 14,
            color: "#999",
            padding: [0, 0, 0, 10],
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '商户提币',
                type: 'line',
                color: '#2FC25B',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '用户提币',
                type: 'line',
                color: '#F5B544',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '用户充值',
                color: '#1890FF',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
        ]
    };
    useEffect(() => {
        chartsBox = echarts.getInstanceByDom(document.getElementById('charts-box') as HTMLElement);
        if (!chartsBox) {
            chartsBox = echarts.init(document.getElementById('charts-box') as HTMLElement);
        };
        chartsBox.setOption(option);
    }, []);
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
    }
    return (
        <div className='bill-charts'>
            <div className='public-title'>
                <p>经营概况</p>
                <div className='right-oper'>
                    <div className=''>
                        <ConfigProvider locale={zhCN}>
                            <RangePicker suffixIcon={<img src={require('../../../assets/images/date_icon.png')} />} allowClear={false} />
                        </ConfigProvider>
                    </div>
                    <div className='select-coin'>
                        <Select style={{ width: 108 }} placeholder="币种" suffixIcon={<span className='iconfont icon-cangpeitubiao_xiazaipandiandanxiazaidayinmoban1'></span>} onChange={handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
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