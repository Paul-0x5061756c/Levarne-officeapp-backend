var express = require('express');
var app = express();
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 5050

// Single getter
const { getWeeks } = require('./handlers/weeks/getWeeks')

// Day handlers
const { addDay } = require('./handlers/days/addDay')
const { updateDay } = require('./handlers/days/updateDay')
const { removeDay } = require('./handlers/days/removeDay')

// Week handlers
const { addWeek } = require('./handlers/weeks/addWeek')
const { removeWeek } = require('./handlers/weeks/removeWeek')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (req : any, res : any) => {
  res.send("This is the back-end for the Levarne office app")
})

// Get
app.get('/getWeeks', getWeeks)

// Post days
app.post('/addDay', addDay)
app.post('/updateDay', updateDay)
app.post('/removeDay', removeDay)

// Post weeks
app.post('/addWeek', addWeek)
app.post('/removeWeek', removeWeek)







app.listen(PORT, () => console.log(`Project running at: ${PORT}`))