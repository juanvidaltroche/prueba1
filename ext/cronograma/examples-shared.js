var ExampleDefaults = {
	width   : '100%',
	height  : 500
};

Ext.onReady(function() {
    if (window.location.href.match(/^file:\/\/\//)) {
        Ext.Msg.alert('ERROR: Debes usar un servidor web', 'CORRE el ejemplo en un servidor web (no uses el protocolo file:/// )')
    }

    // Temp bug fix for Ext 4.2.1 and IE10+ which has gradient background support
    if (!Ext.isIE9m && Ext.versions.extjs.isLessThan("4.2.2")) {
        Ext.getHead().createChild({
            tag   : 'style',
            type  : 'text/css',
            html  : ".x-column-header { background-image : -ms-linear-gradient(top,#f9f9f9,#e3e4e6); }" +
                ".x-column-header-over { background-image : -ms-linear-gradient(top,#ebf3fd,#d9e8fb); }"
        });
    }
})