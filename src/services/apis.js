const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
    GET_ALL_CATEGORIES_API_URL: BASE_URL+'/course/getAllCategories',
}

export const endPoints = {
    SEND_OTP_API: BASE_URL+'/auth/sendotp',
    SIGNUP_API: BASE_URL+'/auth/signup',
    LOGIN_API: BASE_URL+'/auth/login',
    RESETPASSTOKEN_API: BASE_URL+'/auth/resetPasswordToken',
    RESETPASSWORD_API: BASE_URL+'/auth/resetPassword',
    CHANGE_PASSWORD_API: BASE_URL+'/auth/changePassword',
}

export const contactApi = {
    CONTACT_US_API: BASE_URL+'/contactUs',
}

export const profileApi = {
    UPDATE_PROFILE_PIC_API: BASE_URL+'/profile/updateProfilePic',
    UPDATE_PROFILE_DETAILS_API: BASE_URL+'/profile/updateProfile',
    DELETE_ACCOUNT_API: BASE_URL+'/profile/deleteAccount',
    GET_ENROLLED_COURSES: BASE_URL+'/profile/getEnrolledCourses',
    GET_INSTRUCTOR_DASHBOARD_STATS: BASE_URL+'/profile/instructorDashboardStats',
}

export const courseApi = {
    CREATE_COURSE_API: BASE_URL+'/course/createCourse',
    UPDATE_COURSE_API: BASE_URL+'/course/editCourse',
    GET_ALL_COURSES_API: BASE_URL+'/course/getAllCourses',
    GET_COURSE_DETAILS_API: BASE_URL+'/course/getCourseDetails',
    GET_FULL_COURSES_DETAILS_API: BASE_URL+'/course/getFullCourseDetails',
    GET_INSTRUCTOR_COURSES_API: BASE_URL+'/course/getInstructorCourses',
    DELETE_COURSE_API: BASE_URL+'/course/deleteCourse',
    CREATE_SECTION_API: BASE_URL+'/course/createSection',
    UPDATE_SECTION_API: BASE_URL+'/course/updateSection',
    DELETE_SECTION_API: BASE_URL+'/course/deleteSection',
    CREATE_SUBSECTION_API: BASE_URL+'/course/createSubSection',
    UPDATE_SUBSECTION_API: BASE_URL+'/course/updateSubSection',
    DELETE_SUBSECTION_API: BASE_URL+'/course/deleteSubSection',
    GET_CATEGORY_PAGE_DETAILS_API: BASE_URL+'/course/categoryPageDetails',
    MARK_LECTURE_AS_COMPLETE_API: BASE_URL+'/course/updateCourseProgress',
    GET_COURSE_PROGRESS_API: BASE_URL+'/course/getCourseProgress',
    CREATE_RATING_REVIEW_API: BASE_URL+'/course/createRatingReview',
}

export const paymentApi = {
    CAPTURE_PAYMENT_API: BASE_URL+'/payment/capturePayment',
    VERIFY_PAYMENT_API: BASE_URL+'/payment/verifyPayment',
    SEND_PAYMENT_SUCCESS_MAIL_API: BASE_URL+'/payment/sendPaymentSuccessMail',
}