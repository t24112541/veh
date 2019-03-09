<template>
  <div>
    <v-card>
      
  
      <v-card-title primary-title>
        <v-flex xs12 sm3 md3 style="padding-top:20px" >
          <h3 class="headline mb-0">ข้อมูลยานพาหนะ</h3>
        </v-flex>
        <v-flex xs12 sm3 md3 style="padding-top:20px" >
          <v-card
              class="mt-1 mx-auto"
              @click="mc_confirm_value='all'"
              style="cursor: pointer;"
            >
              <v-sheet
                class="v-sheet--offset mx-auto text-xs-center display-1 font-weight-thin"
                color="#4caf50"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
                <v-card-text style="color:#f1f1f1">
                {{std.length}}
                </v-card-text>
              </v-sheet>
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">พาหนะทั้งหมด</div>
                <div class="subheading font-weight-light grey--text">ในระบบ</div>
                <v-divider class="my-2"></v-divider>
              </v-card-text>
            </v-card>
        </v-flex>

        <v-flex xs12 sm3 md3 style="padding-top:20px" >
          <v-card
              class="mt-1 mx-auto"
              @click="mc_confirm_value='false'"
              style="cursor: pointer;"
            >
              <v-sheet
                class="v-sheet--offset mx-auto text-xs-center display-1 font-weight-thin"
                color="#f13518"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
                <v-card-text style="color:#f1f1f1">
                {{filter_false.length}}
                </v-card-text>
              </v-sheet>
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">พาหนะที่ยังไม่ยืนยัน</div>
                <div class="subheading font-weight-light grey--text">ในระบบ</div>
                <v-divider class="my-2"></v-divider>
              </v-card-text>
            </v-card>
        </v-flex>

        <v-flex xs12 sm3 md3 style="padding-top:20px" >
          <v-card
              class="mt-1 mx-auto"
              @click="mc_confirm_value='true'"
              style="cursor: pointer;"
            >
              <v-sheet
                class="v-sheet--offset mx-auto text-xs-center display-1 font-weight-thin"
                color="#4caf50"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
                <v-card-text style="color:#f1f1f1">
                {{filter_true.length}}
                </v-card-text>
              </v-sheet>
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">พาหนะที่ยืนยันแล้ว</div>
                <div class="subheading font-weight-light grey--text">ในระบบ</div>
                <v-divider class="my-2"></v-divider>
              </v-card-text>
            </v-card>
        </v-flex>
      
      </v-card-title>
  
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green lighten-2"
          dark
          small
          
          fab
          @click="machine_add()"
        >
          <v-icon>add</v-icon>
        </v-btn>  
        <v-spacer></v-spacer>
        
      </v-card-actions>
    </v-card>
    <v-card>

    <div class="cv_header padding-top-mn"> 
      <v-text-field
              label="ค้นหาพาหนะ"
              append-icon="search"
              v-model="txt_search"
            ></v-text-field>
    </div> 
   
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
  <v-data-table
      :headers="headers"
      :items="std_filter"
      :search="search"

      :loading="state"
      class="elevation-1"
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
    <template slot="items" slot-scope="props" >
      <tr v-on:click="list_machine(props.item.mc_id)">
        <td class="text-xs-left xs10">{{ props.item.mc_code }}</td>
        <td class="text-xs-left">{{ props.item.mc_brand }}</td>
        <td class="text-xs-left">{{ props.item.mc_series }}</td>
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
    layout: 'manage',
    data () {
      return {
        txt_search:"",
        state:true,
        search: '',
        rows_per_page:[10,20,{"text":"แสดงทั้งหมด","value":-1}],//////////////////////////   teach me pleas!
        headers: [
          {text: 'ทะเบียนรถ',align: 'left',sortable: false, value: 'ทะเบียนรถ'},
          { text: 'แบรนด์รถ', value: 'แบรนด์รถ',align: 'left', sortable: false,},
          { text: 'รุ่นรถ', value: 'รุ่นรถ',align: 'left',sortable: false,  },
        ],
        std:[],

        mc_confirm_value:"all",
      }
    },
     watch:{
      async txt_search(newValue){
        let s=newValue
        this.state=true
        let res=await this.$http.post('/machine/search',{
          txt_search:s
        })
        this.std=res.data.datas
        this.state=false
      }
    },
    async created(){
      if(this.$route.query.g_code){
        let res=await this.$http.get('/machine/list_g/'+this.$route.query.g_code)
        this.std=res.data.datas
        this.state=false
      }else{
        let res=await this.$http.get('/machine/list')
        this.std=res.data.datas
        this.state=false
      }
      
      
    },
    computed: {
      filter_false(){
        let sh=[]
        for(let i=0;i<this.std.length;i++){
          if(this.std[i].mc_confirm+''==="false"){
            sh.push(this.std[i])
          }
        }
        return sh
      },
      filter_true(){
        let sh=[]
        for(let i=0;i<this.std.length;i++){
          if(this.std[i].mc_confirm+''==="true"){
            sh.push(this.std[i])
          }
        }
        return sh
      },
      std_filter(){(x=>''+x.oc_status===this.mis_status)
        if(this.mc_confirm_value=='all'){return this.std}
        else{
          return this.std.filter(x=>x.mc_confirm+''==this.mc_confirm_value)
        }
          
      },
    },
    methods:{
      list_machine(mc_id){
        this.$router.push({path: "/manage/machines/edit_machine?mc_id="+mc_id})
      },
     machine_add(){
        this.$router.push({name: "manage-machines-data_add_machine"})
      }
    }
  }
</script>