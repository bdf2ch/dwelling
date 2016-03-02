"use strict";


var dwellingContainer = document.getElementById("dwelling");
var dwellingImg = document.getElementById("dwelling-background-image");
var dwellingSvg = document.getElementById("dwelling-svg");


/**
 * Класс, описывающий контейнер модуля
 * @param parameters {Object} - параметры инициализации объекта
 * @constructor
 */
function Dwelling (parameters) {
    this.title = "";
    this.background = "";

    var currentBackground = undefined;

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param))
                this[param] = parameters[param];
        }
        if (this.background !== undefined && this.background !== "")
            currentBackground = this.background;
    }

    this.getBackground = function () {
        return currentBackground;
    };

    this.setBackground = function (url) {
        if (url !== undefined && url !== "") {
            currentBackground = url;
        }
    };
};


/**
 * Класс, описывающий очередь строительства
 * @param parameters {Object} - параметры инициализации объекта
 * @constructor
 */
function Queue (parameters) {
    this.number = 0;
    this.background = "";
    this.points = [];

    var normalizedCoordinates = [];
    var selected = false;

    this.redraw = function () {
        var width = dwellingContainer.clientWidth;
        var height = dwellingContainer.clientHeight;
        var length = this.points.length;
        normalizedCoordinates.splice(0, normalizedCoordinates.length);
        for (var i = 0; i < length; i++) {
            normalizedCoordinates[i] = [];
            normalizedCoordinates[i][0] = (width / 100) * this.points[i][0];
            normalizedCoordinates[i][1] = (height / 100) * this.points[i][1];
        }
    };

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param))
                this[param] = parameters[param];
        }
        if (this.points !== undefined && this.points.constructor === Array)
            this.redraw();
    }

    this.getCoords = function () {
        return normalizedCoordinates.join();
    };

    this.select = function (flag) {
        if (flag !== undefined && flag.constructor === Boolean) {
            selected = flag;
            return selected;
        }
    };
};


/**
 * Класс, описывающий маркер на карте
 * @param parameters {Object} - параметры инициализации объекта
 * @constructor
 */
function Marker (parameters) {
    this.id = "";
    this.point = [];
    this.caption = "";
    this.title = "";
    this.class = "";
    this.queueNumber = "";
    this.houseNumber = "";

    var normalizedCoordinates = [];
    var visible = false;
    var selected = false;

    this.redraw = function () {
        var width = dwellingContainer.clientWidth;
        var height = dwellingContainer.clientHeight;
        normalizedCoordinates.splice(0, normalizedCoordinates.length);
        normalizedCoordinates[0] = (width / 100) * this.point[0];
        normalizedCoordinates[1] = (height / 100) * this.point[1];
    };

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param))
                this[param] = parameters[param];
        }
        this.redraw();
    }

    this.getCoords = function () {
        return "left: " + normalizedCoordinates[0] + "px; top: " + normalizedCoordinates[1] + "px;";
    };

    this.isVisible = function () {
        return visible;
    };

    this.show = function () {
        visible = true;
    };

    this.hide = function () {
        visible = false;
    };

    this.select = function (flag) {
        if (flag !== undefined && flag.constructor === Boolean) {
            selected = flag;
        }
    };

    this.isSelected = function () {
        return selected;
    };
};





function House (parameters) {
    this.number = 0;
    this.queueNumber = 0;
    this.background = "";
    this.points = [];

    var normalizedCoordinates = [];
    var visible = false;
    var selected = false;

    this.redraw = function () {
        var width = dwellingContainer.clientWidth;
        var height = dwellingContainer.clientHeight;
        var length = this.points.length;
        normalizedCoordinates.splice(0, normalizedCoordinates.length);
        for (var i = 0; i < length; i++) {
            normalizedCoordinates[i] = [];
            normalizedCoordinates[i][0] = (width / 100) * this.points[i][0];
            normalizedCoordinates[i][1] = (height / 100) * this.points[i][1];
        }
    };

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param) === true)
                this[param] = parameters[param];
        }
        this.redraw();
    }

    this.getCoords = function () {
        return normalizedCoordinates.join();
    };

    this.select = function (flag) {
        if (flag !== undefined && flag.constructor === Boolean) {
            selected = flag;
            return selected;
        }
    };

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {

        }
    };
};



