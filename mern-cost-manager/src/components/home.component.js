import React, { Component } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import NavbarUser from '../components/navbaruser.component';
import ReactLoading from 'react-loading';


export default class Home extends Component {

    constructor(props){

        super(props);   
                
        this.state = {
            empty: false,
            costitems: [],
            categories: [],
            user: {},
            price: [],
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

        await axios.get("http://localhost:5000/users/getuser")
        .then(res => {
            this.setState({user: res.data})           
        })
        .catch(err => {
            this.setState({});
        })

        await axios.get("http://localhost:5000/cost")
        .then(res => {
            this.setState({costitems: res.data})            
        })
        .catch(err => {
            this.setState({});
        })

        await axios.get('http://localhost:5000/categories')
        .then(res => {
            this.setState({
                categories: res.data,
                loading: false
            })
        })
        .catch(err => {this.setState({});})


        if(this.state.costitems.length !== 0 && this.state.categories.length !== 0){
            this.setState({
                price: calcPrice(this.state.costitems, this.state.categories)
            })
        }
    }

    render() {
        return (
            <div>
               <NavbarUser/>
               {this.state.loading 
               ?
               <Loading/>
               :
                <div className="container">   
                    <div>
                        <HelloUser user={this.state.user}/>
                    </div>
                    <div>
                        {
                        this.state.costitems.length === 0
                        ? 
                        <Empty/> 
                        : 
                        <PaiChart categories={this.state.categories} price={this.state.price}/>
                        }
                    </div>
                </div>
               }
            </div>
        )
    }
}

const PaiChart = ({categories, price}) => {
    return  <div>
                <Line 
                    data={{
                        labels: categories,
                        datasets: [
                            {
                                label: 'Expenses by category',
                                data: price,
                                backgroundColor: "#2e4355",
                                pointBorderColor:"#8884d8",
                                pointBorderWidth: 5,
                                pointRadius:8,
                                tension:0.4,
                                borderWidth: 5,
                             borderColor: [
                                'rgba(255, 99, 132, 1)',
                             ],
                            },
                        ]
                    }}
                    height={350}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        color:"white",
                                        font:{
                                            size:26,
                                        }
                                    }
                                }
                            ]
                        },
                    }}
                />
            </div>
}

const HelloUser = ({user}) => {    
    
    
    return <div>
            <br/>
            <div className="row gx-5">
                <div className="col">
                <div className="p-3 border bg-light" style={{textAlign: "center"}}><h6>Hello {user.username}</h6></div>
                </div>
                <div className="col">
                <div className="p-3 border bg-light" style={{textAlign: "center"}}><h6>{user.bday}</h6></div>
                </div>
                <div className="col">
                <div className="p-3 border bg-light" style={{textAlign: "center"}}><h6>{user.maritalstatus}</h6></div>
                </div>
            </div>
            <br/>
        </div>
}

const Empty = () => { 
    return <div>
        <br/>
       <h6 style={{color:'rgba(255, 99, 132, 1)', textAlign:"center=-"}}>There are no Items.</h6>
    </div>
}

const Loading = () => {
    return <div>
        <div style={{ display: "flex", justifyContent: "center"}}>
            <ReactLoading type={"bubbles"} color={"#ffffff"} height={'10%'} width={'10%'} />
        </div>
    </div>
}

const calcPrice = (items, categories) => {

    var totalprice = 0;
    var price = [];

    //Size of arr items.
    var size = items.length;

        //Each category and its expenses
        for(var i=0;i<size;i++){
            for(var j=0;j<size;j++){
                if(categories[i] === items[j].category){
                    items[j].category = "";
                    totalprice += parseInt(items[j].price);
                }
            }
            if(totalprice !== 0){
                price.push(parseInt(totalprice));
                totalprice = 0;
            }
        }

        return price;
}