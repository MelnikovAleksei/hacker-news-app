import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import { Main } from './components/Main';
import { ArticlesList } from './features/news/ArticlesList';
import { SingleNewsPage } from './features/news/SingleNewsPage';
import { Footer } from './components/Footer';
import { PageNotFound } from './components/PageNotFound';

function App() {

  return (
    <div className="App">
      <header>
        <h1>Hacker news app</h1>
      </header>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <Main>
                <ArticlesList />
              </Main>
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
