import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { SingleNewsPage } from './features/news/SingleNewsPage';
import { Footer } from './components/Footer';
import { PageNotFound } from './components/PageNotFound';

function App() {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <Main />
            </React.Fragment>
          )}
        />
        <Route exact path="/news/:newsId" component={SingleNewsPage}/>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
