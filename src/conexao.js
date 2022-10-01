async function conectarDados(url, callback){

    await fetch(url)
    .then(dados => {return dados.json();})
    .then(response => { callback(response)
    });
  
  }

async function citacao(url, callback){

  await fetch(url)
  .then(dados => {return dados.json();})
  .then(response => { callback(response)
  });

}




export{conectarDados, citacao}