function Flat () {
    this.id = 0;
    this.status = 0;
    this.type = "";
    this.flatNumber = 0;
    this.roomsCount = 0;
    this.entrance = 0;
    this.floor = 0;
    this.area = {
        total: 0,
        living: 0,
        kitchen: 0,
        loggia: 0
    };
    this.price = 0;
    this.pricePerMeter = 0;
    this.livingNew = 0;
    this.categoryType = 0;
    this.windowView = 0;

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id = parseInt(JSONdata["id"]);
            this.type = JSONdata["type"];
            this.flatNumber = parseInt(JSONdata["geo_flatnum"]);
            this.roomsCount = parseInt(JSONdata["estate_rooms"]);
            this.entrance = parseInt(JSONdata["geo_house_entrance"]);
            this.floor = parseInt(JSONdata["estate_floor"]);
            this.area.total = parseFloat(JSONdata["estate_area"]).toFixed(2);
            this.area.living = JSONdata["estate_area_living"];
            this.area.kitchen = JSONdata["estate_area_kitchen"];
            this.area.loggia = JSONdata["estate_area_loggia"];
            this.price = parseFloat(JSONdata["estate_price"]).toFixed(0);
            this.pricePerMeter = parseFloat(JSONdata["estate_price_m2"]);
            this.categoryType = JSONdata["estate_category_type_human"];
        }
    };
};





var dwellingModule = angular.module("dwelling", [])
    .config(function ($provide) {
        $provide.service("$dwelling", ["$log", "$http", "$window", function ($log, $http, $window) {
            var dwelling = undefined;
            var markers = [];
            var queues = [];
            var houses = [];
            var flats = [];

            var service = {

                get: function () {
                    return dwelling;
                },
                set: function (parameters) {
                    if (parameters !== undefined) {
                        dwelling = new Dwelling(parameters);
                        if (dwelling.background !== undefined && dwelling.background !== "") {

                        }
                    }
                },

                queues: {
                    getAll: function () {
                        return queues;
                    },
                    add: function (parameters) {
                        if (parameters !== undefined) {
                            var queue = new Queue(parameters);
                            queues.push(queue);
                            console.log("queue = ", queue);
                            return queue;
                        }
                    }
                },

                houses: {
                    getAll: function () {
                        return houses;
                    },
                    add: function (parameters) {
                        if (parameters !== undefined) {
                            var house = new House(parameters);
                            houses.push(house);
                            return house;
                        }
                    }
                },

                flats: {
                    getAll: function () {
                        return flats;
                    }
                },

                markers: {
                    getAll: function () {
                        return markers;
                    },
                    add: function (parameters) {
                        if (parameters !== undefined) {
                            var marker = new Marker(parameters);
                            markers.push(marker);
                            return marker;
                        }
                    }
                },

                getFlats: function (complexNumber, houseNumber, houseIndex) {
                    if (complexNumber !== undefined && houseNumber !== undefined && houseIndex !== undefined) {
                        var url = "http://i-mera.ru/estate/api/getFlats/" + complexNumber + "/" + houseNumber + "/" + houseIndex;
                        $http.get(url)
                            .success(function (data) {
                                if (data !== undefined) {
                                    //$log.log(data);
                                    angular.forEach(data, function (flat_json) {
                                        var flat = new Flat();
                                        flat.fromJSON(flat_json);
                                        flats.push(flat);
                                        //console.log(flat.flatNumber);
                                    });
                                }
                            });
                    }
                }
            };



            return service;
        }])
    })
    .run(function ($log, $dwelling) {
        $dwelling.set({
            background: "img/01.jpg"
        });

        $dwelling.queues.add({
            number: 1,
            background: "img/queue_1.jpg",
            points: [
                [22.6, 62.5], [34.2, 79.8], [52.8, 60],
                [44.7, 48.4], [44.6, 43], [42.4, 40.8],
                [37.4, 47.1]
            ]
        });

        $dwelling.markers.add({
            id: "queue_1",
            point: [34, 55],
            class: "queue",
            caption: "1",
            title: "очередь",
            queueNumber: 1
        }).show();

        $dwelling.markers.add({
            id: "queue_1_flats",
            point: [38, 54.5],
            class: "flats",
            caption: "28",
            title: "квартир",
            queueNumber: 1
        });

        $dwelling.houses.add({
            number: 1,
            background: "img/house.jpg",
            queueNumber: 1,
            points: [
                [57.6, 19.3], [54.2, 21.0], [54.2, 22.5],
                [54.6, 22.5], [54.4, 35],   [59, 32],
                [65, 33.8],   [64.6, 43],   [70, 45],
                [77.1, 47],   [81.1, 43.1], [81.2, 40.3],
                [77.3, 38.8], [78, 25]
            ]
        });

        $dwelling.markers.add({
            id: "house_1",
            point: [60, 20],
            class: "queue",
            caption: 1,
            title: "дом",
            queueNumber: 1,
            houseNumber: 1
        });

        $dwelling.markers.add({
            id: "house_1_flats",
            point: [64, 19.5],
            class: "flats",
            caption: 25,
            title: "квартир",
            queueNumber: 1,
            houseNumber: 1
        }).hide();

        $dwelling.queues.add({
            number: 2,
            background: "img/queue_2.jpg",
            points: [
                [52.8, 60],   [44.5, 48.4], [44.4, 43.4],
                [43.3, 41.9], [45.4, 39.6], [45.4, 39],
                [51.3, 31.6], [52.4, 32.5], [54.2, 30.6],
                [54.2, 29.7], [59.8, 23],   [60.6, 23.8],
                [62.7, 21.3], [62.7, 17.7], [64.5, 15.5],
                [71.5, 23.8], [72.8, 22.2], [74.9, 24],
                [74.4, 27.6], [75.5, 29.5], [76.5, 31.6],
                [77, 32]
            ]
        });

        $dwelling.markers.add({
            id: "queue_2",
            point: [55, 30],
            class: "queue",
            caption: "2",
            title: "очередь",
            queueNumber: 2
        }).show();

        $dwelling.markers.add({
            id: "queue_2_flats",
            point: [59, 29.5],
            class: "flats",
            caption: "54",
            title: "квартиры",
            queueNumber: 2
        });

        $dwelling.markers.add({
            id: "filter",
            point: [],
            class: "filter",
            caption: " ",
            title: "",
            queueNumber: 0
        }).show();


        $dwelling.getFlats(7, 1, 1);

    });


