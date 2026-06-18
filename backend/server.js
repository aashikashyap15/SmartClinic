import express from "express"
import cors from 'cors'
import 'dotenv/config'


// app config
const app = express()
const PORT = process.env.PORT || 4000

// middlewares

app.use(express.json())
app.use(cors())


// api endpoints

app.get('/api/user', )
app.get('api/admin')
app.get('/api/doctors')

app.get('/', (req,res)=>{
    res.send("api is working")
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})