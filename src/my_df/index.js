import data_model from "./src/data_model"
import date_format from "./src/date_format"

export default class extends data_model {

    constructor(df) {
        super(df)
        this.date_format = new date_format()
        this.filter=[]
        this.df_filter=[]
    }


}