const { useState, useEffect, useRef } = React; // vai colocar em uma constante os hooks do React( q é é uma função que lhe dá acesso à Memória interna do React)
//  importados q vai gerenciar estado, efeitos colaterais e referencias a elementos DOM

/* ══ DESIGN TOKENS( as variaveis q substitue os códigos fixos na estilização da interface ) ══ */
const C = { // constante é onde ficam as variáveis de cores q foi usado no site
  primary: '#04CC6A', primaryD: '#03A855', tertiary: '#64FFDA', // cores principais do site
  bg: '#0A0F1A', bg2: '#0F172A', card: '#131E30', card2: '#1A2640', // cores do fundo e dos cards
  border: '#1E3050', text: '#F8FAFC', muted: '#8899AA', // cores pra texto e bordas
};

/* ══ ESTILOS GLOBAIS ══ */
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
`; // essa constante é onde ficam os estilos globais do site, como os botões, badges, container, seções e animações
const styleEl = document.createElement('style'); // cria um elemento de estilo n DOM
styleEl.textContent = globalCSS; // ADICIONADO: Aplica o CSS global ao elemento de estilo
document.head.appendChild(styleEl); // adiciona esse elemento na 
// cabeça do documento, pra q os estilos sejam aplicados

/*  Componentes  */

/* ── NavBar( a barra de navegação ) ── */
function Navbar({ currentPage, setPage }) { // currentPage é a página atual, setPage é a função para mudar de página
  const [scrolled, setScrolled] = useState(false); // scrolled é um estado que indica se a página foi rolada para baixo ou não
  const [menuOpen, setMenuOpen] = useState(false); // menuOpen é um estado que indica se o menu móvel está aberto ou não

  useEffect(() => { // useEffect é um hook que executa uma função depois que o componente é renderizado, e pode retornar uma função de limpeza
    const onScroll = () => setScrolled(window.scrollY > 20); // onScroll é uma função que atualiza o estado scrolled para true se a 
    // posição vertical da rolagem for maior que 20 pixels, e para false caso contrário
    window.addEventListener('scroll', onScroll); // adiciona um ouvinte de evento para detectar quando o usuário rola a página
    return () => window.removeEventListener('scroll', onScroll); // a função de limpeza remove o ouvinte 
    // de evento quando o componente é desmontado, para evitar vazamentos de memória
  }, []); 

  const links = [ // links é um array de objetos que representa os links de navegação, cada objeto tem um id e um label( é pra nomear campos de formulário)
    { id: 'home',    label: 'Funcionalidades' },
    { id: 'como',    label: 'Como Funciona'   },
    { id: 'sobre',   label: 'Sobre Nós'       },
    { id: 'contato', label: 'Contato'          },
  ];

  const navStyle = { // o navStyle é um objeto que define os estilos da barra de navegação, usando as variáveis das cores e o estado scrolled para aplicar uma sombra quando a página é rolada
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: 'rgba(10,15,26,.88)', backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${C.border}`,
    boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.4)' : 'none',
    padding: '1rem 0', transition: 'box-shadow .3s',
  };

  return (
    <nav style={navStyle}> 
      <div style={{ maxWidth:1140, margin:'0 auto', padding:'0 2rem', display:'flex', alignItems:'center', gap:'2rem' }}> 
        <div style={{ fontSize:'1.2rem', fontWeight:700, color:C.primary, marginRight:'auto', letterSpacing:'-.01em', cursor:'pointer' }} // o logo da barra de navegação, que é um texto estilizado
             onClick={() => setPage('home')}> 
          PRIMUS
        </div>
        <div style={{ display:'flex', gap:0 }}>
          {links.map(l => (
            <div key={l.id}
              onClick={() => { setPage(l.id); setMenuOpen(false); window.scrollTo({top:0,behavior:'smooth'}); }} // quando um link é clicado, ele chama a função setPage pra mudar a pagina, fecha o menu móvel e rola a página para o topo be m suave
              style={{
                padding:'.5rem 1rem', fontSize:'.88rem', fontWeight:500, cursor:'pointer',
                color: currentPage === l.id ? C.primary : C.muted,
                borderBottom: currentPage === l.id ? `2px solid ${C.primary}` : '2px solid transparent',
                transition: 'all .2s',
              }}>
              {l.label}
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setPage('dashboard')}> 
          Abrir App →
        </button>
      </div>
    </nav>
  );
}

/* ── BADGE ── */  
function Badge({ children }) { { /* cria aquelas "etiquetas" ou selos de destaque, recebe um texto (children) */}
  
  return <div className="badge">⬡ {children}</div>; // retorna uma div com a classe badge estilizada nu css
  //  global, junto com um icone de hexagono e o texto
} // aqui acaba o componete :)

/* ── Cartão de destaque ── */
function FeatureCard({ icon, title, desc }) { { /* componente de cartão para mostrar uma funcionalidade, recebe ícone,
                                                                                               título e descrição */}

  const [hov, setHov] = useState(false); // cria um estado para saber se o mouse ta flutuando em cima do cartão

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} // se o mouse entra no cartão marca hov como true, se sai, marca como false
      style={{
        background: C.card, border: `1px solid ${hov ? 'rgba(4,204,106,.35)' : C.border}`,
        borderRadius:14, padding:'2rem', transition:'all .3s',
        transform: hov ? 'translateY(-4px)' : 'none',
        position:'relative', overflow:'hidden',
      }}>
      {hov && <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'linear-gradient(90deg,#04CC6A,#64FFDA)' }}/>} {/*se o mose estiver em cima, cria uma linha brilhante na parte inferior */} 

      <div style={{ width:48, height:48, borderRadius:12, background:'rgba(4,204,106,.12)', border:'1px solid rgba(4,204,106,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', marginBottom:'1rem' }}> 
        {icon}
      </div> {/* cria uma caixa quadrada bonitinha para colocar o icone dentro*/}
      <h3 style={{ marginBottom:'.5rem', fontSize:'1.1rem' }}>{title}</h3> {/* o título da funcionalidade */}
      <p style={{ color:C.muted, fontSize:'.9rem', lineHeight:1.7, marginBottom:'1.2rem' }}>{desc}</p> {/* a descrição da funcionalidade */}
      <span style={{ fontSize:'.85rem', fontWeight:600, color:C.primary, cursor:'pointer' }}>Saber Mais →</span> {/* um link pra saber mais, ele só não faz nada */}
    </div>
  );
}

