import React, { Component } from 'react';
import './header.css';

class Header extends Component {

    getHeaderClass = function(){
        var cssClass = "App-header";
        if(this.props.isReal){
            cssClass += " fixed-header";
        }
        return cssClass;
    };

    goHome = function(){
        this.props.goHome();
    };

    goFavorite = function(){
        this.props.goFavorite();
    };
    isActive = function(page){
        var css = "hand-pointer ";
        if(!this.props.showFavorite && page === "home"){
            css += "active-page";
        }
        if(this.props.showFavorite && page === "fav"){
            css += "active-page";
        }
        return css;
    }
    render() {
        return (
            <header className={this.getHeaderClass()}>
                <div className="header-navs">
                    <span onClick={this.goHome.bind(this)} className={this.isActive("home")}>HOME</span>&nbsp;&nbsp;&nbsp;
                    <span onClick={this.goFavorite.bind(this)} className={this.isActive("fav")}>FAVORITE</span>
                </div><br/>
            </header>
        );
    }
}

export default Header;
