import { Helmet } from "react-helmet";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";


const ComicsPage = () =>{
    return (
        <>
        <Helmet>
            <title>Comics Page</title>
            <meta name="Marvel Comics Page" content="Marvel comics page with list of the comics"/>
        </Helmet>
        <AppBanner/>
        <ErrorBoundary>
            <ComicsList/>
        </ErrorBoundary>
        </>
    )
}

export default ComicsPage;