/* ── estatistica do itens ── */
function StatItem({ val, label, last }) { { /* componente para mostrar estatísticas */}
  return (
    <div style={{ textAlign:'center', padding:'0 2rem', borderRight: last ? 'none' : `1px solid ${C.border}` }}> {/* alinha tudo ao centro e coloca uma 
    borda do lado direito */}
      <div style={{ fontSize:'2.2rem', fontWeight:700, color:C.primary, marginBottom:'.25rem' }}>{val}</div> {/* exibe o valor em número bem grande com a cor principal */}
      <div style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:C.muted }}>{label}</div> {/* mostra o nome da estatística */}
    </div>
  );
}

/* ── CTA BLOCK ── */
function CtaBlock({ title, sub, btnLabel, onBtn }) { // title é o título do bloco, sub é a descrição, btnLabel é o texto do botão e onBtn é a função que será chamada quando o botão for clicado
  return (
    <div style={{ 
      background:'linear-gradient(135deg,#002A52,#001830)',
      border:'1px solid rgba(4,204,106,.2)', borderRadius:20,
      padding:'5rem 4rem', textAlign:'center', position:'relative', overflow:'hidden',
    }}> {/* estilo do bloco CTA */}
      <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(4,204,106,.1),transparent 70%)' }}/> {/* um círculo brilhante no 
      canto superior direito pra ficar um efeito da hora */}
      <h2 style={{ fontSize:'clamp(1.8rem,3vw,2.6rem)', marginBottom:'1rem' }} dangerouslySetInnerHTML={{ __html: title }}/> {/* o título do bloco, usando dangerouslySetInnerHTML pra permitir que o título tenha tags HTML, como <em> */}
      <p style={{ color:C.muted, marginBottom:'2rem', maxWidth:480, margin:'0 auto 2rem' }}>{sub}</p> {/* a descrição do bloco, com uma largura máxima e centralizada */}
      <button className="btn btn-primary" onClick={onBtn}>{btnLabel}</button> {/* botão verde principal */}
    </div>
  );
}

/* Paginas */

