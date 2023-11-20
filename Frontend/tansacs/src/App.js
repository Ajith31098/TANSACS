import './App.css';

import DeputyDirectorForm from './components/user/deputydirectorform';
import ClusterManagerForm from './components/user/clustermanagerform';
import ClinicalServiceOfficer from './components/user/ClinicalServiceOfficer';
import DataMonitoringDocumentationOfficer from './components/user/datamonitor';

import SignIn from './components/user/signin';
import Signup from './components/user/signup';
import ForgotPassword from './components/user/forgot';
import ResetPassword from './components/user/resetpassword';
import VerifyOTP from './components/user/verify';

import Jobs from './components/user/jobs';
import Job1 from './components/user/job1';
import Job2 from './components/user/job2';
import Job3 from './components/user/job3';
import Job4 from './components/user/job4';
import Job5 from './components/user/job5';
import Job6 from './components/user/job6';
import Job7 from './components/user/job7';
import Job8 from './components/user/job8';


import AdminHome from './components/admin/home';

import Detail from './components/admin/detail';

import Header from './components/basecomponents/header';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App lg:px-20 md:px-20 px-5 py-10">
      <Header />
      {/* <DeputyDirectorForm/> */}

      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/reset' element={<ResetPassword />} />
        <Route path='/verify' element={<VerifyOTP />} />

        <Route path='/' element={<Jobs />} />
        <Route path='/job1' element={<Job1 />} />
        <Route path='/job2' element={<Job2 />} />
        <Route path='/job3' element={<Job3 />} />
        <Route path='/job4' element={<Job4 />} />
        <Route path='/job5' element={<Job5 />} />
        <Route path='/job6' element={<Job6 />} />
        <Route path='/job7' element={<Job7 />} />
        <Route path='/job8' element={<Job8 />} />

        <Route path='/job1/apply' element={<ClusterManagerForm />} />
        <Route path="/job2/apply" element={<ClinicalServiceOfficer />} />
        <Route path="/job3/apply" element={<DataMonitoringDocumentationOfficer />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/admin/post' element={<Detail />} />

      </Routes>
    </div>
  );
}

export default App;
