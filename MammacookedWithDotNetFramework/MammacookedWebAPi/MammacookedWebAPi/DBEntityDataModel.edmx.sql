
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 07/25/2021 10:34:20
-- Generated from EDMX file: D:\master Stuff\oldAngularBussinessCode\MammacookedWithDotNetFramework\MammacookedWebAPi\MammacookedWebAPi\DBEntityDataModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [MyMammacoookeDRM];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserClaims] DROP CONSTRAINT [FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserLogins] DROP CONSTRAINT [FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_ItemsGroups_FoodGroups]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ItemsGroups] DROP CONSTRAINT [FK_ItemsGroups_FoodGroups];
GO
IF OBJECT_ID(N'[dbo].[FK_ItemsGroups_FoodItems]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ItemsGroups] DROP CONSTRAINT [FK_ItemsGroups_FoodItems];
GO
IF OBJECT_ID(N'[dbo].[FK_OrderItem_FoodItems]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[OrderItems] DROP CONSTRAINT [FK_OrderItem_FoodItems];
GO
IF OBJECT_ID(N'[dbo].[FK_OrderItem_Orders]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[OrderItems] DROP CONSTRAINT [FK_OrderItem_Orders];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetRoles]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetRoles];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetUsers]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetUsers];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[C__MigrationHistory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[C__MigrationHistory];
GO
IF OBJECT_ID(N'[dbo].[AspNetRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetRoles];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserClaims]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserClaims];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserLogins]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserLogins];
GO
IF OBJECT_ID(N'[dbo].[AspNetUsers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[FoodGroups]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FoodGroups];
GO
IF OBJECT_ID(N'[dbo].[FoodItems]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FoodItems];
GO
IF OBJECT_ID(N'[dbo].[ItemsGroups]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ItemsGroups];
GO
IF OBJECT_ID(N'[dbo].[OrderItems]', 'U') IS NOT NULL
    DROP TABLE [dbo].[OrderItems];
GO
IF OBJECT_ID(N'[dbo].[Orders]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Orders];
GO
IF OBJECT_ID(N'[dbo].[sysdiagrams]', 'U') IS NOT NULL
    DROP TABLE [dbo].[sysdiagrams];
GO
IF OBJECT_ID(N'[dbo].[CustomerDetails]', 'U') IS NOT NULL
    DROP TABLE [dbo].[CustomerDetails];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserRoles];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'C__MigrationHistory'
CREATE TABLE [dbo].[C__MigrationHistory] (
    [MigrationId] nvarchar(150)  NOT NULL,
    [ContextKey] nvarchar(300)  NOT NULL,
    [Model] varbinary(max)  NOT NULL,
    [ProductVersion] nvarchar(32)  NOT NULL
);
GO

-- Creating table 'AspNetRoles'
CREATE TABLE [dbo].[AspNetRoles] (
    [Id] nvarchar(128)  NOT NULL,
    [Name] nvarchar(256)  NOT NULL
);
GO

-- Creating table 'AspNetUserClaims'
CREATE TABLE [dbo].[AspNetUserClaims] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserId] nvarchar(128)  NOT NULL,
    [ClaimType] nvarchar(max)  NULL,
    [ClaimValue] nvarchar(max)  NULL
);
GO

-- Creating table 'AspNetUserLogins'
CREATE TABLE [dbo].[AspNetUserLogins] (
    [LoginProvider] nvarchar(128)  NOT NULL,
    [ProviderKey] nvarchar(128)  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'AspNetUsers'
CREATE TABLE [dbo].[AspNetUsers] (
    [Id] nvarchar(128)  NOT NULL,
    [Email] nvarchar(256)  NULL,
    [EmailConfirmed] bit  NOT NULL,
    [PasswordHash] nvarchar(max)  NULL,
    [SecurityStamp] nvarchar(max)  NULL,
    [PhoneNumber] nvarchar(max)  NULL,
    [PhoneNumberConfirmed] bit  NOT NULL,
    [TwoFactorEnabled] bit  NOT NULL,
    [LockoutEndDateUtc] datetime  NULL,
    [LockoutEnabled] bit  NOT NULL,
    [AccessFailedCount] int  NOT NULL,
    [UserName] nvarchar(256)  NOT NULL,
    [ValidToDelevery] bit  NOT NULL
);
GO

-- Creating table 'FoodGroups'
CREATE TABLE [dbo].[FoodGroups] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [GroupName] varchar(500)  NULL,
    [GroupDetails] varchar(max)  NULL,
    [DeleteFlag] bit  NULL,
    [OfferFlag] bit  NULL,
    [Image] varchar(max)  NULL
);
GO

-- Creating table 'FoodItems'
CREATE TABLE [dbo].[FoodItems] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Category] varchar(20)  NULL,
    [PreferredTime] time  NULL,
    [Name] varchar(50)  NULL,
    [Prise] decimal(19,4)  NULL,
    [RestrictedDays] varchar(100)  NULL,
    [Details] varchar(500)  NULL,
    [CountType] varchar(50)  NULL,
    [Currency] varchar(30)  NULL,
    [Image] varchar(max)  NULL,
    [ServeGroup] int  NULL,
    [DeleteFlag] bit  NULL,
    [CreatedBy] varchar(50)  NULL,
    [CreateOn] datetime  NULL,
    [EditeBy] varchar(50)  NULL,
    [EditedOn] datetime  NULL,
    [DeleteBy] varchar(50)  NULL,
    [DeleteOn] nchar(10)  NULL
);
GO

-- Creating table 'ItemsGroups'
CREATE TABLE [dbo].[ItemsGroups] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [GroupId] int  NULL,
    [ItemId] int  NULL
);
GO

-- Creating table 'OrderItems'
CREATE TABLE [dbo].[OrderItems] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [OrderId] int  NOT NULL,
    [ItemId] int  NOT NULL,
    [DateTime] datetime  NOT NULL
);
GO

-- Creating table 'Orders'
CREATE TABLE [dbo].[Orders] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserId] nvarchar(128)  NULL,
    [OrderItemId] int  NULL,
    [Date] datetime  NULL,
    [TimeSlot] varchar(50)  NULL,
    [Status] varchar(50)  NULL,
    [Location] varchar(200)  NULL,
    [PaymentStatus] varchar(50)  NULL,
    [PaymentMedium] varchar(50)  NULL,
    [DeleveredTo] varchar(50)  NULL,
    [PendingAmount] float  NULL
);
GO

