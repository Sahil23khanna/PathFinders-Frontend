import axios from "axios";
const BASE_URL="https://path-finders-backend-bice.vercel.app/"
class ApiServices{

    getToken(){
          let x={
            headers:{
                Authorization:sessionStorage.getItem("token")
            }
        }
        return x;
    }
    login(formData){
        return axios.post(BASE_URL+"/api/user/login", formData)
    }

    register(formData){
        return axios.post(BASE_URL+"/api/student/register", formData)
    }

    registermentor(formData){
        return axios.post(BASE_URL+"/api/mentor/register", formData)
    }

    changePassword(formData){
        return axios.post(BASE_URL+"/api/user/change/password", formData, this.getToken())
    }

    // Admin Side

    
    addTopic(formData){
      
        return axios.post(BASE_URL+"/admin/topic/add", formData, this.getToken())
    }

     allTopic(formData){
        return axios.post(BASE_URL+"/api/topic/all", formData)
    }

     changeStatusTopic(formData){
        return axios.post(BASE_URL+"/admin/topic/changeStatus", formData, this.getToken())
    }

    singleTopic(formData){
        return axios.post(BASE_URL+"/api/topic/single", formData)
    }

    updateTopic(formData){
        return axios.post(BASE_URL+"/admin/topic/update", formData, this.getToken())
    }

    dashboard(formData){
        return axios.post(BASE_URL+"/admin/dashboard/dashboard",formData, this.getToken())
    }
    
    allMentorshipProgram(formData){
        return axios.post(BASE_URL+"/api/mentorshipProgram/all",formData)
    }

    changeStatusMentorshipProgram(formData){
        return axios.post(BASE_URL+"/admin/mentorshipProgram/changeStatus", formData , this.getToken())
    }

    singleMentorshipProgram(formData){
        return axios.post(BASE_URL+"/api/mentorshipProgram/single", formData)
    }

    allMentor(formData){
        return axios.post(BASE_URL+"/api/mentor/all", formData)
    }

    singleMentor(formData){
        return axios.post(BASE_URL+"/api/mentor/single", formData)
    }

    changeStatusMentor(formData){
        return axios.post(BASE_URL+"/admin/mentor/changeStatus",formData, this.getToken())
    }

    allStudent(formData){
        return axios.post(BASE_URL+"/api/student/all",formData)
    }

    singleStudent(formData){
        return axios.post(BASE_URL+"/api/student/single",formData)
    }

    changeStatusStudent(formData){
        return axios.post(BASE_URL+"/admin/student/changeStatus", formData, this.getToken())
    }

    allDiscussionQuestion(formData){
        return axios.post(BASE_URL+"/api/discussionQuestion/all",formData, this.getToken())
    }


    changeStatusDiscussionQuestion(formData){
        return axios.post(BASE_URL+"/admin/discussionQuestion/changeStatus",formData, this.getToken())
    }

     allDiscussionReplies(formData){
        return axios.post(BASE_URL+"/api/discussionReplies/all",formData, this.getToken())
    }
     addDiscussionReplies(formData){
        return axios.post(BASE_URL+"/api/discussionReplies/add",formData, this.getToken())
    }

    changeStatusDiscussionReplies(formData){
        return axios.post(BASE_URL+"/admin/discussionReplies/changeStatus",formData, this.getToken())
    }
 
    singleDiscussionReplies(formData){
        return axios.post(BASE_URL+"/api/discussionReplies/single", formData, this.getToken())
    }

// Mentor Side

    getMentorMentorshipPrograms(formData){
        return axios.post(BASE_URL+"/api/mentorshipProgram/all", formData)
    }

    addMentorshipProgram(formData){
        return axios.post(BASE_URL+"/mentor/mentorshipProgram/add", formData, this.getToken())
    }

    changeStatusProgram(formData){
        return axios.post(BASE_URL+"/mentor/mentorshipProgram/changeStatus", formData, this.getToken())
    }

    updateMentorshipProgram(formData){
        return axios.post(BASE_URL+"/mentor/mentorshipProgram/update",formData, this.getToken())
    }

    singleMentor(formData){
        return axios.post(BASE_URL+"/api/mentor/single",formData)
    }
    
    updateMentor(formData){
        return axios.post(BASE_URL+"/mentor/mentor/update",formData, this.getToken())
    }
     Mentordashboard(formData){
        return axios.post(BASE_URL+"/mentor/dashboard/mentordashboard",formData, this.getToken())
    }

    addEnrollment(formData){
          return axios.post(BASE_URL+"/student/enrollment/add",formData, this.getToken())
    }

    allEnrollment(formData){
          return axios.post(BASE_URL+"/api/enrollment/all",formData, this.getToken())
    }

    add1Enrollment(formData){
        return axios.post(BASE_URL+"/student/enrollment/add1", formData, this.getToken())
    }

    alldiscussionQuestion(formData){
        return axios.post(BASE_URL+"/api/discussionQuestion/all",formData, this.getToken())
    }

    singleDiscussionQuestion(formData){
        return axios.post(BASE_URL+"/api/discussionQuestion/single", formData, this.getToken())
    }

    updateDiscussionQuestion(formData){
        return axios.post(BASE_URL+"/mentor/discussionQuestion/update",formData,this.getToken())
    }

    addDiscussionQuestion(formData){
        return axios.post(BASE_URL+"/mentor/discussionQuestion/add", formData, this.getToken())
    }

    addRating(formData){
        return axios.post(BASE_URL+"/student/feedback/add", formData, this.getToken())
    }
}

export default new ApiServices;