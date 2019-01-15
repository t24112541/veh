
<template>
    <v-card>
      
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
        <v-flex xs7 >
          แก้ไขข้ออุปกรณ์
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
                 <i class="fas fa-user fa-2x"></i>เจ้าของพาหนะ: <v-spacer></v-spacer>{{u_name}} <v-spacer></v-spacer>ตำแหน่ง:{{position}}
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
           
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-btn flat color="red lighten-2" @click="accessories()"><i class="fas fa-arrow-circle-left fa-2x"></i></v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="orange accent-4" @click="missing(ac_id)" >
            <v-flex xs12>
              <i class="fas fa-exclamation fa-2x"></i>
            </v-flex>
            <v-flex xs12>
              แจ้งอุปกรณ์สูญหาย
            </v-flex>
            
          </v-btn>
          <v-spacer></v-spacer>
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
              link_img:"http://localhost:34001/img/accessories/",
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
              load_status:0,
              position:"",
            }
        },
        async created(){
          this.sh_accessories()
        },
        watch:{
          ac_u_table(){
            if(this.ac_u_table=="pk_teacher"){this.position="ครู / บุคลากร"}else{this.position="นักเรียน / นักศึกษา"}
          },
        },
        methods:{
          async sh_user(ac_u_id){
            if(this.ac_u_table=="pk_teacher"){
              let res=await this.$http.post('/teacher/t_id/',{
                t_code:this.ac_u_id,
              })
              this.$router.push({path: '../../manage/teacher/edit_teacher?t_id='+res.data.datas[0].t_id})
            }
            else if(this.ac_u_table=="pk_student"){
              let res=await this.$http.post('/student/std_id/',{
                std_code:this.ac_u_id,
              })
              this.$router.push({path: '../../manage/student/edit_student?std_id='+res.data.datas[0].std_id})
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
            console.log(res.data.datas)
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
            this.$router.push({name:"manage-accessories"})
          },
          async missing(ac_id){
            let res=await this.$http.post("/missing/missing",{
              u_id:ac_id,
              ms_table:"pk_accessories",
              ms_u_id:sessionStorage.getItem("username"),
              ms_u_table:sessionStorage.getItem("status"),
              ms_status:"ขั้นที่ 1 รอรับเรื่อง",
            })
             if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt,this.sh_machine()}
             else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
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
        }
    }
</script>