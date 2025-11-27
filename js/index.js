

    //1.Save クリックイベント
    $("#save").on("click", function () {
    const key = $("#date").val();
    const value = $("#text").val();
    if (key === "" || value === "") {
        alert("日付と学習時間の両方を入力してください");
        return;
    }
    //データ保存
    localStorage.setItem(key, value);
    const table = `
    <tr>
        <td>${key}</td>
        <td>${value}</td>
    </tr>
    `;
    // tbody に行を追加
    $("#record-list tbody").append(table);
    // 集計更新
    updateSummary();
    // 保存後に入力欄をクリアしてフォーカスを戻す
    $("#text").val("");
    $("#date").val("");
    $("#date").focus();
    });

    // 2.結果を見る クリックイベント
    $("#clear").on("click", function () {
    // ⭐️クリック後アラートが出て、Yesの場合以下の処理を実行する
    if (confirm("本当に全てのデータを削除しますか？")) {
        localStorage.clear();
        // tbody の中身だけ削除して tfoot は残す
        $("#record-list tbody").empty();
        updateSummary();
    };
    });

    //3.ページ読み込み：保存データ取得表示
    for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const table = `
    <tr>
        <td>${key}</td>
        <td>${value}</td>
    </tr>
    `;
    $("#record-list tbody").append(table);
    // ページ読み込み時の集計更新はループ後に行う
    };

// 集計を計算して tfoot に表示する関数
function updateSummary() {
    // 合計日数（localStorage のキー数）
    const count = localStorage.length;
    // 合計学習時間（分）
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const val = localStorage.getItem(localStorage.key(i));
        // ⭐️以下の意味がよくわかんない。
        const n = parseInt(val, 10);
        if (!isNaN(n)) total += n;
    }
    // tfoot の 1 列目と2列目を更新
    const $footTh = $("#record-list tfoot th");
    if ($footTh.length >= 2) {
        $footTh.eq(0).text(`合計日数: ${count} 日`);
        $footTh.eq(1).text(`合計学習時間: ${total} 分`);
    }
}
// 初期表示の集計更新
updateSummary();



// Readme
    // 工夫点
        // 記録したものをテーブルデータに表示すること
        //  空欄で記入したらストレージに保存する前にアラートを出して記入を促すようにしたこと
    // 学んだこと
        //
    // ❓よくわからないこと
        // updateSummary って何？
        // const n = parseInt(val, 10);
        // if (!isNaN(n)) total += n;
        // if ($footTh.length >= 2) {        
        // $footTh.eq(0).text(`合計日数: ${count} 日`);
        // $footTh.eq(1).text(`合計学習時間: ${total} 分`);
        // のeq
    // この後やりたいこと
    //学習記録結果に応じてグラフ表示・連続記録やそう学習時間に応じたバッジ、画像表示などを追加したい
//　