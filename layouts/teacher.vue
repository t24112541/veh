<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
          <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
           </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
            >
              <v-list-tile-action v-if="child.icon" >
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
           <v-divider
            v-else-if="item.divider"
            :key="item.divider"
            dark
            class="my-3"
          ></v-divider>
          <v-list-tile v-else :key="item.text" :to="item.link">
            <v-list-tile-action  v-if="!item.avatar">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-avatar v-if="item.avatar">
                  <img :src="item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </template>
      </v-list>
       <v-divider></v-divider>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3" @click="home()">
        <v-toolbar-side-icon><img :src="require('@/static/image/new_logo_white.png')" class="icon_login" style="width:120%"></v-toolbar-side-icon>
        <span class="">CTC Vehicle</span>
      </v-toolbar-title>
 
      <v-spacer></v-spacer>
   
      <v-divider
        class="mx-3"
        inset
        vertical
      ></v-divider>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!--
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
      -->
    </v-toolbar>
    <v-content style="background-color:#cccccc">
      <v-container  xs12 >

            <nuxt/>
 
      </v-container>
    </v-content>
    <!--
    <v-btn
      fab
      bottom
      right
      color="#6c9e37"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      
    </v-dialog>
    -->
  </v-app>
</template>

<script>
  export default {
    
    data: () => ({
      username:sessionStorage.getItem("username"),
      status:sessionStorage.getItem("status"),
      txt_search:"",
      page_search:"",
      noti_sh:true,
      num_noti:'10',
      dialog: false,
      drawer: null,
      img_img:"/files/img/teachers/",
      items: [
      { heading: 'ออนไลน์' },
      
      { avatar:'', text: sessionStorage.getItem("t_name") ,link: '../../teacher/profile'},
      // { divider: true }, ../../teacher/profile
      //   {
      //     icon: 'keyboard_arrow_up',
      //     'icon-alt': 'keyboard_arrow_down',
      //     text: 'รายงาน',
      //     model: false,
      //     children: [
      //     { icon: 'fas fa-book-open', text: 'รายงานการแจ้งหาย' ,link: '../../teacher/student'},
      //     ]
      //   },
      { divider: true },
      { icon: 'fas fa-home', text: 'หน้าแรก' ,link: '../../teacher/home'},
      { icon: 'fas fa-book-open', text: 'การแจ้งหาย' ,link: '../../teacher/missing'},
      { icon: 'fas fa-book-open', text: 'ข้อมูลผิดระเบียบ' ,link: '../../teacher/object_control'},
      { divider: true },
       { heading: 'จัดการข้อมูล' },
        // {
        //   icon: 'keyboard_arrow_up',
        //   'icon-alt': 'keyboard_arrow_down',
        //   text: 'เพิ่มข้อมูล',
        //   model: false,
        //   children: [
        //     { icon:'add' ,text: 'นักเรียน / นักศึกษา' ,link: '../../teacher/student/add_student'},
        //     { icon:'add' ,text: 'ครู / บุคลากร' ,link: '../../teacher/teacher/add_teacher'},
        //     { icon:'add' ,text: 'แผนกวิชา' ,link: '../../teacher/department/dep_add'},
        //     { icon:'add', text: 'กลุ่มการเรียน' ,link: '../../teacher/group/add_group'},
        //     { icon:'add' ,text: 'ยานพาหนะ' ,link: '../../teacher/machines/data_add_machine'},
        //   ]
        // },



        { icon: 'fas fa-users', text: 'กลุ่มการเรียน' ,link: '../../teacher/group'},
        { icon: 'fas fa-motorcycle', text: 'ยานพาหนะ' ,link: '../../teacher/machines'},
        { icon: 'fas fa-wrench', text: 'อุปกรณ์เสริม' ,link: '../../teacher/accessories'},

        { divider: true },
       
        { 
         icon: 'keyboard_arrow_up',
          'icon-alt': 'settings',
          text: 'ตั้งค่า', 
         model: false,
          children: [
            { icon:'fas fa-user-shield' ,text: 'ความปลอดภัย' ,link: '../../teacher/security/security'},

          ]},
        { icon: 'help', text: 'ช่วยเหลือ' },
        { icon: 'fas fa-sign-out-alt', text: 'ออกจากระบบ' ,link:"../../logout"},
        
      ],
      id:"",
    }),
    props: {
      source: String
    },
    created(){
       this.set_session()
       this.set_page()
    },
    beforeCreate() {
      if (!sessionStorage.getItem("username")|| !sessionStorage.getItem("password") || !sessionStorage.getItem("status")){
        this.$router.push({path: '/'})
      }else{

      }
      // if(sessionStorage.getItem("status")!="tch" || sessionStorage.getItem("status")!="bld" ){
      //   this.$router.push({path: '/'})
      // }
  },
  watch:{
    txt_search(val){
      this.search()
      console.log("page_search="+this.page_search)
    }
  },
   methods: {
      async set_page(){
       let res=await this.$http.get('/teacher/sh_teacher/'+sessionStorage.getItem("id"))
       console.log(res.data.image[0].img_img)
        this.items[1].avatar=this.img_img+res.data.image[0].img_img
      },
     home(){
       this.$router.push({name:"teacher-group"})
     },
     set_session(){
       this.id=sessionStorage.getItem("id")
       console.log("id="+this.id)
       console.log("status="+sessionStorage.getItem("status"))
     },
     logout() {
      sessionStorage.removeItem('itemName');
       this.$router.push({path: 'manage'})
    },
      search(){
        console.log("txt_search="+this.txt_search)
      }
    }
  }
</script>
