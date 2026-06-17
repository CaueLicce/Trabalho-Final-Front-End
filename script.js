const { useState, useEffect, useRef } = React;
const C = {
  primary: '#04CC6A', primaryD: '#03A855', tertiary: '#64FFDA',
  bg: '#0A0F1A', bg2: '#0F172A', card: '#131E30', card2: '#1A2640',
  border: '#1E3050', text: '#F8FAFC', muted: '#8899AA',
};
const globalCSS = `
  .btn { display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.6rem;border-radius:8px;font-family:var(--font);font-size:.9rem;font-weight:600;cursor:pointer;border:none;transition:all .2s;text-decoration:none; }
  .btn-primary { background:var(--primary);color:#fff; }
  .btn-primary:hover { background:var(--primary-d);transform:translateY(-1px);box-shadow:0 8px 24px rgba(4,204,106,.3); }
  .btn-outline { background:transparent;color:var(--text);border:1.5px solid var(--border); }
  .btn-outline:hover { border-color:var(--primary);color:var(--primary);transform:translateY(-1px); }
  .btn-sm { padding:.55rem 1.1rem;font-size:.82rem; }
  .badge { display:inline-flex;align-items:center;gap:.5rem;font-size:.72rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--primary);background:rgba(4,204,106,.08);border:1px solid rgba(4,204,106,.25);border-radius:99px;padding:5px 14px;margin-bottom:1.4rem; }
  .container { max-width:1140px;margin:0 auto;padding:0 2rem; }
  .section { padding:100px 0; }
  .section-sm { padding:60px 0; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  .fade-in { animation:fadeIn .5s ease forwards; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
`;
const styleEl = document.createElement('style');
styleEl.textContent = globalCSS;
document.head.appendChild(styleEl);

