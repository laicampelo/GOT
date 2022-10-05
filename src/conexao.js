//metodo fetch que irá buscar as informações
async function conectarDados(url, callback){

    await fetch(url)
    .then(dados => {return dados.json();})
    .then(response => { callback(response)
    });
  
  }

//exportação das funções
export{conectarDados}
