import e from "express"
import plotly_func from "./plotly_func"

export default class extends plotly_func {
    color_theme = [
        '#1E88E5',
        '#28965A',
        '#E53E20',
        '#7CB342',
        '#d95282',
        '#FBC02D',
        '#00B8DC',
        '#232322',
        '#AAAAAA',
    ]
    constructor(div, fig_type, plot_type) {
        super(div, fig_type)
        this.plot_type = plot_type
        this.set_plot_func()
        this.set_fig()

    }

    set_trace_func() {
        switch (this.plot_type) {
            case "wind_rose":
                this.gen_trace = this.gen_wind_rose
                break
            case "hist":
                this.gen_trace = this.gen_hist
                break
        }
    }

    gen_hist(data, max_y, bin_num = 100, update = true, plot = true) {
        var trace = []
        data.forEach((d, index) => {
            trace.push({
                x: d.x,
                name: d.y_name,
                xbins: {
                    end: max_y,
                    start: 0,
                    size: max_y / bin_num,
                },
                autobinx: true,
                histnorm: "counts",
                marker: {
                    color: this.hex2rgba(this.color_theme[(index) % 9], 0.5),
                    line: {
                        color: this.hex2rgba(this.color_theme[(index) % 9], 1),
                        width: 0.5
                    }
                },
                opacity: 0.7,
                type: "histogram",
            })
        })
        if (update) this.trace = this.trace.concat(trace)
        if (plot) this.plot_new()
        console.log(trace)
        return trace
    }


    gen_line() {

    }

    gen_wind_rose(data, update = true, plot = true) {
        let d = ["North", "NNE", "NE", "ENE", "East", "ESE", "SE", "SSE", "South", "SSW", "SW", "WSW", "West", "WNS", "NW", "NNW"]
        var trace = []
        if (data == null) {
            trace = [{
                r: new Array(16).fill(0),
                theta: d,
                type: "barpolar"
            }, ]
        }
        else trace = data

        this.layout.polar = {
            barmode: "overlay",
            bargap: 0,
            radialaxis: {
                ticksuffix: "%",
                angle: 45,
                dtick: 5
            },
            angularaxis: {
                direction: "clockwise"
            },
        }

        if (update) this.trace = this.trace.concat(trace)
        if (plot) this.plot_new()
        console.log(trace)
        return trace
    }

}