<?php
/**
 * DokuWiki Default Template
 *
 * This is the template for the media manager popup
 *
 * @link   http://dokuwiki.org/templates
 * @author Andreas Gohr <andi@splitbrain.org>
 */

// must be run from within DokuWiki
if (!defined('DOKU_INC')) die();
header('X-UA-Compatible: IE = edge, chrome = 1');
echo '<!DOCTYPE html><html xml:lang="'.$conf["lang"].'" lang="'.$conf["lang"].'" dir="ltr"><head>'.PHP_EOL.
'<title>'.hsc($lang['mediaselect']).' ['.strip_tags($conf['title']).']</title>'.PHP_EOL.
'<meta charset="utf-8"/>'.PHP_EOL;
tpl_metaheaders();
echo tpl_favicon(array('favicon', 'mobile')).
'<meta name="viewport" content="width = device-width, initial-scale = 1"/>
</head><body>
<div id="media__manager" class="dokuwiki">

<div id="media__left">';html_msgarea();
echo '<h1>'.hsc($lang['mediaselect']).'</h1>
<div id="media__opts"></div>'.PHP_EOL;
tpl_mediaTree();
echo '</div>

<div id="media__right">';
tpl_mediaContent();
echo '</div>

</div>
</body></html>';
// <script type="text/javascript" src="'.tpl_basedir().'js/intermanager.js?ver='.date ("y-m-d_H:i:s", filemtime('/var/www/comicslate.org/lib/tpl/tempe/js/intermanager.js')).' defer"></script>
