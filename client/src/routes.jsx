import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardHome from './pages/Dashboard/DashboardHome';
import Bookings from './pages/Dashboard/Bookings';
import Availability from './pages/Dashboard/Availability';
import PublicBooking from './pages/PublicBooking';
import BookingSuccess from './pages/BookingSuccess';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },

  {
    path: '/dashboard',
    element: (
      // <ProtectedRoute>
        <DashboardHome />
      //  {/* </ProtectedRoute> */}
    ),
  },
  {
    path: '/dashboard/availability',
    element: (
      // <ProtectedRoute>
        <Availability />
      // </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/bookings',
    element: (
      <ProtectedRoute>
        <Bookings />
      </ProtectedRoute>
    ),
  },

  { path: '/:username', element: <PublicBooking /> },
  { path: '/:username/success', element: <BookingSuccess /> },
];

export default routes;
