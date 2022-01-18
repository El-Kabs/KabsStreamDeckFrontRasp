<template>
  <vs-dialog v-model="active" color="#012340" width="100px" v-on:close="close">
    <p class="textoColor">Escoger color:</p>
    <br /><input v-model="color" type="color" />
    <vs-button
      color="#3F618C"
      border
      @click="guardarColor"
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
      color: "",
    };
  },
  methods: {
    close() {
      Object.assign(this.active, false);
    },
    async guardarColor() {
      var rgb = this.hexToRgb(this.color);
      var data = {
        "func": "cambiarColor",
        "args": {
            "r": rgb.r,
            "g": rgb.g,
            "b": rgb.b
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
    },
    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    },
  },
};
</script> 

<style>
.textoColor {
  color: white;
  margin-top: 10px;
}
</style>