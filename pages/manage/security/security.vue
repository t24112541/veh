
<template>
    <v-card>
       <v-toolbar tabs>
        <i class="fas fa-shield-alt fa-2x " style="color:#0277BD" ></i>
        <v-toolbar-title>ตั้งค่าความปลอดภัย</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tabs
          slot="extension"
          v-model="tabs"
          fixed-tabs
          color="transparent"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#cv-1" class="primary--text">
            <i class="fas fa-signature fa-2x" style="color:#81C784"></i>
          </v-tab>
          <v-tab href="#cv-2" class="primary--text" >
            <i class="fas fa-lock fa-2x" style="color:#E53935"></i>
          </v-tab>
        </v-tabs>
      </v-toolbar>
  
      <v-tabs-items v-model="tabs" class="white elevation-1">
        <v-tab-item @keypress.enter="security_update('username')"
          :value="'cv-1'"
          :key="'cv-1'"
        >
          <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  label="username"
                  v-model="a_username"
                  class="input-group--focused"
                ></v-text-field>
              </v-layout>
            </v-flex>  
            <v-flex xs12 >
              เมื่อได้ username ที่ต้องการแล้ว ให้กรอก password เพื่อทำการบันทึกข้อมูล
            </v-flex>  
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :append-icon="old_stg_password ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="old_stg_password ? 'text' : 'password'"
                  label="Password"
                  v-model="old_password"
                  class="input-group--focused"
                  @click:append="old_stg_password = !old_stg_password"
                ></v-text-field>
              </v-layout>
            </v-flex>       
            <v-flex xs4 md5 sm5></v-flex>
            <v-flex xs4 md4 sm4>
              <v-progress-circular
              style="margin-left:40px"
                v-if="loading==true"
                v-model="loading"
                :size="25"
                color="primary"
                indeterminate
              ></v-progress-circular>
              <v-btn 
                v-if="loading==false"
                flat color="green lighten-2" @click="security_update('username')" :disabled="!frm_chk_pass">
                <i class="fas fa-save fa-2x"></i>
              </v-btn>
</v-flex>
            <v-flex xs4 md3 sm3></v-flex>   
          </v-layout>
          </v-container>
        </v-tab-item>
        <v-tab-item @keypress.enter="security_update('password')"
          :value="'cv-2'"
          :key="'cv-2'"
        >
          <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :append-icon="old_stg_password ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="old_stg_password ? 'text' : 'password'"
                  label="Password เดิม"
                  v-model="old_password"
                  class="input-group--focused"
                  @click:append="old_stg_password = !old_stg_password"
                ></v-text-field>
              </v-layout>
            </v-flex>      
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :append-icon="stg_password ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="stg_password ? 'text' : 'password'"
                  label="Password ใหม่ที่ต้องการ"
                  v-model="password"
                  class="input-group--focused"
                  @click:append="stg_password = !stg_password"
                ></v-text-field>
              </v-layout>
            </v-flex>      
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :append-icon="stg_password2 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min,rules.confirm_pass]"
                  :type="stg_password2 ? 'text' : 'password'"
                  label="ยืนยัน Password ใหม่ที่ต้องการ"
                  v-model="conf_pass"
                  class="input-group--focused"
                  @click:append="stg_password2 = !stg_password2"
                ></v-text-field>
              </v-layout>
            </v-flex>  
            <v-flex xs4 md5 sm5></v-flex>
            <v-flex xs4 md4 sm4>
              <v-progress-circular
              style="margin-left:40px"
                v-if="loading==true"
                v-model="loading"
                :size="25"
                color="primary"
                indeterminate
              ></v-progress-circular>
              <v-btn 
                v-if="loading==false"
                flat color="green lighten-2" @click="security_update('password')" :disabled="!formIsValid || !frm_chk_pass"
              >
                <i class="fas fa-save fa-2x"></i>
              </v-btn>
</v-flex>
            <v-flex xs4 md3 sm3></v-flex>
          
          
          </v-layout>
          
        </v-container>
        
        </v-tab-item>
        
      </v-tabs-items>
        <v-alert
          v-model="danger"
          dismissible
          :type="type_api"
        >
          {{alt_txt}}
        </v-alert>
         <v-flex xs2 v-if="conf==true">
          <v-dialog  v-model="conf" persistent max-width="290">
            <v-btn slot="activator" color="primary" disabled="true" dark>Open Dialog</v-btn>
            <v-card>
              <v-card-title class="headline">คำเตือน</v-card-title>
              <v-card-text>เมื่อมีการแก้ไขข้อมูลความปลอดภัยต้องทำการเข้าสู่ระบบใหม่</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="logout()">ตกลง</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
    </v-card>
</template>

<script>
    export default {
        layout: 'manage',

        data () {
            return {
              tabs: null,
              
              ola_password:sessionStorage.getItem("password"),
              id:sessionStorage.getItem("id"),
              
              old_stg_password: false,
              stg_password: false,
              stg_password2: false,

              a_username:"",

              old_password:"",
              password:"",
              conf_pass:"",
              
              type_api:"",
              danger:false,
              loading:false,
              conf:false,
              isEditing:null,
              alt_txt:"",
              
              rules: {
                required: value => !!value || 'ห้ามว่าง.',
                // min: v => v.length >= 8 || 'Password ไม่ควรน้อยกว่า 8 ตัวอักษร',
              },
            }
        },
        async created(){
          this.sh_select_id()
        },
        methods:{
            async security_update(cv_set){
              this.loading=true
              if(cv_set=="username"){
                let res=await this.$http.post("/admin/security_update",{
                  a_username:this.a_username,
                  cv_set:cv_set,
                  a_id:this.id,
                })
              }
              else if(cv_set=="password"){
                let res=await this.$http.post("/admin/security_update",{
                  a_password:this.password,
                  cv_set:cv_set,
                  a_id:this.id,
                })
              }
              this.loading=false
              this.conf=true
              console.log(res.data)
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            	else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            
            },
            logout(){
              this.$router.push({path: '/logout'})
            }
        },
        computed: {
          formIsValid () {
            return (this.conf_pass==this.password)
          },
          frm_chk_pass(){
            return this.old_password==this.ola_password
          },
          frm_chk_username(){
            return this.username==''
          },
        },
    }
</script>