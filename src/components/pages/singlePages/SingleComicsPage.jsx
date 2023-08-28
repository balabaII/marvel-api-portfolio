import { Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import withSinglePage from './withSinglePage';
import './singlePage.scss';

const View = ( {data} ) =>{
    const {title, description, thumbnail, price, pageCount, language} = data;
    return (
        <>

        <Helmet>
            <title>{title}</title>
            <meta name="description " content={`${title} comic`}/>
        </Helmet>

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
        </>  
    );
};

const SingleComicPage = withSinglePage(View, 'comic');
export default SingleComicPage;