/* ── pagina principal  ── */
function HomePage({ setPage }) {
  return (
    <div className="fade-in"> {/* envolve tudo numa div que faz uma animação suave de surgimento usando o CSS global */}
      {/* HERO */} {/* a seção hero é a primeira parte grande e chamativa que o usuário vê ao abrir o site */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:80, // ocupa pelo menos a altura inteira da tela e alinha tudo ao meio
        background:'radial-gradient(ellipse 70% 60% at 60% 40%,rgba(0,42,82,.55),transparent 70%),radial-gradient(ellipse 40% 40% at 90% 10%,rgba(4,204,106,.08),transparent 60%),#0A0F1A' }}> {/* coloca duas luzes de fundo (uma azul e uma verde) para ficar moderno */}
        <div className="container"> {/* usa a classe de container para limitar a largura máxima e deixar centralizado */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'center' }}> {/* divide o espaço em duas colunas( texto na esquerda e imagem/card na direita )*/}
            <div> {/* lado esquerdo do hero, com o texto e os botões */}
              <Badge>Hiper-Inteligência Acadêmica</Badge> {/* uma badge de destaque com um texto chamativo */}
              <h1 style={{ fontSize:'clamp(2.2rem,5vw,3.8rem)', fontWeight:700, lineHeight:1.1, marginBottom:'1.2rem' }}> {/* título gigante e principal da página */}
                Equilibre <em style={{ color:C.primary, fontStyle:'italic' }}>Trabalho</em><br/>e Estudos com IA
              </h1>
              <p style={{ color:C.muted, fontSize:'1.05rem', marginBottom:'2rem', maxWidth:460, lineHeight:1.75 }}>
                O assistente de estudos que cria e ajusta sua rotina automaticamente, para que você possa focar no que realmente importa: aprender.
              </p> {/* descrição do primus */}
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2.5rem' }}> {/* caixinha para segurar os dois botões juntos lado a lado */}
                <button className="btn btn-primary" onClick={() => setPage('dashboard')}>Criar Meu Cronograma Inteligente</button> {/* botão verde para criar o cronograma */}
                <button className="btn btn-outline" onClick={() => setPage('como')}>Ver Demonstração →</button> {/* botão que leva para a página de como funciona */} 
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}> {/* caixa para alinhar as fotos dos perfis e o texto juntos */}
                <div style={{ display:'flex' }}> {/* caixa que agrupa os avatares redondos */}
                  {['GJ','EH','RC','CL'].map((i,idx) => ( // passa por essas iniciais para simular fotos de pessoas que já usam o primus
                    <div key={i} style={{ width:32, height:32, borderRadius:'50%', border:`2px solid ${C.bg}`, background:C.card2, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.62rem', fontWeight:700, marginLeft: idx===0?0:-8 }}>{i}</div> //cria um círculo para cada inicial
                  ))}
                </div>
                <p style={{ fontSize:'.82rem', color:C.muted, margin:0 }}>Junto a <strong style={{ color:C.primary }}>+2.500 estudantes</strong></p> {/* texto mostrando 
                quantas pessoas já utilizam o app
 */}
              </div>
            </div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'1.5rem', position:'relative', overflow:'hidden', animation:'float 4s ease-in-out infinite' }}> {/* inicia a coluna da direita com um cartão que flutua o tempo todo por causa da animação 'float' */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#04CC6A,#64FFDA)' }}/> {/* uma linha brilhante no topo desse cartão flutuante */}
              <div style={{ fontSize:'.7rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:C.muted, marginBottom:'1rem' }}>A Organização que se Adapta a Você</div> {/* um subtítulo pequeno para o cartão */}
              {[ //cria uma lista de pequenos recursos pra mostrar no cartão
                { icon:'📅', title:'Cronograma Inteligente', sub:'Ajustado em tempo real à sua rotina', badge:'IA' },
                { icon:'🎯', title:'Foco Adaptativo', sub:'Bloqueio de distrações contextual', badge:'Ativo' },
                { icon:'📊', title:'Progresso em Tempo Real', sub:'Métricas detalhadas por disciplina', badge:'+18%' },
                { icon:'🔔', title:'Lembretes Inteligentes', sub:'No momento certo, sem interrupções', badge:'Smart' },
              ].map(r => ( // passa por cada item dessa lista de recursos
                <div key={r.title} style={{ display:'flex', alignItems:'center', gap:'.75rem', padding:'.75rem', background:C.card2, borderRadius:8, marginBottom:'.6rem', border:`1px solid ${C.border}` }}> {/* cria uma linha para cada recurso, com um fundo diferente e uma borda */}
                  <div style={{ width:36, height:36, borderRadius:8, background:'rgba(4,204,106,.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', flexShrink:0 }}>{r.icon}</div> {/* uma caixa quadrada para o ícone do recurso */}
                  <div style={{ flex:1 }}> {/* uma caixa que ocupa o espaço restante para o título e subtítulo */}
                    <div style={{ fontSize:'.88rem', fontWeight:600, marginBottom:1 }}>{r.title}</div> {/* o título do recurso */}
                    <div style={{ fontSize:'.75rem', color:C.muted }}>{r.sub}</div> {/* a descrição do recurso com uma cor mais clara */}
                  </div>
                  <div style={{ fontSize:'.65rem', fontWeight:700, padding:'2px 8px', borderRadius:99, background:'rgba(4,204,106,.15)', color:C.primary }}>{r.badge}</div> {/* o selo extra na direita do item, como "IA" ou "+18%" */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Estatisticas */}
      <div style={{ background:C.card, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:'3rem 0' }}> {/* fundo diferente com linhas no topo e fundo para separar bem da página */}
        <div className="container"> 
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}> {/* cria um grid com 4 colunas iguais */}
            <StatItem val="+2.5k" label="Estudantes Ativos"/>
            <StatItem val="10k+" label="Tarefas Concluídas"/>
            <StatItem val="4.9/5" label="Avaliação Média"/>
            <StatItem val="98%" label="Taxa de Foco" last/>
          </div>
        </div>
      </div> 

      {/* Caracteristicas */}
      <section className="section"> {/* seção para mostrar as funcionalidades do app */}
        <div className="container"> 
          <div style={{ textAlign:'center', maxWidth:560, margin:'0 auto 4rem' }}> {/* caixa para centralizar o título e descrição */}
            <h2 style={{ fontSize:'clamp(1.8rem,3vw,2.6rem)', marginBottom:'.75rem' }}>Funcionalidades do <em style={{ color:C.primary }}>Primus</em></h2> {/* título da seção com o nome do app em destaque */}
            <p style={{ color:C.muted }}>A infraestrutura neural para o seu aprendizado, projetada para converter caos em clareza acadêmica.</p> {/* descrição */}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}> {/* um grid com 3 colunas para mostrar os cartões de funcionalidades */}
            <FeatureCard icon="🤖" title="Gerido por IA" desc="Nossos algoritmos analisam sua carga horária e sugerem os melhores momentos para estudar cada matéria, eliminando seu ciclo cansativo."/>
            <FeatureCard icon="🔄" title="Se Adapta à sua Rotina" desc="Aconteceu um imprevisto? O Primus recalcula tudo e te atualiza em segundos, sem gerar frustração ou perda de progresso."/>
            <FeatureCard icon="🎯" title="Foco Total no Aprendizado" desc="Interface minimalista projetada para eliminar distrações com ferramentas integradas de Pomodoro e bloqueio de notificações."/>
          </div>
        </div>
      </section>

      {/* CTA */} {/* bloco de chamada para ação */}
      <section className="section-sm"> {/* seção menor para dar um destaque maior ao bloco de CTA */}
        <div className="container"> 
          <CtaBlock title="Pronto para dominar<br/>sua jornada acadêmica?" sub="Experimente a ferramenta que está mudando a forma como estudantes de alto desempenho organizam suas vidas." btnLabel="Começar Agora Gratuitamente" onBtn={() => setPage('dashboard')}/>
        </div>
      </section> 

      <Footer setPage={setPage}/> {/* o rodapé, que é um componente separado, recebe a função setPage para poder navegar para outras páginas quando os links do rodapé forem clicados */}
    </div>
  );
}

/* ── COMO FUNCIONA ── */
function ComoPage({ setPage }) { {/* página que explica como o app funciona, com um passo a passo visual */}
  const steps = [
    { n:'01', icon:'📥', title:'Captura de Dados', desc:'Envie seus materiais: PDFs, livros, anotações ou vídeos. Nossa IA absorve e categoriza em instantes.' },
    { n:'02', icon:'🧬', title:'Destilação por IA', desc:'O sistema identifica conceitos-chave e cria um cronograma personalizado baseado na ciência da aprendizagem.' },
    { n:'03', icon:'⚡', title:'Prática Ativa', desc:'Estude com flashcards, recursos dinâmicos e testes gerados especificamente para suas dificuldades.' },
    { n:'04', icon:'📊', title:'Maestria & Insights', desc:'Acompanhe seus direitos sobre cada tópico e receba sugestões para revisões mais eficazes.' },
  ];
  return ( 
    <div className="fade-in"> {/* animação de surgimento suave */}
      <section style={{ paddingTop:140, paddingBottom:60 }}> {/* primeiro bloco lá no topo, com bastante margem por causa do menu */}
        <div className="container" style={{ textAlign:'center', maxWidth:680, margin:'0 auto' }}> {/* caixa para centralizar o conteúdo e limitar a largura */}
          <Badge>Fluxo Inteligente</Badge> 
          <h1 style={{ fontSize:'clamp(2.2rem,5vw,3.6rem)', lineHeight:1.1, marginBottom:'1.2rem' }}>A Evolução do seu<br/><em style={{ color:C.primary }}>Fluxo de Aprendizado</em></h1> 
          <p style={{ color:C.muted, fontSize:'1.05rem', marginBottom:'2rem' }}>Nossa arquitetura de aprendizado mapeia sua cognição para criar o caminho mais eficiente entre a curiosidade inicial e o domínio total.</p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}> {/* agrupa botões para ficarem no meio */}
            <button className="btn btn-primary" onClick={() => setPage('dashboard')}>Começar Agora →</button>
            <button className="btn btn-outline">Ver Demonstração</button>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:C.card, borderTop:`1px solid ${C.border}` }}> {/* segundo bloco, com um fundo diferente e uma borda no topo para separar bem da seção anterior */}
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2rem' }}> {/* um grid com 4 colunas */}
            {steps.map(s => ( 
              <div key={s.n} style={{ position:'relative' }}> {/* cartão explicativo para cada passo */}
                <div style={{ fontSize:'3rem', fontWeight:800, color:C.primary, opacity:.1, position:'absolute', top:-20, left:-10 }}>{s.n}</div>
                <div style={{ width:44, height:44, borderRadius:10, background:C.card2, border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', marginBottom:'1.2rem', position:'relative' }}>{s.icon}</div>
                <h3 style={{ fontSize:'1rem', marginBottom:'.5rem' }}>{s.title}</h3>
                <p style={{ fontSize:'.85rem', color:C.muted, lineHeight:1.6 }}>{s.desc}</p>
              </div>
            ))} {/* passa por cada passo do processo para criar um cartão explicativo */}
          </div>
        </div>
      </section>

      <section className="section"> {/* terceiro bloco, com o CTA para criar conta */}
        <div className="container"> 
          <CtaBlock title="Transforme sua produtividade<br/>hoje mesmo." sub="Junte-se a milhares de estudantes que já descobriram o poder da IA Primus." btnLabel="Criar Conta Grátis" onBtn={() => setPage('dashboard')}/> {/* bloco de chamada para ação, com um título, descrição e um botão que leva para a página do dashboard */}
        </div>
      </section>
      <Footer setPage={setPage}/> {/* o rodapé, que é um componente separado, recebe a função setPage */}
    </div>
  );
}

/* ── SOBRE NÓS ── */
function SobrePage({ setPage }) { { /* página que fala da missão do app e tem o depoimento de um especialista pra dar confiança */}
  return (
    <div className="fade-in"> {/* vai aparecer suave */}
      <section className="section" style={{ paddingTop:140 }}> {/* seção com bastante espaço no topo por causa do menu */}
        <div className="container"> 
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}> {/* divide em duas colunas, uma para o texto e outra para o depoimento */}
            <div>
              <Badge>Nossa Missão</Badge> {/* uma badge pra da destaque pra a missão */}
              <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', marginBottom:'1.5rem' }}>Democratizando a <em style={{ color:C.primary }}>Alta Performance</em> Acadêmica</h2>
             <p style={{ color:C.muted, fontSize:'1.05rem', marginBottom:'1.5rem', lineHeight:1.7 }}>O Primus nasceu da frustração de estudantes que se sentiam soterrados por volumes massivos de informação e rotinas inflexíveis.</p>
               <p style={{ color:C.muted, fontSize:'1.05rem', marginBottom:'2rem', lineHeight:1.7 }}>Nossa equipe de engenheiros e neurocientistas uniu forças para criar uma interface que não apenas organiza, mas potencializa a capacidade humana de aprender e reter conhecimento.</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}> {/* uma div para mostrar dois pontos fortes do app lado a lado */}
                <div>
                  <div style={{ color:C.primary, fontWeight:700, fontSize:'1.5rem', marginBottom:'.25rem' }}>100%</div> {/* um valor destacado */}
                  <div style={{ fontSize:'.85rem', color:C.muted }}>Focado no Estudante</div> {/* descrição do valor destacado */}
                </div>
                <div>
                  <div style={{ color:C.primary, fontWeight:700, fontSize:'1.5rem', marginBottom:'.25rem' }}>24/7</div> {/* outro valor destacado */}
                  <div style={{ fontSize:'.85rem', color:C.muted }}>Suporte com IA</div> {/* descrição do valor destacado */}
                </div>
              </div>
            </div>
            <div style={{ background:C.card, borderRadius:20, border:`1px solid ${C.border}`, padding:'2rem', position:'relative' }}> {/* cartão para o depoimento, com um fundo diferente e borda */}
              <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, background:C.primary, borderRadius:'50%', filter:'blur(60px)', opacity:.2 }}/>
              <div style={{ fontSize:'.9rem', fontStyle:'italic', color:C.text, marginBottom:'1.5rem', lineHeight:1.8 }}>"O Primus não é apenas um app de calendário. É como ter um tutor particular que conhece exatamente o que você precisa estudar e quando você está mais produtivo."</div> {/* é o depoimento, com um 
              estilo diferente para destacar, vai dar aquele a mais né  */}
              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}> {/* caixa para alinhar a foto do especialista e o texto */}
                <div style={{ width:48, height:48, borderRadius:'50%', background:C.card2, border:`1px solid ${C.primary}` }}/> {/* aqui seria a foto do especialista, 
                mas como não tem o especialista, é só o círculo com borda mesmo */}
                <div>
                  <div style={{ fontWeight:600, fontSize:'.9rem' }}>Dr. Arnaldo Silva</div> {/* nome TOP do especialista */}
                  <div style={{ fontSize:'.75rem', color:C.muted }}>Especialista em EdTech</div> {/* descrição do
                                             especialista, pra mostrar que ele é confiável e entende do assunto */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/> {/* o rodapé, que é um componente separado, recebe a função setPage para poder navegar para outras páginas quando os links do rodapé forem clicados */}
    </div>
  );
}

