import React, { Component } from 'react';
import axios from 'axios';
import NavbarStart from '../components/navbarstart.component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import ('../css/datepicker.css');

export default class SignUp extends Component {

    constructor(props){
        super(props);

        document.body.style = 'background: #2e4355';

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeBday = this.onChangeBday.bind(this);
        this.onChangeMaritalstatus = this.onChangeMaritalstatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.myRef = React.createRef();

        this.state = {
            username: '',
            password: '',
            bday: '',
            maritalstatus: 'Single',
            success: false,
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

    onChangeBday(bday) {
        this.setState({bday: bday.toDateString()});
    }

    onChangeMaritalstatus(e) {
        this.setState({
            maritalstatus: e.target.value
        });
        
    }

    async onSubmit(e) {
        e.preventDefault();

        const newuser = {
            username: this.state.username,
            password: this.state.password,
            bday: this.state.bday,
            maritalstatus: this.state.maritalstatus,
        }

         await axios.post('http://localhost:5000/users/register', newuser)
        .then(res => {
            console.log(res.data);
            this.setState({
                success: true,
                error: false,
            });
        })
        .catch(err => {
            this.setState({
                success: false,
                error: true,
            });
        })

        this.setState({
            username: '',
            password: '',
            bday: '',
            maritalstatus: '',
        }) 
    }
    render() {
        return (
            <div>
                <NavbarStart/>
                <br/>
                <h6 style={{textAlign:"center",color:'rgba(255, 99, 132, 1)'}}>Sign Up</h6>
                <br/>
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <br/>
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
                        <div className="form-group">
                            <label style={{color:'white'}}>B-day: </label>
                            <DatePicker
                                showYearDropdown
                                scrollableYearDropdown
                                className="myDatePicker"
                                selected={new Date(this.state.bday || Date.now())}
                                onChange={this.onChangeBday}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{color:'white'}}>Maritalstatus: </label>
                            <select
                            style={{border: "3px solid #555"}}
                            ref={this.myRef}
                            required
                            className="form-control"
                            value={this.state.maritalstatus}
                            onChange={this.onChangeMaritalstatus}>
                                <option key='010' value="Single">Single</option>
                                <option key='011' value="Divorcee">Divorcee</option>
                                <option key='012' value="Married">Married</option>
                            </select>
                        </div>
                        <br/> 
                        <div>
                        <p style={{color:"white"}}> Do you already have an account ? <Link style={{color:'rgba(255, 99, 132, 1)'}} to="/">Login</Link></p>
                        </div> 
                        <div>
                            {this.state.success && <AddCostItemSuccess/>}
                            {this.state.error && <Error/>}
                        </div>           
                        <div className="form-group" >
                            <input type="submit" value="Create User" className=" btn btn-success"/>
                        </div>
                        <br/>
                    </form>
                </div>
            </div>
        )
    }
}

const AddCostItemSuccess = () => {
    return <div>
        <h6 style={{color:'green'}}>Success</h6>
    </div>
}

const Error = () => {
    return <div>
        <h6 style={{color:'red'}}>Error</h6>       
    </div>
}
