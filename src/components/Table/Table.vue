<template>
  <section>
    <div 
      id="DocTable" 
      class="tbl-container" 
      @scroll="infiniteScroll($event)">
      <div class="tbl-row tbl-header"> 
        <div class="tbl-block">Номер</div>
        <div class="tbl-block tbl-block_sm">Дата</div>
        <div class="tbl-block tbl-block_huge">Вид</div>
        <div class="tbl-block tbl-block_lg">Содержание</div>
        <div class="tbl-block tbl-block_huge">Регистрация</div>
        <div class="tbl-block tbl-block_huge">Изменения</div>
        <div 
          class="liftUp" 
          style="display: block;">
          <div 
            id="liftUpImg" 
            onclick="$(window).scrollTop(0)"/>
        </div>
      </div> <!-- protocolTableHeaderRow -->
      <div
        v-for="document in documents" 
        :key="document.id"
        :id="document.id"
        class="tbl-row"
      >  
        <div class="tbl-block">
          <a 
            class="myLink nowrapWhiteSpace"
            href="#"
            @click="fieldFiller( document.id ); return false;"> {{ document.DocNum }} </a>
        </div>
        <div class="tbl-block tbl-block_sm"> {{ document.DocumentDate }} </div>	 
        <div class="tbl-block tbl-block_huge tbl-noCenter"> {{ document.DocumentType }} </div>
        <div class="tbl-block tbl-block_lg tbl-noCenter"> {{ document.DocumentDescribe }} </div>
        <div class="tbl-block tbl-block_huge"> {{ document.RegInfo }} </div>
        <div class="tbl-block tbl-block_huge">{{ document.LastChangeInfo }} </div>
      </div> <!-- .tbl-row -->
      <div v-if="loading">
        <lds-loader :external="'centered'"/>  
      </div>
      <div
        v-show="allElemIsLoadNow"
        class="tbl-footer">
        <p class="important">Кажется, больше ничего нет </p>
      </div> 
    </div>
  </section>
</template>

<script>
import { CONST_COUNT, CONST_BEGIN } from '../../scripts/shared';

  export default {
    name: 'TableMain',
    components: {
      'lds-loader':  () => import( './../LDSLoaded' ),
    },
    computed: {
      documents() {
        if ( this.$store.getters.GET_DOCUMENTS.length !== 0 ) {
          let _tmpArr=[];
            let _arr = this.$store.getters.GET_DOCUMENTS;
          for ( let index = 0; index < _arr.length; index++ ) {
           _tmpArr.push( _arr[index].Document.Field );
          }
          return _tmpArr;
        }
      },
      loading(){
        return this.$store.getters.isTableLoading;
      },
      allElemIsLoadNow(){
        return this.$store.getters.IsAllElemIsLoadNow;
      },
    },
    created() {
      this.count = CONST_COUNT;
      this.begin = CONST_BEGIN;      
      this.load( this.count, this.begin, 'Document_MultiData' );
      window.addEventListener( 'scroll', this.onScroll );
    },
    methods :{
      onScroll: function() {
        let self = this;
        let scrollHeight = window.scrollY;
        let maxHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (
          scrollHeight >= maxHeight - 200 &&
          !self.loading &&
          !self.allElemIsLoadNow
        ) {
          self.count = self.count + self.begin;
          self.begin = self.begin;
          self.load( self.count, self.begin, 'Document_MultiData' );
        }
    },
    load( count, begin, blockType ) {
      let dataAjax = {
        PARAM: 'Document',
        PARAM2: 'Document_Data',
        PARAM3: blockType,
        count: count,
        begin: begin
      };
      this.$store.dispatch( 'LOAD_DOCUMENTS', dataAjax );
    },
      fieldFiller ( docID ) {
        this.$store.dispatch( 'LOAD_DOCUMENT_INFO', docID );
      }
    }
  };
</script>