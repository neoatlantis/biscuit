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





$(async function(){

    const biscuit = await Biscuit.new(14);

    table(biscuit).appendTo("#biscuit");
    $("#biscuit-id").text(biscuit.id);

    /*.then((x) => {
        console.log(x);
        console.log(x.cell(0, 0));

        y = new Biscuit("UBJXY4FCAT1XE71S");
        console.log(y.cell(0, 0));
    });*/


});
