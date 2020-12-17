import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert/Alert.component';
import Button from '../../components/Button/Button.component';
import Form from '../../components/Form/Form.component';
import Input from '../../components/Input/Input.component'
import InputWrapper from '../../components/InputWrapper/InputWrapper.component';

class RegisterPage extends Component {
    state = {
        name : '',
        email : '',
        password :'',
        role : 'user',
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
        const {name, email, password, role} = this.state
        try {
            const response = await fetch('http://127.0.0.1:8080/api/users/',{
                method : "post",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify({name, email, password, role})
            })
            const res_text = await response.text()
            const res_code = await response.status
            this.setState({email : '', password : '', role : 'user', name : ''})
            if(res_code === 200) {
                this.props.setHeader(res_text)
                this.setState({res_text : 'User Created', res_code})
            } else
            this.setState({res_text, res_code})
        } catch ({name, message}) {
            console.error(`${name} : ${message}`)
        }
    }

    render() { 
        const {name, email, password, res_text, res_code, role} = this.state
        return (
            <div className="card border-dark mb-3 offset-md-3 col-6 mt-5 p-5">
                <div className="text-right mb-3">
                    <Link className='btn btn-info' to='/login'>Login <i className="fa fa-sign-in"></i></Link>
                </div>
                <div className="card-header">Register </div>
                <div className="card-body text-dark">
                    <Form handleSubmit={this.handleSubmit}>
                        <InputWrapper label='Full Name'>
                            <Input type="text" name="name" className="form-control" value={name} onChange={this.handleChange} required/>
                        </InputWrapper>
                        <InputWrapper label='Email Address'>
                            <Input type="email" name="email" className="form-control" value={email} onChange={this.handleChange} required/>
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </InputWrapper>
                        <InputWrapper label='Password'>
                            <Input type="password" name="password" className="form-control" value={password} onChange={this.handleChange} required />
                        </InputWrapper>
                        <InputWrapper label='Full Name'>
                            <select className="form-control" name='role' value={role} onChange={this.handleChange}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                            </select>
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
 
export default RegisterPage;