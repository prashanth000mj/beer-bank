import React, { Component } from 'react';
import './detailedCard.css';

class DetailedCard extends Component {
    onClick = function(event){
        event.stopPropagation();
    };
    closeCard = function(event){
        event.stopPropagation();
        this.props.closeCard();
    };
    getYouMayLikeBeers = function(){
        return this.props.youMayLike.map(function(beer){
           return (<div className="col-lg-4 col-xl-4 col-md-4 col-sm-4 col-xs-4">
                <div className="you-may-like ">
                    <img className="you-may-like-image" src={beer.image_url} alt={beer.name}/><br/>
                    <small className="you-may-like-text"><b>{beer.name}</b></small>
                </div>
            </div>);
        });
    };
    getYouMayLikeElement = function(){
        return (<div className="row you-may-like-row">
            <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                <h4 className="dc-h4">You might also like:</h4>
            </div>
            {this.getYouMayLikeBeers()}
        </div>);
    };
    render() {
        return (
            <div className="detailed-card row" onClick={this.closeCard.bind(this)}>
                <div className="detailed-card-main col-lg-6 col-xl-6 col-md-8 col-sm-12 col-xs-12" onClick={this.onClick.bind(this)}>
                    <div className="row">
                        <div className="col-lg-4 col-xl-4 col-md-4 col-sm-12 col-xs-12">
                            <img className="detailed-card-image" src={this.props.beer.image_url} alt={this.props.beer.name}/>
                        </div>
                        <div className="detailed-card-text col-lg-8 col-xl-8 col-md-8 col-sm-12 col-xs-12">
                            <h3 className="dc-h2">{this.props.beer.name}</h3>
                            <div className="dc-text">
                                <span>{this.props.beer.tagline}</span><br/>
                                <div className="color-line"></div>
                                <span>
                                    <span><b>IBU: </b>{this.props.beer.ibu}</span>&nbsp;&nbsp;&nbsp;
                                    <span><b>ABV: </b>{this.props.beer.abv+"%"}</span>&nbsp;&nbsp;&nbsp;
                                    <span><b>EBC: </b>{this.props.beer.ebc}</span>    
                                </span><br/><br/>
                                <span>
                                    {this.props.beer.description}
                                </span><br/><br/>
                                <span>
                                    <span><b>Best served with:</b></span>
                                    <ul>
                                        {
                                            this.props.beer.food_pairing.map(function(food, index){
                                                return (<li key={index}>{food}</li>);
                                            })
                                        }
                                    </ul>
                                </span>
                            </div>
                        </div>
                    </div><br/>
                    {this.getYouMayLikeElement()}
                    <span className="material-icons close-icon" onClick={this.closeCard.bind(this)}>close</span>  
                </div>
            </div>
        );
    }
}

export default DetailedCard;
