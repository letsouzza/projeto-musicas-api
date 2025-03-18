/*********************************************************************************************************************************************************************************
 *Objetivo: Arquivo responsável pela padronização de mensagens e status code 
 *Data: 18/02/2025
 *Autor: Letícia -> Marcel 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

/************************** Status Code de ERRO ***********************/
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem campos de preenchimento obrigatórios ou quantidade de caracteres não foram atendidos'}
const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'Devido a um erro interno no servidor da Model, não foi possível processar a requisição'}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Devido a um erro interno no servidor da Controller, não foi possível processar a requisição'}
const ERROR_CONTENT_TYPE =  {status: false, status_code: 415, message: 'O content-type encaminhado não é suportado pelo servidor, você deve encaminhar apenas conteúdos no formato JSON'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados itens para retorno'}

/************************** Status Code de SUCESSO ***********************/
const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso'}
const SUCESS_DELETE_ITEM = {status: true, status_code: 200, message: 'Item excluído com sucesso'}
const SUCESS_UPDATE_ITEM = {status: true, status_code: 200, message: 'Item atualizado com sucesso'}


module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCESS_CREATED_ITEM,
    SUCESS_DELETE_ITEM,
    SUCESS_UPDATE_ITEM
}
