
<template>
    <v-card @keypress.enter="profile_update()">
      
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          แก้ไขข้อมูลส่วนตัว
          <v-spacer></v-spacer>
          <v-btn
            color="green lighten-2"
            flat
            @click="isEditing = !isEditing"
          >
            <i v-if="isEditing" class="fas fa-times fa-2x"></i>
            <i v-else class="fas fa-edit fa-2x "></i>
          </v-btn>
         
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
           
            <v-flex xs6 >
              <v-layout align-center>
                <v-text-field 
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  prepend-icon="fas fa-user fa-2x"
                  maxlength="50"
                  counter
                  label="ชื่อ"
                  v-model="a_name"
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
                  v-model="a_lname"
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
                  v-model="a_tel"
                ></v-text-field>
              </v-layout>
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
        layout: 'manage',
        data () {
          return {
            id:sessionStorage.getItem("id"),
            status:sessionStorage.getItem("status"),
            a_name:"",
            a_lname:"",
            a_tel:"",

            type_api:"",
            danger:false,
            loading:false,
            isEditing:null,
            alt_txt:"",
            stg_password: false,
            rules: {
              required: value => !!value || 'ห้ามว่าง.',
            },
          }
        },
        async created(){
          this.sh_profile()
        },
        methods:{
            async sh_profile(){
              // if(this.status=="pk_admin"){
                let res=await this.$http.post('/admin/sh_profile/',{id:this.id})
              // }
              // else if(this.status=="pk_teacher"){
              //   let res=await this.$http.post('/teacher/sh_profile/',{t_id:this.t_id})
              // }
              // else if(this.status=="pk_student"){
              //   let res=await this.$http.post('/student/sh_profile/',{std_id:this.t_id})
              // }
              console.log(res.data.datas)
              this.a_name=res.data.datas[0].a_name
              this.a_lname=res.data.datas[0].a_lname
              this.a_tel=res.data.datas[0].a_tel
           
            },
            async profile_update(){
              this.loading=true
              let res=await this.$http.post("/admin/profile_update",{
        				a_name:this.a_name,
        				a_lname:this.a_lname,
                a_tel:this.a_tel,
                id:this.id,
              })
              this.loading=false
              if(res.data.ok==true){this.sh_profile(),this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            	else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            },
            teacher(){
              this.$router.push({name:"manage-teacher"})
            }
        }
    }
</script>