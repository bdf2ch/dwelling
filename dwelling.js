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
    this.flatsCount = 0;
    this.points = [];
    this.markers = {
        getPrimary: function () {
            return primaryMarker;
        },
        setPrimary: function (marker) {
            if (marker !== undefined) {
                primaryMarker = marker;
            }
        },
        getSecondary: function () {
            return secondaryMarker;
        },
        setSecondary: function (marker) {
            if (marker !== undefined) {
                secondaryMarker = marker;
            }
        }
    };

    var normalizedCoordinates = [];
    var selected = false;
    var hovered = false;
    var primaryMarker = undefined;
    var secondaryMarker = undefined;

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

    this.hover = function (flag) {
        if (flag !== undefined && flag.constructor === Boolean) {
            hovered = flag;
        }
    };

    this.isHovered = function () {
        return hovered;
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
    this.queue = undefined;
    this.house = undefined;

    var normalizedCoordinates = [];
    var visible = false;
    var selected = false;
    var displayable = false;

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
        return this;
    };

    this.hide = function () {
        visible = false;
        return this;
    };

    this.select = function (flag) {
        if (flag !== undefined && flag.constructor === Boolean) {
            selected = flag;
        }
    };

    this.isSelected = function () {
        return selected;
    };

    this.isDisplayable = function () {
        return displayable;
    };

    this.display = function (flag) {
        if (flag !== undefined && flag.constructor === Boolean) {
            displayable = flag;
            return this;
        }
    };

    this.setTitle = function (title) {
        if (title !== undefined) {
            this.title = title;
        }
    };

    this.setCaption = function (caption) {
        if (caption !== undefined) {
            this.caption = caption;
        }
    };
};





