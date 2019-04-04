const API = {
    // Auth
    LOGIN        : { url: 'auth/login', method: 'POST', status: 200 },
    LOGOUT       : { url: 'auth/logout', method: 'DELETE', status: 204 },
    ME_INFO      : { url: 'auth/me', method: 'GET', status: 200 },
    REFRESH_TOKEN: { url: 'auth/refresh', method: 'PUT', status: 200 },

    // User
    USER_INDEX : { url: 'user/', method: 'GET', status: 200 },
    USER_UPDATE: { url: 'user/', method: 'PUT', status: 200 },
    USER_CREATE: { url: 'user/', method: 'POST', status: 201 },
    USER_DELETE: { url: 'user/', method: 'DELETE', status: 204 },

    // Role
    ROLE_INDEX : { url: 'role/', method: 'GET', status: 200 },
    ROLE_CREATE: { url: 'role/', method: 'POST', status: 201 },
    ROLE_UPDATE: { url: 'role/', method: 'PUT', status: 200 },
    ROLE_DELETE: { url: 'role/', method: 'DELETE', status: 204 },

    // Permission
    PERMISSION_INDEX: { url: 'permission/', method: 'GET', status: 200 },

    // Expert
    EXPERT_INDEX : { url: 'expert/', method: 'GET', status: 200 },
    EXPERT_ALL   : { url: 'expert/all', method: 'GET', status: 200 },
    EXPERT_CREATE: { url: 'expert/', method: 'POST', status: 201 },
    EXPERT_UPDATE: { url: 'expert/', method: 'PUT', status: 200 },
    EXPERT_DELETE: { url: 'expert/', method: 'DELETE', status: 204 },

    // Project
    PROJECT_INDEX : { url: 'project/', method: 'GET', status: 200 },
    PROJECT_CREATE: { url: 'project/', method: 'POST', status: 201 },
    PROJECT_UPDATE: { url: 'project/', method: 'PUT', status: 200 },
    PROJECT_DELETE: { url: 'project/', method: 'DELETE', status: 204 },
    PROJECT_ORDER : { url: 'project/order', method: 'PUT', status: 200 },


    // Timeline
    TIMELINE_INDEX : { url: 'timeline/', method: 'GET', status: 200 },
    TIMELINE_CREATE: { url: 'timeline/', method: 'POST', status: 201 },
    TIMELINE_UPDATE: { url: 'timeline/', method: 'PUT', status: 200 },
    TIMELINE_DELETE: { url: 'timeline/', method: 'DELETE', status: 204 },
    TIMELINE_ORDER : { url: 'timeline/order', method: 'PUT', status: 200 },

    // Rest
    REST_INDEX : { url: 'expertRest/', method: 'GET', status: 200 },
    REST_CREATE: { url: 'expertRest/', method: 'POST', status: 201 },
    REST_UPDATE: { url: 'expertRest/', method: 'PUT', status: 200 },
    REST_DELETE: { url: 'expertRest/', method: 'DELETE', status: 204 },

    // Reservation
    RESERVATION_INDEX : { url: 'reservation/', method: 'GET', status: 200 },
    RESERVATION_TABLE : { url: 'reservation/indexTable', method: 'GET', status: 200 },
    RESERVATION_CREATE: { url: 'reservation/', method: 'POST', status: 201 },
    RESERVATION_UPDATE: { url: 'reservation/', method: 'PUT', status: 200 },
    RESERVATION_DELETE: { url: 'reservation/multiple/', method: 'DELETE', status: 204 },
    RESERVATION_COUNT : { url: 'reservation/count', method: 'GET', status: 200 },

    ACTIVITY_INDEX: { url: 'activity/', method: 'GET', status: 200 },

};

export default API;
