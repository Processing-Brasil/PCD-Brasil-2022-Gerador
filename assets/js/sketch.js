let imgs = [],
  imageIndex = 0,
  qTree, pointPicker, currentImage = null,

  fps = 30,
  totalFrames,
  salvaVideoMP4 = false,
  nFrames = 0,
  encoder, n = 0,
  cor_shape, cor_bg, triggerComecaGrav = false

function preload() {
  currentImage = desenhaNoise()
  calcFrames()
  criaEncoder()
}


function setup() {
  let cvn = createCanvas(windowWidth, windowHeight)
  cvn.position(300,0)
  setCores()
  resetQuad() // Nessa função que o quad é criado > utils.js
}

function draw() {
  background(cor_bg)

  let p = 0 // o p é a porcentagem referente ao ciclo, talvez isso tudo mude dependendo de como for feita a animação

  if (triggerComecaGrav && nFrames == 0) comecaGravacao()

  if (salvaVideoMP4) {
    fill(255, 0, 0)
    p = norm(nFrames, 0, totalFrames - 1)
    text("GRAVANDO: " + nFrames + " / " + totalFrames + "\n" + p, currentImage.width + 10, 20)
    salvaFrameMP4(p)
  } else {
    if (ui_data.anima) p = norm(nFrames % totalFrames, 0, totalFrames - 1)
    else p = 0.5
    nFrames = (nFrames + 1) % totalFrames
    text(nFrames + " / " + totalFrames + "\n" + p, currentImage.width + 10, 20)
  }
  qTree.draw(p); // desenha o quad
}

function keyReleased() {
  if (key == 's') save_svg()
  if (key == 'a') comecaGravacao()
}

function resetQuad(n = parseInt(ui_data.res_quad)) {
  nFrames = 0;
  pointPicker = new PointPicker(currentImage);
  qTree = new QuadTree();
  setupQuadTree(n)
  setCores()
}

function setupQuadTree(n) {  // nessa função ele vai subdividindo a o quad conforme a imagem.
  for (let i = 0; i < n; i++) {
    let p = pointPicker.pick();
    qTree.insert(p);
  }
}
