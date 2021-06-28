USE [master]
GO
/****** Object:  Database [Chupacabra]    Script Date: 2021-06-28 6:27:31 PM ******/
CREATE DATABASE [Chupacabra]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Chupacabra', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Chupacabra.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Chupacabra_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Chupacabra_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Chupacabra] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Chupacabra].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Chupacabra] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Chupacabra] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Chupacabra] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Chupacabra] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Chupacabra] SET ARITHABORT OFF 
GO
ALTER DATABASE [Chupacabra] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Chupacabra] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Chupacabra] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Chupacabra] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Chupacabra] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Chupacabra] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Chupacabra] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Chupacabra] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Chupacabra] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Chupacabra] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Chupacabra] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Chupacabra] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Chupacabra] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Chupacabra] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Chupacabra] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Chupacabra] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Chupacabra] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Chupacabra] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Chupacabra] SET  MULTI_USER 
GO
ALTER DATABASE [Chupacabra] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Chupacabra] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Chupacabra] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Chupacabra] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Chupacabra] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Chupacabra] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Chupacabra] SET QUERY_STORE = OFF
GO
USE [Chupacabra]
GO
/****** Object:  Table [dbo].[Boats]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Boats](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](32) NULL,
	[Engine] [nvarchar](32) NULL,
	[RegistrationNumber] [nvarchar](32) NOT NULL,
	[BoatLicense] [nvarchar](32) NOT NULL,
	[SeatsCount] [tinyint] NULL,
	[AnchorLength] [tinyint] NULL,
	[LifeJacketsCount] [tinyint] NULL,
	[IsVerified] [bit] NOT NULL,
 CONSTRAINT [PK__Boats__3214EC0755DC1B67] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Fishes]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Fishes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](32) NOT NULL,
	[Description] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FishingEvents]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FishingEvents](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[BoatId] [int] NOT NULL,
	[Start] [datetime] NOT NULL,
	[End] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FishingEventsFishes]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FishingEventsFishes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FishingEventId] [int] NOT NULL,
	[FishId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [tinyint] IDENTITY(1,1) NOT NULL,
	[RoleName] [varchar](16) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserBoats]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserBoats](
	[UserId] [int] NOT NULL,
	[BoatId] [int] NOT NULL,
 CONSTRAINT [PK_User_Boats] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[BoatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](32) NOT NULL,
	[LastName] [nvarchar](32) NOT NULL,
	[Age] [tinyint] NOT NULL,
	[City] [nvarchar](32) NULL,
	[Phone] [varchar](13) NULL,
	[Username] [varchar](32) NOT NULL,
	[Email] [nvarchar](320) NOT NULL,
	[Token] [varchar](69) NULL,
	[TokenExpiresAt] [datetime] NULL,
	[PasswordHash] [varchar](128) NULL,
	[AccountCreatedAt] [datetime] NOT NULL,
	[IsVerified] [bit] NOT NULL,
 CONSTRAINT [PK__Users__3214EC0777E5016A] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersRoles]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersRoles](
	[UserId] [int] NOT NULL,
	[RoleId] [tinyint] NOT NULL,
 CONSTRAINT [PK_User_Roles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Boats] ON 
GO
INSERT [dbo].[Boats] ([Id], [Name], [Engine], [RegistrationNumber], [BoatLicense], [SeatsCount], [AnchorLength], [LifeJacketsCount], [IsVerified]) VALUES (5, N'SantaMaria', N'Honda', N'a12g', N'1234123412341', 12, 12, 12, 0)
GO
INSERT [dbo].[Boats] ([Id], [Name], [Engine], [RegistrationNumber], [BoatLicense], [SeatsCount], [AnchorLength], [LifeJacketsCount], [IsVerified]) VALUES (6, N'DrugataLodka10', N'Mercedes', N'ajsfdkl1234', N'asdjfkl234', 12, 12, 12, 0)
GO
INSERT [dbo].[Boats] ([Id], [Name], [Engine], [RegistrationNumber], [BoatLicense], [SeatsCount], [AnchorLength], [LifeJacketsCount], [IsVerified]) VALUES (7, N'SantaMaria', N'Honda', N'a12b', N'123566', 12, 12, 12, 0)
GO
SET IDENTITY_INSERT [dbo].[Boats] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 
GO
INSERT [dbo].[Roles] ([Id], [RoleName]) VALUES (1, N'User')
GO
INSERT [dbo].[Roles] ([Id], [RoleName]) VALUES (2, N'Admin')
GO
INSERT [dbo].[Roles] ([Id], [RoleName]) VALUES (3, N'Operator')
GO
INSERT [dbo].[Roles] ([Id], [RoleName]) VALUES (4, N'Boatman')
GO
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
INSERT [dbo].[UserBoats] ([UserId], [BoatId]) VALUES (7, 5)
GO
INSERT [dbo].[UserBoats] ([UserId], [BoatId]) VALUES (7, 6)
GO
INSERT [dbo].[UserBoats] ([UserId], [BoatId]) VALUES (9, 7)
GO
SET IDENTITY_INSERT [dbo].[Users] ON 
GO
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Age], [City], [Phone], [Username], [Email], [Token], [TokenExpiresAt], [PasswordHash], [AccountCreatedAt], [IsVerified]) VALUES (7, N'Alex', N'Manov', 45, NULL, NULL, N'sashko12', N'sashko12@cb.bg', N'AAE0797E5FB0CEB0D20224E52EFCF8', CAST(N'2021-06-29T09:17:25.947' AS DateTime), N'60c9de859700563c24c6033e142112c5dc986c8bde897a85d6ae4e4f0d443662', CAST(N'2021-06-28T09:17:25.947' AS DateTime), 1)
GO
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Age], [City], [Phone], [Username], [Email], [Token], [TokenExpiresAt], [PasswordHash], [AccountCreatedAt], [IsVerified]) VALUES (8, N'fda', N'df', 12, NULL, NULL, N'wqdfdgshgf', N'dafdf@fddf.bg', N'F782E7909A06A8290EBE78893E1339', CAST(N'2021-06-29T09:44:41.997' AS DateTime), N'60c9de859700563c24c6033e142112c5dc986c8bde897a85d6ae4e4f0d443662', CAST(N'2021-06-28T09:44:41.997' AS DateTime), 0)
GO
INSERT [dbo].[Users] ([Id], [FirstName], [LastName], [Age], [City], [Phone], [Username], [Email], [Token], [TokenExpiresAt], [PasswordHash], [AccountCreatedAt], [IsVerified]) VALUES (9, N'Iliyan', N'Iliev', 16, N'Burgas', N'+359876603828', N'ilko1234', N'idiliev18@codingburgas.bg', N'496CFBC01E13247925AE4B245F472E', CAST(N'2021-06-29T09:55:21.270' AS DateTime), N'e6ea6d1055a67e61c44385460da96963797f263cc7dd124fdfba34c601f719da', CAST(N'2021-06-28T09:55:21.270' AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
INSERT [dbo].[UsersRoles] ([UserId], [RoleId]) VALUES (7, 4)
GO
INSERT [dbo].[UsersRoles] ([UserId], [RoleId]) VALUES (8, 1)
GO
INSERT [dbo].[UsersRoles] ([UserId], [RoleId]) VALUES (9, 1)
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Boats__AFC653FAF5394511]    Script Date: 2021-06-28 6:27:31 PM ******/
ALTER TABLE [dbo].[Boats] ADD  CONSTRAINT [UQ__Boats__AFC653FAF5394511] UNIQUE NONCLUSTERED 
(
	[BoatLicense] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Boats__E8864602563C1802]    Script Date: 2021-06-28 6:27:31 PM ******/
