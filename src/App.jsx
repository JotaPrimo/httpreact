import { useState, useEffect } from "react";

function App() {
  const URL_BASE = "http://localhost:3000/products";

  const [produtos, setProdutos] = useState([]);

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

  console.log(produtos);

  return (
    <>
      <h1>Lista de Produtos</h1>
      <ul>
        {produtos.map(({id, name, price}) => (
          <li key={id}> {name} : R$ {price} </li>
        ))}
      </ul>
    </>
  );
}

export default App;
