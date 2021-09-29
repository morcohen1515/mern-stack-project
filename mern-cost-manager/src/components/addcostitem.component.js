import React, { Component } from 'react';
import axios from 'axios';
import NavbarUser from '../components/navbaruser.component';

export default class AddCostItem extends Component {

    constructor(props){
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.myRef = React.createRef();

        this.state = {
            category: 'select category',
            title: '',
            price: 1,
            description: '',
            categories: [],
            isCategoryManual: false,
            success: false,
            error: false,
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

        await axios.get('http://localhost:5000/categories')
        .then(res => {
            this.setState({
                categories: res.data
            })
        });

        console.log("length of categories in DidMount: " + this.state.categories.length);
        if(this.state.categories.length === 0){
            this.setState({
                isCategoryManual: true
            })
        }
    }

    onChangeCategory(e) {
        
        console.log(e.target.value);
        

        if(e.target.value === "Add category manually") {
            this.setState({isCategoryManual: true});
        }

        this.setState({
            category: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

   async onSubmit(e) {
        e.preventDefault();

        const cost = {
            category: this.state.category,
            title: this.state.title,
            price: this.state.price,
            description: this.state.description,
        }

        let token = JSON.parse(localStorage.getItem("x-api-key"));
        if(token) {
            axios.defaults.headers = {
                Authorization: token
            }
        } else {
            delete axios.defaults.headers.Authorization;
        }

        await axios.post('http://localhost:5000/cost/add', cost)
        .then(res => {
            this.setState({
                success: true,
                error: false,
                isCategoryManual: false,
            })
        })
        .catch(err => {
            this.setState({
                success: false,
                error: true,
                isCategoryManual: false,
            });
        })

        this.setState({
            category: '',
            title: '',
            price: 1,
            description: '',
        }) 

        await axios.get('http://localhost:5000/categories')
        .then(res => {
            this.setState({
                categories: res.data
            })
        });
    }

    render() {
        return (            
            <div>
                <NavbarUser/>
                <div className="container"> 
                    <br/>
                    <h6 style={{textAlign: "center", color:'rgba(255, 99, 132, 1)'}}>Create New Cost Item</h6>
                    <br/>
                    <div style={{ display: "flex", justifyContent: "center"}}>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label style={{color:'white'}}>Category: </label>
                                {this.state.isCategoryManual
                                ? 
                                        <input
                                        style={{border: "3px solid #555"}}
                                        type="text"
                                        required
                                        className="form-control"
                                        value={this.state.category}
                                        onChange={this.onChangeCategory}
                                        />
                                : 
                                        <select
                                        style={{border: "3px solid #555", width: "400px"}}
                                        ref={this.myRef}
                                        required
                                        className="form-control"
                                        value={this.state.category}
                                        onChange={this.onChangeCategory}>
                                        {
                                            this.state.categories.map(function(category) {
                                                return <option key={category} value={category}>{category}</option>
                                            })
                                        }
                                        <option key='010' value="Add category manually">Add category manually</option>
                                        </select>
                                }
                            </div>
                            <div className="form-group">
                                <label style={{color:'white'}}>Title: </label>
                                <input
                                style={{border: "3px solid #555"}}
                                type="text"
                                required
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{color:'white'}}>Price: </label>
                                <input
                                style={{border: "3px solid #555"}}
                                type="number"
                                required
                                className="form-control"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{color:'white'}}>Description: </label>
                                <input
                                style={{border: "3px solid #555"}}
                                type="text"
                                required
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                            </div>
                            <br/>
                            <div>
                                {this.state.success && <AddCostItemSuccess/>}
                                {this.state.error && <Error/>}
                            </div>
                            <div className="form-group" >
                                <br/>
                                <input type="submit" value="Create Cost Item" className=" btn btn-success"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const AddCostItemSuccess = () => {
    return <div>
        <h6 style={{color:"green"}}>Success</h6>
    </div>
}

const Error = () => {
    return <div>
        <h6 style={{color:"red"}}>Error</h6>       
    </div>
}