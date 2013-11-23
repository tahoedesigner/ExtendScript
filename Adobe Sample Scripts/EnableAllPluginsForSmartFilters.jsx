// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.

$.localize = true;

if (confirm(localize("$$$/JavaScript/EnableAll=Enable all filters for smart filters?"))) {
	var d = new ActionDescriptor();
	d.putBoolean(stringIDToTypeID("enabled"), true);
	app.putCustomOptions("smartFilterEnableAll", d);
} else {
	app.eraseCustomOptions("smartFilterEnableAll");
}
