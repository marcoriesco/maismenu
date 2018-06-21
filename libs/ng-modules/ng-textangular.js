!function(a, b) {
    b["true"] = a, /*
@license textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.3.7

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/
    angular.module("textAngularSetup", []).value("taOptions", {
        toolbar: [ [ "h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "quote" ], [ "bold", "italics", "underline", "strikeThrough", "ul", "ol", "redo", "undo", "clear" ], [ "justifyLeft", "justifyCenter", "justifyRight", "indent", "outdent" ], [ "html", "insertImage", "insertLink", "insertVideo", "wordcount", "charcount" ] ],
        classes: {
            focussed: "focussed",
            toolbar: "btn-toolbar",
            toolbarGroup: "btn-group",
            toolbarButton: "md-raised md-button md-textangular",
            toolbarButtonActive: "active",
            disabled: "disabled",
            textEditor: "form-control",
            htmlEditor: "form-control"
        },
        defaultTagAttributes: {
            a: {
                target: ""
            }
        },
        setup: {
            textEditorSetup: function() {},
            htmlEditorSetup: function() {}
        },
        defaultFileDropHandler: function(a, b) {
            var c = new FileReader();
            return "image" === a.type.substring(0, 5) ? (c.onload = function() {
                "" !== c.result && b("insertImage", c.result, !0);
            }, c.readAsDataURL(a), !0) : !1;
        }
    }).value("taSelectableElements", [ "a", "img" ]).value("taCustomRenderers", [ {
        selector: "img",
        customAttribute: "ta-insert-video",
        renderLogic: function(a) {
            var b = angular.element("<iframe></iframe>"), c = a.prop("attributes");
            angular.forEach(c, function(a) {
                b.attr(a.name, a.value);
            }), b.attr("src", b.attr("ta-insert-video")), a.replaceWith(b);
        }
    } ]).value("taTranslations", {
        html: {
            tooltip: "Toggle html / Rich Text"
        },
        heading: {
            tooltip: "Heading "
        },
        p: {
            tooltip: "Paragraph"
        },
        pre: {
            tooltip: "Preformatted text"
        },
        ul: {
            tooltip: "Unordered List"
        },
        ol: {
            tooltip: "Ordered List"
        },
        quote: {
            tooltip: "Quote/unquote selection or paragraph"
        },
        undo: {
            tooltip: "Undo"
        },
        redo: {
            tooltip: "Redo"
        },
        bold: {
            tooltip: "Bold"
        },
        italic: {
            tooltip: "Italic"
        },
        underline: {
            tooltip: "Underline"
        },
        strikeThrough: {
            tooltip: "Strikethrough"
        },
        justifyLeft: {
            tooltip: "Align text left"
        },
        justifyRight: {
            tooltip: "Align text right"
        },
        justifyCenter: {
            tooltip: "Center"
        },
        indent: {
            tooltip: "Increase indent"
        },
        outdent: {
            tooltip: "Decrease indent"
        },
        clear: {
            tooltip: "Clear formatting"
        },
        insertImage: {
            dialogPrompt: "Please enter an image URL to insert",
            tooltip: "Insert image",
            hotkey: "the - possibly language dependent hotkey ... for some future implementation"
        },
        insertVideo: {
            tooltip: "Insert video",
            dialogPrompt: "Please enter a youtube URL to embed"
        },
        insertLink: {
            tooltip: "Insert / edit link",
            dialogPrompt: "Please enter a URL to insert"
        },
        editLink: {
            reLinkButton: {
                tooltip: "Relink"
            },
            unLinkButton: {
                tooltip: "Unlink"
            },
            targetToggle: {
                buttontext: "Open in New Window"
            }
        },
        wordcount: {
            tooltip: "Display words Count"
        },
        charcount: {
            tooltip: "Display characters Count"
        }
    }).run([ "taRegisterTool", "$window", "taTranslations", "taSelection", function(a, b, c, d) {
        a("html", {
            iconclass: "code",
            tooltiptext: c.html.tooltip,
            action: function() {
                this.$editor().switchView();
            },
            activeState: function() {
                return this.$editor().showHtml;
            }
        });
        var e = function(a) {
            return function() {
                return this.$editor().queryFormatBlockState(a);
            };
        }, f = function() {
            return this.$editor().wrapSelection("formatBlock", "<" + this.name.toUpperCase() + ">");
        };
        angular.forEach([ "h1", "h2", "h3", "h4", "h5", "h6" ], function(b) {
            a(b.toLowerCase(), {
                buttontext: b.toUpperCase(),
                tooltiptext: c.heading.tooltip + b.charAt(1),
                action: f,
                activeState: e(b.toLowerCase())
            });
        }), a("p", {
            buttontext: "P",
            tooltiptext: c.p.tooltip,
            action: function() {
                return this.$editor().wrapSelection("formatBlock", "<P>");
            },
            activeState: function() {
                return this.$editor().queryFormatBlockState("p");
            }
        }), a("pre", {
            buttontext: "pre",
            tooltiptext: c.pre.tooltip,
            action: function() {
                return this.$editor().wrapSelection("formatBlock", "<PRE>");
            },
            activeState: function() {
                return this.$editor().queryFormatBlockState("pre");
            }
        }), a("ul", {
            iconclass: "format_list_bulleted",
            tooltiptext: c.ul.tooltip,
            action: function() {
                return this.$editor().wrapSelection("insertUnorderedList", null);
            },
            activeState: function() {
                return this.$editor().queryCommandState("insertUnorderedList");
            }
        }), a("ol", {
            iconclass: "format_list_numbered",
            tooltiptext: c.ol.tooltip,
            action: function() {
                return this.$editor().wrapSelection("insertOrderedList", null);
            },
            activeState: function() {
                return this.$editor().queryCommandState("insertOrderedList");
            }
        }), a("quote", {
            iconclass: "format_quote",
            tooltiptext: c.quote.tooltip,
            action: function() {
                return this.$editor().wrapSelection("formatBlock", "<BLOCKQUOTE>");
            },
            activeState: function() {
                return this.$editor().queryFormatBlockState("blockquote");
            }
        }), a("undo", {
            iconclass: "undo",
            tooltiptext: c.undo.tooltip,
            action: function() {
                return this.$editor().wrapSelection("undo", null);
            }
        }), a("redo", {
            iconclass: "redo",
            tooltiptext: c.redo.tooltip,
            action: function() {
                return this.$editor().wrapSelection("redo", null);
            }
        }), a("bold", {
            iconclass: "format_bold",
            tooltiptext: c.bold.tooltip,
            action: function() {
                return this.$editor().wrapSelection("bold", null);
            },
            activeState: function() {
                return this.$editor().queryCommandState("bold");
            },
            commandKeyCode: 98
        }), a("justifyLeft", {
            iconclass: "format_align_left",
            tooltiptext: c.justifyLeft.tooltip,
            action: function() {
                return this.$editor().wrapSelection("justifyLeft", null);
            },
            activeState: function(a) {
                var b = !1;
                return a && (b = "left" === a.css("text-align") || "left" === a.attr("align") || "right" !== a.css("text-align") && "center" !== a.css("text-align") && "justify" !== a.css("text-align") && !this.$editor().queryCommandState("justifyRight") && !this.$editor().queryCommandState("justifyCenter") && !this.$editor().queryCommandState("justifyFull")), 
                b = b || this.$editor().queryCommandState("justifyLeft");
            }
        }), a("justifyRight", {
            iconclass: "format_align_right",
            tooltiptext: c.justifyRight.tooltip,
            action: function() {
                return this.$editor().wrapSelection("justifyRight", null);
            },
            activeState: function(a) {
                var b = !1;
                return a && (b = "right" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyRight");
            }
        }), a("justifyCenter", {
            iconclass: "format_align_center",
            tooltiptext: c.justifyCenter.tooltip,
            action: function() {
                return this.$editor().wrapSelection("justifyCenter", null);
            },
            activeState: function(a) {
                var b = !1;
                return a && (b = "center" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyCenter");
            }
        }), a("indent", {
            iconclass: "format_indent_increase",
            tooltiptext: c.indent.tooltip,
            action: function() {
                return this.$editor().wrapSelection("indent", null);
            },
            activeState: function() {
                return this.$editor().queryFormatBlockState("blockquote");
            }
        }), a("outdent", {
            iconclass: "format_indent_decrease",
            tooltiptext: c.outdent.tooltip,
            action: function() {
                return this.$editor().wrapSelection("outdent", null);
            },
            activeState: function() {
                return !1;
            }
        }), a("italics", {
            iconclass: "format_italic",
            tooltiptext: c.italic.tooltip,
            action: function() {
                return this.$editor().wrapSelection("italic", null);
            },
            activeState: function() {
                return this.$editor().queryCommandState("italic");
            },
            commandKeyCode: 105
        }), a("underline", {
            iconclass: "format_underline",
            tooltiptext: c.underline.tooltip,
            action: function() {
                return this.$editor().wrapSelection("underline", null);
            },
            activeState: function() {
                return this.$editor().queryCommandState("underline");
            },
            commandKeyCode: 117
        }), a("strikeThrough", {
            iconclass: "format_strikethrough",
            tooltiptext: c.strikeThrough.tooltip,
            action: function() {
                return this.$editor().wrapSelection("strikeThrough", null);
            },
            activeState: function() {
                return document.queryCommandState("strikeThrough");
            }
        }), a("clear", {
            iconclass: "format_clear",
            tooltiptext: c.clear.tooltip,
            action: function(a, b) {
                var c;
                this.$editor().wrapSelection("removeFormat", null);
                var e = angular.element(d.getSelectionElement()), f = function(a) {
                    a = angular.element(a);
                    var b = a;
                    angular.forEach(a.children(), function(a) {
                        var c = angular.element("<p></p>");
                        c.html(angular.element(a).html()), b.after(c), b = c;
                    }), a.remove();
                };
                if (angular.forEach(e.find("ul"), f), angular.forEach(e.find("ol"), f), "li" === e[0].tagName.toLowerCase()) {
                    var g = e[0].parentNode.childNodes, h = [], i = [], j = !1;
                    for (c = 0; c < g.length; c++) g[c] === e[0] ? j = !0 : j ? i.push(g[c]) : h.push(g[c]);
                    var k = angular.element(e[0].parentNode), l = angular.element("<p></p>");
                    if (l.html(angular.element(e[0]).html()), 0 === h.length || 0 === i.length) 0 === i.length ? k.after(l) : k[0].parentNode.insertBefore(l[0], k[0]), 
                    0 === h.length && 0 === i.length ? k.remove() : angular.element(e[0]).remove(); else {
                        var m = angular.element("<" + k[0].tagName + "></" + k[0].tagName + ">"), n = angular.element("<" + k[0].tagName + "></" + k[0].tagName + ">");
                        for (c = 0; c < h.length; c++) m.append(angular.element(h[c]));
                        for (c = 0; c < i.length; c++) n.append(angular.element(i[c]));
                        k.after(n), k.after(l), k.after(m), k.remove();
                    }
                    d.setSelectionToElementEnd(l[0]);
                }
                var o = this.$editor(), p = function(a) {
                    a = angular.element(a), a[0] !== o.displayElements.text[0] && a.removeAttr("class"), 
                    angular.forEach(a.children(), p);
                };
                angular.forEach(e, p), "li" !== e[0].tagName.toLowerCase() && "ol" !== e[0].tagName.toLowerCase() && "ul" !== e[0].tagName.toLowerCase() && this.$editor().wrapSelection("formatBlock", "default"), 
                b();
            }
        });
        var g = function(a, b, c) {
            var d = function() {
                c.updateTaBindtaTextElement(), c.hidePopover();
            };
            a.preventDefault(), c.displayElements.popover.css("width", "375px");
            var e = c.displayElements.popoverContainer;
            e.empty();
            var f = angular.element('<div class="btn-group" style="padding-right: 6px;">'), g = angular.element('<md-button class="md-raised md-button md-textangular" unselectable="on" tabindex="-1">100% </md-button>');
            g.on("click", function(a) {
                a.preventDefault(), b.css({
                    width: "100%",
                    height: ""
                }), d();
            });
            var h = angular.element('<md-button class="md-raised md-button md-textangular" unselectable="on" tabindex="-1">50% </md-button>');
            h.on("click", function(a) {
                a.preventDefault(), b.css({
                    width: "50%",
                    height: ""
                }), d();
            });
            var i = angular.element('<md-button class="md-raised md-button md-textangular" unselectable="on" tabindex="-1">25% </md-button>');
            i.on("click", function(a) {
                a.preventDefault(), b.css({
                    width: "25%",
                    height: ""
                }), d();
            });
            var j = angular.element('<md-button class="md-raised md-button md-textangular" unselectable="on" tabindex="-1">Reset</md-button>');
            j.on("click", function(a) {
                a.preventDefault(), b.css({
                    width: "",
                    height: ""
                }), d();
            }), f.append(g), f.append(h), f.append(i), f.append(j), e.append(f), f = angular.element('<div class="btn-group" style="padding-right: 6px;">');
            var k = angular.element('<md-button class="md-raised md-button md-textangular" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></md-button>');
            k.on("click", function(a) {
                a.preventDefault(), b.css("float", "left"), b.css("cssFloat", "left"), b.css("styleFloat", "left"), 
                d();
            });
            var l = angular.element('<md-button class="md-raised md-button md-textangular" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></md-button>');
            l.on("click", function(a) {
                a.preventDefault(), b.css("float", "right"), b.css("cssFloat", "right"), b.css("styleFloat", "right"), 
                d();
            });
            var m = angular.element('<md-button class="md-raised md-button md-textangular" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></md-button>');
            m.on("click", function(a) {
                a.preventDefault(), b.css("float", ""), b.css("cssFloat", ""), b.css("styleFloat", ""), 
                d();
            }), f.append(k), f.append(m), f.append(l), e.append(f), f = angular.element('<div class="btn-group">');
            var n = angular.element('<md-button class="md-raised md-button md-textangular" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></md-button>');
            n.on("click", function(a) {
                a.preventDefault(), b.remove(), d();
            }), f.append(n), e.append(f), c.showPopover(b), c.showResizeOverlay(b);
        };
        a("insertImage", {
            iconclass: "insert_photo",
            tooltiptext: c.insertImage.tooltip,
            action: function() {
                var a;
                return a = b.prompt(c.insertImage.dialogPrompt, "http://"), a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("insertImage", a, !0) : void 0;
            },
            onElementSelect: {
                element: "img",
                action: g
            }
        }), a("insertVideo", {
            iconclass: "movie",
            tooltiptext: c.insertVideo.tooltip,
            action: function() {
                var a;
                if (a = b.prompt(c.insertVideo.dialogPrompt, "https://"), a && "" !== a && "https://" !== a) {
                    var d = a.match(/(\?|&)v=[^&]*/);
                    if (d && d.length > 0) {
                        var e = "https://www.youtube.com/embed/" + d[0].substring(3), f = '<img class="ta-insert-video" src="https://img.youtube.com/vi/' + d[0].substring(3) + '/hqdefault.jpg" ta-insert-video="' + e + '" contenteditable="false" allowfullscreen="true" frameborder="0" />';
                        return this.$editor().wrapSelection("insertHTML", f, !0);
                    }
                }
            },
            onElementSelect: {
                element: "img",
                onlyWithAttrs: [ "ta-insert-video" ],
                action: g
            }
        }), a("insertLink", {
            tooltiptext: c.insertLink.tooltip,
            iconclass: "insert_link",
            action: function() {
                var a;
                return a = b.prompt(c.insertLink.dialogPrompt, "http://"), a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("createLink", a, !0) : void 0;
            },
            activeState: function(a) {
                return a ? "A" === a[0].tagName : !1;
            },
            onElementSelect: {
                element: "a",
                action: function(a, d, e) {
                    a.preventDefault(), e.displayElements.popover.css("width", "436px");
                    var f = e.displayElements.popoverContainer;
                    f.empty(), f.css("line-height", "28px");
                    var g = angular.element('<a href="' + d.attr("href") + '" target="_blank">' + d.attr("href") + "</a>");
                    g.css({
                        display: "inline-block",
                        "max-width": "200px",
                        overflow: "hidden",
                        "text-overflow": "ellipsis",
                        "white-space": "nowrap",
                        "vertical-align": "middle"
                    }), f.append(g);
                    var h = angular.element('<div class="btn-group pull-right">'), i = angular.element('<md-button class="md-raised md-button md-textangular" tabindex="-1" unselectable="on" title="' + c.editLink.reLinkButton.tooltip + '"><i class="fa fa-edit icon-edit"></i></md-button>');
                    i.on("click", function(a) {
                        a.preventDefault();
                        var f = b.prompt(c.insertLink.dialogPrompt, d.attr("href"));
                        f && "" !== f && "http://" !== f && (d.attr("href", f), e.updateTaBindtaTextElement()), 
                        e.hidePopover();
                    }), h.append(i);
                    var j = angular.element('<md-button class="md-raised md-button md-textangular" tabindex="-1" unselectable="on" title="' + c.editLink.unLinkButton.tooltip + '"><i class="fa fa-unlink icon-unlink"></i></md-button>');
                    j.on("click", function(a) {
                        a.preventDefault(), d.replaceWith(d.contents()), e.updateTaBindtaTextElement(), 
                        e.hidePopover();
                    }), h.append(j);
                    var k = angular.element('<md-button class="md-raised md-button md-textangular" tabindex="-1" unselectable="on">' + c.editLink.targetToggle.buttontext + "</md-button>");
                    "_blank" === d.attr("target") && k.addClass("active"), k.on("click", function(a) {
                        a.preventDefault(), d.attr("target", "_blank" === d.attr("target") ? "" : "_blank"), 
                        k.toggleClass("active"), e.updateTaBindtaTextElement();
                    }), h.append(k), f.append(h), e.showPopover(d);
                }
            }
        }), a("wordcount", {
            display: '<div id="toolbarWC" style="display:block; min-width:100px;">Words: <span ng-bind="wordcount"></span></div>',
            disabled: !0,
            wordcount: 0,
            activeState: function() {
                var a = this.$editor().displayElements.text, b = a[0].innerHTML || "", c = 0;
                return "" !== b.replace(/\s*<[^>]*?>\s*/g, "") && (c = b.replace(/<\/?(b|i|em|strong|span|u|strikethrough|a|img|small|sub|sup|label)( [^>*?])?>/gi, "").replace(/(<[^>]*?>\s*<[^>]*?>)/gi, " ").replace(/(<[^>]*?>)/gi, "").replace(/\s+/gi, " ").match(/\S+/g).length), 
                this.wordcount = c, this.$editor().wordcount = c, !1;
            }
        }), a("charcount", {
            display: '<div id="toolbarCC" style="display:block; min-width:120px;">Characters: <span ng-bind="charcount"></span></div>',
            disabled: !0,
            charcount: 0,
            activeState: function() {
                var a = this.$editor().displayElements.text, b = a[0].innerText || a[0].textContent, c = b.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+/g, " ").replace(/\s+$/g, " ").length;
                return this.charcount = c, this.$editor().charcount = c, !1;
            }
        });
    } ]), /*
@license textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.4.1

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/
    function() {
        "use strict";
        function a(a) {
            try {
                return 0 !== angular.element(a).length;
            } catch (b) {
                return !1;
            }
        }
        function b(b, c) {
            if (!b || "" === b || r.hasOwnProperty(b)) throw "textAngular Error: A unique name is required for a Tool Definition";
            if (c.display && ("" === c.display || !a(c.display)) || !c.display && !c.buttontext && !c.iconclass) throw 'textAngular Error: Tool Definition for "' + b + '" does not have a valid display/iconclass/buttontext value';
            r[b] = c;
        }
        var c = {
            ie: function() {
                for (var a, b = 3, c = document.createElement("div"), d = c.getElementsByTagName("i"); c.innerHTML = "<!--[if gt IE " + ++b + "]><i></i><![endif]-->", 
                d[0]; ) ;
                return b > 4 ? b : a;
            }(),
            webkit: /AppleWebKit\/([\d.]+)/i.test(navigator.userAgent)
        }, d = !1;
        c.webkit && (document.addEventListener("mousedown", function(a) {
            var b = a || window.event, c = b.target;
            if (d && null !== c) {
                for (var e = !1, f = c; null !== f && "html" !== f.tagName.toLowerCase() && !e; ) e = "true" === f.contentEditable, 
                f = f.parentNode;
                e || (document.getElementById("textAngular-editableFix-010203040506070809").setSelectionRange(0, 0), 
                c.focus(), c.select && c.select());
            }
            d = !1;
        }, !1), angular.element(document).ready(function() {
            angular.element(document.body).append(angular.element('<input id="textAngular-editableFix-010203040506070809" class="ta-hidden-input" unselectable="on" tabIndex="-1">'));
        }));
        var e = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/i, f = /^(ul|li|ol)$/i, g = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video|li)$/i;
        String.prototype.trim || (String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, "");
        });
        var h, i, j, k, l, m;
        if (c.ie > 8 || void 0 === c.ie) {
            for (var n = document.styleSheets, o = 0; o < n.length; o++) if ((0 === n[o].media.length || n[o].media.mediaText.match(/(all|screen)/gi)) && n[o].href && n[o].href.match(/textangular\.(min\.|)css/gi)) {
                h = n[o];
                break;
            }
            h || (h = function() {
                var a = document.createElement("style");
                return c.webkit && a.appendChild(document.createTextNode("")), document.getElementsByTagName("head")[0].appendChild(a), 
                a.sheet;
            }()), i = function(a, b) {
                return k(h, a, b);
            }, k = function(a, b, c) {
                var d, e;
                return a.cssRules ? d = Math.max(a.cssRules.length - 1, 0) : a.rules && (d = Math.max(a.rules.length - 1, 0)), 
                a.insertRule ? a.insertRule(b + "{" + c + "}", d) : a.addRule(b, c, d), h.rules ? e = h.rules[d] : h.cssRules && (e = h.cssRules[d]), 
                e;
            }, m = function(a, b) {
                var c, d;
                for (c = 0; c < b.length; c++) if (b[c].cssText === a.cssText) {
                    d = c;
                    break;
                }
                return d;
            }, j = function(a) {
                l(h, a);
            }, l = function(a, b) {
                var c = a.cssRules || a.rules;
                if (c) {
                    var d = m(b, c);
                    a.removeRule ? a.removeRule(d) : a.deleteRule(d);
                }
            };
        }
        angular.module("textAngular.factories", []).factory("taBrowserTag", [ function() {
            return function(a) {
                return a ? "" === a ? void 0 === c.ie ? "div" : c.ie <= 8 ? "P" : "p" : c.ie <= 8 ? a.toUpperCase() : a : c.ie <= 8 ? "P" : "p";
            };
        } ]).factory("taApplyCustomRenderers", [ "taCustomRenderers", "taDOM", function(a, b) {
            return function(c) {
                var d = angular.element("<div></div>");
                return d[0].innerHTML = c, angular.forEach(a, function(a) {
                    var c = [];
                    a.selector && "" !== a.selector ? c = d.find(a.selector) : a.customAttribute && "" !== a.customAttribute && (c = b.getByAttribute(d, a.customAttribute)), 
                    angular.forEach(c, function(b) {
                        b = angular.element(b), a.selector && "" !== a.selector && a.customAttribute && "" !== a.customAttribute ? void 0 !== b.attr(a.customAttribute) && a.renderLogic(b) : a.renderLogic(b);
                    });
                }), d[0].innerHTML;
            };
        } ]).factory("taFixChrome", function() {
            var a = function(a) {
                if (!a || !angular.isString(a) || a.length <= 0) return a;
                for (var b, c, d, e = /<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi, f = "", g = 0; b = e.exec(a); ) c = b[3] || b[4], 
                c && c.match(/line-height: 1.[0-9]{3,12};|color: inherit; line-height: 1.1;/i) && (c = c.replace(/( |)font-family: inherit;|( |)line-height: 1.[0-9]{3,12};|( |)color: inherit;/gi, ""), 
                d = "<" + b[1].trim(), c.trim().length > 0 && (d += " style=" + b[2].substring(0, 1) + c + b[2].substring(0, 1)), 
                d += b[5].trim() + ">", f += a.substring(g, b.index) + d, g = b.index + b[0].length);
                return f += a.substring(g), g > 0 ? f.replace(/<span\s?>(.*?)<\/span>(<br(\/|)>|)/gi, "$1") : a;
            };
            return a;
        }).factory("taSanitize", [ "$sanitize", function(a) {
            function b(a, b) {
                for (var c, d = 0, e = 0, f = /<[^>]*>/gi; c = f.exec(a); ) if (e = c.index, "/" === c[0].substr(1, 1)) {
                    if (0 === d) break;
                    d--;
                } else d++;
                return b + a.substring(0, e) + angular.element(b)[0].outerHTML.substring(b.length) + a.substring(e);
            }
            function c(a) {
                if (!a || !angular.isString(a) || a.length <= 0) return a;
                for (var d, f, g, h, i, k, l = /<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi, m = "", n = "", o = 0; f = l.exec(a); ) {
                    h = f[3] || f[4];
                    var p = new RegExp(j, "i");
                    if (angular.isString(h) && p.test(h)) {
                        i = "";
                        for (var q = new RegExp(j, "ig"); g = q.exec(h); ) for (d = 0; d < e.length; d++) g[2 * d + 2] && (i += "<" + e[d].tag + ">");
                        k = c(a.substring(o, f.index)), n += m.length > 0 ? b(k, m) : k, h = h.replace(new RegExp(j, "ig"), ""), 
                        n += "<" + f[1].trim(), h.length > 0 && (n += ' style="' + h + '"'), n += f[5] + ">", 
                        o = f.index + f[0].length, m = i;
                    }
                }
                return n += m.length > 0 ? b(a.substring(o), m) : a.substring(o);
            }
            function d(a) {
                if (!a || !angular.isString(a) || a.length <= 0) return a;
                for (var b, c = /<([^>\/]+?)align=("([^"]+)"|'([^']+)')([^>]*)>/gi, d = "", e = 0; b = c.exec(a); ) {
                    d += a.substring(e, b.index), e = b.index + b[0].length;
                    var f = "<" + b[1] + b[5];
                    /style=("([^"]+)"|'([^']+)')/gi.test(f) ? f = f.replace(/style=("([^"]+)"|'([^']+)')/i, 'style="$2$3 text-align:' + (b[3] || b[4]) + ';"') : f += ' style="text-align:' + (b[3] || b[4]) + ';"', 
                    f += ">", d += f;
                }
                return d + a.substring(e);
            }
            for (var e = [ {
                property: "font-weight",
                values: [ "bold" ],
                tag: "b"
            }, {
                property: "font-style",
                values: [ "italic" ],
                tag: "i"
            } ], f = [], g = 0; g < e.length; g++) {
                for (var h = "(" + e[g].property + ":\\s*(", i = 0; i < e[g].values.length; i++) i > 0 && (h += "|"), 
                h += e[g].values[i];
                h += ");)", f.push(h);
            }
            var j = "(" + f.join("|") + ")";
            return function(b, e, f) {
                if (!f) try {
                    b = c(b);
                } catch (g) {}
                b = d(b);
                var h;
                try {
                    h = a(b), f && (h = b);
                } catch (g) {
                    h = e || "";
                }
                var i, j = h.match(/(<pre[^>]*>.*?<\/pre[^>]*>)/gi), k = h.replace(/(&#(9|10);)*/gi, ""), l = /<pre[^>]*>.*?<\/pre[^>]*>/gi, m = 0, n = 0;
                for (h = ""; null !== (i = l.exec(k)) && m < j.length; ) h += k.substring(n, i.index) + j[m], 
                n = i.index + i[0].length, m++;
                return h + k.substring(n);
            };
        } ]).factory("taToolExecuteAction", [ "$q", "$log", function(a, b) {
            return function(c) {
                void 0 !== c && (this.$editor = function() {
                    return c;
                });
                var d, e = a.defer(), f = e.promise, g = this.$editor();
                try {
                    d = this.action(e, g.startAction()), f["finally"](function() {
                        g.endAction.call(g);
                    });
                } catch (h) {
                    b.error(h);
                }
                (d || void 0 === d) && e.resolve();
            };
        } ]), angular.module("textAngular.DOM", [ "textAngular.factories" ]).factory("taExecCommand", [ "taSelection", "taBrowserTag", "$document", function(a, b, c) {
            var d = function(b, c) {
                var d, e, f = b.find("li");
                for (e = f.length - 1; e >= 0; e--) d = angular.element("<" + c + ">" + f[e].innerHTML + "</" + c + ">"), 
                b.after(d);
                b.remove(), a.setSelectionToElementEnd(d[0]);
            }, g = function(b) {
                /(<br(|\/)>)$/i.test(b.innerHTML.trim()) ? a.setSelectionBeforeElement(angular.element(b).find("br")[0]) : a.setSelectionToElementEnd(b);
            }, h = function(a, b) {
                var c = angular.element("<" + b + ">" + a[0].innerHTML + "</" + b + ">");
                a.after(c), a.remove(), g(c.find("li")[0]);
            }, i = function(a, c, d) {
                for (var e = "", f = 0; f < a.length; f++) e += "<" + b("li") + ">" + a[f].innerHTML + "</" + b("li") + ">";
                var h = angular.element("<" + d + ">" + e + "</" + d + ">");
                c.after(h), c.remove(), g(h.find("li")[0]);
            };
            return function(g, j) {
                return g = b(g), function(k, l, m, n) {
                    var o, p, q, r, s, t, u, v = angular.element("<" + g + ">");
                    try {
                        u = a.getSelectionElement();
                    } catch (w) {}
                    var x = angular.element(u);
                    if (void 0 !== u) {
                        var y = u.tagName.toLowerCase();
                        if ("insertorderedlist" === k.toLowerCase() || "insertunorderedlist" === k.toLowerCase()) {
                            var z = b("insertorderedlist" === k.toLowerCase() ? "ol" : "ul");
                            if (y === z) return d(x, g);
                            if ("li" === y && x.parent()[0].tagName.toLowerCase() === z && 1 === x.parent().children().length) return d(x.parent(), g);
                            if ("li" === y && x.parent()[0].tagName.toLowerCase() !== z && 1 === x.parent().children().length) return h(x.parent(), z);
                            if (y.match(e) && !x.hasClass("ta-bind")) {
                                if ("ol" === y || "ul" === y) return h(x, z);
                                var A = !1;
                                return angular.forEach(x.children(), function(a) {
                                    a.tagName.match(e) && (A = !0);
                                }), A ? i(x.children(), x, z) : i([ angular.element("<div>" + u.innerHTML + "</div>")[0] ], x, z);
                            }
                            if (y.match(e)) {
                                if (r = a.getOnlySelectedElements(), 0 === r.length) p = angular.element("<" + z + "><li>" + u.innerHTML + "</li></" + z + ">"), 
                                x.html(""), x.append(p); else {
                                    if (1 === r.length && ("ol" === r[0].tagName.toLowerCase() || "ul" === r[0].tagName.toLowerCase())) return r[0].tagName.toLowerCase() === z ? d(angular.element(r[0]), g) : h(angular.element(r[0]), z);
                                    q = "";
                                    var B = [];
                                    for (o = 0; o < r.length; o++) if (3 !== r[o].nodeType) {
                                        var C = angular.element(r[o]);
                                        if ("li" === r[o].tagName.toLowerCase()) continue;
                                        q += "ol" === r[o].tagName.toLowerCase() || "ul" === r[o].tagName.toLowerCase() ? C[0].innerHTML : "span" !== r[o].tagName.toLowerCase() || "ol" !== r[o].childNodes[0].tagName.toLowerCase() && "ul" !== r[o].childNodes[0].tagName.toLowerCase() ? "<" + b("li") + ">" + C[0].innerHTML + "</" + b("li") + ">" : C[0].childNodes[0].innerHTML, 
                                        B.unshift(C);
                                    }
                                    p = angular.element("<" + z + ">" + q + "</" + z + ">"), B.pop().replaceWith(p), 
                                    angular.forEach(B, function(a) {
                                        a.remove();
                                    });
                                }
                                return void a.setSelectionToElementEnd(p[0]);
                            }
                        } else {
                            if ("formatblock" === k.toLowerCase()) {
                                for (t = m.toLowerCase().replace(/[<>]/gi, ""), "default" === t.trim() && (t = g, 
                                m = "<" + g + ">"), p = "li" === y ? x.parent() : x; !p[0].tagName || !p[0].tagName.match(e) && !p.parent().attr("contenteditable"); ) p = p.parent(), 
                                y = (p[0].tagName || "").toLowerCase();
                                if (y === t) {
                                    r = p.children();
                                    var D = !1;
                                    for (o = 0; o < r.length; o++) D = D || r[o].tagName.match(e);
                                    D ? (p.after(r), s = p.next(), p.remove(), p = s) : (v.append(p[0].childNodes), 
                                    p.after(v), p.remove(), p = v);
                                } else if (p.parent()[0].tagName.toLowerCase() !== t || p.parent().hasClass("ta-bind")) if (y.match(f)) p.wrap(m); else {
                                    for (r = a.getOnlySelectedElements(), 0 === r.length && (r = [ p[0] ]), o = 0; o < r.length; o++) if (3 === r[o].nodeType || !r[o].tagName.match(e)) for (;3 === r[o].nodeType || !r[o].tagName || !r[o].tagName.match(e); ) r[o] = r[o].parentNode;
                                    if (angular.element(r[0]).hasClass("ta-bind")) p = angular.element(m), p[0].innerHTML = r[0].innerHTML, 
                                    r[0].innerHTML = p[0].outerHTML; else if ("blockquote" === t) {
                                        for (q = "", o = 0; o < r.length; o++) q += r[o].outerHTML;
                                        for (p = angular.element(m), p[0].innerHTML = q, r[0].parentNode.insertBefore(p[0], r[0]), 
                                        o = r.length - 1; o >= 0; o--) r[o].parentNode && r[o].parentNode.removeChild(r[o]);
                                    } else for (o = 0; o < r.length; o++) p = angular.element(m), p[0].innerHTML = r[o].innerHTML, 
                                    r[o].parentNode.insertBefore(p[0], r[o]), r[o].parentNode.removeChild(r[o]);
                                } else {
                                    var E = p.parent(), F = E.contents();
                                    for (o = 0; o < F.length; o++) E.parent().hasClass("ta-bind") && 3 === F[o].nodeType && (v = angular.element("<" + g + ">"), 
                                    v[0].innerHTML = F[o].outerHTML, F[o] = v[0]), E.parent()[0].insertBefore(F[o], E[0]);
                                    E.remove();
                                }
                                return void a.setSelectionToElementEnd(p[0]);
                            }
                            if ("createlink" === k.toLowerCase()) {
                                var G = '<a href="' + m + '" target="' + (n.a.target ? n.a.target : "") + '">', H = "</a>", I = a.getSelection();
                                if (I.collapsed) a.insertHtml(G + m + H, j); else if (rangy.getSelection().getRangeAt(0).canSurroundContents()) {
                                    var J = angular.element(G + H)[0];
                                    rangy.getSelection().getRangeAt(0).surroundContents(J);
                                }
                                return;
                            }
                            if ("inserthtml" === k.toLowerCase()) return void a.insertHtml(m, j);
                        }
                    }
                    try {
                        c[0].execCommand(k, l, m);
                    } catch (w) {}
                };
            };
        } ]).service("taSelection", [ "$window", "$document", "taDOM", function(a, b, c) {
            var d = b[0], f = a.rangy, h = function(a, b) {
                return a.tagName && a.tagName.match(/^br$/i) && 0 === b && !a.previousSibling ? {
                    element: a.parentNode,
                    offset: 0
                } : {
                    element: a,
                    offset: b
                };
            }, i = {
                getSelection: function() {
                    var a = f.getSelection().getRangeAt(0), b = a.commonAncestorContainer, c = {
                        start: h(a.startContainer, a.startOffset),
                        end: h(a.endContainer, a.endOffset),
                        collapsed: a.collapsed
                    };
                    return b = 3 === b.nodeType ? b.parentNode : b, c.container = b.parentNode === c.start.element || b.parentNode === c.end.element ? b.parentNode : b, 
                    c;
                },
                getOnlySelectedElements: function() {
                    var a = f.getSelection().getRangeAt(0), b = a.commonAncestorContainer;
                    return b = 3 === b.nodeType ? b.parentNode : b, a.getNodes([ 1 ], function(a) {
                        return a.parentNode === b;
                    });
                },
                getSelectionElement: function() {
                    return i.getSelection().container;
                },
                setSelection: function(a, b, c) {
                    var d = f.createRange();
                    d.setStart(a, b), d.setEnd(a, c), f.getSelection().setSingleRange(d);
                },
                setSelectionBeforeElement: function(a) {
                    var b = f.createRange();
                    b.selectNode(a), b.collapse(!0), f.getSelection().setSingleRange(b);
                },
                setSelectionAfterElement: function(a) {
                    var b = f.createRange();
                    b.selectNode(a), b.collapse(!1), f.getSelection().setSingleRange(b);
                },
                setSelectionToElementStart: function(a) {
                    var b = f.createRange();
                    b.selectNodeContents(a), b.collapse(!0), f.getSelection().setSingleRange(b);
                },
                setSelectionToElementEnd: function(a) {
                    var b = f.createRange();
                    b.selectNodeContents(a), b.collapse(!1), a.childNodes && a.childNodes[a.childNodes.length - 1] && "br" === a.childNodes[a.childNodes.length - 1].nodeName && (b.startOffset = b.endOffset = b.startOffset - 1), 
                    f.getSelection().setSingleRange(b);
                },
                insertHtml: function(a, b) {
                    var h, j, k, l, m, n, o, p = angular.element("<div>" + a + "</div>"), q = f.getSelection().getRangeAt(0), r = d.createDocumentFragment(), s = p[0].childNodes, t = !0;
                    if (s.length > 0) {
                        for (l = [], k = 0; k < s.length; k++) "p" === s[k].nodeName.toLowerCase() && "" === s[k].innerHTML.trim() || 3 === s[k].nodeType && "" === s[k].nodeValue.trim() || (t = t && !e.test(s[k].nodeName), 
                        l.push(s[k]));
                        for (var u = 0; u < l.length; u++) n = r.appendChild(l[u]);
                        !t && q.collapsed && /^(|<br(|\/)>)$/i.test(q.startContainer.innerHTML) && q.selectNode(q.startContainer);
                    } else t = !0, n = r = d.createTextNode(a);
                    if (t) q.deleteContents(); else if (q.collapsed && q.startContainer !== b) if (q.startContainer.innerHTML && q.startContainer.innerHTML.match(/^<[^>]*>$/i)) h = q.startContainer, 
                    1 === q.startOffset ? (q.setStartAfter(h), q.setEndAfter(h)) : (q.setStartBefore(h), 
                    q.setEndBefore(h)); else {
                        if (3 === q.startContainer.nodeType && q.startContainer.parentNode !== b) for (h = q.startContainer.parentNode, 
                        j = h.cloneNode(), c.splitNodes(h.childNodes, h, j, q.startContainer, q.startOffset); !g.test(h.nodeName); ) {
                            angular.element(h).after(j), h = h.parentNode;
                            var v = j;
                            j = h.cloneNode(), c.splitNodes(h.childNodes, h, j, v);
                        } else h = q.startContainer, j = h.cloneNode(), c.splitNodes(h.childNodes, h, j, void 0, void 0, q.startOffset);
                        if (angular.element(h).after(j), q.setStartAfter(h), q.setEndAfter(h), /^(|<br(|\/)>)$/i.test(h.innerHTML.trim()) && (q.setStartBefore(h), 
                        q.setEndBefore(h), angular.element(h).remove()), /^(|<br(|\/)>)$/i.test(j.innerHTML.trim()) && angular.element(j).remove(), 
                        "li" === h.nodeName.toLowerCase()) {
                            for (o = d.createDocumentFragment(), m = 0; m < r.childNodes.length; m++) p = angular.element("<li>"), 
                            c.transferChildNodes(r.childNodes[m], p[0]), c.transferNodeAttributes(r.childNodes[m], p[0]), 
                            o.appendChild(p[0]);
                            r = o, n && (n = r.childNodes[r.childNodes.length - 1], n = n.childNodes[n.childNodes.length - 1]);
                        }
                    } else q.deleteContents();
                    q.insertNode(r), n && i.setSelectionToElementEnd(n);
                }
            };
            return i;
        } ]).service("taDOM", function() {
            var a = {
                getByAttribute: function(b, c) {
                    var d = [], e = b.children();
                    return e.length && angular.forEach(e, function(b) {
                        d = d.concat(a.getByAttribute(angular.element(b), c));
                    }), void 0 !== b.attr(c) && d.push(b), d;
                },
                transferChildNodes: function(a, b) {
                    for (b.innerHTML = ""; a.childNodes.length > 0; ) b.appendChild(a.childNodes[0]);
                    return b;
                },
                splitNodes: function(b, c, d, e, f, g) {
                    if (!e && isNaN(g)) throw new Error("taDOM.splitNodes requires a splitNode or splitIndex");
                    for (var h = document.createDocumentFragment(), i = document.createDocumentFragment(), j = 0; b.length > 0 && (isNaN(g) || g !== j) && b[0] !== e; ) h.appendChild(b[0]), 
                    j++;
                    for (!isNaN(f) && f >= 0 && b[0] && (h.appendChild(document.createTextNode(b[0].nodeValue.substring(0, f))), 
                    b[0].nodeValue = b[0].nodeValue.substring(f)); b.length > 0; ) i.appendChild(b[0]);
                    a.transferChildNodes(h, c), a.transferChildNodes(i, d);
                },
                transferNodeAttributes: function(a, b) {
                    for (var c = 0; c < a.attributes.length; c++) b.setAttribute(a.attributes[c].name, a.attributes[c].value);
                    return b;
                }
            };
            return a;
        }), angular.module("textAngular.validators", []).directive("taMaxText", function() {
            return {
                restrict: "A",
                require: "ngModel",
                link: function(a, b, c, d) {
                    var e = parseInt(a.$eval(c.taMaxText));
                    if (isNaN(e)) throw "Max text must be an integer";
                    c.$observe("taMaxText", function(a) {
                        if (e = parseInt(a), isNaN(e)) throw "Max text must be an integer";
                        d.$dirty && d.$validate();
                    }), d.$validators.taMaxText = function(a) {
                        var b = angular.element("<div/>");
                        return b.html(a), b.text().length <= e;
                    };
                }
            };
        }).directive("taMinText", function() {
            return {
                restrict: "A",
                require: "ngModel",
                link: function(a, b, c, d) {
                    var e = parseInt(a.$eval(c.taMinText));
                    if (isNaN(e)) throw "Min text must be an integer";
                    c.$observe("taMinText", function(a) {
                        if (e = parseInt(a), isNaN(e)) throw "Min text must be an integer";
                        d.$dirty && d.$validate();
                    }), d.$validators.taMinText = function(a) {
                        var b = angular.element("<div/>");
                        return b.html(a), !b.text().length || b.text().length >= e;
                    };
                }
            };
        }), angular.module("textAngular.taBind", [ "textAngular.factories", "textAngular.DOM" ]).service("_taBlankTest", [ function() {
            var a = /<(a|abbr|acronym|bdi|bdo|big|cite|code|del|dfn|img|ins|kbd|label|map|mark|q|ruby|rp|rt|s|samp|time|tt|var)[^>]*(>|$)/i;
            return function(b) {
                return function(c) {
                    if (!c) return !0;
                    var d, e = /(^[^<]|>)[^<]/i.exec(c);
                    return e ? d = e.index : (c = c.toString().replace(/="[^"]*"/i, "").replace(/="[^"]*"/i, "").replace(/="[^"]*"/i, "").replace(/="[^"]*"/i, ""), 
                    d = c.indexOf(">")), c = c.trim().substring(d, d + 100), /^[^<>]+$/i.test(c) ? !1 : 0 === c.length || c === b || /^>(\s|&nbsp;)*<\/[^>]+>$/gi.test(c) ? !0 : />\s*[^\s<]/i.test(c) || a.test(c) ? !1 : !0;
                };
            };
        } ]).directive("taButton", [ function() {
            return {
                link: function(a, b) {
                    b.attr("unselectable", "on"), b.on("mousedown", function(a, b) {
                        return b && angular.extend(a, b), a.preventDefault(), !1;
                    });
                }
            };
        } ]).directive("taBind", [ "taSanitize", "$timeout", "$window", "$document", "taFixChrome", "taBrowserTag", "taSelection", "taSelectableElements", "taApplyCustomRenderers", "taOptions", "_taBlankTest", "$parse", "taDOM", function(a, b, f, h, k, l, m, n, o, q, r, s, t) {
            return {
                priority: 2,
                require: [ "ngModel", "?ngModelOptions" ],
                link: function(l, u, v, w) {
                    var x, y, z, A, B = w[0], C = w[1] || {}, D = void 0 !== u.attr("contenteditable") && u.attr("contenteditable"), E = D || "textarea" === u[0].tagName.toLowerCase() || "input" === u[0].tagName.toLowerCase(), F = !1, G = !1, H = !1, I = v.taUnsafeSanitizer || q.disableSanitizer, J = /^(9|19|20|27|33|34|35|36|37|38|39|40|45|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/i, K = /^(8|13|32|46|59|61|107|109|186|187|188|189|190|191|192|219|220|221|222)$/i;
                    void 0 === v.taDefaultWrap && (v.taDefaultWrap = "p"), "" === v.taDefaultWrap ? (z = "", 
                    A = void 0 === c.ie ? "<div><br></div>" : c.ie >= 11 ? "<p><br></p>" : c.ie <= 8 ? "<P>&nbsp;</P>" : "<p>&nbsp;</p>") : (z = void 0 === c.ie || c.ie >= 11 ? "<" + v.taDefaultWrap + "><br></" + v.taDefaultWrap + ">" : c.ie <= 8 ? "<" + v.taDefaultWrap.toUpperCase() + "></" + v.taDefaultWrap.toUpperCase() + ">" : "<" + v.taDefaultWrap + "></" + v.taDefaultWrap + ">", 
                    A = void 0 === c.ie || c.ie >= 11 ? "<" + v.taDefaultWrap + "><br></" + v.taDefaultWrap + ">" : c.ie <= 8 ? "<" + v.taDefaultWrap.toUpperCase() + ">&nbsp;</" + v.taDefaultWrap.toUpperCase() + ">" : "<" + v.taDefaultWrap + ">&nbsp;</" + v.taDefaultWrap + ">"), 
                    C.$options || (C.$options = {});
                    var L = r(A), M = function(a) {
                        if (L(a)) return a;
                        var b = angular.element("<div>" + a + "</div>");
                        if (0 === b.children().length) a = "<" + v.taDefaultWrap + ">" + a + "</" + v.taDefaultWrap + ">"; else {
                            var c, d = b[0].childNodes, f = !1;
                            for (c = 0; c < d.length && !(f = d[c].nodeName.toLowerCase().match(e)); c++) ;
                            if (f) for (a = "", c = 0; c < d.length; c++) if (d[c].nodeName.toLowerCase().match(e)) a += d[c].outerHTML; else {
                                var g = d[c].outerHTML || d[c].nodeValue;
                                a += "" !== g.trim() ? "<" + v.taDefaultWrap + ">" + g + "</" + v.taDefaultWrap + ">" : g;
                            } else a = "<" + v.taDefaultWrap + ">" + a + "</" + v.taDefaultWrap + ">";
                        }
                        return a;
                    };
                    v.taPaste && (y = s(v.taPaste)), u.addClass("ta-bind");
                    var N;
                    l["$undoManager" + (v.id || "")] = B.$undoManager = {
                        _stack: [],
                        _index: 0,
                        _max: 1e3,
                        push: function(a) {
                            return "undefined" == typeof a || null === a || "undefined" != typeof this.current() && null !== this.current() && a === this.current() ? a : (this._index < this._stack.length - 1 && (this._stack = this._stack.slice(0, this._index + 1)), 
                            this._stack.push(a), N && b.cancel(N), this._stack.length > this._max && this._stack.shift(), 
                            this._index = this._stack.length - 1, a);
                        },
                        undo: function() {
                            return this.setToIndex(this._index - 1);
                        },
                        redo: function() {
                            return this.setToIndex(this._index + 1);
                        },
                        setToIndex: function(a) {
                            return 0 > a || a > this._stack.length - 1 ? void 0 : (this._index = a, this.current());
                        },
                        current: function() {
                            return this._stack[this._index];
                        }
                    };
                    var O, P = l["$undoTaBind" + (v.id || "")] = function() {
                        if (!F && D) {
                            var a = B.$undoManager.undo();
                            "undefined" != typeof a && null !== a && (cb(a), S(a, !1), O && b.cancel(O), O = b(function() {
                                u[0].focus(), m.setSelectionToElementEnd(u[0]);
                            }, 1));
                        }
                    }, Q = l["$redoTaBind" + (v.id || "")] = function() {
                        if (!F && D) {
                            var a = B.$undoManager.redo();
                            "undefined" != typeof a && null !== a && (cb(a), S(a, !1), O && b.cancel(O), O = b(function() {
                                u[0].focus(), m.setSelectionToElementEnd(u[0]);
                            }, 1));
                        }
                    }, R = function() {
                        if (D) return u[0].innerHTML;
                        if (E) return u.val();
                        throw "textAngular Error: attempting to update non-editable taBind";
                    }, S = function(a, b, c) {
                        H = c || !1, ("undefined" == typeof b || null === b) && (b = !0 && D), ("undefined" == typeof a || null === a) && (a = R()), 
                        L(a) ? ("" !== B.$viewValue && B.$setViewValue(""), b && "" !== B.$undoManager.current() && B.$undoManager.push("")) : (bb(), 
                        B.$viewValue !== a && (B.$setViewValue(a), b && B.$undoManager.push(a))), B.$render();
                    };
                    l["updateTaBind" + (v.id || "")] = function() {
                        F || S(void 0, void 0, !0);
                    };
                    var T = function(b) {
                        return B.$oldViewValue = a(k(b), B.$oldViewValue, I);
                    };
                    if (u.attr("required") && (B.$validators.required = function(a, b) {
                        return !L(a || b);
                    }), B.$parsers.push(T), B.$parsers.unshift(M), B.$formatters.push(T), B.$formatters.unshift(M), 
                    B.$formatters.unshift(function(a) {
                        return B.$undoManager.push(a || "");
                    }), E) if (l.events = {}, D) {
                        var U = !1, V = function(c) {
                            if (c && c.trim().length) {
                                if (c.match(/class=["']*Mso(Normal|List)/i)) {
                                    var d = c.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);
                                    d = d ? d[1] : c, d = d.replace(/<o:p>[\s\S]*?<\/o:p>/gi, "").replace(/class=(["']|)MsoNormal(["']|)/gi, "");
                                    var e = angular.element("<div>" + d + "</div>"), f = angular.element("<div></div>"), g = {
                                        element: null,
                                        lastIndent: [],
                                        lastLi: null,
                                        isUl: !1
                                    };
                                    g.lastIndent.peek = function() {
                                        var a = this.length;
                                        return a > 0 ? this[a - 1] : void 0;
                                    };
                                    for (var h = function(a) {
                                        g.isUl = a, g.element = angular.element(a ? "<ul>" : "<ol>"), g.lastIndent = [], 
                                        g.lastIndent.peek = function() {
                                            var a = this.length;
                                            return a > 0 ? this[a - 1] : void 0;
                                        }, g.lastLevelMatch = null;
                                    }, i = 0; i <= e[0].childNodes.length; i++) if (e[0].childNodes[i] && "#text" !== e[0].childNodes[i].nodeName && "p" === e[0].childNodes[i].tagName.toLowerCase()) {
                                        var j = angular.element(e[0].childNodes[i]), k = (j.attr("class") || "").match(/MsoList(Bullet|Number|Paragraph)(CxSp(First|Middle|Last)|)/i);
                                        if (k) {
                                            if (j[0].childNodes.length < 2 || j[0].childNodes[1].childNodes.length < 1) continue;
                                            var n = "bullet" === k[1].toLowerCase() || "number" !== k[1].toLowerCase() && !(/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(j[0].childNodes[1].innerHTML) || /^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(j[0].childNodes[1].childNodes[0].innerHTML)), o = (j.attr("style") || "").match(/margin-left:([\-\.0-9]*)/i), p = parseFloat(o ? o[1] : 0), q = (j.attr("style") || "").match(/mso-list:l([0-9]+) level([0-9]+) lfo[0-9+]($|;)/i);
                                            if (q && q[2] && (p = parseInt(q[2])), q && (!g.lastLevelMatch || q[1] !== g.lastLevelMatch[1]) || !k[3] || "first" === k[3].toLowerCase() || null === g.lastIndent.peek() || g.isUl !== n && g.lastIndent.peek() === p) h(n), 
                                            f.append(g.element); else if (null != g.lastIndent.peek() && g.lastIndent.peek() < p) g.element = angular.element(n ? "<ul>" : "<ol>"), 
                                            g.lastLi.append(g.element); else if (null != g.lastIndent.peek() && g.lastIndent.peek() > p) {
                                                for (;null != g.lastIndent.peek() && g.lastIndent.peek() > p; ) if ("li" !== g.element.parent()[0].tagName.toLowerCase()) {
                                                    if (!/[uo]l/i.test(g.element.parent()[0].tagName.toLowerCase())) break;
                                                    g.element = g.element.parent(), g.lastIndent.pop();
                                                } else g.element = g.element.parent();
                                                g.isUl = "ul" === g.element[0].tagName.toLowerCase(), n !== g.isUl && (h(n), f.append(g.element));
                                            }
                                            g.lastLevelMatch = q, p !== g.lastIndent.peek() && g.lastIndent.push(p), g.lastLi = angular.element("<li>"), 
                                            g.element.append(g.lastLi), g.lastLi.html(j.html().replace(/<!(--|)\[if !supportLists\](--|)>[\s\S]*?<!(--|)\[endif\](--|)>/gi, "")), 
                                            j.remove();
                                        } else h(!1), f.append(j);
                                    }
                                    var r = function(a) {
                                        a = angular.element(a);
                                        for (var b = a[0].childNodes.length - 1; b >= 0; b--) a.after(a[0].childNodes[b]);
                                        a.remove();
                                    };
                                    angular.forEach(f.find("span"), function(a) {
                                        a.removeAttribute("lang"), a.attributes.length <= 0 && r(a);
                                    }), angular.forEach(f.find("font"), r), c = f.html();
                                } else {
                                    if (c = c.replace(/<(|\/)meta[^>]*?>/gi, ""), c.match(/<[^>]*?(ta-bind)[^>]*?>/)) {
                                        if (c.match(/<[^>]*?(text-angular)[^>]*?>/)) {
                                            var s = angular.element("<div>" + c + "</div>");
                                            s.find("textarea").remove();
                                            for (var v = t.getByAttribute(s, "ta-bind"), w = 0; w < v.length; w++) {
                                                for (var x = v[w][0].parentNode.parentNode, z = 0; z < v[w][0].childNodes.length; z++) x.parentNode.insertBefore(v[w][0].childNodes[z], x);
                                                x.parentNode.removeChild(x);
                                            }
                                            c = s.html().replace('<br class="Apple-interchange-newline">', "");
                                        }
                                    } else c.match(/^<span/) && (c = c.replace(/<(|\/)span[^>]*?>/gi, ""));
                                    c = c.replace(/<br class="Apple-interchange-newline"[^>]*?>/gi, "").replace(/<span class="Apple-converted-space">( |&nbsp;)<\/span>/gi, "&nbsp;");
                                }
                                /<li(\s.*)?>/i.test(c) && /(<ul(\s.*)?>|<ol(\s.*)?>).*<li(\s.*)?>/i.test(c) === !1 && (c = c.replace(/<li(\s.*)?>.*<\/li(\s.*)?>/i, "<ul>$&</ul>")), 
                                y && (c = y(l, {
                                    $html: c
                                }) || c), c = a(c, "", I), m.insertHtml(c, u[0]), b(function() {
                                    B.$setViewValue(R()), U = !1, u.removeClass("processing-paste");
                                }, 0);
                            } else U = !1, u.removeClass("processing-paste");
                        };
                        u.on("paste", l.events.paste = function(a, c) {
                            if (c && angular.extend(a, c), F || U) return a.stopPropagation(), a.preventDefault(), 
                            !1;
                            U = !0, u.addClass("processing-paste");
                            var d, e = (a.originalEvent || a).clipboardData;
                            if (e && e.getData && e.types.length > 0) {
                                for (var g = "", i = 0; i < e.types.length; i++) g += " " + e.types[i];
                                return /text\/html/i.test(g) ? d = e.getData("text/html") : /text\/plain/i.test(g) && (d = e.getData("text/plain")), 
                                V(d), a.stopPropagation(), a.preventDefault(), !1;
                            }
                            var j = f.rangy.saveSelection(), k = angular.element('<div class="ta-hidden-input" contenteditable="true"></div>');
                            h.find("body").append(k), k[0].focus(), b(function() {
                                f.rangy.restoreSelection(j), V(k[0].innerHTML), u[0].focus(), k.remove();
                            }, 0);
                        }), u.on("cut", l.events.cut = function(a) {
                            F ? a.preventDefault() : b(function() {
                                B.$setViewValue(R());
                            }, 0);
                        }), u.on("keydown", l.events.keydown = function(a, b) {
                            if (b && angular.extend(a, b), !F) if (a.altKey || !a.metaKey && !a.ctrlKey) {
                                if (13 === a.keyCode && !a.shiftKey) {
                                    var c, d = m.getSelectionElement();
                                    if (!d.tagName.match(g)) return;
                                    var e = angular.element(z);
                                    if (/^<br(|\/)>$/i.test(d.innerHTML.trim()) && "blockquote" === d.parentNode.tagName.toLowerCase() && !d.nextSibling) {
                                        c = angular.element(d);
                                        var f = c.parent();
                                        f.after(e), c.remove(), 0 === f.children().length && f.remove(), m.setSelectionToElementStart(e[0]), 
                                        a.preventDefault();
                                    } else /^<[^>]+><br(|\/)><\/[^>]+>$/i.test(d.innerHTML.trim()) && "blockquote" === d.tagName.toLowerCase() && (c = angular.element(d), 
                                    c.after(e), c.remove(), m.setSelectionToElementStart(e[0]), a.preventDefault());
                                }
                            } else 90 !== a.keyCode || a.shiftKey ? (90 === a.keyCode && a.shiftKey || 89 === a.keyCode && !a.shiftKey) && (Q(), 
                            a.preventDefault()) : (P(), a.preventDefault());
                        });
                        var W;
                        if (u.on("keyup", l.events.keyup = function(a, c) {
                            if (c && angular.extend(a, c), 9 === a.keyCode) {
                                var d = m.getSelection();
                                return void (d.start.element === u[0] && u.children().length && m.setSelectionToElementStart(u.children()[0]));
                            }
                            if (N && b.cancel(N), !F && !J.test(a.keyCode)) {
                                if ("" !== z && 13 === a.keyCode && !a.shiftKey) {
                                    for (var e = m.getSelectionElement(); !e.tagName.match(g) && e !== u[0]; ) e = e.parentNode;
                                    if (e.tagName.toLowerCase() !== v.taDefaultWrap && "li" !== e.tagName.toLowerCase() && ("" === e.innerHTML.trim() || "<br>" === e.innerHTML.trim())) {
                                        var h = angular.element(z);
                                        angular.element(e).replaceWith(h), m.setSelectionToElementStart(h[0]);
                                    }
                                }
                                var i = R();
                                if ("" !== z && "" === i.trim()) cb(z), m.setSelectionToElementStart(u.children()[0]); else if ("<" !== i.substring(0, 1) && "" !== v.taDefaultWrap) {
                                    var j = f.rangy.saveSelection();
                                    i = R(), i = "<" + v.taDefaultWrap + ">" + i + "</" + v.taDefaultWrap + ">", cb(i), 
                                    f.rangy.restoreSelection(j);
                                }
                                var k = x !== a.keyCode && K.test(a.keyCode);
                                W && b.cancel(W), W = b(function() {
                                    S(i, k, !0);
                                }, C.$options.debounce || 400), k || (N = b(function() {
                                    B.$undoManager.push(i);
                                }, 250)), x = a.keyCode;
                            }
                        }), u.on("blur", l.events.blur = function() {
                            G = !1, F ? (H = !0, B.$render()) : S(void 0, void 0, !0);
                        }), v.placeholder && (c.ie > 8 || void 0 === c.ie)) {
                            var X;
                            if (!v.id) throw "textAngular Error: An unique ID is required for placeholders to work";
                            X = i("#" + v.id + ".placeholder-text:before", 'content: "' + v.placeholder + '"'), 
                            l.$on("$destroy", function() {
                                j(X);
                            });
                        }
                        u.on("focus", l.events.focus = function() {
                            G = !0, u.removeClass("placeholder-text");
                        }), u.on("mouseup", l.events.mouseup = function() {
                            var a = m.getSelection();
                            a.start.element === u[0] && u.children().length && m.setSelectionToElementStart(u.children()[0]);
                        }), u.on("mousedown", l.events.mousedown = function(a, b) {
                            b && angular.extend(a, b), a.stopPropagation();
                        });
                    } else {
                        u.on("change blur", l.events.change = l.events.blur = function() {
                            F || B.$setViewValue(R());
                        }), u.on("keydown", l.events.keydown = function(a, b) {
                            if (b && angular.extend(a, b), 9 === a.keyCode) {
                                var c = this.selectionStart, d = this.selectionEnd, e = u.val();
                                if (a.shiftKey) {
                                    var f = e.lastIndexOf("\n", c), g = e.lastIndexOf(" ", c);
                                    -1 !== g && g >= f && (u.val(e.substring(0, g) + e.substring(g + 1)), this.selectionStart = this.selectionEnd = c - 1);
                                } else u.val(e.substring(0, c) + "  " + e.substring(d)), this.selectionStart = this.selectionEnd = c + 1;
                                a.preventDefault();
                            }
                        });
                        var Y = function(a, b) {
                            for (var c = "", d = 0; b > d; d++) c += a;
                            return c;
                        }, Z = function(a, b) {
                            var c = "", d = a.childNodes;
                            b++, c += Y("   ", b - 1) + a.outerHTML.substring(0, a.outerHTML.indexOf("<li"));
                            for (var e = 0; e < d.length; e++) d[e].outerHTML && (c += "ul" === d[e].nodeName.toLowerCase() || "ol" === d[e].nodeName.toLowerCase() ? "\n" + Z(d[e], b) : "\n" + Y("    ", b) + d[e].outerHTML);
                            return c += "\n" + Y("  ", b - 1) + a.outerHTML.substring(a.outerHTML.lastIndexOf("<"));
                        };
                        B.$formatters.unshift(function(a) {
                            var b = angular.element("<div>" + a + "</div>")[0].childNodes;
                            if (b.length > 0) {
                                a = "";
                                for (var c = 0; c < b.length; c++) b[c].outerHTML && (a.length > 0 && (a += "\n"), 
                                a += "ul" === b[c].nodeName.toLowerCase() || "ol" === b[c].nodeName.toLowerCase() ? "" + Z(b[c], 0) : "" + b[c].outerHTML);
                            }
                            return a;
                        });
                    }
                    var $, _ = function(a) {
                        return l.$emit("ta-element-select", this), a.preventDefault(), !1;
                    }, ab = function(a, c) {
                        if (c && angular.extend(a, c), !p && !F) {
                            p = !0;
                            var d;
                            d = a.originalEvent ? a.originalEvent.dataTransfer : a.dataTransfer, l.$emit("ta-drop-event", this, a, d), 
                            b(function() {
                                p = !1, S(void 0, void 0, !0);
                            }, 100);
                        }
                    }, bb = l["reApplyOnSelectorHandlers" + (v.id || "")] = function() {
                        F || angular.forEach(n, function(a) {
                            u.find(a).off("click", _).on("click", _);
                        });
                    }, cb = function(a) {
                        u[0].innerHTML = a;
                    }, db = !1;
                    B.$render = function() {
                        if (!db) {
                            db = !0;
                            var a = B.$viewValue || "";
                            H || (D && G && (u.removeClass("placeholder-text"), $ && b.cancel($), $ = b(function() {
                                G || (u[0].focus(), m.setSelectionToElementEnd(u.children()[u.children().length - 1])), 
                                $ = void 0;
                            }, 1)), D ? (cb(v.placeholder ? "" === a ? z : a : "" === a ? z : a), F ? u.off("drop", ab) : (bb(), 
                            u.on("drop", ab))) : "textarea" !== u[0].tagName.toLowerCase() && "input" !== u[0].tagName.toLowerCase() ? cb(o(a)) : u.val(a)), 
                            D && v.placeholder && ("" === a ? G ? u.removeClass("placeholder-text") : u.addClass("placeholder-text") : u.removeClass("placeholder-text")), 
                            db = H = !1;
                        }
                    }, v.taReadonly && (F = l.$eval(v.taReadonly), F ? (u.addClass("ta-readonly"), ("textarea" === u[0].tagName.toLowerCase() || "input" === u[0].tagName.toLowerCase()) && u.attr("disabled", "disabled"), 
                    void 0 !== u.attr("contenteditable") && u.attr("contenteditable") && u.removeAttr("contenteditable")) : (u.removeClass("ta-readonly"), 
                    "textarea" === u[0].tagName.toLowerCase() || "input" === u[0].tagName.toLowerCase() ? u.removeAttr("disabled") : D && u.attr("contenteditable", "true")), 
                    l.$watch(v.taReadonly, function(a, b) {
                        b !== a && (a ? (u.addClass("ta-readonly"), ("textarea" === u[0].tagName.toLowerCase() || "input" === u[0].tagName.toLowerCase()) && u.attr("disabled", "disabled"), 
                        void 0 !== u.attr("contenteditable") && u.attr("contenteditable") && u.removeAttr("contenteditable"), 
                        angular.forEach(n, function(a) {
                            u.find(a).on("click", _);
                        }), u.off("drop", ab)) : (u.removeClass("ta-readonly"), "textarea" === u[0].tagName.toLowerCase() || "input" === u[0].tagName.toLowerCase() ? u.removeAttr("disabled") : D && u.attr("contenteditable", "true"), 
                        angular.forEach(n, function(a) {
                            u.find(a).off("click", _);
                        }), u.on("drop", ab)), F = a);
                    })), D && !F && (angular.forEach(n, function(a) {
                        u.find(a).on("click", _);
                    }), u.on("drop", ab), u.on("blur", function() {
                        c.webkit && (d = !0);
                    }));
                }
            };
        } ]);
        var p = !1, q = angular.module("textAngular", [ "ngSanitize", "textAngularSetup", "textAngular.factories", "textAngular.DOM", "textAngular.validators", "textAngular.taBind" ]), r = {};
        q.constant("taRegisterTool", b), q.value("taTools", r), q.config([ function() {
            angular.forEach(r, function(a, b) {
                delete r[b];
            });
        } ]), q.run([ function() {
            if (!window.rangy) throw "rangy-core.js and rangy-selectionsaverestore.js are required for textAngular to work correctly, rangy-core is not yet loaded.";
            if (window.rangy.init(), !window.rangy.saveSelection) throw "rangy-selectionsaverestore.js is required for textAngular to work correctly.";
        } ]), q.directive("textAngular", [ "$compile", "$timeout", "taOptions", "taSelection", "taExecCommand", "textAngularManager", "$window", "$document", "$animate", "$log", "$q", "$parse", function(a, b, c, d, e, f, g, h, i, j, k, l) {
            return {
                require: "?ngModel",
                scope: {},
                restrict: "EA",
                priority: 2,
                link: function(m, n, o, p) {
                    var q, r, s, t, u, v, w, x, y, z, A, B = o.serial ? o.serial : Math.floor(1e16 * Math.random());
                    m._name = o.name ? o.name : "textAngularEditor" + B;
                    var C = function(a, c, d) {
                        b(function() {
                            var b = function() {
                                a.off(c, b), d.apply(this, arguments);
                            };
                            a.on(c, b);
                        }, 100);
                    };
                    if (y = e(o.taDefaultWrap), angular.extend(m, angular.copy(c), {
                        wrapSelection: function(a, b, c) {
                            "undo" === a.toLowerCase() ? m["$undoTaBindtaTextElement" + B]() : "redo" === a.toLowerCase() ? m["$redoTaBindtaTextElement" + B]() : (y(a, !1, b, m.defaultTagAttributes), 
                            c && m["reApplyOnSelectorHandlerstaTextElement" + B](), m.displayElements.text[0].focus());
                        },
                        showHtml: m.$eval(o.taShowHtml) || !1
                    }), o.taFocussedClass && (m.classes.focussed = o.taFocussedClass), o.taTextEditorClass && (m.classes.textEditor = o.taTextEditorClass), 
                    o.taHtmlEditorClass && (m.classes.htmlEditor = o.taHtmlEditorClass), o.taDefaultTagAttributes) try {
                        angular.extend(m.defaultTagAttributes, angular.fromJson(o.taDefaultTagAttributes));
                    } catch (D) {
                        j.error(D);
                    }
                    o.taTextEditorSetup && (m.setup.textEditorSetup = m.$parent.$eval(o.taTextEditorSetup)), 
                    o.taHtmlEditorSetup && (m.setup.htmlEditorSetup = m.$parent.$eval(o.taHtmlEditorSetup)), 
                    m.fileDropHandler = o.taFileDrop ? m.$parent.$eval(o.taFileDrop) : m.defaultFileDropHandler, 
                    w = n[0].innerHTML, n[0].innerHTML = "", m.displayElements = {
                        forminput: angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),
                        html: angular.element("<textarea></textarea>"),
                        text: angular.element("<div></div>"),
                        scrollWindow: angular.element("<div class='ta-scroll-window'></div>"),
                        popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),
                        popoverArrow: angular.element('<div class="arrow"></div>'),
                        popoverContainer: angular.element('<div class="popover-content"></div>'),
                        resize: {
                            overlay: angular.element('<div class="ta-resizer-handle-overlay"></div>'),
                            background: angular.element('<div class="ta-resizer-handle-background"></div>'),
                            anchors: [ angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>') ],
                            info: angular.element('<div class="ta-resizer-handle-info"></div>')
                        }
                    }, m.displayElements.popover.append(m.displayElements.popoverArrow), m.displayElements.popover.append(m.displayElements.popoverContainer), 
                    m.displayElements.scrollWindow.append(m.displayElements.popover), m.displayElements.popover.on("mousedown", function(a, b) {
                        return b && angular.extend(a, b), a.preventDefault(), !1;
                    }), m.showPopover = function(a) {
                        m.displayElements.popover.css("display", "block"), m.reflowPopover(a), i.addClass(m.displayElements.popover, "in"), 
                        C(h.find("body"), "click keyup", function() {
                            m.hidePopover();
                        });
                    }, m.reflowPopover = function(a) {
                        m.displayElements.text[0].offsetHeight - 51 > a[0].offsetTop ? (m.displayElements.popover.css("top", a[0].offsetTop + a[0].offsetHeight + m.displayElements.scrollWindow[0].scrollTop + "px"), 
                        m.displayElements.popover.removeClass("top").addClass("bottom")) : (m.displayElements.popover.css("top", a[0].offsetTop - 54 + m.displayElements.scrollWindow[0].scrollTop + "px"), 
                        m.displayElements.popover.removeClass("bottom").addClass("top"));
                        var b = m.displayElements.text[0].offsetWidth - m.displayElements.popover[0].offsetWidth, c = a[0].offsetLeft + a[0].offsetWidth / 2 - m.displayElements.popover[0].offsetWidth / 2;
                        m.displayElements.popover.css("left", Math.max(0, Math.min(b, c)) + "px"), m.displayElements.popoverArrow.css("margin-left", Math.min(c, Math.max(0, c - b)) - 11 + "px");
                    }, m.hidePopover = function() {
                        var a = function() {
                            m.displayElements.popover.css("display", ""), m.displayElements.popoverContainer.attr("style", ""), 
                            m.displayElements.popoverContainer.attr("class", "popover-content");
                        };
                        k.when(i.removeClass(m.displayElements.popover, "in", a)).then(a);
                    }, m.displayElements.resize.overlay.append(m.displayElements.resize.background), 
                    angular.forEach(m.displayElements.resize.anchors, function(a) {
                        m.displayElements.resize.overlay.append(a);
                    }), m.displayElements.resize.overlay.append(m.displayElements.resize.info), m.displayElements.scrollWindow.append(m.displayElements.resize.overlay), 
                    m.reflowResizeOverlay = function(a) {
                        a = angular.element(a)[0], m.displayElements.resize.overlay.css({
                            display: "block",
                            left: a.offsetLeft - 5 + "px",
                            top: a.offsetTop - 5 + "px",
                            width: a.offsetWidth + 10 + "px",
                            height: a.offsetHeight + 10 + "px"
                        }), m.displayElements.resize.info.text(a.offsetWidth + " x " + a.offsetHeight);
                    }, m.showResizeOverlay = function(a) {
                        var b = h.find("body");
                        z = function(c) {
                            var d = {
                                width: parseInt(a.attr("width")),
                                height: parseInt(a.attr("height")),
                                x: c.clientX,
                                y: c.clientY
                            };
                            (void 0 === d.width || isNaN(d.width)) && (d.width = a[0].offsetWidth), (void 0 === d.height || isNaN(d.height)) && (d.height = a[0].offsetHeight), 
                            m.hidePopover();
                            var e = d.height / d.width, f = function(b) {
                                var c = {
                                    x: Math.max(0, d.width + (b.clientX - d.x)),
                                    y: Math.max(0, d.height + (b.clientY - d.y))
                                };
                                if (b.shiftKey) {
                                    var f = c.y / c.x;
                                    c.x = e > f ? c.x : c.y / e, c.y = e > f ? c.x * e : c.y;
                                }
                                var g = angular.element(a);
                                g.attr("height", Math.max(0, c.y)), g.attr("width", Math.max(0, c.x)), m.reflowResizeOverlay(a);
                            };
                            b.on("mousemove", f), C(b, "mouseup", function(c) {
                                c.preventDefault(), c.stopPropagation(), b.off("mousemove", f), m.showPopover(a);
                            }), c.stopPropagation(), c.preventDefault();
                        }, m.displayElements.resize.anchors[3].on("mousedown", z), m.reflowResizeOverlay(a), 
                        C(b, "click", function() {
                            m.hideResizeOverlay();
                        });
                    }, m.hideResizeOverlay = function() {
                        m.displayElements.resize.anchors[3].off("mousedown", z), m.displayElements.resize.overlay.css("display", "");
                    }, m.setup.htmlEditorSetup(m.displayElements.html), m.setup.textEditorSetup(m.displayElements.text), 
                    m.displayElements.html.attr({
                        id: "taHtmlElement" + B,
                        "ng-show": "showHtml",
                        "ta-bind": "ta-bind",
                        "ng-model": "html",
                        "ng-model-options": n.attr("ng-model-options")
                    }), m.displayElements.text.attr({
                        id: "taTextElement" + B,
                        contentEditable: "true",
                        "ta-bind": "ta-bind",
                        "ng-model": "html",
                        "ng-model-options": n.attr("ng-model-options")
                    }), m.displayElements.scrollWindow.attr({
                        "ng-hide": "showHtml"
                    }), o.taDefaultWrap && m.displayElements.text.attr("ta-default-wrap", o.taDefaultWrap), 
                    o.taUnsafeSanitizer && (m.displayElements.text.attr("ta-unsafe-sanitizer", o.taUnsafeSanitizer), 
                    m.displayElements.html.attr("ta-unsafe-sanitizer", o.taUnsafeSanitizer)), m.displayElements.scrollWindow.append(m.displayElements.text), 
                    n.append(m.displayElements.scrollWindow), n.append(m.displayElements.html), m.displayElements.forminput.attr("name", m._name), 
                    n.append(m.displayElements.forminput), o.tabindex && (n.removeAttr("tabindex"), 
                    m.displayElements.text.attr("tabindex", o.tabindex), m.displayElements.html.attr("tabindex", o.tabindex)), 
                    o.placeholder && (m.displayElements.text.attr("placeholder", o.placeholder), m.displayElements.html.attr("placeholder", o.placeholder)), 
                    o.taDisabled && (m.displayElements.text.attr("ta-readonly", "disabled"), m.displayElements.html.attr("ta-readonly", "disabled"), 
                    m.disabled = m.$parent.$eval(o.taDisabled), m.$parent.$watch(o.taDisabled, function(a) {
                        m.disabled = a, m.disabled ? n.addClass(m.classes.disabled) : n.removeClass(m.classes.disabled);
                    })), o.taPaste && (m._pasteHandler = function(a) {
                        return l(o.taPaste)(m.$parent, {
                            $html: a
                        });
                    }, m.displayElements.text.attr("ta-paste", "_pasteHandler($html)")), a(m.displayElements.scrollWindow)(m), 
                    a(m.displayElements.html)(m), m.updateTaBindtaTextElement = m["updateTaBindtaTextElement" + B], 
                    m.updateTaBindtaHtmlElement = m["updateTaBindtaHtmlElement" + B], n.addClass("ta-root"), 
                    m.displayElements.scrollWindow.addClass("ta-text ta-editor " + m.classes.textEditor), 
                    m.displayElements.html.addClass("ta-html ta-editor " + m.classes.htmlEditor), m._actionRunning = !1;
                    var E = !1;
                    if (m.startAction = function() {
                        return m._actionRunning = !0, E = g.rangy.saveSelection(), function() {
                            E && g.rangy.restoreSelection(E);
                        };
                    }, m.endAction = function() {
                        m._actionRunning = !1, E && (m.showHtml ? m.displayElements.html[0].focus() : m.displayElements.text[0].focus(), 
                        g.rangy.restoreSelection(E), g.rangy.removeMarkers(E)), E = !1, m.updateSelectedStyles(), 
                        m.showHtml || m["updateTaBindtaTextElement" + B]();
                    }, u = function() {
                        m.focussed = !0, n.addClass(m.classes.focussed), x.focus(), n.triggerHandler("focus");
                    }, m.displayElements.html.on("focus", u), m.displayElements.text.on("focus", u), 
                    v = function(a) {
                        return m._actionRunning || h[0].activeElement === m.displayElements.html[0] || h[0].activeElement === m.displayElements.text[0] || (n.removeClass(m.classes.focussed), 
                        x.unfocus(), b(function() {
                            m._bUpdateSelectedStyles = !1, n.triggerHandler("blur"), m.focussed = !1;
                        }, 0)), a.preventDefault(), !1;
                    }, m.displayElements.html.on("blur", v), m.displayElements.text.on("blur", v), m.displayElements.text.on("paste", function(a) {
                        n.triggerHandler("paste", a);
                    }), m.queryFormatBlockState = function(a) {
                        return !m.showHtml && a.toLowerCase() === h[0].queryCommandValue("formatBlock").toLowerCase();
                    }, m.queryCommandState = function(a) {
                        return m.showHtml ? "" : h[0].queryCommandState(a);
                    }, m.switchView = function() {
                        m.showHtml = !m.showHtml, i.enabled(!1, m.displayElements.html), i.enabled(!1, m.displayElements.text), 
                        m.showHtml ? b(function() {
                            return i.enabled(!0, m.displayElements.html), i.enabled(!0, m.displayElements.text), 
                            m.displayElements.html[0].focus();
                        }, 100) : b(function() {
                            return i.enabled(!0, m.displayElements.html), i.enabled(!0, m.displayElements.text), 
                            m.displayElements.text[0].focus();
                        }, 100);
                    }, o.ngModel) {
                        var F = !0;
                        p.$render = function() {
                            if (F) {
                                F = !1;
                                var a = m.$parent.$eval(o.ngModel);
                                void 0 !== a && null !== a || !w || "" === w || p.$setViewValue(w);
                            }
                            m.displayElements.forminput.val(p.$viewValue), m.html = p.$viewValue || "";
                        }, n.attr("required") && (p.$validators.required = function(a, b) {
                            var c = a || b;
                            return !(!c || "" === c.trim());
                        });
                    } else m.displayElements.forminput.val(w), m.html = w;
                    if (m.$watch("html", function(a, b) {
                        a !== b && (o.ngModel && p.$viewValue !== a && p.$setViewValue(a), m.displayElements.forminput.val(a));
                    }), o.taTargetToolbars) x = f.registerEditor(m._name, m, o.taTargetToolbars.split(",")); else {
                        var G = angular.element('<div text-angular-toolbar layout="row" layout-align="start" flex name="textAngularToolbar' + B + '">');
                        o.taToolbar && G.attr("ta-toolbar", o.taToolbar), o.taToolbarClass && G.attr("ta-toolbar-class", o.taToolbarClass), 
                        o.taToolbarGroupClass && G.attr("ta-toolbar-group-class", o.taToolbarGroupClass), 
                        o.taToolbarButtonClass && G.attr("ta-toolbar-button-class", o.taToolbarButtonClass), 
                        o.taToolbarActiveButtonClass && G.attr("ta-toolbar-active-button-class", o.taToolbarActiveButtonClass), 
                        o.taFocussedClass && G.attr("ta-focussed-class", o.taFocussedClass), n.prepend(G), 
                        a(G)(m.$parent), x = f.registerEditor(m._name, m, [ "textAngularToolbar" + B ]);
                    }
                    m.$on("$destroy", function() {
                        f.unregisterEditor(m._name);
                    }), m.$on("ta-element-select", function(a, b) {
                        x.triggerElementSelect(a, b) && m["reApplyOnSelectorHandlerstaTextElement" + B]();
                    }), m.$on("ta-drop-event", function(a, c, d, e) {
                        m.displayElements.text[0].focus(), e && e.files && e.files.length > 0 ? (angular.forEach(e.files, function(a) {
                            try {
                                k.when(m.fileDropHandler(a, m.wrapSelection) || m.fileDropHandler !== m.defaultFileDropHandler && k.when(m.defaultFileDropHandler(a, m.wrapSelection))).then(function() {
                                    m["updateTaBindtaTextElement" + B]();
                                });
                            } catch (b) {
                                j.error(b);
                            }
                        }), d.preventDefault(), d.stopPropagation()) : b(function() {
                            m["updateTaBindtaTextElement" + B]();
                        }, 0);
                    }), m._bUpdateSelectedStyles = !1, angular.element(window).on("blur", function() {
                        m._bUpdateSelectedStyles = !1, m.focussed = !1;
                    }), m.updateSelectedStyles = function() {
                        var a;
                        A && b.cancel(A), void 0 !== (a = d.getSelectionElement()) && a.parentNode !== m.displayElements.text[0] ? x.updateSelectedStyles(angular.element(a)) : x.updateSelectedStyles(), 
                        m._bUpdateSelectedStyles && (A = b(m.updateSelectedStyles, 200));
                    }, q = function() {
                        return m.focussed ? void (m._bUpdateSelectedStyles || (m._bUpdateSelectedStyles = !0, 
                        m.$apply(function() {
                            m.updateSelectedStyles();
                        }))) : void (m._bUpdateSelectedStyles = !1);
                    }, m.displayElements.html.on("keydown", q), m.displayElements.text.on("keydown", q), 
                    r = function() {
                        m._bUpdateSelectedStyles = !1;
                    }, m.displayElements.html.on("keyup", r), m.displayElements.text.on("keyup", r), 
                    s = function(a, b) {
                        b && angular.extend(a, b), m.$apply(function() {
                            return x.sendKeyCommand(a) ? (m._bUpdateSelectedStyles || m.updateSelectedStyles(), 
                            a.preventDefault(), !1) : void 0;
                        });
                    }, m.displayElements.html.on("keypress", s), m.displayElements.text.on("keypress", s), 
                    t = function() {
                        m._bUpdateSelectedStyles = !1, m.$apply(function() {
                            m.updateSelectedStyles();
                        });
                    }, m.displayElements.html.on("mouseup", t), m.displayElements.text.on("mouseup", t);
                }
            };
        } ]), q.service("textAngularManager", [ "taToolExecuteAction", "taTools", "taRegisterTool", function(a, b, c) {
            var d = {}, e = {};
            return {
                registerEditor: function(c, f, g) {
                    if (!c || "" === c) throw "textAngular Error: An editor requires a name";
                    if (!f) throw "textAngular Error: An editor requires a scope";
                    if (e[c]) throw 'textAngular Error: An Editor with name "' + c + '" already exists';
                    var h = [];
                    return angular.forEach(g, function(a) {
                        d[a] && h.push(d[a]);
                    }), e[c] = {
                        scope: f,
                        toolbars: g,
                        _registerToolbar: function(a) {
                            this.toolbars.indexOf(a.name) >= 0 && h.push(a);
                        },
                        editorFunctions: {
                            disable: function() {
                                angular.forEach(h, function(a) {
                                    a.disabled = !0;
                                });
                            },
                            enable: function() {
                                angular.forEach(h, function(a) {
                                    a.disabled = !1;
                                });
                            },
                            focus: function() {
                                angular.forEach(h, function(a) {
                                    a._parent = f, a.disabled = !1, a.focussed = !0, f.focussed = !0;
                                });
                            },
                            unfocus: function() {
                                angular.forEach(h, function(a) {
                                    a.disabled = !0, a.focussed = !1;
                                }), f.focussed = !1;
                            },
                            updateSelectedStyles: function(a) {
                                angular.forEach(h, function(b) {
                                    angular.forEach(b.tools, function(c) {
                                        c.activeState && (b._parent = f, c.active = c.activeState(a));
                                    });
                                });
                            },
                            sendKeyCommand: function(c) {
                                var d = !1;
                                return (c.ctrlKey || c.metaKey) && angular.forEach(b, function(b, e) {
                                    if (b.commandKeyCode && b.commandKeyCode === c.which) for (var g = 0; g < h.length; g++) if (void 0 !== h[g].tools[e]) {
                                        a.call(h[g].tools[e], f), d = !0;
                                        break;
                                    }
                                }), d;
                            },
                            triggerElementSelect: function(a, c) {
                                var d = function(a, b) {
                                    for (var c = !0, d = 0; d < b.length; d++) c = c && a.attr(b[d]);
                                    return c;
                                }, e = [], g = {}, i = !1;
                                c = angular.element(c);
                                var j = !1;
                                if (angular.forEach(b, function(a, b) {
                                    a.onElementSelect && a.onElementSelect.element && a.onElementSelect.element.toLowerCase() === c[0].tagName.toLowerCase() && (!a.onElementSelect.filter || a.onElementSelect.filter(c)) && (j = j || angular.isArray(a.onElementSelect.onlyWithAttrs) && d(c, a.onElementSelect.onlyWithAttrs), 
                                    (!a.onElementSelect.onlyWithAttrs || d(c, a.onElementSelect.onlyWithAttrs)) && (g[b] = a));
                                }), j ? (angular.forEach(g, function(a, b) {
                                    a.onElementSelect.onlyWithAttrs && d(c, a.onElementSelect.onlyWithAttrs) && e.push({
                                        name: b,
                                        tool: a
                                    });
                                }), e.sort(function(a, b) {
                                    return b.tool.onElementSelect.onlyWithAttrs.length - a.tool.onElementSelect.onlyWithAttrs.length;
                                })) : angular.forEach(g, function(a, b) {
                                    e.push({
                                        name: b,
                                        tool: a
                                    });
                                }), e.length > 0) for (var k = 0; k < e.length; k++) {
                                    for (var l = e[k].tool, m = e[k].name, n = 0; n < h.length; n++) if (void 0 !== h[n].tools[m]) {
                                        l.onElementSelect.action.call(h[n].tools[m], a, c, f), i = !0;
                                        break;
                                    }
                                    if (i) break;
                                }
                                return i;
                            }
                        }
                    }, e[c].editorFunctions;
                },
                retrieveEditor: function(a) {
                    return e[a];
                },
                unregisterEditor: function(a) {
                    delete e[a];
                },
                registerToolbar: function(a) {
                    if (!a) throw "textAngular Error: A toolbar requires a scope";
                    if (!a.name || "" === a.name) throw "textAngular Error: A toolbar requires a name";
                    if (d[a.name]) throw 'textAngular Error: A toolbar with name "' + a.name + '" already exists';
                    d[a.name] = a, angular.forEach(e, function(b) {
                        b._registerToolbar(a);
                    });
                },
                retrieveToolbar: function(a) {
                    return d[a];
                },
                retrieveToolbarsViaEditor: function(a) {
                    var b = [], c = this;
                    return angular.forEach(this.retrieveEditor(a).toolbars, function(a) {
                        b.push(c.retrieveToolbar(a));
                    }), b;
                },
                unregisterToolbar: function(a) {
                    delete d[a];
                },
                updateToolsDisplay: function(a) {
                    var b = this;
                    angular.forEach(a, function(a, c) {
                        b.updateToolDisplay(c, a);
                    });
                },
                resetToolsDisplay: function() {
                    var a = this;
                    angular.forEach(b, function(b, c) {
                        a.resetToolDisplay(c);
                    });
                },
                updateToolDisplay: function(a, b) {
                    var c = this;
                    angular.forEach(d, function(d, e) {
                        c.updateToolbarToolDisplay(e, a, b);
                    });
                },
                resetToolDisplay: function(a) {
                    var b = this;
                    angular.forEach(d, function(c, d) {
                        b.resetToolbarToolDisplay(d, a);
                    });
                },
                updateToolbarToolDisplay: function(a, b, c) {
                    if (!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
                    d[a].updateToolDisplay(b, c);
                },
                resetToolbarToolDisplay: function(a, c) {
                    if (!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
                    d[a].updateToolDisplay(c, b[c], !0);
                },
                removeTool: function(a) {
                    delete b[a], angular.forEach(d, function(b) {
                        delete b.tools[a];
                        for (var c = 0; c < b.toolbar.length; c++) {
                            for (var d, e = 0; e < b.toolbar[c].length; e++) {
                                if (b.toolbar[c][e] === a) {
                                    d = {
                                        group: c,
                                        index: e
                                    };
                                    break;
                                }
                                if (void 0 !== d) break;
                            }
                            void 0 !== d && (b.toolbar[d.group].slice(d.index, 1), b._$element.children().eq(d.group).children().eq(d.index).remove());
                        }
                    });
                },
                addTool: function(a, b, e, f) {
                    c(a, b), angular.forEach(d, function(c) {
                        c.addTool(a, b, e, f);
                    });
                },
                addToolToToolbar: function(a, b, e, f, g) {
                    c(a, b), d[e].addTool(a, b, f, g);
                },
                refreshEditor: function(a) {
                    if (!e[a]) throw 'textAngular Error: No Editor with name "' + a + '" exists';
                    e[a].scope.updateTaBindtaTextElement(), e[a].scope.$$phase || e[a].scope.$digest();
                }
            };
        } ]), q.directive("textAngularToolbar", [ "$compile", "textAngularManager", "taOptions", "taTools", "taToolExecuteAction", "$window", function(a, b, c, d, e, f) {
            return {
                scope: {
                    name: "@"
                },
                restrict: "EA",
                link: function(g, h, i) {
                    if (!g.name || "" === g.name) throw "textAngular Error: A toolbar requires a name";
                    angular.extend(g, angular.copy(c)), i.taToolbar && (g.toolbar = g.$parent.$eval(i.taToolbar)), 
                    i.taToolbarClass && (g.classes.toolbar = i.taToolbarClass), i.taToolbarGroupClass && (g.classes.toolbarGroup = i.taToolbarGroupClass), 
                    i.taToolbarButtonClass && (g.classes.toolbarButton = i.taToolbarButtonClass), i.taToolbarActiveButtonClass && (g.classes.toolbarButtonActive = i.taToolbarActiveButtonClass), 
                    i.taFocussedClass && (g.classes.focussed = i.taFocussedClass), g.disabled = !0, 
                    g.focussed = !1, g._$element = h, h[0].innerHTML = "", h.addClass("ta-toolbar " + g.classes.toolbar), 
                    g.$watch("focussed", function() {
                        g.focussed ? h.addClass(g.classes.focussed) : h.removeClass(g.classes.focussed);
                    });
                    var j = function(b, c) {
                        var d;
                        if (d = angular.element(b && b.display ? b.display : "<md-button>"), 
                        d.addClass(b && b["class"] ? b["class"] : g.classes.toolbarButton), d.attr("name", c.name), 
                        d.attr("ta-button", "ta-button"), d.attr("ng-disabled", "isDisabled()"), d.attr("tabindex", "-1"), 
                        d.attr("ng-click", "executeAction()"), d.attr("ng-class", "displayActiveToolClass(active)"), 
                        b && b.tooltiptext && d.attr("title", b.tooltiptext), b && !b.display && !c._display && (d[0].innerHTML = "", 
                        b.buttontext && (d[0].innerHTML = b.buttontext), b.iconclass)) {
                            var e = angular.element("<md-icon>"), f = d[0].innerHTML;
                            
                            e.addClass('material-icons md-18'), e.append(b.iconclass), d[0].innerHTML = "", d.append(e), f && "" !== f && d.append("&nbsp;" + f);
                        }
                        return c._lastToolDefinition = angular.copy(b), a(d)(c);
                    };
                    g.tools = {}, g._parent = {
                        disabled: !0,
                        showHtml: !1,
                        queryFormatBlockState: function() {
                            return !1;
                        },
                        queryCommandState: function() {
                            return !1;
                        }
                    };
                    var k = {
                        $window: f,
                        $editor: function() {
                            return g._parent;
                        },
                        isDisabled: function() {
                            return "function" != typeof this.$eval("disabled") && this.$eval("disabled") || this.$eval("disabled()") || "html" !== this.name && this.$editor().showHtml || this.$parent.disabled || this.$editor().disabled;
                        },
                        displayActiveToolClass: function(a) {
                            return a ? g.classes.toolbarButtonActive : "";
                        },
                        executeAction: e
                    };
                    angular.forEach(g.toolbar, function(a) {
                        var b = angular.element("<div>");
                        b.addClass(g.classes.toolbarGroup), angular.forEach(a, function(a) {
                            g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
                                name: a
                            }), g.tools[a].$element = j(d[a], g.tools[a]), b.append(g.tools[a].$element);
                        }), h.append(b);
                    }), g.updateToolDisplay = function(a, b, c) {
                        var d = g.tools[a];
                        if (d) {
                            if (d._lastToolDefinition && !c && (b = angular.extend({}, d._lastToolDefinition, b)), 
                            null === b.buttontext && null === b.iconclass && null === b.display) throw 'textAngular Error: Tool Definition for updating "' + a + '" does not have a valid display/iconclass/buttontext value';
                            null === b.buttontext && delete b.buttontext, null === b.iconclass && delete b.iconclass, 
                            null === b.display && delete b.display;
                            var e = j(b, d);
                            d.$element.replaceWith(e), d.$element = e;
                        }
                    }, g.addTool = function(a, b, c, e) {
                        g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
                            name: a
                        }), g.tools[a].$element = j(d[a], g.tools[a]);
                        var f;
                        void 0 === c && (c = g.toolbar.length - 1), f = angular.element(h.children()[c]), 
                        void 0 === e ? (f.append(g.tools[a].$element), g.toolbar[c][g.toolbar[c].length - 1] = a) : (f.children().eq(e).after(g.tools[a].$element), 
                        g.toolbar[c][e] = a);
                    }, b.registerToolbar(g), g.$on("$destroy", function() {
                        b.unregisterToolbar(g.name);
                    });
                }
            };
        } ]);
    }();
}({}, function() {
    return this;
}());