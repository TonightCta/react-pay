
import { Button, Input, message, Modal } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { EditMerchant } from '../index';
import { UpdateMerchantCoinsApi } from '../../../../request/api'


interface Props {
    value: boolean,
    resetModal: (val: boolean) => void,
    editMerchant: EditMerchant,
    reloadList:() => void
}


const EditConfig = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    const [waitResult,setWaitResult] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.value);
        setEditMsg(props.editMerchant)
    }, [props.value])
    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
    };
    //修改信息
    const [editMsg, setEditMsg] = useState<EditMerchant>(props.editMerchant);
    //提交修改
    const submitEdit = async () => {
        if(!editMsg.work_fee){
            message.error('请输入矿工手续费');
            return
        };
        if(!editMsg.deposit_fee){
            message.error('请输入入金手续费');
            return;
        }
        if(!editMsg.withdraw_fee){
            message.error('请输入出金手续费');
            return;
        };
        if(!editMsg.min){
            message.error('请输入最低提币数量');
            return;
        };
        if(!editMsg.max){
            message.error('请输入最高提币数量');
            return;
        }
        setWaitResult(true);
        const param = {
            coin:editMsg.coin,
            mch_id:editMsg.id,
            deposit_fee:editMsg.deposit_fee,
            withdraw_fee:editMsg.withdraw_fee,
            miner_fee:editMsg.work_fee,
            min_withdraw:editMsg.min,
            max_withdraw:editMsg.max,
            udun_pool_address:editMsg.address
        };
        const result = await UpdateMerchantCoinsApi(param);
        setWaitResult(false);
        const { code } = result;
        if(code !== 200){
            message.error(result.message);
            return;
        };
        message.success('更新商家配置成功');
        props.reloadList();
        closeModal();

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
                                <p className='inner-label'>UDUN归集地址</p>
                                <Input type='text' placeholder='请输入UDUN归集地址' value={editMsg.address} onChange={(e) => {
                                    setEditMsg({
                                        ...editMsg,
                                        address: e.target.value
                                    })
                                }} />
                            </li>
                            <li>
                                <p className='inner-label'>矿工手续费<sup>*</sup></p>
                                <Input type='number' placeholder='请输入矿工手续费' value={editMsg.work_fee} onChange={(e) => {
                                    setEditMsg({
                                        ...editMsg,
                                        work_fee: Number(e.target.value)
                                    })
                                }} />
                            </li>
                            <li>
                                <p className='inner-label'>入金手续费<sup>*</sup></p>
                                <Input type='number' placeholder='请输入入金手续费' value={editMsg.deposit_fee} onChange={(e) => {
                                    setEditMsg({
                                        ...editMsg,
                                        deposit_fee: Number(e.target.value)
                                    })
                                }} />
                            </li>
                            <li>
                                <p className='inner-label'>出金手续费<sup>*</sup></p>
                                <Input type='number' placeholder='请输入出金手续费' value={editMsg.withdraw_fee} onChange={(e) => {
                                    setEditMsg({
                                        ...editMsg,
                                        withdraw_fee: Number(e.target.value)
                                    })
                                }} />
                            </li>
                            <li>
                                <p className='inner-label'>最低提币数量<sup>*</sup></p>
                                <Input type='number' placeholder='请输入最低提币数量' value={editMsg.min} onChange={(e) => {
                                    setEditMsg({
                                        ...editMsg,
                                        min: Number(e.target.value)
                                    })
                                }} />
                            </li>
                            <li>
                                <p className='inner-label'>最大提币数量<sup>*</sup></p>
                                <Input type='number' placeholder='请输入最大提币数量' value={editMsg.max} onChange={(e) => {
                                    setEditMsg({
                                        ...editMsg,
                                        max: Number(e.target.value)
                                    })
                                }} />
                            </li>
                        </ul>
                        {/* <div className='last-inp'>
                            <p className='inner-label'>Udan归集地址<sup>*</sup></p>
                            <Input type='text' placeholder='请输入Udan归集地址' value={editMsg.address} onChange={(e) => {
                                setEditMsg({
                                    ...editMsg,
                                    address: e.target.value
                                })
                            }} />
                        </div> */}
                    </div>
                    <div className='modal-footer-mine'>
                        <Button type="primary" onClick={() => {
                            closeModal()
                        }} className="cancel-btn">取消</Button>
                        <Button loading={waitResult} type='primary' className='confirm-btn' onClick={() => {
                            submitEdit()
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default EditConfig;