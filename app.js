const express = require("express");


const app = express();


app.get("/", async (req, res) => {

    const apiUrl = "http://api.iagentesmtp.com.br/api/v3/send/";

    const apiUsuario = 'seu@usuario.com.br';
    const apiChave = '*******************';

    //Dados do email
    const dados = {
        "api_user": apiUsuario,
        "api_key": apiChave,
        "to":
            [{
                // Destinatário
                "email": "email_destinatario@gmail.com",
                "name": "Cesar"
            }]
        ,
        "from":
        {
            // E-mail utilizado para enviar e Remetente
            "name": "Cesar",
            "email": "email_utilizado_para_enviar@gmail.com",
            "reply_to": "email_remetente@gmail.com"
        }
        ,
        "subject": "Assunto - como enviar e-mail com Node.js",
    
        "html": "E-mail enviado com teste : <a href='https://google.com'>Teste</a>",
    
        "text": "E-mail enviado com teste",
    
        "campanhaid": "3",
        "addheaders":
        {
            "x-priority": "1"
        }
    }

    try {

        // Realizar a requisição para a Iagente utilizando o fetch com método POST e enviando na requisição os dados em formato de objeto
        const resposta = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(dados),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        // Ler os dados retornado da API da Iagente
        const dadosResposta = await resposta.json();
    
        // Verificar se consegui enviar o e-mail
        if (dadosResposta.status === 'ok') {
            return res.send("E-mail enviado com sucesso!");
        } else if (dadosResposta.status === 'failed') { // Acessa o ELSE IF quando a Iagente não enviar o e-mail
            return res.status(400).send("Erro ao enviar o e-mail: " + dadosResposta.message);
        } else { // Acessa o ELSE quando tem teve um resposta da Iagente com status conhecido
            return res.status(500).send("Resposta desconhecida do servidor!");
        }
    
    } catch (error) { // Acessa o catch quando tiver erro na requisição
        return res.status(500).send("Erro ao processar a solicitação: " + error.message)
    }

});


app.listen(3333, () => {
    console.log("Servidor iniciado na porta 3333: http://localhost:3333");
});