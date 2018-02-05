webpackJsonp([1,4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BindingDataComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BindingDataComponent = (function () {
    function BindingDataComponent() {
        this.dataSet = [10, 20, 30, 25, 15];
    }
    BindingDataComponent.prototype.ngOnInit = function () {
    };
    BindingDataComponent.prototype.addData = function () {
        d3.select("#list").selectAll("li").data([10, 20, 30, 25, 15]);
    };
    BindingDataComponent.prototype.updateData = function () {
        d3.select("#list").selectAll("li")
            .data(this.dataSet)
            .text(function (d) { return d; });
    };
    BindingDataComponent.prototype.createNew = function () {
        d3.select("#list").selectAll("li")
            .data([10, 20, 30, 25, 15])
            .text(function (d) { return "This is pre-existing element and the value is " + d; })
            .enter()
            .append("li")
            .text(function (d) { return "This is dynamically created element and the value is " + d; });
    };
    BindingDataComponent.prototype.exit = function () {
        d3.selectAll("li")
            .data([10, 20, 30, 15])
            .exit()
            .remove();
    };
    BindingDataComponent.prototype.datum = function () {
        d3.select("p")
            .datum(50)
            .text(function (d) {
            return "Used existing paragraph element and the data " + d + " is assigned.";
        });
        d3.select("div#fromDatum")
            .datum(100)
            .append("p")
            .text(function (d) {
            return "Created new paragraph element and the data " + d + " is assigned.";
        });
    };
    BindingDataComponent.prototype.dataFnUsage = function () {
        var self = this;
        self.tempD = "";
        self.tempI = "";
        self.tempThis = "";
        var data = [1, 2, 3];
        var paragraph = d3.select("body")
            .selectAll("#dumData li")
            .data(data)
            .text(function (d, i) {
            console.log(d); // the data element
            console.log(i); // the index element
            console.log(this); // the current DOM object
            self.tempD += d; // the data element
            self.tempI += i; // the index element
            self.tempThis += this; // the current DOM object
            return "The index is " + i + " and the data is " + d;
        });
    };
    BindingDataComponent.prototype.dataStructure = function () {
        var x = [1, 2, 3]; // x coordinates
        var y = [1, 3, 2]; // y coordinates
        var r = [5, 5, 5]; // radius
        var c = ['red', 'green', 'blue']; // colors
        this.circlesData = [{
                x: '25%',
                y: '25%',
                r: 15,
                c: 'red'
            }, {
                x: '50%',
                y: '50%',
                r: 15,
                c: 'green'
            }, {
                x: '75%',
                y: '75%',
                r: 15,
                c: 'blue'
            }];
        var mySvg = d3.select('#my-svg');
        this.circles = mySvg
            .selectAll('circle')
            .data(this.circlesData);
        console.log(this.circles);
    };
    BindingDataComponent.prototype.createCircles = function () {
        this.circles
            .enter()
            .append('circle')
            .attr('cx', function (d) {
            return d.x;
        })
            .attr('cy', function (d) {
            return d.y;
        })
            .attr('fill', function (d) {
            return d.c;
        })
            .attr('r', function (d) {
            return d.r;
        });
    };
    BindingDataComponent.prototype.dataChanges = function () {
        // change coordinates of the first circle:
        this.circlesData[0].x = "10%";
        this.circlesData[0].y = "10%";
        // add a new circle:
        this.circlesData.push({
            x: "85%",
            y: "85%",
            r: 15,
            c: 'yellow'
        });
        var mySvg = d3.select('#my-svg');
        this.circles = mySvg
            .selectAll('circle')
            .data(this.circlesData);
    };
    BindingDataComponent.prototype.createNewCircle = function () {
        // change coordinates of the first circle:
        this.circlesData[0].x = "10%";
        this.circlesData[0].y = "10%";
        // add a new circle:
        this.circlesData.push({
            x: "80%",
            y: "80%",
            r: 15,
            c: 'yellow'
        });
        this.createCircles();
    };
    BindingDataComponent.prototype.updateExisting = function () {
        // update (x,y) coordinates:
        this.circles
            .attr('cx', function (d) {
            return d.x;
        })
            .attr('cy', function (d) {
            return d.y;
        });
    };
    BindingDataComponent.prototype.removeCircles = function () {
        var mySvg = d3.select('#my-svg');
        mySvg
            .selectAll('circle')
            .data([])
            .exit()
            .remove();
    };
    return BindingDataComponent;
}());
BindingDataComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-binding-data',
        template: __webpack_require__(173),
        styles: [__webpack_require__(164)]
    }),
    __metadata("design:paramtypes", [])
], BindingDataComponent);

