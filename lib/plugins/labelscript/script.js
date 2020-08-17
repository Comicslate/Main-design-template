// Г А Л О Ч К И   О П Ц И Й   ver. 2020.08.17 14:18 GMT+10

if ( window.location.href.match ( /\/(sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang)\/.*(\d\d+|vol\d+|ch\d+|cover\d*|pro*)/i ) != null ) { // запуск в комиксовых разделах сайта
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
			'be': [ 'Паказаць пераклад',		'Па шырыні экрана',			'Затуманіў навігатар',		'Афарбавана' ],
			'bg': [ 'Показване на превод',		'Ширина на екрана',			'Навигатор за мъгла',		'Боядисан' ],
			'da': [ 'Vis oversættelse',			'Skærmbredde',				'Tåge navigator',			'Malet' ],
			'de': [ 'Übersetzung anzeigen',		'Bildschirmbreite',			'Nebel-Navigator',			'Gemalt' ],
			'el': [ 'εμφάνιση μετάφρασης',		'Πλάτος οθόνης',			'Πλοηγός ομίχλης',			'Βαμμένο' ],
			'en': [ 'Show translation',			'Screen width',				'Fog navigator',			'Painted' ],
			'eo': [ 'Montri tradukojn',			'Larĝa ekrano',				'Nebula navigilo',			'Pentrita' ],
			'es': [ 'Mostrar traducción',		'Ancho de pantalla',		'Navegador de niebla',		'Pintado' ],
			'fi': [ 'Näytä käännös',			'Näytön leveys',			'Sumuavigaattori',			'Maalannut' ],
			'fr': [ 'Afficher la traduction',	'Largeur de l\'écran',		'Navigateur de brouillard',	'Peint' ],
			'he': [ 'הצג תרגום',				'רוחב המסך',				'נווט ערפל',				'צבוע' ],
			'hi': [ 'अनुवाद दिखाएं',					'स्क्रीन की चौड़ाई',					'फॉग नाविक',						'पेंट' ],
			'id': [ 'Tampilkan terjemahan',		'Lebar layar',				'Navigator kabut',			'Dicat' ],
			'it': [ 'Mostra traduzione',		'Larghezza dello schermo',	'Nebulizzatore',			'Dipinto' ],
			'ja': [ '翻訳を表示する',				'画面幅',						'霧ナビゲーター',					'塗装済み' ],
			'ko': [ '번역보기',					'화면 너비',					'안개 네비게이터',				'그린' ],
			'pl': [ 'Pokaż tłumaczenie',		'Szerokość ekranu',			'Nawigator mgły',			'Malowane' ],
			'pt': [ 'Mostrar tradução',			'Largura da tela',			'Navegador de nevoeiro',	'Pintado' ],
			'ru': [ 'Показать перевод',			'По ширине экрана',			'Затуманить навигатор',		'Окрашено' ],
			'uk': [ 'Показати переклад',			'По ширині екрану',		'Затуманити навігатор',		'Забарвлене' ],
			'zh': [ '显示翻译',					'屏幕宽度',					'雾导航器',					'彩绘' ],
			'default': [ ]
		};
	lines.default = lines [ 'en' ];
	for ( i in lines.default ) {
		line [ i ] = lines[lang] [ i ] || lines.default [ i ]
	};

	/* КАРАУЛЬНЫй */
	function eventer ( ev ) {
		if ( window.addEventListener ) { // W3C стандарт
			window.addEventListener ( 'load', ev, false ); // NB **not** 'onload'
		} else if ( window.attachEvent ) { // Microsoft стандарт
			window.attachEvent ( 'onload', ev );
		}
	}

	/* УПРАВЛЕНИЕ ПАПОЧНЫМИ ПЕЧЕНЬКАМИ */

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
			var c = ca [ i ];
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

	function piczoom ( set ) { // доп.функция для зума
		for ( i = 0; i < ctc.length; i++ ) {
			var img = ctc [ i ].querySelector ( "img" ), // !
				scale = pagewidth / img.width,
				margin = ( scale - 1 ) * img.height + 10;
			ctc [ i ].style.transform = ( set == true ) ? "scale(" + scale + ")" : "";
			ctc [ i ].style.marginBottom = ( set == true ) ? margin + "px" : "";
			ctc [ i ].style.transformOrigin = ( set == true ) ? ( ( scale < 1 ) ? 'left top 0' : 'center top 0' ) : 'center top 0' ;
		}
	}

	/* СИНХРОНИЗАЦИЯ ПЕРЕМЕННЫХ */

	function setReveal ( set ) { // отключение переводов
		translate_mark = set;
		translate_checkbox.innerHTML = translate_mark ? translate_style_on : translate_style_off;
		( translate_mark == true ) ? eraseCookie ( folder_cookie ) : createCookie ( folder_cookie, false, 9999 );
	}

	function setReveal1 ( set ) { // зум комиксов
		zoom_mark = set;
		( zoom_mark == true ) ? eraseCookie ( folder_cookie1 ) : createCookie ( folder_cookie1, false, 9999 );
		piczoom ( zoom_mark );
	}

	function setReveal2 ( set ) { // приглушение навигатора
		fognavi_mark = set;
		fognavi_checkbox.innerHTML = fognavi_mark ? fognavi_style_on : fognavi_style_off;
		( fognavi_mark == true ) ? eraseCookie ( folder_cookie2 ) : createCookie ( folder_cookie2, false, 9999 );
	}

	function setReveal3 ( set ) { // фотографирование комиксов
		shot_mark = set;
		shot_checkbox.innerHTML = shot_mark ? shot_style_on : shot_style_off;
		( shot_mark == true ) ? eraseCookie ( folder_cookie3 ) : createCookie ( folder_cookie3, false, 9999 );
	}

	function setReveal4 ( set ) { // обесцвечивание Фрифола
		color_mark = set;
		color_checkbox.innerHTML = color_mark ? color_style_on : color_style_off;
		( color_mark == true ) ? eraseCookie ( folder_cookie4 ) : createCookie ( folder_cookie4, false, 9999 );
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

	function createRevealCheckbox ( ) {
		var css		= document.createElement ( 'style' ),
			obj		= document.createElement ( 'label' ),
			check	= document.createElement ( 'input' ),
			span	= document.createElement ( 'span' ),
			text	= document.createTextNode ( line [ 0 ] ),
			ref		= document.querySelector ( '#translabel' );
		css.type = 'text/css';
		translate_checkbox = css;
		obj.accessKey = 't';
		obj.className = 'optcheck reveal_check';
		check.type = 'checkbox';
		check.checked = translate_mark;
		check.onclick = toggleReveal;
		obj.appendChild ( check );
		obj.appendChild ( span );
		span.appendChild ( text );
		if ( ref != null ) {
			ref.insertBefore ( css, null );
			ref.insertBefore ( obj, null );
		}
		setReveal ( translate_mark );
	}

	function createZoomCheckbox ( ) {
		var obj		= document.createElement ( 'label' ),
			check	= document.createElement ( 'input' ),
			span	= document.createElement ( 'span' ),
			text	= document.createTextNode ( line [ 1 ] ),
			ref		= document.querySelector ( '#translabel' );
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

	function createFogNaviCheckbox ( ) {
		var css 	= document.createElement ( 'style' ),
			obj		= document.createElement ( 'label' ),
			check	= document.createElement ( 'input' ),
			span	= document.createElement ( 'span' ),
			text	= document.createTextNode ( line [ 2 ] ),
			ref		= document.querySelector ( '#translabel' );
		css.type = 'text/css';
		fognavi_checkbox = css;
		obj.className = 'optcheck fognavi_check';
		check.type = 'checkbox';
		check.checked = fognavi_mark;
		check.onclick = toggleReveal2;
		obj.appendChild ( check );
		obj.appendChild ( span );
		span.appendChild ( text );
		if ( ref != null ) {
			ref.insertBefore ( css, null );
			ref.insertBefore ( obj, null );
		}
		setReveal2 ( fognavi_mark );
	}

	function createShotCheckbox ( ) {
		var css 	= document.createElement ( 'style' ),
			obj		= document.createElement ( 'label' ),
			check	= document.createElement ( 'input' ),
			span	= document.createElement ( 'span' ),
			text	= document.createTextNode ( 'Shot (test!)' ),
			ref		= document.querySelector ( '#translabel' );
		css.type = 'text/css';
		shot_checkbox = css;
		obj.className = 'optcheck shot_check';
		check.type = 'checkbox';
		check.checked = shot_mark;
		check.onclick = toggleReveal3;
		obj.appendChild ( check );
		span.appendChild ( text );
		obj.appendChild ( span );
		if ( ref != null ) {
			ref.insertBefore ( css, null );
			ref.insertBefore ( obj, null );
		}
		for ( i = 0; i < ctc.length; i++ ) {
			var new_a = document.createElement ( 'a' ),
				new_img = document.createElement ( 'img' ),
				img_src = 'https://app.comicslate.org/embed.webp?id=' + JSINFO.id + '&date=' + Date.now ( );
			new_a.className = 'img-repl';
			new_a.setAttribute ( 'href', window.location + '?do=edit' ); // клик по картинке ведёт в редактирование
			new_img.setAttribute ( 'src', img_src );
			new_a.appendChild ( new_img );
			ctc [ i ].appendChild ( new_a );
		}
		setReveal3 ( shot_mark );
	}

	function createColorCheckbox ( ) {
		var css 	= document.createElement ( 'style' ),
			obj		= document.createElement ( 'label' ),
			check	= document.createElement ( 'input' ),
			span	= document.createElement ( 'span' ),
			text	= document.createTextNode ( line [ 3 ] ),
			ref		= document.querySelector ( '#translabel' );
		css.type = 'text/css';
		color_checkbox = css;
		obj.className = 'optcheck color_check';
		check.type = 'checkbox';
		check.checked = color_mark;
		check.onclick = toggleReveal4;
		obj.appendChild ( check );
		obj.appendChild ( span );
		span.appendChild ( text );
		if ( ref != null ) {
			ref.insertBefore ( css, null );
			ref.insertBefore ( obj, null );
		}
		setReveal4 ( color_mark );
	}

/* ВВОДНЫЕ */

	if ( ctc.length > 0 ) { // при наличии переводов

		var folder_cookie = 'fnNotReveal_' + JSINFO.namespace, // отключение переводов
			translate_mark = !readCookie ( folder_cookie ),
			translate_style_on = '', // стиль включения
			translate_style_off = '.fn-note, .ct-note { visibility: hidden !important } .color_check { display: none !important }', // стиль выключения
			translate_checkbox;
		eventer ( createRevealCheckbox );

		var folder_cookie1 = 'disZoom_' + JSINFO.namespace, // зум комиксов
			zoom_mark = !readCookie ( folder_cookie1 );
		eventer ( createZoomCheckbox );
	}

	if ( window.location.href.match ( /[\?&]do=/i ) == null ) { // только на готовых страницах

		var folder_cookie2 = 'fogNavi_' + JSINFO.namespace, // приглушение навигатора
			fognavi_mark = !readCookie ( folder_cookie2 ),
			fognavi_style_on = '#navver, #navhead, #navtail, #navhor { animation: smooth 5s; opacity: 0.1 } #navprev { animation: smooth2 3s; opacity: 0.5 }', // стиль приглушения
			fognavi_style_off = '#navver, #navhead, #navtail, #navhor, #navprev { animation: none; opacity: 1 !important }', // стиль оярчения
			fognavi_checkbox;
		eventer ( createFogNaviCheckbox );

		var folder_cookie3 = 'scrShot_' + JSINFO.namespace, // фотографирование комиксов
			shot_mark = !readCookie ( folder_cookie3 ),
			shot_style_on = '.fn-note, .ct-note, .reveal_check, .color_check, .ct-container > img.media, .fn-container > img.media { display: none !important } .img-repl { display: inherit !important }', // стиль на фото
			shot_style_off = '.img-repl { display: none !important }', // стиль на сборку
			shot_checkbox;
		eventer ( createShotCheckbox );

		if ( window.location.href.match ( /sci-fi.freefall/i ) != null ) { // запуск в фрифоле
			var folder_cookie4 = 'colorFF_' + JSINFO.namespace, // обесцвечивание Фрифола
				color_mark = !readCookie ( folder_cookie4 ),
				color_style_on = '', // стиль раскрасок
				color_style_off = '.fn-note-content span, .ct-note-content span { color: black }', // стиль побелки
				color_checkbox;
			eventer ( createColorCheckbox );
		}
	}
}
