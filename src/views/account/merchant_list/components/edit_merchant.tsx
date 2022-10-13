
import { Button, Input, Modal, message } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { EditMsg, editSource } from '..';
import { EditMerchantApi } from '../../../../request/api'

interface Props {
    value: boolean,
    resetModal: (val: boolean) => void,
    reloadList: () => void,
    editMsg: EditMsg
}

const EditMerchantBox = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    const [edit, setEdit] = useState<EditMsg>(editSource);
    const [waitReuslt, setWaitResult] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.value);
        setEdit({
            mch_id:props.editMsg.mch_id,
            name: props.editMsg.name,
            email: props.editMsg.email
        })
    }, [props.value])
    const closeModal = () => {
        setVisible(false);
        props.resetModal(false);
        setEdit(editSource);
    };
    //提交编辑
    const submitEdit = async () => {
        if (!edit.email) {
            message.error('请输入邮箱地址');
            return
        }
        if (!edit.name) {
            message.error('请输入商户名称');
            return
        };
        setWaitResult(true)
        const result = await EditMerchantApi({
            mch_id: edit.mch_id, 
            name: edit.name,
            email: edit.email
        });
        const { code } = result;
        if(code !== 200){
            message.error(result.message);
            return;
        };
        message.success('修改成功');
        props.reloadList();
        closeModal();
        setWaitResult(false)
    }
    return (
        <div className='edit-merchant-box'>
            <Modal title={null} width={664} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='modal-header-mine'>
                    <p>编辑商户</p>
                    <p className='iconfont icon-guanbitanchuang' onClick={() => {
                        closeModal()
                    }}></p>
                </div>
                <div className='edit-merchant-2'>
                    <div className='edit-inp'>
                        <p className='inner-label'>邮箱<sup>*</sup></p>
                        <Input placeholder='请输入邮箱地址' value={edit.email} onChange={(e) => {
                            setEdit({
                                ...edit,
                                email: e.target.value
                            })
                        }} type='text' />
                    </div>
                    <div className='edit-inp'>
                        <p className='inner-label'>商户名称<sup>*</sup></p>
                        <Input placeholder='请输入商户名称' value={edit.name} onChange={(e) => {
                            setEdit({
                                ...edit,
                                name: e.target.value
                            })
                        }} type='text' />
                    </div>
                </div>
                <div className='modal-footer-mine'>
                    <Button type="primary" onClick={() => {
                        closeModal()
                    }} className="cancel-btn">取消</Button>
                    <Button type='primary' loading={waitReuslt} className='confirm-btn' onClick={() => {
                        submitEdit()
                    }}>确定</Button>
                </div>
            </Modal>
        </div>
    )
};

export default EditMerchantBox;