<template>
  <div>
    <v-alert
        v-model="danger"
        dismissible
        :type=type_api
      >
        {{alt_txt}}
      </v-alert>
    <v-card >
    <h2 align="center" class="padding-top-mn">บันทึกการทำงาน</h2>
    <div class="cv_header ">กลุ่มการเรียน {{g_name}} ประจำแผนกวิชา {{d_name}}</div>

  <v-data-table
      :headers="headers"
      :items="datas"
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

        <td class="text-xs-left">{{ props.item.g_log_work }}</td>
        <td class="text-xs-left">{{ props.item.g_log_date }}</td>
        <td class="text-xs-left">{{ props.item.g_code }}</td>
        <td class="text-xs-left">{{ props.item.g_name }}</td>
        <td class="text-xs-left">{{ props.item.d_name }}</td>
        <td class="text-xs-left">{{ props.item.u_id }}</td>
        <td class="text-xs-left">
          <v-flex>
              <v-btn flat icon color="green" v-on:click="restore(props.item.run_id)">
                <i class="fas fa-undo-alt"></i>
              </v-btn>
            </v-flex>
          </td>

    </template>
     <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
         (-_-!) ไม่พบข้อมูล 
        </v-alert>
      </template>
  </v-data-table>
    </v-card>
  </div>

  
</template>

<script>
  export default {
    
    layout: 'manage',
    data () {
      return {
        danger:false,
        g_name:"",
        d_name:"",
        state:false,
        search: '',
        pagination: {},
        selected: [],
        rows_per_page:[10,20,{"text":"แสดงทั้งหมด","value":-1}],//////////////////////////   teach me pleas!
        headers: [
            { text: 'การทำงาน', value: 'การทำงาน',align: 'left',sortable: false,  },
            { text: 'วันที่ทำงาน', value: 'วันที่ทำงาน',align: 'left',sortable: false,  },
            { text: 'รหัสกลุ่มการเรียน', value: 'รหัสกลุ่มการเรียน',align: 'left',sortable: false, },
            { text: 'ชื่อกลุ่มการเรียน', value: 'ชื่อกลุ่มการเรียน',align: 'left',sortable: false,  },
            { text: 'ชื่อแผนก', value: 'ชื่อแผนก',align: 'left',sortable: false,  },
            { text: 'ผู้ดำเนินการ', value: 'ผู้ดำเนินการ',align: 'left',sortable: false,  },
            { text: 'เรียกคืนข้อมูล', value: 'เรียกคืนข้อมูล',align: 'left',sortable: false,  },
          
        ],
        datas: []
      }
    },
    async created(){
      this.state=true
      let res=await this.$http.post('/log_list/log_group_show/',{g_id:this.$route.query.g_id})
      //  console.log(res.data)
      this.datas=res.data.datas
      this.g_name=this.datas[0].g_name
      this.d_name=this.datas[0].d_name
      // console.log(this.datas[0].g_name)
      this.state=false
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      
    },
    methods:{
      log_group_show(g_id){
        this.$router.push({path: '../manage/group/show_log_group?g_id='+g_id})
      },
      async restore(id){
            let res=await this.$http.post("/group/restore",{
              id:id,
              data:"pk_group_log",
              target:"pk_group",
              u_id:sessionStorage.getItem("username")
            })
              if(res.data.ok==true){//this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt
                this.$router.push({name: 'manage-group'})
              }
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}  
      }
    }
  }
</script>