module.exports = function checksum(string){
    const m = 37;
    const r = 2;
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#";

    var p = 0;
    for(var i=0; i<string.length; i++){
        var val = chars.indexOf(string.charAt(i));
        p = ((p + val) * r) % m;
    }
    	
    return string + chars[(m - p + 1) % m];
}
