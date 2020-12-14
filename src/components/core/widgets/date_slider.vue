<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="ma-0 pa-0" :height="card_height" :elevation="hover ? 4 : 1">
      <v-system-bar tile class="py-1 px-2 secondary" dark>
        Date
        <v-spacer></v-spacer>
        <v-btn x-small icon @click="play">
          <v-icon small v-if="!isPlay" >
            mdi-play-circle
          </v-icon>
          <v-icon small v-else> mdi-stop-circle </v-icon>
        </v-btn>
      </v-system-bar>
      <v-container>
        <v-row justify="center">
          <v-col
            cols="9"
            class="display-1 font-weight-light px-0 pl-4"
            align-self="center"
            align="center"
          >
            {{ date_range[app_data.slider] }}
          </v-col>
          <v-col cols="3" align-self="center" align="right">
            <v-btn icon large @click="play">
              <v-icon v-if="!isPlay" color="secondary">
                mdi-play-circle
              </v-icon>
              <v-icon v-else color="secondary"> mdi-stop-circle </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="my-0 py-0" align-self="center">
            <v-slider
              color="red lighten-1"
              :max="date_range.length - 1"
              min="0"
              v-model="app_data.slider"
              thumb-color="red lighten-1"
              @change="change_values"
            >
              <template v-slot:prepend>
                <v-icon @click="slider_miuns"> mdi-minus </v-icon>
              </template>

              <template v-slot:append>
                <v-icon @click="slider_plus"> mdi-plus </v-icon>
              </template>
            </v-slider>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>
    
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "date_slider",
  props: ["card_height", "date_range"],
  mounted() {},
  data: () => ({
    isPlay: false,
    //
  }),
  computed: {
    ...mapState({
      ui_control: "ui_control",
      app_data: "app_data",
    }),
    // data_loaded() {
    //   return this.date.loaded;
    // },
    // curr_date() {
    //   return this.date.date_range[this.slider];
    // },
  },
  watch: {
    // curr_date() {
    //   this.CHANGE_CURR_DATE(this.slider);
    //   var date_index = this.date.date_range[this.date.curr_index];
    //   var type = this.list_data.type;
    //   this.my_viz.plot_map(date_index, type);
    //   //   console.log(1);
    // },
    // data_loaded() {
    //   this.slider = this.date.date_range.length - 1;
    //   this.change_values();
    // },
  },
  methods: {
    ...mapMutations(["CHANGE_CURR_DATE", "CAL_STATUS", "GENE_LIST"]),
    play() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        var TIME = 50;
        this.Timer = setInterval(this.slider_plus, TIME);
      } else {
        clearInterval(this.Timer);
      }
    },
    change_values() {
      //   this.CAL_STATUS();
      //   this.GENE_LIST();
    },
    slider_plus() {
      if (this.app_data.slider + 1 == this.app_data.date_range.length) this.app_data.slider = 0;
      else this.app_data.slider++;
      this.change_values();
    },
    slider_miuns() {
      if (this.app_data.slider == 0) this.app_data.slider = this.app_data.date_range.length - 1;
      else this.app_data.slider--;
      this.change_values();
    },
    // change_date() {
    //     console.log(this.slider)
    //   this.CHANGE_CURR_DATE(this.slider);
    // },
  },
};
</script>
    