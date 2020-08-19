import React, { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form, Footer } from './styles';
import Modal from '../Modal';
import Input from '../Input';

import * as Yup from 'yup';


const schema = Yup.object().shape({
  image: Yup.string().required('É necessario que tenha um link!'),
  name: Yup.string().required('É necessario que tenha um nome!'),
  price: Yup.number().typeError('É necessario que seja um numero!').required('É necessario que tenha um preço'),
  description: Yup.string().required('É necessario que tenha uma descrição'),
  quantity: Yup.number().typeError('É necessario que seja um numero!').required('É necessario que tenha uma quantidade!'),
  timeToCook: Yup.string().required(),
  
});

const ModalAddFood = ({ isOpen, setIsOpen, handleAddFood }) => {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({}); //seta todos os erros anteriores
      await schema.validate(data, {
        abortEarly: false
      });
      handleAddFood(data);
      setIsOpen(!isOpen);
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });

      formRef.current.setErrors(validationErrors);
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <Footer>
        <div>
          <Input name="quantity" placeholder="Quantidade" />
            
          <Input name="timeToCook" placeholder="Tempo de preparo" />            
        </div>

        
        <button>
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
        </Footer>

      </Form>
    </Modal>
  );
};

export default ModalAddFood;
