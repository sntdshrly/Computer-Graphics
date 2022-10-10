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
function gbr_lingkaran_polar(imageDataTemp, xc, yc, radius, r, g, b) {
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
function gbr_lingkaran(imageDataTemp, posisi, radius, warna) {
    let { xc, yc } = posisi;
    let { r, g, b, a } = warna;
    for (theta = 0; theta < Math.PI * 2; theta += 0.01) {
        x = xc + radius * Math.cos(theta);
        y = yc + radius * Math.sin(theta);
        gbr_titik(imageDataTemp, x, y, r, g, b, a);
    }
}
function gbr_spiral_sudut(imageDataTemp, xc, yc, radius, r, g, b) {
    // math * pi * 2 = 360 derajat
    // sin & cos di js itu menerima radian
    // mainin theta makin kecil, lingkaran bagus berarti
    // 0.1 terlalu dikit untuk 360
    for (i = 0; i < 720; i += 0.01) {
        // xc itu buat supaya bisa geser gak di (0,0)
        theta = 0.1 * i;
        x = xc + radius * (1 + theta) * Math.cos(theta);
        y = yc + radius * (1 + theta) * Math.sin(theta);
        gbr_titik(imageDataTemp, x, y, r, g, b);
    }
}
function gbr_bunga_sudut(imageDataTemp, xc, yc, radiusX, radiusY, n, r, g, b) {
    // math * pi * 2 = 360 derajat
    // sin & cos di js itu menerima radian
    // mainin theta makin kecil, lingkaran bagus berarti
    // 0.1 terlalu dikit untuk 360
    for (theta = 0; theta < Math.PI * 2; theta += 0.001) {
        // xc itu buat supaya bisa geser gak di (0,0)
        x = xc + radiusX * Math.cos(n * theta) * Math.cos(theta);
        y = yc + radiusY * Math.cos(n * theta) * Math.sin(theta);
        gbr_titik(imageDataTemp, x, y, r, g, b);
    }
}

function boundaryFillStack(datanya, posisi, batas, warna) {
    // kalau titik yg di posisi bisa diwarna, maka warnai dulu
    let warna_titik_skrg = get_warna(datanya, posisi);
    let my_stack = [];
    let { x, y } = posisi;
    my_stack.push(posisi);
    while (my_stack.length > 0) {
        posisi = my_stack.pop();
        warna_titik_skrg = get_warna(datanya, posisi);
        
        if (!cekWarna(warna_titik_skrg, batas)) {
            gbr_titik_arr(datanya, posisi, warna);
            my_stack.push({ x: posisi.x + 1, y: posisi.y });
            my_stack.push({ x: posisi.x, y: posisi.y + 1 });
            my_stack.push({ x: posisi.x - 1, y: posisi.y });
            my_stack.push({ x: posisi.x, y: posisi.y - 1 });
        }
    }
}

function floodFillStack(datanya, posisi, warna) {
    // kalau titik yg di posisi bisa diwarna, maka warnai dulu
    let warna_titik_skrg = get_warna(datanya, posisi);
    let my_stack = [];
    my_stack.push(posisi);
    while (my_stack.length > 0) {
        posisi = my_stack.pop();
        warna_titik_skrg = get_warna(datanya, posisi);
        // kalau warna yg di kotak != border
        if (cekWarna(warna_titik_skrg, {r:0,g:0,b:0})) {
            gbr_titik_arr(datanya, posisi, warna);
            my_stack.push({ x: posisi.x + 1, y: posisi.y });
            my_stack.push({ x: posisi.x, y: posisi.y + 1 });
            my_stack.push({ x: posisi.x - 1, y: posisi.y });
            my_stack.push({ x: posisi.x, y: posisi.y - 1 });
        }
    }
    ctx.putImageData(imageDataSaya, 0, 0);
}
function get_warna(datanya, posisi) {
    let { x, y } = posisi;
    let index = (x + y * canvasKita.width) * 4;
    let r, g, b;
    r = datanya.data[index];
    g = datanya.data[index + 1];
    b = datanya.data[index + 2];
    return { r: r, g: g, b: b };
};
function cekWarna(color1, color2) {
    if (color1.r == color2.r && color1.g == color2.g && color1.b == color2.b) {
        return true
    }
    else {
        return false
    }
}
function getBunga(){
    // bunga 1
    gbr_bunga_sudut(imageDataSaya,200,200,100,100,4,255,0,0,0);
    floodFillStack(imageDataSaya, {x:150,y:150},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:150,y:200},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:200,y:150},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:250,y:150},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:250,y:200},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:250,y:250},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:200,y:250},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:150,y:250},{r:255,g:0,b:0});
    // bunga 2
    gbr_bunga_sudut(imageDataSaya,200,450,100,100,2,255,0,0,0);
    floodFillStack(imageDataSaya, {x:200,y:400},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:250,y:450},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:200,y:500},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:150,y:450},{r:255,g:0,b:0});
    // bunga 3
    gbr_bunga_sudut(imageDataSaya,450,200,100,100,10,255,0,0,0);floodFillStack(imageDataSaya, {x:450,y:150},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:470,y:150},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:490,y:150},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:500,y:170},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:500,y:180},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:500,y:200},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:500,y:220},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:500,y:240},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:450,y:280},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:460,y:240},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:480,y:240},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:440,y:240},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:420,y:220},{r:255,g:0,b:0});floodFillStack(imageDataSaya, {x:430,y:230},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:420,y:200},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:420,y:210},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:420,y:180},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:420,y:190},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:430,y:175},{r:255,g:0,b:0});
    floodFillStack(imageDataSaya, {x:440,y:165},{r:255,g:0,b:0});
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

function gbr_persegi_unfilled_1(jalan) {
    gbr_garis(imageDataSaya, 100, 150, 110+jalan, 150, 255, 0, 0); //x
    gbr_garis(imageDataSaya, 100, 200, 110+jalan, 200, 255, 0, 0);
    gbr_garis(imageDataSaya, 100, 150, 100, 200, 255, 0, 0); //y
    gbr_garis(imageDataSaya, 110+jalan, 150, 110+jalan, 200, 255, 0, 0);
    floodFillStack(imageDataSaya, {x:105,y:160},{r:255,g:0,b:0});
}

function gbr_persegi_unfilled_2() {
    gbr_garis(imageDataSaya, 110, 150, 310, 150, 0, 255, 0); //x
    gbr_garis(imageDataSaya, 110, 200, 310, 200, 0, 255, 0);
    gbr_garis(imageDataSaya, 110, 150, 110, 200, 0, 255, 0); //y
    gbr_garis(imageDataSaya, 310, 150, 310, 200, 0, 255, 0);
    floodFillStack(imageDataSaya, {x:115,y:160},{r:0,g:255,b:0});
}