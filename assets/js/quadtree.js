class Rectangle {
  constructor(x, y, w, h) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || currentImage.width;
    this.h = h || currentImage.height;
  }

  contains(point) {
    return (
      point.x >= this.x &
      point.x < this.x + this.w &
      point.y >= this.y &
      point.y < this.y + this.h
    )
  }

  split() {
    let x = this.x,
      y = this.y,
      w = this.w / 2,
      h = this.h / 2;
    let subRectangles = [
      new Rectangle(x, y, w, h),
      new Rectangle(x, y + h, w, h),
      new Rectangle(x + w, y, w, h),
      new Rectangle(x + w, y + h, w, h),
    ];
    return subRectangles;
  }
}

class QuadTree {
  constructor(capacity, bounds, col, lvw) {
    this.bounds = bounds || new Rectangle();
    this.capacity = capacity || 1;
    this.level = lvw || 0;
    this.color = col || color(0, 0, 255, 255);
    this.points = [];
    this.subtrees = [];

    // DAQUI PRA BAIXO É OBRA DO BURNIER
    this.realColor = this.getColor(this.bounds); // a cor real do pixel -  a this.color q ele coleta tava vindo errado.
    let r = this.realColor[0]
    let g = this.realColor[1]
    let b = this.realColor[2]
    this.brilho = ((r + g + b) / 3) / 255
    let randCell = floor(random(celulas.length)) // escolhe uma celula da lista de celulas randomicamente
    if(ui_data.inverte) this.brilho = 1-this.brilho
    this.cell = new celulas[randCell](this.brilho, this.bounds) // cria a celula randomica com as variaveis
  }

  isSplitted() {
    return this.subtrees.length > 0;
  }

  getColor(b) {
    let img = currentImage
    let x = b.x + round(b.w * 0.5)
    let y = b.y + round(b.h * 0.5)
    return img.get(x, y)
  }

  insert(point) {
    if (this.bounds.contains(point)) {
      if (!this.isSplitted()) {
        this.points.push(point);
        this.color = point.color;
        if (this.points.length > this.capacity && this.level < 7) { // LIMITA PROFUNDIDADE DAS DIVISÕES
          this.split(color);
        }
      } else {
        this.subtrees.forEach(tree => tree.insert(point));
      }
    }
  }

  split() {
    this.subtrees = this.bounds.split().map(bound => {
      // console.log(bound);
      let subtree = new QuadTree(this.capacity, bound, this.color, this.level+1);
      this.points.forEach(point => subtree.insert(point));
      return subtree;
    });
    this.points = [];
  }

  save(c, p = null) { // função save igual ao draw, mas com um canvas c
    if (!this.isSplitted() && this.brilho > 0) {
      if (p != null) this.cell.atualiza(p)
      c.push()
      this.cell.salva(c)
      c.pop()
    }
    this.subtrees.forEach(tree => tree.save(c));
  }

  draw(p = null) {
    if (!this.isSplitted() && this.brilho > 0) { // aqui desenha a celula, SE essa quad for a ultima da lista de subdivisões.
      push()
      if (p != null) this.cell.atualiza(p) // quando o p é null não precisa atualizar
      this.cell.desenha()
      pop()
    }

    this.subtrees.forEach(tree => tree.draw(p)); // se tiver subdivisões, desenha elas
  }
}
