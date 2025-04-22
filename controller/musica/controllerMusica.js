/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Música, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
 *Data: 18/02/2025
 *Autor: Letícia -> Marcel 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de Dados 
const musicaDAO = require ('../../model/DAO/musica.js')

// Função para inserir nova música 
const inserirMusica = async function(musica, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if ( musica.nome            == ''        || musica.nome             == null || musica.nome             == undefined || musica.nome.length               > 100 || 
                musica.duracao          == ''        || musica.duracao          == null || musica.duracao          == undefined || musica.duracao.length            > 8   ||
                musica.data_lancamento  == ''        || musica.data_lancamento  == null || musica.data_lancamento  == undefined || musica.data_lancamento.length    > 10  ||
                musica.link             == undefined || musica.link.length      > 200   ||
                musica.letra            == undefined 
            )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else{
                //encaminhando os dados da música para o DAO realizar o insert no Banco de dados 
                let resultMusica = await musicaDAO.insertMusica(musica)

                if(resultMusica)
                    return message.SUCESS_CREATED_ITEM //status code 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //status code 500 -> erro model
            }
        }else{
            return message.ERROR_CONTENT_TYPE //status code 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // status code 500 -> erro controller
    }
}

// Função para atualizar uma música 
const atualizarMusica = async function(numero, musica, contentType) {
     try {
        let id = numero

        // Copiamos o início do código inserir musica
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if ( musica.nome            == ''        || musica.nome             == null || musica.nome             == undefined || musica.nome.length               > 100 || 
                    musica.duracao          == ''        || musica.duracao          == null || musica.duracao          == undefined || musica.duracao.length            > 8   ||
                    musica.data_lancamento  == ''        || musica.data_lancamento  == null || musica.data_lancamento  == undefined || musica.data_lancamento.length    > 10  ||
                    musica.link             == undefined || musica.link.length      > 200   ||
                    musica.letra            == undefined ||
                    id                      == ''        || id                      == null || id                      == undefined || isNaN(id)
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //status code 400
                }else{

                    // Verifica se o ID está no Banco de dados 
                    let result = await musicaDAO.selectByIdMusica(id)

                    if(result != false || typeof(result) == 'object'){

                        if(result.length > 0){

                            //UPDATE 
                            musica.id = id // Adiciona o atributo do ID no JSON (musica) -> com o corpo da requisição
                            let resultMusica = await musicaDAO.updateMusica(musica)

                            if(resultMusica){
                                return message.SUCESS_UPDATE_ITEM // 200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL // 500- model
                            }

                        }else{
                            return message.ERROR_NOT_FOUND // 404
                        }
                    }
                }

            }else{
                return message.ERROR_CONTENT_TYPE // 415
            }

     } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500- controller
     }
}

// Função para excluir uma música 
const excluirMusica = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            
            // Antes de excluir, estamos verificando se existe esse id 
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){

                if(resultMusica.length > 0){

                    // Chama a função para retornar as músicas do banco de dados
                    let result = await musicaDAO.deleteMusica(id)
                    
                    if(result)
                        return message.SUCESS_DELETE_ITEM // 200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL // 500- model

                }else{
                    return message.ERROR_NOT_FOUND // 404
                }


            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500- model
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para retornar uma lista de músicas 
const listarMusica = async function() {
    try {
        // Objeto JSON
        let dadosMusica = {}

        // Chama a função para retornar as músicas do banco de dados
        let resultMusica = await musicaDAO.selectAllMusica()

        if(resultMusica != false || typeof(resultMusica) == 'object'){
            if(resultMusica.length > 0){
                // Cria um JSON para colocar o Array de músicas 
                dadosMusica.status = true
                dadosMusica.status_code = 200,
                dadosMusica.items = resultMusica.length
                dadosMusica.musics = resultMusica

                return dadosMusica
            }else{
                return message.ERROR_NOT_FOUND // 404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        }
        

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para retornar uma música pelo ID 
const buscarMusica = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosMusica = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosMusica.status = true
                    dadosMusica.status_code = 200,
                    dadosMusica.musics = resultMusica

                    return dadosMusica
                }else{
                    return message.ERROR_NOT_FOUND // 404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}