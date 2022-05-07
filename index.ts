var express = require('express');
var app = express();
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 5050
const { getWeeks } = require('./handlers/weeks/getWeeks')
const { addDay } = require('./handlers/days/addDay')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (req : any, res : any) => {
  res.send("This is the back-end for the Levarne office app")
})

// Get
app.get('/getWeeks', getWeeks)

// Post
app.post('/addDay', addDay)


// Update






app.listen(PORT, () => console.log(`Project running at: ${PORT}`))