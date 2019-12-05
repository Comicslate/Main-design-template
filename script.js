//ВЕЗДЕ

var i, j;

// счётчик Яндекса yandex_counter

( function ( d, w, c ) {
	( w[c] = w[c] || [] ).push ( function () {
		try {
			w.yaCounter25500497 = new Ya.Metrika2 ( {
				id: 25500497,
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
				webvisor: true
			} );
		}
		catch(e) { }
	} );
	var n = d.querySelector ( "script" ),
		s = d.createElement ( "script" ),
		f = function () {
			n.parentNode.insertBefore ( s, n );
		};
	s.type = "text/javascript";
	s.async = true;
	s.src = "https://mc.yandex.ru/metrika/tag.js";
	if ( w.opera == "[object Opera]" ) {
		d.addEventListener ( "DOMContentLoaded", f, false );
	} else {
		f();
	}
} ) ( document, window, "yandex_metrika_callbacks2" );


// ЦЕНТРАЛИЗАЦИЯ КАРТИНОК

// деэскизация перемещённых картинок intermedia

document.querySelectorAll ( ".dokuwiki img:not([src*='fetch'])" ).forEach (
	e => e.src = e.src.replace ( /[wh]=\d+\&?/g, '' ).replace ( /[\?\&]$/g, '' )
);

// перенаправление пути картинок в медиаменеджере intermanager

if ( window.location.href.match ( /mediamanager.php\?ns=\w\w\w?%3A(sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang|playground|user)/ ) != null ) {
	var	ns = document.querySelector ( "#media__ns" );
	ns.innerHTML = ns.innerHTML.replace ( /^:\w\w\w?:/, 'Redirect... :' );
	window.location = window.location.toString().replace ( /ns=\w\w\w?%3A/, 'ns=' )
};

// исправление медиаменеджера в сайдбаре sidebarfix

var sidemedia = document.querySelector ( "#pagetools .media a" );
if ( sidemedia != null ) {
	sidemedia.href = sidemedia.href.replace ( /ns=\w\w\w?%3A/, 'ns=' );
};


// ГЛАВНАЯ, МЕНЮ, ИНДЕКСЫ И Т.П.

// добавление языка к последним правкам и тегам pagelist-langs

if (
	window.location.href.match ( /(start|showtag|do=search)/ ) != null
) {
	document.querySelectorAll ( ".pagelist a, .taglist a, .search_quickhits a, .search_results a.wikilink1 " ).forEach (
		e => {
			if ( e.href != undefined ) e.innerHTML = e.href.substr ( 23, 4 ).split( '/' )[0].toUpperCase() + ' / ' + e.innerHTML
		}
	)
};

// выравнивание первых двух боксов в описании и на главной box_align

if ( window.location.href.match ( /[:\/]start/i ) ) { // запуск на главной
	var box = document.querySelectorAll ( '.level1 > .box' );
	if ( box.length >= 2 ) {
		var left = box[0],
			right = box[1],
			left_h = Math.max ( 600, left.offsetHeight ),
			right_h = Math.max ( 600, right.offsetHeight );
		right.style.cssText += " height: " + Math.min ( right_h, left_h ) + "px; margin: 0;";
		left.style.cssText += " height: " + Math.min ( right_h, left_h ) + "px; margin: 0;";
	};
};

// пакование меню menu_columns

var	page = document.querySelector ( ".page" ), /* требуется начиная отсюда, используется и дальше */
	pagewidth = page.offsetWidth - 3;

