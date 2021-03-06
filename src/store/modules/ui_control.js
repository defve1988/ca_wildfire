
const state = {
    show_infor_dialog: false,
    status_calculations: [
        {
            text: "Total Incidents",
            col: "AcresBurned",
            func: "count",
            val: null,
            text_color: ""
        },
        {
            text: "Major Incidents",
            col: "MajorIncident",
            func: "sum",
            val: null,
            text_color: "",
        },
        
        {
            text: "Acres Burned",
            col: "AcresBurned",
            func: "sum",
            val: null,
            text_color: "red--text text--darken-1",
        },
        {
            text: "Days Burned",
            col: "last_time",
            func: "sum",
            val: null,
            text_color: "",
        },
        {
            text: "Personnel Involved",
            col: "PersonnelInvolved",
            func: "sum",
            val: null,
            text_color: "purple--text text--darken-1",
        },
        {
            text: "Injuries",
            col: "Injuries",
            func: "sum",
            val: null,
            text_color: "orange--text text--darken-1"
        },
        {
            text: "Fatalities",
            col: "Fatalities",
            func: "sum",
            val: null,
            text_color: "brown--text text--darken-1",
        },
        {
            text: "Structures Destroyed",
            col: "StructuresDestroyed",
            func: "sum",
            val: null,
            text_color: "",
        },
        {
            text: "Structures Damaged",
            col: "StructuresDamaged",
            func: "sum",
            val: null,
            text_color: "",
        },
    ],
    auto_list: {
        height: 300,
        show: true,
        sort_by: [
            { text: "Acres Burned", col: "AcresBurned" },
            { text: "Started Date", col: "Started" },
            { text: "Days Burned", col: "last_time" },
            { text: "Injuries", col: "Injuries" },
            { text: "Fatalities", col: "Fatalities" },
            { text: "Structures Damaged", col: "StructuresDamaged" },
        ],
    },
    map_setting: {
        center: { lat: 37.5, lon: -121 },
        zoom: 5.2,
        height: 760,
    },
    map_tabs: [
        // method can be overlay
        {
            text: "Acres Burned",
            cols: ["AcresBurned"],
            method: "sum",
            color: "#E53935",
        },
        {
            text: "Personnel Involved",
            cols: ["PersonnelInvolved"],
            method: "sum",
            color: "#8E24AA",
        },
        { text: "Injuries", cols: ["Injuries"], method: "sum", color: "#FB8C00" },
        { text: "Fatalities", cols: ["Fatalities"], method: "sum", color: "#6D4C41" },
        {
            text: "Structures Involved",
            cols: [
                "StructuresDestroyed",
                "StructuresDamaged",
                "StructuresEvacuated",
                "StructuresThreatened",
            ],
            method: "sum",
            color: "#3E2723",
        },
    ],

    bar_selector: {
        tabs: [
            {
                text: "Acres Burned",
                cols: "AcresBurned",
                color: "red",
            },
            {
                text: "Days Burned",
                cols: "last_time",
                color: "red",
            },
            {
                text: "Personnel Involved",
                cols: "PersonnelInvolved",
                color: "red",
            },
            { text: "Injuries", cols: "Injuries", color: "red" },
            {
                text: "Fatalities",
                cols: "Fatalities",
                color: "red",
            },
            {
                text: "Structures Destroyed",
                cols: "StructuresDestroyed",
                color: "red",
            },
            {
                text: "Structures Damaged",
                cols: "StructuresDamaged",
                color: "red",
            },
        ],
    },

    hist_selector: {
        tabs: [
            {
                text: "Acres Burned",
                cols: "AcresBurned",
                color: "red",
            },
            {
                text: "Days Burned",
                cols: "last_time",
                color: "red",
            },
            {
                text: "Personnel Involved",
                cols: "PersonnelInvolved",
                color: "red",
            },
            { text: "Injuries", cols: "Injuries", color: "red" },
            {
                text: "Fatalities",
                cols: "Fatalities",
                color: "red",
            },
            {
                text: "Structures Destroyed",
                cols: "StructuresDestroyed",
                color: "red",
            },
            {
                text: "Structures Damaged",
                cols: "StructuresDamaged",
                color: "red",
            },
        ],
        filter: { text: "Year", cols: "ArchiveYear" },
    },

    scatter_selector: {
        tabs: [
            {
                text: "Acres Burned",
                cols: "AcresBurned",
                color: "red",
            },
            {
                text: "Days Burned",
                cols: "last_time",
                color: "red",
            },
            {
                text: "Personnel Involved",
                cols: "PersonnelInvolved",
                color: "red",
            },
            { text: "Injuries", cols: "Injuries", color: "red" },
            {
                text: "Fatalities",
                cols: "Fatalities",
                color: "red",
            },
            {
                text: "Structures Destroyed",
                cols: "StructuresDestroyed",
                color: "red",
            },
            {
                text: "Structures Damaged",
                cols: "StructuresDamaged",
                color: "red",
            },
        ],
    }
};

const getters = {

};

const actions = {

};

const mutations = {


};

export default {
    state,
    getters,
    actions,
    mutations
};