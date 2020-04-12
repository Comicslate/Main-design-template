<?php
header ( 'X-UA-Compatible: IE = edge, chrome = 1' );
echo '<!DOCTYPE html>
<html xml:lang = "' . $conf["lang"] . '" lang = "' . $conf["lang"] . '" dir = "' . $lang['direction'] . '">
	<head>
		<meta charset = "utf-8" />
		<title>'; tpl_pagetitle ( ); echo ' [' . strip_tags ( $conf['title'] ) . ']</title>
		<link rel="alternate" type="application/json+oembed" href="https://app.comicslate.org/embed.json?id='.$ID.'" />
		<meta name = "viewport" content = "width = device-width, initial-scale = 1" />
		<script src="//an.yandex.ru/system/context.js" async></script>
		<script src="//mc.yandex.ru/metrika/tag.js" async></script>
		<script src = "//cdn.sendpulse.com/js/push/959988d16690251d333a6f140762013e_1.js" async></script>
		' . tpl_favicon ( array ( 'favicon', 'mobile' ) );
tpl_metaheaders ( );
/*echo '
		<meta http-equiv = "Content-Security-Policy-Report-Only" content = "default-src *; script-src \'self\' \'unsafe-eval\' //cdnjs.cloudflare.com //cdn.sendpulse.com wss://realtime.services.disqus.com //disqus.com; style-src \'self\'; object-src \'self\' //youtube.com; img-src \'self\'; media-src \'self\' //youtube.com; frame-src \'self\'; font-src \'self\'; ">';*/
echo '
	</head>
	<body>
		<div class = "dokuwiki lang-' . $conf["lang"] . '">';

// HEADER
$rlogo = time ( ) / 600 % 9;
echo '
			<header>
				<div class="newlogo logo' . $rlogo . '"></div>
				<div class = "menu logo' . $rlogo . '">';
$ilinks = array (
	array ( '/'. $conf["lang"] . '/start',		tpl_getLang ( 'start' ),	'_self' ),
	array ( '/'. $conf["lang"] . '/menu',		tpl_getLang ( 'menu' ),		'_self' ),
	array ( '/'. $conf["lang"] . '/news/index',	tpl_getLang ( 'news' ),		'_self' ),
	array ( '/'. $conf["lang"] . '/wiki/index',	tpl_getLang ( 'helproom' ),	'_blank' ),
	array ( '//discord.gg/T8p6M4Q',				tpl_getLang ( 'chat' ),		'_blank' ),
	array ( '//app.comicslate.org/',			'Mobile App',				'_blank' ),
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
			</header>

			<nav class = "translation">
				';
$translation = plugin_load ( 'helper', 'translation' );
if ( $translation ) echo $translation -> showTranslations ( );
echo '
			</nav>';

// MAIN
tpl_flush ( );
echo '
			<div id = "translabel"></div>';
if ( !empty ( html_msgarea ( ) ) ) {
	echo '
			<div class = "meta">
				'; html_msgarea ( ); echo '
			</div>';
};

$apps = '
				<div class = "apps">
					<a href = "//play.google.com/store/apps/details?id=org.dasfoo.comicslate&amp;utm_source=comicslate-org" target = "_blank">
						<img src = "' . DOKU_TPL . 'images/googleapp_optim.svg" alt = "Get it on Google Play">
					</a>
					<a href = "//apps.apple.com/ru/app/comicslate/id1485894069" target = "_blank">
						<img src = "' . DOKU_TPL . 'images/appstore_optim.svg" alt = "Download on the App Store">
					</a>
				</div>';

echo '
			<article class = "page">' . $apps . '
				'; tpl_content ( ); echo '
			</article>';
tpl_flush ( );

echo '
			<noindex>
				<aside id = "pagetools">
					<ul>
						' . ( new \dokuwiki\Menu\PageMenu ( ) ) -> getListItems ( ) . '
					</ul>
				</aside>
			</noindex>';

// FOOTER
echo '
			<div id = "yandex_rtb"></div>
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
				</div>';
/*<script src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async></script>
<script>
	(adsbygoogle = window.adsbygoogle || []).push({
		google_ad_client: "ca-pub-1929476284872276",
		enable_page_level_ads: true
	});
</script>
*/
/* более новый вид Google AdSense
<script src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async></script>
<ins class="adsbygoogle" style = "display: inline-block; width: 728px; height: 90px;" data-ad-client = "ca-pub-1929476284872276" data-ad-slot = "1234567890"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
*/

echo '
				<div class = "social">
					';
$socbut = array (
	array (
		'/feed.php',
		tpl_getLang ( 'RSS' ),
		'rss'
	), array (
		'/feed.php?onlynewpages=1',
		tpl_getLang ( 'RSS' ) . ' (' . tpl_getLang ( 'RSSnew' ) . ')',
		'rss'
	), array (
		'//patreon.com/comicslate',
		'Patreon',
		'patreon'
	), array (
		'//discord.gg/T8p6M4Q',
		'Discord',
		'discord'
	), array (
		'//t.me/comicslate',
		'Telegram',
		'telegram'
	), array (
		'//www.reddit.com/r/Comicslate',
		'Reddit',
		'reddit'
	), array (
		'//rainbow-spike.tumblr.com',
		'Tumblr',
		'tumblr'
	), array (
		'//facebook.com/groups/comicslate',
		'Facebook',
		'facebook'
	), array (
		'//twitter.com/Rainbow_Spike',
		'Twitter',
		'twitter'
	), array (
		'//vk.com/comicslate',
		'VKontakte',
		'vkontakte'
	), array (
		'/feed.php?mode=recent&amp;ns=' . $INFO['namespace'],
		tpl_getLang ( 'RSSpart' ),
		'rss'
	), array (
		'/feed.php?mode=recent&amp;ns=' . $INFO['namespace'] . '&amp;onlynewpages=1',
		tpl_getLang ( 'RSSpart' ) . ' (' . tpl_getLang ( 'RSSnew' ) . ')',
		'rss'
	)
);
for ( $i = 0; $i <= count ( $socbut ) - 1; $i++ ) {
	echo '<a href = "' . $socbut[$i][0] . '" class = "media ' . $socbut[$i][2] . '" title = "' . $socbut[$i][1] . '" target = "_blank"></a>';
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
};

// END
echo '
			</footer>
		</div>';
if ( ( $ACT == 'edit' ) || ( $ACT == 'preview' ) ) {
	echo '
		<script charset="UTF-8" src="/lib/plugins/cotan/editor.js?ver=' . date ( "y-m-d_H:i:s", filemtime ( '/var/www/comicslate.org/lib/plugins/cotan/editor.js' ) ) . '" defer></script>';
};
echo '
		<div class="no">
			'; tpl_indexerWebBug ( ); ?>
		</div>
	</body>
</html>
