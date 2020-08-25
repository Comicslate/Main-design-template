// ver. 2020.08.25 23:35 GMT+10
//ВЕЗДЕ

var i, j;

/* счётчик Яндекса */

if ( window.location.href.match ( /do=edit/i ) == null ) { // запуск не в редакторе
	( function ( d, w, c ) {
		( w [ c ] = w [ c ] || [ ] ).push ( function ( ) {
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
	} ) ( document, window, "yandex_metrika_callbacks2" )
};

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
				return '<p style = "transform: scale' + marker + '(' + fontValue + '); display: inline-block;">';
				break;
			default:
				return '<abbr title="Incorrect marker" >' + openSB + marker + value + closeSB + '</abbr>';
				break
		}
	} else {
		return '<abbr title="Incorrect digit" >' + openSB + marker + value + closeSB + '</abbr>'
	}
}
var notedit = document.querySelectorAll ( ".page > div:not(.editBox):not(.search_fulltextresult):not(.table):not(#batchedit), .export > div" );
for ( i = 0; i < notedit.length; i++ ) {
	notedit [ i ].innerHTML = notedit [ i ].innerHTML
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
	var ns = document.querySelector ( "#media__ns" );
	ns.innerHTML = ns.innerHTML.replace ( /^:\w\w\w?:/, 'Redirect... :' );
	window.location = window.location.toString ( ).replace ( /ns=\w\w\w?%3A/, 'ns=' )
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
			if ( e.href != undefined ) e.innerHTML = e.href.substr ( 23, 4 ).split( '/' ) [ 0 ].toUpperCase ( ) + ' / ' + e.innerHTML
		}
	)
};

/* на главной - выровнять первые 2 бокса */

if ( window.location.href.match ( /\/start/i ) ) { // запуск на главной
	var box = document.querySelectorAll ( '.level1 > .box' );
	if ( box.length >= 2 ) {
		var left = box [ 0 ],
			right = box [ 1 ],
			left_h = Math.max ( 600, left.offsetHeight ),
			right_h = Math.max ( 600, right.offsetHeight );
		right.style.cssText += " height: " + Math.min ( right_h, left_h ) + "px; margin: 0;";
		left.style.cssText += " height: " + Math.min ( right_h, left_h ) + "px; margin: 0;";
	};
};

/* меню - пакование в колонки */

if ( window.location.href.match ( /\/menu(\?rev.+)?$/i ) !== null ) { // запуск в меню
	var menu_col_ul = document.querySelectorAll ( '.page ul' ),
		menu_col_div,
		menu_col_div_sizes = [ ];
	for ( i = 0; i < menu_col_ul.length; i++ ) {
		if ( i != 3 ) { // исключая Интерробанг Студию
			menu_col_div = menu_col_ul [ i ].querySelectorAll ( 'div.li' );
			for ( j = 0; j < menu_col_div.length; j++ ) {
				menu_col_div [ j ].style.display = "inline"; // приведение дивов к строчному виду
				menu_col_div_sizes.push ( menu_col_div [ j ].offsetWidth ) // заполнение массива их размерами
			}
		}
	};
	var menu_col_div_size_max = Math.max.apply ( null, menu_col_div_sizes ); // определение наибольшего дива
	for ( i in menu_col_ul ) {
		if ( i != 3 && menu_col_ul [ i ].style ) menu_col_ul [ i ].style.cssText += " columns: " + menu_col_div_size_max + "px auto; column-gap: 20px;" // адаптивные колонки
	}
};

/* индексы - количественные окончания 1/2/5 стрип/а/ов */