/* ── CONTATO ── */
function ContatoPage({ setPage }) { {/* essa função vai gerenciar a página de contato */}
  return (
    <div className="fade-in"> {/* aparece suavi */}
      <section className="section" style={{ paddingTop:140 }}> 
        <div className="container">
          <div style={{ textAlign:'center', maxWidth:600, margin:'0 auto 4rem' }}> {/* centralizar o texto */}
            <Badge>Suporte & Contato</Badge> {/* ficar mais destacado */}
            <h2 style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>Estamos aqui para <em style={{ color:C.primary }}>ajudar</em></h2>
            <p style={{ color:C.muted }}>Tem alguma dúvida ou sugestão? Nossa equipe está pronta para te ouvir.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'3rem' }}> {/* divide em duas colunas, uma para os canais de contato e outra para o formulário */}
            <div>
              <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'2rem', marginBottom:'1.5rem' }}> {/* cartão para os canais de contato, com um fundo diferente e borda */}
                <h3 style={{ fontSize:'1.1rem', marginBottom:'1.5rem' }}>Canais Oficiais</h3>
                {[
                  { i:'📧', t:'E-mail', v:'suporte@primus.ai' },
                  { i:'💬', t:'Chat Vivo', v:'Disponível no App' },
                  { i:'📱', t:'Instagram', v:'@primus.academico' },
                ].map(c => (
                  <div key={c.t} style={{ display:'flex', gap:'1rem', marginBottom:'1.2rem' }}> {/* linha para cada canal de contato, com um ícone, um título e a informação de contato */}
                    <div style={{ fontSize:'1.2rem' }}>{c.i}</div> {/* o ícone do canal de contato */}
                    <div>
                      <div style={{ fontSize:'.75rem', color:C.muted, fontWeight:600 }}>{c.t}</div> {/* o título do canal de contato, como "E-mail" ou "Chat Vivo" */}
                      <div style={{ fontSize:'.9rem' }}>{c.v}</div> {/* a informação de contato */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'2.5rem' }}> {/* cartão para o formulário de contato, com um fundo diferente e borda */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'1.5rem' }}> {/* divide em duas colunas para os campos de nome e e-mail */}
                <div>
                  <label style={{ display:'block', fontSize:'.8rem', color:C.muted, marginBottom:'.5rem' }}>Nome</label> {/* o rótulo do campo de nome */}
                  <input type="text" placeholder="Seu nome" style={{ width:'100%', background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:'.75rem', color:C.text, outline:'none' }}/> {/* o campo pra entrada de nome */}
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'.8rem', color:C.muted, marginBottom:'.5rem' }}>E-mail</label> {/* o rótulo do campo de e-mail */}
                  <input type="email" placeholder="seu@email.com" style={{ width:'100%', background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:'.75rem', color:C.text, outline:'none' }}/> {/* o campo para entrada de e-mail */}
                </div>
              </div>
              <div style={{ marginBottom:'2rem' }}>
                <label style={{ display:'block', fontSize:'.8rem', color:C.muted, marginBottom:'.5rem' }}>Mensagem</label> {/* o rótulo do campo de mensagem */}
                <textarea placeholder="Como podemos ajudar?" rows="5" style={{ width:'100%', background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:'.75rem', color:C.text, outline:'none', resize:'none' }}></textarea> {/* entrdada da  mensagem */}
              </div>
              <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>Enviar Mensagem</button> {/* botão para enviar a mensagem, ele não faz nada porque nois não somos Full-stack e não fizemo backend */}
            </div>
          </div>
        </div>
      </section>
      <Footer setPage={setPage}/> {/* o rodapé a função setPage para poder navegar para outras páginas quando os links do rodapé forem clicados */}
    </div>
  );
}

