var apiclient = (function () {

    // Función para obtener blueprints por autor
    var getBlueprintsByAuthor = function (authorName, callback) {
        $.getJSON("http://localhost:8080/blueprints/" + authorName, function (data) {
            // Aquí se espera que el API REST retorne un array de blueprints
            callback(data);
        }).fail(function () {
            console.error("Error fetching blueprints for author:", authorName);
            callback([]);
        });
    };

    var getBlueprintsByNameAndAuthor = function(authorName, bpName, callback) {
        $.getJSON("http://localhost:8080/blueprints/" + authorName + "/" + bpName, function(data) {
            console.log("Data received from server:", data);
    
            if (Array.isArray(data) && data.length > 0) {
                data = data[0]; // Extraer el primer elemento del array
            }
    
            var transformedData = {
                author: data.author,
                name: data.name,
                points: data.points.map(function(point) {
                    return { x: point.x, y: point.y };
                })
            };
    
            console.log("Final transformed data:", transformedData);
            callback(transformedData);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Error fetching data: ", textStatus, errorThrown);
        });
    };
    
    
    
    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
    };

})();
