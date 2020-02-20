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
header('X-UA-Compatible: IE = edge, chrome = 1');
echo '<!DOCTYPE html>
<html xml:lang = "' . $conf["lang"] . '" lang = "' . $conf["lang"] . '" dir = "' . $lang['direction'] . '">
	<head>
		<title>' . hsc ( tpl_img_getTag ( "IPTC.Headline", $IMG ) ) . ' [' . strip_tags ( $conf['title'] ) . ']</title>
		<meta charset = "utf-8"/>
		<meta name = "viewport" content = "width = device-width, initial-scale = 1"/>
		' . tpl_favicon ( array ( 'favicon', 'mobile' ) );
tpl_metaheaders ( );
echo '
	</head>
	<body>
		<div class = "dokuwiki lang-' . $conf["lang"] . '">';
		
// HEADER
$rlogo = time ( ) / 600 % 9;
echo '
			<header>
				<img class = "logo" src="' . DOKU_TPL . 'images/logo' . $rlogo . '.png" alt = "logotype #' . ( $rlogo + 1 ) . '" />
				<div class = "menu logo-' . $rlogo . '">';
$ilinks = array (
	array ( '/'. $conf["lang"] . '/start', tpl_getLang ( 'start' ), '_self' ),
	array ( '/'. $conf["lang"] . '/menu', tpl_getLang ( 'menu' ), '_self' ),
	array ( '/'. $conf["lang"] . '/news/index', tpl_getLang ( 'news' ), '_self' ),
	array ( '/'. $conf["lang"] . '/wiki/index', tpl_getLang ( 'helproom' ), '_blank' ),
	array ( '//discord.gg/T8p6M4Q', tpl_getLang ( 'chat' ), '_blank' ),
	array ( '//app.comicslate.org/', 'Mobile App', '_blank' ),
);
for ( $i = 0; $i <= count ( $ilinks ) - 1; $i++ ) {
	switch ( $i ) {
		case 0 : break;
		default : echo ' , ';
	}
	echo '
					<a href = "' . $ilinks[$i][0] . '" target = ' . $ilinks[$i][2] . '>' . $ilinks[$i][1] . '</a>';
};
echo '
					<div class = "searcher">
						'; tpl_searchform ( ); echo '
					</div>
				</div>
			</header>';

// MAIN
tpl_flush ( );

$apps = '
				<div class = "apps">
					<a href = "//play.google.com/store/apps/details?id=org.dasfoo.comicslate&amp;utm_source=comicslate-org" target = "_blank">
						<img src = "' . DOKU_TPL . 'images/googleapp.svg" alt = "Get it on Google Play">
					</a>
					<a href = "//apps.apple.com/ru/app/comicslate/id1485894069" target = "_blank">
						<img src = "' . DOKU_TPL . 'images/appstore.svg" alt = "Download on the App Store">
					</a>
				</div>';

echo '
			<article id = "dokuwiki__detail">' . $apps . '
			';
