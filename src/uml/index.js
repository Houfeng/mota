const encodeer = require('./encodeer');
const fetch = global.fetch ? global.fetch : require('node-fetch');
const Class = require('cify').Class;

const UMLParser = new Class({

  constructor(opts) {
    opts = opts || {};
    this.rarefaction = opts.rarefaction
  },

  //http://www.plantuml.com/plantuml/svg/
  //http://www.plantuml.com/plantuml/png/
  _parse(code, lang, done) {
    if (!code) return done(null, '');
    let params = unescape(encodeURIComponent(code));
    let url = `http://www.plantuml.com/plantuml/svg/${encodeer.encode64(encodeer.zipDeflate(params, 9))}`;
    //发生错误时也不用 done 的第一个参数传递，
    //这样不让 mditor embed 认为是文档解析错误了
    //让 err 作为正确的结果返回，错误将显示在「图形」位置
    fetch(url).then((res, err) => {
      if (err) done(null, err);
      res.text().then(result => {
        if (result.indexOf('Syntax error: ') > -1) return;
        done(null, result);
      });
    }).catch(err => {
      done(null, `<div class="highlight-alert">暂时无法渲染 UML 图形，请检查网络设置。</div>${code}`);
    });
  },

  parse(code, lang, done) {
    if (!this.rarefaction) return this._parse(code, lang, done);
    if (this._reqTimer) {
      clearTimeout(this._reqTimer);
      this._reqTimer = null;
    }
    this._reqTimer = setTimeout(() => {
      if (!this._reqTimer) return;
      this._parse(code, lang, done)
    }, 600);
  }

});

module.exports = UMLParser;