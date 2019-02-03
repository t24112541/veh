
<template>
    <v-card>
      
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
        <v-flex xs7 >
          แก้ไขข้อมูลพาหนะ
        </v-flex>
        <v-flex xs2 >
          <v-btn 
            color="green lighten-2"
            flat
            @click="isEditing = !isEditing"
          >
            <i v-if="isEditing" class="fas fa-times fa-2x"></i>
            <i v-else class="fas fa-edit fa-2x "></i>
          </v-btn>
        </v-flex>
        <v-flex xs2 >
          <v-dialog v-model="conf_del" persistent max-width="290">
            <v-btn  slot="activator" flat color="red lighten-2"><i class="fas fa-trash-alt fa-2x"></i></v-btn>
            <v-card>
              <v-card-title class="headline">ยืนยันการลบข้อมูล</v-card-title>
              <v-card-text>ต้องการลบข้อมูล {{mc_code}}<br> ใช่หรือไม่?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten-2" flat @click.native="conf_del = false">ไม่ใช่</v-btn>
                <v-btn color="primary" flat @click="machines_del()">ใช่</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
              <!-- //////////////////////////  rule  ///////////////////////////////// -->
            
            <v-flex xs12 >       
              <v-dialog v-model="dialog_rule" persistent max-width="500" >
                <v-btn  slot="activator" flat color="orange accent-4">
                  <v-flex xs12 >
                    <i class="fas fa-exclamation-triangle fa-2x"></i>
                  </v-flex>
                  <v-flex xs12 >
                    แจ้งพาหนะผิดระเบียบ
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
                    <v-btn color="primary" flat @click="object_control(mc_id)">ตกลง</v-btn>
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
                  :v-model="img_font"
                >
                <v-card height="100%" class="grey lighten-4 paddign"> 
                  <img :src="img_font" width="100%">
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

            <v-flex xs12 >
              <v-layout align-center>
                 <v-btn  color="#55b159" style="font-size:110%;width:95%;color:#fff" @click="sh_std(std_code)">
                 <i class="fas fa-user fa-2x"></i>{{position}}: <v-spacer></v-spacer>{{std_name}} <v-spacer></v-spacer>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  label="ทะเบียนรถ"
                  placeholder="ทะเบียนรถ"
                  name="mc_code"
                  v-model="mc_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  maxlength="100"
                  counter
                  placeholder="แบรนด์รถ"
                  label="แบรนด์รถ"
                  prepend-icon="fas fa-car"
                  name="mc_brand"
                  v-model="mc_brand"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="!isEditing"
                  maxlength="100"
                  counter
                  prepend-icon="fas fa-tachometer-alt"
                  placeholder="รุ่นรถ"
                  label="รุ่นรถ"
                  name="mc_series"
                  v-model="mc_series"
                ></v-text-field>
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
                    แจ้งพาหนะสูญหาย
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
                    <v-btn color="primary" :disabled="ms_detail=='' || img_ms==''" flat @click="missing(mc_id)">ตกลง</v-btn>
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
            <v-btn flat color="red lighten-2" @click="machine()"><i class="fas fa-arrow-circle-left fa-2x"></i></v-btn>
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
            <!--  -->
          <v-btn v-if="load_status==0" flat color="green lighten-2" :disabled="!isEditing" @click="machine_update(mc_id)"><i class="fas fa-save fa-2x"></i></v-btn>
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
        layout: 'manage',

        data () {
            return {
              ms:null,

              mc_id:"",
              mc_code:"",
              mc_brand:"",
              mc_series: '',
              std_code: '',
              mc_u_table:'',

              img_font:"",
              img_side:"",
              img_rear:"",

              link_img:"http://localhost:34001/img/machine/",
              img_font_id:"",
              img_side_id:"",
              img_rear_id:"",

              type_api:"",
              danger:false,
              conf_del:false,
              isEditing:null,
              rules: {
                    // required: value => !!value || 'ห้ามว่าง.',
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
            }
        },
        async created(){
          this.sh_machine()
          this.sh_object_control()
        },
        watch:{
          mc_u_table(){
            if(this.mc_u_table=="pk_teacher"){this.position="ครู / บุคลากร"}else{this.position="นักเรียน / นักศึกษา"}
          },
          itm_oc_name_more(){
            if(this.itm_oc_name_more==true){this.dis_oc=true}else{this.dis_oc=false}
          },
        },
        
        methods:{
          async sh_std(std_code){console.log("sh_std")
          console.log(this.mc_u_table)
            if(this.mc_u_table=="pk_teacher"){
              let res=await this.$http.get('/teacher/sh_teacher/'+std_code)
              this.$router.push({path: '../../manage/teacher/edit_teacher?t_id='+res.data.datas[0].t_id})
            }
            else{
              let res=await this.$http.post('/student/std_id/',{
                std_code:this.std_code,
              })
              this.$router.push({path: '../../manage/student/edit_student?std_id='+res.data.datas[0].std_id})
            }
            
          },
          conf_del(){this.conf_del=true},
          async machines_del(){
            let res=await this.$http.post('/machine/machine_del/',{
              mc_code:this.mc_code,
              mc_brand:this.mc_brand,
              mc_series:this.mc_series,
              std_id:this.std_code,
              mc_id:this.$route.query.mc_id,
              u_id:sessionStorage.getItem("username")
            })
            if(res.data.ok==true){this.machine()}
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async sh_machine(){
            let res=await this.$http.get('/machine/sh_machine/'+this.$route.query.mc_id)
            console.log(res.data.datas)
            this.mc_id=this.$route.query.mc_id
            this.mc_code=res.data.datas[0].mc_code
            this.mc_brand=res.data.datas[0].mc_brand
            this.mc_series=res.data.datas[0].mc_series
            this.std_prename=res.data.datas[0].std_prename
            this.std_code=res.data.datas[0].std_code
            this.std_name=res.data.datas[0].std_name
            this.std_lastname=res.data.datas[0].std_lastname
            this.mc_u_table=res.data.datas[0].mc_u_table

            this.img_font=this.link_img+res.data.datas[0].img_img
            this.img_font_id=res.data.datas[0].img_id

            this.img_side=this.link_img+res.data.datas[1].img_img
            this.img_side_id=res.data.datas[1].img_id

            this.img_rear=this.link_img+res.data.datas[2].img_img
            this.img_rear_id=res.data.datas[2].img_id
          },
          async sh_object_control(){
            let res=await this.$http.get('/object_control/item_object_control')
            console.log(res.data.datas)
            this.items_oc_detail=res.data.datas
          },
          async machine_update(mc_id){console.log("1")
            const formData = new FormData()
              formData.append('mc_id',this.mc_id)
              formData.append('mc_code',this.mc_code)
              formData.append('mc_brand',this.mc_brand)
              formData.append('mc_series',this.mc_series)
              formData.append('std_id',this.std_code)
              formData.append('u_id',sessionStorage.getItem("username"))

              formData.append('img_font-'+this.img_font_id,this.$refs.img_font.files[0])
              formData.append('img_side-'+this.img_side_id,this.$refs.img_side.files[0])
              formData.append('img_rear-'+this.img_rear_id,this.$refs.img_rear.files[0])

              let res=await this.$http.post("/machine/machine_update",formData,{
                onUploadProgress: uploadEvent => {
                  this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
                }
              })
            if(res.data.ok==true){this.load_status=0,this.sh_machine(),this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          machine(){
            this.$router.push({name:"manage-machines"})
          },
          async missing(mc_id){
            const formData = new FormData()
            formData.append('img_ms',this.$refs.img_ms.files[0])
            formData.append('u_id',mc_id)
            formData.append('ms_table',"pk_machine")
            formData.append('ms_u_id',sessionStorage.getItem("username"))
            formData.append('ms_u_table',sessionStorage.getItem("status"))
            formData.append('ms_status',"ขั้นที่ 1 รอรับเรื่อง")
            formData.append('ms_detail',this.ms_detail)
            let res=await this.$http.post("/missing/missing",formData,{
              onUploadProgress: uploadEvent => {
                this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
              }
            })
             if(res.data.ok==true){this.dialog_ms=false,this.sh_machine(),this.load_status=0,this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
             else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async object_control(mc_id){
            const data = new FormData()
            data.append('img_oc',this.$refs.img_oc.files[0])
            data.append('oc_u_id',mc_id)
            data.append('oc_u_table',"pk_machine")
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
             if(res.data.ok==true){this.dialog_rule=false,this.sh_machine(),this.load_status=0,this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
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