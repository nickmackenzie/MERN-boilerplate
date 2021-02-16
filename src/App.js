import { React, Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import "antd/dist/antd.css";
import "./App.css";
import SnippetForm from "./components/SniippetForm/SnippetForm";

import axios from "axios";
import snipUtil from "./utilities/snippet";
import { Input, Form, Select } from "antd";
import { Card, Col, Row, Space } from "antd";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;

const { Option } = Select;
const { TextArea } = Input;

class App extends Component {
  constructor() {
    super();
    this.state = {
      snippet: "",
      collection: [],
      collapsed: false,
      menu: "1",
    };
  }

  snippetIndex = async (e) => {
    axios.get("http://localhost:3001/snippets/index").then((response) => {
      console.log("[emmso", response.data);
      let snippetArray = response.data;

      let mapData = snippetArray;
      console.log("sd", typeof mapData);
      mapData.map((number, ix) => {
        this.setState((prevState) => ({
          collection: [...prevState.collection, number],
        }));
        console.log("state", number.snippet);
      });
    });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    this.snippetIndex();
  }
  menuChange = (e) => {
    console.log("click", e.key);
    this.setState({ menu: e.key });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      newSnips: [],
    });
  };

  deleteData = async (id) => {
    console.log("cl", id);
    console.log("del", id.target.id);
    let itmId = id.target.id;

    let array = this.state.collection;
    let collection = this.state.collection;
    let idc = { id: id.target.dataset.id };
    console.log("IDC", idc);
    array.splice(itmId, 1);
    this.setState({ collection: array }, () => {
      axios
        .post("http://localhost:3001/snippets/del", idc)
        .then((response) => console.log("del"))
        .catch((err) => {
          console.error(err);
        });
    });
    // , () => {
    //  deleteItem(itmId);
    // });
  };
  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    let menuSelect;
    if (this.state.menu === "1") {
      menuSelect = <div>Index</div>;
    } else if (this.state.menu === "2") {
      menuSelect = <SnippetForm />;
    }
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item
              key="1"
              onClick={this.menuChange}
              icon={<UserOutlined />}
            >
              Snippets{" "}
            </Menu.Item>
            <Menu.Item
              onClick={this.menuChange}
              key="2"
              icon={<VideoCameraOutlined />}
            >
              Add Snippets{" "}
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
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div className="App">
                {menuSelect}
                <Row>
                  {this.state.collection.map((item, index) => ({
                    /* <Col span={8}>
                      {" "}
                      <Card className="card" title="Card title" bordered={true}>
                        <SyntaxHighlighter language="javascript" style={docco}>
                          {item.snippet}
                        </SyntaxHighlighter>{" "}
                        <button
                          data-id={item._id}
                          id={index}
                          onClick={this.deleteData}
                        >
                          x
                        </button>{" "}
                      </Card>{" "}
                    </Col> */
                  }))}
                </Row>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Nick Design ©2018 Created by Nick
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
