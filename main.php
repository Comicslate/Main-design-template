<!DOCTYPE html> <?php // ver. 2022.09.03 15:31 GMT+9
$NS = $INFO [ 'namespace' ]; $t2 = "\n\t\t"; $t3 = "\n\t\t\t"; $t4 = "\n\t\t\t\t"; $t5 = "\n\t\t\t\t\t"; $t6 = "\n\t\t\t\t\t\t";
$comic = preg_match ( '/:(sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang):/', $NS );
$dw_add = '';
switch ( $conf [ "lang" ] ) {
	case 'he' : $dfont = 'Frank+Ruhl+Libre:wght@700'; break;
	case 'hi' : $dfont = 'Inknut+Antiqua'; break;
	case 'ko' : $dfont = 'Jua'; break;
	case 'ja' : $dfont = 'Kosugi+Maru'; break;
	case 'zh' : $dfont = 'ZCOOL+KuaiLe'; break;
	case 'ru' : case 'be' : case 'bg' : case 'uk' : $dw_add .= ' slav'; break;
	default : break;
};

/* код страницы */
header ( 'X-UA-Compatible: IE = edge' ); echo '
<html xml:lang = "' . $conf [ "lang" ] . '" lang = "' . $conf [ "lang" ] . '" dir = "' . $lang [ "direction" ] . '" prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile# fb: http://ogp.me/ns/fb#">' .
// 1. HEAD
"\n\t" . '<head>' .
$t2 . '<meta charset = "utf-8" />' .
$t2 . '<title>' . strtoupper ( $conf [ "lang" ] ) . ' / '; tpl_pagetitle ( ); echo '</title>' .
$t2 . '<link rel = "alternate" type = "application/json+oembed" href = "https://app.comicslate.org/embed.json?id=' . $ID . ( $REV == false ? '' : '&amp;rev='. $REV ) . '" />' .
$t2 . '<meta name = "viewport" content = "width = device-width, initial-scale = 1" />' .
$t2 . tpl_favicon ( array ( 'favicon', 'mobile' ) ) .
"\t\t" . '<link rel="icon" href="/lib/tpl/comicslate/images/logo/logo_back.svg" type="image/svg+xml">' .
$t2 . '<link rel = "manifest" href = "/lib/tpl/comicslate/images/site.webmanifest">' .
(
	$ACT == 'show'
	// Метрика
	? (
		$t2 . '<script src = "//mc.yandex.ru/metrika/tag.js" async></script>' . $t2 . '<script src = "/lib/tpl/comicslate/yscript.js" async></script>' .
		// реклама РСИ
		$t2 . '<script>window . yaContextCb = window . yaContextCb || [ ]</script>' .
		$t2 . '<script src = "//yandex.ru/ads/system/context.js" async></script>'
	)
	: (
		( $ACT == 'edit' || $ACT == 'preview' )
		&&
		( explode ( "&", $_SERVER [ "QUERY_STRING" ] ) [ 2 ] != 'nocotan' )
		// CoTAN
		? $t2 . '<script src = "/lib/plugins/cotan/neweditor.js?ver=' . date ( "y-m-d_H:i:s", filemtime ( 'lib/plugins/cotan/neweditor.js' ) ) . '" defer></script>'
		: ''
	)
) .
// шрифты
$t2 . '<link rel = "preconnect" href = "https://fonts.gstatic.com" />';
if ( preg_match ( '/(h[ei]|ko|ja|zh)/', $conf [ "lang" ] ) ) echo  $t2 . '<link rel = "preload" href = "https://fonts.googleapis.com/css2?family=' . $dfont . '&amp;display=swap" as = "style" crossorigin = "anonymous">';
echo $t2 . '<link rel = "preload" href = "/lib/tpl/comicslate/fonts/dat_fest_comic.woff" as = "font" type = "font/woff" crossorigin = "anonymous">' .
     $t2 . '<link rel = "preload" href = "/lib/tpl/comicslate/fonts/dat_fest_comic.ttf" as = "font" type = "font/ttf" crossorigin = "anonymous">' .
