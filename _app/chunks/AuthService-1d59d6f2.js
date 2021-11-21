import { C as m, I as g } from './vendor-16550cf7.js';

class f {
    constructor(e) {
        this._name = e;
    }

    log(...e) {
        console.log(`%c[${this._name}] %c${e}`, 'color: #e092e0; font-family: \'Roboto Mono\';  font-size: 0.8rem', 'font-family: \'Roboto Mono\'; font-size: 0.8rem');
    }

    warn(...e) {
        console.log(`%c[${this._name}] %c${e}`, 'color: #e092e0; font-family: \'Roboto Mono\'', 'font-family: \'Roboto Mono\'; color: #FFDD9E;');
    }

    error(...e) {
        console.log(`%c[${this._name}] %c${e}`, 'color: #e092e0; font-family: \'Roboto Mono\'', 'font-family: \'Roboto Mono\'; color: #FF8080;');
    }
}

class u {
    static get EngineHost() {
        return this._engineHost || (this._engineHost = 'https://engine.primrose.games', typeof window != 'undefined' && (window.location.host.includes('localhost') ? this._engineHost = 'http://localhost:2901' : window.location.host.includes('192.168') && (this._engineHost = 'http://192.168.1.85:2901'))), this._engineHost;
    }

    static get ApiUrl() {
        return this._apiUrl || (this._apiUrl = 'https://app-api.primrose.games', typeof window != 'undefined' && (window.location.host.includes('localhost') ? this._apiUrl = 'http://localhost:41099' : window.location.host.includes('192.168') && (this._apiUrl = 'http://192.168.1.85:41099'))), this._apiUrl;
    }

    static get WebsiteUrl() {
        return this._apiUrl || (this._apiUrl = this.WebsiteUrlPublic, typeof window != 'undefined' && (window.location.host.includes('localhost') ? this._apiUrl = 'http://localhost:2900' : window.location.host.includes('192.168') && (this._apiUrl = 'http://192.168.1.85:41099'))), this._apiUrl;
    }
}

u._apiUrl = void 0, u._engineHost = void 0, u.WebsiteUrlPublic = 'https://app.primrose.games';

class a {
    static async GetAsync(e, s = {}) {
        return await a.RequestAsync('GET', e, null, s);
    }

    static async PostAsync(e, s = null, r = {}) {
        return r.cache = 'no-cache', await a.RequestAsync('POST', e, s ? JSON.stringify(s) : '', r);
    }

    static async PatchAsync(e, s = null, r = {}) {
        return r.cache = 'no-cache', await a.RequestAsync('PATCH', e, s ? JSON.stringify(s) : '', r);
    }

    static async PostFormAsync(e, s = null, r = {}) {
        return r.cache = 'no-cache', r.headers = { 'Primrose-AuthService-SessionToken': l.SessionToken }, await a.RequestAsync('POST', e, s, r);
    }

    static async RequestAsync(e, s, r, o = {}) {
        return await g(`${u.ApiUrl}/${s}`, {
            method: e,
            mode: o?.mode ?? 'cors',
            cache: o?.cache ?? 'no-cache',
            credentials: o?.credentials ?? 'include',
            headers: o?.headers ?? {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'br',
                'Primrose-AuthService-SessionToken': l.SessionToken
            },
            redirect: o?.redirect ?? 'follow',
            referrerPolicy: o?.referrerPolicy ?? 'no-referrer',
            body: r
        }).then(async n => n.ok ? n.headers.get('Content-Type').startsWith('application/json') ? [await n.json(), null] : [await n.blob(), null] : n.headers.get('Content-Type').startsWith('application/json') ? [null, { error: (await n.json()).error }] : [null, { error: `Bad status code: ${n.status}` }]).catch(n => [null, { error: n }]);
    }
}

const c = new f('AuthService');
let h = !0;
const d = 'AuthService.OAuth2State';

function p() {
    let t = '';
    const e = Math.floor(Math.random() * 10);
    for (let s = 0; s < 20 + e; s++) t += String.fromCharCode(33 + Math.floor(Math.random() * 94));
    return t;
}

function I(t, e) {
    var s = 24 * 60 * 60 * 1e3;
    return (e.getTime() - t.getTime()) / s;
}

