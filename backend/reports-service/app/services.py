import requests
import os

def fetch_data(month, year):
    ingresos = requests.get(f"{os.getenv('EXTERNAL_SERVICE_URL')}/ingresos?month={month}&year={year}").json()
    gastos = requests.get(f"{os.getenv('EXTERNAL_SERVICE_URL')}/gastos?month={month}&year={year}").json()
    return ingresos, gastos

def generate_pdf(ingresos, gastos):
    from reportlab.pdfgen import canvas
    import io
    from flask import send_file

    buffer = io.BytesIO()
    p = canvas.Canvas(buffer)
    p.drawString(100, 750, "Informe Mensual")
    p.drawString(100, 730, f"Ingresos: {sum([i['amount'] for i in ingresos])}")
    p.drawString(100, 710, f"Gastos: {sum([g['amount'] for g in gastos])}")
    p.showPage()
    p.save()
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name='report.pdf', mimetype='application/pdf')