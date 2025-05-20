/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela de album no Banco de Dados (com chave estrangeira)
 *Data: 20/05/2025
 *Autor: Letícia 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

const insertAlbum = async function(album) {
    try {
        let sql = `insert into tbl_album (nome,
                                          data_lancamento,
                                          foto,
                                          qnt_musicas,
                                          id_tipo,
                                          id_gravadora)
                                values ('${album.nome}',
                                        '${album.data_lancamento}',
                                        '${album.foto}',
                                        '${album.qnt_musicas}',
                                        '${album.id_tipo}',
                                        '${album.id_gravadora}')`

        // Executa o scipt SQL no BD e aguarda o resultado (true ou false)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else 
            return false // BUG no BD

    } catch (error) {
        return false // BUG de Programação         
    }
}

const updateAlbum = async function(album) {
    try {
        
        let sql = `update tbl_album set nome            = '${album.nome}',
                                        data_lancamento = '${album.data_lancamento}',
                                        foto            = '${album.foto}',
                                        qnt_musicas     = '${album.qnt_musicas}',
                                        id_tipo         = '${album.id_tipo}'
                                    where id_album      =  ${album.id_album}`
                                        
        let result = await prisma.$executeRawUnsafe(sql) // Usamos o exedute porque não vai retornar dados 
        
        if (result)
            return true
        else
            return false
                                                                    
    } catch (error) {
        return false
    }
}

const deleteAlbum = async function(number) {
    try {
        let id = number 

        let sql = `delete from tbl_album where id_album=${id}`

        // Encaminha o Script SQL para o BD
        let result = await prisma.$executeRawUnsafe(sql) // O delete não volta dados, por isso utiliza o execute 
        
        if(result)
            return true // Não retorna dados só true 
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAlbum = async function() {
    try {
        let sql = 'select * from tbl_album'

        // Encaminha o Script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdAlbum = async function(number) {
    try {
        let id = number 
        
        let sql = `select * from tbl_album where id_album=${id} `

        // Encaminha o Script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result 
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbum,
    selectByIdAlbum
}