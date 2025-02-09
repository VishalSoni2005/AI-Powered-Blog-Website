import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.component';
import AuthForm from './pages/userAuthForm.page';
import { createContext, useEffect, useState } from 'react';
import { lookInSession } from './common/session';

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});
  useEffect(() => {
    let userInSession = lookInSession('user');  //* this fetches jwt token from session as accrss token
    
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
}, []);

return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/signin" element={<AuthForm type="sign-in" />} />
          <Route path="/signup" element={<AuthForm type="sign-up" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;

// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/navbar.component';
// import AuthForm from './pages/userAuthForm.page';
// import { createContext, useEffect, useState } from 'react';
// import { lookInSession } from './common/session';

// export const UserContext = createContext({});

// const App = () => {
//   const [userAuth, setUserAuth] = useState({ access_token: null });

//   useEffect(() => {
//     let userInSession = lookInSession('user');

//     userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
//   }, []);

//   return (
//     <UserContext.Provider value={{ userAuth, setUserAuth }}>
//       <Routes>
//         <Route path="/" element={<Navbar />} />
//         <Route path="/signin" element={<AuthForm type="sign-in" />} />
//         <Route path="/signup" element={<AuthForm type="sign-up" />} />
//       </Routes>
//     </UserContext.Provider>
//   );
// };

// export default App;