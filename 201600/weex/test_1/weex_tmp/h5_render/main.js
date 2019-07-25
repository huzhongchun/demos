/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/b10fb4efbc0ee7fc076ba70d29146ee9", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      firstName: 'John',
	      lastName: 'Smith'
	    }},
	    computed: {
	      fullName: {
	        get: function() {
	          return this.firstName + ' ' + this.lastName
	        },

	        set: function(v) {
	          var s = v.split(' ')
	          this.firstName = s[0]
	          this.lastName = s[1]
	        }
	      }
	    },
	    methods: {
	      changeName: function() {
	        this.fullName = 'Terry King'
	      }
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "container",
	  "style": {
	    "flexDirection": "row"
	  },
	  "children": [
	    {
	      "type": "text",
	      "style": {
	        "fontSize": 24
	      },
	      "attr": {
	        "value": function () {return this.fullName}
	      }
	    },
	    {
	      "type": "text",
	      "events": {
	        "click": "changeName"
	      },
	      "style": {
	        "marginLeft": 10
	      },
	      "attr": {
	        "value": "CHANGE NAME"
	      }
	    },
	    {
	      "type": "input",
	      "attr": {
	        "type": "file"
	      }
	    }
	  ]
	})
	})
	;__weex_bootstrap__("@weex-component/b10fb4efbc0ee7fc076ba70d29146ee9", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);