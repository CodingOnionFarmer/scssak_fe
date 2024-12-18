import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import MainRoute from './MainRoute';

import {
  loginRoute,
  mainRoute,
  boardRoute,
  articleWriteRoute,
  articleEditRoute,
  mailboxRootRoute,
  mailboxRoute,
  mailWriteRoute,
  profileRoute,
  profileEditRoute,
} from './Routes';

import LoginPage from '../pages/LoginPage';
import ArticleBoardPage from '../pages/ArticleBoardPage';
import ArticleWritePage from '../pages/ArticleWritePage';
import ArticleEditPage from '../pages/ArticleEditPage';
import ArticleDetailPage from '../pages/ArticleDetailPage';
import MailboxListPage from '../pages/MailboxListPage';
import MailboxPage from '../pages/MailboxPage';
import MailWritePage from '../pages/MailWritePage';
import ProfilePage from '../pages/ProfilePage';
import ProfileEditPage from '../pages/ProfileEditPage';
import NotFoundPage from '../pages/NotFoundPage';

import LayoutWithHeaderAndNav from '../components/layout/LayoutWithHeaderAndNav';
import LayoutWithSearchHeaderAndNav from '../components/layout/LayoutWithSearchHeaderAndNav';
import LayoutWithNav from '../components/layout/LayoutWithNav';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 루트 경로 main으로 연결 */}
        <Route exact path="/" element={<Navigate to={mainRoute} replace />} />

        {/* 로그인 시 접근 제한 */}
        <Route element={<PublicRoute />}>
          <Route path={loginRoute} element={<LoginPage />} />
        </Route>

        {/* 비로그인 시 접근 제한 */}
        <Route element={<ProtectedRoute />}>
          <Route path={mainRoute} element={<MainRoute />} />
          {/* logo header, bottom nav 모두 있는 경우 */}
          <Route element={<LayoutWithHeaderAndNav />}>
            <Route path={mailboxRootRoute} element={<MailboxListPage />} />
            <Route path={mailboxRoute} element={<MailboxPage />} />
            <Route path={profileRoute} element={<ProfilePage />} />
          </Route>

          {/* serach header, bottom nav 모두 있는 경우 */}
          <Route element={<LayoutWithSearchHeaderAndNav />}>
            <Route path={boardRoute} element={<ArticleBoardPage />} />
          </Route>

          {/* bottom nav만 있는 경우 */}
          <Route element={<LayoutWithNav />}>
            <Route
              path={boardRoute + '/:articleId'}
              element={<ArticleDetailPage />}
            />
            <Route
              path={articleEditRoute + '/:articleId'}
              element={<ArticleEditPage />}
            />
            <Route path={mailWriteRoute} element={<MailWritePage />} />
            <Route path={profileEditRoute} element={<ProfileEditPage />} />
          </Route>

          {/* 둘 다 없는 경우 */}
          <Route path={articleWriteRoute} element={<ArticleWritePage />} />
          <Route path={articleEditRoute} element={<ArticleEditPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
