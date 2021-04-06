<?php
header ( 'X-UA-Compatible: IE = edge, chrome = 1' ); 

switch ( $conf [ "lang" ] ) {
	case 'he' : $dfont = 'Frank+Ruhl+Libre:wght@700'; break;
	case 'hi' : $dfont = 'Inknut+Antiqua'; break;
	case 'ko' : $dfont = 'Jua'; break;
	case 'ja' : $dfont = 'Kosugi+Maru'; break;
	case 'zh' : $dfont = 'ZCOOL+KuaiLe'; break;
	default : break;
};

$rlogo = time ( ) / 300 % 9;

$ilinks = array (
	array ( '/'. $conf [ "lang" ] . '/start',		tpl_getLang ( 'start' ),	'_self' ),
	array ( '/'. $conf [ "lang" ] . '/menu',		tpl_getLang ( 'menu' ),		'_self' ),
	array ( '/'. $conf [ "lang" ] . '/news/index',	tpl_getLang ( 'news' ),		'_self' ),
	array ( '/'. $conf [ "lang" ] . '/wiki/index',	tpl_getLang ( 'helproom' ),	'_blank' ),
	array ( '//discord.gg/T8p6M4Q',					tpl_getLang ( 'chat' ),		'_blank' ),
	array ( '//app.comicslate.org/',				'Mobile App',				'_blank' ),
);

$t2 = "\n\t\t"; $t3 = "\n\t\t\t"; $t4 = "\n\t\t\t\t"; $t5 = "\n\t\t\t\t\t"; $t6 = "\n\t\t\t\t\t\t";
$translation = plugin_load ( 'helper', 'translation' );
$trans = ( $translation ) ? $translation -> showTranslations ( ) : '';

$apps = "\t\t\t\t" . '<div class = "apps">' .
$t5 . '<a href = "//play.google.com/store/apps/details?id=org.dasfoo.comicslate&amp;utm_source=comicslate-org" target = "_blank">' .
$t6 . '<img src = "' . DOKU_TPL . 'images/googleapp_optim.svg" alt = "Get it on Google Play">' .
$t5 . '</a>' .
$t5 . '<a href = "//apps.apple.com/ru/app/comicslate/id1485894069" target = "_blank">' .
$t6 . '<img src = "' . DOKU_TPL . 'images/appstore_optim.svg" alt = "Download on the App Store">' .
$t5 . '</a>' .
$t4 . '</div>' . $t4;

$socbut = array (
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



echo '<!DOCTYPE html>' .
"\n" . '<html xml:lang = "' . $conf [ "lang" ] . '" lang = "' . $conf [ "lang" ] . '" dir = "' . $lang [ "direction" ] . '">' .

"\n\t" . '<head>' . // HEAD
$t2 . '<meta charset = "utf-8" />' .
$t2 . '<title>' .
$t3 ; tpl_pagetitle ( ); echo ' [Comicslate]' .
$t2 . '</title>' .
$t2 . '<link rel = "alternate" type = "application/json+oembed" href = "https://app.comicslate.org/embed.json?id=' . $ID . ( $REV == false ? '' : '&amp;rev='. $REV ) . '" />' .
$t2 . '<meta name = "viewport" content = "width = device-width, initial-scale = 1" />' .
$t2 . '<script src = "//mc.yandex.ru/metrika/tag.js" async></script>';
if ( ( $ACT == 'edit' ) || ( $ACT == 'preview' ) )
	echo $t2 . '<script charset = "UTF-8" src = "/lib/plugins/cotan/editor.js?ver=' . date ( "y-m-d_H:i:s", filemtime ( '/var/www/comicslate.org/lib/plugins/cotan/editor.js' ) ) . '" defer></script>';
echo $t2 . tpl_favicon ( array ( 'favicon', 'mobile' ) ) .
$t2 . '<link rel = "preconnect" href="https://fonts.gstatic.com" />';
if ( preg_match ( '/(h[ei]|ko|ja|zh)/', $conf [ "lang" ] ) )
	echo  $t2 . '<link rel = "preload" href = "https://fonts.googleapis.com/css2?family=' . $dfont . '&amp;display=swap" as = "style" crossorigin = "anonymous">';
echo $t2 . '<link rel = "preload" href = "/lib/tpl/comicslate/fonts/dat_fest_comic1.woff" as = "font" type = "font/woff" crossorigin = "anonymous">' .
$t2; tpl_metaheaders ( );
echo "\n\t" . '</head>' .

"\n\t" . '<body>' . // BODY
$t2 . '<div class = "dokuwiki lang-' . $conf [ "lang" ] . '">' .

$t3 . '<header class = "logo' . $rlogo . '">' . // MENU1
$t4 . '<div class = "top-texts">'; // Topline
for ( $i = 0; $i <= count ( $ilinks ) - 1; $i++ ) {
	switch ( $i ) {
		case 0 : break;
		default : echo ' , ';
	}
	echo $t5 . '<a href = "' . $ilinks [ $i ] [ 0 ] . '" target = ' . $ilinks [ $i ] [ 2 ] . '>' . $ilinks [ $i ] [ 1 ] . '</a>';
};
echo $t4 . '</div>' .
$t4 . '<div class = "searcher">' . // Search
$t5 ; tpl_searchform ( );
echo $t4 . '</div>' .
$t4 . '<div class = "newlogo-wrap">' . // Logo
$t5 . '<div class = "newlogo"></div>' .
$t4 . '</div>' .
$t3 . '</header>' .

$t3 . '<nav class = "translation">' . $trans . $t3 . '</nav>' . // MENU2

$t3 . '<div id = "translabel"></div>'; // CHECKBOX

if ( !empty ( html_msgarea ( ) ) ) { // MESSAGE
	echo $t3 . '<div class = "meta">' . $t4;
	html_msgarea ( );
	echo $t3 . '</div>';
};

tpl_flush ( );
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
$t3 . '</noindex>' .

$t3 . '<footer>' . // FOOTER
$t4 . '<noindex>';

if ( $conf [ 'breadcrumbs' ] ) { // Breadcrumbs
	echo $t5 . '<div class = "breadcrumbs">';
	tpl_breadcrumbs ( );
	echo '</div>';
};

echo $t5 . '<div class = "social">'; // Social
for ( $i = 0; $i <= count ( $socbut ) - 1; $i++ ) {
	echo $t6 . '<a href = "' . $socbut [ $i ] [ 0 ] . '" class = "media ' . $socbut [ $i ] [ 2 ] . '" title = "' . $socbut [ $i ] [ 1 ] . '" target = "_blank"></a>';
};
echo $t5 . '</div>' .

"\n" . $apps . "\t"; // App buttons bottom

if ( $ACT != 'edit' ) {
	echo '<div class = "count">' . // Yandex Counter
	$t6 . '<a href = "//metrika.yandex.ru/stat/?id=25500497&amp;from=informer" target = "_blank" rel = "nofollow">' .
	$t6 . "\t" . '<img src = "//informer.yandex.ru/informer/25500497/3_0_7BC9F7FF_5BA9D7FF_0_pageviews" alt = "Яндекс.Метрика" title = "Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" class = "ym-advanced-informer" data-cid = "25500497" data-lang = "ru" />' .
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

echo $t4 . '</noindex>' .
$t3 . '</footer>' .

// $t3 . '<div id = "yandex_rtb"></div>' . // END
$t2 . '</div>' .
$t2 . '<div class = "no">' .
$t3; tpl_indexerWebBug ( ); // Indexer
echo $t2 . '</div>' .
"\n\t" . '</body>' .
"\n" . '</html>';
