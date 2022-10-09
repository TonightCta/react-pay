
import { Button, Input, Modal } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';

interface Props {
    value: boolean,
    resetModal: (val: boolean) => void
}

const SetWhite = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.value)
    }, [props.value]);
    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
    }
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
                            <Input type="password" autoComplete='new-password' placeholder='请输入登录密码'/>
                        </div>
                        <div className='inp-box'>
                            <p className='inner-label'>白名单IP<sup>*</sup></p>
                            <Input type="text" placeholder='请输入IP地址'/>
                        </div>
                    </div>
                    <div className='modal-footer-mine'>
                        <Button type="primary" onClick={() => {
                            closeModal()
                        }} className="cancel-btn">取消</Button>
                        <Button type='primary' className='confirm-btn'>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default SetWhite;