define("calendar", ["ui"],
function(t) {
    function n(t) {
        this.options = {
            signed: [],
            countDays: 0
        },
        $.extend(this.options, t),
        this.init()
    }
    var e = t("ui"),
    a = new e.loadding,
    i = $("#calendar"),
    o = $("th.currentDate");
    return n.prototype = {
        year: (new Date).getFullYear(),
        month: (new Date).getMonth(),
        date: (new Date).getDate(),
        init: function() {
            this.update(),
            this.initEvent()
        },
        initEvent: function() {
            var t = this;
            $("th.preMonth").on("tap",
            function() {
                a.show();
                var n = new Date(t.year, t.month - 1, t.date);
                t.change(n)
            }),
            $("th.nextMonth").on("tap",
            function() {
                a.show();
                var n = new Date(t.year, t.month + 1, t.date);
                t.change(n)
            })
        },
        change: function(t) {
            var n = this;
            n.year = t.getFullYear(),
            n.month = t.getMonth(),
            $.ajax({
                type: "get",
                url: "/activity/signin/ajaxMonthlyRecord",
                data: {
                    date: n.year + "-" + (n.month + 1)
                },
                dataType: "json",
                success: function(t) {
                    var e = [];
                    for (var a in t) e.push(Number(a));
                    n.options.signed = e,
                    n.update()
                },
                error: function() {
                    alert("日历更新出错！")
                }
            })
        },
        update: function() {
            o.html(this.year === (new Date).getFullYear() && this.month === (new Date).getMonth() ? this.year + "-" + (this.month + 1) + "-" + this.date: this.year + "-" + (this.month + 1));
            var t = this.getFirstDay(this.year, this.month),
            n = this.getMonthDays(this.year, this.month),
            e = 7 - (t + n) % 7,
            s = '<tr class="cal-body">';
            if (t > 0) for (var r = 0; t > r; r++) s += "<td></td>";
            for (var h = 1; n >= h; h++) s += -1 != $.inArray(h, this.options.signed) ? "<td>" + h + '<img src="http://p0.jmstatic.com/mobile/touch/Image/signin/yes.png" alt="已签"/></td>': new Date(this.year, this.month, h) > new Date ? "<td>" + h + "</td>": "<td>" + h + '<img src="http://p0.jmstatic.com/mobile/touch/Image/signin/no.png" alt="未签"/></td>',
            (h + t) % 7 === 0 && (s += '</tr><tr class="cal-body">');
            if (e > 0 && 7 != e) for (var c = 0; e > c; c++) s += "<td></td>";
            s += "</tr>";
            var d = $(s);
            this.clear(),
            i.append(d),
            a.hide()
        },
        clear: function() {
            $("tr.cal-body").remove()
        },
        getFirstDay: function(t, n) {
            var e = new Date(t, n, 1);
            return e.getDay()
        },
        getMonthDays: function(t, n) {
            var e = new Date(t, n + 1, 1);
            return e.setHours(e.getHours() - 3),
            e.getDate()
        }
    },
    n
}),
define("index", ["ui", "calendar"],
function(t) {
    var n = t("ui"),
    e = new n.dialog({
        btn: 1,
        ok: "好的，我知道了"
    }),
    a = new n.loadding,
    i = t("calendar"),
    o = $("div.modal"),
    s = $("div.success-dialog"),
    r = $("div.exchange-dialog"),
    h = $("div.gain-dialog"),
    c = $(".ui-dialog-content"),
    d = $("div.score-current"),
    u = {
        init: function() {
            this.sign()
        },
        initEvent: function() {
            var t = this;
            $("a.exchange").on("tap",
            function() {
                var t = $(".score-current").attr("data-score");
                100 > t ? (c.html("目前积分不足，满100积分后可兑换10元<br>现金券(无启用金额限制)，请坚持哟！"), e.show()) : ($("div.exchange-title").html("当前积分: " + t), r.show(), o.show())
            }),
            $("a.exchange-btn").on("tap",
            function() {
                a.show(),
                Jumei.ja("qiaodaoduihuan", "click"),
                $.ajax({
                    type: "get",
                    url: "/activity/signin/ajaxExchange",
                    dataType: "json",
                    timeout: 3e3,
                    success: function(t) {
                        t ? (d.html("当前积分: " + t), d.attr("data-score", t), r.hide(), h.show()) : (r.hide(), c.html("未成功兑换积分!"), e.show()),
                        a.hide()
                    },
                    error: function() {
                        r.hide(),
                        c.html("~亲，当前网速不太给力!"),
                        e.show(),
                        a.hide()
                    }
                })
            }),
            $("img.exchange-close").on("tap",
            function() {
                t.close(r)
            }),
            $("img.gain-close").on("tap",
            function() {
                t.close(h)
            })
        },
        close: function(t) {
            t.hide(),
            o.hide()
        },
        dropCoins: function() {
            var t = this;
            o.show();
            var n = setInterval(function() {
                $("<img>").attr({
                    src: "http://p0.jmstatic.com/mobile/touch/Image/signin/gold_" + Math.floor(5 * Math.random() + 1) + ".png",
                    alt: "金币"
                }).css({
                    position: "absolute",
                    top: 0,
                    left: 85 * Math.random() + "%",
                    width: "3rem",
                    height: "auto",
                    "-webkit-animation-duration": "2s"
                }).appendTo(o).animate({
                    top: 10 * Math.random() + 80 + "%"
                },
                500, "ease-in-out",
                function() {
                    this.remove()
                })
            },
            20);
            setTimeout(function() {
                clearInterval(n)
            },
            1e3),
            setTimeout(function() {
                s.show()
            },
            1500),
            setTimeout(function() {
                t.close(s)
            },
            2500)
        },
        sign: function() {
            var t = this;
            $.ajax({
                type: "get",
                url: "/activity/signin/ajaxMonthlyRecord",
                data: {
                    date: (new Date).getFullYear() + "-" + ((new Date).getMonth() + 1)
                },
                dataType: "json",
                success: function(n) {
                    var e = [];
                    for (var a in n) e.push(Number(a));
                    var o = $(".score-hint").attr("data-day");
                    s.attr("data-sign") > 0 && t.dropCoins(),
                    new i({
                        signed: e,
                        countDays: o
                    })
                }
            })
        }
    };
    u.init()
}),
seajs.use(["index"]);