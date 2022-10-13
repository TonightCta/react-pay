
import { ReactElement, ReactNode, useContext } from 'react';
import CompanyMsg from './components/company_msg';
import GoogleAuth from './components/google_auth';
import './index.scss'
import { IBPay } from '../../../App';

const MerchantInformation = (): ReactElement<ReactNode> => {
    const { state } = useContext(IBPay);
    return (
        <div className='merchant-information'>
            {/* 谷歌验证器 */}
            {JSON.parse(state.account || '{}')?.merchantInfo.ga === 0 && <GoogleAuth/>}
            {/* 账号企业信息 */}
            <CompanyMsg account={state.account as string}/>
        </div>
    )
};

export default MerchantInformation;