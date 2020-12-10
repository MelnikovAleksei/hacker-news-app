import React from 'react';

import { useSelector } from 'react-redux';

import { selectNewsById } from './newsSlice';

import { secToString } from '../../utils/secToString';

import { Link } from 'react-router-dom';

import { Section } from '../../components/Section';

export const SingleNewsPage = ({ match }) => {
  const { newsId } = match.params;

  const newsData = useSelector(state => selectNewsById(state, newsId));

  if (!newsData) {
      return (
          <Section>
              <h2>News not found!</h2>
              <Link to="/">Back to news list</Link>
          </Section>
      )
  }

  return (
    <Section>
      <article>
        <a
          href={newsData.url}
          target="_blank"
          rel="noreferrer"
        >
          Link to news
        </a>
        <h2>
          {newsData.title}
        </h2>
        <p>
          Date: {secToString(newsData.time)}
        </p>
        <p>
          By: {newsData.by}
        </p>
        <p>
          Comments: {newsData.kids ? newsData.kids.length : '0'}
        </p>
        <Link to="/">Back to news list</Link>
      </article>
    </Section>
  )
}