function House (parameters) {
    this.number = 0;
    this.queueNumber = 0;
    this.background = "";
    this.flatsCount = 0;
    this.points = [];
    this.queue = undefined;
    this.markers = {
        getPrimary: function () {
            return primaryMarker;
        },
        setPrimary: function (marker) {
            if (marker !== undefined) {
                primaryMarker = marker;
            }
        },
        getSecondary: function () {
            return secondaryMarker;
        },
        setSecondary: function (marker) {
            if (marker !== undefined) {
                secondaryMarker = marker;
            }
        }
    };

    var normalizedCoordinates = [];
    var visible = false;
    var selected = false;
    var hovered = false;
    var primaryMarker = undefined;
    var secondaryMarker = undefined;

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

    this.hover = function (flag) {
        if (flag !== undefined && flag.constructor === Boolean) {
            hovered = flag;
        }
    };

    this.isHovered = function () {
        return hovered;
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
            this.houseNumber = parseInt(JSONdata["geo_house"]);
            this.flatNumber = parseInt(JSONdata["geo_flatnum"]);
            this.roomsCount = parseInt(JSONdata["estate_rooms"]);
            this.entrance = parseInt(JSONdata["geo_house_entrance"]);
            this.floor = parseInt(JSONdata["estate_floor"]);
            this.area.total = parseFloat(parseFloat(JSONdata["estate_area"]).toFixed(2));
            this.area.living = JSONdata["estate_area_living"];
            this.area.kitchen = JSONdata["estate_area_kitchen"];
            this.area.loggia = JSONdata["estate_area_loggia"];
            this.price = parseFloat(parseFloat(JSONdata["estate_price"]).toFixed(1));
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
                                    //$log.log(data);
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

        var queue_1 = $dwelling.queues.add({
            number: 1,
            background: "img/queue_1.jpg",
            points: [
                [22.6, 62.5], [34.2, 79.8], [52.8, 60],
                [44.7, 48.4], [44.6, 43], [42.4, 40.8],
                [37.4, 47.1]
            ]
        });

        var queue_1_primary_marker = $dwelling.markers.add({
            id: "queue_1",
            point: [34, 55],
            class: "queue",
            caption: "1",
            title: "очередь",
            queueNumber: 1,
            queue: queue_1
        }).display(true).show();


        var queue_1_secondary_marker = $dwelling.markers.add({
            id: "queue_1_flats",
            point: [38, 54.5],
            class: "flats",
            caption: "28",
            title: "квартир",
            queueNumber: 1,
            queue: queue_1
        }).display(true);

        queue_1.markers.setPrimary(queue_1_primary_marker);
        queue_1.markers.setSecondary(queue_1_secondary_marker);

        var queue_1_house_1 = $dwelling.houses.add({
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

        var queue_1_house_1_primary_marker = $dwelling.markers.add({
            id: "house_1",
            point: [65, 24.5],
            class: "queue",
            caption: 1,
            title: "дом",
            queueNumber: 1,
            houseNumber: 1,
            queue: queue_1,
            house: queue_1_house_1
        });


        var queue_1_house_1_secondary_marker = $dwelling.markers.add({
            id: "house_1_flats",
            point: [69, 24],
            class: "flats",
            caption: 25,
            title: "квартир",
            queueNumber: 1,
            houseNumber: 1,
            queue: queue_1,
            house: queue_1_house_1
        }).hide();

        queue_1_house_1.markers.setPrimary(queue_1_house_1_primary_marker);
        queue_1_house_1.markers.setSecondary(queue_1_house_1_secondary_marker);


        var queue_1_house_2 = $dwelling.houses.add({
            number: 2,
            background: "img/house.jpg",
            queueNumber: 1,
            points: [
                [46.3, 15.4], [42.6, 17.6], [42.6, 19],
                [42.8, 19.2], [42.4, 42.4], [46.8, 44.2],
                [46.7, 48.1], [47.6, 48.3], [47.8, 40],
                [47.4, 39.6], [52.4, 35.7], [52.9, 35.7],
                [54.2, 35.4], [54.6, 19.2], [55, 18.8],
                [55, 18], [52.5, 17.3], [52.6, 16],
                [50, 15.3], [50, 16.2]
            ]
        });

        var queue_1_house_2_primary_marker = $dwelling.markers.add({
            id: "house_2",
            point: [46, 19],
            class: "queue",
            caption: 2,
            title: "дом",
            queueNumber: 1,
            houseNumber: 2,
            queue: queue_1,
            house: queue_1_house_2
        });

        var queue_1_house_2_secondary_marker = $dwelling.markers.add({
            id: "house_2_flats",
            point: [50, 18.3],
            class: "flats",
            caption: 25,
            title: "квартир",
            queueNumber: 1,
            houseNumber: 2,
            queue: queue_1,
            house: queue_1_house_2
        }).hide();

        queue_1_house_2.markers.setPrimary(queue_1_house_2_primary_marker);
        queue_1_house_2.markers.setSecondary(queue_1_house_2_secondary_marker);

        var queue_1_house_3 = $dwelling.houses.add({
            number: 3,
            background: "img/house.jpg",
            queueNumber: 1,
            points: [
                [47.3, 39.3], [47.4, 40.8], [47.7, 40.9],
                [47.3, 60.1], [53.3, 62.5], [56.9, 59.3],
                [57.5, 59.8], [58.8, 58.5], [58.8, 57.9],
                [59.4, 58], [59.9, 57.3], [59.9, 57.4],
                [60.9, 57.8], [62.1, 56.7], [61.6, 56.2],
                [61.6, 55.8], [62, 55.9], [64.3, 53.2],
                [65, 34.7], [65.3, 34.4], [65.3, 33.6],
                [60.5, 31.7], [60.1, 32.1], [59.1, 31.6],
                [54.1, 35.3], [53.6, 35], [52.8, 35.7],
                [47.3, 39.3]
            ]
        });

        var queue_1_house_3_primary_marker = $dwelling.markers.add({
            id: "house_3",
            point: [55.5, 43.6],
            class: "queue",
            caption: 3,
            title: "дом",
            queueNumber: 1,
            houseNumber: 3,
            queue: queue_1,
            house: queue_1_house_3
        });

        var queue_1_house_3_secondary_marker = $dwelling.markers.add({
            id: "house_3_flats",
            point: [59.5, 42.6],
            class: "flats",
            caption: 25,
            title: "квартир",
            queueNumber: 1,
            houseNumber: 3,
            queue: queue_1,
            house: queue_1_house_3
        }).hide();

        queue_1_house_3.markers.setPrimary(queue_1_house_3_primary_marker);
        queue_1_house_3.markers.setSecondary(queue_1_house_3_secondary_marker);

        var queue_2 = $dwelling.queues.add({
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

        var queue_2_primary_marker = $dwelling.markers.add({
            id: "queue_2",
            point: [55, 30],
            class: "queue",
            caption: "2",
            title: "очередь",
            queueNumber: 2,
            queue: queue_2
        }).display(true).show();

        var queue_2_secondary_marker = $dwelling.markers.add({
            id: "queue_2_flats",
            point: [59, 29.5],
            class: "flats",
            caption: "54",
            title: "квартиры",
            queueNumber: 2,
            queue: queue_2
        }).display(true);

        queue_2.markers.setPrimary(queue_2_primary_marker);
        queue_2.markers.setSecondary(queue_2_secondary_marker);


        /*
        $dwelling.houses.add({
            number: 1,
            background: "img/house.jpg",
            queueNumber: 2,
            points: [
                [75.9, 3.4], [75.9, 4.5], [76.1, 4.8],
                [76.1, 33], [77.9, 34.3], [77.8, 35.1],
                [79, 35.4], [79.3, 35.4], [79.3, 32.4],
                [79.1, 32.2], [79.1, 32.1], [79.3, 31.7],
                [79.4, 30.4], [79.2, 30.3], [79.2, 29.2],
                [79, 29.1], [79, 28.8], [85.3, 24],
                [85.8, 24.3], [86.7, 23.6], [87.5, 23.9],
                [87.6, 23.6], [87.5, 23.5], [88.6, 22.5],
                [88.8, 5.2], [89, 5], [88.9, 4.2],
                [89.2, 4.1], [89.2, 3.7], [86.6, 2.4],
                [86.6, 1.8], [86.8, 1.5], [84.2, 0.4],
                [83.9, 0.7], [84, 1.2], [83.4, 1.6],
                [81.4, 0.8], [81.1, 0.9], [80.2, 0.5],
                [79.6, 0.8], [79.4, 0.7], [78.6, 1.2],
                [76.5, 2.1], [76.7, 2.2], [76, 2.8], [76.2, 3]
            ]
        });

        $dwelling.houses.add({
            number: 2,
            background: "img/house.jpg",
            queueNumber: 2,
            points: [
                [79, 28.8], [79.3, 29.2], [79.2, 30.1],
                [79.4, 30.3], [79.4, 31.8], [79.1, 31.8],
                [79.3, 32.4], [79.4, 51.4], [81.2, 52.3],
                [81.2, 52.6], [83.6, 53.6], [84.1, 53.5],
                [85.6, 54.2], [88.1, 52], [88.3, 52.3],
                [89.4, 51.3], [89.4, 50.9], [90.1, 50.2],
                [90.6, 50.9], [92.4, 49.3], [92.3, 48.5],
                [92.9, 48.7], [93.7, 48.1], [94.7, 48.5],
                [96.2, 47.2], [95.6, 46.6], [95.6, 46.1],
                [95.9, 46.1], [96.4, 46.2], [97.3, 45.3],
                [97.3, 44.9], [99.2, 43.1], [99.6, 25.2],
                [99.9, 25], [99.9, 24.6], [99.8, 24.3],
                [99.7, 23.2], [99.8, 23], [99.9, 21.5],
                [95.4, 19.6], [94.9, 19.7], [93.6, 19.2],
                [87.5, 23.2], [87.8, 23.6], [87.6, 23.8],
                [86.7, 23.4], [85.8, 24.2], [85.3, 23.9]
            ]
        });

        $dwelling.houses.add({
            number: 3,
            background: "img/house.jpg",
            queueNumber: 2,
            points: [
                [52.5, 13.3], [52.8, 13.6], [52.8, 14.5],
                [53, 14.7], [53, 18.4], [52.7, 18.8],
                [52.8, 19], [53, 19.3], [53.5, 42.7],
                [60.8, 37.4], [61.3, 37.8], [62.4, 37],
                [63.2, 37.4], [63.7, 36.9], [63.4, 36.7],
                [67, 34.3], [66.9, 19.7], [67.1, 19.2],
                [66.9, 19.2], [66.9, 15.5], [67.1, 15.2],
                [67.1, 14.1], [67.3, 13.9], [67.2, 13.5],
                [66.3, 13.2], [66.5, 12.9], [64.6, 12],
                [64.6, 11.6], [64.8, 11], [62, 9.9],
                [61.8, 10], [62, 11], [61.2, 11.1],
                [59.4, 10.2], [59, 10.7], [57.9, 10.2],
                [57.4, 10.3], [57.1, 10.2], [56.2, 10.7],
                [56, 10.7], [53.6, 11.8], [53.8, 12.2],
                [53, 12.7], [53.1, 12.8]
            ]
        });

        $dwelling.houses.add({
            number: 4,
            background: "img/house.jpg",
            queueNumber: 2,
            points: [
                [52.8, 43.5], [53.1, 43.7], [53.1, 44.8],
                [53.3, 45.2], [53.3, 46.5], [53, 46.8],
                [53, 47.2], [53.3, 47.4], [53.8, 68.3],
                [58, 71.2], [58.2, 70.9], [60.1, 71.9],
                [63.3, 69.1], [63.7, 69.2], [65, 68.2],
                [65, 67.6], [66, 66.8], [66.6, 67.5],
                [68.6, 65.8], [68.7, 64.6], [68.9, 64.5],
                [69.5, 64.9], [70.5, 64.2], [71.6, 64.6],
                [73.6, 62.9], [72.8, 62.1], [73.4, 61.6],
                [73.8, 61.8], [75, 60.9], [75, 60.4],
                [77.4, 58], [77.4, 38.3], [77.7, 38],
                [77.4, 37.6], [77.4, 36.2], [77.7, 35.8],
                [77.7, 35], [78, 34.6], [78, 34.5],
                [72.8, 31.7], [72.4, 32], [71.3, 31.7],
                [69.2, 33], [69, 32.6], [67.6, 33.8],
                [67.7, 34.1], [63.5, 36.6], [63.9, 37],
                [63.5, 37.4], [62.5, 37], [61.4, 37.5],
                [60.9, 37.1]
            ]
        });

        $dwelling.houses.add({
            number: 4,
            background: "img/house.jpg",
            queueNumber: 2,
            points: [
                [4, 48.1], [4.4, 48.5], [4.8, 51.5],
                [4.4, 51.6], [4.8, 52.2], [6.3, 72.9],
                [11.8, 77.1], [16, 74.5], [16.2, 74.6],
                [19.1, 72.4], [19.7, 73.3], [22.4, 71.1],
                [22.4, 70.1], [22.8, 69.8], [23.7, 70.2],
                [24.9, 69.3], [25.9, 69.9], [27.9, 68.4],
                [27.5, 67.4], [28.6, 66.5], [28.9, 66.8],
                [30.5, 65.6], [30.5, 65.3], [31.6, 64.5],
                [30.9, 44.1], [30.6, 43.8], [30.6, 43.5],
                [30.8, 43.5], [30.6, 38.8], [30.5, 38.8],
                [30.4, 36.7], [28.9, 35.7], [28.3, 36.1],
                [27.3, 35.4], [17.5, 40.6], [17.7, 41.2],
                [17.4, 41.4], [16.6, 41], [15, 41.9],
                [14.5, 41.6]
            ]
        });

        $dwelling.houses.add({
            number: 4,
            background: "img/house.jpg",
            queueNumber: 2,
            points: [
                [30, 36.9], [30.4, 37.5], [30.5, 38.6],
                [30.6, 38.8], [30.8, 43.4], [30.6, 43.4],
                [30.8, 44.1], [32.3, 76.8], [33, 77.3],
                [33.1, 77.9], [34, 78.6], [34.1, 78.9],
                [35.4, 79.6], [35.8, 79.6], [36.1, 79.8],
                [36.2, 80.4], [35.9, 80.7], [37.1, 81.7],
                [37.9, 81.1], [40.5, 83], [41.1, 82.4],
                [42.3, 83.3], [44.3, 81.4], [44.9, 81.9],
                [47.4, 79.9], [47.4, 79.1], [48.6, 77.7],
                [47.7, 45], [48, 44.5], [47.8, 44.2],
                [47.7, 39.7], [47.9, 39.5], [47.8, 38.3],
                [48.1, 37.9], [48, 37.6], [47.2, 37.2],
                [47.4, 36.9], [44.8, 35.4], [45.1, 34.4],
                [42.1, 32.7], [41.7, 33.2], [41.8, 33.9],
                [39.1, 32.6], [38.7, 33.2], [37.4, 32.4],
                [36.7, 32.9], [36.3, 32.4], [35.2, 33.3],
                [35, 33], [31.9, 35], [32.2, 35.5],
                [30.9, 36.1], [31.1, 36.4]
            ]
        });
        */

        $dwelling.markers.add({
            id: "filter",
            point: [],
            class: "filter",
            caption: " ",
            title: "",
            queueNumber: 0
        }).display(true).show();


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
        minFloorDefault: 1,
        maxFloor: 0,
        maxFloorDefault: 0,
        minRoomsCount: 1,
        minRoomsCountDefault: 2,
        maxRoomsCount: 0,
        maxRoomsCountDefault: 0,
        minArea: 1,
        minAreaDefault: 1,
        maxArea: 0,
        maxAreaDefault: 0,
        minPrice: 0.1,
        minPriceDefault: 0.1,
        maxPrice: 0,
        maxPriceDefault: 0,

        reset: function () {
            this.minFloor = this.minFloorDefault;
            this.maxFloor = this.maxFloorDefault;
            this.minRoomsCount = this.minRoomsCountDefault;
            this.maxRoomsCount = this.maxRoomsCountDefault;
            this.minArea = this.minAreaDefault;
            this.maxArea = this.maxAreaDefault;
            this.minPrice = this.minPriceDefault;
            this.maxPrice = this.maxPriceDefault;
        }
    };

    $scope.order = {
        house: true,
        entrance: false,
        floor: false,
        flatNumber: false,
        roomsCount: false,
        area: false,
        price: false,
        current: "price",
        descending: false,

        setOrder: function (field, desc) {
            if (field !== undefined) {
            //    if (this.hasOwnProperty(field))
                    this.current = field;
            }
            if (desc !== undefined && desc.constructor === Boolean)
                this.descending = desc;
        }
    };
    $scope.orderDesc = true;

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
        //$log.log("flats = ", value);
        if (value.length > 0) {
           // $log.log("start, ", value.length);
            var length = value.length;
            for (var i = 0; i < length; i++) {
                $scope.filters.minFloor = value[i].floor < $scope.filters.minFloor ? value[i].floor : $scope.filters.minFloor;
                $scope.filters.minFloorDefault = $scope.filters.minFloor;
                $scope.filters.maxFloor = value[i].floor > $scope.filters.maxFloor ? value[i].floor : $scope.filters.maxFloor;
                $scope.filters.maxFloorDefault = $scope.filters.maxFloor;
                $scope.filters.minRoomsCount = value[i].roomsCount < $scope.filters.minRoomsCount ? value[i].roomsCount : $scope.filters.minRoomsCount;
                $scope.filters.minRoomsCountDefault = $scope.filters.minRoomsCount;
                $scope.filters.maxRoomsCount = value[i].roomsCount > $scope.filters.maxRoomsCount ? value[i].roomsCount : $scope.filters.maxRoomsCount;
                $scope.filters.maxRoomsCountDefault = $scope.filters.maxRoomsCount;
                $scope.filters.minArea = value[i].area.total < $scope.filters.minArea ? parseInt(value[i].area.total) : $scope.filters.minArea;
                $scope.filters.minAreaDefault = $scope.filters.minArea;
                $scope.filters.maxArea = value[i].area.total > $scope.filters.maxArea ? parseInt(value[i].area.total) : $scope.filters.maxArea;
                $scope.filters.maxAreaDefault = $scope.filters.maxArea;
                $scope.filters.minPrice = parseFloat((value[i].price / 1000000).toFixed(1)) < $scope.filters.minPrice ? parseFloat((value[i].price / 1000000).toFixed(1)) : $scope.filters.minPrice;
                $scope.filters.minPriceDefault = $scope.filters.minPrice;
                $scope.filters.maxPrice = parseFloat((value[i].price / 1000000).toFixed(1)) > $scope.filters.maxPrice ? parseFloat((value[i].price / 1000000).toFixed(1)) : $scope.filters.maxPrice;
                $scope.filters.maxPriceDefault = $scope.filters.maxPrice;

                var houses_length = $dwelling.houses.getAll().length;
                for (var l = 0; l < houses_length; l++) {
                    var house = $dwelling.houses.getAll()[l];
                    if (value[i].houseNumber === house.number) {
                        house.flatsCount++;
                    }

                    var markersLength = $dwelling.markers.getAll().length;
                    for (var m = 0; m < markersLength; m++) {
                        var marker = $dwelling.markers.getAll()[m];
                        if (marker.class === "flats" && marker.houseNumber === house.number) {
                            marker.setCaption(house.flatsCount);
                        }
                    }
                }
            }
            //$log.log("min floor = ", $scope.filters.minFloor, ", max floor = ", $scope.filters.maxFloor);
            //$log.log("min rooms = ", $scope.filters.minRoomsCount, ", max rooms = ", $scope.filters.maxRoomsCount);
            //$log.log("min area = ", $scope.filters.minArea, ", max area = ", $scope.filters.maxArea);
            $log.log("min price = ", $scope.filters.minPrice, ", max price = ", $scope.filters.maxPrice);


        }
    });


    $scope.queueMouseEnter = function (queue) {
        $log.log("queue mouse enter");
        if (queue !== undefined) {
            var secondary = queue.markers.getSecondary();
            if (secondary !== undefined && secondary.isVisible() === false) {
                $log.log("show secondary");
                secondary.show();
            }
            queue.hover(true);
        }
    };


    $scope.queueMouseLeave = function (queue) {
        $log.log("queue mouse leave");
        if (queue !== undefined) {
            var secondary = queue.markers.getSecondary();
            if (secondary !== undefined)
                secondary.hide();
            queue.hover(false);
        }
    };


    $scope.houseMouseEnter = function (house) {
        if (house !== undefined) {
            $log.log("house = ", house.markers.getSecondary());
            var secondary = house.markers.getSecondary();
            $log.log("sec = ", secondary);
            if (secondary !== undefined && secondary.isVisible() === false) {
                secondary.show();
                $log.log("secondary = ", secondary);
            }
            house.hover(true);
        }
    };


    $scope.houseMouseLeave = function (house) {
        if (house !== undefined) {
            var secondary = house.markers.getSecondary();
            if (secondary !== undefined)
                secondary.hide();
            house.hover(false);
        }
    };


    $scope.markerMouseEnter = function (marker) {
        if (marker !== undefined) {
            if (marker.class === "queue") {
                if ($scope.currentQueue !== undefined) {
                    if (marker.queue !== undefined && marker.house !== undefined) {
                        var secondary = marker.house.markers.getSecondary();
                        marker.house.hover(true);
                        if (secondary !== undefined) {
                            secondary.show();
                        }
                    }
                } else {
                    if (marker.queue !== undefined && marker.house === undefined) {
                        var secondary = marker.queue.markers.getSecondary();
                        marker.queue.hover(true);
                        if (secondary !== undefined) {
                            secondary.show();
                        }
                    }
                    if (marker.queue !== undefined && marker.house !== undefined) {
                        var secondary = marker.queue.markers.getSecondary();
                        marker.house.hover(true);
                        if (secondary !== undefined) {
                            secondary.show();
                        }
                    }
                }
            }
            if (marker.class === "flats") {
                if ($scope.currentQueue !== undefined) {
                    if (marker.queue !== undefined && marker.house !== undefined) {
                        $log.log("flats");
                        marker.house.hover(true);
                        marker.show();
                    }
                } else {
                    if (marker.queue !== undefined && marker.house === undefined) {
                        $log.log("flats");
                        marker.queue.hover(true);
                        marker.show();
                    }
                }
            }
        }
    };


    $scope.markerMouseLeave = function (marker) {
        $log.log("marker mouse out");
        if (marker !== undefined) {
            if (marker.class === "flats") {
                if ($scope.currentQueue !== undefined) {
                    if (marker.queue !== undefined && marker.house !== undefined) {

                    }
                } else {
                    if (marker.queue !== undefined && marker.house === undefined) {
                        if (marker.queue.isHovered() === false) {
                            marker.hide();
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
            $scope.filterPopup = false;
            var length = $dwelling.markers.getAll().length;
            for (var i = 0; i < length; i++) {
                var marker = $dwelling.markers.getAll()[i];
                if (marker.class === "queue") {
                    if (marker.queue !== undefined && marker.house !== undefined) {
                        marker.display(true);
                    }
                    if (marker.queue !== undefined && marker.house === undefined) {
                        marker.display(false);
                    }
                }
                if (marker.class === "filter")
                    marker.show();
            }
        } else {
            if ($scope.currentQueue !== undefined) {
                $dwelling.get().setBackground($dwelling.get().background);
                var length = $dwelling.markers.getAll().length;
                for (var i = 0; i < length; i++) {
                    var marker = $dwelling.markers.getAll()[i];
                    if (marker.class === "queue") {
                        if (marker.queue !== undefined && marker.house === undefined) {
                            marker.display(true);
                        }
                        if (marker.queue !== undefined && marker.house !== undefined) {
                            marker.display(false);
                        }
                    }
                    if (marker.class === "flats") {
                        if (marker.queue !== undefined && marker.house === undefined) {
                            marker.display(true);
                        }
                        if (marker.queue !== undefined && marker.house !== undefined) {
                            marker.display(false);
                        }
                    }
                    if (marker.class === "filter")
                        marker.show();
                }
                $scope.currentQueue = undefined;
            }
        }
        $scope.filters.reset();
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
                if (marker.class === "queue") {
                    if (marker.queue !== undefined && marker.house === undefined) {
                        marker.display(false);
                    }
                    if (marker.queue !== undefined && marker.house !== undefined) {
                        if (marker.queueNumber === queueNumber) {
                            marker.display(true).show();
                        }
                    }
                }
                if (marker.class === "flats") {
                    if (marker.queue !== undefined && marker.house === undefined) {
                        marker.display(false);
                    }
                    if (marker.queue !== undefined && marker.house !== undefined) {
                        if (marker.queueNumber === queueNumber) {
                            marker.display(true);
                        }
                    }
                }
            }
            $log.log("current queue = ", $scope.currentQueue);
        }
    };

    $scope.selectHouse = function (queueNumber, houseNumber) {
        if (queueNumber !== undefined && houseNumber !== undefined) {
            var length = $dwelling.houses.getAll().length;
            for (var i = 0; i < length; i++) {
                var tempHouse = $dwelling.houses.getAll()[i];
                if (tempHouse.number === houseNumber && tempHouse.queueNumber === queueNumber) {
                    tempHouse.select(true);
                    $scope.currentHouse = tempHouse;
                    $dwelling.get().setBackground(tempHouse.background);
                } else
                    tempHouse.select(false);
            }

            var length = $dwelling.markers.getAll().length;
            for (var i = 0; i < length; i++) {
                var marker = $dwelling.markers.getAll()[i];
                if (marker.class === "queue" && marker.houseNumber === houseNumber) {
                    marker.show();
                }
                if (marker.class === "filter")
                    marker.hide();
            }
            $scope.filterPopup = true;
        }
    };


    $scope.onClickMarker = function (marker) {
        if (marker !== undefined) {
            switch (marker.class) {
                case "queue":
                    if (marker.houseNumber !== "")
                        $scope.selectHouse(marker.queueNumber, marker.houseNumber);
                    else
                        $scope.selectQueue(marker.queueNumber);
                    break;
                case "flats":
                    if (marker.queue !== undefined && marker.house === undefined) {
                        $scope.selectQueue(marker.queue.number);
                    }
                    if (marker.queue !== undefined && marker.house !== undefined) {
                        $scope.selectHouse(marker.queue.number, marker.house.number);
                    }
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





    $scope.showFilter = function () {
        $log.log("popup");
        $scope.filterPopup = true;
        var length = $dwelling.markers.getAll().length;
        for (var i = 0; i < length; i++) {
            var marker = $dwelling.markers.getAll()[i];
            if (marker.class === "filter")
                marker.hide();
        }
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

        $scope.filters.reset();
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

    //$scope.selectQueue(2);
    var points = [];
    angular.element($window).bind("mousedown", function (event) {
        var width = angular.element(dwellingImg)[0].clientWidth;
        var height = angular.element(dwellingImg)[0].clientHeight;
        //$log.log(parseFloat(((event.pageX / width) * 100).toFixed(1))+ ", " + parseFloat(((event.pageY / height) * 100).toFixed(1)));
        var point = [];
        point.push(parseFloat(((event.pageX / width) * 100).toFixed(1)));
        point.push(parseFloat(((event.pageY / height) * 100).toFixed(1)));
        points.push(point);
        var final = "";
        for (var i = 0; i < points.length; i++) {
            final = final +  "[" + points[i][0].toString() + ", " + points[i][1].toString() + "]";
            final = i !== points.length - 1 ? final + ", " : final;
        }
        $log.log(final);
        $log.log(points);
    });
}]);



dwellingModule.filter("floor", ["$log", function ($log) {
    return function (input, minFloor, maxFloor) {
        if (input.length > 0) {
            var result = [];
            var min = minFloor !== undefined ? minFloor : 0;
            var max = maxFloor !== undefined && maxFloor !== 0 ? maxFloor : 100;
            var length = input.length;
            for (var i = 0; i < length; i++) {
                if (input[i].floor >= min && input[i].floor <= max) {
                    result.push(input[i]);
                }
            }
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
            for (var i = 0; i < length; i++) {
                if (input[i].roomsCount >= min && input[i].roomsCount <= max) {
                    result.push(input[i]);
                }
            }
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
            for (var i = 0; i < length; i++) {
                if (input[i].area.total >= min && input[i].area.total <= max) {
                    result.push(input[i]);
                }
            }
            return result;
        } else
            return input;
    }
}]);

dwellingModule.filter("price", ["$log", function ($log) {
    return function (input, minPrice, maxPrice) {
        if (input.length > 0) {
            var result = [];
            var min = minPrice !== undefined ? minPrice : 0.1;
            var max = maxPrice !== undefined && maxPrice !== 0 ? maxPrice : 100.000;
            var length = input.length;
            for (var i = 0; i < length; i++) {
                //$log.log("price = ", parseFloat((input[i].price / 1000000).toFixed(1)));
                if (parseFloat((input[i].price / 1000000).toFixed(1)) >= min && parseFloat((input[i].price / 1000000).toFixed(1)) <= max) {
                    result.push(input[i]);
                }
            }
            return result;
        } else
            return input;
    }
}]);

dwellingModule.filter("house", ["$log", function ($log) {
    return function (input, houseNumber) {
        if (input.length > 0) {
            var result = [];
            var number = houseNumber !== undefined ? houseNumber : 0;
            //$log.log("houseNumber = ", number);
            if (number !== 0) {
                var length = input.length;
                for (var i = 0; i < length; i++) {
                    if (input[i].houseNumber === houseNumber) {
                        result.push(input[i]);
                    }
                }
                return result;
            } else
                return input;
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
            //$log.log("width = ", width);
            //var step = isFloat(scope.step) ? parseFloat(scope.step) : parseInt(scope.step);
            var steps = [];
            var stepX = 0;

            if (isFloat(Number(scope.step)) === true) {
                for (var i = parseFloat(scope.minValueModel); i <= parseFloat(scope.maxValueModel) / parseFloat(scope.step); i += parseFloat(scope.step)) {
                    var step = {
                        start: stepX,
                        end: (width - end.width - start.width) / (parseFloat(scope.maxValueModel) / parseFloat(scope.step)) + stepX
                    };
                    steps.push(step);
                    stepX = step.end;
                }
            } else {
                for (var i = parseInt(scope.minValueModel); i <= parseInt(scope.maxValueModel); i += parseInt(scope.step)) {
                    var temp_val = 0;
                    if (i === parseInt(scope.minValueModel))
                        temp_val = parseInt(scope.minValueModel);
                    if (i === parseInt(scope.maxValueModel))
                        temp_val = parseInt(scope.maxValueModel);
                    if (i >= parseInt(scope.minValueModel) && i <= parseInt(scope.maxValueModel))
                        temp_val = i;
                    var step = {
                        start: stepX,
                        end: (width - start.width - end.width) / (parseInt(scope.maxValueModel) / parseInt(scope.step)) + stepX,
                        value: temp_val
                    };
                    steps.push(step);
                    stepX = step.end;
                }
            }


            //$log.log("step is float", isFloat(Number(scope.step)));
            $log.log("step count = ", steps.length);
            $log.log("steps = ", steps);

            scope.$watch("minValueModel", function (value) {
                //$log.log("minValueModel = ", value);
                scope.minValueModel = value;
            });

            scope.$watch("maxValueModel", function (value) {
                //$log.log("maxValueModel = ", value);
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

                    if ((event.pageX > start.pageX) && start.offsetLeft < (end.offsetLeft - end.width)) {
                        angular.element(start.element).css({
                            "left": start.offsetLeft + (event.pageX - start.pageX) + "px"
                        });
                        start.pageX = event.pageX;
                        //$log.log("start.offsetleft - (end.offsetLeft - width) = ", start.offsetLeft - (end.offsetLeft - end.width));

                        /*
                        if (start.offsetLeft - (end.offsetLeft - end.width) === -1) {
                            $log.log("bingo");
                            if (isFloat(Number(scope.step)) === true)
                                scope.minValueModel = parseFloat((parseFloat(i / 10) + 0.1).toFixed(1));
                            else
                                scope.minValueModel = parseInt(scope.maxValueModel);
                        }
                        */
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
                                //scope.minValueModel = i;
                                scope.minValueModel = step.value;
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
                    for (var i = 1; i < stepsLength; i++) {
                        var step = steps[i];
                        if (end.offsetLeft > step.start && end.offsetLeft < step.end) {
                            $log.log("i = ", i);
                            //$log.log("isFloat = ", isFloat(Number(scope.step)));
                            if (isFloat(Number(scope.step)) === true)
                                scope.maxValueModel = parseFloat((parseFloat(i / 10) - parseFloat(scope.step)).toFixed(1));
                            else
                                //scope.maxValueModel = step.value;
                                scope.maxValueModel = step.value;
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