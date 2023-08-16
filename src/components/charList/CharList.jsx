import { Component, createRef} from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component{
    constructor(props){
        super(props);
    };


    state = {
        characters : [],
        loading : true,
        error : false,
        addHeroesLoading: false,
        offset : 210,
        limit: false,
    };

    marvelService = new MarvelService();



    refList = [];
    
    setRefs = item => {
        this.refList.push( item );
    };

    onFocus = (item) =>{
        this.refList.forEach( ref => {
            ref.classList.remove('char__item_selected');
            if( item === ref) ref.classList.add('char__item_selected');
        });
    };






    componentDidMount(){
        this.addHeroes(); 
    };


    addHeroes = (offset) =>{
        this.addHeroesLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then( this.onHeroesLoaded )
            .catch(this.onError);
    };
 
    addHeroesLoading = () => {
        this.setState( {addHeroesLoading : true} );
    };

    onHeroesLoaded = (newCharacters) =>{
        this.setState( ({characters, offset}) => ({ 
            characters :[...characters , ...newCharacters], 
            loading : false, 
            error: false, 
            addHeroesLoading : false,
            offset : offset + 9,
            limit : newCharacters.length !== 9,
        }));
    };

    onError = () =>{
        this.setState( { loading : false  , error: true });
    };




    render(){
        const {characters, loading, error, addHeroesLoading, offset, limit} = this.state,
            characterList = characters.map(( {name, thumbnail, id}, index) => <View 
                                                                        onHeroSelected = {this.props.onHeroSelected}
                                                                        toRef = {this.setRefs}
                                                                        onFocus = {this.onFocus}
                                                                        name={name}  thumbnail={thumbnail} id={id} key={id} />),
            errorMessage = error ? <ErrorMessage/> : null,
            spinner = loading ? <Spinner/> : null,
            content = !(loading || error) ? <ul className="char__grid">{characterList}</ul>  : null ;

        return (
            <div className="char__list">
                {spinner || errorMessage || content}
                <button className="button button__main button__long"
                        disabled={addHeroesLoading}
                        onClick={() => this.addHeroes(offset)}
                        style={ limit ? { display : "none" } : null }>
                    <div className="inner">load more</div>
                </button>
            </div>
        );//return
    };//render
};//class



class View extends Component{ 
    constructor(props){
        super(props);
    };


    render(){
        const {name, thumbnail, onHeroSelected, onFocus, id, toRef} = this.props
        const imgStyle = thumbnail.indexOf('image_not_available.jpg') !==  -1 ? { objectFit: 'fill'} : null;
        return (
            <li className="char__item" tabIndex="0"
                                ref = {toRef}  
                                onClick={() => onHeroSelected(id)}
                                onFocus={(event) => onFocus(event.target)}>
                <img style={ imgStyle } src={thumbnail} alt="abyss"/>
                <div className="char__name">{name}</div>
            </li>
        );
    };
   
};




CharList.propTypes  = {
    onHeroSelected : PropTypes.func.isRequired,
}

export default CharList;