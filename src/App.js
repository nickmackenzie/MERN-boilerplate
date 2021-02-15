import {React, Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios'
import snippet from "./utilities/snippet";
import {Input} from 'antd';
import CodeBox from './components/CodeBox/CodeBox';
const { TextArea } = Input;




class App extends Component {
  constructor() {
    super();
    this.state = {
      snippet:"none",
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
.then((response) => this.setState({collection:[...collection,response.data]}))
.catch(err => {
  console.error(err);
});

  }

  render() {
    return (
      <div className="App">
      <form onSubmit={this.handleSubmit}>
      <TextArea     id='snippet'  name="snippet"  onChange={this.handleChange} />
      
      <button>Submit</button>
      </form>
      {   this.state.collection.map((item, index) =>    <SyntaxHighlighter language="javascript" style={docco}>
    {item.snippet}
    </SyntaxHighlighter> )
}
      </div>
    );
  }
}

export default App;
