USE dokkumento

INSERT INTO Users ([FirstName], [Lastname], [Username], [Password], [RoleId]) VALUES('Elias', 'Bobadilla', 'saile', 'saile', 1);
INSERT INTO Users ([FirstName], [Lastname], [Username], [Password], [RoleId]) VALUES('Sebastian', 'Bobadilla', 'sebas', 'sebas', 2);
INSERT INTO Users ([FirstName], [Lastname], [Username], [Password], [RoleId]) VALUES('Tilsa', 'Bobadilla', 'tili', 'tili', 3);
INSERT INTO Users ([FirstName], [Lastname], [Username], [Password], [RoleId]) VALUES('Myriam', 'Camarena', 'myriam', 'myriam', 3);

INSERT INTO Projects ([Code], [Name]) VALUES ('DEMO', 'Demo Project #1')

INSERT INTO Forms ([ProjectId], [Code], [Name]) VALUES (1, 'TEST1', 'Demo form #1');

INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Order], [Code], [Name], [MinLength], [MaxLength], [Required], [Uppercase], [Datasource]) VALUES (1, 1, 1, 1, 'FN', 'Name', 2, 10, 1, 1, 'TD_NAMES')
INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Order], [Code], [Name], [MinLength], [MaxLength], [Required], [Uppercase], [Datasource]) VALUES (1, 1, 1, 2, 'LN', 'Lastname', 2, 10, 1, 1, 'TD_NAMES')
INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Order], [Code], [Name], [MinLength], [MaxLength], [Required], [Uppercase]) VALUES (1, 1, 2, 3, 'AGE', 'Age Field', 2, 10, 0, 0)
INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Order], [Code], [Name], [MinLength], [MaxLength], [Required], [Uppercase]) VALUES (1, 1, 3, 4, 'BIRTHDATE', 'Birthdate', 2, 10, 1, 0)
INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Order], [Code], [Name], [MinLength], [MaxLength], [Required], [Uppercase]) VALUES (1, 1, 4, 5, 'INFO', 'Additional Info', 2, 10, 0, 0)
INSERT INTO FormFields ([ProjectId], [FormId], [FieldTypeId], [Order], [Code], [Name], [MinLength], [MaxLength], [Required], [Uppercase], [Datasource]) VALUES (1, 1, 1, 6, 'PLACE', 'Place', 5, 75, 0, 1, 'TD_SEDES')

CREATE TABLE DIG_DEMO_TEST1 (
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[CreatedBy] INTEGER,
	[Tags] VARCHAR(500) null,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	[FN] VARCHAR(500) null,
	[LN] VARCHAR(500) null,
	[AGE] VARCHAR(500) null,
	[BIRTHDATE] VARCHAR(500) null,
	[INFO] VARCHAR(500) null,
	[PLACE] VARCHAR(500) null,
	FOREIGN KEY (CreatedBy) REFERENCES [Users](Id)
)


/*** You must run td_names.sql and td_sedes.sql files to use demo data  ***/
INSERT INTO DataSources ([Source]) values ('TD_NAMES')
INSERT INTO DataSources ([Source]) values ('TD_SEDES')


ALTER TABLE FormFields ADD DBValidation varchar(500) null

select * from Forms f 

select * from FormFields ff 


SELECT name FROM SYSOBJECTS WHERE xtype='U' AND name LIKE 'DIG%' AND name NOT LIKE '%DELETED%'

SELECT * FROM SYSOBJECTS WHERE xtype='U' AND name REGEXP 'DIG_%'


SELECT * FROM DIG_DEMO_DEMO1 

