from flask import Blueprint, request, jsonify
from .services import fetch_data, generate_pdf
from prometheus_client import Counter, generate_latest

# Crear un contador
REQUEST_COUNT = Counter('http_requests_total', 'Total number of HTTP requests')


main = Blueprint('main', __name__)
@main.route('/metrics')
def metrics():
    return Response(generate_latest(), content_type='text/plain')



@main.route('/report', methods=['GET'])
def generate_report():

    REQUEST_COUNT.inc() # metrics


    month = request.args.get('month')
    year = request.args.get('year')
    data_type = request.args.get('type')  # 'list' or 'pdf'

    ingresos, gastos = fetch_data(month, year)

    if data_type == 'list':
        return jsonify({'ingresos': ingresos, 'gastos': gastos})
    elif data_type == 'pdf':
        return generate_pdf(ingresos, gastos)
    else:
        return 'Invalid type', 400