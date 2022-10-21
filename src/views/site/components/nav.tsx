
import { Popover } from 'antd';
import { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { IBPay } from '../../../App';
import i18n from "../../../lang";
import { Type } from '../../../utils/interface';


interface Language {
    title: string,
    key: string,
    icon: string
}

const SiteNav = (): ReactElement<ReactNode> => {
    // const [navBg,setNavBg] = useState<string>('');
    // const handleScroll = (e:Event) => {
    //     /* @ts-ignore */
    //     const scrollTop : number = e.target ? e.target.documentElement.scrollTop : 0;
    //     if(scrollTop >= 130){
    //         setNavBg('with-bg')
    //     }else if(scrollTop < 130 && !navBg){
    //         setNavBg('')
    //     }
    // }
    // useEffect(() => {
    // window.addEventListener('scroll',handleScroll,true)
    // },[])
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { state, dispatch } = useContext(IBPay);
    const { language } = state;
    const slideTo = async (_id: string) => {
        const setRoute = async () => {
            navigate('/');
        };
        location.pathname !== '/' && await setRoute();
        const el = document.getElementById(_id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 20,
                behavior: "smooth",
            });
        }
    };
    //切换语言
    const setLanguage = (_key:string) => {
        dispatch({
            type: Type.SET_LANGUAGE,
            payload: {
                language: _key
            }
        });
        i18n.changeLanguage(_key);
    }
    const LanguageSelect = (): ReactElement => {
        const langauges: Language[] = [
            {
                title: '简体中文',
                key: 'zh_CN',
                icon: require('../../../assets/images/zh.png')
            },
            {
                title: '繁體中文',
                key: 'zh_TW',
                icon: require('../../../assets/images/zh.png')
            },
            {
                title: 'English',
                key: 'en',
                icon: require('../../../assets/images/en.png')
            },
        ]
        return (
            <div className='select-language-popver'>
                <ul>
                    {
                        langauges.map((item: Language, index: number): ReactElement => {
                            return (
                                <li key={index} onClick={() => {
                                    setLanguage(item.key)
                                }}>
                                    <img src={item.icon} alt="" />
                                    <p>{item.title}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    return (
        <div className={`site-nav ${language === 'en' ? 'en-nav' : ''}`}>
            <div className='nav-inner'>
                <img src={require('../../../assets/images/site/logo.png')} alt="" onClick={() => {
                    navigate('/')
                }} />
                <ul>
                    <li onClick={() => { slideTo('screen-view') }}>
                        {/* 首页 */}
                        <p>{t('public.home')}</p>
                    </li>
                    <li onClick={() => { slideTo('frame-view') }}>
                        <p>功能框架</p>
                    </li>
                    <li onClick={() => { slideTo('adv-view') }}>
                        <p>产品优势</p>
                    </li>
                    <li onClick={() => { slideTo('package-view') }}>
                        <p>套餐服务</p>
                    </li>
                    <li onClick={() => { slideTo('team-view') }}>
                        <p>合作伙伴</p>
                    </li>
                    <li onClick={() => {
                        navigate('/development')
                    }}>
                        <p>开发者中心</p>
                    </li>
                </ul>
                <div className='select-language'>
                    <Popover content={<LanguageSelect />} placement='bottom' arrowPointAtCenter>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p className='iconfont icon-earth-full'></p>
                            <p className='iconfont icon-xiala'></p>
                        </div>
                    </Popover>
                </div>
                <div className='login-box'>
                    <p className='iconfont icon-a-earth-full1'></p>
                    <p>登录</p>
                </div>
            </div>
        </div>
    )
};

export default SiteNav;
