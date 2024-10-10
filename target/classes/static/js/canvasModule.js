var canvasModule = (function() {
    var _canvas;
    var _ctx;
    var _points = [];

    // Inicializa el canvas y los eventos del puntero
    var initializeCanvas = function(canvasId) {
        _canvas = document.getElementById(canvasId);
        if (!_canvas) {
            console.error("Canvas element not found");
            return;
        }
        _ctx = _canvas.getContext("2d");
        _initPointerEvents();
    };

    // Añadir los eventos del puntero
    var _initPointerEvents = function() {
        if (window.PointerEvent) {
            _canvas.addEventListener("pointerdown", function(event) {
                _addPointer(event);
            });
        } else {
            // Fallback para navegadores que no soportan PointerEvent
            _canvas.addEventListener("mousedown", function(event) {
                _addPointer(event);
            });
            _canvas.addEventListener("touchstart", function(event) {
                _addPointer(event.touches[0]);
            });
        }
    };

    // Captura la posición del clic/touch y guarda los puntos
    var _addPointer = function(event) {
        var rect = _canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        _points.push({ x: x, y: y });
        drawCanvas(_points);
    };

    // Dibuja los puntos capturados en el canvas
    var drawCanvas = function(points) {
        if (!_canvas || !_ctx) {
            console.error("Canvas or context is not initialized");
            return;
        }
        
        _canvas.width = _canvas.width; // Limpiar canvas
        if (points.length > 0) {
            _ctx.beginPath();
            _ctx.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                _ctx.lineTo(points[i].x, points[i].y);
            }
            _ctx.stroke();
        }
    };

    return {
        initialize: initializeCanvas,
        drawCanvas: drawCanvas, // Exponer la función drawCanvas correctamente
        getPoints: function() { return _points; },
        clearCanvas: function() {
            if (!_canvas) {
                console.error("Canvas is not initialized");
                return;
            }
            _points = [];
            _canvas.width = _canvas.width; // Limpiar canvas
        }
    };
})();
