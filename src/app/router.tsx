import { createHashRouter } from 'react-router-dom';
import { App } from './App';
import { AboutPage } from '../pages/About';
import { BookmarksPage } from '../pages/Bookmarks';
import { FeatureDetailPage } from '../pages/FeatureDetail';
import { GlossaryPage } from '../pages/Glossary';
import { HomePage } from '../pages/Home';
import { NotFoundPage } from '../pages/NotFound';
import { SearchPage } from '../pages/Search';
import { WorkflowDetailPage } from '../pages/WorkflowDetail';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/feature/:id', element: <FeatureDetailPage /> },
      { path: '/workflow/:id', element: <WorkflowDetailPage /> },
      { path: '/glossary', element: <GlossaryPage /> },
      { path: '/bookmarks', element: <BookmarksPage /> },
      { path: '/about', element: <AboutPage /> }
    ]
  }
]);
