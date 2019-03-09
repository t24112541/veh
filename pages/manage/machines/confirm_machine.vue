
<template>
  <div>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">หลักฐานยืนยันการใช้งานจากผู้ปกครอง</h3>
              <div> {{ card_text }} </div>
            </div>
          </v-card-title>
  
          <v-card-actions>
            <!-- <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn> -->
          </v-card-actions>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>
  
          
        </v-card>
  </div>
</template>

<script>
    export default {
        layout: 'manage',

        data () {
            return {
              ms:null,

              mc_id:"",
              mc_code:"",
              mc_brand:"",
              mc_series: '',
              std_code: '',
              mc_u_table:'',

              img_font:"",
              img_side:"",
              img_rear:"",

              link_img:"http://localhost:34001/img/machine/",
              img_font_id:"",
              img_side_id:"",
              img_rear_id:"",

              type_api:"",
              danger:false,
              conf_del:false,
              isEditing:null,
              rules: {
                    // required: value => !!value || 'ห้ามว่าง.',
                    // counter: value => value.length <= 10 || 'เต็ม 10 ตัวอักษร',
              },
              dialog_ms:false,
              img_ms:"",
              ms_detail:"",

              dialog_rule:false,
              load_status:0,
              position:"",

              items_oc_detail:"",
              itm_oc_id:"",
              itm_oc_name_more:false,
              itm_oc_name:"",
              img_oc:"",
              dis_oc:true,

              ctrl_status:"",
              mc_confirm:"",
            }
        },
        async created(){
          this.sh_machine()
          this.sh_object_control()
          this.load_ctrl_status()
        },
        watch:{
          mc_u_table(){
            if(this.mc_u_table=="pk_teacher"){this.position="ครู / บุคลากร"}else{this.position="นักเรียน / นักศึกษา"}
          },
          itm_oc_name_more(){
            if(this.itm_oc_name_more==true){this.dis_oc=true}else{this.dis_oc=false}
          },
        },
        
        methods:{
          async load_ctrl_status(){
            let res=await this.$http.post("/ctrl_edit_data/")
            this.ctrl_status=res.data.datas[0]
          },

          conf_del(){this.conf_del=true},
          async machines_del(){
            let res=await this.$http.post('/machine/machine_del/',{
              mc_code:this.mc_code,
              mc_brand:this.mc_brand,
              mc_series:this.mc_series,
              std_id:this.std_code,
              mc_id:this.$route.query.mc_id,
              u_id:sessionStorage.getItem("username")
            })
            if(res.data.ok==true){this.machine()}
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async sh_machine(){
            let res=await this.$http.get('/machine/sh_machine/'+this.$route.query.mc_id)
            this.mc_id=this.$route.query.mc_id
            this.mc_code=res.data.datas[0].mc_code
            this.mc_brand=res.data.datas[0].mc_brand
            this.mc_series=res.data.datas[0].mc_series
            this.std_prename=res.data.datas[0].std_prename
            this.std_code=res.data.datas[0].std_code
            this.std_name=res.data.datas[0].std_name
            this.std_lastname=res.data.datas[0].std_lastname
            this.mc_u_table=res.data.datas[0].mc_u_table
            this.mc_confirm=res.data.datas[0].mc_confirm

            this.img_font=this.link_img+res.data.datas[0].img_img
            this.img_font_id=res.data.datas[0].img_id

            this.img_side=this.link_img+res.data.datas[1].img_img
            this.img_side_id=res.data.datas[1].img_id

            this.img_rear=this.link_img+res.data.datas[2].img_img
            this.img_rear_id=res.data.datas[2].img_id
          },
          async sh_object_control(){
            let res=await this.$http.get('/object_control/item_object_control')
            console.log(res.data.datas)
            this.items_oc_detail=res.data.datas
          },
          async machine_update(mc_id){console.log("1")
            const formData = new FormData()
              formData.append('mc_id',this.mc_id)
              formData.append('mc_code',this.mc_code)
              formData.append('mc_brand',this.mc_brand)
              formData.append('mc_series',this.mc_series)
              formData.append('std_id',this.std_code)
              formData.append('u_id',sessionStorage.getItem("username"))

              formData.append('img_font-'+this.img_font_id,this.$refs.img_font.files[0])
              formData.append('img_side-'+this.img_side_id,this.$refs.img_side.files[0])
              formData.append('img_rear-'+this.img_rear_id,this.$refs.img_rear.files[0])

              let res=await this.$http.post("/machine/machine_update",formData,{
                onUploadProgress: uploadEvent => {
                  this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
                }
              })
            if(res.data.ok==true){this.load_status=0,this.sh_machine(),this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
            else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          machine(){
            this.$router.push({name:"manage-machines"})
          },
          async missing(mc_id){
            const formData = new FormData()
            formData.append('img_ms',this.$refs.img_ms.files[0])
            formData.append('u_id',this.mc_id)
            formData.append('ms_table',"pk_machine")
            formData.append('ms_u_id',sessionStorage.getItem("username"))
            formData.append('ms_u_table',sessionStorage.getItem("status"))
            formData.append('ms_status',"ขั้นที่ 1 รอรับเรื่อง")
            formData.append('ms_detail',this.ms_detail)
            let res=await this.$http.post("/missing/missing",formData,{
              onUploadProgress: uploadEvent => {
                this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
              }
            })
             if(res.data.ok==true){this.dialog_ms=false,this.sh_machine(),this.load_status=0,this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
             else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          async object_control(mc_id){
            const data = new FormData()
            data.append('img_oc',this.$refs.img_oc.files[0])
            data.append('oc_u_id',mc_id)
            data.append('oc_u_table',"pk_machine")
            data.append('oc_oc_u_id',sessionStorage.getItem("username"))
            data.append('oc_oc_u_table',sessionStorage.getItem("status"))
            

            if(this.itm_oc_name_more===true){
              
              let res=await this.$http.post("/object_control/add_item_object_control",{
                itm_oc_name:this.itm_oc_name
              })
              // this.itm_oc_id=res.data.itm
              data.append('itm_oc_id',res.data.itm)
            }else{
              data.append('itm_oc_id',this.itm_oc_id)
            }
          
            let res=await this.$http.post("/object_control/add_object_control",data,{
              onUploadProgress: uploadEvent => {
                this.load_status=Math.round(uploadEvent.loaded / uploadEvent.total*100)
              }
            })
             if(res.data.ok==true){this.dialog_rule=false,this.sh_machine(),this.load_status=0,this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
             else{this.danger=true,this.alt_txt=res.data.txt,this.type_api=res.data.alt}
          },
          upload_img_ms(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_ms=e.target.result;
              console.log(this.img_ms);
            };
          },
          upload_img_font(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_font=e.target.result;
              console.log(this.img_font);
            };
          },
          upload_img_side(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_side=e.target.result;
              // console.log("this.img_side");
              console.log(this.img_side);
            };
          },
          upload_img_rear(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_rear=e.target.result;
              console.log(this.img_rear);
            };
          },
          upload_img_oc(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{              
              this.img_oc=e.target.result;
              console.log(this.img_oc);
            };
          },
        }
    }
</script>