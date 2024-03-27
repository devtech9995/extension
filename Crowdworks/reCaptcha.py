from flask import Flask, request, jsonify
from flask_cors import CORS
from anticaptchaofficial.recaptchav2proxyless import *

solver = Flask(__name__)
CORS(solver)
@solver.route('/', methods=["GET", "POST"])
def backend():
    url = request.json['url']
    site_key = request.json['site_key']
    API_key = "4806b102d02ceaaf0d4fa79b211484ba"
    solver = recaptchaV2Proxyless()
    solver.set_verbose(1)
    solver.set_key(API_key)
    solver.set_website_url(url)
    solver.set_website_key(site_key)
    solver.set_soft_id(0)

    g_response = solver.solve_and_return_solution()
    if g_response != 0:
        print("g-response: "+g_response)
    else:
        print("task finished with error "+solver.error_code)

    # Return the recognized text
    return jsonify({'g_response': g_response})

if __name__ == '__main__':
    solver.run("localhost", 5005)