USE dokkumento

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

INSERT INTO Projects ([Code], [Name]) VALUES ('DEMO23', 'mela33')

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

select * from DIG_DEMO_TEST1

INSERT INTO [DIG_DEMO_TEST1] ([CreatedBy],[DESC],[FECHA],[UDF1],[UDF2],[UDF3],[Tags]) VALUES ('1','DFSDFSDFSD','24-05-1985','34343434','5464654','465465465','mela hola',' joder',' uno')


INSERT INTO [Projects] ([Code],[Name]) OUTPUT INSERTED.[Id],INSERTED.[Code],INSERTED.[Name],INSERTED.[Deleted] VALUES (@0,@1);