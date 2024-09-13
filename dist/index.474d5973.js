/**
  * @yaireo/fakescroll - Very lightweight & robust custom-looking HTML scrollbar script.
  *
  * @version v2.5.1
  * @homepage https://github.com/yairEO/fakescroll
  */ !function(t, s) {
    var e = e || {};
    "function" == typeof e && e.amd ? e([], s) : "object" == typeof exports && "object" == typeof module ? module.exports = s() : "object" == typeof exports ? exports.FakeScroll = s() : t.FakeScroll = s();
}(this, function() {
    function t(t, s) {
        t && (this.settings = Object.assign({}, this.defaults, s || {}), this.state = {}, this.listeners = {}, this.DOM = this.build(t), this.events.binding.call(this, this.DOM), setTimeout(this.events.callbacks.onScrollResize.bind(this)));
    }
    return raf = window.requestAnimationFrame || function(t) {
        return window.setTimeout(t, 1e3 / 60);
    }, t.prototype = {
        defaults: {
            classname: "",
            track: !1
        },
        build (t) {
            var s = {};
            for(scopeHTML = `<div class="fakeScroll__wrap">\n                                <div class="fakeScroll__content"></div>\n                             </div>\n                             <div class='fakeScroll__track ${this.settings.classname}'>\n                                <div class="fakeScroll__bar"></div>\n                             </div>`, fragment = document.createDocumentFragment(); t.childNodes.length;)fragment.appendChild(t.childNodes[0]);
            return t.insertAdjacentHTML("afterbegin", scopeHTML), s.scope = t, s.scrollWrap = t.firstElementChild, s.scrollContent = s.scrollWrap.firstElementChild, s.scrollContent.appendChild(fragment), s.track = s.scrollWrap.nextElementSibling, s.bar = s.track.firstElementChild, s.scope.classList.add("fakeScroll"), s;
        },
        destroy () {
            this.events.off.call(this, window, "resize", "onScrollResize");
        },
        get scrollRatio () {
            return this.state.scrollRatio;
        },
        events: {
            on (t, s, e) {
                return s.split(" ").forEach((s)=>{
                    e in this.events.callbacks || console.warn(e, " doesn't exist in Callbacks: ", this.events.callbacks), this.listeners[s] = this.events.callbacks[e].bind(this), t.addEventListener(s, this.listeners[s]);
                }), this.events;
            },
            off (t, s, e) {
                return s.split(" ").forEach((s)=>t.removeEventListener(s, this.listeners[s])), this.events;
            },
            binding (t) {
                this.events.on.call(this, t.scrollContent, "scroll", "onScrollResize").on.call(this, t.scope, "mouseenter", "onScrollResize").on.call(this, t.bar, "mousedown", "onBarMouseDown").on.call(this, window, "resize", "onScrollResize"), this.settings.track && this.events.on.call(this, t.track, "click", "onTrackClick");
            },
            drag (t) {
                this.events[t].call(this, document, "mousemove", "onDrag")[t].call(this, document, "mouseup", "onStopDrag");
            },
            callbacks: {
                onScrollResize () {
                    this.moveBar.call(this), this.DOM.scope.classList.toggle("fakeScroll--hasBar", this.state.ratio < 1), clearTimeout(this.listeners.timeout__resize), this.listeners.timeout__resize = setTimeout(this.getTrackBounds.bind(this), 200);
                },
                onDrag (t) {
                    var s = t.pageY - this.state.lastPageY;
                    raf(()=>{
                        var e = document.documentElement.scrollTop;
                        t.pageY >= this.state.trackBounds.top + e && t.pageY <= this.state.trackBounds.bottom + e ? this.DOM.scrollContent.scrollTop = this.state.drag + s / this.state.ratio : (this.state.drag = this.DOM.scrollContent.scrollTop, this.state.lastPageY = t.pageY);
                    });
                },
                onStopDrag (t) {
                    [
                        this.DOM.bar,
                        document.body
                    ].map((t)=>t.classList.remove("fakeScroll--grabbed")), this.events.drag.call(this, "off"), setTimeout(()=>{
                        this.state.drag = !1;
                    });
                },
                onBarMouseDown (t) {
                    this.state.drag = this.DOM.scrollContent.scrollTop, this.state.lastPageY = t.pageY, [
                        this.DOM.bar,
                        document.body
                    ].map((t)=>t.classList.add("fakeScroll--grabbed")), this.events.drag.call(this, "on");
                },
                onTrackClick (t) {
                    if (!this.state.drag) {
                        var s = (t.clientY - this.state.trackBounds.top) / (this.state.trackBounds.height - this.state.trackBounds.topPad - this.state.trackBounds.bottomPad) * (this.DOM.scrollContent.scrollHeight - this.DOM.scrollWrap.clientHeight);
                        "smooth" == this.settings.track && (this.DOM.scrollContent.style.scrollBehavior = "smooth", setTimeout(()=>{
                            this.DOM.scrollContent.style.scrollBehavior = "unset";
                        }, 500)), this.DOM.scrollContent.scrollTop = s;
                    }
                }
            }
        },
        getTrackBounds () {
            var t = this.DOM.track.getBoundingClientRect(), s = window.getComputedStyle(this.DOM.track, null);
            return t.topPad = parseInt(s.paddingTop, 10), t.bottomPad = parseInt(s.paddingBottom, 10), this.state.trackBounds = t, t;
        },
        moveBar () {
            var t = this.DOM.scrollContent, s = t.scrollHeight, e = this.DOM.scrollWrap.clientHeight;
            this.state.ratio = this.DOM.track.clientHeight / s, this.state.scrollRatio = this.DOM.scrollContent.scrollTop / (t.scrollHeight - e), raf(()=>{
                var o = e / s * 100, i = t.scrollTop / s * 100;
                this.DOM.bar.style.cssText = `height  : ${o}%;\n                                              top     : ${i}%;\n                                              display : ${s <= e ? "none" : ""}`, this.settings.onChange && this.settings.onChange({
                    scrollRatio: this.state.scrollRatio
                });
            });
        }
    }, Element.prototype.fakeScroll = function(s) {
        return this._fakeScroll = this._fakeScroll || new t(this, s || {}), this._fakeScroll;
    }, t;
});

//# sourceMappingURL=index.474d5973.js.map
