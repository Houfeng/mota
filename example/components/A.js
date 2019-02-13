import React from 'react';

export class A extends React.Component {

  render() {
    const { attr, elements } = this.props;
    return <div>A
      <div>
        {attr && attr.test}
        {elements && elements('test')}
      </div>
    </div>;
  }

}