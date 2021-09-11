import React, { FC } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Alert from './Alert';
import { Chat } from './Chat';
import { Home } from './Home';
import { Navbar } from './Navbar';
import { NotFound } from './NotFound';

interface Props {
};

const Router = ({  }: Props): JSX.Element => {
  return (
    <BrowserRouter>
          <div className='App'>
            {/* <Navbar /> */}
            <div className="container">
              <Alert/>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/chat' component={Chat} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
  );
}

export default Router;
