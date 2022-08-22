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
  //     //  fill(cor_shape) vira -> c.fill(cor_shape)
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
      this.a = sin(tempoAnima * TWO_PI + this.randSeed) * this.maxA
    }

    this.desenha = function() { // função pra desenhar sua celula
      noStroke()
      fill(cor_shape)
      translate(this.pos0.x, this.pos0.y)
      let halfW = this.bounds.w * 0.5
      let halfH = this.bounds.h * 0.5
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
      let halfW = this.bounds.w * 0.5
      let halfH = this.bounds.h * 0.5
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
      this.brilhoAtual = map(sin(tempoAnima * TWO_PI * 2 + this.randSeed), -1, 1, this.brilhoOrig * 0.8, this.brilhoOrig * 1.1)
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
      tempoAnima = (tempoAnima + this.randSeed) % 1
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
      let a = tempoAnima * TWO_PI
      let xNoise = cos(a) * res + this.randSeed
      let yNoise = sin(a) * res + this.randSeed
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
      tempoAnima = (tempoAnima + this.random) % 1
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
      tempoAnima = (tempoAnima + this.randSeed) % 1
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
  },

  // //------------------------------------------------------------------->

  function(brilho, bounds) {
    this.bounds = bounds;
    this.brilho = brilho;
    this.randSeed = random(TWO_PI)

    this.atualiza = function(tempoAnima) {
      this.tempoAnima = norm(sin(tempoAnima*TWO_PI*3 + this.randSeed),-1,1);
    };

    this.desenha = function() {
      let esp = this.bounds.w / 20 * this.tempoAnima + 0.5;
      stroke(cor_shape);
      strokeWeight(esp);
      noFill();
      let circ_qtd = floor(map(this.brilho, 0, 1, 1, 5));

      for (let i = 0; i < circ_qtd; i++) {
        let d = (esp * 4) * i;
        circle(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h / 2, d);
      }
    };

    this.salva = function(cnv) {
      let esp = this.bounds.w / 20 * this.tempoAnima + 0.5;
      cnv.stroke(cor_shape);
      cnv.strokeWeight(esp);
      cnv.noFill();
      let circ_qtd = floor(map(this.brilho, 0, 1, 1, 5));

      for (let i = 0; i < circ_qtd; i++) {
        let d = (esp * 4) * i;
        cnv.circle(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h / 2, d);
      }
    };

  },

  //------------------------------------------------------------------->

  function(brilho, bounds) {
    this.bounds = bounds;
    this.brilho = brilho;
    this.randSeed = random(TWO_PI)

    this.atualiza = function(tempoAnima) {
      this.tempoAnima = norm(sin(tempoAnima*TWO_PI*3 + this.randSeed),-1,1);
    };

    this.desenha = function() {
      let rect_grid = 3;
      let rect_max = rect_grid * rect_grid;
      let rect_qtd = floor(map(this.brilho, 0, 1, 0, rect_max));

      for (let i = 0; i < rect_max; i++) {
        let blink = random(1) + i / rect_max;

        if (i <= rect_qtd && blink > 0.3) {
          let largura = this.bounds.w / rect_grid;
          let altura = this.bounds.h / rect_grid;
          let x = this.bounds.x + (i % rect_grid) * largura;
          let y = this.bounds.y + floor(i / rect_grid) * altura;
          noStroke();
          fill(cor_shape);
          rect(x, y, largura, altura);
        }
      }
    };

    this.salva = function(cvn) {
      let rect_grid = 3;
      let rect_max = rect_grid * rect_grid;
      let rect_qtd = floor(map(this.brilho, 0, 1, 0, rect_max));

      for (let i = 0; i < rect_max; i++) {
        let blink = random(1) + i / rect_max;

        if (i <= rect_qtd && blink > 0.3) {
          let largura = this.bounds.w / rect_grid;
          let altura = this.bounds.h / rect_grid;
          let x = this.bounds.x + (i % rect_grid) * largura;
          let y = this.bounds.y + floor(i / rect_grid) * altura;
          cvn.noStroke();
          cvn.fill(cor_shape);
          cvn.rect(x, y, largura, altura);
        }
      }
    };
  },

  //------------------------------------------------------------------->

  function(brilho, bounds) {
    this.bounds = bounds;
    this.brilho = brilho;
    this.randSeed = random(TWO_PI)

    this.atualiza = function(tempoAnima) {
      this.tempoAnima = norm(sin(tempoAnima*TWO_PI*3 + this.randSeed),-1,1);
    };

    this.desenha = function() {
      let esfera_qtd = floor(map(this.brilho, 0, 0.9, 1, 4));
      let contorno_esp = this.tempoAnima * (20 * this.brilho) / esfera_qtd + 1;
      stroke(cor_shape);
      strokeWeight(contorno_esp);
      noFill()
      for (let i = 0; i < esfera_qtd; i++) {
        for (let j = 0; j < esfera_qtd; j++) {


          let largura = this.bounds.w / esfera_qtd;
          let altura = this.bounds.h / esfera_qtd;
          let x = this.bounds.x + largura / 2 + i * largura;
          let y = this.bounds.y + altura / 2 + j * altura;
          ellipse(x, y, largura, altura);

        }
      }
    };

    this.salva = function(cvn) {
      let esfera_qtd = floor(map(this.brilho, 0, 0.9, 1, 4));
      let contorno_esp = this.tempoAnima * (20 * this.brilho) / esfera_qtd + 1;
      cvn.stroke(cor_shape);
      cvn.strokeWeight(contorno_esp);
      cvn.noFill()
      for (let i = 0; i < esfera_qtd; i++) {
        for (let j = 0; j < esfera_qtd; j++) {


          let largura = this.bounds.w / esfera_qtd;
          let altura = this.bounds.h / esfera_qtd;
          let x = this.bounds.x + largura / 2 + i * largura;
          let y = this.bounds.y + altura / 2 + j * altura;
          cvn.ellipse(x, y, largura, altura);

        }
      }
    };
  },

  //------------------------------------------------------------------->

  function(brilho, bounds) {
    this.bounds = bounds;
    this.brilho = brilho;
    this.randSeed = random(TWO_PI)

    this.atualiza = function(tempoAnima) {
      this.tempoAnima = norm(sin(tempoAnima*TWO_PI*3 + this.randSeed),-1,1);
    };

    this.desenha = function() {
      let traco_qtd = floor(map(this.brilho, 0, 0.7, 1, 6));
      push();
      noStroke();
      fill(cor_shape);
      rectMode(CENTER);
      translate(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h / 2);
      rotate(this.tempoAnima * PI);
      for (let i = 0; i < traco_qtd; i++) {
        rotate(PI / traco_qtd);
        rect(0, 0, this.bounds.w / 10, this.bounds.h);
      };
      pop();
    };

    this.salva = function(cvn) {
      let traco_qtd = floor(map(this.brilho, 0, 0.7, 1, 6));
      cvn.push();
      cvn.noStroke();
      cvn.fill(cor_shape);
      cvn.rectMode(CENTER);
      cvn.translate(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h / 2);
      cvn.rotate(this.tempoAnima * PI);
      for (let i = 0; i < traco_qtd; i++) {
        cvn.rotate(PI / traco_qtd);
        cvn.rect(0, 0, this.bounds.w / 10, this.bounds.h);
      };
      cvn.pop();
    };
  },

  //------------------------------------------------------------------->

  function(brilho, bounds) {
    this.bounds = bounds;
    this.brilho = brilho;
    this.randSeed = random(TWO_PI)

    this.atualiza = function(tempoAnima) {
      this.tempoAnima = norm(sin(tempoAnima*TWO_PI*3 + this.randSeed),-1,1);
    };

    this.desenha = function() {
      push();
      noStroke();

      fill(cor_shape);
      let angulo_inicial = this.brilho * TWO_PI;
      let angulo = this.tempoAnima * TWO_PI;
      let largura = map(brilho, 0, 0.9, 2, this.bounds.w);
      rectMode(CENTER);
      translate(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h / 2);
      rotate(angulo + angulo_inicial);
      rect(0, 0, largura, this.bounds.h);
      pop();
    }

    this.salva = function(cvn) {
      cvn.push();
      cvn.noStroke();

      cvn.fill(cor_shape);
      let angulo_inicial = this.brilho * TWO_PI;
      let angulo = this.tempoAnima * TWO_PI;
      let largura = map(brilho, 0, 0.9, 2, this.bounds.w);
      cvn.rectMode(CENTER);
      cvn.translate(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h / 2);
      cvn.rotate(angulo + angulo_inicial);
      cvn.rect(0, 0, largura, this.bounds.h);
      cvn.pop();
    }
  },

  //-------------------------------------------------------------->

  function(brilho, bounds) {
    this.bounds = bounds;
    this.brilho = brilho;
    this.randSeed = random(TWO_PI)

    this.atualiza = function(tempoAnima) {
      this.tempoAnima = norm(sin(tempoAnima*TWO_PI*3 + this.randSeed),-1,1);
    };

    this.desenha = function() {
      fill(cor_shape);
      noStroke();

      let angulo_maximo = map(this.brilho, 0, 1, 0, TWO_PI - 0.01);
      let angulo = this.tempoAnima * angulo_maximo;
      arc(
        bounds.x + bounds.w / 2,
        bounds.y + bounds.h / 2,
        bounds.w,
        bounds.h,
        0,
        angulo + 0.0001
      );
    }

    this.salva = function(cvn) {
      cvn.fill(cor_shape);
      cvn.noStroke();

      let angulo_maximo = map(this.brilho, 0, 1, 0, TWO_PI - 0.01);
      let angulo = this.tempoAnima * angulo_maximo;
      cvn.arc(
        bounds.x + bounds.w / 2,
        bounds.y + bounds.h / 2,
        bounds.w,
        bounds.h,
        0,
        angulo + 0.0001
      );
    }
  },

  //-------------------------------------------------------------->

  function(brilho, bounds) {
    this.bounds = bounds;
    this.brilho = brilho;
    this.randSeed = random(TWO_PI)

    this.atualiza = function(tempoAnima) {
      this.tempoAnima = norm(sin(tempoAnima*TWO_PI*3 + this.randSeed),-1,1);
    };

    this.desenha = function() {
      noStroke();
      fill(cor_shape);

      let esfera_qtd = floor(map(this.brilho, 0, 1, 1, 5));

      for (let i = 0; i < esfera_qtd; i++) {
        let largura = this.bounds.w / esfera_qtd;
        let x = this.bounds.x + largura / 2 + i * largura;
        let altura = this.tempoAnima * this.bounds.h + 1;
        let y = this.bounds.y + this.bounds.h / 2;
        ellipse(x, y, largura, altura);
      }
    }

    this.salva = function(cvn) {
      cvn.noStroke();
      cvn.fill(cor_shape);

      let esfera_qtd = floor(map(this.brilho, 0, 1, 1, 5));

      for (let i = 0; i < esfera_qtd; i++) {
        let largura = this.bounds.w / esfera_qtd;
        let x = this.bounds.x + largura / 2 + i * largura;
        let altura = this.tempoAnima * this.bounds.h + 1;
        let y = this.bounds.y + this.bounds.h / 2;
        cvn.ellipse(x, y, largura, altura);
      }
    }
  },

  //-------------------------------------------------------------->


  function(brilho, bounds) {
    this.bounds = bounds;
    this.brilho = brilho;
    this.randSeed = random(TWO_PI)

    this.atualiza = function(tempoAnima) {
      this.tempoAnima = norm(sin(tempoAnima*TWO_PI*3 + this.randSeed),-1,1);
    };

    this.desenha = function() {
      noStroke();
      fill(cor_shape);

      let dobras = floor(map(this.brilho, 0, 1, 1, 4));

      beginShape();
      vertex(this.bounds.x + this.bounds.w / 2, this.bounds.y);

      for (let i = 0; i < dobras; i++) {
        let altura = this.bounds.h / dobras;
        let y = this.bounds.y + altura / 2 + i * altura;
        let x_desl = this.tempoAnima * (this.bounds.w / 2.1);
        let xA = this.bounds.x + x_desl;
        let xB = this.bounds.x + this.bounds.w - x_desl;
        vertex(xA, y);
        vertex(xB, y);
      }
      vertex(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h);
      endShape(CLOSE);
    }

    this.salva = function(cvn) {
      cvn.noStroke();
      cvn.fill(cor_shape);

      let dobras = floor(map(this.brilho, 0, 1, 1, 4));

      cvn.beginShape();
      cvn.vertex(this.bounds.x + this.bounds.w / 2, this.bounds.y);

      for (let i = 0; i < dobras; i++) {
        let altura = this.bounds.h / dobras;
        let y = this.bounds.y + altura / 2 + i * altura;
        let x_desl = this.tempoAnima * (this.bounds.w / 2.1);
        let xA = this.bounds.x + x_desl;
        let xB = this.bounds.x + this.bounds.w - x_desl;
        cvn.vertex(xA, y);
        cvn.vertex(xB, y);
      }
      cvn.vertex(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h);
      cvn.endShape(CLOSE);
    }
  }
]