if ( $ERROR ) {
	print $ERROR;
} else {
	echo '
				<h1>' . hsc ( tpl_img_getTag ( "IPTC.Headline", $IMG ) ) . '</h1>
				<div class = "img_big">
					'; tpl_img ( 900, 700 ); echo '
					<p class = "img_caption">';
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
	); echo '
					</p>
				</div>
				<div class = "img_detail">
					<p id = "back">&larr;' . $lang["img_backto"]; tpl_pagelink ( $ID ); echo '</p>
					<dl class="img_tags">';

	$t = tpl_img_getTag ( 'Date.EarliestTime' );
	if ( $t ) print '
						<dt>' . $lang['img_date'] . '</dt>
						<dd>' . date ( $conf['dformat1'], $t ) . '</dd>';

	$t = tpl_img_getTag ( 'File.Name' );
	if ( $t ) print '
						<dt>' . $lang['img_fname'] . '</dt>
						<dd>' . hsc ( $t ) . '</dd>';

	$t = tpl_img_getTag (
		array (
			'Iptc.Byline',
			'Exif.TIFFArtist',
			'Exif.Artist',
			'Iptc.Credit'
		)
	);
	if ( $t ) print '
						<dt>' . $lang['img_artist'] . '</dt>
						<dd>' . hsc ( $t ) . '</dd>';

	$t = tpl_img_getTag (
		array (
			'Iptc.CopyrightNotice',
			'Exif.TIFFCopyright',
			'Exif.Copyright'
		)
	);
	if ( $t ) print '
						<dt>' . $lang['img_copyr'] . '</dt>
						<dd>' . hsc ( $t ) . '</dd>';

	$t = tpl_img_getTag ( 'File.Format' );
	if ( $t ) print '
						<dt>' . $lang['img_format'] . '</dt>
						<dd>' . hsc ( $t ) . '</dd>';

	$t = tpl_img_getTag ( 'File.NiceSize' );
	if ( $t ) print '
						<dt>' . $lang['img_fsize'] . '</dt>
						<dd>' . hsc ( $t ) . '</dd>';

	$t = tpl_img_getTag ( 'Simple.Camera' );
	if ( $t ) print '
						<dt>' . $lang['img_camera'] . '</dt>
						<dd>' . hsc ( $t ) . '</dd>';

	$t = tpl_img_getTag (
		array (
			'IPTC.Keywords',
			'IPTC.Category'
		)
	);
	if ( $t ) print '
						<dt>' . $lang['img_keywords'] . '</dt>
						<dd>' . hsc ( $t ) . '</dd>';

	echo '
					</dl>';
	// dbg ( tpl_img_getTag ( 'Simple.Raw' ) ); // Comment in for Debug
	echo '
				</div>';
};
echo '
			</article>';
tpl_flush ( );

// FOOTER
echo '
			<footer>';

if ( $conf['breadcrumbs'] ) {
	echo '
				<noindex>
					<div class = "breadcrumbs">
						'; tpl_breadcrumbs ( ); echo '
					</div>
				</noindex>';
};
echo $apps . '
				<div class = "count">
					<a href = "//metrika.yandex.ru/stat/?id=25500497&amp;from=informer" target = "_blank" rel = "nofollow">
						<img src = "//informer.yandex.ru/informer/25500497/3_0_7BC9F7FF_5BA9D7FF_0_pageviews" alt = "Яндекс.Метрика" title = "Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" class = "ym-advanced-informer" data-cid = "25500497" data-lang = "ru" />
					</a>
					<noscript>
						<div>
							<img src = "//mc.yandex.ru/watch/25500497" alt = "" />
						</div>
					</noscript>
				</div>

				<div class = "social">';
$socbut = array (
	array (
		'//discord.gg/T8p6M4Q',
		'Discord',
		'//www.google.com/s2/favicons?domain=discord.gg'
	), array (
		'//t.me/comicslate',
		'Telegram',
		'//www.google.com/s2/favicons?domain=t.me'
	), array (
		'//www.reddit.com/r/Comicslate',
		'Reddit',
		'//www.google.com/s2/favicons?domain=reddit.com'
	), array (
		'//rainbow-spike.tumblr.com',
		'Tumblr',
		'//www.google.com/s2/favicons?domain=tumblr.com'
	), array (
		'//facebook.com/groups/comicslate',
		'Facebook',
		'//www.google.com/s2/favicons?domain=facebook.com'
	), array (
		'//twitter.com/Rainbow_Spike',
		'Twitter',
//		'//abs.twimg.com/favicons/twitter.ico'
		'//www.google.com/s2/favicons?domain=twitter.com'
	), array (
		'//vk.com/comicslate',
		'VKontakte',
		'//www.google.com/s2/favicons?domain=vk.com'
	)
);
for ( $i = 0; $i <= count ( $socbut ) - 1; $i++ ) {
	echo '
					<a href = "' . $socbut[$i][0] . '" class = "media" title = "' . $socbut[$i][1] . '" target = "_blank">
						<img src = "' . $socbut[$i][2] . '" class = "media" alt = "' . $socbut[$i][1] . '">
					</a>';
};
echo '
				</div>';

if ( $INFO['ismanager'] ) {
	echo '
				<div class = "pageinfo">
					'; tpl_pageinfo ( ); echo '
				</div>';
};
if ( !empty ( $_SERVER['REMOTE_USER'] ) ) {
	echo '
				<div class = "user">
					'; tpl_userinfo ( ); echo '
				</div>';
}; ?>
			</footer>
		</div>
	</body>
</html>