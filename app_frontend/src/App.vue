<template>
  <v-app>
    <h2>현재 상태</h2>
    <button @click='turnOn'>켜기</button>
    <button @click='turnOff'>끄기</button>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  created(){
    this.getWeatherData();
  },
  methods:{
    setState(value){
        axios.get(`/api/lights/${value}`).then(() => {
          this.bulb_state = value;
        });
      },
    turnOn(){
        console.log('on');
        this.setState('on');
    },
    turnOff(){
        console.log('off');
        this.setState('off');
    },
    async getWeatherData(){
        const weatherData = await axios.get(`/api/weather/general`);
        console.log(weatherData);
        this.weatherData = weatherData;
    }
  },
  components: {
    
  },

  data(){
    return {
      bulb_state : false,
      weatherData : null
    }
  }
};
</script>
