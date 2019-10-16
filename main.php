<?php
header ( 'X-UA-Compatible: IE = edge, chrome = 1' );
echo '<!DOCTYPE html>
<html xml:lang = "' . $conf["lang"] . '" lang = "' . $conf["lang"] . '" dir = "' . $lang['direction'] . '">
	<head>
		<title>'; tpl_pagetitle ( ); echo ' [' . strip_tags ( $conf['title'] ) . ']</title>
		<meta charset = "utf-8"/>

		<!-- https://github.com/dotdoom/comicsbot/blob/55fc09116b7a6710b22f44641711329436e8b73b/src/app.ts#L111-L120 -->
		<meta property="og:image" content="https://app.comicslate.org/embed/image?id='.$ID.'" />
		<link rel="alternate" type="application/json+oembed" href="https://app.comicslate.org/embed/json?id='.$ID.'" />
		<meta name="twitter:card" content="summary_large_image">

		<meta name = "viewport" content = "width = device-width, initial-scale = 1" />
		' . tpl_favicon ( array ( 'favicon', 'mobile' ) );
tpl_metaheaders ( );
/*echo '
		<meta http-equiv = "Content-Security-Policy-Report-Only" content = "default-src *; script-src \'self\' \'unsafe-eval\' //cdnjs.cloudflare.com //cdn.sendpulse.com wss://realtime.services.disqus.com //disqus.com; style-src \'self\'; object-src \'self\' //youtube.com; img-src \'self\'; media-src \'self\' //youtube.com; frame-src \'self\'; font-src \'self\'; ">';*/
echo '
		<script charset = "UTF-8" src = "//cdn.sendpulse.com/js/push/959988d16690251d333a6f140762013e_1.js" async></script>
	</head>
	<body>
		<a href = "//play.google.com/store/apps/details?id=org.dasfoo.comicslate&amp;utm_source=comicslate-org" id = "googleapp" class = "googleplay media" target = "_blank">
			<img class = "smart" src = "//play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt = "Get it on Google Play">
			<img class = "smart" src = "//lh3.googleusercontent.com/DxESP0owr-Qim9fKLqmFlQGE-E81fbmP7aEGQi1muk0tYcRCeJxYYvXyW8P9PKaB6CY=w1920-h978" alt = "Get it on Google Play">
		</a>
		<div class = "dokuwiki lang-' . $conf["lang"] . '">';

// HEADER
$rlogo = time ( ) / 600 % 9;
$lng = '/' . explode ( ":", $INFO['namespace'] )[0];
if ( $lng == '/' ) $lng = 'ru';

echo '
			<header>
				<img class = "logo" src="' . DOKU_TPL . 'images/logo' . $rlogo . '.png" alt = "logotype #' . ( $rlogo + 1 ) . '" />
				<div class = "menu logo-' . $rlogo . '">';
$ilinks = array (
	array ( $lng . '/start', tpl_getLang ( 'start' ), '_self' ),
	array ( $lng . '/menu', tpl_getLang ( 'menu' ), '_self' ),
	array ( $lng . '/news/index', tpl_getLang ( 'news' ), '_self' ),
	array ( $lng . '/wiki/index', tpl_getLang ( 'helproom' ), '_blank' ),
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
echo '
			<article class = "page">
				'; tpl_content ( ); echo '
			</article>';
tpl_flush ( );

echo '
			<aside id = "pagetools">
				<ul>
					' . ( new \dokuwiki\Menu\PageMenu ( ) ) -> getListItems ( ) . '
				</ul>
			</aside>';

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
echo '
				<a href = "//play.google.com/store/apps/details?id=org.dasfoo.comicslate&amp;utm_source=comicslate-org" class = "googleplay media" target = "_blank">
					<img src = "//play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt = "Get it on Google Play">
				</a>

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
				<div class = "social">';
$socbut = array (
	array (
		'/feed.php',
		tpl_getLang ( 'RSS' ),
		DOKU_TPL . 'images/rss-full.png'
	), array (
		'/feed.php?onlynewpages=1',
		tpl_getLang ( 'RSS' ) . ' (' . tpl_getLang ( 'RSSnew' ) . ')',
		DOKU_TPL . 'images/rss-full_new.png'
/*	), array (
		'//patreon.com/comicslate',
		'Patreon',
		'//www.google.com/s2/favicons?domain=patreon.com'*/
	), array (
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
	), array (
		'/feed.php?mode=recent&amp;ns=' . $INFO['namespace'],
		tpl_getLang ( 'RSSpart' ),
		DOKU_TPL . 'images/rss-chap.png'
	), array (
		'/feed.php?mode=recent&amp;ns=' . $INFO['namespace'] . '&amp;onlynewpages=1',
		tpl_getLang ( 'RSSpart' ) . ' (' . tpl_getLang ( 'RSSnew' ) . ')',
		DOKU_TPL . 'images/rss-chap_new.png'
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
