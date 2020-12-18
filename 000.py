from flask import Flask, render_template, request, json, jsonify
import pymysql
import requests
app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def first():
    #ここではjson直書きだけど、データベースから読み込んでもいいね！
    lab_list = {'研究室A':1, '研究室B':2}
    return render_template("index.html", lab_list=lab_list)

@app.route('/ajax_lab', methods=["GET", "POST"])
def ajax_001():
    #研究室選択フォームから値を受け取り、変数に格納
    selected_lab = request.json['select_lab']
    #ただの確認print
    print(selected_lab)
    #研究室選択optionのvalueが数字なので、if文で分岐
    if int(selected_lab) == 1:#研究室Aのとき
        #最終的に返す値を{テキスト:[テキストの配列], 値:[値の配列]}にする。値は数字に。
        json_for_js = {'text':['1985年', '1987年'], 'value':[1, 2]}
    elif int(selected_lab) == 2:#研究室Bのとき
        json_for_js = {'text':['2077年', '2115年', '3019年'], 'value':[3, 4, 5]}
    return jsonify(json_for_js)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