ALTER TABLE [dbo].[Boats] ADD  CONSTRAINT [UQ__Boats__E8864602563C1802] UNIQUE NONCLUSTERED 
(
	[RegistrationNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_TokenCreatedAt]  DEFAULT (getdate()+(1)) FOR [TokenExpiresAt]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_AccountCreatedAt]  DEFAULT (getdate()) FOR [AccountCreatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF__Users__IsVerifie__34C8D9D1]  DEFAULT ((0)) FOR [IsVerified]
GO
ALTER TABLE [dbo].[FishingEvents]  WITH CHECK ADD  CONSTRAINT [FK_FishingEvents_Boats] FOREIGN KEY([BoatId])
REFERENCES [dbo].[Boats] ([Id])
GO
ALTER TABLE [dbo].[FishingEvents] CHECK CONSTRAINT [FK_FishingEvents_Boats]
GO
ALTER TABLE [dbo].[FishingEvents]  WITH CHECK ADD  CONSTRAINT [FK_FishingEvents_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[FishingEvents] CHECK CONSTRAINT [FK_FishingEvents_Users]
GO
ALTER TABLE [dbo].[FishingEventsFishes]  WITH CHECK ADD  CONSTRAINT [FK_FishingEventFishes_Id] FOREIGN KEY([FishingEventId])
REFERENCES [dbo].[FishingEvents] ([Id])
GO
ALTER TABLE [dbo].[FishingEventsFishes] CHECK CONSTRAINT [FK_FishingEventFishes_Id]
GO
ALTER TABLE [dbo].[FishingEventsFishes]  WITH CHECK ADD  CONSTRAINT [FK_FishingEventsFishes_FishId] FOREIGN KEY([FishId])
REFERENCES [dbo].[Fishes] ([Id])
GO
ALTER TABLE [dbo].[FishingEventsFishes] CHECK CONSTRAINT [FK_FishingEventsFishes_FishId]
GO
ALTER TABLE [dbo].[UserBoats]  WITH CHECK ADD  CONSTRAINT [FK_UserBoats_Boat] FOREIGN KEY([BoatId])
REFERENCES [dbo].[Boats] ([Id])
GO
ALTER TABLE [dbo].[UserBoats] CHECK CONSTRAINT [FK_UserBoats_Boat]
GO
ALTER TABLE [dbo].[UserBoats]  WITH CHECK ADD  CONSTRAINT [FK_UserBoats_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[UserBoats] CHECK CONSTRAINT [FK_UserBoats_User]
GO
ALTER TABLE [dbo].[UsersRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([Id])
GO
ALTER TABLE [dbo].[UsersRoles] CHECK CONSTRAINT [FK_UserRoles_Role]
GO
ALTER TABLE [dbo].[UsersRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[UsersRoles] CHECK CONSTRAINT [FK_UserRoles_User]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [CK_Users_Email] CHECK  (([Email] like '%__@__%.__%'))
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [CK_Users_Email]
GO
/****** Object:  StoredProcedure [dbo].[ChangeUserData]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[ChangeUserData]
@Email nvarchar(320),
@FirstName nvarchar(32),
@LastName nvarchar(32),
@Token varchar(69)

AS

IF EXISTS(SELECT Id FROM Users WHERE Token = @Token AND IsVerified = 1)
BEGIN
	IF (@Email != '')
	BEGIN
		UPDATE Users SET Email = @Email WHERE Token = @Token
	END
	IF (@FirstName != '')
	BEGIN
		UPDATE Users SET FirstName = @FirstName WHERE Token = @Token
	END
	IF (@LastName != '')
	BEGIN
		UPDATE Users SET LastName = @LastName WHERE Token = @Token
	END

	SELECT 0 AS Success
END
ELSE
BEGIN
	SELECT 8 AS ReturnCode
END
GO
/****** Object:  StoredProcedure [dbo].[GenerateForgotPasswordToken]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[GenerateForgotPasswordToken]
@Username varchar(32)
AS

IF EXISTS(SELECT Id FROM Users WHERE Username = @Username)
BEGIN
    
    DECLARE @ExpireDate datetime
    SET @ExpireDate = GETDATE() + 1

    DECLARE @Token varchar(69)
    SET @Token = CONVERT(varchar,HASHBYTES('SHA2_256', CONVERT(varchar, GETDATE()-12)+ 'qnko'+ @Username + CONVERT(varchar, RAND()*(25-10)+10)),2)

    UPDATE Users
    SET Token = @Token, TokenExpiresAt = @ExpireDate
    WHERE Username = @Username

    SELECT Email, @Token AS Token FROM Users WHERE Username = @Username
END
GO
/****** Object:  StoredProcedure [dbo].[GetBoats]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[GetBoats]
@Token varchar(69)
AS

DECLARE @Id int
SELECT @Id = Id FROM Users
WHERE Token = @Token AND
DATEDIFF(MINUTE, GETDATE(), TokenExpiresAt ) > 0

DECLARE @RoleName varchar(32)

SELECT @RoleName = r.RoleName FROM Users u
INNER JOIN UsersRoles ur
ON u.Id = ur.UserId
INNER JOIN Roles r
ON r.Id = ur.RoleId
WHERE UserId = @Id AND (r.RoleName = 'Operator' OR r.RoleName = 'Boatman')


DECLARE @Username varchar(32)

IF (@RoleName = 'Operator')
BEGIN
SELECT b.Id AS BoatId, b.[Name] AS BoatName, b.Engine, b.RegistrationNumber,
b.BoatLicense, b.SeatsCount, b.AnchorLength, b.LifeJacketsCount ,b.IsVerified,u.Username  FROM Users u
INNER JOIN UserBoats ub
ON u.Id = ub.UserId
INNER JOIN Boats b
ON b.Id = ub.BoatId

END
ELSE IF(@RoleName = 'Boatman')
BEGIN
	SELECT b.Id AS BoatId, b.[Name] AS BoatName, b.Engine, b.RegistrationNumber,
	b.BoatLicense, b.SeatsCount, b.AnchorLength, b.LifeJacketsCount ,b.IsVerified,u.Username FROM Users u
	INNER JOIN UserBoats ub
	ON u.Id = ub.UserId
	INNER JOIN Boats b
	ON b.Id = ub.BoatId
	WHERE ub.UserId = @Id
END


GO
/****** Object:  StoredProcedure [dbo].[GetProfileInformation]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[GetProfileInformation]
@Username varchar(32),
@Token varchar(69)
AS

IF (@Token = 'NULL')
BEGIN
	SELECT FirstName, LastName,  Username, Email, City, IsVerified
	FROM Users
	WHERE Username = @Username
END

ELSE IF(@Username = '@me')
BEGIN
	SELECT
	FirstName,
	LastName,
	Age,
	Username,
	Email,
	Phone,
	City,
	IsVerified
	FROM Users
	WHERE Token = @Token AND DATEDIFF(MINUTE, GETDATE(), TokenExpiresAt ) > 0

	SELECT @Username = Username FROM Users WHERE Token = @Token AND DATEDIFF(MINUTE, GETDATE(), TokenExpiresAt ) > 0
END

ELSE
BEGIN
	SELECT
	FirstName,
	LastName,
	Age,
	Username,
	Email,
	Phone,
	City,
	IsVerified
	FROM Users
	WHERE Username = @Username AND Token = @Token AND DATEDIFF(MINUTE, GETDATE(), TokenExpiresAt ) > 0

END

SELECT r.RoleName FROM Users u
INNER JOIN UsersRoles ur
ON u.Id = ur.UserId
INNER JOIN Roles r
ON r.Id = ur.RoleId
WHERE UserName = @Username
GO
/****** Object:  StoredProcedure [dbo].[LoginUser]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[LoginUser]
@LoginCredential varchar(320),
@PasswordHash varchar(128)

AS

DECLARE @ExpireDate datetime
DECLARE @Token varchar(69)

IF (@LoginCredential LIKE '%@%')
BEGIN
	IF EXISTS(SELECT Id FROM Users WHERE Email = @LoginCredential AND PasswordHash = @PasswordHash)
	BEGIN
	SET @ExpireDate = GETDATE() + 1

	SET @Token = CONVERT(varchar,HASHBYTES('SHA2_256', CONVERT(varchar, GETDATE()-12)+ 'foncho'+ @LoginCredential+ CONVERT(varchar, RAND()*(25-10)+10)),2)

	UPDATE Users SET Token=@Token WHERE Email = @LoginCredential

	-- Select Token and Expire date
	SELECT @Token AS Token,  @ExpireDate AS [ExpireDate]
	END
	ELSE
	BEGIN
		SELECT 4 AS ReturnCode
	END
END
ELSE
BEGIN
	IF EXISTS(SELECT Id FROM Users WHERE Username = @LoginCredential AND PasswordHash = @PasswordHash)
	BEGIN

	SET @ExpireDate = GETDATE() + 1

	SET @Token = CONVERT(varchar,HASHBYTES('SHA2_256', CONVERT(varchar, GETDATE()-12)+ 'foncho'+ @LoginCredential+ CONVERT(varchar, RAND()*(25-10)+10)),2)

	UPDATE Users SET Token=@Token WHERE Username = @LoginCredential

	-- Select Token and Expire date
	SELECT @Token AS Token,  @ExpireDate AS [ExpireDate]
	END
	ELSE
	BEGIN
		SELECT 4 AS ReturnCode
	END
END
GO
/****** Object:  StoredProcedure [dbo].[RegisterBoat]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[RegisterBoat]
@Token varchar(69),
@Name nvarchar(32),
@Engine nvarchar(32),
@RegistrationNumber nvarchar(32),
@BoatLicense nvarchar(32),
@SeatsCount tinyint,
@AnchorLength tinyint,
@LifeJacketsCount tinyint

AS

IF EXISTS(SELECT Id FROM Users WHERE Token = @Token AND IsVerified = 0)
BEGIN
	Select 7 AS ReturnCode
END
ELSE IF EXISTS(SELECT RegistrationNumber From Boats WHERE RegistrationNumber = @RegistrationNumber)
BEGIN
	SELECT 5 AS ReturnCode
END
ELSE IF EXISTS(SELECT BoatLicense From Boats WHERE BoatLicense = @BoatLicense)
BEGIN
	SELECT 6 AS ReturnCode
END
ELSE
BEGIN

	INSERT INTO Boats ([Name], Engine, RegistrationNumber, BoatLicense, SeatsCount, AnchorLength,LifeJacketsCount,IsVerified)
	VALUES (@Name, @Engine, @RegistrationNumber, @BoatLicense, @SeatsCount, @AnchorLength, @LifeJacketsCount, 0)

	INSERT INTO UserBoats (UserId, BoatId) VALUES ((SELECT Id FROM Users WHERE Token = @Token), (SELECT Id FROM Boats WHERE RegistrationNumber = @RegistrationNumber))
	
	DECLARE @Id int
	SELECT @Id = Id FROM Users WHERE Token = @Token AND DATEDIFF(MINUTE, GETDATE(), TokenExpiresAt ) > 0

	INSERT INTO UsersRoles (UserId, RoleId)
	VALUES (@Id, 4)

	SELECT 0 as Success
END
GO
/****** Object:  StoredProcedure [dbo].[RegisterUser]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RegisterUser]
@FirstName nvarchar(32),
@LastName nvarchar(32),
@Age tinyint,
@City nvarchar(32),
@Phone varchar(13),
@Username varchar(32),
@Email nvarchar(320),
@PasswordHash varchar(128)

AS

-- Checks if Email is taken
IF EXISTS(SELECT Email FROM Users WHERE Email = @Email)
BEGIN
	SELECT 1 AS ReturnCode
END

-- Checks if username is taken
ELSE IF EXISTS(SELECT Username FROM Users WHERE Username = @Username)
BEGIN
	SELECT 2 AS ReturnCode
END

-- Checks if phone is taken
ELSE IF EXISTS(SELECT Phone FROM Users WHERE Phone = @Phone)
BEGIN
	SELECT 3 AS ReturnCode
END

ELSE
BEGIN
	DECLARE @ExpireDate datetime
	SET @ExpireDate = GETDATE() + 1

	DECLARE @Token varchar(69)
	SET @Token = CONVERT(varchar,HASHBYTES('SHA2_256', CONVERT(varchar, GETDATE()-12)+ 'qnko'+ @Email + CONVERT(varchar, RAND()*(25-10)+10)),2)

	-- Insert
	INSERT INTO Users (FirstName, LastName, Age, City, Phone, Username, Email, Token, PasswordHash)
	VALUES(@FirstName, @LastName, @Age, @City, @Phone, @Username, @Email, @Token, @PasswordHash)

	INSERT INTO UsersRoles (UserId, RoleId)
	VALUES (IDENT_CURRENT('Users'), 1)

	-- Select Token and Expire date
	SELECT @Token AS Token,  @ExpireDate AS [ExpireDate]
END
GO
/****** Object:  StoredProcedure [dbo].[ResetPassword]    Script Date: 2021-06-28 6:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[ResetPassword]
@Token varchar(128),
@Password varchar(128)
AS
IF EXISTS(SELECT Id From Users WHERE Token = @Token AND DATEDIFF(MINUTE, GETDATE(), TokenExpiresAt ) > 0)
BEGIN
	UPDATE Users
	SET PasswordHash = @Password, TokenExpiresAt = GETDATE()
	WHERE Token = @Token

	SELECT 0 AS ReturnCode;
END

GO
USE [master]
GO
ALTER DATABASE [Chupacabra] SET  READ_WRITE 
GO
