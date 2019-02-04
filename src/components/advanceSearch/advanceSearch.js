import React, { Component } from 'react';
import './advanceSearch.css';

class AdvanceSearch extends Component {
    constructor(props) {
        super(props);
        this.maxIBU = React.createRef();
        this.minIBU = React.createRef();
        this.maxABV = React.createRef();
        this.minABV = React.createRef();
        this.maxEBC = React.createRef();
        this.minEBC = React.createRef();
        this.brewedBefore = React.createRef();
        this.brewedAfter = React.createRef();
    };
    onClick = function(event){
        event.stopPropagation();
    };
    closeCard = function(event){
        event.stopPropagation();
        this.props.closeCard();
    };
    search = function(){
        var searchParams = {};
        if(this.maxIBU.value !== ""){
            searchParams.maxIBU = this.maxIBU.value;
        }
        if(this.minIBU.value !== ""){
            searchParams.minIBU = this.minIBU.value;
        }
        if(this.maxABV.value !== ""){
            searchParams.maxABV = this.maxABV.value;
        }
        if(this.minABV.value !== ""){
            searchParams.minABV = this.minABV.value;
        }
        if(this.maxEBC.value !== ""){
            searchParams.maxEBC = this.maxEBC.value;
        }
        if(this.minEBC.value !== ""){
            searchParams.minEBC = this.minEBC.value;
        }
        if(this.brewedBefore.value !== ""){
            searchParams.brewedBefore = this.getMMYYYYFormatDate(this.brewedBefore.value);
        }
        if(this.brewedAfter.value !== ""){
            searchParams.brewedAfter = this.getMMYYYYFormatDate(this.brewedAfter.value);
        }
        this.props.search(searchParams);
    };
    getMMYYYYFormatDate = function(dateString){
        var date = new Date(dateString);
        return (((date.getMonth()+1)+"").length === 1 ? "0":"")+(date.getMonth()+1)+"-"+date.getFullYear();
    };
    render() {
        return (
            <div className="advance-card row" onClick={this.closeCard.bind(this)}>
                <div className="advance-card-main col-lg-6 col-xl-6 col-md-8 col-sm-12 col-xs-12" onClick={this.onClick.bind(this)}>
                    <div className="row">
                        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <h1 className="adv-header">Advance Search</h1>
                        </div>
                        <div className="adv-column col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <span >Maximum IBU : </span>
                            <input type="number" className=" text-input"  ref={ref=> {this.maxIBU = ref;}}/>
                        </div>
                        <div className="adv-column col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <span >Minium IBU : </span>
                            <input type="number" className=" text-input"  ref={ref=> {this.minIBU = ref;}}/>
                        </div>
                        <div className="adv-column col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <span >Maximum ABV : </span>
                            <input type="number" className=" text-input"  ref={ref=> {this.maxABV = ref;}}/>
                        </div>
                        <div className="adv-column col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <span >Minium ABV : </span>
                            <input type="number" className=" text-input"  ref={ref=> {this.minABV = ref;}}/>
                        </div>
                        <div className="adv-column col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <span >Maximum EBC : </span>
                            <input type="number" className=" text-input"  ref={ref=> {this.maxEBC = ref;}}/>
                        </div>
                        <div className="adv-column col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <span >Minium EBC : </span>
                            <input type="number" className=" text-input"  ref={ref=> {this.minEBC = ref;}}/>
                        </div>
                        <div className="adv-column col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <span >Brewed Before : </span>
                            <input type="date" className=" text-input" ref={ref=> {this.brewedBefore = ref;}}/>
                        </div>
                        <div className="adv-column col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <span >Brewed After : </span>
                            <input type="date" className=" text-input" ref={ref=> {this.brewedAfter = ref;}}/>
                        </div>
                        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <button className="adv-search-button" onClick={this.search.bind(this)}>Search</button>
                        </div>
                    </div><br/>
                    <span className="material-icons close-icon" onClick={this.closeCard.bind(this)}>close</span>  
                </div>
            </div>
        );
    }
}

export default AdvanceSearch;
