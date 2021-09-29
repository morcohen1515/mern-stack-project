import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class NavbarUser extends Component {

    constructor(props){

        super(props);

        this.logout = this.logout.bind(this);       
    }

    logout() {
        localStorage.removeItem("x-api-key");
    }

    render() {
        return (            
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">  
                    <div className="container">
                        <ul className="navbar-nav">  
                            <li className="nav-item active">  
                                <Link style={{color:'rgba(255, 99, 132, 1)'}} to="#" className="navbar-brand">Cost Manager</Link>  
                            </li>   
                            <li className="nav-item">  
                                <Link style={{color:'white'}} to="/home" className="nav-link">Home</Link> 
                            </li>
                            <li className="nav-item">  
                                <Link style={{color:'white'}} to="/addcostitem" className="nav-link">Add Cost</Link> 
                            </li> 
                            <li className="nav-item">  
                                <Link style={{color:'white'}} to="/showitems" className="nav-link">Show Cost Items</Link>  
                            </li> 
                            <li className="nav-item">  
                                <Link style={{color:'white'}} to="/chart" className="nav-link">Charts</Link> 
                            </li> 
                            <li className="nav-item">  
                                <Link style={{color:'white', }} onClick={this.logout} to="/" className="nav-link">LogOut</Link> 
                            </li> 
                        </ul>  
                    </div>
                </nav>
            </div>
        )
    }
}