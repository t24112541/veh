<template>
  <div>
    <v-card >
      <v-toolbar tabs>
        <v-flex xs12>
        <v-toolbar-title>ข้อมูลผิดระเบียบ</v-toolbar-title>
        </v-flex>

        <v-flex xs6>
        <v-radio-group v-model="type" row style="margin-top:25px">
          <v-radio label="พาหนะ" value="pk_machine"></v-radio>{{count_status_mc.count}}
          <v-radio label="อุปกรณ์" value="pk_accessories"></v-radio>{{count_status_ac.count}}
        </v-radio-group>
        </v-flex>

        <!-- <v-text-field
          style="margin-top:25px"
          class="margin-top-md"
          label="ค้นหา"
          v-model="txt_search"
        ></v-text-field>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn> -->

      
      </v-toolbar>
  
      <v-tabs-items v-model="tabs" class="white elevation-1">
        <v-tab-item
          v-for="i in 3"
          :id="'cv-' + i"
          :key="i"
        >
          <v-data-table
              :headers="headers"
              :items="object_control"
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
              <tr v-on:click="list_object_control(props.item.oc_id)">
                <td class="text-xs-left" >{{ props.item.oc_date }}</td>
                <td class="text-xs-left">{{ props.item.oc_status }}</td>
                <td class="text-xs-left">{{ props.item.itm_oc_name }}</td>
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
    layout: 'student',
    data () {
      return {
        tabs: null,
        state:false,
        search: '',
        pagination: {},
        selected: [],
        rows_per_page:[10,20,{"text":"แสดงทั้งหมด","value":-1}],//////////////////////////   teach me pleas!
        headers: [
          { text: 'วันที่แจ้ง', value: 'วันที่แจ้ง',align: 'left',sortable: false, },
          { text: 'สถานะ', value: 'สถานะ',align: 'left',sortable: false,  },
          { text: 'เหตุผิดระเบียบ', value: 'เหตุผิดระเบียบ',align: 'left',sortable: false,  },
        ],
        object_control: [],
        oc_type:"",
        mis_status:"ผิดระเบียบ",
        oc_table:"pk_machine",

        stp1:"",
        stp2:"",
        stp3:"",
        count_status_mc:"",
        count_status_ac:"",

        type:"pk_machine",
      }
    },
    async created(){
      this.sh_oc_w_std()
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
    },
    watch:{
      mis_status(newValue){console.log("ok")
        if(newValue==1){this.mis_status="ผิดระเบียบ"}
        else if(newValue==2){this.mis_status="รอการตรวจสอบ"}
        else if(newValue==3){this.mis_status="ผ่านการตรวจสอบ"}
      },

      type(newValue){
        this.type=newValue
        this.sh_oc_w_std()
      }
    },
    methods:{
      async sh_oc_w_std(){
          this.state=true
          let res=await this.$http.post('/object_control/sh_oc_w_std',{
            std_id:sessionStorage.getItem("id"),
            type:this.type
          })
           console.log(res.data.datas)
          this.object_control=res.data.datas
          this.oc_type=res.data.type
          this.state=false
      },
      chang_value(vl){
        this.mis_status=vl
      },
      list_object_control(oc_id){
        this.$router.push({path: '../student/object_control/update_object_control?oc_id='+oc_id})
      },
     
    }
  }
</script>