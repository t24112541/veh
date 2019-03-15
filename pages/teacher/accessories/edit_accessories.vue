
<template>
    <v-card>
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
          แก้ไขข้ออุปกรณ์
        </v-flex>
        <v-flex xs12 v-if="this.ctrl_status.ctrl_status!='1'" class="cv_title_2">
          การแก้ไขข้อมูลถูกปิดอยู่ <!-- กรุณาติดต่อผู้ดูแลระบบหากต้องการแก้ไขข้อมูลเป็นการด่วน -->
        </v-flex>
        <v-flex xs2 v-if="this.ctrl_status.ctrl_status=='1'">
          <v-btn 
            color="green lighten-2"
            flat
            @click="isEditing = !isEditing"
          >
            <i v-if="isEditing" class="fas fa-times fa-2x"></i>
            <i v-else class="fas fa-edit fa-2x "></i>
          </v-btn>
        </v-flex>
        <v-flex xs2 v-if="this.ctrl_status.ctrl_status=='1'">
          <v-dialog v-model="conf_del" persistent max-width="290" >
            <v-btn  slot="activator" flat color="red lighten-2"><i class="fas fa-trash-alt fa-2x"></i></v-btn>
            <v-card>
              <v-card-title class="headline">ยืนยันการลบข้อมูล</v-card-title>
              <v-card-text>ต้องการลบข้อมูล {{mc_code}}<br> ใช่หรือไม่?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten-2" flat @click.native="conf_del = false">ไม่ใช่</v-btn>
                <v-btn color="primary" flat @click="accessoriess_del()">ใช่</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>

              <v-flex xs12 >       
                <v-dialog v-model="dialog_rule" persistent max-width="500" >
                  <v-btn  slot="activator" flat color="orange accent-4">
                    <v-flex xs12 >
                      <i class="fas fa-exclamation-triangle fa-2x"></i>
                    </v-flex>
                    <v-flex xs12 >
                      แจ้งอุปกรณ์ผิดระเบียบ
                    </v-flex>
                  </v-btn>
                  <v-card>
                    <v-container>
                      <v-layout wrap>
                        <v-flex xs10 sm10 md10>
                          <v-select
                            prepend-icon="fas fa-th"
                            :items="items_oc_detail"
                            item-value="itm_oc_id"
                            label="จุดผิดระเบียบ"
                            placeholder="จุดผิดระเบียบ"
                            v-model="itm_oc_id"
                            :disabled="itm_oc_name_more==true"
                          >
                            <template slot="selection" slot-scope="props">
                              {{props.item.itm_oc_name}}
                            </template>
                            <template slot="item" slot-scope="props">
                              {{props.item.itm_oc_name}}
                            </template>
                          </v-select>
                        </v-flex>
                        <v-flex xs2>
                          <v-checkbox
                            label="อื่นๆ"
                            v-model="itm_oc_name_more"
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs12 v-if="this.itm_oc_name_more==true">
                          <v-textarea
                            solo
                            rows='2'
                            label="พิมพ์เหตุผิดระเบียบที่นี่"
                            v-model="itm_oc_name"
                            prepend-icon="fas fa-exclamation-triangle fa-2x"
                            placeholder="พิมพ์เหตุผิดระเบียบที่นี่"
                          ></v-textarea>
                        </v-flex>
                        <v-flex xs12 class="text-xs-center" 
                          @click="$refs.img_oc.click()" 
                          style="cursor: pointer;"
                        >
                          <input 
                            type="file" 
                            style="display:none;" 
                            accept="image/*" 
                            multiple  
                            @change="upload_img_oc($event)" 
                            ref="img_oc"
                          >
                          <v-card height="100%" class="grey lighten-4 paddign" > 
                            <img :src="this.img_oc" width="50%">
                            <v-card-actions style="font-size:100%">
                              <span><i class="fas fa-image fa-2x"></i></span>
                              <v-spacer></v-spacer>
                              <span>รูปประกอบข้อมูลผิดระเบียบ</span>
                            </v-card-actions>
                          </v-card>
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
                      <v-btn color="red lighten-2" flat @click.native="dialog_rule = false">ยกเลิก</v-btn>
                      <v-btn color="primary" flat @click="object_control(ac_id)">ตกลง</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>

                        <!-- image zone -->

              <v-flex xs4 
                @click="$refs.img_font.click()" 
                style="cursor: pointer;"
              >
                <input 
                  :disabled="!isEditing"
                  type="file" 
                  style="display:none;" 
                  accept="image/*" 
                  multiple  
                  @change="upload_img_font($event)" 
                  ref="img_font"
                >
                <v-card height="100%" class="grey lighten-4 paddign"> 
                  <img :src="this.img_font" width="100%">
                  <v-card-actions style="font-size:100%">
                    <span><i class="fas fa-image fa-2x"></i></span>
                    <v-spacer></v-spacer>
                    <span>รูปด้านหน้า</span>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <!-- end 1 -->

              <v-flex xs4 class="text-xs-center" 
                @click="$refs.img_side.click()" 
                style="cursor: pointer;"
              >
                <input 
                  :disabled="!isEditing"
                  type="file" 
                  style="display:none;" 
                  accept="image/*" 
                  multiple  
                  @change="upload_img_side($event)" 
                  ref="img_side"
                >
                <v-card height="100%" class="grey lighten-4 paddign" > 
                  <img :src="this.img_side" width="100%">
                  <v-card-actions style="font-size:100%">
                    <span><i class="fas fa-image fa-2x"></i></span>
                    <v-spacer></v-spacer>
                    <span>รูปด้านข้าง</span>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <!-- end 2 -->
              <v-flex xs4 class="text-xs-center" 
                @click="$refs.img_rear.click()" 
                style="cursor: pointer;"
              >
                <input 
                  :disabled="!isEditing"
                  type="file" 
                  style="display:none;" 
                  accept="image/*" 
                  multiple  
                  @change="upload_img_rear($event)" 
                  ref="img_rear"
                >
                <v-card height="100%" class="grey lighten-4 paddign" > 
                  <img :src="this.img_rear" width="100%">
                  <v-card-actions style="font-size:100%">
                    <span><i class="fas fa-image fa-2x"></i></span>
                    <v-spacer></v-spacer>
                    <span>รูปด้านหลัง</span>
                  </v-card-actions>
                </v-card>
              </v-flex>

              

            <v-flex xs12>
                <v-btn  color="#55b159" style="font-size:110%;width:95%;color:#fff" @click="sh_user(ac_u_id)">
                 <i class="fas fa-user fa-2x"></i>เจ้าของพาหนะ: <v-spacer></v-spacer>{{u_name}} <v-spacer></v-spacer><!--ตำแหน่ง:{{position}}-->
                </v-btn>
            </v-flex>
            <!-- <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="true"
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  placeholder="รหัสประจำตัวเจ้าของอุปกรณ์"
                  label="เจ้าของอุปกรณ์"
                  prepend-icon="fas fa-car"
                  name="u_name"
                  v-model="u_name"
                ></v-text-field>
              </v-layout>
            </v-flex> -->
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  counter
                  prepend-icon="fas fa-newspaper"
                  label="ชื่อุปกรณ์"
                  placeholder="ชื่อุปกรณ์"
                  name="ac_name"
                  v-model="ac_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-textarea
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  solo
                  label="รายละเอียด"
                  v-model="ac_description"
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  placeholder="รายละเอียด"
                ></v-textarea>
              </v-layout>
            </v-flex>
             <!--////////////////////////////////  missing ///////////////////////////////-->
            <v-flex xs12 >
              <v-dialog v-model="dialog_ms" persistent max-width="500" >
                <v-btn  slot="activator" flat color="orange accent-4">
                  <v-flex xs12>
                    <i class="fas fa-headset fa-2x"></i>
                  </v-flex>
                  <v-flex xs12>
                    แจ้งอุปกรณ์สูญหาย
                  </v-flex>
                </v-btn>
                <v-card>
                  <v-container>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12>
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
                      <v-flex xs12 class="text-xs-center" 
                        @click="$refs.img_ms.click()" 
                        style="cursor: pointer;"
                      >
                        <input 
                          type="file" 
                          style="display:none;" 
                          accept="image/*" 
                          multiple  
                          @change="upload_img_ms($event)" 
                          ref="img_ms"
                        >
                        <v-card height="100%" class="grey lighten-4 paddign" > 
                          <img :src="this.img_ms" width="50%">
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
                    <v-spacer></v-spacer>
                    <v-btn color="red lighten-2" flat @click.native="dialog_ms = false">ยกเลิก</v-btn>
                    <v-btn color="primary" :disabled="ms_detail=='' || img_ms==''" flat @click="missing(ac_id)">ตกลง</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-flex xs12 class="cv-danger">
              *หากข้อมูลไม่ปรากฎอาจเป็นเพราะกรอกข้อมูลที่ไม่ถูกต้องเข้าสู่ระบบโปรดทำการลบข้อมูลแล้วกรอกข้อมูลที่ถูกต้องเข้าสู่ระบบแทน
            </v-flex>
          </v-layout>
          
        </v-container>
        <v-card-actions>
          <v-flex xs3>
          <v-btn flat color="red lighten-2" @click="accessories()"><i class="fas fa-arrow-circle-left fa-2x"></i></v-btn>
          </v-flex>

          <v-spacer></v-spacer>
          <v-flex xs3>
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
          <v-btn v-if="load_status==0" flat color="green lighten-2" :disabled="!isEditing" @click="accessories_update(ac_id)"><i class="fas fa-save fa-2x"></i></v-btn>
          </v-flex>
        </v-card-actions>
        <v-alert
          v-model="danger"
          dismissible
          :type="type_api"
        >
          {{alt_txt}}
        </v-alert>
    </v-card>
