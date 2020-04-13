<template>
  <v-app id="inspire">

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>기기 조절</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
                <h2>전구 현재 상태 : {{bulbState}}</h2>
                <v-btn small color="primary" @click='turnOn'>켜기</v-btn>
                <v-btn small color="error" @click='turnOff'>끄기</v-btn>
          </v-col>
          <v-col class="text-center">
            <WeatherContainer/>            
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          
        </v-row>
      </v-container>
    </v-content>
    
  </v-app>
</template>


<script>
import WeatherContainer from './components/WeatherContainer';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io('http://15.164.96.156:3000')

export default {
  name: 'App',
  created(){
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
    WeatherContainer
  },
  data(){
    return {
      drawer: null,
      bulbState : '꺼짐',
      
    }
  }
};
</script>
