<template>
  <v-app>
    <h2>현재 상태 : {{bulbState}}</h2>
    <button @click='turnOn'>켜기</button>
    <button @click='turnOff'>끄기</button>
    <hr>
    <h3>데이터 : {{weatherData.data}}</h3>
    
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  created(){
    this.getWeatherData();
    this.getBulbState();
  },
  methods:{
    setState(value){
        axios.get(`/api/hue/change/${value}`).then(() => {
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
    },
    async getBulbState(){
      const bulbState = await axios.get('/api/hue/state');
      console.log(bulbState);
      this.bulbState = bulbState.data.on ? '켜짐': '꺼짐';
    }
  },
  components: {
    
  },

  data(){
    return {
      bulbState : false,
      weatherData : null
    }
  }
};
</script>
