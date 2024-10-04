const { dataResponse } = require("../utils/dataResponse");
const { capitalizeFirstLetterEveryWord } = require("../utils/capitalizeFirstLetterEveryWord");

function dataValidation(req, res, next) {
    /**
     * middleware function to handle valdiating the request body params that need to be changed
     * 
     * certain params are extracted to prevent them from being updated
     */
    const dataToUpdate = {};
    const dataToDelete = {};

    // set for valid parameters that can be changed
    const fields = new Set(["favoriteSong", "favoriteArtist", "favoriteAlbum", "city", "state", "country", "bio"]);

    // destructuring information that can't be changed through this
    // destructuring bodyData which are values that can be changed
    const { username, password, firstName, lastName, age, email, ...bodyData } = req.body;;

    // // block capitalizes the first letter of every word for city if it is defined
    // bodyData.city = bodyData.city ? capitalizeFirstLetterEveryWord(bodyData.city) : undefined;

    // // block capitalizes the first letter of every word for state if it is defined
    // bodyData.state = bodyData.state ? capitalizeFirstLetterEveryWord(bodyData.state) : undefined;

    // // block capitalizes the first letter of every word for country if it is defined
    // bodyData.country = bodyData.country ? capitalizeFirstLetterEveryWord(bodyData.country) : undefined;

    // block trims data, also updates which data needs to be updateds, deletes field from set
    Object.keys(bodyData).forEach(key => {
        bodyData[key] = bodyData[key].trim();
        dataToUpdate[key] = bodyData[key];
        fields.delete(key)
    })

    // block deals with updating the data that needs to be deleted by looking at what remains in the set
    fields.forEach(value => {
        dataToDelete[value] = undefined;
    });

    // update the request body to hold the new information for which data to update and which to delete
    req.dataToUpdate = dataToUpdate;
    req.dataToDelete = dataToDelete;

    next();
}


module.exports = { dataValidation }