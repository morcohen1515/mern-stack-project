import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavbarStart extends Component {

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
                                <Link style={{color:'white'}} to="/" className="nav-link">Login</Link>  
                            </li>  
                            <li className="nav-item">  
                                <Link style={{color:'white'}} to="/signup" className="nav-link">SignUp</Link>  
                            </li>  
                        </ul>  
                    </div>
                </nav>
            </div>
        )
    }
}

