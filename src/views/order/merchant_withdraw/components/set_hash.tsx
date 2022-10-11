
import { Button, Input, message, Modal } from 'antd';
import { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { SetHashApi } from '../../../../request/api';

interface Props {
    value: boolean,
    id:number,
    hash:string,
    resetModal: (val: boolean) => void,
    reloadList:() => void
}

const SetHash = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    const [hash,setHash] = useState<string>('');
    const closeModal = () => {
        setHash('');
        setVisible(false);
        props.resetModal(false)
    };
    const [ waitResult,setWaitResult ] = useState<boolean>(false);
    useEffect(() => {
        setVisible(props.value)
    },[props.value])
    return (
        <div className='set-hash'>
            <Modal title={null} width={600} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='modal-header-mine'>
                    <p>填写交易HASH</p>
                    <p className='iconfont icon-guanbitanchuang' onClick={() => {
                        closeModal()
                    }}></p>
                </div>
                <div className='set-hash-content'>
                    <div className='inp-box'>
                        <p className='inner-label'>交易HASH<sup>*</sup></p>
                        <Input type='text' value={hash} onChange={(e) => {
                            setHash(e.target.value);
                        }} placeholder='请输入交易HASH'/>
                    </div>
                </div>
                <div className='modal-footer-mine'>
                    <Button type="primary" onClick={() => {
                        closeModal()
                    }} className="cancel-btn">取消</Button>
                    <Button loading={waitResult} type='primary' className='confirm-btn' onClick={async () => {
                        if(!hash){
                            message.error('请输入交易HASH');
                            return;
                        }
                        setWaitResult(true)
                        const result = await SetHashApi({
                            withdraw_id:props.id,
                            txid:hash
                        });
                        const  { code } = result;
                        setWaitResult(false)
                        if(code !== 200){
                            message.error(result.message);
                            return;
                        };
                        message.success('填写交易HASH成功');
                        props.reloadList();
                        closeModal()
                    }}>确定</Button>
                </div>
            </Modal>
        </div>
    )
};


export default SetHash;