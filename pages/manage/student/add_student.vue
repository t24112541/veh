
<template>
    <v-card @keypress.enter="std_add()">

        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          เพิ่มข้อมูลนักเรียน / นักศึกษา
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
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  placeholder="รหัสประจำตัวนักเรียน / นักศึกษา"
                  name="std_code"
                  v-model="std_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="13"
                  counter
                  prepend-icon="fas fa-id-card fa-2x"
                  placeholder="รหัสประจำตัวประชาชน"
                  name="std_pin_id"
                  v-model="std_pin_id"
                ></v-text-field>
              </v-layout>
            </v-flex>
           
            <v-flex xs12 >
              <v-select
                prepend-icon="fas fa-th"
                :items="item_dep"
                item-value="d_code"
                label="แผนกวิชา"
                placeholder="แผนกวิชา"
                v-model="d_code"
              >
               <template slot="selection" slot-scope="props">
                  {{ props.item.d_name }}
                </template>
                <template slot="item" slot-scope="props">
                  {{ props.item.d_name}}
                </template>
              </v-select>
            </v-flex>
            <v-flex xs12 >
              <v-select
                prepend-icon="fas fa-th"
                :items="filter_group"
                item-value="g_code"
                label="กลุ่มการเรียน"
                placeholder="รหัสกลุ่มการเรียน"
                v-model="g_code"
              >
               <template slot="selection" slot-scope="props">
                  {{ props.item.g_name }}
                </template>
                <template slot="item" slot-scope="props">
                  {{ props.item.g_name}}
                </template>
              </v-select>
            </v-flex>
           <v-flex xs4>
              <v-select
                :items="item_pre_name"
                v-model="std_prename"
                menu-props="auto"
                label="คำนำหน้าชื่อ"
                hide-details
                prepend-icon="fas fa-user"
                ></v-select>
            </v-flex>
            <v-flex xs4 >
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  prepend-icon=""
                  placeholder="ชื่อ"
                  name="std_name"
                  v-model="std_name"
                ></v-text-field>
            </v-flex>
            <v-flex xs4 >
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  prepend-icon=""
                  placeholder="นามสกุล"
                  name="std_lname"
                  v-model="std_lname"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 >
                <v-text-field
                  prepend-icon="fas fa-phone-square"
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  placeholder="เบอร์ติดต่อ"
                  v-model="std_tel"
                ></v-text-field>
            </v-flex>
            <v-flex xs6 >
                <v-text-field
                  prepend-icon="fas fa-phone-square"
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  placeholder="เบอร์ติดต่อผู้ที่สามารถติดต่อได้"
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
                  >

                <v-text-field
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
          <v-btn v-if="load_status==0" flat color="green lighten-2" @click="std_add"
            :disabled="std_code=='' ||std_gender=='' ||std_prename=='' ||std_name=='' ||std_lname=='' ||std_pin_id=='' ||std_birthday=='' ||std_blood=='' || std_tel=='' || std_tel2==''"
          ><i class="fas fa-save fa-2x"></i></v-btn>
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

            std_code:"",
            std_gender:"",
            std_prename:"",
            std_name:"",
            std_lname:"",
            std_pin_id:"",
            std_birthday:"",
            std_blood:"",

            std_tel:"",
            std_tel2:"",

            g_code:"",
            type_api:"",
            danger:false,
            alt_txt:"",

            item_group:[],
            item_dep:[],

            d_code:"",

            bld:['A', 'B', 'O','AB' ],
            item_pre_name:['นาย','นางสาว','นาง',],
            rules: {
                  required: value => !!value || 'ห้ามว่าง.',
                  // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
            },
            modal: false,
            date: null,
            dateFormatted: null,
            menu1: false,

            img:[],
            load_status:"",
          }
        },
        async created(){
          this.sh_group()
          this.sh_dep()
        },
        watch:{
          std_prename(newValue){
            if(newValue=="นาย"){this.std_gender="ช"}else{this.std_gender="ญ"}
          },
          std_birthday (val) {
            this.dateFormatted = this.formatDate(this.std_birthday)
          },
          modal (val) {
            val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
          },
        },
        methods:{
          str(){
            return item_group.g_code
          },
         
          async std_add(){

            const formData = new FormData()
            formData.append('img',this.$refs.img.files[0])

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
            formData.append('u_id',sessionStorage.getItem("username"))
            formData.append('u_table',"pk_student")

            let res= await this.$http.post('student/std_add',formData,{
              onUploadProgress: uploadEvent => {
                this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
              }
            })
            if(res.data.ok==true){this.load_status=0,this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt,this.load_status=0}
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
          async sh_group(){
            let res=await this.$http.get('/group/list/')
            this.item_group=res.data.datas
          },
          async sh_dep(){
            let res=await this.$http.get('/department/list/')
            this.item_dep=res.data.datas
          },
          student(){
                  this.$router.push({name:"manage-student"})
                },
          formatDate (std_birthday) {
            if (!std_birthday) return null

            const [year, month, day] = std_birthday.split('-')
            return `${day}/${month}/${year}`
          },
          parseDate (std_birthday) {
            if (!std_birthday) return null

            const [month, day, year] = std_birthday.split('/')
            return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
          }
        },
        computed: {
          computedDateFormatted () {
            return this.formatDate(this.std_birthday)
          },
          filter_group(){
            return this.item_group.filter(x=>''+x.d_code===this.d_code)
          }
        },

    }
    
</script>