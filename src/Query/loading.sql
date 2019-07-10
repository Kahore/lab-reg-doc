   DECLARE @ListsData XML;
DECLARE @VesselData XML;

DECLARE @AccessList nvarchar(max);
DECLARE @delimiter nvarchar(50);

     SET @AccessList =(SELECT [AccessQuery] FROM [NKReports].[dbo].[DB_Settings_ACL] WHERE [UserName]='rucoalsu' AND [TableName]='LabVesselMonitoring')
  SET @delimiter  = ','

    SET @ListsData =
	
  (SELECT
	  (SELECT [Item]+';' FROM [LabProtocols].[dbo].[Ent_Type_List] WHERE [GroupTypeEng] ='DocumentTypeName' ORDER BY [Item] ASC for xml path('') ) as DocumentTypes
	
      ,(SELECT [CityName] +';'
      FROM [LabProtocols].[dbo].[Ent_Laboratories]
      WHERE (select count(nstr)
      from [NKreports].[dbo].[Params_to_table](@AccessList, @delimiter)
      where nstr=[LabCode])>0
      ORDER BY [CityName]
      for xml path('') ) as Locations
      , (SELECT /*[Name] +';'  FROM @t  for xml path('') */ 'div1;div2;div3') as DivCodes
    FOR XML PATH ('RegInfo'), TYPE,root('ListData')
      )

SET @VesselData  = NULL;

	    SELECT [LabProtocols].dbo.qfn_XmlToJson ((

SELECT
      CAST('<Data>'
		  +CASE WHEN CAST(@VesselData AS nvarchar(max)) IS NOT NULL THEN CAST(@VesselData AS nvarchar(max))/**/ELSE '' END
		  +CASE WHEN CAST(@ListsData AS nvarchar(max)) IS NOT NULL THEN CAST(@ListsData AS nvarchar(max))/**/ELSE '' END
		+'</Data>'  
	  AS/**/XML)
    FOR XML path(''), type																								
	))
  
  IF ( '@PARAM2@' = 'OrderInfo_UploadingFile_Load' )
BEGIN
	SELECT [LabProtocols].dbo.qfn_XmlToJson ((
	SELECT /*POST SERVICE LAB DocumentBackend @PARAM2@, @UserName@, @GetDate@*/ [Id] AS [DocFileId]
	, [FileName]
	, convert( char(10),[UploadedOn],104 ) + ' ' + convert( char(10),[UploadedOn],108 ) + ' ' + [UploadedBy] AS [UploadedInfo]
	, 'false' AS [onAction]
	, './FileDownload.ashx?Id='+CAST( [Id] AS nvarchar(36) ) AS [linkToDoc]
			FROM [NKReports].[dbo].[DB_Settings_UploadedFiles] WHERE [IdParent] IN 
				( SELECT CAST([Item] as uniqueidentifier) FROM [LabProtocols].[dbo].[Ent_Lab_Document_Item] WHERE [DocID] ='@unid@' AND [ItemGroup]='UploadedFile' ) 
        FOR xml path('DocFile'),root('DocFileData'), type
  ))
END