// остальные мета-теги
$t2; tpl_metaheaders ( );
echo "\t" . '</head>' .
// 2. BODY
"\n\t" . '<body>' .
$t2 . '<div class = "dokuwiki lang-' . str_replace ( ":", " ", $NS ) . ( $comic ? ' comic' : '') . $dw_add . '">' .
// 2.1. MENU
$t3 . '<div id = "head">' .
$t4 . '<div id = "logo">' . // Logo
$t5 . '<a id = "inlogo" rnd = "' . rand ( 0, 6 ) . '"  href = "/'. $conf [ "lang" ] . '/start" title = "' . tpl_getLang ( 'start' ) . '"></a>' .
$t4 . '</div>' .
$t4 . '<div id = "menu">' .
// Topline & search
$t5 . '<header rnd = "' . rand ( 0, 6 ) . '">' .
$t6 . '<span id = "upmenu">';
$ilinks = array (
	array ( '/'. $conf [ "lang" ] . '/menu',		tpl_getLang ( 'menu' ),		'_self' ),
	array ( '/'. $conf [ "lang" ] . '/news/index',	tpl_getLang ( 'news' ),		'_self' ),
	array ( '/'. $conf [ "lang" ] . '/wiki/index',	tpl_getLang ( 'helproom' ),	'_blank' ),
	array ( '//discord.gg/T8p6M4Q',					tpl_getLang ( 'chat' ),		'_blank' ),
);
for ( $i = 0; $i <= count ( $ilinks ) - 1; $i++ ) { echo $t6 . "\t" . '<a href = "' . $ilinks [ $i ] [ 0 ] . '" target = ' . $ilinks [ $i ] [ 2 ] . '>' . $ilinks [ $i ] [ 1 ] . '</a>'; };
echo $t6 . '</span>' .
$t6 . '<div id = "search">' . $t6 . "\t" ; tpl_searchform ( ); echo $t6 . '</div>' .
$t5 . '</header>' ;
// Languages
$translation = plugin_load ( 'helper', 'translation' );
echo $t5 . '<nav>' . ( $translation ? $translation -> showTranslations ( ) : '' ) . $t5 . '</nav>' .
$t4 . '</div>' . $t3 . '</div>' ;
// Message
if ( !empty ( html_msgarea ( ) ) ) { echo $t3 . '<div class = "meta">' . $t4; html_msgarea ( ); echo $t3 . '</div>'; };
// 2.2. PAGE
tpl_flush ( );
echo $t3 . '<article class = "page">' .
"\n";
tpl_content ( );
echo $t3 . '</article>';
tpl_flush ( );

