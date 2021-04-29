<!DOCTYPE html>
<?php
/**
 * DokuWiki Image Detail Template
 *
 * This is the template for displaying image details
 *
 * You should leave the doctype at the very top - It should
 * always be the very first line of a document.
 *
 * @link   http://wiki.splitbrain.org/wiki:tpl:templates
 * @author Andreas Gohr <andi@splitbrain.org>
 */
header ( 'X-UA-Compatible: IE = edge, chrome = 1' );

$ilinks = array (
	array ( '/'. $conf [ "lang" ] . '/start',		tpl_getLang ( 'start' ),	'_self' ),
	array ( '/'. $conf [ "lang" ] . '/menu',		tpl_getLang ( 'menu' ),		'_self' ),
	array ( '/'. $conf [ "lang" ] . '/news/index',	tpl_getLang ( 'news' ),		'_self' ),
	array ( '/'. $conf [ "lang" ] . '/wiki/index',	tpl_getLang ( 'helproom' ),	'_blank' ),
	array ( '//discord.gg/T8p6M4Q',					tpl_getLang ( 'chat' ),		'_blank' ),
	array ( '//app.comicslate.org/',				'Mobile App',				'_blank' ),
);

$t2 = "\n\t\t"; $t3 = "\n\t\t\t"; $t4 = "\n\t\t\t\t"; $t5 = "\n\t\t\t\t\t"; $t6 = "\n\t\t\t\t\t\t";

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



echo "\n" . '<html xml:lang = "' . $conf [ "lang" ] . '" lang = "' . $conf [ "lang" ] . '" dir = "' . $lang [ "direction" ] . '">' .

"\n\t" . '<head>' . // HEAD
$t2 . '<meta charset = "utf-8" />' .
$t2 . '<title>' .
$t3 ; tpl_pagetitle ( ); echo ' [Comicslate]' .
$t2 . '</title>' .
$t2 . '<meta name = "viewport" content = "width = device-width, initial-scale = 1" />' .
$t2 . tpl_favicon ( array ( 'favicon', 'mobile' ) ) .
$t2; tpl_metaheaders ( );
echo "\n\t" . '</head>' .

"\n\t" . '<body>' . // BODY
$t2 . '<div class = "dokuwiki lang-' . $conf [ "lang" ] . '">' .

$t3 . '<div id="head">' .
$t4 . '<div id="logo">' . // Logo
$t5 . '<a id="inlogo" href = "' . $ilinks [ 0 ] [ 0 ] . '" title="' . $ilinks [ 0 ] [ 1 ] . '"></a>' .
$t4 . '</div>' .
$t4 . '<div id="menu">' .
$t5 . '<header>' . // Topline
$t6 . '<span id="upmenu">';
for ( $i = 1; $i <= count ( $ilinks ) - 1; $i++ ) {
	echo $t6 . "\t" . '<a href = "' . $ilinks [ $i ] [ 0 ] . '" target = ' . $ilinks [ $i ] [ 2 ] . '>' . $ilinks [ $i ] [ 1 ] . '</a>';
};
echo $t6 . '</span>' .
$t6 . '<div id="search">' . // Search
$t6 . "\t" ; tpl_searchform ( );
echo $t6 . '</div>' .
$t5 . '</header>' .
$t5 . '<nav>' . $trans . $t5 . '</nav>' . // MENU2
$t4 . '</div>' .
$t3 . '</div>' .

tpl_flush ( );
echo $t3 . '<article id = "dokuwiki__detail">' . // PAGE
"\n" . $apps; // App buttons top

if ( $ERROR ) {
	print $ERROR;
} else {
	echo $t4 .'<h1>' . hsc ( tpl_img_getTag ( "IPTC.Headline", $IMG ) ) . '</h1>' .
	$t4 . '<div class = "img_big">' .
	$t5; tpl_img ( 900, 700 );
	echo $t5 . '<p class = "img_caption">';
	print nl2br (
		hsc (
			tpl_img_getTag (
				array (
					"IPTC.Caption",
					"EXIF.UserComment",
					"EXIF.TIFFImageDescription",
					"EXIF.TIFFUserComment"
				)
			)
		)
	); echo $t5 . '</p>' .
	$t4 . '</div>' .
	$t4 . '<div class = "img_detail">' .
	$t5 . '<p id = "back">&larr;' . $lang["img_backto"]; tpl_pagelink ( $ID ); echo '</p>' .
	$t5 . '<dl class="img_tags">';

	$t = tpl_img_getTag ( 'Date.EarliestTime' );
	if ( $t ) {
		print $t6 . '<dt>' . $lang['img_date'] . '</dt>' .
		$t6 . '<dd>' . date ( $conf['dformat1'], $t ) . '</dd>';
	}
	$t = tpl_img_getTag ( 'File.Name' );
	if ( $t ) {
		print $t6 . '<dt>' . $lang['img_fname'] . '</dt>' .
		$t6 . '<dd>' . hsc ( $t ) . '</dd>';
	}

	$t = tpl_img_getTag (
		array (
			'Iptc.Byline',
			'Exif.TIFFArtist',
			'Exif.Artist',
			'Iptc.Credit'
		)
	);
	if ( $t ) {
		print $t6 . '<dt>' . $lang['img_artist'] . '</dt>' .
		$t6 . '<dd>' . hsc ( $t ) . '</dd>';
	}

	$t = tpl_img_getTag (
		array (
			'Iptc.CopyrightNotice',
			'Exif.TIFFCopyright',
			'Exif.Copyright'
		)
	);
	if ( $t ) {
		print $t6 . '<dt>' . $lang['img_copyr'] . '</dt>' .
		$t6 . '<dd>' . hsc ( $t ) . '</dd>';
	}

	$t = tpl_img_getTag ( 'File.Format' );
	if ( $t ) {
		print $t6 . '<dt>' . $lang['img_format'] . '</dt>' .
		$t6 . '<dd>' . hsc ( $t ) . '</dd>';
	}

	$t = tpl_img_getTag ( 'File.NiceSize' );
	if ( $t ) {
		print $t6 . '<dt>' . $lang['img_fsize'] . '</dt>' .
		$t6 . '<dd>' . hsc ( $t ) . '</dd>';
	}

	$t = tpl_img_getTag ( 'Simple.Camera' );
	if ( $t ) {
		print $t6 . '<dt>' . $lang['img_camera'] . '</dt>' .
		$t6 . '<dd>' . hsc ( $t ) . '</dd>';
	}

	$t = tpl_img_getTag (
		array (
			'IPTC.Keywords',
			'IPTC.Category'
		)
	);
	if ( $t ) {
		print $t6 . '<dt>' . $lang['img_keywords'] . '</dt>' .
		$t6 . '<dd>' . hsc ( $t ) . '</dd>';
	}

	echo $t5 . '</dl>';
	// dbg ( tpl_img_getTag ( 'Simple.Raw' ) ); // Comment in for Debug
	echo $t4 . '</div>';
};
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

$t2 . '</div>' .
"\n\t" . '</body>' .
"\n" . '</html>';
