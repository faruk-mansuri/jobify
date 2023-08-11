import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Admin,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  EditJob,
} from './Pages';

// actions
import { action as registerAction } from './Pages/Register';
import { action as loginAction } from './Pages/Login';
import { action as addJobAction } from './Pages/AddJob';
import { action as editJobAction } from './Pages/EditJob';
import { action as deleteJobAction } from './Pages/DeleteJob';
import { action as profileAction } from './Pages/Profile';

// loaders
import { loader as dashboardLoader } from './Pages/DashboardLayout';
import { loader as allJobsLoader } from './Pages/AllJobs';
import { loader as editJobLoader } from './Pages/EditJob';
import { loader as adminLoader } from './Pages/Admin';
import { loader as statsLoader } from './Pages/Stats';

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddJob />, action: addJobAction },
          { path: 'admin', element: <Admin />, loader: adminLoader },
          { path: 'stats', element: <Stats />, loader: statsLoader },
          { path: 'profile', element: <Profile />, action: profileAction },
          { path: 'all-jobs', element: <AllJobs />, loader: allJobsLoader },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            action: editJobAction,
            loader: editJobLoader,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
