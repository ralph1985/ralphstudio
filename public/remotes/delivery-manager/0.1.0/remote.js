var dn = Object.defineProperty;
var fn = (f, i, s) => i in f ? dn(f, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : f[i] = s;
var oe = (f, i, s) => fn(f, typeof i != "symbol" ? i + "" : i, s);
function hn(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var Ft = { exports: {} };
(function(f, i) {
  (function(s) {
    f.exports = s();
  })(function() {
    var s = ["navigation", "request", "process", "log", "user", "state", "error", "manual"], u = function(e, t, n) {
      for (var r = n, a = 0, c = e.length; a < c; a++) r = t(r, e[a], a, e);
      return r;
    }, l = function(e, t) {
      return u(e, function(n, r, a, c) {
        return t(r, a, c) ? n.concat(r) : n;
      }, []);
    }, p = function(e, t) {
      return u(e, function(n, r, a, c) {
        return n === !0 || r === t;
      }, !1);
    }, _ = function(e) {
      return Object.prototype.toString.call(e) === "[object Array]";
    }, O = !{
      toString: null
    }.propertyIsEnumerable("toString"), E = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], N = function(e) {
      var t = [], n;
      for (n in e)
        Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
      if (!O) return t;
      for (var r = 0, a = E.length; r < a; r++)
        Object.prototype.hasOwnProperty.call(e, E[r]) && t.push(E[r]);
      return t;
    }, R = function(e, t) {
      return e === void 0 && (e = 1), function(n) {
        return typeof n == "number" && parseInt("" + n, 10) === n && n >= e && n <= t;
      };
    }, P = function(e) {
      return typeof e == "function" || _(e) && l(e, function(t) {
        return typeof t == "function";
      }).length === e.length;
    }, H = function(e) {
      return typeof e == "string" && !!e.length;
    }, D = {}, K = function() {
      return {
        unhandledExceptions: !0,
        unhandledRejections: !0
      };
    };
    D.schema = {
      apiKey: {
        defaultValue: function() {
          return null;
        },
        message: "is required",
        validate: H
      },
      appVersion: {
        defaultValue: function() {
        },
        message: "should be a string",
        validate: function(e) {
          return e === void 0 || H(e);
        }
      },
      appType: {
        defaultValue: function() {
        },
        message: "should be a string",
        validate: function(e) {
          return e === void 0 || H(e);
        }
      },
      autoDetectErrors: {
        defaultValue: function() {
          return !0;
        },
        message: "should be true|false",
        validate: function(e) {
          return e === !0 || e === !1;
        }
      },
      enabledErrorTypes: {
        defaultValue: function() {
          return K();
        },
        message: "should be an object containing the flags { unhandledExceptions:true|false, unhandledRejections:true|false }",
        allowPartialObject: !0,
        validate: function(e) {
          if (typeof e != "object" || !e) return !1;
          var t = N(e), n = N(K());
          return !(l(t, function(r) {
            return p(n, r);
          }).length < t.length || l(N(e), function(r) {
            return typeof e[r] != "boolean";
          }).length > 0);
        }
      },
      onError: {
        defaultValue: function() {
          return [];
        },
        message: "should be a function or array of functions",
        validate: P
      },
      onSession: {
        defaultValue: function() {
          return [];
        },
        message: "should be a function or array of functions",
        validate: P
      },
      onBreadcrumb: {
        defaultValue: function() {
          return [];
        },
        message: "should be a function or array of functions",
        validate: P
      },
      endpoints: {
        defaultValue: function(e) {
          return typeof e > "u" ? {
            notify: "https://notify.bugsnag.com",
            sessions: "https://sessions.bugsnag.com"
          } : {
            notify: null,
            sessions: null
          };
        },
        message: "should be an object containing endpoint URLs { notify, sessions }",
        validate: function(e) {
          return (
            // first, ensure it's an object
            e && typeof e == "object" && // notify and sessions must always be set
            H(e.notify) && H(e.sessions) && // ensure no keys other than notify/session are set on endpoints object
            l(N(e), function(t) {
              return !p(["notify", "sessions"], t);
            }).length === 0
          );
        }
      },
      autoTrackSessions: {
        defaultValue: function(e) {
          return !0;
        },
        message: "should be true|false",
        validate: function(e) {
          return e === !0 || e === !1;
        }
      },
      enabledReleaseStages: {
        defaultValue: function() {
          return null;
        },
        message: "should be an array of strings",
        validate: function(e) {
          return e === null || _(e) && l(e, function(t) {
            return typeof t == "string";
          }).length === e.length;
        }
      },
      releaseStage: {
        defaultValue: function() {
          return "production";
        },
        message: "should be a string",
        validate: function(e) {
          return typeof e == "string" && e.length;
        }
      },
      maxBreadcrumbs: {
        defaultValue: function() {
          return 25;
        },
        message: "should be a number ≤100",
        validate: function(e) {
          return R(0, 100)(e);
        }
      },
      enabledBreadcrumbTypes: {
        defaultValue: function() {
          return s;
        },
        message: "should be null or a list of available breadcrumb types (" + s.join(",") + ")",
        validate: function(e) {
          return e === null || _(e) && u(e, function(t, n) {
            return t === !1 ? t : p(s, n);
          }, !0);
        }
      },
      context: {
        defaultValue: function() {
        },
        message: "should be a string",
        validate: function(e) {
          return e === void 0 || typeof e == "string";
        }
      },
      user: {
        defaultValue: function() {
          return {};
        },
        message: "should be an object with { id, email, name } properties",
        validate: function(e) {
          return e === null || e && u(N(e), function(t, n) {
            return t && p(["id", "email", "name"], n);
          }, !0);
        }
      },
      metadata: {
        defaultValue: function() {
          return {};
        },
        message: "should be an object",
        validate: function(e) {
          return typeof e == "object" && e !== null;
        }
      },
      logger: {
        defaultValue: function() {
        },
        message: "should be null or an object with methods { debug, info, warn, error }",
        validate: function(e) {
          return !e || e && u(["debug", "info", "warn", "error"], function(t, n) {
            return t && typeof e[n] == "function";
          }, !0);
        }
      },
      redactedKeys: {
        defaultValue: function() {
          return ["password"];
        },
        message: "should be an array of strings|regexes",
        validate: function(e) {
          return _(e) && e.length === l(e, function(t) {
            return typeof t == "string" || t && typeof t.test == "function";
          }).length;
        }
      },
      plugins: {
        defaultValue: function() {
          return [];
        },
        message: "should be an array of plugin objects",
        validate: function(e) {
          return _(e) && e.length === l(e, function(t) {
            return t && typeof t == "object" && typeof t.load == "function";
          }).length;
        }
      },
      featureFlags: {
        defaultValue: function() {
          return [];
        },
        message: 'should be an array of objects that have a "name" property',
        validate: function(e) {
          return _(e) && e.length === l(e, function(t) {
            return t && typeof t == "object" && typeof t.name == "string";
          }).length;
        }
      },
      reportUnhandledPromiseRejectionsAsHandled: {
        defaultValue: function() {
          return !1;
        },
        message: "should be true|false",
        validate: function(e) {
          return e === !0 || e === !1;
        }
      },
      sendPayloadChecksums: {
        defaultValue: function() {
          return !1;
        },
        message: "should be true|false",
        validate: function(e) {
          return e === !0 || e === !1;
        }
      }
    };
    var L = function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    }, k = function(e, t) {
      return u(e, function(n, r, a, c) {
        return n.concat(t(r, a, c));
      }, []);
    };
    function Ne() {
      return Ne = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }, Ne.apply(null, arguments);
    }
    var Pe = D.schema, Gt = {
      releaseStage: L({}, Pe.releaseStage, {
        defaultValue: function() {
          return /^localhost(:\d+)?$/.test(window.location.host) ? "development" : "production";
        }
      }),
      appType: Ne({}, Pe.appType, {
        defaultValue: function() {
          return "browser";
        }
      }),
      logger: L({}, Pe.logger, {
        defaultValue: function() {
          return (
            // set logger based on browser capability
            typeof console < "u" && typeof console.debug == "function" ? Yt() : void 0
          );
        }
      })
    }, Yt = function() {
      var e = {}, t = console.log;
      return k(["debug", "info", "warn", "error"], function(n) {
        var r = console[n];
        e[n] = typeof r == "function" ? r.bind(console, "[bugsnag]") : t.bind(console, "[bugsnag]");
      }), e;
    }, Zt = /* @__PURE__ */ function() {
      function e(n, r, a, c) {
        c === void 0 && (c = /* @__PURE__ */ new Date()), this.type = a, this.message = n, this.metadata = r, this.timestamp = c;
      }
      var t = e.prototype;
      return t.toJSON = function() {
        return {
          type: this.type,
          name: this.message,
          timestamp: this.timestamp,
          metaData: this.metadata
        };
      }, e;
    }(), we = Zt, _e = {};
    (function(e, t) {
      typeof _e == "object" ? _e = t() : e.StackFrame = t();
    })(this, function() {
      function e(m) {
        return !isNaN(parseFloat(m)) && isFinite(m);
      }
      function t(m) {
        return m.charAt(0).toUpperCase() + m.substring(1);
      }
      function n(m) {
        return function() {
          return this[m];
        };
      }
      var r = ["isConstructor", "isEval", "isNative", "isToplevel"], a = ["columnNumber", "lineNumber"], c = ["fileName", "functionName", "source"], o = ["args"], h = ["evalOrigin"], d = r.concat(a, c, o, h);
      function g(m) {
        if (m)
          for (var $ = 0; $ < d.length; $++)
            m[d[$]] !== void 0 && this["set" + t(d[$])](m[d[$]]);
      }
      g.prototype = {
        getArgs: function() {
          return this.args;
        },
        setArgs: function(m) {
          if (Object.prototype.toString.call(m) !== "[object Array]")
            throw new TypeError("Args must be an Array");
          this.args = m;
        },
        getEvalOrigin: function() {
          return this.evalOrigin;
        },
        setEvalOrigin: function(m) {
          if (m instanceof g)
            this.evalOrigin = m;
          else if (m instanceof Object)
            this.evalOrigin = new g(m);
          else
            throw new TypeError("Eval Origin must be an Object or StackFrame");
        },
        toString: function() {
          var m = this.getFileName() || "", $ = this.getLineNumber() || "", x = this.getColumnNumber() || "", S = this.getFunctionName() || "";
          return this.getIsEval() ? m ? "[eval] (" + m + ":" + $ + ":" + x + ")" : "[eval]:" + $ + ":" + x : S ? S + " (" + m + ":" + $ + ":" + x + ")" : m + ":" + $ + ":" + x;
        }
      }, g.fromString = function($) {
        var x = $.indexOf("("), S = $.lastIndexOf(")"), A = $.substring(0, x), T = $.substring(x + 1, S).split(","), w = $.substring(S + 1);
        if (w.indexOf("@") === 0)
          var M = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(w, ""), C = M[1], U = M[2], se = M[3];
        return new g({
          functionName: A,
          args: T || void 0,
          fileName: C,
          lineNumber: U || void 0,
          columnNumber: se || void 0
        });
      };
      for (var v = 0; v < r.length; v++)
        g.prototype["get" + t(r[v])] = n(r[v]), g.prototype["set" + t(r[v])] = /* @__PURE__ */ function(m) {
          return function($) {
            this[m] = !!$;
          };
        }(r[v]);
      for (var y = 0; y < a.length; y++)
        g.prototype["get" + t(a[y])] = n(a[y]), g.prototype["set" + t(a[y])] = /* @__PURE__ */ function(m) {
          return function($) {
            if (!e($))
              throw new TypeError(m + " must be a Number");
            this[m] = Number($);
          };
        }(a[y]);
      for (var b = 0; b < c.length; b++)
        g.prototype["get" + t(c[b])] = n(c[b]), g.prototype["set" + t(c[b])] = /* @__PURE__ */ function(m) {
          return function($) {
            this[m] = String($);
          };
        }(c[b]);
      return g;
    });
    var Ce = {};
    (function(e, t) {
      typeof Ce == "object" ? Ce = t(_e) : e.StackGenerator = t(e.StackFrame);
    })(this, function(e) {
      return {
        backtrace: function(n) {
          var r = [], a = 10;
          typeof n == "object" && typeof n.maxStackSize == "number" && (a = n.maxStackSize);
          for (var c = arguments.callee; c && r.length < a && c.arguments; ) {
            for (var o = new Array(c.arguments.length), h = 0; h < o.length; ++h)
              o[h] = c.arguments[h];
            /function(?:\s+([\w$]+))+\s*\(/.test(c.toString()) ? r.push(new e({
              functionName: RegExp.$1 || void 0,
              args: o
            })) : r.push(new e({
              args: o
            }));
            try {
              c = c.caller;
            } catch {
              break;
            }
          }
          return r;
        }
      };
    });
    var Te = {};
    (function(e, t) {
      typeof Te == "object" ? Te = t(_e) : e.ErrorStackParser = t(e.StackFrame);
    })(this, function(t) {
      var n = /(^|@)\S+:\d+/, r = /^\s*at .*(\S+:\d+|\(native\))/m, a = /^(eval@)?(\[native code])?$/;
      return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function(o) {
          if (typeof o.stacktrace < "u" || typeof o["opera#sourceloc"] < "u")
            return this.parseOpera(o);
          if (o.stack && o.stack.match(r))
            return this.parseV8OrIE(o);
          if (o.stack)
            return this.parseFFOrSafari(o);
          throw new Error("Cannot parse given Error object");
        },
        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function(o) {
          if (o.indexOf(":") === -1)
            return [o];
          var h = /(.+?)(?::(\d+))?(?::(\d+))?$/, d = h.exec(o.replace(/[()]/g, ""));
          return [d[1], d[2] || void 0, d[3] || void 0];
        },
        parseV8OrIE: function(o) {
          var h = o.stack.split(`
`).filter(function(d) {
            return !!d.match(r);
          }, this);
          return h.map(function(d) {
            d.indexOf("(eval ") > -1 && (d = d.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(\),.*$)/g, ""));
            var g = d.replace(/^\s+/, "").replace(/\(eval code/g, "("), v = g.match(/ (\((.+):(\d+):(\d+)\)$)/);
            g = v ? g.replace(v[0], "") : g;
            var y = g.split(/\s+/).slice(1), b = this.extractLocation(v ? v[1] : y.pop()), m = y.join(" ") || void 0, $ = ["eval", "<anonymous>"].indexOf(b[0]) > -1 ? void 0 : b[0];
            return new t({
              functionName: m,
              fileName: $,
              lineNumber: b[1],
              columnNumber: b[2],
              source: d
            });
          }, this);
        },
        parseFFOrSafari: function(o) {
          var h = o.stack.split(`
`).filter(function(d) {
            return !d.match(a);
          }, this);
          return h.map(function(d) {
            if (d.indexOf(" > eval") > -1 && (d = d.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), d.indexOf("@") === -1 && d.indexOf(":") === -1)
              return new t({
                functionName: d
              });
            var g = /((.*".+"[^@]*)?[^@]*)(?:@)/, v = d.match(g), y = v && v[1] ? v[1] : void 0, b = this.extractLocation(d.replace(g, ""));
            return new t({
              functionName: y,
              fileName: b[0],
              lineNumber: b[1],
              columnNumber: b[2],
              source: d
            });
          }, this);
        },
        parseOpera: function(o) {
          return !o.stacktrace || o.message.indexOf(`
`) > -1 && o.message.split(`
`).length > o.stacktrace.split(`
`).length ? this.parseOpera9(o) : o.stack ? this.parseOpera11(o) : this.parseOpera10(o);
        },
        parseOpera9: function(o) {
          for (var h = /Line (\d+).*script (?:in )?(\S+)/i, d = o.message.split(`
`), g = [], v = 2, y = d.length; v < y; v += 2) {
            var b = h.exec(d[v]);
            b && g.push(new t({
              fileName: b[2],
              lineNumber: b[1],
              source: d[v]
            }));
          }
          return g;
        },
        parseOpera10: function(o) {
          for (var h = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, d = o.stacktrace.split(`
`), g = [], v = 0, y = d.length; v < y; v += 2) {
            var b = h.exec(d[v]);
            b && g.push(new t({
              functionName: b[3] || void 0,
              fileName: b[2],
              lineNumber: b[1],
              source: d[v]
            }));
          }
          return g;
        },
        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function(o) {
          var h = o.stack.split(`
`).filter(function(d) {
            return !!d.match(n) && !d.match(/^Error created at/);
          }, this);
          return h.map(function(d) {
            var g = d.split("@"), v = this.extractLocation(g.pop()), y = g.shift() || "", b = y.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0, m;
            y.match(/\(([^)]*)\)/) && (m = y.replace(/^[^(]+\(([^)]*)\)$/, "$1"));
            var $ = m === void 0 || m === "[arguments not available]" ? void 0 : m.split(",");
            return new t({
              functionName: b,
              args: $,
              fileName: v[0],
              lineNumber: v[1],
              columnNumber: v[2],
              source: d
            });
          }, this);
        }
      };
    });
    var Qe = Te, ve = function(e, t, n, r) {
      var a = r && r.redactedKeys ? r.redactedKeys : [], c = r && r.redactedPaths ? r.redactedPaths : [];
      return JSON.stringify(ur(e, a, c), t, n);
    }, Qt = 20, er = 25e3, tr = 8, me = "...";
    function rr(e) {
      return e instanceof Error || /^\[object (Error|(Dom)?Exception)\]$/.test(Object.prototype.toString.call(e));
    }
    function et(e) {
      return "[Throws: " + (e ? e.message : "?") + "]";
    }
    function nr(e, t) {
      for (var n = 0, r = e.length; n < r; n++)
        if (e[n] === t) return !0;
      return !1;
    }
    function ir(e, t) {
      for (var n = 0, r = e.length; n < r; n++)
        if (t.indexOf(e[n]) === 0) return !0;
      return !1;
    }
    function ar(e, t) {
      for (var n = 0, r = e.length; n < r; n++)
        if (typeof e[n] == "string" && e[n].toLowerCase() === t.toLowerCase() || e[n] && typeof e[n].test == "function" && e[n].test(t)) return !0;
      return !1;
    }
    function sr(e) {
      return Object.prototype.toString.call(e) === "[object Array]";
    }
    function or(e, t) {
      try {
        return e[t];
      } catch (n) {
        return et(n);
      }
    }
    function ur(e, t, n) {
      var r = [], a = 0;
      function c(o, h) {
        function d() {
          return h.length > tr && a > er;
        }
        if (a++, h.length > Qt || d()) return me;
        if (o === null || typeof o != "object") return o;
        if (nr(r, o)) return "[Circular]";
        if (r.push(o), typeof o.toJSON == "function")
          try {
            a--;
            var g = c(o.toJSON(), h);
            return r.pop(), g;
          } catch (A) {
            return et(A);
          }
        var v = rr(o);
        if (v) {
          a--;
          var y = c({
            name: o.name,
            message: o.message
          }, h);
          return r.pop(), y;
        }
        if (sr(o)) {
          for (var b = [], m = 0, $ = o.length; m < $; m++) {
            if (d()) {
              b.push(me);
              break;
            }
            b.push(c(o[m], h.concat("[]")));
          }
          return r.pop(), b;
        }
        var x = {};
        try {
          for (var S in o)
            if (Object.prototype.hasOwnProperty.call(o, S)) {
              if (ir(n, h.join(".")) && ar(t, S)) {
                x[S] = "[REDACTED]";
                continue;
              }
              if (d()) {
                x[S] = me;
                break;
              }
              x[S] = c(or(o, S), h.concat(S));
            }
        } catch {
        }
        return r.pop(), x;
      }
      return c(e, []);
    }
    function tt(e, t, n, r) {
      if (typeof n == "string") {
        r === void 0 ? r = null : r !== null && typeof r != "string" && (r = ve(r));
        var a = t[n];
        if (typeof a == "number") {
          e[a] = {
            name: n,
            variant: r
          };
          return;
        }
        e.push({
          name: n,
          variant: r
        }), t[n] = e.length - 1;
      }
    }
    function cr(e, t, n) {
      if (_(t)) {
        for (var r = 0; r < t.length; ++r) {
          var a = t[r];
          a === null || typeof a != "object" || tt(e, n, a.name, a.variant);
        }
        return e;
      }
    }
    function lr(e) {
      return k(l(e, Boolean), function(t) {
        var n = t.name, r = t.variant, a = {
          featureFlag: n
        };
        return typeof r == "string" && (a.variant = r), a;
      });
    }
    function dr(e, t, n) {
      var r = t[n];
      typeof r == "number" && (e[r] = null, delete t[n]);
    }
    var X = {
      add: tt,
      clear: dr,
      merge: cr,
      toEventApi: lr
    }, ye = function(e) {
      return !!e && (!!e.stack || !!e.stacktrace || !!e["opera#sourceloc"]) && typeof (e.stack || e.stacktrace || e["opera#sourceloc"]) == "string" && e.stack !== e.name + ": " + e.message;
    }, fr = hr;
    function hr(e) {
      switch (Object.prototype.toString.call(e)) {
        case "[object Error]":
          return !0;
        case "[object Exception]":
          return !0;
        case "[object DOMException]":
          return !0;
        default:
          return e instanceof Error;
      }
    }
    var be = fr, pr = function(e, t, n, r) {
      var a;
      if (t) {
        var c;
        if (n === null) return rt(e, t);
        typeof n == "object" && (c = n), typeof n == "string" && (c = (a = {}, a[n] = r, a)), c && (t === "__proto__" || t === "constructor" || t === "prototype" || (e[t] || (e[t] = {}), e[t] = L({}, e[t], c)));
      }
    }, gr = function(e, t, n) {
      if (typeof t == "string") {
        if (!n)
          return e[t];
        if (e[t])
          return e[t][n];
      }
    }, rt = function(e, t, n) {
      if (typeof t == "string") {
        if (!n) {
          delete e[t];
          return;
        }
        t === "__proto__" || t === "constructor" || t === "prototype" || e[t] && delete e[t][n];
      }
    }, Z = {
      add: pr,
      get: gr,
      clear: rt
    };
    function Re() {
      return Re = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }, Re.apply(null, arguments);
    }
    var j = /* @__PURE__ */ function() {
      function e(n, r, a, c, o) {
        a === void 0 && (a = []), c === void 0 && (c = mr()), this.apiKey = void 0, this.context = void 0, this.groupingHash = void 0, this.originalError = o, this._handledState = c, this.severity = this._handledState.severity, this.unhandled = this._handledState.unhandled, this.app = {}, this.device = {}, this.request = {}, this.breadcrumbs = [], this.threads = [], this._metadata = {}, this._features = [], this._featuresIndex = {}, this._user = {}, this._session = void 0, this._correlation = void 0, this.errors = [it(n, r, e.__type, a)];
      }
      var t = e.prototype;
      return t.addMetadata = function(r, a, c) {
        return Z.add(this._metadata, r, a, c);
      }, t.setTraceCorrelation = function(r, a) {
        typeof r == "string" && (this._correlation = Re({
          traceId: r
        }, typeof a == "string" ? {
          spanId: a
        } : {}));
      }, t.getMetadata = function(r, a) {
        return Z.get(this._metadata, r, a);
      }, t.clearMetadata = function(r, a) {
        return Z.clear(this._metadata, r, a);
      }, t.addFeatureFlag = function(r, a) {
        a === void 0 && (a = null), X.add(this._features, this._featuresIndex, r, a);
      }, t.addFeatureFlags = function(r) {
        X.merge(this._features, r, this._featuresIndex);
      }, t.getFeatureFlags = function() {
        return X.toEventApi(this._features);
      }, t.clearFeatureFlag = function(r) {
        X.clear(this._features, this._featuresIndex, r);
      }, t.clearFeatureFlags = function() {
        this._features = [], this._featuresIndex = {};
      }, t.getUser = function() {
        return this._user;
      }, t.setUser = function(r, a, c) {
        this._user = {
          id: r,
          email: a,
          name: c
        };
      }, t.toJSON = function() {
        return {
          payloadVersion: "4",
          exceptions: k(this.errors, function(r) {
            return L({}, r, {
              message: r.errorMessage
            });
          }),
          severity: this.severity,
          unhandled: this._handledState.unhandled,
          severityReason: this._handledState.severityReason,
          app: this.app,
          device: this.device,
          request: this.request,
          breadcrumbs: this.breadcrumbs,
          context: this.context,
          groupingHash: this.groupingHash,
          metaData: this._metadata,
          user: this._user,
          session: this._session,
          featureFlags: this.getFeatureFlags(),
          correlation: this._correlation
        };
      }, e;
    }(), _r = function(e) {
      var t = {
        file: e.fileName,
        method: vr(e.functionName),
        lineNumber: e.lineNumber,
        columnNumber: e.columnNumber,
        code: void 0,
        inProject: void 0
      };
      return t.lineNumber > -1 && !t.file && !t.method && (t.file = "global code"), t;
    }, vr = function(e) {
      return /^global code$/i.test(e) ? "global code" : e;
    }, mr = function() {
      return {
        unhandled: !1,
        severity: "warning",
        severityReason: {
          type: "handledException"
        }
      };
    }, nt = function(e) {
      return typeof e == "string" ? e : "";
    };
    function it(e, t, n, r) {
      return {
        errorClass: nt(e),
        errorMessage: nt(t),
        type: n,
        stacktrace: u(r, function(a, c) {
          var o = _r(c);
          try {
            return JSON.stringify(o) === "{}" ? a : a.concat(o);
          } catch {
            return a;
          }
        }, [])
      };
    }
    function at(e) {
      return e.cause ? [e].concat(at(e.cause)) : [e];
    }
    j.getStacktrace = function(e, t, n) {
      if (ye(e)) return Qe.parse(e).slice(t);
      try {
        return l(Ce.backtrace(), function(r) {
          return (r.functionName || "").indexOf("StackGenerator$$") === -1;
        }).slice(1 + n);
      } catch {
        return [];
      }
    }, j.create = function(e, t, n, r, a, c) {
      a === void 0 && (a = 0);
      var o = ot(e, t, r, c), h = o[0], d = o[1], g;
      try {
        var v = j.getStacktrace(
          h,
          // if an error was created/throw in the normaliseError() function, we need to
          // tell the getStacktrace() function to skip the number of frames we know will
          // be from our own functions. This is added to the number of frames deep we
          // were told about
          d > 0 ? 1 + d + a : 0,
          // if there's no stacktrace, the callstack may be walked to generated one.
          // this is how many frames should be removed because they come from our library
          1 + a
        );
        g = new j(h.name, h.message, v, n, e);
      } catch {
        g = new j(h.name, h.message, [], n, e);
      }
      if (h.name === "InvalidError" && g.addMetadata("" + r, "non-error parameter", st(e)), h.cause) {
        var y, b = at(h).slice(1), m = k(b, function($) {
          var x = be($) && ye($) ? Qe.parse($) : [], S = ot($, !0, "error cause"), A = S[0];
          return A.name === "InvalidError" && g.addMetadata("error cause", st($)), it(A.name, A.message, j.__type, x);
        });
        (y = g.errors).push.apply(y, m);
      }
      return g;
    };
    var st = function(e) {
      return e === null ? "null" : e === void 0 ? "undefined" : e;
    }, ot = function(e, t, n, r) {
      var a, c = 0, o = function(h) {
        var d = n === "error cause" ? "was" : "received";
        r && r.warn(n + " " + d + ' a non-error: "' + h + '"');
        var g = new Error(n + " " + d + ' a non-error. See "' + n + '" tab for more detail.');
        return g.name = "InvalidError", g;
      };
      if (!t)
        be(e) ? a = e : (a = o(typeof e), c += 2);
      else
        switch (typeof e) {
          case "string":
          case "number":
          case "boolean":
            a = new Error(String(e)), c += 1;
            break;
          case "function":
            a = o("function"), c += 2;
            break;
          case "object":
            e !== null && be(e) ? a = e : e !== null && yr(e) ? (a = new Error(e.message || e.errorMessage), a.name = e.name || e.errorClass, c += 1) : (a = o(e === null ? "null" : "unsupported object"), c += 2);
            break;
          default:
            a = o("nothing"), c += 2;
        }
      if (!ye(a))
        try {
          throw a;
        } catch (h) {
          ye(h) && (a = h, c = 1);
        }
      return [a, c];
    };
    j.__type = "browserjs";
    var yr = function(e) {
      return (typeof e.name == "string" || typeof e.errorClass == "string") && (typeof e.message == "string" || typeof e.errorMessage == "string");
    }, Me = j, br = function(e, t, n) {
      var r = 0, a = function() {
        if (r >= e.length) return n(null, !0);
        t(e[r], function(c, o) {
          if (c) return n(c);
          if (o === !1) return n(null, !1);
          r++, a();
        });
      };
      a();
    }, Sr = function(e, t, n, r) {
      var a = function(c, o) {
        if (typeof c != "function") return o(null);
        try {
          if (c.length !== 2) {
            var h = c(t);
            return h && typeof h.then == "function" ? h.then(
              // resolve
              function(d) {
                return setTimeout(function() {
                  return o(null, d);
                });
              },
              // reject
              function(d) {
                setTimeout(function() {
                  return n(d), o(null, !0);
                });
              }
            ) : o(null, h);
          }
          c(t, function(d, g) {
            if (d)
              return n(d), o(null);
            o(null, g);
          });
        } catch (d) {
          n(d), o(null);
        }
      };
      br(e, a, r);
    }, ut = function(e, t, n, r) {
      for (var a = !1, c = e.slice(); !a && c.length; )
        try {
          a = c.pop()(t) === !1;
        } catch (o) {
          r.error("Error occurred in " + n + " callback, continuing anyway…"), r.error(o);
        }
      return a;
    }, Le = function(t, n) {
      var r = "000000000" + t;
      return r.substr(r.length - n);
    }, ct = typeof window == "object" ? window : self, lt = 0;
    for (var $r in ct)
      Object.hasOwnProperty.call(ct, $r) && lt++;
    var Er = navigator.mimeTypes ? navigator.mimeTypes.length : 0, Ar = Le((Er + navigator.userAgent.length).toString(36) + lt.toString(36), 4), dt = function() {
      return Ar;
    }, Or = function(t) {
      return typeof t == "string" && /^c[a-z0-9]{20,32}$/.test(t);
    }, ae = 0, Be = 4, Se = 36, ft = Math.pow(Se, Be);
    function ht() {
      return Le((Math.random() * ft << 0).toString(Se), Be);
    }
    function xr() {
      return ae = ae < ft ? ae : 0, ae++, ae - 1;
    }
    function He() {
      var e = "c", t = (/* @__PURE__ */ new Date()).getTime().toString(Se), n = Le(xr().toString(Se), Be), r = dt(), a = ht() + ht();
      return e + t + n + r + a;
    }
    He.fingerprint = dt, He.isCuid = Or;
    var pt = He, Nr = /* @__PURE__ */ function() {
      function e() {
        this.id = pt(), this.startedAt = /* @__PURE__ */ new Date(), this._handled = 0, this._unhandled = 0, this._user = {}, this.app = {}, this.device = {};
      }
      var t = e.prototype;
      return t.getUser = function() {
        return this._user;
      }, t.setUser = function(r, a, c) {
        this._user = {
          id: r,
          email: a,
          name: c
        };
      }, t.toJSON = function() {
        return {
          id: this.id,
          startedAt: this.startedAt,
          events: {
            handled: this._handled,
            unhandled: this._unhandled
          }
        };
      }, t._track = function(r) {
        this[r._handledState.unhandled ? "_unhandled" : "_handled"] += 1;
      }, e;
    }(), Ie = Nr, Pr = X.add, wr = X.clear, De = X.merge, Cr = "00000", Tr = "https://notify.insighthub.smartbear.com", Rr = "https://sessions.insighthub.smartbear.com", F = function() {
    }, Mr = /* @__PURE__ */ function() {
      function e(n, r, a, c) {
        var o = this;
        r === void 0 && (r = D.schema), a === void 0 && (a = []), this._notifier = c, this._config = {}, this._schema = r, this._delivery = {
          sendSession: F,
          sendEvent: F
        }, this._logger = {
          debug: F,
          info: F,
          warn: F,
          error: F
        }, this._plugins = {}, this._breadcrumbs = [], this._session = null, this._metadata = {}, this._featuresIndex = {}, this._features = [], this._context = void 0, this._user = {}, this._cbs = {
          e: [],
          s: [],
          sp: [],
          b: []
        }, this.Client = e, this.Event = Me, this.Breadcrumb = we, this.Session = Ie, this._config = this._configure(n, a), k(a.concat(this._config.plugins), function(g) {
          g && o._loadPlugin(g);
        }), this._depth = 1;
        var h = this, d = this.notify;
        this.notify = function() {
          return d.apply(h, arguments);
        };
      }
      var t = e.prototype;
      return t.addMetadata = function(r, a, c) {
        return Z.add(this._metadata, r, a, c);
      }, t.getMetadata = function(r, a) {
        return Z.get(this._metadata, r, a);
      }, t.clearMetadata = function(r, a) {
        return Z.clear(this._metadata, r, a);
      }, t.addFeatureFlag = function(r, a) {
        a === void 0 && (a = null), Pr(this._features, this._featuresIndex, r, a);
      }, t.addFeatureFlags = function(r) {
        De(this._features, r, this._featuresIndex);
      }, t.clearFeatureFlag = function(r) {
        wr(this._features, this._featuresIndex, r);
      }, t.clearFeatureFlags = function() {
        this._features = [], this._featuresIndex = {};
      }, t.getContext = function() {
        return this._context;
      }, t.setContext = function(r) {
        this._context = r;
      }, t._configure = function(r, a) {
        var c = u(a, function(g, v) {
          return v && v.configSchema ? L({}, g, v.configSchema) : g;
        }, this._schema);
        r.endpoints || (r.sendPayloadChecksums = "sendPayloadChecksums" in r ? r.sendPayloadChecksums : !0);
        var o = u(N(c), function(g, v) {
          var y = c[v].defaultValue(r[v]);
          if (r[v] !== void 0) {
            var b = c[v].validate(r[v]);
            b ? c[v].allowPartialObject ? g.config[v] = L(y, r[v]) : g.config[v] = r[v] : (g.errors[v] = c[v].message, g.config[v] = y);
          } else
            g.config[v] = y;
          return g;
        }, {
          errors: {},
          config: {}
        }), h = o.errors, d = o.config;
        if (c.apiKey) {
          if (!d.apiKey) throw new Error("No Bugsnag API Key set");
          /^[0-9a-f]{32}$/i.test(d.apiKey) || (h.apiKey = "should be a string of 32 hexadecimal characters"), r.endpoints === void 0 && d.apiKey.startsWith(Cr) && (d.endpoints = {
            notify: Tr,
            sessions: Rr
          });
        }
        return this._metadata = L({}, d.metadata), De(this._features, d.featureFlags, this._featuresIndex), this._user = L({}, d.user), this._context = d.context, d.logger && (this._logger = d.logger), d.onError && (this._cbs.e = this._cbs.e.concat(d.onError)), d.onBreadcrumb && (this._cbs.b = this._cbs.b.concat(d.onBreadcrumb)), d.onSession && (this._cbs.s = this._cbs.s.concat(d.onSession)), N(h).length && this._logger.warn(Lr(h, r)), d;
      }, t.getUser = function() {
        return this._user;
      }, t.setUser = function(r, a, c) {
        this._user = {
          id: r,
          email: a,
          name: c
        };
      }, t._loadPlugin = function(r) {
        var a = r.load(this);
        r.name && (this._plugins["~" + r.name + "~"] = a);
      }, t.getPlugin = function(r) {
        return this._plugins["~" + r + "~"];
      }, t._setDelivery = function(r) {
        this._delivery = r(this);
      }, t.startSession = function() {
        var r = new Ie();
        r.app.releaseStage = this._config.releaseStage, r.app.version = this._config.appVersion, r.app.type = this._config.appType, r._user = L({}, this._user);
        var a = ut(this._cbs.s, r, "onSession", this._logger);
        return a ? (this._logger.debug("Session not started due to onSession callback"), this) : this._sessionDelegate.startSession(this, r);
      }, t.addOnError = function(r, a) {
        a === void 0 && (a = !1), this._cbs.e[a ? "unshift" : "push"](r);
      }, t.removeOnError = function(r) {
        this._cbs.e = l(this._cbs.e, function(a) {
          return a !== r;
        });
      }, t._addOnSessionPayload = function(r) {
        this._cbs.sp.push(r);
      }, t.addOnSession = function(r) {
        this._cbs.s.push(r);
      }, t.removeOnSession = function(r) {
        this._cbs.s = l(this._cbs.s, function(a) {
          return a !== r;
        });
      }, t.addOnBreadcrumb = function(r, a) {
        a === void 0 && (a = !1), this._cbs.b[a ? "unshift" : "push"](r);
      }, t.removeOnBreadcrumb = function(r) {
        this._cbs.b = l(this._cbs.b, function(a) {
          return a !== r;
        });
      }, t.pauseSession = function() {
        return this._sessionDelegate.pauseSession(this);
      }, t.resumeSession = function() {
        return this._sessionDelegate.resumeSession(this);
      }, t.leaveBreadcrumb = function(r, a, c) {
        if (r = typeof r == "string" ? r : "", c = typeof c == "string" && p(s, c) ? c : "manual", a = typeof a == "object" && a !== null ? a : {}, !!r) {
          var o = new we(r, a, c), h = ut(this._cbs.b, o, "onBreadcrumb", this._logger);
          if (h) {
            this._logger.debug("Breadcrumb not attached due to onBreadcrumb callback");
            return;
          }
          this._breadcrumbs.push(o), this._breadcrumbs.length > this._config.maxBreadcrumbs && (this._breadcrumbs = this._breadcrumbs.slice(this._breadcrumbs.length - this._config.maxBreadcrumbs));
        }
      }, t._isBreadcrumbTypeEnabled = function(r) {
        var a = this._config.enabledBreadcrumbTypes;
        return a === null || p(a, r);
      }, t.notify = function(r, a, c) {
        c === void 0 && (c = F);
        var o = Me.create(r, !0, void 0, "notify()", this._depth + 1, this._logger);
        this._notify(o, a, c);
      }, t._notify = function(r, a, c) {
        var o = this;
        if (c === void 0 && (c = F), r.app = L({}, r.app, {
          releaseStage: this._config.releaseStage,
          version: this._config.appVersion,
          type: this._config.appType
        }), r.context = r.context || this._context, r._metadata = L({}, r._metadata, this._metadata), r._user = L({}, r._user, this._user), r.breadcrumbs = this._breadcrumbs.slice(), De(r._features, this._features, r._featuresIndex), this._config.enabledReleaseStages !== null && !p(this._config.enabledReleaseStages, this._config.releaseStage))
          return this._logger.warn("Event not sent due to releaseStage/enabledReleaseStages configuration"), c(null, r);
        var h = r.severity, d = function(v) {
          o._logger.error("Error occurred in onError callback, continuing anyway…"), o._logger.error(v);
        }, g = [].concat(this._cbs.e).concat(a);
        Sr(g, r, d, function(v, y) {
          if (v && d(v), !y)
            return o._logger.debug("Event not sent due to onError callback"), c(null, r);
          o._isBreadcrumbTypeEnabled("error") && e.prototype.leaveBreadcrumb.call(o, r.errors[0].errorClass, {
            errorClass: r.errors[0].errorClass,
            errorMessage: r.errors[0].errorMessage,
            severity: r.severity
          }, "error"), h !== r.severity && (r._handledState.severityReason = {
            type: "userCallbackSetSeverity"
          }), r.unhandled !== r._handledState.unhandled && (r._handledState.severityReason.unhandledOverridden = !0, r._handledState.unhandled = r.unhandled), o._session && (o._session._track(r), r._session = o._session), o._delivery.sendEvent({
            apiKey: r.apiKey || o._config.apiKey,
            notifier: o._notifier,
            events: [r]
          }, function(b) {
            return c(b, r);
          });
        });
      }, e;
    }(), Lr = function(e, t) {
      var n = new Error(`Invalid configuration
` + k(N(e), function(r) {
        return "  - " + r + " " + e[r] + ", got " + Br(t[r]);
      }).join(`

`));
      return n;
    }, Br = function(e) {
      switch (typeof e) {
        case "string":
        case "number":
        case "object":
          return JSON.stringify(e);
        default:
          return String(e);
      }
    }, ke = Mr, Q = {}, gt = ["events.[].metaData", "events.[].breadcrumbs.[].metaData", "events.[].request"];
    Q.event = function(e, t) {
      var n = ve(e, null, null, {
        redactedPaths: gt,
        redactedKeys: t
      });
      return n.length > 1e6 && (e.events[0]._metadata = {
        notifier: `WARNING!
Serialized payload was ` + n.length / 1e6 + `MB (limit = 1MB)
metadata was removed`
      }, n = ve(e, null, null, {
        redactedPaths: gt,
        redactedKeys: t
      })), n;
    }, Q.session = function(e, t) {
      var n = ve(e, null, null);
      return n;
    };
    var Ue = {};
    Ue = function(e, t) {
      return t === void 0 && (t = window), {
        sendEvent: function(n, r) {
          if (r === void 0 && (r = function() {
          }), e._config.endpoints.notify === null) {
            var a = new Error("Event not sent due to incomplete endpoint configuration");
            return r(a);
          }
          var c = _t(e._config, "notify", "4", t), o = Q.event(n, e._config.redactedKeys), h = new t.XDomainRequest();
          h.onload = function() {
            r(null);
          }, h.onerror = function() {
            var d = new Error("Event failed to send");
            e._logger.error("Event failed to send…", d), o.length > 1e6 && e._logger.warn("Event oversized (" + (o.length / 1e6).toFixed(2) + " MB)"), r(d);
          }, h.open("POST", c), setTimeout(function() {
            try {
              h.send(o);
            } catch (d) {
              e._logger.error(d), r(d);
            }
          }, 0);
        },
        sendSession: function(n, r) {
          if (r === void 0 && (r = function() {
          }), e._config.endpoints.sessions === null) {
            var a = new Error("Session not sent due to incomplete endpoint configuration");
            return r(a);
          }
          var c = _t(e._config, "sessions", "1", t), o = new t.XDomainRequest();
          o.onload = function() {
            r(null);
          }, o.open("POST", c), setTimeout(function() {
            try {
              o.send(Q.session(n, e._config.redactedKeys));
            } catch (h) {
              e._logger.error(h), r(h);
            }
          }, 0);
        }
      };
    };
    var _t = function(e, t, n, r) {
      var a = JSON.parse(JSON.stringify(/* @__PURE__ */ new Date())), c = Hr(e.endpoints[t], r.location.protocol);
      return c + "?apiKey=" + encodeURIComponent(e.apiKey) + "&payloadVersion=" + n + "&sentAt=" + encodeURIComponent(a);
    }, Hr = Ue._matchPageProtocol = function(e, t) {
      return t === "http:" ? e.replace(/^https:/, "http:") : e;
    };
    function vt(e, t) {
      if (e.isSecureContext && e.crypto && e.crypto.subtle && e.crypto.subtle.digest && typeof TextEncoder == "function") {
        var n = new TextEncoder().encode(t);
        return e.crypto.subtle.digest("SHA-1", n).then(function(r) {
          var a = Array.from(new Uint8Array(r)), c = a.map(function(o) {
            return o.toString(16).padStart(2, "0");
          }).join("");
          return "sha1 " + c;
        });
      }
      return Promise.resolve();
    }
    var Ir = function(e, t) {
      return t === void 0 && (t = window), {
        sendEvent: function(n, r) {
          r === void 0 && (r = function() {
          });
          try {
            var a = e._config.endpoints.notify;
            if (a === null) {
              var c = new Error("Event not sent due to incomplete endpoint configuration");
              return r(c);
            }
            var o = new t.XMLHttpRequest(), h = Q.event(n, e._config.redactedKeys);
            o.onreadystatechange = function() {
              if (o.readyState === t.XMLHttpRequest.DONE) {
                var d = o.status;
                if (d === 0 || d >= 400) {
                  var g = new Error("Request failed with status " + d);
                  e._logger.error("Event failed to send…", g), h.length > 1e6 && e._logger.warn("Event oversized (" + (h.length / 1e6).toFixed(2) + " MB)"), r(g);
                } else
                  r(null);
              }
            }, o.open("POST", a), o.setRequestHeader("Content-Type", "application/json"), o.setRequestHeader("Bugsnag-Api-Key", n.apiKey || e._config.apiKey), o.setRequestHeader("Bugsnag-Payload-Version", "4"), o.setRequestHeader("Bugsnag-Sent-At", (/* @__PURE__ */ new Date()).toISOString()), e._config.sendPayloadChecksums && typeof Promise < "u" && Promise.toString().indexOf("[native code]") !== -1 ? vt(t, h).then(function(d) {
              d && o.setRequestHeader("Bugsnag-Integrity", d), o.send(h);
            }).catch(function(d) {
              e._logger.error(d), o.send(h);
            }) : o.send(h);
          } catch (d) {
            e._logger.error(d);
          }
        },
        sendSession: function(n, r) {
          r === void 0 && (r = function() {
          });
          try {
            var a = e._config.endpoints.sessions;
            if (a === null) {
              var c = new Error("Session not sent due to incomplete endpoint configuration");
              return r(c);
            }
            var o = new t.XMLHttpRequest(), h = Q.session(n, e._config.redactedKeys);
            o.onreadystatechange = function() {
              if (o.readyState === t.XMLHttpRequest.DONE) {
                var d = o.status;
                if (d === 0 || d >= 400) {
                  var g = new Error("Request failed with status " + d);
                  e._logger.error("Session failed to send…", g), r(g);
                } else
                  r(null);
              }
            }, o.open("POST", a), o.setRequestHeader("Content-Type", "application/json"), o.setRequestHeader("Bugsnag-Api-Key", e._config.apiKey), o.setRequestHeader("Bugsnag-Payload-Version", "1"), o.setRequestHeader("Bugsnag-Sent-At", (/* @__PURE__ */ new Date()).toISOString()), e._config.sendPayloadChecksums && typeof Promise < "u" && Promise.toString().indexOf("[native code]") !== -1 ? vt(t, h).then(function(d) {
              d && o.setRequestHeader("Bugsnag-Integrity", d), o.send(h);
            }).catch(function(d) {
              e._logger.error(d), o.send(h);
            }) : o.send(h);
          } catch (d) {
            e._logger.error(d);
          }
        }
      };
    }, mt = /* @__PURE__ */ new Date(), Dr = function() {
      mt = /* @__PURE__ */ new Date();
    }, kr = {
      name: "appDuration",
      load: function(e) {
        return e.addOnError(function(t) {
          var n = /* @__PURE__ */ new Date();
          t.app.duration = n - mt;
        }, !0), {
          reset: Dr
        };
      }
    }, Ur = function(e) {
      return e === void 0 && (e = window), {
        load: function(t) {
          t.addOnError(function(n) {
            n.context === void 0 && (n.context = e.location.pathname);
          }, !0);
        }
      };
    }, yt = "bugsnag-anonymous-id", jr = function(e) {
      try {
        var t = e.localStorage, n = t.getItem(yt);
        return n && /^c[a-z0-9]{20,32}$/.test(n) || (n = pt(), t.setItem(yt, n)), n;
      } catch {
      }
    }, Fr = function(e, t) {
      return e === void 0 && (e = navigator), t === void 0 && (t = window), {
        load: function(n) {
          var r = {
            locale: e.browserLanguage || e.systemLanguage || e.userLanguage || e.language,
            userAgent: e.userAgent
          };
          t && t.screen && t.screen.orientation && t.screen.orientation.type ? r.orientation = t.screen.orientation.type : t && t.document && (r.orientation = t.document.documentElement.clientWidth > t.document.documentElement.clientHeight ? "landscape" : "portrait"), n._config.generateAnonymousId && (r.id = jr(t)), n.addOnSession(function(a) {
            a.device = L({}, a.device, r), n._config.collectUserIp || bt(a);
          }), n.addOnError(function(a) {
            a.device = L({}, a.device, r, {
              time: /* @__PURE__ */ new Date()
            }), n._config.collectUserIp || bt(a);
          }, !0);
        },
        configSchema: {
          generateAnonymousId: {
            validate: function(n) {
              return n === !0 || n === !1;
            },
            defaultValue: function() {
              return !0;
            },
            message: "should be true|false"
          }
        }
      };
    }, bt = function(e) {
      var t = e.getUser();
      (!t || !t.id) && e.setUser(e.device.id);
    }, Vr = function(e) {
      return e === void 0 && (e = window), {
        load: function(t) {
          t.addOnError(function(n) {
            n.request && n.request.url || (n.request = L({}, n.request, {
              url: e.location.href
            }));
          }, !0);
        }
      };
    }, qr = {
      load: function(e) {
        e._sessionDelegate = Kr;
      }
    }, Kr = {
      startSession: function(e, t) {
        var n = e;
        return n._session = t, n._pausedSession = null, n._config.enabledReleaseStages !== null && !p(n._config.enabledReleaseStages, n._config.releaseStage) ? (n._logger.warn("Session not sent due to releaseStage/enabledReleaseStages configuration"), n) : (n._delivery.sendSession({
          notifier: n._notifier,
          device: t.device,
          app: t.app,
          sessions: [{
            id: t.id,
            startedAt: t.startedAt,
            user: t._user
          }]
        }), n);
      },
      resumeSession: function(e) {
        return e._session ? e : e._pausedSession ? (e._session = e._pausedSession, e._pausedSession = null, e) : e.startSession();
      },
      pauseSession: function(e) {
        e._pausedSession = e._session, e._session = null;
      }
    }, Xr = {
      load: function(e) {
        e._config.collectUserIp || e.addOnError(function(t) {
          t._user && typeof t._user.id > "u" && delete t._user.id, t._user = L({
            id: "[REDACTED]"
          }, t._user), t.request = L({
            clientIp: "[REDACTED]"
          }, t.request);
        });
      },
      configSchema: {
        collectUserIp: {
          defaultValue: function() {
            return !0;
          },
          message: "should be true|false",
          validate: function(e) {
            return e === !0 || e === !1;
          }
        }
      }
    }, St = {};
    St.load = function(e) {
      var t = /^(local-)?dev(elopment)?$/.test(e._config.releaseStage);
      t || !e._isBreadcrumbTypeEnabled("log") || k(zr, function(n) {
        var r = console[n];
        console[n] = function() {
          for (var a = arguments.length, c = new Array(a), o = 0; o < a; o++)
            c[o] = arguments[o];
          e.leaveBreadcrumb("Console output", u(c, function(h, d, g) {
            var v = "[Unknown value]";
            try {
              v = String(d);
            } catch {
            }
            if (v === "[object Object]")
              try {
                v = JSON.stringify(d);
              } catch {
              }
            return h["[" + g + "]"] = v, h;
          }, {
            severity: n.indexOf("group") === 0 ? "log" : n
          }), "log"), r.apply(console, c);
        }, console[n]._restore = function() {
          console[n] = r;
        };
      });
    };
    var zr = l(["log", "debug", "info", "warn", "error"], function(e) {
      return typeof console < "u" && typeof console[e] == "function";
    }), $t = 200, Et = 5e5, Jr = function(e, t) {
      return e === void 0 && (e = document), t === void 0 && (t = window), {
        load: function(n) {
          if (!n._config.trackInlineScripts) return;
          var r = t.location.href, a = "", c = !!e.attachEvent, o = c ? e.readyState === "complete" : e.readyState !== "loading", h = function() {
            return e.documentElement.outerHTML;
          };
          a = h();
          var d = e.onreadystatechange;
          e.onreadystatechange = function() {
            e.readyState === "interactive" && (a = h(), o = !0);
            try {
              d.apply(this, arguments);
            } catch {
            }
          };
          var g = null, v = function(S) {
            g = S;
          }, y = function() {
            var S = e.currentScript || g;
            if (!S && !o) {
              var A = e.scripts || e.getElementsByTagName("script");
              S = A[A.length - 1];
            }
            return S;
          }, b = function(S) {
            (!o || !a) && (a = h());
            var A = ["<!-- DOC START -->"].concat(a.split(`
`)), T = S - 1, w = Math.max(T - 3, 0), M = Math.min(T + 3, A.length);
            return u(A.slice(w, M), function(C, U, se) {
              return C[w + 1 + se] = U.length <= $t ? U : U.substr(0, $t), C;
            }, {});
          };
          n.addOnError(function(S) {
            S.errors[0].stacktrace = l(S.errors[0].stacktrace, function(C) {
              return !/__trace__$/.test(C.method);
            });
            var A = S.errors[0].stacktrace[0], T = function(C) {
              return C.replace(/#.*$/, "").replace(/\?.*$/, "");
            };
            if (!(A && A.file && T(A.file) !== T(r))) {
              var w = y();
              if (w) {
                var M = w.innerHTML;
                S.addMetadata("script", "content", M.length <= Et ? M : M.substr(0, Et)), A && A.lineNumber && (A.code = b(A.lineNumber));
              }
            }
          }, !0);
          var m = k(["setTimeout", "setInterval", "setImmediate", "requestAnimationFrame"], function(S) {
            return je(t, S, function(A) {
              return x(A, function(T) {
                return {
                  get: function() {
                    return T[0];
                  },
                  replace: function(w) {
                    T[0] = w;
                  }
                };
              });
            });
          }), $ = m[0];
          k(["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], function(S) {
            !t[S] || !t[S].prototype || !Object.prototype.hasOwnProperty.call(t[S].prototype, "addEventListener") || (je(t[S].prototype, "addEventListener", function(A) {
              return x(A, At);
            }), je(t[S].prototype, "removeEventListener", function(A) {
              return x(A, At, !0);
            }));
          });
          function x(S, A, T) {
            return T === void 0 && (T = !1), function() {
              var w = [].slice.call(arguments);
              try {
                var M = A(w), C = M.get();
                if (T && S.apply(this, w), typeof C != "function") return S.apply(this, w);
                if (C.__trace__)
                  M.replace(C.__trace__);
                else {
                  var U = y();
                  C.__trace__ = function() {
                    v(U), $(function() {
                      v(null);
                    }, 0);
                    var ln = C.apply(this, arguments);
                    return v(null), ln;
                  }, C.__trace__.__trace__ = C.__trace__, M.replace(C.__trace__);
                }
              } catch {
              }
              if (S.apply) return S.apply(this, w);
              switch (w.length) {
                case 1:
                  return S(w[0]);
                case 2:
                  return S(w[0], w[1]);
                default:
                  return S();
              }
            };
          }
        },
        configSchema: {
          trackInlineScripts: {
            validate: function(n) {
              return n === !0 || n === !1;
            },
            defaultValue: function() {
              return !0;
            },
            message: "should be true|false"
          }
        }
      };
    };
    function je(e, t, n) {
      var r = e[t];
      if (!r) return r;
      var a = n(r);
      return e[t] = a, r;
    }
    function At(e) {
      var t = !!e[1] && typeof e[1].handleEvent == "function";
      return {
        get: function() {
          return t ? e[1].handleEvent : e[1];
        },
        replace: function(n) {
          t ? e[1].handleEvent = n : e[1] = n;
        }
      };
    }
    var Wr = function(e) {
      return e === void 0 && (e = window), {
        load: function(t) {
          "addEventListener" in e && t._isBreadcrumbTypeEnabled("user") && e.addEventListener("click", function(n) {
            var r, a;
            try {
              r = Yr(n.target), a = Ot(n.target, e);
            } catch {
              r = "[hidden]", a = "[hidden]", t._logger.error("Cross domain error when tracking click event. See docs: https://tinyurl.com/yy3rn63z");
            }
            t.leaveBreadcrumb("UI click", {
              targetText: r,
              targetSelector: a
            }, "user");
          }, !0);
        }
      };
    }, Gr = /^\s*([^\s][\s\S]{0,139}[^\s])?\s*/;
    function Yr(e) {
      var t = e.textContent || e.innerText || "";
      return !t && (e.type === "submit" || e.type === "button") && (t = e.value), t = t.replace(Gr, "$1"), t.length > 140 ? t.slice(0, 135) + "(...)" : t;
    }
    function Ot(e, t) {
      var n = [e.tagName];
      if (e.id && n.push("#" + e.id), e.className && e.className.length && n.push("." + e.className.split(" ").join(".")), !t.document.querySelectorAll || !Array.prototype.indexOf) return n.join("");
      try {
        if (t.document.querySelectorAll(n.join("")).length === 1) return n.join("");
      } catch {
        return n.join("");
      }
      if (e.parentNode.childNodes.length > 1) {
        var r = Array.prototype.indexOf.call(e.parentNode.childNodes, e) + 1;
        n.push(":nth-child(" + r + ")");
      }
      return t.document.querySelectorAll(n.join("")).length === 1 ? n.join("") : e.parentNode ? Ot(e.parentNode, t) + " > " + n.join("") : n.join("");
    }
    var xt = {};
    xt = function(e) {
      e === void 0 && (e = window);
      var t = {
        load: function(n) {
          if ("addEventListener" in e && n._isBreadcrumbTypeEnabled("navigation")) {
            var r = function(a) {
              return function() {
                return n.leaveBreadcrumb(a, {}, "navigation");
              };
            };
            e.addEventListener("pagehide", r("Page hidden"), !0), e.addEventListener("pageshow", r("Page shown"), !0), e.addEventListener("load", r("Page loaded"), !0), e.document.addEventListener("DOMContentLoaded", r("DOMContentLoaded"), !0), e.addEventListener("load", function() {
              return e.addEventListener("popstate", r("Navigated back"), !0);
            }), e.addEventListener("hashchange", function(a) {
              var c = a.oldURL ? {
                from: $e(a.oldURL, e),
                to: $e(a.newURL, e),
                state: Pt(e)
              } : {
                to: $e(e.location.href, e)
              };
              n.leaveBreadcrumb("Hash changed", c, "navigation");
            }, !0), e.history.pushState && Nt(n, e.history, "pushState", e, !0), e.history.replaceState && Nt(n, e.history, "replaceState", e);
          }
        }
      };
      return t;
    };
    var $e = function(e, t) {
      var n = t.document.createElement("A");
      return n.href = e, "" + n.pathname + n.search + n.hash;
    }, Zr = function(e, t, n, r) {
      var a = $e(e.location.href, e);
      return {
        title: n,
        state: t,
        prevState: Pt(e),
        to: r || a,
        from: a
      };
    }, Nt = function(e, t, n, r, a) {
      a === void 0 && (a = !1);
      var c = t[n];
      t[n] = function(o, h, d) {
        e.leaveBreadcrumb("History " + n, Zr(r, o, h, d), "navigation"), a && typeof e.resetEventCount == "function" && e.resetEventCount(), c.apply(t, [o, h].concat(d !== void 0 ? d : []));
      };
    }, Pt = function(e) {
      try {
        return e.history.state;
      } catch {
      }
    }, ee = "request", Qr = function(e, t) {
      e === void 0 && (e = []), t === void 0 && (t = window);
      var n = {
        load: function(r) {
          if (!r._isBreadcrumbTypeEnabled("request")) return;
          var a = [r._config.endpoints.notify, r._config.endpoints.sessions].concat(e);
          c(), d();
          function c() {
            if (!(!("addEventListener" in t.XMLHttpRequest.prototype) || !("WeakMap" in t))) {
              var y = /* @__PURE__ */ new WeakMap(), b = /* @__PURE__ */ new WeakMap(), m = t.XMLHttpRequest.prototype.open;
              t.XMLHttpRequest.prototype.open = function(S, A) {
                this && y.set(this, {
                  method: S,
                  url: A
                }), m.apply(this, arguments);
              };
              var $ = t.XMLHttpRequest.prototype.send;
              t.XMLHttpRequest.prototype.send = function(S) {
                var A = this, T = y.get(this);
                if (T) {
                  var w = b.get(this);
                  w && (this.removeEventListener("load", w.load), this.removeEventListener("error", w.error));
                  var M = /* @__PURE__ */ new Date(), C = function() {
                    return h(T.method, T.url, Ee(M));
                  }, U = function() {
                    return o(T.method, T.url, A.status, Ee(M));
                  };
                  this.addEventListener("load", U), this.addEventListener("error", C), this && b.set(this, {
                    load: U,
                    error: C
                  });
                }
                $.apply(this, arguments);
              };
            }
          }
          function o(y, b, m, $) {
            if (b === void 0) {
              r._logger.warn("The request URL is no longer present on this XMLHttpRequest. A breadcrumb cannot be left for this request.");
              return;
            }
            if (!(typeof b == "string" && p(a, b.replace(/\?.*$/, "")))) {
              var x = {
                status: m,
                method: String(y),
                url: String(b),
                duration: $
              };
              m >= 400 ? r.leaveBreadcrumb("XMLHttpRequest failed", x, ee) : r.leaveBreadcrumb("XMLHttpRequest succeeded", x, ee);
            }
          }
          function h(y, b, m) {
            if (b === void 0) {
              r._logger.warn("The request URL is no longer present on this XMLHttpRequest. A breadcrumb cannot be left for this request.");
              return;
            }
            typeof b == "string" && p(a, b.replace(/\?.*$/, "")) || r.leaveBreadcrumb("XMLHttpRequest error", {
              method: String(y),
              url: String(b),
              duration: m
            }, ee);
          }
          function d() {
            if (!(!("fetch" in t) || t.fetch.polyfill)) {
              var y = t.fetch;
              t.fetch = function() {
                var m = arguments, $ = arguments[0], x = arguments[1], S, A = null;
                return $ && typeof $ == "object" ? (A = $.url, x && "method" in x ? S = x.method : $ && "method" in $ && (S = $.method)) : (A = $, x && "method" in x && (S = x.method)), S === void 0 && (S = "GET"), new Promise(function(T, w) {
                  var M = /* @__PURE__ */ new Date();
                  y.apply(void 0, m).then(function(C) {
                    g(C, S, A, Ee(M)), T(C);
                  }).catch(function(C) {
                    v(S, A, Ee(M)), w(C);
                  });
                });
              };
            }
          }
          var g = function(y, b, m, $) {
            var x = {
              method: String(b),
              status: y.status,
              url: String(m),
              duration: $
            };
            y.status >= 400 ? r.leaveBreadcrumb("fetch() failed", x, ee) : r.leaveBreadcrumb("fetch() succeeded", x, ee);
          }, v = function(y, b, m) {
            r.leaveBreadcrumb("fetch() error", {
              method: String(y),
              url: String(b),
              duration: m
            }, ee);
          };
        }
      };
      return n;
    }, Ee = function(e) {
      return e && /* @__PURE__ */ new Date() - e;
    }, en = {
      load: function(e) {
        var t = 0;
        e.addOnError(function(n) {
          if (t >= e._config.maxEvents)
            return e._logger.warn("Cancelling event send due to maxEvents per session limit of " + e._config.maxEvents + " being reached"), !1;
          t++;
        }), e.resetEventCount = function() {
          t = 0;
        };
      },
      configSchema: {
        maxEvents: {
          defaultValue: function() {
            return 10;
          },
          message: "should be a positive integer ≤100",
          validate: function(e) {
            return R(1, 100)(e);
          }
        }
      }
    }, Fe = {};
    Fe = {
      load: function(e) {
        e.addOnError(function(t) {
          var n = u(t.errors, function(r, a) {
            return r.concat(a.stacktrace);
          }, []);
          k(n, function(r) {
            r.file = tn(r.file);
          });
        });
      }
    };
    var tn = Fe._strip = function(e) {
      return typeof e == "string" ? e.replace(/\?.*$/, "").replace(/#.*$/, "") : e;
    }, rn = function(e, t) {
      return e === void 0 && (e = window), t === void 0 && (t = "window onerror"), {
        load: function(n) {
          if (!n._config.autoDetectErrors || !n._config.enabledErrorTypes.unhandledExceptions) return;
          function r(c, o, h, d, g) {
            if (h === 0 && /Script error\.?/.test(c))
              n._logger.warn("Ignoring cross-domain or eval script error. See docs: https://tinyurl.com/yy3rn63z");
            else {
              var v = {
                severity: "error",
                unhandled: !0,
                severityReason: {
                  type: "unhandledException"
                }
              }, y;
              if (g)
                y = n.Event.create(g, !0, v, t, 1), wt(y.errors[0].stacktrace, o, h, d);
              else if (
                // This complex case detects "error" events that are typically synthesised
                // by jquery's trigger method (although can be created in other ways). In
                // order to detect this:
                // - the first argument (message) must exist and be an object (most likely it's a jQuery event)
                // - the second argument (url) must either not exist or be something other than a string (if it
                //    exists and is not a string, it'll be the extraParameters argument from jQuery's trigger()
                //    function)
                // - the third, fourth and fifth arguments must not exist (lineNo, charNo and error)
                typeof c == "object" && c !== null && (!o || typeof o != "string") && !h && !d && !g
              ) {
                var b = c.type ? "Event: " + c.type : "Error", m = c.message || c.detail || "";
                y = n.Event.create({
                  name: b,
                  message: m
                }, !0, v, t, 1), y.originalError = c, y.addMetadata(t, {
                  event: c,
                  extraParameters: o
                });
              } else
                y = n.Event.create(c, !0, v, t, 1), wt(y.errors[0].stacktrace, o, h, d);
              n._notify(y);
            }
            typeof a == "function" && a.apply(this, arguments);
          }
          var a = e.onerror;
          e.onerror = r;
        }
      };
    }, wt = function(e, t, n, r) {
      e[0] || e.push({});
      var a = e[0];
      !a.file && typeof t == "string" && (a.file = t), !a.lineNumber && Ve(n) && (a.lineNumber = n), a.columnNumber || (Ve(r) ? a.columnNumber = r : window.event && Ve(window.event.errorCharacter) && (a.columnNumber = window.event.errorCharacter));
    }, Ve = function(e) {
      return typeof e == "number" && String.call(e) !== "NaN";
    }, nn = function(e) {
      e === void 0 && (e = window);
      var t = {
        load: function(n) {
          if (!(!n._config.autoDetectErrors || !n._config.enabledErrorTypes.unhandledRejections)) {
            var r = function(a) {
              var c = a.reason, o = !1;
              try {
                a.detail && a.detail.reason && (c = a.detail.reason, o = !0);
              } catch {
              }
              var h = !n._config.reportUnhandledPromiseRejectionsAsHandled, d = n.Event.create(c, !1, {
                severity: "error",
                unhandled: h,
                severityReason: {
                  type: "unhandledPromiseRejection"
                }
              }, "unhandledrejection handler", 1, n._logger);
              o && k(d.errors[0].stacktrace, an(c)), n._notify(d, function(g) {
                if (be(g.originalError) && !g.originalError.stack) {
                  var v;
                  g.addMetadata("unhandledRejection handler", (v = {}, v[Object.prototype.toString.call(g.originalError)] = {
                    name: g.originalError.name,
                    message: g.originalError.message,
                    code: g.originalError.code
                  }, v));
                }
              });
            };
            "addEventListener" in e ? e.addEventListener("unhandledrejection", r) : e.onunhandledrejection = function(a, c) {
              r({
                detail: {
                  reason: a,
                  promise: c
                }
              });
            };
          }
        }
      };
      return t;
    }, an = function(e) {
      return function(t) {
        t.file !== e.toString() && t.method && (t.method = t.method.replace(/^\s+/, ""));
      };
    }, z = {}, sn = "Bugsnag JavaScript", on = "8.4.0", un = "https://github.com/bugsnag/bugsnag-js", cn = L({}, D.schema, Gt), I = {
      _client: null,
      createClient: function(e) {
        typeof e == "string" && (e = {
          apiKey: e
        }), e || (e = {});
        var t = [
          // add browser-specific plugins
          kr,
          Fr(),
          Ur(),
          Vr(),
          en,
          qr,
          Xr,
          Fe,
          rn(),
          nn(),
          xt(),
          Wr(),
          Qr(),
          St,
          // this one added last to avoid wrapping functionality before bugsnag uses it
          Jr()
        ], n = new ke(e, cn, t, {
          name: sn,
          version: on,
          url: un
        });
        return n._setDelivery(window.XDomainRequest ? Ue : Ir), n._logger.debug("Loaded!"), n.leaveBreadcrumb("Bugsnag loaded", {}, "state"), n._config.autoTrackSessions ? n.startSession() : n;
      },
      start: function(e) {
        return I._client ? (I._client._logger.warn("Bugsnag.start() was called more than once. Ignoring."), I._client) : (I._client = I.createClient(e), I._client);
      },
      isStarted: function() {
        return I._client != null;
      }
    };
    return k(["resetEventCount"].concat(N(ke.prototype)), function(e) {
      /^_/.test(e) || (I[e] = function() {
        if (!I._client) return console.log("Bugsnag." + e + "() was called before Bugsnag.start()");
        I._client._depth += 1;
        var t = I._client[e].apply(I._client, arguments);
        return I._client._depth -= 1, t;
      });
    }), z = I, z.Client = ke, z.Event = Me, z.Session = Ie, z.Breadcrumb = we, z.default = I, z;
  });
})(Ft);
var pn = Ft.exports, gn = pn;
const _n = /* @__PURE__ */ hn(gn);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis, Ge = Ae.ShadowRoot && (Ae.ShadyCSS === void 0 || Ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ye = Symbol(), Ct = /* @__PURE__ */ new WeakMap();
let Vt = class {
  constructor(i, s, u) {
    if (this._$cssResult$ = !0, u !== Ye) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = i, this.t = s;
  }
  get styleSheet() {
    let i = this.o;
    const s = this.t;
    if (Ge && i === void 0) {
      const u = s !== void 0 && s.length === 1;
      u && (i = Ct.get(s)), i === void 0 && ((this.o = i = new CSSStyleSheet()).replaceSync(this.cssText), u && Ct.set(s, i));
    }
    return i;
  }
  toString() {
    return this.cssText;
  }
};
const vn = (f) => new Vt(typeof f == "string" ? f : f + "", void 0, Ye), mn = (f, ...i) => {
  const s = f.length === 1 ? f[0] : i.reduce((u, l, p) => u + ((_) => {
    if (_._$cssResult$ === !0) return _.cssText;
    if (typeof _ == "number") return _;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + _ + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(l) + f[p + 1], f[0]);
  return new Vt(s, f, Ye);
}, yn = (f, i) => {
  if (Ge) f.adoptedStyleSheets = i.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of i) {
    const u = document.createElement("style"), l = Ae.litNonce;
    l !== void 0 && u.setAttribute("nonce", l), u.textContent = s.cssText, f.appendChild(u);
  }
}, Tt = Ge ? (f) => f : (f) => f instanceof CSSStyleSheet ? ((i) => {
  let s = "";
  for (const u of i.cssRules) s += u.cssText;
  return vn(s);
})(f) : f;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bn, defineProperty: Sn, getOwnPropertyDescriptor: $n, getOwnPropertyNames: En, getOwnPropertySymbols: An, getPrototypeOf: On } = Object, q = globalThis, Rt = q.trustedTypes, xn = Rt ? Rt.emptyScript : "", qe = q.reactiveElementPolyfillSupport, ce = (f, i) => f, Je = { toAttribute(f, i) {
  switch (i) {
    case Boolean:
      f = f ? xn : null;
      break;
    case Object:
    case Array:
      f = f == null ? f : JSON.stringify(f);
  }
  return f;
}, fromAttribute(f, i) {
  let s = f;
  switch (i) {
    case Boolean:
      s = f !== null;
      break;
    case Number:
      s = f === null ? null : Number(f);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(f);
      } catch {
        s = null;
      }
  }
  return s;
} }, qt = (f, i) => !bn(f, i), Mt = { attribute: !0, type: String, converter: Je, reflect: !1, useDefault: !1, hasChanged: qt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), q.litPropertyMetadata ?? (q.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let te = class extends HTMLElement {
  static addInitializer(i) {
    this._$Ei(), (this.l ?? (this.l = [])).push(i);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(i, s = Mt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(i) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(i, s), !s.noAccessor) {
      const u = Symbol(), l = this.getPropertyDescriptor(i, u, s);
      l !== void 0 && Sn(this.prototype, i, l);
    }
  }
  static getPropertyDescriptor(i, s, u) {
    const { get: l, set: p } = $n(this.prototype, i) ?? { get() {
      return this[s];
    }, set(_) {
      this[s] = _;
    } };
    return { get: l, set(_) {
      const O = l == null ? void 0 : l.call(this);
      p == null || p.call(this, _), this.requestUpdate(i, O, u);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(i) {
    return this.elementProperties.get(i) ?? Mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ce("elementProperties"))) return;
    const i = On(this);
    i.finalize(), i.l !== void 0 && (this.l = [...i.l]), this.elementProperties = new Map(i.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ce("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ce("properties"))) {
      const s = this.properties, u = [...En(s), ...An(s)];
      for (const l of u) this.createProperty(l, s[l]);
    }
    const i = this[Symbol.metadata];
    if (i !== null) {
      const s = litPropertyMetadata.get(i);
      if (s !== void 0) for (const [u, l] of s) this.elementProperties.set(u, l);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, u] of this.elementProperties) {
      const l = this._$Eu(s, u);
      l !== void 0 && this._$Eh.set(l, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(i) {
    const s = [];
    if (Array.isArray(i)) {
      const u = new Set(i.flat(1 / 0).reverse());
      for (const l of u) s.unshift(Tt(l));
    } else i !== void 0 && s.push(Tt(i));
    return s;
  }
  static _$Eu(i, s) {
    const u = s.attribute;
    return u === !1 ? void 0 : typeof u == "string" ? u : typeof i == "string" ? i.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var i;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (i = this.constructor.l) == null || i.forEach((s) => s(this));
  }
  addController(i) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(i), this.renderRoot !== void 0 && this.isConnected && ((s = i.hostConnected) == null || s.call(i));
  }
  removeController(i) {
    var s;
    (s = this._$EO) == null || s.delete(i);
  }
  _$E_() {
    const i = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const u of s.keys()) this.hasOwnProperty(u) && (i.set(u, this[u]), delete this[u]);
    i.size > 0 && (this._$Ep = i);
  }
  createRenderRoot() {
    const i = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return yn(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    var i;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (i = this._$EO) == null || i.forEach((s) => {
      var u;
      return (u = s.hostConnected) == null ? void 0 : u.call(s);
    });
  }
  enableUpdating(i) {
  }
  disconnectedCallback() {
    var i;
    (i = this._$EO) == null || i.forEach((s) => {
      var u;
      return (u = s.hostDisconnected) == null ? void 0 : u.call(s);
    });
  }
  attributeChangedCallback(i, s, u) {
    this._$AK(i, u);
  }
  _$ET(i, s) {
    var p;
    const u = this.constructor.elementProperties.get(i), l = this.constructor._$Eu(i, u);
    if (l !== void 0 && u.reflect === !0) {
      const _ = (((p = u.converter) == null ? void 0 : p.toAttribute) !== void 0 ? u.converter : Je).toAttribute(s, u.type);
      this._$Em = i, _ == null ? this.removeAttribute(l) : this.setAttribute(l, _), this._$Em = null;
    }
  }
  _$AK(i, s) {
    var p, _;
    const u = this.constructor, l = u._$Eh.get(i);
    if (l !== void 0 && this._$Em !== l) {
      const O = u.getPropertyOptions(l), E = typeof O.converter == "function" ? { fromAttribute: O.converter } : ((p = O.converter) == null ? void 0 : p.fromAttribute) !== void 0 ? O.converter : Je;
      this._$Em = l;
      const N = E.fromAttribute(s, O.type);
      this[l] = N ?? ((_ = this._$Ej) == null ? void 0 : _.get(l)) ?? N, this._$Em = null;
    }
  }
  requestUpdate(i, s, u) {
    var l;
    if (i !== void 0) {
      const p = this.constructor, _ = this[i];
      if (u ?? (u = p.getPropertyOptions(i)), !((u.hasChanged ?? qt)(_, s) || u.useDefault && u.reflect && _ === ((l = this._$Ej) == null ? void 0 : l.get(i)) && !this.hasAttribute(p._$Eu(i, u)))) return;
      this.C(i, s, u);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(i, s, { useDefault: u, reflect: l, wrapped: p }, _) {
    u && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(i) && (this._$Ej.set(i, _ ?? s ?? this[i]), p !== !0 || _ !== void 0) || (this._$AL.has(i) || (this.hasUpdated || u || (s = void 0), this._$AL.set(i, s)), l === !0 && this._$Em !== i && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(i));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const i = this.scheduleUpdate();
    return i != null && await i, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var u;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [p, _] of this._$Ep) this[p] = _;
        this._$Ep = void 0;
      }
      const l = this.constructor.elementProperties;
      if (l.size > 0) for (const [p, _] of l) {
        const { wrapped: O } = _, E = this[p];
        O !== !0 || this._$AL.has(p) || E === void 0 || this.C(p, void 0, _, E);
      }
    }
    let i = !1;
    const s = this._$AL;
    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), (u = this._$EO) == null || u.forEach((l) => {
        var p;
        return (p = l.hostUpdate) == null ? void 0 : p.call(l);
      }), this.update(s)) : this._$EM();
    } catch (l) {
      throw i = !1, this._$EM(), l;
    }
    i && this._$AE(s);
  }
  willUpdate(i) {
  }
  _$AE(i) {
    var s;
    (s = this._$EO) == null || s.forEach((u) => {
      var l;
      return (l = u.hostUpdated) == null ? void 0 : l.call(u);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(i)), this.updated(i);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(i) {
    return !0;
  }
  update(i) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(i) {
  }
  firstUpdated(i) {
  }
};
te.elementStyles = [], te.shadowRootOptions = { mode: "open" }, te[ce("elementProperties")] = /* @__PURE__ */ new Map(), te[ce("finalized")] = /* @__PURE__ */ new Map(), qe == null || qe({ ReactiveElement: te }), (q.reactiveElementVersions ?? (q.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = globalThis, Oe = le.trustedTypes, Lt = Oe ? Oe.createPolicy("lit-html", { createHTML: (f) => f }) : void 0, Kt = "$lit$", V = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + V, Nn = `<${Xt}>`, Y = document, fe = () => Y.createComment(""), he = (f) => f === null || typeof f != "object" && typeof f != "function", Ze = Array.isArray, Pn = (f) => Ze(f) || typeof (f == null ? void 0 : f[Symbol.iterator]) == "function", Ke = `[ 	
\f\r]`, ue = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Bt = /-->/g, Ht = />/g, J = RegExp(`>|${Ke}(?:([^\\s"'>=/]+)(${Ke}*=${Ke}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), It = /'/g, Dt = /"/g, zt = /^(?:script|style|textarea|title)$/i, wn = (f) => (i, ...s) => ({ _$litType$: f, strings: i, values: s }), Cn = wn(1), ne = Symbol.for("lit-noChange"), B = Symbol.for("lit-nothing"), kt = /* @__PURE__ */ new WeakMap(), W = Y.createTreeWalker(Y, 129);
function Jt(f, i) {
  if (!Ze(f) || !f.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Lt !== void 0 ? Lt.createHTML(i) : i;
}
const Tn = (f, i) => {
  const s = f.length - 1, u = [];
  let l, p = i === 2 ? "<svg>" : i === 3 ? "<math>" : "", _ = ue;
  for (let O = 0; O < s; O++) {
    const E = f[O];
    let N, R, P = -1, H = 0;
    for (; H < E.length && (_.lastIndex = H, R = _.exec(E), R !== null); ) H = _.lastIndex, _ === ue ? R[1] === "!--" ? _ = Bt : R[1] !== void 0 ? _ = Ht : R[2] !== void 0 ? (zt.test(R[2]) && (l = RegExp("</" + R[2], "g")), _ = J) : R[3] !== void 0 && (_ = J) : _ === J ? R[0] === ">" ? (_ = l ?? ue, P = -1) : R[1] === void 0 ? P = -2 : (P = _.lastIndex - R[2].length, N = R[1], _ = R[3] === void 0 ? J : R[3] === '"' ? Dt : It) : _ === Dt || _ === It ? _ = J : _ === Bt || _ === Ht ? _ = ue : (_ = J, l = void 0);
    const D = _ === J && f[O + 1].startsWith("/>") ? " " : "";
    p += _ === ue ? E + Nn : P >= 0 ? (u.push(N), E.slice(0, P) + Kt + E.slice(P) + V + D) : E + V + (P === -2 ? O : D);
  }
  return [Jt(f, p + (f[s] || "<?>") + (i === 2 ? "</svg>" : i === 3 ? "</math>" : "")), u];
};
class pe {
  constructor({ strings: i, _$litType$: s }, u) {
    let l;
    this.parts = [];
    let p = 0, _ = 0;
    const O = i.length - 1, E = this.parts, [N, R] = Tn(i, s);
    if (this.el = pe.createElement(N, u), W.currentNode = this.el.content, s === 2 || s === 3) {
      const P = this.el.content.firstChild;
      P.replaceWith(...P.childNodes);
    }
    for (; (l = W.nextNode()) !== null && E.length < O; ) {
      if (l.nodeType === 1) {
        if (l.hasAttributes()) for (const P of l.getAttributeNames()) if (P.endsWith(Kt)) {
          const H = R[_++], D = l.getAttribute(P).split(V), K = /([.?@])?(.*)/.exec(H);
          E.push({ type: 1, index: p, name: K[2], strings: D, ctor: K[1] === "." ? Mn : K[1] === "?" ? Ln : K[1] === "@" ? Bn : xe }), l.removeAttribute(P);
        } else P.startsWith(V) && (E.push({ type: 6, index: p }), l.removeAttribute(P));
        if (zt.test(l.tagName)) {
          const P = l.textContent.split(V), H = P.length - 1;
          if (H > 0) {
            l.textContent = Oe ? Oe.emptyScript : "";
            for (let D = 0; D < H; D++) l.append(P[D], fe()), W.nextNode(), E.push({ type: 2, index: ++p });
            l.append(P[H], fe());
          }
        }
      } else if (l.nodeType === 8) if (l.data === Xt) E.push({ type: 2, index: p });
      else {
        let P = -1;
        for (; (P = l.data.indexOf(V, P + 1)) !== -1; ) E.push({ type: 7, index: p }), P += V.length - 1;
      }
      p++;
    }
  }
  static createElement(i, s) {
    const u = Y.createElement("template");
    return u.innerHTML = i, u;
  }
}
function ie(f, i, s = f, u) {
  var _, O;
  if (i === ne) return i;
  let l = u !== void 0 ? (_ = s._$Co) == null ? void 0 : _[u] : s._$Cl;
  const p = he(i) ? void 0 : i._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== p && ((O = l == null ? void 0 : l._$AO) == null || O.call(l, !1), p === void 0 ? l = void 0 : (l = new p(f), l._$AT(f, s, u)), u !== void 0 ? (s._$Co ?? (s._$Co = []))[u] = l : s._$Cl = l), l !== void 0 && (i = ie(f, l._$AS(f, i.values), l, u)), i;
}
class Rn {
  constructor(i, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = i, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(i) {
    const { el: { content: s }, parts: u } = this._$AD, l = ((i == null ? void 0 : i.creationScope) ?? Y).importNode(s, !0);
    W.currentNode = l;
    let p = W.nextNode(), _ = 0, O = 0, E = u[0];
    for (; E !== void 0; ) {
      if (_ === E.index) {
        let N;
        E.type === 2 ? N = new ge(p, p.nextSibling, this, i) : E.type === 1 ? N = new E.ctor(p, E.name, E.strings, this, i) : E.type === 6 && (N = new Hn(p, this, i)), this._$AV.push(N), E = u[++O];
      }
      _ !== (E == null ? void 0 : E.index) && (p = W.nextNode(), _++);
    }
    return W.currentNode = Y, l;
  }
  p(i) {
    let s = 0;
    for (const u of this._$AV) u !== void 0 && (u.strings !== void 0 ? (u._$AI(i, u, s), s += u.strings.length - 2) : u._$AI(i[s])), s++;
  }
}
class ge {
  get _$AU() {
    var i;
    return ((i = this._$AM) == null ? void 0 : i._$AU) ?? this._$Cv;
  }
  constructor(i, s, u, l) {
    this.type = 2, this._$AH = B, this._$AN = void 0, this._$AA = i, this._$AB = s, this._$AM = u, this.options = l, this._$Cv = (l == null ? void 0 : l.isConnected) ?? !0;
  }
  get parentNode() {
    let i = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (i == null ? void 0 : i.nodeType) === 11 && (i = s.parentNode), i;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(i, s = this) {
    i = ie(this, i, s), he(i) ? i === B || i == null || i === "" ? (this._$AH !== B && this._$AR(), this._$AH = B) : i !== this._$AH && i !== ne && this._(i) : i._$litType$ !== void 0 ? this.$(i) : i.nodeType !== void 0 ? this.T(i) : Pn(i) ? this.k(i) : this._(i);
  }
  O(i) {
    return this._$AA.parentNode.insertBefore(i, this._$AB);
  }
  T(i) {
    this._$AH !== i && (this._$AR(), this._$AH = this.O(i));
  }
  _(i) {
    this._$AH !== B && he(this._$AH) ? this._$AA.nextSibling.data = i : this.T(Y.createTextNode(i)), this._$AH = i;
  }
  $(i) {
    var p;
    const { values: s, _$litType$: u } = i, l = typeof u == "number" ? this._$AC(i) : (u.el === void 0 && (u.el = pe.createElement(Jt(u.h, u.h[0]), this.options)), u);
    if (((p = this._$AH) == null ? void 0 : p._$AD) === l) this._$AH.p(s);
    else {
      const _ = new Rn(l, this), O = _.u(this.options);
      _.p(s), this.T(O), this._$AH = _;
    }
  }
  _$AC(i) {
    let s = kt.get(i.strings);
    return s === void 0 && kt.set(i.strings, s = new pe(i)), s;
  }
  k(i) {
    Ze(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let u, l = 0;
    for (const p of i) l === s.length ? s.push(u = new ge(this.O(fe()), this.O(fe()), this, this.options)) : u = s[l], u._$AI(p), l++;
    l < s.length && (this._$AR(u && u._$AB.nextSibling, l), s.length = l);
  }
  _$AR(i = this._$AA.nextSibling, s) {
    var u;
    for ((u = this._$AP) == null ? void 0 : u.call(this, !1, !0, s); i !== this._$AB; ) {
      const l = i.nextSibling;
      i.remove(), i = l;
    }
  }
  setConnected(i) {
    var s;
    this._$AM === void 0 && (this._$Cv = i, (s = this._$AP) == null || s.call(this, i));
  }
}
class xe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(i, s, u, l, p) {
    this.type = 1, this._$AH = B, this._$AN = void 0, this.element = i, this.name = s, this._$AM = l, this.options = p, u.length > 2 || u[0] !== "" || u[1] !== "" ? (this._$AH = Array(u.length - 1).fill(new String()), this.strings = u) : this._$AH = B;
  }
  _$AI(i, s = this, u, l) {
    const p = this.strings;
    let _ = !1;
    if (p === void 0) i = ie(this, i, s, 0), _ = !he(i) || i !== this._$AH && i !== ne, _ && (this._$AH = i);
    else {
      const O = i;
      let E, N;
      for (i = p[0], E = 0; E < p.length - 1; E++) N = ie(this, O[u + E], s, E), N === ne && (N = this._$AH[E]), _ || (_ = !he(N) || N !== this._$AH[E]), N === B ? i = B : i !== B && (i += (N ?? "") + p[E + 1]), this._$AH[E] = N;
    }
    _ && !l && this.j(i);
  }
  j(i) {
    i === B ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, i ?? "");
  }
}
class Mn extends xe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(i) {
    this.element[this.name] = i === B ? void 0 : i;
  }
}
class Ln extends xe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(i) {
    this.element.toggleAttribute(this.name, !!i && i !== B);
  }
}
class Bn extends xe {
  constructor(i, s, u, l, p) {
    super(i, s, u, l, p), this.type = 5;
  }
  _$AI(i, s = this) {
    if ((i = ie(this, i, s, 0) ?? B) === ne) return;
    const u = this._$AH, l = i === B && u !== B || i.capture !== u.capture || i.once !== u.once || i.passive !== u.passive, p = i !== B && (u === B || l);
    l && this.element.removeEventListener(this.name, this, u), p && this.element.addEventListener(this.name, this, i), this._$AH = i;
  }
  handleEvent(i) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, i) : this._$AH.handleEvent(i);
  }
}
class Hn {
  constructor(i, s, u) {
    this.element = i, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = u;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(i) {
    ie(this, i);
  }
}
const Xe = le.litHtmlPolyfillSupport;
Xe == null || Xe(pe, ge), (le.litHtmlVersions ?? (le.litHtmlVersions = [])).push("3.3.1");
const In = (f, i, s) => {
  const u = (s == null ? void 0 : s.renderBefore) ?? i;
  let l = u._$litPart$;
  if (l === void 0) {
    const p = (s == null ? void 0 : s.renderBefore) ?? null;
    u._$litPart$ = l = new ge(i.insertBefore(fe(), p), p, void 0, s ?? {});
  }
  return l._$AI(f), l;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis;
class de extends te {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const i = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = i.firstChild), i;
  }
  update(i) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(i), this._$Do = In(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var i;
    super.connectedCallback(), (i = this._$Do) == null || i.setConnected(!0);
  }
  disconnectedCallback() {
    var i;
    super.disconnectedCallback(), (i = this._$Do) == null || i.setConnected(!1);
  }
  render() {
    return ne;
  }
}
var jt;
de._$litElement$ = !0, de.finalized = !0, (jt = G.litElementHydrateSupport) == null || jt.call(G, { LitElement: de });
const ze = G.litElementPolyfillSupport;
ze == null || ze({ LitElement: de });
(G.litElementVersions ?? (G.litElementVersions = [])).push("4.2.1");
const Dn = "bb.locale.changed.v1";
let We = localStorage.getItem("locale") || "es";
const re = {};
let kn = async () => ({});
async function Un(f) {
  re[f] ?? (re[f] = {}), re[f][We] || (re[f][We] = await kn());
}
function Ut(f, i, s) {
  var l, p;
  return (((p = (l = re[f]) == null ? void 0 : l[We]) == null ? void 0 : p[i]) ?? `${f}.${i}?`).replace(/\{\{(\w+)\}\}/g, (_, O) => "");
}
class Wt extends de {
  constructor() {
    super(...arguments);
    oe(this, "basepath", "/apps/delivery-manager");
    oe(this, "route", "/");
    oe(this, "env");
  }
  async connectedCallback() {
    var s, u;
    super.connectedCallback(), await Un("delivery"), (u = (s = this.env) == null ? void 0 : s.bus) == null || u.addEventListener(Dn, () => this.requestUpdate());
  }
  render() {
    return Cn`<h2>${Ut("delivery", "title")}</h2>
      <p>${Ut("delivery", "intro")}</p>`;
  }
}
oe(Wt, "styles", mn`
    :host {
      display: block;
      padding: 8px;
    }
  `);
customElements.define("dlv-shell", Wt);
function qn(f) {
  const i = f.monitoring ?? (() => {
    var u, l;
    const s = _n.start({
      apiKey: void 0,
      releaseStage: void 0,
      appVersion: ((u = f.app) == null ? void 0 : u.version) ?? "0.0.0",
      appType: `microapp:${((l = f.app) == null ? void 0 : l.slug) ?? "unknown"}`,
      enabledReleaseStages: ["staging", "production"]
    });
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      notify: (p, _) => s.notify(p, _),
      breadcrumb: (p, _, O) => s.leaveBreadcrumb(p, _, O),
      setUser: (p, _, O) => s.setUser(p, _, O),
      addMeta: (p, _) => s.addMetadata(p, _),
      setContext: (p) => {
        s.context = p;
      }
    };
  })();
  i.addMeta("microapp", f.app), i.breadcrumb("microapp:mounted", { ...f.app }, "state");
}
export {
  qn as register
};
//# sourceMappingURL=remote.js.map
