import { useState } from "react"
import { Helmet } from "react-helmet";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import FormComponent from "../formComponent/FormComponent";

import decoration from '../../resources/img/vision.png';

const MainPage = () =>{
    const [selectedHero, setSelectedHero] = useState(null);
    const onHeroSelected = (id) =>{
        setSelectedHero( id );
    };

    return(
        <>
        <Helmet>
            <title>Marvel Information Page</title>
            <meta name="description" content="Marvel information portal main page"/>
        </Helmet>
        <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
            <ErrorBoundary>
                <CharList onHeroSelected={onHeroSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
                <div>
                    <CharInfo heroId={selectedHero} />
                    <FormComponent/>
                </div>
            </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
};

export default MainPage;