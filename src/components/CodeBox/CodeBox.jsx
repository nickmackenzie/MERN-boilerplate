import {React, Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios'
import {Input} from 'antd';

const { TextArea } = Input;




class CodeBox extends Component {
  constructor(props) {
    super();
  
    this.state = {

      collection:[...props.snippetCollection]
    };
   
  }




  render() {
 
    console.log("state",this.state.collection)

    return (
      <div className="App">


{   this.state.collection.map((item, index) =><div>{item}</div> )
}
</div>



    )
}}

export default CodeBox;