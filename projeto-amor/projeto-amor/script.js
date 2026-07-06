/* ============================================================
   SCRIPT.JS - Lógica do site "Você me ama?"
   Organizado em seções comentadas para facilitar manutenção.
   ============================================================ */

// Espera o HTML carregar completamente antes de rodar qualquer coisa
document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1) REFERÊNCIAS AOS ELEMENTOS DO HTML
     ---------------------------------------------------------- */
  const telaPergunta   = document.getElementById('telaPergunta');
  const telaAmor       = document.getElementById('telaAmor');
  const botaoSim       = document.getElementById('botaoSim');
  const botaoNao       = document.getElementById('botaoNao');
  const grupoBotoes    = document.querySelector('.grupo-botoes');
  const camadaParticulas = document.getElementById('camadaParticulas');
  const camadaCoracoes   = document.getElementById('camadaCoracoes');
  const camadaConfete    = document.getElementById('camadaConfete');

  /* ----------------------------------------------------------
     2) PARTÍCULAS BRILHANTES NO FUNDO (as duas telas)
     Cria pequenos círculos que sobem lentamente e brilham.
     ---------------------------------------------------------- */
  function criarParticulasBrilho() {
    const quantidade = 25; // quantidade de partículas simultâneas

    for (let i = 0; i < quantidade; i++) {
      const particula = document.createElement('div');
      particula.classList.add('particula-brilho');

      // Tamanho aleatório entre 4px e 10px
      const tamanho = Math.random() * 6 + 4;
      particula.style.width = tamanho + 'px';
      particula.style.height = tamanho + 'px';

      // Posição horizontal aleatória
      particula.style.left = Math.random() * 100 + 'vw';
      particula.style.bottom = '-20px';

      // Duração e atraso aleatórios para não ficarem sincronizadas
      const duracao = Math.random() * 8 + 6; // 6 a 14 segundos
      const atraso = Math.random() * 10;
      particula.style.animationDuration = duracao + 's';
      particula.style.animationDelay = atraso + 's';

      camadaParticulas.appendChild(particula);
    }
  }

  /* ----------------------------------------------------------
     3) CHUVA DE CORAÇÕES (tela 2)
     Gera corações continuamente enquanto a tela do amor
     estiver visível.
     ---------------------------------------------------------- */
  let intervaloCoracoes = null; // guarda a referência do setInterval

  function criarCoracaoCaindo() {
    const emojisCoracao = ['❤️', '💖', '💕', '💗', '💓'];
    const coracao = document.createElement('span');
    coracao.classList.add('coracao-caindo');
    coracao.textContent = emojisCoracao[Math.floor(Math.random() * emojisCoracao.length)];

    // Posição horizontal aleatória
    coracao.style.left = Math.random() * 100 + 'vw';

    // Tamanho aleatório para dar profundidade
    const tamanho = Math.random() * 1.4 + 1;
    coracao.style.fontSize = tamanho + 'rem';

    // Duração de queda aleatória
    const duracao = Math.random() * 4 + 5; // 5 a 9 segundos
    coracao.style.animationDuration = duracao + 's';

    // Pequeno desvio lateral durante a queda (efeito de balanço)
    const deslocamentoX = (Math.random() * 100 - 50) + 'px';
    coracao.style.setProperty('--deslocamento-x', deslocamentoX);

    camadaCoracoes.appendChild(coracao);

    // Remove o coração do DOM depois que a animação termina,
    // evitando acumular elementos desnecessários (melhora performance)
    setTimeout(() => coracao.remove(), duracao * 1000 + 500);
  }

  function iniciarChuvaDeCoracoes() {
    if (intervaloCoracoes) return; // evita criar múltiplos intervalos
    intervaloCoracoes = setInterval(criarCoracaoCaindo, 350);
  }

  /* ----------------------------------------------------------
     4) CONFETE DE CORAÇÕES (explosão ao clicar em "Sim")
     ---------------------------------------------------------- */
  function dispararConfete() {
    const emojisConfete = ['❤️', '💖', '💗', '💘', '💝'];
    const totalConfetes = 40;

    for (let i = 0; i < totalConfetes; i++) {
      const confete = document.createElement('span');
      confete.classList.add('confete-coracao');
      confete.textContent = emojisConfete[Math.floor(Math.random() * emojisConfete.length)];

      // Direção aleatória em formato de explosão circular
      const angulo = Math.random() * Math.PI * 2;
      const distancia = Math.random() * 260 + 80;
      const destinoX = Math.cos(angulo) * distancia;
      const destinoY = Math.sin(angulo) * distancia;

      confete.style.setProperty('--confete-x', destinoX + 'px');
      confete.style.setProperty('--confete-y', destinoY + 'px');
      confete.style.setProperty('--confete-rot', (Math.random() * 360) + 'deg');
      confete.style.animationDelay = (Math.random() * 0.15) + 's';

      camadaConfete.appendChild(confete);

      // Remove depois da animação para não acumular elementos
      setTimeout(() => confete.remove(), 2000);
    }
  }

  /* ----------------------------------------------------------
     5) BOTÃO "NÃO" FOGE DO USUÁRIO
     Funciona tanto com o mouse (computador) quanto com o
     toque (celular/tablet).
     ---------------------------------------------------------- */

  // Move o botão "Não" para uma posição aleatória dentro da tela,
  // sempre garantindo que ele fique 100% visível.
  function moverBotaoNaoAleatoriamente() {
    // Torna o botão "position: fixed" para poder posicioná-lo
    // livremente em qualquer lugar da tela visível.
    botaoNao.style.position = 'fixed';

    const larguraJanela = window.innerWidth;
    const alturaJanela = window.innerHeight;
    const larguraBotao = botaoNao.offsetWidth;
    const alturaBotao = botaoNao.offsetHeight;

    // Uma margem de segurança para o botão nunca encostar na borda
    const margemSeguranca = 16;

    // Calcula limites máximos de X e Y para o botão não sair da tela
    const maximoX = larguraJanela - larguraBotao - margemSeguranca;
    const maximoY = alturaJanela - alturaBotao - margemSeguranca;

    // Gera uma posição aleatória dentro dos limites seguros
    const novoX = Math.random() * (maximoX - margemSeguranca) + margemSeguranca;
    const novoY = Math.random() * (maximoY - margemSeguranca) + margemSeguranca;

    botaoNao.style.left = novoX + 'px';
    botaoNao.style.top = novoY + 'px';
  }

  // Calcula a distância entre dois pontos (usado para saber se o
  // mouse está "perto o suficiente" do botão para ele fugir)
  function calcularDistancia(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  // No computador: o botão foge quando o mouse se aproxima,
  // mesmo sem o usuário clicar.
  document.addEventListener('mousemove', function (evento) {
    // Só faz sentido rodar essa lógica na tela da pergunta
    if (telaPergunta.classList.contains('escondido')) return;

    const posicaoBotao = botaoNao.getBoundingClientRect();
    const centroBotaoX = posicaoBotao.left + posicaoBotao.width / 2;
    const centroBotaoY = posicaoBotao.top + posicaoBotao.height / 2;

    const distanciaAteMouse = calcularDistancia(
      evento.clientX, evento.clientY,
      centroBotaoX, centroBotaoY
    );

    // Distância "de segurança": se o mouse chegar mais perto que isso,
    // o botão foge para outro lugar da tela.
    const distanciaMinima = 110;

    if (distanciaAteMouse < distanciaMinima) {
      moverBotaoNaoAleatoriamente();
    }
  });

  // No celular: o botão foge assim que o usuário tenta tocá-lo.
  // Usamos "touchstart" para detectar a tentativa de toque antes do clique.
  botaoNao.addEventListener('touchstart', function (evento) {
    evento.preventDefault(); // impede que o toque "clique de verdade"
    moverBotaoNaoAleatoriamente();
  }, { passive: false });

  // Segurança extra: se por algum motivo o clique acontecer
  // (ex: acessibilidade/teclado), o botão também foge em vez de
  // executar qualquer ação de "não".
  botaoNao.addEventListener('click', function (evento) {
    evento.preventDefault();
    moverBotaoNaoAleatoriamente();
  });

  // Quando o mouse passa por cima do botão (hover), ele também
  // dá uma "fugidinha" extra para parecer que está brincando.
  botaoNao.addEventListener('mouseenter', moverBotaoNaoAleatoriamente);

  // Se a janela for redimensionada (ex: girar o celular), garante
  // que o botão nunca fique fora da área visível.
  window.addEventListener('resize', function () {
    if (botaoNao.style.position === 'fixed') {
      moverBotaoNaoAleatoriamente();
    }
  });

  /* ----------------------------------------------------------
     6) BOTÃO "SIM" - TRANSIÇÃO ENTRE AS TELAS
     ---------------------------------------------------------- */
  botaoSim.addEventListener('click', function () {

    // Dispara o confete de corações na hora do clique
    dispararConfete();

    // Pequeno atraso para o usuário ver o confete antes da troca de tela
    setTimeout(function () {

      // Fade out da tela da pergunta
      telaPergunta.classList.add('escondido');

      // Fade in da tela do "eu te amo"
      telaAmor.classList.remove('escondido');
      telaAmor.classList.add('visivel');

      // Inicia a chuva de corações contínua
      iniciarChuvaDeCoracoes();

    }, 500);
  });

  /* ----------------------------------------------------------
     7) INICIALIZAÇÃO GERAL AO CARREGAR A PÁGINA
     ---------------------------------------------------------- */
  criarParticulasBrilho();

});
