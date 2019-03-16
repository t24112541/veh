
<template>
    <v-card @keypress.enter="profile_update()">
      
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          แก้ไขข้อมูลส่วนตัว
          <v-spacer></v-spacer>
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
                :disabled="!isEditing"
              >
                <input 
                  :disabled="!isEditing"
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
            <v-flex xs6 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  prepend-icon="fas fa-user fa-2x"
                  maxlength="50"
                  counter
                  label="ชื่อ"
                  v-model="std_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  prepend-icon="fas fa-user fa-2x"
                  maxlength="50"
                  counter
                  label="นามสกุล"
                  v-model="std_lname"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-phone-square fa-2x"
                  label="เบอร์โทรศัพท์"
                  v-model="std_tel"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-phone-square fa-2x"
                  label="เบอร์โทรศัพท์ญาติพี่น้องที่สามารถติดต่อได้"
                  v-model="std_tel2"
                ></v-text-field>
              </v-layout>
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
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-spacer></v-spacer>
          <v-progress-circular
            v-if="loading==true"
            v-model="loading"
            :size="25"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <v-spacer></v-spacer>
          <v-btn flat color="green lighten-2" :disabled="!isEditing" @click="profile_update()"><i class="fas fa-save fa-2x"></i></v-btn>
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
        layout: 'student',
        data () {
          return {
            id:sessionStorage.getItem("id"),
            status:sessionStorage.getItem("status"),
            std_name:"",
            std_lname:"",
            std_tel:"",
            std_tel2:"",

            type_api:"",
            danger:false,
            loading:false,
            isEditing:null,
            alt_txt:"",
            rules: {
              required: value => !!value || 'ห้ามว่าง.',
            },

            ctrl_status:"",

            img:[],
            load_status:"",
            link_img:"/files/img/users/",
            img_id:"",
            load_status:0,

            bld:['A', 'B', 'O','AB'],
            std_birthday:"",
            modal: false,
            date: null,
            menu1: false,
          }
        },
        async created(){
          this.sh_profile()
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
          formatDate (std_birthday) {
            if (!std_birthday) return null

            const [year, month, day] = std_birthday.split('-')
            return `${day}/${month}/${year}`
          },
          parseDate (std_birthday) {
            if (!std_birthday) return null

            const [month, day, year] = std_birthday.split('/')
            return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
          },
          async load_ctrl_status(){
            let res=await this.$http.post("/ctrl_edit_data/")
            this.ctrl_status=res.data.datas[0]
          },
            async sh_profile(){
              let res=await this.$http.post('/student/sh_profile/',{id:this.id})
              // console.log(res.data.datas[0].std_birthday)
              this.std_name=res.data.datas[0].std_name 
              this.std_lname=res.data.datas[0].std_lname 
              this.std_tel2=res.data.datas[0].std_tel2 
              this.std_tel=res.data.datas[0].std_tel
              this.std_blood=res.data.datas[0].std_blood
              this.std_birthday=res.data.datas[0].std_birthday

              this.img=this.link_img+res.data.image[0].img_img
              this.img_id=res.data.image[0].img_id
           
            },
            async profile_update(){
              this.loading=true
              const formData = new FormData()
                formData.append('img-'+this.img_id,this.$refs.img.files[0])

                formData.append('std_name',this.std_name)
                formData.append('std_lname',this.std_lname)
                formData.append('std_tel',this.std_tel)
                formData.append('std_tel2',this.std_tel2)
                formData.append('std_birthday',this.std_birthday)
                formData.append('std_blood',this.std_blood)
                formData.append('id',this.id)

              let res=await this.$http.post("/student/profile_update",formData,{
                  onUploadProgress: uploadEvent => {
                    this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
                  }
              })
              this.loading=false
              if(res.data.ok==true){this.sh_profile(),this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            	else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
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
         
        },
        computed: {
          computedDateFormatted () {
            return this.formatDate(this.std_birthday)
          }
        },
    }
</script>