
import { ReactElement, ReactNode, useEffect, useRef, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Popover } from 'antd'
import { IBPay } from '../../../App';
import { Type } from '../../../utils/interface';

interface RouteInnder {
    name: string,
    url: string
}

interface RouteMine {
    icon: string,
    url: string,
    name: string,
    children: RouteInnder[]
};

const Route: RouteMine[] = [
    {
        //概览
        icon: 'icon-gailan',
        url: '/',
        name: '首页',
        children: [
            {
                name: '概览',
                url: '/'
            }
        ]
    },
    {
        //订单
        icon: 'icon-dingdanguanli',
        url: '/order',
        name: '订单管理',
        children: [
            {
                name: '用户充币订单',
                url: '/order'
            },
            {
                name: '用户提币订单',
                url: '/order/user-withdraw-list'
            },
            {
                name: '商家充币订单',
                url: '/order/merchant-deposit-list'
            },
            {
                name: '商家提币订单',
                url: '/order/merchant-withdraw-list'
            }
        ]
    },
    {
        //资产
        icon: 'icon-a-gongzuotai3',
        url: '/asset',
        name: '资金管理',
        children: [
            {
                name: '商家充币',
                url: '/asset'
            },
            {
                name: '商家提币',
                url: '/asset/merchan-withdraw'
            },
            {
                name: '地址管理',
                url: '/asset/addresses-list'
            },
        ]
    },
    {
        //账户
        icon: 'icon-gongzuotai',
        url: '/account',
        name: '账户管理',
        children: [
            {
                name: '商家列表',
                url: '/account'
            },
            {
                name: '商家配置',
                url: '/account/merchant-config'
            },
            {
                name: '商家信息',
                url: '/account/merchant-information'
            }
        ]
    }
]
const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);
const Menu = (): ReactElement<ReactNode> => {
    //选中效果
    const [active, setActive] = useState<{ levelOne: number, levelTwo: number }>({
        levelOne: 0,
        levelTwo: 0
    });
    //二级菜单
    const [levelTwoMenu, setLevelTwoMenu] = useState<RouteInnder[]>(Route[0].children)
    const navigate = useNavigate();
    const levelTwoDOM: any = useRef();
    const location = useLocation();
    const setDetaultTop = () => {
        const DOM: any = document.getElementsByClassName('active-menu-one');
        const e = {
            target: DOM[0]
        };
        levelTwoDOM.current.style.top = `${e.target.getBoundingClientRect().top}px`;
        levelTwoDOM.current.style.opacity = 1;
    };
    useEffect(() => {
        //保留选中菜单
        switch (location.pathname) {
            case '/':
                setActive({
                    levelOne: 0,
                    levelTwo: 0,
                });
                setLevelTwoMenu(Route[0].children);
                break;
            case '/order':
                setActive({
                    ...active,
                    levelOne: 1
                });
                setLevelTwoMenu(Route[1].children);
                break;
            case '/order/user-withdraw-list':
                setActive({
                    levelOne: 1,
                    levelTwo: 1
                });
                setLevelTwoMenu(Route[1].children);
                break;
            case '/order/merchant-deposit-list':
                setActive({
                    levelOne: 1,
                    levelTwo: 2
                });
                setLevelTwoMenu(Route[1].children);
                break;
            case '/order/merchant-withdraw-list':
                setActive({
                    levelOne: 1,
                    levelTwo: 3
                });
                setLevelTwoMenu(Route[1].children);
                break;
            case '/asset':
                setActive({
                    levelOne: 2,
                    levelTwo: 0,
                });
                setLevelTwoMenu(Route[2].children);
                break;
            case '/asset/merchan-withdraw':
                setActive({
                    levelOne: 2,
                    levelTwo: 1,
                });
                setLevelTwoMenu(Route[2].children);
                break;
            case '/asset/addresses-list':
                setActive({
                    levelOne: 2,
                    levelTwo: 2,
                });
                setLevelTwoMenu(Route[2].children);
                break;
            case '/account':
                setActive({
                    levelOne: 3,
                    levelTwo: 0
                });
                setLevelTwoMenu(Route[3].children);
                break;
            case '/account/merchant-config':
                setActive({
                    levelOne: 3,
                    levelTwo: 1
                });
                setLevelTwoMenu(Route[3].children);
                break;
            case '/account/merchant-information':
                setActive({
                    levelOne: 3,
                    levelTwo: 2
                });
                setLevelTwoMenu(Route[3].children);
                break;
        };
        setTimeout(() => {
            setDetaultTop();
        })
    }, [location]);
    //工具栏路由信息
    const [toolRoute, setToolRoute] = useState<string>('首页');
    const { dispatch } = useContext(IBPay);
    //账户操作
    const PopverContent = (): ReactElement => {
        return (
            <div className='popver-content'>
                <ul>
                    <li>
                        <p>修改登录密码</p>
                    </li>
                    <li>
                        <p>修改交易密码</p>
                    </li>
                    <li>
                        <p>
                            <span className='iconfont icon-tuichu'></span>
                            退出
                        </p>
                    </li>
                </ul>
            </div>
        )
    }
    return (
        <div className='menu-inner'>
            <div className='level-one-menu'>
                <div className='top-content content-public'>
                    <img src={require('../../../assets/images/menu_icon.png')} alt="" />
                    <ul>
                        {
                            Route.map((item: RouteMine, index: number): ReactElement => {
                                return (
                                    <li key={index} className={`${active.levelOne === index && 'active-menu-one'}`} onClick={(e: any) => {
                                        setActive({
                                            ...active,
                                            levelOne: index
                                        });
                                        setToolRoute(item.name);
                                        const msg = {
                                            level_one: item.name,
                                            level_two: item.children[0].name
                                        };
                                        dispatch({
                                            type: Type.SET_ROUTE_NAME,
                                            payload: {
                                                routeMsg: JSON.stringify(msg)
                                            }
                                        })
                                        setLevelTwoMenu(item.children)
                                        navigate(item.url);
                                        levelTwoDOM.current.style.top = `${e.target.getBoundingClientRect().top}px`
                                        levelTwoDOM.current.style.opacity = 1;
                                    }}>
                                        <p className={`iconfont ${item.icon}`}></p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='bottom-content content-public'>
                    <ul>
                        <li onClick={() => {
                            window.open('https://ib.cc/#/Doc?lang=zh-CN');
                        }}>

                            <p className='iconfont icon-a-fuzhi-23'></p>
                        </li>
                        <Popover placement="right" content={<PopverContent />} trigger="hover">
                            <li>
                                <p className='iconfont icon-a-fuzhi-22'></p>
                            </li>
                        </Popover>
                    </ul>
                </div>
            </div>
            <div className='level-two-menu'>
                <img src={require('../../../assets/images/logo.png')} alt="" />
                <ul ref={levelTwoDOM}>
                    {
                        levelTwoMenu.map((item: RouteInnder, index: number): ReactElement => {
                            return (
                                <li key={index} className={`${active.levelTwo === index && 'active-menu-two'}`} onClick={() => {
                                    setActive({
                                        ...active,
                                        levelTwo: index
                                    });
                                    const msg = {
                                        level_one: toolRoute,
                                        level_two: item.name
                                    }
                                    dispatch({
                                        type: Type.SET_ROUTE_NAME,
                                        payload: {
                                            routeMsg: JSON.stringify(msg)
                                        }
                                    })
                                    navigate(item.url)
                                }}>
                                    <p>{item.name}</p>
                                    <div className='active-mask'></div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

export default Menu;