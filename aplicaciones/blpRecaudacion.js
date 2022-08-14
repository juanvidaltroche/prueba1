Ext.require([
    'Ext.form.*',
    'Ext.layout.container.Column',
    'Ext.tab.Panel',
	'Ext.Action',
	 'Ext.button.Button'
]);


/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function(){

    Ext.QuickTips.init();

    var bd = Ext.getBody();
    /*
     * ================  Form 5  =======================
     */
    bd.createChild({tag: 'h2', html: 'Form 5 - ... and forms can contain TabPanel(s)'});

    var tab2 = Ext.create('Ext.form.Panel', {
        title: 'Inner Tabs',
        bodyStyle:'padding:5px',
        width: 600,
        fieldDefaults: {
            labelAlign: 'top',
            msgTarget: 'side'
        },
        defaults: {
            anchor: '100%'
        },

        items: [{
            layout:'column',
            border:false,
            items:[{
                columnWidth:.5,
                border:false,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Conductor',
                    name: 'first',
                    anchor:'95%'
                }, {
                    fieldLabel: 'Herramienta',
                    name: 'company',
                    anchor:'95%'
                }]
            },{
                columnWidth:.5,
                border:false,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Recaudador',
                    name: 'last',
                    anchor:'95%'
                },{
                    fieldLabel: 'Email',
                    name: 'email',
                    vtype:'email',
                    anchor:'95%'
                }]
            }]
        },{
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            height:235,
            defaults:{bodyStyle:'padding:10px'},
            items:[{
                title:'Recaudacion',
                defaults: {width: 230},
                defaultType: 'textfield',
/*              items: [{
                    fieldLabel: 'First Name',
                    name: 'first',
                    allowBlank:false,
                    value: 'Jamie'
                }*/
				buttons: [{		text: 'Normal'        },
						{ 		text: 'Escolar'        }]
            },{
                title:'Phone Numbers',
                defaults: {width: 230},
                defaultType: 'textfield',

                items: [{
                    fieldLabel: 'Home',
                    name: 'home',
                    value: '(888) 555-1212'
                }]
            },{
                cls: 'x-plain',
                title: 'Biography',
                layout: 'fit',
                items: {
                    xtype: 'htmleditor',
                    name: 'bio2',
                    fieldLabel: 'Biography'
                }
            }]
        }],

        buttons: [{
            text: 'Save'
        },{
            text: 'Cancel'
        }]
    });

    tab2.render(document.body);
});



