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
app.get('/v1/controle-musicas/musicas', cors(), async function(request, response){

    let resultMusica = await controllerMusicas.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

// Endpoint para buscar música pelo ID
app.get('/v1/controle-musicas/musica/:id', cors(), async function(request, response){

    let id = request.params.id 

    let resultMusica = await controllerMusicas.buscarMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

// Endpoint para deletar música pelo ID
app.delete('/v1/controle-musicas/musica/:id', cors(), async function(request, response){
    
    //Sempre que for buscar pelo ID é por params 
    let id= request.params.id

    let resultMusica = await controllerMusicas.excluirMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

// Endpoint para atualizar música pelo ID
app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function(request, response){

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
*Endpoints referentes a tabela de usuário de: Inserir
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
app.get('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){

    //Pegando o ID via params
    let id = request.params.id

    // Chama a função e manda o id
    let resultUsuario = await controllerUsuarios.buscarUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

// Endpoint para deletar usuário pelo ID
app.delete('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){
    
    //Sempre que for buscar pelo ID é por params 
    let id= request.params.id

    let resultUsuario = await controllerUsuarios.excluirUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//Endpoint para atualizar usuário pelo ID
app.put('/v1/controle-musicas/usuario/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe o ID do usuário
    let idUser = request.params.id

    // Recebe os dados da requisição 
    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultUsuario = await controllerUsuarios.atualizarUsuario(idUser, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})


/*********************************************************************************************************************************************************************************
* Dia 15/04/2025 -> Autor: Letícia
*Endpoints referentes a tabela de gravadora de: Inserir
                                                Atualizar
                                                Deletar
                                                Listar tudo
                                                Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import das Controller do projeto 
const controllerGravadora = require('./controller/gravadora/controllerGravadora')

//EndPoint para inserir uma gravadora  
app.post('/v1/controle-musicas/gravadora', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe os dados do body da requisição 
    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultGravadora = await controllerGravadora.inserirGravadora(dadosBody, contentType)

    // Resposta e status code 
    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

// Endpoint para listar todas as gravadoras
app.get('/v1/controle-musicas/gravadoras', cors(), async function(request, response){

    let resultGravadora = await controllerGravadora.listarGravadora()

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//Endpoint buscar pelo ID
app.get('/v1/controle-musicas/gravadora/:id', cors(), async function(request, response){

    //Pegando o ID via params
    let id = request.params.id

    // Chama a função e manda o id
    let resultGravadora = await controllerGravadora.buscarGravadora(id)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

// Endpoint para deletar gravadora pelo ID
app.delete('/v1/controle-musicas/gravadora/:id', cors(), async function(request, response){
    
    //Sempre que for buscar pelo ID é por params 
    let id= request.params.id

    let resultGravadora = await controllerGravadora.excluirGravadora(id)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//Endpoint para atualizar gravadora pelo ID
app.put('/v1/controle-musicas/gravadora/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let idGravadora = request.params.id

    // Recebe os dados da requisição 
    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultGravadora = await controllerGravadora.atualizarGravadora(idGravadora, dadosBody, contentType)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})


/*********************************************************************************************************************************************************************************
* Dia 22/04/2025 -> Autor: Letícia
*Endpoints referentes a tabela de gênero de: Inserir
                                             Atualizar
                                             Deletar
                                             Listar tudo
                                             Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import das Controller do projeto 
const controllerGenero = require('./controller/genero/controllerGenero')

//EndPoint para inserir um genero  
app.post('/v1/controle-musicas/genero', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe os dados do body da requisição 
    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    // Resposta e status code 
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

// Endpoint para listar todos os gêneros
app.get('/v1/controle-musicas/generos', cors(), async function(request, response){

    let resultGenero = await controllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

// Endpoint para buscar genero pelo id
app.get('/v1/controle-musicas/genero/:id', cors(), async function(request, response){

    //Pegando o ID via params
    let id = request.params.id

    // Chama a função e manda o id
    let resultGenero = await controllerGenero.buscarGenero(id)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

// Endpoint para deletar genero pelo ID
app.delete('/v1/controle-musicas/genero/:id', cors(), async function(request, response){

    let id= request.params.id

    let resultGenero = await controllerGenero.excluirGenero(id)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para atualizar genero pelo ID
app.put('/v1/controle-musicas/genero/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idGenero = request.params.id

    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultGenero = await controllerGenero.atualizarGenero(idGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})


/*********************************************************************************************************************************************************************************
* Dia 22/04/2025 -> Autor: Letícia
*Endpoints referentes a tabela de banda de: Inserir
                                             Atualizar
                                             Deletar
                                             Listar tudo
                                             Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import das Controller do projeto 
const controllerBanda = require('./controller/banda/controllerBanda')

//EndPoint para inserir uma banda  
app.post('/v1/controle-musicas/banda', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultBanda = await controllerBanda.inserirBanda(dadosBody, contentType)

    // Resposta e status code 
    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

// Endpoint para listar todas as bandas
app.get('/v1/controle-musicas/bandas', cors(), async function(request, response){

    let resultBanda = await controllerBanda.listarBanda()

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

// Endpoint para buscar banda pelo id
app.get('/v1/controle-musicas/banda/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultBanda = await controllerBanda.buscarBanda(id)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

// Endpoint para deletar genero pelo ID
app.delete('/v1/controle-musicas/banda/:id', cors(), async function(request, response){

    let id= request.params.id

    let resultBanda = await controllerBanda.excluirBanda(id)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})

//Endpoint para atualizar banda pelo ID
app.put('/v1/controle-musicas/banda/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idBanda = request.params.id

    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultBanda = await controllerBanda.atualizarBanda(idBanda, dadosBody, contentType)

    response.status(resultBanda.status_code)
    response.json(resultBanda)
})


/*********************************************************************************************************************************************************************************
* Dia 22/04/2025 -> Autor: Letícia
*Endpoints referentes a tabela de nacionalidade de: Inserir
                                                    Atualizar
                                                    Deletar
                                                    Listar tudo
                                                    Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import da Controller do projeto 
const controllerNacionalidade = require('./controller/nacionalidade/controllerNacionalidade')

//EndPoint para inserir uma nacionalidade
app.post('/v1/controle-musicas/nacionalidade', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultNacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

// Endpoint para listar todas as nacionalidades
app.get('/v1/controle-musicas/nacionalidades', cors(), async function(request, response){

    let resultNacionalidade = await controllerNacionalidade.listarNacionalidade()

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

// Endpoint para buscar nacionalidade pelo id
app.get('/v1/controle-musicas/nacionalidade/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultNacionalidade = await controllerNacionalidade.buscarNacionalidade(id)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

// Endpoint para deletar nacionalidade pelo ID
app.delete('/v1/controle-musicas/nacionalidade/:id', cors(), async function(request, response){

    let id= request.params.id

    let resultNacionalidade = await controllerNacionalidade.excluirNacionalidade(id)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})

//Endpoint para atualizar nacionalidade pelo ID
app.put('/v1/controle-musicas/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idNacionalidade = request.params.id

    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultNacionalidade = await controllerNacionalidade.atualizarNacionalidade(idNacionalidade, dadosBody, contentType)

    response.status(resultNacionalidade.status_code)
    response.json(resultNacionalidade)
})


/*********************************************************************************************************************************************************************************
* Dia 22/04/2025 -> Autor: Letícia
*Endpoints referentes a tabela tipo de artista de: Inserir
                                                   Atualizar
                                                   Deletar
                                                   Listar tudo
                                                   Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import da Controller do projeto 
const controllerTipoArtista = require('./controller/tipo_artista/controllerTipoArtista')

//EndPoint para inserir um tipo artista
app.post('/v1/controle-musicas/tipo-artista', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultTipo = await controllerTipoArtista.inserirTipoArtista(dadosBody, contentType)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

// Endpoint para listar todos os tipos artistas
app.get('/v1/controle-musicas/tipos-artista', cors(), async function(request, response){

    let resultTipo = await controllerTipoArtista.listarTipoArtista()

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

// Endpoint para buscar tipo artista pelo ID
app.get('/v1/controle-musicas/tipo-artista/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultTipo = await controllerTipoArtista.buscarTipoArtista(id)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

// Endpoint para deletar tipo artista pelo ID
app.delete('/v1/controle-musicas/tipo-artista/:id', cors(), async function(request, response){

    let id= request.params.id

    let resultTipo = await controllerTipoArtista.excluirTipoArtista(id)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

//Endpoint para atualizar tipo artista pelo ID
app.put('/v1/controle-musicas/tipo-artista/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idTipoArtista = request.params.id

    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultTipo = await controllerTipoArtista.atualizarTipoArtista(idTipoArtista, dadosBody, contentType)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})


/*********************************************************************************************************************************************************************************
* Dia 06/05/2025 -> Autor: Letícia
*Endpoints referentes a tabela tipo de album: Inserir
                                              Atualizar
                                              Deletar
                                              Listar tudo
                                              Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import da Controller do projeto 
const controllerTipoAlbum = require('./controller/tipo_album/controllerTipoAlbum')

//EndPoint para inserir um tipo album
app.post('/v1/controle-musicas/tipo-album', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultTipo = await controllerTipoAlbum.inserirTipoAlbum(dadosBody, contentType)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

// Endpoint para listar todos os tipos albuns
app.get('/v1/controle-musicas/tipos-album', cors(), async function(request, response){

    let resultTipo = await controllerTipoAlbum.listarTipoAlbum()

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

// Endpoint para buscar tipo album pelo ID
app.get('/v1/controle-musicas/tipo-album/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultTipo = await controllerTipoAlbum.buscarTipoAlbum(id)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

// Endpoint para deletar tipo album pelo ID
app.delete('/v1/controle-musicas/tipo-album/:id', cors(), async function(request, response){

    let id= request.params.id

    let resultTipo = await controllerTipoAlbum.excluirTipoAlbum(id)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

//Endpoint para atualizar tipo album pelo ID
app.put('/v1/controle-musicas/tipo-album/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idTipoAlbum = request.params.id

    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultTipo = await controllerTipoAlbum.atualizarTipoAlbum(idTipoAlbum, dadosBody, contentType)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})


/*********************************************************************************************************************************************************************************
* Dia 06/05/2025 -> Autor: Letícia
*Endpoints referentes a tabela artista: Inserir
                                        Atualizar
                                        Deletar
                                        Listar tudo
                                        Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import da Controller do projeto 
const controllerArtista = require('./controller/artista/controllerArtista')

//EndPoint para inserir um artista
app.post('/v1/controle-musicas/artista', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultArtista = await controllerArtista.inserirArtista(dadosBody, contentType)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

// Endpoint para listar todos os artistas
app.get('/v1/controle-musicas/artistas', cors(), async function(request, response){

    let resultArtista = await controllerArtista.listarArtista()

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

// Endpoint para buscar artista pelo ID
app.get('/v1/controle-musicas/artista/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultArtistas = await controllerArtista.buscarArtista(id)

    response.status(resultArtistas.status_code)
    response.json(resultArtistas)
})

// Endpoint para deletar artista pelo ID
app.delete('/v1/controle-musicas/artista/:id', cors(), async function(request, response){

    let id= request.params.id

    let resultArtista = await controllerArtista.excluirArtista(id)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

//Endpoint para atualizar artista pelo ID
app.put('/v1/controle-musicas/artista/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idArtista = request.params.id

    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultArtista = await controllerArtista.atualizarArtista(idArtista, dadosBody, contentType)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})


/*********************************************************************************************************************************************************************************
* Dia 20/05/2025 -> Autor: Letícia
*Endpoints referentes a tabela playlist:Inserir
                                        Atualizar
                                        Deletar
                                        Listar tudo
                                        Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import da Controller do projeto 
const controllerPlaylist = require('./controller/playlist/controllerPlaylist')

//EndPoint para inserir uma playlist
app.post('/v1/controle-musicas/playlist', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultPlaylist = await controllerPlaylist.inserirPlaylist(dadosBody, contentType)

    response.status(resultPlaylist.status_code)
    response.json(resultPlaylist)
})

// Endpoint para listar todas as playlists
app.get('/v1/controle-musicas/playlist', cors(), async function(request, response){

    let resultPlaylist = await controllerPlaylist.listarPlaylist()

    response.status(resultPlaylist.status_code)
    response.json(resultPlaylist)
})

// Endpoint para buscar playlist pelo ID
app.get('/v1/controle-musicas/playlist/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultPlaylist = await controllerPlaylist.buscarPlaylist(id)

    response.status(resultPlaylist.status_code)
    response.json(resultPlaylist)
})

// Endpoint para deletar playlist pelo ID
app.delete('/v1/controle-musicas/playlist/:id', cors(), async function(request, response){

    let id= request.params.id

    let resultPlaylist = await controllerPlaylist.excluirPlaylist(id)

    response.status(resultPlaylist.status_code)
    response.json(resultPlaylist)
})

//Endpoint para atualizar playlist pelo ID
app.put('/v1/controle-musicas/playlist/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idPlaylist = request.params.id

    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultPlaylist = await controllerPlaylist.atualizarPlaylist(idPlaylist, dadosBody, contentType)

    response.status(resultPlaylist.status_code)
    response.json(resultPlaylist)
})


/*********************************************************************************************************************************************************************************
* Dia 20/05/2025 -> Autor: Letícia
*Endpoints referentes a tabela album:   Inserir
                                        Atualizar
                                        Deletar
                                        Listar tudo
                                        Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import da Controller do projeto 
const controllerAlbum = require('./controller/album/controllerAlbum')

//EndPoint para inserir um album
app.post('/v1/controle-musicas/album', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultAlbum = await controllerAlbum.inserirAlbum(dadosBody, contentType)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

// Endpoint para listar todas os albuns
app.get('/v1/controle-musicas/album', cors(), async function(request, response){

    let resultAlbum = await controllerAlbum.listarAlbum()

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

// Endpoint para buscar album pelo ID
app.get('/v1/controle-musicas/album/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultAlbum = await controllerAlbum.buscarAlbum(id)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

// Endpoint para deletar album pelo ID
app.delete('/v1/controle-musicas/album/:id', cors(), async function(request, response){

    let id= request.params.id

    let resultAlbum = await controllerAlbum.excluirAlbum(id)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

//Endpoint para atualizar album pelo ID
app.put('/v1/controle-musicas/album/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idAlbum = request.params.id

    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultAlbum = await controllerAlbum.atualizarAlbum(idAlbum, dadosBody, contentType)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})


/*********************************************************************************************************************************************************************************
* Dia 20/05/2025 -> Autor: Letícia
*Endpoints referentes a tabela email:   Inserir
                                        Atualizar
                                        Deletar
                                        Listar tudo
                                        Buscar pelo ID
 **********************************************************************************************************************************************************************************/

// Import da Controller do projeto 
const controllerEmail = require('./controller/email/controllerEmail')

//EndPoint para inserir um email
app.post('/v1/controle-musicas/email', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let dadosBody = request.body 

    // Chama a função da controller para inserir os dados e aguarda o retorno da função 
    let resultEmail = await controllerEmail.inserirEmail(dadosBody, contentType)

    response.status(resultEmail.status_code)
    response.json(resultEmail)
})

// Endpoint para listar todos os emails
app.get('/v1/controle-musicas/email', cors(), async function(request, response){

    let resultEmail = await controllerEmail.listarEmail()

    response.status(resultEmail.status_code)
    response.json(resultEmail)
})

// Endpoint para buscar email pelo ID
app.get('/v1/controle-musicas/email/:id', cors(), async function(request, response){

    let id = request.params.id

    let resultEmail = await controllerEmail.buscarEmail(id)

    response.status(resultEmail.status_code)
    response.json(resultEmail)
})

// Endpoint para deletar email pelo ID
app.delete('/v1/controle-musicas/email/:id', cors(), async function(request, response){

    let id= request.params.id

    let resultEmail = await controllerEmail.excluirEmail(id)

    response.status(resultEmail.status_code)
    response.json(resultEmail)
})

//Endpoint para atualizar email pelo ID
app.put('/v1/controle-musicas/email/:id', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']

    let idEmail = request.params.id

    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultEmail = await controllerEmail.atualizarEmail(idEmail, dadosBody, contentType)

    response.status(resultEmail.status_code)
    response.json(resultEmail)
})


app.listen(8080, function(){
    console.log('API aguardando requisições ...')
})