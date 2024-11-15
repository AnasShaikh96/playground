const axios = require('axios');

class Practice2 {
  constructor(userName, viewRepos = false) {
    this.userName = userName;
    this.canViewRepos = viewRepos;
  }

  getUserId() {
    return axios.get(`https://api.github.com/users/${this.userName}`)
      .then(response => {
        return response.data.id
      });
  }

  getUserRepo(repoIndex) {
    if (this.canViewRepos) {
      return axios.get(`https://api.github.com/users/${this.userName}/repos`)
        .then(response => response.data[repoIndex])
    }

    return Promise.reject('Cannot view repos');
  }

}

module.exports = {
  Practice2,
};