import React, { Component } from 'react';
import axios from 'axios';
import { Line, Pie, PolarArea, Bar, Radar, Doughnut } from 'react-chartjs-2';
import NavbarUser from '../components/navbaruser.component';
import ReactLoading from 'react-loading';


export default class Home extends Component {

    constructor(props){

        super(props);   
                
        this.state = {
            costitems: [],
            categories: [],
            price: [],
            empty: false,
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
                costitems: res.data
            })            
        })

        await axios.get('http://localhost:5000/categories')
        .then(res => {
            this.setState({
                categories: res.data,
                loading: false
            })
        })

        this.state.costitems.length === 0 && this.setState({empty:true})

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
                {
                    this.state.loading
                    ?
                        <Loading/>
                    :
                        this.state.empty
                        ?
                            <Empty/>
                        :
                            <Charts categories={this.state.categories} price={this.state.price}/>
                }
            </div>
        )
    }
}

const LineChart = ({categories, price}) => {
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
                                borderWidth: 4,
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
                                        color:"red",
                                        font:{
                                            size:18
                                        }
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
}

const PaiChart = ({categories, price}) => {
    return  <div>
    <Pie 
        data={{
            labels: categories,
            datasets: [
                {
                    label: 'Expenses by category',
                    data: price,
                    backgroundColor:"#2e4355",
                    pointBorderColor:"#8884d8",
                    pointBorderWidth: 5,
                    pointRadius:8,
                    tension:0.4,
                    borderWidth: 1,
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
                            color:"red",
                            font:{
                                size:18
                            }
                        }
                    }
                ]
            }
        }}
    />
</div>
}

const PolarAreaChart = ({categories, price}) => {
    return  <div>
    <PolarArea 
        data={{
            labels: categories,
            datasets: [
                {
                    label: 'Expenses by category',
                    data: price,
                    backgroundColor:                    [                 
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                     ],
                    pointBorderColor:"#8884d8",
                    pointBorderWidth: 5,
                    pointRadius:8,
                    tension:0.4,
                    borderWidth: 1,
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
                            color:"red",
                            font:{
                                size:18
                            }
                        }
                    }
                ]
            }
        }}
    />
</div>
}

const BarChart = ({categories, price}) => {
    return  <div>
    <Bar 
        data={{
            labels: categories,
            datasets: [
                {
                    label: 'Expenses by category',
                    data: price,
                    backgroundColor:"#2e4355",
                    pointBorderColor:"#8884d8",
                    pointBorderWidth: 5,
                    pointRadius:8,
                    tension:0.4,
                    borderWidth: 1,
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
                            color:"red",
                            font:{
                                size:18
                            }
                        }
                    }
                ]
            }
        }}
    />
</div>
}

const RaderChart = ({categories, price}) => {
    return  <div>
    <Radar 
        data={{
            labels: categories,
            datasets: [
                {
                    label: 'Expenses by category',
                    data: price,
                    backgroundColor:                    [                 
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                     ],
                    pointBorderColor:"#8884d8",
                    pointBorderWidth: 5,
                    pointRadius:8,
                    tension:0.4,
                    borderWidth: 1,
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
                            color:"red",
                            font:{
                                size:18
                            }
                        }
                    }
                ]
            }
        }}
    />
</div>
}

const DoughnutChart = ({categories, price}) => {
    return  <div>
    <Doughnut 
        data={{
            labels: categories,
            datasets: [
                {
                    label: 'Expenses by category',
                    data: price,
                    backgroundColor:                    [                 
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                     ],
                    pointBorderColor:"#8884d8",
                    pointBorderWidth: 5,
                    pointRadius:8,
                    tension:0.4,
                    borderWidth: 1,
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
                            color:"red",
                            font:{
                                size:18
                            }
                        }
                    }
                ]
            }
        }}
    />
</div>
}

const calcPrice = (items, categories) => {

    console.log("items: " + items);
    console.log("cat: " + categories);

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

        console.log("calcprice: " + price);

        return price;
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

const Charts = ({categories, price}) => {
    return  <div className="container">
                <br/>
                <div>
                    {<LineChart categories={categories} price={price}/>}
                </div>
                <br/>
                <div>
                    {<PaiChart categories={categories} price={price}/>}
                </div>
                <br/>
                <br/>
                <div>
                    {<PolarAreaChart categories={categories} price={price}/>}
                </div>
                <br/>
                <br/>
                <div>
                    {<BarChart categories={categories} price={price}/>}
                </div>
                <br/>
                <br/>
                <div>
                    {<RaderChart categories={categories} price={price}/>}
                </div>
                <br/>
                <br/>
                <div>
                    {<DoughnutChart categories={categories} price={price}/>}
                </div>
            </div>
}