<template>
  <v-hover v-slot="{ hover }">
    <v-footer color="grey lighten-3" height=35 class="py-0">
      <v-icon :color="hover ? 'red' : ''" class="mr-1"> mdi-fire </v-icon>
      <div class="mt-1">
        <span :class="hover ? hover_text : normal_text">
          Chuanlong Zhou &copy; 2020
          <span style="color: grey">
            | Data Source:
            <a
              style="color: grey"
              href="https://www.fire.ca.gov/"
              target="_blank"
            >
              CAL FIRE
            </a>
          </span>
        </span>
      </div>
    </v-footer>
  </v-hover>
</template>
    
<script>
export default {
  name: "footer_",
  data: () => ({
    hover_text: "subtitle-2 text-right error--text",
    normal_text: "subtitle-2 text-right grey--text",
  }),
};
</script>
<style scoped>
span {
  display: inline-block;
  vertical-align: bottom;
}
</style>

    