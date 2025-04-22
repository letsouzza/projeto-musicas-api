/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Nacionalidade, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
 *Data: 22/04/2025
 *Autor: Letícia 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de Dados 
const nacionalidadeDAO = require ('../../model/DAO/nacionalidade.js')

// Função para inserir uma nacionalidade
const inserirNacionalidade = async function(item, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(item.nacionalidade  == '' || item.nacionalidade == null || item.nacionalidade == undefined || item.nacionalidade.lenght > 100){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultNacionalidade = await nacionalidadeDAO.insertNacionalidade(item)

                if(resultNacionalidade)
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

// Função para atualizar uma nacionalidade
const atualizarNacionalidade = async function(numero, item, contentType) {
    try {
        let id = numero

        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( item.nacionalidade  == '' || item.nacionalidade == null || item.nacionalidade == undefined || item.nacionalidade.lenght > 100 ||
                    id                  == '' || id                 == null || id                 == undefined || isNaN(id)
                ){
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    // Verifica se o ID está no Banco de dados 
                    let result = await nacionalidadeDAO.selectByIdNacionalidade(id)

                    if(result != false || typeof(result) == 'object'){

                        if(result.length > 0){

                            item.id_nacionalidade = id // Adiciona o atributo do ID no JSON-> com o corpo da requisição
                            let resultNacionalidade = await nacionalidadeDAO.updateNacionalidade(item)

                            if(resultNacionalidade){
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

// Função para excluir uma nacionalidade
const excluirNacionalidade = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{

            let resultNacionalidade = await nacionalidadeDAO.selectByIdNacionalidade(id)

            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){

                if(resultNacionalidade.length > 0){
                    let result = await nacionalidadeDAO.deleteNacionalidade(id)
                    
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

// Função para retornar uma lista de nacionalidades
const listarNacionalidade = async function() {
    try {
        let dadosNacionalidade = {}

        let resultNacionalidade = await nacionalidadeDAO.selectAllNacionalidade()

        if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
            if(resultNacionalidade.length > 0){
                dadosNacionalidade.status = true
                dadosNacionalidade.status_code = 200,
                dadosNacionalidade.items = resultNacionalidade.length
                dadosNacionalidade.nacionalidades = resultNacionalidade

                return dadosNacionalidade
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

// Função para retornar uma nacionalidade pelo ID 
const buscarNacionalidade = async function(numero) {
    try {
        let id = numero

        let dadosNacionalidade = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // 400
        }else{
            let resultNacionalidade = await nacionalidadeDAO.selectByIdNacionalidade(id)

            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                if(resultNacionalidade.length > 0){
                    dadosNacionalidade.status = true
                    dadosNacionalidade.status_code = 200,
                    dadosNacionalidade.nacionalidade = resultNacionalidade

                    return dadosNacionalidade
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
    inserirNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade,
    listarNacionalidade,
    buscarNacionalidade
}