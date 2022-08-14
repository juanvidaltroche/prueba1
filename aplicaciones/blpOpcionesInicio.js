
Ext.namespace("acl");
//=================================== 2013-6-18 primero inicio
	var summaryTemporal = new Ext.ux.grid.GroupSummary();    
	Ext.ux.grid.GroupSummary.Calculations["totalCost"] =function(v, record, field){  
		 return v+(record.data.CANTIDAD*record.data.TARIFA_UNITARIA)
	}; 

//=================================== 2013-6-18 primero fin
var LABEL_LOADING = "Loading records ...";
var LABEL_FAILURE_LOAD = "Fail loading records";

var LABEL_TITLE_WINDOW = "OPCIONES BLP";

var LABEL_BTN_SEARCH = "Buscar", LABEL_MSG_SEARCH = "Buscar ...";

acl.application = {
  init:function(){
  
    storeProgramacionProcess = function (n, r, i) {
      var myMask = new Ext.LoadMask(Ext.getBody(), {msg: LABEL_LOADING});
      //myMask.show();
	};
	 
    onMnuContext = function(grid, rowIndex,e) {
      e.stopEvent();
      var coords = e.getXY();
      mnuContext.showAt([coords[0], coords[1]]);
    };
	
    
    //Variables declared in html file
    var pageSize = parseInt(20/*CONFIG.pageSize*/);
    var message = "por implementar ..."; // CONFIG.message;


var formOpciones = new Ext.FormPanel({
	frame: true,
	bodyStyle: 'padding:8px',
	labelWidth: 100,
	heigt: 500,
	layout: 'form',
	items: [{
            layout: 'column',
            labelWidth: 100,
            items: [{
						layout: 'form',
						labelWidth: 100,
						bodyStyle: 'padding:0px 0px 0px 10px',
						items: [{
                			xtype: 'button',
							text: 'INICIAR SESION',
							iconCls: 'icon-add',
							width: 150,
							height:50,
							handler: function() {
						    }
					    }]
			            },
			            {
						layout: 'form',
						labelWidth: 100,
						bodyStyle: 'padding:0px 0px 0px 10px',
						items: [{
                			xtype: 'button',
							text: 'CERRAR SESION',
							iconCls: 'icon-add',
							width: 150,
							height:50,
							handler: function() {
						    }
					    }]
		                },
					    {
						layout: 'form',
						labelWidth: 100,
						bodyStyle: 'padding:0px 0px 0px 10px',
						items: [{
                			xtype: 'button',
							text: 'REPORTES',
							iconCls: 'icon-add',
							width: 150,
							height:50,
							handler: function() {
						    }
					    }]
				    }]
			},{
            layout: 'column',
            labelWidth: 100,
            items: [{
				        layout: 'form',
				        labelWidth: 100,
				        bodyStyle: 'padding:0px 0px 0px 10px',
				        items: [{
                			xtype: 'button',
							text: 'INICIAR DIA',
							iconCls: 'icon-add',
							width: 150,
							height:50,
							handler: function() {
						    }
					    }]
						},
					    {
				        layout: 'form',
				        labelWidth: 100,
				        bodyStyle: 'padding:0px 0px 0px 10px',
				        items: [{
                			xtype: 'button',
							text: 'CONTINUAR DIA',
							iconCls: 'icon-add',
							width: 150,
							height:50,
							handler: function() {
						    }
					    }]
					    },
	                    {
                       layout: 'form',
                       labelWidth: 100,
                       bodyStyle: 'padding:0px 0px 0px 10px',
                       items: [{
                			xtype: 'button',
							text: 'CERRAR DIA',
							iconCls: 'icon-add',
							width: 150,
							height:50,
							handler: function() {
						    }
					    }]
	                }]
            }]
          });
	 //Initialize events
//    storeProgramacionProcess(pageSize, pageSize, 0);
 	var win = new Ext.Window({
		title: LABEL_TITLE_WINDOW,
		layout: 'Form',
		//autoWidth: true,
		height: 170,
		width:540,
		x:100,
		y:100,
		resizable: false,
		closable: true,
		draggable: false,
		autoScroll: true,
		items: [formOpciones]
    });
	win.show();
  }
}

Ext.onReady(acl.application.init, acl.application);
