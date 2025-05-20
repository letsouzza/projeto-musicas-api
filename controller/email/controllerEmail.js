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
const emailDAO = require ('../../model/DAO/email.js')

// Import da controller necessária para relacionamento
const controllerGravadora = require('../gravadora/controllerGravadora.js')

const inserirEmail = async function(email, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( email.email            == '' || email.email            == null       || email.email            == undefined || email.email.length             > 200 ||
                email.id_gravadora     == '' || email.id_gravadora     ==  undefined || isNaN(email.id_gravadora)
            )
            {
                return message.ERROR_REQUIRED_FIELDS // 400
            }else{
                let resultEmail = await emailDAO.insertEmail(email)

                if(resultEmail)
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

const atualizarEmail = async function(numero, email, contentType) {
    try {
       let id = numero

       if(String(contentType).toLowerCase() == 'application/json')
           {
            if( email.email            == '' || email.email            == null       || email.email            == undefined || email.email.length             > 200 ||
                email.id_gravadora     == '' || email.id_gravadora     ==  undefined || isNaN(email.id_gravadora)           ||
                id                     == '' || id                     == null       || id                     == undefined || isNaN(id)
            )
            {
                return message.ERROR_REQUIRED_FIELDS // 400
            }else{
                let result = await emailDAO.selectByIdEmail(id)

                if(result != false || typeof(result) == 'object'){

                    if(result.length > 0){

                        email.id_email = id
                        let resultEmail = await emailDAO.updateEmail(email)

                        if(resultEmail){
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

const excluirEmail = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id || id <= 0)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            
            // Antes de excluir, estamos verificando se existe esse id 
            let resultEmail = await emailDAO.selectByIdEmail(id)

            if(resultEmail != false || typeof(resultEmail) == 'object'){

                if(resultEmail.length > 0){
                    let result = await emailDAO.deleteEmail(parseInt(id))
                    
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

const listarEmail = async function() {
    try {
        //Cria um objeto array para montar a nova estrutura de artistas no forEach
        let arrayEmail = []

        let dadosEmail = {}

        let resultEmail = await emailDAO.selectAllEmail()

        if(resultEmail != false || typeof(resultEmail) == 'object'){
            if(resultEmail.length > 0){
                // Json de retorno 
                dadosEmail.status = true
                dadosEmail.status_code = 200,
                dadosEmail.items = resultEmail.length
            
                // //Percorrer o array de tipos_artista para pegar ID do tipo e descobrir quais os dados
                // //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com requisições async com await

                for(const itemEmail of resultEmail){
                    /* Monta o objeto da classificação para retornar no Artista (1XN) */
                    //Busca os dados do tipo artista na controller de classificacao
                    let dadosGravadora = await controllerGravadora.buscarGravadora(itemEmail.id_gravadora)
                
                    //Adiciona um atributo tipo artista no JSON de artistas e coloca os dados da classificação
                    itemEmail.gravadora = dadosGravadora.gravadora
                    
                    //Remover um atributo do JSON
                    delete itemEmail.id_gravadora

                    arrayEmail.push(itemEmail)
                }
            
                dadosEmail.artistas = arrayEmail

                return dadosEmail
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

const buscarEmail = async function(numero) {
    try {
        let arrayEmail = []

        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            let dadosEmail = {}

            let resultEmail = await emailDAO.selectByIdEmail(id)

            if(resultEmail != false || typeof(resultEmail) == 'object'){
                if(resultEmail.length > 0){
                    dadosEmail.status = true
                    dadosEmail.status_code = 200

                    for(const itemEmail of resultEmail){
                        /* Monta o objeto da classificação para retornar no Artista (1XN) */
                        //Busca os dados do tipo artista na controller de classificacao
                        let dadosGravadora = await controllerGravadora.buscarGravadora(itemEmail.id_gravadora)
                    
                        //Adiciona um atributo tipo artista no JSON de artistas e coloca os dados da classificação
                        itemEmail.gravadora = dadosGravadora.gravadora
                        
                        //Remover um atributo do JSON
                        delete itemEmail.id_gravadora
    
                        arrayEmail.push(itemEmail)
                    }
                
                    dadosEmail.artistas = arrayEmail
    
                    return dadosEmail
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
    inserirEmail,
    atualizarEmail,
    excluirEmail,
    listarEmail,
    buscarEmail
}