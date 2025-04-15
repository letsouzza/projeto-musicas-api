/*********************************************************************************************************************************************************************************
 *Objetivo: Criar uma API para realizar uma integração com o banco de dados 
 *Data: 11/02/2025
 *Autor: Letícia -> Marcel 
 *Versão: 1.0
 *Observações: 
 *  Para criar a API precisa intalar:
 *      express             npm install express --save
 *      cors                npm install cors --save
 *      body-parser         npm install body-parser --save
 
 *  Para criar a conexão com o banco de dados precisa instalar:
 *      prisma              npm install prisma --save
 *      @prisma/client      npm install @prisma/client --save
 * 
 *  Após a instalação do prisma e @prisma/client devemos:
 *      npx prisma init     Para inicializar o prisma no projeto 
 * 
 *  Após esse comando você deverá configurar o .env e o schema.prisma, e rodar o comando:
 *      npx prisma migrate dev 
 * 
 *  Usar trycatch -> para sempre deixar a API no ar
***********************************************************************************************************************************************************************************/

// Import das bibliotecas para criar a API
const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

// Cria um objeto para o Body do tipo JSON 
const bodyParserJSON = bodyParser.json()

// Cria um objeto do app para criar a API 
const app = express()

// Configurações de permissões do CORS para a API 
app.use((request, response, next)=>{

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

/*********************************************************************************************************************************************************************************
* Dia 11/02/2025 -> Autor: Letícia e Marcel
*Endpoints referentes a tabela de música de: Inserir
                                              Atualizar
                                              Deletar
                                              Listar tudo
                                              Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import das Controller do projeto 
const controllerMusicas = require('./controller/musica/controllerMusica')

//EndPoint para inserir uma música 
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe os dados do body da requisição 
    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultMusica = await controllerMusicas.inserirMusica(dadosBody, contentType)

    // Resposta e status code 
    response.status(resultMusica.status_code)
    response.json(resultMusica)

})

// Endpoint para listar todas as musicas
app.get('/v1/controle-musicas/musica', cors(), async function(request, response){

    let resultMusica = await controllerMusicas.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)

})

// Endpoint para buscar música pelo ID
app.get('/v1/controle-musicas/musica-id/:id', cors(), async function(request, response){

    let id = request.params.id 

    let resultMusica = await controllerMusicas.buscarMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)

})

// Endpoint para deletar música pelo ID
app.delete('/v1/controle-musicas/deletar-musica/:id', cors(), async function(request, response){
    
    //Sempre que for buscar pelo ID é por params 
    let id= request.params.id

    let resultMusica = await controllerMusicas.excluirMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

// Endpoint para atualizar música pelo ID
app.put('/v1/controle-musicas/atualizar-musica/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe o ID da música
    let idMusica = request.params.id

    // Recebe os dados da requisição 
    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultMusica = await controllerMusicas.atualizarMusica(idMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})


/*********************************************************************************************************************************************************************************
* Dia 15/04/2025 -> Autor: Letícia
*Endpoints referentes a tabela de música de: Inserir
                                             Atualizar
                                             Deletar
                                             Listar tudo
                                             Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import das Controller do projeto 
const controllerUsuarios = require('./controller/usuario/controllerUsuario')

//EndPoint para inserir um usuário 
app.post('/v1/controle-musicas/usuario', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe os dados do body da requisição 
    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultUsuario = await controllerUsuarios.inserirUsuario(dadosBody, contentType)

    // Resposta e status code 
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)

})

//Endpoint para listar todos os usuários
app.get('/v1/controle-musicas/usuarios', cors(), async function(request, response){
    
    let resultUsuario = await controllerUsuarios.listarUsuario()
    
    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//Endpoint buscar pelo ID
app.get('/v1/controle-musicas/usuario-id/:id', cors(), async function(request, response){

    //Pegando o ID via params
    let id = request.params.id

    // Chama a função e manda o id
    let resultUsuario = await controllerUsuarios.buscarUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

// Endpoint para deletar música pelo ID
app.delete('/v1/controle-musicas/deletar-usuario/:id', cors(), async function(request, response){
    
    //Sempre que for buscar pelo ID é por params 
    let id= request.params.id

    let resultUsuario = await controllerUsuarios.excluirUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//Endpoint para atualizar música pelo ID
app.put('/v1/controle-musicas/atualizar-usuario/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe o ID da música
    let idUser = request.params.id

    // Recebe os dados da requisição 
    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultUsuario = await controllerUsuarios.atualizarUsuario(idUser, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})


app.listen(8080, function(){
    console.log('API aguardando requisições ...')
})