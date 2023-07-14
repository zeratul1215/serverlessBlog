const {initDBwithUpdate} = require("../init/initDB");

const updateDB = async (req,res) => {
    await initDBwithUpdate();
    res.json({
        message:'DB updated'
    });
}

module.exports = updateDB;