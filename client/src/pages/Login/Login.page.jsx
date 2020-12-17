import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert/Alert.component';
import Button from '../../components/Button/Button.component';
import CardHeader from '../../components/CardHeader/CardHeader.component';
import Form from '../../components/Form/Form.component';
import Input from '../../components/Input/Input.component'
import InputWrapper from '../../components/InputWrapper/InputWrapper.component';

class LoginPage extends Component {
    state = {
        email : '',
        password :'',
        res_text : '',
        res_code : ''
     }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name] : value})
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        this.setState({res_text : '', res_code : '' })
        const {email, password} = this.state
        try {
            const response = await fetch('http://127.0.0.1:8080/api/auth/',{
                method : "post",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify({email, password})
            })
            const res_text = await response.text()
            const res_code = await response.status
            this.setState({email : '', password : ''})
            if(res_code === 200) {
                this.props.setHeader(res_text)
                this.setState({res_text : 'User Authenticated', res_code})
            } else
            this.setState({res_text, res_code})
        } catch ({name, message}) {
            console.error(`${name} : ${message}`)
        }
    }

    render() { 
        const {email, password, res_text, res_code} = this.state
        return (
            <div className="card border-dark mb-3 offset-md-3 col-6 mt-5 p-5">
                <div className="text-right mb-3">
                    <Link className='btn btn-info' to='/register'>Register <i class="fa fa-user-plus" aria-hidden="true"></i></Link>
                </div>
                <CardHeader heading='Login' />
                <div className="card-body text-dark">
                    <Form handleSubmit={this.handleSubmit}>
                        <InputWrapper label='Email Address'>
                            <Input type="email" name="email" className="form-control" value={email} onChange={this.handleChange} required/>
                        </InputWrapper>
                        <InputWrapper label='Password'>
                            <Input type="password" name="password" className="form-control" value={password} onChange={this.handleChange} required />
                        </InputWrapper>
                        <div className="text-center">
                            <Button type="submit" className="btn btn-success">Submit</Button>
                        </div>
                    </Form>
                    {res_text &&
                    <Alert res_code={res_code} res_text={res_text} />
                    }
                </div>
            </div>
        );
    }
}
 
export default LoginPage;