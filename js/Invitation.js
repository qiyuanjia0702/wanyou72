let officialWebsite = "https://m.oopz.cn",
            ua = navigator.userAgent,
            isMobile = /Mobi|Android|iPhone/i.test(ua),
            isAndroid = -1 < ua.indexOf("Android") || -1 < ua.indexOf("Adr"),
            isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            isWechat = "micromessenger" == ua.toLowerCase().match(/MicroMessenger/i),
            isQQ = "qq/" == ua.toLowerCase().match(/QQ\//i),
            isQQBrowser = -1 < ua.indexOf("MQQBrowser") || -1 < ua.indexOf("QQTheme"),
            pathname = window.location.pathname,
            invitationCode = pathname.split("/").pop(),
            iosErrorCallbackFrom = "iosErrorCallback",
            targetWeb = "oopzVip",
            urlObj = new URL(window.location.href),
            params = new URLSearchParams(urlObj.search),
            paramFrom = void 0 === params.get("from") || null === params.get("from") ? "" : params.get("from"),
            paramTarget = void 0 === params.get("target") || null === params.get("target") ? "" : params.get("target"),
            isFromIOSErrorCallback = paramFrom.toLowerCase() === iosErrorCallbackFrom.toLowerCase(),
            isTargetOpenApp = paramTarget.toLowerCase() === targetWeb.toLowerCase();
        async function getChannelDetail(e) {
            var a = getLocalStorageItem("oopz_share_api_url"),
                a = (await getData((null != a && "" !== a ? a : "https://api.oopz.cn") + "/invite/v1/codeDetail?code=" + invitationCode)).data,
                t = a.areaName,
                o = a.channelName,
                n = a.areaAvatar,
                r = a.banner,
                a = (a.channelType, a.status, document.getElementById("popup_background")),
                i = document.getElementById("area_banner"),
                l = document.getElementById("area_logo"),
                c = document.getElementById("area_name"),
                s = document.getElementById("invitation_content");
            a.style.backgroundImage = `url(${r})`, i.src = r, l.src = n, c.innerText = t, s.innerText = o
        }
        async function getData(e) {
            try {
                var a = await fetch(e, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (a.ok) return await a.json();
                throw new Error("网络请求错误, 状态码: " + a.status)
            } catch (e) {
                throw console.error("请求失败:", e), e
            }
        }

        function openMobileApp() {
            var e = "oopz.cn/i/" + invitationCode,
                e = isFromIOSErrorCallback ? e : e + `?from=${iosErrorCallbackFrom}&target=` + targetWeb,
                a = "oopz://" + e,
                e = "https://" + e;
            let t = document.getElementById("invitation_button");
            isIOS ? window.location.href = e : new OpenApp({
                timeout: 3e3,
                scheme: a,
                applink: e,
                callback: function(e, a) {
                    t.innerText = "接受邀请", "SUCCESS" !== e && openErrorCallback()
                }
            }).open(), t.innerText = "加载中···"
        }

        function openErrorCallback() {
            window.location.href = officialWebsite
        }

        function getLocalStorageItem(e) {
            try {
                var a = localStorage.getItem(e);
                return null === a ? (console.log("Item not found in localStorage."), null) : a
            } catch (e) {
                return console.error("Error reading from localStorage:", e), null
            }
        }
        isMobile || window.location.replace("https://oopz.cn/s/" + invitationCode), !isIOS || isFromIOSErrorCallback || -1 !== window.location.href.indexOf("oopz.vip") || isTargetOpenApp || window.location.replace("https://oopz.vip/i/" + invitationCode), !isWechat && !isQQ && isIOS && isFromIOSErrorCallback && openErrorCallback(), document.addEventListener("DOMContentLoaded", async () => {
            await getChannelDetail(invitationCode);
            var e = document.getElementById("invitation_button");
            let a = document.getElementById("shade");
            e.addEventListener("click", function(e) {
                isWechat || isQQ ? a.style.display = "block" : openMobileApp()
            })
        })