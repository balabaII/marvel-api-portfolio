import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy( ()=> import('../pages/404') );
const MainPage = lazy( () => import('../pages/MainPage') );
const ComicsPage = lazy( () => import('../pages/ComicsPage') );
const SingleComicPage = lazy( () => import('../pages/SingleComicsPage') );





const App = () =>{
     return (
        <Suspense fallback = {<Spinner/>}>
            <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>} />
                        <Route path="*" element={<Page404/>} />
                    </Routes>
                </main>
            </div>
            </Router>
        </Suspense>
    );
    
};

export default App;