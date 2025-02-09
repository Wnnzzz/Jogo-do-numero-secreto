let listaNumeroSecreto = [];
let limiteNumero = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto){
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate : 1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela ('h1', 'Jogo do número secreto');
    exibirTextoNaTela ('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto == chute);

    if(chute == numeroSecreto){
        exibirTextoNaTela ('h1', 'Parabéns vc ganhou');
        let palavraTentativa = tentativas >1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `acertou o número secreto com ${tentativas} ${palavraTentativa}` ;
        exibirTextoNaTela ('p', mensagemTentativa);
        document.getElementById ('reiniciar').removeAttribute('disabled');
     

    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela ('p', 'O número secreto é menor');
        } else{
            exibirTextoNaTela ('p', 'O número secreto é maior');
        }

        limparcampo();
        tentativas++;
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random () * limiteNumero + 1);
    let listaCheia = listaNumeroSecreto.length;

    if(listaCheia == limiteNumero){
        listaNumeroSecreto = [];
    }
    if(listaNumeroSecreto.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumeroSecreto.push(numeroEscolhido);
        console.log(listaNumeroSecreto);
        return numeroEscolhido;
    }
}

function limparcampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

document.addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        verificarChute();
    }
})

function reiniciarJogo(){

    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparcampo();
    tentativas = 1;
    document.getElementById ('reiniciar').setAttribute('disabled', true);

}