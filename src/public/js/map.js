/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/map.js":
/*!************************!*\
  !*** ./src/lib/map.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n//Auntoinvocacion\r\n(function () {\r\n    const lat = 20.209416;\r\n    const lng = -98.007805;\r\n    const map = L.map('map').setView([lat, lng], 16);\r\n    let marker\r\n    const geocoderService = L.esri.Geocoding.geocodeService();\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map);\r\n\r\n    marker = new L.marker([lat, lng], {\r\n        draggable: true, //Puedes mover\r\n        autoPan: true,\r\n    }).addTo(map);\r\n\r\n\r\n    marker.on('moveend', function (e) { \r\n        marker = e.target\r\n        const position = marker.getLatLng()\r\n        console.log(`El usuario solto el marcador en las coordenadas:${position.lat}, ${position.lng}`)\r\n        map.panTo(new L.LatLng(position.lat, position.lng))\r\n\r\n        geocoderService.reverse().latlng(position, 13).run(function (error, result) {\r\n            console.log(`La informacion calculada por geocoder al intentar hacer la georeferencia inversa es:${result}`)\r\n\r\n            marker.bindPopup(result.address.LongLabel)\r\n            document.querySelector('.street').textContent = result.address?.Address ?? '';\r\n            document.querySelector('#street').value = result.address?.Address ?? '';\r\n            result.\r\n            document.querySelector('#lat').value = result.latlng?.lat ?? '';\r\n            document.querySelector('#lng').value = result.latlng?.lng ?? '';\r\n        })\r\n    })\r\n})();\n\n//# sourceURL=webpack://bienesraices-220087/./src/lib/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/lib/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;