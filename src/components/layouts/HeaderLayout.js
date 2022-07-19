import React from 'react'
import { Row, Col, Select } from 'antd'

import { BellFilled } from '@ant-design/icons';
import profileImg from '../../assets/user.png'

const HeaderLayout = () => {

  const handleSelected = () => {
    window.location.reload()
  }

  return <>
    <div className='headerStyle'>
      <Row justify='center' align="middle">
        <Col className="bell">
          <BellFilled style={{ fontSize: 20, color: '#ffff' }} />
          <span className="dot"></span>
        </Col>
        <Col>
          <img src={profileImg}
            style={{
              height: "32px",
              width: "32px",
              borderRadius: "47.5px"
            }}
            alt="profileImg"
          />
        </Col>
        <Col>
          <Select
            defaultValue="Purin"
            style={{
              width: 80,
              color: '#ffff',
              fontSize: 14,
              fontWeight: 400
            }}
            onChange={handleSelected}
            bordered={false}
          >
            <Select.Option value="Logout" >Logout</Select.Option>
          </Select>

        </Col>

      </Row >
    </div>
  </>
}

export default HeaderLayout