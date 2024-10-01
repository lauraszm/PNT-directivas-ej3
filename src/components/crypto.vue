<script setup>
import { ref, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

library.add(faArrowUp)
library.add(faArrowDown)

    const coincap = ref([])
    const ordPorNombre = ref(false)
    const mensajeBoton = ref("Ordenar por nombre")

    const llamarACoincap = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets?limit=10');
        coincap.value = response.data.data;
        console.log(coincap.value)
      } catch (error) {
        console.error('Error al obtener coincap:', error);
      } 
    };

    const porNombre = () => {
      if(ordPorNombre.value == false) {
        ordPorNombre.value = true;
        mensajeBoton.value = "Ordenar por ranking"
        coincap.value.sort((a,b) => a.name.localeCompare(b.name))
      } else {
        ordPorNombre.value = false
        mensajeBoton.value = "Ordenar por nombre"
        console.log(coincap.value)
        coincap.value.sort((a,b) => parseInt(a.rank) - parseInt(b.rank))
      };
    }
    

    onMounted(() => {
      llamarACoincap()
    })
</script>

<template>
  <h1>Crypto</h1>

  <div>
    <div >
      <table>
        <tbody>
        <tr>
          <th>Ranking</th>
          <th>Nombre</th>
          <th>Variacion 24hs</th>
        </tr>
        <tr v-for="(coin, index) in coincap" :class="{top3: index < 3, negative: coin.changePercent24Hr < 0, positive: coin.changePercent24Hr > 0}">
          <td>{{ coin.rank }}</td>
          <td> {{ coin.name }}</td>
          <td><span v-if="coin.changePercent24Hr > 0" ><font-awesome-icon :icon="['fas', 'arrow-up']" /></span>
            <span v-else ><font-awesome-icon :icon="['fas', 'arrow-down']" /></span></td>
        </tr>
      </tbody>
      </table>
    </div>
    <button @click="porNombre()">{{ mensajeBoton}}</button>
  </div>
</template>

<style scoped>
  .top3 {
    background-color: yellow;
  }

  .negative span {
    background-color: red;
  }

  .positive span {
    background-color: green;
  }
</style>
