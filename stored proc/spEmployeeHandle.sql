USE [TraineeSrilal]
GO
/****** Object:  StoredProcedure [dbo].[spEmployeeHandle]    Script Date: 27/10/2020 11:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[spEmployeeHandle] 
	@ID INTEGER,
	@Code VARCHAR(10),
	@Name VARCHAR(50),
	@Gender VARCHAR(6), 
	@Email VARCHAR(50),
	@Dateofbirth VARCHAR(15), 
	@Typeid INTEGER,
	@Active VARCHAR(10),
	@State VARCHAR(10)
AS 
BEGIN 
	IF @State = 'INSERT'
		BEGIN 
			INSERT INTO emp_details(emp_code,emp_name,emp_email,emp_gender, emp_dateofbirth,emp_active,type_id)
			VALUES(@Code,@Name,@Email,@Gender,@Dateofbirth,@Active,@Typeid)
		END
	IF @State = 'SELECTALL'
		BEGIN
			SELECT * FROM emp_details
		END
	IF @State = 'SELECT'
		BEGIN 
			SELECT * FROM emp_details
			WHERE emp_id = @ID
		END
	IF @State = 'UPDATE'
		BEGIN
			UPDATE emp_details
			SET emp_code = @Code, emp_name = @Name, emp_email = @Email, emp_gender = @Gender, emp_dateofbirth = @Dateofbirth, emp_active = @Active, type_id = @Typeid 
			WHERE emp_id = @ID
		END
	IF @State = 'DELETE'
		BEGIN 
			DELETE FROM emp_details
			WHERE emp_id = @ID
		END
END
