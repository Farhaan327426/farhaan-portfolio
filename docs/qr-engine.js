/**
 * High-Performance Client-Side QR Code Engine & Cryptographic Hasher
 * Designed for Farhaan Bashir's Transit Engineering Portfolio
 * 
 * Features:
 * - 100% Offline, Zero external dependencies
 * - Auto-version QR matrix generation (UTF-8, byte mode, Reed-Solomon EC)
 * - Cryptographic SHA-256 and HMAC-SHA256 digest computation
 * - Crisp Scalable SVG & Canvas rendering with modern cyber/transit styling
 * - vCard generator for digital identity contact scanning
 * - Transit ticket payload signing & verification
 */

(function (global) {
    'use strict';

    // -------------------------------------------------------------
    // 1. PURE JS SHA-256 & HMAC-SHA256 IMPLEMENTATION
    // -------------------------------------------------------------
    function sha256(ascii) {
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }

        const mathPow = Math.pow;
        const maxWord = mathPow(2, 32);
        let lengthProperty = 'length';
        let i, j;
        let result = '';

        const words = [];
        const asciiBitLength = ascii[lengthProperty] * 8;

        const hash = [];
        const k = [];
        let primeCounter = 0;

        const isPrime = function (n) {
            for (let factor = 2; factor * factor <= n; factor++) {
                if (n % factor === 0) return false;
            }
            return true;
        };

        for (let candidate = 2; primeCounter < 64; candidate++) {
            if (isPrime(candidate)) {
                if (primeCounter < 8) {
                    hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
                }
                k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
                primeCounter++;
            }
        }

        words[asciiBitLength >> 5] |= 0x80 << (24 - (asciiBitLength % 32));
        words[(((asciiBitLength + 64) >> 9) << 4) + 15] = asciiBitLength;

        for (i = 0; i < ascii[lengthProperty]; i++) {
            words[i >> 2] |= ascii.charCodeAt(i) << (24 - (i % 4) * 8);
        }

        for (j = 0; j < words[lengthProperty]; j += 16) {
            const w = words.slice(j, j + 16);
            const oldHash = hash.slice(0);

            for (i = 0; i < 64; i++) {
                const i2 = i + j;
                const w15 = w[i - 15], w2 = w[i - 2];

                const a = hash[0], e = hash[4];
                const temp1 = hash[7]
                    + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
                    + ((e & hash[5]) ^ ((~e) & hash[6]))
                    + k[i]
                    + (w[i] = (i < 16) ? (w[i] | 0) : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
                    ) | 0);

                const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
                    + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

                hash[7] = hash[6];
                hash[6] = hash[5];
                hash[5] = hash[4];
                hash[4] = (hash[3] + temp1) | 0;
                hash[3] = hash[2];
                hash[2] = hash[1];
                hash[1] = hash[0];
                hash[0] = (temp1 + temp2) | 0;
            }

            for (i = 0; i < 8; i++) {
                hash[i] = (hash[i] + oldHash[i]) | 0;
            }
        }

        for (i = 0; i < 8; i++) {
            for (let b = 3; b >= 0; b--) {
                const byteVal = (hash[i] >> (b * 8)) & 255;
                result += ((byteVal < 16) ? '0' : '') + byteVal.toString(16);
            }
        }
        return result;
    }

    function hmacSha256(key, message) {
        const blockSize = 64; // 512 bits / 8
        if (key.length > blockSize) {
            key = hexToBytes(sha256(key));
        } else {
            const keyBytes = [];
            for (let i = 0; i < key.length; i++) keyBytes.push(key.charCodeAt(i));
            key = keyBytes;
        }

        while (key.length < blockSize) {
            key.push(0);
        }

        const oKeyPad = [];
        const iKeyPad = [];
        for (let i = 0; i < blockSize; i++) {
            oKeyPad[i] = String.fromCharCode(key[i] ^ 0x5c);
            iKeyPad[i] = String.fromCharCode(key[i] ^ 0x36);
        }

        const innerHashHex = sha256(iKeyPad.join('') + message);
        let innerHashString = '';
        for (let i = 0; i < innerHashHex.length; i += 2) {
            innerHashString += String.fromCharCode(parseInt(innerHashHex.substr(i, 2), 16));
        }

        return sha256(oKeyPad.join('') + innerHashString);
    }

    function hexToBytes(hex) {
        const bytes = [];
        for (let c = 0; c < hex.length; c += 2) {
            bytes.push(parseInt(hex.substr(c, 2), 16));
        }
        return bytes;
    }

    // -------------------------------------------------------------
    // 2. REED-SOLOMON & QR CODE GENERATOR CORE
    // -------------------------------------------------------------
    const QRMode = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4 };
    const QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };

    const QRMath = {
        glog: function (n) {
            if (n < 1) throw new Error("glog(" + n + ")");
            return QRMath.LOG_TABLE[n];
        },
        gexp: function (n) {
            while (n < 0) n += 255;
            while (n >= 256) n -= 255;
            return QRMath.EXP_TABLE[n];
        },
        EXP_TABLE: new Array(256),
        LOG_TABLE: new Array(256)
    };

    for (let i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;
    for (let i = 8; i < 256; i++) {
        QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    }
    for (let i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;

    function QRPolynomial(num, shift) {
        if (num.length === undefined) throw new Error(num.length + "/" + shift);
        let offset = 0;
        while (offset < num.length && num[offset] === 0) offset++;
        this.num = new Array(num.length - offset + shift);
        for (let i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset];
        for (let i = 0; i < shift; i++) this.num[this.num.length - shift + i] = 0;
    }

    QRPolynomial.prototype = {
        get: function (index) { return this.num[index]; },
        getLength: function () { return this.num.length; },
        multiply: function (e) {
            const num = new Array(this.getLength() + e.getLength() - 1);
            for (let i = 0; i < num.length; i++) num[i] = 0;
            for (let i = 0; i < this.getLength(); i++) {
                for (let j = 0; j < e.getLength(); j++) {
                    num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
                }
            }
            return new QRPolynomial(num, 0);
        },
        mod: function (e) {
            if (this.getLength() - e.getLength() < 0) return this;
            const ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
            const num = new Array(this.getLength());
            for (let i = 0; i < this.getLength(); i++) num[i] = this.get(i);
            for (let i = 0; i < e.getLength(); i++) {
                num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
            }
            return new QRPolynomial(num, 0).mod(e);
        }
    };

    function QRRSBlock(totalCount, dataCount) {
        this.totalCount = totalCount;
        this.dataCount = dataCount;
    }

    QRRSBlock.RS_BLOCK_TABLE = [
        // 1
        [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
        // 2
        [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
        // 3
        [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
        // 4
        [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
        // 5
        [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
        // 6
        [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15],
        // 7
        [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14],
        // 8
        [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15],
        // 9
        [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13],
        // 10
        [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16]
    ];

    QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
        const rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
        if (rsBlock === undefined) throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
        const length = rsBlock.length / 3;
        const list = [];
        for (let i = 0; i < length; i++) {
            const count = rsBlock[i * 3 + 0];
            const totalCount = rsBlock[i * 3 + 1];
            const dataCount = rsBlock[i * 3 + 2];
            for (let j = 0; j < count; j++) list.push(new QRRSBlock(totalCount, dataCount));
        }
        return list;
    };

    QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
        switch (errorCorrectLevel) {
            case QRErrorCorrectLevel.L: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
            case QRErrorCorrectLevel.M: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
            case QRErrorCorrectLevel.Q: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
            case QRErrorCorrectLevel.H: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
            default: return undefined;
        }
    };

    function QRBitBuffer() {
        this.buffer = [];
        this.length = 0;
    }

    QRBitBuffer.prototype = {
        get: function (index) {
            const bufIndex = Math.floor(index / 8);
            return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1;
        },
        put: function (num, length) {
            for (let i = 0; i < length; i++) {
                this.putBit(((num >>> (length - i - 1)) & 1) === 1);
            }
        },
        getLengthInBits: function () { return this.length; },
        putBit: function (bit) {
            const bufIndex = Math.floor(this.length / 8);
            if (this.buffer.length <= bufIndex) this.buffer.push(0);
            if (bit) this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
            this.length++;
        }
    };

    function QR8bitByte(data) {
        this.mode = QRMode.MODE_8BIT_BYTE;
        this.data = data;
        this.parsedData = [];
        // Support UTF-8 encoding
        for (let i = 0; i < this.data.length; i++) {
            const byteArray = [];
            const code = this.data.charCodeAt(i);
            if (code > 0x10000) {
                byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
                byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
                byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
                byteArray[3] = 0x80 | (code & 0x3F);
            } else if (code > 0x800) {
                byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
                byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
                byteArray[2] = 0x80 | (code & 0x3F);
            } else if (code > 0x80) {
                byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
                byteArray[1] = 0x80 | (code & 0x3F);
            } else {
                byteArray[0] = code;
            }
            this.parsedData.push(byteArray);
        }
        this.parsedData = Array.prototype.concat.apply([], this.parsedData);
    }

    QR8bitByte.prototype = {
        getLength: function () { return this.parsedData.length; },
        write: function (buffer) {
            for (let i = 0; i < this.parsedData.length; i++) {
                buffer.put(this.parsedData[i], 8);
            }
        }
    };

    const QRUtil = {
        PATTERN_POSITION_TABLE: [
            [],
            [6, 18],
            [6, 22],
            [6, 26],
            [6, 30],
            [6, 34],
            [6, 22, 38],
            [6, 24, 42],
            [6, 26, 46],
            [6, 28, 50]
        ],
        G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
        G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
        getBCHTypeInfo: function (data) {
            let d = data << 10;
            while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
                d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
            }
            return ((data << 10) | d) ^ QRUtil.G15_MASK;
        },
        getBCHDigit: function (data) {
            let digit = 0;
            while (data !== 0) {
                digit++;
                data >>>= 1;
            }
            return digit;
        },
        getPatternPosition: function (typeNumber) {
            return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1] || [];
        },
        getMask: function (maskPattern, i, j) {
            switch (maskPattern) {
                case 0: return (i + j) % 2 === 0;
                case 1: return i % 2 === 0;
                case 2: return j % 3 === 0;
                case 3: return (i + j) % 3 === 0;
                case 4: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
                case 5: return (i * j) % 2 + (i * j) % 3 === 0;
                case 6: return ((i * j) % 2 + (i * j) % 3) % 2 === 0;
                case 7: return ((i * j) % 3 + (i + j) % 2) % 2 === 0;
                default: throw new Error("bad maskPattern:" + maskPattern);
            }
        },
        getErrorCorrectPolynomial: function (errorCorrectLength) {
            let a = new QRPolynomial([1], 0);
            for (let i = 0; i < errorCorrectLength; i++) {
                a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
            }
            return a;
        },
        getLengthInBits: function (mode, type) {
            if (1 <= type && type < 10) {
                switch (mode) {
                    case QRMode.MODE_NUMBER: return 10;
                    case QRMode.MODE_ALPHA_NUM: return 9;
                    case QRMode.MODE_8BIT_BYTE: return 8;
                    default: throw new Error("mode:" + mode);
                }
            } else {
                throw new Error("type:" + type);
            }
        },
        getLostPoint: function (qrCode) {
            const moduleCount = qrCode.getModuleCount();
            let lostPoint = 0;
            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    let sameCount = 0;
                    const dark = qrCode.isDark(row, col);
                    for (let r = -1; r <= 1; r++) {
                        if (row + r < 0 || moduleCount <= row + r) continue;
                        for (let c = -1; c <= 1; c++) {
                            if (col + c < 0 || moduleCount <= col + c) continue;
                            if (r === 0 && c === 0) continue;
                            if (dark === qrCode.isDark(row + r, col + c)) sameCount++;
                        }
                    }
                    if (sameCount > 5) lostPoint += (3 + sameCount - 5);
                }
            }
            return lostPoint;
        }
    };

    function QRCodeModel(typeNumber, errorCorrectLevel) {
        this.typeNumber = typeNumber;
        this.errorCorrectLevel = errorCorrectLevel;
        this.modules = null;
        this.moduleCount = 0;
        this.dataCache = null;
        this.dataList = [];
    }

    QRCodeModel.prototype = {
        addData: function (data) {
            const newData = new QR8bitByte(data);
            this.dataList.push(newData);
            this.dataCache = null;
        },
        isDark: function (row, col) {
            if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
                throw new Error(row + "," + col);
            }
            return this.modules[row][col];
        },
        getModuleCount: function () { return this.moduleCount; },
        make: function () {
            this.makeImpl(false, this.getBestMaskPattern());
        },
        makeImpl: function (test, maskPattern) {
            this.moduleCount = this.typeNumber * 4 + 17;
            this.modules = new Array(this.moduleCount);
            for (let row = 0; row < this.moduleCount; row++) {
                this.modules[row] = new Array(this.moduleCount);
                for (let col = 0; col < this.moduleCount; col++) this.modules[row][col] = null;
            }
            this.setupPositionProbePattern(0, 0);
            this.setupPositionProbePattern(this.moduleCount - 7, 0);
            this.setupPositionProbePattern(0, this.moduleCount - 7);
            this.setupPositionAdjustPattern();
            this.setupTimingPattern();
            this.setupTypeInfo(test, maskPattern);
            if (this.dataCache === null) {
                this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
            }
            this.mapData(this.dataCache, maskPattern);
        },
        setupPositionProbePattern: function (row, col) {
            for (let r = -1; r <= 7; r++) {
                if (row + r <= -1 || this.moduleCount <= row + r) continue;
                for (let c = -1; c <= 7; c++) {
                    if (col + c <= -1 || this.moduleCount <= col + c) continue;
                    if ((0 <= r && r <= 6 && (c === 0 || c === 6))
                        || (0 <= c && c <= 6 && (r === 0 || r === 6))
                        || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
                        this.modules[row + r][col + c] = true;
                    } else {
                        this.modules[row + r][col + c] = false;
                    }
                }
            }
        },
        getBestMaskPattern: function () {
            let minLostPoint = 0;
            let pattern = 0;
            for (let i = 0; i < 8; i++) {
                this.makeImpl(true, i);
                const lostPoint = QRUtil.getLostPoint(this);
                if (i === 0 || minLostPoint > lostPoint) {
                    minLostPoint = lostPoint;
                    pattern = i;
                }
            }
            return pattern;
        },
        setupTimingPattern: function () {
            for (let r = 8; r < this.moduleCount - 8; r++) {
                if (this.modules[r][6] !== null) continue;
                this.modules[r][6] = (r % 2 === 0);
            }
            for (let c = 8; c < this.moduleCount - 8; c++) {
                if (this.modules[6][c] !== null) continue;
                this.modules[6][c] = (c % 2 === 0);
            }
        },
        setupPositionAdjustPattern: function () {
            const pos = QRUtil.getPatternPosition(this.typeNumber);
            for (let i = 0; i < pos.length; i++) {
                for (let j = 0; j < pos.length; j++) {
                    const row = pos[i];
                    const col = pos[j];
                    if (this.modules[row][col] !== null) continue;
                    for (let r = -2; r <= 2; r++) {
                        for (let c = -2; c <= 2; c++) {
                            if (r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0)) {
                                this.modules[row + r][col + c] = true;
                            } else {
                                this.modules[row + r][col + c] = false;
                            }
                        }
                    }
                }
            }
        },
        setupTypeInfo: function (test, maskPattern) {
            const data = (this.errorCorrectLevel << 3) | maskPattern;
            const bits = QRUtil.getBCHTypeInfo(data);
            for (let i = 0; i < 15; i++) {
                const mod = (!test && ((bits >> i) & 1) === 1);
                if (i < 6) {
                    this.modules[i][8] = mod;
                } else if (i < 8) {
                    this.modules[i + 1][8] = mod;
                } else {
                    this.modules[this.moduleCount - 15 + i][8] = mod;
                }
                if (i < 8) {
                    this.modules[8][this.moduleCount - i - 1] = mod;
                } else if (i < 9) {
                    this.modules[8][15 - i - 1 + 1] = mod;
                } else {
                    this.modules[8][15 - i - 1] = mod;
                }
            }
            this.modules[this.moduleCount - 8][8] = !test;
        },
        mapData: function (data, maskPattern) {
            let inc = -1;
            let row = this.moduleCount - 1;
            let bitIndex = 7;
            let byteIndex = 0;
            for (let col = this.moduleCount - 1; col > 0; col -= 2) {
                if (col === 6) col--;
                while (true) {
                    for (let c = 0; c < 2; c++) {
                        if (this.modules[row][col - c] === null) {
                            let dark = false;
                            if (byteIndex < data.length) {
                                dark = (((data[byteIndex] >>> bitIndex) & 1) === 1);
                            }
                            const mask = QRUtil.getMask(maskPattern, row, col - c);
                            if (mask) dark = !dark;
                            this.modules[row][col - c] = dark;
                            bitIndex--;
                            if (bitIndex === -1) {
                                byteIndex++;
                                bitIndex = 7;
                            }
                        }
                    }
                    row += inc;
                    if (row < 0 || this.moduleCount <= row) {
                        row -= inc;
                        inc = -inc;
                        break;
                    }
                }
            }
        }
    };

    QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
        const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
        const buffer = new QRBitBuffer();
        for (let i = 0; i < dataList.length; i++) {
            const data = dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
        }
        let totalDataCount = 0;
        for (let i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
        if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
        }
        if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) buffer.put(0, 4);
        while (buffer.getLengthInBits() % 8 !== 0) buffer.putBit(false);
        while (true) {
            if (buffer.getLengthInBits() >= totalDataCount * 8) break;
            buffer.put(0xEC, 8);
            if (buffer.getLengthInBits() >= totalDataCount * 8) break;
            buffer.put(0x11, 8);
        }
        return QRCodeModel.createBytes(buffer, rsBlocks);
    };

    QRCodeModel.createBytes = function (buffer, rsBlocks) {
        let offset = 0;
        let maxDcCount = 0;
        let maxEcCount = 0;
        const dcdata = new Array(rsBlocks.length);
        const ecdata = new Array(rsBlocks.length);
        for (let r = 0; r < rsBlocks.length; r++) {
            const dcCount = rsBlocks[r].dataCount;
            const ecCount = rsBlocks[r].totalCount - dcCount;
            maxDcCount = Math.max(maxDcCount, dcCount);
            maxEcCount = Math.max(maxEcCount, ecCount);
            dcdata[r] = new Array(dcCount);
            for (let i = 0; i < dcdata[r].length; i++) {
                dcdata[r][i] = 0xff & buffer.buffer[i + offset];
            }
            offset += dcCount;
            const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
            const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
            const modPoly = rawPoly.mod(rsPoly);
            ecdata[r] = new Array(rsPoly.getLength() - 1);
            for (let i = 0; i < ecdata[r].length; i++) {
                const modIndex = i + modPoly.getLength() - ecdata[r].length;
                ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
            }
        }
        let totalCodeCount = 0;
        for (let i = 0; i < rsBlocks.length; i++) totalCodeCount += rsBlocks[i].totalCount;
        const data = new Array(totalCodeCount);
        let index = 0;
        for (let i = 0; i < maxDcCount; i++) {
            for (let r = 0; r < rsBlocks.length; r++) {
                if (i < dcdata[r].length) data[index++] = dcdata[r][i];
            }
        }
        for (let i = 0; i < maxEcCount; i++) {
            for (let r = 0; r < rsBlocks.length; r++) {
                if (i < ecdata[r].length) data[index++] = ecdata[r][i];
            }
        }
        return data;
    };

    // -------------------------------------------------------------
    // 3. PUBLIC API: HIGH-LEVEL QR GENERATION & STYLING
    // -------------------------------------------------------------
    function createQRCode(text, errorCorrectLevel) {
        errorCorrectLevel = errorCorrectLevel !== undefined ? errorCorrectLevel : QRErrorCorrectLevel.M;
        // Auto-select minimum version that fits data
        for (let type = 1; type <= 10; type++) {
            try {
                const qr = new QRCodeModel(type, errorCorrectLevel);
                qr.addData(text);
                qr.make();
                return qr;
            } catch (err) {
                // If overflow, try next version
            }
        }
        // Fallback to version 10 with level L if still overflowing
        const qr = new QRCodeModel(10, QRErrorCorrectLevel.L);
        qr.addData(text);
        qr.make();
        return qr;
    }

    /**
     * Generate pixel-perfect SVG string
     * @param {string} text 
     * @param {object} opts - { size, margin, colorDark, colorLight, rounded, glow, cyberBadge }
     */
    function generateSVG(text, opts) {
        opts = Object.assign({
            size: 260,
            margin: 2,
            colorDark: '#10B981',
            colorLight: '#09090B',
            bgTransparent: false,
            rounded: true,
            cornerGlow: true,
            centerLabel: ''
        }, opts || {});

        const qr = createQRCode(text, QRErrorCorrectLevel.M);
        const count = qr.getModuleCount();
        const total = count + opts.margin * 2;
        const cellSize = (opts.size / total).toFixed(3);

        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${opts.size} ${opts.size}" width="${opts.size}" height="${opts.size}" class="qr-vector-matrix" shape-rendering="geometricPrecision">\n`;

        // Background
        if (!opts.bgTransparent) {
            svg += `  <rect width="${opts.size}" height="${opts.size}" fill="${opts.colorLight}" rx="12"/>\n`;
        }

        // Defs for gradients/glow
        svg += `  <defs>\n`;
        svg += `    <linearGradient id="qrGrad" x1="0%" y1="0%" x2="100%" y2="100%">\n`;
        svg += `      <stop offset="0%" stop-color="${opts.colorDark}" />\n`;
        svg += `      <stop offset="100%" stop-color="${opts.colorDarkAccent || opts.colorDark}" />\n`;
        svg += `    </linearGradient>\n`;
        svg += `    <filter id="qrGlow" x="-20%" y="-20%" width="140%" height="140%">\n`;
        svg += `      <feGaussianBlur stdDeviation="1.5" result="blur" />\n`;
        svg += `      <feComposite in="SourceGraphic" in2="blur" operator="over" />\n`;
        svg += `    </filter>\n`;
        svg += `  </defs>\n`;

        const fillStyle = opts.colorDarkAccent ? 'url(#qrGrad)' : opts.colorDark;
        const radius = opts.rounded ? (cellSize * 0.38).toFixed(2) : 0;

        // Render QR Modules
        svg += `  <g fill="${fillStyle}" ${opts.cornerGlow ? 'filter="url(#qrGlow)"' : ''}>\n`;
        for (let r = 0; r < count; r++) {
            for (let c = 0; c < count; c++) {
                if (qr.isDark(r, c)) {
                    const x = ((c + opts.margin) * cellSize);
                    const y = ((r + opts.margin) * cellSize);
                    
                    // Is this inside the three corner finder patterns?
                    const isFinder = (r < 7 && c < 7) || (r < 7 && c >= count - 7) || (r >= count - 7 && c < 7);
                    
                    if (isFinder && opts.rounded) {
                        svg += `    <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellSize}" height="${cellSize}" rx="${(cellSize * 0.25).toFixed(2)}" />\n`;
                    } else if (opts.rounded) {
                        svg += `    <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellSize}" height="${cellSize}" rx="${radius}" />\n`;
                    } else {
                        svg += `    <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellSize}" height="${cellSize}" />\n`;
                    }
                }
            }
        }
        svg += `  </g>\n`;

        // Optional Center Emblem or Label
        if (opts.centerLabel) {
            const centerSize = opts.size * 0.22;
            const centerPos = (opts.size - centerSize) / 2;
            svg += `  <rect x="${centerPos}" y="${centerPos}" width="${centerSize}" height="${centerSize}" rx="8" fill="${opts.colorLight}" stroke="${opts.colorDark}" stroke-width="2" />\n`;
            svg += `  <text x="${opts.size / 2}" y="${opts.size / 2 + 5}" fill="${opts.colorDark}" font-family="monospace" font-weight="bold" font-size="11" text-anchor="middle">${opts.centerLabel}</text>\n`;
        }

        svg += `</svg>`;
        return svg;
    }

    /**
     * Render into an HTML Canvas or create base64 DataURL
     */
    function renderToCanvas(canvas, text, opts) {
        opts = Object.assign({
            size: 260,
            margin: 2,
            colorDark: '#10B981',
            colorLight: '#09090B'
        }, opts || {});

        const qr = createQRCode(text, QRErrorCorrectLevel.M);
        const count = qr.getModuleCount();
        const total = count + opts.margin * 2;
        const cellSize = Math.floor(opts.size / total);
        const actualSize = cellSize * total;

        canvas.width = actualSize;
        canvas.height = actualSize;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = opts.colorLight;
        ctx.fillRect(0, 0, actualSize, actualSize);

        ctx.fillStyle = opts.colorDark;
        for (let r = 0; r < count; r++) {
            for (let c = 0; c < count; c++) {
                if (qr.isDark(r, c)) {
                    ctx.fillRect((c + opts.margin) * cellSize, (r + opts.margin) * cellSize, cellSize, cellSize);
                }
            }
        }
    }

    // -------------------------------------------------------------
    // 4. TRANSIT TICKET CRYPTOGRAPHY HELPERS
    // -------------------------------------------------------------
    const TRANSIT_SECRET_KEY = "safar-kashmir-transit-hmac-root-2026";

    function createTicketPayload(ticket) {
        const payloadData = {
            id: ticket.id || ('SAFAR-JK-' + Math.floor(10000 + Math.random() * 90000)),
            passenger: ticket.passenger || 'Farhaan Bashir',
            route: ticket.route || 'Srinagar TRC -> Baramulla Main',
            bus_class: ticket.busClass || 'Superfast AC Electric',
            seat: ticket.seat || '14A',
            fare_inr: ticket.fare || 180,
            issued_at: ticket.timestamp || Math.floor(Date.now() / 1000),
            valid_until: (ticket.timestamp || Math.floor(Date.now() / 1000)) + 7200
        };

        // Canonical string for offline cryptographic HMAC signature
        const canonicalString = `${payloadData.id}|${payloadData.passenger}|${payloadData.route}|${payloadData.seat}|${payloadData.fare_inr}|${payloadData.issued_at}`;
        const signature = hmacSha256(TRANSIT_SECRET_KEY, canonicalString);

        payloadData.hmac = signature;
        return payloadData;
    }

    function verifyTicketPayload(payload, customSecretKey) {
        const secret = customSecretKey || TRANSIT_SECRET_KEY;
        if (!payload || !payload.id || !payload.passenger || !payload.route || !payload.hmac) {
            return { valid: false, reason: 'Malformed payload schema' };
        }

        const canonicalString = `${payload.id}|${payload.passenger}|${payload.route}|${payload.seat}|${payload.fare_inr}|${payload.issued_at}`;
        const expectedHmac = hmacSha256(secret, canonicalString);

        const now = Math.floor(Date.now() / 1000);
        if (payload.valid_until && now > payload.valid_until) {
            return { valid: false, reason: 'Ticket expired (> 2h elapsed)', expectedHmac };
        }

        if (payload.hmac.toLowerCase() !== expectedHmac.toLowerCase()) {
            return { valid: false, reason: 'HMAC signature mismatch (Tampered or forged pass)', expectedHmac };
        }

        return { valid: true, reason: 'Cryptographic signature authentic (Verified offline)', expectedHmac };
    }

    // -------------------------------------------------------------
    // 5. VCARD GENERATOR HELPER
    // -------------------------------------------------------------
    function createVCard(info) {
        info = Object.assign({
            firstName: 'Farhaan',
            lastName: 'Bashir',
            org: 'SAFARapp Mobility & Transit Systems',
            title: 'Lead Transit & Systems Engineer',
            phone: '+916006048125',
            email: 'farhanbashir327426@gmail.com',
            url: 'https://farhaan.dev',
            note: 'Distributed backend systems, real-time telemetry, & offline transit cryptography.'
        }, info || {});

        return [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `N:${info.lastName};${info.firstName};;;`,
            `FN:${info.firstName} ${info.lastName}`,
            `ORG:${info.org}`,
            `TITLE:${info.title}`,
            `TEL;TYPE=CELL,VOICE:${info.phone}`,
            `EMAIL;TYPE=PREF,INTERNET:${info.email}`,
            `URL:${info.url}`,
            `NOTE:${info.note}`,
            'END:VCARD'
        ].join('\n');
    }

    // Export universally
    const api = {
        generateSVG: generateSVG,
        renderToCanvas: renderToCanvas,
        sha256: sha256,
        hmacSha256: hmacSha256,
        createTicketPayload: createTicketPayload,
        verifyTicketPayload: verifyTicketPayload,
        createVCard: createVCard
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }
    if (typeof globalThis !== 'undefined') {
        globalThis.QRCodeEngine = api;
    }
    if (typeof window !== 'undefined') {
        window.QRCodeEngine = api;
    }

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
