import React, { Component } from 'react';
import './card.css';

class Card extends Component {
    isFavorite = function(){
        if(this.props.beer.isFavorite){
            return "star";
        }else {
            return "star_border";
        }
    };
    getFavIconColor = function(){
        var css = "material-icons fav-icon ";
        if(this.props.beer.isFavorite){
            css += "fav-icon-color";
        }
        return css;
    }
    setFavorite = function(event){
        event.stopPropagation();
        this.props.setFavorite(this.props.beer);
    };
    onClick =function(){
        this.props.onClick(this.props.beer);
    };    
    render() {
        return (
            <div className="card" onClick={this.onClick.bind(this)}>
                <img className="card-img" src={this.props.beer.image_url} alt={this.props.beer.name}/>
                <h5>{this.props.beer.name}</h5>
                <small className="card-tagline">{this.props.beer.tagline}</small>
                <span className={this.getFavIconColor()} onClick={this.setFavorite.bind(this)}>{this.isFavorite()}</span>
            </div>
        );
    }
}

export default Card;
