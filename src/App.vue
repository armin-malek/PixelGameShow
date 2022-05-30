<template>

  <div class="bg-white main__content" :style="{'width':txt}" style="max-width:100%">


    <table class=" " dir="ltr" style="   width: 100%;
  height:100%;
    display: flex;
    flex-wrap: wrap;">

      <template v-for="(pixel,index) in pixels">
        <td class="pixel" v-bind:id="index" :class="pixel.ison ? 'on' : 'off'" :key="index"
            :style="{'flex-basis':width}">
        </td>
      </template>
    </table>

    <div style="    position: absolute;
    display: grid;
    bottom: 0;
    right: 0;
    text-align: center;">
      <button @click="onReverse()" class="btn btn-primary btn-sm m-1">حالت 1</button>
      <button @click="onWhite()" class="btn btn-primary btn-sm m-1">حالت 2</button>
      <button @click="onBlack()" class="btn btn-primary btn-sm m-1">حالت 3</button>
      <button @click="showPoster()" class="btn btn-primary btn-sm m-1">حالت 4</button>
      <button @click="showDr()" class="btn btn-primary btn-sm m-1">حالت 5</button>
      <button @click="showHeart()" class="btn btn-primary btn-sm m-1">حالت 6</button>
      <button @click="showLogo()" class="btn btn-primary btn-sm m-1">حالت 7</button>
      <button @click="completeByDefault()" class="btn btn-primary btn-sm m-1">حالت 8</button>
      <button @click="connect_socket()" class="btn btn-primary btn-sm m-1">حالت 9</button>
      <button @click="disconnect_socket()" class="btn btn-primary btn-sm m-1">حالت 10</button>
      <button @click="loadPixels40()" class="btn btn-primary btn-sm m-1">حالت 11</button>
    </div>


  </div>

</template>

<script>

import poster_json from './assets/poster.json';
import dr_json from './assets/dr.json';
import heart_json from './assets/heart.json';
import logo_json from './assets/logo.json';
import pixels_test from './assets/pixels_test.json';
import random_40 from './assets/random40.json';
import random_100 from './assets/random100.json';

export default {
  name: 'Show',
  data() {
    return {
      windowHeight: window.innerHeight + 'px',
      txt: window.innerHeight + 'px',
      pixels: pixels_test,
      dr: dr_json,
      poster: poster_json,
      heart: heart_json,
      imgname: 'logo',
      random40: random_40,
      random100: random_100,
      logo: logo_json,
      status_connection: false,
      process: false,
    }
  },
  mounted() {
    this.$socket.on("getPixels", (pixels) => {
      if (this.status_connection) {
        this.pixels = pixels;
      }
    });

    this.$socket.on("imgname", (name) => {
      this.imgname = name;
    });

    this.$socket.on("gameComp", () => {
      if (this.status_connection) {
        // this.$swal({
        //   title: 'هوراااااا!',
        //   text: 'تونستیم با موفقیت شکل رو تموم کنیم',
        //   icon: 'success',
        //   confirmButtonText: 'بستن'
        // })
        this.status_connection = false;

      }

    });

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  watch: {
    windowHeight(newHeight) {
      this.txt = newHeight + 'px';
    }
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight
    },
    changeStatus(pixel) {

      let status = this.pixels[pixel].ison;
      if (status === true)
        this.pixels[pixel].ison = false;
      else
        this.pixels[pixel].ison = true;

    },
    onReverse() {
      this.pixels.forEach(value => {
        value.ison = !value.ison;
      });
    },
    onWhite() {
      this.pixels.forEach(value => {
        value.ison = false;
      });
    },
    onBlack() {
      this.pixels.forEach(value => {
        value.ison = true;
      });
    },
    showPoster() {
      this.pixels = this.poster
    },
    showDr() {
      this.pixels = this.dr
    },
    showHeart() {

      this.pixels = this.heart
    },
    showLogo() {
      this.pixels = this.logo
    },
    disconnect_socket() {
      this.status_connection = false
    },
    connect_socket() {
      this.status_connection = true
    },
    loadPixels40() {
      this.pixels = pixels_test

    },
    completeByDefault() {
      this.status_connection = false;

      let vm = this
      if (this.countPixels > 1600) {
        this.pixels = pixels_test
      }
      this.random40.forEach((element, i) => {

        setTimeout(
            function () {
              vm.pixels[element].ison = vm.default_pixel[element].ison
            }
            , i);
      });

      this.status_connection = false;

      // setTimeout(
      //     function () {
      //       vm.$swal({
      //         title: 'هوراااااا!',
      //         text: 'تونستیم با موفقیت شکل رو تموم کنیم',
      //         icon: 'success',
      //         confirmButtonText: 'بستن'
      //       })
      //     }
      //     , 1600);


    }
  },
  components: {},
  computed: {
    width: function () {
      return (100 / Math.sqrt(this.pixels.length)) + '%';
    },
    countPixels: function () {
      return this.pixels.length
    },
    default_pixel: function () {
      if (this.imgname === "logo")
        return this.logo
      else
        return this.heart
    }


  },

}
</script>
<style>
.pixel {
  border: 1px solid #ccc;
  position: relative;
  height: auto;
  padding: 1px;
}

.pixel.off {
  background: #FFF;
}

.pixel.on {
  background: #000;
}
</style>
