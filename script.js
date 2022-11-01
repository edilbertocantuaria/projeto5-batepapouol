let mensagens =[];
let nomeUsuario="";
const rolarMensagensAutomaticamente = document.querySelector("main");
rolarMensagensAutomaticamente.scrollIntoView();

nomeUser ();

function nomeUser(){
    nomeUsuario = prompt ("Qual seu lindo nome, chuchu?");
    entrarSala();
    pegarDados(); //Início para renderizar mensagens
    
}    

function entrarSala(){
const user = {
    name: nomeUsuario
}
   const promessaUsuario= axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", user);
   //promessaUsuario.then(entrouUsuario); //Função que só vai mostrar o console
   promessaUsuario.catch(erroUsuario); //Função que só vai mostrar o console
}

function manterConexao(){
    const user = {
        name: nomeUsuario
    }
       axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user);
 }

function erroUsuario(statusErro){
    alert("Esse nome já está logado em nosso sistema! Digite um outro nome ")
    console.log(statusErro.response.status + "," + statusErro.response.statusText);
nomeUser();
}


function pegarDados(){
    const promessaDados = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessaDados.then(renderizarMensagens);
    promessaDados.catch(dadosError);
}


function renderizarMensagens(dadosColetados){
    mensagens = dadosColetados.data
    const chatInicial = document.querySelector("main")
    chatInicial.innerHTML="";
for (let i=0; i<mensagens.length; i++){
    let mensagem_dados = mensagens[i]
    if (mensagem_dados.type==="status"){
        chatInicial.innerHTML+=`
        <div  class="caixa-mensagem entrou-saiu" data-test="message">
        <div class="horario">(${mensagem_dados.time})</div>
        <div class="mensagem"> <span>${mensagem_dados.from} </span>${mensagem_dados.text}</div>
        </div>`
    } else if(mensagem_dados.type==="message"){
            chatInicial.innerHTML+=`
            <div  class="caixa-mensagem mensagemPublica" data-test="message">
            <div class="horario">(${mensagem_dados.time})</div>
            <div class="mensagem"> <span>${mensagem_dados.from} </span>para <span>${mensagem_dados.to}:</span> ${mensagem_dados.text}</div>
        </div>`
        } else if  ((mensagem_dados.to===nomeUsuario || mensagem_dados.from===nomeUsuario) && mensagem_dados.type==="private_message"){
            chatInicial.innerHTML+=`
            <div  class="caixa-mensagem mensagemReservada" data-test="message">
            <div class="horario">(${mensagem_dados.time})</div>
            <div class="mensagem"> <span>${mensagem_dados.from} </span>reservadamente para <span>${mensagem_dados.to}:</span> ${mensagem_dados.text}</div>
            </div>`
        } 
}
setTimeout(pegarDados, 3000);
setTimeout(manterConexao, 5000);
}

function dadosError(erro){
    console.log(erro);
}

function enviarMensagem(){
    const mensagemDigitada = document.querySelector(".caixaDigitarMensagem").value;
    console.log(mensagemDigitada);

    if(mensagemDigitada==""){
        alert("não pode ter mensagem vazia")
        return
    }
    document.querySelector(".caixaDigitarMensagem").value=""; //limpando o campo logo após enviar mensagem
    const novaMensagem={
            from: nomeUsuario,
            to: "Todos",
           // to: nomeUsuario,
            text: mensagemDigitada,
            type: "message", // ou "private_message" para o bônus
               };
console.log(novaMensagem);

    const promessaEnvio = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem)
    promessaEnvio.then(pegarDados);
    promessaEnvio.catch(deuErroMensagem)
}

function participantes(){
    console.log("Funcionando o botão de participantes");
}

function deuErroMensagem(status){
 console.log(status);
 nomeUser();
}

