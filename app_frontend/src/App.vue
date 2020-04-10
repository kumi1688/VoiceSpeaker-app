<template>
  <v-app>
    <h2>현재 상태 : {{bulbState}}</h2>
    <button @click='turnOn'>켜기</button>
    <button @click='turnOff'>끄기</button>
    <hr>
    <!-- <h3>데이터 : {{weatherData.data}}</h3> -->
    
  </v-app>
</template>

<script>
import axios from 'axios';
import io from 'socket.io-client';
const socket = io('http://15.164.96.156:3000')

export default {
  name: 'App',
  created(){
    this.getWeatherData();
    this.getBulbState();
    this.connectWebSocket();
    this.updateBulbState();
  },
  methods:{
    setState(value){
        axios.get(`/api/hue/change/${value}`).then(() => {
          // this.bulb_state = value;
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
    },
    connectWebSocket(){
      socket.on('connection', () => {
        console.log('웹소켓 연결됨');
      });
    },
    updateBulbState(){
      socket.on('bulbState', ({data}) => {
        console.log(data);
        this.bulbState = data.on ? '켜짐' : '꺼짐';
      });
    }
  },
  components: {
    
  },
  data(){
    return {
      bulbState : '꺼짐',
      weatherData : null,
      
    }
  }
};
</script>
