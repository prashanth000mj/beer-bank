import React, { Component } from 'react';
import './body.css';
import Header from '../header/header';
import Card from '../card/card';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {moreBeersToLoad: false, showFavorite: false};
        this.loader = React.createRef();
        this.searchBox = React.createRef();
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll = function(){
        if(this.loader.current && window.scrollY + window.innerHeight >= this.loader.current.offsetTop && !this.state.showFavorite){
            this.props.loadMoreBeers();
        }
    };

    setFavorite = function(beer){
        beer.isFavorite = !beer.isFavorite;
        this.setState({});
    };

    chooseBeer = function(beer){
        this.props.selectedBeer(beer);
    };

    filteredBeers = function(){
        if(this.state.showFavorite){
            return this.props.beers.filter(function(beer){
                return beer.isFavorite;
            });
        }else{
            return this.props.beers;
        }
    };

    getCards=function(){
        var self = this;
        var filteredBeers = this.filteredBeers();
        if(filteredBeers.length > 0){
            return (filteredBeers.map(function(beer, index){
                return (
                    <div className="card-container col-lg-4 col-xl-4 col-md-6 col-sm-6 col-xs-12" key={index}>
                        <Card beer={beer} setFavorite={self.setFavorite.bind(self)} onClick={self.chooseBeer.bind(self)}/>
                    </div>
                );
            }));
        }else {
            return (<div className="card-container col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12">
                <h3>No Beers Found!!!</h3>
            </div>); 
        }
    };
    static getDerivedStateFromProps = function(props, state){
        return {
            moreBeersToLoad: props.moreBeersToLoad,
            showFavorite: props.showFavorite
        };
    }
    getLoadingIndicator = function(){
        if(this.state.moreBeersToLoad && this.props.beers.length > 0 && !this.state.showFavorite){
            return (
                <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12" ref={this.loader}>
                    <span className="material-icons refresh-icon">refresh</span>
                </div>
            );
        }else{
            return null;
        }
    };
    search = function(event){
        if(event.key === 'Enter'){
            this.props.search(this.searchBox.value);
        }
    };
    openAdvanceSearch = function(){
        this.searchBox.value = "Advance Search";
        this.props.openAdvanceSearch();
    };
    clearSearch = function(){
        this.searchBox.value = "";
        this.props.clearSearch();
    };
    render() {
        return (
        <div>
            <Header />
            <div className="body-header-main">
                    <h1>The Beer Bank</h1>
                    <h6>Find your favorite beer here</h6>
                    <div className="col-lg-6 col-xl-6 col-md-8 col-sm-12 col-xs-12">
                        <input className="body-search-box" type="text" onKeyPress={this.search.bind(this)}
                            placeholder="Search for beer name" ref={ref=> {this.searchBox = ref;}} 
                            title="Hit Enter after the search text is keyed in!"/>
                        <a className="advance-search" 
                            onClick={this.openAdvanceSearch.bind(this)}>Advance Search</a>
                            
                        <a className="clear-search" 
                            onClick={this.clearSearch.bind(this)}>Clear Search</a>
                        
                    </div>
                </div>
            <div className="App-body">
                <div className="body-main col-lg-8 col-xl-8 col-md-8 col-sm-12 col-xs-12">
                    <div className="row">
                        {this.getCards()}
                        {this.getLoadingIndicator()}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Body;
