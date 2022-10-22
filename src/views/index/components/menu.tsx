
import { ReactElement, ReactNode, useEffect, useRef, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Popover } from 'antd'
import { IBPay } from '../../../App';
import { Type } from '../../../utils/interface';
import EditPassword from './edit_password';
import LoginOut from './login_out';

interface RouteInnder {
    name: string,
    url: string
}

interface RouteMine {
    icon: string,
    url: string,
    name: string,
    popup: boolean,
    children: RouteInnder[]
};

const sourceRoute: RouteMine[] = [
    {
        //概览
        icon: 'icon-gailan',
        url: '/',
        name: '首页',
        popup: false,
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
        popup: false,
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
        popup: false,
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
        popup: false,
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
const Menu = (props: { menuStatus: number }): ReactElement<ReactNode> => {
    //选中效果
    const [active, setActive] = useState<{ levelOne: number, levelTwo: number }>({
        levelOne: 0,
        levelTwo: 0
    });
    const [Route, setRoute] = useState<RouteMine[]>(sourceRoute);
    //编辑密码操作
    const [editPassBox, setEditPassBox] = useState<{ visible: boolean, type: number }>({
        visible: false,
        type: 1
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
        }, 100)
    }, [location]);

    const [visible, setVisible] = useState<boolean>(false);
    //工具栏路由信息
    const [toolRoute, setToolRoute] = useState<string>('首页');
    const { state, dispatch } = useContext(IBPay);
    const setLovelOne = (e: any, item: RouteMine, index: number, url?: string) => {
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
        setLevelTwoMenu(item.children);
        levelTwoDOM.current.style.top = `${e.target.getBoundingClientRect().top}px`
        levelTwoDOM.current.style.opacity = 1;
        if (!url) {
            setActive({
                ...active,
                levelOne: index
            });
            navigate(item.url);
        }
    }
    //账户操作
    const PopverContent = (): ReactElement => {
        return (
            <div className={`popver-content ${props.menuStatus === 0 ? 'with-bg' : ''}`}>
                <ul>
                    <li onClick={() => {
                        setEditPassBox({
                            visible: true,
                            type: 1
                        })
                    }}>
                        <p>修改登录密码</p>
                    </li>
                    <li onClick={() => {
                        setEditPassBox({
                            visible: true,
                            type: 2
                        })
                    }}>
                        <p>修改交易密码</p>
                    </li>
                    <li onClick={() => {
                        setVisible(true)
                    }}>
                        <p>
                            <span className='iconfont icon-tuichu'></span>
                            退出
                        </p>
                    </li>
                </ul>
            </div>
        )
    };
    const updatePopup = (_val: boolean, _index: number) => {
        const route: RouteMine[] = sourceRoute;
        route[_index].popup = _val;
        setRoute([...route]);
    };
    useEffect(() => {
        const { account } = state;
        if (!JSON.parse(account || '{}')?.merchantInfo?.is_admin) {
            const route: RouteMine[] = sourceRoute;
            route[route.length - 1].children = [{
                name: '商家信息',
                url: '/account/merchant-information'
            }];
            setRoute([...route]);
        }
    }, [])
    //提示菜单
    const MenuPopver = (props: { _index: number }): ReactElement => {
        return (
            <div className='popver-content with-bg'>
                <ul>
                    {
                        levelTwoMenu.map((item: RouteInnder, index: number): ReactElement => {
                            return (
                                <li key={index} className={`${active.levelTwo === index && 'active-menu-two'}`} onClick={() => {
                                    setActive({
                                        levelOne: props._index,
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
                                    });
                                    navigate(item.url);
                                    updatePopup(false, props._index)
                                }}>
                                    <p>{item.name}</p>
                                    <div className='active-mask'></div>
                                </li>
                            )
                        })
                    }
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
                                    <div key={index}>
                                        {
                                            props.menuStatus === 1
                                                ? <li title={item.name} key={index} className={`${active.levelOne === index && 'active-menu-one'}`} onClick={(e: any) => {
                                                    setLovelOne(e, item, index)
                                                }}>
                                                    <p className={`iconfont ${item.icon}`}></p>
                                                </li>
                                                : <Popover open={item.popup} key={index} onOpenChange={(val: boolean) => { updatePopup(val, index) }} className='test-prop' placement='right' content={<MenuPopver _index={index} />} trigger="click">
                                                    <li title={item.name} key={index} className={`${active.levelOne === index && 'active-menu-one'}`} onClick={(e: any) => {
                                                        setLovelOne(e, item, index, 'test');
                                                    }}>
                                                        <p className={`iconfont ${item.icon}`}></p>
                                                    </li>
                                                </Popover>
                                        }
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='bottom-content content-public'>
                    <ul>
                        <li onClick={() => {
                            window.open('http://www.hlwzc.com/#/development');
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
            {/* 编辑密码 */}
            <EditPassword value={editPassBox.visible} type={editPassBox.type} resetClose={(val: boolean): void => {
                setEditPassBox({
                    ...editPassBox,
                    visible: val
                })
            }} />
            {/* 退出登录 */}
            <LoginOut value={visible} resetModal={(val: boolean) => {
                setVisible(val)
            }} />
        </div>
    )
};

export default Menu;