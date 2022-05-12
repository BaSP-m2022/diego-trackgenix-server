// use "import" to import libraries
import express from 'express';

import superadminsRouter from './resources/super-admins';
import adminsRouter from './resources/admins';
import projectsRouter from './resources/projects';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/superadmins', superadminsRouter);
app.use('/projects', projectsRouter);
app.use('/admins', adminsRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
