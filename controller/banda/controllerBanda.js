/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Banda, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
 *Data: 22/04/2025
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de Dados 
const bandaDAO = require ('../../model/DAO/banda.js')

// Função para inserir nova banda
const inserirBanda = async function(banda, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( banda.nome          == ''  || banda.nome          == null || banda.nome          == undefined || banda.nome.length          > 100 ||
                banda.data_criacao  == ''  || banda.data_criacao  == null || banda.data_criacao  == undefined || banda.data_criacao.length  > 10
            )
            {
                return message.ERROR_REQUIRED_FIELDS // 400
            }else{
                let resultBanda = await bandaDAO.insertBanda(banda)

                if(resultBanda)
                    return message.SUCESS_CREATED_ITEM // 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500 -> erro model
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 -> erro controller
        }
}

// Função para atualizar uma banda
const atualizarBanda = async function(numero, banda, contentType) {
    try {
       let id = numero

       if(String(contentType).toLowerCase() == 'application/json')
           {
            if( banda.nome          == ''  || banda.nome          == null || banda.nome          == undefined || banda.nome.length          > 100 ||
                banda.data_criacao  == ''  || banda.data_criacao  == null || banda.data_criacao  == undefined || banda.data_criacao.length  > 10  ||
                id                  == ''  || id                  == null || id                  == undefined || isNaN(id)
            )
            {
                return message.ERROR_REQUIRED_FIELDS // 400
            }else{
                let result = await bandaDAO.selectByIdBanda(id)

                if(result != false || typeof(result) == 'object'){

                    if(result.length > 0){

                        banda.id_banda = id
                        let resultBanda = await bandaDAO.updateBanda(banda)

                        if(resultBanda){
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

// Função para excluir uma banda
const excluirBanda = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            
            // Antes de excluir, estamos verificando se existe esse id 
            let resultBanda = await bandaDAO.selectByIdBanda(id)

            if(resultBanda != false || typeof(resultBanda) == 'object'){

                if(resultBanda.length > 0){
                    let result = await bandaDAO.deleteBanda(id)
                    
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

// Função para retornar uma lista de bandas
const listarBanda = async function() {
    try {
        let dadosBanda = {}

        let resultBanda = await bandaDAO.selectAllBanda()

        if(resultBanda != false || typeof(resultBanda) == 'object'){
            if(resultBanda.length > 0){
                dadosBanda.status = true
                dadosBanda.status_code = 200,
                dadosBanda.items = resultBanda.length
                dadosBanda.bandas = resultBanda

                return dadosBanda
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

// Função para retornar uma banda pelo ID 
const buscarBanda = async function(numero) {
    try {
        let id = numero

        let dadosBanda = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            let resultBanda = await bandaDAO.selectByIdBanda(id)

            if(resultBanda != false || typeof(resultBanda) == 'object'){
                if(resultBanda.length > 0){
                    dadosBanda.status = true
                    dadosBanda.status_code = 200,
                    dadosBanda.bandas = resultBanda

                    return dadosBanda
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
    inserirBanda,
    atualizarBanda,
    excluirBanda,
    listarBanda,
    buscarBanda
}