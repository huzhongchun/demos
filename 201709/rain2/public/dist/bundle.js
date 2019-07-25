/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "d6bf884d500ae380097e"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://local.test.com/201709/rain2/public/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-runtime/core-js/object/define-property.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/object/define-property.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/promise.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/promise.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/symbol.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/symbol/index.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/symbol/iterator.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/symbol/iterator.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/asyncToGenerator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/classCallCheck.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/createClass.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__("./node_modules/babel-runtime/core-js/object/define-property.js");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/typeof.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__("./node_modules/babel-runtime/core-js/symbol/iterator.js");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__("./node_modules/babel-runtime/core-js/symbol.js");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ "./node_modules/babel-runtime/regenerator/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./node_modules/core-js/library/fn/object/define-property.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/core-js/library/modules/es6.object.define-property.js");
var $Object = __webpack_require__("./node_modules/core-js/library/modules/_core.js").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "./node_modules/core-js/library/fn/promise.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__("./node_modules/core-js/library/modules/es6.promise.js");
__webpack_require__("./node_modules/core-js/library/modules/es7.promise.finally.js");
__webpack_require__("./node_modules/core-js/library/modules/es7.promise.try.js");
module.exports = __webpack_require__("./node_modules/core-js/library/modules/_core.js").Promise;


/***/ }),

/***/ "./node_modules/core-js/library/fn/symbol/index.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/core-js/library/modules/es6.symbol.js");
__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__("./node_modules/core-js/library/modules/es7.symbol.async-iterator.js");
__webpack_require__("./node_modules/core-js/library/modules/es7.symbol.observable.js");
module.exports = __webpack_require__("./node_modules/core-js/library/modules/_core.js").Symbol;


/***/ }),

/***/ "./node_modules/core-js/library/fn/symbol/iterator.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js");
module.exports = __webpack_require__("./node_modules/core-js/library/modules/_wks-ext.js").f('iterator');


/***/ }),

