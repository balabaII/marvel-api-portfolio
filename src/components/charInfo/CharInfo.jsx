import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

const CharInfo = (props) =>{
    const [character, setCharacter] = useState(null);
    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect( () =>  updateHero() , [] );
    useEffect( () =>  updateHero() , [props.heroId] );




    const onHeroLoaded = (character) => {
        setCharacter( character );
        clearError();
    };

    const updateHero = () =>{
        const { heroId } = props;
        if(!heroId) {
            return;
        };


        getCharacter( heroId )
            .then( onHeroLoaded)
    };

  

    const skeleton =  character || loading || error ? null : <Skeleton/>,
        errorMessage = error ? <ErrorMessage/> : null, 
        spinner = loading ? <Spinner/> : null, 
        content = !(loading || error ) ? <View character = {character}/> : null;
    
    return (
        <div className="char__info">
            {skeleton || spinner || errorMessage || content}
        </div>
    );//return
};//class


const View = ( {character} ) =>{
    const {name, thumbnail, description, homepage, wiki, comics} = character,
        imgStyle = thumbnail.indexOf('image_not_available.jpg') !==  -1 ? { objectFit: 'fill'} : null,
        comicsList = comics.map( (item, index) => {
                        return (
                            <li className='char__comics-item' key={index}>
                                <a target='_blank' href={item.resourceURL}> {item.name} </a>
                            </li>
                        );
                    });//map

    return (
    <>
        <div className="char__basics">
            <img style={ imgStyle } src={thumbnail} alt="abyss"/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
           {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            { comics.length === 0 ? <div>Character has not been in comics so far</div> : comicsList.slice(0,10)}
        </ul>
    </>
    );
};

export default CharInfo;