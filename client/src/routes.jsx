import Landing from './pages/Landing';
// import Login from '../pages/Login';
// import Dashboard from '../pages/Dashboard';
// import Availability from '../pages/Availability';
// import Bookings from '../pages/Bookings';
// import PublicBooking from '../pages/PublicBooking';
// import BookingSuccess from '../pages/BookingSuccess';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  { path: '/', element: <Landing /> },
//   { path: '/login', element: <Login /> },

//   {
//     path: '/dashboard',
//     element: (
//       <ProtectedRoute>
//         <Dashboard />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/dashboard/availability',
//     element: (
//       <ProtectedRoute>
//         <Availability />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/dashboard/bookings',
//     element: (
//       <ProtectedRoute>
//         <Bookings />
//       </ProtectedRoute>
//     ),
//   },

//   { path: '/:username', element: <PublicBooking /> },
//   { path: '/:username/success', element: <BookingSuccess /> },
];

export default routes;
