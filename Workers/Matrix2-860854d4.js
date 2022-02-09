define([
  "exports",
  "./RuntimeError-1349fdaf",
  "./when-4bbc8319",
  "./ComponentDatatype-8f55628c",
], function (t, e, n, r) {
  "use strict";
  function i(t, e, r) {
    (this.x = n.defaultValue(t, 0)),
      (this.y = n.defaultValue(e, 0)),
      (this.z = n.defaultValue(r, 0));
  }
  (i.fromSpherical = function (t, e) {
    n.defined(e) || (e = new i());
    const r = t.clock,
      a = t.cone,
      u = n.defaultValue(t.magnitude, 1),
      o = u * Math.sin(a);
    return (
      (e.x = o * Math.cos(r)),
      (e.y = o * Math.sin(r)),
      (e.z = u * Math.cos(a)),
      e
    );
  }),
    (i.fromElements = function (t, e, r, a) {
      return n.defined(a)
        ? ((a.x = t), (a.y = e), (a.z = r), a)
        : new i(t, e, r);
    }),
    (i.clone = function (t, e) {
      if (n.defined(t))
        return n.defined(e)
          ? ((e.x = t.x), (e.y = t.y), (e.z = t.z), e)
          : new i(t.x, t.y, t.z);
    }),
    (i.fromCartesian4 = i.clone),
    (i.packedLength = 3),
    (i.pack = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        (e[r++] = t.x),
        (e[r++] = t.y),
        (e[r] = t.z),
        e
      );
    }),
    (i.unpack = function (t, e, r) {
      return (
        (e = n.defaultValue(e, 0)),
        n.defined(r) || (r = new i()),
        (r.x = t[e++]),
        (r.y = t[e++]),
        (r.z = t[e]),
        r
      );
    }),
    (i.packArray = function (t, r) {
      const a = t.length,
        u = 3 * a;
      if (n.defined(r)) {
        if (!Array.isArray(r) && r.length !== u)
          throw new e.DeveloperError(
            "If result is a typed array, it must have exactly array.length * 3 elements"
          );
        r.length !== u && (r.length = u);
      } else r = new Array(u);
      for (let e = 0; e < a; ++e) i.pack(t[e], r, 3 * e);
      return r;
    }),
    (i.unpackArray = function (t, e) {
      const r = t.length;
      n.defined(e) ? (e.length = r / 3) : (e = new Array(r / 3));
      for (let n = 0; n < r; n += 3) {
        const r = n / 3;
        e[r] = i.unpack(t, n, e[r]);
      }
      return e;
    }),
    (i.fromArray = i.unpack),
    (i.maximumComponent = function (t) {
      return Math.max(t.x, t.y, t.z);
    }),
    (i.minimumComponent = function (t) {
      return Math.min(t.x, t.y, t.z);
    }),
    (i.minimumByComponent = function (t, e, n) {
      return (
        (n.x = Math.min(t.x, e.x)),
        (n.y = Math.min(t.y, e.y)),
        (n.z = Math.min(t.z, e.z)),
        n
      );
    }),
    (i.maximumByComponent = function (t, e, n) {
      return (
        (n.x = Math.max(t.x, e.x)),
        (n.y = Math.max(t.y, e.y)),
        (n.z = Math.max(t.z, e.z)),
        n
      );
    }),
    (i.magnitudeSquared = function (t) {
      return t.x * t.x + t.y * t.y + t.z * t.z;
    }),
    (i.magnitude = function (t) {
      return Math.sqrt(i.magnitudeSquared(t));
    });
  const a = new i();
  (i.distance = function (t, e) {
    return i.subtract(t, e, a), i.magnitude(a);
  }),
    (i.distanceSquared = function (t, e) {
      return i.subtract(t, e, a), i.magnitudeSquared(a);
    }),
    (i.normalize = function (t, e) {
      const n = i.magnitude(t);
      return (e.x = t.x / n), (e.y = t.y / n), (e.z = t.z / n), e;
    }),
    (i.dot = function (t, e) {
      return t.x * e.x + t.y * e.y + t.z * e.z;
    }),
    (i.multiplyComponents = function (t, e, n) {
      return (n.x = t.x * e.x), (n.y = t.y * e.y), (n.z = t.z * e.z), n;
    }),
    (i.divideComponents = function (t, e, n) {
      return (n.x = t.x / e.x), (n.y = t.y / e.y), (n.z = t.z / e.z), n;
    }),
    (i.add = function (t, e, n) {
      return (n.x = t.x + e.x), (n.y = t.y + e.y), (n.z = t.z + e.z), n;
    }),
    (i.subtract = function (t, e, n) {
      return (n.x = t.x - e.x), (n.y = t.y - e.y), (n.z = t.z - e.z), n;
    }),
    (i.multiplyByScalar = function (t, e, n) {
      return (n.x = t.x * e), (n.y = t.y * e), (n.z = t.z * e), n;
    }),
    (i.divideByScalar = function (t, e, n) {
      return (n.x = t.x / e), (n.y = t.y / e), (n.z = t.z / e), n;
    }),
    (i.negate = function (t, e) {
      return (e.x = -t.x), (e.y = -t.y), (e.z = -t.z), e;
    }),
    (i.abs = function (t, e) {
      return (
        (e.x = Math.abs(t.x)), (e.y = Math.abs(t.y)), (e.z = Math.abs(t.z)), e
      );
    });
  const u = new i();
  i.lerp = function (t, e, n, r) {
    return (
      i.multiplyByScalar(e, n, u),
      (r = i.multiplyByScalar(t, 1 - n, r)),
      i.add(u, r, r)
    );
  };
  const o = new i(),
    s = new i();
  i.angleBetween = function (t, e) {
    i.normalize(t, o), i.normalize(e, s);
    const n = i.dot(o, s),
      r = i.magnitude(i.cross(o, s, o));
    return Math.atan2(r, n);
  };
  const c = new i();
  (i.mostOrthogonalAxis = function (t, e) {
    const n = i.normalize(t, c);
    return (
      i.abs(n, n),
      (e =
        n.x <= n.y
          ? n.x <= n.z
            ? i.clone(i.UNIT_X, e)
            : i.clone(i.UNIT_Z, e)
          : n.y <= n.z
          ? i.clone(i.UNIT_Y, e)
          : i.clone(i.UNIT_Z, e))
    );
  }),
    (i.projectVector = function (t, e, n) {
      const r = i.dot(t, e) / i.dot(e, e);
      return i.multiplyByScalar(e, r, n);
    }),
    (i.equals = function (t, e) {
      return (
        t === e ||
        (n.defined(t) &&
          n.defined(e) &&
          t.x === e.x &&
          t.y === e.y &&
          t.z === e.z)
      );
    }),
    (i.equalsArray = function (t, e, n) {
      return t.x === e[n] && t.y === e[n + 1] && t.z === e[n + 2];
    }),
    (i.equalsEpsilon = function (t, e, i, a) {
      return (
        t === e ||
        (n.defined(t) &&
          n.defined(e) &&
          r.CesiumMath.equalsEpsilon(t.x, e.x, i, a) &&
          r.CesiumMath.equalsEpsilon(t.y, e.y, i, a) &&
          r.CesiumMath.equalsEpsilon(t.z, e.z, i, a))
      );
    }),
    (i.cross = function (t, e, n) {
      const r = t.x,
        i = t.y,
        a = t.z,
        u = e.x,
        o = e.y,
        s = e.z,
        c = i * s - a * o,
        l = a * u - r * s,
        f = r * o - i * u;
      return (n.x = c), (n.y = l), (n.z = f), n;
    }),
    (i.midpoint = function (t, e, n) {
      return (
        (n.x = 0.5 * (t.x + e.x)),
        (n.y = 0.5 * (t.y + e.y)),
        (n.z = 0.5 * (t.z + e.z)),
        n
      );
    }),
    (i.fromDegrees = function (t, e, n, a, u) {
      return (
        (t = r.CesiumMath.toRadians(t)),
        (e = r.CesiumMath.toRadians(e)),
        i.fromRadians(t, e, n, a, u)
      );
    });
  let l = new i(),
    f = new i();
  const d = new i(40680631590769, 40680631590769, 40408299984661.445);
  (i.fromRadians = function (t, e, r, a, u) {
    r = n.defaultValue(r, 0);
    const o = n.defined(a) ? a.radiiSquared : d,
      s = Math.cos(e);
    (l.x = s * Math.cos(t)),
      (l.y = s * Math.sin(t)),
      (l.z = Math.sin(e)),
      (l = i.normalize(l, l)),
      i.multiplyComponents(o, l, f);
    const c = Math.sqrt(i.dot(l, f));
    return (
      (f = i.divideByScalar(f, c, f)),
      (l = i.multiplyByScalar(l, r, l)),
      n.defined(u) || (u = new i()),
      i.add(f, l, u)
    );
  }),
    (i.fromDegreesArray = function (t, e, r) {
      const a = t.length;
      n.defined(r) ? (r.length = a / 2) : (r = new Array(a / 2));
      for (let n = 0; n < a; n += 2) {
        const a = t[n],
          u = t[n + 1],
          o = n / 2;
        r[o] = i.fromDegrees(a, u, 0, e, r[o]);
      }
      return r;
    }),
    (i.fromRadiansArray = function (t, e, r) {
      const a = t.length;
      n.defined(r) ? (r.length = a / 2) : (r = new Array(a / 2));
      for (let n = 0; n < a; n += 2) {
        const a = t[n],
          u = t[n + 1],
          o = n / 2;
        r[o] = i.fromRadians(a, u, 0, e, r[o]);
      }
      return r;
    }),
    (i.fromDegreesArrayHeights = function (t, e, r) {
      const a = t.length;
      n.defined(r) ? (r.length = a / 3) : (r = new Array(a / 3));
      for (let n = 0; n < a; n += 3) {
        const a = t[n],
          u = t[n + 1],
          o = t[n + 2],
          s = n / 3;
        r[s] = i.fromDegrees(a, u, o, e, r[s]);
      }
      return r;
    }),
    (i.fromRadiansArrayHeights = function (t, e, r) {
      const a = t.length;
      n.defined(r) ? (r.length = a / 3) : (r = new Array(a / 3));
      for (let n = 0; n < a; n += 3) {
        const a = t[n],
          u = t[n + 1],
          o = t[n + 2],
          s = n / 3;
        r[s] = i.fromRadians(a, u, o, e, r[s]);
      }
      return r;
    }),
    (i.ZERO = Object.freeze(new i(0, 0, 0))),
    (i.ONE = Object.freeze(new i(1, 1, 1))),
    (i.UNIT_X = Object.freeze(new i(1, 0, 0))),
    (i.UNIT_Y = Object.freeze(new i(0, 1, 0))),
    (i.UNIT_Z = Object.freeze(new i(0, 0, 1))),
    (i.prototype.clone = function (t) {
      return i.clone(this, t);
    }),
    (i.prototype.equals = function (t) {
      return i.equals(this, t);
    }),
    (i.prototype.equalsEpsilon = function (t, e, n) {
      return i.equalsEpsilon(this, t, e, n);
    }),
    (i.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    });
  const h = new i(),
    m = new i();
  function y(t, e, a, u, o) {
    const s = t.x,
      c = t.y,
      l = t.z,
      f = e.x,
      d = e.y,
      y = e.z,
      p = s * s * f * f,
      x = c * c * d * d,
      M = l * l * y * y,
      w = p + x + M,
      g = Math.sqrt(1 / w),
      z = i.multiplyByScalar(t, g, h);
    if (w < u) return isFinite(g) ? i.clone(z, o) : void 0;
    const C = a.x,
      O = a.y,
      b = a.z,
      S = m;
    (S.x = z.x * C * 2), (S.y = z.y * O * 2), (S.z = z.z * b * 2);
    let q,
      _,
      R,
      V,
      E,
      T,
      A,
      I,
      N,
      U,
      L,
      v = ((1 - g) * i.magnitude(t)) / (0.5 * i.magnitude(S)),
      P = 0;
    do {
      (v -= P),
        (R = 1 / (1 + v * C)),
        (V = 1 / (1 + v * O)),
        (E = 1 / (1 + v * b)),
        (T = R * R),
        (A = V * V),
        (I = E * E),
        (N = T * R),
        (U = A * V),
        (L = I * E),
        (q = p * T + x * A + M * I - 1),
        (_ = p * N * C + x * U * O + M * L * b);
      P = q / (-2 * _);
    } while (Math.abs(q) > r.CesiumMath.EPSILON12);
    return n.defined(o)
      ? ((o.x = s * R), (o.y = c * V), (o.z = l * E), o)
      : new i(s * R, c * V, l * E);
  }
  function p(t, e, r) {
    (this.longitude = n.defaultValue(t, 0)),
      (this.latitude = n.defaultValue(e, 0)),
      (this.height = n.defaultValue(r, 0));
  }
  (p.fromRadians = function (t, e, r, i) {
    return (
      (r = n.defaultValue(r, 0)),
      n.defined(i)
        ? ((i.longitude = t), (i.latitude = e), (i.height = r), i)
        : new p(t, e, r)
    );
  }),
    (p.fromDegrees = function (t, e, n, i) {
      return (
        (t = r.CesiumMath.toRadians(t)),
        (e = r.CesiumMath.toRadians(e)),
        p.fromRadians(t, e, n, i)
      );
    });
  const x = new i(),
    M = new i(),
    w = new i(),
    g = new i(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
    z = new i(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
    C = r.CesiumMath.EPSILON1;
  function O(t, e, a, u) {
    (e = n.defaultValue(e, 0)),
      (a = n.defaultValue(a, 0)),
      (u = n.defaultValue(u, 0)),
      (t._radii = new i(e, a, u)),
      (t._radiiSquared = new i(e * e, a * a, u * u)),
      (t._radiiToTheFourth = new i(
        e * e * e * e,
        a * a * a * a,
        u * u * u * u
      )),
      (t._oneOverRadii = new i(
        0 === e ? 0 : 1 / e,
        0 === a ? 0 : 1 / a,
        0 === u ? 0 : 1 / u
      )),
      (t._oneOverRadiiSquared = new i(
        0 === e ? 0 : 1 / (e * e),
        0 === a ? 0 : 1 / (a * a),
        0 === u ? 0 : 1 / (u * u)
      )),
      (t._minimumRadius = Math.min(e, a, u)),
      (t._maximumRadius = Math.max(e, a, u)),
      (t._centerToleranceSquared = r.CesiumMath.EPSILON1),
      0 !== t._radiiSquared.z &&
        (t._squaredXOverSquaredZ = t._radiiSquared.x / t._radiiSquared.z);
  }
  function b(t, e, n) {
    (this._radii = void 0),
      (this._radiiSquared = void 0),
      (this._radiiToTheFourth = void 0),
      (this._oneOverRadii = void 0),
      (this._oneOverRadiiSquared = void 0),
      (this._minimumRadius = void 0),
      (this._maximumRadius = void 0),
      (this._centerToleranceSquared = void 0),
      (this._squaredXOverSquaredZ = void 0),
      O(this, t, e, n);
  }
  (p.fromCartesian = function (t, e, a) {
    const u = n.defined(e) ? e.oneOverRadii : g,
      o = n.defined(e) ? e.oneOverRadiiSquared : z,
      s = y(t, u, o, n.defined(e) ? e._centerToleranceSquared : C, M);
    if (!n.defined(s)) return;
    let c = i.multiplyComponents(s, o, x);
    c = i.normalize(c, c);
    const l = i.subtract(t, s, w),
      f = Math.atan2(c.y, c.x),
      d = Math.asin(c.z),
      h = r.CesiumMath.sign(i.dot(l, t)) * i.magnitude(l);
    return n.defined(a)
      ? ((a.longitude = f), (a.latitude = d), (a.height = h), a)
      : new p(f, d, h);
  }),
    (p.toCartesian = function (t, e, n) {
      return i.fromRadians(t.longitude, t.latitude, t.height, e, n);
    }),
    (p.clone = function (t, e) {
      if (n.defined(t))
        return n.defined(e)
          ? ((e.longitude = t.longitude),
            (e.latitude = t.latitude),
            (e.height = t.height),
            e)
          : new p(t.longitude, t.latitude, t.height);
    }),
    (p.equals = function (t, e) {
      return (
        t === e ||
        (n.defined(t) &&
          n.defined(e) &&
          t.longitude === e.longitude &&
          t.latitude === e.latitude &&
          t.height === e.height)
      );
    }),
    (p.equalsEpsilon = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        t === e ||
          (n.defined(t) &&
            n.defined(e) &&
            Math.abs(t.longitude - e.longitude) <= r &&
            Math.abs(t.latitude - e.latitude) <= r &&
            Math.abs(t.height - e.height) <= r)
      );
    }),
    (p.ZERO = Object.freeze(new p(0, 0, 0))),
    (p.prototype.clone = function (t) {
      return p.clone(this, t);
    }),
    (p.prototype.equals = function (t) {
      return p.equals(this, t);
    }),
    (p.prototype.equalsEpsilon = function (t, e) {
      return p.equalsEpsilon(this, t, e);
    }),
    (p.prototype.toString = function () {
      return (
        "(" + this.longitude + ", " + this.latitude + ", " + this.height + ")"
      );
    }),
    Object.defineProperties(b.prototype, {
      radii: {
        get: function () {
          return this._radii;
        },
      },
      radiiSquared: {
        get: function () {
          return this._radiiSquared;
        },
      },
      radiiToTheFourth: {
        get: function () {
          return this._radiiToTheFourth;
        },
      },
      oneOverRadii: {
        get: function () {
          return this._oneOverRadii;
        },
      },
      oneOverRadiiSquared: {
        get: function () {
          return this._oneOverRadiiSquared;
        },
      },
      minimumRadius: {
        get: function () {
          return this._minimumRadius;
        },
      },
      maximumRadius: {
        get: function () {
          return this._maximumRadius;
        },
      },
    }),
    (b.clone = function (t, e) {
      if (!n.defined(t)) return;
      const r = t._radii;
      return n.defined(e)
        ? (i.clone(r, e._radii),
          i.clone(t._radiiSquared, e._radiiSquared),
          i.clone(t._radiiToTheFourth, e._radiiToTheFourth),
          i.clone(t._oneOverRadii, e._oneOverRadii),
          i.clone(t._oneOverRadiiSquared, e._oneOverRadiiSquared),
          (e._minimumRadius = t._minimumRadius),
          (e._maximumRadius = t._maximumRadius),
          (e._centerToleranceSquared = t._centerToleranceSquared),
          e)
        : new b(r.x, r.y, r.z);
    }),
    (b.fromCartesian3 = function (t, e) {
      return (
        n.defined(e) || (e = new b()),
        n.defined(t) ? (O(e, t.x, t.y, t.z), e) : e
      );
    }),
    (b.WGS84 = Object.freeze(new b(6378137, 6378137, 6356752.314245179))),
    (b.UNIT_SPHERE = Object.freeze(new b(1, 1, 1))),
    (b.MOON = Object.freeze(
      new b(
        r.CesiumMath.LUNAR_RADIUS,
        r.CesiumMath.LUNAR_RADIUS,
        r.CesiumMath.LUNAR_RADIUS
      )
    )),
    (b.prototype.clone = function (t) {
      return b.clone(this, t);
    }),
    (b.packedLength = i.packedLength),
    (b.pack = function (t, e, r) {
      return (r = n.defaultValue(r, 0)), i.pack(t._radii, e, r), e;
    }),
    (b.unpack = function (t, e, r) {
      e = n.defaultValue(e, 0);
      const a = i.unpack(t, e);
      return b.fromCartesian3(a, r);
    }),
    (b.prototype.geocentricSurfaceNormal = i.normalize),
    (b.prototype.geodeticSurfaceNormalCartographic = function (t, e) {
      const r = t.longitude,
        a = t.latitude,
        u = Math.cos(a),
        o = u * Math.cos(r),
        s = u * Math.sin(r),
        c = Math.sin(a);
      return (
        n.defined(e) || (e = new i()),
        (e.x = o),
        (e.y = s),
        (e.z = c),
        i.normalize(e, e)
      );
    }),
    (b.prototype.geodeticSurfaceNormal = function (t, e) {
      if (!i.equalsEpsilon(t, i.ZERO, r.CesiumMath.EPSILON14))
        return (
          n.defined(e) || (e = new i()),
          (e = i.multiplyComponents(t, this._oneOverRadiiSquared, e)),
          i.normalize(e, e)
        );
    });
  const S = new i(),
    q = new i();
  (b.prototype.cartographicToCartesian = function (t, e) {
    const r = S,
      a = q;
    this.geodeticSurfaceNormalCartographic(t, r),
      i.multiplyComponents(this._radiiSquared, r, a);
    const u = Math.sqrt(i.dot(r, a));
    return (
      i.divideByScalar(a, u, a),
      i.multiplyByScalar(r, t.height, r),
      n.defined(e) || (e = new i()),
      i.add(a, r, e)
    );
  }),
    (b.prototype.cartographicArrayToCartesianArray = function (t, e) {
      const r = t.length;
      n.defined(e) ? (e.length = r) : (e = new Array(r));
      for (let n = 0; n < r; n++)
        e[n] = this.cartographicToCartesian(t[n], e[n]);
      return e;
    });
  const _ = new i(),
    R = new i(),
    V = new i();
  (b.prototype.cartesianToCartographic = function (t, e) {
    const a = this.scaleToGeodeticSurface(t, R);
    if (!n.defined(a)) return;
    const u = this.geodeticSurfaceNormal(a, _),
      o = i.subtract(t, a, V),
      s = Math.atan2(u.y, u.x),
      c = Math.asin(u.z),
      l = r.CesiumMath.sign(i.dot(o, t)) * i.magnitude(o);
    return n.defined(e)
      ? ((e.longitude = s), (e.latitude = c), (e.height = l), e)
      : new p(s, c, l);
  }),
    (b.prototype.cartesianArrayToCartographicArray = function (t, e) {
      const r = t.length;
      n.defined(e) ? (e.length = r) : (e = new Array(r));
      for (let n = 0; n < r; ++n)
        e[n] = this.cartesianToCartographic(t[n], e[n]);
      return e;
    }),
    (b.prototype.scaleToGeodeticSurface = function (t, e) {
      return y(
        t,
        this._oneOverRadii,
        this._oneOverRadiiSquared,
        this._centerToleranceSquared,
        e
      );
    }),
    (b.prototype.scaleToGeocentricSurface = function (t, e) {
      n.defined(e) || (e = new i());
      const r = t.x,
        a = t.y,
        u = t.z,
        o = this._oneOverRadiiSquared,
        s = 1 / Math.sqrt(r * r * o.x + a * a * o.y + u * u * o.z);
      return i.multiplyByScalar(t, s, e);
    }),
    (b.prototype.transformPositionToScaledSpace = function (t, e) {
      return (
        n.defined(e) || (e = new i()),
        i.multiplyComponents(t, this._oneOverRadii, e)
      );
    }),
    (b.prototype.transformPositionFromScaledSpace = function (t, e) {
      return (
        n.defined(e) || (e = new i()), i.multiplyComponents(t, this._radii, e)
      );
    }),
    (b.prototype.equals = function (t) {
      return this === t || (n.defined(t) && i.equals(this._radii, t._radii));
    }),
    (b.prototype.toString = function () {
      return this._radii.toString();
    }),
    (b.prototype.getSurfaceNormalIntersectionWithZAxis = function (t, e, r) {
      e = n.defaultValue(e, 0);
      const a = this._squaredXOverSquaredZ;
      if (
        (n.defined(r) || (r = new i()),
        (r.x = 0),
        (r.y = 0),
        (r.z = t.z * (1 - a)),
        !(Math.abs(r.z) >= this._radii.z - e))
      )
        return r;
    });
  const E = [
      0.14887433898163, 0.43339539412925, 0.67940956829902, 0.86506336668898,
      0.97390652851717, 0,
    ],
    T = [
      0.29552422471475, 0.26926671930999, 0.21908636251598, 0.14945134915058,
      0.066671344308684, 0,
    ];
  function A(t, e, n) {
    const r = 0.5 * (e + t),
      i = 0.5 * (e - t);
    let a = 0;
    for (let t = 0; t < 5; t++) {
      const e = i * E[t];
      a += T[t] * (n(r + e) + n(r - e));
    }
    return (a *= i), a;
  }
  function I(t, e, r, i, a, u, o, s, c) {
    (this[0] = n.defaultValue(t, 0)),
      (this[1] = n.defaultValue(i, 0)),
      (this[2] = n.defaultValue(o, 0)),
      (this[3] = n.defaultValue(e, 0)),
      (this[4] = n.defaultValue(a, 0)),
      (this[5] = n.defaultValue(s, 0)),
      (this[6] = n.defaultValue(r, 0)),
      (this[7] = n.defaultValue(u, 0)),
      (this[8] = n.defaultValue(c, 0));
  }
  (b.prototype.surfaceArea = function (t) {
    const e = t.west;
    let n = t.east;
    const i = t.south,
      a = t.north;
    for (; n < e; ) n += r.CesiumMath.TWO_PI;
    const u = this._radiiSquared,
      o = u.x,
      s = u.y,
      c = u.z,
      l = o * s;
    return A(i, a, function (t) {
      const r = Math.cos(t),
        i = Math.sin(t);
      return (
        Math.cos(t) *
        A(e, n, function (t) {
          const e = Math.cos(t),
            n = Math.sin(t);
          return Math.sqrt(l * i * i + c * (s * e * e + o * n * n) * r * r);
        })
      );
    });
  }),
    (I.packedLength = 9),
    (I.pack = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        (e[r++] = t[0]),
        (e[r++] = t[1]),
        (e[r++] = t[2]),
        (e[r++] = t[3]),
        (e[r++] = t[4]),
        (e[r++] = t[5]),
        (e[r++] = t[6]),
        (e[r++] = t[7]),
        (e[r++] = t[8]),
        e
      );
    }),
    (I.unpack = function (t, e, r) {
      return (
        (e = n.defaultValue(e, 0)),
        n.defined(r) || (r = new I()),
        (r[0] = t[e++]),
        (r[1] = t[e++]),
        (r[2] = t[e++]),
        (r[3] = t[e++]),
        (r[4] = t[e++]),
        (r[5] = t[e++]),
        (r[6] = t[e++]),
        (r[7] = t[e++]),
        (r[8] = t[e++]),
        r
      );
    }),
    (I.clone = function (t, e) {
      if (n.defined(t))
        return n.defined(e)
          ? ((e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            e)
          : new I(t[0], t[3], t[6], t[1], t[4], t[7], t[2], t[5], t[8]);
    }),
    (I.fromArray = function (t, e, r) {
      return (
        (e = n.defaultValue(e, 0)),
        n.defined(r) || (r = new I()),
        (r[0] = t[e]),
        (r[1] = t[e + 1]),
        (r[2] = t[e + 2]),
        (r[3] = t[e + 3]),
        (r[4] = t[e + 4]),
        (r[5] = t[e + 5]),
        (r[6] = t[e + 6]),
        (r[7] = t[e + 7]),
        (r[8] = t[e + 8]),
        r
      );
    }),
    (I.fromColumnMajorArray = function (t, e) {
      return I.clone(t, e);
    }),
    (I.fromRowMajorArray = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t[0]),
          (e[1] = t[3]),
          (e[2] = t[6]),
          (e[3] = t[1]),
          (e[4] = t[4]),
          (e[5] = t[7]),
          (e[6] = t[2]),
          (e[7] = t[5]),
          (e[8] = t[8]),
          e)
        : new I(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
    }),
    (I.fromQuaternion = function (t, e) {
      const r = t.x * t.x,
        i = t.x * t.y,
        a = t.x * t.z,
        u = t.x * t.w,
        o = t.y * t.y,
        s = t.y * t.z,
        c = t.y * t.w,
        l = t.z * t.z,
        f = t.z * t.w,
        d = t.w * t.w,
        h = r - o - l + d,
        m = 2 * (i - f),
        y = 2 * (a + c),
        p = 2 * (i + f),
        x = -r + o - l + d,
        M = 2 * (s - u),
        w = 2 * (a - c),
        g = 2 * (s + u),
        z = -r - o + l + d;
      return n.defined(e)
        ? ((e[0] = h),
          (e[1] = p),
          (e[2] = w),
          (e[3] = m),
          (e[4] = x),
          (e[5] = g),
          (e[6] = y),
          (e[7] = M),
          (e[8] = z),
          e)
        : new I(h, m, y, p, x, M, w, g, z);
    }),
    (I.fromHeadingPitchRoll = function (t, e) {
      const r = Math.cos(-t.pitch),
        i = Math.cos(-t.heading),
        a = Math.cos(t.roll),
        u = Math.sin(-t.pitch),
        o = Math.sin(-t.heading),
        s = Math.sin(t.roll),
        c = r * i,
        l = -a * o + s * u * i,
        f = s * o + a * u * i,
        d = r * o,
        h = a * i + s * u * o,
        m = -s * i + a * u * o,
        y = -u,
        p = s * r,
        x = a * r;
      return n.defined(e)
        ? ((e[0] = c),
          (e[1] = d),
          (e[2] = y),
          (e[3] = l),
          (e[4] = h),
          (e[5] = p),
          (e[6] = f),
          (e[7] = m),
          (e[8] = x),
          e)
        : new I(c, l, f, d, h, m, y, p, x);
    }),
    (I.fromScale = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t.x),
          (e[1] = 0),
          (e[2] = 0),
          (e[3] = 0),
          (e[4] = t.y),
          (e[5] = 0),
          (e[6] = 0),
          (e[7] = 0),
          (e[8] = t.z),
          e)
        : new I(t.x, 0, 0, 0, t.y, 0, 0, 0, t.z);
    }),
    (I.fromUniformScale = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t),
          (e[1] = 0),
          (e[2] = 0),
          (e[3] = 0),
          (e[4] = t),
          (e[5] = 0),
          (e[6] = 0),
          (e[7] = 0),
          (e[8] = t),
          e)
        : new I(t, 0, 0, 0, t, 0, 0, 0, t);
    }),
    (I.fromCrossProduct = function (t, e) {
      return n.defined(e)
        ? ((e[0] = 0),
          (e[1] = t.z),
          (e[2] = -t.y),
          (e[3] = -t.z),
          (e[4] = 0),
          (e[5] = t.x),
          (e[6] = t.y),
          (e[7] = -t.x),
          (e[8] = 0),
          e)
        : new I(0, -t.z, t.y, t.z, 0, -t.x, -t.y, t.x, 0);
    }),
    (I.fromRotationX = function (t, e) {
      const r = Math.cos(t),
        i = Math.sin(t);
      return n.defined(e)
        ? ((e[0] = 1),
          (e[1] = 0),
          (e[2] = 0),
          (e[3] = 0),
          (e[4] = r),
          (e[5] = i),
          (e[6] = 0),
          (e[7] = -i),
          (e[8] = r),
          e)
        : new I(1, 0, 0, 0, r, -i, 0, i, r);
    }),
    (I.fromRotationY = function (t, e) {
      const r = Math.cos(t),
        i = Math.sin(t);
      return n.defined(e)
        ? ((e[0] = r),
          (e[1] = 0),
          (e[2] = -i),
          (e[3] = 0),
          (e[4] = 1),
          (e[5] = 0),
          (e[6] = i),
          (e[7] = 0),
          (e[8] = r),
          e)
        : new I(r, 0, i, 0, 1, 0, -i, 0, r);
    }),
    (I.fromRotationZ = function (t, e) {
      const r = Math.cos(t),
        i = Math.sin(t);
      return n.defined(e)
        ? ((e[0] = r),
          (e[1] = i),
          (e[2] = 0),
          (e[3] = -i),
          (e[4] = r),
          (e[5] = 0),
          (e[6] = 0),
          (e[7] = 0),
          (e[8] = 1),
          e)
        : new I(r, -i, 0, i, r, 0, 0, 0, 1);
    }),
    (I.toArray = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t[0]),
          (e[1] = t[1]),
          (e[2] = t[2]),
          (e[3] = t[3]),
          (e[4] = t[4]),
          (e[5] = t[5]),
          (e[6] = t[6]),
          (e[7] = t[7]),
          (e[8] = t[8]),
          e)
        : [t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]];
    }),
    (I.getElementIndex = function (t, e) {
      return 3 * t + e;
    }),
    (I.getColumn = function (t, e, n) {
      const r = 3 * e,
        i = t[r],
        a = t[r + 1],
        u = t[r + 2];
      return (n.x = i), (n.y = a), (n.z = u), n;
    }),
    (I.setColumn = function (t, e, n, r) {
      const i = 3 * e;
      return (
        ((r = I.clone(t, r))[i] = n.x), (r[i + 1] = n.y), (r[i + 2] = n.z), r
      );
    }),
    (I.getRow = function (t, e, n) {
      const r = t[e],
        i = t[e + 3],
        a = t[e + 6];
      return (n.x = r), (n.y = i), (n.z = a), n;
    }),
    (I.setRow = function (t, e, n, r) {
      return (
        ((r = I.clone(t, r))[e] = n.x), (r[e + 3] = n.y), (r[e + 6] = n.z), r
      );
    });
  const N = new i();
  I.getScale = function (t, e) {
    return (
      (e.x = i.magnitude(i.fromElements(t[0], t[1], t[2], N))),
      (e.y = i.magnitude(i.fromElements(t[3], t[4], t[5], N))),
      (e.z = i.magnitude(i.fromElements(t[6], t[7], t[8], N))),
      e
    );
  };
  const U = new i();
  (I.getMaximumScale = function (t) {
    return I.getScale(t, U), i.maximumComponent(U);
  }),
    (I.multiply = function (t, e, n) {
      const r = t[0] * e[0] + t[3] * e[1] + t[6] * e[2],
        i = t[1] * e[0] + t[4] * e[1] + t[7] * e[2],
        a = t[2] * e[0] + t[5] * e[1] + t[8] * e[2],
        u = t[0] * e[3] + t[3] * e[4] + t[6] * e[5],
        o = t[1] * e[3] + t[4] * e[4] + t[7] * e[5],
        s = t[2] * e[3] + t[5] * e[4] + t[8] * e[5],
        c = t[0] * e[6] + t[3] * e[7] + t[6] * e[8],
        l = t[1] * e[6] + t[4] * e[7] + t[7] * e[8],
        f = t[2] * e[6] + t[5] * e[7] + t[8] * e[8];
      return (
        (n[0] = r),
        (n[1] = i),
        (n[2] = a),
        (n[3] = u),
        (n[4] = o),
        (n[5] = s),
        (n[6] = c),
        (n[7] = l),
        (n[8] = f),
        n
      );
    }),
    (I.add = function (t, e, n) {
      return (
        (n[0] = t[0] + e[0]),
        (n[1] = t[1] + e[1]),
        (n[2] = t[2] + e[2]),
        (n[3] = t[3] + e[3]),
        (n[4] = t[4] + e[4]),
        (n[5] = t[5] + e[5]),
        (n[6] = t[6] + e[6]),
        (n[7] = t[7] + e[7]),
        (n[8] = t[8] + e[8]),
        n
      );
    }),
    (I.subtract = function (t, e, n) {
      return (
        (n[0] = t[0] - e[0]),
        (n[1] = t[1] - e[1]),
        (n[2] = t[2] - e[2]),
        (n[3] = t[3] - e[3]),
        (n[4] = t[4] - e[4]),
        (n[5] = t[5] - e[5]),
        (n[6] = t[6] - e[6]),
        (n[7] = t[7] - e[7]),
        (n[8] = t[8] - e[8]),
        n
      );
    }),
    (I.multiplyByVector = function (t, e, n) {
      const r = e.x,
        i = e.y,
        a = e.z,
        u = t[0] * r + t[3] * i + t[6] * a,
        o = t[1] * r + t[4] * i + t[7] * a,
        s = t[2] * r + t[5] * i + t[8] * a;
      return (n.x = u), (n.y = o), (n.z = s), n;
    }),
    (I.multiplyByScalar = function (t, e, n) {
      return (
        (n[0] = t[0] * e),
        (n[1] = t[1] * e),
        (n[2] = t[2] * e),
        (n[3] = t[3] * e),
        (n[4] = t[4] * e),
        (n[5] = t[5] * e),
        (n[6] = t[6] * e),
        (n[7] = t[7] * e),
        (n[8] = t[8] * e),
        n
      );
    }),
    (I.multiplyByScale = function (t, e, n) {
      return (
        (n[0] = t[0] * e.x),
        (n[1] = t[1] * e.x),
        (n[2] = t[2] * e.x),
        (n[3] = t[3] * e.y),
        (n[4] = t[4] * e.y),
        (n[5] = t[5] * e.y),
        (n[6] = t[6] * e.z),
        (n[7] = t[7] * e.z),
        (n[8] = t[8] * e.z),
        n
      );
    }),
    (I.negate = function (t, e) {
      return (
        (e[0] = -t[0]),
        (e[1] = -t[1]),
        (e[2] = -t[2]),
        (e[3] = -t[3]),
        (e[4] = -t[4]),
        (e[5] = -t[5]),
        (e[6] = -t[6]),
        (e[7] = -t[7]),
        (e[8] = -t[8]),
        e
      );
    }),
    (I.transpose = function (t, e) {
      const n = t[0],
        r = t[3],
        i = t[6],
        a = t[1],
        u = t[4],
        o = t[7],
        s = t[2],
        c = t[5],
        l = t[8];
      return (
        (e[0] = n),
        (e[1] = r),
        (e[2] = i),
        (e[3] = a),
        (e[4] = u),
        (e[5] = o),
        (e[6] = s),
        (e[7] = c),
        (e[8] = l),
        e
      );
    });
  const L = new i(1, 1, 1);
  I.getRotation = function (t, e) {
    const n = i.divideComponents(L, I.getScale(t, U), U);
    return (e = I.multiplyByScale(t, n, e));
  };
  const v = [1, 0, 0],
    P = [2, 2, 1];
  function W(t) {
    let e = 0;
    for (let n = 0; n < 3; ++n) {
      const r = t[I.getElementIndex(P[n], v[n])];
      e += 2 * r * r;
    }
    return Math.sqrt(e);
  }
  function k(t, e) {
    const n = r.CesiumMath.EPSILON15;
    let i = 0,
      a = 1;
    for (let e = 0; e < 3; ++e) {
      const n = Math.abs(t[I.getElementIndex(P[e], v[e])]);
      n > i && ((a = e), (i = n));
    }
    let u = 1,
      o = 0;
    const s = v[a],
      c = P[a];
    if (Math.abs(t[I.getElementIndex(c, s)]) > n) {
      const e =
        (t[I.getElementIndex(c, c)] - t[I.getElementIndex(s, s)]) /
        2 /
        t[I.getElementIndex(c, s)];
      let n;
      (n =
        e < 0
          ? -1 / (-e + Math.sqrt(1 + e * e))
          : 1 / (e + Math.sqrt(1 + e * e))),
        (u = 1 / Math.sqrt(1 + n * n)),
        (o = n * u);
    }
    return (
      ((e = I.clone(I.IDENTITY, e))[I.getElementIndex(s, s)] = e[
        I.getElementIndex(c, c)
      ] =
        u),
      (e[I.getElementIndex(c, s)] = o),
      (e[I.getElementIndex(s, c)] = -o),
      e
    );
  }
  const B = new I(),
    j = new I();
  (I.computeEigenDecomposition = function (t, e) {
    const i = r.CesiumMath.EPSILON20;
    let a = 0,
      u = 0;
    n.defined(e) || (e = {});
    const o = (e.unitary = I.clone(I.IDENTITY, e.unitary)),
      s = (e.diagonal = I.clone(t, e.diagonal)),
      c =
        i *
        (function (t) {
          let e = 0;
          for (let n = 0; n < 9; ++n) {
            const r = t[n];
            e += r * r;
          }
          return Math.sqrt(e);
        })(s);
    for (; u < 10 && W(s) > c; )
      k(s, B),
        I.transpose(B, j),
        I.multiply(s, B, s),
        I.multiply(j, s, s),
        I.multiply(o, B, o),
        ++a > 2 && (++u, (a = 0));
    return e;
  }),
    (I.abs = function (t, e) {
      return (
        (e[0] = Math.abs(t[0])),
        (e[1] = Math.abs(t[1])),
        (e[2] = Math.abs(t[2])),
        (e[3] = Math.abs(t[3])),
        (e[4] = Math.abs(t[4])),
        (e[5] = Math.abs(t[5])),
        (e[6] = Math.abs(t[6])),
        (e[7] = Math.abs(t[7])),
        (e[8] = Math.abs(t[8])),
        e
      );
    }),
    (I.determinant = function (t) {
      const e = t[0],
        n = t[3],
        r = t[6],
        i = t[1],
        a = t[4],
        u = t[7],
        o = t[2],
        s = t[5],
        c = t[8];
      return e * (a * c - s * u) + i * (s * r - n * c) + o * (n * u - a * r);
    }),
    (I.inverse = function (t, e) {
      const n = t[0],
        r = t[1],
        i = t[2],
        a = t[3],
        u = t[4],
        o = t[5],
        s = t[6],
        c = t[7],
        l = t[8],
        f = I.determinant(t);
      (e[0] = u * l - c * o),
        (e[1] = c * i - r * l),
        (e[2] = r * o - u * i),
        (e[3] = s * o - a * l),
        (e[4] = n * l - s * i),
        (e[5] = a * i - n * o),
        (e[6] = a * c - s * u),
        (e[7] = s * r - n * c),
        (e[8] = n * u - a * r);
      const d = 1 / f;
      return I.multiplyByScalar(e, d, e);
    });
  const X = new I();
  function D(t, e, r, i) {
    (this.x = n.defaultValue(t, 0)),
      (this.y = n.defaultValue(e, 0)),
      (this.z = n.defaultValue(r, 0)),
      (this.w = n.defaultValue(i, 0));
  }
  (I.inverseTranspose = function (t, e) {
    return I.inverse(I.transpose(t, X), e);
  }),
    (I.equals = function (t, e) {
      return (
        t === e ||
        (n.defined(t) &&
          n.defined(e) &&
          t[0] === e[0] &&
          t[1] === e[1] &&
          t[2] === e[2] &&
          t[3] === e[3] &&
          t[4] === e[4] &&
          t[5] === e[5] &&
          t[6] === e[6] &&
          t[7] === e[7] &&
          t[8] === e[8])
      );
    }),
    (I.equalsEpsilon = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        t === e ||
          (n.defined(t) &&
            n.defined(e) &&
            Math.abs(t[0] - e[0]) <= r &&
            Math.abs(t[1] - e[1]) <= r &&
            Math.abs(t[2] - e[2]) <= r &&
            Math.abs(t[3] - e[3]) <= r &&
            Math.abs(t[4] - e[4]) <= r &&
            Math.abs(t[5] - e[5]) <= r &&
            Math.abs(t[6] - e[6]) <= r &&
            Math.abs(t[7] - e[7]) <= r &&
            Math.abs(t[8] - e[8]) <= r)
      );
    }),
    (I.IDENTITY = Object.freeze(new I(1, 0, 0, 0, 1, 0, 0, 0, 1))),
    (I.ZERO = Object.freeze(new I(0, 0, 0, 0, 0, 0, 0, 0, 0))),
    (I.COLUMN0ROW0 = 0),
    (I.COLUMN0ROW1 = 1),
    (I.COLUMN0ROW2 = 2),
    (I.COLUMN1ROW0 = 3),
    (I.COLUMN1ROW1 = 4),
    (I.COLUMN1ROW2 = 5),
    (I.COLUMN2ROW0 = 6),
    (I.COLUMN2ROW1 = 7),
    (I.COLUMN2ROW2 = 8),
    Object.defineProperties(I.prototype, {
      length: {
        get: function () {
          return I.packedLength;
        },
      },
    }),
    (I.prototype.clone = function (t) {
      return I.clone(this, t);
    }),
    (I.prototype.equals = function (t) {
      return I.equals(this, t);
    }),
    (I.equalsArray = function (t, e, n) {
      return (
        t[0] === e[n] &&
        t[1] === e[n + 1] &&
        t[2] === e[n + 2] &&
        t[3] === e[n + 3] &&
        t[4] === e[n + 4] &&
        t[5] === e[n + 5] &&
        t[6] === e[n + 6] &&
        t[7] === e[n + 7] &&
        t[8] === e[n + 8]
      );
    }),
    (I.prototype.equalsEpsilon = function (t, e) {
      return I.equalsEpsilon(this, t, e);
    }),
    (I.prototype.toString = function () {
      return (
        "(" +
        this[0] +
        ", " +
        this[3] +
        ", " +
        this[6] +
        ")\n(" +
        this[1] +
        ", " +
        this[4] +
        ", " +
        this[7] +
        ")\n(" +
        this[2] +
        ", " +
        this[5] +
        ", " +
        this[8] +
        ")"
      );
    }),
    (D.fromElements = function (t, e, r, i, a) {
      return n.defined(a)
        ? ((a.x = t), (a.y = e), (a.z = r), (a.w = i), a)
        : new D(t, e, r, i);
    }),
    (D.fromColor = function (t, e) {
      return n.defined(e)
        ? ((e.x = t.red), (e.y = t.green), (e.z = t.blue), (e.w = t.alpha), e)
        : new D(t.red, t.green, t.blue, t.alpha);
    }),
    (D.clone = function (t, e) {
      if (n.defined(t))
        return n.defined(e)
          ? ((e.x = t.x), (e.y = t.y), (e.z = t.z), (e.w = t.w), e)
          : new D(t.x, t.y, t.z, t.w);
    }),
    (D.packedLength = 4),
    (D.pack = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        (e[r++] = t.x),
        (e[r++] = t.y),
        (e[r++] = t.z),
        (e[r] = t.w),
        e
      );
    }),
    (D.unpack = function (t, e, r) {
      return (
        (e = n.defaultValue(e, 0)),
        n.defined(r) || (r = new D()),
        (r.x = t[e++]),
        (r.y = t[e++]),
        (r.z = t[e++]),
        (r.w = t[e]),
        r
      );
    }),
    (D.packArray = function (t, r) {
      const i = t.length,
        a = 4 * i;
      if (n.defined(r)) {
        if (!Array.isArray(r) && r.length !== a)
          throw new e.DeveloperError(
            "If result is a typed array, it must have exactly array.length * 4 elements"
          );
        r.length !== a && (r.length = a);
      } else r = new Array(a);
      for (let e = 0; e < i; ++e) D.pack(t[e], r, 4 * e);
      return r;
    }),
    (D.unpackArray = function (t, e) {
      const r = t.length;
      n.defined(e) ? (e.length = r / 4) : (e = new Array(r / 4));
      for (let n = 0; n < r; n += 4) {
        const r = n / 4;
        e[r] = D.unpack(t, n, e[r]);
      }
      return e;
    }),
    (D.fromArray = D.unpack),
    (D.maximumComponent = function (t) {
      return Math.max(t.x, t.y, t.z, t.w);
    }),
    (D.minimumComponent = function (t) {
      return Math.min(t.x, t.y, t.z, t.w);
    }),
    (D.minimumByComponent = function (t, e, n) {
      return (
        (n.x = Math.min(t.x, e.x)),
        (n.y = Math.min(t.y, e.y)),
        (n.z = Math.min(t.z, e.z)),
        (n.w = Math.min(t.w, e.w)),
        n
      );
    }),
    (D.maximumByComponent = function (t, e, n) {
      return (
        (n.x = Math.max(t.x, e.x)),
        (n.y = Math.max(t.y, e.y)),
        (n.z = Math.max(t.z, e.z)),
        (n.w = Math.max(t.w, e.w)),
        n
      );
    }),
    (D.magnitudeSquared = function (t) {
      return t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w;
    }),
    (D.magnitude = function (t) {
      return Math.sqrt(D.magnitudeSquared(t));
    });
  const Z = new D();
  (D.distance = function (t, e) {
    return D.subtract(t, e, Z), D.magnitude(Z);
  }),
    (D.distanceSquared = function (t, e) {
      return D.subtract(t, e, Z), D.magnitudeSquared(Z);
    }),
    (D.normalize = function (t, e) {
      const n = D.magnitude(t);
      return (
        (e.x = t.x / n), (e.y = t.y / n), (e.z = t.z / n), (e.w = t.w / n), e
      );
    }),
    (D.dot = function (t, e) {
      return t.x * e.x + t.y * e.y + t.z * e.z + t.w * e.w;
    }),
    (D.multiplyComponents = function (t, e, n) {
      return (
        (n.x = t.x * e.x),
        (n.y = t.y * e.y),
        (n.z = t.z * e.z),
        (n.w = t.w * e.w),
        n
      );
    }),
    (D.divideComponents = function (t, e, n) {
      return (
        (n.x = t.x / e.x),
        (n.y = t.y / e.y),
        (n.z = t.z / e.z),
        (n.w = t.w / e.w),
        n
      );
    }),
    (D.add = function (t, e, n) {
      return (
        (n.x = t.x + e.x),
        (n.y = t.y + e.y),
        (n.z = t.z + e.z),
        (n.w = t.w + e.w),
        n
      );
    }),
    (D.subtract = function (t, e, n) {
      return (
        (n.x = t.x - e.x),
        (n.y = t.y - e.y),
        (n.z = t.z - e.z),
        (n.w = t.w - e.w),
        n
      );
    }),
    (D.multiplyByScalar = function (t, e, n) {
      return (
        (n.x = t.x * e), (n.y = t.y * e), (n.z = t.z * e), (n.w = t.w * e), n
      );
    }),
    (D.divideByScalar = function (t, e, n) {
      return (
        (n.x = t.x / e), (n.y = t.y / e), (n.z = t.z / e), (n.w = t.w / e), n
      );
    }),
    (D.negate = function (t, e) {
      return (e.x = -t.x), (e.y = -t.y), (e.z = -t.z), (e.w = -t.w), e;
    }),
    (D.abs = function (t, e) {
      return (
        (e.x = Math.abs(t.x)),
        (e.y = Math.abs(t.y)),
        (e.z = Math.abs(t.z)),
        (e.w = Math.abs(t.w)),
        e
      );
    });
  const Y = new D();
  D.lerp = function (t, e, n, r) {
    return (
      D.multiplyByScalar(e, n, Y),
      (r = D.multiplyByScalar(t, 1 - n, r)),
      D.add(Y, r, r)
    );
  };
  const F = new D();
  (D.mostOrthogonalAxis = function (t, e) {
    const n = D.normalize(t, F);
    return (
      D.abs(n, n),
      (e =
        n.x <= n.y
          ? n.x <= n.z
            ? n.x <= n.w
              ? D.clone(D.UNIT_X, e)
              : D.clone(D.UNIT_W, e)
            : n.z <= n.w
            ? D.clone(D.UNIT_Z, e)
            : D.clone(D.UNIT_W, e)
          : n.y <= n.z
          ? n.y <= n.w
            ? D.clone(D.UNIT_Y, e)
            : D.clone(D.UNIT_W, e)
          : n.z <= n.w
          ? D.clone(D.UNIT_Z, e)
          : D.clone(D.UNIT_W, e))
    );
  }),
    (D.equals = function (t, e) {
      return (
        t === e ||
        (n.defined(t) &&
          n.defined(e) &&
          t.x === e.x &&
          t.y === e.y &&
          t.z === e.z &&
          t.w === e.w)
      );
    }),
    (D.equalsArray = function (t, e, n) {
      return (
        t.x === e[n] && t.y === e[n + 1] && t.z === e[n + 2] && t.w === e[n + 3]
      );
    }),
    (D.equalsEpsilon = function (t, e, i, a) {
      return (
        t === e ||
        (n.defined(t) &&
          n.defined(e) &&
          r.CesiumMath.equalsEpsilon(t.x, e.x, i, a) &&
          r.CesiumMath.equalsEpsilon(t.y, e.y, i, a) &&
          r.CesiumMath.equalsEpsilon(t.z, e.z, i, a) &&
          r.CesiumMath.equalsEpsilon(t.w, e.w, i, a))
      );
    }),
    (D.ZERO = Object.freeze(new D(0, 0, 0, 0))),
    (D.ONE = Object.freeze(new D(1, 1, 1, 1))),
    (D.UNIT_X = Object.freeze(new D(1, 0, 0, 0))),
    (D.UNIT_Y = Object.freeze(new D(0, 1, 0, 0))),
    (D.UNIT_Z = Object.freeze(new D(0, 0, 1, 0))),
    (D.UNIT_W = Object.freeze(new D(0, 0, 0, 1))),
    (D.prototype.clone = function (t) {
      return D.clone(this, t);
    }),
    (D.prototype.equals = function (t) {
      return D.equals(this, t);
    }),
    (D.prototype.equalsEpsilon = function (t, e, n) {
      return D.equalsEpsilon(this, t, e, n);
    }),
    (D.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    });
  const G = new Float32Array(1),
    H = new Uint8Array(G.buffer),
    Q = new Uint32Array([287454020]),
    J = 68 === new Uint8Array(Q.buffer)[0];
  function K(t, e, r, i, a, u, o, s, c, l, f, d, h, m, y, p) {
    (this[0] = n.defaultValue(t, 0)),
      (this[1] = n.defaultValue(a, 0)),
      (this[2] = n.defaultValue(c, 0)),
      (this[3] = n.defaultValue(h, 0)),
      (this[4] = n.defaultValue(e, 0)),
      (this[5] = n.defaultValue(u, 0)),
      (this[6] = n.defaultValue(l, 0)),
      (this[7] = n.defaultValue(m, 0)),
      (this[8] = n.defaultValue(r, 0)),
      (this[9] = n.defaultValue(o, 0)),
      (this[10] = n.defaultValue(f, 0)),
      (this[11] = n.defaultValue(y, 0)),
      (this[12] = n.defaultValue(i, 0)),
      (this[13] = n.defaultValue(s, 0)),
      (this[14] = n.defaultValue(d, 0)),
      (this[15] = n.defaultValue(p, 0));
  }
  (D.packFloat = function (t, e) {
    return (
      n.defined(e) || (e = new D()),
      (G[0] = t),
      J
        ? ((e.x = H[0]), (e.y = H[1]), (e.z = H[2]), (e.w = H[3]))
        : ((e.x = H[3]), (e.y = H[2]), (e.z = H[1]), (e.w = H[0])),
      e
    );
  }),
    (D.unpackFloat = function (t) {
      return (
        J
          ? ((H[0] = t.x), (H[1] = t.y), (H[2] = t.z), (H[3] = t.w))
          : ((H[0] = t.w), (H[1] = t.z), (H[2] = t.y), (H[3] = t.x)),
        G[0]
      );
    }),
    (K.packedLength = 16),
    (K.pack = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        (e[r++] = t[0]),
        (e[r++] = t[1]),
        (e[r++] = t[2]),
        (e[r++] = t[3]),
        (e[r++] = t[4]),
        (e[r++] = t[5]),
        (e[r++] = t[6]),
        (e[r++] = t[7]),
        (e[r++] = t[8]),
        (e[r++] = t[9]),
        (e[r++] = t[10]),
        (e[r++] = t[11]),
        (e[r++] = t[12]),
        (e[r++] = t[13]),
        (e[r++] = t[14]),
        (e[r] = t[15]),
        e
      );
    }),
    (K.unpack = function (t, e, r) {
      return (
        (e = n.defaultValue(e, 0)),
        n.defined(r) || (r = new K()),
        (r[0] = t[e++]),
        (r[1] = t[e++]),
        (r[2] = t[e++]),
        (r[3] = t[e++]),
        (r[4] = t[e++]),
        (r[5] = t[e++]),
        (r[6] = t[e++]),
        (r[7] = t[e++]),
        (r[8] = t[e++]),
        (r[9] = t[e++]),
        (r[10] = t[e++]),
        (r[11] = t[e++]),
        (r[12] = t[e++]),
        (r[13] = t[e++]),
        (r[14] = t[e++]),
        (r[15] = t[e]),
        r
      );
    }),
    (K.clone = function (t, e) {
      if (n.defined(t))
        return n.defined(e)
          ? ((e[0] = t[0]),
            (e[1] = t[1]),
            (e[2] = t[2]),
            (e[3] = t[3]),
            (e[4] = t[4]),
            (e[5] = t[5]),
            (e[6] = t[6]),
            (e[7] = t[7]),
            (e[8] = t[8]),
            (e[9] = t[9]),
            (e[10] = t[10]),
            (e[11] = t[11]),
            (e[12] = t[12]),
            (e[13] = t[13]),
            (e[14] = t[14]),
            (e[15] = t[15]),
            e)
          : new K(
              t[0],
              t[4],
              t[8],
              t[12],
              t[1],
              t[5],
              t[9],
              t[13],
              t[2],
              t[6],
              t[10],
              t[14],
              t[3],
              t[7],
              t[11],
              t[15]
            );
    }),
    (K.fromArray = K.unpack),
    (K.fromColumnMajorArray = function (t, e) {
      return K.clone(t, e);
    }),
    (K.fromRowMajorArray = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t[0]),
          (e[1] = t[4]),
          (e[2] = t[8]),
          (e[3] = t[12]),
          (e[4] = t[1]),
          (e[5] = t[5]),
          (e[6] = t[9]),
          (e[7] = t[13]),
          (e[8] = t[2]),
          (e[9] = t[6]),
          (e[10] = t[10]),
          (e[11] = t[14]),
          (e[12] = t[3]),
          (e[13] = t[7]),
          (e[14] = t[11]),
          (e[15] = t[15]),
          e)
        : new K(
            t[0],
            t[1],
            t[2],
            t[3],
            t[4],
            t[5],
            t[6],
            t[7],
            t[8],
            t[9],
            t[10],
            t[11],
            t[12],
            t[13],
            t[14],
            t[15]
          );
    }),
    (K.fromRotationTranslation = function (t, e, r) {
      return (
        (e = n.defaultValue(e, i.ZERO)),
        n.defined(r)
          ? ((r[0] = t[0]),
            (r[1] = t[1]),
            (r[2] = t[2]),
            (r[3] = 0),
            (r[4] = t[3]),
            (r[5] = t[4]),
            (r[6] = t[5]),
            (r[7] = 0),
            (r[8] = t[6]),
            (r[9] = t[7]),
            (r[10] = t[8]),
            (r[11] = 0),
            (r[12] = e.x),
            (r[13] = e.y),
            (r[14] = e.z),
            (r[15] = 1),
            r)
          : new K(
              t[0],
              t[3],
              t[6],
              e.x,
              t[1],
              t[4],
              t[7],
              e.y,
              t[2],
              t[5],
              t[8],
              e.z,
              0,
              0,
              0,
              1
            )
      );
    }),
    (K.fromTranslationQuaternionRotationScale = function (t, e, r, i) {
      n.defined(i) || (i = new K());
      const a = r.x,
        u = r.y,
        o = r.z,
        s = e.x * e.x,
        c = e.x * e.y,
        l = e.x * e.z,
        f = e.x * e.w,
        d = e.y * e.y,
        h = e.y * e.z,
        m = e.y * e.w,
        y = e.z * e.z,
        p = e.z * e.w,
        x = e.w * e.w,
        M = s - d - y + x,
        w = 2 * (c - p),
        g = 2 * (l + m),
        z = 2 * (c + p),
        C = -s + d - y + x,
        O = 2 * (h - f),
        b = 2 * (l - m),
        S = 2 * (h + f),
        q = -s - d + y + x;
      return (
        (i[0] = M * a),
        (i[1] = z * a),
        (i[2] = b * a),
        (i[3] = 0),
        (i[4] = w * u),
        (i[5] = C * u),
        (i[6] = S * u),
        (i[7] = 0),
        (i[8] = g * o),
        (i[9] = O * o),
        (i[10] = q * o),
        (i[11] = 0),
        (i[12] = t.x),
        (i[13] = t.y),
        (i[14] = t.z),
        (i[15] = 1),
        i
      );
    }),
    (K.fromTranslationRotationScale = function (t, e) {
      return K.fromTranslationQuaternionRotationScale(
        t.translation,
        t.rotation,
        t.scale,
        e
      );
    }),
    (K.fromTranslation = function (t, e) {
      return K.fromRotationTranslation(I.IDENTITY, t, e);
    }),
    (K.fromScale = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t.x),
          (e[1] = 0),
          (e[2] = 0),
          (e[3] = 0),
          (e[4] = 0),
          (e[5] = t.y),
          (e[6] = 0),
          (e[7] = 0),
          (e[8] = 0),
          (e[9] = 0),
          (e[10] = t.z),
          (e[11] = 0),
          (e[12] = 0),
          (e[13] = 0),
          (e[14] = 0),
          (e[15] = 1),
          e)
        : new K(t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, t.z, 0, 0, 0, 0, 1);
    }),
    (K.fromUniformScale = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t),
          (e[1] = 0),
          (e[2] = 0),
          (e[3] = 0),
          (e[4] = 0),
          (e[5] = t),
          (e[6] = 0),
          (e[7] = 0),
          (e[8] = 0),
          (e[9] = 0),
          (e[10] = t),
          (e[11] = 0),
          (e[12] = 0),
          (e[13] = 0),
          (e[14] = 0),
          (e[15] = 1),
          e)
        : new K(t, 0, 0, 0, 0, t, 0, 0, 0, 0, t, 0, 0, 0, 0, 1);
    });
  const $ = new i(),
    tt = new i(),
    et = new i();
  (K.fromCamera = function (t, e) {
    const r = t.position,
      a = t.direction,
      u = t.up;
    i.normalize(a, $),
      i.normalize(i.cross($, u, tt), tt),
      i.normalize(i.cross(tt, $, et), et);
    const o = tt.x,
      s = tt.y,
      c = tt.z,
      l = $.x,
      f = $.y,
      d = $.z,
      h = et.x,
      m = et.y,
      y = et.z,
      p = r.x,
      x = r.y,
      M = r.z,
      w = o * -p + s * -x + c * -M,
      g = h * -p + m * -x + y * -M,
      z = l * p + f * x + d * M;
    return n.defined(e)
      ? ((e[0] = o),
        (e[1] = h),
        (e[2] = -l),
        (e[3] = 0),
        (e[4] = s),
        (e[5] = m),
        (e[6] = -f),
        (e[7] = 0),
        (e[8] = c),
        (e[9] = y),
        (e[10] = -d),
        (e[11] = 0),
        (e[12] = w),
        (e[13] = g),
        (e[14] = z),
        (e[15] = 1),
        e)
      : new K(o, s, c, w, h, m, y, g, -l, -f, -d, z, 0, 0, 0, 1);
  }),
    (K.computePerspectiveFieldOfView = function (t, e, n, r, i) {
      const a = 1 / Math.tan(0.5 * t),
        u = a / e,
        o = (r + n) / (n - r),
        s = (2 * r * n) / (n - r);
      return (
        (i[0] = u),
        (i[1] = 0),
        (i[2] = 0),
        (i[3] = 0),
        (i[4] = 0),
        (i[5] = a),
        (i[6] = 0),
        (i[7] = 0),
        (i[8] = 0),
        (i[9] = 0),
        (i[10] = o),
        (i[11] = -1),
        (i[12] = 0),
        (i[13] = 0),
        (i[14] = s),
        (i[15] = 0),
        i
      );
    }),
    (K.computeOrthographicOffCenter = function (t, e, n, r, i, a, u) {
      let o = 1 / (e - t),
        s = 1 / (r - n),
        c = 1 / (a - i);
      const l = -(e + t) * o,
        f = -(r + n) * s,
        d = -(a + i) * c;
      return (
        (o *= 2),
        (s *= 2),
        (c *= -2),
        (u[0] = o),
        (u[1] = 0),
        (u[2] = 0),
        (u[3] = 0),
        (u[4] = 0),
        (u[5] = s),
        (u[6] = 0),
        (u[7] = 0),
        (u[8] = 0),
        (u[9] = 0),
        (u[10] = c),
        (u[11] = 0),
        (u[12] = l),
        (u[13] = f),
        (u[14] = d),
        (u[15] = 1),
        u
      );
    }),
    (K.computePerspectiveOffCenter = function (t, e, n, r, i, a, u) {
      const o = (2 * i) / (e - t),
        s = (2 * i) / (r - n),
        c = (e + t) / (e - t),
        l = (r + n) / (r - n),
        f = -(a + i) / (a - i),
        d = (-2 * a * i) / (a - i);
      return (
        (u[0] = o),
        (u[1] = 0),
        (u[2] = 0),
        (u[3] = 0),
        (u[4] = 0),
        (u[5] = s),
        (u[6] = 0),
        (u[7] = 0),
        (u[8] = c),
        (u[9] = l),
        (u[10] = f),
        (u[11] = -1),
        (u[12] = 0),
        (u[13] = 0),
        (u[14] = d),
        (u[15] = 0),
        u
      );
    }),
    (K.computeInfinitePerspectiveOffCenter = function (t, e, n, r, i, a) {
      const u = (2 * i) / (e - t),
        o = (2 * i) / (r - n),
        s = (e + t) / (e - t),
        c = (r + n) / (r - n),
        l = -2 * i;
      return (
        (a[0] = u),
        (a[1] = 0),
        (a[2] = 0),
        (a[3] = 0),
        (a[4] = 0),
        (a[5] = o),
        (a[6] = 0),
        (a[7] = 0),
        (a[8] = s),
        (a[9] = c),
        (a[10] = -1),
        (a[11] = -1),
        (a[12] = 0),
        (a[13] = 0),
        (a[14] = l),
        (a[15] = 0),
        a
      );
    }),
    (K.computeViewportTransformation = function (t, e, r, i) {
      n.defined(i) || (i = new K()),
        (t = n.defaultValue(t, n.defaultValue.EMPTY_OBJECT));
      const a = n.defaultValue(t.x, 0),
        u = n.defaultValue(t.y, 0),
        o = n.defaultValue(t.width, 0),
        s = n.defaultValue(t.height, 0);
      e = n.defaultValue(e, 0);
      const c = 0.5 * o,
        l = 0.5 * s,
        f = 0.5 * ((r = n.defaultValue(r, 1)) - e),
        d = c,
        h = l,
        m = f,
        y = a + c,
        p = u + l,
        x = e + f;
      return (
        (i[0] = d),
        (i[1] = 0),
        (i[2] = 0),
        (i[3] = 0),
        (i[4] = 0),
        (i[5] = h),
        (i[6] = 0),
        (i[7] = 0),
        (i[8] = 0),
        (i[9] = 0),
        (i[10] = m),
        (i[11] = 0),
        (i[12] = y),
        (i[13] = p),
        (i[14] = x),
        (i[15] = 1),
        i
      );
    }),
    (K.computeView = function (t, e, n, r, a) {
      return (
        (a[0] = r.x),
        (a[1] = n.x),
        (a[2] = -e.x),
        (a[3] = 0),
        (a[4] = r.y),
        (a[5] = n.y),
        (a[6] = -e.y),
        (a[7] = 0),
        (a[8] = r.z),
        (a[9] = n.z),
        (a[10] = -e.z),
        (a[11] = 0),
        (a[12] = -i.dot(r, t)),
        (a[13] = -i.dot(n, t)),
        (a[14] = i.dot(e, t)),
        (a[15] = 1),
        a
      );
    }),
    (K.toArray = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t[0]),
          (e[1] = t[1]),
          (e[2] = t[2]),
          (e[3] = t[3]),
          (e[4] = t[4]),
          (e[5] = t[5]),
          (e[6] = t[6]),
          (e[7] = t[7]),
          (e[8] = t[8]),
          (e[9] = t[9]),
          (e[10] = t[10]),
          (e[11] = t[11]),
          (e[12] = t[12]),
          (e[13] = t[13]),
          (e[14] = t[14]),
          (e[15] = t[15]),
          e)
        : [
            t[0],
            t[1],
            t[2],
            t[3],
            t[4],
            t[5],
            t[6],
            t[7],
            t[8],
            t[9],
            t[10],
            t[11],
            t[12],
            t[13],
            t[14],
            t[15],
          ];
    }),
    (K.getElementIndex = function (t, e) {
      return 4 * t + e;
    }),
    (K.getColumn = function (t, e, n) {
      const r = 4 * e,
        i = t[r],
        a = t[r + 1],
        u = t[r + 2],
        o = t[r + 3];
      return (n.x = i), (n.y = a), (n.z = u), (n.w = o), n;
    }),
    (K.setColumn = function (t, e, n, r) {
      const i = 4 * e;
      return (
        ((r = K.clone(t, r))[i] = n.x),
        (r[i + 1] = n.y),
        (r[i + 2] = n.z),
        (r[i + 3] = n.w),
        r
      );
    }),
    (K.setTranslation = function (t, e, n) {
      return (
        (n[0] = t[0]),
        (n[1] = t[1]),
        (n[2] = t[2]),
        (n[3] = t[3]),
        (n[4] = t[4]),
        (n[5] = t[5]),
        (n[6] = t[6]),
        (n[7] = t[7]),
        (n[8] = t[8]),
        (n[9] = t[9]),
        (n[10] = t[10]),
        (n[11] = t[11]),
        (n[12] = e.x),
        (n[13] = e.y),
        (n[14] = e.z),
        (n[15] = t[15]),
        n
      );
    });
  const nt = new i();
  (K.setScale = function (t, e, n) {
    const r = K.getScale(t, nt),
      a = i.divideComponents(e, r, nt);
    return K.multiplyByScale(t, a, n);
  }),
    (K.getRow = function (t, e, n) {
      const r = t[e],
        i = t[e + 4],
        a = t[e + 8],
        u = t[e + 12];
      return (n.x = r), (n.y = i), (n.z = a), (n.w = u), n;
    }),
    (K.setRow = function (t, e, n, r) {
      return (
        ((r = K.clone(t, r))[e] = n.x),
        (r[e + 4] = n.y),
        (r[e + 8] = n.z),
        (r[e + 12] = n.w),
        r
      );
    });
  const rt = new i();
  K.getScale = function (t, e) {
    return (
      (e.x = i.magnitude(i.fromElements(t[0], t[1], t[2], rt))),
      (e.y = i.magnitude(i.fromElements(t[4], t[5], t[6], rt))),
      (e.z = i.magnitude(i.fromElements(t[8], t[9], t[10], rt))),
      e
    );
  };
  const it = new i();
  (K.getMaximumScale = function (t) {
    return K.getScale(t, it), i.maximumComponent(it);
  }),
    (K.multiply = function (t, e, n) {
      const r = t[0],
        i = t[1],
        a = t[2],
        u = t[3],
        o = t[4],
        s = t[5],
        c = t[6],
        l = t[7],
        f = t[8],
        d = t[9],
        h = t[10],
        m = t[11],
        y = t[12],
        p = t[13],
        x = t[14],
        M = t[15],
        w = e[0],
        g = e[1],
        z = e[2],
        C = e[3],
        O = e[4],
        b = e[5],
        S = e[6],
        q = e[7],
        _ = e[8],
        R = e[9],
        V = e[10],
        E = e[11],
        T = e[12],
        A = e[13],
        I = e[14],
        N = e[15],
        U = r * w + o * g + f * z + y * C,
        L = i * w + s * g + d * z + p * C,
        v = a * w + c * g + h * z + x * C,
        P = u * w + l * g + m * z + M * C,
        W = r * O + o * b + f * S + y * q,
        k = i * O + s * b + d * S + p * q,
        B = a * O + c * b + h * S + x * q,
        j = u * O + l * b + m * S + M * q,
        X = r * _ + o * R + f * V + y * E,
        D = i * _ + s * R + d * V + p * E,
        Z = a * _ + c * R + h * V + x * E,
        Y = u * _ + l * R + m * V + M * E,
        F = r * T + o * A + f * I + y * N,
        G = i * T + s * A + d * I + p * N,
        H = a * T + c * A + h * I + x * N,
        Q = u * T + l * A + m * I + M * N;
      return (
        (n[0] = U),
        (n[1] = L),
        (n[2] = v),
        (n[3] = P),
        (n[4] = W),
        (n[5] = k),
        (n[6] = B),
        (n[7] = j),
        (n[8] = X),
        (n[9] = D),
        (n[10] = Z),
        (n[11] = Y),
        (n[12] = F),
        (n[13] = G),
        (n[14] = H),
        (n[15] = Q),
        n
      );
    }),
    (K.add = function (t, e, n) {
      return (
        (n[0] = t[0] + e[0]),
        (n[1] = t[1] + e[1]),
        (n[2] = t[2] + e[2]),
        (n[3] = t[3] + e[3]),
        (n[4] = t[4] + e[4]),
        (n[5] = t[5] + e[5]),
        (n[6] = t[6] + e[6]),
        (n[7] = t[7] + e[7]),
        (n[8] = t[8] + e[8]),
        (n[9] = t[9] + e[9]),
        (n[10] = t[10] + e[10]),
        (n[11] = t[11] + e[11]),
        (n[12] = t[12] + e[12]),
        (n[13] = t[13] + e[13]),
        (n[14] = t[14] + e[14]),
        (n[15] = t[15] + e[15]),
        n
      );
    }),
    (K.subtract = function (t, e, n) {
      return (
        (n[0] = t[0] - e[0]),
        (n[1] = t[1] - e[1]),
        (n[2] = t[2] - e[2]),
        (n[3] = t[3] - e[3]),
        (n[4] = t[4] - e[4]),
        (n[5] = t[5] - e[5]),
        (n[6] = t[6] - e[6]),
        (n[7] = t[7] - e[7]),
        (n[8] = t[8] - e[8]),
        (n[9] = t[9] - e[9]),
        (n[10] = t[10] - e[10]),
        (n[11] = t[11] - e[11]),
        (n[12] = t[12] - e[12]),
        (n[13] = t[13] - e[13]),
        (n[14] = t[14] - e[14]),
        (n[15] = t[15] - e[15]),
        n
      );
    }),
    (K.multiplyTransformation = function (t, e, n) {
      const r = t[0],
        i = t[1],
        a = t[2],
        u = t[4],
        o = t[5],
        s = t[6],
        c = t[8],
        l = t[9],
        f = t[10],
        d = t[12],
        h = t[13],
        m = t[14],
        y = e[0],
        p = e[1],
        x = e[2],
        M = e[4],
        w = e[5],
        g = e[6],
        z = e[8],
        C = e[9],
        O = e[10],
        b = e[12],
        S = e[13],
        q = e[14],
        _ = r * y + u * p + c * x,
        R = i * y + o * p + l * x,
        V = a * y + s * p + f * x,
        E = r * M + u * w + c * g,
        T = i * M + o * w + l * g,
        A = a * M + s * w + f * g,
        I = r * z + u * C + c * O,
        N = i * z + o * C + l * O,
        U = a * z + s * C + f * O,
        L = r * b + u * S + c * q + d,
        v = i * b + o * S + l * q + h,
        P = a * b + s * S + f * q + m;
      return (
        (n[0] = _),
        (n[1] = R),
        (n[2] = V),
        (n[3] = 0),
        (n[4] = E),
        (n[5] = T),
        (n[6] = A),
        (n[7] = 0),
        (n[8] = I),
        (n[9] = N),
        (n[10] = U),
        (n[11] = 0),
        (n[12] = L),
        (n[13] = v),
        (n[14] = P),
        (n[15] = 1),
        n
      );
    }),
    (K.multiplyByMatrix3 = function (t, e, n) {
      const r = t[0],
        i = t[1],
        a = t[2],
        u = t[4],
        o = t[5],
        s = t[6],
        c = t[8],
        l = t[9],
        f = t[10],
        d = e[0],
        h = e[1],
        m = e[2],
        y = e[3],
        p = e[4],
        x = e[5],
        M = e[6],
        w = e[7],
        g = e[8],
        z = r * d + u * h + c * m,
        C = i * d + o * h + l * m,
        O = a * d + s * h + f * m,
        b = r * y + u * p + c * x,
        S = i * y + o * p + l * x,
        q = a * y + s * p + f * x,
        _ = r * M + u * w + c * g,
        R = i * M + o * w + l * g,
        V = a * M + s * w + f * g;
      return (
        (n[0] = z),
        (n[1] = C),
        (n[2] = O),
        (n[3] = 0),
        (n[4] = b),
        (n[5] = S),
        (n[6] = q),
        (n[7] = 0),
        (n[8] = _),
        (n[9] = R),
        (n[10] = V),
        (n[11] = 0),
        (n[12] = t[12]),
        (n[13] = t[13]),
        (n[14] = t[14]),
        (n[15] = t[15]),
        n
      );
    }),
    (K.multiplyByTranslation = function (t, e, n) {
      const r = e.x,
        i = e.y,
        a = e.z,
        u = r * t[0] + i * t[4] + a * t[8] + t[12],
        o = r * t[1] + i * t[5] + a * t[9] + t[13],
        s = r * t[2] + i * t[6] + a * t[10] + t[14];
      return (
        (n[0] = t[0]),
        (n[1] = t[1]),
        (n[2] = t[2]),
        (n[3] = t[3]),
        (n[4] = t[4]),
        (n[5] = t[5]),
        (n[6] = t[6]),
        (n[7] = t[7]),
        (n[8] = t[8]),
        (n[9] = t[9]),
        (n[10] = t[10]),
        (n[11] = t[11]),
        (n[12] = u),
        (n[13] = o),
        (n[14] = s),
        (n[15] = t[15]),
        n
      );
    });
  const at = new i();
  (K.multiplyByUniformScale = function (t, e, n) {
    return (at.x = e), (at.y = e), (at.z = e), K.multiplyByScale(t, at, n);
  }),
    (K.multiplyByScale = function (t, e, n) {
      const r = e.x,
        i = e.y,
        a = e.z;
      return 1 === r && 1 === i && 1 === a
        ? K.clone(t, n)
        : ((n[0] = r * t[0]),
          (n[1] = r * t[1]),
          (n[2] = r * t[2]),
          (n[3] = 0),
          (n[4] = i * t[4]),
          (n[5] = i * t[5]),
          (n[6] = i * t[6]),
          (n[7] = 0),
          (n[8] = a * t[8]),
          (n[9] = a * t[9]),
          (n[10] = a * t[10]),
          (n[11] = 0),
          (n[12] = t[12]),
          (n[13] = t[13]),
          (n[14] = t[14]),
          (n[15] = 1),
          n);
    }),
    (K.multiplyByVector = function (t, e, n) {
      const r = e.x,
        i = e.y,
        a = e.z,
        u = e.w,
        o = t[0] * r + t[4] * i + t[8] * a + t[12] * u,
        s = t[1] * r + t[5] * i + t[9] * a + t[13] * u,
        c = t[2] * r + t[6] * i + t[10] * a + t[14] * u,
        l = t[3] * r + t[7] * i + t[11] * a + t[15] * u;
      return (n.x = o), (n.y = s), (n.z = c), (n.w = l), n;
    }),
    (K.multiplyByPointAsVector = function (t, e, n) {
      const r = e.x,
        i = e.y,
        a = e.z,
        u = t[0] * r + t[4] * i + t[8] * a,
        o = t[1] * r + t[5] * i + t[9] * a,
        s = t[2] * r + t[6] * i + t[10] * a;
      return (n.x = u), (n.y = o), (n.z = s), n;
    }),
    (K.multiplyByPoint = function (t, e, n) {
      const r = e.x,
        i = e.y,
        a = e.z,
        u = t[0] * r + t[4] * i + t[8] * a + t[12],
        o = t[1] * r + t[5] * i + t[9] * a + t[13],
        s = t[2] * r + t[6] * i + t[10] * a + t[14];
      return (n.x = u), (n.y = o), (n.z = s), n;
    }),
    (K.multiplyByScalar = function (t, e, n) {
      return (
        (n[0] = t[0] * e),
        (n[1] = t[1] * e),
        (n[2] = t[2] * e),
        (n[3] = t[3] * e),
        (n[4] = t[4] * e),
        (n[5] = t[5] * e),
        (n[6] = t[6] * e),
        (n[7] = t[7] * e),
        (n[8] = t[8] * e),
        (n[9] = t[9] * e),
        (n[10] = t[10] * e),
        (n[11] = t[11] * e),
        (n[12] = t[12] * e),
        (n[13] = t[13] * e),
        (n[14] = t[14] * e),
        (n[15] = t[15] * e),
        n
      );
    }),
    (K.negate = function (t, e) {
      return (
        (e[0] = -t[0]),
        (e[1] = -t[1]),
        (e[2] = -t[2]),
        (e[3] = -t[3]),
        (e[4] = -t[4]),
        (e[5] = -t[5]),
        (e[6] = -t[6]),
        (e[7] = -t[7]),
        (e[8] = -t[8]),
        (e[9] = -t[9]),
        (e[10] = -t[10]),
        (e[11] = -t[11]),
        (e[12] = -t[12]),
        (e[13] = -t[13]),
        (e[14] = -t[14]),
        (e[15] = -t[15]),
        e
      );
    }),
    (K.transpose = function (t, e) {
      const n = t[1],
        r = t[2],
        i = t[3],
        a = t[6],
        u = t[7],
        o = t[11];
      return (
        (e[0] = t[0]),
        (e[1] = t[4]),
        (e[2] = t[8]),
        (e[3] = t[12]),
        (e[4] = n),
        (e[5] = t[5]),
        (e[6] = t[9]),
        (e[7] = t[13]),
        (e[8] = r),
        (e[9] = a),
        (e[10] = t[10]),
        (e[11] = t[14]),
        (e[12] = i),
        (e[13] = u),
        (e[14] = o),
        (e[15] = t[15]),
        e
      );
    }),
    (K.abs = function (t, e) {
      return (
        (e[0] = Math.abs(t[0])),
        (e[1] = Math.abs(t[1])),
        (e[2] = Math.abs(t[2])),
        (e[3] = Math.abs(t[3])),
        (e[4] = Math.abs(t[4])),
        (e[5] = Math.abs(t[5])),
        (e[6] = Math.abs(t[6])),
        (e[7] = Math.abs(t[7])),
        (e[8] = Math.abs(t[8])),
        (e[9] = Math.abs(t[9])),
        (e[10] = Math.abs(t[10])),
        (e[11] = Math.abs(t[11])),
        (e[12] = Math.abs(t[12])),
        (e[13] = Math.abs(t[13])),
        (e[14] = Math.abs(t[14])),
        (e[15] = Math.abs(t[15])),
        e
      );
    }),
    (K.equals = function (t, e) {
      return (
        t === e ||
        (n.defined(t) &&
          n.defined(e) &&
          t[12] === e[12] &&
          t[13] === e[13] &&
          t[14] === e[14] &&
          t[0] === e[0] &&
          t[1] === e[1] &&
          t[2] === e[2] &&
          t[4] === e[4] &&
          t[5] === e[5] &&
          t[6] === e[6] &&
          t[8] === e[8] &&
          t[9] === e[9] &&
          t[10] === e[10] &&
          t[3] === e[3] &&
          t[7] === e[7] &&
          t[11] === e[11] &&
          t[15] === e[15])
      );
    }),
    (K.equalsEpsilon = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        t === e ||
          (n.defined(t) &&
            n.defined(e) &&
            Math.abs(t[0] - e[0]) <= r &&
            Math.abs(t[1] - e[1]) <= r &&
            Math.abs(t[2] - e[2]) <= r &&
            Math.abs(t[3] - e[3]) <= r &&
            Math.abs(t[4] - e[4]) <= r &&
            Math.abs(t[5] - e[5]) <= r &&
            Math.abs(t[6] - e[6]) <= r &&
            Math.abs(t[7] - e[7]) <= r &&
            Math.abs(t[8] - e[8]) <= r &&
            Math.abs(t[9] - e[9]) <= r &&
            Math.abs(t[10] - e[10]) <= r &&
            Math.abs(t[11] - e[11]) <= r &&
            Math.abs(t[12] - e[12]) <= r &&
            Math.abs(t[13] - e[13]) <= r &&
            Math.abs(t[14] - e[14]) <= r &&
            Math.abs(t[15] - e[15]) <= r)
      );
    }),
    (K.getTranslation = function (t, e) {
      return (e.x = t[12]), (e.y = t[13]), (e.z = t[14]), e;
    }),
    (K.getMatrix3 = function (t, e) {
      return (
        (e[0] = t[0]),
        (e[1] = t[1]),
        (e[2] = t[2]),
        (e[3] = t[4]),
        (e[4] = t[5]),
        (e[5] = t[6]),
        (e[6] = t[8]),
        (e[7] = t[9]),
        (e[8] = t[10]),
        e
      );
    });
  const ut = new I(),
    ot = new I(),
    st = new D(),
    ct = new D(0, 0, 0, 1);
  (K.inverse = function (t, n) {
    const i = t[0],
      a = t[4],
      u = t[8],
      o = t[12],
      s = t[1],
      c = t[5],
      l = t[9],
      f = t[13],
      d = t[2],
      h = t[6],
      m = t[10],
      y = t[14],
      p = t[3],
      x = t[7],
      M = t[11],
      w = t[15];
    let g = m * w,
      z = y * M,
      C = h * w,
      O = y * x,
      b = h * M,
      S = m * x,
      q = d * w,
      _ = y * p,
      R = d * M,
      V = m * p,
      E = d * x,
      T = h * p;
    const A = g * c + O * l + b * f - (z * c + C * l + S * f),
      N = z * s + q * l + V * f - (g * s + _ * l + R * f),
      U = C * s + _ * c + E * f - (O * s + q * c + T * f),
      L = S * s + R * c + T * l - (b * s + V * c + E * l),
      v = z * a + C * u + S * o - (g * a + O * u + b * o),
      P = g * i + _ * u + R * o - (z * i + q * u + V * o),
      W = O * i + q * a + T * o - (C * i + _ * a + E * o),
      k = b * i + V * a + E * u - (S * i + R * a + T * u);
    (g = u * f),
      (z = o * l),
      (C = a * f),
      (O = o * c),
      (b = a * l),
      (S = u * c),
      (q = i * f),
      (_ = o * s),
      (R = i * l),
      (V = u * s),
      (E = i * c),
      (T = a * s);
    const B = g * x + O * M + b * w - (z * x + C * M + S * w),
      j = z * p + q * M + V * w - (g * p + _ * M + R * w),
      X = C * p + _ * x + E * w - (O * p + q * x + T * w),
      Z = S * p + R * x + T * M - (b * p + V * x + E * M),
      Y = C * m + S * y + z * h - (b * y + g * h + O * m),
      F = R * y + g * d + _ * m - (q * m + V * y + z * d),
      G = q * h + T * y + O * d - (E * y + C * d + _ * h),
      H = E * m + b * d + V * h - (R * h + T * m + S * d);
    let Q = i * A + a * N + u * U + o * L;
    if (Math.abs(Q) < r.CesiumMath.EPSILON21) {
      if (
        I.equalsEpsilon(K.getMatrix3(t, ut), ot, r.CesiumMath.EPSILON7) &&
        D.equals(K.getRow(t, 3, st), ct)
      )
        return (
          (n[0] = 0),
          (n[1] = 0),
          (n[2] = 0),
          (n[3] = 0),
          (n[4] = 0),
          (n[5] = 0),
          (n[6] = 0),
          (n[7] = 0),
          (n[8] = 0),
          (n[9] = 0),
          (n[10] = 0),
          (n[11] = 0),
          (n[12] = -t[12]),
          (n[13] = -t[13]),
          (n[14] = -t[14]),
          (n[15] = 1),
          n
        );
      throw new e.RuntimeError(
        "matrix is not invertible because its determinate is zero."
      );
    }
    return (
      (Q = 1 / Q),
      (n[0] = A * Q),
      (n[1] = N * Q),
      (n[2] = U * Q),
      (n[3] = L * Q),
      (n[4] = v * Q),
      (n[5] = P * Q),
      (n[6] = W * Q),
      (n[7] = k * Q),
      (n[8] = B * Q),
      (n[9] = j * Q),
      (n[10] = X * Q),
      (n[11] = Z * Q),
      (n[12] = Y * Q),
      (n[13] = F * Q),
      (n[14] = G * Q),
      (n[15] = H * Q),
      n
    );
  }),
    (K.inverseTransformation = function (t, e) {
      const n = t[0],
        r = t[1],
        i = t[2],
        a = t[4],
        u = t[5],
        o = t[6],
        s = t[8],
        c = t[9],
        l = t[10],
        f = t[12],
        d = t[13],
        h = t[14],
        m = -n * f - r * d - i * h,
        y = -a * f - u * d - o * h,
        p = -s * f - c * d - l * h;
      return (
        (e[0] = n),
        (e[1] = a),
        (e[2] = s),
        (e[3] = 0),
        (e[4] = r),
        (e[5] = u),
        (e[6] = c),
        (e[7] = 0),
        (e[8] = i),
        (e[9] = o),
        (e[10] = l),
        (e[11] = 0),
        (e[12] = m),
        (e[13] = y),
        (e[14] = p),
        (e[15] = 1),
        e
      );
    });
  const lt = new K();
  function ft(t, e, r, i) {
    (this.west = n.defaultValue(t, 0)),
      (this.south = n.defaultValue(e, 0)),
      (this.east = n.defaultValue(r, 0)),
      (this.north = n.defaultValue(i, 0));
  }
  (K.inverseTranspose = function (t, e) {
    return K.inverse(K.transpose(t, lt), e);
  }),
    (K.IDENTITY = Object.freeze(
      new K(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    )),
    (K.ZERO = Object.freeze(
      new K(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    )),
    (K.COLUMN0ROW0 = 0),
    (K.COLUMN0ROW1 = 1),
    (K.COLUMN0ROW2 = 2),
    (K.COLUMN0ROW3 = 3),
    (K.COLUMN1ROW0 = 4),
    (K.COLUMN1ROW1 = 5),
    (K.COLUMN1ROW2 = 6),
    (K.COLUMN1ROW3 = 7),
    (K.COLUMN2ROW0 = 8),
    (K.COLUMN2ROW1 = 9),
    (K.COLUMN2ROW2 = 10),
    (K.COLUMN2ROW3 = 11),
    (K.COLUMN3ROW0 = 12),
    (K.COLUMN3ROW1 = 13),
    (K.COLUMN3ROW2 = 14),
    (K.COLUMN3ROW3 = 15),
    Object.defineProperties(K.prototype, {
      length: {
        get: function () {
          return K.packedLength;
        },
      },
    }),
    (K.prototype.clone = function (t) {
      return K.clone(this, t);
    }),
    (K.prototype.equals = function (t) {
      return K.equals(this, t);
    }),
    (K.equalsArray = function (t, e, n) {
      return (
        t[0] === e[n] &&
        t[1] === e[n + 1] &&
        t[2] === e[n + 2] &&
        t[3] === e[n + 3] &&
        t[4] === e[n + 4] &&
        t[5] === e[n + 5] &&
        t[6] === e[n + 6] &&
        t[7] === e[n + 7] &&
        t[8] === e[n + 8] &&
        t[9] === e[n + 9] &&
        t[10] === e[n + 10] &&
        t[11] === e[n + 11] &&
        t[12] === e[n + 12] &&
        t[13] === e[n + 13] &&
        t[14] === e[n + 14] &&
        t[15] === e[n + 15]
      );
    }),
    (K.prototype.equalsEpsilon = function (t, e) {
      return K.equalsEpsilon(this, t, e);
    }),
    (K.prototype.toString = function () {
      return (
        "(" +
        this[0] +
        ", " +
        this[4] +
        ", " +
        this[8] +
        ", " +
        this[12] +
        ")\n(" +
        this[1] +
        ", " +
        this[5] +
        ", " +
        this[9] +
        ", " +
        this[13] +
        ")\n(" +
        this[2] +
        ", " +
        this[6] +
        ", " +
        this[10] +
        ", " +
        this[14] +
        ")\n(" +
        this[3] +
        ", " +
        this[7] +
        ", " +
        this[11] +
        ", " +
        this[15] +
        ")"
      );
    }),
    Object.defineProperties(ft.prototype, {
      width: {
        get: function () {
          return ft.computeWidth(this);
        },
      },
      height: {
        get: function () {
          return ft.computeHeight(this);
        },
      },
    }),
    (ft.packedLength = 4),
    (ft.pack = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        (e[r++] = t.west),
        (e[r++] = t.south),
        (e[r++] = t.east),
        (e[r] = t.north),
        e
      );
    }),
    (ft.unpack = function (t, e, r) {
      return (
        (e = n.defaultValue(e, 0)),
        n.defined(r) || (r = new ft()),
        (r.west = t[e++]),
        (r.south = t[e++]),
        (r.east = t[e++]),
        (r.north = t[e]),
        r
      );
    }),
    (ft.computeWidth = function (t) {
      let e = t.east;
      const n = t.west;
      return e < n && (e += r.CesiumMath.TWO_PI), e - n;
    }),
    (ft.computeHeight = function (t) {
      return t.north - t.south;
    }),
    (ft.fromDegrees = function (t, e, i, a, u) {
      return (
        (t = r.CesiumMath.toRadians(n.defaultValue(t, 0))),
        (e = r.CesiumMath.toRadians(n.defaultValue(e, 0))),
        (i = r.CesiumMath.toRadians(n.defaultValue(i, 0))),
        (a = r.CesiumMath.toRadians(n.defaultValue(a, 0))),
        n.defined(u)
          ? ((u.west = t), (u.south = e), (u.east = i), (u.north = a), u)
          : new ft(t, e, i, a)
      );
    }),
    (ft.fromRadians = function (t, e, r, i, a) {
      return n.defined(a)
        ? ((a.west = n.defaultValue(t, 0)),
          (a.south = n.defaultValue(e, 0)),
          (a.east = n.defaultValue(r, 0)),
          (a.north = n.defaultValue(i, 0)),
          a)
        : new ft(t, e, r, i);
    }),
    (ft.fromCartographicArray = function (t, e) {
      let i = Number.MAX_VALUE,
        a = -Number.MAX_VALUE,
        u = Number.MAX_VALUE,
        o = -Number.MAX_VALUE,
        s = Number.MAX_VALUE,
        c = -Number.MAX_VALUE;
      for (let e = 0, n = t.length; e < n; e++) {
        const n = t[e];
        (i = Math.min(i, n.longitude)),
          (a = Math.max(a, n.longitude)),
          (s = Math.min(s, n.latitude)),
          (c = Math.max(c, n.latitude));
        const l =
          n.longitude >= 0 ? n.longitude : n.longitude + r.CesiumMath.TWO_PI;
        (u = Math.min(u, l)), (o = Math.max(o, l));
      }
      return (
        a - i > o - u &&
          ((i = u),
          (a = o),
          a > r.CesiumMath.PI && (a -= r.CesiumMath.TWO_PI),
          i > r.CesiumMath.PI && (i -= r.CesiumMath.TWO_PI)),
        n.defined(e)
          ? ((e.west = i), (e.south = s), (e.east = a), (e.north = c), e)
          : new ft(i, s, a, c)
      );
    }),
    (ft.fromCartesianArray = function (t, e, i) {
      e = n.defaultValue(e, b.WGS84);
      let a = Number.MAX_VALUE,
        u = -Number.MAX_VALUE,
        o = Number.MAX_VALUE,
        s = -Number.MAX_VALUE,
        c = Number.MAX_VALUE,
        l = -Number.MAX_VALUE;
      for (let n = 0, i = t.length; n < i; n++) {
        const i = e.cartesianToCartographic(t[n]);
        (a = Math.min(a, i.longitude)),
          (u = Math.max(u, i.longitude)),
          (c = Math.min(c, i.latitude)),
          (l = Math.max(l, i.latitude));
        const f =
          i.longitude >= 0 ? i.longitude : i.longitude + r.CesiumMath.TWO_PI;
        (o = Math.min(o, f)), (s = Math.max(s, f));
      }
      return (
        u - a > s - o &&
          ((a = o),
          (u = s),
          u > r.CesiumMath.PI && (u -= r.CesiumMath.TWO_PI),
          a > r.CesiumMath.PI && (a -= r.CesiumMath.TWO_PI)),
        n.defined(i)
          ? ((i.west = a), (i.south = c), (i.east = u), (i.north = l), i)
          : new ft(a, c, u, l)
      );
    }),
    (ft.clone = function (t, e) {
      if (n.defined(t))
        return n.defined(e)
          ? ((e.west = t.west),
            (e.south = t.south),
            (e.east = t.east),
            (e.north = t.north),
            e)
          : new ft(t.west, t.south, t.east, t.north);
    }),
    (ft.equalsEpsilon = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        t === e ||
          (n.defined(t) &&
            n.defined(e) &&
            Math.abs(t.west - e.west) <= r &&
            Math.abs(t.south - e.south) <= r &&
            Math.abs(t.east - e.east) <= r &&
            Math.abs(t.north - e.north) <= r)
      );
    }),
    (ft.prototype.clone = function (t) {
      return ft.clone(this, t);
    }),
    (ft.prototype.equals = function (t) {
      return ft.equals(this, t);
    }),
    (ft.equals = function (t, e) {
      return (
        t === e ||
        (n.defined(t) &&
          n.defined(e) &&
          t.west === e.west &&
          t.south === e.south &&
          t.east === e.east &&
          t.north === e.north)
      );
    }),
    (ft.prototype.equalsEpsilon = function (t, e) {
      return ft.equalsEpsilon(this, t, e);
    }),
    (ft.validate = function (t) {}),
    (ft.southwest = function (t, e) {
      return n.defined(e)
        ? ((e.longitude = t.west), (e.latitude = t.south), (e.height = 0), e)
        : new p(t.west, t.south);
    }),
    (ft.northwest = function (t, e) {
      return n.defined(e)
        ? ((e.longitude = t.west), (e.latitude = t.north), (e.height = 0), e)
        : new p(t.west, t.north);
    }),
    (ft.northeast = function (t, e) {
      return n.defined(e)
        ? ((e.longitude = t.east), (e.latitude = t.north), (e.height = 0), e)
        : new p(t.east, t.north);
    }),
    (ft.southeast = function (t, e) {
      return n.defined(e)
        ? ((e.longitude = t.east), (e.latitude = t.south), (e.height = 0), e)
        : new p(t.east, t.south);
    }),
    (ft.center = function (t, e) {
      let i = t.east;
      const a = t.west;
      i < a && (i += r.CesiumMath.TWO_PI);
      const u = r.CesiumMath.negativePiToPi(0.5 * (a + i)),
        o = 0.5 * (t.south + t.north);
      return n.defined(e)
        ? ((e.longitude = u), (e.latitude = o), (e.height = 0), e)
        : new p(u, o);
    }),
    (ft.intersection = function (t, e, i) {
      let a = t.east,
        u = t.west,
        o = e.east,
        s = e.west;
      a < u && o > 0
        ? (a += r.CesiumMath.TWO_PI)
        : o < s && a > 0 && (o += r.CesiumMath.TWO_PI),
        a < u && s < 0
          ? (s += r.CesiumMath.TWO_PI)
          : o < s && u < 0 && (u += r.CesiumMath.TWO_PI);
      const c = r.CesiumMath.negativePiToPi(Math.max(u, s)),
        l = r.CesiumMath.negativePiToPi(Math.min(a, o));
      if ((t.west < t.east || e.west < e.east) && l <= c) return;
      const f = Math.max(t.south, e.south),
        d = Math.min(t.north, e.north);
      return f >= d
        ? void 0
        : n.defined(i)
        ? ((i.west = c), (i.south = f), (i.east = l), (i.north = d), i)
        : new ft(c, f, l, d);
    }),
    (ft.simpleIntersection = function (t, e, r) {
      const i = Math.max(t.west, e.west),
        a = Math.max(t.south, e.south),
        u = Math.min(t.east, e.east),
        o = Math.min(t.north, e.north);
      if (!(a >= o || i >= u))
        return n.defined(r)
          ? ((r.west = i), (r.south = a), (r.east = u), (r.north = o), r)
          : new ft(i, a, u, o);
    }),
    (ft.union = function (t, e, i) {
      n.defined(i) || (i = new ft());
      let a = t.east,
        u = t.west,
        o = e.east,
        s = e.west;
      a < u && o > 0
        ? (a += r.CesiumMath.TWO_PI)
        : o < s && a > 0 && (o += r.CesiumMath.TWO_PI),
        a < u && s < 0
          ? (s += r.CesiumMath.TWO_PI)
          : o < s && u < 0 && (u += r.CesiumMath.TWO_PI);
      const c = r.CesiumMath.negativePiToPi(Math.min(u, s)),
        l = r.CesiumMath.negativePiToPi(Math.max(a, o));
      return (
        (i.west = c),
        (i.south = Math.min(t.south, e.south)),
        (i.east = l),
        (i.north = Math.max(t.north, e.north)),
        i
      );
    }),
    (ft.expand = function (t, e, r) {
      return (
        n.defined(r) || (r = new ft()),
        (r.west = Math.min(t.west, e.longitude)),
        (r.south = Math.min(t.south, e.latitude)),
        (r.east = Math.max(t.east, e.longitude)),
        (r.north = Math.max(t.north, e.latitude)),
        r
      );
    }),
    (ft.contains = function (t, e) {
      let n = e.longitude;
      const i = e.latitude,
        a = t.west;
      let u = t.east;
      return (
        u < a &&
          ((u += r.CesiumMath.TWO_PI), n < 0 && (n += r.CesiumMath.TWO_PI)),
        (n > a || r.CesiumMath.equalsEpsilon(n, a, r.CesiumMath.EPSILON14)) &&
          (n < u || r.CesiumMath.equalsEpsilon(n, u, r.CesiumMath.EPSILON14)) &&
          i >= t.south &&
          i <= t.north
      );
    });
  const dt = new p();
  function ht(t, e) {
    (this.x = n.defaultValue(t, 0)), (this.y = n.defaultValue(e, 0));
  }
  (ft.subsample = function (t, e, i, a) {
    (e = n.defaultValue(e, b.WGS84)),
      (i = n.defaultValue(i, 0)),
      n.defined(a) || (a = []);
    let u = 0;
    const o = t.north,
      s = t.south,
      c = t.east,
      l = t.west,
      f = dt;
    (f.height = i),
      (f.longitude = l),
      (f.latitude = o),
      (a[u] = e.cartographicToCartesian(f, a[u])),
      u++,
      (f.longitude = c),
      (a[u] = e.cartographicToCartesian(f, a[u])),
      u++,
      (f.latitude = s),
      (a[u] = e.cartographicToCartesian(f, a[u])),
      u++,
      (f.longitude = l),
      (a[u] = e.cartographicToCartesian(f, a[u])),
      u++,
      (f.latitude = o < 0 ? o : s > 0 ? s : 0);
    for (let n = 1; n < 8; ++n)
      (f.longitude = -Math.PI + n * r.CesiumMath.PI_OVER_TWO),
        ft.contains(t, f) && ((a[u] = e.cartographicToCartesian(f, a[u])), u++);
    return (
      0 === f.latitude &&
        ((f.longitude = l),
        (a[u] = e.cartographicToCartesian(f, a[u])),
        u++,
        (f.longitude = c),
        (a[u] = e.cartographicToCartesian(f, a[u])),
        u++),
      (a.length = u),
      a
    );
  }),
    (ft.MAX_VALUE = Object.freeze(
      new ft(
        -Math.PI,
        -r.CesiumMath.PI_OVER_TWO,
        Math.PI,
        r.CesiumMath.PI_OVER_TWO
      )
    )),
    (ht.fromElements = function (t, e, r) {
      return n.defined(r) ? ((r.x = t), (r.y = e), r) : new ht(t, e);
    }),
    (ht.clone = function (t, e) {
      if (n.defined(t))
        return n.defined(e) ? ((e.x = t.x), (e.y = t.y), e) : new ht(t.x, t.y);
    }),
    (ht.fromCartesian3 = ht.clone),
    (ht.fromCartesian4 = ht.clone),
    (ht.packedLength = 2),
    (ht.pack = function (t, e, r) {
      return (r = n.defaultValue(r, 0)), (e[r++] = t.x), (e[r] = t.y), e;
    }),
    (ht.unpack = function (t, e, r) {
      return (
        (e = n.defaultValue(e, 0)),
        n.defined(r) || (r = new ht()),
        (r.x = t[e++]),
        (r.y = t[e]),
        r
      );
    }),
    (ht.packArray = function (t, r) {
      const i = t.length,
        a = 2 * i;
      if (n.defined(r)) {
        if (!Array.isArray(r) && r.length !== a)
          throw new e.DeveloperError(
            "If result is a typed array, it must have exactly array.length * 2 elements"
          );
        r.length !== a && (r.length = a);
      } else r = new Array(a);
      for (let e = 0; e < i; ++e) ht.pack(t[e], r, 2 * e);
      return r;
    }),
    (ht.unpackArray = function (t, e) {
      const r = t.length;
      n.defined(e) ? (e.length = r / 2) : (e = new Array(r / 2));
      for (let n = 0; n < r; n += 2) {
        const r = n / 2;
        e[r] = ht.unpack(t, n, e[r]);
      }
      return e;
    }),
    (ht.fromArray = ht.unpack),
    (ht.maximumComponent = function (t) {
      return Math.max(t.x, t.y);
    }),
    (ht.minimumComponent = function (t) {
      return Math.min(t.x, t.y);
    }),
    (ht.minimumByComponent = function (t, e, n) {
      return (n.x = Math.min(t.x, e.x)), (n.y = Math.min(t.y, e.y)), n;
    }),
    (ht.maximumByComponent = function (t, e, n) {
      return (n.x = Math.max(t.x, e.x)), (n.y = Math.max(t.y, e.y)), n;
    }),
    (ht.magnitudeSquared = function (t) {
      return t.x * t.x + t.y * t.y;
    }),
    (ht.magnitude = function (t) {
      return Math.sqrt(ht.magnitudeSquared(t));
    });
  const mt = new ht();
  (ht.distance = function (t, e) {
    return ht.subtract(t, e, mt), ht.magnitude(mt);
  }),
    (ht.distanceSquared = function (t, e) {
      return ht.subtract(t, e, mt), ht.magnitudeSquared(mt);
    }),
    (ht.normalize = function (t, e) {
      const n = ht.magnitude(t);
      return (e.x = t.x / n), (e.y = t.y / n), e;
    }),
    (ht.dot = function (t, e) {
      return t.x * e.x + t.y * e.y;
    }),
    (ht.cross = function (t, e) {
      return t.x * e.y - t.y * e.x;
    }),
    (ht.multiplyComponents = function (t, e, n) {
      return (n.x = t.x * e.x), (n.y = t.y * e.y), n;
    }),
    (ht.divideComponents = function (t, e, n) {
      return (n.x = t.x / e.x), (n.y = t.y / e.y), n;
    }),
    (ht.add = function (t, e, n) {
      return (n.x = t.x + e.x), (n.y = t.y + e.y), n;
    }),
    (ht.subtract = function (t, e, n) {
      return (n.x = t.x - e.x), (n.y = t.y - e.y), n;
    }),
    (ht.multiplyByScalar = function (t, e, n) {
      return (n.x = t.x * e), (n.y = t.y * e), n;
    }),
    (ht.divideByScalar = function (t, e, n) {
      return (n.x = t.x / e), (n.y = t.y / e), n;
    }),
    (ht.negate = function (t, e) {
      return (e.x = -t.x), (e.y = -t.y), e;
    }),
    (ht.abs = function (t, e) {
      return (e.x = Math.abs(t.x)), (e.y = Math.abs(t.y)), e;
    });
  const yt = new ht();
  ht.lerp = function (t, e, n, r) {
    return (
      ht.multiplyByScalar(e, n, yt),
      (r = ht.multiplyByScalar(t, 1 - n, r)),
      ht.add(yt, r, r)
    );
  };
  const pt = new ht(),
    xt = new ht();
  ht.angleBetween = function (t, e) {
    return (
      ht.normalize(t, pt),
      ht.normalize(e, xt),
      r.CesiumMath.acosClamped(ht.dot(pt, xt))
    );
  };
  const Mt = new ht();
  function wt(t, e, r, i) {
    (this[0] = n.defaultValue(t, 0)),
      (this[1] = n.defaultValue(r, 0)),
      (this[2] = n.defaultValue(e, 0)),
      (this[3] = n.defaultValue(i, 0));
  }
  (ht.mostOrthogonalAxis = function (t, e) {
    const n = ht.normalize(t, Mt);
    return (
      ht.abs(n, n),
      (e = n.x <= n.y ? ht.clone(ht.UNIT_X, e) : ht.clone(ht.UNIT_Y, e))
    );
  }),
    (ht.equals = function (t, e) {
      return (
        t === e || (n.defined(t) && n.defined(e) && t.x === e.x && t.y === e.y)
      );
    }),
    (ht.equalsArray = function (t, e, n) {
      return t.x === e[n] && t.y === e[n + 1];
    }),
    (ht.equalsEpsilon = function (t, e, i, a) {
      return (
        t === e ||
        (n.defined(t) &&
          n.defined(e) &&
          r.CesiumMath.equalsEpsilon(t.x, e.x, i, a) &&
          r.CesiumMath.equalsEpsilon(t.y, e.y, i, a))
      );
    }),
    (ht.ZERO = Object.freeze(new ht(0, 0))),
    (ht.ONE = Object.freeze(new ht(1, 1))),
    (ht.UNIT_X = Object.freeze(new ht(1, 0))),
    (ht.UNIT_Y = Object.freeze(new ht(0, 1))),
    (ht.prototype.clone = function (t) {
      return ht.clone(this, t);
    }),
    (ht.prototype.equals = function (t) {
      return ht.equals(this, t);
    }),
    (ht.prototype.equalsEpsilon = function (t, e, n) {
      return ht.equalsEpsilon(this, t, e, n);
    }),
    (ht.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ")";
    }),
    (wt.packedLength = 4),
    (wt.pack = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        (e[r++] = t[0]),
        (e[r++] = t[1]),
        (e[r++] = t[2]),
        (e[r++] = t[3]),
        e
      );
    }),
    (wt.unpack = function (t, e, r) {
      return (
        (e = n.defaultValue(e, 0)),
        n.defined(r) || (r = new wt()),
        (r[0] = t[e++]),
        (r[1] = t[e++]),
        (r[2] = t[e++]),
        (r[3] = t[e++]),
        r
      );
    }),
    (wt.clone = function (t, e) {
      if (n.defined(t))
        return n.defined(e)
          ? ((e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e)
          : new wt(t[0], t[2], t[1], t[3]);
    }),
    (wt.fromArray = function (t, e, r) {
      return (
        (e = n.defaultValue(e, 0)),
        n.defined(r) || (r = new wt()),
        (r[0] = t[e]),
        (r[1] = t[e + 1]),
        (r[2] = t[e + 2]),
        (r[3] = t[e + 3]),
        r
      );
    }),
    (wt.fromColumnMajorArray = function (t, e) {
      return wt.clone(t, e);
    }),
    (wt.fromRowMajorArray = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t[0]), (e[1] = t[2]), (e[2] = t[1]), (e[3] = t[3]), e)
        : new wt(t[0], t[1], t[2], t[3]);
    }),
    (wt.fromScale = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t.x), (e[1] = 0), (e[2] = 0), (e[3] = t.y), e)
        : new wt(t.x, 0, 0, t.y);
    }),
    (wt.fromUniformScale = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t), (e[1] = 0), (e[2] = 0), (e[3] = t), e)
        : new wt(t, 0, 0, t);
    }),
    (wt.fromRotation = function (t, e) {
      const r = Math.cos(t),
        i = Math.sin(t);
      return n.defined(e)
        ? ((e[0] = r), (e[1] = i), (e[2] = -i), (e[3] = r), e)
        : new wt(r, -i, i, r);
    }),
    (wt.toArray = function (t, e) {
      return n.defined(e)
        ? ((e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e)
        : [t[0], t[1], t[2], t[3]];
    }),
    (wt.getElementIndex = function (t, e) {
      return 2 * t + e;
    }),
    (wt.getColumn = function (t, e, n) {
      const r = 2 * e,
        i = t[r],
        a = t[r + 1];
      return (n.x = i), (n.y = a), n;
    }),
    (wt.setColumn = function (t, e, n, r) {
      const i = 2 * e;
      return ((r = wt.clone(t, r))[i] = n.x), (r[i + 1] = n.y), r;
    }),
    (wt.getRow = function (t, e, n) {
      const r = t[e],
        i = t[e + 2];
      return (n.x = r), (n.y = i), n;
    }),
    (wt.setRow = function (t, e, n, r) {
      return ((r = wt.clone(t, r))[e] = n.x), (r[e + 2] = n.y), r;
    });
  const gt = new ht();
  wt.getScale = function (t, e) {
    return (
      (e.x = ht.magnitude(ht.fromElements(t[0], t[1], gt))),
      (e.y = ht.magnitude(ht.fromElements(t[2], t[3], gt))),
      e
    );
  };
  const zt = new ht();
  (wt.getMaximumScale = function (t) {
    return wt.getScale(t, zt), ht.maximumComponent(zt);
  }),
    (wt.multiply = function (t, e, n) {
      const r = t[0] * e[0] + t[2] * e[1],
        i = t[0] * e[2] + t[2] * e[3],
        a = t[1] * e[0] + t[3] * e[1],
        u = t[1] * e[2] + t[3] * e[3];
      return (n[0] = r), (n[1] = a), (n[2] = i), (n[3] = u), n;
    }),
    (wt.add = function (t, e, n) {
      return (
        (n[0] = t[0] + e[0]),
        (n[1] = t[1] + e[1]),
        (n[2] = t[2] + e[2]),
        (n[3] = t[3] + e[3]),
        n
      );
    }),
    (wt.subtract = function (t, e, n) {
      return (
        (n[0] = t[0] - e[0]),
        (n[1] = t[1] - e[1]),
        (n[2] = t[2] - e[2]),
        (n[3] = t[3] - e[3]),
        n
      );
    }),
    (wt.multiplyByVector = function (t, e, n) {
      const r = t[0] * e.x + t[2] * e.y,
        i = t[1] * e.x + t[3] * e.y;
      return (n.x = r), (n.y = i), n;
    }),
    (wt.multiplyByScalar = function (t, e, n) {
      return (
        (n[0] = t[0] * e),
        (n[1] = t[1] * e),
        (n[2] = t[2] * e),
        (n[3] = t[3] * e),
        n
      );
    }),
    (wt.multiplyByScale = function (t, e, n) {
      return (
        (n[0] = t[0] * e.x),
        (n[1] = t[1] * e.x),
        (n[2] = t[2] * e.y),
        (n[3] = t[3] * e.y),
        n
      );
    }),
    (wt.negate = function (t, e) {
      return (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = -t[3]), e;
    }),
    (wt.transpose = function (t, e) {
      const n = t[0],
        r = t[2],
        i = t[1],
        a = t[3];
      return (e[0] = n), (e[1] = r), (e[2] = i), (e[3] = a), e;
    }),
    (wt.abs = function (t, e) {
      return (
        (e[0] = Math.abs(t[0])),
        (e[1] = Math.abs(t[1])),
        (e[2] = Math.abs(t[2])),
        (e[3] = Math.abs(t[3])),
        e
      );
    }),
    (wt.equals = function (t, e) {
      return (
        t === e ||
        (n.defined(t) &&
          n.defined(e) &&
          t[0] === e[0] &&
          t[1] === e[1] &&
          t[2] === e[2] &&
          t[3] === e[3])
      );
    }),
    (wt.equalsArray = function (t, e, n) {
      return (
        t[0] === e[n] &&
        t[1] === e[n + 1] &&
        t[2] === e[n + 2] &&
        t[3] === e[n + 3]
      );
    }),
    (wt.equalsEpsilon = function (t, e, r) {
      return (
        (r = n.defaultValue(r, 0)),
        t === e ||
          (n.defined(t) &&
            n.defined(e) &&
            Math.abs(t[0] - e[0]) <= r &&
            Math.abs(t[1] - e[1]) <= r &&
            Math.abs(t[2] - e[2]) <= r &&
            Math.abs(t[3] - e[3]) <= r)
      );
    }),
    (wt.IDENTITY = Object.freeze(new wt(1, 0, 0, 1))),
    (wt.ZERO = Object.freeze(new wt(0, 0, 0, 0))),
    (wt.COLUMN0ROW0 = 0),
    (wt.COLUMN0ROW1 = 1),
    (wt.COLUMN1ROW0 = 2),
    (wt.COLUMN1ROW1 = 3),
    Object.defineProperties(wt.prototype, {
      length: {
        get: function () {
          return wt.packedLength;
        },
      },
    }),
    (wt.prototype.clone = function (t) {
      return wt.clone(this, t);
    }),
    (wt.prototype.equals = function (t) {
      return wt.equals(this, t);
    }),
    (wt.prototype.equalsEpsilon = function (t, e) {
      return wt.equalsEpsilon(this, t, e);
    }),
    (wt.prototype.toString = function () {
      return (
        "(" + this[0] + ", " + this[2] + ")\n(" + this[1] + ", " + this[3] + ")"
      );
    }),
    (t.Cartesian2 = ht),
    (t.Cartesian3 = i),
    (t.Cartesian4 = D),
    (t.Cartographic = p),
    (t.Ellipsoid = b),
    (t.Matrix2 = wt),
    (t.Matrix3 = I),
    (t.Matrix4 = K),
    (t.Rectangle = ft);
});
