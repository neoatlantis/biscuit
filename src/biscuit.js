const Salsa20 = require("node-salsa20");

const iso7064 = require("./iso7064");
const checksum = new iso7064.MOD1271_36();

function ASCII2Uint8Array(str){
    const ret = new Uint8Array(str.length);
    for(var i = 0; i<str.length; i++) ret[i] = str.charCodeAt(i);
    return ret;
}

function bytes2chars(u8array){
    var ret = "";
    for(var i=0; i<u8array.length; i++){
        if(u8array[i] > 251) continue;
        ret += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"[u8array[i] % 36];
    }
    return ret;
}


class Biscuit{


    static async new(version){
        var id = "";
        var pool = new Uint8Array(32);
        while(id.length < 14){
            await window.crypto.getRandomValues(pool);
            id += bytes2chars(pool);
        }
        id = checksum.complete(id.slice(0, 14));
        return new Biscuit(id, version);
    }

    getID(id){
        // if id is given, check the id, otherwise, returns a string of random
        // id.
        // id have chars in 0-9A-Z, 16 in total, incl. 2 checksums
        if(id.length != 16 || typeof id != "string"){
            throw Error("Invalid id.");
        }
        if(!(new iso7064.MOD1271_36()).verify(id)){
            throw Error("Invalid id.");
        }
        return id;
    }

    constructor(id, version){
        const length = (undefined !== version ? version: 10);
        if(!Number.isInteger(length) || length < 4 || length > 20){
            throw Error("Version specification invalid. 4 <= version <= 20.");
        }

        const zero8 = new Uint32Array([0,0]).buffer;
        const zero64 = new Uint32Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]).buffer;

        this.id = this.getID(id);

        const salsa20 = new Salsa20().key(ASCII2Uint8Array(id)).nonce(zero8);

        this.cell = function(x, y){
            salsa20.seek(x, y);
            var raw = bytes2chars(new Uint8Array(salsa20.encrypt(zero64)));
            var rawPassword = checksum.complete(raw.slice(0, length - 2));

            return rawPassword;
        };
    }

}


module.exports = Biscuit;
