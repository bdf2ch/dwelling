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
    this.houseNumber = 0;
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
            this.houseNumber = JSONdata["geo_house"];
            this.flatNumber = parseInt(JSONdata["geo_flatnum"]);
            this.roomsCount = parseInt(JSONdata["estate_rooms"]);
            this.entrance = parseInt(JSONdata["geo_house_entrance"]);
            this.floor = parseInt(JSONdata["estate_floor"]);
            this.area.total = parseFloat(parseFloat(JSONdata["estate_area"]).toFixed(2));
            this.area.living = JSONdata["estate_area_living"];
            this.area.kitchen = JSONdata["estate_area_kitchen"];
            this.area.loggia = JSONdata["estate_area_loggia"];
            this.price = parseFloat(parseFloat(JSONdata["estate_price"]).toFixed(0));
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
                },

                getFlatsByComplexNumber: function (complexNumber) {
                    if (complexNumber !== undefined) {
                        var url = "http://i-mera.ru/estate/api/getFlats/" + complexNumber + "/";
                        $http.post(url)
                            .success(function (data) {
                                if (data !== undefined) {
                                    $log.log(data);
                                    angular.forEach(data, function (flat) {
                                        var temp_flat = new Flat();
                                        temp_flat.fromJSON(flat);
                                        flats.push(temp_flat);
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
        $dwelling.getFlatsByComplexNumber(7);

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


        //$dwelling.getFlats(7, 1, 1);

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
    $scope.filters = {
        minFloor: 1,
        maxFloor: 0,
        minRoomsCount: 1,
        maxRoomsCount: 0,
        minArea: 1,
        maxArea: 0,
        minPrice: 0.1,
        maxPrice: 0
    };

    //$log.log(dwellingImg.src);

    $scope.$watch("img.src", function (val) {
       // $log.log("src = ", val);
       // $scope.imgIsLoading = true;
    });

    angular.element(dwellingImg).bind("load", function (event) {
        $log.log("image loaded");
        //$log.log(dwellingImg.src);
    });


    $scope.$watchCollection("dwelling.flats.getAll()", function (value) {
        $log.log("flats = ", value);
        if (value.length > 0) {
            $log.log("start, ", value.length);
            var length = value.length;
            for (var i = 0; i < length; i++) {
                $scope.filters.minFloor = value[i].floor < $scope.filters.minFloor ? value[i].floor : $scope.filters.minFloor;
                $scope.filters.maxFloor = value[i].floor > $scope.filters.maxFloor ? value[i].floor : $scope.filters.maxFloor;
                $scope.filters.minRoomsCount = value[i].roomsCount < $scope.filters.minRoomsCount ? value[i].roomsCount : $scope.filters.minRoomsCount;
                $scope.filters.maxRoomsCount = value[i].roomsCount > $scope.filters.maxRoomsCount ? value[i].roomsCount : $scope.filters.maxRoomsCount;
                $scope.filters.minArea = value[i].area.total < $scope.filters.minArea ? parseInt(value[i].area.total) : $scope.filters.minArea;
                $scope.filters.maxArea = value[i].area.total > $scope.filters.maxArea ? parseInt(value[i].area.total) : $scope.filters.maxArea;
                $scope.filters.minPrice = parseFloat((value[i].price / 1000000).toFixed(1)) < $scope.filters.minPrice ? parseFloat((value[i].price / 1000000).toFixed(1)) : $scope.filters.minPrice;
                $scope.filters.maxPrice = parseFloat((value[i].price / 1000000).toFixed(1)) > $scope.filters.maxPrice ? parseFloat((value[i].price / 1000000).toFixed(1)) : $scope.filters.maxPrice;
            }
            $log.log("min floor = ", $scope.filters.minFloor, ", max floor = ", $scope.filters.maxFloor);
            $log.log("min rooms = ", $scope.filters.minRoomsCount, ", max rooms = ", $scope.filters.maxRoomsCount);
            $log.log("min area = ", $scope.filters.minArea, ", max area = ", $scope.filters.maxArea);
            $log.log("min price = ", $scope.filters.minPrice, ", max price = ", $scope.filters.maxPrice);
        }
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

dwellingModule.filter("rooms", ["$log", function ($log) {
    return function (input, minRooms, maxRooms) {
        if (input.length > 0) {
            var result = [];
            var min = minRooms !== undefined ? minRooms : 0;
            var max = maxRooms !== undefined && maxRooms !== 0 ? maxRooms : 100;
            var length = input.length;
            //$log.log("filtered length = ", length);
            //$log.log("minFloor = ", min);
            //$log.log("maxFloor = ", max);
            for (var i = 0; i < length; i++) {
                if (input[i].roomsCount >= min && input[i].roomsCount <= max) {
                    result.push(input[i]);
                }
            }
            //$log.log("filtered = ", result);
            return result;
        } else
            return input;
    }
}]);

dwellingModule.filter("area", ["$log", function ($log) {
    return function (input, minArea, maxArea) {
        if (input.length > 0) {
            var result = [];
            var min = minArea !== undefined ? minArea : 0;
            var max = maxArea !== undefined && maxArea !== 0 ? maxArea : 100;
            var length = input.length;
            //$log.log("filtered length = ", length);
            //$log.log("minFloor = ", min);
            //$log.log("maxFloor = ", max);
            for (var i = 0; i < length; i++) {
                if (input[i].area.total >= min && input[i].area.total <= max) {
                    result.push(input[i]);
                }
            }
            //$log.log("filtered = ", result);
            return result;
        } else
            return input;
    }
}]);


dwellingModule.directive("slider", ["$log", "$window", function ($log, $window) {
    return {
        restrict: "E",
        scope: {
            manValue: "@",
            maxValue: "@",
            minValueModel: "=",
            maxValueModel: "=",
            step: "@",
            caption: "@"
        },
        template: "<div class='slider-control'>" +
                       "<span class='slider-picker start'>" +
                           "<span class='slider-picker-label'>{{ minValueModel }}</span><span class='slider-picker-pin'></span>" +
                       "</span>" +
                       "<span class='slider-picker end'>" +
                           "<span class='slider-picker-label'>{{ maxValueModel }}</span><span class='slider-picker-pin'></span>" +
                       "</span>" +
                       "<div class='slider-line'>" +
                       "<div class='slider-caption'>{{ caption }}</div>" +
                   "</div>",
        replace: true,
        link: function (scope, element, attrs) {
            var isFloat = function(n){
                return Number(n) === n && n % 1 !== 0;
            };
            var start = {
                element: angular.element(element).children()[0],
                width: angular.element(element).children()[0].clientWidth,
                offsetLeft: 0,
                pageX: 0,
                startPageX: 0,
                pressed: false
            };
            var end = {
                element: angular.element(element).children()[1],
                width: angular.element(element).children()[1].clientWidth,
                offsetLeft: 0,
                pageX: 0,
                pressed: false
            };
            var width = angular.element(element)[0].clientWidth;
            $log.log("width = ", width);
            var step = isFloat(scope.step) ? parseFloat(scope.step) : parseInt(scope.step);
            var steps = [];
            var stepX = 0;

            if (isFloat(Number(scope.step)) === true) {
                for (var i = parseFloat(scope.minValueModel); i <= parseFloat(scope.maxValueModel) / parseFloat(scope.step); i += parseFloat(scope.step)) {
                    var step = {
                        start: stepX,
                        end: (width - end.width - start.width) / (parseFloat(scope.maxValueModel - 1) / parseFloat(scope.step)) + stepX
                    };
                    steps.push(step);
                    stepX = step.end;
                }
            } else {
                for (var i = parseInt(scope.minValueModel); i <= parseInt(scope.maxValueModel); i++) {
                    var step = {
                        start: stepX,
                        end: (width - end.width - start.width) / (parseInt(scope.maxValueModel - 1) / parseFloat(scope.step)) + stepX
                    };
                    steps.push(step);
                    stepX = step.end;
                }
            }


            $log.log("step is float", isFloat(Number(scope.step)));
            $log.log("step count = ", steps.length);
            $log.log("steps = ", steps);

            scope.$watch("minValueModel", function (value) {
                $log.log("minValueModel = ", value);
                scope.minValueModel = value;
            });

            scope.$watch("maxValueModel", function (value) {
                $log.log("maxValueModel = ", value);
                scope.maxValueModel = value;
            });

            angular.element(start.element).bind("mousedown", function (event) {
                $log.log("start pin mousedown");

                $log.log(angular.element(event.target)[0].offsetParent.offsetLeft);
                start.pressed = true;
                start.pageX = event.pageX;
                start.startPageX = event.pageX;
                $log.log("start x = ", start.pageX);
            });

            angular.element(end.element).bind("mousedown", function () {
                $log.log("end pin mousedown");
                end.pressed = true;
                end.pageX = event.pageX;
                end.startPageX = event.pageX;
            });


            angular.element(window).bind("mousemove", function (event) {
                if (start.pressed === true) {
                    start.offsetLeft = angular.element(start.element).prop("offsetLeft");
                    end.offsetLeft = angular.element(end.element).prop("offsetLeft");
                    if ((event.pageX > start.pageX) && start.offsetLeft < (end.offsetLeft - end.width + 1)) {
                        angular.element(start.element).css({
                            "left": start.offsetLeft + (event.pageX - start.pageX) + "px"
                        });
                        start.pageX = event.pageX;
                    }

                    if ((event.pageX < start.pageX) && start.offsetLeft > 0) {
                        angular.element(start.element).css({
                            "left": start.offsetLeft - (start.pageX - event.pageX) + "px"
                        });
                        start.pageX = event.pageX;
                    }

                    var stepsLength = steps.length;
                    for (var i = 0; i < stepsLength; i++) {
                        var step = steps[i];
                        if (start.offsetLeft > step.start && start.offsetLeft < step.end) {
                            $log.log("isFloat = ", isFloat(Number(scope.step)));
                            if (isFloat(Number(scope.step)) === true)
                                scope.minValueModel = parseFloat((parseFloat(i / 10) + 0.1).toFixed(1));
                             else
                                scope.minValueModel = i + 1;
                            scope.$apply();
                        }
                    }
                }

                if (end.pressed === true) {
                    start.offsetLeft = angular.element(start.element).prop("offsetLeft");
                    end.offsetLeft = angular.element(end.element).prop("offsetLeft");

                    if ((event.pageX > end.pageX) && end.offsetLeft < (width - end.width)) {
                        angular.element(end.element).css({
                            "left": end.offsetLeft + (event.pageX - end.pageX) + "px"
                        });
                        end.pageX = event.pageX;
                    }


                    if ((event.pageX < end.pageX) && end.offsetLeft > (start.offsetLeft + start.width)) {
                        angular.element(end.element).css({
                            "left": end.offsetLeft - (end.pageX - event.pageX) + "px"
                        });
                        end.pageX = event.pageX;
                    }


                    var stepsLength = steps.length;
                    for (var i = 0; i < stepsLength; i++) {
                        var step = steps[i];
                        if (end.offsetLeft > step.start && end.offsetLeft < step.end) {
                            $log.log("isFloat = ", isFloat(Number(scope.step)));
                            if (isFloat(Number(scope.step)) === true)
                                scope.maxValueModel = parseFloat((parseFloat(i / 10) - 0.1).toFixed(1));
                            else
                                scope.maxValueModel = i - 1;
                            scope.$apply();
                        }
                    }

                }
            });

            angular.element(start.element).bind("mouseleave", function (event) {
                $log.log("start pin mouse leave");
                //start.pressed = false;
            });

            angular.element($window).bind("mouseup", function (event) {
                start.pressed = false;
                end.pressed = false;
            });


            /*
            angular.element(element).bind("mouseup", function (event) {
                if (start.pressed === true) {
                    $log.log("slider mouseup");
                    start.pressed = false;
                }
            });
            */





            /*
            angular.element(end.element).bind("mouseup", function () {
                $log.log("end pin mouseup");
                end.pressed = false;
            });
            */
        }
    }
}]);