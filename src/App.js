import React, { Component } from 'react';
import './App.css';
import { Layout, Drawer, Header, Navigation, Content } from 'react-mdl';
import Feed from './components/feed/Feed';
import Main from './components/main';
class App extends Component {
  render() {
    return (
      <div>
        <Layout fixedHeader>
            <Header 
              className = "fixed-header"
              title={<span><span style={{ color: '#ddd' }}></span><strong>News Point</strong></span>}>
                <Navigation>
                  <a href="/">Home</a>
                  <a href="/test">Test</a>
                </Navigation>
            </Header>
            {/* <Drawer title="Title">
                <Navigation>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                </Navigation>
            </Drawer> */}
            <Content />
        </Layout>
        <div style={{height: '90px'}} ></div>
        {/* <Feed /> */}
        <Main />
    </div>
    );
  }
}

export default App;