function Navbar({currentPage, setPage}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [{
    id: 'home',
    label: 'Funcionalidades'
  }, {
    id: 'como',
    label: 'Como Funciona'
  }, {
    id: 'sobre',
    label: 'Sobre Nós'
  }, {
    id: 'contato',
    label: 'Contato'
  }];
  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(10,15,26,.88)',
    backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${C.border}`,
    boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.4)' : 'none',
    padding: '1rem 0',
    transition: 'box-shadow .3s'
  };
  return React.createElement("nav", {
    style: navStyle
  }, React.createElement("div", {
    style: {
      maxWidth: 1140,
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    }
  }, React.createElement("div", {
    style: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: C.primary,
      marginRight: 'auto',
      letterSpacing: '-.01em',
      cursor: 'pointer'
    },
    onClick: () => setPage('home')
  }, "PRIMUS"), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0
    }
  }, links.map(l => React.createElement("div", {
    key: l.id,
    onClick: () => {
      setPage(l.id);
      setMenuOpen(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    style: {
      padding: '.5rem 1rem',
      fontSize: '.88rem',
      fontWeight: 500,
      cursor: 'pointer',
      color: currentPage === l.id ? C.primary : C.muted,
      borderBottom: currentPage === l.id ? `2px solid ${C.primary}` : '2px solid transparent',
      transition: 'all .2s'
    }
  }, l.label))), React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => setPage('dashboard')
  }, "Abrir App \u2192")));
}

function Badge({children}) {
  return React.createElement("div", {
    className: "badge"
  }, "\u2B21 ", children);
}

function FeatureCard({icon, title, desc}) {
  const [hov, setHov] = useState(false);
  return React.createElement("div", {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      background: C.card,
      border: `1px solid ${hov ? 'rgba(4,204,106,.35)' : C.border}`,
      borderRadius: 14,
      padding: '2rem',
      transition: 'all .3s',
      transform: hov ? 'translateY(-4px)' : 'none',
      position: 'relative',
      overflow: 'hidden'
    }
  }, hov && React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      background: 'linear-gradient(90deg,#04CC6A,#64FFDA)'
    }
  }), React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 12,
      background: 'rgba(4,204,106,.12)',
      border: '1px solid rgba(4,204,106,.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.3rem',
      marginBottom: '1rem'
    }
  }, icon), React.createElement("h3", {
    style: {
      marginBottom: '.5rem',
      fontSize: '1.1rem'
    }
  }, title), React.createElement("p", {
    style: {
      color: C.muted,
      fontSize: '.9rem',
      lineHeight: 1.7,
      marginBottom: '1.2rem'
    }
  }, desc), React.createElement("span", {
    style: {
      fontSize: '.85rem',
      fontWeight: 600,
      color: C.primary,
      cursor: 'pointer'
    }
  }, "Saber Mais \u2192"));
}

function StatItem({val, label, last}) {
  return React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '0 2rem',
      borderRight: last ? 'none' : `1px solid ${C.border}`
    }
  }, React.createElement("div", {
    style: {
      fontSize: '2.2rem',
      fontWeight: 700,
      color: C.primary,
      marginBottom: '.25rem'
    }
  }, val), React.createElement("div", {
    style: {
      fontSize: '.72rem',
      fontWeight: 600,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: C.muted
    }
  }, label));
}

function CtaBlock({title, sub, btnLabel, onBtn}) {
  return React.createElement("div", {
    style: {
      background: 'linear-gradient(135deg,#002A52,#001830)',
      border: '1px solid rgba(4,204,106,.2)',
      borderRadius: 20,
      padding: '5rem 4rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      top: -100,
      right: -100,
      width: 400,
      height: 400,
      borderRadius: '50%',
      background: 'radial-gradient(circle,rgba(4,204,106,.1),transparent 70%)'
    }
  }), React.createElement("h2", {
    style: {
      fontSize: 'clamp(1.8rem,3vw,2.6rem)',
      marginBottom: '1rem'
    },
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), React.createElement("p", {
    style: {
      color: C.muted,
      marginBottom: '2rem',
      maxWidth: 480,
      margin: '0 auto 2rem'
    }
  }, sub), React.createElement("button", {
    className: "btn btn-primary",
    onClick: onBtn
  }, btnLabel));
}

function HomePage({setPage}) {
  return React.createElement("div", {
    className: "fade-in"
  }, React.createElement("section", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 80,
      background: 'radial-gradient(ellipse 70% 60% at 60% 40%,rgba(0,42,82,.55),transparent 70%),radial-gradient(ellipse 40% 40% at 90% 10%,rgba(4,204,106,.08),transparent 60%),#0A0F1A'
    }
  }, React.createElement("div", {
    className: "container"
  }, React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      alignItems: 'center'
    }
  }, React.createElement("div", null, React.createElement(Badge, null, "Hiper-Intelig\u00EAncia Acad\u00EAmica"), React.createElement("h1", {
    style: {
      fontSize: 'clamp(2.2rem,5vw,3.8rem)',
      fontWeight: 700,
      lineHeight: 1.1,
      marginBottom: '1.2rem'
    }
  }, "Equilibre ", React.createElement("em", {
    style: {
      color: C.primary,
      fontStyle: 'italic'
    }
  }, "Trabalho"), React.createElement("br", null), "e Estudos com IA"), React.createElement("p", {
    style: {
      color: C.muted,
      fontSize: '1.05rem',
      marginBottom: '2rem',
      maxWidth: 460,
      lineHeight: 1.75
    }
  }, "O assistente de estudos que cria e ajusta sua rotina automaticamente, para que você possa focar no que realmente importa: aprender."), React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      marginBottom: '2.5rem'
    }
  }, React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setPage('dashboard')
  }, "Criar Meu Cronograma Inteligente"), React.createElement("button", {
    className: "btn btn-outline",
    onClick: () => setPage('como')
  }, "Ver Demonstra\u00E7\u00E3o \u2192")), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.75rem'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, ['GJ', 'EH', 'RC', 'CL'].map((i, idx) => React.createElement("div", {
    key: i,
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      border: `2px solid ${C.bg}`,
      background: C.card2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '.62rem',
      fontWeight: 700,
      marginLeft: idx === 0 ? 0 : -8
    }
  }, i))), React.createElement("p", {
    style: {
      fontSize: '.82rem',
      color: C.muted,
      margin: 0
    }
  }, "Junto a ", React.createElement("strong", {
    style: {
      color: C.primary
    }
  }, "+2.500 estudantes")))), React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      animation: 'float 4s ease-in-out infinite'
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: 'linear-gradient(90deg,#04CC6A,#64FFDA)'
    }
  }), React.createElement("div", {
    style: {
      fontSize: '.7rem',
      fontWeight: 600,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: C.muted,
      marginBottom: '1rem'
    }
  }, "A Organiza\u00E7\u00E3o que se Adapta a Voc\u00EA"), [{
    icon: '\uD83D\uDCC5',
    title: 'Cronograma Inteligente',
    sub: 'Ajustado em tempo real \u00E0 sua rotina',
    badge: 'IA'
  }, {
    icon: '\uD83C\uDFAF',
    title: 'Foco Adaptativo',
    sub: 'Bloqueio de distra\u00E7\u00F5es contextual',
    badge: 'Ativo'
  }, {
    icon: '\uD83D\uDCCA',
    title: 'Progresso em Tempo Real',
    sub: 'M\u00E9tricas detalhadas por disciplina',
    badge: '+18%'
  }, {
    icon: '\uD83D\uDD14',
    title: 'Lembretes Inteligentes',
    sub: 'No momento certo, sem interrup\u00E7\u00F5es',
    badge: 'Smart'
  }].map(r => React.createElement("div", {
    key: r.title,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.75rem',
      padding: '.75rem',
      background: C.card2,
      borderRadius: 8,
      marginBottom: '.6rem',
      border: `1px solid ${C.border}`
    }
  }, React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: 'rgba(4,204,106,.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      flexShrink: 0
    }
  }, r.icon), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement("div", {
    style: {
      fontSize: '.88rem',
      fontWeight: 600,
      marginBottom: 1
    }
  }, r.title), React.createElement("div", {
    style: {
      fontSize: '.75rem',
      color: C.muted
    }
  }, r.sub)), React.createElement("div", {
    style: {
      fontSize: '.65rem',
      fontWeight: 700,
      padding: '2px 8px',
      borderRadius: 99,
      background: 'rgba(4,204,106,.15)',
      color: C.primary
    }
  }, r.badge))))))), React.createElement("div", {
    style: {
      background: C.card,
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      padding: '3rem 0'
    }
  }, React.createElement("div", {
    className: "container"
  }, React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)'
    }
  }, React.createElement(StatItem, {
    val: "+2.5k",
    label: "Estudantes Ativos"
  }), React.createElement(StatItem, {
    val: "10k+",
    label: "Tarefas Conclu\u00EDdas"
  }), React.createElement(StatItem, {
    val: "4.9/5",
    label: "Avalia\u00E7\u00E3o M\u00E9dia"
  }), React.createElement(StatItem, {
    val: "98%",
    label: "Taxa de Foco",
    last: true
  })))), React.createElement("section", {
    className: "section"
  }, React.createElement("div", {
    className: "container"
  }, React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 560,
      margin: '0 auto 4rem'
    }
  }, React.createElement("h2", {
    style: {
      fontSize: 'clamp(1.8rem,3vw,2.6rem)',
      marginBottom: '.75rem'
    }
  }, "Funcionalidades do ", React.createElement("em", {
    style: {
      color: C.primary
    }
  }, "Primus")), React.createElement("p", {
    style: {
      color: C.muted
    }
  }, "A infraestrutura neural para o seu aprendizado, projetada para converter caos em clareza acad\u00EAmica.")), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '1.5rem'
    }
  }, React.createElement(FeatureCard, {
    icon: "\uD83E\uDD16",
    title: "Gerido por IA",
    desc: "Nossos algoritmos analisam sua carga hor\u00E1ria e sugerem os melhores momentos para estudar cada mat\u00E9ria, eliminando seu ciclo cansativo."
  }), React.createElement(FeatureCard, {
    icon: "\uD83D\uDD04",
    title: "Se Adapta \u00E0 sua Rotina",
    desc: "Aconteceu um imprevisto? O Primus recalcula tudo e te atualiza em segundos, sem gerar frustra\u00E7\u00E3o ou perda de progresso."
  }), React.createElement(FeatureCard, {
    icon: "\uD83C\uDFAF",
    title: "Foco Total no Aprendizado",
    desc: "Interface minimalista projetada para eliminar distra\u00E7\u00F5es com ferramentas integradas de Pomodoro e bloqueio de notifica\u00E7\u00F5es."
  })))), React.createElement("section", {
    className: "section-sm"
  }, React.createElement("div", {
    className: "container"
  }, React.createElement(CtaBlock, {
    title: "Pronto para dominar<br/>sua jornada acad\u00EAmica?",
    sub: "Experimente a ferramenta que est\u00E1 mudando a forma como estudantes de alto desempenho organizam suas vidas.",
    btnLabel: "Come\u00E7ar Agora Gratuitamente",
    onBtn: () => setPage('dashboard')
  }))), React.createElement(Footer, {
    setPage: setPage
  }));
}

function ComoPage({setPage}) {
  const steps = [{
    n: '01',
    icon: '\uD83D\uDCE5',
    title: 'Captura de Dados',
    desc: 'Envie seus materiais: PDFs, livros, anota\u00E7\u00F5es ou v\u00EDdeos. Nossa IA absorve e categoriza em instantes.'
  }, {
    n: '02',
    icon: '\uD83E\uDDEC',
    title: 'Destila\u00E7\u00E3o por IA',
    desc: 'O sistema identifica conceitos-chave e cria um cronograma personalizado baseado na ci\u00EAncia da aprendizagem.'
  }, {
    n: '03',
    icon: '\u26A1',
    title: 'Pr\u00E1tica Ativa',
    desc: 'Estude com flashcards, recursos din\u00E2micos e testes gerados especificamente para suas dificuldades.'
  }, {
    n: '04',
    icon: '\uD83D\uDCCA',
    title: 'Maestria & Insights',
    desc: 'Acompanhe seus direitos sobre cada t\u00F3pico e receba sugest\u00F5es para revis\u00F5es mais eficazes.'
  }];
  return React.createElement("div", {
    className: "fade-in"
  }, React.createElement("section", {
    style: {
      paddingTop: 140,
      paddingBottom: 60
    }
  }, React.createElement("div", {
    className: "container",
    style: {
      textAlign: 'center',
      maxWidth: 680,
      margin: '0 auto'
    }
  }, React.createElement(Badge, null, "Fluxo Inteligente"), React.createElement("h1", {
    style: {
      fontSize: 'clamp(2.2rem,5vw,3.6rem)',
      lineHeight: 1.1,
      marginBottom: '1.2rem'
    }
  }, "A Evolu\u00E7\u00E3o do seu", React.createElement("br", null), React.createElement("em", {
    style: {
      color: C.primary
    }
  }, "Fluxo de Aprendizado")), React.createElement("p", {
    style: {
      color: C.muted,
      fontSize: '1.05rem',
      marginBottom: '2rem'
    }
  }, "Nossa arquitetura de aprendizado mapeia sua cogni\u00E7\u00E3o para criar o caminho mais eficiente entre a curiosidade inicial e o dom\u00EDnio total."), React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setPage('dashboard')
  }, "Come\u00E7ar Agora \u2192"), React.createElement("button", {
    className: "btn btn-outline"
  }, "Ver Demonstra\u00E7\u00E3o")))), React.createElement("section", {
    className: "section-sm"
  }, React.createElement("div", {
    className: "container"
  }, React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: '3rem'
    }
  }, React.createElement("h2", {
    style: {
      fontSize: 'clamp(1.6rem,3vw,2.4rem)'
    }
  }, "Como a Primus ", React.createElement("em", {
    style: {
      color: C.primary
    }
  }, "Transforma"), " seu Estudo"), React.createElement("p", {
    style: {
      color: C.muted,
      marginTop: '.5rem'
    }
  }, "Quatro passos simples para a maestria intelectual.")), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '1.2rem'
    }
  }, steps.map(s => React.createElement("div", {
    key: s.n,
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: '1.8rem 1.4rem'
    }
  }, React.createElement("div", {
    style: {
      fontSize: '.7rem',
      fontWeight: 700,
      letterSpacing: '.15em',
      textTransform: 'uppercase',
      color: C.primary,
      marginBottom: '.75rem'
    }
  }, s.n, " \u2014 Passo"), React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 12,
      background: C.card2,
      border: `1px solid ${C.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.4rem',
      marginBottom: '1rem'
    }
  }, s.icon), React.createElement("h3", {
    style: {
      fontSize: '1rem',
      marginBottom: '.5rem'
    }
  }, s.title), React.createElement("p", {
    style: {
      color: C.muted,
      fontSize: '.85rem',
      lineHeight: 1.7
    }
  }, s.desc)))))), React.createElement("section", {
    className: "section"
  }, React.createElement("div", {
    className: "container"
  }, React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      alignItems: 'center'
    }
  }, React.createElement("div", null, React.createElement(Badge, null, "Ci\u00EAncia Aplicada"), React.createElement("h2", {
    style: {
      fontSize: 'clamp(1.6rem,3vw,2.2rem)',
      marginBottom: '2rem'
    }
  }, "A Ci\u00EAncia por tr\u00E1s da", React.createElement("br", null), React.createElement("em", {
    style: {
      color: C.primary
    }
  }, "Primus Inteligente")), [{
    icon: '\uD83E\uDDE0',
    title: 'Neuroplasticidade Otimizada',
    desc: 'Utilizamos algoritmos de Repeti\u00E7\u00E3o Espa\u00E7ada que se adaptam \u00E0 sua curva de esquecimento individual.'
  }, {
    icon: '\uD83D\uDD78\uFE0F',
    title: 'Rede de Conhecimento Sem\u00E2ntico',
    desc: 'Nossa IA cria mapas mentais autom\u00E1ticos, conectando novos conceitos ao que voc\u00EA j\u00E1 domina.'
  }].map(s => React.createElement("div", {
    key: s.title,
    style: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: '1.4rem',
      marginBottom: '1rem'
    }
  }, React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'rgba(4,204,106,.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.1rem',
      flexShrink: 0
    }
  }, s.icon), React.createElement("div", null, React.createElement("h4", {
    style: {
      fontSize: '.95rem',
      marginBottom: '.3rem'
    }
  }, s.title), React.createElement("p", {
    style: {
      color: C.muted,
      fontSize: '.85rem'
    }
  }, s.desc))))), React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      aspectRatio: '16/9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    }
  }, React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: 'rgba(4,204,106,.15)',
      border: `2px solid ${C.primary}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      cursor: 'pointer'
    }
  }, "\u25B6"), React.createElement("p", {
    style: {
      fontSize: '.85rem',
      color: C.muted
    }
  }, "V\u00EDdeo Demonstrativo"))))), React.createElement("section", {
    className: "section-sm"
  }, React.createElement("div", {
    className: "container"
  }, React.createElement(CtaBlock, {
    title: "Pronto para transformar<br/>sua maneira de aprender?",
    sub: "Experimente a Primus hoje e sinta a diferen\u00E7a em sua produtividade acad\u00EAmica.",
    btnLabel: "Come\u00E7ar Gr\u00E1tis Agora",
    onBtn: () => setPage('dashboard')
  }))), React.createElement(Footer, {
    setPage: setPage
  }));
}

function SobrePage({setPage}) {
  const team = [{
    name: 'L. Eduardo S. Corr\u00EAa',
    role: 'FullStack Arch'
  }, {
    name: 'Rafael Cescate do Carmo',
    role: 'Cloud Engineer'
  }, {
    name: 'Guilherme J. M. Martinelli',
    role: 'Algorithm Specialist'
  }, {
    name: 'Cau\u00EA Licce',
    role: 'Systems Analyst'
  }];
  return React.createElement("div", {
    className: "fade-in"
  }, React.createElement("section", {
    style: {
      paddingTop: 140,
      paddingBottom: 60
    }
  }, React.createElement("div", {
    className: "container",
    style: {
      textAlign: 'center',
      maxWidth: 680,
      margin: '0 auto'
    }
  }, React.createElement(Badge, null, "Intelig\u00EAncia Primum"), React.createElement("h1", {
    style: {
      fontSize: 'clamp(2rem,5vw,3.4rem)',
      lineHeight: 1.1,
      marginBottom: '1rem'
    }
  }, "Nossa Identidade e ", React.createElement("em", {
    style: {
      color: C.primary
    }
  }, "Compromisso")), React.createElement("p", {
    style: {
      color: C.muted
    }
  }, "Inspirados pela precis\u00E3o tecnol\u00F3gica e a busca incessante pelo conhecimento, criamos ferramentas para elevar a capacidade cognitiva humana ao pr\u00F3ximo patamar."))), React.createElement("section", {
    className: "section-sm"
  }, React.createElement("div", {
    className: "container"
  }, React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '1.4rem'
    }
  }, [{
    icon: '\uD83C\uDFAF',
    title: 'Miss\u00E3o',
    text: 'Facilitar o percurso acad\u00EAmico de estudantes, oferecendo gerenciamento de tempo e foco atrav\u00E9s de metodologias de sincroniza\u00E7\u00E3o cognitiva.'
  }, {
    icon: '\uD83C\uDF10',
    title: 'Vis\u00E3o',
    text: 'Ser o ecossistema l\u00EDder em organiza\u00E7\u00E3o cotidiana, estabelecendo o padr\u00E3o global para produtividade e hiper-intelig\u00EAncia aplicada ao aprendizado.'
  }, {
    icon: '\u2696\uFE0F',
    title: 'Valores',
    text: 'Comprometimento com a evolu\u00E7\u00E3o intelectual, integrando \u00E9tica, precis\u00E3o t\u00E9cnica e efici\u00EAncia para transformar a rotina de estudos em excel\u00EAncia.'
  }].map(c => React.createElement("div", {
    key: c.title,
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: '2rem'
    }
  }, React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 10,
      background: 'rgba(4,204,106,.1)',
      border: '1px solid rgba(4,204,106,.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      marginBottom: '1rem'
    }
  }, c.icon), React.createElement("h3", {
    style: {
      color: C.primary,
      marginBottom: '.6rem'
    }
  }, c.title), React.createElement("p", {
    style: {
      color: C.muted,
      fontSize: '.9rem',
      lineHeight: 1.7
    }
  }, c.text)))))), React.createElement("section", {
    className: "section-sm"
  }, React.createElement("div", {
    className: "container"
  }, React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 20,
      padding: '3rem'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, React.createElement("div", null, React.createElement("h2", {
    style: {
      fontSize: 'clamp(1.6rem,3vw,2.2rem)',
      marginBottom: '.5rem'
    }
  }, "Arquitetos da ", React.createElement("em", {
    style: {
      color: C.primary
    }
  }, "Inova\u00E7\u00E3o")), React.createElement("p", {
    style: {
      color: C.muted,
      fontSize: '.9rem'
    }
  }, "Nossa equipe \u00E9 composta por mentes dedicadas \u00E0 constru\u00E7\u00E3o de um ecossistema de aprendizado impactante.")), React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '.5rem',
      fontSize: '.72rem',
      fontWeight: 600,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: C.tertiary,
      background: 'rgba(100,255,218,.06)',
      border: '1px solid rgba(100,255,218,.2)',
      borderRadius: 6,
      padding: '6px 14px'
    }
  }, "\u2699 UniCesumar \u2014 Engenharia de Software")), team.map(m => React.createElement("div", {
    key: m.name,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '.9rem 1.2rem',
      background: C.card2,
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      marginBottom: '.75rem'
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: '.92rem'
    }
  }, m.name), React.createElement("div", {
    style: {
      fontSize: '.78rem',
      fontWeight: 600,
      color: C.primary
    }
  }, m.role)))))), React.createElement(Footer, {
    setPage: setPage
  }));
}

function ContatoPage({setPage}) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    assunto: 'Suporte Técnico',
    msg: ''
  });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => {
    if (!form.nome || !form.email || !form.msg) {
      alert('Preencha todos os campos.');
      return;
    }
    setSent(true);
  };
  return React.createElement("div", {
    className: "fade-in"
  }, React.createElement("section", {
    style: {
      paddingTop: 140,
      paddingBottom: 80
    }
  }, React.createElement("div", {
    className: "container"
  }, React.createElement("div", {
    style: {
      maxWidth: 580,
      marginBottom: '3rem'
    }
  }, React.createElement(Badge, null, "Central de Comunica\u00E7\u00E3o"), React.createElement("h1", {
    style: {
      fontSize: 'clamp(2rem,5vw,3.2rem)',
      lineHeight: 1.1,
      marginBottom: '1rem'
    }
  }, "Fale com a nossa", React.createElement("br", null), React.createElement("em", {
    style: {
      color: C.primary
    }
  }, "Equipe Especialista")), React.createElement("p", {
    style: {
      color: C.muted
    }
  }, "Estamos aqui para ajudar voc\u00EA a escalar seus processos.")), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr .85fr',
      gap: '3rem',
      alignItems: 'start'
    }
  }, React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      padding: '2.5rem'
    }
  }, sent ? React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '3rem 0'
    }
  }, React.createElement("div", {
    style: {
      fontSize: '3rem',
      marginBottom: '1rem'
    }
  }, "\u2705"), React.createElement("h3", {
    style: {
      color: C.primary,
      marginBottom: '.5rem'
    }
  }, "Mensagem Enviada!"), React.createElement("p", {
    style: {
      color: C.muted
    }
  }, "Nossa equipe entrar\u00E1 em contato em breve."), React.createElement("button", {
    className: "btn btn-outline btn-sm",
    style: {
      marginTop: '1.5rem'
    },
    onClick: () => setSent(false)
  }, "Enviar outra")) : React.createElement(React.Fragment, null, React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '1rem'
    }
  }, [['Nome Completo', 'text', 'Eric Mario Silva', 'nome'], ['Email', 'email', 'seu@email.com', 'email']].map(([lbl, type, ph, key]) => React.createElement("div", {
    key: key
  }, React.createElement("label", {
    style: {
      display: 'block',
      fontSize: '.72rem',
      fontWeight: 600,
      letterSpacing: '.05em',
      textTransform: 'uppercase',
      color: C.muted,
      marginBottom: '.4rem'
    }
  }, lbl), React.createElement("input", {
    type: type,
    placeholder: ph,
    value: form[key],
    onChange: e => setForm({
      ...form,
      [key]: e.target.value
    }),
    style: {
      width: '100%',
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      color: C.text,
      padding: '.75rem 1rem',
      fontFamily: 'var(--font)',
      fontSize: '.9rem',
      outline: 'none'
    }
  })))), React.createElement("div", {
    style: {
      marginBottom: '1rem'
    }
  }, React.createElement("label", {
    style: {
      display: 'block',
      fontSize: '.72rem',
      fontWeight: 600,
      letterSpacing: '.05em',
      textTransform: 'uppercase',
      color: C.muted,
      marginBottom: '.4rem'
    }
  }, "Assunto"), React.createElement("select", {
    value: form.assunto,
    onChange: e => setForm({
      ...form,
      assunto: e.target.value
    }),
    style: {
      width: '100%',
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      color: C.text,
      padding: '.75rem 1rem',
      fontFamily: 'var(--font)',
      fontSize: '.9rem',
      outline: 'none'
    }
  }, React.createElement("option", null, "Suporte T\u00E9cnico"), React.createElement("option", null, "Parceria Comercial"), React.createElement("option", null, "D\u00FAvida sobre o Produto"), React.createElement("option", null, "Outro"))), React.createElement("div", {
    style: {
      marginBottom: '1rem'
    }
  }, React.createElement("label", {
    style: {
      display: 'block',
      fontSize: '.72rem',
      fontWeight: 600,
      letterSpacing: '.05em',
      textTransform: 'uppercase',
      color: C.muted,
      marginBottom: '.4rem'
    }
  }, "Mensagem"), React.createElement("textarea", {
    placeholder: "Como podemos ajudar no seu projeto?",
    value: form.msg,
    onChange: e => setForm({
      ...form,
      msg: e.target.value
    }),
    rows: 5,
    style: {
      width: '100%',
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      color: C.text,
      padding: '.75rem 1rem',
      fontFamily: 'var(--font)',
      fontSize: '.9rem',
      outline: 'none',
      resize: 'vertical'
    }
  })), React.createElement("button", {
    className: "btn btn-primary",
    style: {
      width: '100%'
    },
    onClick: handleSubmit
  }, "Enviar Mensagem"))), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem'
    }
  }, React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: '1.6rem'
    }
  }, React.createElement("h3", {
    style: {
      fontSize: '1rem',
      marginBottom: '1rem'
    }
  }, "\uD83D\uDD17 Canais Diretos"), [['\uD83D\uDCE7', 'Email Corporativo', 'atendimento@primus.com.br'], ['\uD83D\uDCDE', 'Telefone', '(800) 525 4887'], ['\uD83D\uDCF1', 'Redes Sociais', 'LinkedIn \u00B7 Instagram \u00B7 YouTube']].map(([ic, t, s]) => React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.75rem',
      marginBottom: '.9rem'
    }
  }, React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: 'rgba(4,204,106,.1)',
      border: '1px solid rgba(4,204,106,.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, ic), React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: '.82rem',
      fontWeight: 600,
      marginBottom: 1
    }
  }, t), React.createElement("div", {
    style: {
      fontSize: '.78rem',
      color: C.muted
    }
  }, s))))), React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: '1.6rem'
    }
  }, React.createElement("h3", {
    style: {
      fontSize: '1rem',
      marginBottom: '1rem'
    }
  }, "\u2753 D\u00FAvidas Frequentes"), React.createElement("div", {
    style: {
      padding: '.9rem 1.1rem',
      background: C.card2,
      borderRadius: 8,
      fontSize: '.88rem',
      fontWeight: 500,
      border: `1px solid ${C.border}`,
      cursor: 'pointer'
    }
  }, "Consulte nossa central de ajuda \u2192"), React.createElement("div", {
    style: {
      marginTop: '.75rem',
      fontSize: '.72rem',
      fontWeight: 600,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: C.primary,
      display: 'flex',
      alignItems: 'center',
      gap: '.4rem'
    }
  }, React.createElement("span", {
    style: {
      animation: 'pulse 2s infinite'
    }
  }, "\u25CF"), " SEDE: S\u00C3O PAULO, BR")))))), React.createElement(Footer, {
    setPage: setPage
  }));
}

function DashboardPage({setPage}) {
  const [activeTab, setActiveTab] = useState('cronograma');
  const [timer, setTimer] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const tasks = [{
    subject: 'C\u00E1lculo II',
    topic: 'Derivadas Parciais',
    due: 'Hoje',
    progress: 65,
    color: '#04CC6A'
  }, {
    subject: 'F\u00EDsica III',
    topic: 'Campo El\u00E9trico',
    due: 'Amanh\u00E3',
    progress: 30,
    color: '#64FFDA'
  }, {
    subject: 'POO',
    topic: 'Heran\u00E7a e Polimorfismo',
    due: 'Qui',
    progress: 85,
    color: '#7C3AED'
  }, {
    subject: 'EDs',
    topic: '\u00C1rvores Bin\u00E1rias',
    due: 'Sex',
    progress: 10,
    color: '#F59E0B'
  }];
  const schedule = [{
    time: '08:00',
    subject: 'C\u00E1lculo II',
    duration: '1h 30min',
    color: '#04CC6A'
  }, {
    time: '10:00',
    subject: 'Revis\u00E3o F\u00EDsica',
    duration: '45min',
    color: '#64FFDA'
  }, {
    time: '14:00',
    subject: 'POO \u2014 Projeto',
    duration: '2h',
    color: '#7C3AED'
  }, {
    time: '17:00',
    subject: 'EDs \u2014 Lista',
    duration: '1h',
    color: '#F59E0B'
  }, {
    time: '20:00',
    subject: 'Flashcards Gerais',
    duration: '30min',
    color: '#EC4899'
  }];
  const sidebarItems = [{
    icon: '\uD83D\uDCCA',
    label: 'Dashboard',
    id: 'cronograma'
  }, {
    icon: '\uD83D\uDCC5',
    label: 'Cronograma',
    id: 'cronograma'
  }, {
    icon: '\u2705',
    label: 'Tarefas',
    id: 'tarefas'
  }, {
    icon: '\u23F1',
    label: 'Foco',
    id: 'foco'
  }, {
    icon: '\uD83D\uDCC8',
    label: 'Progresso',
    id: 'progresso'
  }];
  return React.createElement("div", {
    style: {
      minHeight: '100vh',
      paddingTop: 72,
      background: C.bg,
      display: 'flex'
    }
  }, React.createElement("div", {
    style: {
      width: 220,
      background: C.bg2,
      borderRight: `1px solid ${C.border}`,
      padding: '1.5rem 0',
      position: 'fixed',
      top: 72,
      bottom: 0,
      left: 0,
      overflowY: 'auto',
      zIndex: 50
    }
  }, React.createElement("div", {
    style: {
      padding: '0 1rem',
      marginBottom: '1.5rem'
    }
  }, React.createElement("div", {
    style: {
      fontSize: '.65rem',
      fontWeight: 600,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: C.muted,
      marginBottom: '.75rem'
    }
  }, "Menu Principal"), sidebarItems.map(s => React.createElement("div", {
    key: s.label,
    onClick: () => setActiveTab(s.id),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.75rem',
      padding: '.7rem .9rem',
      borderRadius: 8,
      marginBottom: '.25rem',
      cursor: 'pointer',
      background: activeTab === s.id ? 'rgba(4,204,106,.1)' : 'transparent',
      color: activeTab === s.id ? C.primary : C.muted,
      fontWeight: activeTab === s.id ? 600 : 400,
      fontSize: '.88rem',
      transition: 'all .2s',
      border: activeTab === s.id ? `1px solid rgba(4,204,106,.2)` : '1px solid transparent'
    }
  }, React.createElement("span", null, s.icon), s.label))), React.createElement("div", {
    style: {
      padding: '0 1rem',
      borderTop: `1px solid ${C.border}`,
      paddingTop: '1rem',
      marginTop: '.5rem'
    }
  }, React.createElement("div", {
    style: {
      fontSize: '.65rem',
      fontWeight: 600,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: C.muted,
      marginBottom: '.75rem'
    }
  }, "Configura\u00E7\u00F5es"), ['\u2699\uFE0F Prefer\u00EAncias', '\uD83D\uDD14 Notifica\u00E7\u00F5es', '\uD83D\uDEAA Sair do App'].map(i => React.createElement("div", {
    key: i,
    style: {
      padding: '.65rem .9rem',
      borderRadius: 8,
      fontSize: '.85rem',
      color: C.muted,
      cursor: 'pointer',
      marginBottom: '.2rem'
    },
    onClick: () => i.includes('Sair') && setPage('home')
  }, i)))), React.createElement("div", {
    style: {
      marginLeft: 220,
      flex: 1,
      padding: '2rem',
      minHeight: 'calc(100vh - 72px)'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    }
  }, React.createElement("div", null, React.createElement("h2", {
    style: {
      fontSize: '1.5rem',
      fontWeight: 700
    }
  }, "Bom dia, Guilherme! \uD83D\uDC4B"), React.createElement("p", {
    style: {
      color: C.muted,
      fontSize: '.85rem',
      margin: 0
    }
  }, "Voc\u00EA tem 4 mat\u00E9rias para revisar hoje.")), React.createElement("div", {
    style: {
      display: 'flex',
      gap: '.75rem',
      alignItems: 'center'
    }
  }, React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: '.5rem 1rem',
      fontSize: '.82rem',
      color: C.muted
    }
  }, "\uD83D\uDCC5 Seg, 16 Jun 2026"), React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'rgba(4,204,106,.15)',
      border: `2px solid ${C.primary}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '.85rem',
      color: C.primary
    }
  }, "G"))), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '1rem',
      marginBottom: '2rem'
    }
  }, [{
    icon: '\uD83D\uDD25',
    val: '7 dias',
    label: 'Sequ\u00EAncia Atual',
    color: '#F59E0B'
  }, {
    icon: '\u2705',
    val: '3/5',
    label: 'Tarefas Hoje',
    color: C.primary
  }, {
    icon: '\u23F1',
    val: '3h 20min',
    label: 'Tempo de Foco',
    color: C.tertiary
  }, {
    icon: '\uD83D\uDCC8',
    val: '+12%',
    label: 'vs. Semana Passada',
    color: '#7C3AED'
  }].map(s => React.createElement("div", {
    key: s.label,
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: '1.2rem',
      position: 'relative',
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: s.color
    }
  }), React.createElement("div", {
    style: {
      fontSize: '1.4rem',
      marginBottom: '.4rem'
    }
  }, s.icon), React.createElement("div", {
    style: {
      fontSize: '1.4rem',
      fontWeight: 700,
      color: s.color,
      marginBottom: '.2rem'
    }
  }, s.val), React.createElement("div", {
    style: {
      fontSize: '.72rem',
      color: C.muted,
      fontWeight: 600,
      letterSpacing: '.05em',
      textTransform: 'uppercase'
    }
  }, s.label)))), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: '1.5rem'
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.2rem'
    }
  }, React.createElement("h3", {
    style: {
      fontSize: '.95rem'
    }
  }, "\uD83D\uDCC5 Cronograma de Hoje"), React.createElement("span", {
    style: {
      fontSize: '.72rem',
      color: C.primary,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Ver tudo \u2192")), schedule.map(s => React.createElement("div", {
    key: s.time,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.75rem',
      padding: '.7rem',
      borderRadius: 8,
      marginBottom: '.5rem',
      background: C.card2,
      border: `1px solid ${C.border}`
    }
  }, React.createElement("div", {
    style: {
      fontSize: '.7rem',
      fontFamily: 'monospace',
      color: C.muted,
      width: 40,
      flexShrink: 0
    }
  }, s.time), React.createElement("div", {
    style: {
      width: 3,
      height: 36,
      borderRadius: 2,
      background: s.color,
      flexShrink: 0
    }
  }), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement("div", {
    style: {
      fontSize: '.88rem',
      fontWeight: 600,
      marginBottom: 1
    }
  }, s.subject), React.createElement("div", {
    style: {
      fontSize: '.72rem',
      color: C.muted
    }
  }, s.duration)), React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: s.color
    }
  })))), React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: '1.5rem'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.2rem'
    }
  }, React.createElement("h3", {
    style: {
      fontSize: '.95rem'
    }
  }, "\u2705 Mat\u00E9rias para Estudar"), React.createElement("button", {
    className: "btn btn-primary btn-sm"
  }, "+ Adicionar")), tasks.map(t => React.createElement("div", {
    key: t.subject,
    style: {
      background: C.card2,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: '1rem',
      marginBottom: '.7rem'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '.6rem'
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: '.9rem',
      fontWeight: 600,
      marginBottom: 2
    }
  }, t.subject), React.createElement("div", {
    style: {
      fontSize: '.75rem',
      color: C.muted
    }
  }, t.topic)), React.createElement("div", {
    style: {
      fontSize: '.7rem',
      fontWeight: 600,
      padding: '3px 8px',
      borderRadius: 99,
      background: 'rgba(4,204,106,.1)',
      color: C.primary
    }
  }, t.due)), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.75rem'
    }
  }, React.createElement("div", {
    style: {
      flex: 1,
      height: 5,
      background: 'rgba(255,255,255,.08)',
      borderRadius: 99,
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      height: '100%',
      width: `${t.progress}%`,
      background: t.color,
      borderRadius: 99,
      transition: 'width .5s'
    }
  })), React.createElement("span", {
    style: {
      fontSize: '.72rem',
      color: C.muted,
      width: 32,
      textAlign: 'right'
    }
  }, t.progress, "%")))))), React.createElement("div", null, React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: '1.5rem',
      marginBottom: '1.5rem',
      textAlign: 'center'
    }
  }, React.createElement("h3", {
    style: {
      fontSize: '.95rem',
      marginBottom: '1.5rem'
    }
  }, "\u23F1 Timer de Foco"), React.createElement("div", {
    style: {
      position: 'relative',
      width: 140,
      height: 140,
      margin: '0 auto 1.5rem'
    }
  }, React.createElement("svg", {
    width: "140",
    height: "140",
    style: {
      transform: 'rotate(-90deg)'
    }
  }, React.createElement("circle", {
    cx: "70",
    cy: "70",
    r: "60",
    fill: "none",
    stroke: C.border,
    strokeWidth: "6"
  }), React.createElement("circle", {
    cx: "70",
    cy: "70",
    r: "60",
    fill: "none",
    stroke: C.primary,
    strokeWidth: "6",
    strokeDasharray: `${2 * Math.PI * 60}`,
    strokeDashoffset: `${2 * Math.PI * 60 * (1 - timer / (25 * 60))}`,
    strokeLinecap: "round",
    style: {
      transition: 'stroke-dashoffset .5s'
    }
  })), React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      fontFamily: 'monospace',
      fontSize: '1.8rem',
      fontWeight: 700,
      color: C.text
    }
  }, fmt(timer))), React.createElement("div", {
    style: {
      fontSize: '.8rem',
      color: C.muted,
      marginBottom: '1.2rem'
    }
  }, "Sess\u00E3o de Pomodoro \u2014 25 min"), React.createElement("div", {
    style: {
      display: 'flex',
      gap: '.75rem',
      justifyContent: 'center'
    }
  }, React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => setTimerRunning(r => !r)
  }, timerRunning ? '⏸ Pausar' : '\u25B6 Iniciar'), React.createElement("button", {
    className: "btn btn-outline btn-sm",
    onClick: () => {
      setTimer(25 * 60);
      setTimerRunning(false);
    }
  }, "\u21BA Reset"))), React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: '1.5rem'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.5rem',
      marginBottom: '1.2rem'
    }
  }, React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: 'rgba(4,204,106,.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '.85rem'
    }
  }, "\uD83E\uDD16"), React.createElement("h3", {
    style: {
      fontSize: '.95rem'
    }
  }, "Sugest\u00F5es da IA")), [{
    text: 'Voc\u00EA est\u00E1 indo bem em POO! Tente avan\u00E7ar para Interfaces hoje.',
    type: 'success'
  }, {
    text: 'F\u00EDsica III precisa de aten\u00E7\u00E3o \u2014 recomendo +30 min amanh\u00E3.',
    type: 'warn'
  }, {
    text: '\u00D3timo momento para revisar C\u00E1lculo: seu pico de foco \u00E9 \u00E0s 14h.',
    type: 'info'
  }].map((s, i) => React.createElement("div", {
    key: i,
    style: {
      background: C.card2,
      borderRadius: 8,
      padding: '.85rem',
      marginBottom: '.6rem',
      borderLeft: `3px solid ${s.type === 'success' ? C.primary : s.type === 'warn' ? '#F59E0B' : C.tertiary}`
    }
  }, React.createElement("p", {
    style: {
      fontSize: '.82rem',
      color: C.muted,
      margin: 0,
      lineHeight: 1.6
    }
  }, s.text))))))))));
}