</template>

<script>
    export default {
        layout: 'teacher',

        data () {
            return {
              link_img:"http://localhost:9090/img/accessories/",
              ms:null,

              ac_description:"",
              ac_u_id:"",
              ac_name: '',
              ac_u_table:"",
              ac_id:"",
              position:"",
              u_name: '',

              img_font:"",
              img_side:"",
              img_rear:"",

              img_font_id:"",
              img_side_id:"",
              img_rear_id:"",

              type_api:"",
              danger:false,
              conf_del:false,
              isEditing:null,
              rules: {
                    required: value => !!value || 'ห้ามว่าง.',
                    // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
              },
              dialog_ms:false,
              img_ms:"",
              ms_detail:"",

              dialog_rule:false,
              load_status:0,
              position:"",

              items_oc_detail:"",
              itm_oc_id:"",
              itm_oc_name_more:false,
              itm_oc_name:"",
              img_oc:"",
              dis_oc:true,

              ctrl_status:"",
            }
        },
        async created(){
          this.sh_accessories()
          this.sh_object_control()
          this.load_ctrl_status()
        },
        watch:{
          ac_u_table(){
            if(this.ac_u_table=="pk_teacher"){this.position="ครู / บุคลากร"}else{this.position="นักเรียน / นักศึกษา"}
          },
          itm_oc_name_more(){
            if(this.itm_oc_name_more==true){this.dis_oc=true}else{this.dis_oc=false}
          },
        },
        methods:{
          async load_ctrl_status(){
            let res=await this.$http.post("/ctrl_edit_data/")
            this.ctrl_status=res.data.datas[0]
          },
          async sh_user(ac_u_id){
            if(this.ac_u_table=="pk_teacher"){
              let res=await this.$http.post('/teacher/t_id/',{
                t_code:this.ac_u_id,
              })
              this.$router.push({path: '../../teacher/teacher/edit_teacher?t_id='+res.data.datas[0].t_id})
            }
            else if(this.ac_u_table=="pk_student"){
              let res=await this.$http.post('/student/std_id/',{
                std_code:this.ac_u_id,
              })
              this.$router.push({path: '../../teacher/student/edit_student?std_id='+res.data.datas[0].std_id})
            }
            
            
          },
          conf_del(){this.conf_del=true},
          async accessoriess_del(){
            let res=await this.$http.post('/accessories/accessories_del/',{
              ac_description:this.ac_description,
              ac_name:this.ac_name,
              ac_id:this.$route.query.ac_id,
              ac_u_id:this.ac_u_id,
              ac_u_table:this.ac_u_table,
              u_id:sessionStorage.getItem("username")
            })
            if(res.data.ok==true){this.accessories()}
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async sh_accessories(){
            let res=await this.$http.post('/accessories/sh_accessories/',{ac_id:this.$route.query.ac_id})
            // console.log(res.data.datas)
            this.ac_u_id=res.data.datas[0].ac_u_id
            this.ac_u_table=res.data.datas[0].ac_u_table
            this.ac_description=res.data.datas[0].ac_description
            this.ac_name=res.data.datas[0].ac_name
            this.ac_id=this.$route.query.ac_id
            this.u_name=res.data.datas[0].u_name

            this.img_font=this.link_img+res.data.datas[0].img_img
            this.img_font_id=res.data.datas[0].img_id

            this.img_side=this.link_img+res.data.datas[1].img_img
            this.img_side_id=res.data.datas[1].img_id

            this.img_rear=this.link_img+res.data.datas[2].img_img
            this.img_rear_id=res.data.datas[2].img_id

            if(!this.$route.query.ms){this.ms=!this.ms}
            // else{this.ms=this.ms}
          },
          async accessories_update(ac_id){
            if(this.ac_description!='' && this.ac_u_id!=''&& this.ac_name!='' ){
              const formData = new FormData()
              formData.append('img_font-'+this.img_font_id,this.$refs.img_font.files[0])
              formData.append('img_side-'+this.img_side_id,this.$refs.img_side.files[0])
              formData.append('img_rear-'+this.img_rear_id,this.$refs.img_rear.files[0])
              
              formData.append('ac_id',this.$route.query.ac_id)
              formData.append('ac_description',this.ac_description)
              formData.append('ac_u_id',this.ac_u_id)
              formData.append('ac_name',this.ac_name)
              formData.append('ac_u_table',this.ac_u_table)
              formData.append('u_id',sessionStorage.getItem("username"))

              let res=await this.$http.post("/accessories/accessories_update",formData,{
                onUploadProgress: uploadEvent => {
                    this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
                  }
              })
              if(res.data.ok==true){this.load_status=0,this.sh_accessories(),this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            }
          },
          accessories(){
            this.$router.push({name:"teacher-accessories"})
          },
          async missing(ac_id){
            const formData = new FormData()
            formData.append('img_ms',this.$refs.img_ms.files[0])
            formData.append('u_id',this.ac_id)
            formData.append('ms_table',"pk_accessories")
            formData.append('ms_u_id',sessionStorage.getItem("username"))
            formData.append('ms_u_table',sessionStorage.getItem("status"))
            formData.append('ms_status',"ขั้นที่ 1 รอรับเรื่อง")
            formData.append('ms_detail',this.ms_detail)
            
            let res=await this.$http.post("/missing/missing",formData,{
              onUploadProgress: uploadEvent => {
                this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
              }
            })
             if(res.data.ok==true){this.load_status=0,this.dialog_ms=false,this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt,this.sh_machine()}
             else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async sh_object_control(){
            let res=await this.$http.get('/object_control/item_object_control')
            console.log(res.data.datas)
            this.items_oc_detail=res.data.datas
          },
          async object_control(ac_id){
            const data = new FormData()
            data.append('img_oc',this.$refs.img_oc.files[0])
            data.append('oc_u_id',ac_id)
            data.append('oc_u_table',"pk_accessories")
            data.append('oc_oc_u_id',sessionStorage.getItem("username"))
            data.append('oc_oc_u_table',sessionStorage.getItem("status"))
            

            if(this.itm_oc_name_more===true){
              
              let res=await this.$http.post("/object_control/add_item_object_control",{
                itm_oc_name:this.itm_oc_name
              })
              // this.itm_oc_id=res.data.itm
              data.append('itm_oc_id',res.data.itm)
            }else{
              data.append('itm_oc_id',this.itm_oc_id)
            }
          
            let res=await this.$http.post("/object_control/add_object_control",data,{
              onUploadProgress: uploadEvent => {
                this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
              }
            })
             if(res.data.ok==true){this.dialog_rule=false,this.sh_accessories(),this.load_status=0,this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
             else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          upload_img_ms(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_ms=e.target.result;
              console.log(this.img_ms);
            };
          },
          upload_img_font(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_font=e.target.result;
              console.log(this.img_font);
            };
          },
          upload_img_side(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_side=e.target.result;
              // console.log("this.img_side");
              console.log(this.img_side);
            };
          },
          upload_img_rear(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_rear=e.target.result;
              console.log(this.img_rear);
            };
          },
          upload_img_oc(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_oc=e.target.result;
              console.log(this.img_oc);
            };
          },
        }
    }
</script>