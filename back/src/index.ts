
import * as express from "express";
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'

import guestRoute from './route/guest'
import adminRoute from './route/admin'
import userRoute from './route/user'

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(helmet());
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/public'));

app.route('/123').get((req, res) => {
  res.send(123)
})
app.use('/', guestRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
