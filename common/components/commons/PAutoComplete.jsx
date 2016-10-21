import React, { Component, PropTypes } from 'react';
import { AutoComplete } from 'material-ui';

import * as util from '../../services/util';

export default class AutoCompleteP extends Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    delay: PropTypes.number,
    field: PropTypes.string,
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

  handleChange(o) {
    const { delay, onChange, field } = this.props;
    const value = o[field];
    this.setState({ input: value });
    if (onChange) {
      this.timeout = util.delay(this.timeout || { delay }, onChange.bind(this, value));
    }
  }

  render() {
    const otherProps = util.omit(this.props, 'delay', 'onChange', 'value', 'field');
    return (
      <AutoComplete
        onChange={::this.handleChange}
        {...otherProps}
      />
    );
  }
}
