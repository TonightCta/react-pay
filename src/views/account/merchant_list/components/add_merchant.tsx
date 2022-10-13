
import { Button, Input, Modal, Radio, message } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { AddMerchantApi } from '../../../../request/api'

interface Props {
    value: boolean,
    resetModal: (val: boolean) => void,
    type: number,
    reloadList: () => void
}

interface Edit {
    email: string,
    pass: string,
    trade: string,
    name: string,
    type: number,
    address: string
};
const source : Edit = {
    email: '',
    pass: '',
    trade: '',
    name: '',
    type: 1,
    address: ''
}

const AddMerchant = (props: Props): ReactElement<ReactNode> => {

    const [visible, setVisible] = useState<boolean>(false);

    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
        setEdit(source);
    }

    useEffect(() => {
        setVisible(props.value)
    }, [props.value])
    const [value1, setValue1] = useState('1');
    const options = [
        { label: '内部 (自有服务）', value: '1' },
        { label: '外部 (UDUN服务）', value: '2' },
    ];
    const [waitReuslt,setWaitResult] = useState<boolean>(false);
    const selectWallet = ({ target: { value } }: RadioChangeEvent) => {
        setValue1(value);
    };
    const submitAdd = async () => {
        if (!edit.email) {
            message.error('请输入邮箱地址');
            return
        };
        if (!edit.pass) {
            message.error('请输入登录密码');
            return;
        };
        if (!edit.name) {
            message.error('请输入商户名称');
            return
        }
        if (!edit.trade) {
            message.error('请输入交易密码');
            return;
        }
        if (!edit.address) {
            message.error('请输入归集地址');
            return;
        };
        setWaitResult(true);
        const result = await AddMerchantApi({
            email: edit.email,
            password: edit.pass,
            pay_password: edit.trade,
            onlyTrx: edit.type,
            trx_pool_address: edit.address,
            name: edit.name,
        });
        setWaitResult(false);
        const { code } = result;
        if(code !== 200){
            message.error(result.message);
            return;
        };
        message.success('新增商户成功');
        props.reloadList();
        closeModal();
    };
    const [edit, setEdit] = useState<Edit>(source);
    const [showPass, setShowPass] = useState<{ login: string, trade: string }>({
        login: 'password',
        trade: 'password'
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
                                <Input type='text' value={edit.email} onChange={(e) => {
                                    setEdit({
                                        ...edit,
                                        email: e.target.value
                                    })
                                }} placeholder='请输入邮箱地址' />
                            </li>
                            <li>
                                <p className='inner-label'>登录密码<sup>*</sup></p>
                                <Input type={showPass.login} value={edit.pass} onChange={(e) => {
                                    setEdit({
                                        ...edit,
                                        pass: e.target.value
                                    })
                                }} autoComplete='new-password' placeholder='请输入登录密码' />
                                <p className={`iconfont oper-type ${showPass.login === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                    setShowPass({
                                        ...showPass,
                                        login: showPass.login === 'password' ? 'text' : 'password'
                                    })
                                }}></p>
                            </li>
                            <li>
                                <p className='inner-label'>商户名称<sup>*</sup></p>
                                <Input type='text' value={edit.name} onChange={(e) => {
                                    setEdit({
                                        ...edit,
                                        name: e.target.value
                                    })
                                }} placeholder='请输入商户名称' />
                            </li>
                            <li>
                                <p className='inner-label'>交易密码<sup>*</sup></p>
                                <Input type={showPass.trade} value={edit.trade} onChange={(e) => {
                                    setEdit({
                                        ...edit,
                                        trade: e.target.value
                                    })
                                }} autoComplete="new-password" placeholder='请输入交易密码' />
                                <p className={`iconfont oper-type ${showPass.trade === 'password' ? 'icon-zhengyan' : 'icon-biyan'}`} onClick={() => {
                                    setShowPass({
                                        ...showPass,
                                        trade: showPass.trade === 'password' ? 'text' : 'password'
                                    })
                                }}></p>
                            </li>
                        </ul>
                        <div className='select-wallet'>
                            <p className='inner-label'>选择类型<sup>*</sup></p>
                            <div className='select-radio'>
                                <Radio.Group options={options} size="small" onChange={selectWallet} value={value1} />
                            </div>
                        </div>
                        <div className='select-wallet enter-address'>
                            <p className='inner-label'>归集地址<sup>*</sup></p>
                            <Input type='text' value={edit.address} onChange={(e) => {
                                setEdit({
                                    ...edit,
                                    address: e.target.value
                                })
                            }} placeholder='请输入归集地址' />
                        </div>
                    </div>
                    <div className='modal-footer-mine'>
                        <Button type="primary" onClick={() => {
                            closeModal()
                        }} className="cancel-btn">取消</Button>
                        <Button type='primary' loading={waitReuslt} className='confirm-btn' onClick={() => {
                            submitAdd()
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default AddMerchant;