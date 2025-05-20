/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Album, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
 *Data: 20/05/2025
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de Dados 
const albumDAO = require ('../../model/DAO/album.js')

// Import da controller necessária para relacionamento
const controllerTipo = require('../tipo_album/controllerTipoAlbum.js')
const controllerGravadora = require('../gravadora/controllerGravadora.js')

const inserirAlbum = async function(album, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( album.nome             == '' || album.nome             == null || album.nome             == undefined || album.nome.length             > 100 ||
                album.data_lancamento  == '' || album.data_lancamento  == null || album.data_lancamento  == undefined || album.data_lancamento.length  > 10  ||
                album.foto             == '' || album.foto             == null || album.foto             == undefined || album.foto.length             > 300 ||
                album.qnt_musicas      == '' || album.qnt_musicas      == null || album.qnt_musicas      == undefined || isNaN(album.qnt_musicas)            ||
                album.id_tipo          == '' || album.id_tipo          ==  undefined || isNaN(album.id_tipo)          ||
                album.id_gravadora     == '' || album.id_gravadora     ==  undefined || isNaN(album.id_gravadora)
            )
            {
                return message.ERROR_REQUIRED_FIELDS // 400
            }else{
                let resultAlbum = await albumDAO.insertAlbum(album)

                if(resultAlbum)
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

const atualizarAlbum = async function(numero, album, contentType) {
    try {
       let id = numero

       if(String(contentType).toLowerCase() == 'application/json')
           {
            if( album.nome             == '' || album.nome             == null || album.nome             == undefined || album.nome.length             > 100 ||
                album.data_lancamento  == '' || album.data_lancamento  == null || album.data_lancamento  == undefined || album.data_lancamento.length  > 10  ||
                album.foto             == '' || album.foto             == null || album.foto             == undefined || album.foto.length             > 300 ||
                album.qnt_musicas      == '' || album.qnt_musicas      == null || album.qnt_musicas      == undefined || isNaN(album.qnt_musicas)            ||
                album.id_tipo          == '' || album.id_tipo          == undefined                                   || isNaN(album.id_tipo)                ||
                album.id_gravadora     == '' || album.id_gravadora     == undefined                                  || isNaN(album.id_gravadora)           ||
                id                     == '' || id                     == null || id                     == undefined || isNaN(id)
            )
            {
                return message.ERROR_REQUIRED_FIELDS // 400
            }else{
                let result = await albumDAO.selectByIdAlbum(id)

                if(result != false || typeof(result) == 'object'){

                    if(result.length > 0){

                        album.id_album = id
                        let resultAlbum = await albumDAO.updateAlbum(album)

                        if(resultAlbum){
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

const excluirAlbum = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id || id <= 0)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            
            // Antes de excluir, estamos verificando se existe esse id 
            let resultAlbum = await albumDAO.selectByIdAlbum(id)

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){

                if(resultAlbum.length > 0){
                    let result = await albumDAO.deleteAlbum(parseInt(id))
                    
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

const listarAlbum = async function() {
    try {
        //Cria um objeto array para montar a nova estrutura de artistas no forEach
        let arrayAlbum = []

        let dadosAlbum = {}

        let resultAlbum = await albumDAO.selectAllAlbum()

        if(resultAlbum != false || typeof(resultAlbum) == 'object'){
            if(resultAlbum.length > 0){
                // Json de retorno 
                dadosAlbum.status = true
                dadosAlbum.status_code = 200,
                dadosAlbum.items = resultAlbum.length
            
                // //Percorrer o array de tipos_artista para pegar ID do tipo e descobrir quais os dados
                // //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com requisições async com await

                for(const itemAlbum of resultAlbum){
                    /* Monta o objeto da classificação para retornar no Artista (1XN) */
                    //Busca os dados do tipo artista na controller de classificacao
                    let dadosTipo = await controllerTipo.buscarTipoAlbum(itemAlbum.id_tipo)
                
                    //Adiciona um atributo tipo artista no JSON de artistas e coloca os dados da classificação
                    itemAlbum.tipo_de_album = dadosTipo.tipo_de_album
                    
                    //Remover um atributo do JSON
                    delete itemAlbum.id_tipo_album


                    let dadosGravadora = await controllerGravadora.buscarGravadora(itemAlbum.id_gravadora)
                    itemAlbum.gravadora = dadosGravadora.gravadora
                    delete itemAlbum.id_gravadora

                    arrayAlbum.push(itemAlbum)
                }

                dadosAlbum.albuns = arrayAlbum

                return dadosAlbum
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

const buscarAlbum = async function(numero) {
    try {
        let arrayAlbum = []

        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            let dadosAlbum = {}

            let resultAlbum = await albumDAO.selectByIdAlbum(id)

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0){
                    dadosAlbum.status = true
                    dadosAlbum.status_code = 200

                    for(const itemAlbum of resultAlbum){
                        /* Monta o objeto da classificação para retornar no Artista (1XN) */
                        //Busca os dados do tipo artista na controller de classificacao
                        let dadosTipo = await controllerTipo.buscarTipoAlbum(itemAlbum.id_tipo)
                    
                        //Adiciona um atributo tipo artista no JSON de artistas e coloca os dados da classificação
                        itemAlbum.tipo_de_album = dadosTipo.tipo_de_album
                        
                        //Remover um atributo do JSON
                        delete itemAlbum.id_tipo_album
    
    
                        let dadosGravadora = await controllerGravadora.buscarGravadora(itemAlbum.id_gravadora)
                        itemAlbum.gravadora = dadosGravadora.gravadora
                        delete itemAlbum.id_gravadora
    
                        arrayAlbum.push(itemAlbum)
                    }
    
                    dadosAlbum.albuns = arrayAlbum
    
                    return dadosAlbum
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
    inserirAlbum,
    atualizarAlbum,
    excluirAlbum,
    listarAlbum,
    buscarAlbum
}