/***/ "./node_modules/core-js/library/modules/_a-function.js":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_add-to-unscopables.js":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/core-js/library/modules/_an-instance.js":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_an-object.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("./node_modules/core-js/library/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_array-includes.js":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js");
var toLength = __webpack_require__("./node_modules/core-js/library/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__("./node_modules/core-js/library/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_classof.js":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("./node_modules/core-js/library/modules/_cof.js");
var TAG = __webpack_require__("./node_modules/core-js/library/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_cof.js":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_core.js":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/library/modules/_ctx.js":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("./node_modules/core-js/library/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_defined.js":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_descriptors.js":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("./node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_dom-create.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("./node_modules/core-js/library/modules/_is-object.js");
var document = __webpack_require__("./node_modules/core-js/library/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_enum-bug-keys.js":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/library/modules/_enum-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("./node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__("./node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__("./node_modules/core-js/library/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_export.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__("./node_modules/core-js/library/modules/_core.js");
var ctx = __webpack_require__("./node_modules/core-js/library/modules/_ctx.js");
var hide = __webpack_require__("./node_modules/core-js/library/modules/_hide.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_fails.js":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_for-of.js":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("./node_modules/core-js/library/modules/_ctx.js");
var call = __webpack_require__("./node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__("./node_modules/core-js/library/modules/_is-array-iter.js");
var anObject = __webpack_require__("./node_modules/core-js/library/modules/_an-object.js");
var toLength = __webpack_require__("./node_modules/core-js/library/modules/_to-length.js");
var getIterFn = __webpack_require__("./node_modules/core-js/library/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_global.js":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/library/modules/_has.js":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_hide.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("./node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__("./node_modules/core-js/library/modules/_property-desc.js");
module.exports = __webpack_require__("./node_modules/core-js/library/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_html.js":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("./node_modules/core-js/library/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_ie8-dom-define.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js") && !__webpack_require__("./node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__("./node_modules/core-js/library/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/_invoke.js":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iobject.js":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("./node_modules/core-js/library/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-array-iter.js":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("./node_modules/core-js/library/modules/_iterators.js");
var ITERATOR = __webpack_require__("./node_modules/core-js/library/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-array.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("./node_modules/core-js/library/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-object.js":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-call.js":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("./node_modules/core-js/library/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-create.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("./node_modules/core-js/library/modules/_object-create.js");
var descriptor = __webpack_require__("./node_modules/core-js/library/modules/_property-desc.js");
var setToStringTag = __webpack_require__("./node_modules/core-js/library/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("./node_modules/core-js/library/modules/_hide.js")(IteratorPrototype, __webpack_require__("./node_modules/core-js/library/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-define.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("./node_modules/core-js/library/modules/_library.js");
var $export = __webpack_require__("./node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__("./node_modules/core-js/library/modules/_redefine.js");
var hide = __webpack_require__("./node_modules/core-js/library/modules/_hide.js");
var has = __webpack_require__("./node_modules/core-js/library/modules/_has.js");
var Iterators = __webpack_require__("./node_modules/core-js/library/modules/_iterators.js");
var $iterCreate = __webpack_require__("./node_modules/core-js/library/modules/_iter-create.js");
var setToStringTag = __webpack_require__("./node_modules/core-js/library/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__("./node_modules/core-js/library/modules/_object-gpo.js");
var ITERATOR = __webpack_require__("./node_modules/core-js/library/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-detect.js":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("./node_modules/core-js/library/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-step.js":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_iterators.js":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_library.js":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_meta.js":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("./node_modules/core-js/library/modules/_uid.js")('meta');
var isObject = __webpack_require__("./node_modules/core-js/library/modules/_is-object.js");
var has = __webpack_require__("./node_modules/core-js/library/modules/_has.js");
var setDesc = __webpack_require__("./node_modules/core-js/library/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("./node_modules/core-js/library/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_microtask.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("./node_modules/core-js/library/modules/_global.js");
var macrotask = __webpack_require__("./node_modules/core-js/library/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("./node_modules/core-js/library/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_new-promise-capability.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("./node_modules/core-js/library/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-create.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("./node_modules/core-js/library/modules/_an-object.js");
var dPs = __webpack_require__("./node_modules/core-js/library/modules/_object-dps.js");
var enumBugKeys = __webpack_require__("./node_modules/core-js/library/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__("./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("./node_modules/core-js/library/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("./node_modules/core-js/library/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dp.js":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("./node_modules/core-js/library/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__("./node_modules/core-js/library/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__("./node_modules/core-js/library/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__("./node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dps.js":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("./node_modules/core-js/library/modules/_object-dp.js");
var anObject = __webpack_require__("./node_modules/core-js/library/modules/_an-object.js");
var getKeys = __webpack_require__("./node_modules/core-js/library/modules/_object-keys.js");

module.exports = __webpack_require__("./node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopd.js":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("./node_modules/core-js/library/modules/_object-pie.js");
var createDesc = __webpack_require__("./node_modules/core-js/library/modules/_property-desc.js");
var toIObject = __webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__("./node_modules/core-js/library/modules/_to-primitive.js");
var has = __webpack_require__("./node_modules/core-js/library/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__("./node_modules/core-js/library/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("./node_modules/core-js/library/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopn-ext.js":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js");
var gOPN = __webpack_require__("./node_modules/core-js/library/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopn.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("./node_modules/core-js/library/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__("./node_modules/core-js/library/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gops.js":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gpo.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("./node_modules/core-js/library/modules/_has.js");
var toObject = __webpack_require__("./node_modules/core-js/library/modules/_to-object.js");
var IE_PROTO = __webpack_require__("./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys-internal.js":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("./node_modules/core-js/library/modules/_has.js");
var toIObject = __webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__("./node_modules/core-js/library/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__("./node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys.js":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("./node_modules/core-js/library/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__("./node_modules/core-js/library/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-pie.js":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_perform.js":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_promise-resolve.js":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("./node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__("./node_modules/core-js/library/modules/_is-object.js");
var newPromiseCapability = __webpack_require__("./node_modules/core-js/library/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_property-desc.js":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_redefine-all.js":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("./node_modules/core-js/library/modules/_hide.js");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_redefine.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./node_modules/core-js/library/modules/_hide.js");


/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-species.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__("./node_modules/core-js/library/modules/_core.js");
var dP = __webpack_require__("./node_modules/core-js/library/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__("./node_modules/core-js/library/modules/_descriptors.js");
var SPECIES = __webpack_require__("./node_modules/core-js/library/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-to-string-tag.js":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("./node_modules/core-js/library/modules/_object-dp.js").f;
var has = __webpack_require__("./node_modules/core-js/library/modules/_has.js");
var TAG = __webpack_require__("./node_modules/core-js/library/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared-key.js":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("./node_modules/core-js/library/modules/_shared.js")('keys');
var uid = __webpack_require__("./node_modules/core-js/library/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("./node_modules/core-js/library/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_species-constructor.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("./node_modules/core-js/library/modules/_an-object.js");
var aFunction = __webpack_require__("./node_modules/core-js/library/modules/_a-function.js");
var SPECIES = __webpack_require__("./node_modules/core-js/library/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_string-at.js":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("./node_modules/core-js/library/modules/_to-integer.js");
var defined = __webpack_require__("./node_modules/core-js/library/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_task.js":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("./node_modules/core-js/library/modules/_ctx.js");
var invoke = __webpack_require__("./node_modules/core-js/library/modules/_invoke.js");
var html = __webpack_require__("./node_modules/core-js/library/modules/_html.js");
var cel = __webpack_require__("./node_modules/core-js/library/modules/_dom-create.js");
var global = __webpack_require__("./node_modules/core-js/library/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("./node_modules/core-js/library/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-absolute-index.js":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("./node_modules/core-js/library/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-integer.js":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-iobject.js":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("./node_modules/core-js/library/modules/_iobject.js");
var defined = __webpack_require__("./node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-length.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("./node_modules/core-js/library/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-object.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("./node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-primitive.js":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("./node_modules/core-js/library/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_uid.js":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks-define.js":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("./node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__("./node_modules/core-js/library/modules/_core.js");
var LIBRARY = __webpack_require__("./node_modules/core-js/library/modules/_library.js");
var wksExt = __webpack_require__("./node_modules/core-js/library/modules/_wks-ext.js");
var defineProperty = __webpack_require__("./node_modules/core-js/library/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks-ext.js":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("./node_modules/core-js/library/modules/_wks.js");


/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks.js":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("./node_modules/core-js/library/modules/_shared.js")('wks');
var uid = __webpack_require__("./node_modules/core-js/library/modules/_uid.js");
var Symbol = __webpack_require__("./node_modules/core-js/library/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/library/modules/core.get-iterator-method.js":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("./node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__("./node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__("./node_modules/core-js/library/modules/_iterators.js");
module.exports = __webpack_require__("./node_modules/core-js/library/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.array.iterator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("./node_modules/core-js/library/modules/_add-to-unscopables.js");
var step = __webpack_require__("./node_modules/core-js/library/modules/_iter-step.js");
var Iterators = __webpack_require__("./node_modules/core-js/library/modules/_iterators.js");
var toIObject = __webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("./node_modules/core-js/library/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.define-property.js":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("./node_modules/core-js/library/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__("./node_modules/core-js/library/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.to-string.js":
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.promise.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("./node_modules/core-js/library/modules/_library.js");
var global = __webpack_require__("./node_modules/core-js/library/modules/_global.js");
var ctx = __webpack_require__("./node_modules/core-js/library/modules/_ctx.js");
var classof = __webpack_require__("./node_modules/core-js/library/modules/_classof.js");
var $export = __webpack_require__("./node_modules/core-js/library/modules/_export.js");
var isObject = __webpack_require__("./node_modules/core-js/library/modules/_is-object.js");
var aFunction = __webpack_require__("./node_modules/core-js/library/modules/_a-function.js");
var anInstance = __webpack_require__("./node_modules/core-js/library/modules/_an-instance.js");
var forOf = __webpack_require__("./node_modules/core-js/library/modules/_for-of.js");
var speciesConstructor = __webpack_require__("./node_modules/core-js/library/modules/_species-constructor.js");
var task = __webpack_require__("./node_modules/core-js/library/modules/_task.js").set;
var microtask = __webpack_require__("./node_modules/core-js/library/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__("./node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__("./node_modules/core-js/library/modules/_perform.js");
var promiseResolve = __webpack_require__("./node_modules/core-js/library/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("./node_modules/core-js/library/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("./node_modules/core-js/library/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("./node_modules/core-js/library/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__("./node_modules/core-js/library/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__("./node_modules/core-js/library/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("./node_modules/core-js/library/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.string.iterator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("./node_modules/core-js/library/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("./node_modules/core-js/library/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.symbol.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("./node_modules/core-js/library/modules/_global.js");
var has = __webpack_require__("./node_modules/core-js/library/modules/_has.js");
var DESCRIPTORS = __webpack_require__("./node_modules/core-js/library/modules/_descriptors.js");
var $export = __webpack_require__("./node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__("./node_modules/core-js/library/modules/_redefine.js");
var META = __webpack_require__("./node_modules/core-js/library/modules/_meta.js").KEY;
var $fails = __webpack_require__("./node_modules/core-js/library/modules/_fails.js");
var shared = __webpack_require__("./node_modules/core-js/library/modules/_shared.js");
var setToStringTag = __webpack_require__("./node_modules/core-js/library/modules/_set-to-string-tag.js");
var uid = __webpack_require__("./node_modules/core-js/library/modules/_uid.js");
var wks = __webpack_require__("./node_modules/core-js/library/modules/_wks.js");
var wksExt = __webpack_require__("./node_modules/core-js/library/modules/_wks-ext.js");
var wksDefine = __webpack_require__("./node_modules/core-js/library/modules/_wks-define.js");
var enumKeys = __webpack_require__("./node_modules/core-js/library/modules/_enum-keys.js");
var isArray = __webpack_require__("./node_modules/core-js/library/modules/_is-array.js");
var anObject = __webpack_require__("./node_modules/core-js/library/modules/_an-object.js");
var toIObject = __webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__("./node_modules/core-js/library/modules/_to-primitive.js");
var createDesc = __webpack_require__("./node_modules/core-js/library/modules/_property-desc.js");
var _create = __webpack_require__("./node_modules/core-js/library/modules/_object-create.js");
var gOPNExt = __webpack_require__("./node_modules/core-js/library/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__("./node_modules/core-js/library/modules/_object-gopd.js");
var $DP = __webpack_require__("./node_modules/core-js/library/modules/_object-dp.js");
var $keys = __webpack_require__("./node_modules/core-js/library/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("./node_modules/core-js/library/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("./node_modules/core-js/library/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__("./node_modules/core-js/library/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("./node_modules/core-js/library/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("./node_modules/core-js/library/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.promise.finally.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("./node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__("./node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__("./node_modules/core-js/library/modules/_global.js");
var speciesConstructor = __webpack_require__("./node_modules/core-js/library/modules/_species-constructor.js");
var promiseResolve = __webpack_require__("./node_modules/core-js/library/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.promise.try.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("./node_modules/core-js/library/modules/_export.js");
var newPromiseCapability = __webpack_require__("./node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__("./node_modules/core-js/library/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.symbol.async-iterator.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/core-js/library/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.symbol.observable.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/core-js/library/modules/_wks-define.js")('observable');


/***/ }),

/***/ "./node_modules/core-js/library/modules/web.dom.iterable.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/core-js/library/modules/es6.array.iterator.js");
var global = __webpack_require__("./node_modules/core-js/library/modules/_global.js");
var hide = __webpack_require__("./node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__("./node_modules/core-js/library/modules/_iterators.js");
var TO_STRING_TAG = __webpack_require__("./node_modules/core-js/library/modules/_wks.js")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/***/ (function(module, exports, __webpack_require__) {

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__("./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ "./src/ball/body.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var bodyStr = exports.bodyStr = "\n<div style=\"float: left\"></div>\n<button class=\"shelf-background\"></button>\n<div class=\"cell\">\n    <div class=\"ball-wrapper\" id=\"ball\">\n        <div class=\"ball\">\n            <div class=\"ball-inner\">\n                <div class=\"inner-material\">\n                    <!--\u6E10\u53D8\u6750\u8D28-->\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<button class=\"shelf-foreground\" id=\"foreground\"></button>\n";

/***/ }),

/***/ "./src/ball/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initBall = initBall;

var _body = __webpack_require__("./src/ball/body.js");

var _loadCss = __webpack_require__("./src/utils/loadCss.js");

var BALL_SIZE = 370,
    HALF_SIZE = BALL_SIZE / 2;
var INNER_SIZE = 280,
    HALF_INNER_SIZE = INNER_SIZE / 2;

function initBall() {
	document.body.className = 'ball-body';
	document.body.innerHTML = _body.bodyStr;
	(0, _loadCss.loadCss)('/css/ball.css', init);
}

function per(x) {
	if (x < 0) {
		return 0;
	} else if (x > 1) {
		return 1;
	} else {
		return x;
	}
}

Number.prototype.between = function (a, b) {
	return this >= a && this <= b;
};

function init() {

	var touching = false;
	var ballsMaterial = $('.cell .ball .inner-material');
	var ball = $('#ball');
	var innerBall = $('.ball', ball);
	var foreground = $('#foreground');
	var allowMoving = false;

	$(window).on('touchstart', function (ev) {
		ev.preventDefault();
	});

	var ballTouch = function ballTouch(ev) {
		allowMoving = false;
		ev && ev.preventDefault();
		touching = true;
		$('.cell').addClass('light');
		foreground.addClass('light');
		setTimeout(function () {
			$(window).trigger('stage_show');
		}, 4000);
	};
	ball.on('touchstart', ballTouch);

	ball.on('touchend', function () {
		touching = false;
	});

	foreground.on('touchstart', function (ev) {
		var data = ev.touches ? ev.touches[0] : ev;
		var x = data.pageX;
		var y = data.pageY;

		var _ball$get$getBounding = ball.get(0).getBoundingClientRect(),
		    left = _ball$get$getBounding.left,
		    top = _ball$get$getBounding.top,
		    height = _ball$get$getBounding.height,
		    width = _ball$get$getBounding.width;

		if (x.between(left, left + width) && y.between(top, top + height)) {
			ballTouch();
		}
	});
	var _lon = void 0,
	    _lat = void 0,
	    _b = void 0,
	    dlon = 0,
	    dlat = 0,
	    db = 0;
	var inited = false;
	var func = function func(t) {
		if (!inited) {
			_lon = t.lon;
			_lat = t.lat;
			_b = t.b;
			inited = true;
		} else {
			dlon = t.lon - _lon;
			dlat = t.lat - _lat;
			db = t.b - _b;
		}
		if (!allowMoving) {
			return;
		}
		var left_p = Math.sin(Math.PI * dlon / 180),
		    top_p = Math.pow((dlat + 90) / 180, 0.3) - 1;
		var t_left = -left_p * HALF_INNER_SIZE - HALF_INNER_SIZE + 'px',
		    t_top = top_p * HALF_INNER_SIZE - HALF_INNER_SIZE + 'px';
		ballsMaterial.css('transform', 'translate(' + t_left + ',' + t_top + ')');
		ball.css('transform', 'translate(' + (-HALF_SIZE + left_p * 80) + 'px,' + (-HALF_SIZE + db / 90 * 80) + 'px)');
		innerBall.css('box-shadow', '' + (left_p - 0.5) * 10 + 'px ' + (top_p - 0.5) * 10 + 'px 70px 12px rgba(249, 238, 102,1);');
	};
	var g = new Orienter({
		onOrient: func
	});
	g.init();
	ball.css('transition', 'opacity ease-out 1s');
	setTimeout(function () {
		ball.css({ 'opacity': 1, 'transition': 'none' });
		setTimeout(function () {
			allowMoving = true;
		}, 1000);
	}, 1000);
}

/***/ }),

/***/ "./src/lib/css3d-engine.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.C3D = undefined;

var _typeof2 = __webpack_require__("./node_modules/babel-runtime/helpers/typeof.js");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * VERSION: 0.8.2
 * DATE: 2016-09-13
 * GIT: https://github.com/shrekshrek/css3d-engine
 * @author: Shrek.wang
 **/

var C3D = {};
// --------------------------------------------------------------------extend
var keys = function keys(obj) {
	var keys = [];
	for (var key in obj) {
		keys.push(key);
	}
	return keys;
};

var extend = function extend(obj) {
	var length = arguments.length;
	if (length < 2 || obj == null) return obj;
	for (var index = 1; index < length; index++) {
		var source = arguments[index],
		    ks = keys(source),
		    l = ks.length;
		for (var i = 0; i < l; i++) {
			var key = ks[i];
			obj[key] = source[key];
		}
	}
	return obj;
};

var extend2 = function extend2(protoProps, staticProps) {
	var parent = this;
	var child;

	if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
		child = protoProps.constructor;
	} else {
		child = function child() {
			return parent.apply(this, arguments);
		};
	}

	extend(child, parent, staticProps);

	var Surrogate = function Surrogate() {
		this.constructor = child;
	};
	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate();

	if (protoProps) extend(child.prototype, protoProps);

	child.__super__ = parent.prototype;

	return child;
};

// --------------------------------------------------------------------检测是否支持,浏览器补全方法
var prefix = '';

(function () {
	var _d = document.createElement('div');
	var _prefixes = ['Webkit', 'Moz', 'Ms', 'O'];

	for (var i in _prefixes) {
		if (_prefixes[i] + 'Transform' in _d.style) {
			prefix = _prefixes[i];
			break;
		}
	}
})();

// --------------------------------------------------------------------color辅助方法
C3D.getRandomColor = function () {
	return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
};

C3D.rgb2hex = function (r, g, b) {
	return (r << 16 | g << 8 | b).toString(16);
};

C3D.hex2rgb = function (s) {
	var _n = Math.floor('0x' + s);
	var _r = _n >> 16 & 255;
	var _g = _n >> 8 & 255;
	var _b = _n & 255;
	return [_r, _g, _b];
};

// --------------------------------------------------------------------其他辅助方法
function fixed0(n) {
	return Math.round(n);
}

function fixed2(n) {
	return Math.round(n * 100) / 100;
}

//  webkitTransform 转 WebkitTransform
function firstUper(str) {
	return str.replace(/\b(\w)|\s(\w)/g, function (m) {
		return m.toUpperCase();
	});
}

// --------------------------------------------------------------------3d元素基类
C3D.Object = function () {
	this.initialize.apply(this, arguments);
};

extend(C3D.Object.prototype, {
	x: 0,
	y: 0,
	z: 0,
	position: function position(x, y, z) {
		switch (arguments.length) {
			case 1:
				this.x = x;
				this.y = x;
				this.z = x;
				break;
			case 2:
				this.x = x;
				this.y = y;
				break;
			case 3:
				this.x = x;
				this.y = y;
				this.z = z;
				break;
		}
		return this;
	},
	move: function move(x, y, z) {
		switch (arguments.length) {
			case 1:
				this.x += x;
				this.y += x;
				this.z += x;
				break;
			case 2:
				this.x += x;
				this.y += y;
				break;
			case 3:
				this.x += x;
				this.y += y;
				this.z += z;
				break;
		}
		return this;
	},

	rotationX: 0,
	rotationY: 0,
	rotationZ: 0,
	rotation: function rotation(x, y, z) {
		switch (arguments.length) {
			case 1:
				this.rotationX = x;
				this.rotationY = x;
				this.rotationZ = x;
				break;
			case 2:
				this.rotationX = x;
				this.rotationY = y;
				break;
			case 3:
				this.rotationX = x;
				this.rotationY = y;
				this.rotationZ = z;
				break;
		}
		return this;
	},
	rotate: function rotate(x, y, z) {
		switch (arguments.length) {
			case 1:
				this.rotationX += x;
				this.rotationY += x;
				this.rotationZ += x;
				break;
			case 2:
				this.rotationX += x;
				this.rotationY += y;
				break;
			case 3:
				this.rotationX += x;
				this.rotationY += y;
				this.rotationZ += z;
				break;
		}
		return this;
	},

	scaleX: 1,
	scaleY: 1,
	scaleZ: 1,
	scale: function scale(x, y, z) {
		switch (arguments.length) {
			case 1:
				this.scaleX = x;
				this.scaleY = x;
				this.scaleZ = x;
				break;
			case 2:
				this.scaleX = x;
				this.scaleY = y;
				break;
			case 3:
				this.scaleX = x;
				this.scaleY = y;
				this.scaleZ = z;
				break;
		}
		return this;
	},

	width: 0,
	height: 0,
	depth: 0,
	size: function size(x, y, z) {
		switch (arguments.length) {
			case 1:
				this.width = x;
				this.height = x;
				this.depth = x;
				break;
			case 2:
				this.width = x;
				this.height = y;
				break;
			case 3:
				this.width = x;
				this.height = y;
				this.depth = z;
				break;
		}
		return this;
	},

	originX: 0,
	originY: 0,
	originZ: 0,
	__orgO: { x: 0, y: 0, z: 0 },
	__orgT: { x: 0, y: 0, z: 0 },
	__orgF: { x: 0, y: 0, z: 0 },
	origin: function origin(x, y, z) {
		switch (arguments.length) {
			case 1:
				this.originX = x;
				this.originY = x;
				this.originZ = x;
				break;
			case 2:
				this.originX = x;
				this.originY = y;
				break;
			case 3:
				this.originX = x;
				this.originY = y;
				this.originZ = z;
				break;
		}
		return this;
	},

	__sort: ['X', 'Y', 'Z'],
	sort: function sort(s0, s1, s2) {
		if (arguments.length > 3) throw 'sort arguments is wrong!';
		this.__sort = [s0, s1, s2];
		return this;
	},

	initialize: function initialize() {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.rotationX = 0;
		this.rotationY = 0;
		this.rotationZ = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.scaleZ = 1;
		this.width = 0;
		this.height = 0;
		this.depth = 0;
		this.originX = '50%';
		this.originY = '50%';
		this.originZ = '0px';
		this.__orgO = { x: '50%', y: '50%', z: '0px' };
		this.__orgT = { x: '-50%', y: '-50%', z: '0px' };
		this.__orgF = { x: 0, y: 0, z: 0 };
		this.children = [];
	},

	parent: null,
	children: null,
	addChild: function addChild(view) {
		if (view.parent != null) view.parent.removeChild(view);
		if (view.__name != '') {
			if (this[view.__name] !== undefined) throw view.__name + ' already exist!';
			this[view.__name] = view;
		}
		this.children.push(view);
		view.parent = this;
		return this;
	},
	removeChild: function removeChild(view) {
		for (var i = this.children.length - 1; i >= 0; i--) {
			if (this.children[i] === view) {
				if (view.__name != '') delete this[view.__name];
				this.children.splice(i, 1);
				view.parent = null;
				return this;
			}
		}
		return this;
	},
	removeAllChild: function removeAllChild() {
		for (var i = this.children.length - 1; i >= 0; i--) {
			var view = this.children[i];
			if (view.__name != '') delete this[view.__name];
			view.parent = null;
		}
		this.children = [];
		return this;
	},
	remove: function remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
		return this;
	}

});
C3D.Object.extend = extend2;

C3D.Sprite = C3D.Object.extend({
	el: null,
	alpha: 1,
	visible: true,
	initialize: function initialize(params) {
		C3D.Sprite.__super__.initialize.apply(this, [params]);

		this.__name = '';
		this.__id = '';
		this.__class = '';

		this.alpha = 1;
		this.visible = true;

		var _dom;

		if (params && params.el) {
			switch ((0, _typeof3.default)(params.el)) {
				case 'string':
					_dom = document.createElement('div');
					_dom.innerHTML = params.el;
					break;
				case 'object':
					if (params.el.nodeType === 1) {
						_dom = params.el;
					}
					break;
			}
		}

		if (!_dom) {
			_dom = document.createElement('div');
		}

		_dom.style.position = 'absolute';
		_dom.style[prefix + 'Transform'] = 'translateZ(0px)';
		_dom.style[prefix + 'TransformStyle'] = 'preserve-3d';
		this.el = _dom;
		_dom.le = this;
	},

	__name: '',
	name: function name(str) {
		this.__name = str;
		if (str == '') delete this.el.dataset.name;else this.el.dataset.name = str;
		return this;
	},

	__id: '',
	id: function id(str) {
		this.__id = str;
		this.el.id = str;
		return this;
	},

	__class: '',
	class: function _class(str) {
		this.__class = str;
		this.el.className = str;
		return this;
	},

	update: function update() {
		this.updateS();
		this.updateM();
		this.updateO();
		this.updateT();
		this.updateV();
		return this;
	},

	updateS: function updateS() {
		//this.el.style[prefix + 'TransformOrigin'] = '50% 50%';
		return this;
	},

	updateM: function updateM() {
		if (!this.__mat) return this;

		for (var i in this.__mat) {
			switch (i) {
				case 'bothsides':
					this.el.style[prefix + 'BackfaceVisibility'] = this.__mat[i] ? 'visible' : 'hidden';
					break;
				case 'image':
					this.el.style['background' + firstUper(i)] = this.__mat[i] !== '' ? 'url(' + this.__mat[i] + ')' : '';
					break;
				default:
					this.el.style['background' + firstUper(i)] = this.__mat[i];
					break;
			}
		}

		return this;
	},

	updateO: function updateO() {
		if (typeof this.originX == 'number') {
			var _x = fixed0(this.originX - this.__orgF.x);
			this.__orgO.x = _x + 'px';
			this.__orgT.x = -_x + 'px';
		} else {
			this.__orgO.x = this.originX;
			this.__orgT.x = '-' + this.originX;
		}

		if (typeof this.originY == 'number') {
			var _y = fixed0(this.originY - this.__orgF.y);
			this.__orgO.y = _y + 'px';
			this.__orgT.y = -_y + 'px';
		} else {
			this.__orgO.y = this.originY;
			this.__orgT.y = '-' + this.originY;
		}

		if (typeof this.originZ == 'number') {
			var _z = fixed0(this.originZ - this.__orgF.z);
			this.__orgO.z = _z + 'px';
			this.__orgT.z = -_z + 'px';
		} else {
			this.__orgO.z = this.__orgT.z = '0px';
		}

		this.el.style[prefix + 'TransformOrigin'] = this.__orgO.x + ' ' + this.__orgO.y + ' ' + this.__orgO.z;

		return this;
	},

	updateT: function updateT() {
		var _S0 = this.__sort[0];
		var _S1 = this.__sort[1];
		var _S2 = this.__sort[2];
		this.el.style[prefix + 'Transform'] = 'translate3d(' + this.__orgT.x + ', ' + this.__orgT.y + ', ' + this.__orgT.z + ') ' + 'translate3d(' + fixed2(this.x) + 'px,' + fixed2(this.y) + 'px,' + fixed2(this.z) + 'px) ' + 'rotate' + _S0 + '(' + fixed2(this['rotation' + _S0]) % 360 + 'deg) ' + 'rotate' + _S1 + '(' + fixed2(this['rotation' + _S1]) % 360 + 'deg) ' + 'rotate' + _S2 + '(' + fixed2(this['rotation' + _S2]) % 360 + 'deg) ' + 'scale3d(' + fixed2(this.scaleX) + ', ' + fixed2(this.scaleY) + ', ' + fixed2(this.scaleZ) + ') ';
		return this;
	},

	updateV: function updateV() {
		this.el.style.opacity = this.alpha;
		this.el.style.display = this.visible ? 'block' : 'none';
		return this;
	},

	addChild: function addChild(view) {
		C3D.Sprite.__super__.addChild.apply(this, [view]);
		if (this.el && view.el) this.el.appendChild(view.el);
		return this;
	},

	removeChild: function removeChild(view) {
		for (var i = this.children.length - 1; i >= 0; i--) {
			if (this.children[i] === view) {
				if (view.__name != '') delete this[view.__name];
				this.children.splice(i, 1);
				view.parent = null;
				this.el.removeChild(view.el);
				return this;
			}
		}
		return this;
	},

	removeAllChild: function removeAllChild() {
		for (var i = this.children.length - 1; i >= 0; i--) {
			var view = this.children[i];
			if (view.__name != '') delete this[view.__name];
			view.parent = null;
			this.el.removeChild(view.el);
		}
		this.children = [];
		return this;
	},

	on: function on(events) {
		if ((typeof events === 'undefined' ? 'undefined' : (0, _typeof3.default)(events)) === 'object') {
			for (var i in events) {
				this.el.addEventListener(i, events[i], false);
			}
		} else if (arguments.length === 2) {
			this.el.addEventListener(arguments[0], arguments[1], false);
		} else if (arguments.length === 3) {
			this.el.addEventListener(arguments[0], arguments[1], arguments[2]);
		}
		return this;
	},
	off: function off(events) {
		if ((typeof events === 'undefined' ? 'undefined' : (0, _typeof3.default)(events)) === 'object') {
			for (var i in events) {
				this.el.removeEventListener(i, events[i], false);
			}
		} else if (arguments.length === 2) {
			this.el.removeEventListener(arguments[0], arguments[1], false);
		}
		return this;
	},

	buttonMode: function buttonMode(bool) {
		if (bool) {
			this.el.style.cursor = 'pointer';
		} else {
			this.el.style.cursor = 'auto';
		}
		return this;
	},

	__mat: null,
	material: function material(obj) {
		this.__mat = obj;
		return this;
	},

	visibility: function visibility(obj) {
		if (obj.visible !== undefined) this.visible = obj.visible;

		if (obj.alpha !== undefined) this.alpha = obj.alpha;

		return this;
	}
});

// --------------------------------------------------------------------3d核心元件
C3D.Stage = C3D.Sprite.extend({
	camera: null,
	fov: null,
	__rfix: null,
	__pfix: null,
	initialize: function initialize(params) {
		C3D.Stage.__super__.initialize.apply(this, [params]);

		if (!(params && params.el)) {
			this.el.style.top = '0px';
			this.el.style.left = '0px';
			this.el.style.width = '0px';
			this.el.style.height = '0px';
		}
		this.el.style[prefix + 'Perspective'] = '800px';
		this.el.style[prefix + 'TransformStyle'] = 'flat';
		this.el.style[prefix + 'Transform'] = '';
		this.el.style.overflow = 'hidden';

		this.__rfix = new C3D.Sprite();
		this.el.appendChild(this.__rfix.el);

		this.__pfix = new C3D.Sprite();
		this.__rfix.el.appendChild(this.__pfix.el);

		this.setCamera(new C3D.Camera());
	},

	updateS: function updateS() {
		this.el.style.width = fixed0(this.width) + 'px';
		this.el.style.height = fixed0(this.height) + 'px';
		return this;
	},
	updateT: function updateT() {
		this.fov = fixed0(0.5 / Math.tan(this.camera.fov * 0.5 / 180 * Math.PI) * this.height);
		this.el.style[prefix + 'Perspective'] = this.fov + 'px';
		this.__rfix.position(fixed0(this.width / 2), fixed0(this.height / 2), this.fov).rotation(-this.camera.rotationX, -this.camera.rotationY, -this.camera.rotationZ).updateT();
		this.__pfix.position(-this.camera.x, -this.camera.y, -this.camera.z).updateT();
		return this;
	},

	addChild: function addChild(view) {
		this.__pfix.addChild(view);
		return this;
	},
	removeChild: function removeChild(view) {
		this.__pfix.removeChild(view);
		return this;
	},
	setCamera: function setCamera(cam) {
		if (this.camera) {
			this.camera.stage = null;
		}
		this.camera = cam;
		this.camera.stage = this;
		return this;
	}
});

C3D.Camera = C3D.Object.extend({
	fov: null,
	stage: null,
	initialize: function initialize(params) {
		C3D.Camera.__super__.initialize.apply(this, [params]);
		this.fov = 75;
	},
	update: function update() {
		this.updateT();
		return this;
	},
	updateS: function updateS() {
		return this;
	},
	updateM: function updateM() {
		return this;
	},
	updateT: function updateT() {
		if (this.stage) this.stage.updateT();
		return this;
	},
	updateV: function updateV() {
		return this;
	}
});

// --------------------------------------------------------------------3d显示元件
C3D.Plane = C3D.Sprite.extend({
	initialize: function initialize(params) {
		C3D.Plane.__super__.initialize.apply(this, [params]);
	},

	update: function update() {
		C3D.Plane.__super__.update.apply(this);
		this.updateF();
		return this;
	},

	updateS: function updateS() {
		this.el.style.width = fixed0(this.width) + 'px';
		this.el.style.height = fixed0(this.height) + 'px';
		return this;
	},

	updateF: function updateF() {
		if (!this.__flt) return this;

		var _flt = '';
		for (var i in this.__flt) {
			_flt += this.__flt[i] !== '' ? i + '(' + this.__flt[i].join(',') + ')' : '';
		}
		if (_flt !== '') this.el.style[prefix + 'Filter'] = _flt;

		return this;
	},

	__flt: null,
	filter: function filter(obj) {
		this.__flt = obj;
		return this;
	}
});

C3D.Box = C3D.Sprite.extend({
	front: null,
	back: null,
	left: null,
	right: null,
	up: null,
	down: null,
	initialize: function initialize(params) {
		C3D.Box.__super__.initialize.apply(this, [params]);

		this.front = new C3D.Plane();
		this.front.name = 'front';
		this.addChild(this.front);

		this.back = new C3D.Plane();
		this.back.name = 'back';
		this.addChild(this.back);

		this.left = new C3D.Plane();
		this.left.name = 'left';
		this.addChild(this.left);

		this.right = new C3D.Plane();
		this.right.name = 'right';
		this.addChild(this.right);

		this.up = new C3D.Plane();
		this.up.name = 'up';
		this.addChild(this.up);

		this.down = new C3D.Plane();
		this.down.name = 'down';
		this.addChild(this.down);
	},

	update: function update() {
		C3D.Box.__super__.update.apply(this);
		this.updateF();
		return this;
	},

	updateS: function updateS() {
		var _w = fixed0(this.width);
		var _h = fixed0(this.height);
		var _d = fixed0(this.depth);

		this.__orgF.x = this.width / 2;
		this.__orgF.y = this.height / 2;
		this.__orgF.z = this.depth / 2;

		this.front.size(_w, _h, 0).position(0, 0, _d / 2).rotation(0, 0, 0).updateS().updateT();
		this.back.size(_w, _h, 0).position(0, 0, -_d / 2).rotation(0, 180, 0).updateS().updateT();
		this.left.size(_d, _h, 0).position(-_w / 2, 0, 0).rotation(0, -90, 0).updateS().updateT();
		this.right.size(_d, _h, 0).position(_w / 2, 0, 0).rotation(0, 90, 0).updateS().updateT();
		this.up.size(_w, _d, 0).position(0, -_h / 2, 0).rotation(90, 0, 0).updateS().updateT();
		this.down.size(_w, _d, 0).position(0, _h / 2, 0).rotation(-90, 0, 0).updateS().updateT();

		return this;
	},

	updateM: function updateM() {
		if (!this.__mat) return this;

		var _unique = true;
		for (var i in this.__mat) {
			switch (i) {
				case 'front':
				case 'back':
				case 'left':
				case 'right':
				case 'up':
				case 'down':
					if (this.__mat[i].bothsides == undefined) this.__mat[i].bothsides = false;
					this[i].material(this.__mat[i]).updateM();
					_unique = false;
					break;
			}
		}

		if (_unique) {
			if (this.__mat.bothsides == undefined) this.__mat.bothsides = false;
			this.front.material(this.__mat).updateM();
			this.back.material(this.__mat).updateM();
			this.left.material(this.__mat).updateM();
			this.right.material(this.__mat).updateM();
			this.up.material(this.__mat).updateM();
			this.down.material(this.__mat).updateM();
		}

		return this;
	},

	updateF: function updateF() {
		if (!this.__flt) return this;

		this.front.filter(this.__flt).updateF();
		this.back.filter(this.__flt).updateF();
		this.left.filter(this.__flt).updateF();
		this.right.filter(this.__flt).updateF();
		this.up.filter(this.__flt).updateF();
		this.down.filter(this.__flt).updateF();

		return this;
	},

	__flt: null,
	filter: function filter(obj) {
		this.__flt = obj;
		return this;
	}
});

C3D.Skybox = C3D.Box.extend({
	updateS: function updateS() {
		var _w = fixed0(this.width);
		var _h = fixed0(this.height);
		var _d = fixed0(this.depth);

		this.__orgF.x = this.width / 2;
		this.__orgF.y = this.height / 2;
		this.__orgF.z = this.depth / 2;

		this.front.size(_w, _h, 0).position(0, 0, -_d / 2).rotation(0, 0, 0).updateS().updateT();
		this.back.size(_w, _h, 0).position(0, 0, _d / 2).rotation(0, 180, 0).updateS().updateT();
		this.left.size(_d, _h, 0).position(-_w / 2, 0, 0).rotation(0, 90, 0).updateS().updateT();
		this.right.size(_d, _h, 0).position(_w / 2, 0, 0).rotation(0, -90, 0).updateS().updateT();
		this.up.size(_w, _d, 0).position(0, -_h / 2, 0).rotation(-90, 0, 0).updateS().updateT();
		this.down.size(_w, _d, 0).position(0, _h / 2, 0).rotation(90, 0, 0).updateS().updateT();

		return this;
	}

});

// --------------------------------------------------------------------创建场景
function createObj(obj) {
	var _o;
	switch (obj.type) {
		case 'sprite':
			_o = new C3D.Sprite(obj.el ? { el: obj.el } : undefined);
			break;
		case 'plane':
			_o = new C3D.Plane(obj.el ? { el: obj.el } : undefined);
			break;
		case 'box':
			_o = new C3D.Box(obj.el ? { el: obj.el } : undefined);
			break;
		case 'skybox':
			_o = new C3D.Skybox(obj.el ? { el: obj.el } : undefined);
			break;
	}

	if (obj.size != undefined) _o.size.apply(_o, obj.size);
	if (obj.position != undefined) _o.position.apply(_o, obj.position);
	if (obj.rotation != undefined) _o.rotation.apply(_o, obj.rotation);
	if (obj.scale != undefined) _o.scale.apply(_o, obj.scale);
	if (obj.origin != undefined) _o.origin.apply(_o, obj.origin);
	if (obj.visibility != undefined) _o.visibility.apply(_o, obj.visibility);
	if (obj.material != undefined) _o.material.apply(_o, obj.material);
	if (obj.filter != undefined) _o.filter.apply(_o, obj.filter);
	if (obj.name != undefined) _o.name.apply(_o, [obj.name]);
	if (obj.id != undefined) _o.id.apply(_o, [obj.id]);
	if (obj.class != undefined) _o.class.apply(_o, [obj.class]);

	_o.update();

	if (obj.children) {
		for (var i = 0, _len = obj.children.length; i < _len; i++) {
			var _obj = obj.children[i];
			var _o2 = createObj(_obj);
			_o.addChild(_o2);
		}
	}

	return _o;
}

C3D.create = function (obj) {
	var _obj;
	switch (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) {
		case 'array':
			_obj = { type: 'sprite', children: obj };
			break;
		case 'object':
			_obj = obj;
			break;
		default:
			return;
	}

	return createObj(_obj);
};

exports.default = C3D;
exports.C3D = C3D;

/***/ }),

/***/ "./src/loading/body.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var bodyStr = exports.bodyStr = "\n<div class=\"loading-wrap\" id=\"loading_wrap\">\n    <div class=\"wrapper\" id=\"wrap\">\n        <div class=\"wrap-box\">\n            <div class=\"wave-svg-shape\">\n                <svg class=\"wave-svg\" xmlns=\"http://www.w3.org/2000/svg\"\n                     id=\"738255fe-a9fa-4a5e-963a-8e97f59370ad\" data-name=\"3-waves\"\n                     viewBox=\"0 0 600 215.43\">\n                    <path class=\"871c1787-a7ef-4a54-ad03-3cd50e05767a\"\n                          d=\"M639,986.07c-17-1-27.33-.33-40.5,2.67s-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S456,987.07,439,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S256,987.07,239,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06v205.06h600V996S656,987.07,639,986.07Z\"\n                          transform=\"translate(-36 -985)\"></path>\n                </svg>\n            </div>\n            <div class=\"wave-svg-shape\">\n                <svg class=\"wave-svg wave-2\" xmlns=\"http://www.w3.org/2000/svg\"\n                     id=\"738255fe-a9fa-4a5e-963a-8e97f59370ad\" data-name=\"3-waves\"\n                     viewBox=\"0 0 600 215.43\">\n                    <path class=\"871c1787-a7ef-4a54-ad03-3cd50e05767a\"\n                          d=\"M639,986.07c-17-1-27.33-.33-40.5,2.67s-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S456,987.07,439,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S256,987.07,239,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06v205.06h600V996S656,987.07,639,986.07Z\"\n                          transform=\"translate(-96 -990)\"></path>\n                </svg>\n            </div>\n        </div>\n    </div>\n    <!--<div class=\"m-center-text\" id=\"text\">0%</div>-->\n</div>\n<div class=\"mask\" id=\"loading_mask\">\n    <span id=\"text\"></span>\n</div>\n";

/***/ }),

/***/ "./src/loading/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initLoading = initLoading;

var _loadImageBlob = __webpack_require__("./src/utils/loadImageBlob.js");

var _loadCss = __webpack_require__("./src/utils/loadCss.js");

var _video = __webpack_require__("./src/loading/video.js");

var _progress = __webpack_require__("./src/loading/progress.js");

var _loadImages = __webpack_require__("./src/loading/loadImages.js");

var _body = __webpack_require__("./src/loading/body.js");

//var loading = _.throttle(loadingFunc, 100);

function requestImage(url, cb) {
	setTimeout(function () {
		var img = new Image();
		if (cb) {
			img.onload = cb;
		}
		img.src = url;
	}, 0);
}

function preloadLoadingPageImages(loadImages) {
	var len = 2;
	var loaded = 0;
	var cb = function cb() {
		loaded++;
		if (loaded >= len) {
			setTimeout(function () {
				//document.body.className += ' show';
				document.body.style.opacity = '1';
				loadImages();
			}, 1000);
		}
	};
	(0, _loadImageBlob.imageBlob)('/images/loading/mask.png', cb);
	(0, _loadImageBlob.imageBlob)('/images/loading/bg.png', cb);
}

function initLoading() {
	window.addEventListener('touchstart', function (ev) {
		ev.preventDefault();
	});
	document.body.style.opacity = '0';
	document.body.className = 'loading-body';
	document.body.innerHTML = _body.bodyStr;

	var loading = (0, _progress.loadingFunc)();
	var loadVideo = (0, _video.loadVideoFunc)(loading);
	var loadImages = (0, _loadImages.loadImagesFunc)(loading, loadVideo);
	(0, _loadCss.loadCss)('/css/loading.css', function () {
		preloadLoadingPageImages(loadImages);
	});
}

/***/ }),

/***/ "./src/loading/loadImages.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadImagesFunc = undefined;

var _loadImageBlob = __webpack_require__("./src/utils/loadImageBlob.js");

var _config = __webpack_require__("./src/stage/scene/drops/config.js");

var loadImagesFunc = exports.loadImagesFunc = function loadImagesFunc(loading, loadVideo) {
	return function () {
		var images = _.range(0, 20).map(function (x) {
			return '/images/stage/skybox/' + x + '.jpg';
		}).concat(_config.rainDrops.map(function (x) {
			return '/images/stage/drops/' + x.file + '.png';
		})).concat(['/images/ball/ball.png', '/images/ball/ball_fg.png', '/images/ball/ball_bg.png']);
		var len = images.length;
		var loaded = 0;
		var cb = function cb() {
			loaded++;
			loading(50 * loaded / len);
			if (loaded >= len) {
				loadVideo('/media/v.mp4');
			}
		};
		images.forEach(function (url, i) {
			var s = setTimeout(function () {
				(0, _loadImageBlob.imageBlob)(url, cb);
				clearTimeout(s);
			}, i * 100);
		});
	};
};

/***/ }),

/***/ "./src/loading/progress.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadingFunc = loadingFunc;
function loadingFunc() {
	var wrap = document.getElementById('wrap');

	var text = document.getElementById('text');
	var hasLoading = false;
	return function (percent) {
		console.log(percent);
		if (!hasLoading) {
			wrap.classList.add('loading');
			hasLoading = true;
		}
		wrap.style.transform = 'translateY(' + (-70 + 420 * (100 - percent) / 100) + 'px)';
		if (percent >= 100) {
			wrap.className += ' stop';
			text.innerHTML = '轻触以继续';
		} else {
			text.innerHTML = percent < 10 ? 0 + '' + percent.toFixed(2) + '%' : percent.toFixed(2) + '%';
		}
	};
}

/***/ }),

/***/ "./src/loading/video.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
function hideBg() {
	document.body.removeChild(document.getElementById('loading_wrap'));
	document.body.removeChild(document.getElementById('loading_mask'));
}

function showVideo(src) {
	var played = false;
	var video = document.createElement('video');
	video.setAttribute('playsinline', 'true');
	video.setAttribute('width', window.innerWidth);
	video.setAttribute('height', window.innerHeight);
	document.body.appendChild(video);

	var doPlayVideo = function doPlayVideo() {
		if (!played) {
			hideBg();
			video.classList.add('playing');
			video.play();
			played = true;
		}
	};
	var playVideo = function playVideo() {
		if (window.WeixinJSBridge) {
			WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
				doPlayVideo();
			}, false);
			document.addEventListener("WeixinJSBridgeReady", function () {
				WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
					doPlayVideo();
				});
			}, false);
		} else {
			doPlayVideo();
		}
	};

	video.addEventListener('canplay', playVideo);
	video.addEventListener('touchstart', playVideo);
	video.onended = function () {
		video.classList.add('playing');
		$(window).trigger('ball_show');
	};
	video.src = src;
	video.load();
	playVideo();
}

var loadVideoFunc = exports.loadVideoFunc = function loadVideoFunc(loading) {
	return function (src) {
		var req = new XMLHttpRequest();
		req.open('GET', src, true);
		req.responseType = 'blob';
		req.onprogress = function (progressEvent) {
			var progress = 0.5 + 0.5 * (progressEvent.loaded / progressEvent.total);
			loading(progress * 100);
		};
		req.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				var videoBlob = this.response;
				var url = (URL || webkitURL).createObjectURL(videoBlob); // IE10+
				showVideo(url);
			}
		};
		req.send();
	};
};

/***/ }),

/***/ "./src/main.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stage = __webpack_require__("./src/stage/index.js");

var _ball = __webpack_require__("./src/ball/index.js");

var _loading = __webpack_require__("./src/loading/index.js");

$(window).on('stage_show', function () {
	(0, _stage.init)();
});
$(window).on('ball_show', function () {
	(0, _ball.initBall)();
});
$(window).on('loading_show', function () {
	(0, _loading.initLoading)();
});

function match(str) {
	if (window.location.pathname.indexOf(str) > -1) {
		$(window).trigger(str + '_show');
	}
}
match('loading');
match('ball');
match('stage');

/***/ }),

/***/ "./src/stage/binding.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.bindEvents = bindEvents;
document.body.addEventListener('touchstart', function (ev) {
	ev && ev.preventDefault();
});
function bindEvents(stage) {
	document.body.onscroll = function (ev) {
		ev.preventDefault();
	};
	document.body.addEventListener('textmenu', function (ev) {
		ev.preventDefault();
	});
	document.getElementById('main').appendChild(stage.el);
	var resize = function resize() {
		stage.size(window.innerWidth, window.innerHeight).update();
	};
	window.onresize = function () {
		resize();
	};
	resize();
}

/***/ }),

/***/ "./src/stage/body.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var bodyStr = exports.bodyStr = "<div id=\"main\"></div>\n\t<div id=\"loading-text\">\u52A0\u8F7D\u8D44\u6E90\u4E2D...</div>\n";

/***/ }),

/***/ "./src/stage/dialog/Player/iOSLoad.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.iOSLoad = iOSLoad;

var _state = __webpack_require__("./src/state.js");

var _Visualizer = __webpack_require__("./src/stage/dialog/Visualizer.js");

var touchingCls = 'm-btn-touching';

var source = void 0;

function iOSLoad(btn, src) {
	var $btn = $(btn);
	$btn.css('display', 'none');
	(0, _state.getState)().audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var xhr = new XMLHttpRequest();
	xhr.open('GET', src, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function () {
		var responseBuffer = xhr.response;
		$btn.css('display', 'block');
		(0, _state.getState)().audioCtx.decodeAudioData(responseBuffer, function (buffer) {
			afterLoad(buffer, $btn);
		});
	};
	xhr.send();
}

function firstPlay(buffer) {
	source = (0, _state.getState)().audioCtx.createBufferSource();
	source.buffer = buffer;
	source.connect((0, _state.getState)().audioCtx.destination);
	source.loop = true;
	if (!source.start) {
		source.start = source.noteOn; //in old browsers use noteOn method
		source.stop = source.noteOff; //in old browsers use noteOn method
	}
	source.start(0);
	(0, _state.getState)().paused = false;
	new _Visualizer.Visualizer().init((0, _state.getState)().audioCtx, source);
	source.onended = function () {};
}

function afterLoad(buffer, $btn) {
	//firstPlay(buffer);
	var ontouchstart = function ontouchstart($btn, btn) {
		return function (ev) {

			ev.preventDefault();
			$btn.addClass(touchingCls);
			btn.touching = true;

			setTimeout(function () {
				if (btn.touching) {
					btn.touching = false;
					$btn.removeClass(touchingCls);
				}
			}, 500);
		};
	};

	var ontouchend = function ontouchend($btn, btn) {
		return function (ev) {
			ev && ev.preventDefault();
			if (!source) {
				firstPlay(buffer);
			} else {
				if ((0, _state.getState)().paused) {
					source.context.resume();
				} else {
					source.context.suspend();
				}
				(0, _state.getState)().paused = !(0, _state.getState)().paused;
			}
			$btn.toggleClass('m-pause-btn');
		};
	};

	$btn.on('touchstart', ontouchstart($btn, $btn.get(0)));
	$btn.on('touchend', ontouchend($btn, $btn.get(0)));
}

/***/ }),

/***/ "./src/stage/dialog/Player/load.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.load = load;

var _state = __webpack_require__("./src/state.js");

var _Visualizer = __webpack_require__("./src/stage/dialog/Visualizer.js");

function load(btn, src) {
	var touchingCls = 'm-btn-touching';
	(0, _state.getState)().audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var source = void 0;
	var gainNode = void 0;
	var myAudio = createAudio(src);
	var $btn = $(btn);

	function firstPlay() {
		source = (0, _state.getState)().audioCtx.createMediaElementSource(myAudio);
		gainNode = (0, _state.getState)().audioCtx.createGain();
		source.connect(gainNode);
		gainNode.connect((0, _state.getState)().audioCtx.destination);

		new _Visualizer.Visualizer().init((0, _state.getState)().audioCtx, source);
	}

	btn.ontouchstart = function (ev) {
		ev.preventDefault();
		$btn.addClass(touchingCls);
		btn.touching = true;

		setTimeout(function () {
			if (btn.touching) {
				btn.touching = false;
				$btn.removeClass(touchingCls);
			}
		}, 700);
	};

	btn.ontouchend = function (ev) {
		ev && ev.preventDefault();
		if (!source) {
			firstPlay();
		}
		myAudio.paused ? myAudio.play() : myAudio.pause();
		(0, _state.getState)().paused = myAudio.paused;
		$btn.toggleClass('m-pause-btn');
	};

	myAudio.onended = function () {
		$btn && $btn.addClass('m-pause-btn');
		(0, _state.getState)().paused = true;
	};

	myAudio.addEventListener('canplaythrough', function () {
		//myAudio.play();
		if (!source && !myAudio.paused) {
			firstPlay();
			//paused = false;
		}
	}, false);
	myAudio.load();
}

function createAudio(src) {
	var audio = document.createElement('audio');
	audio.setAttribute('loop', 'true');
	var sourceNode = document.createElement('source');
	sourceNode.setAttribute('src', src);
	audio.appendChild(sourceNode);
	document.body.appendChild(audio);

	//add event
	audio.volume = 1;
	return audio;
}

/***/ }),

/***/ "./src/stage/dialog/Visualizer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Visualizer = undefined;

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _state = __webpack_require__("./src/state.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

CanvasRenderingContext2D.prototype.drawRoundRect = function (x, y, w, h, r) {
	if (w < 2 * r) {
		r = w / 2;
	}
	if (h < 2 * r) {
		r = h / 2;
	}
	this.beginPath();
	this.moveTo(x + r, y);
	this.arcTo(x + w, y, x + w, y + h, r);
	this.arcTo(x + w, y + h, x, y + h, r);
	this.arcTo(x, y + h, x, y, r);
	this.arcTo(x, y, x + w, y, r);
	this.fill();
	this.closePath();
	return this;
};
var ctx = void 0;

var Visualizer = exports.Visualizer = function () {
	function Visualizer() {
		(0, _classCallCheck3.default)(this, Visualizer);
		this.file = null;
		this.fileName = null;
		this.audioContext = null;
		this.source = null;
		this.forceStop = false;
	}

	(0, _createClass3.default)(Visualizer, [{
		key: 'init',
		value: function init(ctx, source) {
			this.prepareAPI(ctx);
			this.start(ctx, source);
		}
	}, {
		key: 'prepareAPI',
		value: function prepareAPI(ctx) {
			//fix browser vender for AudioContext and requestAnimationFrame
			window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
			try {
				this.audioContext = ctx;
			} catch (e) {
				console.log(e);
			}
		}
	}, {
		key: 'start',
		value: function start(ctx, source) {
			//read and decode the file into audio array buffer
			this.visualize(ctx, source);
		}
	}, {
		key: 'visualize',
		value: function visualize(audioContext, source, buffer) {
			var analyser = audioContext.createAnalyser();
			//connect the source to the analyser
			source.connect(analyser);
			//connect the analyser to the destination(the speaker), or we won't hear the sound
			analyser.connect(audioContext.destination);

			//stop the previous sound if any
			if (this.source !== null) {
				this.forceStop = true;
				this.source.stop(0);
			}
			this.source = source;
			this.drawSpectrum(analyser);
		}
	}, {
		key: 'drawSpectrum',
		value: function drawSpectrum(analyser) {

			var canvas = document.getElementById('canvas'),
			    h = canvas.height,
			    cwidth = canvas.width,
			    cheight = canvas.height - 20,
			    center_y = canvas.height / 2,
			    meterWidth = 4 * 2,
			    //width of the meters in the spectrum
			gap = 10 * 2,
			    //gap between meters
			capHeight = 20,
			    leftPadding = 26 * 2,
			    capStyle = '#fff',
			    meterNum = 200 / (10 + 2),
			    //count of the meters
			capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
			ctx = canvas.getContext('2d');
			ctx.fillStyle = '#fff';
			var last = Date.now();
			var audio = document.querySelector('audio');
			var drawMeter = function drawMeter() {
				//到达频率 并且未暂停
				if (Date.now() - last >= 100 && !(0, _state.getState)().paused) {
					last = Date.now();

					var arr = new Uint8Array(analyser.frequencyBinCount);
					analyser.getByteTimeDomainData(arr);
					var step = Math.round(arr.length / meterNum); //sample limited data from the total array
					ctx.clearRect(0, 0, cwidth, h);
					for (var i = 0; i < meterNum; i++) {
						var value = Math.pow(arr[i * step] / 200, 2) * cheight;
						ctx.fillRect(leftPadding + i * (meterWidth + gap), center_y - value / 2 /*2 is the gap between meter and cap*/, meterWidth, value); //the meter
					}
				}
				requestAnimationFrame(drawMeter);
			};
			drawMeter();
		}
	}]);
	return Visualizer;
}();

/***/ }),

/***/ "./src/stage/dialog/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.showDialog = undefined;

var _template = __webpack_require__("./src/stage/dialog/template.js");

var _Visualizer = __webpack_require__("./src/stage/dialog/Visualizer.js");

var _state = __webpack_require__("./src/state.js");

var _load = __webpack_require__("./src/stage/dialog/Player/load.js");

var _iOSLoad = __webpack_require__("./src/stage/dialog/Player/iOSLoad.js");

var _dropTypes = __webpack_require__("./src/stage/scene/drops/dropTypes.js");

var source = null;
var audioBuffer = null;
var state = (0, _state.getState)();
var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var loadFunc = isiOS ? _iOSLoad.iOSLoad : _load.load;

function clearContext() {
	state.audioCtx && state.audioCtx.close().then(function () {
		state.paused = true;
		source = null;
		state.audioCtx = null;
		audioBuffer = null;
	});
	source && source.context.close().then(function () {
		state.paused = true;
		source = null;
		state.audioCtx = null;
		audioBuffer = null;
	});
}

function insertDialog(index) {
	var data = _dropTypes.rainDrops[index];

	var domString = _.template(_template.templateStr)({
		index: index,
		audio: '',
		position: data.position,
		content: data.content,
		user: data.user,
		time: data.time
	});
	$(document.body).append(domString);
}

function showShare(ev) {
	ev && ev.preventDefault();
	var div = document.createElement('div');

	div.className = 'g-share-tip';
	document.body.appendChild(div);

	div.addEventListener('touchstart', function (ev) {
		ev.preventDefault();
	});
	div.addEventListener('touchend', hideShare);
}

function hideShare() {
	var div = document.getElementsByClassName('g-share-tip')[0];
	if (div) {
		div.parentNode.removeChild(div);
	}
}

var showDialog = exports.showDialog = function () {
	var haveOpening = false;

	return function (i, me) {
		if (haveOpening) {
			return;
		}
		insertDialog(i);

		var el = $('#dialog_' + i),
		    content = $('.m-dialog-content-text', el),
		    closeBtn = $('.m-close-btn', el);
		var showQR = false;
		var top = content.get(0).offsetTop,
		    maxHeight = 430 - top - 10;
		content.css('height', maxHeight + 'px').css('overflow', 'auto');
		var btn = $('.m-play-btn', el).get(0),
		    qrBtn = $('.m-share-qr-btn', el);
		$('.m-share-tip-btn', el).on('touchstart', showShare);

		qrBtn.on('touchstart', function (ev) {
			$('.m-qr-block', el).addClass('show');
			showQR = true;
		});

		closeBtn.on('touchstart', function (ev) {
			ev && ev.preventDefault();
			if (showQR) {
				showQR = false;
				$('.m-qr-block', el).removeClass('show');
			} else {
				clearContext();
				me && (me.lockMove = false);
				haveOpening = false;
				el.removeClass('show');
				el.remove();
			}
		});
		if (haveOpening) {
			return;
		}
		//el.on('touchstart',function(ev){
		var content_el = content.get(0);
		content.on('touchstart', function (ev) {
			ev.preventDefault();
			content.lastY = ev.touches[0].pageY;
			console.log(content.lastY);
		});
		content.on('touchmove', function (ev) {
			ev.stopPropagation();
			var deltaY = ev.touches[0].pageY - content.lastY;
			content.lastY += deltaY;
			content_el.scrollTop -= deltaY;
		});
		content.on('touchend', function (ev) {
			ev.stopPropagation();
		});
		el.addClass('show');
		me && (me.lockMove = true);
		loadFunc(btn, '/media/3185.wav');
		haveOpening = true;
	};
}();

/***/ }),

/***/ "./src/stage/dialog/template.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var templateStr = exports.templateStr = "<div class=\"g-dialog-mask\" id=\"dialog_<%=index%>\">\n        <div class=\"g-dialog show\">\n            <div class=\"m-dialog-head\">\n                <canvas class=\"m-wave-bg\" id=\"canvas\" height=\"270\" width=\"600\"></canvas>\n                <div class=\"m-play-btn\"></div>\n            </div>\n            <div class=\"m-dialog-content\">\n                <div class=\"m-dialog-title break\">\n                    <span class=\"m-user\">@<%- user %></span>\n                    <span class=\"m-time\"><%= time %></span>\n                </div>\n                <div class=\"m-dialog-music-title\"> <%= position %></div>\n                <div class=\"m-dialog-content-text\">\n                    <%- content %>\n                </div>\n\n            </div>\n            <div class=\"m-dialog-footer\">\n                <button type=\"button\" class=\"m-share-tip-btn\"><span>\u5206\u4EAB\u7ED9\u670B\u53CB</span></button>\n                <button type=\"button\" class=\"m-share-qr-btn\"><span>\u8D21\u732E\u6211\u7684\u96E8\u58F0</span></button>\n            </div>\n            <div class=\"m-qr-block\">\n                <img src=\"/images/dialog/qr_img.jpg\" alt=\"\u65B0\u4E16\u76F8\" class=\"m-qr-image\"/>\n            </div>\n            <div class=\"m-close-btn\"></div>\n        </div>\n        <div class=\"m-share-tip\"></div>\n    </div>\n";

/***/ }),

/***/ "./src/stage/generateStyle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.generateStyle = generateStyle;

var _config = __webpack_require__("./src/stage/scene/drops/config.js");

function ran() {
	return Math.floor(Math.random() * 15 - 5);
}

function getAnimation(x) {
	var arr = ['0% {  transform: translate(0%, 0%) scale(1) }'];
	for (var i = 2; i <= 10; i += 2) {
		arr.push(i * 10 + '% { transform: translate(' + ran() + '%,' + ran() + '%) scale(' + (Math.random() * 0.15 + 0.925) + ')}');
	}
	var str = arr.join('\n');
	return '@keyframes waterFlow' + x + '{\n ' + str + ' \n }';
}

function generateStyle() {
	var styleSheet = document.createElement('style');
	var i = 0;
	var arr = [];
	while (i < 32) {
		arr.push('.m-rain-drop.anim_' + i + ':before {opacity: 1; transform: translate(0,0) skew(0,0); animation: waterFlow' + i + ' ' + (5 + Math.random() * 5 + 0.5) + 's ' + (Math.random() + 0.5) + 's linear infinite alternate; }');
		arr.push(getAnimation(i));
		i++;
	}
	styleSheet.innerHTML = arr.join('\n');
	document.head.appendChild(styleSheet);
	addDropStyles();
}

function addDropStyles() {
	var styleSheet = document.createElement('style');
	styleSheet.innerHTML = _config.dropTypes.map(function (type, i) {
		type = 'bigdrop' + Math.floor(Math.random() * 2.999);
		return '.drop' + i + ':before { background-image: url("/images/stage/drops/' + type + '.png")}\n\t\t .drop' + i + ':after { background-image: url("/images/stage/drops/' + type + '.png")}';
	}).join('\n');
	document.head.appendChild(styleSheet);
}

/***/ }),

/***/ "./src/stage/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.init = init;

var _load = __webpack_require__("./src/stage/load.js");

var _generateStyle = __webpack_require__("./src/stage/generateStyle.js");

var _scene = __webpack_require__("./src/stage/scene/index.js");

var _body = __webpack_require__("./src/stage/body.js");

var _loadCss = __webpack_require__("./src/utils/loadCss.js");

function init() {
	document.body.className = 'stage-body';
	document.body.innerHTML = _body.bodyStr;
	(0, _generateStyle.generateStyle)();
	(0, _loadCss.loadCss)('/css/stage.css', function () {
		(0, _loadCss.loadCss)('/css/dialog.css', function () {
			//loading();
			(0, _scene.initScene)();
		});
	});
}

/***/ }),

/***/ "./src/stage/load.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loading = loading;

var _dropTypes = __webpack_require__("./src/stage/scene/drops/dropTypes.js");

var _config = __webpack_require__("./src/stage/scene/skybox/config.js");

function loading(run) {
	var len = _dropTypes.dropTypes.length + _config.skyBgData.length + 3;
	var loaded = 0;
	var wrap = document.getElementById('loading-text');
	var loadCb = function loadCb(url) {
		loaded++;
		wrap.innerHTML = '\u52A0\u8F7D\u8D44\u6E90\u4E2D: ' + (100 * loaded / len).toFixed(2) + '%';
		if (loaded === len) {
			wrap.innerHTML = '全部加载完成...<br/>场景渲染中，请稍候';
			run();
		}
	};
	_dropTypes.dropTypes.forEach(function (type) {
		load('/images/stage/drops/' + type + '.png', loadCb);
	});
	_config.skyBgData.forEach(function (x) {
		load(x.url, loadCb);
	});
	load('/images/stage/drops/bigdrop0.png', loadCb);
	load('/images/stage/drops/bigdrop1.png', loadCb);
	load('/images/stage/drops/bigdrop2.png', loadCb);
}

function load(imgURL, cb) {
	var image = new Image();
	image.onload = cb.bind(null, imgURL);
	image.src = imgURL;
}

/***/ }),

/***/ "./src/stage/scene/Controller.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Controller = undefined;

var _classCallCheck2 = __webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _RAF = __webpack_require__("./src/utils/RAF.js");

var _common = __webpack_require__("./src/stage/scene/common.js");

var _state = __webpack_require__("./src/state.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controller = exports.Controller = function () {
	function Controller() {
		(0, _classCallCheck3.default)(this, Controller);
		this.originTouchPos = {
			x: 0,
			y: 0
		};
		this.oldTouchPos = {
			x: 0,
			y: 0
		};
		this.newTouchPos = {
			x: 0,
			y: 0
		};
		this.d = {
			lat: 0,
			lon: 0
		};
		this.c = {
			lat: 0,
			lon: 0
		};
		this.f = {
			lat: 0,
			lon: 0
		};
		this.firstDir = '';
		this.req = null;
		this.originTime = 0;
		this.oldTime = 0;
		this.newTime = 0;
		this.dx = 0;
		this.dy = 0;
		this.ax = 0;
		this.ay = 0;
		this.time = 0;
		this.stage = null;

		return this;
	}

	(0, _createClass3.default)(Controller, [{
		key: 'init',
		value: function init(stage, drops) {
			var _this = this;

			this.stage = stage;
			this.drops = drops;
			this.onTouchStart = this.onTouchStart.bind(this);
			this.onTouchMove = this.onTouchMove.bind(this);
			this.onTouchEnd = this.onTouchEnd.bind(this);
			this.stage.on('touchstart', this.onTouchStart, true);
			this.reqRotate();

			var g = new Orienter({
				onOrient: function onOrient(t) {
					if (_this.stage.lockMove) return 1;
					_this.d.lat = t.lat;
					_this.d.lon = -t.lon;
				}
			});
			g.init();
			return this;
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.stage.off('touchstart', this.onTouchStart);
			this.stage.off('touchmove', this.onTouchMove);
			this.stage.off('touchend', this.onTouchEnd);
		}
	}, {
		key: 'onTouchStart',
		value: function onTouchStart(_e) {
			_e.preventDefault();
			this.firstDir = '';
			var e = _e.changedTouches[0];
			if (this.stage.lockMove) return 1;
			this.originTouchPos.x = this.oldTouchPos.x = this.newTouchPos.x = e.clientX;
			this.originTouchPos.y = this.oldTouchPos.y = this.newTouchPos.y = e.clientY;
			this.originTime = this.oldTime = this.newTime = Date.now();
			this.dx = this.dy = this.ax = this.ay = 0;

			this.stage.on('touchmove', this.onTouchMove);
			this.stage.on('touchend', this.onTouchEnd, true);

			(0, _state.getState)().touching = true;
			//			console.log('start');
		}
	}, {
		key: 'onTouchMove',
		value: function onTouchMove(e) {
			e.preventDefault();
			if (this.stage.lockMove) return 1;

			e = e.changedTouches[0];

			this.newTouchPos.x = e.clientX;
			this.newTouchPos.y = e.clientY;
			this.newTime = Date.now();
			this.checkGesture();
			this.oldTouchPos.x = this.newTouchPos.x;
			this.oldTouchPos.y = this.newTouchPos.y;
			this.oldTime = this.newTime;
		}
	}, {
		key: 'onTouchEnd',
		value: function onTouchEnd() {
			this.newTime = Date.now();
			var t = (this.newTime - this.oldTime) / 1000;
			(0, _state.getState)().touching = false;
			this.stage.off('touchmove', this.onTouchMove);
			this.stage.off('touchend', this.onTouchEnd);
		}
	}, {
		key: 'checkGesture',
		value: function checkGesture() {
			if (this.stage.lockMove) return 1;
			this.dx = this.fixed2(this.newTouchPos.x - this.originTouchPos.x);
			this.dy = this.fixed2(this.newTouchPos.y - this.originTouchPos.y);
			this.ax = this.fixed2(this.newTouchPos.x - this.oldTouchPos.x);
			this.ay = this.fixed2(this.newTouchPos.y - this.oldTouchPos.y);
			this.time = (this.newTime - this.oldTime) / 1000;
			if (this.firstDir === '') {
				this.firstDir = Math.abs(this.ax) > Math.abs(this.ay) ? 'x' : 'y';
			}
			var data = {
				dx: this.dx,
				dy: this.dy,
				ax: this.ax,
				ay: this.ay,
				dir: this.firstDir
			};
			this.computedMove(data);
		}
	}, {
		key: 'fixed2',
		value: function fixed2(t) {
			return Math.floor(100 * t) / 100;
		}
	}, {
		key: 'computedMove',
		value: function computedMove(t) {
			this.c.lon = (this.c.lon - .2 * t.ax) % 360;
			this.c.lat = Math.max(-90, Math.min(90, this.c.lat + .2 * t.ay));
		}
	}, {
		key: 'reqRotate',
		value: function reqRotate() {
			this.req = (0, _RAF.RAF)(this.reqRotate.bind(this));
			if (!this.stage.lockMove) {

				var t = (this.d.lon + this.f.lon + this.c.lon) % 360;
				var i = 0.35 * (this.d.lat + this.f.lat + this.c.lat);

				if (t - this.stage.rotationY > 180) {
					this.stage.rotationY += 360;
				}

				if (t - this.stage.rotationY < -180) {
					this.stage.rotationY -= 360;
				}

				var n = t - this.stage.rotationY,
				    a = i - this.stage.rotationX;

				this.stage.rotationY = Math.abs(n) < 0.1 ? t : this.stage.rotationY + .3 * n;
				this.stage.rotationX = Math.abs(a) < 0.1 ? i : this.stage.rotationX + .15 * a;

				var s = _common.BASE_Z - 2 * Math.abs(n);
				this.stage.z += .3 * (s - this.stage.z);

				this.stage.updateT();
				(0, _common.syncStage)(this.stage, this.drops);
			}
		}
	}]);
	return Controller;
}();

/***/ }),

/***/ "./src/stage/scene/common.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _syncStages = __webpack_require__("./src/stage/scene/syncStages.js");

Object.defineProperty(exports, 'syncStage', {
  enumerable: true,
  get: function get() {
    return _syncStages.syncStage;
  }
});
var BASE_Z = exports.BASE_Z = -300;

/***/ }),

/***/ "./src/stage/scene/drops/config.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dropTypes = __webpack_require__("./src/stage/scene/drops/dropTypes.js");

Object.defineProperty(exports, 'dropTypes', {
	enumerable: true,
	get: function get() {
		return _dropTypes.dropTypes;
	}
});
Object.defineProperty(exports, 'rainDrops', {
	enumerable: true,
	get: function get() {
		return _dropTypes.rainDrops;
	}
});
var R = exports.R = 400;
var DROP_SIZE = exports.DROP_SIZE = 1 * (100 / 2);
var DROP_HEIGHT = exports.DROP_HEIGHT = 1 * (283 / 4);
//		sp.position(0, 0, 0).update();
//		s.addChild(sp);
var DROP_NUMBER = exports.DROP_NUMBER = 31;
//只是根据图量出来的，没有具体意义
var ALL_WIDTH = exports.ALL_WIDTH = 226 * 5;
var GROUP_WIDTH = exports.GROUP_WIDTH = 226 * 2;
var ANCHORS = exports.ANCHORS = [[32, -R * 0.25, 1], [58, 0, 0.85], [96, -R * 0.14, 1.2], [139, -R * 0.4, 1], [168, R * 0.15, 1], [193, -R * 0.32, 0.7], [226, -R * 0.15, 1], [32 + 226, -R * 0.25, 1], [58 + 226, 0, 0.85], [96 + 226, -R * 0.14, 1.2], [139 + 226, -R * 0.4, 1], [168 + 226, R * 0.15, 1], [193 + 226, -R * 0.32, 0.7]];

/***/ }),

/***/ "./src/stage/scene/drops/dropTypes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var rainDrops = exports.rainDrops = [{
	file: '美国',
	user: '哄咩',
	position: '美国宾夕法尼亚州-State College',
	time: '2014.5.21',
	content: '记得是暑期学期刚开始的一天，傍晚，我一个人在公交车站亭等40分钟来一趟且习惯性晚点的公交车，雨突然下得很大，但是亭子把雨挡得很严实。躲在亭子里听着雨声就突然觉得周围的世界静得让人很安心。'
}, {
	file: '意大利',
	user: 'Echo',
	position: '意大利拉斯佩齐亚开往威尼斯的途中',
	time: '2017年夏',
	content: '这是四个大人与一个孩子的旅行，自驾途中遇上暴雨夹带冰雹，大人更多担心，孩子更多兴奋，大人被孩子的情绪所感染。那一路还有很多奇遇，在威尼斯黑云压境，太阳雨，镶有金边的乌云，午夜还车等等，听着雨声，不禁想起途中的经历，想起面对这些出其不意的情况时我们的情绪和状态，这些情绪和状态里写着我们曾经的成长故事。旅行之于我的意义就在这些途中奇遇，经历的这些事，让我看到更真实的自己，更深刻地认识自己，反省自己，完善自己。'
}, {
	file: '缅甸',
	user: '民辅',
	position: '缅甸曼德勒',
	time: '2017.8.6 凌晨2：56',
	content: '已经不知道连续加了多少天班了 偶尔有雨声来作伴到也显得不那么孤单 画图狗的悲哀...'
}, {
	file: '加蓬',
	user: 'Sahara',
	position: '加蓬利伯维尔',
	time: '2017.8.5',
	content: '北京时间8月6日，一年前的今天，也有一场大雨，我和前男友在雨中拥吻，那是初吻的记忆。'
}, {
	file: '瑞典',
	user: 'yuki',
	position: '瑞典斯德哥尔摩',
	time: '2017.8.6',
	content: '讲真我并不是一个多喜欢雨的人，然而下雨的中午总是让人很想睡一个长长的午觉，在雨天呆在室内也让人很是舒服。瑞典的彩虹游行昨天刚结束，雨声让昨天的热闹归于平静，在这个雨天里，希望每个相爱的人都终成眷属 愿世界都能被善意与温柔相待。'
}, {
	file: '日本',
	user: '海边的卡夫卡卡卡卡卡',
	position: '日本神户',
	time: '2017.8.7',
	content: '立秋·雨<br/>立秋的雨水真是来得勤快啊！我一个激灵翻身起床拿起资料开始备注今天要消化的学习内容。与雨为伴的也许还有台风君！不知道他会不会来……整个城市像笼罩着一层轻烟。'
}, {
	file: '哥斯达黎加',
	user: '凌嫣',
	position: '哥斯达黎加圣克鲁斯',
	time: '2017.8.6',
	content: '这场关于雨的录音征集开始时，我刚好在圣克鲁斯参加国际志愿者的海龟保护活动。每天傍晚到深夜，一定会暴雨。听听异国他乡的雨声，有不同吗？'
}, {
	file: '英国',
	user: '＼(^o^)／ 悦己',
	position: '英国德比郡查茨沃斯庄园',
	time: '2017.8.8',
	content: '我在英国。那个拍傲慢与偏见的庄园。带着苗，在英国度假。苗13岁。'
}, {
	file: '泰国',
	user: '不歸',
	position: '泰国普吉岛',
	time: '2017.8.9',
	content: '无事。暴雨忽降，从酒店阳台望出是寥落的行人和昏黄的灯光。旁边坐着一个即将离开不知归期的男生。会想念异国的这一刻静默。“寒蝉凄切”。X&R。'
}, {
	file: '韩国',
	user: '洋葱卿',
	position: '韩国京畿道',
	time: '2017.8.15',
	content: '在答辩前夜下的一场大雨，本来紧张和焦虑得没有入睡感，却听着这大雨声，车来车往的溅水声，屋檐的滴答声，让我的心平静了许多~尽力而为！'
}, {
	file: '三潭映月',
	user: '蔓延',
	position: '浙江杭州西湖区西溪',
	time: '2017.8.8',
	content: '这是杭州久违的一场暴雨，我是早上在公交车上看到新世相的雨声博物馆，突然很想听周杰伦的《听见下雨的声音》，想着如果杭州来得及下雨的话我一定录一段下来，然后循环了一整天。<br/>没想到晚上就下雨了，还是一场好大的暴雨，借着陌生人的好意撑伞回家，来不及把包放下就到窗边录下了60秒的雨声，伴着惊雷，就这样在我的小出租房里，一个人靠着窗边，听雨，听雷。突然控制不住的想起了前任，那是唯一一次也是最后一次，挽着他的手臂，撑着我的大黑伞，一起去吃了重庆小面。'
}, {
	file: '孔子',
	user: '子非鱼',
	position: '山东德州',
	time: '2017.08.12',
	content: '下午忽然下了雷阵雨，先是闷声的雷，之后雨点从天掉落，噼里啪啦，如大珠小珠落玉盘。站在院子里，风雨尚未取走夏日的灼灼暑气。敲在红色砖石上沉郁地响，打在碧绿的叶子上清脆地响，黄色的丝瓜花被吹掉几朵，跌落在湿漉漉的地面上，屋檐上的雨水串成了珠子，唤醒泥土中沉睡的灵魂。雨与音乐，这是我最爱的两样。希望这雨能下的更久一些吧。'
}, {
	file: '中俄边境石',
	user: 'Lee',
	position: '黑龙江黑河市大黑河岛边',
	time: '2016年8月',
	content: '眼前是俄罗斯颜色鲜艳的高楼，背后是大黑河岛森林公园的围栏。我坐在黑龙江边突出的河堤台阶上，看着江水稍有波澜的向东流，看着天上的白云一点点变大变暗，直到下起小雨。我听着江水声风雨声，在江边呆坐了一整个下午。8月的东北已有些凉意，当时我正处在两份工作的间隔期，一身轻松，背起包一口气跑到边境，什么都不用想，就这样静静地享受雨声带来的平静。'
}, {
	file: '鸟巢',
	user: '贾一凡',
	position: '北京街头',
	time: '2016.7.20夜',
	content: '因为要准备考试，复习到很晚。一个人在雨中往回去的方向走，这时候看到路灯下美妙的一幕，像花丝绽放，像流星穿越，那么安静而有节奏，就像一场奇异的哑剧。车辆驶过带来的嘈杂虽然影响了一下。但是穿过了喧嚣，这场专属于雨滴的灯光秀，显然更有魅力了。 <br/>毋庸置疑，好的事情总会到来。而当它来晚时，也不失为一个惊喜。'
}, {
	file: '地王大厦',
	user: '小和尚',
	position: '深圳凤凰山',
	time: '2016.4.4',
	content: '刚翻到手机的一段录音，时隔一年多，当时的情景依然没忘记，应该是周末的某天下午，狂风大作，暴雨顷刻而至，趴在阳台上录制了这段雨声，现在想来，当时必然满心欢喜的。'
}, {
	file: '少林寺',
	user: '﹎M!ss.Mango.',
	position: '河南郑州',
	time: '2017.8 立秋',
	content: '立秋的雨，今天也是周一，心情有点糟糕，下定决心结束现在的生活状态，换一种自己愉快的生活方式，无论太阳是否灿烂，不要让自己过得不开心。雨声有一种让人平静的力量。听到大家的雨声，开心多了，即使前进的道路上布满荆棘，也要勇敢向着自己的目的地前进。如果屏幕前的你也看到，记得开心哦～'
}, {
	file: '板鸭',
	user: 'Hiker',
	position: '江苏南京龙王山下',
	time: '2017.07.10',
	content: '那天是刚刚过去的这个学期里在校的最后一天，做完社会实践，下了我在南京见过的比较大也可能是最大的雨，我和宿舍里还在的一个舍友收拾东西准备离校，有人跟舍友表白，她没有答应。十分喜欢这场大雨，凌晨录的，很久不熬夜但那天大家都没睡，早晨起来的时候要赶早班车的舍友已经回家了。我在离校前帮她把一大纸箱东西寄回了家，然后把留了两年的及腰的头发剪去了不是很多但足以有所改变的三十公分。'
}, {
	file: '宏村',
	user: '遇见',
	position: '安徽合肥',
	time: '2017.7.9晚',
	content: '7.9凌晨两点，喜欢的男孩约我出去，其实脚受伤了，真疼啊，但心里却暗暗希望时间过得慢些再慢些，这条路永远不要走到头。然后一天都在下暴雨，晚上拖着病脚躺在床上，外面雨声很大，房间很安静，想到他，又甜蜜又心酸。'
}, {
	file: '七星湾',
	user: '氵氵氵',
	position: '台湾花莲七星湾',
	time: '2017.3',
	content: '我们去花莲七星潭那天，又大风又下雨，被风刮到说不出话，推小车卖小吃的老板和我们说了好多，不记得了，只记得人很好，吃了个炸弹葱油饼，然后被袭来的浪吓到，现在录音里都是尖叫声。那是在台湾旅行的倒数第二天。'
}, {
	file: '风',
	user: '豆豆皮皮',
	position: '浙江东极岛',
	time: '2017.7',
	content: '这不是一场雨，是一场风，来自东极岛东福山，呼呼的风声。一个人站在山顶，太平洋的风儿刮向我，美极了。'
}, {
	file: '草原',
	user: 'Misscloudby',
	position: '内蒙宁夏交界通湖草原',
	time: '2017.8.6',
	content: '雨声来自从通湖草原回家的路上。<br/>突发感情问题。和好朋友在前一天晚上九点半本来说去KTV或者Club嗨，结果一言不合直奔大草原。凌晨12点半出发一路抹黑，4点半开到通湖草原。看到美丽的草原日出，一切都是那么fresh。回程路上的过路雨很急，洗涤着大地。感恩，愿一切安好。'
}, {
	file: '火锅',
	user: '未雪',
	position: '重庆',
	time: '2017年夏',
	content: '一段四年的感情，挣扎、痛苦，终于下定决心划清界限。人生低谷，每天都昏天暗地，刚实习完，还要为工作担忧，甚至不知道自己活下去的意义。就是那么一天夜晚，下了很大的雷雨，到处打不到车，朋友没有带伞，我去轻轨站接她。雷声和雨声快要把我们淹没，比起往日的车马喧嚣，反倒觉得宁静起来。我们两个都淋了一场痛快的大雨，回家换上短裤和人字拖，顶着湿漉漉的头发在楼下的小店喝酒撸串，心里的阴霾都烟消云散。雨声总是能带给人藉慰，仿佛在寒凉中生出一种暖意。给人重新开始的理由。'
}, {
	file: '九仙山',
	user: '.',
	position: '九仙山',
	time: '2017.8',
	content: '到这里4个月了，从开始的慌乱到现在的驾轻就熟，这个过程中放弃了一些，但是也一直在坚持着。希望以后安好。'
}, {
	file: '热干面',
	user: ' Apple-green',
	position: '湖北武汉华中科技大学',
	time: '2017.8.12',
	content: '雨里的电动车在大雨中狂叫 《一程山路》笑着你也笑着我 你离开时雨声哭得很大很响 夜里思念悠长如寂寞的雨巷'
}, {
	file: '滕王阁',
	user: '邱邱',
	position: '江西南昌高速',
	time: '2017.8.13',
	content: '高速六车追尾，大堵'
}, {
	file: '大理三塔',
	user: 'Acute.魔王阿亮',
	position: '云南大理苍山洱海旁',
	time: '2017.8.15',
	content: '在北京听着雨声觉得宁静安详，回到家乡，听着雨声却是浓浓的思念，雨声影响的心境，竟因在谁身旁。'
}, {
	file: '新疆花帽',
	user: '碧海蓝天',
	position: '新疆乌鲁木齐',
	time: '2017.8.6 凌晨1点半',
	content: '看到关于收集雨声的图文推送，刚好外面在下雨，就是这么巧，我就在窗边路了一段。<br/>我最难忘的和雨有关的事，就是大学时，和宿舍的人共打一把伞，穿着凉拖，在大雨中向教室走去，简单而快乐。'
}, {
	file: '小笼汤包',
	user: '懒 懒',
	position: '江苏无锡',
	time: '2017立秋',
	content: '在立秋这天，看到新世相关于秋天的推文，决定辞掉一份不适合自己的工作！晚上打雷下雨，没带伞躲在屋檐下，给同城的男朋友发消息，他明知道生理期，还回复我说：夏天没关系的，凉爽！坐在地铁里瑟瑟发抖的时候才确定，他是真的不爱我不在乎我啊！失业的同时我失恋了！'
}, {
	file: '东方明珠',
	user: '周娟',
	position: '上海浦东新区',
	time: '2017.8.8',
	content: '在上海浦东新区他新租的房子里，他在上班，我上午把房子里里外外打扫了一遍，累瘫在床上，一觉醒来，发现外面大雨。于是很兴奋录了下来，今天是我们在一起5周年的日子，异地了5年，现在终于在一个城市了。'
}, {
	file: '透明',
	user: '我',
	position: '',
	time: '',
	content: ''
}];
var dropTypes = exports.dropTypes = rainDrops.map(function (x) {
	return x.file;
});
/*
{
	file: '',
		user: '',
	position: '',
	time: '',
	content: ''
},
*/

/***/ }),

/***/ "./src/stage/scene/drops/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addDrops = addDrops;
exports.onDropTouchEnd = onDropTouchEnd;

var _css3dEngine = __webpack_require__("./src/lib/css3d-engine.js");

var _config = __webpack_require__("./src/stage/scene/drops/config.js");

var _dialog = __webpack_require__("./src/stage/dialog/index.js");

function addDrops(skyBox) {
	var sprite = new _css3dEngine.C3D.Sprite();
	var l = _config.ANCHORS.length;
	//创建20个平面放入容器，并定义鼠标事件
	for (var i = 0; i < _config.DROP_NUMBER; i++) {
		var imageURL = 'drops/' + _config.dropTypes[i] + '.png';
		var offsetX = Math.floor(i / l) * _config.GROUP_WIDTH + _config.ANCHORS[i % l][0];
		var alpha = offsetX / _config.ALL_WIDTH;
		var theta = offsetX / _config.ALL_WIDTH * 2 * Math.PI;
		var plane = new _css3dEngine.C3D.Plane();
		var dy = _config.ANCHORS[i % l][1];
		var scale = _config.ANCHORS[i % l][2];
		plane.size(_config.DROP_SIZE * scale, _config.DROP_HEIGHT * scale).position(Math.sin(theta) * _config.R, dy - _config.R * 0.15, -Math.cos(theta) * _config.R).rotation(0, -alpha * 360, 0).buttonMode(true).class('m-rain-drop ' + 'drop' + i + ' anim_' + i).update();
		sprite.addChild(plane);
		plane.on('touchstart', function (ev) {
			ev.preventDefault();
			var el = this.le.el;
			el.classList.add('hovering');
			setTimeout(function () {
				el.classList.remove('hovering');
			}, 1000);
		});
		plane.on('touchend', onDropTouchEnd(i, skyBox));
	}
	return sprite;
}

function onDropTouchEnd(i, pano) {
	return function () {
		this.le.el.classList.add('visited');
		(0, _dialog.showDialog)(i, pano);
	};
}

/***/ }),

/***/ "./src/stage/scene/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initScene = initScene;

var _css3dEngine = __webpack_require__("./src/lib/css3d-engine.js");

var _skybox = __webpack_require__("./src/stage/scene/skybox/index.js");

var _drops = __webpack_require__("./src/stage/scene/drops/index.js");

var _binding = __webpack_require__("./src/stage/binding.js");

var _common = __webpack_require__("./src/stage/scene/common.js");

var _RAF = __webpack_require__("./src/utils/RAF.js");

var _Controller = __webpack_require__("./src/stage/scene/Controller.js");

function initScene() {
	setTimeout(function () {
		document.getElementById('loading-text').style.opacity = '0';
	}, 1000);
	setTimeout(function () {
		document.getElementById('loading-text').style.display = 'none';
		initStage();
	}, 2000);
}
function initStage() {
	var stage = new _css3dEngine.C3D.Stage();
	stage.size(window.innerWidth, window.innerHeight).update();

	var controller = new _Controller.Controller();
	var skyBox = (0, _skybox.createSkyBox)();
	var drops = (0, _drops.addDrops)(skyBox);

	skyBox.position(0, 0, 0).updateT();
	drops.position(0, 0, 0).updateT();
	stage.addChild(skyBox);
	stage.addChild(drops);
	(0, _binding.bindEvents)(stage);

	drops.on('touchstart', function (ev) {
		ev.preventDefault();
		controller.onTouchStart.call(controller, ev);
	}, true);
	drops.on('touchmove', function (ev) {
		ev.preventDefault();
		controller.onTouchMove.call(controller, ev);
	});
	drops.on('touchend', function (ev) {
		ev.preventDefault();
		controller.onTouchEnd.call(controller, ev);
	});
	controller.init(skyBox, drops);
}

/***/ }),

/***/ "./src/stage/scene/skybox/config.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
var skyBgData = exports.skyBgData = arr.map(function (i) {
  return { url: "/images/stage/skybox/" + i + ".jpg" };
});

var skyRect = exports.skyRect = { w: 128 * 20, h: 1170 * 0.6 };

/***/ }),

/***/ "./src/stage/scene/skybox/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createSkyBox = createSkyBox;

var _css3dEngine = __webpack_require__("./src/lib/css3d-engine.js");

var _config = __webpack_require__("./src/stage/scene/skybox/config.js");

function createSkyBox() {
	var _len = _config.skyBgData.length;
	var step = _config.skyRect.w / _len;
	var _radius = Math.floor(step / 2 / Math.tan(Math.PI / _len)) - 1;

	var sprite = new _css3dEngine.C3D.Sprite();
	for (var i = 0; i < _len; i++) {
		var r = 360 / _len * i;
		var alpha = Math.PI * 2 / _len * i;

		var plan = new _css3dEngine.C3D.Plane();

		plan.size(step, _config.skyRect.h, 0).position(Math.sin(alpha) * _radius, 0, -Math.cos(alpha) * _radius).rotation(0, -r, 0).material({ image: _config.skyBgData[i].url, repeat: 'no-repeat', bothsides: false }).class('m-sky-pano').update();

		sprite.addChild(plan);
	}
	var bottomPlane = new _css3dEngine.C3D.Plane();
	var topPlane = new _css3dEngine.C3D.Plane();

	topPlane.size(_radius * 2, _radius * 2, 0).position(0, -_config.skyRect.h / 2, 0).rotation(90, 0, 0).class('m-top').update();

	bottomPlane.size(_radius * 2, _radius * 2, 0).position(0, _config.skyRect.h / 2, 0).rotation(90, 0, 0).class('m-bottom').update();

	sprite.addChild(topPlane);
	sprite.addChild(bottomPlane);

	return sprite;
}

/***/ }),

/***/ "./src/stage/scene/syncStages.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.syncStage = syncStage;
var syncKeys = ['rotationY', 'rotationY', 'rotationY', 'x', 'y'];

function syncStage0(rate, from, to) {
	if (rate > 1) {
		syncKeys.forEach(function (k) {
			to[k] = from[k] * rate;
		});
	} else if (rate < 1) {
		syncKeys.forEach(function (k) {
			to[k] += (from[k] - to[k]) * rate;
		});
	}
	to.updateT();
}

function syncStage(from, to) {
	to.rotationX = from.rotationX;
	to.rotationY = from.rotationY;
	to.rotationZ = from.rotationZ;
	to.x = from.x;
	to.y = from.y;
	to.z = from.z;
	to.updateT();
}

/***/ }),

/***/ "./src/state.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getState = getState;
var state = {
	touching: false,
	audioContext: null,
	paused: true
};
var wrap = {
	inner: state
};
function getState() {
	return wrap.inner;
}

/***/ }),

/***/ "./src/utils/RAF.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var RAF = exports.RAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
	setTimeout(callback, 1000 / 60);
};

