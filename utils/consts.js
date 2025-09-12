const constants = {
    TOTAL_HOURS_REQUIRED: 300,
    EXCLUDED_FIELDS: ['updatedAt', 'password'] ,
    STUDENT_TYPE: 'student',
    ACTIVE_STUDENT: 1,
    INACTIVE_STUDENT: 0,
    APPROVED_STUDENT: 2,
    PROFESSOR_TYPE: 'professor',
    TASK_ACCEPTED: 1,
    TASK_DENIED: 0,
    TASK_IN_REVIEW: -1,
    UNAUTHORIZED: 'Unauthorized.',
    FORBIDDEN: 'Forbidden.',
    NOT_FOUND: 'Not Found.',
    BAD_REQUEST: 'Bad Request.'
}

export default constants;