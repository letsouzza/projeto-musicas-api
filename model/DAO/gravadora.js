/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela de gravadora no Banco de Dados
 *Data: 15/04/2025
 *Autor: Letícia 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

// Função para inserir nova gravadora
const insertGravadora = async function(gravadora) {
    try {
        let sql = `insert into tbl_gravadora (nome,
                                              telefone)
                                values ('${gravadora.nome}',
                                        '${gravadora.telefone}')`


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

// Função para atualizar música existente 
const updateGravadora = async function(gravadora) {
    try {
        
        let sql = `update tbl_gravadora set nome               = '${gravadora.nome}',
                                            telefone           = '${gravadora.telefone}'
                                    where id_gravadora         =  ${gravadora.id_gravadora}`
                                        
        let result = await prisma.$executeRawUnsafe(sql) // Usamos o exedute porque não vai retornar dados 
        
        if (result)
            return true
        else
            return false
                                                                    
    } catch (error) {
        return false
    }
}

// Função para excluir música existente 
const deleteGravadora = async function(number) {
    try {
        // Recebe o ID
        let id = number 

        // Script SQL 
        let sql = `delete from tbl_gravadora where id_gravadora=${id}`

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

// Função para retornar todas as gravadoras do BD
const selectAllGravadora = async function() {
    try {
        // Script SQL 
        let sql = 'select * from tbl_gravadora'

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

// Função para retornar uma gravadora pelo ID
const selectByIdGravadora = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_gravadora where id_gravadora=${id} `

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
    insertGravadora,
    updateGravadora,
    deleteGravadora,
    selectAllGravadora,
    selectByIdGravadora
}