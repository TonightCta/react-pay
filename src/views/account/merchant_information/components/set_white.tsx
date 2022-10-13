
import { Button, Input, message, Modal } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { SetWhiteApi } from '../../../../request/api';
import { useInfo } from '../../../../utils/hooks';

interface Props {
    value: boolean,
    resetModal: (val: boolean) => void,
    now:string,
    reloadIP:() => void
}

const SetWhite = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    const { upUserInfo } = useInfo();
    useEffect(() => {
        setVisible(props.value)
    }, [props.value]);
    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
        setSetInp({
            pass:'',
            ip:''
        })
    };
    //IP信息
    const [setInp,setSetInp] = useState<{pass:string,ip:string}>({
        pass:'',
        ip:''
    });
    useEffect(() => {
        setSetInp({
            ...setInp,
            ip:props.now
        })
    },[props.now])
    const [waitResult,setWaitResult] = useState<boolean>(false);
    return (
        <div className='set-white'>
            <Modal title={null} width={664} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='get-key-content'>
                    <div className='modal-header-mine'>
                        <p>设置白名单地址</p>
                        <p className='iconfont icon-guanbitanchuang' onClick={() => {
                            closeModal()
                        }}></p>
                    </div>
                    <div className='set-white-inner'>
                        <div className='inp-box'>
                            <p className='inner-label'>登录密码<sup>*</sup></p>
                            <Input type="password" value={setInp.pass} onChange={(e) => {
                                setSetInp({
                                    ...setInp,
                                    pass:e.target.value
                                })
                            }} autoComplete='new-password' placeholder='请输入登录密码'/>
                        </div>
                        <div className='inp-box'>
                            <p className='inner-label'>白名单IP<sup>*</sup></p>
                            <Input type="text" value={setInp.ip} onChange={(e) => {
                                setSetInp({
                                    ...setInp,
                                    ip:e.target.value
                                })
                            }} placeholder='请输入IP地址'/>
                        </div>
                    </div>
                    <div className='modal-footer-mine'>
                        <Button type="primary" onClick={() => {
                            closeModal()
                        }} className="cancel-btn">取消</Button>
                        <Button type='primary' loading={waitResult} className='confirm-btn' onClick={ async () => {
                            if(!setInp.pass){
                                message.error('请输入登录密码');
                                return;
                            }
                            if(!setInp.ip){
                                message.error('请输入白名单地址');
                                return;
                            };
                            setWaitResult(true)
                            const result = await SetWhiteApi({
                                password:setInp.pass,
                                ip:setInp.ip
                            });
                            setWaitResult(false)
                            const { code } = result;
                            if(code !== 200){
                                message.error(result.message);
                                return;
                            };
                            message.success('设置成功');
                            upUserInfo();
                            props.reloadIP();
                            closeModal();
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default SetWhite;