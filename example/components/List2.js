import React, { Component } from 'react';
import { model, binding, autorun, watch } from '../../src';

function List(props) {
  return <div>{props.opts.name}</div>;
}

export default List;
