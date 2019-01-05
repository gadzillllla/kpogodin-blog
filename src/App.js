import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import Header from './components/Header';
import MainContent from './components/MainContent';
import About from './components/About';
import TopTitle from './components/TopTitle';
import Routes from './lib/routes';
import Video from './components/Video';
import PostEditor from './components/PostEditor/';
import LoginForm from './components/LoginForm/';
import './App.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className={App}>
        <Header />
        <div className="content">
          {/* <TopTitle /> */}
          <Route exact path={Routes.rootPath} component={MainContent} />
          <Route path={Routes.aboutPath} component={About} />
          <Route path={Routes.videoPath} component={Video} />
          <Route path={Routes.postEditor} component={PostEditor} />
          <LoginForm />
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
