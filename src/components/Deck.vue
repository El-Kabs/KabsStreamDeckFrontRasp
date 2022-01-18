<template>
  <div class="center">
    
    <ColorPicker v-if="iniciador == 'colorPick'" :active="active"/>
    <CambiarBrillo v-if="iniciador == 'cambiarBrillo'" :active="active"/>
    <div class="grid deck">
      <vs-row class="fila">
        <vs-col w="2" v-for="boton in botonesU" :key="boton.boton">
          <vs-button class="boton" floating color = "#3F618C" border  @click="ejecutar(boton)">
            <div v-if="boton.imagen!==undefined">
              <img class="imagen" v-bind:src="'http://192.168.20.31:5000/' + boton.imagen" alt="">
            </div>
          </vs-button>
        </vs-col>
      </vs-row>

      <vs-row class="fila">
        <vs-col w="2" v-for="boton in botonesD" :key="boton.boton">
          <vs-button class="boton" floating color = "#3F618C" border  @click="ejecutar(boton)">
            <div v-if="boton.imagen!==undefined">
              <img class="imagen" v-bind:src="'http://192.168.20.31:5000/' + boton.imagen" alt="">
            </div>
          </vs-button>
        </vs-col>
      </vs-row>

      <vs-row class="fila">
        <vs-col w="2" v-for="boton in botonesT" :key="boton.boton">
          <vs-button class="boton" floating color = "#3F618C" border  @click="ejecutar(boton)">
            <div v-if="boton.imagen!==undefined">
              <img class="imagen" v-bind:src="'http://192.168.20.31:5000/' + boton.imagen" alt="">
            </div>
          </vs-button>
        </vs-col>
      </vs-row>
    </div>
    <vs-button class="fullscreen" floating color = "#3F618C" icon  @click="fullscreen">
    </vs-button>
    <vs-button class="reload" floating color="warn" icon  @click="reloadPage">
    </vs-button>

    <vs-button class="b1" floating color = "#3F618C" icon  @click="perfil(1)">
      1
    </vs-button>
    <vs-button class="b2" floating color = "#3F618C" icon  @click="perfil(2)">
      2
    </vs-button>
    <vs-button class="b3" floating color = "#3F618C" icon  @click="perfil(3)">
      3
    </vs-button>
    <vs-button class="b4" floating color = "#3F618C" icon  @click="perfil(4)">
      4
    </vs-button>
    <vs-button class="b5" floating color = "#3F618C" icon  @click="perfil(5)">
      5
    </vs-button>
  </div>
</template>

<script>
import axios from "axios";
import ColorPicker from "./Dialogs/ColorPicker.vue";
import CambiarBrillo from "./Dialogs/CambiarBrillo.vue";

export default {
  name: "Deck",
  components: {
    ColorPicker,
    CambiarBrillo,
  },
  data: () => ({
    active: "",
    botones: [],
    botonesU: [],
    botonesD: [],
    botonesT: [],
    iniciador: "",
    perfilNum: 1
  }),
  mounted: function () {
    const _this = this;
    fetch("http://192.168.20.31:5000/botones?perfil="+_this.perfilNum)
      .then((response) => response.json())
      .then((data) => {
        _this.botones = data;
        _this.botonesU = data.slice(0, 5);
        _this.botonesD = data.slice(5, 10);
        _this.botonesT = data.slice(10, 15);
      });
      document.title = 'Stream Deck'
  },
  methods: {
    async ejecutar(data) {
      var necesitaPasos = ["cambiarColor", "cambiarBrillo"];
      var func = data["func"];
      if (necesitaPasos.includes(func)) {
        if (func == "cambiarColor") {
          this.iniciador = "colorPick";
          this.active = true;
        } else {
          this.iniciador = "cambiarBrillo";
          this.active = true;
        }
      } else {
        const json = JSON.stringify({
          func: func,
          args: { ruta: data["ruta"], escena: data["escena"] },
        });
        const res = await axios.post(
          "http://192.168.20.31:5000/ejecutar",
          json,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
      }
    },
    fullscreen() {
      if (
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    reloadPage(){
      window.location.reload()
    },
    perfil(numPerfil){
      const _this = this;
      _this.perfilNum = numPerfil
      fetch("http://192.168.20.31:5000/botones?perfil="+numPerfil)
      .then((response) => response.json())
      .then((data) => {
        _this.botones = data
        _this.botonesU = data.slice(0,5)
        _this.botonesD = data.slice(5,10)
        _this.botonesT = data.slice(10,15)
      });

    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.boton {
  width: 108px;
  height: 108px;
  margin-left: 45px;
  background: transparent !important;
}

.deck {
  margin: 0 auto;
  margin-left: 45px;
}

.fila {
  margin-top: 35px;
}

.imagen {
  max-width: 108px !important;
  max-height: 108px !important;
}

.fullscreen{
  width: 35px;
  height: 35px;
  position: absolute;
  top: 200px;
  left: 20px;
}

.reload{
  width: 35px;
  height: 35px;
  position: absolute;
  top: 250px;
  left: 20px;
}

.b1 {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 125px;
  right: 20px;
}

.b2 {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 175px;
  right: 20px;
}

.b3 {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 225px;
  right: 20px;
}

.b4 {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 275px;
  right: 20px;
}

.b5 {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 325px;
  right: 20px;
}
</style>