if ( window.location.href.match ( /[:\/]menu(\?rev.+)?$/i ) !== null ) { // запуск в меню
	var menu_col_ul = document.querySelectorAll ( '.page ul' ),
		menu_col_div,
		menu_col_div_sizes = [];
	for ( i = 0; i < menu_col_ul.length; i++ ) {
		if ( i != 3 ) { // исключая Интерробанг Студию
			menu_col_div = menu_col_ul[i].querySelectorAll ( 'div.li' );
			for ( j = 0; j < menu_col_div.length; j++ ) {
				menu_col_div[j].style.display = "inline"; // приведение дивов к строчному виду
				menu_col_div_sizes.push ( menu_col_div[j].offsetWidth ) // заполнение массива их размерами
			}
		}
	};
	var menu_col_div_size_max = Math.max.apply ( null, menu_col_div_sizes ); // определение наибольшего дива
	for ( i in menu_col_ul ) {
		if ( i != 3 && menu_col_ul[i].style ) menu_col_ul[i].style.cssText += " columns: " + menu_col_div_size_max + "px auto; column-gap: 20px;" // адаптивные колонки
	}
};

// количественные окончания - 1/2/5 стрип/а/ов numeric_texts

function getNumEnding ( num, ends ) {
	if (
		num % 100 >= 11
		&&
		num % 100 <= 19
	) {
		return ends[2];
	} else {
		switch ( num % 10 ) {
			case (1): return ends[0];
			case (2):
			case (3):
			case (4): return ends[1];
			default: return ends[2];
		}
	}
};

var fix_notes = document.querySelectorAll ( ".notetip, .noteimportant, .notewarning" );
for ( i = 0; i < fix_notes.length; i++ )  {
	var e = fix_notes[i].innerHTML;
	if ( e != null ) {
		var et = e.match ( / (0*(\d+)).*(стрипов)/ );
		if ( et != null ) fix_notes[i].innerHTML = e.replace ( et[1], et[2] ).replace ( et[3], getNumEnding ( et[2], ['стрип', 'стрипа', 'стрипов'] ) );
	}
};


// ПОЧТИ ВЕЗДЕ

// [[ссылка]]ми attach_text2link

