import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

// import DevForm from './components/DevForm';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() { 

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)


    setDevs([...devs, response.data]); //ce pega o objeto inteiro do dev e inclui no final do array de dev
    //como vai setar o valor completo, n pode jogar response.data senao ele sobre todo o valor do estado dev
    //entao criamos um array, copia todos os devs (...devs) e adiciona o novo no final (response.data)
    //é assim q faz adição de um array dentro do JS, se fosse remoção seria .filter, alteração seria .map
  }

  return (
    <div id="app">
      <aside> 
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev.id} dev={dev } /> //identificador de cada dev é o key.id
          ))} {/* pra utilizar uma expressão JS, sempre abre e fecha chaves*/}
          
        </ul>
      </main>
    </div>
    );
}

export default App;


/*AREA DE COMENTÁRIOS
Como era o App.js na hora q ele estava explicando useState  (Até 42:48)
->

import React, { useState } from 'react';
//useState função do React pra criar um Estado

// import Header from './Header';

/*
3 conceitos principais do React 
->
Componente  : O App é um componente, é uma função q retorna um conteudo HTML, pode retornar CSS e até JS pra interface.   Só pode 1 componente por arquivo.
ce chama ele assim <Header />, cria ele com a 1° letra Maiuscula
Estado      : Uma informação mantida pelo componente q o componente vai manipular
Propriedade : no HTML é atributos, por exemplo <Header title="Dashboard" />. São informação q um componente pai passa para o componente filho


function App() { //o App é uma função q retorna um conteudo HTML

  const [counter, setCounter] = useState(0); //passa o valor inicial, no caso, 0. 
  //A função useState retorna um array com uma variavel e uma função pra atualizar esse valor

  // function decrementCounter(){
  //   setCounter(counter - 1);
  // }

  //Toda função q é propria de um elemento, cria dentro dele msm
  function incrementCounter(){
    setCounter(counter + 1); //n se pode mudar o valor de um estado pique counter++ ou counter = 4;
    //pro React, vc nunca vai alterar um dado, vai sempre criar um novo dado a partir do valor anterior q ce tinha dele. É a imutabilidade
  }

  return (
    <>
      <h1>Contador : {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
      <button onClick={decrementCounter}>Decrementar</button>  Eu criei essa função, é legal poder desenvolver enquanto ele explica outra coisa

    { <Header title="Meu painel"/>  !!!!Aqui estava comentado, ele utilizou só pra mostrar como chamar outro componente!!!!!
      <Header title="Titulo 1"/>
      <Header title="Titulo 2"/> }  
    </> //precisa entrar num container se tiver + de 1 componente, senão da problema. O container pode ser uma <div> só q isso pode quebrar a estilização do site
    //então, podemos utilizar uma coisa legal do React q é o fragment, é só uma assinatura <> </>, ai n afeta
  );
}

export default App;

->


Esse aqui era o Header.js
// import React from 'react';

// function Header(props){
//     return <h1>{props.title}</h1> //dentro do HTML, toda hora q quiser introduzir um conteudo JS, utiliza chaves em volta
// }

// export default Header;


<aside> { TAG no HTML pra fazer side bar  }
*/
