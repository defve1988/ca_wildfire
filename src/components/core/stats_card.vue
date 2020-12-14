<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="ma-0 pa-0" :height="card_height" :elevation="hover ? 4 : 1">
      <v-system-bar tile class="py-1 px-2" color="secondary" dark>
        Situation List
        <v-spacer></v-spacer>

        <v-menu top offset-x left open-on-hover v-if="auto_list.show">
          <template v-slot:activator="{ on, attrs }">
            <v-btn x-small icon class="mx-1" v-bind="attrs" v-on="on">
              <v-icon small> mdi-sort </v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-subheader class="px-3 caption"> Sort List </v-subheader>
            <v-list-item-group v-model="sortBy" @change="gene_list_data">
              <v-list-item
                v-for="(item, index) in auto_list.sort_by"
                :key="index"
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn x-small @click="goto_top" icon v-bind="attrs" v-on="on">
              <v-icon small> mdi-format-vertical-align-top </v-icon>
            </v-btn>
          </template>
          <span>Scroll to top.</span>
        </v-tooltip>
      </v-system-bar>

      <v-container>
        <v-row
          justify="center"
          v-for="(item, index) of calculations"
          :key="index"
        >
          <v-col class="py-0">
            <span class="title font-weight-light">{{ item.text }} : </span>
            <span class="title font-weight-bold mx-3" style="float: right">
              <span :class="item.text_color">
                {{ numberWithCommas(item.val) }}
              </span>
            </span>
          </v-col>
        </v-row>

        <v-row class="mt-3" v-if="auto_list.show">
          <AutoList :list_height="auto_list.height" :list_data="list_data" />
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>
    
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "status_card",
  props: ["card_height", "auto_list", "calculations", "stats_df"],
  components: {
    AutoList: () => import("@/components/core/widgets/auto_list"),
  },
  mounted() {
    this.cal_stats_vals();
    this.gene_list_data();
  },
  data: () => ({
    list_data: [],
    sortBy: 0,
  }),
  computed: {
    ...mapState({
      ui_control: "ui_control",
      app_data: "app_data",
    }),
    data_change() {
      return this.app_data.data[this.stats_df];
    },
  },
  watch: {
    data_change() {
      this.cal_stats_vals();
      this.gene_list_data();
    },
  },
  methods: {
    ...mapMutations(["GENE_LIST"]),
    goto_top() {
      var scrollUpBox = document.getElementById("auto_list");
      scrollUpBox.scrollTop = 0;
    },
    numberWithCommas(x) {
      if (x == null) return "";
      else {
        x = Math.floor(x);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    gene_list_data() {
      // need to be change every time
      //   TODO: should goto Mapmutations
      var res = [];
      var sortBy = this.auto_list.sort_by[this.sortBy].col;
      var sortby_text = this.auto_list.sort_by[this.sortBy].text;
      var temp_df = JSON.parse(
        JSON.stringify(this.app_data.data[this.stats_df])
      );
      temp_df.sort((a, b) => (a[sortBy] > b[sortBy] ? -1 : 1));
      temp_df.forEach((r) => {
        let val =
          sortBy == "Started"
            ? this.numberWithCommas(r["AcresBurned"])
            : this.numberWithCommas(r[sortBy]);
        if (val != "") {
          res.push({
            val: val,
            text_0: sortby_text,
            text_1: r.ArchiveYear,
            text_2: r.Name,
            text_class: "font-weight-light",
            val_class: "font-weight-bold amber--text text--darken-3",
          });
        }
      });
      this.list_data = res;
      //   console.log(res);
    },
    cal_stats_vals() {
      // this.app_data.data[this.stats_df]
      this.calculations.forEach((row) => {
        row.val = this.app_data.data.stats_col(
          row.col,
          row.func,
          this.app_data.data[this.stats_df]
        );
      });
    },
  },
};
</script>
    