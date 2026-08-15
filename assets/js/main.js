/* ==========================================================================
   Habitaut — scripts do site
   ========================================================================== */

/* --------------------------------------------------------------------------
   CONFIGURAÇÃO — preencha antes de publicar
   -------------------------------------------------------------------------- */
const CONFIG = {
  // Número do WhatsApp com código do país e DDD, só dígitos.
  // Ex.: (24) 99999-8888 em Volta Redonda -> '5524999998888'
  whatsapp: '',

  // Mensagem inicial ao clicar no botão flutuante do WhatsApp.
  saudacao: 'Olá! Vim pelo site e gostaria de saber mais sobre automação residencial.',
};

/* --------------------------------------------------------------------------
   Menu mobile
   -------------------------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  const setNav = (open) => {
    navMenu.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  navToggle.addEventListener('click', () => {
    setNav(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNav(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNav(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setNav(false);
  });
}

/* --------------------------------------------------------------------------
   Header com borda ao rolar
   -------------------------------------------------------------------------- */
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   Animação de entrada das seções
   -------------------------------------------------------------------------- */
const revealables = document.querySelectorAll('.reveal');

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px' });

  revealables.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
    observer.observe(el);
  });
} else {
  revealables.forEach((el) => el.classList.add('is-visible'));
}

/* --------------------------------------------------------------------------
   Ano no rodapé
   -------------------------------------------------------------------------- */
const anoEl = document.getElementById('ano');
if (anoEl) anoEl.textContent = String(new Date().getFullYear());

/* --------------------------------------------------------------------------
   Botão flutuante do WhatsApp
   -------------------------------------------------------------------------- */
const waFloat = document.getElementById('waFloat');
if (waFloat && CONFIG.whatsapp) {
  waFloat.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.saudacao)}`;
  waFloat.target = '_blank';
  waFloat.rel = 'noopener';
}

/* --------------------------------------------------------------------------
   Formulário de contato -> WhatsApp
   Para enviar por e-mail em vez do WhatsApp, veja o README.
   -------------------------------------------------------------------------- */
const form = document.getElementById('contatoForm');

if (form) {
  const setError = (name, message) => {
    const input = form.elements[name];
    const slot = form.querySelector(`[data-error-for="${name}"]`);
    if (input) input.closest('.field')?.classList.toggle('has-error', Boolean(message));
    if (slot) slot.textContent = message || '';
    return !message;
  };

  const validate = () => {
    const { nome, telefone, email, estagio } = form.elements;
    const digits = telefone.value.replace(/\D/g, '');

    const results = [
      setError('nome', nome.value.trim().length < 2 ? 'Informe seu nome.' : ''),
      setError('telefone', digits.length < 10 ? 'Informe um WhatsApp com DDD.' : ''),
      setError('email', email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
        ? 'E-mail inválido.' : ''),
      setError('estagio', !estagio.value ? 'Selecione o estágio da obra.' : ''),
    ];

    return results.every(Boolean);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) {
      form.querySelector('.has-error input, .has-error select')?.focus();
      return;
    }

    if (!CONFIG.whatsapp) {
      window.alert(
        'O número de WhatsApp ainda não foi configurado.\n\n' +
        'Preencha CONFIG.whatsapp em assets/js/main.js antes de publicar o site.'
      );
      return;
    }

    const { nome, telefone, email, estagio, mensagem } = form.elements;
    const linhas = [
      'Olá! Vim pelo site da Habitaut.',
      '',
      `Nome: ${nome.value.trim()}`,
      `WhatsApp: ${telefone.value.trim()}`,
      email.value.trim() ? `E-mail: ${email.value.trim()}` : null,
      `Estágio da obra: ${estagio.value}`,
      mensagem.value.trim() ? `\nO que quero automatizar:\n${mensagem.value.trim()}` : null,
    ].filter(Boolean);

    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(linhas.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  });

  form.querySelectorAll('input, select').forEach((el) => {
    el.addEventListener('input', () => {
      if (el.closest('.field')?.classList.contains('has-error')) setError(el.name, '');
    });
  });
}
