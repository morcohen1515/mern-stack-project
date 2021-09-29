import React, { Component } from 'react';
import axios from 'axios';
import NavbarUser from '../components/navbaruser.component';
import ReactLoading from 'react-loading';

export default class ShowItems extends Component {

    constructor(props){

        super(props);   
                
        this.state = {
            empty: false,
            costitems: [],
            loading: true,
        } 
    }

    async componentDidMount() {
        document.body.style = 'background: #2e4355';
        
        let token = JSON.parse(localStorage.getItem("x-api-key"));

        if(token) {
            axios.defaults.headers = {
                Authorization: token
            }
        } else {
            delete axios.defaults.headers.Authorization;
        }

        await axios.get("http://localhost:5000/cost")
        .then(res => {
            this.setState({
                costitems: res.data,
                loading: false,
            })            
        })
        .catch(error => {
            this.setState({});
        })

        this.state.costitems.length === 0 && this.setState({empty:true})

    };

    render() {
        return <div>
             <NavbarUser/> 
             {
                 this.state.loading
                 ?
                    <Loading/>
                 :
                    this.state.empty ? <Empty/> : <Table items={this.state.costitems}/>
             }
        </div> 
    }
}

const Table = ({items}) => {
    return  <div>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr style={{color:'rgba(255, 99, 132, 1)'}}>
                            <th scope="col">Category</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>                           
                            <th scope="col">Description</th>
                        </tr>
                        </thead>
                        <tbody id="listitems" style={{color:"white"}}>
                        {items.map((item, i) => (
                            <tr key={i}>
                                <td>{item.category}</td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>            
            </div>
}

const Loading = () => {
    return <div>
        <div style={{ display: "flex", justifyContent: "center"}}>
            <ReactLoading type={"bubbles"} color={"#ffffff"} height={'10%'} width={'10%'} />
        </div>
    </div>
}

const Empty = () => {
    return <div>
                <br/>
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <h6 style={{color:'rgba(255, 99, 132, 1)'}}>There are no Items.</h6>
                </div>
            </div>
}