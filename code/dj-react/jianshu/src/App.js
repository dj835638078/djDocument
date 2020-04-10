import React from 'react';
import { GlobalStyled } from './style.js'
import { IconStyled } from './static/iconfont/iconfont'
import Header from './common/header'
import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyled />
      <IconStyled />
      <Header />
    </Provider>
  );
}

export default App;
