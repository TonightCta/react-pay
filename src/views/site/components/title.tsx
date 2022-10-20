
import { ReactElement, ReactNode } from 'react';

const InnerTitle = (props:{title:string}) : ReactElement<ReactNode> => {
    return (
        <div className='frame-title'>
            <p className='line-left line-public'></p>
            <p className='text'>{props.title}</p>
            <p className='line-right line-public'></p>
        </div>
    )
};

export default InnerTitle;