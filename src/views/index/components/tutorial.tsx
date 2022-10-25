
import { ReactElement, ReactNode, useState, useRef, useEffect } from 'react';
import { Carousel, Image } from 'antd';



interface Props {
    type: number,
    resetModal: (val: boolean) => void,
    value:boolean
}

interface Step {
    title: string,
    img?: string,
    img_other?: string,
    class_name?: string,
    remark?: string,
    remark_other?: string
};

const withdrawStep: Step[] = [
    {
        title: '点击后台“商户提币”，选择币种账户（USDT-TRC20），下图：',
        img: require('../../../assets/images/step/withdraw_1.png'),
        class_name: 'big-img'
    },
    {
        title: '选择完之后，填入交易所（币安、钱包等）收U（USDT-TRC20）地址及提币个数，下图：',
        img: require('../../../assets/images/step/withdraw_2.png'),
        class_name: 'big-img'
    },
    {
        title: '填写完之后，点击下一步弹窗输入交易密码等即可完成提币，审核通过后会向你指定的地址（USDT-TRC20）打币'
    }
];
const rechargeStep: Step[] = [
    {
        title: '点击后台“商户充币”，选择币种账户（USDT-TRC20），下图：',
        img: require('../../../assets/images/step/recharge_1.png'),
        class_name: 'big-img',
    },
    {
        title: '选择完之后，打开交易所（币安等），以欧易交易所为例子，选择底部“资产”菜单进入资产页面，下图：',
        img: require('../../../assets/images/step/recharge_2.png'),
        class_name: 'small-img',
    },
    {
        title: '进入资产页面之后，点击“提现”按钮（图1），进入提现页面，下图（图2）：',
        img: require('../../../assets/images/step/recharge_3_1.png'),
        img_other: require('../../../assets/images/step/recharge_3_2.png'),
        class_name: 'small-img',
    },
    {
        title: '进入提现页面后，交易所会显示你的资产余额，你只要选择USDT，进入USDT提现页面，下图（默认为线上转账，这个不用去调整）：',
        img: require('../../../assets/images/step/recharge_4.png'),
        class_name: 'small-img',
        remark: '注：大部分交易所都会有链上转账和内部转账选择，对外提币都是走链上转账'
    },
    {
        title: '进入USDT提现页面，先选择提币网络，商户后台支持的网络是（USDT-TRC20），所以在合理选择的时候要选择对应的网络（USDT-TRC20）才能转账成功，下图：',
        img: require('../../../assets/images/step/recharge_5.png'),
        class_name: 'small-img',
    },
    {
        title: '提币网络选择完之后，关键的来了，那就是扫描后台对应提币网络地址的二维码即可发起提币，下图：',
        img: require('../../../assets/images/step/recharge_6.png'),
        class_name: 'small-img',
        remark: '注：提现地址可输入、复制粘贴，也可以扫描，为什么建议扫描呢，避免地址输错，所以建议用',
        remark_other: '扫描的形式获取提现地址！在哪里扫描？你可以参考上面第1条说明'
    },
    {
        title: '提现地址获取完后进入最后的操作了，就是输入你想提现的个数，点击提交，输入相关密码之后就完成提币'
    }
]

const TutorialBox = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    const closeModal = () => {
        setVisible(false);
        props.resetModal(false);
    };
    const swiper: any = useRef<HTMLDivElement>(null!);
    const [stepIndex, setSetpIndex] = useState<number>(1);
    const [stepList, setStepList] = useState<Step[]>(withdrawStep);
    // const stepList : Step[] = props.type === 1 ? rechargeStep : withdrawStep;
    useEffect(() => {
        setStepList(props.type === 1 ? rechargeStep : withdrawStep);
    }, [props.type])
    useEffect(() => {
        setVisible(props.value);
    },[props.value])
    return (
        <div className='tutorial-box'>
            {visible && <div className='box-inner'>
                <div className='inner-mask' onClick={() => {
                    closeModal();
                }}></div>
                <div className='tutorial-content'>
                    <div className='box-title'>
                        <p></p>
                        <p className=''>
                            {props.type === 1 ? '钱包或交易所充值到我们后台' : '提现到交易所或钱包操作流程'}
                        </p>
                        <p className='close-modal' onClick={() => {
                            closeModal();
                        }}>
                            <span className='iconfont icon-guanbitanchuang'></span>
                        </p>
                    </div>
                    <div className='swiper-parent'>
                        <div className='prev-btn oper-btn' onClick={() => {
                            swiper.current.prev();
                        }}>
                            <p className='iconfont icon-bizhongmingxi'></p>
                        </div>
                        <div className='swiper-mine-box'>
                            <Carousel dots={false} ref={swiper} afterChange={(val: number): void => {
                                setSetpIndex(val + 1)
                            }}>
                                {
                                    stepList.map((item: Step, index: number): ReactElement => {
                                        return (
                                            <div key={index} className={`swiper-inner ${!item.img ? 'without-img' : ''}`}>
                                                <div className='inner-title'>
                                                    <div className='step-title'>
                                                        Step&nbsp;{stepIndex}
                                                    </div>
                                                    <p className='title-text'>{item.title}</p>
                                                </div>
                                                {item.img && <div className={`${item.class_name} img-box`}>
                                                    {item.class_name === 'big-img' ? <Image
                                                        height={330}
                                                        src={item.img}
                                                    /> : <Image
                                                        height={306}
                                                        src={item.img}
                                                    />}
                                                    {
                                                        item.img_other && <div style={{ marginLeft: '50px' }}>
                                                            <Image
                                                                height={306}
                                                                src={item.img_other}
                                                            />
                                                        </div>
                                                    }
                                                    {
                                                        item.remark && <div className='remark-box'>
                                                            <div className='remark-inner inner-public'>
                                                                <p>{item.remark}</p>
                                                            </div>
                                                            {
                                                                item.remark_other && <div className='remark-inner-other inner-public'>
                                                                    <p>{item.remark_other}</p>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </div>}

                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                            <div className='step-total'>
                                <p>{stepIndex}/{stepList.length}</p>
                            </div>
                        </div>
                        <div className='next-btn oper-btn' onClick={() => {
                            swiper.current.next();
                        }}>
                            <p className='iconfont icon-bizhongmingxi'></p>
                        </div>
                    </div>

                </div>
            </div>
            }
        </div>
    )
};

export default TutorialBox;