<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="ma-0 pa-0" :height="card_height" :elevation="hover ? 4 : 1">
      <v-system-bar tile class="py-1 px-2 secondary" dark>
        Bar Plot
        <v-spacer></v-spacer>
        <!-- <v-menu top offset-x left open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn x-small icon class="mx-1" v-bind="attrs" v-on="on">
              <v-icon small>mdi-alpha-x-box </v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-subheader class="px-3 caption"> X variable </v-subheader>
            <v-list-item-group v-model="x_selected" @change="change_values">
              <v-list-item v-for="(item, index) in selectors.tabs" :key="index">
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu> -->

        <v-menu top offset-x left open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn x-small icon class="mx-1" v-bind="attrs" v-on="on">
              <v-icon small>mdi-alpha-y-box </v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-subheader class="px-3 caption"> Y variable</v-subheader>
            <v-list-item-group v-model="y_selected" @change="change_values">
              <v-list-item v-for="(item, index) in selectors.tabs" :key="index">
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-system-bar>

      <v-container class="pt-0">
        <v-row justify="center">
          <v-col class="mx-0 px-0 pt-0 mt-0">
            <div ref="bar_card" id="bar_card"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "bar_card",
  props: ["card_height", "selectors", "plot_height"],
  components: {},
  mounted() {
    this.init_fig();
    this.change_values();
  },
  data: () => ({
    // x_selected: 0,
    y_selected: 0,
  }),
  computed: {
    ...mapState({
      ui_control: "ui_control",
      app_data: "app_data",
    }),
  },
  watch: {},
  created() {
    window.addEventListener("resize", this.resize_fig);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize_fig);
  },
  methods: {
    ...mapMutations(["GENE_BAR"]),
    resize_fig() {
      this.app_data.bar_view.plot_obj.set_layout({
        width: this.$refs.bar_card.clientWidth,
      });
      this.app_data.bar_view.plot_obj.update_layout();
    },

    change_type() {
      this.isDaily = !this.isDaily;
      this.plot_fig();
    },

    change_values() {
      this.GENE_BAR({
        // x: this.selectors.tabs[this.x_selected],
        y: this.selectors.tabs[this.y_selected],
      });
      this.app_data.bar_view.plot_obj.gen_bar(
        this.app_data.bar_trace
      );
      this.app_data.bar_view.plot_obj.set_layout({
        xaxis: {
          title: 'Year',
          titlefont: {
            size: 14,
            family: "",
            color: "black",
          },
          showticklabels: true,
          showline: true,
          showgrid: true,
          autotick: true,
        },
        yaxis: {
          title: this.selectors.tabs[this.y_selected].text,
          titlefont: {
            size: 14,
            family: "",
            color: "black",
          },
          showticklabels: true,
          showline: true,
          showgrid: true,
          autotick: true,
        },
        bargap: 0.3,
        hovermode: "closest"
      });
      this.app_data.bar_view.plot_obj.update_layout();
    },

    init_fig() {
      var plot = {
        div: "bar_card",
        id: "bar_card",
        title: "",
        viz_type: "plotly",
        fig_type: "meduim",
        layout: {
          title: "",
          showlegend: false,
          legend: {
            font: {
              size: 10,
              family: "",
              color: "black",
            },
            xanchor: "auto",
            yanchor: "auto",
            x: 1,
            y: 1,
          },
          width: this.$refs.bar_card.clientWidth,
          height: this.plot_height,
          autosize: true,
          margin: { r: 40, t: 25, b: 60, l: 80 },
        },
        config: {
          displaylogo: false,
          responsive: true,
          displayModeBar: false,
        },
      };
      this.app_data.bar_view.init_config(plot);
    },
  },
};
</script>
<style scoped>
.v-list {
  overflow-y: auto;
  overflow-x: auto;
  scrollbar-width: none;
  max-height: 500px;
}
.v-list::-webkit-scrollbar {
  display: none;
}
</style>