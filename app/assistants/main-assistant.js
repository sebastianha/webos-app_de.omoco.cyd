/*
Crack Your Display - A Fun Application to shock your friends.
Version 1.1.0 (21. Mar 2010)

Copyright (C) 2010 Sebastian Hammerl (E-Mail: cyd@omoco.de)

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License as
published by the Free Software Foundation; either version 3 of
the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, see <http://www.gnu.org/licenses/>.
*/

function MainAssistant() {
	IMAGE = "";
	MULTICRACKS = false;
}

MainAssistant.prototype.setup = function() {
	this.appMenuModel = {
		visible: true,
		items: [
			{ label: $L("About"), command: 'about' }
		]
	};
	
	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, this.appMenuModel);
	
	var cookie = new Mojo.Model.Cookie("cyd");
	var cydpref = cookie.get();
	if(cydpref != null)
	{
		IMAGE = cydpref.lastimage;
		MULTICRACKS = cydpref.multicracks;
	}
	
	AdMob.ad.initialize({
		pub_id: 'a14c344766a3ee6',
		bg_color: '#ccc',
		text_color: '#333',
		test_mode: false
	});
	
	AdMob.ad.request({
		onSuccess: (function (ad) {
			this.controller.get('admob_ad').insert(ad);
		}).bind(this),
		onFailure: (function () {}).bind(this),
	});
	
	this.controller.listen($('select_image'),Mojo.Event.tap, this.selectImage.bind(this));
	this.controller.listen($('start'),Mojo.Event.tap, this.start.bind(this));
	
	CRACK = "random";
	CRACK_HORIZ = true;
	CRACK_VERT = true;
	
	this.cracks = [];
	selectorsModel = { cracktype: $L("") };

	this.controller.listen('crackselector', Mojo.Event.propertyChange, this.selectorChanged.bindAsEventListener(this));
	this.controller.setupWidget('crackselector', {label: $L("Crack Type"), choices: this.cracks, modelProperty:'cracktype'}, selectorsModel);
	
	selectorsModel.choices = [
		{ label: "random", value:0, horiz: true, vert: true},
		{ label: "center", value:1, horiz: true, vert: true},
		{ label: "crushed", value:2, horiz: true, vert: true},
		{ label: "fine", value:3, horiz: true, vert: true},
		{ label: "hole", value:4, horiz: true, vert: true},
		{ label: "large", value:5, horiz: true, vert: true},
		{ label: "light", value:6, horiz: true, vert: true},
		{ label: "scattered", value:7, horiz: true, vert: true},
		{ label: "small1", value:8, horiz: true, vert: true},
		{ label: "small2", value:9, horiz: true, vert: true},
	];
	this.controller.modelChanged(selectorsModel);
	
	mcattr = {trueLabel: 'yes', falseLabel: 'no'};
	mcModel = {value: MULTICRACKS, disabled: false};
	this.controller.setupWidget('multicracks', mcattr, mcModel);
	Mojo.Event.listen(this.controller.get('multicracks'),Mojo.Event.propertyChange,this.mcTogglePressed.bind(this));
}

MainAssistant.prototype.mcTogglePressed = function(){
	MULTICRACKS = event.value;
	var cookie = new Mojo.Model.Cookie("cyd");
	cookie.put({
		lastimage: IMAGE,
		multicracks: MULTICRACKS
	});
}

MainAssistant.prototype.selectImage = function() {
	var params = {
		kinds: ['image'],
		onSelect: this.imageSelected.bind(this)
	};
	Mojo.FilePicker.pickFile(params, this.controller.stageController);
}

MainAssistant.prototype.selectorChanged = function(event) {
	CRACK = selectorsModel.choices[event.value].label;
	CRACK_HORIZ = selectorsModel.choices[event.value].horiz;
	CRACK_VERT = selectorsModel.choices[event.value].vert;
}

MainAssistant.prototype.imageSelected = function(file) {
	IMAGE = file.fullPath;
	var cookie = new Mojo.Model.Cookie("cyd");
	cookie.put({
		lastimage: IMAGE,
		multicracks: MULTICRACKS
	});
}

MainAssistant.prototype.start = function(event){
	if(IMAGE != "")
		Mojo.Controller.stageController.pushScene("show");
	else
		Mojo.Controller.errorDialog($L("No image selected!"));
}

MainAssistant.prototype.activate = function(event) {

}

MainAssistant.prototype.deactivate = function(event) {

}

MainAssistant.prototype.cleanup = function(event) {

}

MainAssistant.prototype.handleCommand = function(event){
    if(event.type == Mojo.Event.command) {	
		switch (event.command) {
			case 'about':
				Mojo.Controller.stageController.pushScene("about");
				break;
		}
	}
}