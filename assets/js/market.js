const market = document.querySelector('#market');
const marketInfo = document.querySelector('#market-info')
const divx = document.querySelector('.criptoDiv');

const obtenerCriptomonedas = criptomonedas => new Promise(resolve=>{
    resolve(criptomonedas);
})

document.addEventListener('DOMContentLoaded',()=>{
    consultarCriptomonedas();
})

async function consultarCriptomonedas(){

    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
    
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const infoCriptos = await obtenerCriptomonedas(resultado);
        showInfo(infoCriptos);
    } catch (error) {
        console.log(error)
    }
}

function showInfo(infoCriptos){
    console.log(infoCriptos.Data)
    infoCriptos.Data.forEach(cripto => {

        const criptoContainer = document.createElement('div');
        criptoContainer.classList.add('cripto-container');

        // Daddy Div 
        const daddyDiv = document.createElement('div');
        daddyDiv.classList.add('daddyDiv');

        // Img&Nombre criptoDiv
        const criptoDiv = document.createElement('div');
        criptoDiv.classList.add('d-flex','flex-column','align-items-center','criptoDiv','mt-2');

        const {FullName, ImageUrl} = cripto.CoinInfo;
        
        const criptoImg = document.createElement('img');
        const urlImg = `https://www.cryptocompare.com/${ImageUrl}`;
        const img = criptoImg.innerHTML = `<img src="${urlImg}">`;
        const criptoName = document.createElement('p');
        const name = criptoName.innerHTML = `<p>${FullName}`;

        const cripx = criptoDiv.innerHTML = `${img}${name}`
        criptoContainer.appendChild(criptoDiv);

        // Stats infoDiv

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('d-flex','infoDiv','align-items-center','justify-content-evenly');

        const {PRICE,HIGH24HOUR,LOW24HOUR,TOTALVOLUME24HTO} = cripto.DISPLAY.USD;

        const price = document.createElement('p');
        const precio = price.innerHTML = `<p>${PRICE}`;
        const top24 = document.createElement('p');
        const top24hrs = top24.innerHTML = `<p>${HIGH24HOUR}`;
        const low24 = document.createElement('p');
        const low24hrs = low24.innerHTML = `<p>${LOW24HOUR}`;
        const volume24 = document.createElement('p');
        const totalV24 = volume24.innerHTML = `<p>${TOTALVOLUME24HTO}`;

        infoDiv.innerHTML = `${precio}${top24hrs}${low24hrs}${totalV24}`;
        criptoContainer.appendChild(infoDiv);

        //Agregamos los 2 Divs hijos al Padre
        marketInfo.appendChild(criptoContainer);

        

        
    });
}