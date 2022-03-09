CREATE database dokkumento

USE dokkumento

CREATE TABLE Roles (
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[Code] VARCHAR(50) UNIQUE not null,
	[Name] VARCHAR(50) not null,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE() 
);

CREATE TABLE Users(
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[RoleId] INTEGER,
	[Firstname] VARCHAR(50) not null,
	[Lastname] VARCHAR(50) not null,
	[Username] VARCHAR(50) UNIQUE not null,
	[Password] VARCHAR(50) not null,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE(),
	[Deleted] BIT DEFAULT 0,
	FOREIGN KEY (RoleId) REFERENCES [Roles](Id)
);

CREATE TABLE FieldTypes(
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[Code] VARCHAR(50) UNIQUE not null,
	[Name] VARCHAR(50) not null,
	[ValidationMessage] VARCHAR(250) null,
	[Pattern] VARCHAR(250) null,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE(),
	[Deleted] BIT DEFAULT 0
);

CREATE TABLE Projects(
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[Code] VARCHAR(15) UNIQUE not null,
	[Name] VARCHAR(100) not null,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE(),
	[Deleted] BIT DEFAULT 0
);

CREATE TABLE Forms(
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[ProjectId] INTEGER,
	[Code] VARCHAR(15) not null,
	[Name] VARCHAR(50) not null,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE(),
	[Deleted] BIT DEFAULT 0,
	FOREIGN KEY (ProjectId) REFERENCES [Projects](Id)
);

CREATE TABLE FormFields(
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[ProjectId] INTEGER,
	[FormId] INTEGER,
	[FieldTypeId] INTEGER,
	[Order] INTEGER not null,
	[Code] VARCHAR(15) not null,
	[Name] VARCHAR(50) not null,
	[MinLength] INTEGER DEFAULT 0,
	[MaxLength] INTEGER DEFAULT 0,
	[Required] BIT DEFAULT 0,
	[Uppercase] BIT DEFAULT 0,
	[Datasource] VARCHAR(50) null,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE(),
	[Deleted] BIT DEFAULT 0,	
	FOREIGN KEY (FormId) REFERENCES [Forms](Id),
	FOREIGN KEY (FieldTypeId) REFERENCES [FieldTypes](Id),
	FOREIGN KEY (ProjectId) REFERENCES [Projects](Id)
)

CREATE TABLE DataSources (
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[Source] VARCHAR(500) not null,
	[CreatedOn] DATETIME DEFAULT GETDATE()
)

/*** System data ***/
INSERT INTO Roles ([Code], [Name]) VALUES ('TYPIST','Digitador de documentos');
INSERT INTO Roles ([Code], [Name]) VALUES ('ADMIN','Administrador de proyecto');
INSERT INTO Roles ([Code], [Name]) VALUES ('SYS_ADMIN','Administrador del sistema');

INSERT INTO FieldTypes ([Code], [Name], [ValidationMessage], [Pattern]) VALUES ('TEXT', 'Solo letras y espacios', 'Se permiten letras de la a-z A-Z y espacios', '^[A-Za-z\s]*$')
INSERT INTO FieldTypes ([Code], [Name], [ValidationMessage], [Pattern]) VALUES ('NUMBER', 'Solo numeros', 'Se permiten numeros, punto y coma', '^[0-9.,]*$')
INSERT INTO FieldTypes ([Code], [Name], [ValidationMessage], [Pattern]) VALUES ('DATE', 'Fecha', 'Se permite fecha dd/mm/[aa|aaaa] dd-mm-[aa|aaaa]', '^(0[1-9]|1\d|2\d|3[01])[-/.](0[1-9]|1[0-2])[-/.](((19|20)\d{2})|(\d{2}))$')
INSERT INTO FieldTypes ([Code], [Name]) VALUES ('FREE', 'Sin validacion')