//# sourceMappingURL=binding-data.component.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExamplesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ExamplesComponent = (function () {
    function ExamplesComponent() {
    }
    ExamplesComponent.prototype.ngOnInit = function () {
    };
    return ExamplesComponent;
}());
ExamplesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-examples',
        template: __webpack_require__(174),
        styles: [__webpack_require__(165)]
    }),
    __metadata("design:paramtypes", [])
], ExamplesComponent);

//# sourceMappingURL=examples.component.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__(175),
        styles: [__webpack_require__(166)]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IntroComponent = (function () {
    function IntroComponent() {
    }
    IntroComponent.prototype.ngOnInit = function () {
    };
    return IntroComponent;
}());
IntroComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-intro',
        template: __webpack_require__(176),
        styles: [__webpack_require__(167)]
    }),
    __metadata("design:paramtypes", [])
], IntroComponent);

//# sourceMappingURL=intro.component.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrinciplesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PrinciplesComponent = (function () {
    function PrinciplesComponent() {
    }
    PrinciplesComponent.prototype.ngOnInit = function () {
    };
    return PrinciplesComponent;
}());
PrinciplesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-principles',
        template: __webpack_require__(177),
        styles: [__webpack_require__(168)]
    }),
    __metadata("design:paramtypes", [])
], PrinciplesComponent);

//# sourceMappingURL=principles.component.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SelectionsComponent = (function () {
    function SelectionsComponent() {
    }
    SelectionsComponent.prototype.ngOnInit = function () {
    };
    SelectionsComponent.prototype.showResults = function () {
        this.pSelector = d3.select("p").text();
        this.arraySelector = d3.selectAll("p b");
        this.classSelector = d3.selectAll('.methods p');
        this.idSelector = d3.select("#concept");
    };
    return SelectionsComponent;
}());
SelectionsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-selections',
        template: __webpack_require__(178),
        styles: [__webpack_require__(169)]
    }),
    __metadata("design:paramtypes", [])
], SelectionsComponent);

//# sourceMappingURL=selections.component.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvgComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SvgComponent = (function () {
    function SvgComponent() {
    }
    SvgComponent.prototype.ngOnInit = function () {
    };
    return SvgComponent;
}());
SvgComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-svg',
        template: __webpack_require__(179),
        styles: [__webpack_require__(170)]
    }),
    __metadata("design:paramtypes", [])
], SvgComponent);

//# sourceMappingURL=svg.component.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "@-webkit-keyframes spinnerRotate\r\n{\r\n    from{-webkit-transform:rotate(0deg);}\r\n    to{-webkit-transform:rotate(360deg);}\r\n}\r\n\r\n@keyframes spinnerRotate\r\n{\r\n    from{-webkit-transform:rotate(0deg);}\r\n    to{-webkit-transform:rotate(360deg);}\r\n}\r\n\r\n@-webkit-keyframes moveLinear\r\n{\r\n    from{float: left;}\r\n    to{float: right;}\r\n}\r\n\r\n@keyframes moveLinear\r\n{\r\n    from{float: left;}\r\n    to{float: right;}\r\n}\r\n\r\n#main-logo{\r\n    -webkit-animation-name: moveLinear;\r\n            animation-name: moveLinear;\r\n    -webkit-animation-duration: 5s;\r\n            animation-duration: 5s;\r\n    -webkit-animation-iteration-count: infinite;\r\n            animation-iteration-count: infinite;\r\n    -webkit-animation-timing-function: linear;\r\n            animation-timing-function: linear;\r\n}\r\n\r\n#main-logo img{\r\n    width: 150px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

module.exports = "<h4 class=\"pull-right\">\r\n  <a href=\"/d3js\">Go Home</a>\r\n</h4>\r\n<div class=\"clearfix\"></div>\r\n<!-- <div id=\"main-logo\"><img src=\"assets/logo.jpg\"/></div> -->\r\n<div class=\"clearfix\"></div>\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

