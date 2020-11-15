const request = require('request');

module.exports = class QueslarClient {

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  // Make any api call
  // https://queslar.com/api/<endpoint>/arg1/arg2/arg3.../<apiKey>
  async call(endpoint, ...args) {
    let uri;
    if (args.length) {
      uri = `https://queslar.com/api${endpoint}/${args.join('/')}/${this.apiKey}`;
    } else {
      uri = `https://queslar.com/api${endpoint}/${this.apiKey}`;
    }
    return new Promise( (resolve, reject) => {
      const options = {
        uri,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      };
      request(options, (error, response, body) =>
        {
          if (error) {
            return reject(error);
          }
          if (response.statusCode === 200) {
            return resolve(JSON.parse(body));
          } else {
            return reject(body);
          }
        }
      );
    });
  }

  async getPlayer() {
    return this.call('/player/full');
  }

  async getPlayerData(type) {
    return this.call(`/player/${type}`);
  }

  async getMarket() {
    return this.call('/market/history-latest');
  }

  async getRankings() {
    return this.call('/rankings/full');
  }

  async getRanking(category, value) {
    return this.call(`/rankings/${category}/${value}`);
  }
};
