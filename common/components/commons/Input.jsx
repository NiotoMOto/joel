import React, { Component, PropTypes } from 'react';
import { TextField } from 'material-ui';

import * as util from '../../services/util';

export default class Input extends Component {

  static propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    delay: PropTypes.number,
    value: PropTypes.string, // Si preecisée, toujours utilisée
  };

  static defaultProps = {
    delay: 0,
  };

  state = {
    input: this.props.value || this.props.defaultValue || '',
  };

  get internal() {
    return this.refs.input;
  }

  // NOTE: Pas toujours précis dans les onChanges
  getValue() {
    return this.state.input;
  }

  setValue(text = '') {
    this.setState({
      input: text,
    });
  }

  resetValue() {
    this.setValue(this.props.defaultValue || '');
  }

  handleChange(e) {
    const { delay, onChange } = this.props;
    const value = e.target.value;
    this.setState({ input: value });
    if (onChange) {
      this.timeout = util.delay(this.timeout || { delay }, onChange.bind(this, value));
    }
  }

  render() {
    const otherProps = util.omit(this.props, 'delay', 'onChange', 'value');
    return (
      <TextField
        onChange={::this.handleChange}
        {...otherProps}
      />
    );
  }
}
