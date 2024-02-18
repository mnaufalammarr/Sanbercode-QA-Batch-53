const prompt = require('prompt-sync')({sigint: true});

function akarPangkatDua(x) {
    if (x < 0) {
        throw "Tidak bisa input bilangan negatif";
    } else if (x % 2 !== 0) {
        throw "Tidak bisa input bilangan ganjil";
    } else {
        return Math.sqrt(x);
    }
}

try {
    var input = parseInt(prompt("Masukkan bilangan genap positif: "));
    var result = akarPangkatDua(input);
    console.log("Akar pangkat 2 dari", input, "adalah", result);
} catch (error) {
    console.log("Error:", error);
}