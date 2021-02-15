import {React, Component} from 'react';
import 'antd/dist/antd.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios'
import snipUtil from "./utilities/snippet";
import {Input, Form, Select} from 'antd';
import CodeBox from './components/CodeBox/CodeBox';
const { Option } = Select;
const { TextArea } = Input;


class App extends Component {
  constructor() {
    super();
    this.state = {
      snippet:"",
      collection:[]
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
    return (
      <div className="App">
      <form onSubmit={this.handleSubmit}>

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
      <TextArea  label='snippet'    id='snippet'  name="snippet"  onChange={this.handleChange} value={this.state.snippet} />
      <button>sub</button>
      </form>
      {   this.state.collection.map((item, index) => <div> <SyntaxHighlighter language="javascript" style={docco}>
    {item.snippet }
    </SyntaxHighlighter> <button                   data-id={item._id} id={index} onClick={this.deleteData}>x</button></div>  )
}
      </div>
    );
  }
}

export default App;
