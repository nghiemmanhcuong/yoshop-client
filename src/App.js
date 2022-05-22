import React from 'react';
import Routers from './routers/Routers';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';

import {useLocation} from 'react-router-dom';

const App = () => {
    const location = useLocation();

    return (
        <div className='app'>
            {location.pathname != '/checkouts' ? (
                <>
                    <Header />
                    <Navigation />
                    <MobileMenu />
                    <Routers />
                    <Footer />
                </>
            ) : (
                <Routers />
            )}
        </div>
    );
};

export default App;
