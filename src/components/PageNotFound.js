import React from 'react';

import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <main>
      <h3>404 Page not found</h3>
      <Link to="/hacker-news-app">Back to news list</Link>
    </main>
  )
}
