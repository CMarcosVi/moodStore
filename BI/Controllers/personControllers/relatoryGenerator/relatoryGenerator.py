# relatoryGenerator.py

import sys
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

# Adicionando o diretório pai ao caminho para permitir importar getAllWage e getQuantidyPosition
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from getAllWage import processar_json as processar_salarios
from getQuantidyPosition import processar_json as processar_posicoes

# Função para gerar o relatório em PDF
def gerar_relatorio_pdf(salarios_por_cargo, soma_total, quantidade_total, quantidade_positions, nome_arquivo_pdf):
    c = canvas.Canvas(nome_arquivo_pdf, pagesize=letter)
    largura, altura = letter
    
    # Adicionando título ao PDF
    c.setFont("Helvetica-Bold", 16)
    c.drawString(100, altura - 40, "Relatório de Colaboradores - Salários e Posições")
    
    # Adicionando cabeçalhos da tabela de salários por cargo
    c.setFont("Helvetica-Bold", 12)
    c.drawString(100, altura - 80, "Cargo")
    c.drawString(250, altura - 80, "Salário Total")
    
    # Adicionando os dados dos colaboradores (salários por cargo)
    c.setFont("Helvetica", 10)
    y = altura - 100
    for cargo, soma in salarios_por_cargo.items():
        c.drawString(100, y, cargo)
        c.drawString(250, y, f"R$ {soma:.2f}")
        y -= 20

    # Adicionando a soma total dos salários
    c.setFont("Helvetica-Bold", 12)
    c.drawString(100, y - 20, f"Soma total a ser Pago: R$ {soma_total:.2f}")
    y -= 20  # Mais espaço após a soma total dos salários
    
    # Aumentando mais o espaçamento antes da próxima seção
    y -= 10  # Espaço maior entre as seções
    
    # Adicionando cabeçalhos da tabela de quantidade de posições
    c.setFont("Helvetica-Bold", 12)
    c.drawString(100, y - 20, "Colaboradores")
    y -= 40  # Dando espaço entre o cabeçalho e os valores
    
    # Adicionando dados das quantidades de posições
    c.setFont("Helvetica", 10)
    for position, count in quantidade_positions.items():
        c.drawString(100, y, f"{position}: {count}")
        y -= 20
    
    # Adicionando a quantidade total de objetos
    c.setFont("Helvetica-Bold", 12)
    
    # Salvando o PDF
    c.save()

# Função principal para gerar os relatórios
def gerar_relatorio(nome_arquivo_json):
    # Chama as funções de processamento
    salarios_por_cargo, soma_total = processar_salarios(nome_arquivo_json)
    quantidade_total, quantidade_positions = processar_posicoes(nome_arquivo_json)
    
    # Gerar o relatório em PDF
    gerar_relatorio_pdf(salarios_por_cargo, soma_total, quantidade_total, quantidade_positions, "relatorio_colaboradores_salarios_posicoes.pdf")
    
    print("Relatório PDF gerado com sucesso!")

# Chamar a função principal
if __name__ == "__main__":
    gerar_relatorio('Analytics/personAnalytics.json')  # Ajuste o caminho conforme necessário
