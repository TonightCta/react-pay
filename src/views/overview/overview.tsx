
import { ReactElement, ReactNode, useContext } from 'react';
import { IBPay } from '../../App';
const OverviewIndex = () : ReactElement<ReactNode> => {
    const {state,dispatch} = useContext(IBPay);
    // const {state,dispatch} = useContext(IBPay);
    return (
        <div className='overview-index'>
            总览
            <p onClick={() => {
                dispatch({
                    type:'set_test',
                    payload:{
                        test:new Date().getTime()
                    }
                })
            }} style={{cursor:'pointer'}}>test click</p>
        </div>
    )
};

export default OverviewIndex;