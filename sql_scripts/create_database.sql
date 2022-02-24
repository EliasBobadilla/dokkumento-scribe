CREATE database dokkumento

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
	[Username] VARCHAR(50) not null,
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
	[Code] VARCHAR(15) UNIQUE not null,
	[Name] VARCHAR(50) not null,
	[Description] VARCHAR(500) null,
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
	[Code] VARCHAR(15) UNIQUE not null,
	[Name] VARCHAR(50) not null,
	[Description] VARCHAR(500) null,
	[MinLength] INTEGER DEFAULT 0,
	[MaxLength] INTEGER DEFAULT 0,
	[Required] BIT DEFAULT 0,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE(),
	[Deleted] BIT DEFAULT 0,
	FOREIGN KEY (FormId) REFERENCES [Forms](Id),
	FOREIGN KEY (FieldTypeId) REFERENCES [FieldTypes](Id),
	FOREIGN KEY (ProjectId) REFERENCES [Projects](Id)
)

CREATE TABLE Logs(
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[Query] VARCHAR(500) not null,
	[Stack] VARCHAR(100) not null,
	[CreatedOn] DATETIME DEFAULT GETDATE()
)





INSERT INTO Roles ([Code], [Name]) VALUES ('TYPIST','Digitador de documentos');
INSERT INTO Roles ([Code], [Name]) VALUES ('ADMIN','Administrador de proyecto');
INSERT INTO Roles ([Code], [Name]) VALUES ('SYS_ADMIN','Administrador del sistema');

INSERT INTO Users ([FirstName], [Lastname], [Username], [Password], [RoleId]) VALUES('Elias', 'Bobadilla', 'saile', '42972966', 1);
INSERT INTO Users ([FirstName], [Lastname], [Username], [Password], [RoleId]) VALUES('Sebastian', 'Bobadilla', 'sebas', '42972966', 2);
INSERT INTO Users ([FirstName], [Lastname], [Username], [Password], [RoleId]) VALUES('Tilsa', 'Bobadilla', 'tili', '42972966', 3);
INSERT INTO Users ([FirstName], [Lastname], [Username], [Password], [RoleId]) VALUES('Myriam', 'Camarena', 'myriam', '42972966', 3);

INSERT INTO FieldTypes ([Code], [Name], [ValidationMessage], [Pattern]) VALUES ('TEXT', 'Solo letras y espacios', 'Se permiten letras de la a-z A-Z y espacios', '^[A-Za-z\s]*$')
INSERT INTO FieldTypes ([Code], [Name], [ValidationMessage], [Pattern]) VALUES ('NUMBER', 'Solo numeros', 'Se permiten numeros, punto y coma', '^[0-9.,]*$')
INSERT INTO FieldTypes ([Code], [Name], [ValidationMessage], [Pattern]) VALUES ('DATE', 'Fecha', 'Se permite fecha dd/mm/[aa|aaaa] dd-mm-[aa|aaaa]', '^(0[1-9]|1\d|2\d|3[01])[-/.](0[1-9]|1[0-2])[-/.](((19|20)\d{2})|(\d{2}))$')
INSERT INTO FieldTypes ([Code], [Name]) VALUES ('FREE', 'Sin validacion')

INSERT INTO Projects ([Code], [Name]) VALUES ('DEMO', 'Dokkumento')

INSERT INTO Forms ([ProjectId], [Code], [Name], [Description]) VALUES (1, 'TEST1', 'Area Emision', 'Proyecto de prueba para digitacion');
INSERT INTO Forms ([ProjectId], [Code], [Name], [Description]) VALUES (1, 'TEST2', 'Area Emision #2', 'Proyecto de prueba para digitacion #2');

INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Code], [Name], [Description], [MinLength], [MaxLength], [Required]) VALUES (1, 1, 1, 'DESC', 'Descripcion principal', 'Descripcion bla, bla, bla', 5, 100, 1)
INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Code], [Name], [Description], [MinLength], [MaxLength], [Required]) VALUES (1, 1, 3, 'FECHA', 'Fecha','Fecha bla, bla, bla', 8, 12, 1)
INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Code], [Name], [Description], [MinLength], [MaxLength], [Required]) VALUES (1, 1, 2, 'UDF1', 'UDF #1','UDF1 bla, bla, bla', 5, 25, 1)
INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Code], [Name], [Description], [MinLength], [MaxLength], [Required]) VALUES (1, 1, 2, 'UDF2', 'UDF #2','UDF2 bla, bla, bla', 5, 25, 1)
INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Code], [Name], [Description], [MinLength], [MaxLength], [Required]) VALUES (1, 1, 2, 'UDF3', 'UDF #3','UDF3 bla, bla, bla', 5, 25, 1)
INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Code], [Name], [Description]) VALUES (1, 1, 4, 'DESC_INT', 'Descripcion Interna','Descripcion Interna bla, bla, bla')

select * from Roles
select * from Users
select * from FieldTypes

select * from Projects
select * from Forms
select * from FormFields

create table DIG_DEMO_TEST1 (
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[DESC] VARCHAR(250) null,
	[FECHA] VARCHAR(250) null,
	[UDF1] VARCHAR(250) null,
	[UDF2] VARCHAR(250) null,
	[UDF3] VARCHAR(250) null,
	[DESC_INT] VARCHAR(250) null,
	[FORCED] BIT DEFAULT 0,
	[CreatedBy] INTEGER,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	FOREIGN KEY (CreatedBy) REFERENCES [Users](Id),
)

select * from DIG_DEMO_TEST1