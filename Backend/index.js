const express = require('express')
const app = express();

app.get('/' , (req , res) => {
    res.send("hell server is running")
})

app.listen(4000 , ()=> console.log(`server is runnig on port 4000`))