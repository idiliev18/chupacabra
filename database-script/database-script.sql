USE [master]
GO
/****** Object:  Database [Chupacabra]    Script Date: 11.06.2021 г. 22:30:59 ******/
CREATE DATABASE [Chupacabra]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Chupacabra', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Chupacabra.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Chupacabra_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Chupacabra_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
USE [Chupacabra]
GO
/****** Object:  Table [dbo].[Boats]    Script Date: 11.06.2021 г. 22:30:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Boats](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LicenseId] [nvarchar](16) NOT NULL,
	[Name] [nvarchar](32) NULL,
	[Engine] [nvarchar](32) NULL,
	[RegistrationNumber] [nvarchar](32) NOT NULL,
	[BoatLicense] [nvarchar](32) NOT NULL,
	[SeatsCount] [tinyint] NULL,
	[AnchorLength] [tinyint] NULL,
	[LifeJacketsCount] [tinyint] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Fishes]    Script Date: 11.06.2021 г. 22:30:59 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FishingEvents]    Script Date: 11.06.2021 г. 22:30:59 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FishingEventsFishes]    Script Date: 11.06.2021 г. 22:30:59 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 11.06.2021 г. 22:30:59 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserBoats]    Script Date: 11.06.2021 г. 22:30:59 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11.06.2021 г. 22:30:59 ******/
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
	[Phone] [varchar](13) NOT NULL,
	[Username] [varchar](32) NOT NULL,
	[Email] [nvarchar](320) NOT NULL,
	[Token] [varchar](128) NULL,
	[TokenCreatedAt] [datetime] NULL,
	[PasswordHash] [varchar](128) NULL,
	[AccountCreatedAt] [datetime] NOT NULL,
	[IsVerified] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersRoles]    Script Date: 11.06.2021 г. 22:30:59 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Boats__72D60083C154938C]    Script Date: 11.06.2021 г. 22:30:59 ******/
ALTER TABLE [dbo].[Boats] ADD UNIQUE NONCLUSTERED 
(
	[LicenseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Boats__AFC653FAD45D60B8]    Script Date: 11.06.2021 г. 22:30:59 ******/
ALTER TABLE [dbo].[Boats] ADD UNIQUE NONCLUSTERED 
(
	[BoatLicense] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Boats__E886460264D21B0C]    Script Date: 11.06.2021 г. 22:30:59 ******/
ALTER TABLE [dbo].[Boats] ADD UNIQUE NONCLUSTERED 
(
	[RegistrationNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [IsVerified]
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
USE [master]
GO
ALTER DATABASE [Chupacabra] SET  READ_WRITE 
GO
