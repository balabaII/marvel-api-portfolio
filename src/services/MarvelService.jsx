import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp(),
        _apiBase = 'https://gateway.marvel.com:443/v1/public/',
        _apiKey = 'apikey=9f2034a6209467732ba4896dbfad3a89',
        _baseCharacterOffset = 210,
        _baseComicsOffset = 300;

    const getAllCharacters = async (offset = _baseCharacterOffset) =>{
        const result = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return result.data.results.map( _transformDataCharacter );
    }

    const getCharacter = async (id) =>{
        const result = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformDataCharacter( result.data.results[0] );
    };

    const getAllComics = async ( offset = _baseComicsOffset ) =>{
        const result = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return result.data.results.map( _transformDataComics );
    };

    const getComics = async(id) =>{
        const result = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformDataComics( result.data.result[0] );
    }




    const _transformDataComics = (comics) => {
        return {
            title : comics.title,
            description : comics.description,
            price : comics.prices[0].price,
            id: comics.id,
            thumbnail : `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
        }
    }

    const _transformDataCharacter = (character) =>{
        return {
            name : character.name,
            description : character.description, 
            thumbnail :  `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage :  character.urls[0].ulr,
            wiki :  character.urls[1].url,
            id : character.id,
            comics : character.comics.items,
        };
    };

    return { loading, error, clearError, getCharacter, getAllCharacters, getComics, getAllComics,  };
};


export default useMarvelService;