console . log ( 'DokuScripts ver. 2021.08.09 21:31 GMT+9' );

//ВЕЗДЕ

var i, j,
	lang = JSINFO [ 'lang' ],
	lhref = window . location . href,
	lpath = window . location . pathname;
if ( lang . length > 3 ) lang = '';

/* реклама Яндекса */
if ( window . yaContextCb != undefined ) {
	window . yaContextCb . push ( ( ) => {
		Ya . Context . AdvManager . render ( {
			renderTo: 'yandex_rtb_R-A-492328-1',
			blockId: 'R-A-492328-1'
		} )
	} );
};

/* истребитель двоеточий в адресах */
if ( lpath . match ( /:/i ) != null ) window . location . pathname = lpath . replace ( /:/g, '/' );

/* замена энтити */
function fontChanger ( str, openSB, marker, value, closeSB, offset, s ) {
	var fontValue = parseFloat ( value . replace ( ",", "." ) );
	if ( fontValue > 0 ) {
		switch ( marker ) {
			case '!':
				return '<span style = "font-size: ' + fontValue + 'em; display: inline-block;">';
				break;
			case '=':
				return '<span style = "line-height: ' + fontValue * 100 + '%; display: inline-block;">';
				break;
			case '_':
				if ( fontValue > 1500 ) fontValue = 1500;
				return '<span style = "width: ' + fontValue + 'px; display: inline-block;"></span>';
				break;
			case 'y':
			case 'x':
				return '<span style = "transform: scale' + marker + '(' + fontValue + '); display: inline-block;">';
				break;
			default:
				return '<abbr title="Incorrect marker" >' + openSB + marker + value + closeSB + '</abbr>';
				break
		}
	} else {
		return '<abbr title = "Incorrect digit" >' + openSB + marker + value + closeSB + '</abbr>'
	}
};
var notedit = document . querySelectorAll ( '.page > div:not(.editBox):not(.search_fulltextresult):not(.table):not(#batchedit), .export > div' );
if ( notedit ) {
	for ( i = 0; i < notedit . length; i++ ) {
		notedit [ i ] . innerHTML = notedit [ i ] . innerHTML . replace ( /(\[)(.)(\d+[\.,]?\d*)(\])/g, fontChanger ) . replace ( /\[\/\]/g, '</span>' );
	}
};

// ПОЧТИ ВЕЗДЕ

