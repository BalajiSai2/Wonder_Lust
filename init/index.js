const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/listing.js');

const mongo_rul ='mongodb://127.0.0.1:27017/wonderlust';

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_rul);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    // initData.data.map((obj) => ({ ...obj, owner:"68500d024e19f8b6633a55ee"}));
    // await Listing.insertMany(initData.data);
    const updatedData = initData.data.map((obj) => ({
        ...obj,
        owner: "68500d024e19f8b6633a55ee"
    }));

    await Listing.insertMany(updatedData);
    console.log("data was intialized");
};

initDB();