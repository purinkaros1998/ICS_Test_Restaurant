import React from 'react'
import { Button } from 'antd';
import logoIcs from '../../assets/ICS-Icon.png'
import { ProfileOutlined } from '@ant-design/icons';

const SiderLayout = () => {
    return <>
        <div className='container-sider-style'>
            <div style={{ padding: "25px 20px 20px 17px", borderBottom: "1px solid #E5E5E5" }}><img src={logoIcs} alt="ics-icon" style={{ width: 53 }} /></div>
            <div style={{ padding: "25px 20px 20px 17px", borderBottom: "1px solid #E5E5E5", display: 'flex', justifyContent: 'center' }}><Button type='primary' style={{ borderRadius: 10, backgroundColor: "#0F1E56", border: 0 }} icon={<ProfileOutlined />} /></div>
        </div>
    </>
}

export default SiderLayout