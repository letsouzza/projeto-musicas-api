/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela de gênero no Banco de Dados
 *Data: 22/04/2025
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

const insertGenero = async function(item) {
    try {
        let sql = `insert into tbl_genero (genero)
                                values ('${item.genero}')`

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

const updateGenero = async function(item) {
    try { 
        let sql = `update tbl_genero set genero = '${item.genero}'
                                        where id_genero =  ${item.id_genero}`
                                        
        let result = await prisma.$executeRawUnsafe(sql) // Usamos o execute porque não vai retornar dados 
        
        if (result)
            return true
        else
            return false
                                                                    
    } catch (error) {
        return false
    }
}

const deleteGenero = async function(number) {
    try {
        let id = number 

        // Script SQL 
        let sql = `delete from tbl_genero where id_genero=${id}`

        let result = await prisma.$executeRawUnsafe(sql) // O delete não volta dados, por isso utiliza o execute 
        
        if(result)
            return true // Não retorna dados só true 
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllGenero = async function() {
    try {
        // Script SQL 
        let sql = 'select * from tbl_genero'

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

const selectByIdGenero = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_genero where id_genero=${id} `

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}