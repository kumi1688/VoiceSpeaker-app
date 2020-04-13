<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">수원시 날씨</v-list-item-title>
        <v-list-item-subtitle>{{currentDate.dateString}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col class="display-3" cols="6">
          {{`${sortedWeatherData.find(element=>element.label === '온도').value}&deg;C`}}
        </v-col>
        <v-col cols="6">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sun.png"
            alt="Sunny image"
            width="92"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list class="transparent">
      <v-list-item
        v-for="item in sortedWeatherData"
        :key="item.label"
      >
        <v-list-item-title>{{ item.label }}</v-list-item-title>

        <v-list-item-subtitle class="text-right">
          {{ item.value }}
        </v-list-item-subtitle>

        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        
      </v-list-item>
    </v-list>

  </v-card>
</template>

<script>
import axios from 'axios';

  export default {
      async created(){
            await this.getWeatherData();
            this.getCurrentDate();
            this.sortWeatherData();
      },
      methods: {
        async getWeatherData(){
            const weatherData = await axios.get(`/api/weather/general`);
            this.weatherData = weatherData.data;
            console.log(this.weatherData);
            },  
        getCurrentDate(){
            const date = new Date();
            this.currentDate = {
                year: date.getFullYear(),
                month: date.getMonth()+1,
                day: date.getDate(),
                hours: date.getHours(),
                dayLabel: this.getTodayLabel()
            }
            this.currentDate.dateString = 
            `${this.currentDate.year}년 ${this.currentDate.month}월 ${this.currentDate.day}일 
            ${this.currentDate.dayLabel} ${this.currentDate.hours}시`;
        },
        getTodayLabel() {
            const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];    
            const today = new Date().getDay();
            const todayLabel = week[today];
            return todayLabel;
        },
        deStructuring(type){
            const filteredData = this.weatherData.filter(element=>element['category'] === type);
            switch(type){
                case 'UUU': // 풍속
                    return {
                        value : `${filteredData[0].fcstValue}m/s`,
                        label : '풍속',
                        icon: 'mdi-weather-windy'
                    }
                case 'VEC': // 풍향 
                    return {
                        value : this.getWindDirection(filteredData[0].fcstValue),
                        label : '풍향',
                        icon : 'mdi-sign-direction-plus'             
                    }
                case 'REH': // 습도 
                return {
                        value : `${filteredData[0].fcstValue}%`,
                        label : '습도',
                        icon: 'mdi-water'       
                    }
                case 'PTY': // 강우량
                    return {
                        value : `${filteredData[0].fcstValue}%`,
                        label : '강우량',
                        icon: 'mdi-weather-pouring'
                    }
                case 'POP': return {
                        value : `${filteredData[0].fcstValue}%`,
                        label : '강우확률',                      
                        icon: 'mdi-weather-pouring'
                    }
                case 'T3H': // 온도
                return {
                        value : filteredData[0].fcstValue,
                        label : '온도',
                        icon: 'mdi-temperature-celsius'            
                    }
                case 'SKY': // 구름상태
                {
                    let skyState = '';
                    switch(filteredData[0].fcstValue){
                        case '1': skyState = '맑음'; break;
                        case '3': skyState = '흐림'; break;
                        case '4': skyState = '매우 흐림'; break;
                    }
                return {
                        value : skyState,
                        label : '구름상태',
                        icon: 'mdi-apple-icloud'            
                    }
                }
            }
        },
        sortWeatherData(){
            ['UUU', 'VEC', 'REH', 'PTY', 'POP', 'T3H', 'SKY'].map(element=> {
                this.sortedWeatherData.push(this.deStructuring(element))
            })
           console.log(this.sortedWeatherData);
        },
        getWindDirection(value){
            const standard = Number(value);
            if(0<= standard && standard < 45) return '북풍-북동풍';
            else if( 45 <= standard && standard < 90) return '북동풍-동풍';
            else if( 90 <= standard && standard < 135) return '동풍-남동풍';
            else if( 135 <= standard && standard < 180 ) return '남동풍-남풍';
            else if( 180 <= standard && standard < 225 ) return '남풍-남서풍';
            else if ( 225 <= standard && standard < 270 ) return '남서풍-서풍';
            else if ( 270 <= standard && standard < 315 ) return '서풍-북서풍';
            else return '북서풍-북풍'
        }
      },
    data () {
      return {
          currentDate: null,
          weatherData: null,
          sortedWeatherData: [],
          dataDescription: {
            windSpeed: {icon: 'mdi-weather-windy', text: '풍속'},
            sky: {icon: 'mdi-cloud', text: '구름양'},
           },  
           
      }
    },
  }
</script>