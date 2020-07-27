//ВЕЗДЕ

var i, j;

/* счётчик Яндекса */

( function ( d, w, c ) {
	( w[c] = w[c] || [] ).push ( function ( ) {
		try {
			w.yaCounter25500497 = new Ya.Metrika2 ( {
				id: 25500497,
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
				webvisor: true
			} );
		}
		catch ( e ) { }
	} );
} ) ( document, window, "yandex_metrika_callbacks2" );

/* ( function ( w, d, n ) {
	( w[n] = w[n] || [] ).push ( function ( ) {
		Ya.Context.AdvManager.render ( {
			blockId: "R-A-492328-1",
			renderTo: "yandex_rtb",
			async: true,
			onRender: function ( data ) {
				console.log ( data.product );
			}
		} );
	} );
} ) ( this, this.document, "yandexContextAsyncCallbacks" ); */

/* истребитель двоеточий в адресах */

if ( window.location.pathname.match (/:/i) != null ) window.location.pathname = window.location.pathname.replace ( /:/g, '/' );

/* замена энтити */
function fontChanger ( str, openSB, marker, value, closeSB, offset, s ) {
	var fontValue = parseFloat ( value.replace ( ",", "." ) );
	if ( fontValue > 0 ) {
		switch ( marker ) {
			case '!':
				return '<span style = "font-size: ' + fontValue + 'em">';
				break;
			case '=':
				return '<span style = "line-height: ' + fontValue * 100 + '%; display: inline-block;">';
				break;
			case 'y':
			case 'x':
				return '<p style = "transform: scale' + marker + '(' + fontValue + ');">';
				break;
			default:
				return '<abbr title="Incorrect marker" >' + openSB + marker + value + closeSB + '</abbr>';
				break
		}
	} else {
		return '<abbr title="Incorrect digit" >' + openSB + marker + value + closeSB + '</abbr>'
	}
}
var	notedit = document.querySelectorAll ( ".page > div:not(.editBox):not(.search_fulltextresult):not(.table):not(#batchedit), .export > div" );
for ( i = 0; i < notedit.length; i++ ) {
	notedit[i].innerHTML = notedit[i].innerHTML
		.replace ( /(\[)(.)(-?\d+[\.,]?\d*)(\])/g, fontChanger )
		.replace ( /\[\/\]/g, '</span>' );
}

// ЦЕНТРАЛИЗАЦИЯ КАРТИНОК

/* эскизы перемещённых картинок - удалить привязку к высоте и ширине */

document.querySelectorAll ( ".dokuwiki img:not([src*='fetch'])" ).forEach (
	e => e.src = e.src.replace ( /[wh]=\d+\&?/g, '' ).replace ( /[\?\&]$/g, '' )
);

/* медиаменеджер - перенаправить в папку без языка */

if ( window.location.href.match ( /mediamanager.php\?ns=\w\w\w?%3A(sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang|playground|user)/ ) != null ) {
	var	ns = document.querySelector ( "#media__ns" );
	ns.innerHTML = ns.innerHTML.replace ( /^:\w\w\w?:/, 'Redirect... :' );
	window.location = window.location.toString().replace ( /ns=\w\w\w?%3A/, 'ns=' )
};

/* сайдбар - удалить язык в медиаменеджере */

var sidemedia = document.querySelector ( "#pagetools .media a" );
if ( sidemedia != null ) {
	sidemedia.href = sidemedia.href.replace ( /ns=\w\w\w?%3A/, 'ns=' );
};


// ГЛАВНАЯ, МЕНЮ, ИНДЕКСЫ И Т.П.

/* последние правки и теги - дорисовать /язык/ */

if (
	window.location.href.match ( /(start|showtag|do=search)/ ) != null
) {
	document.querySelectorAll ( ".pagelist a, .taglist a, .search_quickhits a, .search_results a.wikilink1 " ).forEach (
		e => {
			if ( e.href != undefined ) e.innerHTML = e.href.substr ( 23, 4 ).split( '/' )[0].toUpperCase() + ' / ' + e.innerHTML
		}
	)
};

