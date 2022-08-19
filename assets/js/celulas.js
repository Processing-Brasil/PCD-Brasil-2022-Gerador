celulas = [
  // function(brilho, bounds) {
  //   //  brilho - varia entre 0-1. é o valor de luminosidade da célula
  //   //
  //   //  bounds contem:
  //   //
  //   //  bounds.x , bounds.y - posição do canto superior esquerdo
  //   //  ↓
  //   //  ┏━━━━━━━━━━━━━━━━━━━━━┓
  //   //  ┃                     ┃
  //   //  ┃                     ┃
  //   //  ┃                     ┃
  //   //  ┃                     ┃ bounds.h - altura da celula
  //   //  ┃                     ┃
  //   //  ┃                     ┃
  //   //  ┃                     ┃
  //   //  ┗━━━━━━━━━━━━━━━━━━━━━┛
  //   //          bounds.w - largura da celulas
  //
  //
  //
  //   this.atualiza = function(tempoAnima) {
  //     //  essa função é chamada a cada frame. Aqui você pode alterar o desenho da sua célula conforme o tempoAnima.
  //     //  tempoAnima varia de 0-1 conforme o tempo da animação. 0 - primeiro frame, 0.5 - metade da animação, 1 - fim da animação
  //     //  idealmente, a celula fica 100% acesa e no seu quadrado a maior parte do tempo - pra textura manter consistencia durante boa parte do tempo
  //     //
  //   }
  //
  //   this.desenha = function() {
  //     //  aqui você desenha sua célula
  //     //  use cor_shape no desenho das suas formas
  //
  //   }
  //
  //   this.salva = function(c) {
  //     //  essa função é uma cópia do desenha()
  //     //  fill(corShape) vira -> c.fill(corShape)
  //
  //   }
  // },

  function(brilho, bounds) { // QUADRADO PRETO NO FUNDO BRANCO
    this.brilho = 1 - brilho
    this.bounds = bounds

    this.randSeed = random(100)
    //DAQUI PRA BAIXO É FIRULA
    this.pos0 = createVector(this.bounds.x + round(this.bounds.w * 0.5), this.bounds.y + round(this.bounds.h * 0.5))
    this.maxA = map(sq(brilho), 1, 0, PI, 0)

    this.atualiza = function(tempoAnima) { // função pra atualizar sua celula
      this.a = sin(tempoAnima * TWO_PI + this.randSeed)*this.maxA
    }

    this.desenha = function() { // função pra desenhar sua celula
      noStroke()
      fill(cor_shape)
      translate(this.pos0.x, this.pos0.y)
      let halfW = this.bounds.w*0.5
      let halfH = this.bounds.h*0.5
      beginShape()
      vertex(-halfW, -halfH)
      vertex(halfW, -halfH)
      vertex(halfW, halfH)
      vertex(-halfW, halfH)
      beginContour()
      let wBuraco = this.bounds.w * 0.5 * this.brilho
      let hBuraco = this.bounds.h * 0.5 * this.brilho
      let v1B = createVector(-wBuraco, -hBuraco)
      let v2B = createVector(-wBuraco, hBuraco)
      let v3B = createVector(wBuraco, hBuraco)
      let v4B = createVector(wBuraco, -hBuraco)
      v1B.rotate(this.a)
      v2B.rotate(this.a)
      v3B.rotate(this.a)
      v4B.rotate(this.a)
      vertex(v1B.x, v1B.y)
      vertex(v2B.x, v2B.y)
      vertex(v3B.x, v3B.y)
      vertex(v4B.x, v4B.y)
      endContour()
      endShape()
    }

    this.salva = function(c) { // copia da funçao desenha, mas desenhando em um canvas c
      c.noStroke()
      c.fill(cor_shape)
      c.translate(this.pos0.x, this.pos0.y)
      let halfW = this.bounds.w*0.5
      let halfH = this.bounds.h*0.5
      c.beginShape()
      c.vertex(-halfW, -halfH)
      c.vertex(halfW, -halfH)
      c.vertex(halfW, halfH)
      c.vertex(-halfW, halfH)
      c.beginContour()
      let wBuraco = this.bounds.w * 0.5 * this.brilho
      let hBuraco = this.bounds.h * 0.5 * this.brilho
      let v1B = createVector(-wBuraco, -hBuraco)
      let v2B = createVector(-wBuraco, hBuraco)
      let v3B = createVector(wBuraco, hBuraco)
      let v4B = createVector(wBuraco, -hBuraco)
      v1B.rotate(this.a)
      v2B.rotate(this.a)
      v3B.rotate(this.a)
      v4B.rotate(this.a)
      c.vertex(v1B.x, v1B.y)
      c.vertex(v2B.x, v2B.y)
      c.vertex(v3B.x, v3B.y)
      c.vertex(v4B.x, v4B.y)
      c.endContour()
      c.endShape()
    }
  },

  function(brilho, bounds) { // QUADRADO INTERPOLA ENTRE BRANCO E PRETO?
    this.brilhoOrig = brilho
    this.bounds = bounds
    this.pos0 = createVector(this.bounds.x + round(this.bounds.w * 0.5), this.bounds.y + round(this.bounds.h * 0.5))

    //DAQUI PRA BAIXO É FIRULA
    this.brilhoAtual = 0
    // this.tIntro = random(0.1, 0.25)
    // this.tOutro = random(0.1, 0.4)
    this.direcao = floor(random(4))
    this.randSeed = random(100)

    this.atualiza = function(tempoAnima) { // função pra atualizar sua celula
      this.brilhoAtual = map(sin(tempoAnima*TWO_PI*2+this.randSeed), -1, 1, this.brilhoOrig*0.8, this.brilhoOrig*1.1)
      // if (tempoAnima < this.tIntro) {
      //   this.brilhoAtual = map(tempoAnima, 0, this.tIntro, 0, this.brilhoOrig)
      // } else if (tempoAnima > 1 - this.tOutro) {
      //   this.brilhoAtual = map(tempoAnima, 1 - this.tOutro, 1, this.brilhoOrig, 0)
      // } else this.brilhoAtual = this.brilhoOrig
    }

    this.desenha = function() { // função pra desenhar sua celula
      noStroke()
      fill(cor_shape)
      if (this.direcao == 0) {
        rect(this.bounds.x, this.bounds.y, this.bounds.w * this.brilhoAtual, this.bounds.h)
      } else if (this.direcao == 1) {
        rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h * this.brilhoAtual)
      } else if (this.direcao == 2) {
        let w = this.bounds.w * this.brilhoAtual
        rect(this.bounds.x + (this.bounds.w - w), this.bounds.y, w, this.bounds.h)
      } else if (this.direcao == 3) {
        let h = this.bounds.h * this.brilhoAtual
        rect(this.bounds.x, this.bounds.y + (this.bounds.h - h), this.bounds.w, h)
      }
    }

    this.salva = function(c) { // copia da funçao desenha, mas desenhando em um canvas c
      c.noStroke()
      c.fill(cor_shape)
      if (this.direcao == 0) {
        c.rect(this.bounds.x, this.bounds.y, this.bounds.w * this.brilhoAtual, this.bounds.h)
      } else if (this.direcao == 1) {
        c.rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h * this.brilhoAtual)
      } else if (this.direcao == 2) {
        let w = this.bounds.w * this.brilhoAtual
        c.rect(this.bounds.x + (this.bounds.w - w), this.bounds.y, w, this.bounds.h)
      } else if (this.direcao == 3) {
        let h = this.bounds.h * this.brilhoAtual
        c.rect(this.bounds.x, this.bounds.y + (this.bounds.h - h), this.bounds.w, h)
      }
    }
  },

  function(brilho, bounds) { // QUADRADO INTERPOLA ENTRE BRANCO E PRETO 2?
    this.brilhoOrig = brilho
    this.bounds = bounds
    this.pos0 = createVector(this.bounds.x + round(this.bounds.w * 0.5), this.bounds.y + round(this.bounds.h * 0.5))

    //DAQUI PRA BAIXO É FIRULA
    this.brilhoAtual = 0
    this.tIntro = random(0.1, 0.25)
    this.tOutro = random(0.1, 0.4)
    this.direcao = floor(random(4))
    // this.d = this.bounds.w*0.5
    // this.pos1 = createVector(this.bounds.x, this.bounds.y)
    // this.pos2 = createVector(this.bounds.x + this.bounds.w, this.bounds.y + this.bounds.h)
    this.x2 = this.bounds.x + this.bounds.w
    this.y2 = this.bounds.y + this.bounds.h
    this.randSeed = random(1)

    this.atualiza = function(tempoAnima) { // função pra atualizar sua celula
      tempoAnima = (tempoAnima+ this.randSeed)%1
      if (tempoAnima < this.tIntro) {
        this.brilhoAtual = map(tempoAnima, 0, this.tIntro, 0, this.brilhoOrig)
      } else if (tempoAnima > 1 - this.tOutro) {
        this.brilhoAtual = map(tempoAnima, 1 - this.tOutro, 1, this.brilhoOrig, 0)
      } else this.brilhoAtual = this.brilhoOrig
    }

    this.desenha = function() { // função pra desenhar sua celula
      // stroke(0)
      noStroke()
      // fill(255,0,0)
      // rectMode(CENTER)
      // rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h)
      fill(cor_shape)
      if (this.direcao == 0) {
        beginShape()
        vertex(this.bounds.x, this.bounds.y)
        vertex(this.bounds.x, this.y2)
        vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.bounds.y, this.y2, this.brilhoAtual))
        vertex(this.x2, this.bounds.y)
        endShape(CLOSE)
        // rect(this.bounds.x, this.bounds.y, this.bounds.w*this.brilhoAtual, this.bounds.h)
      } else if (this.direcao == 1) {
        beginShape()

        vertex(this.bounds.x, this.y2)
        vertex(this.x2, this.y2)
        vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        vertex(this.bounds.x, this.bounds.y)
        endShape(CLOSE)
      } else if (this.direcao == 2) {
        beginShape()
        vertex(this.x2, this.y2)
        vertex(this.bounds.x, this.y2)
        vertex(lerp(this.x2, this.bounds.x, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        vertex(this.x2, this.bounds.y)
        endShape(CLOSE)
      } else if (this.direcao == 3) {
        beginShape()
        vertex(this.bounds.x, this.y2)
        vertex(this.bounds.x, this.bounds.y)
        vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        vertex(this.x2, this.y2)
        endShape(CLOSE)
      }
    }

    this.salva = function(c) { // copia da funçao desenha, mas desenhando em um canvas c
      c.noStroke()
      c.fill(cor_shape)
      if (this.direcao == 0) {
        c.beginShape()
        c.vertex(this.bounds.x, this.bounds.y)
        c.vertex(this.bounds.x, this.y2)
        c.vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.bounds.y, this.y2, this.brilhoAtual))
        c.vertex(this.x2, this.bounds.y)
        c.endShape(CLOSE)
        // rect(this.bounds.x, this.bounds.y, this.bounds.w*this.brilhoAtual, this.bounds.h)
      } else if (this.direcao == 1) {
        c.beginShape()

        c.vertex(this.bounds.x, this.y2)
        c.vertex(this.x2, this.y2)
        c.vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        c.vertex(this.bounds.x, this.bounds.y)
        c.endShape(CLOSE)
      } else if (this.direcao == 2) {
        c.beginShape()
        c.vertex(this.x2, this.y2)
        c.vertex(this.bounds.x, this.y2)
        c.vertex(lerp(this.x2, this.bounds.x, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        c.vertex(this.x2, this.bounds.y)
        c.endShape(CLOSE)
      } else if (this.direcao == 3) {
        c.beginShape()
        c.vertex(this.bounds.x, this.y2)
        c.vertex(this.bounds.x, this.bounds.y)
        c.vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        c.vertex(this.x2, this.y2)
        c.endShape(CLOSE)
      }
    }
  },


  function(brilho, bounds) { // RISCOS EM FLOWFIELD
    this.brilhoOrig = brilho * 255
    this.bounds = bounds
    this.pos0 = createVector(this.bounds.x + round(this.bounds.w * 0.5), this.bounds.y + round(this.bounds.h * 0.5))
    this.brilhoAtual = this.brilhoOrig
    // this.tIntro = random(0.1, 0.3)
    // this.tOutro = random(0.1, 0.3)
    this.angle = 0
    this.dis = this.bounds.w / 5
    this.randSeed = random(100)

    this.atualiza = function(tempoAnima) {
      // if (tempoAnima < this.tIntro) {
      //   this.brilhoAtual = map(tempoAnima, 0, this.tIntro, 0, this.brilhoOrig)
      // } else if (tempoAnima > 1 - this.tOutro) {
      //   this.brilhoAtual = map(tempoAnima, 1 - this.tOutro, 1, this.brilhoOrig, 0)
      // } else this.brilhoAtual = this.brilhoOrig
      let res = 0.05
      let a = tempoAnima*TWO_PI
      let xNoise = cos(a)*res+ this.randSeed
      let yNoise = sin(a)*res + this.randSeed
      this.angle = noise(xNoise, yNoise) * 2 * TWO_PI
      this.strk = map(this.brilhoAtual, 0, 255, 0, this.dis)
    }

    this.desenha = function() {
      noFill()
      strokeCap(SQUARE);
      stroke(cor_shape)
      strokeWeight(this.strk)
      translate(this.pos0.x, this.pos0.y)
      rotate(this.angle)
      for (let x = -this.bounds.w * 0.5; x <= this.bounds.w * 0.5; x += this.dis) {
        line(x, -this.bounds.h * 0.5, x, this.bounds.h * 0.5)
      }
    }

    this.salva = function(c) {
      c.noFill()
      c.strokeCap(SQUARE);
      c.stroke(cor_shape)
      c.strokeWeight(this.strk)
      c.translate(this.pos0.x, this.pos0.y)
      c.rotate(this.angle)
      for (let x = -this.bounds.w * 0.5; x <= this.bounds.w * 0.5; x += this.dis) {
        c.line(x, -this.bounds.h * 0.5, x, this.bounds.h * 0.5)
      }
    }
  },

  function(brilho, bounds) { // CIRCULAR FLOW FIELD
    this.bounds = bounds
    this.brilho = brilho
    this.pos0 = createVector(this.bounds.x + round(this.bounds.w * 0.5), this.bounds.y + round(this.bounds.h * 0.5))
    this.posR = this.pos0.copy()
    this.posD = this.pos0.copy()
    this.tamCelula = max(bounds.w, bounds.h)
    this.raioD = 0
    this.raioR = 0
    this.maxRaio = map(brilho, 0, 1, 0, this.tamCelula * 0.5)
    this.tStartMotion = random(0.5, 0.9)
    this.random = random(1)

    this.atualiza = function(tempoAnima) {
      tempoAnima = (tempoAnima+this.random)%1
      let tIntro = 0.1
      if (tempoAnima < tIntro) {
        this.raioD = map(tempoAnima, 0, tIntro, 0, this.maxRaio)
      } else if (tempoAnima > 1 - tIntro) {
        this.raioD = map(tempoAnima, 1 - tIntro, 1, this.maxRaio, 0)
      } else this.raioD = this.maxRaio
      // let tStart = 0.6
      if (tempoAnima > this.tStartMotion) {
        let res = 0.005
        let a = noise(this.posD.x * res, this.posD.y * res) * 2 * TWO_PI
        let v = p5.Vector.fromAngle(a)
        v.setMag(3)
        this.posD.add(v)
      } else this.posD = this.pos0.copy()
      if (tempoAnima == 0) {
        this.reset()
      }
      // this.posR.lerp(this.posD, 0.1)
      // this.raioR = lerp(this.raioR, this.raioD, 0.1)
      this.raioR = this.raioD
      this.posR = this.posD
    }

    this.reset = function() {
      this.posD = this.pos0.copy()
      this.posR = this.pos0.copy()
      this.raioR = 0
      this.raioD = 0
    }

    this.desenha = function() {
      noStroke()
      fill(cor_shape)
      circle(this.posR.x, this.posR.y, this.raioR * 2)
    }

    this.salva = function(c) {
      c.noStroke()
      c.fill(cor_shape)
      c.circle(this.posR.x, this.posR.y, this.raioR * 2)
    }
  },

  function(brilho, bounds) { // CRIPTICO
    this.brilhoOrig = brilho * 255
    this.bounds = bounds
    this.pos0 = createVector(this.bounds.x + round(this.bounds.w * 0.5), this.bounds.y + round(this.bounds.h * 0.5))
    this.brilhoAtual = 0
    this.tIntro = random(0.1, 0.2)
    this.tOutro = random(0.1, 0.2)
    this.randSeed = random(1)

    this.atualiza = function(tempoAnima) {
      tempoAnima = (tempoAnima+this.randSeed)%1
      if (tempoAnima < this.tIntro) {
        this.brilhoAtual = map(tempoAnima, 0, this.tIntro, 0, this.brilhoOrig)
      } else if (tempoAnima > 1 - this.tOutro) {
        this.brilhoAtual = map(tempoAnima, 1 - this.tOutro, 1, this.brilhoOrig, 0)
      } else this.brilhoAtual = this.brilhoOrig
    }

    this.desenha = function() {
      let c = this.brilhoAtual
      push()
      translate(this.bounds.x, this.bounds.y)
      noStroke()
      // stroke(255,0,0)
      fill(cor_shape);

      // let forma = floor(p);
      let t = this.bounds.w
      let ter = t * 0.333;
      if (c <= 25) {} else if (c > 25 && c <= 50) rect(ter, ter, ter, ter);
      else if (c > 50 && c <= 75) {
        rect(0, ter, ter, ter);
        rect(ter * 2, ter, ter, ter);
      } else if (c > 75 && c <= 100) {
        rect(ter, 0, ter, t);
      } else if (c > 100 && c <= 125) {
        rect(ter, 0, ter, ter);
        rect(0, ter, ter, ter);
        rect(ter * 2, ter, ter, ter);
        rect(ter, ter * 2, ter, ter);
      } else if (c > 125 && c <= 150) {
        rect(0, 0, ter, ter);
        rect(ter * 2, 0, ter, ter);
        rect(ter, ter, ter, ter);
        rect(0, ter * 2, ter, ter);
        rect(ter * 2, ter * 2, ter, ter);
      } else if (c > 150 && c <= 175) {
        rect(0, 0, t, ter);
        rect(0, ter * 2, t, ter);
      } else if (c > 175 && c <= 200) {
        rect(0, 0, t, ter);
        rect(0, ter, t, ter);
      } else if (c > 200 && c <= 225) {
        beginShape();
        vertex(0, 0);
        vertex(t, 0);
        vertex(t, t);
        vertex(0, t);
        beginContour();
        vertex(ter, ter);
        vertex(ter, ter * 2);
        vertex(ter * 2, ter * 2);
        vertex(ter * 2, ter);
        endContour();
        endShape();
      } else if (c > 225) {
        rect(0, 0, t, t);
      }
      pop()
    }

    this.salva = function(cnv) {
      let c = this.brilhoAtual
      cnv.push()
      cnv.translate(this.bounds.x, this.bounds.y)
      cnv.noStroke()
      // stroke(255,0,0)
      cnv.fill(cor_shape);

      // let forma = floor(p);
      let t = this.bounds.w
      let ter = t * 0.333;
      if (c <= 25) {} else if (c > 25 && c <= 50) cnv.rect(ter, ter, ter, ter);
      else if (c > 50 && c <= 75) {
        cnv.rect(0, ter, ter, ter);
        cnv.rect(ter * 2, ter, ter, ter);
      } else if (c > 75 && c <= 100) {
        cnv.rect(ter, 0, ter, t);
      } else if (c > 100 && c <= 125) {
        cnv.rect(ter, 0, ter, ter);
        cnv.rect(0, ter, ter, ter);
        cnv.rect(ter * 2, ter, ter, ter);
        cnv.rect(ter, ter * 2, ter, ter);
      } else if (c > 125 && c <= 150) {
        cnv.rect(0, 0, ter, ter);
        cnv.rect(ter * 2, 0, ter, ter);
        cnv.rect(ter, ter, ter, ter);
        cnv.rect(0, ter * 2, ter, ter);
        cnv.rect(ter * 2, ter * 2, ter, ter);
      } else if (c > 150 && c <= 175) {
        cnv.rect(0, 0, t, ter);
        cnv.rect(0, ter * 2, t, ter);
      } else if (c > 175 && c <= 200) {
        cnv.rect(0, 0, t, ter);
        cnv.rect(0, ter, t, ter);
      } else if (c > 200 && c <= 225) {
        cnv.beginShape();
        cnv.vertex(0, 0);
        cnv.vertex(t, 0);
        cnv.vertex(t, t);
        cnv.vertex(0, t);
        cnv.beginContour();
        cnv.vertex(ter, ter);
        cnv.vertex(ter, ter * 2);
        cnv.vertex(ter * 2, ter * 2);
        cnv.vertex(ter * 2, ter);
        cnv.endContour();
        cnv.endShape();
      } else if (c > 225) {
        cnv.rect(0, 0, t, t);
      }
      cnv.pop()
    }
  }
]
