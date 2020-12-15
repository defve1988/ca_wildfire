<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container class="mt-0 pt-1 mb-0 pb-1 px-6" fluid>
        <v-row justify="center">
          <v-col cols="2" class="pa-0">
            <v-row>
              <v-col>
                <StatsCard
                  :card_height="650"
                  :calculations="ui_control.status_calculations"
                  :stats_df="stats_df"
                  :auto_list="ui_control.auto_list"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col class="py-0">
                <DateSlider :card_height="150" :date_range="date_range" />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="5" class="pa-3 pb-0">
            <MapCard
              :card_height="810"
              :map_setting="ui_control.map_setting"
              :map_tabs="ui_control.map_tabs"
            />
          </v-col>

          <v-col cols="5" class="pa-0">
            <!-- <v-row>
              <v-col>
                <DateSlider :card_height="450" :date_range="date_range" />
              </v-col>
            </v-row> -->

            <v-row>
              <v-col>
                <BarCard 
                  :card_height="450"
                  :selectors="ui_control.bar_selector"
                  :plot_height="415" />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" class="py-0 pr-0">
                <ScatterCard
                  :card_height="350"
                  :selectors="ui_control.scatter_selector"
                  :plot_height="315"
                />
              </v-col>
              <v-col cols="6" class="py-0">
                <HistCard
                  :card_height="350"
                  :selectors="ui_control.hist_selector"
                  :plot_height="288"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
    <InforDialog />
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import Bar_card from './components/core/bar_card.vue';

export default {
  name: "App",
  mounted() {
    this.INIT_DF();
    // console.log(this.app_data.data.df);
  },
  components: {
    StatsCard: () => import("@/components/core/stats_card"),
    DateSlider: () => import("@/components/core/widgets/date_slider"),
    MapCard: () => import("@/components/core/map_card"),
    HistCard: () => import("@/components/core/hist_card"),
    ScatterCard: () => import("@/components/core/scatter_card"),
    BarCard: () => import("@/components/core/bar_card"),

    AppBar: () => import("@/components/common/app_bar"),
    InforDialog: () => import("@/components/common/infor_dialog"),
    Footer: () => import("@/components/common/footer")
  },
  computed: {
    ...mapState({
      ui_control: "ui_control",
      app_data: "app_data",
    }),
    date_range() {
      return this.app_data.date_range;
    },
  },
  data: () => ({
    stats_df: "df",

    //
  }),
  methods: {
    ...mapMutations(["TEST", "INIT_DF"]),
  },
};
</script>
<style scoped>
/* div {
  outline: 1px dashed red;
} */
</style>