<!DOCTYPE html>
<?php
/**
 * DokuWiki Default Template
 *
 * This is the template for editing image meta data.
 * It is displayed in the media popup.
 *
 * You should leave the doctype at the very top - It should
 * always be the very first line of a document.
 *
 * @link   http://wiki.splitbrain.org/wiki:tpl:templates
 * @author Andreas Gohr <andi@splitbrain.org>
 */
header('X-UA-Compatible: IE = edge, chrome = 1');
echo "\n" . '<html xml:lang="'.$conf["lang"].'" lang="'.$conf["lang"].'" dir="ltr">
<head><title>'.hsc($lang['mediaselect']).' ['.hsc($conf['title']).']</title>
<meta charset="utf-8"/>
<meta name="description" content="'.strip_tags($conf['title']).' - '.tpl_getLang('descr').'"/>';
tpl_metaheaders();
echo tpl_favicon(array('favicon', 'mobile')).
'<meta name="viewport" content="width = device-width, initial-scale = 1"/>
</head><body>
<div class="dokuwiki">';
html_msgarea();
echo '<h1>'.hsc($lang['metaedit']).'<code>'.hsc(noNS($IMG)).'</code></h1>
<div class="mediaedit">';
/* everything in meta array is tried to save and read */
echo '<div class="data">
<form action="'.DOKU_BASE.'lib/exe/media.php" accept-charset="utf-8" method="post">
<input type="hidden" name="edit" value="'.hsc($IMG).'" />
<input type="hidden" name="save" value="1" />
<label class="block" for="img__title">'.$lang['img_title'].'</label>
<input type="text" name="meta[Iptc.Headline]" id="img__title" class="edit" value="'.hsc(tpl_img_getTag('IPTC.Headline')).'" />
<br />
<label class="block" for="img__caption">'.$lang['img_caption'].'</label>
<textarea name="meta[Iptc.Caption]" id="img__caption" class="edit" rows="5">'.hsc(tpl_img_getTag(array('IPTC.Caption', 'EXIF.UserComment', 'EXIF.TIFFImageDescription', 'EXIF.TIFFUserComment')));.'</textarea>
<br />
<label class="block" for="img__artist">'.$lang['img_artist'].'</label>
<input type="text" name="meta[Iptc.Byline]" id="img__artist" class="edit" value="'.hsc(tpl_img_getTag(array('	Iptc.Byline', 'Exif.TIFFArtist', 'Exif.Artist', 'Iptc.Credit'))).'" />
<br />
<label class="block" for="img__copy">'.$lang['img_copyr'].'</label>
<input type="text" name="meta[Iptc.CopyrightNotice]" id="img__copy" class="edit" value="'.hsc(tpl_img_getTag(array('Iptc.CopyrightNotice', 'Exif.TIFFCopyright', 'Exif.Copyright'))).'" />
<br />
<label class="block" for="img__keywords">'.$lang['img_keywords'].'</label>
<textarea name="meta[Iptc.Keywords]" id="img__keywords" class="edit">'.hsc(tpl_img_getTag(array('IPTC.Keywords', 'EXIF.Category')));.'</textarea>
<br />
<input type="submit" value="'.$lang['btn_save'].'" accesskey="s" class="button" />
</form>
</div>
<div class="footer">
<hr />';
tpl_button('backtomedia'); ?>
</div></div></div></body></html>
