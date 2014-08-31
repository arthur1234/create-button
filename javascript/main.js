

var changeColor_Flag = 0;    // 1: change background Color
                             // 2: change border Color
                             // 3: change text Color

$(function() {
    // rgb(255, 140, 60);

    // open dialog window to change color
    $("#dialog").dialog({
        autoOpen: false,
        resizable: false
    });


    // set default border width
    $("#slider-range-border").slider({
        range: "max",
        min: 0,
        max: 10,
        value: 1,
        slide: function(event, ui) {
            $("#amount-border").val(ui.value);
        }
    });

    // show border width to uesr as a number
    $("#amount-border").val($("#slider-range-border").slider("value"));

    //  change border width
    $("#slider-range-border").slider({
        change: function(event, ui) {
            var borderWidth = $("#slider-range-border").slider("value") + 'px';
            $('#top_section_right>button').css({
                'border-width': borderWidth
            });
        }
    });


    // open color picker window to set bg-color
    $("#bg_color").click(function() {
    	changeColor_Flag = 1;
        $("#dialog").dialog("open");
    });

    // open color picker window to set border-color
    $("#border_color").click(function() {
    	changeColor_Flag = 2;
        $("#dialog").dialog("open");
    });

    $("#set_text").click(function() {
        $("#myByDefault").text($("#buttonValue").val());
    });




     // default color in color Picker Window
    $("#red, #green, #blue").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 127,
        slide: refreshSwatch,
        change: refreshSwatch
    });
    $("#red").slider("value", 63);
    $("#green").slider("value", 124);
    $("#blue").slider("value", 222); 
});





// show choosed color in div Swatch
function refreshSwatch() {
    var red = $("#red").slider("value"),
        green = $("#green").slider("value"),
        blue = $("#blue").slider("value"),
        hex = hexFromRGB(red, green, blue);
    $("#swatch").css("background-color", "#" + hex);

    if(changeColor_Flag == 1)
    	$("#myByDefault").css("background-color", "#" + hex);
    else if(changeColor_Flag == 2)
    	$("#myByDefault").css("border-color", "#" + hex);
    $("#put_color").val(hex);
}


// no need remark
function hexFromRGB(r, g, b) {
    var hex = [
        r.toString(16),
        g.toString(16),
        b.toString(16)
    ];
    $.each(hex, function(nr, val) {
        if (val.length === 1) {
            hex[nr] = "0" + val;
        }
    });
    return hex.join("").toUpperCase();
}


// no need remark
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : false;
}


function changeColorByClick(hex) {
        if (hexToRgb(hex).r && hexToRgb(hex).g && hexToRgb(hex).b) {
            $("#red").slider("value", hexToRgb(hex).r);
            $("#green").slider("value", hexToRgb(hex).g);
            $("#blue").slider("value", hexToRgb(hex).b);
            console.log(hexToRgb(hex).g);
        }

    }
    /*alert( hexToRgb("#0033ff").g ); // "51";
    alert( hexToRgb("#03f").g ); // "51";*/