import { useState, useEffect } from "react";

// hook deve ser exportado como funcao
// só posso ter um export

// custon hook para o fetch de dados
export const useFecth = (url) => {
  const GET = "GET";
  const POST = "POST";
  const PATCH = "PATCH";
  const PUT = "PUT";
  const DELETE = "DELETE";

  // check type method
  function isGet() {
    return method === GET;
  }


  function isPost() {
    return method === POST;
  }

  function isPut() {
    return method === PUT;
  }

  function isDelete() {
    return method === DELETE;
  }

  // check type method

  const [data, setData] = useState(null);

  // useEffetc para executar apenas uma vez

  // 5 refatorando o post
  // vamos configrar o cabelho das req's aqui
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);


  // configurando http config
  const httpConfig = (data, method) => {
    if (isPost) {
        setConfig({
            method,
            headers: {
                "Content-type": "application/json"
            },           
            body: JSON.stringify(data)    
        })

        setMethod(method);
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      // primeiro vem em texto
      const res = await fetch(url);

      // convertendo para json
      const json = await res.json();

      // setando os dados
      setData(json);
    };

    // executando minha funcao de fech data
    fetchData();
  }, [url, callFetch]);

  // 5 refatorando o post
  useEffect(() => {
    const httpRequest = async () => {
        if (isPost) {
            let fetchOptions = [url ,config];
    
            const res = await fetch(...fetchOptions);
    
            const json = await res.json();
    
            setCallFetch(json)
        }
    } ;
    
    // executando a funcao
    httpRequest();

  }, [config, method, url]);

  return { data, httpConfig };
};
