import plotly_fig from "./src/plotly_fig"
import map_box from "./src/map_box"

import bar_race from "./src/bar_race"


// plot_config = {
//     viz_type: "plotly",
//     id:"",
//     name:"",
//     x_title:"",
//     y_title:"",
//     x_col:"",
//     y_col:"",
//     plot_type:null,
//     trace_data:null,
//     layout:null,

// }

export default class {
    constructor(plot_config) {
        this.plot_config = plot_config
        var viz = plot_config.viz_type
        var div = plot_config.div
        var fig_type = plot_config.fig_type
        var layout = plot_config.layout
        var config = plot_config.config

        switch (viz) {
            case "plotly":
                var plot_type = plot_config.plot_type
                this.plot_obj = new plotly_fig(div, fig_type, plot_type)
                this.plot_obj.set_layout(layout)
                this.plot_obj.set_config(config)
                break
            case "mapbox":
                this.plot_obj = new map_box(div, fig_type)
                this.plot_obj.set_layout(layout)
                this.plot_obj.set_config(config)
                break
            case "bar_race":
                this.plot_obj = new bar_race(plot_config)
                break
        }

    }

}