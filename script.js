
let mensagens =[]
pegarDados();
function pegarDados(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizarMensagens);
    promessa.catch(dadosError);
}



function renderizarMensagens(dadosColetados){
    mensagens = dadosColetados.data;
    console.log(mensagens)

    const chatInicial = document.querySelector("main")
    console.log (typeof(chatInicial));
    // chatInicial.innerHTML="";

for (let i=0; i<mensagens.length; i++){
    let mensagem_dados = mensagens[i]
    if (mensagem_dados.text==="entra na sala..." ||mensagem_dados.text==="sai da sala..." ){
        chatInicial.innerHTML=`
        <div  class="caixa-mensagem entrou-saiu">
        <div class="horario">(${mensagem_dados.time})</div>
        <div class="mensagem"> <span>${mensagem_dados.from} </span>${mensagem_dados.text}</div>
    </div>`
        } else if(mensagem_dados.to==="Todos"){
            chatInicial.innerHTML=`
            <div  class="caixa-mensagem mensagemPublica">
            <div class="horario">(${mensagem_dados.time})</div>
            <div class="mensagem"> <span>${mensagem_dados.from} </span>para <span>${mensagem_dados.to}:</span> ${mensagem_dados.text}</div>
        </div>`
        } else if  (mensagem_dados.to!="Todos"){
            chatInicial.innerHTML=`
            <div  class="caixa-mensagem mensagemReservada">
            <div class="horario">(${mensagem_dados.time})</div>
            <div class="mensagem"> <span>${mensagem_dados.from} </span>reservadamente para <span>${mensagem_dados.to}:</span> ${mensagem_dados.text}</div>
            </div>`
        } 
    

}
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
