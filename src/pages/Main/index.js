import React, { Component } from 'react';
import { FaUserNinja, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';
import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newChar: '',
    character: [],
    loading: false,
  };

  handleInputChange = e => {
    this.setState({ newChar: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newChar, character } = this.state;

    const apiKey = '9b444a9c5e417fe3f94a86f7d31cf2d4';
    const hash = '7e50ac1b185dc4c3127c3219653a520a';
    const ts = 1;
    const response = await api.get(
      `characters?name=${newChar}&ts=${ts}&&apikey=${apiKey}&hash=${hash}`
    );
    const data = {
      id: response.data.id,
      name: response.data.name,
    };

    this.setState({
      character: [...character, data],
      newChar: '',
      loading: false,
    });
  };

  render() {
    const { newChar, character, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaUserNinja />
          Herois
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Heroi"
            value={newChar}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner olor="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {character.map(char => (
            <li key={char.id}>
              <span>{char.name}</span>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
