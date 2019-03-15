
<template>
    <v-card  @keypress.enter="missing_update(ms_id)">
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
          ข้อมูลการแจ้งหาย
        </v-flex>
        
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
            <v-stepper v-model="ms_step">
              <v-stepper-header>
                <v-stepper-step :complete="ms_step > 1" step="1">ขั้นที่ 1 รอรับเรื่อง</v-stepper-step>
          
                <v-divider></v-divider>
          
                <v-stepper-step :complete="ms_step > 2" step="2">ขั้นที่ 2 รับเรื่องแล้ว</v-stepper-step>
          
                <v-divider></v-divider>
          
                <v-stepper-step :complete="ms_step >= 3" step="3">ขั้นที่ 3 พบแล้ว</v-stepper-step>
              </v-stepper-header>
          
              <v-stepper-items>
                <v-stepper-content step="1">
                  <!-- <v-card
                    class="mb-5"
                    color="grey lighten-1"
                    height="200px"
                  ></v-card> -->
                  
                  <v-btn
                    color="primary"
                    @click="ms_step = 2"
                    style="width:100%"
                  >
                    <i class="fas fa-check-circle fa-2x"></i>&nbsp;
                    <v-spacer></v-spacer> รับเรื่อง<v-spacer></v-spacer>
                  </v-btn>
                  
                </v-stepper-content>
          
                <v-stepper-content step="2">
                  <v-flex xs12>
                    <v-btn
                      color="primary"
                      @click="ms_step = 3"
                      style="width:100%"
                    >
                      <i class="fas fa-search fa-2x"></i>&nbsp;
                      <v-spacer></v-spacer> พบแล้ว<v-spacer></v-spacer>
                    </v-btn>
                  </v-flex>
                  <v-flex xs12><center>
                    <v-dialog v-model="dialog_co" persistent max-width="500" >
                        <v-btn  slot="activator" color="default" style="width:100%">
                          <i class="fas fa-comment fa-2x"></i> &nbsp;
                          <v-spacer></v-spacer> บอกให้รู้ว่าคุณกำลังทำอะไรอยู่<v-spacer></v-spacer>
                          
                        
                        </v-btn>
                        <v-card>
                          <v-container>
                            <v-layout wrap>                
                              <v-flex xs12 >
                                <v-textarea
                                  solo
                                  rows='5'
                                  label="บอกให้รู้ว่ากำลังทำอะไรอยู่....."
                                  v-model="co_comment"
                                  prepend-icon="fas fa-comment fa-2x"
                                  placeholder="บอกให้รู้ว่ากำลังทำอะไรอยู่....."
                                ></v-textarea>
                              </v-flex>
                              <!-- <v-flex xs12 class="text-xs-center" 
                                @click="$refs.img_co.click()" 
                                style="cursor: pointer;"
                              >
                                <input 
                                  type="file" 
                                  style="display:none;" 
                                  accept="image/*" 
                                  multiple  
                                  @change="upload_img($event)" 
                                  ref="img_co"
                                >
                                <v-card height="100%" class="grey lighten-4 paddign" > 
                                  <img :src="this.img_co" width="50%">
                                  <v-card-actions style="font-size:100%">
                                    <span><i class="fas fa-image fa-2x"></i></span>
                                    <v-spacer></v-spacer>
                                    <span>แนบรูปภาพ</span>
                                  </v-card-actions>
                                </v-card>
                              </v-flex> -->
                              
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
                            <v-btn color="primary" flat @click="comment()" :disabled="co_comment==''">ตกลง</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                    </center></v-flex>
                </v-stepper-content>
          
                <v-stepper-content step="3">
                  <!-- <v-card
                    class="mb-5"
                    style="text-align:center"
                    height="50px"
                  >พบแล้ว</v-card> -->
     
                  
          
                 <v-flex text-xs-center xs12 style="color:#81c784"><i class="fas fa-check-circle fa-2x" ></i></v-flex>
                 <v-flex text-xs-center xs12 style="color:#81c784">พบแล้ว</v-flex>
                 <v-flex xs12>
                   <center>
                   <v-btn
                    color="error"
                    @click="ms_step = 2"
                    >
                      ย้อนกลับเป็นรับเรื่อง
                    </v-btn>
                    </center>
                 </v-flex>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
            </v-flex>
            <v-flex xs12 >
              <v-btn  color="#55b159" style="font-size:110%;width:95%;color:#fff" @click="ms_link_mis_btn(u_id)">
                 {{ms_type}} {{ms_name}}
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
                      <strong>{{ms_status}}</strong>
                    </v-flex>
                    <v-flex>
                      <div class="caption">{{u_ms_date}}</div>
                    </v-flex>
                  </v-layout>
                </v-timeline-item>
        

                <v-timeline-item
                  color="pink"
                  icon="fas fa-exclamation"
                >
                  <v-layout pt-3>
                    <v-flex xs5>
                      <strong>วันที่แจ้งหาย</strong>
                    </v-flex>
                    <v-flex>
                      <div class="caption">{{ms_date}}</div>
                    </v-flex>
                  </v-layout>
                </v-timeline-item>
              </v-timeline>

            </v-flex>
            <v-flex xs12>
              <v-textarea
                        :rules="[rules.required]"
                        solo
                        rows='10'
                        label="สถานที่ที่พบเห็นล่าสุด"
                        v-model="ms_detail"
                        prepend-icon="fas fa-id-card-alt fa-2x"
                        placeholder="สถานที่ที่พบเห็นล่าสุด"
              ></v-textarea>
            </v-flex> 
            <v-flex xs12>
              <v-card height="100%" class="grey lighten-4 paddign" > 
                <center><img :src="this.img_ms" width="50%"></center>
                <v-card-actions style="font-size:100%">
                  <span><i class="fas fa-image fa-2x"></i></span>
                  <v-spacer></v-spacer>
                  <span>รูปสถานที่ที่พบเห็นล่าสุด</span>
                </v-card-actions>
              </v-card>

            
            </v-flex> 

            
            
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="red lighten-2" @click="missing()"><i class="fas fa-arrow-circle-left fa-2x"></i></v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="green lighten-2"  @click="missing_update()"><i class="fas fa-save fa-2x"></i></v-btn>
        </v-card-actions>
        <v-flex xs12>
              <v-card-title class="cyan darken-1">
              <span class="subheading white--text">การทำงาน</span>
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
    </v-card>
