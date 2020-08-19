import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

const Dashboard = () => {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  async function handleAddFood(food) {
    try {
      await api.post('/foods',food);
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food) {
    const editedIndex = foods.map((element) => element.id).indexOf(food.id);
    const arrayFoods = foods;
    arrayFoods[editedIndex] = food
    try {
      await api.put(`/foods/${food.id}`,food);
      setFoods(arrayFoods);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleDeleteFood(id) {
    const deletedIndex = foods.map((element) => element.id).indexOf(id);
    const arrayFoods = foods;
    arrayFoods.splice(deletedIndex,1);
  
    try{
      await api.delete(`/foods/${id}`);
      setFoods([...arrayFoods]);
    }catch(err){
      console.log(err.message)
    }
   
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food) {
    setEditingFood(food);
    setEditModalOpen(!editModalOpen)
  }

  useEffect(() => {
    async function getFoods(){
      try {
        const { data } = await api.get('/foods');
        setFoods(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getFoods();
  },[]);


  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods && foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}          
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
