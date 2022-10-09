
import { Button, Input, Modal, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';

interface Props {
    value: boolean,
    resetModal: (val: boolean) => void,
    type: number
}

const AddMerchant = (props: Props): ReactElement<ReactNode> => {

    const [visible, setVisible] = useState<boolean>(false);

    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
    }

    useEffect(() => {
        setVisible(props.value)
    }, [props.value])
    const [value1, setValue1] = useState('Apple');
    const options = [
        { label: '内部 (自有服务）', value: 'Apple' },
        { label: '外部 (UDUN服务）', value: 'Pear' },
    ];
    const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };

    const [showPass,setShowPass] = useState<{login:string,trade:string}>({
        login:'password',
        trade:'password'
    })
    return (
        <div className='add-merchant'>
            <Modal title={null} width={664} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='add-merchant-content'>
                    <div className='modal-header-mine'>
                        <p>{props.type === 1 ? '新增' : '编辑'}商户</p>
                        <p className='iconfont icon-guanbitanchuang' onClick={() => {
                            closeModal()
                        }}></p>
                    </div>
                    <div className='add-inp'>
                        <ul>
                            <li>
                                <p className='inner-label'>邮箱<sup>*</sup></p>
                                <Input type='text' placeholder='请输入邮箱地址' />
                            </li>
                            <li>
                                <p className='inner-label'>登录密码<sup>*</sup></p>
                                <Input type={showPass.login} autoComplete='new-password' placeholder='请输入登录密码' />
                                <p className={`iconfont oper-type ${showPass.login === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                    setShowPass({
                                        ...showPass,
                                        login:showPass.login === 'password' ? 'text' : 'password'
                                    })
                                }}></p>
                            </li>
                            <li>
                                <p className='inner-label'>商户名称<sup>*</sup></p>
                                <Input type='text' placeholder='请输入商户名称' />
                            </li>
                            <li>
                                <p className='inner-label'>交易密码<sup>*</sup></p>
                                <Input type={showPass.trade} autoComplete="new-password" placeholder='请输入交易密码' />
                                <p className={`iconfont oper-type ${showPass.trade === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                    setShowPass({
                                        ...showPass,
                                        trade:showPass.trade === 'password' ? 'text' : 'password'
                                    })
                                }}></p>
                            </li>
                        </ul>
                        <div className='select-wallet'>
                            <p className='inner-label'>选择类型<sup>*</sup></p>
                            <div className='select-radio'>
                                <Radio.Group options={options} size="small" onChange={onChange1} value={value1} />
                            </div>
                        </div>
                        <div className='select-wallet enter-address'>
                            <p className='inner-label'>归集地址<sup>*</sup></p>
                            <Input type='text' placeholder='请输入归集地址'/>
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

export default AddMerchant;