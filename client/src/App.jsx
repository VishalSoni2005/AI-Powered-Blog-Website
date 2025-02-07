import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.component';
import AuthForm from './pages/userAuthForm.page';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route path="/signin" element={<AuthForm type="sign-in" />} />
                <Route path="/signup" element={<AuthForm type="sign-up" />} />
            </Route>
        </Routes>
    );
};

export default App;
