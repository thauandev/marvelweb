import React, { Component } from 'react';
import { FaUserNinja, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newChar: '',
    character: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const character = localStorage.getItem('character');

    if (character) {
      this.setState({ character: JSON.parse(character) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { character } = this.state;

    if (prevState.character !== character) {
      localStorage.setItem('character', JSON.stringify(character));
    }
  }

  handleInputChange = e => {
    this.setState({ newChar: e.target.value, error: null });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });
    try {
      const { newChar, character } = this.state;

      const apiKey = '9b444a9c5e417fe3f94a86f7d31cf2d4';
      const hash = '7e50ac1b185dc4c3127c3219653a520a';
      const ts = 1;

      if (newChar === '') {
        throw new Error('Hero is empty');
      }

      const hasChar = character.find(c => c.name === newChar);

      if (hasChar) {
        throw new Error('Hero already exists');
      }

      const response = await api.get(
        `characters?name=${newChar}&ts=${ts}&&apikey=${apiKey}&hash=${hash}`
      );

      this.setState({
        character: [...character, ...response.data.data.results],
        newChar: '',
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newChar, character, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaUserNinja />
          Heroes
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Add Hero"
            value={newChar}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {character.map(char => (
            <li key={char.id}>
              <span>{char.name}</span>
              <Link to={`/char/${encodeURIComponent(char.name)}`}>Details</Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
