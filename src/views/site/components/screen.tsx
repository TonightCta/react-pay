
import { Button } from 'antd';
import { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const ScreenView = (): ReactElement<ReactNode> => {
    const navigate = useNavigate();
    return (
        <div className='screen-view' id='screen-view'>
            <img className='left-pic' src={require('../../../assets/images/site/screen_1.png')} alt="" />
            <img className='right-pic' src={require('../../../assets/images/site/screen_2.png')} alt="" />
            <div className='screen-inner'>
                <img className='text-img' src={require('../../../assets/images/site/screen_title.png')} alt="" />
                <p className='text-con'>快速集成加密货币支付到您的网站或APP</p>
                <p>
                    <Button type='primary' className='demo-btn' onClick={() => {
                        navigate('/demo')
                    }}>DEMO</Button>
                    <Button type='primary'>
                        联系我们
                        <img src={require('../../../assets/images/site/right_arrow.png')} alt="" />
                    </Button>
                </p>
            </div>
        </div>
    )
};

export default ScreenView;