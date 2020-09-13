//初期拡張子を初期化しておきます。
//
var extention = ".txt";
var elems = document.getElementById("extentions");
elems.innerHTML = "現在設定されている拡張子 : 『"+extention+"』";

//機能的な関数セット
function save(){
    var message = document.form1.Memo.value;
    if(!message){
        alert("メモしてください。");
    }else{
        localStorage.setItem("Message",message); //第1引数は キー 第2引数は変数//
        document.form1.Memo.value= "";
        alert("『"+message+"』　をメモしました。");
        document.form1.Memo2.value = message;
    }
}

function load(){

    //こちらは一方通行のメモ機能
    /*var message = "";
    if(!localStorage.getItem("Message")){
        alert("メモされていません。");
    }else{
        message = localStorage.getItem("Message");
    }
    document.form1.Memo.value = message;
    */

    ///こちらは双方向のメモ///
    var message = document.form1.Memo2.value;
    if(!message){
        alert("保存されているメモがありません。");
    }else{
        alert("メモを読み込みます...");
        document.form1.Memo.value = message;
    }
}

function download(){
    var text = document.form1.Memo2.value;

    if(!text){
        alert("ダウンロード不可能。メモを残して下さい。");
    }else{
        let blob = new Blob([text],{type:"text/plain;charset=utf-8"});

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = 'output'+extention;
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
}

//
//ダウンロードするファイルの拡張子
//デフォルトは  『.txt』 にする。
//
function change(){
    var change = prompt("設定したい拡張子を入力してください。");
    if(!change){
        alert("入力がありません。やり直してください。");
    }else{
        //これでないと表示が変わらなかった。
        extention = "."+change;
        elems.innerHTML = "現在設定されている拡張子 : 『"+extention+"』";
    }
}

////2020年8月27日実装
//
//メモへの記述をtxtファイルで出力可能
function to_txt(){
    //.txt化させる関数
    //var fs = new ActiveXObject("Scripting.FileSystemObject");
    var txt = document.form1.Memo2.value; //データ取得
    //var array = txt.split();//  配列変換(必要だから)
    /////////       ↑        /////////////
    ////////   配列化はあとでやれば良くね !?
    if(!txt){
        alert("メモがありません。");
    }else{
        alert("txt化し、ダウンロードします。");
        //ここからダウンロードの手順へ
        //まだ解読できていない。
        //Blob と URL オブジェクトを使用
        let blob = new Blob([txt],{type:"text/plain"});

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = 'output.txt';
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    //fs = null;
    //alert("txt変換終了");
    }
}

////2020年08月28日
//
// メモをcsvファイル化
function to_csv(){
    
    var txt = document.form1.Memo2.value;
    if(!txt){
        alert("メモがありません。");
    }else{
        alert("csv化し、ダウンロードします。");
        let blob = new Blob([txt],{type:"text/csv;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = 'output.csv';
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
    
}