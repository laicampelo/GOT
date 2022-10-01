import {conectarDados} from './conexao.js'
import {citacao} from './conexao.js'
import {infoPersonagens, frasesPersonagens} from './dados.js'

let urlImg="https://thronesapi.com/api/v2/Characters"
let urlCitacao="https://api.gameofthronesquotes.xyz/v1/characters"

conectarDados(urlImg, (response)=>{

    response.forEach((e)=>{
        let arrtemp=[e.fullName, e.family, e.title, e.imageUrl]
        infoPersonagens.push(arrtemp)

    })
    inserirImg(infoPersonagens)
})

citacao(urlCitacao, (response)=>{

    response.forEach((elemento)=>{
        let frase=[elemento.name, elemento.quotes[0]]
        frasesPersonagens.push(frase)

    })
})


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

    divApp.style.display='flex'
    imgCarregamento.style.display='none'
    divSearch.style.display='flex'
}

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

document.querySelector('#closeModal').addEventListener('click', ()=>{
    document.querySelector('#modal').style.display='none'
    
})

let t = document.querySelector('#search');
t.addEventListener('keydown', ()=>{
    let a = filtro(t.value, infoPersonagens)
    inserirImg(a)
})

function filtro(nome, array){

    let f = array.filter( el => el[0].toLowerCase().indexOf(nome.toLowerCase()) > -1);
     return f

}