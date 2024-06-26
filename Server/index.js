const express = require("express");
const app = express();

const database =require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary")
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload")
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");

const PORT = process.env.PORT || 4000;

//db connection
database.connect();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
    
)



app.use(
    fileUpload({
        useTempFiles:true,
        // tempFileDir:"/temp/"
    })
)
// cloudinary connection
cloudinaryConnect();
//mount route

app.use("/api/v1/auth",userRoute);
app.use("/api/v1/rooms",roomRoute);

//def route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`);
})