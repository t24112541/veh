<template>
  <div>
    <v-flex xs12>
      <v-card>
        <canvas id="myChart" width="400" height="400"></canvas>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  
  layout: 'manage',
  data () {
    return {
    }
  },
  methods:{
    sh_mis(){
      let res=this.$http.post("/dashboard/missing_chart")
    },
  },
  mounted() {
    this.sh_mis()
    var ctx = document.getElementById("myChart").getContext('2d');
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],
          datasets: [{
              label: 'ข้อมูล',
              data: [33, 19, 3, 5, 2, 3],
              backgroundColor: 'rgba(111,182,86,0.2)',
              borderColor:'rgba(104,168,86,1)',
              borderWidth: 1
          },
          {
              label: 'ข้อมูล2',
              data: [2, 30, 13, 23, 33, 33],
              backgroundColor:'rgba(255,99,132,0.2)',
              borderColor:'rgba(255,99,132,1)',
              borderWidth: 1
          }]
      },
      options: {
        
         scales: {
            yAxes: [{
              labelString:"test",
              // stacked: true
            }]
        }
      }
    });

  },
  
}
</script>
