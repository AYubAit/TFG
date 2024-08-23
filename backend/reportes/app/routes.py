from flask import Blueprint, request, jsonify
from .services import fetch_data, generate_pdf

main = Blueprint('main', __name__)

@main.route('/report', methods=['GET'])
def generate_report():
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