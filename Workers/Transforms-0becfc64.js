define([
  "exports",
  "./Matrix2-860854d4",
  "./RuntimeError-1349fdaf",
  "./when-4bbc8319",
  "./ComponentDatatype-8f55628c",
  "./combine-e9466e32",
], function (e, t, n, r, o, i) {
  "use strict";
  function s(e) {
    (this._ellipsoid = r.defaultValue(e, t.Ellipsoid.WGS84)),
      (this._semimajorAxis = this._ellipsoid.maximumRadius),
      (this._oneOverSemimajorAxis = 1 / this._semimajorAxis);
  }
  Object.defineProperties(s.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
  }),
    (s.prototype.project = function (e, n) {
      const o = this._semimajorAxis,
        i = e.longitude * o,
        s = e.latitude * o,
        a = e.height;
      return r.defined(n)
        ? ((n.x = i), (n.y = s), (n.z = a), n)
        : new t.Cartesian3(i, s, a);
    }),
    (s.prototype.unproject = function (e, n) {
      const o = this._oneOverSemimajorAxis,
        i = e.x * o,
        s = e.y * o,
        a = e.z;
      return r.defined(n)
        ? ((n.longitude = i), (n.latitude = s), (n.height = a), n)
        : new t.Cartographic(i, s, a);
    });
  var a = Object.freeze({ OUTSIDE: -1, INTERSECTING: 0, INSIDE: 1 });
  function u(e, t) {
    (this.start = r.defaultValue(e, 0)), (this.stop = r.defaultValue(t, 0));
  }
  function c(e, n) {
    (this.center = t.Cartesian3.clone(r.defaultValue(e, t.Cartesian3.ZERO))),
      (this.radius = r.defaultValue(n, 0));
  }
  const l = new t.Cartesian3(),
    d = new t.Cartesian3(),
    f = new t.Cartesian3(),
    p = new t.Cartesian3(),
    h = new t.Cartesian3(),
    m = new t.Cartesian3(),
    g = new t.Cartesian3(),
    y = new t.Cartesian3(),
    v = new t.Cartesian3(),
    w = new t.Cartesian3(),
    C = new t.Cartesian3(),
    _ = new t.Cartesian3(),
    b = (4 / 3) * o.CesiumMath.PI;
  c.fromPoints = function (e, n) {
    if ((r.defined(n) || (n = new c()), !r.defined(e) || 0 === e.length))
      return (
        (n.center = t.Cartesian3.clone(t.Cartesian3.ZERO, n.center)),
        (n.radius = 0),
        n
      );
    const o = t.Cartesian3.clone(e[0], g),
      i = t.Cartesian3.clone(o, l),
      s = t.Cartesian3.clone(o, d),
      a = t.Cartesian3.clone(o, f),
      u = t.Cartesian3.clone(o, p),
      b = t.Cartesian3.clone(o, h),
      x = t.Cartesian3.clone(o, m),
      S = e.length;
    let E;
    for (E = 1; E < S; E++) {
      t.Cartesian3.clone(e[E], o);
      const n = o.x,
        r = o.y,
        c = o.z;
      n < i.x && t.Cartesian3.clone(o, i),
        n > u.x && t.Cartesian3.clone(o, u),
        r < s.y && t.Cartesian3.clone(o, s),
        r > b.y && t.Cartesian3.clone(o, b),
        c < a.z && t.Cartesian3.clone(o, a),
        c > x.z && t.Cartesian3.clone(o, x);
    }
    const A = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(u, i, y)),
      O = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(b, s, y)),
      I = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(x, a, y));
    let R = i,
      P = u,
      T = A;
    O > T && ((T = O), (R = s), (P = b)), I > T && ((T = I), (R = a), (P = x));
    const q = v;
    (q.x = 0.5 * (R.x + P.x)),
      (q.y = 0.5 * (R.y + P.y)),
      (q.z = 0.5 * (R.z + P.z));
    let z = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(P, q, y)),
      M = Math.sqrt(z);
    const D = w;
    (D.x = i.x), (D.y = s.y), (D.z = a.z);
    const U = C;
    (U.x = u.x), (U.y = b.y), (U.z = x.z);
    const k = t.Cartesian3.midpoint(D, U, _);
    let F = 0;
    for (E = 0; E < S; E++) {
      t.Cartesian3.clone(e[E], o);
      const n = t.Cartesian3.magnitude(t.Cartesian3.subtract(o, k, y));
      n > F && (F = n);
      const r = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(o, q, y));
      if (r > z) {
        const e = Math.sqrt(r);
        (M = 0.5 * (M + e)), (z = M * M);
        const t = e - M;
        (q.x = (M * q.x + t * o.x) / e),
          (q.y = (M * q.y + t * o.y) / e),
          (q.z = (M * q.z + t * o.z) / e);
      }
    }
    return (
      M < F
        ? (t.Cartesian3.clone(q, n.center), (n.radius = M))
        : (t.Cartesian3.clone(k, n.center), (n.radius = F)),
      n
    );
  };
  const x = new s(),
    S = new t.Cartesian3(),
    E = new t.Cartesian3(),
    A = new t.Cartographic(),
    O = new t.Cartographic();
  (c.fromRectangle2D = function (e, t, n) {
    return c.fromRectangleWithHeights2D(e, t, 0, 0, n);
  }),
    (c.fromRectangleWithHeights2D = function (e, n, o, i, s) {
      if ((r.defined(s) || (s = new c()), !r.defined(e)))
        return (
          (s.center = t.Cartesian3.clone(t.Cartesian3.ZERO, s.center)),
          (s.radius = 0),
          s
        );
      (n = r.defaultValue(n, x)),
        t.Rectangle.southwest(e, A),
        (A.height = o),
        t.Rectangle.northeast(e, O),
        (O.height = i);
      const a = n.project(A, S),
        u = n.project(O, E),
        l = u.x - a.x,
        d = u.y - a.y,
        f = u.z - a.z;
      s.radius = 0.5 * Math.sqrt(l * l + d * d + f * f);
      const p = s.center;
      return (
        (p.x = a.x + 0.5 * l), (p.y = a.y + 0.5 * d), (p.z = a.z + 0.5 * f), s
      );
    });
  const I = [];
  (c.fromRectangle3D = function (e, n, o, i) {
    if (
      ((n = r.defaultValue(n, t.Ellipsoid.WGS84)),
      (o = r.defaultValue(o, 0)),
      r.defined(i) || (i = new c()),
      !r.defined(e))
    )
      return (
        (i.center = t.Cartesian3.clone(t.Cartesian3.ZERO, i.center)),
        (i.radius = 0),
        i
      );
    const s = t.Rectangle.subsample(e, n, o, I);
    return c.fromPoints(s, i);
  }),
    (c.fromVertices = function (e, n, o, i) {
      if ((r.defined(i) || (i = new c()), !r.defined(e) || 0 === e.length))
        return (
          (i.center = t.Cartesian3.clone(t.Cartesian3.ZERO, i.center)),
          (i.radius = 0),
          i
        );
      (n = r.defaultValue(n, t.Cartesian3.ZERO)), (o = r.defaultValue(o, 3));
      const s = g;
      (s.x = e[0] + n.x), (s.y = e[1] + n.y), (s.z = e[2] + n.z);
      const a = t.Cartesian3.clone(s, l),
        u = t.Cartesian3.clone(s, d),
        b = t.Cartesian3.clone(s, f),
        x = t.Cartesian3.clone(s, p),
        S = t.Cartesian3.clone(s, h),
        E = t.Cartesian3.clone(s, m),
        A = e.length;
      let O;
      for (O = 0; O < A; O += o) {
        const r = e[O] + n.x,
          o = e[O + 1] + n.y,
          i = e[O + 2] + n.z;
        (s.x = r),
          (s.y = o),
          (s.z = i),
          r < a.x && t.Cartesian3.clone(s, a),
          r > x.x && t.Cartesian3.clone(s, x),
          o < u.y && t.Cartesian3.clone(s, u),
          o > S.y && t.Cartesian3.clone(s, S),
          i < b.z && t.Cartesian3.clone(s, b),
          i > E.z && t.Cartesian3.clone(s, E);
      }
      const I = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(x, a, y)),
        R = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(S, u, y)),
        P = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(E, b, y));
      let T = a,
        q = x,
        z = I;
      R > z && ((z = R), (T = u), (q = S)),
        P > z && ((z = P), (T = b), (q = E));
      const M = v;
      (M.x = 0.5 * (T.x + q.x)),
        (M.y = 0.5 * (T.y + q.y)),
        (M.z = 0.5 * (T.z + q.z));
      let D = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(q, M, y)),
        U = Math.sqrt(D);
      const k = w;
      (k.x = a.x), (k.y = u.y), (k.z = b.z);
      const F = C;
      (F.x = x.x), (F.y = S.y), (F.z = E.z);
      const N = t.Cartesian3.midpoint(k, F, _);
      let j = 0;
      for (O = 0; O < A; O += o) {
        (s.x = e[O] + n.x), (s.y = e[O + 1] + n.y), (s.z = e[O + 2] + n.z);
        const r = t.Cartesian3.magnitude(t.Cartesian3.subtract(s, N, y));
        r > j && (j = r);
        const o = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(s, M, y));
        if (o > D) {
          const e = Math.sqrt(o);
          (U = 0.5 * (U + e)), (D = U * U);
          const t = e - U;
          (M.x = (U * M.x + t * s.x) / e),
            (M.y = (U * M.y + t * s.y) / e),
            (M.z = (U * M.z + t * s.z) / e);
        }
      }
      return (
        U < j
          ? (t.Cartesian3.clone(M, i.center), (i.radius = U))
          : (t.Cartesian3.clone(N, i.center), (i.radius = j)),
        i
      );
    }),
    (c.fromEncodedCartesianVertices = function (e, n, o) {
      if (
        (r.defined(o) || (o = new c()),
        !r.defined(e) ||
          !r.defined(n) ||
          e.length !== n.length ||
          0 === e.length)
      )
        return (
          (o.center = t.Cartesian3.clone(t.Cartesian3.ZERO, o.center)),
          (o.radius = 0),
          o
        );
      const i = g;
      (i.x = e[0] + n[0]), (i.y = e[1] + n[1]), (i.z = e[2] + n[2]);
      const s = t.Cartesian3.clone(i, l),
        a = t.Cartesian3.clone(i, d),
        u = t.Cartesian3.clone(i, f),
        b = t.Cartesian3.clone(i, p),
        x = t.Cartesian3.clone(i, h),
        S = t.Cartesian3.clone(i, m),
        E = e.length;
      let A;
      for (A = 0; A < E; A += 3) {
        const r = e[A] + n[A],
          o = e[A + 1] + n[A + 1],
          c = e[A + 2] + n[A + 2];
        (i.x = r),
          (i.y = o),
          (i.z = c),
          r < s.x && t.Cartesian3.clone(i, s),
          r > b.x && t.Cartesian3.clone(i, b),
          o < a.y && t.Cartesian3.clone(i, a),
          o > x.y && t.Cartesian3.clone(i, x),
          c < u.z && t.Cartesian3.clone(i, u),
          c > S.z && t.Cartesian3.clone(i, S);
      }
      const O = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(b, s, y)),
        I = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(x, a, y)),
        R = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(S, u, y));
      let P = s,
        T = b,
        q = O;
      I > q && ((q = I), (P = a), (T = x)),
        R > q && ((q = R), (P = u), (T = S));
      const z = v;
      (z.x = 0.5 * (P.x + T.x)),
        (z.y = 0.5 * (P.y + T.y)),
        (z.z = 0.5 * (P.z + T.z));
      let M = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(T, z, y)),
        D = Math.sqrt(M);
      const U = w;
      (U.x = s.x), (U.y = a.y), (U.z = u.z);
      const k = C;
      (k.x = b.x), (k.y = x.y), (k.z = S.z);
      const F = t.Cartesian3.midpoint(U, k, _);
      let N = 0;
      for (A = 0; A < E; A += 3) {
        (i.x = e[A] + n[A]),
          (i.y = e[A + 1] + n[A + 1]),
          (i.z = e[A + 2] + n[A + 2]);
        const r = t.Cartesian3.magnitude(t.Cartesian3.subtract(i, F, y));
        r > N && (N = r);
        const o = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(i, z, y));
        if (o > M) {
          const e = Math.sqrt(o);
          (D = 0.5 * (D + e)), (M = D * D);
          const t = e - D;
          (z.x = (D * z.x + t * i.x) / e),
            (z.y = (D * z.y + t * i.y) / e),
            (z.z = (D * z.z + t * i.z) / e);
        }
      }
      return (
        D < N
          ? (t.Cartesian3.clone(z, o.center), (o.radius = D))
          : (t.Cartesian3.clone(F, o.center), (o.radius = N)),
        o
      );
    }),
    (c.fromCornerPoints = function (e, n, o) {
      r.defined(o) || (o = new c());
      const i = t.Cartesian3.midpoint(e, n, o.center);
      return (o.radius = t.Cartesian3.distance(i, n)), o;
    }),
    (c.fromEllipsoid = function (e, n) {
      return (
        r.defined(n) || (n = new c()),
        t.Cartesian3.clone(t.Cartesian3.ZERO, n.center),
        (n.radius = e.maximumRadius),
        n
      );
    });
  const R = new t.Cartesian3();
  c.fromBoundingSpheres = function (e, n) {
    if ((r.defined(n) || (n = new c()), !r.defined(e) || 0 === e.length))
      return (
        (n.center = t.Cartesian3.clone(t.Cartesian3.ZERO, n.center)),
        (n.radius = 0),
        n
      );
    const o = e.length;
    if (1 === o) return c.clone(e[0], n);
    if (2 === o) return c.union(e[0], e[1], n);
    const i = [];
    let s;
    for (s = 0; s < o; s++) i.push(e[s].center);
    const a = (n = c.fromPoints(i, n)).center;
    let u = n.radius;
    for (s = 0; s < o; s++) {
      const n = e[s];
      u = Math.max(u, t.Cartesian3.distance(a, n.center, R) + n.radius);
    }
    return (n.radius = u), n;
  };
  const P = new t.Cartesian3(),
    T = new t.Cartesian3(),
    q = new t.Cartesian3();
  (c.fromOrientedBoundingBox = function (e, n) {
    r.defined(n) || (n = new c());
    const o = e.halfAxes,
      i = t.Matrix3.getColumn(o, 0, P),
      s = t.Matrix3.getColumn(o, 1, T),
      a = t.Matrix3.getColumn(o, 2, q);
    return (
      t.Cartesian3.add(i, s, i),
      t.Cartesian3.add(i, a, i),
      (n.center = t.Cartesian3.clone(e.center, n.center)),
      (n.radius = t.Cartesian3.magnitude(i)),
      n
    );
  }),
    (c.clone = function (e, n) {
      if (r.defined(e))
        return r.defined(n)
          ? ((n.center = t.Cartesian3.clone(e.center, n.center)),
            (n.radius = e.radius),
            n)
          : new c(e.center, e.radius);
    }),
    (c.packedLength = 4),
    (c.pack = function (e, t, n) {
      n = r.defaultValue(n, 0);
      const o = e.center;
      return (
        (t[n++] = o.x), (t[n++] = o.y), (t[n++] = o.z), (t[n] = e.radius), t
      );
    }),
    (c.unpack = function (e, t, n) {
      (t = r.defaultValue(t, 0)), r.defined(n) || (n = new c());
      const o = n.center;
      return (
        (o.x = e[t++]), (o.y = e[t++]), (o.z = e[t++]), (n.radius = e[t]), n
      );
    });
  const z = new t.Cartesian3(),
    M = new t.Cartesian3();
  c.union = function (e, n, o) {
    r.defined(o) || (o = new c());
    const i = e.center,
      s = e.radius,
      a = n.center,
      u = n.radius,
      l = t.Cartesian3.subtract(a, i, z),
      d = t.Cartesian3.magnitude(l);
    if (s >= d + u) return e.clone(o), o;
    if (u >= d + s) return n.clone(o), o;
    const f = 0.5 * (s + d + u),
      p = t.Cartesian3.multiplyByScalar(l, (-s + f) / d, M);
    return (
      t.Cartesian3.add(p, i, p),
      t.Cartesian3.clone(p, o.center),
      (o.radius = f),
      o
    );
  };
  const D = new t.Cartesian3();
  (c.expand = function (e, n, r) {
    r = c.clone(e, r);
    const o = t.Cartesian3.magnitude(t.Cartesian3.subtract(n, r.center, D));
    return o > r.radius && (r.radius = o), r;
  }),
    (c.intersectPlane = function (e, n) {
      const r = e.center,
        o = e.radius,
        i = n.normal,
        s = t.Cartesian3.dot(i, r) + n.distance;
      return s < -o ? a.OUTSIDE : s < o ? a.INTERSECTING : a.INSIDE;
    }),
    (c.transform = function (e, n, o) {
      return (
        r.defined(o) || (o = new c()),
        (o.center = t.Matrix4.multiplyByPoint(n, e.center, o.center)),
        (o.radius = t.Matrix4.getMaximumScale(n) * e.radius),
        o
      );
    });
  const U = new t.Cartesian3();
  (c.distanceSquaredTo = function (e, n) {
    const r = t.Cartesian3.subtract(e.center, n, U),
      o = t.Cartesian3.magnitude(r) - e.radius;
    return o <= 0 ? 0 : o * o;
  }),
    (c.transformWithoutScale = function (e, n, o) {
      return (
        r.defined(o) || (o = new c()),
        (o.center = t.Matrix4.multiplyByPoint(n, e.center, o.center)),
        (o.radius = e.radius),
        o
      );
    });
  const k = new t.Cartesian3();
  c.computePlaneDistances = function (e, n, o, i) {
    r.defined(i) || (i = new u());
    const s = t.Cartesian3.subtract(e.center, n, k),
      a = t.Cartesian3.dot(o, s);
    return (i.start = a - e.radius), (i.stop = a + e.radius), i;
  };
  const F = new t.Cartesian3(),
    N = new t.Cartesian3(),
    j = new t.Cartesian3(),
    B = new t.Cartesian3(),
    V = new t.Cartesian3(),
    L = new t.Cartographic(),
    Q = new Array(8);
  for (let e = 0; e < 8; ++e) Q[e] = new t.Cartesian3();
  const W = new s();
  let H;
  (c.projectTo2D = function (e, n, o) {
    const i = (n = r.defaultValue(n, W)).ellipsoid;
    let s = e.center;
    const a = e.radius;
    let u;
    u = t.Cartesian3.equals(s, t.Cartesian3.ZERO)
      ? t.Cartesian3.clone(t.Cartesian3.UNIT_X, F)
      : i.geodeticSurfaceNormal(s, F);
    const l = t.Cartesian3.cross(t.Cartesian3.UNIT_Z, u, N);
    t.Cartesian3.normalize(l, l);
    const d = t.Cartesian3.cross(u, l, j);
    t.Cartesian3.normalize(d, d),
      t.Cartesian3.multiplyByScalar(u, a, u),
      t.Cartesian3.multiplyByScalar(d, a, d),
      t.Cartesian3.multiplyByScalar(l, a, l);
    const f = t.Cartesian3.negate(d, V),
      p = t.Cartesian3.negate(l, B),
      h = Q;
    let m = h[0];
    t.Cartesian3.add(u, d, m),
      t.Cartesian3.add(m, l, m),
      (m = h[1]),
      t.Cartesian3.add(u, d, m),
      t.Cartesian3.add(m, p, m),
      (m = h[2]),
      t.Cartesian3.add(u, f, m),
      t.Cartesian3.add(m, p, m),
      (m = h[3]),
      t.Cartesian3.add(u, f, m),
      t.Cartesian3.add(m, l, m),
      t.Cartesian3.negate(u, u),
      (m = h[4]),
      t.Cartesian3.add(u, d, m),
      t.Cartesian3.add(m, l, m),
      (m = h[5]),
      t.Cartesian3.add(u, d, m),
      t.Cartesian3.add(m, p, m),
      (m = h[6]),
      t.Cartesian3.add(u, f, m),
      t.Cartesian3.add(m, p, m),
      (m = h[7]),
      t.Cartesian3.add(u, f, m),
      t.Cartesian3.add(m, l, m);
    const g = h.length;
    for (let e = 0; e < g; ++e) {
      const r = h[e];
      t.Cartesian3.add(s, r, r);
      const o = i.cartesianToCartographic(r, L);
      n.project(o, r);
    }
    s = (o = c.fromPoints(h, o)).center;
    const y = s.x,
      v = s.y,
      w = s.z;
    return (s.x = w), (s.y = y), (s.z = v), o;
  }),
    (c.isOccluded = function (e, t) {
      return !t.isBoundingSphereVisible(e);
    }),
    (c.equals = function (e, n) {
      return (
        e === n ||
        (r.defined(e) &&
          r.defined(n) &&
          t.Cartesian3.equals(e.center, n.center) &&
          e.radius === n.radius)
      );
    }),
    (c.prototype.intersectPlane = function (e) {
      return c.intersectPlane(this, e);
    }),
    (c.prototype.distanceSquaredTo = function (e) {
      return c.distanceSquaredTo(this, e);
    }),
    (c.prototype.computePlaneDistances = function (e, t, n) {
      return c.computePlaneDistances(this, e, t, n);
    }),
    (c.prototype.isOccluded = function (e) {
      return c.isOccluded(this, e);
    }),
    (c.prototype.equals = function (e) {
      return c.equals(this, e);
    }),
    (c.prototype.clone = function (e) {
      return c.clone(this, e);
    }),
    (c.prototype.volume = function () {
      const e = this.radius;
      return b * e * e * e;
    });
  const Y = {
      requestFullscreen: void 0,
      exitFullscreen: void 0,
      fullscreenEnabled: void 0,
      fullscreenElement: void 0,
      fullscreenchange: void 0,
      fullscreenerror: void 0,
    },
    Z = {};
  let G, J, $, X, K, ee, te, ne, re, oe, ie, se, ae, ue, ce, le, de;
  function fe(e) {
    const t = e.split(".");
    for (let e = 0, n = t.length; e < n; ++e) t[e] = parseInt(t[e], 10);
    return t;
  }
  function pe() {
    if (!r.defined(J) && ((J = !1), !ye())) {
      const e = / Chrome\/([\.0-9]+)/.exec(G.userAgent);
      null !== e && ((J = !0), ($ = fe(e[1])));
    }
    return J;
  }
  function he() {
    if (
      !r.defined(X) &&
      ((X = !1), !pe() && !ye() && / Safari\/[\.0-9]+/.test(G.userAgent))
    ) {
      const e = / Version\/([\.0-9]+)/.exec(G.userAgent);
      null !== e && ((X = !0), (K = fe(e[1])));
    }
    return X;
  }
  function me() {
    if (!r.defined(ee)) {
      ee = !1;
      const e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(G.userAgent);
      null !== e && ((ee = !0), (te = fe(e[1])), (te.isNightly = !!e[2]));
    }
    return ee;
  }
  function ge() {
    if (!r.defined(ne)) {
      let e;
      (ne = !1),
        "Microsoft Internet Explorer" === G.appName
          ? ((e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(G.userAgent)),
            null !== e && ((ne = !0), (re = fe(e[1]))))
          : "Netscape" === G.appName &&
            ((e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(G.userAgent)),
            null !== e && ((ne = !0), (re = fe(e[1]))));
    }
    return ne;
  }
  function ye() {
    if (!r.defined(oe)) {
      oe = !1;
      const e = / Edge\/([\.0-9]+)/.exec(G.userAgent);
      null !== e && ((oe = !0), (ie = fe(e[1])));
    }
    return oe;
  }
  function ve() {
    if (!r.defined(se)) {
      se = !1;
      const e = /Firefox\/([\.0-9]+)/.exec(G.userAgent);
      null !== e && ((se = !0), (ae = fe(e[1])));
    }
    return se;
  }
  function we() {
    if (!r.defined(de)) {
      const e = document.createElement("canvas");
      e.setAttribute(
        "style",
        "image-rendering: -moz-crisp-edges;image-rendering: pixelated;"
      );
      const t = e.style.imageRendering;
      (de = r.defined(t) && "" !== t), de && (le = t);
    }
    return de;
  }
  function Ce() {
    return Ce._result;
  }
  Object.defineProperties(Z, {
    element: {
      get: function () {
        if (Z.supportsFullscreen()) return document[Y.fullscreenElement];
      },
    },
    changeEventName: {
      get: function () {
        if (Z.supportsFullscreen()) return Y.fullscreenchange;
      },
    },
    errorEventName: {
      get: function () {
        if (Z.supportsFullscreen()) return Y.fullscreenerror;
      },
    },
    enabled: {
      get: function () {
        if (Z.supportsFullscreen()) return document[Y.fullscreenEnabled];
      },
    },
    fullscreen: {
      get: function () {
        if (Z.supportsFullscreen()) return null !== Z.element;
      },
    },
  }),
    (Z.supportsFullscreen = function () {
      if (r.defined(H)) return H;
      H = !1;
      const e = document.body;
      if ("function" == typeof e.requestFullscreen)
        return (
          (Y.requestFullscreen = "requestFullscreen"),
          (Y.exitFullscreen = "exitFullscreen"),
          (Y.fullscreenEnabled = "fullscreenEnabled"),
          (Y.fullscreenElement = "fullscreenElement"),
          (Y.fullscreenchange = "fullscreenchange"),
          (Y.fullscreenerror = "fullscreenerror"),
          (H = !0),
          H
        );
      const t = ["webkit", "moz", "o", "ms", "khtml"];
      let n;
      for (let r = 0, o = t.length; r < o; ++r) {
        const o = t[r];
        (n = o + "RequestFullscreen"),
          "function" == typeof e[n]
            ? ((Y.requestFullscreen = n), (H = !0))
            : ((n = o + "RequestFullScreen"),
              "function" == typeof e[n] &&
                ((Y.requestFullscreen = n), (H = !0))),
          (n = o + "ExitFullscreen"),
          "function" == typeof document[n]
            ? (Y.exitFullscreen = n)
            : ((n = o + "CancelFullScreen"),
              "function" == typeof document[n] && (Y.exitFullscreen = n)),
          (n = o + "FullscreenEnabled"),
          void 0 !== document[n]
            ? (Y.fullscreenEnabled = n)
            : ((n = o + "FullScreenEnabled"),
              void 0 !== document[n] && (Y.fullscreenEnabled = n)),
          (n = o + "FullscreenElement"),
          void 0 !== document[n]
            ? (Y.fullscreenElement = n)
            : ((n = o + "FullScreenElement"),
              void 0 !== document[n] && (Y.fullscreenElement = n)),
          (n = o + "fullscreenchange"),
          void 0 !== document["on" + n] &&
            ("ms" === o && (n = "MSFullscreenChange"),
            (Y.fullscreenchange = n)),
          (n = o + "fullscreenerror"),
          void 0 !== document["on" + n] &&
            ("ms" === o && (n = "MSFullscreenError"), (Y.fullscreenerror = n));
      }
      return H;
    }),
    (Z.requestFullscreen = function (e, t) {
      Z.supportsFullscreen() && e[Y.requestFullscreen]({ vrDisplay: t });
    }),
    (Z.exitFullscreen = function () {
      Z.supportsFullscreen() && document[Y.exitFullscreen]();
    }),
    (Z._names = Y),
    (G = "undefined" != typeof navigator ? navigator : {}),
    (Ce._promise = void 0),
    (Ce._result = void 0),
    (Ce.initialize = function () {
      if (r.defined(Ce._promise)) return Ce._promise;
      const e = r.when.defer();
      if (((Ce._promise = e.promise), ye()))
        return (Ce._result = !1), e.resolve(Ce._result), e.promise;
      const t = new Image();
      return (
        (t.onload = function () {
          (Ce._result = t.width > 0 && t.height > 0), e.resolve(Ce._result);
        }),
        (t.onerror = function () {
          (Ce._result = !1), e.resolve(Ce._result);
        }),
        (t.src =
          "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"),
        e.promise
      );
    }),
    Object.defineProperties(Ce, {
      initialized: {
        get: function () {
          return r.defined(Ce._result);
        },
      },
    });
  const _e = [];
  "undefined" != typeof ArrayBuffer &&
    (_e.push(
      Int8Array,
      Uint8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array
    ),
    "undefined" != typeof Uint8ClampedArray && _e.push(Uint8ClampedArray),
    "undefined" != typeof Uint8ClampedArray && _e.push(Uint8ClampedArray),
    "undefined" != typeof BigInt64Array && _e.push(BigInt64Array),
    "undefined" != typeof BigUint64Array && _e.push(BigUint64Array));
  const be = {
    isChrome: pe,
    chromeVersion: function () {
      return pe() && $;
    },
    isSafari: he,
    safariVersion: function () {
      return he() && K;
    },
    isWebkit: me,
    webkitVersion: function () {
      return me() && te;
    },
    isInternetExplorer: ge,
    internetExplorerVersion: function () {
      return ge() && re;
    },
    isEdge: ye,
    edgeVersion: function () {
      return ye() && ie;
    },
    isFirefox: ve,
    firefoxVersion: function () {
      return ve() && ae;
    },
    isWindows: function () {
      return r.defined(ue) || (ue = /Windows/i.test(G.appVersion)), ue;
    },
    hardwareConcurrency: r.defaultValue(G.hardwareConcurrency, 3),
    supportsPointerEvents: function () {
      return (
        r.defined(ce) ||
          (ce =
            !ve() &&
            "undefined" != typeof PointerEvent &&
            (!r.defined(G.pointerEnabled) || G.pointerEnabled)),
        ce
      );
    },
    supportsImageRenderingPixelated: we,
    supportsWebP: Ce,
    imageRenderingValue: function () {
      return we() ? le : void 0;
    },
    typedArrayTypes: _e,
  };
  function xe(e, t, n, o) {
    (this.x = r.defaultValue(e, 0)),
      (this.y = r.defaultValue(t, 0)),
      (this.z = r.defaultValue(n, 0)),
      (this.w = r.defaultValue(o, 0));
  }
  (be.supportsBasis = function (e) {
    return be.supportsWebAssembly() && e.context.supportsBasis;
  }),
    (be.supportsFullscreen = function () {
      return Z.supportsFullscreen();
    }),
    (be.supportsTypedArrays = function () {
      return "undefined" != typeof ArrayBuffer;
    }),
    (be.supportsBigInt64Array = function () {
      return "undefined" != typeof BigInt64Array;
    }),
    (be.supportsBigUint64Array = function () {
      return "undefined" != typeof BigUint64Array;
    }),
    (be.supportsBigInt = function () {
      return "undefined" != typeof BigInt;
    }),
    (be.supportsWebWorkers = function () {
      return "undefined" != typeof Worker;
    }),
    (be.supportsWebAssembly = function () {
      return "undefined" != typeof WebAssembly && !be.isEdge();
    });
  let Se = new t.Cartesian3();
  xe.fromAxisAngle = function (e, n, o) {
    const i = n / 2,
      s = Math.sin(i);
    Se = t.Cartesian3.normalize(e, Se);
    const a = Se.x * s,
      u = Se.y * s,
      c = Se.z * s,
      l = Math.cos(i);
    return r.defined(o)
      ? ((o.x = a), (o.y = u), (o.z = c), (o.w = l), o)
      : new xe(a, u, c, l);
  };
  const Ee = [1, 2, 0],
    Ae = new Array(3);
  xe.fromRotationMatrix = function (e, n) {
    let o, i, s, a, u;
    const c = e[t.Matrix3.COLUMN0ROW0],
      l = e[t.Matrix3.COLUMN1ROW1],
      d = e[t.Matrix3.COLUMN2ROW2],
      f = c + l + d;
    if (f > 0)
      (o = Math.sqrt(f + 1)),
        (u = 0.5 * o),
        (o = 0.5 / o),
        (i = (e[t.Matrix3.COLUMN1ROW2] - e[t.Matrix3.COLUMN2ROW1]) * o),
        (s = (e[t.Matrix3.COLUMN2ROW0] - e[t.Matrix3.COLUMN0ROW2]) * o),
        (a = (e[t.Matrix3.COLUMN0ROW1] - e[t.Matrix3.COLUMN1ROW0]) * o);
    else {
      const n = Ee;
      let r = 0;
      l > c && (r = 1), d > c && d > l && (r = 2);
      const f = n[r],
        p = n[f];
      o = Math.sqrt(
        e[t.Matrix3.getElementIndex(r, r)] -
          e[t.Matrix3.getElementIndex(f, f)] -
          e[t.Matrix3.getElementIndex(p, p)] +
          1
      );
      const h = Ae;
      (h[r] = 0.5 * o),
        (o = 0.5 / o),
        (u =
          (e[t.Matrix3.getElementIndex(p, f)] -
            e[t.Matrix3.getElementIndex(f, p)]) *
          o),
        (h[f] =
          (e[t.Matrix3.getElementIndex(f, r)] +
            e[t.Matrix3.getElementIndex(r, f)]) *
          o),
        (h[p] =
          (e[t.Matrix3.getElementIndex(p, r)] +
            e[t.Matrix3.getElementIndex(r, p)]) *
          o),
        (i = -h[0]),
        (s = -h[1]),
        (a = -h[2]);
    }
    return r.defined(n)
      ? ((n.x = i), (n.y = s), (n.z = a), (n.w = u), n)
      : new xe(i, s, a, u);
  };
  const Oe = new xe();
  let Ie = new xe(),
    Re = new xe(),
    Pe = new xe();
  xe.fromHeadingPitchRoll = function (e, n) {
    return (
      (Pe = xe.fromAxisAngle(t.Cartesian3.UNIT_X, e.roll, Oe)),
      (Re = xe.fromAxisAngle(t.Cartesian3.UNIT_Y, -e.pitch, n)),
      (n = xe.multiply(Re, Pe, Re)),
      (Ie = xe.fromAxisAngle(t.Cartesian3.UNIT_Z, -e.heading, Oe)),
      xe.multiply(Ie, n, n)
    );
  };
  const Te = new t.Cartesian3(),
    qe = new t.Cartesian3(),
    ze = new xe(),
    Me = new xe(),
    De = new xe();
  (xe.packedLength = 4),
    (xe.pack = function (e, t, n) {
      return (
        (n = r.defaultValue(n, 0)),
        (t[n++] = e.x),
        (t[n++] = e.y),
        (t[n++] = e.z),
        (t[n] = e.w),
        t
      );
    }),
    (xe.unpack = function (e, t, n) {
      return (
        (t = r.defaultValue(t, 0)),
        r.defined(n) || (n = new xe()),
        (n.x = e[t]),
        (n.y = e[t + 1]),
        (n.z = e[t + 2]),
        (n.w = e[t + 3]),
        n
      );
    }),
    (xe.packedInterpolationLength = 3),
    (xe.convertPackedArrayForInterpolation = function (e, t, n, o) {
      xe.unpack(e, 4 * n, De), xe.conjugate(De, De);
      for (let i = 0, s = n - t + 1; i < s; i++) {
        const n = 3 * i;
        xe.unpack(e, 4 * (t + i), ze),
          xe.multiply(ze, De, ze),
          ze.w < 0 && xe.negate(ze, ze),
          xe.computeAxis(ze, Te);
        const s = xe.computeAngle(ze);
        r.defined(o) || (o = []),
          (o[n] = Te.x * s),
          (o[n + 1] = Te.y * s),
          (o[n + 2] = Te.z * s);
      }
    }),
    (xe.unpackInterpolationResult = function (e, n, o, i, s) {
      r.defined(s) || (s = new xe()), t.Cartesian3.fromArray(e, 0, qe);
      const a = t.Cartesian3.magnitude(qe);
      return (
        xe.unpack(n, 4 * i, Me),
        0 === a ? xe.clone(xe.IDENTITY, ze) : xe.fromAxisAngle(qe, a, ze),
        xe.multiply(ze, Me, s)
      );
    }),
    (xe.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t)
          ? ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t)
          : new xe(e.x, e.y, e.z, e.w);
    }),
    (xe.conjugate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = e.w), t;
    }),
    (xe.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
    }),
    (xe.magnitude = function (e) {
      return Math.sqrt(xe.magnitudeSquared(e));
    }),
    (xe.normalize = function (e, t) {
      const n = 1 / xe.magnitude(e),
        r = e.x * n,
        o = e.y * n,
        i = e.z * n,
        s = e.w * n;
      return (t.x = r), (t.y = o), (t.z = i), (t.w = s), t;
    }),
    (xe.inverse = function (e, t) {
      const n = xe.magnitudeSquared(e);
      return (t = xe.conjugate(e, t)), xe.multiplyByScalar(t, 1 / n, t);
    }),
    (xe.add = function (e, t, n) {
      return (
        (n.x = e.x + t.x),
        (n.y = e.y + t.y),
        (n.z = e.z + t.z),
        (n.w = e.w + t.w),
        n
      );
    }),
    (xe.subtract = function (e, t, n) {
      return (
        (n.x = e.x - t.x),
        (n.y = e.y - t.y),
        (n.z = e.z - t.z),
        (n.w = e.w - t.w),
        n
      );
    }),
    (xe.negate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = -e.w), t;
    }),
    (xe.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
    }),
    (xe.multiply = function (e, t, n) {
      const r = e.x,
        o = e.y,
        i = e.z,
        s = e.w,
        a = t.x,
        u = t.y,
        c = t.z,
        l = t.w,
        d = s * a + r * l + o * c - i * u,
        f = s * u - r * c + o * l + i * a,
        p = s * c + r * u - o * a + i * l,
        h = s * l - r * a - o * u - i * c;
      return (n.x = d), (n.y = f), (n.z = p), (n.w = h), n;
    }),
    (xe.multiplyByScalar = function (e, t, n) {
      return (
        (n.x = e.x * t), (n.y = e.y * t), (n.z = e.z * t), (n.w = e.w * t), n
      );
    }),
    (xe.divideByScalar = function (e, t, n) {
      return (
        (n.x = e.x / t), (n.y = e.y / t), (n.z = e.z / t), (n.w = e.w / t), n
      );
    }),
    (xe.computeAxis = function (e, t) {
      const n = e.w;
      if (Math.abs(n - 1) < o.CesiumMath.EPSILON6)
        return (t.x = t.y = t.z = 0), t;
      const r = 1 / Math.sqrt(1 - n * n);
      return (t.x = e.x * r), (t.y = e.y * r), (t.z = e.z * r), t;
    }),
    (xe.computeAngle = function (e) {
      return Math.abs(e.w - 1) < o.CesiumMath.EPSILON6 ? 0 : 2 * Math.acos(e.w);
    });
  let Ue = new xe();
  xe.lerp = function (e, t, n, r) {
    return (
      (Ue = xe.multiplyByScalar(t, n, Ue)),
      (r = xe.multiplyByScalar(e, 1 - n, r)),
      xe.add(Ue, r, r)
    );
  };
  let ke = new xe(),
    Fe = new xe(),
    Ne = new xe();
  (xe.slerp = function (e, t, n, r) {
    let i = xe.dot(e, t),
      s = t;
    if (
      (i < 0 && ((i = -i), (s = ke = xe.negate(t, ke))),
      1 - i < o.CesiumMath.EPSILON6)
    )
      return xe.lerp(e, s, n, r);
    const a = Math.acos(i);
    return (
      (Fe = xe.multiplyByScalar(e, Math.sin((1 - n) * a), Fe)),
      (Ne = xe.multiplyByScalar(s, Math.sin(n * a), Ne)),
      (r = xe.add(Fe, Ne, r)),
      xe.multiplyByScalar(r, 1 / Math.sin(a), r)
    );
  }),
    (xe.log = function (e, n) {
      const r = o.CesiumMath.acosClamped(e.w);
      let i = 0;
      return (
        0 !== r && (i = r / Math.sin(r)), t.Cartesian3.multiplyByScalar(e, i, n)
      );
    }),
    (xe.exp = function (e, n) {
      const r = t.Cartesian3.magnitude(e);
      let o = 0;
      return (
        0 !== r && (o = Math.sin(r) / r),
        (n.x = e.x * o),
        (n.y = e.y * o),
        (n.z = e.z * o),
        (n.w = Math.cos(r)),
        n
      );
    });
  const je = new t.Cartesian3(),
    Be = new t.Cartesian3(),
    Ve = new xe(),
    Le = new xe();
  (xe.computeInnerQuadrangle = function (e, n, r, o) {
    const i = xe.conjugate(n, Ve);
    xe.multiply(i, r, Le);
    const s = xe.log(Le, je);
    xe.multiply(i, e, Le);
    const a = xe.log(Le, Be);
    return (
      t.Cartesian3.add(s, a, s),
      t.Cartesian3.multiplyByScalar(s, 0.25, s),
      t.Cartesian3.negate(s, s),
      xe.exp(s, Ve),
      xe.multiply(n, Ve, o)
    );
  }),
    (xe.squad = function (e, t, n, r, o, i) {
      const s = xe.slerp(e, t, o, Ve),
        a = xe.slerp(n, r, o, Le);
      return xe.slerp(s, a, 2 * o * (1 - o), i);
    });
  const Qe = new xe(),
    We = 1.9011074535173003,
    He = be.supportsTypedArrays() ? new Float32Array(8) : [],
    Ye = be.supportsTypedArrays() ? new Float32Array(8) : [],
    Ze = be.supportsTypedArrays() ? new Float32Array(8) : [],
    Ge = be.supportsTypedArrays() ? new Float32Array(8) : [];
  for (let e = 0; e < 7; ++e) {
    const t = e + 1,
      n = 2 * t + 1;
    (He[e] = 1 / (t * n)), (Ye[e] = t / n);
  }
  function Je(e, t, n) {
    let r,
      o,
      i = 0,
      s = e.length - 1;
    for (; i <= s; )
      if (((r = ~~((i + s) / 2)), (o = n(e[r], t)), o < 0)) i = r + 1;
      else {
        if (!(o > 0)) return r;
        s = r - 1;
      }
    return ~(s + 1);
  }
  function $e(e, t, n, r, o) {
    (this.xPoleWander = e),
      (this.yPoleWander = t),
      (this.xPoleOffset = n),
      (this.yPoleOffset = r),
      (this.ut1MinusUtc = o);
  }
  function Xe(e, t, n, r, o, i, s, a) {
    (this.year = e),
      (this.month = t),
      (this.day = n),
      (this.hour = r),
      (this.minute = o),
      (this.second = i),
      (this.millisecond = s),
      (this.isLeapSecond = a);
  }
  function Ke(e) {
    return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
  }
  function et(e, t) {
    (this.julianDate = e), (this.offset = t);
  }
  (He[7] = We / 136),
    (Ye[7] = (8 * We) / 17),
    (xe.fastSlerp = function (e, t, n, r) {
      let o,
        i = xe.dot(e, t);
      i >= 0 ? (o = 1) : ((o = -1), (i = -i));
      const s = i - 1,
        a = 1 - n,
        u = n * n,
        c = a * a;
      for (let e = 7; e >= 0; --e)
        (Ze[e] = (He[e] * u - Ye[e]) * s), (Ge[e] = (He[e] * c - Ye[e]) * s);
      const l =
          o *
          n *
          (1 +
            Ze[0] *
              (1 +
                Ze[1] *
                  (1 +
                    Ze[2] *
                      (1 +
                        Ze[3] *
                          (1 +
                            Ze[4] *
                              (1 + Ze[5] * (1 + Ze[6] * (1 + Ze[7])))))))),
        d =
          a *
          (1 +
            Ge[0] *
              (1 +
                Ge[1] *
                  (1 +
                    Ge[2] *
                      (1 +
                        Ge[3] *
                          (1 +
                            Ge[4] *
                              (1 + Ge[5] * (1 + Ge[6] * (1 + Ge[7])))))))),
        f = xe.multiplyByScalar(e, d, Qe);
      return xe.multiplyByScalar(t, l, r), xe.add(f, r, r);
    }),
    (xe.fastSquad = function (e, t, n, r, o, i) {
      const s = xe.fastSlerp(e, t, o, Ve),
        a = xe.fastSlerp(n, r, o, Le);
      return xe.fastSlerp(s, a, 2 * o * (1 - o), i);
    }),
    (xe.equals = function (e, t) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          e.x === t.x &&
          e.y === t.y &&
          e.z === t.z &&
          e.w === t.w)
      );
    }),
    (xe.equalsEpsilon = function (e, t, n) {
      return (
        (n = r.defaultValue(n, 0)),
        e === t ||
          (r.defined(e) &&
            r.defined(t) &&
            Math.abs(e.x - t.x) <= n &&
            Math.abs(e.y - t.y) <= n &&
            Math.abs(e.z - t.z) <= n &&
            Math.abs(e.w - t.w) <= n)
      );
    }),
    (xe.ZERO = Object.freeze(new xe(0, 0, 0, 0))),
    (xe.IDENTITY = Object.freeze(new xe(0, 0, 0, 1))),
    (xe.prototype.clone = function (e) {
      return xe.clone(this, e);
    }),
    (xe.prototype.equals = function (e) {
      return xe.equals(this, e);
    }),
    (xe.prototype.equalsEpsilon = function (e, t) {
      return xe.equalsEpsilon(this, e, t);
    }),
    (xe.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    });
  var tt = Object.freeze({
    SECONDS_PER_MILLISECOND: 0.001,
    SECONDS_PER_MINUTE: 60,
    MINUTES_PER_HOUR: 60,
    HOURS_PER_DAY: 24,
    SECONDS_PER_HOUR: 3600,
    MINUTES_PER_DAY: 1440,
    SECONDS_PER_DAY: 86400,
    DAYS_PER_JULIAN_CENTURY: 36525,
    PICOSECOND: 1e-9,
    MODIFIED_JULIAN_DATE_DIFFERENCE: 2400000.5,
  });
  var nt = Object.freeze({ UTC: 0, TAI: 1 });
  const rt = new Xe(),
    ot = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function it(e, t) {
    return Ct.compare(e.julianDate, t.julianDate);
  }
  const st = new et();
  function at(e) {
    st.julianDate = e;
    const t = Ct.leapSeconds;
    let n = Je(t, st, it);
    n < 0 && (n = ~n), n >= t.length && (n = t.length - 1);
    let r = t[n].offset;
    if (n > 0) {
      Ct.secondsDifference(t[n].julianDate, e) > r && (n--, (r = t[n].offset));
    }
    Ct.addSeconds(e, r, e);
  }
  function ut(e, t) {
    st.julianDate = e;
    const n = Ct.leapSeconds;
    let r = Je(n, st, it);
    if ((r < 0 && (r = ~r), 0 === r)) return Ct.addSeconds(e, -n[0].offset, t);
    if (r >= n.length) return Ct.addSeconds(e, -n[r - 1].offset, t);
    const o = Ct.secondsDifference(n[r].julianDate, e);
    return 0 === o
      ? Ct.addSeconds(e, -n[r].offset, t)
      : o <= 1
      ? void 0
      : Ct.addSeconds(e, -n[--r].offset, t);
  }
  function ct(e, t, n) {
    const r = (t / tt.SECONDS_PER_DAY) | 0;
    return (
      (e += r),
      (t -= tt.SECONDS_PER_DAY * r) < 0 && (e--, (t += tt.SECONDS_PER_DAY)),
      (n.dayNumber = e),
      (n.secondsOfDay = t),
      n
    );
  }
  function lt(e, t, n, r, o, i, s) {
    const a = ((t - 14) / 12) | 0,
      u = e + 4800 + a;
    let c =
      (((1461 * u) / 4) | 0) +
      (((367 * (t - 2 - 12 * a)) / 12) | 0) -
      (((3 * (((u + 100) / 100) | 0)) / 4) | 0) +
      n -
      32075;
    (r -= 12) < 0 && (r += 24);
    const l =
      i +
      (r * tt.SECONDS_PER_HOUR +
        o * tt.SECONDS_PER_MINUTE +
        s * tt.SECONDS_PER_MILLISECOND);
    return l >= 43200 && (c -= 1), [c, l];
  }
  const dt = /^(\d{4})$/,
    ft = /^(\d{4})-(\d{2})$/,
    pt = /^(\d{4})-?(\d{3})$/,
    ht = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
    mt = /^(\d{4})-?(\d{2})-?(\d{2})$/,
    gt = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
    yt = /^(\d{2})(\.\d+)?/.source + gt.source,
    vt = /^(\d{2}):?(\d{2})(\.\d+)?/.source + gt.source,
    wt = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + gt.source;
  function Ct(e, t, n) {
    (this.dayNumber = void 0),
      (this.secondsOfDay = void 0),
      (e = r.defaultValue(e, 0)),
      (t = r.defaultValue(t, 0)),
      (n = r.defaultValue(n, nt.UTC));
    const o = 0 | e;
    ct(o, (t += (e - o) * tt.SECONDS_PER_DAY), this), n === nt.UTC && at(this);
  }
  (Ct.fromGregorianDate = function (e, t) {
    const n = lt(
      e.year,
      e.month,
      e.day,
      e.hour,
      e.minute,
      e.second,
      e.millisecond
    );
    return r.defined(t)
      ? (ct(n[0], n[1], t), at(t), t)
      : new Ct(n[0], n[1], nt.UTC);
  }),
    (Ct.fromDate = function (e, t) {
      const n = lt(
        e.getUTCFullYear(),
        e.getUTCMonth() + 1,
        e.getUTCDate(),
        e.getUTCHours(),
        e.getUTCMinutes(),
        e.getUTCSeconds(),
        e.getUTCMilliseconds()
      );
      return r.defined(t)
        ? (ct(n[0], n[1], t), at(t), t)
        : new Ct(n[0], n[1], nt.UTC);
    }),
    (Ct.fromIso8601 = function (e, t) {
      let n,
        o = (e = e.replace(",", ".")).split("T"),
        i = 1,
        s = 1,
        a = 0,
        u = 0,
        c = 0,
        l = 0;
      const d = o[0],
        f = o[1];
      let p, h, m;
      if (((o = d.match(mt)), null !== o))
        (n = +o[1]), (i = +o[2]), (s = +o[3]);
      else if (((o = d.match(ft)), null !== o)) (n = +o[1]), (i = +o[2]);
      else if (((o = d.match(dt)), null !== o)) n = +o[1];
      else {
        let e;
        if (((o = d.match(pt)), null !== o))
          (n = +o[1]), (e = +o[2]), (h = Ke(n));
        else if (((o = d.match(ht)), null !== o)) {
          n = +o[1];
          e =
            7 * +o[2] +
            (+o[3] || 0) -
            new Date(Date.UTC(n, 0, 4)).getUTCDay() -
            3;
        }
        (p = new Date(Date.UTC(n, 0, 1))),
          p.setUTCDate(e),
          (i = p.getUTCMonth() + 1),
          (s = p.getUTCDate());
      }
      if (((h = Ke(n)), r.defined(f))) {
        (o = f.match(wt)),
          null !== o
            ? ((a = +o[1]),
              (u = +o[2]),
              (c = +o[3]),
              (l = 1e3 * +(o[4] || 0)),
              (m = 5))
            : ((o = f.match(vt)),
              null !== o
                ? ((a = +o[1]), (u = +o[2]), (c = 60 * +(o[3] || 0)), (m = 4))
                : ((o = f.match(yt)),
                  null !== o &&
                    ((a = +o[1]), (u = 60 * +(o[2] || 0)), (m = 3))));
        const e = o[m],
          t = +o[m + 1],
          r = +(o[m + 2] || 0);
        switch (e) {
          case "+":
            (a -= t), (u -= r);
            break;
          case "-":
            (a += t), (u += r);
            break;
          case "Z":
            break;
          default:
            u += new Date(Date.UTC(n, i - 1, s, a, u)).getTimezoneOffset();
        }
      }
      const g = 60 === c;
      for (g && c--; u >= 60; ) (u -= 60), a++;
      for (; a >= 24; ) (a -= 24), s++;
      for (p = h && 2 === i ? 29 : ot[i - 1]; s > p; )
        (s -= p),
          i++,
          i > 12 && ((i -= 12), n++),
          (p = h && 2 === i ? 29 : ot[i - 1]);
      for (; u < 0; ) (u += 60), a--;
      for (; a < 0; ) (a += 24), s--;
      for (; s < 1; )
        i--,
          i < 1 && ((i += 12), n--),
          (p = h && 2 === i ? 29 : ot[i - 1]),
          (s += p);
      const y = lt(n, i, s, a, u, c, l);
      return (
        r.defined(t)
          ? (ct(y[0], y[1], t), at(t))
          : (t = new Ct(y[0], y[1], nt.UTC)),
        g && Ct.addSeconds(t, 1, t),
        t
      );
    }),
    (Ct.now = function (e) {
      return Ct.fromDate(new Date(), e);
    });
  const _t = new Ct(0, 0, nt.TAI);
  (Ct.toGregorianDate = function (e, t) {
    let n = !1,
      o = ut(e, _t);
    r.defined(o) || (Ct.addSeconds(e, -1, _t), (o = ut(_t, _t)), (n = !0));
    let i = o.dayNumber;
    const s = o.secondsOfDay;
    s >= 43200 && (i += 1);
    let a = (i + 68569) | 0;
    const u = ((4 * a) / 146097) | 0;
    a = (a - (((146097 * u + 3) / 4) | 0)) | 0;
    const c = ((4e3 * (a + 1)) / 1461001) | 0;
    a = (a - (((1461 * c) / 4) | 0) + 31) | 0;
    const l = ((80 * a) / 2447) | 0,
      d = (a - (((2447 * l) / 80) | 0)) | 0;
    a = (l / 11) | 0;
    const f = (l + 2 - 12 * a) | 0,
      p = (100 * (u - 49) + c + a) | 0;
    let h = (s / tt.SECONDS_PER_HOUR) | 0,
      m = s - h * tt.SECONDS_PER_HOUR;
    const g = (m / tt.SECONDS_PER_MINUTE) | 0;
    m -= g * tt.SECONDS_PER_MINUTE;
    let y = 0 | m;
    const v = (m - y) / tt.SECONDS_PER_MILLISECOND;
    return (
      (h += 12),
      h > 23 && (h -= 24),
      n && (y += 1),
      r.defined(t)
        ? ((t.year = p),
          (t.month = f),
          (t.day = d),
          (t.hour = h),
          (t.minute = g),
          (t.second = y),
          (t.millisecond = v),
          (t.isLeapSecond = n),
          t)
        : new Xe(p, f, d, h, g, y, v, n)
    );
  }),
    (Ct.toDate = function (e) {
      const t = Ct.toGregorianDate(e, rt);
      let n = t.second;
      return (
        t.isLeapSecond && (n -= 1),
        new Date(
          Date.UTC(
            t.year,
            t.month - 1,
            t.day,
            t.hour,
            t.minute,
            n,
            t.millisecond
          )
        )
      );
    }),
    (Ct.toIso8601 = function (e, t) {
      const n = Ct.toGregorianDate(e, rt);
      let o = n.year,
        i = n.month,
        s = n.day,
        a = n.hour;
      const u = n.minute,
        c = n.second,
        l = n.millisecond;
      let d;
      return (
        1e4 === o &&
          1 === i &&
          1 === s &&
          0 === a &&
          0 === u &&
          0 === c &&
          0 === l &&
          ((o = 9999), (i = 12), (s = 31), (a = 24)),
        r.defined(t) || 0 === l
          ? r.defined(t) && 0 !== t
            ? ((d = (0.01 * l).toFixed(t).replace(".", "").slice(0, t)),
              o.toString().padStart(4, "0") +
                "-" +
                i.toString().padStart(2, "0") +
                "-" +
                s.toString().padStart(2, "0") +
                "T" +
                a.toString().padStart(2, "0") +
                ":" +
                u.toString().padStart(2, "0") +
                ":" +
                c.toString().padStart(2, "0") +
                "." +
                d +
                "Z")
            : o.toString().padStart(4, "0") +
              "-" +
              i.toString().padStart(2, "0") +
              "-" +
              s.toString().padStart(2, "0") +
              "T" +
              a.toString().padStart(2, "0") +
              ":" +
              u.toString().padStart(2, "0") +
              ":" +
              c.toString().padStart(2, "0") +
              "Z"
          : ((d = (0.01 * l).toString().replace(".", "")),
            o.toString().padStart(4, "0") +
              "-" +
              i.toString().padStart(2, "0") +
              "-" +
              s.toString().padStart(2, "0") +
              "T" +
              a.toString().padStart(2, "0") +
              ":" +
              u.toString().padStart(2, "0") +
              ":" +
              c.toString().padStart(2, "0") +
              "." +
              d +
              "Z")
      );
    }),
    (Ct.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t)
          ? ((t.dayNumber = e.dayNumber), (t.secondsOfDay = e.secondsOfDay), t)
          : new Ct(e.dayNumber, e.secondsOfDay, nt.TAI);
    }),
    (Ct.compare = function (e, t) {
      const n = e.dayNumber - t.dayNumber;
      return 0 !== n ? n : e.secondsOfDay - t.secondsOfDay;
    }),
    (Ct.equals = function (e, t) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          e.dayNumber === t.dayNumber &&
          e.secondsOfDay === t.secondsOfDay)
      );
    }),
    (Ct.equalsEpsilon = function (e, t, n) {
      return (
        (n = r.defaultValue(n, 0)),
        e === t ||
          (r.defined(e) &&
            r.defined(t) &&
            Math.abs(Ct.secondsDifference(e, t)) <= n)
      );
    }),
    (Ct.totalDays = function (e) {
      return e.dayNumber + e.secondsOfDay / tt.SECONDS_PER_DAY;
    }),
    (Ct.secondsDifference = function (e, t) {
      return (
        (e.dayNumber - t.dayNumber) * tt.SECONDS_PER_DAY +
        (e.secondsOfDay - t.secondsOfDay)
      );
    }),
    (Ct.daysDifference = function (e, t) {
      return (
        e.dayNumber -
        t.dayNumber +
        (e.secondsOfDay - t.secondsOfDay) / tt.SECONDS_PER_DAY
      );
    }),
    (Ct.computeTaiMinusUtc = function (e) {
      st.julianDate = e;
      const t = Ct.leapSeconds;
      let n = Je(t, st, it);
      return n < 0 && ((n = ~n), --n, n < 0 && (n = 0)), t[n].offset;
    }),
    (Ct.addSeconds = function (e, t, n) {
      return ct(e.dayNumber, e.secondsOfDay + t, n);
    }),
    (Ct.addMinutes = function (e, t, n) {
      const r = e.secondsOfDay + t * tt.SECONDS_PER_MINUTE;
      return ct(e.dayNumber, r, n);
    }),
    (Ct.addHours = function (e, t, n) {
      const r = e.secondsOfDay + t * tt.SECONDS_PER_HOUR;
      return ct(e.dayNumber, r, n);
    }),
    (Ct.addDays = function (e, t, n) {
      return ct(e.dayNumber + t, e.secondsOfDay, n);
    }),
    (Ct.lessThan = function (e, t) {
      return Ct.compare(e, t) < 0;
    }),
    (Ct.lessThanOrEquals = function (e, t) {
      return Ct.compare(e, t) <= 0;
    }),
    (Ct.greaterThan = function (e, t) {
      return Ct.compare(e, t) > 0;
    }),
    (Ct.greaterThanOrEquals = function (e, t) {
      return Ct.compare(e, t) >= 0;
    }),
    (Ct.prototype.clone = function (e) {
      return Ct.clone(this, e);
    }),
    (Ct.prototype.equals = function (e) {
      return Ct.equals(this, e);
    }),
    (Ct.prototype.equalsEpsilon = function (e, t) {
      return Ct.equalsEpsilon(this, e, t);
    }),
    (Ct.prototype.toString = function () {
      return Ct.toIso8601(this);
    }),
    (Ct.leapSeconds = [
      new et(new Ct(2441317, 43210, nt.TAI), 10),
      new et(new Ct(2441499, 43211, nt.TAI), 11),
      new et(new Ct(2441683, 43212, nt.TAI), 12),
      new et(new Ct(2442048, 43213, nt.TAI), 13),
      new et(new Ct(2442413, 43214, nt.TAI), 14),
      new et(new Ct(2442778, 43215, nt.TAI), 15),
      new et(new Ct(2443144, 43216, nt.TAI), 16),
      new et(new Ct(2443509, 43217, nt.TAI), 17),
      new et(new Ct(2443874, 43218, nt.TAI), 18),
      new et(new Ct(2444239, 43219, nt.TAI), 19),
      new et(new Ct(2444786, 43220, nt.TAI), 20),
      new et(new Ct(2445151, 43221, nt.TAI), 21),
      new et(new Ct(2445516, 43222, nt.TAI), 22),
      new et(new Ct(2446247, 43223, nt.TAI), 23),
      new et(new Ct(2447161, 43224, nt.TAI), 24),
      new et(new Ct(2447892, 43225, nt.TAI), 25),
      new et(new Ct(2448257, 43226, nt.TAI), 26),
      new et(new Ct(2448804, 43227, nt.TAI), 27),
      new et(new Ct(2449169, 43228, nt.TAI), 28),
      new et(new Ct(2449534, 43229, nt.TAI), 29),
      new et(new Ct(2450083, 43230, nt.TAI), 30),
      new et(new Ct(2450630, 43231, nt.TAI), 31),
      new et(new Ct(2451179, 43232, nt.TAI), 32),
      new et(new Ct(2453736, 43233, nt.TAI), 33),
      new et(new Ct(2454832, 43234, nt.TAI), 34),
      new et(new Ct(2456109, 43235, nt.TAI), 35),
      new et(new Ct(2457204, 43236, nt.TAI), 36),
      new et(new Ct(2457754, 43237, nt.TAI), 37),
    ]);
  var bt = r.createCommonjsModule(function (e, t) {
      !(function (n) {
        var o = t && !t.nodeType && t,
          i = e && !e.nodeType && e,
          s = "object" == typeof r.commonjsGlobal && r.commonjsGlobal;
        (s.global !== s && s.window !== s && s.self !== s) || (n = s);
        var a,
          u,
          c = 2147483647,
          l = 36,
          d = /^xn--/,
          f = /[^\x20-\x7E]/,
          p = /[\x2E\u3002\uFF0E\uFF61]/g,
          h = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input",
          },
          m = Math.floor,
          g = String.fromCharCode;
        function y(e) {
          throw new RangeError(h[e]);
        }
        function v(e, t) {
          for (var n = e.length, r = []; n--; ) r[n] = t(e[n]);
          return r;
        }
        function w(e, t) {
          var n = e.split("@"),
            r = "";
          return (
            n.length > 1 && ((r = n[0] + "@"), (e = n[1])),
            r + v((e = e.replace(p, ".")).split("."), t).join(".")
          );
        }
        function C(e) {
          for (var t, n, r = [], o = 0, i = e.length; o < i; )
            (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i
              ? 56320 == (64512 & (n = e.charCodeAt(o++)))
                ? r.push(((1023 & t) << 10) + (1023 & n) + 65536)
                : (r.push(t), o--)
              : r.push(t);
          return r;
        }
        function _(e) {
          return v(e, function (e) {
            var t = "";
            return (
              e > 65535 &&
                ((t += g((((e -= 65536) >>> 10) & 1023) | 55296)),
                (e = 56320 | (1023 & e))),
              (t += g(e))
            );
          }).join("");
        }
        function b(e, t) {
          return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
        }
        function x(e, t, n) {
          var r = 0;
          for (e = n ? m(e / 700) : e >> 1, e += m(e / t); e > 455; r += l)
            e = m(e / 35);
          return m(r + (36 * e) / (e + 38));
        }
        function S(e) {
          var t,
            n,
            r,
            o,
            i,
            s,
            a,
            u,
            d,
            f,
            p,
            h = [],
            g = e.length,
            v = 0,
            w = 128,
            C = 72;
          for ((n = e.lastIndexOf("-")) < 0 && (n = 0), r = 0; r < n; ++r)
            e.charCodeAt(r) >= 128 && y("not-basic"), h.push(e.charCodeAt(r));
          for (o = n > 0 ? n + 1 : 0; o < g; ) {
            for (
              i = v, s = 1, a = l;
              o >= g && y("invalid-input"),
                ((u =
                  (p = e.charCodeAt(o++)) - 48 < 10
                    ? p - 22
                    : p - 65 < 26
                    ? p - 65
                    : p - 97 < 26
                    ? p - 97
                    : l) >= l ||
                  u > m((c - v) / s)) &&
                  y("overflow"),
                (v += u * s),
                !(u < (d = a <= C ? 1 : a >= C + 26 ? 26 : a - C));
              a += l
            )
              s > m(c / (f = l - d)) && y("overflow"), (s *= f);
            (C = x(v - i, (t = h.length + 1), 0 == i)),
              m(v / t) > c - w && y("overflow"),
              (w += m(v / t)),
              (v %= t),
              h.splice(v++, 0, w);
          }
          return _(h);
        }
        function E(e) {
          var t,
            n,
            r,
            o,
            i,
            s,
            a,
            u,
            d,
            f,
            p,
            h,
            v,
            w,
            _,
            S = [];
          for (h = (e = C(e)).length, t = 128, n = 0, i = 72, s = 0; s < h; ++s)
            (p = e[s]) < 128 && S.push(g(p));
          for (r = o = S.length, o && S.push("-"); r < h; ) {
            for (a = c, s = 0; s < h; ++s) (p = e[s]) >= t && p < a && (a = p);
            for (
              a - t > m((c - n) / (v = r + 1)) && y("overflow"),
                n += (a - t) * v,
                t = a,
                s = 0;
              s < h;
              ++s
            )
              if (((p = e[s]) < t && ++n > c && y("overflow"), p == t)) {
                for (
                  u = n, d = l;
                  !(u < (f = d <= i ? 1 : d >= i + 26 ? 26 : d - i));
                  d += l
                )
                  (_ = u - f),
                    (w = l - f),
                    S.push(g(b(f + (_ % w), 0))),
                    (u = m(_ / w));
                S.push(g(b(u, 0))), (i = x(n, v, r == o)), (n = 0), ++r;
              }
            ++n, ++t;
          }
          return S.join("");
        }
        if (
          ((a = {
            version: "1.3.2",
            ucs2: { decode: C, encode: _ },
            decode: S,
            encode: E,
            toASCII: function (e) {
              return w(e, function (e) {
                return f.test(e) ? "xn--" + E(e) : e;
              });
            },
            toUnicode: function (e) {
              return w(e, function (e) {
                return d.test(e) ? S(e.slice(4).toLowerCase()) : e;
              });
            },
          }),
          o && i)
        )
          if (e.exports == o) i.exports = a;
          else for (u in a) a.hasOwnProperty(u) && (o[u] = a[u]);
        else n.punycode = a;
      })(r.commonjsGlobal);
    }),
    xt = r.createCommonjsModule(function (e) {
      /*!
       * URI.js - Mutating URLs
       * IPv6 Support
       *
       * Version: 1.19.7
       *
       * Author: Rodney Rehm
       * Web: http://medialize.github.io/URI.js/
       *
       * Licensed under
       *   MIT License http://www.opensource.org/licenses/mit-license
       *
       */ var t, n;
      (t = r.commonjsGlobal),
        (n = function (e) {
          var t = e && e.IPv6;
          return {
            best: function (e) {
              var t,
                n,
                r = e.toLowerCase().split(":"),
                o = r.length,
                i = 8;
              for (
                "" === r[0] && "" === r[1] && "" === r[2]
                  ? (r.shift(), r.shift())
                  : "" === r[0] && "" === r[1]
                  ? r.shift()
                  : "" === r[o - 1] && "" === r[o - 2] && r.pop(),
                  -1 !== r[(o = r.length) - 1].indexOf(".") && (i = 7),
                  t = 0;
                t < o && "" !== r[t];
                t++
              );
              if (t < i)
                for (r.splice(t, 1, "0000"); r.length < i; )
                  r.splice(t, 0, "0000");
              for (var s = 0; s < i; s++) {
                n = r[s].split("");
                for (var a = 0; a < 3 && "0" === n[0] && n.length > 1; a++)
                  n.splice(0, 1);
                r[s] = n.join("");
              }
              var u = -1,
                c = 0,
                l = 0,
                d = -1,
                f = !1;
              for (s = 0; s < i; s++)
                f
                  ? "0" === r[s]
                    ? (l += 1)
                    : ((f = !1), l > c && ((u = d), (c = l)))
                  : "0" === r[s] && ((f = !0), (d = s), (l = 1));
              l > c && ((u = d), (c = l)),
                c > 1 && r.splice(u, c, ""),
                (o = r.length);
              var p = "";
              for (
                "" === r[0] && (p = ":"), s = 0;
                s < o && ((p += r[s]), s !== o - 1);
                s++
              )
                p += ":";
              return "" === r[o - 1] && (p += ":"), p;
            },
            noConflict: function () {
              return e.IPv6 === this && (e.IPv6 = t), this;
            },
          };
        }),
        e.exports ? (e.exports = n()) : (t.IPv6 = n(t));
    }),
    St = r.createCommonjsModule(function (e) {
      /*!
       * URI.js - Mutating URLs
       * Second Level Domain (SLD) Support
       *
       * Version: 1.19.7
       *
       * Author: Rodney Rehm
       * Web: http://medialize.github.io/URI.js/
       *
       * Licensed under
       *   MIT License http://www.opensource.org/licenses/mit-license
       *
       */ var t, n;
      (t = r.commonjsGlobal),
        (n = function (e) {
          var t = e && e.SecondLevelDomains,
            n = {
              list: {
                ac: " com gov mil net org ",
                ae: " ac co gov mil name net org pro sch ",
                af: " com edu gov net org ",
                al: " com edu gov mil net org ",
                ao: " co ed gv it og pb ",
                ar: " com edu gob gov int mil net org tur ",
                at: " ac co gv or ",
                au: " asn com csiro edu gov id net org ",
                ba: " co com edu gov mil net org rs unbi unmo unsa untz unze ",
                bb: " biz co com edu gov info net org store tv ",
                bh: " biz cc com edu gov info net org ",
                bn: " com edu gov net org ",
                bo: " com edu gob gov int mil net org tv ",
                br: " adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ",
                bs: " com edu gov net org ",
                bz: " du et om ov rg ",
                ca: " ab bc mb nb nf nl ns nt nu on pe qc sk yk ",
                ck: " biz co edu gen gov info net org ",
                cn: " ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ",
                co: " com edu gov mil net nom org ",
                cr: " ac c co ed fi go or sa ",
                cy: " ac biz com ekloges gov ltd name net org parliament press pro tm ",
                do: " art com edu gob gov mil net org sld web ",
                dz: " art asso com edu gov net org pol ",
                ec: " com edu fin gov info med mil net org pro ",
                eg: " com edu eun gov mil name net org sci ",
                er: " com edu gov ind mil net org rochest w ",
                es: " com edu gob nom org ",
                et: " biz com edu gov info name net org ",
                fj: " ac biz com info mil name net org pro ",
                fk: " ac co gov net nom org ",
                fr: " asso com f gouv nom prd presse tm ",
                gg: " co net org ",
                gh: " com edu gov mil org ",
                gn: " ac com gov net org ",
                gr: " com edu gov mil net org ",
                gt: " com edu gob ind mil net org ",
                gu: " com edu gov net org ",
                hk: " com edu gov idv net org ",
                hu: " 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ",
                id: " ac co go mil net or sch web ",
                il: " ac co gov idf k12 muni net org ",
                in: " ac co edu ernet firm gen gov i ind mil net nic org res ",
                iq: " com edu gov i mil net org ",
                ir: " ac co dnssec gov i id net org sch ",
                it: " edu gov ",
                je: " co net org ",
                jo: " com edu gov mil name net org sch ",
                jp: " ac ad co ed go gr lg ne or ",
                ke: " ac co go info me mobi ne or sc ",
                kh: " com edu gov mil net org per ",
                ki: " biz com de edu gov info mob net org tel ",
                km: " asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",
                kn: " edu gov net org ",
                kr: " ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ",
                kw: " com edu gov net org ",
                ky: " com edu gov net org ",
                kz: " com edu gov mil net org ",
                lb: " com edu gov net org ",
                lk: " assn com edu gov grp hotel int ltd net ngo org sch soc web ",
                lr: " com edu gov net org ",
                lv: " asn com conf edu gov id mil net org ",
                ly: " com edu gov id med net org plc sch ",
                ma: " ac co gov m net org press ",
                mc: " asso tm ",
                me: " ac co edu gov its net org priv ",
                mg: " com edu gov mil nom org prd tm ",
                mk: " com edu gov inf name net org pro ",
                ml: " com edu gov net org presse ",
                mn: " edu gov org ",
                mo: " com edu gov net org ",
                mt: " com edu gov net org ",
                mv: " aero biz com coop edu gov info int mil museum name net org pro ",
                mw: " ac co com coop edu gov int museum net org ",
                mx: " com edu gob net org ",
                my: " com edu gov mil name net org sch ",
                nf: " arts com firm info net other per rec store web ",
                ng: " biz com edu gov mil mobi name net org sch ",
                ni: " ac co com edu gob mil net nom org ",
                np: " com edu gov mil net org ",
                nr: " biz com edu gov info net org ",
                om: " ac biz co com edu gov med mil museum net org pro sch ",
                pe: " com edu gob mil net nom org sld ",
                ph: " com edu gov i mil net ngo org ",
                pk: " biz com edu fam gob gok gon gop gos gov net org web ",
                pl: " art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ",
                pr: " ac biz com edu est gov info isla name net org pro prof ",
                ps: " com edu gov net org plo sec ",
                pw: " belau co ed go ne or ",
                ro: " arts com firm info nom nt org rec store tm www ",
                rs: " ac co edu gov in org ",
                sb: " com edu gov net org ",
                sc: " com edu gov net org ",
                sh: " co com edu gov net nom org ",
                sl: " com edu gov net org ",
                st: " co com consulado edu embaixada gov mil net org principe saotome store ",
                sv: " com edu gob org red ",
                sz: " ac co org ",
                tr: " av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ",
                tt: " aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",
                tw: " club com ebiz edu game gov idv mil net org ",
                mu: " ac co com gov net or org ",
                mz: " ac co edu gov org ",
                na: " co com ",
                nz: " ac co cri geek gen govt health iwi maori mil net org parliament school ",
                pa: " abo ac com edu gob ing med net nom org sld ",
                pt: " com edu gov int net nome org publ ",
                py: " com edu gov mil net org ",
                qa: " com edu gov mil net org ",
                re: " asso com nom ",
                ru: " ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
                rw: " ac co com edu gouv gov int mil net ",
                sa: " com edu gov med net org pub sch ",
                sd: " com edu gov info med net org tv ",
                se: " a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ",
                sg: " com edu gov idn net org per ",
                sn: " art com edu gouv org perso univ ",
                sy: " com edu gov mil net news org ",
                th: " ac co go in mi net or ",
                tj: " ac biz co com edu go gov info int mil name net nic org test web ",
                tn: " agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
                tz: " ac co go ne or ",
                ua: " biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ",
                ug: " ac co go ne or org sc ",
                uk: " ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
                us: " dni fed isa kids nsn ",
                uy: " com edu gub mil net org ",
                ve: " co com edu gob info mil net org web ",
                vi: " co com k12 net org ",
                vn: " ac biz com edu gov health info int name net org pro ",
                ye: " co com gov ltd me net org plc ",
                yu: " ac co edu gov org ",
                za: " ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ",
                zm: " ac co com edu gov net org sch ",
                com: "ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ",
                net: "gb jp se uk ",
                org: "ae",
                de: "com ",
              },
              has: function (e) {
                var t = e.lastIndexOf(".");
                if (t <= 0 || t >= e.length - 1) return !1;
                var r = e.lastIndexOf(".", t - 1);
                if (r <= 0 || r >= t - 1) return !1;
                var o = n.list[e.slice(t + 1)];
                return !!o && o.indexOf(" " + e.slice(r + 1, t) + " ") >= 0;
              },
              is: function (e) {
                var t = e.lastIndexOf(".");
                if (t <= 0 || t >= e.length - 1) return !1;
                if (e.lastIndexOf(".", t - 1) >= 0) return !1;
                var r = n.list[e.slice(t + 1)];
                return !!r && r.indexOf(" " + e.slice(0, t) + " ") >= 0;
              },
              get: function (e) {
                var t = e.lastIndexOf(".");
                if (t <= 0 || t >= e.length - 1) return null;
                var r = e.lastIndexOf(".", t - 1);
                if (r <= 0 || r >= t - 1) return null;
                var o = n.list[e.slice(t + 1)];
                return o
                  ? o.indexOf(" " + e.slice(r + 1, t) + " ") < 0
                    ? null
                    : e.slice(r + 1)
                  : null;
              },
              noConflict: function () {
                return (
                  e.SecondLevelDomains === this && (e.SecondLevelDomains = t),
                  this
                );
              },
            };
          return n;
        }),
        e.exports ? (e.exports = n()) : (t.SecondLevelDomains = n(t));
    }),
    Et = r.createCommonjsModule(function (e) {
      /*!
       * URI.js - Mutating URLs
       *
       * Version: 1.19.7
       *
       * Author: Rodney Rehm
       * Web: http://medialize.github.io/URI.js/
       *
       * Licensed under
       *   MIT License http://www.opensource.org/licenses/mit-license
       *
       */ var t, n;
      (t = r.commonjsGlobal),
        (n = function (e, t, n, r) {
          var o = r && r.URI;
          function i(e, t) {
            var n = arguments.length >= 1,
              r = arguments.length >= 2;
            if (!(this instanceof i))
              return n ? (r ? new i(e, t) : new i(e)) : new i();
            if (void 0 === e) {
              if (n)
                throw new TypeError(
                  "undefined is not a valid argument for URI"
                );
              e = "undefined" != typeof location ? location.href + "" : "";
            }
            if (null === e && n)
              throw new TypeError("null is not a valid argument for URI");
            return this.href(e), void 0 !== t ? this.absoluteTo(t) : this;
          }
          i.version = "1.19.7";
          var s = i.prototype,
            a = Object.prototype.hasOwnProperty;
          function u(e) {
            return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
          }
          function c(e) {
            return void 0 === e
              ? "Undefined"
              : String(Object.prototype.toString.call(e)).slice(8, -1);
          }
          function l(e) {
            return "Array" === c(e);
          }
          function d(e, t) {
            var n,
              r,
              o = {};
            if ("RegExp" === c(t)) o = null;
            else if (l(t)) for (n = 0, r = t.length; n < r; n++) o[t[n]] = !0;
            else o[t] = !0;
            for (n = 0, r = e.length; n < r; n++)
              ((o && void 0 !== o[e[n]]) || (!o && t.test(e[n]))) &&
                (e.splice(n, 1), r--, n--);
            return e;
          }
          function f(e, t) {
            var n, r;
            if (l(t)) {
              for (n = 0, r = t.length; n < r; n++) if (!f(e, t[n])) return !1;
              return !0;
            }
            var o = c(t);
            for (n = 0, r = e.length; n < r; n++)
              if ("RegExp" === o) {
                if ("string" == typeof e[n] && e[n].match(t)) return !0;
              } else if (e[n] === t) return !0;
            return !1;
          }
          function p(e, t) {
            if (!l(e) || !l(t)) return !1;
            if (e.length !== t.length) return !1;
            e.sort(), t.sort();
            for (var n = 0, r = e.length; n < r; n++)
              if (e[n] !== t[n]) return !1;
            return !0;
          }
          function h(e) {
            return e.replace(/^\/+|\/+$/g, "");
          }
          function m(e) {
            return escape(e);
          }
          function g(e) {
            return encodeURIComponent(e)
              .replace(/[!'()*]/g, m)
              .replace(/\*/g, "%2A");
          }
          (i._parts = function () {
            return {
              protocol: null,
              username: null,
              password: null,
              hostname: null,
              urn: null,
              port: null,
              path: null,
              query: null,
              fragment: null,
              preventInvalidHostname: i.preventInvalidHostname,
              duplicateQueryParameters: i.duplicateQueryParameters,
              escapeQuerySpace: i.escapeQuerySpace,
            };
          }),
            (i.preventInvalidHostname = !1),
            (i.duplicateQueryParameters = !1),
            (i.escapeQuerySpace = !0),
            (i.protocol_expression = /^[a-z][a-z0-9.+-]*$/i),
            (i.idn_expression = /[^a-z0-9\._-]/i),
            (i.punycode_expression = /(xn--)/i),
            (i.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/),
            (i.ip6_expression =
              /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/),
            (i.find_uri_expression =
              /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?Â«Â»â€œâ€â€˜â€™]))/gi),
            (i.findUri = {
              start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
              end: /[\s\r\n]|$/,
              trim: /[`!()\[\]{};:'".,<>?Â«Â»â€œâ€â€žâ€˜â€™]+$/,
              parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
            }),
            (i.defaultPorts = {
              http: "80",
              https: "443",
              ftp: "21",
              gopher: "70",
              ws: "80",
              wss: "443",
            }),
            (i.hostProtocols = ["http", "https"]),
            (i.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/),
            (i.domAttributes = {
              a: "href",
              blockquote: "cite",
              link: "href",
              base: "href",
              script: "src",
              form: "action",
              img: "src",
              area: "href",
              iframe: "src",
              embed: "src",
              source: "src",
              track: "src",
              input: "src",
              audio: "src",
              video: "src",
            }),
            (i.getDomAttribute = function (e) {
              if (e && e.nodeName) {
                var t = e.nodeName.toLowerCase();
                if ("input" !== t || "image" === e.type)
                  return i.domAttributes[t];
              }
            }),
            (i.encode = g),
            (i.decode = decodeURIComponent),
            (i.iso8859 = function () {
              (i.encode = escape), (i.decode = unescape);
            }),
            (i.unicode = function () {
              (i.encode = g), (i.decode = decodeURIComponent);
            }),
            (i.characters = {
              pathname: {
                encode: {
                  expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
                  map: {
                    "%24": "$",
                    "%26": "&",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "=",
                    "%3A": ":",
                    "%40": "@",
                  },
                },
                decode: {
                  expression: /[\/\?#]/g,
                  map: { "/": "%2F", "?": "%3F", "#": "%23" },
                },
              },
              reserved: {
                encode: {
                  expression:
                    /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
                  map: {
                    "%3A": ":",
                    "%2F": "/",
                    "%3F": "?",
                    "%23": "#",
                    "%5B": "[",
                    "%5D": "]",
                    "%40": "@",
                    "%21": "!",
                    "%24": "$",
                    "%26": "&",
                    "%27": "'",
                    "%28": "(",
                    "%29": ")",
                    "%2A": "*",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "=",
                  },
                },
              },
              urnpath: {
                encode: {
                  expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,
                  map: {
                    "%21": "!",
                    "%24": "$",
                    "%27": "'",
                    "%28": "(",
                    "%29": ")",
                    "%2A": "*",
                    "%2B": "+",
                    "%2C": ",",
                    "%3B": ";",
                    "%3D": "=",
                    "%40": "@",
                  },
                },
                decode: {
                  expression: /[\/\?#:]/g,
                  map: { "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" },
                },
              },
            }),
            (i.encodeQuery = function (e, t) {
              var n = i.encode(e + "");
              return (
                void 0 === t && (t = i.escapeQuerySpace),
                t ? n.replace(/%20/g, "+") : n
              );
            }),
            (i.decodeQuery = function (e, t) {
              (e += ""), void 0 === t && (t = i.escapeQuerySpace);
              try {
                return i.decode(t ? e.replace(/\+/g, "%20") : e);
              } catch (t) {
                return e;
              }
            });
          var y,
            v = { encode: "encode", decode: "decode" },
            w = function (e, t) {
              return function (n) {
                try {
                  return i[t](n + "").replace(
                    i.characters[e][t].expression,
                    function (n) {
                      return i.characters[e][t].map[n];
                    }
                  );
                } catch (e) {
                  return n;
                }
              };
            };
          for (y in v)
            (i[y + "PathSegment"] = w("pathname", v[y])),
              (i[y + "UrnPathSegment"] = w("urnpath", v[y]));
          var C = function (e, t, n) {
            return function (r) {
              var o;
              o = n
                ? function (e) {
                    return i[t](i[n](e));
                  }
                : i[t];
              for (var s = (r + "").split(e), a = 0, u = s.length; a < u; a++)
                s[a] = o(s[a]);
              return s.join(e);
            };
          };
          function _(e) {
            return function (t, n) {
              return void 0 === t
                ? this._parts[e] || ""
                : ((this._parts[e] = t || null), this.build(!n), this);
            };
          }
          function b(e, t) {
            return function (n, r) {
              return void 0 === n
                ? this._parts[e] || ""
                : (null !== n &&
                    (n += "").charAt(0) === t &&
                    (n = n.substring(1)),
                  (this._parts[e] = n),
                  this.build(!r),
                  this);
            };
          }
          (i.decodePath = C("/", "decodePathSegment")),
            (i.decodeUrnPath = C(":", "decodeUrnPathSegment")),
            (i.recodePath = C("/", "encodePathSegment", "decode")),
            (i.recodeUrnPath = C(":", "encodeUrnPathSegment", "decode")),
            (i.encodeReserved = w("reserved", "encode")),
            (i.parse = function (e, t) {
              var n;
              return (
                t || (t = { preventInvalidHostname: i.preventInvalidHostname }),
                (n = e.indexOf("#")) > -1 &&
                  ((t.fragment = e.substring(n + 1) || null),
                  (e = e.substring(0, n))),
                (n = e.indexOf("?")) > -1 &&
                  ((t.query = e.substring(n + 1) || null),
                  (e = e.substring(0, n))),
                "//" ===
                (e = e.replace(
                  /^(https?|ftp|wss?)?:[/\\]*/,
                  "$1://"
                )).substring(0, 2)
                  ? ((t.protocol = null),
                    (e = e.substring(2)),
                    (e = i.parseAuthority(e, t)))
                  : (n = e.indexOf(":")) > -1 &&
                    ((t.protocol = e.substring(0, n) || null),
                    t.protocol && !t.protocol.match(i.protocol_expression)
                      ? (t.protocol = void 0)
                      : "//" === e.substring(n + 1, n + 3).replace(/\\/g, "/")
                      ? ((e = e.substring(n + 3)), (e = i.parseAuthority(e, t)))
                      : ((e = e.substring(n + 1)), (t.urn = !0))),
                (t.path = e),
                t
              );
            }),
            (i.parseHost = function (e, t) {
              e || (e = "");
              var n,
                r,
                o = (e = e.replace(/\\/g, "/")).indexOf("/");
              if ((-1 === o && (o = e.length), "[" === e.charAt(0)))
                (n = e.indexOf("]")),
                  (t.hostname = e.substring(1, n) || null),
                  (t.port = e.substring(n + 2, o) || null),
                  "/" === t.port && (t.port = null);
              else {
                var s = e.indexOf(":"),
                  a = e.indexOf("/"),
                  u = e.indexOf(":", s + 1);
                -1 !== u && (-1 === a || u < a)
                  ? ((t.hostname = e.substring(0, o) || null), (t.port = null))
                  : ((r = e.substring(0, o).split(":")),
                    (t.hostname = r[0] || null),
                    (t.port = r[1] || null));
              }
              return (
                t.hostname &&
                  "/" !== e.substring(o).charAt(0) &&
                  (o++, (e = "/" + e)),
                t.preventInvalidHostname &&
                  i.ensureValidHostname(t.hostname, t.protocol),
                t.port && i.ensureValidPort(t.port),
                e.substring(o) || "/"
              );
            }),
            (i.parseAuthority = function (e, t) {
              return (e = i.parseUserinfo(e, t)), i.parseHost(e, t);
            }),
            (i.parseUserinfo = function (e, t) {
              var n = e;
              -1 !== e.indexOf("\\") && (e = e.replace(/\\/g, "/"));
              var r,
                o = e.indexOf("/"),
                s = e.lastIndexOf("@", o > -1 ? o : e.length - 1);
              return (
                s > -1 && (-1 === o || s < o)
                  ? ((r = e.substring(0, s).split(":")),
                    (t.username = r[0] ? i.decode(r[0]) : null),
                    r.shift(),
                    (t.password = r[0] ? i.decode(r.join(":")) : null),
                    (e = n.substring(s + 1)))
                  : ((t.username = null), (t.password = null)),
                e
              );
            }),
            (i.parseQuery = function (e, t) {
              if (!e) return {};
              if (!(e = e.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, "")))
                return {};
              for (
                var n, r, o, s = {}, u = e.split("&"), c = u.length, l = 0;
                l < c;
                l++
              )
                (n = u[l].split("=")),
                  (r = i.decodeQuery(n.shift(), t)),
                  (o = n.length ? i.decodeQuery(n.join("="), t) : null),
                  "__proto__" !== r &&
                    (a.call(s, r)
                      ? (("string" != typeof s[r] && null !== s[r]) ||
                          (s[r] = [s[r]]),
                        s[r].push(o))
                      : (s[r] = o));
              return s;
            }),
            (i.build = function (e) {
              var t = "",
                n = !1;
              return (
                e.protocol && (t += e.protocol + ":"),
                e.urn || (!t && !e.hostname) || ((t += "//"), (n = !0)),
                (t += i.buildAuthority(e) || ""),
                "string" == typeof e.path &&
                  ("/" !== e.path.charAt(0) && n && (t += "/"), (t += e.path)),
                "string" == typeof e.query && e.query && (t += "?" + e.query),
                "string" == typeof e.fragment &&
                  e.fragment &&
                  (t += "#" + e.fragment),
                t
              );
            }),
            (i.buildHost = function (e) {
              var t = "";
              return e.hostname
                ? (i.ip6_expression.test(e.hostname)
                    ? (t += "[" + e.hostname + "]")
                    : (t += e.hostname),
                  e.port && (t += ":" + e.port),
                  t)
                : "";
            }),
            (i.buildAuthority = function (e) {
              return i.buildUserinfo(e) + i.buildHost(e);
            }),
            (i.buildUserinfo = function (e) {
              var t = "";
              return (
                e.username && (t += i.encode(e.username)),
                e.password && (t += ":" + i.encode(e.password)),
                t && (t += "@"),
                t
              );
            }),
            (i.buildQuery = function (e, t, n) {
              var r,
                o,
                s,
                u,
                c = "";
              for (o in e)
                if ("__proto__" !== o && a.call(e, o))
                  if (l(e[o]))
                    for (r = {}, s = 0, u = e[o].length; s < u; s++)
                      void 0 !== e[o][s] &&
                        void 0 === r[e[o][s] + ""] &&
                        ((c += "&" + i.buildQueryParameter(o, e[o][s], n)),
                        !0 !== t && (r[e[o][s] + ""] = !0));
                  else
                    void 0 !== e[o] &&
                      (c += "&" + i.buildQueryParameter(o, e[o], n));
              return c.substring(1);
            }),
            (i.buildQueryParameter = function (e, t, n) {
              return (
                i.encodeQuery(e, n) +
                (null !== t ? "=" + i.encodeQuery(t, n) : "")
              );
            }),
            (i.addQuery = function (e, t, n) {
              if ("object" == typeof t)
                for (var r in t) a.call(t, r) && i.addQuery(e, r, t[r]);
              else {
                if ("string" != typeof t)
                  throw new TypeError(
                    "URI.addQuery() accepts an object, string as the name parameter"
                  );
                if (void 0 === e[t]) return void (e[t] = n);
                "string" == typeof e[t] && (e[t] = [e[t]]),
                  l(n) || (n = [n]),
                  (e[t] = (e[t] || []).concat(n));
              }
            }),
            (i.setQuery = function (e, t, n) {
              if ("object" == typeof t)
                for (var r in t) a.call(t, r) && i.setQuery(e, r, t[r]);
              else {
                if ("string" != typeof t)
                  throw new TypeError(
                    "URI.setQuery() accepts an object, string as the name parameter"
                  );
                e[t] = void 0 === n ? null : n;
              }
            }),
            (i.removeQuery = function (e, t, n) {
              var r, o, s;
              if (l(t)) for (r = 0, o = t.length; r < o; r++) e[t[r]] = void 0;
              else if ("RegExp" === c(t))
                for (s in e) t.test(s) && (e[s] = void 0);
              else if ("object" == typeof t)
                for (s in t) a.call(t, s) && i.removeQuery(e, s, t[s]);
              else {
                if ("string" != typeof t)
                  throw new TypeError(
                    "URI.removeQuery() accepts an object, string, RegExp as the first parameter"
                  );
                void 0 !== n
                  ? "RegExp" === c(n)
                    ? !l(e[t]) && n.test(e[t])
                      ? (e[t] = void 0)
                      : (e[t] = d(e[t], n))
                    : e[t] !== String(n) || (l(n) && 1 !== n.length)
                    ? l(e[t]) && (e[t] = d(e[t], n))
                    : (e[t] = void 0)
                  : (e[t] = void 0);
              }
            }),
            (i.hasQuery = function (e, t, n, r) {
              switch (c(t)) {
                case "String":
                  break;
                case "RegExp":
                  for (var o in e)
                    if (
                      a.call(e, o) &&
                      t.test(o) &&
                      (void 0 === n || i.hasQuery(e, o, n))
                    )
                      return !0;
                  return !1;
                case "Object":
                  for (var s in t)
                    if (a.call(t, s) && !i.hasQuery(e, s, t[s])) return !1;
                  return !0;
                default:
                  throw new TypeError(
                    "URI.hasQuery() accepts a string, regular expression or object as the name parameter"
                  );
              }
              switch (c(n)) {
                case "Undefined":
                  return t in e;
                case "Boolean":
                  return n === Boolean(l(e[t]) ? e[t].length : e[t]);
                case "Function":
                  return !!n(e[t], t, e);
                case "Array":
                  return !!l(e[t]) && (r ? f : p)(e[t], n);
                case "RegExp":
                  return l(e[t])
                    ? !!r && f(e[t], n)
                    : Boolean(e[t] && e[t].match(n));
                case "Number":
                  n = String(n);
                case "String":
                  return l(e[t]) ? !!r && f(e[t], n) : e[t] === n;
                default:
                  throw new TypeError(
                    "URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter"
                  );
              }
            }),
            (i.joinPaths = function () {
              for (
                var e = [], t = [], n = 0, r = 0;
                r < arguments.length;
                r++
              ) {
                var o = new i(arguments[r]);
                e.push(o);
                for (var s = o.segment(), a = 0; a < s.length; a++)
                  "string" == typeof s[a] && t.push(s[a]), s[a] && n++;
              }
              if (!t.length || !n) return new i("");
              var u = new i("").segment(t);
              return (
                ("" !== e[0].path() && "/" !== e[0].path().slice(0, 1)) ||
                  u.path("/" + u.path()),
                u.normalize()
              );
            }),
            (i.commonPath = function (e, t) {
              var n,
                r = Math.min(e.length, t.length);
              for (n = 0; n < r; n++)
                if (e.charAt(n) !== t.charAt(n)) {
                  n--;
                  break;
                }
              return n < 1
                ? e.charAt(0) === t.charAt(0) && "/" === e.charAt(0)
                  ? "/"
                  : ""
                : (("/" === e.charAt(n) && "/" === t.charAt(n)) ||
                    (n = e.substring(0, n).lastIndexOf("/")),
                  e.substring(0, n + 1));
            }),
            (i.withinString = function (e, t, n) {
              n || (n = {});
              var r = n.start || i.findUri.start,
                o = n.end || i.findUri.end,
                s = n.trim || i.findUri.trim,
                a = n.parens || i.findUri.parens,
                u = /[a-z0-9-]=["']?$/i;
              for (r.lastIndex = 0; ; ) {
                var c = r.exec(e);
                if (!c) break;
                var l = c.index;
                if (n.ignoreHtml) {
                  var d = e.slice(Math.max(l - 3, 0), l);
                  if (d && u.test(d)) continue;
                }
                for (
                  var f = l + e.slice(l).search(o), p = e.slice(l, f), h = -1;
                  ;

                ) {
                  var m = a.exec(p);
                  if (!m) break;
                  var g = m.index + m[0].length;
                  h = Math.max(h, g);
                }
                if (
                  !(
                    (p =
                      h > -1
                        ? p.slice(0, h) + p.slice(h).replace(s, "")
                        : p.replace(s, "")).length <= c[0].length ||
                    (n.ignore && n.ignore.test(p))
                  )
                ) {
                  var y = t(p, l, (f = l + p.length), e);
                  void 0 !== y
                    ? ((y = String(y)),
                      (e = e.slice(0, l) + y + e.slice(f)),
                      (r.lastIndex = l + y.length))
                    : (r.lastIndex = f);
                }
              }
              return (r.lastIndex = 0), e;
            }),
            (i.ensureValidHostname = function (t, n) {
              var r = !!t,
                o = !1;
              if ((!!n && (o = f(i.hostProtocols, n)), o && !r))
                throw new TypeError(
                  "Hostname cannot be empty, if protocol is " + n
                );
              if (t && t.match(i.invalid_hostname_characters)) {
                if (!e)
                  throw new TypeError(
                    'Hostname "' +
                      t +
                      '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available'
                  );
                if (e.toASCII(t).match(i.invalid_hostname_characters))
                  throw new TypeError(
                    'Hostname "' +
                      t +
                      '" contains characters other than [A-Z0-9.-:_]'
                  );
              }
            }),
            (i.ensureValidPort = function (e) {
              if (e) {
                var t = Number(e);
                if (!(/^[0-9]+$/.test(t) && t > 0 && t < 65536))
                  throw new TypeError('Port "' + e + '" is not a valid port');
              }
            }),
            (i.noConflict = function (e) {
              if (e) {
                var t = { URI: this.noConflict() };
                return (
                  r.URITemplate &&
                    "function" == typeof r.URITemplate.noConflict &&
                    (t.URITemplate = r.URITemplate.noConflict()),
                  r.IPv6 &&
                    "function" == typeof r.IPv6.noConflict &&
                    (t.IPv6 = r.IPv6.noConflict()),
                  r.SecondLevelDomains &&
                    "function" == typeof r.SecondLevelDomains.noConflict &&
                    (t.SecondLevelDomains = r.SecondLevelDomains.noConflict()),
                  t
                );
              }
              return r.URI === this && (r.URI = o), this;
            }),
            (s.build = function (e) {
              return (
                !0 === e
                  ? (this._deferred_build = !0)
                  : (void 0 === e || this._deferred_build) &&
                    ((this._string = i.build(this._parts)),
                    (this._deferred_build = !1)),
                this
              );
            }),
            (s.clone = function () {
              return new i(this);
            }),
            (s.valueOf = s.toString =
              function () {
                return this.build(!1)._string;
              }),
            (s.protocol = _("protocol")),
            (s.username = _("username")),
            (s.password = _("password")),
            (s.hostname = _("hostname")),
            (s.port = _("port")),
            (s.query = b("query", "?")),
            (s.fragment = b("fragment", "#")),
            (s.search = function (e, t) {
              var n = this.query(e, t);
              return "string" == typeof n && n.length ? "?" + n : n;
            }),
            (s.hash = function (e, t) {
              var n = this.fragment(e, t);
              return "string" == typeof n && n.length ? "#" + n : n;
            }),
            (s.pathname = function (e, t) {
              if (void 0 === e || !0 === e) {
                var n = this._parts.path || (this._parts.hostname ? "/" : "");
                return e
                  ? (this._parts.urn ? i.decodeUrnPath : i.decodePath)(n)
                  : n;
              }
              return (
                this._parts.urn
                  ? (this._parts.path = e ? i.recodeUrnPath(e) : "")
                  : (this._parts.path = e ? i.recodePath(e) : "/"),
                this.build(!t),
                this
              );
            }),
            (s.path = s.pathname),
            (s.href = function (e, t) {
              var n;
              if (void 0 === e) return this.toString();
              (this._string = ""), (this._parts = i._parts());
              var r = e instanceof i,
                o =
                  "object" == typeof e && (e.hostname || e.path || e.pathname);
              if (
                (e.nodeName && ((e = e[i.getDomAttribute(e)] || ""), (o = !1)),
                !r && o && void 0 !== e.pathname && (e = e.toString()),
                "string" == typeof e || e instanceof String)
              )
                this._parts = i.parse(String(e), this._parts);
              else {
                if (!r && !o) throw new TypeError("invalid input");
                var s = r ? e._parts : e;
                for (n in s)
                  "query" !== n &&
                    a.call(this._parts, n) &&
                    (this._parts[n] = s[n]);
                s.query && this.query(s.query, !1);
              }
              return this.build(!t), this;
            }),
            (s.is = function (e) {
              var t = !1,
                r = !1,
                o = !1,
                s = !1,
                a = !1,
                u = !1,
                c = !1,
                l = !this._parts.urn;
              switch (
                (this._parts.hostname &&
                  ((l = !1),
                  (r = i.ip4_expression.test(this._parts.hostname)),
                  (o = i.ip6_expression.test(this._parts.hostname)),
                  (a = (s = !(t = r || o)) && n && n.has(this._parts.hostname)),
                  (u = s && i.idn_expression.test(this._parts.hostname)),
                  (c = s && i.punycode_expression.test(this._parts.hostname))),
                e.toLowerCase())
              ) {
                case "relative":
                  return l;
                case "absolute":
                  return !l;
                case "domain":
                case "name":
                  return s;
                case "sld":
                  return a;
                case "ip":
                  return t;
                case "ip4":
                case "ipv4":
                case "inet4":
                  return r;
                case "ip6":
                case "ipv6":
                case "inet6":
                  return o;
                case "idn":
                  return u;
                case "url":
                  return !this._parts.urn;
                case "urn":
                  return !!this._parts.urn;
                case "punycode":
                  return c;
              }
              return null;
            });
          var x = s.protocol,
            S = s.port,
            E = s.hostname;
          (s.protocol = function (e, t) {
            if (
              e &&
              !(e = e.replace(/:(\/\/)?$/, "")).match(i.protocol_expression)
            )
              throw new TypeError(
                'Protocol "' +
                  e +
                  "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]"
              );
            return x.call(this, e, t);
          }),
            (s.scheme = s.protocol),
            (s.port = function (e, t) {
              return this._parts.urn
                ? void 0 === e
                  ? ""
                  : this
                : (void 0 !== e &&
                    (0 === e && (e = null),
                    e &&
                      (":" === (e += "").charAt(0) && (e = e.substring(1)),
                      i.ensureValidPort(e))),
                  S.call(this, e, t));
            }),
            (s.hostname = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 !== e) {
                var n = {
                  preventInvalidHostname: this._parts.preventInvalidHostname,
                };
                if ("/" !== i.parseHost(e, n))
                  throw new TypeError(
                    'Hostname "' +
                      e +
                      '" contains characters other than [A-Z0-9.-]'
                  );
                (e = n.hostname),
                  this._parts.preventInvalidHostname &&
                    i.ensureValidHostname(e, this._parts.protocol);
              }
              return E.call(this, e, t);
            }),
            (s.origin = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e) {
                var n = this.protocol();
                return this.authority()
                  ? (n ? n + "://" : "") + this.authority()
                  : "";
              }
              var r = i(e);
              return (
                this.protocol(r.protocol()).authority(r.authority()).build(!t),
                this
              );
            }),
            (s.host = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e)
                return this._parts.hostname ? i.buildHost(this._parts) : "";
              if ("/" !== i.parseHost(e, this._parts))
                throw new TypeError(
                  'Hostname "' +
                    e +
                    '" contains characters other than [A-Z0-9.-]'
                );
              return this.build(!t), this;
            }),
            (s.authority = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e)
                return this._parts.hostname
                  ? i.buildAuthority(this._parts)
                  : "";
              if ("/" !== i.parseAuthority(e, this._parts))
                throw new TypeError(
                  'Hostname "' +
                    e +
                    '" contains characters other than [A-Z0-9.-]'
                );
              return this.build(!t), this;
            }),
            (s.userinfo = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e) {
                var n = i.buildUserinfo(this._parts);
                return n ? n.substring(0, n.length - 1) : n;
              }
              return (
                "@" !== e[e.length - 1] && (e += "@"),
                i.parseUserinfo(e, this._parts),
                this.build(!t),
                this
              );
            }),
            (s.resource = function (e, t) {
              var n;
              return void 0 === e
                ? this.path() + this.search() + this.hash()
                : ((n = i.parse(e)),
                  (this._parts.path = n.path),
                  (this._parts.query = n.query),
                  (this._parts.fragment = n.fragment),
                  this.build(!t),
                  this);
            }),
            (s.subdomain = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var n = this._parts.hostname.length - this.domain().length - 1;
                return this._parts.hostname.substring(0, n) || "";
              }
              var r = this._parts.hostname.length - this.domain().length,
                o = this._parts.hostname.substring(0, r),
                s = new RegExp("^" + u(o));
              if (
                (e && "." !== e.charAt(e.length - 1) && (e += "."),
                -1 !== e.indexOf(":"))
              )
                throw new TypeError("Domains cannot contain colons");
              return (
                e && i.ensureValidHostname(e, this._parts.protocol),
                (this._parts.hostname = this._parts.hostname.replace(s, e)),
                this.build(!t),
                this
              );
            }),
            (s.domain = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (
                ("boolean" == typeof e && ((t = e), (e = void 0)), void 0 === e)
              ) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var n = this._parts.hostname.match(/\./g);
                if (n && n.length < 2) return this._parts.hostname;
                var r = this._parts.hostname.length - this.tld(t).length - 1;
                return (
                  (r = this._parts.hostname.lastIndexOf(".", r - 1) + 1),
                  this._parts.hostname.substring(r) || ""
                );
              }
              if (!e) throw new TypeError("cannot set domain empty");
              if (-1 !== e.indexOf(":"))
                throw new TypeError("Domains cannot contain colons");
              if (
                (i.ensureValidHostname(e, this._parts.protocol),
                !this._parts.hostname || this.is("IP"))
              )
                this._parts.hostname = e;
              else {
                var o = new RegExp(u(this.domain()) + "$");
                this._parts.hostname = this._parts.hostname.replace(o, e);
              }
              return this.build(!t), this;
            }),
            (s.tld = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (
                ("boolean" == typeof e && ((t = e), (e = void 0)), void 0 === e)
              ) {
                if (!this._parts.hostname || this.is("IP")) return "";
                var r = this._parts.hostname.lastIndexOf("."),
                  o = this._parts.hostname.substring(r + 1);
                return (
                  (!0 !== t &&
                    n &&
                    n.list[o.toLowerCase()] &&
                    n.get(this._parts.hostname)) ||
                  o
                );
              }
              var i;
              if (!e) throw new TypeError("cannot set TLD empty");
              if (e.match(/[^a-zA-Z0-9-]/)) {
                if (!n || !n.is(e))
                  throw new TypeError(
                    'TLD "' + e + '" contains characters other than [A-Z0-9]'
                  );
                (i = new RegExp(u(this.tld()) + "$")),
                  (this._parts.hostname = this._parts.hostname.replace(i, e));
              } else {
                if (!this._parts.hostname || this.is("IP"))
                  throw new ReferenceError("cannot set TLD on non-domain host");
                (i = new RegExp(u(this.tld()) + "$")),
                  (this._parts.hostname = this._parts.hostname.replace(i, e));
              }
              return this.build(!t), this;
            }),
            (s.directory = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e || !0 === e) {
                if (!this._parts.path && !this._parts.hostname) return "";
                if ("/" === this._parts.path) return "/";
                var n = this._parts.path.length - this.filename().length - 1,
                  r =
                    this._parts.path.substring(0, n) ||
                    (this._parts.hostname ? "/" : "");
                return e ? i.decodePath(r) : r;
              }
              var o = this._parts.path.length - this.filename().length,
                s = this._parts.path.substring(0, o),
                a = new RegExp("^" + u(s));
              return (
                this.is("relative") ||
                  (e || (e = "/"), "/" !== e.charAt(0) && (e = "/" + e)),
                e && "/" !== e.charAt(e.length - 1) && (e += "/"),
                (e = i.recodePath(e)),
                (this._parts.path = this._parts.path.replace(a, e)),
                this.build(!t),
                this
              );
            }),
            (s.filename = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if ("string" != typeof e) {
                if (!this._parts.path || "/" === this._parts.path) return "";
                var n = this._parts.path.lastIndexOf("/"),
                  r = this._parts.path.substring(n + 1);
                return e ? i.decodePathSegment(r) : r;
              }
              var o = !1;
              "/" === e.charAt(0) && (e = e.substring(1)),
                e.match(/\.?\//) && (o = !0);
              var s = new RegExp(u(this.filename()) + "$");
              return (
                (e = i.recodePath(e)),
                (this._parts.path = this._parts.path.replace(s, e)),
                o ? this.normalizePath(t) : this.build(!t),
                this
              );
            }),
            (s.suffix = function (e, t) {
              if (this._parts.urn) return void 0 === e ? "" : this;
              if (void 0 === e || !0 === e) {
                if (!this._parts.path || "/" === this._parts.path) return "";
                var n,
                  r,
                  o = this.filename(),
                  s = o.lastIndexOf(".");
                return -1 === s
                  ? ""
                  : ((n = o.substring(s + 1)),
                    (r = /^[a-z0-9%]+$/i.test(n) ? n : ""),
                    e ? i.decodePathSegment(r) : r);
              }
              "." === e.charAt(0) && (e = e.substring(1));
              var a,
                c = this.suffix();
              if (c)
                a = e ? new RegExp(u(c) + "$") : new RegExp(u("." + c) + "$");
              else {
                if (!e) return this;
                this._parts.path += "." + i.recodePath(e);
              }
              return (
                a &&
                  ((e = i.recodePath(e)),
                  (this._parts.path = this._parts.path.replace(a, e))),
                this.build(!t),
                this
              );
            }),
            (s.segment = function (e, t, n) {
              var r = this._parts.urn ? ":" : "/",
                o = this.path(),
                i = "/" === o.substring(0, 1),
                s = o.split(r);
              if (
                (void 0 !== e &&
                  "number" != typeof e &&
                  ((n = t), (t = e), (e = void 0)),
                void 0 !== e && "number" != typeof e)
              )
                throw new Error(
                  'Bad segment "' + e + '", must be 0-based integer'
                );
              if (
                (i && s.shift(),
                e < 0 && (e = Math.max(s.length + e, 0)),
                void 0 === t)
              )
                return void 0 === e ? s : s[e];
              if (null === e || void 0 === s[e])
                if (l(t)) {
                  s = [];
                  for (var a = 0, u = t.length; a < u; a++)
                    (t[a].length || (s.length && s[s.length - 1].length)) &&
                      (s.length && !s[s.length - 1].length && s.pop(),
                      s.push(h(t[a])));
                } else
                  (t || "string" == typeof t) &&
                    ((t = h(t)),
                    "" === s[s.length - 1] ? (s[s.length - 1] = t) : s.push(t));
              else t ? (s[e] = h(t)) : s.splice(e, 1);
              return i && s.unshift(""), this.path(s.join(r), n);
            }),
            (s.segmentCoded = function (e, t, n) {
              var r, o, s;
              if (
                ("number" != typeof e && ((n = t), (t = e), (e = void 0)),
                void 0 === t)
              ) {
                if (l((r = this.segment(e, t, n))))
                  for (o = 0, s = r.length; o < s; o++) r[o] = i.decode(r[o]);
                else r = void 0 !== r ? i.decode(r) : void 0;
                return r;
              }
              if (l(t))
                for (o = 0, s = t.length; o < s; o++) t[o] = i.encode(t[o]);
              else
                t =
                  "string" == typeof t || t instanceof String ? i.encode(t) : t;
              return this.segment(e, t, n);
            });
          var A = s.query;
          return (
            (s.query = function (e, t) {
              if (!0 === e)
                return i.parseQuery(
                  this._parts.query,
                  this._parts.escapeQuerySpace
                );
              if ("function" == typeof e) {
                var n = i.parseQuery(
                    this._parts.query,
                    this._parts.escapeQuerySpace
                  ),
                  r = e.call(this, n);
                return (
                  (this._parts.query = i.buildQuery(
                    r || n,
                    this._parts.duplicateQueryParameters,
                    this._parts.escapeQuerySpace
                  )),
                  this.build(!t),
                  this
                );
              }
              return void 0 !== e && "string" != typeof e
                ? ((this._parts.query = i.buildQuery(
                    e,
                    this._parts.duplicateQueryParameters,
                    this._parts.escapeQuerySpace
                  )),
                  this.build(!t),
                  this)
                : A.call(this, e, t);
            }),
            (s.setQuery = function (e, t, n) {
              var r = i.parseQuery(
                this._parts.query,
                this._parts.escapeQuerySpace
              );
              if ("string" == typeof e || e instanceof String)
                r[e] = void 0 !== t ? t : null;
              else {
                if ("object" != typeof e)
                  throw new TypeError(
                    "URI.addQuery() accepts an object, string as the name parameter"
                  );
                for (var o in e) a.call(e, o) && (r[o] = e[o]);
              }
              return (
                (this._parts.query = i.buildQuery(
                  r,
                  this._parts.duplicateQueryParameters,
                  this._parts.escapeQuerySpace
                )),
                "string" != typeof e && (n = t),
                this.build(!n),
                this
              );
            }),
            (s.addQuery = function (e, t, n) {
              var r = i.parseQuery(
                this._parts.query,
                this._parts.escapeQuerySpace
              );
              return (
                i.addQuery(r, e, void 0 === t ? null : t),
                (this._parts.query = i.buildQuery(
                  r,
                  this._parts.duplicateQueryParameters,
                  this._parts.escapeQuerySpace
                )),
                "string" != typeof e && (n = t),
                this.build(!n),
                this
              );
            }),
            (s.removeQuery = function (e, t, n) {
              var r = i.parseQuery(
                this._parts.query,
                this._parts.escapeQuerySpace
              );
              return (
                i.removeQuery(r, e, t),
                (this._parts.query = i.buildQuery(
                  r,
                  this._parts.duplicateQueryParameters,
                  this._parts.escapeQuerySpace
                )),
                "string" != typeof e && (n = t),
                this.build(!n),
                this
              );
            }),
            (s.hasQuery = function (e, t, n) {
              var r = i.parseQuery(
                this._parts.query,
                this._parts.escapeQuerySpace
              );
              return i.hasQuery(r, e, t, n);
            }),
            (s.setSearch = s.setQuery),
            (s.addSearch = s.addQuery),
            (s.removeSearch = s.removeQuery),
            (s.hasSearch = s.hasQuery),
            (s.normalize = function () {
              return this._parts.urn
                ? this.normalizeProtocol(!1)
                    .normalizePath(!1)
                    .normalizeQuery(!1)
                    .normalizeFragment(!1)
                    .build()
                : this.normalizeProtocol(!1)
                    .normalizeHostname(!1)
                    .normalizePort(!1)
                    .normalizePath(!1)
                    .normalizeQuery(!1)
                    .normalizeFragment(!1)
                    .build();
            }),
            (s.normalizeProtocol = function (e) {
              return (
                "string" == typeof this._parts.protocol &&
                  ((this._parts.protocol = this._parts.protocol.toLowerCase()),
                  this.build(!e)),
                this
              );
            }),
            (s.normalizeHostname = function (n) {
              return (
                this._parts.hostname &&
                  (this.is("IDN") && e
                    ? (this._parts.hostname = e.toASCII(this._parts.hostname))
                    : this.is("IPv6") &&
                      t &&
                      (this._parts.hostname = t.best(this._parts.hostname)),
                  (this._parts.hostname = this._parts.hostname.toLowerCase()),
                  this.build(!n)),
                this
              );
            }),
            (s.normalizePort = function (e) {
              return (
                "string" == typeof this._parts.protocol &&
                  this._parts.port === i.defaultPorts[this._parts.protocol] &&
                  ((this._parts.port = null), this.build(!e)),
                this
              );
            }),
            (s.normalizePath = function (e) {
              var t,
                n = this._parts.path;
              if (!n) return this;
              if (this._parts.urn)
                return (
                  (this._parts.path = i.recodeUrnPath(this._parts.path)),
                  this.build(!e),
                  this
                );
              if ("/" === this._parts.path) return this;
              var r,
                o,
                s = "";
              for (
                "/" !== (n = i.recodePath(n)).charAt(0) &&
                  ((t = !0), (n = "/" + n)),
                  ("/.." !== n.slice(-3) && "/." !== n.slice(-2)) || (n += "/"),
                  n = n
                    .replace(/(\/(\.\/)+)|(\/\.$)/g, "/")
                    .replace(/\/{2,}/g, "/"),
                  t &&
                    (s = n.substring(1).match(/^(\.\.\/)+/) || "") &&
                    (s = s[0]);
                -1 !== (r = n.search(/\/\.\.(\/|$)/));

              )
                0 !== r
                  ? (-1 === (o = n.substring(0, r).lastIndexOf("/")) && (o = r),
                    (n = n.substring(0, o) + n.substring(r + 3)))
                  : (n = n.substring(3));
              return (
                t && this.is("relative") && (n = s + n.substring(1)),
                (this._parts.path = n),
                this.build(!e),
                this
              );
            }),
            (s.normalizePathname = s.normalizePath),
            (s.normalizeQuery = function (e) {
              return (
                "string" == typeof this._parts.query &&
                  (this._parts.query.length
                    ? this.query(
                        i.parseQuery(
                          this._parts.query,
                          this._parts.escapeQuerySpace
                        )
                      )
                    : (this._parts.query = null),
                  this.build(!e)),
                this
              );
            }),
            (s.normalizeFragment = function (e) {
              return (
                this._parts.fragment ||
                  ((this._parts.fragment = null), this.build(!e)),
                this
              );
            }),
            (s.normalizeSearch = s.normalizeQuery),
            (s.normalizeHash = s.normalizeFragment),
            (s.iso8859 = function () {
              var e = i.encode,
                t = i.decode;
              (i.encode = escape), (i.decode = decodeURIComponent);
              try {
                this.normalize();
              } finally {
                (i.encode = e), (i.decode = t);
              }
              return this;
            }),
            (s.unicode = function () {
              var e = i.encode,
                t = i.decode;
              (i.encode = g), (i.decode = unescape);
              try {
                this.normalize();
              } finally {
                (i.encode = e), (i.decode = t);
              }
              return this;
            }),
            (s.readable = function () {
              var t = this.clone();
              t.username("").password("").normalize();
              var n = "";
              if (
                (t._parts.protocol && (n += t._parts.protocol + "://"),
                t._parts.hostname &&
                  (t.is("punycode") && e
                    ? ((n += e.toUnicode(t._parts.hostname)),
                      t._parts.port && (n += ":" + t._parts.port))
                    : (n += t.host())),
                t._parts.hostname &&
                  t._parts.path &&
                  "/" !== t._parts.path.charAt(0) &&
                  (n += "/"),
                (n += t.path(!0)),
                t._parts.query)
              ) {
                for (
                  var r = "",
                    o = 0,
                    s = t._parts.query.split("&"),
                    a = s.length;
                  o < a;
                  o++
                ) {
                  var u = (s[o] || "").split("=");
                  (r +=
                    "&" +
                    i
                      .decodeQuery(u[0], this._parts.escapeQuerySpace)
                      .replace(/&/g, "%26")),
                    void 0 !== u[1] &&
                      (r +=
                        "=" +
                        i
                          .decodeQuery(u[1], this._parts.escapeQuerySpace)
                          .replace(/&/g, "%26"));
                }
                n += "?" + r.substring(1);
              }
              return (n += i.decodeQuery(t.hash(), !0));
            }),
            (s.absoluteTo = function (e) {
              var t,
                n,
                r,
                o = this.clone(),
                s = ["protocol", "username", "password", "hostname", "port"];
              if (this._parts.urn)
                throw new Error(
                  "URNs do not have any generally defined hierarchical components"
                );
              if ((e instanceof i || (e = new i(e)), o._parts.protocol))
                return o;
              if (
                ((o._parts.protocol = e._parts.protocol), this._parts.hostname)
              )
                return o;
              for (n = 0; (r = s[n]); n++) o._parts[r] = e._parts[r];
              return (
                o._parts.path
                  ? (".." === o._parts.path.substring(-2) &&
                      (o._parts.path += "/"),
                    "/" !== o.path().charAt(0) &&
                      ((t =
                        (t = e.directory()) ||
                        (0 === e.path().indexOf("/") ? "/" : "")),
                      (o._parts.path = (t ? t + "/" : "") + o._parts.path),
                      o.normalizePath()))
                  : ((o._parts.path = e._parts.path),
                    o._parts.query || (o._parts.query = e._parts.query)),
                o.build(),
                o
              );
            }),
            (s.relativeTo = function (e) {
              var t,
                n,
                r,
                o,
                s,
                a = this.clone().normalize();
              if (a._parts.urn)
                throw new Error(
                  "URNs do not have any generally defined hierarchical components"
                );
              if (
                ((e = new i(e).normalize()),
                (t = a._parts),
                (n = e._parts),
                (o = a.path()),
                (s = e.path()),
                "/" !== o.charAt(0))
              )
                throw new Error("URI is already relative");
              if ("/" !== s.charAt(0))
                throw new Error(
                  "Cannot calculate a URI relative to another relative URI"
                );
              if (
                (t.protocol === n.protocol && (t.protocol = null),
                t.username !== n.username || t.password !== n.password)
              )
                return a.build();
              if (
                null !== t.protocol ||
                null !== t.username ||
                null !== t.password
              )
                return a.build();
              if (t.hostname !== n.hostname || t.port !== n.port)
                return a.build();
              if (((t.hostname = null), (t.port = null), o === s))
                return (t.path = ""), a.build();
              if (!(r = i.commonPath(o, s))) return a.build();
              var u = n.path
                .substring(r.length)
                .replace(/[^\/]*$/, "")
                .replace(/.*?\//g, "../");
              return (
                (t.path = u + t.path.substring(r.length) || "./"), a.build()
              );
            }),
            (s.equals = function (e) {
              var t,
                n,
                r,
                o,
                s,
                u = this.clone(),
                c = new i(e),
                d = {};
              if ((u.normalize(), c.normalize(), u.toString() === c.toString()))
                return !0;
              if (
                ((r = u.query()),
                (o = c.query()),
                u.query(""),
                c.query(""),
                u.toString() !== c.toString())
              )
                return !1;
              if (r.length !== o.length) return !1;
              for (s in ((t = i.parseQuery(r, this._parts.escapeQuerySpace)),
              (n = i.parseQuery(o, this._parts.escapeQuerySpace)),
              t))
                if (a.call(t, s)) {
                  if (l(t[s])) {
                    if (!p(t[s], n[s])) return !1;
                  } else if (t[s] !== n[s]) return !1;
                  d[s] = !0;
                }
              for (s in n) if (a.call(n, s) && !d[s]) return !1;
              return !0;
            }),
            (s.preventInvalidHostname = function (e) {
              return (this._parts.preventInvalidHostname = !!e), this;
            }),
            (s.duplicateQueryParameters = function (e) {
              return (this._parts.duplicateQueryParameters = !!e), this;
            }),
            (s.escapeQuerySpace = function (e) {
              return (this._parts.escapeQuerySpace = !!e), this;
            }),
            i
          );
        }),
        e.exports
          ? (e.exports = n(bt, xt, St))
          : (t.URI = n(t.punycode, t.IPv6, t.SecondLevelDomains, t));
    });
  function At(e, t) {
    if (null === e || "object" != typeof e) return e;
    t = r.defaultValue(t, !1);
    const n = new e.constructor();
    for (const r in e)
      if (e.hasOwnProperty(r)) {
        let o = e[r];
        t && (o = At(o, t)), (n[r] = o);
      }
    return n;
  }
  function Ot(e, t) {
    let n;
    return (
      "undefined" != typeof document && (n = document),
      Ot._implementation(e, t, n)
    );
  }
  Ot._implementation = function (e, t, n) {
    if (!r.defined(t)) {
      if (void 0 === n) return e;
      t = r.defaultValue(n.baseURI, n.location.href);
    }
    const o = new Et(e);
    return "" !== o.scheme() ? o.toString() : o.absoluteTo(t).toString();
  };
  const It = /^blob:/i;
  function Rt(e) {
    return It.test(e);
  }
  let Pt;
  const Tt = /^data:/i;
  function qt(e) {
    return Tt.test(e);
  }
  var zt = Object.freeze({
    UNISSUED: 0,
    ISSUED: 1,
    ACTIVE: 2,
    RECEIVED: 3,
    CANCELLED: 4,
    FAILED: 5,
  });
  var Mt = Object.freeze({ TERRAIN: 0, IMAGERY: 1, TILES3D: 2, OTHER: 3 });
  function Dt(e) {
    e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT);
    const t = r.defaultValue(e.throttleByServer, !1),
      n = r.defaultValue(e.throttle, !1);
    (this.url = e.url),
      (this.requestFunction = e.requestFunction),
      (this.cancelFunction = e.cancelFunction),
      (this.priorityFunction = e.priorityFunction),
      (this.priority = r.defaultValue(e.priority, 0)),
      (this.throttle = n),
      (this.throttleByServer = t),
      (this.type = r.defaultValue(e.type, Mt.OTHER)),
      (this.serverKey = void 0),
      (this.state = zt.UNISSUED),
      (this.deferred = void 0),
      (this.cancelled = !1);
  }
  function Ut(e, t, n) {
    (this.statusCode = e),
      (this.response = t),
      (this.responseHeaders = n),
      "string" == typeof this.responseHeaders &&
        (this.responseHeaders = (function (e) {
          const t = {};
          if (!e) return t;
          const n = e.split("\r\n");
          for (let e = 0; e < n.length; ++e) {
            const r = n[e],
              o = r.indexOf(": ");
            if (o > 0) {
              const e = r.substring(0, o),
                n = r.substring(o + 2);
              t[e] = n;
            }
          }
          return t;
        })(this.responseHeaders));
  }
  function kt() {
    (this._listeners = []),
      (this._scopes = []),
      (this._toRemove = []),
      (this._insideRaiseEvent = !1);
  }
  function Ft(e, t) {
    return t - e;
  }
  function Nt(e) {
    (this._comparator = e.comparator),
      (this._array = []),
      (this._length = 0),
      (this._maximumLength = void 0);
  }
  function jt(e, t, n) {
    const r = e[t];
    (e[t] = e[n]), (e[n] = r);
  }
  (Dt.prototype.cancel = function () {
    this.cancelled = !0;
  }),
    (Dt.prototype.clone = function (e) {
      return r.defined(e)
        ? ((e.url = this.url),
          (e.requestFunction = this.requestFunction),
          (e.cancelFunction = this.cancelFunction),
          (e.priorityFunction = this.priorityFunction),
          (e.priority = this.priority),
          (e.throttle = this.throttle),
          (e.throttleByServer = this.throttleByServer),
          (e.type = this.type),
          (e.serverKey = this.serverKey),
          (e.state = this.RequestState.UNISSUED),
          (e.deferred = void 0),
          (e.cancelled = !1),
          e)
        : new Dt(this);
    }),
    (Ut.prototype.toString = function () {
      let e = "Request has failed.";
      return (
        r.defined(this.statusCode) && (e += " Status Code: " + this.statusCode),
        e
      );
    }),
    Object.defineProperties(kt.prototype, {
      numberOfListeners: {
        get: function () {
          return this._listeners.length - this._toRemove.length;
        },
      },
    }),
    (kt.prototype.addEventListener = function (e, t) {
      this._listeners.push(e), this._scopes.push(t);
      const n = this;
      return function () {
        n.removeEventListener(e, t);
      };
    }),
    (kt.prototype.removeEventListener = function (e, t) {
      const n = this._listeners,
        r = this._scopes;
      let o = -1;
      for (let i = 0; i < n.length; i++)
        if (n[i] === e && r[i] === t) {
          o = i;
          break;
        }
      return (
        -1 !== o &&
        (this._insideRaiseEvent
          ? (this._toRemove.push(o), (n[o] = void 0), (r[o] = void 0))
          : (n.splice(o, 1), r.splice(o, 1)),
        !0)
      );
    }),
    (kt.prototype.raiseEvent = function () {
      let e;
      this._insideRaiseEvent = !0;
      const t = this._listeners,
        n = this._scopes;
      let o = t.length;
      for (e = 0; e < o; e++) {
        const o = t[e];
        r.defined(o) && t[e].apply(n[e], arguments);
      }
      const i = this._toRemove;
      if (((o = i.length), o > 0)) {
        for (i.sort(Ft), e = 0; e < o; e++) {
          const r = i[e];
          t.splice(r, 1), n.splice(r, 1);
        }
        i.length = 0;
      }
      this._insideRaiseEvent = !1;
    }),
    Object.defineProperties(Nt.prototype, {
      length: {
        get: function () {
          return this._length;
        },
      },
      internalArray: {
        get: function () {
          return this._array;
        },
      },
      maximumLength: {
        get: function () {
          return this._maximumLength;
        },
        set: function (e) {
          const t = this._length;
          if (e < t) {
            const n = this._array;
            for (let r = e; r < t; ++r) n[r] = void 0;
            (this._length = e), (n.length = e);
          }
          this._maximumLength = e;
        },
      },
      comparator: {
        get: function () {
          return this._comparator;
        },
      },
    }),
    (Nt.prototype.reserve = function (e) {
      (e = r.defaultValue(e, this._length)), (this._array.length = e);
    }),
    (Nt.prototype.heapify = function (e) {
      e = r.defaultValue(e, 0);
      const t = this._length,
        n = this._comparator,
        o = this._array;
      let i = -1,
        s = !0;
      for (; s; ) {
        const r = 2 * (e + 1),
          a = r - 1;
        (i = a < t && n(o[a], o[e]) < 0 ? a : e),
          r < t && n(o[r], o[i]) < 0 && (i = r),
          i !== e ? (jt(o, i, e), (e = i)) : (s = !1);
      }
    }),
    (Nt.prototype.resort = function () {
      const e = this._length;
      for (let t = Math.ceil(e / 2); t >= 0; --t) this.heapify(t);
    }),
    (Nt.prototype.insert = function (e) {
      const t = this._array,
        n = this._comparator,
        o = this._maximumLength;
      let i,
        s = this._length++;
      for (s < t.length ? (t[s] = e) : t.push(e); 0 !== s; ) {
        const e = Math.floor((s - 1) / 2);
        if (!(n(t[s], t[e]) < 0)) break;
        jt(t, s, e), (s = e);
      }
      return (
        r.defined(o) && this._length > o && ((i = t[o]), (this._length = o)), i
      );
    }),
    (Nt.prototype.pop = function (e) {
      if (((e = r.defaultValue(e, 0)), 0 === this._length)) return;
      const t = this._array,
        n = t[e];
      return (
        jt(t, e, --this._length), this.heapify(e), (t[this._length] = void 0), n
      );
    });
  const Bt = {
    numberOfAttemptedRequests: 0,
    numberOfActiveRequests: 0,
    numberOfCancelledRequests: 0,
    numberOfCancelledActiveRequests: 0,
    numberOfFailedRequests: 0,
    numberOfActiveRequestsEver: 0,
    lastNumberOfActiveRequests: 0,
  };
  let Vt = 20;
  const Lt = new Nt({
    comparator: function (e, t) {
      return e.priority - t.priority;
    },
  });
  (Lt.maximumLength = Vt), Lt.reserve(Vt);
  const Qt = [];
  let Wt = {};
  const Ht =
      "undefined" != typeof document
        ? new Et(document.location.href)
        : new Et(),
    Yt = new kt();
  function Zt() {}
  function Gt(e) {
    r.defined(e.priorityFunction) && (e.priority = e.priorityFunction());
  }
  function Jt(e) {
    return (
      e.state === zt.UNISSUED &&
        ((e.state = zt.ISSUED), (e.deferred = r.when.defer())),
      e.deferred.promise
    );
  }
  function $t(e) {
    const t = Jt(e);
    return (
      (e.state = zt.ACTIVE),
      Qt.push(e),
      ++Bt.numberOfActiveRequests,
      ++Bt.numberOfActiveRequestsEver,
      ++Wt[e.serverKey],
      e
        .requestFunction()
        .then(
          (function (e) {
            return function (t) {
              if (e.state === zt.CANCELLED) return;
              const n = e.deferred;
              --Bt.numberOfActiveRequests,
                --Wt[e.serverKey],
                Yt.raiseEvent(),
                (e.state = zt.RECEIVED),
                (e.deferred = void 0),
                n.resolve(t);
            };
          })(e)
        )
        .otherwise(
          (function (e) {
            return function (t) {
              e.state !== zt.CANCELLED &&
                (++Bt.numberOfFailedRequests,
                --Bt.numberOfActiveRequests,
                --Wt[e.serverKey],
                Yt.raiseEvent(t),
                (e.state = zt.FAILED),
                e.deferred.reject(t));
            };
          })(e)
        ),
      t
    );
  }
  function Xt(e) {
    const t = e.state === zt.ACTIVE;
    if (
      ((e.state = zt.CANCELLED),
      ++Bt.numberOfCancelledRequests,
      r.defined(e.deferred))
    ) {
      const t = e.deferred;
      (e.deferred = void 0), t.reject();
    }
    t &&
      (--Bt.numberOfActiveRequests,
      --Wt[e.serverKey],
      ++Bt.numberOfCancelledActiveRequests),
      r.defined(e.cancelFunction) && e.cancelFunction();
  }
  (Zt.maximumRequests = 50),
    (Zt.maximumRequestsPerServer = 6),
    (Zt.requestsByServer = {
      "api.cesium.com:443": 18,
      "assets.cesium.com:443": 18,
    }),
    (Zt.throttleRequests = !0),
    (Zt.debugShowStatistics = !1),
    (Zt.requestCompletedEvent = Yt),
    Object.defineProperties(Zt, {
      statistics: {
        get: function () {
          return Bt;
        },
      },
      priorityHeapLength: {
        get: function () {
          return Vt;
        },
        set: function (e) {
          if (e < Vt)
            for (; Lt.length > e; ) {
              Xt(Lt.pop());
            }
          (Vt = e), (Lt.maximumLength = e), Lt.reserve(e);
        },
      },
    }),
    (Zt.serverHasOpenSlots = function (e, t) {
      t = r.defaultValue(t, 1);
      const n = r.defaultValue(
        Zt.requestsByServer[e],
        Zt.maximumRequestsPerServer
      );
      return Wt[e] + t <= n;
    }),
    (Zt.heapHasOpenSlots = function (e) {
      return Lt.length + e <= Vt;
    }),
    (Zt.update = function () {
      let e,
        t,
        n = 0;
      const r = Qt.length;
      for (e = 0; e < r; ++e)
        (t = Qt[e]),
          t.cancelled && Xt(t),
          t.state === zt.ACTIVE ? n > 0 && (Qt[e - n] = t) : ++n;
      Qt.length -= n;
      const o = Lt.internalArray,
        i = Lt.length;
      for (e = 0; e < i; ++e) Gt(o[e]);
      Lt.resort();
      const s = Math.max(Zt.maximumRequests - Qt.length, 0);
      let a = 0;
      for (; a < s && Lt.length > 0; )
        (t = Lt.pop()),
          t.cancelled
            ? Xt(t)
            : !t.throttleByServer || Zt.serverHasOpenSlots(t.serverKey)
            ? ($t(t), ++a)
            : Xt(t);
      !(function () {
        if (!Zt.debugShowStatistics) return;
        0 === Bt.numberOfActiveRequests &&
          Bt.lastNumberOfActiveRequests > 0 &&
          (Bt.numberOfAttemptedRequests > 0 &&
            (console.log(
              "Number of attempted requests: " + Bt.numberOfAttemptedRequests
            ),
            (Bt.numberOfAttemptedRequests = 0)),
          Bt.numberOfCancelledRequests > 0 &&
            (console.log(
              "Number of cancelled requests: " + Bt.numberOfCancelledRequests
            ),
            (Bt.numberOfCancelledRequests = 0)),
          Bt.numberOfCancelledActiveRequests > 0 &&
            (console.log(
              "Number of cancelled active requests: " +
                Bt.numberOfCancelledActiveRequests
            ),
            (Bt.numberOfCancelledActiveRequests = 0)),
          Bt.numberOfFailedRequests > 0 &&
            (console.log(
              "Number of failed requests: " + Bt.numberOfFailedRequests
            ),
            (Bt.numberOfFailedRequests = 0)));
        Bt.lastNumberOfActiveRequests = Bt.numberOfActiveRequests;
      })();
    }),
    (Zt.getServerKey = function (e) {
      let t = new Et(e);
      "" === t.scheme() && ((t = new Et(e).absoluteTo(Ht)), t.normalize());
      let n = t.authority();
      /:/.test(n) || (n = n + ":" + ("https" === t.scheme() ? "443" : "80"));
      const o = Wt[n];
      return r.defined(o) || (Wt[n] = 0), n;
    }),
    (Zt.request = function (e) {
      if (qt(e.url) || Rt(e.url))
        return Yt.raiseEvent(), (e.state = zt.RECEIVED), e.requestFunction();
      if (
        (++Bt.numberOfAttemptedRequests,
        r.defined(e.serverKey) || (e.serverKey = Zt.getServerKey(e.url)),
        Zt.throttleRequests &&
          e.throttleByServer &&
          !Zt.serverHasOpenSlots(e.serverKey))
      )
        return;
      if (!Zt.throttleRequests || !e.throttle) return $t(e);
      if (Qt.length >= Zt.maximumRequests) return;
      Gt(e);
      const t = Lt.insert(e);
      if (r.defined(t)) {
        if (t === e) return;
        Xt(t);
      }
      return Jt(e);
    }),
    (Zt.clearForSpecs = function () {
      for (; Lt.length > 0; ) {
        Xt(Lt.pop());
      }
      const e = Qt.length;
      for (let t = 0; t < e; ++t) Xt(Qt[t]);
      (Qt.length = 0),
        (Wt = {}),
        (Bt.numberOfAttemptedRequests = 0),
        (Bt.numberOfActiveRequests = 0),
        (Bt.numberOfCancelledRequests = 0),
        (Bt.numberOfCancelledActiveRequests = 0),
        (Bt.numberOfFailedRequests = 0),
        (Bt.numberOfActiveRequestsEver = 0),
        (Bt.lastNumberOfActiveRequests = 0);
    }),
    (Zt.numberOfActiveRequestsByServer = function (e) {
      return Wt[e];
    }),
    (Zt.requestHeap = Lt);
  const Kt = {};
  let en = {};
  (Kt.add = function (e, t) {
    const n = e.toLowerCase() + ":" + t;
    r.defined(en[n]) || (en[n] = !0);
  }),
    (Kt.remove = function (e, t) {
      const n = e.toLowerCase() + ":" + t;
      r.defined(en[n]) && delete en[n];
    }),
    (Kt.contains = function (e) {
      const t = (function (e) {
        const t = new Et(e);
        t.normalize();
        let n = t.authority();
        if (0 !== n.length) {
          if ((t.authority(n), -1 !== n.indexOf("@"))) {
            const e = n.split("@");
            n = e[1];
          }
          if (-1 === n.indexOf(":")) {
            let e = t.scheme();
            if (
              (0 === e.length &&
                ((e = window.location.protocol),
                (e = e.substring(0, e.length - 1))),
              "http" === e)
            )
              n += ":80";
            else {
              if ("https" !== e) return;
              n += ":443";
            }
          }
          return n;
        }
      })(e);
      return !(!r.defined(t) || !r.defined(en[t]));
    }),
    (Kt.clear = function () {
      en = {};
    });
  const tn = (function () {
    try {
      const e = new XMLHttpRequest();
      return (
        e.open("GET", "#", !0),
        (e.responseType = "blob"),
        "blob" === e.responseType
      );
    } catch (e) {
      return !1;
    }
  })();
  function nn(e, t, n, o) {
    const i = e.query();
    if (0 === i.length) return {};
    let s;
    if (-1 === i.indexOf("=")) {
      const e = {};
      (e[i] = void 0), (s = e);
    } else
      s = (function (e) {
        const t = {};
        if ("" === e) return t;
        const n = e.replace(/\+/g, "%20").split(/[&;]/);
        for (let e = 0, o = n.length; e < o; ++e) {
          const o = n[e].split("="),
            i = decodeURIComponent(o[0]);
          let s = o[1];
          s = r.defined(s) ? decodeURIComponent(s) : "";
          const a = t[i];
          "string" == typeof a
            ? (t[i] = [a, s])
            : Array.isArray(a)
            ? a.push(s)
            : (t[i] = s);
        }
        return t;
      })(i);
    (t._queryParameters = n ? an(s, t._queryParameters, o) : s), e.search("");
  }
  function rn(e, t) {
    const n = t._queryParameters,
      o = Object.keys(n);
    1 !== o.length || r.defined(n[o[0]])
      ? e.search(
          (function (e) {
            let t = "";
            for (const n in e)
              if (e.hasOwnProperty(n)) {
                const r = e[n],
                  o = encodeURIComponent(n) + "=";
                if (Array.isArray(r))
                  for (let e = 0, n = r.length; e < n; ++e)
                    t += o + encodeURIComponent(r[e]) + "&";
                else t += o + encodeURIComponent(r) + "&";
              }
            return (t = t.slice(0, -1)), t;
          })(n)
        )
      : e.search(o[0]);
  }
  function on(e, t) {
    return r.defined(e) ? (r.defined(e.clone) ? e.clone() : At(e)) : t;
  }
  function sn(e) {
    if (e.state === zt.ISSUED || e.state === zt.ACTIVE)
      throw new n.RuntimeError("The Resource is already being fetched.");
    (e.state = zt.UNISSUED), (e.deferred = void 0);
  }
  function an(e, t, n) {
    if (!n) return i.combine(e, t);
    const o = At(e, !0);
    for (const e in t)
      if (t.hasOwnProperty(e)) {
        let n = o[e];
        const i = t[e];
        r.defined(n)
          ? (Array.isArray(n) || (n = o[e] = [n]), (o[e] = n.concat(i)))
          : (o[e] = Array.isArray(i) ? i.slice() : i);
      }
    return o;
  }
  function un(e) {
    "string" == typeof (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)) &&
      (e = { url: e }),
      (this._url = void 0),
      (this._templateValues = on(e.templateValues, {})),
      (this._queryParameters = on(e.queryParameters, {})),
      (this.headers = on(e.headers, {})),
      (this.request = r.defaultValue(e.request, new Dt())),
      (this.proxy = e.proxy),
      (this.retryCallback = e.retryCallback),
      (this.retryAttempts = r.defaultValue(e.retryAttempts, 0)),
      (this._retryCount = 0);
    const t = new Et(e.url);
    nn(t, this, !0, !0), t.fragment(""), (this._url = t.toString());
  }
  let cn;
  function ln(e) {
    const t = e.resource,
      n = e.flipY,
      o = e.skipColorSpaceConversion,
      i = e.preferImageBitmap,
      s = t.request;
    (s.url = t.url),
      (s.requestFunction = function () {
        let e = !1;
        t.isDataUri || t.isBlobUri || (e = t.isCrossOriginUrl);
        const a = r.when.defer();
        return un._Implementations.createImage(s, e, a, n, o, i), a.promise;
      });
    const a = Zt.request(s);
    if (r.defined(a))
      return a.otherwise(function (e) {
        return s.state !== zt.FAILED
          ? r.when.reject(e)
          : t.retryOnError(e).then(function (a) {
              return a
                ? ((s.state = zt.UNISSUED),
                  (s.deferred = void 0),
                  ln({
                    resource: t,
                    flipY: n,
                    skipColorSpaceConversion: o,
                    preferImageBitmap: i,
                  }))
                : r.when.reject(e);
            });
      });
  }
  function dn(e, t, n) {
    const o = {};
    (o[t] = n), e.setQueryParameters(o);
    const i = e.request;
    (i.url = e.url),
      (i.requestFunction = function () {
        const t = r.when.defer();
        return (
          (window[n] = function (e) {
            t.resolve(e);
            try {
              delete window[n];
            } catch (e) {
              window[n] = void 0;
            }
          }),
          un._Implementations.loadAndExecuteScript(e.url, n, t),
          t.promise
        );
      });
    const s = Zt.request(i);
    if (r.defined(s))
      return s.otherwise(function (o) {
        return i.state !== zt.FAILED
          ? r.when.reject(o)
          : e.retryOnError(o).then(function (s) {
              return s
                ? ((i.state = zt.UNISSUED), (i.deferred = void 0), dn(e, t, n))
                : r.when.reject(o);
            });
      });
  }
  (un.createIfNeeded = function (e) {
    return e instanceof un
      ? e.getDerivedResource({ request: e.request })
      : "string" != typeof e
      ? e
      : new un({ url: e });
  }),
    (un.supportsImageBitmapOptions = function () {
      if (r.defined(cn)) return cn;
      if ("function" != typeof createImageBitmap)
        return (cn = r.when.resolve(!1)), cn;
      return (
        (cn = un
          .fetchBlob({
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg==",
          })
          .then(function (e) {
            return createImageBitmap(e, {
              imageOrientation: "flipY",
              premultiplyAlpha: "none",
              colorSpaceConversion: "none",
            });
          })
          .then(function (e) {
            return !0;
          })
          .otherwise(function () {
            return !1;
          })),
        cn
      );
    }),
    Object.defineProperties(un, {
      isBlobSupported: {
        get: function () {
          return tn;
        },
      },
    }),
    Object.defineProperties(un.prototype, {
      queryParameters: {
        get: function () {
          return this._queryParameters;
        },
      },
      templateValues: {
        get: function () {
          return this._templateValues;
        },
      },
      url: {
        get: function () {
          return this.getUrlComponent(!0, !0);
        },
        set: function (e) {
          const t = new Et(e);
          nn(t, this, !1), t.fragment(""), (this._url = t.toString());
        },
      },
      extension: {
        get: function () {
          return (function (e) {
            const t = new Et(e);
            t.normalize();
            let n = t.path(),
              r = n.lastIndexOf("/");
            return (
              -1 !== r && (n = n.substr(r + 1)),
              (r = n.lastIndexOf(".")),
              (n = -1 === r ? "" : n.substr(r + 1)),
              n
            );
          })(this._url);
        },
      },
      isDataUri: {
        get: function () {
          return qt(this._url);
        },
      },
      isBlobUri: {
        get: function () {
          return Rt(this._url);
        },
      },
      isCrossOriginUrl: {
        get: function () {
          return (function (e) {
            r.defined(Pt) || (Pt = document.createElement("a")),
              (Pt.href = window.location.href);
            const t = Pt.host,
              n = Pt.protocol;
            return (
              (Pt.href = e),
              (Pt.href = Pt.href),
              n !== Pt.protocol || t !== Pt.host
            );
          })(this._url);
        },
      },
      hasHeaders: {
        get: function () {
          return Object.keys(this.headers).length > 0;
        },
      },
    }),
    (un.prototype.toString = function () {
      return this.getUrlComponent(!0, !0);
    }),
    (un.prototype.getUrlComponent = function (e, t) {
      if (this.isDataUri) return this._url;
      const n = new Et(this._url);
      e && rn(n, this);
      let o = n.toString().replace(/%7B/g, "{").replace(/%7D/g, "}");
      const i = this._templateValues;
      return (
        (o = o.replace(/{(.*?)}/g, function (e, t) {
          const n = i[t];
          return r.defined(n) ? encodeURIComponent(n) : e;
        })),
        t && r.defined(this.proxy) && (o = this.proxy.getURL(o)),
        o
      );
    }),
    (un.prototype.setQueryParameters = function (e, t) {
      this._queryParameters = t
        ? an(this._queryParameters, e, !1)
        : an(e, this._queryParameters, !1);
    }),
    (un.prototype.appendQueryParameters = function (e) {
      this._queryParameters = an(e, this._queryParameters, !0);
    }),
    (un.prototype.setTemplateValues = function (e, t) {
      this._templateValues = t
        ? i.combine(this._templateValues, e)
        : i.combine(e, this._templateValues);
    }),
    (un.prototype.getDerivedResource = function (e) {
      const t = this.clone();
      if (((t._retryCount = 0), r.defined(e.url))) {
        const n = new Et(e.url);
        nn(n, t, !0, r.defaultValue(e.preserveQueryParameters, !1)),
          n.fragment(""),
          "" !== n.scheme()
            ? (t._url = n.toString())
            : (t._url = n.absoluteTo(new Et(Ot(this._url))).toString());
      }
      return (
        r.defined(e.queryParameters) &&
          (t._queryParameters = i.combine(
            e.queryParameters,
            t._queryParameters
          )),
        r.defined(e.templateValues) &&
          (t._templateValues = i.combine(e.templateValues, t.templateValues)),
        r.defined(e.headers) && (t.headers = i.combine(e.headers, t.headers)),
        r.defined(e.proxy) && (t.proxy = e.proxy),
        r.defined(e.request) && (t.request = e.request),
        r.defined(e.retryCallback) && (t.retryCallback = e.retryCallback),
        r.defined(e.retryAttempts) && (t.retryAttempts = e.retryAttempts),
        t
      );
    }),
    (un.prototype.retryOnError = function (e) {
      const t = this.retryCallback;
      if ("function" != typeof t || this._retryCount >= this.retryAttempts)
        return r.when(!1);
      const n = this;
      return r.when(t(this, e)).then(function (e) {
        return ++n._retryCount, e;
      });
    }),
    (un.prototype.clone = function (e) {
      return (
        r.defined(e) || (e = new un({ url: this._url })),
        (e._url = this._url),
        (e._queryParameters = At(this._queryParameters)),
        (e._templateValues = At(this._templateValues)),
        (e.headers = At(this.headers)),
        (e.proxy = this.proxy),
        (e.retryCallback = this.retryCallback),
        (e.retryAttempts = this.retryAttempts),
        (e._retryCount = 0),
        (e.request = this.request.clone()),
        e
      );
    }),
    (un.prototype.getBaseUri = function (e) {
      return (function (e, t) {
        let n = "";
        const r = e.lastIndexOf("/");
        return (
          -1 !== r && (n = e.substring(0, r + 1)),
          t
            ? (0 !== (e = new Et(e)).query().length && (n += "?" + e.query()),
              0 !== e.fragment().length && (n += "#" + e.fragment()),
              n)
            : n
        );
      })(this.getUrlComponent(e), e);
    }),
    (un.prototype.appendForwardSlash = function () {
      var e;
      this._url =
        ((0 !== (e = this._url).length && "/" === e[e.length - 1]) ||
          (e += "/"),
        e);
    }),
    (un.prototype.fetchArrayBuffer = function () {
      return this.fetch({ responseType: "arraybuffer" });
    }),
    (un.fetchArrayBuffer = function (e) {
      return new un(e).fetchArrayBuffer();
    }),
    (un.prototype.fetchBlob = function () {
      return this.fetch({ responseType: "blob" });
    }),
    (un.fetchBlob = function (e) {
      return new un(e).fetchBlob();
    }),
    (un.prototype.fetchImage = function (e) {
      e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT);
      const t = r.defaultValue(e.preferImageBitmap, !1),
        n = r.defaultValue(e.preferBlob, !1),
        o = r.defaultValue(e.flipY, !1),
        i = r.defaultValue(e.skipColorSpaceConversion, !1);
      if (
        (sn(this.request),
        !tn || this.isDataUri || this.isBlobUri || (!this.hasHeaders && !n))
      )
        return ln({
          resource: this,
          flipY: o,
          skipColorSpaceConversion: i,
          preferImageBitmap: t,
        });
      const s = this.fetchBlob();
      if (!r.defined(s)) return;
      let a, u, c, l;
      return un
        .supportsImageBitmapOptions()
        .then(function (e) {
          return (a = e), (u = a && t), s;
        })
        .then(function (e) {
          if (!r.defined(e)) return;
          if (((l = e), u))
            return un.createImageBitmapFromBlob(e, {
              flipY: o,
              premultiplyAlpha: !1,
              skipColorSpaceConversion: i,
            });
          const t = window.URL.createObjectURL(e);
          return (
            (c = new un({ url: t })),
            ln({
              resource: c,
              flipY: o,
              skipColorSpaceConversion: i,
              preferImageBitmap: !1,
            })
          );
        })
        .then(function (e) {
          if (r.defined(e))
            return (e.blob = l), u || window.URL.revokeObjectURL(c.url), e;
        })
        .otherwise(function (e) {
          return (
            r.defined(c) && window.URL.revokeObjectURL(c.url),
            (e.blob = l),
            r.when.reject(e)
          );
        });
    }),
    (un.fetchImage = function (e) {
      return new un(e).fetchImage({
        flipY: e.flipY,
        skipColorSpaceConversion: e.skipColorSpaceConversion,
        preferBlob: e.preferBlob,
        preferImageBitmap: e.preferImageBitmap,
      });
    }),
    (un.prototype.fetchText = function () {
      return this.fetch({ responseType: "text" });
    }),
    (un.fetchText = function (e) {
      return new un(e).fetchText();
    }),
    (un.prototype.fetchJson = function () {
      const e = this.fetch({
        responseType: "text",
        headers: { Accept: "application/json,*/*;q=0.01" },
      });
      if (r.defined(e))
        return e.then(function (e) {
          if (r.defined(e)) return JSON.parse(e);
        });
    }),
    (un.fetchJson = function (e) {
      return new un(e).fetchJson();
    }),
    (un.prototype.fetchXML = function () {
      return this.fetch({
        responseType: "document",
        overrideMimeType: "text/xml",
      });
    }),
    (un.fetchXML = function (e) {
      return new un(e).fetchXML();
    }),
    (un.prototype.fetchJsonp = function (e) {
      let t;
      (e = r.defaultValue(e, "callback")), sn(this.request);
      do {
        t =
          "loadJsonp" +
          o.CesiumMath.nextRandomNumber().toString().substring(2, 8);
      } while (r.defined(window[t]));
      return dn(this, e, t);
    }),
    (un.fetchJsonp = function (e) {
      return new un(e).fetchJsonp(e.callbackParameterName);
    }),
    (un.prototype._makeRequest = function (e) {
      const t = this;
      sn(t.request);
      const n = t.request;
      (n.url = t.url),
        (n.requestFunction = function () {
          const o = e.responseType,
            s = i.combine(e.headers, t.headers),
            a = e.overrideMimeType,
            u = e.method,
            c = e.data,
            l = r.when.defer(),
            d = un._Implementations.loadWithXhr(t.url, o, u, c, s, l, a);
          return (
            r.defined(d) &&
              r.defined(d.abort) &&
              (n.cancelFunction = function () {
                d.abort();
              }),
            l.promise
          );
        });
      const o = Zt.request(n);
      if (r.defined(o))
        return o
          .then(function (e) {
            return (n.cancelFunction = void 0), e;
          })
          .otherwise(function (o) {
            return (
              (n.cancelFunction = void 0),
              n.state !== zt.FAILED
                ? r.when.reject(o)
                : t.retryOnError(o).then(function (i) {
                    return i
                      ? ((n.state = zt.UNISSUED),
                        (n.deferred = void 0),
                        t.fetch(e))
                      : r.when.reject(o);
                  })
            );
          });
    });
  const fn = /^data:(.*?)(;base64)?,(.*)$/;
  function pn(e, t) {
    const n = decodeURIComponent(t);
    return e ? atob(n) : n;
  }
  function hn(e, t) {
    const n = pn(e, t),
      r = new ArrayBuffer(n.length),
      o = new Uint8Array(r);
    for (let e = 0; e < n.length; e++) o[e] = n.charCodeAt(e);
    return r;
  }
  function mn(e, t) {
    switch (t) {
      case "text":
        return e.toString("utf8");
      case "json":
        return JSON.parse(e.toString("utf8"));
      default:
        return new Uint8Array(e).buffer;
    }
  }
  (un.prototype.fetch = function (e) {
    return ((e = on(e, {})).method = "GET"), this._makeRequest(e);
  }),
    (un.fetch = function (e) {
      return new un(e).fetch({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (un.prototype.delete = function (e) {
      return ((e = on(e, {})).method = "DELETE"), this._makeRequest(e);
    }),
    (un.delete = function (e) {
      return new un(e).delete({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
        data: e.data,
      });
    }),
    (un.prototype.head = function (e) {
      return ((e = on(e, {})).method = "HEAD"), this._makeRequest(e);
    }),
    (un.head = function (e) {
      return new un(e).head({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (un.prototype.options = function (e) {
      return ((e = on(e, {})).method = "OPTIONS"), this._makeRequest(e);
    }),
    (un.options = function (e) {
      return new un(e).options({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (un.prototype.post = function (e, t) {
      return (
        n.Check.defined("data", e),
        ((t = on(t, {})).method = "POST"),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (un.post = function (e) {
      return new un(e).post(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (un.prototype.put = function (e, t) {
      return (
        n.Check.defined("data", e),
        ((t = on(t, {})).method = "PUT"),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (un.put = function (e) {
      return new un(e).put(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (un.prototype.patch = function (e, t) {
      return (
        n.Check.defined("data", e),
        ((t = on(t, {})).method = "PATCH"),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (un.patch = function (e) {
      return new un(e).patch(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (un._Implementations = {}),
    (un._Implementations.createImage = function (e, t, o, i, s, a) {
      const u = e.url;
      un.supportsImageBitmapOptions()
        .then(function (c) {
          if (!c || !a)
            return void (function (e, t, n) {
              const r = new Image();
              (r.onload = function () {
                n.resolve(r);
              }),
                (r.onerror = function (e) {
                  n.reject(e);
                }),
                t &&
                  (Kt.contains(e)
                    ? (r.crossOrigin = "use-credentials")
                    : (r.crossOrigin = "")),
                (r.src = e);
            })(u, t, o);
          const l = r.when.defer(),
            d = un._Implementations.loadWithXhr(
              u,
              "blob",
              "GET",
              void 0,
              void 0,
              l,
              void 0,
              void 0,
              void 0
            );
          return (
            r.defined(d) &&
              r.defined(d.abort) &&
              (e.cancelFunction = function () {
                d.abort();
              }),
            l.promise
              .then(function (e) {
                if (r.defined(e))
                  return un.createImageBitmapFromBlob(e, {
                    flipY: i,
                    premultiplyAlpha: !1,
                    skipColorSpaceConversion: s,
                  });
                o.reject(
                  new n.RuntimeError(
                    "Successfully retrieved " +
                      u +
                      " but it contained no content."
                  )
                );
              })
              .then(o.resolve)
          );
        })
        .otherwise(o.reject);
    }),
    (un.createImageBitmapFromBlob = function (e, t) {
      return (
        n.Check.defined("options", t),
        n.Check.typeOf.bool("options.flipY", t.flipY),
        n.Check.typeOf.bool("options.premultiplyAlpha", t.premultiplyAlpha),
        n.Check.typeOf.bool(
          "options.skipColorSpaceConversion",
          t.skipColorSpaceConversion
        ),
        createImageBitmap(e, {
          imageOrientation: t.flipY ? "flipY" : "none",
          premultiplyAlpha: t.premultiplyAlpha ? "premultiply" : "none",
          colorSpaceConversion: t.skipColorSpaceConversion ? "none" : "default",
        })
      );
    });
  const gn = "undefined" == typeof XMLHttpRequest;
  function yn(e) {
    if (
      ((e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)),
      (this._dates = void 0),
      (this._samples = void 0),
      (this._dateColumn = -1),
      (this._xPoleWanderRadiansColumn = -1),
      (this._yPoleWanderRadiansColumn = -1),
      (this._ut1MinusUtcSecondsColumn = -1),
      (this._xCelestialPoleOffsetRadiansColumn = -1),
      (this._yCelestialPoleOffsetRadiansColumn = -1),
      (this._taiMinusUtcSecondsColumn = -1),
      (this._columnCount = 0),
      (this._lastIndex = -1),
      (this._downloadPromise = void 0),
      (this._dataError = void 0),
      (this._addNewLeapSeconds = r.defaultValue(e.addNewLeapSeconds, !0)),
      r.defined(e.data))
    )
      wn(this, e.data);
    else if (r.defined(e.url)) {
      const t = un.createIfNeeded(e.url),
        n = this;
      this._downloadPromise = t
        .fetchJson()
        .then(function (e) {
          wn(n, e);
        })
        .otherwise(function () {
          n._dataError =
            "An error occurred while retrieving the EOP data from the URL " +
            t.url +
            ".";
        });
    } else
      wn(this, {
        columnNames: [
          "dateIso8601",
          "modifiedJulianDateUtc",
          "xPoleWanderRadians",
          "yPoleWanderRadians",
          "ut1MinusUtcSeconds",
          "lengthOfDayCorrectionSeconds",
          "xCelestialPoleOffsetRadians",
          "yCelestialPoleOffsetRadians",
          "taiMinusUtcSeconds",
        ],
        samples: [],
      });
  }
  function vn(e, t) {
    return Ct.compare(e.julianDate, t);
  }
  function wn(e, t) {
    if (!r.defined(t.columnNames))
      return void (e._dataError =
        "Error in loaded EOP data: The columnNames property is required.");
    if (!r.defined(t.samples))
      return void (e._dataError =
        "Error in loaded EOP data: The samples property is required.");
    const n = t.columnNames.indexOf("modifiedJulianDateUtc"),
      o = t.columnNames.indexOf("xPoleWanderRadians"),
      i = t.columnNames.indexOf("yPoleWanderRadians"),
      s = t.columnNames.indexOf("ut1MinusUtcSeconds"),
      a = t.columnNames.indexOf("xCelestialPoleOffsetRadians"),
      u = t.columnNames.indexOf("yCelestialPoleOffsetRadians"),
      c = t.columnNames.indexOf("taiMinusUtcSeconds");
    if (n < 0 || o < 0 || i < 0 || s < 0 || a < 0 || u < 0 || c < 0)
      return void (e._dataError =
        "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns");
    const l = (e._samples = t.samples),
      d = (e._dates = []);
    let f;
    (e._dateColumn = n),
      (e._xPoleWanderRadiansColumn = o),
      (e._yPoleWanderRadiansColumn = i),
      (e._ut1MinusUtcSecondsColumn = s),
      (e._xCelestialPoleOffsetRadiansColumn = a),
      (e._yCelestialPoleOffsetRadiansColumn = u),
      (e._taiMinusUtcSecondsColumn = c),
      (e._columnCount = t.columnNames.length),
      (e._lastIndex = void 0);
    const p = e._addNewLeapSeconds;
    for (let t = 0, o = l.length; t < o; t += e._columnCount) {
      const e = l[t + n],
        o = l[t + c],
        i = new Ct(e + tt.MODIFIED_JULIAN_DATE_DIFFERENCE, o, nt.TAI);
      if ((d.push(i), p)) {
        if (o !== f && r.defined(f)) {
          const e = Ct.leapSeconds,
            t = Je(e, i, vn);
          if (t < 0) {
            const n = new et(i, o);
            e.splice(~t, 0, n);
          }
        }
        f = o;
      }
    }
  }
  function Cn(e, t, n, r, o) {
    const i = n * r;
    (o.xPoleWander = t[i + e._xPoleWanderRadiansColumn]),
      (o.yPoleWander = t[i + e._yPoleWanderRadiansColumn]),
      (o.xPoleOffset = t[i + e._xCelestialPoleOffsetRadiansColumn]),
      (o.yPoleOffset = t[i + e._yCelestialPoleOffsetRadiansColumn]),
      (o.ut1MinusUtc = t[i + e._ut1MinusUtcSecondsColumn]);
  }
  function _n(e, t, n) {
    return t + e * (n - t);
  }
  function bn(e, t, n, r, o, i, s) {
    const a = e._columnCount;
    if (i > t.length - 1)
      return (
        (s.xPoleWander = 0),
        (s.yPoleWander = 0),
        (s.xPoleOffset = 0),
        (s.yPoleOffset = 0),
        (s.ut1MinusUtc = 0),
        s
      );
    const u = t[o],
      c = t[i];
    if (u.equals(c) || r.equals(u)) return Cn(e, n, o, a, s), s;
    if (r.equals(c)) return Cn(e, n, i, a, s), s;
    const l = Ct.secondsDifference(r, u) / Ct.secondsDifference(c, u),
      d = o * a,
      f = i * a;
    let p = n[d + e._ut1MinusUtcSecondsColumn],
      h = n[f + e._ut1MinusUtcSecondsColumn];
    const m = h - p;
    if (m > 0.5 || m < -0.5) {
      const t = n[d + e._taiMinusUtcSecondsColumn],
        o = n[f + e._taiMinusUtcSecondsColumn];
      t !== o && (c.equals(r) ? (p = h) : (h -= o - t));
    }
    return (
      (s.xPoleWander = _n(
        l,
        n[d + e._xPoleWanderRadiansColumn],
        n[f + e._xPoleWanderRadiansColumn]
      )),
      (s.yPoleWander = _n(
        l,
        n[d + e._yPoleWanderRadiansColumn],
        n[f + e._yPoleWanderRadiansColumn]
      )),
      (s.xPoleOffset = _n(
        l,
        n[d + e._xCelestialPoleOffsetRadiansColumn],
        n[f + e._xCelestialPoleOffsetRadiansColumn]
      )),
      (s.yPoleOffset = _n(
        l,
        n[d + e._yCelestialPoleOffsetRadiansColumn],
        n[f + e._yCelestialPoleOffsetRadiansColumn]
      )),
      (s.ut1MinusUtc = _n(l, p, h)),
      s
    );
  }
  function xn(e, t, n) {
    (this.heading = r.defaultValue(e, 0)),
      (this.pitch = r.defaultValue(t, 0)),
      (this.roll = r.defaultValue(n, 0));
  }
  (un._Implementations.loadWithXhr = function (e, t, o, i, s, a, u) {
    const c = fn.exec(e);
    if (null !== c)
      return void a.resolve(
        (function (e, t) {
          t = r.defaultValue(t, "");
          const n = e[1],
            o = !!e[2],
            i = e[3];
          let s, a;
          switch (t) {
            case "":
            case "text":
              return pn(o, i);
            case "arraybuffer":
              return hn(o, i);
            case "blob":
              return (s = hn(o, i)), new Blob([s], { type: n });
            case "document":
              return (a = new DOMParser()), a.parseFromString(pn(o, i), n);
            case "json":
              return JSON.parse(pn(o, i));
          }
        })(c, t)
      );
    if (gn)
      return void (function (e, t, r, o, i, s, a) {
        const u = require("url").parse(e),
          c = "https:" === u.protocol ? require("https") : require("http"),
          l = require("zlib"),
          d = {
            protocol: u.protocol,
            hostname: u.hostname,
            port: u.port,
            path: u.path,
            query: u.query,
            method: r,
            headers: i,
          };
        c.request(d)
          .on("response", function (e) {
            if (e.statusCode < 200 || e.statusCode >= 300)
              return void s.reject(new Ut(e.statusCode, e, e.headers));
            const r = [];
            e.on("data", function (e) {
              r.push(e);
            }),
              e.on("end", function () {
                const o = Buffer.concat(r);
                "gzip" === e.headers["content-encoding"]
                  ? l.gunzip(o, function (e, r) {
                      e
                        ? s.reject(
                            new n.RuntimeError("Error decompressing response.")
                          )
                        : s.resolve(mn(r, t));
                    })
                  : s.resolve(mn(o, t));
              });
          })
          .on("error", function (e) {
            s.reject(new Ut());
          })
          .end();
      })(e, t, o, 0, s, a);
    const l = new XMLHttpRequest();
    if (
      (Kt.contains(e) && (l.withCredentials = !0),
      l.open(o, e, !0),
      r.defined(u) && r.defined(l.overrideMimeType) && l.overrideMimeType(u),
      r.defined(s))
    )
      for (const e in s) s.hasOwnProperty(e) && l.setRequestHeader(e, s[e]);
    r.defined(t) && (l.responseType = t);
    let d = !1;
    return (
      "string" == typeof e &&
        (d =
          0 === e.indexOf("file://") ||
          ("undefined" != typeof window &&
            "file://" === window.location.origin)),
      (l.onload = function () {
        if ((l.status < 200 || l.status >= 300) && (!d || 0 !== l.status))
          return void a.reject(
            new Ut(l.status, l.response, l.getAllResponseHeaders())
          );
        const e = l.response,
          i = l.responseType;
        if ("HEAD" === o || "OPTIONS" === o) {
          const e = l
              .getAllResponseHeaders()
              .trim()
              .split(/[\r\n]+/),
            t = {};
          return (
            e.forEach(function (e) {
              const n = e.split(": "),
                r = n.shift();
              t[r] = n.join(": ");
            }),
            void a.resolve(t)
          );
        }
        if (204 === l.status) a.resolve();
        else if (!r.defined(e) || (r.defined(t) && i !== t))
          if ("json" === t && "string" == typeof e)
            try {
              a.resolve(JSON.parse(e));
            } catch (e) {
              a.reject(e);
            }
          else
            ("" === i || "document" === i) &&
            r.defined(l.responseXML) &&
            l.responseXML.hasChildNodes()
              ? a.resolve(l.responseXML)
              : ("" !== i && "text" !== i) || !r.defined(l.responseText)
              ? a.reject(
                  new n.RuntimeError("Invalid XMLHttpRequest response type.")
                )
              : a.resolve(l.responseText);
        else a.resolve(e);
      }),
      (l.onerror = function (e) {
        a.reject(new Ut());
      }),
      l.send(i),
      l
    );
  }),
    (un._Implementations.loadAndExecuteScript = function (e, t, n) {
      return (function (e) {
        const t = r.when.defer(),
          n = document.createElement("script");
        (n.async = !0), (n.src = e);
        const o = document.getElementsByTagName("head")[0];
        return (
          (n.onload = function () {
            (n.onload = void 0), o.removeChild(n), t.resolve();
          }),
          (n.onerror = function (e) {
            t.reject(e);
          }),
          o.appendChild(n),
          t.promise
        );
      })(e).otherwise(n.reject);
    }),
    (un._DefaultImplementations = {}),
    (un._DefaultImplementations.createImage = un._Implementations.createImage),
    (un._DefaultImplementations.loadWithXhr = un._Implementations.loadWithXhr),
    (un._DefaultImplementations.loadAndExecuteScript =
      un._Implementations.loadAndExecuteScript),
    (un.DEFAULT = Object.freeze(
      new un({
        url:
          "undefined" == typeof document
            ? ""
            : document.location.href.split("?")[0],
      })
    )),
    (yn.NONE = Object.freeze({
      getPromiseToLoad: function () {
        return r.when.resolve();
      },
      compute: function (e, t) {
        return (
          r.defined(t)
            ? ((t.xPoleWander = 0),
              (t.yPoleWander = 0),
              (t.xPoleOffset = 0),
              (t.yPoleOffset = 0),
              (t.ut1MinusUtc = 0))
            : (t = new $e(0, 0, 0, 0, 0)),
          t
        );
      },
    })),
    (yn.prototype.getPromiseToLoad = function () {
      return r.when(this._downloadPromise);
    }),
    (yn.prototype.compute = function (e, t) {
      if (!r.defined(this._samples)) {
        if (r.defined(this._dataError))
          throw new n.RuntimeError(this._dataError);
        return;
      }
      if (
        (r.defined(t) || (t = new $e(0, 0, 0, 0, 0)),
        0 === this._samples.length)
      )
        return (
          (t.xPoleWander = 0),
          (t.yPoleWander = 0),
          (t.xPoleOffset = 0),
          (t.yPoleOffset = 0),
          (t.ut1MinusUtc = 0),
          t
        );
      const o = this._dates,
        i = this._lastIndex;
      let s = 0,
        a = 0;
      if (r.defined(i)) {
        const n = o[i],
          u = o[i + 1],
          c = Ct.lessThanOrEquals(n, e),
          l = !r.defined(u),
          d = l || Ct.greaterThanOrEquals(u, e);
        if (c && d)
          return (
            (s = i),
            !l && u.equals(e) && ++s,
            (a = s + 1),
            bn(this, o, this._samples, e, s, a, t),
            t
          );
      }
      let u = Je(o, e, Ct.compare, this._dateColumn);
      return (
        u >= 0
          ? (u < o.length - 1 && o[u + 1].equals(e) && ++u, (s = u), (a = u))
          : ((a = ~u), (s = a - 1), s < 0 && (s = 0)),
        (this._lastIndex = s),
        bn(this, o, this._samples, e, s, a, t),
        t
      );
    }),
    (xn.fromQuaternion = function (e, t) {
      r.defined(t) || (t = new xn());
      const n = 2 * (e.w * e.y - e.z * e.x),
        i = 1 - 2 * (e.x * e.x + e.y * e.y),
        s = 2 * (e.w * e.x + e.y * e.z),
        a = 1 - 2 * (e.y * e.y + e.z * e.z),
        u = 2 * (e.w * e.z + e.x * e.y);
      return (
        (t.heading = -Math.atan2(u, a)),
        (t.roll = Math.atan2(s, i)),
        (t.pitch = -o.CesiumMath.asinClamped(n)),
        t
      );
    }),
    (xn.fromDegrees = function (e, t, n, i) {
      return (
        r.defined(i) || (i = new xn()),
        (i.heading = e * o.CesiumMath.RADIANS_PER_DEGREE),
        (i.pitch = t * o.CesiumMath.RADIANS_PER_DEGREE),
        (i.roll = n * o.CesiumMath.RADIANS_PER_DEGREE),
        i
      );
    }),
    (xn.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t)
          ? ((t.heading = e.heading), (t.pitch = e.pitch), (t.roll = e.roll), t)
          : new xn(e.heading, e.pitch, e.roll);
    }),
    (xn.equals = function (e, t) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          e.heading === t.heading &&
          e.pitch === t.pitch &&
          e.roll === t.roll)
      );
    }),
    (xn.equalsEpsilon = function (e, t, n, i) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          o.CesiumMath.equalsEpsilon(e.heading, t.heading, n, i) &&
          o.CesiumMath.equalsEpsilon(e.pitch, t.pitch, n, i) &&
          o.CesiumMath.equalsEpsilon(e.roll, t.roll, n, i))
      );
    }),
    (xn.prototype.clone = function (e) {
      return xn.clone(this, e);
    }),
    (xn.prototype.equals = function (e) {
      return xn.equals(this, e);
    }),
    (xn.prototype.equalsEpsilon = function (e, t, n) {
      return xn.equalsEpsilon(this, e, t, n);
    }),
    (xn.prototype.toString = function () {
      return "(" + this.heading + ", " + this.pitch + ", " + this.roll + ")";
    });
  var Sn,
    En,
    An,
    On = /((?:.*\/)|^)Cesium\.js(?:\?|\#|$)/;
  function In(e) {
    return "undefined" == typeof document
      ? e
      : (r.defined(Sn) || (Sn = document.createElement("a")),
        (Sn.href = e),
        (Sn.href = Sn.href),
        Sn.href);
  }
  function Rn() {
    return (
      r.defined(En) ||
        ((e =
          "undefined" != typeof CESIUM_BASE_URL
            ? CESIUM_BASE_URL
            : "object" == typeof define &&
              r.defined(define.amd) &&
              !define.amd.toUrlUndefined &&
              r.defined(require.toUrl)
            ? Ot("..", qn("Core/buildModuleUrl.js"))
            : (function () {
                for (
                  var e = document.getElementsByTagName("script"),
                    t = 0,
                    n = e.length;
                  t < n;
                  ++t
                ) {
                  var r = e[t].getAttribute("src"),
                    o = On.exec(r);
                  if (null !== o) return o[1];
                }
              })()),
        (En = new un({ url: In(e) })).appendForwardSlash()),
      En
    );
    var e;
  }
  function Pn(e) {
    return In(require.toUrl("../" + e));
  }
  function Tn(e) {
    return Rn().getDerivedResource({ url: e }).url;
  }
  function qn(e) {
    return (
      r.defined(An) ||
        (An =
          "object" == typeof define &&
          r.defined(define.amd) &&
          !define.amd.toUrlUndefined &&
          r.defined(require.toUrl)
            ? Pn
            : Tn),
      An(e)
    );
  }
  function zn(e, t, n) {
    (this.x = e), (this.y = t), (this.s = n);
  }
  function Mn(e) {
    (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)),
      (this._xysFileUrlTemplate = un.createIfNeeded(e.xysFileUrlTemplate)),
      (this._interpolationOrder = r.defaultValue(e.interpolationOrder, 9)),
      (this._sampleZeroJulianEphemerisDate = r.defaultValue(
        e.sampleZeroJulianEphemerisDate,
        2442396.5
      )),
      (this._sampleZeroDateTT = new Ct(
        this._sampleZeroJulianEphemerisDate,
        0,
        nt.TAI
      )),
      (this._stepSizeDays = r.defaultValue(e.stepSizeDays, 1)),
      (this._samplesPerXysFile = r.defaultValue(e.samplesPerXysFile, 1e3)),
      (this._totalSamples = r.defaultValue(e.totalSamples, 27426)),
      (this._samples = new Array(3 * this._totalSamples)),
      (this._chunkDownloadsInProgress = []);
    const t = this._interpolationOrder,
      n = (this._denominators = new Array(t + 1)),
      o = (this._xTable = new Array(t + 1)),
      i = Math.pow(this._stepSizeDays, t);
    for (let e = 0; e <= t; ++e) {
      (n[e] = i), (o[e] = e * this._stepSizeDays);
      for (let r = 0; r <= t; ++r) r !== e && (n[e] *= e - r);
      n[e] = 1 / n[e];
    }
    (this._work = new Array(t + 1)), (this._coef = new Array(t + 1));
  }
  (qn._cesiumScriptRegex = On),
    (qn._buildModuleUrlFromBaseUrl = Tn),
    (qn._clearBaseResource = function () {
      En = void 0;
    }),
    (qn.setBaseUrl = function (e) {
      En = un.DEFAULT.getDerivedResource({ url: e });
    }),
    (qn.getCesiumBaseUrl = Rn);
  const Dn = new Ct(0, 0, nt.TAI);
  function Un(e, t, n) {
    const r = Dn;
    return (
      (r.dayNumber = t),
      (r.secondsOfDay = n),
      Ct.daysDifference(r, e._sampleZeroDateTT)
    );
  }
  function kn(e, t) {
    if (e._chunkDownloadsInProgress[t]) return e._chunkDownloadsInProgress[t];
    const n = r.when.defer();
    let o;
    e._chunkDownloadsInProgress[t] = n;
    const i = e._xysFileUrlTemplate;
    return (
      (o = r.defined(i)
        ? i.getDerivedResource({ templateValues: { 0: t } })
        : new un({ url: qn("Assets/IAU2006_XYS/IAU2006_XYS_" + t + ".json") })),
      r.when(o.fetchJson(), function (r) {
        e._chunkDownloadsInProgress[t] = !1;
        const o = e._samples,
          i = r.samples,
          s = t * e._samplesPerXysFile * 3;
        for (let e = 0, t = i.length; e < t; ++e) o[s + e] = i[e];
        n.resolve();
      }),
      n.promise
    );
  }
  (Mn.prototype.preload = function (e, t, n, o) {
    const i = Un(this, e, t),
      s = Un(this, n, o);
    let a = (i / this._stepSizeDays - this._interpolationOrder / 2) | 0;
    a < 0 && (a = 0);
    let u =
      (s / this._stepSizeDays - this._interpolationOrder / 2) |
      (0 + this._interpolationOrder);
    u >= this._totalSamples && (u = this._totalSamples - 1);
    const c = (a / this._samplesPerXysFile) | 0,
      l = (u / this._samplesPerXysFile) | 0,
      d = [];
    for (let e = c; e <= l; ++e) d.push(kn(this, e));
    return r.when.all(d);
  }),
    (Mn.prototype.computeXysRadians = function (e, t, n) {
      const o = Un(this, e, t);
      if (o < 0) return;
      const i = (o / this._stepSizeDays) | 0;
      if (i >= this._totalSamples) return;
      const s = this._interpolationOrder;
      let a = i - ((s / 2) | 0);
      a < 0 && (a = 0);
      let u = a + s;
      u >= this._totalSamples &&
        ((u = this._totalSamples - 1), (a = u - s), a < 0 && (a = 0));
      let c = !1;
      const l = this._samples;
      if (
        (r.defined(l[3 * a]) ||
          (kn(this, (a / this._samplesPerXysFile) | 0), (c = !0)),
        r.defined(l[3 * u]) ||
          (kn(this, (u / this._samplesPerXysFile) | 0), (c = !0)),
        c)
      )
        return;
      r.defined(n) ? ((n.x = 0), (n.y = 0), (n.s = 0)) : (n = new zn(0, 0, 0));
      const d = o - a * this._stepSizeDays,
        f = this._work,
        p = this._denominators,
        h = this._coef,
        m = this._xTable;
      let g, y;
      for (g = 0; g <= s; ++g) f[g] = d - m[g];
      for (g = 0; g <= s; ++g) {
        for (h[g] = 1, y = 0; y <= s; ++y) y !== g && (h[g] *= f[y]);
        h[g] *= p[g];
        let e = 3 * (a + g);
        (n.x += h[g] * l[e++]), (n.y += h[g] * l[e++]), (n.s += h[g] * l[e]);
      }
      return n;
    });
  const Fn = {},
    Nn = {
      up: { south: "east", north: "west", west: "south", east: "north" },
      down: { south: "west", north: "east", west: "north", east: "south" },
      south: { up: "west", down: "east", west: "down", east: "up" },
      north: { up: "east", down: "west", west: "up", east: "down" },
      west: { up: "north", down: "south", north: "down", south: "up" },
      east: { up: "south", down: "north", north: "up", south: "down" },
    },
    jn = {
      north: [-1, 0, 0],
      east: [0, 1, 0],
      up: [0, 0, 1],
      south: [1, 0, 0],
      west: [0, -1, 0],
      down: [0, 0, -1],
    },
    Bn = {},
    Vn = {
      east: new t.Cartesian3(),
      north: new t.Cartesian3(),
      up: new t.Cartesian3(),
      west: new t.Cartesian3(),
      south: new t.Cartesian3(),
      down: new t.Cartesian3(),
    };
  let Ln = new t.Cartesian3(),
    Qn = new t.Cartesian3(),
    Wn = new t.Cartesian3();
  (Fn.localFrameToFixedFrameGenerator = function (e, i) {
    if (!Nn.hasOwnProperty(e) || !Nn[e].hasOwnProperty(i))
      throw new n.DeveloperError(
        "firstAxis and secondAxis must be east, north, up, west, south or down."
      );
    const s = Nn[e][i];
    let a;
    const u = e + i;
    return (
      r.defined(Bn[u])
        ? (a = Bn[u])
        : ((a = function (n, a, u) {
            if (
              (r.defined(u) || (u = new t.Matrix4()),
              t.Cartesian3.equalsEpsilon(
                n,
                t.Cartesian3.ZERO,
                o.CesiumMath.EPSILON14
              ))
            )
              t.Cartesian3.unpack(jn[e], 0, Ln),
                t.Cartesian3.unpack(jn[i], 0, Qn),
                t.Cartesian3.unpack(jn[s], 0, Wn);
            else if (
              o.CesiumMath.equalsEpsilon(n.x, 0, o.CesiumMath.EPSILON14) &&
              o.CesiumMath.equalsEpsilon(n.y, 0, o.CesiumMath.EPSILON14)
            ) {
              const r = o.CesiumMath.sign(n.z);
              t.Cartesian3.unpack(jn[e], 0, Ln),
                "east" !== e &&
                  "west" !== e &&
                  t.Cartesian3.multiplyByScalar(Ln, r, Ln),
                t.Cartesian3.unpack(jn[i], 0, Qn),
                "east" !== i &&
                  "west" !== i &&
                  t.Cartesian3.multiplyByScalar(Qn, r, Qn),
                t.Cartesian3.unpack(jn[s], 0, Wn),
                "east" !== s &&
                  "west" !== s &&
                  t.Cartesian3.multiplyByScalar(Wn, r, Wn);
            } else {
              (a = r.defaultValue(a, t.Ellipsoid.WGS84)).geodeticSurfaceNormal(
                n,
                Vn.up
              );
              const o = Vn.up,
                u = Vn.east;
              (u.x = -n.y),
                (u.y = n.x),
                (u.z = 0),
                t.Cartesian3.normalize(u, Vn.east),
                t.Cartesian3.cross(o, u, Vn.north),
                t.Cartesian3.multiplyByScalar(Vn.up, -1, Vn.down),
                t.Cartesian3.multiplyByScalar(Vn.east, -1, Vn.west),
                t.Cartesian3.multiplyByScalar(Vn.north, -1, Vn.south),
                (Ln = Vn[e]),
                (Qn = Vn[i]),
                (Wn = Vn[s]);
            }
            return (
              (u[0] = Ln.x),
              (u[1] = Ln.y),
              (u[2] = Ln.z),
              (u[3] = 0),
              (u[4] = Qn.x),
              (u[5] = Qn.y),
              (u[6] = Qn.z),
              (u[7] = 0),
              (u[8] = Wn.x),
              (u[9] = Wn.y),
              (u[10] = Wn.z),
              (u[11] = 0),
              (u[12] = n.x),
              (u[13] = n.y),
              (u[14] = n.z),
              (u[15] = 1),
              u
            );
          }),
          (Bn[u] = a)),
      a
    );
  }),
    (Fn.eastNorthUpToFixedFrame = Fn.localFrameToFixedFrameGenerator(
      "east",
      "north"
    )),
    (Fn.northEastDownToFixedFrame = Fn.localFrameToFixedFrameGenerator(
      "north",
      "east"
    )),
    (Fn.northUpEastToFixedFrame = Fn.localFrameToFixedFrameGenerator(
      "north",
      "up"
    )),
    (Fn.northWestUpToFixedFrame = Fn.localFrameToFixedFrameGenerator(
      "north",
      "west"
    ));
  const Hn = new xe(),
    Yn = new t.Cartesian3(1, 1, 1),
    Zn = new t.Matrix4();
  Fn.headingPitchRollToFixedFrame = function (e, n, o, i, s) {
    i = r.defaultValue(i, Fn.eastNorthUpToFixedFrame);
    const a = xe.fromHeadingPitchRoll(n, Hn),
      u = t.Matrix4.fromTranslationQuaternionRotationScale(
        t.Cartesian3.ZERO,
        a,
        Yn,
        Zn
      );
    return (s = i(e, o, s)), t.Matrix4.multiply(s, u, s);
  };
  const Gn = new t.Matrix4(),
    Jn = new t.Matrix3();
  Fn.headingPitchRollQuaternion = function (e, n, r, o, i) {
    const s = Fn.headingPitchRollToFixedFrame(e, n, r, o, Gn),
      a = t.Matrix4.getMatrix3(s, Jn);
    return xe.fromRotationMatrix(a, i);
  };
  const $n = new t.Cartesian3(1, 1, 1),
    Xn = new t.Cartesian3(),
    Kn = new t.Matrix4(),
    er = new t.Matrix4(),
    tr = new t.Matrix3(),
    nr = new xe();
  Fn.fixedFrameToHeadingPitchRoll = function (e, n, o, i) {
    (n = r.defaultValue(n, t.Ellipsoid.WGS84)),
      (o = r.defaultValue(o, Fn.eastNorthUpToFixedFrame)),
      r.defined(i) || (i = new xn());
    const s = t.Matrix4.getTranslation(e, Xn);
    if (t.Cartesian3.equals(s, t.Cartesian3.ZERO))
      return (i.heading = 0), (i.pitch = 0), (i.roll = 0), i;
    let a = t.Matrix4.inverseTransformation(o(s, n, Kn), Kn),
      u = t.Matrix4.setScale(e, $n, er);
    (u = t.Matrix4.setTranslation(u, t.Cartesian3.ZERO, u)),
      (a = t.Matrix4.multiply(a, u, a));
    let c = xe.fromRotationMatrix(t.Matrix4.getMatrix3(a, tr), nr);
    return (c = xe.normalize(c, c)), xn.fromQuaternion(c, i);
  };
  const rr = o.CesiumMath.TWO_PI / 86400;
  let or = new Ct();
  (Fn.computeTemeToPseudoFixedMatrix = function (e, n) {
    or = Ct.addSeconds(e, -Ct.computeTaiMinusUtc(e), or);
    const i = or.dayNumber,
      s = or.secondsOfDay;
    let a;
    const u = i - 2451545;
    a =
      s >= 43200
        ? (u + 0.5) / tt.DAYS_PER_JULIAN_CENTURY
        : (u - 0.5) / tt.DAYS_PER_JULIAN_CENTURY;
    const c =
        (((24110.54841 + a * (8640184.812866 + a * (0.093104 + -62e-7 * a))) *
          rr) %
          o.CesiumMath.TWO_PI) +
        (72921158553e-15 + 11772758384668e-32 * (i - 2451545.5)) *
          ((s + 0.5 * tt.SECONDS_PER_DAY) % tt.SECONDS_PER_DAY),
      l = Math.cos(c),
      d = Math.sin(c);
    return r.defined(n)
      ? ((n[0] = l),
        (n[1] = -d),
        (n[2] = 0),
        (n[3] = d),
        (n[4] = l),
        (n[5] = 0),
        (n[6] = 0),
        (n[7] = 0),
        (n[8] = 1),
        n)
      : new t.Matrix3(l, d, 0, -d, l, 0, 0, 0, 1);
  }),
    (Fn.iau2006XysData = new Mn()),
    (Fn.earthOrientationParameters = yn.NONE);
  const ir = 32.184;
  (Fn.preloadIcrfFixed = function (e) {
    const t = e.start.dayNumber,
      n = e.start.secondsOfDay + ir,
      o = e.stop.dayNumber,
      i = e.stop.secondsOfDay + ir,
      s = Fn.iau2006XysData.preload(t, n, o, i),
      a = Fn.earthOrientationParameters.getPromiseToLoad();
    return r.when.all([s, a]);
  }),
    (Fn.computeIcrfToFixedMatrix = function (e, n) {
      r.defined(n) || (n = new t.Matrix3());
      const o = Fn.computeFixedToIcrfMatrix(e, n);
      if (r.defined(o)) return t.Matrix3.transpose(o, n);
    });
  const sr = new zn(0, 0, 0),
    ar = new $e(0, 0, 0, 0, 0, 0),
    ur = new t.Matrix3(),
    cr = new t.Matrix3();
  Fn.computeFixedToIcrfMatrix = function (e, n) {
    r.defined(n) || (n = new t.Matrix3());
    const i = Fn.earthOrientationParameters.compute(e, ar);
    if (!r.defined(i)) return;
    const s = e.dayNumber,
      a = e.secondsOfDay + ir,
      u = Fn.iau2006XysData.computeXysRadians(s, a, sr);
    if (!r.defined(u)) return;
    const c = u.x + i.xPoleOffset,
      l = u.y + i.yPoleOffset,
      d = 1 / (1 + Math.sqrt(1 - c * c - l * l)),
      f = ur;
    (f[0] = 1 - d * c * c),
      (f[3] = -d * c * l),
      (f[6] = c),
      (f[1] = -d * c * l),
      (f[4] = 1 - d * l * l),
      (f[7] = l),
      (f[2] = -c),
      (f[5] = -l),
      (f[8] = 1 - d * (c * c + l * l));
    const p = t.Matrix3.fromRotationZ(-u.s, cr),
      h = t.Matrix3.multiply(f, p, ur),
      m = e.dayNumber - 2451545,
      g =
        (e.secondsOfDay - Ct.computeTaiMinusUtc(e) + i.ut1MinusUtc) /
        tt.SECONDS_PER_DAY;
    let y = 0.779057273264 + g + 0.00273781191135448 * (m + g);
    y = (y % 1) * o.CesiumMath.TWO_PI;
    const v = t.Matrix3.fromRotationZ(y, cr),
      w = t.Matrix3.multiply(h, v, ur),
      C = Math.cos(i.xPoleWander),
      _ = Math.cos(i.yPoleWander),
      b = Math.sin(i.xPoleWander),
      x = Math.sin(i.yPoleWander);
    let S = s - 2451545 + a / tt.SECONDS_PER_DAY;
    S /= 36525;
    const E = (-47e-6 * S * o.CesiumMath.RADIANS_PER_DEGREE) / 3600,
      A = Math.cos(E),
      O = Math.sin(E),
      I = cr;
    return (
      (I[0] = C * A),
      (I[1] = C * O),
      (I[2] = b),
      (I[3] = -_ * O + x * b * A),
      (I[4] = _ * A + x * b * O),
      (I[5] = -x * C),
      (I[6] = -x * O - _ * b * A),
      (I[7] = x * A - _ * b * O),
      (I[8] = _ * C),
      t.Matrix3.multiply(w, I, n)
    );
  };
  const lr = new t.Cartesian4();
  (Fn.pointToWindowCoordinates = function (e, t, n, r) {
    return (
      ((r = Fn.pointToGLWindowCoordinates(e, t, n, r)).y = 2 * t[5] - r.y), r
    );
  }),
    (Fn.pointToGLWindowCoordinates = function (e, n, o, i) {
      r.defined(i) || (i = new t.Cartesian2());
      const s = lr;
      return (
        t.Matrix4.multiplyByVector(
          e,
          t.Cartesian4.fromElements(o.x, o.y, o.z, 1, s),
          s
        ),
        t.Cartesian4.multiplyByScalar(s, 1 / s.w, s),
        t.Matrix4.multiplyByVector(n, s, s),
        t.Cartesian2.fromCartesian4(s, i)
      );
    });
  const dr = new t.Cartesian3(),
    fr = new t.Cartesian3(),
    pr = new t.Cartesian3();
  Fn.rotationMatrixFromPositionVelocity = function (e, n, i, s) {
    const a = r.defaultValue(i, t.Ellipsoid.WGS84).geodeticSurfaceNormal(e, dr);
    let u = t.Cartesian3.cross(n, a, fr);
    t.Cartesian3.equalsEpsilon(u, t.Cartesian3.ZERO, o.CesiumMath.EPSILON6) &&
      (u = t.Cartesian3.clone(t.Cartesian3.UNIT_X, u));
    const c = t.Cartesian3.cross(u, n, pr);
    return (
      t.Cartesian3.normalize(c, c),
      t.Cartesian3.cross(n, c, u),
      t.Cartesian3.negate(u, u),
      t.Cartesian3.normalize(u, u),
      r.defined(s) || (s = new t.Matrix3()),
      (s[0] = n.x),
      (s[1] = n.y),
      (s[2] = n.z),
      (s[3] = u.x),
      (s[4] = u.y),
      (s[5] = u.z),
      (s[6] = c.x),
      (s[7] = c.y),
      (s[8] = c.z),
      s
    );
  };
  const hr = new t.Matrix4(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
    mr = new t.Cartographic(),
    gr = new t.Cartesian3(),
    yr = new t.Cartesian3(),
    vr = new t.Matrix3(),
    wr = new t.Matrix4(),
    Cr = new t.Matrix4();
  (Fn.basisTo2D = function (e, n, r) {
    const o = t.Matrix4.getTranslation(n, yr),
      i = e.ellipsoid,
      s = i.cartesianToCartographic(o, mr),
      a = e.project(s, gr);
    t.Cartesian3.fromElements(a.z, a.x, a.y, a);
    const u = Fn.eastNorthUpToFixedFrame(o, i, wr),
      c = t.Matrix4.inverseTransformation(u, Cr),
      l = t.Matrix4.getMatrix3(n, vr),
      d = t.Matrix4.multiplyByMatrix3(c, l, r);
    return t.Matrix4.multiply(hr, d, r), t.Matrix4.setTranslation(r, a, r), r;
  }),
    (Fn.wgs84To2DModelMatrix = function (e, n, r) {
      const o = e.ellipsoid,
        i = Fn.eastNorthUpToFixedFrame(n, o, wr),
        s = t.Matrix4.inverseTransformation(i, Cr),
        a = o.cartesianToCartographic(n, mr),
        u = e.project(a, gr);
      t.Cartesian3.fromElements(u.z, u.x, u.y, u);
      const c = t.Matrix4.fromTranslation(u, wr);
      return t.Matrix4.multiply(hr, s, r), t.Matrix4.multiply(c, r, r), r;
    }),
    (e.BoundingSphere = c),
    (e.FeatureDetection = be),
    (e.GeographicProjection = s),
    (e.Intersect = a),
    (e.Interval = u),
    (e.Quaternion = xe),
    (e.Resource = un),
    (e.Transforms = Fn),
    (e.buildModuleUrl = qn);
});
