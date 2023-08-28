import { Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import withSinglePage from './withSinglePage';
import './singlePage.scss';

const View = ( {data} ) =>{
    const {title, description, thumbnail} = data;
    return (
        <>
        <Helmet>
            <title>{title}</title>
            <meta name="description " content={`${title} page`}/>
        </Helmet>
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to='/' className="single-comic__back">Back to all</Link>
        </div>
        </>
        
    )
};

const SingleCharacterPage = withSinglePage(View, 'character');
export default SingleCharacterPage;