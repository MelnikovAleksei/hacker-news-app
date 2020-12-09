import React from 'react';

import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div>
      <h3>404 Page not found</h3>
      <Link to="/">Back to news list</Link>
    </div>
  )
}
