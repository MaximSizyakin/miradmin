$(document).ready(function(s) {
    var e, i, a = 2500,
        n = 3800,
        t = n - 3e3,
        d = 50,
        l = 150,
        r = 500,
        o = r + 800,
        c = 600,
        h = 1500;

    function p(e) {
        var i = C(e);
        if (e.parents(".st-headline").hasClass("type")) {
            var h = e.parent(".st-words-wrapper");
            h.addClass("selected").removeClass("waiting"), setTimeout(function() { h.removeClass("selected"), e.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out") }, r), setTimeout(function() { u(i, l) }, o)
        } else if (e.parents(".st-headline").hasClass("letters")) {
            var w = e.children("i").length >= i.children("i").length;
            ! function e(i, n, t, d) {
                i.removeClass("in").addClass("out");
                i.is(":last-child") ? t && setTimeout(function() { p(C(n)) }, a) : setTimeout(function() { e(i.next(), n, t, d) }, d);
                if (i.is(":last-child") && s("html").hasClass("no-csstransitions")) {
                    var l = C(n);
                    m(n, l)
                }
            }(e.find("i").eq(0), e, w, d), f(i.find("i").eq(0), i, w, d)
        } else e.parents(".st-headline").hasClass("clip") ? e.parents(".st-words-wrapper").animate({ width: "2px" }, c, function() { m(e, i), u(i) }) : e.parents(".st-headline").hasClass("loading-bar") ? (e.parents(".st-words-wrapper").removeClass("is-loading"), m(e, i), setTimeout(function() { p(i) }, n), setTimeout(function() { e.parents(".st-words-wrapper").addClass("is-loading") }, t)) : (m(e, i), setTimeout(function() { p(i) }, a))
    }

    function u(s, e) { s.parents(".st-headline").hasClass("type") ? (f(s.find("i").eq(0), s, !1, e), s.addClass("is-visible").removeClass("is-hidden")) : s.parents(".st-headline").hasClass("clip") && s.parents(".st-words-wrapper").animate({ width: s.width() + 10 }, c, function() { setTimeout(function() { p(s) }, h) }) }

    function f(s, e, i, n) { s.addClass("in").removeClass("out"), s.is(":last-child") ? (e.parents(".st-headline").hasClass("type") && setTimeout(function() { e.parents(".st-words-wrapper").addClass("waiting") }, 200), i || setTimeout(function() { p(e) }, a)) : setTimeout(function() { f(s.next(), e, i, n) }, n) }

    function C(s) { return s.is(":last-child") ? s.parent().children().eq(0) : s.next() }

    function m(s, e) { s.removeClass("is-visible").addClass("is-hidden"), e.removeClass("is-hidden").addClass("is-visible") }
    s(".st-headline.letters").find("b").each(function() {
        var e, i = s(this),
            a = i.text().split(""),
            n = i.hasClass("is-visible");
        for (e in a) i.parents(".rotate-2").length > 0 && (a[e] = "<em>" + a[e] + "</em>"), a[e] = n ? '<i class="in">' + a[e] + "</i>" : "<i>" + a[e] + "</i>";
        var t = a.join("");
        i.html(t).css("opacity", 1)
    }), e = s(".st-headline"), i = a, e.each(function() {
        var e = s(this);
        if (e.hasClass("loading-bar")) i = n, setTimeout(function() { e.find(".st-words-wrapper").addClass("is-loading") }, t);
        else if (e.hasClass("clip")) {
            var a = e.find(".st-words-wrapper"),
                d = a.width() + 10;
            a.css("width", d)
        } else if (!e.hasClass("type")) {
            var l = e.find(".st-words-wrapper b"),
                r = 0;
            l.each(function() {
                var e = s(this).width();
                e > r && (r = e)
            }), e.find(".st-words-wrapper").css("width", r)
        }
        setTimeout(function() { p(e.find(".is-visible").eq(0)) }, i)
    })
});