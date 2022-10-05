//importação dos módulos 

import {conectarDados} from './conexao.js'
import {infoPersonagens, frasesPersonagens} from './dados.js'

//url das API's transformadas em variável
const urlImg="https://thronesapi.com/api/v2/Characters"
const urlCitacao="https://api.gameofthronesquotes.xyz/v1/characters"


//função que conecta as informações da api e fazer um filtro nas informações que serão exibidas
conectarDados(urlImg, (response)=>{

    response.forEach((e)=>{
        let arrtemp=[e.fullName, e.family, e.title, e.imageUrl]
        infoPersonagens.push(arrtemp)

    })
    inserirImg(infoPersonagens)
})

conectarDados(urlCitacao, (response)=>{

    response.forEach((elemento)=>{
        let frase=[elemento.name, elemento.quotes[0]]
        frasesPersonagens.push(frase)

    })
})

// Função que será utilizada para fazer a pesquisa dos personagens pelo usuário
function inserirImg(array){

    let divApp=document.querySelector('#app')
    while(divApp.firstChild) {
        divApp.removeChild(divApp.firstChild);
    }

    let divSearch=document.querySelector('.search')
    let imgCarregamento=document.querySelector('#imgCarregamento')

    array.forEach((e, i)=>{
        let elemento = document.createElement('img');
        elemento.setAttribute('src', e[3])
        elemento.setAttribute('class', 'personagens')
        elemento.addEventListener('click', ()=>{
            exibirInfo(array[i])
        })
        divApp.append(elemento)
    })

    //modificação do html a partir da entrada de informações da API
    divApp.style.display='flex'
    imgCarregamento.style.display='none'
    divSearch.style.display='flex'
}

//função que faz um filtro e seleciona somente a primeira frase da API e exibe junto com as imagens no modal.
//Caso o personagem não tenha frase, exibirá somente o nome, titulo e casa.
function exibirInfo(i){
    let frase ="";
    try {
        frase=filtro(i[0], frasesPersonagens)
        frase=frase[0][1]
    } catch (error) {
        
    }
    let modal=document.querySelector('#modal');
    let nomeModal=document.querySelector('#nomeModal');
    let tituloModal=document.querySelector('#tituloModal');
    let imagemModal=document.querySelector('#imagemModal');
    let familiaModal=document.querySelector('#familiaModal');
    let frasePersonagem=document.querySelector('#frasePersonagem');
    let infoPersonagens=document.querySelector('.infoPersonagens')

    frasePersonagem.innerText=frase
    modal.style.display='flex'
    nomeModal.innerText=i[0];
    tituloModal.innerText="Title: "+i[2];
    imagemModal.src=i[3];
    familiaModal.innerText=i[1];


    //Condições que irão verificar a casa do personagem e mdificar o background do modal a partir da cor da casa do personagem
    if(i[1]==='House Targaryen' || i[1]==='Targaryan'){
        infoPersonagens.style.backgroundColor='rgba(227, 44, 28, 0.3)'
        }
        else if (i[1]==='House Stark' || i[1]==='Stark'){
            infoPersonagens.style.backgroundColor='rgba(82, 79, 89, 0.3)'
        }
        else if (i[1]=='House Baratheon' ||i[1]=== 'Baratheon'){
            infoPersonagens.style.backgroundColor='rgba(224, 201, 24, 0.3)'
        }
        else if (i[1]=='House Lannister' ||i[1]=== 'House Lanister' ||i[1]=== 'Lannister') {
            infoPersonagens.style.backgroundColor='rgba(146, 24, 17, 0.3)'
        }
        else if (i[1]=='House Tarly' ||i[1]=== 'Tarly') {
           infoPersonagens.style.backgroundColor='rgba(193, 108, 129, 0.3)'
        }
        else if (i[1]=='House Greyjoy' || i[1]==='Greyjoy') {
            infoPersonagens.style.backgroundColor='rgba(54, 45, 32, 0.3)'
        }
        else if (i[1]=='House Tyrell' || i[1]==='Tyrell') {
            infoPersonagens.style.backgroundColor='rgba(92, 137, 53, 0.3)'
        }
        else if (i[1]=='House Mormont' ||i[1]=== 'Mormont') {
            infoPersonagens.style.backgroundColor='rgba(93, 136, 51, 0.3)'
        } 
        else {
            infoPersonagens.style.backgroundColor='#1a1d246b'
        }
}

//evento para fechamento do modal
document.querySelector('#closeModal').addEventListener('click', ()=>{
    document.querySelector('#modal').style.display='none'
    
})

//pesquisa de personagem
let t = document.querySelector('#search');
t.addEventListener('keydown', ()=>{
    let a = filtro(t.value, infoPersonagens)
    inserirImg(a)
})

//função de filtro feita para ser utilizada por outras funções
function filtro(nome, array){

    let f = array.filter( el => el[0].toLowerCase().indexOf(nome.toLowerCase()) > -1);
     return f

}