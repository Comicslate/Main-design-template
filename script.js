//ВЕЗДЕ

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
	window.location.href.match ( /start/ ) != null
	||
	window.location.href.match ( /showtag/ ) != null
) {
	document.querySelectorAll ( ".pagelist a, .taglist a" ).forEach (
		e => {
			if ( e.href != undefined ) e.innerHTML = e.href.substr ( 23, 4 ).split( '/' )[0].toUpperCase() + ' / ' + e.innerHTML
		}
	)
};

// выравнивание первых двух боксов в описании и на главной box_align

var wid_pages = /[:\/]start/i;
if ( window.location.href.match ( wid_pages ) ) { // запуск на главной
	var	box = document.querySelectorAll ( '.level1 > .box' ),
		left = box[0],
		right = box[1],
		left_h = left.offsetHeight,
		right_h = right.offsetHeight;
	right.style.cssText += " height: " + Math.max ( right_h, left_h ) + "px; margin: 0;";
	left.style.cssText += " height: " + Math.max ( right_h, left_h ) + "px; margin: 0;";
};

// пакование меню menu_columns

var menu_page = /[:\/]menu($|#|\?)/i;
if ( window.location.href.match ( menu_page ) ) { // запуск в меню
	var menu_fix = document.querySelectorAll ( '.page ul' );
	for ( i in menu_fix ) {
		menu_fix[i].style.cssText += " column-count: 4; column-gap: 2%; column-width: 23.5%;";
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
for ( var i = 0; i < fix_notes.length; i++ )  {
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
