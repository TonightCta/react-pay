
import { Button, message } from 'antd';
import copy from 'copy-to-clipboard';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import GetKey from './get_key';
import SetWhite from './set_white';
import { GetNetworkIP,QueryMerchantApi } from '../../../../request/api'


const CompanyMsg = (props:{account:string}): ReactElement<ReactNode> => {
    const [boxModal,setBoxModal] = useState<{key:boolean,white:boolean}>({
        key:false,
        white:false
    });
    // 白名单地址
    const [whiteIP,setWhiteIP] = useState<string>('');
    const [account,setAcount] = useState<{
        name:string,
        email:string,
        mch_id:string
    }>({
        name:'',
        email:'',
        mch_id:''
    });
    const [netIP,setNetIP] = useState<string>(''); 
    useEffect(() => {
        QueryNetIp();
        const account = JSON.parse(props.account || '{}');
        setAcount(account.merchantInfo);
        return () => {
            setNetIP('');
        }
    },[]);
    const QueryNetIp = async (_type?:number) => {
        const info = await QueryMerchantApi({});
        setWhiteIP(info.data.ip_list[0] || '');
        if(_type){
            return
        }
        const result = await GetNetworkIP({});
        const { data } = result;
        setNetIP(data.gatewayList[0].url);
    };
    return (
        <div className='company-msg'>
            <div className='msg-public merchant-msg'>
                <p className='msg-title'>基本资料</p>
                <ul className='table-title'>
                    <li>商家名称</li>
                    <li>联系人</li>
                    <li>联系电话</li>
                    <li>商户邮箱</li>
                </ul>
                <ul>
                    <li>{account.name}</li>
                    <li>{account.email}</li>
                    <li>-</li>
                    <li>{account.email}</li>
                </ul>
            </div>
            <div className='msg-public butt-msg'>
                <p className='msg-title'>
                    对接资料
                    <span>开发文档</span>
                </p>
                <ul className='table-title'>
                    <li>商家ID(merchantId,对接用)</li>
                    <li>网关服务器</li>
                    <li>API KEY</li>
                    <li>白名单</li>
                </ul>
                <ul>
                    <li>
                        <p>{account.mch_id}</p>
                        <p>
                            <Button type='primary' size='small' onClick={() => {
                                copy(account.mch_id);
                                message.success('复制成功');
                            }}>复制</Button>
                        </p>
                    </li>
                    <li>
                        <p>{netIP}</p>
                        <p>
                            <Button type='primary' size='small' onClick={() => {
                                copy(netIP)
                                message.success('复制成功');
                            }}>复制</Button>
                        </p>
                    </li>
                    <li>
                        <p>-</p>
                        <p>
                            <Button type='primary' size='small' onClick={() => {
                                setBoxModal({
                                    ...boxModal,
                                    key:true
                                })
                            }}>点击获取</Button>
                        </p>
                    </li>
                    <li>
                        <p>{whiteIP ? whiteIP : '-'}</p>
                        <p>
                            <Button type='primary' size='small' onClick={() => {
                                setBoxModal({
                                    ...boxModal,
                                    white:true
                                })
                            }}>{whiteIP ? '修改' : '设置'}</Button>
                        </p>
                    </li>
                </ul>
            </div>
            {/* <div className='msg-public auth-msg'>
                <p className='msg-title'>企业认证</p>
                <ul className='table-title'>
                    <li>企业注册国家</li>
                    <li>企业名称</li>
                    <li>营业执照注册号</li>
                    <li>注册日期</li>
                    <li>运营地址</li>
                    <li>营业执照照片</li>
                </ul>
                <ul>
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                </ul>
            </div> */}
            {/* 获取API KEY */}
            <GetKey value={boxModal.key} email={account.email} resetModal={(val:boolean) : void => {
                setBoxModal({
                    ...boxModal,
                    key:val
                })
            }}/>
            {/* 设置白名单地址 */}
            <SetWhite value={boxModal.white} now={whiteIP} reloadIP={() => {
                QueryNetIp(123)
            }} resetModal={(val:boolean) : void => {
                setBoxModal({
                    ...boxModal,
                    white:val
                })
            }}/>
        </div>
    )
};


export default CompanyMsg;