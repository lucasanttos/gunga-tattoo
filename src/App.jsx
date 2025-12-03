import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Instagram, MapPin, Calendar, ArrowUpRight, 
  Award, Brush, Shield, Image as ImageIcon, Send, Camera,
  Code, MessageCircle, ExternalLink, ChevronRight, Minimize2
} from 'lucide-react';

/**
 * ==============================================================================
 * ÁREA DE EDIÇÃO PRINCIPAL (DADOS DO CLIENTE)
 * ==============================================================================
 */
const DATA = {
  nome: "Gunga Tattoo",
  slogan: "Arte Oriental & Técnica Tebori",
  premios: "36x Premiado",
  whatsapp: "5584991336794", 
  instagram: "gungatattoo",
  cidade: "São Paulo do Potengi - RN",
  estilo: "Oriental • Realismo • Tebori",
};

/**
 * ==============================================================================
 * DADOS DO DESENVOLVEDOR (UiCode.dev)
 * ==============================================================================
 */
const DEV_DATA = {
  nome: "UiCode.dev",
  site: "https://uicode-dev.netlify.app/",
  whatsapp: "5511916474626",
  instagram: "uicode.dev"
};

/**
 * ==============================================================================
 * CONFIGURAÇÕES VISUAIS E TÉCNICAS
 * ==============================================================================
 */

/**
 * FUNÇÃO DE SCROLL PERSONALIZADA (Otimizada para velocidade)
 * Ajustada para ser mais rápida (800ms) e responsiva.
 */
const smoothScrollTo = (e, href, callback) => {
  e.preventDefault();
  if (callback) callback();

  const targetId = href.replace('#', '');
  const element = document.getElementById(targetId);
  if (!element) return;

  const headerOffset = 100; 
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  const startPosition = window.pageYOffset;
  const distance = offsetPosition - startPosition;
  // Duração reduzida para 800ms para remover a sensação de delay
  const duration = 200; 
  let startTime = null;

  // Ease Out Cubic - Mais rápido no início, suave no final, mas sem arrastar
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    window.scrollTo(0, startPosition + (distance * easeOutCubic(progress)));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
};

const SmoothScrollLink = ({ href, children, className, onClick }) => {
  return (
    <a 
      href={href} 
      onClick={(e) => smoothScrollTo(e, href, onClick)} 
      className={className}
    >
      {children}
    </a>
  );
};

const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 }); 

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

/**
 * COMPONENTE: Popup do Desenvolvedor (UiCode.dev)
 * Se esconde após 5 segundos, virando um ícone.
 */
const DevPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 100);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 z-[100] max-w-xs w-full transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="bg-neutral-900/95 backdrop-blur-md border border-neutral-700 shadow-2xl rounded-lg p-4 relative mx-4 md:mx-0">
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-2 right-2 text-neutral-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
        
        <div className="flex gap-3">
          <div className="mt-1">
            <div className="bg-indigo-600/20 p-2 rounded-lg border border-indigo-500/30">
              <Code className="text-indigo-400" size={20} />
            </div>
          </div>
          
          <div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Desenvolvido por</p>
            <h4 className="font-bold text-white text-sm mb-2">UiCode.dev</h4>
            <p className="text-neutral-400 text-xs leading-relaxed mb-3">
              Gostou deste site? Crie uma presença digital profissional para o seu negócio hoje mesmo.
            </p>
            
            <div className="flex flex-col gap-2">
              <a 
                href="https://uicode-dev.netlify.app/" 
                target="_blank" 
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <ExternalLink size={12} /> Ver Portfólio
              </a>
              
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-neutral-500">
                <a href="https://instagram.com/uicode.dev" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <Instagram size={10} /> @uicode.dev
                </a>
                <a href="https://wa.me/5511916474626" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <MessageCircle size={10} /> (11) 91647-4626
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

/**
 * ==============================================================================
 * COMPONENTE PRINCIPAL (APP)
 * ==============================================================================
 */
