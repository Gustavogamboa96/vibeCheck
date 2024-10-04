const { dataResponse } = require("../utils/dataResponse");

function dataValidation(req, res, next) {

    console.log("your data is being validated");

    const dataToUpdate = {};
    const dataToDelete = {};

    // set for valid parameters that can be changed
    const fields = new Set(["favoriteSong", "favoriteArtist", "favoriteAlbum", "city", "state", "country"]);

    // destructuring information that can't be changed through this
    // destructuring bodyData which are values that can be changed
    const { username, password, firstName, lastName, age, email, ...bodyData } = req.body;;

    // block capitalizes the first letter of every word for city
    if (bodyData.city) {
        // splitting the string into an array
        const cityName = bodyData.city.split(" ");
        // block capitalized the first letter of each element in array
        cityName.forEach((value, index, array) => {
            // TODO: wrtie algorithm to replace the first letter to a capital
        })

        // rejoining the string
        bodyData.city = cityName.join(" ");
    }

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