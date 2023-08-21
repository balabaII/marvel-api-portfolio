import xMen from '../../resources/img/x-men.png';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SingleComicPage = ()  => {
    const [comic, setComic] = useState({}),
        {loading, error, clearError, getComic} = useMarvelService(),
        {comicId} = useParams();


    useEffect( ()=>{
        updateComic();
    }, [comicId] )

    const onComicLoaded = (newComic) =>{
        setComic( newComic );
        clearError();
    };

    const updateComic = () =>{
        getComic(comicId)
            .then( onComicLoaded );
    };


    const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error || !comic) ? <View comic={comic} /> : null;
    
    return (
        <>
        {errorMessage || loading || content} 
        </>
        
    );
};


const View = ( {comic} ) =>{
    const {title, description, thumbnail, price, pageCount, language} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} Pages</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}
export default SingleComicPage;