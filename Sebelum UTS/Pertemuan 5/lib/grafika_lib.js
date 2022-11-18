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
function translasi(awal,pindahnya){
    let [x,y]=awal;
    let [ox,oy]=pindahnya;
    let x_akhir = x+ox;
    let y_akhir = y+oy;
    return [x_akhir,y_akhir];
}
function translasi_byk(titik2nya, pindahnya){
    let isi = [];
    for(let i=0;i<titik2nya.length;i++){
        let [x,y] = translasi([titik2nya[i].x,titik2nya[i].y], pindahnya);
        isi.push({x:x,y:y});
    }
    return isi
}
function skala(awal,skalanya){
    let [x,y]=awal;
    let [ox,oy]=skalanya;
    let x_akhir = x*ox;
    let y_akhir = y*oy;
    return [x_akhir,y_akhir];
}
function skala_byk(titik2nya, pindahnya){
    let isi = [];
    for(let i=0;i<titik2nya.length;i++){
        let [x,y] = skala([titik2nya[i].x,titik2nya[i].y], pindahnya);
        isi.push({x:x,y:y});
    }
    return isi
}
function rotasi(awal,A){
    let [x,y]=awal;
    let x_akhir = x*Math.cos(A) - y*Math.sin(A);
    let y_akhir = y*Math.cos(A) + x*Math.sin(A);
    return [x_akhir,y_akhir];
}
function rotasi_byk(titik2nya, pindahnya){
    let isi = [];
    for(let i=0;i<titik2nya.length;i++){
        let [x,y] = rotasi([titik2nya[i].x,titik2nya[i].y], pindahnya);
        isi.push({x:x,y:y});
    }
    return isi
}
function rotasi_byk_fixed(titik2nya, pindahnya){
    titik2_translasi = translasi_byk(titik2nya,[titik2nya[0].x*-1,titik2nya[0].y*-1]);
    let isi = [];
    for(let i=0;i<titik2_translasi.length;i++){
        let [x,y] = rotasi([titik2_translasi[i].x,titik2_translasi[i].y], pindahnya);
        isi.push({x:x,y:y});
        console.log(titik2_translasi[i].x);
    }
    console.log(isi);
    titik2_hasil = translasi_byk(isi,[isi[0].x,isi[0].y]);
    return titik2_hasil
}
function gbr_lingkaran_sudut(imageDataTemp, xc, yc, radius, r,g,b){
    // math * pi * 2 = 360 derajat
    // sin & cos di js itu menerima radian
    // mainin theta makin kecil, lingkaran bagus berarti
    // 0.1 terlalu dikit untuk 360
    for(theta = 0; theta<Math.PI*2;theta += 0.01){
        // xc itu buat supaya bisa geser gak di (0,0)
        x = xc + radius * Math.cos(theta);
        y = yc + radius * Math.sin(theta);
        gbr_titik(imageDataTemp,x,y,r,g,b);
    }
}
