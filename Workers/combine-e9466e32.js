define(["exports", "./when-4bbc8319"], function (e, n) {
  "use strict";
  e.combine = function e(t, o, r) {
    r = n.defaultValue(r, !1);
    const f = {},
      i = n.defined(t),
      c = n.defined(o);
    let s, p, a;
    if (i)
      for (s in t)
        t.hasOwnProperty(s) &&
          ((p = t[s]),
          c && r && "object" == typeof p && o.hasOwnProperty(s)
            ? ((a = o[s]), (f[s] = "object" == typeof a ? e(p, a, r) : p))
            : (f[s] = p));
    if (c)
      for (s in o)
        o.hasOwnProperty(s) && !f.hasOwnProperty(s) && ((a = o[s]), (f[s] = a));
    return f;
  };
});
