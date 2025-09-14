const express=require("express")
const authRoutes=require("./routes/auth.routes")
const app=express()
const cookieParser=require("cookie-parser")
app.use(express.json())
app.use(cookieParser())
app.use('/auth',authRoutes)
module.exports=app