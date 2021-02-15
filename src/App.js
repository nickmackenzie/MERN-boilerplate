import {React, Component} from 'react';
import 'antd/dist/antd.css';
import './App.css'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import axios from 'axios'
import snipUtil from "./utilities/snippet";
import {Input, Form, Select} from 'antd';
import { Card, Col, Row,Space } from 'antd';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;



const { Option } = Select;
const { TextArea } = Input;

class App extends Component {
  constructor() {
    super();
    this.state = {
      snippet:"",
      collection:[],
      collapsed: false,
    };
   
  }

  
  snippetIndex = async (e) => {
    axios.get('http://localhost:3001/snippets/index')
    .then((response) => {
    
      console.log("[emmso",response.data)
      let snippetArray = response.data
      let mapData = snippetArray
      console.log("sd",typeof mapData)
           mapData.map((number,ix) => {
                 this.setState(prevState => ({
              collection: [...prevState.collection, number]
            })
                    )
              console.log("state", number.snippet)
      }
  
    )})
   }
        toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

componentDidMount() {
  this.snippetIndex()
}

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      newSnips:[]
    });
  };


  handleSubmit = async (e) => {
    e.preventDefault();
    let collection = this.state.collection
    const { snippet } = this.state;

    const snippetAdd = {
     snippet
    };
  
console.log(e)
axios
.post('http://localhost:3001/snippets/add', snippetAdd)
.then((response) => this.setState({collection:[...collection,response.data], snippet:""}))
.catch(err => {
  console.error(err);
});

  }
  deleteData = async (id) => {
console.log("cl",id)
    console.log("del", id.target.id);
    let itmId = id.target.id;
    
    let array = this.state.collection
    let collection = this.state.collection
    let idc = {id:id.target.dataset.id};
    console.log("IDC",idc)
    array.splice(itmId, 1);
    this.setState({ collection: array }, () => {
      axios
      .post('http://localhost:3001/snippets/del', idc)
      .then((response) => console.log('del'))
      .catch(err => {
        console.error(err);
      });
      
    })
    // , () => {
    //  deleteItem(itmId);
    // });

  
  };
  render() {

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (

      <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <div className="App">
      <Form       {...layout} onSubmit={this.handleSubmit}>

      <Form.Item name="name" label="Snippet Name"  onChange={this.handleChange} >
        <Input />
      </Form.Item>

      <Form.Item name="tags" label="Tags"  onChange={this.handleChange} >
        <Input />
      </Form.Item>
      <Form.Item name="syntax" label="Syntax" >
        <Select
          placeholder="Select a option and change input text above"
          onChange={this.handleChange} 
                    allowClear
        >
          <Option value="javascript">javascript</Option>
          <Option value="css">css</Option>
          <Option value="phthon">python</Option>
        </Select>
      </Form.Item>
      <TextArea
          
          onChange={this.onChange}
          placeholder="Controlled autosize"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      <TextArea  label='snippet'    id='snippet'  name="snippet"  onChange={this.handleChange} value={this.state.snippet} />
      <button>sub</button>
      </Form>

<Row>

      {   this.state.collection.map((item, index) =><Col span={8}> <Card className="card" title="Card title" bordered={true}><SyntaxHighlighter language="javascript" style={docco}>
    {item.snippet }        
    </SyntaxHighlighter> <button data-id={item._id} id={index} onClick={this.deleteData}>x</button>  </Card> </Col>)
}
</Row>
      </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Nick Design ©2018 Created by Nick</Footer>
      </Layout>
    </Layout>

    )
  }
}

export default App;



           

          