import { useState, useEffect } from "react";

function App() {
  // constantes
  const URL_BASE = "http://localhost:3000/products";

  // states
  const [produtos, setProdutos] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // resgantando os dados
  // useEffecte garante que a ação será executada apenas uma vez
  // problema da re-renderizacao d ecompoentens
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetch(URL_BASE);
      const jsonData = await response.json();
      setProdutos(jsonData);
      // ...
    }

    fetchData();
  }, []); // Or [] if effect doesn't need props or state



  // funcao para submter o form
  const handleSubmit = async (event) => {
    event.preventDefault();

    const produto = {
      name,
      price
    }


    const res = await fetch(URL_BASE, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(produto)
    })
  }

  return (
    <>
      <h1>Lista de Produtos</h1>
      <ul>
        {produtos.map(({id, name, price}) => (
          <li key={id}> {name} : R$ {price} </li>
        ))}
      </ul>

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

        <button type="submit">Salvar</button>

      </form>
    </>
  );
}

export default App;
