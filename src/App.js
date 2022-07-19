import React from 'react'
import { Layout } from 'antd';

import HeaderLayout from './components/layouts/HeaderLayout';
import SiderLayout from './components/layouts/SiderLayout';
import Content from './components/layouts/Content';

const App = () => {
  return <>
    <Layout>
      <HeaderLayout />
      <SiderLayout />
      <Layout>
        <Content />
      </Layout>
    </Layout>

  </>
}

export default App