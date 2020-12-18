function ajax_lab(){
  //pythonに送信するjsonの形を指定。ここでは({"なんとなく":idがselect_lab_idのタグのフォームの値})。工夫すれば複数データ送信可能。
  var lab_json = JSON.stringify({"select_lab":$('#select_lab_id').val()});
  $.ajax({
    type: 'POST',
    url: '/ajax_lab',
    data: lab_json,
    contentType: 'application/json',
    success:
      function (data){
        //↓ここからajax(非同期通信)の処理
        console.log("ajax_lab()のdataまるごと"+data);
        $('#select_year_id').children().remove();//まずは、id="select_year_id"の子要素を全部削除

        //これは別にいらない。<option value=""hidden>選択してください</option>を作るだけ。optionの選択できないけど最初に表示されるやつ。
        let op1 = document.createElement("option");
        op1.value = "";
        op1.text = ("年度を選択");
        op1.hidden = 1;
        document.getElementById("select_year_id").append(op1);
        //これは別にいらない。

        var arr = data;//pythonのajax処理後のデータをarrに格納
        for(var i=0;i<arr['value'].length;i++){
          let op = document.createElement("option");//変数opにoption要素を作る動作をしこむ。発動はしない。
          op.value = arr['value'][i];//まず、jsonは~jsonデータ[キー名]~で値が取り出せる。ここでは値が配列なので、さらに[i]番目と指定。
          op.text = arr['text'][i];//.textでoptionタグの間に挟む表示名を設定。表示名。
          document.getElementById("select_year_id").append(op);//id="select_year_id"のあるタグの中にさっきの仕込んだ動作をぶちかまし発動。
        }
        //↑ここまで
      }
  })
}

