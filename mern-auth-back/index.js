const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//set up express
const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static('../mern-auth-front/build'));

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

//set up routes
app.use("/users", require("./routes/userRouter"));
app.use("/todo", require("./routes/todoRouter"));
app.use("/inventory", require("./routes/invRouter"));
app.use("/locations", require("./routes/locRouter"));
app.use("/cart", require("./routes/cartRouter"));
app.use("/transaction", require('./routes/transactionRouter'));