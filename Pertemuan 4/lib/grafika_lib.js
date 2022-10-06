function gbr_titik(imageDataTemp, x, y, r, g, b) {
    // garis x sama y dibulatkan
    var index = 4 * (Math.ceil(x) + (Math.ceil(y) * canvasKita.width));
    imageDataTemp.data[index] = r;
    imageDataTemp.data[index + 1] = g;
    imageDataTemp.data[index + 2] = b;
    imageDataTemp.data[index + 3] = 255;
}

function gbr_titik_arr(datanya, posisi, warna) {
    let { x, y } = posisi;
    let { r, g, b } = warna;
    let index = 4 * (Math.ceil(x) + (Math.ceil(y) * canvasKita.width));
    datanya.data[index] = r;
    datanya.data[index + 1] = g;
    datanya.data[index + 2] = b
    datanya.data[index + 3] = 255;
}

function gbr_garis(imageDataSaya, x1, y1, x2, y2, r, g, b) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    // gambar garis jalan di x
    if (Math.abs(dx) > Math.abs(dy)) {
        // ke kanan   
        if (x2 > x1) {
            var y = y1;
            for (var x = x1; x < x2; x++) {
                y = y + dy / Math.abs(dx); //1/m
                gbr_titik(imageDataSaya, x, y, r, g, b)
            }
        }
        else {
            // ke kiri
            var y = y1;
            for (var x = x1; x > x2; x--) {
                y = y + dy / Math.abs(dx); //1/m
                gbr_titik(imageDataSaya, x, y, r, g, b)
            }
        }
    }
    // jalan di y
    else {
        if (y2 > y1) {
            // ke atas   
            var x = x1;
            for (var y = y1; y < y2; y++) {
                x = x + dx / Math.abs(dy); //m
                gbr_titik(imageDataSaya, x, y, r, g, b)
            }
        }
        else {
            // ke bawah
            var x = x1;
            for (var y = y1; y > y2; y--) {
                x = x + dx / Math.abs(dy); //m
                gbr_titik(imageDataSaya, x, y, r, g, b)
            }
        }
    }
}

function polygon(imageDataSaya, titik, warna) {
    r = warna[0];
    g = warna[1];
    b = warna[2];
    for (i = 0; i < titik.length - 1; i++) {
        x1 = titik[i].x;
        y1 = titik[i].y;
        x2 = titik[i + 1].x;
        y2 = titik[i + 1].y;
        gbr_garis(imageDataSaya, x1, y1, x2, y2, r, g, b);
    }
    gbr_garis(imageDataSaya, titik[titik.length - 1].x, titik[titik.length - 1].y, titik[0].x, titik[0].y, r, g, b);
}

function floodFillNaive(imageDataSaya, canvas, x, y, toFlood, color) {
    var index = 4 * (x + (y * canvas.width));
    var r1 = imageDataSaya.data[index];
    var g1 = imageDataSaya.data[index + 1];
    var b1 = imageDataSaya.data[index + 2];
    // mau ganti warna
    if (r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
        imageDataSaya.data[index] = color.r;
        imageDataSaya.data[index + 1] = color.g;
        imageDataSaya.data[index + 2] = color.b;
        imageDataSaya.data[index + 3] = 255;
        floodFillNaive(imageDataSaya, canvas, x + 1, y, toFlood, color);
        floodFillNaive(imageDataSaya, canvas, x - 1, y, toFlood, color);
        floodFillNaive(imageDataSaya, canvas, x, y + 1, toFlood, color);
        // floodFillNaive(imageDataSaya, canvas, x, y - 1, toFlood, color);
    }
}


function floodFillStack(imageDataSaya, canvas, x0, y0, toFlood, color) {
    var tumpukan = [];
    tumpukan.push({ x: x0, y: y0 });
    while (tumpukan.length > 0) {
        // ambil 1 titik, trs cek bisa diwarna atau ga, kalau bisa warna lalu masukan dalam tumpukan titik sekitarnya
        var titik_skrg = tumpukan.pop();
        var index_skrg = 4 * (titik_skrg.x + (titik_skrg.y * canvas.width));
        var r1 = imageDataSaya.data[index_skrg];
        var g1 = imageDataSaya.data[index_skrg + 1];
        var b1 = imageDataSaya.data[index_skrg + 2];
        if (r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
            // mau ganti warna
            imageDataSaya.data[index_skrg] = color.r;
            imageDataSaya.data[index_skrg + 1] = color.g;
            imageDataSaya.data[index_skrg + 2] = color.b;
            imageDataSaya.data[index_skrg + 3] = 255;

            tumpukan.push({ x: titik_skrg.x + 1, y: titik_skrg.y })
            tumpukan.push({ x: titik_skrg.x - 1, y: titik_skrg.y })
            // tumpukan.push({ x: titik_skrg.x, y: titik_skrg.y + 1 })
            tumpukan.push({ x: titik_skrg.x, y: titik_skrg.y - 1 })
        }
    }
}