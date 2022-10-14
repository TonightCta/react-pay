
import { Spin } from 'antd';
import { ReactElement, ReactNode } from 'react';

const LoadingView = () : ReactElement<ReactNode> => {
    return (
        <div className='loading-view'>
            <Spin tip="查询中..." size='large'></Spin>
        </div>
    )
};

export default LoadingView;