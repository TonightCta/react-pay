
import { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();
    return (
        <div className={`site-nav`}>
            <div className='nav-inner'>
                <img src={require('../../../assets/images/site/logo.png')} alt="" onClick={() => {
                    navigate('/')
                }} />
                <ul>
                    <li>首页</li>
                    <li>功能框架</li>
                    <li>产品优势</li>
                    <li>套餐服务</li>
                    <li>合作伙伴</li>
                    <li onClick={() => {
                        navigate('/development')
                    }}>开发者中心</li>
                </ul>
                <div className='select-language'>
                    <p className='iconfont icon-earth-full'></p>
                    <p className='iconfont icon-xiala'></p>
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
