require('dotenv').config();
const app = require('./lib/app');
const port = 3002;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
