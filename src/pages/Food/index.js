import React,{ useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import api from '../../services/api';

import { ContainerHeader, ContainerImage, ContainerInfo } from './style';


const Food = () => {
    const { id } = useParams();
    const history = useHistory();
    const [product,setProduct] = useState({});

    useEffect(() => {
        async function getProduct(){
            try {
                const { data } = await api.get(`/foods/${id}`);
                setProduct(data); 
            } catch (err) {
                console.log(err.message);
            }
        }
        getProduct();
    },[id]);

    return(
        <>
            <ContainerHeader>
                <button onClick={()=>(history.push('/'))}>
                    <AiOutlineArrowLeft size={40}/>
                </button>
                <h1>{product.name}</h1>
            </ContainerHeader>
            <ContainerImage>
                <img src={product.image} alt={product.name} />
            </ContainerImage>
            <ContainerInfo>
                <div>
                    <span><strong>Nome: </strong> {product.name}</span>
                    <span><strong>Descrição: </strong>{product.description}</span>
                    <span><strong>Preço: </strong>{product.price}</span>
                    <span><strong>Quantidade: </strong>{product.quantity}</span>
                    <span><strong>Tempo para cozinhar: </strong>{product.timeToCook}</span>
                </div>

            </ContainerInfo>


        </>
    );
}

export default Food;