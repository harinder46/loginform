const mongoose = require("mongoose")

const connectDB = async ()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // findOneAndUpdate: true,
            // useCreateIndex:true

        })
        console.log(`mongo connected ${conn}`);
    } catch (error){
        console.log(`error message ${error.message}`);
        process.exit();
        
    }

}

module.exports = connectDB;