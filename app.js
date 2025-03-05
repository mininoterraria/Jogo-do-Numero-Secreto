let numerosSorteados = [] //Lista onde ficará os valores que já foram sorteados, para permitir que apenas valores diferentes sejam sorteados a cada rodada.
let numeroAleatorio = gerarNumeroAleatorio(); //Variável que armazena o número aleatório.
let tentativas = 1; //Contabiliza a quantidade de tentativas do jogador até descobrir o número secreto.

//Função que mexe com os textos na tela.
function exibirTextoNaTela(tag,texto){
    let conteudohtml = document.querySelector(tag);
    conteudohtml.textContent = texto;
}

//Função que exibe o menu principal.
function menuPrincipal(){
    exibirTextoNaTela('h1','Bem vindo ao Jogo do Número Secreto!');
    exibirTextoNaTela('p','Escolha um número entre 1 a 10.');
}

menuPrincipal();

//Função que verifica o chute inputado pelo usuário.
function verificarChute(){
    let chute = document.querySelector('.container__input');

    //Validação do chute.
    if(chute.value == ''){
        alert("Campo não pode ficar vazio!");
        return;
    }

    if(chute.value <= 0 || chute.value > 10){
        alert("Insira apenas valores entre 1 a 10!");
        return;
    }

    //Tratativa da palavra tentativa ao acertar o número secreto.
    let palavratentativa = '';

    if(tentativas == 1){
        palavratentativa = 'tentativa';
    }else{
        palavratentativa = 'tentativas';
    }
    
    //Tratativa se o chute foi certo ou não.
    if(chute.value == numeroAleatorio){
        exibirTextoNaTela('h1','Parabéns!');
        exibirTextoNaTela('p',`Você descobriu o número secreto em ${tentativas} ${palavratentativa}!`);
        alterarEstadoBotao('chutar','reiniciar');
        return;
    }else{
        exibirTextoNaTela('h1','Você errou!');
        if(chute.value < numeroAleatorio){
            exibirTextoNaTela('p','Dica: O número secreto é maior!');
        }else{
            exibirTextoNaTela('p','Dica: O número secreto é menor!');
        }
        tentativas++;
    }

    limparCampo();

}

//Função que gera o número aleatório.
function gerarNumeroAleatorio(){

    if(numerosSorteados.length == 10){ //Impede que alcance o maximum call stack.
        numerosSorteados = [];
    }

    let numeroGerado = Math.floor(Math.random() * (11 - 1) + 1); //Numero aleatório entre 1 a 10.

    //Caso na próxima rodada seja um número que já foi sorteado, a função é chamada novamente até gerar um número diferente.
    if(numerosSorteados.includes(numeroGerado)){
        return gerarNumeroAleatorio();
    }
       
    numerosSorteados.push(numeroGerado);
    return numeroGerado;
    
}

//Função para limpar o campo de input.
function limparCampo(){
    document.querySelector('.container__input').value = '';
}

//Função que habilita/desabilita botões.
function alterarEstadoBotao(idDisabledAdicionado,idDisabledDisabilitado){
    document.getElementById(idDisabledAdicionado).setAttribute('disabled',true);
    document.getElementById(idDisabledDisabilitado).removeAttribute('disabled');
}

//Função que reinicia o jogo.
function reiniciarJogo(){
    numeroAleatorio = gerarNumeroAleatorio();
    menuPrincipal();
    alterarEstadoBotao('reiniciar','chutar');
    limparCampo();
    tentativas = 1;
}


