import data_clean from "./data_clean"
import {
    std,
    min,
    max,
    mean,
    median,
    sum,
} from 'mathjs'
// NOTE: mathjs cannot take null

// perform data selection, grouping, averaging, mostly like pandas
export default class data_filter extends data_clean {
    constructor(df=[],fetch="") {
        super(df,fetch)
    }

    // TODO support general functions
    // set a new col based on func and cols 
    async add_new_col(new_col, cols) {
        this.df = this.df.map(row => {
            var val = 0
            cols.forEach(c => {
                if (!isNaN(row[c])) val += Number(row[c])
            });
            row[new_col] = val
            return row
        })
    }

    // add new col with new Date
    add_date(col) {
        this.df = this.df.map(row => {
            row["_date"] = new Date(row[col])
            return row
        })
    }

    // set col values types
    set_col(col, type) {
        this.df = this.df.map(x => {
            switch (type) {
                case "num":
                    x[col] = Number(x[col]);
                    break;
                case "date":
                    x[col] = new Date(x[col]);
                    break;
                case "int":
                    x[col] = parseInt(x[col]);
                    break;
                case "float":
                    x[col] = parseFloat(x[col]);
                    break;
            }
            return x
        })
    }

    get_col(col) {
        return this.df.map(x => x[col])
    }

    // filter a column based on value array
    filter_col(col, val) {
        // col: col name
        // val: array
        var res = this.df.filter(item => {
            return val.includes(item[col])
        })
        return res
    }

    // get unique values for a column
    unique_col(col, df = this.df) {
        var res = df.reduce((prev, curr) => {
            if (curr[col] != "" && !prev.includes(curr[col])) {
                prev.push(curr[col])
            }
            return prev
        }, [])
        return res
    }

    // get statistic for a col
    // can calculate stats if other df is provided
    stats_col(col, func, df = this.df) {
        var res
        var y = df.filter(x => x[col] != null).map(x => x[col])
        if (y.length == 0) return null
        switch (func) {
            case "min":
                res = min(y)
                break;
            case "max":
                res = max(y)
                break;
            case "mean":
                res = mean(y)
                break;
            case "std":
                res = std(y)
                break;
            case "median":
                res = median(y)
                break;
            case "sum":
                res = sum(y)
                break;
            case "count":
                res = y.length
                break;
        }
        return Math.round(res * 100) / 100
    }

    // get grouped col2 based on col1
    // aggregated with 6 func: min, max, mean, median, count, sum
    group_by_col(col1, col2, func, df = this.df) {
        var group = this.unique_col(col1, df)
        var res = []
        group.forEach(g => {
            var res_row = {}
            res_row[col1] = g
            var temp = df.filter(x => x[col1] == g)
            if (temp.length > 0) {
                res_row[col2] = this.stats_col(col2, func, temp)
            } else res_row[col2] = null
            res.push(res_row)
        })
        return res
    }

    // sort based on col
    

}