USE [TraineeSrilal]
GO
/****** Object:  StoredProcedure [dbo].[spTypeHandle]    Script Date: 27/10/2020 11:19:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[spTypeHandle] 
	@ID INTEGER,
	@Code VARCHAR(10),
	@Name VARCHAR(50),
	@Active VARCHAR(6),
	@State VARCHAR(10)
AS 
BEGIN 
	IF @State = 'INSERT'
		BEGIN 
			INSERT INTO type_details(type_code, type_name, type_active)
			VALUES(@Code, @Name,@Active)
		END
	IF @State = 'SELECTALL'
		BEGIN
			SELECT * FROM type_details
		END
	IF @State = 'SELECT'
		BEGIN 
			SELECT * FROM type_details
			WHERE type_id = @ID
		END
	IF @State = 'UPDATE'
		BEGIN
			UPDATE type_details
			SET type_code = @Code, type_name = @Name, type_active = @Active 
			WHERE type_id = @ID
		END
	IF @State = 'DELETE'
		BEGIN 
			DELETE FROM type_details
			WHERE type_id = @ID
		END
END
