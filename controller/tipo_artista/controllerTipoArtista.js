/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Tipo Artista, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
 *Data: 22/04/2025
 *Autor: Letícia 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de Dados 
const tipoArtistaDAO = require ('../../model/DAO/tipo_artista.js')

// Função para inserir um tipo de artista
const inserirTipoArtista= async function(item, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(item.tipo_artista  == '' || item.tipo_artista  == null || item.tipo_artista  == undefined || item.tipo_artista.lenght > 100){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultTipo = await tipoArtistaDAO.insertTipoArtista(item)

                if(resultTipo)
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

// Função para atualizar um tipo de artista
const atualizarTipoArtista = async function(numero, item, contentType) {
    try {
        let id = numero

        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( item.tipo_artista   == '' || item.tipo_artista  == null || item.tipo_artista  == undefined || item.tipo_artista.lenght > 100 ||
                    id                  == '' || id                 == null || id                 == undefined || isNaN(id)
                ){
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    // Verifica se o ID está no Banco de dados 
                    let result = await tipoArtistaDAO.selectByIdTipoArtista(id)

                    if(result != false || typeof(result) == 'object'){

                        if(result.length > 0){

                            item.id_tipo_artista = id // Adiciona o atributo do ID no JSON-> com o corpo da requisição
                            let resultTipo = await tipoArtistaDAO.updateTipoArtista(item)

                            if(resultTipo){
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

// Função para excluir um tipo de artista
const excluirTipoArtista = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{

            let resultTipo = await tipoArtistaDAO.selectByIdTipoArtista(id)

            if(resultTipo != false || typeof(resultTipo) == 'object'){

                if(resultTipo.length > 0){
                    let result = await tipoArtistaDAO.deleteTipoArtista(id)
                    
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

// Função para retornar uma lista de tipos de artista
const listarTipoArtista = async function() {
    try {
        let dadosTipo = {}

        let resultTipo = await tipoArtistaDAO.selectAllTipoArtista()

        if(resultTipo != false || typeof(resultTipo) == 'object'){
            if(resultTipo.length > 0){
                dadosTipo.status = true
                dadosTipo.status_code = 200,
                dadosTipo.items = resultTipo.length
                dadosTipo.tipos_de_artista = resultTipo

                return dadosTipo
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

// Função para retornar um tipo de artista pelo ID 
const buscarTipoArtista = async function(numero) {
    try {
        let id = numero

        let dadosTipo = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // 400
        }else{
            let resultTipo = await tipoArtistaDAO.selectByIdTipoArtista(id)

            if(resultTipo != false || typeof(resultTipo) == 'object'){
                if(resultTipo.length > 0){
                    dadosTipo.status = true
                    dadosTipo.status_code = 200,
                    dadosTipo.tipo_de_artista = resultTipo

                    return dadosTipo
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
    inserirTipoArtista,
    atualizarTipoArtista,
    excluirTipoArtista,
    listarTipoArtista,
    buscarTipoArtista
}