var dwellingApp = angular.module("dwellingApp", ["ngAnimate", "dwelling"]);

dwellingModule.controller("DwellingController", ["$log", "$scope", "$dwelling", "$window", function ($log, $scope, $dwelling, $window) {
    $scope.dwelling = $dwelling;
    $scope.filterPopup = false;
    $scope.currentQueue = undefined;
    $scope.currentHouse = undefined;
    $scope.currentImgSrc = "";
    $scope.img = dwellingImg;
    $scope.imgIsLoading = false;

    /* FILTERS */
    $scope.minFloor = 0;
    $scope.maxFloor = 0;

    $log.log(dwellingImg.src);

    $scope.$watch("img.src", function (val) {
        $log.log("src = ", val);
        $scope.imgIsLoading = true;
    });

    angular.element(dwellingImg).bind("load", function (event) {
        $log.log("image loaded");
        $log.log(dwellingImg.src);
    });


    $scope.onClickMarker = function (marker) {
        if (marker !== undefined) {
            var length = $dwelling.markers.getAll().length;
            switch (marker.class) {
                case "queue":
                    $scope.selectQueue(marker.queueNumber);
                    break;
                case "filter":
                    $scope.filterPopup = true;
                    var length = $dwelling.markers.getAll().length;
                    for (var i = 0; i < length; i++) {
                        var marker = $dwelling.markers.getAll()[i];
                        if (marker.class === "filter") {
                            marker.hide();
                        }
                    }
                    break;
            }
        }
    };

    $scope.markerMouseIn = function (marker, event) {
        event.stopPropagation();
        if (marker !== undefined) {
            var length = $dwelling.markers.getAll().length;
            for (var i = 0; i < length; i++) {
                var temp_marker = $dwelling.markers.getAll()[i];
                if ($scope.currentQueue !== undefined) {
                    if (marker.class === "queue") {
                        if (temp_marker.class === "flats" && temp_marker.houseNumber !== "")
                            temp_marker.show();
                    }
                } else {
                    if (marker.class === "queue") {
                        if (temp_marker.class === "flats" && temp_marker.queueNumber !== "" && temp_marker.houseNumber === "") {
                            temp_marker.show();
                        }
                    }
                }
                //if (marker.class === "queue") {
                //    if (temp_marker.class === "flats" && temp_marker.queueNumber !== "" && temp_marker.queueNumber === marker.queueNumber && temp_marker.houseNumber === "") {
                //        temp_marker.show();
                //    }
                //}
            }
        }
    };

    $scope.markerMouseOut = function (markerId, event) {
        event.stopPropagation();
        if (markerId !== undefined) {
            var length = $dwelling.markers.getAll().length;
            for (var i = 0; i < length; i++) {
                var marker = $dwelling.markers.getAll()[i];
                if (marker.id === markerId) {
                    if (marker.class === "queue") {
                        for (var x = 0; x < length; x++) {
                            var marker_ = $dwelling.markers.getAll()[x];
                            if (marker_.class === "flats" && marker_.queueNumber === marker.queueNumber) {
                                marker_.hide();
                            }
                        }
                    }
                }
            }
        }
    };





    $scope.back = function () {
        if ($scope.currentHouse !== undefined) {
            $dwelling.get().setBackground($scope.currentQueue.background);
            $scope.currentHouse = undefined;
        } else {
            if ($scope.currentQueue !== undefined) {
                $dwelling.get().setBackground($dwelling.get().background);
                var length = $dwelling.markers.getAll().length;
                for (var i = 0; i < length; i++) {
                    var marker = $dwelling.markers.getAll()[i];
                    if (marker.class === "queue" && marker.houseNumber === "")
                        marker.show();
                    else
                        marker.hide();
                    if (marker.class === "filter")
                        marker.show();
                }
                $scope.currentQueue = undefined;
            }
        }
    };

    $scope.selectQueue = function (queueNumber) {
        if (queueNumber !== undefined) {
            var length = $dwelling.queues.getAll().length;
            for (var i = 0; i < length; i++) {
                var queue = $dwelling.queues.getAll()[i];
                if (queue.number === queueNumber) {
                    queue.select(true);
                    $scope.currentQueue = queue;
                    $dwelling.get().setBackground(queue.background);
                } else
                    queue.select(false);
            }
            length = $dwelling.markers.getAll().length;
            for (var i = 0; i < length; i++) {
                var marker = $dwelling.markers.getAll()[i];
                if (marker.class === "queue" && marker.queueNumber !== "" && marker.houseNumber === "")
                    marker.hide();
                if (marker.class === "queue" && marker.queueNumber === queueNumber && marker.houseNumber !== "")
                    marker.show();
                //if (marker.class === "flats" && marker.queueNumber !== "")
                //    marker.hide();
                //if (marker.class === "queue" && marker.houseNumber !== "" && marker.queueNumber !== "" && marker.queueNumber === $scope.currentQueue.number)
                //    marker.show();
            }
            $log.log("current queue = ", $scope.currentQueue);
        }
    };

    $scope.selectHouse = function (house) {
        if (house !== undefined) {
            var length = $dwelling.houses.getAll().length;
            for (var i = 0; i < length; i++) {
                var tempHouse = $dwelling.houses.getAll()[i];
                if (tempHouse.number === house.number && tempHouse.queueNumber === house.queueNumber) {
                    tempHouse.select(true);
                    $scope.currentHouse = tempHouse;
                    $dwelling.get().setBackground(house.background);
                } else
                    tempHouse.select(false);
            }

            var length = $dwelling.markers.getAll().length;
            for (var i = 0; i < length; i++) {
                var marker = $dwelling.markers.getAll()[i];
                if (marker.class === "queue" && marker.houseNumber === house.number) {
                    marker.show();
                }
            }
        }
    };

    $scope.queueMouseIn = function (queue) {
        if (queue !== undefined) {
            var length = $dwelling.markers.getAll().length;
            for (var i = 0; i < length; i++) {
                var marker = $dwelling.markers.getAll()[i];
                if (marker.class === "flats" && marker.queueNumber === queue.number && marker.houseNumber === "") {
                    marker.show();
                }
            }
        }
    };

    $scope.queueMouseOut = function (queue) {
        if (queue !== undefined) {
            var length = $dwelling.markers.getAll().length;
            for (var i = 0; i < length; i++) {
                var marker = $dwelling.markers.getAll()[i];
                if (marker.class === "flats" && marker.queueNumber === queue.number) {
                    marker.hide();
                }
            }
        }
    };

    $scope.showFilter = function () {
        $log.log("popup");
        $scope.filterPopup = true;
    };

    $scope.closeFilter = function () {
        $scope.filterPopup = false;
        var length = $dwelling.markers.getAll().length;
        for (var i = 0; i < length; i++) {
            var marker = $dwelling.markers.getAll()[i];
            if (marker.class === "filter") {
                marker.show();
            }
        }
    };

    $scope.redraw = function () {
        var length = $dwelling.queues.getAll().length;
        for (var i = 0; i < length; i++) {
            $dwelling.queues.getAll()[i].redraw();
        }
        length = $dwelling.markers.getAll().length;
        for (var i = 0; i < length; i++) {
            $dwelling.markers.getAll()[i].redraw();
        }
        length = $dwelling.houses.getAll().length;
        for (var i = 0; i < length; i++) {
            $dwelling.houses.getAll()[i].redraw();
        }
    };


    angular.element($window).on("resize", function () {
        $scope.redraw();
        $scope.$apply();
    });

    $scope.selectQueue(1);
}]);



