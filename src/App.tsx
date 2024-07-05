// App.tsx
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistore } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import ProtectedRoute and PublicRoute
import { AdminProtectedRoute, AdminPublicRoute, RecruiterProtectedRoute, ApplicantProtectedRoute, PublicRoute } from './utils/protected';
// import { ProtectedRoute } from './utils/protected';

// // pages
import Home from './components/home/Content'

import AdminLoginForm from './components/register/adminLogin'
import AdminDash from './components/admin/dash/Content'

import SignupForm from './components/register/authSignup'
import LoginForm from './components/register/authLogin'
import EmailVerified from './components/register/emailVerified'


import RecruiterDash from './components/recruiter/dash/Content'
import RecruiterCareerDash from './components/recruiter/career/dash/Content'
import RecruiterCareerCreate from './components/recruiter/career/create/Content'
import RecruiterCareerDetails from './components/recruiter/career/details/Content'

import RecruiterInterviewDash from './components/recruiter/interview/dash/Content'
import RecruiterInterviewCreate from './components/recruiter/interview/create/Content'
import RecruiterInterviewDetails from './components/recruiter/interview/details/Content'

import RecruiterProfile from './components/recruiter/profile/content'

import ApplicantProfile from './components/applicant/profile/content'
import ApplicantDash from './components/applicant/dash/Content'
import ApplicantCareerDash from './components/applicant/career/dash/Content'
import ApplicantCareerDetails from './components/applicant/career/details/Content'
import ApplicantCareerApply from './components/applicant/career/apply/Content'
import ApplicantSchedules from './components/applicant/interview/dash/Content'
import ApplicantSchedulesDetails from './components/applicant/interview/details/Content'
import ApplicantApplications from './components/applicant/applications/dash/Content'

import Room from './components/videocall/content'
import Lobby from './components/videocall/lobby'
// import RoomWrapper from './components/videocall/roomWrapper'
import ErrorPage from './components/common/error';

function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
          <BrowserRouter>
            <ToastContainer />
            <Routes>

              {/* Recruiter/Applicant Home */}
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path='/home' element={<Home />} />

              {/* Admin */}
              <Route path='/admin/login' element={<AdminPublicRoute><AdminLoginForm /></AdminPublicRoute>} />
              <Route path='/admin/home' element={<AdminProtectedRoute><AdminDash /></AdminProtectedRoute>} />

              {/* Auth */}
              <Route path='/signup' element={<PublicRoute><SignupForm /></PublicRoute>} />
              <Route path='/login' element={<PublicRoute><LoginForm /></PublicRoute>} />
              <Route path='/verify-email' element={<PublicRoute><EmailVerified /></PublicRoute>} />

              {/* Recruiter */}
              <Route path='/recruiter/dash' element={<RecruiterProtectedRoute><RecruiterDash /></RecruiterProtectedRoute>} />

              <Route path='/recruiter/career' element={<RecruiterProtectedRoute><RecruiterCareerDash /></RecruiterProtectedRoute>} />
              <Route path='/recruiter/career/create' element={<RecruiterProtectedRoute><RecruiterCareerCreate /></RecruiterProtectedRoute>} />
              <Route path='/recruiter/career/details' element={<RecruiterProtectedRoute><RecruiterCareerDetails /></RecruiterProtectedRoute>} />
              <Route path='/recruiter/career/applicants' element={<RecruiterProtectedRoute><RecruiterCareerDetails /></RecruiterProtectedRoute>} />

              <Route path='/recruiter/schedules' element={<RecruiterProtectedRoute><RecruiterInterviewDash /></RecruiterProtectedRoute>} />
              <Route path='/recruiter/schedules/create' element={<RecruiterProtectedRoute><RecruiterInterviewCreate /></RecruiterProtectedRoute>} />
              <Route path='/recruiter/schedules/details' element={<RecruiterProtectedRoute><RecruiterInterviewDetails /></RecruiterProtectedRoute>} />

              <Route path='/recruiter/profile' element={<RecruiterProtectedRoute><RecruiterProfile /></RecruiterProtectedRoute>} />
              
              {/* <Route path='/recruiter/dash' element={<RecruiterDash />} />
                  <Route path='/recruiter/career' element={<RecruiterCareerDash />} />
                  <Route path='/recruiter/career/create' element={<RecruiterCareerCreate />} />
                  <Route path='/recruiter/career/details' element={<RecruiterCareerDetails />} />
                  <Route path='/recruiter/career/applicants' element={<RecruiterCareerDetails />} /> */}
              {/* <Route path='/recruiter/schedules' element={<RecruiterInterviewDash />} />
                  <Route path='/recruiter/schedules/create' element={<RecruiterInterviewCreate />} />
                  <Route path='/recruiter/schedules/details' element={<RecruiterInterviewDetails />} /> */}
              {/* <Route path='/recruiter/profile' element={<RecruiterProfile />} /> */}


              {/* Applicant */}
              <Route path='/applicant/profile' element={<ApplicantProtectedRoute><ApplicantProfile /></ApplicantProtectedRoute>} />
              <Route path='/applicant/dash' element={<ApplicantDash />} />
              <Route path='/applicant/career' element={<ApplicantProtectedRoute><ApplicantCareerDash /></ApplicantProtectedRoute>} />
              <Route path='/applicant/career/details' element={<ApplicantProtectedRoute><ApplicantCareerDetails /></ApplicantProtectedRoute>} />
              <Route path='/applicant/career/apply' element={<ApplicantProtectedRoute><ApplicantCareerApply /></ApplicantProtectedRoute>} />
              <Route path='/applicant/schedules' element={<ApplicantProtectedRoute><ApplicantSchedules /></ApplicantProtectedRoute>} />
              <Route path='/applicant/schedules/details' element={<ApplicantProtectedRoute><ApplicantSchedulesDetails /></ApplicantProtectedRoute>} />
              <Route path='/applicant/applications' element={<ApplicantProtectedRoute><ApplicantApplications /></ApplicantProtectedRoute>} />

              {/* <Route path='/applicant/profile' element={<ApplicantProfile />} />
              <Route path='/applicant/dash' element={<ApplicantDash />} />
              <Route path='/applicant/career' element={<ApplicantCareerDash />} />
              <Route path='/applicant/career/apply' element={<ApplicantCareerApply />} />
              <Route path='/applicant/schedules' element={<ApplicantSchedules />} />
              <Route path='/applicant/schedules/details' element={<ApplicantSchedulesDetails />} />
              <Route path='/applicant/applications' element={<ApplicantApplications />} /> */}

              <Route path="/lobby/join" element={<Lobby />} />
              <Route path="/room/join" element={<Room />} />
              {/* <Route path="/roomWrapper" element={<RoomWrapper />} /> */}

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
