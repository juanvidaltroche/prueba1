  alto_Emer = (window.screen.height - 150);
    ancho_Emer = (window.screen.width - 150);
    Ext.onReady(function () {
        var formPrincipal = new Ext.FormPanel({
            title: '',
            bodyStyle: 'padding:5px',
            heigth: '100%',
            width: 800,
            tbar: new Ext.Toolbar({
                items: []
            }),
            items: [{
                xtype: 'tabpanel',
                plain: true,
                activeTab: 0,
                height: 1000,
                defaults: { bodyStyle: 'padding:10px' },
                items: [{
                    xtype: 'panel',
                    title: 'CONCILIACIONES DE LIQUIDACION',
                    width: '99%',
                    layout: 'column',
                    frame: true,
                    //html: '<iframe id="iframe01" src="../Objetivos/Objetivos"  class="contentInner" scrolling="no" frameborder="0"width=100% height=100%></iframe>'
                    html: '<iframe id="iframe01" src="http://gmlpsr0082/Reports/Pages/Report.aspx?ItemPath=%2fREPORTES+SISTEMA+RECAUDO%2fReporte+Por+Fecha+Linea+Bus+Anfitrion&SelectedSubTabId=ReportDataSourcePropertiesTab"  class="contentInner" scrolling="no" frameborder="0"width=100% height=100%></iframe>'
                }]
            }]

        });
      
        var viewport = new Ext.Viewport({
            layout: 'fit',
            renderTo: Ext.getBody(),
            items: [{
                region: 'center',
                layout: 'fit',
                xtype: 'panel',
                height: 300,
                split: true,
                collapsible: true,
                flex: 1,
                collapsed: false,
                title: 'REPORTES GERENCIALES',
                bodyStyle: 'padding:5px;',
                width: 300,
                items: [formPrincipal]
            }]

        });
        var win = new Ext.Window({
            title: '',
            top: 0,
            x: 0,
            y: 0,
            layout: 'form',
            width: '100%',
            autoScroll: true,
            closable: false,
            draggable: false,
            resizable: false,
            items: [viewport]
        });
        win.show();
    });