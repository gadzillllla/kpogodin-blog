import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import Header from './components/Header';
import MainContent from './components/MainContent';
import About from './components/About';
import Routes from './lib/routes';
import PostEditor from './components/PostEditor/';
import LoginForm from './components/LoginForm/';
import 'antd/lib/style/index.css';
import './App.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className={App}>
        <Header />
        <div className="content">
          <Route exact path={Routes.rootPath} component={MainContent} />
          <Route path={Routes.aboutPath} component={About} />
          <Route path={Routes.postEditor} component={PostEditor} />
          <LoginForm />
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
