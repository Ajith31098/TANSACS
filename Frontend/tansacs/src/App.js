import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import DeputyDirectorForm from './components/user/deputydirectorform';
import ClusterManagerForm from './components/user/clustermanagerform';
import ClinicalServiceOfficer from './components/user/ClinicalServiceOfficer';
import DataMonitoringDocumentationOfficer from './components/user/datamonitor';
import DeputyDirectorLS from './components/user/deputydirectorls';
import DeputyDirectorSI from './components/user/deputydirectorsi';
import AssistantDirectorBSD from './components/user/assistantdirectorbsd';
import AssistantDirectorTI from './components/user/assistantdirectorti';
import AssistantDirectorIEC from './components/user/assistantdirectoriec';

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
import { QueryClientProvider,QueryClient } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'

import { Provider } from 'react-redux'
import { store, persistor } from './redux/Store';
import ValidaterLogin from './components/Validater/ValidaterLogin';
import Preview from './components/admin/Preview';

import AdminCPM from './components/admin/AdminCPM';
import ServerError500 from './components/basecomponents/ServerError500';
const queryClient = new QueryClient()

function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <div className="App lg:px-20 md:px-20 px-5 py-10">
            <Header />
            {/* <DeputyDirectorForm/> */}

            <Routes>



                <Route path='/' element={<SignIn />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forgot' element={<ForgotPassword />} />
                <Route path='/reset' element={<ResetPassword />} />
                <Route path='/verify' element={<VerifyOTP />} />


              <Route path="/tansacs" element={<ValidaterLogin />}>

                <Route path='jobs' element={<Jobs />} />
                <Route path='cluster_manager' element={<Job1  />} />
                <Route path='cluster_manager/apply' element={<ClusterManagerForm  />} />

                <Route path='clinical_officer' element={<Job2 />} />
                <Route path='clinical_officer/apply' element={<ClinicalServiceOfficer />} />

                <Route path='data_monitoring_officer' element={<Job3 />} />
                <Route path='data_monitoring_officer/apply' element={<DataMonitoringDocumentationOfficer />} />

                <Route path='deputy_director_ls' element={<Job4 />} />
                <Route path='deputy_director_ls/apply' element={<DeputyDirectorLS />} />

                <Route path='deputy_director_si' element={<Job5 />} />
                <Route path='deputy_director_si/apply' element={<DeputyDirectorSI />} />

                <Route path='assistant_director_ictc' element={<Job6 />} />
                <Route path='assistant_director_ictc/apply' element={<AssistantDirectorBSD />} />

                <Route path='assistant_director_ti' element={<Job7 />} />
                <Route path='assistant_director_ti/apply' element={<AssistantDirectorTI />} />

                <Route path='assistant_director_iec' element={<Job8 />} />
                <Route path='assistant_director_iec/apply' element={<AssistantDirectorIEC />} />

              </Route>

              <Route path='/admin'>
                <Route path='home' element={<AdminHome />} />
                <Route path='home/CPM' element={<AdminCPM />} />


              </Route>

              <Route path='/server_error_500' element={<ServerError500/>}/>



              {/* <Route path='/admin/post' element={<Detail />} />
              <Route path='/preview' element={<Preview/>} /> */}

              {/* 
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
              <Route path="/job4/apply" element={<DeputyDirectorLS />} />
              <Route path="/job5/apply" element={<DeputyDirectorSI />} />
              <Route path="/job6/apply" element={<AssistantDirectorBSD />} />
              <Route path="/job7/apply" element={<AssistantDirectorTI />} />
              <Route path="/job8/apply" element={<AssistantDirectorIEC />} />

              */}

            </Routes>
          </div>
          <ReactQueryDevtools initialIsOpen = {false} position="bottom-right" />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
