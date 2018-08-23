// https://www.npmjs.org/package/grunt-contrib-qunit

module.exports = {
  all: {
    options: {
      urls: [
        "http://127.0.0.1:8080/test.html"
      ],
      timeout: 10000,
      screenshot: false
    }
  }
};
