# Habitaut — site institucional

Site estático de página única para a **Habitaut**, automação residencial e casa inteligente
([@habitaut_vr](https://instagram.com/habitaut_vr)).

HTML, CSS e JavaScript puros — sem build, sem dependências, sem framework.
Basta abrir o `index.html` ou subir a pasta em qualquer hospedagem.

```
index.html                 página única (todas as seções)
assets/css/style.css       estilos e design tokens
assets/js/main.js          menu, animações e formulário  <- CONFIGURE O WHATSAPP AQUI
assets/img/logo-mark.svg   símbolo da marca (vetor)
assets/img/favicon.svg     ícone da aba
```

---

## ⚠️ Antes de publicar

O conteúdo descritivo já está escrito, mas **os dados concretos do negócio estão como
`[PREENCHER]`** — eles aparecem destacados em dourado no site justamente para não passarem
despercebidos.

Para encontrar todos:

```bash
grep -rn "PREENCHER\|TODO" index.html assets/
```

### Lista do que falta

| Onde | O que preencher |
|---|---|
| `assets/js/main.js` → `CONFIG.whatsapp` | **Número do WhatsApp** com país e DDD, só dígitos (ex.: `5524999998888`). Sem isso o formulário e o botão flutuante não funcionam. |
| `index.html` — seção Hero | Projetos entregues, anos de experiência, região atendida |
| `index.html` — FAQ | Regiões atendidas, garantia/manutenção, faixa de investimento (opcional) |
| `index.html` — Contato | Telefone, e-mail, cidade/região |
| `index.html` — Rodapé | CNPJ / razão social (opcional) |
| `index.html` — `<head>` | `og:url` e `og:image` depois de publicar |
| `index.html` — seção Projetos | Fotos reais dos ambientes |

Quando terminar, apague este bloco de `assets/css/style.css` para remover as caixas douradas:

```css
[data-todo] { … }
```

---

## Fotos dos projetos

A seção **Projetos** usa placeholders (`<div class="shot">`). Para cada foto real:

1. Salve em `assets/img/projetos/` — JPG ou WebP, proporção 4:3, ~1200×900, otimizado.
2. Troque o bloco:

```html
<!-- de -->
<div class="shot shot-1" role="img" aria-label="Foto do projeto a inserir"><span>foto do projeto</span></div>

<!-- para -->
<img src="assets/img/projetos/sala-integrada.webp"
     alt="Sala integrada com iluminação em cena noturna"
     loading="lazy" width="1200" height="900">
```

O CSS já trata `img` e `.shot` com o mesmo enquadramento — o layout não muda.

---

## Formulário de contato

Por padrão o formulário **valida os campos e abre o WhatsApp** com a mensagem já montada.
Não precisa de servidor nem de backend.

Se preferir receber por e-mail, troque o `form.addEventListener('submit', …)` em
`assets/js/main.js` por um serviço de formulário estático:

- **Formspree** — troque a tag por `<form action="https://formspree.io/f/SEU_ID" method="POST">` e remova o `preventDefault()`.
- **Netlify Forms** — adicione `netlify` e `name="contato"` na tag `<form>` (funciona só na Netlify).

---

## Rodar localmente

Abrir o `index.html` no navegador já funciona. Para servir via HTTP:

```bash
npx http-server . -p 8080
# ou
python3 -m http.server 8080
```

## Publicar

- **GitHub Pages** — Settings → Pages → Branch `main` / pasta `/root`.
- **Netlify / Vercel** — arraste a pasta ou conecte o repositório. Sem comando de build; diretório de publicação `.`.

---

## Notas técnicas

- **Logo**: o símbolo foi **redesenhado em SVG** a partir das imagens do logo enviadas, porque
  os arquivos originais não puderam ser acessados nesta sessão. É uma reconstrução fiel, mas se
  você tiver o vetor original, substitua `assets/img/logo-mark.svg` e os SVGs inline no
  `index.html` (header e rodapé) — assim o traço fica idêntico ao da marca.
- **Fontes**: Playfair Display (títulos) e Inter (texto), via Google Fonts.
- **Sem JS o site continua legível** — as animações de entrada só são aplicadas quando o
  JavaScript está ativo (`html.js`), então nada fica invisível se o script falhar.
- **Acessibilidade**: navegação por teclado, `:focus-visible`, link "pular para o conteúdo",
  `aria-expanded` no menu e respeito a `prefers-reduced-motion`.
- **Responsivo**: testado em 390 px e 1440 px, sem rolagem horizontal.
- **Paleta**: preto e branco da marca + dourado quente (`--gold: #c8a464`) como acento.
  Todos os tokens ficam no `:root` do `style.css`.
