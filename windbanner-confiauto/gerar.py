"""Gera o wind banner CONFIAUTO (1,90 m) nas versões vermelha e azul.

Saídas (pasta atual):
  - windbanner_<cor>_60x190cm.svg / .pdf  -> arquivo de impressão 1:1 (com 1 cm de sangria)
  - windbanner_<cor>_preview.png          -> visualização no formato "pena"
  - windbanner_mockup_duas_versoes.png    -> as duas versões lado a lado
"""
import re
import cairosvg

# ---------- medidas (mm) ----------
W, H = 600, 1900          # área útil do banner: 60 x 190 cm
BLEED = 10                # sangria de 1 cm em cada lado
SLEEVE = 40               # bainha do mastro (lado esquerdo)
MARGIN = 30               # respiro de segurança

CORES = {
    "vermelho": ("#e20016", "#9e0000"),   # degradê primário da marca
    "azul": ("#356ab8", "#0f367b"),       # degradê secundário da marca
}

# ---------- logo (vertical completa, letra branca) ----------
raw = open("logo_vertical_completa_letrabranca.svg", encoding="utf-8").read()
fills = dict(re.findall(r"\.(cls-\d)\s*\{\s*fill:\s*(#[0-9a-fA-F]+);", raw))
body = raw.split("</defs>", 1)[1].rsplit("</svg>", 1)[0]
body = re.sub(r'class="(cls-\d)"', lambda m: f'fill="{fills[m.group(1)]}"', body)
LW, LH = 422.466, 195.1041

# logo girado 90° (leitura de baixo para cima), ocupando a largura útil
area_x0, area_x1 = SLEEVE + MARGIN, W - MARGIN
scale = (area_x1 - area_x0) / LH
cx, cy = (area_x0 + area_x1) / 2, 980
logo = (f'<g transform="translate({cx},{cy}) rotate(-90) scale({scale:.4f}) '
        f'translate({-LW / 2},{-LH / 2})">{body}</g>')

# formato "pena" (só para visualização; a gráfica aplica a faca do modelo dela)
PENA = f"M0,{H} L0,170 C0,60 90,0 230,0 C420,0 {W},110 {W},300 L{W},1780 Z"


def fundo(c1, c2):
    return (f'<defs><linearGradient id="g" x1="0" y1="0" x2="0.35" y2="1">'
            f'<stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/>'
            f'</linearGradient></defs>')


def arquivo_impressao(nome, c1, c2):
    tw, th = W + 2 * BLEED, H + 2 * BLEED
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{tw}mm" height="{th}mm" '
           f'viewBox="{-BLEED} {-BLEED} {tw} {th}">{fundo(c1, c2)}'
           f'<rect x="{-BLEED}" y="{-BLEED}" width="{tw}" height="{th}" fill="url(#g)"/>'
           f'{logo}</svg>')
    base = f"windbanner_{nome}_60x190cm"
    open(base + ".svg", "w", encoding="utf-8").write(svg)
    cairosvg.svg2pdf(bytestring=svg.encode(), write_to=base + ".pdf")


def preview(nome, c1, c2):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
           f'viewBox="0 0 {W} {H}">{fundo(c1, c2)}'
           f'<clipPath id="c"><path d="{PENA}"/></clipPath>'
           f'<g clip-path="url(#c)"><rect width="{W}" height="{H}" fill="url(#g)"/>{logo}'
           f'<rect width="{SLEEVE}" height="{H}" fill="#000" opacity=".18"/></g></svg>')
    return svg


def mockup():
    gap, pad, pole = 260, 160, 14
    tw = pad * 2 + W * 2 + gap
    th = H + 520
    partes = []
    for i, (nome, (c1, c2)) in enumerate(CORES.items()):
        x = pad + i * (W + gap)
        inner = preview(nome, c1, c2).split(">", 1)[1].rsplit("</svg>", 1)[0]
        inner = inner.replace('id="g"', f'id="g{i}"').replace("url(#g)", f"url(#g{i})")
        inner = inner.replace('id="c"', f'id="c{i}"').replace("url(#c)", f"url(#c{i})")
        partes.append(
            f'<rect x="{x - pole}" y="120" width="{pole}" height="{H + 300}" rx="7" fill="#9aa0a6"/>'
            f'<ellipse cx="{x - pole / 2}" cy="{H + 430}" rx="150" ry="26" fill="#c9ccd1"/>'
            f'<g transform="translate({x},140)">{inner}</g>'
            f'<text x="{x + W / 2}" y="{H + 500}" font-family="Helvetica, Arial" font-size="44" '
            f'font-weight="700" fill="#333" text-anchor="middle">VERSÃO {nome.upper()}</text>')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{tw}" height="{th}" '
           f'viewBox="0 0 {tw} {th}"><rect width="{tw}" height="{th}" fill="#f2f2f2"/>'
           f'{"".join(partes)}</svg>')
    cairosvg.svg2png(bytestring=svg.encode(), write_to="windbanner_mockup_duas_versoes.png",
                     output_width=1400)


for nome, (c1, c2) in CORES.items():
    arquivo_impressao(nome, c1, c2)
    cairosvg.svg2png(bytestring=preview(nome, c1, c2).encode(),
                     write_to=f"windbanner_{nome}_preview.png", output_width=600)
mockup()
print("ok")
