
<template>
    <v-card>
      
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          ลงทะเบียนใช้งาน Smart Plug
          <v-spacer></v-spacer>
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>

            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  
                  :rules="[rules.required]"
                  maxlength="50"
                  counter
                  prepend-icon="fas fa-id-card-alt fa-2x"
                  placeholder="ทะเบียนรถ"
                  name="u_fullname"
                  v-model="u_fullname"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  
                  :rules="[rules.required]"
                  maxlength="100"
                  counter
                  placeholder="แบรนด์รถ"
                  prepend-icon="fas fa-car"
                  name="u_username"
                  v-model="u_username"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="100"
                  counter
                  prepend-icon="fas fa-tachometer-alt"
                  placeholder="รุ่นรถ"
                  name="u_password"
                  v-model="u_password"
                ></v-text-field>
              </v-layout>
            </v-flex>

           
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-btn flat color="red lighten-2" @click="user()"><i class="fas fa-arrow-circle-left fa-2x"></i></v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="green lighten-2"  @click="user_add()"><i class="fas fa-save fa-2x"></i></v-btn>
        </v-card-actions>
        
    </v-card>
</template>

<style>
   .uploading-image{
     display:flex;
   }
 </style>
<script>
    export default {
        layout: 'student',
        data () {
            return {
                u_fullname:"",
                u_username:"",
                u_password:"",
                u_tel:"",
                isEditing:null,
                rules: {
                    required: value => !!value || 'ห้ามว่าง.',
                    counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
                },
            } 
        },
        methods:{
           async user_add(){
            if(this.u_fullname!='' && this.u_username!=''&& this.u_password!=''&&this.u_tel!=''){
              let res=await this.$http.post("user/user_add",{
                u_fullname:this.u_fullname,
                u_username:this.u_username,
                u_password:this.u_password,
                u_tel:this.u_tel,

              })
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt
              this.user()}
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            }else{this.danger=true,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error"}
          },
          user(){
            this.$router.push({name:""})
          },

        }
    }
</script>