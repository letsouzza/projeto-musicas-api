/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Gravadora, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
 *Data: 15/04/2025
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de Dados 
const gravadoraDAO = require ('../../model/DAO/gravadora.js')

// Função para inserir nova gravadora 
const inserirGravadora = async function(gravadora, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( gravadora.nome      == ''  || gravadora.nome      == null || gravadora.nome      == undefined || gravadora.nome.length      > 100 ||
                gravadora.telefone  == ''  || gravadora.telefone  == null || gravadora.telefone  == undefined || gravadora.telefone.length  > 20
            )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else{
                //encaminhando os dados da música para o DAO realizar o insert no Banco de dados 
                let resultGravadora = await gravadoraDAO.insertGravadora(gravadora)

                if(resultGravadora)
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

// Função para atualizar uma gravadora
const atualizarGravadora = async function(numero, gravadora, contentType) {
    try {

       let id = numero

       // Copiamos o início do código inserir musica
       if(String(contentType).toLowerCase() == 'application/json')
           {
            if( gravadora.nome      == ''  || gravadora.nome      == null || gravadora.nome      == undefined || gravadora.nome.length      > 100 ||
                gravadora.telefone  == ''  || gravadora.telefone  == null || gravadora.telefone  == undefined || gravadora.telefone.length  > 20
            )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else{
                // Verifica se o ID está no Banco de dados 
                let result = await gravadoraDAO.selectByIdGravadora(id)

                if(result != false || typeof(result) == 'object'){

                    if(result.length > 0){

                        //UPDATE 
                        gravadora.id_gravadora = id // Adiciona o atributo do ID no JSON (musica) -> com o corpo da requisição
                        let resultGravadora = await gravadoraDAO.updateGravadora(gravadora)

                        if(resultGravadora){
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

// Função para excluir uma gravadora 
const excluirGravadora = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            
            // Antes de excluir, estamos verificando se existe esse id 
            let resultGravadora = await gravadoraDAO.selectByIdGravadora(id)

            if(resultGravadora != false || typeof(resultGravadora) == 'object'){

                if(resultGravadora.length > 0){

                    // Chama a função para retornar as músicas do banco de dados
                    let result = await gravadoraDAO.deleteGravadora(id)
                    
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

// Função para retornar uma lista de gravadoras
const listarGravadora = async function() {
    try {
        // Objeto JSON
        let dadosGravadora = {}

        // Chama a função para retornar as músicas do banco de dados
        let resultGravadora = await gravadoraDAO.selectAllGravadora()

        if(resultGravadora != false || typeof(resultGravadora) == 'object'){
            if(resultGravadora.length > 0){
                // Cria um JSON para colocar o Array de músicas 
                dadosGravadora.status = true
                dadosGravadora.status_code = 200,
                dadosGravadora.items = resultGravadora.length
                dadosGravadora.gravadoras = resultGravadora

                return dadosGravadora
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
const buscarGravadora = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosGravadora = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultGravadora = await gravadoraDAO.selectByIdGravadora(id)

            if(resultGravadora != false || typeof(resultGravadora) == 'object'){
                if(resultGravadora.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosGravadora.status = true
                    dadosGravadora.status_code = 200,
                    dadosGravadora.gravadora = resultGravadora

                    return dadosGravadora
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
    inserirGravadora,
    atualizarGravadora,
    excluirGravadora,
    listarGravadora,
    buscarGravadora
}