function dataResponse(httpStatus, status, message = "", data = {}) {
    /**
     * utility function to handle the creation of objects to return to controller
     * 
     * httpStatus: the http status of the response
     * status: this should contain 1 of 2, success or fail
     * message: optional - should include information if any is need
     * data: optional - should include any data that should be sent back
     */

    // Set with the only possible statuses for the response
    const statuses = new Set(["success", "fail"]);

    status = status.trim().toLowerCase();

    // block checks the validity of the status provided
    if (!status || !statuses.has(status)) {
        throw new Error("Invalid status: status can only be success or fail");
    }

    // base response
    const response = {
        httpStatus: httpStatus,
        status: status

    };

    // block checks for valid message to add to response
    if (message) {
        response.message = message;
    }

    // block checks for the length of the data to add to response
    if (Object.keys(data).length !== 0) {
        response.data = data;
    }

    return response;
}

module.exports = { dataResponse };