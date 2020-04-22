import React from 'react';
import { GlobalStyled } from './style.js'
import { IconStyled } from './static/iconfont/iconfont'
import Header from './common/header'
import store from './store'
import { Provider } from 'react-redux'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Detail from './pages/detail'
import Login from './pages/login'
import Writer from './pages/writer'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyled />
      <IconStyled />
      <HashRouter>
        <Header />
        <Switch>
          <Route path='/' exact><Home /></Route>
          {/* 这样写才能通过props回去到url中的参数 */}
          <Route path='/detail/:id' exact component={Detail}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/writer' exact component={Writer}></Route>
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
