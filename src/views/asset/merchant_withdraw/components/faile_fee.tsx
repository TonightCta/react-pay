
import { Button, Modal, Popover } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    value: boolean,
    resetModal: (val: boolean) => void
}

const FaileFee = (props: Props): ReactElement<ReactNode> => {

    const [visible, setVisivle] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setVisivle(props.value)
    }, [props.value])

    const closeModal = (): void => {
        setVisivle(false);
        props.resetModal(false);
    }

    return (
        <div className='faile-fee'>
            <Modal title={null} width={580} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='modal-header-mine'>
                    <p>提币矿工费不足</p>
                    <p className='iconfont icon-guanbitanchuang' onClick={() => {
                        closeModal()
                    }}></p>
                </div>
                <div className='faile-fee-content'>
                    <div className='fee-inner'>
                        <div className='left-title'>
                            <img src={require('../../../../assets/images/fee_icon.png')} alt="" />
                            <div className='title-text'>
                                <p>温馨提示</p>
                                <p>您的矿工费不足</p>
                            </div>
                        </div>
                        <div className='right-content'>
                            <ul>
                                <li>
                                    <p>该商户交易流水笔数</p>
                                    <p>1</p>
                                </li>
                                <li>
                                    <p>单笔矿工费用</p>
                                    <p>10.00000000</p>
                                </li>
                                <li>
                                    <p>
                                        合计需要矿工费
                                        <Popover content='132'>
                                            <span className='iconfont icon-wenhao'></span>
                                        </Popover>
                                    </p>
                                    <p>10&nbsp;TRX</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='modal-footer-mine'>
                    <Button type="primary" onClick={() => {
                        closeModal();
                        navigate('/asset')
                    }} className="cancel-btn">去充值</Button>
                </div>
            </Modal>
        </div>
    )
};

export default FaileFee;