dwellingModule.filter("floor", ["$log", function ($log) {
    return function (input, minFloor, maxFloor) {
        if (input.length > 0) {
            var result = [];
            var min = minFloor !== undefined ? minFloor : 0;
            var max = maxFloor !== undefined && maxFloor !== 0 ? maxFloor : 100;
            var length = input.length;
            //$log.log("filtered length = ", length);
            //$log.log("minFloor = ", min);
            //$log.log("maxFloor = ", max);
            for (var i = 0; i < length; i++) {
                //$log.log("floor = ", input[i].floor);
                if (input[i].floor >= min && input[i].floor <= max) {
                    result.push(input[i]);
                }
            }
            //$log.log("filtered = ", result);
            return result;
        } else
            return input;
    }
}]);



dwellingModule.directive("slider", ["$log", function ($log) {
    return {
        restrict: "E",
        scope: {
            manValue: "@",
            maxValue: "@",
            step: "@",
            caption: "@"
        },
        template: "<div class='slider-control'>" +
                       "<span class='slider-picker start'>" +
                           "<span class='slider-picker-label'>1</span><span class='slider-picker-pin'></span>" +
                       "</span>" +
                       "<span class='slider-picker end'>" +
                           "<span class='slider-picker-label'>2</span><span class='slider-picker-pin'></span>" +
                       "</span>" +
                       "<div class='slider-line'>" +
                       "<div class='slider-caption'>{{ caption }}</div>" +
                   "</div>",
        replace: true,
        link: function (scope, element, attrs) {
            //$log.log("slider directive");
            var width = angular.element(element)[0].clientWidth;
            var startPin = angular.element(element).children()[0];
            var endPin = angular.element(element).children()[1];
            var stepWidth = width / (parseInt(scope.maxValue) / parseInt(scope.step));
            var startPinDown = false;
            var endPinDown = false;
            var startPinXPosition = 0;
            var endPinXPosition = 0;
            var x = 0;
            //$log.log("startPin = ", startPin);
            //$log.log("endPin = ", endPin);
            //$log.log("slider width = ", width);
            //$log.log("stepWidth = ", stepWidth);

            angular.element(startPin).bind("mousedown", function (event) {
                $log.log("start pin mousedown");

                $log.log(angular.element(event.target)[0].offsetParent.offsetLeft);
                startPinDown = true;
                startPinXPosition = event.pageX;
                $log.log("start x = ", startPinXPosition);
            });

            angular.element(startPin).bind("mousemove", function (event) {
                if (startPinDown === true) {
                    if (event.pageX > startPinXPosition) {
                        angular.element(startPin).css({
                            "left": angular.element(startPin).prop("offsetLeft") + (event.pageX - startPinXPosition) + "px"
                        });
                        startPinXPosition = event.pageX;
                    }

                    $log.log("element offsetX = ", angular.element(element).prop("clientLeft"));
                    if ((event.pageX <= startPinXPosition) && ((startPinXPosition - event.pageX) >= 0)) {
                        $log.log("offsetX = ", angular.element(event.target)[0].offsetParent.offsetLeft);
                        if (angular.element(event.target)[0].offsetParent.offsetLeft > 0) {
                            angular.element(startPin).css({
                                "left": angular.element(startPin).prop("offsetLeft") - (startPinXPosition - event.pageX) + "px"
                            });
                            startPinXPosition = event.pageX;
                        } else {
                            //startPinXPosition = 0;
                            angular.element(startPin).css({
                                "left": "0px"
                            });
                        }
                    }
                }
            });

            angular.element(startPin).bind("mouseleave", function (event) {
                $log.log("start pin mouse leave");
                startPinDown = false;
            });

            angular.element(startPin).bind("mouseup", function (event) {
                $log.log("start pin mouseup");
                startPinDown = false;

            });


            angular.element(element).bind("mouseup", function (event) {
                if (startPinDown === true) {
                    $log.log("slider mouseup");
                    startPinDown = false;
                }
            });

            angular.element(element).bind("mouseleave", function (event) {
                    //$log.log("slider mouseleave");
                    startPinDown = false;
            });



            angular.element(endPin).bind("mousedown", function () {
                $log.log("end pin mousedown");
                endPinDown = true;
            });

            angular.element(endPin).bind("mouseup", function () {
                $log.log("end pin mouseup");
                endPinDown = false;
            });
        }
    }
}]);