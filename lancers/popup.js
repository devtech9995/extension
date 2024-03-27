const storage = chrome.storage.local;

const savebutton = document.querySelector('button#save');
const resetbutton = document.querySelector('button#reset');
const textarea = document.querySelector('textarea.w3-input');
var firstDropdown = document.getElementById("first-dropdown");
firstDropdown.addEventListener('change', changeSecondDropdown);
const secondDropdown = document.getElementById("second-dropdown");
console.log(firstDropdown);
loadChanges()

savebutton.addEventListener('click', saveChanges);
resetbutton.addEventListener('click', resetChanges);

async function saveChanges(event) {
  // Get the current CSS snippet from the form.
  event.preventDefault();
  const _message = textarea.value;
  // Check that there's some code there.
  
  if (!_message) {
    message('Error: No message specified');
    return;
  }
  var _category={
      'category': firstDropdown.value,
      'subcategory': secondDropdown.value,
      'estimate': document.getElementById('estimate').value,
      'date': document.getElementById('date').value,
      'business': document.getElementById('business').value
  }
  // Save it using the Chrome extension storage API.
  await storage.set({ lancermessage: _message, lancer_category:JSON.stringify(_category)});
  message('設定を保管しました。');
}

async function resetChanges(event) {
  event.preventDefault();
  await storage.remove('lancerdata');
  message('履歴が消去されました。');
  alert('F5キーを押してページを更新してください!');
}

function loadChanges() {
  storage.get(['lancermessage','lancer_category'], function (items) {
    const category = JSON.parse(items.lancer_category);
    document.getElementById('business').value=category['business'];
    document.getElementById('date').value=category['date'];
    document.getElementById('estimate').value=category['estimate'];
    firstDropdown.value = category['category'];
    firstDropdown.dispatchEvent(new Event('change'));
    secondDropdown.value=category['subcategory'];
   
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
    if (items.lancermessage) {
      textarea.value = items.lancermessage;
      message('メッセージを入力してください。');
    }
    if(items.lancerurl) {
      url.value = items.lancerurl;
    }
  });
}

let messageClearTimer;
function message(msg) {
  clearTimeout(messageClearTimer);
  const message = document.querySelector('.plus');
  message.innerText = msg;
  messageClearTimer = setTimeout(function () {
    message.innerText = '';
  }, 3000);
}

