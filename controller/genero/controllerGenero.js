/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Gênero, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
 *Data: 22/04/2025
 *Autor: Letícia 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de Dados 
const generoDAO = require ('../../model/DAO/genero.js')

// Função para inserir um gênero 
const inserirGenero = async function(item, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(item.genero  == '' || item.genero == null || item.genero == undefined || item.genero.lenght > 100){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultGenero = await generoDAO.insertGenero(item)

                if(resultGenero)
                    return message.SUCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500 -> erro model
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 -> erro controller
    }
}

// Função para atualizar uma genero
const atualizarGenero = async function(numero, item, contentType) {
    // try {
        let id = numero

        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( item.genero  == '' || item.genero == null || item.genero == undefined || item.genero.lenght > 100 ||
                    id           == '' || id          == null || id          == undefined || isNaN(id)
                ){
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    // Verifica se o ID está no Banco de dados 
                    let result = await generoDAO.selectByIdGenero(id)

                    if(result != false || typeof(result) == 'object'){

                        if(result.length > 0){

                            item.id_genero = id // Adiciona o atributo do ID no JSON-> com o corpo da requisição
                            let resultGenero = await generoDAO.updateGenero(item)

                            if(resultGenero){
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

    // } catch (error) {
    //     return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500- controller
    // }
}

// Função para excluir um genero
const excluirGenero = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            
            // Antes de excluir, estamos verificando se existe esse id 
            let resultGenero = await generoDAO.selectByIdGenero(id)

            if(resultGenero != false || typeof(resultGenero) == 'object'){

                if(resultGenero.length > 0){
                    let result = await generoDAO.deleteGenero(id)
                    
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

// Função para retornar uma lista de generos
const listarGenero = async function() {
    try {
        let dadosGenero = {}

        // Chama a função para retornar as músicas do banco de dados
        let resultGenero = await generoDAO.selectAllGenero()

        if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){
                // Cria um JSON para colocar o Array de músicas 
                dadosGenero.status = true
                dadosGenero.status_code = 200,
                dadosGenero.items = resultGenero.length
                dadosGenero.generos = resultGenero

                return dadosGenero
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
const buscarGenero = async function(numero) {
    try {
        let id = numero

        let dadosGenero = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultGenero = await generoDAO.selectByIdGenero(id)

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                    dadosGenero.status = true
                    dadosGenero.status_code = 200,
                    dadosGenero.musics = resultGenero

                    return dadosGenero
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
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}