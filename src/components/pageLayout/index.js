import { Box } from '@material-ui/core';
import React from 'react';
import Content from '../content';
import Header from '../header';
import Footer from '../footer';

function PageLayout() {
     return (
          <Box style={{ padding: '24px 40px 40px 40px', background: '#dedede' }}>
               <Header />
               <Content />
               <Footer />
          </Box>
     )
}

export default PageLayout;