import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ca_logo from "@/assets/ca_logo";


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#FF8A65',
        secondary: '#FF8A65',
        success: '#F9C413',
        accent: '#000033',
        error: '#FF0F50',
        info: '#37C948',
        warning: '#FF5722',
      },
    },
  },
  icons: {
    values: {
      ca_logo: { // name of our custom icon
        component: ca_logo, // our custom component
      },
    },
  },
});
