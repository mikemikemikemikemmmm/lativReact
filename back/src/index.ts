
import * as express from "express";
import guestRoute from './route/guest'
import adminRoute from './route/admin'
import userRoute from './route/user'
import * as cors from 'cors'

const app = express();
app.use(cors({origin:'http://localhost:3000'}))
app.use('/static', express.static(__dirname + '/public'));
app.route('/123').get((req,res)=>{
  res.send(123)
})
app.use('/', guestRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
