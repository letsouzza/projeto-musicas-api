/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela de usuários no Banco de Dados
 *Data: 15/04/2025
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()


// Função para inserir nova música
const insertUser = async function(user) {
    try {
        let sql = `insert into tbl_usuario ( username,
                                            email, 
                                            senha,  
                                            foto)
                                values ('${user.username}',
                                        '${user.email}',
                                        '${user.senha}',
                                        '${user.foto}')`


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

//Função para atualizar música existente
const updateUser = async function(user) {
    try {
        
        let sql = `update tbl_usuario set username          = '${user.username}',
                                          email             = '${user.email}',
                                          senha             = '${user.senha}',
                                          foto              = '${user.foto}'
                                    where id_usuario        =  ${user.id_usuario}`
                                        
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
const deleteUser = async function(number) {
    try {
        // Recebe o ID
        let id = number 

        // Script SQL 
        let sql = `delete from tbl_usuario where id_usuario=${id}`

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

// Função para retornar todos os usuários do BD
const selectAllUser = async function() {
    try {
        // Script SQL 
        let sql = 'select * from tbl_usuario'

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

//Função para selecionar usuário buscando pelo ID
const selectByIdUser = async function(number) {
    try {
        //Recebe o ID
        let id = number 

        // Script SQL
        let sql = `select * from tbl_usuario where id_usuario=${id} `

        //Encaminha o script para o BD
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
    insertUser,
    updateUser,
    deleteUser,
    selectAllUser,
    selectByIdUser
}