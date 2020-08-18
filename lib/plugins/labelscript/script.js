// Г А Л О Ч К И   О П Ц И Й   ver. 2020.08.18 16:17 GMT+10
console.log ( 15 );
var ref = document.querySelector ( '#translabel' );
if ( ( ref != null ) && ( window.location.href.match ( /\/(sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang)\/.*(\d\d+|vol\d+|ch\d+|cover\d*|pro*)/i ) != null ) ) { // запуск в комиксовых разделах сайта при наличии места для галок
	var i,
		page = document.querySelector ( ".page" ),
		preview = page.querySelector ( ".preview" ),
		pagewidth = ( preview != null ) ? ( preview.offsetWidth - 6 ) : ( page.offsetWidth - 3 ),
		ctc = page.querySelectorAll ( ".page .ct-container, .page .fn-container" ),

	/* ЛОКАЛИЗАЦИЯ */
		lang = NS.split ( ':', 2 ) [ 0 ],
		line = [ ],
		lines = {
			'ady': [ 'Гъэлъэгъон зэдзэкIар' ],
			'be': [ 'Паказаць пераклад',	'Ўпісаць у экран',			'Абрэзаць навігатар',		'Схаваць скрыншот',			'Афарбавана' ],
			'bg': [ 'Показване на превод',	'Подходящ за екран',		'Свиване на навигатора',	'Скриване на екрана',		'Боядисан' ],
			'da': [ 'Vis oversættelse',		'Tilpas til skærmen',		'Beskær navigatoren',		'Skjul skærmbillede',		'Malet' ],
			'de': [ 'Übersetzung anzeigen',	'Vollbild',					'Navigator verkleinern',	'Screenshot ausblenden',	'Gemalt' ],
			'el': [ 'Εμφάνιση μετάφρασης',	'Προσαρμογή στην οθόνη',	'Περικοπή του πλοηγού',		'Απόκρυψη screenshot',		'Βαμμένο' ],
			'en': [ 'Show translation',		'Fit to screen',			'Crop navigator',			'Hide screenshot',			'Painted' ],
			'eo': [ 'Montri tradukojn',		'Taŭga al ekrano',			'Tondu la navigilon',		'Kaŝi ekrankopion',			'Pentrita' ],
			'es': [ 'Mostrar traducción',	'Ajustar a la pantalla',	'Podar el navegador',		'Ocultar screenshot',		'Pintado' ],
			'fi': [ 'Näytä käännös',		'Sovita näytölle',			'Rajaa navigaattori',		'Piilota kuvakaappaus',		'Maalannut' ],
			'fr': [ 'Afficher la traduction','S\'adapter a l\'ecran',	'Recadrer le navigateur',	'Masquer la screenshot',	'Peint' ],
			'he': [ 'הצג תרגום',			'מתאים למסך',				'חתוך את הנווט',			'הסתר צילום מסך',			'צבוע' ],
			'hi': [ 'अनुवाद दिखाएं',				'स्क्रीन में फिट',						'नाविक को काटें',					'स्क्रीनशॉट छिपाएँ',					'पेंट' ],
			'hu': [ 'Mutasd a fordítást',	'Képernyőhöz igazítva',		'Vágási navigátor',			'A képernyőkép elrejtése',	'Festett' ],
			'id': [ 'Tampilkan terjemahan',	'Pas dengan layar',			'Pangkas navigator',		'Sembunyikan screenshot',	'Dicat' ],
			'it': [ 'Mostra traduzione',	'Adatta allo schermo',		'Ritaglia il navigatore',	'Nascondi screenshot',		'Dipinto' ],
			'ja': [ '翻訳を表示する',			'画面にフィット',					'ナビゲーターをクロップする',			'スクリーンショットを非表示',			'塗装済み' ],
			'ko': [ '번역보기',				'화면에 맞추기',					'네비게이터 자르기',				'스크린 샷 숨기기',				'그린' ],
			'pl': [ 'Pokaż tłumaczenie',	'Dopasuj do ekranu',		'Trym nawigatora',			'Ukryj zrzut ekranu',		'Malowane' ],
			'pt': [ 'Mostrar tradução',		'Ajustar a tela',			'Recorte o navegador',		'Ocultar screenshot',		'Pintado' ],
			'ru': [ 'Показать перевод',		'Вписать в экран',			'Обрезать навигатор',		'Спрятать скриншот',		'Окрашено' ],
			'sib': [ ],
			'sjn': [ ],
			'uk': [ 'Показати переклад',	'Вписати в екран',			'Обрізати навігатор',		'Сховати скріншот',			'Забарвлене' ],
			'zh': [ '显示翻译',				'适应屏幕',					'裁剪导航器',					'隐藏萤幕撷取画面',				'彩绘' ],
			'default': [ ]
		};
	lines.default = lines [ 'en' ];
	lines [ 'sib' ] = lines [ 'ru' ];
	lines [ 'sjn' ] = lines [ 'en' ];
	for ( i in lines.default ) {
		line [ i ] = lines[lang] [ i ] || lines.default [ i ]
	};

	/* ПЕЧЕНЬКИ ПАПОК */

	// Added by EvilCat at 1 Oct 2012
	function createCookie ( name, value, days ) { // создание куки с переданными параметрами
		var date = new Date ( );
		date.setTime ( date.getTime ( ) + ( days * 24 * 60 * 60 * 1000 ) );
		document.cookie = name + '=' + value + '; expires=' + date.toGMTString ( ) + '; path=/';
	}

	function readCookie ( name ) { // чтение куки
		var nameEQ = name + '=',
			ca = document.cookie.split ( ';' );
		for ( i = 0; i < ca.length; i++ ) {
			var c = ca [ i ].trim();
			if ( c.indexOf ( nameEQ ) == 0 ) return c.substring ( nameEQ.length );
		}
		return null;
	}

	function eraseCookie ( name ) { // удаление куки
		createCookie ( name, '', -1 );
	}

	/* ОБРАБОТКИ */

	function piczoom ( set ) { // для зума
		for ( i = 0; i < ctc.length; i++ ) {
			var img = ctc [ i ].querySelector ( "img" ), // !
				scale = pagewidth / img.width,
				margin = ( scale - 1 ) * img.height + 10;
			ctc [ i ].style.transform = ( set == true ) ? "scale(" + scale + ")" : "";
			ctc [ i ].style.marginBottom = ( set == true ) ? margin + "px" : "";
			ctc [ i ].style.transformOrigin = ( set == true ) ? ( ( scale < 1 ) ? 'left top 0' : 'center top 0' ) : 'center top 0' ;
		}
	}

	function picshot ( ) { // для шота
		for ( i = 0; i < ctc.length; i++ ) {
			var img = ctc [ i ].querySelector ( "img" ),
				new_a = document.createElement ( 'a' ),
				new_img = document.createElement ( 'img' ),
				img_src = 'https://app.comicslate.org/embed.webp?id=' + JSINFO.id /*+ '&date=' + Date.now ( )*/;
			new_a.className = 'img-repl';
			new_a.setAttribute ( 'href', window.location + '?do=edit' );
			new_img.setAttribute ( 'src', img_src );
			new_img.style.width = ( img.width + 6 ) + 'px';
			new_a.appendChild ( new_img );
			ctc [ i ].appendChild ( new_a );
		}
	}

	/* СИНХРОНИЗАЦИЯ ПЕРЕМЕННЫХ */

	function setReveal ( set ) { // отключение переводов
		translate_mark = set;
		translate_checkbox.innerHTML = set ? '' : '.fn-note, .ct-note { visibility: hidden !important } .color_check { display: none !important }';
		( translate_mark == true ) ? eraseCookie ( folder_cookie ) : createCookie ( folder_cookie, false, 9999 );
	}

	function setReveal1 ( set ) { // зум комиксов
		zoom_mark = set;
		( set == true ) ? eraseCookie ( folder_cookie1 ) : createCookie ( folder_cookie1, false, 9999 );
		piczoom ( set );
	}

	function setReveal2 ( set ) { // приглушение навигатора
		fognavi_mark = set;
		fognavi_checkbox.innerHTML = set ? '#navver, #navhead, #navtail, #navhor { animation: smooth 5s; opacity: 0.1 } #navprev { animation: smooth2 3s; opacity: 0.5 }' : '';
		( set == true ) ? eraseCookie ( folder_cookie2 ) : createCookie ( folder_cookie2, false, 9999 );
	}

	function setReveal3 ( set ) { // фотографирование комиксов
		shot_mark = set;
		shot_checkbox.innerHTML = set ? '.img-repl { display: none !important }' : '.fn-area, .ct-area, .reveal_check, .color_check, .ct-container > img.media, .fn-container > img.media { display: none !important }';
		( set == true ) ? eraseCookie ( folder_cookie3 ) : createCookie ( folder_cookie3, false, 9999 );
	}

	function setReveal4 ( set ) { // обесцвечивание диалогов
		color_mark = set;
		color_checkbox.innerHTML = set ? '' : '.fn-note-content span, .ct-note-content span { color: black }';
		( set == true ) ? eraseCookie ( folder_cookie4 ) : createCookie ( folder_cookie4, false, 9999 );
	}

	/* ПЕРЕКЛЮЧАТЕЛИ */

	function toggleReveal ( ) { 
		setReveal ( !translate_mark );
	}

	function toggleReveal1 ( ) {
		setReveal1 ( !zoom_mark );
	}

	function toggleReveal2 ( ) {
		setReveal2 ( !fognavi_mark );
	}

	function toggleReveal3 ( ) {
		setReveal3 ( !shot_mark );
	}

	function toggleReveal4 ( ) {
		setReveal4 ( !color_mark );
	}

	/* ГЕНЕРАЦИЯ ГАЛОЧЕК */

	function createCheckbox ( f_class, f_check, f_toggle, f_text, f_access = false ) {
		var obj = document.createElement ( 'label' ),
			check = document.createElement ( 'input' ),
			span = document.createElement ( 'span' );
		if ( f_access != false ) obj.accessKey = f_access;
		obj.className = 'optcheck ' + f_class;
		check.type = 'checkbox';
		check.checked = f_check;
		check.onclick = f_toggle;
		obj.appendChild ( check );
		obj.appendChild ( span );
		span.appendChild ( document.createTextNode ( f_text ) );
		ref.insertBefore ( obj, null );
	}

	function createReveal ( ) {
		var css = document.createElement ( 'style' );
		css.type = 'text/css';
		translate_checkbox = css;
		ref.insertBefore ( css, null );
		createCheckbox ( 'reveal_check', translate_mark, toggleReveal, line [ 0 ], 't' );
		setReveal ( translate_mark );
	}

	function createZoom ( ) {
		createCheckbox ( 'zoom_check', zoom_mark, toggleReveal1, line [ 1 ] );
		setReveal1 ( zoom_mark );
	}

	function createFogNavi ( ) {
		var css = document.createElement ( 'style' );
		css.type = 'text/css';
		fognavi_checkbox = css;
		ref.insertBefore ( css, null );
		createCheckbox ( 'fognavi_check', fognavi_mark, toggleReveal2, line [ 2 ] );
		setReveal2 ( fognavi_mark );
	}

	function createShot ( ) {
		var css = document.createElement ( 'style' );
		css.type = 'text/css';
		shot_checkbox = css;
		ref.insertBefore ( css, null );
		createCheckbox ( 'shot_check', shot_mark, toggleReveal3, line [ 3 ] );
		picshot;
		setReveal3 ( shot_mark );
	}

	function createColor ( ) {
		var css = document.createElement ( 'style' );
		css.type = 'text/css';
		color_checkbox = css;
		ref.insertBefore ( css, null );
		createCheckbox ( 'color_check', color_mark, toggleReveal4, line [ 4 ] );
		setReveal4 ( color_mark );
	}

	/* КАРАУЛЬНЫй */

	function eventer ( ev ) {
		if ( window.addEventListener ) { // W3C стандарт
			window.addEventListener ( 'load', ev, false ); // NB **not** 'onload'
		} else if ( window.attachEvent ) { // Microsoft стандарт
			window.attachEvent ( 'onload', ev );
		}
	}

	/* ВВОДНЫЕ */

	if ( ctc.length > 0 ) { // при наличии переводов

		var folder_cookie = 'fnNotReveal_' + JSINFO.namespace, // отключение переводов
			translate_mark = !readCookie ( folder_cookie ),
			translate_checkbox;
		eventer ( createReveal );

		if ( window.location.href.match ( /\/h\d+/i ) == null ) { // но не в вертикальных лентах
			var folder_cookie1 = 'disZoom_' + JSINFO.namespace, // зум комиксов
				zoom_mark = !readCookie ( folder_cookie1 );
			eventer ( createZoom );
		}
	}

	if ( window.location.href.match ( /[\?&]do=/i ) == null ) { // только на готовых страницах

		var folder_cookie2 = 'fogNavi_' + JSINFO.namespace, // приглушение навигатора
			fognavi_mark = !readCookie ( folder_cookie2 ),
			fognavi_checkbox;
		eventer ( createFogNavi );

		if ( window.location.href.match ( /\/[d|h]\d+/i ) == null ) { // но не в обеих лентах
			var folder_cookie3 = 'scrShot_' + JSINFO.namespace, // фотографирование комиксов
				shot_mark = !readCookie ( folder_cookie3 ),
				shot_checkbox;
			eventer ( createShot );
		}

		if ( window.location.href.match ( /sci-fi.freefall/i ) != null ) { // лишь в Фрифоле
			var folder_cookie4 = 'colorFF_' + JSINFO.namespace, // обесцвечивание диалогов
				color_mark = !readCookie ( folder_cookie4 ),
				color_checkbox;
			eventer ( createColor );
		}
	}
}
