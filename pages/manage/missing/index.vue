<template>

  <div>
    <v-card >
      <v-toolbar tabs>
        <v-flex xs12 md12 lg12>
        <v-toolbar-title>การแจ้งหาย</v-toolbar-title>
        </v-flex>

        <v-flex xs6 md6 lg6>
        <v-radio-group v-model="ms_table" row style="margin-top:25px">
          <v-radio label="พาหนะ" value="pk_machine"></v-radio>{{count_status_mc.count}}
          <v-radio label="อุปกรณ์" value="pk_accessories"></v-radio>{{count_status_ac.count}}
        </v-radio-group>
        </v-flex>

        

        <v-tabs
          slot="extension"
          v-model="tabs"
          fixed-tabs
          color="transparent"
        >
        
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#cv-1" @click="chang_value(1)" class="primary--text">รอรับเรื่อง | {{this.stp1.count}}</v-tab>
          <v-tab href="#cv-2" @click="chang_value(2)" class="primary--text">กำลังดำเนินการ | {{this.stp2.count}}</v-tab>
          <v-tab href="#cv-3" @click="chang_value(3)" class="primary--text">พบแล้ว | {{this.stp3.count}}</v-tab>
        </v-tabs>
      </v-toolbar>
      <!-- <v-flex xs12>

          <v-text-field
            v-model="txt_search"
            style="margin-top:25px;padding:10px"
            class="margin-top-md"
            label="ค้นหา"
            append-icon="search"
            @click:append=""
            solo
          ></v-text-field>

      </v-flex> -->
      <v-tabs-items v-model="tabs" class="white elevation-1">
        <v-tab-item
          v-for="i in 3"
          :id="'cv-' + i"
          :key="i"
        >
          <v-data-table
              :headers="headers"
              :items="missing"
              :search="search"
              :pagination.sync="pagination"
              :loading="state"
              prev-icon="fas fa-chevron-circle-left"
              next-icon="fas fa-chevron-circle-right"
              sort-icon="mdi-menu-down"
              rows-per-page-text="แสดง"
              :rows-per-page-items="rows_per_page"
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
              <tr v-on:click="list_missing(props.item.ms_id)">
                <td class="text-xs-left" >{{ props.item.ms_date }}</td>
                <td class="text-xs-left" >{{ props.item.u_id }}</td>
                <td class="text-xs-left">{{ props.item.ms_u_id }}</td>
                <td class="text-xs-left">{{ props.item.ms_u_table }}</td>

              </tr>

            </template>
            <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning">
                  ไม่พบข้อมูล :(
                </v-alert>
              </template>
          </v-data-table>

        </v-tab-item>
      </v-tabs-items>
        
    </v-card>
  </div>

</template>

<script>
  export default {
    layout: 'manage',
    data () {
      return {
        tabs: null,
        state:false,
        search: '',
        pagination: {},
        selected: [],
        rows_per_page:[10,20,{"text":"แสดงทั้งหมด","value":-1}],//////////////////////////   teach me pleas!
        headers: [
          { text: 'วันที่แจ้งหาย', value: 'วันที่แจ้งหาย',align: 'left',sortable: false, },
          { text: 'ผู้แจ้ง', value: 'ผู้แจ้ง',align: 'left',sortable: false, },
          { text: 'รายการสูญหาย', value: 'รายการสูญหาย',align: 'left',sortable: false,  },
          { text: 'เจ้าของ', value: 'เจ้าของ',align: 'left',sortable: false,  },
        ],
        missing: [],
        ms_type:"",
        mis_status:"ขั้นที่ 1 รอรับเรื่อง",
        ms_table:"pk_machine",

        informer:"",
        txt_search:"",

        stp1:"",
        stp2:"",
        stp3:"",
        count_status_mc:"",
        count_status_ac:"",
      }
    },
    async created(){
      this.load_list("pk_machine")
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      filter_missing(){
        return this.missing.filter(x=>''+x.ms_status===this.mis_status)
      },
      filter_txt_search(){
        return this.missing.filter(x=>''+x.ms_u_table===this.txt_search)
      },
    },
    watch:{
      mis_status(newValue){console.log("ok")
        if(newValue==1){this.mis_status="ขั้นที่ 1 รอรับเรื่อง",this.load_list(this.ms_table)}
        else if(newValue==2){this.mis_status="ขั้นที่ 2 รับเรื่องแล้ว",this.load_list(this.ms_table)}
        else if(newValue==3){this.mis_status="ขั้นที่ 3 พบเเล้ว",this.load_list(this.ms_table)}
      },
      ms_table(newValue){
        this.load_list(newValue)
      },

    },
    methods:{
      async load_list(cv_filter){
        this.state=true
        let res=await this.$http.post('/missing/list',{cv_filter:cv_filter,cv_filter_stp:this.mis_status})
        // console.log("res.data") 
        //  console.log(res.data) 
        this.missing=res.data.datas
        this.informer=res.data.name_1
        this.ms_type=res.data.type
        this.stp1=res.data.stp1[0]
        this.stp2=res.data.stp2[0]
        this.stp3=res.data.stp3[0]
        this.count_status_mc=res.data.machines[0]
        this.count_status_ac=res.data.accessories[0]
        this.state=false

      },
      
      chang_value(vl){
        this.mis_status=vl
      },
      list_missing(ms_id){
        this.$router.push({path: '../manage/missing/update_missing?ms_id='+ms_id})
      },
     
    }
  }
</script>