module.exports = "<h2>What is a Data Join?</h2>\n<span>\n  Data join enables us to inject, modify and remove elements (HTML element as well as embedded SVG elements) based on the data set in the existing HTML document. By default, each data item in the data set corresponds to an element (graphical) in the document.<br/>\n  As the data set changes, the corresponding element can also be manipulated easily. Data join creates a close relationship between our data and graphical elements of the document. Data join makes manipulation of the elements based on the data set a very simple and easy process.\n</span>\n<ul id=\"list\">\n  <li></li>\n  <li></li>\n</ul>\n<div>\n  <button class=\"btn btn-default\" (click)=\"addData()\">Bind Data</button>\n  <button class=\"btn btn-default\" (click)=\"updateData()\">Update Data</button>\n  <button class=\"btn btn-default\" (click)=\"createNew()\">Create</button>\n  <button class=\"btn btn-default\" (click)=\"exit()\">Exit</button>\n</div>\n<h2>Data Join Methods</h2>\n<span>Data join provides the following four methods to work with data set −</span>\n<ul id=\"methods\">\n  <li>datum()</li>\n  <li>data()</li>\n  <li>enter()</li>\n  <li>exit()</li>\n</ul>\n<div class=\"well well-sm\">\n  <p></p>\n  <div id=\"fromDatum\"></div>\n</div>\n<div>\n  <button class=\"btn btn-default\" (click)=\"datum()\">Datum</button>\n  <button class=\"btn btn-default\" (click)=\"dataFnUsage()\">Data function Results</button>\n</div>\n<h2>Data Function</h2>\n<ul id=\"dumData\">\n  <li>datum()</li>\n  <li>data()</li>\n  <li>enter()</li>\n</ul>\n<code>\n  <p>{{tempD}}</p>\n  <p>{{tempI}}</p>\n  <p>{{tempThis}}</p>\n</code>\n<div>\n  <svg id=\"my-svg\"></svg>\n</div>\n<div>{{circles}}</div>\n<button class=\"btn btn-default\" (click)=\"dataStructure()\">Bind Data to circles</button>\n<button class=\"btn btn-default\" (click)=\"createCircles()\">Create circles</button>\n<button class=\"btn btn-default\" (click)=\"dataChanges()\">Change Data</button>\n<button class=\"btn btn-default\" (click)=\"createNewCircle()\">Create New circle</button>\n<button class=\"btn btn-default\" (click)=\"updateExisting()\">Update circles</button>\n<button class=\"btn btn-default\" (click)=\"removeCircles()\">Remove circles</button>\n"

/***/ }),

