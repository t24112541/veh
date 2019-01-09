

<template>
  <div >
    
              <v-flex xs4
                @click="$refs.img_font.click()" 
                style="cursor: pointer;"
              >
                <input 
                  type="file" 
                  style="display:none;" 
                  accept="image/*" 
                  multiple  
                  @change="upload_img_font($event)" 
                  ref="img_font"
                >
                <v-card height="100%" class="grey lighten-4 paddign"> 
                  <img :src="this.img_font" width="100%" >
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
    <v-flex xs4 class="text-xs-center" 
                @click="$refs.img_rear.click()" 
                style="cursor: pointer;"
              >
                <input 
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
                        <v-btn flat color="green lighten-2"  @click="machine_add()"><i class="fas fa-save fa-2x"></i></v-btn>
              <div v-if="value!=0">
              <v-progress-circular
               
                :rotate="-90"
                :size="100"
                :width="15"
                :value="value"
                color="primary"
              >
                {{ value }}
              </v-progress-circular>
              </div>
              <v-alert
                v-model="danger"
                dismissible
                :type="type_api"
              >
                {{alt_txt}}
              </v-alert>
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
              <v-btn @click="sh_img()">img</v-btn>
              <router-link to="http://192.168.1.125:34001/img/machine/veh-1546874319889.jpg">Home</router-link>

<img src="/img/machine/veh-1546874319889.jpg">
              <img :src="'/img/machine/veh-1546874319889.jpg'" width="100%">

  </div>
</template>

<script>
  export default {
    data(){
      return {
        img_font:"http://192.168.1.125:34001/img/machine/veh-1546874319889.jpg",
        img_side:[],
        img_rear:[],
        value:0,
        type_api:"",
        danger:false,
        alt_txt:"",
        image:'',
        
      }
    },
    async created(){
      
      this.$http({
          method: 'post',
          url: 'admin/cv',
          // headers: {
          //   'Content-type': 'image/jpeg'
          // },
          // params: {
          //   id: step.id
          // }
      }).then(res => {
        console.log(res.data)
        
        // this.image=res.data
          // this.image = 'data:image/jpg;base64,'.concat(this.image.concat(res.data))            
      })

      // let res=await this.$http.post("admin/cv",{img:"veh-1546874319889.jpg"})
      // this.image=res.data
      //   console.log(res.data)
    },
   

    methods: {
      async sh_img(){
        let res=await this.$http.post("admin/cv",{img:"veh-1546874319889.jpg"})
        console.log(res)
      },
      async machine_add(){
        console.log(this.$refs.img_rear.files[0])
        const formData = new FormData()
        formData.append('img_font',this.$refs.img_font.files[0])
        formData.append('img_side',this.$refs.img_side.files[0])
        formData.append('img_rear',this.$refs.img_rear.files[0])
        let data = await this.$http.post('upload/upload', formData,{
          onUploadProgress: uploadEvent => {
            this.value=Math.round(uploadEvent.loaded / uploadEvent.total*100)
            // console.log(Math.round(uploadEvent.loaded / uploadEvent.total*100))
          }
        })
        
      

      },
               upload_img_font(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_font=e.target.result;
              // console.log(this.img_font);
            };
          },
          upload_img_side(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_side=e.target.result;
              // console.log("this.img_side");
              // console.log(this.img_side);
            };
          },
      upload_img_rear(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_rear=e.target.result;
              // console.log( this.$refs.img_rear.files[0]);
            };
          },
    }
  }
</script>