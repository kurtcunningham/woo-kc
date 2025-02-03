(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var dayjs_min = {exports: {}};

	(function (module, exports) {
		!function (t, e) {
		  module.exports = e() ;
		}(commonjsGlobal, function () {

		  var t = 1e3,
		    e = 6e4,
		    n = 36e5,
		    r = "millisecond",
		    i = "second",
		    s = "minute",
		    u = "hour",
		    a = "day",
		    o = "week",
		    c = "month",
		    f = "quarter",
		    h = "year",
		    d = "date",
		    l = "Invalid Date",
		    $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
		    y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
		    M = {
		      name: "en",
		      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		      ordinal: function (t) {
		        var e = ["th", "st", "nd", "rd"],
		          n = t % 100;
		        return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]";
		      }
		    },
		    m = function (t, e, n) {
		      var r = String(t);
		      return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
		    },
		    v = {
		      s: m,
		      z: function (t) {
		        var e = -t.utcOffset(),
		          n = Math.abs(e),
		          r = Math.floor(n / 60),
		          i = n % 60;
		        return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
		      },
		      m: function t(e, n) {
		        if (e.date() < n.date()) return -t(n, e);
		        var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
		          i = e.clone().add(r, c),
		          s = n - i < 0,
		          u = e.clone().add(r + (s ? -1 : 1), c);
		        return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
		      },
		      a: function (t) {
		        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
		      },
		      p: function (t) {
		        return {
		          M: c,
		          y: h,
		          w: o,
		          d: a,
		          D: d,
		          h: u,
		          m: s,
		          s: i,
		          ms: r,
		          Q: f
		        }[t] || String(t || "").toLowerCase().replace(/s$/, "");
		      },
		      u: function (t) {
		        return void 0 === t;
		      }
		    },
		    g = "en",
		    D = {};
		  D[g] = M;
		  var p = "$isDayjsObject",
		    S = function (t) {
		      return t instanceof _ || !(!t || !t[p]);
		    },
		    w = function t(e, n, r) {
		      var i;
		      if (!e) return g;
		      if ("string" == typeof e) {
		        var s = e.toLowerCase();
		        D[s] && (i = s), n && (D[s] = n, i = s);
		        var u = e.split("-");
		        if (!i && u.length > 1) return t(u[0]);
		      } else {
		        var a = e.name;
		        D[a] = e, i = a;
		      }
		      return !r && i && (g = i), i || !r && g;
		    },
		    O = function (t, e) {
		      if (S(t)) return t.clone();
		      var n = "object" == typeof e ? e : {};
		      return n.date = t, n.args = arguments, new _(n);
		    },
		    b = v;
		  b.l = w, b.i = S, b.w = function (t, e) {
		    return O(t, {
		      locale: e.$L,
		      utc: e.$u,
		      x: e.$x,
		      $offset: e.$offset
		    });
		  };
		  var _ = function () {
		      function M(t) {
		        this.$L = w(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[p] = !0;
		      }
		      var m = M.prototype;
		      return m.parse = function (t) {
		        this.$d = function (t) {
		          var e = t.date,
		            n = t.utc;
		          if (null === e) return new Date(NaN);
		          if (b.u(e)) return new Date();
		          if (e instanceof Date) return new Date(e);
		          if ("string" == typeof e && !/Z$/i.test(e)) {
		            var r = e.match($);
		            if (r) {
		              var i = r[2] - 1 || 0,
		                s = (r[7] || "0").substring(0, 3);
		              return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
		            }
		          }
		          return new Date(e);
		        }(t), this.init();
		      }, m.init = function () {
		        var t = this.$d;
		        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
		      }, m.$utils = function () {
		        return b;
		      }, m.isValid = function () {
		        return !(this.$d.toString() === l);
		      }, m.isSame = function (t, e) {
		        var n = O(t);
		        return this.startOf(e) <= n && n <= this.endOf(e);
		      }, m.isAfter = function (t, e) {
		        return O(t) < this.startOf(e);
		      }, m.isBefore = function (t, e) {
		        return this.endOf(e) < O(t);
		      }, m.$g = function (t, e, n) {
		        return b.u(t) ? this[e] : this.set(n, t);
		      }, m.unix = function () {
		        return Math.floor(this.valueOf() / 1e3);
		      }, m.valueOf = function () {
		        return this.$d.getTime();
		      }, m.startOf = function (t, e) {
		        var n = this,
		          r = !!b.u(e) || e,
		          f = b.p(t),
		          l = function (t, e) {
		            var i = b.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
		            return r ? i : i.endOf(a);
		          },
		          $ = function (t, e) {
		            return b.w(n.toDate()[t].apply(n.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n);
		          },
		          y = this.$W,
		          M = this.$M,
		          m = this.$D,
		          v = "set" + (this.$u ? "UTC" : "");
		        switch (f) {
		          case h:
		            return r ? l(1, 0) : l(31, 11);
		          case c:
		            return r ? l(1, M) : l(0, M + 1);
		          case o:
		            var g = this.$locale().weekStart || 0,
		              D = (y < g ? y + 7 : y) - g;
		            return l(r ? m - D : m + (6 - D), M);
		          case a:
		          case d:
		            return $(v + "Hours", 0);
		          case u:
		            return $(v + "Minutes", 1);
		          case s:
		            return $(v + "Seconds", 2);
		          case i:
		            return $(v + "Milliseconds", 3);
		          default:
		            return this.clone();
		        }
		      }, m.endOf = function (t) {
		        return this.startOf(t, !1);
		      }, m.$set = function (t, e) {
		        var n,
		          o = b.p(t),
		          f = "set" + (this.$u ? "UTC" : ""),
		          l = (n = {}, n[a] = f + "Date", n[d] = f + "Date", n[c] = f + "Month", n[h] = f + "FullYear", n[u] = f + "Hours", n[s] = f + "Minutes", n[i] = f + "Seconds", n[r] = f + "Milliseconds", n)[o],
		          $ = o === a ? this.$D + (e - this.$W) : e;
		        if (o === c || o === h) {
		          var y = this.clone().set(d, 1);
		          y.$d[l]($), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
		        } else l && this.$d[l]($);
		        return this.init(), this;
		      }, m.set = function (t, e) {
		        return this.clone().$set(t, e);
		      }, m.get = function (t) {
		        return this[b.p(t)]();
		      }, m.add = function (r, f) {
		        var d,
		          l = this;
		        r = Number(r);
		        var $ = b.p(f),
		          y = function (t) {
		            var e = O(l);
		            return b.w(e.date(e.date() + Math.round(t * r)), l);
		          };
		        if ($ === c) return this.set(c, this.$M + r);
		        if ($ === h) return this.set(h, this.$y + r);
		        if ($ === a) return y(1);
		        if ($ === o) return y(7);
		        var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[$] || 1,
		          m = this.$d.getTime() + r * M;
		        return b.w(m, this);
		      }, m.subtract = function (t, e) {
		        return this.add(-1 * t, e);
		      }, m.format = function (t) {
		        var e = this,
		          n = this.$locale();
		        if (!this.isValid()) return n.invalidDate || l;
		        var r = t || "YYYY-MM-DDTHH:mm:ssZ",
		          i = b.z(this),
		          s = this.$H,
		          u = this.$m,
		          a = this.$M,
		          o = n.weekdays,
		          c = n.months,
		          f = n.meridiem,
		          h = function (t, n, i, s) {
		            return t && (t[n] || t(e, r)) || i[n].slice(0, s);
		          },
		          d = function (t) {
		            return b.s(s % 12 || 12, t, "0");
		          },
		          $ = f || function (t, e, n) {
		            var r = t < 12 ? "AM" : "PM";
		            return n ? r.toLowerCase() : r;
		          };
		        return r.replace(y, function (t, r) {
		          return r || function (t) {
		            switch (t) {
		              case "YY":
		                return String(e.$y).slice(-2);
		              case "YYYY":
		                return b.s(e.$y, 4, "0");
		              case "M":
		                return a + 1;
		              case "MM":
		                return b.s(a + 1, 2, "0");
		              case "MMM":
		                return h(n.monthsShort, a, c, 3);
		              case "MMMM":
		                return h(c, a);
		              case "D":
		                return e.$D;
		              case "DD":
		                return b.s(e.$D, 2, "0");
		              case "d":
		                return String(e.$W);
		              case "dd":
		                return h(n.weekdaysMin, e.$W, o, 2);
		              case "ddd":
		                return h(n.weekdaysShort, e.$W, o, 3);
		              case "dddd":
		                return o[e.$W];
		              case "H":
		                return String(s);
		              case "HH":
		                return b.s(s, 2, "0");
		              case "h":
		                return d(1);
		              case "hh":
		                return d(2);
		              case "a":
		                return $(s, u, !0);
		              case "A":
		                return $(s, u, !1);
		              case "m":
		                return String(u);
		              case "mm":
		                return b.s(u, 2, "0");
		              case "s":
		                return String(e.$s);
		              case "ss":
		                return b.s(e.$s, 2, "0");
		              case "SSS":
		                return b.s(e.$ms, 3, "0");
		              case "Z":
		                return i;
		            }
		            return null;
		          }(t) || i.replace(":", "");
		        });
		      }, m.utcOffset = function () {
		        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
		      }, m.diff = function (r, d, l) {
		        var $,
		          y = this,
		          M = b.p(d),
		          m = O(r),
		          v = (m.utcOffset() - this.utcOffset()) * e,
		          g = this - m,
		          D = function () {
		            return b.m(y, m);
		          };
		        switch (M) {
		          case h:
		            $ = D() / 12;
		            break;
		          case c:
		            $ = D();
		            break;
		          case f:
		            $ = D() / 3;
		            break;
		          case o:
		            $ = (g - v) / 6048e5;
		            break;
		          case a:
		            $ = (g - v) / 864e5;
		            break;
		          case u:
		            $ = g / n;
		            break;
		          case s:
		            $ = g / e;
		            break;
		          case i:
		            $ = g / t;
		            break;
		          default:
		            $ = g;
		        }
		        return l ? $ : b.a($);
		      }, m.daysInMonth = function () {
		        return this.endOf(c).$D;
		      }, m.$locale = function () {
		        return D[this.$L];
		      }, m.locale = function (t, e) {
		        if (!t) return this.$L;
		        var n = this.clone(),
		          r = w(t, e, !0);
		        return r && (n.$L = r), n;
		      }, m.clone = function () {
		        return b.w(this.$d, this);
		      }, m.toDate = function () {
		        return new Date(this.valueOf());
		      }, m.toJSON = function () {
		        return this.isValid() ? this.toISOString() : null;
		      }, m.toISOString = function () {
		        return this.$d.toISOString();
		      }, m.toString = function () {
		        return this.$d.toUTCString();
		      }, M;
		    }(),
		    k = _.prototype;
		  return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function (t) {
		    k[t[1]] = function (e) {
		      return this.$g(e, t[0], t[1]);
		    };
		  }), O.extend = function (t, e) {
		    return t.$i || (t(e, _, O), t.$i = !0), O;
		  }, O.locale = w, O.isDayjs = S, O.unix = function (t) {
		    return O(1e3 * t);
		  }, O.en = D[g], O.Ls = D, O.p = {}, O;
		}); 
	} (dayjs_min));

	var dayjs_minExports = dayjs_min.exports;
	var dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

	function isValidDate(dateValue) {
	  if (dateValue == null || dateValue == '' || dateValue == false) {
	    return false;
	  }
	  const date = dayjs(dateValue);
	  return date.isValid();
	}

	var utc = {exports: {}};

	(function (module, exports) {
		!function (t, i) {
		  module.exports = i() ;
		}(commonjsGlobal, function () {

		  var t = "minute",
		    i = /[+-]\d\d(?::?\d\d)?/g,
		    e = /([+-]|\d\d)/g;
		  return function (s, f, n) {
		    var u = f.prototype;
		    n.utc = function (t) {
		      var i = {
		        date: t,
		        utc: !0,
		        args: arguments
		      };
		      return new f(i);
		    }, u.utc = function (i) {
		      var e = n(this.toDate(), {
		        locale: this.$L,
		        utc: !0
		      });
		      return i ? e.add(this.utcOffset(), t) : e;
		    }, u.local = function () {
		      return n(this.toDate(), {
		        locale: this.$L,
		        utc: !1
		      });
		    };
		    var o = u.parse;
		    u.parse = function (t) {
		      t.utc && (this.$u = !0), this.$utils().u(t.$offset) || (this.$offset = t.$offset), o.call(this, t);
		    };
		    var r = u.init;
		    u.init = function () {
		      if (this.$u) {
		        var t = this.$d;
		        this.$y = t.getUTCFullYear(), this.$M = t.getUTCMonth(), this.$D = t.getUTCDate(), this.$W = t.getUTCDay(), this.$H = t.getUTCHours(), this.$m = t.getUTCMinutes(), this.$s = t.getUTCSeconds(), this.$ms = t.getUTCMilliseconds();
		      } else r.call(this);
		    };
		    var a = u.utcOffset;
		    u.utcOffset = function (s, f) {
		      var n = this.$utils().u;
		      if (n(s)) return this.$u ? 0 : n(this.$offset) ? a.call(this) : this.$offset;
		      if ("string" == typeof s && (s = function (t) {
		        void 0 === t && (t = "");
		        var s = t.match(i);
		        if (!s) return null;
		        var f = ("" + s[0]).match(e) || ["-", 0, 0],
		          n = f[0],
		          u = 60 * +f[1] + +f[2];
		        return 0 === u ? 0 : "+" === n ? u : -u;
		      }(s), null === s)) return this;
		      var u = Math.abs(s) <= 16 ? 60 * s : s,
		        o = this;
		      if (f) return o.$offset = u, o.$u = 0 === s, o;
		      if (0 !== s) {
		        var r = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
		        (o = this.local().add(u + r, t)).$offset = u, o.$x.$localOffset = r;
		      } else o = this.utc();
		      return o;
		    };
		    var h = u.format;
		    u.format = function (t) {
		      var i = t || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
		      return h.call(this, i);
		    }, u.valueOf = function () {
		      var t = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
		      return this.$d.valueOf() - 6e4 * t;
		    }, u.isUTC = function () {
		      return !!this.$u;
		    }, u.toISOString = function () {
		      return this.toDate().toISOString();
		    }, u.toString = function () {
		      return this.toDate().toUTCString();
		    };
		    var l = u.toDate;
		    u.toDate = function (t) {
		      return "s" === t && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
		    };
		    var c = u.diff;
		    u.diff = function (t, i, e) {
		      if (t && this.$u === t.$u) return c.call(this, t, i, e);
		      var s = this.local(),
		        f = n(t).local();
		      return c.call(s, f, i, e);
		    };
		  };
		}); 
	} (utc));

	var utcExports = utc.exports;
	var dayjsUtc = /*@__PURE__*/getDefaultExportFromCjs(utcExports);

	var timezone = {exports: {}};

	(function (module, exports) {
		!function (t, e) {
		  module.exports = e() ;
		}(commonjsGlobal, function () {

		  var t = {
		      year: 0,
		      month: 1,
		      day: 2,
		      hour: 3,
		      minute: 4,
		      second: 5
		    },
		    e = {};
		  return function (n, i, o) {
		    var r,
		      a = function (t, n, i) {
		        void 0 === i && (i = {});
		        var o = new Date(t),
		          r = function (t, n) {
		            void 0 === n && (n = {});
		            var i = n.timeZoneName || "short",
		              o = t + "|" + i,
		              r = e[o];
		            return r || (r = new Intl.DateTimeFormat("en-US", {
		              hour12: !1,
		              timeZone: t,
		              year: "numeric",
		              month: "2-digit",
		              day: "2-digit",
		              hour: "2-digit",
		              minute: "2-digit",
		              second: "2-digit",
		              timeZoneName: i
		            }), e[o] = r), r;
		          }(n, i);
		        return r.formatToParts(o);
		      },
		      u = function (e, n) {
		        for (var i = a(e, n), r = [], u = 0; u < i.length; u += 1) {
		          var f = i[u],
		            s = f.type,
		            m = f.value,
		            c = t[s];
		          c >= 0 && (r[c] = parseInt(m, 10));
		        }
		        var d = r[3],
		          l = 24 === d ? 0 : d,
		          h = r[0] + "-" + r[1] + "-" + r[2] + " " + l + ":" + r[4] + ":" + r[5] + ":000",
		          v = +e;
		        return (o.utc(h).valueOf() - (v -= v % 1e3)) / 6e4;
		      },
		      f = i.prototype;
		    f.tz = function (t, e) {
		      void 0 === t && (t = r);
		      var n = this.utcOffset(),
		        i = this.toDate(),
		        a = i.toLocaleString("en-US", {
		          timeZone: t
		        }),
		        u = Math.round((i - new Date(a)) / 1e3 / 60),
		        f = o(a, {
		          locale: this.$L
		        }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(i.getTimezoneOffset() / 15) - u, !0);
		      if (e) {
		        var s = f.utcOffset();
		        f = f.add(n - s, "minute");
		      }
		      return f.$x.$timezone = t, f;
		    }, f.offsetName = function (t) {
		      var e = this.$x.$timezone || o.tz.guess(),
		        n = a(this.valueOf(), e, {
		          timeZoneName: t
		        }).find(function (t) {
		          return "timezonename" === t.type.toLowerCase();
		        });
		      return n && n.value;
		    };
		    var s = f.startOf;
		    f.startOf = function (t, e) {
		      if (!this.$x || !this.$x.$timezone) return s.call(this, t, e);
		      var n = o(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
		        locale: this.$L
		      });
		      return s.call(n, t, e).tz(this.$x.$timezone, !0);
		    }, o.tz = function (t, e, n) {
		      var i = n && e,
		        a = n || e || r,
		        f = u(+o(), a);
		      if ("string" != typeof t) return o(t).tz(a);
		      var s = function (t, e, n) {
		          var i = t - 60 * e * 1e3,
		            o = u(i, n);
		          if (e === o) return [i, e];
		          var r = u(i -= 60 * (o - e) * 1e3, n);
		          return o === r ? [i, o] : [t - 60 * Math.min(o, r) * 1e3, Math.max(o, r)];
		        }(o.utc(t, i).valueOf(), f, a),
		        m = s[0],
		        c = s[1],
		        d = o(m).utcOffset(c);
		      return d.$x.$timezone = a, d;
		    }, o.tz.guess = function () {
		      return Intl.DateTimeFormat().resolvedOptions().timeZone;
		    }, o.tz.setDefault = function (t) {
		      r = t;
		    };
		  };
		}); 
	} (timezone));

	var timezoneExports = timezone.exports;
	var dayjsTimezone = /*@__PURE__*/getDefaultExportFromCjs(timezoneExports);

	function isString(value) {
	  return typeof value === 'string';
	}
	function isEmptyString(str) {
	  return str == null || str.trim() === '';
	}
	function isNonEmptyString(str) {
	  return isString(str) && !isEmptyString(str);
	}

	// Register DayJS timezone plugins.
	dayjs.extend(dayjsUtc);
	dayjs.extend(dayjsTimezone);
	const utcTimezone = 'UTC';
	const dbNoTzDateFormat = 'YYYY-MM-DD[T]HH:mm:ss';
	function getSiteTimezone() {
	  const timezone = wp.date.getSettings()?.timezone;
	  const timezoneSlug = isNonEmptyString(timezone?.string) ? timezone.string : 'UTC';
	  return timezoneSlug;
	}
	function hasSiteTimezone() {
	  return isNonEmptyString(wp.date.getSettings()?.timezone?.string);
	}
	function siteToUtcTime(siteTimestamp) {
	  return dayjs.tz(siteTimestamp, getSiteTimezone()).tz(utcTimezone);
	}
	function utcToSiteTime(utcTimestamp) {
	  return dayjs.tz(utcTimestamp, utcTimezone).tz(getSiteTimezone());
	}
	function dbDateFormat(dayJsDate) {
	  return dayJsDate.format(dbNoTzDateFormat);
	}

	const dateControlRow = {
	  flexDirection: 'column',
	  alignItems: 'flex-start',
	  gap: '0.7em',
	  marginBottom: '1em'
	};
	const formLabel = {
	  fontSize: '11px',
	  fontWeight: '500',
	  lineHeight: '1.4',
	  textTransform: 'uppercase',
	  display: 'block',
	  marginBottom: 'calc(8px)',
	  paddingTop: '0px'
	};
	const dateField = {
	  border: '1px solid #949494',
	  borderRadius: '2px',
	  boxShadow: '0 0 0 #0000',
	  display: 'block',
	  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif',
	  fontSize: '13px',
	  height: '36px',
	  lineHeight: 'normal',
	  marginBottom: '0',
	  marginRight: '4px',
	  padding: '8px',
	  transition: 'box-shadow .1s linear',
	  width: '100%'
	};
	function EventDatePicker({
	  label,
	  date,
	  onChange,
	  otherDates = [],
	  minimumDate = null,
	  maximumDate = null
	}) {
	  const hasWorkingDate = isValidDate(date);
	  const workingDate = hasWorkingDate ? dbDateFormat(date) : null;
	  const [newDate, setNewDate] = wp.element.useState(workingDate);
	  const [popoverAnchor, setPopoverAnchor] = wp.element.useState();
	  const [isVisible, setIsVisible] = wp.element.useState(false);
	  const toggleVisible = () => {
	    // TODO: not sure this is necessary.
	    if (isVisible === true) {
	      setNewDate(workingDate);
	    }
	    setIsVisible(state => !state);
	  };
	  const onClickSave = () => {
	    onChange(newDate);
	    setIsVisible(false);
	  };
	  const onClickClear = () => {
	    onChange('');
	    setIsVisible(false);
	  };
	  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
	    style: dateControlRow
	  }, /*#__PURE__*/React.createElement("label", {
	    className: "components-base-control__label",
	    style: formLabel
	  }, label), /*#__PURE__*/React.createElement("p", {
	    style: dateField
	  }, hasWorkingDate ? dayjs(workingDate).format('MMM D, YYYY [at] h:mm A') : ''), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(wp.components.Button, {
	    ref: setPopoverAnchor,
	    variant: "link",
	    onClick: toggleVisible
	  }, "Set Date"), /*#__PURE__*/React.createElement(wp.components.Button, {
	    onClick: onClickClear
	  }, "Clear")))), isVisible && /*#__PURE__*/React.createElement(wp.components.Popover, {
	    anchor: popoverAnchor,
	    placement: "left",
	    focusOnMount: true,
	    noArrow: false
	  }, /*#__PURE__*/React.createElement("div", {
	    style: {
	      padding: '1em'
	    }
	  }, /*#__PURE__*/React.createElement(wp.components.DateTimePicker, {
	    currentDate: newDate,
	    onChange: newDate => {
	      setNewDate(newDate);
	    },
	    is12Hour: true,
	    startOfWeek: 1,
	    events: otherDates
	    // Filter out invalid dates, so they don't throw errors when 
	    // converted to JS Date objects in the subsequent map operation.
	    .filter(date => isValidDate(date)).map(dayJsDate => {
	      return {
	        date: dayJsDate.toDate()
	      };
	    }),
	    isInvalidDate: date => {
	      if (minimumDate && dayjs(date).isBefore(dayjs(minimumDate), 'day')) {
	        return true;
	      }
	      if (maximumDate && dayjs(date).isAfter(dayjs(maximumDate), 'day')) {
	        return true;
	      }
	      return false;
	    }
	  }), /*#__PURE__*/React.createElement("div", {
	    style: {
	      marginTop: '1em'
	    }
	  }, /*#__PURE__*/React.createElement(wp.components.Button, {
	    variant: "secondary",
	    onClick: onClickSave
	  }, "Save"), /*#__PURE__*/React.createElement(wp.components.Button, {
	    onClick: toggleVisible
	  }, "Cancel")))));
	}

	// Source: https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
	function isValidUrl(urlString) {
	  let url;
	  try {
	    url = new URL(urlString);
	  } catch (e) {
	    return false;
	  }
	  return url.protocol === "http:" || url.protocol === "https:";
	}

	const helperTextStyles = {
	  color: '#757575'
	};
	function HelperText({
	  children
	}) {
	  return /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement("p", {
	    className: "inspector-text-control-1__help",
	    style: helperTextStyles
	  }, children));
	}

	const pluginName = 'mbm-npt-events-sidebar';
	function Sidebar() {
	  const post = wp.data.select('core/editor').getCurrentPost();

	  // Only proceed if post is available.
	  if (post == null) {
	    return null;
	  }
	  if (post.type !== 'mbm_npt_events') {
	    return null;
	  }
	  const [meta, updateMeta] = wp.coreData.useEntityProp('postType', post.type, 'meta', post.id);
	  console.log(`[Sidebar] meta:`, meta);
	  const siteTzStartDate = isValidDate(meta.mbm_npt_events_start_date) ? utcToSiteTime(meta.mbm_npt_events_start_date) : false;
	  const siteTzEndDate = isValidDate(meta.mbm_npt_events_end_date) ? utcToSiteTime(meta.mbm_npt_events_end_date) : false;
	  const hasRegistrationUrl = isValidUrl(meta.mbm_npt_events_register_link_url);
	  const siteTzRegDeadline = isValidDate(meta.mbm_npt_events_register_deadline_date) ? utcToSiteTime(meta.mbm_npt_events_register_deadline_date) : false;
	  const dateChangeHandler = metaKey => newDate => {
	    // Convert site time to UTC time
	    let newDateSerialized = '';
	    if (isValidDate(newDate)) {
	      newDateSerialized = dbDateFormat(siteToUtcTime(newDate));
	    }
	    updateMeta({
	      ...meta,
	      [metaKey]: newDateSerialized
	    });

	    // dispatch('core/notices').createNotice(
	    //   'warning', // Can be one of: success, info, warning, error.
	    //   'This is a warning notice.', // Text string to display.
	    //   {
	    //     isDismissible: true, // Whether the user can dismiss the notice.
	    //     // Any actions the user can perform.
	    //     // actions: [
	    //     //   {
	    //     //     url: 'https://example.com',
	    //     //     label: 'Learn more',
	    //     //   },
	    //     // ],
	    //   }
	    // );
	  };
	  return /*#__PURE__*/React.createElement(wp.editor.PluginSidebar, {
	    name: pluginName,
	    title: "Amplify \u2014 Events",
	    icon: "calendar-alt"
	  }, !hasSiteTimezone() && /*#__PURE__*/React.createElement(wp.components.Notice, {
	    status: "warning",
	    isDismissible: false
	  }, "The site timezone is not set. Please set the timezone in the General Settings. ", /*#__PURE__*/React.createElement("a", {
	    href: "/wp-admin/options-general.php"
	  }, "Set your website's timezone.")), /*#__PURE__*/React.createElement(wp.components.PanelBody, {
	    title: wp.i18n.__('Event Registration Details'),
	    initialOpen: true
	  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.components.TextControl, {
	    label: wp.i18n.__('Add Registration URL', 'mbm-npt-events'),
	    value: meta.mbm_npt_events_register_link_url,
	    onChange: value => updateMeta({
	      ...meta,
	      mbm_npt_events_register_link_url: value
	    })
	  })), /*#__PURE__*/React.createElement(HelperText, null, "Include a direct link to the website where guests can register for the event. This link will be automatically added to the Event Registration Button block."), hasRegistrationUrl && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EventDatePicker, {
	    label: "Registration Deadline",
	    date: siteTzRegDeadline,
	    onChange: dateChangeHandler('mbm_npt_events_register_deadline_date'),
	    otherDates: [siteTzStartDate, siteTzEndDate]
	  }), /*#__PURE__*/React.createElement(HelperText, null, "The optional registration deadline will disable the registration link after the specified date and time."))), /*#__PURE__*/React.createElement(wp.components.PanelBody, {
	    title: wp.i18n.__('Event Information'),
	    initialOpen: true
	  }, /*#__PURE__*/React.createElement(EventDatePicker, {
	    label: "Start Date & Time",
	    date: siteTzStartDate,
	    maximumDate: siteTzEndDate,
	    onChange: dateChangeHandler('mbm_npt_events_start_date'),
	    otherDates: [siteTzRegDeadline, siteTzEndDate]
	  }), /*#__PURE__*/React.createElement(EventDatePicker, {
	    label: "End Date & Time",
	    date: siteTzEndDate,
	    minimumDate: siteTzStartDate,
	    onChange: dateChangeHandler('mbm_npt_events_end_date'),
	    otherDates: [siteTzRegDeadline, siteTzStartDate]
	  })));
	}

	wp.plugins.registerPlugin(pluginName, {
	  render: Sidebar
	});

	const QUERY_BLOCK_SLUG = 'core/query';
	const PostExclusionControls = ({
	  attributes,
	  setAttributes
	}) => {
	  const {
	    mbmNptEventDateFilter
	  } = attributes;
	  return /*#__PURE__*/React.createElement(wp.components.PanelBody, {
	    title: "Event Date Filter"
	  }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
	    label: wp.i18n.__('Filter by event date'),
	    options: [{
	      label: 'No event date filtering (default)',
	      value: ''
	    }, {
	      label: 'Show only future events',
	      value: 'show_only_future'
	    }, {
	      label: 'Show only past events',
	      value: 'show_only_past'
	    }],
	    value: mbmNptEventDateFilter,
	    onChange: mbmNptEventDateFilter => setAttributes({
	      mbmNptEventDateFilter
	    }),
	    help: `Select which events you want to be visible based on the event date.`
	  })));
	};
	const withExtraControls = BlockEdit => props => {
	  const {
	    name
	  } = props;
	  const defaultControls = /*#__PURE__*/React.createElement(BlockEdit, props);
	  if (name !== QUERY_BLOCK_SLUG) {
	    return defaultControls;
	  }

	  // Only add controls if this is an Events query.
	  const queryPostType = props?.attributes?.query?.postType;
	  if (queryPostType !== 'mbm_npt_events') {
	    return defaultControls;
	  }
	  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(PostExclusionControls, props)));
	};
	const attributesFilter = (settings, name) => {
	  if (name !== QUERY_BLOCK_SLUG) {
	    return settings;
	  }
	  return {
	    ...settings,
	    attributes: {
	      ...settings.attributes,
	      mbmNptEventDateFilter: {
	        type: 'string',
	        default: ''
	      }
	    }
	  };
	};

	// Registration
	wp.hooks.addFilter('editor.BlockEdit', QUERY_BLOCK_SLUG, withExtraControls);
	wp.hooks.addFilter('blocks.registerBlockType', 'amplify-events/query-loop-event-date-filter', attributesFilter);

	var $schema$2 = "https://schemas.wp.org/trunk/block.json";
	var apiVersion$2 = 3;
	var title$2 = "Event Date";
	var name$2 = "mbm-npt-events/event-date";
	var description$2 = "Display the date and time for an upcoming event.";
	var category$2 = "mbm-npt-events";
	var usesContext$2 = [
		"postId",
		"postType"
	];
	var attributes$1 = {
		eventDateType: {
			type: "string",
			"default": "start"
		},
		futureDateFormat: {
			type: "string",
			"default": "M j, Y g:i A"
		},
		pastDateFormat: {
			type: "string",
			"default": null
		}
	};
	var supports$2 = {
		anchor: true,
		align: true,
		ariaLabel: false,
		className: true,
		color: {
			background: true,
			gradients: true,
			link: true,
			text: true
		},
		customClassName: true,
		dimensions: {
			minHeight: true
		},
		layout: false,
		multiple: true,
		reusable: true,
		spacing: {
			margin: true,
			padding: true,
			blockGap: true
		},
		typography: {
			fontSize: true,
			lineHeight: true
		},
		interactivity: true
	};
	var render$2 = "file:./render.php";
	var editorScript$1 = "mbm-npt-events/editor/script";
	var editorStyle$1 = "mbm-npt-events/editor/style";
	var style$1 = "mbm-npt-events/front/style";
	var blockDef$2 = {
		$schema: $schema$2,
		apiVersion: apiVersion$2,
		title: title$2,
		name: name$2,
		description: description$2,
		category: category$2,
		usesContext: usesContext$2,
		attributes: attributes$1,
		supports: supports$2,
		render: render$2,
		editorScript: editorScript$1,
		editorStyle: editorStyle$1,
		style: style$1
	};

	/*
		This is a clone of the stock DateFormatPicker.
		https://github.dev/WordPress/gutenberg/blob/d0a190b65cebe27652e1a4d8d38a714d624e54ad/packages/block-editor/src/components/date-format-picker/index.js#L1

		I was created because the DateFormatPicker doesn't provide enough 
		customization options (label and format set) for our needs. 
	*/





	const exampleDate = new Date(`${new Date().getFullYear()}-10-31T13:00:00`);
	function EventDateFormatPicker({
	  label,
	  dateFormat,
	  onChange
	}) {
	  const suggestedFormats = ['M j, Y', 'M j, Y g:i A', 'F j, Y'];
	  const suggestedOptions = suggestedFormats.map(format => ({
	    key: `suggested-${format}`,
	    format: format,
	    name: wp.date.dateI18n(format, exampleDate)
	  }));
	  const customOption = {
	    key: 'custom',
	    name: wp.i18n.__('Custom'),
	    className: 'block-editor-date-format-picker__custom-format-select-control__custom-option',
	    hint: wp.i18n.__('Enter your own date format')
	  };
	  const matchingSuggestedOption = suggestedOptions.find(option => option.format === dateFormat);
	  const [isCustom, setIsCustom] = wp.element.useState(() => !!dateFormat && !matchingSuggestedOption);
	  const controlValue = isCustom ? customOption : matchingSuggestedOption ?? customOption;
	  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.components.__experimentalVStack, null, /*#__PURE__*/React.createElement(wp.components.CustomSelectControl, {
	    __next40pxDefaultSize: true,
	    label: wp.i18n.__(label),
	    options: [...suggestedOptions, customOption],
	    value: controlValue,
	    onChange: ({
	      selectedItem
	    }) => {
	      if (selectedItem === customOption) {
	        setIsCustom(true);
	      } else {
	        setIsCustom(false);
	        onChange(selectedItem.format);
	      }
	    }
	  }), isCustom && /*#__PURE__*/React.createElement(wp.components.TextControl, {
	    __next40pxDefaultSize: true,
	    label: wp.i18n.__('Custom format'),
	    hideLabelFromVision: true,
	    help: wp.element.createInterpolateElement(wp.i18n.__('Enter a date or time <Link>format string</Link>.'), {
	      Link: /*#__PURE__*/React.createElement(wp.components.ExternalLink, {
	        href: wp.i18n.__('https://wordpress.org/documentation/article/customize-date-and-time-format/')
	      })
	    }),
	    value: dateFormat,
	    onChange: value => onChange(value)
	  })));
	}

	function Edit$2({
	  attributes,
	  setAttributes,
	  context
	}) {
	  const defaultDateFormat = wp.date.getSettings()?.formats?.date || 'M j, Y';
	  const {
	    eventDateType,
	    futureDateFormat,
	    pastDateFormat
	  } = attributes;
	  const {
	    postType,
	    postId
	  } = context;
	  let dateFormat = typeof futureDateFormat === 'string' && futureDateFormat.trim() !== '' ? futureDateFormat : defaultDateFormat;
	  const hasPastDateFormat = typeof pastDateFormat === 'string' && pastDateFormat.trim() !== '';

	  // Our default content if we can't find or format an event date.
	  let content = `N/A`;
	  const hasPostContext = postType != null && postId != null;
	  if (hasPostContext) {
	    const [meta, updateMeta] = wp.coreData.useEntityProp('postType', postType, 'meta', postId);
	    const dateMetaKey = eventDateType === 'end' ? 'mbm_npt_events_end_date' : 'mbm_npt_events_start_date';
	    const dateRaw = meta?.[dateMetaKey] || '';
	    if (dayjs(dateRaw).isValid()) {
	      // We'll only use the past date format if that format is defined, and 
	      // the date is in the past. Check for the date format first because it's
	      // a faster check than the past date check.
	      if (hasPastDateFormat) {
	        const isDateInPast = dayjs().diff(dayjs(dateRaw)) > 0;
	        if (isDateInPast) {
	          dateFormat = pastDateFormat;
	        }
	      }
	      content = wp.date.dateI18n(dateFormat, dateRaw);
	    }
	  }
	  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", wp.blockEditor.useBlockProps(), content), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
	    title: wp.i18n.__('Event Date Settings')
	  }, /*#__PURE__*/React.createElement(EventDateFormatPicker, {
	    label: wp.i18n.__(hasPastDateFormat ? 'Future Date Format' : 'Date Format'),
	    dateFormat: futureDateFormat,
	    onChange: value => {
	      console.log(`[Edit] dateFormat changed:`, value);
	      setAttributes({
	        futureDateFormat: value
	      });
	    }
	  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
	    __nextHasNoMarginBottom: true,
	    label: wp.i18n.__('Add custom past date format'),
	    checked: hasPastDateFormat,
	    onChange: value => {
	      setAttributes({
	        pastDateFormat: value ? futureDateFormat : null
	      });
	    }
	  }), hasPastDateFormat && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EventDateFormatPicker, {
	    label: wp.i18n.__('Past Date Format'),
	    dateFormat: pastDateFormat,
	    onChange: value => {
	      console.log(`[Edit] pastDateFormat changed:`, value);
	      setAttributes({
	        pastDateFormat: value
	      });
	    }
	  })))));
	}

	var _path$6;
	function _extends$6() { _extends$6 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

	var SvgIcon$6 = function SvgIcon(props) {
	  return /*#__PURE__*/wp.element.createElement("svg", _extends$6({
	    xmlns: "http://www.w3.org/2000/svg",
	    width: 24,
	    height: 24
	  }, props), _path$6 || (_path$6 = /*#__PURE__*/wp.element.createElement("path", {
	    d: "M8.571 3c.475 0 .858.376.858.844V5.25h5.142V3.844c0-.468.383-.844.858-.844s.857.376.857.844V5.25h1.428C18.975 5.25 20 6.259 20 7.5v11.25c0 1.241-1.025 2.25-2.286 2.25H6.286C5.025 21 4 19.991 4 18.75V7.5c0-1.241 1.025-2.25 2.286-2.25h1.428V3.844c0-.468.382-.844.857-.844m9.715 6.75H5.714v9c0 .31.257.563.572.563h11.428a.57.57 0 0 0 .572-.563zM8 12h3.429c.314 0 .571.253.571.563v3.374c0 .31-.257.563-.571.563H8a.57.57 0 0 1-.571-.562v-3.376c0-.309.257-.562.571-.562"
	  })));
	};

	const EVENT_DATE_TYPE$1 = 'start';
	const variation$3 = {
	  name: blockDef$2.name + '/' + EVENT_DATE_TYPE$1,
	  title: 'Event Start Date',
	  icon: SvgIcon$6,
	  isDefault: true,
	  description: `Display the event's start date.`,
	  attributes: {
	    eventDateType: EVENT_DATE_TYPE$1
	  },
	  scope: ['block', 'inserter', 'transform'],
	  isActive: ['eventDateType']
	};

	var _path$5;
	function _extends$5() { _extends$5 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

	var SvgIcon$5 = function SvgIcon(props) {
	  return /*#__PURE__*/wp.element.createElement("svg", _extends$5({
	    xmlns: "http://www.w3.org/2000/svg",
	    width: 24,
	    height: 24
	  }, props), _path$5 || (_path$5 = /*#__PURE__*/wp.element.createElement("path", {
	    d: "M8.571 3c.475 0 .858.376.858.844V5.25h5.142V3.844c0-.468.383-.844.858-.844s.857.376.857.844V5.25h1.428C18.975 5.25 20 6.259 20 7.5v11.25c0 1.241-1.025 2.25-2.286 2.25H6.286C5.025 21 4 19.991 4 18.75V7.5c0-1.241 1.025-2.25 2.286-2.25h1.428V3.844c0-.468.382-.844.857-.844m9.715 6.75H5.714v9c0 .31.257.563.572.563h11.428a.57.57 0 0 0 .572-.563zM8 12h3.429c.314 0 .571.253.571.563v3.374c0 .31-.257.563-.571.563H8a.57.57 0 0 1-.571-.562v-3.376c0-.309.257-.562.571-.562"
	  })));
	};

	const EVENT_DATE_TYPE = 'end';
	const variation$2 = {
	  name: blockDef$2.name + '/' + EVENT_DATE_TYPE,
	  title: 'Event End Date',
	  icon: SvgIcon$5,
	  isDefault: true,
	  description: `Display the event's end date.`,
	  attributes: {
	    eventDateType: EVENT_DATE_TYPE
	  },
	  scope: ['block', 'inserter', 'transform'],
	  isActive: ['eventDateType']
	};

	wp.blocks.registerBlockType(blockDef$2, {
	  icon: SvgIcon$6,
	  edit: Edit$2,
	  variations: [variation$3, variation$2]
	});

	var $schema$1 = "https://schemas.wp.org/trunk/block.json";
	var apiVersion$1 = 3;
	var title$1 = "Event Content - Future";
	var name$1 = "mbm-npt-events/event-expiration-conditional-container";
	var description$1 = "Hide or show content based on the status of your event.";
	var category$1 = "mbm-npt-events";
	var keywords = [
		"event"
	];
	var usesContext$1 = [
		"postId",
		"postType"
	];
	var attributes = {
		showMode: {
			type: "string",
			"default": "only_future"
		},
		tagName: {
			type: "string",
			"default": "div"
		}
	};
	var supports$1 = {
		anchor: true,
		align: true,
		ariaLabel: false,
		className: true,
		color: {
			background: true,
			gradients: true,
			link: false,
			text: false
		},
		customClassName: true,
		dimensions: {
			minHeight: true
		},
		layout: true,
		multiple: true,
		reusable: true,
		position: {
			sticky: true
		},
		spacing: {
			margin: true,
			padding: true,
			blockGap: true
		},
		interactivity: true
	};
	var render$1 = "file:./render.php";
	var blockDef$1 = {
		$schema: $schema$1,
		apiVersion: apiVersion$1,
		title: title$1,
		name: name$1,
		description: description$1,
		category: category$1,
		keywords: keywords,
		usesContext: usesContext$1,
		attributes: attributes,
		supports: supports$1,
		render: render$1
	};

	function Save() {
	  return /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks.Content, null);
	}

	function Edit$1({
	  attributes
	}) {
	  const {
	    tagName
	  } = attributes;
	  const TagName = tagName;
	  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TagName, wp.blockEditor.useInnerBlocksProps(wp.blockEditor.useBlockProps())));
	}

	var _path$4;
	function _extends$4() { _extends$4 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

	var SvgIcon$4 = function SvgIcon(props) {
	  return /*#__PURE__*/wp.element.createElement("svg", _extends$4({
	    xmlns: "http://www.w3.org/2000/svg",
	    width: 24,
	    height: 24
	  }, props), _path$4 || (_path$4 = /*#__PURE__*/wp.element.createElement("path", {
	    d: "M9.429 3.844A.85.85 0 0 0 8.57 3a.85.85 0 0 0-.857.844V5.25H6.286C5.025 5.25 4 6.259 4 7.5v11.25C4 19.991 5.025 21 6.286 21h11.428C18.975 21 20 19.991 20 18.75V7.5c0-1.241-1.025-2.25-2.286-2.25h-1.428V3.844A.85.85 0 0 0 15.429 3a.85.85 0 0 0-.858.844V5.25H9.43zM5.714 9.75h12.572v9c0 .31-.257.563-.572.563H6.286a.57.57 0 0 1-.572-.563zM12 11.156a.85.85 0 0 0-.857.844v1.688H9.429a.85.85 0 0 0-.858.843c0 .468.383.844.858.844h1.714v1.688c0 .467.382.843.857.843a.85.85 0 0 0 .857-.843v-1.688h1.714a.85.85 0 0 0 .858-.844.85.85 0 0 0-.858-.844h-1.714V12a.85.85 0 0 0-.857-.844"
	  })));
	};

	const ONLY_FUTURE_VARIATION_NAME = 'only_future';
	const variation$1 = {
	  name: ONLY_FUTURE_VARIATION_NAME,
	  title: 'Event Content - Future',
	  icon: SvgIcon$4,
	  isDefault: true,
	  description: 'Conditionally display content if the event has not occurred.',
	  attributes: {
	    showMode: ONLY_FUTURE_VARIATION_NAME
	  },
	  scope: ['block', 'inserter', 'transform'],
	  isActive: ['showMode']
	};

	var _path$3;
	function _extends$3() { _extends$3 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

	var SvgIcon$3 = function SvgIcon(props) {
	  return /*#__PURE__*/wp.element.createElement("svg", _extends$3({
	    xmlns: "http://www.w3.org/2000/svg",
	    width: 24,
	    height: 24
	  }, props), _path$3 || (_path$3 = /*#__PURE__*/wp.element.createElement("path", {
	    d: "M8.571 3c.475 0 .858.376.858.844V5.25h5.142V3.844c0-.468.383-.844.858-.844s.857.376.857.844V5.25h1.428C18.975 5.25 20 6.259 20 7.5v11.25c0 1.241-1.025 2.25-2.286 2.25H6.286C5.025 21 4 19.991 4 18.75V7.5c0-1.241 1.025-2.25 2.286-2.25h1.428V3.844c0-.468.382-.844.857-.844m9.715 6.75H5.714v9c0 .31.257.563.572.563h11.428a.57.57 0 0 0 .572-.563zm-3.393 3.129-1.679 1.652 1.679 1.653a.83.83 0 0 1 0 1.191.867.867 0 0 1-1.21 0l-1.68-1.652-1.678 1.652a.863.863 0 0 1-1.21 0 .834.834 0 0 1 0-1.191l1.678-1.653-1.679-1.652a.83.83 0 0 1 0-1.192.867.867 0 0 1 1.211 0l1.679 1.652 1.678-1.652a.863.863 0 0 1 1.21 0 .834.834 0 0 1 0 1.192"
	  })));
	};

	const ONLY_PAST_VARIATION_NAME = 'only_past';
	const variation = {
	  name: ONLY_PAST_VARIATION_NAME,
	  title: 'Event Content - Past',
	  icon: SvgIcon$3,
	  description: 'Conditionally display content if the event has already occurred.',
	  attributes: {
	    showMode: ONLY_PAST_VARIATION_NAME
	  },
	  scope: ['block', 'inserter', 'transform'],
	  isActive: ['showMode']
	};

	wp.blocks.registerBlockType(blockDef$1, {
	  icon: SvgIcon$4,
	  edit: Edit$1,
	  save: Save,
	  variations: [variation$1, variation]
	});

	// const variationIsActive = (blockAttributes, variationAttributes) => {
	// 	return blockAttributes.showMode === variationAttributes.showMode;
	// };

	// registerBlockVariation(
	//   blockDef.name,
	//   {
	//     name: ONLY_FUTURE_VARIATION_NAME,
	//     title: 'Event Content - Future',
	//     icon: futureVariationIcon,
	//     // icon: row,
	//     description: 'Only show content if the event is in the future.',
	//     attributes: {
	//       showMode: ONLY_FUTURE_VARIATION_NAME,
	//     },
	//     scope: ['block', 'inserter', 'transform'],
	//     isActive: variationIsActive,
	//   }
	// );

	// registerBlockVariation(
	//   blockDef.name,
	//   {
	//     name: ONLY_PAST_VARIATION_NAME,
	//     title: 'Event Content - Past',
	//     icon: pastVariationIcon,
	//     // icon: stack,
	//     description: 'Only show content if the event is in the past.',
	//     attributes: {
	//       showMode: ONLY_PAST_VARIATION_NAME,
	//     },
	//     scope: ['block', 'inserter', 'transform'],
	//     isActive: variationIsActive,
	//   }
	// );

	// registerBlockVariation(
	//   blockDef.name,
	//   {
	//     name: 'event_content_foo',
	//     title: 'Event Content - Foo',
	//     attributes: {
	//       showMode: 'foo',
	//     },
	//     scope: ['block', 'inserter', 'transform'],
	//     isActive: variationIsActive,
	//   }
	// );
	// registerBlockVariation(
	//   blockDef.name,
	//   {
	//     name: 'event_content_foo',
	//     title: 'Event Content - Bar',
	//     attributes: {
	//       showMode: 'bar',
	//     },
	//     scope: ['block', 'inserter', 'transform'],
	//     isActive: variationIsActive,
	//   }
	// );
	// registerBlockVariation(
	//   blockDef.name,
	//   {
	//     name: 'event_content_foo',
	//     title: 'Event Content - Baz',
	//     attributes: {
	//       showMode: 'baz',
	//     },
	//     scope: ['block', 'inserter', 'transform'],
	//     isActive: variationIsActive,
	//   }
	// );

	var _path$2, _path2$1;
	function _extends$2() { _extends$2 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

	var SvgIcon$2 = function SvgIcon(props) {
	  return /*#__PURE__*/wp.element.createElement("svg", _extends$2({
	    xmlns: "http://www.w3.org/2000/svg",
	    width: 25,
	    height: 24
	  }, props), _path$2 || (_path$2 = /*#__PURE__*/wp.element.createElement("path", {
	    d: "M8 4c.416 0 .75.334.75.75V6h4.5V4.75c0-.416.334-.75.75-.75s.75.334.75.75V6H16c1.103 0 2 .897 2 2v2H5.5v8c0 .275.225.5.5.5h8.016a5.6 5.6 0 0 0 1.447 1.5H6c-1.103 0-2-.897-2-2V8c0-1.103.897-2 2-2h1.25V4.75c0-.416.334-.75.75-.75"
	  })), _path2$1 || (_path2$1 = /*#__PURE__*/wp.element.createElement("path", {
	    d: "M19.83 15.101h-2.41v-.794h2.41zm-3.616-2.382h4.822c.532 0 .964.474.964 1.059v1.852c0 .585-.432 1.06-.964 1.06h-4.822c-.532 0-.964-.475-.964-1.06v-1.852c0-.585.432-1.06.964-1.06m4.822.794h-4.822c-.133 0-.24.118-.24.265v1.852c0 .147.107.265.24.265h4.822c.133 0 .24-.118.24-.264v-1.853c0-.147-.107-.265-.24-.265"
	  })));
	};

	const ROOT_BLOCK$1 = 'core/button';
	const VARIATION_NAME$1 = 'event-registration-button';
	wp.blocks.registerBlockVariation(ROOT_BLOCK$1, {
	  name: VARIATION_NAME$1,
	  title: 'Event Registration Button',
	  category: 'mbm-npt-events',
	  icon: SvgIcon$2,
	  attributes: {
	    eventRegistrationButton: VARIATION_NAME$1,
	    text: 'Register for Event'
	  },
	  isActive: ['eventRegistrationButton']
	});
	wp.hooks.addFilter('blocks.registerBlockType', `${ROOT_BLOCK$1}/${VARIATION_NAME$1}`, (settings, name) => {
	  if (name !== ROOT_BLOCK$1) {
	    return settings;
	  }
	  return {
	    ...settings,
	    attributes: {
	      ...settings.attributes,
	      eventRegistrationButton: {
	        type: 'string',
	        default: null
	      }
	    }
	  };
	});

	var _path$1, _path2;
	function _extends$1() { _extends$1 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

	var SvgIcon$1 = function SvgIcon(props) {
	  return /*#__PURE__*/wp.element.createElement("svg", _extends$1({
	    xmlns: "http://www.w3.org/2000/svg",
	    width: 25,
	    height: 24
	  }, props), _path$1 || (_path$1 = /*#__PURE__*/wp.element.createElement("path", {
	    d: "M8 4c.416 0 .75.334.75.75V6h4.5V4.75c0-.416.334-.75.75-.75s.75.334.75.75V6H16c1.103 0 2 .897 2 2v2H5.5v8c0 .275.225.5.5.5h8.016a5.6 5.6 0 0 0 1.447 1.5H6c-1.103 0-2-.897-2-2V8c0-1.103.897-2 2-2h1.25V4.75c0-.416.334-.75.75-.75"
	  })), _path2 || (_path2 = /*#__PURE__*/wp.element.createElement("path", {
	    d: "M19.83 17.88h-2.41v-.794h2.41zm0-5.029h-2.41v-.794h2.41zm-3.616-2.382h4.822c.532 0 .964.474.964 1.059v1.852c0 .585-.432 1.06-.964 1.06h-4.822c-.532 0-.964-.475-.964-1.06v-1.852c0-.585.432-1.06.964-1.06m4.822.794h-4.822c-.133 0-.24.118-.24.265v1.852c0 .147.107.265.24.265h4.822c.133 0 .24-.118.24-.264v-1.853c0-.147-.107-.265-.24-.265m-4.822 4.235h4.822c.532 0 .964.474.964 1.059v1.853c0 .585-.432 1.059-.964 1.059h-4.822c-.532 0-.964-.474-.964-1.06v-1.852c0-.585.432-1.059.964-1.059m4.822.794h-4.822c-.133 0-.24.119-.24.265v1.853c0 .146.107.265.24.265h4.822c.133 0 .24-.119.24-.265v-1.853c0-.146-.107-.265-.24-.265"
	  })));
	};

	const ROOT_BLOCK = 'core/buttons';
	const VARIATION_NAME = 'event-registration-buttons';
	wp.blocks.registerBlockVariation(ROOT_BLOCK, {
	  name: VARIATION_NAME,
	  title: 'Event Registration Buttons',
	  category: 'mbm-npt-events',
	  icon: SvgIcon$1,
	  attributes: {
	    eventRegistrationButton: VARIATION_NAME
	  },
	  isActive: ['eventRegistrationButton'],
	  innerBlocks: [["core/button", {
	    eventRegistrationButton: 'event-registration-button',
	    text: 'Register for Event'
	  }]]
	});
	wp.hooks.addFilter('blocks.registerBlockType', `${ROOT_BLOCK}/${VARIATION_NAME}`, (settings, name) => {
	  if (name !== ROOT_BLOCK) {
	    return settings;
	  }
	  return {
	    ...settings,
	    attributes: {
	      ...settings.attributes,
	      eventRegistrationButton: {
	        type: 'string',
	        default: null
	      }
	    }
	  };
	});

	var $schema = "https://schemas.wp.org/trunk/block.json";
	var apiVersion = 3;
	var title = "Event Registration Deadline";
	var name = "mbm-npt-events/event-registration-deadline";
	var description = "Display the date and time of an event's registration deadline.";
	var category = "mbm-npt-events";
	var usesContext = [
		"postId",
		"postType"
	];
	var supports = {
		anchor: true,
		align: true,
		ariaLabel: false,
		className: true,
		color: {
			background: true,
			gradients: true,
			link: true,
			text: true
		},
		customClassName: true,
		dimensions: {
			minHeight: true
		},
		layout: true,
		multiple: true,
		reusable: true,
		position: {
			sticky: true
		},
		spacing: {
			margin: true,
			padding: true,
			blockGap: true
		},
		typography: {
			fontSize: true,
			lineHeight: true
		},
		interactivity: true
	};
	var render = "file:./render.php";
	var editorScript = "mbm-npt-events/editor/script";
	var editorStyle = "mbm-npt-events/editor/style";
	var style = "mbm-npt-events/front/style";
	var blockDef = {
		$schema: $schema,
		apiVersion: apiVersion,
		title: title,
		name: name,
		description: description,
		category: category,
		usesContext: usesContext,
		supports: supports,
		render: render,
		editorScript: editorScript,
		editorStyle: editorStyle,
		style: style
	};

	var _path;
	function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	var SvgIcon = function SvgIcon(props) {
	  return /*#__PURE__*/wp.element.createElement("svg", _extends({
	    xmlns: "http://www.w3.org/2000/svg",
	    width: 25,
	    height: 24
	  }, props), _path || (_path = /*#__PURE__*/wp.element.createElement("path", {
	    d: "M8 4c.416 0 .75.334.75.75V6h4.5V4.75c0-.416.334-.75.75-.75s.75.334.75.75V6H16c1.103 0 2 .897 2 2v2H5.5v8c0 .275.225.5.5.5h6.89a5.6 5.6 0 0 0 1.447 1.5H6c-1.103 0-2-.897-2-2V8c0-1.103.897-2 2-2h1.25V4.75c0-.416.334-.75.75-.75m9.5 7a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9m0 7.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5m0-6c-.275 0-.5.225-.5.5v2.5c0 .275.225.5.5.5s.5-.225.5-.5V13c0-.275-.225-.5-.5-.5"
	  })));
	};

	function Edit({
	  context
	}) {
	  // console.log(`[EventRegDeadline.Edit] context:`, context)
	  const {
	    postType,
	    postId
	  } = context;
	  const hasPostContext = postType != null && postId != null;
	  let content = `No event date has been provided`;
	  if (!hasPostContext) {
	    // This shouldn't happen...
	    content = `Fooday, Foo 37 | 37:88 XM XYZ`;
	  } else {
	    const [meta, updateMeta] = wp.coreData.useEntityProp('postType', postType, 'meta', postId);

	    // console.log(`[EventRegDeadline.Edit] meta:`, meta)
	    const dateRaw = meta?.mbm_npt_events_register_deadline_date || '';
	    if (dayjs(dateRaw).isValid()) {
	      const deadlineDate = dayjs.tz(dateRaw, 'UTC');
	      if (deadlineDate.isValid()) {
	        const now = dayjs();
	        const siteDeadlineDate = utcToSiteTime(deadlineDate);
	        const isFuture = now.diff(siteDeadlineDate) < 0;
	        const formatString = isFuture ? 'dddd, MMMM D [|] h:mm A' : 'MMMM D, YYYY';
	        content = siteDeadlineDate.format(formatString);
	      }
	    }
	  }
	  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", wp.blockEditor.useBlockProps(), content));
	}

	wp.blocks.registerBlockType(blockDef, {
	  icon: SvgIcon,
	  edit: Edit
	});

	console.log(`[mbm-npt-events] Editor script loaded`);

})();
//# sourceMappingURL=editor.bundle.js.map
