
import { ReactElement, ReactNode, useRef, useEffect } from 'react';
import './index.scss'
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'
import axios from 'axios'
import { Spin } from 'antd';
import { useState } from 'react';
import { useContext } from 'react';
import { IBPay } from '../../App';
import { useTranslation } from 'react-i18next';

const DevelopmentIndex = (): ReactElement<ReactNode> => {
    const mdRender = useRef<HTMLDivElement>(null!);
    const { state } = useContext(IBPay);
    const { language } = state;
    const [loading, setLoading] = useState<boolean>(true);
    const [isFixed, setIsFixed] = useState<boolean>(false);
    const handleScroll = () => {
        setIsFixed(window.scrollY > 490 ? true : false)
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
        }
    }, []);
    const { t } = useTranslation();
    const initMD = () => {
        const renderMD = new marked.Renderer();
        marked.setOptions({
            renderer: renderMD,
            gfm: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: (code: string) => {
                return hljs.highlightAuto(code).value;
            }
        });
        axios.get(`/${language}.md`).then(res => {
            const info = marked(res.data);
            mdRender.current.innerHTML = info;
            setLoading(false);
        });
    };
    useEffect(() => {
        initMD()
    }, [language]);
    const slideTo = (_id: string) => {
        const el = document.getElementById(_id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop + 530,
                behavior: "smooth",
            });
        }
    }
    return (
        <div className='development-index'>
            <div className='deve-banner'>
                {/* <img src={require('../../assets/images/site/deve_bg.png')} alt="" /> */}
                <p>
                    {/* 开发者中心 */}
                    {t('development.name')}
                </p>
                <p>
                    {/* 为开发者提供网关接口、SDK下载等一站式接入服务 */}
                    {t('development.name_2')}
                </p>
            </div>
            <div className='doc_box'>
                <div className={`list ${isFixed ? 'fixed-list' : ''}`}>
                    <h2>
                        {/* 目录 */}
                        {t('development.table')}
                    </h2>
                    {language === 'zh_CN' && <div>
                        <a onClick={() => {
                            slideTo('1、生成地址')
                        }}>1、生成地址</a>
                        <a onClick={() => {
                            slideTo('2、提币')
                        }}>2、提币</a>
                        <a onClick={() => {
                            slideTo('3、校验地址')
                        }}>3、校验地址</a>
                        <a onClick={() => {
                            slideTo('4、获取币种列表')
                        }}>4、获取币种列表</a>
                        <a onClick={() => {
                            slideTo('5、回调')
                        }}> 5、回调</a>
                        <a onClick={() => {
                            slideTo('6、商户代付余额')
                        }}> 6、商户代付余额</a>
                        <a onClick={() => {
                            slideTo('附录')
                        }}> 附录</a>
                    </div>}
                    {language === 'zh_TW' && <div>
                        <a onClick={() => {
                            slideTo('1、生成地址')
                        }}>1、生成地址</a>
                        <a onClick={() => {
                            slideTo('2、提幣')
                        }}>2、提幣</a>
                        <a onClick={() => {
                            slideTo('3、校驗地址')
                        }}>3、校驗地址</a>
                        <a onClick={() => {
                            slideTo('4、獲取幣種列表')
                        }}>4、獲取幣種列表</a>
                        <a onClick={() => {
                            slideTo('5、回調')
                        }}> 5、回調</a>
                        <a onClick={() => {
                            slideTo('6、商户代付余额')
                        }}> 6、商户代付余额</a>
                        <a onClick={() => {
                            slideTo('附錄')
                        }}>附錄</a>
                    </div>}
                    {language === 'en' && <div>
                        <a onClick={() => {
                            slideTo('1generated-address')
                        }}>1.Generated address</a>
                        <a onClick={() => {
                            slideTo('2transfer')
                        }}>2.Transfer</a>
                        <a onClick={() => {
                            slideTo('3address-check')
                        }}>3.Address check</a>
                        <a onClick={() => {
                            slideTo('4obtain-currency-list')
                        }}>4.Obtain currency list</a>
                        <a onClick={() => {
                            slideTo('5callback')
                        }}>5.Callback</a>
                        <a onClick={() => {
                            slideTo('6merchant-balance')
                        }}>6.Merchant balance</a>
                        <a onClick={() => {
                            slideTo('appendix')
                        }}>Appendix</a>
                    </div>}
                </div >
                <Spin size='large' spinning={loading}>
                    <div id="doc_html" className={`doc ${isFixed ? 'need-left' : ''}`} ref={mdRender}></div>
                </Spin>
            </div >
        </div >
    )
};

export default DevelopmentIndex;