/***/ }),

/***/ "./src/utils/loadCss.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadCss = loadCss;
function loadCss(href, cb) {
	if ($('head link[href="' + href + '"]').length === 0) {
		var link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = href;
		document.getElementsByTagName('head')[0].appendChild(link);
		CSSloaded(link, cb)();
	} else {
		cb && cb();
	}
}

function CSSloaded(link, cb) {
	var cssLoaded = false;
	var ret = function ret() {
		try {
			if (link.sheet && link.sheet.cssRules.length > 0) {
				cssLoaded = true;
			} else if (link.styleSheet && link.styleSheet.cssText.length > 0) {
				cssLoaded = true;
			} else if (link.innerHTML && link.innerHTML.length > 0) {
				cssLoaded = true;
			}
		} catch (ex) {}
		if (cssLoaded) {
			cb && cb();
		} else {
			setTimeout(function () {
				ret();
			}, 32);
		}
	};
	return ret;
}

/***/ }),

/***/ "./src/utils/loadImageBlob.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.imageURL = exports.imageBlob = undefined;

var _regenerator = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__("./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var imageBlob = exports.imageBlob = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, cb) {
		var _ref2, ok, blob;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return loadXHR(url);

					case 2:
						_ref2 = _context.sent;
						ok = _ref2.ok;
						blob = _ref2.blob;

						if (ok) {
							cb(blob);
						}

					case 6:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function imageBlob(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var imageURL = exports.imageURL = function () {
	var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url) {
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						return _context2.abrupt('return', loadedUrl[url]);

					case 1:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function imageURL(_x3) {
		return _ref3.apply(this, arguments);
	};
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadedUrl = {};
window.loadedUrl = loadedUrl;
function loadXHR(url) {
	return new _promise2.default(function (resolve, reject) {
		if (url in loadedUrl) {
			resolve(loadedUrl[url]);
		} else {
			try {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);
				xhr.responseType = 'blob';
				xhr.onerror = function () {
					reject({ ok: false });
				};
				xhr.onload = function () {
					if (xhr.status < 400 && xhr.status >= 200) {
						var newURL = (URL || webkitURL).createObjectURL(xhr.response);
						loadedUrl[url] = newURL;
						resolve({ ok: true, blob: newURL });
					} else {
						reject({ ok: false });
					}
				};
				xhr.send();
			} catch (err) {
				reject({ ok: false });
			}
		}
	});
}

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map