/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela de artista no Banco de Dados (com chave estrangeira)
 *Data: 06/05/2025
 *Autor: Letícia 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

const insertArtista = async function(artista) {
    try {
        let sql = `insert into tbl_artista(nome,
                                          data_nascimento,
                                          foto,
                                          id_tipo_artista)
                                values ('${artista.nome}',
                                        '${artista.data_nascimento}',
                                        '${artista.foto}',
                                        '${artista.id_tipo_artista}')`

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

const updateArtista = async function(artista) {
    try {
        
        let sql = `update tbl_artista set nome          = '${artista.nome}',
                                        data_nascimento = '${artista.data_nascimento}',
                                        foto            = '${artista.foto}',
                                        id_tipo_artista = '${artista.id_tipo_artista}'
                                    where id_artista    =  ${artista.id_tipo_artista}`
                                        
        let result = await prisma.$executeRawUnsafe(sql) // Usamos o exedute porque não vai retornar dados 
        
        if (result)
            return true
        else
            return false
                                                                    
    } catch (error) {
        return false
    }
}

const deleteArtista = async function(number) {
    try {
        let id = number 

        let sql = `delete from tbl_artista where id_artista=${id}`

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

const selectAllArtista = async function() {
    try {
        let sql = 'select * from tbl_artista'

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

const selectByIdArtista = async function(number) {
    try {
        let id = number 
        
        let sql = `select * from tbl_artista where id_artista=${id} `

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
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtista,
    selectByIdArtista
}