<template>
<div >
  <v-app id="">
    <v-container grid-list-md >
      <v-layout row wrap>
<!-- /////////////////////////////  machine /////////////////////////////////////// -->
        <v-flex xs12 sm4 md4 style="padding-top:20px" >
            <v-card
              class="mt-3 mx-auto"
              
            >
              <v-sheet
                class="v-sheet--offset mx-auto text-xs-center display-1 font-weight-thin"
                color="#4caf50"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
                <v-card-text style="color:#f1f1f1">
                {{filter_machine}}
                </v-card-text>
              </v-sheet>
          
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">พาหนะทั้งหมด</div>
                <div class="subheading font-weight-light grey--text">ในระบบ</div>
                <v-divider class="my-2"></v-divider>
                <i style="color:#d8d8d8" color="red" class="fas fa-clock fa-1x"></i>
              
                <v-btn
                  :loading="loading3"
                  :disabled="loading3"
                  color="blue-grey"
                  class="white--text"
                  @click="loader = 'loading3' && sh_machine()"
                >
                  แสดงพาหนะ 
                  <i class="fas fa-external-link-alt fa-1x"></i>
                </v-btn>
                <span class="caption grey--text font-weight-light"></span>
              </v-card-text>
            </v-card>
          </v-flex>
          <!-- //////////////////////////////////////////////////// -->
          <v-flex xs12 sm4 md4 style="padding-top:20px">
            <v-card
              class="mt-3 mx-auto"
              
            >
            
              <v-sheet
                class="v-sheet--offset mx-auto text-xs-center display-1 font-weight-thin"
                color="#f13518"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
              
                <v-card-text style="color:#f1f1f1">
                {{filter_pk_missing_where_machine}}
                </v-card-text>
              </v-sheet>
          
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">สูญหาย</div>
                <div class="subheading font-weight-light grey--text">กำลังดำเนินการ {{filter_pk_missing_where_machine_stp2}}</div>
                <v-divider class="my-2"></v-divider>
                <i style="color:#d8d8d8" color="red" class="fas fa-clock fa-1x"></i>
                <span class="caption grey--text font-weight-light"></span>
                <v-btn
                  :loading="loading3"
                  :disabled="loading3"
                  color="blue-grey"
                  class="white--text"
                  @click="loader = 'loading3' && sh_missing_machine()"
                >
                  แสดงการสูญหาย 
                  <i class="fas fa-external-link-alt fa-1x"></i>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-flex>
          <!-- //////////////////////////////////////////////////// -->
          <v-flex xs12 sm4 md4 style="padding-top:20px">
            <v-card
              class="mt-3 mx-auto"
              
            >
              <v-sheet
                class="v-sheet--offset mx-auto text-xs-center display-1 font-weight-thin"
                color="#ff6d00"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
                <v-card-text style="color:#f1f1f1">
                {{filter_pk_object_control_where_machine}} 
                </v-card-text>
              </v-sheet>
          
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">ผิดระเบียบ</div>
                <div class="subheading font-weight-light grey--text">รอการตรวจสอบ {{filter_pk_object_control_where_machine_2}}</div>
                <v-divider class="my-2"></v-divider>
                <i style="color:#d8d8d8" color="red" class="fas fa-clock fa-1x"></i>
                <span class="caption grey--text font-weight-light"></span>
                <v-btn
                  :loading="loading3"
                  :disabled="loading3"
                  color="blue-grey"
                  class="white--text"
                  @click="loader = 'loading3' && sh_object_control_machine()"
                >
                  แสดงข้อมูลผิดระเบียบ 
                  <i class="fas fa-external-link-alt fa-1x"></i>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12><v-divider class="my-2"></v-divider></v-flex>
          
