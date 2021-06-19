<!DOCTYPE html>
<?php
/*
  * ver. 2021.06.20 01:35 GMT+10
  */
header ( 'X-UA-Compatible: IE = edge, chrome = 1' );

$t2 = "\n\t\t"; $t3 = "\n\t\t\t"; $t4 = "\n\t\t\t\t"; $t5 = "\n\t\t\t\t\t"; $t6 = "\n\t\t\t\t\t\t";

echo '<html xml:lang = "' . $conf [ "lang" ] . '" lang = "' . $conf [ "lang" ] . '" dir = "' . $lang [ "direction" ] . '">' .

"\n\t" . '<head>' . // HEAD
$t2 . '<meta charset = "utf-8" />' .
$t2 . '<title>CL / ' . strtoupper ( $conf [ "lang" ] ) . ' / '; tpl_pagetitle ( ); echo '</title>' .
$t2 . '<link rel = "alternate" type = "application/json+oembed" href = "https://app.comicslate.org/embed.json?id=' . $ID . ( $REV == false ? '' : '&amp;rev='. $REV ) . '" />' .
$t2 . '<meta name = "viewport" content = "width = device-width, initial-scale = 1" />';
echo $t2 . tpl_favicon ( array ( 'favicon', 'mobile' ) ) . // favicon
"\t\t" . '<link rel="icon" href="/lib/tpl/comicslate/images/logo/logo_back.svg" type="image/svg+xml">' .
$t2 . '<link rel = "manifest" href = "/lib/tpl/comicslate/images/site.webmanifest">';

if ( $conf [ "lang" ] == 'ru' || $conf [ "lang" ] == 'be' || $conf [ "lang" ] == 'uk' ) echo $t2 . '<script src = "//an.yandex.ru/system/context.js" async></script>'; // реклама РСИ
if ( $ACT == 'show' ) echo $t2 . '<script src = "//mc.yandex.ru/metrika/tag.js" async></script>' . $t2 . '<script src = "/lib/tpl/comicslate/yscript.js" async></script>'; // Метрика
if ( ( $ACT == 'edit' || $ACT == 'preview' ) && ( explode ( "&", $_SERVER [ "QUERY_STRING" ] ) [ 2 ] != 'nocotan' ) ) echo $t2 . '<script src = "/lib/plugins/cotan/editor.js?ver=' . date ( "y-m-d_H:i:s", filemtime ( '/var/www/comicslate.org/lib/plugins/cotan/editor.js' ) ) . '" defer></script>'; // CoTAN

echo $t2 . '<link rel = "preconnect" href = "https://fonts.gstatic.com" />'; // шрифты
$grlng = '';
switch ( $conf [ "lang" ] ) {
	case 'he' : $dfont = 'Frank+Ruhl+Libre:wght@700'; break;
	case 'hi' : $dfont = 'Inknut+Antiqua'; break;
	case 'ko' : $dfont = 'Jua'; break;
	case 'ja' : $dfont = 'Kosugi+Maru'; break;
	case 'zh' : $dfont = 'ZCOOL+KuaiLe'; break;
	case 'ru' : case 'be' : case 'bg' : case 'uk' : $grlng = ' slav'; break;
	default : break;
};
if ( preg_match ( '/(h[ei]|ko|ja|zh)/', $conf [ "lang" ] ) ) echo  $t2 . '<link rel = "preload" href = "https://fonts.googleapis.com/css2?family=' . $dfont . '&amp;display=swap" as = "style" crossorigin = "anonymous">';
echo $t2 . '<link rel = "preload" href = "/lib/tpl/comicslate/fonts/dat_fest_comic1.woff" as = "font" type = "font/woff" crossorigin = "anonymous">' .
        $t2 . '<link rel = "preload" href = "/lib/tpl/comicslate/fonts/dat_fest_comic1.ttf" as = "font" type = "font/ttf" crossorigin = "anonymous">' .

$t2; tpl_metaheaders ( );
echo "\t" . '</head>' .

"\n\t" . '<body>' . // BODY
$t2 . '<div class = "dokuwiki lang-' . $conf [ "lang" ] . $grlng .'">' .

$t3 . '<div id = "head">' . // MENU
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
	array ( '//app.comicslate.org/',				'Mobile App',				'_blank' ),
);
for ( $i = 0; $i <= count ( $ilinks ) - 1; $i++ ) { echo $t6 . "\t" . '<a href = "' . $ilinks [ $i ] [ 0 ] . '" target = ' . $ilinks [ $i ] [ 2 ] . '>' . $ilinks [ $i ] [ 1 ] . '</a>'; };
echo $t6 . '</span>' .
$t6 . '<div id = "search">' . $t6 . "\t" ; tpl_searchform ( ); echo $t6 . '</div>' .
$t5 . '</header>' ;

