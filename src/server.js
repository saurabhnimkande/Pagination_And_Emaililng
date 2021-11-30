const app=require('./index')
const connect = require('./configs/db');


const start= () => {
    app.listen(2121,async function () {
        await connect();
        console.log('listening on port 2525');
    });
}
start();
    

