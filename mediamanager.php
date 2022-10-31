<!DOCTYPE html><?php if ( !defined ( 'DOKU_INC' ) ) die ( ); // must be run from within DokuWiki
/* This is the template for the media manager popup
 * @link   http://dokuwiki.org/templates
 * @author Andreas Gohr <andi@splitbrain.org>
 */
$NS = $INFO [ 'namespace' ]; $t2 = "\n\t\t";
$comic = preg_match ( '/:(sci-fi|tlk|wolves|mlp|furry|gamer|other|interrobang):/', $NS );

header ( 'X-UA-Compatible: IE = edge' ); echo '
<html xml:lang = "' . $conf [ "lang" ] . '" lang = "' . $conf [ "lang" ] . '" dir = "' . $lang [ "direction" ] . '">' .
// 1. HEAD
"\n\t" . '<head>' .
$t2 . '<meta charset = "utf-8" />' .
$t2 . '<title>' . hsc ( $lang [ 'mediaselect' ] ) . ' [' . strip_tags ( $conf [ 'title' ] ) . ']</title>' .
$t2 . '<meta name = "viewport" content = "width = device-width, initial-scale = 1" />' .
$t2; tpl_metaheaders ( );
echo "\t" . '</head>' .
// 2. BODY
"\n\t" . '<body>' .
$t2 . '<div id="media__manager" class="dokuwiki lang-' . str_replace ( ":", " ", $NS ) . ( $comic ? ' comic' : '') . '">' .
// Message
$t3 . '<div id="media__left">'; html_msgarea ( );
// PAGE
$t4 . '<h1>' . hsc ( $lang [ 'mediaselect' ] ) . '</h1>' .
$t4 . '<div id="media__opts"></div>' . $t4;
tpl_mediaTree ( );
echo $t3 . '</div>' .

$t3 . '<div id="media__right">' . $t4;
tpl_mediaContent ( );
echo '
';?>			</div>
		</div>
	</body>
</html>
