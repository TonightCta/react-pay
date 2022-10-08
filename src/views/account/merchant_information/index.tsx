
import { ReactElement, ReactNode } from 'react';
import CompanyMsg from './components/company_msg';
import GoogleAuth from './components/google_auth';
import './index.scss'

const MerchantInformation = (): ReactElement<ReactNode> => {
    return (
        <div className='merchant-information'>
            {/* 谷歌验证器 */}
            <GoogleAuth/>
            {/* 账号企业信息 */}
            <CompanyMsg/>
        </div>
    )
};

export default MerchantInformation;