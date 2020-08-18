import styled from 'styled-components';


export const ContainerImage = styled.div`
    display: flex;
    justify-content: center;
    background-color:#c72828;
    width: 100%;
`;


export const ContainerHeader = styled.div`
  background: #c72828;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

    h1{
        color: white;
        align-self: center;
        flex-grow: 1;
    }
    button{
        align-self:flex-start;
        background-color:#c72828;
        color: white;
        border: none;
        transform: background-color 500ms;
        &:hover{
            background-color: white;
            color: #c72828;
        }
    }
`;

export const ContainerInfo = styled.div`
    display: flex;
    justify-content: center;
    color: black;
    div{
        margin-top: 4vh;
        display:flex;
        flex-direction: column;
        width: 50%;
        padding: 10px;
        box-shadow: 22px 22px 44px 0px rgba(0,0,0,0.75);
        border-radius: 10px;
    }
`;