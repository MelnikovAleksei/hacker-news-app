import React from 'react';

import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <h1>Hacker news app</h1>
      <nav>
        <ul>
          <NavLink
            to="/hacker-news-app"
            activeClassName=""
          >
            News List
          </NavLink>
        </ul>
      </nav>
    </header>
  )
}
