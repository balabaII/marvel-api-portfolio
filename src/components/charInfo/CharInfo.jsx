import { useState, useEffect } from 'react';
import useMarvelService from '../../hooks/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) =>{
    const [character, setCharacter] = useState(null);
    const {clearError, process, setProcess, getCharacter} = useMarvelService();

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
            .then( ()=> setProcess('confirmed') );
    };


    
    return (
        <div className="char__info">
            { setContent(process, View, character) }
        </div>
    );
};




const View = ( {data} ) =>{
    const {name, thumbnail, description, homepage, wiki, comics} = data,
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