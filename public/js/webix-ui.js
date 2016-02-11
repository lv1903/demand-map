
//map layout

if (typeof window.demandMap === "undefined") {
    demandMap = {};
}



demandMap.uiMapView = {
    view:"google-map",
    id:"map",
    zoom:11,
    center:[ 50.9, -1.35 ]
};



//graph layout



demandMap.uiLineChart = {
    cols:[
        {
            view:"chart",
            id: "popChart",
            type:"line",
            value:"#total_pop#",
            preset:"plot",
            xAxis:{
                template:"#year#"

            },
            yAxis:{
            },
            data: []
        }
    ]
};


demandMap.uiDemandChart = {
    cols:[
        {
            view: "chart",
            id: "demandChart",
            type: "barH",
            value: "#year#",
            yAxis: {
                template: "#age#"

            },
            xAxis: {
                start:0
            },
            border: false,
            barWidth: 35,
            alpha: 1,
            series:[
                {
                    value:"#male#",
                    color: "lightblue"

                },
                {
                    value:"#female#",
                    color:"pink"

                }
            ],
            data: []
        }
    ]
};

demandMap.uiPopPyramidChart = {
    cols:[
        {
            view: "chart",
            id: "popPyramidChart",
            type: "barH",
            value: "#year#",
            yAxis: {
                template: "#age#"

            },
            xAxis: {
                start:0
            },
            border: false,
            barWidth: 35,
            alpha: 1,
            series:[
                {
                    value:"#male#",
                    color: "lightblue"

                },
                {
                    value:"#female#",
                    color:"pink"

                }
            ],
            data: []
        }
    ]
}



demandMap.uiGraphComponents = {

    container:"graphComponents", //corresponds to the ID of the div block
    view: "scrollview",
    scroll: "x",
    body: {
        cols: [
            {
                id: "details",
                gravity: 1,
                //minWidth: 200,
                rows: [
                    {
                        id: "areaName",
                        template: "<div style='padding-left:5px'>Select an area on the map</div>",
                        height: 40

                    },
                    {
                        id: "areaCost",
                        template: "<h1></h1>",
                        gravity: 1
                    },
                    {
                        id: "areaYear",
                        template: "<div style='font-size: 42px; padding: 14px; color: lightgrey; font-weight: bold'>" + year + "</div>",
                        gravity: 1
                    }
                ]
            },
            {
                container:"demandChart",
                gravity: 2,
                //minWidth: 400,
                cols:[
                    {
                        rows: [
                            {
                                cols: [
                                    {
                                        template: "<div style='padding-left:5px'>Demand: " + oMap.demandUnit + "</div>",
                                        height: 40
                                    }
                                ]
                            },
                            demandMap.uiDemandChart

                        ],

                    },
                    {
                        rows: [
                            {
                                cols: [
                                    {
                                        template: "<div style='padding-left:5px'>Population Break Down</div>",
                                        height: 40
                                    }
                                ]
                            },
                            demandMap.uiPopPyramidChart

                        ]
                    }
                ]

            },
            {
                container:"popChart",
                //minWidth: 200,
                gravity: 1,
                rows:[
                    {
                        cols:[
                            {
                                template:"<div style='padding-left:5px'>Total Population</div>",
                                height:40
                            }
                        ]
                    },
                    demandMap.uiLineChart

                ]

            }
        ]
    }

};


//main layout

demandMap.uiMainLayout = {
    container:"layout_div",
    multi:true,
    view:"accordion",
    rows:[
        {
            id: "mapView",
            header:"",
            headerheight: 0,
            body: demandMap.uiMapView,
            height:"80vh"
        },
        {
            id: "graphView",
            header:"Area Details",
            body: demandMap.uiGraphComponents,
            minHeight:"700px",
            collapsed: true}
    ]
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////


//toolbar
var aYears = [{id:"2013", value:"2013"}, {id:"2014"}, {id:"2015"}, {id:"2016"}, {id:"2017"}, {id:"2018"}, {id:"2019"}, {id:"2020"}];


demandMap.supplypoint_toggle = {
    view:"toggle",
    type:"iconButton",
    width: 180,
    id:"supplypointToggle",
    name:"supplypointToggle",
    onIcon:"remove",
    offIcon:"dot-circle-o",
    onLabel:"hide supply points",
    offLabel:"Show supply points",
    on:{onChange: supplyPointToggle}
};

demandMap.uiToolbar = {
    container:"areaC",
    view:"toolbar", paddingY:2,
    cols:[
        { view: "search", placeholder: "search", width: 180, on: { onChange: findAddress } },
        {},
        { view:"button", value:"-", width: 28, click: backYear},
        { view:"select", options: aYears, width: 70, id: "yearList", value: year, on:{ onChange: selectYear } },
        { view:"button", value:"+", width: 28, click: forwardYear },
        {},
        demandMap.supplypoint_toggle

    ],
    checkboxRefresh:true
};



//header
demandMap.uiHeader = {
    rows:[
        {
            cols: [
                {
                    view: "template",
                    type: "header", template: "nquiringminds - " + oMap.header
                }


            ]
        }
    ]
};



//////////////////////////////////////////////////////////////////////////////////////////////



//page layout

demandMap.uiPageLayout = {
    rows: [
        demandMap.uiHeader,
        demandMap.uiToolbar,
        demandMap.uiMainLayout
    ]
};



var w =webix.ui(demandMap.uiPageLayout);