// Languages
$translation = plugin_load ( 'helper', 'translation' );
echo $t5 . '<nav>' . ( $translation ? $translation -> showTranslations ( ) : '' ) . $t5 . '</nav>' .

$t4 . '</div>' .
$t3 . '</div>' .

$t3 . '<div id = "translabel"></div>'; // CHECKBOX

if ( !empty ( html_msgarea ( ) ) ) { echo $t3 . '<div class = "meta">' . $t4; html_msgarea ( ); echo $t3 . '</div>'; }; // MESSAGE

tpl_flush ( );
$apps = "\t\t\t\t" . '<div class = "apps">' .
$t5 . '<a href = "//play.google.com/store/apps/details?id=org.dasfoo.comicslate&amp;utm_source=comicslate-org" target = "_blank">' .
$t6 . '<img src = "' . DOKU_TPL . 'images/googleapp.svg" alt = "Get it on Google Play">' .
$t5 . '</a>' .
$t5 . '<a href = "//apps.apple.com/ru/app/comicslate/id1485894069" target = "_blank">' .
$t6 . '<img src = "' . DOKU_TPL . 'images/appstore.svg" alt = "Download on the App Store">' .
$t5 . '</a>' .
$t4 . '</div>' . $t4;
echo $t3 . '<article class = "page">' . // PAGE
"\n" . $apps; // App buttons top
tpl_content ( );
echo $t3 . '</article>';
tpl_flush ( );

echo $t3 . '<noindex>' .
$t4 . '<aside id = "pagetools">' . // SIDEBAR
$t5 . '<ul>' .
$t6 . ( new \dokuwiki\Menu\PageMenu ( ) ) -> getListItems ( ) .
$t5 . '</ul>' .
$t4 . '</aside>' .

$t4 . '<footer>'; // FOOTER

if ( $conf [ 'breadcrumbs' ] ) { // Breadcrumbs
	echo $t5 . '<div class = "breadcrumbs">';
	tpl_breadcrumbs ( );
	echo '</div>';
};

$socbut = array ( // Social
	array ( '/feed.php', tpl_getLang ( 'RSS' ), 'rss' ),
	array ( '/feed.php?onlynewpages=1', tpl_getLang ( 'RSS' ) . ' (' . tpl_getLang ( 'RSSnew' ) . ')', 'rss' ),
	array ( '//patreon.com/comicslate', 'Patreon', 'patreon' ),
	array ( '//discord.gg/T8p6M4Q', 'Discord', 'discord' ),
	array ( '//t.me/comicslate', 'Telegram', 'telegram' ),
	array ( '//www.reddit.com/r/Comicslate', 'Reddit', 'reddit' ),
	array ( '//rainbow-spike.tumblr.com', 'Tumblr', 'tumblr' ),
	array ( '//facebook.com/groups/comicslate', 'Facebook', 'facebook' ),
	array ( '//twitter.com/Rainbow_Spike', 'Twitter', 'twitter' ),
	array ( '//vk.com/comicslate', 'VKontakte', 'vkontakte' ),
	array ( '/feed.php?mode=recent&amp;ns=' . $INFO [ 'namespace' ], tpl_getLang ( 'RSSpart' ), 'rss' ),
	array ( '/feed.php?mode=recent&amp;ns=' . $INFO [ 'namespace' ] . '&amp;onlynewpages=1', tpl_getLang ( 'RSSpart' ) . ' (' . tpl_getLang ( 'RSSnew' ) . ')', 'rss' )
);
echo $t5 . '<div class = "social">';
for ( $i = 0; $i <= count ( $socbut ) - 1; $i++ ) {
	echo $t6 . '<a href = "' . $socbut [ $i ] [ 0 ] . '" class = "media ' . $socbut [ $i ] [ 2 ] . '" title = "' . $socbut [ $i ] [ 1 ] . '" target = "_blank"></a>';
};
echo $t5 . '</div>' .

"\n" . $apps . "\t"; // App buttons bottom

if ( $ACT == 'show' ) {
	echo '<div class = "count">' . // Yandex Counter
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

if ( $grlng != '' && $ACT == 'show' ) echo $t3 . '<div id = "yandex_rtb_R-A-492328-1"></div>'; // реклама РСИ
echo $t2 . '</div>' .
$t2 . '<div class = "no">' .
$t3; tpl_indexerWebBug ( ); // Indexer
echo $t2 . '</div>' .
"\n\t" . '</body>' .
"\n" . '</html>';
