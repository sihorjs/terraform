const $ = require("jquery");

function animation(dest, reverse, target, handler) {
    const positions = {
        start: {},
        end: {}
    };

    positions.dest = dest;
    const [side] = Object.keys(positions.dest);

    positions.start[side] = -$(target).height();

    $(target).css(positions.start);

    $(handler).on("click", () => {
        $(target)
            .show()
            .animate(positions.dest, 700, "swing");
    });

    $(`${target} .close`).on("click", e => {
        e.preventDefault();

        if (reverse) {
            positions.end[side] = "100%";
            $(target).animate(positions.end, 700, "swing", () => {
                $(this)
                    .css(positions.start)
                    .hide();
            });
        } else {
            $(target).animate(positions.start, 700, "swing", () => {
                $(this).hide();
            });
        }
    });
}

$(document).ready(function() {
    animation({ top: 0 }, false, "#mobile-menu", "#sandwich");
    animation({ top: 0 }, true, "#map-container", "#show-map");
    animation({ bottom: 20 }, false, "#callback-form", "#callback-btn");
    animation({ top: 0 }, true, "#review-form-dialog", "#add-review");
    animation({ top: 0 }, true, "#3D-interior-details", "#3D-interior");
    animation({ top: 0 }, true, "#3D-exterion-details", "#3D-exterior");
    animation({ top: 0 }, true, "#3D-modeling-details", "#3D-modeling");
    animation({ top: 0 }, true, "#3D-animation-details", "#3D-animation");

    $("#btn-dive-in").on("click", () => {
        $("#whale").animate(
            {
                top: "+=200",
                left: "+=50%",
                opacity: "0"
            },
            800,
            "swing",
            () => {
                $(this)
                    .hide()
                    .css("left", "-=100%");
            }
        );

        $(this).animate({ opacity: "0" }, 300, "swing", () => {
            $(this).hide();
        });

        $("#dive-form")
            .show()
            .animate(
                {
                    top: "20"
                },
                500,
                "swing"
            );
    });

    $("#btn-dive-out").on("click", e => {
        e.preventDefault();

        $("#dive-form").animate({ top: "100%" }, 500, "swing", () => {
            $(this).hide();
        });

        $("#btn-dive-in")
            .show()
            .animate({ opacity: "1" }, 300, "swing");
        $("#whale")
            .show()
            .animate(
                {
                    opacity: "1",
                    top: "-=200",
                    left: "+=50%"
                },
                800,
                "swing"
            );
    });
});
