<template>
  <div>
    <h2>Вложения</h2>
    <div
      v-if="editable" 
      class="field-row">
      <div class="field-block_full">
        <div class="field-block__wrapper">
          <input 
            type="file"
            name="documentFile"
            multiple="multiple"
            class="fileUpload field-block__wrapper_item"><br>
          <input 
            class="button"
            type="button"
            name="load__btnDeleteFile"
            value="Загрузить файл"
            @click="uploadFile()">
        </div>
      </div>
      <!-- .field-block -->
      <div class="field-block"/>
      <div class="field-block"/>
    </div>
    <!-- .field-row -->
    <div 
      v-show="isFilesInDocument"
      class="field-row">
      <h3>Загруженные файлы</h3>
      <div class="tbl-container">
        <div class="tbl-header">
          <div class="tbl-3Block">Наименование документа</div>
          <div class="tbl-3Block">Загружен</div>
          <div class="tbl-3Block">Удалить</div>
        </div>
        <div 
          v-for="(dataFile, index) in dataFiles"
          :key="index"
          class="tbl-row">
          <div class="tbl-3Block tbl-noCenterBlock">
            <a 
              :href="dataFile.linkToDoc"
              class="myLink nowrapWhiteSpace"> {{ dataFile.FileName }} </a>
          </div>
          <div 
            class="tbl-3Block"
            v-text="dataFile.UploadedInfo"/>
          <div class="tbl-3Block ">
            <template v-if="dataFile.onAction==='true'">
              <lds-loader/>
            </template>
            <template v-else>
              <input 
                :disabled="dataFile.IsDisabledBtnDel === 'true' "
                :id="dataFile.DocFileId" 
                class="button" 
                type="button" 
                name="load__btnDeleteFile" 
                value="Х"
                title="Удалить" 
                @click="delDataFile($event)">
            </template>
          </div> 
        </div>
      </div><!--ContainerForTbl -->

    </div><!--fieldRow -->
  </div>
</template>

<script>
  export default {
    name: 'FieldUpload',
    components: {
      'lds-loader':  () => import( './../LDSLoaded' ),
    },
    props: {
      dataFiles: {
        type: Array,
        default: () => [],
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      isFilesInDocument () {
        if ( typeof this.dataFiles !== 'undefined' ) {
          if ( this.dataFiles.length !== 0 ) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
  methods: {
    uploadFile() {
      this.$store.commit( 'CLEAR_ERROR' );
      const filesCollection = document.querySelector( 'input[type=file]' ).files;
      if ( filesCollection.length !== 0 ) {
        let documentId = this.$store.getters.getCurrentUnid;
        let _index;
        let uploadedFiles = this.$store.getters.GET_DataFiles;
        for ( let i = 0; i < filesCollection.length; i++ ) {
          if ( uploadedFiles.length !== 0 ) {
            _index = uploadedFiles.findIndex(
              function( block ) {
                return (
                  block.FileName === filesCollection[i].name
                );
              }
            );
          } else {
            _index = -1;
          }
          if ( _index === -1 ) {
            try {
              let formData = new FormData();
              formData.append(
                'documentFile',
                filesCollection[i]
              );
              formData.append( 'PARAM', 'Document' );
              formData.append( 'PARAM2', 'Document_UploadingFile_Change' );
              formData.append( 'unid', documentId );
              formData.append( 'PARAM3', 'Document_UploadingFile_Upload' );
              formData.append( 'Id', '@Nav_Backend@' );
              this.$store
                .dispatch( 'MUTATE_FILE_UPLOAD', formData )
                .then( () => {
                  this.$store.dispatch( 'MUTATE_FILE_LOADNEW', documentId );
                } );
            } catch ( e ) {
              this.$store.commit( 'SET_ERROR', 'Произошла ошибка ' + e );
            }
          } else {
            this.$store.commit(
              'SET_ERROR',
              filesCollection[i].name + ' уже загружен.'
            );
          }
        } /* ENDOF for*/
      filesCollection.value = '';
      } else {
        this.$store.commit( 'SET_INFO', 'Нет файлов для загрузки' );
      }
    },
    delDataFile( e ) {
      this.$store.commit( 'CLEAR_ERROR' );
      let documentId = this.$store.getters.getCurrentUnid;
      this.$store.dispatch( 'MUTATE_FILE_DELETE', {
        id: e.target.id,
        documentId
      } );
    }
  },
  };
</script>