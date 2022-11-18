class MatrixGrafkom {

  static multiplyMatrix(m1,m2) {
   let m3 = this.createBlank();
   for (let i=0;i< 3;i++) {
    for (let j=0;j<3;j++) {
      for (let k=0;k<3;k++) {
        m3[i][j] += m1[i][k]*m2[k][j];
      }
    }
   }
   return m3;
  }

  static createBlank() {
    return [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
  }

  static createIdentity() {
    return [
      [1,0,0],
      [0,1,0],
      [0,0,1]
    ];
  }

  static createTranslation(t) { 
    let [Tx,Ty] = t;
    return [
      [1,0,Tx],
      [0,1,Ty],
      [0,0,1],
    ];
  }

  static createScale(s) {
    let [Sx,Sy] = s;
    return [
      [Sx,0,0],
      [0,Sy,0],
      [0,0,1],
    ];
  }


  static createFixedPointScale(c,s) {
    let [Cx,Cy] = c;
    let matriks_hasil_translasi = MatrixGrafkom.createTranslation([-Cx,-Cy]);
    let matriks_skala = MatrixGrafkom.createScale(s);
    let matriks_kembali = MatrixGrafkom.createTranslation([Cx,Cy]);
    let matriks_perkalian = MatrixGrafkom.multiplyMatrix(matriks_skala,matriks_hasil_translasi); // translasi dulu, baru skala
    return (MatrixGrafkom.multiplyMatrix(matriks_kembali,matriks_perkalian));
  }

  static createRotation(angle) {
    let theta = angle * Math.PI / 180
    return [
      [Math.cos(theta),-Math.sin(theta),0],
      [Math.sin(theta),Math.cos(theta),0],
      [0,0,1],
    ];
  }

  static createFixedPointRotation(c,angle) {
    let [Cx,Cy] = c;
    let matriks_hasil_translasi = MatrixGrafkom.createTranslation([-Cx,-Cy]);
    let matriks_rotasi = MatrixGrafkom.createRotation(angle);
    let matriks_kembali = MatrixGrafkom.createTranslation([Cx,Cy]);
    let matriks_perkalian = MatrixGrafkom.multiplyMatrix(matriks_rotasi, matriks_hasil_translasi); // translasi dulu, baru rotasi
    return (MatrixGrafkom.multiplyMatrix(matriks_kembali,matriks_perkalian));
  }


  static transformPoint(p,m) {
    let [x,y] = p;
    let xR = m[0][0] * x + m[0][1] * y + m[0][2];
    let yR = m[1][0] * x + m[1][1] * y + m[1][2];
    
    return [Math.round(xR),Math.round(yR)];
  }

  static transformPoints(points,m) {
    let result = [];
    points.forEach(p => {
      result.push(this.transformPoint(p,m));
    });
    return result;
  }

}

function polygon(points, color) {
  ctx.strokeStyle = color;

  let [x0,y0] = points[0];
  ctx.moveTo(x0, y0);
  ctx.beginPath();
  points.forEach((p) => {
    let [x,y] = p;
    ctx.lineTo(x,y);
    ctx.moveTo(x,y);
  });
  ctx.lineTo(x0,y0);
  ctx.stroke();

  ctx.strokeStyle = "black";
}

