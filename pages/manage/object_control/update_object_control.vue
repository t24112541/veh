
<template>

    <v-card  @keypress.enter="update_object_control(oc_id)">
      <notifications group="foo" />
      <v-alert
        v-model="danger"
        dismissible
        :type="type_api"
      >
        {{alt_txt}}
      </v-alert>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
        <v-flex xs7 >
          ข้อมูลผิดระเบียบ : {{itm_oc_name}}
        </v-flex>
        
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs2></v-flex>              
            <v-flex xs8 class="margin-bottom-mn">
              <v-card height="100%" class="grey lighten-4 paddign" > 
                <center><img :src="this.img" width="50%"></center>
                <v-card-actions style="font-size:100%">
                  <span><i class="fas fa-image fa-2x"></i></span>
                  <v-spacer></v-spacer>
                  <span>รูปประกอบข้อมูลผิดระเบียบ</span>
                </v-card-actions>
              </v-card>
            </v-flex> 
            <v-flex xs12>
            <v-stepper v-model="ms_step">
              <v-stepper-header>
                <v-stepper-step :complete="ms_step >= 1" step="1">ผิดระเบียบ</v-stepper-step>
          
                <v-divider></v-divider>
          
                <v-stepper-step :complete="ms_step >= 2" step="2">รอการตรวจสอบ</v-stepper-step>
          
                <v-divider></v-divider>
                <v-stepper-step :complete="ms_step >= 3" step="3">ผ่านการตรวจสอบ</v-stepper-step>
              </v-stepper-header>
          
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-btn
                    color="primary"
                    @click="ms_step = 2"
                    style="width:100%"
                  >
                    <i class="fas fa-check-circle fa-2x"></i>&nbsp;
                    <v-spacer></v-spacer> ส่งเรื่องตรวจแก้<v-spacer></v-spacer>
                  </v-btn>
                  
                </v-stepper-content>
                <v-stepper-content step="2"><center>
                  <v-flex xs12 >       
                    <v-dialog v-model="dialog_co_true" persistent max-width="500" >
                      <v-btn  slot="activator" color="success" style="width:100%">
                        <i class="fas fa-check-circle fa-2x"></i> &nbsp;
                        <v-spacer></v-spacer> ผ่าน<v-spacer></v-spacer>
                      </v-btn>
                      <v-card>
                        <v-container>
                          รายการดังกล่าวผ่านการตรวจทานอย่างดีแล้วใช่หรือไม่ ?
                        </v-container>   
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="red lighten-2" flat @click.native="dialog_co_true = false">ไม่ใช่</v-btn>
                          <v-btn color="primary" flat @click="ms_step = 3 ,dialog_co_true = false">ใช่</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 >       
                    <v-dialog v-model="dialog_co" persistent max-width="500" >
                      <v-btn  slot="activator" color="error" style="width:100%">
                        <i class="fas fa-times-circle fa-2x"></i> &nbsp;
                        <v-spacer></v-spacer> ไม่ผ่าน<v-spacer></v-spacer>
                        
                       
                      </v-btn>
                      <v-card>
                        <v-container>
                          <v-layout wrap>                
                            <v-flex xs12 >
                              <v-textarea
                                solo
                                rows='5'
                                label="พิมพ์เหตุผลที่ไม่ผ่านที่นี่....."
                                v-model="co_comment"
                                prepend-icon="fas fa-comment fa-2x"
                                placeholder="พิมพ์เหตุผลที่ไม่ผ่านที่นี่....."
                              ></v-textarea>
                            </v-flex>
                            
                          </v-layout>
                        </v-container>
                        
                        <v-card-actions>
                          <div v-if="load_status!=0">
                            <v-progress-circular
                            
                              :rotate="-90"
                              :size="70"
                              :width="15"
                              :value="load_status"
                              color="green lighten-2"
                            >
                              {{ load_status }}
                            </v-progress-circular>
                          </div>
                          <v-spacer></v-spacer>
                          <v-btn color="red lighten-2" flat @click.native="dialog_co = false">ยกเลิก</v-btn>
                          <v-btn color="primary" flat @click="oc_fail()" :disabled="co_comment==''">ตกลง</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>

                  
                  </center>
                </v-stepper-content>
                <v-stepper-content step="3">
          
                 <v-flex text-xs-center xs12 style="color:#81c784"><i class="fas fa-check-circle fa-2x" ></i></v-flex>
                 <v-flex text-xs-center xs12 style="color:#81c784">ผ่านการตรวจแก้แล้ว</v-flex>
                 <v-flex text-xs-center xs12 style="color:#81c784">
                   <v-btn
                    color="error"
                    @click="ms_step = 2"
                    >
                      ย้อนเรื่องกลับ
                  </v-btn>
                 </v-flex>
                 
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
            </v-flex>
            <v-flex xs12 >
              <v-btn  color="#55b159" style="font-size:110%;width:95%;color:#fff" @click="oc_link_oc_btn(ob_id)">
                 {{oc_type}} {{oc_name}}
              </v-btn>
            </v-flex>
            <v-flex xs12>
       
            </v-flex>
            
            <v-flex xs12>
                <v-timeline
                align-top
                dense
              >
                <v-timeline-item
                  color=" teal lighten-3"
                  icon="fas fa-check"
                >
                  <v-layout pt-3>
                    <v-flex xs5>
                      <strong>ผลการตรวจแก้ครั้งล่าสุด :{{oc_status}}</strong>
                    </v-flex>
                    <v-flex>
                      <div class="caption">{{oc_update_date}}</div>
                    </v-flex>
                  </v-layout>
                </v-timeline-item>
        

                <v-timeline-item
                  color="pink"
                  icon="fas fa-exclamation"
                >
                  <v-layout pt-3>
                    <v-flex xs5>
                      
                      <strong>วันที่แจ้งข้อมูลผิดระเบียบ</strong>
                    </v-flex>
                    <v-flex>
                      <div class="caption">{{oc_date}}</div>
                    </v-flex>
                  </v-layout>
                </v-timeline-item>
              </v-timeline>

            </v-flex>
            <v-flex xs12>
              <v-card-title class="cyan darken-1">
              <span class="subheading white--text">ความเห็นผู้ตรวจ</span>
              </v-card-title>
              <v-list v-for="itm in pk_comment" :key="itm.co_comment">
                <v-list-tile >
                  <v-list-tile-action>
                    <v-icon>chat</v-icon>
                  </v-list-tile-action>
      
                  <v-list-tile-content>
                    <v-list-tile-sub-title>{{itm.co_date}}</v-list-tile-sub-title>
                    <v-list-tile-title>{{itm.co_comment}}</v-list-tile-title>
                    
                  </v-list-tile-content>
                  <v-list-tile-action>
      
                    <!-- <v-icon>chat</v-icon> -->
                  </v-list-tile-action>
                </v-list-tile>
      
                <v-divider inset></v-divider>
      
                
              </v-list>
            </v-flex> 
            
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-btn flat color="red lighten-2" @click="object_control()"><i class="fas fa-arrow-circle-left fa-2x"></i></v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="green lighten-2"  @click="update_object_control()"><i class="fas fa-save fa-2x"></i></v-btn>
        </v-card-actions>
        
    </v-card>

