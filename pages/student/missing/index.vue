<template>
  <div>
    <v-card >
    <div class="cv_header padding-top-mn" >การแจ้งหาย</div>


    <v-flex xs12 class="paddign" >
      <p>ประเภทของที่หาย </p>
        <v-radio-group v-model="type" :mandatory="false" row >
          <v-radio label="พาหนะ" color="success" value="pk_machine" active></v-radio>
          <v-radio label="อุปกรณ์" color="success" value="pk_accessories"></v-radio>
        </v-radio-group>
    </v-flex>


  <v-data-table
      :headers="headers"
      :items="missing"
      :search="search"
      :pagination.sync="pagination"
      :loading=state
      prev-icon="fas fa-chevron-circle-left"
      next-icon="fas fa-chevron-circle-right"
      sort-icon="mdi-menu-down"
      rows-per-page-text="แสดง"
      :rows-per-page-items=rows_per_page
    >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <tr v-on:click="list_missing(props.item.ms_id)" >
        <td class="text-xs-left" >{{ props.item.ms_date }}</td>
        <td class="text-xs-left">{{ props.item.ms_status }}</td>

        <td class="text-xs-left">{{ props.item.u_ms_date }}</td>

      </tr>
    </template>
     <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          ไม่พบข้อมูล :(
        </v-alert>
      </template>
  </v-data-table>
    </v-card>
  </div>
</template>

<script>
  export default {
    layout: 'student',
    data () {
      return {
        state:false,
        search: '',
        pagination: {},
        selected: [],
        rows_per_page:[10,20,{"text":"แสดงทั้งหมด","value":-1}],//////////////////////////   teach me pleas!
        headers: [
          { text: 'วันที่แจ้งหาย', value: 'วันที่แจ้งหาย',align: 'left',sortable: false, },
          { text: 'สถานะการแจ้ง', value: 'สถานะการแจ้ง',align: 'left',sortable: false,  },
          { text: 'วันที่มีการเปลี่ยนแปลง', value: 'วันที่มีการเปลี่ยนแปลง',align: 'left',sortable: false,  },
        ],
        missing: [],
        ms_type:"",
        type:"pk_machine",
      }
    },
    created(){
      this.sh_missing_w_std()
    },
    watch:{
      type(newValue){
        this.type=newValue
        this.sh_missing_w_std()
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    methods:{
      list_missing(ms_id){
        this.$router.push({path: '../student/missing/update_missing?ms_id='+ms_id})
      },
      async sh_missing_w_std(){
          this.state=true
          let res=await this.$http.post('/missing/sh_missing_w_std',{
            std_id:sessionStorage.getItem("id"),
            type:this.type
          })
          //  console.log(res.data.datas)
          this.missing=res.data.datas
          this.ms_type=res.data.type
          this.state=false
      }
     
    }
  }
</script>