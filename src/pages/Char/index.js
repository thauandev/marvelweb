/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';

export default class Char extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        char: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    character: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const charName = decodeURIComponent(match.params.char);

    const apiKey = '9b444a9c5e417fe3f94a86f7d31cf2d4';
    const hash = '7e50ac1b185dc4c3127c3219653a520a';
    const ts = 1;
    const response = await api.get(
      `characters?name=${charName}&ts=${ts}&&apikey=${apiKey}&hash=${hash}`
    );

    this.setState({
      character: [...response.data.data.results],
    });
  }

  render() {
    const { character } = this.state;

    return <Container>{character.name}</Container>;
  }
}
