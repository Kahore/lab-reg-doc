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
        :key="document.ID"
        :id="document.ID"
        class="tbl-row"
      >  
        <div class="tbl-block">
          <a 
            class="myLink nowrapWhiteSpace"
            href="#" 
            @click="fieldFillerVM( document.ID ); return false;"> {{ document.DocNum }} </a>
        </div>
        <div class="tbl-block tbl-block_sm"> {{ document.DocumentDate }} </div>	 
        <div class="tbl-block tbl-block_huge"> {{ document.DocType }} </div>
        <div class="tbl-block tbl-block_lg"> {{ document.DocDescribe }} </div>
        <div class="tbl-block tbl-block_huge"> {{ document.RegInfo }} </div>
        <div class="tbl-block tbl-block_huge">{{ document.LastChangeInfo }} </div>
      </div> <!-- .tbl-row -->
      <div 
        v-show="loading"
        id="myAwaitLoad"
        class="awaitLoad"> Some text </div>
      <div
        v-show="allElemIsLoadNow"
        id="myFooter" 
        class="myFooter"> Кажется, больше ничего нет </div> 
    </div>
  </section>
</template>

<script>
  export default {
    name: 'TableMain',
    computed: {
      documents() {
        if ( this.$store.getters.GET_DOCUMENTS.length !== 0 ) {
          return this.$store.getters.GET_DOCUMENTS;
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
      this.$store.dispatch( 'LOAD_DOCUMENTS' );
    },
  };
</script>