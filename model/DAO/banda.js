/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela de banda no Banco de Dados
 *Data: 22/04/2025
 *Autor: Letícia 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

const insertBanda = async function(banda) {
    try {
        let sql = `insert into tbl_banda (nome,
                                          data_criacao)
                                values ('${banda.nome}',
                                        '${banda.data_criacao}')`


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

const updateBanda = async function(banda) {
    try {
        
        let sql = `update tbl_banda set nome            = '${banda.nome}',
                                        data_criacao    = '${banda.data_criacao}'
                                    where id_banda          =  ${banda.id_banda}`
                                        
        let result = await prisma.$executeRawUnsafe(sql) // Usamos o exedute porque não vai retornar dados 
        
        if (result)
            return true
        else
            return false
                                                                    
    } catch (error) {
        return false
    }
}

const deleteBanda = async function(number) {
    try {
        let id = number 

        let sql = `delete from tbl_banda where id_banda=${id}`

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

const selectAllBanda = async function() {
    try {
        let sql = 'select * from tbl_banda'

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

const selectByIdBanda = async function(number) {
    try {
        let id = number 
        
        let sql = `select * from tbl_banda where id_banda=${id} `

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
    insertBanda,
    updateBanda,
    deleteBanda,
    selectAllBanda,
    selectByIdBanda
}