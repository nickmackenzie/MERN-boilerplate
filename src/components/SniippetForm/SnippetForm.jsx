import { React, Component } from "react";
import "antd/dist/antd.css";

import axios from "axios";

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

class SnippetForm extends Component {
  constructor() {
    super();
    this.state = {
      snippet: "",
      collection: [],
      collapsed: false,
      name: "",
      tags: "",
      syntax: "",
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      newSnips: [],
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let collection = this.state.collection;
    const snippetData = {
      snippet: this.state.snippet,
      name: this.state.name,
      syntax: this.state.syntax,
      tags: this.state.tags,
    };
    const snippetAdd = {
      snippetData,
    };
    console.log("dadt", snippetData);

    console.log(e);
    axios
      .post("http://localhost:3001/snippets/add", snippetData)
      .then((response) =>
        this.setState({
          collection: [...collection, response.data],
          snippet: "",
          name: "",
        })
      )
      .catch((err) => {
        console.error(err);
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
    return (
      <div>
        <form {...layout} onSubmit={this.handleSubmit}>
          <Form.Item
            name="name"
            label="Snippet Name"
            onChange={this.handleChange}
          >
            <Input />
          </Form.Item>

          <Form.Item name="tags" label="Tags" onChange={this.handleChange}>
            <Input />
          </Form.Item>
          <Form.Item name="syntax" label="Syntax">
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
          <TextArea
            label="snippet"
            id="snippet"
            name="snippet"
            onChange={this.handleChange}
            value={this.state.snippet}
          />
          <button>sub</button>
        </form>
      </div>
    );
  }
}

export default SnippetForm;
