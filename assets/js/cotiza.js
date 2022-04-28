const criptomonedasSelect = document.querySelector('#criptomonedasSelect');
const monedasSelect = document.querySelector('#moneda');
const showCriptoImg = document.querySelector('#show-img');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}




// Promise
const obtenerCriptomonedas = criptomonedas => new Promise(resolve=>{
    resolve(criptomonedas);
})

document.addEventListener('DOMContentLoaded',()=>{
    consultarCriptomonedas();

    formulario.addEventListener('submit', submitFormulario);

    criptomonedasSelect.addEventListener('change', leerValor);
    monedasSelect.addEventListener('change', leerValor);

});

async function consultarCriptomonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const criptomonedas = await obtenerCriptomonedas(resultado.Data);
        selectCripto(criptomonedas);

    } catch (error) {
        console.log(error);
    }
    
}

function selectCripto(criptomonedas){
    
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;

        
        //Creamos las 10 opciones de criptos a elegir
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        
        criptomonedasSelect.appendChild(option);
    })
    
}

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
    // console.log(objBusqueda)
}

function submitFormulario(e){
    e.preventDefault();

    //Validar
    const { moneda, criptomoneda } = objBusqueda;

    if(moneda === '' || criptomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }

    //Consultar la Api con los resultados
    consultarAPI();
}

function mostrarAlerta(msg){
    const existeError = document.querySelector('.error')

    if(!existeError){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error')
    
    
        //Mensaje de error
        divMensaje.textContent = msg;
        formulario.appendChild(divMensaje);
        setTimeout(()=>{
        divMensaje.remove()
        },3000)
    }
   
}

async function consultarAPI(){
    const { moneda, criptomoneda } = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    try {
        const respuesta = await fetch(url);
        const cotizacion = await respuesta.json();
        mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])

    } catch (error) {
        console.log(error);
    }
}

function mostrarCotizacionHTML(cotizacion){

    limpiarHTML();
  
    const {FROMSYMBOL, PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR,IMAGEURL, LASTUPDATE, LASTMARKET} = cotizacion;

    
    const name = document.createElement('h1');
    name.innerHTML = `${FROMSYMBOL}`;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <strong>${PRICE}</strong>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `<p>El precio más alto del día: <strong>${HIGHDAY}</strong>`;

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `<p>El precio más bajo del día: <strong>${LOWDAY}</strong>`;

    const ult24hras = document.createElement('p');
    ult24hras.innerHTML = `<p>Variación últimas 24 horas: <strong>${CHANGEPCT24HOUR}%</strong>`;

    const ultCambio = document.createElement('p');
    ultCambio.innerHTML = `<p>Última actualización: <strong>${LASTUPDATE}</strong>`;

    const fromMarket = document.createElement('p');
    fromMarket.innerHTML = `<p>Fuente: <strong>${LASTMARKET}</strong>`;

    const criptoImg = document.createElement('img');
    const linkImg = `https://www.cryptocompare.com/${IMAGEURL}`;
    criptoImg.src = linkImg;

    showCriptoImg.appendChild(criptoImg)

    resultado.appendChild(name)
    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ult24hras);
    resultado.appendChild(ultCambio);
    resultado.appendChild(fromMarket);

    gsap.set('#show-img', {
        rotationY: 0
    })
    gsap.to('#show-img', {
        rotationY: 360,
        ease: 'none',
        duration: 2
    });


}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
    while(showCriptoImg.firstChild){
        showCriptoImg.removeChild(showCriptoImg.firstChild);
    }
}