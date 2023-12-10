
const mongoose = require("mongoose")
const DB=process.env.DB;
mongoose.set('strictQuery', true);

mongoose.connect(DB, {
    useNewUrlParser: "true",
})
.then(()=>{console.log("mongoose is connected2")
}).catch((err)=>console.log("not connected")
)
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")

})

console.log("DB:->"+DB)
