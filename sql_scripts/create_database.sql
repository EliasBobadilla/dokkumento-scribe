CREATE TABLE Roles (
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(50) not null,
	[Description] VARCHAR(50) not null,
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

CREATE TABLE Projects(
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(100) not null,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE(),
	[Deleted] BIT DEFAULT 0
);

CREATE TABLE Forms(
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[ProjectId] INTEGER,
	[Name] VARCHAR(50) not null,
	[Description] VARCHAR(500) not null,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE(),
	[Deleted] BIT DEFAULT 0,
	FOREIGN KEY (ProjectId) REFERENCES [Projects](Id)
);

CREATE TABLE FieldTypes(
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(50) not null,
	[Value] VARCHAR(125) not null,
	[Description] VARCHAR(500) not null,	
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE(),
	[Deleted] BIT DEFAULT 0
);

CREATE TABLE FormFields(
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[ProjectId] INTEGER,
	[FormId] INTEGER,
	[FieldTypeId] INTEGER,
	[Name] VARCHAR(50) not null,
	[Description] VARCHAR(500) not null,
	[Length] INTEGER not null,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[UpdatedOn] DATETIME DEFAULT GETDATE(),
	[Deleted] BIT DEFAULT 0,
	FOREIGN KEY (FormId) REFERENCES [Forms](Id),
	FOREIGN KEY (FieldTypeId) REFERENCES [FieldTypes](Id),
	FOREIGN KEY (ProjectId) REFERENCES [Projects](Id)
)



INSERT INTO Roles ([Name], [Description]) VALUES ('TYPIST','Digitador de documentos');
INSERT INTO Roles ([Name], [Description]) VALUES ('ADMIN','Administrador de proyecto');
INSERT INTO Roles ([Name], [Description]) VALUES ('SYS_ADMIN','Administrador del sistema');

INSERT INTO Users (FirstName, Lastname, Username, [Password], RoleId) VALUES('Elias', 'Bobadilla', 'saile', '42972966', 1);
INSERT INTO Users (FirstName, Lastname, Username, [Password], RoleId) VALUES('Sebastian', 'Bobadilla', 'sebas', '42972966', 2);
INSERT INTO Users (FirstName, Lastname, Username, [Password], RoleId) VALUES('Tilsa', 'Bobadilla', 'tili', '42972966', 3);
INSERT INTO Users (FirstName, Lastname, Username, [Password], RoleId) VALUES('Myriam', 'Camarena', 'myriam', '42972966', 3);

INSERT INTO Projects ([Name]) VALUES ('Dokkumento')

INSERT INTO Forms (ProjectId, [Name], [Description]) VALUES (1, 'Area Emision', 'Proyecto de prueba para digitacion');

INSERT INTO FieldTypes ([Name], [Value], [Description]) VALUES ('Texto abierto', '', 'Campo de texto abierto sin validaciones')
INSERT INTO FieldTypes ([Name], [Value], [Description]) VALUES ('Numero', '', 'Numero sin validaciones')

INSERT INTO FormFields (ProjectId, FormId, FieldTypeId, [Name], [Description], [Length]) VALUES (1, 1, 1, 'DESC', 'Descripcion', 100)
INSERT INTO FormFields (ProjectId, FormId, FieldTypeId, [Name], [Description], [Length]) VALUES (1, 1, 1, 'FECHA', 'Fecha', 100)
INSERT INTO FormFields (ProjectId, FormId, FieldTypeId, [Name], [Description], [Length]) VALUES (1, 1, 1, 'UDF1', 'UDF1', 100)
INSERT INTO FormFields (ProjectId, FormId, FieldTypeId, [Name], [Description], [Length]) VALUES (1, 1, 1, 'UDF2', 'UDF2', 100)
INSERT INTO FormFields (ProjectId, FormId, FieldTypeId, [Name], [Description], [Length]) VALUES (1, 1, 1, 'UDF3', 'UDF3', 100)
INSERT INTO FormFields (ProjectId, FormId, FieldTypeId, [Name], [Description], [Length]) VALUES (1, 1, 1, 'DESC_INT', 'Descripcion Interna', 100)

select * from Roles
select * from Users
select * from FieldTypes

select * from Projects
select * from Forms
select * from FormFields
