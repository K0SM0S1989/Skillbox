webpackJsonp([3], {
    A7yg: function (t, e, i) {
        /*!
         * vue-virtual-scroll-list v2.1.3
         * open source under the MIT license
         * https://github.com/tangbc/vue-virtual-scroll-list#readme
         */
        var s;
        s = function (t) {
            "use strict";

            function e(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var s = e[i];
                    s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s)
                }
            }

            t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
            var i = "FRONT", s = "BEHIND", n = "INIT", a = "FIXED", r = "DYNAMIC", o = function () {
                    function t(e, i) {
                        !function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), this.init(e, i)
                    }

                    var o, l, u;
                    return o = t, (l = [{
                        key: "init", value: function (t, e) {
                            this.param = t, this.callUpdate = e, this.sizes = new Map, this.firstRangeTotalSize = 0, this.firstRangeAverageSize = 0, this.lastCalcIndex = 0, this.fixedSizeValue = 0, this.calcType = n, this.offset = 0, this.direction = "", this.range = Object.create(null), t && this.checkRange(0, t.keeps - 1)
                        }
                    }, {
                        key: "destroy", value: function () {
                            this.init(null, null)
                        }
                    }, {
                        key: "getRange", value: function () {
                            var t = Object.create(null);
                            return t.start = this.range.start, t.end = this.range.end, t.padFront = this.range.padFront, t.padBehind = this.range.padBehind, t
                        }
                    }, {
                        key: "isBehind", value: function () {
                            return this.direction === s
                        }
                    }, {
                        key: "isFront", value: function () {
                            return this.direction === i
                        }
                    }, {
                        key: "getOffset", value: function (t) {
                            return t < 1 ? 0 : this.getIndexOffset(t)
                        }
                    }, {
                        key: "updateParam", value: function (t, e) {
                            this.param && t in this.param && (this.param[t] = e)
                        }
                    }, {
                        key: "saveSize", value: function (t, e) {
                            this.sizes.set(t, e), this.calcType === n ? (this.fixedSizeValue = e, this.calcType = a) : this.calcType === a && this.fixedSizeValue !== e && (this.calcType = r, delete this.fixedSizeValue), this.sizes.size <= this.param.keeps ? (this.firstRangeTotalSize = this.firstRangeTotalSize + e, this.firstRangeAverageSize = Math.round(this.firstRangeTotalSize / this.sizes.size)) : delete this.firstRangeTotalSize
                        }
                    }, {
                        key: "handleDataSourcesChange", value: function () {
                            var t = this.range.start;
                            this.isFront() ? t -= 2 : this.isBehind() && (t += 2), t = Math.max(t, 0), this.updateRange(this.range.start, this.getEndByStart(t))
                        }
                    }, {
                        key: "handleSlotSizeChange", value: function () {
                            this.handleDataSourcesChange()
                        }
                    }, {
                        key: "handleScroll", value: function (t) {
                            this.direction = t < this.offset ? i : s, this.offset = t, this.direction === i ? this.handleFront() : this.direction === s && this.handleBehind()
                        }
                    }, {
                        key: "handleFront", value: function () {
                            var t = this.getScrollOvers();
                            if (!(t > this.range.start)) {
                                var e = Math.max(t - this.param.buffer, 0);
                                this.checkRange(e, this.getEndByStart(e))
                            }
                        }
                    }, {
                        key: "handleBehind", value: function () {
                            var t = this.getScrollOvers();
                            t < this.range.start + this.param.buffer || this.checkRange(t, this.getEndByStart(t))
                        }
                    }, {
                        key: "getScrollOvers", value: function () {
                            var t = this.offset - this.param.slotHeaderSize;
                            if (t <= 0) return 0;
                            if (this.isFixedType()) return Math.floor(t / this.fixedSizeValue);
                            for (var e = 0, i = 0, s = 0, n = this.param.uniqueIds.length; e <= n;) {
                                if (i = e + Math.floor((n - e) / 2), (s = this.getIndexOffset(i)) === t) return i;
                                s < t ? e = i + 1 : s > t && (n = i - 1)
                            }
                            return e > 0 ? --e : 0
                        }
                    }, {
                        key: "getIndexOffset", value: function (t) {
                            if (!t) return 0;
                            for (var e = 0, i = 0; i < t; i++) e += this.sizes.get(this.param.uniqueIds[i]) || this.getEstimateSize();
                            return this.lastCalcIndex = Math.max(this.lastCalcIndex, t - 1), this.lastCalcIndex = Math.min(this.lastCalcIndex, this.getLastIndex()), e
                        }
                    }, {
                        key: "isFixedType", value: function () {
                            return this.calcType === a
                        }
                    }, {
                        key: "getLastIndex", value: function () {
                            return this.param.uniqueIds.length - 1
                        }
                    }, {
                        key: "checkRange", value: function (t, e) {
                            var i = this.param.keeps;
                            this.param.uniqueIds.length <= i ? (t = 0, e = this.getLastIndex()) : e - t < i - 1 && (t = e - i + 1), this.range.start !== t && this.updateRange(t, e)
                        }
                    }, {
                        key: "updateRange", value: function (t, e) {
                            this.range.start = t, this.range.end = e, this.range.padFront = this.getPadFront(), this.range.padBehind = this.getPadBehind(), this.callUpdate(this.getRange())
                        }
                    }, {
                        key: "getEndByStart", value: function (t) {
                            var e = t + this.param.keeps - 1;
                            return Math.min(e, this.getLastIndex())
                        }
                    }, {
                        key: "getPadFront", value: function () {
                            return this.isFixedType() ? this.fixedSizeValue * this.range.start : this.getIndexOffset(this.range.start)
                        }
                    }, {
                        key: "getPadBehind", value: function () {
                            var t = this.range.end, e = this.getLastIndex();
                            return this.isFixedType() ? (e - t) * this.fixedSizeValue : this.lastCalcIndex === e ? this.getIndexOffset(e) - this.getIndexOffset(t) : (e - t) * this.getEstimateSize()
                        }
                    }, {
                        key: "getEstimateSize", value: function () {
                            return this.firstRangeAverageSize || this.param.size
                        }
                    }]) && e(o.prototype, l), u && e(o, u), t
                }(), l = {
                    size: {type: Number, required: !0},
                    keeps: {type: Number, required: !0},
                    dataKey: {type: String, required: !0},
                    dataSources: {type: Array, required: !0},
                    dataComponent: {type: [Object, Function], required: !0},
                    extraProps: {type: Object},
                    rootTag: {type: String, default: "div"},
                    wrapTag: {type: String, default: "div"},
                    wrapClass: {type: String, default: ""},
                    direction: {type: String, default: "vertical"},
                    topThreshold: {type: Number, default: 0},
                    bottomThreshold: {type: Number, default: 0},
                    start: {type: Number, default: 0},
                    offset: {type: Number, default: 0},
                    itemTag: {type: String, default: "div"},
                    itemClass: {type: String, default: ""},
                    itemClassAdd: {type: Function},
                    headerTag: {type: String, default: "div"},
                    headerClass: {type: String, default: ""},
                    footerTag: {type: String, default: "div"},
                    footerClass: {type: String, default: ""},
                    disabled: {type: Boolean, default: !1}
                }, u = {
                    index: {type: Number},
                    event: {type: String},
                    tag: {type: String},
                    horizontal: {type: Boolean},
                    source: {type: Object},
                    component: {type: [Object, Function]},
                    uniqueKey: {type: String},
                    extraProps: {type: Object}
                }, h = {event: {type: String}, uniqueKey: {type: String}, tag: {type: String}, horizontal: {type: Boolean}},
                c = {
                    created: function () {
                        this.shapeKey = this.horizontal ? "offsetWidth" : "offsetHeight"
                    }, mounted: function () {
                        var t = this;
                        "undefined" != typeof ResizeObserver && (this.resizeObserver = new ResizeObserver(function () {
                            t.dispatchSizeChange()
                        }), this.resizeObserver.observe(this.$el))
                    }, updated: function () {
                        this.dispatchSizeChange()
                    }, beforeDestroy: function () {
                        this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null)
                    }, methods: {
                        getCurrentSize: function () {
                            return this.$el ? this.$el[this.shapeKey] : 0
                        }, dispatchSizeChange: function () {
                            this.$parent.$emit(this.event, this.uniqueKey, this.getCurrentSize(), this.hasInitial)
                        }
                    }
                }, f = t.component("virtual-list-item", {
                    mixins: [c], props: u, render: function (t) {
                        var e = this.tag, i = this.component, s = this.extraProps, n = void 0 === s ? {} : s,
                            a = this.index;
                        return n.source = this.source, n.index = a, t(e, {role: "item"}, [t(i, {props: n})])
                    }
                }), d = t.component("virtual-list-slot", {
                    mixins: [c], props: h, render: function (t) {
                        return t(this.tag, {attrs: {role: this.uniqueKey}}, this.$slots.default)
                    }
                }), g = "item_resize", p = "slot_resize", m = "header", v = "footer";
            return t.component("virtual-list", {
                props: l, data: function () {
                    return {range: null}
                }, watch: {
                    "dataSources.length": function () {
                        this.virtual.updateParam("uniqueIds", this.getUniqueIdFromDataSources()), this.virtual.handleDataSourcesChange()
                    }, start: function (t) {
                        this.scrollToIndex(t)
                    }, offset: function (t) {
                        this.scrollToOffset(t)
                    }
                }, created: function () {
                    this.isHorizontal = "horizontal" === this.direction, this.directionKey = this.isHorizontal ? "scrollLeft" : "scrollTop", this.installVirtual(), this.$on(g, this.onItemResized), (this.$slots.header || this.$slots.footer) && this.$on(p, this.onSlotResized)
                }, activated: function () {
                    this.scrollToOffset(this.virtual.offset)
                }, mounted: function () {
                    this.start ? this.scrollToIndex(this.start) : this.offset && this.scrollToOffset(this.offset)
                }, beforeDestroy: function () {
                    this.virtual.destroy()
                }, methods: {
                    getSize: function (t) {
                        return this.virtual.sizes.get(t)
                    }, getSizes: function () {
                        return this.virtual.sizes.size
                    }, scrollToOffset: function (t) {
                        var e = this.$refs.root;
                        e && (e[this.directionKey] = t || 0)
                    }, scrollToIndex: function (t) {
                        if (t >= this.dataSources.length - 1) this.scrollToBottom(); else {
                            var e = this.virtual.getOffset(t);
                            this.scrollToOffset(e)
                        }
                    }, scrollToBottom: function () {
                        var t = this, e = this.$refs.shepherd;
                        e && (e.scrollIntoView(!1), setTimeout(function () {
                            t.getOffset() + t.getClientSize() < t.getScrollSize() && t.scrollToBottom()
                        }, 3))
                    }, reset: function () {
                        this.virtual.destroy(), this.scrollToOffset(0), this.installVirtual()
                    }, installVirtual: function () {
                        this.virtual = new o({
                            size: this.size,
                            slotHeaderSize: 0,
                            slotFooterSize: 0,
                            keeps: this.keeps,
                            buffer: Math.round(this.keeps / 3),
                            uniqueIds: this.getUniqueIdFromDataSources()
                        }, this.onRangeChanged), this.range = this.virtual.getRange()
                    }, getUniqueIdFromDataSources: function () {
                        var t = this;
                        return this.dataSources.map(function (e) {
                            return e[t.dataKey]
                        })
                    }, getOffset: function () {
                        var t = this.$refs.root;
                        return t ? Math.ceil(t[this.directionKey]) : 0
                    }, getClientSize: function () {
                        var t = this.$refs.root;
                        return t ? t[this.isHorizontal ? "clientWidth" : "clientHeight"] : 0
                    }, getScrollSize: function () {
                        var t = this.$refs.root;
                        return t ? t[this.isHorizontal ? "scrollWidth" : "scrollHeight"] : 0
                    }, onItemResized: function (t, e) {
                        this.virtual.saveSize(t, e), this.$emit("resized", t, e)
                    }, onSlotResized: function (t, e, i) {
                        t === m ? this.virtual.updateParam("slotHeaderSize", e) : t === v && this.virtual.updateParam("slotFooterSize", e), i && this.virtual.handleSlotSizeChange()
                    }, onRangeChanged: function (t) {
                        this.range = t
                    }, onScroll: function (t) {
                        var e = this.getOffset(), i = this.getClientSize(), s = this.getScrollSize();
                        e < 0 || e + i > s || !s || (this.virtual.handleScroll(e), this.emitEvent(e, i, s, t))
                    }, emitEvent: function (t, e, i, s) {
                        this.$emit("scroll", s, this.virtual.getRange()), this.virtual.isFront() && this.dataSources.length && t - this.topThreshold <= 0 ? this.$emit("totop") : this.virtual.isBehind() && t + e + this.bottomThreshold >= i && this.$emit("tobottom")
                    }, getRenderSlots: function (t) {
                        for (var e = [], i = this.range, s = i.start, n = i.end, a = this.dataSources, r = this.dataKey, o = this.itemClass, l = this.itemTag, u = this.isHorizontal, h = this.extraProps, c = this.dataComponent, d = s; d <= n; d++) {
                            var p = a[d];
                            p ? p[r] ? e.push(t(f, {
                                props: {
                                    index: d,
                                    tag: l,
                                    event: g,
                                    horizontal: u,
                                    uniqueKey: p[r],
                                    source: p,
                                    extraProps: h,
                                    component: c
                                }, class: "".concat(o, " ").concat(this.itemClassAdd ? this.itemClassAdd(d) : "")
                            })) : console.warn("Cannot get the data-key '".concat(r, "' from data-sources.")) : console.warn("Cannot get the index '".concat(d, "' from data-sources."))
                        }
                        return e
                    }
                }, render: function (t) {
                    var e = this.$slots, i = e.header, s = e.footer, n = this.range, a = n.padFront, r = n.padBehind,
                        o = this.rootTag, l = this.headerClass, u = this.headerTag, h = this.wrapTag,
                        c = this.wrapClass, f = this.footerClass, g = this.footerTag,
                        y = this.isHorizontal ? "0px ".concat(r, "px 0px ").concat(a, "px") : "".concat(a, "px 0px ").concat(r, "px");
                    return t(o, {ref: "root", on: {"&scroll": this.onScroll}}, [i ? t(d, {
                        class: l,
                        props: {tag: u, event: p, uniqueKey: m}
                    }, i) : null, t(h, {
                        class: c,
                        attrs: {role: "group"},
                        style: {padding: y}
                    }, this.getRenderSlots(t)), s ? t(d, {
                        class: f,
                        props: {tag: g, event: p, uniqueKey: v}
                    }, s) : null, t("div", {ref: "shepherd"})])
                }
            })
        }, t.exports = s(i("7+uW"))
    }, BO1k: function (t, e, i) {
        t.exports = {default: i("fxRn"), __esModule: !0}
    }, Co5J: function (t, e) {
    }, T6mG: function (t, e) {
    }, Te6z: function (t, e) {
    }, fxRn: function (t, e, i) {
        i("+tPU"), i("zQR9"), t.exports = i("g8Ux")
    }, g8Ux: function (t, e, i) {
        var s = i("77Pl"), n = i("3fs2");
        t.exports = i("FeBl").getIterator = function (t) {
            var e = n(t);
            if ("function" != typeof e) throw TypeError(t + " is not iterable!");
            return s(e.call(t))
        }
    }, pzGE: function (t, e) {
    }, zfg2: function (t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var s = i("Xxa5"), n = i.n(s), a = i("exGp"), r = i.n(a), o = i("Dd8w"), l = i.n(o), u = i("PJh5"), h = i.n(u),
            c = i("NYxO"), f = {
                name: "ImDialog",
                props: {active: Boolean, push: Number, online: Boolean, me: Boolean, info: Object},
                computed: l()({}, Object(c.c)("profile/info", ["getInfo"]), {
                    dialogPerson: function () {
                        return this.info.groupDialog || !this.getInfo ? null : this.getInfo.id != this.info.persons[0].id ? this.info.persons[0] : this.info.persons[1]
                    }
                })
            }, d = {
                render: function () {
                    var t = this, e = t.$createElement, i = t._self._c || e;
                    return i("div", {
                        staticClass: "im-dialog",
                        class: {active: t.active, push: t.push}
                    }, [i("div", {staticClass: "im-dialog__info"}, [i("span", {staticClass: "im-dailog__pic"}, [this.getInfo.id != t.info.persons[0].id ? i("img", {attrs: {src: t.info.persons[0].photo}}) : i("img", {attrs: {src: t.info.persons[1].photo}})]), i("span", {staticClass: "im-dialog__name"}, [t._v(t._s(t.info.groupDialog ? t.info.name : t.dialogPerson.fullName))]), t.push > 0 ? i("span", {staticClass: "im-dialog__push"}, [t._v(t._s(t.push))]) : t._e()])])
                }, staticRenderFns: []
            };
        var g = i("VU/8")(f, d, !1, function (t) {
            i("pzGE")
        }, null, null).exports, p = i("BO1k"), m = i.n(p), v = (i("7+uW"), {
            name: "infinite-loading-item", props: {
                source: {
                    type: Object, default: function () {
                        return {}
                    }
                }
            }, computed: l()({}, Object(c.c)("profile/info", ["getInfo"]))
        }), y = {
            render: function () {
                var t = this, e = t.$createElement, i = t._self._c || e;
                return t.source.stubDate ? i("h5", {staticClass: "im-chat__message-title"}, [t._v(t._s(t._f("moment")(t.source.date, "DD MMMM YYYY")))]) : i("div", {
                    staticClass: "im-chat__message-block",
                    class: {me: t.getInfo.id == t.source.author.id, "not-read": "SENT" == t.source.read_status}
                }, [i("p", {staticClass: "im-chat__message-text"}, [t._v(t._s(t.source.message_text))]), i("span", {staticClass: "im-chat__message-time"}, [t._v(t._s(t._f("moment")(t.source.time, "DD.MM.YYYY hh:mm")))])])
            }, staticRenderFns: []
        };
        var S = i("VU/8")(v, y, !1, function (t) {
            i("T6mG")
        }, "data-v-697eda0e", null).exports, _ = (i("A7yg"), function (t) {
            return {sid: "group-" + t, stubDate: !0, date: t}
        }), x = {
            name: "ImChat",
            props: {info: Object, messages: Array, online: Boolean},
            data: function () {
                return {mes: "", itemComponent: S, isUserViewHistory: !1, fetching: !1}
            },
            mounted: function () {
                this.follow = !0
            },
            watch: {
                messages: function () {
                    this.follow && this.setVirtualListToBottom()
                }
            },
            computed: l()({}, Object(c.c)("profile/info", ["getInfo"]), {
                dialogPerson: function () {
                    return this.info.groupDialog || !this.getInfo ? null : this.getInfo.id != this.info.persons[0].id ? this.info.persons[0] : this.info.persons[1]
                }, recipientName: function () {
                    return "recipientName()"
                }, recipientPhoto: function () {
                    return this.info.last_message ? this.info.last_message.isSentByMe ? this.info.last_message.recipient.photo : this.info.last_message.author.photo : ""
                }, recipientId: function () {
                    return this.info.last_message ? this.info.last_message.isSentByMe ? this.info.last_message.recipient.id : this.info.last_message.author.id : ""
                }, getRecipient: function () {
                    return this.info.last_message ? this.info.last_message.isSentByMe ? this.info.last_message.recipient : this.info.last_message.author : ""
                }, statusText: function () {
                    if (this.info.last_message) {
                        var t = this.info.last_message.isSentByMe ? this.info.last_message.recipient : this.info.last_message.author;
                        return h()().diff(h()(t.lastOnlineTime), "seconds") <= 60 ? "Онлайн" : "был в сети " + h()(t.lastOnlineTime).fromNow()
                    }
                    return ""
                }, messagesGrouped: function () {
                    var t = [], e = null, i = !0, s = !1, n = void 0;
                    try {
                        for (var a, r = m()(this.messages); !(i = (a = r.next()).done); i = !0) {
                            var o = a.value, l = h()(o.time).format("DD.MM.YYYY");
                            l !== e && (e = l, t.push(_(e))), t.push(o)
                        }
                    } catch (t) {
                        s = !0, n = t
                    } finally {
                        try {
                            !i && r.return && r.return()
                        } finally {
                            if (s) throw n
                        }
                    }
                    return t
                }
            }),
            methods: l()({}, Object(c.b)("profile/dialogs", ["postMessage", "loadOlderMessages"]), Object(c.c)("profile/dialogs", ["isHistoryEndReached"]), {
                onSubmitMessage: function () {
                    this.info.is_frozen ? alert("Диалог заблокирован одним из пользователей!") : (this.postMessage({
                        id: this.info.id,
                        message_text: this.mes
                    }), this.mes = "")
                }, onScrollToTop: function () {
                    var t = this;
                    return r()(n.a.mark(function e() {
                        var i;
                        return n.a.wrap(function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    if (!t.$refs.vsl) {
                                        e.next = 8;
                                        break
                                    }
                                    if (t.isHistoryEndReached()) {
                                        e.next = 8;
                                        break
                                    }
                                    return i = t.messagesGrouped[0], t.fetching = !0, e.next = 6, t.loadOlderMessages();
                                case 6:
                                    t.setVirtualListToOffset(1), t.$nextTick(function () {
                                        var e = 0, s = !0, n = !1, a = void 0;
                                        try {
                                            for (var r, o = m()(t.messagesGrouped); !(s = (r = o.next()).done); s = !0) {
                                                var l = r.value;
                                                if (l.sid === i.sid) break;
                                                e += t.$refs.vsl.getSize(l.sid)
                                            }
                                        } catch (t) {
                                            n = !0, a = t
                                        } finally {
                                            try {
                                                !s && o.return && o.return()
                                            } finally {
                                                if (n) throw a
                                            }
                                        }
                                        t.setVirtualListToOffset(e), t.fetching = !1
                                    });
                                case 8:
                                case"end":
                                    return e.stop()
                            }
                        }, e, t)
                    }))()
                }, onScroll: function () {
                    this.follow = !1
                }, onScrollToBottom: function () {
                    this.follow = !0
                }, setVirtualListToOffset: function (t) {
                    this.$refs.vsl && this.$refs.vsl.scrollToOffset(t)
                }, setVirtualListToBottom: function () {
                    this.$refs.vsl && this.$refs.vsl.scrollToBottom()
                }
            })
        }, z = {
            render: function () {
                var t = this, e = t.$createElement, i = t._self._c || e;
                return i("div", {staticClass: "im-chat"}, [t.dialogPerson ? i("div", {staticClass: "im-chat__user"}, [i("router-link", {
                    staticClass: "im-chat__user-pic",
                    attrs: {to: {name: "ProfileId", params: {id: t.dialogPerson.id}}}
                }, [i("img", {
                    attrs: {
                        src: t.dialogPerson.photo,
                        alt: t.dialogPerson.fullName
                    }
                })]), i("router-link", {
                    staticClass: "im-chat__user-name",
                    attrs: {to: {name: "ProfileId", params: {id: t.dialogPerson.id}}}
                }, [t._v(t._s(t.dialogPerson.fullName))]), i("span", {
                    staticClass: "user-status",
                    class: {online: t.online}
                }, [t._v(t._s(t.statusText))])], 1) : i("div", {staticClass: "im-chat__user"}, [t._v(t._s(t.info.name))]), i("div", {staticClass: "im-chat__infitite_list_wrapper"}, [i("virtual-list", {
                    ref: "vsl",
                    staticClass: "im-chat__infitite_list scroll-touch",
                    attrs: {
                        size: 60,
                        keeps: 120,
                        "data-key": "sid",
                        "data-sources": t.messagesGrouped,
                        "data-component": t.itemComponent,
                        "wrap-class": "im-chat__message",
                        "root-tag": "section"
                    },
                    on: {
                        totop: t.onScrollToTop, "&scroll": function (e) {
                            return t.onScroll(e)
                        }, tobottom: t.onScrollToBottom
                    }
                }, [i("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: t.fetching,
                        expression: "fetching"
                    }], staticClass: "im-chat__loader", attrs: {slot: "header"}, slot: "header"
                }, [i("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: !t.isHistoryEndReached(),
                        expression: "!isHistoryEndReached()"
                    }], staticClass: "spinner"
                }), i("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: t.isHistoryEndReached(),
                        expression: "isHistoryEndReached()"
                    }], staticClass: "finished"
                }, [t._v("Больше сообщений нет")])])])], 1), i("form", {
                    staticClass: "im-chat__enter",
                    attrs: {action: "#"},
                    on: {
                        submit: function (e) {
                            return e.preventDefault(), t.onSubmitMessage(e)
                        }
                    }
                }, [i("input", {
                    directives: [{name: "model", rawName: "v-model", value: t.mes, expression: "mes"}],
                    staticClass: "im-chat__enter-input",
                    attrs: {type: "text", placeholder: "Ваше сообщение..."},
                    domProps: {value: t.mes},
                    on: {
                        input: function (e) {
                            e.target.composing || (t.mes = e.target.value)
                        }
                    }
                })])])
            }, staticRenderFns: []
        };
        var b = {
            name: "Im",
            components: {
                ImDialog: g, ImChat: i("VU/8")(x, z, !1, function (t) {
                    i("Co5J")
                }, null, null).exports
            },
            computed: l()({}, Object(c.c)("profile/dialogs", ["messages", "activeDialog", "dialogs"])),
            methods: l()({}, Object(c.b)("profile/dialogs", ["loadFreshMessages", "switchDialog", "closeDialog", "createDialogWithUser", "apiLoadAllDialogs"]), {
                countPush: function (t) {
                    return t > 0 ? t : null
                }, checkOnlineUser: function (t) {
                    return h()().diff(h()(t), "seconds") <= 60
                }, clickOnDialog: function (t) {
                    this.$router.push({name: "Im", query: {activeDialog: t}})
                }, selectDialogByRoute: function (t, e) {
                    var i = this;
                    return r()(n.a.mark(function s() {
                        return n.a.wrap(function (i) {
                            for (; ;) switch (i.prev = i.next) {
                                case 0:
                                    if (!t.query.activeDialog) {
                                        i.next = 4;
                                        break
                                    }
                                    e.switchDialog(t.query.activeDialog), i.next = 16;
                                    break;
                                case 4:
                                    if (!t.query.userId) {
                                        i.next = 8;
                                        break
                                    }
                                    e.createDialogWithUser(t.query.userId), i.next = 16;
                                    break;
                                case 8:
                                    if (!(e.dialogs.length > 0)) {
                                        i.next = 12;
                                        break
                                    }
                                    e.$router.push({name: "Im", query: {activeDialog: e.dialogs[0].id}}), i.next = 16;
                                    break;
                                case 12:
                                    return i.next = 14, e.apiLoadAllDialogs();
                                case 14:
                                    e.dialogs.length > 0 && e.$router.push({
                                        name: "Im",
                                        query: {activeDialog: e.dialogs[0].id}
                                    }), console.log("No dialogs at all");
                                case 16:
                                case"end":
                                    return i.stop()
                            }
                        }, s, i)
                    }))()
                }
            }),
            beforeRouteEnter: function (t, e, i) {
                var s, a = this;
                i((s = r()(n.a.mark(function e(i) {
                    return n.a.wrap(function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                i.selectDialogByRoute(t, i);
                            case 1:
                            case"end":
                                return e.stop()
                        }
                    }, e, a)
                })), function (t) {
                    return s.apply(this, arguments)
                }))
            },
            beforeRouteUpdate: function (t, e, i) {
                this.selectDialogByRoute(t, this), i()
            },
            beforeDestroy: function () {
                this.closeDialog()
            }
        }, T = {
            render: function () {
                var t = this, e = t.$createElement, i = t._self._c || e;
                return i("div", {staticClass: "im"}, [i("div", {staticClass: "im__dialogs"}, t._l(t.dialogs, function (e) {
                    return i("im-dialog", {
                        key: e.id,
                        attrs: {
                            info: e,
                            push: t.countPush(e.unread_count),
                            me: !0,
                            active: t.activeDialog && e.id === t.activeDialog.id,
                            online: t.checkOnlineUser(null)
                        },
                        nativeOn: {
                            click: function (i) {
                                return t.clickOnDialog(e.id)
                            }
                        }
                    })
                }), 1), t.activeDialog ? i("div", {staticClass: "im__chat"}, [i("im-chat", {
                    attrs: {
                        info: t.activeDialog,
                        messages: t.messages,
                        online: t.checkOnlineUser(null)
                    }
                })], 1) : t._e()])
            }, staticRenderFns: []
        };
        var C = i("VU/8")(b, T, !1, function (t) {
            i("Te6z")
        }, null, null);
        e.default = C.exports
    }
});
//# sourceMappingURL=3.7f0b818b17d0810b06ea.js.map