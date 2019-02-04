import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Body from './components/body/body';
import DetailedCard from './components/detailedCard/detailedCard';
import AdvanceSearchCard from './components/advanceSearch/advanceSearch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailBeer: false, 
      detailedBeer: null, 
      beers: [],
      moreBeersToLoad: true,
      showFavorite: false,
      advanceSearch: false
    };
    this.loadingBeers = false;
    this.beersPage = 0;
    this.beerSearchName = "";
    this.advanceSearchParams = {}
  };
  showBeerDetail = function(beer){
    this.setState({
      showDetailBeer: true,
      detailedBeer: beer
    });
  };
  closeDetailedCard = function(){
    this.setState({
      showDetailBeer: false,
      detailedBeer: null
    });
  };
  getThreeRandomBeer = function(){
    var beers = [];
    beers.push(this.state.beers[Math.floor(Math.random()*10)]);
    beers.push(this.state.beers[Math.floor(Math.random()*10)]);
    beers.push(this.state.beers[Math.floor(Math.random()*10)]);
    return beers;
  }
  getDetailedCard = function(){
    if(this.state.showDetailBeer){
      return (<DetailedCard closeCard ={this.closeDetailedCard.bind(this)} beer={this.state.detailedBeer} youMayLike={this.getThreeRandomBeer()}/>);
    }else{
      return null;
    }
  };
  search = function(beerName) {
    this.beersPage = 0;
    this.beerSearchName = beerName;
    this.setState({
      beers: [],
      moreBeersToLoad: true
    });
    this.loadBeers();
  };
  getAdvanceSearchParams = function(){
    var params = "";
    if(this.advanceSearchParams.maxIBU){
      params += "&ibu_lt="+this.advanceSearchParams.maxIBU
    }
    if(this.advanceSearchParams.maxABV){
      params += "&abv_lt="+this.advanceSearchParams.maxABV
    }
    if(this.advanceSearchParams.maxEBC){
      params += "&ebc_lt="+this.advanceSearchParams.maxEBC
    }
    if(this.advanceSearchParams.minIBU){
      params += "&ibu_gt="+this.advanceSearchParams.minIBU
    }
    if(this.advanceSearchParams.minABV){
      params += "&abv_gt="+this.advanceSearchParams.minABV
    }
    if(this.advanceSearchParams.minEBC){
      params += "&ebc_gt="+this.advanceSearchParams.minEBC
    }
    if(this.advanceSearchParams.brewedBefore){
      params += "&brewed_before="+this.advanceSearchParams.brewedBefore
    }
    if(this.advanceSearchParams.brewedAfter){
      params += "&brewed_after="+this.advanceSearchParams.brewedAfter
    }
    return params;
  }
  getBeersApi = function(){
    var api = "https://api.punkapi.com/v2/beers?page="+(++this.beersPage);
    api += this.beerSearchName !== "" ? "&beer_name="+this.beerSearchName: "";
    api += this.getAdvanceSearchParams();
    return api;
  };
  loadBeers = function (){
    var self = this;
    fetch(this.getBeersApi()).then(res=>res.json())
    .then(function(result){
      self.setState({
        beers: self.state.beers.concat(result),
        moreBeersToLoad: result.length < 25 ? false : true
      });
      self.loadingBeers = false;
    });
  };
  loadMoreBeers= function(){
    if(!this.loadingBeers){
      this.loadingBeers = true;
      this.loadBeers();
    }
  }
  componentDidMount = function(){
    this.loadBeers();
  };
  goHome = function(){
    this.setState({
      showFavorite: false
    });
  };

  goFavorite = function(){
    this.setState({
      showFavorite: true
    });
  };
  closeAvanceSearch = function(){
    this.setState({
      advanceSearch: false
    });
  };
  openAdvanceSearch = function(){
    this.setState({
      advanceSearch: true
    });
  };
  advanceSearch = function(searchParams){
    this.beersPage = 0;
    this.advanceSearchParams = searchParams;
    this.setState({
      advanceSearch: false,
      beers: [],
      moreBeersToLoad: true
    });
    this.loadBeers();
  };
  clearSearch = function(){
    this.beersPage = 0;
    this.beerSearchName = "";
    this.advanceSearchParams = {};
    this.setState({
      beers: [],
      moreBeersToLoad: true
    });
    this.loadBeers();
  }
  getAdvaceSearch = function(){
    if(this.state.advanceSearch){
      return (<AdvanceSearchCard closeCard={this.closeAvanceSearch.bind(this)} search={this.advanceSearch.bind(this)}/>);
    }else{
      return null;
    }
  };
  render() {
    return (
      <div className="App">
        <Header isReal={true} goHome={this.goHome.bind(this)} goFavorite={this.goFavorite.bind(this)} showFavorite={this.state.showFavorite}/>
        <Body selectedBeer={this.showBeerDetail.bind(this)} moreBeersToLoad={this.state.moreBeersToLoad} 
            showFavorite={this.state.showFavorite} beers={this.state.beers} loadMoreBeers={this.loadMoreBeers.bind(this)}
            search={this.search.bind(this)} openAdvanceSearch={this.openAdvanceSearch.bind(this)} clearSearch={this.clearSearch.bind(this)}/>
        {this.getDetailedCard()}
        {this.getAdvaceSearch()}
      </div>
    );
  }
}

export default App;