<!-- /////////////////////////////  accessories /////////////////////////////////////// -->
          <v-flex xs12 sm4 md4 style="padding-top:20px" >
            <v-card
              class="mt-3 mx-auto"
              
            >
              <v-sheet
                class="v-sheet--offset mx-auto text-xs-center display-1 font-weight-thin"
                color="#4caf50"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
                <v-card-text style="color:#f1f1f1">
                {{filter_accessories}}
                </v-card-text>
              </v-sheet>
          
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">อุปกรณ์ทั้งหมด</div>
                <div class="subheading font-weight-light grey--text">ในระบบ</div>
                <v-divider class="my-2"></v-divider>
                <i style="color:#d8d8d8" color="red" class="fas fa-clock fa-1x"></i>
                <span class="caption grey--text font-weight-light"></span>
                <v-btn
                  :loading="loading3"
                  :disabled="loading3"
                  color="blue-grey"
                  class="white--text"
                  @click="loader = 'loading3' && sh_accessories()"
                >
                  แสดงพาหนะ 
                  <i class="fas fa-external-link-alt fa-1x"></i>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-flex>
          <!-- //////////////////////////////////////////////////// -->
          <v-flex xs12 sm4 md4 style="padding-top:20px">
            <v-card
              class="mt-3 mx-auto"
              
            >
            
              <v-sheet
                class="v-sheet--offset mx-auto text-xs-center display-1 font-weight-thin"
                color="#f13518"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
              
                <v-card-text style="color:#f1f1f1">
                {{filter_pk_missing_where_accessories}}
                </v-card-text>
              </v-sheet>
          
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">สูญหาย</div>
                <div class="subheading font-weight-light grey--text">กำลังดำเนินการ {{filter_pk_missing_where_accessories_stp2}}</div>
                <v-divider class="my-2"></v-divider>
                <i style="color:#d8d8d8" color="red" class="fas fa-clock fa-1x"></i>
                <span class="caption grey--text font-weight-light"></span>
                <v-btn
                  :loading="loading3"
                  :disabled="loading3"
                  color="blue-grey"
                  class="white--text"
                  @click="loader = 'loading3' && sh_missing_machine()"
                >
                  แสดงการสูญหาย 
                  <i class="fas fa-external-link-alt fa-1x"></i>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-flex>
          <!-- //////////////////////////////////////////////////// -->
          <v-flex xs12 sm4 md4 style="padding-top:20px">
            <v-card
              class="mt-3 mx-auto"
              
            >
              <v-sheet
                class="v-sheet--offset mx-auto text-xs-center display-1 font-weight-thin"
                color="#ff6d00"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
                <v-card-text style="color:#f1f1f1">
                {{filter_pk_object_control_where_accessories}} 
                </v-card-text>
              </v-sheet>
          
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">ผิดระเบียบ</div>
                <div class="subheading font-weight-light grey--text">รอการตรวจสอบ {{filter_pk_object_control_where_accessories_2}}</div>
                <v-divider class="my-2"></v-divider>
                <i style="color:#d8d8d8" color="red" class="fas fa-clock fa-1x"></i>
                <span class="caption grey--text font-weight-light"></span>
                <v-btn
                  :loading="loading3"
                  :disabled="loading3"
                  color="blue-grey"
                  class="white--text"
                  @click="loader = 'loading3' && sh_object_control_machine()"
                >
                  แสดงข้อมูลผิดระเบียบ 
                  <i class="fas fa-external-link-alt fa-1x"></i>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12><v-divider class="my-2"></v-divider></v-flex>
          <v-flex xs12 sm12 md12 style="padding-top:20px">
            <v-card class="mt-3 mx-auto">
              <canvas id="ms_and_oc_chart" width="100%" height="50%" ></canvas>
            </v-card>
          </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</div>

</template>

<script>
import Chart from 'chart.js'

