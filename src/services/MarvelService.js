class MarvelService{
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=9f2034a6209467732ba4896dbfad3a89';
    _baseCharacterOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);
        if( !res.ok ) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }



    getAllCharacters = async (offset = this._baseCharacterOffset) =>{
        const result = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return result.data.results.map( this._transformData )
    }

    getCharacter = async (id) =>{
        const result = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformData(result.data.results[0])
    }

    _transformData = (character) =>{
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
};


export default MarvelService;