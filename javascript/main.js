
// setCss used to saving css values(button parameters)
var setCss = {
    borderWidth : 2,
    borderRadius: 7,
    borderColor : "#DE9A27",
    btnWidth    : 140,
    btnHeight   : 40,
    fontSize    : 18,
    bgColor     : "#abc",
    btnText     : "Click me!",
    cssStringArr: ["border-width",
                   "border-radius",
                   "border-color",
                   "width",
                   "height",
                   "font-size",
                   "background-color"            
                   ]
};
// add property(an Array) to  object setCss with 
// names of keys of this object
setCss.selfKeys = [];
for(var k in setCss) setCss.selfKeys.push(k);


var changeColor_Flag = 0;    // 1: change background Color
                             // 2: change border Color
                             // 3: change text Color


$(function() {
    // look in Object createButton!
    ownButtonWithSlider.showSlider( 
        "#amount-border", 
        "#slider-range-border", 
        "border-width", 
        0, 
        10,
        setCss.borderWidth, 
        'borderWidth'
    );
    ownButtonWithSlider.showSlider(
        "#amount-width", 
        "#slider-range-width", 
        "width", 
        10, 
        400,
        setCss.btnWidth, 
        'btnWidth'
    );

    ownButtonWithSlider.showSlider(
        "#amount-height", 
        "#slider-range-height", 
        "height", 
        10, 
        100,
        setCss.btnHeight, 
        'btnHeight'
    );

    ownButtonWithSlider.showSlider(
        "#amount-radius", 
        "#slider-range-radius", 
        "border-radius", 
        0, 
        40,
        setCss.borderRadius, 
        'borderRadius'
    );

    ownButtonWithSlider.showSlider(
        "#amount-font-size", 
        "#slider-range-font-size", 
        "font-size", 
        7, 
        50,
        setCss.fontSize, 
        'fontSize'
    );

    //initialize css string
    ownButtonWithSlider.cssString();

    //show html of button
    $("#text_html").val("<button id=\"myButton\" class=\"myButton\">Click me!</button>");

    // open dialog window to change color
    $("#dialog").dialog({
        autoOpen: false,
        resizable: false
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

    // change creating button text
    $("#set_text").click(function() {
        $("#myByDefault").text($("#buttonValue").val());
        //change html of button
        $("#text_html").val(
            "<button id=\"myButton\" class=\"myButton\">"+
            $("#buttonValue").val()+
            "</button>"
        );
    });

    // in ColorPicker activate self typed value of color
    $("#changeColor").click(function() {
       changeColorByClick('#'+$('#put_color').val());
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

    // this is a sample version, i use the same
    // parameters of color in "both" pickColor windows
    $("#red").slider("value", 63);
    $("#green").slider("value", 124);
    $("#blue").slider("value", 222); 
});





// show choosed color in div id=Swatch
function refreshSwatch() {
    var red = $("#red").slider("value"),
        green = $("#green").slider("value"),
        blue = $("#blue").slider("value"),
        hex = hexFromRGB(red, green, blue);
    $("#swatch").css("background-color", "#" + hex);

    if(changeColor_Flag == 1) {
        // will be changed color of background
        $("#myByDefault").css("background-color", "#" + hex);
        setCss.bgColor = "#" + hex;
    }	
    else if(changeColor_Flag == 2) {
        // will be changed color of border
        $("#myByDefault").css("border-color", "#" + hex);
        setCss.borderColor = "#" + hex;
    }
    // refresh css string
    ownButtonWithSlider.cssString();
    // put color value in input to show hex-number
    $("#put_color").val(hex);
}


// ---------------------
// colors Manipulations 
// three functions:
// hexFromRGB
// hexToRGB
// changeColorByClick
// ---------------------
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


/* 
        hexToRGB("#0033ff").g - return "51" 
        hexToRGB("#03f").g - return "51"      
*/
function hexToRGB(hex) {
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

// do after click button "change" in colorPicker
function changeColorByClick(hex) {
    if (hexToRGB(hex).r && hexToRGB(hex).g && hexToRGB(hex).b) {
        $("#red").slider("value", hexToRGB(hex).r);
        $("#green").slider("value", hexToRGB(hex).g);
        $("#blue").slider("value", hexToRGB(hex).b);            
    }
}
    


// верхние функиции не вижу смысла прятать в объект
// это явно ухудшит  читабельность кода
// о метод showSlider объекта createButton можно было бы 
// оформить как функцию, но этот проект есть куда расширять
// поэтому считаю привильным чтобы это выглядело именно так.

// changings using slider 
var createButton = function() {
    var self = this;
    // show slider to change a value and do changes
    this.showSlider = function (amountId, sliderId, cssMethod, minVal, maxVal, cssValue, propertyOf_setCss) {
        // set  values( first time defaults ) for called css method
        $(sliderId).slider({
            range: "max",
            min: minVal,
            max: maxVal,
            value: cssValue,
            slide: function(event, ui) {
                $(amountId).val(ui.value);
            }
        });

        // animate, move slider 
        $(amountId).val($(sliderId).slider("value"));

        // change css values and save in Object setCss{}
        $(sliderId).slider({
            change: function(event, ui) {
                setCss[propertyOf_setCss] = $(sliderId).slider("value") + 'px';
                $('#top_section_right>button').css(
                    cssMethod , setCss[propertyOf_setCss]
                );
                // refresh css string
                self.cssString();
            }
        });
    }
    this.cssString = function () {
        var string = ".myButton {\n";
        for (var i = 0, max = setCss.cssStringArr.length; i < max; i++) {
            string += "\t" + setCss.cssStringArr[i] + ": "+ setCss[setCss.selfKeys[i]] + "\n";
        };
        string += "}";
        $('#text_css').val(string);
    }
}

// initialize changings using slider 
var ownButtonWithSlider = new createButton();