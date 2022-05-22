import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Pages from '../pages/Pages';
import Collections from '../pages/Collections';
import Products from '../pages/Products';
import Account from '../pages/Account';
import AccountAddresses from '../pages/AccountAddresses';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Forgot from '../pages/Forgot';
import ChangePassword from '../pages/ChangePassword';
import Cart from '../pages/Cart';
import Search from '../pages/Search';
import Checkouts from '../pages/Checkouts';
import CheckoutsSuccess from '../pages/CheckoutsSuccess';
import Contact from '../pages/Contact';
import Blogs from '../pages/Blogs';
import BlogDetail from '../pages/BlogDetail';
import PageNotFound from '../pages/PageNotFound';

const Routers = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pages/:page' element={<Pages />} />
            <Route path='/collections/:slug' element={<Collections />} />
            <Route path='/products/:slug' element={<Products />} />
            <Route path='/account' element={<Account />} />
            <Route path='/account/addresses' element={<AccountAddresses />} />
            <Route path='/account/register' element={<Register />} />
            <Route path='/account/login' element={<Login />} />
            <Route path='/account/forgot' element={<Forgot />} />
            <Route path='/account/change-password' element={<ChangePassword />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/search' element={<Search />} />
            <Route path='/search/:keyword' element={<Search />} />
            <Route path='/checkouts' element={<Checkouts />} />
            <Route path='/checkouts/success' element={<CheckoutsSuccess />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blog/:slug' element={<BlogDetail />} />
            <Route path='/404' element={<PageNotFound />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
};

export default Routers;
