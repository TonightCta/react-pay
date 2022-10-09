
import { Button, Input, Modal } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';


interface Props {
    value: boolean,
    resetModal: (val: boolean) => void
}


const EditConfig = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.value)
    }, [props.value])
    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
    }
    return (
        <div className='edit-config'>
            <Modal title={null} width={718} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='edit-config-content'>
                    <div className='modal-header-mine'>
                        <p>修改配置</p>
                        <p className='iconfont icon-guanbitanchuang' onClick={() => {
                            closeModal()
                        }}></p>
                    </div>
                    <div className='edit-inp'>
                        <ul>
                            <li>
                                <p className='inner-label'>商户名称<sup>*</sup></p>
                                <Input type='text' placeholder='请输入商户名称' />
                            </li>
                            <li>
                                <p className='inner-label'>矿工手续费<sup>*</sup></p>
                                <Input type='number' placeholder='请输入矿工手续费' />
                            </li>
                            <li>
                                <p className='inner-label'>入金手续费<sup>*</sup></p>
                                <Input type='number' placeholder='请输入入金手续费' />
                            </li>
                            <li>
                                <p className='inner-label'>出金手续费<sup>*</sup></p>
                                <Input type='number' placeholder='请输入出金手续费' />
                            </li>
                            <li>
                                <p className='inner-label'>最低提币数量<sup>*</sup></p>
                                <Input type='number' placeholder='请输入最低提币数量' />
                            </li>
                            <li>
                                <p className='inner-label'>最大提币数量<sup>*</sup></p>
                                <Input type='number' placeholder='请输入最大提币数量' />
                            </li>
                        </ul>
                        <div className='last-inp'>
                            <p className='inner-label'>Udan归集地址<sup>*</sup></p>
                            <Input type='text' placeholder='请输入Udan归集地址' />
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

export default EditConfig;