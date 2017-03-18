const encodeer = require('./encodeer');

//http://www.plantuml.com/plantuml/svg/
//http://www.plantuml.com/plantuml/png/
module.exports = function (code, lang, done) {
  let text = unescape(encodeURIComponent(code));
  let url = `http://www.plantuml.com/plantuml/png/${encodeer.encode64(encodeer.zipDeflate(text, 9))}`;
  //fetch(url).then(done);
  return `<img alt="uml" style="width:inherit;height:inherit;" src="${url}"/>`;
};