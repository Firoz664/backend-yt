const express = require('./src/config/express');
const config = require('./src/config/env/config');
const connectDB = require('./src/config/database/dbConnection')
const app = express();
connectDB();
const PORT = 8000

app.get('/', (req, res) => {
  res.send('hello world new latest' )
})


app.listen(process.env.PORT || config.port,()=> {
    console.log(`Server is running successfully http://localhost:${PORT}`);
    console.log('Time : ' + new Date());
    
});
