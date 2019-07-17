DECLARE @ListsData XML;
DECLARE @VesselData XML;
DECLARE @SignerList XML;

DECLARE @DocumentDate date;

DECLARE @AccessList NVARCHAR(MAX);
DECLARE @x NVARCHAR(MAX);
DECLARE @CompareUserName NVARCHAR (MAX);
DECLARE @EmployeeMailFixed NVARCHAR (MAX);
DECLARE @SubjectDocType NVARCHAR (MAX);
DECLARE @MailDocNum NVARCHAR (MAX);
DECLARE @DocType NVARCHAR (MAX);
DECLARE @DocDescribe NVARCHAR (MAX);
DECLARE @Link NVARCHAR (MAX);
DECLARE @delimiter NVARCHAR(50);
DECLARE @BranchCodeCheck NVARCHAR(50);
DECLARE @CurrentState NVARCHAR(50);
DECLARE @DocNum NVARCHAR(50);
DECLARE @tDocNum NVARCHAR(50);
DECLARE @CanIMakeAction NVARCHAR(10);

DECLARE @DateFiller NCHAR(10);

DECLARE @count INT;
DECLARE @begin INT;
DECLARE @nDocNum INT;

DECLARE @t_DivCode TABLE ( [Name] NVARCHAR(MAX) );
DECLARE @t_MySett TABLE ( [ProfileGroup] NVARCHAR(250), [ProfileItem] NVARCHAR(250), [ProfileItemVal] NVARCHAR(250) );
DECLARE @t_NumTable TABLE ( [Num] NVARCHAR(50) );
DECLARE @MyRefCodeTable TABLE ([LocationCode] nvarchar(100),[BranchName] nvarchar(100),[BranchCode] nvarchar(100) );


DECLARE @DocID UNIQUEIDENTIFIER;
DECLARE @DocItemID UNIQUEIDENTIFIER;
DECLARE @nLastNumID UNIQUEIDENTIFIER;

