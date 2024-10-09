//@author hcadavid

apimock = (function () {

    var mockdata = [];

    mockdata["johnconnor"] = [
        {author: "johnconnor", "points": [{"x": 150, "y": 120}, {"x": 215, "y": 115}], "name": "house"},
        {author: "johnconnor", "points": [{"x": 340, "y": 240}, {"x": 15, "y": 215}], "name": "gear"},
        {author: "johnconnor", "points": [{"x": 170, "y": 230}, {"x": 415, "y": 205}], "name": "stadium"},
        {author: "johnconnor", "points": [{"x": 505, "y": 450}, {"x": 305, "y": 31}], "name": "arena"}
        ];
    mockdata["maryweyland"] = [
        {author: "maryweyland", "points": [{"x": 140, "y": 140}, {"x": 115, "y": 115}], "name": "house2"},
        {author: "maryweyland", "points": [{"x": 140, "y": 140}, {"x": 115, "y": 115}], "name": "gear2"},
        {author: "maryweyland", "points": [{"x": 40, "y": 10}, {"x": 15, "y": 105}], "name": "stadium2"},
        {author: "maryweyland", "points": [{"x": 100, "y": 40}, {"x": 5, "y": 125}], "name": "arena2"}
        ];


    return {
        getBlueprintsByAuthor: function (authname, callback) {
            callback(
                    mockdata[authname]
                    );
        },

        getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {

            callback(
                    mockdata[authname].find(function (e) {
                return e.name === bpname
            })
                    );
        }
    }

})();

/*
 Example of use:
 var fun=function(list){
 console.info(list);
 }
 
 apimock.getBlueprintsByAuthor("johnconnor",fun);
 apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/