/* на главной - выровнять первые 2 бокса */

if ( window.location.href.match ( /\/start/i ) ) { // запуск на главной
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

/* меню - пакование в колонки */

var	page = document.querySelector ( ".page" ), /* требуется начиная отсюда, используется и дальше */
	pagewidth = page.offsetWidth - 3;

if ( window.location.href.match ( /\/menu(\?rev.+)?$/i ) !== null ) { // запуск в меню
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

/* индексы - количественные окончания 1/2/5 стрип/а/ов */

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

var fix_notes = document.querySelectorAll ( ".note" );
for ( i = 0; i < fix_notes.length; i++ )  {
	var e = fix_notes[i].innerHTML;
	if ( e != null ) {
		var et = e.match ( / (0*(\d+)).*(стрипов)/ );
		if ( et != null ) fix_notes[i].innerHTML = e.replace ( et[1], et[2] ).replace ( et[3], getNumEnding ( et[2], ['стрип', 'стрипа', 'стрипов'] ) );
	}
};

/* архив новостей - раскрыть последний спойлер, скрыть "красные" месяцы */

var boxnews = document.querySelector ( ".box.news .spoiler:last-of-type" );
if ( boxnews != null ) { // запуск
	boxnews.querySelector ( "input" ).click();
	boxnews.querySelectorAll ( "li > .li > .wikilink2" ).forEach ( e => e.parentNode.parentNode.style.display = "none" );
}

// ПОЧТИ ВЕЗДЕ

/* [[ссылка]]ми */

document.querySelectorAll ( ".page a.wikilink1, .page a.wikilink2" ).forEach (
	e => {
		if ( e.parentElement != null ) {
			e.parentElement.innerHTML = e.parentElement.innerHTML.replace ( /(<\/a>)([a-zа-ё\']+)/gi, "$2$1" )
		}
	}
);

/* транслятор - красные ссылки ведут в редактор */

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
			'Затуманіў навігатар',
			'Афарбавана'
		],
		'bg': [
			'Показване на превод',
			'В тази лента няма етикети!<br>Можете да поправите това, като <a href="?do=edit">редактирате страницата</a> с <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=bg" target=_blank>CoTAN</a>',
			'Тази лента има остарял синтаксис на AIMG<br>Можете да поправите това, като <a href="?do=edit">преработите страницата</a> с <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=bg" target=_blank>CoTAN</a>',
			'Ширина на екрана',
			'Навигатор за мъгла',
			'Боядисан'
		],
		'da': [
			'Vis oversættelse',
			'Der er ingen klistermærker i denne stribe!<br>Du kan rette dette ved at <a href="?do=edit">redigere siden</a> med <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=da" target=_blank>CoTAN</a>',
			'Denne stribe har forældet AIMG syntaks<br>Du kan løse dette ved at <a href="?do=edit">remake siden</a> med <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=da" target=_blank>CoTAN</a>',
			'Skærmbredde',
			'Tåge navigator',
			'Malet'
		],
		'de': [
			'Übersetzung anzeigen',
			'In diesem Streifen befinden sich keine Aufkleber!<br>Sie können dies beheben, indem Sie die Seite mit <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=de" target=_blank>CoTAN</a> <a href="?do=edit">bearbeiten</a>',
			'Dieser Strip hat eine veraltete AIMG-Syntax<br>Sie können dies beheben, indem Sie die Seite mit <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=de" target=_blank>CoTAN</a> <a href="?do=edit">überarbeiten</a>',
			'Bildschirmbreite',
			'Nebel-Navigator',
			'Gemalt'
		],
		'el': [
			'εμφάνιση μετάφρασης',
			'Δεν υπάρχουν αυτοκόλλητα στην ταινία!<br>Μπορείτε να διορθώσετε αυτό με την επεξεργασία της σελίδας με το <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=el" target=_blank>CoTAN</a>',
			'Αυτή η λωρίδα έχει ξεπερασμένη σύνταξη AIMG<br>Μπορείτε να το διορθώσετε επανατοποθετώντας τη σελίδα με το <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=el" target=_blank>CoTAN</a>',
			'Πλάτος οθόνης',
			'Πλοηγός ομίχλης',
			'Βαμμένο'
		],
		'en': [
			'Show translation',
			'There are no stickers on this strip!<br>You can fix this by <a href="?do=edit">editing this page</a> with <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=en" target=_blank>CoTAN</a>',
			'This strip has outdated AIMG syntax<br>You can fix this by <a href="?do=edit">remaking this page</a> with <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=en" target=_blank>CoTAN</a>',
			'Screen width',
			'Fog navigator',
			'Painted'
		],
		'eo': [
			'Montri tradukojn',
			'Ne estas glumarkoj en ĉi tiu strio!<br>Vi povas solvi ĉi tion <a href="?do=edit">redaktante la paĝon</a> kun <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=eo" target=_blank>CoTAN</a>',
			'Ĉi tiu strio havas malaktualan sintakson de AIMG<br>Vi povas solvi ĉi tion <a href="?do=edit">refarante la paĝon</a> kun <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=eo" target=_blank>CoTAN</a>',
			'Larĝa ekrano',
			'Nebula navigilo',
			'Pentrita'
		],
		'es': [
			'Mostrar traducción',
			'¡No hay pegatinas en esta tira!<br>Puedes arreglar esto <a href="?do=edit">editando esta página</a> con <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=es" target=_blank>CoTAN</a>',
			'Esta tira ha caducado la sintaxis de AIMG<br>Puedes arreglar esto <a href="?do=edit">rehaciendo esta página</a> con <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=es" target=_blank>CoTAN</a>',
			'Ancho de pantalla',
			'Navegador de niebla',
			'Pintado'
		],
		'fi': [
			'Näytä käännös',
			'Tässä nauhassa ei ole tarroja!<br>Voit korjata tämän <a href="?do=edit">muokkaamalla sivua</a> <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=fi" target=_blank>CoTANin</a> avulla',
			'Tällä nauhalla on vanhentunut AIMG-syntaksi<br>Voit korjata tämän <a href="?do=edit">korjaamalla sivun</a> <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=fi" target=_blank>CoTANin</a> avulla',
			'Näytön leveys',
			'Sumuavigaattori',
			'Maalannut'
		],
		'fr': [
			'Afficher la traduction',
			'Il n\'y a pas d\'autocollants dans cette bande!<br>Vous pouvez résoudre ce problème en <a href="?do=edit">modifiant cette page</a> avec <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=fr" target=_blank>CoTAN</a>',
			'Cette bande a une syntaxe AIMG obsolète<br>Vous pouvez résoudre ce problème en <a href="?do=edit">refaisant cette page</a> avec <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=fr" target=_blank>CoTAN</a>',
			'Largeur de l\'écran',
			'Navigateur de brouillard',
			'Peint'
		],
		'he': [
			'הצג תרגום',
			'אין מדבקות ברצועה זו!<br>באפשרותך לתקן זאת על-ידי <a href="?do=edit">עריכת הדף</a> באמצעות <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=he" target=_blank>CoTAN</a>',
			'ברצועה זו יש תחביר AIMG מיושן<br>אתה יכול לתקן את זה על ידי <a href="?do=edit"> עיבוד מחדש של דף זה </a> באמצעות <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=he" target=_blank>CoTAN</a>',
			'רוחב המסך',
			'נווט ערפל',
			'צבוע'
		],
		'hi': [
			'अनुवाद दिखाएं',
			'इस पट्टी में कोई स्टिकर नहीं हैं!<br>आप <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=hi" target=_blank>CoTAN</a> के साथ <a href="?do=edit">पेज को एडिट</a> करके इसे ठीक कर सकते हैं',
			'इस स्ट्रिप में AIMG सिंटैक्स पुराना है<br>आप <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=hi" target=_blank>CoTAN</a> के साथ <a href="?do=edit">पेज को रीमेक</a> करके इसे ठीक कर सकते हैं',
			'स्क्रीन की चौड़ाई',
			'फॉग नाविक',
			'पेंट'
		],
		'id': [
			'Tampilkan terjemahan',
			'Tidak ada stiker di strip ini!<br>Anda dapat memperbaikinya dengan <a href="?do=edit">mengedit halaman</a> dengan <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=id" target=_blank>CoTAN</a>',
			'Strip ini telah usang sintaks AIMG<br>Anda dapat memperbaikinya dengan <a href="?do=edit">membuat ulang halaman</a> dengan <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=id" target=_blank>CoTAN</a>',
			'Lebar layar',
			'Navigator kabut',
			'Dicat'
		],
		'it': [
			'Mostra traduzione',
			'Non ci sono adesivi in questa striscia!<br>Puoi sistemarlo <a href="?do=edit">modificando questa pagina</a> con <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=it" target=_blank>CoTAN</a>',
			'Questa striscia ha una sintassi AIMG obsoleta<br>Puoi sistemarlo <a href="?do=edit">rifacendo questa pagina</a> con <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=it" target=_blank>CoTAN</a>',
			'Larghezza dello schermo',
			'Nebulizzatore',
			'Dipinto'
		],
		'ja': [
			'翻訳を表示する',
			'このストリップにはステッカーがありません！<br>あなたは<a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=ja" target=_blank>CoTAN</a>で<a href="?do=edit">このページを編集することによって</a>これを直すことができます',
			'このストリップはAIMGの構文が古くなっています<br>あなたは<a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=ja" target=_blank>CoTAN</a>で<a href="?do=edit">このページを作り直すことによって</a>これを直すことができます',
			'画面幅',
			'霧ナビゲーター',
			'塗装済み'
		],
		'ko': [
			'번역보기',
			'이 스트립에는 스티커가 없습니다!<br><a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=ko" target=_blank>CoTAN</a>으로 <a href="?do=edit">페이지를 편집하여</a> 문제를 해결할 수 있습니다',
			'이 스트립은 구식 AIMG 구문을 가지고 있습니다.<br><a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=ko" target=_blank>CoTAN</a>을 사용하여 <a href="?do=edit">페이지를 다시 작성하면</a> 문제를 해결할 수 있습니다',
			'화면 너비',
			'안개 네비게이터',
			'그린'
		],
		'pl': [
			'Pokaż tłumaczenie',
			'Na tym pasku nie ma naklejek!<br>Możesz to naprawić, <a href="?do=edit">edytując tę stronę</a> za pomocą <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=pl" target=_blank>CoTAN</a>',
			'Ten pasek ma przestarzałą składnię AIMG<br>Możesz to naprawić, <a href="?do=edit">przerabiając tę stronę</a> za pomocą <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=pl" target=_blank>CoTAN</a>',
			'Szerokość ekranu',
			'Nawigator mgły',
			'Malowane'
		],
		'pt': [
			'Mostrar tradução',
			'Não há adesivos nesta faixa!<br>Você pode corrigir isso <a href="?do=edit">editando esta página</a> com o <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=pt" target=_blank>CoTAN</a>',
			'Esta faixa tem uma sintaxe desatualizada do AIMG<br>Você pode consertar isso <a href="?do=edit">refazendo esta página</a> com o <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=pt" target=_blank>CoTAN</a>',
			'Largura da tela',
			'Navegador de nevoeiro',
			'Pintado'
		],
		'ru': [
			'Показать перевод',
			'В этом выпуске нет наклеек!<br>Вы можете исправить это, <a href="?do=edit">отредактировав страницу</a> с помощью <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=ru" target=_blank>CoTAN</a>',
			'В этом выпуске устаревший синтаксис AIMG<br>Вы можете исправить это, <a href="?do=edit">переделав страницу</a> с помощью <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=ru" target=_blank>CoTAN</a>',
			'По ширине экрана',
			'Затуманить навигатор',
			'Окрашено'
		],
		'uk': [
			'Показати переклад',
			'У цій смузі немає жодних наклейок!<br>Ви можете виправити це, <a href="?do=edit">відредагувавши цю сторінку</a> за допомогою <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=uk" target=_blank>CoTAN</a>',
			'Ця смуга має застарілий синтаксис AIMG<br>Ви можете виправити це, переробивши цю сторінку за допомогою <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=uk" target=_blank>CoTAN</a>',
			'По ширині екрану',
			'Затуманити навігатор',
			'Забарвлене'
		],
		'zh': [
			'显示翻译',
			'这条带上没有贴纸！<br>您可以通过<a href="?do=edit">使用</a><a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=zh" target=_blank>CoTAN</a>编辑页面来解决此问题',
			'这个条带已经过时了AIMG语法<br>您可以通过<a href="?do=edit">使用</a><a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=zh" target=_blank>CoTAN</a>重新构建页面来解决此问题',
			'屏幕宽度',
			'雾导航器',
			'彩绘'
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
		span		= document.createElement ( 'span' ), // создано пояснение
		text		= document.createTextNode ( line[0] ), // создан текст пояснения
		ref		= document.querySelector ( '#translabel' ); // поиск места вставки

	css.type = 'text/css';
	translate_checkbox = css;
	if ( ref != null ) ref.insertBefore ( css, null );
	obj.accessKey = 't';
	obj.className = 'optcheck reveal_check';
	check.type = 'checkbox';
	check.checked = translate_mark;
	check.onclick = toggleReveal;
	obj.appendChild ( check );
	obj.appendChild ( span );
	span.appendChild ( text );
	if ( ref != null ) ref.insertBefore ( obj, null );
	setReveal ( translate_mark );
}

/* ГАЛОЧКА РАСШИРЕНИЯ КОМИКСОВ */
function piczoom ( set ) {
	var ctc = page.querySelectorAll ( ".page > * > .ct-container, .page > * > .fn-container, .page > * > * > .ct-container, .page > * > * > .fn-container" );
	for ( i = 0; i < ctc.length; i++ ) {
		var img = ctc[i].querySelector ( "img" ); // !
		var scale = pagewidth / img.width,
			margin = ( scale - 1 ) * img.height + 10;
		ctc[i].style.transform = ( set == true ) ? "scale(" + scale + ")" : "";
		ctc[i].style.marginBottom = ( set == true ) ? margin + "px" : "";
		ctc[i].style.transformOrigin = ( set == true ) ? ( ( scale < 1 ) ? 'left top 0' : 'center top 0' ) : 'center top 0' ;
	}
}

function setReveal1 ( set ) { // синхронизация переменных
	zoom_mark = set;
	( zoom_mark == true ) ? eraseCookie ( folder_cookie1 ) : createCookie ( folder_cookie1, false, 9999 );
	piczoom ( zoom_mark );
}

function toggleReveal1 ( ) { // переключатель() галочки
	setReveal1 ( !zoom_mark );
}

function createZoomCheckbox ( ) { // создатель() галочки
	var obj		= document.createElement ( 'label' ), // создан лейбл
		check	= document.createElement ( 'input' ), // создан ввод
		span		= document.createElement ( 'span' ), // создано пояснение
		text		= document.createTextNode ( line[3] ), // создан текст пояснения
		ref		= document.querySelector ( '#translabel' ); // поиск места вставки

	obj.className = 'optcheck zoom_check';
	check.type = 'checkbox';
	check.checked = zoom_mark;
	check.onclick = toggleReveal1;
	obj.appendChild ( check );
	obj.appendChild ( span );
	span.appendChild ( text );
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
		span		= document.createElement ( 'span' ), // создано пояснение
		text		= document.createTextNode ( line[4] ), // создан текст пояснения
		ref		= document.querySelector ( '#translabel' ); // поиск места вставки

	css.type = 'text/css';
	fognavi_checkbox = css;
	if ( ref != null ) ref.insertBefore ( css, null );
	obj.className = 'optcheck fognavi_check';
	check.type = 'checkbox';
	check.checked = fognavi_mark;
	check.onclick = toggleReveal2;
	obj.appendChild ( check );
	obj.appendChild ( span );
	span.appendChild ( text );
	if ( ref != null ) ref.insertBefore ( obj, null );
	setReveal2 ( fognavi_mark );
}

/* ГАЛОЧКА ОБЕСЦВЕЧИВАНИЯ ФРИФОЛА */
function setReveal4 ( set ) { // синхронизация переменных
	color_mark = set;
	color_checkbox.innerHTML = color_mark ? color_style_on : color_style_off;
	( color_mark == true ) ? eraseCookie ( folder_cookie4 ) : createCookie ( folder_cookie4, false, 9999 );
}

function toggleReveal4 ( ) { // переключатель() галочки
	setReveal4 ( !color_mark );
}

function createColorCheckbox ( ) { // создатель() галочки
	var css 	= document.createElement ( 'style' ),
		obj		= document.createElement ( 'label' ), // создан лейбл
		check	= document.createElement ( 'input' ), // создан ввод
		span		= document.createElement ( 'span' ), // создано пояснение
		text		= document.createTextNode ( line[5] ), // создан текст пояснения
		ref		= document.querySelector ( '#translabel' ); // поиск места вставки

	css.type = 'text/css';
	color_checkbox = css;
	if ( ref != null ) ref.insertBefore ( css, null );
	obj.className = 'optcheck color_check';
	check.type = 'checkbox';
	check.checked = color_mark;
	check.onclick = toggleReveal4;
	obj.appendChild ( check );
	obj.appendChild ( span );
	span.appendChild ( text );
	if ( ref != null ) ref.insertBefore ( obj, null );
	setReveal4 ( color_mark );
}

/* ВВОДНАЯ */
if ( window.location.href.match ( /\/(sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang)\/.*(\d\d+|vol\d+|ch\d+|cover\d*)/i ) != null ) { // запуск в комиксовых разделах сайта
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
			zoom_mark = !readCookie ( folder_cookie1 );
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

		if ( window.location.href.match ( /sci-fi.freefall/i ) != null ) { // запуск в фрифоле
			/* ГАЛОЧКА ОБЕСЦВЕЧИВАНИЯ ФРИФОЛА */
			var folder_cookie4 = 'colorFF_' + JSINFO.namespace,
				color_mark = !readCookie ( folder_cookie4 ),
				color_style_on = '', // стиль раскрасок
				color_style_off = '.fn-note-content span, .ct-note-content span { color: black }', // стиль побелки
				color_checkbox;
			if ( window.addEventListener ) { // W3C стандарт
				window.addEventListener ( 'load', createColorCheckbox, false ); // NB **not** 'onload'
			} else if ( window.attachEvent ) { // Microsoft стандарт
				window.attachEvent ( 'onload', createColorCheckbox );
			}
		}
	}

	/* плашка статуса перевода */
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
			var note = document.createElement ( 'div' ),
				span = document.createElement ( 'span' ),
				fncon = page.querySelectorAll ( ".fn-container" );

			note.style.marginTop = '1.5em';
			note.className = 'vycenter note note' + ( ( fncon.length == 0 ) ? 'important' : 'tip' );
			page.appendChild ( note );

			span.style.fontSize = '1.3em';
			span.className = 'fest';
			span.innerHTML = ( fncon.length == 0 ? line[1] : line[2] );
			note.appendChild ( span );
		}
	}

	/* в лентах - сокращение лишних титулов выпусков */
	if ( window.location.href.match ( /\/(d|h)\d\d\d\d/i ) != null ) { // запуск в лентах
		var band_title = Array.from ( page.querySelectorAll ( ".plugin_include_content > .level5 > p > strong" ) ).reverse ( );
		for ( i = 0; i < band_title.length - 1; i++ ) {
			if ( band_title[i].innerHTML == band_title[i + 1].innerHTML ) band_title[i].innerHTML = '';
		}
	}
}
