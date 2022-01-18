<template>
  <vs-dialog v-model="active" color="#012340" width="100px" v-on:close="close">
    <p class="textoColor">Brillo (1-100  ):</p>
    <div class="slidecontainer">
        <input type="range" min="1" max="100" value="50" v-model="brillo" class="slider" id="myRange">
    </div>
    <p class="textoColor">{{brillo}}</p>
    <vs-button
      color="#3F618C"
      border
      @click="guardarBrillo"
      style="margin-top: 15px"
      >Ejecutar</vs-button
    >
  </vs-dialog>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    active: {
      required: true,
    },
  },
  data() {
    return {
      brillo: 0,
    };
  },
  methods: {
    close() {
      Object.assign(this.active, false);
    },
    async guardarBrillo() {
      var data = {
        "func": "cambiarBrillo",
        "args": {
            "brillo": this.brillo
        }
      }
      const res = await axios.post('http://192.168.20.31:5000/ejecutar', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(res)
        Object.assign(this.active, false);
        window.location.reload()
    }
  },
};
</script> 

<style>
.textoColor {
  color: white;
  margin-top: 10px;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #3F618C;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #3F618C;
  cursor: pointer;
}

</style>