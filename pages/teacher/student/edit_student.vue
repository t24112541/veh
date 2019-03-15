
<template>
    <v-card @keypress.enter="std_update(std_id)">
      
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
        <v-flex xs10 >
          แก้ไขข้อมูลนักเรียน / นักศึกษา
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
        
          
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs4></v-flex>
            <v-flex xs4 class="text-xs-center" 
                @click="$refs.img.click()" 
                style="cursor: pointer;"
              >
                <input 
                  type="file" 
                  style="display:none;" 
                  accept="image/*" 
                  multiple  
                  @change="upload_img($event)" 
                  ref="img"
                >
                <v-card height="100%" class="grey lighten-4 paddign" > 
                  <img :src="this.img" width="100%">
                  <v-card-actions style="font-size:100%">
                    <span><i class="fas fa-image fa-2x"></i></span>
                    <v-spacer></v-spacer>
                    <span>รูปภาพ</span>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs4></v-flex>
            <span class="headline">{{d_name}} กลุ่ม {{g_name}}</span>
            
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="true"
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  placeholder="รหัสประจำตัวนักเรียน / นักศึกษา"
                  label="รหัสประจำตัวนักเรียน / นักศึกษา"
                  name="std_code"
                  v-model="std_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :disabled="true"
                  prepend-icon="fas fa-id-card fa-2x"
                  placeholder="รหัสประจำตัวประชาชน"
                  label="รหัสประจำตัวประชาชน"
                  name="std_pin_id"
                  v-model="std_pin_id"
                ></v-text-field>
              </v-layout>
            </v-flex>
            
           <v-flex xs4>
              <v-select 
                :disabled="!isEditing"
                :items="item_std_prename"
                v-model="std_prename"
                menu-props="auto"
                label="คำนำหน้าชื่อ"
                hide-details
                prepend-icon="fas fa-user"
                
                ></v-select>
            </v-flex>
            <v-flex xs4 >
                <v-text-field
                  :disabled="!isEditing"
                  prepend-icon=""
                  placeholder="ชื่อ"
                  label="ชื่อ"
                  name="std_name"
                  v-model="std_name"
                ></v-text-field>
            </v-flex>
            <v-flex xs4 >
                <v-text-field
                  :disabled="!isEditing"
                  prepend-icon=""
                  placeholder="นามสกุล"
                  label="นามสกุล"
                  name="std_lname"
                  v-model="std_lname"
                ></v-text-field>
            </v-flex>
             <v-flex xs6 >
                <v-text-field
                  prepend-icon="fas fa-phone-square"
                  :disabled="!isEditing"
                  maxlength="10"
                  counter
                  placeholder="เบอร์ติดต่อ"
                  label="เบอร์ติดต่อ"
                  v-model="std_tel"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 >
                <v-text-field
                  prepend-icon="fas fa-phone-square"
                  :disabled="!isEditing"
                  maxlength="10"
                  counter
                  placeholder="เบอร์ติดต่อผู้ที่สามารถติดต่อได้"
                  label="เบอร์ติดต่อผู้ที่สามารถติดต่อได้"
                  v-model="std_tel2"
                ></v-text-field>
            </v-flex>
          
            <v-flex xs12>

             <v-dialog
                    ref="modal"
                    v-model="modal"
                    :return-value.sync="std_birthday"
                    persistent
                    lazy
                    full-width
                    width="290px"
                    :disabled="!isEditing"
                  >

                <v-text-field
                  :disabled="!isEditing"
                  slot="activator"
                  v-model="dateFormatted"
                  label="วัน/เดือน/ปีเกิด"
                  prepend-icon="fas fa-birthday-cake"
                  @blur="date = parseDate(dateFormatted)"
                  hint="วัน/เดือน/ปีเกิด"
                  persistent-hint
                ></v-text-field>
                <v-date-picker
                  locale="th"             
                  ref="picker"
                  v-model="std_birthday"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                >
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal = false">ยกเลิก</v-btn>
                      <v-btn flat color="primary" @click="$refs.modal.save(std_birthday)">ตกลง</v-btn></v-date-picker>
              </v-dialog>

            </v-flex>

            <v-flex xs6>
              <v-select
                :disabled="!isEditing"
                :items="bld"
                v-model="std_blood"
                menu-props="auto"
                hide-details
                label="กรุ๊ปเลือด"
                prepend-icon="fas fa-hospital"
              
              ></v-select>
            </v-flex>
            <!-- /////////////////////// machine /////////////////////////////// -->
             <v-flex xs12 md12 lg12>
              <v-card-title class="cyan darken-1">
              <span class="subheading white--text">พาหนะ</span>
              </v-card-title>
                <v-layout row wrap>
                <v-flex xs6 md4 lg4 v-for="mc in machine" :key="mc.mc_id" style="padding:10px;cursor: pointer;"
                  @click="list_machine(mc.mc_id)"
                >
                <v-card>
                  <v-img
                    :src="mc.t_status"
                    aspect-ratio="2.75"
                  ></v-img>
          
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">{{mc.mc_code}}</h3>
                      <div>{{mc.mc_brand}} <br>{{mc.mc_series}}</div>
                    </div>
                  </v-card-title>
          
                  <!-- <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                  </v-card-actions> -->
                </v-card>
                </v-flex>
                </v-layout>
            </v-flex> 