/***/ 174:
/***/ (function(module, exports) {

module.exports = "<h1>Different SVG Shapes</h1>\r\n\r\n<div class=\"col-sm-12\">\r\n  <div class=\"col-sm-4\">\r\n    <h3>Ring</h3>\r\n    <svg height=\"100\" width=\"300\">\r\n      <rect width=\"300\" height=\"100\" style=\"fill:rgb(0,0,255);\"/>\r\n      <circle cx=\"150\" cy=\"50\" r=\"50\" style=\"fill:yellow\" />\r\n      <circle cx=\"150\" cy=\"50\" r=\"30\" style=\"fill:rgb(0,0,255);\" />\r\n      Sorry, your browser does not support inline SVG.\r\n    </svg>\r\n  </div>\r\n  <div class=\"col-sm-4\">\r\n    <h3>Rectangle inside a circle</h3>\r\n    <svg height=\"100\" width=\"300\">\r\n      <circle cx=\"150\" cy=\"50\" r=\"50\" style=\"fill:yellow\" />\r\n      <rect x=\"125\" y=\"25\" width=\"50\" height=\"50\" style=\"fill:rgb(0,0,255);stroke-width:2;stroke:rgb(0,0,0)\" />\r\n      Sorry, your browser does not support inline SVG.\r\n    </svg>\r\n  </div>\r\n  <div class=\"col-sm-4\">\r\n    <h3>Circle inside a Rectangle</h3>\r\n    <svg height=\"100\" width=\"300\">\r\n      <rect x=\"0\" y=\"0\" width=\"300\" height=\"100\" style=\"fill:rgb(0,0,255);stroke-width:0;stroke:rgb(0,0,0)\" />  \r\n      <circle cx=\"150\" cy=\"50\" r=\"49\" style=\"fill:yellow\" />\r\n      Sorry, your browser does not support inline SVG.\r\n    </svg>\r\n  </div>\r\n</div>\r\n<div class=\"col-sm-12\">\r\n  <div class=\"col-sm-4\">\r\n    <h3>Triangle on a rectangle</h3>\r\n    <svg height=\"300\" width=\"200\">\r\n      <polygon points=\"100,0 0,150 200,150\" style=\"fill:lime;stroke:purple;stroke-width:1\" />\r\n      <rect x=\"0\" y=\"150\" width=\"200\" height=\"150\" style=\"fill:rgb(0,0,255);stroke-width:0;stroke:rgb(0,0,0)\" />  \r\n      Sorry, your browser does not support inline SVG.\r\n    </svg>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 175:
/***/ (function(module, exports) {

module.exports = "<h1 class=\"text-center\">D3.js Tutorial</h1>\r\n    <nav class=\"navbar navbar-inverse\">\r\n      <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-9\" aria-expanded=\"false\"> \r\n            <span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> \r\n          </button> \r\n          <!-- <a href=\"#\" class=\"navbar-brand\">D3</a>  -->\r\n        </div>\r\n        <div class=\"navbar-collapse collapse\" id=\"bs-example-navbar-collapse-9\" aria-expanded=\"false\" style=\"height: 1px;\">\r\n          <ul class=\"nav navbar-nav\">\r\n            <li class=\"active\"><a href=\"#\">Table of Contents</a></li>\r\n            <li><a href=\"#examples\">Examples</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n    <section id=\"table-of-contents\">\r\n      <ul>\r\n        <li><a href=\"#intro\">Introduction</a></li>\r\n        <li><a href=\"#svg\">SVG objects</a></li>\r\n        <li><a href=\"#drawing-shapes\">Drawing shapes</a></li>\r\n        <li><a href=\"#principles\">D3 principles</a></li>\r\n        <li><a href=\"#selections\">selections</a></li>\r\n        <li><a href=\"#manipulating-selections\">Manipulating selections</a></li>\r\n        <li><a href=\"#binding-data\">Binding & Displaying Data</a></li>\r\n        <li><a href=\"#load-ext-data\">Loading data externally</a></li>\r\n        <li><a href=\"#scales\">Scales</a></li>\r\n        <li><a href=\"#axes\">Axes</a></li>\r\n        <li><a href=\"#animations\">Animations</a></li>\r\n        <li><a href=\"#interactivity\">Interactivity</a></li>\r\n        <li><a href=\"#intro-to-charts\">Intro to Charts</a></li>\r\n        <li><a href=\"#bar-chart\">Building a Bar Chart</a></li>\r\n        <li><a href=\"#labels\">Adding labels</a></li>\r\n        <li><a href=\"#line-chart\">Building a line Chart</a></li>\r\n        <li><a href=\"#pie-chart\">Building a Pie chart</a></li>\r\n        <li><a href=\"#donut\">Building a donut</a></li>\r\n        <li><a href=\"#geojson\">GeoJSON overview</a></li>\r\n        <li><a href=\"#map\">Map and projections</a></li>\r\n        <li><a href=\"#panning-dragging\">Panning and dragging a map</a></li>\r\n        <li><a href=\"#zooming\">Zooming</a></li>\r\n        <li><a href=\"#best-practices\">Best Practices and Overview of D3 V4 Modules</a></li>\r\n      </ul>\r\n    </section>\r\n"

/***/ }),

/***/ 176:
/***/ (function(module, exports) {

module.exports = "<h2>Introduction</h2>\r\n<p>\r\nD3.js stands for Data Driven Documents. It's a very comprehensive library which provides many tools for data-based calculations and document manipulations. It also handles (and that's one of its strong points) many of the math needed for the visualization of data. D3 has a steep learning curve, but once you experiment with it and manage to do simple visualization of some kind of data; the learning process will become much more compelling and interesting. That's the purpose of this post.\r\n</p>\r\n<p>\r\nD3 handles any kind of document, be it HTML or SVG, and it's not exclusively used to create graphics. That being said, D3 lends itself very well for manipulation of shapes and graphical objects based on static and dynamic data. As such, D3 makes it possible to create very appealing documents.\r\n</p>\r\n<p>\r\nSVG is one type of document which is often being used with D3. With SVG one can create graphical entities much like creating and styling HTML elements. In this article we will use SVG to visualize our data.\r\n</p>\r\n<p>\r\nD3 is not a monolithic framework that seeks to provide every conceivable feature. Instead, D3 solves the crux of the problem: efficient manipulation of documents based on data. This avoids proprietary representation and affords extraordinary flexibility, exposing the full capabilities of web standards such as HTML, SVG, and CSS. With minimal overhead, D3 is extremely fast, supporting large datasets and dynamic behaviors for interaction and animation. D3’s functional style allows code reuse through a diverse collection of official and community-developed modules.\r\n</p>"

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

module.exports = "<h1>D3 Principles</h1>\r\n<p>Embedded within an HTML webpage, the JavaScript D3.js library uses pre-built JavaScript functions to select elements, create SVG objects, style them, or add transitions, dynamic effects or tooltips to them. These objects can also be widely styled using CSS. Large datasets can be easily bound to SVG objects using simple D3.js functions to generate rich text/graphic charts and diagrams. The data can be in various formats, most commonly JSON, comma-separated values (CSV) or geoJSON, but, if required, JavaScript functions can be written to read other data formats.</p>\r\n<div class=\"col-sm-12\">\r\n    <h3>Selections</h3>\r\n    <p>\r\n      The central principle of D3.js design is to enable the programmer to first use a CSS-style selector to select a given set of Document Object Model (DOM) nodes, then use operators to manipulate them in a similar manner to jQuery.\r\n    </p>\r\n    <code>\r\n        <p>d3.selectAll(\"p\")                 // select all p elements</p>\r\n        <p>.style(\"color\", \"lavender\")     // set style \"color\" to value \"lavender\"</p>\r\n        <p>.attr(\"class\", \"squares\")       // set attribute \"class\" to value \"squares\"</p>\r\n        <p>.attr(\"x\", 50);                 // set attribute \"x\" (horizontal position) to value 50px</p>\r\n    </code>\r\n    <p>\r\n        The selection can be based on tag (as in the above example), class, identifier, attribute, or place in the hierarchy. Once elements are selected, one can apply operations to them. This includes getting and setting attributes, display texts, and styles (as in the above example). Elements may also be added and removed. This process of modifying, creating and removing HTML elements can be made dependent on data, which is the basic concept of D3.js.\r\n    </p>\r\n</div>\r\n<div class=\"col-sm-12\">\r\n  <h3>Transitions</h3>\r\n  <p>By declaring a transition, values for attributes and styles can be smoothly interpolated over a certain time. The following code will make all HTML p elements on a page gradually change their text color to pink:</p>\r\n  <code>\r\n    <p>d3.selectAll(\"p\")             // select all p elements</p>\r\n      <p>.transition(\"trans_1\")      // transition with name \"trans_1\"</p>\r\n      <p>.delay(0)                 // transition starting 0ms after trigger</p>\r\n      <p>.duration(500)            // transitioning during 500ms</p>\r\n      <p>.ease(\"linear\")           // transition easing progression is linear...</p>\r\n      <p>.style(\"color\", \"pink\");    // ... to color:pink</p>\r\n  </code>\r\n</div>\r\n<div class=\"col-sm-12\">\r\n  <h3>Data-binding</h3>\r\n  <p>For more advanced uses, loaded data drives the creation of elements. D3.js loads a given dataset, then, for each of its elements, creates an SVG object with associated properties (shape, colors, values) and behaviors (transitions, events).</p>\r\n  <code>\r\n    <p>var countriesData = [\r\n        ( name:\"Ireland\",  income:53000, life: 78, pop:6378, color: \"black\"),\r\n        ( name:\"Norway\",   income:73000, life: 87, pop:5084, color: \"blue\" ),\r\n        ( name:\"Tanzania\", income:27000, life: 50, pop:3407, color: \"grey\" )\r\n     ];</p>\r\n     <p>var svg = d3.select(\"#hook\").append(\"svg\")\r\n        .attr(\"width\", 120)\r\n        .attr(\"height\", 120)\r\n        .style(\"background-color\", \"#D0D0D0\");</p>\r\n      <p>svg.selectAll(\"circle\")                  // create virtual circle template</p>\r\n      <p>.data(countriesData)                   // bind data</p>\r\n      <p>.enter()                                 // for each row in data...</p>\r\n      <p>.append(\"circle\")                      // bind circle &amp; data row such that... </p>\r\n      <p>.attr(\"id\", function(d) ( return d.name ))            // set the circle's id according to the country name</p>\r\n  </code>\r\n</div>"

/***/ }),

/***/ 178:
/***/ (function(module, exports) {

module.exports = "<h1>Selections</h1>\r\n<button class=\"btn btn-primary pull-right\" (click)=\"showResults()\">Show selections</button>\r\n<p id=\"concept\">\r\n    Selections is one of the core concepts in D3.js. It is based on CSS selectors. It allows us to select one or more elements in a webpage. In addition, it allows us to modify, append, or remove elements in a relation to the pre-defined dataset.\r\n</p>\r\n<div class=\"methods\">\r\n    <p><b>select()</b> -  Selects only one DOM element by matching the given CSS selector. If there are more than one elements for the given CSS selector, it selects the first one only.</p>\r\n    <p><b>selectAll()</b> - Selects all DOM elements by matching the given CSS selector. If you are familiar with selecting elements with jQuery, D3.js selectors are almost the same.</p>\r\n</div>\r\n<code>\r\n  <h2>Selection by Tag</h2>\r\n  <div class=\"well well-sm\">\r\n      d3.select('p').text(): {{pSelector}}\r\n  </div>\r\n  <div class=\"well well-sm\">\r\n      d3.selectAll(\"p b\"): {{arraySelector}}\r\n  </div>\r\n\r\n  <h2>Selection by Classname</h2>\r\n  <div class=\"well well-sm\">\r\n      d3.selectAll('.methods'): {{classSelector}}\r\n  </div>\r\n\r\n  <h2>Selection by Id</h2>\r\n  <div class=\"well well-sm\">\r\n      d3.select('#concept'): {{idSelector}}\r\n  </div>\r\n</code>"

/***/ }),

/***/ 179:
/***/ (function(module, exports) {

module.exports = "<h2>What is SVG?</h2>\r\n<ul>\r\n  <li>SVG stands for Scalable Vector Graphics</li>\r\n  <li>SVG is used to define graphics for the Web</li>\r\n  <li>SVG is a W3C recommendation</li>\r\n  <li>SVG graphics do NOT lose any quality if they are zoomed or resized</li>\r\n  <li>Every element and every attribute in SVG files can be animated</li>\r\n</ul>\r\n\r\n<h2>Differences Between SVG and Canvas</h2>\r\n<p>SVG is a language for describing 2D graphics in XML.</p>\r\n\r\n<p>Canvas draws 2D graphics, on the fly (with a JavaScript).</p>\r\n\r\n<p>SVG is XML based, which means that every element is available within the SVG DOM. You can attach JavaScript event handlers for an element.</p>\r\n\r\n<p>In SVG, each drawn shape is remembered as an object. If attributes of an SVG object are changed, the browser can automatically re-render the shape.</p>\r\n\r\n<p>Canvas is rendered pixel by pixel. In canvas, once the graphic is drawn, it is forgotten by the browser. If its position should be changed, the entire scene needs to be redrawn, including any objects that might have been covered by the graphic.</p>\r\n\r\n<div class=\"col-sm-12\">\r\n  <div class=\"col-sm-4\">\r\n    <h3>Circle</h3>\r\n    <svg width=\"100\" height=\"100\">\r\n      <circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"green\" stroke-width=\"4\" fill=\"yellow\" />\r\n    </svg>\r\n  </div>\r\n  <div class=\"col-sm-4\">\r\n      <h3>Rectangle</h3>\r\n    <svg width=\"400\" height=\"100\">\r\n      <rect width=\"200\" height=\"100\" style=\"fill:rgb(0,0,255);stroke-width:10;stroke:rgb(0,0,0)\" />\r\n    </svg>\r\n  </div>\r\n  <div class=\"col-sm-4\">\r\n    <h3>Rectangle with border radius</h3>\r\n    <svg width=\"200\" height=\"180\">\r\n      <rect x=\"50\" y=\"20\" rx=\"20\" ry=\"20\" width=\"140\" height=\"150\"\r\n      style=\"fill:red;stroke:black;stroke-width:5;opacity:0.5\" />\r\n    </svg>\r\n  </div>\r\n</div>\r\n<div>\r\n  <div class=\"col-sm-4\">\r\n    <h3>Gradient Ellipse</h3>\r\n    <svg height=\"130\" width=\"500\">\r\n      <defs>\r\n        <linearGradient id=\"grad1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\r\n          <stop offset=\"0%\" style=\"stop-color:rgb(255,255,0);stop-opacity:1\" />\r\n          <stop offset=\"100%\" style=\"stop-color:rgb(255,0,0);stop-opacity:1\" />\r\n        </linearGradient>\r\n      </defs>\r\n      <ellipse cx=\"100\" cy=\"70\" rx=\"85\" ry=\"55\" fill=\"url(#grad1)\" />\r\n      <text fill=\"#ffffff\" font-size=\"45\" font-family=\"Verdana\" x=\"50\" y=\"86\">SVG</text>\r\n      Sorry, your browser does not support inline SVG.\r\n    </svg>\r\n  </div>\r\n  <div class=\"col-sm-4\">\r\n    <h3>Ellipse</h3>\r\n    <svg height=\"140\" width=\"500\">\r\n      <ellipse cx=\"200\" cy=\"80\" rx=\"100\" ry=\"50\"\r\n      style=\"fill:yellow;stroke:purple;stroke-width:2\" />\r\n    </svg>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(88);


/***/ }),

/***/ 87:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 87;


/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(107);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(172),
        styles: [__webpack_require__(163)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(97);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_4__app_routing__["a" /* RoutableComponents */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__app_routing__["b" /* AppRoutingModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__intro_intro_component__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__examples_examples_component__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__svg_svg_component__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__principles_principles_component__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__selections_selections_component__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__binding_data_binding_data_component__ = __webpack_require__(100);
/* unused harmony export appRoutes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppRoutingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutableComponents; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */] },
    { path: 'examples', component: __WEBPACK_IMPORTED_MODULE_4__examples_examples_component__["a" /* ExamplesComponent */] },
    { path: 'intro', component: __WEBPACK_IMPORTED_MODULE_3__intro_intro_component__["a" /* IntroComponent */] },
    { path: 'svg', component: __WEBPACK_IMPORTED_MODULE_5__svg_svg_component__["a" /* SvgComponent */] },
    { path: 'drawing-shapes', component: __WEBPACK_IMPORTED_MODULE_4__examples_examples_component__["a" /* ExamplesComponent */] },
    { path: 'principles', component: __WEBPACK_IMPORTED_MODULE_6__principles_principles_component__["a" /* PrinciplesComponent */] },
    { path: 'selections', component: __WEBPACK_IMPORTED_MODULE_7__selections_selections_component__["a" /* SelectionsComponent */] },
    { path: 'binding-data', component: __WEBPACK_IMPORTED_MODULE_8__binding_data_binding_data_component__["a" /* BindingDataComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(appRoutes, {
                useHash: true,
            })
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

var RoutableComponents = [
    __WEBPACK_IMPORTED_MODULE_3__intro_intro_component__["a" /* IntroComponent */],
    __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */],
    __WEBPACK_IMPORTED_MODULE_4__examples_examples_component__["a" /* ExamplesComponent */],
    __WEBPACK_IMPORTED_MODULE_5__svg_svg_component__["a" /* SvgComponent */],
    __WEBPACK_IMPORTED_MODULE_6__principles_principles_component__["a" /* PrinciplesComponent */],
    __WEBPACK_IMPORTED_MODULE_7__selections_selections_component__["a" /* SelectionsComponent */],
    __WEBPACK_IMPORTED_MODULE_8__binding_data_binding_data_component__["a" /* BindingDataComponent */]
];
//# sourceMappingURL=app.routing.js.map

/***/ })

},[230]);
//# sourceMappingURL=main.bundle.js.map