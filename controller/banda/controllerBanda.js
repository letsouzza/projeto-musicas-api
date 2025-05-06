/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Artista, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
 *Data: 06/05/2025
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de Dados 
const artistaDAO = require ('../../model/DAO/artista.js')

// Função para inserir novo artista
const inserirArtista = async function(artista, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( artista.nome             == '' || artista.nome             == null || artista.nome             == undefined || artista.nome.length             > 100 ||
                artista.data_nascimento  == '' || artista.data_nascimento  == null || artista.data_nascimento  == undefined || artista.data_nascimento.length  > 10  ||
                artista.foto             == '' || artista.foto             == null || artista.foto             == undefined || artista.foto.length             > 300  ||
                artista.id_tipo_artista  == '' || artista.id_tipo_artista  ==  undefined || isNaN(artista.id_tipo_artista)
            )
            {
                return message.ERROR_REQUIRED_FIELDS // 400
            }else{
                let resultArtista = await artistaDAO.insertArtista(artista)

                if(resultArtista)
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

// Função para atualizar um artista
const atualizarArtista = async function(numero, artista, contentType) {
    try {
       let id = numero

       if(String(contentType).toLowerCase() == 'application/json')
           {
            if( artista.nome             == '' || artista.nome             == null || artista.nome             == undefined || artista.nome.length             > 100 ||
                artista.data_nascimento  == '' || artista.data_nascimento  == null || artista.data_nascimento  == undefined || artista.data_nascimento.length  > 10  ||
                artista.foto             == '' || artista.foto             == null || artista.foto             == undefined || artista.foto.length             > 300 ||
                artista.id_tipo_artista  == '' || artista.id_tipo_artista  == undefined                                     || isNaN(artista.id_tipo_artista)        ||
                id                       == '' || id                       == null || id                       == undefined || isNaN(id)
            )
            {
                return message.ERROR_REQUIRED_FIELDS // 400
            }else{
                let result = await artistaDAO.selectByIdArtista(id)

                if(result != false || typeof(result) == 'object'){

                    if(result.length > 0){

                        artista.id_artista = id
                        let resultArtista = await artistaDAO.updateArtista(artista)

                        if(resultArtista){
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

// Função para excluir um artista
const excluirArtista = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id || id <= 0)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            
            // Antes de excluir, estamos verificando se existe esse id 
            let resultArtista = await artistaDAO.selectByIdArtista(id)

            if(resultArtista != false || typeof(resultArtista) == 'object'){

                if(resultArtista.length > 0){
                    let result = await artistaDAO.deleteArtista(parseInt(id))
                    
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
const listarArtista = async function() {
    try {
        //Cria um objeto array para montar a nova estrutura de artistas no forEach
        let arrayArtista = []

        let dadosArtista = {}

        let resultArtista = await artistaDAO.selectAllArtista()

        if(resultArtista != false || typeof(resultArtista) == 'object'){
            if(resultArtista.length > 0){
                // Json de retorno 
                dadosArtista.status = true
                dadosArtista.status_code = 200,
                dadosArtista.items = resultArtista.length
            
                // //Percorrer o array de tipos_artista para pegar ID do tipo e descobrir quais os dados
                // //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com requisições async com await

                // for(const itemArtista of resultArtista){
                //     /* Monta o objeto da classificação para retornar no Filme (1XN) */
                //         //Busca os dados da classificação na controller de classificacao
                //         let dadosTipo = await controllerClassificacao.buscarClassificacao(itemFilme.id_classificacao)
                //         //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                //         itemFilme.classificacao = dadosClassificacao.classificacao
                //         //Remover um atributo do JSON
                //         delete itemFilme.id_classificacao
                //     /* */
                // }

                return dadosArtista
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

// Função para retornar uma gravadora pelo ID 
const buscarBanda = async function(numero) {
    try {
        let id = numero

        let dadosBanda = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            let resultBanda = await artistaDAO.selectByIdBanda(id)

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