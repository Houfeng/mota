export default class Info {
  name = '1';
  welcome = 'Welcome';
  list = ['1'];
  date = null;
  get say() {
    return `${this.welcome} ${this.name}`;
  }
}