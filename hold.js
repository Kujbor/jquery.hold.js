/*
 * hold.js - jQuery-Plugin for the implementation of anti-spaghetti-style code
 * Author & copyright (C) 2013: Oleg Taranov aka Kujbor, CubeComp Development
 */
(function($) {

    "use strict";

    $.hold = function(checkerFunc, handlerFunc, that, delay, limit) {

        if (checkerFunc) {

            var check = function() {

                try {
                    return $.proxy(checkerFunc, that ? that : this)();
                }

                catch (e) {
                    return false;
                }

            }

            var current = 0;

            limit = limit ? limit : 1000;

            (function checker() {

                if (++current > limit) {
                    console.error("Limit is reached");
                    return false;
                }

                if (check()) {

                    $.proxy(handlerFunc, that ? that : this)();

                } else {

                    window.setTimeout(checker, delay);

                }

            })();

        } else {

            window.setTimeout(function() {

                $.proxy(handlerFunc, that ? that : this)();

            }, delay);

        }

    };

})($);