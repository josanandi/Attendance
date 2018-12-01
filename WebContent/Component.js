sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";

	return UIComponent.extend("com.work.attendance.Component", {

		metadata: {
			manifest: "json"
		},
		
//		createContent : function() {
//			return new sap.ui.view({
//				id : "Main",
//				viewName : "com.work.attendance.view.Main",
//				type : sap.ui.core.mvc.ViewType.XML
//			});
//		}
		init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // create the views based on the url/hash
           
        }

	});

});

