import { Component, useState, useEffect} from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png'


const RandomChar = () =>{
    const [character, setCharacter] = useState({});
    const {loading, error, clearError, getCharacter} = useMarvelService();


    useEffect( ()=> {
        updateHero();
    },[]);


    const onHeroLoaded = (character) =>{
        setCharacter(character);
        clearError();
    };

    const updateHero = () =>{
        const id = Math.floor( Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then( onHeroLoaded );
    };

    


    const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null, 
        content = !(loading || error) ? <View char = {character}/> : null;
    
    return (
        <div className="randomchar">
            {spinner || errorMessage || content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateHero} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/> 
            </div>
        </div>
    );//return 
    
};//RandomChar


const View = ( {char} ) => {
    let { name, description, thumbnail, homepage, wiki} = char;
    let imgStyle;
    if( thumbnail ) imgStyle =  thumbnail.indexOf('image_not_available.jpg') !==  -1 ? { objectFit: 'fill'} : null;
    if( !description ) description = "Sorry, seems like there was not any description for that character";

    return (
        <div className="randomchar__block">
            <img style={ imgStyle } src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description.slice(0,200)} 
                </p>
                <div className="randomchar__btns">
                    <a href = {homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href= {wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;