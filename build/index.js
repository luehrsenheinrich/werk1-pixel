/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "8885564-" + chunkId + "-wps-hmr.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "8885564-wps-hmr.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "1a31b232a65f335ecf87";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
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
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
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
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
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
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
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
/******/ 			var chunkId = "index";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
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
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
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
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
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
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
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
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
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
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"];

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@pixi/app/dist/esm/app.js":
/*!************************************************!*\
  !*** ./node_modules/@pixi/app/dist/esm/app.js ***!
  \************************************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var _pixi_display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pixi/display */ "./node_modules/@pixi/display/dist/esm/display.js");
/* harmony import */ var _pixi_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pixi/core */ "./node_modules/@pixi/core/dist/esm/core.js");
/*!
 * @pixi/app - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:17:46 UTC
 *
 * @pixi/app is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */



/**
 * Convenience class to create a new PIXI application.
 *
 * This class automatically creates the renderer, ticker and root container.
 *
 * @example
 * // Create the application
 * const app = new PIXI.Application();
 *
 * // Add the view to the DOM
 * document.body.appendChild(app.view);
 *
 * // ex, add display objects
 * app.stage.addChild(PIXI.Sprite.from('something.png'));
 *
 * @class
 * @memberof PIXI
 */
var Application = /** @class */ (function () {
    /**
     * @param {object} [options] - The optional renderer parameters.
     * @param {boolean} [options.autoStart=true] - Automatically starts the rendering after the construction.
     *     **Note**: Setting this parameter to false does NOT stop the shared ticker even if you set
     *     options.sharedTicker to true in case that it is already started. Stop it by your own.
     * @param {number} [options.width=800] - The width of the renderers view.
     * @param {number} [options.height=600] - The height of the renderers view.
     * @param {HTMLCanvasElement} [options.view] - The canvas to use as a view, optional.
     * @param {boolean} [options.useContextAlpha=true] - Pass-through value for canvas' context `alpha` property.
     *   If you want to set transparency, please use `backgroundAlpha`. This option is for cases where the
     *   canvas needs to be opaque, possibly for performance reasons on some older devices.
     * @param {boolean} [options.autoDensity=false] - Resizes renderer view in CSS pixels to allow for
     *   resolutions other than 1.
     * @param {boolean} [options.antialias=false] - Sets antialias
     * @param {boolean} [options.preserveDrawingBuffer=false] - Enables drawing buffer preservation, enable this if you
     *  need to call toDataUrl on the WebGL context.
     * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer, retina would be 2.
     * @param {boolean} [options.forceCanvas=false] - prevents selection of WebGL renderer, even if such is present, this
     *   option only is available when using **pixi.js-legacy** or **@pixi/canvas-renderer** modules, otherwise
     *   it is ignored.
     * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
     *  (shown if not transparent).
     * @param {number} [options.backgroundAlpha=1] - Value from 0 (fully transparent) to 1 (fully opaque).
     * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
     *   not before the new render pass.
     * @param {string} [options.powerPreference] - Parameter passed to webgl context, set to "high-performance"
     *  for devices with dual graphics card. **(WebGL only)**.
     * @param {boolean} [options.sharedTicker=false] - `true` to use PIXI.Ticker.shared, `false` to create new ticker.
     *  If set to false, you cannot register a handler to occur before anything that runs on the shared ticker.
     *  The system ticker will always run before both the shared ticker and the app ticker.
     * @param {boolean} [options.sharedLoader=false] - `true` to use PIXI.Loader.shared, `false` to create new Loader.
     * @param {Window|HTMLElement} [options.resizeTo] - Element to automatically resize stage to.
     */
    function Application(options) {
        var _this = this;
        /**
         * The root display container that's rendered.
         * @member {PIXI.Container}
         */
        this.stage = new _pixi_display__WEBPACK_IMPORTED_MODULE_0__["Container"]();
        // The default options
        options = Object.assign({
            forceCanvas: false,
        }, options);
        this.renderer = Object(_pixi_core__WEBPACK_IMPORTED_MODULE_1__["autoDetectRenderer"])(options);
        // install plugins here
        Application._plugins.forEach(function (plugin) {
            plugin.init.call(_this, options);
        });
    }
    /**
     * Register a middleware plugin for the application
     * @static
     * @param {PIXI.IApplicationPlugin} plugin - Plugin being installed
     */
    Application.registerPlugin = function (plugin) {
        Application._plugins.push(plugin);
    };
    /**
     * Render the current stage.
     */
    Application.prototype.render = function () {
        this.renderer.render(this.stage);
    };
    Object.defineProperty(Application.prototype, "view", {
        /**
         * Reference to the renderer's canvas element.
         * @member {HTMLCanvasElement}
         * @readonly
         */
        get: function () {
            return this.renderer.view;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Application.prototype, "screen", {
        /**
         * Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.
         * @member {PIXI.Rectangle}
         * @readonly
         */
        get: function () {
            return this.renderer.screen;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Destroy and don't use after this.
     * @param {Boolean} [removeView=false] - Automatically remove canvas from DOM.
     * @param {object|boolean} [stageOptions] - Options parameter. A boolean will act as if all options
     *  have been set to that value
     * @param {boolean} [stageOptions.children=false] - if set to true, all the children will have their destroy
     *  method called as well. 'stageOptions' will be passed on to those calls.
     * @param {boolean} [stageOptions.texture=false] - Only used for child Sprites if stageOptions.children is set
     *  to true. Should it destroy the texture of the child sprite
     * @param {boolean} [stageOptions.baseTexture=false] - Only used for child Sprites if stageOptions.children is set
     *  to true. Should it destroy the base texture of the child sprite
     */
    Application.prototype.destroy = function (removeView, stageOptions) {
        var _this = this;
        // Destroy plugins in the opposite order
        // which they were constructed
        var plugins = Application._plugins.slice(0);
        plugins.reverse();
        plugins.forEach(function (plugin) {
            plugin.destroy.call(_this);
        });
        this.stage.destroy(stageOptions);
        this.stage = null;
        this.renderer.destroy(removeView);
        this.renderer = null;
    };
    /** Collection of installed plugins. */
    Application._plugins = [];
    return Application;
}());

/**
 * Middleware for for Application's resize functionality
 * @private
 * @class
 */
var ResizePlugin = /** @class */ (function () {
    function ResizePlugin() {
    }
    /**
     * Initialize the plugin with scope of application instance
     * @static
     * @private
     * @param {object} [options] - See application options
     */
    ResizePlugin.init = function (options) {
        var _this = this;
        Object.defineProperty(this, 'resizeTo', 
        /**
         * The HTML element or window to automatically resize the
         * renderer's view element to match width and height.
         * @member {Window|HTMLElement}
         * @name resizeTo
         * @memberof PIXI.Application#
         */
        {
            set: function (dom) {
                self.removeEventListener('resize', this.queueResize);
                this._resizeTo = dom;
                if (dom) {
                    self.addEventListener('resize', this.queueResize);
                    this.resize();
                }
            },
            get: function () {
                return this._resizeTo;
            },
        });
        /**
         * Resize is throttled, so it's safe to call this multiple times per frame and it'll
         * only be called once.
         *
         * @memberof PIXI.Application#
         * @method queueResize
         * @private
         */
        this.queueResize = function () {
            if (!_this._resizeTo) {
                return;
            }
            _this.cancelResize();
            // // Throttle resize events per raf
            _this._resizeId = requestAnimationFrame(function () { return _this.resize(); });
        };
        /**
         * Cancel the resize queue.
         *
         * @memberof PIXI.Application#
         * @method cancelResize
         * @private
         */
        this.cancelResize = function () {
            if (_this._resizeId) {
                cancelAnimationFrame(_this._resizeId);
                _this._resizeId = null;
            }
        };
        /**
         * Execute an immediate resize on the renderer, this is not
         * throttled and can be expensive to call many times in a row.
         * Will resize only if `resizeTo` property is set.
         *
         * @memberof PIXI.Application#
         * @method resize
         */
        this.resize = function () {
            if (!_this._resizeTo) {
                return;
            }
            // clear queue resize
            _this.cancelResize();
            var width;
            var height;
            // Resize to the window
            if (_this._resizeTo === self) {
                width = self.innerWidth;
                height = self.innerHeight;
            }
            // Resize to other HTML entities
            else {
                var _a = _this._resizeTo, clientWidth = _a.clientWidth, clientHeight = _a.clientHeight;
                width = clientWidth;
                height = clientHeight;
            }
            _this.renderer.resize(width, height);
        };
        // On resize
        this._resizeId = null;
        this._resizeTo = null;
        this.resizeTo = options.resizeTo || null;
    };
    /**
     * Clean up the ticker, scoped to application
     *
     * @static
     * @private
     */
    ResizePlugin.destroy = function () {
        self.removeEventListener('resize', this.queueResize);
        this.cancelResize();
        this.cancelResize = null;
        this.queueResize = null;
        this.resizeTo = null;
        this.resize = null;
    };
    return ResizePlugin;
}());

Application.registerPlugin(ResizePlugin);


//# sourceMappingURL=app.js.map


/***/ }),

/***/ "./node_modules/@pixi/constants/dist/esm/constants.js":
/*!************************************************************!*\
  !*** ./node_modules/@pixi/constants/dist/esm/constants.js ***!
  \************************************************************/
/*! exports provided: ALPHA_MODES, BLEND_MODES, BUFFER_BITS, CLEAR_MODES, DRAW_MODES, ENV, FORMATS, GC_MODES, MASK_TYPES, MIPMAP_MODES, MSAA_QUALITY, PRECISION, RENDERER_TYPE, SCALE_MODES, TARGETS, TYPES, WRAP_MODES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALPHA_MODES", function() { return ALPHA_MODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLEND_MODES", function() { return BLEND_MODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUFFER_BITS", function() { return BUFFER_BITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_MODES", function() { return CLEAR_MODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAW_MODES", function() { return DRAW_MODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENV", function() { return ENV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORMATS", function() { return FORMATS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GC_MODES", function() { return GC_MODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MASK_TYPES", function() { return MASK_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIPMAP_MODES", function() { return MIPMAP_MODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MSAA_QUALITY", function() { return MSAA_QUALITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRECISION", function() { return PRECISION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RENDERER_TYPE", function() { return RENDERER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCALE_MODES", function() { return SCALE_MODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TARGETS", function() { return TARGETS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WRAP_MODES", function() { return WRAP_MODES; });
/*!
 * @pixi/constants - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:17:46 UTC
 *
 * @pixi/constants is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/**
 * Different types of environments for WebGL.
 *
 * @static
 * @memberof PIXI
 * @name ENV
 * @enum {number}
 * @property {number} WEBGL_LEGACY - Used for older v1 WebGL devices. PixiJS will aim to ensure compatibility
 *  with older / less advanced devices. If you experience unexplained flickering prefer this environment.
 * @property {number} WEBGL - Version 1 of WebGL
 * @property {number} WEBGL2 - Version 2 of WebGL
 */
var ENV;
(function (ENV) {
    ENV[ENV["WEBGL_LEGACY"] = 0] = "WEBGL_LEGACY";
    ENV[ENV["WEBGL"] = 1] = "WEBGL";
    ENV[ENV["WEBGL2"] = 2] = "WEBGL2";
})(ENV || (ENV = {}));
/**
 * Constant to identify the Renderer Type.
 *
 * @static
 * @memberof PIXI
 * @name RENDERER_TYPE
 * @enum {number}
 * @property {number} UNKNOWN - Unknown render type.
 * @property {number} WEBGL - WebGL render type.
 * @property {number} CANVAS - Canvas render type.
 */
var RENDERER_TYPE;
(function (RENDERER_TYPE) {
    RENDERER_TYPE[RENDERER_TYPE["UNKNOWN"] = 0] = "UNKNOWN";
    RENDERER_TYPE[RENDERER_TYPE["WEBGL"] = 1] = "WEBGL";
    RENDERER_TYPE[RENDERER_TYPE["CANVAS"] = 2] = "CANVAS";
})(RENDERER_TYPE || (RENDERER_TYPE = {}));
/**
 * Bitwise OR of masks that indicate the buffers to be cleared.
 *
 * @static
 * @memberof PIXI
 * @name BUFFER_BITS
 * @enum {number}
 * @property {number} COLOR - Indicates the buffers currently enabled for color writing.
 * @property {number} DEPTH - Indicates the depth buffer.
 * @property {number} STENCIL - Indicates the stencil buffer.
 */
var BUFFER_BITS;
(function (BUFFER_BITS) {
    BUFFER_BITS[BUFFER_BITS["COLOR"] = 16384] = "COLOR";
    BUFFER_BITS[BUFFER_BITS["DEPTH"] = 256] = "DEPTH";
    BUFFER_BITS[BUFFER_BITS["STENCIL"] = 1024] = "STENCIL";
})(BUFFER_BITS || (BUFFER_BITS = {}));
/**
 * Various blend modes supported by PIXI.
 *
 * IMPORTANT - The WebGL renderer only supports the NORMAL, ADD, MULTIPLY and SCREEN blend modes.
 * Anything else will silently act like NORMAL.
 *
 * @memberof PIXI
 * @name BLEND_MODES
 * @enum {number}
 * @property {number} NORMAL
 * @property {number} ADD
 * @property {number} MULTIPLY
 * @property {number} SCREEN
 * @property {number} OVERLAY
 * @property {number} DARKEN
 * @property {number} LIGHTEN
 * @property {number} COLOR_DODGE
 * @property {number} COLOR_BURN
 * @property {number} HARD_LIGHT
 * @property {number} SOFT_LIGHT
 * @property {number} DIFFERENCE
 * @property {number} EXCLUSION
 * @property {number} HUE
 * @property {number} SATURATION
 * @property {number} COLOR
 * @property {number} LUMINOSITY
 * @property {number} NORMAL_NPM
 * @property {number} ADD_NPM
 * @property {number} SCREEN_NPM
 * @property {number} NONE
 * @property {number} SRC_IN
 * @property {number} SRC_OUT
 * @property {number} SRC_ATOP
 * @property {number} DST_OVER
 * @property {number} DST_IN
 * @property {number} DST_OUT
 * @property {number} DST_ATOP
 * @property {number} SUBTRACT
 * @property {number} SRC_OVER
 * @property {number} ERASE
 * @property {number} XOR
 */
var BLEND_MODES;
(function (BLEND_MODES) {
    BLEND_MODES[BLEND_MODES["NORMAL"] = 0] = "NORMAL";
    BLEND_MODES[BLEND_MODES["ADD"] = 1] = "ADD";
    BLEND_MODES[BLEND_MODES["MULTIPLY"] = 2] = "MULTIPLY";
    BLEND_MODES[BLEND_MODES["SCREEN"] = 3] = "SCREEN";
    BLEND_MODES[BLEND_MODES["OVERLAY"] = 4] = "OVERLAY";
    BLEND_MODES[BLEND_MODES["DARKEN"] = 5] = "DARKEN";
    BLEND_MODES[BLEND_MODES["LIGHTEN"] = 6] = "LIGHTEN";
    BLEND_MODES[BLEND_MODES["COLOR_DODGE"] = 7] = "COLOR_DODGE";
    BLEND_MODES[BLEND_MODES["COLOR_BURN"] = 8] = "COLOR_BURN";
    BLEND_MODES[BLEND_MODES["HARD_LIGHT"] = 9] = "HARD_LIGHT";
    BLEND_MODES[BLEND_MODES["SOFT_LIGHT"] = 10] = "SOFT_LIGHT";
    BLEND_MODES[BLEND_MODES["DIFFERENCE"] = 11] = "DIFFERENCE";
    BLEND_MODES[BLEND_MODES["EXCLUSION"] = 12] = "EXCLUSION";
    BLEND_MODES[BLEND_MODES["HUE"] = 13] = "HUE";
    BLEND_MODES[BLEND_MODES["SATURATION"] = 14] = "SATURATION";
    BLEND_MODES[BLEND_MODES["COLOR"] = 15] = "COLOR";
    BLEND_MODES[BLEND_MODES["LUMINOSITY"] = 16] = "LUMINOSITY";
    BLEND_MODES[BLEND_MODES["NORMAL_NPM"] = 17] = "NORMAL_NPM";
    BLEND_MODES[BLEND_MODES["ADD_NPM"] = 18] = "ADD_NPM";
    BLEND_MODES[BLEND_MODES["SCREEN_NPM"] = 19] = "SCREEN_NPM";
    BLEND_MODES[BLEND_MODES["NONE"] = 20] = "NONE";
    BLEND_MODES[BLEND_MODES["SRC_OVER"] = 0] = "SRC_OVER";
    BLEND_MODES[BLEND_MODES["SRC_IN"] = 21] = "SRC_IN";
    BLEND_MODES[BLEND_MODES["SRC_OUT"] = 22] = "SRC_OUT";
    BLEND_MODES[BLEND_MODES["SRC_ATOP"] = 23] = "SRC_ATOP";
    BLEND_MODES[BLEND_MODES["DST_OVER"] = 24] = "DST_OVER";
    BLEND_MODES[BLEND_MODES["DST_IN"] = 25] = "DST_IN";
    BLEND_MODES[BLEND_MODES["DST_OUT"] = 26] = "DST_OUT";
    BLEND_MODES[BLEND_MODES["DST_ATOP"] = 27] = "DST_ATOP";
    BLEND_MODES[BLEND_MODES["ERASE"] = 26] = "ERASE";
    BLEND_MODES[BLEND_MODES["SUBTRACT"] = 28] = "SUBTRACT";
    BLEND_MODES[BLEND_MODES["XOR"] = 29] = "XOR";
})(BLEND_MODES || (BLEND_MODES = {}));
/**
 * Various webgl draw modes. These can be used to specify which GL drawMode to use
 * under certain situations and renderers.
 *
 * @memberof PIXI
 * @static
 * @name DRAW_MODES
 * @enum {number}
 * @property {number} POINTS
 * @property {number} LINES
 * @property {number} LINE_LOOP
 * @property {number} LINE_STRIP
 * @property {number} TRIANGLES
 * @property {number} TRIANGLE_STRIP
 * @property {number} TRIANGLE_FAN
 */
var DRAW_MODES;
(function (DRAW_MODES) {
    DRAW_MODES[DRAW_MODES["POINTS"] = 0] = "POINTS";
    DRAW_MODES[DRAW_MODES["LINES"] = 1] = "LINES";
    DRAW_MODES[DRAW_MODES["LINE_LOOP"] = 2] = "LINE_LOOP";
    DRAW_MODES[DRAW_MODES["LINE_STRIP"] = 3] = "LINE_STRIP";
    DRAW_MODES[DRAW_MODES["TRIANGLES"] = 4] = "TRIANGLES";
    DRAW_MODES[DRAW_MODES["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
    DRAW_MODES[DRAW_MODES["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
})(DRAW_MODES || (DRAW_MODES = {}));
/**
 * Various GL texture/resources formats.
 *
 * @memberof PIXI
 * @static
 * @name FORMATS
 * @enum {number}
 * @property {number} RGBA=6408
 * @property {number} RGB=6407
 * @property {number} ALPHA=6406
 * @property {number} LUMINANCE=6409
 * @property {number} LUMINANCE_ALPHA=6410
 * @property {number} DEPTH_COMPONENT=6402
 * @property {number} DEPTH_STENCIL=34041
 */
var FORMATS;
(function (FORMATS) {
    FORMATS[FORMATS["RGBA"] = 6408] = "RGBA";
    FORMATS[FORMATS["RGB"] = 6407] = "RGB";
    FORMATS[FORMATS["ALPHA"] = 6406] = "ALPHA";
    FORMATS[FORMATS["LUMINANCE"] = 6409] = "LUMINANCE";
    FORMATS[FORMATS["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
    FORMATS[FORMATS["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
    FORMATS[FORMATS["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
})(FORMATS || (FORMATS = {}));
/**
 * Various GL target types.
 *
 * @memberof PIXI
 * @static
 * @name TARGETS
 * @enum {number}
 * @property {number} TEXTURE_2D=3553
 * @property {number} TEXTURE_CUBE_MAP=34067
 * @property {number} TEXTURE_2D_ARRAY=35866
 * @property {number} TEXTURE_CUBE_MAP_POSITIVE_X=34069
 * @property {number} TEXTURE_CUBE_MAP_NEGATIVE_X=34070
 * @property {number} TEXTURE_CUBE_MAP_POSITIVE_Y=34071
 * @property {number} TEXTURE_CUBE_MAP_NEGATIVE_Y=34072
 * @property {number} TEXTURE_CUBE_MAP_POSITIVE_Z=34073
 * @property {number} TEXTURE_CUBE_MAP_NEGATIVE_Z=34074
 */
var TARGETS;
(function (TARGETS) {
    TARGETS[TARGETS["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
    TARGETS[TARGETS["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
    TARGETS[TARGETS["TEXTURE_2D_ARRAY"] = 35866] = "TEXTURE_2D_ARRAY";
    TARGETS[TARGETS["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
    TARGETS[TARGETS["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
    TARGETS[TARGETS["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
    TARGETS[TARGETS["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
    TARGETS[TARGETS["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
    TARGETS[TARGETS["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(TARGETS || (TARGETS = {}));
/**
 * Various GL data format types.
 *
 * @memberof PIXI
 * @static
 * @name TYPES
 * @enum {number}
 * @property {number} UNSIGNED_BYTE=5121
 * @property {number} UNSIGNED_SHORT=5123
 * @property {number} UNSIGNED_SHORT_5_6_5=33635
 * @property {number} UNSIGNED_SHORT_4_4_4_4=32819
 * @property {number} UNSIGNED_SHORT_5_5_5_1=32820
 * @property {number} FLOAT=5126
 * @property {number} HALF_FLOAT=36193
 */
var TYPES;
(function (TYPES) {
    TYPES[TYPES["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    TYPES[TYPES["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    TYPES[TYPES["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
    TYPES[TYPES["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
    TYPES[TYPES["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
    TYPES[TYPES["FLOAT"] = 5126] = "FLOAT";
    TYPES[TYPES["HALF_FLOAT"] = 36193] = "HALF_FLOAT";
})(TYPES || (TYPES = {}));
/**
 * The scale modes that are supported by pixi.
 *
 * The {@link PIXI.settings.SCALE_MODE} scale mode affects the default scaling mode of future operations.
 * It can be re-assigned to either LINEAR or NEAREST, depending upon suitability.
 *
 * @memberof PIXI
 * @static
 * @name SCALE_MODES
 * @enum {number}
 * @property {number} LINEAR Smooth scaling
 * @property {number} NEAREST Pixelating scaling
 */
var SCALE_MODES;
(function (SCALE_MODES) {
    SCALE_MODES[SCALE_MODES["NEAREST"] = 0] = "NEAREST";
    SCALE_MODES[SCALE_MODES["LINEAR"] = 1] = "LINEAR";
})(SCALE_MODES || (SCALE_MODES = {}));
/**
 * The wrap modes that are supported by pixi.
 *
 * The {@link PIXI.settings.WRAP_MODE} wrap mode affects the default wrapping mode of future operations.
 * It can be re-assigned to either CLAMP or REPEAT, depending upon suitability.
 * If the texture is non power of two then clamp will be used regardless as WebGL can
 * only use REPEAT if the texture is po2.
 *
 * This property only affects WebGL.
 *
 * @name WRAP_MODES
 * @memberof PIXI
 * @static
 * @enum {number}
 * @property {number} CLAMP - The textures uvs are clamped
 * @property {number} REPEAT - The texture uvs tile and repeat
 * @property {number} MIRRORED_REPEAT - The texture uvs tile and repeat with mirroring
 */
var WRAP_MODES;
(function (WRAP_MODES) {
    WRAP_MODES[WRAP_MODES["CLAMP"] = 33071] = "CLAMP";
    WRAP_MODES[WRAP_MODES["REPEAT"] = 10497] = "REPEAT";
    WRAP_MODES[WRAP_MODES["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
})(WRAP_MODES || (WRAP_MODES = {}));
/**
 * Mipmap filtering modes that are supported by pixi.
 *
 * The {@link PIXI.settings.MIPMAP_TEXTURES} affects default texture filtering.
 * Mipmaps are generated for a baseTexture if its `mipmap` field is `ON`,
 * or its `POW2` and texture dimensions are powers of 2.
 * Due to platform restriction, `ON` option will work like `POW2` for webgl-1.
 *
 * This property only affects WebGL.
 *
 * @name MIPMAP_MODES
 * @memberof PIXI
 * @static
 * @enum {number}
 * @property {number} OFF - No mipmaps
 * @property {number} POW2 - Generate mipmaps if texture dimensions are pow2
 * @property {number} ON - Always generate mipmaps
 * @property {number} ON_MANUAL - Use mipmaps, but do not auto-generate them; this is used with a resource
 *   that supports buffering each level-of-detail.
 */
var MIPMAP_MODES;
(function (MIPMAP_MODES) {
    MIPMAP_MODES[MIPMAP_MODES["OFF"] = 0] = "OFF";
    MIPMAP_MODES[MIPMAP_MODES["POW2"] = 1] = "POW2";
    MIPMAP_MODES[MIPMAP_MODES["ON"] = 2] = "ON";
    MIPMAP_MODES[MIPMAP_MODES["ON_MANUAL"] = 3] = "ON_MANUAL";
})(MIPMAP_MODES || (MIPMAP_MODES = {}));
/**
 * How to treat textures with premultiplied alpha
 *
 * @name ALPHA_MODES
 * @memberof PIXI
 * @static
 * @enum {number}
 * @property {number} NO_PREMULTIPLIED_ALPHA - Source is not premultiplied, leave it like that.
 *  Option for compressed and data textures that are created from typed arrays.
 * @property {number} PREMULTIPLY_ON_UPLOAD - Source is not premultiplied, premultiply on upload.
 *  Default option, used for all loaded images.
 * @property {number} PREMULTIPLIED_ALPHA - Source is already premultiplied
 *  Example: spine atlases with `_pma` suffix.
 * @property {number} NPM - Alias for NO_PREMULTIPLIED_ALPHA.
 * @property {number} UNPACK - Default option, alias for PREMULTIPLY_ON_UPLOAD.
 * @property {number} PMA - Alias for PREMULTIPLIED_ALPHA.
 */
var ALPHA_MODES;
(function (ALPHA_MODES) {
    ALPHA_MODES[ALPHA_MODES["NPM"] = 0] = "NPM";
    ALPHA_MODES[ALPHA_MODES["UNPACK"] = 1] = "UNPACK";
    ALPHA_MODES[ALPHA_MODES["PMA"] = 2] = "PMA";
    ALPHA_MODES[ALPHA_MODES["NO_PREMULTIPLIED_ALPHA"] = 0] = "NO_PREMULTIPLIED_ALPHA";
    ALPHA_MODES[ALPHA_MODES["PREMULTIPLY_ON_UPLOAD"] = 1] = "PREMULTIPLY_ON_UPLOAD";
    ALPHA_MODES[ALPHA_MODES["PREMULTIPLY_ALPHA"] = 2] = "PREMULTIPLY_ALPHA";
})(ALPHA_MODES || (ALPHA_MODES = {}));
/**
 * Configure whether filter textures are cleared after binding.
 *
 * Filter textures need not be cleared if the filter does not use pixel blending. {@link CLEAR_MODES.BLIT} will detect
 * this and skip clearing as an optimization.
 *
 * @name CLEAR_MODES
 * @memberof PIXI
 * @static
 * @enum {number}
 * @property {number} BLEND - Do not clear the filter texture. The filter's output will blend on top of the output texture.
 * @property {number} CLEAR - Always clear the filter texture.
 * @property {number} BLIT - Clear only if {@link FilterSystem.forceClear} is set or if the filter uses pixel blending.
 * @property {number} NO - Alias for BLEND, same as `false` in earlier versions
 * @property {number} YES - Alias for CLEAR, same as `true` in earlier versions
 * @property {number} AUTO - Alias for BLIT
 */
var CLEAR_MODES;
(function (CLEAR_MODES) {
    CLEAR_MODES[CLEAR_MODES["NO"] = 0] = "NO";
    CLEAR_MODES[CLEAR_MODES["YES"] = 1] = "YES";
    CLEAR_MODES[CLEAR_MODES["AUTO"] = 2] = "AUTO";
    CLEAR_MODES[CLEAR_MODES["BLEND"] = 0] = "BLEND";
    CLEAR_MODES[CLEAR_MODES["CLEAR"] = 1] = "CLEAR";
    CLEAR_MODES[CLEAR_MODES["BLIT"] = 2] = "BLIT";
})(CLEAR_MODES || (CLEAR_MODES = {}));
/**
 * The gc modes that are supported by pixi.
 *
 * The {@link PIXI.settings.GC_MODE} Garbage Collection mode for PixiJS textures is AUTO
 * If set to GC_MODE, the renderer will occasionally check textures usage. If they are not
 * used for a specified period of time they will be removed from the GPU. They will of course
 * be uploaded again when they are required. This is a silent behind the scenes process that
 * should ensure that the GPU does not  get filled up.
 *
 * Handy for mobile devices!
 * This property only affects WebGL.
 *
 * @name GC_MODES
 * @enum {number}
 * @static
 * @memberof PIXI
 * @property {number} AUTO - Garbage collection will happen periodically automatically
 * @property {number} MANUAL - Garbage collection will need to be called manually
 */
var GC_MODES;
(function (GC_MODES) {
    GC_MODES[GC_MODES["AUTO"] = 0] = "AUTO";
    GC_MODES[GC_MODES["MANUAL"] = 1] = "MANUAL";
})(GC_MODES || (GC_MODES = {}));
/**
 * Constants that specify float precision in shaders.
 *
 * @name PRECISION
 * @memberof PIXI
 * @constant
 * @static
 * @enum {string}
 * @property {string} LOW='lowp'
 * @property {string} MEDIUM='mediump'
 * @property {string} HIGH='highp'
 */
var PRECISION;
(function (PRECISION) {
    PRECISION["LOW"] = "lowp";
    PRECISION["MEDIUM"] = "mediump";
    PRECISION["HIGH"] = "highp";
})(PRECISION || (PRECISION = {}));
/**
 * Constants for mask implementations.
 * We use `type` suffix because it leads to very different behaviours
 *
 * @name MASK_TYPES
 * @memberof PIXI
 * @static
 * @enum {number}
 * @property {number} NONE - Mask is ignored
 * @property {number} SCISSOR - Scissor mask, rectangle on screen, cheap
 * @property {number} STENCIL - Stencil mask, 1-bit, medium, works only if renderer supports stencil
 * @property {number} SPRITE - Mask that uses SpriteMaskFilter, uses temporary RenderTexture
 */
var MASK_TYPES;
(function (MASK_TYPES) {
    MASK_TYPES[MASK_TYPES["NONE"] = 0] = "NONE";
    MASK_TYPES[MASK_TYPES["SCISSOR"] = 1] = "SCISSOR";
    MASK_TYPES[MASK_TYPES["STENCIL"] = 2] = "STENCIL";
    MASK_TYPES[MASK_TYPES["SPRITE"] = 3] = "SPRITE";
})(MASK_TYPES || (MASK_TYPES = {}));
/**
 * Constants for multi-sampling antialiasing.
 *
 * @see PIXI.Framebuffer#multisample
 *
 * @name MSAA_QUALITY
 * @memberof PIXI
 * @static
 * @enum {number}
 * @property {number} NONE - No multisampling for this renderTexture
 * @property {number} LOW - Try 2 samples
 * @property {number} MEDIUM - Try 4 samples
 * @property {number} HIGH - Try 8 samples
 */
var MSAA_QUALITY;
(function (MSAA_QUALITY) {
    MSAA_QUALITY[MSAA_QUALITY["NONE"] = 0] = "NONE";
    MSAA_QUALITY[MSAA_QUALITY["LOW"] = 2] = "LOW";
    MSAA_QUALITY[MSAA_QUALITY["MEDIUM"] = 4] = "MEDIUM";
    MSAA_QUALITY[MSAA_QUALITY["HIGH"] = 8] = "HIGH";
})(MSAA_QUALITY || (MSAA_QUALITY = {}));


//# sourceMappingURL=constants.js.map


/***/ }),

/***/ "./node_modules/@pixi/core/dist/esm/core.js":
/*!**************************************************!*\
  !*** ./node_modules/@pixi/core/dist/esm/core.js ***!
  \**************************************************/
/*! exports provided: AbstractBatchRenderer, AbstractMultiResource, AbstractRenderer, ArrayResource, Attribute, BaseImageResource, BaseRenderTexture, BaseTexture, BatchDrawCall, BatchGeometry, BatchPluginFactory, BatchRenderer, BatchShaderGenerator, BatchSystem, BatchTextureArray, Buffer, BufferResource, CanvasResource, ContextSystem, CubeResource, Filter, FilterState, FilterSystem, Framebuffer, FramebufferSystem, GLFramebuffer, GLProgram, GLTexture, Geometry, GeometrySystem, IGLUniformData, INSTALLED, ImageBitmapResource, ImageResource, MaskData, MaskSystem, ObjectRenderer, Program, ProjectionSystem, Quad, QuadUv, RenderTexture, RenderTexturePool, RenderTextureSystem, Renderer, Resource, SVGResource, ScissorSystem, Shader, ShaderSystem, SpriteMaskFilter, State, StateSystem, StencilSystem, System, Texture, TextureGCSystem, TextureMatrix, TextureSystem, TextureUvs, UniformGroup, VideoResource, ViewableBuffer, autoDetectRenderer, autoDetectResource, checkMaxIfStatementsInShader, defaultFilterVertex, defaultVertex, resources, systems, uniformParsers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractBatchRenderer", function() { return AbstractBatchRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractMultiResource", function() { return AbstractMultiResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractRenderer", function() { return AbstractRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayResource", function() { return ArrayResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return Attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseImageResource", function() { return BaseImageResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseRenderTexture", function() { return BaseRenderTexture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseTexture", function() { return BaseTexture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatchDrawCall", function() { return BatchDrawCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatchGeometry", function() { return BatchGeometry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatchPluginFactory", function() { return BatchPluginFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatchRenderer", function() { return BatchRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatchShaderGenerator", function() { return BatchShaderGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatchSystem", function() { return BatchSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BatchTextureArray", function() { return BatchTextureArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Buffer", function() { return Buffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BufferResource", function() { return BufferResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasResource", function() { return CanvasResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextSystem", function() { return ContextSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubeResource", function() { return CubeResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterState", function() { return FilterState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterSystem", function() { return FilterSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Framebuffer", function() { return Framebuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FramebufferSystem", function() { return FramebufferSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLFramebuffer", function() { return GLFramebuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLProgram", function() { return GLProgram; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTexture", function() { return GLTexture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return Geometry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeometrySystem", function() { return GeometrySystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IGLUniformData", function() { return IGLUniformData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSTALLED", function() { return INSTALLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageBitmapResource", function() { return ImageBitmapResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageResource", function() { return ImageResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskData", function() { return MaskData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskSystem", function() { return MaskSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectRenderer", function() { return ObjectRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Program", function() { return Program; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectionSystem", function() { return ProjectionSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quad", function() { return Quad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuadUv", function() { return QuadUv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderTexture", function() { return RenderTexture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderTexturePool", function() { return RenderTexturePool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderTextureSystem", function() { return RenderTextureSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resource", function() { return Resource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGResource", function() { return SVGResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScissorSystem", function() { return ScissorSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shader", function() { return Shader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaderSystem", function() { return ShaderSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpriteMaskFilter", function() { return SpriteMaskFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateSystem", function() { return StateSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StencilSystem", function() { return StencilSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "System", function() { return System; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Texture", function() { return Texture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureGCSystem", function() { return TextureGCSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureMatrix", function() { return TextureMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureSystem", function() { return TextureSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureUvs", function() { return TextureUvs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UniformGroup", function() { return UniformGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoResource", function() { return VideoResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewableBuffer", function() { return ViewableBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoDetectRenderer", function() { return autoDetectRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoDetectResource", function() { return autoDetectResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkMaxIfStatementsInShader", function() { return checkMaxIfStatementsInShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultFilterVertex", function() { return defaultFilterVertex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultVertex", function() { return defaultVertex$2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resources", function() { return resources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systems", function() { return systems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uniformParsers", function() { return uniformParsers; });
/* harmony import */ var _pixi_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pixi/settings */ "./node_modules/@pixi/settings/dist/esm/settings.js");
/* harmony import */ var _pixi_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pixi/constants */ "./node_modules/@pixi/constants/dist/esm/constants.js");
/* harmony import */ var _pixi_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pixi/utils */ "./node_modules/@pixi/utils/dist/esm/utils.js");
/* harmony import */ var _pixi_runner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pixi/runner */ "./node_modules/@pixi/runner/dist/esm/runner.js");
/* harmony import */ var _pixi_ticker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pixi/ticker */ "./node_modules/@pixi/ticker/dist/esm/ticker.js");
/* harmony import */ var _pixi_math__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @pixi/math */ "./node_modules/@pixi/math/dist/esm/math.js");
/*!
 * @pixi/core - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:17:46 UTC
 *
 * @pixi/core is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */







/**
 * The maximum support for using WebGL. If a device does not
 * support WebGL version, for instance WebGL 2, it will still
 * attempt to fallback support to WebGL 1. If you want to
 * explicitly remove feature support to target a more stable
 * baseline, prefer a lower environment.
 *
 * Due to {@link https://bugs.chromium.org/p/chromium/issues/detail?id=934823|bug in chromium}
 * we disable webgl2 by default for all non-apple mobile devices.
 *
 * @static
 * @name PREFER_ENV
 * @memberof PIXI.settings
 * @type {number}
 * @default PIXI.ENV.WEBGL2
 */
_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].PREFER_ENV = _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["isMobile"].any ? _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ENV"].WEBGL : _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ENV"].WEBGL2;
/**
 * If set to `true`, *only* Textures and BaseTexture objects stored
 * in the caches ({@link PIXI.utils.TextureCache TextureCache} and
 * {@link PIXI.utils.BaseTextureCache BaseTextureCache}) can be
 * used when calling {@link PIXI.Texture.from Texture.from} or
 * {@link PIXI.BaseTexture.from BaseTexture.from}.
 * Otherwise, these `from` calls throw an exception. Using this property
 * can be useful if you want to enforce preloading all assets with
 * {@link PIXI.Loader Loader}.
 *
 * @static
 * @name STRICT_TEXTURE_CACHE
 * @memberof PIXI.settings
 * @type {boolean}
 * @default false
 */
_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].STRICT_TEXTURE_CACHE = false;

/**
 * Collection of installed resource types, class must extend {@link PIXI.Resource}.
 * @example
 * class CustomResource extends PIXI.Resource {
 *   // MUST have source, options constructor signature
 *   // for auto-detected resources to be created.
 *   constructor(source, options) {
 *     super();
 *   }
 *   upload(renderer, baseTexture, glTexture) {
 *     // upload with GL
 *     return true;
 *   }
 *   // used to auto-detect resource
 *   static test(source, extension) {
 *     return extension === 'xyz'|| source instanceof SomeClass;
 *   }
 * }
 * // Install the new resource type
 * PIXI.INSTALLED.push(CustomResource);
 *
 * @memberof PIXI
 * @type {Array<PIXI.IResourcePlugin>}
 * @static
 * @readonly
 */
var INSTALLED = [];
/**
 * Create a resource element from a single source element. This
 * auto-detects which type of resource to create. All resources that
 * are auto-detectable must have a static `test` method and a constructor
 * with the arguments `(source, options?)`. Currently, the supported
 * resources for auto-detection include:
 *  - {@link PIXI.ImageResource}
 *  - {@link PIXI.CanvasResource}
 *  - {@link PIXI.VideoResource}
 *  - {@link PIXI.SVGResource}
 *  - {@link PIXI.BufferResource}
 * @static
 * @memberof PIXI
 * @function autoDetectResource
 * @param {string|*} source - Resource source, this can be the URL to the resource,
 *        a typed-array (for BufferResource), HTMLVideoElement, SVG data-uri
 *        or any other resource that can be auto-detected. If not resource is
 *        detected, it's assumed to be an ImageResource.
 * @param {object} [options] - Pass-through options to use for Resource
 * @param {number} [options.width] - Width of BufferResource or SVG rasterization
 * @param {number} [options.height] - Height of BufferResource or SVG rasterization
 * @param {boolean} [options.autoLoad=true] - Image, SVG and Video flag to start loading
 * @param {number} [options.scale=1] - SVG source scale. Overridden by width, height
 * @param {boolean} [options.createBitmap=PIXI.settings.CREATE_IMAGE_BITMAP] - Image option to create Bitmap object
 * @param {boolean} [options.crossorigin=true] - Image and Video option to set crossOrigin
 * @param {boolean} [options.autoPlay=true] - Video option to start playing video immediately
 * @param {number} [options.updateFPS=0] - Video option to update how many times a second the
 *        texture should be updated from the video. Leave at 0 to update at every render
 * @return {PIXI.Resource} The created resource.
 */
function autoDetectResource(source, options) {
    if (!source) {
        return null;
    }
    var extension = '';
    if (typeof source === 'string') {
        // search for file extension: period, 3-4 chars, then ?, # or EOL
        var result = (/\.(\w{3,4})(?:$|\?|#)/i).exec(source);
        if (result) {
            extension = result[1].toLowerCase();
        }
    }
    for (var i = INSTALLED.length - 1; i >= 0; --i) {
        var ResourcePlugin = INSTALLED[i];
        if (ResourcePlugin.test && ResourcePlugin.test(source, extension)) {
            return new ResourcePlugin(source, options);
        }
    }
    throw new Error('Unrecognized source type to auto-detect Resource');
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Base resource class for textures that manages validation and uploading, depending on its type.
 *
 * Uploading of a base texture to the GPU is required.
 *
 * @class
 * @memberof PIXI
 */
var Resource = /** @class */ (function () {
    /**
     * @param {number} [width=0] - Width of the resource
     * @param {number} [height=0] - Height of the resource
     */
    function Resource(width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        /**
         * Internal width of the resource
         * @member {number}
         * @protected
         */
        this._width = width;
        /**
         * Internal height of the resource
         * @member {number}
         * @protected
         */
        this._height = height;
        /**
         * If resource has been destroyed
         * @member {boolean}
         * @readonly
         * @default false
         */
        this.destroyed = false;
        /**
         * `true` if resource is created by BaseTexture
         * useful for doing cleanup with BaseTexture destroy
         * and not cleaning up resources that were created
         * externally.
         * @member {boolean}
         * @protected
         */
        this.internal = false;
        /**
         * Mini-runner for handling resize events
         * accepts 2 parameters: width, height
         *
         * @member {Runner}
         * @private
         */
        this.onResize = new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('setRealSize');
        /**
         * Mini-runner for handling update events
         *
         * @member {Runner}
         * @private
         */
        this.onUpdate = new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('update');
        /**
         * Handle internal errors, such as loading errors
         * accepts 1 param: error
         *
         * @member {Runner}
         * @private
         */
        this.onError = new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('onError');
    }
    /**
     * Bind to a parent BaseTexture
     *
     * @param {PIXI.BaseTexture} baseTexture - Parent texture
     */
    Resource.prototype.bind = function (baseTexture) {
        this.onResize.add(baseTexture);
        this.onUpdate.add(baseTexture);
        this.onError.add(baseTexture);
        // Call a resize immediate if we already
        // have the width and height of the resource
        if (this._width || this._height) {
            this.onResize.emit(this._width, this._height);
        }
    };
    /**
     * Unbind to a parent BaseTexture
     *
     * @param {PIXI.BaseTexture} baseTexture - Parent texture
     */
    Resource.prototype.unbind = function (baseTexture) {
        this.onResize.remove(baseTexture);
        this.onUpdate.remove(baseTexture);
        this.onError.remove(baseTexture);
    };
    /**
     * Trigger a resize event
     * @param {number} width - X dimension
     * @param {number} height - Y dimension
     */
    Resource.prototype.resize = function (width, height) {
        if (width !== this._width || height !== this._height) {
            this._width = width;
            this._height = height;
            this.onResize.emit(width, height);
        }
    };
    Object.defineProperty(Resource.prototype, "valid", {
        /**
         * Has been validated
         * @readonly
         * @member {boolean}
         */
        get: function () {
            return !!this._width && !!this._height;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Has been updated trigger event
     */
    Resource.prototype.update = function () {
        if (!this.destroyed) {
            this.onUpdate.emit();
        }
    };
    /**
     * This can be overridden to start preloading a resource
     * or do any other prepare step.
     * @protected
     * @return {Promise<void>} Handle the validate event
     */
    Resource.prototype.load = function () {
        return Promise.resolve(this);
    };
    Object.defineProperty(Resource.prototype, "width", {
        /**
         * The width of the resource.
         *
         * @member {number}
         * @readonly
         */
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Resource.prototype, "height", {
        /**
         * The height of the resource.
         *
         * @member {number}
         * @readonly
         */
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Set the style, optional to override
     *
     * @param {PIXI.Renderer} renderer - yeah, renderer!
     * @param {PIXI.BaseTexture} baseTexture - the texture
     * @param {PIXI.GLTexture} glTexture - texture instance for this webgl context
     * @returns {boolean} `true` is success
     */
    Resource.prototype.style = function (_renderer, _baseTexture, _glTexture) {
        return false;
    };
    /**
     * Clean up anything, this happens when destroying is ready.
     *
     * @protected
     */
    Resource.prototype.dispose = function () {
        // override
    };
    /**
     * Call when destroying resource, unbind any BaseTexture object
     * before calling this method, as reference counts are maintained
     * internally.
     */
    Resource.prototype.destroy = function () {
        if (!this.destroyed) {
            this.destroyed = true;
            this.dispose();
            this.onError.removeAll();
            this.onError = null;
            this.onResize.removeAll();
            this.onResize = null;
            this.onUpdate.removeAll();
            this.onUpdate = null;
        }
    };
    /**
     * Abstract, used to auto-detect resource type
     *
     * @static
     * @param {*} source - The source object
     * @param {string} extension - The extension of source, if set
     */
    Resource.test = function (_source, _extension) {
        return false;
    };
    return Resource;
}());

/**
 * @interface SharedArrayBuffer
 */
/**
 * Buffer resource with data of typed array.
 * @class
 * @extends PIXI.Resource
 * @memberof PIXI
 */
var BufferResource = /** @class */ (function (_super) {
    __extends(BufferResource, _super);
    /**
     * @param {Float32Array|Uint8Array|Uint32Array} source - Source buffer
     * @param {object} options - Options
     * @param {number} options.width - Width of the texture
     * @param {number} options.height - Height of the texture
     */
    function BufferResource(source, options) {
        var _this = this;
        var _a = options || {}, width = _a.width, height = _a.height;
        if (!width || !height) {
            throw new Error('BufferResource width or height invalid');
        }
        _this = _super.call(this, width, height) || this;
        /**
         * Source array
         * Cannot be ClampedUint8Array because it cant be uploaded to WebGL
         *
         * @member {Float32Array|Uint8Array|Uint32Array}
         */
        _this.data = source;
        return _this;
    }
    /**
     * Upload the texture to the GPU.
     * @param {PIXI.Renderer} renderer - Upload to the renderer
     * @param {PIXI.BaseTexture} baseTexture - Reference to parent texture
     * @param {PIXI.GLTexture} glTexture - glTexture
     * @returns {boolean} true is success
     */
    BufferResource.prototype.upload = function (renderer, baseTexture, glTexture) {
        var gl = renderer.gl;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ALPHA_MODES"].UNPACK);
        var width = baseTexture.realWidth;
        var height = baseTexture.realHeight;
        if (glTexture.width === width && glTexture.height === height) {
            gl.texSubImage2D(baseTexture.target, 0, 0, 0, width, height, baseTexture.format, baseTexture.type, this.data);
        }
        else {
            glTexture.width = width;
            glTexture.height = height;
            gl.texImage2D(baseTexture.target, 0, glTexture.internalFormat, width, height, 0, baseTexture.format, glTexture.type, this.data);
        }
        return true;
    };
    /**
     * Destroy and don't use after this
     * @override
     */
    BufferResource.prototype.dispose = function () {
        this.data = null;
    };
    /**
     * Used to auto-detect the type of resource.
     *
     * @static
     * @param {*} source - The source object
     * @return {boolean} `true` if <canvas>
     */
    BufferResource.test = function (source) {
        return source instanceof Float32Array
            || source instanceof Uint8Array
            || source instanceof Uint32Array;
    };
    return BufferResource;
}(Resource));

var defaultBufferOptions = {
    scaleMode: _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["SCALE_MODES"].NEAREST,
    format: _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["FORMATS"].RGBA,
    alphaMode: _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ALPHA_MODES"].NPM,
};
/**
 * A Texture stores the information that represents an image.
 * All textures have a base texture, which contains information about the source.
 * Therefore you can have many textures all using a single BaseTexture
 *
 * @class
 * @extends PIXI.utils.EventEmitter
 * @memberof PIXI
 * @typeParam R - The BaseTexture's Resource type.
 * @typeParam RO - The options for constructing resource.
 */
var BaseTexture = /** @class */ (function (_super) {
    __extends(BaseTexture, _super);
    /**
     * @param {PIXI.Resource|string|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} [resource=null] -
     *        The current resource to use, for things that aren't Resource objects, will be converted
     *        into a Resource.
     * @param {Object} [options] - Collection of options
     * @param {PIXI.MIPMAP_MODES} [options.mipmap=PIXI.settings.MIPMAP_TEXTURES] - If mipmapping is enabled for texture
     * @param {number} [options.anisotropicLevel=PIXI.settings.ANISOTROPIC_LEVEL] - Anisotropic filtering level of texture
     * @param {PIXI.WRAP_MODES} [options.wrapMode=PIXI.settings.WRAP_MODE] - Wrap mode for textures
     * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.settings.SCALE_MODE] - Default scale mode, linear, nearest
     * @param {PIXI.FORMATS} [options.format=PIXI.FORMATS.RGBA] - GL format type
     * @param {PIXI.TYPES} [options.type=PIXI.TYPES.UNSIGNED_BYTE] - GL data type
     * @param {PIXI.TARGETS} [options.target=PIXI.TARGETS.TEXTURE_2D] - GL texture target
     * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.UNPACK] - Pre multiply the image alpha
     * @param {number} [options.width=0] - Width of the texture
     * @param {number} [options.height=0] - Height of the texture
     * @param {number} [options.resolution] - Resolution of the base texture
     * @param {object} [options.resourceOptions] - Optional resource options,
     *        see {@link PIXI.autoDetectResource autoDetectResource}
     */
    function BaseTexture(resource, options) {
        if (resource === void 0) { resource = null; }
        if (options === void 0) { options = null; }
        var _this = _super.call(this) || this;
        options = options || {};
        var alphaMode = options.alphaMode, mipmap = options.mipmap, anisotropicLevel = options.anisotropicLevel, scaleMode = options.scaleMode, width = options.width, height = options.height, wrapMode = options.wrapMode, format = options.format, type = options.type, target = options.target, resolution = options.resolution, resourceOptions = options.resourceOptions;
        // Convert the resource to a Resource object
        if (resource && !(resource instanceof Resource)) {
            resource = autoDetectResource(resource, resourceOptions);
            resource.internal = true;
        }
        /**
         * The width of the base texture set when the image has loaded
         *
         * @readonly
         * @member {number}
         */
        _this.width = width || 0;
        /**
         * The height of the base texture set when the image has loaded
         *
         * @readonly
         * @member {number}
         */
        _this.height = height || 0;
        /**
         * The resolution / device pixel ratio of the texture
         *
         * @member {number}
         * @default PIXI.settings.RESOLUTION
         */
        _this.resolution = resolution || _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].RESOLUTION;
        /**
         * Mipmap mode of the texture, affects downscaled images
         *
         * @member {PIXI.MIPMAP_MODES}
         * @default PIXI.settings.MIPMAP_TEXTURES
         */
        _this.mipmap = mipmap !== undefined ? mipmap : _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].MIPMAP_TEXTURES;
        /**
         * Anisotropic filtering level of texture
         *
         * @member {number}
         * @default PIXI.settings.ANISOTROPIC_LEVEL
         */
        _this.anisotropicLevel = anisotropicLevel !== undefined ? anisotropicLevel : _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].ANISOTROPIC_LEVEL;
        /**
         * How the texture wraps
         * @member {number}
         */
        _this.wrapMode = wrapMode || _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].WRAP_MODE;
        /**
         * The scale mode to apply when scaling this texture
         *
         * @member {PIXI.SCALE_MODES}
         * @default PIXI.settings.SCALE_MODE
         */
        _this.scaleMode = scaleMode !== undefined ? scaleMode : _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].SCALE_MODE;
        /**
         * The pixel format of the texture
         *
         * @member {PIXI.FORMATS}
         * @default PIXI.FORMATS.RGBA
         */
        _this.format = format || _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["FORMATS"].RGBA;
        /**
         * The type of resource data
         *
         * @member {PIXI.TYPES}
         * @default PIXI.TYPES.UNSIGNED_BYTE
         */
        _this.type = type || _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TYPES"].UNSIGNED_BYTE;
        /**
         * The target type
         *
         * @member {PIXI.TARGETS}
         * @default PIXI.TARGETS.TEXTURE_2D
         */
        _this.target = target || _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TARGETS"].TEXTURE_2D;
        /**
         * How to treat premultiplied alpha, see {@link PIXI.ALPHA_MODES}.
         *
         * @member {PIXI.ALPHA_MODES}
         * @default PIXI.ALPHA_MODES.UNPACK
         */
        _this.alphaMode = alphaMode !== undefined ? alphaMode : _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ALPHA_MODES"].UNPACK;
        /**
         * Global unique identifier for this BaseTexture
         *
         * @member {number}
         * @protected
         */
        _this.uid = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["uid"])();
        /**
         * Used by automatic texture Garbage Collection, stores last GC tick when it was bound
         *
         * @member {number}
         * @protected
         */
        _this.touched = 0;
        /**
         * Whether or not the texture is a power of two, try to use power of two textures as much
         * as you can
         *
         * @readonly
         * @member {boolean}
         * @default false
         */
        _this.isPowerOfTwo = false;
        _this._refreshPOT();
        /**
         * The map of render context textures where this is bound
         *
         * @member {Object}
         * @private
         */
        _this._glTextures = {};
        /**
         * Used by TextureSystem to only update texture to the GPU when needed.
         * Please call `update()` to increment it.
         *
         * @readonly
         * @member {number}
         */
        _this.dirtyId = 0;
        /**
         * Used by TextureSystem to only update texture style when needed.
         *
         * @protected
         * @member {number}
         */
        _this.dirtyStyleId = 0;
        /**
         * Currently default cache ID.
         *
         * @member {string}
         */
        _this.cacheId = null;
        /**
         * Generally speaking means when resource is loaded.
         * @readonly
         * @member {boolean}
         */
        _this.valid = width > 0 && height > 0;
        /**
         * The collection of alternative cache ids, since some BaseTextures
         * can have more than one ID, short name and longer full URL
         *
         * @member {Array<string>}
         * @readonly
         */
        _this.textureCacheIds = [];
        /**
         * Flag if BaseTexture has been destroyed.
         *
         * @member {boolean}
         * @readonly
         */
        _this.destroyed = false;
        /**
         * The resource used by this BaseTexture, there can only
         * be one resource per BaseTexture, but textures can share
         * resources.
         *
         * @member {PIXI.Resource}
         * @readonly
         */
        _this.resource = null;
        /**
         * Number of the texture batch, used by multi-texture renderers
         *
         * @member {number}
         */
        _this._batchEnabled = 0;
        /**
         * Location inside texture batch, used by multi-texture renderers
         *
         * @member {number}
         */
        _this._batchLocation = 0;
        /**
         * Whether its a part of another texture, handled by ArrayResource or CubeResource
         *
         * @member {PIXI.BaseTexture}
         */
        _this.parentTextureArray = null;
        /**
         * Fired when a not-immediately-available source finishes loading.
         *
         * @protected
         * @event PIXI.BaseTexture#loaded
         * @param {PIXI.BaseTexture} baseTexture - Resource loaded.
         */
        /**
         * Fired when a not-immediately-available source fails to load.
         *
         * @protected
         * @event PIXI.BaseTexture#error
         * @param {PIXI.BaseTexture} baseTexture - Resource errored.
         * @param {ErrorEvent} event - Load error event.
         */
        /**
         * Fired when BaseTexture is updated.
         *
         * @protected
         * @event PIXI.BaseTexture#loaded
         * @param {PIXI.BaseTexture} baseTexture - Resource loaded.
         */
        /**
         * Fired when BaseTexture is updated.
         *
         * @protected
         * @event PIXI.BaseTexture#update
         * @param {PIXI.BaseTexture} baseTexture - Instance of texture being updated.
         */
        /**
         * Fired when BaseTexture is destroyed.
         *
         * @protected
         * @event PIXI.BaseTexture#dispose
         * @param {PIXI.BaseTexture} baseTexture - Instance of texture being destroyed.
         */
        // Set the resource
        _this.setResource(resource);
        return _this;
    }
    Object.defineProperty(BaseTexture.prototype, "realWidth", {
        /**
         * Pixel width of the source of this texture
         *
         * @readonly
         * @member {number}
         */
        get: function () {
            return Math.ceil((this.width * this.resolution) - 1e-4);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseTexture.prototype, "realHeight", {
        /**
         * Pixel height of the source of this texture
         *
         * @readonly
         * @member {number}
         */
        get: function () {
            return Math.ceil((this.height * this.resolution) - 1e-4);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Changes style options of BaseTexture
     *
     * @param {PIXI.SCALE_MODES} [scaleMode] - Pixi scalemode
     * @param {PIXI.MIPMAP_MODES} [mipmap] - enable mipmaps
     * @returns {PIXI.BaseTexture} this
     */
    BaseTexture.prototype.setStyle = function (scaleMode, mipmap) {
        var dirty;
        if (scaleMode !== undefined && scaleMode !== this.scaleMode) {
            this.scaleMode = scaleMode;
            dirty = true;
        }
        if (mipmap !== undefined && mipmap !== this.mipmap) {
            this.mipmap = mipmap;
            dirty = true;
        }
        if (dirty) {
            this.dirtyStyleId++;
        }
        return this;
    };
    /**
     * Changes w/h/resolution. Texture becomes valid if width and height are greater than zero.
     *
     * @param {number} width - Visual width
     * @param {number} height - Visual height
     * @param {number} [resolution] - Optionally set resolution
     * @returns {PIXI.BaseTexture} this
     */
    BaseTexture.prototype.setSize = function (width, height, resolution) {
        this.resolution = resolution || this.resolution;
        this.width = width;
        this.height = height;
        this._refreshPOT();
        this.update();
        return this;
    };
    /**
     * Sets real size of baseTexture, preserves current resolution.
     *
     * @param {number} realWidth - Full rendered width
     * @param {number} realHeight - Full rendered height
     * @param {number} [resolution] - Optionally set resolution
     * @returns {PIXI.BaseTexture} this
     */
    BaseTexture.prototype.setRealSize = function (realWidth, realHeight, resolution) {
        this.resolution = resolution || this.resolution;
        this.width = realWidth / this.resolution;
        this.height = realHeight / this.resolution;
        this._refreshPOT();
        this.update();
        return this;
    };
    /**
     * Refresh check for isPowerOfTwo texture based on size
     *
     * @private
     */
    BaseTexture.prototype._refreshPOT = function () {
        this.isPowerOfTwo = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["isPow2"])(this.realWidth) && Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["isPow2"])(this.realHeight);
    };
    /**
     * Changes resolution
     *
     * @param {number} resolution - res
     * @returns {PIXI.BaseTexture} this
     */
    BaseTexture.prototype.setResolution = function (resolution) {
        var oldResolution = this.resolution;
        if (oldResolution === resolution) {
            return this;
        }
        this.resolution = resolution;
        if (this.valid) {
            this.width = this.width * oldResolution / resolution;
            this.height = this.height * oldResolution / resolution;
            this.emit('update', this);
        }
        this._refreshPOT();
        return this;
    };
    /**
     * Sets the resource if it wasn't set. Throws error if resource already present
     *
     * @param {PIXI.Resource} resource - that is managing this BaseTexture
     * @returns {PIXI.BaseTexture} this
     */
    BaseTexture.prototype.setResource = function (resource) {
        if (this.resource === resource) {
            return this;
        }
        if (this.resource) {
            throw new Error('Resource can be set only once');
        }
        resource.bind(this);
        this.resource = resource;
        return this;
    };
    /**
     * Invalidates the object. Texture becomes valid if width and height are greater than zero.
     */
    BaseTexture.prototype.update = function () {
        if (!this.valid) {
            if (this.width > 0 && this.height > 0) {
                this.valid = true;
                this.emit('loaded', this);
                this.emit('update', this);
            }
        }
        else {
            this.dirtyId++;
            this.dirtyStyleId++;
            this.emit('update', this);
        }
    };
    /**
     * Handle errors with resources.
     * @private
     * @param {ErrorEvent} event - Error event emitted.
     */
    BaseTexture.prototype.onError = function (event) {
        this.emit('error', this, event);
    };
    /**
     * Destroys this base texture.
     * The method stops if resource doesn't want this texture to be destroyed.
     * Removes texture from all caches.
     */
    BaseTexture.prototype.destroy = function () {
        // remove and destroy the resource
        if (this.resource) {
            this.resource.unbind(this);
            // only destroy resourced created internally
            if (this.resource.internal) {
                this.resource.destroy();
            }
            this.resource = null;
        }
        if (this.cacheId) {
            delete _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["BaseTextureCache"][this.cacheId];
            delete _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["TextureCache"][this.cacheId];
            this.cacheId = null;
        }
        // finally let the WebGL renderer know..
        this.dispose();
        BaseTexture.removeFromCache(this);
        this.textureCacheIds = null;
        this.destroyed = true;
    };
    /**
     * Frees the texture from WebGL memory without destroying this texture object.
     * This means you can still use the texture later which will upload it to GPU
     * memory again.
     *
     * @fires PIXI.BaseTexture#dispose
     */
    BaseTexture.prototype.dispose = function () {
        this.emit('dispose', this);
    };
    /**
     * Utility function for BaseTexture|Texture cast
     */
    BaseTexture.prototype.castToBaseTexture = function () {
        return this;
    };
    /**
     * Helper function that creates a base texture based on the source you provide.
     * The source can be - image url, image element, canvas element. If the
     * source is an image url or an image element and not in the base texture
     * cache, it will be created and loaded.
     *
     * @static
     * @param {string|HTMLImageElement|HTMLCanvasElement|SVGElement|HTMLVideoElement} source - The
     *        source to create base texture from.
     * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
     * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
     * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
     * @returns {PIXI.BaseTexture} The new base texture.
     */
    BaseTexture.from = function (source, options, strict) {
        if (strict === void 0) { strict = _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].STRICT_TEXTURE_CACHE; }
        var isFrame = typeof source === 'string';
        var cacheId = null;
        if (isFrame) {
            cacheId = source;
        }
        else {
            if (!source._pixiId) {
                var prefix = (options && options.pixiIdPrefix) || 'pixiid';
                source._pixiId = prefix + "_" + Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["uid"])();
            }
            cacheId = source._pixiId;
        }
        var baseTexture = _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["BaseTextureCache"][cacheId];
        // Strict-mode rejects invalid cacheIds
        if (isFrame && strict && !baseTexture) {
            throw new Error("The cacheId \"" + cacheId + "\" does not exist in BaseTextureCache.");
        }
        if (!baseTexture) {
            baseTexture = new BaseTexture(source, options);
            baseTexture.cacheId = cacheId;
            BaseTexture.addToCache(baseTexture, cacheId);
        }
        return baseTexture;
    };
    /**
     * Create a new BaseTexture with a BufferResource from a Float32Array.
     * RGBA values are floats from 0 to 1.
     * @static
     * @param {Float32Array|Uint8Array} buffer - The optional array to use, if no data
     *        is provided, a new Float32Array is created.
     * @param {number} width - Width of the resource
     * @param {number} height - Height of the resource
     * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
     * @return {PIXI.BaseTexture} The resulting new BaseTexture
     */
    BaseTexture.fromBuffer = function (buffer, width, height, options) {
        buffer = buffer || new Float32Array(width * height * 4);
        var resource = new BufferResource(buffer, { width: width, height: height });
        var type = buffer instanceof Float32Array ? _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TYPES"].FLOAT : _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TYPES"].UNSIGNED_BYTE;
        return new BaseTexture(resource, Object.assign(defaultBufferOptions, options || { width: width, height: height, type: type }));
    };
    /**
     * Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
     *
     * @static
     * @param {PIXI.BaseTexture} baseTexture - The BaseTexture to add to the cache.
     * @param {string} id - The id that the BaseTexture will be stored against.
     */
    BaseTexture.addToCache = function (baseTexture, id) {
        if (id) {
            if (baseTexture.textureCacheIds.indexOf(id) === -1) {
                baseTexture.textureCacheIds.push(id);
            }
            if (_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["BaseTextureCache"][id]) {
                // eslint-disable-next-line no-console
                console.warn("BaseTexture added to the cache with an id [" + id + "] that already had an entry");
            }
            _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["BaseTextureCache"][id] = baseTexture;
        }
    };
    /**
     * Remove a BaseTexture from the global BaseTextureCache.
     *
     * @static
     * @param {string|PIXI.BaseTexture} baseTexture - id of a BaseTexture to be removed, or a BaseTexture instance itself.
     * @return {PIXI.BaseTexture|null} The BaseTexture that was removed.
     */
    BaseTexture.removeFromCache = function (baseTexture) {
        if (typeof baseTexture === 'string') {
            var baseTextureFromCache = _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["BaseTextureCache"][baseTexture];
            if (baseTextureFromCache) {
                var index = baseTextureFromCache.textureCacheIds.indexOf(baseTexture);
                if (index > -1) {
                    baseTextureFromCache.textureCacheIds.splice(index, 1);
                }
                delete _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["BaseTextureCache"][baseTexture];
                return baseTextureFromCache;
            }
        }
        else if (baseTexture && baseTexture.textureCacheIds) {
            for (var i = 0; i < baseTexture.textureCacheIds.length; ++i) {
                delete _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["BaseTextureCache"][baseTexture.textureCacheIds[i]];
            }
            baseTexture.textureCacheIds.length = 0;
            return baseTexture;
        }
        return null;
    };
    /**
     * Global number of the texture batch, used by multi-texture renderers
     *
     * @static
     * @member {number}
     */
    BaseTexture._globalBatch = 0;
    return BaseTexture;
}(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]));

/**
 * Resource that can manage several resource (items) inside.
 * All resources need to have the same pixel size.
 * Parent class for CubeResource and ArrayResource
 *
 * @class
 * @extends PIXI.Resource
 * @memberof PIXI
 */
var AbstractMultiResource = /** @class */ (function (_super) {
    __extends(AbstractMultiResource, _super);
    /**
     * @param {number} length
     * @param {object} [options] - Options to for Resource constructor
     * @param {number} [options.width] - Width of the resource
     * @param {number} [options.height] - Height of the resource
     */
    function AbstractMultiResource(length, options) {
        var _this = this;
        var _a = options || {}, width = _a.width, height = _a.height;
        _this = _super.call(this, width, height) || this;
        /**
         * Collection of partial baseTextures that correspond to resources
         * @member {Array<PIXI.BaseTexture>}
         * @readonly
         */
        _this.items = [];
        /**
         * Dirty IDs for each part
         * @member {Array<number>}
         * @readonly
         */
        _this.itemDirtyIds = [];
        for (var i = 0; i < length; i++) {
            var partTexture = new BaseTexture();
            _this.items.push(partTexture);
            // -2 - first run of texture array upload
            // -1 - texture item was allocated
            // >=0 - texture item uploaded , in sync with items[i].dirtyId
            _this.itemDirtyIds.push(-2);
        }
        /**
         * Number of elements in array
         *
         * @member {number}
         * @readonly
         */
        _this.length = length;
        /**
         * Promise when loading
         * @member {Promise}
         * @private
         * @default null
         */
        _this._load = null;
        /**
         * Bound baseTexture, there can only be one
         * @member {PIXI.BaseTexture}
         */
        _this.baseTexture = null;
        return _this;
    }
    /**
     * used from ArrayResource and CubeResource constructors
     * @param {Array<*>} resources - Can be resources, image elements, canvas, etc. ,
     *  length should be same as constructor length
     * @param {object} [options] - detect options for resources
     * @protected
     */
    AbstractMultiResource.prototype.initFromArray = function (resources, options) {
        for (var i = 0; i < this.length; i++) {
            if (!resources[i]) {
                continue;
            }
            if (resources[i].castToBaseTexture) {
                this.addBaseTextureAt(resources[i].castToBaseTexture(), i);
            }
            else if (resources[i] instanceof Resource) {
                this.addResourceAt(resources[i], i);
            }
            else {
                this.addResourceAt(autoDetectResource(resources[i], options), i);
            }
        }
    };
    /**
     * Destroy this BaseImageResource
     * @override
     */
    AbstractMultiResource.prototype.dispose = function () {
        for (var i = 0, len = this.length; i < len; i++) {
            this.items[i].destroy();
        }
        this.items = null;
        this.itemDirtyIds = null;
        this._load = null;
    };
    /**
     * Set a resource by ID
     *
     * @param {PIXI.Resource} resource
     * @param {number} index - Zero-based index of resource to set
     * @return {PIXI.ArrayResource} Instance for chaining
     */
    AbstractMultiResource.prototype.addResourceAt = function (resource, index) {
        if (!this.items[index]) {
            throw new Error("Index " + index + " is out of bounds");
        }
        // Inherit the first resource dimensions
        if (resource.valid && !this.valid) {
            this.resize(resource.width, resource.height);
        }
        this.items[index].setResource(resource);
        return this;
    };
    /**
     * Set the parent base texture
     * @member {PIXI.BaseTexture}
     * @override
     */
    AbstractMultiResource.prototype.bind = function (baseTexture) {
        if (this.baseTexture !== null) {
            throw new Error('Only one base texture per TextureArray is allowed');
        }
        _super.prototype.bind.call(this, baseTexture);
        for (var i = 0; i < this.length; i++) {
            this.items[i].parentTextureArray = baseTexture;
            this.items[i].on('update', baseTexture.update, baseTexture);
        }
    };
    /**
     * Unset the parent base texture
     * @member {PIXI.BaseTexture}
     * @override
     */
    AbstractMultiResource.prototype.unbind = function (baseTexture) {
        _super.prototype.unbind.call(this, baseTexture);
        for (var i = 0; i < this.length; i++) {
            this.items[i].parentTextureArray = null;
            this.items[i].off('update', baseTexture.update, baseTexture);
        }
    };
    /**
     * Load all the resources simultaneously
     * @override
     * @return {Promise<void>} When load is resolved
     */
    AbstractMultiResource.prototype.load = function () {
        var _this = this;
        if (this._load) {
            return this._load;
        }
        var resources = this.items.map(function (item) { return item.resource; }).filter(function (item) { return item; });
        // TODO: also implement load part-by-part strategy
        var promises = resources.map(function (item) { return item.load(); });
        this._load = Promise.all(promises)
            .then(function () {
            var _a = _this.items[0], realWidth = _a.realWidth, realHeight = _a.realHeight;
            _this.resize(realWidth, realHeight);
            return Promise.resolve(_this);
        });
        return this._load;
    };
    return AbstractMultiResource;
}(Resource));

/**
 * A resource that contains a number of sources.
 *
 * @class
 * @extends PIXI.Resource
 * @memberof PIXI
 */
var ArrayResource = /** @class */ (function (_super) {
    __extends(ArrayResource, _super);
    /**
     * @param {number|Array<*>} source - Number of items in array or the collection
     *        of image URLs to use. Can also be resources, image elements, canvas, etc.
     * @param {object} [options] - Options to apply to {@link PIXI.autoDetectResource}
     * @param {number} [options.width] - Width of the resource
     * @param {number} [options.height] - Height of the resource
     */
    function ArrayResource(source, options) {
        var _this = this;
        var _a = options || {}, width = _a.width, height = _a.height;
        var urls;
        var length;
        if (Array.isArray(source)) {
            urls = source;
            length = source.length;
        }
        else {
            length = source;
        }
        _this = _super.call(this, length, { width: width, height: height }) || this;
        if (urls) {
            _this.initFromArray(urls, options);
        }
        return _this;
    }
    /**
     * Set a baseTexture by ID,
     * ArrayResource just takes resource from it, nothing more
     *
     * @param {PIXI.BaseTexture} baseTexture
     * @param {number} index - Zero-based index of resource to set
     * @return {PIXI.ArrayResource} Instance for chaining
     */
    ArrayResource.prototype.addBaseTextureAt = function (baseTexture, index) {
        if (baseTexture.resource) {
            this.addResourceAt(baseTexture.resource, index);
        }
        else {
            throw new Error('ArrayResource does not support RenderTexture');
        }
        return this;
    };
    /**
     * Add binding
     * @member {PIXI.BaseTexture}
     * @override
     */
    ArrayResource.prototype.bind = function (baseTexture) {
        _super.prototype.bind.call(this, baseTexture);
        baseTexture.target = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TARGETS"].TEXTURE_2D_ARRAY;
    };
    /**
     * Upload the resources to the GPU.
     * @param {PIXI.Renderer} renderer
     * @param {PIXI.BaseTexture} texture
     * @param {PIXI.GLTexture} glTexture
     * @returns {boolean} whether texture was uploaded
     */
    ArrayResource.prototype.upload = function (renderer, texture, glTexture) {
        var _a = this, length = _a.length, itemDirtyIds = _a.itemDirtyIds, items = _a.items;
        var gl = renderer.gl;
        if (glTexture.dirtyId < 0) {
            gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, texture.format, this._width, this._height, length, 0, texture.format, texture.type, null);
        }
        for (var i = 0; i < length; i++) {
            var item = items[i];
            if (itemDirtyIds[i] < item.dirtyId) {
                itemDirtyIds[i] = item.dirtyId;
                if (item.valid) {
                    gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, // xoffset
                    0, // yoffset
                    i, // zoffset
                    item.resource.width, item.resource.height, 1, texture.format, texture.type, item.resource.source);
                }
            }
        }
        return true;
    };
    return ArrayResource;
}(AbstractMultiResource));

/**
 * Base for all the image/canvas resources
 * @class
 * @extends PIXI.Resource
 * @memberof PIXI
 */
var BaseImageResource = /** @class */ (function (_super) {
    __extends(BaseImageResource, _super);
    /**
     * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|SVGElement} source
     */
    function BaseImageResource(source) {
        var _this = this;
        var sourceAny = source;
        var width = sourceAny.naturalWidth || sourceAny.videoWidth || sourceAny.width;
        var height = sourceAny.naturalHeight || sourceAny.videoHeight || sourceAny.height;
        _this = _super.call(this, width, height) || this;
        /**
         * The source element
         * @member {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|SVGElement}
         * @readonly
         */
        _this.source = source;
        /**
         * If set to `true`, will force `texImage2D` over `texSubImage2D` for uploading.
         * Certain types of media (e.g. video) using `texImage2D` is more performant.
         * @member {boolean}
         * @default false
         * @private
         */
        _this.noSubImage = false;
        return _this;
    }
    /**
     * Set cross origin based detecting the url and the crossorigin
     * @protected
     * @param {HTMLElement} element - Element to apply crossOrigin
     * @param {string} url - URL to check
     * @param {boolean|string} [crossorigin=true] - Cross origin value to use
     */
    BaseImageResource.crossOrigin = function (element, url, crossorigin) {
        if (crossorigin === undefined && url.indexOf('data:') !== 0) {
            element.crossOrigin = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["determineCrossOrigin"])(url);
        }
        else if (crossorigin !== false) {
            element.crossOrigin = typeof crossorigin === 'string' ? crossorigin : 'anonymous';
        }
    };
    /**
     * Upload the texture to the GPU.
     * @param {PIXI.Renderer} renderer - Upload to the renderer
     * @param {PIXI.BaseTexture} baseTexture - Reference to parent texture
     * @param {PIXI.GLTexture} glTexture
     * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|SVGElement} [source] - (optional)
     * @returns {boolean} true is success
     */
    BaseImageResource.prototype.upload = function (renderer, baseTexture, glTexture, source) {
        var gl = renderer.gl;
        var width = baseTexture.realWidth;
        var height = baseTexture.realHeight;
        source = source || this.source;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ALPHA_MODES"].UNPACK);
        if (!this.noSubImage
            && baseTexture.target === gl.TEXTURE_2D
            && glTexture.width === width
            && glTexture.height === height) {
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, baseTexture.format, baseTexture.type, source);
        }
        else {
            glTexture.width = width;
            glTexture.height = height;
            gl.texImage2D(baseTexture.target, 0, baseTexture.format, baseTexture.format, baseTexture.type, source);
        }
        return true;
    };
    /**
     * Checks if source width/height was changed, resize can cause extra baseTexture update.
     * Triggers one update in any case.
     */
    BaseImageResource.prototype.update = function () {
        if (this.destroyed) {
            return;
        }
        var source = this.source;
        var width = source.naturalWidth || source.videoWidth || source.width;
        var height = source.naturalHeight || source.videoHeight || source.height;
        this.resize(width, height);
        _super.prototype.update.call(this);
    };
    /**
     * Destroy this BaseImageResource
     * @override
     */
    BaseImageResource.prototype.dispose = function () {
        this.source = null;
    };
    return BaseImageResource;
}(Resource));

/**
 * @interface OffscreenCanvas
 */
/**
 * Resource type for HTMLCanvasElement.
 * @class
 * @extends PIXI.BaseImageResource
 * @memberof PIXI
 */
var CanvasResource = /** @class */ (function (_super) {
    __extends(CanvasResource, _super);
    /**
     * @param {HTMLCanvasElement} source - Canvas element to use
     */
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    function CanvasResource(source) {
        return _super.call(this, source) || this;
    }
    /**
     * Used to auto-detect the type of resource.
     *
     * @static
     * @param {HTMLCanvasElement|OffscreenCanvas} source - The source object
     * @return {boolean} `true` if source is HTMLCanvasElement or OffscreenCanvas
     */
    CanvasResource.test = function (source) {
        var OffscreenCanvas = self.OffscreenCanvas;
        // Check for browsers that don't yet support OffscreenCanvas
        if (OffscreenCanvas && source instanceof OffscreenCanvas) {
            return true;
        }
        return self.HTMLCanvasElement && source instanceof HTMLCanvasElement;
    };
    return CanvasResource;
}(BaseImageResource));

/**
 * Resource for a CubeTexture which contains six resources.
 *
 * @class
 * @extends PIXI.ArrayResource
 * @memberof PIXI
 */
var CubeResource = /** @class */ (function (_super) {
    __extends(CubeResource, _super);
    /**
     * @param {Array<string|PIXI.Resource>} [source] - Collection of URLs or resources
     *        to use as the sides of the cube.
     * @param {object} [options] - ImageResource options
     * @param {number} [options.width] - Width of resource
     * @param {number} [options.height] - Height of resource
     * @param {number} [options.autoLoad=true] - Whether to auto-load resources
     * @param {number} [options.linkBaseTexture=true] - In case BaseTextures are supplied,
     *   whether to copy them or use
     */
    function CubeResource(source, options) {
        var _this = this;
        var _a = options || {}, width = _a.width, height = _a.height, autoLoad = _a.autoLoad, linkBaseTexture = _a.linkBaseTexture;
        if (source && source.length !== CubeResource.SIDES) {
            throw new Error("Invalid length. Got " + source.length + ", expected 6");
        }
        _this = _super.call(this, 6, { width: width, height: height }) || this;
        for (var i = 0; i < CubeResource.SIDES; i++) {
            _this.items[i].target = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TARGETS"].TEXTURE_CUBE_MAP_POSITIVE_X + i;
        }
        /**
         * In case BaseTextures are supplied, whether to use same resource or bind baseTexture itself
         * @member {boolean}
         * @protected
         */
        _this.linkBaseTexture = linkBaseTexture !== false;
        if (source) {
            _this.initFromArray(source, options);
        }
        if (autoLoad !== false) {
            _this.load();
        }
        return _this;
    }
    /**
     * Add binding
     *
     * @override
     * @param {PIXI.BaseTexture} baseTexture - parent base texture
     */
    CubeResource.prototype.bind = function (baseTexture) {
        _super.prototype.bind.call(this, baseTexture);
        baseTexture.target = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TARGETS"].TEXTURE_CUBE_MAP;
    };
    CubeResource.prototype.addBaseTextureAt = function (baseTexture, index, linkBaseTexture) {
        if (linkBaseTexture === undefined) {
            linkBaseTexture = this.linkBaseTexture;
        }
        if (!this.items[index]) {
            throw new Error("Index " + index + " is out of bounds");
        }
        if (!this.linkBaseTexture
            || baseTexture.parentTextureArray
            || Object.keys(baseTexture._glTextures).length > 0) {
            // copy mode
            if (baseTexture.resource) {
                this.addResourceAt(baseTexture.resource, index);
            }
            else {
                throw new Error("CubeResource does not support copying of renderTexture.");
            }
        }
        else {
            // link mode, the difficult one!
            baseTexture.target = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TARGETS"].TEXTURE_CUBE_MAP_POSITIVE_X + index;
            baseTexture.parentTextureArray = this.baseTexture;
            this.items[index] = baseTexture;
        }
        if (baseTexture.valid && !this.valid) {
            this.resize(baseTexture.realWidth, baseTexture.realHeight);
        }
        this.items[index] = baseTexture;
        return this;
    };
    /**
     * Upload the resource
     *
     * @returns {boolean} true is success
     */
    CubeResource.prototype.upload = function (renderer, _baseTexture, glTexture) {
        var dirty = this.itemDirtyIds;
        for (var i = 0; i < CubeResource.SIDES; i++) {
            var side = this.items[i];
            if (dirty[i] < side.dirtyId) {
                if (side.valid && side.resource) {
                    side.resource.upload(renderer, side, glTexture);
                    dirty[i] = side.dirtyId;
                }
                else if (dirty[i] < -1) {
                    // either item is not valid yet, either its a renderTexture
                    // allocate the memory
                    renderer.gl.texImage2D(side.target, 0, glTexture.internalFormat, _baseTexture.realWidth, _baseTexture.realHeight, 0, _baseTexture.format, glTexture.type, null);
                    dirty[i] = -1;
                }
            }
        }
        return true;
    };
    /**
     * Used to auto-detect the type of resource.
     *
     * @static
     * @param {object} source - The source object
     * @return {boolean} `true` if source is an array of 6 elements
     */
    CubeResource.test = function (source) {
        return Array.isArray(source) && source.length === CubeResource.SIDES;
    };
    /**
     * Number of texture sides to store for CubeResources
     *
     * @name PIXI.CubeResource.SIDES
     * @static
     * @member {number}
     * @default 6
     */
    CubeResource.SIDES = 6;
    return CubeResource;
}(AbstractMultiResource));

/**
 * Resource type for HTMLImageElement.
 * @class
 * @extends PIXI.BaseImageResource
 * @memberof PIXI
 */
var ImageResource = /** @class */ (function (_super) {
    __extends(ImageResource, _super);
    /**
     * @param {HTMLImageElement|string} source - image source or URL
     * @param {object} [options]
     * @param {boolean} [options.autoLoad=true] - start loading process
     * @param {boolean} [options.createBitmap=PIXI.settings.CREATE_IMAGE_BITMAP] - whether its required to create
     *        a bitmap before upload
     * @param {boolean} [options.crossorigin=true] - Load image using cross origin
     * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.UNPACK] - Premultiply image alpha in bitmap
     */
    function ImageResource(source, options) {
        var _this = this;
        options = options || {};
        if (!(source instanceof HTMLImageElement)) {
            var imageElement = new Image();
            BaseImageResource.crossOrigin(imageElement, source, options.crossorigin);
            imageElement.src = source;
            source = imageElement;
        }
        _this = _super.call(this, source) || this;
        // FireFox 68, and possibly other versions, seems like setting the HTMLImageElement#width and #height
        // to non-zero values before its loading completes if images are in a cache.
        // Because of this, need to set the `_width` and the `_height` to zero to avoid uploading incomplete images.
        // Please refer to the issue #5968 (https://github.com/pixijs/pixi.js/issues/5968).
        if (!source.complete && !!_this._width && !!_this._height) {
            _this._width = 0;
            _this._height = 0;
        }
        /**
         * URL of the image source
         * @member {string}
         */
        _this.url = source.src;
        /**
         * When process is completed
         * @member {Promise<void>}
         * @private
         */
        _this._process = null;
        /**
         * If the image should be disposed after upload
         * @member {boolean}
         * @default false
         */
        _this.preserveBitmap = false;
        /**
         * If capable, convert the image using createImageBitmap API
         * @member {boolean}
         * @default PIXI.settings.CREATE_IMAGE_BITMAP
         */
        _this.createBitmap = (options.createBitmap !== undefined
            ? options.createBitmap : _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].CREATE_IMAGE_BITMAP) && !!self.createImageBitmap;
        /**
         * Controls texture alphaMode field
         * Copies from options
         * Default is `null`, copies option from baseTexture
         *
         * @member {PIXI.ALPHA_MODES|null}
         * @readonly
         */
        _this.alphaMode = typeof options.alphaMode === 'number' ? options.alphaMode : null;
        /**
         * The ImageBitmap element created for HTMLImageElement
         * @member {ImageBitmap}
         * @default null
         */
        _this.bitmap = null;
        /**
         * Promise when loading
         * @member {Promise<void>}
         * @private
         * @default null
         */
        _this._load = null;
        if (options.autoLoad !== false) {
            _this.load();
        }
        return _this;
    }
    /**
     * returns a promise when image will be loaded and processed
     *
     * @param {boolean} [createBitmap] - whether process image into bitmap
     * @returns {Promise<void>}
     */
    ImageResource.prototype.load = function (createBitmap) {
        var _this = this;
        if (this._load) {
            return this._load;
        }
        if (createBitmap !== undefined) {
            this.createBitmap = createBitmap;
        }
        this._load = new Promise(function (resolve, reject) {
            var source = _this.source;
            _this.url = source.src;
            var completed = function () {
                if (_this.destroyed) {
                    return;
                }
                source.onload = null;
                source.onerror = null;
                _this.resize(source.width, source.height);
                _this._load = null;
                if (_this.createBitmap) {
                    resolve(_this.process());
                }
                else {
                    resolve(_this);
                }
            };
            if (source.complete && source.src) {
                completed();
            }
            else {
                source.onload = completed;
                source.onerror = function (event) {
                    // Avoids Promise freezing when resource broken
                    reject(event);
                    _this.onError.emit(event);
                };
            }
        });
        return this._load;
    };
    /**
     * Called when we need to convert image into BitmapImage.
     * Can be called multiple times, real promise is cached inside.
     *
     * @returns {Promise<void>} cached promise to fill that bitmap
     */
    ImageResource.prototype.process = function () {
        var _this = this;
        var source = this.source;
        if (this._process !== null) {
            return this._process;
        }
        if (this.bitmap !== null || !self.createImageBitmap) {
            return Promise.resolve(this);
        }
        this._process = self.createImageBitmap(source, 0, 0, source.width, source.height, {
            premultiplyAlpha: this.alphaMode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ALPHA_MODES"].UNPACK ? 'premultiply' : 'none',
        })
            .then(function (bitmap) {
            if (_this.destroyed) {
                return Promise.reject();
            }
            _this.bitmap = bitmap;
            _this.update();
            _this._process = null;
            return Promise.resolve(_this);
        });
        return this._process;
    };
    /**
     * Upload the image resource to GPU.
     *
     * @param {PIXI.Renderer} renderer - Renderer to upload to
     * @param {PIXI.BaseTexture} baseTexture - BaseTexture for this resource
     * @param {PIXI.GLTexture} glTexture - GLTexture to use
     * @returns {boolean} true is success
     */
    ImageResource.prototype.upload = function (renderer, baseTexture, glTexture) {
        if (typeof this.alphaMode === 'number') {
            // bitmap stores unpack premultiply flag, we dont have to notify texImage2D about it
            baseTexture.alphaMode = this.alphaMode;
        }
        if (!this.createBitmap) {
            return _super.prototype.upload.call(this, renderer, baseTexture, glTexture);
        }
        if (!this.bitmap) {
            // yeah, ignore the output
            this.process();
            if (!this.bitmap) {
                return false;
            }
        }
        _super.prototype.upload.call(this, renderer, baseTexture, glTexture, this.bitmap);
        if (!this.preserveBitmap) {
            // checks if there are other renderers that possibly need this bitmap
            var flag = true;
            var glTextures = baseTexture._glTextures;
            for (var key in glTextures) {
                var otherTex = glTextures[key];
                if (otherTex !== glTexture && otherTex.dirtyId !== baseTexture.dirtyId) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                if (this.bitmap.close) {
                    this.bitmap.close();
                }
                this.bitmap = null;
            }
        }
        return true;
    };
    /**
     * Destroys this texture
     * @override
     */
    ImageResource.prototype.dispose = function () {
        this.source.onload = null;
        this.source.onerror = null;
        _super.prototype.dispose.call(this);
        if (this.bitmap) {
            this.bitmap.close();
            this.bitmap = null;
        }
        this._process = null;
        this._load = null;
    };
    /**
     * Used to auto-detect the type of resource.
     *
     * @static
     * @param {string|HTMLImageElement} source - The source object
     * @return {boolean} `true` if source is string or HTMLImageElement
     */
    ImageResource.test = function (source) {
        return typeof source === 'string' || source instanceof HTMLImageElement;
    };
    return ImageResource;
}(BaseImageResource));

/**
 * Resource type for SVG elements and graphics.
 * @class
 * @extends PIXI.BaseImageResource
 * @memberof PIXI
 */
var SVGResource = /** @class */ (function (_super) {
    __extends(SVGResource, _super);
    /**
     * @param {string} source - Base64 encoded SVG element or URL for SVG file.
     * @param {object} [options] - Options to use
     * @param {number} [options.scale=1] - Scale to apply to SVG. Overridden by...
     * @param {number} [options.width] - Rasterize SVG this wide. Aspect ratio preserved if height not specified.
     * @param {number} [options.height] - Rasterize SVG this high. Aspect ratio preserved if width not specified.
     * @param {boolean} [options.autoLoad=true] - Start loading right away.
     */
    function SVGResource(sourceBase64, options) {
        var _this = this;
        options = options || {};
        _this = _super.call(this, document.createElement('canvas')) || this;
        _this._width = 0;
        _this._height = 0;
        /**
         * Base64 encoded SVG element or URL for SVG file
         * @readonly
         * @member {string}
         */
        _this.svg = sourceBase64;
        /**
         * The source scale to apply when rasterizing on load
         * @readonly
         * @member {number}
         */
        _this.scale = options.scale || 1;
        /**
         * A width override for rasterization on load
         * @readonly
         * @member {number}
         */
        _this._overrideWidth = options.width;
        /**
         * A height override for rasterization on load
         * @readonly
         * @member {number}
         */
        _this._overrideHeight = options.height;
        /**
         * Call when completely loaded
         * @private
         * @member {function}
         */
        _this._resolve = null;
        /**
         * Cross origin value to use
         * @private
         * @member {boolean|string}
         */
        _this._crossorigin = options.crossorigin;
        /**
         * Promise when loading
         * @member {Promise<void>}
         * @private
         * @default null
         */
        _this._load = null;
        if (options.autoLoad !== false) {
            _this.load();
        }
        return _this;
    }
    SVGResource.prototype.load = function () {
        var _this = this;
        if (this._load) {
            return this._load;
        }
        this._load = new Promise(function (resolve) {
            // Save this until after load is finished
            _this._resolve = function () {
                _this.resize(_this.source.width, _this.source.height);
                resolve(_this);
            };
            // Convert SVG inline string to data-uri
            if ((/^\<svg/).test(_this.svg.trim())) {
                if (!btoa) {
                    throw new Error('Your browser doesn\'t support base64 conversions.');
                }
                _this.svg = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(_this.svg)));
            }
            _this._loadSvg();
        });
        return this._load;
    };
    /**
     * Loads an SVG image from `imageUrl` or `data URL`.
     *
     * @private
     */
    SVGResource.prototype._loadSvg = function () {
        var _this = this;
        var tempImage = new Image();
        BaseImageResource.crossOrigin(tempImage, this.svg, this._crossorigin);
        tempImage.src = this.svg;
        tempImage.onerror = function (event) {
            if (!_this._resolve) {
                return;
            }
            tempImage.onerror = null;
            _this.onError.emit(event);
        };
        tempImage.onload = function () {
            if (!_this._resolve) {
                return;
            }
            var svgWidth = tempImage.width;
            var svgHeight = tempImage.height;
            if (!svgWidth || !svgHeight) {
                throw new Error('The SVG image must have width and height defined (in pixels), canvas API needs them.');
            }
            // Set render size
            var width = svgWidth * _this.scale;
            var height = svgHeight * _this.scale;
            if (_this._overrideWidth || _this._overrideHeight) {
                width = _this._overrideWidth || _this._overrideHeight / svgHeight * svgWidth;
                height = _this._overrideHeight || _this._overrideWidth / svgWidth * svgHeight;
            }
            width = Math.round(width);
            height = Math.round(height);
            // Create a canvas element
            var canvas = _this.source;
            canvas.width = width;
            canvas.height = height;
            canvas._pixiId = "canvas_" + Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["uid"])();
            // Draw the Svg to the canvas
            canvas
                .getContext('2d')
                .drawImage(tempImage, 0, 0, svgWidth, svgHeight, 0, 0, width, height);
            _this._resolve();
            _this._resolve = null;
        };
    };
    /**
     * Get size from an svg string using regexp.
     *
     * @method
     * @param {string} svgString - a serialized svg element
     * @return {PIXI.ISize} image extension
     */
    SVGResource.getSize = function (svgString) {
        var sizeMatch = SVGResource.SVG_SIZE.exec(svgString);
        var size = {};
        if (sizeMatch) {
            size[sizeMatch[1]] = Math.round(parseFloat(sizeMatch[3]));
            size[sizeMatch[5]] = Math.round(parseFloat(sizeMatch[7]));
        }
        return size;
    };
    /**
     * Destroys this texture
     * @override
     */
    SVGResource.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._resolve = null;
        this._crossorigin = null;
    };
    /**
     * Used to auto-detect the type of resource.
     *
     * @static
     * @param {*} source - The source object
     * @param {string} extension - The extension of source, if set
     */
    SVGResource.test = function (source, extension) {
        // url file extension is SVG
        return extension === 'svg'
            // source is SVG data-uri
            || (typeof source === 'string' && (/^data:image\/svg\+xml(;(charset=utf8|utf8))?;base64/).test(source))
            // source is SVG inline
            || (typeof source === 'string' && source.indexOf('<svg') === 0);
    };
    /**
     * RegExp for SVG size.
     *
     * @static
     * @constant {RegExp|string} SVG_SIZE
     * @memberof PIXI.SVGResource
     * @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
     */
    SVGResource.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i; // eslint-disable-line max-len
    return SVGResource;
}(BaseImageResource));

/**
 * Resource type for HTMLVideoElement.
 * @class
 * @extends PIXI.BaseImageResource
 * @memberof PIXI
 */
var VideoResource = /** @class */ (function (_super) {
    __extends(VideoResource, _super);
    /**
     * @param {HTMLVideoElement|object|string|Array<string|object>} source - Video element to use.
     * @param {object} [options] - Options to use
     * @param {boolean} [options.autoLoad=true] - Start loading the video immediately
     * @param {boolean} [options.autoPlay=true] - Start playing video immediately
     * @param {number} [options.updateFPS=0] - How many times a second to update the texture from the video.
     * Leave at 0 to update at every render.
     * @param {boolean} [options.crossorigin=true] - Load image using cross origin
     */
    function VideoResource(source, options) {
        var _this = this;
        options = options || {};
        if (!(source instanceof HTMLVideoElement)) {
            var videoElement = document.createElement('video');
            // workaround for https://github.com/pixijs/pixi.js/issues/5996
            videoElement.setAttribute('preload', 'auto');
            videoElement.setAttribute('webkit-playsinline', '');
            videoElement.setAttribute('playsinline', '');
            if (typeof source === 'string') {
                source = [source];
            }
            var firstSrc = source[0].src || source[0];
            BaseImageResource.crossOrigin(videoElement, firstSrc, options.crossorigin);
            // array of objects or strings
            for (var i = 0; i < source.length; ++i) {
                var sourceElement = document.createElement('source');
                var _a = source[i], src = _a.src, mime = _a.mime;
                src = src || source[i];
                var baseSrc = src.split('?').shift().toLowerCase();
                var ext = baseSrc.substr(baseSrc.lastIndexOf('.') + 1);
                mime = mime || VideoResource.MIME_TYPES[ext] || "video/" + ext;
                sourceElement.src = src;
                sourceElement.type = mime;
                videoElement.appendChild(sourceElement);
            }
            // Override the source
            source = videoElement;
        }
        _this = _super.call(this, source) || this;
        _this.noSubImage = true;
        /**
         * `true` to use PIXI.Ticker.shared to auto update the base texture.
         *
         * @type {boolean}
         * @default true
         * @private
         */
        _this._autoUpdate = true;
        /**
         * `true` if the instance is currently connected to PIXI.Ticker.shared to auto update the base texture.
         *
         * @type {boolean}
         * @default false
         * @private
         */
        _this._isConnectedToTicker = false;
        _this._updateFPS = options.updateFPS || 0;
        _this._msToNextUpdate = 0;
        /**
         * When set to true will automatically play videos used by this texture once
         * they are loaded. If false, it will not modify the playing state.
         *
         * @member {boolean}
         * @default true
         */
        _this.autoPlay = options.autoPlay !== false;
        /**
         * Promise when loading
         * @member {Promise<void>}
         * @private
         * @default null
         */
        _this._load = null;
        /**
         * Callback when completed with load.
         * @member {function}
         * @private
         */
        _this._resolve = null;
        // Bind for listeners
        _this._onCanPlay = _this._onCanPlay.bind(_this);
        _this._onError = _this._onError.bind(_this);
        if (options.autoLoad !== false) {
            _this.load();
        }
        return _this;
    }
    /**
     * Trigger updating of the texture
     *
     * @param {number} [deltaTime=0] - time delta since last tick
     */
    VideoResource.prototype.update = function (_deltaTime) {
        if (!this.destroyed) {
            // account for if video has had its playbackRate changed
            var elapsedMS = _pixi_ticker__WEBPACK_IMPORTED_MODULE_4__["Ticker"].shared.elapsedMS * this.source.playbackRate;
            this._msToNextUpdate = Math.floor(this._msToNextUpdate - elapsedMS);
            if (!this._updateFPS || this._msToNextUpdate <= 0) {
                _super.prototype.update.call(this);
                this._msToNextUpdate = this._updateFPS ? Math.floor(1000 / this._updateFPS) : 0;
            }
        }
    };
    /**
     * Start preloading the video resource.
     *
     * @protected
     * @return {Promise<void>} Handle the validate event
     */
    VideoResource.prototype.load = function () {
        var _this = this;
        if (this._load) {
            return this._load;
        }
        var source = this.source;
        if ((source.readyState === source.HAVE_ENOUGH_DATA || source.readyState === source.HAVE_FUTURE_DATA)
            && source.width && source.height) {
            source.complete = true;
        }
        source.addEventListener('play', this._onPlayStart.bind(this));
        source.addEventListener('pause', this._onPlayStop.bind(this));
        if (!this._isSourceReady()) {
            source.addEventListener('canplay', this._onCanPlay);
            source.addEventListener('canplaythrough', this._onCanPlay);
            source.addEventListener('error', this._onError, true);
        }
        else {
            this._onCanPlay();
        }
        this._load = new Promise(function (resolve) {
            if (_this.valid) {
                resolve(_this);
            }
            else {
                _this._resolve = resolve;
                source.load();
            }
        });
        return this._load;
    };
    /**
     * Handle video error events.
     *
     * @private
     */
    VideoResource.prototype._onError = function (event) {
        this.source.removeEventListener('error', this._onError, true);
        this.onError.emit(event);
    };
    /**
     * Returns true if the underlying source is playing.
     *
     * @private
     * @return {boolean} True if playing.
     */
    VideoResource.prototype._isSourcePlaying = function () {
        var source = this.source;
        return (source.currentTime > 0 && source.paused === false && source.ended === false && source.readyState > 2);
    };
    /**
     * Returns true if the underlying source is ready for playing.
     *
     * @private
     * @return {boolean} True if ready.
     */
    VideoResource.prototype._isSourceReady = function () {
        var source = this.source;
        return source.readyState === 3 || source.readyState === 4;
    };
    /**
     * Runs the update loop when the video is ready to play
     *
     * @private
     */
    VideoResource.prototype._onPlayStart = function () {
        // Just in case the video has not received its can play even yet..
        if (!this.valid) {
            this._onCanPlay();
        }
        if (this.autoUpdate && !this._isConnectedToTicker) {
            _pixi_ticker__WEBPACK_IMPORTED_MODULE_4__["Ticker"].shared.add(this.update, this);
            this._isConnectedToTicker = true;
        }
    };
    /**
     * Fired when a pause event is triggered, stops the update loop
     *
     * @private
     */
    VideoResource.prototype._onPlayStop = function () {
        if (this._isConnectedToTicker) {
            _pixi_ticker__WEBPACK_IMPORTED_MODULE_4__["Ticker"].shared.remove(this.update, this);
            this._isConnectedToTicker = false;
        }
    };
    /**
     * Fired when the video is loaded and ready to play
     *
     * @private
     */
    VideoResource.prototype._onCanPlay = function () {
        var source = this.source;
        source.removeEventListener('canplay', this._onCanPlay);
        source.removeEventListener('canplaythrough', this._onCanPlay);
        var valid = this.valid;
        this.resize(source.videoWidth, source.videoHeight);
        // prevent multiple loaded dispatches..
        if (!valid && this._resolve) {
            this._resolve(this);
            this._resolve = null;
        }
        if (this._isSourcePlaying()) {
            this._onPlayStart();
        }
        else if (this.autoPlay) {
            source.play();
        }
    };
    /**
     * Destroys this texture
     * @override
     */
    VideoResource.prototype.dispose = function () {
        if (this._isConnectedToTicker) {
            _pixi_ticker__WEBPACK_IMPORTED_MODULE_4__["Ticker"].shared.remove(this.update, this);
        }
        var source = this.source;
        if (source) {
            source.removeEventListener('error', this._onError, true);
            source.pause();
            source.src = '';
            source.load();
        }
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(VideoResource.prototype, "autoUpdate", {
        /**
         * Should the base texture automatically update itself, set to true by default
         *
         * @member {boolean}
         */
        get: function () {
            return this._autoUpdate;
        },
        set: function (value) {
            if (value !== this._autoUpdate) {
                this._autoUpdate = value;
                if (!this._autoUpdate && this._isConnectedToTicker) {
                    _pixi_ticker__WEBPACK_IMPORTED_MODULE_4__["Ticker"].shared.remove(this.update, this);
                    this._isConnectedToTicker = false;
                }
                else if (this._autoUpdate && !this._isConnectedToTicker && this._isSourcePlaying()) {
                    _pixi_ticker__WEBPACK_IMPORTED_MODULE_4__["Ticker"].shared.add(this.update, this);
                    this._isConnectedToTicker = true;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VideoResource.prototype, "updateFPS", {
        /**
         * How many times a second to update the texture from the video. Leave at 0 to update at every render.
         * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
         *
         * @member {number}
         */
        get: function () {
            return this._updateFPS;
        },
        set: function (value) {
            if (value !== this._updateFPS) {
                this._updateFPS = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Used to auto-detect the type of resource.
     *
     * @static
     * @param {*} source - The source object
     * @param {string} extension - The extension of source, if set
     * @return {boolean} `true` if video source
     */
    VideoResource.test = function (source, extension) {
        return (self.HTMLVideoElement && source instanceof HTMLVideoElement)
            || VideoResource.TYPES.indexOf(extension) > -1;
    };
    /**
     * List of common video file extensions supported by VideoResource.
     * @constant
     * @member {Array<string>}
     * @static
     * @readonly
     */
    VideoResource.TYPES = ['mp4', 'm4v', 'webm', 'ogg', 'ogv', 'h264', 'avi', 'mov'];
    /**
     * Map of video MIME types that can't be directly derived from file extensions.
     * @constant
     * @member {object}
     * @static
     * @readonly
     */
    VideoResource.MIME_TYPES = {
        ogv: 'video/ogg',
        mov: 'video/quicktime',
        m4v: 'video/mp4',
    };
    return VideoResource;
}(BaseImageResource));

/**
 * Resource type for ImageBitmap.
 * @class
 * @extends PIXI.BaseImageResource
 * @memberof PIXI
 */
var ImageBitmapResource = /** @class */ (function (_super) {
    __extends(ImageBitmapResource, _super);
    /**
     * @param {ImageBitmap} source - Image element to use
     */
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    function ImageBitmapResource(source) {
        return _super.call(this, source) || this;
    }
    /**
     * Used to auto-detect the type of resource.
     *
     * @static
     * @param {ImageBitmap} source - The source object
     * @return {boolean} `true` if source is an ImageBitmap
     */
    ImageBitmapResource.test = function (source) {
        return !!self.createImageBitmap && source instanceof ImageBitmap;
    };
    return ImageBitmapResource;
}(BaseImageResource));

INSTALLED.push(ImageResource, ImageBitmapResource, CanvasResource, VideoResource, SVGResource, BufferResource, CubeResource, ArrayResource);

var _resources = {
    __proto__: null,
    Resource: Resource,
    BaseImageResource: BaseImageResource,
    INSTALLED: INSTALLED,
    autoDetectResource: autoDetectResource,
    AbstractMultiResource: AbstractMultiResource,
    ArrayResource: ArrayResource,
    BufferResource: BufferResource,
    CanvasResource: CanvasResource,
    CubeResource: CubeResource,
    ImageResource: ImageResource,
    SVGResource: SVGResource,
    VideoResource: VideoResource,
    ImageBitmapResource: ImageBitmapResource
};

/**
 * System is a base class used for extending systems used by the {@link PIXI.Renderer}
 *
 * @see PIXI.Renderer#addSystem
 * @class
 * @memberof PIXI
 */
var System = /** @class */ (function () {
    /**
     * @param {Renderer} renderer - The renderer this manager works for.
     */
    function System(renderer) {
        /**
         * The renderer this manager works for.
         *
         * @member {PIXI.Renderer}
         */
        this.renderer = renderer;
    }
    /**
     * Generic destroy methods to be overridden by the subclass
     */
    System.prototype.destroy = function () {
        this.renderer = null;
    };
    return System;
}());

/**
 * Resource type for DepthTexture.
 * @class
 * @extends PIXI.BufferResource
 * @memberof PIXI
 */
var DepthResource = /** @class */ (function (_super) {
    __extends(DepthResource, _super);
    function DepthResource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Upload the texture to the GPU.
     * @param {PIXI.Renderer} renderer - Upload to the renderer
     * @param {PIXI.BaseTexture} baseTexture - Reference to parent texture
     * @param {PIXI.GLTexture} glTexture - glTexture
     * @returns {boolean} true is success
     */
    DepthResource.prototype.upload = function (renderer, baseTexture, glTexture) {
        var gl = renderer.gl;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ALPHA_MODES"].UNPACK);
        var width = baseTexture.realWidth;
        var height = baseTexture.realHeight;
        if (glTexture.width === width && glTexture.height === height) {
            gl.texSubImage2D(baseTexture.target, 0, 0, 0, width, height, baseTexture.format, baseTexture.type, this.data);
        }
        else {
            glTexture.width = width;
            glTexture.height = height;
            gl.texImage2D(baseTexture.target, 0, 
            //  gl.DEPTH_COMPONENT16 Needed for depth to render properly in webgl2.0
            renderer.context.webGLVersion === 1 ? gl.DEPTH_COMPONENT : gl.DEPTH_COMPONENT16, width, height, 0, baseTexture.format, baseTexture.type, this.data);
        }
        return true;
    };
    return DepthResource;
}(BufferResource));

/**
 * A framebuffer can be used to render contents off of the screen. {@link PIXI.BaseRenderTexture} uses
 * one internally to render into itself. You can attach a depth or stencil buffer to a framebuffer.
 *
 * On WebGL 2 machines, shaders can output to multiple textures simultaneously with GLSL 300 ES.
 *
 * @class
 * @memberof PIXI
 */
var Framebuffer = /** @class */ (function () {
    /**
     * @param {number} width - Width of the frame buffer
     * @param {number} height - Height of the frame buffer
     */
    function Framebuffer(width, height) {
        /**
         * Width of framebuffer in pixels
         * @member {number}
         */
        this.width = Math.ceil(width || 100);
        /**
         * Height of framebuffer in pixels
         * @member {number}
         */
        this.height = Math.ceil(height || 100);
        this.stencil = false;
        this.depth = false;
        this.dirtyId = 0;
        this.dirtyFormat = 0;
        this.dirtySize = 0;
        this.depthTexture = null;
        this.colorTextures = [];
        this.glFramebuffers = {};
        this.disposeRunner = new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('disposeFramebuffer');
        /**
         * Desired number of samples for antialiasing. 0 means AA should not be used.
         *
         * Experimental WebGL2 feature, allows to use antialiasing in individual renderTextures.
         * Antialiasing is the same as for main buffer with renderer `antialias:true` options.
         * Seriously affects GPU memory consumption and GPU performance.
         *
         *```js
         * renderTexture.framebuffer.multisample = PIXI.MSAA_QUALITY.HIGH;
         * //...
         * renderer.render(myContainer, {renderTexture});
         * renderer.framebuffer.blit(); // copies data from MSAA framebuffer to texture
         *  ```
         *
         * @member {PIXI.MSAA_QUALITY}
         * @default PIXI.MSAA_QUALITY.NONE
         */
        this.multisample = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MSAA_QUALITY"].NONE;
    }
    Object.defineProperty(Framebuffer.prototype, "colorTexture", {
        /**
         * Reference to the colorTexture.
         *
         * @member {PIXI.BaseTexture[]}
         * @readonly
         */
        get: function () {
            return this.colorTextures[0];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Add texture to the colorTexture array
     *
     * @param {number} [index=0] - Index of the array to add the texture to
     * @param {PIXI.BaseTexture} [texture] - Texture to add to the array
     */
    Framebuffer.prototype.addColorTexture = function (index, texture) {
        if (index === void 0) { index = 0; }
        // TODO add some validation to the texture - same width / height etc?
        this.colorTextures[index] = texture || new BaseTexture(null, {
            scaleMode: _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["SCALE_MODES"].NEAREST,
            resolution: 1,
            mipmap: _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MIPMAP_MODES"].OFF,
            width: this.width,
            height: this.height,
        });
        this.dirtyId++;
        this.dirtyFormat++;
        return this;
    };
    /**
     * Add a depth texture to the frame buffer
     *
     * @param {PIXI.BaseTexture} [texture] - Texture to add
     */
    Framebuffer.prototype.addDepthTexture = function (texture) {
        /* eslint-disable max-len */
        this.depthTexture = texture || new BaseTexture(new DepthResource(null, { width: this.width, height: this.height }), {
            scaleMode: _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["SCALE_MODES"].NEAREST,
            resolution: 1,
            width: this.width,
            height: this.height,
            mipmap: _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MIPMAP_MODES"].OFF,
            format: _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["FORMATS"].DEPTH_COMPONENT,
            type: _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TYPES"].UNSIGNED_SHORT,
        });
        this.dirtyId++;
        this.dirtyFormat++;
        return this;
    };
    /**
     * Enable depth on the frame buffer
     */
    Framebuffer.prototype.enableDepth = function () {
        this.depth = true;
        this.dirtyId++;
        this.dirtyFormat++;
        return this;
    };
    /**
     * Enable stencil on the frame buffer
     */
    Framebuffer.prototype.enableStencil = function () {
        this.stencil = true;
        this.dirtyId++;
        this.dirtyFormat++;
        return this;
    };
    /**
     * Resize the frame buffer
     *
     * @param {number} width - Width of the frame buffer to resize to
     * @param {number} height - Height of the frame buffer to resize to
     */
    Framebuffer.prototype.resize = function (width, height) {
        width = Math.ceil(width);
        height = Math.ceil(height);
        if (width === this.width && height === this.height)
            { return; }
        this.width = width;
        this.height = height;
        this.dirtyId++;
        this.dirtySize++;
        for (var i = 0; i < this.colorTextures.length; i++) {
            var texture = this.colorTextures[i];
            var resolution = texture.resolution;
            // take into account the fact the texture may have a different resolution..
            texture.setSize(width / resolution, height / resolution);
        }
        if (this.depthTexture) {
            var resolution = this.depthTexture.resolution;
            this.depthTexture.setSize(width / resolution, height / resolution);
        }
    };
    /**
     * Disposes WebGL resources that are connected to this geometry
     */
    Framebuffer.prototype.dispose = function () {
        this.disposeRunner.emit(this, false);
    };
    /**
     * Destroys and removes the depth texture added to this framebuffer.
     */
    Framebuffer.prototype.destroyDepthTexture = function () {
        if (this.depthTexture) {
            this.depthTexture.destroy();
            this.depthTexture = null;
            ++this.dirtyId;
            ++this.dirtyFormat;
        }
    };
    return Framebuffer;
}());

/**
 * A BaseRenderTexture is a special texture that allows any PixiJS display object to be rendered to it.
 *
 * __Hint__: All DisplayObjects (i.e. Sprites) that render to a BaseRenderTexture should be preloaded
 * otherwise black rectangles will be drawn instead.
 *
 * A BaseRenderTexture takes a snapshot of any Display Object given to its render method. The position
 * and rotation of the given Display Objects is ignored. For example:
 *
 * ```js
 * let renderer = PIXI.autoDetectRenderer();
 * let baseRenderTexture = new PIXI.BaseRenderTexture({ width: 800, height: 600 });
 * let renderTexture = new PIXI.RenderTexture(baseRenderTexture);
 * let sprite = PIXI.Sprite.from("spinObj_01.png");
 *
 * sprite.position.x = 800/2;
 * sprite.position.y = 600/2;
 * sprite.anchor.x = 0.5;
 * sprite.anchor.y = 0.5;
 *
 * renderer.render(sprite, {renderTexture});
 * ```
 *
 * The Sprite in this case will be rendered using its local transform. To render this sprite at 0,0
 * you can clear the transform
 *
 * ```js
 *
 * sprite.setTransform()
 *
 * let baseRenderTexture = new PIXI.BaseRenderTexture({ width: 100, height: 100 });
 * let renderTexture = new PIXI.RenderTexture(baseRenderTexture);
 *
 * renderer.render(sprite, {renderTexture});  // Renders to center of RenderTexture
 * ```
 *
 * @class
 * @extends PIXI.BaseTexture
 * @memberof PIXI
 */
var BaseRenderTexture = /** @class */ (function (_super) {
    __extends(BaseRenderTexture, _super);
    /**
     * @param {object} [options]
     * @param {number} [options.width=100] - The width of the base render texture.
     * @param {number} [options.height=100] - The height of the base render texture.
     * @param {PIXI.SCALE_MODES} [options.scaleMode] - See {@link PIXI.SCALE_MODES} for possible values.
     * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the texture being generated.
     */
    function BaseRenderTexture(options) {
        var _this = this;
        if (typeof options === 'number') {
            /* eslint-disable prefer-rest-params */
            // Backward compatibility of signature
            var width_1 = arguments[0];
            var height_1 = arguments[1];
            var scaleMode = arguments[2];
            var resolution = arguments[3];
            options = { width: width_1, height: height_1, scaleMode: scaleMode, resolution: resolution };
            /* eslint-enable prefer-rest-params */
        }
        _this = _super.call(this, null, options) || this;
        var _a = options || {}, width = _a.width, height = _a.height;
        // Set defaults
        _this.mipmap = 0;
        _this.width = Math.ceil(width) || 100;
        _this.height = Math.ceil(height) || 100;
        _this.valid = true;
        _this.clearColor = [0, 0, 0, 0];
        _this.framebuffer = new Framebuffer(_this.width * _this.resolution, _this.height * _this.resolution)
            .addColorTexture(0, _this);
        // TODO - could this be added the systems?
        /**
         * The data structure for the stencil masks.
         *
         * @member {PIXI.MaskData[]}
         */
        _this.maskStack = [];
        /**
         * The data structure for the filters.
         *
         * @member {Object[]}
         */
        _this.filterStack = [{}];
        return _this;
    }
    /**
     * Resizes the BaseRenderTexture.
     *
     * @param {number} width - The width to resize to.
     * @param {number} height - The height to resize to.
     */
    BaseRenderTexture.prototype.resize = function (width, height) {
        width = Math.ceil(width);
        height = Math.ceil(height);
        this.framebuffer.resize(width * this.resolution, height * this.resolution);
    };
    /**
     * Frees the texture and framebuffer from WebGL memory without destroying this texture object.
     * This means you can still use the texture later which will upload it to GPU
     * memory again.
     *
     * @fires PIXI.BaseTexture#dispose
     */
    BaseRenderTexture.prototype.dispose = function () {
        this.framebuffer.dispose();
        _super.prototype.dispose.call(this);
    };
    /**
     * Destroys this texture.
     */
    BaseRenderTexture.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.framebuffer.destroyDepthTexture();
        this.framebuffer = null;
    };
    return BaseRenderTexture;
}(BaseTexture));

/**
 * Stores a texture's frame in UV coordinates, in
 * which everything lies in the rectangle `[(0,0), (1,0),
 * (1,1), (0,1)]`.
 *
 * | Corner       | Coordinates |
 * |--------------|-------------|
 * | Top-Left     | `(x0,y0)`   |
 * | Top-Right    | `(x1,y1)`   |
 * | Bottom-Right | `(x2,y2)`   |
 * | Bottom-Left  | `(x3,y3)`   |
 *
 * @class
 * @protected
 * @memberof PIXI
 */
var TextureUvs = /** @class */ (function () {
    function TextureUvs() {
        /**
         * X-component of top-left corner `(x0,y0)`.
         *
         * @member {number}
         */
        this.x0 = 0;
        /**
         * Y-component of top-left corner `(x0,y0)`.
         *
         * @member {number}
         */
        this.y0 = 0;
        /**
         * X-component of top-right corner `(x1,y1)`.
         *
         * @member {number}
         */
        this.x1 = 1;
        /**
         * Y-component of top-right corner `(x1,y1)`.
         *
         * @member {number}
         */
        this.y1 = 0;
        /**
         * X-component of bottom-right corner `(x2,y2)`.
         *
         * @member {number}
         */
        this.x2 = 1;
        /**
         * Y-component of bottom-right corner `(x2,y2)`.
         *
         * @member {number}
         */
        this.y2 = 1;
        /**
         * X-component of bottom-left corner `(x3,y3)`.
         *
         * @member {number}
         */
        this.x3 = 0;
        /**
         * Y-component of bottom-right corner `(x3,y3)`.
         *
         * @member {number}
         */
        this.y3 = 1;
        this.uvsFloat32 = new Float32Array(8);
    }
    /**
     * Sets the texture Uvs based on the given frame information.
     *
     * @protected
     * @param {PIXI.Rectangle} frame - The frame of the texture
     * @param {PIXI.Rectangle} baseFrame - The base frame of the texture
     * @param {number} rotate - Rotation of frame, see {@link PIXI.groupD8}
     */
    TextureUvs.prototype.set = function (frame, baseFrame, rotate) {
        var tw = baseFrame.width;
        var th = baseFrame.height;
        if (rotate) {
            // width and height div 2 div baseFrame size
            var w2 = frame.width / 2 / tw;
            var h2 = frame.height / 2 / th;
            // coordinates of center
            var cX = (frame.x / tw) + w2;
            var cY = (frame.y / th) + h2;
            rotate = _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].add(rotate, _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].NW); // NW is top-left corner
            this.x0 = cX + (w2 * _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].uX(rotate));
            this.y0 = cY + (h2 * _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].uY(rotate));
            rotate = _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].add(rotate, 2); // rotate 90 degrees clockwise
            this.x1 = cX + (w2 * _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].uX(rotate));
            this.y1 = cY + (h2 * _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].uY(rotate));
            rotate = _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].add(rotate, 2);
            this.x2 = cX + (w2 * _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].uX(rotate));
            this.y2 = cY + (h2 * _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].uY(rotate));
            rotate = _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].add(rotate, 2);
            this.x3 = cX + (w2 * _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].uX(rotate));
            this.y3 = cY + (h2 * _pixi_math__WEBPACK_IMPORTED_MODULE_5__["groupD8"].uY(rotate));
        }
        else {
            this.x0 = frame.x / tw;
            this.y0 = frame.y / th;
            this.x1 = (frame.x + frame.width) / tw;
            this.y1 = frame.y / th;
            this.x2 = (frame.x + frame.width) / tw;
            this.y2 = (frame.y + frame.height) / th;
            this.x3 = frame.x / tw;
            this.y3 = (frame.y + frame.height) / th;
        }
        this.uvsFloat32[0] = this.x0;
        this.uvsFloat32[1] = this.y0;
        this.uvsFloat32[2] = this.x1;
        this.uvsFloat32[3] = this.y1;
        this.uvsFloat32[4] = this.x2;
        this.uvsFloat32[5] = this.y2;
        this.uvsFloat32[6] = this.x3;
        this.uvsFloat32[7] = this.y3;
    };
    TextureUvs.prototype.toString = function () {
        return "[@pixi/core:TextureUvs "
            + ("x0=" + this.x0 + " y0=" + this.y0 + " ")
            + ("x1=" + this.x1 + " y1=" + this.y1 + " x2=" + this.x2 + " ")
            + ("y2=" + this.y2 + " x3=" + this.x3 + " y3=" + this.y3)
            + "]";
    };
    return TextureUvs;
}());

var DEFAULT_UVS = new TextureUvs();
/**
 * A texture stores the information that represents an image or part of an image.
 *
 * It cannot be added to the display list directly; instead use it as the texture for a Sprite.
 * If no frame is provided for a texture, then the whole image is used.
 *
 * You can directly create a texture from an image and then reuse it multiple times like this :
 *
 * ```js
 * let texture = PIXI.Texture.from('assets/image.png');
 * let sprite1 = new PIXI.Sprite(texture);
 * let sprite2 = new PIXI.Sprite(texture);
 * ```
 *
 * If you didnt pass the texture frame to constructor, it enables `noFrame` mode:
 * it subscribes on baseTexture events, it automatically resizes at the same time as baseTexture.
 *
 * Textures made from SVGs, loaded or not, cannot be used before the file finishes processing.
 * You can check for this by checking the sprite's _textureID property.
 * ```js
 * var texture = PIXI.Texture.from('assets/image.svg');
 * var sprite1 = new PIXI.Sprite(texture);
 * //sprite1._textureID should not be undefined if the texture has finished processing the SVG file
 * ```
 * You can use a ticker or rAF to ensure your sprites load the finished textures after processing. See issue #3068.
 *
 * @class
 * @extends PIXI.utils.EventEmitter
 * @memberof PIXI
 * @typeParam R - The BaseTexture's Resource type.
 */
var Texture = /** @class */ (function (_super) {
    __extends(Texture, _super);
    /**
     * @param {PIXI.BaseTexture} baseTexture - The base texture source to create the texture from
     * @param {PIXI.Rectangle} [frame] - The rectangle frame of the texture to show
     * @param {PIXI.Rectangle} [orig] - The area of original texture
     * @param {PIXI.Rectangle} [trim] - Trimmed rectangle of original texture
     * @param {number} [rotate] - indicates how the texture was rotated by texture packer. See {@link PIXI.groupD8}
     * @param {PIXI.IPointData} [anchor] - Default anchor point used for sprite placement / rotation
     */
    function Texture(baseTexture, frame, orig, trim, rotate, anchor) {
        var _this = _super.call(this) || this;
        /**
         * Does this Texture have any frame data assigned to it?
         *
         * This mode is enabled automatically if no frame was passed inside constructor.
         *
         * In this mode texture is subscribed to baseTexture events, and fires `update` on any change.
         *
         * Beware, after loading or resize of baseTexture event can fired two times!
         * If you want more control, subscribe on baseTexture itself.
         *
         * ```js
         * texture.on('update', () => {});
         * ```
         *
         * Any assignment of `frame` switches off `noFrame` mode.
         *
         * @member {boolean}
         */
        _this.noFrame = false;
        if (!frame) {
            _this.noFrame = true;
            frame = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"](0, 0, 1, 1);
        }
        if (baseTexture instanceof Texture) {
            baseTexture = baseTexture.baseTexture;
        }
        /**
         * The base texture that this texture uses.
         *
         * @member {PIXI.BaseTexture}
         */
        _this.baseTexture = baseTexture;
        /**
         * This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,
         * irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)
         *
         * @member {PIXI.Rectangle}
         */
        _this._frame = frame;
        /**
         * This is the trimmed area of original texture, before it was put in atlas
         * Please call `updateUvs()` after you change coordinates of `trim` manually.
         *
         * @member {PIXI.Rectangle}
         */
        _this.trim = trim;
        /**
         * This will let the renderer know if the texture is valid. If it's not then it cannot be rendered.
         *
         * @member {boolean}
         */
        _this.valid = false;
        /**
         * The WebGL UV data cache. Can be used as quad UV
         *
         * @member {PIXI.TextureUvs}
         * @protected
         */
        _this._uvs = DEFAULT_UVS;
        /**
         * Default TextureMatrix instance for this texture
         * By default that object is not created because its heavy
         *
         * @member {PIXI.TextureMatrix}
         */
        _this.uvMatrix = null;
        /**
         * This is the area of original texture, before it was put in atlas
         *
         * @member {PIXI.Rectangle}
         */
        _this.orig = orig || frame; // new Rectangle(0, 0, 1, 1);
        _this._rotate = Number(rotate || 0);
        if (rotate === true) {
            // this is old texturepacker legacy, some games/libraries are passing "true" for rotated textures
            _this._rotate = 2;
        }
        else if (_this._rotate % 2 !== 0) {
            throw new Error('attempt to use diamond-shaped UVs. If you are sure, set rotation manually');
        }
        /**
         * Anchor point that is used as default if sprite is created with this texture.
         * Changing the `defaultAnchor` at a later point of time will not update Sprite's anchor point.
         * @member {PIXI.Point}
         * @default {0,0}
         */
        _this.defaultAnchor = anchor ? new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Point"](anchor.x, anchor.y) : new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Point"](0, 0);
        /**
         * Update ID is observed by sprites and TextureMatrix instances.
         * Call updateUvs() to increment it.
         *
         * @member {number}
         * @protected
         */
        _this._updateID = 0;
        /**
         * The ids under which this Texture has been added to the texture cache. This is
         * automatically set as long as Texture.addToCache is used, but may not be set if a
         * Texture is added directly to the TextureCache array.
         *
         * @member {string[]}
         */
        _this.textureCacheIds = [];
        if (!baseTexture.valid) {
            baseTexture.once('loaded', _this.onBaseTextureUpdated, _this);
        }
        else if (_this.noFrame) {
            // if there is no frame we should monitor for any base texture changes..
            if (baseTexture.valid) {
                _this.onBaseTextureUpdated(baseTexture);
            }
        }
        else {
            _this.frame = frame;
        }
        if (_this.noFrame) {
            baseTexture.on('update', _this.onBaseTextureUpdated, _this);
        }
        return _this;
    }
    /**
     * Updates this texture on the gpu.
     *
     * Calls the TextureResource update.
     *
     * If you adjusted `frame` manually, please call `updateUvs()` instead.
     *
     */
    Texture.prototype.update = function () {
        if (this.baseTexture.resource) {
            this.baseTexture.resource.update();
        }
    };
    /**
     * Called when the base texture is updated
     *
     * @protected
     * @param {PIXI.BaseTexture} baseTexture - The base texture.
     */
    Texture.prototype.onBaseTextureUpdated = function (baseTexture) {
        if (this.noFrame) {
            if (!this.baseTexture.valid) {
                return;
            }
            this._frame.width = baseTexture.width;
            this._frame.height = baseTexture.height;
            this.valid = true;
            this.updateUvs();
        }
        else {
            // TODO this code looks confusing.. boo to abusing getters and setters!
            // if user gave us frame that has bigger size than resized texture it can be a problem
            this.frame = this._frame;
        }
        this.emit('update', this);
    };
    /**
     * Destroys this texture
     *
     * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
     */
    Texture.prototype.destroy = function (destroyBase) {
        if (this.baseTexture) {
            if (destroyBase) {
                var resource = this.baseTexture.resource;
                // delete the texture if it exists in the texture cache..
                // this only needs to be removed if the base texture is actually destroyed too..
                if (resource && resource.url && _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["TextureCache"][resource.url]) {
                    Texture.removeFromCache(resource.url);
                }
                this.baseTexture.destroy();
            }
            this.baseTexture.off('loaded', this.onBaseTextureUpdated, this);
            this.baseTexture.off('update', this.onBaseTextureUpdated, this);
            this.baseTexture = null;
        }
        this._frame = null;
        this._uvs = null;
        this.trim = null;
        this.orig = null;
        this.valid = false;
        Texture.removeFromCache(this);
        this.textureCacheIds = null;
    };
    /**
     * Creates a new texture object that acts the same as this one.
     *
     * @return {PIXI.Texture} The new texture
     */
    Texture.prototype.clone = function () {
        var clonedFrame = this._frame.clone();
        var clonedOrig = this._frame === this.orig ? clonedFrame : this.orig.clone();
        var clonedTexture = new Texture(this.baseTexture, !this.noFrame && clonedFrame, clonedOrig, this.trim && this.trim.clone(), this.rotate, this.defaultAnchor);
        if (this.noFrame) {
            clonedTexture._frame = clonedFrame;
        }
        return clonedTexture;
    };
    /**
     * Updates the internal WebGL UV cache. Use it after you change `frame` or `trim` of the texture.
     * Call it after changing the frame
     */
    Texture.prototype.updateUvs = function () {
        if (this._uvs === DEFAULT_UVS) {
            this._uvs = new TextureUvs();
        }
        this._uvs.set(this._frame, this.baseTexture, this.rotate);
        this._updateID++;
    };
    /**
     * Helper function that creates a new Texture based on the source you provide.
     * The source can be - frame id, image url, video url, canvas element, video element, base texture
     *
     * @static
     * @param {string|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|PIXI.BaseTexture} source -
     *        Source to create texture from
     * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
     * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
     * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
     * @return {PIXI.Texture} The newly created texture
     */
    Texture.from = function (source, options, strict) {
        if (options === void 0) { options = {}; }
        if (strict === void 0) { strict = _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].STRICT_TEXTURE_CACHE; }
        var isFrame = typeof source === 'string';
        var cacheId = null;
        if (isFrame) {
            cacheId = source;
        }
        else {
            if (!source._pixiId) {
                var prefix = (options && options.pixiIdPrefix) || 'pixiid';
                source._pixiId = prefix + "_" + Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["uid"])();
            }
            cacheId = source._pixiId;
        }
        var texture = _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["TextureCache"][cacheId];
        // Strict-mode rejects invalid cacheIds
        if (isFrame && strict && !texture) {
            throw new Error("The cacheId \"" + cacheId + "\" does not exist in TextureCache.");
        }
        if (!texture) {
            if (!options.resolution) {
                options.resolution = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["getResolutionOfUrl"])(source);
            }
            texture = new Texture(new BaseTexture(source, options));
            texture.baseTexture.cacheId = cacheId;
            BaseTexture.addToCache(texture.baseTexture, cacheId);
            Texture.addToCache(texture, cacheId);
        }
        // lets assume its a base texture!
        return texture;
    };
    /**
     * Useful for loading textures via URLs. Use instead of `Texture.from` because
     * it does a better job of handling failed URLs more effectively. This also ignores
     * `PIXI.settings.STRICT_TEXTURE_CACHE`. Works for Videos, SVGs, Images.
     * @param {string} url - The remote URL to load.
     * @param {object} [options] - Optional options to include
     * @return {Promise<PIXI.Texture>} A Promise that resolves to a Texture.
     */
    Texture.fromURL = function (url, options) {
        var resourceOptions = Object.assign({ autoLoad: false }, options === null || options === void 0 ? void 0 : options.resourceOptions);
        var texture = Texture.from(url, Object.assign({ resourceOptions: resourceOptions }, options), false);
        var resource = texture.baseTexture.resource;
        // The texture was already loaded
        if (texture.baseTexture.valid) {
            return Promise.resolve(texture);
        }
        // Manually load the texture, this should allow users to handle load errors
        return resource.load().then(function () { return Promise.resolve(texture); });
    };
    /**
     * Create a new Texture with a BufferResource from a Float32Array.
     * RGBA values are floats from 0 to 1.
     * @static
     * @param {Float32Array|Uint8Array} buffer - The optional array to use, if no data
     *        is provided, a new Float32Array is created.
     * @param {number} width - Width of the resource
     * @param {number} height - Height of the resource
     * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
     * @return {PIXI.Texture} The resulting new BaseTexture
     */
    Texture.fromBuffer = function (buffer, width, height, options) {
        return new Texture(BaseTexture.fromBuffer(buffer, width, height, options));
    };
    /**
     * Create a texture from a source and add to the cache.
     *
     * @static
     * @param {HTMLImageElement|HTMLCanvasElement|string} source - The input source.
     * @param {String} imageUrl - File name of texture, for cache and resolving resolution.
     * @param {String} [name] - Human readable name for the texture cache. If no name is
     *        specified, only `imageUrl` will be used as the cache ID.
     * @return {PIXI.Texture} Output texture
     */
    Texture.fromLoader = function (source, imageUrl, name, options) {
        var baseTexture = new BaseTexture(source, Object.assign({
            scaleMode: _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].SCALE_MODE,
            resolution: Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["getResolutionOfUrl"])(imageUrl),
        }, options));
        var resource = baseTexture.resource;
        if (resource instanceof ImageResource) {
            resource.url = imageUrl;
        }
        var texture = new Texture(baseTexture);
        // No name, use imageUrl instead
        if (!name) {
            name = imageUrl;
        }
        // lets also add the frame to pixi's global cache for 'fromLoader' function
        BaseTexture.addToCache(texture.baseTexture, name);
        Texture.addToCache(texture, name);
        // also add references by url if they are different.
        if (name !== imageUrl) {
            BaseTexture.addToCache(texture.baseTexture, imageUrl);
            Texture.addToCache(texture, imageUrl);
        }
        // Generally images are valid right away
        if (texture.baseTexture.valid) {
            return Promise.resolve(texture);
        }
        // SVG assets need to be parsed async, let's wait
        return new Promise(function (resolve) {
            texture.baseTexture.once('loaded', function () { return resolve(texture); });
        });
    };
    /**
     * Adds a Texture to the global TextureCache. This cache is shared across the whole PIXI object.
     *
     * @static
     * @param {PIXI.Texture} texture - The Texture to add to the cache.
     * @param {string} id - The id that the Texture will be stored against.
     */
    Texture.addToCache = function (texture, id) {
        if (id) {
            if (texture.textureCacheIds.indexOf(id) === -1) {
                texture.textureCacheIds.push(id);
            }
            if (_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["TextureCache"][id]) {
                // eslint-disable-next-line no-console
                console.warn("Texture added to the cache with an id [" + id + "] that already had an entry");
            }
            _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["TextureCache"][id] = texture;
        }
    };
    /**
     * Remove a Texture from the global TextureCache.
     *
     * @static
     * @param {string|PIXI.Texture} texture - id of a Texture to be removed, or a Texture instance itself
     * @return {PIXI.Texture|null} The Texture that was removed
     */
    Texture.removeFromCache = function (texture) {
        if (typeof texture === 'string') {
            var textureFromCache = _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["TextureCache"][texture];
            if (textureFromCache) {
                var index = textureFromCache.textureCacheIds.indexOf(texture);
                if (index > -1) {
                    textureFromCache.textureCacheIds.splice(index, 1);
                }
                delete _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["TextureCache"][texture];
                return textureFromCache;
            }
        }
        else if (texture && texture.textureCacheIds) {
            for (var i = 0; i < texture.textureCacheIds.length; ++i) {
                // Check that texture matches the one being passed in before deleting it from the cache.
                if (_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["TextureCache"][texture.textureCacheIds[i]] === texture) {
                    delete _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["TextureCache"][texture.textureCacheIds[i]];
                }
            }
            texture.textureCacheIds.length = 0;
            return texture;
        }
        return null;
    };
    Object.defineProperty(Texture.prototype, "resolution", {
        /**
         * Returns resolution of baseTexture
         *
         * @member {number}
         * @readonly
         */
        get: function () {
            return this.baseTexture.resolution;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "frame", {
        /**
         * The frame specifies the region of the base texture that this texture uses.
         * Please call `updateUvs()` after you change coordinates of `frame` manually.
         *
         * @member {PIXI.Rectangle}
         */
        get: function () {
            return this._frame;
        },
        set: function (frame) {
            this._frame = frame;
            this.noFrame = false;
            var x = frame.x, y = frame.y, width = frame.width, height = frame.height;
            var xNotFit = x + width > this.baseTexture.width;
            var yNotFit = y + height > this.baseTexture.height;
            if (xNotFit || yNotFit) {
                var relationship = xNotFit && yNotFit ? 'and' : 'or';
                var errorX = "X: " + x + " + " + width + " = " + (x + width) + " > " + this.baseTexture.width;
                var errorY = "Y: " + y + " + " + height + " = " + (y + height) + " > " + this.baseTexture.height;
                throw new Error('Texture Error: frame does not fit inside the base Texture dimensions: '
                    + (errorX + " " + relationship + " " + errorY));
            }
            this.valid = width && height && this.baseTexture.valid;
            if (!this.trim && !this.rotate) {
                this.orig = frame;
            }
            if (this.valid) {
                this.updateUvs();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "rotate", {
        /**
         * Indicates whether the texture is rotated inside the atlas
         * set to 2 to compensate for texture packer rotation
         * set to 6 to compensate for spine packer rotation
         * can be used to rotate or mirror sprites
         * See {@link PIXI.groupD8} for explanation
         *
         * @member {number}
         */
        get: function () {
            return this._rotate;
        },
        set: function (rotate) {
            this._rotate = rotate;
            if (this.valid) {
                this.updateUvs();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "width", {
        /**
         * The width of the Texture in pixels.
         *
         * @member {number}
         */
        get: function () {
            return this.orig.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "height", {
        /**
         * The height of the Texture in pixels.
         *
         * @member {number}
         */
        get: function () {
            return this.orig.height;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Utility function for BaseTexture|Texture cast
     */
    Texture.prototype.castToBaseTexture = function () {
        return this.baseTexture;
    };
    return Texture;
}(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]));
function createWhiteTexture() {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, 16, 16);
    return new Texture(new BaseTexture(new CanvasResource(canvas)));
}
function removeAllHandlers(tex) {
    tex.destroy = function _emptyDestroy() { };
    tex.on = function _emptyOn() { };
    tex.once = function _emptyOnce() { };
    tex.emit = function _emptyEmit() { };
}
/**
 * An empty texture, used often to not have to create multiple empty textures.
 * Can not be destroyed.
 *
 * @static
 * @constant
 * @member {PIXI.Texture}
 */
Texture.EMPTY = new Texture(new BaseTexture());
removeAllHandlers(Texture.EMPTY);
removeAllHandlers(Texture.EMPTY.baseTexture);
/**
 * A white texture of 16x16 size, used for graphics and other things
 * Can not be destroyed.
 *
 * @static
 * @constant
 * @member {PIXI.Texture}
 */
Texture.WHITE = createWhiteTexture();
removeAllHandlers(Texture.WHITE);
removeAllHandlers(Texture.WHITE.baseTexture);

/**
 * A RenderTexture is a special texture that allows any PixiJS display object to be rendered to it.
 *
 * __Hint__: All DisplayObjects (i.e. Sprites) that render to a RenderTexture should be preloaded
 * otherwise black rectangles will be drawn instead.
 *
 * __Hint-2__: The actual memory allocation will happen on first render.
 * You shouldn't create renderTextures each frame just to delete them after, try to reuse them.
 *
 * A RenderTexture takes a snapshot of any Display Object given to its render method. For example:
 *
 * ```js
 * let renderer = PIXI.autoDetectRenderer();
 * let renderTexture = PIXI.RenderTexture.create({ width: 800, height: 600 });
 * let sprite = PIXI.Sprite.from("spinObj_01.png");
 *
 * sprite.position.x = 800/2;
 * sprite.position.y = 600/2;
 * sprite.anchor.x = 0.5;
 * sprite.anchor.y = 0.5;
 *
 * renderer.render(sprite, {renderTexture});
 * ```
 * Note that you should not create a new renderer, but reuse the same one as the rest of the application.
 *
 * The Sprite in this case will be rendered using its local transform. To render this sprite at 0,0
 * you can clear the transform
 *
 * ```js
 *
 * sprite.setTransform()
 *
 * let renderTexture = new PIXI.RenderTexture.create({ width: 100, height: 100 });
 *
 * renderer.render(sprite, {renderTexture});  // Renders to center of RenderTexture
 * ```
 *
 * @class
 * @extends PIXI.Texture
 * @memberof PIXI
 */
var RenderTexture = /** @class */ (function (_super) {
    __extends(RenderTexture, _super);
    /**
     * @param {PIXI.BaseRenderTexture} baseRenderTexture - The base texture object that this texture uses
     * @param {PIXI.Rectangle} [frame] - The rectangle frame of the texture to show
     */
    function RenderTexture(baseRenderTexture, frame) {
        var _this = _super.call(this, baseRenderTexture, frame) || this;
        /**
         * This will let the renderer know if the texture is valid. If it's not then it cannot be rendered.
         *
         * @member {boolean}
         */
        _this.valid = true;
        /**
         * Stores `sourceFrame` when this texture is inside current filter stack.
         * You can read it inside filters.
         *
         * @readonly
         * @member {PIXI.Rectangle}
         */
        _this.filterFrame = null;
        /**
         * The key for pooled texture of FilterSystem
         * @protected
         * @member {string}
         */
        _this.filterPoolKey = null;
        _this.updateUvs();
        return _this;
    }
    Object.defineProperty(RenderTexture.prototype, "framebuffer", {
        /**
         * Shortcut to `this.baseTexture.framebuffer`, saves baseTexture cast.
         * @member {PIXI.Framebuffer}
         * @readonly
         */
        get: function () {
            return this.baseTexture.framebuffer;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Resizes the RenderTexture.
     *
     * @param {number} width - The width to resize to.
     * @param {number} height - The height to resize to.
     * @param {boolean} [resizeBaseTexture=true] - Should the baseTexture.width and height values be resized as well?
     */
    RenderTexture.prototype.resize = function (width, height, resizeBaseTexture) {
        if (resizeBaseTexture === void 0) { resizeBaseTexture = true; }
        width = Math.ceil(width);
        height = Math.ceil(height);
        // TODO - could be not required..
        this.valid = (width > 0 && height > 0);
        this._frame.width = this.orig.width = width;
        this._frame.height = this.orig.height = height;
        if (resizeBaseTexture) {
            this.baseTexture.resize(width, height);
        }
        this.updateUvs();
    };
    /**
     * Changes the resolution of baseTexture, but does not change framebuffer size.
     *
     * @param {number} resolution - The new resolution to apply to RenderTexture
     */
    RenderTexture.prototype.setResolution = function (resolution) {
        var baseTexture = this.baseTexture;
        if (baseTexture.resolution === resolution) {
            return;
        }
        baseTexture.setResolution(resolution);
        this.resize(baseTexture.width, baseTexture.height, false);
    };
    RenderTexture.create = function (options) {
        var arguments$1 = arguments;

        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments$1[_i];
        }
        // @deprecated fallback, old-style: create(width, height, scaleMode, resolution)
        if (typeof options === 'number') {
            Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["deprecation"])('6.0.0', 'Arguments (width, height, scaleMode, resolution) have been deprecated.');
            /* eslint-disable prefer-rest-params */
            options = {
                width: options,
                height: rest[0],
                scaleMode: rest[1],
                resolution: rest[2],
            };
            /* eslint-enable prefer-rest-params */
        }
        return new RenderTexture(new BaseRenderTexture(options));
    };
    return RenderTexture;
}(Texture));

/**
 * Experimental!
 *
 * Texture pool, used by FilterSystem and plugins
 * Stores collection of temporary pow2 or screen-sized renderTextures
 *
 * If you use custom RenderTexturePool for your filters, you can use methods
 * `getFilterTexture` and `returnFilterTexture` same as in
 *
 * @class
 * @memberof PIXI
 */
var RenderTexturePool = /** @class */ (function () {
    /**
     * @param {object} [textureOptions] - options that will be passed to BaseRenderTexture constructor
     * @param {PIXI.SCALE_MODES} [textureOptions.scaleMode] - See {@link PIXI.SCALE_MODES} for possible values.
     */
    function RenderTexturePool(textureOptions) {
        this.texturePool = {};
        this.textureOptions = textureOptions || {};
        /**
         * Allow renderTextures of the same size as screen, not just pow2
         *
         * Automatically sets to true after `setScreenSize`
         *
         * @member {boolean}
         * @default false
         */
        this.enableFullScreen = false;
        this._pixelsWidth = 0;
        this._pixelsHeight = 0;
    }
    /**
     * creates of texture with params that were specified in pool constructor
     *
     * @param {number} realWidth - width of texture in pixels
     * @param {number} realHeight - height of texture in pixels
     * @returns {RenderTexture}
     */
    RenderTexturePool.prototype.createTexture = function (realWidth, realHeight) {
        var baseRenderTexture = new BaseRenderTexture(Object.assign({
            width: realWidth,
            height: realHeight,
            resolution: 1,
        }, this.textureOptions));
        return new RenderTexture(baseRenderTexture);
    };
    /**
     * Gets a Power-of-Two render texture or fullScreen texture
     *
     * @protected
     * @param {number} minWidth - The minimum width of the render texture in real pixels.
     * @param {number} minHeight - The minimum height of the render texture in real pixels.
     * @param {number} [resolution=1] - The resolution of the render texture.
     * @return {PIXI.RenderTexture} The new render texture.
     */
    RenderTexturePool.prototype.getOptimalTexture = function (minWidth, minHeight, resolution) {
        if (resolution === void 0) { resolution = 1; }
        var key = RenderTexturePool.SCREEN_KEY;
        minWidth *= resolution;
        minHeight *= resolution;
        if (!this.enableFullScreen || minWidth !== this._pixelsWidth || minHeight !== this._pixelsHeight) {
            minWidth = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["nextPow2"])(minWidth);
            minHeight = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["nextPow2"])(minHeight);
            key = ((minWidth & 0xFFFF) << 16) | (minHeight & 0xFFFF);
        }
        if (!this.texturePool[key]) {
            this.texturePool[key] = [];
        }
        var renderTexture = this.texturePool[key].pop();
        if (!renderTexture) {
            renderTexture = this.createTexture(minWidth, minHeight);
        }
        renderTexture.filterPoolKey = key;
        renderTexture.setResolution(resolution);
        return renderTexture;
    };
    /**
     * Gets extra texture of the same size as input renderTexture
     *
     * `getFilterTexture(input, 0.5)` or `getFilterTexture(0.5, input)`
     *
     * @param {PIXI.RenderTexture} input - renderTexture from which size and resolution will be copied
     * @param {number} [resolution] - override resolution of the renderTexture
     *  It overrides, it does not multiply
     * @returns {PIXI.RenderTexture}
     */
    RenderTexturePool.prototype.getFilterTexture = function (input, resolution) {
        var filterTexture = this.getOptimalTexture(input.width, input.height, resolution || input.resolution);
        filterTexture.filterFrame = input.filterFrame;
        return filterTexture;
    };
    /**
     * Place a render texture back into the pool.
     * @param {PIXI.RenderTexture} renderTexture - The renderTexture to free
     */
    RenderTexturePool.prototype.returnTexture = function (renderTexture) {
        var key = renderTexture.filterPoolKey;
        renderTexture.filterFrame = null;
        this.texturePool[key].push(renderTexture);
    };
    /**
     * Alias for returnTexture, to be compliant with FilterSystem interface
     * @param {PIXI.RenderTexture} renderTexture - The renderTexture to free
     */
    RenderTexturePool.prototype.returnFilterTexture = function (renderTexture) {
        this.returnTexture(renderTexture);
    };
    /**
     * Clears the pool
     *
     * @param {boolean} [destroyTextures=true] - destroy all stored textures
     */
    RenderTexturePool.prototype.clear = function (destroyTextures) {
        destroyTextures = destroyTextures !== false;
        if (destroyTextures) {
            for (var i in this.texturePool) {
                var textures = this.texturePool[i];
                if (textures) {
                    for (var j = 0; j < textures.length; j++) {
                        textures[j].destroy(true);
                    }
                }
            }
        }
        this.texturePool = {};
    };
    /**
     * If screen size was changed, drops all screen-sized textures,
     * sets new screen size, sets `enableFullScreen` to true
     *
     * Size is measured in pixels, `renderer.view` can be passed here, not `renderer.screen`
     *
     * @param {PIXI.ISize} size - Initial size of screen
     */
    RenderTexturePool.prototype.setScreenSize = function (size) {
        if (size.width === this._pixelsWidth
            && size.height === this._pixelsHeight) {
            return;
        }
        var screenKey = RenderTexturePool.SCREEN_KEY;
        var textures = this.texturePool[screenKey];
        this.enableFullScreen = size.width > 0 && size.height > 0;
        if (textures) {
            for (var j = 0; j < textures.length; j++) {
                textures[j].destroy(true);
            }
        }
        this.texturePool[screenKey] = [];
        this._pixelsWidth = size.width;
        this._pixelsHeight = size.height;
    };
    /**
     * Key that is used to store fullscreen renderTextures in a pool
     *
     * @static
     * @const {string}
     */
    RenderTexturePool.SCREEN_KEY = 'screen';
    return RenderTexturePool;
}());

/* eslint-disable max-len */
/**
 * Holds the information for a single attribute structure required to render geometry.
 *
 * This does not contain the actual data, but instead has a buffer id that maps to a {@link PIXI.Buffer}
 * This can include anything from positions, uvs, normals, colors etc.
 *
 * @class
 * @memberof PIXI
 */
var Attribute = /** @class */ (function () {
    /**
     * @param {string} buffer - the id of the buffer that this attribute will look for
     * @param {Number} [size=0] - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2.
     * @param {Boolean} [normalized=false] - should the data be normalized.
     * @param {Number} [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
     * @param {Number} [stride=0] - How far apart (in floats) the start of each value is. (used for interleaving data)
     * @param {Number} [start=0] - How far into the array to start reading values (used for interleaving data)
     */
    function Attribute(buffer, size, normalized, type, stride, start, instance) {
        if (size === void 0) { size = 0; }
        if (normalized === void 0) { normalized = false; }
        if (type === void 0) { type = 5126; }
        this.buffer = buffer;
        this.size = size;
        this.normalized = normalized;
        this.type = type;
        this.stride = stride;
        this.start = start;
        this.instance = instance;
    }
    /**
     * Destroys the Attribute.
     */
    Attribute.prototype.destroy = function () {
        this.buffer = null;
    };
    /**
     * Helper function that creates an Attribute based on the information provided
     *
     * @static
     * @param {string} buffer - the id of the buffer that this attribute will look for
     * @param {Number} [size=0] - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
     * @param {Boolean} [normalized=false] - should the data be normalized.
     * @param {Number} [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
     * @param {Number} [stride=0] - How far apart (in floats) the start of each value is. (used for interleaving data)
     *
     * @returns {PIXI.Attribute} A new {@link PIXI.Attribute} based on the information provided
     */
    Attribute.from = function (buffer, size, normalized, type, stride) {
        return new Attribute(buffer, size, normalized, type, stride);
    };
    return Attribute;
}());

var UID = 0;
/**
 * A wrapper for data so that it can be used and uploaded by WebGL
 *
 * @class
 * @memberof PIXI
 */
var Buffer = /** @class */ (function () {
    /**
     * @param {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} data - the data to store in the buffer.
     * @param {boolean} [_static=true] - `true` for static buffer
     * @param {boolean} [index=false] - `true` for index buffer
     */
    function Buffer(data, _static, index) {
        if (_static === void 0) { _static = true; }
        if (index === void 0) { index = false; }
        /**
         * The data in the buffer, as a typed array
         *
         * @member {ArrayBuffer| SharedArrayBuffer | ArrayBufferView}
         */
        this.data = (data || new Float32Array(1));
        /**
         * A map of renderer IDs to webgl buffer
         *
         * @private
         * @member {object<number, GLBuffer>}
         */
        this._glBuffers = {};
        this._updateID = 0;
        this.index = index;
        this.static = _static;
        this.id = UID++;
        this.disposeRunner = new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('disposeBuffer');
    }
    // TODO could explore flagging only a partial upload?
    /**
     * flags this buffer as requiring an upload to the GPU
     * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView} [data] - the data to update in the buffer.
     */
    Buffer.prototype.update = function (data) {
        this.data = data || this.data;
        this._updateID++;
    };
    /**
     * disposes WebGL resources that are connected to this geometry
     */
    Buffer.prototype.dispose = function () {
        this.disposeRunner.emit(this, false);
    };
    /**
     * Destroys the buffer
     */
    Buffer.prototype.destroy = function () {
        this.dispose();
        this.data = null;
    };
    /**
     * Helper function that creates a buffer based on an array or TypedArray
     *
     * @static
     * @param {ArrayBufferView | number[]} data - the TypedArray that the buffer will store. If this is a regular Array it will be converted to a Float32Array.
     * @return {PIXI.Buffer} A new Buffer based on the data provided.
     */
    Buffer.from = function (data) {
        if (data instanceof Array) {
            data = new Float32Array(data);
        }
        return new Buffer(data);
    };
    return Buffer;
}());

function getBufferType(array) {
    if (array.BYTES_PER_ELEMENT === 4) {
        if (array instanceof Float32Array) {
            return 'Float32Array';
        }
        else if (array instanceof Uint32Array) {
            return 'Uint32Array';
        }
        return 'Int32Array';
    }
    else if (array.BYTES_PER_ELEMENT === 2) {
        if (array instanceof Uint16Array) {
            return 'Uint16Array';
        }
    }
    else if (array.BYTES_PER_ELEMENT === 1) {
        if (array instanceof Uint8Array) {
            return 'Uint8Array';
        }
    }
    // TODO map out the rest of the array elements!
    return null;
}

/* eslint-disable object-shorthand */
var map = {
    Float32Array: Float32Array,
    Uint32Array: Uint32Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
};
function interleaveTypedArrays(arrays, sizes) {
    var outSize = 0;
    var stride = 0;
    var views = {};
    for (var i = 0; i < arrays.length; i++) {
        stride += sizes[i];
        outSize += arrays[i].length;
    }
    var buffer = new ArrayBuffer(outSize * 4);
    var out = null;
    var littleOffset = 0;
    for (var i = 0; i < arrays.length; i++) {
        var size = sizes[i];
        var array = arrays[i];
        var type = getBufferType(array);
        if (!views[type]) {
            views[type] = new map[type](buffer);
        }
        out = views[type];
        for (var j = 0; j < array.length; j++) {
            var indexStart = ((j / size | 0) * stride) + littleOffset;
            var index = j % size;
            out[indexStart + index] = array[j];
        }
        littleOffset += size;
    }
    return new Float32Array(buffer);
}

var byteSizeMap = { 5126: 4, 5123: 2, 5121: 1 };
var UID$1 = 0;
/* eslint-disable object-shorthand */
var map$1 = {
    Float32Array: Float32Array,
    Uint32Array: Uint32Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
};
/* eslint-disable max-len */
/**
 * The Geometry represents a model. It consists of two components:
 * - GeometryStyle - The structure of the model such as the attributes layout
 * - GeometryData - the data of the model - this consists of buffers.
 * This can include anything from positions, uvs, normals, colors etc.
 *
 * Geometry can be defined without passing in a style or data if required (thats how I prefer!)
 *
 * ```js
 * let geometry = new PIXI.Geometry();
 *
 * geometry.addAttribute('positions', [0, 0, 100, 0, 100, 100, 0, 100], 2);
 * geometry.addAttribute('uvs', [0,0,1,0,1,1,0,1],2)
 * geometry.addIndex([0,1,2,1,3,2])
 *
 * ```
 * @class
 * @memberof PIXI
 */
var Geometry = /** @class */ (function () {
    /**
     * @param {PIXI.Buffer[]} [buffers] - an array of buffers. optional.
     * @param {object} [attributes] - of the geometry, optional structure of the attributes layout
     */
    function Geometry(buffers, attributes) {
        if (buffers === void 0) { buffers = []; }
        if (attributes === void 0) { attributes = {}; }
        this.buffers = buffers;
        this.indexBuffer = null;
        this.attributes = attributes;
        /**
         * A map of renderer IDs to webgl VAOs
         *
         * @protected
         * @type {object}
         */
        this.glVertexArrayObjects = {};
        this.id = UID$1++;
        this.instanced = false;
        /**
         * Number of instances in this geometry, pass it to `GeometrySystem.draw()`
         * @member {number}
         * @default 1
         */
        this.instanceCount = 1;
        this.disposeRunner = new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('disposeGeometry');
        /**
         * Count of existing (not destroyed) meshes that reference this geometry
         * @member {number}
         */
        this.refCount = 0;
    }
    /**
    *
    * Adds an attribute to the geometry
    * Note: `stride` and `start` should be `undefined` if you dont know them, not 0!
    *
    * @param {String} id - the name of the attribute (matching up to a shader)
    * @param {PIXI.Buffer|number[]} buffer - the buffer that holds the data of the attribute . You can also provide an Array and a buffer will be created from it.
    * @param {Number} [size=0] - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
    * @param {Boolean} [normalized=false] - should the data be normalized.
    * @param {Number} [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {PIXI.TYPES} to see the ones available
    * @param {Number} [stride] - How far apart (in floats) the start of each value is. (used for interleaving data)
    * @param {Number} [start] - How far into the array to start reading values (used for interleaving data)
    * @param {boolean} [instance=false] - Instancing flag
    *
    * @return {PIXI.Geometry} returns self, useful for chaining.
    */
    Geometry.prototype.addAttribute = function (id, buffer, size, normalized, type, stride, start, instance) {
        if (size === void 0) { size = 0; }
        if (normalized === void 0) { normalized = false; }
        if (instance === void 0) { instance = false; }
        if (!buffer) {
            throw new Error('You must pass a buffer when creating an attribute');
        }
        // check if this is a buffer!
        if (!(buffer instanceof Buffer)) {
            // its an array!
            if (buffer instanceof Array) {
                buffer = new Float32Array(buffer);
            }
            buffer = new Buffer(buffer);
        }
        var ids = id.split('|');
        if (ids.length > 1) {
            for (var i = 0; i < ids.length; i++) {
                this.addAttribute(ids[i], buffer, size, normalized, type);
            }
            return this;
        }
        var bufferIndex = this.buffers.indexOf(buffer);
        if (bufferIndex === -1) {
            this.buffers.push(buffer);
            bufferIndex = this.buffers.length - 1;
        }
        this.attributes[id] = new Attribute(bufferIndex, size, normalized, type, stride, start, instance);
        // assuming that if there is instanced data then this will be drawn with instancing!
        this.instanced = this.instanced || instance;
        return this;
    };
    /**
     * returns the requested attribute
     *
     * @param {String} id - the name of the attribute required
     * @return {PIXI.Attribute} the attribute requested.
     */
    Geometry.prototype.getAttribute = function (id) {
        return this.attributes[id];
    };
    /**
     * returns the requested buffer
     *
     * @param {String} id - the name of the buffer required
     * @return {PIXI.Buffer} the buffer requested.
     */
    Geometry.prototype.getBuffer = function (id) {
        return this.buffers[this.getAttribute(id).buffer];
    };
    /**
    *
    * Adds an index buffer to the geometry
    * The index buffer contains integers, three for each triangle in the geometry, which reference the various attribute buffers (position, colour, UV coordinates, other UV coordinates, normal, …). There is only ONE index buffer.
    *
    * @param {PIXI.Buffer|number[]} [buffer] - the buffer that holds the data of the index buffer. You can also provide an Array and a buffer will be created from it.
    * @return {PIXI.Geometry} returns self, useful for chaining.
    */
    Geometry.prototype.addIndex = function (buffer) {
        if (!(buffer instanceof Buffer)) {
            // its an array!
            if (buffer instanceof Array) {
                buffer = new Uint16Array(buffer);
            }
            buffer = new Buffer(buffer);
        }
        buffer.index = true;
        this.indexBuffer = buffer;
        if (this.buffers.indexOf(buffer) === -1) {
            this.buffers.push(buffer);
        }
        return this;
    };
    /**
     * returns the index buffer
     *
     * @return {PIXI.Buffer} the index buffer.
     */
    Geometry.prototype.getIndex = function () {
        return this.indexBuffer;
    };
    /**
     * this function modifies the structure so that all current attributes become interleaved into a single buffer
     * This can be useful if your model remains static as it offers a little performance boost
     *
     * @return {PIXI.Geometry} returns self, useful for chaining.
     */
    Geometry.prototype.interleave = function () {
        // a simple check to see if buffers are already interleaved..
        if (this.buffers.length === 1 || (this.buffers.length === 2 && this.indexBuffer))
            { return this; }
        // assume already that no buffers are interleaved
        var arrays = [];
        var sizes = [];
        var interleavedBuffer = new Buffer();
        var i;
        for (i in this.attributes) {
            var attribute = this.attributes[i];
            var buffer = this.buffers[attribute.buffer];
            arrays.push(buffer.data);
            sizes.push((attribute.size * byteSizeMap[attribute.type]) / 4);
            attribute.buffer = 0;
        }
        interleavedBuffer.data = interleaveTypedArrays(arrays, sizes);
        for (i = 0; i < this.buffers.length; i++) {
            if (this.buffers[i] !== this.indexBuffer) {
                this.buffers[i].destroy();
            }
        }
        this.buffers = [interleavedBuffer];
        if (this.indexBuffer) {
            this.buffers.push(this.indexBuffer);
        }
        return this;
    };
    Geometry.prototype.getSize = function () {
        for (var i in this.attributes) {
            var attribute = this.attributes[i];
            var buffer = this.buffers[attribute.buffer];
            return buffer.data.length / ((attribute.stride / 4) || attribute.size);
        }
        return 0;
    };
    /**
     * disposes WebGL resources that are connected to this geometry
     */
    Geometry.prototype.dispose = function () {
        this.disposeRunner.emit(this, false);
    };
    /**
     * Destroys the geometry.
     */
    Geometry.prototype.destroy = function () {
        this.dispose();
        this.buffers = null;
        this.indexBuffer = null;
        this.attributes = null;
    };
    /**
     * returns a clone of the geometry
     *
     * @returns {PIXI.Geometry} a new clone of this geometry
     */
    Geometry.prototype.clone = function () {
        var geometry = new Geometry();
        for (var i = 0; i < this.buffers.length; i++) {
            geometry.buffers[i] = new Buffer(this.buffers[i].data.slice(0));
        }
        for (var i in this.attributes) {
            var attrib = this.attributes[i];
            geometry.attributes[i] = new Attribute(attrib.buffer, attrib.size, attrib.normalized, attrib.type, attrib.stride, attrib.start, attrib.instance);
        }
        if (this.indexBuffer) {
            geometry.indexBuffer = geometry.buffers[this.buffers.indexOf(this.indexBuffer)];
            geometry.indexBuffer.index = true;
        }
        return geometry;
    };
    /**
     * merges an array of geometries into a new single one
     * geometry attribute styles must match for this operation to work
     *
     * @param {PIXI.Geometry[]} geometries - array of geometries to merge
     * @returns {PIXI.Geometry} shiny new geometry!
     */
    Geometry.merge = function (geometries) {
        // todo add a geometry check!
        // also a size check.. cant be too big!]
        var geometryOut = new Geometry();
        var arrays = [];
        var sizes = [];
        var offsets = [];
        var geometry;
        // pass one.. get sizes..
        for (var i = 0; i < geometries.length; i++) {
            geometry = geometries[i];
            for (var j = 0; j < geometry.buffers.length; j++) {
                sizes[j] = sizes[j] || 0;
                sizes[j] += geometry.buffers[j].data.length;
                offsets[j] = 0;
            }
        }
        // build the correct size arrays..
        for (var i = 0; i < geometry.buffers.length; i++) {
            // TODO types!
            arrays[i] = new map$1[getBufferType(geometry.buffers[i].data)](sizes[i]);
            geometryOut.buffers[i] = new Buffer(arrays[i]);
        }
        // pass to set data..
        for (var i = 0; i < geometries.length; i++) {
            geometry = geometries[i];
            for (var j = 0; j < geometry.buffers.length; j++) {
                arrays[j].set(geometry.buffers[j].data, offsets[j]);
                offsets[j] += geometry.buffers[j].data.length;
            }
        }
        geometryOut.attributes = geometry.attributes;
        if (geometry.indexBuffer) {
            geometryOut.indexBuffer = geometryOut.buffers[geometry.buffers.indexOf(geometry.indexBuffer)];
            geometryOut.indexBuffer.index = true;
            var offset = 0;
            var stride = 0;
            var offset2 = 0;
            var bufferIndexToCount = 0;
            // get a buffer
            for (var i = 0; i < geometry.buffers.length; i++) {
                if (geometry.buffers[i] !== geometry.indexBuffer) {
                    bufferIndexToCount = i;
                    break;
                }
            }
            // figure out the stride of one buffer..
            for (var i in geometry.attributes) {
                var attribute = geometry.attributes[i];
                if ((attribute.buffer | 0) === bufferIndexToCount) {
                    stride += ((attribute.size * byteSizeMap[attribute.type]) / 4);
                }
            }
            // time to off set all indexes..
            for (var i = 0; i < geometries.length; i++) {
                var indexBufferData = geometries[i].indexBuffer.data;
                for (var j = 0; j < indexBufferData.length; j++) {
                    geometryOut.indexBuffer.data[j + offset2] += offset;
                }
                offset += geometry.buffers[bufferIndexToCount].data.length / (stride);
                offset2 += indexBufferData.length;
            }
        }
        return geometryOut;
    };
    return Geometry;
}());

/**
 * Helper class to create a quad
 *
 * @class
 * @memberof PIXI
 */
var Quad = /** @class */ (function (_super) {
    __extends(Quad, _super);
    function Quad() {
        var _this = _super.call(this) || this;
        _this.addAttribute('aVertexPosition', new Float32Array([
            0, 0,
            1, 0,
            1, 1,
            0, 1 ]))
            .addIndex([0, 1, 3, 2]);
        return _this;
    }
    return Quad;
}(Geometry));

/**
 * Helper class to create a quad with uvs like in v4
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.Geometry
 */
var QuadUv = /** @class */ (function (_super) {
    __extends(QuadUv, _super);
    function QuadUv() {
        var _this = _super.call(this) || this;
        /**
         * An array of vertices
         *
         * @member {Float32Array}
         */
        _this.vertices = new Float32Array([
            -1, -1,
            1, -1,
            1, 1,
            -1, 1 ]);
        /**
         * The Uvs of the quad
         *
         * @member {Float32Array}
         */
        _this.uvs = new Float32Array([
            0, 0,
            1, 0,
            1, 1,
            0, 1 ]);
        _this.vertexBuffer = new Buffer(_this.vertices);
        _this.uvBuffer = new Buffer(_this.uvs);
        _this.addAttribute('aVertexPosition', _this.vertexBuffer)
            .addAttribute('aTextureCoord', _this.uvBuffer)
            .addIndex([0, 1, 2, 0, 2, 3]);
        return _this;
    }
    /**
     * Maps two Rectangle to the quad.
     *
     * @param {PIXI.Rectangle} targetTextureFrame - the first rectangle
     * @param {PIXI.Rectangle} destinationFrame - the second rectangle
     * @return {PIXI.Quad} Returns itself.
     */
    QuadUv.prototype.map = function (targetTextureFrame, destinationFrame) {
        var x = 0; // destinationFrame.x / targetTextureFrame.width;
        var y = 0; // destinationFrame.y / targetTextureFrame.height;
        this.uvs[0] = x;
        this.uvs[1] = y;
        this.uvs[2] = x + (destinationFrame.width / targetTextureFrame.width);
        this.uvs[3] = y;
        this.uvs[4] = x + (destinationFrame.width / targetTextureFrame.width);
        this.uvs[5] = y + (destinationFrame.height / targetTextureFrame.height);
        this.uvs[6] = x;
        this.uvs[7] = y + (destinationFrame.height / targetTextureFrame.height);
        x = destinationFrame.x;
        y = destinationFrame.y;
        this.vertices[0] = x;
        this.vertices[1] = y;
        this.vertices[2] = x + destinationFrame.width;
        this.vertices[3] = y;
        this.vertices[4] = x + destinationFrame.width;
        this.vertices[5] = y + destinationFrame.height;
        this.vertices[6] = x;
        this.vertices[7] = y + destinationFrame.height;
        this.invalidate();
        return this;
    };
    /**
     * legacy upload method, just marks buffers dirty
     * @returns {PIXI.QuadUv} Returns itself.
     */
    QuadUv.prototype.invalidate = function () {
        this.vertexBuffer._updateID++;
        this.uvBuffer._updateID++;
        return this;
    };
    return QuadUv;
}(Geometry));

var UID$2 = 0;
/**
 * Uniform group holds uniform map and some ID's for work
 *
 * @class
 * @memberof PIXI
 */
var UniformGroup = /** @class */ (function () {
    /**
     * @param {object} [uniforms] - Custom uniforms to use to augment the built-in ones.
     * @param {boolean} [_static] - Uniforms wont be changed after creation
     */
    function UniformGroup(uniforms, _static) {
        /**
         * uniform values
         * @member {object}
         * @readonly
         */
        this.uniforms = uniforms;
        /**
         * Its a group and not a single uniforms
         * @member {boolean}
         * @readonly
         * @default true
         */
        this.group = true;
        // lets generate this when the shader ?
        this.syncUniforms = {};
        /**
         * dirty version
         * @protected
         * @member {number}
         */
        this.dirtyId = 0;
        /**
         * unique id
         * @protected
         * @member {number}
         */
        this.id = UID$2++;
        /**
         * Uniforms wont be changed after creation
         * @member {boolean}
         */
        this.static = !!_static;
    }
    UniformGroup.prototype.update = function () {
        this.dirtyId++;
    };
    UniformGroup.prototype.add = function (name, uniforms, _static) {
        this.uniforms[name] = new UniformGroup(uniforms, _static);
    };
    UniformGroup.from = function (uniforms, _static) {
        return new UniformGroup(uniforms, _static);
    };
    return UniformGroup;
}());

/**
 * System plugin to the renderer to manage filter states.
 *
 * @class
 * @private
 */
var FilterState = /** @class */ (function () {
    function FilterState() {
        this.renderTexture = null;
        /**
         * Target of the filters
         * We store for case when custom filter wants to know the element it was applied on
         * @member {PIXI.DisplayObject}
         * @private
         */
        this.target = null;
        /**
         * Compatibility with PixiJS v4 filters
         * @member {boolean}
         * @default false
         * @private
         */
        this.legacy = false;
        /**
         * Resolution of filters
         * @member {number}
         * @default 1
         * @private
         */
        this.resolution = 1;
        // next three fields are created only for root
        // re-assigned for everything else
        /**
         * Source frame
         * @member {PIXI.Rectangle}
         * @private
         */
        this.sourceFrame = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
        /**
         * Destination frame
         * @member {PIXI.Rectangle}
         * @private
         */
        this.destinationFrame = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
        /**
         * Original render-target source frame
         * @private
         */
        this.bindingSourceFrame = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
        /**
         * Original render-target destination frame
         * @private
         */
        this.bindingDestinationFrame = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
        /**
         * Collection of filters
         * @member {PIXI.Filter[]}
         * @private
         */
        this.filters = [];
        /**
         * Projection system transform saved by link.
         * @member {PIXI.Matrix}
         * @private
         */
        this.transform = null;
    }
    /**
     * clears the state
     * @private
     */
    FilterState.prototype.clear = function () {
        this.target = null;
        this.filters = null;
        this.renderTexture = null;
    };
    return FilterState;
}());

var tempPoints = [new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Point"](), new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Point"](), new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Point"](), new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Point"]()];
var tempMatrix = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Matrix"]();
/**
 * System plugin to the renderer to manage filters.
 *
 * ## Pipeline
 *
 * The FilterSystem executes the filtering pipeline by rendering the display-object into a texture, applying its
 * [filters]{@link PIXI.Filter} in series, and the last filter outputs into the final render-target.
 *
 * The filter-frame is the rectangle in world space being filtered, and those contents are mapped into
 * `(0, 0, filterFrame.width, filterFrame.height)` into the filter render-texture. The filter-frame is also called
 * the source-frame, as it is used to bind the filter render-textures. The last filter outputs to the `filterFrame`
 * in the final render-target.
 *
 * ## Usage
 *
 * {@link PIXI.Container#renderAdvanced} is an example of how to use the filter system. It is a 3 step process:
 *
 * * **push**: Use {@link PIXI.FilterSystem#push} to push the set of filters to be applied on a filter-target.
 * * **render**: Render the contents to be filtered using the renderer. The filter-system will only capture the contents
 *      inside the bounds of the filter-target. NOTE: Using {@link PIXI.Renderer#render} is
 *      illegal during an existing render cycle, and it may reset the filter system.
 * * **pop**: Use {@link PIXI.FilterSystem#pop} to pop & execute the filters you initially pushed. It will apply them
 *      serially and output to the bounds of the filter-target.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.System
 */
var FilterSystem = /** @class */ (function (_super) {
    __extends(FilterSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function FilterSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * List of filters for the FilterSystem
         * @member {Object[]}
         * @readonly
         */
        _this.defaultFilterStack = [{}];
        /**
         * stores a bunch of PO2 textures used for filtering
         * @member {Object}
         */
        _this.texturePool = new RenderTexturePool();
        _this.texturePool.setScreenSize(renderer.view);
        /**
         * a pool for storing filter states, save us creating new ones each tick
         * @member {Object[]}
         */
        _this.statePool = [];
        /**
         * A very simple geometry used when drawing a filter effect to the screen
         * @member {PIXI.Quad}
         */
        _this.quad = new Quad();
        /**
         * Quad UVs
         * @member {PIXI.QuadUv}
         */
        _this.quadUv = new QuadUv();
        /**
         * Temporary rect for maths
         * @type {PIXI.Rectangle}
         */
        _this.tempRect = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
        /**
         * Active state
         * @member {object}
         */
        _this.activeState = {};
        /**
         * This uniform group is attached to filter uniforms when used
         * @member {PIXI.UniformGroup}
         * @property {PIXI.Rectangle} outputFrame
         * @property {Float32Array} inputSize
         * @property {Float32Array} inputPixel
         * @property {Float32Array} inputClamp
         * @property {Number} resolution
         * @property {Float32Array} filterArea
         * @property {Float32Array} filterClamp
         */
        _this.globalUniforms = new UniformGroup({
            outputFrame: new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"](),
            inputSize: new Float32Array(4),
            inputPixel: new Float32Array(4),
            inputClamp: new Float32Array(4),
            resolution: 1,
            // legacy variables
            filterArea: new Float32Array(4),
            filterClamp: new Float32Array(4),
        }, true);
        /**
         * Whether to clear output renderTexture in AUTO/BLIT mode. See {@link PIXI.CLEAR_MODES}
         * @member {boolean}
         */
        _this.forceClear = false;
        /**
         * Old padding behavior is to use the max amount instead of sum padding.
         * Use this flag if you need the old behavior.
         * @member {boolean}
         * @default false
         */
        _this.useMaxPadding = false;
        return _this;
    }
    /**
     * Pushes a set of filters to be applied later to the system. This will redirect further rendering into an
     * input render-texture for the rest of the filtering pipeline.
     *
     * @param {PIXI.DisplayObject} target - The target of the filter to render.
     * @param {PIXI.Filter[]} filters - The filters to apply.
     */
    FilterSystem.prototype.push = function (target, filters) {
        var renderer = this.renderer;
        var filterStack = this.defaultFilterStack;
        var state = this.statePool.pop() || new FilterState();
        var renderTextureSystem = this.renderer.renderTexture;
        var resolution = filters[0].resolution;
        var padding = filters[0].padding;
        var autoFit = filters[0].autoFit;
        var legacy = filters[0].legacy;
        for (var i = 1; i < filters.length; i++) {
            var filter = filters[i];
            // lets use the lowest resolution..
            resolution = Math.min(resolution, filter.resolution);
            // figure out the padding required for filters
            padding = this.useMaxPadding
                // old behavior: use largest amount of padding!
                ? Math.max(padding, filter.padding)
                // new behavior: sum the padding
                : padding + filter.padding;
            // only auto fit if all filters are autofit
            autoFit = autoFit && filter.autoFit;
            legacy = legacy || filter.legacy;
        }
        if (filterStack.length === 1) {
            this.defaultFilterStack[0].renderTexture = renderTextureSystem.current;
        }
        filterStack.push(state);
        state.resolution = resolution;
        state.legacy = legacy;
        state.target = target;
        state.sourceFrame.copyFrom(target.filterArea || target.getBounds(true));
        state.sourceFrame.pad(padding);
        if (autoFit) {
            var sourceFrameProjected = this.tempRect.copyFrom(renderTextureSystem.sourceFrame);
            // Project source frame into world space (if projection is applied)
            if (renderer.projection.transform) {
                this.transformAABB(tempMatrix.copyFrom(renderer.projection.transform).invert(), sourceFrameProjected);
            }
            state.sourceFrame.fit(sourceFrameProjected);
        }
        // Round sourceFrame in screen space based on render-texture.
        this.roundFrame(state.sourceFrame, renderTextureSystem.current ? renderTextureSystem.current.resolution : renderer.resolution, renderTextureSystem.sourceFrame, renderTextureSystem.destinationFrame, renderer.projection.transform);
        state.renderTexture = this.getOptimalFilterTexture(state.sourceFrame.width, state.sourceFrame.height, resolution);
        state.filters = filters;
        state.destinationFrame.width = state.renderTexture.width;
        state.destinationFrame.height = state.renderTexture.height;
        var destinationFrame = this.tempRect;
        destinationFrame.x = 0;
        destinationFrame.y = 0;
        destinationFrame.width = state.sourceFrame.width;
        destinationFrame.height = state.sourceFrame.height;
        state.renderTexture.filterFrame = state.sourceFrame;
        state.bindingSourceFrame.copyFrom(renderTextureSystem.sourceFrame);
        state.bindingDestinationFrame.copyFrom(renderTextureSystem.destinationFrame);
        state.transform = renderer.projection.transform;
        renderer.projection.transform = null;
        renderTextureSystem.bind(state.renderTexture, state.sourceFrame, destinationFrame);
        renderer.framebuffer.clear(0, 0, 0, 0);
    };
    /**
     * Pops off the filter and applies it.
     */
    FilterSystem.prototype.pop = function () {
        var filterStack = this.defaultFilterStack;
        var state = filterStack.pop();
        var filters = state.filters;
        this.activeState = state;
        var globalUniforms = this.globalUniforms.uniforms;
        globalUniforms.outputFrame = state.sourceFrame;
        globalUniforms.resolution = state.resolution;
        var inputSize = globalUniforms.inputSize;
        var inputPixel = globalUniforms.inputPixel;
        var inputClamp = globalUniforms.inputClamp;
        inputSize[0] = state.destinationFrame.width;
        inputSize[1] = state.destinationFrame.height;
        inputSize[2] = 1.0 / inputSize[0];
        inputSize[3] = 1.0 / inputSize[1];
        inputPixel[0] = inputSize[0] * state.resolution;
        inputPixel[1] = inputSize[1] * state.resolution;
        inputPixel[2] = 1.0 / inputPixel[0];
        inputPixel[3] = 1.0 / inputPixel[1];
        inputClamp[0] = 0.5 * inputPixel[2];
        inputClamp[1] = 0.5 * inputPixel[3];
        inputClamp[2] = (state.sourceFrame.width * inputSize[2]) - (0.5 * inputPixel[2]);
        inputClamp[3] = (state.sourceFrame.height * inputSize[3]) - (0.5 * inputPixel[3]);
        // only update the rect if its legacy..
        if (state.legacy) {
            var filterArea = globalUniforms.filterArea;
            filterArea[0] = state.destinationFrame.width;
            filterArea[1] = state.destinationFrame.height;
            filterArea[2] = state.sourceFrame.x;
            filterArea[3] = state.sourceFrame.y;
            globalUniforms.filterClamp = globalUniforms.inputClamp;
        }
        this.globalUniforms.update();
        var lastState = filterStack[filterStack.length - 1];
        if (state.renderTexture.framebuffer.multisample > 1) {
            this.renderer.framebuffer.blit();
        }
        if (filters.length === 1) {
            filters[0].apply(this, state.renderTexture, lastState.renderTexture, _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["CLEAR_MODES"].BLEND, state);
            this.returnFilterTexture(state.renderTexture);
        }
        else {
            var flip = state.renderTexture;
            var flop = this.getOptimalFilterTexture(flip.width, flip.height, state.resolution);
            flop.filterFrame = flip.filterFrame;
            var i = 0;
            for (i = 0; i < filters.length - 1; ++i) {
                filters[i].apply(this, flip, flop, _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["CLEAR_MODES"].CLEAR, state);
                var t = flip;
                flip = flop;
                flop = t;
            }
            filters[i].apply(this, flip, lastState.renderTexture, _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["CLEAR_MODES"].BLEND, state);
            this.returnFilterTexture(flip);
            this.returnFilterTexture(flop);
        }
        state.clear();
        this.statePool.push(state);
    };
    /**
     * Binds a renderTexture with corresponding `filterFrame`, clears it if mode corresponds.
     *
     * @param {PIXI.RenderTexture} filterTexture - renderTexture to bind, should belong to filter pool or filter stack
     * @param {PIXI.CLEAR_MODES} [clearMode] - clearMode, by default its CLEAR/YES. See {@link PIXI.CLEAR_MODES}
     */
    FilterSystem.prototype.bindAndClear = function (filterTexture, clearMode) {
        if (clearMode === void 0) { clearMode = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["CLEAR_MODES"].CLEAR; }
        var _a = this.renderer, renderTextureSystem = _a.renderTexture, stateSystem = _a.state;
        if (filterTexture === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture) {
            // Restore projection transform if rendering into the output render-target.
            this.renderer.projection.transform = this.activeState.transform;
        }
        else {
            // Prevent projection within filtering pipeline.
            this.renderer.projection.transform = null;
        }
        if (filterTexture && filterTexture.filterFrame) {
            var destinationFrame = this.tempRect;
            destinationFrame.x = 0;
            destinationFrame.y = 0;
            destinationFrame.width = filterTexture.filterFrame.width;
            destinationFrame.height = filterTexture.filterFrame.height;
            renderTextureSystem.bind(filterTexture, filterTexture.filterFrame, destinationFrame);
        }
        else if (filterTexture !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture) {
            renderTextureSystem.bind(filterTexture);
        }
        else {
            // Restore binding for output render-target.
            this.renderer.renderTexture.bind(filterTexture, this.activeState.bindingSourceFrame, this.activeState.bindingDestinationFrame);
        }
        // Clear the texture in BLIT mode if blending is disabled or the forceClear flag is set. The blending
        // is stored in the 0th bit of the state.
        var autoClear = (stateSystem.stateId & 1) || this.forceClear;
        if (clearMode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["CLEAR_MODES"].CLEAR
            || (clearMode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["CLEAR_MODES"].BLIT && autoClear)) {
            // Use framebuffer.clear because we want to clear the whole filter texture, not just the filtering
            // area over which the shaders are run. This is because filters may sampling outside of it (e.g. blur)
            // instead of clamping their arithmetic.
            this.renderer.framebuffer.clear(0, 0, 0, 0);
        }
    };
    /**
     * Draws a filter.
     *
     * @param {PIXI.Filter} filter - The filter to draw.
     * @param {PIXI.RenderTexture} input - The input render target.
     * @param {PIXI.RenderTexture} output - The target to output to.
     * @param {PIXI.CLEAR_MODES} [clearMode] - Should the output be cleared before rendering to it
     */
    FilterSystem.prototype.applyFilter = function (filter, input, output, clearMode) {
        var renderer = this.renderer;
        // Set state before binding, so bindAndClear gets the blend mode.
        renderer.state.set(filter.state);
        this.bindAndClear(output, clearMode);
        // set the uniforms..
        filter.uniforms.uSampler = input;
        filter.uniforms.filterGlobals = this.globalUniforms;
        // TODO make it so that the order of this does not matter..
        // because it does at the moment cos of global uniforms.
        // they need to get resynced
        renderer.shader.bind(filter);
        if (filter.legacy) {
            this.quadUv.map(input._frame, input.filterFrame);
            renderer.geometry.bind(this.quadUv);
            renderer.geometry.draw(_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["DRAW_MODES"].TRIANGLES);
        }
        else {
            renderer.geometry.bind(this.quad);
            renderer.geometry.draw(_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["DRAW_MODES"].TRIANGLE_STRIP);
        }
    };
    /**
     * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
     *
     * Use `outputMatrix * vTextureCoord` in the shader.
     *
     * @param {PIXI.Matrix} outputMatrix - The matrix to output to.
     * @param {PIXI.Sprite} sprite - The sprite to map to.
     * @return {PIXI.Matrix} The mapped matrix.
     */
    FilterSystem.prototype.calculateSpriteMatrix = function (outputMatrix, sprite) {
        var _a = this.activeState, sourceFrame = _a.sourceFrame, destinationFrame = _a.destinationFrame;
        var orig = sprite._texture.orig;
        var mappedMatrix = outputMatrix.set(destinationFrame.width, 0, 0, destinationFrame.height, sourceFrame.x, sourceFrame.y);
        var worldTransform = sprite.worldTransform.copyTo(_pixi_math__WEBPACK_IMPORTED_MODULE_5__["Matrix"].TEMP_MATRIX);
        worldTransform.invert();
        mappedMatrix.prepend(worldTransform);
        mappedMatrix.scale(1.0 / orig.width, 1.0 / orig.height);
        mappedMatrix.translate(sprite.anchor.x, sprite.anchor.y);
        return mappedMatrix;
    };
    /**
     * Destroys this Filter System.
     */
    FilterSystem.prototype.destroy = function () {
        // Those textures has to be destroyed by RenderTextureSystem or FramebufferSystem
        this.texturePool.clear(false);
    };
    /**
     * Gets a Power-of-Two render texture or fullScreen texture
     *
     * @protected
     * @param {number} minWidth - The minimum width of the render texture in real pixels.
     * @param {number} minHeight - The minimum height of the render texture in real pixels.
     * @param {number} [resolution=1] - The resolution of the render texture.
     * @return {PIXI.RenderTexture} The new render texture.
     */
    FilterSystem.prototype.getOptimalFilterTexture = function (minWidth, minHeight, resolution) {
        if (resolution === void 0) { resolution = 1; }
        return this.texturePool.getOptimalTexture(minWidth, minHeight, resolution);
    };
    /**
     * Gets extra render texture to use inside current filter
     * To be compliant with older filters, you can use params in any order
     *
     * @param {PIXI.RenderTexture} [input] - renderTexture from which size and resolution will be copied
     * @param {number} [resolution] - override resolution of the renderTexture
     * @returns {PIXI.RenderTexture}
     */
    FilterSystem.prototype.getFilterTexture = function (input, resolution) {
        if (typeof input === 'number') {
            var swap = input;
            input = resolution;
            resolution = swap;
        }
        input = input || this.activeState.renderTexture;
        var filterTexture = this.texturePool.getOptimalTexture(input.width, input.height, resolution || input.resolution);
        filterTexture.filterFrame = input.filterFrame;
        return filterTexture;
    };
    /**
     * Frees a render texture back into the pool.
     *
     * @param {PIXI.RenderTexture} renderTexture - The renderTarget to free
     */
    FilterSystem.prototype.returnFilterTexture = function (renderTexture) {
        this.texturePool.returnTexture(renderTexture);
    };
    /**
     * Empties the texture pool.
     */
    FilterSystem.prototype.emptyPool = function () {
        this.texturePool.clear(true);
    };
    /**
     * calls `texturePool.resize()`, affects fullScreen renderTextures
     */
    FilterSystem.prototype.resize = function () {
        this.texturePool.setScreenSize(this.renderer.view);
    };
    /**
     * @param {PIXI.Matrix} matrix - first param
     * @param {PIXI.Rectangle} rect - second param
     */
    FilterSystem.prototype.transformAABB = function (matrix, rect) {
        var lt = tempPoints[0];
        var lb = tempPoints[1];
        var rt = tempPoints[2];
        var rb = tempPoints[3];
        lt.set(rect.left, rect.top);
        lb.set(rect.left, rect.bottom);
        rt.set(rect.right, rect.top);
        rb.set(rect.right, rect.bottom);
        matrix.apply(lt, lt);
        matrix.apply(lb, lb);
        matrix.apply(rt, rt);
        matrix.apply(rb, rb);
        var x0 = Math.min(lt.x, lb.x, rt.x, rb.x);
        var y0 = Math.min(lt.y, lb.y, rt.y, rb.y);
        var x1 = Math.max(lt.x, lb.x, rt.x, rb.x);
        var y1 = Math.max(lt.y, lb.y, rt.y, rb.y);
        rect.x = x0;
        rect.y = y0;
        rect.width = x1 - x0;
        rect.height = y1 - y0;
    };
    FilterSystem.prototype.roundFrame = function (frame, resolution, bindingSourceFrame, bindingDestinationFrame, transform) {
        if (transform) {
            var a = transform.a, b = transform.b, c = transform.c, d = transform.d;
            // Skip if skew/rotation present in matrix, except for multiple of 90° rotation. If rotation
            // is a multiple of 90°, then either pair of (b,c) or (a,d) will be (0,0).
            if ((b !== 0 || c !== 0) && (a !== 0 || d !== 0)) {
                return;
            }
        }
        transform = transform ? tempMatrix.copyFrom(transform) : tempMatrix.identity();
        // Get forward transform from world space to screen space
        transform
            .translate(-bindingSourceFrame.x, -bindingSourceFrame.y)
            .scale(bindingDestinationFrame.width / bindingSourceFrame.width, bindingDestinationFrame.height / bindingSourceFrame.height)
            .translate(bindingDestinationFrame.x, bindingDestinationFrame.y);
        // Convert frame to screen space
        this.transformAABB(transform, frame);
        // Round frame in screen space
        frame.ceil(resolution);
        // Project back into world space.
        this.transformAABB(transform.invert(), frame);
    };
    return FilterSystem;
}(System));

/**
 * Base for a common object renderer that can be used as a
 * system renderer plugin.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var ObjectRenderer = /** @class */ (function () {
    /**
     * @param {PIXI.Renderer} renderer - The renderer this manager works for.
     */
    function ObjectRenderer(renderer) {
        /**
         * The renderer this manager works for.
         *
         * @member {PIXI.Renderer}
         */
        this.renderer = renderer;
    }
    /**
     * Stub method that should be used to empty the current
     * batch by rendering objects now.
     */
    ObjectRenderer.prototype.flush = function () {
        // flush!
    };
    /**
     * Generic destruction method that frees all resources. This
     * should be called by subclasses.
     */
    ObjectRenderer.prototype.destroy = function () {
        this.renderer = null;
    };
    /**
     * Stub method that initializes any state required before
     * rendering starts. It is different from the `prerender`
     * signal, which occurs every frame, in that it is called
     * whenever an object requests _this_ renderer specifically.
     */
    ObjectRenderer.prototype.start = function () {
        // set the shader..
    };
    /**
     * Stops the renderer. It should free up any state and
     * become dormant.
     */
    ObjectRenderer.prototype.stop = function () {
        this.flush();
    };
    /**
     * Keeps the object to render. It doesn't have to be
     * rendered immediately.
     *
     * @param {PIXI.DisplayObject} object - The object to render.
     */
    ObjectRenderer.prototype.render = function (_object) {
        // render the object
    };
    return ObjectRenderer;
}());

/**
 * System plugin to the renderer to manage batching.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var BatchSystem = /** @class */ (function (_super) {
    __extends(BatchSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function BatchSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * An empty renderer.
         *
         * @member {PIXI.ObjectRenderer}
         */
        _this.emptyRenderer = new ObjectRenderer(renderer);
        /**
         * The currently active ObjectRenderer.
         *
         * @member {PIXI.ObjectRenderer}
         */
        _this.currentRenderer = _this.emptyRenderer;
        return _this;
    }
    /**
     * Changes the current renderer to the one given in parameter
     *
     * @param {PIXI.ObjectRenderer} objectRenderer - The object renderer to use.
     */
    BatchSystem.prototype.setObjectRenderer = function (objectRenderer) {
        if (this.currentRenderer === objectRenderer) {
            return;
        }
        this.currentRenderer.stop();
        this.currentRenderer = objectRenderer;
        this.currentRenderer.start();
    };
    /**
     * This should be called if you wish to do some custom rendering
     * It will basically render anything that may be batched up such as sprites
     */
    BatchSystem.prototype.flush = function () {
        this.setObjectRenderer(this.emptyRenderer);
    };
    /**
     * Reset the system to an empty renderer
     */
    BatchSystem.prototype.reset = function () {
        this.setObjectRenderer(this.emptyRenderer);
    };
    /**
     * Handy function for batch renderers: copies bound textures in first maxTextures locations to array
     * sets actual _batchLocation for them
     *
     * @param {PIXI.BaseTexture[]} arr - arr copy destination
     * @param {number} maxTextures - number of copied elements
     */
    BatchSystem.prototype.copyBoundTextures = function (arr, maxTextures) {
        var boundTextures = this.renderer.texture.boundTextures;
        for (var i = maxTextures - 1; i >= 0; --i) {
            arr[i] = boundTextures[i] || null;
            if (arr[i]) {
                arr[i]._batchLocation = i;
            }
        }
    };
    /**
     * Assigns batch locations to textures in array based on boundTextures state.
     * All textures in texArray should have `_batchEnabled = _batchId`,
     * and their count should be less than `maxTextures`.
     *
     * @param {PIXI.BatchTextureArray} texArray - textures to bound
     * @param {PIXI.BaseTexture[]} boundTextures - current state of bound textures
     * @param {number} batchId - marker for _batchEnabled param of textures in texArray
     * @param {number} maxTextures - number of texture locations to manipulate
     */
    BatchSystem.prototype.boundArray = function (texArray, boundTextures, batchId, maxTextures) {
        var elements = texArray.elements, ids = texArray.ids, count = texArray.count;
        var j = 0;
        for (var i = 0; i < count; i++) {
            var tex = elements[i];
            var loc = tex._batchLocation;
            if (loc >= 0 && loc < maxTextures
                && boundTextures[loc] === tex) {
                ids[i] = loc;
                continue;
            }
            while (j < maxTextures) {
                var bound = boundTextures[j];
                if (bound && bound._batchEnabled === batchId
                    && bound._batchLocation === j) {
                    j++;
                    continue;
                }
                ids[i] = j;
                tex._batchLocation = j;
                boundTextures[j] = tex;
                break;
            }
        }
    };
    return BatchSystem;
}(System));

var CONTEXT_UID_COUNTER = 0;
/**
 * System plugin to the renderer to manage the context.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var ContextSystem = /** @class */ (function (_super) {
    __extends(ContextSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function ContextSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * Either 1 or 2 to reflect the WebGL version being used
         * @member {number}
         * @readonly
         */
        _this.webGLVersion = 1;
        /**
         * Extensions being used
         * @member {object}
         * @readonly
         * @property {WEBGL_draw_buffers} drawBuffers - WebGL v1 extension
         * @property {WEBGL_depth_texture} depthTexture - WebGL v1 extension
         * @property {OES_texture_float} floatTexture - WebGL v1 extension
         * @property {WEBGL_lose_context} loseContext - WebGL v1 extension
         * @property {OES_vertex_array_object} vertexArrayObject - WebGL v1 extension
         * @property {EXT_texture_filter_anisotropic} anisotropicFiltering - WebGL v1 and v2 extension
         */
        _this.extensions = {};
        /**
         * Features supported by current context
         * @member {object}
         * @private
         * @readonly
         * @property {boolean} uint32Indices - Supports of 32-bit indices buffer
         */
        _this.supports = {
            uint32Indices: false,
        };
        // Bind functions
        _this.handleContextLost = _this.handleContextLost.bind(_this);
        _this.handleContextRestored = _this.handleContextRestored.bind(_this);
        renderer.view.addEventListener('webglcontextlost', _this.handleContextLost, false);
        renderer.view.addEventListener('webglcontextrestored', _this.handleContextRestored, false);
        return _this;
    }
    Object.defineProperty(ContextSystem.prototype, "isLost", {
        /**
         * `true` if the context is lost
         * @member {boolean}
         * @readonly
         */
        get: function () {
            return (!this.gl || this.gl.isContextLost());
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Handle the context change event
     * @param {WebGLRenderingContext} gl - new webgl context
     */
    ContextSystem.prototype.contextChange = function (gl) {
        this.gl = gl;
        this.renderer.gl = gl;
        this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
        // restore a context if it was previously lost
        if (gl.isContextLost() && gl.getExtension('WEBGL_lose_context')) {
            gl.getExtension('WEBGL_lose_context').restoreContext();
        }
    };
    /**
     * Initialize the context
     *
     * @protected
     * @param {WebGLRenderingContext} gl - WebGL context
     */
    ContextSystem.prototype.initFromContext = function (gl) {
        this.gl = gl;
        this.validateContext(gl);
        this.renderer.gl = gl;
        this.renderer.CONTEXT_UID = CONTEXT_UID_COUNTER++;
        this.renderer.runners.contextChange.emit(gl);
    };
    /**
     * Initialize from context options
     *
     * @protected
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
     * @param {object} options - context attributes
     */
    ContextSystem.prototype.initFromOptions = function (options) {
        var gl = this.createContext(this.renderer.view, options);
        this.initFromContext(gl);
    };
    /**
     * Helper class to create a WebGL Context
     *
     * @param {HTMLCanvasElement} canvas - the canvas element that we will get the context from
     * @param {object} options - An options object that gets passed in to the canvas element containing the
     *    context attributes
     * @see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext
     * @return {WebGLRenderingContext} the WebGL context
     */
    ContextSystem.prototype.createContext = function (canvas, options) {
        var gl;
        if (_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].PREFER_ENV >= _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ENV"].WEBGL2) {
            gl = canvas.getContext('webgl2', options);
        }
        if (gl) {
            this.webGLVersion = 2;
        }
        else {
            this.webGLVersion = 1;
            gl = canvas.getContext('webgl', options)
                || canvas.getContext('experimental-webgl', options);
            if (!gl) {
                // fail, not able to get a context
                throw new Error('This browser does not support WebGL. Try using the canvas renderer');
            }
        }
        this.gl = gl;
        this.getExtensions();
        return this.gl;
    };
    /**
     * Auto-populate the extensions
     *
     * @protected
     */
    ContextSystem.prototype.getExtensions = function () {
        // time to set up default extensions that Pixi uses.
        var gl = this.gl;
        var common = {
            anisotropicFiltering: gl.getExtension('EXT_texture_filter_anisotropic'),
            floatTextureLinear: gl.getExtension('OES_texture_float_linear'),
            s3tc: gl.getExtension('WEBGL_compressed_texture_s3tc'),
            s3tc_sRGB: gl.getExtension('WEBGL_compressed_texture_s3tc_srgb'),
            etc: gl.getExtension('WEBGL_compressed_texture_etc'),
            etc1: gl.getExtension('WEBGL_compressed_texture_etc1'),
            pvrtc: gl.getExtension('WEBGL_compressed_texture_pvrtc')
                || gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc'),
            atc: gl.getExtension('WEBGL_compressed_texture_atc'),
            astc: gl.getExtension('WEBGL_compressed_texture_astc')
        };
        if (this.webGLVersion === 1) {
            Object.assign(this.extensions, common, {
                drawBuffers: gl.getExtension('WEBGL_draw_buffers'),
                depthTexture: gl.getExtension('WEBGL_depth_texture'),
                loseContext: gl.getExtension('WEBGL_lose_context'),
                vertexArrayObject: gl.getExtension('OES_vertex_array_object')
                    || gl.getExtension('MOZ_OES_vertex_array_object')
                    || gl.getExtension('WEBKIT_OES_vertex_array_object'),
                uint32ElementIndex: gl.getExtension('OES_element_index_uint'),
                // Floats and half-floats
                floatTexture: gl.getExtension('OES_texture_float'),
                floatTextureLinear: gl.getExtension('OES_texture_float_linear'),
                textureHalfFloat: gl.getExtension('OES_texture_half_float'),
                textureHalfFloatLinear: gl.getExtension('OES_texture_half_float_linear'),
            });
        }
        else if (this.webGLVersion === 2) {
            Object.assign(this.extensions, common, {
                // Floats and half-floats
                colorBufferFloat: gl.getExtension('EXT_color_buffer_float')
            });
        }
    };
    /**
     * Handles a lost webgl context
     *
     * @protected
     * @param {WebGLContextEvent} event - The context lost event.
     */
    ContextSystem.prototype.handleContextLost = function (event) {
        event.preventDefault();
    };
    /**
     * Handles a restored webgl context
     *
     * @protected
     */
    ContextSystem.prototype.handleContextRestored = function () {
        this.renderer.runners.contextChange.emit(this.gl);
    };
    ContextSystem.prototype.destroy = function () {
        var view = this.renderer.view;
        // remove listeners
        view.removeEventListener('webglcontextlost', this.handleContextLost);
        view.removeEventListener('webglcontextrestored', this.handleContextRestored);
        this.gl.useProgram(null);
        if (this.extensions.loseContext) {
            this.extensions.loseContext.loseContext();
        }
    };
    /**
     * Handle the post-render runner event
     *
     * @protected
     */
    ContextSystem.prototype.postrender = function () {
        if (this.renderer.renderingToScreen) {
            this.gl.flush();
        }
    };
    /**
     * Validate context
     *
     * @protected
     * @param {WebGLRenderingContext} gl - Render context
     */
    ContextSystem.prototype.validateContext = function (gl) {
        var attributes = gl.getContextAttributes();
        var isWebGl2 = 'WebGL2RenderingContext' in self && gl instanceof self.WebGL2RenderingContext;
        if (isWebGl2) {
            this.webGLVersion = 2;
        }
        // this is going to be fairly simple for now.. but at least we have room to grow!
        if (!attributes.stencil) {
            /* eslint-disable max-len, no-console */
            console.warn('Provided WebGL context does not have a stencil buffer, masks may not render correctly');
            /* eslint-enable max-len, no-console */
        }
        var hasuint32 = isWebGl2 || !!gl.getExtension('OES_element_index_uint');
        this.supports.uint32Indices = hasuint32;
        if (!hasuint32) {
            /* eslint-disable max-len, no-console */
            console.warn('Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly');
            /* eslint-enable max-len, no-console */
        }
    };
    return ContextSystem;
}(System));

/**
 * Internal framebuffer for WebGL context
 * @class
 * @memberof PIXI
 */
var GLFramebuffer = /** @class */ (function () {
    function GLFramebuffer(framebuffer) {
        /**
         * The WebGL framebuffer
         * @member {WebGLFramebuffer}
         */
        this.framebuffer = framebuffer;
        /**
         * stencil+depth , usually costs 32bits per pixel
         * @member {WebGLRenderbuffer}
         */
        this.stencil = null;
        /**
         * latest known version of framebuffer
         * @member {number}
         * @protected
         */
        this.dirtyId = 0;
        /**
         * latest known version of framebuffer format
         * @member {number}
         * @protected
         */
        this.dirtyFormat = 0;
        /**
         * latest known version of framebuffer size
         * @member {number}
         * @protected
         */
        this.dirtySize = 0;
        /**
         * Detected AA samples number
         * @member {PIXI.MSAA_QUALITY}
         */
        this.multisample = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MSAA_QUALITY"].NONE;
        /**
         * In case MSAA, we use this Renderbuffer instead of colorTextures[0] when we write info
         * @member {WebGLRenderbuffer}
         */
        this.msaaBuffer = null;
        /**
         * In case we use MSAA, this is actual framebuffer that has colorTextures[0]
         * The contents of that framebuffer are read when we use that renderTexture in sprites
         * @member {PIXI.Framebuffer}
         */
        this.blitFramebuffer = null;
    }
    return GLFramebuffer;
}());

var tempRectangle = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
/**
 * System plugin to the renderer to manage framebuffers.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var FramebufferSystem = /** @class */ (function (_super) {
    __extends(FramebufferSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function FramebufferSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * A list of managed framebuffers
         * @member {PIXI.Framebuffer[]}
         * @readonly
         */
        _this.managedFramebuffers = [];
        /**
         * Framebuffer value that shows that we don't know what is bound
         * @member {Framebuffer}
         * @readonly
         */
        _this.unknownFramebuffer = new Framebuffer(10, 10);
        _this.msaaSamples = null;
        return _this;
    }
    /**
     * Sets up the renderer context and necessary buffers.
     */
    FramebufferSystem.prototype.contextChange = function () {
        var gl = this.gl = this.renderer.gl;
        this.CONTEXT_UID = this.renderer.CONTEXT_UID;
        this.current = this.unknownFramebuffer;
        this.viewport = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
        this.hasMRT = true;
        this.writeDepthTexture = true;
        this.disposeAll(true);
        // webgl2
        if (this.renderer.context.webGLVersion === 1) {
            // webgl 1!
            var nativeDrawBuffersExtension_1 = this.renderer.context.extensions.drawBuffers;
            var nativeDepthTextureExtension = this.renderer.context.extensions.depthTexture;
            if (_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].PREFER_ENV === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ENV"].WEBGL_LEGACY) {
                nativeDrawBuffersExtension_1 = null;
                nativeDepthTextureExtension = null;
            }
            if (nativeDrawBuffersExtension_1) {
                gl.drawBuffers = function (activeTextures) {
                    return nativeDrawBuffersExtension_1.drawBuffersWEBGL(activeTextures);
                };
            }
            else {
                this.hasMRT = false;
                gl.drawBuffers = function () {
                    // empty
                };
            }
            if (!nativeDepthTextureExtension) {
                this.writeDepthTexture = false;
            }
        }
        else {
            // WebGL2
            // cache possible MSAA samples
            this.msaaSamples = gl.getInternalformatParameter(gl.RENDERBUFFER, gl.RGBA8, gl.SAMPLES);
        }
    };
    /**
     * Bind a framebuffer
     *
     * @param {PIXI.Framebuffer} [framebuffer]
     * @param {PIXI.Rectangle} [frame] - frame, default is framebuffer size
     */
    FramebufferSystem.prototype.bind = function (framebuffer, frame) {
        var gl = this.gl;
        if (framebuffer) {
            // TODO caching layer!
            var fbo = framebuffer.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(framebuffer);
            if (this.current !== framebuffer) {
                this.current = framebuffer;
                gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.framebuffer);
            }
            // make sure all textures are unbound..
            // now check for updates...
            if (fbo.dirtyId !== framebuffer.dirtyId) {
                fbo.dirtyId = framebuffer.dirtyId;
                if (fbo.dirtyFormat !== framebuffer.dirtyFormat) {
                    fbo.dirtyFormat = framebuffer.dirtyFormat;
                    this.updateFramebuffer(framebuffer);
                }
                else if (fbo.dirtySize !== framebuffer.dirtySize) {
                    fbo.dirtySize = framebuffer.dirtySize;
                    this.resizeFramebuffer(framebuffer);
                }
            }
            for (var i = 0; i < framebuffer.colorTextures.length; i++) {
                var tex = framebuffer.colorTextures[i];
                this.renderer.texture.unbind(tex.parentTextureArray || tex);
            }
            if (framebuffer.depthTexture) {
                this.renderer.texture.unbind(framebuffer.depthTexture);
            }
            if (frame) {
                this.setViewport(frame.x, frame.y, frame.width, frame.height);
            }
            else {
                this.setViewport(0, 0, framebuffer.width, framebuffer.height);
            }
        }
        else {
            if (this.current) {
                this.current = null;
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }
            if (frame) {
                this.setViewport(frame.x, frame.y, frame.width, frame.height);
            }
            else {
                this.setViewport(0, 0, this.renderer.width, this.renderer.height);
            }
        }
    };
    /**
     * Set the WebGLRenderingContext's viewport.
     *
     * @param {Number} x - X position of viewport
     * @param {Number} y - Y position of viewport
     * @param {Number} width - Width of viewport
     * @param {Number} height - Height of viewport
     */
    FramebufferSystem.prototype.setViewport = function (x, y, width, height) {
        var v = this.viewport;
        if (v.width !== width || v.height !== height || v.x !== x || v.y !== y) {
            v.x = x;
            v.y = y;
            v.width = width;
            v.height = height;
            this.gl.viewport(x, y, width, height);
        }
    };
    Object.defineProperty(FramebufferSystem.prototype, "size", {
        /**
         * Get the size of the current width and height. Returns object with `width` and `height` values.
         *
         * @member {object}
         * @readonly
         */
        get: function () {
            if (this.current) {
                // TODO store temp
                return { x: 0, y: 0, width: this.current.width, height: this.current.height };
            }
            return { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Clear the color of the context
     *
     * @param {Number} r - Red value from 0 to 1
     * @param {Number} g - Green value from 0 to 1
     * @param {Number} b - Blue value from 0 to 1
     * @param {Number} a - Alpha value from 0 to 1
     * @param {PIXI.BUFFER_BITS} [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
     *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
     */
    FramebufferSystem.prototype.clear = function (r, g, b, a, mask) {
        if (mask === void 0) { mask = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BUFFER_BITS"].COLOR | _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BUFFER_BITS"].DEPTH; }
        var gl = this.gl;
        // TODO clear color can be set only one right?
        gl.clearColor(r, g, b, a);
        gl.clear(mask);
    };
    /**
     * Initialize framebuffer for this context
     *
     * @protected
     * @param {PIXI.Framebuffer} framebuffer
     * @returns {PIXI.GLFramebuffer} created GLFramebuffer
     */
    FramebufferSystem.prototype.initFramebuffer = function (framebuffer) {
        var gl = this.gl;
        var fbo = new GLFramebuffer(gl.createFramebuffer());
        fbo.multisample = this.detectSamples(framebuffer.multisample);
        framebuffer.glFramebuffers[this.CONTEXT_UID] = fbo;
        this.managedFramebuffers.push(framebuffer);
        framebuffer.disposeRunner.add(this);
        return fbo;
    };
    /**
     * Resize the framebuffer
     *
     * @protected
     * @param {PIXI.Framebuffer} framebuffer
     */
    FramebufferSystem.prototype.resizeFramebuffer = function (framebuffer) {
        var gl = this.gl;
        var fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
        if (fbo.stencil) {
            gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.stencil);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, framebuffer.width, framebuffer.height);
        }
        var colorTextures = framebuffer.colorTextures;
        for (var i = 0; i < colorTextures.length; i++) {
            this.renderer.texture.bind(colorTextures[i], 0);
        }
        if (framebuffer.depthTexture) {
            this.renderer.texture.bind(framebuffer.depthTexture, 0);
        }
    };
    /**
     * Update the framebuffer
     *
     * @protected
     * @param {PIXI.Framebuffer} framebuffer
     */
    FramebufferSystem.prototype.updateFramebuffer = function (framebuffer) {
        var gl = this.gl;
        var fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
        // bind the color texture
        var colorTextures = framebuffer.colorTextures;
        var count = colorTextures.length;
        if (!gl.drawBuffers) {
            count = Math.min(count, 1);
        }
        if (fbo.multisample > 1) {
            fbo.msaaBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.msaaBuffer);
            gl.renderbufferStorageMultisample(gl.RENDERBUFFER, fbo.multisample, gl.RGBA8, framebuffer.width, framebuffer.height);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, fbo.msaaBuffer);
        }
        var activeTextures = [];
        for (var i = 0; i < count; i++) {
            if (i === 0 && fbo.multisample > 1) {
                continue;
            }
            var texture = framebuffer.colorTextures[i];
            var parentTexture = texture.parentTextureArray || texture;
            this.renderer.texture.bind(parentTexture, 0);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, texture.target, parentTexture._glTextures[this.CONTEXT_UID].texture, 0);
            activeTextures.push(gl.COLOR_ATTACHMENT0 + i);
        }
        if (activeTextures.length > 1) {
            gl.drawBuffers(activeTextures);
        }
        if (framebuffer.depthTexture) {
            var writeDepthTexture = this.writeDepthTexture;
            if (writeDepthTexture) {
                var depthTexture = framebuffer.depthTexture;
                this.renderer.texture.bind(depthTexture, 0);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture._glTextures[this.CONTEXT_UID].texture, 0);
            }
        }
        if (!fbo.stencil && (framebuffer.stencil || framebuffer.depth)) {
            fbo.stencil = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.stencil);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, framebuffer.width, framebuffer.height);
            // TODO.. this is depth AND stencil?
            if (!framebuffer.depthTexture) { // you can't have both, so one should take priority if enabled
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, fbo.stencil);
            }
        }
    };
    /**
     * Detects number of samples that is not more than a param but as close to it as possible
     *
     * @param {PIXI.MSAA_QUALITY} samples - number of samples
     * @returns {PIXI.MSAA_QUALITY} - recommended number of samples
     */
    FramebufferSystem.prototype.detectSamples = function (samples) {
        var msaaSamples = this.msaaSamples;
        var res = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MSAA_QUALITY"].NONE;
        if (samples <= 1 || msaaSamples === null) {
            return res;
        }
        for (var i = 0; i < msaaSamples.length; i++) {
            if (msaaSamples[i] <= samples) {
                res = msaaSamples[i];
                break;
            }
        }
        if (res === 1) {
            res = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MSAA_QUALITY"].NONE;
        }
        return res;
    };
    /**
     * Only works with WebGL2
     *
     * blits framebuffer to another of the same or bigger size
     * after that target framebuffer is bound
     *
     * Fails with WebGL warning if blits multisample framebuffer to different size
     *
     * @param {PIXI.Framebuffer} [framebuffer] - by default it blits "into itself", from renderBuffer to texture.
     * @param {PIXI.Rectangle} [sourcePixels] - source rectangle in pixels
     * @param {PIXI.Rectangle} [destPixels] - dest rectangle in pixels, assumed to be the same as sourcePixels
     */
    FramebufferSystem.prototype.blit = function (framebuffer, sourcePixels, destPixels) {
        var _a = this, current = _a.current, renderer = _a.renderer, gl = _a.gl, CONTEXT_UID = _a.CONTEXT_UID;
        if (renderer.context.webGLVersion !== 2) {
            return;
        }
        if (!current) {
            return;
        }
        var fbo = current.glFramebuffers[CONTEXT_UID];
        if (!fbo) {
            return;
        }
        if (!framebuffer) {
            if (fbo.multisample <= 1) {
                return;
            }
            if (!fbo.blitFramebuffer) {
                fbo.blitFramebuffer = new Framebuffer(current.width, current.height);
                fbo.blitFramebuffer.addColorTexture(0, current.colorTextures[0]);
            }
            framebuffer = fbo.blitFramebuffer;
            framebuffer.width = current.width;
            framebuffer.height = current.height;
        }
        if (!sourcePixels) {
            sourcePixels = tempRectangle;
            sourcePixels.width = current.width;
            sourcePixels.height = current.height;
        }
        if (!destPixels) {
            destPixels = sourcePixels;
        }
        var sameSize = sourcePixels.width === destPixels.width && sourcePixels.height === destPixels.height;
        this.bind(framebuffer);
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fbo.framebuffer);
        gl.blitFramebuffer(sourcePixels.x, sourcePixels.y, sourcePixels.width, sourcePixels.height, destPixels.x, destPixels.y, destPixels.width, destPixels.height, gl.COLOR_BUFFER_BIT, sameSize ? gl.NEAREST : gl.LINEAR);
    };
    /**
     * Disposes framebuffer
     * @param {PIXI.Framebuffer} framebuffer - framebuffer that has to be disposed of
     * @param {boolean} [contextLost=false] - If context was lost, we suppress all delete function calls
     */
    FramebufferSystem.prototype.disposeFramebuffer = function (framebuffer, contextLost) {
        var fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
        var gl = this.gl;
        if (!fbo) {
            return;
        }
        delete framebuffer.glFramebuffers[this.CONTEXT_UID];
        var index = this.managedFramebuffers.indexOf(framebuffer);
        if (index >= 0) {
            this.managedFramebuffers.splice(index, 1);
        }
        framebuffer.disposeRunner.remove(this);
        if (!contextLost) {
            gl.deleteFramebuffer(fbo.framebuffer);
            if (fbo.stencil) {
                gl.deleteRenderbuffer(fbo.stencil);
            }
        }
    };
    /**
     * Disposes all framebuffers, but not textures bound to them
     * @param {boolean} [contextLost=false] - If context was lost, we suppress all delete function calls
     */
    FramebufferSystem.prototype.disposeAll = function (contextLost) {
        var list = this.managedFramebuffers;
        this.managedFramebuffers = [];
        for (var i = 0; i < list.length; i++) {
            this.disposeFramebuffer(list[i], contextLost);
        }
    };
    /**
     * Forcing creation of stencil buffer for current framebuffer, if it wasn't done before.
     * Used by MaskSystem, when its time to use stencil mask for Graphics element.
     *
     * Its an alternative for public lazy `framebuffer.enableStencil`, in case we need stencil without rebind.
     *
     * @private
     */
    FramebufferSystem.prototype.forceStencil = function () {
        var framebuffer = this.current;
        if (!framebuffer) {
            return;
        }
        var fbo = framebuffer.glFramebuffers[this.CONTEXT_UID];
        if (!fbo || fbo.stencil) {
            return;
        }
        framebuffer.enableStencil();
        var w = framebuffer.width;
        var h = framebuffer.height;
        var gl = this.gl;
        var stencil = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, stencil);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, w, h);
        fbo.stencil = stencil;
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, stencil);
    };
    /**
     * resets framebuffer stored state, binds screen framebuffer
     *
     * should be called before renderTexture reset()
     */
    FramebufferSystem.prototype.reset = function () {
        this.current = this.unknownFramebuffer;
        this.viewport = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
    };
    return FramebufferSystem;
}(System));

var GLBuffer = /** @class */ (function () {
    function GLBuffer(buffer) {
        this.buffer = buffer || null;
        this.updateID = -1;
        this.byteLength = -1;
        this.refCount = 0;
    }
    return GLBuffer;
}());

var byteSizeMap$1 = { 5126: 4, 5123: 2, 5121: 1 };
/**
 * System plugin to the renderer to manage geometry.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var GeometrySystem = /** @class */ (function (_super) {
    __extends(GeometrySystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function GeometrySystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        _this._activeGeometry = null;
        _this._activeVao = null;
        /**
         * `true` if we has `*_vertex_array_object` extension
         * @member {boolean}
         * @readonly
         */
        _this.hasVao = true;
        /**
         * `true` if has `ANGLE_instanced_arrays` extension
         * @member {boolean}
         * @readonly
         */
        _this.hasInstance = true;
        /**
         * `true` if support `gl.UNSIGNED_INT` in `gl.drawElements` or `gl.drawElementsInstanced`
         * @member {boolean}
         * @readonly
         */
        _this.canUseUInt32ElementIndex = false;
        /**
         * Cache for all geometries by id, used in case renderer gets destroyed or for profiling
         * @member {object}
         * @readonly
         */
        _this.managedGeometries = {};
        /**
         * Cache for all buffers by id, used in case renderer gets destroyed or for profiling
         * @member {object}
         * @readonly
         */
        _this.managedBuffers = {};
        return _this;
    }
    /**
     * Sets up the renderer context and necessary buffers.
     */
    GeometrySystem.prototype.contextChange = function () {
        this.disposeAll(true);
        var gl = this.gl = this.renderer.gl;
        var context = this.renderer.context;
        this.CONTEXT_UID = this.renderer.CONTEXT_UID;
        // webgl2
        if (context.webGLVersion !== 2) {
            // webgl 1!
            var nativeVaoExtension_1 = this.renderer.context.extensions.vertexArrayObject;
            if (_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].PREFER_ENV === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ENV"].WEBGL_LEGACY) {
                nativeVaoExtension_1 = null;
            }
            if (nativeVaoExtension_1) {
                gl.createVertexArray = function () {
                    return nativeVaoExtension_1.createVertexArrayOES();
                };
                gl.bindVertexArray = function (vao) {
                    return nativeVaoExtension_1.bindVertexArrayOES(vao);
                };
                gl.deleteVertexArray = function (vao) {
                    return nativeVaoExtension_1.deleteVertexArrayOES(vao);
                };
            }
            else {
                this.hasVao = false;
                gl.createVertexArray = function () {
                    return null;
                };
                gl.bindVertexArray = function () {
                    return null;
                };
                gl.deleteVertexArray = function () {
                    return null;
                };
            }
        }
        if (context.webGLVersion !== 2) {
            var instanceExt_1 = gl.getExtension('ANGLE_instanced_arrays');
            if (instanceExt_1) {
                gl.vertexAttribDivisor = function (a, b) {
                    return instanceExt_1.vertexAttribDivisorANGLE(a, b);
                };
                gl.drawElementsInstanced = function (a, b, c, d, e) {
                    return instanceExt_1.drawElementsInstancedANGLE(a, b, c, d, e);
                };
                gl.drawArraysInstanced = function (a, b, c, d) {
                    return instanceExt_1.drawArraysInstancedANGLE(a, b, c, d);
                };
            }
            else {
                this.hasInstance = false;
            }
        }
        this.canUseUInt32ElementIndex = context.webGLVersion === 2 || !!context.extensions.uint32ElementIndex;
    };
    /**
     * Binds geometry so that is can be drawn. Creating a Vao if required
     *
     * @param {PIXI.Geometry} geometry - instance of geometry to bind
     * @param {PIXI.Shader} [shader] - instance of shader to use vao for
     */
    GeometrySystem.prototype.bind = function (geometry, shader) {
        shader = shader || this.renderer.shader.shader;
        var gl = this.gl;
        // not sure the best way to address this..
        // currently different shaders require different VAOs for the same geometry
        // Still mulling over the best way to solve this one..
        // will likely need to modify the shader attribute locations at run time!
        var vaos = geometry.glVertexArrayObjects[this.CONTEXT_UID];
        var incRefCount = false;
        if (!vaos) {
            this.managedGeometries[geometry.id] = geometry;
            geometry.disposeRunner.add(this);
            geometry.glVertexArrayObjects[this.CONTEXT_UID] = vaos = {};
            incRefCount = true;
        }
        var vao = vaos[shader.program.id] || this.initGeometryVao(geometry, shader.program, incRefCount);
        this._activeGeometry = geometry;
        if (this._activeVao !== vao) {
            this._activeVao = vao;
            if (this.hasVao) {
                gl.bindVertexArray(vao);
            }
            else {
                this.activateVao(geometry, shader.program);
            }
        }
        // TODO - optimise later!
        // don't need to loop through if nothing changed!
        // maybe look to add an 'autoupdate' to geometry?
        this.updateBuffers();
    };
    /**
     * Reset and unbind any active VAO and geometry
     */
    GeometrySystem.prototype.reset = function () {
        this.unbind();
    };
    /**
     * Update buffers
     * @protected
     */
    GeometrySystem.prototype.updateBuffers = function () {
        var geometry = this._activeGeometry;
        var gl = this.gl;
        for (var i = 0; i < geometry.buffers.length; i++) {
            var buffer = geometry.buffers[i];
            var glBuffer = buffer._glBuffers[this.CONTEXT_UID];
            if (buffer._updateID !== glBuffer.updateID) {
                glBuffer.updateID = buffer._updateID;
                // TODO can cache this on buffer! maybe added a getter / setter?
                var type = buffer.index ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
                // TODO this could change if the VAO changes...
                // need to come up with a better way to cache..
                // if (this.boundBuffers[type] !== glBuffer)
                // {
                // this.boundBuffers[type] = glBuffer;
                gl.bindBuffer(type, glBuffer.buffer);
                // }
                this._boundBuffer = glBuffer;
                if (glBuffer.byteLength >= buffer.data.byteLength) {
                    // offset is always zero for now!
                    gl.bufferSubData(type, 0, buffer.data);
                }
                else {
                    var drawType = buffer.static ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW;
                    glBuffer.byteLength = buffer.data.byteLength;
                    gl.bufferData(type, buffer.data, drawType);
                }
            }
        }
    };
    /**
     * Check compatibility between a geometry and a program
     * @protected
     * @param {PIXI.Geometry} geometry - Geometry instance
     * @param {PIXI.Program} program - Program instance
     */
    GeometrySystem.prototype.checkCompatibility = function (geometry, program) {
        // geometry must have at least all the attributes that the shader requires.
        var geometryAttributes = geometry.attributes;
        var shaderAttributes = program.attributeData;
        for (var j in shaderAttributes) {
            if (!geometryAttributes[j]) {
                throw new Error("shader and geometry incompatible, geometry missing the \"" + j + "\" attribute");
            }
        }
    };
    /**
     * Takes a geometry and program and generates a unique signature for them.
     *
     * @param {PIXI.Geometry} geometry - to get signature from
     * @param {PIXI.Program} program - to test geometry against
     * @returns {String} Unique signature of the geometry and program
     * @protected
     */
    GeometrySystem.prototype.getSignature = function (geometry, program) {
        var attribs = geometry.attributes;
        var shaderAttributes = program.attributeData;
        var strings = ['g', geometry.id];
        for (var i in attribs) {
            if (shaderAttributes[i]) {
                strings.push(i);
            }
        }
        return strings.join('-');
    };
    /**
     * Creates or gets Vao with the same structure as the geometry and stores it on the geometry.
     * If vao is created, it is bound automatically.
     *
     * @protected
     * @param {PIXI.Geometry} geometry - Instance of geometry to to generate Vao for
     * @param {PIXI.Program} program - Instance of program
     * @param {boolean} [incRefCount=false] - Increment refCount of all geometry buffers
     */
    GeometrySystem.prototype.initGeometryVao = function (geometry, program, incRefCount) {
        if (incRefCount === void 0) { incRefCount = true; }
        this.checkCompatibility(geometry, program);
        var gl = this.gl;
        var CONTEXT_UID = this.CONTEXT_UID;
        var signature = this.getSignature(geometry, program);
        var vaoObjectHash = geometry.glVertexArrayObjects[this.CONTEXT_UID];
        var vao = vaoObjectHash[signature];
        if (vao) {
            // this will give us easy access to the vao
            vaoObjectHash[program.id] = vao;
            return vao;
        }
        var buffers = geometry.buffers;
        var attributes = geometry.attributes;
        var tempStride = {};
        var tempStart = {};
        for (var j in buffers) {
            tempStride[j] = 0;
            tempStart[j] = 0;
        }
        for (var j in attributes) {
            if (!attributes[j].size && program.attributeData[j]) {
                attributes[j].size = program.attributeData[j].size;
            }
            else if (!attributes[j].size) {
                console.warn("PIXI Geometry attribute '" + j + "' size cannot be determined (likely the bound shader does not have the attribute)"); // eslint-disable-line
            }
            tempStride[attributes[j].buffer] += attributes[j].size * byteSizeMap$1[attributes[j].type];
        }
        for (var j in attributes) {
            var attribute = attributes[j];
            var attribSize = attribute.size;
            if (attribute.stride === undefined) {
                if (tempStride[attribute.buffer] === attribSize * byteSizeMap$1[attribute.type]) {
                    attribute.stride = 0;
                }
                else {
                    attribute.stride = tempStride[attribute.buffer];
                }
            }
            if (attribute.start === undefined) {
                attribute.start = tempStart[attribute.buffer];
                tempStart[attribute.buffer] += attribSize * byteSizeMap$1[attribute.type];
            }
        }
        vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        // first update - and create the buffers!
        // only create a gl buffer if it actually gets
        for (var i = 0; i < buffers.length; i++) {
            var buffer = buffers[i];
            if (!buffer._glBuffers[CONTEXT_UID]) {
                buffer._glBuffers[CONTEXT_UID] = new GLBuffer(gl.createBuffer());
                this.managedBuffers[buffer.id] = buffer;
                buffer.disposeRunner.add(this);
            }
            if (incRefCount) {
                buffer._glBuffers[CONTEXT_UID].refCount++;
            }
        }
        // TODO - maybe make this a data object?
        // lets wait to see if we need to first!
        this.activateVao(geometry, program);
        this._activeVao = vao;
        // add it to the cache!
        vaoObjectHash[program.id] = vao;
        vaoObjectHash[signature] = vao;
        return vao;
    };
    /**
     * Disposes buffer
     * @param {PIXI.Buffer} buffer - buffer with data
     * @param {boolean} [contextLost=false] - If context was lost, we suppress deleteVertexArray
     */
    GeometrySystem.prototype.disposeBuffer = function (buffer, contextLost) {
        if (!this.managedBuffers[buffer.id]) {
            return;
        }
        delete this.managedBuffers[buffer.id];
        var glBuffer = buffer._glBuffers[this.CONTEXT_UID];
        var gl = this.gl;
        buffer.disposeRunner.remove(this);
        if (!glBuffer) {
            return;
        }
        if (!contextLost) {
            gl.deleteBuffer(glBuffer.buffer);
        }
        delete buffer._glBuffers[this.CONTEXT_UID];
    };
    /**
     * Disposes geometry
     * @param {PIXI.Geometry} geometry - Geometry with buffers. Only VAO will be disposed
     * @param {boolean} [contextLost=false] - If context was lost, we suppress deleteVertexArray
     */
    GeometrySystem.prototype.disposeGeometry = function (geometry, contextLost) {
        if (!this.managedGeometries[geometry.id]) {
            return;
        }
        delete this.managedGeometries[geometry.id];
        var vaos = geometry.glVertexArrayObjects[this.CONTEXT_UID];
        var gl = this.gl;
        var buffers = geometry.buffers;
        geometry.disposeRunner.remove(this);
        if (!vaos) {
            return;
        }
        for (var i = 0; i < buffers.length; i++) {
            var buf = buffers[i]._glBuffers[this.CONTEXT_UID];
            buf.refCount--;
            if (buf.refCount === 0 && !contextLost) {
                this.disposeBuffer(buffers[i], contextLost);
            }
        }
        if (!contextLost) {
            for (var vaoId in vaos) {
                // delete only signatures, everything else are copies
                if (vaoId[0] === 'g') {
                    var vao = vaos[vaoId];
                    if (this._activeVao === vao) {
                        this.unbind();
                    }
                    gl.deleteVertexArray(vao);
                }
            }
        }
        delete geometry.glVertexArrayObjects[this.CONTEXT_UID];
    };
    /**
     * dispose all WebGL resources of all managed geometries and buffers
     * @param {boolean} [contextLost=false] - If context was lost, we suppress `gl.delete` calls
     */
    GeometrySystem.prototype.disposeAll = function (contextLost) {
        var all = Object.keys(this.managedGeometries);
        for (var i = 0; i < all.length; i++) {
            this.disposeGeometry(this.managedGeometries[all[i]], contextLost);
        }
        all = Object.keys(this.managedBuffers);
        for (var i = 0; i < all.length; i++) {
            this.disposeBuffer(this.managedBuffers[all[i]], contextLost);
        }
    };
    /**
     * Activate vertex array object
     *
     * @protected
     * @param {PIXI.Geometry} geometry - Geometry instance
     * @param {PIXI.Program} program - Shader program instance
     */
    GeometrySystem.prototype.activateVao = function (geometry, program) {
        var gl = this.gl;
        var CONTEXT_UID = this.CONTEXT_UID;
        var buffers = geometry.buffers;
        var attributes = geometry.attributes;
        if (geometry.indexBuffer) {
            // first update the index buffer if we have one..
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer._glBuffers[CONTEXT_UID].buffer);
        }
        var lastBuffer = null;
        // add a new one!
        for (var j in attributes) {
            var attribute = attributes[j];
            var buffer = buffers[attribute.buffer];
            var glBuffer = buffer._glBuffers[CONTEXT_UID];
            if (program.attributeData[j]) {
                if (lastBuffer !== glBuffer) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer.buffer);
                    lastBuffer = glBuffer;
                }
                var location = program.attributeData[j].location;
                // TODO introduce state again
                // we can optimise this for older devices that have no VAOs
                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, attribute.size, attribute.type || gl.FLOAT, attribute.normalized, attribute.stride, attribute.start);
                if (attribute.instance) {
                    // TODO calculate instance count based of this...
                    if (this.hasInstance) {
                        gl.vertexAttribDivisor(location, 1);
                    }
                    else {
                        throw new Error('geometry error, GPU Instancing is not supported on this device');
                    }
                }
            }
        }
    };
    /**
     * Draw the geometry
     *
     * @param {Number} type - the type primitive to render
     * @param {Number} [size] - the number of elements to be rendered
     * @param {Number} [start] - Starting index
     * @param {Number} [instanceCount] - the number of instances of the set of elements to execute
     */
    GeometrySystem.prototype.draw = function (type, size, start, instanceCount) {
        var gl = this.gl;
        var geometry = this._activeGeometry;
        // TODO.. this should not change so maybe cache the function?
        if (geometry.indexBuffer) {
            var byteSize = geometry.indexBuffer.data.BYTES_PER_ELEMENT;
            var glType = byteSize === 2 ? gl.UNSIGNED_SHORT : gl.UNSIGNED_INT;
            if (byteSize === 2 || (byteSize === 4 && this.canUseUInt32ElementIndex)) {
                if (geometry.instanced) {
                    /* eslint-disable max-len */
                    gl.drawElementsInstanced(type, size || geometry.indexBuffer.data.length, glType, (start || 0) * byteSize, instanceCount || 1);
                    /* eslint-enable max-len */
                }
                else {
                    /* eslint-disable max-len */
                    gl.drawElements(type, size || geometry.indexBuffer.data.length, glType, (start || 0) * byteSize);
                    /* eslint-enable max-len */
                }
            }
            else {
                console.warn('unsupported index buffer type: uint32');
            }
        }
        else if (geometry.instanced) {
            // TODO need a better way to calculate size..
            gl.drawArraysInstanced(type, start, size || geometry.getSize(), instanceCount || 1);
        }
        else {
            gl.drawArrays(type, start, size || geometry.getSize());
        }
        return this;
    };
    /**
     * Unbind/reset everything
     * @protected
     */
    GeometrySystem.prototype.unbind = function () {
        this.gl.bindVertexArray(null);
        this._activeVao = null;
        this._activeGeometry = null;
    };
    return GeometrySystem;
}(System));

/**
 * Component for masked elements
 *
 * Holds mask mode and temporary data about current mask
 *
 * @class
 * @memberof PIXI
 */
var MaskData = /** @class */ (function () {
    /**
     * Create MaskData
     *
     * @param {PIXI.DisplayObject} [maskObject=null] - object that describes the mask
     */
    function MaskData(maskObject) {
        if (maskObject === void 0) { maskObject = null; }
        /**
         * Mask type
         * @member {PIXI.MASK_TYPES}
         */
        this.type = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].NONE;
        /**
         * Whether we know the mask type beforehand
         * @member {boolean}
         * @default true
         */
        this.autoDetect = true;
        /**
         * Which element we use to mask
         * @member {PIXI.DisplayObject}
         */
        this.maskObject = maskObject || null;
        /**
         * Whether it belongs to MaskSystem pool
         * @member {boolean}
         */
        this.pooled = false;
        /**
         * Indicator of the type
         * @member {boolean}
         */
        this.isMaskData = true;
        /**
         * Stencil counter above the mask in stack
         * @member {number}
         * @private
         */
        this._stencilCounter = 0;
        /**
         * Scissor counter above the mask in stack
         * @member {number}
         * @private
         */
        this._scissorCounter = 0;
        /**
         * Scissor operation above the mask in stack.
         * Null if _scissorCounter is zero, rectangle instance if positive.
         * @member {PIXI.Rectangle}
         */
        this._scissorRect = null;
        /**
         * Targeted element. Temporary variable set by MaskSystem
         * @member {PIXI.DisplayObject}
         * @private
         */
        this._target = null;
    }
    /**
     * resets the mask data after popMask()
     */
    MaskData.prototype.reset = function () {
        if (this.pooled) {
            this.maskObject = null;
            this.type = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].NONE;
            this.autoDetect = true;
        }
        this._target = null;
    };
    /**
     * copies counters from maskData above, called from pushMask()
     * @param {PIXI.MaskData|null} maskAbove
     */
    MaskData.prototype.copyCountersOrReset = function (maskAbove) {
        if (maskAbove) {
            this._stencilCounter = maskAbove._stencilCounter;
            this._scissorCounter = maskAbove._scissorCounter;
            this._scissorRect = maskAbove._scissorRect;
        }
        else {
            this._stencilCounter = 0;
            this._scissorCounter = 0;
            this._scissorRect = null;
        }
    };
    return MaskData;
}());

/**
 * @private
 * @param {WebGLRenderingContext} gl - The current WebGL context {WebGLProgram}
 * @param {Number} type - the type, can be either VERTEX_SHADER or FRAGMENT_SHADER
 * @param {string} src - The vertex shader source as an array of strings.
 * @return {WebGLShader} the shader
 */
function compileShader(gl, type, src) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
}
/**
 * @function compileProgram
 * @private
 * @memberof PIXI.glCore.shader
 * @param {WebGLRenderingContext} gl - The current WebGL context {WebGLProgram}
 * @param {string|string[]} vertexSrc - The vertex shader source as an array of strings.
 * @param {string|string[]} fragmentSrc - fragment shader source as an array of strings.
 * @param {Object} attributeLocations - An attribute location map that lets you manually set the attribute locations
 * @return {WebGLProgram} the shader program
 */
function compileProgram(gl, vertexSrc, fragmentSrc, attributeLocations) {
    var glVertShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
    var glFragShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
    var program = gl.createProgram();
    gl.attachShader(program, glVertShader);
    gl.attachShader(program, glFragShader);
    // optionally, set the attributes manually for the program rather than letting WebGL decide..
    if (attributeLocations) {
        for (var i in attributeLocations) {
            gl.bindAttribLocation(program, attributeLocations[i], i);
        }
    }
    gl.linkProgram(program);
    // if linking fails, then log and cleanup
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        if (!gl.getShaderParameter(glVertShader, gl.COMPILE_STATUS)) {
            console.warn(vertexSrc);
            console.error(gl.getShaderInfoLog(glVertShader));
        }
        if (!gl.getShaderParameter(glFragShader, gl.COMPILE_STATUS)) {
            console.warn(fragmentSrc);
            console.error(gl.getShaderInfoLog(glFragShader));
        }
        console.error('Pixi.js Error: Could not initialize shader.');
        console.error('gl.VALIDATE_STATUS', gl.getProgramParameter(program, gl.VALIDATE_STATUS));
        console.error('gl.getError()', gl.getError());
        // if there is a program info log, log it
        if (gl.getProgramInfoLog(program) !== '') {
            console.warn('Pixi.js Warning: gl.getProgramInfoLog()', gl.getProgramInfoLog(program));
        }
        gl.deleteProgram(program);
        program = null;
    }
    // clean up some shaders
    gl.deleteShader(glVertShader);
    gl.deleteShader(glFragShader);
    return program;
}

function booleanArray(size) {
    var array = new Array(size);
    for (var i = 0; i < array.length; i++) {
        array[i] = false;
    }
    return array;
}
/**
 * @method defaultValue
 * @memberof PIXI.glCore.shader
 * @param {string} type - Type of value
 * @param {number} size
 * @private
 */
function defaultValue(type, size) {
    switch (type) {
        case 'float':
            return 0;
        case 'vec2':
            return new Float32Array(2 * size);
        case 'vec3':
            return new Float32Array(3 * size);
        case 'vec4':
            return new Float32Array(4 * size);
        case 'int':
        case 'uint':
        case 'sampler2D':
        case 'sampler2DArray':
            return 0;
        case 'ivec2':
            return new Int32Array(2 * size);
        case 'ivec3':
            return new Int32Array(3 * size);
        case 'ivec4':
            return new Int32Array(4 * size);
        case 'uvec2':
            return new Uint32Array(2 * size);
        case 'uvec3':
            return new Uint32Array(3 * size);
        case 'uvec4':
            return new Uint32Array(4 * size);
        case 'bool':
            return false;
        case 'bvec2':
            return booleanArray(2 * size);
        case 'bvec3':
            return booleanArray(3 * size);
        case 'bvec4':
            return booleanArray(4 * size);
        case 'mat2':
            return new Float32Array([1, 0,
                0, 1]);
        case 'mat3':
            return new Float32Array([1, 0, 0,
                0, 1, 0,
                0, 0, 1]);
        case 'mat4':
            return new Float32Array([1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1]);
    }
    return null;
}

var unknownContext = {};
var context = unknownContext;
/**
 * returns a little WebGL context to use for program inspection.
 *
 * @static
 * @private
 * @returns {WebGLRenderingContext} a gl context to test with
 */
function getTestContext() {
    if (context === unknownContext || (context && context.isContextLost())) {
        var canvas = document.createElement('canvas');
        var gl = void 0;
        if (_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].PREFER_ENV >= _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ENV"].WEBGL2) {
            gl = canvas.getContext('webgl2', {});
        }
        if (!gl) {
            gl = canvas.getContext('webgl', {})
                || canvas.getContext('experimental-webgl', {});
            if (!gl) {
                // fail, not able to get a context
                gl = null;
            }
            else {
                // for shader testing..
                gl.getExtension('WEBGL_draw_buffers');
            }
        }
        context = gl;
    }
    return context;
}

var maxFragmentPrecision;
function getMaxFragmentPrecision() {
    if (!maxFragmentPrecision) {
        maxFragmentPrecision = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["PRECISION"].MEDIUM;
        var gl = getTestContext();
        if (gl) {
            if (gl.getShaderPrecisionFormat) {
                var shaderFragment = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
                maxFragmentPrecision = shaderFragment.precision ? _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["PRECISION"].HIGH : _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["PRECISION"].MEDIUM;
            }
        }
    }
    return maxFragmentPrecision;
}

/**
 * Sets the float precision on the shader, ensuring the device supports the request precision.
 * If the precision is already present, it just ensures that the device is able to handle it.
 *
 * @private
 * @param {string} src - The shader source
 * @param {string} requestedPrecision - The request float precision of the shader. Options are 'lowp', 'mediump' or 'highp'.
 * @param {string} maxSupportedPrecision - The maximum precision the shader supports.
 *
 * @return {string} modified shader source
 */
function setPrecision(src, requestedPrecision, maxSupportedPrecision) {
    if (src.substring(0, 9) !== 'precision') {
        // no precision supplied, so PixiJS will add the requested level.
        var precision = requestedPrecision;
        // If highp is requested but not supported, downgrade precision to a level all devices support.
        if (requestedPrecision === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["PRECISION"].HIGH && maxSupportedPrecision !== _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["PRECISION"].HIGH) {
            precision = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["PRECISION"].MEDIUM;
        }
        return "precision " + precision + " float;\n" + src;
    }
    else if (maxSupportedPrecision !== _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["PRECISION"].HIGH && src.substring(0, 15) === 'precision highp') {
        // precision was supplied, but at a level this device does not support, so downgrading to mediump.
        return src.replace('precision highp', 'precision mediump');
    }
    return src;
}

var GLSL_TO_SIZE = {
    float: 1,
    vec2: 2,
    vec3: 3,
    vec4: 4,
    int: 1,
    ivec2: 2,
    ivec3: 3,
    ivec4: 4,
    uint: 1,
    uvec2: 2,
    uvec3: 3,
    uvec4: 4,
    bool: 1,
    bvec2: 2,
    bvec3: 3,
    bvec4: 4,
    mat2: 4,
    mat3: 9,
    mat4: 16,
    sampler2D: 1,
};
/**
 * @private
 * @method mapSize
 * @memberof PIXI.glCore.shader
 * @param {String} type
 * @return {Number}
 */
function mapSize(type) {
    return GLSL_TO_SIZE[type];
}

var GL_TABLE = null;
var GL_TO_GLSL_TYPES = {
    FLOAT: 'float',
    FLOAT_VEC2: 'vec2',
    FLOAT_VEC3: 'vec3',
    FLOAT_VEC4: 'vec4',
    INT: 'int',
    INT_VEC2: 'ivec2',
    INT_VEC3: 'ivec3',
    INT_VEC4: 'ivec4',
    UNSIGNED_INT: 'uint',
    UNSIGNED_INT_VEC2: 'uvec2',
    UNSIGNED_INT_VEC3: 'uvec3',
    UNSIGNED_INT_VEC4: 'uvec4',
    BOOL: 'bool',
    BOOL_VEC2: 'bvec2',
    BOOL_VEC3: 'bvec3',
    BOOL_VEC4: 'bvec4',
    FLOAT_MAT2: 'mat2',
    FLOAT_MAT3: 'mat3',
    FLOAT_MAT4: 'mat4',
    SAMPLER_2D: 'sampler2D',
    INT_SAMPLER_2D: 'sampler2D',
    UNSIGNED_INT_SAMPLER_2D: 'sampler2D',
    SAMPLER_CUBE: 'samplerCube',
    INT_SAMPLER_CUBE: 'samplerCube',
    UNSIGNED_INT_SAMPLER_CUBE: 'samplerCube',
    SAMPLER_2D_ARRAY: 'sampler2DArray',
    INT_SAMPLER_2D_ARRAY: 'sampler2DArray',
    UNSIGNED_INT_SAMPLER_2D_ARRAY: 'sampler2DArray',
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function mapType(gl, type) {
    if (!GL_TABLE) {
        var typeNames = Object.keys(GL_TO_GLSL_TYPES);
        GL_TABLE = {};
        for (var i = 0; i < typeNames.length; ++i) {
            var tn = typeNames[i];
            GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
        }
    }
    return GL_TABLE[type];
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// Parsers, each one of these will take a look at the type of shader property and uniform.
// if they pass the test function then the code function is called that returns a the shader upload code for that uniform.
// Shader upload code is automagically generated with these parsers.
// If no parser is valid then the default upload functions are used.
// exposing Parsers means that custom upload logic can be added to pixi's shaders.
// A good example would be a pixi rectangle can be directly set on a uniform.
// If the shader sees it it knows how to upload the rectangle structure as a vec4
// format is as follows:
//
// {
//     test: (data, uniform) => {} <--- test is this code should be used for this uniform
//     code: (name, uniform) => {} <--- returns the string of the piece of code that uploads the uniform
// }
var uniformParsers = [
    // a float cache layer
    {
        test: function (data) {
            return data.type === 'float' && data.size === 1;
        },
        code: function (name) {
            return "\n            if(uv[\"" + name + "\"] !== ud[\"" + name + "\"].value)\n            {\n                ud[\"" + name + "\"].value = uv[\"" + name + "\"]\n                gl.uniform1f(ud[\"" + name + "\"].location, uv[\"" + name + "\"])\n            }\n            ";
        },
    },
    // handling samplers
    {
        test: function (data) {
            // eslint-disable-next-line max-len
            return (data.type === 'sampler2D' || data.type === 'samplerCube' || data.type === 'sampler2DArray') && data.size === 1 && !data.isArray;
        },
        code: function (name) { return "t = syncData.textureCount++;\n\n            renderer.texture.bind(uv[\"" + name + "\"], t);\n\n            if(ud[\"" + name + "\"].value !== t)\n            {\n                ud[\"" + name + "\"].value = t;\n                gl.uniform1i(ud[\"" + name + "\"].location, t);\n; // eslint-disable-line max-len\n            }"; },
    },
    // uploading pixi matrix object to mat3
    {
        test: function (data, uniform) {
            return data.type === 'mat3' && data.size === 1 && uniform.a !== undefined;
        },
        code: function (name) {
            // TODO and some smart caching dirty ids here!
            return "\n            gl.uniformMatrix3fv(ud[\"" + name + "\"].location, false, uv[\"" + name + "\"].toArray(true));\n            ";
        },
    },
    // uploading a pixi point as a vec2 with caching layer
    {
        test: function (data, uniform) {
            return data.type === 'vec2' && data.size === 1 && uniform.x !== undefined;
        },
        code: function (name) {
            return "\n                cv = ud[\"" + name + "\"].value;\n                v = uv[\"" + name + "\"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    gl.uniform2f(ud[\"" + name + "\"].location, v.x, v.y);\n                }";
        },
    },
    // caching layer for a vec2
    {
        test: function (data) {
            return data.type === 'vec2' && data.size === 1;
        },
        code: function (name) {
            return "\n                cv = ud[\"" + name + "\"].value;\n                v = uv[\"" + name + "\"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    gl.uniform2f(ud[\"" + name + "\"].location, v[0], v[1]);\n                }\n            ";
        },
    },
    // upload a pixi rectangle as a vec4 with caching layer
    {
        test: function (data, uniform) {
            return data.type === 'vec4' && data.size === 1 && uniform.width !== undefined;
        },
        code: function (name) {
            return "\n                cv = ud[\"" + name + "\"].value;\n                v = uv[\"" + name + "\"];\n\n                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)\n                {\n                    cv[0] = v.x;\n                    cv[1] = v.y;\n                    cv[2] = v.width;\n                    cv[3] = v.height;\n                    gl.uniform4f(ud[\"" + name + "\"].location, v.x, v.y, v.width, v.height)\n                }";
        },
    },
    // a caching layer for vec4 uploading
    {
        test: function (data) {
            return data.type === 'vec4' && data.size === 1;
        },
        code: function (name) {
            return "\n                cv = ud[\"" + name + "\"].value;\n                v = uv[\"" + name + "\"];\n\n                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])\n                {\n                    cv[0] = v[0];\n                    cv[1] = v[1];\n                    cv[2] = v[2];\n                    cv[3] = v[3];\n\n                    gl.uniform4f(ud[\"" + name + "\"].location, v[0], v[1], v[2], v[3])\n                }";
        },
    } ];

// cv = CachedValue
// v = value
// ud = uniformData
// uv = uniformValue
// l = location
var GLSL_TO_SINGLE_SETTERS_CACHED = {
    float: "\n    if(cv !== v)\n    {\n        cv.v = v;\n        gl.uniform1f(location, v)\n    }",
    vec2: "\n    if(cv[0] !== v[0] || cv[1] !== v[1])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        gl.uniform2f(location, v[0], v[1])\n    }",
    vec3: "\n    if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])\n    {\n        cv[0] = v[0];\n        cv[1] = v[1];\n        cv[2] = v[2];\n\n        gl.uniform3f(location, v[0], v[1], v[2])\n    }",
    vec4: 'gl.uniform4f(location, v[0], v[1], v[2], v[3])',
    int: 'gl.uniform1i(location, v)',
    ivec2: 'gl.uniform2i(location, v[0], v[1])',
    ivec3: 'gl.uniform3i(location, v[0], v[1], v[2])',
    ivec4: 'gl.uniform4i(location, v[0], v[1], v[2], v[3])',
    uint: 'gl.uniform1ui(location, v)',
    uvec2: 'gl.uniform2ui(location, v[0], v[1])',
    uvec3: 'gl.uniform3ui(location, v[0], v[1], v[2])',
    uvec4: 'gl.uniform4ui(location, v[0], v[1], v[2], v[3])',
    bool: 'gl.uniform1i(location, v)',
    bvec2: 'gl.uniform2i(location, v[0], v[1])',
    bvec3: 'gl.uniform3i(location, v[0], v[1], v[2])',
    bvec4: 'gl.uniform4i(location, v[0], v[1], v[2], v[3])',
    mat2: 'gl.uniformMatrix2fv(location, false, v)',
    mat3: 'gl.uniformMatrix3fv(location, false, v)',
    mat4: 'gl.uniformMatrix4fv(location, false, v)',
    sampler2D: 'gl.uniform1i(location, v)',
    samplerCube: 'gl.uniform1i(location, v)',
    sampler2DArray: 'gl.uniform1i(location, v)',
};
var GLSL_TO_ARRAY_SETTERS = {
    float: "gl.uniform1fv(location, v)",
    vec2: "gl.uniform2fv(location, v)",
    vec3: "gl.uniform3fv(location, v)",
    vec4: 'gl.uniform4fv(location, v)',
    mat4: 'gl.uniformMatrix4fv(location, false, v)',
    mat3: 'gl.uniformMatrix3fv(location, false, v)',
    mat2: 'gl.uniformMatrix2fv(location, false, v)',
    int: 'gl.uniform1iv(location, v)',
    ivec2: 'gl.uniform2iv(location, v)',
    ivec3: 'gl.uniform3iv(location, v)',
    ivec4: 'gl.uniform4iv(location, v)',
    uint: 'gl.uniform1uiv(location, v)',
    uvec2: 'gl.uniform2uiv(location, v)',
    uvec3: 'gl.uniform3uiv(location, v)',
    uvec4: 'gl.uniform4uiv(location, v)',
    bool: 'gl.uniform1iv(location, v)',
    bvec2: 'gl.uniform2iv(location, v)',
    bvec3: 'gl.uniform3iv(location, v)',
    bvec4: 'gl.uniform4iv(location, v)',
    sampler2D: 'gl.uniform1iv(location, v)',
    samplerCube: 'gl.uniform1iv(location, v)',
    sampler2DArray: 'gl.uniform1iv(location, v)',
};
function generateUniformsSync(group, uniformData) {
    var funcFragments = ["\n        var v = null;\n        var cv = null\n        var t = 0;\n        var gl = renderer.gl\n    "];
    for (var i in group.uniforms) {
        var data = uniformData[i];
        if (!data) {
            if (group.uniforms[i].group) {
                funcFragments.push("\n                    renderer.shader.syncUniformGroup(uv[\"" + i + "\"], syncData);\n                ");
            }
            continue;
        }
        var uniform = group.uniforms[i];
        var parsed = false;
        for (var j = 0; j < uniformParsers.length; j++) {
            if (uniformParsers[j].test(data, uniform)) {
                funcFragments.push(uniformParsers[j].code(i, uniform));
                parsed = true;
                break;
            }
        }
        if (!parsed) {
            var templateType = (data.size === 1) ? GLSL_TO_SINGLE_SETTERS_CACHED : GLSL_TO_ARRAY_SETTERS;
            var template = templateType[data.type].replace('location', "ud[\"" + i + "\"].location");
            funcFragments.push("\n            cv = ud[\"" + i + "\"].value;\n            v = uv[\"" + i + "\"];\n            " + template + ";");
        }
    }
    /*
     * the introduction of syncData is to solve an issue where textures in uniform groups are not set correctly
     * the texture count was always starting from 0 in each group. This needs to increment each time a texture is used
     * no matter which group is being used
     *
     */
    // eslint-disable-next-line no-new-func
    return new Function('ud', 'uv', 'renderer', 'syncData', funcFragments.join('\n'));
}

var fragTemplate = [
    'precision mediump float;',
    'void main(void){',
    'float test = 0.1;',
    '%forloop%',
    'gl_FragColor = vec4(0.0);',
    '}' ].join('\n');
function generateIfTestSrc(maxIfs) {
    var src = '';
    for (var i = 0; i < maxIfs; ++i) {
        if (i > 0) {
            src += '\nelse ';
        }
        if (i < maxIfs - 1) {
            src += "if(test == " + i + ".0){}";
        }
    }
    return src;
}
function checkMaxIfStatementsInShader(maxIfs, gl) {
    if (maxIfs === 0) {
        throw new Error('Invalid value of `0` passed to `checkMaxIfStatementsInShader`');
    }
    var shader = gl.createShader(gl.FRAGMENT_SHADER);
    while (true) // eslint-disable-line no-constant-condition
     {
        var fragmentSrc = fragTemplate.replace(/%forloop%/gi, generateIfTestSrc(maxIfs));
        gl.shaderSource(shader, fragmentSrc);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            maxIfs = (maxIfs / 2) | 0;
        }
        else {
            // valid!
            break;
        }
    }
    return maxIfs;
}

// Cache the result to prevent running this over and over
var unsafeEval;
/**
 * Not all platforms allow to generate function code (e.g., `new Function`).
 * this provides the platform-level detection.
 *
 * @private
 * @returns {boolean}
 */
function unsafeEvalSupported() {
    if (typeof unsafeEval === 'boolean') {
        return unsafeEval;
    }
    try {
        /* eslint-disable no-new-func */
        var func = new Function('param1', 'param2', 'param3', 'return param1[param2] === param3;');
        /* eslint-enable no-new-func */
        unsafeEval = func({ a: 'b' }, 'a', 'b') === true;
    }
    catch (e) {
        unsafeEval = false;
    }
    return unsafeEval;
}

var defaultFragment = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor *= texture2D(uSampler, vTextureCoord);\n}";

var defaultVertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n}\n";

var UID$3 = 0;
var nameCache = {};
/**
 * Helper class to create a shader program.
 *
 * @class
 * @memberof PIXI
 */
var Program = /** @class */ (function () {
    /**
     * @param {string} [vertexSrc] - The source of the vertex shader.
     * @param {string} [fragmentSrc] - The source of the fragment shader.
     * @param {string} [name] - Name for shader
     */
    function Program(vertexSrc, fragmentSrc, name) {
        if (name === void 0) { name = 'pixi-shader'; }
        this.id = UID$3++;
        /**
         * The vertex shader.
         *
         * @member {string}
         */
        this.vertexSrc = vertexSrc || Program.defaultVertexSrc;
        /**
         * The fragment shader.
         *
         * @member {string}
         */
        this.fragmentSrc = fragmentSrc || Program.defaultFragmentSrc;
        this.vertexSrc = this.vertexSrc.trim();
        this.fragmentSrc = this.fragmentSrc.trim();
        if (this.vertexSrc.substring(0, 8) !== '#version') {
            name = name.replace(/\s+/g, '-');
            if (nameCache[name]) {
                nameCache[name]++;
                name += "-" + nameCache[name];
            }
            else {
                nameCache[name] = 1;
            }
            this.vertexSrc = "#define SHADER_NAME " + name + "\n" + this.vertexSrc;
            this.fragmentSrc = "#define SHADER_NAME " + name + "\n" + this.fragmentSrc;
            this.vertexSrc = setPrecision(this.vertexSrc, _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].PRECISION_VERTEX, _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["PRECISION"].HIGH);
            this.fragmentSrc = setPrecision(this.fragmentSrc, _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].PRECISION_FRAGMENT, getMaxFragmentPrecision());
        }
        // currently this does not extract structs only default types
        this.extractData(this.vertexSrc, this.fragmentSrc);
        // this is where we store shader references..
        this.glPrograms = {};
        this.syncUniforms = null;
    }
    /**
     * Extracts the data for a buy creating a small test program
     * or reading the src directly.
     * @protected
     *
     * @param {string} [vertexSrc] - The source of the vertex shader.
     * @param {string} [fragmentSrc] - The source of the fragment shader.
     */
    Program.prototype.extractData = function (vertexSrc, fragmentSrc) {
        var gl = getTestContext();
        if (gl) {
            var program = compileProgram(gl, vertexSrc, fragmentSrc);
            this.attributeData = this.getAttributeData(program, gl);
            this.uniformData = this.getUniformData(program, gl);
            gl.deleteProgram(program);
        }
        else {
            this.uniformData = {};
            this.attributeData = {};
        }
    };
    /**
     * returns the attribute data from the program
     * @private
     *
     * @param {WebGLProgram} [program] - the WebGL program
     * @param {WebGLRenderingContext} [gl] - the WebGL context
     *
     * @returns {object} the attribute data for this program
     */
    Program.prototype.getAttributeData = function (program, gl) {
        var attributes = {};
        var attributesArray = [];
        var totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < totalAttributes; i++) {
            var attribData = gl.getActiveAttrib(program, i);
            var type = mapType(gl, attribData.type);
            /*eslint-disable */
            var data = {
                type: type,
                name: attribData.name,
                size: mapSize(type),
                location: 0,
            };
            /* eslint-enable */
            attributes[attribData.name] = data;
            attributesArray.push(data);
        }
        attributesArray.sort(function (a, b) { return (a.name > b.name) ? 1 : -1; }); // eslint-disable-line no-confusing-arrow
        for (var i = 0; i < attributesArray.length; i++) {
            attributesArray[i].location = i;
        }
        return attributes;
    };
    /**
     * returns the uniform data from the program
     * @private
     *
     * @param {webGL-program} [program] - the webgl program
     * @param {context} [gl] - the WebGL context
     *
     * @returns {object} the uniform data for this program
     */
    Program.prototype.getUniformData = function (program, gl) {
        var uniforms = {};
        var totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        // TODO expose this as a prop?
        // const maskRegex = new RegExp('^(projectionMatrix|uSampler|translationMatrix)$');
        // const maskRegex = new RegExp('^(projectionMatrix|uSampler|translationMatrix)$');
        for (var i = 0; i < totalUniforms; i++) {
            var uniformData = gl.getActiveUniform(program, i);
            var name = uniformData.name.replace(/\[.*?\]$/, '');
            var isArray = uniformData.name.match(/\[.*?\]$/);
            var type = mapType(gl, uniformData.type);
            /*eslint-disable */
            uniforms[name] = {
                type: type,
                size: uniformData.size,
                isArray: isArray,
                value: defaultValue(type, uniformData.size),
            };
            /* eslint-enable */
        }
        return uniforms;
    };
    Object.defineProperty(Program, "defaultVertexSrc", {
        /**
         * The default vertex shader source
         *
         * @static
         * @constant
         * @member {string}
         */
        get: function () {
            return defaultVertex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Program, "defaultFragmentSrc", {
        /**
         * The default fragment shader source
         *
         * @static
         * @constant
         * @member {string}
         */
        get: function () {
            return defaultFragment;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * A short hand function to create a program based of a vertex and fragment shader
     * this method will also check to see if there is a cached program.
     *
     * @param {string} [vertexSrc] - The source of the vertex shader.
     * @param {string} [fragmentSrc] - The source of the fragment shader.
     * @param {string} [name=pixi-shader] - Name for shader
     *
     * @returns {PIXI.Program} an shiny new Pixi shader!
     */
    Program.from = function (vertexSrc, fragmentSrc, name) {
        var key = vertexSrc + fragmentSrc;
        var program = _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["ProgramCache"][key];
        if (!program) {
            _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["ProgramCache"][key] = program = new Program(vertexSrc, fragmentSrc, name);
        }
        return program;
    };
    return Program;
}());

/**
 * A helper class for shaders
 *
 * @class
 * @memberof PIXI
 */
var Shader = /** @class */ (function () {
    /**
     * @param {PIXI.Program} [program] - The program the shader will use.
     * @param {object} [uniforms] - Custom uniforms to use to augment the built-in ones.
     */
    function Shader(program, uniforms) {
        /**
         * Program that the shader uses
         *
         * @member {PIXI.Program}
         */
        this.program = program;
        // lets see whats been passed in
        // uniforms should be converted to a uniform group
        if (uniforms) {
            if (uniforms instanceof UniformGroup) {
                this.uniformGroup = uniforms;
            }
            else {
                this.uniformGroup = new UniformGroup(uniforms);
            }
        }
        else {
            this.uniformGroup = new UniformGroup({});
        }
        // time to build some getters and setters!
        // I guess down the line this could sort of generate an instruction list rather than use dirty ids?
        // does the trick for now though!
        for (var i in program.uniformData) {
            if (this.uniformGroup.uniforms[i] instanceof Array) {
                this.uniformGroup.uniforms[i] = new Float32Array(this.uniformGroup.uniforms[i]);
            }
        }
    }
    // TODO move to shader system..
    Shader.prototype.checkUniformExists = function (name, group) {
        if (group.uniforms[name]) {
            return true;
        }
        for (var i in group.uniforms) {
            var uniform = group.uniforms[i];
            if (uniform.group) {
                if (this.checkUniformExists(name, uniform)) {
                    return true;
                }
            }
        }
        return false;
    };
    Shader.prototype.destroy = function () {
        // usage count on programs?
        // remove if not used!
        this.uniformGroup = null;
    };
    Object.defineProperty(Shader.prototype, "uniforms", {
        /**
         * Shader uniform values, shortcut for `uniformGroup.uniforms`
         * @readonly
         * @member {object}
         */
        get: function () {
            return this.uniformGroup.uniforms;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * A short hand function to create a shader based of a vertex and fragment shader
     *
     * @param {string} [vertexSrc] - The source of the vertex shader.
     * @param {string} [fragmentSrc] - The source of the fragment shader.
     * @param {object} [uniforms] - Custom uniforms to use to augment the built-in ones.
     *
     * @returns {PIXI.Shader} an shiny new Pixi shader!
     */
    Shader.from = function (vertexSrc, fragmentSrc, uniforms) {
        var program = Program.from(vertexSrc, fragmentSrc);
        return new Shader(program, uniforms);
    };
    return Shader;
}());

/* eslint-disable max-len */
var BLEND = 0;
var OFFSET = 1;
var CULLING = 2;
var DEPTH_TEST = 3;
var WINDING = 4;
var DEPTH_MASK = 5;
/**
 * This is a WebGL state, and is is passed The WebGL StateManager.
 *
 * Each mesh rendered may require WebGL to be in a different state.
 * For example you may want different blend mode or to enable polygon offsets
 *
 * @class
 * @memberof PIXI
 */
var State = /** @class */ (function () {
    function State() {
        this.data = 0;
        this.blendMode = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].NORMAL;
        this.polygonOffset = 0;
        this.blend = true;
        this.depthMask = true;
        //  this.depthTest = true;
    }
    Object.defineProperty(State.prototype, "blend", {
        /**
         * Activates blending of the computed fragment color values
         *
         * @member {boolean}
         */
        get: function () {
            return !!(this.data & (1 << BLEND));
        },
        set: function (value) {
            if (!!(this.data & (1 << BLEND)) !== value) {
                this.data ^= (1 << BLEND);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "offsets", {
        /**
         * Activates adding an offset to depth values of polygon's fragments
         *
         * @member {boolean}
         * @default false
         */
        get: function () {
            return !!(this.data & (1 << OFFSET));
        },
        set: function (value) {
            if (!!(this.data & (1 << OFFSET)) !== value) {
                this.data ^= (1 << OFFSET);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "culling", {
        /**
         * Activates culling of polygons.
         *
         * @member {boolean}
         * @default false
         */
        get: function () {
            return !!(this.data & (1 << CULLING));
        },
        set: function (value) {
            if (!!(this.data & (1 << CULLING)) !== value) {
                this.data ^= (1 << CULLING);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "depthTest", {
        /**
         * Activates depth comparisons and updates to the depth buffer.
         *
         * @member {boolean}
         * @default false
         */
        get: function () {
            return !!(this.data & (1 << DEPTH_TEST));
        },
        set: function (value) {
            if (!!(this.data & (1 << DEPTH_TEST)) !== value) {
                this.data ^= (1 << DEPTH_TEST);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "depthMask", {
        /**
         * Enables or disables writing to the depth buffer.
         *
         * @member {boolean}
         * @default true
         */
        get: function () {
            return !!(this.data & (1 << DEPTH_MASK));
        },
        set: function (value) {
            if (!!(this.data & (1 << DEPTH_MASK)) !== value) {
                this.data ^= (1 << DEPTH_MASK);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "clockwiseFrontFace", {
        /**
         * Specifies whether or not front or back-facing polygons can be culled.
         * @member {boolean}
         * @default false
         */
        get: function () {
            return !!(this.data & (1 << WINDING));
        },
        set: function (value) {
            if (!!(this.data & (1 << WINDING)) !== value) {
                this.data ^= (1 << WINDING);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "blendMode", {
        /**
         * The blend mode to be applied when this state is set. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
         * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
         *
         * @member {number}
         * @default PIXI.BLEND_MODES.NORMAL
         * @see PIXI.BLEND_MODES
         */
        get: function () {
            return this._blendMode;
        },
        set: function (value) {
            this.blend = (value !== _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].NONE);
            this._blendMode = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "polygonOffset", {
        /**
         * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
         *
         * @member {number}
         * @default 0
         */
        get: function () {
            return this._polygonOffset;
        },
        set: function (value) {
            this.offsets = !!value;
            this._polygonOffset = value;
        },
        enumerable: false,
        configurable: true
    });
    State.prototype.toString = function () {
        return "[@pixi/core:State "
            + ("blendMode=" + this.blendMode + " ")
            + ("clockwiseFrontFace=" + this.clockwiseFrontFace + " ")
            + ("culling=" + this.culling + " ")
            + ("depthMask=" + this.depthMask + " ")
            + ("polygonOffset=" + this.polygonOffset)
            + "]";
    };
    State.for2d = function () {
        var state = new State();
        state.depthTest = false;
        state.blend = true;
        return state;
    };
    return State;
}());

var defaultVertex$1 = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";

var defaultFragment$1 = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n";

/**
 * A filter is a special shader that applies post-processing effects to an input texture and writes into an output
 * render-target.
 *
 * {@link http://pixijs.io/examples/#/filters/blur-filter.js Example} of the
 * {@link PIXI.filters.BlurFilter BlurFilter}.
 *
 * ### Usage
 * Filters can be applied to any DisplayObject or Container.
 * PixiJS' `FilterSystem` renders the container into temporary Framebuffer,
 * then filter renders it to the screen.
 * Multiple filters can be added to the `filters` array property and stacked on each other.
 *
 * ```
 * const filter = new PIXI.Filter(myShaderVert, myShaderFrag, { myUniform: 0.5 });
 * const container = new PIXI.Container();
 * container.filters = [filter];
 * ```
 *
 * ### Previous Version Differences
 *
 * In PixiJS **v3**, a filter was always applied to _whole screen_.
 *
 * In PixiJS **v4**, a filter can be applied _only part of the screen_.
 * Developers had to create a set of uniforms to deal with coordinates.
 *
 * In PixiJS **v5** combines _both approaches_.
 * Developers can use normal coordinates of v3 and then allow filter to use partial Framebuffers,
 * bringing those extra uniforms into account.
 *
 * Also be aware that we have changed default vertex shader, please consult
 * {@link https://github.com/pixijs/pixi.js/wiki/v5-Creating-filters Wiki}.
 *
 * ### Frames
 *
 * The following table summarizes the coordinate spaces used in the filtering pipeline:
 *
 * <table>
 * <thead>
 *   <tr>
 *     <th>Coordinate Space</th>
 *     <th>Description</th>
 *   </tr>
 * </thead>
 * <tbody>
 *   <tr>
 *     <td>Texture Coordinates</td>
 *     <td>
 *         The texture (or UV) coordinates in the input base-texture's space. These are normalized into the (0,1) range along
 *         both axes.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>World Space</td>
 *     <td>
 *         A point in the same space as the world bounds of any display-object (i.e. in the scene graph's space).
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>Physical Pixels</td>
 *     <td>
 *         This is base-texture's space with the origin on the top-left. You can calculate these by multiplying the texture
 *         coordinates by the dimensions of the texture.
 *     </td>
 *   </tr>
 * </tbody>
 * </table>
 *
 * ### Built-in Uniforms
 *
 * PixiJS viewport uses screen (CSS) coordinates, `(0, 0, renderer.screen.width, renderer.screen.height)`,
 * and `projectionMatrix` uniform maps it to the gl viewport.
 *
 * **uSampler**
 *
 * The most important uniform is the input texture that container was rendered into.
 * _Important note: as with all Framebuffers in PixiJS, both input and output are
 * premultiplied by alpha._
 *
 * By default, input normalized coordinates are passed to fragment shader with `vTextureCoord`.
 * Use it to sample the input.
 *
 * ```
 * const fragment = `
 * varying vec2 vTextureCoord;
 * uniform sampler2D uSampler;
 * void main(void)
 * {
 *    gl_FragColor = texture2D(uSampler, vTextureCoord);
 * }
 * `;
 *
 * const myFilter = new PIXI.Filter(null, fragment);
 * ```
 *
 * This filter is just one uniform less than {@link PIXI.filters.AlphaFilter AlphaFilter}.
 *
 * **outputFrame**
 *
 * The `outputFrame` holds the rectangle where filter is applied in screen (CSS) coordinates.
 * It's the same as `renderer.screen` for a fullscreen filter.
 * Only a part of  `outputFrame.zw` size of temporary Framebuffer is used,
 * `(0, 0, outputFrame.width, outputFrame.height)`,
 *
 * Filters uses this quad to normalized (0-1) space, its passed into `aVertexPosition` attribute.
 * To calculate vertex position in screen space using normalized (0-1) space:
 *
 * ```
 * vec4 filterVertexPosition( void )
 * {
 *     vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
 *     return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
 * }
 * ```
 *
 * **inputSize**
 *
 * Temporary framebuffer is different, it can be either the size of screen, either power-of-two.
 * The `inputSize.xy` are size of temporary framebuffer that holds input.
 * The `inputSize.zw` is inverted, it's a shortcut to evade division inside the shader.
 *
 * Set `inputSize.xy = outputFrame.zw` for a fullscreen filter.
 *
 * To calculate input normalized coordinate, you have to map it to filter normalized space.
 * Multiply by `outputFrame.zw` to get input coordinate.
 * Divide by `inputSize.xy` to get input normalized coordinate.
 *
 * ```
 * vec2 filterTextureCoord( void )
 * {
 *     return aVertexPosition * (outputFrame.zw * inputSize.zw); // same as /inputSize.xy
 * }
 * ```
 * **resolution**
 *
 * The `resolution` is the ratio of screen (CSS) pixels to real pixels.
 *
 * **inputPixel**
 *
 * `inputPixel.xy` is the size of framebuffer in real pixels, same as `inputSize.xy * resolution`
 * `inputPixel.zw` is inverted `inputPixel.xy`.
 *
 * It's handy for filters that use neighbour pixels, like {@link PIXI.filters.FXAAFilter FXAAFilter}.
 *
 * **inputClamp**
 *
 * If you try to get info from outside of used part of Framebuffer - you'll get undefined behaviour.
 * For displacements, coordinates has to be clamped.
 *
 * The `inputClamp.xy` is left-top pixel center, you may ignore it, because we use left-top part of Framebuffer
 * `inputClamp.zw` is bottom-right pixel center.
 *
 * ```
 * vec4 color = texture2D(uSampler, clamp(modifiedTextureCoord, inputClamp.xy, inputClamp.zw))
 * ```
 * OR
 * ```
 * vec4 color = texture2D(uSampler, min(modifigedTextureCoord, inputClamp.zw))
 * ```
 *
 * ### Additional Information
 *
 * Complete documentation on Filter usage is located in the
 * {@link https://github.com/pixijs/pixi.js/wiki/v5-Creating-filters Wiki}.
 *
 * Since PixiJS only had a handful of built-in filters, additional filters can be downloaded
 * {@link https://github.com/pixijs/pixi-filters here} from the PixiJS Filters repository.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.Shader
 */
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    /**
     * @param {string} [vertexSrc] - The source of the vertex shader.
     * @param {string} [fragmentSrc] - The source of the fragment shader.
     * @param {object} [uniforms] - Custom uniforms to use to augment the built-in ones.
     */
    function Filter(vertexSrc, fragmentSrc, uniforms) {
        var _this = this;
        var program = Program.from(vertexSrc || Filter.defaultVertexSrc, fragmentSrc || Filter.defaultFragmentSrc);
        _this = _super.call(this, program, uniforms) || this;
        /**
         * The padding of the filter. Some filters require extra space to breath such as a blur.
         * Increasing this will add extra width and height to the bounds of the object that the
         * filter is applied to.
         *
         * @member {number}
         */
        _this.padding = 0;
        /**
         * The resolution of the filter. Setting this to be lower will lower the quality but
         * increase the performance of the filter.
         *
         * @member {number}
         */
        _this.resolution = _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].FILTER_RESOLUTION;
        /**
         * If enabled is true the filter is applied, if false it will not.
         *
         * @member {boolean}
         */
        _this.enabled = true;
        /**
         * If enabled, PixiJS will fit the filter area into boundaries for better performance.
         * Switch it off if it does not work for specific shader.
         *
         * @member {boolean}
         */
        _this.autoFit = true;
        /**
         * Legacy filters use position and uvs from attributes
         * @member {boolean}
         * @readonly
         */
        _this.legacy = !!_this.program.attributeData.aTextureCoord;
        /**
         * The WebGL state the filter requires to render
         * @member {PIXI.State}
         */
        _this.state = new State();
        return _this;
    }
    /**
     * Applies the filter
     *
     * @param {PIXI.FilterSystem} filterManager - The renderer to retrieve the filter from
     * @param {PIXI.RenderTexture} input - The input render target.
     * @param {PIXI.RenderTexture} output - The target to output to.
     * @param {PIXI.CLEAR_MODES} [clearMode] - Should the output be cleared before rendering to it.
     * @param {object} [currentState] - It's current state of filter.
     *        There are some useful properties in the currentState :
     *        target, filters, sourceFrame, destinationFrame, renderTarget, resolution
     */
    Filter.prototype.apply = function (filterManager, input, output, clearMode, _currentState) {
        // do as you please!
        filterManager.applyFilter(this, input, output, clearMode);
        // or just do a regular render..
    };
    Object.defineProperty(Filter.prototype, "blendMode", {
        /**
         * Sets the blendmode of the filter
         *
         * @member {number}
         * @default PIXI.BLEND_MODES.NORMAL
         */
        get: function () {
            return this.state.blendMode;
        },
        set: function (value) {
            this.state.blendMode = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filter, "defaultVertexSrc", {
        /**
         * The default vertex shader source
         *
         * @static
         * @type {string}
         * @constant
         */
        get: function () {
            return defaultVertex$1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filter, "defaultFragmentSrc", {
        /**
         * The default fragment shader source
         *
         * @static
         * @type {string}
         * @constant
         */
        get: function () {
            return defaultFragment$1;
        },
        enumerable: false,
        configurable: true
    });
    return Filter;
}(Shader));

var vertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n";

var fragment = "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform float npmAlpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);\n\n    original *= (alphaMul * masky.r * alpha * clip);\n\n    gl_FragColor = original;\n}\n";

var tempMat = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Matrix"]();
/**
 * Class controls uv mapping from Texture normal space to BaseTexture normal space.
 *
 * Takes `trim` and `rotate` into account. May contain clamp settings for Meshes and TilingSprite.
 *
 * Can be used in Texture `uvMatrix` field, or separately, you can use different clamp settings on the same texture.
 * If you want to add support for texture region of certain feature or filter, that's what you're looking for.
 *
 * Takes track of Texture changes through `_lastTextureID` private field.
 * Use `update()` method call to track it from outside.
 *
 * @see PIXI.Texture
 * @see PIXI.Mesh
 * @see PIXI.TilingSprite
 * @class
 * @memberof PIXI
 */
var TextureMatrix = /** @class */ (function () {
    /**
     *
     * @param {PIXI.Texture} texture - observed texture
     * @param {number} [clampMargin] - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
     * @constructor
     */
    function TextureMatrix(texture, clampMargin) {
        this._texture = texture;
        /**
         * Matrix operation that converts texture region coords to texture coords
         * @member {PIXI.Matrix}
         * @readonly
         */
        this.mapCoord = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Matrix"]();
        /**
         * Clamp region for normalized coords, left-top pixel center in xy , bottom-right in zw.
         * Calculated based on clampOffset.
         * @member {Float32Array}
         * @readonly
         */
        this.uClampFrame = new Float32Array(4);
        /**
         * Normalized clamp offset.
         * Calculated based on clampOffset.
         * @member {Float32Array}
         * @readonly
         */
        this.uClampOffset = new Float32Array(2);
        /**
         * Tracks Texture frame changes
         * @member {number}
         * @protected
         */
        this._textureID = -1;
        /**
         * Tracks Texture frame changes
         * @member {number}
         * @protected
         */
        this._updateID = 0;
        /**
         * Changes frame clamping
         * Works with TilingSprite and Mesh
         * Change to 1.5 if you texture has repeated right and bottom lines, that leads to smoother borders
         *
         * @default 0
         * @member {number}
         */
        this.clampOffset = 0;
        /**
         * Changes frame clamping
         * Works with TilingSprite and Mesh
         * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
         *
         * @default 0.5
         * @member {number}
         */
        this.clampMargin = (typeof clampMargin === 'undefined') ? 0.5 : clampMargin;
        /**
         * If texture size is the same as baseTexture
         * @member {boolean}
         * @default false
         * @readonly
         */
        this.isSimple = false;
    }
    Object.defineProperty(TextureMatrix.prototype, "texture", {
        /**
         * texture property
         * @member {PIXI.Texture}
         */
        get: function () {
            return this._texture;
        },
        set: function (value) {
            this._texture = value;
            this._textureID = -1;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Multiplies uvs array to transform
     * @param {Float32Array} uvs - mesh uvs
     * @param {Float32Array} [out=uvs] - output
     * @returns {Float32Array} output
     */
    TextureMatrix.prototype.multiplyUvs = function (uvs, out) {
        if (out === undefined) {
            out = uvs;
        }
        var mat = this.mapCoord;
        for (var i = 0; i < uvs.length; i += 2) {
            var x = uvs[i];
            var y = uvs[i + 1];
            out[i] = (x * mat.a) + (y * mat.c) + mat.tx;
            out[i + 1] = (x * mat.b) + (y * mat.d) + mat.ty;
        }
        return out;
    };
    /**
     * updates matrices if texture was changed
     * @param {boolean} [forceUpdate=false] - if true, matrices will be updated any case
     * @returns {boolean} whether or not it was updated
     */
    TextureMatrix.prototype.update = function (forceUpdate) {
        var tex = this._texture;
        if (!tex || !tex.valid) {
            return false;
        }
        if (!forceUpdate
            && this._textureID === tex._updateID) {
            return false;
        }
        this._textureID = tex._updateID;
        this._updateID++;
        var uvs = tex._uvs;
        this.mapCoord.set(uvs.x1 - uvs.x0, uvs.y1 - uvs.y0, uvs.x3 - uvs.x0, uvs.y3 - uvs.y0, uvs.x0, uvs.y0);
        var orig = tex.orig;
        var trim = tex.trim;
        if (trim) {
            tempMat.set(orig.width / trim.width, 0, 0, orig.height / trim.height, -trim.x / trim.width, -trim.y / trim.height);
            this.mapCoord.append(tempMat);
        }
        var texBase = tex.baseTexture;
        var frame = this.uClampFrame;
        var margin = this.clampMargin / texBase.resolution;
        var offset = this.clampOffset;
        frame[0] = (tex._frame.x + margin + offset) / texBase.width;
        frame[1] = (tex._frame.y + margin + offset) / texBase.height;
        frame[2] = (tex._frame.x + tex._frame.width - margin + offset) / texBase.width;
        frame[3] = (tex._frame.y + tex._frame.height - margin + offset) / texBase.height;
        this.uClampOffset[0] = offset / texBase.realWidth;
        this.uClampOffset[1] = offset / texBase.realHeight;
        this.isSimple = tex._frame.width === texBase.width
            && tex._frame.height === texBase.height
            && tex.rotate === 0;
        return true;
    };
    return TextureMatrix;
}());

/**
 * This handles a Sprite acting as a mask, as opposed to a Graphic.
 *
 * WebGL only.
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI
 */
var SpriteMaskFilter = /** @class */ (function (_super) {
    __extends(SpriteMaskFilter, _super);
    /**
     * @param {PIXI.Sprite} sprite - the target sprite
     */
    function SpriteMaskFilter(sprite) {
        var _this = this;
        var maskMatrix = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Matrix"]();
        _this = _super.call(this, vertex, fragment) || this;
        sprite.renderable = false;
        /**
         * Sprite mask
         * @member {PIXI.Sprite}
         */
        _this.maskSprite = sprite;
        /**
         * Mask matrix
         * @member {PIXI.Matrix}
         */
        _this.maskMatrix = maskMatrix;
        return _this;
    }
    /**
     * Applies the filter
     *
     * @param {PIXI.FilterSystem} filterManager - The renderer to retrieve the filter from
     * @param {PIXI.RenderTexture} input - The input render target.
     * @param {PIXI.RenderTexture} output - The target to output to.
     * @param {PIXI.CLEAR_MODES} clearMode - Should the output be cleared before rendering to it.
     */
    SpriteMaskFilter.prototype.apply = function (filterManager, input, output, clearMode) {
        var maskSprite = this.maskSprite;
        var tex = maskSprite._texture;
        if (!tex.valid) {
            return;
        }
        if (!tex.uvMatrix) {
            // margin = 0.0, let it bleed a bit, shader code becomes easier
            // assuming that atlas textures were made with 1-pixel padding
            tex.uvMatrix = new TextureMatrix(tex, 0.0);
        }
        tex.uvMatrix.update();
        this.uniforms.npmAlpha = tex.baseTexture.alphaMode ? 0.0 : 1.0;
        this.uniforms.mask = tex;
        // get _normalized sprite texture coords_ and convert them to _normalized atlas texture coords_ with `prepend`
        this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite)
            .prepend(tex.uvMatrix.mapCoord);
        this.uniforms.alpha = maskSprite.worldAlpha;
        this.uniforms.maskClamp = tex.uvMatrix.uClampFrame;
        filterManager.applyFilter(this, input, output, clearMode);
    };
    return SpriteMaskFilter;
}(Filter));

/**
 * System plugin to the renderer to manage masks.
 *
 * There are three built-in types of masking:
 * * **Scissor Masking**: Scissor masking discards pixels that are outside of a rectangle called the scissor box. It is
 *  the most performant as the scissor test is inexpensive. However, it can only be used when the mask is rectangular.
 * * **Stencil Masking**: Stencil masking discards pixels that don't overlap with the pixels rendered into the stencil
 *  buffer. It is the next fastest option as it does not require rendering into a separate framebuffer. However, it does
 *  cause the mask to be rendered **twice** for each masking operation; hence, minimize the rendering cost of your masks.
 * * **Sprite Mask Filtering**: Sprite mask filtering discards pixels based on the red channel of the sprite-mask's
 *  texture. (Generally, the masking texture is grayscale). Using advanced techniques, you might be able to embed this
 *  type of masking in a custom shader - and hence, bypassing the masking system fully for performance wins.
 *
 * The best type of masking is auto-detected when you `push` one. To use scissor masking, you must pass in a `Graphics`
 * object with just a rectangle drawn.
 *
 * ## Mask Stacks
 *
 * In the scene graph, masks can be applied recursively, i.e. a mask can be applied during a masking operation. The mask
 * stack stores the currently applied masks in order. Each {@link PIXI.BaseRenderTexture} holds its own mask stack, i.e.
 * when you switch render-textures, the old masks only applied when you switch back to rendering to the old render-target.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var MaskSystem = /** @class */ (function (_super) {
    __extends(MaskSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function MaskSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * Enable scissor masking.
         *
         * @member {boolean}
         * @readonly
         */
        _this.enableScissor = true;
        /**
         * Pool of used sprite mask filters
         * @member {PIXI.SpriteMaskFilter[]}
         * @readonly
         */
        _this.alphaMaskPool = [];
        /**
         * Pool of mask data
         * @member {PIXI.MaskData[]}
         * @readonly
         */
        _this.maskDataPool = [];
        _this.maskStack = [];
        /**
         * Current index of alpha mask pool
         * @member {number}
         * @default 0
         * @readonly
         */
        _this.alphaMaskIndex = 0;
        return _this;
    }
    /**
     * Changes the mask stack that is used by this System.
     *
     * @param {PIXI.MaskData[]} maskStack - The mask stack
     */
    MaskSystem.prototype.setMaskStack = function (maskStack) {
        this.maskStack = maskStack;
        this.renderer.scissor.setMaskStack(maskStack);
        this.renderer.stencil.setMaskStack(maskStack);
    };
    /**
     * Enables the mask and appends it to the current mask stack.
     *
     * NOTE: The batch renderer should be flushed beforehand to prevent pending renders from being masked.
     *
     * @param {PIXI.DisplayObject} target - Display Object to push the mask to
     * @param {PIXI.MaskData|PIXI.Sprite|PIXI.Graphics|PIXI.DisplayObject} maskData - The masking data.
     */
    MaskSystem.prototype.push = function (target, maskDataOrTarget) {
        var maskData = maskDataOrTarget;
        if (!maskData.isMaskData) {
            var d = this.maskDataPool.pop() || new MaskData();
            d.pooled = true;
            d.maskObject = maskDataOrTarget;
            maskData = d;
        }
        if (maskData.autoDetect) {
            this.detect(maskData);
        }
        maskData.copyCountersOrReset(this.maskStack[this.maskStack.length - 1]);
        maskData._target = target;
        switch (maskData.type) {
            case _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].SCISSOR:
                this.maskStack.push(maskData);
                this.renderer.scissor.push(maskData);
                break;
            case _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].STENCIL:
                this.maskStack.push(maskData);
                this.renderer.stencil.push(maskData);
                break;
            case _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].SPRITE:
                maskData.copyCountersOrReset(null);
                this.pushSpriteMask(maskData);
                this.maskStack.push(maskData);
                break;
        }
    };
    /**
     * Removes the last mask from the mask stack and doesn't return it.
     *
     * NOTE: The batch renderer should be flushed beforehand to render the masked contents before the mask is removed.
     *
     * @param {PIXI.DisplayObject} target - Display Object to pop the mask from
     */
    MaskSystem.prototype.pop = function (target) {
        var maskData = this.maskStack.pop();
        if (!maskData || maskData._target !== target) {
            // TODO: add an assert when we have it
            return;
        }
        switch (maskData.type) {
            case _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].SCISSOR:
                this.renderer.scissor.pop();
                break;
            case _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].STENCIL:
                this.renderer.stencil.pop(maskData.maskObject);
                break;
            case _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].SPRITE:
                this.popSpriteMask();
                break;
        }
        maskData.reset();
        if (maskData.pooled) {
            this.maskDataPool.push(maskData);
        }
    };
    /**
     * Sets type of MaskData based on its maskObject
     * @param {PIXI.MaskData} maskData
     */
    MaskSystem.prototype.detect = function (maskData) {
        var maskObject = maskData.maskObject;
        if (maskObject.isSprite) {
            maskData.type = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].SPRITE;
            return;
        }
        maskData.type = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].STENCIL;
        // detect scissor in graphics
        if (this.enableScissor
            && maskObject.isFastRect
            && maskObject.isFastRect()) {
            var matrix = maskObject.worldTransform;
            // TODO: move the check to the matrix itself
            // we are checking that its orthogonal and x rotation is 0 90 180 or 270
            var rotX = Math.atan2(matrix.b, matrix.a);
            var rotXY = Math.atan2(matrix.d, matrix.c);
            // use the nearest degree to 0.01
            rotX = Math.round(rotX * (180 / Math.PI) * 100);
            rotXY = Math.round(rotXY * (180 / Math.PI) * 100) - rotX;
            rotX = ((rotX % 9000) + 9000) % 9000;
            rotXY = ((rotXY % 18000) + 18000) % 18000;
            if (rotX === 0 && rotXY === 9000) {
                maskData.type = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MASK_TYPES"].SCISSOR;
            }
        }
    };
    /**
     * Applies the Mask and adds it to the current filter stack.
     *
     * @param {PIXI.MaskData} maskData - Sprite to be used as the mask
     */
    MaskSystem.prototype.pushSpriteMask = function (maskData) {
        var maskObject = maskData.maskObject;
        var target = maskData._target;
        var alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex];
        if (!alphaMaskFilter) {
            alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter(maskObject)];
        }
        alphaMaskFilter[0].resolution = this.renderer.resolution;
        alphaMaskFilter[0].maskSprite = maskObject;
        var stashFilterArea = target.filterArea;
        target.filterArea = maskObject.getBounds(true);
        this.renderer.filter.push(target, alphaMaskFilter);
        target.filterArea = stashFilterArea;
        this.alphaMaskIndex++;
    };
    /**
     * Removes the last filter from the filter stack and doesn't return it.
     */
    MaskSystem.prototype.popSpriteMask = function () {
        this.renderer.filter.pop();
        this.alphaMaskIndex--;
    };
    return MaskSystem;
}(System));

/**
 * System plugin to the renderer to manage specific types of masking operations.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var AbstractMaskSystem = /** @class */ (function (_super) {
    __extends(AbstractMaskSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function AbstractMaskSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * The mask stack
         * @member {PIXI.MaskData[]}
         */
        _this.maskStack = [];
        /**
         * Constant for gl.enable
         * @member {number}
         * @private
         */
        _this.glConst = 0;
        return _this;
    }
    /**
     * gets count of masks of certain type
     * @returns {number}
     */
    AbstractMaskSystem.prototype.getStackLength = function () {
        return this.maskStack.length;
    };
    /**
     * Changes the mask stack that is used by this System.
     *
     * @param {PIXI.MaskData[]} maskStack - The mask stack
     */
    AbstractMaskSystem.prototype.setMaskStack = function (maskStack) {
        var gl = this.renderer.gl;
        var curStackLen = this.getStackLength();
        this.maskStack = maskStack;
        var newStackLen = this.getStackLength();
        if (newStackLen !== curStackLen) {
            if (newStackLen === 0) {
                gl.disable(this.glConst);
            }
            else {
                gl.enable(this.glConst);
                this._useCurrent();
            }
        }
    };
    /**
     * Setup renderer to use the current mask data.
     * @private
     */
    AbstractMaskSystem.prototype._useCurrent = function () {
        // OVERWRITE;
    };
    /**
     * Destroys the mask stack.
     *
     */
    AbstractMaskSystem.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.maskStack = null;
    };
    return AbstractMaskSystem;
}(System));

/**
 * System plugin to the renderer to manage scissor masking.
 *
 * Scissor masking discards pixels outside of a rectangle called the scissor box. The scissor box is in the framebuffer
 * viewport's space; however, the mask's rectangle is projected from world-space to viewport space automatically
 * by this system.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var ScissorSystem = /** @class */ (function (_super) {
    __extends(ScissorSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function ScissorSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        _this.glConst = WebGLRenderingContext.SCISSOR_TEST;
        return _this;
    }
    ScissorSystem.prototype.getStackLength = function () {
        var maskData = this.maskStack[this.maskStack.length - 1];
        if (maskData) {
            return maskData._scissorCounter;
        }
        return 0;
    };
    /**
     * Applies the Mask and adds it to the current stencil stack.
     *
     * @author alvin
     * @param {PIXI.MaskData} maskData - The mask data
     */
    ScissorSystem.prototype.push = function (maskData) {
        var maskObject = maskData.maskObject;
        maskObject.renderable = true;
        var prevData = maskData._scissorRect;
        var bounds = maskObject.getBounds(true);
        var gl = this.renderer.gl;
        maskObject.renderable = false;
        if (prevData) {
            bounds.fit(prevData);
        }
        else {
            gl.enable(gl.SCISSOR_TEST);
        }
        maskData._scissorCounter++;
        maskData._scissorRect = bounds;
        this._useCurrent();
    };
    /**
     * This should be called after a mask is popped off the mask stack. It will rebind the scissor box to be latest with the
     * last mask in the stack.
     *
     * This can also be called when you directly modify the scissor box and want to restore PixiJS state.
     */
    ScissorSystem.prototype.pop = function () {
        var gl = this.renderer.gl;
        if (this.getStackLength() > 0) {
            this._useCurrent();
        }
        else {
            gl.disable(gl.SCISSOR_TEST);
        }
    };
    /**
     * Setup renderer to use the current scissor data.
     * @private
     */
    ScissorSystem.prototype._useCurrent = function () {
        var rect = this.maskStack[this.maskStack.length - 1]._scissorRect;
        var rt = this.renderer.renderTexture.current;
        var _a = this.renderer.projection, transform = _a.transform, sourceFrame = _a.sourceFrame, destinationFrame = _a.destinationFrame;
        var resolution = rt ? rt.resolution : this.renderer.resolution;
        var sx = destinationFrame.width / sourceFrame.width;
        var sy = destinationFrame.height / sourceFrame.height;
        var x = (((rect.x - sourceFrame.x) * sx) + destinationFrame.x) * resolution;
        var y = (((rect.y - sourceFrame.y) * sy) + destinationFrame.y) * resolution;
        var width = rect.width * sx * resolution;
        var height = rect.height * sy * resolution;
        if (transform) {
            x += transform.tx * resolution;
            y += transform.ty * resolution;
        }
        if (!rt) {
            // flipY. In future we'll have it over renderTextures as an option
            y = this.renderer.height - height - y;
        }
        this.renderer.gl.scissor(x, y, width, height);
    };
    return ScissorSystem;
}(AbstractMaskSystem));

/**
 * System plugin to the renderer to manage stencils (used for masks).
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var StencilSystem = /** @class */ (function (_super) {
    __extends(StencilSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function StencilSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        _this.glConst = WebGLRenderingContext.STENCIL_TEST;
        return _this;
    }
    StencilSystem.prototype.getStackLength = function () {
        var maskData = this.maskStack[this.maskStack.length - 1];
        if (maskData) {
            return maskData._stencilCounter;
        }
        return 0;
    };
    /**
     * Applies the Mask and adds it to the current stencil stack.
     *
     * @param {PIXI.MaskData} maskData - The mask data
     */
    StencilSystem.prototype.push = function (maskData) {
        var maskObject = maskData.maskObject;
        var gl = this.renderer.gl;
        var prevMaskCount = maskData._stencilCounter;
        if (prevMaskCount === 0) {
            // force use stencil texture in current framebuffer
            this.renderer.framebuffer.forceStencil();
            gl.enable(gl.STENCIL_TEST);
        }
        maskData._stencilCounter++;
        // Increment the reference stencil value where the new mask overlaps with the old ones.
        gl.colorMask(false, false, false, false);
        gl.stencilFunc(gl.EQUAL, prevMaskCount, this._getBitwiseMask());
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
        maskObject.renderable = true;
        maskObject.render(this.renderer);
        this.renderer.batch.flush();
        this.renderer.framebuffer.blit();
        maskObject.renderable = false;
        this._useCurrent();
    };
    /**
     * Pops stencil mask. MaskData is already removed from stack
     *
     * @param {PIXI.DisplayObject} maskObject - object of popped mask data
     */
    StencilSystem.prototype.pop = function (maskObject) {
        var gl = this.renderer.gl;
        if (this.getStackLength() === 0) {
            // the stack is empty!
            gl.disable(gl.STENCIL_TEST);
            gl.clear(gl.STENCIL_BUFFER_BIT);
            gl.clearStencil(0);
        }
        else {
            // Decrement the reference stencil value where the popped mask overlaps with the other ones
            gl.colorMask(false, false, false, false);
            gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
            maskObject.renderable = true;
            maskObject.render(this.renderer);
            this.renderer.batch.flush();
            maskObject.renderable = false;
            this._useCurrent();
        }
    };
    /**
     * Setup renderer to use the current stencil data.
     * @private
     */
    StencilSystem.prototype._useCurrent = function () {
        var gl = this.renderer.gl;
        gl.colorMask(true, true, true, true);
        gl.stencilFunc(gl.EQUAL, this.getStackLength(), this._getBitwiseMask());
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    };
    /**
     * Fill 1s equal to the number of acitve stencil masks.
     * @private
     * @return {number} The bitwise mask.
     */
    StencilSystem.prototype._getBitwiseMask = function () {
        return (1 << this.getStackLength()) - 1;
    };
    return StencilSystem;
}(AbstractMaskSystem));

/**
 * System plugin to the renderer to manage the projection matrix.
 *
 * The `projectionMatrix` is a global uniform provided to all shaders. It is used to transform points in world space to
 * normalized device coordinates.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var ProjectionSystem = /** @class */ (function (_super) {
    __extends(ProjectionSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function ProjectionSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * The destination frame used to calculate the current projection matrix.
         *
         * The destination frame is the rectangle in the render-target into which contents are rendered. If rendering
         * to the screen, the origin is on the top-left. If rendering to a framebuffer, the origin is on the
         * bottom-left. This "flipping" phenomenon is because of WebGL convention for (shader) texture coordinates, where
         * the bottom-left corner is (0,0). It allows display-objects to map their (0,0) position in local-space (top-left)
         * to (0,0) in texture space (bottom-left). In other words, a sprite's top-left corner actually renders the
         * texture's bottom-left corner. You will also notice this when using a tool like SpectorJS to view your textures
         * at runtime.
         *
         * The destination frame's dimensions (width,height) should be equal to the source frame. This is because,
         * otherwise, the contents will be scaled to fill the destination frame. Similarly, the destination frame's (x,y)
         * coordinates are (0,0) unless you know what you're doing.
         *
         *
         * @member {PIXI.Rectangle}
         * @readonly
         */
        _this.destinationFrame = null;
        /**
         * The source frame used to calculate the current projection matrix.
         *
         * The source frame is the rectangle in world space containing the contents to be rendered.
         *
         * @member {PIXI.Rectangle}
         * @readonly
         */
        _this.sourceFrame = null;
        /**
         * Default destination frame
         *
         * This is not used internally. It is not advised to use this feature specifically unless you know what
         * you're doing. The `update` method will default to this frame if you do not pass the destination frame.
         *
         * @member {PIXI.Rectangle}
         * @readonly
         */
        _this.defaultFrame = null;
        /**
         * Projection matrix
         *
         * This matrix can be used to transform points from world space to normalized device coordinates, and is calculated
         * from the sourceFrame → destinationFrame mapping provided.
         *
         * The renderer's `globalUniforms` keeps a reference to this, and so it is available for all shaders to use as a
         * uniform.
         *
         * @member {PIXI.Matrix}
         * @readonly
         */
        _this.projectionMatrix = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Matrix"]();
        /**
         * A transform to be appended to the projection matrix.
         *
         * This can be used to transform points in world-space one last time before they are outputted by the shader. You can
         * use to rotate the whole scene, for example. Remember to clear it once you've rendered everything.
         *
         * @member {PIXI.Matrix}
         */
        _this.transform = null;
        return _this;
    }
    /**
     * Updates the projection-matrix based on the sourceFrame → destinationFrame mapping provided.
     *
     * NOTE: It is expected you call `renderer.framebuffer.setViewport(destinationFrame)` after this. This is because
     * the framebuffer viewport converts shader vertex output in normalized device coordinates to window coordinates.
     *
     * NOTE-2: {@link RenderTextureSystem#bind} updates the projection-matrix when you bind a render-texture. It is expected
     * that you dirty the current bindings when calling this manually.
     *
     * @param {PIXI.Rectangle} destinationFrame - The rectangle in the render-target to render the contents
     *  into. If rendering to the canvas, the origin is on the top-left; if rendering to a render-texture, the origin
     *  is on the bottom-left.
     * @param {PIXI.Rectangle} sourceFrame - The rectangle in world space that contains the contents being rendered.
     * @param {Number} resolution - The resolution of the render-target, which is the ratio of world-space (or CSS) pixels
     *  to physical pixels.
     * @param {boolean} root - Whether the render-target is the screen. This is required because rendering to textures
     *  is y-flipped (i.e. upside down relative to the screen).
     */
    ProjectionSystem.prototype.update = function (destinationFrame, sourceFrame, resolution, root) {
        this.destinationFrame = destinationFrame || this.destinationFrame || this.defaultFrame;
        this.sourceFrame = sourceFrame || this.sourceFrame || destinationFrame;
        // Calculate object-space to clip-space projection
        this.calculateProjection(this.destinationFrame, this.sourceFrame, resolution, root);
        if (this.transform) {
            this.projectionMatrix.append(this.transform);
        }
        var renderer = this.renderer;
        renderer.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix;
        renderer.globalUniforms.update();
        // this will work for now
        // but would be sweet to stick and even on the global uniforms..
        if (renderer.shader.shader) {
            renderer.shader.syncUniformGroup(renderer.shader.shader.uniforms.globals);
        }
    };
    /**
     * Calculates the `projectionMatrix` to map points inside `sourceFrame` to inside `destinationFrame`.
     *
     * @param {PIXI.Rectangle} destinationFrame - The destination frame in the render-target.
     * @param {PIXI.Rectangle} sourceFrame - The source frame in world space.
     * @param {Number} resolution - The render-target's resolution, i.e. ratio of CSS to physical pixels.
     * @param {boolean} root - Whether rendering into the screen. Otherwise, if rendering to a framebuffer, the projection
     *  is y-flipped.
     */
    ProjectionSystem.prototype.calculateProjection = function (_destinationFrame, sourceFrame, _resolution, root) {
        var pm = this.projectionMatrix;
        var sign = !root ? 1 : -1;
        pm.identity();
        pm.a = (1 / sourceFrame.width * 2);
        pm.d = sign * (1 / sourceFrame.height * 2);
        pm.tx = -1 - (sourceFrame.x * pm.a);
        pm.ty = -sign - (sourceFrame.y * pm.d);
    };
    /**
     * Sets the transform of the active render target to the given matrix
     *
     * @param {PIXI.Matrix} matrix - The transformation matrix
     */
    ProjectionSystem.prototype.setTransform = function (_matrix) {
        // this._activeRenderTarget.transform = matrix;
    };
    return ProjectionSystem;
}(System));

// Temporary rectangle for assigned sourceFrame or destinationFrame
var tempRect = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
// Temporary rectangle for renderTexture destinationFrame
var tempRect2 = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
/* eslint-disable max-len */
/**
 * System plugin to the renderer to manage render textures.
 *
 * Should be added after FramebufferSystem
 *
 * ### Frames
 *
 * The `RenderTextureSystem` holds a sourceFrame → destinationFrame projection. The following table explains the different
 * coordinate spaces used:
 *
 * | Frame                  | Description                                                      | Coordinate System                                       |
 * | ---------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
 * | sourceFrame            | The rectangle inside of which display-objects are being rendered | **World Space**: The origin on the top-left             |
 * | destinationFrame       | The rectangle in the render-target (canvas or texture) into which contents should be rendered | If rendering to the canvas, this is in screen space and the origin is on the top-left. If rendering to a render-texture, this is in its base-texture's space with the origin on the bottom-left.  |
 * | viewportFrame          | The framebuffer viewport corresponding to the destination-frame  | **Window Coordinates**: The origin is always on the bottom-left. |
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var RenderTextureSystem = /** @class */ (function (_super) {
    __extends(RenderTextureSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function RenderTextureSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * The clear background color as rgba
         * @member {number[]}
         */
        _this.clearColor = renderer._backgroundColorRgba;
        // TODO move this property somewhere else!
        /**
         * List of masks for the StencilSystem
         * @member {PIXI.Graphics[]}
         * @readonly
         */
        _this.defaultMaskStack = [];
        // empty render texture?
        /**
         * Render texture
         * @member {PIXI.RenderTexture}
         * @readonly
         */
        _this.current = null;
        /**
         * The source frame for the render-target's projection mapping.
         *
         * See {@link PIXI.ProjectionSystem#sourceFrame} for more details.
         *
         * @member {PIXI.Rectangle}
         * @readonly
         */
        _this.sourceFrame = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
        /**
         * The destination frame for the render-target's projection mapping.
         *
         * See {@link PIXI.Projection#destinationFrame} for more details.
         *
         * @member {PIXI.Rectangle}
         * @readonly
         */
        _this.destinationFrame = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
        /**
         * The viewport frame for the render-target's viewport binding. This is equal to the destination-frame
         * for render-textures, while it is y-flipped when rendering to the screen (i.e. its origin is always on
         * the bottom-left).
         *
         * @member {PIXI.Rectangle}
         * @readonly
         */
        _this.viewportFrame = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"]();
        return _this;
    }
    /**
     * Bind the current render texture
     *
     * @param {PIXI.RenderTexture} [renderTexture] - RenderTexture to bind, by default its `null`, the screen
     * @param {PIXI.Rectangle} [sourceFrame] - part of screen that is mapped to the renderTexture
     * @param {PIXI.Rectangle} [destinationFrame] - part of renderTexture, by default it has the same size as sourceFrame
     */
    RenderTextureSystem.prototype.bind = function (renderTexture, sourceFrame, destinationFrame) {
        if (renderTexture === void 0) { renderTexture = null; }
        var renderer = this.renderer;
        this.current = renderTexture;
        var baseTexture;
        var framebuffer;
        var resolution;
        if (renderTexture) {
            baseTexture = renderTexture.baseTexture;
            resolution = baseTexture.resolution;
            if (!sourceFrame) {
                tempRect.width = renderTexture.frame.width;
                tempRect.height = renderTexture.frame.height;
                sourceFrame = tempRect;
            }
            if (!destinationFrame) {
                tempRect2.x = renderTexture.frame.x;
                tempRect2.y = renderTexture.frame.y;
                tempRect2.width = sourceFrame.width;
                tempRect2.height = sourceFrame.height;
                destinationFrame = tempRect2;
            }
            framebuffer = baseTexture.framebuffer;
        }
        else {
            resolution = renderer.resolution;
            if (!sourceFrame) {
                tempRect.width = renderer.screen.width;
                tempRect.height = renderer.screen.height;
                sourceFrame = tempRect;
            }
            if (!destinationFrame) {
                destinationFrame = tempRect;
                destinationFrame.width = sourceFrame.width;
                destinationFrame.height = sourceFrame.height;
            }
        }
        var viewportFrame = this.viewportFrame;
        viewportFrame.x = destinationFrame.x * resolution;
        viewportFrame.y = destinationFrame.y * resolution;
        viewportFrame.width = destinationFrame.width * resolution;
        viewportFrame.height = destinationFrame.height * resolution;
        if (!renderTexture) {
            viewportFrame.y = renderer.view.height - (viewportFrame.y + viewportFrame.height);
        }
        this.renderer.framebuffer.bind(framebuffer, viewportFrame);
        this.renderer.projection.update(destinationFrame, sourceFrame, resolution, !framebuffer);
        if (renderTexture) {
            this.renderer.mask.setMaskStack(baseTexture.maskStack);
        }
        else {
            this.renderer.mask.setMaskStack(this.defaultMaskStack);
        }
        this.sourceFrame.copyFrom(sourceFrame);
        this.destinationFrame.copyFrom(destinationFrame);
    };
    /**
     * Erases the render texture and fills the drawing area with a colour
     *
     * @param {number[]} [clearColor] - The color as rgba, default to use the renderer backgroundColor
     * @param {PIXI.BUFFER_BITS} [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
     *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
     * @return {PIXI.Renderer} Returns itself.
     */
    RenderTextureSystem.prototype.clear = function (clearColor, mask) {
        if (this.current) {
            clearColor = clearColor || this.current.baseTexture.clearColor;
        }
        else {
            clearColor = clearColor || this.clearColor;
        }
        var destinationFrame = this.destinationFrame;
        var baseFrame = this.current ? this.current.baseTexture : this.renderer.screen;
        var clearMask = destinationFrame.width !== baseFrame.width || destinationFrame.height !== baseFrame.height;
        if (clearMask) {
            var _a = this.viewportFrame, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
            // TODO: ScissorSystem should cache whether the scissor test is enabled or not.
            this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
            this.renderer.gl.scissor(x, y, width, height);
        }
        this.renderer.framebuffer.clear(clearColor[0], clearColor[1], clearColor[2], clearColor[3], mask);
        if (clearMask) {
            // Restore the scissor box
            this.renderer.scissor.pop();
        }
    };
    RenderTextureSystem.prototype.resize = function () {
        // resize the root only!
        this.bind(null);
    };
    /**
     * Resets renderTexture state
     */
    RenderTextureSystem.prototype.reset = function () {
        this.bind(null);
    };
    return RenderTextureSystem;
}(System));

var IGLUniformData = /** @class */ (function () {
    function IGLUniformData() {
    }
    return IGLUniformData;
}());
/**
 * Helper class to create a WebGL Program
 *
 * @class
 * @memberof PIXI
 */
var GLProgram = /** @class */ (function () {
    /**
     * Makes a new Pixi program
     *
     * @param {WebGLProgram} program - webgl program
     * @param {Object} uniformData - uniforms
     */
    function GLProgram(program, uniformData) {
        /**
         * The shader program
         *
         * @member {WebGLProgram}
         */
        this.program = program;
        /**
         * holds the uniform data which contains uniform locations
         * and current uniform values used for caching and preventing unneeded GPU commands
         * @member {Object}
         */
        this.uniformData = uniformData;
        /**
         * uniformGroups holds the various upload functions for the shader. Each uniform group
         * and program have a unique upload function generated.
         * @member {Object}
         */
        this.uniformGroups = {};
    }
    /**
     * Destroys this program
     */
    GLProgram.prototype.destroy = function () {
        this.uniformData = null;
        this.uniformGroups = null;
        this.program = null;
    };
    return GLProgram;
}());

var UID$4 = 0;
// default sync data so we don't create a new one each time!
var defaultSyncData = { textureCount: 0 };
/**
 * System plugin to the renderer to manage shaders.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.System
 */
var ShaderSystem = /** @class */ (function (_super) {
    __extends(ShaderSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function ShaderSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        _this.destroyed = false;
        // Validation check that this environment support `new Function`
        _this.systemCheck();
        /**
         * The current WebGL rendering context
         *
         * @member {WebGLRenderingContext}
         */
        _this.gl = null;
        _this.shader = null;
        _this.program = null;
        /**
         * Cache to holds the generated functions. Stored against UniformObjects unique signature
         * @type {Object}
         * @private
         */
        _this.cache = {};
        _this.id = UID$4++;
        return _this;
    }
    /**
     * Overrideable function by `@pixi/unsafe-eval` to silence
     * throwing an error if platform doesn't support unsafe-evals.
     *
     * @private
     */
    ShaderSystem.prototype.systemCheck = function () {
        if (!unsafeEvalSupported()) {
            throw new Error('Current environment does not allow unsafe-eval, '
                + 'please use @pixi/unsafe-eval module to enable support.');
        }
    };
    ShaderSystem.prototype.contextChange = function (gl) {
        this.gl = gl;
        this.reset();
    };
    /**
     * Changes the current shader to the one given in parameter
     *
     * @param {PIXI.Shader} shader - the new shader
     * @param {boolean} [dontSync] - false if the shader should automatically sync its uniforms.
     * @returns {PIXI.GLProgram} the glProgram that belongs to the shader.
     */
    ShaderSystem.prototype.bind = function (shader, dontSync) {
        shader.uniforms.globals = this.renderer.globalUniforms;
        var program = shader.program;
        var glProgram = program.glPrograms[this.renderer.CONTEXT_UID] || this.generateShader(shader);
        this.shader = shader;
        // TODO - some current Pixi plugins bypass this.. so it not safe to use yet..
        if (this.program !== program) {
            this.program = program;
            this.gl.useProgram(glProgram.program);
        }
        if (!dontSync) {
            defaultSyncData.textureCount = 0;
            this.syncUniformGroup(shader.uniformGroup, defaultSyncData);
        }
        return glProgram;
    };
    /**
     * Uploads the uniforms values to the currently bound shader.
     *
     * @param {object} uniforms - the uniforms values that be applied to the current shader
     */
    ShaderSystem.prototype.setUniforms = function (uniforms) {
        var shader = this.shader.program;
        var glProgram = shader.glPrograms[this.renderer.CONTEXT_UID];
        shader.syncUniforms(glProgram.uniformData, uniforms, this.renderer);
    };
    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    /**
     *
     * syncs uniforms on the group
     * @param {*} group - the uniform group to sync
     * @param {*} [syncData] - this is data that is passed to the sync function and any nested sync functions
     */
    ShaderSystem.prototype.syncUniformGroup = function (group, syncData) {
        var glProgram = this.getglProgram();
        if (!group.static || group.dirtyId !== glProgram.uniformGroups[group.id]) {
            glProgram.uniformGroups[group.id] = group.dirtyId;
            this.syncUniforms(group, glProgram, syncData);
        }
    };
    /**
     * Overrideable by the @pixi/unsafe-eval package to use static
     * syncUnforms instead.
     *
     * @private
     */
    ShaderSystem.prototype.syncUniforms = function (group, glProgram, syncData) {
        var syncFunc = group.syncUniforms[this.shader.program.id] || this.createSyncGroups(group);
        syncFunc(glProgram.uniformData, group.uniforms, this.renderer, syncData);
    };
    /* eslint-enable @typescript-eslint/explicit-module-boundary-types */
    ShaderSystem.prototype.createSyncGroups = function (group) {
        var id = this.getSignature(group, this.shader.program.uniformData);
        if (!this.cache[id]) {
            this.cache[id] = generateUniformsSync(group, this.shader.program.uniformData);
        }
        group.syncUniforms[this.shader.program.id] = this.cache[id];
        return group.syncUniforms[this.shader.program.id];
    };
    /**
     * Takes a uniform group and data and generates a unique signature for them.
     *
     * @param {PIXI.UniformGroup} group - the uniform group to get signature of
     * @param {Object} uniformData - uniform information generated by the shader
     * @returns {String} Unique signature of the uniform group
     * @private
     */
    ShaderSystem.prototype.getSignature = function (group, uniformData) {
        var uniforms = group.uniforms;
        var strings = [];
        for (var i in uniforms) {
            strings.push(i);
            if (uniformData[i]) {
                strings.push(uniformData[i].type);
            }
        }
        return strings.join('-');
    };
    /**
     * Returns the underlying GLShade rof the currently bound shader.
     * This can be handy for when you to have a little more control over the setting of your uniforms.
     *
     * @return {PIXI.GLProgram} the glProgram for the currently bound Shader for this context
     */
    ShaderSystem.prototype.getglProgram = function () {
        if (this.shader) {
            return this.shader.program.glPrograms[this.renderer.CONTEXT_UID];
        }
        return null;
    };
    /**
     * Generates a glProgram version of the Shader provided.
     *
     * @private
     * @param {PIXI.Shader} shader - the shader that the glProgram will be based on.
     * @return {PIXI.GLProgram} A shiny new glProgram!
     */
    ShaderSystem.prototype.generateShader = function (shader) {
        var gl = this.gl;
        var program = shader.program;
        var attribMap = {};
        for (var i in program.attributeData) {
            attribMap[i] = program.attributeData[i].location;
        }
        var shaderProgram = compileProgram(gl, program.vertexSrc, program.fragmentSrc, attribMap);
        var uniformData = {};
        for (var i in program.uniformData) {
            var data = program.uniformData[i];
            uniformData[i] = {
                location: gl.getUniformLocation(shaderProgram, i),
                value: defaultValue(data.type, data.size),
            };
        }
        var glProgram = new GLProgram(shaderProgram, uniformData);
        program.glPrograms[this.renderer.CONTEXT_UID] = glProgram;
        return glProgram;
    };
    /**
     * Resets ShaderSystem state, does not affect WebGL state
     */
    ShaderSystem.prototype.reset = function () {
        this.program = null;
        this.shader = null;
    };
    /**
     * Destroys this System and removes all its textures
     */
    ShaderSystem.prototype.destroy = function () {
        // TODO implement destroy method for ShaderSystem
        this.destroyed = true;
    };
    return ShaderSystem;
}(System));

/**
 * Maps gl blend combinations to WebGL.
 *
 * @memberof PIXI
 * @function mapWebGLBlendModesToPixi
 * @private
 * @param {WebGLRenderingContext} gl - The rendering context.
 * @param {number[][]} [array=[]] - The array to output into.
 * @return {number[][]} Mapped modes.
 */
function mapWebGLBlendModesToPixi(gl, array) {
    if (array === void 0) { array = []; }
    // TODO - premultiply alpha would be different.
    // add a boolean for that!
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].ADD] = [gl.ONE, gl.ONE];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].SCREEN] = [gl.ONE, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].NONE] = [0, 0];
    // not-premultiplied blend modes
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].NORMAL_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].ADD_NPM] = [gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].SCREEN_NPM] = [gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
    // composite operations
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].SRC_IN] = [gl.DST_ALPHA, gl.ZERO];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].SRC_OUT] = [gl.ONE_MINUS_DST_ALPHA, gl.ZERO];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].SRC_ATOP] = [gl.DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].DST_OVER] = [gl.ONE_MINUS_DST_ALPHA, gl.ONE];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].DST_IN] = [gl.ZERO, gl.SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].DST_OUT] = [gl.ZERO, gl.ONE_MINUS_SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].DST_ATOP] = [gl.ONE_MINUS_DST_ALPHA, gl.SRC_ALPHA];
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].XOR] = [gl.ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA];
    // SUBTRACT from flash
    array[_pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].SUBTRACT] = [gl.ONE, gl.ONE, gl.ONE, gl.ONE, gl.FUNC_REVERSE_SUBTRACT, gl.FUNC_ADD];
    return array;
}

var BLEND$1 = 0;
var OFFSET$1 = 1;
var CULLING$1 = 2;
var DEPTH_TEST$1 = 3;
var WINDING$1 = 4;
var DEPTH_MASK$1 = 5;
/**
 * System plugin to the renderer to manage WebGL state machines.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var StateSystem = /** @class */ (function (_super) {
    __extends(StateSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function StateSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * GL context
         * @member {WebGLRenderingContext}
         * @readonly
         */
        _this.gl = null;
        /**
         * State ID
         * @member {number}
         * @readonly
         */
        _this.stateId = 0;
        /**
         * Polygon offset
         * @member {number}
         * @readonly
         */
        _this.polygonOffset = 0;
        /**
         * Blend mode
         * @member {number}
         * @default PIXI.BLEND_MODES.NONE
         * @readonly
         */
        _this.blendMode = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["BLEND_MODES"].NONE;
        /**
         * Whether current blend equation is different
         * @member {boolean}
         * @protected
         */
        _this._blendEq = false;
        /**
         * Collection of calls
         * @member {function[]}
         * @readonly
         */
        _this.map = [];
        // map functions for when we set state..
        _this.map[BLEND$1] = _this.setBlend;
        _this.map[OFFSET$1] = _this.setOffset;
        _this.map[CULLING$1] = _this.setCullFace;
        _this.map[DEPTH_TEST$1] = _this.setDepthTest;
        _this.map[WINDING$1] = _this.setFrontFace;
        _this.map[DEPTH_MASK$1] = _this.setDepthMask;
        /**
         * Collection of check calls
         * @member {function[]}
         * @readonly
         */
        _this.checks = [];
        /**
         * Default WebGL State
         * @member {PIXI.State}
         * @readonly
         */
        _this.defaultState = new State();
        _this.defaultState.blend = true;
        return _this;
    }
    StateSystem.prototype.contextChange = function (gl) {
        this.gl = gl;
        this.blendModes = mapWebGLBlendModesToPixi(gl);
        this.set(this.defaultState);
        this.reset();
    };
    /**
     * Sets the current state
     *
     * @param {*} state - The state to set.
     */
    StateSystem.prototype.set = function (state) {
        state = state || this.defaultState;
        // TODO maybe to an object check? ( this.state === state )?
        if (this.stateId !== state.data) {
            var diff = this.stateId ^ state.data;
            var i = 0;
            // order from least to most common
            while (diff) {
                if (diff & 1) {
                    // state change!
                    this.map[i].call(this, !!(state.data & (1 << i)));
                }
                diff = diff >> 1;
                i++;
            }
            this.stateId = state.data;
        }
        // based on the above settings we check for specific modes..
        // for example if blend is active we check and set the blend modes
        // or of polygon offset is active we check the poly depth.
        for (var i = 0; i < this.checks.length; i++) {
            this.checks[i](this, state);
        }
    };
    /**
     * Sets the state, when previous state is unknown
     *
     * @param {*} state - The state to set
     */
    StateSystem.prototype.forceState = function (state) {
        state = state || this.defaultState;
        for (var i = 0; i < this.map.length; i++) {
            this.map[i].call(this, !!(state.data & (1 << i)));
        }
        for (var i = 0; i < this.checks.length; i++) {
            this.checks[i](this, state);
        }
        this.stateId = state.data;
    };
    /**
     * Enables or disabled blending.
     *
     * @param {boolean} value - Turn on or off webgl blending.
     */
    StateSystem.prototype.setBlend = function (value) {
        this.updateCheck(StateSystem.checkBlendMode, value);
        this.gl[value ? 'enable' : 'disable'](this.gl.BLEND);
    };
    /**
     * Enables or disable polygon offset fill
     *
     * @param {boolean} value - Turn on or off webgl polygon offset testing.
     */
    StateSystem.prototype.setOffset = function (value) {
        this.updateCheck(StateSystem.checkPolygonOffset, value);
        this.gl[value ? 'enable' : 'disable'](this.gl.POLYGON_OFFSET_FILL);
    };
    /**
     * Sets whether to enable or disable depth test.
     *
     * @param {boolean} value - Turn on or off webgl depth testing.
     */
    StateSystem.prototype.setDepthTest = function (value) {
        this.gl[value ? 'enable' : 'disable'](this.gl.DEPTH_TEST);
    };
    /**
     * Sets whether to enable or disable depth mask.
     *
     * @param {boolean} value - Turn on or off webgl depth mask.
     */
    StateSystem.prototype.setDepthMask = function (value) {
        this.gl.depthMask(value);
    };
    /**
     * Sets whether to enable or disable cull face.
     *
     * @param {boolean} value - Turn on or off webgl cull face.
     */
    StateSystem.prototype.setCullFace = function (value) {
        this.gl[value ? 'enable' : 'disable'](this.gl.CULL_FACE);
    };
    /**
     * Sets the gl front face.
     *
     * @param {boolean} value - true is clockwise and false is counter-clockwise
     */
    StateSystem.prototype.setFrontFace = function (value) {
        this.gl.frontFace(this.gl[value ? 'CW' : 'CCW']);
    };
    /**
     * Sets the blend mode.
     *
     * @param {number} value - The blend mode to set to.
     */
    StateSystem.prototype.setBlendMode = function (value) {
        if (value === this.blendMode) {
            return;
        }
        this.blendMode = value;
        var mode = this.blendModes[value];
        var gl = this.gl;
        if (mode.length === 2) {
            gl.blendFunc(mode[0], mode[1]);
        }
        else {
            gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]);
        }
        if (mode.length === 6) {
            this._blendEq = true;
            gl.blendEquationSeparate(mode[4], mode[5]);
        }
        else if (this._blendEq) {
            this._blendEq = false;
            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
        }
    };
    /**
     * Sets the polygon offset.
     *
     * @param {number} value - the polygon offset
     * @param {number} scale - the polygon offset scale
     */
    StateSystem.prototype.setPolygonOffset = function (value, scale) {
        this.gl.polygonOffset(value, scale);
    };
    // used
    /**
     * Resets all the logic and disables the vaos
     */
    StateSystem.prototype.reset = function () {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
        this.forceState(this.defaultState);
        this._blendEq = true;
        this.blendMode = -1;
        this.setBlendMode(0);
    };
    /**
     * checks to see which updates should be checked based on which settings have been activated.
     * For example, if blend is enabled then we should check the blend modes each time the state is changed
     * or if polygon fill is activated then we need to check if the polygon offset changes.
     * The idea is that we only check what we have too.
     *
     * @param {Function} func - the checking function to add or remove
     * @param {boolean} value - should the check function be added or removed.
     */
    StateSystem.prototype.updateCheck = function (func, value) {
        var index = this.checks.indexOf(func);
        if (value && index === -1) {
            this.checks.push(func);
        }
        else if (!value && index !== -1) {
            this.checks.splice(index, 1);
        }
    };
    /**
     * A private little wrapper function that we call to check the blend mode.
     *
     * @static
     * @private
     * @param {PIXI.StateSystem} System - the System to perform the state check on
     * @param {PIXI.State} state - the state that the blendMode will pulled from
     */
    StateSystem.checkBlendMode = function (system, state) {
        system.setBlendMode(state.blendMode);
    };
    /**
     * A private little wrapper function that we call to check the polygon offset.
     *
     * @static
     * @private
     * @param {PIXI.StateSystem} System - the System to perform the state check on
     * @param {PIXI.State} state - the state that the blendMode will pulled from
     */
    StateSystem.checkPolygonOffset = function (system, state) {
        system.setPolygonOffset(1, state.polygonOffset);
    };
    return StateSystem;
}(System));

/**
 * System plugin to the renderer to manage texture garbage collection on the GPU,
 * ensuring that it does not get clogged up with textures that are no longer being used.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.System
 */
var TextureGCSystem = /** @class */ (function (_super) {
    __extends(TextureGCSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function TextureGCSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * Count
         * @member {number}
         * @readonly
         */
        _this.count = 0;
        /**
         * Check count
         * @member {number}
         * @readonly
         */
        _this.checkCount = 0;
        /**
         * Maximum idle time, in seconds
         * @member {number}
         * @see PIXI.settings.GC_MAX_IDLE
         */
        _this.maxIdle = _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].GC_MAX_IDLE;
        /**
         * Maximum number of item to check
         * @member {number}
         * @see PIXI.settings.GC_MAX_CHECK_COUNT
         */
        _this.checkCountMax = _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].GC_MAX_CHECK_COUNT;
        /**
         * Current garbage collection mode
         * @member {PIXI.GC_MODES}
         * @see PIXI.settings.GC_MODE
         */
        _this.mode = _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].GC_MODE;
        return _this;
    }
    /**
     * Checks to see when the last time a texture was used
     * if the texture has not been used for a specified amount of time it will be removed from the GPU
     */
    TextureGCSystem.prototype.postrender = function () {
        if (!this.renderer.renderingToScreen) {
            return;
        }
        this.count++;
        if (this.mode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["GC_MODES"].MANUAL) {
            return;
        }
        this.checkCount++;
        if (this.checkCount > this.checkCountMax) {
            this.checkCount = 0;
            this.run();
        }
    };
    /**
     * Checks to see when the last time a texture was used
     * if the texture has not been used for a specified amount of time it will be removed from the GPU
     */
    TextureGCSystem.prototype.run = function () {
        var tm = this.renderer.texture;
        var managedTextures = tm.managedTextures;
        var wasRemoved = false;
        for (var i = 0; i < managedTextures.length; i++) {
            var texture = managedTextures[i];
            // only supports non generated textures at the moment!
            if (!texture.framebuffer && this.count - texture.touched > this.maxIdle) {
                tm.destroyTexture(texture, true);
                managedTextures[i] = null;
                wasRemoved = true;
            }
        }
        if (wasRemoved) {
            var j = 0;
            for (var i = 0; i < managedTextures.length; i++) {
                if (managedTextures[i] !== null) {
                    managedTextures[j++] = managedTextures[i];
                }
            }
            managedTextures.length = j;
        }
    };
    /**
     * Removes all the textures within the specified displayObject and its children from the GPU
     *
     * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
     */
    TextureGCSystem.prototype.unload = function (displayObject) {
        var tm = this.renderer.texture;
        var texture = displayObject._texture;
        // only destroy non generated textures
        if (texture && !texture.framebuffer) {
            tm.destroyTexture(texture);
        }
        for (var i = displayObject.children.length - 1; i >= 0; i--) {
            this.unload(displayObject.children[i]);
        }
    };
    return TextureGCSystem;
}(System));

/**
 * Internal texture for WebGL context
 * @class
 * @memberof PIXI
 */
var GLTexture = /** @class */ (function () {
    function GLTexture(texture) {
        /**
         * The WebGL texture
         * @member {WebGLTexture}
         */
        this.texture = texture;
        /**
         * Width of texture that was used in texImage2D
         * @member {number}
         */
        this.width = -1;
        /**
         * Height of texture that was used in texImage2D
         * @member {number}
         */
        this.height = -1;
        /**
         * Texture contents dirty flag
         * @member {number}
         */
        this.dirtyId = -1;
        /**
         * Texture style dirty flag
         * @member {number}
         */
        this.dirtyStyleId = -1;
        /**
         * Whether mip levels has to be generated
         * @member {boolean}
         */
        this.mipmap = false;
        /**
         * WrapMode copied from baseTexture
         * @member {number}
         */
        this.wrapMode = 33071;
        /**
         * Type copied from baseTexture
         * @member {number}
         */
        this.type = 6408;
        /**
         * Type copied from baseTexture
         * @member {number}
         */
        this.internalFormat = 5121;
    }
    return GLTexture;
}());

/**
 * System plugin to the renderer to manage textures.
 *
 * @class
 * @extends PIXI.System
 * @memberof PIXI
 */
var TextureSystem = /** @class */ (function (_super) {
    __extends(TextureSystem, _super);
    /**
     * @param {PIXI.Renderer} renderer - The renderer this System works for.
     */
    function TextureSystem(renderer) {
        var _this = _super.call(this, renderer) || this;
        // TODO set to max textures...
        /**
         * Bound textures
         * @member {PIXI.BaseTexture[]}
         * @readonly
         */
        _this.boundTextures = [];
        /**
         * Current location
         * @member {number}
         * @readonly
         */
        _this.currentLocation = -1;
        /**
         * List of managed textures
         * @member {PIXI.BaseTexture[]}
         * @readonly
         */
        _this.managedTextures = [];
        /**
         * Did someone temper with textures state? We'll overwrite them when we need to unbind something.
         * @member {boolean}
         * @private
         */
        _this._unknownBoundTextures = false;
        /**
         * BaseTexture value that shows that we don't know what is bound
         * @member {PIXI.BaseTexture}
         * @readonly
         */
        _this.unknownTexture = new BaseTexture();
        return _this;
    }
    /**
     * Sets up the renderer context and necessary buffers.
     */
    TextureSystem.prototype.contextChange = function () {
        var gl = this.gl = this.renderer.gl;
        this.CONTEXT_UID = this.renderer.CONTEXT_UID;
        this.webGLVersion = this.renderer.context.webGLVersion;
        var maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        this.boundTextures.length = maxTextures;
        for (var i = 0; i < maxTextures; i++) {
            this.boundTextures[i] = null;
        }
        // TODO move this.. to a nice make empty textures class..
        this.emptyTextures = {};
        var emptyTexture2D = new GLTexture(gl.createTexture());
        gl.bindTexture(gl.TEXTURE_2D, emptyTexture2D.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
        this.emptyTextures[gl.TEXTURE_2D] = emptyTexture2D;
        this.emptyTextures[gl.TEXTURE_CUBE_MAP] = new GLTexture(gl.createTexture());
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.emptyTextures[gl.TEXTURE_CUBE_MAP].texture);
        for (var i = 0; i < 6; i++) {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        for (var i = 0; i < this.boundTextures.length; i++) {
            this.bind(null, i);
        }
    };
    /**
     * Bind a texture to a specific location
     *
     * If you want to unbind something, please use `unbind(texture)` instead of `bind(null, textureLocation)`
     *
     * @param {PIXI.Texture|PIXI.BaseTexture} texture_ - Texture to bind
     * @param {number} [location=0] - Location to bind at
     */
    TextureSystem.prototype.bind = function (texture, location) {
        if (location === void 0) { location = 0; }
        var gl = this.gl;
        if (texture) {
            texture = texture.castToBaseTexture();
            if (texture.parentTextureArray) {
                // cannot bind partial texture
                // TODO: report a warning
                return;
            }
            if (texture.valid) {
                texture.touched = this.renderer.textureGC.count;
                var glTexture = texture._glTextures[this.CONTEXT_UID] || this.initTexture(texture);
                if (this.boundTextures[location] !== texture) {
                    if (this.currentLocation !== location) {
                        this.currentLocation = location;
                        gl.activeTexture(gl.TEXTURE0 + location);
                    }
                    gl.bindTexture(texture.target, glTexture.texture);
                }
                if (glTexture.dirtyId !== texture.dirtyId) {
                    if (this.currentLocation !== location) {
                        this.currentLocation = location;
                        gl.activeTexture(gl.TEXTURE0 + location);
                    }
                    this.updateTexture(texture);
                }
                this.boundTextures[location] = texture;
            }
        }
        else {
            if (this.currentLocation !== location) {
                this.currentLocation = location;
                gl.activeTexture(gl.TEXTURE0 + location);
            }
            gl.bindTexture(gl.TEXTURE_2D, this.emptyTextures[gl.TEXTURE_2D].texture);
            this.boundTextures[location] = null;
        }
    };
    /**
     * Resets texture location and bound textures
     *
     * Actual `bind(null, i)` calls will be performed at next `unbind()` call
     */
    TextureSystem.prototype.reset = function () {
        this._unknownBoundTextures = true;
        this.currentLocation = -1;
        for (var i = 0; i < this.boundTextures.length; i++) {
            this.boundTextures[i] = this.unknownTexture;
        }
    };
    /**
     * Unbind a texture
     * @param {PIXI.BaseTexture} texture - Texture to bind
     */
    TextureSystem.prototype.unbind = function (texture) {
        var _a = this, gl = _a.gl, boundTextures = _a.boundTextures;
        if (this._unknownBoundTextures) {
            this._unknownBoundTextures = false;
            // someone changed webGL state,
            // we have to be sure that our texture does not appear in multi-texture renderer samplers
            for (var i = 0; i < boundTextures.length; i++) {
                if (boundTextures[i] === this.unknownTexture) {
                    this.bind(null, i);
                }
            }
        }
        for (var i = 0; i < boundTextures.length; i++) {
            if (boundTextures[i] === texture) {
                if (this.currentLocation !== i) {
                    gl.activeTexture(gl.TEXTURE0 + i);
                    this.currentLocation = i;
                }
                gl.bindTexture(texture.target, this.emptyTextures[texture.target].texture);
                boundTextures[i] = null;
            }
        }
    };
    /**
     * Initialize a texture
     *
     * @private
     * @param {PIXI.BaseTexture} texture - Texture to initialize
     */
    TextureSystem.prototype.initTexture = function (texture) {
        var glTexture = new GLTexture(this.gl.createTexture());
        // guarantee an update..
        glTexture.dirtyId = -1;
        texture._glTextures[this.CONTEXT_UID] = glTexture;
        this.managedTextures.push(texture);
        texture.on('dispose', this.destroyTexture, this);
        return glTexture;
    };
    TextureSystem.prototype.initTextureType = function (texture, glTexture) {
        glTexture.internalFormat = texture.format;
        glTexture.type = texture.type;
        if (this.webGLVersion !== 2) {
            return;
        }
        var gl = this.renderer.gl;
        if (texture.type === gl.FLOAT
            && texture.format === gl.RGBA) {
            glTexture.internalFormat = gl.RGBA32F;
        }
        // that's WebGL1 HALF_FLOAT_OES
        // we have to convert it to WebGL HALF_FLOAT
        if (texture.type === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TYPES"].HALF_FLOAT) {
            glTexture.type = gl.HALF_FLOAT;
        }
        if (glTexture.type === gl.HALF_FLOAT
            && texture.format === gl.RGBA) {
            glTexture.internalFormat = gl.RGBA16F;
        }
    };
    /**
     * Update a texture
     *
     * @private
     * @param {PIXI.BaseTexture} texture - Texture to initialize
     */
    TextureSystem.prototype.updateTexture = function (texture) {
        var glTexture = texture._glTextures[this.CONTEXT_UID];
        if (!glTexture) {
            return;
        }
        var renderer = this.renderer;
        this.initTextureType(texture, glTexture);
        if (texture.resource && texture.resource.upload(renderer, texture, glTexture)) ;
        else {
            // default, renderTexture-like logic
            var width = texture.realWidth;
            var height = texture.realHeight;
            var gl = renderer.gl;
            if (glTexture.width !== width
                || glTexture.height !== height
                || glTexture.dirtyId < 0) {
                glTexture.width = width;
                glTexture.height = height;
                gl.texImage2D(texture.target, 0, glTexture.internalFormat, width, height, 0, texture.format, glTexture.type, null);
            }
        }
        // lets only update what changes..
        if (texture.dirtyStyleId !== glTexture.dirtyStyleId) {
            this.updateTextureStyle(texture);
        }
        glTexture.dirtyId = texture.dirtyId;
    };
    /**
     * Deletes the texture from WebGL
     *
     * @private
     * @param {PIXI.BaseTexture|PIXI.Texture} texture_ - the texture to destroy
     * @param {boolean} [skipRemove=false] - Whether to skip removing the texture from the TextureManager.
     */
    TextureSystem.prototype.destroyTexture = function (texture, skipRemove) {
        var gl = this.gl;
        texture = texture.castToBaseTexture();
        if (texture._glTextures[this.CONTEXT_UID]) {
            this.unbind(texture);
            gl.deleteTexture(texture._glTextures[this.CONTEXT_UID].texture);
            texture.off('dispose', this.destroyTexture, this);
            delete texture._glTextures[this.CONTEXT_UID];
            if (!skipRemove) {
                var i = this.managedTextures.indexOf(texture);
                if (i !== -1) {
                    Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["removeItems"])(this.managedTextures, i, 1);
                }
            }
        }
    };
    /**
     * Update texture style such as mipmap flag
     *
     * @private
     * @param {PIXI.BaseTexture} texture - Texture to update
     */
    TextureSystem.prototype.updateTextureStyle = function (texture) {
        var glTexture = texture._glTextures[this.CONTEXT_UID];
        if (!glTexture) {
            return;
        }
        if ((texture.mipmap === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MIPMAP_MODES"].POW2 || this.webGLVersion !== 2) && !texture.isPowerOfTwo) {
            glTexture.mipmap = false;
        }
        else {
            glTexture.mipmap = texture.mipmap >= 1;
        }
        if (this.webGLVersion !== 2 && !texture.isPowerOfTwo) {
            glTexture.wrapMode = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["WRAP_MODES"].CLAMP;
        }
        else {
            glTexture.wrapMode = texture.wrapMode;
        }
        if (texture.resource && texture.resource.style(this.renderer, texture, glTexture)) ;
        else {
            this.setStyle(texture, glTexture);
        }
        glTexture.dirtyStyleId = texture.dirtyStyleId;
    };
    /**
     * Set style for texture
     *
     * @private
     * @param {PIXI.BaseTexture} texture - Texture to update
     * @param {PIXI.GLTexture} glTexture
     */
    TextureSystem.prototype.setStyle = function (texture, glTexture) {
        var gl = this.gl;
        if (glTexture.mipmap && texture.mipmap !== _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["MIPMAP_MODES"].ON_MANUAL) {
            gl.generateMipmap(texture.target);
        }
        gl.texParameteri(texture.target, gl.TEXTURE_WRAP_S, glTexture.wrapMode);
        gl.texParameteri(texture.target, gl.TEXTURE_WRAP_T, glTexture.wrapMode);
        if (glTexture.mipmap) {
            /* eslint-disable max-len */
            gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, texture.scaleMode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["SCALE_MODES"].LINEAR ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);
            /* eslint-disable max-len */
            var anisotropicExt = this.renderer.context.extensions.anisotropicFiltering;
            if (anisotropicExt && texture.anisotropicLevel > 0 && texture.scaleMode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["SCALE_MODES"].LINEAR) {
                var level = Math.min(texture.anisotropicLevel, gl.getParameter(anisotropicExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
                gl.texParameterf(texture.target, anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT, level);
            }
        }
        else {
            gl.texParameteri(texture.target, gl.TEXTURE_MIN_FILTER, texture.scaleMode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["SCALE_MODES"].LINEAR ? gl.LINEAR : gl.NEAREST);
        }
        gl.texParameteri(texture.target, gl.TEXTURE_MAG_FILTER, texture.scaleMode === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["SCALE_MODES"].LINEAR ? gl.LINEAR : gl.NEAREST);
    };
    return TextureSystem;
}(System));



var _systems = {
    __proto__: null,
    FilterSystem: FilterSystem,
    BatchSystem: BatchSystem,
    ContextSystem: ContextSystem,
    FramebufferSystem: FramebufferSystem,
    GeometrySystem: GeometrySystem,
    MaskSystem: MaskSystem,
    ScissorSystem: ScissorSystem,
    StencilSystem: StencilSystem,
    ProjectionSystem: ProjectionSystem,
    RenderTextureSystem: RenderTextureSystem,
    ShaderSystem: ShaderSystem,
    StateSystem: StateSystem,
    TextureGCSystem: TextureGCSystem,
    TextureSystem: TextureSystem
};

var tempMatrix$1 = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Matrix"]();
/**
 * The AbstractRenderer is the base for a PixiJS Renderer. It is extended by the {@link PIXI.CanvasRenderer}
 * and {@link PIXI.Renderer} which can be used for rendering a PixiJS scene.
 *
 * @abstract
 * @class
 * @extends PIXI.utils.EventEmitter
 * @memberof PIXI
 */
var AbstractRenderer = /** @class */ (function (_super) {
    __extends(AbstractRenderer, _super);
    /**
     * @param system - The name of the system this renderer is for.
     * @param [options] - The optional renderer parameters.
     * @param {number} [options.width=800] - The width of the screen.
     * @param {number} [options.height=600] - The height of the screen.
     * @param {HTMLCanvasElement} [options.view] - The canvas to use as a view, optional.
     * @param {boolean} [options.useContextAlpha=true] - Pass-through value for canvas' context `alpha` property.
     *   If you want to set transparency, please use `backgroundAlpha`. This option is for cases where the
     *   canvas needs to be opaque, possibly for performance reasons on some older devices.
     * @param {boolean} [options.autoDensity=false] - Resizes renderer view in CSS pixels to allow for
     *   resolutions other than 1.
     * @param {boolean} [options.antialias=false] - Sets antialias
     * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer. The
     *  resolution of the renderer retina would be 2.
     * @param {boolean} [options.preserveDrawingBuffer=false] - Enables drawing buffer preservation,
     *  enable this if you need to call toDataUrl on the WebGL context.
     * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
     *      not before the new render pass.
     * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
     *  (shown if not transparent).
     * @param {number} [options.backgroundAlpha=1] - Value from 0 (fully transparent) to 1 (fully opaque).
     */
    function AbstractRenderer(type, options) {
        if (type === void 0) { type = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["RENDERER_TYPE"].UNKNOWN; }
        var _this = _super.call(this) || this;
        // Add the default render options
        options = Object.assign({}, _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].RENDER_OPTIONS, options);
        /**
         * The supplied constructor options.
         *
         * @member {Object}
         * @readOnly
         */
        _this.options = options;
        /**
         * The type of the renderer.
         *
         * @member {number}
         * @default PIXI.RENDERER_TYPE.UNKNOWN
         * @see PIXI.RENDERER_TYPE
         */
        _this.type = type;
        /**
         * Measurements of the screen. (0, 0, screenWidth, screenHeight).
         *
         * Its safe to use as filterArea or hitArea for the whole stage.
         *
         * @member {PIXI.Rectangle}
         */
        _this.screen = new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Rectangle"](0, 0, options.width, options.height);
        /**
         * The canvas element that everything is drawn to.
         *
         * @member {HTMLCanvasElement}
         */
        _this.view = options.view || document.createElement('canvas');
        /**
         * The resolution / device pixel ratio of the renderer.
         *
         * @member {number}
         * @default 1
         */
        _this.resolution = options.resolution || _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].RESOLUTION;
        /**
         * Pass-thru setting for the the canvas' context `alpha` property. This is typically
         * not something you need to fiddle with. If you want transparency, use `backgroundAlpha`.
         *
         * @member {boolean}
         */
        _this.useContextAlpha = options.useContextAlpha;
        /**
         * Whether CSS dimensions of canvas view should be resized to screen dimensions automatically.
         *
         * @member {boolean}
         */
        _this.autoDensity = !!options.autoDensity;
        /**
         * The value of the preserveDrawingBuffer flag affects whether or not the contents of
         * the stencil buffer is retained after rendering.
         *
         * @member {boolean}
         */
        _this.preserveDrawingBuffer = options.preserveDrawingBuffer;
        /**
         * This sets if the CanvasRenderer will clear the canvas or not before the new render pass.
         * If the scene is NOT transparent PixiJS will use a canvas sized fillRect operation every
         * frame to set the canvas background color. If the scene is transparent PixiJS will use clearRect
         * to clear the canvas every frame. Disable this by setting this to false. For example, if
         * your game has a canvas filling background image you often don't need this set.
         *
         * @member {boolean}
         * @default
         */
        _this.clearBeforeRender = options.clearBeforeRender;
        /**
         * The background color as a number.
         *
         * @member {number}
         * @protected
         */
        _this._backgroundColor = 0x000000;
        /**
         * The background color as an [R, G, B, A] array.
         *
         * @member {number[]}
         * @protected
         */
        _this._backgroundColorRgba = [0, 0, 0, 1];
        /**
         * The background color as a string.
         *
         * @member {string}
         * @protected
         */
        _this._backgroundColorString = '#000000';
        _this.backgroundColor = options.backgroundColor || _this._backgroundColor; // run bg color setter
        _this.backgroundAlpha = options.backgroundAlpha;
        // @deprecated
        if (options.transparent !== undefined) {
            Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["deprecation"])('6.0.0', 'Option transparent is deprecated, please use backgroundAlpha instead.');
            _this.useContextAlpha = options.transparent;
            _this.backgroundAlpha = options.transparent ? 0 : 1;
        }
        /**
         * The last root object that the renderer tried to render.
         *
         * @member {PIXI.DisplayObject}
         * @protected
         */
        _this._lastObjectRendered = null;
        /**
         * Collection of plugins.
         * @readonly
         * @member {object}
         */
        _this.plugins = {};
        return _this;
    }
    /**
     * Initialize the plugins.
     *
     * @protected
     * @param {object} staticMap - The dictionary of statically saved plugins.
     */
    AbstractRenderer.prototype.initPlugins = function (staticMap) {
        for (var o in staticMap) {
            this.plugins[o] = new (staticMap[o])(this);
        }
    };
    Object.defineProperty(AbstractRenderer.prototype, "width", {
        /**
         * Same as view.width, actual number of pixels in the canvas by horizontal.
         *
         * @member {number}
         * @readonly
         * @default 800
         */
        get: function () {
            return this.view.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractRenderer.prototype, "height", {
        /**
         * Same as view.height, actual number of pixels in the canvas by vertical.
         *
         * @member {number}
         * @readonly
         * @default 600
         */
        get: function () {
            return this.view.height;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Resizes the screen and canvas to the specified width and height.
     * Canvas dimensions are multiplied by resolution.
     *
     * @param screenWidth - The new width of the screen.
     * @param screenHeight - The new height of the screen.
     */
    AbstractRenderer.prototype.resize = function (screenWidth, screenHeight) {
        this.screen.width = screenWidth;
        this.screen.height = screenHeight;
        this.view.width = screenWidth * this.resolution;
        this.view.height = screenHeight * this.resolution;
        if (this.autoDensity) {
            this.view.style.width = screenWidth + "px";
            this.view.style.height = screenHeight + "px";
        }
        /**
         * Fired after view has been resized.
         *
         * @event PIXI.Renderer#resize
         * @param {number} screenWidth - The new width of the screen.
         * @param {number} screenHeight - The new height of the screen.
         */
        this.emit('resize', screenWidth, screenHeight);
    };
    /**
     * Useful function that returns a texture of the display object that can then be used to create sprites
     * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
     *
     * @param displayObject - The displayObject the object will be generated from.
     * @param scaleMode - The scale mode of the texture.
     * @param resolution - The resolution / device pixel ratio of the texture being generated.
     * @param [region] - The region of the displayObject, that shall be rendered,
     *        if no region is specified, defaults to the local bounds of the displayObject.
     * @return A texture of the graphics object.
     */
    AbstractRenderer.prototype.generateTexture = function (displayObject, scaleMode, resolution, region) {
        region = region || displayObject.getLocalBounds(null, true);
        // minimum texture size is 1x1, 0x0 will throw an error
        if (region.width === 0)
            { region.width = 1; }
        if (region.height === 0)
            { region.height = 1; }
        var renderTexture = RenderTexture.create({
            width: region.width | 0,
            height: region.height | 0,
            scaleMode: scaleMode,
            resolution: resolution,
        });
        tempMatrix$1.tx = -region.x;
        tempMatrix$1.ty = -region.y;
        this.render(displayObject, {
            renderTexture: renderTexture,
            clear: false,
            transform: tempMatrix$1,
            skipUpdateTransform: !!displayObject.parent
        });
        return renderTexture;
    };
    /**
     * Removes everything from the renderer and optionally removes the Canvas DOM element.
     *
     * @param [removeView=false] - Removes the Canvas element from the DOM.
     */
    AbstractRenderer.prototype.destroy = function (removeView) {
        for (var o in this.plugins) {
            this.plugins[o].destroy();
            this.plugins[o] = null;
        }
        if (removeView && this.view.parentNode) {
            this.view.parentNode.removeChild(this.view);
        }
        var thisAny = this;
        // null-ing all objects, that's a tradition!
        thisAny.plugins = null;
        thisAny.type = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["RENDERER_TYPE"].UNKNOWN;
        thisAny.view = null;
        thisAny.screen = null;
        thisAny._tempDisplayObjectParent = null;
        thisAny.options = null;
        this._backgroundColorRgba = null;
        this._backgroundColorString = null;
        this._lastObjectRendered = null;
    };
    Object.defineProperty(AbstractRenderer.prototype, "backgroundColor", {
        /**
         * The background color to fill if not transparent
         *
         * @member {number}
         */
        get: function () {
            return this._backgroundColor;
        },
        set: function (value) {
            this._backgroundColor = value;
            this._backgroundColorString = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["hex2string"])(value);
            Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["hex2rgb"])(value, this._backgroundColorRgba);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractRenderer.prototype, "backgroundAlpha", {
        /**
         * The background color alpha. Setting this to 0 will make the canvas transparent.
         *
         * @member {number}
         */
        get: function () {
            return this._backgroundColorRgba[3];
        },
        set: function (value) {
            this._backgroundColorRgba[3] = value;
        },
        enumerable: false,
        configurable: true
    });
    return AbstractRenderer;
}(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]));

/**
 * The Renderer draws the scene and all its content onto a WebGL enabled canvas.
 *
 * This renderer should be used for browsers that support WebGL.
 *
 * This renderer works by automatically managing WebGLBatchesm, so no need for Sprite Batches or Sprite Clouds.
 * Don't forget to add the view to your DOM or you will not see anything!
 *
 * Renderer is composed of systems that manage specific tasks. The following systems are added by default
 * whenever you create a renderer:
 *
 * | System                               | Description                                                                   |
 * | ------------------------------------ | ----------------------------------------------------------------------------- |
 * | {@link PIXI.BatchSystem}             | This manages object renderers that defer rendering until a flush.             |
 * | {@link PIXI.ContextSystem}           | This manages the WebGL context and extensions.                                |
 * | {@link PIXI.FilterSystem}            | This manages the filtering pipeline for post-processing effects.              |
 * | {@link PIXI.FramebufferSystem}       | This manages framebuffers, which are used for offscreen rendering.            |
 * | {@link PIXI.GeometrySystem}          | This manages geometries & buffers, which are used to draw object meshes.      |
 * | {@link PIXI.MaskSystem}              | This manages masking operations.                                              |
 * | {@link PIXI.ProjectionSystem}        | This manages the `projectionMatrix`, used by shaders to get NDC coordinates.  |
 * | {@link PIXI.RenderTextureSystem}     | This manages render-textures, which are an abstraction over framebuffers.     |
 * | {@link PIXI.ScissorSystem}           | This handles scissor masking, and is used internally by {@link MaskSystem}    |
 * | {@link PIXI.ShaderSystem}            | This manages shaders, programs that run on the GPU to calculate 'em pixels.   |
 * | {@link PIXI.StateSystem}             | This manages the WebGL state variables like blend mode, depth testing, etc.   |
 * | {@link PIXI.StencilSystem}           | This handles stencil masking, and is used internally by {@link MaskSystem}    |
 * | {@link PIXI.TextureSystem}           | This manages textures and their resources on the GPU.                         |
 * | {@link PIXI.TextureGCSystem}         | This will automatically remove textures from the GPU if they are not used.    |
 *
 * The breadth of the API surface provided by the renderer is contained within these systems.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.AbstractRenderer
 */
var Renderer = /** @class */ (function (_super) {
    __extends(Renderer, _super);
    /**
     * @param [options] - The optional renderer parameters.
     * @param {number} [options.width=800] - The width of the screen.
     * @param {number} [options.height=600] - The height of the screen.
     * @param {HTMLCanvasElement} [options.view] - The canvas to use as a view, optional.
     * @param {boolean} [options.useContextAlpha=true] - Pass-through value for canvas' context `alpha` property.
     *   If you want to set transparency, please use `backgroundAlpha`. This option is for cases where the
     *   canvas needs to be opaque, possibly for performance reasons on some older devices.
     * @param {boolean} [options.autoDensity=false] - Resizes renderer view in CSS pixels to allow for
     *   resolutions other than 1.
     * @param {boolean} [options.antialias=false] - Sets antialias. If not available natively then FXAA
     *  antialiasing is used.
     * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer.
     *  The resolution of the renderer retina would be 2.
     * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear
     *  the canvas or not before the new render pass. If you wish to set this to false, you *must* set
     *  preserveDrawingBuffer to `true`.
     * @param {boolean} [options.preserveDrawingBuffer=false] - Enables drawing buffer preservation,
     *  enable this if you need to call toDataUrl on the WebGL context.
     * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
     *  (shown if not transparent).
     * @param {number} [options.backgroundAlpha=1] - Value from 0 (fully transparent) to 1 (fully opaque).
     * @param {string} [options.powerPreference] - Parameter passed to WebGL context, set to "high-performance"
     *  for devices with dual graphics card.
     * @param {object} [options.context] - If WebGL context already exists, all parameters must be taken from it.
     * @public
     */
    function Renderer(options) {
        var _this = _super.call(this, _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["RENDERER_TYPE"].WEBGL, options) || this;
        // the options will have been modified here in the super constructor with pixi's default settings..
        options = _this.options;
        /**
         * WebGL context, set by the contextSystem (this.context)
         *
         * @readonly
         * @member {WebGLRenderingContext}
         */
        _this.gl = null;
        _this.CONTEXT_UID = 0;
        /**
         * Internal signal instances of **runner**, these
         * are assigned to each system created.
         * @see PIXI.Runner
         * @name runners
         * @private
         * @type {object}
         * @readonly
         * @property {PIXI.Runner} destroy - Destroy runner
         * @property {PIXI.Runner} contextChange - Context change runner
         * @property {PIXI.Runner} reset - Reset runner
         * @property {PIXI.Runner} update - Update runner
         * @property {PIXI.Runner} postrender - Post-render runner
         * @property {PIXI.Runner} prerender - Pre-render runner
         * @property {PIXI.Runner} resize - Resize runner
         */
        _this.runners = {
            destroy: new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('destroy'),
            contextChange: new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('contextChange'),
            reset: new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('reset'),
            update: new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('update'),
            postrender: new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('postrender'),
            prerender: new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('prerender'),
            resize: new _pixi_runner__WEBPACK_IMPORTED_MODULE_3__["Runner"]('resize'),
        };
        /**
         * Global uniforms
         * @member {PIXI.UniformGroup}
         */
        _this.globalUniforms = new UniformGroup({
            projectionMatrix: new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Matrix"](),
        }, true);
        /**
         * Mask system instance
         * @member {PIXI.MaskSystem} mask
         * @memberof PIXI.Renderer#
         * @readonly
         */
        _this.addSystem(MaskSystem, 'mask')
            /**
             * Context system instance
             * @member {PIXI.ContextSystem} context
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(ContextSystem, 'context')
            /**
             * State system instance
             * @member {PIXI.StateSystem} state
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(StateSystem, 'state')
            /**
             * Shader system instance
             * @member {PIXI.ShaderSystem} shader
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(ShaderSystem, 'shader')
            /**
             * Texture system instance
             * @member {PIXI.TextureSystem} texture
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(TextureSystem, 'texture')
            /**
             * Geometry system instance
             * @member {PIXI.GeometrySystem} geometry
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(GeometrySystem, 'geometry')
            /**
             * Framebuffer system instance
             * @member {PIXI.FramebufferSystem} framebuffer
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(FramebufferSystem, 'framebuffer')
            /**
             * Scissor system instance
             * @member {PIXI.ScissorSystem} scissor
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(ScissorSystem, 'scissor')
            /**
             * Stencil system instance
             * @member {PIXI.StencilSystem} stencil
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(StencilSystem, 'stencil')
            /**
             * Projection system instance
             * @member {PIXI.ProjectionSystem} projection
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(ProjectionSystem, 'projection')
            /**
             * Texture garbage collector system instance
             * @member {PIXI.TextureGCSystem} textureGC
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(TextureGCSystem, 'textureGC')
            /**
             * Filter system instance
             * @member {PIXI.FilterSystem} filter
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(FilterSystem, 'filter')
            /**
             * RenderTexture system instance
             * @member {PIXI.RenderTextureSystem} renderTexture
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(RenderTextureSystem, 'renderTexture')
            /**
             * Batch system instance
             * @member {PIXI.BatchSystem} batch
             * @memberof PIXI.Renderer#
             * @readonly
             */
            .addSystem(BatchSystem, 'batch');
        _this.initPlugins(Renderer.__plugins);
        /*
         * The options passed in to create a new WebGL context.
         */
        if (options.context) {
            _this.context.initFromContext(options.context);
        }
        else {
            _this.context.initFromOptions({
                alpha: !!_this.useContextAlpha,
                antialias: options.antialias,
                premultipliedAlpha: _this.useContextAlpha && _this.useContextAlpha !== 'notMultiplied',
                stencil: true,
                preserveDrawingBuffer: options.preserveDrawingBuffer,
                powerPreference: _this.options.powerPreference,
            });
        }
        /**
         * Flag if we are rendering to the screen vs renderTexture
         * @member {boolean}
         * @readonly
         * @default true
         */
        _this.renderingToScreen = true;
        Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["sayHello"])(_this.context.webGLVersion === 2 ? 'WebGL 2' : 'WebGL 1');
        _this.resize(_this.options.width, _this.options.height);
        return _this;
    }
    /**
     * Create renderer if WebGL is available. Overrideable
     * by the **@pixi/canvas-renderer** package to allow fallback.
     * throws error if WebGL is not available.
     * @static
     * @private
     */
    Renderer.create = function (options) {
        if (Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["isWebGLSupported"])()) {
            return new Renderer(options);
        }
        throw new Error('WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.');
    };
    /**
     * Add a new system to the renderer.
     * @param ClassRef - Class reference
     * @param [name] - Property name for system, if not specified
     *        will use a static `name` property on the class itself. This
     *        name will be assigned as s property on the Renderer so make
     *        sure it doesn't collide with properties on Renderer.
     * @return {PIXI.Renderer} Return instance of renderer
     */
    Renderer.prototype.addSystem = function (ClassRef, name) {
        if (!name) {
            name = ClassRef.name;
        }
        var system = new ClassRef(this);
        if (this[name]) {
            throw new Error("Whoops! The name \"" + name + "\" is already in use");
        }
        this[name] = system;
        for (var i in this.runners) {
            this.runners[i].add(system);
        }
        /**
         * Fired after rendering finishes.
         *
         * @event PIXI.Renderer#postrender
         */
        /**
         * Fired before rendering starts.
         *
         * @event PIXI.Renderer#prerender
         */
        /**
         * Fired when the WebGL context is set.
         *
         * @event PIXI.Renderer#context
         * @param {WebGLRenderingContext} gl - WebGL context.
         */
        return this;
    };
    /**
     * @ignore
     */
    Renderer.prototype.render = function (displayObject, options) {
        var renderTexture;
        var clear;
        var transform;
        var skipUpdateTransform;
        if (options) {
            if (options instanceof RenderTexture) {
                Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["deprecation"])('6.0.0', 'Renderer#render arguments changed, use options instead.');
                /* eslint-disable prefer-rest-params */
                renderTexture = options;
                clear = arguments[2];
                transform = arguments[3];
                skipUpdateTransform = arguments[4];
                /* eslint-enable prefer-rest-params */
            }
            else {
                renderTexture = options.renderTexture;
                clear = options.clear;
                transform = options.transform;
                skipUpdateTransform = options.skipUpdateTransform;
            }
        }
        // can be handy to know!
        this.renderingToScreen = !renderTexture;
        this.runners.prerender.emit();
        this.emit('prerender');
        // apply a transform at a GPU level
        this.projection.transform = transform;
        // no point rendering if our context has been blown up!
        if (this.context.isLost) {
            return;
        }
        if (!renderTexture) {
            this._lastObjectRendered = displayObject;
        }
        if (!skipUpdateTransform) {
            // update the scene graph
            var cacheParent = displayObject.enableTempParent();
            displayObject.updateTransform();
            displayObject.disableTempParent(cacheParent);
            // displayObject.hitArea = //TODO add a temp hit area
        }
        this.renderTexture.bind(renderTexture);
        this.batch.currentRenderer.start();
        if (clear !== undefined ? clear : this.clearBeforeRender) {
            this.renderTexture.clear();
        }
        displayObject.render(this);
        // apply transform..
        this.batch.currentRenderer.flush();
        if (renderTexture) {
            renderTexture.baseTexture.update();
        }
        this.runners.postrender.emit();
        // reset transform after render
        this.projection.transform = null;
        this.emit('postrender');
    };
    /**
     * Resizes the WebGL view to the specified width and height.
     *
     * @param screenWidth - The new width of the screen.
     * @param screenHeight - The new height of the screen.
     */
    Renderer.prototype.resize = function (screenWidth, screenHeight) {
        _super.prototype.resize.call(this, screenWidth, screenHeight);
        this.runners.resize.emit(screenWidth, screenHeight);
    };
    /**
     * Resets the WebGL state so you can render things however you fancy!
     *
     * @return {PIXI.Renderer} Returns itself.
     */
    Renderer.prototype.reset = function () {
        this.runners.reset.emit();
        return this;
    };
    /**
     * Clear the frame buffer
     */
    Renderer.prototype.clear = function () {
        this.renderTexture.bind();
        this.renderTexture.clear();
    };
    /**
     * Removes everything from the renderer (event listeners, spritebatch, etc...)
     *
     * @param [removeView=false] - Removes the Canvas element from the DOM.
     *  See: https://github.com/pixijs/pixi.js/issues/2233
     */
    Renderer.prototype.destroy = function (removeView) {
        this.runners.destroy.emit();
        for (var r in this.runners) {
            this.runners[r].destroy();
        }
        // call base destroy
        _super.prototype.destroy.call(this, removeView);
        // TODO nullify all the managers..
        this.gl = null;
    };
    Object.defineProperty(Renderer.prototype, "extract", {
        /**
         * Please use `plugins.extract` instead.
         * @member {PIXI.Extract} extract
         * @deprecated since 6.0.0
         * @readonly
         */
        get: function () {
            Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["deprecation"])('6.0.0', 'Renderer#extract has been deprecated, please use Renderer#plugins.extract instead.');
            return this.plugins.extract;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds a plugin to the renderer.
     *
     * @method
     * @param pluginName - The name of the plugin.
     * @param ctor - The constructor function or class for the plugin.
     */
    Renderer.registerPlugin = function (pluginName, ctor) {
        Renderer.__plugins = Renderer.__plugins || {};
        Renderer.__plugins[pluginName] = ctor;
    };
    return Renderer;
}(AbstractRenderer));

/**
 * This helper function will automatically detect which renderer you should be using.
 * WebGL is the preferred renderer as it is a lot faster. If WebGL is not supported by
 * the browser then this function will return a canvas renderer
 *
 * @memberof PIXI
 * @function autoDetectRenderer
 * @param {object} [options] - The optional renderer parameters
 * @param {number} [options.width=800] - the width of the renderers view
 * @param {number} [options.height=600] - the height of the renderers view
 * @param {HTMLCanvasElement} [options.view] - the canvas to use as a view, optional
 * @param {boolean} [options.useContextAlpha=true] - Pass-through value for canvas' context `alpha` property.
 *   If you want to set transparency, please use `backgroundAlpha`. This option is for cases where the
 *   canvas needs to be opaque, possibly for performance reasons on some older devices.
 * @param {boolean} [options.autoDensity=false] - Resizes renderer view in CSS pixels to allow for
 *   resolutions other than 1
 * @param {boolean} [options.antialias=false] - sets antialias
 * @param {boolean} [options.preserveDrawingBuffer=false] - enables drawing buffer preservation, enable this if you
 *  need to call toDataUrl on the webgl context
 * @param {number} [options.backgroundColor=0x000000] - The background color of the rendered area
 *  (shown if not transparent).
 * @param {number} [options.backgroundAlpha=1] - Value from 0 (fully transparent) to 1 (fully opaque).
 * @param {boolean} [options.clearBeforeRender=true] - This sets if the renderer will clear the canvas or
 *   not before the new render pass.
 * @param {number} [options.resolution=1] - The resolution / device pixel ratio of the renderer, retina would be 2
 * @param {boolean} [options.forceCanvas=false] - prevents selection of WebGL renderer, even if such is present, this
 *   option only is available when using **pixi.js-legacy** or **@pixi/canvas-renderer** modules, otherwise
 *   it is ignored.
 * @param {string} [options.powerPreference] - Parameter passed to webgl context, set to "high-performance"
 *  for devices with dual graphics card **webgl only**
 * @return {PIXI.Renderer|PIXI.CanvasRenderer} Returns WebGL renderer if available, otherwise CanvasRenderer
 */
function autoDetectRenderer(options) {
    return Renderer.create(options);
}

var $defaultVertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";

var $defaultFilterVertex = "attribute vec2 aVertexPosition;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aVertexPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";

/**
 * Default vertex shader
 * @memberof PIXI
 * @member {string} defaultVertex
 */
/**
 * Default filter vertex shader
 * @memberof PIXI
 * @member {string} defaultFilterVertex
 */
// NOTE: This black magic is so that @microsoft/api-extractor does not complain! This explicitly specifies the types
// of defaultVertex, defaultFilterVertex.
var defaultVertex$2 = $defaultVertex;
var defaultFilterVertex = $defaultFilterVertex;

/**
 * Used by the batcher to draw batches.
 * Each one of these contains all information required to draw a bound geometry.
 *
 * @class
 * @memberof PIXI
 */
var BatchDrawCall = /** @class */ (function () {
    function BatchDrawCall() {
        this.texArray = null;
        this.blend = 0;
        this.type = _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["DRAW_MODES"].TRIANGLES;
        this.start = 0;
        this.size = 0;
        /**
         * data for uniforms or custom webgl state
         * @member {object}
         */
        this.data = null;
    }
    return BatchDrawCall;
}());

/**
 * Used by the batcher to build texture batches.
 * Holds list of textures and their respective locations.
 *
 * @class
 * @memberof PIXI
 */
var BatchTextureArray = /** @class */ (function () {
    function BatchTextureArray() {
        /**
         * inside textures array
         * @member {PIXI.BaseTexture[]}
         */
        this.elements = [];
        /**
         * Respective locations for textures
         * @member {number[]}
         */
        this.ids = [];
        /**
         * number of filled elements
         * @member {number}
         */
        this.count = 0;
    }
    BatchTextureArray.prototype.clear = function () {
        for (var i = 0; i < this.count; i++) {
            this.elements[i] = null;
        }
        this.count = 0;
    };
    return BatchTextureArray;
}());

/**
 * Flexible wrapper around `ArrayBuffer` that also provides typed array views on demand.
 *
 * @class
 * @memberof PIXI
 */
var ViewableBuffer = /** @class */ (function () {
    function ViewableBuffer(sizeOrBuffer) {
        if (typeof sizeOrBuffer === 'number') {
            /**
             * Underlying `ArrayBuffer` that holds all the data and is of capacity `this.size`.
             *
             * @member {ArrayBuffer}
             */
            this.rawBinaryData = new ArrayBuffer(sizeOrBuffer);
        }
        else if (sizeOrBuffer instanceof Uint8Array) {
            this.rawBinaryData = sizeOrBuffer.buffer;
        }
        else {
            this.rawBinaryData = sizeOrBuffer;
        }
        /**
         * View on the raw binary data as a `Uint32Array`.
         *
         * @member {Uint32Array}
         */
        this.uint32View = new Uint32Array(this.rawBinaryData);
        /**
         * View on the raw binary data as a `Float32Array`.
         *
         * @member {Float32Array}
         */
        this.float32View = new Float32Array(this.rawBinaryData);
    }
    Object.defineProperty(ViewableBuffer.prototype, "int8View", {
        /**
         * View on the raw binary data as a `Int8Array`.
         *
         * @member {Int8Array}
         */
        get: function () {
            if (!this._int8View) {
                this._int8View = new Int8Array(this.rawBinaryData);
            }
            return this._int8View;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewableBuffer.prototype, "uint8View", {
        /**
         * View on the raw binary data as a `Uint8Array`.
         *
         * @member {Uint8Array}
         */
        get: function () {
            if (!this._uint8View) {
                this._uint8View = new Uint8Array(this.rawBinaryData);
            }
            return this._uint8View;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewableBuffer.prototype, "int16View", {
        /**
         * View on the raw binary data as a `Int16Array`.
         *
         * @member {Int16Array}
         */
        get: function () {
            if (!this._int16View) {
                this._int16View = new Int16Array(this.rawBinaryData);
            }
            return this._int16View;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewableBuffer.prototype, "uint16View", {
        /**
         * View on the raw binary data as a `Uint16Array`.
         *
         * @member {Uint16Array}
         */
        get: function () {
            if (!this._uint16View) {
                this._uint16View = new Uint16Array(this.rawBinaryData);
            }
            return this._uint16View;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewableBuffer.prototype, "int32View", {
        /**
         * View on the raw binary data as a `Int32Array`.
         *
         * @member {Int32Array}
         */
        get: function () {
            if (!this._int32View) {
                this._int32View = new Int32Array(this.rawBinaryData);
            }
            return this._int32View;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the view of the given type.
     *
     * @param {string} type - One of `int8`, `uint8`, `int16`,
     *    `uint16`, `int32`, `uint32`, and `float32`.
     * @return {object} typed array of given type
     */
    ViewableBuffer.prototype.view = function (type) {
        return this[type + "View"];
    };
    /**
     * Destroys all buffer references. Do not use after calling
     * this.
     */
    ViewableBuffer.prototype.destroy = function () {
        this.rawBinaryData = null;
        this._int8View = null;
        this._uint8View = null;
        this._int16View = null;
        this._uint16View = null;
        this._int32View = null;
        this.uint32View = null;
        this.float32View = null;
    };
    ViewableBuffer.sizeOf = function (type) {
        switch (type) {
            case 'int8':
            case 'uint8':
                return 1;
            case 'int16':
            case 'uint16':
                return 2;
            case 'int32':
            case 'uint32':
            case 'float32':
                return 4;
            default:
                throw new Error(type + " isn't a valid view type");
        }
    };
    return ViewableBuffer;
}());

/**
 * Renderer dedicated to drawing and batching sprites.
 *
 * This is the default batch renderer. It buffers objects
 * with texture-based geometries and renders them in
 * batches. It uploads multiple textures to the GPU to
 * reduce to the number of draw calls.
 *
 * @class
 * @protected
 * @memberof PIXI
 * @extends PIXI.ObjectRenderer
 */
var AbstractBatchRenderer = /** @class */ (function (_super) {
    __extends(AbstractBatchRenderer, _super);
    /**
     * This will hook onto the renderer's `contextChange`
     * and `prerender` signals.
     *
     * @param {PIXI.Renderer} renderer - The renderer this works for.
     */
    function AbstractBatchRenderer(renderer) {
        var _this = _super.call(this, renderer) || this;
        /**
         * This is used to generate a shader that can
         * color each vertex based on a `aTextureId`
         * attribute that points to an texture in `uSampler`.
         *
         * This enables the objects with different textures
         * to be drawn in the same draw call.
         *
         * You can customize your shader by creating your
         * custom shader generator.
         *
         * @member {PIXI.BatchShaderGenerator}
         * @protected
         */
        _this.shaderGenerator = null;
        /**
         * The class that represents the geometry of objects
         * that are going to be batched with this.
         *
         * @member {object}
         * @default PIXI.BatchGeometry
         * @protected
         */
        _this.geometryClass = null;
        /**
         * Size of data being buffered per vertex in the
         * attribute buffers (in floats). By default, the
         * batch-renderer plugin uses 6:
         *
         * | aVertexPosition | 2 |
         * |-----------------|---|
         * | aTextureCoords  | 2 |
         * | aColor          | 1 |
         * | aTextureId      | 1 |
         *
         * @member {number}
         * @readonly
         */
        _this.vertexSize = null;
        /**
         * The WebGL state in which this renderer will work.
         *
         * @member {PIXI.State}
         * @readonly
         */
        _this.state = State.for2d();
        /**
         * The number of bufferable objects before a flush
         * occurs automatically.
         *
         * @member {number}
         * @default settings.SPRITE_BATCH_SIZE * 4
         */
        _this.size = _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].SPRITE_BATCH_SIZE * 4;
        /**
         * Total count of all vertices used by the currently
         * buffered objects.
         *
         * @member {number}
         * @private
         */
        _this._vertexCount = 0;
        /**
         * Total count of all indices used by the currently
         * buffered objects.
         *
         * @member {number}
         * @private
         */
        _this._indexCount = 0;
        /**
         * Buffer of objects that are yet to be rendered.
         *
         * @member {PIXI.DisplayObject[]}
         * @private
         */
        _this._bufferedElements = [];
        /**
         * Data for texture batch builder, helps to save a bit of CPU on a pass.
         * @type {PIXI.BaseTexture[]}
         * @private
         */
        _this._bufferedTextures = [];
        /**
         * Number of elements that are buffered and are
         * waiting to be flushed.
         *
         * @member {number}
         * @private
         */
        _this._bufferSize = 0;
        /**
         * This shader is generated by `this.shaderGenerator`.
         *
         * It is generated specifically to handle the required
         * number of textures being batched together.
         *
         * @member {PIXI.Shader}
         * @protected
         */
        _this._shader = null;
        /**
         * Pool of `this.geometryClass` geometry objects
         * that store buffers. They are used to pass data
         * to the shader on each draw call.
         *
         * These are never re-allocated again, unless a
         * context change occurs; however, the pool may
         * be expanded if required.
         *
         * @member {PIXI.Geometry[]}
         * @private
         * @see PIXI.AbstractBatchRenderer.contextChange
         */
        _this._packedGeometries = [];
        /**
         * Size of `this._packedGeometries`. It can be expanded
         * if more than `this._packedGeometryPoolSize` flushes
         * occur in a single frame.
         *
         * @member {number}
         * @private
         */
        _this._packedGeometryPoolSize = 2;
        /**
         * A flush may occur multiple times in a single
         * frame. On iOS devices or when
         * `settings.CAN_UPLOAD_SAME_BUFFER` is false, the
         * batch renderer does not upload data to the same
         * `WebGLBuffer` for performance reasons.
         *
         * This is the index into `packedGeometries` that points to
         * geometry holding the most recent buffers.
         *
         * @member {number}
         * @private
         */
        _this._flushId = 0;
        /**
         * Pool of `ViewableBuffer` objects that are sorted in
         * order of increasing size. The flush method uses
         * the buffer with the least size above the amount
         * it requires. These are used for passing attributes.
         *
         * The first buffer has a size of 8; each subsequent
         * buffer has double capacity of its previous.
         *
         * @member {PIXI.ViewableBuffer[]}
         * @private
         * @see PIXI.AbstractBatchRenderer#getAttributeBuffer
         */
        _this._aBuffers = {};
        /**
         * Pool of `Uint16Array` objects that are sorted in
         * order of increasing size. The flush method uses
         * the buffer with the least size above the amount
         * it requires. These are used for passing indices.
         *
         * The first buffer has a size of 12; each subsequent
         * buffer has double capacity of its previous.
         *
         * @member {Uint16Array[]}
         * @private
         * @see PIXI.AbstractBatchRenderer#getIndexBuffer
         */
        _this._iBuffers = {};
        /**
         * Maximum number of textures that can be uploaded to
         * the GPU under the current context. It is initialized
         * properly in `this.contextChange`.
         *
         * @member {number}
         * @see PIXI.AbstractBatchRenderer#contextChange
         * @readonly
         */
        _this.MAX_TEXTURES = 1;
        _this.renderer.on('prerender', _this.onPrerender, _this);
        renderer.runners.contextChange.add(_this);
        _this._dcIndex = 0;
        _this._aIndex = 0;
        _this._iIndex = 0;
        _this._attributeBuffer = null;
        _this._indexBuffer = null;
        _this._tempBoundTextures = [];
        return _this;
    }
    /**
     * Handles the `contextChange` signal.
     *
     * It calculates `this.MAX_TEXTURES` and allocating the
     * packed-geometry object pool.
     */
    AbstractBatchRenderer.prototype.contextChange = function () {
        var gl = this.renderer.gl;
        if (_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].PREFER_ENV === _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["ENV"].WEBGL_LEGACY) {
            this.MAX_TEXTURES = 1;
        }
        else {
            // step 1: first check max textures the GPU can handle.
            this.MAX_TEXTURES = Math.min(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].SPRITE_MAX_TEXTURES);
            // step 2: check the maximum number of if statements the shader can have too..
            this.MAX_TEXTURES = checkMaxIfStatementsInShader(this.MAX_TEXTURES, gl);
        }
        this._shader = this.shaderGenerator.generateShader(this.MAX_TEXTURES);
        // we use the second shader as the first one depending on your browser
        // may omit aTextureId as it is not used by the shader so is optimized out.
        for (var i = 0; i < this._packedGeometryPoolSize; i++) {
            /* eslint-disable max-len */
            this._packedGeometries[i] = new (this.geometryClass)();
        }
        this.initFlushBuffers();
    };
    /**
     * Makes sure that static and dynamic flush pooled objects have correct dimensions
     */
    AbstractBatchRenderer.prototype.initFlushBuffers = function () {
        var _drawCallPool = AbstractBatchRenderer._drawCallPool, _textureArrayPool = AbstractBatchRenderer._textureArrayPool;
        // max draw calls
        var MAX_SPRITES = this.size / 4;
        // max texture arrays
        var MAX_TA = Math.floor(MAX_SPRITES / this.MAX_TEXTURES) + 1;
        while (_drawCallPool.length < MAX_SPRITES) {
            _drawCallPool.push(new BatchDrawCall());
        }
        while (_textureArrayPool.length < MAX_TA) {
            _textureArrayPool.push(new BatchTextureArray());
        }
        for (var i = 0; i < this.MAX_TEXTURES; i++) {
            this._tempBoundTextures[i] = null;
        }
    };
    /**
     * Handles the `prerender` signal.
     *
     * It ensures that flushes start from the first geometry
     * object again.
     */
    AbstractBatchRenderer.prototype.onPrerender = function () {
        this._flushId = 0;
    };
    /**
     * Buffers the "batchable" object. It need not be rendered
     * immediately.
     *
     * @param {PIXI.DisplayObject} element - the element to render when
     *    using this renderer
     */
    AbstractBatchRenderer.prototype.render = function (element) {
        if (!element._texture.valid) {
            return;
        }
        if (this._vertexCount + (element.vertexData.length / 2) > this.size) {
            this.flush();
        }
        this._vertexCount += element.vertexData.length / 2;
        this._indexCount += element.indices.length;
        this._bufferedTextures[this._bufferSize] = element._texture.baseTexture;
        this._bufferedElements[this._bufferSize++] = element;
    };
    AbstractBatchRenderer.prototype.buildTexturesAndDrawCalls = function () {
        var _a = this, textures = _a._bufferedTextures, MAX_TEXTURES = _a.MAX_TEXTURES;
        var textureArrays = AbstractBatchRenderer._textureArrayPool;
        var batch = this.renderer.batch;
        var boundTextures = this._tempBoundTextures;
        var touch = this.renderer.textureGC.count;
        var TICK = ++BaseTexture._globalBatch;
        var countTexArrays = 0;
        var texArray = textureArrays[0];
        var start = 0;
        batch.copyBoundTextures(boundTextures, MAX_TEXTURES);
        for (var i = 0; i < this._bufferSize; ++i) {
            var tex = textures[i];
            textures[i] = null;
            if (tex._batchEnabled === TICK) {
                continue;
            }
            if (texArray.count >= MAX_TEXTURES) {
                batch.boundArray(texArray, boundTextures, TICK, MAX_TEXTURES);
                this.buildDrawCalls(texArray, start, i);
                start = i;
                texArray = textureArrays[++countTexArrays];
                ++TICK;
            }
            tex._batchEnabled = TICK;
            tex.touched = touch;
            texArray.elements[texArray.count++] = tex;
        }
        if (texArray.count > 0) {
            batch.boundArray(texArray, boundTextures, TICK, MAX_TEXTURES);
            this.buildDrawCalls(texArray, start, this._bufferSize);
            ++countTexArrays;
            ++TICK;
        }
        // Clean-up
        for (var i = 0; i < boundTextures.length; i++) {
            boundTextures[i] = null;
        }
        BaseTexture._globalBatch = TICK;
    };
    /**
     * Populating drawcalls for rendering
     *
     * @param {PIXI.BatchTextureArray} texArray
     * @param {number} start
     * @param {number} finish
     */
    AbstractBatchRenderer.prototype.buildDrawCalls = function (texArray, start, finish) {
        var _a = this, elements = _a._bufferedElements, _attributeBuffer = _a._attributeBuffer, _indexBuffer = _a._indexBuffer, vertexSize = _a.vertexSize;
        var drawCalls = AbstractBatchRenderer._drawCallPool;
        var dcIndex = this._dcIndex;
        var aIndex = this._aIndex;
        var iIndex = this._iIndex;
        var drawCall = drawCalls[dcIndex];
        drawCall.start = this._iIndex;
        drawCall.texArray = texArray;
        for (var i = start; i < finish; ++i) {
            var sprite = elements[i];
            var tex = sprite._texture.baseTexture;
            var spriteBlendMode = _pixi_utils__WEBPACK_IMPORTED_MODULE_2__["premultiplyBlendMode"][tex.alphaMode ? 1 : 0][sprite.blendMode];
            elements[i] = null;
            if (start < i && drawCall.blend !== spriteBlendMode) {
                drawCall.size = iIndex - drawCall.start;
                start = i;
                drawCall = drawCalls[++dcIndex];
                drawCall.texArray = texArray;
                drawCall.start = iIndex;
            }
            this.packInterleavedGeometry(sprite, _attributeBuffer, _indexBuffer, aIndex, iIndex);
            aIndex += sprite.vertexData.length / 2 * vertexSize;
            iIndex += sprite.indices.length;
            drawCall.blend = spriteBlendMode;
        }
        if (start < finish) {
            drawCall.size = iIndex - drawCall.start;
            ++dcIndex;
        }
        this._dcIndex = dcIndex;
        this._aIndex = aIndex;
        this._iIndex = iIndex;
    };
    /**
     * Bind textures for current rendering
     *
     * @param {PIXI.BatchTextureArray} texArray
     */
    AbstractBatchRenderer.prototype.bindAndClearTexArray = function (texArray) {
        var textureSystem = this.renderer.texture;
        for (var j = 0; j < texArray.count; j++) {
            textureSystem.bind(texArray.elements[j], texArray.ids[j]);
            texArray.elements[j] = null;
        }
        texArray.count = 0;
    };
    AbstractBatchRenderer.prototype.updateGeometry = function () {
        var _a = this, packedGeometries = _a._packedGeometries, attributeBuffer = _a._attributeBuffer, indexBuffer = _a._indexBuffer;
        if (!_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].CAN_UPLOAD_SAME_BUFFER) { /* Usually on iOS devices, where the browser doesn't
            like uploads to the same buffer in a single frame. */
            if (this._packedGeometryPoolSize <= this._flushId) {
                this._packedGeometryPoolSize++;
                packedGeometries[this._flushId] = new (this.geometryClass)();
            }
            packedGeometries[this._flushId]._buffer.update(attributeBuffer.rawBinaryData);
            packedGeometries[this._flushId]._indexBuffer.update(indexBuffer);
            this.renderer.geometry.bind(packedGeometries[this._flushId]);
            this.renderer.geometry.updateBuffers();
            this._flushId++;
        }
        else {
            // lets use the faster option, always use buffer number 0
            packedGeometries[this._flushId]._buffer.update(attributeBuffer.rawBinaryData);
            packedGeometries[this._flushId]._indexBuffer.update(indexBuffer);
            this.renderer.geometry.updateBuffers();
        }
    };
    AbstractBatchRenderer.prototype.drawBatches = function () {
        var dcCount = this._dcIndex;
        var _a = this.renderer, gl = _a.gl, stateSystem = _a.state;
        var drawCalls = AbstractBatchRenderer._drawCallPool;
        var curTexArray = null;
        // Upload textures and do the draw calls
        for (var i = 0; i < dcCount; i++) {
            var _b = drawCalls[i], texArray = _b.texArray, type = _b.type, size = _b.size, start = _b.start, blend = _b.blend;
            if (curTexArray !== texArray) {
                curTexArray = texArray;
                this.bindAndClearTexArray(texArray);
            }
            this.state.blendMode = blend;
            stateSystem.set(this.state);
            gl.drawElements(type, size, gl.UNSIGNED_SHORT, start * 2);
        }
    };
    /**
     * Renders the content _now_ and empties the current batch.
     */
    AbstractBatchRenderer.prototype.flush = function () {
        if (this._vertexCount === 0) {
            return;
        }
        this._attributeBuffer = this.getAttributeBuffer(this._vertexCount);
        this._indexBuffer = this.getIndexBuffer(this._indexCount);
        this._aIndex = 0;
        this._iIndex = 0;
        this._dcIndex = 0;
        this.buildTexturesAndDrawCalls();
        this.updateGeometry();
        this.drawBatches();
        // reset elements buffer for the next flush
        this._bufferSize = 0;
        this._vertexCount = 0;
        this._indexCount = 0;
    };
    /**
     * Starts a new sprite batch.
     */
    AbstractBatchRenderer.prototype.start = function () {
        this.renderer.state.set(this.state);
        this.renderer.shader.bind(this._shader);
        if (_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].CAN_UPLOAD_SAME_BUFFER) {
            // bind buffer #0, we don't need others
            this.renderer.geometry.bind(this._packedGeometries[this._flushId]);
        }
    };
    /**
     * Stops and flushes the current batch.
     */
    AbstractBatchRenderer.prototype.stop = function () {
        this.flush();
    };
    /**
     * Destroys this `AbstractBatchRenderer`. It cannot be used again.
     */
    AbstractBatchRenderer.prototype.destroy = function () {
        for (var i = 0; i < this._packedGeometryPoolSize; i++) {
            if (this._packedGeometries[i]) {
                this._packedGeometries[i].destroy();
            }
        }
        this.renderer.off('prerender', this.onPrerender, this);
        this._aBuffers = null;
        this._iBuffers = null;
        this._packedGeometries = null;
        this._attributeBuffer = null;
        this._indexBuffer = null;
        if (this._shader) {
            this._shader.destroy();
            this._shader = null;
        }
        _super.prototype.destroy.call(this);
    };
    /**
     * Fetches an attribute buffer from `this._aBuffers` that
     * can hold atleast `size` floats.
     *
     * @param {number} size - minimum capacity required
     * @return {ViewableBuffer} - buffer than can hold atleast `size` floats
     * @private
     */
    AbstractBatchRenderer.prototype.getAttributeBuffer = function (size) {
        // 8 vertices is enough for 2 quads
        var roundedP2 = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["nextPow2"])(Math.ceil(size / 8));
        var roundedSizeIndex = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["log2"])(roundedP2);
        var roundedSize = roundedP2 * 8;
        if (this._aBuffers.length <= roundedSizeIndex) {
            this._iBuffers.length = roundedSizeIndex + 1;
        }
        var buffer = this._aBuffers[roundedSize];
        if (!buffer) {
            this._aBuffers[roundedSize] = buffer = new ViewableBuffer(roundedSize * this.vertexSize * 4);
        }
        return buffer;
    };
    /**
     * Fetches an index buffer from `this._iBuffers` that can
     * have at least `size` capacity.
     *
     * @param {number} size - minimum required capacity
     * @return {Uint16Array} - buffer that can fit `size`
     *    indices.
     * @private
     */
    AbstractBatchRenderer.prototype.getIndexBuffer = function (size) {
        // 12 indices is enough for 2 quads
        var roundedP2 = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["nextPow2"])(Math.ceil(size / 12));
        var roundedSizeIndex = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["log2"])(roundedP2);
        var roundedSize = roundedP2 * 12;
        if (this._iBuffers.length <= roundedSizeIndex) {
            this._iBuffers.length = roundedSizeIndex + 1;
        }
        var buffer = this._iBuffers[roundedSizeIndex];
        if (!buffer) {
            this._iBuffers[roundedSizeIndex] = buffer = new Uint16Array(roundedSize);
        }
        return buffer;
    };
    /**
     * Takes the four batching parameters of `element`, interleaves
     * and pushes them into the batching attribute/index buffers given.
     *
     * It uses these properties: `vertexData` `uvs`, `textureId` and
     * `indicies`. It also uses the "tint" of the base-texture, if
     * present.
     *
     * @param {PIXI.Sprite} element - element being rendered
     * @param {PIXI.ViewableBuffer} attributeBuffer - attribute buffer.
     * @param {Uint16Array} indexBuffer - index buffer
     * @param {number} aIndex - number of floats already in the attribute buffer
     * @param {number} iIndex - number of indices already in `indexBuffer`
     */
    AbstractBatchRenderer.prototype.packInterleavedGeometry = function (element, attributeBuffer, indexBuffer, aIndex, iIndex) {
        var uint32View = attributeBuffer.uint32View, float32View = attributeBuffer.float32View;
        var packedVertices = aIndex / this.vertexSize;
        var uvs = element.uvs;
        var indicies = element.indices;
        var vertexData = element.vertexData;
        var textureId = element._texture.baseTexture._batchLocation;
        var alpha = Math.min(element.worldAlpha, 1.0);
        var argb = (alpha < 1.0
            && element._texture.baseTexture.alphaMode)
            ? Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["premultiplyTint"])(element._tintRGB, alpha)
            : element._tintRGB + (alpha * 255 << 24);
        // lets not worry about tint! for now..
        for (var i = 0; i < vertexData.length; i += 2) {
            float32View[aIndex++] = vertexData[i];
            float32View[aIndex++] = vertexData[i + 1];
            float32View[aIndex++] = uvs[i];
            float32View[aIndex++] = uvs[i + 1];
            uint32View[aIndex++] = argb;
            float32View[aIndex++] = textureId;
        }
        for (var i = 0; i < indicies.length; i++) {
            indexBuffer[iIndex++] = packedVertices + indicies[i];
        }
    };
    /**
     * Pool of `BatchDrawCall` objects that `flush` used
     * to create "batches" of the objects being rendered.
     *
     * These are never re-allocated again.
     * Shared between all batch renderers because it can be only one "flush" working at the moment.
     *
     * @static
     * @member {PIXI.BatchDrawCall[]}
     */
    AbstractBatchRenderer._drawCallPool = [];
    /**
     * Pool of `BatchDrawCall` objects that `flush` used
     * to create "batches" of the objects being rendered.
     *
     * These are never re-allocated again.
     * Shared between all batch renderers because it can be only one "flush" working at the moment.
     *
     * @static
     * @member {PIXI.BatchTextureArray[]}
     */
    AbstractBatchRenderer._textureArrayPool = [];
    return AbstractBatchRenderer;
}(ObjectRenderer));

/**
 * Helper that generates batching multi-texture shader. Use it with your new BatchRenderer
 *
 * @class
 * @memberof PIXI
 */
var BatchShaderGenerator = /** @class */ (function () {
    /**
     * @param {string} vertexSrc - Vertex shader
     * @param {string} fragTemplate - Fragment shader template
     */
    function BatchShaderGenerator(vertexSrc, fragTemplate) {
        /**
         * Reference to the vertex shader source.
         *
         * @member {string}
         */
        this.vertexSrc = vertexSrc;
        /**
         * Reference to the fragment shader template. Must contain "%count%" and "%forloop%".
         *
         * @member {string}
         */
        this.fragTemplate = fragTemplate;
        this.programCache = {};
        this.defaultGroupCache = {};
        if (fragTemplate.indexOf('%count%') < 0) {
            throw new Error('Fragment template must contain "%count%".');
        }
        if (fragTemplate.indexOf('%forloop%') < 0) {
            throw new Error('Fragment template must contain "%forloop%".');
        }
    }
    BatchShaderGenerator.prototype.generateShader = function (maxTextures) {
        if (!this.programCache[maxTextures]) {
            var sampleValues = new Int32Array(maxTextures);
            for (var i = 0; i < maxTextures; i++) {
                sampleValues[i] = i;
            }
            this.defaultGroupCache[maxTextures] = UniformGroup.from({ uSamplers: sampleValues }, true);
            var fragmentSrc = this.fragTemplate;
            fragmentSrc = fragmentSrc.replace(/%count%/gi, "" + maxTextures);
            fragmentSrc = fragmentSrc.replace(/%forloop%/gi, this.generateSampleSrc(maxTextures));
            this.programCache[maxTextures] = new Program(this.vertexSrc, fragmentSrc);
        }
        var uniforms = {
            tint: new Float32Array([1, 1, 1, 1]),
            translationMatrix: new _pixi_math__WEBPACK_IMPORTED_MODULE_5__["Matrix"](),
            default: this.defaultGroupCache[maxTextures],
        };
        return new Shader(this.programCache[maxTextures], uniforms);
    };
    BatchShaderGenerator.prototype.generateSampleSrc = function (maxTextures) {
        var src = '';
        src += '\n';
        src += '\n';
        for (var i = 0; i < maxTextures; i++) {
            if (i > 0) {
                src += '\nelse ';
            }
            if (i < maxTextures - 1) {
                src += "if(vTextureId < " + i + ".5)";
            }
            src += '\n{';
            src += "\n\tcolor = texture2D(uSamplers[" + i + "], vTextureCoord);";
            src += '\n}';
        }
        src += '\n';
        src += '\n';
        return src;
    };
    return BatchShaderGenerator;
}());

/**
 * Geometry used to batch standard PIXI content (e.g. Mesh, Sprite, Graphics objects).
 *
 * @class
 * @memberof PIXI
 */
var BatchGeometry = /** @class */ (function (_super) {
    __extends(BatchGeometry, _super);
    /**
     * @param {boolean} [_static=false] - Optimization flag, where `false`
     *        is updated every frame, `true` doesn't change frame-to-frame.
     */
    function BatchGeometry(_static) {
        if (_static === void 0) { _static = false; }
        var _this = _super.call(this) || this;
        /**
         * Buffer used for position, color, texture IDs
         *
         * @member {PIXI.Buffer}
         * @protected
         */
        _this._buffer = new Buffer(null, _static, false);
        /**
         * Index buffer data
         *
         * @member {PIXI.Buffer}
         * @protected
         */
        _this._indexBuffer = new Buffer(null, _static, true);
        _this.addAttribute('aVertexPosition', _this._buffer, 2, false, _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TYPES"].FLOAT)
            .addAttribute('aTextureCoord', _this._buffer, 2, false, _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TYPES"].FLOAT)
            .addAttribute('aColor', _this._buffer, 4, true, _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TYPES"].UNSIGNED_BYTE)
            .addAttribute('aTextureId', _this._buffer, 1, true, _pixi_constants__WEBPACK_IMPORTED_MODULE_1__["TYPES"].FLOAT)
            .addIndex(_this._indexBuffer);
        return _this;
    }
    return BatchGeometry;
}(Geometry));

var defaultVertex$3 = "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform vec4 tint;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor * tint;\n}\n";

var defaultFragment$2 = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = color * vColor;\n}\n";

/**
 * @class
 * @memberof PIXI
 * @hideconstructor
 */
var BatchPluginFactory = /** @class */ (function () {
    function BatchPluginFactory() {
    }
    /**
     * Create a new BatchRenderer plugin for Renderer. this convenience can provide an easy way
     * to extend BatchRenderer with all the necessary pieces.
     * @example
     * const fragment = `
     * varying vec2 vTextureCoord;
     * varying vec4 vColor;
     * varying float vTextureId;
     * uniform sampler2D uSamplers[%count%];
     *
     * void main(void){
     *     vec4 color;
     *     %forloop%
     *     gl_FragColor = vColor * vec4(color.a - color.rgb, color.a);
     * }
     * `;
     * const InvertBatchRenderer = PIXI.BatchPluginFactory.create({ fragment });
     * PIXI.Renderer.registerPlugin('invert', InvertBatchRenderer);
     * const sprite = new PIXI.Sprite();
     * sprite.pluginName = 'invert';
     *
     * @static
     * @param {object} [options]
     * @param {string} [options.vertex=PIXI.BatchPluginFactory.defaultVertexSrc] - Vertex shader source
     * @param {string} [options.fragment=PIXI.BatchPluginFactory.defaultFragmentTemplate] - Fragment shader template
     * @param {number} [options.vertexSize=6] - Vertex size
     * @param {object} [options.geometryClass=PIXI.BatchGeometry]
     * @return {*} New batch renderer plugin
     */
    BatchPluginFactory.create = function (options) {
        var _a = Object.assign({
            vertex: defaultVertex$3,
            fragment: defaultFragment$2,
            geometryClass: BatchGeometry,
            vertexSize: 6,
        }, options), vertex = _a.vertex, fragment = _a.fragment, vertexSize = _a.vertexSize, geometryClass = _a.geometryClass;
        return /** @class */ (function (_super) {
            __extends(BatchPlugin, _super);
            function BatchPlugin(renderer) {
                var _this = _super.call(this, renderer) || this;
                _this.shaderGenerator = new BatchShaderGenerator(vertex, fragment);
                _this.geometryClass = geometryClass;
                _this.vertexSize = vertexSize;
                return _this;
            }
            return BatchPlugin;
        }(AbstractBatchRenderer));
    };
    Object.defineProperty(BatchPluginFactory, "defaultVertexSrc", {
        /**
         * The default vertex shader source
         *
         * @static
         * @type {string}
         * @constant
         */
        get: function () {
            return defaultVertex$3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatchPluginFactory, "defaultFragmentTemplate", {
        /**
         * The default fragment shader source
         *
         * @static
         * @type {string}
         * @constant
         */
        get: function () {
            return defaultFragment$2;
        },
        enumerable: false,
        configurable: true
    });
    return BatchPluginFactory;
}());
// Setup the default BatchRenderer plugin, this is what
// we'll actually export at the root level
var BatchRenderer = BatchPluginFactory.create();

/**
 * @memberof PIXI
 * @namespace resources
 * @see PIXI
 * @deprecated since 6.0.0
 */
var resources = {};
var _loop_1 = function (name) {
    Object.defineProperty(resources, name, {
        get: function () {
            Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["deprecation"])('6.0.0', "PIXI.systems." + name + " has moved to PIXI." + name);
            return _resources[name];
        },
    });
};
for (var name in _resources) {
    _loop_1(name);
}
/**
 * @memberof PIXI
 * @namespace systems
 * @see PIXI
 * @deprecated since 6.0.0
 */
var systems = {};
var _loop_2 = function (name) {
    Object.defineProperty(systems, name, {
        get: function () {
            Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["deprecation"])('6.0.0', "PIXI.resources." + name + " has moved to PIXI." + name);
            return _systems[name];
        },
    });
};
for (var name in _systems) {
    _loop_2(name);
}


//# sourceMappingURL=core.js.map


/***/ }),

/***/ "./node_modules/@pixi/display/dist/esm/display.js":
/*!********************************************************!*\
  !*** ./node_modules/@pixi/display/dist/esm/display.js ***!
  \********************************************************/
/*! exports provided: Bounds, Container, DisplayObject, TemporaryDisplayObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bounds", function() { return Bounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisplayObject", function() { return DisplayObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemporaryDisplayObject", function() { return TemporaryDisplayObject; });
/* harmony import */ var _pixi_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pixi/settings */ "./node_modules/@pixi/settings/dist/esm/settings.js");
/* harmony import */ var _pixi_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pixi/math */ "./node_modules/@pixi/math/dist/esm/math.js");
/* harmony import */ var _pixi_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pixi/utils */ "./node_modules/@pixi/utils/dist/esm/utils.js");
/*!
 * @pixi/display - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:17:46 UTC
 *
 * @pixi/display is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */




/**
 * Sets the default value for the container property 'sortableChildren'.
 * If set to true, the container will sort its children by zIndex value
 * when updateTransform() is called, or manually if sortChildren() is called.
 *
 * This actually changes the order of elements in the array, so should be treated
 * as a basic solution that is not performant compared to other solutions,
 * such as @link https://github.com/pixijs/pixi-display
 *
 * Also be aware of that this may not work nicely with the addChildAt() function,
 * as the zIndex sorting may cause the child to automatically sorted to another position.
 *
 * @static
 * @constant
 * @name SORTABLE_CHILDREN
 * @memberof PIXI.settings
 * @type {boolean}
 * @default false
 */
_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].SORTABLE_CHILDREN = false;

/**
 * 'Builder' pattern for bounds rectangles.
 *
 * This could be called an Axis-Aligned Bounding Box.
 * It is not an actual shape. It is a mutable thing; no 'EMPTY' or those kind of problems.
 *
 * @class
 * @memberof PIXI
 */
var Bounds = /** @class */ (function () {
    function Bounds() {
        /**
         * @member {number}
         * @default 0
         */
        this.minX = Infinity;
        /**
         * @member {number}
         * @default 0
         */
        this.minY = Infinity;
        /**
         * @member {number}
         * @default 0
         */
        this.maxX = -Infinity;
        /**
         * @member {number}
         * @default 0
         */
        this.maxY = -Infinity;
        this.rect = null;
        /**
         * It is updated to _boundsID of corresponding object to keep bounds in sync with content.
         * Updated from outside, thus public modifier.
         *
         * @member {number}
         * @public
         */
        this.updateID = -1;
    }
    /**
     * Checks if bounds are empty.
     *
     * @return {boolean} True if empty.
     */
    Bounds.prototype.isEmpty = function () {
        return this.minX > this.maxX || this.minY > this.maxY;
    };
    /**
     * Clears the bounds and resets.
     *
     */
    Bounds.prototype.clear = function () {
        this.minX = Infinity;
        this.minY = Infinity;
        this.maxX = -Infinity;
        this.maxY = -Infinity;
    };
    /**
     * Can return Rectangle.EMPTY constant, either construct new rectangle, either use your rectangle
     * It is not guaranteed that it will return tempRect
     *
     * @param {PIXI.Rectangle} rect - temporary object will be used if AABB is not empty
     * @returns {PIXI.Rectangle} A rectangle of the bounds
     */
    Bounds.prototype.getRectangle = function (rect) {
        if (this.minX > this.maxX || this.minY > this.maxY) {
            return _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Rectangle"].EMPTY;
        }
        rect = rect || new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Rectangle"](0, 0, 1, 1);
        rect.x = this.minX;
        rect.y = this.minY;
        rect.width = this.maxX - this.minX;
        rect.height = this.maxY - this.minY;
        return rect;
    };
    /**
     * This function should be inlined when its possible.
     *
     * @param {PIXI.IPointData} point - The point to add.
     */
    Bounds.prototype.addPoint = function (point) {
        this.minX = Math.min(this.minX, point.x);
        this.maxX = Math.max(this.maxX, point.x);
        this.minY = Math.min(this.minY, point.y);
        this.maxY = Math.max(this.maxY, point.y);
    };
    /**
     * Adds a point, after transformed. This should be inlined when its possible.
     *
     * @param matrix
     * @param point
     */
    Bounds.prototype.addPointMatrix = function (matrix, point) {
        var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, tx = matrix.tx, ty = matrix.ty;
        var x = (a * point.x) + (c * point.y) + tx;
        var y = (b * point.x) + (d * point.y) + ty;
        this.minX = Math.min(this.minX, x);
        this.maxX = Math.max(this.maxX, x);
        this.minY = Math.min(this.minY, y);
        this.maxY = Math.max(this.maxY, y);
    };
    /**
     * Adds a quad, not transformed
     *
     * @param {Float32Array} vertices - The verts to add.
     */
    Bounds.prototype.addQuad = function (vertices) {
        var minX = this.minX;
        var minY = this.minY;
        var maxX = this.maxX;
        var maxY = this.maxY;
        var x = vertices[0];
        var y = vertices[1];
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
        x = vertices[2];
        y = vertices[3];
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
        x = vertices[4];
        y = vertices[5];
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
        x = vertices[6];
        y = vertices[7];
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    };
    /**
     * Adds sprite frame, transformed.
     *
     * @param {PIXI.Transform} transform - transform to apply
     * @param {number} x0 - left X of frame
     * @param {number} y0 - top Y of frame
     * @param {number} x1 - right X of frame
     * @param {number} y1 - bottom Y of frame
     */
    Bounds.prototype.addFrame = function (transform, x0, y0, x1, y1) {
        this.addFrameMatrix(transform.worldTransform, x0, y0, x1, y1);
    };
    /**
     * Adds sprite frame, multiplied by matrix
     *
     * @param {PIXI.Matrix} matrix - matrix to apply
     * @param {number} x0 - left X of frame
     * @param {number} y0 - top Y of frame
     * @param {number} x1 - right X of frame
     * @param {number} y1 - bottom Y of frame
     */
    Bounds.prototype.addFrameMatrix = function (matrix, x0, y0, x1, y1) {
        var a = matrix.a;
        var b = matrix.b;
        var c = matrix.c;
        var d = matrix.d;
        var tx = matrix.tx;
        var ty = matrix.ty;
        var minX = this.minX;
        var minY = this.minY;
        var maxX = this.maxX;
        var maxY = this.maxY;
        var x = (a * x0) + (c * y0) + tx;
        var y = (b * x0) + (d * y0) + ty;
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
        x = (a * x1) + (c * y0) + tx;
        y = (b * x1) + (d * y0) + ty;
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
        x = (a * x0) + (c * y1) + tx;
        y = (b * x0) + (d * y1) + ty;
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
        x = (a * x1) + (c * y1) + tx;
        y = (b * x1) + (d * y1) + ty;
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    };
    /**
     * Adds screen vertices from array
     *
     * @param {Float32Array} vertexData - calculated vertices
     * @param {number} beginOffset - begin offset
     * @param {number} endOffset - end offset, excluded
     */
    Bounds.prototype.addVertexData = function (vertexData, beginOffset, endOffset) {
        var minX = this.minX;
        var minY = this.minY;
        var maxX = this.maxX;
        var maxY = this.maxY;
        for (var i = beginOffset; i < endOffset; i += 2) {
            var x = vertexData[i];
            var y = vertexData[i + 1];
            minX = x < minX ? x : minX;
            minY = y < minY ? y : minY;
            maxX = x > maxX ? x : maxX;
            maxY = y > maxY ? y : maxY;
        }
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    };
    /**
     * Add an array of mesh vertices
     *
     * @param {PIXI.Transform} transform - mesh transform
     * @param {Float32Array} vertices - mesh coordinates in array
     * @param {number} beginOffset - begin offset
     * @param {number} endOffset - end offset, excluded
     */
    Bounds.prototype.addVertices = function (transform, vertices, beginOffset, endOffset) {
        this.addVerticesMatrix(transform.worldTransform, vertices, beginOffset, endOffset);
    };
    /**
     * Add an array of mesh vertices.
     *
     * @param {PIXI.Matrix} matrix - mesh matrix
     * @param {Float32Array} vertices - mesh coordinates in array
     * @param {number} beginOffset - begin offset
     * @param {number} endOffset - end offset, excluded
     * @param {number} [padX=0] - x padding
     * @param {number} [padY=0] - y padding
     */
    Bounds.prototype.addVerticesMatrix = function (matrix, vertices, beginOffset, endOffset, padX, padY) {
        if (padX === void 0) { padX = 0; }
        if (padY === void 0) { padY = padX; }
        var a = matrix.a;
        var b = matrix.b;
        var c = matrix.c;
        var d = matrix.d;
        var tx = matrix.tx;
        var ty = matrix.ty;
        var minX = this.minX;
        var minY = this.minY;
        var maxX = this.maxX;
        var maxY = this.maxY;
        for (var i = beginOffset; i < endOffset; i += 2) {
            var rawX = vertices[i];
            var rawY = vertices[i + 1];
            var x = (a * rawX) + (c * rawY) + tx;
            var y = (d * rawY) + (b * rawX) + ty;
            minX = Math.min(minX, x - padX);
            maxX = Math.max(maxX, x + padX);
            minY = Math.min(minY, y - padY);
            maxY = Math.max(maxY, y + padY);
        }
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    };
    /**
     * Adds other Bounds.
     *
     * @param {PIXI.Bounds} bounds - The Bounds to be added
     */
    Bounds.prototype.addBounds = function (bounds) {
        var minX = this.minX;
        var minY = this.minY;
        var maxX = this.maxX;
        var maxY = this.maxY;
        this.minX = bounds.minX < minX ? bounds.minX : minX;
        this.minY = bounds.minY < minY ? bounds.minY : minY;
        this.maxX = bounds.maxX > maxX ? bounds.maxX : maxX;
        this.maxY = bounds.maxY > maxY ? bounds.maxY : maxY;
    };
    /**
     * Adds other Bounds, masked with Bounds.
     *
     * @param {PIXI.Bounds} bounds - The Bounds to be added.
     * @param {PIXI.Bounds} mask - TODO
     */
    Bounds.prototype.addBoundsMask = function (bounds, mask) {
        var _minX = bounds.minX > mask.minX ? bounds.minX : mask.minX;
        var _minY = bounds.minY > mask.minY ? bounds.minY : mask.minY;
        var _maxX = bounds.maxX < mask.maxX ? bounds.maxX : mask.maxX;
        var _maxY = bounds.maxY < mask.maxY ? bounds.maxY : mask.maxY;
        if (_minX <= _maxX && _minY <= _maxY) {
            var minX = this.minX;
            var minY = this.minY;
            var maxX = this.maxX;
            var maxY = this.maxY;
            this.minX = _minX < minX ? _minX : minX;
            this.minY = _minY < minY ? _minY : minY;
            this.maxX = _maxX > maxX ? _maxX : maxX;
            this.maxY = _maxY > maxY ? _maxY : maxY;
        }
    };
    /**
     * Adds other Bounds, multiplied by matrix. Bounds shouldn't be empty.
     *
     * @param {PIXI.Bounds} bounds - other bounds
     * @param {PIXI.Matrix} matrix - multiplicator
     */
    Bounds.prototype.addBoundsMatrix = function (bounds, matrix) {
        this.addFrameMatrix(matrix, bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    };
    /**
     * Adds other Bounds, masked with Rectangle.
     *
     * @param {PIXI.Bounds} bounds - TODO
     * @param {PIXI.Rectangle} area - TODO
     */
    Bounds.prototype.addBoundsArea = function (bounds, area) {
        var _minX = bounds.minX > area.x ? bounds.minX : area.x;
        var _minY = bounds.minY > area.y ? bounds.minY : area.y;
        var _maxX = bounds.maxX < area.x + area.width ? bounds.maxX : (area.x + area.width);
        var _maxY = bounds.maxY < area.y + area.height ? bounds.maxY : (area.y + area.height);
        if (_minX <= _maxX && _minY <= _maxY) {
            var minX = this.minX;
            var minY = this.minY;
            var maxX = this.maxX;
            var maxY = this.maxY;
            this.minX = _minX < minX ? _minX : minX;
            this.minY = _minY < minY ? _minY : minY;
            this.maxX = _maxX > maxX ? _maxX : maxX;
            this.maxY = _maxY > maxY ? _maxY : maxY;
        }
    };
    /**
     * Pads bounds object, making it grow in all directions.
     * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
     *
     * @param {number} [paddingX=0] - The horizontal padding amount.
     * @param {number} [paddingY=0] - The vertical padding amount.
     */
    Bounds.prototype.pad = function (paddingX, paddingY) {
        if (paddingX === void 0) { paddingX = 0; }
        if (paddingY === void 0) { paddingY = paddingX; }
        if (!this.isEmpty()) {
            this.minX -= paddingX;
            this.maxX += paddingX;
            this.minY -= paddingY;
            this.maxY += paddingY;
        }
    };
    /**
     * Adds padded frame. (x0, y0) should be strictly less than (x1, y1)
     *
     * @param {number} x0 - left X of frame
     * @param {number} y0 - top Y of frame
     * @param {number} x1 - right X of frame
     * @param {number} y1 - bottom Y of frame
     * @param {number} padX - padding X
     * @param {number} padY - padding Y
     */
    Bounds.prototype.addFramePad = function (x0, y0, x1, y1, padX, padY) {
        x0 -= padX;
        y0 -= padY;
        x1 += padX;
        y1 += padY;
        this.minX = this.minX < x0 ? this.minX : x0;
        this.maxX = this.maxX > x1 ? this.maxX : x1;
        this.minY = this.minY < y0 ? this.minY : y0;
        this.maxY = this.maxY > y1 ? this.maxY : y1;
    };
    return Bounds;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * The base class for all objects that are rendered on the screen.
 *
 * This is an abstract class and can not be used on its own; rather it should be extended.
 *
 * ## Display objects implemented in PixiJS
 *
 * | Display Object                  | Description                                                           |
 * | ------------------------------- | --------------------------------------------------------------------- |
 * | {@link PIXI.Container}          | Adds support for `children` to DisplayObject                          |
 * | {@link PIXI.Graphics}           | Shape-drawing display object similar to the Canvas API                |
 * | {@link PIXI.Sprite}             | Draws textures (i.e. images)                                          |
 * | {@link PIXI.Text}               | Draws text using the Canvas API internally                            |
 * | {@link PIXI.BitmapText}         | More scaleable solution for text rendering, reusing glyph textures    |
 * | {@link PIXI.TilingSprite}       | Draws textures/images in a tiled fashion                              |
 * | {@link PIXI.AnimatedSprite}     | Draws an animation of multiple images                                 |
 * | {@link PIXI.Mesh}               | Provides a lower-level API for drawing meshes with custom data        |
 * | {@link PIXI.NineSlicePlane}     | Mesh-related                                                          |
 * | {@link PIXI.SimpleMesh}         | v4-compatibile mesh                                                   |
 * | {@link PIXI.SimplePlane}        | Mesh-related                                                          |
 * | {@link PIXI.SimpleRope}         | Mesh-related                                                          |
 *
 * ## Transforms
 *
 * The [transform]{@link DisplayObject#transform} of a display object describes the projection from its
 * local coordinate space to its parent's local coordinate space. The following properties are derived
 * from the transform:
 *
 * <table>
 *   <thead>
 *     <tr>
 *       <th>Property</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>[pivot]{@link PIXI.DisplayObject#pivot}</td>
 *       <td>
 *         Invariant under rotation, scaling, and skewing. The projection of into the parent's space of the pivot
 *         is equal to position, regardless of the other three transformations. In other words, It is the center of
 *         rotation, scaling, and skewing.
 *       </td>
 *     </tr>
 *     <tr>
 *       <td>[position]{@link PIXI.DisplayObject#position}</td>
 *       <td>
 *         Translation. This is the position of the [pivot]{@link PIXI.DisplayObject#pivot} in the parent's local
 *         space. The default value of the pivot is the origin (0,0). If the top-left corner of your display object
 *         is (0,0) in its local space, then the position will be its top-left corner in the parent's local space.
 *       </td>
 *     </tr>
 *     <tr>
 *       <td>[scale]{@link PIXI.DisplayObject#scale}</td>
 *       <td>
 *         Scaling. This will stretch (or compress) the display object's projection. The scale factors are along the
 *         local coordinate axes. In other words, the display object is scaled before rotated or skewed. The center
 *         of scaling is the [pivot]{@link PIXI.DisplayObject#pivot}.
 *       </td>
 *     </tr>
 *     <tr>
 *       <td>[rotation]{@link PIXI.DisplayObject#rotation}</td>
 *       <td>
 *          Rotation. This will rotate the display object's projection by this angle (in radians).
 *       </td>
 *     </tr>
 *     <tr>
 *       <td>[skew]{@link PIXI.DisplayObject#skew}</td>
 *       <td>
 *         <p>Skewing. This can be used to deform a rectangular display object into a parallelogram.</p>
 *         <p>
 *         In PixiJS, skew has a slightly different behaviour than the conventional meaning. It can be
 *         thought of the net rotation applied to the coordinate axes (separately). For example, if "skew.x" is
 *         ⍺ and "skew.y" is β, then the line x = 0 will be rotated by ⍺ (y = -x*cot⍺) and the line y = 0 will be
 *         rotated by β (y = x*tanβ). A line y = x*tanϴ (i.e. a line at angle ϴ to the x-axis in local-space) will
 *         be rotated by an angle between ⍺ and β.
 *         </p>
 *         <p>
 *         It can be observed that if skew is applied equally to both axes, then it will be equivalent to applying
 *         a rotation. Indeed, if "skew.x" = -ϴ and "skew.y" = ϴ, it will produce an equivalent of "rotation" = ϴ.
 *         </p>
 *         <p>
 *         Another quite interesting observation is that "skew.x", "skew.y", rotation are communtative operations. Indeed,
 *         because rotation is essentially a careful combination of the two.
 *         </p>
 *       </td>
 *     </tr>
 *     <tr>
 *       <td>angle</td>
 *       <td>Rotation. This is an alias for [rotation]{@link PIXI.DisplayObject#rotation}, but in degrees.</td>
 *     </tr>
 *     <tr>
 *       <td>x</td>
 *       <td>Translation. This is an alias for position.x!</td>
 *     </tr>
 *     <tr>
 *       <td>y</td>
 *       <td>Translation. This is an alias for position.y!</td>
 *     </tr>
 *     <tr>
 *       <td>width</td>
 *       <td>
 *         Implemented in [Container]{@link PIXI.Container}. Scaling. The width property calculates scale.x by dividing
 *         the "requested" width by the local bounding box width. It is indirectly an abstraction over scale.x, and there
 *         is no concept of user-defined width.
 *       </td>
 *     </tr>
 *     <tr>
 *       <td>height</td>
 *       <td>
 *         Implemented in [Container]{@link PIXI.Container}. Scaling. The height property calculates scale.y by dividing
 *         the "requested" height by the local bounding box height. It is indirectly an abstraction over scale.y, and there
 *         is no concept of user-defined height.
 *       </td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * ## Bounds
 *
 * The bounds of a display object is defined by the minimum axis-aligned rectangle in world space that can fit
 * around it. The abstract `calculateBounds` method is responsible for providing it (and it should use the
 * `worldTransform` to calculate in world space).
 *
 * There are a few additional types of bounding boxes:
 *
 * | Bounds                | Description                                                                              |
 * | --------------------- | ---------------------------------------------------------------------------------------- |
 * | World Bounds          | This is synonymous is the regular bounds described above. See `getBounds()`.             |
 * | Local Bounds          | This the axis-aligned bounding box in the parent's local space. See `getLocalBounds()`.  |
 * | Render Bounds         | The bounds, but including extra rendering effects like filter padding.                   |
 * | Projected Bounds      | The bounds of the projected display object onto the screen. Usually equals world bounds. |
 * | Relative Bounds       | The bounds of a display object when projected onto a ancestor's (or parent's) space.     |
 * | Natural Bounds        | The bounds of an object in its own local space (not parent's space, like in local bounds)|
 * | Content Bounds        | The natural bounds when excluding all children of a `Container`.                         |
 *
 * ### calculateBounds
 *
 * [Container]{@link Container} already implements `calculateBounds` in a manner that includes children.
 *
 * But for a non-Container display object, the `calculateBounds` method must be overridden in order for `getBounds` and
 * `getLocalBounds` to work. This method must write the bounds into `this._bounds`.
 *
 * Generally, the following technique works for most simple cases: take the list of points
 * forming the "hull" of the object (i.e. outline of the object's shape), and then add them
 * using {@link PIXI.Bounds#addPointMatrix}.
 *
 * ```js
 * calculateBounds(): void
 * {
 *     const points = [...];
 *
 *     for (let i = 0, j = points.length; i < j; i++)
 *     {
 *         this._bounds.addPointMatrix(this.worldTransform, points[i]);
 *     }
 * }
 * ```
 *
 * You can optimize this for a large number of points by using {@link PIXI.Bounds#addVerticesMatrix} to pass them
 * in one array together.
 *
 * ## Alpha
 *
 * This alpha sets a display object's **relative opacity** w.r.t its parent. For example, if the alpha of a display
 * object is 0.5 and its parent's alpha is 0.5, then it will be rendered with 25% opacity (assuming alpha is not
 * applied on any ancestor further up the chain).
 *
 * The alpha with which the display object will be rendered is called the [worldAlpha]{@link PIXI.DisplayObject#worldAlpha}.
 *
 * ## Renderable vs Visible
 *
 * The `renderable` and `visible` properties can be used to prevent a display object from being rendered to the
 * screen. However, there is a subtle difference between the two. When using `renderable`, the transforms  of the display
 * object (and its children subtree) will continue to be calculated. When using `visible`, the transforms will not
 * be calculated.
 *
 * It is recommended that applications use the `renderable` property for culling. See
 * [@pixi-essentials/cull]{@link https://www.npmjs.com/package/@pixi-essentials/cull} or
 * [pixi-cull]{@link https://www.npmjs.com/package/pixi-cull} for more details.
 *
 * Otherwise, to prevent an object from rendering in the general-purpose sense - `visible` is the property to use. This
 * one is also better in terms of performance.
 *
 * @class
 * @extends PIXI.utils.EventEmitter
 * @memberof PIXI
 */
var DisplayObject = /** @class */ (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        var _this = _super.call(this) || this;
        _this.tempDisplayObjectParent = null;
        // TODO: need to create Transform from factory
        /**
         * World transform and local transform of this object.
         * This will become read-only later, please do not assign anything there unless you know what are you doing.
         *
         * @member {PIXI.Transform}
         */
        _this.transform = new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Transform"]();
        /**
         * The opacity of the object.
         *
         * @member {number}
         */
        _this.alpha = 1;
        /**
         * The visibility of the object. If false the object will not be drawn, and
         * the updateTransform function will not be called.
         *
         * Only affects recursive calls from parent. You can ask for bounds or call updateTransform manually.
         *
         * @member {boolean}
         */
        _this.visible = true;
        /**
         * Can this object be rendered, if false the object will not be drawn but the updateTransform
         * methods will still be called.
         *
         * Only affects recursive calls from parent. You can ask for bounds manually.
         *
         * @member {boolean}
         */
        _this.renderable = true;
        /**
         * The display object container that contains this display object.
         *
         * @member {PIXI.Container}
         */
        _this.parent = null;
        /**
         * The multiplied alpha of the displayObject.
         *
         * @member {number}
         * @readonly
         */
        _this.worldAlpha = 1;
        /**
         * Which index in the children array the display component was before the previous zIndex sort.
         * Used by containers to help sort objects with the same zIndex, by using previous array index as the decider.
         *
         * @member {number}
         * @protected
         */
        _this._lastSortedIndex = 0;
        /**
         * The zIndex of the displayObject.
         * A higher value will mean it will be rendered on top of other displayObjects within the same container.
         *
         * @member {number}
         * @protected
         */
        _this._zIndex = 0;
        /**
         * The area the filter is applied to. This is used as more of an optimization
         * rather than figuring out the dimensions of the displayObject each frame you can set this rectangle.
         *
         * Also works as an interaction mask.
         *
         * @member {?PIXI.Rectangle}
         */
        _this.filterArea = null;
        /**
         * Sets the filters for the displayObject.
         * * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
         * To remove filters simply set this property to `'null'`.
         *
         * @member {?PIXI.Filter[]}
         */
        _this.filters = null;
        /**
         * Currently enabled filters
         * @member {PIXI.Filter[]}
         * @protected
         */
        _this._enabledFilters = null;
        /**
         * The bounds object, this is used to calculate and store the bounds of the displayObject.
         *
         * @member {PIXI.Bounds}
         */
        _this._bounds = new Bounds();
        /**
         * Local bounds object, swapped with `_bounds` when using `getLocalBounds()`.
         *
         * @member {PIXI.Bounds}
         */
        _this._localBounds = null;
        /**
         * Flags the cached bounds as dirty.
         *
         * @member {number}
         * @protected
         */
        _this._boundsID = 0;
        /**
         * Cache of this display-object's bounds-rectangle.
         *
         * @member {PIXI.Bounds}
         * @protected
         */
        _this._boundsRect = null;
        /**
         * Cache of this display-object's local-bounds rectangle.
         *
         * @member {PIXI.Bounds}
         * @protected
         */
        _this._localBoundsRect = null;
        /**
         * The original, cached mask of the object.
         *
         * @member {PIXI.Container|PIXI.MaskData|null}
         * @protected
         */
        _this._mask = null;
        /**
         * If the object has been destroyed via destroy(). If true, it should not be used.
         *
         * @member {boolean}
         * @protected
         */
        _this._destroyed = false;
        /**
         * used to fast check if a sprite is.. a sprite!
         * @member {boolean}
         */
        _this.isSprite = false;
        /**
         * Does any other displayObject use this object as a mask?
         * @member {boolean}
         */
        _this.isMask = false;
        return _this;
    }
    /**
     * Mixes all enumerable properties and methods from a source object to DisplayObject.
     *
     * @param {object} source - The source of properties and methods to mix in.
     */
    DisplayObject.mixin = function (source) {
        // in ES8/ES2017, this would be really easy:
        // Object.defineProperties(DisplayObject.prototype, Object.getOwnPropertyDescriptors(source));
        // get all the enumerable property keys
        var keys = Object.keys(source);
        // loop through properties
        for (var i = 0; i < keys.length; ++i) {
            var propertyName = keys[i];
            // Set the property using the property descriptor - this works for accessors and normal value properties
            Object.defineProperty(DisplayObject.prototype, propertyName, Object.getOwnPropertyDescriptor(source, propertyName));
        }
    };
    /**
     * Recursively updates transform of all objects from the root to this one
     * internal function for toLocal()
     */
    DisplayObject.prototype._recursivePostUpdateTransform = function () {
        if (this.parent) {
            this.parent._recursivePostUpdateTransform();
            this.transform.updateTransform(this.parent.transform);
        }
        else {
            this.transform.updateTransform(this._tempDisplayObjectParent.transform);
        }
    };
    /**
     * Updates the object transform for rendering.
     *
     * TODO - Optimization pass!
     */
    DisplayObject.prototype.updateTransform = function () {
        this._boundsID++;
        this.transform.updateTransform(this.parent.transform);
        // multiply the alphas..
        this.worldAlpha = this.alpha * this.parent.worldAlpha;
    };
    /**
     * Calculates and returns the (world) bounds of the display object as a [Rectangle]{@link PIXI.Rectangle}.
     *
     * This method is expensive on containers with a large subtree (like the stage). This is because the bounds
     * of a container depend on its children's bounds, which recursively causes all bounds in the subtree to
     * be recalculated. The upside, however, is that calling `getBounds` once on a container will indeed update
     * the bounds of all children (the whole subtree, in fact). This side effect should be exploited by using
     * `displayObject._bounds.getRectangle()` when traversing through all the bounds in a scene graph. Otherwise,
     * calling `getBounds` on each object in a subtree will cause the total cost to increase quadratically as
     * its height increases.
     *
     * * The transforms of all objects in a container's **subtree** and of all **ancestors** are updated.
     * * The world bounds of all display objects in a container's **subtree** will also be recalculated.
     *
     * The `_bounds` object stores the last calculation of the bounds. You can use to entirely skip bounds
     * calculation if needed.
     *
     * ```js
     * const lastCalculatedBounds = displayObject._bounds.getRectangle(optionalRect);
     * ```
     *
     * Do know that usage of `getLocalBounds` can corrupt the `_bounds` of children (the whole subtree, actually). This
     * is a known issue that has not been solved. See [getLocalBounds]{@link PIXI.DisplayObject#getLocalBounds} for more
     * details.
     *
     * `getBounds` should be called with `skipUpdate` equal to `true` in a render() call. This is because the transforms
     * are guaranteed to be update-to-date. In fact, recalculating inside a render() call may cause corruption in certain
     * cases.
     *
     * @param {boolean} [skipUpdate] - Setting to `true` will stop the transforms of the scene graph from
     *  being updated. This means the calculation returned MAY be out of date BUT will give you a
     *  nice performance boost.
     * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation.
     * @return {PIXI.Rectangle} The minimum axis-aligned rectangle in world space that fits around this object.
     */
    DisplayObject.prototype.getBounds = function (skipUpdate, rect) {
        if (!skipUpdate) {
            if (!this.parent) {
                this.parent = this._tempDisplayObjectParent;
                this.updateTransform();
                this.parent = null;
            }
            else {
                this._recursivePostUpdateTransform();
                this.updateTransform();
            }
        }
        if (this._bounds.updateID !== this._boundsID) {
            this.calculateBounds();
            this._bounds.updateID = this._boundsID;
        }
        if (!rect) {
            if (!this._boundsRect) {
                this._boundsRect = new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Rectangle"]();
            }
            rect = this._boundsRect;
        }
        return this._bounds.getRectangle(rect);
    };
    /**
     * Retrieves the local bounds of the displayObject as a rectangle object.
     *
     * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation.
     * @return {PIXI.Rectangle} The rectangular bounding area.
     */
    DisplayObject.prototype.getLocalBounds = function (rect) {
        if (!rect) {
            if (!this._localBoundsRect) {
                this._localBoundsRect = new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Rectangle"]();
            }
            rect = this._localBoundsRect;
        }
        if (!this._localBounds) {
            this._localBounds = new Bounds();
        }
        var transformRef = this.transform;
        var parentRef = this.parent;
        this.parent = null;
        this.transform = this._tempDisplayObjectParent.transform;
        var worldBounds = this._bounds;
        var worldBoundsID = this._boundsID;
        this._bounds = this._localBounds;
        var bounds = this.getBounds(false, rect);
        this.parent = parentRef;
        this.transform = transformRef;
        this._bounds = worldBounds;
        this._bounds.updateID += this._boundsID - worldBoundsID; // reflect side-effects
        return bounds;
    };
    /**
     * Calculates the global position of the display object.
     *
     * @param {PIXI.IPointData} position - The world origin to calculate from.
     * @param {PIXI.Point} [point] - A Point object in which to store the value, optional
     *  (otherwise will create a new Point).
     * @param {boolean} [skipUpdate=false] - Should we skip the update transform.
     * @return {PIXI.Point} A point object representing the position of this object.
     */
    DisplayObject.prototype.toGlobal = function (position, point, skipUpdate) {
        if (skipUpdate === void 0) { skipUpdate = false; }
        if (!skipUpdate) {
            this._recursivePostUpdateTransform();
            // this parent check is for just in case the item is a root object.
            // If it is we need to give it a temporary parent so that displayObjectUpdateTransform works correctly
            // this is mainly to avoid a parent check in the main loop. Every little helps for performance :)
            if (!this.parent) {
                this.parent = this._tempDisplayObjectParent;
                this.displayObjectUpdateTransform();
                this.parent = null;
            }
            else {
                this.displayObjectUpdateTransform();
            }
        }
        // don't need to update the lot
        return this.worldTransform.apply(position, point);
    };
    /**
     * Calculates the local position of the display object relative to another point.
     *
     * @param {PIXI.IPointData} position - The world origin to calculate from.
     * @param {PIXI.DisplayObject} [from] - The DisplayObject to calculate the global position from.
     * @param {PIXI.Point} [point] - A Point object in which to store the value, optional
     *  (otherwise will create a new Point).
     * @param {boolean} [skipUpdate=false] - Should we skip the update transform
     * @return {PIXI.Point} A point object representing the position of this object
     */
    DisplayObject.prototype.toLocal = function (position, from, point, skipUpdate) {
        if (from) {
            position = from.toGlobal(position, point, skipUpdate);
        }
        if (!skipUpdate) {
            this._recursivePostUpdateTransform();
            // this parent check is for just in case the item is a root object.
            // If it is we need to give it a temporary parent so that displayObjectUpdateTransform works correctly
            // this is mainly to avoid a parent check in the main loop. Every little helps for performance :)
            if (!this.parent) {
                this.parent = this._tempDisplayObjectParent;
                this.displayObjectUpdateTransform();
                this.parent = null;
            }
            else {
                this.displayObjectUpdateTransform();
            }
        }
        // simply apply the matrix..
        return this.worldTransform.applyInverse(position, point);
    };
    /**
     * Set the parent Container of this DisplayObject.
     *
     * @param {PIXI.Container} container - The Container to add this DisplayObject to.
     * @return {PIXI.Container} The Container that this DisplayObject was added to.
     */
    DisplayObject.prototype.setParent = function (container) {
        if (!container || !container.addChild) {
            throw new Error('setParent: Argument must be a Container');
        }
        container.addChild(this);
        return container;
    };
    /**
     * Convenience function to set the position, scale, skew and pivot at once.
     *
     * @param {number} [x=0] - The X position
     * @param {number} [y=0] - The Y position
     * @param {number} [scaleX=1] - The X scale value
     * @param {number} [scaleY=1] - The Y scale value
     * @param {number} [rotation=0] - The rotation
     * @param {number} [skewX=0] - The X skew value
     * @param {number} [skewY=0] - The Y skew value
     * @param {number} [pivotX=0] - The X pivot value
     * @param {number} [pivotY=0] - The Y pivot value
     * @return {PIXI.DisplayObject} The DisplayObject instance
     */
    DisplayObject.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, pivotX, pivotY) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (scaleX === void 0) { scaleX = 1; }
        if (scaleY === void 0) { scaleY = 1; }
        if (rotation === void 0) { rotation = 0; }
        if (skewX === void 0) { skewX = 0; }
        if (skewY === void 0) { skewY = 0; }
        if (pivotX === void 0) { pivotX = 0; }
        if (pivotY === void 0) { pivotY = 0; }
        this.position.x = x;
        this.position.y = y;
        this.scale.x = !scaleX ? 1 : scaleX;
        this.scale.y = !scaleY ? 1 : scaleY;
        this.rotation = rotation;
        this.skew.x = skewX;
        this.skew.y = skewY;
        this.pivot.x = pivotX;
        this.pivot.y = pivotY;
        return this;
    };
    /**
     * Base destroy method for generic display objects. This will automatically
     * remove the display object from its parent Container as well as remove
     * all current event listeners and internal references. Do not use a DisplayObject
     * after calling `destroy()`.
     *
     */
    DisplayObject.prototype.destroy = function (_options) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.removeAllListeners();
        this.transform = null;
        this.parent = null;
        this._bounds = null;
        this._mask = null;
        this.filters = null;
        this.filterArea = null;
        this.hitArea = null;
        this.interactive = false;
        this.interactiveChildren = false;
        this._destroyed = true;
    };
    Object.defineProperty(DisplayObject.prototype, "_tempDisplayObjectParent", {
        /**
         * @protected
         * @member {PIXI.Container}
         */
        get: function () {
            if (this.tempDisplayObjectParent === null) {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                this.tempDisplayObjectParent = new TemporaryDisplayObject();
            }
            return this.tempDisplayObjectParent;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Used in Renderer, cacheAsBitmap and other places where you call an `updateTransform` on root
     *
     * ```
     * const cacheParent = elem.enableTempParent();
     * elem.updateTransform();
     * elem.disableTempParent(cacheParent);
     * ```
     *
     * @returns {PIXI.DisplayObject} current parent
     */
    DisplayObject.prototype.enableTempParent = function () {
        var myParent = this.parent;
        this.parent = this._tempDisplayObjectParent;
        return myParent;
    };
    /**
     * Pair method for `enableTempParent`
     *
     * @param {PIXI.DisplayObject} cacheParent - Actual parent of element
     */
    DisplayObject.prototype.disableTempParent = function (cacheParent) {
        this.parent = cacheParent;
    };
    Object.defineProperty(DisplayObject.prototype, "x", {
        /**
         * The position of the displayObject on the x axis relative to the local coordinates of the parent.
         * An alias to position.x
         *
         * @member {number}
         */
        get: function () {
            return this.position.x;
        },
        set: function (value) {
            this.transform.position.x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "y", {
        /**
         * The position of the displayObject on the y axis relative to the local coordinates of the parent.
         * An alias to position.y
         *
         * @member {number}
         */
        get: function () {
            return this.position.y;
        },
        set: function (value) {
            this.transform.position.y = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "worldTransform", {
        /**
         * Current transform of the object based on world (parent) factors.
         *
         * @member {PIXI.Matrix}
         * @readonly
         */
        get: function () {
            return this.transform.worldTransform;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "localTransform", {
        /**
         * Current transform of the object based on local factors: position, scale, other stuff.
         *
         * @member {PIXI.Matrix}
         * @readonly
         */
        get: function () {
            return this.transform.localTransform;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "position", {
        /**
         * The coordinate of the object relative to the local coordinates of the parent.
         *
         * @since PixiJS 4
         * @member {PIXI.ObservablePoint}
         */
        get: function () {
            return this.transform.position;
        },
        set: function (value) {
            this.transform.position.copyFrom(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "scale", {
        /**
         * The scale factors of this object along the local coordinate axes.
         *
         * The default scale is (1, 1).
         *
         * @since PixiJS 4
         * @member {PIXI.ObservablePoint}
         */
        get: function () {
            return this.transform.scale;
        },
        set: function (value) {
            this.transform.scale.copyFrom(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "pivot", {
        /**
         * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
         * is the projection of `pivot` in the parent's local space.
         *
         * By default, the pivot is the origin (0, 0).
         *
         * @since PixiJS 4
         * @member {PIXI.ObservablePoint}
         */
        get: function () {
            return this.transform.pivot;
        },
        set: function (value) {
            this.transform.pivot.copyFrom(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "skew", {
        /**
         * The skew factor for the object in radians.
         *
         * @since PixiJS 4
         * @member {PIXI.ObservablePoint}
         */
        get: function () {
            return this.transform.skew;
        },
        set: function (value) {
            this.transform.skew.copyFrom(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotation", {
        /**
         * The rotation of the object in radians.
         * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
         *
         * @member {number}
         */
        get: function () {
            return this.transform.rotation;
        },
        set: function (value) {
            this.transform.rotation = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "angle", {
        /**
         * The angle of the object in degrees.
         * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
         *
         * @member {number}
         */
        get: function () {
            return this.transform.rotation * _pixi_math__WEBPACK_IMPORTED_MODULE_1__["RAD_TO_DEG"];
        },
        set: function (value) {
            this.transform.rotation = value * _pixi_math__WEBPACK_IMPORTED_MODULE_1__["DEG_TO_RAD"];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "zIndex", {
        /**
         * The zIndex of the displayObject.
         *
         * If a container has the sortableChildren property set to true, children will be automatically
         * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
         * and thus rendered on top of other display objects within the same container.
         *
         * @member {number}
         * @see PIXI.Container#sortableChildren
         */
        get: function () {
            return this._zIndex;
        },
        set: function (value) {
            this._zIndex = value;
            if (this.parent) {
                this.parent.sortDirty = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "worldVisible", {
        /**
         * Indicates if the object is globally visible.
         *
         * @member {boolean}
         * @readonly
         */
        get: function () {
            var item = this;
            do {
                if (!item.visible) {
                    return false;
                }
                item = item.parent;
            } while (item);
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "mask", {
        /**
         * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
         * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
         * {@link PIXI.Graphics} or a {@link PIXI.Sprite} object. This allows for much faster masking in canvas as it
         * utilities shape clipping. To remove a mask, set this property to `null`.
         *
         * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
         *
         * @example
         * const graphics = new PIXI.Graphics();
         * graphics.beginFill(0xFF3300);
         * graphics.drawRect(50, 250, 100, 100);
         * graphics.endFill();
         *
         * const sprite = new PIXI.Sprite(texture);
         * sprite.mask = graphics;
         *
         * @todo At the moment, PIXI.CanvasRenderer doesn't support PIXI.Sprite as mask.
         * @member {PIXI.Container|PIXI.MaskData|null}
         */
        get: function () {
            return this._mask;
        },
        set: function (value) {
            if (this._mask) {
                var maskObject = (this._mask.maskObject || this._mask);
                maskObject.renderable = true;
                maskObject.isMask = false;
            }
            this._mask = value;
            if (this._mask) {
                var maskObject = (this._mask.maskObject || this._mask);
                maskObject.renderable = false;
                maskObject.isMask = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    return DisplayObject;
}(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]));
var TemporaryDisplayObject = /** @class */ (function (_super) {
    __extends(TemporaryDisplayObject, _super);
    function TemporaryDisplayObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sortDirty = null;
        return _this;
    }
    return TemporaryDisplayObject;
}(DisplayObject));
/**
 * DisplayObject default updateTransform, does not update children of container.
 * Will crash if there's no parent element.
 *
 * @memberof PIXI.DisplayObject#
 * @method displayObjectUpdateTransform
 */
DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform;

function sortChildren(a, b) {
    if (a.zIndex === b.zIndex) {
        return a._lastSortedIndex - b._lastSortedIndex;
    }
    return a.zIndex - b.zIndex;
}
/**
 * Container is a general-purpose display object that holds children. It also adds built-in support for advanced
 * rendering features like masking and filtering.
 *
 * It is the base class of all display objects that act as a container for other objects, including Graphics
 * and Sprite.
 *
 * ```js
 * import { BlurFilter } from '@pixi/filter-blur';
 * import { Container } from '@pixi/display';
 * import { Graphics } from '@pixi/graphics';
 * import { Sprite } from '@pixi/sprite';
 *
 * let container = new Container();
 * let sprite = Sprite.from("https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png");
 *
 * sprite.width = 512;
 * sprite.height = 512;
 *
 * // Adds a sprite as a child to this container. As a result, the sprite will be rendered whenever the container
 * // is rendered.
 * container.addChild(sprite);
 *
 * // Blurs whatever is rendered by the container
 * container.filters = [new BlurFilter()];
 *
 * // Only the contents within a circle at the center should be rendered onto the screen.
 * container.mask = new Graphics()
 *  .beginFill(0xffffff)
 *  .drawCircle(sprite.width / 2, sprite.height / 2, Math.min(sprite.width, sprite.height) / 2)
 *  .endFill();
 * ```
 *
 * @class
 * @extends PIXI.DisplayObject
 * @memberof PIXI
 */
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super.call(this) || this;
        /**
         * The array of children of this container.
         *
         * @member {PIXI.DisplayObject[]}
         * @readonly
         */
        _this.children = [];
        /**
         * If set to true, the container will sort its children by zIndex value
         * when updateTransform() is called, or manually if sortChildren() is called.
         *
         * This actually changes the order of elements in the array, so should be treated
         * as a basic solution that is not performant compared to other solutions,
         * such as @link https://github.com/pixijs/pixi-display
         *
         * Also be aware of that this may not work nicely with the addChildAt() function,
         * as the zIndex sorting may cause the child to automatically sorted to another position.
         *
         * @see PIXI.settings.SORTABLE_CHILDREN
         *
         * @member {boolean}
         */
        _this.sortableChildren = _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].SORTABLE_CHILDREN;
        /**
         * Should children be sorted by zIndex at the next updateTransform call.
         *
         * Will get automatically set to true if a new child is added, or if a child's zIndex changes.
         *
         * @member {boolean}
         */
        _this.sortDirty = false;
        return _this;
        /**
         * Fired when a DisplayObject is added to this Container.
         *
         * @event PIXI.Container#childAdded
         * @param {PIXI.DisplayObject} child - The child added to the Container.
         * @param {PIXI.Container} container - The container that added the child.
         * @param {number} index - The children's index of the added child.
         */
        /**
         * Fired when a DisplayObject is removed from this Container.
         *
         * @event PIXI.DisplayObject#removedFrom
         * @param {PIXI.DisplayObject} child - The child removed from the Container.
         * @param {PIXI.Container} container - The container that removed removed the child.
         * @param {number} index - The former children's index of the removed child
         */
    }
    /**
     * Overridable method that can be used by Container subclasses whenever the children array is modified
     *
     * @protected
     */
    Container.prototype.onChildrenChange = function (_length) {
        /* empty */
    };
    /**
     * Adds one or more children to the container.
     *
     * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
     *
     * @param {...PIXI.DisplayObject} children - The DisplayObject(s) to add to the container
     * @return {PIXI.DisplayObject} The first child that was added.
     */
    Container.prototype.addChild = function () {
        var arguments$1 = arguments;

        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments$1[_i];
        }
        // if there is only one argument we can bypass looping through the them
        if (children.length > 1) {
            // loop through the array and add all children
            for (var i = 0; i < children.length; i++) {
                // eslint-disable-next-line prefer-rest-params
                this.addChild(children[i]);
            }
        }
        else {
            var child = children[0];
            // if the child has a parent then lets remove it as PixiJS objects can only exist in one place
            if (child.parent) {
                child.parent.removeChild(child);
            }
            child.parent = this;
            this.sortDirty = true;
            // ensure child transform will be recalculated
            child.transform._parentID = -1;
            this.children.push(child);
            // ensure bounds will be recalculated
            this._boundsID++;
            // TODO - lets either do all callbacks or all events.. not both!
            this.onChildrenChange(this.children.length - 1);
            this.emit('childAdded', child, this, this.children.length - 1);
            child.emit('added', this);
        }
        return children[0];
    };
    /**
     * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
     *
     * @param {PIXI.DisplayObject} child - The child to add
     * @param {number} index - The index to place the child in
     * @return {PIXI.DisplayObject} The child that was added.
     */
    Container.prototype.addChildAt = function (child, index) {
        if (index < 0 || index > this.children.length) {
            throw new Error(child + "addChildAt: The index " + index + " supplied is out of bounds " + this.children.length);
        }
        if (child.parent) {
            child.parent.removeChild(child);
        }
        child.parent = this;
        this.sortDirty = true;
        // ensure child transform will be recalculated
        child.transform._parentID = -1;
        this.children.splice(index, 0, child);
        // ensure bounds will be recalculated
        this._boundsID++;
        // TODO - lets either do all callbacks or all events.. not both!
        this.onChildrenChange(index);
        child.emit('added', this);
        this.emit('childAdded', child, this, index);
        return child;
    };
    /**
     * Swaps the position of 2 Display Objects within this container.
     *
     * @param {PIXI.DisplayObject} child - First display object to swap
     * @param {PIXI.DisplayObject} child2 - Second display object to swap
     */
    Container.prototype.swapChildren = function (child, child2) {
        if (child === child2) {
            return;
        }
        var index1 = this.getChildIndex(child);
        var index2 = this.getChildIndex(child2);
        this.children[index1] = child2;
        this.children[index2] = child;
        this.onChildrenChange(index1 < index2 ? index1 : index2);
    };
    /**
     * Returns the index position of a child DisplayObject instance
     *
     * @param {PIXI.DisplayObject} child - The DisplayObject instance to identify
     * @return {number} The index position of the child display object to identify
     */
    Container.prototype.getChildIndex = function (child) {
        var index = this.children.indexOf(child);
        if (index === -1) {
            throw new Error('The supplied DisplayObject must be a child of the caller');
        }
        return index;
    };
    /**
     * Changes the position of an existing child in the display object container
     *
     * @param {PIXI.DisplayObject} child - The child DisplayObject instance for which you want to change the index number
     * @param {number} index - The resulting index number for the child display object
     */
    Container.prototype.setChildIndex = function (child, index) {
        if (index < 0 || index >= this.children.length) {
            throw new Error("The index " + index + " supplied is out of bounds " + this.children.length);
        }
        var currentIndex = this.getChildIndex(child);
        Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["removeItems"])(this.children, currentIndex, 1); // remove from old position
        this.children.splice(index, 0, child); // add at new position
        this.onChildrenChange(index);
    };
    /**
     * Returns the child at the specified index
     *
     * @param {number} index - The index to get the child at
     * @return {PIXI.DisplayObject} The child at the given index, if any.
     */
    Container.prototype.getChildAt = function (index) {
        if (index < 0 || index >= this.children.length) {
            throw new Error("getChildAt: Index (" + index + ") does not exist.");
        }
        return this.children[index];
    };
    /**
     * Removes one or more children from the container.
     *
     * @param {...PIXI.DisplayObject} children - The DisplayObject(s) to remove
     * @return {PIXI.DisplayObject} The first child that was removed.
     */
    Container.prototype.removeChild = function () {
        var arguments$1 = arguments;

        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments$1[_i];
        }
        // if there is only one argument we can bypass looping through the them
        if (children.length > 1) {
            // loop through the arguments property and remove all children
            for (var i = 0; i < children.length; i++) {
                this.removeChild(children[i]);
            }
        }
        else {
            var child = children[0];
            var index = this.children.indexOf(child);
            if (index === -1)
                { return null; }
            child.parent = null;
            // ensure child transform will be recalculated
            child.transform._parentID = -1;
            Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["removeItems"])(this.children, index, 1);
            // ensure bounds will be recalculated
            this._boundsID++;
            // TODO - lets either do all callbacks or all events.. not both!
            this.onChildrenChange(index);
            child.emit('removed', this);
            this.emit('childRemoved', child, this, index);
        }
        return children[0];
    };
    /**
     * Removes a child from the specified index position.
     *
     * @param {number} index - The index to get the child from
     * @return {PIXI.DisplayObject} The child that was removed.
     */
    Container.prototype.removeChildAt = function (index) {
        var child = this.getChildAt(index);
        // ensure child transform will be recalculated..
        child.parent = null;
        child.transform._parentID = -1;
        Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["removeItems"])(this.children, index, 1);
        // ensure bounds will be recalculated
        this._boundsID++;
        // TODO - lets either do all callbacks or all events.. not both!
        this.onChildrenChange(index);
        child.emit('removed', this);
        this.emit('childRemoved', child, this, index);
        return child;
    };
    /**
     * Removes all children from this container that are within the begin and end indexes.
     *
     * @param {number} [beginIndex=0] - The beginning position.
     * @param {number} [endIndex=this.children.length] - The ending position. Default value is size of the container.
     * @returns {PIXI.DisplayObject[]} List of removed children
     */
    Container.prototype.removeChildren = function (beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = 0; }
        if (endIndex === void 0) { endIndex = this.children.length; }
        var begin = beginIndex;
        var end = endIndex;
        var range = end - begin;
        var removed;
        if (range > 0 && range <= end) {
            removed = this.children.splice(begin, range);
            for (var i = 0; i < removed.length; ++i) {
                removed[i].parent = null;
                if (removed[i].transform) {
                    removed[i].transform._parentID = -1;
                }
            }
            this._boundsID++;
            this.onChildrenChange(beginIndex);
            for (var i = 0; i < removed.length; ++i) {
                removed[i].emit('removed', this);
                this.emit('childRemoved', removed[i], this, i);
            }
            return removed;
        }
        else if (range === 0 && this.children.length === 0) {
            return [];
        }
        throw new RangeError('removeChildren: numeric values are outside the acceptable range.');
    };
    /**
     * Sorts children by zIndex. Previous order is maintained for 2 children with the same zIndex.
     */
    Container.prototype.sortChildren = function () {
        var sortRequired = false;
        for (var i = 0, j = this.children.length; i < j; ++i) {
            var child = this.children[i];
            child._lastSortedIndex = i;
            if (!sortRequired && child.zIndex !== 0) {
                sortRequired = true;
            }
        }
        if (sortRequired && this.children.length > 1) {
            this.children.sort(sortChildren);
        }
        this.sortDirty = false;
    };
    /**
     * Updates the transform on all children of this container for rendering
     */
    Container.prototype.updateTransform = function () {
        if (this.sortableChildren && this.sortDirty) {
            this.sortChildren();
        }
        this._boundsID++;
        this.transform.updateTransform(this.parent.transform);
        // TODO: check render flags, how to process stuff here
        this.worldAlpha = this.alpha * this.parent.worldAlpha;
        for (var i = 0, j = this.children.length; i < j; ++i) {
            var child = this.children[i];
            if (child.visible) {
                child.updateTransform();
            }
        }
    };
    /**
     * Recalculates the bounds of the container.
     *
     * This implementation will automatically fit the children's bounds into the calculation. Each child's bounds
     * is limited to its mask's bounds or filterArea, if any is applied.
     */
    Container.prototype.calculateBounds = function () {
        this._bounds.clear();
        this._calculateBounds();
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            if (!child.visible || !child.renderable) {
                continue;
            }
            child.calculateBounds();
            // TODO: filter+mask, need to mask both somehow
            if (child._mask) {
                var maskObject = (child._mask.maskObject || child._mask);
                maskObject.calculateBounds();
                this._bounds.addBoundsMask(child._bounds, maskObject._bounds);
            }
            else if (child.filterArea) {
                this._bounds.addBoundsArea(child._bounds, child.filterArea);
            }
            else {
                this._bounds.addBounds(child._bounds);
            }
        }
        this._bounds.updateID = this._boundsID;
    };
    /**
     * Retrieves the local bounds of the displayObject as a rectangle object.
     *
     * Calling `getLocalBounds` may invalidate the `_bounds` of the whole subtree below. If using it inside a render()
     * call, it is advised to call `getBounds()` immediately after to recalculate the world bounds of the subtree.
     *
     * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation.
     * @param {boolean} [skipChildrenUpdate=false] - Setting to `true` will stop re-calculation of children transforms,
     *  it was default behaviour of pixi 4.0-5.2 and caused many problems to users.
     * @return {PIXI.Rectangle} The rectangular bounding area.
     */
    Container.prototype.getLocalBounds = function (rect, skipChildrenUpdate) {
        if (skipChildrenUpdate === void 0) { skipChildrenUpdate = false; }
        var result = _super.prototype.getLocalBounds.call(this, rect);
        if (!skipChildrenUpdate) {
            for (var i = 0, j = this.children.length; i < j; ++i) {
                var child = this.children[i];
                if (child.visible) {
                    child.updateTransform();
                }
            }
        }
        return result;
    };
    /**
     * Recalculates the content bounds of this object. This should be overriden to
     * calculate the bounds of this specific object (not including children).
     *
     * @protected
     */
    Container.prototype._calculateBounds = function () {
        // FILL IN//
    };
    /**
     * Renders the object using the WebGL renderer.
     *
     * The [_render]{@link PIXI.Container#_render} method is be overriden for rendering the contents of the
     * container itself. This `render` method will invoke it, and also invoke the `render` methods of all
     * children afterward.
     *
     * If `renderable` or `visible` is false or if `worldAlpha` is not positive, this implementation will entirely
     * skip rendering. See {@link PIXI.DisplayObject} for choosing between `renderable` or `visible`. Generally,
     * setting alpha to zero is not recommended for purely skipping rendering.
     *
     * When your scene becomes large (especially when it is larger than can be viewed in a single screen), it is
     * advised to employ **culling** to automatically skip rendering objects outside of the current screen. The
     * [@pixi-essentials/cull]{@link https://www.npmjs.com/package/@pixi-essentials/cull} and
     * [pixi-cull]{@link https://www.npmjs.com/package/pixi-cull} packages do this out of the box.
     *
     * The [renderAdvanced]{@link PIXI.Container#renderAdvanced} method is internally used when when masking or
     * filtering is applied on a container. This does, however, break batching and can affect performance when
     * masking and filtering is applied extensively throughout the scene graph.
     *
     * @param {PIXI.Renderer} renderer - The renderer
     */
    Container.prototype.render = function (renderer) {
        // if the object is not visible or the alpha is 0 then no need to render this element
        if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
            return;
        }
        // do a quick check to see if this element has a mask or a filter.
        if (this._mask || (this.filters && this.filters.length)) {
            this.renderAdvanced(renderer);
        }
        else {
            this._render(renderer);
            // simple render children!
            for (var i = 0, j = this.children.length; i < j; ++i) {
                this.children[i].render(renderer);
            }
        }
    };
    /**
     * Render the object using the WebGL renderer and advanced features.
     *
     * @protected
     * @param {PIXI.Renderer} renderer - The renderer
     */
    Container.prototype.renderAdvanced = function (renderer) {
        renderer.batch.flush();
        var filters = this.filters;
        var mask = this._mask;
        // push filter first as we need to ensure the stencil buffer is correct for any masking
        if (filters) {
            if (!this._enabledFilters) {
                this._enabledFilters = [];
            }
            this._enabledFilters.length = 0;
            for (var i = 0; i < filters.length; i++) {
                if (filters[i].enabled) {
                    this._enabledFilters.push(filters[i]);
                }
            }
            if (this._enabledFilters.length) {
                renderer.filter.push(this, this._enabledFilters);
            }
        }
        if (mask) {
            renderer.mask.push(this, this._mask);
        }
        // add this object to the batch, only rendered if it has a texture.
        this._render(renderer);
        // now loop through the children and make sure they get rendered
        for (var i = 0, j = this.children.length; i < j; i++) {
            this.children[i].render(renderer);
        }
        renderer.batch.flush();
        if (mask) {
            renderer.mask.pop(this);
        }
        if (filters && this._enabledFilters && this._enabledFilters.length) {
            renderer.filter.pop();
        }
    };
    /**
     * To be overridden by the subclasses.
     *
     * @protected
     * @param {PIXI.Renderer} renderer - The renderer
     */
    Container.prototype._render = function (_renderer) {
        // this is where content itself gets rendered...
    };
    /**
     * Removes all internal references and listeners as well as removes children from the display list.
     * Do not use a Container after calling `destroy`.
     *
     * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
     *  have been set to that value
     * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
     *  method called as well. 'options' will be passed on to those calls.
     * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
     *  Should it destroy the texture of the child sprite
     * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
     *  Should it destroy the base texture of the child sprite
     */
    Container.prototype.destroy = function (options) {
        _super.prototype.destroy.call(this);
        this.sortDirty = false;
        var destroyChildren = typeof options === 'boolean' ? options : options && options.children;
        var oldChildren = this.removeChildren(0, this.children.length);
        if (destroyChildren) {
            for (var i = 0; i < oldChildren.length; ++i) {
                oldChildren[i].destroy(options);
            }
        }
    };
    Object.defineProperty(Container.prototype, "width", {
        /**
         * The width of the Container, setting this will actually modify the scale to achieve the value set
         *
         * @member {number}
         */
        get: function () {
            return this.scale.x * this.getLocalBounds().width;
        },
        set: function (value) {
            var width = this.getLocalBounds().width;
            if (width !== 0) {
                this.scale.x = value / width;
            }
            else {
                this.scale.x = 1;
            }
            this._width = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "height", {
        /**
         * The height of the Container, setting this will actually modify the scale to achieve the value set
         *
         * @member {number}
         */
        get: function () {
            return this.scale.y * this.getLocalBounds().height;
        },
        set: function (value) {
            var height = this.getLocalBounds().height;
            if (height !== 0) {
                this.scale.y = value / height;
            }
            else {
                this.scale.y = 1;
            }
            this._height = value;
        },
        enumerable: false,
        configurable: true
    });
    return Container;
}(DisplayObject));
/**
 * Container default updateTransform, does update children of container.
 * Will crash if there's no parent element.
 *
 * @memberof PIXI.Container#
 * @method containerUpdateTransform
 */
Container.prototype.containerUpdateTransform = Container.prototype.updateTransform;


//# sourceMappingURL=display.js.map


/***/ }),

/***/ "./node_modules/@pixi/graphics/dist/esm/graphics.js":
/*!**********************************************************!*\
  !*** ./node_modules/@pixi/graphics/dist/esm/graphics.js ***!
  \**********************************************************/
/*! exports provided: FillStyle, GRAPHICS_CURVES, Graphics, GraphicsData, GraphicsGeometry, LINE_CAP, LINE_JOIN, LineStyle, graphicsUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FillStyle", function() { return FillStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRAPHICS_CURVES", function() { return GRAPHICS_CURVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Graphics", function() { return Graphics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicsData", function() { return GraphicsData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicsGeometry", function() { return GraphicsGeometry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINE_CAP", function() { return LINE_CAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINE_JOIN", function() { return LINE_JOIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineStyle", function() { return LineStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphicsUtils", function() { return graphicsUtils; });
/* harmony import */ var _pixi_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pixi/core */ "./node_modules/@pixi/core/dist/esm/core.js");
/* harmony import */ var _pixi_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pixi/math */ "./node_modules/@pixi/math/dist/esm/math.js");
/* harmony import */ var _pixi_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pixi/utils */ "./node_modules/@pixi/utils/dist/esm/utils.js");
/* harmony import */ var _pixi_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pixi/constants */ "./node_modules/@pixi/constants/dist/esm/constants.js");
/* harmony import */ var _pixi_display__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pixi/display */ "./node_modules/@pixi/display/dist/esm/display.js");
/*!
 * @pixi/graphics - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:17:46 UTC
 *
 * @pixi/graphics is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */






/**
 * Supported line joints in `PIXI.LineStyle` for graphics.
 *
 * @see PIXI.Graphics#lineStyle
 * @see https://graphicdesign.stackexchange.com/questions/59018/what-is-a-bevel-join-of-two-lines-exactly-illustrator
 *
 * @name LINE_JOIN
 * @memberof PIXI
 * @static
 * @enum {string}
 * @property {string} MITER - 'miter': make a sharp corner where outer part of lines meet
 * @property {string} BEVEL - 'bevel': add a square butt at each end of line segment and fill the triangle at turn
 * @property {string} ROUND - 'round': add an arc at the joint
 */
var LINE_JOIN;
(function (LINE_JOIN) {
    LINE_JOIN["MITER"] = "miter";
    LINE_JOIN["BEVEL"] = "bevel";
    LINE_JOIN["ROUND"] = "round";
})(LINE_JOIN || (LINE_JOIN = {}));
/**
 * Support line caps in `PIXI.LineStyle` for graphics.
 *
 * @see PIXI.Graphics#lineStyle
 *
 * @name LINE_CAP
 * @memberof PIXI
 * @static
 * @enum {string}
 * @property {string} BUTT - 'butt': don't add any cap at line ends (leaves orthogonal edges)
 * @property {string} ROUND - 'round': add semicircle at ends
 * @property {string} SQUARE - 'square': add square at end (like `BUTT` except more length at end)
 */
var LINE_CAP;
(function (LINE_CAP) {
    LINE_CAP["BUTT"] = "butt";
    LINE_CAP["ROUND"] = "round";
    LINE_CAP["SQUARE"] = "square";
})(LINE_CAP || (LINE_CAP = {}));
/**
 * Graphics curves resolution settings. If `adaptive` flag is set to `true`,
 * the resolution is calculated based on the curve's length to ensure better visual quality.
 * Adaptive draw works with `bezierCurveTo` and `quadraticCurveTo`.
 *
 * @static
 * @constant
 * @memberof PIXI
 * @name GRAPHICS_CURVES
 * @type {object}
 * @property {boolean} adaptive=true - flag indicating if the resolution should be adaptive
 * @property {number} maxLength=10 - maximal length of a single segment of the curve (if adaptive = false, ignored)
 * @property {number} minSegments=8 - minimal number of segments in the curve (if adaptive = false, ignored)
 * @property {number} maxSegments=2048 - maximal number of segments in the curve (if adaptive = false, ignored)
 */
var GRAPHICS_CURVES = {
    adaptive: true,
    maxLength: 10,
    minSegments: 8,
    maxSegments: 2048,
    epsilon: 0.0001,
    _segmentsCount: function (length, defaultSegments) {
        if (defaultSegments === void 0) { defaultSegments = 20; }
        if (!this.adaptive || !length || isNaN(length)) {
            return defaultSegments;
        }
        var result = Math.ceil(length / this.maxLength);
        if (result < this.minSegments) {
            result = this.minSegments;
        }
        else if (result > this.maxSegments) {
            result = this.maxSegments;
        }
        return result;
    },
};

/**
 * Fill style object for Graphics.
 *
 * @class
 * @memberof PIXI
 */
var FillStyle = /** @class */ (function () {
    function FillStyle() {
        /**
         * The hex color value used when coloring the Graphics object.
         *
         * @member {number}
         * @default 0xFFFFFF
         */
        this.color = 0xFFFFFF;
        /**
         * The alpha value used when filling the Graphics object.
         *
         * @member {number}
         * @default 1
         */
        this.alpha = 1.0;
        /**
         * The texture to be used for the fill.
         *
         * @member {PIXI.Texture}
         * @default 0
         */
        this.texture = _pixi_core__WEBPACK_IMPORTED_MODULE_0__["Texture"].WHITE;
        /**
         * The transform applied to the texture.
         *
         * @member {PIXI.Matrix}
         * @default null
         */
        this.matrix = null;
        /**
         * If the current fill is visible.
         *
         * @member {boolean}
         * @default false
         */
        this.visible = false;
        this.reset();
    }
    /**
     * Clones the object
     *
     * @return {PIXI.FillStyle}
     */
    FillStyle.prototype.clone = function () {
        var obj = new FillStyle();
        obj.color = this.color;
        obj.alpha = this.alpha;
        obj.texture = this.texture;
        obj.matrix = this.matrix;
        obj.visible = this.visible;
        return obj;
    };
    /**
     * Reset
     */
    FillStyle.prototype.reset = function () {
        this.color = 0xFFFFFF;
        this.alpha = 1;
        this.texture = _pixi_core__WEBPACK_IMPORTED_MODULE_0__["Texture"].WHITE;
        this.matrix = null;
        this.visible = false;
    };
    /**
     * Destroy and don't use after this
     */
    FillStyle.prototype.destroy = function () {
        this.texture = null;
        this.matrix = null;
    };
    return FillStyle;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Builds a polygon to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the WebGL-specific information to create this shape
 * @param {object} webGLDataNativeLines - an object containing all the WebGL-specific information to create nativeLines
 */
var buildPoly = {
    build: function (graphicsData) {
        graphicsData.points = graphicsData.shape.points.slice();
    },
    triangulate: function (graphicsData, graphicsGeometry) {
        var points = graphicsData.points;
        var holes = graphicsData.holes;
        var verts = graphicsGeometry.points;
        var indices = graphicsGeometry.indices;
        if (points.length >= 6) {
            var holeArray = [];
            // Process holes..
            for (var i = 0; i < holes.length; i++) {
                var hole = holes[i];
                holeArray.push(points.length / 2);
                points = points.concat(hole.points);
            }
            // sort color
            var triangles = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["earcut"])(points, holeArray, 2);
            if (!triangles) {
                return;
            }
            var vertPos = verts.length / 2;
            for (var i = 0; i < triangles.length; i += 3) {
                indices.push(triangles[i] + vertPos);
                indices.push(triangles[i + 1] + vertPos);
                indices.push(triangles[i + 2] + vertPos);
            }
            for (var i = 0; i < points.length; i++) {
                verts.push(points[i]);
            }
        }
    },
};

// for type only
/**
 * Builds a circle to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object to draw
 * @param {object} webGLData - an object containing all the WebGL-specific information to create this shape
 * @param {object} webGLDataNativeLines - an object containing all the WebGL-specific information to create nativeLines
 */
var buildCircle = {
    build: function (graphicsData) {
        // need to convert points to a nice regular data
        var circleData = graphicsData.shape;
        var points = graphicsData.points;
        var x = circleData.x;
        var y = circleData.y;
        var width;
        var height;
        points.length = 0;
        // TODO - bit hacky??
        if (graphicsData.type === _pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].CIRC) {
            width = circleData.radius;
            height = circleData.radius;
        }
        else {
            var ellipseData = graphicsData.shape;
            width = ellipseData.width;
            height = ellipseData.height;
        }
        if (width === 0 || height === 0) {
            return;
        }
        var totalSegs = Math.floor(30 * Math.sqrt(circleData.radius))
            || Math.floor(15 * Math.sqrt(width + height));
        totalSegs /= 2.3;
        var seg = (Math.PI * 2) / totalSegs;
        for (var i = 0; i < totalSegs - 0.5; i++) {
            points.push(x + (Math.sin(-seg * i) * width), y + (Math.cos(-seg * i) * height));
        }
        points.push(points[0], points[1]);
    },
    triangulate: function (graphicsData, graphicsGeometry) {
        var points = graphicsData.points;
        var verts = graphicsGeometry.points;
        var indices = graphicsGeometry.indices;
        var vertPos = verts.length / 2;
        var center = vertPos;
        var circle = (graphicsData.shape);
        var matrix = graphicsData.matrix;
        var x = circle.x;
        var y = circle.y;
        // Push center (special point)
        verts.push(graphicsData.matrix ? (matrix.a * x) + (matrix.c * y) + matrix.tx : x, graphicsData.matrix ? (matrix.b * x) + (matrix.d * y) + matrix.ty : y);
        for (var i = 0; i < points.length; i += 2) {
            verts.push(points[i], points[i + 1]);
            // add some uvs
            indices.push(vertPos++, center, vertPos);
        }
    },
};

/**
 * Builds a rectangle to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the WebGL-specific information to create this shape
 * @param {object} webGLDataNativeLines - an object containing all the WebGL-specific information to create nativeLines
 */
var buildRectangle = {
    build: function (graphicsData) {
        // --- //
        // need to convert points to a nice regular data
        //
        var rectData = graphicsData.shape;
        var x = rectData.x;
        var y = rectData.y;
        var width = rectData.width;
        var height = rectData.height;
        var points = graphicsData.points;
        points.length = 0;
        points.push(x, y, x + width, y, x + width, y + height, x, y + height);
    },
    triangulate: function (graphicsData, graphicsGeometry) {
        var points = graphicsData.points;
        var verts = graphicsGeometry.points;
        var vertPos = verts.length / 2;
        verts.push(points[0], points[1], points[2], points[3], points[6], points[7], points[4], points[5]);
        graphicsGeometry.indices.push(vertPos, vertPos + 1, vertPos + 2, vertPos + 1, vertPos + 2, vertPos + 3);
    },
};

/**
 * Calculate a single point for a quadratic bezier curve.
 * Utility function used by quadraticBezierCurve.
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {number} n1 - first number
 * @param {number} n2 - second number
 * @param {number} perc - percentage
 * @return {number} the result
 *
 */
function getPt(n1, n2, perc) {
    var diff = n2 - n1;
    return n1 + (diff * perc);
}
/**
 * Calculate the points for a quadratic bezier curve. (helper function..)
 * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {number} fromX - Origin point x
 * @param {number} fromY - Origin point x
 * @param {number} cpX - Control point x
 * @param {number} cpY - Control point y
 * @param {number} toX - Destination point x
 * @param {number} toY - Destination point y
 * @param {number[]} [out=[]] - The output array to add points into. If not passed, a new array is created.
 * @return {number[]} an array of points
 */
function quadraticBezierCurve(fromX, fromY, cpX, cpY, toX, toY, out) {
    if (out === void 0) { out = []; }
    var n = 20;
    var points = out;
    var xa = 0;
    var ya = 0;
    var xb = 0;
    var yb = 0;
    var x = 0;
    var y = 0;
    for (var i = 0, j = 0; i <= n; ++i) {
        j = i / n;
        // The Green Line
        xa = getPt(fromX, cpX, j);
        ya = getPt(fromY, cpY, j);
        xb = getPt(cpX, toX, j);
        yb = getPt(cpY, toY, j);
        // The Black Dot
        x = getPt(xa, xb, j);
        y = getPt(ya, yb, j);
        points.push(x, y);
    }
    return points;
}
/**
 * Builds a rounded rectangle to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.WebGLGraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {object} webGLData - an object containing all the WebGL-specific information to create this shape
 * @param {object} webGLDataNativeLines - an object containing all the WebGL-specific information to create nativeLines
 */
var buildRoundedRectangle = {
    build: function (graphicsData) {
        var rrectData = graphicsData.shape;
        var points = graphicsData.points;
        var x = rrectData.x;
        var y = rrectData.y;
        var width = rrectData.width;
        var height = rrectData.height;
        // Don't allow negative radius or greater than half the smallest width
        var radius = Math.max(0, Math.min(rrectData.radius, Math.min(width, height) / 2));
        points.length = 0;
        // No radius, do a simple rectangle
        if (!radius) {
            points.push(x, y, x + width, y, x + width, y + height, x, y + height);
        }
        else {
            quadraticBezierCurve(x, y + radius, x, y, x + radius, y, points);
            quadraticBezierCurve(x + width - radius, y, x + width, y, x + width, y + radius, points);
            quadraticBezierCurve(x + width, y + height - radius, x + width, y + height, x + width - radius, y + height, points);
            quadraticBezierCurve(x + radius, y + height, x, y + height, x, y + height - radius, points);
        }
        // this tiny number deals with the issue that occurs when points overlap and earcut fails to triangulate the item.
        // TODO - fix this properly, this is not very elegant.. but it works for now.
    },
    triangulate: function (graphicsData, graphicsGeometry) {
        var points = graphicsData.points;
        var verts = graphicsGeometry.points;
        var indices = graphicsGeometry.indices;
        var vecPos = verts.length / 2;
        var triangles = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["earcut"])(points, null, 2);
        for (var i = 0, j = triangles.length; i < j; i += 3) {
            indices.push(triangles[i] + vecPos);
            //     indices.push(triangles[i] + vecPos);
            indices.push(triangles[i + 1] + vecPos);
            //   indices.push(triangles[i + 2] + vecPos);
            indices.push(triangles[i + 2] + vecPos);
        }
        for (var i = 0, j = points.length; i < j; i++) {
            verts.push(points[i], points[++i]);
        }
    },
};

/**
 * Buffers vertices to draw a square cap.
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {number} x - X-coord of end point
 * @param {number} y - Y-coord of end point
 * @param {number} nx - X-coord of line normal pointing inside
 * @param {number} ny - Y-coord of line normal pointing inside
 * @param {Array<number>} verts - vertex buffer
 * @returns {}
 */
function square(x, y, nx, ny, innerWeight, outerWeight, clockwise, /* rotation for square (true at left end, false at right end) */ verts) {
    var ix = x - (nx * innerWeight);
    var iy = y - (ny * innerWeight);
    var ox = x + (nx * outerWeight);
    var oy = y + (ny * outerWeight);
    /* Rotate nx,ny for extension vector */
    var exx;
    var eyy;
    if (clockwise) {
        exx = ny;
        eyy = -nx;
    }
    else {
        exx = -ny;
        eyy = nx;
    }
    /* [i|0]x,y extended at cap */
    var eix = ix + exx;
    var eiy = iy + eyy;
    var eox = ox + exx;
    var eoy = oy + eyy;
    /* Square itself must be inserted clockwise*/
    verts.push(eix, eiy);
    verts.push(eox, eoy);
    return 2;
}
/**
 * Buffers vertices to draw an arc at the line joint or cap.
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {number} cx - X-coord of center
 * @param {number} cy - Y-coord of center
 * @param {number} sx - X-coord of arc start
 * @param {number} sy - Y-coord of arc start
 * @param {number} ex - X-coord of arc end
 * @param {number} ey - Y-coord of arc end
 * @param {Array<number>} verts - buffer of vertices
 * @param {boolean} clockwise - orientation of vertices
 * @returns {number} - no. of vertices pushed
 */
function round(cx, cy, sx, sy, ex, ey, verts, clockwise) {
    var cx2p0x = sx - cx;
    var cy2p0y = sy - cy;
    var angle0 = Math.atan2(cx2p0x, cy2p0y);
    var angle1 = Math.atan2(ex - cx, ey - cy);
    if (clockwise && angle0 < angle1) {
        angle0 += Math.PI * 2;
    }
    else if (!clockwise && angle0 > angle1) {
        angle1 += Math.PI * 2;
    }
    var startAngle = angle0;
    var angleDiff = angle1 - angle0;
    var absAngleDiff = Math.abs(angleDiff);
    /* if (absAngleDiff >= PI_LBOUND && absAngleDiff <= PI_UBOUND)
    {
        const r1x = cx - nxtPx;
        const r1y = cy - nxtPy;

        if (r1x === 0)
        {
            if (r1y > 0)
            {
                angleDiff = -angleDiff;
            }
        }
        else if (r1x >= -GRAPHICS_CURVES.epsilon)
        {
            angleDiff = -angleDiff;
        }
    }*/
    var radius = Math.sqrt((cx2p0x * cx2p0x) + (cy2p0y * cy2p0y));
    var segCount = ((15 * absAngleDiff * Math.sqrt(radius) / Math.PI) >> 0) + 1;
    var angleInc = angleDiff / segCount;
    startAngle += angleInc;
    if (clockwise) {
        verts.push(cx, cy);
        verts.push(sx, sy);
        for (var i = 1, angle = startAngle; i < segCount; i++, angle += angleInc) {
            verts.push(cx, cy);
            verts.push(cx + ((Math.sin(angle) * radius)), cy + ((Math.cos(angle) * radius)));
        }
        verts.push(cx, cy);
        verts.push(ex, ey);
    }
    else {
        verts.push(sx, sy);
        verts.push(cx, cy);
        for (var i = 1, angle = startAngle; i < segCount; i++, angle += angleInc) {
            verts.push(cx + ((Math.sin(angle) * radius)), cy + ((Math.cos(angle) * radius)));
            verts.push(cx, cy);
        }
        verts.push(ex, ey);
        verts.push(cx, cy);
    }
    return segCount * 2;
}
/**
 * Builds a line to draw using the polygon method.
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.GraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {PIXI.GraphicsGeometry} graphicsGeometry - Geometry where to append output
 */
function buildNonNativeLine(graphicsData, graphicsGeometry) {
    var shape = graphicsData.shape;
    var points = graphicsData.points || shape.points.slice();
    var eps = graphicsGeometry.closePointEps;
    if (points.length === 0) {
        return;
    }
    // if the line width is an odd number add 0.5 to align to a whole pixel
    // commenting this out fixes #711 and #1620
    // if (graphicsData.lineWidth%2)
    // {
    //     for (i = 0; i < points.length; i++)
    //     {
    //         points[i] += 0.5;
    //     }
    // }
    var style = graphicsData.lineStyle;
    // get first and last point.. figure out the middle!
    var firstPoint = new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Point"](points[0], points[1]);
    var lastPoint = new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Point"](points[points.length - 2], points[points.length - 1]);
    var closedShape = shape.type !== _pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].POLY || shape.closeStroke;
    var closedPath = Math.abs(firstPoint.x - lastPoint.x) < eps
        && Math.abs(firstPoint.y - lastPoint.y) < eps;
    // if the first point is the last point - gonna have issues :)
    if (closedShape) {
        // need to clone as we are going to slightly modify the shape..
        points = points.slice();
        if (closedPath) {
            points.pop();
            points.pop();
            lastPoint.set(points[points.length - 2], points[points.length - 1]);
        }
        var midPointX = (firstPoint.x + lastPoint.x) * 0.5;
        var midPointY = (lastPoint.y + firstPoint.y) * 0.5;
        points.unshift(midPointX, midPointY);
        points.push(midPointX, midPointY);
    }
    var verts = graphicsGeometry.points;
    var length = points.length / 2;
    var indexCount = points.length;
    var indexStart = verts.length / 2;
    // Max. inner and outer width
    var width = style.width / 2;
    var widthSquared = width * width;
    var miterLimitSquared = style.miterLimit * style.miterLimit;
    /* Line segments of interest where (x1,y1) forms the corner. */
    var x0 = points[0];
    var y0 = points[1];
    var x1 = points[2];
    var y1 = points[3];
    var x2 = 0;
    var y2 = 0;
    /* perp[?](x|y) = the line normal with magnitude lineWidth. */
    var perpx = -(y0 - y1);
    var perpy = x0 - x1;
    var perp1x = 0;
    var perp1y = 0;
    var dist = Math.sqrt((perpx * perpx) + (perpy * perpy));
    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;
    var ratio = style.alignment; // 0.5;
    var innerWeight = (1 - ratio) * 2;
    var outerWeight = ratio * 2;
    if (!closedShape) {
        if (style.cap === LINE_CAP.ROUND) {
            indexCount += round(x0 - (perpx * (innerWeight - outerWeight) * 0.5), y0 - (perpy * (innerWeight - outerWeight) * 0.5), x0 - (perpx * innerWeight), y0 - (perpy * innerWeight), x0 + (perpx * outerWeight), y0 + (perpy * outerWeight), verts, true) + 2;
        }
        else if (style.cap === LINE_CAP.SQUARE) {
            indexCount += square(x0, y0, perpx, perpy, innerWeight, outerWeight, true, verts);
        }
    }
    // Push first point (below & above vertices)
    verts.push(x0 - (perpx * innerWeight), y0 - (perpy * innerWeight));
    verts.push(x0 + (perpx * outerWeight), y0 + (perpy * outerWeight));
    for (var i = 1; i < length - 1; ++i) {
        x0 = points[(i - 1) * 2];
        y0 = points[((i - 1) * 2) + 1];
        x1 = points[i * 2];
        y1 = points[(i * 2) + 1];
        x2 = points[(i + 1) * 2];
        y2 = points[((i + 1) * 2) + 1];
        perpx = -(y0 - y1);
        perpy = x0 - x1;
        dist = Math.sqrt((perpx * perpx) + (perpy * perpy));
        perpx /= dist;
        perpy /= dist;
        perpx *= width;
        perpy *= width;
        perp1x = -(y1 - y2);
        perp1y = x1 - x2;
        dist = Math.sqrt((perp1x * perp1x) + (perp1y * perp1y));
        perp1x /= dist;
        perp1y /= dist;
        perp1x *= width;
        perp1y *= width;
        /* d[x|y](0|1) = the component displacement between points p(0,1|1,2) */
        var dx0 = x1 - x0;
        var dy0 = y0 - y1;
        var dx1 = x1 - x2;
        var dy1 = y2 - y1;
        /* +ve if internal angle counterclockwise, -ve if internal angle clockwise. */
        var cross = (dy0 * dx1) - (dy1 * dx0);
        var clockwise = (cross < 0);
        /* Going nearly straight? */
        if (Math.abs(cross) < 0.1) {
            verts.push(x1 - (perpx * innerWeight), y1 - (perpy * innerWeight));
            verts.push(x1 + (perpx * outerWeight), y1 + (perpy * outerWeight));
            continue;
        }
        /* p[x|y] is the miter point. pdist is the distance between miter point and p1. */
        var c1 = ((-perpx + x0) * (-perpy + y1)) - ((-perpx + x1) * (-perpy + y0));
        var c2 = ((-perp1x + x2) * (-perp1y + y1)) - ((-perp1x + x1) * (-perp1y + y2));
        var px = ((dx0 * c2) - (dx1 * c1)) / cross;
        var py = ((dy1 * c1) - (dy0 * c2)) / cross;
        var pdist = ((px - x1) * (px - x1)) + ((py - y1) * (py - y1));
        /* Inner miter point */
        var imx = x1 + ((px - x1) * innerWeight);
        var imy = y1 + ((py - y1) * innerWeight);
        /* Outer miter point */
        var omx = x1 - ((px - x1) * outerWeight);
        var omy = y1 - ((py - y1) * outerWeight);
        /* Is the inside miter point too far away, creating a spike? */
        var smallerInsideSegmentSq = Math.min((dx0 * dx0) + (dy0 * dy0), (dx1 * dx1) + (dy1 * dy1));
        var insideWeight = clockwise ? innerWeight : outerWeight;
        var smallerInsideDiagonalSq = smallerInsideSegmentSq + (insideWeight * insideWeight * widthSquared);
        var insideMiterOk = pdist <= smallerInsideDiagonalSq;
        if (insideMiterOk) {
            if (style.join === LINE_JOIN.BEVEL || pdist / widthSquared > miterLimitSquared) {
                if (clockwise) /* rotating at inner angle */ {
                    verts.push(imx, imy); // inner miter point
                    verts.push(x1 + (perpx * outerWeight), y1 + (perpy * outerWeight)); // first segment's outer vertex
                    verts.push(imx, imy); // inner miter point
                    verts.push(x1 + (perp1x * outerWeight), y1 + (perp1y * outerWeight)); // second segment's outer vertex
                }
                else /* rotating at outer angle */ {
                    verts.push(x1 - (perpx * innerWeight), y1 - (perpy * innerWeight)); // first segment's inner vertex
                    verts.push(omx, omy); // outer miter point
                    verts.push(x1 - (perp1x * innerWeight), y1 - (perp1y * innerWeight)); // second segment's outer vertex
                    verts.push(omx, omy); // outer miter point
                }
                indexCount += 2;
            }
            else if (style.join === LINE_JOIN.ROUND) {
                if (clockwise) /* arc is outside */ {
                    verts.push(imx, imy);
                    verts.push(x1 + (perpx * outerWeight), y1 + (perpy * outerWeight));
                    indexCount += round(x1, y1, x1 + (perpx * outerWeight), y1 + (perpy * outerWeight), x1 + (perp1x * outerWeight), y1 + (perp1y * outerWeight), verts, true) + 4;
                    verts.push(imx, imy);
                    verts.push(x1 + (perp1x * outerWeight), y1 + (perp1y * outerWeight));
                }
                else /* arc is inside */ {
                    verts.push(x1 - (perpx * innerWeight), y1 - (perpy * innerWeight));
                    verts.push(omx, omy);
                    indexCount += round(x1, y1, x1 - (perpx * innerWeight), y1 - (perpy * innerWeight), x1 - (perp1x * innerWeight), y1 - (perp1y * innerWeight), verts, false) + 4;
                    verts.push(x1 - (perp1x * innerWeight), y1 - (perp1y * innerWeight));
                    verts.push(omx, omy);
                }
            }
            else {
                verts.push(imx, imy);
                verts.push(omx, omy);
            }
        }
        else // inside miter is NOT ok
         {
            verts.push(x1 - (perpx * innerWeight), y1 - (perpy * innerWeight)); // first segment's inner vertex
            verts.push(x1 + (perpx * outerWeight), y1 + (perpy * outerWeight)); // first segment's outer vertex
            if (style.join === LINE_JOIN.BEVEL || pdist / widthSquared > miterLimitSquared) ;
            else if (style.join === LINE_JOIN.ROUND) {
                if (clockwise) /* arc is outside */ {
                    indexCount += round(x1, y1, x1 + (perpx * outerWeight), y1 + (perpy * outerWeight), x1 + (perp1x * outerWeight), y1 + (perp1y * outerWeight), verts, true) + 2;
                }
                else /* arc is inside */ {
                    indexCount += round(x1, y1, x1 - (perpx * innerWeight), y1 - (perpy * innerWeight), x1 - (perp1x * innerWeight), y1 - (perp1y * innerWeight), verts, false) + 2;
                }
            }
            else {
                if (clockwise) {
                    verts.push(omx, omy); // inner miter point
                    verts.push(omx, omy); // inner miter point
                }
                else {
                    verts.push(imx, imy); // outer miter point
                    verts.push(imx, imy); // outer miter point
                }
                indexCount += 2;
            }
            verts.push(x1 - (perp1x * innerWeight), y1 - (perp1y * innerWeight)); // second segment's inner vertex
            verts.push(x1 + (perp1x * outerWeight), y1 + (perp1y * outerWeight)); // second segment's outer vertex
            indexCount += 2;
        }
    }
    x0 = points[(length - 2) * 2];
    y0 = points[((length - 2) * 2) + 1];
    x1 = points[(length - 1) * 2];
    y1 = points[((length - 1) * 2) + 1];
    perpx = -(y0 - y1);
    perpy = x0 - x1;
    dist = Math.sqrt((perpx * perpx) + (perpy * perpy));
    perpx /= dist;
    perpy /= dist;
    perpx *= width;
    perpy *= width;
    verts.push(x1 - (perpx * innerWeight), y1 - (perpy * innerWeight));
    verts.push(x1 + (perpx * outerWeight), y1 + (perpy * outerWeight));
    if (!closedShape) {
        if (style.cap === LINE_CAP.ROUND) {
            indexCount += round(x1 - (perpx * (innerWeight - outerWeight) * 0.5), y1 - (perpy * (innerWeight - outerWeight) * 0.5), x1 - (perpx * innerWeight), y1 - (perpy * innerWeight), x1 + (perpx * outerWeight), y1 + (perpy * outerWeight), verts, false) + 2;
        }
        else if (style.cap === LINE_CAP.SQUARE) {
            indexCount += square(x1, y1, perpx, perpy, innerWeight, outerWeight, false, verts);
        }
    }
    var indices = graphicsGeometry.indices;
    var eps2 = GRAPHICS_CURVES.epsilon * GRAPHICS_CURVES.epsilon;
    // indices.push(indexStart);
    for (var i = indexStart; i < indexCount + indexStart - 2; ++i) {
        x0 = verts[(i * 2)];
        y0 = verts[(i * 2) + 1];
        x1 = verts[(i + 1) * 2];
        y1 = verts[((i + 1) * 2) + 1];
        x2 = verts[(i + 2) * 2];
        y2 = verts[((i + 2) * 2) + 1];
        /* Skip zero area triangles */
        if (Math.abs((x0 * (y1 - y2)) + (x1 * (y2 - y0)) + (x2 * (y0 - y1))) < eps2) {
            continue;
        }
        indices.push(i, i + 1, i + 2);
    }
}
/**
 * Builds a line to draw using the gl.drawArrays(gl.LINES) method
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.GraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {PIXI.GraphicsGeometry} graphicsGeometry - Geometry where to append output
 */
function buildNativeLine(graphicsData, graphicsGeometry) {
    var i = 0;
    var shape = graphicsData.shape;
    var points = graphicsData.points || shape.points;
    var closedShape = shape.type !== _pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].POLY || shape.closeStroke;
    if (points.length === 0)
        { return; }
    var verts = graphicsGeometry.points;
    var indices = graphicsGeometry.indices;
    var length = points.length / 2;
    var startIndex = verts.length / 2;
    var currentIndex = startIndex;
    verts.push(points[0], points[1]);
    for (i = 1; i < length; i++) {
        verts.push(points[i * 2], points[(i * 2) + 1]);
        indices.push(currentIndex, currentIndex + 1);
        currentIndex++;
    }
    if (closedShape) {
        indices.push(currentIndex, startIndex);
    }
}
/**
 * Builds a line to draw
 *
 * Ignored from docs since it is not directly exposed.
 *
 * @ignore
 * @private
 * @param {PIXI.GraphicsData} graphicsData - The graphics object containing all the necessary properties
 * @param {PIXI.GraphicsGeometry} graphicsGeometry - Geometry where to append output
 */
function buildLine(graphicsData, graphicsGeometry) {
    if (graphicsData.lineStyle.native) {
        buildNativeLine(graphicsData, graphicsGeometry);
    }
    else {
        buildNonNativeLine(graphicsData, graphicsGeometry);
    }
}

/**
 * Utilities for arc curves
 * @class
 * @private
 */
var ArcUtils = /** @class */ (function () {
    function ArcUtils() {
    }
    /**
     * The arcTo() method creates an arc/curve between two tangents on the canvas.
     *
     * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
     *
     * @private
     * @param {number} x1 - The x-coordinate of the beginning of the arc
     * @param {number} y1 - The y-coordinate of the beginning of the arc
     * @param {number} x2 - The x-coordinate of the end of the arc
     * @param {number} y2 - The y-coordinate of the end of the arc
     * @param {number} radius - The radius of the arc
     * @return {object} If the arc length is valid, return center of circle, radius and other info otherwise `null`.
     */
    ArcUtils.curveTo = function (x1, y1, x2, y2, radius, points) {
        var fromX = points[points.length - 2];
        var fromY = points[points.length - 1];
        var a1 = fromY - y1;
        var b1 = fromX - x1;
        var a2 = y2 - y1;
        var b2 = x2 - x1;
        var mm = Math.abs((a1 * b2) - (b1 * a2));
        if (mm < 1.0e-8 || radius === 0) {
            if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
                points.push(x1, y1);
            }
            return null;
        }
        var dd = (a1 * a1) + (b1 * b1);
        var cc = (a2 * a2) + (b2 * b2);
        var tt = (a1 * a2) + (b1 * b2);
        var k1 = radius * Math.sqrt(dd) / mm;
        var k2 = radius * Math.sqrt(cc) / mm;
        var j1 = k1 * tt / dd;
        var j2 = k2 * tt / cc;
        var cx = (k1 * b2) + (k2 * b1);
        var cy = (k1 * a2) + (k2 * a1);
        var px = b1 * (k2 + j1);
        var py = a1 * (k2 + j1);
        var qx = b2 * (k1 + j2);
        var qy = a2 * (k1 + j2);
        var startAngle = Math.atan2(py - cy, px - cx);
        var endAngle = Math.atan2(qy - cy, qx - cx);
        return {
            cx: (cx + x1),
            cy: (cy + y1),
            radius: radius,
            startAngle: startAngle,
            endAngle: endAngle,
            anticlockwise: (b1 * a2 > b2 * a1),
        };
    };
    /* eslint-disable max-len */
    /**
     * The arc method creates an arc/curve (used to create circles, or parts of circles).
     *
     * @private
     * @param {number} startX - Start x location of arc
     * @param {number} startY - Start y location of arc
     * @param {number} cx - The x-coordinate of the center of the circle
     * @param {number} cy - The y-coordinate of the center of the circle
     * @param {number} radius - The radius of the circle
     * @param {number} startAngle - The starting angle, in radians (0 is at the 3 o'clock position
     *  of the arc's circle)
     * @param {number} endAngle - The ending angle, in radians
     * @param {boolean} anticlockwise - Specifies whether the drawing should be
     *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
     *  indicates counter-clockwise.
     * @param {number[]} points - Collection of points to add to
     */
    ArcUtils.arc = function (_startX, _startY, cx, cy, radius, startAngle, endAngle, _anticlockwise, points) {
        var sweep = endAngle - startAngle;
        var n = GRAPHICS_CURVES._segmentsCount(Math.abs(sweep) * radius, Math.ceil(Math.abs(sweep) / _pixi_math__WEBPACK_IMPORTED_MODULE_1__["PI_2"]) * 40);
        var theta = (sweep) / (n * 2);
        var theta2 = theta * 2;
        var cTheta = Math.cos(theta);
        var sTheta = Math.sin(theta);
        var segMinus = n - 1;
        var remainder = (segMinus % 1) / segMinus;
        for (var i = 0; i <= segMinus; ++i) {
            var real = i + (remainder * i);
            var angle = ((theta) + startAngle + (theta2 * real));
            var c = Math.cos(angle);
            var s = -Math.sin(angle);
            points.push((((cTheta * c) + (sTheta * s)) * radius) + cx, (((cTheta * -s) + (sTheta * c)) * radius) + cy);
        }
    };
    return ArcUtils;
}());

/**
 * Utilities for bezier curves
 * @class
 * @private
 */
var BezierUtils = /** @class */ (function () {
    function BezierUtils() {
    }
    /**
     * Calculate length of bezier curve.
     * Analytical solution is impossible, since it involves an integral that does not integrate in general.
     * Therefore numerical solution is used.
     *
     * @private
     * @param {number} fromX - Starting point x
     * @param {number} fromY - Starting point y
     * @param {number} cpX - Control point x
     * @param {number} cpY - Control point y
     * @param {number} cpX2 - Second Control point x
     * @param {number} cpY2 - Second Control point y
     * @param {number} toX - Destination point x
     * @param {number} toY - Destination point y
     * @return {number} Length of bezier curve
     */
    BezierUtils.curveLength = function (fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY) {
        var n = 10;
        var result = 0.0;
        var t = 0.0;
        var t2 = 0.0;
        var t3 = 0.0;
        var nt = 0.0;
        var nt2 = 0.0;
        var nt3 = 0.0;
        var x = 0.0;
        var y = 0.0;
        var dx = 0.0;
        var dy = 0.0;
        var prevX = fromX;
        var prevY = fromY;
        for (var i = 1; i <= n; ++i) {
            t = i / n;
            t2 = t * t;
            t3 = t2 * t;
            nt = (1.0 - t);
            nt2 = nt * nt;
            nt3 = nt2 * nt;
            x = (nt3 * fromX) + (3.0 * nt2 * t * cpX) + (3.0 * nt * t2 * cpX2) + (t3 * toX);
            y = (nt3 * fromY) + (3.0 * nt2 * t * cpY) + (3 * nt * t2 * cpY2) + (t3 * toY);
            dx = prevX - x;
            dy = prevY - y;
            prevX = x;
            prevY = y;
            result += Math.sqrt((dx * dx) + (dy * dy));
        }
        return result;
    };
    /**
     * Calculate the points for a bezier curve and then draws it.
     *
     * Ignored from docs since it is not directly exposed.
     *
     * @ignore
     * @param {number} cpX - Control point x
     * @param {number} cpY - Control point y
     * @param {number} cpX2 - Second Control point x
     * @param {number} cpY2 - Second Control point y
     * @param {number} toX - Destination point x
     * @param {number} toY - Destination point y
     * @param {number[]} points - Path array to push points into
     */
    BezierUtils.curveTo = function (cpX, cpY, cpX2, cpY2, toX, toY, points) {
        var fromX = points[points.length - 2];
        var fromY = points[points.length - 1];
        points.length -= 2;
        var n = GRAPHICS_CURVES._segmentsCount(BezierUtils.curveLength(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY));
        var dt = 0;
        var dt2 = 0;
        var dt3 = 0;
        var t2 = 0;
        var t3 = 0;
        points.push(fromX, fromY);
        for (var i = 1, j = 0; i <= n; ++i) {
            j = i / n;
            dt = (1 - j);
            dt2 = dt * dt;
            dt3 = dt2 * dt;
            t2 = j * j;
            t3 = t2 * j;
            points.push((dt3 * fromX) + (3 * dt2 * j * cpX) + (3 * dt * t2 * cpX2) + (t3 * toX), (dt3 * fromY) + (3 * dt2 * j * cpY) + (3 * dt * t2 * cpY2) + (t3 * toY));
        }
    };
    return BezierUtils;
}());

/**
 * Utilities for quadratic curves
 * @class
 * @private
 */
var QuadraticUtils = /** @class */ (function () {
    function QuadraticUtils() {
    }
    /**
     * Calculate length of quadratic curve
     * @see {@link http://www.malczak.linuxpl.com/blog/quadratic-bezier-curve-length/}
     * for the detailed explanation of math behind this.
     *
     * @private
     * @param {number} fromX - x-coordinate of curve start point
     * @param {number} fromY - y-coordinate of curve start point
     * @param {number} cpX - x-coordinate of curve control point
     * @param {number} cpY - y-coordinate of curve control point
     * @param {number} toX - x-coordinate of curve end point
     * @param {number} toY - y-coordinate of curve end point
     * @return {number} Length of quadratic curve
     */
    QuadraticUtils.curveLength = function (fromX, fromY, cpX, cpY, toX, toY) {
        var ax = fromX - (2.0 * cpX) + toX;
        var ay = fromY - (2.0 * cpY) + toY;
        var bx = (2.0 * cpX) - (2.0 * fromX);
        var by = (2.0 * cpY) - (2.0 * fromY);
        var a = 4.0 * ((ax * ax) + (ay * ay));
        var b = 4.0 * ((ax * bx) + (ay * by));
        var c = (bx * bx) + (by * by);
        var s = 2.0 * Math.sqrt(a + b + c);
        var a2 = Math.sqrt(a);
        var a32 = 2.0 * a * a2;
        var c2 = 2.0 * Math.sqrt(c);
        var ba = b / a2;
        return ((a32 * s)
            + (a2 * b * (s - c2))
            + (((4.0 * c * a) - (b * b))
                * Math.log(((2.0 * a2) + ba + s) / (ba + c2)))) / (4.0 * a32);
    };
    /**
     * Calculate the points for a quadratic bezier curve and then draws it.
     * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
     *
     * @private
     * @param {number} cpX - Control point x
     * @param {number} cpY - Control point y
     * @param {number} toX - Destination point x
     * @param {number} toY - Destination point y
     * @param {number[]} points - Points to add segments to.
     */
    QuadraticUtils.curveTo = function (cpX, cpY, toX, toY, points) {
        var fromX = points[points.length - 2];
        var fromY = points[points.length - 1];
        var n = GRAPHICS_CURVES._segmentsCount(QuadraticUtils.curveLength(fromX, fromY, cpX, cpY, toX, toY));
        var xa = 0;
        var ya = 0;
        for (var i = 1; i <= n; ++i) {
            var j = i / n;
            xa = fromX + ((cpX - fromX) * j);
            ya = fromY + ((cpY - fromY) * j);
            points.push(xa + (((cpX + ((toX - cpX) * j)) - xa) * j), ya + (((cpY + ((toY - cpY) * j)) - ya) * j));
        }
    };
    return QuadraticUtils;
}());

/**
 * A structure to hold interim batch objects for Graphics.
 * @class
 * @memberof PIXI.graphicsUtils
 */
var BatchPart = /** @class */ (function () {
    function BatchPart() {
        this.reset();
    }
    /**
     * Begin batch part
     *
     * @param {PIXI.FillStyle | PIXI.LineStyle} style
     * @param {number} startIndex
     * @param {number} attribStart
     */
    BatchPart.prototype.begin = function (style, startIndex, attribStart) {
        this.reset();
        this.style = style;
        this.start = startIndex;
        this.attribStart = attribStart;
    };
    /**
     * End batch part
     *
     * @param {number} endIndex
     * @param {number} endAttrib
     */
    BatchPart.prototype.end = function (endIndex, endAttrib) {
        this.attribSize = endAttrib - this.attribStart;
        this.size = endIndex - this.start;
    };
    BatchPart.prototype.reset = function () {
        this.style = null;
        this.size = 0;
        this.start = 0;
        this.attribStart = 0;
        this.attribSize = 0;
    };
    return BatchPart;
}());

/**
 * Generalized convenience utilities for Graphics.
 *
 * @namespace graphicsUtils
 * @memberof PIXI
 */
var _a;
/**
 * Map of fill commands for each shape type.
 *
 * @memberof PIXI.graphicsUtils
 * @member {Object} FILL_COMMANDS
 */
var FILL_COMMANDS = (_a = {},
    _a[_pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].POLY] = buildPoly,
    _a[_pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].CIRC] = buildCircle,
    _a[_pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].ELIP] = buildCircle,
    _a[_pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].RECT] = buildRectangle,
    _a[_pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].RREC] = buildRoundedRectangle,
    _a);
/**
 * Batch pool, stores unused batches for preventing allocations.
 *
 * @memberof PIXI.graphicsUtils
 * @member {Array<PIXI.graphicsUtils.BatchPart>} BATCH_POOL
 */
var BATCH_POOL = [];
/**
 * Draw call pool, stores unused draw calls for preventing allocations.
 *
 * @memberof PIXI.graphicsUtils
 * @member {Array<PIXI.BatchDrawCall>} DRAW_CALL_POOL
 */
var DRAW_CALL_POOL = [];

/**
 * A class to contain data useful for Graphics objects
 *
 * @class
 * @memberof PIXI
 */
var GraphicsData = /** @class */ (function () {
    /**
     *
     * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
     * @param {PIXI.FillStyle} [fillStyle] - the width of the line to draw
     * @param {PIXI.LineStyle} [lineStyle] - the color of the line to draw
     * @param {PIXI.Matrix} [matrix] - Transform matrix
     */
    function GraphicsData(shape, fillStyle, lineStyle, matrix) {
        if (fillStyle === void 0) { fillStyle = null; }
        if (lineStyle === void 0) { lineStyle = null; }
        if (matrix === void 0) { matrix = null; }
        /**
         * The shape object to draw.
         * @member {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle}
         */
        this.shape = shape;
        /**
         * The style of the line.
         * @member {PIXI.LineStyle}
         */
        this.lineStyle = lineStyle;
        /**
         * The style of the fill.
         * @member {PIXI.FillStyle}
         */
        this.fillStyle = fillStyle;
        /**
         * The transform matrix.
         * @member {PIXI.Matrix}
         */
        this.matrix = matrix;
        /**
         * The type of the shape, see the Const.Shapes file for all the existing types,
         * @member {number}
         */
        this.type = shape.type;
        /**
         * The collection of points.
         * @member {number[]}
         */
        this.points = [];
        /**
         * The collection of holes.
         * @member {PIXI.GraphicsData[]}
         */
        this.holes = [];
    }
    /**
     * Creates a new GraphicsData object with the same values as this one.
     *
     * @return {PIXI.GraphicsData} Cloned GraphicsData object
     */
    GraphicsData.prototype.clone = function () {
        return new GraphicsData(this.shape, this.fillStyle, this.lineStyle, this.matrix);
    };
    /**
     * Destroys the Graphics data.
     *
     */
    GraphicsData.prototype.destroy = function () {
        this.shape = null;
        this.holes.length = 0;
        this.holes = null;
        this.points.length = 0;
        this.points = null;
        this.lineStyle = null;
        this.fillStyle = null;
    };
    return GraphicsData;
}());

var tmpPoint = new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Point"]();
var tmpBounds = new _pixi_display__WEBPACK_IMPORTED_MODULE_4__["Bounds"]();
/**
 * The Graphics class contains methods used to draw primitive shapes such as lines, circles and
 * rectangles to the display, and to color and fill them.
 *
 * GraphicsGeometry is designed to not be continually updating the geometry since it's expensive
 * to re-tesselate using **earcut**. Consider using {@link PIXI.Mesh} for this use-case, it's much faster.
 *
 * @class
 * @extends PIXI.BatchGeometry
 * @memberof PIXI
 */
var GraphicsGeometry = /** @class */ (function (_super) {
    __extends(GraphicsGeometry, _super);
    function GraphicsGeometry() {
        var _this = _super.call(this) || this;
        _this.uvsFloat32 = null;
        _this.indicesUint16 = null;
        /**
         * An array of points to draw, 2 numbers per point
         *
         * @member {number[]}
         * @protected
         */
        _this.points = [];
        /**
         * The collection of colors
         *
         * @member {number[]}
         * @protected
         */
        _this.colors = [];
        /**
         * The UVs collection
         *
         * @member {number[]}
         * @protected
         */
        _this.uvs = [];
        /**
         * The indices of the vertices
         *
         * @member {number[]}
         * @protected
         */
        _this.indices = [];
        /**
         * Reference to the texture IDs.
         *
         * @member {number[]}
         * @protected
         */
        _this.textureIds = [];
        /**
         * The collection of drawn shapes.
         *
         * @member {PIXI.GraphicsData[]}
         * @protected
         */
        _this.graphicsData = [];
        /**
         * Used to detect if the graphics object has changed.
         *
         * @member {number}
         * @protected
         */
        _this.dirty = 0;
        /**
         * Batches need to regenerated if the geometry is updated.
         *
         * @member {number}
         * @protected
         */
        _this.batchDirty = -1;
        /**
         * Used to check if the cache is dirty.
         *
         * @member {number}
         * @protected
         */
        _this.cacheDirty = -1;
        /**
         * Used to detect if we cleared the graphicsData.
         *
         * @member {number}
         * @default 0
         * @protected
         */
        _this.clearDirty = 0;
        /**
         * List of current draw calls drived from the batches.
         *
         * @member {object[]}
         * @protected
         */
        _this.drawCalls = [];
        /**
         * Intermediate abstract format sent to batch system.
         * Can be converted to drawCalls or to batchable objects.
         *
         * @member {PIXI.graphicsUtils.BatchPart[]}
         * @protected
         */
        _this.batches = [];
        /**
         * Index of the last batched shape in the stack of calls.
         *
         * @member {number}
         * @protected
         */
        _this.shapeIndex = 0;
        /**
         * Cached bounds.
         *
         * @member {PIXI.Bounds}
         * @protected
         */
        _this._bounds = new _pixi_display__WEBPACK_IMPORTED_MODULE_4__["Bounds"]();
        /**
         * The bounds dirty flag.
         *
         * @member {number}
         * @protected
         */
        _this.boundsDirty = -1;
        /**
         * Padding to add to the bounds.
         *
         * @member {number}
         * @default 0
         */
        _this.boundsPadding = 0;
        _this.batchable = false;
        _this.indicesUint16 = null;
        _this.uvsFloat32 = null;
        /**
         * Minimal distance between points that are considered different.
         * Affects line tesselation.
         *
         * @member {number}
         */
        _this.closePointEps = 1e-4;
        return _this;
    }
    Object.defineProperty(GraphicsGeometry.prototype, "bounds", {
        /**
         * Get the current bounds of the graphic geometry.
         *
         * @member {PIXI.Bounds}
         * @readonly
         */
        get: function () {
            if (this.boundsDirty !== this.dirty) {
                this.boundsDirty = this.dirty;
                this.calculateBounds();
            }
            return this._bounds;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Call if you changed graphicsData manually.
     * Empties all batch buffers.
     */
    GraphicsGeometry.prototype.invalidate = function () {
        this.boundsDirty = -1;
        this.dirty++;
        this.batchDirty++;
        this.shapeIndex = 0;
        this.points.length = 0;
        this.colors.length = 0;
        this.uvs.length = 0;
        this.indices.length = 0;
        this.textureIds.length = 0;
        for (var i = 0; i < this.drawCalls.length; i++) {
            this.drawCalls[i].texArray.clear();
            DRAW_CALL_POOL.push(this.drawCalls[i]);
        }
        this.drawCalls.length = 0;
        for (var i = 0; i < this.batches.length; i++) {
            var batchPart = this.batches[i];
            batchPart.reset();
            BATCH_POOL.push(batchPart);
        }
        this.batches.length = 0;
    };
    /**
     * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
     *
     * @return {PIXI.GraphicsGeometry} This GraphicsGeometry object. Good for chaining method calls
     */
    GraphicsGeometry.prototype.clear = function () {
        if (this.graphicsData.length > 0) {
            this.invalidate();
            this.clearDirty++;
            this.graphicsData.length = 0;
        }
        return this;
    };
    /**
     * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
     *
     * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
     * @param {PIXI.FillStyle} fillStyle - Defines style of the fill.
     * @param {PIXI.LineStyle} lineStyle - Defines style of the lines.
     * @param {PIXI.Matrix} matrix - Transform applied to the points of the shape.
     * @return {PIXI.GraphicsGeometry} Returns geometry for chaining.
     */
    GraphicsGeometry.prototype.drawShape = function (shape, fillStyle, lineStyle, matrix) {
        if (fillStyle === void 0) { fillStyle = null; }
        if (lineStyle === void 0) { lineStyle = null; }
        if (matrix === void 0) { matrix = null; }
        var data = new GraphicsData(shape, fillStyle, lineStyle, matrix);
        this.graphicsData.push(data);
        this.dirty++;
        return this;
    };
    /**
     * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
     *
     * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
     * @param {PIXI.Matrix} matrix - Transform applied to the points of the shape.
     * @return {PIXI.GraphicsGeometry} Returns geometry for chaining.
     */
    GraphicsGeometry.prototype.drawHole = function (shape, matrix) {
        if (matrix === void 0) { matrix = null; }
        if (!this.graphicsData.length) {
            return null;
        }
        var data = new GraphicsData(shape, null, null, matrix);
        var lastShape = this.graphicsData[this.graphicsData.length - 1];
        data.lineStyle = lastShape.lineStyle;
        lastShape.holes.push(data);
        this.dirty++;
        return this;
    };
    /**
     * Destroys the GraphicsGeometry object.
     *
     */
    GraphicsGeometry.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        // destroy each of the GraphicsData objects
        for (var i = 0; i < this.graphicsData.length; ++i) {
            this.graphicsData[i].destroy();
        }
        this.points.length = 0;
        this.points = null;
        this.colors.length = 0;
        this.colors = null;
        this.uvs.length = 0;
        this.uvs = null;
        this.indices.length = 0;
        this.indices = null;
        this.indexBuffer.destroy();
        this.indexBuffer = null;
        this.graphicsData.length = 0;
        this.graphicsData = null;
        this.drawCalls.length = 0;
        this.drawCalls = null;
        this.batches.length = 0;
        this.batches = null;
        this._bounds = null;
    };
    /**
     * Check to see if a point is contained within this geometry.
     *
     * @param {PIXI.IPointData} point - Point to check if it's contained.
     * @return {Boolean} `true` if the point is contained within geometry.
     */
    GraphicsGeometry.prototype.containsPoint = function (point) {
        var graphicsData = this.graphicsData;
        for (var i = 0; i < graphicsData.length; ++i) {
            var data = graphicsData[i];
            if (!data.fillStyle.visible) {
                continue;
            }
            // only deal with fills..
            if (data.shape) {
                if (data.matrix) {
                    data.matrix.applyInverse(point, tmpPoint);
                }
                else {
                    tmpPoint.copyFrom(point);
                }
                if (data.shape.contains(tmpPoint.x, tmpPoint.y)) {
                    var hitHole = false;
                    if (data.holes) {
                        for (var i_1 = 0; i_1 < data.holes.length; i_1++) {
                            var hole = data.holes[i_1];
                            if (hole.shape.contains(tmpPoint.x, tmpPoint.y)) {
                                hitHole = true;
                                break;
                            }
                        }
                    }
                    if (!hitHole) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * Generates intermediate batch data. Either gets converted to drawCalls
     * or used to convert to batch objects directly by the Graphics object.
     *
     * @param {boolean} [allow32Indices] - Allow using 32-bit indices for preventing artifacts when more that 65535 vertices
     */
    GraphicsGeometry.prototype.updateBatches = function (allow32Indices) {
        if (!this.graphicsData.length) {
            this.batchable = true;
            return;
        }
        if (!this.validateBatching()) {
            return;
        }
        this.cacheDirty = this.dirty;
        var uvs = this.uvs;
        var graphicsData = this.graphicsData;
        var batchPart = null;
        var currentStyle = null;
        if (this.batches.length > 0) {
            batchPart = this.batches[this.batches.length - 1];
            currentStyle = batchPart.style;
        }
        for (var i = this.shapeIndex; i < graphicsData.length; i++) {
            this.shapeIndex++;
            var data = graphicsData[i];
            var fillStyle = data.fillStyle;
            var lineStyle = data.lineStyle;
            var command = FILL_COMMANDS[data.type];
            // build out the shapes points..
            command.build(data);
            if (data.matrix) {
                this.transformPoints(data.points, data.matrix);
            }
            for (var j = 0; j < 2; j++) {
                var style = (j === 0) ? fillStyle : lineStyle;
                if (!style.visible)
                    { continue; }
                var nextTexture = style.texture.baseTexture;
                var index_1 = this.indices.length;
                var attribIndex = this.points.length / 2;
                nextTexture.wrapMode = _pixi_constants__WEBPACK_IMPORTED_MODULE_3__["WRAP_MODES"].REPEAT;
                if (j === 0) {
                    this.processFill(data);
                }
                else {
                    this.processLine(data);
                }
                var size = (this.points.length / 2) - attribIndex;
                if (size === 0)
                    { continue; }
                // close batch if style is different
                if (batchPart && !this._compareStyles(currentStyle, style)) {
                    batchPart.end(index_1, attribIndex);
                    batchPart = null;
                }
                // spawn new batch if its first batch or previous was closed
                if (!batchPart) {
                    batchPart = BATCH_POOL.pop() || new BatchPart();
                    batchPart.begin(style, index_1, attribIndex);
                    this.batches.push(batchPart);
                    currentStyle = style;
                }
                this.addUvs(this.points, uvs, style.texture, attribIndex, size, style.matrix);
            }
        }
        var index = this.indices.length;
        var attrib = this.points.length / 2;
        if (batchPart) {
            batchPart.end(index, attrib);
        }
        if (this.batches.length === 0) {
            // there are no visible styles in GraphicsData
            // its possible that someone wants Graphics just for the bounds
            this.batchable = true;
            return;
        }
        // prevent allocation when length is same as buffer
        if (this.indicesUint16 && this.indices.length === this.indicesUint16.length) {
            this.indicesUint16.set(this.indices);
        }
        else {
            var need32 = attrib > 0xffff && allow32Indices;
            this.indicesUint16 = need32 ? new Uint32Array(this.indices) : new Uint16Array(this.indices);
        }
        // TODO make this a const..
        this.batchable = this.isBatchable();
        if (this.batchable) {
            this.packBatches();
        }
        else {
            this.buildDrawCalls();
        }
    };
    /**
     * Affinity check
     *
     * @param {PIXI.FillStyle | PIXI.LineStyle} styleA
     * @param {PIXI.FillStyle | PIXI.LineStyle} styleB
     */
    GraphicsGeometry.prototype._compareStyles = function (styleA, styleB) {
        if (!styleA || !styleB) {
            return false;
        }
        if (styleA.texture.baseTexture !== styleB.texture.baseTexture) {
            return false;
        }
        if (styleA.color + styleA.alpha !== styleB.color + styleB.alpha) {
            return false;
        }
        if (!!styleA.native !== !!styleB.native) {
            return false;
        }
        return true;
    };
    /**
     * Test geometry for batching process.
     *
     * @protected
     */
    GraphicsGeometry.prototype.validateBatching = function () {
        if (this.dirty === this.cacheDirty || !this.graphicsData.length) {
            return false;
        }
        for (var i = 0, l = this.graphicsData.length; i < l; i++) {
            var data = this.graphicsData[i];
            var fill = data.fillStyle;
            var line = data.lineStyle;
            if (fill && !fill.texture.baseTexture.valid)
                { return false; }
            if (line && !line.texture.baseTexture.valid)
                { return false; }
        }
        return true;
    };
    /**
     * Offset the indices so that it works with the batcher.
     *
     * @protected
     */
    GraphicsGeometry.prototype.packBatches = function () {
        this.batchDirty++;
        this.uvsFloat32 = new Float32Array(this.uvs);
        var batches = this.batches;
        for (var i = 0, l = batches.length; i < l; i++) {
            var batch = batches[i];
            for (var j = 0; j < batch.size; j++) {
                var index = batch.start + j;
                this.indicesUint16[index] = this.indicesUint16[index] - batch.attribStart;
            }
        }
    };
    /**
     * Checks to see if this graphics geometry can be batched.
     * Currently it needs to be small enough and not contain any native lines.
     *
     * @protected
     */
    GraphicsGeometry.prototype.isBatchable = function () {
        // prevent heavy mesh batching
        if (this.points.length > 0xffff * 2) {
            return false;
        }
        var batches = this.batches;
        for (var i = 0; i < batches.length; i++) {
            if (batches[i].style.native) {
                return false;
            }
        }
        return (this.points.length < GraphicsGeometry.BATCHABLE_SIZE * 2);
    };
    /**
     * Converts intermediate batches data to drawCalls.
     *
     * @protected
     */
    GraphicsGeometry.prototype.buildDrawCalls = function () {
        var TICK = ++_pixi_core__WEBPACK_IMPORTED_MODULE_0__["BaseTexture"]._globalBatch;
        for (var i = 0; i < this.drawCalls.length; i++) {
            this.drawCalls[i].texArray.clear();
            DRAW_CALL_POOL.push(this.drawCalls[i]);
        }
        this.drawCalls.length = 0;
        var colors = this.colors;
        var textureIds = this.textureIds;
        var currentGroup = DRAW_CALL_POOL.pop();
        if (!currentGroup) {
            currentGroup = new _pixi_core__WEBPACK_IMPORTED_MODULE_0__["BatchDrawCall"]();
            currentGroup.texArray = new _pixi_core__WEBPACK_IMPORTED_MODULE_0__["BatchTextureArray"]();
        }
        currentGroup.texArray.count = 0;
        currentGroup.start = 0;
        currentGroup.size = 0;
        currentGroup.type = _pixi_constants__WEBPACK_IMPORTED_MODULE_3__["DRAW_MODES"].TRIANGLES;
        var textureCount = 0;
        var currentTexture = null;
        var textureId = 0;
        var native = false;
        var drawMode = _pixi_constants__WEBPACK_IMPORTED_MODULE_3__["DRAW_MODES"].TRIANGLES;
        var index = 0;
        this.drawCalls.push(currentGroup);
        // TODO - this can be simplified
        for (var i = 0; i < this.batches.length; i++) {
            var data = this.batches[i];
            // TODO add some full on MAX_TEXTURE CODE..
            var MAX_TEXTURES = 8;
            // Forced cast for checking `native` without errors
            var style = data.style;
            var nextTexture = style.texture.baseTexture;
            if (native !== !!style.native) {
                native = !!style.native;
                drawMode = native ? _pixi_constants__WEBPACK_IMPORTED_MODULE_3__["DRAW_MODES"].LINES : _pixi_constants__WEBPACK_IMPORTED_MODULE_3__["DRAW_MODES"].TRIANGLES;
                // force the batch to break!
                currentTexture = null;
                textureCount = MAX_TEXTURES;
                TICK++;
            }
            if (currentTexture !== nextTexture) {
                currentTexture = nextTexture;
                if (nextTexture._batchEnabled !== TICK) {
                    if (textureCount === MAX_TEXTURES) {
                        TICK++;
                        textureCount = 0;
                        if (currentGroup.size > 0) {
                            currentGroup = DRAW_CALL_POOL.pop();
                            if (!currentGroup) {
                                currentGroup = new _pixi_core__WEBPACK_IMPORTED_MODULE_0__["BatchDrawCall"]();
                                currentGroup.texArray = new _pixi_core__WEBPACK_IMPORTED_MODULE_0__["BatchTextureArray"]();
                            }
                            this.drawCalls.push(currentGroup);
                        }
                        currentGroup.start = index;
                        currentGroup.size = 0;
                        currentGroup.texArray.count = 0;
                        currentGroup.type = drawMode;
                    }
                    // TODO add this to the render part..
                    // Hack! Because texture has protected `touched`
                    nextTexture.touched = 1; // touch;
                    nextTexture._batchEnabled = TICK;
                    nextTexture._batchLocation = textureCount;
                    nextTexture.wrapMode = 10497;
                    currentGroup.texArray.elements[currentGroup.texArray.count++] = nextTexture;
                    textureCount++;
                }
            }
            currentGroup.size += data.size;
            index += data.size;
            textureId = nextTexture._batchLocation;
            this.addColors(colors, style.color, style.alpha, data.attribSize);
            this.addTextureIds(textureIds, textureId, data.attribSize);
        }
        _pixi_core__WEBPACK_IMPORTED_MODULE_0__["BaseTexture"]._globalBatch = TICK;
        // upload..
        // merge for now!
        this.packAttributes();
    };
    /**
     * Packs attributes to single buffer.
     *
     * @protected
     */
    GraphicsGeometry.prototype.packAttributes = function () {
        var verts = this.points;
        var uvs = this.uvs;
        var colors = this.colors;
        var textureIds = this.textureIds;
        // verts are 2 positions.. so we * by 3 as there are 6 properties.. then 4 cos its bytes
        var glPoints = new ArrayBuffer(verts.length * 3 * 4);
        var f32 = new Float32Array(glPoints);
        var u32 = new Uint32Array(glPoints);
        var p = 0;
        for (var i = 0; i < verts.length / 2; i++) {
            f32[p++] = verts[i * 2];
            f32[p++] = verts[(i * 2) + 1];
            f32[p++] = uvs[i * 2];
            f32[p++] = uvs[(i * 2) + 1];
            u32[p++] = colors[i];
            f32[p++] = textureIds[i];
        }
        this._buffer.update(glPoints);
        this._indexBuffer.update(this.indicesUint16);
    };
    /**
     * Process fill part of Graphics.
     *
     * @param {PIXI.GraphicsData} data
     * @protected
     */
    GraphicsGeometry.prototype.processFill = function (data) {
        if (data.holes.length) {
            this.processHoles(data.holes);
            buildPoly.triangulate(data, this);
        }
        else {
            var command = FILL_COMMANDS[data.type];
            command.triangulate(data, this);
        }
    };
    /**
     * Process line part of Graphics.
     *
     * @param {PIXI.GraphicsData} data
     * @protected
     */
    GraphicsGeometry.prototype.processLine = function (data) {
        buildLine(data, this);
        for (var i = 0; i < data.holes.length; i++) {
            buildLine(data.holes[i], this);
        }
    };
    /**
     * Process the holes data.
     *
     * @param {PIXI.GraphicsData[]} holes - Holes to render
     * @protected
     */
    GraphicsGeometry.prototype.processHoles = function (holes) {
        for (var i = 0; i < holes.length; i++) {
            var hole = holes[i];
            var command = FILL_COMMANDS[hole.type];
            command.build(hole);
            if (hole.matrix) {
                this.transformPoints(hole.points, hole.matrix);
            }
        }
    };
    /**
     * Update the local bounds of the object. Expensive to use performance-wise.
     *
     * @protected
     */
    GraphicsGeometry.prototype.calculateBounds = function () {
        var bounds = this._bounds;
        var sequenceBounds = tmpBounds;
        var curMatrix = _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Matrix"].IDENTITY;
        this._bounds.clear();
        sequenceBounds.clear();
        for (var i = 0; i < this.graphicsData.length; i++) {
            var data = this.graphicsData[i];
            var shape = data.shape;
            var type = data.type;
            var lineStyle = data.lineStyle;
            var nextMatrix = data.matrix || _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Matrix"].IDENTITY;
            var lineWidth = 0.0;
            if (lineStyle && lineStyle.visible) {
                var alignment = lineStyle.alignment;
                lineWidth = lineStyle.width;
                if (type === _pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].POLY) {
                    lineWidth = lineWidth * (0.5 + Math.abs(0.5 - alignment));
                }
                else {
                    lineWidth = lineWidth * Math.max(0, alignment);
                }
            }
            if (curMatrix !== nextMatrix) {
                if (!sequenceBounds.isEmpty()) {
                    bounds.addBoundsMatrix(sequenceBounds, curMatrix);
                    sequenceBounds.clear();
                }
                curMatrix = nextMatrix;
            }
            if (type === _pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].RECT || type === _pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].RREC) {
                var rect = shape;
                sequenceBounds.addFramePad(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height, lineWidth, lineWidth);
            }
            else if (type === _pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].CIRC) {
                var circle = shape;
                sequenceBounds.addFramePad(circle.x, circle.y, circle.x, circle.y, circle.radius + lineWidth, circle.radius + lineWidth);
            }
            else if (type === _pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].ELIP) {
                var ellipse = shape;
                sequenceBounds.addFramePad(ellipse.x, ellipse.y, ellipse.x, ellipse.y, ellipse.width + lineWidth, ellipse.height + lineWidth);
            }
            else {
                var poly = shape;
                // adding directly to the bounds
                bounds.addVerticesMatrix(curMatrix, poly.points, 0, poly.points.length, lineWidth, lineWidth);
            }
        }
        if (!sequenceBounds.isEmpty()) {
            bounds.addBoundsMatrix(sequenceBounds, curMatrix);
        }
        bounds.pad(this.boundsPadding, this.boundsPadding);
    };
    /**
     * Transform points using matrix.
     *
     * @protected
     * @param {number[]} points - Points to transform
     * @param {PIXI.Matrix} matrix - Transform matrix
     */
    GraphicsGeometry.prototype.transformPoints = function (points, matrix) {
        for (var i = 0; i < points.length / 2; i++) {
            var x = points[(i * 2)];
            var y = points[(i * 2) + 1];
            points[(i * 2)] = (matrix.a * x) + (matrix.c * y) + matrix.tx;
            points[(i * 2) + 1] = (matrix.b * x) + (matrix.d * y) + matrix.ty;
        }
    };
    /**
     * Add colors.
     *
     * @protected
     * @param {number[]} colors - List of colors to add to
     * @param {number} color - Color to add
     * @param {number} alpha - Alpha to use
     * @param {number} size - Number of colors to add
     */
    GraphicsGeometry.prototype.addColors = function (colors, color, alpha, size) {
        // TODO use the premultiply bits Ivan added
        var rgb = (color >> 16) + (color & 0xff00) + ((color & 0xff) << 16);
        var rgba = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["premultiplyTint"])(rgb, alpha);
        while (size-- > 0) {
            colors.push(rgba);
        }
    };
    /**
     * Add texture id that the shader/fragment wants to use.
     *
     * @protected
     * @param {number[]} textureIds
     * @param {number} id
     * @param {number} size
     */
    GraphicsGeometry.prototype.addTextureIds = function (textureIds, id, size) {
        while (size-- > 0) {
            textureIds.push(id);
        }
    };
    /**
     * Generates the UVs for a shape.
     *
     * @protected
     * @param {number[]} verts - Vertices
     * @param {number[]} uvs - UVs
     * @param {PIXI.Texture} texture - Reference to Texture
     * @param {number} start - Index buffer start index.
     * @param {number} size - The size/length for index buffer.
     * @param {PIXI.Matrix} [matrix] - Optional transform for all points.
     */
    GraphicsGeometry.prototype.addUvs = function (verts, uvs, texture, start, size, matrix) {
        if (matrix === void 0) { matrix = null; }
        var index = 0;
        var uvsStart = uvs.length;
        var frame = texture.frame;
        while (index < size) {
            var x = verts[(start + index) * 2];
            var y = verts[((start + index) * 2) + 1];
            if (matrix) {
                var nx = (matrix.a * x) + (matrix.c * y) + matrix.tx;
                y = (matrix.b * x) + (matrix.d * y) + matrix.ty;
                x = nx;
            }
            index++;
            uvs.push(x / frame.width, y / frame.height);
        }
        var baseTexture = texture.baseTexture;
        if (frame.width < baseTexture.width
            || frame.height < baseTexture.height) {
            this.adjustUvs(uvs, texture, uvsStart, size);
        }
    };
    /**
     * Modify uvs array according to position of texture region
     * Does not work with rotated or trimmed textures
     *
     * @param {number[]} uvs - array
     * @param {PIXI.Texture} texture - region
     * @param {number} start - starting index for uvs
     * @param {number} size - how many points to adjust
     */
    GraphicsGeometry.prototype.adjustUvs = function (uvs, texture, start, size) {
        var baseTexture = texture.baseTexture;
        var eps = 1e-6;
        var finish = start + (size * 2);
        var frame = texture.frame;
        var scaleX = frame.width / baseTexture.width;
        var scaleY = frame.height / baseTexture.height;
        var offsetX = frame.x / frame.width;
        var offsetY = frame.y / frame.height;
        var minX = Math.floor(uvs[start] + eps);
        var minY = Math.floor(uvs[start + 1] + eps);
        for (var i = start + 2; i < finish; i += 2) {
            minX = Math.min(minX, Math.floor(uvs[i] + eps));
            minY = Math.min(minY, Math.floor(uvs[i + 1] + eps));
        }
        offsetX -= minX;
        offsetY -= minY;
        for (var i = start; i < finish; i += 2) {
            uvs[i] = (uvs[i] + offsetX) * scaleX;
            uvs[i + 1] = (uvs[i + 1] + offsetY) * scaleY;
        }
    };
    /**
     * The maximum number of points to consider an object "batchable",
     * able to be batched by the renderer's batch system.
     *
     * @memberof PIXI.GraphicsGeometry
     * @static
     * @member {number} BATCHABLE_SIZE
     * @default 100
     */
    GraphicsGeometry.BATCHABLE_SIZE = 100;
    return GraphicsGeometry;
}(_pixi_core__WEBPACK_IMPORTED_MODULE_0__["BatchGeometry"]));

/**
 * Represents the line style for Graphics.
 * @memberof PIXI
 * @class
 * @extends PIXI.FillStyle
 */
var LineStyle = /** @class */ (function (_super) {
    __extends(LineStyle, _super);
    function LineStyle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The width (thickness) of any lines drawn.
         *
         * @member {number}
         * @default 0
         */
        _this.width = 0;
        /**
         * The alignment of any lines drawn (0.5 = middle, 1 = outer, 0 = inner). WebGL only.
         *
         * @member {number}
         * @default 0.5
         */
        _this.alignment = 0.5;
        /**
         * If true the lines will be draw using LINES instead of TRIANGLE_STRIP
         *
         * @member {boolean}
         * @default false
         */
        _this.native = false;
        /**
         * Line cap style.
         *
         * @member {PIXI.LINE_CAP}
         * @default PIXI.LINE_CAP.BUTT
         */
        _this.cap = LINE_CAP.BUTT;
        /**
         * Line join style.
         *
         * @member {PIXI.LINE_JOIN}
         * @default PIXI.LINE_JOIN.MITER
         */
        _this.join = LINE_JOIN.MITER;
        /**
         * Miter limit.
         *
         * @member {number}
         * @default 10
         */
        _this.miterLimit = 10;
        return _this;
    }
    /**
     * Clones the object
     *
     * @return {PIXI.LineStyle}
     */
    LineStyle.prototype.clone = function () {
        var obj = new LineStyle();
        obj.color = this.color;
        obj.alpha = this.alpha;
        obj.texture = this.texture;
        obj.matrix = this.matrix;
        obj.visible = this.visible;
        obj.width = this.width;
        obj.alignment = this.alignment;
        obj.native = this.native;
        obj.cap = this.cap;
        obj.join = this.join;
        obj.miterLimit = this.miterLimit;
        return obj;
    };
    /**
     * Reset the line style to default.
     */
    LineStyle.prototype.reset = function () {
        _super.prototype.reset.call(this);
        // Override default line style color
        this.color = 0x0;
        this.alignment = 0.5;
        this.width = 0;
        this.native = false;
    };
    return LineStyle;
}(FillStyle));

var temp = new Float32Array(3);
// a default shaders map used by graphics..
var DEFAULT_SHADERS = {};
/**
 * The Graphics class is primarily used to render primitive shapes such as lines, circles and
 * rectangles to the display, and to color and fill them.  However, you can also use a Graphics
 * object to build a list of primitives to use as a mask, or as a complex hitArea.
 *
 * Please note that due to legacy naming conventions, the behavior of some functions in this class
 * can be confusing.  Each call to `drawRect()`, `drawPolygon()`, etc. actually stores that primitive
 * in the Geometry class's GraphicsGeometry object for later use in rendering or hit testing - the
 * functions do not directly draw anything to the screen.  Similarly, the `clear()` function doesn't
 * change the screen, it simply resets the list of primitives, which can be useful if you want to
 * rebuild the contents of an existing Graphics object.
 *
 * Once a GraphicsGeometry list is built, you can re-use it in other Geometry objects as
 * an optimization, by passing it into a new Geometry object's constructor.  Because of this
 * ability, it's important to call `destroy()` on Geometry objects once you are done with them, to
 * properly dereference each GraphicsGeometry and prevent memory leaks.
 *
 * @class
 * @extends PIXI.Container
 * @memberof PIXI
 */
var Graphics = /** @class */ (function (_super) {
    __extends(Graphics, _super);
    /**
     * @param {PIXI.GraphicsGeometry} [geometry=null] - Geometry to use, if omitted
     *        will create a new GraphicsGeometry instance.
     */
    function Graphics(geometry) {
        if (geometry === void 0) { geometry = null; }
        var _this = _super.call(this) || this;
        _this._geometry = geometry || new GraphicsGeometry();
        _this._geometry.refCount++;
        /**
         * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
         * Can be shared between multiple Graphics objects.
         *
         * @member {PIXI.Shader}
         */
        _this.shader = null;
        /**
         * Represents the WebGL state the Graphics required to render, excludes shader and geometry. E.g.,
         * blend mode, culling, depth testing, direction of rendering triangles, backface, etc.
         *
         * @member {PIXI.State}
         */
        _this.state = _pixi_core__WEBPACK_IMPORTED_MODULE_0__["State"].for2d();
        /**
         * Current fill style
         *
         * @member {PIXI.FillStyle}
         * @protected
         */
        _this._fillStyle = new FillStyle();
        /**
         * Current line style
         *
         * @member {PIXI.LineStyle}
         * @protected
         */
        _this._lineStyle = new LineStyle();
        /**
         * Current shape transform matrix.
         *
         * @member {PIXI.Matrix}
         * @protected
         */
        _this._matrix = null;
        /**
         * Current hole mode is enabled.
         *
         * @member {boolean}
         * @default false
         * @protected
         */
        _this._holeMode = false;
        /**
         * Current path
         *
         * @member {PIXI.Polygon}
         * @readonly
         */
        _this.currentPath = null;
        /**
         * When cacheAsBitmap is set to true the graphics object will be rendered as if it was a sprite.
         * This is useful if your graphics element does not change often, as it will speed up the rendering
         * of the object in exchange for taking up texture memory. It is also useful if you need the graphics
         * object to be anti-aliased, because it will be rendered using canvas. This is not recommended if
         * you are constantly redrawing the graphics element.
         *
         * @name cacheAsBitmap
         * @member {boolean}
         * @memberof PIXI.Graphics#
         * @default false
         */
        /**
         * A collections of batches! These can be drawn by the renderer batch system.
         *
         * @protected
         * @member {object[]}
         */
        _this.batches = [];
        /**
         * Update dirty for limiting calculating tints for batches.
         *
         * @protected
         * @member {number}
         * @default -1
         */
        _this.batchTint = -1;
        /**
         * Update dirty for limiting calculating batches.
         *
         * @protected
         * @member {number}
         * @default -1
         */
        _this.batchDirty = -1;
        /**
         * Copy of the object vertex data.
         *
         * @protected
         * @member {Float32Array}
         */
        _this.vertexData = null;
        /**
         * Renderer plugin for batching
         *
         * @member {string}
         * @default 'batch'
         */
        _this.pluginName = 'batch';
        _this._transformID = -1;
        // Set default
        _this.tint = 0xFFFFFF;
        _this.blendMode = _pixi_constants__WEBPACK_IMPORTED_MODULE_3__["BLEND_MODES"].NORMAL;
        return _this;
    }
    Object.defineProperty(Graphics.prototype, "geometry", {
        /**
         * Includes vertex positions, face indices, normals, colors, UVs, and
         * custom attributes within buffers, reducing the cost of passing all
         * this data to the GPU. Can be shared between multiple Mesh or Graphics objects.
         *
         * @member {PIXI.GraphicsGeometry}
         * @readonly
         */
        get: function () {
            return this._geometry;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates a new Graphics object with the same values as this one.
     * Note that only the geometry of the object is cloned, not its transform (position,scale,etc)
     *
     * @return {PIXI.Graphics} A clone of the graphics object
     */
    Graphics.prototype.clone = function () {
        this.finishPoly();
        return new Graphics(this._geometry);
    };
    Object.defineProperty(Graphics.prototype, "blendMode", {
        get: function () {
            return this.state.blendMode;
        },
        /**
         * The blend mode to be applied to the graphic shape. Apply a value of
         * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.  Note that, since each
         * primitive in the GraphicsGeometry list is rendered sequentially, modes
         * such as `PIXI.BLEND_MODES.ADD` and `PIXI.BLEND_MODES.MULTIPLY` will
         * be applied per-primitive.
         *
         * @member {number}
         * @default PIXI.BLEND_MODES.NORMAL;
         * @see PIXI.BLEND_MODES
         */
        set: function (value) {
            this.state.blendMode = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Graphics.prototype, "tint", {
        /**
         * The tint applied to each graphic shape. This is a hex value. A value of
         * 0xFFFFFF will remove any tint effect.
         *
         * @member {number}
         * @default 0xFFFFFF
         */
        get: function () {
            return this._tint;
        },
        set: function (value) {
            this._tint = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Graphics.prototype, "fill", {
        /**
         * The current fill style.
         *
         * @member {PIXI.FillStyle}
         * @readonly
         */
        get: function () {
            return this._fillStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Graphics.prototype, "line", {
        /**
         * The current line style.
         *
         * @member {PIXI.LineStyle}
         * @readonly
         */
        get: function () {
            return this._lineStyle;
        },
        enumerable: false,
        configurable: true
    });
    Graphics.prototype.lineStyle = function (options, color, alpha, alignment, native) {
        if (options === void 0) { options = null; }
        if (color === void 0) { color = 0x0; }
        if (alpha === void 0) { alpha = 1; }
        if (alignment === void 0) { alignment = 0.5; }
        if (native === void 0) { native = false; }
        // Support non-object params: (width, color, alpha, alignment, native)
        if (typeof options === 'number') {
            options = { width: options, color: color, alpha: alpha, alignment: alignment, native: native };
        }
        return this.lineTextureStyle(options);
    };
    /**
     * Like line style but support texture for line fill.
     *
     * @param {object} [options] - Collection of options for setting line style.
     * @param {number} [options.width=0] - width of the line to draw, will update the objects stored style
     * @param {PIXI.Texture} [options.texture=PIXI.Texture.WHITE] - Texture to use
     * @param {number} [options.color=0x0] - color of the line to draw, will update the objects stored style.
     *  Default 0xFFFFFF if texture present.
     * @param {number} [options.alpha=1] - alpha of the line to draw, will update the objects stored style
     * @param {PIXI.Matrix} [options.matrix=null] - Texture matrix to transform texture
     * @param {number} [options.alignment=0.5] - alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outer).
     *        WebGL only.
     * @param {boolean} [options.native=false] - If true the lines will be draw using LINES instead of TRIANGLE_STRIP
     * @param {PIXI.LINE_CAP}[options.cap=PIXI.LINE_CAP.BUTT] - line cap style
     * @param {PIXI.LINE_JOIN}[options.join=PIXI.LINE_JOIN.MITER] - line join style
     * @param {number}[options.miterLimit=10] - miter limit ratio
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.lineTextureStyle = function (options) {
        // Apply defaults
        options = Object.assign({
            width: 0,
            texture: _pixi_core__WEBPACK_IMPORTED_MODULE_0__["Texture"].WHITE,
            color: (options && options.texture) ? 0xFFFFFF : 0x0,
            alpha: 1,
            matrix: null,
            alignment: 0.5,
            native: false,
            cap: LINE_CAP.BUTT,
            join: LINE_JOIN.MITER,
            miterLimit: 10,
        }, options);
        if (this.currentPath) {
            this.startPoly();
        }
        var visible = options.width > 0 && options.alpha > 0;
        if (!visible) {
            this._lineStyle.reset();
        }
        else {
            if (options.matrix) {
                options.matrix = options.matrix.clone();
                options.matrix.invert();
            }
            Object.assign(this._lineStyle, { visible: visible }, options);
        }
        return this;
    };
    /**
     * Start a polygon object internally
     * @protected
     */
    Graphics.prototype.startPoly = function () {
        if (this.currentPath) {
            var points = this.currentPath.points;
            var len = this.currentPath.points.length;
            if (len > 2) {
                this.drawShape(this.currentPath);
                this.currentPath = new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Polygon"]();
                this.currentPath.closeStroke = false;
                this.currentPath.points.push(points[len - 2], points[len - 1]);
            }
        }
        else {
            this.currentPath = new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Polygon"]();
            this.currentPath.closeStroke = false;
        }
    };
    /**
     * Finish the polygon object.
     * @protected
     */
    Graphics.prototype.finishPoly = function () {
        if (this.currentPath) {
            if (this.currentPath.points.length > 2) {
                this.drawShape(this.currentPath);
                this.currentPath = null;
            }
            else {
                this.currentPath.points.length = 0;
            }
        }
    };
    /**
     * Moves the current drawing position to x, y.
     *
     * @param {number} x - the X coordinate to move to
     * @param {number} y - the Y coordinate to move to
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.moveTo = function (x, y) {
        this.startPoly();
        this.currentPath.points[0] = x;
        this.currentPath.points[1] = y;
        return this;
    };
    /**
     * Draws a line using the current line style from the current drawing position to (x, y);
     * The current drawing position is then set to (x, y).
     *
     * @param {number} x - the X coordinate to draw to
     * @param {number} y - the Y coordinate to draw to
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.lineTo = function (x, y) {
        if (!this.currentPath) {
            this.moveTo(0, 0);
        }
        // remove duplicates..
        var points = this.currentPath.points;
        var fromX = points[points.length - 2];
        var fromY = points[points.length - 1];
        if (fromX !== x || fromY !== y) {
            points.push(x, y);
        }
        return this;
    };
    /**
     * Initialize the curve
     *
     * @protected
     * @param {number} [x=0]
     * @param {number} [y=0]
     */
    Graphics.prototype._initCurve = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (this.currentPath) {
            if (this.currentPath.points.length === 0) {
                this.currentPath.points = [x, y];
            }
        }
        else {
            this.moveTo(x, y);
        }
    };
    /**
     * Calculate the points for a quadratic bezier curve and then draws it.
     * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
     *
     * @param {number} cpX - Control point x
     * @param {number} cpY - Control point y
     * @param {number} toX - Destination point x
     * @param {number} toY - Destination point y
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.quadraticCurveTo = function (cpX, cpY, toX, toY) {
        this._initCurve();
        var points = this.currentPath.points;
        if (points.length === 0) {
            this.moveTo(0, 0);
        }
        QuadraticUtils.curveTo(cpX, cpY, toX, toY, points);
        return this;
    };
    /**
     * Calculate the points for a bezier curve and then draws it.
     *
     * @param {number} cpX - Control point x
     * @param {number} cpY - Control point y
     * @param {number} cpX2 - Second Control point x
     * @param {number} cpY2 - Second Control point y
     * @param {number} toX - Destination point x
     * @param {number} toY - Destination point y
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.bezierCurveTo = function (cpX, cpY, cpX2, cpY2, toX, toY) {
        this._initCurve();
        BezierUtils.curveTo(cpX, cpY, cpX2, cpY2, toX, toY, this.currentPath.points);
        return this;
    };
    /**
     * The arcTo() method creates an arc/curve between two tangents on the canvas.
     *
     * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
     *
     * @param {number} x1 - The x-coordinate of the first tangent point of the arc
     * @param {number} y1 - The y-coordinate of the first tangent point of the arc
     * @param {number} x2 - The x-coordinate of the end of the arc
     * @param {number} y2 - The y-coordinate of the end of the arc
     * @param {number} radius - The radius of the arc
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.arcTo = function (x1, y1, x2, y2, radius) {
        this._initCurve(x1, y1);
        var points = this.currentPath.points;
        var result = ArcUtils.curveTo(x1, y1, x2, y2, radius, points);
        if (result) {
            var cx = result.cx, cy = result.cy, radius_1 = result.radius, startAngle = result.startAngle, endAngle = result.endAngle, anticlockwise = result.anticlockwise;
            this.arc(cx, cy, radius_1, startAngle, endAngle, anticlockwise);
        }
        return this;
    };
    /**
     * The arc method creates an arc/curve (used to create circles, or parts of circles).
     *
     * @param {number} cx - The x-coordinate of the center of the circle
     * @param {number} cy - The y-coordinate of the center of the circle
     * @param {number} radius - The radius of the circle
     * @param {number} startAngle - The starting angle, in radians (0 is at the 3 o'clock position
     *  of the arc's circle)
     * @param {number} endAngle - The ending angle, in radians
     * @param {boolean} [anticlockwise=false] - Specifies whether the drawing should be
     *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
     *  indicates counter-clockwise.
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.arc = function (cx, cy, radius, startAngle, endAngle, anticlockwise) {
        if (anticlockwise === void 0) { anticlockwise = false; }
        if (startAngle === endAngle) {
            return this;
        }
        if (!anticlockwise && endAngle <= startAngle) {
            endAngle += _pixi_math__WEBPACK_IMPORTED_MODULE_1__["PI_2"];
        }
        else if (anticlockwise && startAngle <= endAngle) {
            startAngle += _pixi_math__WEBPACK_IMPORTED_MODULE_1__["PI_2"];
        }
        var sweep = endAngle - startAngle;
        if (sweep === 0) {
            return this;
        }
        var startX = cx + (Math.cos(startAngle) * radius);
        var startY = cy + (Math.sin(startAngle) * radius);
        var eps = this._geometry.closePointEps;
        // If the currentPath exists, take its points. Otherwise call `moveTo` to start a path.
        var points = this.currentPath ? this.currentPath.points : null;
        if (points) {
            // TODO: make a better fix.
            // We check how far our start is from the last existing point
            var xDiff = Math.abs(points[points.length - 2] - startX);
            var yDiff = Math.abs(points[points.length - 1] - startY);
            if (xDiff < eps && yDiff < eps) ;
            else {
                points.push(startX, startY);
            }
        }
        else {
            this.moveTo(startX, startY);
            points = this.currentPath.points;
        }
        ArcUtils.arc(startX, startY, cx, cy, radius, startAngle, endAngle, anticlockwise, points);
        return this;
    };
    /**
     * Specifies a simple one-color fill that subsequent calls to other Graphics methods
     * (such as lineTo() or drawCircle()) use when drawing.
     *
     * @param {number} [color=0] - the color of the fill
     * @param {number} [alpha=1] - the alpha of the fill
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.beginFill = function (color, alpha) {
        if (color === void 0) { color = 0; }
        if (alpha === void 0) { alpha = 1; }
        return this.beginTextureFill({ texture: _pixi_core__WEBPACK_IMPORTED_MODULE_0__["Texture"].WHITE, color: color, alpha: alpha });
    };
    /**
     * Begin the texture fill
     *
     * @param {object} [options] - Object object.
     * @param {PIXI.Texture} [options.texture=PIXI.Texture.WHITE] - Texture to fill
     * @param {number} [options.color=0xffffff] - Background to fill behind texture
     * @param {number} [options.alpha=1] - Alpha of fill
     * @param {PIXI.Matrix} [options.matrix=null] - Transform matrix
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.beginTextureFill = function (options) {
        // Apply defaults
        options = Object.assign({
            texture: _pixi_core__WEBPACK_IMPORTED_MODULE_0__["Texture"].WHITE,
            color: 0xFFFFFF,
            alpha: 1,
            matrix: null,
        }, options);
        if (this.currentPath) {
            this.startPoly();
        }
        var visible = options.alpha > 0;
        if (!visible) {
            this._fillStyle.reset();
        }
        else {
            if (options.matrix) {
                options.matrix = options.matrix.clone();
                options.matrix.invert();
            }
            Object.assign(this._fillStyle, { visible: visible }, options);
        }
        return this;
    };
    /**
     * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
     *
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.endFill = function () {
        this.finishPoly();
        this._fillStyle.reset();
        return this;
    };
    /**
     * Draws a rectangle shape.
     *
     * @param {number} x - The X coord of the top-left of the rectangle
     * @param {number} y - The Y coord of the top-left of the rectangle
     * @param {number} width - The width of the rectangle
     * @param {number} height - The height of the rectangle
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.drawRect = function (x, y, width, height) {
        return this.drawShape(new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Rectangle"](x, y, width, height));
    };
    /**
     * Draw a rectangle shape with rounded/beveled corners.
     *
     * @param {number} x - The X coord of the top-left of the rectangle
     * @param {number} y - The Y coord of the top-left of the rectangle
     * @param {number} width - The width of the rectangle
     * @param {number} height - The height of the rectangle
     * @param {number} radius - Radius of the rectangle corners
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.drawRoundedRect = function (x, y, width, height, radius) {
        return this.drawShape(new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["RoundedRectangle"](x, y, width, height, radius));
    };
    /**
     * Draws a circle.
     *
     * @param {number} x - The X coordinate of the center of the circle
     * @param {number} y - The Y coordinate of the center of the circle
     * @param {number} radius - The radius of the circle
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.drawCircle = function (x, y, radius) {
        return this.drawShape(new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Circle"](x, y, radius));
    };
    /**
     * Draws an ellipse.
     *
     * @param {number} x - The X coordinate of the center of the ellipse
     * @param {number} y - The Y coordinate of the center of the ellipse
     * @param {number} width - The half width of the ellipse
     * @param {number} height - The half height of the ellipse
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.drawEllipse = function (x, y, width, height) {
        return this.drawShape(new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Ellipse"](x, y, width, height));
    };
    /**
     * Draws a polygon using the given path.
     *
     * @param {number[]|PIXI.Point[]|PIXI.Polygon} path - The path data used to construct the polygon.
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.drawPolygon = function () {
        var arguments$1 = arguments;

        var path = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            path[_i] = arguments$1[_i];
        }
        var points;
        var closeStroke = true; // !!this._fillStyle;
        var poly = path[0];
        // check if data has points..
        if (poly.points) {
            closeStroke = poly.closeStroke;
            points = poly.points;
        }
        else if (Array.isArray(path[0])) {
            points = path[0];
        }
        else {
            points = path;
        }
        var shape = new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Polygon"](points);
        shape.closeStroke = closeStroke;
        this.drawShape(shape);
        return this;
    };
    /**
     * Draw any shape.
     *
     * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - Shape to draw
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.drawShape = function (shape) {
        if (!this._holeMode) {
            this._geometry.drawShape(shape, this._fillStyle.clone(), this._lineStyle.clone(), this._matrix);
        }
        else {
            this._geometry.drawHole(shape, this._matrix);
        }
        return this;
    };
    /**
     * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
     *
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    Graphics.prototype.clear = function () {
        this._geometry.clear();
        this._lineStyle.reset();
        this._fillStyle.reset();
        this._boundsID++;
        this._matrix = null;
        this._holeMode = false;
        this.currentPath = null;
        return this;
    };
    /**
     * True if graphics consists of one rectangle, and thus, can be drawn like a Sprite and
     * masked with gl.scissor.
     *
     * @returns {boolean} True if only 1 rect.
     */
    Graphics.prototype.isFastRect = function () {
        var data = this._geometry.graphicsData;
        return data.length === 1
            && data[0].shape.type === _pixi_math__WEBPACK_IMPORTED_MODULE_1__["SHAPES"].RECT
            && !(data[0].lineStyle.visible && data[0].lineStyle.width);
    };
    /**
     * Renders the object using the WebGL renderer
     *
     * @protected
     * @param {PIXI.Renderer} renderer - The renderer
     */
    Graphics.prototype._render = function (renderer) {
        this.finishPoly();
        var geometry = this._geometry;
        var hasuint32 = renderer.context.supports.uint32Indices;
        // batch part..
        // batch it!
        geometry.updateBatches(hasuint32);
        if (geometry.batchable) {
            if (this.batchDirty !== geometry.batchDirty) {
                this._populateBatches();
            }
            this._renderBatched(renderer);
        }
        else {
            // no batching...
            renderer.batch.flush();
            this._renderDirect(renderer);
        }
    };
    /**
     * Populating batches for rendering
     *
     * @protected
     */
    Graphics.prototype._populateBatches = function () {
        var geometry = this._geometry;
        var blendMode = this.blendMode;
        var len = geometry.batches.length;
        this.batchTint = -1;
        this._transformID = -1;
        this.batchDirty = geometry.batchDirty;
        this.batches.length = len;
        this.vertexData = new Float32Array(geometry.points);
        for (var i = 0; i < len; i++) {
            var gI = geometry.batches[i];
            var color = gI.style.color;
            var vertexData = new Float32Array(this.vertexData.buffer, gI.attribStart * 4 * 2, gI.attribSize * 2);
            var uvs = new Float32Array(geometry.uvsFloat32.buffer, gI.attribStart * 4 * 2, gI.attribSize * 2);
            var indices = new Uint16Array(geometry.indicesUint16.buffer, gI.start * 2, gI.size);
            var batch = {
                vertexData: vertexData,
                blendMode: blendMode,
                indices: indices,
                uvs: uvs,
                _batchRGB: Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["hex2rgb"])(color),
                _tintRGB: color,
                _texture: gI.style.texture,
                alpha: gI.style.alpha,
                worldAlpha: 1
            };
            this.batches[i] = batch;
        }
    };
    /**
     * Renders the batches using the BathedRenderer plugin
     *
     * @protected
     * @param {PIXI.Renderer} renderer - The renderer
     */
    Graphics.prototype._renderBatched = function (renderer) {
        if (!this.batches.length) {
            return;
        }
        renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);
        this.calculateVertices();
        this.calculateTints();
        for (var i = 0, l = this.batches.length; i < l; i++) {
            var batch = this.batches[i];
            batch.worldAlpha = this.worldAlpha * batch.alpha;
            renderer.plugins[this.pluginName].render(batch);
        }
    };
    /**
     * Renders the graphics direct
     *
     * @protected
     * @param {PIXI.Renderer} renderer - The renderer
     */
    Graphics.prototype._renderDirect = function (renderer) {
        var shader = this._resolveDirectShader(renderer);
        var geometry = this._geometry;
        var tint = this.tint;
        var worldAlpha = this.worldAlpha;
        var uniforms = shader.uniforms;
        var drawCalls = geometry.drawCalls;
        // lets set the transfomr
        uniforms.translationMatrix = this.transform.worldTransform;
        // and then lets set the tint..
        uniforms.tint[0] = (((tint >> 16) & 0xFF) / 255) * worldAlpha;
        uniforms.tint[1] = (((tint >> 8) & 0xFF) / 255) * worldAlpha;
        uniforms.tint[2] = ((tint & 0xFF) / 255) * worldAlpha;
        uniforms.tint[3] = worldAlpha;
        // the first draw call, we can set the uniforms of the shader directly here.
        // this means that we can tack advantage of the sync function of pixi!
        // bind and sync uniforms..
        // there is a way to optimise this..
        renderer.shader.bind(shader);
        renderer.geometry.bind(geometry, shader);
        // set state..
        renderer.state.set(this.state);
        // then render the rest of them...
        for (var i = 0, l = drawCalls.length; i < l; i++) {
            this._renderDrawCallDirect(renderer, geometry.drawCalls[i]);
        }
    };
    /**
     * Renders specific DrawCall
     *
     * @param {PIXI.Renderer} renderer
     * @param {PIXI.BatchDrawCall} drawCall
     */
    Graphics.prototype._renderDrawCallDirect = function (renderer, drawCall) {
        var texArray = drawCall.texArray, type = drawCall.type, size = drawCall.size, start = drawCall.start;
        var groupTextureCount = texArray.count;
        for (var j = 0; j < groupTextureCount; j++) {
            renderer.texture.bind(texArray.elements[j], j);
        }
        renderer.geometry.draw(type, size, start);
    };
    /**
     * Resolves shader for direct rendering
     *
     * @protected
     * @param {PIXI.Renderer} renderer - The renderer
     */
    Graphics.prototype._resolveDirectShader = function (renderer) {
        var shader = this.shader;
        var pluginName = this.pluginName;
        if (!shader) {
            // if there is no shader here, we can use the default shader.
            // and that only gets created if we actually need it..
            // but may be more than one plugins for graphics
            if (!DEFAULT_SHADERS[pluginName]) {
                var MAX_TEXTURES = renderer.plugins.batch.MAX_TEXTURES;
                var sampleValues = new Int32Array(MAX_TEXTURES);
                for (var i = 0; i < MAX_TEXTURES; i++) {
                    sampleValues[i] = i;
                }
                var uniforms = {
                    tint: new Float32Array([1, 1, 1, 1]),
                    translationMatrix: new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Matrix"](),
                    default: _pixi_core__WEBPACK_IMPORTED_MODULE_0__["UniformGroup"].from({ uSamplers: sampleValues }, true),
                };
                var program = renderer.plugins[pluginName]._shader.program;
                DEFAULT_SHADERS[pluginName] = new _pixi_core__WEBPACK_IMPORTED_MODULE_0__["Shader"](program, uniforms);
            }
            shader = DEFAULT_SHADERS[pluginName];
        }
        return shader;
    };
    /**
     * Retrieves the bounds of the graphic shape as a rectangle object
     *
     * @protected
     */
    Graphics.prototype._calculateBounds = function () {
        this.finishPoly();
        var geometry = this._geometry;
        // skipping when graphics is empty, like a container
        if (!geometry.graphicsData.length) {
            return;
        }
        var _a = geometry.bounds, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
        this._bounds.addFrame(this.transform, minX, minY, maxX, maxY);
    };
    /**
     * Tests if a point is inside this graphics object
     *
     * @param {PIXI.IPointData} point - the point to test
     * @return {boolean} the result of the test
     */
    Graphics.prototype.containsPoint = function (point) {
        this.worldTransform.applyInverse(point, Graphics._TEMP_POINT);
        return this._geometry.containsPoint(Graphics._TEMP_POINT);
    };
    /**
     * Recalculate the tint by applying tint to batches using Graphics tint.
     * @protected
     */
    Graphics.prototype.calculateTints = function () {
        if (this.batchTint !== this.tint) {
            this.batchTint = this.tint;
            var tintRGB = Object(_pixi_utils__WEBPACK_IMPORTED_MODULE_2__["hex2rgb"])(this.tint, temp);
            for (var i = 0; i < this.batches.length; i++) {
                var batch = this.batches[i];
                var batchTint = batch._batchRGB;
                var r = (tintRGB[0] * batchTint[0]) * 255;
                var g = (tintRGB[1] * batchTint[1]) * 255;
                var b = (tintRGB[2] * batchTint[2]) * 255;
                // TODO Ivan, can this be done in one go?
                var color = (r << 16) + (g << 8) + (b | 0);
                batch._tintRGB = (color >> 16)
                    + (color & 0xff00)
                    + ((color & 0xff) << 16);
            }
        }
    };
    /**
     * If there's a transform update or a change to the shape of the
     * geometry, recalculate the vertices.
     * @protected
     */
    Graphics.prototype.calculateVertices = function () {
        var wtID = this.transform._worldID;
        if (this._transformID === wtID) {
            return;
        }
        this._transformID = wtID;
        var wt = this.transform.worldTransform;
        var a = wt.a;
        var b = wt.b;
        var c = wt.c;
        var d = wt.d;
        var tx = wt.tx;
        var ty = wt.ty;
        var data = this._geometry.points; // batch.vertexDataOriginal;
        var vertexData = this.vertexData;
        var count = 0;
        for (var i = 0; i < data.length; i += 2) {
            var x = data[i];
            var y = data[i + 1];
            vertexData[count++] = (a * x) + (c * y) + tx;
            vertexData[count++] = (d * y) + (b * x) + ty;
        }
    };
    /**
     * Closes the current path.
     *
     * @return {PIXI.Graphics} Returns itself.
     */
    Graphics.prototype.closePath = function () {
        var currentPath = this.currentPath;
        if (currentPath) {
            // we don't need to add extra point in the end because buildLine will take care of that
            currentPath.closeStroke = true;
        }
        return this;
    };
    /**
     * Apply a matrix to the positional data.
     *
     * @param {PIXI.Matrix} matrix - Matrix to use for transform current shape.
     * @return {PIXI.Graphics} Returns itself.
     */
    Graphics.prototype.setMatrix = function (matrix) {
        this._matrix = matrix;
        return this;
    };
    /**
     * Begin adding holes to the last draw shape
     * IMPORTANT: holes must be fully inside a shape to work
     * Also weirdness ensues if holes overlap!
     * Ellipses, Circles, Rectangles and Rounded Rectangles cannot be holes or host for holes in CanvasRenderer,
     * please use `moveTo` `lineTo`, `quadraticCurveTo` if you rely on pixi-legacy bundle.
     * @return {PIXI.Graphics} Returns itself.
     */
    Graphics.prototype.beginHole = function () {
        this.finishPoly();
        this._holeMode = true;
        return this;
    };
    /**
     * End adding holes to the last draw shape
     * @return {PIXI.Graphics} Returns itself.
     */
    Graphics.prototype.endHole = function () {
        this.finishPoly();
        this._holeMode = false;
        return this;
    };
    /**
     * Destroys the Graphics object.
     *
     * @param {object|boolean} [options] - Options parameter. A boolean will act as if all
     *  options have been set to that value
     * @param {boolean} [options.children=false] - if set to true, all the children will have
     *  their destroy method called as well. 'options' will be passed on to those calls.
     * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
     *  Should it destroy the texture of the child sprite
     * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
     *  Should it destroy the base texture of the child sprite
     */
    Graphics.prototype.destroy = function (options) {
        this._geometry.refCount--;
        if (this._geometry.refCount === 0) {
            this._geometry.dispose();
        }
        this._matrix = null;
        this.currentPath = null;
        this._lineStyle.destroy();
        this._lineStyle = null;
        this._fillStyle.destroy();
        this._fillStyle = null;
        this._geometry = null;
        this.shader = null;
        this.vertexData = null;
        this.batches.length = 0;
        this.batches = null;
        _super.prototype.destroy.call(this, options);
    };
    /**
     * Temporary point to use for containsPoint
     *
     * @static
     * @private
     * @member {PIXI.Point}
     */
    Graphics._TEMP_POINT = new _pixi_math__WEBPACK_IMPORTED_MODULE_1__["Point"]();
    return Graphics;
}(_pixi_display__WEBPACK_IMPORTED_MODULE_4__["Container"]));

var graphicsUtils = {
    buildPoly: buildPoly,
    buildCircle: buildCircle,
    buildRectangle: buildRectangle,
    buildRoundedRectangle: buildRoundedRectangle,
    buildLine: buildLine,
    ArcUtils: ArcUtils,
    BezierUtils: BezierUtils,
    QuadraticUtils: QuadraticUtils,
    BatchPart: BatchPart,
    FILL_COMMANDS: FILL_COMMANDS,
    BATCH_POOL: BATCH_POOL,
    DRAW_CALL_POOL: DRAW_CALL_POOL
};


//# sourceMappingURL=graphics.js.map


/***/ }),

/***/ "./node_modules/@pixi/math/dist/esm/math.js":
/*!**************************************************!*\
  !*** ./node_modules/@pixi/math/dist/esm/math.js ***!
  \**************************************************/
/*! exports provided: Circle, DEG_TO_RAD, Ellipse, Matrix, ObservablePoint, PI_2, Point, Polygon, RAD_TO_DEG, Rectangle, RoundedRectangle, SHAPES, Transform, groupD8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return Circle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEG_TO_RAD", function() { return DEG_TO_RAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ellipse", function() { return Ellipse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix", function() { return Matrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservablePoint", function() { return ObservablePoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PI_2", function() { return PI_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return Polygon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RAD_TO_DEG", function() { return RAD_TO_DEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return Rectangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoundedRectangle", function() { return RoundedRectangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHAPES", function() { return SHAPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return Transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupD8", function() { return groupD8; });
/*!
 * @pixi/math - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:17:46 UTC
 *
 * @pixi/math is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/**
 * Two Pi.
 *
 * @static
 * @member {number}
 * @memberof PIXI
 */
var PI_2 = Math.PI * 2;
/**
 * Conversion factor for converting radians to degrees.
 *
 * @static
 * @member {number} RAD_TO_DEG
 * @memberof PIXI
 */
var RAD_TO_DEG = 180 / Math.PI;
/**
 * Conversion factor for converting degrees to radians.
 *
 * @static
 * @member {number}
 * @memberof PIXI
 */
var DEG_TO_RAD = Math.PI / 180;
/**
 * Constants that identify shapes, mainly to prevent `instanceof` calls.
 *
 * @static
 * @memberof PIXI
 * @enum {number}
 * @property {number} POLY Polygon
 * @property {number} RECT Rectangle
 * @property {number} CIRC Circle
 * @property {number} ELIP Ellipse
 * @property {number} RREC Rounded Rectangle
 */
var SHAPES;
(function (SHAPES) {
    SHAPES[SHAPES["POLY"] = 0] = "POLY";
    SHAPES[SHAPES["RECT"] = 1] = "RECT";
    SHAPES[SHAPES["CIRC"] = 2] = "CIRC";
    SHAPES[SHAPES["ELIP"] = 3] = "ELIP";
    SHAPES[SHAPES["RREC"] = 4] = "RREC";
})(SHAPES || (SHAPES = {}));

/**
 * Size object, contains width and height
 *
 * @memberof PIXI
 * @typedef {object} ISize
 * @property {number} width - Width component
 * @property {number} height - Height component
 */
/**
 * Rectangle object is an area defined by its position, as indicated by its top-left corner
 * point (x, y) and by its width and its height.
 *
 * @class
 * @memberof PIXI
 */
var Rectangle = /** @class */ (function () {
    /**
     * @param {number} [x=0] - The X coordinate of the upper-left corner of the rectangle
     * @param {number} [y=0] - The Y coordinate of the upper-left corner of the rectangle
     * @param {number} [width=0] - The overall width of this rectangle
     * @param {number} [height=0] - The overall height of this rectangle
     */
    function Rectangle(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        /**
         * @member {number}
         * @default 0
         */
        this.x = Number(x);
        /**
         * @member {number}
         * @default 0
         */
        this.y = Number(y);
        /**
         * @member {number}
         * @default 0
         */
        this.width = Number(width);
        /**
         * @member {number}
         * @default 0
         */
        this.height = Number(height);
        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readOnly
         * @default PIXI.SHAPES.RECT
         * @see PIXI.SHAPES
         */
        this.type = SHAPES.RECT;
    }
    Object.defineProperty(Rectangle.prototype, "left", {
        /**
         * returns the left edge of the rectangle
         *
         * @member {number}
         */
        get: function () {
            return this.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "right", {
        /**
         * returns the right edge of the rectangle
         *
         * @member {number}
         */
        get: function () {
            return this.x + this.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "top", {
        /**
         * returns the top edge of the rectangle
         *
         * @member {number}
         */
        get: function () {
            return this.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "bottom", {
        /**
         * returns the bottom edge of the rectangle
         *
         * @member {number}
         */
        get: function () {
            return this.y + this.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle, "EMPTY", {
        /**
         * A constant empty rectangle.
         *
         * @static
         * @constant
         * @member {PIXI.Rectangle}
         * @return {PIXI.Rectangle} An empty rectangle
         */
        get: function () {
            return new Rectangle(0, 0, 0, 0);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates a clone of this Rectangle
     *
     * @return {PIXI.Rectangle} a copy of the rectangle
     */
    Rectangle.prototype.clone = function () {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };
    /**
     * Copies another rectangle to this one.
     *
     * @param {PIXI.Rectangle} rectangle - The rectangle to copy from.
     * @return {PIXI.Rectangle} Returns itself.
     */
    Rectangle.prototype.copyFrom = function (rectangle) {
        this.x = rectangle.x;
        this.y = rectangle.y;
        this.width = rectangle.width;
        this.height = rectangle.height;
        return this;
    };
    /**
     * Copies this rectangle to another one.
     *
     * @param {PIXI.Rectangle} rectangle - The rectangle to copy to.
     * @return {PIXI.Rectangle} Returns given parameter.
     */
    Rectangle.prototype.copyTo = function (rectangle) {
        rectangle.x = this.x;
        rectangle.y = this.y;
        rectangle.width = this.width;
        rectangle.height = this.height;
        return rectangle;
    };
    /**
     * Checks whether the x and y coordinates given are contained within this Rectangle
     *
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
     * @return {boolean} Whether the x/y coordinates are within this Rectangle
     */
    Rectangle.prototype.contains = function (x, y) {
        if (this.width <= 0 || this.height <= 0) {
            return false;
        }
        if (x >= this.x && x < this.x + this.width) {
            if (y >= this.y && y < this.y + this.height) {
                return true;
            }
        }
        return false;
    };
    /**
     * Pads the rectangle making it grow in all directions.
     * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
     *
     * @param {number} [paddingX=0] - The horizontal padding amount.
     * @param {number} [paddingY=0] - The vertical padding amount.
     * @return {PIXI.Rectangle} Returns itself.
     */
    Rectangle.prototype.pad = function (paddingX, paddingY) {
        if (paddingX === void 0) { paddingX = 0; }
        if (paddingY === void 0) { paddingY = paddingX; }
        this.x -= paddingX;
        this.y -= paddingY;
        this.width += paddingX * 2;
        this.height += paddingY * 2;
        return this;
    };
    /**
     * Fits this rectangle around the passed one.
     *
     * @param {PIXI.Rectangle} rectangle - The rectangle to fit.
     * @return {PIXI.Rectangle} Returns itself.
     */
    Rectangle.prototype.fit = function (rectangle) {
        var x1 = Math.max(this.x, rectangle.x);
        var x2 = Math.min(this.x + this.width, rectangle.x + rectangle.width);
        var y1 = Math.max(this.y, rectangle.y);
        var y2 = Math.min(this.y + this.height, rectangle.y + rectangle.height);
        this.x = x1;
        this.width = Math.max(x2 - x1, 0);
        this.y = y1;
        this.height = Math.max(y2 - y1, 0);
        return this;
    };
    /**
     * Enlarges rectangle that way its corners lie on grid
     *
     * @param {number} [resolution=1] - resolution
     * @param {number} [eps=0.001] - precision
     * @return {PIXI.Rectangle} Returns itself.
     */
    Rectangle.prototype.ceil = function (resolution, eps) {
        if (resolution === void 0) { resolution = 1; }
        if (eps === void 0) { eps = 0.001; }
        var x2 = Math.ceil((this.x + this.width - eps) * resolution) / resolution;
        var y2 = Math.ceil((this.y + this.height - eps) * resolution) / resolution;
        this.x = Math.floor((this.x + eps) * resolution) / resolution;
        this.y = Math.floor((this.y + eps) * resolution) / resolution;
        this.width = x2 - this.x;
        this.height = y2 - this.y;
        return this;
    };
    /**
     * Enlarges this rectangle to include the passed rectangle.
     *
     * @param {PIXI.Rectangle} rectangle - The rectangle to include.
     * @return {PIXI.Rectangle} Returns itself.
     */
    Rectangle.prototype.enlarge = function (rectangle) {
        var x1 = Math.min(this.x, rectangle.x);
        var x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
        var y1 = Math.min(this.y, rectangle.y);
        var y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);
        this.x = x1;
        this.width = x2 - x1;
        this.y = y1;
        this.height = y2 - y1;
        return this;
    };
    Rectangle.prototype.toString = function () {
        return "[@pixi/math:Rectangle x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
    };
    return Rectangle;
}());

/**
 * The Circle object is used to help draw graphics and can also be used to specify a hit area for displayObjects.
 *
 * @class
 * @memberof PIXI
 */
var Circle = /** @class */ (function () {
    /**
     * @param {number} [x=0] - The X coordinate of the center of this circle
     * @param {number} [y=0] - The Y coordinate of the center of this circle
     * @param {number} [radius=0] - The radius of the circle
     */
    function Circle(x, y, radius) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (radius === void 0) { radius = 0; }
        /**
         * @member {number}
         * @default 0
         */
        this.x = x;
        /**
         * @member {number}
         * @default 0
         */
        this.y = y;
        /**
         * @member {number}
         * @default 0
         */
        this.radius = radius;
        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readOnly
         * @default PIXI.SHAPES.CIRC
         * @see PIXI.SHAPES
         */
        this.type = SHAPES.CIRC;
    }
    /**
     * Creates a clone of this Circle instance
     *
     * @return {PIXI.Circle} a copy of the Circle
     */
    Circle.prototype.clone = function () {
        return new Circle(this.x, this.y, this.radius);
    };
    /**
     * Checks whether the x and y coordinates given are contained within this circle
     *
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
     * @return {boolean} Whether the x/y coordinates are within this Circle
     */
    Circle.prototype.contains = function (x, y) {
        if (this.radius <= 0) {
            return false;
        }
        var r2 = this.radius * this.radius;
        var dx = (this.x - x);
        var dy = (this.y - y);
        dx *= dx;
        dy *= dy;
        return (dx + dy <= r2);
    };
    /**
    * Returns the framing rectangle of the circle as a Rectangle object
    *
    * @return {PIXI.Rectangle} the framing rectangle
    */
    Circle.prototype.getBounds = function () {
        return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    };
    Circle.prototype.toString = function () {
        return "[@pixi/math:Circle x=" + this.x + " y=" + this.y + " radius=" + this.radius + "]";
    };
    return Circle;
}());

/**
 * The Ellipse object is used to help draw graphics and can also be used to specify a hit area for displayObjects.
 *
 * @class
 * @memberof PIXI
 */
var Ellipse = /** @class */ (function () {
    /**
     * @param {number} [x=0] - The X coordinate of the center of this ellipse
     * @param {number} [y=0] - The Y coordinate of the center of this ellipse
     * @param {number} [halfWidth=0] - The half width of this ellipse
     * @param {number} [halfHeight=0] - The half height of this ellipse
     */
    function Ellipse(x, y, halfWidth, halfHeight) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (halfWidth === void 0) { halfWidth = 0; }
        if (halfHeight === void 0) { halfHeight = 0; }
        /**
         * @member {number}
         * @default 0
         */
        this.x = x;
        /**
         * @member {number}
         * @default 0
         */
        this.y = y;
        /**
         * @member {number}
         * @default 0
         */
        this.width = halfWidth;
        /**
         * @member {number}
         * @default 0
         */
        this.height = halfHeight;
        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readOnly
         * @default PIXI.SHAPES.ELIP
         * @see PIXI.SHAPES
         */
        this.type = SHAPES.ELIP;
    }
    /**
     * Creates a clone of this Ellipse instance
     *
     * @return {PIXI.Ellipse} a copy of the ellipse
     */
    Ellipse.prototype.clone = function () {
        return new Ellipse(this.x, this.y, this.width, this.height);
    };
    /**
     * Checks whether the x and y coordinates given are contained within this ellipse
     *
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
     * @return {boolean} Whether the x/y coords are within this ellipse
     */
    Ellipse.prototype.contains = function (x, y) {
        if (this.width <= 0 || this.height <= 0) {
            return false;
        }
        // normalize the coords to an ellipse with center 0,0
        var normx = ((x - this.x) / this.width);
        var normy = ((y - this.y) / this.height);
        normx *= normx;
        normy *= normy;
        return (normx + normy <= 1);
    };
    /**
     * Returns the framing rectangle of the ellipse as a Rectangle object
     *
     * @return {PIXI.Rectangle} the framing rectangle
     */
    Ellipse.prototype.getBounds = function () {
        return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
    };
    Ellipse.prototype.toString = function () {
        return "[@pixi/math:Ellipse x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
    };
    return Ellipse;
}());

/**
 * A class to define a shape via user defined coordinates.
 *
 * @class
 * @memberof PIXI
 */
var Polygon = /** @class */ (function () {
    /**
     * @param {PIXI.IPoint[]|number[]} points - This can be an array of Points
     *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
     *  the arguments passed can be all the points of the polygon e.g.
     *  `new PIXI.Polygon(new PIXI.Point(), new PIXI.Point(), ...)`, or the arguments passed can be flat
     *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
     */
    function Polygon() {
        var arguments$1 = arguments;

        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments$1[_i];
        }
        var flat = Array.isArray(points[0]) ? points[0] : points;
        // if this is an array of points, convert it to a flat array of numbers
        if (typeof flat[0] !== 'number') {
            var p = [];
            for (var i = 0, il = flat.length; i < il; i++) {
                p.push(flat[i].x, flat[i].y);
            }
            flat = p;
        }
        /**
         * An array of the points of this polygon
         *
         * @member {number[]}
         */
        this.points = flat;
        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readOnly
         * @default PIXI.SHAPES.POLY
         * @see PIXI.SHAPES
         */
        this.type = SHAPES.POLY;
        /**
         * `false` after moveTo, `true` after `closePath`. In all other cases it is `true`.
         * @member {boolean}
         * @default true
         */
        this.closeStroke = true;
    }
    /**
     * Creates a clone of this polygon
     *
     * @return {PIXI.Polygon} a copy of the polygon
     */
    Polygon.prototype.clone = function () {
        var points = this.points.slice();
        var polygon = new Polygon(points);
        polygon.closeStroke = this.closeStroke;
        return polygon;
    };
    /**
     * Checks whether the x and y coordinates passed to this function are contained within this polygon
     *
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
     * @return {boolean} Whether the x/y coordinates are within this polygon
     */
    Polygon.prototype.contains = function (x, y) {
        var inside = false;
        // use some raycasting to test hits
        // https://github.com/substack/point-in-polygon/blob/master/index.js
        var length = this.points.length / 2;
        for (var i = 0, j = length - 1; i < length; j = i++) {
            var xi = this.points[i * 2];
            var yi = this.points[(i * 2) + 1];
            var xj = this.points[j * 2];
            var yj = this.points[(j * 2) + 1];
            var intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * ((y - yi) / (yj - yi))) + xi);
            if (intersect) {
                inside = !inside;
            }
        }
        return inside;
    };
    Polygon.prototype.toString = function () {
        return "[@pixi/math:Polygon"
            + ("closeStroke=" + this.closeStroke)
            + ("points=" + this.points.reduce(function (pointsDesc, currentPoint) { return pointsDesc + ", " + currentPoint; }, '') + "]");
    };
    return Polygon;
}());

/**
 * The Rounded Rectangle object is an area that has nice rounded corners, as indicated by its
 * top-left corner point (x, y) and by its width and its height and its radius.
 *
 * @class
 * @memberof PIXI
 */
var RoundedRectangle = /** @class */ (function () {
    /**
     * @param {number} [x=0] - The X coordinate of the upper-left corner of the rounded rectangle
     * @param {number} [y=0] - The Y coordinate of the upper-left corner of the rounded rectangle
     * @param {number} [width=0] - The overall width of this rounded rectangle
     * @param {number} [height=0] - The overall height of this rounded rectangle
     * @param {number} [radius=20] - Controls the radius of the rounded corners
     */
    function RoundedRectangle(x, y, width, height, radius) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (radius === void 0) { radius = 20; }
        /**
         * @member {number}
         * @default 0
         */
        this.x = x;
        /**
         * @member {number}
         * @default 0
         */
        this.y = y;
        /**
         * @member {number}
         * @default 0
         */
        this.width = width;
        /**
         * @member {number}
         * @default 0
         */
        this.height = height;
        /**
         * @member {number}
         * @default 20
         */
        this.radius = radius;
        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readonly
         * @default PIXI.SHAPES.RREC
         * @see PIXI.SHAPES
         */
        this.type = SHAPES.RREC;
    }
    /**
     * Creates a clone of this Rounded Rectangle
     *
     * @return {PIXI.RoundedRectangle} a copy of the rounded rectangle
     */
    RoundedRectangle.prototype.clone = function () {
        return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
    };
    /**
     * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
     *
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
     * @return {boolean} Whether the x/y coordinates are within this Rounded Rectangle
     */
    RoundedRectangle.prototype.contains = function (x, y) {
        if (this.width <= 0 || this.height <= 0) {
            return false;
        }
        if (x >= this.x && x <= this.x + this.width) {
            if (y >= this.y && y <= this.y + this.height) {
                if ((y >= this.y + this.radius && y <= this.y + this.height - this.radius)
                    || (x >= this.x + this.radius && x <= this.x + this.width - this.radius)) {
                    return true;
                }
                var dx = x - (this.x + this.radius);
                var dy = y - (this.y + this.radius);
                var radius2 = this.radius * this.radius;
                if ((dx * dx) + (dy * dy) <= radius2) {
                    return true;
                }
                dx = x - (this.x + this.width - this.radius);
                if ((dx * dx) + (dy * dy) <= radius2) {
                    return true;
                }
                dy = y - (this.y + this.height - this.radius);
                if ((dx * dx) + (dy * dy) <= radius2) {
                    return true;
                }
                dx = x - (this.x + this.radius);
                if ((dx * dx) + (dy * dy) <= radius2) {
                    return true;
                }
            }
        }
        return false;
    };
    RoundedRectangle.prototype.toString = function () {
        return "[@pixi/math:RoundedRectangle x=" + this.x + " y=" + this.y
            + ("width=" + this.width + " height=" + this.height + " radius=" + this.radius + "]");
    };
    return RoundedRectangle;
}());

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents
 * the horizontal axis and y represents the vertical axis.
 *
 * @class
 * @memberof PIXI
 * @implements IPoint
 */
var Point = /** @class */ (function () {
    /**
     * @param {number} [x=0] - position of the point on the x axis
     * @param {number} [y=0] - position of the point on the y axis
     */
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        /**
         * @member {number}
         * @default 0
         */
        this.x = x;
        /**
         * @member {number}
         * @default 0
         */
        this.y = y;
    }
    /**
     * Creates a clone of this point
     *
     * @return {PIXI.Point} a copy of the point
     */
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    /**
     * Copies x and y from the given point
     *
     * @param {PIXI.IPointData} p - The point to copy from
     * @returns {this} Returns itself.
     */
    Point.prototype.copyFrom = function (p) {
        this.set(p.x, p.y);
        return this;
    };
    /**
     * Copies x and y into the given point
     *
     * @param {PIXI.IPoint} p - The point to copy.
     * @returns {PIXI.IPoint} Given point with values updated
     */
    Point.prototype.copyTo = function (p) {
        p.set(this.x, this.y);
        return p;
    };
    /**
     * Returns true if the given point is equal to this point
     *
     * @param {PIXI.IPointData} p - The point to check
     * @returns {boolean} Whether the given point equal to this point
     */
    Point.prototype.equals = function (p) {
        return (p.x === this.x) && (p.y === this.y);
    };
    /**
     * Sets the point to a new x and y position.
     * If y is omitted, both x and y will be set to x.
     *
     * @param {number} [x=0] - position of the point on the x axis
     * @param {number} [y=x] - position of the point on the y axis
     * @returns {this} Returns itself.
     */
    Point.prototype.set = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = x; }
        this.x = x;
        this.y = y;
        return this;
    };
    Point.prototype.toString = function () {
        return "[@pixi/math:Point x=" + this.x + " y=" + this.y + "]";
    };
    return Point;
}());

/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents
 * the horizontal axis and y represents the vertical axis.
 *
 * An ObservablePoint is a point that triggers a callback when the point's position is changed.
 *
 * @class
 * @memberof PIXI
 * @implements IPoint
 */
var ObservablePoint = /** @class */ (function () {
    /**
     * @param {Function} cb - callback when changed
     * @param {object} scope - owner of callback
     * @param {number} [x=0] - position of the point on the x axis
     * @param {number} [y=0] - position of the point on the y axis
     */
    function ObservablePoint(cb, scope, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = x;
        this._y = y;
        this.cb = cb;
        this.scope = scope;
    }
    /**
     * Creates a clone of this point.
     * The callback and scope params can be overridden otherwise they will default
     * to the clone object's values.
     *
     * @override
     * @param {Function} [cb=null] - callback when changed
     * @param {object} [scope=null] - owner of callback
     * @return {PIXI.ObservablePoint} a copy of the point
     */
    ObservablePoint.prototype.clone = function (cb, scope) {
        if (cb === void 0) { cb = this.cb; }
        if (scope === void 0) { scope = this.scope; }
        return new ObservablePoint(cb, scope, this._x, this._y);
    };
    /**
     * Sets the point to a new x and y position.
     * If y is omitted, both x and y will be set to x.
     *
     * @param {number} [x=0] - position of the point on the x axis
     * @param {number} [y=x] - position of the point on the y axis
     * @returns {this} Returns itself.
     */
    ObservablePoint.prototype.set = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = x; }
        if (this._x !== x || this._y !== y) {
            this._x = x;
            this._y = y;
            this.cb.call(this.scope);
        }
        return this;
    };
    /**
     * Copies x and y from the given point
     *
     * @param {PIXI.IPointData} p - The point to copy from.
     * @returns {this} Returns itself.
     */
    ObservablePoint.prototype.copyFrom = function (p) {
        if (this._x !== p.x || this._y !== p.y) {
            this._x = p.x;
            this._y = p.y;
            this.cb.call(this.scope);
        }
        return this;
    };
    /**
     * Copies x and y into the given point
     *
     * @param {PIXI.IPoint} p - The point to copy.
     * @returns {PIXI.IPoint} Given point with values updated
     */
    ObservablePoint.prototype.copyTo = function (p) {
        p.set(this._x, this._y);
        return p;
    };
    /**
     * Returns true if the given point is equal to this point
     *
     * @param {PIXI.IPointData} p - The point to check
     * @returns {boolean} Whether the given point equal to this point
     */
    ObservablePoint.prototype.equals = function (p) {
        return (p.x === this._x) && (p.y === this._y);
    };
    ObservablePoint.prototype.toString = function () {
        return "[@pixi/math:ObservablePoint x=" + 0 + " y=" + 0 + " scope=" + this.scope + "]";
    };
    Object.defineProperty(ObservablePoint.prototype, "x", {
        /**
         * The position of the displayObject on the x axis relative to the local coordinates of the parent.
         *
         * @member {number}
         */
        get: function () {
            return this._x;
        },
        set: function (value) {
            if (this._x !== value) {
                this._x = value;
                this.cb.call(this.scope);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObservablePoint.prototype, "y", {
        /**
         * The position of the displayObject on the x axis relative to the local coordinates of the parent.
         *
         * @member {number}
         */
        get: function () {
            return this._y;
        },
        set: function (value) {
            if (this._y !== value) {
                this._y = value;
                this.cb.call(this.scope);
            }
        },
        enumerable: false,
        configurable: true
    });
    return ObservablePoint;
}());

/**
 * The PixiJS Matrix as a class makes it a lot faster.
 *
 * Here is a representation of it:
 * ```js
 * | a | c | tx|
 * | b | d | ty|
 * | 0 | 0 | 1 |
 * ```
 * @class
 * @memberof PIXI
 */
var Matrix = /** @class */ (function () {
    /**
     * @param {number} [a=1] - x scale
     * @param {number} [b=0] - y skew
     * @param {number} [c=0] - x skew
     * @param {number} [d=1] - y scale
     * @param {number} [tx=0] - x translation
     * @param {number} [ty=0] - y translation
     */
    function Matrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.array = null;
        /**
         * @member {number}
         * @default 1
         */
        this.a = a;
        /**
         * @member {number}
         * @default 0
         */
        this.b = b;
        /**
         * @member {number}
         * @default 0
         */
        this.c = c;
        /**
         * @member {number}
         * @default 1
         */
        this.d = d;
        /**
         * @member {number}
         * @default 0
         */
        this.tx = tx;
        /**
         * @member {number}
         * @default 0
         */
        this.ty = ty;
    }
    /**
     * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
     *
     * a = array[0]
     * b = array[1]
     * c = array[3]
     * d = array[4]
     * tx = array[2]
     * ty = array[5]
     *
     * @param {number[]} array - The array that the matrix will be populated from.
     */
    Matrix.prototype.fromArray = function (array) {
        this.a = array[0];
        this.b = array[1];
        this.c = array[3];
        this.d = array[4];
        this.tx = array[2];
        this.ty = array[5];
    };
    /**
     * sets the matrix properties
     *
     * @param {number} a - Matrix component
     * @param {number} b - Matrix component
     * @param {number} c - Matrix component
     * @param {number} d - Matrix component
     * @param {number} tx - Matrix component
     * @param {number} ty - Matrix component
     *
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */
    Matrix.prototype.set = function (a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
        return this;
    };
    /**
     * Creates an array from the current Matrix object.
     *
     * @param {boolean} transpose - Whether we need to transpose the matrix or not
     * @param {Float32Array} [out=new Float32Array(9)] - If provided the array will be assigned to out
     * @return {number[]} the newly created array which contains the matrix
     */
    Matrix.prototype.toArray = function (transpose, out) {
        if (!this.array) {
            this.array = new Float32Array(9);
        }
        var array = out || this.array;
        if (transpose) {
            array[0] = this.a;
            array[1] = this.b;
            array[2] = 0;
            array[3] = this.c;
            array[4] = this.d;
            array[5] = 0;
            array[6] = this.tx;
            array[7] = this.ty;
            array[8] = 1;
        }
        else {
            array[0] = this.a;
            array[1] = this.c;
            array[2] = this.tx;
            array[3] = this.b;
            array[4] = this.d;
            array[5] = this.ty;
            array[6] = 0;
            array[7] = 0;
            array[8] = 1;
        }
        return array;
    };
    /**
     * Get a new position with the current transformation applied.
     * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
     *
     * @param {PIXI.IPointData} pos - The origin
     * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
     * @return {PIXI.Point} The new point, transformed through this matrix
     */
    Matrix.prototype.apply = function (pos, newPos) {
        newPos = (newPos || new Point());
        var x = pos.x;
        var y = pos.y;
        newPos.x = (this.a * x) + (this.c * y) + this.tx;
        newPos.y = (this.b * x) + (this.d * y) + this.ty;
        return newPos;
    };
    /**
     * Get a new position with the inverse of the current transformation applied.
     * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
     *
     * @param {PIXI.IPointData} pos - The origin
     * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
     * @return {PIXI.Point} The new point, inverse-transformed through this matrix
     */
    Matrix.prototype.applyInverse = function (pos, newPos) {
        newPos = (newPos || new Point());
        var id = 1 / ((this.a * this.d) + (this.c * -this.b));
        var x = pos.x;
        var y = pos.y;
        newPos.x = (this.d * id * x) + (-this.c * id * y) + (((this.ty * this.c) - (this.tx * this.d)) * id);
        newPos.y = (this.a * id * y) + (-this.b * id * x) + (((-this.ty * this.a) + (this.tx * this.b)) * id);
        return newPos;
    };
    /**
     * Translates the matrix on the x and y.
     *
     * @param {number} x - How much to translate x by
     * @param {number} y - How much to translate y by
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */
    Matrix.prototype.translate = function (x, y) {
        this.tx += x;
        this.ty += y;
        return this;
    };
    /**
     * Applies a scale transformation to the matrix.
     *
     * @param {number} x - The amount to scale horizontally
     * @param {number} y - The amount to scale vertically
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */
    Matrix.prototype.scale = function (x, y) {
        this.a *= x;
        this.d *= y;
        this.c *= x;
        this.b *= y;
        this.tx *= x;
        this.ty *= y;
        return this;
    };
    /**
     * Applies a rotation transformation to the matrix.
     *
     * @param {number} angle - The angle in radians.
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */
    Matrix.prototype.rotate = function (angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var a1 = this.a;
        var c1 = this.c;
        var tx1 = this.tx;
        this.a = (a1 * cos) - (this.b * sin);
        this.b = (a1 * sin) + (this.b * cos);
        this.c = (c1 * cos) - (this.d * sin);
        this.d = (c1 * sin) + (this.d * cos);
        this.tx = (tx1 * cos) - (this.ty * sin);
        this.ty = (tx1 * sin) + (this.ty * cos);
        return this;
    };
    /**
     * Appends the given Matrix to this Matrix.
     *
     * @param {PIXI.Matrix} matrix - The matrix to append.
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */
    Matrix.prototype.append = function (matrix) {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        this.a = (matrix.a * a1) + (matrix.b * c1);
        this.b = (matrix.a * b1) + (matrix.b * d1);
        this.c = (matrix.c * a1) + (matrix.d * c1);
        this.d = (matrix.c * b1) + (matrix.d * d1);
        this.tx = (matrix.tx * a1) + (matrix.ty * c1) + this.tx;
        this.ty = (matrix.tx * b1) + (matrix.ty * d1) + this.ty;
        return this;
    };
    /**
     * Sets the matrix based on all the available properties
     *
     * @param {number} x - Position on the x axis
     * @param {number} y - Position on the y axis
     * @param {number} pivotX - Pivot on the x axis
     * @param {number} pivotY - Pivot on the y axis
     * @param {number} scaleX - Scale on the x axis
     * @param {number} scaleY - Scale on the y axis
     * @param {number} rotation - Rotation in radians
     * @param {number} skewX - Skew on the x axis
     * @param {number} skewY - Skew on the y axis
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */
    Matrix.prototype.setTransform = function (x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
        this.a = Math.cos(rotation + skewY) * scaleX;
        this.b = Math.sin(rotation + skewY) * scaleX;
        this.c = -Math.sin(rotation - skewX) * scaleY;
        this.d = Math.cos(rotation - skewX) * scaleY;
        this.tx = x - ((pivotX * this.a) + (pivotY * this.c));
        this.ty = y - ((pivotX * this.b) + (pivotY * this.d));
        return this;
    };
    /**
     * Prepends the given Matrix to this Matrix.
     *
     * @param {PIXI.Matrix} matrix - The matrix to prepend
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */
    Matrix.prototype.prepend = function (matrix) {
        var tx1 = this.tx;
        if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
            var a1 = this.a;
            var c1 = this.c;
            this.a = (a1 * matrix.a) + (this.b * matrix.c);
            this.b = (a1 * matrix.b) + (this.b * matrix.d);
            this.c = (c1 * matrix.a) + (this.d * matrix.c);
            this.d = (c1 * matrix.b) + (this.d * matrix.d);
        }
        this.tx = (tx1 * matrix.a) + (this.ty * matrix.c) + matrix.tx;
        this.ty = (tx1 * matrix.b) + (this.ty * matrix.d) + matrix.ty;
        return this;
    };
    /**
     * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
     *
     * @param {PIXI.Transform} transform - The transform to apply the properties to.
     * @return {PIXI.Transform} The transform with the newly applied properties
     */
    Matrix.prototype.decompose = function (transform) {
        // sort out rotation / skew..
        var a = this.a;
        var b = this.b;
        var c = this.c;
        var d = this.d;
        var pivot = transform.pivot;
        var skewX = -Math.atan2(-c, d);
        var skewY = Math.atan2(b, a);
        var delta = Math.abs(skewX + skewY);
        if (delta < 0.00001 || Math.abs(PI_2 - delta) < 0.00001) {
            transform.rotation = skewY;
            transform.skew.x = transform.skew.y = 0;
        }
        else {
            transform.rotation = 0;
            transform.skew.x = skewX;
            transform.skew.y = skewY;
        }
        // next set scale
        transform.scale.x = Math.sqrt((a * a) + (b * b));
        transform.scale.y = Math.sqrt((c * c) + (d * d));
        // next set position
        transform.position.x = this.tx + ((pivot.x * a) + (pivot.y * c));
        transform.position.y = this.ty + ((pivot.x * b) + (pivot.y * d));
        return transform;
    };
    /**
     * Inverts this matrix
     *
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */
    Matrix.prototype.invert = function () {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        var tx1 = this.tx;
        var n = (a1 * d1) - (b1 * c1);
        this.a = d1 / n;
        this.b = -b1 / n;
        this.c = -c1 / n;
        this.d = a1 / n;
        this.tx = ((c1 * this.ty) - (d1 * tx1)) / n;
        this.ty = -((a1 * this.ty) - (b1 * tx1)) / n;
        return this;
    };
    /**
     * Resets this Matrix to an identity (default) matrix.
     *
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */
    Matrix.prototype.identity = function () {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
        return this;
    };
    /**
     * Creates a new Matrix object with the same values as this one.
     *
     * @return {PIXI.Matrix} A copy of this matrix. Good for chaining method calls.
     */
    Matrix.prototype.clone = function () {
        var matrix = new Matrix();
        matrix.a = this.a;
        matrix.b = this.b;
        matrix.c = this.c;
        matrix.d = this.d;
        matrix.tx = this.tx;
        matrix.ty = this.ty;
        return matrix;
    };
    /**
     * Changes the values of the given matrix to be the same as the ones in this matrix
     *
     * @param {PIXI.Matrix} matrix - The matrix to copy to.
     * @return {PIXI.Matrix} The matrix given in parameter with its values updated.
     */
    Matrix.prototype.copyTo = function (matrix) {
        matrix.a = this.a;
        matrix.b = this.b;
        matrix.c = this.c;
        matrix.d = this.d;
        matrix.tx = this.tx;
        matrix.ty = this.ty;
        return matrix;
    };
    /**
     * Changes the values of the matrix to be the same as the ones in given matrix
     *
     * @param {PIXI.Matrix} matrix - The matrix to copy from.
     * @return {PIXI.Matrix} this
     */
    Matrix.prototype.copyFrom = function (matrix) {
        this.a = matrix.a;
        this.b = matrix.b;
        this.c = matrix.c;
        this.d = matrix.d;
        this.tx = matrix.tx;
        this.ty = matrix.ty;
        return this;
    };
    Matrix.prototype.toString = function () {
        return "[@pixi/math:Matrix a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + "]";
    };
    Object.defineProperty(Matrix, "IDENTITY", {
        /**
         * A default (identity) matrix
         *
         * @static
         * @const
         * @member {PIXI.Matrix}
         */
        get: function () {
            return new Matrix();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix, "TEMP_MATRIX", {
        /**
         * A temp matrix
         *
         * @static
         * @const
         * @member {PIXI.Matrix}
         */
        get: function () {
            return new Matrix();
        },
        enumerable: false,
        configurable: true
    });
    return Matrix;
}());

// Your friendly neighbour https://en.wikipedia.org/wiki/Dihedral_group
/*
 * Transform matrix for operation n is:
 * | ux | vx |
 * | uy | vy |
 */
var ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1];
var uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1];
var vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1];
var vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1];
/**
 * [Cayley Table]{@link https://en.wikipedia.org/wiki/Cayley_table}
 * for the composition of each rotation in the dihederal group D8.
 *
 * @type number[][]
 * @private
 */
var rotationCayley = [];
/**
 * Matrices for each `GD8Symmetry` rotation.
 *
 * @type Matrix[]
 * @private
 */
var rotationMatrices = [];
/*
 * Alias for {@code Math.sign}.
 */
var signum = Math.sign;
/*
 * Initializes `rotationCayley` and `rotationMatrices`. It is called
 * only once below.
 */
function init() {
    for (var i = 0; i < 16; i++) {
        var row = [];
        rotationCayley.push(row);
        for (var j = 0; j < 16; j++) {
            /* Multiplies rotation matrices i and j. */
            var _ux = signum((ux[i] * ux[j]) + (vx[i] * uy[j]));
            var _uy = signum((uy[i] * ux[j]) + (vy[i] * uy[j]));
            var _vx = signum((ux[i] * vx[j]) + (vx[i] * vy[j]));
            var _vy = signum((uy[i] * vx[j]) + (vy[i] * vy[j]));
            /* Finds rotation matrix matching the product and pushes it. */
            for (var k = 0; k < 16; k++) {
                if (ux[k] === _ux && uy[k] === _uy
                    && vx[k] === _vx && vy[k] === _vy) {
                    row.push(k);
                    break;
                }
            }
        }
    }
    for (var i = 0; i < 16; i++) {
        var mat = new Matrix();
        mat.set(ux[i], uy[i], vx[i], vy[i], 0, 0);
        rotationMatrices.push(mat);
    }
}
init();
/**
 * @memberof PIXI
 * @typedef {number} GD8Symmetry
 * @see PIXI.groupD8
 */
/**
 * Implements the dihedral group D8, which is similar to
 * [group D4]{@link http://mathworld.wolfram.com/DihedralGroupD4.html};
 * D8 is the same but with diagonals, and it is used for texture
 * rotations.
 *
 * The directions the U- and V- axes after rotation
 * of an angle of `a: GD8Constant` are the vectors `(uX(a), uY(a))`
 * and `(vX(a), vY(a))`. These aren't necessarily unit vectors.
 *
 * **Origin:**<br>
 *  This is the small part of gameofbombs.com portal system. It works.
 *
 * @see PIXI.groupD8.E
 * @see PIXI.groupD8.SE
 * @see PIXI.groupD8.S
 * @see PIXI.groupD8.SW
 * @see PIXI.groupD8.W
 * @see PIXI.groupD8.NW
 * @see PIXI.groupD8.N
 * @see PIXI.groupD8.NE
 * @author Ivan @ivanpopelyshev
 * @namespace PIXI.groupD8
 * @memberof PIXI
 */
var groupD8 = {
    /**
     * | Rotation | Direction |
     * |----------|-----------|
     * | 0°       | East      |
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    E: 0,
    /**
     * | Rotation | Direction |
     * |----------|-----------|
     * | 45°↻     | Southeast |
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    SE: 1,
    /**
     * | Rotation | Direction |
     * |----------|-----------|
     * | 90°↻     | South     |
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    S: 2,
    /**
     * | Rotation | Direction |
     * |----------|-----------|
     * | 135°↻    | Southwest |
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    SW: 3,
    /**
     * | Rotation | Direction |
     * |----------|-----------|
     * | 180°     | West      |
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    W: 4,
    /**
     * | Rotation    | Direction    |
     * |-------------|--------------|
     * | -135°/225°↻ | Northwest    |
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    NW: 5,
    /**
     * | Rotation    | Direction    |
     * |-------------|--------------|
     * | -90°/270°↻  | North        |
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    N: 6,
    /**
     * | Rotation    | Direction    |
     * |-------------|--------------|
     * | -45°/315°↻  | Northeast    |
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    NE: 7,
    /**
     * Reflection about Y-axis.
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    MIRROR_VERTICAL: 8,
    /**
     * Reflection about the main diagonal.
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    MAIN_DIAGONAL: 10,
    /**
     * Reflection about X-axis.
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    MIRROR_HORIZONTAL: 12,
    /**
     * Reflection about reverse diagonal.
     *
     * @memberof PIXI.groupD8
     * @constant {PIXI.GD8Symmetry}
     */
    REVERSE_DIAGONAL: 14,
    /**
     * @memberof PIXI.groupD8
     * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
     * @return {PIXI.GD8Symmetry} The X-component of the U-axis
     *    after rotating the axes.
     */
    uX: function (ind) { return ux[ind]; },
    /**
     * @memberof PIXI.groupD8
     * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
     * @return {PIXI.GD8Symmetry} The Y-component of the U-axis
     *    after rotating the axes.
     */
    uY: function (ind) { return uy[ind]; },
    /**
     * @memberof PIXI.groupD8
     * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
     * @return {PIXI.GD8Symmetry} The X-component of the V-axis
     *    after rotating the axes.
     */
    vX: function (ind) { return vx[ind]; },
    /**
     * @memberof PIXI.groupD8
     * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
     * @return {PIXI.GD8Symmetry} The Y-component of the V-axis
     *    after rotating the axes.
     */
    vY: function (ind) { return vy[ind]; },
    /**
     * @memberof PIXI.groupD8
     * @param {PIXI.GD8Symmetry} rotation - symmetry whose opposite
     *   is needed. Only rotations have opposite symmetries while
     *   reflections don't.
     * @return {PIXI.GD8Symmetry} The opposite symmetry of `rotation`
     */
    inv: function (rotation) {
        if (rotation & 8) // true only if between 8 & 15 (reflections)
         {
            return rotation & 15; // or rotation % 16
        }
        return (-rotation) & 7; // or (8 - rotation) % 8
    },
    /**
     * Composes the two D8 operations.
     *
     * Taking `^` as reflection:
     *
     * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
     * |-------|-----|-----|-----|-----|------|-------|-------|-------|
     * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
     * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
     * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
     * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
     * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
     * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
     * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
     * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
     *
     * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
     * @memberof PIXI.groupD8
     * @param {PIXI.GD8Symmetry} rotationSecond - Second operation, which
     *   is the row in the above cayley table.
     * @param {PIXI.GD8Symmetry} rotationFirst - First operation, which
     *   is the column in the above cayley table.
     * @return {PIXI.GD8Symmetry} Composed operation
     */
    add: function (rotationSecond, rotationFirst) { return (rotationCayley[rotationSecond][rotationFirst]); },
    /**
     * Reverse of `add`.
     *
     * @memberof PIXI.groupD8
     * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
     * @param {PIXI.GD8Symmetry} rotationFirst - First operation
     * @return {PIXI.GD8Symmetry} Result
     */
    sub: function (rotationSecond, rotationFirst) { return (rotationCayley[rotationSecond][groupD8.inv(rotationFirst)]); },
    /**
     * Adds 180 degrees to rotation, which is a commutative
     * operation.
     *
     * @memberof PIXI.groupD8
     * @param {number} rotation - The number to rotate.
     * @returns {number} Rotated number
     */
    rotate180: function (rotation) { return rotation ^ 4; },
    /**
     * Checks if the rotation angle is vertical, i.e. south
     * or north. It doesn't work for reflections.
     *
     * @memberof PIXI.groupD8
     * @param {PIXI.GD8Symmetry} rotation - The number to check.
     * @returns {boolean} Whether or not the direction is vertical
     */
    isVertical: function (rotation) { return (rotation & 3) === 2; },
    /**
     * Approximates the vector `V(dx,dy)` into one of the
     * eight directions provided by `groupD8`.
     *
     * @memberof PIXI.groupD8
     * @param {number} dx - X-component of the vector
     * @param {number} dy - Y-component of the vector
     * @return {PIXI.GD8Symmetry} Approximation of the vector into
     *  one of the eight symmetries.
     */
    byDirection: function (dx, dy) {
        if (Math.abs(dx) * 2 <= Math.abs(dy)) {
            if (dy >= 0) {
                return groupD8.S;
            }
            return groupD8.N;
        }
        else if (Math.abs(dy) * 2 <= Math.abs(dx)) {
            if (dx > 0) {
                return groupD8.E;
            }
            return groupD8.W;
        }
        else if (dy > 0) {
            if (dx > 0) {
                return groupD8.SE;
            }
            return groupD8.SW;
        }
        else if (dx > 0) {
            return groupD8.NE;
        }
        return groupD8.NW;
    },
    /**
     * Helps sprite to compensate texture packer rotation.
     *
     * @memberof PIXI.groupD8
     * @param {PIXI.Matrix} matrix - sprite world matrix
     * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
     * @param {number} tx - sprite anchoring
     * @param {number} ty - sprite anchoring
     */
    matrixAppendRotationInv: function (matrix, rotation, tx, ty) {
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        // Packer used "rotation", we use "inv(rotation)"
        var mat = rotationMatrices[groupD8.inv(rotation)];
        mat.tx = tx;
        mat.ty = ty;
        matrix.append(mat);
    },
};

/**
 * Transform that takes care about its versions
 *
 * @class
 * @memberof PIXI
 */
var Transform = /** @class */ (function () {
    function Transform() {
        /**
         * The world transformation matrix.
         *
         * @member {PIXI.Matrix}
         */
        this.worldTransform = new Matrix();
        /**
         * The local transformation matrix.
         *
         * @member {PIXI.Matrix}
         */
        this.localTransform = new Matrix();
        /**
         * The coordinate of the object relative to the local coordinates of the parent.
         *
         * @member {PIXI.ObservablePoint}
         */
        this.position = new ObservablePoint(this.onChange, this, 0, 0);
        /**
         * The scale factor of the object.
         *
         * @member {PIXI.ObservablePoint}
         */
        this.scale = new ObservablePoint(this.onChange, this, 1, 1);
        /**
         * The pivot point of the displayObject that it rotates around.
         *
         * @member {PIXI.ObservablePoint}
         */
        this.pivot = new ObservablePoint(this.onChange, this, 0, 0);
        /**
         * The skew amount, on the x and y axis.
         *
         * @member {PIXI.ObservablePoint}
         */
        this.skew = new ObservablePoint(this.updateSkew, this, 0, 0);
        /**
         * The rotation amount.
         *
         * @protected
         * @member {number}
         */
        this._rotation = 0;
        /**
         * The X-coordinate value of the normalized local X axis,
         * the first column of the local transformation matrix without a scale.
         *
         * @protected
         * @member {number}
         */
        this._cx = 1;
        /**
         * The Y-coordinate value of the normalized local X axis,
         * the first column of the local transformation matrix without a scale.
         *
         * @protected
         * @member {number}
         */
        this._sx = 0;
        /**
         * The X-coordinate value of the normalized local Y axis,
         * the second column of the local transformation matrix without a scale.
         *
         * @protected
         * @member {number}
         */
        this._cy = 0;
        /**
         * The Y-coordinate value of the normalized local Y axis,
         * the second column of the local transformation matrix without a scale.
         *
         * @protected
         * @member {number}
         */
        this._sy = 1;
        /**
         * The locally unique ID of the local transform.
         *
         * @protected
         * @member {number}
         */
        this._localID = 0;
        /**
         * The locally unique ID of the local transform
         * used to calculate the current local transformation matrix.
         *
         * @protected
         * @member {number}
         */
        this._currentLocalID = 0;
        /**
         * The locally unique ID of the world transform.
         *
         * @protected
         * @member {number}
         */
        this._worldID = 0;
        /**
         * The locally unique ID of the parent's world transform
         * used to calculate the current world transformation matrix.
         *
         * @protected
         * @member {number}
         */
        this._parentID = 0;
    }
    /**
     * Called when a value changes.
     *
     * @protected
     */
    Transform.prototype.onChange = function () {
        this._localID++;
    };
    /**
     * Called when the skew or the rotation changes.
     *
     * @protected
     */
    Transform.prototype.updateSkew = function () {
        this._cx = Math.cos(this._rotation + this.skew.y);
        this._sx = Math.sin(this._rotation + this.skew.y);
        this._cy = -Math.sin(this._rotation - this.skew.x); // cos, added PI/2
        this._sy = Math.cos(this._rotation - this.skew.x); // sin, added PI/2
        this._localID++;
    };
    Transform.prototype.toString = function () {
        return "[@pixi/math:Transform "
            + ("position=(" + this.position.x + ", " + this.position.y + ") ")
            + ("rotation=" + this.rotation + " ")
            + ("scale=(" + this.scale.x + ", " + this.scale.y + ") ")
            + ("skew=(" + this.skew.x + ", " + this.skew.y + ") ")
            + "]";
    };
    /**
     * Updates the local transformation matrix.
     */
    Transform.prototype.updateLocalTransform = function () {
        var lt = this.localTransform;
        if (this._localID !== this._currentLocalID) {
            // get the matrix values of the displayobject based on its transform properties..
            lt.a = this._cx * this.scale.x;
            lt.b = this._sx * this.scale.x;
            lt.c = this._cy * this.scale.y;
            lt.d = this._sy * this.scale.y;
            lt.tx = this.position.x - ((this.pivot.x * lt.a) + (this.pivot.y * lt.c));
            lt.ty = this.position.y - ((this.pivot.x * lt.b) + (this.pivot.y * lt.d));
            this._currentLocalID = this._localID;
            // force an update..
            this._parentID = -1;
        }
    };
    /**
     * Updates the local and the world transformation matrices.
     *
     * @param {PIXI.Transform} parentTransform - The parent transform
     */
    Transform.prototype.updateTransform = function (parentTransform) {
        var lt = this.localTransform;
        if (this._localID !== this._currentLocalID) {
            // get the matrix values of the displayobject based on its transform properties..
            lt.a = this._cx * this.scale.x;
            lt.b = this._sx * this.scale.x;
            lt.c = this._cy * this.scale.y;
            lt.d = this._sy * this.scale.y;
            lt.tx = this.position.x - ((this.pivot.x * lt.a) + (this.pivot.y * lt.c));
            lt.ty = this.position.y - ((this.pivot.x * lt.b) + (this.pivot.y * lt.d));
            this._currentLocalID = this._localID;
            // force an update..
            this._parentID = -1;
        }
        if (this._parentID !== parentTransform._worldID) {
            // concat the parent matrix with the objects transform.
            var pt = parentTransform.worldTransform;
            var wt = this.worldTransform;
            wt.a = (lt.a * pt.a) + (lt.b * pt.c);
            wt.b = (lt.a * pt.b) + (lt.b * pt.d);
            wt.c = (lt.c * pt.a) + (lt.d * pt.c);
            wt.d = (lt.c * pt.b) + (lt.d * pt.d);
            wt.tx = (lt.tx * pt.a) + (lt.ty * pt.c) + pt.tx;
            wt.ty = (lt.tx * pt.b) + (lt.ty * pt.d) + pt.ty;
            this._parentID = parentTransform._worldID;
            // update the id of the transform..
            this._worldID++;
        }
    };
    /**
     * Decomposes a matrix and sets the transforms properties based on it.
     *
     * @param {PIXI.Matrix} matrix - The matrix to decompose
     */
    Transform.prototype.setFromMatrix = function (matrix) {
        matrix.decompose(this);
        this._localID++;
    };
    Object.defineProperty(Transform.prototype, "rotation", {
        /**
         * The rotation of the object in radians.
         *
         * @member {number}
         */
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            if (this._rotation !== value) {
                this._rotation = value;
                this.updateSkew();
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * A default (identity) transform
     *
     * @static
     * @constant
     * @member {PIXI.Transform}
     */
    Transform.IDENTITY = new Transform();
    return Transform;
}());


//# sourceMappingURL=math.js.map


/***/ }),

/***/ "./node_modules/@pixi/runner/dist/esm/runner.js":
/*!******************************************************!*\
  !*** ./node_modules/@pixi/runner/dist/esm/runner.js ***!
  \******************************************************/
/*! exports provided: Runner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Runner", function() { return Runner; });
/*!
 * @pixi/runner - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:17:46 UTC
 *
 * @pixi/runner is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
/**
 * A Runner is a highly performant and simple alternative to signals. Best used in situations
 * where events are dispatched to many objects at high frequency (say every frame!)
 *
 *
 * like a signal..
 * ```
 * import { Runner } from '@pixi/runner';
 *
 * const myObject = {
 *     loaded: new Runner('loaded')
 * }
 *
 * const listener = {
 *     loaded: function(){
 *         // thin
 *     }
 * }
 *
 * myObject.loaded.add(listener);
 *
 * myObject.loaded.emit();
 * ```
 *
 * Or for handling calling the same function on many items
 * ```
 * import { Runner } from '@pixi/runner';
 *
 * const myGame = {
 *     update: new Runner('update')
 * }
 *
 * const gameObject = {
 *     update: function(time){
 *         // update my gamey state
 *     }
 * }
 *
 * myGame.update.add(gameObject);
 *
 * myGame.update.emit(time);
 * ```
 * @class
 * @memberof PIXI
 */
var Runner = /** @class */ (function () {
    /**
     *  @param {string} name - the function name that will be executed on the listeners added to this Runner.
     */
    function Runner(name) {
        this.items = [];
        this._name = name;
        this._aliasCount = 0;
    }
    /**
     * Dispatch/Broadcast Runner to all listeners added to the queue.
     * @param {...any} params - optional parameters to pass to each listener
     * @return {PIXI.Runner}
     */
    Runner.prototype.emit = function (a0, a1, a2, a3, a4, a5, a6, a7) {
        if (arguments.length > 8) {
            throw new Error('max arguments reached');
        }
        var _a = this, name = _a.name, items = _a.items;
        this._aliasCount++;
        for (var i = 0, len = items.length; i < len; i++) {
            items[i][name](a0, a1, a2, a3, a4, a5, a6, a7);
        }
        if (items === this.items) {
            this._aliasCount--;
        }
        return this;
    };
    Runner.prototype.ensureNonAliasedItems = function () {
        if (this._aliasCount > 0 && this.items.length > 1) {
            this._aliasCount = 0;
            this.items = this.items.slice(0);
        }
    };
    /**
     * Add a listener to the Runner
     *
     * Runners do not need to have scope or functions passed to them.
     * All that is required is to pass the listening object and ensure that it has contains a function that has the same name
     * as the name provided to the Runner when it was created.
     *
     * Eg A listener passed to this Runner will require a 'complete' function.
     *
     * ```
     * import { Runner } from '@pixi/runner';
     *
     * const complete = new Runner('complete');
     * ```
     *
     * The scope used will be the object itself.
     *
     * @param {any} item - The object that will be listening.
     * @return {PIXI.Runner}
     */
    Runner.prototype.add = function (item) {
        if (item[this._name]) {
            this.ensureNonAliasedItems();
            this.remove(item);
            this.items.push(item);
        }
        return this;
    };
    /**
     * Remove a single listener from the dispatch queue.
     * @param {any} item - The listener that you would like to remove.
     * @return {PIXI.Runner}
     */
    Runner.prototype.remove = function (item) {
        var index = this.items.indexOf(item);
        if (index !== -1) {
            this.ensureNonAliasedItems();
            this.items.splice(index, 1);
        }
        return this;
    };
    /**
     * Check to see if the listener is already in the Runner
     * @param {any} item - The listener that you would like to check.
     */
    Runner.prototype.contains = function (item) {
        return this.items.indexOf(item) !== -1;
    };
    /**
     * Remove all listeners from the Runner
     * @return {PIXI.Runner}
     */
    Runner.prototype.removeAll = function () {
        this.ensureNonAliasedItems();
        this.items.length = 0;
        return this;
    };
    /**
     * Remove all references, don't use after this.
     */
    Runner.prototype.destroy = function () {
        this.removeAll();
        this.items = null;
        this._name = null;
    };
    Object.defineProperty(Runner.prototype, "empty", {
        /**
         * `true` if there are no this Runner contains no listeners
         *
         * @member {boolean}
         * @readonly
         */
        get: function () {
            return this.items.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Runner.prototype, "name", {
        /**
         * The name of the runner.
         *
         * @member {string}
         * @readonly
         */
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    return Runner;
}());
Object.defineProperties(Runner.prototype, {
    /**
     * Alias for `emit`
     * @memberof PIXI.Runner#
     * @method dispatch
     * @see PIXI.Runner#emit
     */
    dispatch: { value: Runner.prototype.emit },
    /**
     * Alias for `emit`
     * @memberof PIXI.Runner#
     * @method run
     * @see PIXI.Runner#emit
     */
    run: { value: Runner.prototype.emit },
});


//# sourceMappingURL=runner.js.map


/***/ }),

/***/ "./node_modules/@pixi/settings/dist/esm/settings.js":
/*!**********************************************************!*\
  !*** ./node_modules/@pixi/settings/dist/esm/settings.js ***!
  \**********************************************************/
/*! exports provided: isMobile, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony import */ var ismobilejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ismobilejs */ "./node_modules/ismobilejs/esm/index.js");
/*!
 * @pixi/settings - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:17:46 UTC
 *
 * @pixi/settings is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */


// The ESM/CJS versions of ismobilejs only
var isMobile = Object(ismobilejs__WEBPACK_IMPORTED_MODULE_0__["default"])(self.navigator);

/**
 * The maximum recommended texture units to use.
 * In theory the bigger the better, and for desktop we'll use as many as we can.
 * But some mobile devices slow down if there is to many branches in the shader.
 * So in practice there seems to be a sweet spot size that varies depending on the device.
 *
 * In v4, all mobile devices were limited to 4 texture units because for this.
 * In v5, we allow all texture units to be used on modern Apple or Android devices.
 *
 * @private
 * @param {number} max
 * @returns {number}
 */
function maxRecommendedTextures(max) {
    var allowMax = true;
    if (isMobile.tablet || isMobile.phone) {
        if (isMobile.apple.device) {
            var match = (navigator.userAgent).match(/OS (\d+)_(\d+)?/);
            if (match) {
                var majorVersion = parseInt(match[1], 10);
                // Limit texture units on devices below iOS 11, which will be older hardware
                if (majorVersion < 11) {
                    allowMax = false;
                }
            }
        }
        if (isMobile.android.device) {
            var match = (navigator.userAgent).match(/Android\s([0-9.]*)/);
            if (match) {
                var majorVersion = parseInt(match[1], 10);
                // Limit texture units on devices below Android 7 (Nougat), which will be older hardware
                if (majorVersion < 7) {
                    allowMax = false;
                }
            }
        }
    }
    return allowMax ? max : 4;
}

/**
 * Uploading the same buffer multiple times in a single frame can cause performance issues.
 * Apparent on iOS so only check for that at the moment
 * This check may become more complex if this issue pops up elsewhere.
 *
 * @private
 * @returns {boolean}
 */
function canUploadSameBuffer() {
    return !isMobile.apple.device;
}

/**
 * User's customizable globals for overriding the default PIXI settings, such
 * as a renderer's default resolution, framerate, float precision, etc.
 * @example
 * // Use the native window resolution as the default resolution
 * // will support high-density displays when rendering
 * PIXI.settings.RESOLUTION = window.devicePixelRatio;
 *
 * // Disable interpolation when scaling, will make texture be pixelated
 * PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
 * @namespace PIXI.settings
 */
var settings = {
    /**
     * If set to true WebGL will attempt make textures mimpaped by default.
     * Mipmapping will only succeed if the base texture uploaded has power of two dimensions.
     *
     * @static
     * @name MIPMAP_TEXTURES
     * @memberof PIXI.settings
     * @type {PIXI.MIPMAP_MODES}
     * @default PIXI.MIPMAP_MODES.POW2
     */
    MIPMAP_TEXTURES: 1,
    /**
     * Default anisotropic filtering level of textures.
     * Usually from 0 to 16
     *
     * @static
     * @name ANISOTROPIC_LEVEL
     * @memberof PIXI.settings
     * @type {number}
     * @default 0
     */
    ANISOTROPIC_LEVEL: 0,
    /**
     * Default resolution / device pixel ratio of the renderer.
     *
     * @static
     * @name RESOLUTION
     * @memberof PIXI.settings
     * @type {number}
     * @default 1
     */
    RESOLUTION: 1,
    /**
     * Default filter resolution.
     *
     * @static
     * @name FILTER_RESOLUTION
     * @memberof PIXI.settings
     * @type {number}
     * @default 1
     */
    FILTER_RESOLUTION: 1,
    /**
     * The maximum textures that this device supports.
     *
     * @static
     * @name SPRITE_MAX_TEXTURES
     * @memberof PIXI.settings
     * @type {number}
     * @default 32
     */
    SPRITE_MAX_TEXTURES: maxRecommendedTextures(32),
    // TODO: maybe change to SPRITE.BATCH_SIZE: 2000
    // TODO: maybe add PARTICLE.BATCH_SIZE: 15000
    /**
     * The default sprite batch size.
     *
     * The default aims to balance desktop and mobile devices.
     *
     * @static
     * @name SPRITE_BATCH_SIZE
     * @memberof PIXI.settings
     * @type {number}
     * @default 4096
     */
    SPRITE_BATCH_SIZE: 4096,
    /**
     * The default render options if none are supplied to {@link PIXI.Renderer}
     * or {@link PIXI.CanvasRenderer}.
     *
     * @static
     * @name RENDER_OPTIONS
     * @memberof PIXI.settings
     * @type {object}
     * @property {HTMLCanvasElement} view=null
     * @property {number} resolution=1
     * @property {boolean} antialias=false
     * @property {boolean} autoDensity=false
     * @property {boolean} useContextAlpha=true
     * @property {number} backgroundColor=0x000000
     * @property {number} backgroundAlpha=1
     * @property {boolean} clearBeforeRender=true
     * @property {boolean} preserveDrawingBuffer=false
     * @property {number} width=800
     * @property {number} height=600
     * @property {boolean} legacy=false
     */
    RENDER_OPTIONS: {
        view: null,
        antialias: false,
        autoDensity: false,
        backgroundColor: 0x000000,
        backgroundAlpha: 1,
        useContextAlpha: true,
        clearBeforeRender: true,
        preserveDrawingBuffer: false,
        width: 800,
        height: 600,
        legacy: false,
    },
    /**
     * Default Garbage Collection mode.
     *
     * @static
     * @name GC_MODE
     * @memberof PIXI.settings
     * @type {PIXI.GC_MODES}
     * @default PIXI.GC_MODES.AUTO
     */
    GC_MODE: 0,
    /**
     * Default Garbage Collection max idle.
     *
     * @static
     * @name GC_MAX_IDLE
     * @memberof PIXI.settings
     * @type {number}
     * @default 3600
     */
    GC_MAX_IDLE: 60 * 60,
    /**
     * Default Garbage Collection maximum check count.
     *
     * @static
     * @name GC_MAX_CHECK_COUNT
     * @memberof PIXI.settings
     * @type {number}
     * @default 600
     */
    GC_MAX_CHECK_COUNT: 60 * 10,
    /**
     * Default wrap modes that are supported by pixi.
     *
     * @static
     * @name WRAP_MODE
     * @memberof PIXI.settings
     * @type {PIXI.WRAP_MODES}
     * @default PIXI.WRAP_MODES.CLAMP
     */
    WRAP_MODE: 33071,
    /**
     * Default scale mode for textures.
     *
     * @static
     * @name SCALE_MODE
     * @memberof PIXI.settings
     * @type {PIXI.SCALE_MODES}
     * @default PIXI.SCALE_MODES.LINEAR
     */
    SCALE_MODE: 1,
    /**
     * Default specify float precision in vertex shader.
     *
     * @static
     * @name PRECISION_VERTEX
     * @memberof PIXI.settings
     * @type {PIXI.PRECISION}
     * @default PIXI.PRECISION.HIGH
     */
    PRECISION_VERTEX: 'highp',
    /**
     * Default specify float precision in fragment shader.
     * iOS is best set at highp due to https://github.com/pixijs/pixi.js/issues/3742
     *
     * @static
     * @name PRECISION_FRAGMENT
     * @memberof PIXI.settings
     * @type {PIXI.PRECISION}
     * @default PIXI.PRECISION.MEDIUM
     */
    PRECISION_FRAGMENT: isMobile.apple.device ? 'highp' : 'mediump',
    /**
     * Can we upload the same buffer in a single frame?
     *
     * @static
     * @name CAN_UPLOAD_SAME_BUFFER
     * @memberof PIXI.settings
     * @type {boolean}
     */
    CAN_UPLOAD_SAME_BUFFER: canUploadSameBuffer(),
    /**
     * Enables bitmap creation before image load. This feature is experimental.
     *
     * @static
     * @name CREATE_IMAGE_BITMAP
     * @memberof PIXI.settings
     * @type {boolean}
     * @default false
     */
    CREATE_IMAGE_BITMAP: false,
    /**
     * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
     * Advantages can include sharper image quality (like text) and faster rendering on canvas.
     * The main disadvantage is movement of objects may appear less smooth.
     *
     * @static
     * @constant
     * @memberof PIXI.settings
     * @type {boolean}
     * @default false
     */
    ROUND_PIXELS: false,
};


//# sourceMappingURL=settings.js.map


/***/ }),

/***/ "./node_modules/@pixi/ticker/dist/esm/ticker.js":
/*!******************************************************!*\
  !*** ./node_modules/@pixi/ticker/dist/esm/ticker.js ***!
  \******************************************************/
/*! exports provided: Ticker, TickerPlugin, UPDATE_PRIORITY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ticker", function() { return Ticker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TickerPlugin", function() { return TickerPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PRIORITY", function() { return UPDATE_PRIORITY; });
/* harmony import */ var _pixi_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pixi/settings */ "./node_modules/@pixi/settings/dist/esm/settings.js");
/*!
 * @pixi/ticker - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:17:46 UTC
 *
 * @pixi/ticker is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */


/**
 * Target frames per millisecond.
 *
 * @static
 * @name TARGET_FPMS
 * @memberof PIXI.settings
 * @type {number}
 * @default 0.06
 */
_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].TARGET_FPMS = 0.06;

/**
 * Represents the update priorities used by internal PIXI classes when registered with
 * the {@link PIXI.Ticker} object. Higher priority items are updated first and lower
 * priority items, such as render, should go later.
 *
 * @static
 * @constant
 * @name UPDATE_PRIORITY
 * @memberof PIXI
 * @enum {number}
 * @property {number} INTERACTION=50 Highest priority, used for {@link PIXI.InteractionManager}
 * @property {number} HIGH=25 High priority updating, {@link PIXI.VideoBaseTexture} and {@link PIXI.AnimatedSprite}
 * @property {number} NORMAL=0 Default priority for ticker events, see {@link PIXI.Ticker#add}.
 * @property {number} LOW=-25 Low priority used for {@link PIXI.Application} rendering.
 * @property {number} UTILITY=-50 Lowest priority used for {@link PIXI.BasePrepare} utility.
 */
var UPDATE_PRIORITY;
(function (UPDATE_PRIORITY) {
    UPDATE_PRIORITY[UPDATE_PRIORITY["INTERACTION"] = 50] = "INTERACTION";
    UPDATE_PRIORITY[UPDATE_PRIORITY["HIGH"] = 25] = "HIGH";
    UPDATE_PRIORITY[UPDATE_PRIORITY["NORMAL"] = 0] = "NORMAL";
    UPDATE_PRIORITY[UPDATE_PRIORITY["LOW"] = -25] = "LOW";
    UPDATE_PRIORITY[UPDATE_PRIORITY["UTILITY"] = -50] = "UTILITY";
})(UPDATE_PRIORITY || (UPDATE_PRIORITY = {}));

/**
 * Internal class for handling the priority sorting of ticker handlers.
 *
 * @private
 * @class
 * @memberof PIXI
 */
var TickerListener = /** @class */ (function () {
    /**
     * Constructor
     * @private
     * @param fn - The listener function to be added for one update
     * @param context - The listener context
     * @param priority - The priority for emitting
     * @param once - If the handler should fire once
     */
    function TickerListener(fn, context, priority, once) {
        if (context === void 0) { context = null; }
        if (priority === void 0) { priority = 0; }
        if (once === void 0) { once = false; }
        /** The next item in chain. */
        this.next = null;
        /** The previous item in chain. */
        this.previous = null;
        /** `true` if this listener has been destroyed already. */
        this._destroyed = false;
        this.fn = fn;
        this.context = context;
        this.priority = priority;
        this.once = once;
    }
    /**
     * Simple compare function to figure out if a function and context match.
     * @private
     * @param fn - The listener function to be added for one update
     * @param context - The listener context
     * @return `true` if the listener match the arguments
     */
    TickerListener.prototype.match = function (fn, context) {
        if (context === void 0) { context = null; }
        return this.fn === fn && this.context === context;
    };
    /**
     * Emit by calling the current function.
     * @private
     * @param deltaTime - time since the last emit.
     * @return Next ticker
     */
    TickerListener.prototype.emit = function (deltaTime) {
        if (this.fn) {
            if (this.context) {
                this.fn.call(this.context, deltaTime);
            }
            else {
                this.fn(deltaTime);
            }
        }
        var redirect = this.next;
        if (this.once) {
            this.destroy(true);
        }
        // Soft-destroying should remove
        // the next reference
        if (this._destroyed) {
            this.next = null;
        }
        return redirect;
    };
    /**
     * Connect to the list.
     * @private
     * @param previous - Input node, previous listener
     */
    TickerListener.prototype.connect = function (previous) {
        this.previous = previous;
        if (previous.next) {
            previous.next.previous = this;
        }
        this.next = previous.next;
        previous.next = this;
    };
    /**
     * Destroy and don't use after this.
     * @private
     * @param hard - `true` to remove the `next` reference, this
     *        is considered a hard destroy. Soft destroy maintains the next reference.
     * @return The listener to redirect while emitting or removing.
     */
    TickerListener.prototype.destroy = function (hard) {
        if (hard === void 0) { hard = false; }
        this._destroyed = true;
        this.fn = null;
        this.context = null;
        // Disconnect, hook up next and previous
        if (this.previous) {
            this.previous.next = this.next;
        }
        if (this.next) {
            this.next.previous = this.previous;
        }
        // Redirect to the next item
        var redirect = this.next;
        // Remove references
        this.next = hard ? null : redirect;
        this.previous = null;
        return redirect;
    };
    return TickerListener;
}());

/**
 * A Ticker class that runs an update loop that other objects listen to.
 *
 * This class is composed around listeners meant for execution on the next requested animation frame.
 * Animation frames are requested only when necessary, e.g. When the ticker is started and the emitter has listeners.
 *
 * @class
 * @memberof PIXI
 */
var Ticker = /** @class */ (function () {
    function Ticker() {
        var _this = this;
        /**
         * Whether or not this ticker should invoke the method
         * {@link PIXI.Ticker#start} automatically
         * when a listener is added.
         */
        this.autoStart = false;
        /**
         * Scalar time value from last frame to this frame.
         * This value is capped by setting {@link PIXI.Ticker#minFPS}
         * and is scaled with {@link PIXI.Ticker#speed}.
         * **Note:** The cap may be exceeded by scaling.
         */
        this.deltaTime = 1;
        /**
         * The last time {@link PIXI.Ticker#update} was invoked.
         * This value is also reset internally outside of invoking
         * update, but only when a new animation frame is requested.
         * If the platform supports DOMHighResTimeStamp,
         * this value will have a precision of 1 µs.
         */
        this.lastTime = -1;
        /**
         * Factor of current {@link PIXI.Ticker#deltaTime}.
         * @example
         * // Scales ticker.deltaTime to what would be
         * // the equivalent of approximately 120 FPS
         * ticker.speed = 2;
         */
        this.speed = 1;
        /**
         * Whether or not this ticker has been started.
         * `true` if {@link PIXI.Ticker#start} has been called.
         * `false` if {@link PIXI.Ticker#stop} has been called.
         * While `false`, this value may change to `true` in the
         * event of {@link PIXI.Ticker#autoStart} being `true`
         * and a listener is added.
         */
        this.started = false;
        /** Internal current frame request ID */
        this._requestId = null;
        /**
         * Internal value managed by minFPS property setter and getter.
         * This is the maximum allowed milliseconds between updates.
         */
        this._maxElapsedMS = 100;
        /**
         * Internal value managed by minFPS property setter and getter.
         * This is the maximum allowed milliseconds between updates.
         */
        this._minElapsedMS = 0;
        /** If enabled, deleting is disabled.*/
        this._protected = false;
        /**
         * The last time keyframe was executed.
         * Maintains a relatively fixed interval with the previous value.
         */
        this._lastFrame = -1;
        this._head = new TickerListener(null, null, Infinity);
        this.deltaMS = 1 / _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].TARGET_FPMS;
        this.elapsedMS = 1 / _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].TARGET_FPMS;
        this._tick = function (time) {
            _this._requestId = null;
            if (_this.started) {
                // Invoke listeners now
                _this.update(time);
                // Listener side effects may have modified ticker state.
                if (_this.started && _this._requestId === null && _this._head.next) {
                    _this._requestId = requestAnimationFrame(_this._tick);
                }
            }
        };
    }
    /**
     * Conditionally requests a new animation frame.
     * If a frame has not already been requested, and if the internal
     * emitter has listeners, a new frame is requested.
     *
     * @private
     */
    Ticker.prototype._requestIfNeeded = function () {
        if (this._requestId === null && this._head.next) {
            // ensure callbacks get correct delta
            this.lastTime = performance.now();
            this._lastFrame = this.lastTime;
            this._requestId = requestAnimationFrame(this._tick);
        }
    };
    /**
     * Conditionally cancels a pending animation frame.
     * @private
     */
    Ticker.prototype._cancelIfNeeded = function () {
        if (this._requestId !== null) {
            cancelAnimationFrame(this._requestId);
            this._requestId = null;
        }
    };
    /**
     * Conditionally requests a new animation frame.
     * If the ticker has been started it checks if a frame has not already
     * been requested, and if the internal emitter has listeners. If these
     * conditions are met, a new frame is requested. If the ticker has not
     * been started, but autoStart is `true`, then the ticker starts now,
     * and continues with the previous conditions to request a new frame.
     *
     * @private
     */
    Ticker.prototype._startIfPossible = function () {
        if (this.started) {
            this._requestIfNeeded();
        }
        else if (this.autoStart) {
            this.start();
        }
    };
    /**
     * Register a handler for tick events. Calls continuously unless
     * it is removed or the ticker is stopped.
     *
     * @param fn - The listener function to be added for updates
     * @param context - The listener context
     * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
     * @returns This instance of a ticker
     */
    Ticker.prototype.add = function (fn, context, priority) {
        if (priority === void 0) { priority = UPDATE_PRIORITY.NORMAL; }
        return this._addListener(new TickerListener(fn, context, priority));
    };
    /**
     * Add a handler for the tick event which is only execute once.
     *
     * @param fn - The listener function to be added for one update
     * @param context - The listener context
     * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
     * @returns This instance of a ticker
     */
    Ticker.prototype.addOnce = function (fn, context, priority) {
        if (priority === void 0) { priority = UPDATE_PRIORITY.NORMAL; }
        return this._addListener(new TickerListener(fn, context, priority, true));
    };
    /**
     * Internally adds the event handler so that it can be sorted by priority.
     * Priority allows certain handler (user, AnimatedSprite, Interaction) to be run
     * before the rendering.
     *
     * @private
     * @param listener - Current listener being added.
     * @returns This instance of a ticker
     */
    Ticker.prototype._addListener = function (listener) {
        // For attaching to head
        var current = this._head.next;
        var previous = this._head;
        // Add the first item
        if (!current) {
            listener.connect(previous);
        }
        else {
            // Go from highest to lowest priority
            while (current) {
                if (listener.priority > current.priority) {
                    listener.connect(previous);
                    break;
                }
                previous = current;
                current = current.next;
            }
            // Not yet connected
            if (!listener.previous) {
                listener.connect(previous);
            }
        }
        this._startIfPossible();
        return this;
    };
    /**
     * Removes any handlers matching the function and context parameters.
     * If no handlers are left after removing, then it cancels the animation frame.
     *
     * @param fn - The listener function to be removed
     * @param context - The listener context to be removed
     * @returns This instance of a ticker
     */
    Ticker.prototype.remove = function (fn, context) {
        var listener = this._head.next;
        while (listener) {
            // We found a match, lets remove it
            // no break to delete all possible matches
            // incase a listener was added 2+ times
            if (listener.match(fn, context)) {
                listener = listener.destroy();
            }
            else {
                listener = listener.next;
            }
        }
        if (!this._head.next) {
            this._cancelIfNeeded();
        }
        return this;
    };
    Object.defineProperty(Ticker.prototype, "count", {
        /**
         * The number of listeners on this ticker, calculated by walking through linked list
         *
         * @readonly
         * @member {number}
         */
        get: function () {
            if (!this._head) {
                return 0;
            }
            var count = 0;
            var current = this._head;
            while ((current = current.next)) {
                count++;
            }
            return count;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Starts the ticker. If the ticker has listeners
     * a new animation frame is requested at this point.
     */
    Ticker.prototype.start = function () {
        if (!this.started) {
            this.started = true;
            this._requestIfNeeded();
        }
    };
    /**
     * Stops the ticker. If the ticker has requested
     * an animation frame it is canceled at this point.
     */
    Ticker.prototype.stop = function () {
        if (this.started) {
            this.started = false;
            this._cancelIfNeeded();
        }
    };
    /**
     * Destroy the ticker and don't use after this. Calling
     * this method removes all references to internal events.
     */
    Ticker.prototype.destroy = function () {
        if (!this._protected) {
            this.stop();
            var listener = this._head.next;
            while (listener) {
                listener = listener.destroy(true);
            }
            this._head.destroy();
            this._head = null;
        }
    };
    /**
     * Triggers an update. An update entails setting the
     * current {@link PIXI.Ticker#elapsedMS},
     * the current {@link PIXI.Ticker#deltaTime},
     * invoking all listeners with current deltaTime,
     * and then finally setting {@link PIXI.Ticker#lastTime}
     * with the value of currentTime that was provided.
     * This method will be called automatically by animation
     * frame callbacks if the ticker instance has been started
     * and listeners are added.
     *
     * @param {number} [currentTime=performance.now()] - the current time of execution
     */
    Ticker.prototype.update = function (currentTime) {
        if (currentTime === void 0) { currentTime = performance.now(); }
        var elapsedMS;
        // If the difference in time is zero or negative, we ignore most of the work done here.
        // If there is no valid difference, then should be no reason to let anyone know about it.
        // A zero delta, is exactly that, nothing should update.
        //
        // The difference in time can be negative, and no this does not mean time traveling.
        // This can be the result of a race condition between when an animation frame is requested
        // on the current JavaScript engine event loop, and when the ticker's start method is invoked
        // (which invokes the internal _requestIfNeeded method). If a frame is requested before
        // _requestIfNeeded is invoked, then the callback for the animation frame the ticker requests,
        // can receive a time argument that can be less than the lastTime value that was set within
        // _requestIfNeeded. This difference is in microseconds, but this is enough to cause problems.
        //
        // This check covers this browser engine timing issue, as well as if consumers pass an invalid
        // currentTime value. This may happen if consumers opt-out of the autoStart, and update themselves.
        if (currentTime > this.lastTime) {
            // Save uncapped elapsedMS for measurement
            elapsedMS = this.elapsedMS = currentTime - this.lastTime;
            // cap the milliseconds elapsed used for deltaTime
            if (elapsedMS > this._maxElapsedMS) {
                elapsedMS = this._maxElapsedMS;
            }
            elapsedMS *= this.speed;
            // If not enough time has passed, exit the function.
            // Get ready for next frame by setting _lastFrame, but based on _minElapsedMS
            // adjustment to ensure a relatively stable interval.
            if (this._minElapsedMS) {
                var delta = currentTime - this._lastFrame | 0;
                if (delta < this._minElapsedMS) {
                    return;
                }
                this._lastFrame = currentTime - (delta % this._minElapsedMS);
            }
            this.deltaMS = elapsedMS;
            this.deltaTime = this.deltaMS * _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].TARGET_FPMS;
            // Cache a local reference, in-case ticker is destroyed
            // during the emit, we can still check for head.next
            var head = this._head;
            // Invoke listeners added to internal emitter
            var listener = head.next;
            while (listener) {
                listener = listener.emit(this.deltaTime);
            }
            if (!head.next) {
                this._cancelIfNeeded();
            }
        }
        else {
            this.deltaTime = this.deltaMS = this.elapsedMS = 0;
        }
        this.lastTime = currentTime;
    };
    Object.defineProperty(Ticker.prototype, "FPS", {
        /**
         * The frames per second at which this ticker is running.
         * The default is approximately 60 in most modern browsers.
         * **Note:** This does not factor in the value of
         * {@link PIXI.Ticker#speed}, which is specific
         * to scaling {@link PIXI.Ticker#deltaTime}.
         *
         * @member {number}
         * @readonly
         */
        get: function () {
            return 1000 / this.elapsedMS;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ticker.prototype, "minFPS", {
        /**
         * Manages the maximum amount of milliseconds allowed to
         * elapse between invoking {@link PIXI.Ticker#update}.
         * This value is used to cap {@link PIXI.Ticker#deltaTime},
         * but does not effect the measured value of {@link PIXI.Ticker#FPS}.
         * When setting this property it is clamped to a value between
         * `0` and `PIXI.settings.TARGET_FPMS * 1000`.
         *
         * @member {number}
         * @default 10
         */
        get: function () {
            return 1000 / this._maxElapsedMS;
        },
        set: function (fps) {
            // Minimum must be below the maxFPS
            var minFPS = Math.min(this.maxFPS, fps);
            // Must be at least 0, but below 1 / settings.TARGET_FPMS
            var minFPMS = Math.min(Math.max(0, minFPS) / 1000, _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].TARGET_FPMS);
            this._maxElapsedMS = 1 / minFPMS;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ticker.prototype, "maxFPS", {
        /**
         * Manages the minimum amount of milliseconds required to
         * elapse between invoking {@link PIXI.Ticker#update}.
         * This will effect the measured value of {@link PIXI.Ticker#FPS}.
         * If it is set to `0`, then there is no limit; PixiJS will render as many frames as it can.
         * Otherwise it will be at least `minFPS`
         *
         * @member {number}
         * @default 0
         */
        get: function () {
            if (this._minElapsedMS) {
                return Math.round(1000 / this._minElapsedMS);
            }
            return 0;
        },
        set: function (fps) {
            if (fps === 0) {
                this._minElapsedMS = 0;
            }
            else {
                // Max must be at least the minFPS
                var maxFPS = Math.max(this.minFPS, fps);
                this._minElapsedMS = 1 / (maxFPS / 1000);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ticker, "shared", {
        /**
         * The shared ticker instance used by {@link PIXI.AnimatedSprite} and by
         * {@link PIXI.VideoResource} to update animation frames / video textures.
         *
         * It may also be used by {@link PIXI.Application} if created with the `sharedTicker` option property set to true.
         *
         * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
         * Please follow the examples for usage, including how to opt-out of auto-starting the shared ticker.
         *
         * @example
         * let ticker = PIXI.Ticker.shared;
         * // Set this to prevent starting this ticker when listeners are added.
         * // By default this is true only for the PIXI.Ticker.shared instance.
         * ticker.autoStart = false;
         * // FYI, call this to ensure the ticker is stopped. It should be stopped
         * // if you have not attempted to render anything yet.
         * ticker.stop();
         * // Call this when you are ready for a running shared ticker.
         * ticker.start();
         *
         * @example
         * // You may use the shared ticker to render...
         * let renderer = PIXI.autoDetectRenderer();
         * let stage = new PIXI.Container();
         * document.body.appendChild(renderer.view);
         * ticker.add(function (time) {
         *     renderer.render(stage);
         * });
         *
         * @example
         * // Or you can just update it manually.
         * ticker.autoStart = false;
         * ticker.stop();
         * function animate(time) {
         *     ticker.update(time);
         *     renderer.render(stage);
         *     requestAnimationFrame(animate);
         * }
         * animate(performance.now());
         *
         * @member {PIXI.Ticker}
         * @static
         */
        get: function () {
            if (!Ticker._shared) {
                var shared = Ticker._shared = new Ticker();
                shared.autoStart = true;
                shared._protected = true;
            }
            return Ticker._shared;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ticker, "system", {
        /**
         * The system ticker instance used by {@link PIXI.InteractionManager} and by
         * {@link PIXI.BasePrepare} for core timing functionality that shouldn't usually need to be paused,
         * unlike the `shared` ticker which drives visual animations and rendering which may want to be paused.
         *
         * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
         *
         * @member {PIXI.Ticker}
         * @static
         */
        get: function () {
            if (!Ticker._system) {
                var system = Ticker._system = new Ticker();
                system.autoStart = true;
                system._protected = true;
            }
            return Ticker._system;
        },
        enumerable: false,
        configurable: true
    });
    return Ticker;
}());

/**
 * Middleware for for Application Ticker.
 *
 * @example
 * import {TickerPlugin} from '@pixi/ticker';
 * import {Application} from '@pixi/app';
 * Application.registerPlugin(TickerPlugin);
 *
 * @class
 * @memberof PIXI
 */
var TickerPlugin = /** @class */ (function () {
    function TickerPlugin() {
    }
    /**
     * Initialize the plugin with scope of application instance
     *
     * @static
     * @private
     * @param {object} [options] - See application options
     */
    TickerPlugin.init = function (options) {
        var _this = this;
        // Set default
        options = Object.assign({
            autoStart: true,
            sharedTicker: false,
        }, options);
        // Create ticker setter
        Object.defineProperty(this, 'ticker', {
            set: function (ticker) {
                if (this._ticker) {
                    this._ticker.remove(this.render, this);
                }
                this._ticker = ticker;
                if (ticker) {
                    ticker.add(this.render, this, UPDATE_PRIORITY.LOW);
                }
            },
            get: function () {
                return this._ticker;
            },
        });
        /**
         * Convenience method for stopping the render.
         *
         * @method
         * @memberof PIXI.Application
         * @instance
         */
        this.stop = function () {
            _this._ticker.stop();
        };
        /**
         * Convenience method for starting the render.
         *
         * @method
         * @memberof PIXI.Application
         * @instance
         */
        this.start = function () {
            _this._ticker.start();
        };
        /**
         * Internal reference to the ticker.
         *
         * @type {PIXI.Ticker}
         * @name _ticker
         * @memberof PIXI.Application#
         * @private
         */
        this._ticker = null;
        /**
         * Ticker for doing render updates.
         *
         * @type {PIXI.Ticker}
         * @name ticker
         * @memberof PIXI.Application#
         * @default PIXI.Ticker.shared
         */
        this.ticker = options.sharedTicker ? Ticker.shared : new Ticker();
        // Start the rendering
        if (options.autoStart) {
            this.start();
        }
    };
    /**
     * Clean up the ticker, scoped to application.
     *
     * @static
     * @private
     */
    TickerPlugin.destroy = function () {
        if (this._ticker) {
            var oldTicker = this._ticker;
            this.ticker = null;
            oldTicker.destroy();
        }
    };
    return TickerPlugin;
}());


//# sourceMappingURL=ticker.js.map


/***/ }),

/***/ "./node_modules/@pixi/utils/dist/esm/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/@pixi/utils/dist/esm/utils.js ***!
  \****************************************************/
/*! exports provided: isMobile, EventEmitter, earcut, BaseTextureCache, CanvasRenderTarget, DATA_URI, ProgramCache, TextureCache, clearTextureCache, correctBlendMode, createIndicesForQuads, decomposeDataUri, deprecation, destroyTextureCache, determineCrossOrigin, getBufferType, getResolutionOfUrl, hex2rgb, hex2string, interleaveTypedArrays, isPow2, isWebGLSupported, log2, nextPow2, premultiplyBlendMode, premultiplyRgba, premultiplyTint, premultiplyTintToRgba, removeItems, rgb2hex, sayHello, sign, skipHello, string2hex, trimCanvas, uid, url */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseTextureCache", function() { return BaseTextureCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasRenderTarget", function() { return CanvasRenderTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_URI", function() { return DATA_URI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramCache", function() { return ProgramCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureCache", function() { return TextureCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTextureCache", function() { return clearTextureCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "correctBlendMode", function() { return correctBlendMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIndicesForQuads", function() { return createIndicesForQuads; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decomposeDataUri", function() { return decomposeDataUri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deprecation", function() { return deprecation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroyTextureCache", function() { return destroyTextureCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determineCrossOrigin", function() { return determineCrossOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBufferType", function() { return getBufferType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResolutionOfUrl", function() { return getResolutionOfUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hex2rgb", function() { return hex2rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hex2string", function() { return hex2string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interleaveTypedArrays", function() { return interleaveTypedArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPow2", function() { return isPow2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWebGLSupported", function() { return isWebGLSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log2", function() { return log2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextPow2", function() { return nextPow2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "premultiplyBlendMode", function() { return premultiplyBlendMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "premultiplyRgba", function() { return premultiplyRgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "premultiplyTint", function() { return premultiplyTint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "premultiplyTintToRgba", function() { return premultiplyTintToRgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeItems", function() { return removeItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb2hex", function() { return rgb2hex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sayHello", function() { return sayHello; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sign", function() { return sign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skipHello", function() { return skipHello; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "string2hex", function() { return string2hex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimCanvas", function() { return trimCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uid", function() { return uid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "url", function() { return url; });
/* harmony import */ var _pixi_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pixi/settings */ "./node_modules/@pixi/settings/dist/esm/settings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["isMobile"]; });

/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/@pixi/utils/node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return eventemitter3__WEBPACK_IMPORTED_MODULE_1___default.a; });
/* harmony import */ var earcut__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! earcut */ "./node_modules/earcut/src/earcut.js");
/* harmony import */ var earcut__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(earcut__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "earcut", function() { return earcut__WEBPACK_IMPORTED_MODULE_2___default.a; });
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _pixi_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pixi/constants */ "./node_modules/@pixi/constants/dist/esm/constants.js");
/*!
 * @pixi/utils - v6.0.2
 * Compiled Mon, 05 Apr 2021 18:17:46 UTC
 *
 * @pixi/utils is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */







/**
 * This file contains redeclared types for Node `url` and `querystring` modules. These modules
 * don't provide their own typings but instead are a part of the full Node typings. The purpose of
 * this file is to redeclare the required types to avoid having the whole Node types as a
 * dependency.
 */
var url = {
    parse: url__WEBPACK_IMPORTED_MODULE_3__["parse"],
    format: url__WEBPACK_IMPORTED_MODULE_3__["format"],
    resolve: url__WEBPACK_IMPORTED_MODULE_3__["resolve"],
};

/**
 * The prefix that denotes a URL is for a retina asset.
 *
 * @static
 * @name RETINA_PREFIX
 * @memberof PIXI.settings
 * @type {RegExp}
 * @default /@([0-9\.]+)x/
 * @example `@2x`
 */
_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].RETINA_PREFIX = /@([0-9\.]+)x/;
/**
 * Should the `failIfMajorPerformanceCaveat` flag be enabled as a context option used in the `isWebGLSupported` function.
 * If set to true, a WebGL renderer can fail to be created if the browser thinks there could be performance issues when
 * using WebGL.
 *
 * In PixiJS v6 this has changed from true to false by default, to allow WebGL to work in as many scenarios as possible.
 * However, some users may have a poor experience, for example, if a user has a gpu or driver version blacklisted by the
 * browser.
 *
 * If your application requires high performance rendering, you may wish to set this to false.
 * We recommend one of two options if you decide to set this flag to false:
 *
 * 1: Use the `pixi.js-legacy` package, which includes a Canvas renderer as a fallback in case high performance WebGL is
 *    not supported.
 *
 * 2: Call `isWebGLSupported` (which if found in the PIXI.utils package) in your code before attempting to create a PixiJS
 *    renderer, and show an error message to the user if the function returns false, explaining that their device & browser
 *    combination does not support high performance WebGL.
 *    This is a much better strategy than trying to create a PixiJS renderer and finding it then fails.
 *
 * @static
 * @name FAIL_IF_MAJOR_PERFORMANCE_CAVEAT
 * @memberof PIXI.settings
 * @type {boolean}
 * @default false
 */
_pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false;

var saidHello = false;
var VERSION = '6.0.2';
/**
 * Skips the hello message of renderers that are created after this is run.
 *
 * @function skipHello
 * @memberof PIXI.utils
 */
function skipHello() {
    saidHello = true;
}
/**
 * Logs out the version and renderer information for this running instance of PIXI.
 * If you don't want to see this message you can run `PIXI.utils.skipHello()` before
 * creating your renderer. Keep in mind that doing that will forever make you a jerk face.
 *
 * @static
 * @function sayHello
 * @memberof PIXI.utils
 * @param {string} type - The string renderer type to log.
 */
function sayHello(type) {
    var _a;
    if (saidHello) {
        return;
    }
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        var args = [
            "\n %c %c %c PixiJS " + VERSION + " - \u2730 " + type + " \u2730  %c  %c  http://www.pixijs.com/  %c %c \u2665%c\u2665%c\u2665 \n\n",
            'background: #ff66a5; padding:5px 0;',
            'background: #ff66a5; padding:5px 0;',
            'color: #ff66a5; background: #030307; padding:5px 0;',
            'background: #ff66a5; padding:5px 0;',
            'background: #ffc3dc; padding:5px 0;',
            'background: #ff66a5; padding:5px 0;',
            'color: #ff2424; background: #fff; padding:5px 0;',
            'color: #ff2424; background: #fff; padding:5px 0;',
            'color: #ff2424; background: #fff; padding:5px 0;' ];
        (_a = self.console).log.apply(_a, args);
    }
    else if (self.console) {
        self.console.log("PixiJS " + VERSION + " - " + type + " - http://www.pixijs.com/");
    }
    saidHello = true;
}

var supported;
/**
 * Helper for checking for WebGL support.
 *
 * @memberof PIXI.utils
 * @function isWebGLSupported
 * @return {boolean} Is WebGL supported.
 */
function isWebGLSupported() {
    if (typeof supported === 'undefined') {
        supported = (function supported() {
            var contextOptions = {
                stencil: true,
                failIfMajorPerformanceCaveat: _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].FAIL_IF_MAJOR_PERFORMANCE_CAVEAT,
            };
            try {
                if (!self.WebGLRenderingContext) {
                    return false;
                }
                var canvas = document.createElement('canvas');
                var gl = (canvas.getContext('webgl', contextOptions)
                    || canvas.getContext('experimental-webgl', contextOptions));
                var success = !!(gl && gl.getContextAttributes().stencil);
                if (gl) {
                    var loseContext = gl.getExtension('WEBGL_lose_context');
                    if (loseContext) {
                        loseContext.loseContext();
                    }
                }
                gl = null;
                return success;
            }
            catch (e) {
                return false;
            }
        })();
    }
    return supported;
}

var aliceblue = "#f0f8ff";
var antiquewhite = "#faebd7";
var aqua = "#00ffff";
var aquamarine = "#7fffd4";
var azure = "#f0ffff";
var beige = "#f5f5dc";
var bisque = "#ffe4c4";
var black = "#000000";
var blanchedalmond = "#ffebcd";
var blue = "#0000ff";
var blueviolet = "#8a2be2";
var brown = "#a52a2a";
var burlywood = "#deb887";
var cadetblue = "#5f9ea0";
var chartreuse = "#7fff00";
var chocolate = "#d2691e";
var coral = "#ff7f50";
var cornflowerblue = "#6495ed";
var cornsilk = "#fff8dc";
var crimson = "#dc143c";
var cyan = "#00ffff";
var darkblue = "#00008b";
var darkcyan = "#008b8b";
var darkgoldenrod = "#b8860b";
var darkgray = "#a9a9a9";
var darkgreen = "#006400";
var darkgrey = "#a9a9a9";
var darkkhaki = "#bdb76b";
var darkmagenta = "#8b008b";
var darkolivegreen = "#556b2f";
var darkorange = "#ff8c00";
var darkorchid = "#9932cc";
var darkred = "#8b0000";
var darksalmon = "#e9967a";
var darkseagreen = "#8fbc8f";
var darkslateblue = "#483d8b";
var darkslategray = "#2f4f4f";
var darkslategrey = "#2f4f4f";
var darkturquoise = "#00ced1";
var darkviolet = "#9400d3";
var deeppink = "#ff1493";
var deepskyblue = "#00bfff";
var dimgray = "#696969";
var dimgrey = "#696969";
var dodgerblue = "#1e90ff";
var firebrick = "#b22222";
var floralwhite = "#fffaf0";
var forestgreen = "#228b22";
var fuchsia = "#ff00ff";
var gainsboro = "#dcdcdc";
var ghostwhite = "#f8f8ff";
var goldenrod = "#daa520";
var gold = "#ffd700";
var gray = "#808080";
var green = "#008000";
var greenyellow = "#adff2f";
var grey = "#808080";
var honeydew = "#f0fff0";
var hotpink = "#ff69b4";
var indianred = "#cd5c5c";
var indigo = "#4b0082";
var ivory = "#fffff0";
var khaki = "#f0e68c";
var lavenderblush = "#fff0f5";
var lavender = "#e6e6fa";
var lawngreen = "#7cfc00";
var lemonchiffon = "#fffacd";
var lightblue = "#add8e6";
var lightcoral = "#f08080";
var lightcyan = "#e0ffff";
var lightgoldenrodyellow = "#fafad2";
var lightgray = "#d3d3d3";
var lightgreen = "#90ee90";
var lightgrey = "#d3d3d3";
var lightpink = "#ffb6c1";
var lightsalmon = "#ffa07a";
var lightseagreen = "#20b2aa";
var lightskyblue = "#87cefa";
var lightslategray = "#778899";
var lightslategrey = "#778899";
var lightsteelblue = "#b0c4de";
var lightyellow = "#ffffe0";
var lime = "#00ff00";
var limegreen = "#32cd32";
var linen = "#faf0e6";
var magenta = "#ff00ff";
var maroon = "#800000";
var mediumaquamarine = "#66cdaa";
var mediumblue = "#0000cd";
var mediumorchid = "#ba55d3";
var mediumpurple = "#9370db";
var mediumseagreen = "#3cb371";
var mediumslateblue = "#7b68ee";
var mediumspringgreen = "#00fa9a";
var mediumturquoise = "#48d1cc";
var mediumvioletred = "#c71585";
var midnightblue = "#191970";
var mintcream = "#f5fffa";
var mistyrose = "#ffe4e1";
var moccasin = "#ffe4b5";
var navajowhite = "#ffdead";
var navy = "#000080";
var oldlace = "#fdf5e6";
var olive = "#808000";
var olivedrab = "#6b8e23";
var orange = "#ffa500";
var orangered = "#ff4500";
var orchid = "#da70d6";
var palegoldenrod = "#eee8aa";
var palegreen = "#98fb98";
var paleturquoise = "#afeeee";
var palevioletred = "#db7093";
var papayawhip = "#ffefd5";
var peachpuff = "#ffdab9";
var peru = "#cd853f";
var pink = "#ffc0cb";
var plum = "#dda0dd";
var powderblue = "#b0e0e6";
var purple = "#800080";
var rebeccapurple = "#663399";
var red = "#ff0000";
var rosybrown = "#bc8f8f";
var royalblue = "#4169e1";
var saddlebrown = "#8b4513";
var salmon = "#fa8072";
var sandybrown = "#f4a460";
var seagreen = "#2e8b57";
var seashell = "#fff5ee";
var sienna = "#a0522d";
var silver = "#c0c0c0";
var skyblue = "#87ceeb";
var slateblue = "#6a5acd";
var slategray = "#708090";
var slategrey = "#708090";
var snow = "#fffafa";
var springgreen = "#00ff7f";
var steelblue = "#4682b4";
var tan = "#d2b48c";
var teal = "#008080";
var thistle = "#d8bfd8";
var tomato = "#ff6347";
var turquoise = "#40e0d0";
var violet = "#ee82ee";
var wheat = "#f5deb3";
var white = "#ffffff";
var whitesmoke = "#f5f5f5";
var yellow = "#ffff00";
var yellowgreen = "#9acd32";
var cssColorNames = {
	aliceblue: aliceblue,
	antiquewhite: antiquewhite,
	aqua: aqua,
	aquamarine: aquamarine,
	azure: azure,
	beige: beige,
	bisque: bisque,
	black: black,
	blanchedalmond: blanchedalmond,
	blue: blue,
	blueviolet: blueviolet,
	brown: brown,
	burlywood: burlywood,
	cadetblue: cadetblue,
	chartreuse: chartreuse,
	chocolate: chocolate,
	coral: coral,
	cornflowerblue: cornflowerblue,
	cornsilk: cornsilk,
	crimson: crimson,
	cyan: cyan,
	darkblue: darkblue,
	darkcyan: darkcyan,
	darkgoldenrod: darkgoldenrod,
	darkgray: darkgray,
	darkgreen: darkgreen,
	darkgrey: darkgrey,
	darkkhaki: darkkhaki,
	darkmagenta: darkmagenta,
	darkolivegreen: darkolivegreen,
	darkorange: darkorange,
	darkorchid: darkorchid,
	darkred: darkred,
	darksalmon: darksalmon,
	darkseagreen: darkseagreen,
	darkslateblue: darkslateblue,
	darkslategray: darkslategray,
	darkslategrey: darkslategrey,
	darkturquoise: darkturquoise,
	darkviolet: darkviolet,
	deeppink: deeppink,
	deepskyblue: deepskyblue,
	dimgray: dimgray,
	dimgrey: dimgrey,
	dodgerblue: dodgerblue,
	firebrick: firebrick,
	floralwhite: floralwhite,
	forestgreen: forestgreen,
	fuchsia: fuchsia,
	gainsboro: gainsboro,
	ghostwhite: ghostwhite,
	goldenrod: goldenrod,
	gold: gold,
	gray: gray,
	green: green,
	greenyellow: greenyellow,
	grey: grey,
	honeydew: honeydew,
	hotpink: hotpink,
	indianred: indianred,
	indigo: indigo,
	ivory: ivory,
	khaki: khaki,
	lavenderblush: lavenderblush,
	lavender: lavender,
	lawngreen: lawngreen,
	lemonchiffon: lemonchiffon,
	lightblue: lightblue,
	lightcoral: lightcoral,
	lightcyan: lightcyan,
	lightgoldenrodyellow: lightgoldenrodyellow,
	lightgray: lightgray,
	lightgreen: lightgreen,
	lightgrey: lightgrey,
	lightpink: lightpink,
	lightsalmon: lightsalmon,
	lightseagreen: lightseagreen,
	lightskyblue: lightskyblue,
	lightslategray: lightslategray,
	lightslategrey: lightslategrey,
	lightsteelblue: lightsteelblue,
	lightyellow: lightyellow,
	lime: lime,
	limegreen: limegreen,
	linen: linen,
	magenta: magenta,
	maroon: maroon,
	mediumaquamarine: mediumaquamarine,
	mediumblue: mediumblue,
	mediumorchid: mediumorchid,
	mediumpurple: mediumpurple,
	mediumseagreen: mediumseagreen,
	mediumslateblue: mediumslateblue,
	mediumspringgreen: mediumspringgreen,
	mediumturquoise: mediumturquoise,
	mediumvioletred: mediumvioletred,
	midnightblue: midnightblue,
	mintcream: mintcream,
	mistyrose: mistyrose,
	moccasin: moccasin,
	navajowhite: navajowhite,
	navy: navy,
	oldlace: oldlace,
	olive: olive,
	olivedrab: olivedrab,
	orange: orange,
	orangered: orangered,
	orchid: orchid,
	palegoldenrod: palegoldenrod,
	palegreen: palegreen,
	paleturquoise: paleturquoise,
	palevioletred: palevioletred,
	papayawhip: papayawhip,
	peachpuff: peachpuff,
	peru: peru,
	pink: pink,
	plum: plum,
	powderblue: powderblue,
	purple: purple,
	rebeccapurple: rebeccapurple,
	red: red,
	rosybrown: rosybrown,
	royalblue: royalblue,
	saddlebrown: saddlebrown,
	salmon: salmon,
	sandybrown: sandybrown,
	seagreen: seagreen,
	seashell: seashell,
	sienna: sienna,
	silver: silver,
	skyblue: skyblue,
	slateblue: slateblue,
	slategray: slategray,
	slategrey: slategrey,
	snow: snow,
	springgreen: springgreen,
	steelblue: steelblue,
	tan: tan,
	teal: teal,
	thistle: thistle,
	tomato: tomato,
	turquoise: turquoise,
	violet: violet,
	wheat: wheat,
	white: white,
	whitesmoke: whitesmoke,
	yellow: yellow,
	yellowgreen: yellowgreen
};

/**
 * Converts a hexadecimal color number to an [R, G, B] array of normalized floats (numbers from 0.0 to 1.0).
 *
 * @example
 * PIXI.utils.hex2rgb(0xffffff); // returns [1, 1, 1]
 * @memberof PIXI.utils
 * @function hex2rgb
 * @param {number} hex - The hexadecimal number to convert
 * @param  {number[]} [out=[]] - If supplied, this array will be used rather than returning a new one
 * @return {number[]} An array representing the [R, G, B] of the color where all values are floats.
 */
function hex2rgb(hex, out) {
    if (out === void 0) { out = []; }
    out[0] = ((hex >> 16) & 0xFF) / 255;
    out[1] = ((hex >> 8) & 0xFF) / 255;
    out[2] = (hex & 0xFF) / 255;
    return out;
}
/**
 * Converts a hexadecimal color number to a string.
 *
 * @example
 * PIXI.utils.hex2string(0xffffff); // returns "#ffffff"
 * @memberof PIXI.utils
 * @function hex2string
 * @param {number} hex - Number in hex (e.g., `0xffffff`)
 * @return {string} The string color (e.g., `"#ffffff"`).
 */
function hex2string(hex) {
    var hexString = hex.toString(16);
    hexString = '000000'.substr(0, 6 - hexString.length) + hexString;
    return "#" + hexString;
}
/**
 * Converts a string to a hexadecimal color number.
 * It can handle:
 *  hex strings starting with #: "#ffffff"
 *  hex strings starting with 0x: "0xffffff"
 *  hex strings without prefix: "ffffff"
 *  css colors: "black"
 *
 * @example
 * PIXI.utils.string2hex("#ffffff"); // returns 0xffffff
 * @memberof PIXI.utils
 * @function string2hex
 * @param {string} string - The string color (e.g., `"#ffffff"`)
 * @return {number} Number in hexadecimal.
 */
function string2hex(string) {
    if (typeof string === 'string') {
        string = cssColorNames[string.toLowerCase()] || string;
        if (string[0] === '#') {
            string = string.substr(1);
        }
    }
    return parseInt(string, 16);
}
/**
 * Converts a color as an [R, G, B] array of normalized floats to a hexadecimal number.
 *
 * @example
 * PIXI.utils.rgb2hex([1, 1, 1]); // returns 0xffffff
 * @memberof PIXI.utils
 * @function rgb2hex
 * @param {number[]} rgb - Array of numbers where all values are normalized floats from 0.0 to 1.0.
 * @return {number} Number in hexadecimal.
 */
function rgb2hex(rgb) {
    return (((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + (rgb[2] * 255 | 0));
}

/**
 * Corrects PixiJS blend, takes premultiplied alpha into account
 *
 * @memberof PIXI.utils
 * @function mapPremultipliedBlendModes
 * @private
 * @return {Array<number[]>} Mapped modes.
 */
function mapPremultipliedBlendModes() {
    var pm = [];
    var npm = [];
    for (var i = 0; i < 32; i++) {
        pm[i] = i;
        npm[i] = i;
    }
    pm[_pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].NORMAL_NPM] = _pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].NORMAL;
    pm[_pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].ADD_NPM] = _pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].ADD;
    pm[_pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].SCREEN_NPM] = _pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].SCREEN;
    npm[_pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].NORMAL] = _pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].NORMAL_NPM;
    npm[_pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].ADD] = _pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].ADD_NPM;
    npm[_pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].SCREEN] = _pixi_constants__WEBPACK_IMPORTED_MODULE_4__["BLEND_MODES"].SCREEN_NPM;
    var array = [];
    array.push(npm);
    array.push(pm);
    return array;
}
/**
 * maps premultiply flag and blendMode to adjusted blendMode
 * @memberof PIXI.utils
 * @const premultiplyBlendMode
 * @type {Array<number[]>}
 */
var premultiplyBlendMode = mapPremultipliedBlendModes();
/**
 * changes blendMode according to texture format
 *
 * @memberof PIXI.utils
 * @function correctBlendMode
 * @param {number} blendMode - supposed blend mode
 * @param {boolean} premultiplied - whether source is premultiplied
 * @returns {number} true blend mode for this texture
 */
function correctBlendMode(blendMode, premultiplied) {
    return premultiplyBlendMode[premultiplied ? 1 : 0][blendMode];
}
/**
 * combines rgb and alpha to out array
 *
 * @memberof PIXI.utils
 * @function premultiplyRgba
 * @param {Float32Array|number[]} rgb - input rgb
 * @param {number} alpha - alpha param
 * @param {Float32Array} [out] - output
 * @param {boolean} [premultiply=true] - do premultiply it
 * @returns {Float32Array} vec4 rgba
 */
function premultiplyRgba(rgb, alpha, out, premultiply) {
    out = out || new Float32Array(4);
    if (premultiply || premultiply === undefined) {
        out[0] = rgb[0] * alpha;
        out[1] = rgb[1] * alpha;
        out[2] = rgb[2] * alpha;
    }
    else {
        out[0] = rgb[0];
        out[1] = rgb[1];
        out[2] = rgb[2];
    }
    out[3] = alpha;
    return out;
}
/**
 * premultiplies tint
 *
 * @memberof PIXI.utils
 * @function premultiplyTint
 * @param {number} tint - integer RGB
 * @param {number} alpha - floating point alpha (0.0-1.0)
 * @returns {number} tint multiplied by alpha
 */
function premultiplyTint(tint, alpha) {
    if (alpha === 1.0) {
        return (alpha * 255 << 24) + tint;
    }
    if (alpha === 0.0) {
        return 0;
    }
    var R = ((tint >> 16) & 0xFF);
    var G = ((tint >> 8) & 0xFF);
    var B = (tint & 0xFF);
    R = ((R * alpha) + 0.5) | 0;
    G = ((G * alpha) + 0.5) | 0;
    B = ((B * alpha) + 0.5) | 0;
    return (alpha * 255 << 24) + (R << 16) + (G << 8) + B;
}
/**
 * converts integer tint and float alpha to vec4 form, premultiplies by default
 *
 * @memberof PIXI.utils
 * @function premultiplyTintToRgba
 * @param {number} tint - input tint
 * @param {number} alpha - alpha param
 * @param {Float32Array} [out] - output
 * @param {boolean} [premultiply=true] - do premultiply it
 * @returns {Float32Array} vec4 rgba
 */
function premultiplyTintToRgba(tint, alpha, out, premultiply) {
    out = out || new Float32Array(4);
    out[0] = ((tint >> 16) & 0xFF) / 255.0;
    out[1] = ((tint >> 8) & 0xFF) / 255.0;
    out[2] = (tint & 0xFF) / 255.0;
    if (premultiply || premultiply === undefined) {
        out[0] *= alpha;
        out[1] *= alpha;
        out[2] *= alpha;
    }
    out[3] = alpha;
    return out;
}

/**
 * Generic Mask Stack data structure
 *
 * @memberof PIXI.utils
 * @function createIndicesForQuads
 * @param {number} size - Number of quads
 * @param {Uint16Array|Uint32Array} [outBuffer] - Buffer for output, length has to be `6 * size`
 * @return {Uint16Array|Uint32Array} - Resulting index buffer
 */
function createIndicesForQuads(size, outBuffer) {
    if (outBuffer === void 0) { outBuffer = null; }
    // the total number of indices in our array, there are 6 points per quad.
    var totalIndices = size * 6;
    outBuffer = outBuffer || new Uint16Array(totalIndices);
    if (outBuffer.length !== totalIndices) {
        throw new Error("Out buffer length is incorrect, got " + outBuffer.length + " and expected " + totalIndices);
    }
    // fill the indices with the quads to draw
    for (var i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
        outBuffer[i + 0] = j + 0;
        outBuffer[i + 1] = j + 1;
        outBuffer[i + 2] = j + 2;
        outBuffer[i + 3] = j + 0;
        outBuffer[i + 4] = j + 2;
        outBuffer[i + 5] = j + 3;
    }
    return outBuffer;
}

function getBufferType(array) {
    if (array.BYTES_PER_ELEMENT === 4) {
        if (array instanceof Float32Array) {
            return 'Float32Array';
        }
        else if (array instanceof Uint32Array) {
            return 'Uint32Array';
        }
        return 'Int32Array';
    }
    else if (array.BYTES_PER_ELEMENT === 2) {
        if (array instanceof Uint16Array) {
            return 'Uint16Array';
        }
    }
    else if (array.BYTES_PER_ELEMENT === 1) {
        if (array instanceof Uint8Array) {
            return 'Uint8Array';
        }
    }
    // TODO map out the rest of the array elements!
    return null;
}

/* eslint-disable object-shorthand */
var map = { Float32Array: Float32Array, Uint32Array: Uint32Array, Int32Array: Int32Array, Uint8Array: Uint8Array };
function interleaveTypedArrays(arrays, sizes) {
    var outSize = 0;
    var stride = 0;
    var views = {};
    for (var i = 0; i < arrays.length; i++) {
        stride += sizes[i];
        outSize += arrays[i].length;
    }
    var buffer = new ArrayBuffer(outSize * 4);
    var out = null;
    var littleOffset = 0;
    for (var i = 0; i < arrays.length; i++) {
        var size = sizes[i];
        var array = arrays[i];
        /*
        @todo This is unsafe casting but consistent with how the code worked previously. Should it stay this way
              or should and `getBufferTypeUnsafe` function be exposed that throws an Error if unsupported type is passed?
         */
        var type = getBufferType(array);
        if (!views[type]) {
            views[type] = new map[type](buffer);
        }
        out = views[type];
        for (var j = 0; j < array.length; j++) {
            var indexStart = ((j / size | 0) * stride) + littleOffset;
            var index = j % size;
            out[indexStart + index] = array[j];
        }
        littleOffset += size;
    }
    return new Float32Array(buffer);
}

// Taken from the bit-twiddle package
/**
 * Rounds to next power of two.
 *
 * @function nextPow2
 * @memberof PIXI.utils
 * @param {number} v - input value
 * @return {number}
 */
function nextPow2(v) {
    v += v === 0 ? 1 : 0;
    --v;
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;
    return v + 1;
}
/**
 * Checks if a number is a power of two.
 *
 * @function isPow2
 * @memberof PIXI.utils
 * @param {number} v - input value
 * @return {boolean} `true` if value is power of two
 */
function isPow2(v) {
    return !(v & (v - 1)) && (!!v);
}
/**
 * Computes ceil of log base 2
 *
 * @function log2
 * @memberof PIXI.utils
 * @param {number} v - input value
 * @return {number} logarithm base 2
 */
function log2(v) {
    var r = (v > 0xFFFF ? 1 : 0) << 4;
    v >>>= r;
    var shift = (v > 0xFF ? 1 : 0) << 3;
    v >>>= shift;
    r |= shift;
    shift = (v > 0xF ? 1 : 0) << 2;
    v >>>= shift;
    r |= shift;
    shift = (v > 0x3 ? 1 : 0) << 1;
    v >>>= shift;
    r |= shift;
    return r | (v >> 1);
}

/**
 * Remove items from a javascript array without generating garbage
 *
 * @function removeItems
 * @memberof PIXI.utils
 * @param {Array<any>} arr - Array to remove elements from
 * @param {number} startIdx - starting index
 * @param {number} removeCount - how many to remove
 */
function removeItems(arr, startIdx, removeCount) {
    var length = arr.length;
    var i;
    if (startIdx >= length || removeCount === 0) {
        return;
    }
    removeCount = (startIdx + removeCount > length ? length - startIdx : removeCount);
    var len = length - removeCount;
    for (i = startIdx; i < len; ++i) {
        arr[i] = arr[i + removeCount];
    }
    arr.length = len;
}

/**
 * Returns sign of number
 *
 * @memberof PIXI.utils
 * @function sign
 * @param {number} n - the number to check the sign of
 * @returns {number} 0 if `n` is 0, -1 if `n` is negative, 1 if `n` is positive
 */
function sign(n) {
    if (n === 0)
        { return 0; }
    return n < 0 ? -1 : 1;
}

var nextUid = 0;
/**
 * Gets the next unique identifier
 *
 * @memberof PIXI.utils
 * @function uid
 * @return {number} The next unique identifier to use.
 */
function uid() {
    return ++nextUid;
}

// A map of warning messages already fired
var warnings = {};
/**
 * Helper for warning developers about deprecated features & settings.
 * A stack track for warnings is given; useful for tracking-down where
 * deprecated methods/properties/classes are being used within the code.
 *
 * @memberof PIXI.utils
 * @function deprecation
 * @param {string} version - The version where the feature became deprecated
 * @param {string} message - Message should include what is deprecated, where, and the new solution
 * @param {number} [ignoreDepth=3] - The number of steps to ignore at the top of the error stack
 *        this is mostly to ignore internal deprecation calls.
 */
function deprecation(version, message, ignoreDepth) {
    if (ignoreDepth === void 0) { ignoreDepth = 3; }
    // Ignore duplicat
    if (warnings[message]) {
        return;
    }
    /* eslint-disable no-console */
    var stack = new Error().stack;
    // Handle IE < 10 and Safari < 6
    if (typeof stack === 'undefined') {
        console.warn('PixiJS Deprecation Warning: ', message + "\nDeprecated since v" + version);
    }
    else {
        // chop off the stack trace which includes PixiJS internal calls
        stack = stack.split('\n').splice(ignoreDepth).join('\n');
        if (console.groupCollapsed) {
            console.groupCollapsed('%cPixiJS Deprecation Warning: %c%s', 'color:#614108;background:#fffbe6', 'font-weight:normal;color:#614108;background:#fffbe6', message + "\nDeprecated since v" + version);
            console.warn(stack);
            console.groupEnd();
        }
        else {
            console.warn('PixiJS Deprecation Warning: ', message + "\nDeprecated since v" + version);
            console.warn(stack);
        }
    }
    /* eslint-enable no-console */
    warnings[message] = true;
}

/**
 * @todo Describe property usage
 *
 * @static
 * @name ProgramCache
 * @memberof PIXI.utils
 * @type {Object}
 */
var ProgramCache = {};
/**
 * @todo Describe property usage
 *
 * @static
 * @name TextureCache
 * @memberof PIXI.utils
 * @type {Object}
 */
var TextureCache = Object.create(null);
/**
 * @todo Describe property usage
 *
 * @static
 * @name BaseTextureCache
 * @memberof PIXI.utils
 * @type {Object}
 */
var BaseTextureCache = Object.create(null);
/**
 * Destroys all texture in the cache
 *
 * @memberof PIXI.utils
 * @function destroyTextureCache
 */
function destroyTextureCache() {
    var key;
    for (key in TextureCache) {
        TextureCache[key].destroy();
    }
    for (key in BaseTextureCache) {
        BaseTextureCache[key].destroy();
    }
}
/**
 * Removes all textures from cache, but does not destroy them
 *
 * @memberof PIXI.utils
 * @function clearTextureCache
 */
function clearTextureCache() {
    var key;
    for (key in TextureCache) {
        delete TextureCache[key];
    }
    for (key in BaseTextureCache) {
        delete BaseTextureCache[key];
    }
}

/**
 * Creates a Canvas element of the given size to be used as a target for rendering to.
 *
 * @class
 * @memberof PIXI.utils
 */
var CanvasRenderTarget = /** @class */ (function () {
    /**
     * @param width - the width for the newly created canvas
     * @param height - the height for the newly created canvas
     * @param {number} [resolution=1] - The resolution / device pixel ratio of the canvas
     */
    function CanvasRenderTarget(width, height, resolution) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.resolution = resolution || _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].RESOLUTION;
        this.resize(width, height);
    }
    /**
     * Clears the canvas that was created by the CanvasRenderTarget class.
     *
     * @private
     */
    CanvasRenderTarget.prototype.clear = function () {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    /**
     * Resizes the canvas to the specified width and height.
     *
     * @param width - the new width of the canvas
     * @param height - the new height of the canvas
     */
    CanvasRenderTarget.prototype.resize = function (width, height) {
        this.canvas.width = width * this.resolution;
        this.canvas.height = height * this.resolution;
    };
    /** Destroys this canvas. */
    CanvasRenderTarget.prototype.destroy = function () {
        this.context = null;
        this.canvas = null;
    };
    Object.defineProperty(CanvasRenderTarget.prototype, "width", {
        /**
         * The width of the canvas buffer in pixels.
         *
         * @member {number}
         */
        get: function () {
            return this.canvas.width;
        },
        set: function (val) {
            this.canvas.width = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CanvasRenderTarget.prototype, "height", {
        /**
         * The height of the canvas buffer in pixels.
         *
         * @member {number}
         */
        get: function () {
            return this.canvas.height;
        },
        set: function (val) {
            this.canvas.height = val;
        },
        enumerable: false,
        configurable: true
    });
    return CanvasRenderTarget;
}());

/**
 * Trim transparent borders from a canvas
 *
 * @memberof PIXI.utils
 * @function trimCanvas
 * @param {HTMLCanvasElement} canvas - the canvas to trim
 * @returns {object} Trim data
 */
function trimCanvas(canvas) {
    // https://gist.github.com/remy/784508
    var width = canvas.width;
    var height = canvas.height;
    var context = canvas.getContext('2d');
    var imageData = context.getImageData(0, 0, width, height);
    var pixels = imageData.data;
    var len = pixels.length;
    var bound = {
        top: null,
        left: null,
        right: null,
        bottom: null,
    };
    var data = null;
    var i;
    var x;
    var y;
    for (i = 0; i < len; i += 4) {
        if (pixels[i + 3] !== 0) {
            x = (i / 4) % width;
            y = ~~((i / 4) / width);
            if (bound.top === null) {
                bound.top = y;
            }
            if (bound.left === null) {
                bound.left = x;
            }
            else if (x < bound.left) {
                bound.left = x;
            }
            if (bound.right === null) {
                bound.right = x + 1;
            }
            else if (bound.right < x) {
                bound.right = x + 1;
            }
            if (bound.bottom === null) {
                bound.bottom = y;
            }
            else if (bound.bottom < y) {
                bound.bottom = y;
            }
        }
    }
    if (bound.top !== null) {
        width = bound.right - bound.left;
        height = bound.bottom - bound.top + 1;
        data = context.getImageData(bound.left, bound.top, width, height);
    }
    return {
        height: height,
        width: width,
        data: data,
    };
}

/**
 * Regexp for data URI.
 * Based on: {@link https://github.com/ragingwind/data-uri-regex}
 *
 * @static
 * @constant {RegExp|string} DATA_URI
 * @memberof PIXI
 * @example data:image/png;base64
 */
var DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;

/**
 * @memberof PIXI.utils
 * @interface DecomposedDataUri
 */
/**
 * type, eg. `image`
 * @memberof PIXI.utils.DecomposedDataUri#
 * @member {string} mediaType
 */
/**
 * Sub type, eg. `png`
 * @memberof PIXI.utils.DecomposedDataUri#
 * @member {string} subType
 */
/**
 * @memberof PIXI.utils.DecomposedDataUri#
 * @member {string} charset
 */
/**
 * Data encoding, eg. `base64`
 * @memberof PIXI.utils.DecomposedDataUri#
 * @member {string} encoding
 */
/**
 * The actual data
 * @memberof PIXI.utils.DecomposedDataUri#
 * @member {string} data
 */
/**
 * Split a data URI into components. Returns undefined if
 * parameter `dataUri` is not a valid data URI.
 *
 * @memberof PIXI.utils
 * @function decomposeDataUri
 * @param {string} dataUri - the data URI to check
 * @return {PIXI.utils.DecomposedDataUri|undefined} The decomposed data uri or undefined
 */
function decomposeDataUri(dataUri) {
    var dataUriMatch = DATA_URI.exec(dataUri);
    if (dataUriMatch) {
        return {
            mediaType: dataUriMatch[1] ? dataUriMatch[1].toLowerCase() : undefined,
            subType: dataUriMatch[2] ? dataUriMatch[2].toLowerCase() : undefined,
            charset: dataUriMatch[3] ? dataUriMatch[3].toLowerCase() : undefined,
            encoding: dataUriMatch[4] ? dataUriMatch[4].toLowerCase() : undefined,
            data: dataUriMatch[5],
        };
    }
    return undefined;
}

var tempAnchor;
/**
 * Sets the `crossOrigin` property for this resource based on if the url
 * for this resource is cross-origin. If crossOrigin was manually set, this
 * function does nothing.
 * Nipped from the resource loader!
 *
 * @ignore
 * @param {string} url - The url to test.
 * @param {object} [loc=window.location] - The location object to test against.
 * @return {string} The crossOrigin value to use (or empty string for none).
 */
function determineCrossOrigin(url$1, loc) {
    if (loc === void 0) { loc = self.location; }
    // data: and javascript: urls are considered same-origin
    if (url$1.indexOf('data:') === 0) {
        return '';
    }
    // default is window.location
    loc = loc || self.location;
    if (!tempAnchor) {
        tempAnchor = document.createElement('a');
    }
    // let the browser determine the full href for the url of this resource and then
    // parse with the node url lib, we can't use the properties of the anchor element
    // because they don't work in IE9 :(
    tempAnchor.href = url$1;
    var parsedUrl = url.parse(tempAnchor.href);
    var samePort = (!parsedUrl.port && loc.port === '') || (parsedUrl.port === loc.port);
    // if cross origin
    if (parsedUrl.hostname !== loc.hostname || !samePort || parsedUrl.protocol !== loc.protocol) {
        return 'anonymous';
    }
    return '';
}

/**
 * get the resolution / device pixel ratio of an asset by looking for the prefix
 * used by spritesheets and image urls
 *
 * @memberof PIXI.utils
 * @function getResolutionOfUrl
 * @param {string} url - the image path
 * @param {number} [defaultValue=1] - the defaultValue if no filename prefix is set.
 * @return {number} resolution / device pixel ratio of an asset
 */
function getResolutionOfUrl(url, defaultValue) {
    var resolution = _pixi_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].RETINA_PREFIX.exec(url);
    if (resolution) {
        return parseFloat(resolution[1]);
    }
    return defaultValue !== undefined ? defaultValue : 1;
}


//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./node_modules/@pixi/utils/node_modules/eventemitter3/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@pixi/utils/node_modules/eventemitter3/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/earcut/src/earcut.js":
/*!*******************************************!*\
  !*** ./node_modules/earcut/src/earcut.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = earcut;
module.exports.default = earcut;

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode || outerNode.next === outerNode.prev) return triangles;

    var minX, minY, maxX, maxY, x, y, invSize;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and invSize are later used to transform coords into integers for z-order calculation
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 1 / invSize : 0;
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) break;
            again = true;

        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            // skipping the next vertex leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, invSize) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = zOrder(minTX, minTY, minX, minY, invSize),
        maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);

    var p = ear.prevZ,
        n = ear.nextZ;

    // look for points inside the triangle in both directions
    while (p && p.z >= minZ && n && n.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;

        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    // look for remaining points in decreasing z-order
    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    // look for remaining points in increasing z-order
    while (n && n.z <= maxZ) {
        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return filterPoints(p);
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, invSize);
                earcutLinked(c, triangles, dim, minX, minY, invSize);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);

        // filter collinear points around the cuts
        filterPoints(outerNode, outerNode.next);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m; // hole touches outer segment; pick leftmost endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m;

    do {
        if (hx >= p.x && p.x >= mx && hx !== p.x &&
                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if (locallyInside(p, hole) &&
                (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && sectorContainsSector(m, p)))))) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    } while (p !== stop);

    return m;
}

// whether sector in vertex m contains sector in vertex p in the same coordinates
function sectorContainsSector(m, p) {
    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, invSize) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }
            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;

    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and inverse of the longer side of data bbox
function zOrder(x, y, minX, minY, invSize) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) * invSize;
    y = 32767 * (y - minY) * invSize;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // dones't intersect other edges
           (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
            (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
            equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0); // special zero-length case
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    var o1 = sign(area(p1, q1, p2));
    var o2 = sign(area(p1, q1, q2));
    var o3 = sign(area(p2, q2, p1));
    var o4 = sign(area(p2, q2, q1));

    if (o1 !== o2 && o3 !== o4) return true; // general case

    if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1
    if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1
    if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2
    if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

    return false;
}

// for collinear points p, q, r, check if point q lies on segment pr
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}

function sign(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
                intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertex index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertex nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
        Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim},
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};


/***/ }),

/***/ "./node_modules/ismobilejs/esm/index.js":
/*!**********************************************!*\
  !*** ./node_modules/ismobilejs/esm/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isMobile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isMobile */ "./node_modules/ismobilejs/esm/isMobile.js");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _isMobile__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ismobilejs/esm/isMobile.js":
/*!*************************************************!*\
  !*** ./node_modules/ismobilejs/esm/isMobile.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isMobile; });
var appleIphone = /iPhone/i;
var appleIpod = /iPod/i;
var appleTablet = /iPad/i;
var appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
var androidPhone = /\bAndroid(?:.+)Mobile\b/i;
var androidTablet = /Android/i;
var amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
var amazonTablet = /Silk/i;
var windowsPhone = /Windows Phone/i;
var windowsTablet = /\bWindows(?:.+)ARM\b/i;
var otherBlackBerry = /BlackBerry/i;
var otherBlackBerry10 = /BB10/i;
var otherOpera = /Opera Mini/i;
var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
var otherFirefox = /Mobile(?:.+)Firefox\b/i;
var isAppleTabletOnIos13 = function (navigator) {
    return (typeof navigator !== 'undefined' &&
        navigator.platform === 'MacIntel' &&
        typeof navigator.maxTouchPoints === 'number' &&
        navigator.maxTouchPoints > 1 &&
        typeof MSStream === 'undefined');
};
function createMatch(userAgent) {
    return function (regex) { return regex.test(userAgent); };
}
function isMobile(param) {
    var nav = {
        userAgent: '',
        platform: '',
        maxTouchPoints: 0
    };
    if (!param && typeof navigator !== 'undefined') {
        nav = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            maxTouchPoints: navigator.maxTouchPoints || 0
        };
    }
    else if (typeof param === 'string') {
        nav.userAgent = param;
    }
    else if (param && param.userAgent) {
        nav = {
            userAgent: param.userAgent,
            platform: param.platform,
            maxTouchPoints: param.maxTouchPoints || 0
        };
    }
    var userAgent = nav.userAgent;
    var tmp = userAgent.split('[FBAN');
    if (typeof tmp[1] !== 'undefined') {
        userAgent = tmp[0];
    }
    tmp = userAgent.split('Twitter');
    if (typeof tmp[1] !== 'undefined') {
        userAgent = tmp[0];
    }
    var match = createMatch(userAgent);
    var result = {
        apple: {
            phone: match(appleIphone) && !match(windowsPhone),
            ipod: match(appleIpod),
            tablet: !match(appleIphone) &&
                (match(appleTablet) || isAppleTabletOnIos13(nav)) &&
                !match(windowsPhone),
            universal: match(appleUniversal),
            device: (match(appleIphone) ||
                match(appleIpod) ||
                match(appleTablet) ||
                match(appleUniversal) ||
                isAppleTabletOnIos13(nav)) &&
                !match(windowsPhone)
        },
        amazon: {
            phone: match(amazonPhone),
            tablet: !match(amazonPhone) && match(amazonTablet),
            device: match(amazonPhone) || match(amazonTablet)
        },
        android: {
            phone: (!match(windowsPhone) && match(amazonPhone)) ||
                (!match(windowsPhone) && match(androidPhone)),
            tablet: !match(windowsPhone) &&
                !match(amazonPhone) &&
                !match(androidPhone) &&
                (match(amazonTablet) || match(androidTablet)),
            device: (!match(windowsPhone) &&
                (match(amazonPhone) ||
                    match(amazonTablet) ||
                    match(androidPhone) ||
                    match(androidTablet))) ||
                match(/\bokhttp\b/i)
        },
        windows: {
            phone: match(windowsPhone),
            tablet: match(windowsTablet),
            device: match(windowsPhone) || match(windowsTablet)
        },
        other: {
            blackberry: match(otherBlackBerry),
            blackberry10: match(otherBlackBerry10),
            opera: match(otherOpera),
            firefox: match(otherFirefox),
            chrome: match(otherChrome),
            device: match(otherBlackBerry) ||
                match(otherBlackBerry10) ||
                match(otherOpera) ||
                match(otherFirefox) ||
                match(otherChrome)
        },
        any: false,
        phone: false,
        tablet: false
    };
    result.any =
        result.apple.device ||
            result.android.device ||
            result.windows.device ||
            result.other.device;
    result.phone =
        result.apple.phone || result.android.phone || result.windows.phone;
    result.tablet =
        result.apple.tablet || result.android.tablet || result.windows.tablet;
    return result;
}
//# sourceMappingURL=isMobile.js.map

/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/inc/pixel.js":
/*!**************************!*\
  !*** ./src/inc/pixel.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return W1Pixel; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _pixi_graphics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @pixi/graphics */ "./node_modules/@pixi/graphics/dist/esm/graphics.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


/**
 * An object with some default parameters.
 *
 * @type {Object}
 */

var pixelDefaults = {
  color: 0xFFFFFF
};

var W1Pixel = /*#__PURE__*/function (_Graphics) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(W1Pixel, _Graphics);

  var _super = _createSuper(W1Pixel);

  /**
   * Class constructor.
   *
   * @param {Number} x      The position of this pixel on the X axis.
   * @param {Number} y      The position of this pixel on the Y axis.
   * @param {Number} size   The size of this pixel in height and width.
   * @param {Object} params An object of parameters.
   */
  function W1Pixel(x, y, size, params) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, W1Pixel);

    // Call the parent constructor.
    _this = _super.call(this); // Define the parameters and its defaults.

    _this.params = Object.assign({}, pixelDefaults, params);

    _this.drawPixel(size);

    _this.x = x;
    _this.y = y;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(W1Pixel, [{
    key: "drawPixel",
    value: function drawPixel(size) {
      this.beginFill(this.params.color, Math.random());
      this.drawRect(0, 0, size, size);
    }
  }]);

  return W1Pixel;
}(_pixi_graphics__WEBPACK_IMPORTED_MODULE_5__["Graphics"]);



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pixi_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pixi/app */ "./node_modules/@pixi/app/dist/esm/app.js");
/* harmony import */ var _pixi_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pixi/display */ "./node_modules/@pixi/display/dist/esm/display.js");
/* harmony import */ var _pixi_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pixi/core */ "./node_modules/@pixi/core/dist/esm/core.js");
/* harmony import */ var _pixi_ticker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pixi/ticker */ "./node_modules/@pixi/ticker/dist/esm/ticker.js");
/* harmony import */ var _inc_pixel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inc/pixel */ "./src/inc/pixel.js");
// Import external dependencies.



_pixi_core__WEBPACK_IMPORTED_MODULE_2__["Renderer"].registerPlugin('batch', _pixi_core__WEBPACK_IMPORTED_MODULE_2__["BatchRenderer"]);

_pixi_app__WEBPACK_IMPORTED_MODULE_0__["Application"].registerPlugin(_pixi_ticker__WEBPACK_IMPORTED_MODULE_3__["TickerPlugin"]); // Import internal dependencies.

 // Parse or setup some options.
// This should ideally be externalised and be modified by a window object.

var options = {
  selectorClassName: 'w1-pixel-stage',
  pixelSize: 100,
  // The default size of one pixel.
  overflow: false,
  // If we want to draw pixel over the edge of the stage.
  vAlign: 'center',
  // top, center, bottom
  hAlign: 'center' // left, center, right

}; // Stuff we want to do on load.

window.addEventListener('load', function (event) {
  var elements = document.getElementsByClassName(options.selectorClassName);
  Array.from(elements).forEach(function (element) {
    // Generate the PIXI app and add it to the DOMElement.
    var app = new _pixi_app__WEBPACK_IMPORTED_MODULE_0__["Application"]({
      resizeTo: element
    });
    element.appendChild(app.view); // Generate a pixi container to draw in.

    var container = new _pixi_display__WEBPACK_IMPORTED_MODULE_1__["Container"]();
    app.stage.addChild(container); // how many pixel can we stuff on the x axis?

    var xAmt = app.renderer.view.width / options.pixelSize;
    var yAmt = app.renderer.view.height / options.pixelSize; // Floor or ceil the amounts depending on if we want overflow or not.

    if (options.overflow) {
      xAmt = Math.ceil(xAmt);
      yAmt = Math.ceil(yAmt);
    } else {
      xAmt = Math.floor(xAmt);
      yAmt = Math.floor(yAmt);
    } // Draw the pixel and add it to the container.


    for (var y = 0; y < yAmt; y++) {
      for (var x = 0; x < xAmt; x++) {
        var graphics = new _inc_pixel__WEBPACK_IMPORTED_MODULE_4__["default"](x * options.pixelSize, y * options.pixelSize, options.pixelSize);
        container.addChild(graphics);
      }
    } // Calculate and modify the vertial alignment


    if (options.vAlign === 'center') {
      container.y = (app.renderer.view.height - container.height) / 2;
    } else if (options.vAlign === 'bottom') {
      container.y = app.renderer.view.height - container.height;
    } // Calculate and modify the horizontal alignment


    if (options.hAlign === 'center') {
      container.x = (app.renderer.view.width - container.width) / 2;
    } else if (options.hAlign === 'right') {
      container.x = app.renderer.view.width - container.width;
    }
  });
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map