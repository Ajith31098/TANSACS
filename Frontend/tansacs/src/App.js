import './App.css';
import DeputyDirectorForm from './components/user/deputydirectorform';
import SignIn from './components/user/signin';
import Signup from './components/user/signup';
import ForgotPassword from './components/user/forgot';
import ResetPassword from './components/user/resetpassword';
import VerifyOTP from './components/user/verify';
import Jobs from './components/user/jobs'; 
import Job1 from './components/user/job1';

import AdminHome from './components/admin/home';

import Detail from './components/admin/detail';

import Header from './components/basecomponents/header';
import {Routes , Route} from 'react-router-dom'   

function App() {
  return (
    <div className="App lg:px-20 md:px-20 px-5 py-10">
      <Header/>
      {/* <DeputyDirectorForm/> */}

      <Routes>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path='/reset' element={<ResetPassword/>}/>
        <Route path='/verify' element={<VerifyOTP/>}/>
        <Route path='/' element={<Jobs/>}/>
        <Route path='/job1' element={<Job1/>}/>
        <Route path='/job1/apply' element={<DeputyDirectorForm/>}/>
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/admin/post' element={<Detail/>}/>

      </Routes>
    </div>
  );
}

export default App;
