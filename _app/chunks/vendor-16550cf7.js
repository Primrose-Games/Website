function ct() {
}

const re = i => i;

function Ke(i, t) {
    for (const e in t) i[e] = t[e];
    return i;
}

function ps(i) {
    return i();
}

function ms() {
    return Object.create(null);
}

function ae(i) {
    i.forEach(ps);
}

function Ze(i) {
    return typeof i == 'function';
}

function Je(i, t) {
    return i != i ? t == t : i !== t || i && typeof i == 'object' || typeof i == 'function';
}

let Qe;

function na(i, t) {
    return Qe || (Qe = document.createElement('a')), Qe.href = t, i === Qe.href;
}

function sa(i) {
    return Object.keys(i).length === 0;
}

function oa(i, ...t) {
    if (i == null) return ct;
    const e = i.subscribe(...t);
    return e.unsubscribe ? () => e.unsubscribe() : e;
}

function rn(i, t, e) {
    i.$$.on_destroy.push(oa(t, e));
}

function ra(i, t, e, n) {
    if (i) {
        const s = bs(i, t, e, n);
        return i[0](s);
    }
}

function bs(i, t, e, n) {
    return i[1] && n ? Ke(e.ctx.slice(), i[1](n(t))) : e.ctx;
}

function aa(i, t, e, n) {
    if (i[2] && n) {
        const s = i[2](n(e));
        if (t.dirty === void 0) return s;
        if (typeof s == 'object') {
            const o = [], r = Math.max(t.dirty.length, s.length);
            for (let a = 0; a < r; a += 1) o[a] = t.dirty[a] | s[a];
            return o;
        }
        return t.dirty | s;
    }
    return t.dirty;
}

function da(i, t, e, n, s, o) {
    if (s) {
        const r = bs(t, e, n, o);
        i.p(r, s);
    }
}

function ua(i) {
    if (i.ctx.length > 32) {
        const t = [], e = i.ctx.length / 32;
        for (let n = 0; n < e; n++) t[n] = -1;
        return t;
    }
    return -1;
}

const _s = typeof window != 'undefined';
let ti = _s ? () => window.performance.now() : () => Date.now(), an = _s ? i => requestAnimationFrame(i) : ct;
const de = new Set;

function xs(i) {
    de.forEach(t => {
        t.c(i) || (de.delete(t), t.f());
    }), de.size !== 0 && an(xs);
}

function ei(i) {
    let t;
    return de.size === 0 && an(xs), {
        promise: new Promise(e => {
            de.add(t = { c: i, f: e });
        }), abort() {
            de.delete(t);
        }
    };
}

let ii = !1;

function ca() {
    ii = !0;
}

function la() {
    ii = !1;
}

function fa(i, t, e, n) {
    for (; i < t;) {
        const s = i + (t - i >> 1);
        e(s) <= n ? i = s + 1 : t = s;
    }
    return i;
}

function ha(i) {
    if (i.hydrate_init) return;
    i.hydrate_init = !0;
    let t = i.childNodes;
    if (i.nodeName === 'HEAD') {
        const d = [];
        for (let u = 0; u < t.length; u++) {
            const l = t[u];
            l.claim_order !== void 0 && d.push(l);
        }
        t = d;
    }
    const e = new Int32Array(t.length + 1), n = new Int32Array(t.length);
    e[0] = -1;
    let s = 0;
    for (let d = 0; d < t.length; d++) {
        const u = t[d].claim_order,
          l = (s > 0 && t[e[s]].claim_order <= u ? s + 1 : fa(1, s, g => t[e[g]].claim_order, u)) - 1;
        n[d] = e[l] + 1;
        const h = l + 1;
        e[h] = d, s = Math.max(h, s);
    }
    const o = [], r = [];
    let a = t.length - 1;
    for (let d = e[s] + 1; d != 0; d = n[d - 1]) {
        for (o.push(t[d - 1]); a >= d; a--) r.push(t[a]);
        a--;
    }
    for (; a >= 0; a--) r.push(t[a]);
    o.reverse(), r.sort((d, u) => d.claim_order - u.claim_order);
    for (let d = 0, u = 0; d < r.length; d++) {
        for (; u < o.length && r[d].claim_order >= o[u].claim_order;) u++;
        const l = u < o.length ? o[u] : null;
        i.insertBefore(r[d], l);
    }
}

function ga(i, t) {
    i.appendChild(t);
}

function ys(i) {
    if (!i) return document;
    const t = i.getRootNode ? i.getRootNode() : i.ownerDocument;
    return t && t.host ? t : i.ownerDocument;
}

function pa(i) {
    const t = Bt('style');
    return ma(ys(i), t), t;
}

function ma(i, t) {
    ga(i.head || i, t);
}

function zt(i, t) {
    if (ii) {
        for (ha(i), (i.actual_end_child === void 0 || i.actual_end_child !== null && i.actual_end_child.parentElement !== i) && (i.actual_end_child = i.firstChild); i.actual_end_child !== null && i.actual_end_child.claim_order === void 0;) i.actual_end_child = i.actual_end_child.nextSibling;
        t !== i.actual_end_child ? (t.claim_order !== void 0 || t.parentNode !== i) && i.insertBefore(t, i.actual_end_child) : i.actual_end_child = t.nextSibling;
    } else (t.parentNode !== i || t.nextSibling !== null) && i.appendChild(t);
}

function ye(i, t, e) {
    ii && !e ? zt(i, t) : (t.parentNode !== i || t.nextSibling != e) && i.insertBefore(t, e || null);
}

function mt(i) {
    i.parentNode.removeChild(i);
}

function ba(i, t) {
    for (let e = 0; e < i.length; e += 1) i[e] && i[e].d(t);
}

function Bt(i) {
    return document.createElement(i);
}

function ws(i) {
    return document.createElementNS('http://www.w3.org/2000/svg', i);
}

function we(i) {
    return document.createTextNode(i);
}

function ni() {
    return we(' ');
}

function _a() {
    return we('');
}

function vs(i, t, e, n) {
    return i.addEventListener(t, e, n), () => i.removeEventListener(t, e, n);
}

function vt(i, t, e) {
    e == null ? i.removeAttribute(t) : i.getAttribute(t) !== e && i.setAttribute(t, e);
}

function xa(i, t, e) {
    t in i ? i[t] = typeof i[t] == 'boolean' && e === '' ? !0 : e : vt(i, t, e);
}

function Nt(i) {
    return Array.from(i.childNodes);
}

function ya(i) {
    i.claim_info === void 0 && (i.claim_info = { last_index: 0, total_claimed: 0 });
}

function Ms(i, t, e, n, s = !1) {
    ya(i);
    const o = (() => {
        for (let r = i.claim_info.last_index; r < i.length; r++) {
            const a = i[r];
            if (t(a)) {
                const d = e(a);
                return d === void 0 ? i.splice(r, 1) : i[r] = d, s || (i.claim_info.last_index = r), a;
            }
        }
        for (let r = i.claim_info.last_index - 1; r >= 0; r--) {
            const a = i[r];
            if (t(a)) {
                const d = e(a);
                return d === void 0 ? i.splice(r, 1) : i[r] = d, s ? d === void 0 && i.claim_info.last_index-- : i.claim_info.last_index = r, a;
            }
        }
        return n();
    })();
    return o.claim_order = i.claim_info.total_claimed, i.claim_info.total_claimed += 1, o;
}

function ks(i, t, e, n) {
    return Ms(i, s => s.nodeName === t, s => {
        const o = [];
        for (let r = 0; r < s.attributes.length; r++) {
            const a = s.attributes[r];
            e[a.name] || o.push(a.name);
        }
        o.forEach(r => s.removeAttribute(r));
    }, () => n(t));
}

function Yt(i, t, e) {
    return ks(i, t, e, Bt);
}

function wa(i, t, e) {
    return ks(i, t, e, ws);
}

function dn(i, t) {
    return Ms(i, e => e.nodeType === 3, e => {
        const n = '' + t;
        if (e.data.startsWith(n)) {
            if (e.data.length !== n.length) return e.splitText(n.length);
        } else e.data = n;
    }, () => we(t), !0);
}

function si(i) {
    return dn(i, ' ');
}

function va(i, t) {
    t = '' + t, i.wholeText !== t && (i.data = t);
}

function Ma(i, t, e, n) {
    i.style.setProperty(t, e, n ? 'important' : '');
}

function ka(i, t, e) {
    i.classList[e ? 'add' : 'remove'](t);
}

function Sa(i, t, e = !1) {
    const n = document.createEvent('CustomEvent');
    return n.initCustomEvent(i, e, !1, t), n;
}

function Aa(i, t = document.body) {
    return Array.from(t.querySelectorAll(i));
}

const un = new Set;
let oi = 0;

function Ca(i) {
    let t = 5381, e = i.length;
    for (; e--;) t = (t << 5) - t ^ i.charCodeAt(e);
    return t >>> 0;
}

function cn(i, t, e, n, s, o, r, a = 0) {
    const d = 16.666 / n;
    let u = `{
`;
    for (let y = 0; y <= 1; y += d) {
        const v = t + (e - t) * o(y);
        u += y * 100 + `%{${r(v, 1 - v)}}
`;
    }
    const l = u + `100% {${r(e, 1 - e)}}
}`, h = `__svelte_${Ca(l)}_${a}`, g = ys(i);
    un.add(g);
    const m = g.__svelte_stylesheet || (g.__svelte_stylesheet = pa(i).sheet),
      b = g.__svelte_rules || (g.__svelte_rules = {});
    b[h] || (b[h] = !0, m.insertRule(`@keyframes ${h} ${l}`, m.cssRules.length));
    const x = i.style.animation || '';
    return i.style.animation = `${x ? `${x}, ` : ''}${h} ${n}ms linear ${s}ms 1 both`, oi += 1, h;
}

function ri(i, t) {
    const e = (i.style.animation || '').split(', '),
      n = e.filter(t ? o => o.indexOf(t) < 0 : o => o.indexOf('__svelte') === -1), s = e.length - n.length;
    s && (i.style.animation = n.join(', '), oi -= s, oi || Ea());
}

function Ea() {
    an(() => {
        oi || (un.forEach(i => {
            const t = i.__svelte_stylesheet;
            let e = t.cssRules.length;
            for (; e--;) t.deleteRule(e);
            i.__svelte_rules = {};
        }), un.clear());
    });
}

function Pa(i, t, e, n) {
    if (!t) return ct;
    const s = i.getBoundingClientRect();
    if (t.left === s.left && t.right === s.right && t.top === s.top && t.bottom === s.bottom) return ct;
    const {
        delay: o = 0,
        duration: r = 300,
        easing: a = re,
        start: d = ti() + o,
        end: u = d + r,
        tick: l = ct,
        css: h
    } = e(i, { from: t, to: s }, n);
    let g = !0, m = !1, b;

    function x() {
        h && (b = cn(i, 0, 1, r, o, a, h)), o || (m = !0);
    }

    function y() {
        h && ri(i, b), g = !1;
    }

    return ei(v => {
        if (!m && v >= d && (m = !0), m && v >= u && (l(1, 0), y()), !g) return !1;
        if (m) {
            const E = v - d, B = 0 + 1 * a(E / r);
            l(B, 1 - B);
        }
        return !0;
    }), x(), l(0, 1), y;
}

function Da(i) {
    const t = getComputedStyle(i);
    if (t.position !== 'absolute' && t.position !== 'fixed') {
        const { width: e, height: n } = t, s = i.getBoundingClientRect();
        i.style.position = 'absolute', i.style.width = e, i.style.height = n, Ss(i, s);
    }
}

function Ss(i, t) {
    const e = i.getBoundingClientRect();
    if (t.left !== e.left || t.top !== e.top) {
        const n = getComputedStyle(i), s = n.transform === 'none' ? '' : n.transform;
        i.style.transform = `${s} translate(${t.left - e.left}px, ${t.top - e.top}px)`;
    }
}

let ai;

function di(i) {
    ai = i;
}

function ui() {
    if (!ai) throw new Error('Function called outside component initialization');
    return ai;
}

function Ba(i) {
    ui().$$.on_mount.push(i);
}

function Ta(i) {
    ui().$$.after_update.push(i);
}

function Oa(i, t) {
    ui().$$.context.set(i, t);
}

function Ra(i) {
    return ui().$$.context.get(i);
}

const ve = [], ln = [], ci = [], As = [], Fa = Promise.resolve();
let fn = !1;

function La() {
    fn || (fn = !0, Fa.then(Cs));
}

function ue(i) {
    ci.push(i);
}

let hn = !1;
const gn = new Set;

function Cs() {
    if (!hn) {
        hn = !0;
        do {
            for (let i = 0; i < ve.length; i += 1) {
                const t = ve[i];
                di(t), Ia(t.$$);
            }
            for (di(null), ve.length = 0; ln.length;) ln.pop()();
            for (let i = 0; i < ci.length; i += 1) {
                const t = ci[i];
                gn.has(t) || (gn.add(t), t());
            }
            ci.length = 0;
        } while (ve.length);
        for (; As.length;) As.pop()();
        fn = !1, hn = !1, gn.clear();
    }
}

function Ia(i) {
    if (i.fragment !== null) {
        i.update(), ae(i.before_update);
        const t = i.dirty;
        i.dirty = [-1], i.fragment && i.fragment.p(i.ctx, t), i.after_update.forEach(ue);
    }
}

let Me;

function Es() {
    return Me || (Me = Promise.resolve(), Me.then(() => {
        Me = null;
    })), Me;
}

function li(i, t, e) {
    i.dispatchEvent(Sa(`${t ? 'intro' : 'outro'}${e}`));
}

const fi = new Set;
let Vt;

function Ps() {
    Vt = { r: 0, c: [], p: Vt };
}

function Ds() {
    Vt.r || ae(Vt.c), Vt = Vt.p;
}

function ke(i, t) {
    i && i.i && (fi.delete(i), i.i(t));
}

function hi(i, t, e, n) {
    if (i && i.o) {
        if (fi.has(i)) return;
        fi.add(i), Vt.c.push(() => {
            fi.delete(i), n && (e && i.d(1), n());
        }), i.o(t);
    }
}

const Bs = { duration: 0 };

function za(i, t, e) {
    let n = t(i, e), s = !1, o, r, a = 0;

    function d() {
        o && ri(i, o);
    }

    function u() {
        const { delay: h = 0, duration: g = 300, easing: m = re, tick: b = ct, css: x } = n || Bs;
        x && (o = cn(i, 0, 1, g, h, m, x, a++)), b(0, 1);
        const y = ti() + h, v = y + g;
        r && r.abort(), s = !0, ue(() => li(i, !0, 'start')), r = ei(E => {
            if (s) {
                if (E >= v) return b(1, 0), li(i, !0, 'end'), d(), s = !1;
                if (E >= y) {
                    const B = m((E - y) / g);
                    b(B, 1 - B);
                }
            }
            return s;
        });
    }

    let l = !1;
    return {
        start() {
            l || (l = !0, ri(i), Ze(n) ? (n = n(), Es().then(u)) : u());
        }, invalidate() {
            l = !1;
        }, end() {
            s && (d(), s = !1);
        }
    };
}

function Na(i, t, e) {
    let n = t(i, e), s = !0, o;
    const r = Vt;
    r.r += 1;

    function a() {
        const { delay: d = 0, duration: u = 300, easing: l = re, tick: h = ct, css: g } = n || Bs;
        g && (o = cn(i, 1, 0, u, d, l, g));
        const m = ti() + d, b = m + u;
        ue(() => li(i, !1, 'start')), ei(x => {
            if (s) {
                if (x >= b) return h(0, 1), li(i, !1, 'end'), --r.r || ae(r.c), !1;
                if (x >= m) {
                    const y = l((x - m) / u);
                    h(1 - y, y);
                }
            }
            return s;
        });
    }

    return Ze(n) ? Es().then(() => {
        n = n(), a();
    }) : a(), {
        end(d) {
            d && n.tick && n.tick(1, 0), s && (o && ri(i, o), s = !1);
        }
    };
}

function Va(i, t) {
    hi(i, 1, 1, () => {
        t.delete(i.key);
    });
}

function Wa(i, t) {
    i.f(), Va(i, t);
}

function Ha(i, t, e, n, s, o, r, a, d, u, l, h) {
    let g = i.length, m = o.length, b = g;
    const x = {};
    for (; b--;) x[i[b].key] = b;
    const y = [], v = new Map, E = new Map;
    for (b = m; b--;) {
        const O = h(s, o, b), S = e(O);
        let C = r.get(S);
        C ? n && C.p(O, t) : (C = u(S, O), C.c()), v.set(S, y[b] = C), S in x && E.set(S, Math.abs(b - x[S]));
    }
    const B = new Set, T = new Set;

    function D(O) {
        ke(O, 1), O.m(a, l), r.set(O.key, O), l = O.first, m--;
    }

    for (; g && m;) {
        const O = y[m - 1], S = i[g - 1], C = O.key, R = S.key;
        O === S ? (l = O.first, g--, m--) : v.has(R) ? !r.has(C) || B.has(C) ? D(O) : T.has(R) ? g-- : E.get(C) > E.get(R) ? (T.add(C), D(O)) : (B.add(R), g--) : (d(S, r), g--);
    }
    for (; g--;) {
        const O = i[g];
        v.has(O.key) || d(O, r);
    }
    for (; m;) D(y[m - 1]);
    return y;
}

function ja(i, t) {
    const e = {}, n = {}, s = { $$scope: 1 };
    let o = i.length;
    for (; o--;) {
        const r = i[o], a = t[o];
        if (a) {
            for (const d in r) d in a || (n[d] = 1);
            for (const d in a) s[d] || (e[d] = a[d], s[d] = 1);
            i[o] = a;
        } else for (const d in r) s[d] = 1;
    }
    for (const r in n) r in e || (e[r] = void 0);
    return e;
}

function Ua(i) {
    return typeof i == 'object' && i !== null ? i : {};
}

function Ts(i) {
    i && i.c();
}

function Os(i, t) {
    i && i.l(t);
}

function pn(i, t, e, n) {
    const { fragment: s, on_mount: o, on_destroy: r, after_update: a } = i.$$;
    s && s.m(t, e), n || ue(() => {
        const d = o.map(ps).filter(Ze);
        r ? r.push(...d) : ae(d), i.$$.on_mount = [];
    }), a.forEach(ue);
}

function mn(i, t) {
    const e = i.$$;
    e.fragment !== null && (ae(e.on_destroy), e.fragment && e.fragment.d(t), e.on_destroy = e.fragment = null, e.ctx = []);
}

function $a(i, t) {
    i.$$.dirty[0] === -1 && (ve.push(i), La(), i.$$.dirty.fill(0)), i.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}

function bn(i, t, e, n, s, o, r, a = [-1]) {
    const d = ai;
    di(i);
    const u = i.$$ = {
        fragment: null,
        ctx: null,
        props: o,
        update: ct,
        not_equal: s,
        bound: ms(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(t.context || (d ? d.$$.context : [])),
        callbacks: ms(),
        dirty: a,
        skip_bound: !1,
        root: t.target || d.$$.root
    };
    r && r(u.root);
    let l = !1;
    if (u.ctx = e ? e(i, t.props || {}, (h, g, ...m) => {
        const b = m.length ? m[0] : g;
        return u.ctx && s(u.ctx[h], u.ctx[h] = b) && (!u.skip_bound && u.bound[h] && u.bound[h](b), l && $a(i, h)), g;
    }) : [], u.update(), l = !0, ae(u.before_update), u.fragment = n ? n(u.ctx) : !1, t.target) {
        if (t.hydrate) {
            ca();
            const h = Nt(t.target);
            u.fragment && u.fragment.l(h), h.forEach(mt);
        } else u.fragment && u.fragment.c();
        t.intro && ke(i.$$.fragment), pn(i, t.target, t.anchor, t.customElement), la(), Cs();
    }
    di(d);
}

class _n {
    $destroy() {
        mn(this, 1), this.$destroy = ct;
    }

    $on(t, e) {
        const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
        return n.push(e), () => {
            const s = n.indexOf(e);
            s !== -1 && n.splice(s, 1);
        };
    }

    $set(t) {
        this.$$set && !sa(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
    }
}

const ce = [];

function xn(i, t = ct) {
    let e;
    const n = new Set;

    function s(a) {
        if (Je(i, a) && (i = a, e)) {
            const d = !ce.length;
            for (const u of n) u[1](), ce.push(u, i);
            if (d) {
                for (let u = 0; u < ce.length; u += 2) ce[u][0](ce[u + 1]);
                ce.length = 0;
            }
        }
    }

    function o(a) {
        s(a(i));
    }

    function r(a, d = ct) {
        const u = [a, d];
        return n.add(u), n.size === 1 && (e = t(s) || ct), a(i), () => {
            n.delete(u), n.size === 0 && (e(), e = null);
        };
    }

    return { set: s, update: o, subscribe: r };
}

var Ya = typeof globalThis != 'undefined' ? globalThis : typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : typeof self != 'undefined' ? self : {};

function Xa(i) {
    return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, 'default') ? i.default : i;
}

var yn = { exports: {} };
(function(i, t) {
    var e = typeof self != 'undefined' ? self : Ya, n = function() {
        function o() {
            this.fetch = !1, this.DOMException = e.DOMException;
        }

        return o.prototype = e, new o;
    }();
    (function(o) {
        (function(r) {
            var a = {
                searchParams: 'URLSearchParams' in o,
                iterable: 'Symbol' in o && 'iterator' in Symbol,
                blob: 'FileReader' in o && 'Blob' in o && function() {
                    try {
                        return new Blob, !0;
                    } catch (M) {
                        return !1;
                    }
                }(),
                formData: 'FormData' in o,
                arrayBuffer: 'ArrayBuffer' in o
            };

            function d(M) {
                return M && DataView.prototype.isPrototypeOf(M);
            }

            if (a.arrayBuffer) var u = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'],
              l = ArrayBuffer.isView || function(M) {
                  return M && u.indexOf(Object.prototype.toString.call(M)) > -1;
              };

            function h(M) {
                if (typeof M != 'string' && (M = String(M)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(M)) throw new TypeError('Invalid character in header field name');
                return M.toLowerCase();
            }

            function g(M) {
                return typeof M != 'string' && (M = String(M)), M;
            }

            function m(M) {
                var A = {
                    next: function() {
                        var F = M.shift();
                        return { done: F === void 0, value: F };
                    }
                };
                return a.iterable && (A[Symbol.iterator] = function() {
                    return A;
                }), A;
            }

            function b(M) {
                this.map = {}, M instanceof b ? M.forEach(function(A, F) {
                    this.append(F, A);
                }, this) : Array.isArray(M) ? M.forEach(function(A) {
                    this.append(A[0], A[1]);
                }, this) : M && Object.getOwnPropertyNames(M).forEach(function(A) {
                    this.append(A, M[A]);
                }, this);
            }

            b.prototype.append = function(M, A) {
                M = h(M), A = g(A);
                var F = this.map[M];
                this.map[M] = F ? F + ', ' + A : A;
            }, b.prototype.delete = function(M) {
                delete this.map[h(M)];
            }, b.prototype.get = function(M) {
                return M = h(M), this.has(M) ? this.map[M] : null;
            }, b.prototype.has = function(M) {
                return this.map.hasOwnProperty(h(M));
            }, b.prototype.set = function(M, A) {
                this.map[h(M)] = g(A);
            }, b.prototype.forEach = function(M, A) {
                for (var F in this.map) this.map.hasOwnProperty(F) && M.call(A, this.map[F], F, this);
            }, b.prototype.keys = function() {
                var M = [];
                return this.forEach(function(A, F) {
                    M.push(F);
                }), m(M);
            }, b.prototype.values = function() {
                var M = [];
                return this.forEach(function(A) {
                    M.push(A);
                }), m(M);
            }, b.prototype.entries = function() {
                var M = [];
                return this.forEach(function(A, F) {
                    M.push([F, A]);
                }), m(M);
            }, a.iterable && (b.prototype[Symbol.iterator] = b.prototype.entries);

            function x(M) {
                if (M.bodyUsed) return Promise.reject(new TypeError('Already read'));
                M.bodyUsed = !0;
            }

            function y(M) {
                return new Promise(function(A, F) {
                    M.onload = function() {
                        A(M.result);
                    }, M.onerror = function() {
                        F(M.error);
                    };
                });
            }

            function v(M) {
                var A = new FileReader, F = y(A);
                return A.readAsArrayBuffer(M), F;
            }

            function E(M) {
                var A = new FileReader, F = y(A);
                return A.readAsText(M), F;
            }

            function B(M) {
                for (var A = new Uint8Array(M), F = new Array(A.length), K = 0; K < A.length; K++) F[K] = String.fromCharCode(A[K]);
                return F.join('');
            }

            function T(M) {
                if (M.slice) return M.slice(0);
                var A = new Uint8Array(M.byteLength);
                return A.set(new Uint8Array(M)), A.buffer;
            }

            function D() {
                return this.bodyUsed = !1, this._initBody = function(M) {
                    this._bodyInit = M, M ? typeof M == 'string' ? this._bodyText = M : a.blob && Blob.prototype.isPrototypeOf(M) ? this._bodyBlob = M : a.formData && FormData.prototype.isPrototypeOf(M) ? this._bodyFormData = M : a.searchParams && URLSearchParams.prototype.isPrototypeOf(M) ? this._bodyText = M.toString() : a.arrayBuffer && a.blob && d(M) ? (this._bodyArrayBuffer = T(M.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : a.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(M) || l(M)) ? this._bodyArrayBuffer = T(M) : this._bodyText = M = Object.prototype.toString.call(M) : this._bodyText = '', this.headers.get('content-type') || (typeof M == 'string' ? this.headers.set('content-type', 'text/plain;charset=UTF-8') : this._bodyBlob && this._bodyBlob.type ? this.headers.set('content-type', this._bodyBlob.type) : a.searchParams && URLSearchParams.prototype.isPrototypeOf(M) && this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8'));
                }, a.blob && (this.blob = function() {
                    var M = x(this);
                    if (M) return M;
                    if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                    if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                    if (this._bodyFormData) throw new Error('could not read FormData body as blob');
                    return Promise.resolve(new Blob([this._bodyText]));
                }, this.arrayBuffer = function() {
                    return this._bodyArrayBuffer ? x(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(v);
                }), this.text = function() {
                    var M = x(this);
                    if (M) return M;
                    if (this._bodyBlob) return E(this._bodyBlob);
                    if (this._bodyArrayBuffer) return Promise.resolve(B(this._bodyArrayBuffer));
                    if (this._bodyFormData) throw new Error('could not read FormData body as text');
                    return Promise.resolve(this._bodyText);
                }, a.formData && (this.formData = function() {
                    return this.text().then(R);
                }), this.json = function() {
                    return this.text().then(JSON.parse);
                }, this;
            }

            var O = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

            function S(M) {
                var A = M.toUpperCase();
                return O.indexOf(A) > -1 ? A : M;
            }

            function C(M, A) {
                A = A || {};
                var F = A.body;
                if (M instanceof C) {
                    if (M.bodyUsed) throw new TypeError('Already read');
                    this.url = M.url, this.credentials = M.credentials, A.headers || (this.headers = new b(M.headers)), this.method = M.method, this.mode = M.mode, this.signal = M.signal, !F && M._bodyInit != null && (F = M._bodyInit, M.bodyUsed = !0);
                } else this.url = String(M);
                if (this.credentials = A.credentials || this.credentials || 'same-origin', (A.headers || !this.headers) && (this.headers = new b(A.headers)), this.method = S(A.method || this.method || 'GET'), this.mode = A.mode || this.mode || null, this.signal = A.signal || this.signal, this.referrer = null, (this.method === 'GET' || this.method === 'HEAD') && F) throw new TypeError('Body not allowed for GET or HEAD requests');
                this._initBody(F);
            }

            C.prototype.clone = function() {
                return new C(this, { body: this._bodyInit });
            };

            function R(M) {
                var A = new FormData;
                return M.trim().split('&').forEach(function(F) {
                    if (F) {
                        var K = F.split('='), Y = K.shift().replace(/\+/g, ' '), N = K.join('=').replace(/\+/g, ' ');
                        A.append(decodeURIComponent(Y), decodeURIComponent(N));
                    }
                }), A;
            }

            function z(M) {
                var A = new b, F = M.replace(/\r?\n[\t ]+/g, ' ');
                return F.split(/\r?\n/).forEach(function(K) {
                    var Y = K.split(':'), N = Y.shift().trim();
                    if (N) {
                        var it = Y.join(':').trim();
                        A.append(N, it);
                    }
                }), A;
            }

            D.call(C.prototype);

            function L(M, A) {
                A || (A = {}), this.type = 'default', this.status = A.status === void 0 ? 200 : A.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = 'statusText' in A ? A.statusText : 'OK', this.headers = new b(A.headers), this.url = A.url || '', this._initBody(M);
            }

            D.call(L.prototype), L.prototype.clone = function() {
                return new L(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new b(this.headers),
                    url: this.url
                });
            }, L.error = function() {
                var M = new L(null, { status: 0, statusText: '' });
                return M.type = 'error', M;
            };
            var I = [301, 302, 303, 307, 308];
            L.redirect = function(M, A) {
                if (I.indexOf(A) === -1) throw new RangeError('Invalid status code');
                return new L(null, { status: A, headers: { location: M } });
            }, r.DOMException = o.DOMException;
            try {
                new r.DOMException;
            } catch (M) {
                r.DOMException = function(A, F) {
                    this.message = A, this.name = F;
                    var K = Error(A);
                    this.stack = K.stack;
                }, r.DOMException.prototype = Object.create(Error.prototype), r.DOMException.prototype.constructor = r.DOMException;
            }

            function U(M, A) {
                return new Promise(function(F, K) {
                    var Y = new C(M, A);
                    if (Y.signal && Y.signal.aborted) return K(new r.DOMException('Aborted', 'AbortError'));
                    var N = new XMLHttpRequest;

                    function it() {
                        N.abort();
                    }

                    N.onload = function() {
                        var W = {
                            status: N.status,
                            statusText: N.statusText,
                            headers: z(N.getAllResponseHeaders() || '')
                        };
                        W.url = 'responseURL' in N ? N.responseURL : W.headers.get('X-Request-URL');
                        var q = 'response' in N ? N.response : N.responseText;
                        F(new L(q, W));
                    }, N.onerror = function() {
                        K(new TypeError('Network request failed'));
                    }, N.ontimeout = function() {
                        K(new TypeError('Network request failed'));
                    }, N.onabort = function() {
                        K(new r.DOMException('Aborted', 'AbortError'));
                    }, N.open(Y.method, Y.url, !0), Y.credentials === 'include' ? N.withCredentials = !0 : Y.credentials === 'omit' && (N.withCredentials = !1), 'responseType' in N && a.blob && (N.responseType = 'blob'), Y.headers.forEach(function(W, q) {
                        N.setRequestHeader(q, W);
                    }), Y.signal && (Y.signal.addEventListener('abort', it), N.onreadystatechange = function() {
                        N.readyState === 4 && Y.signal.removeEventListener('abort', it);
                    }), N.send(typeof Y._bodyInit == 'undefined' ? null : Y._bodyInit);
                });
            }

            return U.polyfill = !0, o.fetch || (o.fetch = U, o.Headers = b, o.Request = C, o.Response = L), r.Headers = b, r.Request = C, r.Response = L, r.fetch = U, Object.defineProperty(r, '__esModule', { value: !0 }), r;
        })({});
    })(n), n.fetch.ponyfill = !0, delete n.fetch.polyfill;
    var s = n;
    t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, i.exports = t;
})(yn, yn.exports);
var qa = Xa(yn.exports), Rs = {}, gi = {};
gi.byteLength = Za, gi.toByteArray = Qa, gi.fromByteArray = id;
for (var Ct = [], bt = [], Ga = typeof Uint8Array != 'undefined' ? Uint8Array : Array, wn = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', le = 0, Ka = wn.length; le < Ka; ++le) Ct[le] = wn[le], bt[wn.charCodeAt(le)] = le;
bt['-'.charCodeAt(0)] = 62, bt['_'.charCodeAt(0)] = 63;

function Fs(i) {
    var t = i.length;
    if (t % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
    var e = i.indexOf('=');
    e === -1 && (e = t);
    var n = e === t ? 0 : 4 - e % 4;
    return [e, n];
}

function Za(i) {
    var t = Fs(i), e = t[0], n = t[1];
    return (e + n) * 3 / 4 - n;
}

function Ja(i, t, e) {
    return (t + e) * 3 / 4 - e;
}

function Qa(i) {
    var t, e = Fs(i), n = e[0], s = e[1], o = new Ga(Ja(i, n, s)), r = 0, a = s > 0 ? n - 4 : n, d;
    for (d = 0; d < a; d += 4) t = bt[i.charCodeAt(d)] << 18 | bt[i.charCodeAt(d + 1)] << 12 | bt[i.charCodeAt(d + 2)] << 6 | bt[i.charCodeAt(d + 3)], o[r++] = t >> 16 & 255, o[r++] = t >> 8 & 255, o[r++] = t & 255;
    return s === 2 && (t = bt[i.charCodeAt(d)] << 2 | bt[i.charCodeAt(d + 1)] >> 4, o[r++] = t & 255), s === 1 && (t = bt[i.charCodeAt(d)] << 10 | bt[i.charCodeAt(d + 1)] << 4 | bt[i.charCodeAt(d + 2)] >> 2, o[r++] = t >> 8 & 255, o[r++] = t & 255), o;
}

function td(i) {
    return Ct[i >> 18 & 63] + Ct[i >> 12 & 63] + Ct[i >> 6 & 63] + Ct[i & 63];
}

function ed(i, t, e) {
    for (var n, s = [], o = t; o < e; o += 3) n = (i[o] << 16 & 16711680) + (i[o + 1] << 8 & 65280) + (i[o + 2] & 255), s.push(td(n));
    return s.join('');
}

function id(i) {
    for (var t, e = i.length, n = e % 3, s = [], o = 16383, r = 0, a = e - n; r < a; r += o) s.push(ed(i, r, r + o > a ? a : r + o));
    return n === 1 ? (t = i[e - 1], s.push(Ct[t >> 2] + Ct[t << 4 & 63] + '==')) : n === 2 && (t = (i[e - 2] << 8) + i[e - 1], s.push(Ct[t >> 10] + Ct[t >> 4 & 63] + Ct[t << 2 & 63] + '=')), s.join('');
}

var vn = {};/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
vn.read = function(i, t, e, n, s) {
    var o, r, a = s * 8 - n - 1, d = (1 << a) - 1, u = d >> 1, l = -7, h = e ? s - 1 : 0, g = e ? -1 : 1, m = i[t + h];
    for (h += g, o = m & (1 << -l) - 1, m >>= -l, l += a; l > 0; o = o * 256 + i[t + h], h += g, l -= 8) ;
    for (r = o & (1 << -l) - 1, o >>= -l, l += n; l > 0; r = r * 256 + i[t + h], h += g, l -= 8) ;
    if (o === 0) o = 1 - u; else {
        if (o === d) return r ? NaN : (m ? -1 : 1) * (1 / 0);
        r = r + Math.pow(2, n), o = o - u;
    }
    return (m ? -1 : 1) * r * Math.pow(2, o - n);
}, vn.write = function(i, t, e, n, s, o) {
    var r, a, d, u = o * 8 - s - 1, l = (1 << u) - 1, h = l >> 1,
      g = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, m = n ? 0 : o - 1, b = n ? 1 : -1,
      x = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, r = l) : (r = Math.floor(Math.log(t) / Math.LN2), t * (d = Math.pow(2, -r)) < 1 && (r--, d *= 2), r + h >= 1 ? t += g / d : t += g * Math.pow(2, 1 - h), t * d >= 2 && (r++, d /= 2), r + h >= l ? (a = 0, r = l) : r + h >= 1 ? (a = (t * d - 1) * Math.pow(2, s), r = r + h) : (a = t * Math.pow(2, h - 1) * Math.pow(2, s), r = 0)); s >= 8; i[e + m] = a & 255, m += b, a /= 256, s -= 8) ;
    for (r = r << s | a, u += s; u > 0; i[e + m] = r & 255, m += b, r /= 256, u -= 8) ;
    i[e + m - b] |= x * 128;
};/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(i) {
    const t = gi, e = vn,
      n = typeof Symbol == 'function' && typeof Symbol.for == 'function' ? Symbol.for('nodejs.util.inspect.custom') : null;
    i.Buffer = a, i.SlowBuffer = E, i.INSPECT_MAX_BYTES = 50;
    const s = 2147483647;
    i.kMaxLength = s, a.TYPED_ARRAY_SUPPORT = o(), !a.TYPED_ARRAY_SUPPORT && typeof console != 'undefined' && typeof console.error == 'function' && console.error('This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.');

    function o() {
        try {
            const p = new Uint8Array(1), c = {
                foo: function() {
                    return 42;
                }
            };
            return Object.setPrototypeOf(c, Uint8Array.prototype), Object.setPrototypeOf(p, c), p.foo() === 42;
        } catch (p) {
            return !1;
        }
    }

    Object.defineProperty(a.prototype, 'parent', {
        enumerable: !0, get: function() {
            if (!!a.isBuffer(this)) return this.buffer;
        }
    }), Object.defineProperty(a.prototype, 'offset', {
        enumerable: !0, get: function() {
            if (!!a.isBuffer(this)) return this.byteOffset;
        }
    });

    function r(p) {
        if (p > s) throw new RangeError('The value "' + p + '" is invalid for option "size"');
        const c = new Uint8Array(p);
        return Object.setPrototypeOf(c, a.prototype), c;
    }

    function a(p, c, f) {
        if (typeof p == 'number') {
            if (typeof c == 'string') throw new TypeError('The "string" argument must be of type string. Received type number');
            return h(p);
        }
        return d(p, c, f);
    }

    a.poolSize = 8192;

    function d(p, c, f) {
        if (typeof p == 'string') return g(p, c);
        if (ArrayBuffer.isView(p)) return b(p);
        if (p == null) throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof p);
        if (At(p, ArrayBuffer) || p && At(p.buffer, ArrayBuffer) || typeof SharedArrayBuffer != 'undefined' && (At(p, SharedArrayBuffer) || p && At(p.buffer, SharedArrayBuffer))) return x(p, c, f);
        if (typeof p == 'number') throw new TypeError('The "value" argument must not be of type number. Received type number');
        const _ = p.valueOf && p.valueOf();
        if (_ != null && _ !== p) return a.from(_, c, f);
        const w = y(p);
        if (w) return w;
        if (typeof Symbol != 'undefined' && Symbol.toPrimitive != null && typeof p[Symbol.toPrimitive] == 'function') return a.from(p[Symbol.toPrimitive]('string'), c, f);
        throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof p);
    }

    a.from = function(p, c, f) {
        return d(p, c, f);
    }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);

    function u(p) {
        if (typeof p != 'number') throw new TypeError('"size" argument must be of type number');
        if (p < 0) throw new RangeError('The value "' + p + '" is invalid for option "size"');
    }

    function l(p, c, f) {
        return u(p), p <= 0 ? r(p) : c !== void 0 ? typeof f == 'string' ? r(p).fill(c, f) : r(p).fill(c) : r(p);
    }

    a.alloc = function(p, c, f) {
        return l(p, c, f);
    };

    function h(p) {
        return u(p), r(p < 0 ? 0 : v(p) | 0);
    }

    a.allocUnsafe = function(p) {
        return h(p);
    }, a.allocUnsafeSlow = function(p) {
        return h(p);
    };

    function g(p, c) {
        if ((typeof c != 'string' || c === '') && (c = 'utf8'), !a.isEncoding(c)) throw new TypeError('Unknown encoding: ' + c);
        const f = B(p, c) | 0;
        let _ = r(f);
        const w = _.write(p, c);
        return w !== f && (_ = _.slice(0, w)), _;
    }

    function m(p) {
        const c = p.length < 0 ? 0 : v(p.length) | 0, f = r(c);
        for (let _ = 0; _ < c; _ += 1) f[_] = p[_] & 255;
        return f;
    }

    function b(p) {
        if (At(p, Uint8Array)) {
            const c = new Uint8Array(p);
            return x(c.buffer, c.byteOffset, c.byteLength);
        }
        return m(p);
    }

    function x(p, c, f) {
        if (c < 0 || p.byteLength < c) throw new RangeError('"offset" is outside of buffer bounds');
        if (p.byteLength < c + (f || 0)) throw new RangeError('"length" is outside of buffer bounds');
        let _;
        return c === void 0 && f === void 0 ? _ = new Uint8Array(p) : f === void 0 ? _ = new Uint8Array(p, c) : _ = new Uint8Array(p, c, f), Object.setPrototypeOf(_, a.prototype), _;
    }

    function y(p) {
        if (a.isBuffer(p)) {
            const c = v(p.length) | 0, f = r(c);
            return f.length === 0 || p.copy(f, 0, 0, c), f;
        }
        if (p.length !== void 0) return typeof p.length != 'number' || on(p.length) ? r(0) : m(p);
        if (p.type === 'Buffer' && Array.isArray(p.data)) return m(p.data);
    }

    function v(p) {
        if (p >= s) throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' + s.toString(16) + ' bytes');
        return p | 0;
    }

    function E(p) {
        return +p != p && (p = 0), a.alloc(+p);
    }

    a.isBuffer = function(c) {
        return c != null && c._isBuffer === !0 && c !== a.prototype;
    }, a.compare = function(c, f) {
        if (At(c, Uint8Array) && (c = a.from(c, c.offset, c.byteLength)), At(f, Uint8Array) && (f = a.from(f, f.offset, f.byteLength)), !a.isBuffer(c) || !a.isBuffer(f)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (c === f) return 0;
        let _ = c.length, w = f.length;
        for (let k = 0, P = Math.min(_, w); k < P; ++k) if (c[k] !== f[k]) {
            _ = c[k], w = f[k];
            break;
        }
        return _ < w ? -1 : w < _ ? 1 : 0;
    }, a.isEncoding = function(c) {
        switch (String(c).toLowerCase()) {
            case'hex':
            case'utf8':
            case'utf-8':
            case'ascii':
            case'latin1':
            case'binary':
            case'base64':
            case'ucs2':
            case'ucs-2':
            case'utf16le':
            case'utf-16le':
                return !0;
            default:
                return !1;
        }
    }, a.concat = function(c, f) {
        if (!Array.isArray(c)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (c.length === 0) return a.alloc(0);
        let _;
        if (f === void 0) for (f = 0, _ = 0; _ < c.length; ++_) f += c[_].length;
        const w = a.allocUnsafe(f);
        let k = 0;
        for (_ = 0; _ < c.length; ++_) {
            let P = c[_];
            if (At(P, Uint8Array)) k + P.length > w.length ? (a.isBuffer(P) || (P = a.from(P)), P.copy(w, k)) : Uint8Array.prototype.set.call(w, P, k); else if (a.isBuffer(P)) P.copy(w, k); else throw new TypeError('"list" argument must be an Array of Buffers');
            k += P.length;
        }
        return w;
    };

    function B(p, c) {
        if (a.isBuffer(p)) return p.length;
        if (ArrayBuffer.isView(p) || At(p, ArrayBuffer)) return p.byteLength;
        if (typeof p != 'string') throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof p);
        const f = p.length, _ = arguments.length > 2 && arguments[2] === !0;
        if (!_ && f === 0) return 0;
        let w = !1;
        for (; ;) switch (c) {
            case'ascii':
            case'latin1':
            case'binary':
                return f;
            case'utf8':
            case'utf-8':
                return sn(p).length;
            case'ucs2':
            case'ucs-2':
            case'utf16le':
            case'utf-16le':
                return f * 2;
            case'hex':
                return f >>> 1;
            case'base64':
                return gs(p).length;
            default:
                if (w) return _ ? -1 : sn(p).length;
                c = ('' + c).toLowerCase(), w = !0;
        }
    }

    a.byteLength = B;

    function T(p, c, f) {
        let _ = !1;
        if ((c === void 0 || c < 0) && (c = 0), c > this.length || ((f === void 0 || f > this.length) && (f = this.length), f <= 0) || (f >>>= 0, c >>>= 0, f <= c)) return '';
        for (p || (p = 'utf8'); ;) switch (p) {
            case'hex':
                return N(this, c, f);
            case'utf8':
            case'utf-8':
                return M(this, c, f);
            case'ascii':
                return K(this, c, f);
            case'latin1':
            case'binary':
                return Y(this, c, f);
            case'base64':
                return U(this, c, f);
            case'ucs2':
            case'ucs-2':
            case'utf16le':
            case'utf-16le':
                return it(this, c, f);
            default:
                if (_) throw new TypeError('Unknown encoding: ' + p);
                p = (p + '').toLowerCase(), _ = !0;
        }
    }

    a.prototype._isBuffer = !0;

    function D(p, c, f) {
        const _ = p[c];
        p[c] = p[f], p[f] = _;
    }

    a.prototype.swap16 = function() {
        const c = this.length;
        if (c % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
        for (let f = 0; f < c; f += 2) D(this, f, f + 1);
        return this;
    }, a.prototype.swap32 = function() {
        const c = this.length;
        if (c % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
        for (let f = 0; f < c; f += 4) D(this, f, f + 3), D(this, f + 1, f + 2);
        return this;
    }, a.prototype.swap64 = function() {
        const c = this.length;
        if (c % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
        for (let f = 0; f < c; f += 8) D(this, f, f + 7), D(this, f + 1, f + 6), D(this, f + 2, f + 5), D(this, f + 3, f + 4);
        return this;
    }, a.prototype.toString = function() {
        const c = this.length;
        return c === 0 ? '' : arguments.length === 0 ? M(this, 0, c) : T.apply(this, arguments);
    }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(c) {
        if (!a.isBuffer(c)) throw new TypeError('Argument must be a Buffer');
        return this === c ? !0 : a.compare(this, c) === 0;
    }, a.prototype.inspect = function() {
        let c = '';
        const f = i.INSPECT_MAX_BYTES;
        return c = this.toString('hex', 0, f).replace(/(.{2})/g, '$1 ').trim(), this.length > f && (c += ' ... '), '<Buffer ' + c + '>';
    }, n && (a.prototype[n] = a.prototype.inspect), a.prototype.compare = function(c, f, _, w, k) {
        if (At(c, Uint8Array) && (c = a.from(c, c.offset, c.byteLength)), !a.isBuffer(c)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof c);
        if (f === void 0 && (f = 0), _ === void 0 && (_ = c ? c.length : 0), w === void 0 && (w = 0), k === void 0 && (k = this.length), f < 0 || _ > c.length || w < 0 || k > this.length) throw new RangeError('out of range index');
        if (w >= k && f >= _) return 0;
        if (w >= k) return -1;
        if (f >= _) return 1;
        if (f >>>= 0, _ >>>= 0, w >>>= 0, k >>>= 0, this === c) return 0;
        let P = k - w, H = _ - f;
        const nt = Math.min(P, H), et = this.slice(w, k), st = c.slice(f, _);
        for (let Z = 0; Z < nt; ++Z) if (et[Z] !== st[Z]) {
            P = et[Z], H = st[Z];
            break;
        }
        return P < H ? -1 : H < P ? 1 : 0;
    };

    function O(p, c, f, _, w) {
        if (p.length === 0) return -1;
        if (typeof f == 'string' ? (_ = f, f = 0) : f > 2147483647 ? f = 2147483647 : f < -2147483648 && (f = -2147483648), f = +f, on(f) && (f = w ? 0 : p.length - 1), f < 0 && (f = p.length + f), f >= p.length) {
            if (w) return -1;
            f = p.length - 1;
        } else if (f < 0) if (w) f = 0; else return -1;
        if (typeof c == 'string' && (c = a.from(c, _)), a.isBuffer(c)) return c.length === 0 ? -1 : S(p, c, f, _, w);
        if (typeof c == 'number') return c = c & 255, typeof Uint8Array.prototype.indexOf == 'function' ? w ? Uint8Array.prototype.indexOf.call(p, c, f) : Uint8Array.prototype.lastIndexOf.call(p, c, f) : S(p, [c], f, _, w);
        throw new TypeError('val must be string, number or Buffer');
    }

    function S(p, c, f, _, w) {
        let k = 1, P = p.length, H = c.length;
        if (_ !== void 0 && (_ = String(_).toLowerCase(), _ === 'ucs2' || _ === 'ucs-2' || _ === 'utf16le' || _ === 'utf-16le')) {
            if (p.length < 2 || c.length < 2) return -1;
            k = 2, P /= 2, H /= 2, f /= 2;
        }

        function nt(st, Z) {
            return k === 1 ? st[Z] : st.readUInt16BE(Z * k);
        }

        let et;
        if (w) {
            let st = -1;
            for (et = f; et < P; et++) if (nt(p, et) === nt(c, st === -1 ? 0 : et - st)) {
                if (st === -1 && (st = et), et - st + 1 === H) return st * k;
            } else st !== -1 && (et -= et - st), st = -1;
        } else for (f + H > P && (f = P - H), et = f; et >= 0; et--) {
            let st = !0;
            for (let Z = 0; Z < H; Z++) if (nt(p, et + Z) !== nt(c, Z)) {
                st = !1;
                break;
            }
            if (st) return et;
        }
        return -1;
    }

    a.prototype.includes = function(c, f, _) {
        return this.indexOf(c, f, _) !== -1;
    }, a.prototype.indexOf = function(c, f, _) {
        return O(this, c, f, _, !0);
    }, a.prototype.lastIndexOf = function(c, f, _) {
        return O(this, c, f, _, !1);
    };

    function C(p, c, f, _) {
        f = Number(f) || 0;
        const w = p.length - f;
        _ ? (_ = Number(_), _ > w && (_ = w)) : _ = w;
        const k = c.length;
        _ > k / 2 && (_ = k / 2);
        let P;
        for (P = 0; P < _; ++P) {
            const H = parseInt(c.substr(P * 2, 2), 16);
            if (on(H)) return P;
            p[f + P] = H;
        }
        return P;
    }

    function R(p, c, f, _) {
        return Ge(sn(c, p.length - f), p, f, _);
    }

    function z(p, c, f, _) {
        return Ge(Qr(c), p, f, _);
    }

    function L(p, c, f, _) {
        return Ge(gs(c), p, f, _);
    }

    function I(p, c, f, _) {
        return Ge(ta(c, p.length - f), p, f, _);
    }

    a.prototype.write = function(c, f, _, w) {
        if (f === void 0) w = 'utf8', _ = this.length, f = 0; else if (_ === void 0 && typeof f == 'string') w = f, _ = this.length, f = 0; else if (isFinite(f)) f = f >>> 0, isFinite(_) ? (_ = _ >>> 0, w === void 0 && (w = 'utf8')) : (w = _, _ = void 0); else throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
        const k = this.length - f;
        if ((_ === void 0 || _ > k) && (_ = k), c.length > 0 && (_ < 0 || f < 0) || f > this.length) throw new RangeError('Attempt to write outside buffer bounds');
        w || (w = 'utf8');
        let P = !1;
        for (; ;) switch (w) {
            case'hex':
                return C(this, c, f, _);
            case'utf8':
            case'utf-8':
                return R(this, c, f, _);
            case'ascii':
            case'latin1':
            case'binary':
                return z(this, c, f, _);
            case'base64':
                return L(this, c, f, _);
            case'ucs2':
            case'ucs-2':
            case'utf16le':
            case'utf-16le':
                return I(this, c, f, _);
            default:
                if (P) throw new TypeError('Unknown encoding: ' + w);
                w = ('' + w).toLowerCase(), P = !0;
        }
    }, a.prototype.toJSON = function() {
        return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
    };

    function U(p, c, f) {
        return c === 0 && f === p.length ? t.fromByteArray(p) : t.fromByteArray(p.slice(c, f));
    }

    function M(p, c, f) {
        f = Math.min(p.length, f);
        const _ = [];
        let w = c;
        for (; w < f;) {
            const k = p[w];
            let P = null, H = k > 239 ? 4 : k > 223 ? 3 : k > 191 ? 2 : 1;
            if (w + H <= f) {
                let nt, et, st, Z;
                switch (H) {
                    case 1:
                        k < 128 && (P = k);
                        break;
                    case 2:
                        nt = p[w + 1], (nt & 192) == 128 && (Z = (k & 31) << 6 | nt & 63, Z > 127 && (P = Z));
                        break;
                    case 3:
                        nt = p[w + 1], et = p[w + 2], (nt & 192) == 128 && (et & 192) == 128 && (Z = (k & 15) << 12 | (nt & 63) << 6 | et & 63, Z > 2047 && (Z < 55296 || Z > 57343) && (P = Z));
                        break;
                    case 4:
                        nt = p[w + 1], et = p[w + 2], st = p[w + 3], (nt & 192) == 128 && (et & 192) == 128 && (st & 192) == 128 && (Z = (k & 15) << 18 | (nt & 63) << 12 | (et & 63) << 6 | st & 63, Z > 65535 && Z < 1114112 && (P = Z));
                }
            }
            P === null ? (P = 65533, H = 1) : P > 65535 && (P -= 65536, _.push(P >>> 10 & 1023 | 55296), P = 56320 | P & 1023), _.push(P), w += H;
        }
        return F(_);
    }

    const A = 4096;

    function F(p) {
        const c = p.length;
        if (c <= A) return String.fromCharCode.apply(String, p);
        let f = '', _ = 0;
        for (; _ < c;) f += String.fromCharCode.apply(String, p.slice(_, _ += A));
        return f;
    }

    function K(p, c, f) {
        let _ = '';
        f = Math.min(p.length, f);
        for (let w = c; w < f; ++w) _ += String.fromCharCode(p[w] & 127);
        return _;
    }

    function Y(p, c, f) {
        let _ = '';
        f = Math.min(p.length, f);
        for (let w = c; w < f; ++w) _ += String.fromCharCode(p[w]);
        return _;
    }

    function N(p, c, f) {
        const _ = p.length;
        (!c || c < 0) && (c = 0), (!f || f < 0 || f > _) && (f = _);
        let w = '';
        for (let k = c; k < f; ++k) w += ea[p[k]];
        return w;
    }

    function it(p, c, f) {
        const _ = p.slice(c, f);
        let w = '';
        for (let k = 0; k < _.length - 1; k += 2) w += String.fromCharCode(_[k] + _[k + 1] * 256);
        return w;
    }

    a.prototype.slice = function(c, f) {
        const _ = this.length;
        c = ~~c, f = f === void 0 ? _ : ~~f, c < 0 ? (c += _, c < 0 && (c = 0)) : c > _ && (c = _), f < 0 ? (f += _, f < 0 && (f = 0)) : f > _ && (f = _), f < c && (f = c);
        const w = this.subarray(c, f);
        return Object.setPrototypeOf(w, a.prototype), w;
    };

    function W(p, c, f) {
        if (p % 1 != 0 || p < 0) throw new RangeError('offset is not uint');
        if (p + c > f) throw new RangeError('Trying to access beyond buffer length');
    }

    a.prototype.readUintLE = a.prototype.readUIntLE = function(c, f, _) {
        c = c >>> 0, f = f >>> 0, _ || W(c, f, this.length);
        let w = this[c], k = 1, P = 0;
        for (; ++P < f && (k *= 256);) w += this[c + P] * k;
        return w;
    }, a.prototype.readUintBE = a.prototype.readUIntBE = function(c, f, _) {
        c = c >>> 0, f = f >>> 0, _ || W(c, f, this.length);
        let w = this[c + --f], k = 1;
        for (; f > 0 && (k *= 256);) w += this[c + --f] * k;
        return w;
    }, a.prototype.readUint8 = a.prototype.readUInt8 = function(c, f) {
        return c = c >>> 0, f || W(c, 1, this.length), this[c];
    }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(c, f) {
        return c = c >>> 0, f || W(c, 2, this.length), this[c] | this[c + 1] << 8;
    }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(c, f) {
        return c = c >>> 0, f || W(c, 2, this.length), this[c] << 8 | this[c + 1];
    }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(c, f) {
        return c = c >>> 0, f || W(c, 4, this.length), (this[c] | this[c + 1] << 8 | this[c + 2] << 16) + this[c + 3] * 16777216;
    }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(c, f) {
        return c = c >>> 0, f || W(c, 4, this.length), this[c] * 16777216 + (this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3]);
    }, a.prototype.readBigUInt64LE = It(function(c) {
        c = c >>> 0, oe(c, 'offset');
        const f = this[c], _ = this[c + 7];
        (f === void 0 || _ === void 0) && xe(c, this.length - 8);
        const w = f + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + this[++c] * 2 ** 24,
          k = this[++c] + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + _ * 2 ** 24;
        return BigInt(w) + (BigInt(k) << BigInt(32));
    }), a.prototype.readBigUInt64BE = It(function(c) {
        c = c >>> 0, oe(c, 'offset');
        const f = this[c], _ = this[c + 7];
        (f === void 0 || _ === void 0) && xe(c, this.length - 8);
        const w = f * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + this[++c],
          k = this[++c] * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + _;
        return (BigInt(w) << BigInt(32)) + BigInt(k);
    }), a.prototype.readIntLE = function(c, f, _) {
        c = c >>> 0, f = f >>> 0, _ || W(c, f, this.length);
        let w = this[c], k = 1, P = 0;
        for (; ++P < f && (k *= 256);) w += this[c + P] * k;
        return k *= 128, w >= k && (w -= Math.pow(2, 8 * f)), w;
    }, a.prototype.readIntBE = function(c, f, _) {
        c = c >>> 0, f = f >>> 0, _ || W(c, f, this.length);
        let w = f, k = 1, P = this[c + --w];
        for (; w > 0 && (k *= 256);) P += this[c + --w] * k;
        return k *= 128, P >= k && (P -= Math.pow(2, 8 * f)), P;
    }, a.prototype.readInt8 = function(c, f) {
        return c = c >>> 0, f || W(c, 1, this.length), this[c] & 128 ? (255 - this[c] + 1) * -1 : this[c];
    }, a.prototype.readInt16LE = function(c, f) {
        c = c >>> 0, f || W(c, 2, this.length);
        const _ = this[c] | this[c + 1] << 8;
        return _ & 32768 ? _ | 4294901760 : _;
    }, a.prototype.readInt16BE = function(c, f) {
        c = c >>> 0, f || W(c, 2, this.length);
        const _ = this[c + 1] | this[c] << 8;
        return _ & 32768 ? _ | 4294901760 : _;
    }, a.prototype.readInt32LE = function(c, f) {
        return c = c >>> 0, f || W(c, 4, this.length), this[c] | this[c + 1] << 8 | this[c + 2] << 16 | this[c + 3] << 24;
    }, a.prototype.readInt32BE = function(c, f) {
        return c = c >>> 0, f || W(c, 4, this.length), this[c] << 24 | this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3];
    }, a.prototype.readBigInt64LE = It(function(c) {
        c = c >>> 0, oe(c, 'offset');
        const f = this[c], _ = this[c + 7];
        (f === void 0 || _ === void 0) && xe(c, this.length - 8);
        const w = this[c + 4] + this[c + 5] * 2 ** 8 + this[c + 6] * 2 ** 16 + (_ << 24);
        return (BigInt(w) << BigInt(32)) + BigInt(f + this[++c] * 2 ** 8 + this[++c] * 2 ** 16 + this[++c] * 2 ** 24);
    }), a.prototype.readBigInt64BE = It(function(c) {
        c = c >>> 0, oe(c, 'offset');
        const f = this[c], _ = this[c + 7];
        (f === void 0 || _ === void 0) && xe(c, this.length - 8);
        const w = (f << 24) + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + this[++c];
        return (BigInt(w) << BigInt(32)) + BigInt(this[++c] * 2 ** 24 + this[++c] * 2 ** 16 + this[++c] * 2 ** 8 + _);
    }), a.prototype.readFloatLE = function(c, f) {
        return c = c >>> 0, f || W(c, 4, this.length), e.read(this, c, !0, 23, 4);
    }, a.prototype.readFloatBE = function(c, f) {
        return c = c >>> 0, f || W(c, 4, this.length), e.read(this, c, !1, 23, 4);
    }, a.prototype.readDoubleLE = function(c, f) {
        return c = c >>> 0, f || W(c, 8, this.length), e.read(this, c, !0, 52, 8);
    }, a.prototype.readDoubleBE = function(c, f) {
        return c = c >>> 0, f || W(c, 8, this.length), e.read(this, c, !1, 52, 8);
    };

    function q(p, c, f, _, w, k) {
        if (!a.isBuffer(p)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (c > w || c < k) throw new RangeError('"value" argument is out of bounds');
        if (f + _ > p.length) throw new RangeError('Index out of range');
    }

    a.prototype.writeUintLE = a.prototype.writeUIntLE = function(c, f, _, w) {
        if (c = +c, f = f >>> 0, _ = _ >>> 0, !w) {
            const H = Math.pow(2, 8 * _) - 1;
            q(this, c, f, _, H, 0);
        }
        let k = 1, P = 0;
        for (this[f] = c & 255; ++P < _ && (k *= 256);) this[f + P] = c / k & 255;
        return f + _;
    }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(c, f, _, w) {
        if (c = +c, f = f >>> 0, _ = _ >>> 0, !w) {
            const H = Math.pow(2, 8 * _) - 1;
            q(this, c, f, _, H, 0);
        }
        let k = _ - 1, P = 1;
        for (this[f + k] = c & 255; --k >= 0 && (P *= 256);) this[f + k] = c / P & 255;
        return f + _;
    }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(c, f, _) {
        return c = +c, f = f >>> 0, _ || q(this, c, f, 1, 255, 0), this[f] = c & 255, f + 1;
    }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(c, f, _) {
        return c = +c, f = f >>> 0, _ || q(this, c, f, 2, 65535, 0), this[f] = c & 255, this[f + 1] = c >>> 8, f + 2;
    }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(c, f, _) {
        return c = +c, f = f >>> 0, _ || q(this, c, f, 2, 65535, 0), this[f] = c >>> 8, this[f + 1] = c & 255, f + 2;
    }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(c, f, _) {
        return c = +c, f = f >>> 0, _ || q(this, c, f, 4, 4294967295, 0), this[f + 3] = c >>> 24, this[f + 2] = c >>> 16, this[f + 1] = c >>> 8, this[f] = c & 255, f + 4;
    }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(c, f, _) {
        return c = +c, f = f >>> 0, _ || q(this, c, f, 4, 4294967295, 0), this[f] = c >>> 24, this[f + 1] = c >>> 16, this[f + 2] = c >>> 8, this[f + 3] = c & 255, f + 4;
    };

    function pt(p, c, f, _, w) {
        hs(c, _, w, p, f, 7);
        let k = Number(c & BigInt(4294967295));
        p[f++] = k, k = k >> 8, p[f++] = k, k = k >> 8, p[f++] = k, k = k >> 8, p[f++] = k;
        let P = Number(c >> BigInt(32) & BigInt(4294967295));
        return p[f++] = P, P = P >> 8, p[f++] = P, P = P >> 8, p[f++] = P, P = P >> 8, p[f++] = P, f;
    }

    function ie(p, c, f, _, w) {
        hs(c, _, w, p, f, 7);
        let k = Number(c & BigInt(4294967295));
        p[f + 7] = k, k = k >> 8, p[f + 6] = k, k = k >> 8, p[f + 5] = k, k = k >> 8, p[f + 4] = k;
        let P = Number(c >> BigInt(32) & BigInt(4294967295));
        return p[f + 3] = P, P = P >> 8, p[f + 2] = P, P = P >> 8, p[f + 1] = P, P = P >> 8, p[f] = P, f + 8;
    }

    a.prototype.writeBigUInt64LE = It(function(c, f = 0) {
        return pt(this, c, f, BigInt(0), BigInt('0xffffffffffffffff'));
    }), a.prototype.writeBigUInt64BE = It(function(c, f = 0) {
        return ie(this, c, f, BigInt(0), BigInt('0xffffffffffffffff'));
    }), a.prototype.writeIntLE = function(c, f, _, w) {
        if (c = +c, f = f >>> 0, !w) {
            const nt = Math.pow(2, 8 * _ - 1);
            q(this, c, f, _, nt - 1, -nt);
        }
        let k = 0, P = 1, H = 0;
        for (this[f] = c & 255; ++k < _ && (P *= 256);) c < 0 && H === 0 && this[f + k - 1] !== 0 && (H = 1), this[f + k] = (c / P >> 0) - H & 255;
        return f + _;
    }, a.prototype.writeIntBE = function(c, f, _, w) {
        if (c = +c, f = f >>> 0, !w) {
            const nt = Math.pow(2, 8 * _ - 1);
            q(this, c, f, _, nt - 1, -nt);
        }
        let k = _ - 1, P = 1, H = 0;
        for (this[f + k] = c & 255; --k >= 0 && (P *= 256);) c < 0 && H === 0 && this[f + k + 1] !== 0 && (H = 1), this[f + k] = (c / P >> 0) - H & 255;
        return f + _;
    }, a.prototype.writeInt8 = function(c, f, _) {
        return c = +c, f = f >>> 0, _ || q(this, c, f, 1, 127, -128), c < 0 && (c = 255 + c + 1), this[f] = c & 255, f + 1;
    }, a.prototype.writeInt16LE = function(c, f, _) {
        return c = +c, f = f >>> 0, _ || q(this, c, f, 2, 32767, -32768), this[f] = c & 255, this[f + 1] = c >>> 8, f + 2;
    }, a.prototype.writeInt16BE = function(c, f, _) {
        return c = +c, f = f >>> 0, _ || q(this, c, f, 2, 32767, -32768), this[f] = c >>> 8, this[f + 1] = c & 255, f + 2;
    }, a.prototype.writeInt32LE = function(c, f, _) {
        return c = +c, f = f >>> 0, _ || q(this, c, f, 4, 2147483647, -2147483648), this[f] = c & 255, this[f + 1] = c >>> 8, this[f + 2] = c >>> 16, this[f + 3] = c >>> 24, f + 4;
    }, a.prototype.writeInt32BE = function(c, f, _) {
        return c = +c, f = f >>> 0, _ || q(this, c, f, 4, 2147483647, -2147483648), c < 0 && (c = 4294967295 + c + 1), this[f] = c >>> 24, this[f + 1] = c >>> 16, this[f + 2] = c >>> 8, this[f + 3] = c & 255, f + 4;
    }, a.prototype.writeBigInt64LE = It(function(c, f = 0) {
        return pt(this, c, f, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
    }), a.prototype.writeBigInt64BE = It(function(c, f = 0) {
        return ie(this, c, f, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
    });

    function ne(p, c, f, _, w, k) {
        if (f + _ > p.length) throw new RangeError('Index out of range');
        if (f < 0) throw new RangeError('Index out of range');
    }

    function cs(p, c, f, _, w) {
        return c = +c, f = f >>> 0, w || ne(p, c, f, 4), e.write(p, c, f, _, 23, 4), f + 4;
    }

    a.prototype.writeFloatLE = function(c, f, _) {
        return cs(this, c, f, !0, _);
    }, a.prototype.writeFloatBE = function(c, f, _) {
        return cs(this, c, f, !1, _);
    };

    function ls(p, c, f, _, w) {
        return c = +c, f = f >>> 0, w || ne(p, c, f, 8), e.write(p, c, f, _, 52, 8), f + 8;
    }

    a.prototype.writeDoubleLE = function(c, f, _) {
        return ls(this, c, f, !0, _);
    }, a.prototype.writeDoubleBE = function(c, f, _) {
        return ls(this, c, f, !1, _);
    }, a.prototype.copy = function(c, f, _, w) {
        if (!a.isBuffer(c)) throw new TypeError('argument should be a Buffer');
        if (_ || (_ = 0), !w && w !== 0 && (w = this.length), f >= c.length && (f = c.length), f || (f = 0), w > 0 && w < _ && (w = _), w === _ || c.length === 0 || this.length === 0) return 0;
        if (f < 0) throw new RangeError('targetStart out of bounds');
        if (_ < 0 || _ >= this.length) throw new RangeError('Index out of range');
        if (w < 0) throw new RangeError('sourceEnd out of bounds');
        w > this.length && (w = this.length), c.length - f < w - _ && (w = c.length - f + _);
        const k = w - _;
        return this === c && typeof Uint8Array.prototype.copyWithin == 'function' ? this.copyWithin(f, _, w) : Uint8Array.prototype.set.call(c, this.subarray(_, w), f), k;
    }, a.prototype.fill = function(c, f, _, w) {
        if (typeof c == 'string') {
            if (typeof f == 'string' ? (w = f, f = 0, _ = this.length) : typeof _ == 'string' && (w = _, _ = this.length), w !== void 0 && typeof w != 'string') throw new TypeError('encoding must be a string');
            if (typeof w == 'string' && !a.isEncoding(w)) throw new TypeError('Unknown encoding: ' + w);
            if (c.length === 1) {
                const P = c.charCodeAt(0);
                (w === 'utf8' && P < 128 || w === 'latin1') && (c = P);
            }
        } else typeof c == 'number' ? c = c & 255 : typeof c == 'boolean' && (c = Number(c));
        if (f < 0 || this.length < f || this.length < _) throw new RangeError('Out of range index');
        if (_ <= f) return this;
        f = f >>> 0, _ = _ === void 0 ? this.length : _ >>> 0, c || (c = 0);
        let k;
        if (typeof c == 'number') for (k = f; k < _; ++k) this[k] = c; else {
            const P = a.isBuffer(c) ? c : a.from(c, w), H = P.length;
            if (H === 0) throw new TypeError('The value "' + c + '" is invalid for argument "value"');
            for (k = 0; k < _ - f; ++k) this[k + f] = P[k % H];
        }
        return this;
    };
    const se = {};

    function nn(p, c, f) {
        se[p] = class extends f {
            constructor() {
                super();
                Object.defineProperty(this, 'message', {
                    value: c.apply(this, arguments),
                    writable: !0,
                    configurable: !0
                }), this.name = `${this.name} [${p}]`, this.stack, delete this.name;
            }

            get code() {
                return p;
            }

            set code(w) {
                Object.defineProperty(this, 'code', { configurable: !0, enumerable: !0, value: w, writable: !0 });
            }

            toString() {
                return `${this.name} [${p}]: ${this.message}`;
            }
        };
    }

    nn('ERR_BUFFER_OUT_OF_BOUNDS', function(p) {
        return p ? `${p} is outside of buffer bounds` : 'Attempt to access memory outside buffer bounds';
    }, RangeError), nn('ERR_INVALID_ARG_TYPE', function(p, c) {
        return `The "${p}" argument must be of type number. Received type ${typeof c}`;
    }, TypeError), nn('ERR_OUT_OF_RANGE', function(p, c, f) {
        let _ = `The value of "${p}" is out of range.`, w = f;
        return Number.isInteger(f) && Math.abs(f) > 2 ** 32 ? w = fs(String(f)) : typeof f == 'bigint' && (w = String(f), (f > BigInt(2) ** BigInt(32) || f < -(BigInt(2) ** BigInt(32))) && (w = fs(w)), w += 'n'), _ += ` It must be ${c}. Received ${w}`, _;
    }, RangeError);

    function fs(p) {
        let c = '', f = p.length;
        const _ = p[0] === '-' ? 1 : 0;
        for (; f >= _ + 4; f -= 3) c = `_${p.slice(f - 3, f)}${c}`;
        return `${p.slice(0, f)}${c}`;
    }

    function Kr(p, c, f) {
        oe(c, 'offset'), (p[c] === void 0 || p[c + f] === void 0) && xe(c, p.length - (f + 1));
    }

    function hs(p, c, f, _, w, k) {
        if (p > f || p < c) {
            const P = typeof c == 'bigint' ? 'n' : '';
            let H;
            throw k > 3 ? c === 0 || c === BigInt(0) ? H = `>= 0${P} and < 2${P} ** ${(k + 1) * 8}${P}` : H = `>= -(2${P} ** ${(k + 1) * 8 - 1}${P}) and < 2 ** ${(k + 1) * 8 - 1}${P}` : H = `>= ${c}${P} and <= ${f}${P}`, new se.ERR_OUT_OF_RANGE('value', H, p);
        }
        Kr(_, w, k);
    }

    function oe(p, c) {
        if (typeof p != 'number') throw new se.ERR_INVALID_ARG_TYPE(c, 'number', p);
    }

    function xe(p, c, f) {
        throw Math.floor(p) !== p ? (oe(p, f), new se.ERR_OUT_OF_RANGE(f || 'offset', 'an integer', p)) : c < 0 ? new se.ERR_BUFFER_OUT_OF_BOUNDS : new se.ERR_OUT_OF_RANGE(f || 'offset', `>= ${f ? 1 : 0} and <= ${c}`, p);
    }

    const Zr = /[^+/0-9A-Za-z-_]/g;

    function Jr(p) {
        if (p = p.split('=')[0], p = p.trim().replace(Zr, ''), p.length < 2) return '';
        for (; p.length % 4 != 0;) p = p + '=';
        return p;
    }

    function sn(p, c) {
        c = c || 1 / 0;
        let f;
        const _ = p.length;
        let w = null;
        const k = [];
        for (let P = 0; P < _; ++P) {
            if (f = p.charCodeAt(P), f > 55295 && f < 57344) {
                if (!w) {
                    if (f > 56319) {
                        (c -= 3) > -1 && k.push(239, 191, 189);
                        continue;
                    } else if (P + 1 === _) {
                        (c -= 3) > -1 && k.push(239, 191, 189);
                        continue;
                    }
                    w = f;
                    continue;
                }
                if (f < 56320) {
                    (c -= 3) > -1 && k.push(239, 191, 189), w = f;
                    continue;
                }
                f = (w - 55296 << 10 | f - 56320) + 65536;
            } else w && (c -= 3) > -1 && k.push(239, 191, 189);
            if (w = null, f < 128) {
                if ((c -= 1) < 0) break;
                k.push(f);
            } else if (f < 2048) {
                if ((c -= 2) < 0) break;
                k.push(f >> 6 | 192, f & 63 | 128);
            } else if (f < 65536) {
                if ((c -= 3) < 0) break;
                k.push(f >> 12 | 224, f >> 6 & 63 | 128, f & 63 | 128);
            } else if (f < 1114112) {
                if ((c -= 4) < 0) break;
                k.push(f >> 18 | 240, f >> 12 & 63 | 128, f >> 6 & 63 | 128, f & 63 | 128);
            } else throw new Error('Invalid code point');
        }
        return k;
    }

    function Qr(p) {
        const c = [];
        for (let f = 0; f < p.length; ++f) c.push(p.charCodeAt(f) & 255);
        return c;
    }

    function ta(p, c) {
        let f, _, w;
        const k = [];
        for (let P = 0; P < p.length && !((c -= 2) < 0); ++P) f = p.charCodeAt(P), _ = f >> 8, w = f % 256, k.push(w), k.push(_);
        return k;
    }

    function gs(p) {
        return t.toByteArray(Jr(p));
    }

    function Ge(p, c, f, _) {
        let w;
        for (w = 0; w < _ && !(w + f >= c.length || w >= p.length); ++w) c[w + f] = p[w];
        return w;
    }

    function At(p, c) {
        return p instanceof c || p != null && p.constructor != null && p.constructor.name != null && p.constructor.name === c.name;
    }

    function on(p) {
        return p !== p;
    }

    const ea = function() {
        const p = '0123456789abcdef', c = new Array(256);
        for (let f = 0; f < 16; ++f) {
            const _ = f * 16;
            for (let w = 0; w < 16; ++w) c[_ + w] = p[f] + p[w];
        }
        return c;
    }();

    function It(p) {
        return typeof BigInt == 'undefined' ? ia : p;
    }

    function ia() {
        throw new Error('BigInt not supported');
    }
})(Rs);/*! Copyright Twitter Inc. and other contributors. Licensed under MIT */
var nd = function() {
    var i = {
          base: 'https://twemoji.maxcdn.com/v/13.1.0/',
          ext: '.png',
          size: '72x72',
          className: 'emoji',
          convert: { fromCodePoint: E, toCodePoint: O },
          onerror: function() {
              this.parentNode && this.parentNode.replaceChild(d(this.alt, !1), this);
          },
          parse: B,
          replace: T,
          test: D
      }, t = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\'': '&#39;', '"': '&quot;' },
      e = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91])|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udeeb\udeec\udef4-\udefc\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78\udd7a-\uddb4\uddb7\uddba\uddbc-\uddcb\uddd0\uddde-\uddff\ude70-\ude74\ude78-\ude7a\ude80-\ude86\ude90-\udea8\udeb0-\udeb6\udec0-\udec2\uded0-\uded6]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,
      n = /\uFE0F/g, s = String.fromCharCode(8205), o = /[&<>'"]/g,
      r = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/, a = String.fromCharCode;
    return i;

    function d(S, C) {
        return document.createTextNode(C ? S.replace(n, '') : S);
    }

    function u(S) {
        return S.replace(o, x);
    }

    function l(S, C) {
        return ''.concat(C.base, C.size, '/', S, C.ext);
    }

    function h(S, C) {
        for (var R = S.childNodes, z = R.length, L, I; z--;) L = R[z], I = L.nodeType, I === 3 ? C.push(L) : I === 1 && !('ownerSVGElement' in L) && !r.test(L.nodeName.toLowerCase()) && h(L, C);
        return C;
    }

    function g(S) {
        return O(S.indexOf(s) < 0 ? S.replace(n, '') : S);
    }

    function m(S, C) {
        for (var R = h(S, []), z = R.length, L, I, U, M, A, F, K, Y, N, it, W, q, pt; z--;) {
            for (U = !1, M = document.createDocumentFragment(), A = R[z], F = A.nodeValue, Y = 0; K = e.exec(F);) {
                if (N = K.index, N !== Y && M.appendChild(d(F.slice(Y, N), !0)), W = K[0], q = g(W), Y = N + W.length, pt = C.callback(q, C), q && pt) {
                    it = new Image, it.onerror = C.onerror, it.setAttribute('draggable', 'false'), L = C.attributes(W, q);
                    for (I in L) L.hasOwnProperty(I) && I.indexOf('on') !== 0 && !it.hasAttribute(I) && it.setAttribute(I, L[I]);
                    it.className = C.className, it.alt = W, it.src = pt, U = !0, M.appendChild(it);
                }
                it || M.appendChild(d(W, !1)), it = null;
            }
            U && (Y < F.length && M.appendChild(d(F.slice(Y), !0)), A.parentNode.replaceChild(M, A));
        }
        return S;
    }

    function b(S, C) {
        return T(S, function(R) {
            var z = R, L = g(R), I = C.callback(L, C), U, M;
            if (L && I) {
                z = '<img '.concat('class="', C.className, '" ', 'draggable="false" ', 'alt="', R, '"', ' src="', I, '"'), U = C.attributes(R, L);
                for (M in U) U.hasOwnProperty(M) && M.indexOf('on') !== 0 && z.indexOf(' ' + M + '=') === -1 && (z = z.concat(' ', M, '="', u(U[M]), '"'));
                z = z.concat('/>');
            }
            return z;
        });
    }

    function x(S) {
        return t[S];
    }

    function y() {
        return null;
    }

    function v(S) {
        return typeof S == 'number' ? S + 'x' + S : S;
    }

    function E(S) {
        var C = typeof S == 'string' ? parseInt(S, 16) : S;
        return C < 65536 ? a(C) : (C -= 65536, a(55296 + (C >> 10), 56320 + (C & 1023)));
    }

    function B(S, C) {
        return (!C || typeof C == 'function') && (C = { callback: C }), (typeof S == 'string' ? b : m)(S, {
            callback: C.callback || l,
            attributes: typeof C.attributes == 'function' ? C.attributes : y,
            base: typeof C.base == 'string' ? C.base : i.base,
            ext: C.ext || i.ext,
            size: C.folder || v(C.size || i.size),
            className: C.className || i.className,
            onerror: C.onerror || i.onerror
        });
    }

    function T(S, C) {
        return String(S).replace(e, C);
    }

    function D(S) {
        e.lastIndex = 0;
        var C = e.test(S);
        return e.lastIndex = 0, C;
    }

    function O(S, C) {
        for (var R = [], z = 0, L = 0, I = 0; I < S.length;) z = S.charCodeAt(I++), L ? (R.push((65536 + (L - 55296 << 10) + (z - 56320)).toString(16)), L = 0) : 55296 <= z && z <= 56319 ? L = z : R.push(z.toString(16));
        return R.join(C || '-');
    }
}();

function Ls(i) {
    const t = i - 1;
    return t * t * t + 1;
}

function sd(i, { delay: t = 0, duration: e = 400, easing: n = re } = {}) {
    const s = +getComputedStyle(i).opacity;
    return { delay: t, duration: e, easing: n, css: o => `opacity: ${o * s}` };
}

function od(i, { delay: t = 0, duration: e = 400, easing: n = Ls, x: s = 0, y: o = 0, opacity: r = 0 } = {}) {
    const a = getComputedStyle(i), d = +a.opacity, u = a.transform === 'none' ? '' : a.transform, l = d * (1 - r);
    return {
        delay: t, duration: e, easing: n, css: (h, g) => `
			transform: ${u} translate(${(1 - h) * s}px, ${(1 - h) * o}px);
			opacity: ${d - l * g}`
    };
}

function rd(i, { from: t, to: e }, n = {}) {
    const s = getComputedStyle(i),
      o = s.transform === 'none' ? '' : s.transform, [r, a] = s.transformOrigin.split(' ').map(parseFloat),
      d = t.left + t.width * r / e.width - (e.left + r), u = t.top + t.height * a / e.height - (e.top + a), {
          delay: l = 0,
          duration: h = m => Math.sqrt(m) * 120,
          easing: g = Ls
      } = n;
    return {
        delay: l, duration: Ze(h) ? h(Math.sqrt(d * d + u * u)) : h, easing: g, css: (m, b) => {
            const x = b * d, y = b * u, v = m + b * t.width / e.width, E = m + b * t.height / e.height;
            return `transform: ${o} translate(${x}px, ${y}px) scale(${v}, ${E});`;
        }
    };
}

const ad = () => {
    const { subscribe: i, update: t } = xn([]);
    let e = 0, n = {};
    return {
        subscribe: i, push: (d, u = {}) => {
            const l = { id: ++e, msg: d, ...n, ...u, theme: { ...n.theme, ...u.theme } };
            return t(h => l.reversed ? [...h, l] : [l, ...h]), e;
        }, pop: d => {
            t(u => d ? u.filter(l => l.id !== d) : u.splice(1));
        }, set: (d, u) => {
            t(l => {
                const h = l.findIndex(g => g.id === d);
                return h > -1 && (l[h] = { ...l[h], ...u }), l;
            });
        }, _opts: (d = {}) => (n = { ...n, ...d, theme: { ...n.theme, ...d.theme } }, n)
    };
}, Se = ad();

function Is(i) {
    return Object.prototype.toString.call(i) === '[object Date]';
}

function Mn(i, t) {
    if (i === t || i !== i) return () => i;
    const e = typeof i;
    if (e !== typeof t || Array.isArray(i) !== Array.isArray(t)) throw new Error('Cannot interpolate values of different type');
    if (Array.isArray(i)) {
        const n = t.map((s, o) => Mn(i[o], s));
        return s => n.map(o => o(s));
    }
    if (e === 'object') {
        if (!i || !t) throw new Error('Object cannot be null');
        if (Is(i) && Is(t)) {
            i = i.getTime(), t = t.getTime();
            const o = t - i;
            return r => new Date(i + r * o);
        }
        const n = Object.keys(t), s = {};
        return n.forEach(o => {
            s[o] = Mn(i[o], t[o]);
        }), o => {
            const r = {};
            return n.forEach(a => {
                r[a] = s[a](o);
            }), r;
        };
    }
    if (e === 'number') {
        const n = t - i;
        return s => i + s * n;
    }
    throw new Error(`Cannot interpolate ${e} values`);
}

function dd(i, t = {}) {
    const e = xn(i);
    let n, s = i;

    function o(r, a) {
        if (i == null) return e.set(i = r), Promise.resolve();
        s = r;
        let d = n, u = !1, { delay: l = 0, duration: h = 400, easing: g = re, interpolate: m = Mn } = Ke(Ke({}, t), a);
        if (h === 0) return d && (d.abort(), d = null), e.set(i = s), Promise.resolve();
        const b = ti() + l;
        let x;
        return n = ei(y => {
            if (y < b) return !0;
            u || (x = m(i, r), typeof h == 'function' && (h = h(i, r)), u = !0), d && (d.abort(), d = null);
            const v = y - b;
            return v > h ? (e.set(i = r), !1) : (e.set(i = x(g(v / h))), !0);
        }), n.promise;
    }

    return { set: o, update: (r, a) => o(r(s, i), a), subscribe: e.subscribe };
}

var Jf = '._toastItem.svelte-1y8g5o1{-webkit-tap-highlight-color:transparent;align-items:center;background:var(--toastBackground,rgba(66,66,66,.9));border-radius:var(--toastBorderRadius,.125rem);box-shadow:var(--toastBoxShadow,0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06));color:var(--toastColor,#fff);display:flex;flex-direction:row;height:var(--toastHeight,auto);margin:var(--toastMargin,0 0 .5rem 0);min-height:var(--toastMinHeight,3.5rem);position:relative;width:var(--toastWidth,16rem);will-change:transform,opacity}._toastMsg.svelte-1y8g5o1{flex:1 1 0%;padding:var(--toastMsgPadding,.75rem .5rem)}._toastMsg.svelte-1y8g5o1 a{pointer-events:auto}._toastBtn.svelte-1y8g5o1{align-items:center;cursor:pointer;display:flex;font:1rem sans-serif;height:100%;justify-content:center;outline:none;pointer-events:auto;width:2rem}._toastBar.svelte-1y8g5o1{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;border:none;bottom:0;display:block;height:6px;position:absolute;width:100%}._toastBar.svelte-1y8g5o1::-webkit-progress-bar{background:transparent}._toastBar.svelte-1y8g5o1::-webkit-progress-value{background:var(--toastProgressBackground,rgba(33,150,243,.75))}._toastBar.svelte-1y8g5o1::-moz-progress-bar{background:var(--toastProgressBackground,rgba(33,150,243,.75))}';

function zs(i) {
    let t, e, n, s;
    return {
        c() {
            t = Bt('div'), e = we('\u2715'), this.h();
        }, l(o) {
            t = Yt(o, 'DIV', { class: !0, role: !0, tabindex: !0 });
            var r = Nt(t);
            e = dn(r, '\u2715'), r.forEach(mt), this.h();
        }, h() {
            vt(t, 'class', '_toastBtn svelte-1y8g5o1'), vt(t, 'role', 'button'), vt(t, 'tabindex', '-1');
        }, m(o, r) {
            ye(o, t, r), zt(t, e), n || (s = vs(t, 'click', i[4]), n = !0);
        }, p: ct, d(o) {
            o && mt(t), n = !1, s();
        }
    };
}

function ud(i) {
    let t, e, n = i[0].msg + '', s, o, r, a = i[0].dismissable && zs(i);
    return {
        c() {
            t = Bt('div'), e = Bt('div'), s = ni(), a && a.c(), o = ni(), r = Bt('progress'), this.h();
        }, l(d) {
            t = Yt(d, 'DIV', { class: !0 });
            var u = Nt(t);
            e = Yt(u, 'DIV', { class: !0 });
            var l = Nt(e);
            l.forEach(mt), s = si(u), a && a.l(u), o = si(u), r = Yt(u, 'PROGRESS', { class: !0 }), Nt(r).forEach(mt), u.forEach(mt), this.h();
        }, h() {
            vt(e, 'class', '_toastMsg svelte-1y8g5o1'), vt(r, 'class', '_toastBar svelte-1y8g5o1'), r.value = i[1], vt(t, 'class', '_toastItem svelte-1y8g5o1');
        }, m(d, u) {
            ye(d, t, u), zt(t, e), e.innerHTML = n, zt(t, s), a && a.m(t, null), zt(t, o), zt(t, r);
        }, p(d, [u]) {
            u & 1 && n !== (n = d[0].msg + '') && (e.innerHTML = n), d[0].dismissable ? a ? a.p(d, u) : (a = zs(d), a.c(), a.m(t, o)) : a && (a.d(1), a = null), u & 2 && (r.value = d[1]);
        }, i: ct, o: ct, d(d) {
            d && mt(t), a && a.d();
        }
    };
}

function cd(i, t, e) {
    let n, { item: s } = t;
    const o = dd(s.initial, { duration: s.duration, easing: re });
    rn(i, o, d => e(1, n = d));
    let r = s.initial;
    const a = () => Se.pop(s.id);
    return i.$$set = d => {
        'item' in d && e(0, s = d.item);
    }, i.$$.update = () => {
        i.$$.dirty & 9 && r !== s.progress && (s.progress === 1 || s.progress === 0 ? o.set(s.progress).then(() => Se.pop(s.id)) : o.set(s.progress), e(3, r = s.progress));
    }, [s, n, o, r, a];
}

class ld extends _n {
    constructor(t) {
        super();
        bn(this, t, cd, ud, Je, { item: 0 });
    }
}

var Qf = 'ul.svelte-17xpf3u{bottom:var(--toastContainerBottom,auto);left:var(--toastContainerLeft,auto);list-style-type:none;margin:0;padding:0;pointer-events:none;position:fixed;right:var(--toastContainerRight,2rem);top:var(--toastContainerTop,1.5rem);z-index:9999}';

function Ns(i, t, e) {
    const n = i.slice();
    return n[4] = t[e], n;
}

function Vs(i, t) {
    let e, n, s, o, r, a, d, u = ct, l;
    return n = new ld({ props: { item: t[4] } }), {
        key: i, first: null, c() {
            e = Bt('li'), Ts(n.$$.fragment), s = ni(), this.h();
        }, l(h) {
            e = Yt(h, 'LI', { style: !0 });
            var g = Nt(e);
            Os(n.$$.fragment, g), s = si(g), g.forEach(mt), this.h();
        }, h() {
            vt(e, 'style', o = t[1](t[4].theme)), this.first = e;
        }, m(h, g) {
            ye(h, e, g), pn(n, e, null), zt(e, s), l = !0;
        }, p(h, g) {
            t = h;
            const m = {};
            g & 1 && (m.item = t[4]), n.$set(m), (!l || g & 1 && o !== (o = t[1](t[4].theme))) && vt(e, 'style', o);
        }, r() {
            d = e.getBoundingClientRect();
        }, f() {
            Da(e), u(), Ss(e, d);
        }, a() {
            u(), u = Pa(e, d, rd, { duration: 200 });
        }, i(h) {
            l || (ke(n.$$.fragment, h), ue(() => {
                a && a.end(1), r = za(e, od, t[4].intro), r.start();
            }), l = !0);
        }, o(h) {
            hi(n.$$.fragment, h), r && r.invalidate(), a = Na(e, sd, {}), l = !1;
        }, d(h) {
            h && mt(e), mn(n), h && a && a.end();
        }
    };
}

function fd(i) {
    let t, e = [], n = new Map, s, o = i[0];
    const r = a => a[4].id;
    for (let a = 0; a < o.length; a += 1) {
        let d = Ns(i, o, a), u = r(d);
        n.set(u, e[a] = Vs(u, d));
    }
    return {
        c() {
            t = Bt('ul');
            for (let a = 0; a < e.length; a += 1) e[a].c();
            this.h();
        }, l(a) {
            t = Yt(a, 'UL', { class: !0 });
            var d = Nt(t);
            for (let u = 0; u < e.length; u += 1) e[u].l(d);
            d.forEach(mt), this.h();
        }, h() {
            vt(t, 'class', 'svelte-17xpf3u');
        }, m(a, d) {
            ye(a, t, d);
            for (let u = 0; u < e.length; u += 1) e[u].m(t, null);
            s = !0;
        }, p(a, [d]) {
            if (d & 3) {
                o = a[0], Ps();
                for (let u = 0; u < e.length; u += 1) e[u].r();
                e = Ha(e, d, r, 1, a, o, n, t, Wa, Vs, null, Ns);
                for (let u = 0; u < e.length; u += 1) e[u].a();
                Ds();
            }
        }, i(a) {
            if (!s) {
                for (let d = 0; d < o.length; d += 1) ke(e[d]);
                s = !0;
            }
        }, o(a) {
            for (let d = 0; d < e.length; d += 1) hi(e[d]);
            s = !1;
        }, d(a) {
            a && mt(t);
            for (let d = 0; d < e.length; d += 1) e[d].d();
        }
    };
}

function hd(i, t, e) {
    let n;
    rn(i, Se, a => e(0, n = a));
    let { options: s = {} } = t;
    const o = { duration: 4e3, dismissable: !0, initial: 1, progress: 0, reversed: !1, intro: { x: 256 }, theme: {} };
    Se._opts(o);
    const r = a => Object.keys(a).reduce((d, u) => `${d}${u}:${a[u]};`, '');
    return i.$$set = a => {
        'options' in a && e(2, s = a.options);
    }, i.$$.update = () => {
        i.$$.dirty & 4 && Se._opts(s);
    }, [n, r, s];
}

class gd extends _n {
    constructor(t) {
        super();
        bn(this, t, hd, fd, Je, { options: 2 });
    }
}/*!
 * Chart.js v3.6.0
 * https://www.chartjs.org
 * (c) 2021 Chart.js Contributors
 * Released under the MIT License
 */
const Ws = function() {
    return typeof window == 'undefined' ? function(i) {
        return i();
    } : window.requestAnimationFrame;
}();

function Hs(i, t, e) {
    const n = e || (r => Array.prototype.slice.call(r));
    let s = !1, o = [];
    return function(...r) {
        o = n(r), s || (s = !0, Ws.call(window, () => {
            s = !1, i.apply(t, o);
        }));
    };
}

function pd(i, t) {
    let e;
    return function(...n) {
        return t ? (clearTimeout(e), e = setTimeout(i, t, n)) : i.apply(this, n), t;
    };
}

const kn = i => i === 'start' ? 'left' : i === 'end' ? 'right' : 'center',
  lt = (i, t, e) => i === 'start' ? t : i === 'end' ? e : (t + e) / 2,
  md = (i, t, e, n) => i === (n ? 'left' : 'right') ? e : i === 'center' ? (t + e) / 2 : t;

function Tt() {
}

const bd = function() {
    let i = 0;
    return function() {
        return i++;
    };
}();

function X(i) {
    return i === null || typeof i == 'undefined';
}

function Q(i) {
    if (Array.isArray && Array.isArray(i)) return !0;
    const t = Object.prototype.toString.call(i);
    return t.substr(0, 7) === '[object' && t.substr(-6) === 'Array]';
}

function j(i) {
    return i !== null && Object.prototype.toString.call(i) === '[object Object]';
}

const rt = i => (typeof i == 'number' || i instanceof Number) && isFinite(+i);

function _t(i, t) {
    return rt(i) ? i : t;
}

function V(i, t) {
    return typeof i == 'undefined' ? t : i;
}

const _d = (i, t) => typeof i == 'string' && i.endsWith('%') ? parseFloat(i) / 100 : i / t,
  js = (i, t) => typeof i == 'string' && i.endsWith('%') ? parseFloat(i) / 100 * t : +i;

function tt(i, t, e) {
    if (i && typeof i.call == 'function') return i.apply(e, t);
}

function G(i, t, e, n) {
    let s, o, r;
    if (Q(i)) if (o = i.length, n) for (s = o - 1; s >= 0; s--) t.call(e, i[s], s); else for (s = 0; s < o; s++) t.call(e, i[s], s); else if (j(i)) for (r = Object.keys(i), o = r.length, s = 0; s < o; s++) t.call(e, i[r[s]], r[s]);
}

function pi(i, t) {
    let e, n, s, o;
    if (!i || !t || i.length !== t.length) return !1;
    for (e = 0, n = i.length; e < n; ++e) if (s = i[e], o = t[e], s.datasetIndex !== o.datasetIndex || s.index !== o.index) return !1;
    return !0;
}

function mi(i) {
    if (Q(i)) return i.map(mi);
    if (j(i)) {
        const t = Object.create(null), e = Object.keys(i), n = e.length;
        let s = 0;
        for (; s < n; ++s) t[e[s]] = mi(i[e[s]]);
        return t;
    }
    return i;
}

function Us(i) {
    return ['__proto__', 'prototype', 'constructor'].indexOf(i) === -1;
}

function xd(i, t, e, n) {
    if (!Us(i)) return;
    const s = t[i], o = e[i];
    j(s) && j(o) ? Ae(s, o, n) : t[i] = mi(o);
}

function Ae(i, t, e) {
    const n = Q(t) ? t : [t], s = n.length;
    if (!j(i)) return i;
    e = e || {};
    const o = e.merger || xd;
    for (let r = 0; r < s; ++r) {
        if (t = n[r], !j(t)) continue;
        const a = Object.keys(t);
        for (let d = 0, u = a.length; d < u; ++d) o(a[d], i, t, e);
    }
    return i;
}

function Ce(i, t) {
    return Ae(i, t, { merger: yd });
}

function yd(i, t, e) {
    if (!Us(i)) return;
    const n = t[i], s = e[i];
    j(n) && j(s) ? Ce(n, s) : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = mi(s));
}

const wd = '', vd = '.';

function $s(i, t) {
    const e = i.indexOf(vd, t);
    return e === -1 ? i.length : e;
}

function Xt(i, t) {
    if (t === wd) return i;
    let e = 0, n = $s(t, e);
    for (; i && n > e;) i = i[t.substr(e, n - e)], e = n + 1, n = $s(t, e);
    return i;
}

function Sn(i) {
    return i.charAt(0).toUpperCase() + i.slice(1);
}

const xt = i => typeof i != 'undefined', Wt = i => typeof i == 'function', Md = (i, t) => {
      if (i.size !== t.size) return !1;
      for (const e of i) if (!t.has(e)) return !1;
      return !0;
  }, ot = Math.PI, J = 2 * ot, kd = J + ot, bi = Number.POSITIVE_INFINITY, Sd = ot / 180, at = ot / 2, Ee = ot / 4,
  Ys = ot * 2 / 3, yt = Math.log10, Et = Math.sign;

function Xs(i) {
    const t = Math.round(i);
    i = Pe(i, t, i / 1e3) ? t : i;
    const e = Math.pow(10, Math.floor(yt(i))), n = i / e;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * e;
}

function Ad(i) {
    const t = [], e = Math.sqrt(i);
    let n;
    for (n = 1; n < e; n++) i % n == 0 && (t.push(n), t.push(i / n));
    return e === (e | 0) && t.push(e), t.sort((s, o) => s - o).pop(), t;
}

function fe(i) {
    return !isNaN(parseFloat(i)) && isFinite(i);
}

function Pe(i, t, e) {
    return Math.abs(i - t) < e;
}

function Cd(i, t) {
    const e = Math.round(i);
    return e - t <= i && e + t >= i;
}

function qs(i, t, e) {
    let n, s, o;
    for (n = 0, s = i.length; n < s; n++) o = i[n][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}

function Mt(i) {
    return i * (ot / 180);
}

function An(i) {
    return i * (180 / ot);
}

function Gs(i) {
    if (!rt(i)) return;
    let t = 1, e = 0;
    for (; Math.round(i * t) / t !== i;) t *= 10, e++;
    return e;
}

function Ed(i, t) {
    const e = t.x - i.x, n = t.y - i.y, s = Math.sqrt(e * e + n * n);
    let o = Math.atan2(n, e);
    return o < -.5 * ot && (o += J), { angle: o, distance: s };
}

function Cn(i, t) {
    return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}

function Pd(i, t) {
    return (i - t + kd) % J - ot;
}

function kt(i) {
    return (i % J + J) % J;
}

function _i(i, t, e, n) {
    const s = kt(i), o = kt(t), r = kt(e), a = kt(o - s), d = kt(r - s), u = kt(s - o), l = kt(s - r);
    return s === o || s === r || n && o === r || a > d && u < l;
}

function ut(i, t, e) {
    return Math.max(t, Math.min(e, i));
}

function Dd(i) {
    return ut(i, -32768, 32767);
}

const xi = i => i === 0 || i === 1, Ks = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin((i - t) * J / e)),
  Zs = (i, t, e) => Math.pow(2, -10 * i) * Math.sin((i - t) * J / e) + 1, De = {
      linear: i => i,
      easeInQuad: i => i * i,
      easeOutQuad: i => -i * (i - 2),
      easeInOutQuad: i => (i /= .5) < 1 ? .5 * i * i : -.5 * (--i * (i - 2) - 1),
      easeInCubic: i => i * i * i,
      easeOutCubic: i => (i -= 1) * i * i + 1,
      easeInOutCubic: i => (i /= .5) < 1 ? .5 * i * i * i : .5 * ((i -= 2) * i * i + 2),
      easeInQuart: i => i * i * i * i,
      easeOutQuart: i => -((i -= 1) * i * i * i - 1),
      easeInOutQuart: i => (i /= .5) < 1 ? .5 * i * i * i * i : -.5 * ((i -= 2) * i * i * i - 2),
      easeInQuint: i => i * i * i * i * i,
      easeOutQuint: i => (i -= 1) * i * i * i * i + 1,
      easeInOutQuint: i => (i /= .5) < 1 ? .5 * i * i * i * i * i : .5 * ((i -= 2) * i * i * i * i + 2),
      easeInSine: i => -Math.cos(i * at) + 1,
      easeOutSine: i => Math.sin(i * at),
      easeInOutSine: i => -.5 * (Math.cos(ot * i) - 1),
      easeInExpo: i => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)),
      easeOutExpo: i => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1,
      easeInOutExpo: i => xi(i) ? i : i < .5 ? .5 * Math.pow(2, 10 * (i * 2 - 1)) : .5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
      easeInCirc: i => i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
      easeOutCirc: i => Math.sqrt(1 - (i -= 1) * i),
      easeInOutCirc: i => (i /= .5) < 1 ? -.5 * (Math.sqrt(1 - i * i) - 1) : .5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
      easeInElastic: i => xi(i) ? i : Ks(i, .075, .3),
      easeOutElastic: i => xi(i) ? i : Zs(i, .075, .3),
      easeInOutElastic(i) {
          const t = .1125, e = .45;
          return xi(i) ? i : i < .5 ? .5 * Ks(i * 2, t, e) : .5 + .5 * Zs(i * 2 - 1, t, e);
      },
      easeInBack(i) {
          const t = 1.70158;
          return i * i * ((t + 1) * i - t);
      },
      easeOutBack(i) {
          const t = 1.70158;
          return (i -= 1) * i * ((t + 1) * i + t) + 1;
      },
      easeInOutBack(i) {
          let t = 1.70158;
          return (i /= .5) < 1 ? .5 * (i * i * (((t *= 1.525) + 1) * i - t)) : .5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
      },
      easeInBounce: i => 1 - De.easeOutBounce(1 - i),
      easeOutBounce(i) {
          const t = 7.5625, e = 2.75;
          return i < 1 / e ? t * i * i : i < 2 / e ? t * (i -= 1.5 / e) * i + .75 : i < 2.5 / e ? t * (i -= 2.25 / e) * i + .9375 : t * (i -= 2.625 / e) * i + .984375;
      },
      easeInOutBounce: i => i < .5 ? De.easeInBounce(i * 2) * .5 : De.easeOutBounce(i * 2 - 1) * .5 + .5
  };/*!
 * @kurkle/color v0.1.9
 * https://github.com/kurkle/color#readme
 * (c) 2020 Jukka Kurkela
 * Released under the MIT License
 */
const wt = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      a: 10,
      b: 11,
      c: 12,
      d: 13,
      e: 14,
      f: 15
  }, En = '0123456789ABCDEF', Bd = i => En[i & 15], Td = i => En[(i & 240) >> 4] + En[i & 15],
  yi = i => (i & 240) >> 4 == (i & 15);

function Od(i) {
    return yi(i.r) && yi(i.g) && yi(i.b) && yi(i.a);
}

function Rd(i) {
    var t = i.length, e;
    return i[0] === '#' && (t === 4 || t === 5 ? e = {
        r: 255 & wt[i[1]] * 17,
        g: 255 & wt[i[2]] * 17,
        b: 255 & wt[i[3]] * 17,
        a: t === 5 ? wt[i[4]] * 17 : 255
    } : (t === 7 || t === 9) && (e = {
        r: wt[i[1]] << 4 | wt[i[2]],
        g: wt[i[3]] << 4 | wt[i[4]],
        b: wt[i[5]] << 4 | wt[i[6]],
        a: t === 9 ? wt[i[7]] << 4 | wt[i[8]] : 255
    })), e;
}

function Fd(i) {
    var t = Od(i) ? Bd : Td;
    return i && '#' + t(i.r) + t(i.g) + t(i.b) + (i.a < 255 ? t(i.a) : '');
}

function Be(i) {
    return i + .5 | 0;
}

const wi = (i, t, e) => Math.max(Math.min(i, e), t);

function Te(i) {
    return wi(Be(i * 2.55), 0, 255);
}

function Oe(i) {
    return wi(Be(i * 255), 0, 255);
}

function Pn(i) {
    return wi(Be(i / 2.55) / 100, 0, 1);
}

function Js(i) {
    return wi(Be(i * 100), 0, 100);
}

const Ld = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;

function Id(i) {
    const t = Ld.exec(i);
    let e = 255, n, s, o;
    if (!!t) {
        if (t[7] !== n) {
            const r = +t[7];
            e = 255 & (t[8] ? Te(r) : r * 255);
        }
        return n = +t[1], s = +t[3], o = +t[5], n = 255 & (t[2] ? Te(n) : n), s = 255 & (t[4] ? Te(s) : s), o = 255 & (t[6] ? Te(o) : o), {
            r: n,
            g: s,
            b: o,
            a: e
        };
    }
}

function zd(i) {
    return i && (i.a < 255 ? `rgba(${i.r}, ${i.g}, ${i.b}, ${Pn(i.a)})` : `rgb(${i.r}, ${i.g}, ${i.b})`);
}

const Nd = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;

function Qs(i, t, e) {
    const n = t * Math.min(e, 1 - e), s = (o, r = (o + i / 30) % 12) => e - n * Math.max(Math.min(r - 3, 9 - r, 1), -1);
    return [s(0), s(8), s(4)];
}

function Vd(i, t, e) {
    const n = (s, o = (s + i / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
    return [n(5), n(3), n(1)];
}

function Wd(i, t, e) {
    const n = Qs(i, 1, .5);
    let s;
    for (t + e > 1 && (s = 1 / (t + e), t *= s, e *= s), s = 0; s < 3; s++) n[s] *= 1 - t - e, n[s] += t;
    return n;
}

function Dn(i) {
    const t = 255, e = i.r / t, n = i.g / t, s = i.b / t, o = Math.max(e, n, s), r = Math.min(e, n, s), a = (o + r) / 2;
    let d, u, l;
    return o !== r && (l = o - r, u = a > .5 ? l / (2 - o - r) : l / (o + r), d = o === e ? (n - s) / l + (n < s ? 6 : 0) : o === n ? (s - e) / l + 2 : (e - n) / l + 4, d = d * 60 + .5), [d | 0, u || 0, a];
}

function Bn(i, t, e, n) {
    return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, n)).map(Oe);
}

function Tn(i, t, e) {
    return Bn(Qs, i, t, e);
}

function Hd(i, t, e) {
    return Bn(Wd, i, t, e);
}

function jd(i, t, e) {
    return Bn(Vd, i, t, e);
}

function to(i) {
    return (i % 360 + 360) % 360;
}

function Ud(i) {
    const t = Nd.exec(i);
    let e = 255, n;
    if (!t) return;
    t[5] !== n && (e = t[6] ? Te(+t[5]) : Oe(+t[5]));
    const s = to(+t[2]), o = +t[3] / 100, r = +t[4] / 100;
    return t[1] === 'hwb' ? n = Hd(s, o, r) : t[1] === 'hsv' ? n = jd(s, o, r) : n = Tn(s, o, r), {
        r: n[0],
        g: n[1],
        b: n[2],
        a: e
    };
}

function $d(i, t) {
    var e = Dn(i);
    e[0] = to(e[0] + t), e = Tn(e), i.r = e[0], i.g = e[1], i.b = e[2];
}

function Yd(i) {
    if (!i) return;
    const t = Dn(i), e = t[0], n = Js(t[1]), s = Js(t[2]);
    return i.a < 255 ? `hsla(${e}, ${n}%, ${s}%, ${Pn(i.a)})` : `hsl(${e}, ${n}%, ${s}%)`;
}

const eo = {
    x: 'dark',
    Z: 'light',
    Y: 're',
    X: 'blu',
    W: 'gr',
    V: 'medium',
    U: 'slate',
    A: 'ee',
    T: 'ol',
    S: 'or',
    B: 'ra',
    C: 'lateg',
    D: 'ights',
    R: 'in',
    Q: 'turquois',
    E: 'hi',
    P: 'ro',
    O: 'al',
    N: 'le',
    M: 'de',
    L: 'yello',
    F: 'en',
    K: 'ch',
    G: 'arks',
    H: 'ea',
    I: 'ightg',
    J: 'wh'
}, io = {
    OiceXe: 'f0f8ff',
    antiquewEte: 'faebd7',
    aqua: 'ffff',
    aquamarRe: '7fffd4',
    azuY: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    black: '0',
    blanKedOmond: 'ffebcd',
    Xe: 'ff',
    XeviTet: '8a2be2',
    bPwn: 'a52a2a',
    burlywood: 'deb887',
    caMtXe: '5f9ea0',
    KartYuse: '7fff00',
    KocTate: 'd2691e',
    cSO: 'ff7f50',
    cSnflowerXe: '6495ed',
    cSnsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: 'ffff',
    xXe: '8b',
    xcyan: '8b8b',
    xgTMnPd: 'b8860b',
    xWay: 'a9a9a9',
    xgYF: '6400',
    xgYy: 'a9a9a9',
    xkhaki: 'bdb76b',
    xmagFta: '8b008b',
    xTivegYF: '556b2f',
    xSange: 'ff8c00',
    xScEd: '9932cc',
    xYd: '8b0000',
    xsOmon: 'e9967a',
    xsHgYF: '8fbc8f',
    xUXe: '483d8b',
    xUWay: '2f4f4f',
    xUgYy: '2f4f4f',
    xQe: 'ced1',
    xviTet: '9400d3',
    dAppRk: 'ff1493',
    dApskyXe: 'bfff',
    dimWay: '696969',
    dimgYy: '696969',
    dodgerXe: '1e90ff',
    fiYbrick: 'b22222',
    flSOwEte: 'fffaf0',
    foYstWAn: '228b22',
    fuKsia: 'ff00ff',
    gaRsbSo: 'dcdcdc',
    ghostwEte: 'f8f8ff',
    gTd: 'ffd700',
    gTMnPd: 'daa520',
    Way: '808080',
    gYF: '8000',
    gYFLw: 'adff2f',
    gYy: '808080',
    honeyMw: 'f0fff0',
    hotpRk: 'ff69b4',
    RdianYd: 'cd5c5c',
    Rdigo: '4b0082',
    ivSy: 'fffff0',
    khaki: 'f0e68c',
    lavFMr: 'e6e6fa',
    lavFMrXsh: 'fff0f5',
    lawngYF: '7cfc00',
    NmoncEffon: 'fffacd',
    ZXe: 'add8e6',
    ZcSO: 'f08080',
    Zcyan: 'e0ffff',
    ZgTMnPdLw: 'fafad2',
    ZWay: 'd3d3d3',
    ZgYF: '90ee90',
    ZgYy: 'd3d3d3',
    ZpRk: 'ffb6c1',
    ZsOmon: 'ffa07a',
    ZsHgYF: '20b2aa',
    ZskyXe: '87cefa',
    ZUWay: '778899',
    ZUgYy: '778899',
    ZstAlXe: 'b0c4de',
    ZLw: 'ffffe0',
    lime: 'ff00',
    limegYF: '32cd32',
    lRF: 'faf0e6',
    magFta: 'ff00ff',
    maPon: '800000',
    VaquamarRe: '66cdaa',
    VXe: 'cd',
    VScEd: 'ba55d3',
    VpurpN: '9370db',
    VsHgYF: '3cb371',
    VUXe: '7b68ee',
    VsprRggYF: 'fa9a',
    VQe: '48d1cc',
    VviTetYd: 'c71585',
    midnightXe: '191970',
    mRtcYam: 'f5fffa',
    mistyPse: 'ffe4e1',
    moccasR: 'ffe4b5',
    navajowEte: 'ffdead',
    navy: '80',
    Tdlace: 'fdf5e6',
    Tive: '808000',
    TivedBb: '6b8e23',
    Sange: 'ffa500',
    SangeYd: 'ff4500',
    ScEd: 'da70d6',
    pOegTMnPd: 'eee8aa',
    pOegYF: '98fb98',
    pOeQe: 'afeeee',
    pOeviTetYd: 'db7093',
    papayawEp: 'ffefd5',
    pHKpuff: 'ffdab9',
    peru: 'cd853f',
    pRk: 'ffc0cb',
    plum: 'dda0dd',
    powMrXe: 'b0e0e6',
    purpN: '800080',
    YbeccapurpN: '663399',
    Yd: 'ff0000',
    Psybrown: 'bc8f8f',
    PyOXe: '4169e1',
    saddNbPwn: '8b4513',
    sOmon: 'fa8072',
    sandybPwn: 'f4a460',
    sHgYF: '2e8b57',
    sHshell: 'fff5ee',
    siFna: 'a0522d',
    silver: 'c0c0c0',
    skyXe: '87ceeb',
    UXe: '6a5acd',
    UWay: '708090',
    UgYy: '708090',
    snow: 'fffafa',
    sprRggYF: 'ff7f',
    stAlXe: '4682b4',
    tan: 'd2b48c',
    teO: '8080',
    tEstN: 'd8bfd8',
    tomato: 'ff6347',
    Qe: '40e0d0',
    viTet: 'ee82ee',
    JHt: 'f5deb3',
    wEte: 'ffffff',
    wEtesmoke: 'f5f5f5',
    Lw: 'ffff00',
    LwgYF: '9acd32'
};

function Xd() {
    const i = {}, t = Object.keys(io), e = Object.keys(eo);
    let n, s, o, r, a;
    for (n = 0; n < t.length; n++) {
        for (r = a = t[n], s = 0; s < e.length; s++) o = e[s], a = a.replace(o, eo[o]);
        o = parseInt(io[r], 16), i[a] = [o >> 16 & 255, o >> 8 & 255, o & 255];
    }
    return i;
}

let vi;

function qd(i) {
    vi || (vi = Xd(), vi.transparent = [0, 0, 0, 0]);
    const t = vi[i.toLowerCase()];
    return t && { r: t[0], g: t[1], b: t[2], a: t.length === 4 ? t[3] : 255 };
}

function Mi(i, t, e) {
    if (i) {
        let n = Dn(i);
        n[t] = Math.max(0, Math.min(n[t] + n[t] * e, t === 0 ? 360 : 1)), n = Tn(n), i.r = n[0], i.g = n[1], i.b = n[2];
    }
}

function no(i, t) {
    return i && Object.assign(t || {}, i);
}

function so(i) {
    var t = { r: 0, g: 0, b: 0, a: 255 };
    return Array.isArray(i) ? i.length >= 3 && (t = {
        r: i[0],
        g: i[1],
        b: i[2],
        a: 255
    }, i.length > 3 && (t.a = Oe(i[3]))) : (t = no(i, { r: 0, g: 0, b: 0, a: 1 }), t.a = Oe(t.a)), t;
}

function Gd(i) {
    return i.charAt(0) === 'r' ? Id(i) : Ud(i);
}

class ki {
    constructor(t) {
        if (t instanceof ki) return t;
        const e = typeof t;
        let n;
        e === 'object' ? n = so(t) : e === 'string' && (n = Rd(t) || qd(t) || Gd(t)), this._rgb = n, this._valid = !!n;
    }

    get valid() {
        return this._valid;
    }

    get rgb() {
        var t = no(this._rgb);
        return t && (t.a = Pn(t.a)), t;
    }

    set rgb(t) {
        this._rgb = so(t);
    }

    rgbString() {
        return this._valid ? zd(this._rgb) : this._rgb;
    }

    hexString() {
        return this._valid ? Fd(this._rgb) : this._rgb;
    }

    hslString() {
        return this._valid ? Yd(this._rgb) : this._rgb;
    }

    mix(t, e) {
        const n = this;
        if (t) {
            const s = n.rgb, o = t.rgb;
            let r;
            const a = e === r ? .5 : e, d = 2 * a - 1, u = s.a - o.a,
              l = ((d * u == -1 ? d : (d + u) / (1 + d * u)) + 1) / 2;
            r = 1 - l, s.r = 255 & l * s.r + r * o.r + .5, s.g = 255 & l * s.g + r * o.g + .5, s.b = 255 & l * s.b + r * o.b + .5, s.a = a * s.a + (1 - a) * o.a, n.rgb = s;
        }
        return n;
    }

    clone() {
        return new ki(this.rgb);
    }

    alpha(t) {
        return this._rgb.a = Oe(t), this;
    }

    clearer(t) {
        const e = this._rgb;
        return e.a *= 1 - t, this;
    }

    greyscale() {
        const t = this._rgb, e = Be(t.r * .3 + t.g * .59 + t.b * .11);
        return t.r = t.g = t.b = e, this;
    }

    opaquer(t) {
        const e = this._rgb;
        return e.a *= 1 + t, this;
    }

    negate() {
        const t = this._rgb;
        return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
    }

    lighten(t) {
        return Mi(this._rgb, 2, t), this;
    }

    darken(t) {
        return Mi(this._rgb, 2, -t), this;
    }

    saturate(t) {
        return Mi(this._rgb, 1, t), this;
    }

    desaturate(t) {
        return Mi(this._rgb, 1, -t), this;
    }

    rotate(t) {
        return $d(this._rgb, t), this;
    }
}

function oo(i) {
    return new ki(i);
}

const ro = i => i instanceof CanvasGradient || i instanceof CanvasPattern;

function ao(i) {
    return ro(i) ? i : oo(i);
}

function On(i) {
    return ro(i) ? i : oo(i).saturate(.5).darken(.1).hexString();
}

const qt = Object.create(null), Rn = Object.create(null);

function Re(i, t) {
    if (!t) return i;
    const e = t.split('.');
    for (let n = 0, s = e.length; n < s; ++n) {
        const o = e[n];
        i = i[o] || (i[o] = Object.create(null));
    }
    return i;
}

function Fn(i, t, e) {
    return typeof t == 'string' ? Ae(Re(i, t), e) : Ae(Re(i, ''), t);
}

class Kd {
    constructor(t) {
        this.animation = void 0, this.backgroundColor = 'rgba(0,0,0,0.1)', this.borderColor = 'rgba(0,0,0,0.1)', this.color = '#666', this.datasets = {}, this.devicePixelRatio = e => e.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'], this.font = {
            family: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',
            size: 12,
            style: 'normal',
            lineHeight: 1.2,
            weight: null
        }, this.hover = {}, this.hoverBackgroundColor = (e, n) => On(n.backgroundColor), this.hoverBorderColor = (e, n) => On(n.borderColor), this.hoverColor = (e, n) => On(n.color), this.indexAxis = 'x', this.interaction = {
            mode: 'nearest',
            intersect: !0
        }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.describe(t);
    }

    set(t, e) {
        return Fn(this, t, e);
    }

    get(t) {
        return Re(this, t);
    }

    describe(t, e) {
        return Fn(Rn, t, e);
    }

    override(t, e) {
        return Fn(qt, t, e);
    }

    route(t, e, n, s) {
        const o = Re(this, t), r = Re(this, n), a = '_' + e;
        Object.defineProperties(o, {
            [a]: { value: o[e], writable: !0 }, [e]: {
                enumerable: !0, get() {
                    const d = this[a], u = r[s];
                    return j(d) ? Object.assign({}, u, d) : V(d, u);
                }, set(d) {
                    this[a] = d;
                }
            }
        });
    }
}

var $ = new Kd({
    _scriptable: i => !i.startsWith('on'),
    _indexable: i => i !== 'events',
    hover: { _fallback: 'interaction' },
    interaction: { _scriptable: !1, _indexable: !1 }
});

function Zd(i) {
    return !i || X(i.size) || X(i.family) ? null : (i.style ? i.style + ' ' : '') + (i.weight ? i.weight + ' ' : '') + i.size + 'px ' + i.family;
}

function Si(i, t, e, n, s) {
    let o = t[s];
    return o || (o = t[s] = i.measureText(s).width, e.push(s)), o > n && (n = o), n;
}

function Jd(i, t, e, n) {
    n = n || {};
    let s = n.data = n.data || {}, o = n.garbageCollect = n.garbageCollect || [];
    n.font !== t && (s = n.data = {}, o = n.garbageCollect = [], n.font = t), i.save(), i.font = t;
    let r = 0;
    const a = e.length;
    let d, u, l, h, g;
    for (d = 0; d < a; d++) if (h = e[d], h != null && Q(h) !== !0) r = Si(i, s, o, r, h); else if (Q(h)) for (u = 0, l = h.length; u < l; u++) g = h[u], g != null && !Q(g) && (r = Si(i, s, o, r, g));
    i.restore();
    const m = o.length / 2;
    if (m > e.length) {
        for (d = 0; d < m; d++) delete s[o[d]];
        o.splice(0, m);
    }
    return r;
}

function Gt(i, t, e) {
    const n = i.currentDevicePixelRatio, s = e !== 0 ? Math.max(e / 2, .5) : 0;
    return Math.round((t - s) * n) / n + s;
}

function uo(i, t) {
    t = t || i.getContext('2d'), t.save(), t.resetTransform(), t.clearRect(0, 0, i.width, i.height), t.restore();
}

function Ai(i, t, e, n) {
    let s, o, r, a, d;
    const u = t.pointStyle, l = t.rotation, h = t.radius;
    let g = (l || 0) * Sd;
    if (u && typeof u == 'object' && (s = u.toString(), s === '[object HTMLImageElement]' || s === '[object HTMLCanvasElement]')) {
        i.save(), i.translate(e, n), i.rotate(g), i.drawImage(u, -u.width / 2, -u.height / 2, u.width, u.height), i.restore();
        return;
    }
    if (!(isNaN(h) || h <= 0)) {
        switch (i.beginPath(), u) {
            default:
                i.arc(e, n, h, 0, J), i.closePath();
                break;
            case'triangle':
                i.moveTo(e + Math.sin(g) * h, n - Math.cos(g) * h), g += Ys, i.lineTo(e + Math.sin(g) * h, n - Math.cos(g) * h), g += Ys, i.lineTo(e + Math.sin(g) * h, n - Math.cos(g) * h), i.closePath();
                break;
            case'rectRounded':
                d = h * .516, a = h - d, o = Math.cos(g + Ee) * a, r = Math.sin(g + Ee) * a, i.arc(e - o, n - r, d, g - ot, g - at), i.arc(e + r, n - o, d, g - at, g), i.arc(e + o, n + r, d, g, g + at), i.arc(e - r, n + o, d, g + at, g + ot), i.closePath();
                break;
            case'rect':
                if (!l) {
                    a = Math.SQRT1_2 * h, i.rect(e - a, n - a, 2 * a, 2 * a);
                    break;
                }
                g += Ee;
            case'rectRot':
                o = Math.cos(g) * h, r = Math.sin(g) * h, i.moveTo(e - o, n - r), i.lineTo(e + r, n - o), i.lineTo(e + o, n + r), i.lineTo(e - r, n + o), i.closePath();
                break;
            case'crossRot':
                g += Ee;
            case'cross':
                o = Math.cos(g) * h, r = Math.sin(g) * h, i.moveTo(e - o, n - r), i.lineTo(e + o, n + r), i.moveTo(e + r, n - o), i.lineTo(e - r, n + o);
                break;
            case'star':
                o = Math.cos(g) * h, r = Math.sin(g) * h, i.moveTo(e - o, n - r), i.lineTo(e + o, n + r), i.moveTo(e + r, n - o), i.lineTo(e - r, n + o), g += Ee, o = Math.cos(g) * h, r = Math.sin(g) * h, i.moveTo(e - o, n - r), i.lineTo(e + o, n + r), i.moveTo(e + r, n - o), i.lineTo(e - r, n + o);
                break;
            case'line':
                o = Math.cos(g) * h, r = Math.sin(g) * h, i.moveTo(e - o, n - r), i.lineTo(e + o, n + r);
                break;
            case'dash':
                i.moveTo(e, n), i.lineTo(e + Math.cos(g) * h, n + Math.sin(g) * h);
                break;
        }
        i.fill(), t.borderWidth > 0 && i.stroke();
    }
}

function Kt(i, t, e) {
    return e = e || .5, !t || i && i.x > t.left - e && i.x < t.right + e && i.y > t.top - e && i.y < t.bottom + e;
}

function Ci(i, t) {
    i.save(), i.beginPath(), i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), i.clip();
}

function Ei(i) {
    i.restore();
}

function Qd(i, t, e, n, s) {
    if (!t) return i.lineTo(e.x, e.y);
    if (s === 'middle') {
        const o = (t.x + e.x) / 2;
        i.lineTo(o, t.y), i.lineTo(o, e.y);
    } else s === 'after' != !!n ? i.lineTo(t.x, e.y) : i.lineTo(e.x, t.y);
    i.lineTo(e.x, e.y);
}

function tu(i, t, e, n) {
    if (!t) return i.lineTo(e.x, e.y);
    i.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? e.cp2x : e.cp1x, n ? e.cp2y : e.cp1y, e.x, e.y);
}

function Zt(i, t, e, n, s, o = {}) {
    const r = Q(t) ? t : [t], a = o.strokeWidth > 0 && o.strokeColor !== '';
    let d, u;
    for (i.save(), i.font = s.string, eu(i, o), d = 0; d < r.length; ++d) u = r[d], a && (o.strokeColor && (i.strokeStyle = o.strokeColor), X(o.strokeWidth) || (i.lineWidth = o.strokeWidth), i.strokeText(u, e, n, o.maxWidth)), i.fillText(u, e, n, o.maxWidth), iu(i, e, n, u, o), n += s.lineHeight;
    i.restore();
}

function eu(i, t) {
    t.translation && i.translate(t.translation[0], t.translation[1]), X(t.rotation) || i.rotate(t.rotation), t.color && (i.fillStyle = t.color), t.textAlign && (i.textAlign = t.textAlign), t.textBaseline && (i.textBaseline = t.textBaseline);
}

function iu(i, t, e, n, s) {
    if (s.strikethrough || s.underline) {
        const o = i.measureText(n), r = t - o.actualBoundingBoxLeft, a = t + o.actualBoundingBoxRight,
          d = e - o.actualBoundingBoxAscent, u = e + o.actualBoundingBoxDescent, l = s.strikethrough ? (d + u) / 2 : u;
        i.strokeStyle = i.fillStyle, i.beginPath(), i.lineWidth = s.decorationWidth || 2, i.moveTo(r, l), i.lineTo(a, l), i.stroke();
    }
}

function Pi(i, t) {
    const { x: e, y: n, w: s, h: o, radius: r } = t;
    i.arc(e + r.topLeft, n + r.topLeft, r.topLeft, -at, ot, !0), i.lineTo(e, n + o - r.bottomLeft), i.arc(e + r.bottomLeft, n + o - r.bottomLeft, r.bottomLeft, ot, at, !0), i.lineTo(e + s - r.bottomRight, n + o), i.arc(e + s - r.bottomRight, n + o - r.bottomRight, r.bottomRight, at, 0, !0), i.lineTo(e + s, n + r.topRight), i.arc(e + s - r.topRight, n + r.topRight, r.topRight, 0, -at, !0), i.lineTo(e + r.topLeft, n);
}

const nu = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/),
  su = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);

function ou(i, t) {
    const e = ('' + i).match(nu);
    if (!e || e[1] === 'normal') return t * 1.2;
    switch (i = +e[2], e[3]) {
        case'px':
            return i;
        case'%':
            i /= 100;
            break;
    }
    return t * i;
}

const ru = i => +i || 0;

function Ln(i, t) {
    const e = {}, n = j(t), s = n ? Object.keys(t) : t, o = j(i) ? n ? r => V(i[r], i[t[r]]) : r => i[r] : () => i;
    for (const r of s) e[r] = ru(o(r));
    return e;
}

function co(i) {
    return Ln(i, { top: 'y', right: 'x', bottom: 'y', left: 'x' });
}

function he(i) {
    return Ln(i, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']);
}

function ht(i) {
    const t = co(i);
    return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}

function dt(i, t) {
    i = i || {}, t = t || $.font;
    let e = V(i.size, t.size);
    typeof e == 'string' && (e = parseInt(e, 10));
    let n = V(i.style, t.style);
    n && !('' + n).match(su) && (console.warn('Invalid font style specified: "' + n + '"'), n = '');
    const s = {
        family: V(i.family, t.family),
        lineHeight: ou(V(i.lineHeight, t.lineHeight), e),
        size: e,
        style: n,
        weight: V(i.weight, t.weight),
        string: ''
    };
    return s.string = Zd(s), s;
}

function Fe(i, t, e, n) {
    let s = !0, o, r, a;
    for (o = 0, r = i.length; o < r; ++o) if (a = i[o], a !== void 0 && (t !== void 0 && typeof a == 'function' && (a = a(t), s = !1), e !== void 0 && Q(a) && (a = a[e % a.length], s = !1), a !== void 0)) return n && !s && (n.cacheable = !1), a;
}

function au(i, t, e) {
    const { min: n, max: s } = i, o = js(t, (s - n) / 2), r = (a, d) => e && a === 0 ? 0 : a + d;
    return { min: r(n, -Math.abs(o)), max: r(s, o) };
}

function Ht(i, t) {
    return Object.assign(Object.create(i), t);
}

function In(i, t, e) {
    e = e || (r => i[r] < t);
    let n = i.length - 1, s = 0, o;
    for (; n - s > 1;) o = s + n >> 1, e(o) ? s = o : n = o;
    return { lo: s, hi: n };
}

const Ot = (i, t, e) => In(i, e, n => i[n][t] < e), du = (i, t, e) => In(i, e, n => i[n][t] >= e);

function uu(i, t, e) {
    let n = 0, s = i.length;
    for (; n < s && i[n] < t;) n++;
    for (; s > n && i[s - 1] > e;) s--;
    return n > 0 || s < i.length ? i.slice(n, s) : i;
}

const lo = ['push', 'pop', 'shift', 'splice', 'unshift'];

function cu(i, t) {
    if (i._chartjs) {
        i._chartjs.listeners.push(t);
        return;
    }
    Object.defineProperty(i, '_chartjs', {
        configurable: !0,
        enumerable: !1,
        value: { listeners: [t] }
    }), lo.forEach(e => {
        const n = '_onData' + Sn(e), s = i[e];
        Object.defineProperty(i, e, {
            configurable: !0, enumerable: !1, value(...o) {
                const r = s.apply(this, o);
                return i._chartjs.listeners.forEach(a => {
                    typeof a[n] == 'function' && a[n](...o);
                }), r;
            }
        });
    });
}

function fo(i, t) {
    const e = i._chartjs;
    if (!e) return;
    const n = e.listeners, s = n.indexOf(t);
    s !== -1 && n.splice(s, 1), !(n.length > 0) && (lo.forEach(o => {
        delete i[o];
    }), delete i._chartjs);
}

function ho(i) {
    const t = new Set;
    let e, n;
    for (e = 0, n = i.length; e < n; ++e) t.add(i[e]);
    return t.size === n ? i : Array.from(t);
}

function zn(i, t = [''], e = i, n, s = () => i[0]) {
    xt(n) || (n = xo('_fallback', i));
    const o = {
        [Symbol.toStringTag]: 'Object',
        _cacheable: !0,
        _scopes: i,
        _rootScopes: e,
        _fallback: n,
        _getTarget: s,
        override: r => zn([r, ...i], t, e, n)
    };
    return new Proxy(o, {
        deleteProperty(r, a) {
            return delete r[a], delete r._keys, delete i[0][a], !0;
        }, get(r, a) {
            return mo(r, a, () => _u(a, t, i, r));
        }, getOwnPropertyDescriptor(r, a) {
            return Reflect.getOwnPropertyDescriptor(r._scopes[0], a);
        }, getPrototypeOf() {
            return Reflect.getPrototypeOf(i[0]);
        }, has(r, a) {
            return yo(r).includes(a);
        }, ownKeys(r) {
            return yo(r);
        }, set(r, a, d) {
            const u = r._storage || (r._storage = s());
            return u[a] = d, delete r[a], delete r._keys, !0;
        }
    });
}

function ge(i, t, e, n) {
    const s = {
        _cacheable: !1,
        _proxy: i,
        _context: t,
        _subProxy: e,
        _stack: new Set,
        _descriptors: go(i, n),
        setContext: o => ge(i, o, e, n),
        override: o => ge(i.override(o), t, e, n)
    };
    return new Proxy(s, {
        deleteProperty(o, r) {
            return delete o[r], delete i[r], !0;
        }, get(o, r, a) {
            return mo(o, r, () => fu(o, r, a));
        }, getOwnPropertyDescriptor(o, r) {
            return o._descriptors.allKeys ? Reflect.has(i, r) ? {
                enumerable: !0,
                configurable: !0
            } : void 0 : Reflect.getOwnPropertyDescriptor(i, r);
        }, getPrototypeOf() {
            return Reflect.getPrototypeOf(i);
        }, has(o, r) {
            return Reflect.has(i, r);
        }, ownKeys() {
            return Reflect.ownKeys(i);
        }, set(o, r, a) {
            return i[r] = a, delete o[r], !0;
        }
    });
}

function go(i, t = { scriptable: !0, indexable: !0 }) {
    const { _scriptable: e = t.scriptable, _indexable: n = t.indexable, _allKeys: s = t.allKeys } = i;
    return {
        allKeys: s,
        scriptable: e,
        indexable: n,
        isScriptable: Wt(e) ? e : () => e,
        isIndexable: Wt(n) ? n : () => n
    };
}

const lu = (i, t) => i ? i + Sn(t) : t, po = (i, t) => j(t) && i !== 'adapters';

function mo(i, t, e) {
    if (Object.prototype.hasOwnProperty.call(i, t)) return i[t];
    const n = e();
    return i[t] = n, n;
}

function fu(i, t, e) {
    const { _proxy: n, _context: s, _subProxy: o, _descriptors: r } = i;
    let a = n[t];
    return Wt(a) && r.isScriptable(t) && (a = hu(t, a, i, e)), Q(a) && a.length && (a = gu(t, a, i, r.isIndexable)), po(t, a) && (a = ge(a, s, o && o[t], r)), a;
}

function hu(i, t, e, n) {
    const { _proxy: s, _context: o, _subProxy: r, _stack: a } = e;
    if (a.has(i)) throw new Error('Recursion detected: ' + Array.from(a).join('->') + '->' + i);
    return a.add(i), t = t(o, r || n), a.delete(i), j(t) && (t = Nn(s._scopes, s, i, t)), t;
}

function gu(i, t, e, n) {
    const { _proxy: s, _context: o, _subProxy: r, _descriptors: a } = e;
    if (xt(o.index) && n(i)) t = t[o.index % t.length]; else if (j(t[0])) {
        const d = t, u = s._scopes.filter(l => l !== d);
        t = [];
        for (const l of d) {
            const h = Nn(u, s, i, l);
            t.push(ge(h, o, r && r[i], a));
        }
    }
    return t;
}

function bo(i, t, e) {
    return Wt(i) ? i(t, e) : i;
}

const pu = (i, t) => i === !0 ? t : typeof i == 'string' ? Xt(t, i) : void 0;

function mu(i, t, e, n) {
    for (const s of t) {
        const o = pu(e, s);
        if (o) {
            i.add(o);
            const r = bo(o._fallback, e, o);
            if (xt(r) && r !== e && r !== n) return r;
        } else if (o === !1 && xt(n) && e !== n) return null;
    }
    return !1;
}

function Nn(i, t, e, n) {
    const s = t._rootScopes, o = bo(t._fallback, e, n), r = [...i, ...s], a = new Set;
    a.add(n);
    let d = _o(a, r, e, o || e);
    return d === null || xt(o) && o !== e && (d = _o(a, r, o, d), d === null) ? !1 : zn(Array.from(a), [''], s, o, () => bu(t, e, n));
}

function _o(i, t, e, n) {
    for (; e;) e = mu(i, t, e, n);
    return e;
}

function bu(i, t, e) {
    const n = i._getTarget();
    t in n || (n[t] = {});
    const s = n[t];
    return Q(s) && j(e) ? e : s;
}

function _u(i, t, e, n) {
    let s;
    for (const o of t) if (s = xo(lu(o, i), e), xt(s)) return po(i, s) ? Nn(e, n, i, s) : s;
}

function xo(i, t) {
    for (const e of t) {
        if (!e) continue;
        const n = e[i];
        if (xt(n)) return n;
    }
}

function yo(i) {
    let t = i._keys;
    return t || (t = i._keys = xu(i._scopes)), t;
}

function xu(i) {
    const t = new Set;
    for (const e of i) for (const n of Object.keys(e).filter(s => !s.startsWith('_'))) t.add(n);
    return Array.from(t);
}

const yu = Number.EPSILON || 1e-14, pe = (i, t) => t < i.length && !i[t].skip && i[t], wo = i => i === 'x' ? 'y' : 'x';

function wu(i, t, e, n) {
    const s = i.skip ? t : i, o = t, r = e.skip ? t : e, a = Cn(o, s), d = Cn(r, o);
    let u = a / (a + d), l = d / (a + d);
    u = isNaN(u) ? 0 : u, l = isNaN(l) ? 0 : l;
    const h = n * u, g = n * l;
    return {
        previous: { x: o.x - h * (r.x - s.x), y: o.y - h * (r.y - s.y) },
        next: { x: o.x + g * (r.x - s.x), y: o.y + g * (r.y - s.y) }
    };
}

function vu(i, t, e) {
    const n = i.length;
    let s, o, r, a, d, u = pe(i, 0);
    for (let l = 0; l < n - 1; ++l) if (d = u, u = pe(i, l + 1), !(!d || !u)) {
        if (Pe(t[l], 0, yu)) {
            e[l] = e[l + 1] = 0;
            continue;
        }
        s = e[l] / t[l], o = e[l + 1] / t[l], a = Math.pow(s, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), e[l] = s * r * t[l], e[l + 1] = o * r * t[l]);
    }
}

function Mu(i, t, e = 'x') {
    const n = wo(e), s = i.length;
    let o, r, a, d = pe(i, 0);
    for (let u = 0; u < s; ++u) {
        if (r = a, a = d, d = pe(i, u + 1), !a) continue;
        const l = a[e], h = a[n];
        r && (o = (l - r[e]) / 3, a[`cp1${e}`] = l - o, a[`cp1${n}`] = h - o * t[u]), d && (o = (d[e] - l) / 3, a[`cp2${e}`] = l + o, a[`cp2${n}`] = h + o * t[u]);
    }
}

function ku(i, t = 'x') {
    const e = wo(t), n = i.length, s = Array(n).fill(0), o = Array(n);
    let r, a, d, u = pe(i, 0);
    for (r = 0; r < n; ++r) if (a = d, d = u, u = pe(i, r + 1), !!d) {
        if (u) {
            const l = u[t] - d[t];
            s[r] = l !== 0 ? (u[e] - d[e]) / l : 0;
        }
        o[r] = a ? u ? Et(s[r - 1]) !== Et(s[r]) ? 0 : (s[r - 1] + s[r]) / 2 : s[r - 1] : s[r];
    }
    vu(i, s, o), Mu(i, o, t);
}

function Di(i, t, e) {
    return Math.max(Math.min(i, e), t);
}

function Su(i, t) {
    let e, n, s, o, r, a = Kt(i[0], t);
    for (e = 0, n = i.length; e < n; ++e) r = o, o = a, a = e < n - 1 && Kt(i[e + 1], t), !!o && (s = i[e], r && (s.cp1x = Di(s.cp1x, t.left, t.right), s.cp1y = Di(s.cp1y, t.top, t.bottom)), a && (s.cp2x = Di(s.cp2x, t.left, t.right), s.cp2y = Di(s.cp2y, t.top, t.bottom)));
}

function Au(i, t, e, n, s) {
    let o, r, a, d;
    if (t.spanGaps && (i = i.filter(u => !u.skip)), t.cubicInterpolationMode === 'monotone') ku(i, s); else {
        let u = n ? i[i.length - 1] : i[0];
        for (o = 0, r = i.length; o < r; ++o) a = i[o], d = wu(u, a, i[Math.min(o + 1, r - (n ? 0 : 1)) % r], t.tension), a.cp1x = d.previous.x, a.cp1y = d.previous.y, a.cp2x = d.next.x, a.cp2y = d.next.y, u = a;
    }
    t.capBezierPoints && Su(i, e);
}

function vo() {
    return typeof window != 'undefined' && typeof document != 'undefined';
}

function Vn(i) {
    let t = i.parentNode;
    return t && t.toString() === '[object ShadowRoot]' && (t = t.host), t;
}

function Bi(i, t, e) {
    let n;
    return typeof i == 'string' ? (n = parseInt(i, 10), i.indexOf('%') !== -1 && (n = n / 100 * t.parentNode[e])) : n = i, n;
}

const Ti = i => window.getComputedStyle(i, null);

function Cu(i, t) {
    return Ti(i).getPropertyValue(t);
}

const Eu = ['top', 'right', 'bottom', 'left'];

function Jt(i, t, e) {
    const n = {};
    e = e ? '-' + e : '';
    for (let s = 0; s < 4; s++) {
        const o = Eu[s];
        n[o] = parseFloat(i[t + '-' + o + e]) || 0;
    }
    return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}

const Pu = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);

function Du(i, t) {
    const e = i.native || i, n = e.touches, s = n && n.length ? n[0] : e, { offsetX: o, offsetY: r } = s;
    let a = !1, d, u;
    if (Pu(o, r, e.target)) d = o, u = r; else {
        const l = t.getBoundingClientRect();
        d = s.clientX - l.left, u = s.clientY - l.top, a = !0;
    }
    return { x: d, y: u, box: a };
}

function Mo(i, t) {
    const { canvas: e, currentDevicePixelRatio: n } = t, s = Ti(e), o = s.boxSizing === 'border-box',
      r = Jt(s, 'padding'), a = Jt(s, 'border', 'width'), { x: d, y: u, box: l } = Du(i, e), h = r.left + (l && a.left),
      g = r.top + (l && a.top);
    let { width: m, height: b } = t;
    return o && (m -= r.width + a.width, b -= r.height + a.height), {
        x: Math.round((d - h) / m * e.width / n),
        y: Math.round((u - g) / b * e.height / n)
    };
}

function Bu(i, t, e) {
    let n, s;
    if (t === void 0 || e === void 0) {
        const o = Vn(i);
        if (!o) t = i.clientWidth, e = i.clientHeight; else {
            const r = o.getBoundingClientRect(), a = Ti(o), d = Jt(a, 'border', 'width'), u = Jt(a, 'padding');
            t = r.width - u.width - d.width, e = r.height - u.height - d.height, n = Bi(a.maxWidth, o, 'clientWidth'), s = Bi(a.maxHeight, o, 'clientHeight');
        }
    }
    return { width: t, height: e, maxWidth: n || bi, maxHeight: s || bi };
}

const Wn = i => Math.round(i * 10) / 10;

function Tu(i, t, e, n) {
    const s = Ti(i), o = Jt(s, 'margin'), r = Bi(s.maxWidth, i, 'clientWidth') || bi,
      a = Bi(s.maxHeight, i, 'clientHeight') || bi, d = Bu(i, t, e);
    let { width: u, height: l } = d;
    if (s.boxSizing === 'content-box') {
        const h = Jt(s, 'border', 'width'), g = Jt(s, 'padding');
        u -= g.width + h.width, l -= g.height + h.height;
    }
    return u = Math.max(0, u - o.width), l = Math.max(0, n ? Math.floor(u / n) : l - o.height), u = Wn(Math.min(u, r, d.maxWidth)), l = Wn(Math.min(l, a, d.maxHeight)), u && !l && (l = Wn(u / 2)), {
        width: u,
        height: l
    };
}

function ko(i, t, e) {
    const n = t || 1, s = Math.floor(i.height * n), o = Math.floor(i.width * n);
    i.height = s / n, i.width = o / n;
    const r = i.canvas;
    return r.style && (e || !r.style.height && !r.style.width) && (r.style.height = `${i.height}px`, r.style.width = `${i.width}px`), i.currentDevicePixelRatio !== n || r.height !== s || r.width !== o ? (i.currentDevicePixelRatio = n, r.height = s, r.width = o, i.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}

const Ou = function() {
    let i = !1;
    try {
        const t = {
            get passive() {
                return i = !0, !1;
            }
        };
        window.addEventListener('test', null, t), window.removeEventListener('test', null, t);
    } catch (t) {
    }
    return i;
}();

function So(i, t) {
    const e = Cu(i, t), n = e && e.match(/^(\d+)(\.\d+)?px$/);
    return n ? +n[1] : void 0;
}

function Qt(i, t, e, n) {
    return { x: i.x + e * (t.x - i.x), y: i.y + e * (t.y - i.y) };
}

function Ru(i, t, e, n) {
    return {
        x: i.x + e * (t.x - i.x),
        y: n === 'middle' ? e < .5 ? i.y : t.y : n === 'after' ? e < 1 ? i.y : t.y : e > 0 ? t.y : i.y
    };
}

function Fu(i, t, e, n) {
    const s = { x: i.cp2x, y: i.cp2y }, o = { x: t.cp1x, y: t.cp1y }, r = Qt(i, s, e), a = Qt(s, o, e), d = Qt(o, t, e),
      u = Qt(r, a, e), l = Qt(a, d, e);
    return Qt(u, l, e);
}

const Ao = new Map;

function Lu(i, t) {
    t = t || {};
    const e = i + JSON.stringify(t);
    let n = Ao.get(e);
    return n || (n = new Intl.NumberFormat(i, t), Ao.set(e, n)), n;
}

function Le(i, t, e) {
    return Lu(t, e).format(i);
}

const Iu = function(i, t) {
    return {
        x(e) {
            return i + i + t - e;
        }, setWidth(e) {
            t = e;
        }, textAlign(e) {
            return e === 'center' ? e : e === 'right' ? 'left' : 'right';
        }, xPlus(e, n) {
            return e - n;
        }, leftForLtr(e, n) {
            return e - n;
        }
    };
}, zu = function() {
    return {
        x(i) {
            return i;
        }, setWidth(i) {
        }, textAlign(i) {
            return i;
        }, xPlus(i, t) {
            return i + t;
        }, leftForLtr(i, t) {
            return i;
        }
    };
};

function me(i, t, e) {
    return i ? Iu(t, e) : zu();
}

function Co(i, t) {
    let e, n;
    (t === 'ltr' || t === 'rtl') && (e = i.canvas.style, n = [e.getPropertyValue('direction'), e.getPropertyPriority('direction')], e.setProperty('direction', t, 'important'), i.prevTextDirection = n);
}

function Eo(i, t) {
    t !== void 0 && (delete i.prevTextDirection, i.canvas.style.setProperty('direction', t[0], t[1]));
}

function Po(i) {
    return i === 'angle' ? {
        between: _i,
        compare: Pd,
        normalize: kt
    } : {
        between: (t, e, n) => t >= Math.min(e, n) && t <= Math.max(n, e),
        compare: (t, e) => t - e,
        normalize: t => t
    };
}

function Do({ start: i, end: t, count: e, loop: n, style: s }) {
    return { start: i % e, end: t % e, loop: n && (t - i + 1) % e == 0, style: s };
}

function Nu(i, t, e) {
    const { property: n, start: s, end: o } = e, { between: r, normalize: a } = Po(n), d = t.length;
    let { start: u, end: l, loop: h } = i, g, m;
    if (h) {
        for (u += d, l += d, g = 0, m = d; g < m && r(a(t[u % d][n]), s, o); ++g) u--, l--;
        u %= d, l %= d;
    }
    return l < u && (l += d), { start: u, end: l, loop: h, style: i.style };
}

function Bo(i, t, e) {
    if (!e) return [i];
    const { property: n, start: s, end: o } = e, r = t.length, {
        compare: a,
        between: d,
        normalize: u
    } = Po(n), { start: l, end: h, loop: g, style: m } = Nu(i, t, e), b = [];
    let x = !1, y = null, v, E, B;
    const T = () => d(s, B, v) && a(s, B) !== 0, D = () => a(o, v) === 0 || d(o, B, v), O = () => x || T(),
      S = () => !x || D();
    for (let C = l, R = l; C <= h; ++C) E = t[C % r], !E.skip && (v = u(E[n]), v !== B && (x = d(v, s, o), y === null && O() && (y = a(v, s) === 0 ? C : R), y !== null && S() && (b.push(Do({
        start: y,
        end: C,
        loop: g,
        count: r,
        style: m
    })), y = null), R = C, B = v));
    return y !== null && b.push(Do({ start: y, end: h, loop: g, count: r, style: m })), b;
}

function To(i, t) {
    const e = [], n = i.segments;
    for (let s = 0; s < n.length; s++) {
        const o = Bo(n[s], i.points, t);
        o.length && e.push(...o);
    }
    return e;
}

function Vu(i, t, e, n) {
    let s = 0, o = t - 1;
    if (e && !n) for (; s < t && !i[s].skip;) s++;
    for (; s < t && i[s].skip;) s++;
    for (s %= t, e && (o += s); o > s && i[o % t].skip;) o--;
    return o %= t, { start: s, end: o };
}

function Wu(i, t, e, n) {
    const s = i.length, o = [];
    let r = t, a = i[t], d;
    for (d = t + 1; d <= e; ++d) {
        const u = i[d % s];
        u.skip || u.stop ? a.skip || (n = !1, o.push({
            start: t % s,
            end: (d - 1) % s,
            loop: n
        }), t = r = u.stop ? d : null) : (r = d, a.skip && (t = d)), a = u;
    }
    return r !== null && o.push({ start: t % s, end: r % s, loop: n }), o;
}

function Hu(i, t) {
    const e = i.points, n = i.options.spanGaps, s = e.length;
    if (!s) return [];
    const o = !!i._loop, { start: r, end: a } = Vu(e, s, o, n);
    if (n === !0) return Oo(i, [{ start: r, end: a, loop: o }], e, t);
    const d = a < r ? a + s : a, u = !!i._fullLoop && r === 0 && a === s - 1;
    return Oo(i, Wu(e, r, d, u), e, t);
}

function Oo(i, t, e, n) {
    return !n || !n.setContext || !e ? t : ju(i, t, e, n);
}

function ju(i, t, e, n) {
    const s = i._chart.getContext(), o = Ro(i.options), { _datasetIndex: r, options: { spanGaps: a } } = i,
      d = e.length, u = [];
    let l = o, h = t[0].start, g = h;

    function m(b, x, y, v) {
        const E = a ? -1 : 1;
        if (b !== x) {
            for (b += d; e[b % d].skip;) b -= E;
            for (; e[x % d].skip;) x += E;
            b % d != x % d && (u.push({ start: b % d, end: x % d, loop: y, style: v }), l = v, h = x % d);
        }
    }

    for (const b of t) {
        h = a ? h : b.start;
        let x = e[h % d], y;
        for (g = h + 1; g <= b.end; g++) {
            const v = e[g % d];
            y = Ro(n.setContext(Ht(s, {
                type: 'segment',
                p0: x,
                p1: v,
                p0DataIndex: (g - 1) % d,
                p1DataIndex: g % d,
                datasetIndex: r
            }))), Uu(y, l) && m(h, g - 1, b.loop, l), x = v, l = y;
        }
        h < g - 1 && m(h, g - 1, b.loop, l);
    }
    return u;
}

function Ro(i) {
    return {
        backgroundColor: i.backgroundColor,
        borderCapStyle: i.borderCapStyle,
        borderDash: i.borderDash,
        borderDashOffset: i.borderDashOffset,
        borderJoinStyle: i.borderJoinStyle,
        borderWidth: i.borderWidth,
        borderColor: i.borderColor
    };
}

function Uu(i, t) {
    return t && JSON.stringify(i) !== JSON.stringify(t);
}/*!
 * Chart.js v3.6.0
 * https://www.chartjs.org
 * (c) 2021 Chart.js Contributors
 * Released under the MIT License
 */
class $u {
    constructor() {
        this._request = null, this._charts = new Map, this._running = !1, this._lastDate = void 0;
    }

    _notify(t, e, n, s) {
        const o = e.listeners[s], r = e.duration;
        o.forEach(a => a({ chart: t, initial: e.initial, numSteps: r, currentStep: Math.min(n - e.start, r) }));
    }

    _refresh() {
        this._request || (this._running = !0, this._request = Ws.call(window, () => {
            this._update(), this._request = null, this._running && this._refresh();
        }));
    }

    _update(t = Date.now()) {
        let e = 0;
        this._charts.forEach((n, s) => {
            if (!n.running || !n.items.length) return;
            const o = n.items;
            let r = o.length - 1, a = !1, d;
            for (; r >= 0; --r) d = o[r], d._active ? (d._total > n.duration && (n.duration = d._total), d.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
            a && (s.draw(), this._notify(s, n, t, 'progress')), o.length || (n.running = !1, this._notify(s, n, t, 'complete'), n.initial = !1), e += o.length;
        }), this._lastDate = t, e === 0 && (this._running = !1);
    }

    _getAnims(t) {
        const e = this._charts;
        let n = e.get(t);
        return n || (n = {
            running: !1,
            initial: !0,
            items: [],
            listeners: { complete: [], progress: [] }
        }, e.set(t, n)), n;
    }

    listen(t, e, n) {
        this._getAnims(t).listeners[e].push(n);
    }

    add(t, e) {
        !e || !e.length || this._getAnims(t).items.push(...e);
    }

    has(t) {
        return this._getAnims(t).items.length > 0;
    }

    start(t) {
        const e = this._charts.get(t);
        !e || (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((n, s) => Math.max(n, s._duration), 0), this._refresh());
    }

    running(t) {
        if (!this._running) return !1;
        const e = this._charts.get(t);
        return !(!e || !e.running || !e.items.length);
    }

    stop(t) {
        const e = this._charts.get(t);
        if (!e || !e.items.length) return;
        const n = e.items;
        let s = n.length - 1;
        for (; s >= 0; --s) n[s].cancel();
        e.items = [], this._notify(t, e, Date.now(), 'complete');
    }

    remove(t) {
        return this._charts.delete(t);
    }
}

var Rt = new $u;
const Fo = 'transparent', Yu = {
    boolean(i, t, e) {
        return e > .5 ? t : i;
    }, color(i, t, e) {
        const n = ao(i || Fo), s = n.valid && ao(t || Fo);
        return s && s.valid ? s.mix(n, e).hexString() : t;
    }, number(i, t, e) {
        return i + (t - i) * e;
    }
};

class Xu {
    constructor(t, e, n, s) {
        const o = e[n];
        s = Fe([t.to, s, o, t.from]);
        const r = Fe([t.from, o, s]);
        this._active = !0, this._fn = t.fn || Yu[t.type || typeof r], this._easing = De[t.easing] || De.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = n, this._from = r, this._to = s, this._promises = void 0;
    }

    active() {
        return this._active;
    }

    update(t, e, n) {
        if (this._active) {
            this._notify(!1);
            const s = this._target[this._prop], o = n - this._start, r = this._duration - o;
            this._start = n, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Fe([t.to, e, s, t.from]), this._from = Fe([t.from, s, e]);
        }
    }

    cancel() {
        this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
    }

    tick(t) {
        const e = t - this._start, n = this._duration, s = this._prop, o = this._from, r = this._loop, a = this._to;
        let d;
        if (this._active = o !== a && (r || e < n), !this._active) {
            this._target[s] = a, this._notify(!0);
            return;
        }
        if (e < 0) {
            this._target[s] = o;
            return;
        }
        d = e / n % 2, d = r && d > 1 ? 2 - d : d, d = this._easing(Math.min(1, Math.max(0, d))), this._target[s] = this._fn(o, a, d);
    }

    wait() {
        const t = this._promises || (this._promises = []);
        return new Promise((e, n) => {
            t.push({ res: e, rej: n });
        });
    }

    _notify(t) {
        const e = t ? 'res' : 'rej', n = this._promises || [];
        for (let s = 0; s < n.length; s++) n[s][e]();
    }
}

const qu = ['x', 'y', 'borderWidth', 'radius', 'tension'], Gu = ['color', 'borderColor', 'backgroundColor'];
$.set('animation', {
    delay: void 0,
    duration: 1e3,
    easing: 'easeOutQuart',
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
});
const Ku = Object.keys($.animation);
$.describe('animation', {
    _fallback: !1,
    _indexable: !1,
    _scriptable: i => i !== 'onProgress' && i !== 'onComplete' && i !== 'fn'
}), $.set('animations', {
    colors: { type: 'color', properties: Gu },
    numbers: { type: 'number', properties: qu }
}), $.describe('animations', { _fallback: 'animation' }), $.set('transitions', {
    active: { animation: { duration: 400 } },
    resize: { animation: { duration: 0 } },
    show: { animations: { colors: { from: 'transparent' }, visible: { type: 'boolean', duration: 0 } } },
    hide: {
        animations: {
            colors: { to: 'transparent' },
            visible: { type: 'boolean', easing: 'linear', fn: i => i | 0 }
        }
    }
});

class Lo {
    constructor(t, e) {
        this._chart = t, this._properties = new Map, this.configure(e);
    }

    configure(t) {
        if (!j(t)) return;
        const e = this._properties;
        Object.getOwnPropertyNames(t).forEach(n => {
            const s = t[n];
            if (!j(s)) return;
            const o = {};
            for (const r of Ku) o[r] = s[r];
            (Q(s.properties) && s.properties || [n]).forEach(r => {
                (r === n || !e.has(r)) && e.set(r, o);
            });
        });
    }

    _animateOptions(t, e) {
        const n = e.options, s = Ju(t, n);
        if (!s) return [];
        const o = this._createAnimations(s, n);
        return n.$shared && Zu(t.options.$animations, n).then(() => {
            t.options = n;
        }, () => {
        }), o;
    }

    _createAnimations(t, e) {
        const n = this._properties, s = [], o = t.$animations || (t.$animations = {}), r = Object.keys(e),
          a = Date.now();
        let d;
        for (d = r.length - 1; d >= 0; --d) {
            const u = r[d];
            if (u.charAt(0) === '$') continue;
            if (u === 'options') {
                s.push(...this._animateOptions(t, e));
                continue;
            }
            const l = e[u];
            let h = o[u];
            const g = n.get(u);
            if (h) if (g && h.active()) {
                h.update(g, l, a);
                continue;
            } else h.cancel();
            if (!g || !g.duration) {
                t[u] = l;
                continue;
            }
            o[u] = h = new Xu(g, t, u, l), s.push(h);
        }
        return s;
    }

    update(t, e) {
        if (this._properties.size === 0) {
            Object.assign(t, e);
            return;
        }
        const n = this._createAnimations(t, e);
        if (n.length) return Rt.add(this._chart, n), !0;
    }
}

function Zu(i, t) {
    const e = [], n = Object.keys(t);
    for (let s = 0; s < n.length; s++) {
        const o = i[n[s]];
        o && o.active() && e.push(o.wait());
    }
    return Promise.all(e);
}

function Ju(i, t) {
    if (!t) return;
    let e = i.options;
    if (!e) {
        i.options = t;
        return;
    }
    return e.$shared && (i.options = e = Object.assign({}, e, { $shared: !1, $animations: {} })), e;
}

function Io(i, t) {
    const e = i && i.options || {}, n = e.reverse, s = e.min === void 0 ? t : 0, o = e.max === void 0 ? t : 0;
    return { start: n ? o : s, end: n ? s : o };
}

function Qu(i, t, e) {
    if (e === !1) return !1;
    const n = Io(i, e), s = Io(t, e);
    return { top: s.end, right: n.end, bottom: s.start, left: n.start };
}

function tc(i) {
    let t, e, n, s;
    return j(i) ? (t = i.top, e = i.right, n = i.bottom, s = i.left) : t = e = n = s = i, {
        top: t,
        right: e,
        bottom: n,
        left: s,
        disabled: i === !1
    };
}

function zo(i, t) {
    const e = [], n = i._getSortedDatasetMetas(t);
    let s, o;
    for (s = 0, o = n.length; s < o; ++s) e.push(n[s].index);
    return e;
}

function No(i, t, e, n = {}) {
    const s = i.keys, o = n.mode === 'single';
    let r, a, d, u;
    if (t !== null) {
        for (r = 0, a = s.length; r < a; ++r) {
            if (d = +s[r], d === e) {
                if (n.all) continue;
                break;
            }
            u = i.values[d], rt(u) && (o || t === 0 || Et(t) === Et(u)) && (t += u);
        }
        return t;
    }
}

function ec(i) {
    const t = Object.keys(i), e = new Array(t.length);
    let n, s, o;
    for (n = 0, s = t.length; n < s; ++n) o = t[n], e[n] = { x: o, y: i[o] };
    return e;
}

function Vo(i, t) {
    const e = i && i.options.stacked;
    return e || e === void 0 && t.stack !== void 0;
}

function ic(i, t, e) {
    return `${i.id}.${t.id}.${e.stack || e.type}`;
}

function nc(i) {
    const { min: t, max: e, minDefined: n, maxDefined: s } = i.getUserBounds();
    return { min: n ? t : Number.NEGATIVE_INFINITY, max: s ? e : Number.POSITIVE_INFINITY };
}

function sc(i, t, e) {
    const n = i[t] || (i[t] = {});
    return n[e] || (n[e] = {});
}

function Wo(i, t, e, n) {
    for (const s of t.getMatchingVisibleMetas(n).reverse()) {
        const o = i[s.index];
        if (e && o > 0 || !e && o < 0) return s.index;
    }
    return null;
}

function Ho(i, t) {
    const { chart: e, _cachedMeta: n } = i, s = e._stacks || (e._stacks = {}), { iScale: o, vScale: r, index: a } = n,
      d = o.axis, u = r.axis, l = ic(o, r, n), h = t.length;
    let g;
    for (let m = 0; m < h; ++m) {
        const b = t[m], { [d]: x, [u]: y } = b, v = b._stacks || (b._stacks = {});
        g = v[u] = sc(s, l, x), g[a] = y, g._top = Wo(g, r, !0, n.type), g._bottom = Wo(g, r, !1, n.type);
    }
}

function Hn(i, t) {
    const e = i.scales;
    return Object.keys(e).filter(n => e[n].axis === t).shift();
}

function oc(i, t) {
    return Ht(i, { active: !1, dataset: void 0, datasetIndex: t, index: t, mode: 'default', type: 'dataset' });
}

function rc(i, t, e) {
    return Ht(i, {
        active: !1,
        dataIndex: t,
        parsed: void 0,
        raw: void 0,
        element: e,
        index: t,
        mode: 'default',
        type: 'data'
    });
}

function Ie(i, t) {
    const e = i.controller.index, n = i.vScale && i.vScale.axis;
    if (!!n) {
        t = t || i._parsed;
        for (const s of t) {
            const o = s._stacks;
            if (!o || o[n] === void 0 || o[n][e] === void 0) return;
            delete o[n][e];
        }
    }
}

const jn = i => i === 'reset' || i === 'none', jo = (i, t) => t ? i : Object.assign({}, i),
  ac = (i, t, e) => i && !t.hidden && t._stacked && { keys: zo(e, !0), values: null };

class Pt {
    constructor(t, e) {
        this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.$context = void 0, this._syncList = [], this.initialize();
    }

    initialize() {
        const t = this._cachedMeta;
        this.configure(), this.linkScales(), t._stacked = Vo(t.vScale, t), this.addElements();
    }

    updateIndex(t) {
        this.index !== t && Ie(this._cachedMeta), this.index = t;
    }

    linkScales() {
        const t = this.chart, e = this._cachedMeta, n = this.getDataset(),
          s = (h, g, m, b) => h === 'x' ? g : h === 'r' ? b : m, o = e.xAxisID = V(n.xAxisID, Hn(t, 'x')),
          r = e.yAxisID = V(n.yAxisID, Hn(t, 'y')), a = e.rAxisID = V(n.rAxisID, Hn(t, 'r')), d = e.indexAxis,
          u = e.iAxisID = s(d, o, r, a), l = e.vAxisID = s(d, r, o, a);
        e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(r), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(u), e.vScale = this.getScaleForId(l);
    }

    getDataset() {
        return this.chart.data.datasets[this.index];
    }

    getMeta() {
        return this.chart.getDatasetMeta(this.index);
    }

    getScaleForId(t) {
        return this.chart.scales[t];
    }

    _getOtherScale(t) {
        const e = this._cachedMeta;
        return t === e.iScale ? e.vScale : e.iScale;
    }

    reset() {
        this._update('reset');
    }

    _destroy() {
        const t = this._cachedMeta;
        this._data && fo(this._data, this), t._stacked && Ie(t);
    }

    _dataCheck() {
        const t = this.getDataset(), e = t.data || (t.data = []), n = this._data;
        if (j(e)) this._data = ec(e); else if (n !== e) {
            if (n) {
                fo(n, this);
                const s = this._cachedMeta;
                Ie(s), s._parsed = [];
            }
            e && Object.isExtensible(e) && cu(e, this), this._syncList = [], this._data = e;
        }
    }

    addElements() {
        const t = this._cachedMeta;
        this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType);
    }

    buildOrUpdateElements(t) {
        const e = this._cachedMeta, n = this.getDataset();
        let s = !1;
        this._dataCheck();
        const o = e._stacked;
        e._stacked = Vo(e.vScale, e), e.stack !== n.stack && (s = !0, Ie(e), e.stack = n.stack), this._resyncElements(t), (s || o !== e._stacked) && Ho(this, e._parsed);
    }

    configure() {
        const t = this.chart.config, e = t.datasetScopeKeys(this._type),
          n = t.getOptionScopes(this.getDataset(), e, !0);
        this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing;
    }

    parse(t, e) {
        const { _cachedMeta: n, _data: s } = this, { iScale: o, _stacked: r } = n, a = o.axis;
        let d = t === 0 && e === s.length ? !0 : n._sorted, u = t > 0 && n._parsed[t - 1], l, h, g;
        if (this._parsing === !1) n._parsed = s, n._sorted = !0, g = s; else {
            Q(s[t]) ? g = this.parseArrayData(n, s, t, e) : j(s[t]) ? g = this.parseObjectData(n, s, t, e) : g = this.parsePrimitiveData(n, s, t, e);
            const m = () => h[a] === null || u && h[a] < u[a];
            for (l = 0; l < e; ++l) n._parsed[l + t] = h = g[l], d && (m() && (d = !1), u = h);
            n._sorted = d;
        }
        r && Ho(this, g);
    }

    parsePrimitiveData(t, e, n, s) {
        const { iScale: o, vScale: r } = t, a = o.axis, d = r.axis, u = o.getLabels(), l = o === r, h = new Array(s);
        let g, m, b;
        for (g = 0, m = s; g < m; ++g) b = g + n, h[g] = { [a]: l || o.parse(u[b], b), [d]: r.parse(e[b], b) };
        return h;
    }

    parseArrayData(t, e, n, s) {
        const { xScale: o, yScale: r } = t, a = new Array(s);
        let d, u, l, h;
        for (d = 0, u = s; d < u; ++d) l = d + n, h = e[l], a[d] = { x: o.parse(h[0], l), y: r.parse(h[1], l) };
        return a;
    }

    parseObjectData(t, e, n, s) {
        const { xScale: o, yScale: r } = t, { xAxisKey: a = 'x', yAxisKey: d = 'y' } = this._parsing, u = new Array(s);
        let l, h, g, m;
        for (l = 0, h = s; l < h; ++l) g = l + n, m = e[g], u[l] = { x: o.parse(Xt(m, a), g), y: r.parse(Xt(m, d), g) };
        return u;
    }

    getParsed(t) {
        return this._cachedMeta._parsed[t];
    }

    getDataElement(t) {
        return this._cachedMeta.data[t];
    }

    applyStack(t, e, n) {
        const s = this.chart, o = this._cachedMeta, r = e[t.axis], a = { keys: zo(s, !0), values: e._stacks[t.axis] };
        return No(a, r, o.index, { mode: n });
    }

    updateRangeFromParsed(t, e, n, s) {
        const o = n[e.axis];
        let r = o === null ? NaN : o;
        const a = s && n._stacks[e.axis];
        s && a && (s.values = a, r = No(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r);
    }

    getMinMax(t, e) {
        const n = this._cachedMeta, s = n._parsed, o = n._sorted && t === n.iScale, r = s.length,
          a = this._getOtherScale(t), d = ac(e, n, this.chart),
          u = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }, { min: l, max: h } = nc(a);
        let g, m;

        function b() {
            m = s[g];
            const x = m[a.axis];
            return !rt(m[t.axis]) || l > x || h < x;
        }

        for (g = 0; g < r && !(!b() && (this.updateRangeFromParsed(u, t, m, d), o)); ++g) ;
        if (o) {
            for (g = r - 1; g >= 0; --g) if (!b()) {
                this.updateRangeFromParsed(u, t, m, d);
                break;
            }
        }
        return u;
    }

    getAllParsedValues(t) {
        const e = this._cachedMeta._parsed, n = [];
        let s, o, r;
        for (s = 0, o = e.length; s < o; ++s) r = e[s][t.axis], rt(r) && n.push(r);
        return n;
    }

    getMaxOverflow() {
        return !1;
    }

    getLabelAndValue(t) {
        const e = this._cachedMeta, n = e.iScale, s = e.vScale, o = this.getParsed(t);
        return {
            label: n ? '' + n.getLabelForValue(o[n.axis]) : '',
            value: s ? '' + s.getLabelForValue(o[s.axis]) : ''
        };
    }

    _update(t) {
        const e = this._cachedMeta;
        this.configure(), this._cachedDataOpts = {}, this.update(t || 'default'), e._clip = tc(V(this.options.clip, Qu(e.xScale, e.yScale, this.getMaxOverflow())));
    }

    update(t) {
    }

    draw() {
        const t = this._ctx, e = this.chart, n = this._cachedMeta, s = n.data || [], o = e.chartArea, r = [],
          a = this._drawStart || 0, d = this._drawCount || s.length - a;
        let u;
        for (n.dataset && n.dataset.draw(t, o, a, d), u = a; u < a + d; ++u) {
            const l = s[u];
            l.hidden || (l.active ? r.push(l) : l.draw(t, o));
        }
        for (u = 0; u < r.length; ++u) r[u].draw(t, o);
    }

    getStyle(t, e) {
        const n = e ? 'active' : 'default';
        return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n);
    }

    getContext(t, e, n) {
        const s = this.getDataset();
        let o;
        if (t >= 0 && t < this._cachedMeta.data.length) {
            const r = this._cachedMeta.data[t];
            o = r.$context || (r.$context = rc(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
        } else o = this.$context || (this.$context = oc(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
        return o.active = !!e, o.mode = n, o;
    }

    resolveDatasetElementOptions(t) {
        return this._resolveElementOptions(this.datasetElementType.id, t);
    }

    resolveDataElementOptions(t, e) {
        return this._resolveElementOptions(this.dataElementType.id, e, t);
    }

    _resolveElementOptions(t, e = 'default', n) {
        const s = e === 'active', o = this._cachedDataOpts, r = t + '-' + e, a = o[r],
          d = this.enableOptionSharing && xt(n);
        if (a) return jo(a, d);
        const u = this.chart.config, l = u.datasetElementScopeKeys(this._type, t),
          h = s ? [`${t}Hover`, 'hover', t, ''] : [t, ''], g = u.getOptionScopes(this.getDataset(), l),
          m = Object.keys($.elements[t]), b = () => this.getContext(n, s), x = u.resolveNamedOptions(g, m, b, h);
        return x.$shared && (x.$shared = d, o[r] = Object.freeze(jo(x, d))), x;
    }

    _resolveAnimations(t, e, n) {
        const s = this.chart, o = this._cachedDataOpts, r = `animation-${e}`, a = o[r];
        if (a) return a;
        let d;
        if (s.options.animation !== !1) {
            const l = this.chart.config, h = l.datasetAnimationScopeKeys(this._type, e),
              g = l.getOptionScopes(this.getDataset(), h);
            d = l.createResolver(g, this.getContext(t, n, e));
        }
        const u = new Lo(s, d && d.animations);
        return d && d._cacheable && (o[r] = Object.freeze(u)), u;
    }

    getSharedOptions(t) {
        if (!!t.$shared) return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
    }

    includeOptions(t, e) {
        return !e || jn(t) || this.chart._animationsDisabled;
    }

    updateElement(t, e, n, s) {
        jn(s) ? Object.assign(t, n) : this._resolveAnimations(e, s).update(t, n);
    }

    updateSharedOptions(t, e, n) {
        t && !jn(e) && this._resolveAnimations(void 0, e).update(t, n);
    }

    _setStyle(t, e, n, s) {
        t.active = s;
        const o = this.getStyle(e, s);
        this._resolveAnimations(e, n, s).update(t, { options: !s && this.getSharedOptions(o) || o });
    }

    removeHoverStyle(t, e, n) {
        this._setStyle(t, n, 'active', !1);
    }

    setHoverStyle(t, e, n) {
        this._setStyle(t, n, 'active', !0);
    }

    _removeDatasetHoverStyle() {
        const t = this._cachedMeta.dataset;
        t && this._setStyle(t, void 0, 'active', !1);
    }

    _setDatasetHoverStyle() {
        const t = this._cachedMeta.dataset;
        t && this._setStyle(t, void 0, 'active', !0);
    }

    _resyncElements(t) {
        const e = this._data, n = this._cachedMeta.data;
        for (const [a, d, u] of this._syncList) this[a](d, u);
        this._syncList = [];
        const s = n.length, o = e.length, r = Math.min(o, s);
        r && this.parse(0, r), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
    }

    _insertElements(t, e, n = !0) {
        const s = this._cachedMeta, o = s.data, r = t + e;
        let a;
        const d = u => {
            for (u.length += e, a = u.length - 1; a >= r; a--) u[a] = u[a - e];
        };
        for (d(o), a = t; a < r; ++a) o[a] = new this.dataElementType;
        this._parsing && d(s._parsed), this.parse(t, e), n && this.updateElements(o, t, e, 'reset');
    }

    updateElements(t, e, n, s) {
    }

    _removeElements(t, e) {
        const n = this._cachedMeta;
        if (this._parsing) {
            const s = n._parsed.splice(t, e);
            n._stacked && Ie(n, s);
        }
        n.data.splice(t, e);
    }

    _sync(t) {
        if (this._parsing) this._syncList.push(t); else {
            const [e, n, s] = t;
            this[e](n, s);
        }
    }

    _onDataPush() {
        const t = arguments.length;
        this._sync(['_insertElements', this.getDataset().data.length - t, t]);
    }

    _onDataPop() {
        this._sync(['_removeElements', this._cachedMeta.data.length - 1, 1]);
    }

    _onDataShift() {
        this._sync(['_removeElements', 0, 1]);
    }

    _onDataSplice(t, e) {
        this._sync(['_removeElements', t, e]), this._sync(['_insertElements', t, arguments.length - 2]);
    }

    _onDataUnshift() {
        this._sync(['_insertElements', 0, arguments.length]);
    }
}

Pt.defaults = {}, Pt.prototype.datasetElementType = null, Pt.prototype.dataElementType = null;

function dc(i, t) {
    if (!i._cache.$bar) {
        const e = i.getMatchingVisibleMetas(t);
        let n = [];
        for (let s = 0, o = e.length; s < o; s++) n = n.concat(e[s].controller.getAllParsedValues(i));
        i._cache.$bar = ho(n.sort((s, o) => s - o));
    }
    return i._cache.$bar;
}

function uc(i) {
    const t = i.iScale, e = dc(t, i.type);
    let n = t._length, s, o, r, a;
    const d = () => {
        r === 32767 || r === -32768 || (xt(a) && (n = Math.min(n, Math.abs(r - a) || n)), a = r);
    };
    for (s = 0, o = e.length; s < o; ++s) r = t.getPixelForValue(e[s]), d();
    for (a = void 0, s = 0, o = t.ticks.length; s < o; ++s) r = t.getPixelForTick(s), d();
    return n;
}

function cc(i, t, e, n) {
    const s = e.barThickness;
    let o, r;
    return X(s) ? (o = t.min * e.categoryPercentage, r = e.barPercentage) : (o = s * n, r = 1), {
        chunk: o / n,
        ratio: r,
        start: t.pixels[i] - o / 2
    };
}

function lc(i, t, e, n) {
    const s = t.pixels, o = s[i];
    let r = i > 0 ? s[i - 1] : null, a = i < s.length - 1 ? s[i + 1] : null;
    const d = e.categoryPercentage;
    r === null && (r = o - (a === null ? t.end - t.start : a - o)), a === null && (a = o + o - r);
    const u = o - (o - Math.min(r, a)) / 2 * d;
    return { chunk: Math.abs(a - r) / 2 * d / n, ratio: e.barPercentage, start: u };
}

function fc(i, t, e, n) {
    const s = e.parse(i[0], n), o = e.parse(i[1], n), r = Math.min(s, o), a = Math.max(s, o);
    let d = r, u = a;
    Math.abs(r) > Math.abs(a) && (d = a, u = r), t[e.axis] = u, t._custom = {
        barStart: d,
        barEnd: u,
        start: s,
        end: o,
        min: r,
        max: a
    };
}

function Uo(i, t, e, n) {
    return Q(i) ? fc(i, t, e, n) : t[e.axis] = e.parse(i, n), t;
}

function $o(i, t, e, n) {
    const s = i.iScale, o = i.vScale, r = s.getLabels(), a = s === o, d = [];
    let u, l, h, g;
    for (u = e, l = e + n; u < l; ++u) g = t[u], h = {}, h[s.axis] = a || s.parse(r[u], u), d.push(Uo(g, h, o, u));
    return d;
}

function Un(i) {
    return i && i.barStart !== void 0 && i.barEnd !== void 0;
}

function hc(i, t, e) {
    return i !== 0 ? Et(i) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}

function gc(i) {
    let t, e, n, s, o;
    return i.horizontal ? (t = i.base > i.x, e = 'left', n = 'right') : (t = i.base < i.y, e = 'bottom', n = 'top'), t ? (s = 'end', o = 'start') : (s = 'start', o = 'end'), {
        start: e,
        end: n,
        reverse: t,
        top: s,
        bottom: o
    };
}

function pc(i, t, e, n) {
    let s = t.borderSkipped;
    const o = {};
    if (!s) {
        i.borderSkipped = o;
        return;
    }
    const { start: r, end: a, reverse: d, top: u, bottom: l } = gc(i);
    s === 'middle' && e && (i.enableBorderRadius = !0, (e._top || 0) === n ? s = u : (e._bottom || 0) === n ? s = l : (o[Yo(l, r, a, d)] = !0, s = u)), o[Yo(s, r, a, d)] = !0, i.borderSkipped = o;
}

function Yo(i, t, e, n) {
    return n ? (i = mc(i, t, e), i = Xo(i, e, t)) : i = Xo(i, t, e), i;
}

function mc(i, t, e) {
    return i === t ? e : i === e ? t : i;
}

function Xo(i, t, e) {
    return i === 'start' ? t : i === 'end' ? e : i;
}

function bc(i, { inflateAmount: t }, e) {
    i.inflateAmount = t === 'auto' ? e === 1 ? .33 : 0 : t;
}

class Oi extends Pt {
    parsePrimitiveData(t, e, n, s) {
        return $o(t, e, n, s);
    }

    parseArrayData(t, e, n, s) {
        return $o(t, e, n, s);
    }

    parseObjectData(t, e, n, s) {
        const { iScale: o, vScale: r } = t, { xAxisKey: a = 'x', yAxisKey: d = 'y' } = this._parsing,
          u = o.axis === 'x' ? a : d, l = r.axis === 'x' ? a : d, h = [];
        let g, m, b, x;
        for (g = n, m = n + s; g < m; ++g) x = e[g], b = {}, b[o.axis] = o.parse(Xt(x, u), g), h.push(Uo(Xt(x, l), b, r, g));
        return h;
    }

    updateRangeFromParsed(t, e, n, s) {
        super.updateRangeFromParsed(t, e, n, s);
        const o = n._custom;
        o && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
    }

    getMaxOverflow() {
        return 0;
    }

    getLabelAndValue(t) {
        const e = this._cachedMeta, { iScale: n, vScale: s } = e, o = this.getParsed(t), r = o._custom,
          a = Un(r) ? '[' + r.start + ', ' + r.end + ']' : '' + s.getLabelForValue(o[s.axis]);
        return { label: '' + n.getLabelForValue(o[n.axis]), value: a };
    }

    initialize() {
        this.enableOptionSharing = !0, super.initialize();
        const t = this._cachedMeta;
        t.stack = this.getDataset().stack;
    }

    update(t) {
        const e = this._cachedMeta;
        this.updateElements(e.data, 0, e.data.length, t);
    }

    updateElements(t, e, n, s) {
        const o = s === 'reset', { index: r, _cachedMeta: { vScale: a } } = this, d = a.getBasePixel(),
          u = a.isHorizontal(), l = this._getRuler(), h = this.resolveDataElementOptions(e, s),
          g = this.getSharedOptions(h), m = this.includeOptions(s, g);
        this.updateSharedOptions(g, s, h);
        for (let b = e; b < e + n; b++) {
            const x = this.getParsed(b),
              y = o || X(x[a.axis]) ? { base: d, head: d } : this._calculateBarValuePixels(b),
              v = this._calculateBarIndexPixels(b, l), E = (x._stacks || {})[a.axis], B = {
                  horizontal: u,
                  base: y.base,
                  enableBorderRadius: !E || Un(x._custom) || r === E._top || r === E._bottom,
                  x: u ? y.head : v.center,
                  y: u ? v.center : y.head,
                  height: u ? v.size : Math.abs(y.size),
                  width: u ? Math.abs(y.size) : v.size
              };
            m && (B.options = g || this.resolveDataElementOptions(b, t[b].active ? 'active' : s));
            const T = B.options || t[b].options;
            pc(B, T, E, r), bc(B, T, l.ratio), this.updateElement(t[b], b, B, s);
        }
    }

    _getStacks(t, e) {
        const s = this._cachedMeta.iScale, o = s.getMatchingVisibleMetas(this._type), r = s.options.stacked,
          a = o.length, d = [];
        let u, l;
        for (u = 0; u < a; ++u) if (l = o[u], !!l.controller.options.grouped) {
            if (typeof e != 'undefined') {
                const h = l.controller.getParsed(e)[l.controller._cachedMeta.vScale.axis];
                if (X(h) || isNaN(h)) continue;
            }
            if ((r === !1 || d.indexOf(l.stack) === -1 || r === void 0 && l.stack === void 0) && d.push(l.stack), l.index === t) break;
        }
        return d.length || d.push(void 0), d;
    }

    _getStackCount(t) {
        return this._getStacks(void 0, t).length;
    }

    _getStackIndex(t, e, n) {
        const s = this._getStacks(t, n), o = e !== void 0 ? s.indexOf(e) : -1;
        return o === -1 ? s.length - 1 : o;
    }

    _getRuler() {
        const t = this.options, e = this._cachedMeta, n = e.iScale, s = [];
        let o, r;
        for (o = 0, r = e.data.length; o < r; ++o) s.push(n.getPixelForValue(this.getParsed(o)[n.axis], o));
        const a = t.barThickness;
        return {
            min: a || uc(e),
            pixels: s,
            start: n._startPixel,
            end: n._endPixel,
            stackCount: this._getStackCount(),
            scale: n,
            grouped: t.grouped,
            ratio: a ? 1 : t.categoryPercentage * t.barPercentage
        };
    }

    _calculateBarValuePixels(t) {
        const { _cachedMeta: { vScale: e, _stacked: n }, options: { base: s, minBarLength: o } } = this, r = s || 0,
          a = this.getParsed(t), d = a._custom, u = Un(d);
        let l = a[e.axis], h = 0, g = n ? this.applyStack(e, a, n) : l, m, b;
        g !== l && (h = g - l, g = l), u && (l = d.barStart, g = d.barEnd - d.barStart, l !== 0 && Et(l) !== Et(d.barEnd) && (h = 0), h += l);
        const x = !X(s) && !u ? s : h;
        let y = e.getPixelForValue(x);
        if (this.chart.getDataVisibility(t) ? m = e.getPixelForValue(h + g) : m = y, b = m - y, Math.abs(b) < o && (b = hc(b, e, r) * o, l === r && (y -= b / 2), m = y + b), y === e.getPixelForValue(r)) {
            const v = Et(b) * e.getLineWidthForValue(r) / 2;
            y += v, b -= v;
        }
        return { size: b, base: y, head: m, center: m + b / 2 };
    }

    _calculateBarIndexPixels(t, e) {
        const n = e.scale, s = this.options, o = s.skipNull, r = V(s.maxBarThickness, 1 / 0);
        let a, d;
        if (e.grouped) {
            const u = o ? this._getStackCount(t) : e.stackCount,
              l = s.barThickness === 'flex' ? lc(t, e, s, u) : cc(t, e, s, u),
              h = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0);
            a = l.start + l.chunk * h + l.chunk / 2, d = Math.min(r, l.chunk * l.ratio);
        } else a = n.getPixelForValue(this.getParsed(t)[n.axis], t), d = Math.min(r, e.min * e.ratio);
        return { base: a - d / 2, head: a + d / 2, center: a, size: d };
    }

    draw() {
        const t = this._cachedMeta, e = t.vScale, n = t.data, s = n.length;
        let o = 0;
        for (; o < s; ++o) this.getParsed(o)[e.axis] !== null && n[o].draw(this._ctx);
    }
}

Oi.id = 'bar', Oi.defaults = {
    datasetElementType: !1,
    dataElementType: 'bar',
    categoryPercentage: .8,
    barPercentage: .9,
    grouped: !0,
    animations: { numbers: { type: 'number', properties: ['x', 'y', 'base', 'width', 'height'] } }
}, Oi.overrides = {
    scales: {
        _index_: { type: 'category', offset: !0, grid: { offset: !0 } },
        _value_: { type: 'linear', beginAtZero: !0 }
    }
};

class Ri extends Pt {
    initialize() {
        this.enableOptionSharing = !0, super.initialize();
    }

    parsePrimitiveData(t, e, n, s) {
        const o = super.parsePrimitiveData(t, e, n, s);
        for (let r = 0; r < o.length; r++) o[r]._custom = this.resolveDataElementOptions(r + n).radius;
        return o;
    }

    parseArrayData(t, e, n, s) {
        const o = super.parseArrayData(t, e, n, s);
        for (let r = 0; r < o.length; r++) {
            const a = e[n + r];
            o[r]._custom = V(a[2], this.resolveDataElementOptions(r + n).radius);
        }
        return o;
    }

    parseObjectData(t, e, n, s) {
        const o = super.parseObjectData(t, e, n, s);
        for (let r = 0; r < o.length; r++) {
            const a = e[n + r];
            o[r]._custom = V(a && a.r && +a.r, this.resolveDataElementOptions(r + n).radius);
        }
        return o;
    }

    getMaxOverflow() {
        const t = this._cachedMeta.data;
        let e = 0;
        for (let n = t.length - 1; n >= 0; --n) e = Math.max(e, t[n].size(this.resolveDataElementOptions(n)) / 2);
        return e > 0 && e;
    }

    getLabelAndValue(t) {
        const e = this._cachedMeta, { xScale: n, yScale: s } = e, o = this.getParsed(t), r = n.getLabelForValue(o.x),
          a = s.getLabelForValue(o.y), d = o._custom;
        return { label: e.label, value: '(' + r + ', ' + a + (d ? ', ' + d : '') + ')' };
    }

    update(t) {
        const e = this._cachedMeta.data;
        this.updateElements(e, 0, e.length, t);
    }

    updateElements(t, e, n, s) {
        const o = s === 'reset', { iScale: r, vScale: a } = this._cachedMeta, d = this.resolveDataElementOptions(e, s),
          u = this.getSharedOptions(d), l = this.includeOptions(s, u), h = r.axis, g = a.axis;
        for (let m = e; m < e + n; m++) {
            const b = t[m], x = !o && this.getParsed(m), y = {},
              v = y[h] = o ? r.getPixelForDecimal(.5) : r.getPixelForValue(x[h]),
              E = y[g] = o ? a.getBasePixel() : a.getPixelForValue(x[g]);
            y.skip = isNaN(v) || isNaN(E), l && (y.options = this.resolveDataElementOptions(m, b.active ? 'active' : s), o && (y.options.radius = 0)), this.updateElement(b, m, y, s);
        }
        this.updateSharedOptions(u, s, d);
    }

    resolveDataElementOptions(t, e) {
        const n = this.getParsed(t);
        let s = super.resolveDataElementOptions(t, e);
        s.$shared && (s = Object.assign({}, s, { $shared: !1 }));
        const o = s.radius;
        return e !== 'active' && (s.radius = 0), s.radius += V(n && n._custom, o), s;
    }
}

Ri.id = 'bubble', Ri.defaults = {
    datasetElementType: !1,
    dataElementType: 'point',
    animations: { numbers: { type: 'number', properties: ['x', 'y', 'borderWidth', 'radius'] } }
}, Ri.overrides = {
    scales: { x: { type: 'linear' }, y: { type: 'linear' } },
    plugins: {
        tooltip: {
            callbacks: {
                title() {
                    return '';
                }
            }
        }
    }
};

function _c(i, t, e) {
    let n = 1, s = 1, o = 0, r = 0;
    if (t < J) {
        const a = i, d = a + t, u = Math.cos(a), l = Math.sin(a), h = Math.cos(d), g = Math.sin(d),
          m = (B, T, D) => _i(B, a, d, !0) ? 1 : Math.max(T, T * e, D, D * e),
          b = (B, T, D) => _i(B, a, d, !0) ? -1 : Math.min(T, T * e, D, D * e), x = m(0, u, h), y = m(at, l, g),
          v = b(ot, u, h), E = b(ot + at, l, g);
        n = (x - v) / 2, s = (y - E) / 2, o = -(x + v) / 2, r = -(y + E) / 2;
    }
    return { ratioX: n, ratioY: s, offsetX: o, offsetY: r };
}

class be extends Pt {
    constructor(t, e) {
        super(t, e);
        this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
    }

    linkScales() {
    }

    parse(t, e) {
        const n = this.getDataset().data, s = this._cachedMeta;
        if (this._parsing === !1) s._parsed = n; else {
            let o = d => +n[d];
            if (j(n[t])) {
                const { key: d = 'value' } = this._parsing;
                o = u => +Xt(n[u], d);
            }
            let r, a;
            for (r = t, a = t + e; r < a; ++r) s._parsed[r] = o(r);
        }
    }

    _getRotation() {
        return Mt(this.options.rotation - 90);
    }

    _getCircumference() {
        return Mt(this.options.circumference);
    }

    _getRotationExtents() {
        let t = J, e = -J;
        for (let n = 0; n < this.chart.data.datasets.length; ++n) if (this.chart.isDatasetVisible(n)) {
            const s = this.chart.getDatasetMeta(n).controller, o = s._getRotation(), r = s._getCircumference();
            t = Math.min(t, o), e = Math.max(e, o + r);
        }
        return { rotation: t, circumference: e - t };
    }

    update(t) {
        const e = this.chart, { chartArea: n } = e, s = this._cachedMeta, o = s.data,
          r = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing,
          a = Math.max((Math.min(n.width, n.height) - r) / 2, 0), d = Math.min(_d(this.options.cutout, a), 1),
          u = this._getRingWeight(this.index), {
              circumference: l,
              rotation: h
          } = this._getRotationExtents(), { ratioX: g, ratioY: m, offsetX: b, offsetY: x } = _c(h, l, d),
          y = (n.width - r) / g, v = (n.height - r) / m, E = Math.max(Math.min(y, v) / 2, 0),
          B = js(this.options.radius, E), T = Math.max(B * d, 0), D = (B - T) / this._getVisibleDatasetWeightTotal();
        this.offsetX = b * B, this.offsetY = x * B, s.total = this.calculateTotal(), this.outerRadius = B - D * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - D * u, 0), this.updateElements(o, 0, o.length, t);
    }

    _circumference(t, e) {
        const n = this.options, s = this._cachedMeta, o = this._getCircumference();
        return e && n.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / J);
    }

    updateElements(t, e, n, s) {
        const o = s === 'reset', r = this.chart, a = r.chartArea, u = r.options.animation, l = (a.left + a.right) / 2,
          h = (a.top + a.bottom) / 2, g = o && u.animateScale, m = g ? 0 : this.innerRadius,
          b = g ? 0 : this.outerRadius, x = this.resolveDataElementOptions(e, s), y = this.getSharedOptions(x),
          v = this.includeOptions(s, y);
        let E = this._getRotation(), B;
        for (B = 0; B < e; ++B) E += this._circumference(B, o);
        for (B = e; B < e + n; ++B) {
            const T = this._circumference(B, o), D = t[B], O = {
                x: l + this.offsetX,
                y: h + this.offsetY,
                startAngle: E,
                endAngle: E + T,
                circumference: T,
                outerRadius: b,
                innerRadius: m
            };
            v && (O.options = y || this.resolveDataElementOptions(B, D.active ? 'active' : s)), E += T, this.updateElement(D, B, O, s);
        }
        this.updateSharedOptions(y, s, x);
    }

    calculateTotal() {
        const t = this._cachedMeta, e = t.data;
        let n = 0, s;
        for (s = 0; s < e.length; s++) {
            const o = t._parsed[s];
            o !== null && !isNaN(o) && this.chart.getDataVisibility(s) && !e[s].hidden && (n += Math.abs(o));
        }
        return n;
    }

    calculateCircumference(t) {
        const e = this._cachedMeta.total;
        return e > 0 && !isNaN(t) ? J * (Math.abs(t) / e) : 0;
    }

    getLabelAndValue(t) {
        const e = this._cachedMeta, n = this.chart, s = n.data.labels || [], o = Le(e._parsed[t], n.options.locale);
        return { label: s[t] || '', value: o };
    }

    getMaxBorderWidth(t) {
        let e = 0;
        const n = this.chart;
        let s, o, r, a, d;
        if (!t) {
            for (s = 0, o = n.data.datasets.length; s < o; ++s) if (n.isDatasetVisible(s)) {
                r = n.getDatasetMeta(s), t = r.data, a = r.controller, a !== this && a.configure();
                break;
            }
        }
        if (!t) return 0;
        for (s = 0, o = t.length; s < o; ++s) d = a.resolveDataElementOptions(s), d.borderAlign !== 'inner' && (e = Math.max(e, d.borderWidth || 0, d.hoverBorderWidth || 0));
        return e;
    }

    getMaxOffset(t) {
        let e = 0;
        for (let n = 0, s = t.length; n < s; ++n) {
            const o = this.resolveDataElementOptions(n);
            e = Math.max(e, o.offset || 0, o.hoverOffset || 0);
        }
        return e;
    }

    _getRingWeightOffset(t) {
        let e = 0;
        for (let n = 0; n < t; ++n) this.chart.isDatasetVisible(n) && (e += this._getRingWeight(n));
        return e;
    }

    _getRingWeight(t) {
        return Math.max(V(this.chart.data.datasets[t].weight, 1), 0);
    }

    _getVisibleDatasetWeightTotal() {
        return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
    }
}

be.id = 'doughnut', be.defaults = {
    datasetElementType: !1,
    dataElementType: 'arc',
    animation: { animateRotate: !0, animateScale: !1 },
    animations: {
        numbers: {
            type: 'number',
            properties: ['circumference', 'endAngle', 'innerRadius', 'outerRadius', 'startAngle', 'x', 'y', 'offset', 'borderWidth', 'spacing']
        }
    },
    cutout: '50%',
    rotation: 0,
    circumference: 360,
    radius: '100%',
    spacing: 0,
    indexAxis: 'r'
}, be.descriptors = {
    _scriptable: i => i !== 'spacing',
    _indexable: i => i !== 'spacing'
}, be.overrides = {
    aspectRatio: 1, plugins: {
        legend: {
            labels: {
                generateLabels(i) {
                    const t = i.data;
                    if (t.labels.length && t.datasets.length) {
                        const { labels: { pointStyle: e } } = i.legend.options;
                        return t.labels.map((n, s) => {
                            const r = i.getDatasetMeta(0).controller.getStyle(s);
                            return {
                                text: n,
                                fillStyle: r.backgroundColor,
                                strokeStyle: r.borderColor,
                                lineWidth: r.borderWidth,
                                pointStyle: e,
                                hidden: !i.getDataVisibility(s),
                                index: s
                            };
                        });
                    }
                    return [];
                }
            }, onClick(i, t, e) {
                e.chart.toggleDataVisibility(t.index), e.chart.update();
            }
        }, tooltip: {
            callbacks: {
                title() {
                    return '';
                }, label(i) {
                    let t = i.label;
                    const e = ': ' + i.formattedValue;
                    return Q(t) ? (t = t.slice(), t[0] += e) : t += e, t;
                }
            }
        }
    }
};

class ze extends Pt {
    initialize() {
        this.enableOptionSharing = !0, super.initialize();
    }

    update(t) {
        const e = this._cachedMeta, { dataset: n, data: s = [], _dataset: o } = e, r = this.chart._animationsDisabled;
        let { start: a, count: d } = xc(e, s, r);
        this._drawStart = a, this._drawCount = d, yc(e) && (a = 0, d = s.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!o._decimated, n.points = s;
        const u = this.resolveDatasetElementOptions(t);
        this.options.showLine || (u.borderWidth = 0), u.segment = this.options.segment, this.updateElement(n, void 0, {
            animated: !r,
            options: u
        }, t), this.updateElements(s, a, d, t);
    }

    updateElements(t, e, n, s) {
        const o = s === 'reset', { iScale: r, vScale: a, _stacked: d, _dataset: u } = this._cachedMeta,
          l = this.resolveDataElementOptions(e, s), h = this.getSharedOptions(l), g = this.includeOptions(s, h),
          m = r.axis, b = a.axis, { spanGaps: x, segment: y } = this.options, v = fe(x) ? x : Number.POSITIVE_INFINITY,
          E = this.chart._animationsDisabled || o || s === 'none';
        let B = e > 0 && this.getParsed(e - 1);
        for (let T = e; T < e + n; ++T) {
            const D = t[T], O = this.getParsed(T), S = E ? D : {}, C = X(O[b]), R = S[m] = r.getPixelForValue(O[m], T),
              z = S[b] = o || C ? a.getBasePixel() : a.getPixelForValue(d ? this.applyStack(a, O, d) : O[b], T);
            S.skip = isNaN(R) || isNaN(z) || C, S.stop = T > 0 && O[m] - B[m] > v, y && (S.parsed = O, S.raw = u.data[T]), g && (S.options = h || this.resolveDataElementOptions(T, D.active ? 'active' : s)), E || this.updateElement(D, T, S, s), B = O;
        }
        this.updateSharedOptions(h, s, l);
    }

    getMaxOverflow() {
        const t = this._cachedMeta, e = t.dataset, n = e.options && e.options.borderWidth || 0, s = t.data || [];
        if (!s.length) return n;
        const o = s[0].size(this.resolveDataElementOptions(0)),
          r = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
        return Math.max(n, o, r) / 2;
    }

    draw() {
        const t = this._cachedMeta;
        t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
    }
}

ze.id = 'line', ze.defaults = {
    datasetElementType: 'line',
    dataElementType: 'point',
    showLine: !0,
    spanGaps: !1
}, ze.overrides = { scales: { _index_: { type: 'category' }, _value_: { type: 'linear' } } };

function xc(i, t, e) {
    const n = t.length;
    let s = 0, o = n;
    if (i._sorted) {
        const { iScale: r, _parsed: a } = i, d = r.axis, {
            min: u,
            max: l,
            minDefined: h,
            maxDefined: g
        } = r.getUserBounds();
        h && (s = ut(Math.min(Ot(a, r.axis, u).lo, e ? n : Ot(t, d, r.getPixelForValue(u)).lo), 0, n - 1)), g ? o = ut(Math.max(Ot(a, r.axis, l).hi + 1, e ? 0 : Ot(t, d, r.getPixelForValue(l)).hi + 1), s, n) - s : o = n - s;
    }
    return { start: s, count: o };
}

function yc(i) {
    const { xScale: t, yScale: e, _scaleRanges: n } = i, s = { xmin: t.min, xmax: t.max, ymin: e.min, ymax: e.max };
    if (!n) return i._scaleRanges = s, !0;
    const o = n.xmin !== t.min || n.xmax !== t.max || n.ymin !== e.min || n.ymax !== e.max;
    return Object.assign(n, s), o;
}

class Fi extends Pt {
    constructor(t, e) {
        super(t, e);
        this.innerRadius = void 0, this.outerRadius = void 0;
    }

    getLabelAndValue(t) {
        const e = this._cachedMeta, n = this.chart, s = n.data.labels || [], o = Le(e._parsed[t].r, n.options.locale);
        return { label: s[t] || '', value: o };
    }

    update(t) {
        const e = this._cachedMeta.data;
        this._updateRadius(), this.updateElements(e, 0, e.length, t);
    }

    _updateRadius() {
        const t = this.chart, e = t.chartArea, n = t.options, s = Math.min(e.right - e.left, e.bottom - e.top),
          o = Math.max(s / 2, 0), r = Math.max(n.cutoutPercentage ? o / 100 * n.cutoutPercentage : 1, 0),
          a = (o - r) / t.getVisibleDatasetCount();
        this.outerRadius = o - a * this.index, this.innerRadius = this.outerRadius - a;
    }

    updateElements(t, e, n, s) {
        const o = s === 'reset', r = this.chart, a = this.getDataset(), u = r.options.animation,
          l = this._cachedMeta.rScale, h = l.xCenter, g = l.yCenter, m = l.getIndexAngle(0) - .5 * ot;
        let b = m, x;
        const y = 360 / this.countVisibleElements();
        for (x = 0; x < e; ++x) b += this._computeAngle(x, s, y);
        for (x = e; x < e + n; x++) {
            const v = t[x];
            let E = b, B = b + this._computeAngle(x, s, y),
              T = r.getDataVisibility(x) ? l.getDistanceFromCenterForValue(a.data[x]) : 0;
            b = B, o && (u.animateScale && (T = 0), u.animateRotate && (E = B = m));
            const D = {
                x: h,
                y: g,
                innerRadius: 0,
                outerRadius: T,
                startAngle: E,
                endAngle: B,
                options: this.resolveDataElementOptions(x, v.active ? 'active' : s)
            };
            this.updateElement(v, x, D, s);
        }
    }

    countVisibleElements() {
        const t = this.getDataset(), e = this._cachedMeta;
        let n = 0;
        return e.data.forEach((s, o) => {
            !isNaN(t.data[o]) && this.chart.getDataVisibility(o) && n++;
        }), n;
    }

    _computeAngle(t, e, n) {
        return this.chart.getDataVisibility(t) ? Mt(this.resolveDataElementOptions(t, e).angle || n) : 0;
    }
}

Fi.id = 'polarArea', Fi.defaults = {
    dataElementType: 'arc',
    animation: { animateRotate: !0, animateScale: !0 },
    animations: {
        numbers: {
            type: 'number',
            properties: ['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius']
        }
    },
    indexAxis: 'r',
    startAngle: 0
}, Fi.overrides = {
    aspectRatio: 1,
    plugins: {
        legend: {
            labels: {
                generateLabels(i) {
                    const t = i.data;
                    if (t.labels.length && t.datasets.length) {
                        const { labels: { pointStyle: e } } = i.legend.options;
                        return t.labels.map((n, s) => {
                            const r = i.getDatasetMeta(0).controller.getStyle(s);
                            return {
                                text: n,
                                fillStyle: r.backgroundColor,
                                strokeStyle: r.borderColor,
                                lineWidth: r.borderWidth,
                                pointStyle: e,
                                hidden: !i.getDataVisibility(s),
                                index: s
                            };
                        });
                    }
                    return [];
                }
            }, onClick(i, t, e) {
                e.chart.toggleDataVisibility(t.index), e.chart.update();
            }
        }, tooltip: {
            callbacks: {
                title() {
                    return '';
                }, label(i) {
                    return i.chart.data.labels[i.dataIndex] + ': ' + i.formattedValue;
                }
            }
        }
    },
    scales: {
        r: {
            type: 'radialLinear',
            angleLines: { display: !1 },
            beginAtZero: !0,
            grid: { circular: !0 },
            pointLabels: { display: !1 },
            startAngle: 0
        }
    }
};

class $n extends be {
}

$n.id = 'pie', $n.defaults = { cutout: 0, rotation: 0, circumference: 360, radius: '100%' };

class Li extends Pt {
    getLabelAndValue(t) {
        const e = this._cachedMeta.vScale, n = this.getParsed(t);
        return { label: e.getLabels()[t], value: '' + e.getLabelForValue(n[e.axis]) };
    }

    update(t) {
        const e = this._cachedMeta, n = e.dataset, s = e.data || [], o = e.iScale.getLabels();
        if (n.points = s, t !== 'resize') {
            const r = this.resolveDatasetElementOptions(t);
            this.options.showLine || (r.borderWidth = 0);
            const a = { _loop: !0, _fullLoop: o.length === s.length, options: r };
            this.updateElement(n, void 0, a, t);
        }
        this.updateElements(s, 0, s.length, t);
    }

    updateElements(t, e, n, s) {
        const o = this.getDataset(), r = this._cachedMeta.rScale, a = s === 'reset';
        for (let d = e; d < e + n; d++) {
            const u = t[d], l = this.resolveDataElementOptions(d, u.active ? 'active' : s),
              h = r.getPointPositionForValue(d, o.data[d]), g = a ? r.xCenter : h.x, m = a ? r.yCenter : h.y,
              b = { x: g, y: m, angle: h.angle, skip: isNaN(g) || isNaN(m), options: l };
            this.updateElement(u, d, b, s);
        }
    }
}

Li.id = 'radar', Li.defaults = {
    datasetElementType: 'line',
    dataElementType: 'point',
    indexAxis: 'r',
    showLine: !0,
    elements: { line: { fill: 'start' } }
}, Li.overrides = { aspectRatio: 1, scales: { r: { type: 'radialLinear' } } };

class Ii extends ze {
}

Ii.id = 'scatter', Ii.defaults = { showLine: !1, fill: !1 }, Ii.overrides = {
    interaction: { mode: 'point' },
    plugins: {
        tooltip: {
            callbacks: {
                title() {
                    return '';
                }, label(i) {
                    return '(' + i.label + ', ' + i.formattedValue + ')';
                }
            }
        }
    },
    scales: { x: { type: 'linear' }, y: { type: 'linear' } }
};
var wc = Object.freeze({
    __proto__: null,
    BarController: Oi,
    BubbleController: Ri,
    DoughnutController: be,
    LineController: ze,
    PolarAreaController: Fi,
    PieController: $n,
    RadarController: Li,
    ScatterController: Ii
});

function te() {
    throw new Error('This method is not implemented: Check that a complete date adapter is provided.');
}

class Yn {
    constructor(t) {
        this.options = t || {};
    }

    formats() {
        return te();
    }

    parse(t, e) {
        return te();
    }

    format(t, e) {
        return te();
    }

    add(t, e, n) {
        return te();
    }

    diff(t, e, n) {
        return te();
    }

    startOf(t, e, n) {
        return te();
    }

    endOf(t, e) {
        return te();
    }
}

Yn.override = function(i) {
    Object.assign(Yn.prototype, i);
};
var vc = { _date: Yn };

function Ne(i, t) {
    return 'native' in i ? { x: i.x, y: i.y } : Mo(i, t);
}

function Mc(i, t) {
    const e = i.getSortedVisibleDatasetMetas();
    let n, s, o;
    for (let r = 0, a = e.length; r < a; ++r) {
        ({ index: n, data: s } = e[r]);
        for (let d = 0, u = s.length; d < u; ++d) o = s[d], o.skip || t(o, n, d);
    }
}

function kc(i, t, e, n) {
    const { controller: s, data: o, _sorted: r } = i, a = s._cachedMeta.iScale;
    if (a && t === a.axis && r && o.length) {
        const d = a._reversePixels ? du : Ot;
        if (n) {
            if (s._sharedOptions) {
                const u = o[0], l = typeof u.getRange == 'function' && u.getRange(t);
                if (l) {
                    const h = d(o, t, e - l), g = d(o, t, e + l);
                    return { lo: h.lo, hi: g.hi };
                }
            }
        } else return d(o, t, e);
    }
    return { lo: 0, hi: o.length - 1 };
}

function qo(i, t, e, n, s) {
    const o = i.getSortedVisibleDatasetMetas(), r = e[t];
    for (let a = 0, d = o.length; a < d; ++a) {
        const { index: u, data: l } = o[a], { lo: h, hi: g } = kc(o[a], t, r, s);
        for (let m = h; m <= g; ++m) {
            const b = l[m];
            b.skip || n(b, u, m);
        }
    }
}

function Sc(i) {
    const t = i.indexOf('x') !== -1, e = i.indexOf('y') !== -1;
    return function(n, s) {
        const o = t ? Math.abs(n.x - s.x) : 0, r = e ? Math.abs(n.y - s.y) : 0;
        return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
    };
}

function Xn(i, t, e, n) {
    const s = [];
    return Kt(t, i.chartArea, i._minPadding) && qo(i, e, t, function(r, a, d) {
        r.inRange(t.x, t.y, n) && s.push({ element: r, datasetIndex: a, index: d });
    }, !0), s;
}

function qn(i, t, e, n, s) {
    const o = Sc(e);
    let r = Number.POSITIVE_INFINITY, a = [];
    return Kt(t, i.chartArea, i._minPadding) && qo(i, e, t, function(u, l, h) {
        if (n && !u.inRange(t.x, t.y, s)) return;
        const g = u.getCenterPoint(s);
        if (!Kt(g, i.chartArea, i._minPadding) && !u.inRange(t.x, t.y, s)) return;
        const m = o(t, g);
        m < r ? (a = [{ element: u, datasetIndex: l, index: h }], r = m) : m === r && a.push({
            element: u,
            datasetIndex: l,
            index: h
        });
    }), a;
}

function Go(i, t, e, n) {
    const s = Ne(t, i), o = [], r = e.axis, a = r === 'x' ? 'inXRange' : 'inYRange';
    let d = !1;
    return Mc(i, (u, l, h) => {
        u[a](s[r], n) && o.push({ element: u, datasetIndex: l, index: h }), u.inRange(s.x, s.y, n) && (d = !0);
    }), e.intersect && !d ? [] : o;
}

var Ac = {
    modes: {
        index(i, t, e, n) {
            const s = Ne(t, i), o = e.axis || 'x', r = e.intersect ? Xn(i, s, o, n) : qn(i, s, o, !1, n), a = [];
            return r.length ? (i.getSortedVisibleDatasetMetas().forEach(d => {
                const u = r[0].index, l = d.data[u];
                l && !l.skip && a.push({ element: l, datasetIndex: d.index, index: u });
            }), a) : [];
        }, dataset(i, t, e, n) {
            const s = Ne(t, i), o = e.axis || 'xy';
            let r = e.intersect ? Xn(i, s, o, n) : qn(i, s, o, !1, n);
            if (r.length > 0) {
                const a = r[0].datasetIndex, d = i.getDatasetMeta(a).data;
                r = [];
                for (let u = 0; u < d.length; ++u) r.push({ element: d[u], datasetIndex: a, index: u });
            }
            return r;
        }, point(i, t, e, n) {
            const s = Ne(t, i), o = e.axis || 'xy';
            return Xn(i, s, o, n);
        }, nearest(i, t, e, n) {
            const s = Ne(t, i), o = e.axis || 'xy';
            return qn(i, s, o, e.intersect, n);
        }, x(i, t, e, n) {
            return e.axis = 'x', Go(i, t, e, n);
        }, y(i, t, e, n) {
            return e.axis = 'y', Go(i, t, e, n);
        }
    }
};
const Ko = ['left', 'top', 'right', 'bottom'];

function Ve(i, t) {
    return i.filter(e => e.pos === t);
}

function Zo(i, t) {
    return i.filter(e => Ko.indexOf(e.pos) === -1 && e.box.axis === t);
}

function We(i, t) {
    return i.sort((e, n) => {
        const s = t ? n : e, o = t ? e : n;
        return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
    });
}

function Cc(i) {
    const t = [];
    let e, n, s, o, r, a;
    for (e = 0, n = (i || []).length; e < n; ++e) s = i[e], {
        position: o,
        options: { stack: r, stackWeight: a = 1 }
    } = s, t.push({
        index: e,
        box: s,
        pos: o,
        horizontal: s.isHorizontal(),
        weight: s.weight,
        stack: r && o + r,
        stackWeight: a
    });
    return t;
}

function Ec(i) {
    const t = {};
    for (const e of i) {
        const { stack: n, pos: s, stackWeight: o } = e;
        if (!n || !Ko.includes(s)) continue;
        const r = t[n] || (t[n] = { count: 0, placed: 0, weight: 0, size: 0 });
        r.count++, r.weight += o;
    }
    return t;
}

function Pc(i, t) {
    const e = Ec(i), { vBoxMaxWidth: n, hBoxMaxHeight: s } = t;
    let o, r, a;
    for (o = 0, r = i.length; o < r; ++o) {
        a = i[o];
        const { fullSize: d } = a.box, u = e[a.stack], l = u && a.stackWeight / u.weight;
        a.horizontal ? (a.width = l ? l * n : d && t.availableWidth, a.height = s) : (a.width = n, a.height = l ? l * s : d && t.availableHeight);
    }
    return e;
}

function Dc(i) {
    const t = Cc(i), e = We(t.filter(u => u.box.fullSize), !0), n = We(Ve(t, 'left'), !0), s = We(Ve(t, 'right')),
      o = We(Ve(t, 'top'), !0), r = We(Ve(t, 'bottom')), a = Zo(t, 'x'), d = Zo(t, 'y');
    return {
        fullSize: e,
        leftAndTop: n.concat(o),
        rightAndBottom: s.concat(d).concat(r).concat(a),
        chartArea: Ve(t, 'chartArea'),
        vertical: n.concat(s).concat(d),
        horizontal: o.concat(r).concat(a)
    };
}

function Jo(i, t, e, n) {
    return Math.max(i[e], t[e]) + Math.max(i[n], t[n]);
}

function Qo(i, t) {
    i.top = Math.max(i.top, t.top), i.left = Math.max(i.left, t.left), i.bottom = Math.max(i.bottom, t.bottom), i.right = Math.max(i.right, t.right);
}

function Bc(i, t, e, n) {
    const { pos: s, box: o } = e, r = i.maxPadding;
    if (!j(s)) {
        e.size && (i[s] -= e.size);
        const h = n[e.stack] || { size: 0, count: 1 };
        h.size = Math.max(h.size, e.horizontal ? o.height : o.width), e.size = h.size / h.count, i[s] += e.size;
    }
    o.getPadding && Qo(r, o.getPadding());
    const a = Math.max(0, t.outerWidth - Jo(r, i, 'left', 'right')),
      d = Math.max(0, t.outerHeight - Jo(r, i, 'top', 'bottom')), u = a !== i.w, l = d !== i.h;
    return i.w = a, i.h = d, e.horizontal ? { same: u, other: l } : { same: l, other: u };
}

function Tc(i) {
    const t = i.maxPadding;

    function e(n) {
        const s = Math.max(t[n] - i[n], 0);
        return i[n] += s, s;
    }

    i.y += e('top'), i.x += e('left'), e('right'), e('bottom');
}

function Oc(i, t) {
    const e = t.maxPadding;

    function n(s) {
        const o = { left: 0, top: 0, right: 0, bottom: 0 };
        return s.forEach(r => {
            o[r] = Math.max(t[r], e[r]);
        }), o;
    }

    return n(i ? ['left', 'right'] : ['top', 'bottom']);
}

function He(i, t, e, n) {
    const s = [];
    let o, r, a, d, u, l;
    for (o = 0, r = i.length, u = 0; o < r; ++o) {
        a = i[o], d = a.box, d.update(a.width || t.w, a.height || t.h, Oc(a.horizontal, t));
        const { same: h, other: g } = Bc(t, e, a, n);
        u |= h && s.length, l = l || g, d.fullSize || s.push(a);
    }
    return u && He(s, t, e, n) || l;
}

function zi(i, t, e, n, s) {
    i.top = e, i.left = t, i.right = t + n, i.bottom = e + s, i.width = n, i.height = s;
}

function tr(i, t, e, n) {
    const s = e.padding;
    let { x: o, y: r } = t;
    for (const a of i) {
        const d = a.box, u = n[a.stack] || { count: 1, placed: 0, weight: 1 }, l = a.stackWeight / u.weight || 1;
        if (a.horizontal) {
            const h = t.w * l, g = u.size || d.height;
            xt(u.start) && (r = u.start), d.fullSize ? zi(d, s.left, r, e.outerWidth - s.right - s.left, g) : zi(d, t.left + u.placed, r, h, g), u.start = r, u.placed += h, r = d.bottom;
        } else {
            const h = t.h * l, g = u.size || d.width;
            xt(u.start) && (o = u.start), d.fullSize ? zi(d, o, s.top, g, e.outerHeight - s.bottom - s.top) : zi(d, o, t.top + u.placed, g, h), u.start = o, u.placed += h, o = d.right;
        }
    }
    t.x = o, t.y = r;
}

$.set('layout', { autoPadding: !0, padding: { top: 0, right: 0, bottom: 0, left: 0 } });
var ft = {
    addBox(i, t) {
        i.boxes || (i.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || 'top', t.weight = t.weight || 0, t._layers = t._layers || function() {
            return [{
                z: 0, draw(e) {
                    t.draw(e);
                }
            }];
        }, i.boxes.push(t);
    }, removeBox(i, t) {
        const e = i.boxes ? i.boxes.indexOf(t) : -1;
        e !== -1 && i.boxes.splice(e, 1);
    }, configure(i, t, e) {
        t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
    }, update(i, t, e, n) {
        if (!i) return;
        const s = ht(i.options.layout.padding), o = Math.max(t - s.width, 0), r = Math.max(e - s.height, 0),
          a = Dc(i.boxes), d = a.vertical, u = a.horizontal;
        G(i.boxes, x => {
            typeof x.beforeLayout == 'function' && x.beforeLayout();
        });
        const l = d.reduce((x, y) => y.box.options && y.box.options.display === !1 ? x : x + 1, 0) || 1,
          h = Object.freeze({
              outerWidth: t,
              outerHeight: e,
              padding: s,
              availableWidth: o,
              availableHeight: r,
              vBoxMaxWidth: o / 2 / l,
              hBoxMaxHeight: r / 2
          }), g = Object.assign({}, s);
        Qo(g, ht(n));
        const m = Object.assign({ maxPadding: g, w: o, h: r, x: s.left, y: s.top }, s), b = Pc(d.concat(u), h);
        He(a.fullSize, m, h, b), He(d, m, h, b), He(u, m, h, b) && He(d, m, h, b), Tc(m), tr(a.leftAndTop, m, h, b), m.x += m.w, m.y += m.h, tr(a.rightAndBottom, m, h, b), i.chartArea = {
            left: m.left,
            top: m.top,
            right: m.left + m.w,
            bottom: m.top + m.h,
            height: m.h,
            width: m.w
        }, G(a.chartArea, x => {
            const y = x.box;
            Object.assign(y, i.chartArea), y.update(m.w, m.h);
        });
    }
};

class er {
    acquireContext(t, e) {
    }

    releaseContext(t) {
        return !1;
    }

    addEventListener(t, e, n) {
    }

    removeEventListener(t, e, n) {
    }

    getDevicePixelRatio() {
        return 1;
    }

    getMaximumSize(t, e, n, s) {
        return e = Math.max(0, e || t.width), n = n || t.height, {
            width: e,
            height: Math.max(0, s ? Math.floor(e / s) : n)
        };
    }

    isAttached(t) {
        return !0;
    }

    updateConfig(t) {
    }
}

class Rc extends er {
    acquireContext(t) {
        return t && t.getContext && t.getContext('2d') || null;
    }

    updateConfig(t) {
        t.options.animation = !1;
    }
}

const Ni = '$chartjs', Fc = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup',
    pointerenter: 'mouseenter',
    pointerdown: 'mousedown',
    pointermove: 'mousemove',
    pointerup: 'mouseup',
    pointerleave: 'mouseout',
    pointerout: 'mouseout'
}, ir = i => i === null || i === '';

function Lc(i, t) {
    const e = i.style, n = i.getAttribute('height'), s = i.getAttribute('width');
    if (i[Ni] = {
        initial: {
            height: n,
            width: s,
            style: { display: e.display, height: e.height, width: e.width }
        }
    }, e.display = e.display || 'block', e.boxSizing = e.boxSizing || 'border-box', ir(s)) {
        const o = So(i, 'width');
        o !== void 0 && (i.width = o);
    }
    if (ir(n)) if (i.style.height === '') i.height = i.width / (t || 2); else {
        const o = So(i, 'height');
        o !== void 0 && (i.height = o);
    }
    return i;
}

const nr = Ou ? { passive: !0 } : !1;

function Ic(i, t, e) {
    i.addEventListener(t, e, nr);
}

function zc(i, t, e) {
    i.canvas.removeEventListener(t, e, nr);
}

function Nc(i, t) {
    const e = Fc[i.type] || i.type, { x: n, y: s } = Mo(i, t);
    return { type: e, chart: t, native: i, x: n !== void 0 ? n : null, y: s !== void 0 ? s : null };
}

function Vc(i, t, e) {
    const n = i.canvas, s = new MutationObserver(o => {
        for (const r of o) for (const a of r.addedNodes) if (a === n || a.contains(n)) return e();
    });
    return s.observe(document, { childList: !0, subtree: !0 }), s;
}

function Wc(i, t, e) {
    const n = i.canvas, s = new MutationObserver(o => {
        for (const r of o) for (const a of r.removedNodes) if (a === n || a.contains(n)) return e();
    });
    return s.observe(document, { childList: !0, subtree: !0 }), s;
}

const je = new Map;
let sr = 0;

function or() {
    const i = window.devicePixelRatio;
    i !== sr && (sr = i, je.forEach((t, e) => {
        e.currentDevicePixelRatio !== i && t();
    }));
}

function Hc(i, t) {
    je.size || window.addEventListener('resize', or), je.set(i, t);
}

function jc(i) {
    je.delete(i), je.size || window.removeEventListener('resize', or);
}

function Uc(i, t, e) {
    const n = i.canvas, s = n && Vn(n);
    if (!s) return;
    const o = Hs((a, d) => {
        const u = s.clientWidth;
        e(a, d), u < s.clientWidth && e();
    }, window), r = new ResizeObserver(a => {
        const d = a[0], u = d.contentRect.width, l = d.contentRect.height;
        u === 0 && l === 0 || o(u, l);
    });
    return r.observe(s), Hc(i, o), r;
}

function Gn(i, t, e) {
    e && e.disconnect(), t === 'resize' && jc(i);
}

function $c(i, t, e) {
    const n = i.canvas, s = Hs(o => {
        i.ctx !== null && e(Nc(o, i));
    }, i, o => {
        const r = o[0];
        return [r, r.offsetX, r.offsetY];
    });
    return Ic(n, t, s), s;
}

class Yc extends er {
    acquireContext(t, e) {
        const n = t && t.getContext && t.getContext('2d');
        return n && n.canvas === t ? (Lc(t, e), n) : null;
    }

    releaseContext(t) {
        const e = t.canvas;
        if (!e[Ni]) return !1;
        const n = e[Ni].initial;
        ['height', 'width'].forEach(o => {
            const r = n[o];
            X(r) ? e.removeAttribute(o) : e.setAttribute(o, r);
        });
        const s = n.style || {};
        return Object.keys(s).forEach(o => {
            e.style[o] = s[o];
        }), e.width = e.width, delete e[Ni], !0;
    }

    addEventListener(t, e, n) {
        this.removeEventListener(t, e);
        const s = t.$proxies || (t.$proxies = {}), r = { attach: Vc, detach: Wc, resize: Uc }[e] || $c;
        s[e] = r(t, e, n);
    }

    removeEventListener(t, e) {
        const n = t.$proxies || (t.$proxies = {}), s = n[e];
        if (!s) return;
        ({ attach: Gn, detach: Gn, resize: Gn }[e] || zc)(t, e, s), n[e] = void 0;
    }

    getDevicePixelRatio() {
        return window.devicePixelRatio;
    }

    getMaximumSize(t, e, n, s) {
        return Tu(t, e, n, s);
    }

    isAttached(t) {
        const e = Vn(t);
        return !!(e && e.isConnected);
    }
}

function Xc(i) {
    return !vo() || typeof OffscreenCanvas != 'undefined' && i instanceof OffscreenCanvas ? Rc : Yc;
}

class St {
    constructor() {
        this.x = void 0, this.y = void 0, this.active = !1, this.options = void 0, this.$animations = void 0;
    }

    tooltipPosition(t) {
        const { x: e, y: n } = this.getProps(['x', 'y'], t);
        return { x: e, y: n };
    }

    hasValue() {
        return fe(this.x) && fe(this.y);
    }

    getProps(t, e) {
        const n = this.$animations;
        if (!e || !n) return this;
        const s = {};
        return t.forEach(o => {
            s[o] = n[o] && n[o].active() ? n[o]._to : this[o];
        }), s;
    }
}

St.defaults = {}, St.defaultRoutes = void 0;
const rr = {
    values(i) {
        return Q(i) ? i : '' + i;
    }, numeric(i, t, e) {
        if (i === 0) return '0';
        const n = this.chart.options.locale;
        let s, o = i;
        if (e.length > 1) {
            const u = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
            (u < 1e-4 || u > 1e15) && (s = 'scientific'), o = qc(i, e);
        }
        const r = yt(Math.abs(o)), a = Math.max(Math.min(-1 * Math.floor(r), 20), 0),
          d = { notation: s, minimumFractionDigits: a, maximumFractionDigits: a };
        return Object.assign(d, this.options.ticks.format), Le(i, n, d);
    }, logarithmic(i, t, e) {
        if (i === 0) return '0';
        const n = i / Math.pow(10, Math.floor(yt(i)));
        return n === 1 || n === 2 || n === 5 ? rr.numeric.call(this, i, t, e) : '';
    }
};

function qc(i, t) {
    let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
    return Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e;
}

var Vi = { formatters: rr };
$.set('scale', {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: 'ticks',
    grace: 0,
    grid: {
        display: !0,
        lineWidth: 1,
        drawBorder: !0,
        drawOnChartArea: !0,
        drawTicks: !0,
        tickLength: 8,
        tickWidth: (i, t) => t.lineWidth,
        tickColor: (i, t) => t.color,
        offset: !1,
        borderDash: [],
        borderDashOffset: 0,
        borderWidth: 1
    },
    title: { display: !1, text: '', padding: { top: 4, bottom: 4 } },
    ticks: {
        minRotation: 0,
        maxRotation: 50,
        mirror: !1,
        textStrokeWidth: 0,
        textStrokeColor: '',
        padding: 3,
        display: !0,
        autoSkip: !0,
        autoSkipPadding: 3,
        labelOffset: 0,
        callback: Vi.formatters.values,
        minor: {},
        major: {},
        align: 'center',
        crossAlign: 'near',
        showLabelBackdrop: !1,
        backdropColor: 'rgba(255, 255, 255, 0.75)',
        backdropPadding: 2
    }
}), $.route('scale.ticks', 'color', '', 'color'), $.route('scale.grid', 'color', '', 'borderColor'), $.route('scale.grid', 'borderColor', '', 'borderColor'), $.route('scale.title', 'color', '', 'color'), $.describe('scale', {
    _fallback: !1,
    _scriptable: i => !i.startsWith('before') && !i.startsWith('after') && i !== 'callback' && i !== 'parser',
    _indexable: i => i !== 'borderDash' && i !== 'tickBorderDash'
}), $.describe('scales', { _fallback: 'scale' }), $.describe('scale.ticks', {
    _scriptable: i => i !== 'backdropPadding' && i !== 'callback',
    _indexable: i => i !== 'backdropPadding'
});

function Gc(i, t) {
    const e = i.options.ticks, n = e.maxTicksLimit || Kc(i), s = e.major.enabled ? Jc(t) : [], o = s.length, r = s[0],
      a = s[o - 1], d = [];
    if (o > n) return Qc(t, d, s, o / n), d;
    const u = Zc(s, t, n);
    if (o > 0) {
        let l, h;
        const g = o > 1 ? Math.round((a - r) / (o - 1)) : null;
        for (Wi(t, d, u, X(g) ? 0 : r - g, r), l = 0, h = o - 1; l < h; l++) Wi(t, d, u, s[l], s[l + 1]);
        return Wi(t, d, u, a, X(g) ? t.length : a + g), d;
    }
    return Wi(t, d, u), d;
}

function Kc(i) {
    const t = i.options.offset, e = i._tickSize(), n = i._length / e + (t ? 0 : 1), s = i._maxLength / e;
    return Math.floor(Math.min(n, s));
}

function Zc(i, t, e) {
    const n = tl(i), s = t.length / e;
    if (!n) return Math.max(s, 1);
    const o = Ad(n);
    for (let r = 0, a = o.length - 1; r < a; r++) {
        const d = o[r];
        if (d > s) return d;
    }
    return Math.max(s, 1);
}

function Jc(i) {
    const t = [];
    let e, n;
    for (e = 0, n = i.length; e < n; e++) i[e].major && t.push(e);
    return t;
}

function Qc(i, t, e, n) {
    let s = 0, o = e[0], r;
    for (n = Math.ceil(n), r = 0; r < i.length; r++) r === o && (t.push(i[r]), s++, o = e[s * n]);
}

function Wi(i, t, e, n, s) {
    const o = V(n, 0), r = Math.min(V(s, i.length), i.length);
    let a = 0, d, u, l;
    for (e = Math.ceil(e), s && (d = s - n, e = d / Math.floor(d / e)), l = o; l < 0;) a++, l = Math.round(o + a * e);
    for (u = Math.max(o, 0); u < r; u++) u === l && (t.push(i[u]), a++, l = Math.round(o + a * e));
}

function tl(i) {
    const t = i.length;
    let e, n;
    if (t < 2) return !1;
    for (n = i[0], e = 1; e < t; ++e) if (i[e] - i[e - 1] !== n) return !1;
    return n;
}

const el = i => i === 'left' ? 'right' : i === 'right' ? 'left' : i,
  ar = (i, t, e) => t === 'top' || t === 'left' ? i[t] + e : i[t] - e;

function dr(i, t) {
    const e = [], n = i.length / t, s = i.length;
    let o = 0;
    for (; o < s; o += n) e.push(i[Math.floor(o)]);
    return e;
}

function il(i, t, e) {
    const n = i.ticks.length, s = Math.min(t, n - 1), o = i._startPixel, r = i._endPixel, a = 1e-6;
    let d = i.getPixelForTick(s), u;
    if (!(e && (n === 1 ? u = Math.max(d - o, r - d) : t === 0 ? u = (i.getPixelForTick(1) - d) / 2 : u = (d - i.getPixelForTick(s - 1)) / 2, d += s < t ? u : -u, d < o - a || d > r + a))) return d;
}

function nl(i, t) {
    G(i, e => {
        const n = e.gc, s = n.length / 2;
        let o;
        if (s > t) {
            for (o = 0; o < s; ++o) delete e.data[n[o]];
            n.splice(0, s);
        }
    });
}

function Ue(i) {
    return i.drawTicks ? i.tickLength : 0;
}

function ur(i, t) {
    if (!i.display) return 0;
    const e = dt(i.font, t), n = ht(i.padding);
    return (Q(i.text) ? i.text.length : 1) * e.lineHeight + n.height;
}

function sl(i, t) {
    return Ht(i, { scale: t, type: 'scale' });
}

function ol(i, t, e) {
    return Ht(i, { tick: e, index: t, type: 'tick' });
}

function rl(i, t, e) {
    let n = kn(i);
    return (e && t !== 'right' || !e && t === 'right') && (n = el(n)), n;
}

function al(i, t, e, n) {
    const { top: s, left: o, bottom: r, right: a, chart: d } = i, { chartArea: u, scales: l } = d;
    let h = 0, g, m, b;
    const x = r - s, y = a - o;
    if (i.isHorizontal()) {
        if (m = lt(n, o, a), j(e)) {
            const v = Object.keys(e)[0], E = e[v];
            b = l[v].getPixelForValue(E) + x - t;
        } else e === 'center' ? b = (u.bottom + u.top) / 2 + x - t : b = ar(i, e, t);
        g = a - o;
    } else {
        if (j(e)) {
            const v = Object.keys(e)[0], E = e[v];
            m = l[v].getPixelForValue(E) - y + t;
        } else e === 'center' ? m = (u.left + u.right) / 2 - y + t : m = ar(i, e, t);
        b = lt(n, r, s), h = e === 'left' ? -at : at;
    }
    return { titleX: m, titleY: b, maxWidth: g, rotation: h };
}

class ee extends St {
    constructor(t) {
        super();
        this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
    }

    init(t) {
        this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
    }

    parse(t, e) {
        return t;
    }

    getUserBounds() {
        let { _userMin: t, _userMax: e, _suggestedMin: n, _suggestedMax: s } = this;
        return t = _t(t, Number.POSITIVE_INFINITY), e = _t(e, Number.NEGATIVE_INFINITY), n = _t(n, Number.POSITIVE_INFINITY), s = _t(s, Number.NEGATIVE_INFINITY), {
            min: _t(t, n),
            max: _t(e, s),
            minDefined: rt(t),
            maxDefined: rt(e)
        };
    }

    getMinMax(t) {
        let { min: e, max: n, minDefined: s, maxDefined: o } = this.getUserBounds(), r;
        if (s && o) return { min: e, max: n };
        const a = this.getMatchingVisibleMetas();
        for (let d = 0, u = a.length; d < u; ++d) r = a[d].controller.getMinMax(this, t), s || (e = Math.min(e, r.min)), o || (n = Math.max(n, r.max));
        return e = o && e > n ? n : e, n = s && e > n ? e : n, { min: _t(e, _t(n, e)), max: _t(n, _t(e, n)) };
    }

    getPadding() {
        return {
            left: this.paddingLeft || 0,
            top: this.paddingTop || 0,
            right: this.paddingRight || 0,
            bottom: this.paddingBottom || 0
        };
    }

    getTicks() {
        return this.ticks;
    }

    getLabels() {
        const t = this.chart.data;
        return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
    }

    beforeLayout() {
        this._cache = {}, this._dataLimitsCached = !1;
    }

    beforeUpdate() {
        tt(this.options.beforeUpdate, [this]);
    }

    update(t, e, n) {
        const { beginAtZero: s, grace: o, ticks: r } = this.options, a = r.sampleSize;
        this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = n = Object.assign({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = au(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
        const d = a < this.ticks.length;
        this._convertTicksToLabels(d ? dr(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === 'auto') && (this.ticks = Gc(this, this.ticks), this._labelSizes = null), d && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
    }

    configure() {
        let t = this.options.reverse, e, n;
        this.isHorizontal() ? (e = this.left, n = this.right) : (e = this.top, n = this.bottom, t = !t), this._startPixel = e, this._endPixel = n, this._reversePixels = t, this._length = n - e, this._alignToPixels = this.options.alignToPixels;
    }

    afterUpdate() {
        tt(this.options.afterUpdate, [this]);
    }

    beforeSetDimensions() {
        tt(this.options.beforeSetDimensions, [this]);
    }

    setDimensions() {
        this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
    }

    afterSetDimensions() {
        tt(this.options.afterSetDimensions, [this]);
    }

    _callHooks(t) {
        this.chart.notifyPlugins(t, this.getContext()), tt(this.options[t], [this]);
    }

    beforeDataLimits() {
        this._callHooks('beforeDataLimits');
    }

    determineDataLimits() {
    }

    afterDataLimits() {
        this._callHooks('afterDataLimits');
    }

    beforeBuildTicks() {
        this._callHooks('beforeBuildTicks');
    }

    buildTicks() {
        return [];
    }

    afterBuildTicks() {
        this._callHooks('afterBuildTicks');
    }

    beforeTickToLabelConversion() {
        tt(this.options.beforeTickToLabelConversion, [this]);
    }

    generateTickLabels(t) {
        const e = this.options.ticks;
        let n, s, o;
        for (n = 0, s = t.length; n < s; n++) o = t[n], o.label = tt(e.callback, [o.value, n, t], this);
    }

    afterTickToLabelConversion() {
        tt(this.options.afterTickToLabelConversion, [this]);
    }

    beforeCalculateLabelRotation() {
        tt(this.options.beforeCalculateLabelRotation, [this]);
    }

    calculateLabelRotation() {
        const t = this.options, e = t.ticks, n = this.ticks.length, s = e.minRotation || 0, o = e.maxRotation;
        let r = s, a, d, u;
        if (!this._isVisible() || !e.display || s >= o || n <= 1 || !this.isHorizontal()) {
            this.labelRotation = s;
            return;
        }
        const l = this._getLabelSizes(), h = l.widest.width, g = l.highest.height,
          m = ut(this.chart.width - h, 0, this.maxWidth);
        a = t.offset ? this.maxWidth / n : m / (n - 1), h + 6 > a && (a = m / (n - (t.offset ? .5 : 1)), d = this.maxHeight - Ue(t.grid) - e.padding - ur(t.title, this.chart.options.font), u = Math.sqrt(h * h + g * g), r = An(Math.min(Math.asin(ut((l.highest.height + 6) / a, -1, 1)), Math.asin(ut(d / u, -1, 1)) - Math.asin(ut(g / u, -1, 1)))), r = Math.max(s, Math.min(o, r))), this.labelRotation = r;
    }

    afterCalculateLabelRotation() {
        tt(this.options.afterCalculateLabelRotation, [this]);
    }

    beforeFit() {
        tt(this.options.beforeFit, [this]);
    }

    fit() {
        const t = { width: 0, height: 0 }, { chart: e, options: { ticks: n, title: s, grid: o } } = this,
          r = this._isVisible(), a = this.isHorizontal();
        if (r) {
            const d = ur(s, e.options.font);
            if (a ? (t.width = this.maxWidth, t.height = Ue(o) + d) : (t.height = this.maxHeight, t.width = Ue(o) + d), n.display && this.ticks.length) {
                const { first: u, last: l, widest: h, highest: g } = this._getLabelSizes(), m = n.padding * 2,
                  b = Mt(this.labelRotation), x = Math.cos(b), y = Math.sin(b);
                if (a) {
                    const v = n.mirror ? 0 : y * h.width + x * g.height;
                    t.height = Math.min(this.maxHeight, t.height + v + m);
                } else {
                    const v = n.mirror ? 0 : x * h.width + y * g.height;
                    t.width = Math.min(this.maxWidth, t.width + v + m);
                }
                this._calculatePadding(u, l, y, x);
            }
        }
        this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
    }

    _calculatePadding(t, e, n, s) {
        const { ticks: { align: o, padding: r }, position: a } = this.options, d = this.labelRotation !== 0,
          u = a !== 'top' && this.axis === 'x';
        if (this.isHorizontal()) {
            const l = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
            let g = 0, m = 0;
            d ? u ? (g = s * t.width, m = n * e.height) : (g = n * t.height, m = s * e.width) : o === 'start' ? m = e.width : o === 'end' ? g = t.width : (g = t.width / 2, m = e.width / 2), this.paddingLeft = Math.max((g - l + r) * this.width / (this.width - l), 0), this.paddingRight = Math.max((m - h + r) * this.width / (this.width - h), 0);
        } else {
            let l = e.height / 2, h = t.height / 2;
            o === 'start' ? (l = 0, h = t.height) : o === 'end' && (l = e.height, h = 0), this.paddingTop = l + r, this.paddingBottom = h + r;
        }
    }

    _handleMargins() {
        this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
    }

    afterFit() {
        tt(this.options.afterFit, [this]);
    }

    isHorizontal() {
        const { axis: t, position: e } = this.options;
        return e === 'top' || e === 'bottom' || t === 'x';
    }

    isFullSize() {
        return this.options.fullSize;
    }

    _convertTicksToLabels(t) {
        this.beforeTickToLabelConversion(), this.generateTickLabels(t);
        let e, n;
        for (e = 0, n = t.length; e < n; e++) X(t[e].label) && (t.splice(e, 1), n--, e--);
        this.afterTickToLabelConversion();
    }

    _getLabelSizes() {
        let t = this._labelSizes;
        if (!t) {
            const e = this.options.ticks.sampleSize;
            let n = this.ticks;
            e < n.length && (n = dr(n, e)), this._labelSizes = t = this._computeLabelSizes(n, n.length);
        }
        return t;
    }

    _computeLabelSizes(t, e) {
        const { ctx: n, _longestTextCache: s } = this, o = [], r = [];
        let a = 0, d = 0, u, l, h, g, m, b, x, y, v, E, B;
        for (u = 0; u < e; ++u) {
            if (g = t[u].label, m = this._resolveTickFontOptions(u), n.font = b = m.string, x = s[b] = s[b] || {
                data: {},
                gc: []
            }, y = m.lineHeight, v = E = 0, !X(g) && !Q(g)) v = Si(n, x.data, x.gc, v, g), E = y; else if (Q(g)) for (l = 0, h = g.length; l < h; ++l) B = g[l], !X(B) && !Q(B) && (v = Si(n, x.data, x.gc, v, B), E += y);
            o.push(v), r.push(E), a = Math.max(v, a), d = Math.max(E, d);
        }
        nl(s, e);
        const T = o.indexOf(a), D = r.indexOf(d), O = S => ({ width: o[S] || 0, height: r[S] || 0 });
        return { first: O(0), last: O(e - 1), widest: O(T), highest: O(D), widths: o, heights: r };
    }

    getLabelForValue(t) {
        return t;
    }

    getPixelForValue(t, e) {
        return NaN;
    }

    getValueForPixel(t) {
    }

    getPixelForTick(t) {
        const e = this.ticks;
        return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
    }

    getPixelForDecimal(t) {
        this._reversePixels && (t = 1 - t);
        const e = this._startPixel + t * this._length;
        return Dd(this._alignToPixels ? Gt(this.chart, e, 0) : e);
    }

    getDecimalForPixel(t) {
        const e = (t - this._startPixel) / this._length;
        return this._reversePixels ? 1 - e : e;
    }

    getBasePixel() {
        return this.getPixelForValue(this.getBaseValue());
    }

    getBaseValue() {
        const { min: t, max: e } = this;
        return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
    }

    getContext(t) {
        const e = this.ticks || [];
        if (t >= 0 && t < e.length) {
            const n = e[t];
            return n.$context || (n.$context = ol(this.getContext(), t, n));
        }
        return this.$context || (this.$context = sl(this.chart.getContext(), this));
    }

    _tickSize() {
        const t = this.options.ticks, e = Mt(this.labelRotation), n = Math.abs(Math.cos(e)), s = Math.abs(Math.sin(e)),
          o = this._getLabelSizes(), r = t.autoSkipPadding || 0, a = o ? o.widest.width + r : 0,
          d = o ? o.highest.height + r : 0;
        return this.isHorizontal() ? d * n > a * s ? a / n : d / s : d * s < a * n ? d / n : a / s;
    }

    _isVisible() {
        const t = this.options.display;
        return t !== 'auto' ? !!t : this.getMatchingVisibleMetas().length > 0;
    }

    _computeGridLineItems(t) {
        const e = this.axis, n = this.chart, s = this.options, { grid: o, position: r } = s, a = o.offset,
          d = this.isHorizontal(), l = this.ticks.length + (a ? 1 : 0), h = Ue(o), g = [],
          m = o.setContext(this.getContext()), b = m.drawBorder ? m.borderWidth : 0, x = b / 2, y = function(A) {
              return Gt(n, A, b);
          };
        let v, E, B, T, D, O, S, C, R, z, L, I;
        if (r === 'top') v = y(this.bottom), O = this.bottom - h, C = v - x, z = y(t.top) + x, I = t.bottom; else if (r === 'bottom') v = y(this.top), z = t.top, I = y(t.bottom) - x, O = v + x, C = this.top + h; else if (r === 'left') v = y(this.right), D = this.right - h, S = v - x, R = y(t.left) + x, L = t.right; else if (r === 'right') v = y(this.left), R = t.left, L = y(t.right) - x, D = v + x, S = this.left + h; else if (e === 'x') {
            if (r === 'center') v = y((t.top + t.bottom) / 2 + .5); else if (j(r)) {
                const A = Object.keys(r)[0], F = r[A];
                v = y(this.chart.scales[A].getPixelForValue(F));
            }
            z = t.top, I = t.bottom, O = v + x, C = O + h;
        } else if (e === 'y') {
            if (r === 'center') v = y((t.left + t.right) / 2); else if (j(r)) {
                const A = Object.keys(r)[0], F = r[A];
                v = y(this.chart.scales[A].getPixelForValue(F));
            }
            D = v - x, S = D - h, R = t.left, L = t.right;
        }
        const U = V(s.ticks.maxTicksLimit, l), M = Math.max(1, Math.ceil(l / U));
        for (E = 0; E < l; E += M) {
            const A = o.setContext(this.getContext(E)), F = A.lineWidth, K = A.color, Y = o.borderDash || [],
              N = A.borderDashOffset, it = A.tickWidth, W = A.tickColor, q = A.tickBorderDash || [],
              pt = A.tickBorderDashOffset;
            B = il(this, E, a), B !== void 0 && (T = Gt(n, B, F), d ? D = S = R = L = T : O = C = z = I = T, g.push({
                tx1: D,
                ty1: O,
                tx2: S,
                ty2: C,
                x1: R,
                y1: z,
                x2: L,
                y2: I,
                width: F,
                color: K,
                borderDash: Y,
                borderDashOffset: N,
                tickWidth: it,
                tickColor: W,
                tickBorderDash: q,
                tickBorderDashOffset: pt
            }));
        }
        return this._ticksLength = l, this._borderValue = v, g;
    }

    _computeLabelItems(t) {
        const e = this.axis, n = this.options, { position: s, ticks: o } = n, r = this.isHorizontal(),
          a = this.ticks, { align: d, crossAlign: u, padding: l, mirror: h } = o, g = Ue(n.grid), m = g + l,
          b = h ? -l : m, x = -Mt(this.labelRotation), y = [];
        let v, E, B, T, D, O, S, C, R, z, L, I, U = 'middle';
        if (s === 'top') O = this.bottom - b, S = this._getXAxisLabelAlignment(); else if (s === 'bottom') O = this.top + b, S = this._getXAxisLabelAlignment(); else if (s === 'left') {
            const A = this._getYAxisLabelAlignment(g);
            S = A.textAlign, D = A.x;
        } else if (s === 'right') {
            const A = this._getYAxisLabelAlignment(g);
            S = A.textAlign, D = A.x;
        } else if (e === 'x') {
            if (s === 'center') O = (t.top + t.bottom) / 2 + m; else if (j(s)) {
                const A = Object.keys(s)[0], F = s[A];
                O = this.chart.scales[A].getPixelForValue(F) + m;
            }
            S = this._getXAxisLabelAlignment();
        } else if (e === 'y') {
            if (s === 'center') D = (t.left + t.right) / 2 - m; else if (j(s)) {
                const A = Object.keys(s)[0], F = s[A];
                D = this.chart.scales[A].getPixelForValue(F);
            }
            S = this._getYAxisLabelAlignment(g).textAlign;
        }
        e === 'y' && (d === 'start' ? U = 'top' : d === 'end' && (U = 'bottom'));
        const M = this._getLabelSizes();
        for (v = 0, E = a.length; v < E; ++v) {
            B = a[v], T = B.label;
            const A = o.setContext(this.getContext(v));
            C = this.getPixelForTick(v) + o.labelOffset, R = this._resolveTickFontOptions(v), z = R.lineHeight, L = Q(T) ? T.length : 1;
            const F = L / 2, K = A.color, Y = A.textStrokeColor, N = A.textStrokeWidth;
            r ? (D = C, s === 'top' ? u === 'near' || x !== 0 ? I = -L * z + z / 2 : u === 'center' ? I = -M.highest.height / 2 - F * z + z : I = -M.highest.height + z / 2 : u === 'near' || x !== 0 ? I = z / 2 : u === 'center' ? I = M.highest.height / 2 - F * z : I = M.highest.height - L * z, h && (I *= -1)) : (O = C, I = (1 - L) * z / 2);
            let it;
            if (A.showLabelBackdrop) {
                const W = ht(A.backdropPadding), q = M.heights[v], pt = M.widths[v];
                let ie = O + I - W.top, ne = D - W.left;
                switch (U) {
                    case'middle':
                        ie -= q / 2;
                        break;
                    case'bottom':
                        ie -= q;
                        break;
                }
                switch (S) {
                    case'center':
                        ne -= pt / 2;
                        break;
                    case'right':
                        ne -= pt;
                        break;
                }
                it = { left: ne, top: ie, width: pt + W.width, height: q + W.height, color: A.backdropColor };
            }
            y.push({
                rotation: x,
                label: T,
                font: R,
                color: K,
                strokeColor: Y,
                strokeWidth: N,
                textOffset: I,
                textAlign: S,
                textBaseline: U,
                translation: [D, O],
                backdrop: it
            });
        }
        return y;
    }

    _getXAxisLabelAlignment() {
        const { position: t, ticks: e } = this.options;
        if (-Mt(this.labelRotation)) return t === 'top' ? 'left' : 'right';
        let s = 'center';
        return e.align === 'start' ? s = 'left' : e.align === 'end' && (s = 'right'), s;
    }

    _getYAxisLabelAlignment(t) {
        const { position: e, ticks: { crossAlign: n, mirror: s, padding: o } } = this.options,
          r = this._getLabelSizes(), a = t + o, d = r.widest.width;
        let u, l;
        return e === 'left' ? s ? (l = this.right + o, n === 'near' ? u = 'left' : n === 'center' ? (u = 'center', l += d / 2) : (u = 'right', l += d)) : (l = this.right - a, n === 'near' ? u = 'right' : n === 'center' ? (u = 'center', l -= d / 2) : (u = 'left', l = this.left)) : e === 'right' ? s ? (l = this.left + o, n === 'near' ? u = 'right' : n === 'center' ? (u = 'center', l -= d / 2) : (u = 'left', l -= d)) : (l = this.left + a, n === 'near' ? u = 'left' : n === 'center' ? (u = 'center', l += d / 2) : (u = 'right', l = this.right)) : u = 'right', {
            textAlign: u,
            x: l
        };
    }

    _computeLabelArea() {
        if (this.options.ticks.mirror) return;
        const t = this.chart, e = this.options.position;
        if (e === 'left' || e === 'right') return { top: 0, left: this.left, bottom: t.height, right: this.right };
        if (e === 'top' || e === 'bottom') return { top: this.top, left: 0, bottom: this.bottom, right: t.width };
    }

    drawBackground() {
        const { ctx: t, options: { backgroundColor: e }, left: n, top: s, width: o, height: r } = this;
        e && (t.save(), t.fillStyle = e, t.fillRect(n, s, o, r), t.restore());
    }

    getLineWidthForValue(t) {
        const e = this.options.grid;
        if (!this._isVisible() || !e.display) return 0;
        const s = this.ticks.findIndex(o => o.value === t);
        return s >= 0 ? e.setContext(this.getContext(s)).lineWidth : 0;
    }

    drawGrid(t) {
        const e = this.options.grid, n = this.ctx,
          s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
        let o, r;
        const a = (d, u, l) => {
            !l.width || !l.color || (n.save(), n.lineWidth = l.width, n.strokeStyle = l.color, n.setLineDash(l.borderDash || []), n.lineDashOffset = l.borderDashOffset, n.beginPath(), n.moveTo(d.x, d.y), n.lineTo(u.x, u.y), n.stroke(), n.restore());
        };
        if (e.display) for (o = 0, r = s.length; o < r; ++o) {
            const d = s[o];
            e.drawOnChartArea && a({ x: d.x1, y: d.y1 }, { x: d.x2, y: d.y2 }, d), e.drawTicks && a({
                x: d.tx1,
                y: d.ty1
            }, { x: d.tx2, y: d.ty2 }, {
                color: d.tickColor,
                width: d.tickWidth,
                borderDash: d.tickBorderDash,
                borderDashOffset: d.tickBorderDashOffset
            });
        }
    }

    drawBorder() {
        const { chart: t, ctx: e, options: { grid: n } } = this, s = n.setContext(this.getContext()),
          o = n.drawBorder ? s.borderWidth : 0;
        if (!o) return;
        const r = n.setContext(this.getContext(0)).lineWidth, a = this._borderValue;
        let d, u, l, h;
        this.isHorizontal() ? (d = Gt(t, this.left, o) - o / 2, u = Gt(t, this.right, r) + r / 2, l = h = a) : (l = Gt(t, this.top, o) - o / 2, h = Gt(t, this.bottom, r) + r / 2, d = u = a), e.save(), e.lineWidth = s.borderWidth, e.strokeStyle = s.borderColor, e.beginPath(), e.moveTo(d, l), e.lineTo(u, h), e.stroke(), e.restore();
    }

    drawLabels(t) {
        if (!this.options.ticks.display) return;
        const n = this.ctx, s = this._computeLabelArea();
        s && Ci(n, s);
        const o = this._labelItems || (this._labelItems = this._computeLabelItems(t));
        let r, a;
        for (r = 0, a = o.length; r < a; ++r) {
            const d = o[r], u = d.font, l = d.label;
            d.backdrop && (n.fillStyle = d.backdrop.color, n.fillRect(d.backdrop.left, d.backdrop.top, d.backdrop.width, d.backdrop.height));
            let h = d.textOffset;
            Zt(n, l, 0, h, u, d);
        }
        s && Ei(n);
    }

    drawTitle() {
        const { ctx: t, options: { position: e, title: n, reverse: s } } = this;
        if (!n.display) return;
        const o = dt(n.font), r = ht(n.padding), a = n.align;
        let d = o.lineHeight / 2;
        e === 'bottom' || e === 'center' || j(e) ? (d += r.bottom, Q(n.text) && (d += o.lineHeight * (n.text.length - 1))) : d += r.top;
        const { titleX: u, titleY: l, maxWidth: h, rotation: g } = al(this, d, e, a);
        Zt(t, n.text, 0, 0, o, {
            color: n.color,
            maxWidth: h,
            rotation: g,
            textAlign: rl(a, e, s),
            textBaseline: 'middle',
            translation: [u, l]
        });
    }

    draw(t) {
        !this._isVisible() || (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
    }

    _layers() {
        const t = this.options, e = t.ticks && t.ticks.z || 0, n = V(t.grid && t.grid.z, -1);
        return !this._isVisible() || this.draw !== ee.prototype.draw ? [{
            z: e, draw: s => {
                this.draw(s);
            }
        }] : [{
            z: n, draw: s => {
                this.drawBackground(), this.drawGrid(s), this.drawTitle();
            }
        }, {
            z: n + 1, draw: () => {
                this.drawBorder();
            }
        }, {
            z: e, draw: s => {
                this.drawLabels(s);
            }
        }];
    }

    getMatchingVisibleMetas(t) {
        const e = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + 'AxisID', s = [];
        let o, r;
        for (o = 0, r = e.length; o < r; ++o) {
            const a = e[o];
            a[n] === this.id && (!t || a.type === t) && s.push(a);
        }
        return s;
    }

    _resolveTickFontOptions(t) {
        const e = this.options.ticks.setContext(this.getContext(t));
        return dt(e.font);
    }

    _maxDigits() {
        const t = this._resolveTickFontOptions(0).lineHeight;
        return (this.isHorizontal() ? this.width : this.height) / t;
    }
}

class Hi {
    constructor(t, e, n) {
        this.type = t, this.scope = e, this.override = n, this.items = Object.create(null);
    }

    isForType(t) {
        return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
    }

    register(t) {
        const e = Object.getPrototypeOf(t);
        let n;
        cl(e) && (n = this.register(e));
        const s = this.items, o = t.id, r = this.scope + '.' + o;
        if (!o) throw new Error('class does not have id: ' + t);
        return o in s || (s[o] = t, dl(t, r, n), this.override && $.override(t.id, t.overrides)), r;
    }

    get(t) {
        return this.items[t];
    }

    unregister(t) {
        const e = this.items, n = t.id, s = this.scope;
        n in e && delete e[n], s && n in $[s] && (delete $[s][n], this.override && delete qt[n]);
    }
}

function dl(i, t, e) {
    const n = Ae(Object.create(null), [e ? $.get(e) : {}, $.get(t), i.defaults]);
    $.set(t, n), i.defaultRoutes && ul(t, i.defaultRoutes), i.descriptors && $.describe(t, i.descriptors);
}

function ul(i, t) {
    Object.keys(t).forEach(e => {
        const n = e.split('.'), s = n.pop(), o = [i].concat(n).join('.'), r = t[e].split('.'), a = r.pop(),
          d = r.join('.');
        $.route(o, s, d, a);
    });
}

function cl(i) {
    return 'id' in i && 'defaults' in i;
}

class ll {
    constructor() {
        this.controllers = new Hi(Pt, 'datasets', !0), this.elements = new Hi(St, 'elements'), this.plugins = new Hi(Object, 'plugins'), this.scales = new Hi(ee, 'scales'), this._typedRegistries = [this.controllers, this.scales, this.elements];
    }

    add(...t) {
        this._each('register', t);
    }

    remove(...t) {
        this._each('unregister', t);
    }

    addControllers(...t) {
        this._each('register', t, this.controllers);
    }

    addElements(...t) {
        this._each('register', t, this.elements);
    }

    addPlugins(...t) {
        this._each('register', t, this.plugins);
    }

    addScales(...t) {
        this._each('register', t, this.scales);
    }

    getController(t) {
        return this._get(t, this.controllers, 'controller');
    }

    getElement(t) {
        return this._get(t, this.elements, 'element');
    }

    getPlugin(t) {
        return this._get(t, this.plugins, 'plugin');
    }

    getScale(t) {
        return this._get(t, this.scales, 'scale');
    }

    removeControllers(...t) {
        this._each('unregister', t, this.controllers);
    }

    removeElements(...t) {
        this._each('unregister', t, this.elements);
    }

    removePlugins(...t) {
        this._each('unregister', t, this.plugins);
    }

    removeScales(...t) {
        this._each('unregister', t, this.scales);
    }

    _each(t, e, n) {
        [...e].forEach(s => {
            const o = n || this._getRegistryForType(s);
            n || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : G(s, r => {
                const a = n || this._getRegistryForType(r);
                this._exec(t, a, r);
            });
        });
    }

    _exec(t, e, n) {
        const s = Sn(t);
        tt(n['before' + s], [], n), e[t](n), tt(n['after' + s], [], n);
    }

    _getRegistryForType(t) {
        for (let e = 0; e < this._typedRegistries.length; e++) {
            const n = this._typedRegistries[e];
            if (n.isForType(t)) return n;
        }
        return this.plugins;
    }

    _get(t, e, n) {
        const s = e.get(t);
        if (s === void 0) throw new Error('"' + t + '" is not a registered ' + n + '.');
        return s;
    }
}

var Ft = new ll;

class fl {
    constructor() {
        this._init = [];
    }

    notify(t, e, n, s) {
        e === 'beforeInit' && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, 'install'));
        const o = s ? this._descriptors(t).filter(s) : this._descriptors(t), r = this._notify(o, t, e, n);
        return e === 'destroy' && (this._notify(o, t, 'stop'), this._notify(this._init, t, 'uninstall')), r;
    }

    _notify(t, e, n, s) {
        s = s || {};
        for (const o of t) {
            const r = o.plugin, a = r[n], d = [e, s, o.options];
            if (tt(a, d, r) === !1 && s.cancelable) return !1;
        }
        return !0;
    }

    invalidate() {
        X(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
    }

    _descriptors(t) {
        if (this._cache) return this._cache;
        const e = this._cache = this._createDescriptors(t);
        return this._notifyStateChanges(t), e;
    }

    _createDescriptors(t, e) {
        const n = t && t.config, s = V(n.options && n.options.plugins, {}), o = hl(n);
        return s === !1 && !e ? [] : pl(t, o, s, e);
    }

    _notifyStateChanges(t) {
        const e = this._oldCache || [], n = this._cache,
          s = (o, r) => o.filter(a => !r.some(d => a.plugin.id === d.plugin.id));
        this._notify(s(e, n), t, 'stop'), this._notify(s(n, e), t, 'start');
    }
}

function hl(i) {
    const t = [], e = Object.keys(Ft.plugins.items);
    for (let s = 0; s < e.length; s++) t.push(Ft.getPlugin(e[s]));
    const n = i.plugins || [];
    for (let s = 0; s < n.length; s++) {
        const o = n[s];
        t.indexOf(o) === -1 && t.push(o);
    }
    return t;
}

function gl(i, t) {
    return !t && i === !1 ? null : i === !0 ? {} : i;
}

function pl(i, t, e, n) {
    const s = [], o = i.getContext();
    for (let r = 0; r < t.length; r++) {
        const a = t[r], d = a.id, u = gl(e[d], n);
        u !== null && s.push({ plugin: a, options: ml(i.config, a, u, o) });
    }
    return s;
}

function ml(i, t, e, n) {
    const s = i.pluginScopeKeys(t), o = i.getOptionScopes(e, s);
    return i.createResolver(o, n, [''], { scriptable: !1, indexable: !1, allKeys: !0 });
}

function Kn(i, t) {
    const e = $.datasets[i] || {};
    return ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || 'x';
}

function bl(i, t) {
    let e = i;
    return i === '_index_' ? e = t : i === '_value_' && (e = t === 'x' ? 'y' : 'x'), e;
}

function _l(i, t) {
    return i === t ? '_index_' : '_value_';
}

function xl(i) {
    if (i === 'top' || i === 'bottom') return 'x';
    if (i === 'left' || i === 'right') return 'y';
}

function Zn(i, t) {
    return i === 'x' || i === 'y' ? i : t.axis || xl(t.position) || i.charAt(0).toLowerCase();
}

function yl(i, t) {
    const e = qt[i.type] || { scales: {} }, n = t.scales || {}, s = Kn(i.type, t), o = Object.create(null),
      r = Object.create(null);
    return Object.keys(n).forEach(a => {
        const d = n[a];
        if (!j(d)) return console.error(`Invalid scale configuration for scale: ${a}`);
        if (d._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
        const u = Zn(a, d), l = _l(u, s), h = e.scales || {};
        o[u] = o[u] || a, r[a] = Ce(Object.create(null), [{ axis: u }, d, h[u], h[l]]);
    }), i.data.datasets.forEach(a => {
        const d = a.type || i.type, u = a.indexAxis || Kn(d, t), h = (qt[d] || {}).scales || {};
        Object.keys(h).forEach(g => {
            const m = bl(g, u), b = a[m + 'AxisID'] || o[m] || m;
            r[b] = r[b] || Object.create(null), Ce(r[b], [{ axis: m }, n[b], h[g]]);
        });
    }), Object.keys(r).forEach(a => {
        const d = r[a];
        Ce(d, [$.scales[d.type], $.scale]);
    }), r;
}

function cr(i) {
    const t = i.options || (i.options = {});
    t.plugins = V(t.plugins, {}), t.scales = yl(i, t);
}

function lr(i) {
    return i = i || {}, i.datasets = i.datasets || [], i.labels = i.labels || [], i;
}

function wl(i) {
    return i = i || {}, i.data = lr(i.data), cr(i), i;
}

const fr = new Map, hr = new Set;

function ji(i, t) {
    let e = fr.get(i);
    return e || (e = t(), fr.set(i, e), hr.add(e)), e;
}

const $e = (i, t, e) => {
    const n = Xt(t, e);
    n !== void 0 && i.add(n);
};

class vl {
    constructor(t) {
        this._config = wl(t), this._scopeCache = new Map, this._resolverCache = new Map;
    }

    get platform() {
        return this._config.platform;
    }

    get type() {
        return this._config.type;
    }

    set type(t) {
        this._config.type = t;
    }

    get data() {
        return this._config.data;
    }

    set data(t) {
        this._config.data = lr(t);
    }

    get options() {
        return this._config.options;
    }

    set options(t) {
        this._config.options = t;
    }

    get plugins() {
        return this._config.plugins;
    }

    update() {
        const t = this._config;
        this.clearCache(), cr(t);
    }

    clearCache() {
        this._scopeCache.clear(), this._resolverCache.clear();
    }

    datasetScopeKeys(t) {
        return ji(t, () => [[`datasets.${t}`, '']]);
    }

    datasetAnimationScopeKeys(t, e) {
        return ji(`${t}.transition.${e}`, () => [[`datasets.${t}.transitions.${e}`, `transitions.${e}`], [`datasets.${t}`, '']]);
    }

    datasetElementScopeKeys(t, e) {
        return ji(`${t}-${e}`, () => [[`datasets.${t}.elements.${e}`, `datasets.${t}`, `elements.${e}`, '']]);
    }

    pluginScopeKeys(t) {
        const e = t.id, n = this.type;
        return ji(`${n}-plugin-${e}`, () => [[`plugins.${e}`, ...t.additionalOptionScopes || []]]);
    }

    _cachedScopes(t, e) {
        const n = this._scopeCache;
        let s = n.get(t);
        return (!s || e) && (s = new Map, n.set(t, s)), s;
    }

    getOptionScopes(t, e, n) {
        const { options: s, type: o } = this, r = this._cachedScopes(t, n), a = r.get(e);
        if (a) return a;
        const d = new Set;
        e.forEach(l => {
            t && (d.add(t), l.forEach(h => $e(d, t, h))), l.forEach(h => $e(d, s, h)), l.forEach(h => $e(d, qt[o] || {}, h)), l.forEach(h => $e(d, $, h)), l.forEach(h => $e(d, Rn, h));
        });
        const u = Array.from(d);
        return u.length === 0 && u.push(Object.create(null)), hr.has(e) && r.set(e, u), u;
    }

    chartOptionScopes() {
        const { options: t, type: e } = this;
        return [t, qt[e] || {}, $.datasets[e] || {}, { type: e }, $, Rn];
    }

    resolveNamedOptions(t, e, n, s = ['']) {
        const o = { $shared: !0 }, { resolver: r, subPrefixes: a } = gr(this._resolverCache, t, s);
        let d = r;
        if (kl(r, e)) {
            o.$shared = !1, n = Wt(n) ? n() : n;
            const u = this.createResolver(t, n, a);
            d = ge(r, n, u);
        }
        for (const u of e) o[u] = d[u];
        return o;
    }

    createResolver(t, e, n = [''], s) {
        const { resolver: o } = gr(this._resolverCache, t, n);
        return j(e) ? ge(o, e, void 0, s) : o;
    }
}

function gr(i, t, e) {
    let n = i.get(t);
    n || (n = new Map, i.set(t, n));
    const s = e.join();
    let o = n.get(s);
    return o || (o = {
        resolver: zn(t, e),
        subPrefixes: e.filter(a => !a.toLowerCase().includes('hover'))
    }, n.set(s, o)), o;
}

const Ml = i => j(i) && Object.getOwnPropertyNames(i).reduce((t, e) => t || Wt(i[e]), !1);

function kl(i, t) {
    const { isScriptable: e, isIndexable: n } = go(i);
    for (const s of t) {
        const o = e(s), r = n(s), a = (r || o) && i[s];
        if (o && (Wt(a) || Ml(a)) || r && Q(a)) return !0;
    }
    return !1;
}

var Sl = '3.6.0';
const Al = ['top', 'bottom', 'left', 'right', 'chartArea'];

function pr(i, t) {
    return i === 'top' || i === 'bottom' || Al.indexOf(i) === -1 && t === 'x';
}

function mr(i, t) {
    return function(e, n) {
        return e[i] === n[i] ? e[t] - n[t] : e[i] - n[i];
    };
}

function br(i) {
    const t = i.chart, e = t.options.animation;
    t.notifyPlugins('afterRender'), tt(e && e.onComplete, [i], t);
}

function Cl(i) {
    const t = i.chart, e = t.options.animation;
    tt(e && e.onProgress, [i], t);
}

function _r(i) {
    return vo() && typeof i == 'string' ? i = document.getElementById(i) : i && i.length && (i = i[0]), i && i.canvas && (i = i.canvas), i;
}

const Ui = {}, xr = i => {
    const t = _r(i);
    return Object.values(Ui).filter(e => e.canvas === t).pop();
};

class $i {
    constructor(t, e) {
        const n = this.config = new vl(e), s = _r(t), o = xr(s);
        if (o) throw new Error('Canvas is already in use. Chart with ID \'' + o.id + '\' must be destroyed before the canvas can be reused.');
        const r = n.createResolver(n.chartOptionScopes(), this.getContext());
        this.platform = new (n.platform || Xc(s)), this.platform.updateConfig(n);
        const a = this.platform.acquireContext(s, r.aspectRatio), d = a && a.canvas, u = d && d.height,
          l = d && d.width;
        if (this.id = bd(), this.ctx = a, this.canvas = d, this.width = l, this.height = u, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new fl, this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = pd(h => this.update(h), r.resizeDelay || 0), Ui[this.id] = this, !a || !d) {
            console.error('Failed to create chart: can\'t acquire context from the given item');
            return;
        }
        Rt.listen(this, 'complete', br), Rt.listen(this, 'progress', Cl), this._initialize(), this.attached && this.update();
    }

    get aspectRatio() {
        const { options: { aspectRatio: t, maintainAspectRatio: e }, width: n, height: s, _aspectRatio: o } = this;
        return X(t) ? e && o ? o : s ? n / s : null : t;
    }

    get data() {
        return this.config.data;
    }

    set data(t) {
        this.config.data = t;
    }

    get options() {
        return this._options;
    }

    set options(t) {
        this.config.options = t;
    }

    _initialize() {
        return this.notifyPlugins('beforeInit'), this.options.responsive ? this.resize() : ko(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins('afterInit'), this;
    }

    clear() {
        return uo(this.canvas, this.ctx), this;
    }

    stop() {
        return Rt.stop(this), this;
    }

    resize(t, e) {
        Rt.running(this) ? this._resizeBeforeDraw = { width: t, height: e } : this._resize(t, e);
    }

    _resize(t, e) {
        const n = this.options, s = this.canvas, o = n.maintainAspectRatio && this.aspectRatio,
          r = this.platform.getMaximumSize(s, t, e, o), a = n.devicePixelRatio || this.platform.getDevicePixelRatio(),
          d = this.width ? 'resize' : 'attach';
        this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, !!ko(this, a, !0) && (this.notifyPlugins('resize', { size: r }), tt(n.onResize, [this, r], this), this.attached && this._doResize(d) && this.render());
    }

    ensureScalesHaveIDs() {
        const e = this.options.scales || {};
        G(e, (n, s) => {
            n.id = s;
        });
    }

    buildOrUpdateScales() {
        const t = this.options, e = t.scales, n = this.scales, s = Object.keys(n).reduce((r, a) => (r[a] = !1, r), {});
        let o = [];
        e && (o = o.concat(Object.keys(e).map(r => {
            const a = e[r], d = Zn(r, a), u = d === 'r', l = d === 'x';
            return {
                options: a,
                dposition: u ? 'chartArea' : l ? 'bottom' : 'left',
                dtype: u ? 'radialLinear' : l ? 'category' : 'linear'
            };
        }))), G(o, r => {
            const a = r.options, d = a.id, u = Zn(d, a), l = V(a.type, r.dtype);
            (a.position === void 0 || pr(a.position, u) !== pr(r.dposition)) && (a.position = r.dposition), s[d] = !0;
            let h = null;
            if (d in n && n[d].type === l) h = n[d]; else {
                const g = Ft.getScale(l);
                h = new g({ id: d, type: l, ctx: this.ctx, chart: this }), n[h.id] = h;
            }
            h.init(a, t);
        }), G(s, (r, a) => {
            r || delete n[a];
        }), G(n, r => {
            ft.configure(this, r, r.options), ft.addBox(this, r);
        });
    }

    _updateMetasets() {
        const t = this._metasets, e = this.data.datasets.length, n = t.length;
        if (t.sort((s, o) => s.index - o.index), n > e) {
            for (let s = e; s < n; ++s) this._destroyDatasetMeta(s);
            t.splice(e, n - e);
        }
        this._sortedMetasets = t.slice(0).sort(mr('order', 'index'));
    }

    _removeUnreferencedMetasets() {
        const { _metasets: t, data: { datasets: e } } = this;
        t.length > e.length && delete this._stacks, t.forEach((n, s) => {
            e.filter(o => o === n._dataset).length === 0 && this._destroyDatasetMeta(s);
        });
    }

    buildOrUpdateControllers() {
        const t = [], e = this.data.datasets;
        let n, s;
        for (this._removeUnreferencedMetasets(), n = 0, s = e.length; n < s; n++) {
            const o = e[n];
            let r = this.getDatasetMeta(n);
            const a = o.type || this.config.type;
            if (r.type && r.type !== a && (this._destroyDatasetMeta(n), r = this.getDatasetMeta(n)), r.type = a, r.indexAxis = o.indexAxis || Kn(a, this.options), r.order = o.order || 0, r.index = n, r.label = '' + o.label, r.visible = this.isDatasetVisible(n), r.controller) r.controller.updateIndex(n), r.controller.linkScales(); else {
                const d = Ft.getController(a), { datasetElementType: u, dataElementType: l } = $.datasets[a];
                Object.assign(d.prototype, {
                    dataElementType: Ft.getElement(l),
                    datasetElementType: u && Ft.getElement(u)
                }), r.controller = new d(this, n), t.push(r.controller);
            }
        }
        return this._updateMetasets(), t;
    }

    _resetElements() {
        G(this.data.datasets, (t, e) => {
            this.getDatasetMeta(e).controller.reset();
        }, this);
    }

    reset() {
        this._resetElements(), this.notifyPlugins('reset');
    }

    update(t) {
        const e = this.config;
        e.update();
        const n = this._options = e.createResolver(e.chartOptionScopes(), this.getContext());
        G(this.scales, u => {
            ft.removeBox(this, u);
        });
        const s = this._animationsDisabled = !n.animation;
        this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
        const o = new Set(Object.keys(this._listeners)), r = new Set(n.events);
        if ((!Md(o, r) || !!this._responsiveListeners !== n.responsive) && (this.unbindEvents(), this.bindEvents()), this._plugins.invalidate(), this.notifyPlugins('beforeUpdate', {
            mode: t,
            cancelable: !0
        }) === !1) return;
        const a = this.buildOrUpdateControllers();
        this.notifyPlugins('beforeElementsUpdate');
        let d = 0;
        for (let u = 0, l = this.data.datasets.length; u < l; u++) {
            const { controller: h } = this.getDatasetMeta(u), g = !s && a.indexOf(h) === -1;
            h.buildOrUpdateElements(g), d = Math.max(+h.getMaxOverflow(), d);
        }
        d = this._minPadding = n.layout.autoPadding ? d : 0, this._updateLayout(d), s || G(a, u => {
            u.reset();
        }), this._updateDatasets(t), this.notifyPlugins('afterUpdate', { mode: t }), this._layers.sort(mr('z', '_idx')), this._lastEvent && this._eventHandler(this._lastEvent, !0), this.render();
    }

    _updateLayout(t) {
        if (this.notifyPlugins('beforeLayout', { cancelable: !0 }) === !1) return;
        ft.update(this, this.width, this.height, t);
        const e = this.chartArea, n = e.width <= 0 || e.height <= 0;
        this._layers = [], G(this.boxes, s => {
            n && s.position === 'chartArea' || (s.configure && s.configure(), this._layers.push(...s._layers()));
        }, this), this._layers.forEach((s, o) => {
            s._idx = o;
        }), this.notifyPlugins('afterLayout');
    }

    _updateDatasets(t) {
        if (this.notifyPlugins('beforeDatasetsUpdate', { mode: t, cancelable: !0 }) !== !1) {
            for (let e = 0, n = this.data.datasets.length; e < n; ++e) this._updateDataset(e, Wt(t) ? t({ datasetIndex: e }) : t);
            this.notifyPlugins('afterDatasetsUpdate', { mode: t });
        }
    }

    _updateDataset(t, e) {
        const n = this.getDatasetMeta(t), s = { meta: n, index: t, mode: e, cancelable: !0 };
        this.notifyPlugins('beforeDatasetUpdate', s) !== !1 && (n.controller._update(e), s.cancelable = !1, this.notifyPlugins('afterDatasetUpdate', s));
    }

    render() {
        this.notifyPlugins('beforeRender', { cancelable: !0 }) !== !1 && (Rt.has(this) ? this.attached && !Rt.running(this) && Rt.start(this) : (this.draw(), br({ chart: this })));
    }

    draw() {
        let t;
        if (this._resizeBeforeDraw) {
            const { width: n, height: s } = this._resizeBeforeDraw;
            this._resize(n, s), this._resizeBeforeDraw = null;
        }
        if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins('beforeDraw', { cancelable: !0 }) === !1) return;
        const e = this._layers;
        for (t = 0; t < e.length && e[t].z <= 0; ++t) e[t].draw(this.chartArea);
        for (this._drawDatasets(); t < e.length; ++t) e[t].draw(this.chartArea);
        this.notifyPlugins('afterDraw');
    }

    _getSortedDatasetMetas(t) {
        const e = this._sortedMetasets, n = [];
        let s, o;
        for (s = 0, o = e.length; s < o; ++s) {
            const r = e[s];
            (!t || r.visible) && n.push(r);
        }
        return n;
    }

    getSortedVisibleDatasetMetas() {
        return this._getSortedDatasetMetas(!0);
    }

    _drawDatasets() {
        if (this.notifyPlugins('beforeDatasetsDraw', { cancelable: !0 }) === !1) return;
        const t = this.getSortedVisibleDatasetMetas();
        for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e]);
        this.notifyPlugins('afterDatasetsDraw');
    }

    _drawDataset(t) {
        const e = this.ctx, n = t._clip, s = !n.disabled, o = this.chartArea,
          r = { meta: t, index: t.index, cancelable: !0 };
        this.notifyPlugins('beforeDatasetDraw', r) !== !1 && (s && Ci(e, {
            left: n.left === !1 ? 0 : o.left - n.left,
            right: n.right === !1 ? this.width : o.right + n.right,
            top: n.top === !1 ? 0 : o.top - n.top,
            bottom: n.bottom === !1 ? this.height : o.bottom + n.bottom
        }), t.controller.draw(), s && Ei(e), r.cancelable = !1, this.notifyPlugins('afterDatasetDraw', r));
    }

    getElementsAtEventForMode(t, e, n, s) {
        const o = Ac.modes[e];
        return typeof o == 'function' ? o(this, t, n, s) : [];
    }

    getDatasetMeta(t) {
        const e = this.data.datasets[t], n = this._metasets;
        let s = n.filter(o => o && o._dataset === e).pop();
        return s || (s = {
            type: null,
            data: [],
            dataset: null,
            controller: null,
            hidden: null,
            xAxisID: null,
            yAxisID: null,
            order: e && e.order || 0,
            index: t,
            _dataset: e,
            _parsed: [],
            _sorted: !1
        }, n.push(s)), s;
    }

    getContext() {
        return this.$context || (this.$context = Ht(null, { chart: this, type: 'chart' }));
    }

    getVisibleDatasetCount() {
        return this.getSortedVisibleDatasetMetas().length;
    }

    isDatasetVisible(t) {
        const e = this.data.datasets[t];
        if (!e) return !1;
        const n = this.getDatasetMeta(t);
        return typeof n.hidden == 'boolean' ? !n.hidden : !e.hidden;
    }

    setDatasetVisibility(t, e) {
        const n = this.getDatasetMeta(t);
        n.hidden = !e;
    }

    toggleDataVisibility(t) {
        this._hiddenIndices[t] = !this._hiddenIndices[t];
    }

    getDataVisibility(t) {
        return !this._hiddenIndices[t];
    }

    _updateVisibility(t, e, n) {
        const s = n ? 'show' : 'hide', o = this.getDatasetMeta(t), r = o.controller._resolveAnimations(void 0, s);
        xt(e) ? (o.data[e].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), r.update(o, { visible: n }), this.update(a => a.datasetIndex === t ? s : void 0));
    }

    hide(t, e) {
        this._updateVisibility(t, e, !1);
    }

    show(t, e) {
        this._updateVisibility(t, e, !0);
    }

    _destroyDatasetMeta(t) {
        const e = this._metasets[t];
        e && e.controller && e.controller._destroy(), delete this._metasets[t];
    }

    _stop() {
        let t, e;
        for (this.stop(), Rt.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t) this._destroyDatasetMeta(t);
    }

    destroy() {
        const { canvas: t, ctx: e } = this;
        this._stop(), this.config.clearCache(), t && (this.unbindEvents(), uo(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), this.notifyPlugins('destroy'), delete Ui[this.id];
    }

    toBase64Image(...t) {
        return this.canvas.toDataURL(...t);
    }

    bindEvents() {
        this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
    }

    bindUserEvents() {
        const t = this._listeners, e = this.platform, n = (o, r) => {
            e.addEventListener(this, o, r), t[o] = r;
        }, s = (o, r, a) => {
            o.offsetX = r, o.offsetY = a, this._eventHandler(o);
        };
        G(this.options.events, o => n(o, s));
    }

    bindResponsiveEvents() {
        this._responsiveListeners || (this._responsiveListeners = {});
        const t = this._responsiveListeners, e = this.platform, n = (d, u) => {
            e.addEventListener(this, d, u), t[d] = u;
        }, s = (d, u) => {
            t[d] && (e.removeEventListener(this, d, u), delete t[d]);
        }, o = (d, u) => {
            this.canvas && this.resize(d, u);
        };
        let r;
        const a = () => {
            s('attach', a), this.attached = !0, this.resize(), n('resize', o), n('detach', r);
        };
        r = () => {
            this.attached = !1, s('resize', o), this._stop(), this._resize(0, 0), n('attach', a);
        }, e.isAttached(this.canvas) ? a() : r();
    }

    unbindEvents() {
        G(this._listeners, (t, e) => {
            this.platform.removeEventListener(this, e, t);
        }), this._listeners = {}, G(this._responsiveListeners, (t, e) => {
            this.platform.removeEventListener(this, e, t);
        }), this._responsiveListeners = void 0;
    }

    updateHoverStyle(t, e, n) {
        const s = n ? 'set' : 'remove';
        let o, r, a, d;
        for (e === 'dataset' && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller['_' + s + 'DatasetHoverStyle']()), a = 0, d = t.length; a < d; ++a) {
            r = t[a];
            const u = r && this.getDatasetMeta(r.datasetIndex).controller;
            u && u[s + 'HoverStyle'](r.element, r.datasetIndex, r.index);
        }
    }

    getActiveElements() {
        return this._active || [];
    }

    setActiveElements(t) {
        const e = this._active || [], n = t.map(({ datasetIndex: o, index: r }) => {
            const a = this.getDatasetMeta(o);
            if (!a) throw new Error('No dataset found at index ' + o);
            return { datasetIndex: o, element: a.data[r], index: r };
        });
        !pi(n, e) && (this._active = n, this._updateHoverStyles(n, e));
    }

    notifyPlugins(t, e, n) {
        return this._plugins.notify(this, t, e, n);
    }

    _updateHoverStyles(t, e, n) {
        const s = this.options.hover,
          o = (d, u) => d.filter(l => !u.some(h => l.datasetIndex === h.datasetIndex && l.index === h.index)),
          r = o(e, t), a = n ? t : o(t, e);
        r.length && this.updateHoverStyle(r, s.mode, !1), a.length && s.mode && this.updateHoverStyle(a, s.mode, !0);
    }

    _eventHandler(t, e) {
        const n = { event: t, replay: e, cancelable: !0 },
          s = r => (r.options.events || this.options.events).includes(t.native.type);
        if (this.notifyPlugins('beforeEvent', n, s) === !1) return;
        const o = this._handleEvent(t, e);
        return n.cancelable = !1, this.notifyPlugins('afterEvent', n, s), (o || n.changed) && this.render(), this;
    }

    _handleEvent(t, e) {
        const { _active: n = [], options: s } = this, o = s.hover, r = e;
        let a = [], d = !1, u = null;
        return t.type !== 'mouseout' && (a = this.getElementsAtEventForMode(t, o.mode, o, r), u = t.type === 'click' ? this._lastEvent : t), this._lastEvent = null, Kt(t, this.chartArea, this._minPadding) && (tt(s.onHover, [t, a, this], this), (t.type === 'mouseup' || t.type === 'click' || t.type === 'contextmenu') && tt(s.onClick, [t, a, this], this)), d = !pi(a, n), (d || e) && (this._active = a, this._updateHoverStyles(a, n, e)), this._lastEvent = u, d;
    }
}

const yr = () => G($i.instances, i => i._plugins.invalidate()), jt = !0;
Object.defineProperties($i, {
    defaults: { enumerable: jt, value: $ },
    instances: { enumerable: jt, value: Ui },
    overrides: { enumerable: jt, value: qt },
    registry: { enumerable: jt, value: Ft },
    version: { enumerable: jt, value: Sl },
    getChart: { enumerable: jt, value: xr },
    register: {
        enumerable: jt, value: (...i) => {
            Ft.add(...i), yr();
        }
    },
    unregister: {
        enumerable: jt, value: (...i) => {
            Ft.remove(...i), yr();
        }
    }
});

function wr(i, t, e) {
    const { startAngle: n, pixelMargin: s, x: o, y: r, outerRadius: a, innerRadius: d } = t;
    let u = s / a;
    i.beginPath(), i.arc(o, r, a, n - u, e + u), d > s ? (u = s / d, i.arc(o, r, d, e + u, n - u, !0)) : i.arc(o, r, s, e + at, n - at), i.closePath(), i.clip();
}

function El(i) {
    return Ln(i, ['outerStart', 'outerEnd', 'innerStart', 'innerEnd']);
}

function Pl(i, t, e, n) {
    const s = El(i.options.borderRadius), o = (e - t) / 2, r = Math.min(o, n * t / 2), a = d => {
        const u = (e - Math.min(o, d)) * n / 2;
        return ut(d, 0, Math.min(o, u));
    };
    return {
        outerStart: a(s.outerStart),
        outerEnd: a(s.outerEnd),
        innerStart: ut(s.innerStart, 0, r),
        innerEnd: ut(s.innerEnd, 0, r)
    };
}

function _e(i, t, e, n) {
    return { x: e + i * Math.cos(t), y: n + i * Math.sin(t) };
}

function Jn(i, t, e, n, s) {
    const { x: o, y: r, startAngle: a, pixelMargin: d, innerRadius: u } = t, l = Math.max(t.outerRadius + n + e - d, 0),
      h = u > 0 ? u + n + e + d : 0;
    let g = 0;
    const m = s - a;
    if (n) {
        const F = u > 0 ? u - n : 0, K = l > 0 ? l - n : 0, Y = (F + K) / 2, N = Y !== 0 ? m * Y / (Y + n) : m;
        g = (m - N) / 2;
    }
    const b = Math.max(.001, m * l - e / ot) / l, x = (m - b) / 2, y = a + x + g, v = s - x - g, {
          outerStart: E,
          outerEnd: B,
          innerStart: T,
          innerEnd: D
      } = Pl(t, h, l, v - y), O = l - E, S = l - B, C = y + E / O, R = v - B / S, z = h + T, L = h + D, I = y + T / z,
      U = v - D / L;
    if (i.beginPath(), i.arc(o, r, l, C, R), B > 0) {
        const F = _e(S, R, o, r);
        i.arc(F.x, F.y, B, R, v + at);
    }
    const M = _e(L, v, o, r);
    if (i.lineTo(M.x, M.y), D > 0) {
        const F = _e(L, U, o, r);
        i.arc(F.x, F.y, D, v + at, U + Math.PI);
    }
    if (i.arc(o, r, h, v - D / h, y + T / h, !0), T > 0) {
        const F = _e(z, I, o, r);
        i.arc(F.x, F.y, T, I + Math.PI, y - at);
    }
    const A = _e(O, y, o, r);
    if (i.lineTo(A.x, A.y), E > 0) {
        const F = _e(O, C, o, r);
        i.arc(F.x, F.y, E, y - at, C);
    }
    i.closePath();
}

function Dl(i, t, e, n) {
    const { fullCircles: s, startAngle: o, circumference: r } = t;
    let a = t.endAngle;
    if (s) {
        Jn(i, t, e, n, o + J);
        for (let d = 0; d < s; ++d) i.fill();
        isNaN(r) || (a = o + r % J, r % J == 0 && (a += J));
    }
    return Jn(i, t, e, n, a), i.fill(), a;
}

function Bl(i, t, e) {
    const { x: n, y: s, startAngle: o, pixelMargin: r, fullCircles: a } = t, d = Math.max(t.outerRadius - r, 0),
      u = t.innerRadius + r;
    let l;
    for (e && wr(i, t, o + J), i.beginPath(), i.arc(n, s, u, o + J, o, !0), l = 0; l < a; ++l) i.stroke();
    for (i.beginPath(), i.arc(n, s, d, o, o + J), l = 0; l < a; ++l) i.stroke();
}

function Tl(i, t, e, n, s) {
    const { options: o } = t, r = o.borderAlign === 'inner';
    !o.borderWidth || (r ? (i.lineWidth = o.borderWidth * 2, i.lineJoin = 'round') : (i.lineWidth = o.borderWidth, i.lineJoin = 'bevel'), t.fullCircles && Bl(i, t, r), r && wr(i, t, s), Jn(i, t, e, n, s), i.stroke());
}

class Yi extends St {
    constructor(t) {
        super();
        this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, t && Object.assign(this, t);
    }

    inRange(t, e, n) {
        const s = this.getProps(['x', 'y'], n), { angle: o, distance: r } = Ed(s, { x: t, y: e }), {
              startAngle: a,
              endAngle: d,
              innerRadius: u,
              outerRadius: l,
              circumference: h
          } = this.getProps(['startAngle', 'endAngle', 'innerRadius', 'outerRadius', 'circumference'], n),
          g = this.options.spacing / 2, m = h >= J || _i(o, a, d), b = r >= u + g && r <= l + g;
        return m && b;
    }

    getCenterPoint(t) {
        const {
            x: e,
            y: n,
            startAngle: s,
            endAngle: o,
            innerRadius: r,
            outerRadius: a
        } = this.getProps(['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius', 'circumference'], t), {
            offset: d,
            spacing: u
        } = this.options, l = (s + o) / 2, h = (r + a + u + d) / 2;
        return { x: e + Math.cos(l) * h, y: n + Math.sin(l) * h };
    }

    tooltipPosition(t) {
        return this.getCenterPoint(t);
    }

    draw(t) {
        const { options: e, circumference: n } = this, s = (e.offset || 0) / 2, o = (e.spacing || 0) / 2;
        if (this.pixelMargin = e.borderAlign === 'inner' ? .33 : 0, this.fullCircles = n > J ? Math.floor(n / J) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0) return;
        t.save();
        let r = 0;
        if (s) {
            r = s / 2;
            const d = (this.startAngle + this.endAngle) / 2;
            t.translate(Math.cos(d) * r, Math.sin(d) * r), this.circumference >= ot && (r = s);
        }
        t.fillStyle = e.backgroundColor, t.strokeStyle = e.borderColor;
        const a = Dl(t, this, r, o);
        Tl(t, this, r, o, a), t.restore();
    }
}

Yi.id = 'arc', Yi.defaults = {
    borderAlign: 'center',
    borderColor: '#fff',
    borderRadius: 0,
    borderWidth: 2,
    offset: 0,
    spacing: 0,
    angle: void 0
}, Yi.defaultRoutes = { backgroundColor: 'backgroundColor' };

function vr(i, t, e = t) {
    i.lineCap = V(e.borderCapStyle, t.borderCapStyle), i.setLineDash(V(e.borderDash, t.borderDash)), i.lineDashOffset = V(e.borderDashOffset, t.borderDashOffset), i.lineJoin = V(e.borderJoinStyle, t.borderJoinStyle), i.lineWidth = V(e.borderWidth, t.borderWidth), i.strokeStyle = V(e.borderColor, t.borderColor);
}

function Ol(i, t, e) {
    i.lineTo(e.x, e.y);
}

function Rl(i) {
    return i.stepped ? Qd : i.tension || i.cubicInterpolationMode === 'monotone' ? tu : Ol;
}

function Mr(i, t, e = {}) {
    const n = i.length, { start: s = 0, end: o = n - 1 } = e, { start: r, end: a } = t, d = Math.max(s, r),
      u = Math.min(o, a), l = s < r && o < r || s > a && o > a;
    return { count: n, start: d, loop: t.loop, ilen: u < d && !l ? n + u - d : u - d };
}

function Fl(i, t, e, n) {
    const { points: s, options: o } = t, { count: r, start: a, loop: d, ilen: u } = Mr(s, e, n), l = Rl(o);
    let { move: h = !0, reverse: g } = n || {}, m, b, x;
    for (m = 0; m <= u; ++m) b = s[(a + (g ? u - m : m)) % r], !b.skip && (h ? (i.moveTo(b.x, b.y), h = !1) : l(i, x, b, g, o.stepped), x = b);
    return d && (b = s[(a + (g ? u : 0)) % r], l(i, x, b, g, o.stepped)), !!d;
}

function Ll(i, t, e, n) {
    const s = t.points, { count: o, start: r, ilen: a } = Mr(s, e, n), { move: d = !0, reverse: u } = n || {};
    let l = 0, h = 0, g, m, b, x, y, v;
    const E = T => (r + (u ? a - T : T)) % o, B = () => {
        x !== y && (i.lineTo(l, y), i.lineTo(l, x), i.lineTo(l, v));
    };
    for (d && (m = s[E(0)], i.moveTo(m.x, m.y)), g = 0; g <= a; ++g) {
        if (m = s[E(g)], m.skip) continue;
        const T = m.x, D = m.y, O = T | 0;
        O === b ? (D < x ? x = D : D > y && (y = D), l = (h * l + T) / ++h) : (B(), i.lineTo(T, D), b = O, h = 0, x = y = D), v = D;
    }
    B();
}

function Qn(i) {
    const t = i.options, e = t.borderDash && t.borderDash.length;
    return !i._decimated && !i._loop && !t.tension && t.cubicInterpolationMode !== 'monotone' && !t.stepped && !e ? Ll : Fl;
}

function Il(i) {
    return i.stepped ? Ru : i.tension || i.cubicInterpolationMode === 'monotone' ? Fu : Qt;
}

function zl(i, t, e, n) {
    let s = t._path;
    s || (s = t._path = new Path2D, t.path(s, e, n) && s.closePath()), vr(i, t.options), i.stroke(s);
}

function Nl(i, t, e, n) {
    const { segments: s, options: o } = t, r = Qn(t);
    for (const a of s) vr(i, o, a.style), i.beginPath(), r(i, t, a, {
        start: e,
        end: e + n - 1
    }) && i.closePath(), i.stroke();
}

const Vl = typeof Path2D == 'function';

function Wl(i, t, e, n) {
    Vl && !t.options.segment ? zl(i, t, e, n) : Nl(i, t, e, n);
}

class Ut extends St {
    constructor(t) {
        super();
        this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
    }

    updateControlPoints(t, e) {
        const n = this.options;
        if ((n.tension || n.cubicInterpolationMode === 'monotone') && !n.stepped && !this._pointsUpdated) {
            const s = n.spanGaps ? this._loop : this._fullLoop;
            Au(this._points, n, t, s, e), this._pointsUpdated = !0;
        }
    }

    set points(t) {
        this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
    }

    get points() {
        return this._points;
    }

    get segments() {
        return this._segments || (this._segments = Hu(this, this.options.segment));
    }

    first() {
        const t = this.segments, e = this.points;
        return t.length && e[t[0].start];
    }

    last() {
        const t = this.segments, e = this.points, n = t.length;
        return n && e[t[n - 1].end];
    }

    interpolate(t, e) {
        const n = this.options, s = t[e], o = this.points, r = To(this, { property: e, start: s, end: s });
        if (!r.length) return;
        const a = [], d = Il(n);
        let u, l;
        for (u = 0, l = r.length; u < l; ++u) {
            const { start: h, end: g } = r[u], m = o[h], b = o[g];
            if (m === b) {
                a.push(m);
                continue;
            }
            const x = Math.abs((s - m[e]) / (b[e] - m[e])), y = d(m, b, x, n.stepped);
            y[e] = t[e], a.push(y);
        }
        return a.length === 1 ? a[0] : a;
    }

    pathSegment(t, e, n) {
        return Qn(this)(t, this, e, n);
    }

    path(t, e, n) {
        const s = this.segments, o = Qn(this);
        let r = this._loop;
        e = e || 0, n = n || this.points.length - e;
        for (const a of s) r &= o(t, this, a, { start: e, end: e + n - 1 });
        return !!r;
    }

    draw(t, e, n, s) {
        const o = this.options || {};
        (this.points || []).length && o.borderWidth && (t.save(), Wl(t, this, n, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
    }
}

Ut.id = 'line', Ut.defaults = {
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: 'default',
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0
}, Ut.defaultRoutes = {
    backgroundColor: 'backgroundColor',
    borderColor: 'borderColor'
}, Ut.descriptors = { _scriptable: !0, _indexable: i => i !== 'borderDash' && i !== 'fill' };

function kr(i, t, e, n) {
    const s = i.options, { [e]: o } = i.getProps([e], n);
    return Math.abs(t - o) < s.radius + s.hitRadius;
}

class Xi extends St {
    constructor(t) {
        super();
        this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t);
    }

    inRange(t, e, n) {
        const s = this.options, { x: o, y: r } = this.getProps(['x', 'y'], n);
        return Math.pow(t - o, 2) + Math.pow(e - r, 2) < Math.pow(s.hitRadius + s.radius, 2);
    }

    inXRange(t, e) {
        return kr(this, t, 'x', e);
    }

    inYRange(t, e) {
        return kr(this, t, 'y', e);
    }

    getCenterPoint(t) {
        const { x: e, y: n } = this.getProps(['x', 'y'], t);
        return { x: e, y: n };
    }

    size(t) {
        t = t || this.options || {};
        let e = t.radius || 0;
        e = Math.max(e, e && t.hoverRadius || 0);
        const n = e && t.borderWidth || 0;
        return (e + n) * 2;
    }

    draw(t, e) {
        const n = this.options;
        this.skip || n.radius < .1 || !Kt(this, e, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, Ai(t, n, this.x, this.y));
    }

    getRange() {
        const t = this.options || {};
        return t.radius + t.hitRadius;
    }
}

Xi.id = 'point', Xi.defaults = {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: 'circle',
    radius: 3,
    rotation: 0
}, Xi.defaultRoutes = { backgroundColor: 'backgroundColor', borderColor: 'borderColor' };

function Sr(i, t) {
    const { x: e, y: n, base: s, width: o, height: r } = i.getProps(['x', 'y', 'base', 'width', 'height'], t);
    let a, d, u, l, h;
    return i.horizontal ? (h = r / 2, a = Math.min(e, s), d = Math.max(e, s), u = n - h, l = n + h) : (h = o / 2, a = e - h, d = e + h, u = Math.min(n, s), l = Math.max(n, s)), {
        left: a,
        top: u,
        right: d,
        bottom: l
    };
}

function $t(i, t, e, n) {
    return i ? 0 : ut(t, e, n);
}

function Hl(i, t, e) {
    const n = i.options.borderWidth, s = i.borderSkipped, o = co(n);
    return {
        t: $t(s.top, o.top, 0, e),
        r: $t(s.right, o.right, 0, t),
        b: $t(s.bottom, o.bottom, 0, e),
        l: $t(s.left, o.left, 0, t)
    };
}

function jl(i, t, e) {
    const { enableBorderRadius: n } = i.getProps(['enableBorderRadius']), s = i.options.borderRadius, o = he(s),
      r = Math.min(t, e), a = i.borderSkipped, d = n || j(s);
    return {
        topLeft: $t(!d || a.top || a.left, o.topLeft, 0, r),
        topRight: $t(!d || a.top || a.right, o.topRight, 0, r),
        bottomLeft: $t(!d || a.bottom || a.left, o.bottomLeft, 0, r),
        bottomRight: $t(!d || a.bottom || a.right, o.bottomRight, 0, r)
    };
}

function Ul(i) {
    const t = Sr(i), e = t.right - t.left, n = t.bottom - t.top, s = Hl(i, e / 2, n / 2), o = jl(i, e / 2, n / 2);
    return {
        outer: { x: t.left, y: t.top, w: e, h: n, radius: o },
        inner: {
            x: t.left + s.l,
            y: t.top + s.t,
            w: e - s.l - s.r,
            h: n - s.t - s.b,
            radius: {
                topLeft: Math.max(0, o.topLeft - Math.max(s.t, s.l)),
                topRight: Math.max(0, o.topRight - Math.max(s.t, s.r)),
                bottomLeft: Math.max(0, o.bottomLeft - Math.max(s.b, s.l)),
                bottomRight: Math.max(0, o.bottomRight - Math.max(s.b, s.r))
            }
        }
    };
}

function ts(i, t, e, n) {
    const s = t === null, o = e === null, a = i && !(s && o) && Sr(i, n);
    return a && (s || t >= a.left && t <= a.right) && (o || e >= a.top && e <= a.bottom);
}

function $l(i) {
    return i.topLeft || i.topRight || i.bottomLeft || i.bottomRight;
}

function Yl(i, t) {
    i.rect(t.x, t.y, t.w, t.h);
}

function es(i, t, e = {}) {
    const n = i.x !== e.x ? -t : 0, s = i.y !== e.y ? -t : 0, o = (i.x + i.w !== e.x + e.w ? t : 0) - n,
      r = (i.y + i.h !== e.y + e.h ? t : 0) - s;
    return { x: i.x + n, y: i.y + s, w: i.w + o, h: i.h + r, radius: i.radius };
}

class qi extends St {
    constructor(t) {
        super();
        this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
    }

    draw(t) {
        const { inflateAmount: e, options: { borderColor: n, backgroundColor: s } } = this, {
            inner: o,
            outer: r
        } = Ul(this), a = $l(r.radius) ? Pi : Yl;
        t.save(), (r.w !== o.w || r.h !== o.h) && (t.beginPath(), a(t, es(r, e, o)), t.clip(), a(t, es(o, -e, r)), t.fillStyle = n, t.fill('evenodd')), t.beginPath(), a(t, es(o, e)), t.fillStyle = s, t.fill(), t.restore();
    }

    inRange(t, e, n) {
        return ts(this, t, e, n);
    }

    inXRange(t, e) {
        return ts(this, t, null, e);
    }

    inYRange(t, e) {
        return ts(this, null, t, e);
    }

    getCenterPoint(t) {
        const { x: e, y: n, base: s, horizontal: o } = this.getProps(['x', 'y', 'base', 'horizontal'], t);
        return { x: o ? (e + s) / 2 : e, y: o ? n : (n + s) / 2 };
    }

    getRange(t) {
        return t === 'x' ? this.width / 2 : this.height / 2;
    }
}

qi.id = 'bar', qi.defaults = {
    borderSkipped: 'start',
    borderWidth: 0,
    borderRadius: 0,
    inflateAmount: 'auto',
    pointStyle: void 0
}, qi.defaultRoutes = { backgroundColor: 'backgroundColor', borderColor: 'borderColor' };
var Xl = Object.freeze({ __proto__: null, ArcElement: Yi, LineElement: Ut, PointElement: Xi, BarElement: qi });

function ql(i, t, e, n, s) {
    const o = s.samples || n;
    if (o >= e) return i.slice(t, t + e);
    const r = [], a = (e - 2) / (o - 2);
    let d = 0;
    const u = t + e - 1;
    let l = t, h, g, m, b, x;
    for (r[d++] = i[l], h = 0; h < o - 2; h++) {
        let y = 0, v = 0, E;
        const B = Math.floor((h + 1) * a) + 1 + t, T = Math.min(Math.floor((h + 2) * a) + 1, e) + t, D = T - B;
        for (E = B; E < T; E++) y += i[E].x, v += i[E].y;
        y /= D, v /= D;
        const O = Math.floor(h * a) + 1 + t, S = Math.min(Math.floor((h + 1) * a) + 1, e) + t, { x: C, y: R } = i[l];
        for (m = b = -1, E = O; E < S; E++) b = .5 * Math.abs((C - y) * (i[E].y - R) - (C - i[E].x) * (v - R)), b > m && (m = b, g = i[E], x = E);
        r[d++] = g, l = x;
    }
    return r[d++] = i[u], r;
}

function Gl(i, t, e, n) {
    let s = 0, o = 0, r, a, d, u, l, h, g, m, b, x;
    const y = [], v = t + e - 1, E = i[t].x, T = i[v].x - E;
    for (r = t; r < t + e; ++r) {
        a = i[r], d = (a.x - E) / T * n, u = a.y;
        const D = d | 0;
        if (D === l) u < b ? (b = u, h = r) : u > x && (x = u, g = r), s = (o * s + a.x) / ++o; else {
            const O = r - 1;
            if (!X(h) && !X(g)) {
                const S = Math.min(h, g), C = Math.max(h, g);
                S !== m && S !== O && y.push({ ...i[S], x: s }), C !== m && C !== O && y.push({ ...i[C], x: s });
            }
            r > 0 && O !== m && y.push(i[O]), y.push(a), l = D, o = 0, b = x = u, h = g = m = r;
        }
    }
    return y;
}

function Ar(i) {
    if (i._decimated) {
        const t = i._data;
        delete i._decimated, delete i._data, Object.defineProperty(i, 'data', { value: t });
    }
}

function Cr(i) {
    i.data.datasets.forEach(t => {
        Ar(t);
    });
}

function Kl(i, t) {
    const e = t.length;
    let n = 0, s;
    const { iScale: o } = i, { min: r, max: a, minDefined: d, maxDefined: u } = o.getUserBounds();
    return d && (n = ut(Ot(t, o.axis, r).lo, 0, e - 1)), u ? s = ut(Ot(t, o.axis, a).hi + 1, n, e) - n : s = e - n, {
        start: n,
        count: s
    };
}

var Zl = {
    id: 'decimation', defaults: { algorithm: 'min-max', enabled: !1 }, beforeElementsUpdate: (i, t, e) => {
        if (!e.enabled) {
            Cr(i);
            return;
        }
        const n = i.width;
        i.data.datasets.forEach((s, o) => {
            const { _data: r, indexAxis: a } = s, d = i.getDatasetMeta(o), u = r || s.data;
            if (Fe([a, i.options.indexAxis]) === 'y' || d.type !== 'line') return;
            const l = i.scales[d.xAxisID];
            if (l.type !== 'linear' && l.type !== 'time' || i.options.parsing) return;
            let { start: h, count: g } = Kl(d, u);
            const m = e.threshold || 4 * n;
            if (g <= m) {
                Ar(s);
                return;
            }
            X(r) && (s._data = u, delete s.data, Object.defineProperty(s, 'data', {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return this._decimated;
                },
                set: function(x) {
                    this._data = x;
                }
            }));
            let b;
            switch (e.algorithm) {
                case'lttb':
                    b = ql(u, h, g, n, e);
                    break;
                case'min-max':
                    b = Gl(u, h, g, n);
                    break;
                default:
                    throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`);
            }
            s._decimated = b;
        });
    }, destroy(i) {
        Cr(i);
    }
};

function Jl(i, t) {
    const e = i.getDatasetMeta(t);
    return e && i.isDatasetVisible(t) ? e.dataset : null;
}

function Ql(i) {
    const t = i.options, e = t.fill;
    let n = V(e && e.target, e);
    return n === void 0 && (n = !!t.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? 'origin' : n;
}

function tf(i, t, e) {
    const n = Ql(i);
    if (j(n)) return isNaN(n.value) ? !1 : n;
    let s = parseFloat(n);
    return rt(s) && Math.floor(s) === s ? ((n[0] === '-' || n[0] === '+') && (s = t + s), s === t || s < 0 || s >= e ? !1 : s) : ['origin', 'start', 'end', 'stack', 'shape'].indexOf(n) >= 0 && n;
}

function ef(i) {
    const { scale: t = {}, fill: e } = i;
    let n = null, s;
    return e === 'start' ? n = t.bottom : e === 'end' ? n = t.top : j(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), rt(n) ? (s = t.isHorizontal(), {
        x: s ? n : null,
        y: s ? null : n
    }) : null;
}

class Er {
    constructor(t) {
        this.x = t.x, this.y = t.y, this.radius = t.radius;
    }

    pathSegment(t, e, n) {
        const { x: s, y: o, radius: r } = this;
        return e = e || { start: 0, end: J }, t.arc(s, o, r, e.end, e.start, !0), !n.bounds;
    }

    interpolate(t) {
        const { x: e, y: n, radius: s } = this, o = t.angle;
        return { x: e + Math.cos(o) * s, y: n + Math.sin(o) * s, angle: o };
    }
}

function nf(i) {
    const { scale: t, fill: e } = i, n = t.options, s = t.getLabels().length, o = [], r = n.reverse ? t.max : t.min,
      a = n.reverse ? t.min : t.max;
    let d, u, l;
    if (e === 'start' ? l = r : e === 'end' ? l = a : j(e) ? l = e.value : l = t.getBaseValue(), n.grid.circular) return u = t.getPointPositionForValue(0, r), new Er({
        x: u.x,
        y: u.y,
        radius: t.getDistanceFromCenterForValue(l)
    });
    for (d = 0; d < s; ++d) o.push(t.getPointPositionForValue(d, l));
    return o;
}

function sf(i) {
    return (i.scale || {}).getPointPositionForValue ? nf(i) : ef(i);
}

function Pr(i, t, e) {
    for (; t > i; t--) {
        const n = e[t];
        if (!isNaN(n.x) && !isNaN(n.y)) break;
    }
    return t;
}

function of(i, t) {
    const { x: e = null, y: n = null } = i || {}, s = t.points, o = [];
    return t.segments.forEach(({ start: r, end: a }) => {
        a = Pr(r, a, s);
        const d = s[r], u = s[a];
        n !== null ? (o.push({ x: d.x, y: n }), o.push({ x: u.x, y: n })) : e !== null && (o.push({
            x: e,
            y: d.y
        }), o.push({ x: e, y: u.y }));
    }), o;
}

function rf(i) {
    const { scale: t, index: e, line: n } = i, s = [], o = n.segments, r = n.points, a = af(t, e);
    a.push(Dr({ x: null, y: t.bottom }, n));
    for (let d = 0; d < o.length; d++) {
        const u = o[d];
        for (let l = u.start; l <= u.end; l++) df(s, r[l], a);
    }
    return new Ut({ points: s, options: {} });
}

function af(i, t) {
    const e = [], n = i.getMatchingVisibleMetas('line');
    for (let s = 0; s < n.length; s++) {
        const o = n[s];
        if (o.index === t) break;
        o.hidden || e.unshift(o.dataset);
    }
    return e;
}

function df(i, t, e) {
    const n = [];
    for (let s = 0; s < e.length; s++) {
        const o = e[s], { first: r, last: a, point: d } = uf(o, t, 'x');
        if (!(!d || r && a)) {
            if (r) n.unshift(d); else if (i.push(d), !a) break;
        }
    }
    i.push(...n);
}

function uf(i, t, e) {
    const n = i.interpolate(t, e);
    if (!n) return {};
    const s = n[e], o = i.segments, r = i.points;
    let a = !1, d = !1;
    for (let u = 0; u < o.length; u++) {
        const l = o[u], h = r[l.start][e], g = r[l.end][e];
        if (s >= h && s <= g) {
            a = s === h, d = s === g;
            break;
        }
    }
    return { first: a, last: d, point: n };
}

function cf(i) {
    const { chart: t, fill: e, line: n } = i;
    if (rt(e)) return Jl(t, e);
    if (e === 'stack') return rf(i);
    if (e === 'shape') return !0;
    const s = sf(i);
    return s instanceof Er ? s : Dr(s, n);
}

function Dr(i, t) {
    let e = [], n = !1;
    return Q(i) ? (n = !0, e = i) : e = of(i, t), e.length ? new Ut({
        points: e,
        options: { tension: 0 },
        _loop: n,
        _fullLoop: n
    }) : null;
}

function lf(i, t, e) {
    let s = i[t].fill;
    const o = [t];
    let r;
    if (!e) return s;
    for (; s !== !1 && o.indexOf(s) === -1;) {
        if (!rt(s)) return s;
        if (r = i[s], !r) return !1;
        if (r.visible) return s;
        o.push(s), s = r.fill;
    }
    return !1;
}

function Br(i, t, e) {
    i.beginPath(), t.path(i), i.lineTo(t.last().x, e), i.lineTo(t.first().x, e), i.closePath(), i.clip();
}

function is(i, t, e, n) {
    if (n) return;
    let s = t[i], o = e[i];
    return i === 'angle' && (s = kt(s), o = kt(o)), { property: i, start: s, end: o };
}

function Tr(i, t, e, n) {
    return i && t ? n(i[e], t[e]) : i ? i[e] : t ? t[e] : 0;
}

function ff(i, t, e) {
    const n = i.segments, s = i.points, o = t.points, r = [];
    for (const a of n) {
        let { start: d, end: u } = a;
        u = Pr(d, u, s);
        const l = is(e, s[d], s[u], a.loop);
        if (!t.segments) {
            r.push({ source: a, target: l, start: s[d], end: s[u] });
            continue;
        }
        const h = To(t, l);
        for (const g of h) {
            const m = is(e, o[g.start], o[g.end], g.loop), b = Bo(a, s, m);
            for (const x of b) r.push({
                source: x,
                target: g,
                start: { [e]: Tr(l, m, 'start', Math.max) },
                end: { [e]: Tr(l, m, 'end', Math.min) }
            });
        }
    }
    return r;
}

function hf(i, t, e) {
    const { top: n, bottom: s } = t.chart.chartArea, { property: o, start: r, end: a } = e || {};
    o === 'x' && (i.beginPath(), i.rect(r, n, a - r, s - n), i.clip());
}

function Or(i, t, e, n) {
    const s = t.interpolate(e, n);
    s && i.lineTo(s.x, s.y);
}

function Rr(i, t) {
    const { line: e, target: n, property: s, color: o, scale: r } = t, a = ff(e, n, s);
    for (const { source: d, target: u, start: l, end: h } of a) {
        const { style: { backgroundColor: g = o } = {} } = d, m = n !== !0;
        i.save(), i.fillStyle = g, hf(i, r, m && is(s, l, h)), i.beginPath();
        const b = !!e.pathSegment(i, d);
        let x;
        if (m) {
            b ? i.closePath() : Or(i, n, h, s);
            const y = !!n.pathSegment(i, u, { move: b, reverse: !0 });
            x = b && y, x || Or(i, n, l, s);
        }
        i.closePath(), i.fill(x ? 'evenodd' : 'nonzero'), i.restore();
    }
}

function gf(i, t) {
    const { line: e, target: n, above: s, below: o, area: r, scale: a } = t, d = e._loop ? 'angle' : t.axis;
    i.save(), d === 'x' && o !== s && (Br(i, n, r.top), Rr(i, {
        line: e,
        target: n,
        color: s,
        scale: a,
        property: d
    }), i.restore(), i.save(), Br(i, n, r.bottom)), Rr(i, {
        line: e,
        target: n,
        color: o,
        scale: a,
        property: d
    }), i.restore();
}

function ns(i, t, e) {
    const n = cf(t), { line: s, scale: o, axis: r } = t, a = s.options, d = a.fill,
      u = a.backgroundColor, { above: l = u, below: h = u } = d || {};
    n && s.points.length && (Ci(i, e), gf(i, {
        line: s,
        target: n,
        above: l,
        below: h,
        area: e,
        scale: o,
        axis: r
    }), Ei(i));
}

var pf = {
    id: 'filler', afterDatasetsUpdate(i, t, e) {
        const n = (i.data.datasets || []).length, s = [];
        let o, r, a, d;
        for (r = 0; r < n; ++r) o = i.getDatasetMeta(r), a = o.dataset, d = null, a && a.options && a instanceof Ut && (d = {
            visible: i.isDatasetVisible(r),
            index: r,
            fill: tf(a, r, n),
            chart: i,
            axis: o.controller.options.indexAxis,
            scale: o.vScale,
            line: a
        }), o.$filler = d, s.push(d);
        for (r = 0; r < n; ++r) d = s[r], !(!d || d.fill === !1) && (d.fill = lf(s, r, e.propagate));
    }, beforeDraw(i, t, e) {
        const n = e.drawTime === 'beforeDraw', s = i.getSortedVisibleDatasetMetas(), o = i.chartArea;
        for (let r = s.length - 1; r >= 0; --r) {
            const a = s[r].$filler;
            !a || (a.line.updateControlPoints(o, a.axis), n && ns(i.ctx, a, o));
        }
    }, beforeDatasetsDraw(i, t, e) {
        if (e.drawTime !== 'beforeDatasetsDraw') return;
        const n = i.getSortedVisibleDatasetMetas();
        for (let s = n.length - 1; s >= 0; --s) {
            const o = n[s].$filler;
            o && ns(i.ctx, o, i.chartArea);
        }
    }, beforeDatasetDraw(i, t, e) {
        const n = t.meta.$filler;
        !n || n.fill === !1 || e.drawTime !== 'beforeDatasetDraw' || ns(i.ctx, n, i.chartArea);
    }, defaults: { propagate: !0, drawTime: 'beforeDatasetDraw' }
};
const Fr = (i, t) => {
    let { boxHeight: e = t, boxWidth: n = t } = i;
    return i.usePointStyle && (e = Math.min(e, t), n = Math.min(n, t)), {
        boxWidth: n,
        boxHeight: e,
        itemHeight: Math.max(t, e)
    };
}, mf = (i, t) => i !== null && t !== null && i.datasetIndex === t.datasetIndex && i.index === t.index;

class Lr extends St {
    constructor(t) {
        super();
        this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
    }

    update(t, e, n) {
        this.maxWidth = t, this.maxHeight = e, this._margins = n, this.setDimensions(), this.buildLabels(), this.fit();
    }

    setDimensions() {
        this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
    }

    buildLabels() {
        const t = this.options.labels || {};
        let e = tt(t.generateLabels, [this.chart], this) || [];
        t.filter && (e = e.filter(n => t.filter(n, this.chart.data))), t.sort && (e = e.sort((n, s) => t.sort(n, s, this.chart.data))), this.options.reverse && e.reverse(), this.legendItems = e;
    }

    fit() {
        const { options: t, ctx: e } = this;
        if (!t.display) {
            this.width = this.height = 0;
            return;
        }
        const n = t.labels, s = dt(n.font), o = s.size, r = this._computeTitleHeight(), {
            boxWidth: a,
            itemHeight: d
        } = Fr(n, o);
        let u, l;
        e.font = s.string, this.isHorizontal() ? (u = this.maxWidth, l = this._fitRows(r, o, a, d) + 10) : (l = this.maxHeight, u = this._fitCols(r, o, a, d) + 10), this.width = Math.min(u, t.maxWidth || this.maxWidth), this.height = Math.min(l, t.maxHeight || this.maxHeight);
    }

    _fitRows(t, e, n, s) {
        const { ctx: o, maxWidth: r, options: { labels: { padding: a } } } = this, d = this.legendHitBoxes = [],
          u = this.lineWidths = [0], l = s + a;
        let h = t;
        o.textAlign = 'left', o.textBaseline = 'middle';
        let g = -1, m = -l;
        return this.legendItems.forEach((b, x) => {
            const y = n + e / 2 + o.measureText(b.text).width;
            (x === 0 || u[u.length - 1] + y + 2 * a > r) && (h += l, u[u.length - (x > 0 ? 0 : 1)] = 0, m += l, g++), d[x] = {
                left: 0,
                top: m,
                row: g,
                width: y,
                height: s
            }, u[u.length - 1] += y + a;
        }), h;
    }

    _fitCols(t, e, n, s) {
        const { ctx: o, maxHeight: r, options: { labels: { padding: a } } } = this, d = this.legendHitBoxes = [],
          u = this.columnSizes = [], l = r - t;
        let h = a, g = 0, m = 0, b = 0, x = 0;
        return this.legendItems.forEach((y, v) => {
            const E = n + e / 2 + o.measureText(y.text).width;
            v > 0 && m + s + 2 * a > l && (h += g + a, u.push({
                width: g,
                height: m
            }), b += g + a, x++, g = m = 0), d[v] = {
                left: b,
                top: m,
                col: x,
                width: E,
                height: s
            }, g = Math.max(g, E), m += s + a;
        }), h += g, u.push({ width: g, height: m }), h;
    }

    adjustHitBoxes() {
        if (!this.options.display) return;
        const t = this._computeTitleHeight(), {
            legendHitBoxes: e,
            options: { align: n, labels: { padding: s }, rtl: o }
        } = this, r = me(o, this.left, this.width);
        if (this.isHorizontal()) {
            let a = 0, d = lt(n, this.left + s, this.right - this.lineWidths[a]);
            for (const u of e) a !== u.row && (a = u.row, d = lt(n, this.left + s, this.right - this.lineWidths[a])), u.top += this.top + t + s, u.left = r.leftForLtr(r.x(d), u.width), d += u.width + s;
        } else {
            let a = 0, d = lt(n, this.top + t + s, this.bottom - this.columnSizes[a].height);
            for (const u of e) u.col !== a && (a = u.col, d = lt(n, this.top + t + s, this.bottom - this.columnSizes[a].height)), u.top = d, u.left += this.left + s, u.left = r.leftForLtr(r.x(u.left), u.width), d += u.height + s;
        }
    }

    isHorizontal() {
        return this.options.position === 'top' || this.options.position === 'bottom';
    }

    draw() {
        if (this.options.display) {
            const t = this.ctx;
            Ci(t, this), this._draw(), Ei(t);
        }
    }

    _draw() {
        const { options: t, columnSizes: e, lineWidths: n, ctx: s } = this, { align: o, labels: r } = t, a = $.color,
          d = me(t.rtl, this.left, this.width), u = dt(r.font), { color: l, padding: h } = r, g = u.size, m = g / 2;
        let b;
        this.drawTitle(), s.textAlign = d.textAlign('left'), s.textBaseline = 'middle', s.lineWidth = .5, s.font = u.string;
        const { boxWidth: x, boxHeight: y, itemHeight: v } = Fr(r, g), E = function(S, C, R) {
            if (isNaN(x) || x <= 0 || isNaN(y) || y < 0) return;
            s.save();
            const z = V(R.lineWidth, 1);
            if (s.fillStyle = V(R.fillStyle, a), s.lineCap = V(R.lineCap, 'butt'), s.lineDashOffset = V(R.lineDashOffset, 0), s.lineJoin = V(R.lineJoin, 'miter'), s.lineWidth = z, s.strokeStyle = V(R.strokeStyle, a), s.setLineDash(V(R.lineDash, [])), r.usePointStyle) {
                const L = {
                    radius: x * Math.SQRT2 / 2,
                    pointStyle: R.pointStyle,
                    rotation: R.rotation,
                    borderWidth: z
                }, I = d.xPlus(S, x / 2), U = C + m;
                Ai(s, L, I, U);
            } else {
                const L = C + Math.max((g - y) / 2, 0), I = d.leftForLtr(S, x), U = he(R.borderRadius);
                s.beginPath(), Object.values(U).some(M => M !== 0) ? Pi(s, {
                    x: I,
                    y: L,
                    w: x,
                    h: y,
                    radius: U
                }) : s.rect(I, L, x, y), s.fill(), z !== 0 && s.stroke();
            }
            s.restore();
        }, B = function(S, C, R) {
            Zt(s, R.text, S, C + v / 2, u, { strikethrough: R.hidden, textAlign: d.textAlign(R.textAlign) });
        }, T = this.isHorizontal(), D = this._computeTitleHeight();
        T ? b = { x: lt(o, this.left + h, this.right - n[0]), y: this.top + h + D, line: 0 } : b = {
            x: this.left + h,
            y: lt(o, this.top + D + h, this.bottom - e[0].height),
            line: 0
        }, Co(this.ctx, t.textDirection);
        const O = v + h;
        this.legendItems.forEach((S, C) => {
            s.strokeStyle = S.fontColor || l, s.fillStyle = S.fontColor || l;
            const R = s.measureText(S.text).width, z = d.textAlign(S.textAlign || (S.textAlign = r.textAlign)),
              L = x + m + R;
            let I = b.x, U = b.y;
            d.setWidth(this.width), T ? C > 0 && I + L + h > this.right && (U = b.y += O, b.line++, I = b.x = lt(o, this.left + h, this.right - n[b.line])) : C > 0 && U + O > this.bottom && (I = b.x = I + e[b.line].width + h, b.line++, U = b.y = lt(o, this.top + D + h, this.bottom - e[b.line].height));
            const M = d.x(I);
            E(M, U, S), I = md(z, I + x + m, T ? I + L : this.right, t.rtl), B(d.x(I), U, S), T ? b.x += L + h : b.y += O;
        }), Eo(this.ctx, t.textDirection);
    }

    drawTitle() {
        const t = this.options, e = t.title, n = dt(e.font), s = ht(e.padding);
        if (!e.display) return;
        const o = me(t.rtl, this.left, this.width), r = this.ctx, a = e.position, d = n.size / 2, u = s.top + d;
        let l, h = this.left, g = this.width;
        if (this.isHorizontal()) g = Math.max(...this.lineWidths), l = this.top + u, h = lt(t.align, h, this.right - g); else {
            const b = this.columnSizes.reduce((x, y) => Math.max(x, y.height), 0);
            l = u + lt(t.align, this.top, this.bottom - b - t.labels.padding - this._computeTitleHeight());
        }
        const m = lt(a, h, h + g);
        r.textAlign = o.textAlign(kn(a)), r.textBaseline = 'middle', r.strokeStyle = e.color, r.fillStyle = e.color, r.font = n.string, Zt(r, e.text, m, l, n);
    }

    _computeTitleHeight() {
        const t = this.options.title, e = dt(t.font), n = ht(t.padding);
        return t.display ? e.lineHeight + n.height : 0;
    }

    _getLegendItemAt(t, e) {
        let n, s, o;
        if (t >= this.left && t <= this.right && e >= this.top && e <= this.bottom) {
            for (o = this.legendHitBoxes, n = 0; n < o.length; ++n) if (s = o[n], t >= s.left && t <= s.left + s.width && e >= s.top && e <= s.top + s.height) return this.legendItems[n];
        }
        return null;
    }

    handleEvent(t) {
        const e = this.options;
        if (!bf(t.type, e)) return;
        const n = this._getLegendItemAt(t.x, t.y);
        if (t.type === 'mousemove') {
            const s = this._hoveredItem, o = mf(s, n);
            s && !o && tt(e.onLeave, [t, s, this], this), this._hoveredItem = n, n && !o && tt(e.onHover, [t, n, this], this);
        } else n && tt(e.onClick, [t, n, this], this);
    }
}

function bf(i, t) {
    return !!(i === 'mousemove' && (t.onHover || t.onLeave) || t.onClick && (i === 'click' || i === 'mouseup'));
}

var _f = {
    id: 'legend',
    _element: Lr,
    start(i, t, e) {
        const n = i.legend = new Lr({ ctx: i.ctx, options: e, chart: i });
        ft.configure(i, n, e), ft.addBox(i, n);
    },
    stop(i) {
        ft.removeBox(i, i.legend), delete i.legend;
    },
    beforeUpdate(i, t, e) {
        const n = i.legend;
        ft.configure(i, n, e), n.options = e;
    },
    afterUpdate(i) {
        const t = i.legend;
        t.buildLabels(), t.adjustHitBoxes();
    },
    afterEvent(i, t) {
        t.replay || i.legend.handleEvent(t.event);
    },
    defaults: {
        display: !0,
        position: 'top',
        align: 'center',
        fullSize: !0,
        reverse: !1,
        weight: 1e3,
        onClick(i, t, e) {
            const n = t.datasetIndex, s = e.chart;
            s.isDatasetVisible(n) ? (s.hide(n), t.hidden = !0) : (s.show(n), t.hidden = !1);
        },
        onHover: null,
        onLeave: null,
        labels: {
            color: i => i.chart.options.color, boxWidth: 40, padding: 10, generateLabels(i) {
                const t = i.data.datasets, {
                    labels: {
                        usePointStyle: e,
                        pointStyle: n,
                        textAlign: s,
                        color: o
                    }
                } = i.legend.options;
                return i._getSortedDatasetMetas().map(r => {
                    const a = r.controller.getStyle(e ? 0 : void 0), d = ht(a.borderWidth);
                    return {
                        text: t[r.index].label,
                        fillStyle: a.backgroundColor,
                        fontColor: o,
                        hidden: !r.visible,
                        lineCap: a.borderCapStyle,
                        lineDash: a.borderDash,
                        lineDashOffset: a.borderDashOffset,
                        lineJoin: a.borderJoinStyle,
                        lineWidth: (d.width + d.height) / 4,
                        strokeStyle: a.borderColor,
                        pointStyle: n || a.pointStyle,
                        rotation: a.rotation,
                        textAlign: s || a.textAlign,
                        borderRadius: 0,
                        datasetIndex: r.index
                    };
                }, this);
            }
        },
        title: { color: i => i.chart.options.color, display: !1, position: 'center', text: '' }
    },
    descriptors: {
        _scriptable: i => !i.startsWith('on'),
        labels: { _scriptable: i => !['generateLabels', 'filter', 'sort'].includes(i) }
    }
};

class ss extends St {
    constructor(t) {
        super();
        this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
    }

    update(t, e) {
        const n = this.options;
        if (this.left = 0, this.top = 0, !n.display) {
            this.width = this.height = this.right = this.bottom = 0;
            return;
        }
        this.width = this.right = t, this.height = this.bottom = e;
        const s = Q(n.text) ? n.text.length : 1;
        this._padding = ht(n.padding);
        const o = s * dt(n.font).lineHeight + this._padding.height;
        this.isHorizontal() ? this.height = o : this.width = o;
    }

    isHorizontal() {
        const t = this.options.position;
        return t === 'top' || t === 'bottom';
    }

    _drawArgs(t) {
        const { top: e, left: n, bottom: s, right: o, options: r } = this, a = r.align;
        let d = 0, u, l, h;
        return this.isHorizontal() ? (l = lt(a, n, o), h = e + t, u = o - n) : (r.position === 'left' ? (l = n + t, h = lt(a, s, e), d = ot * -.5) : (l = o - t, h = lt(a, e, s), d = ot * .5), u = s - e), {
            titleX: l,
            titleY: h,
            maxWidth: u,
            rotation: d
        };
    }

    draw() {
        const t = this.ctx, e = this.options;
        if (!e.display) return;
        const n = dt(e.font), o = n.lineHeight / 2 + this._padding.top, {
            titleX: r,
            titleY: a,
            maxWidth: d,
            rotation: u
        } = this._drawArgs(o);
        Zt(t, e.text, 0, 0, n, {
            color: e.color,
            maxWidth: d,
            rotation: u,
            textAlign: kn(e.align),
            textBaseline: 'middle',
            translation: [r, a]
        });
    }
}

function xf(i, t) {
    const e = new ss({ ctx: i.ctx, options: t, chart: i });
    ft.configure(i, e, t), ft.addBox(i, e), i.titleBlock = e;
}

var yf = {
    id: 'title',
    _element: ss,
    start(i, t, e) {
        xf(i, e);
    },
    stop(i) {
        const t = i.titleBlock;
        ft.removeBox(i, t), delete i.titleBlock;
    },
    beforeUpdate(i, t, e) {
        const n = i.titleBlock;
        ft.configure(i, n, e), n.options = e;
    },
    defaults: {
        align: 'center',
        display: !1,
        font: { weight: 'bold' },
        fullSize: !0,
        padding: 10,
        position: 'top',
        text: '',
        weight: 2e3
    },
    defaultRoutes: { color: 'color' },
    descriptors: { _scriptable: !0, _indexable: !1 }
};
const Gi = new WeakMap;
var wf = {
    id: 'subtitle',
    start(i, t, e) {
        const n = new ss({ ctx: i.ctx, options: e, chart: i });
        ft.configure(i, n, e), ft.addBox(i, n), Gi.set(i, n);
    },
    stop(i) {
        ft.removeBox(i, Gi.get(i)), Gi.delete(i);
    },
    beforeUpdate(i, t, e) {
        const n = Gi.get(i);
        ft.configure(i, n, e), n.options = e;
    },
    defaults: {
        align: 'center',
        display: !1,
        font: { weight: 'normal' },
        fullSize: !0,
        padding: 0,
        position: 'top',
        text: '',
        weight: 1500
    },
    defaultRoutes: { color: 'color' },
    descriptors: { _scriptable: !0, _indexable: !1 }
};
const Ye = {
    average(i) {
        if (!i.length) return !1;
        let t, e, n = 0, s = 0, o = 0;
        for (t = 0, e = i.length; t < e; ++t) {
            const r = i[t].element;
            if (r && r.hasValue()) {
                const a = r.tooltipPosition();
                n += a.x, s += a.y, ++o;
            }
        }
        return { x: n / o, y: s / o };
    }, nearest(i, t) {
        if (!i.length) return !1;
        let e = t.x, n = t.y, s = Number.POSITIVE_INFINITY, o, r, a;
        for (o = 0, r = i.length; o < r; ++o) {
            const d = i[o].element;
            if (d && d.hasValue()) {
                const u = d.getCenterPoint(), l = Cn(t, u);
                l < s && (s = l, a = d);
            }
        }
        if (a) {
            const d = a.tooltipPosition();
            e = d.x, n = d.y;
        }
        return { x: e, y: n };
    }
};

function Dt(i, t) {
    return t && (Q(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i;
}

function Lt(i) {
    return (typeof i == 'string' || i instanceof String) && i.indexOf(`
`) > -1 ? i.split(`
`) : i;
}

function vf(i, t) {
    const { element: e, datasetIndex: n, index: s } = t, o = i.getDatasetMeta(n).controller, {
        label: r,
        value: a
    } = o.getLabelAndValue(s);
    return {
        chart: i,
        label: r,
        parsed: o.getParsed(s),
        raw: i.data.datasets[n].data[s],
        formattedValue: a,
        dataset: o.getDataset(),
        dataIndex: s,
        datasetIndex: n,
        element: e
    };
}

function Ir(i, t) {
    const e = i._chart.ctx, { body: n, footer: s, title: o } = i, { boxWidth: r, boxHeight: a } = t, d = dt(t.bodyFont),
      u = dt(t.titleFont), l = dt(t.footerFont), h = o.length, g = s.length, m = n.length, b = ht(t.padding);
    let x = b.height, y = 0, v = n.reduce((T, D) => T + D.before.length + D.lines.length + D.after.length, 0);
    if (v += i.beforeBody.length + i.afterBody.length, h && (x += h * u.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), v) {
        const T = t.displayColors ? Math.max(a, d.lineHeight) : d.lineHeight;
        x += m * T + (v - m) * d.lineHeight + (v - 1) * t.bodySpacing;
    }
    g && (x += t.footerMarginTop + g * l.lineHeight + (g - 1) * t.footerSpacing);
    let E = 0;
    const B = function(T) {
        y = Math.max(y, e.measureText(T).width + E);
    };
    return e.save(), e.font = u.string, G(i.title, B), e.font = d.string, G(i.beforeBody.concat(i.afterBody), B), E = t.displayColors ? r + 2 + t.boxPadding : 0, G(n, T => {
        G(T.before, B), G(T.lines, B), G(T.after, B);
    }), E = 0, e.font = l.string, G(i.footer, B), e.restore(), y += b.width, { width: y, height: x };
}

function Mf(i, t) {
    const { y: e, height: n } = t;
    return e < n / 2 ? 'top' : e > i.height - n / 2 ? 'bottom' : 'center';
}

function kf(i, t, e, n) {
    const { x: s, width: o } = n, r = e.caretSize + e.caretPadding;
    if (i === 'left' && s + o + r > t.width || i === 'right' && s - o - r < 0) return !0;
}

function Sf(i, t, e, n) {
    const { x: s, width: o } = e, { width: r, chartArea: { left: a, right: d } } = i;
    let u = 'center';
    return n === 'center' ? u = s <= (a + d) / 2 ? 'left' : 'right' : s <= o / 2 ? u = 'left' : s >= r - o / 2 && (u = 'right'), kf(u, i, t, e) && (u = 'center'), u;
}

function zr(i, t, e) {
    const n = t.yAlign || Mf(i, e);
    return { xAlign: t.xAlign || Sf(i, t, e, n), yAlign: n };
}

function Af(i, t) {
    let { x: e, width: n } = i;
    return t === 'right' ? e -= n : t === 'center' && (e -= n / 2), e;
}

function Cf(i, t, e) {
    let { y: n, height: s } = i;
    return t === 'top' ? n += e : t === 'bottom' ? n -= s + e : n -= s / 2, n;
}

function Nr(i, t, e, n) {
    const { caretSize: s, caretPadding: o, cornerRadius: r } = i, { xAlign: a, yAlign: d } = e, u = s + o, {
        topLeft: l,
        topRight: h,
        bottomLeft: g,
        bottomRight: m
    } = he(r);
    let b = Af(t, a);
    const x = Cf(t, d, u);
    return d === 'center' ? a === 'left' ? b += u : a === 'right' && (b -= u) : a === 'left' ? b -= Math.max(l, g) + o : a === 'right' && (b += Math.max(h, m) + o), {
        x: ut(b, 0, n.width - t.width),
        y: ut(x, 0, n.height - t.height)
    };
}

function Ki(i, t, e) {
    const n = ht(e.padding);
    return t === 'center' ? i.x + i.width / 2 : t === 'right' ? i.x + i.width - n.right : i.x + n.left;
}

function Vr(i) {
    return Dt([], Lt(i));
}

function Ef(i, t, e) {
    return Ht(i, { tooltip: t, tooltipItems: e, type: 'tooltip' });
}

function Wr(i, t) {
    const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
    return e ? i.override(e) : i;
}

class os extends St {
    constructor(t) {
        super();
        this.opacity = 0, this._active = [], this._chart = t._chart, this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
    }

    initialize(t) {
        this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
    }

    _resolveAnimations() {
        const t = this._cachedAnimations;
        if (t) return t;
        const e = this._chart, n = this.options.setContext(this.getContext()),
          s = n.enabled && e.options.animation && n.animations, o = new Lo(this._chart, s);
        return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
    }

    getContext() {
        return this.$context || (this.$context = Ef(this._chart.getContext(), this, this._tooltipItems));
    }

    getTitle(t, e) {
        const { callbacks: n } = e, s = n.beforeTitle.apply(this, [t]), o = n.title.apply(this, [t]),
          r = n.afterTitle.apply(this, [t]);
        let a = [];
        return a = Dt(a, Lt(s)), a = Dt(a, Lt(o)), a = Dt(a, Lt(r)), a;
    }

    getBeforeBody(t, e) {
        return Vr(e.callbacks.beforeBody.apply(this, [t]));
    }

    getBody(t, e) {
        const { callbacks: n } = e, s = [];
        return G(t, o => {
            const r = { before: [], lines: [], after: [] }, a = Wr(n, o);
            Dt(r.before, Lt(a.beforeLabel.call(this, o))), Dt(r.lines, a.label.call(this, o)), Dt(r.after, Lt(a.afterLabel.call(this, o))), s.push(r);
        }), s;
    }

    getAfterBody(t, e) {
        return Vr(e.callbacks.afterBody.apply(this, [t]));
    }

    getFooter(t, e) {
        const { callbacks: n } = e, s = n.beforeFooter.apply(this, [t]), o = n.footer.apply(this, [t]),
          r = n.afterFooter.apply(this, [t]);
        let a = [];
        return a = Dt(a, Lt(s)), a = Dt(a, Lt(o)), a = Dt(a, Lt(r)), a;
    }

    _createItems(t) {
        const e = this._active, n = this._chart.data, s = [], o = [], r = [];
        let a = [], d, u;
        for (d = 0, u = e.length; d < u; ++d) a.push(vf(this._chart, e[d]));
        return t.filter && (a = a.filter((l, h, g) => t.filter(l, h, g, n))), t.itemSort && (a = a.sort((l, h) => t.itemSort(l, h, n))), G(a, l => {
            const h = Wr(t.callbacks, l);
            s.push(h.labelColor.call(this, l)), o.push(h.labelPointStyle.call(this, l)), r.push(h.labelTextColor.call(this, l));
        }), this.labelColors = s, this.labelPointStyles = o, this.labelTextColors = r, this.dataPoints = a, a;
    }

    update(t, e) {
        const n = this.options.setContext(this.getContext()), s = this._active;
        let o, r = [];
        if (!s.length) this.opacity !== 0 && (o = { opacity: 0 }); else {
            const a = Ye[n.position].call(this, s, this._eventPosition);
            r = this._createItems(n), this.title = this.getTitle(r, n), this.beforeBody = this.getBeforeBody(r, n), this.body = this.getBody(r, n), this.afterBody = this.getAfterBody(r, n), this.footer = this.getFooter(r, n);
            const d = this._size = Ir(this, n), u = Object.assign({}, a, d), l = zr(this._chart, n, u),
              h = Nr(n, u, l, this._chart);
            this.xAlign = l.xAlign, this.yAlign = l.yAlign, o = {
                opacity: 1,
                x: h.x,
                y: h.y,
                width: d.width,
                height: d.height,
                caretX: a.x,
                caretY: a.y
            };
        }
        this._tooltipItems = r, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && n.external && n.external.call(this, {
            chart: this._chart,
            tooltip: this,
            replay: e
        });
    }

    drawCaret(t, e, n, s) {
        const o = this.getCaretPosition(t, n, s);
        e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3);
    }

    getCaretPosition(t, e, n) {
        const { xAlign: s, yAlign: o } = this, { caretSize: r, cornerRadius: a } = n, {
            topLeft: d,
            topRight: u,
            bottomLeft: l,
            bottomRight: h
        } = he(a), { x: g, y: m } = t, { width: b, height: x } = e;
        let y, v, E, B, T, D;
        return o === 'center' ? (T = m + x / 2, s === 'left' ? (y = g, v = y - r, B = T + r, D = T - r) : (y = g + b, v = y + r, B = T - r, D = T + r), E = y) : (s === 'left' ? v = g + Math.max(d, l) + r : s === 'right' ? v = g + b - Math.max(u, h) - r : v = this.caretX, o === 'top' ? (B = m, T = B - r, y = v - r, E = v + r) : (B = m + x, T = B + r, y = v + r, E = v - r), D = B), {
            x1: y,
            x2: v,
            x3: E,
            y1: B,
            y2: T,
            y3: D
        };
    }

    drawTitle(t, e, n) {
        const s = this.title, o = s.length;
        let r, a, d;
        if (o) {
            const u = me(n.rtl, this.x, this.width);
            for (t.x = Ki(this, n.titleAlign, n), e.textAlign = u.textAlign(n.titleAlign), e.textBaseline = 'middle', r = dt(n.titleFont), a = n.titleSpacing, e.fillStyle = n.titleColor, e.font = r.string, d = 0; d < o; ++d) e.fillText(s[d], u.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + a, d + 1 === o && (t.y += n.titleMarginBottom - a);
        }
    }

    _drawColorBox(t, e, n, s, o) {
        const r = this.labelColors[n], a = this.labelPointStyles[n], { boxHeight: d, boxWidth: u, boxPadding: l } = o,
          h = dt(o.bodyFont), g = Ki(this, 'left', o), m = s.x(g), b = d < h.lineHeight ? (h.lineHeight - d) / 2 : 0,
          x = e.y + b;
        if (o.usePointStyle) {
            const y = { radius: Math.min(u, d) / 2, pointStyle: a.pointStyle, rotation: a.rotation, borderWidth: 1 },
              v = s.leftForLtr(m, u) + u / 2, E = x + d / 2;
            t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ai(t, y, v, E), t.strokeStyle = r.borderColor, t.fillStyle = r.backgroundColor, Ai(t, y, v, E);
        } else {
            t.lineWidth = r.borderWidth || 1, t.strokeStyle = r.borderColor, t.setLineDash(r.borderDash || []), t.lineDashOffset = r.borderDashOffset || 0;
            const y = s.leftForLtr(m, u - l), v = s.leftForLtr(s.xPlus(m, 1), u - l - 2), E = he(r.borderRadius);
            Object.values(E).some(B => B !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Pi(t, {
                x: y,
                y: x,
                w: u,
                h: d,
                radius: E
            }), t.fill(), t.stroke(), t.fillStyle = r.backgroundColor, t.beginPath(), Pi(t, {
                x: v,
                y: x + 1,
                w: u - 2,
                h: d - 2,
                radius: E
            }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(y, x, u, d), t.strokeRect(y, x, u, d), t.fillStyle = r.backgroundColor, t.fillRect(v, x + 1, u - 2, d - 2));
        }
        t.fillStyle = this.labelTextColors[n];
    }

    drawBody(t, e, n) {
        const { body: s } = this, {
            bodySpacing: o,
            bodyAlign: r,
            displayColors: a,
            boxHeight: d,
            boxWidth: u,
            boxPadding: l
        } = n, h = dt(n.bodyFont);
        let g = h.lineHeight, m = 0;
        const b = me(n.rtl, this.x, this.width), x = function(C) {
            e.fillText(C, b.x(t.x + m), t.y + g / 2), t.y += g + o;
        }, y = b.textAlign(r);
        let v, E, B, T, D, O, S;
        for (e.textAlign = r, e.textBaseline = 'middle', e.font = h.string, t.x = Ki(this, y, n), e.fillStyle = n.bodyColor, G(this.beforeBody, x), m = a && y !== 'right' ? r === 'center' ? u / 2 + l : u + 2 + l : 0, T = 0, O = s.length; T < O; ++T) {
            for (v = s[T], E = this.labelTextColors[T], e.fillStyle = E, G(v.before, x), B = v.lines, a && B.length && (this._drawColorBox(e, t, T, b, n), g = Math.max(h.lineHeight, d)), D = 0, S = B.length; D < S; ++D) x(B[D]), g = h.lineHeight;
            G(v.after, x);
        }
        m = 0, g = h.lineHeight, G(this.afterBody, x), t.y -= o;
    }

    drawFooter(t, e, n) {
        const s = this.footer, o = s.length;
        let r, a;
        if (o) {
            const d = me(n.rtl, this.x, this.width);
            for (t.x = Ki(this, n.footerAlign, n), t.y += n.footerMarginTop, e.textAlign = d.textAlign(n.footerAlign), e.textBaseline = 'middle', r = dt(n.footerFont), e.fillStyle = n.footerColor, e.font = r.string, a = 0; a < o; ++a) e.fillText(s[a], d.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + n.footerSpacing;
        }
    }

    drawBackground(t, e, n, s) {
        const { xAlign: o, yAlign: r } = this, { x: a, y: d } = t, { width: u, height: l } = n, {
            topLeft: h,
            topRight: g,
            bottomLeft: m,
            bottomRight: b
        } = he(s.cornerRadius);
        e.fillStyle = s.backgroundColor, e.strokeStyle = s.borderColor, e.lineWidth = s.borderWidth, e.beginPath(), e.moveTo(a + h, d), r === 'top' && this.drawCaret(t, e, n, s), e.lineTo(a + u - g, d), e.quadraticCurveTo(a + u, d, a + u, d + g), r === 'center' && o === 'right' && this.drawCaret(t, e, n, s), e.lineTo(a + u, d + l - b), e.quadraticCurveTo(a + u, d + l, a + u - b, d + l), r === 'bottom' && this.drawCaret(t, e, n, s), e.lineTo(a + m, d + l), e.quadraticCurveTo(a, d + l, a, d + l - m), r === 'center' && o === 'left' && this.drawCaret(t, e, n, s), e.lineTo(a, d + h), e.quadraticCurveTo(a, d, a + h, d), e.closePath(), e.fill(), s.borderWidth > 0 && e.stroke();
    }

    _updateAnimationTarget(t) {
        const e = this._chart, n = this.$animations, s = n && n.x, o = n && n.y;
        if (s || o) {
            const r = Ye[t.position].call(this, this._active, this._eventPosition);
            if (!r) return;
            const a = this._size = Ir(this, t), d = Object.assign({}, r, this._size), u = zr(e, t, d),
              l = Nr(t, d, u, e);
            (s._to !== l.x || o._to !== l.y) && (this.xAlign = u.xAlign, this.yAlign = u.yAlign, this.width = a.width, this.height = a.height, this.caretX = r.x, this.caretY = r.y, this._resolveAnimations().update(this, l));
        }
    }

    draw(t) {
        const e = this.options.setContext(this.getContext());
        let n = this.opacity;
        if (!n) return;
        this._updateAnimationTarget(e);
        const s = { width: this.width, height: this.height }, o = { x: this.x, y: this.y };
        n = Math.abs(n) < .001 ? 0 : n;
        const r = ht(e.padding),
          a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
        e.enabled && a && (t.save(), t.globalAlpha = n, this.drawBackground(o, t, s, e), Co(t, e.textDirection), o.y += r.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), Eo(t, e.textDirection), t.restore());
    }

    getActiveElements() {
        return this._active || [];
    }

    setActiveElements(t, e) {
        const n = this._active, s = t.map(({ datasetIndex: a, index: d }) => {
            const u = this._chart.getDatasetMeta(a);
            if (!u) throw new Error('Cannot find a dataset at index ' + a);
            return { datasetIndex: a, element: u.data[d], index: d };
        }), o = !pi(n, s), r = this._positionChanged(s, e);
        (o || r) && (this._active = s, this._eventPosition = e, this.update(!0));
    }

    handleEvent(t, e) {
        const n = this.options, s = this._active || [];
        let o = !1, r = [];
        t.type !== 'mouseout' && (r = this._chart.getElementsAtEventForMode(t, n.mode, n, e), n.reverse && r.reverse());
        const a = this._positionChanged(r, t);
        return o = e || !pi(r, s) || a, o && (this._active = r, (n.enabled || n.external) && (this._eventPosition = {
            x: t.x,
            y: t.y
        }, this.update(!0, e))), o;
    }

    _positionChanged(t, e) {
        const { caretX: n, caretY: s, options: o } = this, r = Ye[o.position].call(this, t, e);
        return r !== !1 && (n !== r.x || s !== r.y);
    }
}

os.positioners = Ye;
var Pf = {
      id: 'tooltip',
      _element: os,
      positioners: Ye,
      afterInit(i, t, e) {
          e && (i.tooltip = new os({ _chart: i, options: e }));
      },
      beforeUpdate(i, t, e) {
          i.tooltip && i.tooltip.initialize(e);
      },
      reset(i, t, e) {
          i.tooltip && i.tooltip.initialize(e);
      },
      afterDraw(i) {
          const t = i.tooltip, e = { tooltip: t };
          i.notifyPlugins('beforeTooltipDraw', e) !== !1 && (t && t.draw(i.ctx), i.notifyPlugins('afterTooltipDraw', e));
      },
      afterEvent(i, t) {
          if (i.tooltip) {
              const e = t.replay;
              i.tooltip.handleEvent(t.event, e) && (t.changed = !0);
          }
      },
      defaults: {
          enabled: !0,
          external: null,
          position: 'average',
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          titleFont: { weight: 'bold' },
          titleSpacing: 2,
          titleMarginBottom: 6,
          titleAlign: 'left',
          bodyColor: '#fff',
          bodySpacing: 2,
          bodyFont: {},
          bodyAlign: 'left',
          footerColor: '#fff',
          footerSpacing: 2,
          footerMarginTop: 6,
          footerFont: { weight: 'bold' },
          footerAlign: 'left',
          padding: 6,
          caretPadding: 2,
          caretSize: 5,
          cornerRadius: 6,
          boxHeight: (i, t) => t.bodyFont.size,
          boxWidth: (i, t) => t.bodyFont.size,
          multiKeyBackground: '#fff',
          displayColors: !0,
          boxPadding: 0,
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 0,
          animation: { duration: 400, easing: 'easeOutQuart' },
          animations: {
              numbers: { type: 'number', properties: ['x', 'y', 'width', 'height', 'caretX', 'caretY'] },
              opacity: { easing: 'linear', duration: 200 }
          },
          callbacks: {
              beforeTitle: Tt, title(i) {
                  if (i.length > 0) {
                      const t = i[0], e = t.chart.data.labels, n = e ? e.length : 0;
                      if (this && this.options && this.options.mode === 'dataset') return t.dataset.label || '';
                      if (t.label) return t.label;
                      if (n > 0 && t.dataIndex < n) return e[t.dataIndex];
                  }
                  return '';
              }, afterTitle: Tt, beforeBody: Tt, beforeLabel: Tt, label(i) {
                  if (this && this.options && this.options.mode === 'dataset') return i.label + ': ' + i.formattedValue || i.formattedValue;
                  let t = i.dataset.label || '';
                  t && (t += ': ');
                  const e = i.formattedValue;
                  return X(e) || (t += e), t;
              }, labelColor(i) {
                  const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
                  return {
                      borderColor: e.borderColor,
                      backgroundColor: e.backgroundColor,
                      borderWidth: e.borderWidth,
                      borderDash: e.borderDash,
                      borderDashOffset: e.borderDashOffset,
                      borderRadius: 0
                  };
              }, labelTextColor() {
                  return this.options.bodyColor;
              }, labelPointStyle(i) {
                  const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
                  return { pointStyle: e.pointStyle, rotation: e.rotation };
              }, afterLabel: Tt, afterBody: Tt, beforeFooter: Tt, footer: Tt, afterFooter: Tt
          }
      },
      defaultRoutes: { bodyFont: 'font', footerFont: 'font', titleFont: 'font' },
      descriptors: {
          _scriptable: i => i !== 'filter' && i !== 'itemSort' && i !== 'external',
          _indexable: !1,
          callbacks: { _scriptable: !1, _indexable: !1 },
          animation: { _fallback: !1 },
          animations: { _fallback: 'animation' }
      },
      additionalOptionScopes: ['interaction']
  },
  Df = Object.freeze({ __proto__: null, Decimation: Zl, Filler: pf, Legend: _f, SubTitle: wf, Title: yf, Tooltip: Pf });
const Bf = (i, t, e) => typeof t == 'string' ? i.push(t) - 1 : isNaN(t) ? null : e;

function Tf(i, t, e) {
    const n = i.indexOf(t);
    if (n === -1) return Bf(i, t, e);
    const s = i.lastIndexOf(t);
    return n !== s ? e : n;
}

const Of = (i, t) => i === null ? null : ut(Math.round(i), 0, t);

class Zi extends ee {
    constructor(t) {
        super(t);
        this._startValue = void 0, this._valueRange = 0;
    }

    parse(t, e) {
        if (X(t)) return null;
        const n = this.getLabels();
        return e = isFinite(e) && n[e] === t ? e : Tf(n, t, V(e, t)), Of(e, n.length - 1);
    }

    determineDataLimits() {
        const { minDefined: t, maxDefined: e } = this.getUserBounds();
        let { min: n, max: s } = this.getMinMax(!0);
        this.options.bounds === 'ticks' && (t || (n = 0), e || (s = this.getLabels().length - 1)), this.min = n, this.max = s;
    }

    buildTicks() {
        const t = this.min, e = this.max, n = this.options.offset, s = [];
        let o = this.getLabels();
        o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1), this._valueRange = Math.max(o.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? .5 : 0);
        for (let r = t; r <= e; r++) s.push({ value: r });
        return s;
    }

    getLabelForValue(t) {
        const e = this.getLabels();
        return t >= 0 && t < e.length ? e[t] : t;
    }

    configure() {
        super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
    }

    getPixelForValue(t) {
        return typeof t != 'number' && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
    }

    getPixelForTick(t) {
        const e = this.ticks;
        return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
    }

    getValueForPixel(t) {
        return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
    }

    getBasePixel() {
        return this.bottom;
    }
}

Zi.id = 'category', Zi.defaults = { ticks: { callback: Zi.prototype.getLabelForValue } };

function Rf(i, t) {
    const e = [], n = 1e-14, {
        bounds: s,
        step: o,
        min: r,
        max: a,
        precision: d,
        count: u,
        maxTicks: l,
        maxDigits: h,
        includeBounds: g
    } = i, m = o || 1, b = l - 1, { min: x, max: y } = t, v = !X(r), E = !X(a), B = !X(u), T = (y - x) / (h + 1);
    let D = Xs((y - x) / b / m) * m, O, S, C, R;
    if (D < n && !v && !E) return [{ value: x }, { value: y }];
    R = Math.ceil(y / D) - Math.floor(x / D), R > b && (D = Xs(R * D / b / m) * m), X(d) || (O = Math.pow(10, d), D = Math.ceil(D * O) / O), s === 'ticks' ? (S = Math.floor(x / D) * D, C = Math.ceil(y / D) * D) : (S = x, C = y), v && E && o && Cd((a - r) / o, D / 1e3) ? (R = Math.round(Math.min((a - r) / D, l)), D = (a - r) / R, S = r, C = a) : B ? (S = v ? r : S, C = E ? a : C, R = u - 1, D = (C - S) / R) : (R = (C - S) / D, Pe(R, Math.round(R), D / 1e3) ? R = Math.round(R) : R = Math.ceil(R));
    const z = Math.max(Gs(D), Gs(S));
    O = Math.pow(10, X(d) ? z : d), S = Math.round(S * O) / O, C = Math.round(C * O) / O;
    let L = 0;
    for (v && (g && S !== r ? (e.push({ value: r }), S < r && L++, Pe(Math.round((S + L * D) * O) / O, r, Hr(r, T, i)) && L++) : S < r && L++); L < R; ++L) e.push({ value: Math.round((S + L * D) * O) / O });
    return E && g && C !== a ? e.length && Pe(e[e.length - 1].value, a, Hr(a, T, i)) ? e[e.length - 1].value = a : e.push({ value: a }) : (!E || C === a) && e.push({ value: C }), e;
}

function Hr(i, t, { horizontal: e, minRotation: n }) {
    const s = Mt(n), o = (e ? Math.sin(s) : Math.cos(s)) || .001, r = .75 * t * ('' + i).length;
    return Math.min(t / o, r);
}

class Ji extends ee {
    constructor(t) {
        super(t);
        this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
    }

    parse(t, e) {
        return X(t) || (typeof t == 'number' || t instanceof Number) && !isFinite(+t) ? null : +t;
    }

    handleTickRangeOptions() {
        const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: n } = this.getUserBounds();
        let { min: s, max: o } = this;
        const r = d => s = e ? s : d, a = d => o = n ? o : d;
        if (t) {
            const d = Et(s), u = Et(o);
            d < 0 && u < 0 ? a(0) : d > 0 && u > 0 && r(0);
        }
        if (s === o) {
            let d = 1;
            (o >= Number.MAX_SAFE_INTEGER || s <= Number.MIN_SAFE_INTEGER) && (d = Math.abs(o * .05)), a(o + d), t || r(s - d);
        }
        this.min = s, this.max = o;
    }

    getTickLimit() {
        const t = this.options.ticks;
        let { maxTicksLimit: e, stepSize: n } = t, s;
        return n ? (s = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), e = e || 11), e && (s = Math.min(e, s)), s;
    }

    computeTickLimit() {
        return Number.POSITIVE_INFINITY;
    }

    buildTicks() {
        const t = this.options, e = t.ticks;
        let n = this.getTickLimit();
        n = Math.max(2, n);
        const s = {
            maxTicks: n,
            bounds: t.bounds,
            min: t.min,
            max: t.max,
            precision: e.precision,
            step: e.stepSize,
            count: e.count,
            maxDigits: this._maxDigits(),
            horizontal: this.isHorizontal(),
            minRotation: e.minRotation || 0,
            includeBounds: e.includeBounds !== !1
        }, o = this._range || this, r = Rf(s, o);
        return t.bounds === 'ticks' && qs(r, this, 'value'), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
    }

    configure() {
        const t = this.ticks;
        let e = this.min, n = this.max;
        if (super.configure(), this.options.offset && t.length) {
            const s = (n - e) / Math.max(t.length - 1, 1) / 2;
            e -= s, n += s;
        }
        this._startValue = e, this._endValue = n, this._valueRange = n - e;
    }

    getLabelForValue(t) {
        return Le(t, this.chart.options.locale);
    }
}

class rs extends Ji {
    determineDataLimits() {
        const { min: t, max: e } = this.getMinMax(!0);
        this.min = rt(t) ? t : 0, this.max = rt(e) ? e : 1, this.handleTickRangeOptions();
    }

    computeTickLimit() {
        const t = this.isHorizontal(), e = t ? this.width : this.height, n = Mt(this.options.ticks.minRotation),
          s = (t ? Math.sin(n) : Math.cos(n)) || .001, o = this._resolveTickFontOptions(0);
        return Math.ceil(e / Math.min(40, o.lineHeight / s));
    }

    getPixelForValue(t) {
        return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
    }

    getValueForPixel(t) {
        return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
    }
}

rs.id = 'linear', rs.defaults = { ticks: { callback: Vi.formatters.numeric } };

function jr(i) {
    return i / Math.pow(10, Math.floor(yt(i))) === 1;
}

function Ff(i, t) {
    const e = Math.floor(yt(t.max)), n = Math.ceil(t.max / Math.pow(10, e)), s = [];
    let o = _t(i.min, Math.pow(10, Math.floor(yt(t.min)))), r = Math.floor(yt(o)), a = Math.floor(o / Math.pow(10, r)),
      d = r < 0 ? Math.pow(10, Math.abs(r)) : 1;
    do s.push({
        value: o,
        major: jr(o)
    }), ++a, a === 10 && (a = 1, ++r, d = r >= 0 ? 1 : d), o = Math.round(a * Math.pow(10, r) * d) / d; while (r < e || r === e && a < n);
    const u = _t(i.max, o);
    return s.push({ value: u, major: jr(o) }), s;
}

class as extends ee {
    constructor(t) {
        super(t);
        this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
    }

    parse(t, e) {
        const n = Ji.prototype.parse.apply(this, [t, e]);
        if (n === 0) {
            this._zero = !0;
            return;
        }
        return rt(n) && n > 0 ? n : null;
    }

    determineDataLimits() {
        const { min: t, max: e } = this.getMinMax(!0);
        this.min = rt(t) ? Math.max(0, t) : null, this.max = rt(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this.handleTickRangeOptions();
    }

    handleTickRangeOptions() {
        const { minDefined: t, maxDefined: e } = this.getUserBounds();
        let n = this.min, s = this.max;
        const o = d => n = t ? n : d, r = d => s = e ? s : d, a = (d, u) => Math.pow(10, Math.floor(yt(d)) + u);
        n === s && (n <= 0 ? (o(1), r(10)) : (o(a(n, -1)), r(a(s, 1)))), n <= 0 && o(a(s, -1)), s <= 0 && r(a(n, 1)), this._zero && this.min !== this._suggestedMin && n === a(this.min, 0) && o(a(n, -1)), this.min = n, this.max = s;
    }

    buildTicks() {
        const t = this.options, e = { min: this._userMin, max: this._userMax }, n = Ff(e, this);
        return t.bounds === 'ticks' && qs(n, this, 'value'), t.reverse ? (n.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), n;
    }

    getLabelForValue(t) {
        return t === void 0 ? '0' : Le(t, this.chart.options.locale);
    }

    configure() {
        const t = this.min;
        super.configure(), this._startValue = yt(t), this._valueRange = yt(this.max) - yt(t);
    }

    getPixelForValue(t) {
        return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (yt(t) - this._startValue) / this._valueRange);
    }

    getValueForPixel(t) {
        const e = this.getDecimalForPixel(t);
        return Math.pow(10, this._startValue + e * this._valueRange);
    }
}

as.id = 'logarithmic', as.defaults = { ticks: { callback: Vi.formatters.logarithmic, major: { enabled: !0 } } };

function ds(i) {
    const t = i.ticks;
    if (t.display && i.display) {
        const e = ht(t.backdropPadding);
        return V(t.font && t.font.size, $.font.size) + e.height;
    }
    return 0;
}

function Lf(i, t, e) {
    return e = Q(e) ? e : [e], { w: Jd(i, t.string, e), h: e.length * t.lineHeight };
}

function Ur(i, t, e, n, s) {
    return i === n || i === s ? { start: t - e / 2, end: t + e / 2 } : i < n || i > s ? {
        start: t - e,
        end: t
    } : { start: t, end: t + e };
}

function If(i) {
    const t = { l: 0, r: i.width, t: 0, b: i.height - i.paddingTop }, e = {}, n = [], s = [], o = i.getLabels().length;
    for (let r = 0; r < o; r++) {
        const a = i.options.pointLabels.setContext(i.getPointLabelContext(r));
        s[r] = a.padding;
        const d = i.getPointPosition(r, i.drawingArea + s[r]), u = dt(a.font), l = Lf(i.ctx, u, i._pointLabels[r]);
        n[r] = l;
        const h = i.getIndexAngle(r), g = An(h), m = Ur(g, d.x, l.w, 0, 180), b = Ur(g, d.y, l.h, 90, 270);
        m.start < t.l && (t.l = m.start, e.l = h), m.end > t.r && (t.r = m.end, e.r = h), b.start < t.t && (t.t = b.start, e.t = h), b.end > t.b && (t.b = b.end, e.b = h);
    }
    i._setReductions(i.drawingArea, t, e), i._pointLabelItems = zf(i, n, s);
}

function zf(i, t, e) {
    const n = [], s = i.getLabels().length, o = i.options, r = ds(o),
      a = i.getDistanceFromCenterForValue(o.ticks.reverse ? i.min : i.max);
    for (let d = 0; d < s; d++) {
        const u = d === 0 ? r / 2 : 0, l = i.getPointPosition(d, a + u + e[d]), h = An(i.getIndexAngle(d)), g = t[d],
          m = Wf(l.y, g.h, h), b = Nf(h), x = Vf(l.x, g.w, b);
        n.push({ x: l.x, y: m, textAlign: b, left: x, top: m, right: x + g.w, bottom: m + g.h });
    }
    return n;
}

function Nf(i) {
    return i === 0 || i === 180 ? 'center' : i < 180 ? 'left' : 'right';
}

function Vf(i, t, e) {
    return e === 'right' ? i -= t : e === 'center' && (i -= t / 2), i;
}

function Wf(i, t, e) {
    return e === 90 || e === 270 ? i -= t / 2 : (e > 270 || e < 90) && (i -= t), i;
}

function Hf(i, t) {
    const { ctx: e, options: { pointLabels: n } } = i;
    for (let s = t - 1; s >= 0; s--) {
        const o = n.setContext(i.getPointLabelContext(s)), r = dt(o.font), {
            x: a,
            y: d,
            textAlign: u,
            left: l,
            top: h,
            right: g,
            bottom: m
        } = i._pointLabelItems[s], { backdropColor: b } = o;
        if (!X(b)) {
            const x = ht(o.backdropPadding);
            e.fillStyle = b, e.fillRect(l - x.left, h - x.top, g - l + x.width, m - h + x.height);
        }
        Zt(e, i._pointLabels[s], a, d + r.lineHeight / 2, r, { color: o.color, textAlign: u, textBaseline: 'middle' });
    }
}

function $r(i, t, e, n) {
    const { ctx: s } = i;
    if (e) s.arc(i.xCenter, i.yCenter, t, 0, J); else {
        let o = i.getPointPosition(0, t);
        s.moveTo(o.x, o.y);
        for (let r = 1; r < n; r++) o = i.getPointPosition(r, t), s.lineTo(o.x, o.y);
    }
}

function jf(i, t, e, n) {
    const s = i.ctx, o = t.circular, { color: r, lineWidth: a } = t;
    !o && !n || !r || !a || e < 0 || (s.save(), s.strokeStyle = r, s.lineWidth = a, s.setLineDash(t.borderDash), s.lineDashOffset = t.borderDashOffset, s.beginPath(), $r(i, e, o, n), s.closePath(), s.stroke(), s.restore());
}

function Qi(i) {
    return fe(i) ? i : 0;
}

function Uf(i, t, e) {
    return Ht(i, { label: e, index: t, type: 'pointLabel' });
}

class Xe extends Ji {
    constructor(t) {
        super(t);
        this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
    }

    setDimensions() {
        this.width = this.maxWidth, this.height = this.maxHeight, this.paddingTop = ds(this.options) / 2, this.xCenter = Math.floor(this.width / 2), this.yCenter = Math.floor((this.height - this.paddingTop) / 2), this.drawingArea = Math.min(this.height - this.paddingTop, this.width) / 2;
    }

    determineDataLimits() {
        const { min: t, max: e } = this.getMinMax(!1);
        this.min = rt(t) && !isNaN(t) ? t : 0, this.max = rt(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions();
    }

    computeTickLimit() {
        return Math.ceil(this.drawingArea / ds(this.options));
    }

    generateTickLabels(t) {
        Ji.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((e, n) => {
            const s = tt(this.options.pointLabels.callback, [e, n], this);
            return s || s === 0 ? s : '';
        });
    }

    fit() {
        const t = this.options;
        t.display && t.pointLabels.display ? If(this) : this.setCenterPoint(0, 0, 0, 0);
    }

    _setReductions(t, e, n) {
        let s = e.l / Math.sin(n.l), o = Math.max(e.r - this.width, 0) / Math.sin(n.r), r = -e.t / Math.cos(n.t),
          a = -Math.max(e.b - (this.height - this.paddingTop), 0) / Math.cos(n.b);
        s = Qi(s), o = Qi(o), r = Qi(r), a = Qi(a), this.drawingArea = Math.max(t / 2, Math.min(Math.floor(t - (s + o) / 2), Math.floor(t - (r + a) / 2))), this.setCenterPoint(s, o, r, a);
    }

    setCenterPoint(t, e, n, s) {
        const o = this.width - e - this.drawingArea, r = t + this.drawingArea, a = n + this.drawingArea,
          d = this.height - this.paddingTop - s - this.drawingArea;
        this.xCenter = Math.floor((r + o) / 2 + this.left), this.yCenter = Math.floor((a + d) / 2 + this.top + this.paddingTop);
    }

    getIndexAngle(t) {
        const e = J / this.getLabels().length, n = this.options.startAngle || 0;
        return kt(t * e + Mt(n));
    }

    getDistanceFromCenterForValue(t) {
        if (X(t)) return NaN;
        const e = this.drawingArea / (this.max - this.min);
        return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
    }

    getValueForDistanceFromCenter(t) {
        if (X(t)) return NaN;
        const e = t / (this.drawingArea / (this.max - this.min));
        return this.options.reverse ? this.max - e : this.min + e;
    }

    getPointLabelContext(t) {
        const e = this._pointLabels || [];
        if (t >= 0 && t < e.length) {
            const n = e[t];
            return Uf(this.getContext(), t, n);
        }
    }

    getPointPosition(t, e) {
        const n = this.getIndexAngle(t) - at;
        return { x: Math.cos(n) * e + this.xCenter, y: Math.sin(n) * e + this.yCenter, angle: n };
    }

    getPointPositionForValue(t, e) {
        return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
    }

    getBasePosition(t) {
        return this.getPointPositionForValue(t || 0, this.getBaseValue());
    }

    getPointLabelPosition(t) {
        const { left: e, top: n, right: s, bottom: o } = this._pointLabelItems[t];
        return { left: e, top: n, right: s, bottom: o };
    }

    drawBackground() {
        const { backgroundColor: t, grid: { circular: e } } = this.options;
        if (t) {
            const n = this.ctx;
            n.save(), n.beginPath(), $r(this, this.getDistanceFromCenterForValue(this._endValue), e, this.getLabels().length), n.closePath(), n.fillStyle = t, n.fill(), n.restore();
        }
    }

    drawGrid() {
        const t = this.ctx, e = this.options, { angleLines: n, grid: s } = e, o = this.getLabels().length;
        let r, a, d;
        if (e.pointLabels.display && Hf(this, o), s.display && this.ticks.forEach((u, l) => {
            if (l !== 0) {
                a = this.getDistanceFromCenterForValue(u.value);
                const h = s.setContext(this.getContext(l - 1));
                jf(this, h, a, o);
            }
        }), n.display) {
            for (t.save(), r = this.getLabels().length - 1; r >= 0; r--) {
                const u = n.setContext(this.getPointLabelContext(r)), { color: l, lineWidth: h } = u;
                !h || !l || (t.lineWidth = h, t.strokeStyle = l, t.setLineDash(u.borderDash), t.lineDashOffset = u.borderDashOffset, a = this.getDistanceFromCenterForValue(e.ticks.reverse ? this.min : this.max), d = this.getPointPosition(r, a), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(d.x, d.y), t.stroke());
            }
            t.restore();
        }
    }

    drawBorder() {
    }

    drawLabels() {
        const t = this.ctx, e = this.options, n = e.ticks;
        if (!n.display) return;
        const s = this.getIndexAngle(0);
        let o, r;
        t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(s), t.textAlign = 'center', t.textBaseline = 'middle', this.ticks.forEach((a, d) => {
            if (d === 0 && !e.reverse) return;
            const u = n.setContext(this.getContext(d)), l = dt(u.font);
            if (o = this.getDistanceFromCenterForValue(this.ticks[d].value), u.showLabelBackdrop) {
                t.font = l.string, r = t.measureText(a.label).width, t.fillStyle = u.backdropColor;
                const h = ht(u.backdropPadding);
                t.fillRect(-r / 2 - h.left, -o - l.size / 2 - h.top, r + h.width, l.size + h.height);
            }
            Zt(t, a.label, 0, -o, l, { color: u.color });
        }), t.restore();
    }

    drawTitle() {
    }
}

Xe.id = 'radialLinear', Xe.defaults = {
    display: !0,
    animate: !0,
    position: 'chartArea',
    angleLines: { display: !0, lineWidth: 1, borderDash: [], borderDashOffset: 0 },
    grid: { circular: !1 },
    startAngle: 0,
    ticks: { showLabelBackdrop: !0, callback: Vi.formatters.numeric },
    pointLabels: {
        backdropColor: void 0, backdropPadding: 2, display: !0, font: { size: 10 }, callback(i) {
            return i;
        }, padding: 5
    }
}, Xe.defaultRoutes = {
    'angleLines.color': 'borderColor',
    'pointLabels.color': 'color',
    'ticks.color': 'color'
}, Xe.descriptors = { angleLines: { _fallback: 'grid' } };
const tn = {
    millisecond: { common: !0, size: 1, steps: 1e3 },
    second: { common: !0, size: 1e3, steps: 60 },
    minute: { common: !0, size: 6e4, steps: 60 },
    hour: { common: !0, size: 36e5, steps: 24 },
    day: { common: !0, size: 864e5, steps: 30 },
    week: { common: !1, size: 6048e5, steps: 4 },
    month: { common: !0, size: 2628e6, steps: 12 },
    quarter: { common: !1, size: 7884e6, steps: 4 },
    year: { common: !0, size: 3154e7 }
}, gt = Object.keys(tn);

function $f(i, t) {
    return i - t;
}

function Yr(i, t) {
    if (X(t)) return null;
    const e = i._adapter, { parser: n, round: s, isoWeekday: o } = i._parseOpts;
    let r = t;
    return typeof n == 'function' && (r = n(r)), rt(r) || (r = typeof n == 'string' ? e.parse(r, n) : e.parse(r)), r === null ? null : (s && (r = s === 'week' && (fe(o) || o === !0) ? e.startOf(r, 'isoWeek', o) : e.startOf(r, s)), +r);
}

function Xr(i, t, e, n) {
    const s = gt.length;
    for (let o = gt.indexOf(i); o < s - 1; ++o) {
        const r = tn[gt[o]], a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
        if (r.common && Math.ceil((e - t) / (a * r.size)) <= n) return gt[o];
    }
    return gt[s - 1];
}

function Yf(i, t, e, n, s) {
    for (let o = gt.length - 1; o >= gt.indexOf(e); o--) {
        const r = gt[o];
        if (tn[r].common && i._adapter.diff(s, n, r) >= t - 1) return r;
    }
    return gt[e ? gt.indexOf(e) : 0];
}

function Xf(i) {
    for (let t = gt.indexOf(i) + 1, e = gt.length; t < e; ++t) if (tn[gt[t]].common) return gt[t];
}

function qr(i, t, e) {
    if (!e) i[t] = !0; else if (e.length) {
        const { lo: n, hi: s } = In(e, t), o = e[n] >= t ? e[n] : e[s];
        i[o] = !0;
    }
}

function qf(i, t, e, n) {
    const s = i._adapter, o = +s.startOf(t[0].value, n), r = t[t.length - 1].value;
    let a, d;
    for (a = o; a <= r; a = +s.add(a, 1, n)) d = e[a], d >= 0 && (t[d].major = !0);
    return t;
}

function Gr(i, t, e) {
    const n = [], s = {}, o = t.length;
    let r, a;
    for (r = 0; r < o; ++r) a = t[r], s[a] = r, n.push({ value: a, major: !1 });
    return o === 0 || !e ? n : qf(i, n, s, e);
}

class qe extends ee {
    constructor(t) {
        super(t);
        this._cache = {
            data: [],
            labels: [],
            all: []
        }, this._unit = 'day', this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
    }

    init(t, e) {
        const n = t.time || (t.time = {}), s = this._adapter = new vc._date(t.adapters.date);
        Ce(n.displayFormats, s.formats()), this._parseOpts = {
            parser: n.parser,
            round: n.round,
            isoWeekday: n.isoWeekday
        }, super.init(t), this._normalized = e.normalized;
    }

    parse(t, e) {
        return t === void 0 ? null : Yr(this, t);
    }

    beforeLayout() {
        super.beforeLayout(), this._cache = { data: [], labels: [], all: [] };
    }

    determineDataLimits() {
        const t = this.options, e = this._adapter, n = t.time.unit || 'day';
        let { min: s, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();

        function d(u) {
            !r && !isNaN(u.min) && (s = Math.min(s, u.min)), !a && !isNaN(u.max) && (o = Math.max(o, u.max));
        }

        (!r || !a) && (d(this._getLabelBounds()), (t.bounds !== 'ticks' || t.ticks.source !== 'labels') && d(this.getMinMax(!1))), s = rt(s) && !isNaN(s) ? s : +e.startOf(Date.now(), n), o = rt(o) && !isNaN(o) ? o : +e.endOf(Date.now(), n) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
    }

    _getLabelBounds() {
        const t = this.getLabelTimestamps();
        let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
        return t.length && (e = t[0], n = t[t.length - 1]), { min: e, max: n };
    }

    buildTicks() {
        const t = this.options, e = t.time, n = t.ticks,
          s = n.source === 'labels' ? this.getLabelTimestamps() : this._generate();
        t.bounds === 'ticks' && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
        const o = this.min, r = this.max, a = uu(s, o, r);
        return this._unit = e.unit || (n.autoSkip ? Xr(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Yf(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === 'year' ? void 0 : Xf(this._unit), this.initOffsets(s), t.reverse && a.reverse(), Gr(this, a, this._majorUnit);
    }

    initOffsets(t) {
        let e = 0, n = 0, s, o;
        this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - s : e = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = o : n = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
        const r = t.length < 3 ? .5 : .25;
        e = ut(e, 0, r), n = ut(n, 0, r), this._offsets = { start: e, end: n, factor: 1 / (e + 1 + n) };
    }

    _generate() {
        const t = this._adapter, e = this.min, n = this.max, s = this.options, o = s.time,
          r = o.unit || Xr(o.minUnit, e, n, this._getLabelCapacity(e)), a = V(o.stepSize, 1),
          d = r === 'week' ? o.isoWeekday : !1, u = fe(d) || d === !0, l = {};
        let h = e, g, m;
        if (u && (h = +t.startOf(h, 'isoWeek', d)), h = +t.startOf(h, u ? 'day' : r), t.diff(n, e, r) > 1e5 * a) throw new Error(e + ' and ' + n + ' are too far apart with stepSize of ' + a + ' ' + r);
        const b = s.ticks.source === 'data' && this.getDataTimestamps();
        for (g = h, m = 0; g < n; g = +t.add(g, a, r), m++) qr(l, g, b);
        return (g === n || s.bounds === 'ticks' || m === 1) && qr(l, g, b), Object.keys(l).sort((x, y) => x - y).map(x => +x);
    }

    getLabelForValue(t) {
        const e = this._adapter, n = this.options.time;
        return n.tooltipFormat ? e.format(t, n.tooltipFormat) : e.format(t, n.displayFormats.datetime);
    }

    _tickFormatFunction(t, e, n, s) {
        const o = this.options, r = o.time.displayFormats, a = this._unit, d = this._majorUnit, u = a && r[a],
          l = d && r[d], h = n[e], g = d && l && h && h.major, m = this._adapter.format(t, s || (g ? l : u)),
          b = o.ticks.callback;
        return b ? tt(b, [m, e, n], this) : m;
    }

    generateTickLabels(t) {
        let e, n, s;
        for (e = 0, n = t.length; e < n; ++e) s = t[e], s.label = this._tickFormatFunction(s.value, e, t);
    }

    getDecimalForValue(t) {
        return t === null ? NaN : (t - this.min) / (this.max - this.min);
    }

    getPixelForValue(t) {
        const e = this._offsets, n = this.getDecimalForValue(t);
        return this.getPixelForDecimal((e.start + n) * e.factor);
    }

    getValueForPixel(t) {
        const e = this._offsets, n = this.getDecimalForPixel(t) / e.factor - e.end;
        return this.min + n * (this.max - this.min);
    }

    _getLabelSize(t) {
        const e = this.options.ticks, n = this.ctx.measureText(t).width,
          s = Mt(this.isHorizontal() ? e.maxRotation : e.minRotation), o = Math.cos(s), r = Math.sin(s),
          a = this._resolveTickFontOptions(0).size;
        return { w: n * o + a * r, h: n * r + a * o };
    }

    _getLabelCapacity(t) {
        const e = this.options.time, n = e.displayFormats, s = n[e.unit] || n.millisecond,
          o = this._tickFormatFunction(t, 0, Gr(this, [t], this._majorUnit), s), r = this._getLabelSize(o),
          a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
        return a > 0 ? a : 1;
    }

    getDataTimestamps() {
        let t = this._cache.data || [], e, n;
        if (t.length) return t;
        const s = this.getMatchingVisibleMetas();
        if (this._normalized && s.length) return this._cache.data = s[0].controller.getAllParsedValues(this);
        for (e = 0, n = s.length; e < n; ++e) t = t.concat(s[e].controller.getAllParsedValues(this));
        return this._cache.data = this.normalize(t);
    }

    getLabelTimestamps() {
        const t = this._cache.labels || [];
        let e, n;
        if (t.length) return t;
        const s = this.getLabels();
        for (e = 0, n = s.length; e < n; ++e) t.push(Yr(this, s[e]));
        return this._cache.labels = this._normalized ? t : this.normalize(t);
    }

    normalize(t) {
        return ho(t.sort($f));
    }
}

qe.id = 'time', qe.defaults = {
    bounds: 'data',
    adapters: {},
    time: { parser: !1, unit: !1, round: !1, isoWeekday: !1, minUnit: 'millisecond', displayFormats: {} },
    ticks: { source: 'auto', major: { enabled: !1 } }
};

function en(i, t, e) {
    let n = 0, s = i.length - 1, o, r, a, d;
    e ? (t >= i[n].pos && t <= i[s].pos && ({ lo: n, hi: s } = Ot(i, 'pos', t)), { pos: o, time: a } = i[n], {
        pos: r,
        time: d
    } = i[s]) : (t >= i[n].time && t <= i[s].time && ({ lo: n, hi: s } = Ot(i, 'time', t)), {
        time: o,
        pos: a
    } = i[n], { time: r, pos: d } = i[s]);
    const u = r - o;
    return u ? a + (d - a) * (t - o) / u : a;
}

class us extends qe {
    constructor(t) {
        super(t);
        this._table = [], this._minPos = void 0, this._tableRange = void 0;
    }

    initOffsets() {
        const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
        this._minPos = en(e, this.min), this._tableRange = en(e, this.max) - this._minPos, super.initOffsets(t);
    }

    buildLookupTable(t) {
        const { min: e, max: n } = this, s = [], o = [];
        let r, a, d, u, l;
        for (r = 0, a = t.length; r < a; ++r) u = t[r], u >= e && u <= n && s.push(u);
        if (s.length < 2) return [{ time: e, pos: 0 }, { time: n, pos: 1 }];
        for (r = 0, a = s.length; r < a; ++r) l = s[r + 1], d = s[r - 1], u = s[r], Math.round((l + d) / 2) !== u && o.push({
            time: u,
            pos: r / (a - 1)
        });
        return o;
    }

    _getTimestampsForTable() {
        let t = this._cache.all || [];
        if (t.length) return t;
        const e = this.getDataTimestamps(), n = this.getLabelTimestamps();
        return e.length && n.length ? t = this.normalize(e.concat(n)) : t = e.length ? e : n, t = this._cache.all = t, t;
    }

    getDecimalForValue(t) {
        return (en(this._table, t) - this._minPos) / this._tableRange;
    }

    getValueForPixel(t) {
        const e = this._offsets, n = this.getDecimalForPixel(t) / e.factor - e.end;
        return en(this._table, n * this._tableRange + this._minPos, !0);
    }
}

us.id = 'timeseries', us.defaults = qe.defaults;
var Gf = Object.freeze({
    __proto__: null,
    CategoryScale: Zi,
    LinearScale: rs,
    LogarithmicScale: as,
    RadialLinearScale: Xe,
    TimeScale: qe,
    TimeSeriesScale: us
});
const Kf = [wc, Xl, Df, Gf];
$i.register(...Kf);
export {
    Ba as A,
    Ke as B,
    xn as C,
    ra as D,
    da as E,
    ua as F,
    aa as G,
    Rs as H,
    qa as I,
    Ra as J,
    na as K,
    zt as L,
    ct as M,
    nd as N,
    ka as O,
    Ma as P,
    xa as Q,
    ba as R,
    _n as S,
    rn as T,
    vs as U,
    ws as V,
    wa as W,
    gd as X,
    Aa as Y,
    ln as Z,
    $i as _,
    Nt as a,
    vt as b,
    Yt as c,
    mt as d,
    Bt as e,
    ye as f,
    dn as g,
    va as h,
    bn as i,
    Ts as j,
    ni as k,
    _a as l,
    Os as m,
    si as n,
    pn as o,
    ja as p,
    Ua as q,
    Ps as r,
    Je as s,
    we as t,
    hi as u,
    mn as v,
    Ds as w,
    ke as x,
    Oa as y,
    Ta as z
};
