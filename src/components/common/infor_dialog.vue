<template>
  <v-dialog width="400" v-model="ui_control.show_infor_dialog">
    <v-card height="400">
      <v-system-bar class="my-1 subtitle-2 font-weight-light primary" dark>
        About California Wildfire Tracker
        <v-spacer></v-spacer>
        <v-btn
          class="px-0"
          icon
          @click="ui_control.show_infor_dialog = !ui_control.show_infor_dialog"
          small
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-system-bar>
      <v-card-text class="py-3">
        <p>
          This project provde the visulations and basic statistics for
          California wildfire incidents from 2013 to present.
        </p>
        <p>
          The data is collected fron California governmnet website, CAL FIRE
          <a
            style="color: grey"
            href="https://www.fire.ca.gov/"
            target="_blank"
          >
            CAL FIRE </a
          >. This project mainly use
          <a style="color: grey" href="https://d3js.org/" target="_blank">
            D3.js
          </a>
          and
          <a
            style="color: grey"
            href="https://plotly.com/javascript/"
            target="_blank"
          >
            Plotly.js
          </a>
          for visualizations. You can find GitHub repository for this project
          <a
            style="color: grey"
            href="https://github.com/defve1988/ca_wildfire"
            target="_blank"
          >
            here</a
          >.
        </p>
        <p>
          I'm an environmental scientist who also enthuse in data science. If
          you have any questions or suggestions, please contact
          <a style="color: grey" href="mailto: zhouchuanlong1988@gmail.com"
            >Chuanlong Zhou</a
          >
          . More information about me, please check
          <a
            style="color: grey"
            href="https://defve1988.github.io/"
            target="_blank"
            >here</a
          >
          .
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "infor",
  computed: {
    ...mapState({
      ui_control: "ui_control",
    }),
  },
};
</script>
