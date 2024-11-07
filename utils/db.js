import mongoose  from "mongoose";


const dbConnect = async () => {
    try{
        await  mongoose.connect(process.env.MONGODB_URL);
        console.log("Db connected succussfully");
    }catch(e){
        console.error(e)
        console.log(e)
    }
}

export default dbConnect




