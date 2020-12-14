<template>
  <v-list :height="list_height" id="auto_list">
    <v-row
      v-for="(item, index) of list_data"
      :key="index"
      :id="'row_' + index"
    >
      <v-col class="px-7 my-0 py-0">
        <span :class="item.val_class">
          {{ numberWithCommas(item.val) }}
        </span>
        <span :class="item.text_class"> {{item.text_0}} | {{item.text_1}},  {{ item.text_2 }} </span>
      </v-col>
    </v-row>
  </v-list>
</template>
    
<script>
export default {
  name: "auto_list",
  props: ["list_height", "list_data"],
  mounted() {
       this.auto_scroll();
  },
  data: () => ({}),
  methods: {
    numberWithCommas(x) {
      if (x == null) return "";
      else return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    auto_scroll() {
      var scrollUpBox = document.getElementById("auto_list");
      var prev_top;
      function scrollUp() {
        scrollUpBox.scrollTop++;
        if (prev_top == scrollUpBox.scrollTop) scrollUpBox.scrollTop = 0;
        else prev_top = scrollUpBox.scrollTop;
      }
      var TIME = 50;
      var timer = setInterval(scrollUp, TIME);
      scrollUpBox.onmouseover = function () {
        clearInterval(timer);
      };
      scrollUpBox.onmouseout = function () {
        timer = setInterval(scrollUp, TIME);
      };
    },
  },
};
</script>

<style>
/* div {
  outline: 1px dashed red;
} */
#auto_list {
  overflow-y: auto;
  overflow-x: auto;
  scrollbar-width: none;
}
#auto_list::-webkit-scrollbar {
  display: none;
}
</style>