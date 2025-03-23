# scheduler.py

import subprocess
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger

# Função para executar o script relatoryGenerator.py
def run_report_script():
    try:
        # Executa o script relatoryGenerator.py
        subprocess.run(["python", "Controllers/personControllers/relatoryGenerator/relatoryGenerator.py"], check=True)
        print("Relatório gerado com sucesso!")
    except subprocess.CalledProcessError as e:
        print(f"Erro ao gerar o relatório: {e}")

# Função para agendar a execução do script relatoryGenerator.py a cada 30 dias
def schedule_report_generation():
    scheduler = BackgroundScheduler()

    # Agendar a execução a cada 2000 segundos (para testes, ajuste conforme necessário)
    scheduler.add_job(run_report_script, IntervalTrigger(seconds=2000), id='generate_report', replace_existing=True)

    # Iniciar o agendador
    scheduler.start()
