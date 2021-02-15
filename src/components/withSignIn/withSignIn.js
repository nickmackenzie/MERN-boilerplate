import React from 'react'
import axios from 'axios'
import { withSignIn } from 'react-auth-kit'

class signInComponent extends React.Component {
    state={email: '', password: ''}

    onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/login', this.state)
            .then((res)=>{
                if(res.status === 200){
                    if(this.props.signIn({token: res.data.token,
                                          expiresIn:res.data.expiresIn,
                                          tokenType: "Bearer",
                                          authState: res.data.authUserState})){
                        // Redirect or do-something
                    }else {
                        //Throw error
                    }
                }
            })
    }

    render(){
        return (
            <form onSubmit={onSubmit}>
                <input type={"email"} onChange={(e)=>this.setState({...this.state, email: e.target.value})}/>
                <input type={"password"} onChange={(e)=>this.setState({...this.state, password: e.target.value})}/>

                <button>Submit</button>
            </form>
        )
    }
}

export default withSignIn(signInComponent)