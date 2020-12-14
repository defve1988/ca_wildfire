<template>
  <v-app-bar app color="primary darken-2" flat dark>
    <v-icon size="50"> $ca_logo </v-icon>

    <v-icon color="red darken-4" class="ml-n12 mt-n10 mr-8">mdi-fire</v-icon>
    <v-icon color="grey darken-4" class="ml-n14 mt-7 mr-5"> mdi-fire </v-icon>
    <!-- <v-icon color="red darken-4" class="ml-n6 mt-0 mr-0"> mdi-fire </v-icon> -->

    <v-toolbar-title class="mx-4 headline font-weight-light"
      >California Wildfire Trakcer</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-btn
      icon
      class="mx-2"
      @click="ui_control.show_infor_dialog = !ui_control.show_infor_dialog"
    >
      <v-icon> mdi-information-outline </v-icon>
    </v-btn>
  </v-app-bar>
</template>
    
<script>
import { mapState } from "vuex";

export default {
  name: "app_bar",
  data: () => ({
    hover_text: "subtitle-2 text-right error--text",
    normal_text: "subtitle-2 text-right grey--text",
  }),
  computed: {
    ...mapState({
      ui_control: "ui_control",
      app_data: "app_data",
    }),
  },
};
</script>

    