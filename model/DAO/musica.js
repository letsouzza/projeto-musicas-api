/*********************************************************************************************************************************************************************************
 *Objetivo: Criar o CRUD de dados da tabela de música no Banco de Dados
 *Data: 11/02/2025
 *Autor: Letícia -> Marcel 
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

/* Para criar uma interação com o Banco de Dados devemos instalar:
        npm install prisma --save 
        npm install @prisma/client --save
*/

// Import da biblioteca do prisma client para realizar as ações no BD 
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()


// Função para inserir nova música
const insertMusica = async function(musica) {
    try {
        let sql = `insert into tbl_musica ( nome,
                                            duracao, 
                                            data_lancamento, 
                                            letra, 
                                            link)
                                values ('${musica.nome}',
                                        '${musica.duracao}',
                                        '${musica.data_lancamento}',
                                        '${musica.letra}',
                                        '${musica.link}')`


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
const updateMusica = async function() {
    try {
        
        let sql = `update tbl_musica set nome               = '${musica.nome}',
                                         duracao            = '${musica.duracao}',
                                         data_lancamento    = '${musica.data_lancamento}',
                                         letra              = '${musica.letra}',
                                         link               = '${musica.link}',
                                    where id                = ${musica.id}`
                                        
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
const deleteMusica = async function(number) {
    try {
        // Recebe o ID
        let id = number 

        // Script SQL 
        let sql = `delete from tbl_musica where id=${id}`

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

// Função para retornar todas as músicas do BD
const selectAllMusica = async function() {
    try {
        // Script SQL 
        let sql = 'select * from tbl_musica order by id desc'

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

// Função para retornar uma música pelo ID
const selectByIdMusica = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_musica where id=${id} `

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
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica 
}

