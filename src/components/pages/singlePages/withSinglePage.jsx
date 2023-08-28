import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../../hooks/MarvelService';
import setContent from '../../../utils/setContent';

import AppBanner from '../../appBanner/AppBanner';

const withSinglePage = (Component, dataType ) =>{
    return (props) => {
        const [data, setData] = useState(),
            {id} = useParams(),
            {process, setProcess, clearError, getCharacter, getComic} = useMarvelService();

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
                        .then( onDataLoaded)
                        .then( () => setProcess('confirmed') );
                    break;
                case "character" :
                    getCharacter( id )
                        .then( onDataLoaded )
                        .then( () => setProcess('confirmed') );
                    break;
            };
        };

        return (
            <>
            <AppBanner/>
            {setContent( process, Component, data) }
            </>
        )
    }
};

export default withSinglePage;