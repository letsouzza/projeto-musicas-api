/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela tipo de album no Banco de Dados
 *Data: 06/05/2025
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

const insertTipoAlbum = async function(item) {
    try {
        let sql = `insert into tbl_tipo_album (tipo_album)
                                values ('${item.tipo_album}')`

        // Executa o scipt SQL no BD e aguarda o resultado (true ou false)
        // Obs: o await -> aguarda retornar o resultado, ele só funciona se tiver o async 
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else 
            return false // BUG no BD

    } catch (error) {
        return false // BUG de Programação         
    }
}

const updateTipoAlbum = async function(item) {
    try { 
        let sql = `update tbl_tipo_album set tipo_album = '${item.tipo_album}'
                                        where id_tipo_album =  ${item.id_tipo_album}`
                                        
        let result = await prisma.$executeRawUnsafe(sql) // Usamos o execute porque não vai retornar dados 
        
        if (result)
            return true
        else
            return false
                                                                    
    } catch (error) {
        return false
    }
}

const deleteTipoAlbum = async function(number) {
    try {
        let id = number 

        let sql = `delete from tbl_tipo_album where id_tipo_album=${id}`

        let result = await prisma.$executeRawUnsafe(sql) // O delete não volta dados, por isso utiliza o execute 
        
        if(result)
            return true // Não retorna dados só true 
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllTipoAlbum = async function() {
    try {
        let sql = 'select * from tbl_tipo_album'

        // Encaminha o Script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result // Retorna os dados do Banco 
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdTipoAlbum = async function(number) {
    try {
        let id = number 
         
        let sql = `select * from tbl_tipo_album where id_tipo_album=${id} `

        // Encaminha o Script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result // Retorna os dados do Banco 
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertTipoAlbum,
    updateTipoAlbum,
    deleteTipoAlbum,
    selectAllTipoAlbum,
    selectByIdTipoAlbum
}