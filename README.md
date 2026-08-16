# Habitaut — site institucional

Site estático de página única para a **Habitaut Automações** — casa inteligente ao seu alcance.
Volta Redonda&nbsp;–&nbsp;RJ, atendendo a região Sul-Fluminense desde 2013.

HTML, CSS e JavaScript puros. **Sem build, sem dependências, sem `npm install`.**
Abrir o `index.html` no navegador já mostra o site inteiro.

---

## Continuar noutro computador (MacBook)

Todo o trabalho está no Git. Não há nada preso na sessão do celular.

```bash
git clone https://github.com/allanoliveirarj/promptbrand.git
cd promptbrand
git checkout claude/habituat-website-files-5yqg3a
open index.html          # ou: python3 -m http.server 8080
```

O branch de trabalho é **`claude/habituat-website-files-5yqg3a`** — não é o `main`.

Para servir por HTTP (necessário só se for testar o formulário ou o mapa com mais fidelidade):

```bash
python3 -m http.server 8080     # depois abra http://localhost:8080
```

---

## Estrutura

```
index.html                 página única, todas as seções
assets/css/style.css       estilos, temas de bloco e paleta
assets/js/main.js          menu, animações e formulário
assets/img/logo.png        logo completo (900x224, transparente)
assets/img/logo-mark.png   símbolo isolado, usado como favicon
netlify.toml               configuração de deploy
robots.txt / sitemap.xml   para indexação
```

## Onde mexer em cada coisa

| O que | Onde |
|---|---|
| **Os 3 azuis** | `style.css`, bloco `:root`, primeiras linhas — `--navy`, `--blue`, `--blue-soft` |
| **Fundo de cada seção** | classe no `<section>`: `t-paper` (branco), `t-blue` (azul médio), `t-navy` (azul escuro) |
| **Endereço do mapa** | `index.html`, buscar por `MAPA` — trocar o `q=` nos dois links |
| **Número do WhatsApp** | `main.js`, `CONFIG.whatsapp`, no topo |
| **Fotos** | `index.html`, buscar por `IMAGEM` — 6 blocos comentados |

### Como funcionam os temas de bloco

Cada seção recebe `t-paper`, `t-blue` ou `t-navy`. Essas classes redefinem os mesmos
tokens (`--bg`, `--text`, `--muted`, `--line`, `--accent`, `--btn-bg`…). Os componentes
só leem os tokens — por isso o mesmo card, formulário ou botão funciona nos três fundos
sem CSS duplicado. Para criar uma seção nova, basta escolher a classe.

Contraste conferido: todos os pares de texto passam no WCAG AA nos três temas.

---

## Pendências

### 1. As 6 fotos

Os espaços já existem e mostram um degradê da marca, então a página está apresentável
mesmo sem elas. Para inserir, procure `IMAGEM` no `index.html` e troque o comentário
pelo `<img>` que já está escrito ali ao lado.

Salve os arquivos em `assets/img/` com estes nomes:

| Arquivo | Onde aparece | Proporção |
|---|---|---|
| `hero.webp` | topo da página | 3:2 |
| `ambiente-sala.webp` | Ambientes | 4:3 |
| `ambiente-home-theater.webp` | Ambientes | 4:3 |
| `ambiente-fachada.webp` | Ambientes | 4:3 |
| `empresa.webp` | seção Empresa | 4:3 |
| `showroom.webp` | faixa do showroom | 3:2 |

Otimizar antes de subir (no Mac, com `cwebp` ou qualquer conversor): largura de
1500&nbsp;px basta, e o arquivo deve ficar abaixo de ~250&nbsp;KB.

### 2. Endereço do mapa

O mapa está apontando para a **busca pelo nome** "Habitaut Volta Redonda RJ", o que
funciona enquanto o perfil da empresa estiver no Google Maps. **Confira se o pino cai no
lugar certo** ao abrir o site. Se não cair, troque pelo endereço — instruções no
comentário do próprio `index.html`.

### 3. Conferir telefone e e-mail

Vieram do site antigo e ainda não foram confirmados:

- **(24) 98181-1223** — usado no link do WhatsApp e no `tel:`
- **atendimento@habitaut.com.br**

---

## Publicar no Netlify

O `netlify.toml` já está pronto: publica a pasta raiz, sem comando de build, com cache
e cabeçalhos de segurança configurados.

**Se o projeto já existe no Netlify**, confira no painel:

1. **Site configuration → Build & deploy → Branches**: o *production branch* precisa ser
   `claude/habituat-website-files-5yqg3a` (ou faça o merge para `main` e use `main`).
2. **Build settings**: comando vazio, publish directory `.` — o `netlify.toml` já define
   isso, então o painel pode ficar em branco.
3. Force um deploy em **Deploys → Trigger deploy → Deploy site**.

**Se não existir ainda**: *Add new site → Import an existing project → GitHub →*
`allanoliveirarj/promptbrand`, e escolha o branch acima. Depois disso cada `git push`
gera um deploy automático.

---

## Formulário de contato

Valida os campos e **abre o WhatsApp** com a mensagem já montada — não precisa de
servidor (o site antigo dependia de um `email.php`).

Para receber por e-mail, troque o `form.addEventListener('submit', …)` em `main.js` por:

- **Netlify Forms** — adicione `netlify` e `name="contato"` na tag `<form>` e remova o
  `preventDefault()`. Como o site já vai estar na Netlify, é o caminho mais curto.
- **Formspree** — `<form action="https://formspree.io/f/SEU_ID" method="POST">`.

---

## Notas técnicas

- **Conteúdo**: todo o texto vem do site antigo (`index.html` e `mobindex.html`),
  reorganizado. Nada foi inventado.
- **Tipografia**: Playfair Display nos títulos (acompanha o serifado do logo) e Manrope
  no texto, via Google Fonts.
- **Sem JS o site continua legível** — as animações de entrada só são aplicadas quando o
  JavaScript está ativo (`html.js`), então nada fica invisível se o script falhar.
- **Acessibilidade**: navegação por teclado, `:focus-visible`, link "pular para o
  conteúdo", `aria-expanded` no menu e respeito a `prefers-reduced-motion`.
- **Responsivo**: verificado em 390, 820 e 1440&nbsp;px, sem rolagem horizontal.
- **SEO**: meta description, canonical, Open Graph e JSON-LD `LocalBusiness`.
- **Grafia da marca**: o site usa **Habitaut**, como no logo. O site antigo escrevia
  "HabitAUT" no texto corrido — foi padronizado.
