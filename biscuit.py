#!/usr/bin/env python3

"""
Biscuit Generator
=================

A biscuit is a small card, printed with pseudorandom codes that were derived
from the card's ID. A printed card may contain 32 codes on one side, arranged
in 8x4 matrix, each cell containing 5 alphanumeric chars and 1 checksum char.
The matrix size may be customized, or an online web-based generator in
javascript may help to derive and display a larger card on demand.

The biscuit is used for authentication before one may retrieve the volatile
password from online service or smartcard. As part of passwords or alone, one
defined cell is entered during authentication, and the single attempt rule
applies here.

Biscuit is used as a supplement to volatile password hardware or cloud
services. By simply using a hardware like a smartcard or a piece of soluable
paper, there are still cases when the hardware is (shortly?) ripped off from an
owner, e.g. during security body controls. Secrets on the hardware may be
revealed or recorded, or the hardware itself may be confiscated.

Biscuit cards add an additional uncertainty to anyone wishing to crack in
personal privacy: there's only 3.1 percent possibility to guess a correct code.
Even if a system allows 2 wrong attempts, a successful guess has still only
9.4% possibility.

"""

import base64
import os
import re

import hashlib


def checksum(string):
    m = 37
    r = 2 
    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#"

    p = 0
    for c in string:
        val = chars.index(c)
        p = ((p + val) * r) % m
    	
    return string + chars[(m - p + 1) % m]


b32 = lambda b: base64.b32encode(b).decode("ascii").rstrip("=").upper()
breakid = lambda s: "-".join(re.findall("[0-9a-zA-Z#]{5}", s))

seed_raw   = b32(os.urandom(20))[:20-1]  # used as bytes directly
seed_shown = breakid(checksum(seed_raw))   # serial id for print on card
key = hashlib.sha512(seed_raw.encode("ascii")).digest()[:16]

def getRow(rowID, cellLength, count):
    """cellLength: desired cell length, >= 4
       count:      count of cells in a row"""
    assert cellLength >= 4
    dataLength = (cellLength - 1) * count
    data = b32(hashlib.pbkdf2_hmac(
        "sha512",
        key,
        rowID,
        iterations=16,
        dklen=dataLength
    ))[:dataLength]
    
    cells = re.findall("[0-9a-zA-Z]{%d}" % (cellLength-1), data)
    cells = [checksum(e) for e in cells]

    return cells 

print(seed_shown)

for i in range(0, 10):
    print(getRow(b"%d" % i, 5, 10))
