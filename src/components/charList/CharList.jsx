import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) =>{

    const [characters, setCharacters] = useState([]),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(false),
        [addHeroesLoading, setAddHeroesLoading] =  useState(false),
        [limit, setLimit] = useState(false),
        [offset, setOffset] = useState(210);
    

    const marvelService = new MarvelService();



    const refList = useRef([]);
    


    const onFocus = (item) =>{
        refList.current.forEach( ref => {
            ref.classList.remove('char__item_selected');
            if( item === ref) ref.classList.add('char__item_selected');
        });
    };



    useEffect( () => {
        addHeroes();
    }, [] ); 



    const addHeroes = (offset) =>{
        setAddHeroesLoading(true)
        marvelService.getAllCharacters(offset)
            .then( onHeroesLoaded )
            .catch(onError);
    };

    const onHeroesLoaded = (newCharacters) =>{
        setCharacters(characters => [...characters, ...newCharacters]);
        setLoading(false);
        setError(false);
        setAddHeroesLoading(false);
        setOffset(offset => offset + 9);
        setLimit( newCharacters.length !== 9);
    };

    const onError = () =>{
        setError( true );
        setLoading( false );
    };


    const characterList = characters.map(( {name, thumbnail, id}, index) => <ListItem 
                                                                    onHeroSelected = {props.onHeroSelected}
                                                                    toRef = {refList}
                                                                    index = {index}
                                                                    onFocus = {onFocus}
                                                                    name={name}  thumbnail={thumbnail} id={id} key={id} />),
        errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error) ? <ul className="char__grid">{characterList}</ul>  : null ;

    return (
        <div className="char__list">
            {spinner || errorMessage || content}
            <button className="button button__main button__long"
                    disabled={addHeroesLoading}
                    onClick={() => addHeroes(offset)}
                    style={ limit ? { display : "none" } : null }>
                <div className="inner">load more</div>
            </button>
        </div>
    );//return
};//class



const ListItem = (props) => {  
    const {name, thumbnail, onHeroSelected, onFocus, id, toRef, index} = props
    const imgStyle = thumbnail.indexOf('image_not_available.jpg') !==  -1 ? { objectFit: 'fill'} : null;
    return (
        <li className="char__item" tabIndex="0"
                            ref = {e => toRef.current[index] = e}  
                            onClick={() => onHeroSelected(id)}
                            onFocus={(event) => onFocus(event.target)}>
            <img style={ imgStyle } src={thumbnail} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    );
   
};




CharList.propTypes  = {
    onHeroSelected : PropTypes.func.isRequired,
}

export default CharList;