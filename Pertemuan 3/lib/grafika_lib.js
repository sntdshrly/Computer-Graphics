function gbr_titik(imageDataTemp,x,y,r,g,b){
    // garis x sama y dibulatkan
    var index = 4 *(Math.ceil(x)+(Math.ceil(y)*canvasKita.width));
    // var index = 4 *(x+y*canvasKita.width);
    imageDataTemp.data[index] = r;
    imageDataTemp.data[index+1] = g;
    imageDataTemp.data[index+2] = b;
    imageDataTemp.data[index+3] = 255;     
    }

function gbr_titik_arr(datanya,posisi,warna){
        let {x,y} = posisi;
        let {r,g,b} = warna;
        let index = 4 *(Math.ceil(x)+(Math.ceil(y)*canvasKita.width));
        datanya.data[index] = r;
        datanya.data[index+1] = g;
        datanya.data[index+2] = b
        datanya.data[index+3] = 255;
    }

function gbr_lingkaran_sisi(imageDataTemp, xc, yc, radius, r,g,b){
    // pilih dari x atau y

    // jalan dari xc-radius sampai dg xc+radius
    // kita tentuin y nya
    // kita gambar di x,y
    // math pow untuk pangkat
    for (x = xc-radius; x<xc+radius; x++){
        // ada + dan -
        y = yc + Math.sqrt(Math.pow(radius,2)-Math.pow((x-xc),2)); // akar dari r**2 - (x-xc)**2
        gbr_titik(imageDataTemp,x,y,r,g,b);

        y = yc - Math.sqrt(Math.pow(radius,2)-Math.pow((x-xc),2)); // akar dari r**2 - (x-xc)**2
        gbr_titik(imageDataTemp,x,y,r,g,b);
    }
    
    for (x = xc-radius; x<xc+radius; x++){
        // ada + dan -
        y = yc + Math.sqrt(Math.pow(radius,2)-Math.pow((x-xc),2)); // akar dari r**2 - (x-xc)**2
        gbr_titik(imageDataTemp,y,x,r,g,b);

        y = yc - Math.sqrt(Math.pow(radius,2)-Math.pow((x-xc),2)); // akar dari r**2 - (x-xc)**2
        gbr_titik(imageDataTemp,y,x,r,g,b);
    }
}

// koordinat polar
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

// koordinat polar
function gbr_ellips_sudut(imageDataTemp, xc, yc, radiusX, radiusY, r,g,b){
    // math * pi * 2 = 360 derajat
    // sin & cos di js itu menerima radian
    // mainin theta makin kecil, lingkaran bagus berarti
    // 0.1 terlalu dikit untuk 360
    for(theta = 0; theta<Math.PI*2;theta += 0.01){
        // xc itu buat supaya bisa geser gak di (0,0)
        x = xc + radiusX * Math.cos(theta);
        y = yc + radiusY * Math.sin(theta);
        gbr_titik(imageDataTemp,x,y,r,g,b);
    }
}