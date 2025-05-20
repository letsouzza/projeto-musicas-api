/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela de email no Banco de Dados (com chave estrangeira)
 *Data: 20/05/2025
 *Autor: Letícia 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

const insertEmail = async function(email) {
    try {
        let sql = `insert into tbl_email (email,
                                          id_gravadora)
                                values ('${email.email}',
                                        '${email.id_gravadora}')`

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

const updateEmail = async function(email) {
    try {
        
        let sql = `update tbl_email set email           = '${email.email}',
                                        id_gravadora    = '${email.id_gravadora}'
                                    where id_email    =  ${email.id_email}`
                                        
        let result = await prisma.$executeRawUnsafe(sql) // Usamos o exedute porque não vai retornar dados 
        
        if (result)
            return true
        else
            return false
                                                                    
    } catch (error) {
        return false
    }
}

const deleteEmail = async function(number) {
    try {
        let id = number 

        let sql = `delete from tbl_email where id_email=${id}`

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

const selectAllEmail = async function() {
    try {
        let sql = 'select * from tbl_email'

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

const selectByIdEmail = async function(number) {
    try {
        let id = number 
        
        let sql = `select * from tbl_email where id_email= ${id} `

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
    insertEmail,
    updateEmail,
    deleteEmail,
    selectAllEmail,
    selectByIdEmail
}