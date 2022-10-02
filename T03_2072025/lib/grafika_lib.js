function gbr_titik(imageDataTemp, x, y, r, g, b) {
    // garis x sama y dibulatkan
    var index = 4 * (Math.ceil(x) + (Math.ceil(y) * canvasKita.width));
    // var index = 4 *(x+y*canvasKita.width);
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

function garis(datanya, awal, akhir, warnanya) {
    let [x1, y1] = awal;
    let [x2, y2] = akhir;
    let [r, g, b] = warnanya;

    let dx = x2 - x1;
    let dy = y2 - y1;
    if (Math.abs(dy) > Math.abs(dx)) {
        // jalan berdasarkan y
        let x = x1;
        // atas ; positif
        if (y2 > y1) {
            for (let y = y1; y < y2; y++) {
                x += dx / Math.abs(dy);
                // garis x sama y dibulatkan
                gbr_titik(datanya, Math.round(x), Math.round(y), r, g, b)
            }
        }
        // bawah ; negatif
        else {
            for (let y = y1; y > y2; y--) {
                x += dx / Math.abs(dy);
                gbr_titik(datanya, Math.round(x), Math.round(y), r, g, b)
            }
        }
    }
    // jalan berdasarkan x
    if (Math.abs(dx) > Math.abs(dy)) {
        let y = y1;
        // kanan ; positif
        if (x2 > x1) {
            for (let x = x1; x < x2; x++) {
                y += dy / Math.abs(dx);
                gbr_titik(datanya, Math.round(x), Math.round(y), r, g, b)
            }
        }
        // kiri ; negatif   
        else {
            for (let x = x1; x > x2; x--) {
                y += dy / Math.abs(dx);
                gbr_titik(datanya, Math.round(x), Math.round(y), r, g, b)
            }
        }
    }
}

// koordinat polar
function gbr_lingkaran_sudut(imageDataTemp, xc, yc, radius, r, g, b) {
    // math * pi * 2 = 360 derajat
    // sin & cos di js itu menerima radian
    // mainin theta makin kecil, lingkaran bagus berarti
    // 0.1 terlalu dikit untuk 360
    for (theta = 0; theta < Math.PI * 2; theta += 0.01) {
        // xc itu buat supaya bisa geser gak di (0,0)
        x = xc + radius * Math.cos(theta);
        y = yc + radius * Math.sin(theta);
        gbr_titik(imageDataTemp, x, y, r, g, b);
    }
}
function gbr_lingkaran(imageDataTemp, posisi, radius, warna){    
    let {xc,yc} = posisi;
    let {r,g,b,a} = warna;
    for(theta = 0; theta<Math.PI*2;theta += 0.01){
        x = xc + radius * Math.cos(theta);
        y = yc + radius * Math.sin(theta);
        gbr_titik(imageDataTemp,x,y,r,g,b,a);
    }
}

function gbr_spiral_sudut(imageDataTemp, xc, yc, radius, r, g, b) {
    // math * pi * 2 = 360 derajat
    // sin & cos di js itu menerima radian
    // mainin theta makin kecil, lingkaran bagus berarti
    // 0.1 terlalu dikit untuk 360
    for (i = 0; i < 720; i+=0.01) {
        // xc itu buat supaya bisa geser gak di (0,0)
        theta = 0.1 * i;
        x = xc + radius * (1 + theta) * Math.cos(theta);
        y = yc + radius * (1 + theta) * Math.sin(theta);
        gbr_titik(imageDataTemp, x, y, r, g, b);
    }
}

// let jalan = 0;
// let xc = 0;
// let yc = 0;
// let alpha_control = 40;
// function lingkaran_jalan() {
//     //clear
//     ctx.clearRect(0, 0, canvasKita.width, canvasKita.height);
//     imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height)

//     gbr_lingkaran(imageDataSaya, { xc: xc, yc: yc }, 100 + jalan, { r: 255, g: 0, b: 0, a: alpha_control });
//     jalan = (jalan + 1) % 200;
//     alpha_control -= 10;
//     ctx.putImageData(imageDataSaya, 0, 0);
//     if (alpha_control <= 0) {
//         cancelAnimationFrame(lingkaran_jalan);
//     }
//     else {
//         requestAnimationFrame(lingkaran_jalan);
//     }
// }

function gbr_bunga_sudut(imageDataTemp, xc, yc, radiusX, radiusY, n, r, g, b) {
    // math * pi * 2 = 360 derajat
    // sin & cos di js itu menerima radian
    // mainin theta makin kecil, lingkaran bagus berarti
    // 0.1 terlalu dikit untuk 360
    for (theta = 0; theta < Math.PI * 2; theta += 0.001) {
        // xc itu buat supaya bisa geser gak di (0,0)
        x = xc + radiusX * Math.cos(n*theta) * Math.cos(theta);
        y = yc + radiusY * Math.cos(n*theta) * Math.sin(theta);
        gbr_titik(imageDataTemp, x, y, r, g, b);
    }
}