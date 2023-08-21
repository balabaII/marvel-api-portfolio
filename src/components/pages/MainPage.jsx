import { useState } from "react"

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const MainPage = () =>{
    const [selectedHero, setSelectedHero] = useState(null);
    const onHeroSelected = (id) =>{
        setSelectedHero( id );
    };

    return(
        <>
        <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
            <ErrorBoundary>
                <CharList onHeroSelected={onHeroSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
                <CharInfo heroId={selectedHero} />
            </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
};

export default MainPage;