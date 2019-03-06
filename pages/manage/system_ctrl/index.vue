
<template>
     <v-card>

        <v-card-title
          class="grey lighten-4 py-4 title"
        >
        <v-flex xs7 >
          ควบคุมการแก้ไขข้อมูล
        </v-flex>
        
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
            <v-stepper v-model="ms_step">
              <v-stepper-header>
                <v-stepper-step :complete="ms_step == 1" step="1">อนุญาตให้แก้ไขข้อมูล</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="ms_step == 0" step="0">ไม่อนุญาตให้แก้ไขข้อมูล</v-stepper-step>
              </v-stepper-header>
          
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-btn
                    color="error"
                    @click="ms_step = 0"
                    style="width:100%"
                  >
                    <i class="fas fa-times fa-2x"></i>&nbsp;
                    <v-spacer></v-spacer> กดเมื่อไม่อนุญาตให้แก้ไขข้อมูล<v-spacer></v-spacer>
                  </v-btn>
                </v-stepper-content>
          
                <v-stepper-content step="0">
                  <v-btn
                    color="primary"
                    @click="ms_step = 1"
                    style="width:100%"
                  >
                    <i class="fas fa-check-circle fa-2x"></i>&nbsp;
                    <v-spacer></v-spacer> กดเมื่ออนุญาตให้แก้ไขข้อมูล<v-spacer></v-spacer>
                  </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
            </v-flex>

          </v-layout>
          <v-alert
            v-model="danger"
            dismissible
            :type="type_api"
          >
            {{alt_txt}}
          </v-alert>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="green lighten-2" 
          @click="update_ctrl_edit_data()"><i class="fas fa-save fa-2x"></i></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        layout: 'manage',

        data () {
            return {
              ms_step:"",
              ctrl_status:"",
              status:"",

              type_api:"",
              danger:false,
              alt_txt:"",
            }
        },
        async created(){
          this.load_ctrl_status()
        },
        watch:{
          // ms_step(newValue){
          //   this.update_ctrl_edit_data()
          // },
          

        },
        methods:{
          async load_ctrl_status(){
            let res=await this.$http.post("/ctrl_edit_data/")
            this.ctrl_status=res.data.datas[0]
            this.ms_step=res.data.datas[0].ctrl_status
            console.log("this.ms_step")
            console.log(this.ms_step)
          },
          conf_oc(){this.conf_oc=true},
          async update_ctrl_edit_data(){
            let res=await this.$http.post('/ctrl_edit_data/update_ctrl_edit_data/',{
              ctrl_id:this.ctrl_status.ctrl_id,
              ctrl_status:this.ms_step,
            })
            if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt,this.load_ctrl_status()}
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },

        }
    }
</script>