export default {
  
  layout: 'manage',
  data () {
    return {

      missing:"",
      machine:"",
      accessories:"",
      object_control:"",

      chart_mc:"",
      chart_data_ms:[],

      chart_oc:"",
      chart_data_oc:[],
      loader: null,
      loading3: false,

      test_filter:[],

    }
  },
  created(){
    this.sh_mis()
    
  },
  methods:{
    sh_machine(){
      this.$router.push({path: '../../manage/machines/'})
    },
    sh_missing_machine(){
      this.$router.push({path: '../../manage/missing/'})
    },
    sh_object_control_machine(){
      this.$router.push({path: '../../manage/object_control/'})
    },
    sh_accessories(){
      this.$router.push({path: '../../manage/accessories/'})
    },
    async sh_mis(){
      let res= await this.$http.post("/dashboard/missing_chart")
      this.machine=res.data.pk_machine_all 
      this.accessories=res.data.pk_accessories_all 
      this.missing=res.data.pk_missing_all
      this.object_control=res.data.pk_object_control_all

      this.chart_mc=res.data.chart_ms
      this.chart_oc=res.data.chart_oc
      this.test_filter=
      console.log(res.data.pk_missing_all[3].ms_date.split("-")[1].substring(1,2))
        let sh=[]
        for(let i=0;i<this.chart_mc.length;i++){
              sh.push(this.chart_mc[i].num)
        }
        let sh_oc=[]
        for(let i=0;i<this.chart_oc.length;i++){
              sh_oc.push(this.chart_oc[i].num)
        }

        let sh_mis=[]
        for(let m=1;m<=12;m++){
          console.log(m.toString().length)
          // for(let i=0;i<this.missing.length;i++){
          //   console.log(this.missing[i].ms_date.split("-,0").substr(0, 1))
          //   if(this.missing[i].ms_date.split("-")[1]+''===m ){
          //     sh_mis.push(this.missing[i])
          //   }
          // }
        }
        console.log("m")
        console.log(sh_mis.length)

      this.chart_data_ms=sh
      this.chart_data_oc=sh_oc
      this.chart_set()
    },
    
    chart_set(){
      var ctx = document.getElementById("ms_and_oc_chart");
      var ms_and_oc_chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน ", "พฤษภาคม", "มิถุนายน ", "กรกฎาคม ", "สิงหาคม ", "กันยายน ", "ตุลาคม ", "พฤศจิกายน ", "ธันวาคม "],
              datasets: [
                {
                  label: 'การสูญหาย',
                  data:this.chart_data_ms,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0)',
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                  ],
                  borderWidth: 2,
                  
                },
                {
                  label: 'ผิดระเบียบ',
                  data:this.chart_data_oc,
                  backgroundColor: [
                      'rgba(254, 99, 132, 0)',
                  ],
                  borderColor: [
                      'rgba(254,38,38,1)',
                  ],
                  borderWidth: 2,
                  
                },
              ]
          },
          options: {
            title: {
                display: true,
                text: 'ข้อมูลประจำปี'
            },
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              },
              tooltips: {
                  mode: 'point'
              }
          }
      });
    },
  },

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  computed: {
    /////////////////////////////  machine /////////////////////////////////////// 

      filter_machine(){
        return this.machine.length
      },
      filter_mount(){
        let sh=[]
        for(let i=0;i<this.missing.length;i++){
                console.log(res.data.pk_missing_all[3].ms_date.split("-")[1])

          if(this.missing[i].ms_date.split("-")[1]+''==="02" ){
            sh.push(this.missing[i])
          }
        }
        return sh.length
      },
      filter_pk_missing_where_machine(){
        let sh=[]
        for(let i=0;i<this.missing.length;i++){
          if(this.missing[i].ms_table+''==="pk_machine" && this.missing[i].ms_status+''!=="ขั้นที่ 2 รับเรื่องแล้ว" &&  this.missing[i].ms_status+''!=="ขั้นที่ 3 พบเเล้ว"){
            sh.push(this.missing[i])
          }
        }
        return sh.length
      },
      filter_pk_missing_where_machine_stp2(){
        let sh=[]
        for(let i=0;i<this.missing.length;i++){
          if(this.missing[i].ms_table+''==="pk_machine" && this.missing[i].ms_status+''==="ขั้นที่ 2 รับเรื่องแล้ว"){
            sh.push(this.missing[i])
          }
        }
        return sh.length
      },
      filter_pk_object_control_where_machine(){
        let sh=[]
        for(let i=0;i<this.object_control.length;i++){
          if(this.object_control[i].oc_u_table+''==="pk_machine" && this.object_control[i].oc_status+''==="ผิดระเบียบ"){
            sh.push(this.object_control[i])
          }
        }
        return sh.length
      },
      filter_pk_object_control_where_machine_2(){
        let sh=[]
        for(let i=0;i<this.object_control.length;i++){
          if(this.object_control[i].oc_u_table+''==="pk_machine" && this.object_control[i].oc_status+''==="รอการตรวจสอบ"){
            sh.push(this.object_control[i])
          }
        }
        return sh.length
      },
      /////////////////////////////  accessoriws /////////////////////////////////////// 
      filter_accessories(){
        return this.accessories.length
      },
      filter_pk_missing_where_accessories(){
        let sh=[]
        for(let i=0;i<this.missing.length;i++){
          if(this.missing[i].ms_table+''==="pk_accessories" && this.missing[i].ms_status+''!=="ขั้นที่ 2 รับเรื่องแล้ว" &&  this.missing[i].ms_status+''!=="ขั้นที่ 3 พบเเล้ว"){
            sh.push(this.missing[i])
          }
        }
        return sh.length
      },
      filter_pk_missing_where_accessories_stp2(){
        let sh=[]
        for(let i=0;i<this.missing.length;i++){
          if(this.missing[i].ms_table+''==="pk_accessories" && this.missing[i].ms_status+''==="ขั้นที่ 2 รับเรื่องแล้ว"){
            sh.push(this.missing[i])
          }
        }
        return sh.length
      },
      filter_pk_object_control_where_accessories(){
        let sh=[]
        for(let i=0;i<this.object_control.length;i++){
          if(this.object_control[i].oc_u_table+''==="pk_accessories" && this.object_control[i].oc_status+''==="ผิดระเบียบ"){
            sh.push(this.object_control[i])
          }
        }
        return sh.length
      },
      filter_pk_object_control_where_accessories_2(){
        let sh=[]
        for(let i=0;i<this.object_control.length;i++){
          if(this.object_control[i].oc_u_table+''==="pk_accessories" && this.object_control[i].oc_status+''==="รอการตรวจสอบ"){
            sh.push(this.object_control[i])
          }
        }
        return sh.length
      },
// /////////////////////////////////  chart  ///////////////////////////////
      data_chart_missing(){
        let sh=[]
        for(let i=0;i<this.missing.length;i++){
          let sp=this.missing[i].ms_date.split("-")
          let sel=sp[1]
          for(let m=1;m<=12;m++){
            if(this.missing[i].ms_table+''==="pk_machine" && this.missing[i].oc_date+''===m){
              sh.push(this.missing[i])
              console.log(i)
              console.log(m)
              console.log(sh)
            }
          }
          
        }
        return sh.length
      },
    },
}

</script>
