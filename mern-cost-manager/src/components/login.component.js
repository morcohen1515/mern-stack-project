import React, { Component } from 'react';
import axios from 'axios';
import NavbarStart from '../components/navbarstart.component';
import { Link } from 'react-router-dom';
import unautorizedErrorCodesArray from './unautorizedErrorCodesArray';
 
export default class Login extends Component {

    constructor(props){
        super(props);

        document.body.style = 'background: #2e4355';
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.myRef = React.createRef();

        this.state = {
            username: '',
            password: '',
            error: false,
        }   
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();


        const user = {
            username: this.state.username,
            password: this.state.password,
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:5000/users/login', user)
        .then(res => {
            localStorage.setItem("x-api-key", JSON.stringify(res.data.token));
            window.location = '/home';
        }).catch(err => {
            this.setState({
                error: err.response.status
            })
        })

        this.setState({
            username: '',
            password: ''
        })      
    }

    render() {
        return (
            <div>
                <NavbarStart/>
                <br/>
                <h6 style={{textAlign:"center", color:'rgba(255, 99, 132, 1)'}}>Login</h6>
                <br/>
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label style={{color:'white'}}>User Name: </label>
                            <input
                            style={{border: "3px solid #555"}}
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{color:'white'}}>Password: </label>
                            <input
                            style={{border: "3px solid #555"}}
                            type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                        </div>
                        <br/>
                        <div>
                        <p style={{color:"white"}}>Don't have a account yet ? <Link style={{color:'rgba(255, 99, 132, 1)'}} to="/signup">SignUp</Link></p>
                        </div>  
                        <div>
                           {unautorizedErrorCodesArray.includes(this.state.error) && <Error/>}
                        </div>             
                        <div className="form-group" >
                            <input type="submit" value="login" className=" btn btn-success"/>
                        </div>
                    </form>
                </div>               
            </div>
        )
    }
}

const Error = () => {
    return <div>
        <h6 style={{color:'rgba(255, 99, 132, 1)'}}>The username or password is incorrect</h6>
        <br/>
    </div>
}
