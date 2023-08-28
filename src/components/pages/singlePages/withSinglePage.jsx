import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';

import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import AppBanner from '../../appBanner/AppBanner';

const withSinglePage = (Component, dataType ) =>{
    return (props) => {
        const [data, setData] = useState(),
            {id} = useParams(),
            {loading, error, clearError, getCharacter, getComic} = useMarvelService();

        useEffect( ()=>{
            updateData();
        }, [id] );
        

        
        const onDataLoaded = (item) =>{
            setData( item );
            clearError();
        };

        const updateData = () =>{
            switch( dataType ){
                case "comic":
                    getComic( id )
                        .then( onDataLoaded);
                    break;
                case "character" :
                    getCharacter( id )
                        .then( onDataLoaded );
                    break;
            };
        };

        const errorMessage = error ? <ErrorMessage/> : null,
            spinner = loading ? <Spinner/> : null,
            content = !(loading || error || !data) ? <Component {...props} data={data} /> : null;
        
        return (
            <>
            <AppBanner/>
            {spinner}
            {errorMessage}
            {content}
            </>
        )
    }
};

export default withSinglePage;