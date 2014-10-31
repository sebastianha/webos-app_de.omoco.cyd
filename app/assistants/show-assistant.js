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

function ShowAssistant() {

}

ShowAssistant.prototype.setup = function() {
	this.controller.enableFullScreenMode(true);
	
	this.controller.listen($('first'),Mojo.Event.tap, this.crack.bindAsEventListener(this));

	if(MULTICRACKS) {
		this.controller.listen($('second1'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second2'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second3'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second4'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second5'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second6'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second7'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second8'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second9'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second10'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second11'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second12'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second13'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second14'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
		this.controller.listen($('second15'),Mojo.Event.tap, this.crack.bindAsEventListener(this));
	} else {
		this.controller.listen($('second1'),Mojo.Event.tap, this.decrack.bindAsEventListener(this));
	}

	$('first').style.backgroundImage = "url(" + IMAGE + ")";
	$('first').style.display = "block";
	
	this.counter = 1;
}

ShowAssistant.prototype.crack = function(event){
	if(this.counter < 16) {
	Mojo.Log.error("BLA" + this.counter);
	
	if (CRACK != "random") {
		$('second' + this.counter).style.backgroundImage = "url(images/" + CRACK + ".png)";
	} 
	else {
		var cracknumber = 1 + parseInt(Math.random() * 8);
		$('second' + this.counter).style.backgroundImage = "url(images/" + selectorsModel.choices[cracknumber].label + ".png)";
		if(cracknumber < 1 || cracknumber > 9)
			$('second' + this.counter).style.backgroundImage = "url(images/fine.png)";
	}
	
	if(CRACK_HORIZ == false) {
		$('second' + this.counter).style.left = "0px";
		$('second' + this.counter).style.width = "320px";
	} else {
		$('second' + this.counter).style.left = (event.down.clientX - 320) + "px";
		$('second' + this.counter).style.width = "640px";
	}
	
	if(CRACK_VERT == false) {
		$('second' + this.counter).style.top = "0px";
		$('second' + this.counter).style.height = "480px";
	} else {
		$('second' + this.counter).style.top = (event.down.clientY - 480) + "px";
		$('second' + this.counter).style.height = "960px";
	}

	$('second' + this.counter).style.display = "block";
	
	if(MULTICRACKS)
		this.counter++;
	}
}

ShowAssistant.prototype.decrack = function(event){
	$('second1').style.display = "none";
}

ShowAssistant.prototype.activate = function(event) {
	Mojo.Controller.stageController.setWindowProperties({ blockScreenTimeout: true });
}

ShowAssistant.prototype.deactivate = function(event) {

}

ShowAssistant.prototype.cleanup = function(event) {

}