function changeSecondDropdown() {
  secondDropdown.style = "display: list-item;"
  // Clear existing options
  secondDropdown.innerHTML = "<option value=''>小カテゴリを選択</option>";
  console.log(secondDropdown);
  // Enable or disable the second dropdown based on the selection of the first dropdown
  if (firstDropdown.value !== "") {
    secondDropdown.disabled = false;
    
    // Add new options based on selection of first dropdown
    if (firstDropdown.value === "9") {
      secondDropdown.innerHTML=`<option value="">小カテゴリを選択</option>
        <optgroup label="Web・システム開発">
        <option value="10">Webシステム開発・プログラミング</option>
        <option value="14">ソフトウェア・業務システム開発</option>
        <option value="11">Excelマクロ作成・VBA開発</option>
        <option value="17">ゲーム制作・開発</option>
        <option value="57">サーバー・ネットワーク構築</option>
        <option value="58">データベース設計・構築</option>
        <option value="201">ハードウェア設計・IoT開発</option>
        <option value="202">プロジェクトマネジメント</option>
        <option value="203">その他 (システム開発) </option>
        </optgroup>
        <optgroup label="スマホアプリ・モバイル開発">
        <option value="56">iPhoneアプリ・iPadアプリ開発</option>
        <option value="207">iPhoneゲーム開発</option>
        <option value="103">Androidアプリ開発</option>
        <option value="208">Androidゲーム開発</option>
        <option value="12">携帯アプリ・モバイル開発</option>
        </optgroup>
        <optgroup label="アプリケーション開発">
        <option value="204">Facebookアプリ開発</option>
        <option value="205">Windowsアプリケーション開発</option>
        <option value="206">Macアプリケーション開発</option>
        </optgroup>
        <optgroup label="運用・管理・保守">
        <option value="209">システム管理・保守・運用</option>
        <option value="210">サーバー管理・保守</option>
        <option value="104">セキュリティ対策</option>
        <option value="211">テスト・デバック・検証・品質評価</option>
        <option value="212">データクレンジング</option>
        </optgroup>`;
    }
    if (firstDropdown.value === "1") {
        // Set the new content as a string
        secondDropdown.innerHTML = `<option value="">小カテゴリを選択</option>
            <optgroup label="ウェブサイト制作・デザイン">
            <option value="213">ホームページ制作・作成</option>
            <option value="2">Web (ウェブ) デザイン</option>
            <option value="3">HTML・CSSコーディング</option>
            <option value="53">ランディングページ (LP) 制作</option>
            <option value="13">CMS構築・WordPress制作・導入</option>
            <option value="214">UIデザイン・設計</option>
            <option value="215">Webディレクション</option>
            </optgroup>
            <optgroup label="スマートフォン・モバイルサイト制作">
            <option value="105">スマートフォン (スマホ) サイト制作・構築</option>
            <option value="216">モバイルサイト制作・構築</option>
            </optgroup>
            <optgroup label="バナー・アイコン・ボタン">
            <option value="5">バナー作成・デザイン</option>
            <option value="22">アイコン作成・ボタンデザイン</option>
            </optgroup>
            <optgroup label="ECサイト・ネットショップ構築・運用">
            <option value="217">ECサイト・ネットショップ構築</option>
            <option value="218">商品登録代行</option>
            <option value="219">ECサイト・ネットショップ運営代行</option>
            <option value="220">在庫・受注管理 (ネットショップ) </option>
            </optgroup>
            <optgroup label="運営・更新・保守・SNS運用">
            <option value="8">ホームページ更新・運営代行</option>
            <option value="15">SNS作成・ソーシャルメディア運用</option>
            </optgroup>`;
    }
        if (firstDropdown.value === "18") {
      secondDropdown.innerHTML = `<option value="">小カテゴリを選択</option>
        <optgroup label="ロゴ・イラスト・キャラクター">
        <option value="19">ロゴ作成・デザイン</option>
        <option value="20">イラスト制作</option>
        <option value="224">ゲーム・カードイラスト制作</option>
        <option value="60">キャラクターデザイン・制作・募集</option>
        <option value="225">LINEスタンプ作成</option>
        </optgroup>
        <optgroup label="印刷物・DTP・その他">
        <option value="66">チラシ作成・フライヤー・ビラデザイン</option>
        <option value="61">名刺作成・カードデザイン・印刷</option>
        <option value="62">封筒・はがきデザイン</option>
        <option value="65">カタログ・パンフレットデザイン・作成</option>
        <option value="63">パッケージ・包装デザイン</option>
        <option value="226">ポスターデザイン・作成</option>
        <option value="227">ダイレクトメール (DM) </option>
        <option value="55">Tシャツ・プリントデザイン</option>
        <option value="228">ノベルティ・販促グッズ制作</option>
        <option value="21">DTPデザイン</option>
        <option value="229">その他 (デザイン) </option>
        </optgroup>
        <optgroup label="POP・シール・メニュー">
        <option value="230">メニューデザイン</option>
        <option value="231">ラベル・ステッカー・シールデザイン</option>
        <option value="232">POPデザイン</option>
        </optgroup>
        <optgroup label="看板・地図・インフォグラフィック">
        <option value="64">看板・のぼりデザイン</option>
        <option value="233">地図・案内図作成</option>
        <option value="234">インフォグラフィック</option>
        </optgroup>
        <optgroup label="CD・本">
        <option value="235">CD・DVDジャケットデザイン</option>
        <option value="236">装丁・ブックデザイン</option>
        </optgroup>
        <optgroup label="プロダクト・3D">
        <option value="107">プロダクトデザイン・CADデザイン</option>
        <option value="237">3Dモデリング・3Dプリンタ用データ作成</option>
        <option value="238">インダストリアル・工業デザイン</option>
        <option value="239">インテリアデザイン</option>
        <option value="240">ガーデンデザイン</option>
        </optgroup>`;
    }

    if (firstDropdown.value === "26") {
      secondDropdown.innerHTML = `<option value="">小カテゴリを選択</option>
        <optgroup label="ライティング">
        <option value="25">記事作成・ブログ記事・体験談</option>
        <option value="36">Webサイト・LPライティング</option>
        <option value="24">DM・メルマガ作成・制作代行</option>
        <option value="108">シナリオ作成・脚本制作・小説作成</option>
        <option value="109">インタビュー・取材</option>
        <option value="110">ビジネス・セールスレター・スピーチ</option>
        <option value="111">資料作成・レポート・論文作成</option>
        <option value="242">マニュアル作成</option>
        <option value="243">その他 (ライティング) </option>
        </optgroup>
        <optgroup label="ネーミング・コピー">
        <option value="28">ネーミング・名前募集</option>
        <option value="31">キャッチフレーズ・コピーライティング</option>
        <option value="241">セールスコピー</option>
        </optgroup>
        <optgroup label="編集・校正">
        <option value="72">リライト・校正・編集</option>
        <option value="244">書籍編集・雑誌編集</option>
        <option value="245">電子書籍制作</option>
        </optgroup>`;
    }
    if (firstDropdown.value === "34") {
        secondDropdown.innerHTML = `<option value="">小カテゴリを選択</option>
          <optgroup label="データ作成・テキスト入力">
          <option value="47">データ収集・入力・リスト作成</option>
          <option value="128">テキスト入力・タイピング・キーパンチ</option>
          <option value="41">データ閲覧・検索・登録</option>
          <option value="74">データ整理・分類・カテゴリ分け</option>
          <option value="38">データチェック・判断</option>
          <option value="46">テープ起こし・文字起こし・書き起こし</option>
          </optgroup>
          <optgroup label="レビュー・投稿・アンケート">
          <option value="37">レビュー・口コミ (クチコミ) </option>
          <option value="29">モニター・アンケート・質問</option>
          <option value="246">写真投稿・写メール投稿</option>
          </optgroup>
          <optgroup label="調査・分析・その他">
          <option value="112">調査・分析・統計</option>
          <option value="247">その他 (タスク・作業) </option>
          </optgroup>
          <optgroup label="内職・軽作業・代行">
          <option value="248">ポスティング・DM・発送作業</option>
          <option value="249">チケット代行・出品代行・予約代行</option>
          <option value="250">封入作業</option>
          <option value="251">チラシ配り</option>
          <option value="252">シール貼り</option>
          <option value="253">伝票整理</option>
          </optgroup>`;
    }
    if (firstDropdown.value === "102") {
      secondDropdown.innerHTML = `<option value="">小カテゴリを選択</option>
        <optgroup label="動画編集・映像制作・動画素材">
        <option value="276">YouTube動画編集・加工</option>
        <option value="277">企業紹介・講習・PR動画の編集</option>
        <option value="32">新規動画作成・企画・相談</option>
        <option value="278">動画撮影カメラマン・現地撮影・ライブ配信</option>
        <option value="279">動画モデル・動画素材</option>
        <option value="120">CM制作・PV制作・ドラマ制作</option>
        </optgroup>
        <optgroup label="写真撮影・画像加工">
        <option value="49">画像加工・写真編集・画像素材</option>
        <option value="118">写真撮影・カメラ撮影</option>
        </optgroup>
        <optgroup label="漫画・アニメーション">
        <option value="73">漫画制作・絵本作成</option>
        <option value="119">2Dアニメーション作成</option>
        <option value="280">3Dアニメーション作成・CG制作</option>
        <option value="256">Flash制作</option>
        </optgroup>
        <optgroup label="音楽・音源・ナレーション">
        <option value="69">声優・ナレーション・音声素材</option>
        <option value="121">作曲・音源・BGM制作</option>
        </optgroup>`;
    }
    if (firstDropdown.value === "101") {
      secondDropdown.innerHTML = `<option value="">小カテゴリを選択</option>
        <option value="113">英語翻訳・英文翻訳</option>
        <option value="114">中国語翻訳</option>
        <option value="115">韓国語翻訳</option>
        <option value="116">フランス語翻訳</option>
        <option value="117">スペイン語翻訳</option>
        <option value="254">ドイツ語翻訳</option>
        <option value="44">その他翻訳</option>
        <option value="255">映像翻訳・出版翻訳・メディア翻訳</option>`;
    }
    if (firstDropdown.value === "42") {
      secondDropdown.innerHTML = `<option value="">小カテゴリを選択</option>
        <optgroup label="セールス・ビジネスサポート">
        <option value="122">秘書・アシスタント</option>
        <option value="123">人事・採用代行</option>
        <option value="125">経理・財務・税務・ビジネス会計</option>
        </optgroup>
        <optgroup label="資料作成サポート">
        <option value="261">パワーポイント作成</option>
        <option value="262">Excel (エクセル) 作成</option>
        <option value="263">Access (アクセス) 作成</option>
        <option value="264">Word (ワード) 作成</option>
        </optgroup>
        <optgroup label="コンサルティング">
        <option value="265">経営・戦略コンサルティング</option>
        <option value="266">Web・ITコンサルティング</option>
        <option value="267">キャリア・人材コンサルティング</option>
        <option value="127">その他専門コンサルティング</option>
        </optgroup>
        <optgroup label="その他">
        <option value="40">その他</option>
        </optgroup>`;
    }
    if (firstDropdown.value === "268") {
      secondDropdown.innerHTML = `<option value="">小カテゴリを選択</option>
        <optgroup label="Webマーケティング・HP集客">
        <option value="7">SEO・SEM対策</option>
        <option value="221">リスティング広告運用</option>
        <option value="222">アクセス解析・データ分析</option>
        <option value="223">SNS運用代行</option>
        </optgroup>
        <optgroup label="企画・PR">
        <option value="27">商品企画・アイデア募集</option>
        <option value="39">広告・PR・パブリシティ・宣伝</option>
        <option value="269">営業企画・販促企画</option>
        <option value="270">事業企画</option>
        <option value="271">マーケティング企画</option>
        </optgroup>
        <optgroup label="リサーチ・分析・解析">
        <option value="257">データ分析・統計解析</option>
        <option value="258">市場調査・マーケットリサーチ</option>
        <option value="259">現地調査・現地取材</option>
        <option value="260">ミステリーショッパー・覆面調査</option>
        </optgroup>
        <optgroup label="営業">
        <option value="35">営業・セールス・テレマーケティング</option>
        <option value="272">営業管理</option>
        <option value="273">営業事務・営業アシスタント</option>
        </optgroup>
        <optgroup label="お問い合わせ対応・カスタマーサポート">
        <option value="124">カスタマーサポート・メールサポート</option>
        <option value="274">コールセンター管理・運営</option>
        <option value="275">テクニカルサポート</option>
        </optgroup>`;
    }

  }
  else {
    secondDropdown.disabled = true;
  }
}