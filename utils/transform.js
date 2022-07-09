module.exports = {


  toURL: function (name) {

    return name.toLowerCase().replace(/ /g, '-');

  },


  fromURL: function (url) {

    const urlWithSpaces = url.replace(/-/g, ' ');
    const words = urlWithSpaces.split(' ');
    const captalizedWords = words.map(this.captalize);

    return captalizedWords.join(' ');

  },


  captalize: function (word) {

    return word[0].toUpperCase() + word.slice(1);

  },


};