function getNumEnding ( num, ends ) {
	if (
		num % 100 >= 11
		&&
		num % 100 <= 19
	) {
		return ends [ 2 ];
	} else {
		switch ( num % 10 ) {
			case ( 1 ): return ends [ 0 ];
			case ( 2 ):
			case ( 3 ):
			case ( 4 ): return ends [ 1 ];
			default: return ends [ 2 ];
		}
	}
};
var fix_notes = document.querySelectorAll ( ".page .note" );
for ( i = 0; i < fix_notes.length; i++ )  {
	var e = fix_notes [ i ].innerHTML;
	if ( e != null ) {
		var et = e.match ( / (0*(\d+)).*(стрипов)/ );
		if ( et != null ) fix_notes [ i ].innerHTML = e.replace ( et [ 1 ], et [ 2 ] ).replace ( et [ 3 ], getNumEnding ( et [ 2 ], [ 'стрип', 'стрипа', 'стрипов' ] ) );
	}
};

/* архив новостей - раскрыть последний спойлер, скрыть "красные" месяцы */

var boxnews = document.querySelector ( ".box.news .spoiler:last-of-type" );
if ( boxnews != null ) { // запуск
	boxnews.querySelector ( "input" ).click ( );
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

if ( document.querySelector ( '.plugin_translation .wikilink2 ') != null ) {
	document.querySelectorAll ( ".plugin_translation .wikilink2:not([href$='do=edit'])" ).forEach (
		function (e) {
			e.href += '?do=edit'
		}
	)
};

// В КОМИКСОВЫХ РАЗДЕЛАХ САЙТА

if ( window.location.href.match ( /\/(sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang)\/.*(\d+|cover|pro)/i ) != null ) {
	var page = document.querySelector ( ".page" );

	/* плашка статуса перевода */

	var lang = NS.split ( ':', 2 ) [ 0 ],
		line = [ ],
		lines = {
			'be': [
				'У гэтай паласе няма налепак!<br>Вы можаце выправіць гэта, <a href="?do=edit">адрэдагаваўшы старонку</a> з дапамогай <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=be" target=_blank>CoTAN</a>',
				'У гэтай паласе састарэлы сінтаксіс AIMG<br>Вы можаце выправіць гэта, <a href="?do=edit">перарабіўшы старонку</a> з дапамогай <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=be" target=_blank>CoTAN</a>',
			],
			'bg': [
				'В тази лента няма етикети!<br>Можете да поправите това, като <a href="?do=edit">редактирате страницата</a> с <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=bg" target=_blank>CoTAN</a>',
				'Тази лента има остарял синтаксис на AIMG<br>Можете да поправите това, като <a href="?do=edit">преработите страницата</a> с <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=bg" target=_blank>CoTAN</a>',
			],
			'da': [
				'Der er ingen klistermærker i denne stribe!<br>Du kan rette dette ved at <a href="?do=edit">redigere siden</a> med <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=da" target=_blank>CoTAN</a>',
				'Denne stribe har forældet AIMG syntaks<br>Du kan løse dette ved at <a href="?do=edit">remake siden</a> med <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=da" target=_blank>CoTAN</a>',
			],
			'de': [
				'In diesem Streifen befinden sich keine Aufkleber!<br>Sie können dies beheben, indem Sie die Seite mit <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=de" target=_blank>CoTAN</a> <a href="?do=edit">bearbeiten</a>',
				'Dieser Strip hat eine veraltete AIMG-Syntax<br>Sie können dies beheben, indem Sie die Seite mit <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=de" target=_blank>CoTAN</a> <a href="?do=edit">überarbeiten</a>',
			],
			'el': [
				'Δεν υπάρχουν αυτοκόλλητα στην ταινία!<br>Μπορείτε να διορθώσετε αυτό με την επεξεργασία της σελίδας με το <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=el" target=_blank>CoTAN</a>',
				'Αυτή η λωρίδα έχει ξεπερασμένη σύνταξη AIMG<br>Μπορείτε να το διορθώσετε επανατοποθετώντας τη σελίδα με το <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=el" target=_blank>CoTAN</a>',
			],
			'en': [
				'There are no stickers on this strip!<br>You can fix this by <a href="?do=edit">editing this page</a> with <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=en" target=_blank>CoTAN</a>',
				'This strip has outdated AIMG syntax<br>You can fix this by <a href="?do=edit">remaking this page</a> with <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=en" target=_blank>CoTAN</a>',
			],
			'eo': [
				'Ne estas glumarkoj en ĉi tiu strio!<br>Vi povas solvi ĉi tion <a href="?do=edit">redaktante la paĝon</a> kun <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=eo" target=_blank>CoTAN</a>',
				'Ĉi tiu strio havas malaktualan sintakson de AIMG<br>Vi povas solvi ĉi tion <a href="?do=edit">refarante la paĝon</a> kun <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=eo" target=_blank>CoTAN</a>',
			],
			'es': [
				'¡No hay pegatinas en esta tira!<br>Puedes arreglar esto <a href="?do=edit">editando esta página</a> con <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=es" target=_blank>CoTAN</a>',
				'Esta tira ha caducado la sintaxis de AIMG<br>Puedes arreglar esto <a href="?do=edit">rehaciendo esta página</a> con <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=es" target=_blank>CoTAN</a>',
			],
			'fi': [
				'Tässä nauhassa ei ole tarroja!<br>Voit korjata tämän <a href="?do=edit">muokkaamalla sivua</a> <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=fi" target=_blank>CoTANin</a> avulla',
				'Tällä nauhalla on vanhentunut AIMG-syntaksi<br>Voit korjata tämän <a href="?do=edit">korjaamalla sivun</a> <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=fi" target=_blank>CoTANin</a> avulla',
			],
			'fr': [
				'Il n\'y a pas d\'autocollants dans cette bande!<br>Vous pouvez résoudre ce problème en <a href="?do=edit">modifiant cette page</a> avec <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=fr" target=_blank>CoTAN</a>',
				'Cette bande a une syntaxe AIMG obsolète<br>Vous pouvez résoudre ce problème en <a href="?do=edit">refaisant cette page</a> avec <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=fr" target=_blank>CoTAN</a>',
			],
			'he': [
				'אין מדבקות ברצועה זו!<br>באפשרותך לתקן זאת על-ידי <a href="?do=edit">עריכת הדף</a> באמצעות <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=he" target=_blank>CoTAN</a>',
				'ברצועה זו יש תחביר AIMG מיושן<br>אתה יכול לתקן את זה על ידי <a href="?do=edit"> עיבוד מחדש של דף זה </a> באמצעות <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=he" target=_blank>CoTAN</a>',
			],
			'hi': [
				'इस पट्टी में कोई स्टिकर नहीं हैं!<br>आप <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=hi" target=_blank>CoTAN</a> के साथ <a href="?do=edit">पेज को एडिट</a> करके इसे ठीक कर सकते हैं',
				'इस स्ट्रिप में AIMG सिंटैक्स पुराना है<br>आप <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=hi" target=_blank>CoTAN</a> के साथ <a href="?do=edit">पेज को रीमेक</a> करके इसे ठीक कर सकते हैं',
			],
			'id': [
				'Tidak ada stiker di strip ini!<br>Anda dapat memperbaikinya dengan <a href="?do=edit">mengedit halaman</a> dengan <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=id" target=_blank>CoTAN</a>',
				'Strip ini telah usang sintaks AIMG<br>Anda dapat memperbaikinya dengan <a href="?do=edit">membuat ulang halaman</a> dengan <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=id" target=_blank>CoTAN</a>',
			],
			'it': [
				'Non ci sono adesivi in questa striscia!<br>Puoi sistemarlo <a href="?do=edit">modificando questa pagina</a> con <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=it" target=_blank>CoTAN</a>',
				'Questa striscia ha una sintassi AIMG obsoleta<br>Puoi sistemarlo <a href="?do=edit">rifacendo questa pagina</a> con <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=it" target=_blank>CoTAN</a>',
			],
			'ja': [
				'このストリップにはステッカーがありません！<br>あなたは<a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=ja" target=_blank>CoTAN</a>で<a href="?do=edit">このページを編集することによって</a>これを直すことができます',
				'このストリップはAIMGの構文が古くなっています<br>あなたは<a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=ja" target=_blank>CoTAN</a>で<a href="?do=edit">このページを作り直すことによって</a>これを直すことができます',
			],
			'ko': [
				'이 스트립에는 스티커가 없습니다!<br><a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=ko" target=_blank>CoTAN</a>으로 <a href="?do=edit">페이지를 편집하여</a> 문제를 해결할 수 있습니다',
				'이 스트립은 구식 AIMG 구문을 가지고 있습니다.<br><a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=ko" target=_blank>CoTAN</a>을 사용하여 <a href="?do=edit">페이지를 다시 작성하면</a> 문제를 해결할 수 있습니다',
			],
			'pl': [
				'Na tym pasku nie ma naklejek!<br>Możesz to naprawić, <a href="?do=edit">edytując tę stronę</a> za pomocą <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=pl" target=_blank>CoTAN</a>',
				'Ten pasek ma przestarzałą składnię AIMG<br>Możesz to naprawić, <a href="?do=edit">przerabiając tę stronę</a> za pomocą <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=pl" target=_blank>CoTAN</a>',
			],
			'pt': [
				'Não há adesivos nesta faixa!<br>Você pode corrigir isso <a href="?do=edit">editando esta página</a> com o <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=pt" target=_blank>CoTAN</a>',
				'Esta faixa tem uma sintaxe desatualizada do AIMG<br>Você pode consertar isso <a href="?do=edit">refazendo esta página</a> com o <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=pt" target=_blank>CoTAN</a>',
			],
			'ru': [
				'В этом выпуске нет наклеек!<br>Вы можете исправить это, <a href="?do=edit">отредактировав страницу</a> с помощью <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=ru" target=_blank>CoTAN</a>',
				'В этом выпуске устаревший синтаксис AIMG<br>Вы можете исправить это, <a href="?do=edit">переделав страницу</a> с помощью <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=ru" target=_blank>CoTAN</a>',
			],
			'uk': [
				'У цій смузі немає жодних наклейок!<br>Ви можете виправити це, <a href="?do=edit">відредагувавши цю сторінку</a> за допомогою <a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=uk" target=_blank>CoTAN</a>',
				'Ця смуга має застарілий синтаксис AIMG<br>Ви можете виправити це, переробивши цю сторінку за допомогою <a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=uk" target=_blank>CoTAN</a>',
			],
			'zh': [
				'这条带上没有贴纸！<br>您可以通过<a href="?do=edit">使用</a><a href="https://www.youtube.com/embed/Kb1CWfnKQlo?hl=zh" target=_blank>CoTAN</a>编辑页面来解决此问题',
				'这个条带已经过时了AIMG语法<br>您可以通过<a href="?do=edit">使用</a><a href="https://www.youtube.com/embed/glYz4eY9IzE?hl=zh" target=_blank>CoTAN</a>重新构建页面来解决此问题',
			],
			'default': [ ]
		};
	lines.default = lines [ 'en' ];
	for ( i in lines.default ) { line [ i ] = lines[lang] [ i ] || lines.default [ i ] };
	if (
		page.querySelector ( ".preview" ) == null
		&&
		page.querySelector ( ".vshare__none" ) == null
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
					media [ 0 ].src != undefined
					&&
					!media [ 0 ].src.match ( "webmoney" )
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
			span.innerHTML = ( fncon.length == 0 ? line [ 0 ] : line [ 1 ] );
			note.appendChild ( span );
		}
	}

	/* в лентах - сокращение лишних титулов выпусков */

	if ( window.location.href.match ( /\/(d|h)\d+/i ) != null ) {
		var band_title = Array.from ( page.querySelectorAll ( ".plugin_include_content > .level5 > p > strong" ) ).reverse ( );
		for ( i = 0; i < band_title.length - 1; i++ ) {
			if ( band_title [ i ].innerHTML == band_title[ i + 1 ].innerHTML ) band_title [ i ].innerHTML = '';
		}
	}
}
