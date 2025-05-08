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

#Criação da tabela artista com chave estrangeira de tipo artista
create table tbl_artista (
	id_artista   	int not null primary key auto_increment,
    nome  		    varchar(100) not null,
    data_nascimento date not null,
    foto            varchar(300) not null,
    id_nacionalidade int not null,
    id_tipo_artista int not null,
    constraint FK_TIPO_ARTISTA #Cria um nome para relação
    foreign key (id_tipo_artista) #Especifica qual atributo dessa tabela sera a foreign key
    references tbl_tipo_artista(id_tipo_artista) #Especifica a origem da chave, ou seja de qual tabela vira a PK
);

#Criação da tabela playlist com chave estrangeira de usuario
create table tbl_playlist (
	id_playlist   	int not null primary key auto_increment,
    nome  		    varchar(100) not null,
    qnt_musicas     int not null,
    data_criacao    date not null,
    capa            varchar(200) not null,
    id_usuario      int not null,
    constraint FK_USUARIO_PLAYLIST #Cria um nome para relação
    foreign key (id_usuario) #Especifica qual atributo dessa tabela sera a foreign key
    references tbl_usuario(id_usuario) #Especifica a origem da chave, ou seja de qual tabela vira a PK
);

#Criação da tabela album com chave estrangeira de tipo album e gravadora
create table tbl_album (
	id_album   		int not null primary key auto_increment,
    nome  		    varchar(100) not null,
    data_lancamento date not null,
    foto            varchar(300) not null,
    qnt_musicas     int not null,
    id_tipo int not null,
    constraint FK_TIPO_ALBUM #Cria um nome para relação
    foreign key (id_tipo) #Especifica qual atributo dessa tabela sera a foreign key
    references tbl_tipo_album(id_tipo_album), #Especifica a origem da chave, ou seja de qual tabela vira a PK
    id_gravadora   int not null,
    constraint FK_GRAVADORA_ALBUM
    foreign key (id_gravadora)
    references tbl_gravadora(id_gravadora)
);

#Criação da tabela email com chave estrangeira de gravadora
create table tbl_email (
	id_email   	 int not null primary key auto_increment,
    email  		 varchar(200) not null,
    id_gravadora int not null,
    constraint FK_GRAVADORA_EMAIL #Cria um nome para relação
    foreign key (id_gravadora) #Especifica qual atributo dessa tabela sera a foreign key
    references tbl_gravadora(id_gravadora) #Especifica a origem da chave, ou seja de qual tabela vira a PK
);

# Tabela intermediária de nacionalidade com artista
create table tbl_nacionalidade_artista (
	id_nacionalidade_artista int not null primary key auto_increment,
    id_nacionalidade		 int not null,
	constraint FK_NACIONALIDADE_NACIONALIDADE_ARTISTA
    foreign key (id_nacionalidade) 
    references tbl_nacionalidade(id_nacionalidade),
    
	id_artista 		         int not null,
    constraint FK_ARTISTA_NACIONALIDADE_ARTISTA
    foreign key (id_artista) 
    references tbl_artista(id_artista)
);

# Tabela intermediáriade de album com artista
create table tbl_album_artista (
	id_album_artista int not null primary key auto_increment,
    id_album		 int not null,
	constraint FK_ALBUM_ALBUM_ARTISTA
    foreign key (id_album) 
    references tbl_album(id_album),
    
	id_artista 		         int not null,
    constraint FK_ARTISTA_ALBUM_ARTISTA
    foreign key (id_artista) 
    references tbl_artista(id_artista)
);

# Tabela intermediáriade de album com música
create table tbl_album_musica (
	id_album_musica int not null primary key auto_increment,
    id_album		 int not null,
	constraint FK_ALBUM_ALBUM_MUSICA
    foreign key (id_album) 
    references tbl_album(id_album),
    
	id_musica 		  int not null,
    constraint FK_MUSICA_ALBUM_MUSICA
    foreign key (id_musica) 
    references tbl_musica(id)
);

# Tabela intermediáriade de música com playlist
create table tbl_playlist_musica (
	id_playlist_musica int not null primary key auto_increment,
    id_playlist		 int not null,
	constraint FK_PLAYLIST_PLAYLIST_MUSICA
    foreign key (id_playlist) 
    references tbl_playlist(id_playlist),
    
	id_musica 		  int not null,
    constraint FK_MUSICA_PLAYLIST_MUSICA
    foreign key (id_musica) 
    references tbl_musica(id)
);

# Tabela intermediáriade de música com genero
create table tbl_musica_genero (
	id_musica_genero int not null primary key auto_increment,
    id_genero	 int not null,
	constraint FK_GENERO_MUSICA_GENERO
    foreign key (id_genero) 
    references tbl_genero(id_genero),
    
	id_musica 		  int not null,
    constraint FK_MUSICA_MUSICA_GENERO
    foreign key (id_musica) 
    references tbl_musica(id)
);


show tables;


