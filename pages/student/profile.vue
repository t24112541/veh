
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
          }
        },
        async created(){
          this.sh_profile()
        },
        methods:{
            async sh_profile(){
              let res=await this.$http.post('/student/sh_profile/',{id:this.id})
              // console.log(res.data)
              this.std_name=res.data.datas[0].std_name 
              this.std_lname=res.data.datas[0].std_lname 
              this.std_tel2=res.data.datas[0].std_tel2 
              this.std_tel=res.data.datas[0].std_tel
           
            },
            async profile_update(){
              this.loading=true
              let res=await this.$http.post("/student/profile_update",{
                std_name:this.std_name,
                std_lname:this.std_lname,
                std_tel:this.std_tel,
                std_tel2:this.std_tel2,
                id:this.id,
              })
              this.loading=false
              if(res.data.ok==true){this.sh_profile(),this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            	else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            },
         
        }
    }
</script>