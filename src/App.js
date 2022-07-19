import React from 'react'
import { Layout } from 'antd';

import HeaderLayout from './components/layouts/HeaderLayout';
import SiderLayout from './components/layouts/SiderLayout';
import Content from './components/layouts/Content';

const App = () => {
  return <>
    <div className="wrapper">
      <Layout>
        <HeaderLayout />
        <Layout>
          <SiderLayout />
          <Content />
        </Layout>
      </Layout>
    </div>
  </>
}

export default App