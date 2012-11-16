/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	config.resize_enabled = false;
	config.toolbar = 'my_toolbar';
 
	config.toolbar_my_toolbar =
	[
		{ name: 'clipboard', items : [ 'Cut','Copy','Paste'] },
		{ name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','Scayt' ] },
		{ name: 'insert', items : [ 'Image','Table','HorizontalRule', 'SpecialChar','PageBreak'] },
                '/',
		{ name: 'styles', items : [ 'Styles','Format', 'Font', 'FontSize' ] },
		{ name: 'basicstyles', items : [ 'Bold','Italic','Strike',] },
		{ name: 'paragraph', items : [ 'NumberedList','BulletedList'] },
		{ name: 'links', items : [ 'Link' ] }
	];
};
