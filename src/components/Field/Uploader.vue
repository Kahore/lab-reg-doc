<template>
  <div>
    <h2>Вложения</h2>
    <div
      class="field-row">
      <div class="field-block_full">
        <div class="field-block__wrapper">
          <input 
            type="file"
            name="documentFile"
            class="fileUpload field-block__wrapper_item"><br>
          <input 
            class="button"
            type="button"
            name="load__btnDeleteFile"
            value="Загрузить файл"
            @click="addMeFile()">
        </div>
      </div>
      <!-- .field-block -->
      <div class="field-block"/>
      <div class="field-block"/>
    </div>
    <!-- .field-row -->
    <div class="field-row">
      <h3>Загруженные файлы</h3>
      <div class="tbl-container">
        <div class="tbl-header">
          <div class="tbl-3Block">Наименование документа</div>
          <div class="tbl-3Block">Загружен</div>
          <div class="tbl-3Block">Удалить</div>
        </div>
        <div 
          v-for="(dataFile, index) in DataFiles"
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
              <span class="awaitWhenLoad">SomeText</span>
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
    name: 'FieldUpload'
  };
</script>