function Footer({setPage}) {
  return React.createElement("footer", {
    style: {
      background: C.bg2,
      borderTop: `1px solid ${C.border}`,
      padding: '3rem 0 1.5rem'
    }
  }, React.createElement("div", {
    className: "container"
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '.75rem',
      paddingTop: '1rem',
      fontSize: '.78rem',
      color: C.muted
    }
  }, React.createElement("div", {
    style: {
      fontSize: '1.1rem',
      fontWeight: 700,
      color: C.primary
    }
  }, "PRIMUS"), React.createElement("span", null, "\u00A9 2024 Primus Hyper-Intelligence. Todos os direitos reservados."), React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1.5rem'
    }
  }, ['Privacidade', 'Termos', 'Ajuda'].map(l => React.createElement("span", {
    key: l,
    style: {
      cursor: 'pointer',
      transition: 'color .2s'
    }
  }, l))))));
}

function App() {
  const [page, setPage] = useState('home');
  const changePage = id => {
    setPage(id);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return React.createElement(React.Fragment, null, React.createElement(Navbar, {
    currentPage: page,
    setPage: changePage
  }), page === 'home' && React.createElement(HomePage, {
    setPage: changePage
  }), page === 'como' && React.createElement(ComoPage, {
    setPage: changePage
  }), page === 'sobre' && React.createElement(SobrePage, {
    setPage: changePage
  }), page === 'contato' && React.createElement(ContatoPage, {
    setPage: changePage
  }), page === 'dashboard' && React.createElement(DashboardPage, {
    setPage: changePage
  }));
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
