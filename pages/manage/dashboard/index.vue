<template>
<div >
  <v-app id="">
    <v-container grid-list-md >
      <v-layout row wrap>
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
                {{machine}}
                </v-card-text>
              </v-sheet>
          
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">พาหนะทั้งหมด</div>
                <div class="subheading font-weight-light grey--text">ในระบบ</div>
                <v-divider class="my-2"></v-divider>
                <i style="color:#d8d8d8" color="red" class="fas fa-clock fa-1x"></i>
                <span class="caption grey--text font-weight-light"></span>
              </v-card-text>
            </v-card>
          </v-flex>
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
                {{pk_missing_where}}
                </v-card-text>
              </v-sheet>
          
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">สูญหาย</div>
                <div class="subheading font-weight-light grey--text">กำลังดำเนินการ {{pk_missing_where_2}}</div>
                <v-divider class="my-2"></v-divider>
                <i style="color:#d8d8d8" color="red" class="fas fa-clock fa-1x"></i>
                <span class="caption grey--text font-weight-light"></span>
              </v-card-text>
            </v-card>
          </v-flex>

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
                {{pk_object_control_where}}
                </v-card-text>
              </v-sheet>
          
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">ผิดระเบียบ</div>
                <div class="subheading font-weight-light grey--text">รอการตรวจสอบ {{pk_object_control_where_2}}</div>
                <v-divider class="my-2"></v-divider>
                <i style="color:#d8d8d8" color="red" class="fas fa-clock fa-1x"></i>
                <span class="caption grey--text font-weight-light"></span>
              </v-card-text>
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
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm'
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240
      ],

      missing:"",
      machine:"",
      object_control:"",
      pk_missing_where:"",
      pk_missing_where_2:"",
      pk_object_control_where:"",
      pk_object_control_where_2:"",
    }
  },
  computed: {
      filter_missing(){
        return this.missing.filter(x=>''+x.ms_status===this.mis_status)
      }
    },
  methods:{
    async sh_mis(){
      let res= await this.$http.post("/dashboard/missing_chart")
      this.machine=res.data.pk_machine_all[0].count_mc
      this.missing=res.data.pk_missing_all[0].count_ms
      this.object_control=res.data.pk_object_control_all[0].count_oc
      this.pk_missing_where=res.data.pk_missing_where[0].count_ms
      this.pk_missing_where_2=res.data.pk_missing_where_2[0].count_ms
      this.pk_object_control_where=res.data.pk_object_control_where[0].count_oc
      this.pk_object_control_where_2=res.data.pk_object_control_where_2[0].count_oc
      console.log(res.data)
    },
  },
  created(){
    this.sh_mis()
  },
  mounted() {
    

  },
  
}
</script>
