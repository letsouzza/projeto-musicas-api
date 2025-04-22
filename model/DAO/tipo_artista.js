/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela tipo de artista no Banco de Dados
 *Data: 22/04/2025
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

const insertTipoArtista = async function(item) {
    try {
        let sql = `insert into tbl_tipo_artista (tipo_artista)
                                values ('${item.tipo_artista}')`

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

const updateTipoArtista = async function(item) {
    try { 
        let sql = `update tbl_tipo_artista set tipo_artista = '${item.tipo_artista}'
                                        where id_tipo_artista =  ${item.id_tipo_artista}`
                                        
        let result = await prisma.$executeRawUnsafe(sql) // Usamos o execute porque não vai retornar dados 
        
        if (result)
            return true
        else
            return false
                                                                    
    } catch (error) {
        return false
    }
}

const deleteTipoArtista = async function(number) {
    try {
        let id = number 

        let sql = `delete from tbl_tipo_artista where id_tipo_artista=${id}`

        let result = await prisma.$executeRawUnsafe(sql) // O delete não volta dados, por isso utiliza o execute 
        
        if(result)
            return true // Não retorna dados só true 
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllTipoArtista = async function() {
    try {
        let sql = 'select * from tbl_tipo_artista'

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

const selectByIdTipoArtista = async function(number) {
    try {
        let id = number 
         
        let sql = `select * from tbl_tipo_artista where id_tipo_artista=${id} `

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
    insertTipoArtista,
    updateTipoArtista,
    deleteTipoArtista,
    selectAllTipoArtista,
    selectByIdTipoArtista
}