const i = class {
    static get UserId() {
        return i._userId;
    }

    static get Username() {
        return i._username;
    }

    static get Discriminator() {
        return i._discriminator;
    }

    static get Status() {
        return i._status;
    }

    static get SessionToken() {
        return i._sessionToken;
    }

    static get OAuthProvider() {
        return i._oauthProviderName;
    }

    static async Init() {
        this._sessionToken = localStorage.getItem('sessionToken'), this._userId = localStorage.getItem('userId'), this._username = localStorage.getItem('username'), this._discriminator = localStorage.getItem('discriminator'), this._oauthProviderName = localStorage.getItem('oauthProvider'), this._oauthProviders.set('Discord', {
            providerUrl: 'https://discord.com/api/oauth2/authorize',
            clientId: '602640998304317441',
            redirectUri: 'https://app.primrose.games/oauth2/Discord',
            responseType: 'code',
            roles: ['identify', 'email']
        }), this.IsLoggedIn.subscribe(r => {
            r ? c.log(`Logged in as ${this._username}#${this._discriminator} <${this._userId}>`) : h || c.log('Logged out'), h = !0;
        }), this._sessionToken != null && this.IsLoggedIn.set(!0);
        const t = new Date, e = new Date(Date.parse(localStorage.getItem('sessionExpiresAt')));
        I(t, e) < 3 && await this.RefreshTokenAsync();
    }

    static ApplyLoginResult(t) {
        localStorage.setItem('sessionToken', t.sessionToken), this._sessionToken = t.sessionToken, localStorage.setItem('sessionExpiresAt', t.sessionExpiresAt), this._sessionExpiresAt = t.sessionExpiresAt, localStorage.setItem('userId', t.userId), this._userId = t.userId, localStorage.setItem('username', t.username), this._username = t.username, localStorage.setItem('discriminator', t.discriminator), this._discriminator = t.discriminator, localStorage.setItem('oauthProvider', t.oauthProvider), this._oauthProviderName = t.oauthProvider, this.IsLoggedIn.set(!0);
    }

    static async LoginAsync(t, e) {
        const [s, r] = await a.PostAsync('Auth/v1/Login', { email: t, password: e });
        return console.log(s, r), s == null || r || !s.userId ? (c.error('failed to login'), !1) : (this.ApplyLoginResult(s), !0);
    }

    static async RefreshTokenAsync() {
        if (this._sessionToken == null) return !1;
        const [t, e] = await a.PostAsync(`Auth/v1/Login/Refresh?provider=${i.OAuthProvider}`);
        if (e) return c.error('failed to refresh'), await this.LogoutAsync(), !1;
        let s = t.sessionToken;
        return console.log('RefreshToken', t), localStorage.setItem('sessionToken', s), localStorage.setItem('sessionExpiresAt', t.sessionExpiresAt), this._sessionToken = s, c.log('Token refreshed'), !0;
    }

    static async LogoutAsync() {
        const [t, e] = await a.PostAsync(`Auth/v1/Login/Revoke?sessionToken=${i.SessionToken}`);
        return e && c.error(`Login revoke failed with error: ${e}`), this.LogoutLocal(), !0;
    }

    static async RegisterAsync(t, e, s, r) {
        const [o, n] = await a.PostAsync('Auth/v1/Register', {
            email: t,
            username: e,
            password: s,
            birthDate: r.toISOString()
        });
        return o == null || n ? (c.error('failed to register'), !1) : (localStorage.setItem('sessionToken', o.sessionToken), i._sessionToken = o.sessionToken, localStorage.setItem('sessionExpiresAt', o.sessionExpiresAt), i._sessionExpiresAt = o.sessionExpiresAt, localStorage.setItem('userId', o.userId), i._userId = o.userId, localStorage.setItem('username', o.username), i._username = o.username, localStorage.setItem('discriminator', o.discriminator), i._discriminator = o.discriminator, i.IsLoggedIn.set(!0), !0);
    }

    static async LoginOAuthAsync(t, e, s) {
        const r = localStorage.getItem(d);
        if (e) {
            if (r != s) return c.error(`OAuth state did not match. Expected: '${r}' Got: '${s}'`), {
                result: !1,
                error: 'AuthService.OAuth.StateMismatch'
            };
            let [o, n] = await a.PostAsync('Auth/v1/Login', { oauthProvider: t, oauthCode: e });
            return n ? { result: !1, error: n } : (this.ApplyLoginResult(o), { result: !0 });
        } else {
            let o = this.GenerateOAuthUrl(t);
            return window.location.assign(o), { result: !0 };
        }
    }

    static GenerateOAuthUrl(t) {
        const e = this._oauthProviders.get(t);
        let s = p();
        localStorage.setItem(d, s);
        let r = `${u.WebsiteUrlPublic}/oauth2/${encodeURIComponent(t)}`, o = e.roles.join(' ');
        return `${e.providerUrl}?client_id=${encodeURIComponent(e.clientId)}&redirect_uri=${encodeURIComponent(r)}&response_type=${encodeURIComponent(e.responseType)}&scope=${encodeURIComponent(o)}&state=${encodeURIComponent(btoa(s))}`;
    }

    static LogoutLocal() {
        localStorage.removeItem('sessionToken'), i._sessionToken = null, localStorage.removeItem('sessionExpiresAt'), i._sessionExpiresAt = null, localStorage.removeItem('userId'), i._userId = null, localStorage.removeItem('username'), i._username = null, localStorage.removeItem('discriminator'), i._discriminator = null, i.IsLoggedIn.set(!1);
    }
};
let l = i;
l._status = '\u2692\uFE0F', l._oauthProviders = new Map, l.IsLoggedIn = m(!1);
export { l as A };
