document.addEventListener('DOMContentLoaded', () => {
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
      useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
      }, []);
      const links = [{id: 'home', label: 'Funcionalidades'}, {id: 'como', label: 'Como Funciona'}, {id: 'sobre', label: 'Sobre Nós'}, {id: 'contato', label: 'Contato'}];
      return React.createElement("nav", {
        style: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(10,15,26,.88)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.4)' : 'none', padding: '1rem 0', transition: 'box-shadow .3s' }
      }, React.createElement("div", {
        style: { maxWidth: 1140, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '2rem' }
      }, React.createElement("div", {
        style: { fontSize: '1.2rem', fontWeight: 700, color: C.primary, marginRight: 'auto', letterSpacing: '-.01em', cursor: 'pointer' },
        onClick: () => setPage('home')
      }, "PRIMUS"), React.createElement("div", { style: { display: 'flex', gap: 0 } }, 
        links.map(l => React.createElement("div", {
          key: l.id,
          onClick: () => { setPage(l.id); window.scrollTo({ top: 0, behavior: 'smooth' }); },
          style: { padding: '.5rem 1rem', fontSize: '.88rem', fontWeight: 500, cursor: 'pointer', color: currentPage === l.id ? C.primary : C.muted, borderBottom: currentPage === l.id ? `2px solid ${C.primary}` : '2px solid transparent', transition: 'all .2s' }
        }, l.label))
      ), React.createElement("button", { className: "btn btn-primary btn-sm", onClick: () => setPage('dashboard') }, "Abrir App \u2192")));
    }

    function Badge({children}) { return React.createElement("div", { className: "badge" }, "\u2B21 ", children); }

    function FeatureCard({icon, title, desc}) {
      const [hov, setHov] = useState(false);
      return React.createElement("div", {
        onMouseEnter: () => setHov(true), onMouseLeave: () => setHov(false),
        style: { background: C.card, border: `1px solid ${hov ? 'rgba(4,204,106,.35)' : C.border}`, borderRadius: 14, padding: '2rem', transition: 'all .3s', transform: hov ? 'translateY(-4px)' : 'none', position: 'relative', overflow: 'hidden' }
      }, hov && React.createElement("div", { style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#04CC6A,#64FFDA)' } }),
        React.createElement("div", { style: { width: 48, height: 48, borderRadius: 12, background: 'rgba(4,204,106,.12)', border: '1px solid rgba(4,204,106,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '1rem' } }, icon),
        React.createElement("h3", { style: { marginBottom: '.5rem', fontSize: '1.1rem' } }, title),
        React.createElement("p", { style: { color: C.muted, fontSize: '.9rem', lineHeight: 1.7, marginBottom: '1.2rem' } }, desc),
        React.createElement("span", { style: { fontSize: '.85rem', fontWeight: 600, color: C.primary, cursor: 'pointer' } }, "Saber Mais \u2192")
      );
    }

    function StatItem({val, label, last}) {
      return React.createElement("div", { style: { textAlign: 'center', padding: '0 2rem', borderRight: last ? 'none' : `1px solid ${C.border}` } },
        React.createElement("div", { style: { fontSize: '2.2rem', fontWeight: 700, color: C.primary, marginBottom: '.25rem' } }, val),
        React.createElement("div", { style: { fontSize: '.72rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: C.muted } }, label)
      );
    }

    function CtaBlock({title, sub, btnLabel, onBtn}) {
      return React.createElement("div", { style: { background: 'linear-gradient(135deg,#002A52,#001830)', border: '1px solid rgba(4,204,106,.2)', borderRadius: 20, padding: '5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' } },
        React.createElement("div", { style: { position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(4,204,106,.1),transparent 70%)' } }),
        React.createElement("h2", { style: { fontSize: 'clamp(1.8rem,3vw,2.6rem)', marginBottom: '1rem' }, dangerouslySetInnerHTML: { __html: title } }),
        React.createElement("p", { style: { color: C.muted, marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem' } }, sub),
        React.createElement("button", { className: "btn btn-primary", onClick: onBtn }, btnLabel)
      );
    }

    function HomePage({setPage}) {
      return React.createElement("div", { className: "fade-in" },
        React.createElement("section", { style: { minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, background: 'radial-gradient(ellipse 70% 60% at 60% 40%,rgba(0,42,82,.55),transparent 70%),radial-gradient(ellipse 40% 40% at 90% 10%,rgba(4,204,106,.08),transparent 60%),#0A0F1A' } },
          React.createElement("div", { className: "container" },
            React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' } },
              React.createElement("div", null,
                React.createElement(Badge, null, "Hiper-Intelig\u00EAncia Acad\u00EAmica"),
                React.createElement("h1", { style: { fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.2rem' } }, "Equilibre ", React.createElement("em", { style: { color: C.primary, fontStyle: 'italic' } }, "Trabalho"), React.createElement("br", null), "e Estudos com IA"),
                React.createElement("p", { style: { color: C.muted, fontSize: '1.05rem', marginBottom: '2rem', maxWidth: 460, lineHeight: 1.75 } }, "O assistente de estudos que cria e ajusta sua rotina automaticamente, para que você possa focar no que realmente importa: aprender."),
                React.createElement("div", { style: { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' } },
                  React.createElement("button", { className: "btn btn-primary", onClick: () => setPage('dashboard') }, "Criar Meu Cronograma Inteligente"),
                  React.createElement("button", { className: "btn btn-outline", onClick: () => setPage('como') }, "Ver Demonstra\u00E7\u00E3o \u2192")
                )
              ),
              React.createElement("div", { style: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '1.5rem', position: 'relative', overflow: 'hidden', animation: 'float 4s ease-in-out infinite' } },
                React.createElement("div", { style: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#04CC6A,#64FFDA)' } }),
                React.createElement("div", { style: { fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: C.muted, marginBottom: '1rem' } }, "A Organiza\u00E7\u00E3o que se Adapta a Voc\u00EA"),
                [{icon: '\uD83D\uDCC5', title: 'Cronograma Inteligente', sub: 'Ajustado em tempo real \u00E0 sua rotina', badge: 'IA'}, {icon: '\uD83C\uDFAF', title: 'Foco Adaptativo', sub: 'Bloqueio de distra\u00E7\u00F5es contextual', badge: 'Ativo'}, {icon: '\uD83D\uDCCA', title: 'Progresso em Tempo Real', sub: 'M\u00E9tricas detalhadas por disciplina', badge: '+18%'}, {icon: '\uD83D\uDD14', title: 'Lembretes Inteligentes', sub: 'No momento certo, sem interrup\u00E7\u00F5es', badge: 'Smart'}].map(r => React.createElement("div", { key: r.title, style: { display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem', background: C.card2, borderRadius: 8, marginBottom: '.6rem', border: `1px solid ${C.border}` } },
                  React.createElement("div", { style: { width: 36, height: 36, borderRadius: 8, background: 'rgba(4,204,106,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 } }, r.icon),
                  React.createElement("div", { style: { flex: 1 } }, React.createElement("div", { style: { fontSize: '.88rem', fontWeight: 600, marginBottom: 1 } }, r.title), React.createElement("div", { style: { fontSize: '.75rem', color: C.muted } }, r.sub)),
                  React.createElement("div", { style: { fontSize: '.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: 'rgba(4,204,106,.15)', color: C.primary } }, r.badge)
                ))
              )
            )
          )
        ),
        React.createElement("div", { style: { background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '3rem 0' } },
          React.createElement("div", { className: "container" },
            React.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' } },
              React.createElement(StatItem, { val: "+2.5k", label: "Estudantes Ativos" }),
              React.createElement(StatItem, { val: "10k+", label: "Tarefas Conclu\u00EDdas" }),
              React.createElement(StatItem, { val: "4.9/5", label: "Avalia\u00E7\u00E3o M\u00E9dia" }),
              React.createElement(StatItem, { val: "98%", label: "Taxa de Foco", last: true })
            )
          )
        )
      );
    }

    function Footer({setPage}) {
      return React.createElement("footer", { style: { background: C.bg2, borderTop: `1px solid ${C.border}`, padding: '3rem 0 1.5rem' } },
        React.createElement("div", { className: "container" },
          React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '.75rem', paddingTop: '1rem', fontSize: '.78rem', color: C.muted } },
            React.createElement("div", { style: { fontSize: '1.1rem', fontWeight: 700, color: C.primary } }, "PRIMUS"),
            React.createElement("span", null, "\u00A9 2024 Primus Hyper-Intelligence. Todos os direitos reservados.")
          )
        )
      );
    }

    function App() {
      const [page, setPage] = useState('home');
      return React.createElement(React.Fragment, null,
        React.createElement(Navbar, { currentPage: page, setPage: setPage }),
        page === 'home' && React.createElement(HomePage, { setPage: setPage }),
        React.createElement(Footer, { setPage: setPage })
      );
    }

    const rootElement = document.getElementById('root');
    if (rootElement) {
        ReactDOM.createRoot(rootElement).render(React.createElement(App, null));
    }
});
