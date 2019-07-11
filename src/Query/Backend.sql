DECLARE @ListsData XML;
DECLARE @VesselData XML;

DECLARE @AccessList NVARCHAR(max);
DECLARE @delimiter NVARCHAR(50);
DECLARE @BranchCodeCheck NVARCHAR(50);
DECLARE @CanIMakeAction NVARCHAR(10);

DECLARE @DateFiller NCHAR(10);

DECLARE @count INT;
DECLARE @begin INT;

DECLARE @t_DivCode TABLE ( [Name] NVARCHAR(MAX) );
DECLARE @t_MySett TABLE ( [ProfileGroup] NVARCHAR(250), [ProfileItem] NVARCHAR(250), [ProfileItemVal] NVARCHAR(250) );
DECLARE @t_NumTable TABLE ( [Num] NVARCHAR(50) );

DECLARE @UserId UNIQUEIDENTIFIER;

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
		  [ID]
		  ,[DocNum]
		  ,CONVERT( CHAR(10), [DocDate], 103 ) AS [DocumentDate]
		  ,[DocType]
		  ,REPLACE( [DocDescribe], CHAR(10), '\n' ) AS [DocDescribe]
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
        FOR XML PATH('DocFile'), ROOT('DocFileData'), TYPE )
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
      SET @UserId= ( SELECT TOP 1 [Id] FROM [LabProtocols].[dbo].[Ent_UserProfile_New] WHERE [UserName] = '@DomainUserName@' ) 

			INSERT INTO @t_MySett
			SELECT [ProfileGroup]
				,[ProfileItem]
				,[ProfileItemVal]
			FROM [LabProtocols].[dbo].[Ent_UserProfile_New]
			WHERE [UserName] = '@DomainUserName@'
			AND [ProfileGroup] = 'LabProtocols'
          
      SET @VesselData = ( SELECT
        ( SELECT ISNULL([ProfileItemVal],'') FROM @t_MySett WHERE [ProfileItem] = 'Location' ) AS [Location]
				,( SELECT ISNULL([ProfileItemVal],'') FROM @t_MySett WHERE [ProfileItem] = 'DivCode' ) AS [DivCode]
				,@DateFiller AS [DocumentDate]
			 	,CASE WHEN @AccessList IS NULL THEN 'false' ELSE 'true' END AS [CanIEditDocument]
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
			  ,ELD.[DocType]
			  ,REPLACE( ELD.[DocDescribe], CHAR(10), '\n' ) AS [DocDescribe]
	 		  ,CONVERT( CHAR(10), ELD.[Registered], 104 ) + ' ' + CONVERT( CHAR(5), ELD.[Registered], 108 ) + ' ' + ELD.[RegisteredBy] AS [RegInfo]
	  		,CONVERT( CHAR(10), ELD.[LastChanged], 104 ) + ' ' + CONVERT( CHAR(5), ELD.[LastChanged], 108 ) + ' ' + ELD.[LastChangedBy] AS [LastChangeInfo]

		 	FROM @t_NumTable AS NT
			INNER JOIN [LabProtocols].[dbo].[Ent_Lab_Document] AS ELD
			  ON NT.[Num] = ELD.[DocNum]
		 	ORDER BY ELD.[DocNum] DESC, ELD.[Registered] DESC
		 FOR xml path('DocData'), type ))
	END
	/*Document_Data*/
END
/* Document */