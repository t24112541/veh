
<template>
    <v-card @keypress.enter="group_add()">
      
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          เพิ่มข้อมูลกลุ่ม    

        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="10"
                  counter
                  prepend-icon="fas fa-credit-card"
                  placeholder="รหัสกลุ่ม"
                  name="g_code"
                  v-model="g_code"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  :rules="[rules.required]"
                  maxlength="100"
                  counter
                  prepend-icon="fas fa-users"
                  placeholder="ชื่อกลุ่มการเียน"
                  name="g_name"
                  v-model="g_name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 >
              <v-select
                prepend-icon="fas fa-th"
                :items="department"
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
            <!-- <v-flex xs12 >
              <v-layout align-center>
                <v-text-field
                  maxlength="255"
                  counter
                  prepend-icon="fas fa-credit-card"
                  placeholder="รหัสแผนก"
                  name="d_code"
                  v-model="d_code"
                ></v-text-field>
              </v-layout>
            </v-flex> -->
           
          </v-layout>
        </v-container>
        <v-card-actions>
          
          <v-btn flat color="red lighten-2" @click="group()"><i class="fas fa-arrow-circle-left fa-2x"></i></v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="green lighten-2" @click="group_add()"><i class="fas fa-save fa-2x"></i></v-btn>
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
            g_code:"",
            g_name:"",
            d_code: '',
            type_api:"",
            danger:false,
            conf_del:false,
            rules: {
                  required: value => !!value || 'ห้ามว่าง.',
                  // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
            },
            department:[],
          }
        },
        created(){
          this.sh_department()
        },
        methods:{
          async sh_department(){
            let res=await this.$http.get("department/list")
            this.department=res.data.datas
          },
          async group_add(){
            if(this.g_code!='' && this.g_name!='' && this.d_code!=''){
              let res=await this.$http.post("group/group_add",{
                g_code:this.g_code,
                g_name:this.g_name,
                d_code:this.d_code,
                u_id:sessionStorage.getItem("username")
              })
              if(res.data.ok==true){this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt,
                this.$router.push({name:"manage-group"})
              }
              else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            }else{this.danger=true,this.alt_txt="กรุณากรอกข้อมูลให้ครบ",this.type_api="error"}
          },
          group(){
            this.$router.push({name:"manage-group"})
          },
        }
    }
</script>