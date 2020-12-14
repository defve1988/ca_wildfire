<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="ma-0 pa-0" :height="card_height" :elevation="hover ? 4 : 1">
      <v-system-bar tile class="py-1 px-2 secondary" dark>
        Situation Map
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-small
              @click="app_data.include_all = !app_data.include_all"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small> mdi-fire </v-icon>
            </v-btn>
          </template>
          <span>Show active/all fires.</span>
        </v-tooltip>

        <v-menu top offset-x left open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn x-small icon class="mx-1" v-bind="attrs" v-on="on">
              <v-icon small> mdi-map </v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-subheader class="px-3 caption"> Map Style </v-subheader>
            <v-list-item-group
              v-model="map_style_selected"
              @change="change_theme"
            >
              <v-list-item v-for="(item, index) in map_style" :key="index">
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-system-bar>

      <v-container class="pt-0">
        <v-row justify="center">
          <v-col class="mx-0 px-0 pt-0 mt-0 pb-0">
            <div ref="map_card" id="map_div"></div>
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
                v-for="(item, index) of map_tabs"
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
  name: "status_card",
  props: ["card_height", "map_setting", "map_tabs"],
  components: {},
  data: () => ({
    tab_index: 0,
    map_style_selected: 2,
    map_style: [
      {
        text: "Light Style",
        mapbox: {
          style: "light",
        },
      },
      {
        text: "Dark Style",
        mapbox: {
          style: "dark",
        },
      },
      {
        text: "Land Map",
        mapbox: {
          style: "outdoors",
        },
      },
      {
        text: "Satellite Map",
        mapbox: {
          style: "white-bg",
          layers: [
            {
              sourcetype: "raster",
              source: [
                "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
              ],
              below: "traces",
            },
            { sourcetype: "streets" },
          ],
        },
      },
    ],
  }),
  computed: {
    ...mapState({
      ui_control: "ui_control",
      app_data: "app_data",
    }),
    date_change() {
      return this.app_data.slider;
    },
    include_change() {
      return this.app_data.include_all;
    },
  },
  watch: {
    date_change() {
      this.change_values();
    },
    include_change() {
      this.change_values();
    },
  },
  created() {
    window.addEventListener("resize", this.resize_map);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize_map);
  },
  mounted() {
    this.init_map();
    this.change_values();
  },
  methods: {
    ...mapMutations(["GENE_MAP_TRACE"]),
    resize_map() {
      //   console.log(this.$refs.map_card.clientWidth);
      this.app_data.map_view.plot_obj.set_layout({
        width: this.$refs.map_card.clientWidth,
      });
      this.app_data.map_view.plot_obj.update_layout();
    },
    change_theme() {
      var layout = {
        mapbox: this.map_style[this.map_style_selected].mapbox,
      };
      layout.mapbox.center = this.map_setting.center;
      layout.mapbox.zoom = this.map_setting.zoom;
      this.app_data.map_view.plot_obj.set_layout(layout);
      this.app_data.map_view.plot_obj.update_layout();
    },

    change_values() {
      // alert(this.map_tabs[this.tab_index].text)
      this.GENE_MAP_TRACE(this.map_tabs[this.tab_index]);
      this.app_data.map_view.plot_obj.plot_map_scatter(this.app_data.map_trace);
    },

    init_map() {
      var plot = {
        div: "map_div",
        id: "g_map",
        title: "global map",
        viz_type: "mapbox",
        fig_type:"map",
        layout: {
          mapbox: this.map_style[this.map_style_selected].mapbox,
          dragmode: "zoom",
          showlegend: false,
          width: this.$refs.map_card.clientWidth,
          height: this.map_setting.height,
          autosize: true,
          margin: { r: 0, t: 0, b: 0, l: 0 },
        },
        config: {
          mapboxAccessToken:
            "pk.eyJ1IjoiZGVmdmUxOTg4IiwiYSI6ImNrNzNzZmN3dzBmMnMzZ3FvMzJ0MDRpa2QifQ.xLG4lim5AonGbkDtgP9-5A",
          displaylogo: false,
          responsive: true,
          displayModeBar: false,
        },
      };
      plot.layout.mapbox.center = this.map_setting.center;
      plot.layout.mapbox.zoom = this.map_setting.zoom;
      //   console.log(plot)
      this.app_data.map_view.init_config(plot);
      this.app_data.map_view.plot_obj.gen_dots(
        { text: [], lat: [], lon: [] },
        false
      );
    },
  },
};
</script>
    