const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//set up express
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("The server has started on port: " + PORT));

//set up mongoose
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
});

//set up routes
app.use("/users", require("./routes/userRouter"));
app.use("/todo", require("./routes/todoRouter"));
app.use("/inventory", require("./routes/invRouter"));
app.use("/locations", require("./routes/locRouter"));
app.use("/cart", require("./routes/cartRouter"));
app.use("/transaction", require('./routes/transactionRouter'));

// if (process.env.NODE_ENV === 'production') {
app.use(express.static('client/build'));

app.get('/*', (req, res) => {
    let url = path.join(__dirname, '/client/build', 'index.html');
    console.log(url);
    if (!url.startsWith('/app/')) // we're on local windows
        url = url.substring(1);
    res.sendFile(url);
});

// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });
// }