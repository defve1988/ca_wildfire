<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="ma-0 pa-0" :height="card_height" :elevation="hover ? 4 : 1">
      <v-system-bar tile class="py-1 px-2 secondary" dark>
        Histogram
        <v-spacer></v-spacer>
        <!-- TODO: support filter  -->
        <!-- <v-menu top offset-x left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn x-small icon class="mx-1" v-bind="attrs" v-on="on">
              <v-icon small>mdi-filter-menu </v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-subheader> {{ selectors.filter.text }}</v-subheader>
            <v-list-item-group v-model="year_selected">
              <v-list-item
                v-for="(item, index) in selectors.filter"
                :key="index"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu> -->
      </v-system-bar>

      <v-container class="pt-0">
        <v-row justify="center">
          <v-col class="mx-0 px-0 pt-0 mt-0">
            <div ref="hist_card" id="hist_card"></div>
          </v-col>
        </v-row>

        <v-row justify="center" class="py-0 my-0">
          <v-col class="mx-0 px-0 py-0 my-0">
            <v-tabs
              v-model="tab_index"
              background-color="secondary"
              color="red"
              class="mx-0 px-0 mt-0"
              dark
              dense
              height="25"
              grow
              center-active
              @change="change_values"
            >
              <v-tab
                class="caption"
                v-for="(item, index) of selectors.tabs"
                :key="index"
                >{{ item.text }}</v-tab
              >
            </v-tabs>
          </v-col>
          <!-- <v-spacer></v-spacer> -->
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>
    
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "hist_card",
  props: ["card_height", "selectors", "plot_height"],
  components: {},
  mounted() {
    this.init_fig();
    this.change_values();
  },
  data: () => ({
    year_selected: 0,
    tab_index: 0,
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
    ...mapMutations(["GENE_HIST_TRACE", "GENE_HIST_TRACE_ALL"]),
    resize_fig() {
      this.app_data.hist_view.plot_obj.set_layout({
        width: this.$refs.hist_card.clientWidth,
      });
      this.app_data.hist_view.plot_obj.update_layout();
    },

    change_type() {
      this.isDaily = !this.isDaily;
      this.plot_fig();
    },

    change_values() {
      this.GENE_HIST_TRACE_ALL(this.selectors.tabs[this.tab_index]);
      this.app_data.hist_view.plot_obj.gen_hist(
        this.app_data.hist_trace.data,
        this.app_data.hist_trace.max_y
      );
    },

    init_fig() {
      var plot = {
        div: "hist_card",
        id: "hist_card",
        title: "",
        viz_type: "plotly",
        fig_type: "meduim",
        layout: {
          title: "",
          showlegend: true,
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
          width: this.$refs.hist_card.clientWidth,
          height: this.plot_height,
          autosize: true,
          margin: { r: 25, t: 25, b: 25, l: 50 },
        },
        config: {
          displaylogo: false,
          responsive: true,
          displayModeBar: false,
        },
      };
      this.app_data.hist_view.init_config(plot);
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