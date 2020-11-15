const QueslarClient = require('./queslarClient.js');
const db = require('./db.js');

// Make queslar client from API Key
const API_KEY = '1ec445c3c0d5cb123c7e96c96002d93da50cbf8bfe3bac38bbc105f3dc3c20a2';

// Can make a Client for any API KEY
const qc = new QueslarClient(API_KEY);

async function run() {

  // Sample API calls
  //const playerInfo = await qc.getPlayer();
  const playerData = await qc.getPlayerData('boosts');
  //const marketInfo = await qc.getMarket();
  //const rankingsFull = await qc.getRankings();
  //const specificRanking = await qc.getRanking('buildings', 'church');

  // Save some data in db

  // To Save in the db, you need a special unique key for the data
  // It can be anything, but shouldn't be random. In this case
  // I used the API_KEY for the player + the stat I am saving.
  //
  // If you call this twice, it will just overwrite the key
  // with updated playerData
  const key = `${API_KEY}-boosts`;
  console.log(`Saving player boosts using key ${key}`);
  await db.saveData(key, playerData);

  // You can query
  console.log("Getting player boosts by key");
  let savedInfo = await db.getData(key);
  console.log(`Saved Info is:\n${JSON.stringify(savedInfo, null, 4)}`);
}

run();
