import React from 'react';

export class A extends React.Component {

  render() {
    const { attr, elements } = this.props;
    console.log('render A');
    return <div>A
      <div>
        {attr && attr.test}
        {elements && elements('test')}
      </div>
    </div>;
  }

}