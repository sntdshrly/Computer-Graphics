function gbr_titik(imageDataTemp, x, y, r, g, b) {
    // if ((x>0)&&(x<canvasKita.width) && (y>0) && (y<canvasKita.height)){
        // garis x sama y dibulatkan
        var index = 4 * (Math.ceil(x) + (Math.ceil(y) * canvasKita.width));
        imageDataTemp.data[index] = r;
        imageDataTemp.data[index + 1] = g;
        imageDataTemp.data[index + 2] = b;
        imageDataTemp.data[index + 3] = 255;
    // }
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