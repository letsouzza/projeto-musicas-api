/*********************************************************************************************************************************************************************************
 *Objetivo: Controller referente as ações de CRUD de Usuário, responsável pela integração entre app e model
            Validações, tratamento de dados etc...
 *Data: 15/04/2025
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

//import do arquivo de menssagens e status code 
const message = require ('../../modulo/config.js')

//import do DAO para realizar o CRUD no Banco de Dados 
const usuarioDAO = require ('../../model/DAO/usuario.js')

//Função para inserir novo usuário
const inserirUsuario = async function(user, contentType) {
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if (user.username       == ''        || user.username       == null || user.username       == undefined || user.username.length         > 100 || 
                user.email          == ''        || user.email          == null || user.email          == undefined || user.email.length            > 100 ||
                user.senha          == ''        || user.senha          == null || user.senha          == undefined || user.senha.length            > 100 ||
                user.foto           == undefined || user.foto.length     > 200  
            )
            {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            }else{
                //encaminhando os dados da música para o DAO realizar o insert no Banco de dados 
                let resultUser = await usuarioDAO.insertUser(user)

                if(resultUser)
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

//Função para atualizar usuário pelo id
const atualizarUsuario = async function (numero, user, contentType) {
    try {
        
        let id = numero 

        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (user.username       == ''        || user.username       == null || user.username       == undefined || user.username.length         > 100 || 
                    user.email          == ''        || user.email          == null || user.email          == undefined || user.email.length            > 100 ||
                    user.senha          == ''        || user.senha          == null || user.senha          == undefined || user.senha.length            > 100 ||
                    user.foto           == undefined || user.foto.length     > 200  
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //status code 400
                }else{

                    //Verifica se existe o id no banco 
                    let result = await usuarioDAO.selectByIdUser(id)

                    if(result != false || typeof(result) == 'object'){

                        if(result.length > 0){
                            //Update 
                            user.id_usuario = id // Adiciona o atributo do ID no Json
                            let resultUsuario = await usuarioDAO.updateUser(user)

                            if(resultUsuario){
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

// Função para excluir um usuário
const excluirUsuario = async function(numero) {
    try {
        let id = numero

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            
            // Antes de excluir, estamos verificando se existe esse id 
            let resultUsuario = await usuarioDAO.selectByIdUser(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){

                if(resultUsuario.length > 0){

                    // Chama a função para retornar as músicas do banco de dados
                    let result = await usuarioDAO.deleteUser(id)
                    
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
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500- controller
    }
}

//Função para listar todos os usuários
const listarUsuario = async function() {
    try {
        // Objeto JSON 
        let dadosUsuario = {}

        //Chama a função da model 
        let resultUsuario = await usuarioDAO.selectAllUser()

        if(resultUsuario != false || typeof(resultUsuario) == 'object'){
            if(resultUsuario.length > 0){
                // Coloca os dados no JSON para depois retornar 
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.items = resultUsuario.length
                dadosUsuario.users = resultUsuario

                return dadosUsuario
            }else{
                return message.ERROR_NOT_FOUND // 404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL // 500 na model
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 na controller 
    }
}

//Função para retornar um usuário pelo ID 
const buscarUsuario = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosUsuario = {}

        // Vendo se o id não está vazio e se é um número
        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400

        }else{

            // Chama a função para retornar os usuarios do banco de dados
            let resultUsuario = await usuarioDAO.selectByIdUser(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200,
                    dadosUsuario.user = resultUsuario

                    return dadosUsuario
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}