/* [[ссылка]]ми */
document . querySelectorAll ( '.page a.wikilink1, .page a.wikilink2, .page a.urlextern, .page a.interwiki' ) . forEach ( e => {
	if ( e . parentElement != null ) e . parentElement . innerHTML = e . parentElement . innerHTML . replace ( /(<\/a>)([a-zа-ё\']+)/gi, "$2$1" );
} );

/* \\ br, -. &shy; */
document . querySelectorAll ( '.page a.wikilink1, .page a.wikilink2, .page a.urlextern, .page a.interwiki' ) . forEach ( e => {
	if ( e != null ) {
		e . innerHTML = e . innerHTML . replace ( /\\\\/gi, "<br>" ) . replace ( /\-\./gi, "&shy;" );
		e . href = e . href . replace ( /\\\\/gi, "" ) . replace ( /\-\./gi, "" );
		e . title = e . title . replace ( /\\\\/gi, "" ) . replace ( /\-\./gi, "" );
	}
} );

/* язык в титулах (кроме тегов) */
if (
	lang != ''
	&&
	!lhref . match ( /\/tag\//i )
) {
	var ltitle = document . querySelector ( '.page > h1, .page > h2, .page > h3, .page > h4, .page > h5' );
	if ( ltitle != null ) ltitle . innerHTML = lang . toUpperCase ( ) + ' / ' + ltitle . innerHTML;
};

// ЦЕНТРАЛИЗАЦИЯ КАРТИНОК

/* эскизы перемещённых картинок - удалить привязку к высоте и ширине */
document . querySelectorAll ( ".dokuwiki img:not([src*='fetch'])" ) . forEach (
	e => e . src = e . src . replace ( /[wh]=\d+\&?/g, '' ) . replace ( /tok=......\&?/g, '' ) . replace ( /[\?\&]$/g, '' )
);

/* медиаменеджер - перенаправить в папку без языка */
if ( lhref . match ( /mediamanager.php\?ns=\w\w\w?%3A(sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang|playground|user)/ ) != null ) {
	var ns = document . querySelector ( '#media__ns' );
	ns . innerHTML = ns . innerHTML . replace ( /^:\w\w\w?:/, 'Redirect... :' );
	window . location = window . location . toString ( ) . replace ( /ns=\w\w\w?%3A/, 'ns=' )
};

/* сайдбар - удалить язык в медиаменеджере */
var sidemedia = document . querySelector ( '#pagetools .media a' );
if ( sidemedia != null ) sidemedia . href = sidemedia . href . replace ( /ns=\w\w\w?%3A/, 'ns=' );

// ГЛАВНАЯ, МЕНЮ, ИНДЕКСЫ И Т.П.

/* последние правки - дорисовать "ЯЗЫК / " */
if ( lhref . match ( /(start|do=search)/ ) ) {
	document . querySelectorAll ( 'td.page a, .pagelist a, .taglist a, .search_quickhits a, .search_results a.wikilink1' ) . forEach (
		e => e . innerHTML = lang . toUpperCase ( ) + ' / ' + e . innerHTML
	)
};
/* теги - дорисовать "ЯЗЫК / " */
if ( lhref . match ( /(showtag)/ ) ) {
	document . querySelectorAll ( 'td.page a' ) . forEach (
		e => e . innerHTML = e . title . split ( ':' ) [ 0 ] . toUpperCase ( ) + ' / ' + e . innerHTML
	)
};

/* меню и админка - пакование в колонки */
if ( lhref . match ( /(\/menu[\?|#]?|do=admin)/i ) !== null ) {
	var col_ul = document . querySelectorAll ( '.page ul, .admin_plugins ul' ),
		col_li,
		col_sz = [ ];
	for ( i = 0; i < col_ul . length; i++ ) {
		if ( i != 3 ) { // исключая Интерробанг Студию
			col_li = col_ul [ i ] . querySelectorAll ( 'div.li' );
			for ( j = 0; j < col_li . length; j++ ) {
				col_li [ j ] . style . display = "inline"; // приведение дивов к строчному виду
				col_sz . push ( col_li [ j ] . offsetWidth ) // заполнение массива их размерами
			}
		}
	};
	var col_sm = Math . max . apply ( null, col_sz ); // определение наибольшего дива
	for ( i in col_ul ) {
		if ( i != 3 && col_ul [ i ] . style ) col_ul [ i ] . style . cssText += " columns: " + col_sm + "px auto; column-gap: 20px;" // адаптивные колонки
	}
};

// В КОМИКСОВЫХ РАЗДЕЛАХ

if ( lhref . match ( /\/(sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang)\//i ) ) {
	/* плашка статуса перевода */
	if (
		!lhref . match ( /(\/(d|h)\d+|[\?&](do=pre|rev=))/i )
		&&
		document . querySelectorAll ( '.ct-container, .fn-container' ) . length == 0
		&&
		document . querySelector ( 'img.media' )
	) {
		var cot_vid = ' <a href="https://www.youtube.com/embed/w_Pnlt-9o7s?hl=' + lang + '" target=_blank>CoTAN</a> ',
			clangs = {
				'be': 'У гэтай паласе няма налепак!<br>Вы можаце выправіць гэта, <a href="?do=edit">адрэдагаваўшы старонку</a> з дапамогай' + cot_vid,
				'bg': 'В тази лента няма етикети!<br>Можете да поправите това, като <a href="?do=edit">редактирате страницата</a> с' + cot_vid,
				'da': 'Der er ingen klistermærker i denne stribe!<br>Du kan rette dette ved at <a href="?do=edit">redigere siden</a> med' + cot_vid,
				'de': 'In diesem Streifen befinden sich keine Aufkleber!<br>Sie können dies beheben, indem Sie die Seite mit' + cot_vid + '<a href="?do=edit">bearbeiten</a>',
				'el': 'Δεν υπάρχουν αυτοκόλλητα στην ταινία!<br>Μπορείτε να διορθώσετε αυτό με την <a href="?do=edit">επεξεργασία της σελίδας</a> με το' + cot_vid,
				'en': 'There are no stickers on this strip!<br>You can fix this by <a href="?do=edit">editing this page</a> with' + cot_vid,
				'eo': 'Ne estas glumarkoj en ĉi tiu strio!<br>Vi povas solvi ĉi tion <a href="?do=edit">redaktante la paĝon</a> kun' + cot_vid,
				'es': '¡No hay pegatinas en esta tira!<br>Puedes arreglar esto <a href="?do=edit">editando esta página</a> con' + cot_vid,
				'fi': 'Tässä nauhassa ei ole tarroja!<br>Voit korjata tämän <a href="?do=edit">muokkaamalla sivua</a>' + cot_vid + 'avulla',
				'fr': 'Il n\'y a pas d\'autocollants dans cette bande!<br>Vous pouvez résoudre ce problème en <a href="?do=edit">modifiant cette page</a> avec' + cot_vid,
				'he': 'אין מדבקות ברצועה זו!<br>באפשרותך לתקן זאת על-ידי <a href="?do=edit">עריכת הדף</a> באמצעות' + cot_vid,
				'hi': 'इस पट्टी में कोई स्टिकर नहीं हैं!<br>आप' + cot_vid + 'के साथ <a href="?do=edit">पेज को एडिट</a> करके इसे ठीक कर सकते हैं',
				'hu': 'Nincsenek matricák ezen a szalagon!<br>Ezt az oldal' + cot_vid + '-nal segítségével történő <a href="?do=edit">szerkesztésével javíthatod</a>',
				'id': 'Tidak ada stiker di strip ini!<br>Anda dapat memperbaikinya dengan <a href="?do=edit">mengedit halaman</a> dengan' + cot_vid,
				'it': 'Non ci sono adesivi in questa striscia!<br>Puoi sistemarlo <a href="?do=edit">modificando questa pagina</a> con' + cot_vid,
				'ja': 'このストリップにはステッカーがありません！<br>あなたは' + cot_vid + 'で<a href="?do=edit">このページを編集することによって</a>これを直すことができます',
				'ko': '이 스트립에는 스티커가 없습니다!<br>' + cot_vid + '으로 <a href="?do=edit">페이지를 편집하여</a> 문제를 해결할 수 있습니다',
				'pl': 'Na tym pasku nie ma naklejek!<br>Możesz to naprawić, <a href="?do=edit">edytując tę stronę</a> za pomocą' + cot_vid,
				'pt': 'Não há adesivos nesta faixa!<br>Você pode corrigir isso <a href="?do=edit">editando esta página</a> com o' + cot_vid,
				'ru': 'В этом выпуске нет наклеек!<br>Вы можете исправить это, <a href="?do=edit">отредактировав страницу</a> с помощью' + cot_vid,
				'sib': '',
				'sjn': '',
				'uk': 'У цій смузі немає жодних наклейок!<br>Ви можете виправити це, <a href="?do=edit">відредагувавши цю сторінку</a> за допомогою' + cot_vid,
				'zh': '这条带上没有贴纸！<br>您可以通过<a href="?do=edit">使用</a>' + cot_vid + '编辑页面来解决此问题'
			},
			clang,
			note = document . createElement ( 'div' ),
			cnavn = document . querySelector ( '.cnavn' );
		clangs [ 'sib' ] = clangs [ 'ru' ];
		clangs [ 'sjn' ] = clangs [ 'en' ];
		clang = clangs [ lang ] || clangs [ 'en' ],
		note . style . margin = '1em auto';
		note . className = 'vycenter note noteimportant';
		note . innerHTML = '<span style = "font-size: 1.3em" class = "fest">' + clang + '</span>';
		if ( cnavn ) cnavn . parentNode . insertBefore ( note, cnavn . nextSibling );
	};
	/* в лентах - сокращение лишних титулов выпусков и озеленение заголовков */
	if ( lhref . match ( /\/(d|h)\d+/i ) != null ) {
		var band_title = Array . from ( document . querySelectorAll ( '.page .plugin_include_content > .level5 > p > strong' ) ) . reverse ( );
		for ( i = 0; i < band_title . length - 1; i++ ) {
			if ( band_title [ i ] . innerHTML == band_title [ i + 1 ] . innerHTML ) band_title [ i ] . innerHTML = '';
		}
		var div_incs = document . querySelectorAll ( '.page div[id*="plugin_include__"]' );
		if ( div_incs ) {
			for ( i = 0; i < div_incs . length; i++ ) {
				var h5 = div_incs [ i ] . querySelector ( 'h5' );
				if ( h5 ) {
					var h5a = document . createElement ( 'a' );
					h5a . innerHTML = h5 . innerHTML;
					h5a . href = div_incs [ i ] . id . slice ( 14 ) . replace ( /__/g, '/' );
					h5a . className = 'wikilink1';
					h5 . innerHTML = '';
					h5 . appendChild ( h5a );
				}
			}
		}
	};
	if ( lhref . match ( /do=export/i ) != null ) {
		/* автопереход по редиректу в экспорте */
		if ( document . querySelector ( '.noteredirect a' ) ) window . location . href = document . querySelector ( '.noteredirect a' ) . href + '?do=export_xhtml';
		/* скрытие наклеек по атрибуту hide=1 */
		if ( lhref . match ( /hide=1/i ) != null ) {
			document . querySelectorAll ( '.ct-area, .fn-area' ) . forEach (
				e => e . style . display = 'none'
			)
		}
	}
};