echo $t3 . '<noindex>';
// 2.3. SIDEBARS
if ( // Design
	( $ACT == 'edit' || $ACT == 'preview' || $ACT == 'show' )
	&&
	$comic
	&&
	preg_match ( '/((\d|vol|ch)\d+|(cover|pro(log)?)\d*)/', noNS ( $ID ) )
) {
echo '<aside id = "viewoptions">
<label id="opt_fognavi"><input type="checkbox"><span class="l_ch"></span><span class="l_tx">' . tpl_getLang ( 'opt1' ) . '</span></label>
<label id="opt_piczoom"><input type="checkbox"><span class="l_ch"></span><span class="l_tx">' . tpl_getLang ( 'opt2' ) . '</span></label>
<label id="opt_picshot"><input type="checkbox"><span class="l_ch"></span><span idata="' . tpl_getLang ( 'opt3' ) . '" class="l_tx"></span></label>
<label id="opt_translate" accesskey="t"><input type="checkbox"><span class="l_ch"></span><span idata="' . tpl_getLang ( 'opt4' ) . '" class="l_tx"></span></label>
<label id="opt_decolor"><input type="checkbox"><span class="l_ch"></span><span class="l_tx">' . tpl_getLang ( 'opt5' ) . '</span></label>
</aside>';
};
echo $t4 . '<aside id = "pagetools">' . // Wiki
$t5 . '<ul id = "nomobile">' .
$t6 . ( new \dokuwiki\Menu\PageMenu ( ) ) -> getListItems ( ) .
$t5 . '</ul>' .
$t5 . '<ul id = "mobile">' .
$t6 . ( new \dokuwiki\Menu\MobileMenu ( ) ) -> getDropdown ( ) .
$t5 . '</ul>' .
$t4 . '</aside>' .
// 2.4. FOOTER
$t4 . '<footer>';
if ( $conf [ 'breadcrumbs' ] ) { // Breadcrumbs
	echo $t5 . '<div class = "breadcrumbs">';
	tpl_breadcrumbs ( );
	echo '</div>';
};
$socbut = array ( // Social
	array ( '/feed.php', tpl_getLang ( 'RSS' ) . ' (' . tpl_getLang ( 'RSSall' ) . ')', 'rss' ),
	array ( '/feed.php?onlynewpages=1', tpl_getLang ( 'RSS' ) . ' (' . tpl_getLang ( 'RSSnew' ) . ')', 'rss' ),
	array ( '//patreon.com/comicslate', 'Patreon', 'patreon' ),
	array ( '//discord.gg/T8p6M4Q', 'Discord', 'discord' ),
	array ( '//t.me/comicslate', 'Telegram', 'telegram' ),
	array ( '//www.reddit.com/r/Comicslate', 'Reddit', 'reddit' ),
	array ( '//rainbow-spike.tumblr.com', 'Tumblr', 'tumblr' ),
	array ( '//facebook.com/groups/comicslate', 'Facebook', 'facebook' ),
	array ( '//twitter.com/Rainbow_Spike', 'Twitter', 'twitter' ),
	array ( '//vk.com/comicslate', 'VKontakte', 'vkontakte' ),
	array ( '/feed.php?ns=' . urlencode ( $NS ), tpl_getLang ( 'RSSpart' ) . ' (' . tpl_getLang ( 'RSSall' ) . ')', 'rss' ),
	array ( '/feed.php?onlynewpages=1&amp;ns=' . urlencode ( $NS ), tpl_getLang ( 'RSSpart' ) . ' (' . tpl_getLang ( 'RSSnew' ) . ')', 'rss' )
);
echo $t5 . '<div class = "social">';
for ( $i = 0; $i <= count ( $socbut ) - 1; $i++ ) {
	echo $t6 . '<a href = "' . $socbut [ $i ] [ 0 ] . '" class = "media ' . $socbut [ $i ] [ 2 ] . '" title = "' . $socbut [ $i ] [ 1 ] . '" target = "_blank"></a>';
};
echo $t5 . '</div>';
if ( $ACT == 'show' ) { // Yandex Counter
	echo '<div class = "count">' .
	$t6 . '<a href = "//metrika.yandex.ru/stat/?id=25500497&amp;from=informer" target = "_blank" rel = "nofollow">' .
	$t6 . "\t" . '<img src = "//informer.yandex.ru/informer/25500497/3_0_7BC9F7FF_5BA9D7FF_0_pageviews" class = "ym-advanced-informer" alt = "Яндекс.Метрика" title = "Яндекс.Метрика: данные за 24 часа (просмотры, уник. посетители и визиты)" data-cid = "25500497" data-lang = "' . $conf [ "lang" ] .'" />' .
	$t6 . '</a>' .
	$t6 . '<noscript>' .
	$t6 . "\t" . '<div>' .
	$t6 . "\t\t" . '<img src = "//mc.yandex.ru/watch/25500497" alt = "" />' .
	$t6 . "\t" . '</div>' .
	$t6 . '</noscript>' .
	$t5 . '</div>';
};
if ( $INFO [ 'ismanager' ] ) { // Pageinfo
	echo $t5 . '<div class = "pageinfo">' .
	$t6; tpl_pageinfo ( );
	echo $t5 . '</div>';
};
if ( !empty ( $_SERVER['REMOTE_USER'] ) ) { // Userinfo
	echo $t5 . '<div class = "user">' .
	$t6; tpl_userinfo ( );
	echo $t5 . '</div>';
};
echo $t4 . '</footer>' .
$t3 . '</noindex>';
// 2.5. РЕКЛАМА РСИ
if ( $ACT == 'show' && $dw_add != '' && $comic ) echo $t3 . '<div id = "yandex_rtb_R-A-492328-1"></div>';
echo $t2 . '</div>' .
// 2.6. INDEXER
$t2 . '<div class = "no">' . $t3; tpl_indexerWebBug ( ); echo $t2 . '</div>' .
"\n\t" . '</body>
</html>';
