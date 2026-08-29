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

- **Paleta:** azul-profundo `#04182B` / `#052134`, verde-água `#2FD9BE` e `#5DE7D2`,
  azul-oceano `#0E6E75` — referência à Costa Verde.
- **Tipografia:** Montserrat (400 / 600 / 700 / 800 / 900).
- **Símbolo:** círculo com linha de batimento cardíaco que se resolve em onda —
  medicina + mar.
- ⚠️ **O logo é um letreiro tipográfico montado aqui**, porque o arquivo oficial do
  Angra Health não estava disponível. Se houver o logo oficial (SVG ou PNG com fundo
  transparente), é só substituir o bloco `.brand` em `src/design.html`.
- ⚠️ Conferir o texto **"III Simpósio de Medicina e Saúde da Costa Verde"** antes de
  imprimir.

## Regerar / editar

```bash
cd angra-health/src
node render.mjs "$(pwd)"        # gera PNG + PDF em ../out
```

Requer Node com Playwright e a fonte Montserrat instalada no sistema.
Todo o texto, as cores e os tamanhos estão em `src/design.html` — um arquivo só,
sem build. Para trocar o link do QR, regenere `qr.svg`:

```bash
python3 -c "import segno; segno.make('NOVA_URL', error='h').save('qr.svg', scale=10, dark='#0B1F33')"
```