IF ('@PARAM@' = 'Document')
BEGIN

  SET @AccessList = ( SELECT [AccessQuery] FROM [NKReports].[dbo].[DB_Settings_ACL] WHERE [UserName] = '@UserName@' AND [TableName] = 'LabProtocolsEditCode' )
  SET @delimiter = ','

  IF  ( '@unid@' <> '@' + 'unid' + '@' AND '@unid@' <> '' )
	BEGIN
	  SET @BranchCodeCheck = ( SELECT BranchCode from [LabProtocols].[dbo].[Ent_Lab_Document] WHERE ID = '@unid@' )
    SET @CanIMakeAction = CASE WHEN @BranchCodeCheck IN ( SELECT nstr FROM [NKReports].[dbo].[Params_To_Table] (@AccessList, @delimiter) ) THEN 'true' ELSE 'false' END
  END
  ELSE
  BEGIN
    SET @CanIMakeAction = CASE WHEN @AccessList IS NOT NULL THEN 'true' ELSE 'false' END
  END

 	IF ( '@PARAM2@' = 'Document_Load' )
	BEGIN
    SET @DateFiller = CONVERT( NCHAR(10), GetDate(), 103 )

		  INSERT INTO @t_DivCode 
		  SELECT DISTINCT b.[Name]			
		  FROM [RUWS002].[Staff].[dbo].[Ref_Segment] AS b
		  JOIN [LabProtocols].[dbo].[Ent_Divisions] AS a
		  ON b.[ID] = a.[ID_Segment]

  	SET @ListsData =	
    ( SELECT
	    ( SELECT [Item] + ';' FROM [LabProtocols].[dbo].[Ent_Type_List] WHERE [GroupTypeEng] = 'DocumentTypeName' ORDER BY [Item] ASC for xml path('') ) as DocumentTypes
      ,( SELECT [CityName] + ';'
        FROM [LabProtocols].[dbo].[Ent_Laboratories]
        WHERE ( SELECT COUNT(nstr)
      FROM [NKreports].[dbo].[Params_to_table]( @AccessList, @delimiter )
      WHERE nstr = [LabCode] ) > 0
      ORDER BY [CityName]
      FOR XML PATH('') ) as Locations
      ,(SELECT /*[Name] + ';'  FROM @t_DivCode  for xml path('') */ 'div1;div2;div3') as DivCodes
        FOR XML PATH ('RegInfo'), TYPE, ROOT('ListData')
    )
	  IF  ( '@unid@' <> '@' + 'unid' + '@' AND '@unid@' <> '' )
	  BEGIN
			SET @VesselData =	(SELECT
		 ( SELECT /* POST SERVICE LAB DocumentBackend @PARAM2@, @UserName@, GetDate() */ 
		  [ID] AS [unid]
		  ,[DocNum]
		  ,CONVERT( CHAR(10), [DocDate], 103 ) AS [DocumentDate]
		  ,[DocType] AS [DocumentType]
		  ,REPLACE( [DocDescribe], CHAR(10), '\n' ) AS [DocumentDescribe]
		  ,[Location]     
		  ,[DivCode]
		  ,( SELECT REPLACE( [ItemVal], CHAR(10), '\n' ) FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] 
        WHERE [DocID] = '@unid@' AND [ItemGroup] = 'regInfo' AND [Item] = 'Note' ) AS [Note]
		  ,@CanIMakeAction AS [CanIEditDocument]
		  ,CONVERT( CHAR(10), [Registered], 104 ) + ' ' + CONVERT( CHAR(5), [Registered], 108 ) + ' ' +  [RegisteredBy] AS [RegInfo]
		  ,CONVERT( CHAR(10), [LastChanged], 104 ) + ' ' + CONVERT( CHAR(5), [LastChanged], 108 ) + ' ' + [LastChangedBy] AS [LastChangeInfo]
		 FOR XML PATH('Field'), ROOT('Field'), TYPE )
      /* Загруженные файлы */
		  ,( SELECT /* POST SERVICE LAB DocumentBackend @PARAM2@, @UserName@, GetDate() */  
					 [Id] AS [DocFileId]
					,[FileName]
					,CONVERT( CHAR(10), [UploadedOn], 104 ) + ' ' + CONVERT( CHAR(5), [UploadedOn], 108 ) + ' ' + [UploadedBy] AS [UploadedInfo]
					,'false' AS [onAction]
					,'./FileDownload.ashx?Id='+ CAST( [Id] AS NVARCHAR(36) ) AS [linkToDoc]
			FROM [NKReports].[dbo].[DB_Settings_UploadedFiles] WHERE [IdParent] IN 
				( SELECT CAST([Item] AS UNIQUEIDENTIFIER) FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] WHERE [DocID] = '@unid@' AND [ItemGroup] = 'UploadedFile' ) 
        FOR XML PATH('Files'), ROOT('DataFiles'), TYPE )
        /* Подписанты */
        ,( SELECT 
					[ID] AS [ID]
					,Item AS [SignerName]
					,'false' AS [onAction]
					,@CanIMakeAction AS [IsNotDisabledBtnDel]
					,CONVERT( CHAR(10), [Registered], 104 ) + ' ' + CONVERT( CHAR(5), [Registered], 108 ) + ' ' + [RegisteredBy] AS [AddBy] 
				   FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] 
				   WHERE CAST( [DocID] AS NVARCHAR(36) ) = '@unid@' AND [ItemGroup] = 'Signer' 
				   FOR XML PATH('Signer'), ROOT('SignerData'), TYPE ) 
	   		/* Ознакомление */
        ,( SELECT /* POST SERVICE LAB DocumentBackend @PARAM2@ @UserName@, GetDate() */  [ID]
				,[Item] AS [PersonName]
				,[ItemVal] AS [OnboardingState]
				,'false' AS [onAction]
				,CASE WHEN ItemVal = 'approved' THEN 
					CONVERT( CHAR(10), [LastChanged], 104 ) + ' ' + CONVERT( char(5), [LastChanged], 108 ) + ' '+ [LastChangedBy] ELSE '' END AS [LastChanged]
				,CASE WHEN '@UserName@' <> [Item] OR ItemVal = 'approved' THEN 'true' ELSE 'false' END AS [IsDisabledChb]
				,CASE WHEN ItemVal = 'approved' THEN 'true' ELSE 'false' END AS [IsDisabledBtnDel]
				FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item]
				WHERE [ItemGroup] = 'Onboarding' AND CAST( [DocID] AS NVARCHAR(36) ) = '@unid@'
			  FOR XML PATH('OnboardingData'), ROOT('OnboardingData'), TYPE )
	   FROM [LabProtocols].[dbo].[Ent_Lab_Document] WHERE CAST( [ID] AS NVARCHAR(36) ) = '@unid@'
			FOR XML PATH('Document'), ROOT('Document'), TYPE )
    END
    ELSE
	  BEGIN

			INSERT INTO @t_MySett
			SELECT [ProfileGroup]
				,[ProfileItem]
				,[ProfileItemVal]
			FROM [LabProtocols].[dbo].[Ent_UserProfile_New]
			WHERE [UserName] = '@DomainUserName@'
			AND [ProfileGroup] = 'LabProtocols'
          
      SET @VesselData = ( SELECT
			 (SELECT
        ( SELECT ISNULL([ProfileItemVal],'') FROM @t_MySett WHERE [ProfileItem] = 'Location' ) AS [Location]
				,( SELECT ISNULL([ProfileItemVal],'') FROM @t_MySett WHERE [ProfileItem] = 'DivCode' ) AS [DivCode]
				,@DateFiller AS [DocumentDate]
			 	,CASE WHEN @AccessList IS NULL THEN 'false' ELSE 'true' END AS [CanIEditDocument]
				 FOR XML PATH('Field'),ROOT('Field'), TYPE	)
        FOR XML PATH('Document'), ROOT('Document'), TYPE	)
    END

		SELECT [LabProtocols].dbo.qfn_XmlToJson_obj ((
			SELECT
				CAST('<Data>'
					+ ISNULL( CAST( @VesselData AS NVARCHAR(max) ), '' )
					+ ISNULL( CAST( @ListsData AS NVARCHAR(max) ), '' )
				+'</Data>'
				AS XML)
				FOR XML PATH(''), TYPE
			))
  END /* Document_Load */
	ELSE IF ( '@PARAM2@' = 'Document_Data' )
	BEGIN
	  IF ( '@PARAM3@' = 'Document_MultiData' )
	  BEGIN
		 SELECT
		  @count = CONVERT( INT, '@count@' )
		  ,@begin = CONVERT( INT,  '@begin@' )

		  INSERT INTO @t_NumTable 
		  SELECT [DocNum] 
		  FROM [LabProtocols].[dbo].[Ent_Lab_Document]
		  WHERE [BranchCode] IN ( SELECT nstr FROM [NKReports].[dbo].[Params_To_Table] (@AccessList, @delimiter) ) 
			ORDER BY/*анти*/[DocNum] desc, [Registered] desc OFFSET @count ROWS FETCH NEXT @begin ROWS ONLY
	  END
	  ELSE IF ( '@PARAM3@' = 'Document_SingleData' )
		BEGIN
 		  INSERT INTO @t_NumTable 
		  SELECT [DocNum] 
		  FROM [LabProtocols].[dbo].[Ent_Lab_Document]
		  WHERE [DocNum] = '@DocumentNum@'
	  END
		/*
	  ELSE IF ('@PARAM3@' = 'Document_NewBlockData')
	  BEGIN
		  INSERT INTO @t_NumTable 
		  SELECT [DocNum] 
		  FROM [LabProtocols].[dbo].[Ent_Lab_Document]
		  WHERE [BranchCode] in ( SELECT nstr FROM [NKReports].[dbo].[Params_To_Table] ( @AccessList, @delimiter) ) 
			AND [Registered] > ( SELECT [Registered] FROM [LabProtocols].[dbo].[Ent_Lab_Document] WHERE CAST([ID] AS nvarchar(50))='@FirstBlockID@' )
	  END
		*/
	  SELECT [LabProtocols].dbo.qfn_XmlToJson (( 
			SELECT ELD.[ID]
			  ,ELD.[DocNum]
      	,CONVERT( CHAR(10), ELD.[DocDate], 103 ) AS [DocumentDate]
			  ,ELD.[DocType] AS [DocumentType]
			  ,REPLACE( ELD.[DocDescribe], CHAR(10), '\n' ) AS [DocumentDescribe]
	 		  ,CONVERT( CHAR(10), ELD.[Registered], 104 ) + ' ' + CONVERT( CHAR(5), ELD.[Registered], 108 ) + ' ' + REPLACE(ELD.[RegisteredBy],'eame\','')  AS [RegInfo]
	  		,CONVERT( CHAR(10), ELD.[LastChanged], 104 ) + ' ' + CONVERT( CHAR(5), ELD.[LastChanged], 108 ) + ' ' + REPLACE(ELD.[LastChangedBy],'eame\','')  AS [LastChangeInfo]

		 	FROM @t_NumTable AS NT
			INNER JOIN [LabProtocols].[dbo].[Ent_Lab_Document] AS ELD
			  ON NT.[Num] = ELD.[DocNum]
		 	ORDER BY ELD.[DocNum] DESC, ELD.[Registered] DESC
		 FOR xml path('DocData'), type ))
	END
	/*Document_Data*/
	ELSE IF ('@PARAM2@' = 'Document_Save')
	BEGIN
		IF ( @CanIMakeAction = 'true' )
		BEGIN
	  	IF ('@DocumentDate@'<>'' AND '@DocumentDate@'<>'@'+'DocumentDate'+'@')
	  	BEGIN TRY 
				SET @DocumentDate = CONVERT(date,'@DocumentDate@', 103) 
			END TRY/**/
			BEGIN CATCH 
				SELECT char(10) + 'Дата документа некорректна' + char(13) SET @ErrorCount = @ErrorCount+1 
	  	END CATCH
			IF( '@Location@' <> '' AND '@Location@' <> '@'+'Location'+'@' AND '@DocumentType@' <> '' AND '@DocumentType@' <> '@'+'DocumentType'+'@' 
					AND '@DocumentDescribe@' <> '' AND '@DocumentDescribe@' <> '@'+'DocumentDescribe'+'@' )
			BEGIN
	  		IF ( ('@unid@' = '' or '@unid@' like '%unid%' )  AND ('@DocNum@' = '' or '@DocNum@' like '%DocNum%') )
	  		BEGIN
					SET @DocID = NEWID()
					SET @DocNum = NULL
					/*присвоить номер документа*/
					SET @tDocNum = (SELECT TOP 1 [LabCode] FROM [LabProtocols].[dbo].[Ent_Laboratories] WHERE [CityName] = '@Location@') 
					+ RTRIM( convert(NCHAR, YEAR( GETDATE() )-2000) )+'/RegN' +  + 'XXXX'
					SET @nLastNumID = (SELECT [Id] 
							FROM [LabProtocols].[dbo].[Ent_LastNum] 
							WHERE [DockType] = 'LabDocument' 
							AND [DockParam1] = YEAR( GETDATE() ) 
							AND [DockParam2] = ( SELECT TOP 1 [LabCode] FROM [LabProtocols].[dbo].[Ent_Laboratories] WHERE [CityName] = '@Location@' ) 
							AND [DockParam3] = 'RegN'
						  )
					IF ( @nLastNumID IS NULL ) 
					BEGIN
					SET @nLastNumID = NEWID()	
						INSERT INTO [LabProtocols].[dbo].[Ent_LastNum] Values 
						( @nLastNumID, 'LabDocument', YEAR( GETDATE() ), ( SELECT TOP 1 [LabCode] FROM [LabProtocols].[dbo].[Ent_Laboratories] WHERE [CityName] = '@Location@' ), 'RegN', 0 , 'Номер документа ' + @tDocNum ) 
					END
					SET @nDocNum = ( SELECT [LastNum] FROM [LabProtocols].[dbo].[Ent_LastNum] WHERE [Id] = @nLastNumID )
					SET @nDocNum=@nDocNum+1
	
					UPDATE [LabProtocols].[dbo].[Ent_LastNum] SET [LastNum] = @nDocNum WHERE [Id] = @nLastNumID
					SET @tDocNum = Replace(@tDocNum,'XXXX',CASE WHEN @nDocNum<10 THEN '000' WHEN @nDocNum<100 THEN '00' WHEN @nDocNum<1000 THEN '0' ELSE '' END+rtrim(convert(nchar,@nDocNum)))
					SET @DocNum = @tDocNum

					INSERT INTO @MyRefCodeTable
						SELECT TOP 1 a.[Code], b.[Name], b.[Code] 
						FROM [RUWS002].[AllVostok].[dbo].[Ref_Location] AS a
						JOIN [RUWS002].[AllVostok].[dbo].[Ent_Branch] AS b
						ON a.[IdBranch] = b.[Id]
						WHERE a.[Name] = '@Location@'

					INSERT  /*POST SERVICE LAB DocumentBackend @PARAM2@, @UserName@, @GetDate@*/ INTO [LabProtocols].[dbo].[Ent_Lab_Document]
					([ID]
					,[DocNum]
					,[DocDate]
					,[DocType]
					,[DocDescribe]
					,[Branch]
					,[BranchCode]
					,[Location]
					,[LocationCode]
					,[Division]
					,[DivCode]
					,[Registered]
					,[RegisteredBy]
					,[LastChanged]
					,[LastChangedBy]
					)
					VALUES (
					@DocID
					,@DocNum
					,@DocumentDate
					,'@DocumentType@'
					,LTRIM(RTRIM('@DocumentDescribe@'))
					,( SELECT [BranchName] FROM @MyRefCodeTable )
					,( SELECT [BranchCode] FROM @MyRefCodeTable )						  
					,'@Location@'
					,( SELECT [LocationCode] FROM @MyRefCodeTable )				  
					,( SELECT DISTINCT [Division] FROM [RUWS002].[Staff].[dbo].[Ref_Segment] WHERE [Name] = '@DivCode@' )
					,'@DivCode@'
					,GETDATE()
					,'@DomainUserName@'
					,GETDATE()
					,'@DomainUserName@'
					)
					SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj (( 
							SELECT @DocID AS [unid]
								,@DocNum AS [DocNum]
								,CONVERT( CHAR(10), [Registered], 104 ) + ' ' + CONVERT( CHAR(5), [Registered], 108 ) + ' ' + [RegisteredBy] AS [RegInfo]
								,CONVERT( CHAR(10), [LastChanged], 104 ) + ' ' + CONVERT( CHAR(5), [LastChanged], 108 ) + ' ' + [LastChangedBy] AS [LastChangeInfo]
								FROM [LabProtocols].[dbo].[Ent_Lab_Document] WHERE ID = @DocID																							  
					FOR XML PATH(''), ROOT ))
	  		END
	  		ELSE
	  		BEGIN
					SET @DocID = '@unid@'
					UPDATE /*POST SERVICE LAB DocumentBackend @PARAM2@, @UserName@, @GetDate@*/ [LabProtocols].[dbo].[Ent_Lab_Document]
						SET [DocDate] = @DocumentDate
						,[DocType] = '@DocumentType@'
						,[DocDescribe] = LTRIM( RTRIM( '@DocumentDescribe@' ) )
						,[Division] = ( SELECT DISTINCT [Division] FROM [RUWS002].[Staff].[dbo].[Ref_Segment] WHERE [Name] = '@DivCode@' )
						,[DivCode] = '@DivCode@'
						,[LastChanged] = GETDATE()
						,[LastChangedBy] = '@DomainUserName@'
						WHERE CAST( [ID] AS nvarchar(50) ) = '@unid@'
																																
					SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj (( 
							SELECT [ID] AS [unid]
								,[DocNum]
								,CONVERT( CHAR(10), [LastChanged], 104 ) + ' ' + CONVERT( CHAR(5), [LastChanged],108 ) + ' ' + [LastChangedBy] AS [LastChangeInfo]
							FROM [LabProtocols].[dbo].[Ent_Lab_Document] WHERE ID = @DocID																							   
					FOR xml path(''), root ))
				END
	  		SET @x = ( SELECT [Item] FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] 
					WHERE [DocID] = @DocID AND [ItemGroup] = 'regInfo' AND [Item] ='Note' )
				IF ( @x IS NULL AND '@Note@' <>'' AND '@Note@' <> '@'+'Note'+'@' )
				BEGIN
				SET @DocItemID  = newid()
					INSERT INTO /*POST SERVICE LAB DocumentBackend @PARAM2@, @UserName@, @GetDate@*/ [LabProtocols].[dbo].[Ent_Lab_Document_Item]
					( [ID]
						,[DocID]
						,[ItemGroup]
						,[Item]
						,[ItemVal]
						,[Registered]
						,[RegisteredBy]
						,[LastChanged]
						,[LastChangedBy] )
					VALUES 
					(@DocItemID
					,@DocID
					,'regInfo'
					,'Note'
					,ltrim(rtrim('@Note@'))
					,GETDATE()
					,'@DomainUserName@'
					,GETDATE()
					,'@DomainUserName@')
				END
				ELSE
				BEGIN
				UPDATE /*POST SERVICE LAB DocumentBackend @PARAM2@, @UserName@, @GetDate@*/ [LabProtocols].[dbo].[Ent_Lab_Document_Item]
				SET
					[ItemVal] = LTRIM( RTRIM( '@Note@' ) )
					,[LastChanged] = GETDATE()
					,[LastChangedBy] = '@DomainUserName@'
				WHERE [DocID] = @DocID AND [ItemGroup] = 'regInfo' AND [Item] = 'Note'
				END
			END
			ELSE
			BEGIN
				SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj (( SELECT 'Не все обязательные поля заполнены. Прогресс не сохранен.' FOR XML PATH ('ErrorMsg'),ROOT, TYPE ))
			END/*filed check*/
		END/*BranchCodeCheck end*/
		ELSE
		BEGIN
			SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj (( SELECT 'К сожалению, у вас недостаточно прав для внесения изменений в информацию о документе. ' FOR XML PATH ('ErrorMsg'), ROOT, TYPE ))
		END/*filed check*/
	END
	/* Document_Save */
	ELSE IF ( '@PARAM2@' = 'Document_Signer_Change' )
	BEGIN
		IF ( @CanIMakeAction = 'true' )
		BEGIN
			IF ('@PARAM3@' = 'Document_Signer_Add')
			BEGIN
				IF ( '@unid@'<>'@'+'unid'+'@' AND '@unid@' <>'')
				BEGIN
					SET @DocItemID = NEWID()
					INSERT INTO /*POST SERVICE LAB DocumentBackendd @PARAM2@ @UserName@, @GetDate@*/ [LabProtocols].[dbo].[Ent_Lab_Document_Item]
					([ID]
					,[DocID]
					,[ItemGroup]
					,[Item]
					,[ItemVal]
					,[Registered]
					,[RegisteredBy]
					,[LastChanged]
					,[LastChangedBy]
					)
					VALUES(
						@DocItemID
					,'@unid@'
					,'Signer'
					,'@EmployeeName@'
					,NULL
					,GETDATE()
					,'@DomainUserName@'
					,GETDATE()
					,'@DomainUserName@'
					)
					SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj (( 
						SELECT 
							@DocItemID AS [ID]
							,'@EmployeeName@' AS [SignerName]
							,'false' AS [onAction]
							,CONVERT( CHAR(10), [Registered], 104 ) + ' ' + CONVERT( CHAR(5), [Registered], 108 ) + ' ' + [RegisteredBy] AS [AddBy]
						FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item]
						WHERE [ID] = @DocItemID
					FOR XML PATH('SignerData'), TYPE))
				END
				/*unid check end*/
			END
			/* Document_Signer_Add */
			ELSE IF ( '@PARAM3@' = 'Document_Signer_Delete' )
			BEGIN
				IF ( '@SignerID@' <>'' AND '@SignerID@' <> '@'+'SignerID'+'@' )
				BEGIN
					DELETE FROM /*POST SERVICE LAB DocumentBackend @PARAM2@ @UserName@, @GetDate@*/ [LabProtocols].[dbo].[Ent_Lab_Document_Item] 
					WHERE CAST( [ID] AS nvarchar(36) ) = '@SignerID@'
				END
				/* SignerID */
			END
			/* Document_Signer_Delete */
		END
		ELSE
		BEGIN
			SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj ((  SELECT 'К сожалению, у вас недостаточно прав для операций с подписантами. ' FOR XML PATH ('ErrorMsg'),ROOT,TYPE ))
		END
		/* Right check */
	END
	/* Document_Signer_Change */
	/* MEMO: After uploading get all files */
	ELSE IF ( '@PARAM2@' = 'Document_UploadingFile_Load' )
	BEGIN
	  SELECT [LabProtocols].dbo.qfn_XmlToJson ((
		SELECT /*POST SERVICE LAB DocumentBackend @PARAM2@, @UserName@, @GetDate@*/  [Id] AS [DocFileId]
		,[FileName]
		,convert( char(10),[UploadedOn],103 ) + ' ' + convert( char(5),[UploadedOn],108 ) + ' ' + [UploadedBy] AS [UploadedInfo]
		,'false' AS [onAction]
		,'./FileDownload.ashx?Id='+CAST( [Id] AS nvarchar(36) ) AS [linkToDoc]
		FROM [NKReports].[dbo].[DB_Settings_UploadedFiles] WHERE [IdParent] IN 
		( SELECT CAST([Item] as uniqueidentifier) FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] WHERE [DocID] = '@unid@' AND [ItemGroup]='UploadedFile' ) FOR XML PATH('DocFile'), TYPE
	  ))
	END
	/* Document_UploadingFile_Load */
	ELSE IF ( '@PARAM2@' = 'Document_UploadingFile_Change' )
	BEGIN
	  IF ( @CanIMakeAction = 'true' )
	  BEGIN
			IF ( '@PARAM3@' = 'Document_UploadingFile_Delete' )
			BEGIN
				SET @DocItemID = (SELECT [IdParent] FROM [NKReports].[dbo].[DB_Settings_UploadedFiles] WHERE  CAST( [Id] AS nvarchar(36) ) = '@FileID@' )
				DELETE FROM /*POST SERVICE LAB DocumentBackend @PARAM2@ @UserName@, @GetDate@*/ [LabProtocols].[dbo].[Ent_Lab_Document_Item] 
					WHERE [ItemGroup] = 'UploadedFile' AND [Item] = CAST( @DocItemID as nvarchar(36) ) AND [DocID] = '@unid@'
				DELETE FROM /*POST SERVICE LAB DocumentBackend @PARAM2@ @UserName@, @GetDate@*/ [NKReports].[dbo].[DB_Settings_UploadedFiles] WHERE [IdParent] = @DocItemID 
	  	END
		END
	  ELSE
	  BEGIN
		  SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj ((  SELECT 'Нарушение прав доступа, операции с документами недоступны' FOR XML PATH ('ErrorMsg'),ROOT,TYPE ))
	  END
		/* Document_UploadingFile_Delete */
	END
	/* Document_UploadingFile_Change */
	ELSE IF ( '@PARAM2@' = 'Document_Onboarding_Change' )
	BEGIN
		IF ( @CanIMakeAction = 'true' )
		BEGIN
			IF ( '@PARAM3@' = 'Document_Onboarding_Add' )
			BEGIN
				SET @CompareUserName = ( SELECT [Item] FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] 
																	WHERE [ItemGroup] = 'Onboarding' AND [Item] = '@EmployeeName@' AND CAST( [DocID] AS NVARCHAR(36) ) = '@unid@' )
				/* MEMO: Backend проверка, что добавляемого нет в документе */

				IF ( @CompareUserName IS NULL )
				BEGIN
					SET @DocItemID = NEWID() 
					INSERT INTO /*POST SERVICE LAB DocumentBackendd @PARAM2@ @UserName@, @GetDate@*/ [LabProtocols].[dbo].[Ent_Lab_Document_Item]
					( [ID], [DocID], [ItemGroup], [Item], [ItemVal], [Registered], [RegisteredBy], [LastChanged], [LastChangedBy])
					VALUES( @DocItemID, '@unid@', 'Onboarding', '@EmployeeName@', 'pendingApproveByUser', GETDATE(), '@DomainUserName@', GETDATE(), '@DomainUserName@' )

					SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj ((
						SELECT /*POST SERVICE LAB DocumentBackend @PARAM2@ @UserName@, @GetDate@*/  [ID]
						,[Item] AS [PersonName]
						,[ItemVal] AS [OnboardingState]
						,'false' AS [onAction]
						,CASE WHEN ItemVal = 'approved' THEN CONVERT( CHAR(10), [LastChanged], 104 ) + ' ' + CONVERT( CHAR(5), [LastChanged], 108 ) + ' ' + [LastChangedBy] ELSE '' END AS LastChanged
						,CASE WHEN '@UserName@' <> [Item] OR ItemVal = 'approved' THEN 'true' ELSE 'false' END  AS [IsDisabledChb]
						,CASE WHEN ItemVal = 'approved' THEN 'true' ELSE 'false' END  AS [IsDisabledBtnDel]
						FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item]
						WHERE [ItemGroup] = 'Onboarding' AND CAST( [ID] AS nvarchar(50) ) = @DocItemID 
					FOR xml path('OnboardingData'), type 
					))
						/*
						* Оповещалка.
						* Если один из элементов в запросе NULL, то вся ячейка зануляется. 
						* CASE обязательно
						*/

						SET @EmployeeMailFixed = '@replaceChar64@'
						SET @DocType = ( SELECT [DocType] FROM [LabProtocols].[dbo].[Ent_Lab_Document] WHERE [ID] = '@unid@' ) 
						SET @MailDocNum = ( SELECT [DocNum] FROM [LabProtocols].[dbo].[Ent_Lab_Document] WHERE [ID] = '@unid@' )
						SET @DocDescribe = ( SELECT [DocDescribe] FROM [LabProtocols].[dbo].[Ent_Lab_Document] WHERE [ID] = '@unid@' ) 		

						SET @SubjectDocType = ISNULL(@DocType,'')
						SET @MailDocNum = (CASE WHEN @MailDocNum IS NULL THEN '' ELSE '<span>Регистрационный номер: ' + @MailDocNum+' от '+ ( SELECT convert(char(10), [DocDate], 103) FROM [LabProtocols].[dbo].[Ent_Lab_Document] WHERE [ID]='@unid@' )+'</span><br>' END)	
						SET @DocType = ( CASE WHEN @DocType IS NULL THEN '' ELSE  '<span>Вид документа: '+ @DocType + '</span><br>' END )	
						SET @DocDescribe = ( CASE WHEN @DocDescribe IS NULL THEN '' ELSE '<span>Краткое содержание документа: '+@DocDescribe+'</span><br>' END )

						SET @SignerList = ( SELECT [Item] AS li FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] WHERE [ItemGroup] = 'Signer' AND [DocID] = '@unid@' for xml RAW(''), ROOT('ul'), ELEMENTS, TYPE )

						SET @Link = '@Req_SERVER_NAME@'+'/NKReports/Default?Id=4a3ad22f-32cd-4bfd-b72a-88e3a44824e3&unid='+'@unid@'
						IF ( @EmployeeMailFixed IS NOT NULL AND @SubjectDocType IS NOT NULL AND @MailDocNum IS NOT NULL 
								AND @DocType IS NOT NULL AND @DocDescribe IS NOT NULL AND @SignerList IS NOT NULL AND @Link IS NOT NULL )
						BEGIN
							INSERT INTO /*POST SERVICE ORDER (test) OrderInfo_Backend @PARAM2@ @UserName@, @GetDate@*/ [RUWS002].[AllVostok].[dbo].[DB_Settings_SendMail]
							([id],
							[applicationid],
							[from],
							[to],
							[cc],
							[subject],
							[body],
							[retries],
							[Attachments],
							[issent],
							[iserror],
							[isworking],
							[isdone])
							VALUES      
							(NEWID()
							,'LabOrder'
							,'@UserEmail@'
							,@EmployeeMailFixed
							,''
							,'LabDocuments - ' + @SubjectDocType
							,'<span>Вам необходимо ознакомиться со следующим зарегистрированным документом</span><br>'+
								@MailDocNum + @DocType + @DocDescribe +
								'<span>Подписанты: </span><br>'+
								CAST( @SignerList AS NVARCHAR(MAX) ) +
								'Ознакомление по '+'<a href="'+@Link+'">ссылке</a></span>'
							,'2'
							,''
							,'False'
							,'False'
							,'False'
							,'False' );
						END
						/* Check all field as not null */
				END
				/* CompareUserName */
			END
			/* OrderInfo_Onboarding_Add */
			ELSE IF ( '@PARAM3@' = 'Document_Onboarding_UpdateState' )
			BEGIN
				IF ( '@OnboardingID@' <> '' AND '@OnboardingID@' <> '@'+'OnboardingID'+'@' )
				BEGIN
					SET @CompareUserName = (SELECT Item FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] WHERE [ItemGroup]='Onboarding' AND CAST( [ID] AS NVARCHAR(50) ) = '@OnboardingID@' )
					IF ( @CompareUserName = '@UserName@' )
					BEGIN
						SET @DocItemID = '@OnboardingID@'
						SET @CurrentState = ( SELECT ItemVal FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] WHERE [ItemGroup]='Onboarding' AND CAST( [ID] AS NVARCHAR(50) ) = @DocItemID )

						UPDATE /*POST SERVICE LAB DocumentBackend @PARAM2@ @UserName@, @GetDate@*/  [LabProtocols].[dbo].[Ent_Lab_Document_Item] SET
							[ItemVal] = CASE WHEN @CurrentState = 'pendingApproveByUser' THEN 'approved' ELSE 'pendingApproveByUser' END
							,[LastChanged] = GETDATE()
							,[LastChangedBy] = '@DomainUserName@'
						WHERE CAST( [ID] AS NVARCHAR(36) ) = @DocItemID

						SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj ((
							SELECT /*POST SERVICE LAB DocumentBackendd @PARAM2@ @UserName@, @GetDate@*/ [ID]
								,[Item] AS [PersonName]
								,[ItemVal] AS [OnboardingState]
								,'false' AS [onAction]
								,CASE WHEN ItemVal ='approved' THEN CONVERT( CHAR(10), [LastChanged], 104 ) + ' ' + CONVERT( CHAR(5), [LastChanged], 108 ) + ' ' + [LastChangedBy] ELSE '' END AS LastChanged
								,CASE WHEN '@UserName@' <> [Item] OR ItemVal = 'approved' THEN 'true' ELSE 'false' END AS [IsDisabledChb]
								,CASE WHEN ItemVal = 'approved' THEN 'true' ELSE 'false' END AS [IsDisabledBtnDel]
								FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item]
								WHERE [ItemGroup] = 'Onboarding' AND CAST( [ID] AS NVARCHAR(50) ) = @DocItemID 
							FOR XML PATH('OnboardingData'), TYPE 
						))
					
					END
					/* CompareUserName */
				END
				/* OnboardingID */
			END
			/* Document_Onboarding_UpdateState */
			ELSE IF ( '@PARAM3@' = 'Document_Onboarding_Delete' )
			BEGIN
				IF ( '@OnboardingID@' <>'' AND '@OnboardingID@' <> '@'+'OnboardingID'+'@' )
				BEGIN
					SET @DocItemID = '@OnboardingID@'
					SET @CurrentState = ( SELECT ItemVal FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] WHERE [ItemGroup] = 'Onboarding' AND CAST( [ID] AS NVARCHAR(36) ) = @DocItemID )
					/* MEMO: Backend проверка, что удаляемый не с отметкой */   
					IF ( @CurrentState <> 'approved' )
					BEGIN
						DELETE FROM /*POST SERVICE ORDER (test) OrderInfo_Backend @PARAM2@ @UserName@, @GetDate@*/ [LabProtocols].[dbo].[Ent_Lab_Document_Item] 
						WHERE CAST( [ID] AS NVARCHAR(36) ) = @DocItemID
					END
					/* CurrentState */
					ELSE
					BEGIN
						SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj ((  SELECT 'Нарушение прав доступа, проверяющий не удалён' FOR XML PATH ('ErrorMsg'),ROOT,TYPE ))
					END
				END
				/* OnboardingID */
			END 
		END
		ELSE
		BEGIN
			SELECT [LabProtocols].dbo.qfn_XmlToJson_Obj (( SELECT 'К сожалению, у вас недостаточно прав для внесения изменений в этот раздел. ' FOR XML PATH ('ErrorMsg'), ROOT, TYPE ))
		END
		/* Document_Onboarding_Delete */
	END 
	/* Document_Onboarding_Change */
END
/* Document */