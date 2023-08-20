import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp(),
        _apiBase = 'https://gateway.marvel.com:443/v1/public/',
        _apiKey = 'apikey=9f2034a6209467732ba4896dbfad3a89',
        _baseCharacterOffset = 210;

    const getAllCharacters = async (offset = _baseCharacterOffset) =>{
        const result = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return result.data.results.map( _transformData )
    }

    const getCharacter = async (id) =>{
        const result = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformData(result.data.results[0])
    }

    const _transformData = (character) =>{
        return {
            name : character.name,
            description : character.description, 
            thumbnail :  `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage :  character.urls[0].ulr,
            wiki :  character.urls[1].url,
            id : character.id,
            comics : character.comics.items,
        }
    }

    return { loading, error, clearError, getCharacter, getAllCharacters };
};


export default useMarvelService;