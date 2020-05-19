const $ = require("jquery");
const Biscuit = require("./biscuit");


function table(biscuit){
    const R = 26, C = 10;
    var table = $("<table>");

    function formatID(id){
        const parts = /^([0-9A-Z]{4})([0-9A-Z]{4})([0-9A-Z]{4})([0-9A-Z]{4})$/i.exec(id);
        return parts.slice(1).join("-");
    }

    const marker = '<tr><td colspan="' + (R+2) + '">' +
        '<strong>Biscuit ID</strong>: ' + formatID(biscuit.id) + '</td></tr>';

    table.append(marker);

    for(var r=0; r<=R+1; r++){
        var row = $("<tr>");

        row.addClass((r != 0 && r != R+1) ? "row-password": "row-header");

        var rowNumber = $("<td>")
            .text((r != 0 && r != R+1) ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[r-1] : "")
            .addClass("row-number");

        row.append(rowNumber[0].outerHTML);

        for(var c=0; c<C; c++){
            var td = $("<td>")   
                .text(r == 0 || r == R+1 ? (c+1).toString() : biscuit.cell(r, c))
                .addClass(r == 0 || r == R+1 ? "col-number": "password")
                .appendTo(row)
            ;
        }

        row.append(rowNumber[0].outerHTML);

        table.append(row);
    }

    table.append(marker);
    return table;
}


function showBiscuit(biscuit){
    $("#biscuit").show().html(table(biscuit)[0].outerHTML);
    $("#main").hide();
}



$(async function(){

    const BISCUIT_VERSION = 14;

    $("#new-biscuit").click(async function(){
        showBiscuit(await Biscuit.new(BISCUIT_VERSION));
    });

    $("#load-biscuit").click(function(){
        var id = $("#load-biscuit-id").val();
        id = id.replace(/[^0-9A-Z]/gi, "").toUpperCase();

        try{
            const biscuit = new Biscuit(id, BISCUIT_VERSION);
            showBiscuit(biscuit);
            $("#load-biscuit-id").val("");
        } catch(e){
        }
    });

    $("#load-biscuit-id").on("keypress keydown keyup changed", function(e){
        if(e.key == "Enter"){
            return $("#load-biscuit").click();
        }
        const val = $(this).val().replace(/[^0-9a-z]/gi, "").toUpperCase();
        var valid = false;
        try{
            Biscuit.verifyID(val);
            valid = true;
        } catch(e){
        }
        $(this).toggleClass("valid", valid).toggleClass("invalid", !valid && val != "");
        valid ? $("#load-biscuit").removeAttr("disabled") : $("#load-biscuit").attr("disabled", true);
    });

});
