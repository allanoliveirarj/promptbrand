# Angra Health 2026 — painel de palco com QR Code da galeria

Peça para exibir **no palco** do evento, chamando o público a escanear o QR Code
e acessar a galeria de fotos do **Casal Pires**.

**Link codificado no QR:** `https://casalpires.smugmug.com/ANGRA-HEALT-2026`
(gravado exatamente como recebido — inclusive o `HEALT` sem o segundo `H`, que é o
caminho real da galeria).

## Arquivos

| Arquivo | Formato | Uso |
|---|---|---|
| `out/angra-health-qr-16x9.png` | 3840 × 2160 px | telão / LED do palco, projeção, slide de intervalo |
| `out/angra-health-qr-9x16.png` | 2160 × 3840 px | totem, banner vertical, lateral de palco, stories |
| `out/angra-health-qr-1x1.png`  | 3000 × 3000 px | placa quadrada, painel de apoio, post |
| `out/*.pdf` | vetorial | **enviar para a gráfica** — escala para qualquer tamanho sem perda |
| `out/angra-health-qrcode.svg` | vetorial | QR isolado, para usar em outras peças |

Para impressão grande use sempre o **PDF** (texto e QR são vetor, não pixel).
Os PNGs são para telas.

## Tamanho do QR x distância de leitura

Regra prática: um celular lê o QR a até **~10× a largura do código**.
O QR ocupa cerca de **1/3 da largura** da peça 16:9 e **60%** da vertical.

| Distância do público | Largura mínima do QR | Peça impressa sugerida |
|---|---|---|
| 5 m  | 50 cm | painel 1:1 com ~85 cm |
| 10 m | 1,0 m | totem 9:16 com ~1,7 m de altura |
| 15 m | 1,5 m | telão 16:9 (o QR já sai grande na projeção) |

O código foi gerado com correção de erro **nível H (30%)**, o mais tolerante —
aguenta reflexo, sujeira e ângulo. Decodificação conferida nos três arquivos,
inclusive em versões reduzidas (simulando leitura de longe).

## Identidade

- **Logo oficial** (`src/logo-angra-health.png`, PNG com fundo transparente e
  lettering branco) aplicado nas três peças, sem redesenho.
- **Paleta tirada do próprio logo:** losango claro `#7BC8D5`, médio `#3CADB6`,
  escuro `#00828B`; fundo `#03212A` / `#05303B`.
- **Motivo de fundo:** malha de losangos derivada do símbolo, em opacidade baixa e
  com esmaecimento diagonal — reforça a marca sem competir com o QR.
- **Tipografia de apoio:** Montserrat (400 / 600 / 700 / 800 / 900), que acompanha
  bem o lettering do logo.
- ⚠️ Conferir o texto **"III Simpósio de Medicina e Saúde da Costa Verde"** antes de
  imprimir.

Se aparecer uma versão vetorial do logo (SVG / AI / EPS), vale trocar o PNG por ela
antes de mandar para a gráfica: o PNG tem 1665 px de largura e, em impressão muito
grande, é o único elemento da peça que não é vetor.

## Regerar / editar

```bash
cd angra-health/src
node render.mjs "$(pwd)"        # gera PNG + PDF em ../out
```

Requer Node com Playwright e a fonte Montserrat instalada no sistema.
Todo o texto, as cores e os tamanhos estão em `src/design.html` — um arquivo só
(as cores da marca ficam no bloco `.art{--tl/--tm/--td}`),
sem build. Para trocar o link do QR, regenere `qr.svg`:

```bash
python3 -c "import segno; segno.make('NOVA_URL', error='h').save('qr.svg', scale=10, dark='#0B1F33')"
```
