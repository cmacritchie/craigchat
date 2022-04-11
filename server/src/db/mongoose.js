const mongoose = require('mongoose')

//mongodb://mongo:27018/Samp_data
// mongoose.connect('mongodb://mongo:27017/chat_app', {
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));