export default function App() {
  const [activeSection, setActiveSection] = useState('home'); 
  const [scrolled, setScrolled] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const [formData, setFormData] = useState({ name: '', idea: '' }); 
  const [hasFile, setHasFile] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'studio', 'portfolio', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -300 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    let msg = `Olá! Me chamo *${formData.name}*.\n`;
    msg += `Vim através do site e gostaria de solicitar um orçamento para uma nova arte.\n\n`; 
    msg += `*Minha Ideia:* ${formData.idea}`;
    if (hasFile) msg += `\n\n📷 *Tenho uma referência visual para enviar!*`;
    window.open(`https://wa.me/${DATA.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-[#FAFAFA] text-[#111] font-sans overflow-x-hidden selection:bg-red-600 selection:text-white pb-12">
      
      {/* --- NAVBAR --- */}
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <nav className={`
          relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ease-out
          ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-xl shadow-black/5 w-full max-w-5xl border border-white/50' : 'bg-transparent w-full max-w-7xl'}
        `}>
          
          <SmoothScrollLink href="#home" className="text-xl font-serif font-black tracking-tighter z-10 flex items-center gap-2 cursor-pointer">
            GUNGA<span className="w-2 h-2 rounded-full bg-red-600"></span>
          </SmoothScrollLink>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center bg-gray-100/50 p-1 rounded-full backdrop-blur-sm border border-white/50">
            {[
              { id: 'home', label: 'Início' },
              { id: 'studio', label: 'O Studio' },
              { id: 'portfolio', label: 'Galeria' },
              { id: 'contact', label: 'Contato' }
            ].map((item) => (
              <SmoothScrollLink
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                  activeSection === item.id 
                  ? 'text-white bg-black shadow-lg' 
                  : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.label}
              </SmoothScrollLink>
            ))}
          </div>

          <button 
            className="md:hidden z-10 p-2 bg-black text-white rounded-full active:scale-90 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* MENU MOBILE */}
      <div className={`fixed inset-0 z-40 bg-[#FAFAFA] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
        <div className="space-y-8 text-center">
          {[
            { id: 'home', label: 'Início' },
            { id: 'studio', label: 'O Studio' },
            { id: 'portfolio', label: 'Galeria' },
            { id: 'contact', label: 'Contato' }
          ].map((item) => (
            <div key={item.id} className="overflow-hidden">
              <SmoothScrollLink 
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-5xl font-serif font-bold uppercase tracking-tighter hover:text-red-600 transition-colors cursor-pointer"
              >
                {item.label}
              </SmoothScrollLink>
            </div>
          ))}
        </div>
      </div>

      {/* --- SEÇÃO HERO --- */}
      <section id="home" className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container max-w-6xl mx-auto z-10">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 border-b border-red-600 pb-1">
                Desde 2016 
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                {DATA.cidade}
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h1 className="text-6xl md:text-[9rem] leading-[0.9] font-serif font-medium text-[#111] mb-12 tracking-tight">
              A Arte do <br />
              <span className="italic font-light text-gray-400">Eterno.</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
                <img 
                  src="gt4.jpeg" 
                  alt="Hero Tattoo"
                  className="w-full h-[500px] object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-6 py-3 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase">Agenda Aberta</span>
                </div>
              </div>

              <div className="flex flex-col justify-between h-full py-6">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600">
                  Um estúdio premiado focado na excelência do traço e na profundidade do significado. Especialistas em <strong className="text-black font-serif">Tebori</strong> e <strong className="text-black font-serif">Oriental</strong>.
                </p>
                
                <div className="mt-12 flex gap-4">
                  <SmoothScrollLink href="#contact" className="group relative px-8 py-4 bg-[#111] text-white rounded-full overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 w-full h-full bg-red-600 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
                    <span className="relative z-10 flex items-center gap-2 font-medium">
                      Agendar Sessão <ArrowUpRight size={18} />
                    </span>
                  </SmoothScrollLink>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- SEÇÃO O STUDIO --- */}
      <section id="studio" className="py-32 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="flex justify-between items-end mb-20 border-b border-gray-100 pb-8">
              <h2 className="text-4xl md:text-6xl font-serif">O Processo</h2>
              <div className="hidden md:block text-right">
                <p className="text-sm text-gray-400 uppercase tracking-widest">Metodologia</p>
                <p className="text-xl font-medium">{DATA.premios}</p>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Award className="w-8 h-8" />, title: "36x Premiado", desc: "Reconhecimento internacional em convenções de arte." },
              { icon: <Brush className="w-8 h-8" />, title: "Técnica Tebori", desc: "A tradicional arte japonesa feita à mão, sem máquinas." },
              { icon: <Shield className="w-8 h-8" />, title: "Biossegurança", desc: "Ambiente estéril seguindo rigorosos padrões ANVISA." }
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className="group p-8 border border-gray-100 hover:border-black transition-colors duration-500 rounded-xl bg-[#FAFAFA] hover:bg-white h-full">
                  <div className="mb-6 text-gray-400 group-hover:text-red-600 transition-colors">{item.icon}</div>
                  <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEÇÃO GALERIA --- */}
      <section id="portfolio" className="py-32 px-4 bg-[#111] text-[#FAFAFA]">
        <div className="container max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-8xl font-serif mb-6">Masterpieces</h2>
              <p className="text-gray-400 max-w-xl mx-auto font-light">
                Cada linha conta uma história. Confira nossa seleção curada de trabalhos recentes.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "/gt1.webp",
              "/gt2.webp", 
              "/gt3.jpeg",
              "/gt5.jpeg",
              "/gt6.webp",
              "/gt7.webp"
            ].map((caminhoDaFoto, index) => (
              <RevealOnScroll key={index} delay={index * 50}>
                <a 
                  href={`https://instagram.com/${DATA.instagram}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`relative group overflow-hidden rounded-lg cursor-pointer block ${index === 1 ? 'md:row-span-2 h-full' : 'aspect-[4/5]'}`}
                >
                  <img 
                    src={caminhoDaFoto} 
                    alt="Trabalho Gunga Tattoo"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  {/* Overlay com botão de detalhes */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors flex items-center gap-2">
                      <Instagram size={14} /> Ver no Instagram
                    </button>
                  </div>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEÇÃO CONTATO --- */}
      <section id="contact" className="min-h-screen flex items-center py-20 px-4 bg-[#FAFAFA]">
        <div className="container max-w-6xl mx-auto">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-gray-200/50">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
              
              <div className="space-y-12">
                <RevealOnScroll>
                  <h2 className="text-5xl font-serif leading-tight">
                    Pronto para eternizar sua ideia?
                  </h2>
                  <p className="text-gray-500 mt-6">
                    Preencha o formulário para iniciar uma conversa direta no WhatsApp. Sem spam, apenas arte.
                  </p>
                </RevealOnScroll>

                <RevealOnScroll delay={100}>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-gray-400">Localização</p>
                        <p className="font-medium">{DATA.cidade}</p>
                      </div>
                    </div>

                    <a href={`https://instagram.com/${DATA.instagram}`} target="_blank" className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Instagram size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-gray-400">Siga-nos</p>
                        <p className="font-medium">@{DATA.instagram}</p>
                      </div>
                    </a>
                  </div>
                </RevealOnScroll>
              </div>

              <RevealOnScroll delay={200}>
                <form onSubmit={handleWhatsApp} className="space-y-8">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Nome</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Seu nome completo"
                      className="w-full bg-transparent border-b border-gray-200 py-4 text-xl focus:border-black focus:outline-none transition-colors"
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Sua Ideia</label>
                    
                    <textarea 
                      rows="2"
                      required
                      placeholder="Conte sobre o desenho, local do corpo..."
                      className="w-full bg-transparent border-b border-gray-200 py-4 text-xl focus:border-black focus:outline-none transition-colors resize-none"
                      onChange={e => setFormData({...formData, idea: e.target.value})}
                    />
                  </div>

                  <div>
                    <input 
                      type="file" 
                      id="file" 
                      className="hidden" 
                      onChange={e => setHasFile(e.target.files.length > 0)}
                    />
                    <label htmlFor="file" className={`
                      flex items-center gap-3 py-4 cursor-pointer transition-colors
                      ${hasFile ? 'text-green-600' : 'text-gray-400 hover:text-black'}
                    `}>
                      {hasFile ? <Camera size={20} /> : <ImageIcon size={20} />}
                      <span className="font-medium">
                        {hasFile ? 'Imagem selecionada' : 'Adicionar referência (opcional)'}
                      </span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#111] text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-red-600 transition-colors shadow-xl flex items-center justify-center gap-3 group"
                  >
                    Iniciar Conversa <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </RevealOnScroll>

            </div>
          </div>
        </div>
      </section>

      {/* --- RODAPÉ (FOOTER) --- */}
      <footer className="bg-white py-12 text-center border-t border-gray-100">
        <h2 className="text-4xl font-serif font-black mb-6">GUNGA</h2>
        <div className="flex justify-center gap-6 mb-8 text-sm text-gray-500 uppercase tracking-widest">
          <SmoothScrollLink href="#home" className="hover:text-red-600">Início</SmoothScrollLink>
          <SmoothScrollLink href="#portfolio" className="hover:text-red-600">Galeria</SmoothScrollLink>
          <SmoothScrollLink href="#contact" className="hover:text-red-600">Contato</SmoothScrollLink>
        </div>
        <p className="text-gray-400 text-xs flex items-center justify-center gap-1">
          Desenvolvido com precisão por 
          <a href={DEV_DATA.site} target="_blank" rel="noopener noreferrer" className="text-black font-bold hover:text-red-600 flex items-center gap-1">
            UiCode.dev <ExternalLink size={10} />
          </a>
        </p>
      </footer>

      {/* POPUP DO DESENVOLVEDOR */}
      <DevPopup />

    </div>
  );
}