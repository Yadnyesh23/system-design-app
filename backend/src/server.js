import express from "express"
import path from "path"
import { fileURLToPath } from "url"

import app from "./app.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5000

// serve React build
app.use(express.static(path.join(__dirname, "../../frontend/dist")))

// React routing
app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})

app.listen(PORT, ()=>{
  console.log(`Server running on ${PORT}`)
})