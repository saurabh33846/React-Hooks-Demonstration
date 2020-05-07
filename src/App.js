import React, {useContext} from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';

import {AuthContext} from './context/auth-context';

const App = props => {
  const authcontext = useContext(AuthContext);
  let content = <Auth></Auth>
  if(authcontext.isAuth){
    content = <Ingredients></Ingredients>
  }
  return content;
};

export default App;