</template>

<script>
    export default {
        layout: 'manage',
        data(){
          return{
            status:sessionStorage.getItem("status"),
            link_img:"/files/img/missing/",

            ms_id:"",
            ms_date:"",
            ms_status:"",
            ms_name:"",
            u_ms_date:"",
            ms_type:"",
            ms_step:"1",
            u_id:"",
            ms_table:"",
            
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
            
            dialog_co:false,
            load_status:"",
            img_co:"",
            pk_comment:"",
          }
        },
        async created(){
          this.sh_missing()
          this.sh_comment()
        },
        watch:{
          ms_step(newValue){
            if(newValue=="1"){this.ms_status="ขั้นที่ 1 รอรับเรื่อง"}
            else if(newValue=="2"){this.ms_status="ขั้นที่ 2 รับเรื่องแล้ว"}
            else if(newValue=="3"){this.ms_status="ขั้นที่ 3 พบเเล้ว"}
            // console.log(this.ms_status)
          },
          ms_status(newValue){
            if(newValue=="ขั้นที่ 1 รอรับเรื่อง"){this.ms_step="1"}
            else if(newValue=="ขั้นที่ 2 รับเรื่องแล้ว"){this.ms_step="2"}
            else if(newValue=="ขั้นที่ 3 พบเเล้ว"){this.ms_step="3"}
            // console.log(this.ms_step)
          },
          ms_table(newValue){
            if(newValue=="pk_machine"){this.ms_link_mis="../machines/edit_machine?ms=true&&mc_id="}
            else if(newValue=="pk_accessories"){this.ms_link_mis="../accessories/edit_accessories?ms=true&&ac_id="}
            // console.log(this.ms_step)
          }
        },
        methods:{
          ms_link_mis_btn(u_id){
            // console.log("ms_link_mis_btn")
            this.$router.push({path:this.ms_link_mis+u_id}) 
          },
          step_plus(){
            // console.log("step")
            if(this.ms_step!=3){this.ms_step++}
            // console.log(this.ms_step)
          },
          conf_del(){this.conf_del=true},
          async missing_del(){//console.log("missing_del")
            let res=await this.$http.post('/missing/missing_del/',{
              ms_id:this.$route.query.ms_id,
              d_code:this.d_code,
              d_name:this.d_name,
              u_id:sessionStorage.getItem("username")
            })
            if(res.data.ok==true){
              this.isEditing=!this.isEditing
              this.$router.push({name:"manage-missing"})
            }
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async sh_missing(){
            let res=await this.$http.post('/missing/sh_missing/',{ms_id:this.$route.query.ms_id})
            this.ms_id=this.$route.query.ms_id
            this.ms_date=res.data.datas[0].ms_date
            this.ms_type=res.data.type
            this.ms_status=res.data.datas[0].ms_status
            this.ms_name=res.data.datas[0].ms_name
            this.u_ms_date=res.data.datas[0].u_ms_date
            this.u_id=res.data.datas[0].u_id
            this.ms_table=res.data.datas[0].ms_table
            this.img_ms=this.link_img+res.data.datas[0].img_img
            this.ms_detail=res.data.datas[0].ms_detail
            // console.log(res.data)
          },
          async missing_update(ms_id){
            //console.log("ms_id"+ms_id)
            let res=await this.$http.post("/missing/missing_update",{
              ms_id:this.ms_id,
              ms_status:this.ms_status,
              u_id:sessionStorage.getItem("username")
            })
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt
                this.isEditing=!this.isEditing
                this.$router.push({name: 'manage-missing'})
              }
             else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          missing(){
            this.$router.push({name: 'manage-missing'})
          },
          upload_img(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_co=e.target.result;
              // console.log(this.img_co)
            };
          },
          async comment(){
            let oc_fail=await this.$http.post("/comment/add_comment",{
              co_co_u_id:sessionStorage.getItem("id"),
              co_co_u_table:this.status,
              co_u_id:this.ms_id,
              co_u_table:"pk_missing",
              co_comment:this.co_comment,
            }
            ,{
              onUploadProgress: uploadEvent => {
                this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
              }
            })
            this.sh_comment()
            this.dialog_co=false
          },
          async sh_comment(){
            let co=await this.$http.post("/comment/list_comment_where_topic",{
              co_u_id:this.$route.query.ms_id,
              co_u_table:"pk_missing",
            })
            // console.log(co.data)
            this.pk_comment=co.data.datas 
          },
        }
    }
</script>