import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component{
    state = {
        selectedHero : null,
    };

    onHeroSelected = (id) =>{
        this.setState( {selectedHero : id });
    };

    render(){
        const id = this.state.selectedHero;
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onHeroSelected = {this.onHeroSelected}/>
                        <ErrorBoundary>
                            <CharInfo heroId = {id}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        );//return
    };//render
    
};//class

export default App;