import { Result } from 'antd';
import { authLink, dashboardLink, landingLink } from './data/link';
import { useAuth } from './hooks';
import { AuthLayout, DashboardLayout, LandingLayout } from './layouts';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import './index.css';
import { flattenLandingLinks } from './utils/landingLink';
import { Notfound } from './pages/result';
import { Settings } from './pages/dashboard';
import { OwnerStoreProvider, ProfileStoreProvider } from './providers';

function App() {
  const { user } = useAuth();
  const flatLandingLinks = flattenLandingLinks(landingLink);

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <LandingLayout />,
          children: [
            // Tambahkan route dari landingLink
            ...flatLandingLinks.map(({ path, element: Element }) => ({
              path,
              element: <Element />
            })),

            { path: '*', element: <Notfound /> }
          ]
        },
        {
          element: (
            <>
              <OwnerStoreProvider>
                <ProfileStoreProvider>
                  <DashboardLayout />
                </ProfileStoreProvider>
              </OwnerStoreProvider>
            </>
          ),
          children: [
            ...dashboardLink.flatMap(({ children }) =>
              children.map(({ permissions, roles, path, element: Element }) => {
                const hasPermissions = permissions && permissions.length > 0;
                const hasRoles = roles && roles.length > 0;
                const userCantDoAnyOfThat = hasPermissions && (!user || user.cantDoAny(...permissions));
                const userIsNotInAnyOfThatRole = hasRoles && (!user || !roles.some((role) => user.is(role)));

                if (userCantDoAnyOfThat && userIsNotInAnyOfThatRole) {
                  return {
                    path,
                    element: <Result status="403" subTitle="Anda tidak memiliki akses ke halaman ini" title="Forbidden" />
                  };
                }
                return {
                  path,
                  element: <Element />
                };
              })
            ),
            { path: '/dashboard/settings', element: <Settings /> }
          ]
        },
        {
          element: <AuthLayout />,
          children: authLink.map(({ path, element: Element }) => ({
            path,
            element: <Element />
          }))
        }
      ])}
    />
  );
}

export default App;
