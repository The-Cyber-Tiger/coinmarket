// import
gsap.registerPlugin(MotionPathPlugin);

// ---Gsap Animation Variables---
const tl = gsap.timeline(),
    tl2 = gsap.timeline(),
    tl3 = gsap.timeline(),
    tl4 = gsap.timeline(),
    tl5 = gsap.timeline();

const cotiza = document.querySelector('.cotiza'),
    blockChain = document.querySelector('.blockchain'),
    btc = document.querySelector('.btc'),
    eth = document.querySelector('.eth'),
    ltc = document.querySelector('.ltc'),
    usdt = document.querySelector('.usdt'),
    mrkt = document.querySelector('.market'),
    mrktImg = document.querySelector('.market-img');
    cardx = document.querySelectorAll('.cardx');

document.addEventListener('DOMContentLoaded',()=>{

    const coins = document.querySelectorAll('.coin');

    // ---Coins Animation---
    const flipCoin = function(cripto) {
        tl4.set(cripto, {
            rotationY: 0
        })
        tl4.to(cripto, {
            rotationY: 360,
            ease: 'none',
            duration: 0.5
        });
    }
    gsap.set('.cotiza-link',{opacity: 0})
    gsap.to('.cotiza-link',{opacity: 1,duration: 1, repeat: 5})
    
    // ---Screen Size Animation Triggers---
    if(window.screen.width<768){
         
    
        let topCoins = tl3.to('.coins', {
            y: -100,
            duration: 1,
            delay: 0.5,
            paused: false,
            stagger: {
                repeat: 0
            }
        }).to('.btc', {
            y: -100,
            x: 0,
            duration: 2
        }).to('.eth', {
            y: -25,
            x: -140,
            duration: 2
        
        }, '-=2').to('.usdt', {
            y: -25,
            x: 155,
            duration: 2
        }, '-=2').to('.lite', {
            y: 50,
            x: 0,
            duration: 2
        }, '-=2');
      
        topCoins.pause();   
    
       
        cotiza.addEventListener('touchstart',() => {
           
        topCoins.play();
        setTimeout(() => {
            topCoins.kill()
        }, 4000);
            
        })
    }else{
        
        // ---Cotiza Top-Coins Animation---
        tl3.set('.coins',{
            y: 0
        }).set('.btc',{
            y: 35,
            x: -210
        }).set('.usdt',{
            y: -100,
            x: 10
        }).set('.eth',{
            y: 140,
            x: 10
        }).set('.lite',{
            y: 35,
            x: 210
        });
    
        let topCoins = tl3.to('.coins', {
            y: -100,
            duration: 1,
            delay: 0.5,
            paused: false,
            stagger: {
                repeat: 0
            }
        }).to('.btc', {
            y: -100,
            x: 15,
            duration: 2
        }).to('.eth', {
            y: 50,
            x: 245,
            duration: 2
        
        }, '-=2').to('.usdt', {
            y: 50,
            x: -205,
            duration: 2
        }, '-=2').to('.lite', {
            y: 100,
            x: 20,
            duration: 2
        }, '-=2');
        topCoins.pause();   
    
        cotiza.addEventListener('mouseenter',() => {
            topCoins.play();
            setTimeout(() => {
                topCoins.kill()
            }, 5000);
        });
    
        mrkt.addEventListener('mouseenter',()=>{
            pointsBounce.play();
        });
        mrkt.addEventListener('mouseleave',()=>{
            pointsBounce.kill();   
        });
        
        
    }
    
    coins.forEach(coin => {
    
        if(window.screen.width<768){
            coin.addEventListener('click', (coin) => {
                
                var coinId = `.${coin.target.id}`
                flipCoin(coinId)
        
            });
    
    
        }
        coin.addEventListener('mouseenter', (coin) => {
            var coinId = `.${coin.target.id}`
            flipCoin(coinId)
    
        });
        
        coin.addEventListener('mouseleave', () => {
       
        console.log('kill')
        })
    });
    
    // ---Dynamic Cripto Bar Animation---
    gsap.set(".box", {
        x: 0,
    });
    
    tl.to(".box", {
        duration: 15,
        ease: "none",
        x: "+=1100", //move each box 500px to right
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % -1440) //force x value to be between 0 and 500 using modulus
        },
        repeat: -1
    });
    
    // ---Blockchain Animation---
    
    let blockChainx =  tl2.fromTo('.electron ,.electron2 ,.electron3 ,.electron4', { rotationX: 90 }, {
        ease: 'none',
        duration: 4,
        stagger: {
            each: -0.5,
            repeat: -1
        }
    }, 0);
    
    blockChainx.pause();

    blockChain.addEventListener( 'mouseenter',()=>{
        blockChainx.play();
    })
    blockChain.addEventListener('touchstart',()=>{
        blockChainx.play();
    })
    blockChain.addEventListener('mouseleave',()=>{
        blockChainx.pause();
    })
    
    
    tl2.to('.path', {
            rotationZ: 360,
            ease: 'none',
            duration: 4,
            stagger: {
                each: -0.5,
                repeat: -1
            }
        },
        0)
    
    tl2.progress(0.9999);
    
    // ---Market Points Animation---
    gsap.set(".point",{
        x: 0,
        y: 30,
        opacity: 0
    });
    
    const pointsBounce = tl5.to(".point",8,{
        opacity: 1,
        repeat: -1,
        motionPath: {
            path: [
              { x: 0, y: 0 },
              { x: 50, y: -70 },
              { x: -50, y: -180 },
              { x: 0, y: -220 },
            ],
            type: "cubic",
            curviness: 1,
            autoRotate: true}
    },'-=8').to(".point-sm",8,{
        repeat: -1,
        motionPath: {
            path: [
              { x: 0, y: 0 },
              { x: -50, y: -70 },
              { x: 50, y: -180 },
              { x: 0, y: -320 }
            ],
            type: "cubic",
            curviness: 1,
            autoRotate: true}
    }).pause();
    
    
})
