import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Content } from 'react-bulma-components';
import { RoleNavbar } from './components/RoleNavbar';
import { Index } from './pages/Index';

function App() {
  return <BrowserRouter>
    <RoleNavbar />
    <Content>
      <Route exact path="/" component={Index} />
    </Content>
  </BrowserRouter>
}

export default App;
