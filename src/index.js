// use "import" to import libraries
import express from "express"

// use "require" to import JSON files
const admins = require('./data/admins.json');
const users = require('./data/super-admins.json')
const superadminsRouter = require('./resources/super-admins');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/superadmins',superadminsRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
})
