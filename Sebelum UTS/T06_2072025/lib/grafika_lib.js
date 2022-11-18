function clear_screen() {
  ctx.clearRect(0, 0, kanvas.clientWidth, kanvas.clientHeight);
}

class MatrixGrafkom {

  static multiplyMatrix(m1, m2) {
    let m3 = this.createBlank();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          m3[i][j] += m1[i][k] * m2[k][j];
        }
      }
    }
    return m3;
  }

  static createBlank() {
    return [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }

  static createIdentity() {
    return [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
  }

  static createTranslation(t) {
    let [Tx, Ty] = t;
    return [
      [1, 0, Tx],
      [0, 1, Ty],
      [0, 0, 1],
    ];
  }

  static createScale(s) {
    let [Sx, Sy] = s;
    return [
      [Sx, 0, 0],
      [0, Sy, 0],
      [0, 0, 1],
    ];
  }


  static createFixedPointScale(c, s) {
    let [Cx, Cy] = c;
    let matriks_hasil_translasi = MatrixGrafkom.createTranslation([-Cx, -Cy]);
    let matriks_skala = MatrixGrafkom.createScale(s);
    let matriks_kembali = MatrixGrafkom.createTranslation([Cx, Cy]);
    let matriks_perkalian = MatrixGrafkom.multiplyMatrix(matriks_skala, matriks_hasil_translasi); // translasi dulu, baru skala
    return (MatrixGrafkom.multiplyMatrix(matriks_kembali, matriks_perkalian));
  }

  static createRotation(angle) {
    let theta = angle * Math.PI / 180
    return [
      [Math.cos(theta), -Math.sin(theta), 0],
      [Math.sin(theta), Math.cos(theta), 0],
      [0, 0, 1],
    ];
  }

  static createFixedPointRotation(c, angle) {
    let [Cx, Cy] = c;
    let matriks_hasil_translasi = MatrixGrafkom.createTranslation([-Cx, -Cy]);
    let matriks_rotasi = MatrixGrafkom.createRotation(angle);
    let matriks_kembali = MatrixGrafkom.createTranslation([Cx, Cy]);
    let matriks_perkalian = MatrixGrafkom.multiplyMatrix(matriks_rotasi, matriks_hasil_translasi); // translasi dulu, baru rotasi
    return (MatrixGrafkom.multiplyMatrix(matriks_kembali, matriks_perkalian));
  }


  static transformPoint(p, m) {
    let [x, y] = p;
    let xR = m[0][0] * x + m[0][1] * y + m[0][2];
    let yR = m[1][0] * x + m[1][1] * y + m[1][2];

    return [Math.round(xR), Math.round(yR)];
  }

  static transformPoints(points, m) {
    let result = [];
    points.forEach(p => {
      result.push(this.transformPoint(p, m));
    });
    return result;
  }

}

// function polygon(points, color) {
//   ctx.strokeStyle = color;

//   let [x0, y0] = points[0];
//   ctx.moveTo(x0, y0);
//   ctx.beginPath();
//   points.forEach((p) => {
//     let [x, y] = p;
//     ctx.lineTo(x, y);
//     ctx.moveTo(x, y);
//   });
//   ctx.lineTo(x0, y0);
//   ctx.stroke();

//   ctx.strokeStyle = "black";
// }
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
function gbr_lingkaran_sudut(imageDataTemp, xc, yc, radius, r, g, b) {
  // math * pi - 180 derajat
  for (theta = 0; theta < Math.PI * 2; theta += 0.01) {
    x = xc + radius * Math.cos(theta);
    y = yc + radius * Math.sin(theta);
    gbr_titik(imageDataTemp, x, y, r, g, b);
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
      tumpukan.push({ x: titik_skrg.x, y: titik_skrg.y + 1 })
      tumpukan.push({ x: titik_skrg.x, y: titik_skrg.y - 1 })
    }
  }
  ctx.putImageData(imageDataSaya, 0, 0);
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
function polygon_matriks(imageDataSaya, titik, warna) {
r = warna[0];
g = warna[1];
b = warna[2];
  for (i = 0; i < titik.length - 1; i++) {
      x1 = titik[i][0];
      y1 = titik[i][1];
      x2 = titik[i + 1][0];
      y2 = titik[i + 1][1];
      gbr_garis(imageDataSaya, x1, y1, x2, y2, r, g, b);
  }
  gbr_garis(imageDataSaya, titik[titik.length - 1][0], titik[titik.length - 1][1], titik[0][0], titik[0][1], r, g, b);
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
// function gbr_titik(datanya,posisi,warna){
//   let {x,y} = posisi;
//   let {r,g,b} = warna;
//   let index = (x+y*canvasKita.width)*4;
//   datanya.data[index] = r;
//   datanya.data[index+1] = g;
//   datanya.data[index+2] = b
//   datanya.data[index+3] = 255;
// }