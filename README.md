# Habitaut — site institucional

Site estático de página única para a **Habitaut Automações** — casa inteligente ao seu alcance.
Volta Redonda&nbsp;–&nbsp;RJ, atendendo toda a região Sul-Fluminense desde 2013.

HTML, CSS e JavaScript puros — sem build, sem dependências, sem framework.
Basta abrir o `index.html` ou subir a pasta em qualquer hospedagem.

```
index.html                 página única (todas as seções)
assets/css/style.css       estilos e design tokens
assets/js/main.js          menu, animações e formulário
assets/img/logo.png        logo completo (900x224, fundo transparente)
assets/img/logo-mark.png   símbolo isolado, usado como favicon
```

## Conteúdo

Todo o texto vem do site anterior (`index.html` e `mobindex.html` da versão antiga),
reorganizado nas seções:

| Seção | Origem |
|---|---|
| Hero | Slogan "O futuro da tecnologia agora em suas mãos" + "Luxo, conforto e segurança" |
| Soluções | Os 4 pilares: Domótica, CFTV, Portaria e Acessibilidade |
| Produtos | Toda a árvore de produtos do menu antigo, reagrupada em 4 blocos legíveis |
| Empresa | História, Missão, Visão e Valores, Política de Qualidade |
| Showroom | Convite para visita |
| Dúvidas | Perguntas frequentes, respondidas a partir das informações da empresa |
| Contato | Telefone, e-mail, localização e formulário |

**Dados de contato usados no site** (conferir se seguem atuais):

- Telefone / WhatsApp: **(24) 98181-1223**
- E-mail: **atendimento@habitaut.com.br**
- Localização: Volta Redonda&nbsp;–&nbsp;RJ, atendendo a região Sul-Fluminense
- Instagram: [@habitaut_vr](https://instagram.com/habitaut_vr)

O número do WhatsApp fica em `CONFIG.whatsapp`, no topo do `assets/js/main.js`.

## Formulário de contato

O formulário valida os campos e **abre o WhatsApp** com a mensagem já montada —
não precisa de servidor nem de PHP (o site antigo dependia de um `email.php`).

Se quiser voltar a receber por e-mail, troque o `form.addEventListener('submit', …)`
em `assets/js/main.js` por um serviço de formulário estático:

- **Formspree** — `<form action="https://formspree.io/f/SEU_ID" method="POST">` e remova o `preventDefault()`.
- **Netlify Forms** — adicione `netlify` e `name="contato"` na tag `<form>`.

## Rodar localmente

```bash
npx http-server . -p 8080
# ou
python3 -m http.server 8080
```

## Publicar

- **GitHub Pages** — Settings → Pages → Branch `main` / pasta `/root`.
- **Netlify / Vercel** — arraste a pasta ou conecte o repositório. Sem comando de build; diretório de publicação `.`.

Ao publicar em `habitaut.com.br`, as tags `og:url`, `og:image` e `canonical` do `index.html`
já apontam para esse domínio.

## O que ainda pode entrar

- **Fotos de projetos** — o site não tem galeria ainda; havia uma imagem única (`PrdPortao.jpg`)
  repetida no site antigo. Com fotos reais dá para montar uma seção de projetos.
- **Logo em vetor** — o `logo.png` foi recortado e redimensionado a partir do PNG enviado
  (original 8000×2708). Se existir o arquivo vetorial (SVG/AI/EPS), vale trocar: fica nítido em
  qualquer tamanho e pesa menos.
- **Endereço completo do showroom**, se a intenção for receber visitas espontâneas.

## Notas técnicas

- **Fontes**: Playfair Display (títulos) e Inter (texto), via Google Fonts.
- **Sem JS o site continua legível** — as animações de entrada só são aplicadas quando o
  JavaScript está ativo (`html.js`), então nada fica invisível se o script falhar.
- **Acessibilidade**: navegação por teclado, `:focus-visible`, link "pular para o conteúdo",
  `aria-expanded` no menu e respeito a `prefers-reduced-motion`.
- **Responsivo**: verificado em 390, 820 e 1440 px, sem rolagem horizontal.
- **SEO**: meta description, keywords, canonical, Open Graph e JSON-LD `LocalBusiness`.
- **Grafia da marca**: o site usa **Habitaut**, como no logo. O site antigo escrevia "HabitAUT"
  no texto corrido — foi padronizado para bater com a marca.
- **Paleta**: preto e branco da marca + dourado quente (`--gold: #c8a464`) como acento.
  Todos os tokens ficam no `:root` do `style.css`.
