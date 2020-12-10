import React from 'react';

import { Section } from '../components/Section';
import { ArticlesList } from '../features/news/ArticlesList';

export const Main = () => {
  return (
    <main>
      <Section>
        <ArticlesList />
      </Section>
    </main>
  )
}