-- Creating table 'sysdiagrams'
CREATE TABLE [dbo].[sysdiagrams] (
    [name] nvarchar(128)  NOT NULL,
    [principal_id] int  NOT NULL,
    [diagram_id] int IDENTITY(1,1) NOT NULL,
    [version] int  NULL,
    [definition] varbinary(max)  NULL
);
GO

-- Creating table 'CustomerDetails'
CREATE TABLE [dbo].[CustomerDetails] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Email] nvarchar(256)  NULL,
    [FirstName] varchar(250)  NULL,
    [LastName] varchar(250)  NULL,
    [Address] varchar(50)  NULL,
    [City] varchar(50)  NULL,
    [Country] varchar(50)  NULL,
    [PostalCode] varchar(15)  NULL,
    [About] varchar(500)  NULL,
    [BreakFastAddr] varchar(500)  NULL,
    [LunchAddr] varchar(500)  NULL,
    [Dinner] varchar(500)  NULL,
    [B_LatLong] varchar(50)  NULL,
    [L_LatLong] varchar(50)  NULL,
    [D_latLong] varchar(50)  NULL,
    [Verified] bit  NOT NULL,
    [ValidForSupply] bit  NOT NULL,
    [MonyBalance] decimal(19,4)  NOT NULL,
    [CreatedOn] datetime  NOT NULL,
    [DeletedOn] datetime  NULL,
    [UpdateOn] datetime  NULL,
    [DeleteFlag] bit  NOT NULL,
    [ImagePath] varchar(max)  NULL,
    [Phone_1] varchar(15)  NOT NULL,
    [Phone_2] varchar(15)  NULL
);
GO

