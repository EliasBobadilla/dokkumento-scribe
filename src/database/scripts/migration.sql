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
	[Code] VARCHAR(15) not null,
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
	[Order] INTEGER not null,
	[Code] VARCHAR(15) not null,
	[Name] VARCHAR(50) not null,
	[Description] VARCHAR(500) null,
	[MinLength] INTEGER DEFAULT 0,
	[MaxLength] INTEGER DEFAULT 0,
	[Required] BIT DEFAULT 0,
	[Default] VARCHAR(250) null,
	[Uppercase] BIT DEFAULT 0,
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



/** -- FORM TABLE DEMO -- **/
create table DIG_DEMO_TEST1 (
	[Id] INTEGER IDENTITY(1,1) PRIMARY KEY,
	[DESC] VARCHAR(500) null,
	[FECHA] VARCHAR(500) null,
	[UDF1] VARCHAR(500) null,
	[UDF2] VARCHAR(500) null,
	[UDF3] VARCHAR(500) null,
	[DESC_INT] VARCHAR(500) null,
	[FORCED] BIT DEFAULT 0,
	[Tags] VARCHAR(500) null,
	[CreatedBy] INTEGER,
	[CreatedOn] DATETIME DEFAULT GETDATE(),
	FOREIGN KEY (CreatedBy) REFERENCES [Users](Id),
)

ALTER TABLE DIG_GRM_FAMI ADD [Tags] VARCHAR(500) NULL

