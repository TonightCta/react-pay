
import { Button, Modal } from 'antd';
import { ReactElement, ReactNode, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBPay } from '../../../App';
import { Type } from '../../../utils/interface';


interface Props {
    value: boolean,
    resetModal: (val: boolean) => void
}

const LoginOut = (props: Props): ReactElement<ReactNode> => {

    const [visible, setVisible] = useState<boolean>(false);
    const { dispatch } = useContext(IBPay)
    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false)
    };
    useEffect(() => {
        setVisible(props.value)
    }, [props.value])
    const navigate = useNavigate();
    return (
        <div className='login-Out'>
            <Modal title={null} width={466} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='login-out-inner'>
                    <div className='modal-header-mine'>
                        <p></p>
                        <p className='iconfont icon-guanbitanchuang' onClick={() => {
                            closeModal()
                        }}></p>
                    </div>
                    <div className='out-inner'>
                        <p>提示</p>
                        <p>您确定要退出登录吗？</p>
                    </div>
                    <div className='modal-footer-mine'>
                        <Button type="primary" onClick={() => {
                            closeModal()
                        }} className="cancel-btn">取消</Button>
                        <Button type='primary' className='confirm-btn' onClick={() => {
                            sessionStorage.clear();
                            dispatch({
                                type:Type.SET_NEW_TOKEN,
                                payload:{
                                    token_new:''
                                }
                            })
                            navigate('/login');
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default LoginOut;