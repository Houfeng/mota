import React from 'react';
import ReactDOM from 'react-dom';

const createItems = (num = 2000) => {
  return new Array(num).fill('').map((num, index) => {
    return { size: 100, num, index };
  });
};

export class Item extends React.PureComponent {
  state = { size: 100 }
  render() {
    const { size } = this.state;
    return <div style={{
      width: size, height: 20, margin: 5, background: 'red'
    }}>
    </div>
  }
}

export class App extends React.PureComponent {

  state = { size: 100 }
  input = (event) => {
    const size = Number(event.target.value);
    setTimeout(() => {
      this.setState({ size });
      this.refList.forEach(ref => ref.setState({ size }));
    })
  }

  items = createItems();
  refList = [];

  addRef = (ref) => {
    this.refList.push(ref);
  };

  render() {
    window.com = this;
    return <div>
      <div>
        <input onChange={this.input} value={this.state.size || ''} />
      </div>
      <div>
        {this.items.map(item => {
          return <Item key={item.index} ref={this.addRef} />
        })}
      </div>
    </div>
  }
}

window.app = ReactDOM.render(<App />, document.getElementById('root'));