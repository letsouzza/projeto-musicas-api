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
const tipoAlbumDAO = require ('../../model/DAO/tipo_album.js')

const inserirTipoAlbum= async function(item, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            if(item.tipo_album  == '' || item.tipo_album  == null || item.tipo_album  == undefined || item.tipo_album.lenght > 100){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultTipo = await tipoAlbumDAO.insertTipoAlbum(item)

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

const atualizarTipoAlbum = async function(numero, item, contentType) {
    try {
        let id = numero

        if(String(contentType).toLowerCase() == 'application/json')
            {
                if( item.tipo_album   == '' || item.tipo_album  == null || item.tipo_album  == undefined || item.tipo_album.lenght > 100 ||
                    id                  == '' || id                 == null || id                 == undefined || isNaN(id)
                ){
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    // Verifica se o ID está no Banco de dados 
                    let result = await tipoAlbumDAO.selectByIdTipoAlbum(id)

                    if(result != false || typeof(result) == 'object'){

                        if(result.length > 0){

                            item.id_tipo_album = id // Adiciona o atributo do ID no JSON-> com o corpo da requisição
                            let resultTipo = await tipoAlbumDAO.updateTipoAlbum(item)

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

const excluirTipoAlbum = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{

            let resultTipo = await tipoAlbumDAO.selectByIdTipoAlbum(id)

            if(resultTipo != false || typeof(resultTipo) == 'object'){

                if(resultTipo.length > 0){
                    let result = await tipoAlbumDAO.deleteTipoAlbum(id)
                    
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

const listarTipoAlbum = async function() {
    try {
        let dadosTipo = {}

        let resultTipo = await tipoAlbumDAO.selectAllTipoAlbum()

        if(resultTipo != false || typeof(resultTipo) == 'object'){
            if(resultTipo.length > 0){
                dadosTipo.status = true
                dadosTipo.status_code = 200,
                dadosTipo.items = resultTipo.length
                dadosTipo.tipo_de_album = resultTipo

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

const buscarTipoAlbum = async function(numero) {
    try {
        let id = numero

        let dadosTipo = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // 400
        }else{
            let resultTipo = await tipoAlbumDAO.selectByIdTipoAlbum(id)

            if(resultTipo != false || typeof(resultTipo) == 'object'){
                if(resultTipo.length > 0){
                    dadosTipo.status = true
                    dadosTipo.status_code = 200,
                    dadosTipo.tipo_de_album = resultTipo

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
    inserirTipoAlbum,
    atualizarTipoAlbum,
    excluirTipoAlbum,
    listarTipoAlbum,
    buscarTipoAlbum
}