//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Country, Activity } = require('./src/db');
const { infoApi, createActivity } = require('./src/services/services.js');
const activity = require('./src/data/Activity.js');



// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {

  try {    
    let Infoapis = await infoApi()
    const countriess = await Infoapis.forEach(element => {
      Country.create({
        id: element.id,
        name: element.name,
        image: element.image,
        continente: element.continente,
        capital: element.capital.toString(),
        subregion: element.subregion,
        area: element.area,
        poblacion: element.poblacion,
      })
    });

    const map = activity.map(e => createActivity(e))

  } catch (error) {
    console.log(error)
  }
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
