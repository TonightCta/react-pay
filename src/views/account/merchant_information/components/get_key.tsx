
import { Button, Input, Modal, message } from 'antd';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import copy from 'copy-to-clipboard'
import { QueryKeyApi } from '../../../../request/api';

interface Props {
    value: boolean,
    resetModal: (val: boolean) => void,
    email: string
}

const GetKey = (props: Props): ReactElement<ReactNode> => {
    const [visible, setVisible] = useState<boolean>(false);
    const [resultBox, setResultBox] = useState<boolean>(false);
    //API KEY
    const [apiKey, setApiKey] = useState<string>('');
    const [waitResult, setWaitResult] = useState<boolean>(false);
    //登录密码
    const [pass, setPass] = useState<string>('');
    useEffect(() => {
        setVisible(props.value)
    }, [props.value]);
    const closeModal = (): void => {
        setVisible(false);
        props.resetModal(false);
        setPass('');
    }
    return (
        <div className='get-api-key'>
            <Modal title={null} width={664} open={visible} onCancel={() => {
                closeModal()
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='get-key-content'>
                    <div className='modal-header-mine'>
                        <p>获取API&nbsp;KEY</p>
                        <p className='iconfont icon-guanbitanchuang' onClick={() => {
                            closeModal()
                        }}></p>
                    </div>
                    <div className='get-key-inner'>
                        <div className='inp-box'>
                            <p className='inner-label'>商户邮箱<sup>*</sup></p>
                            <Input type='text' value={props.email} onChange={() => { }} placeholder='请输入商户邮箱' disabled />
                        </div>
                        <div className='inp-box'>
                            <p className='inner-label'>登录密码<sup>*</sup></p>
                            <Input type='password' value={pass} onChange={(e) => {
                                setPass(e.target.value);
                            }} placeholder='请输入登录密码' />
                        </div>
                    </div>
                    <div className='modal-footer-mine'>
                        <Button type="primary" onClick={() => {
                            closeModal()
                        }} className="cancel-btn">取消</Button>
                        <Button loading={waitResult} type='primary' className='confirm-btn' onClick={async () => {
                            if (!pass) {
                                message.error('请输入登录密码');
                                return
                            };
                            setWaitResult(true);
                            const result = await QueryKeyApi({
                                password: pass
                            });
                            const { data, code } = result;
                            setWaitResult(false);
                            if (code !== 200) {
                                message.error(result.message);
                                return;
                            };
                            setApiKey(data.apiKey);
                            closeModal()
                            setResultBox(true);
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
            {/* 获取结果 */}
            <Modal title={null} width={556} open={resultBox} onCancel={() => {
                setResultBox(false)
                setApiKey('')
            }} closable={false} destroyOnClose={true} footer={null}>
                <div className='get-key-result'>
                    <div className='modal-header-mine'>
                        <p></p>
                        <p className='iconfont icon-guanbitanchuang' onClick={() => {
                            setResultBox(false);
                            setApiKey('')
                        }}></p>
                    </div>
                    <div className='key-result-inner'>
                        <img src={require('../../../../assets/images/done.png')} alt="" />
                        <p className='success-text'>验证成功</p>
                        <p className='success-remark'>关闭后需重新获取，请及时保存！</p>
                        <p className='result-text'>{apiKey}</p>
                        <p className='oper-btn'>
                            <Button type='primary' size='small' onClick={() => {
                                copy(apiKey);
                                message.success('复制成功')
                            }}>
                                <span className='iconfont icon-a-fuzhi2'></span>
                                复制
                            </Button>
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default GetKey;