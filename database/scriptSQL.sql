#Criação do Database
create database db_controle_musicas_aa;

#Ativa o Database a ser utilizado 
use db_controle_musicas_aa;

#Criação da Tabela de músicas 
create table tbl_musica (
	id 				int not null primary key auto_increment,
    nome 			varchar(100) not null,
    duracao 		time not null,
    data_lancamento date not null, 
    letra 			text,
    link 			varchar(200)
);

#Criação na Tabela usuário
create table tbl_usuario (
	id_usuario 		int not null primary key auto_increment,
    username 		varchar(100) not null,
	email    		varchar(100) not null,
	senha    		varchar(100) not null,
	foto    		varchar(200)
);

#Criação da tabela nacionalidade
create table tbl_nacionalidade (
	id_nacionalidade 	int not null primary key auto_increment,
    nacionalidade 		varchar(100) not null
);

#Criação da Tabela de tipo artista
create table tbl_tipo_artista (
	id_tipo_artista 	int not null primary key auto_increment,
    tipo_artista 		varchar(100) not null
);

#Criação da Tabela gravadora
create table tbl_gravadora (
	id_gravadora 	int not null primary key auto_increment,
    nome 			varchar(100) not null,
    telefone		varchar(20) not null
);

#Criação da Tabela banda
create table tbl_banda (
	id_banda 		int not null primary key auto_increment,
    nome 			varchar(100) not null,
    data_criacao	date not null
);

#Criação da Tabela tipo album 
create table tbl_tipo_album (
	id_tipo_album   	int not null primary key auto_increment,
    tipo_album   		varchar(100) not null
);

#Criação da tabela genero 
create table tbl_genero (
	id_genero   	int not null primary key auto_increment,
    genero   		varchar(100) not null
);

#Criação da Tabela tipo artista
create table tbl_tipo_artista (
	id_tipo_artista   	int not null primary key auto_increment,
    tipo_artista  		varchar(100) not null
);

show tables;

select * from tbl_musica;


