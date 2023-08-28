import { useState, useEffect, useRef, memo} from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../hooks/MarvelService';
import setContentList from '../../utils/setContentList';

import './charList.scss';






const CharList = (props) =>{
    const [characters, setCharacters] = useState([]),
        [addHeroesLoading, setAddHeroesLoading] =  useState(false),
        [limit, setLimit] = useState(false),
        [offset, setOffset] = useState(210);
    
     const {clearError, process, setProcess, getAllCharacters} = useMarvelService();

    const refList = useRef([]);

    const onFocus = (index) =>{
        refList.current.forEach( ref => ref.classList.remove('char__item_selected') );
        refList.current[index].classList.add('char__item_selected');
        refList.current[index].focus();
    };


    useEffect( () => {
        addHeroes(offset, true);
    }, [] ); 

    const addHeroes = (offset, initial) =>{
        initial ? setAddHeroesLoading(false) : setAddHeroesLoading(true);
        getAllCharacters(offset)
            .then( onHeroesLoaded )
            .then( () => setProcess('confirmed') )
    };

    const onHeroesLoaded = async (newCharacters) =>{
        setCharacters(characters => [...characters, ...newCharacters]);
        setAddHeroesLoading(false);
        setOffset(offset => offset + 9);
        setLimit( newCharacters.length !== 9);
        clearError();
    };

    const characterList = characters ?
                    <ul className="char__grid">
                        {characters.map(({name, thumbnail, id}, index ) => {
                        return (
                            <ListItem 
                                key={index} 
                                onHeroSelected = {props.onHeroSelected}
                                onFocus = {onFocus}
                                refList = {refList} index = {index}
                                name={name}  thumbnail={thumbnail} id={id} />
                                )})} 
                    </ul> : null ;


    return (
        <div className="char__list">
            {setContentList(process, () => characterList, addHeroesLoading)}
            <button className="button button__main button__long"
                    disabled={addHeroesLoading}
                    onClick={() => addHeroes(offset)}
                    style={ limit ? { display : "none" } : null }>
                <div className="inner">load more</div>
            </button>
        </div>
    );
};



const ListItem = (props) => {  
    const {name, thumbnail, onHeroSelected, onFocus, id, refList, index} = props
    const imgStyle = thumbnail.indexOf('image_not_available.jpg') !==  -1 ? { objectFit: 'fill'} : null;

    return (
        <li className="char__item" tabIndex="0"
                            ref = {e => refList.current[index] = e}  
                            onClick={() => onHeroSelected(id)}
                            onFocus={() => onFocus(index)}>
            <img style={ imgStyle } src={thumbnail} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    );
   
};




CharList.propTypes  = {
    onHeroSelected : PropTypes.func.isRequired,
};

export default memo(CharList);