document.querySelectorAll ( ".page a.wikilink1, .page a.wikilink2" ).forEach (
	e => {
		if ( e.parentElement != null ) {
			e.parentElement.innerHTML = e.parentElement.innerHTML.replace ( /(<\/a>)([a-zа-ё\']+)/gi, "$2$1" )
		}
	}
);

// красные ссылки транслятора red_translations

if ( document.querySelector ( '.plugin_translation') != null ) {
	if ( document.querySelector ( '.plugin_translation .wikilink1 ') != null ) {
		document.querySelectorAll ( ".plugin_translation .wikilink2:not([href$='do=edit'])" ).forEach (
			function (e) {
				e.href += '?do=edit'
			}
		)
	}
};

// ПЕРЕВОДЫ
var lang = NS.split ( ':', 2 )[0],
	lines = {
		'ady': [
			'Гъэлъэгъон зэдзэкIар'
		],
		'be': [
			'Паказаць пераклад',
			'У гэтай паласе няма налепак!<br>Вы можаце выправіць гэта, <a href="?do=edit">адрэдагаваўшы старонку</a> з дапамогай <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=be" target=_blank>CoTAN</a>',
			'У гэтай паласе састарэлы сінтаксіс AIMG<br>Вы можаце выправіць гэта, <a href="?do=edit">перарабіўшы старонку</a> з дапамогай <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=be" target=_blank>CoTAN</a>',
			'Па шырыні экрана',
			'Затуманіў навігатар'
		],
		'bg': [
			'Показване на превод',
			'В тази лента няма етикети!<br>Можете да поправите това, като <a href="?do=edit">редактирате страницата</a> с <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=bg" target=_blank>CoTAN</a>',
			'Тази лента има остарял синтаксис на AIMG<br>Можете да поправите това, като <a href="?do=edit">преработите страницата</a> с <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=bg" target=_blank>CoTAN</a>',
			'Ширина на екрана',
			'Навигатор за мъгла'
		],
		'da': [
			'Vis oversættelse',
			'Der er ingen klistermærker i denne stribe!<br>Du kan rette dette ved at <a href="?do=edit">redigere siden</a> med <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=da" target=_blank>CoTAN</a>',
			'Denne stribe har forældet AIMG syntaks<br>Du kan løse dette ved at <a href="?do=edit">remake siden</a> med <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=da" target=_blank>CoTAN</a>',
			'Skærmbredde',
			'Tåge navigator'
		],
		'de': [
			'Übersetzung anzeigen',
			'In diesem Streifen befinden sich keine Aufkleber!<br>Sie können dies beheben, indem Sie die Seite mit <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=de" target=_blank>CoTAN</a> <a href="?do=edit">bearbeiten</a>',
			'Dieser Strip hat eine veraltete AIMG-Syntax<br>Sie können dies beheben, indem Sie die Seite mit <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=de" target=_blank>CoTAN</a> <a href="?do=edit">überarbeiten</a>',
			'Bildschirmbreite',
			'Nebel-Navigator'
		],
		'el': [
			'εμφάνιση μετάφρασης',
			'Δεν υπάρχουν αυτοκόλλητα στην ταινία!<br>Μπορείτε να διορθώσετε αυτό με την επεξεργασία της σελίδας με το <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=el" target=_blank>CoTAN</a>',
			'Αυτή η λωρίδα έχει ξεπερασμένη σύνταξη AIMG<br>Μπορείτε να το διορθώσετε επανατοποθετώντας τη σελίδα με το <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=el" target=_blank>CoTAN</a>',
			'Πλάτος οθόνης',
			'Πλοηγός ομίχλης'
		],
		'en': [
			'Show translation',
			'There are no stickers on this strip!<br>You can fix this by <a href="?do=edit">editing this page</a> with <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=en" target=_blank>CoTAN</a>',
			'This strip has outdated AIMG syntax<br>You can fix this by <a href="?do=edit">remaking this page</a> with <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=en" target=_blank>CoTAN</a>',
			'Screen width',
			'Fog navigator'
		],
		'eo': [
			'Montri tradukojn',
			'Ne estas glumarkoj en ĉi tiu strio!<br>Vi povas solvi ĉi tion <a href="?do=edit">redaktante la paĝon</a> kun <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=eo" target=_blank>CoTAN</a>',
			'Ĉi tiu strio havas malaktualan sintakson de AIMG<br>Vi povas solvi ĉi tion <a href="?do=edit">refarante la paĝon</a> kun <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=eo" target=_blank>CoTAN</a>',
			'Larĝa ekrano',
			'Nebula navigilo'
		],
		'es': [
			'Mostrar traducción',
			'¡No hay pegatinas en esta tira!<br>Puedes arreglar esto <a href="?do=edit">editando esta página</a> con <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=es" target=_blank>CoTAN</a>',
			'Esta tira ha caducado la sintaxis de AIMG<br>Puedes arreglar esto <a href="?do=edit">rehaciendo esta página</a> con <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=es" target=_blank>CoTAN</a>',
			'Ancho de pantalla',
			'Navegador de niebla'
		],
		'fi': [
			'Näytä käännös',
			'Tässä nauhassa ei ole tarroja!<br>Voit korjata tämän <a href="?do=edit">muokkaamalla sivua</a> <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=fi" target=_blank>CoTANin</a> avulla',
			'Tällä nauhalla on vanhentunut AIMG-syntaksi<br>Voit korjata tämän <a href="?do=edit">korjaamalla sivun</a> <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=fi" target=_blank>CoTANin</a> avulla',
			'Näytön leveys',
			'Sumuavigaattori'
		],
		'fr': [
			'Afficher la traduction',
			'Il n\'y a pas d\'autocollants dans cette bande!<br>Vous pouvez résoudre ce problème en <a href="?do=edit">modifiant cette page</a> avec <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=fr" target=_blank>CoTAN</a>',
			'Cette bande a une syntaxe AIMG obsolète<br>Vous pouvez résoudre ce problème en <a href="?do=edit">refaisant cette page</a> avec <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=fr" target=_blank>CoTAN</a>',
			'Largeur de l\'écran',
			'Navigateur de brouillard'
		],
		'he': [
			'הצג תרגום',
			'אין מדבקות ברצועה זו!<br>באפשרותך לתקן זאת על-ידי <a href="?do=edit">עריכת הדף</a> באמצעות <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=he" target=_blank>CoTAN</a>',
			'ברצועה זו יש תחביר AIMG מיושן<br>אתה יכול לתקן את זה על ידי <a href="?do=edit"> עיבוד מחדש של דף זה </a> באמצעות <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=he" target=_blank>CoTAN</a>',
			'רוחב המסך',
			'נווט ערפל'
		],
		'hi': [
			'अनुवाद दिखाएं',
			'इस पट्टी में कोई स्टिकर नहीं हैं!<br>आप <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=hi" target=_blank>CoTAN</a> के साथ <a href="?do=edit">पेज को एडिट</a> करके इसे ठीक कर सकते हैं',
			'इस स्ट्रिप में AIMG सिंटैक्स पुराना है<br>आप <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=hi" target=_blank>CoTAN</a> के साथ <a href="?do=edit">पेज को रीमेक</a> करके इसे ठीक कर सकते हैं',
			'स्क्रीन की चौड़ाई',
			'फॉग नाविक'
		],
		'id': [
			'Tampilkan terjemahan',
			'Tidak ada stiker di strip ini!<br>Anda dapat memperbaikinya dengan <a href="?do=edit">mengedit halaman</a> dengan <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=id" target=_blank>CoTAN</a>',
			'Strip ini telah usang sintaks AIMG<br>Anda dapat memperbaikinya dengan <a href="?do=edit">membuat ulang halaman</a> dengan <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=id" target=_blank>CoTAN</a>',
			'Lebar layar',
			'Navigator kabut'
		],
		'it': [
			'Mostra traduzione',
			'Non ci sono adesivi in questa striscia!<br>Puoi sistemarlo <a href="?do=edit">modificando questa pagina</a> con <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=it" target=_blank>CoTAN</a>',
			'Questa striscia ha una sintassi AIMG obsoleta<br>Puoi sistemarlo <a href="?do=edit">rifacendo questa pagina</a> con <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=it" target=_blank>CoTAN</a>',
			'Larghezza dello schermo',
			'Nebulizzatore'
		],
		'ja': [
			'翻訳を表示する',
			'このストリップにはステッカーがありません！<br>あなたは<a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=ja" target=_blank>CoTAN</a>で<a href="?do=edit">このページを編集することによって</a>これを直すことができます',
			'このストリップはAIMGの構文が古くなっています<br>あなたは<a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=ja" target=_blank>CoTAN</a>で<a href="?do=edit">このページを作り直すことによって</a>これを直すことができます',
			'画面幅',
			'霧ナビゲーター'
		],
		'ko': [
			'번역보기',
			'이 스트립에는 스티커가 없습니다!<br><a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=ko" target=_blank>CoTAN</a>으로 <a href="?do=edit">페이지를 편집하여</a> 문제를 해결할 수 있습니다',
			'이 스트립은 구식 AIMG 구문을 가지고 있습니다.<br><a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=ko" target=_blank>CoTAN</a>을 사용하여 <a href="?do=edit">페이지를 다시 작성하면</a> 문제를 해결할 수 있습니다',
			'화면 너비',
			'안개 네비게이터'
		],
		'pl': [
			'Pokaż tłumaczenie',
			'Na tym pasku nie ma naklejek!<br>Możesz to naprawić, <a href="?do=edit">edytując tę stronę</a> za pomocą <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=pl" target=_blank>CoTAN</a>',
			'Ten pasek ma przestarzałą składnię AIMG<br>Możesz to naprawić, <a href="?do=edit">przerabiając tę stronę</a> za pomocą <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=pl" target=_blank>CoTAN</a>',
			'Szerokość ekranu',
			'Nawigator mgły'
		],
		'pt': [
			'Mostrar tradução',
			'Não há adesivos nesta faixa!<br>Você pode corrigir isso <a href="?do=edit">editando esta página</a> com o <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=pt" target=_blank>CoTAN</a>',
			'Esta faixa tem uma sintaxe desatualizada do AIMG<br>Você pode consertar isso <a href="?do=edit">refazendo esta página</a> com o <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=pt" target=_blank>CoTAN</a>',
			'Largura da tela',
			'Navegador de nevoeiro'
		],
		'ru': [
			'Показать перевод',
			'В этом выпуске нет наклеек!<br>Вы можете исправить это, <a href="?do=edit">отредактировав страницу</a> с помощью <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=ru" target=_blank>CoTAN</a>',
			'В этом выпуске устаревший синтаксис AIMG<br>Вы можете исправить это, <a href="?do=edit">переделав страницу</a> с помощью <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=ru" target=_blank>CoTAN</a>',
			'По ширине экрана',
			'Затуманить навигатор'
		],
		'uk': [
			'Показати переклад',
			'У цій смузі немає жодних наклейок!<br>Ви можете виправити це, <a href="?do=edit">відредагувавши цю сторінку</a> за допомогою <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=uk" target=_blank>CoTAN</a>',
			'Ця смуга має застарілий синтаксис AIMG<br>Ви можете виправити це, переробивши цю сторінку за допомогою <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=uk" target=_blank>CoTAN</a>',
			'По ширині екрану',
			'Затуманити навігатор'
		],
		'zh': [
			'显示翻译',
			'这条带上没有贴纸！<br>您可以通过<a href="?do=edit">使用</a><a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=zh" target=_blank>CoTAN</a>编辑页面来解决此问题',
			'这个条带已经过时了AIMG语法<br>您可以通过<a href="?do=edit">使用</a><a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=zh" target=_blank>CoTAN</a>重新构建页面来解决此问题',
			'屏幕宽度',
			'雾导航器'
		],
		'default': []
	},
	line = [];
lines.default = lines['en'];
for ( i in lines.default ) {
	line[i] = lines[lang][i] || lines.default[i]
};

// Added by EvilCat at 1 Oct 2012

/* УПРАВЛЕНИЕ ПАПОЧНЫМИ ПЕЧЕНЬКАМИ */
function createCookie ( name, value, days ) { // создание куки с переданными параметрами
	var date = new Date ( );
	date.setTime ( date.getTime ( ) + ( days * 24 * 60 * 60 * 1000 ) );
	document.cookie = name + '=' + value + '; expires=' + date.toGMTString ( ) + '; path=/';
}

function readCookie ( name ) { // чтение куки
	var nameEQ = name + '=',
		ca = document.cookie.split ( ';' );
	for ( i = 0; i < ca.length; i++ ) {
		var c = ca[i];
		while ( c.charAt ( 0 ) == ' ' ) {
			c = c.substring ( 1, c.length );
		}
		if ( c.indexOf ( nameEQ ) == 0 ) return c.substring ( nameEQ.length, c.length );
	}
	return null;
}

function eraseCookie ( name ) { // удаление куки
	createCookie ( name, '', -1 );
}

/* ГАЛОЧКА ОТКЛЮЧЕНИЯ НАКЛЕЕК */
function setReveal ( set ) { // синхронизация переменных
	translate_mark = set;
	translate_checkbox.innerHTML = translate_mark ? translate_style_on : translate_style_off;
	( translate_mark == true ) ? eraseCookie ( folder_cookie ) : createCookie ( folder_cookie, false, 9999 );
}

function toggleReveal ( ) { // переключатель() галочки
	setReveal ( !translate_mark );
}

function createRevealCheckbox ( ) { // создатель() галочки
	var css		= document.createElement ( 'style' ),
		obj		= document.createElement ( 'label' ), // создан лейбл
		check	= document.createElement ( 'input' ), // создан ввод
		text		= document.createTextNode ( line[0] ), // создано пояснение
		ref		= document.querySelector ( '#translabel' ); // поиск места вставки

	css.type = 'text/css';
	translate_checkbox = css;
	if ( ref != null ) ref.insertBefore ( css, null );
	obj.accessKey = 't';
	obj.className = 'fntext';
	check.type = 'checkbox';
//	check.id = 'checklab'; // id для контрол-навигации
	check.checked = translate_mark;
	check.onclick = toggleReveal;
	obj.appendChild ( check );
	obj.appendChild ( text );
	if ( ref != null ) ref.insertBefore ( obj, null );
	setReveal ( translate_mark );
}

/* ГАЛОЧКА РАСШИРЕНИЯ КОМИКСОВ */
function piczoom ( ) {
	var ctc = page.querySelectorAll ( ".page > * > .ct-container, .page > * > .fn-container, .page > * > * > .ct-container, .page > * > * > .fn-container" );
	for ( i = 0; i < ctc.length; i++ ) {
		var img = ctc[i].querySelector ( "img" ); // !
		var scale = pagewidth / img.width,
			margin = ( scale - 1 ) * img.height + 10;
		ctc[i].style.transform = "scale(" + scale + ")";
		ctc[i].style.marginBottom = margin + "px";
		ctc[i].style.transformOrigin = ( scale < 1 ) ? 'left top 0' : 'center top 0';
	}
}

function setReveal1 ( set ) { // синхронизация переменных
	zoom_mark = set;
	zoom_checkbox.innerHTML = zoom_mark ? zoom_style_on : zoom_style_off;
	( zoom_mark == true ) ? eraseCookie ( folder_cookie1 ) : createCookie ( folder_cookie1, false, 9999 );
	if ( zoom_mark == true ) piczoom ( );
}

function toggleReveal1 ( ) { // переключатель() галочки
	setReveal1 ( !zoom_mark );
}

function createZoomCheckbox ( ) { // создатель() галочки
	var css 	= document.createElement ( 'style' ),
		obj		= document.createElement ( 'label' ), // создан лейбл
		check	= document.createElement ( 'input' ), // создан ввод
		text		= document.createTextNode ( line[3] ), // создано пояснение
		ref		= document.querySelector ( '#translabel' ); // поиск места вставки

	css.type = 'text/css';
	zoom_checkbox = css;
	if ( ref != null ) ref.insertBefore ( css, null );
	obj.className = 'diszoom';
	check.type = 'checkbox';
	check.checked = zoom_mark;
	check.onclick = toggleReveal1;
	obj.appendChild ( check );
	obj.appendChild ( text );
	if ( ref != null ) ref.insertBefore ( obj, null );
	setReveal1 ( zoom_mark );
}

/* ГАЛОЧКА ПРИГЛУШЕНИЯ РЕДКИХ КНОПОК НАВИГАТОРА */
function setReveal2 ( set ) { // синхронизация переменных
	fognavi_mark = set;
	fognavi_checkbox.innerHTML = fognavi_mark ? fognavi_style_on : fognavi_style_off;
	( fognavi_mark == true ) ? eraseCookie ( folder_cookie2 ) : createCookie ( folder_cookie2, false, 9999 );
}

function toggleReveal2 ( ) { // переключатель() галочки
	setReveal2 ( !fognavi_mark );
}

function createFogNaviCheckbox ( ) { // создатель() галочки
	var css 	= document.createElement ( 'style' ),
		obj		= document.createElement ( 'label' ), // создан лейбл
		check	= document.createElement ( 'input' ), // создан ввод
		text		= document.createTextNode ( line[4] ), // создано пояснение
		ref		= document.querySelector ( '#translabel' ); // поиск места вставки

	css.type = 'text/css';
	fognavi_checkbox = css;
	if ( ref != null ) ref.insertBefore ( css, null );
	obj.className = 'fognavi';
	check.type = 'checkbox';
	check.checked = fognavi_mark;
	check.onclick = toggleReveal2;
	obj.appendChild ( check );
	obj.appendChild ( text );
	if ( ref != null ) ref.insertBefore ( obj, null );
	setReveal2 ( fognavi_mark );
}

/* ГАЛОЧКА МОРГАНИЯ ФРИФОЛА */
function setReveal3 ( set ) { // синхронизация переменных
	blink_mark = set;
	blink_checkbox.innerHTML = blink_mark ? blink_style_on : blink_style_off;
	( blink_mark == true ) ? eraseCookie ( folder_cookie3 ) : createCookie ( folder_cookie3, false, 9999 );
}

function toggleReveal3 ( ) { // переключатель() галочки
	setReveal3 ( !blink_mark );
}

function createBlinkCheckbox ( ) { // создатель() галочки
	var css 	= document.createElement ( 'style' ),
		obj		= document.createElement ( 'label' ), // создан лейбл
		check	= document.createElement ( 'input' ), // создан ввод
		text		= document.createTextNode ( 'Blink texts' ), // создано пояснение
		ref		= document.querySelector ( '#translabel' ); // поиск места вставки

	css.type = 'text/css';
	blink_checkbox = css;
	if ( ref != null ) ref.insertBefore ( css, null );
	obj.className = 'blinkff';
	check.type = 'checkbox';
	check.checked = blink_mark;
	check.onclick = toggleReveal3;
	obj.appendChild ( check );
	obj.appendChild ( text );
	if ( ref != null ) ref.insertBefore ( obj, null );
	setReveal3 ( blink_mark );
}

/* ВВОДНАЯ */
if ( window.location.href.match ( /[:\/](sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang)[:\/].*\d\d\d\d/i ) != null ) { // запуск в комиксовых разделах сайта
	if ( ( page.querySelectorAll ( ".fn-container, .ct-container" ).length > 0 ) || ( window.location.href.match ( /[\?&]do=edit/i ) != null ) ) { // при наличии переводов или в редакторе
		/* ГАЛОЧКА ОТКЛЮЧЕНИЯ НАКЛЕЕК */
		var folder_cookie = 'fnNotReveal_' + JSINFO.namespace,
			translate_mark = !readCookie ( folder_cookie ),
			translate_style_on = '', // стиль включения
			translate_style_off = '.fn-note, .ct-note { visibility: hidden !important }', // стиль выключения
			translate_checkbox;
		if ( window.addEventListener ) { // W3C стандарт
			window.addEventListener ( 'load', createRevealCheckbox, false ); // NB **not** 'onload'
		} else if ( window.attachEvent ) { // Microsoft стандарт
			window.attachEvent ( 'onload', createRevealCheckbox );
		}
	}

	if ( page.querySelectorAll ( ".fn-container, .ct-container" ).length > 0 ) { // при наличии переводов
		/* ГАЛОЧКА РАСШИРЕНИЯ КОМИКСОВ */
		var folder_cookie1 = 'disZoom_' + JSINFO.namespace,
			zoom_mark = !readCookie ( folder_cookie1 ),
			zoom_style_on = '', // стиль расширения
			zoom_style_off = '.fn-container, .ct-container { margin: 0 auto !important; transform-origin: center top 0 !important; transform: scale(1) !important }', // стиль нормирования
			zoom_checkbox;
		if ( window.addEventListener ) { // W3C стандарт
			window.addEventListener ( 'load', createZoomCheckbox, false ); // NB **not** 'onload'
		} else if ( window.attachEvent ) { // Microsoft стандарт
			window.attachEvent ( 'onload', createZoomCheckbox );
		}
	}

	if ( window.location.href.match ( /[\?&]do=/i ) == null ) { // только на готовых страницах
		/* ГАЛОЧКА ПРИГЛУШЕНИЯ РЕДКИХ КНОПОК НАВИГАТОРА */
		var folder_cookie2 = 'fogNavi_' + JSINFO.namespace,
			fognavi_mark = !readCookie ( folder_cookie2 ),
			fognavi_style_on = '#navver, #navhead, #navtail, #navhor { animation: smooth 5s; opacity: 0.1 } #navprev { animation: smooth2 3s; opacity: 0.5 }', // стиль приглушения
			fognavi_style_off = '#navver, #navhead, #navtail, #navhor, #navprev { animation: none; opacity: 1 !important }', // стиль оярчения
			fognavi_checkbox;
		if ( window.addEventListener ) { // W3C стандарт
			window.addEventListener ( 'load', createFogNaviCheckbox, false ); // NB **not** 'onload'
		} else if ( window.attachEvent ) { // Microsoft стандарт
			window.attachEvent ( 'onload', createFogNaviCheckbox );
		}
	}

	/* ПЛАШКА СТАТУСА ПЕРЕВОДА */
	if (
		page.querySelectorAll ( ".preview" ).length == 0
		&&
		page.querySelectorAll ( ".vshare__none" ).length == 0
		&&
		window.location.href.match ( /[\?&]rev=/i ) == null
	) {
		var media = page.querySelectorAll ( "img.media" );
		if (
			media.length > 0
			&&
			(
				page.querySelectorAll ( ".ct-container" ).length == 0
				&&
				(
					media[0].src != undefined
					&&
					!media[0].src.match ( "webmoney" )
				)
			)
		) {
			var brr = document.createElement ( 'br' );
			brr.style.clear = 'both';
			page.appendChild ( brr );

			var note = document.createElement ( 'div' );
			note.className = 'vycenter ';
			note.innerHTML = '<span class="fest f13">';
			if ( page.querySelectorAll ( ".fn-container" ).length == 0 ) {
				note.className += 'note noteimportant';
				note.innerHTML += line[1];
			} else {
				note.className += 'note notetip';
				note.innerHTML += line[2];
			}
			note.innerHTML += '</span>';
			page.appendChild ( note )
		}
	}
}

/* ГАЛОЧКА МОРГАНИЯ ФРИФОЛА */
if ( window.location.href.match ( /[:\/]en[:\/]sci-fi[:\/]freefall[:\/][dh]?\d\d\d\d/i ) != null ) { // запуск в фрифоле
	var folder_cookie3 = 'blinkFF_' + JSINFO.namespace,
		blink_mark = !readCookie ( folder_cookie3 ),
		blink_style_on = '.f13 { font-size: 1.6em; } .fn-area, .ct-area { animation: mor 2s linear infinite; }', // стиль моргания
		blink_style_off = '.f13 { font-size: 1.3em; } .fn-area, .ct-area { animation: none; }', // стиль неморгания
		blink_checkbox;
	if ( window.addEventListener ) { // W3C стандарт
		window.addEventListener ( 'load', createBlinkCheckbox, false ); // NB **not** 'onload'
	} else if ( window.attachEvent ) { // Microsoft стандарт
		window.attachEvent ( 'onload', createBlinkCheckbox );
	}
}

if ( window.location.href.match ( /[:\/](sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang)[:\/].+[:\/][dh]?\d\d\d\d/i ) != null ) { // запуск в лентах
	var band_title = Array.from ( page.querySelectorAll ( ".plugin_include_content > .level5 > p > strong" ) ).reverse ( );
	for ( i = 0; i < band_title.length - 1; i++ ) {
		if ( band_title[i].innerHTML == band_title[i + 1].innerHTML ) band_title[i].innerHTML = '';
	}
}
