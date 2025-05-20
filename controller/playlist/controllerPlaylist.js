/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Playlist, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
 *Data: 20/05/2025
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de Dados 
const playlistDAO = require ('../../model/DAO/playlist.js')

// Import da controller necessária para relacionamento
const controllerUsuario = require('../usuario/controllerUsuario.js')

const inserirPlaylist = async function(playlist, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( playlist.nome             == '' || playlist.nome             == null || playlist.nome             == undefined || playlist.nome.length             > 100 ||
                playlist.qnt_musicas      == '' || playlist.qnt_musicas      == null || playlist.qnt_musicas      == undefined || isNaN(playlist.qnt_musicas)            ||
                playlist.data_criacao     == '' || playlist.data_criacao     == null || playlist.data_criacao     == undefined || playlist.data_criacao.length     > 10  ||
                playlist.capa             == '' || playlist.capa             == null || playlist.capa             == undefined || playlist.capa.length             > 200 ||
                playlist.id_usuario       == '' || playlist.id_usuario       ==  undefined || isNaN(playlist.id_usuario)
            )
            {
                return message.ERROR_REQUIRED_FIELDS // 400
            }else{
                let resultPlaylist = await playlistDAO.insertPlaylist(playlist)

                if(resultPlaylist)
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

const atualizarPlaylist = async function(numero, playlist, contentType) {
    try {
       let id = numero

       if(String(contentType).toLowerCase() == 'application/json')
           {
            if( playlist.nome             == '' || playlist.nome             == null || playlist.nome             == undefined || playlist.nome.length             > 100 ||
                playlist.qnt_musicas      == '' || playlist.qnt_musicas      == null || playlist.qnt_musicas      == undefined || isNaN(playlist.qnt_musicas)            ||
                playlist.data_criacao     == '' || playlist.data_criacao     == null || playlist.data_criacao     == undefined || playlist.data_criacao.length     > 10  ||
                playlist.capa             == '' || playlist.capa             == null || playlist.capa             == undefined || playlist.capa.length             > 200 ||
                playlist.id_usuario       == '' || playlist.id_usuario       ==  undefined || isNaN(playlist.id_usuario)       ||
                id                        == '' || id                        == null || id                        == undefined || isNaN(id)
            )
            {
                return message.ERROR_REQUIRED_FIELDS // 400
            }else{
                let result = await playlistDAO.selectByIdPlaylist(id)

                if(result != false || typeof(result) == 'object'){

                    if(result.length > 0){

                        playlist.id_playlist = id
                        let resultPlaylist = await playlistDAO.updatePlaylist(playlist)

                        if(resultPlaylist){
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

const excluirPlaylist = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id || id <= 0)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            
            // Antes de excluir, estamos verificando se existe esse id 
            let resultPlaylist = await playlistDAO.selectByIdPlaylist(id)

            if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){

                if(resultPlaylist.length > 0){
                    let result = await playlistDAO.deletePlaylist(parseInt(id))
                    
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

const listarPlaylist = async function() {
    try {
        //Cria um objeto array para montar a nova estrutura de artistas no forEach
        let arrayPlaylist = []

        let dadosPlaylist = {}

        let resultPlaylist = await playlistDAO.selectAllPlaylist()

        if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){
            if(resultPlaylist.length > 0){
                // Json de retorno 
                dadosPlaylist.status = true
                dadosPlaylist.status_code = 200,
                dadosPlaylist.items = resultPlaylist.length
            
                // //Percorrer o array de tipos_artista para pegar ID do tipo e descobrir quais os dados
                // //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com requisições async com await

                for(const itemPlaylist of resultPlaylist){
                    /* Monta o objeto da classificação para retornar no Artista (1XN) */
                    //Busca os dados do tipo artista na controller de classificacao
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemPlaylist.id_usuario)
                
                    //Adiciona um atributo tipo artista no JSON de artistas e coloca os dados da classificação
                    itemPlaylist.usuario = dadosUsuario.user

                    //Remover um atributo do JSON
                    delete itemPlaylist.id_usuario

                    arrayPlaylist.push(itemPlaylist)
                }
                

                dadosPlaylist.playlists = arrayPlaylist

                return dadosPlaylist
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

const buscarPlaylist = async function(numero) {
    try {
        let arrayPlaylist = []

        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            let dadosPlaylist = {}

            let resultPlaylist = await playlistDAO.selectByIdPlaylist(id)

            if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){
                if(resultPlaylist.length > 0){
                    dadosPlaylist.status = true
                    dadosPlaylist.status_code = 200

                    for(const itemPlaylist of resultPlaylist){
                        /* Monta o objeto da classificação para retornar no Artista (1XN) */
                        //Busca os dados do tipo artista na controller de classificacao
                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemPlaylist.id_usuario)
                    
                        //Adiciona um atributo tipo artista no JSON de artistas e coloca os dados da classificação
                        itemPlaylist.usuario= dadosUsuario.user
                        
                        //Remover um atributo do JSON
                        delete itemPlaylist.id_usuario
    
                        arrayPlaylist.push(itemPlaylist)
                    }
                    
    
                    dadosPlaylist.playlists = arrayPlaylist
    
                    return dadosPlaylist
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
    inserirPlaylist,
    atualizarPlaylist,
    excluirPlaylist,
    listarPlaylist,
    buscarPlaylist
}