-- Creating table 'AspNetUserRoles'
CREATE TABLE [dbo].[AspNetUserRoles] (
    [AspNetRoles_Id] nvarchar(128)  NOT NULL,
    [AspNetUsers_Id] nvarchar(128)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [MigrationId], [ContextKey] in table 'C__MigrationHistory'
ALTER TABLE [dbo].[C__MigrationHistory]
ADD CONSTRAINT [PK_C__MigrationHistory]
    PRIMARY KEY CLUSTERED ([MigrationId], [ContextKey] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetRoles'
ALTER TABLE [dbo].[AspNetRoles]
ADD CONSTRAINT [PK_AspNetRoles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUserClaims'
ALTER TABLE [dbo].[AspNetUserClaims]
ADD CONSTRAINT [PK_AspNetUserClaims]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [LoginProvider], [ProviderKey], [UserId] in table 'AspNetUserLogins'
ALTER TABLE [dbo].[AspNetUserLogins]
ADD CONSTRAINT [PK_AspNetUserLogins]
    PRIMARY KEY CLUSTERED ([LoginProvider], [ProviderKey], [UserId] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUsers'
ALTER TABLE [dbo].[AspNetUsers]
ADD CONSTRAINT [PK_AspNetUsers]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'FoodGroups'
ALTER TABLE [dbo].[FoodGroups]
ADD CONSTRAINT [PK_FoodGroups]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'FoodItems'
ALTER TABLE [dbo].[FoodItems]
ADD CONSTRAINT [PK_FoodItems]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ItemsGroups'
ALTER TABLE [dbo].[ItemsGroups]
ADD CONSTRAINT [PK_ItemsGroups]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'OrderItems'
ALTER TABLE [dbo].[OrderItems]
ADD CONSTRAINT [PK_OrderItems]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Orders'
ALTER TABLE [dbo].[Orders]
ADD CONSTRAINT [PK_Orders]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [diagram_id] in table 'sysdiagrams'
ALTER TABLE [dbo].[sysdiagrams]
ADD CONSTRAINT [PK_sysdiagrams]
    PRIMARY KEY CLUSTERED ([diagram_id] ASC);
GO

-- Creating primary key on [Id] in table 'CustomerDetails'
ALTER TABLE [dbo].[CustomerDetails]
ADD CONSTRAINT [PK_CustomerDetails]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [AspNetRoles_Id], [AspNetUsers_Id] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [PK_AspNetUserRoles]
    PRIMARY KEY CLUSTERED ([AspNetRoles_Id], [AspNetUsers_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [UserId] in table 'AspNetUserClaims'
ALTER TABLE [dbo].[AspNetUserClaims]
ADD CONSTRAINT [FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId'
CREATE INDEX [IX_FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]
ON [dbo].[AspNetUserClaims]
    ([UserId]);
GO

-- Creating foreign key on [UserId] in table 'AspNetUserLogins'
ALTER TABLE [dbo].[AspNetUserLogins]
ADD CONSTRAINT [FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId'
CREATE INDEX [IX_FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]
ON [dbo].[AspNetUserLogins]
    ([UserId]);
GO

-- Creating foreign key on [GroupId] in table 'ItemsGroups'
ALTER TABLE [dbo].[ItemsGroups]
ADD CONSTRAINT [FK_ItemsGroups_FoodGroups]
    FOREIGN KEY ([GroupId])
    REFERENCES [dbo].[FoodGroups]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ItemsGroups_FoodGroups'
CREATE INDEX [IX_FK_ItemsGroups_FoodGroups]
ON [dbo].[ItemsGroups]
    ([GroupId]);
GO

-- Creating foreign key on [ItemId] in table 'ItemsGroups'
ALTER TABLE [dbo].[ItemsGroups]
ADD CONSTRAINT [FK_ItemsGroups_FoodItems]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[FoodItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ItemsGroups_FoodItems'
CREATE INDEX [IX_FK_ItemsGroups_FoodItems]
ON [dbo].[ItemsGroups]
    ([ItemId]);
GO

-- Creating foreign key on [ItemId] in table 'OrderItems'
ALTER TABLE [dbo].[OrderItems]
ADD CONSTRAINT [FK_OrderItem_FoodItems]
    FOREIGN KEY ([ItemId])
    REFERENCES [dbo].[FoodItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_OrderItem_FoodItems'
CREATE INDEX [IX_FK_OrderItem_FoodItems]
ON [dbo].[OrderItems]
    ([ItemId]);
GO

-- Creating foreign key on [OrderId] in table 'OrderItems'
ALTER TABLE [dbo].[OrderItems]
ADD CONSTRAINT [FK_OrderItem_Orders]
    FOREIGN KEY ([OrderId])
    REFERENCES [dbo].[Orders]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_OrderItem_Orders'
CREATE INDEX [IX_FK_OrderItem_Orders]
ON [dbo].[OrderItems]
    ([OrderId]);
GO

-- Creating foreign key on [AspNetRoles_Id] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetRoles]
    FOREIGN KEY ([AspNetRoles_Id])
    REFERENCES [dbo].[AspNetRoles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [AspNetUsers_Id] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetUsers]
    FOREIGN KEY ([AspNetUsers_Id])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AspNetUserRoles_AspNetUsers'
CREATE INDEX [IX_FK_AspNetUserRoles_AspNetUsers]
ON [dbo].[AspNetUserRoles]
    ([AspNetUsers_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------