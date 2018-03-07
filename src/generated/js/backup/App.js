// App
// 
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in Visual Paradigm.

var initApp = require('./initApp');
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import OTB_Root from './react-component/OTB_Root';
import OTB_HomePage from './react-component/OTB_HomePage';
import OTB_CommandsPage from './react-component/OTB_CommandsPage';
import OTB_LevelsPointsPage from './react-component/OTB_LevelsPointsPage';
import OTB_PlaylistPage from './react-component/OTB_PlaylistPage';
import OTB_LoginPage from './react-component/OTB_LoginPage';
import OTB_UserCommandsPage from './react-component/OTB_UserCommandsPage';
import OTB_UserPointsPage from './react-component/OTB_UserPointsPage';
import OTB_UserLevelsPage from './react-component/OTB_UserLevelsPage';
import OTB_PortfolioPage from './react-component/OTB_PortfolioPage';
import OTB_RepositoryPage from './react-component/OTB_RepositoryPage';
import OTB_PluginPage from './react-component/OTB_PluginPage';

$(window).load(function() {
   ReactDOM.render(
       <Router>
           <OTB_Root>
               <Route path='/' exact render={(props) => (<OTB_HomePage {...props} />)} />
               <Route path='/home' render={(props) => (<OTB_HomePage {...props} />)} />
               <Route path='/commands' render={(props) => (<OTB_CommandsPage {...props} />)} />
               <Route path='/levelspoints' render={(props) => (<OTB_LevelsPointsPage {...props} />)} />
               <Route path='/playlist' render={(props) => (<OTB_PlaylistPage {...props} />)} />
               <Route path='/login/:code' render={(props) => (<OTB_LoginPage {...props} />)} />
               <Route path='/user/:username/commands' render={(props) => (<OTB_UserCommandsPage {...props} />)} />
               <Route path='/user/:username/points' render={(props) => (<OTB_UserPointsPage {...props} />)} />
               <Route path='/user/:username/levels' render={(props) => (<OTB_UserLevelsPage {...props} />)} />
               <Route path='/portfolio' render={(props) => (<OTB_PortfolioPage {...props} />)} />
               <Route path='/repository' render={(props) => (<OTB_RepositoryPage {...props} />)} />
               <Route path='/plugin/:pluginid' render={(props) => (<OTB_PluginPage {...props} />)} />
           </OTB_Root>
       </Router>,
       document.getElementById('app-container')
   );
});

