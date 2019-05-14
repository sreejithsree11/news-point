import React, { Component } from 'react';
import './App.css';
import { Layout,Textfield, Drawer, Header, Navigation, Content } from 'react-mdl';
import Feed from './components/feed/Feed';
import Main from './components/main';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
const style = {
  fontFamily: 'Pacifico',
  fontSize: '1.5em', 
  fontStyle: 'italic'
}
class App extends Component {
  render() {
    return (
      <div>
        <Layout fixedHeader>
            <Header 
              className = "fixed-header"
              title={<span><span style={{ color: '#ddd' }}></span>
                <strong style={style}>News Point</strong>
              </span>}>
              <Navigation>
                  <a href="/">Home</a>
                  <a href="/job">Job</a>
                </Navigation>
              <Textfield
                value=""
                onChange={() => {}}
                label="Search"
                expandable
                expandableIcon="search"
              />
                
            </Header>
            <Drawer title="Title">
                <Navigation>
                  <a href="/">Home</a>
                  <a href="/job">Job</a>
                </Navigation>
            </Drawer>
            <Content />
        </Layout>
        <div style={{height: '90px'}} ></div>
        
        <Main />
    </div>
    );
  }
}

export default App;
