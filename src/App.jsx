import React from "react"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./Components/pages/About"
import Layout from "./Components/layouts/Layout"
import Home from "./Components/pages/Home"
import Contact from "./Components/pages/Contact"
import AdminLayout from "./Components/admin/layouts/AdminLayout"
import Dashboard from "./Components/admin/pages/Dashboard"
import Login from "./Components/auth/Login"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Register from "./Components/auth/Register"
import RegisterMentor from "./Components/auth/RegisterMentor"
import AddTopic from "./Components/admin/topic/AddTopic"
import ManageTopic from "./Components/admin/topic/ManageTopic"
import ViewTopic from "./Components/admin/topic/ViewTopic"
import EditTopic from "./Components/admin/topic/EditTopic";
import ManageMentorshipProgram from './Components/admin/mentorshipProgram/ManageMentorshipProgram'
import ViewMentorshipProgram from './Components/admin/mentorshipProgram/ViewMentorshipProgram'
import ManageMentor from "./Components/admin/mentor/ManageMentor";
import ViewMentor from "./Components/admin/mentor/ViewMentor"
import ManageStudent from "./Components/admin/student/ManageStudent";
import ViewStudent from "./Components/admin/student/ViewStudent"
import MentorLayout from "./Components/mentor/layouts/MentorLayout"
import AddMentorshipProgram from "./Components/mentor/mentorshipProgram/AddMentorshipProgram";
import ManageDiscussionQuestion from "./Components/admin/discussionQuestion/ManageDiscussionQuestion";
import ManageDiscussionReplies from "./Components/admin/discussionReplies/ManageDiscussionReplies";
import ManageMentorshipProgramMentor from './Components/mentor/mentorshipProgram/ManageMentorshipProgramMentor';
import EditMentorshipProgram from "./Components/mentor/mentorshipProgram/EditMentorshipProgram"
import ViewProfile from "./Components/mentor/profile/ViewProfile";
import MentorDashboard from "./Components/mentor/mentor dashboard/MentorDashboard";
import EditProfile from "./Components/mentor/profile/EditProfile";
import Topics from "./Components/pages/Topics";
import MentorshipProgram from "./Components/pages/MentorshipProgram"
import MyEnrollment from "./Components/pages/MyEnrollment";
import ChangePassword from "./Components/pages/ChangePassword";
import ViewDiscussionReplies from "./Components/admin/discussionReplies/ViewDiscussionReplies";
import ManageDiscussionQuestionMentor from "./Components/mentor/discussionQuestion/ManageDiscussionQuestionMentor";
import AddDiscussionQuestion from "./Components/mentor/discussionQuestion/AddDisucssionQuestion";
import EditDiscussionQuestion from "./Components/mentor/discussionQuestion/EditDiscussionQuestion";
import DiscussionForm from "./Components/pages/DiscussionForm";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/topics" element={<Topics/>}/>
            <Route path="/mentorshipProgram" element={<MentorshipProgram/>}/>
            <Route path="/mentorshipProgram/:topic" element={<MentorshipProgram/>}/>
            <Route path="/myenrollments" element={<MyEnrollment/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registermentor" element={<RegisterMentor />} />
            <Route path="/changePassword" element={<ChangePassword/>}/>
            <Route path="/discussionform" element={<DiscussionForm/>}/>
            
          </Route>


          <Route path="/admin" element={<AdminLayout />}>

            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/topic/manage" element={<ManageTopic />} />
            <Route path="/admin/topic/add" element={<AddTopic />} />
            <Route path="/admin/topic/view/:id" element={<ViewTopic />} />
            <Route path="/admin/topic/edit/:id" element={<EditTopic />} />

            <Route path="/admin/mentorshipProgram/manage" element={<ManageMentorshipProgram/>}/>
            <Route path="/admin/mentorshipProgram/view/:id" element={<ViewMentorshipProgram/>}/> 

            <Route path="/admin/mentor/manage" element={<ManageMentor/>}/>
            <Route path="/admin/mentor/view/:id" element={<ViewMentor/>}/>

            <Route path="/admin/student/manage" element={<ManageStudent/>}/>
            <Route path="/admin/student/view/:id" element={<ViewStudent/>}/>

            <Route path="/admin/discussionQuestion/manage" element={<ManageDiscussionQuestion/>}/>
            <Route path="/admin/discussionQuestion/view/:id" element={<ViewDiscussionReplies/>}/>

            <Route path="/admin/discussionReplies/manage" element={<ManageDiscussionReplies/>} />
            <Route path="/admin/discussionReplies/view/:id" element={<ViewDiscussionReplies/>}/>


          </Route>


          
            <Route path="/mentor" element={<MentorLayout/>}>
            
            <Route path="/mentor" element={<MentorDashboard/>}/>
            <Route path="/mentor/profile/view/:userId" element={<ViewProfile/>}/>
            <Route path="/mentor/profile/edit/:id" element={<EditProfile/>}/>

            <Route path="/mentor/mentorshipProgram/manage" element={<ManageMentorshipProgramMentor/>}/>
            <Route path="/mentor/mentorshipProgram/add" element={<AddMentorshipProgram/>}/>
            <Route path="/mentor/mentorshipProgram/edit/:id" element={<EditMentorshipProgram/>}/>
            <Route path="/mentor/mentorshipProgram/view/:id" element={<ViewMentorshipProgram/>}/> 

            <Route path="/mentor/discussionQuestion/manage" element={<ManageDiscussionQuestionMentor/>}/>
            <Route path="/mentor/discussionQuestion/add" element={<AddDiscussionQuestion/>}/>
            <Route path="/mentor/discussionQuestion/edit/:id" element={<EditDiscussionQuestion/>}/>

            </Route>
          

        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
