const express = require('express');
const routes = require('./src/routes/index');


//instatiate cors module
var cors = require('cors')

const app = express();

app.use(cors());

// menangkap data dari form user
app.use(express.json());

const port =  5000;

// membuat static url untuk menampilkan file
app.use("/picture", express.static("uploads"));

app.use("/api/v1",routes);

app.get('/', (req, res) => {
    res.send("Express Running");
});

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});