<!-- //////////////////////   accessories //////////////////////////////// -->
            <v-flex xs12 md12 lg12>
              <v-card-title class="cyan darken-1">
              <span class="subheading white--text">อุปกรณ์</span>
              </v-card-title>
                <v-layout row wrap>
                <v-flex xs6 md4 lg4 v-for="ac in accessories" :key="ac.ac_id" style="padding:10px;cursor: pointer;"
                  @click="list_accessories(ac.ac_id)"
                >
                <v-card>
                  <v-img
                    :src="ac.t_status"
                    aspect-ratio="2.75"
                  ></v-img>
          
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">{{ac.ac_name}}</h3>
                      <div>{{ac.ac_description}}</div>
                    </div>
                  </v-card-title>
          
                  <!-- <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                  </v-card-actions> -->
                </v-card>
                </v-flex>
                </v-layout>
            </v-flex> 

          </v-layout>
        </v-container>
        <v-card-actions>
          
          
          <v-btn flat color="red lighten-2" @click="student()"><i class="fas fa-arrow-circle-left fa-2x"></i></v-btn>
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
          <v-btn v-if="load_status==0" flat color="green lighten-2" 
          :disabled="!isEditing || std_code=='' ||std_gender=='' ||std_prename=='' ||std_name=='' ||std_lname=='' ||std_pin_id=='' ||std_birthday=='' ||std_blood=='' || std_tel=='' || std_tel2==''" 
          @click="std_update(std_id)"><i class="fas fa-save fa-2x"></i></v-btn>
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
            std_id:"",
            std_code:'',
            std_pin_id:"",
            std_prename:"",
            std_name:"",
            std_lname:"",
            std_birthday:"",
            std_blood: '',
            std_gender:'',
            g_code:"",
            g_name:"",
            d_name:"",
            
            std_tel:"",
            std_tel2:"",

            type_api:"",
            danger:false,
            alt_txt:"",
            conf_del:false,
            isEditing:null,
            bld:['A', 'B', 'O','AB'],
            gd:[{text:'ชาย',value:"ช"},{text:'หญิง',value:"ญ"}],
            item_std_prename:['นาย','นางสาว','นาง',],
            modal: false,
            date: null,

            menu1: false,

            img:[],
            load_status:"",
            link_img:"http://localhost:9090/img/users/",
            img_id:"",

            machine:"",
            link_img_mc:"http://localhost:9090/img/machine/",
            accessories:"",
            link_img_ac:"http://localhost:9090/img/accessories/",

            ctrl_status:"",
          }
        },
        async created(){
          this.sh_std()
          this.load_ctrl_status()
        },
        watch:{
          std_prename(newValue){
            if(newValue=="นาย"){this.std_gender="ช"}else{this.std_gender="ญ"}
          },
          std_birthday (val) {
            this.dateFormatted = this.formatDate(this.std_birthday)
          },
        },
        methods:{
          async load_ctrl_status(){
            let res=await this.$http.post("/ctrl_edit_data/")
            this.ctrl_status=res.data.datas[0]
          },
          formatDate (std_birthday) {
            if (!std_birthday) return null

            const [year, month, day] = std_birthday.split('-')
            return `${day}/${month}/${year}`
          },
          parseDate (std_birthday) {
            if (!std_birthday) return null

            const [month, day, year] = std_birthday.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
          },
            conf_del(){this.conf_del=true},
            async std_del(std_id){
              let res=await this.$http.post('/student/std_del/',{
                std_code:this.std_code,
        				std_pin_id:this.std_pin_id,
        				std_prename:this.std_prename,
        				std_name:this.std_name,
        				std_lname:this.std_lname,
        				std_birthday:this.std_birthday,
        				std_gender:this.std_gender,
        				std_blood:this.std_blood,
                g_code:this.g_code,
                  
                std_tel:this.std_tel,
                std_tel2:this.std_tel2,

                std_id:std_id,
                u_id:sessionStorage.getItem("username")
              })
              if(res.data.ok==true){
                this.conf_del=false
                this.$router.push({name:"teacher-student"})
              }
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            },
            async sh_std(){
              let res=await this.$http.get('/student/sh_std/'+this.$route.query.std_id)
              this.std_id=this.$route.query.std_id
              this.std=res.data.datas
              this.std_code=res.data.datas.std_code
              this.std_pin_id=res.data.datas.std_pin_id
              this.std_prename=res.data.datas.std_prename
              this.std_name=res.data.datas.std_name
              this.std_lname=res.data.datas.std_lname
              this.std_birthday=res.data.datas.std_birthday
              this.std_gender=res.data.datas.std_gender
              this.std_blood=res.data.datas.std_blood
              this.g_code=res.data.datas.g_code
              this.g_name=res.data.datas.g_name
              this.d_name=res.data.datas.d_name

              this.std_tel=res.data.datas.std_tel
              this.std_tel2=res.data.datas.std_tel2
              this.machine=res.data.machine
              this.accessories=res.data.accessories
              this.img=this.link_img+res.data.img[0].img_img
              this.img_id=res.data.img[0].img_id
              // console.log(res.data.img[0].img_img)

            },
            async std_update(std_id){
              const formData = new FormData()
              formData.append('img-'+this.img_id,this.$refs.img.files[0])

              formData.append('std_code',this.std_code)
              formData.append('std_gender',this.std_gender)
              formData.append('std_prename',this.std_prename)
              formData.append('std_name',this.std_name)
              formData.append('std_lname',this.std_lname)
              formData.append('std_pin_id',this.std_pin_id)
              formData.append('std_birthday',this.std_birthday)
              formData.append('std_blood',this.std_blood)
              formData.append('g_code',this.g_code)
              formData.append('std_tel',this.std_tel)
              formData.append('std_tel2',this.std_tel2)
              formData.append('std_id',this.std_id)
              formData.append('u_id',sessionStorage.getItem("username"))
              

              let res=await this.$http.post("/student/std_update",formData,{
                onUploadProgress: uploadEvent => {
                  this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
                }
              })
                if(res.data.ok==true){
                  this.load_status=0,
                  this.sh_std(),
                  this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt
                }
            	 else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            },
            student(){
              this.$router.push({name:"teacher-student"})
            },
            upload_img(e){
              const image = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = e =>{              
                this.img=e.target.result;
                // console.log(this.img_side);
              };
            },
            list_machine(mc_id){
              this.$router.push({path: '../../teacher/machines/edit_machine?mc_id='+mc_id})
            },
            list_accessories(ac_id){
              this.$router.push({path: '../../teacher/accessories/edit_accessories?ac_id='+ac_id})
            },
        },//methods
        computed: {
          computedDateFormatted () {
            return this.formatDate(this.std_birthday)
          }
        },
       
    }
</script>