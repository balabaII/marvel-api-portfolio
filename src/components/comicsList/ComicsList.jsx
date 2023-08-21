import { useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';



const ComicsList = () => {
    const [comics, setComics] = useState([]),
        [addComicsLoading, setAddComicsLoading] = useState(false),
        [offset, setOffset] = useState(300),
        {loading, error, clearError, getAllComics} = useMarvelService();

    useEffect( ()=>{
        console.log( 'useEffect')
        addComics();
    }, [] );


    const addComics = () =>{
        setAddComicsLoading(true);
        getAllComics(offset)
            .then( onComicsLoaded )
    };


    const onComicsLoaded = ( newComics ) =>{
        setComics(comics => [...comics, ...newComics ]);
        setOffset( offset => offset + 8 );
        setAddComicsLoading(false);
    };


    const comicsList = comics.map( ( item, index ) => <ListItem key = {index}  comics = {item}/>),
        errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null;

            
    return (
        <div className="comics__list">
            <ul className="comics__grid">
               {comicsList}  
            </ul>
            {errorMessage || spinner} 
            <button 
                onClick={addComics} 
                disabled={addComicsLoading} 
                className="button button__main button__long">

                <div className="inner">load more</div>
            </button>
        </div>
    );//return 
};



const ListItem = ( {comics} ) =>{
    return (
        <li className="comics__item">
            <a href="#">
                <img src={comics.thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{comics.title}</div>
                <div className="comics__item-price">{comics.price}</div>
            </a>
        </li>
    );
};

export default ComicsList;