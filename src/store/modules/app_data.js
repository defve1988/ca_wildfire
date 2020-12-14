import my_df from "@/my_df"
import my_plot from "@/my_plot"
import json from "@/assets/ca_wildfire_final.json"

const state = {
  data: new my_df(json),
  date_range: [],
  year_range: [],
  slider: 0,
  map_view: new my_plot(),
  map_trace: [],
  hist_view: new my_plot(),
  hist_trace: [],
  scatter_view: new my_plot(),
  scatter_trace: [],
  bar_view: new my_plot(),
  bar_trace: [],
  include_all: true,
};

const getters = {

};

const actions = {

};

const mutations = {
  TEST(state) { console.log(state) },
  INIT_DF(state) {
    var date = []
    var year = []
    state.data.df.forEach((r) => {
      r.Started = new Date(r.Started.replace("T", " ").replace("Z", " "));
      // if (r.Extinguished==null) {
      //   var p=new Date()
      //   p = p.getFullYear() + "-" + Number(p.getMonth() + 1) + "-" + p.getDate()
      //   console.log(p)
      // }
      r.end =
        r.Extinguished == null
          ? new Date()
          : new Date(r.Extinguished.replace("T", " ").replace("Z", " "));
      var last_time = r.end - r.Started;
      r.last_time = last_time > 0 ? last_time / 1000 / 3600 / 24 : null;

      var date_1 = r.Started.getFullYear() + "-" + Number(r.Started.getMonth() + 1) + "-" + r.Started.getDate()
      var date_2 = r.end.getFullYear() + "-" + Number(r.end.getMonth() + 1) + "-" + r.end.getDate()
      if (!date.includes(date_1)) date.push(date_1)
      if (!date.includes(date_2)) date.push(date_2)
      if (!year.includes(r.ArchiveYear)) year.push(r.ArchiveYear)
    });

    state.data.df.sort((a, b) => a.end - b.end)
    date.sort((a, b) => new Date(a) - new Date(b))
    // console.log(date)
    state.date_range = date
    state.year_range = year
    state.slider = date.length
  },


  GENE_MAP_TRACE(state, tab) {
    function color_scale(dt) {
      dt = dt / 1000 / 3600 / 24
      var scale = [
        [0, 'rgb(40, 40, 40)'],
        [15, 'rgb(60, 60, 60)'],
        [30, 'rgb(80, 80, 80)'],
        [60, 'rgb(100, 100, 100)'],
        [90, 'rgb(120, 120, 120)'],
        [125, 'rgb(140, 140, 140)'],
        [250, 'rgb(160, 160, 160)'],
        [500, 'rgb(180, 180, 180)'],
        [750, 'rgb(200, 200, 200)'],
        [1000, 'rgb(220, 220, 220)'],
      ]
      var res
      for (let i = 0; i < scale.length; i++) {
        if (dt >= scale[i][0]) {
          res = scale[i][1]
          break;
        }
      }
      return res
    }

    var date = state.date_range[state.slider]
    var res = []
    state.data.df.forEach(row => {
      if (row.Started < new Date(date)) {

        let val = 0
        tab.cols.forEach(c => {
          val += row[c]
        })
        var color, op
        if (tab.text == "Acres Burned") {
          color = row.end <= new Date(date) ? color_scale(new Date(date) - row.end) : tab.color
          op = row.end <= new Date(date) ? 0.5 : 0.8
        }
        else {
          color = tab.color
          op = 0.5
        }
        if (state.include_all || row.end > new Date(date) || tab.text != "Acres Burned") {
          var temp = {
            name: tab.text,
            lat: row.Latitude,
            lon: row.Longitude,
            text: val + " " + tab.text + " | " + row.Name + ", " + row.ArchiveYear,
            color: color,
            size: Math.log2(val) + 5,
            op: op
          }
          res.push(temp)
        }

      }
    })
    // console.log(res)
    state.map_trace = res
  },

  GENE_HIST_TRACE(state, tab) {
    state.hist_trace = {
      data: [], max_y: -Infinity
    }
    var max_y = -Infinity

    state.year_range.forEach(y => {
      var res = []
      state.data.df.forEach(row => {
        if (row.ArchiveYear == y) {
          var temp = {
            x: row[tab.cols],
            y_name: [tab.text],
          }
          res.push(temp)
          if (row[tab.cols] > max_y) max_y = row[tab.cols]
        }
      })

      state.hist_trace.data.push({
        x: res.map(x => x.x),
        y_name: y
      })
    })
    state.hist_trace.max_y = max_y
    console.log(state.hist_trace)
  },

  GENE_HIST_TRACE_ALL(state, tab) {
    state.hist_trace = {
      data: [], max_y: -Infinity
    }
    var max_y = -Infinity

    var res = []
    state.data.df.forEach(row => {
      var temp = {
        x: tab.cols == "AcresBurned" ? Math.log10(row[tab.cols]) : row[tab.cols],
        y_name: [tab.text],
      }
      res.push(temp)
      if (row[tab.cols] > max_y) max_y = row[tab.cols]

    })

    state.hist_trace.data.push({
      x: res.map(x => x.x),
      y_name: tab.cols == "AcresBurned" ? "Log(" + tab.text + ")" : tab.text
    })

    state.hist_trace.max_y = max_y
    console.log(state.hist_trace)
  },

  GENE_SCATTER(state, xy) {
    var res = []
    var x = xy.x
    var y = xy.y
    state.data.df.forEach(row => {
      var temp = {
        x:  row[x.cols],
        y: row[y.cols],
      }
      res.push(temp)
    })
    state.scatter_trace = [{
      x: res.map(x => x.x),
      y: res.map(x => x.y),
      y_name: x.text + '-' + y.text
    }]
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};