require('dotenv').config();
require('./services/mongoose');
require('./models/Property');
require('./models/Category');

const app = require('./app');

app.set('port', process.env.PORT || 8888);

const server = app.listen(app.get('port'), () => {
    console.log('App is running in: http://localhost:' + server.address().port);
});