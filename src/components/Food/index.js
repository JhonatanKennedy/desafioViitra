import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

const Food = ({ food, handleDelete, handleEditFood }) => {
  const [isAvailable, setIsAvailable] = useState(food.available);

  async function toggleAvailable() {
    food.available = !food.available;
    try {
      await api.put(`/foods/${food.id}`,food);
      setIsAvailable(!isAvailable);
    } catch ( err ) {

    }
  }

  function setEditingFood() {
    handleEditFood(food);
    console.log(food)
  }

  return (
    <Container available={isAvailable}>
      <Link to={`/food/${food.id}`}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      </Link>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingFood()}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
