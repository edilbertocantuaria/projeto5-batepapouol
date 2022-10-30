let mensagens =[];
let nomeUsuario="";
const rolarMensagensAutomaticamente = document.querySelector(".caixa-mensagem");
rolarMensagensAutomaticamente.scrollIntoView();


nomeUser ();
// pegarDados();
// entrarSala();



function nomeUser(){
    nomeUsuario = prompt ("Qual seu lindo nome, chuchu?");
    entrarSala();
    pegarDados();
    
}    

function entrarSala(){
const user = {
    name: nomeUsuario
}
   const promessaUsuario= axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", user);
   promessaUsuario.then(entrouUsuario);
   promessaUsuario.catch(erroUsuario)

}

function manterConexao(){
    // console.log("Mantendo a conexão!")
    const user = {
        name: nomeUsuario
    }
       const promessaConexao= axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user);
//        promessaConexao.then(entrouConexao);
//        promessaConexao.catch(erroConexao)
 }

function entrouUsuario(status){
    console.log(status.status + "," + status.statusText);
}

function erroUsuario(statusErro){
    alert("Esse nome já está logado em nosso sistema! Digite um outro nome ")
    console.log(statusErro.response.status + "," + statusErro.response.statusText);
nomeUser();
}


function pegarDados(){
    // console.log("pegando os dados")
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizarMensagens);
    promessa.catch(dadosError);
}


function renderizarMensagens(dadosColetados){
    mensagens = dadosColetados.data;

    const chatInicial = document.querySelector("main")
    chatInicial.innerHTML="";

for (let i=0; i<mensagens.length; i++){
    let mensagem_dados = mensagens[i]
    if (mensagem_dados.text==="entra na sala..." ||mensagem_dados.text==="sai da sala..." ){
        chatInicial.innerHTML+=`
        <div  class="caixa-mensagem entrou-saiu">
        <div class="horario">(${mensagem_dados.time})</div>
        <div class="mensagem"> <span>${mensagem_dados.from} </span>${mensagem_dados.text}</div>
    </div>`
        } else if(mensagem_dados.to==="Todos"){
            chatInicial.innerHTML+`
            <div  class="caixa-mensagem mensagemPublica">
            <div class="horario">(${mensagem_dados.time})</div>
            <div class="mensagem"> <span>${mensagem_dados.from} </span>para <span>${mensagem_dados.to}:</span> ${mensagem_dados.text}</div>
        </div>`
        } else if  (mensagem_dados.to!="Todos"){
            chatInicial.innerHTML+=`
            <div  class="caixa-mensagem mensagemReservada">
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
    console.log ("Funcionando o botão de enviar mensagem");
}

function participantes(){
    console.log("Funcionando o botão de participantes");
}
