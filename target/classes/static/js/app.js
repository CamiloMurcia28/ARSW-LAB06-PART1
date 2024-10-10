var useMockData = false;
var api = apiclient;

var app = (function(){
    var author_ = "";
    var blueprints_ = [];

    var _displayError = function(message) {
        console.log("Error",message);
        $("#error-message").text(message).show();
        setTimeout(() => $("#error-message").hide(), 3000);
    };

    var _clearCanvas = function(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    };

    return {
        changeAuthor: function(author) {
            if (!author) {
                _displayError("Author name cannot be empty");
                return;
            }
            author_ = author;
        },
        getBluePrintByName: function(name) {
            if (!name) {
                _displayError("Blueprint name is required");
                return;
            }
            var author = $("#search-author").val();
            if (!author) {
                _displayError("Author name is required");
                return;
            }
            api.getBlueprintsByNameAndAuthor(author, name, function(blueprint) {
                console.log("Blueprint data received:", blueprint);
                if (!blueprint || !blueprint.points || !Array.isArray(blueprint.points)) {
                    _displayError("Invalid blueprint data received");
                    return;
                }
                try {
                    var canvas = document.getElementById("canvas");
                    if (!canvas) {
                        _displayError("Canvas element not found");
                        return;
                    }
                    var ctx = canvas.getContext("2d");
                    _clearCanvas(canvas, ctx);
                    var points = blueprint.points;
                    if (points.length > 0) {
                        ctx.beginPath();
                        ctx.moveTo(points[0].x, points[0].y);

                        for (var i = 1; i < points.length; i++) {
                            if (typeof points[i].x === 'number' && typeof points[i].y === 'number') {
                                ctx.lineTo(points[i].x, points[i].y);
                            }
                        }
                        ctx.stroke();
                    }

                    $("#name-blueprint").text("Current Blueprint: " + blueprint.name);
                } catch (error) {
                    _displayError("Error drawing blueprint: " + error.message);
                }
            });
        },
        getBlueprints: function() {
            var author = $("#search-author").val();
            if (!author) {
                _displayError("Please enter an author name");
                return;
            }

            api.getBlueprintsByAuthor(author, function(data) {
                if (!data || !Array.isArray(data)) {
                    _displayError("No blueprints found or invalid data received");
                    return;
                }
                try {
                    blueprints_ = data.map(function(blueprint) {
                        if (!blueprint || !blueprint.points || !Array.isArray(blueprint.points)) {
                            throw new Error("Invalid blueprint format");
                        }
                        return {
                            name: blueprint.name,
                            npoints: blueprint.points.length
                        };
                    });
                    var $authorName = $("#author-name");
                    $authorName.text(author + "'s blueprints: ");
                    var $table = $("#blueprints-table");
                    var $tbody = $table.find("tbody");
                    $tbody.empty();
                    blueprints_.forEach(function(blueprint) {
                        var $row = $("<tr>");
                        $row.append($("<td>").text(blueprint.name));
                        $row.append($("<td>").text(blueprint.npoints));

                        var $button = $("<button>")
                            .text("Open")
                            .addClass("btn btn-info px-3")
                            .on("click", function() {
                                app.getBluePrintByName(blueprint.name);
                            });

                        $row.append($("<td>").append($button));
                        $tbody.append($row);
                    });

                    var totalPoints = blueprints_.reduce(function(count, blueprint) {
                        return count + blueprint.npoints;
                    }, 0);

                    $("#total-user-points").text("Total user points: " + totalPoints);
                } catch (error) {
                    _displayError("Error processing blueprints: " + error.message);
                    $("#blueprints-table tbody").empty();
                    $("#total-user-points").text("Error loading blueprints");
                }
            });
        }
    };
})();
