import { useState, useEffect } from "react";

// 4 - importando custom hook
import { useFecth } from './hooks/useFecth'

function App() {
  // constantes
  const URL_BASE = "http://localhost:3000/products";

  // states
  const [produtos, setProdutos] = useState([]);


  // 4 custom hook 
  // esse : é uma alias, como em bano de dados
  const { data: items, httpConfig, loading } = useFecth(URL_BASE);

  console.log(items);


  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // resgantando os dados
  // useEffecte garante que a ação será executada apenas uma vez
  // problema da re-renderizacao d ecompoentens
  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await fetch(URL_BASE);
  //     const jsonData = await response.json();
  //     setProdutos(jsonData);
  //     // ...
  //   }

  //   fetchData();
  // }, []); // Or [] if effect doesn't need props or state



  // funcao para submter o form
  const handleSubmit = async (event) => {
    event.preventDefault();

    const produto = {
      name,
      price
    }

    // const res = await fetch(URL_BASE, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },

    //   body: JSON.stringify(produto)
    // })

    // res não é json, é texto, por isso converti
    // const addedProduto = await res.json();

    // setProdutos((prevProdutos) => [...prevProdutos, addedProduto]);

    // refatorando o post
    httpConfig(produto, "POST")


    // resetando inputs
    setName("");
    setPrice("");

  }

  return (
    // items && é um if, verifica se existe, depois faz
    <>
      <h1>Lista de Produtos</h1>

      {/* 66 loading */}
      {/** enquanto estiver aguardando dados mostra esse loadin */}
      { loading && <p > Buscando dados...</p> }

      { !loading && <ul>
         { items && items.map(({id, name, price}) => (
          <li key={id}> {name} : R$ {price} </li>
        ))}
      </ul> }

      <hr />

      <form onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value) } />
        </label>

        <label>
          <span>Price</span>
          <input type="text" name="price" value={price} onChange={(event) => setPrice(event.target.value)} />
        </label>

       { !loading &&  <button type="submit">Salvar</button>}

      </form>
    </>
  );
}

export default App;
