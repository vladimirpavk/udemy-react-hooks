import React, { useContext } from 'react';
import { AuthContext } from './components/context/auth-context';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';

const App = props => {
  const myContext = useContext(AuthContext);

  return(   
    <div>
      { myContext.isAuthenticated ? <Ingredients /> : <Auth /> } 
    </div>       
  );
};

export default App;