/* ── o painel (Simulação) ── */
function DashboardPage({ setPage }) { {/* essa função vai funcionar como o painel principal da aplicação */}
  const [activeTab, setActiveTab] = useState('cronograma'); {/* essa constante armazena a aba ativa */}
  const [timer, setTimer] = useState(25 * 60); {/* essa constante armazena o tempo do cronômetro */}
  const [timerRunning, setTimerRunning] = useState(false); {/* essa constante armazena se o cronômetro está rodando ou não */}

  useEffect(() => {
    let interval;
    if (timerRunning && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timer]);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
  };

  const tasks = [
    { subject:'Cálculo II', topic:'Integrais Triplas', progress:65, color:'#04CC6A', due:'Hoje' },
    { subject:'Física III', topic:'Lei de Gauss', progress:30, color:'#64FFDA', due:'Amanhã' },
    { subject:'POO', topic:'Polimorfismo', progress:85, color:'#7C3AED', due:'2 dias' },
  ];

  const schedule = [
    { time:'08:00', subject:'Cálculo II', duration:'1h 30min', color:'#04CC6A' },
    { time:'10:00', subject:'Revisão Física', duration:'45min', color:'#64FFDA' },
    { time:'14:00', subject:'POO — Projeto', duration:'2h', color:'#7C3AED' },
    { time:'17:00', subject:'EDs — Lista', duration:'1h', color:'#F59E0B' },
    { time:'20:00', subject:'Flashcards Gerais', duration:'30min', color:'#EC4899' },
  ];

  const sidebarItems = [
    { icon:'📊', label:'Dashboard',   id:'cronograma' },
    { icon:'📅', label:'Cronograma',  id:'cronograma' },
    { icon:'✅', label:'Tarefas',     id:'tarefas'    },
    { icon:'⏱',  label:'Foco',       id:'foco'       },
    { icon:'📈', label:'Progresso',   id:'progresso'  },
  ];

  return (
    <div style={{ minHeight:'100vh', paddingTop:72, background:C.bg, display:'flex' }}>
      {/* SIDEBAR */}
      <div style={{ width:220, background:C.bg2, borderRight:`1px solid ${C.border}`, padding:'1.5rem 0', position:'fixed', top:72, bottom:0, left:0, overflowY:'auto', zIndex:50 }}>
        <div style={{ padding:'0 1rem', marginBottom:'1.5rem' }}>
          <div style={{ fontSize:'.65rem', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:C.muted, marginBottom:'.75rem' }}>Menu Principal</div>
          {sidebarItems.map(s => (
            <div key={s.label} onClick={() => setActiveTab(s.id)}
              style={{ display:'flex', alignItems:'center', gap:'.75rem', padding:'.7rem .9rem', borderRadius:8, marginBottom:'.25rem', cursor:'pointer', background: activeTab === s.id ? 'rgba(4,204,106,.1)' : 'transparent', color: activeTab === s.id ? C.primary : C.muted, fontWeight: activeTab === s.id ? 600 : 400, fontSize:'.88rem', transition:'all .2s', border: activeTab===s.id ? `1px solid rgba(4,204,106,.2)` : '1px solid transparent' }}>
              <span>{s.icon}</span>{s.label}
            </div>
          ))}
        </div>
        <div style={{ padding:'0 1rem', borderTop:`1px solid ${C.border}`, paddingTop:'1rem', marginTop:'.5rem' }}>
          <div style={{ fontSize:'.65rem', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:C.muted, marginBottom:'.75rem' }}>Configurações</div>
          {['⚙️ Preferências','🔔 Notificações','🚪 Sair do App'].map(i => (
            <div key={i} style={{ padding:'.65rem .9rem', borderRadius:8, fontSize:'.85rem', color:C.muted, cursor:'pointer', marginBottom:'.2rem' }}
              onClick={() => i.includes('Sair') && setPage('home')}>{i}</div>
          ))}
        </div>
      </div>

      {/* o principal */}
      <div style={{ marginLeft:220, flex:1, padding:'2rem', minHeight:'calc(100vh - 72px)' }}> {/* essa div vai  */}
        {/* TOP BAR */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}> 
          <div>
            <h2 style={{ fontSize:'1.5rem', fontWeight:700 }}>Bom dia, Guilherme! 👋</h2>
            <p style={{ color:C.muted, fontSize:'.85rem', margin:0 }}>Você tem 4 matérias para revisar hoje.</p>
          </div>
          <div style={{ display:'flex', gap:'.75rem', alignItems:'center' }}>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:8, padding:'.5rem 1rem', fontSize:'.82rem', color:C.muted }}>
              📅 Seg, 16 Jun 2026
            </div>
            <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(4,204,106,.15)', border:`2px solid ${C.primary}`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'.85rem', color:C.primary }}>G</div>
          </div>
        </div>

        {/* estatisticas  */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'2rem' }}> {/* um grid com 4 colunas para mostrar as estatísticas principais do usuário*/}
          {[
            { icon:'🔥', val:'7 dias', label:'Sequência Atual', color:'#F59E0B' },
            { icon:'✅', val:'3/5', label:'Tarefas Hoje', color:C.primary },
            { icon:'⏱', val:'3h 20min', label:'Tempo de Foco', color:C.tertiary },
            { icon:'📈', val:'+12%', label:'vs. Semana Passada', color:'#7C3AED' },
          ].map(s => (
            <div key={s.label} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:'1.2rem', position:'relative', overflow:'hidden' }}> {/* cartão para cada estatística*/}
               <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:s.color }}/> {/* uma linha colorida no topo do cartão*/}
              <div style={{ fontSize:'1.4rem', marginBottom:'.4rem' }}>{s.icon}</div> {/* o ícone da estatística*/}
                 <div style={{ fontSize:'1.4rem', fontWeight:700, color:s.color, marginBottom:'.2rem' }}>{s.val}</div> {/* o valor da estatística*/}
              <div style={{ fontSize:'.72rem', color:C.muted, fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase' }}>{s.label}</div> {/* a descrição da estatística*/}
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'1.5rem' }}>

          {/* CRONOGRAMA */}
          <div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.5rem', marginBottom:'1.5rem' }}> {/*  essa div representa o contêiner do cronograma */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}> {/* essa div é o cabeçalho do cronograma */}
                <h3 style={{ fontSize:'.95rem' }}>📅 Cronograma de Hoje</h3>
                <span style={{ fontSize:'.72rem', color:C.primary, fontWeight:600, cursor:'pointer' }}>Ver tudo →</span>
              </div>
              {schedule.map(s => ( 
                <div key={s.time} style={{ display:'flex', alignItems:'center', gap:'.75rem', padding:'.7rem', borderRadius:8, marginBottom:'.5rem', background:C.card2, border:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:'.7rem', fontFamily:'monospace', color:C.muted, width:40, flexShrink:0 }}>{s.time}</div>
                    <div style={{ width:3, height:36, borderRadius:2, background:s.color, flexShrink:0 }}/> {/* um ponto colorido no final da linha, com a mesma cor da barra, pra dar um destaque visual pro usuário identificar a matéria mais facilmente, é tipo um código de cores mesmo, pra ficar mais fácil de entender o cronograma de relance, sem precisar ler tudo*/}
                  <div style={{ flex:1 }}> 
                    <div style={{ fontSize:'.88rem', fontWeight:600, marginBottom:1 }}>{s.subject}</div> {/* o nome da matéria */}
                    <div style={{ fontSize:'.72rem', color:C.muted }}>{s.duration}</div> {/* o nome da matéria e a duração, com uma cor mais clara para a duração, pra dar um destaque maior pro nome da matéria,
                     e a linha colorida do lado pra reforçar a identificação visual da matéria, tipo um código de cores mesmo, pra ficar mais fácil de entender o cronograma de relance, sem precisar ler tudo */ }
                  </div>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:s.color }}/> {/* mesma idia dsa linha 507 */}
                </div>  
              ))} {/* passa por cada item do cronograma para criar uma linha no cronograma, mostrando o horário, a matéria, a duração e um código de cores */} 
            </div>

                {/* tarefas, ou comos os br da TI gosta de chamar, as tasks */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.5rem' }}>
               <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}> 
                <h3 style={{ fontSize:'.95rem' }}>✅ Matérias para Estudar</h3>
                <button className="btn btn-primary btn-sm">+ Adicionar</button> {/* botão pra adicionar uma nova tarefa */}
              </div>
{/* um array de tarefas */ }
              {tasks.map(t => ( 
                <div key={t.subject} style={{ background:C.card2, border:`1px solid ${C.border}`, borderRadius:10, padding:'1rem', marginBottom:'.7rem' }}> {/* um cartão para cada tarefa */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'.6rem' }}> {/* a parte de cima do cartão, com nome da matéria e o prazo */ }
                    <div>
                      <div style={{ fontSize:'.9rem', fontWeight:600, marginBottom:2 }}>{t.subject}</div> {/* o nome da matéria, em destaque */ }
                         <div style={{ fontSize:'.75rem', color:C.muted }}>{t.topic}</div> {/* o tópico, com uma cor mais clara */ }
                    </div>
                    <div style={{ fontSize:'.7rem', fontWeight:600, padding:'3px 8px', borderRadius:99, background:'rgba(4,204,106,.1)', color:C.primary }}>{t.due}</div> {/* o prazo, com um selo colorido dependendo se é hoje, amanhã ou 
                    depois, tem ave com aquele negocio de teoria das cores né */ }
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}> {/* a parte de baixo do cartão, com a barra de progresso e a porcentagem */ }
                    <div style={{ flex:1, height:5, background:'rgba(255,255,255,.08)', borderRadius:99, overflow:'hidden' }}> {/* a barra de progresso, que tem um fundo claro e bordas arredondadas, e dentro dela tem a parte preenchida que 
                    tem a cor da matéria e a largura baseada na porcentagem de progresso pra ficar bem visual pro usuario, usuario né  */ }
                      <div style={{ height:'100%', width:`${t.progress}%`, background:t.color, borderRadius:99, transition:'width .5s' }}/> 
                    </div>  {/* essa div vai representar o progresso da tarefa */ }
                    <span style={{ fontSize:'.72rem', color:C.muted, width:32, textAlign:'right' }}>{t.progress}%</span> {/* vai mostrar a porcentagem de progresso */ }
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIMER + IA */}
          <div>
            {/* POMODORO (gerenciamento de tempo)  */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.5rem', marginBottom:'1.5rem', textAlign:'center' }}> {/* essa div é o cartão do timer, com um fundo diferente e borda, e o conteúdo centralizado */}
              <h3 style={{ fontSize:'.95rem', marginBottom:'1.5rem' }}>⏱ Timer de Foco</h3>
              <div style={{ position:'relative', width:140, height:140, margin:'0 auto 1.5rem' }}> {/* essa div é o container do timer, que tem um tamanho fixo e é centralizado, e dentro dela tem os círculos do timer e o número do timer, que ficam posicionados um em cima do outro */ }
                 <svg width="140" height="140" style={{ transform:'rotate(-90deg)' }}> {/* círculo de fundo do timer */}
                  <circle cx="70" cy="70" r="60" fill="none" stroke={C.border} strokeWidth="6"/> {/* círculo de fundo, só uma borda cinza */}
                  <circle cx="70" cy="70" r="60" fill="none" stroke={C.primary} strokeWidth="6" 
                    strokeDasharray={`${2*Math.PI*60}`}
                    strokeDashoffset={`${2*Math.PI*60*(1 - timer/(25*60))}`}
                    strokeLinecap="round" style={{ transition:'stroke-dashoffset .5s' }}/> {/* círculo de progresso, que tem um comprimento total baseado no perímetro do círculo e um deslocamento que diminui conforme o timer avança, criando o efeito de preenchimento do círculo, negocio complicado, googgle salvou muito */}
                </svg>
                 <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:'monospace', fontSize:'1.8rem', fontWeight:700, color:C.text }}>{fmt(timer)}</div> {/* o número do timer no meio do círculo, formatado como minutos e segundos */ }
              </div>
               <div style={{ fontSize:'.8rem', color:C.muted, marginBottom:'1.2rem' }}>Sessão de Pomodoro — 25 min</div> {/* descrição do timer */}
              <div style={{ display:'flex', gap:'.75rem', justifyContent:'center' }}> {/* botões de controle */}
                <button className="btn btn-primary btn-sm" onClick={() => setTimerRunning(r => !r)}>{timerRunning ? '⏸ Pausar' : '▶ Iniciar'}</button>
                <button className="btn btn-outline btn-sm" onClick={() => { setTimer(25*60); setTimerRunning(false); }}>↺ Reset</button>
              </div>
             </div>

                                          {/* sugestoes da IA */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:'1.5rem' }}> {/* essa div contém as sugestões da IA */}
               <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'1.2rem' }}> {/* título com um ícone de robô */}
                <div style={{ width:28, height:28, borderRadius:8, background:'rgba(4,204,106,.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.85rem' }}>🤖</div> {/* ícone de robô, só isso mesmo  */}
                <h3 style={{ fontSize:'.95rem' }}>Sugestões da IA</h3>
              </div>
              {/* array de sugestões */ }
              {[ 
                { text:'Você está indo bem em POO! Tente avançar para Interfaces hoje.', type:'success' },
                { text:'Física III precisa de atenção — recomendo +30 min amanhã.', type:'warn' },
                { text:'Ótimo momento para revisar Cálculo: seu pico de foco é às 14h.', type:'info' },
              ].map((s,i) => ( 
                <div key={i} style={{ background:C.card2, borderRadius:8, padding:'.85rem', marginBottom:'.6rem', borderLeft:`3px solid ${s.type==='success'?C.primary:s.type==='warn'?'#F59E0B':C.tertiary}` }}> {/* div para cada sugestão */}
                  <p style={{ fontSize:'.82rem', color:C.muted, margin:0, lineHeight:1.6 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FOOTER ── */
function Footer({ setPage }) { {/* função que vai renderizar o rodapé */}
  return (
    <footer style={{ background:C.bg2, borderTop:`1px solid ${C.border}`, padding:'3rem 0 1.5rem' }}> {/* estilo do rodapé, com um fundo diferente e uma borda no topo para separar bem da seção anterior */}
      <div className="container"> {/* div pra centralizar o conteúdo */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'.75rem', paddingTop:'1rem', fontSize:'.78rem', color:C.muted }}> {/* estilo do conteúdo do rodapé, com espaçamento entre os itens e uma cor mais clara */}
          <div style={{ fontSize:'1.1rem', fontWeight:700, color:C.primary }}>PRIMUS</div> {/* o nome do app em destaque */}
          <span>© 2024 Primus Hyper-Intelligence. Todos os direitos reservados.</span> {/* aviso de direitos autorais, cuidado rapaz >:( */}
          <div style={{ display:'flex', gap:'1.5rem' }}> {/* links do rodapé, como privacidade, termos e ajuda,e outars paradas  */}
            {['Privacidade','Termos','Ajuda'].map(l => <span key={l} style={{ cursor:'pointer', transition:'color .2s' }}>{l}</span>)} {/* essa parte vai renderizar os links do rodapé */}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══ APP ROOT ══ */
function App() { {/* Componente principal do aplicativo */}
  const [page, setPage] = useState('home'); /* estado para controlar qual página está ativa, começa na 'home' */

  const changePage = (id) => {  {/* Constante para mudar de página */}
    setPage(id); {/* Muda o estado da página ativa */}
    window.scrollTo({ top: 0, behavior: 'smooth' }); /* Rola a página para o topo suavemente toda vez que a página for mudada */
  };

  return ( 
    <>
      <Navbar currentPage={page} setPage={changePage}/> {/* O menu de navegação, que recebe a página atual e a função para mudar de página */}
      {page === 'home'      && <HomePage    setPage={changePage}/>} {/* Renderiza a página de acordo com o estado atual da página, passando a função de mudança de página para cada uma delas */}
      {page === 'como'      && <ComoPage    setPage={changePage}/>}
      {page === 'sobre'     && <SobrePage   setPage={changePage}/>}
      {page === 'contato'   && <ContatoPage setPage={changePage}/>}
      {page === 'dashboard' && <DashboardPage setPage={changePage}/>}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>); {/* mostra o App dentro do elemento com id 'root' no HTML, que é onde toda a aplicação vai aparecer */ }