</template>

<script>

    export default {
      
        layout: 'manage',
        data(){
          return{
            status:sessionStorage.getItem("status"),
            link_img:"/files/img/object_control/",

            oc_id:"",
            oc_date:"",
            oc_status:"",
            oc_name:"",
            oc_update_date:"",
            oc_type:"",
            ms_step:"1",
            u_id:"",
            ob_id:"",
            oc_u_table:"",
            
            ms_link_mis:"",
            ms_link_u_mis:"",

            type_api:"",
            danger:false,
            conf_del:false,
            isEditing:null,
            rules: {
                  required: value => !!value || 'ห้ามว่าง.',
                  // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
            },
            img_ms:"",
            ms_detail:"",

            img:"",

            co_comment:"",

            dialog_co:false,
            dialog_co_true:false,
            load_status:0,
            pk_comment:"",

   
          }
        },
        async created(){
          this.sh_object_control()
          this.sh_comment()
          this.$notify({
            group: 'foo',
            title: 'Important message',
            text: 'Hello user! This is a notification!'
          })
        },
        watch:{
          ms_step(newValue){
            if(newValue=="1"){this.oc_status="ผิดระเบียบ"}
            else if(newValue=="2"){this.oc_status="รอการตรวจสอบ"}
            else if(newValue=="3"){this.oc_status="ผ่านการตรวจสอบ"}
         
            console.log(this.oc_status)
          },
          oc_status(newValue){
            if(newValue=="ผิดระเบียบ"){this.ms_step="1"}
            else if(newValue=="รอการตรวจสอบ"){this.ms_step="2"}
            else if(newValue=="ผ่านการตรวจสอบ"){this.ms_step="3"}
          },
          oc_u_table(newValue){
            if(newValue=="pk_machine"){this.ms_link_mis="../machines/edit_machine?ms=true&&mc_id="}
            else if(newValue=="pk_accessories"){this.ms_link_mis="../accessories/edit_accessories?ms=true&&ac_id="}
          }
        },
        methods:{
          async oc_fail(){console.log("OK")

            let oc_fail=await this.$http.post("/comment/add_comment",{
              co_co_u_id:sessionStorage.getItem("id"),
              co_co_u_table:this.status,
              co_u_id:this.oc_id,
              co_u_table:"object_control",
              co_comment:this.co_comment,
            }
            ,{
              onUploadProgress: uploadEvent => {
                this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
              }
            })
            
            this.sh_comment()
            this.ms_step =1
            this.dialog_co=false
          },
          oc_link_oc_btn(ob_id){
            this.$router.push({path:this.ms_link_mis+ob_id}) 
          },
          step_plus(){
            // console.log("step")
            if(this.ms_step!=3){this.ms_step++}
            // console.log(this.ms_step)
          },
          conf_del(){this.conf_del=true},
          async object_control_del(){//console.log("object_control_del")
            let res=await this.$http.post('/object_control/object_control_del/',{
              oc_id:this.$route.query.oc_id,
              d_code:this.d_code,
              d_name:this.d_name,
              u_id:sessionStorage.getItem("username")
            })
            if(res.data.ok==true){
              this.isEditing=!this.isEditing
              this.$router.push({name:"manage-object_control"})
            }
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async sh_object_control(){
            let sh=await this.$http.post('/object_control/sh_object_control/',{oc_id:this.$route.query.oc_id})


            this.oc_id=this.$route.query.oc_id
            this.oc_date=sh.data.datas[0].oc_date 
            this.oc_u_id=sh.data.datas[0].oc_u_id
            this.oc_type=sh.data.type
            this.oc_status=sh.data.datas[0].oc_status
            this.oc_name=sh.data.datas[0].oc_name
            this.oc_update_date=sh.data.datas[0].oc_update_date
            this.itm_oc_name=sh.data.datas[0].itm_oc_name
            this.oc_u_table=sh.data.datas[0].oc_u_table
            this.ob_id=sh.data.datas[0].oc_u_id
            this.img=this.link_img+sh.data.img[0].img_img
          },
          async sh_comment(){
            let co=await this.$http.post("/comment/list_comment_where_topic",{
              co_u_id:this.$route.query.oc_id,
              co_u_table:"object_control",
            })
            // console.log(co.data)
            this.pk_comment=co.data.datas
          },
          async update_object_control(oc_id){
            //console.log("oc_id"+oc_id)
            let res=await this.$http.post("/object_control/update_object_control",{
              oc_id:this.oc_id,
              oc_status:this.oc_status,
              u_id:sessionStorage.getItem("username")
            })
            console.log(res.data)
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt
                this.isEditing=!this.isEditing
                this.$router.push({name: 'manage-object_control'})
              }
             else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          object_control(){
            this.$router.push({name: 'manage-object_control'})
          }
        }
    }
</script>