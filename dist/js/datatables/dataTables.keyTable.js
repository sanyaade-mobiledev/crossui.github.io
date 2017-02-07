!function(e){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return e(t,window,document)}):"object"==typeof exports?module.exports=function(t,s){return t||(t=window),s&&s.fn.dataTable||(s=require("datatables.net")(t,s).$),e(s,t,t.document)}:e(jQuery,window,document)}(function(e,t,s,i){"use strict";var n=e.fn.dataTable,a=function(t,s){if(!n.versionCheck||!n.versionCheck("1.10.8"))throw"KeyTable requires DataTables 1.10.8 or newer";this.c=e.extend(!0,{},n.defaults.keyTable,a.defaults,s),this.s={dt:new n.Api(t),enable:!0,focusDraw:!1,waitingForDraw:!1},this.dom={};var i=this.s.dt.settings()[0],o=i.keytable;return o?o:(i.keytable=this,void this._constructor())};return e.extend(a.prototype,{blur:function(){this._blur()},enable:function(e){this.s.enable=e},focus:function(e,t){this._focus(this.s.dt.cell(e,t))},focused:function(e){var t=this.s.lastFocus;if(!t)return!1;var s=this.s.lastFocus.index();return e.row===s.row&&e.column===s.column},_constructor:function(){this._tabInput();var t=this,i=this.s.dt,n=e(i.table().node());"static"===n.css("position")&&n.css("position","relative"),e(i.table().body()).on("click.keyTable","th, td",function(e){if(t.s.enable!==!1){var s=i.cell(this);s.any()&&t._focus(s,null,!1,e)}}),e(s).on("keydown.keyTable",function(e){t._key(e)}),this.c.blurable&&e(s).on("click.keyTable",function(s){e(s.target).parents(".dataTables_filter").length&&t._blur(),e(s.target).parents().filter(i.table().container()).length||e(s.target).parents("div.DTE").length||e(s.target).parents().filter(".DTFC_Cloned").length||t._blur()}),this.c.editor&&i.on("key.keyTable",function(e,s,i,n,a){t._editor(i,a)}),i.settings()[0].oFeatures.bStateSave&&i.on("stateSaveParams.keyTable",function(e,s,i){i.keyTable=t.s.lastFocus?t.s.lastFocus.index():null}),i.on("xhr.keyTable",function(e){if(!t.s.focusDraw){var s=t.s.lastFocus;s&&(t.s.lastFocus=null,i.one("draw",function(){t._focus(s)}))}}),i.on("destroy.keyTable",function(){i.off(".keyTable"),e(i.table().body()).off("click.keyTable","th, td"),e(s.body).off("keydown.keyTable").off("click.keyTable")});var a=i.state.loaded();a&&a.keyTable?i.one("init",function(){var e=i.cell(a.keyTable);e.any()&&e.focus()}):this.c.focus&&i.cell(this.c.focus).focus()},_blur:function(){if(this.s.enable&&this.s.lastFocus){var t=this.s.lastFocus;e(t.node()).removeClass(this.c.className),this.s.lastFocus=null,this._updateFixedColumns(t.index().column),this._emitEvent("key-blur",[this.s.dt,t])}},_columns:function(){var e=this.s.dt,t=e.columns(this.c.columns).indexes(),s=[];return e.columns(":visible").every(function(e){t.indexOf(e)!==-1&&s.push(e)}),s},_editor:function(t,s){var i=this.s.dt,n=this.c.editor;16!==t&&(s.stopPropagation(),13===t&&s.preventDefault(),n.inline(this.s.lastFocus.index()),e("div.DTE input, div.DTE textarea").select(),i.keys.enable(this.c.editorKeys),i.one("key-blur.editor",function(){n.displayed()&&n.submit()}),n.one("close",function(){i.keys.enable(!0),i.off("key-blur.editor")}))},_emitEvent:function(t,s){this.s.dt.iterator("table",function(i,n){e(i.nTable).triggerHandler(t,s)})},_focus:function(n,a,o,l){var r=this,u=this.s.dt,c=u.page.info(),f=this.s.lastFocus;if(l||(l=null),this.s.enable){if("number"!=typeof n){var d=n.index();a=d.column,n=u.rows({filter:"applied",order:"applied"}).indexes().indexOf(d.row),c.serverSide&&(n+=c.start)}if(c.length!==-1&&(n<c.start||n>=c.start+c.length))return this.s.focusDraw=!0,this.s.waitingForDraw=!0,void u.one("draw",function(){r.s.focusDraw=!1,r.s.waitingForDraw=!1,r._focus(n,a)}).page(Math.floor(n/c.length)).draw(!1);if(e.inArray(a,this._columns())!==-1){c.serverSide&&(n-=c.start);var h=u.cell(":eq("+n+")",a,{search:"applied"});if(f){if(f.node()===h.node())return;this._blur()}var b=e(h.node());if(b.addClass(this.c.className),this._updateFixedColumns(a),o===i||o===!0){this._scroll(e(t),e(s.body),b,"offset");var y=u.table().body().parentNode;if(y!==u.table().header().parentNode){var p=e(y.parentNode);this._scroll(p,p,b,"position")}}this.s.lastFocus=h,this._emitEvent("key-focus",[this.s.dt,h,l||null]),u.state.save()}}},_key:function(t){if(this.s.waitingForDraw)return void t.preventDefault();var s=this.s.enable,i=s===!0||"navigation-only"===s;if(s&&!(0===t.keyCode||t.ctrlKey||t.metaKey||t.altKey)){var n=this.s.lastFocus;if(n){var a=this,o=this.s.dt;if(!this.c.keys||e.inArray(t.keyCode,this.c.keys)!==-1)switch(t.keyCode){case 9:this._shift(t,t.shiftKey?"left":"right",!0);break;case 27:this.s.blurable&&s===!0&&this._blur();break;case 33:case 34:if(i){t.preventDefault();var l=o.cells({page:"current"}).nodes().indexOf(n.node());this.s.waitingForDraw=!0,o.one("draw",function(){var e=o.cells({page:"current"}).nodes();a._focus(o.cell(l<e.length?e[l]:e[e.length-1]),null,!0,t),a.s.waitingForDraw=!1}).page(33===t.keyCode?"previous":"next").draw(!1)}break;case 35:case 36:if(i){t.preventDefault();var r=o.cells({page:"current"}).indexes(),u=this._columns();this._focus(o.cell(r[35===t.keyCode?r.length-1:u[0]]),null,!0,t)}break;case 37:i&&this._shift(t,"left");break;case 38:i&&this._shift(t,"up");break;case 39:i&&this._shift(t,"right");break;case 40:i&&this._shift(t,"down");break;default:s===!0&&this._emitEvent("key",[o,t.keyCode,this.s.lastFocus,t])}}}},_scroll:function(e,t,s,i){var n=s[i](),a=s.outerHeight(),o=s.outerWidth(),l=t.scrollTop(),r=t.scrollLeft(),u=e.height(),c=e.width();n.top<l&&t.scrollTop(n.top),n.left<r&&t.scrollLeft(n.left),n.top+a>l+u&&a<u&&t.scrollTop(n.top+a-u),n.left+o>r+c&&o<c&&t.scrollLeft(n.left+o-c)},_shift:function(t,s,i){var n=this.s.dt,a=n.page.info(),o=a.recordsDisplay,l=this.s.lastFocus,r=this._columns();if(l){var u=n.rows({filter:"applied",order:"applied"}).indexes().indexOf(l.index().row);a.serverSide&&(u+=a.start);var c=n.columns(r).indexes().indexOf(l.index().column),f=u,d=r[c];"right"===s?c>=r.length-1?(f++,d=r[0]):d=r[c+1]:"left"===s?0===c?(f--,d=r[r.length-1]):d=r[c-1]:"up"===s?f--:"down"===s&&f++,f>=0&&f<o&&e.inArray(d,r)!==-1?(t.preventDefault(),this._focus(f,d,!0,t)):i&&this.c.blurable?this._blur():t.preventDefault()}},_tabInput:function(){var t=this,s=this.s.dt,i=null!==this.c.tabIndex?this.c.tabIndex:s.settings()[0].iTabIndex;if(i!=-1){var n=e('<div><input type="text" tabindex="'+i+'"/></div>').css({position:"absolute",height:1,width:0,overflow:"hidden"}).insertBefore(s.table().node());n.children().on("focus",function(e){t._focus(s.cell(":eq(0)","0:visible",{page:"current"}),null,!0,e)})}},_updateFixedColumns:function(e){var t=this.s.dt,s=t.settings()[0];if(s._oFixedColumns){var i=s._oFixedColumns.s.iLeftColumns,n=s.aoColumns.length-s._oFixedColumns.s.iRightColumns;(e<i||e>n)&&t.fixedColumns().update()}}}),a.defaults={blurable:!0,className:"focus",columns:"",editor:null,editorKeys:"navigation-only",focus:null,keys:null,tabIndex:null},a.version="2.1.4-dev",e.fn.dataTable.KeyTable=a,e.fn.DataTable.KeyTable=a,n.Api.register("cell.blur()",function(){return this.iterator("table",function(e){e.keytable&&e.keytable.blur()})}),n.Api.register("cell().focus()",function(){return this.iterator("cell",function(e,t,s){e.keytable&&e.keytable.focus(t,s)})}),n.Api.register("keys.disable()",function(){return this.iterator("table",function(e){e.keytable&&e.keytable.enable(!1)})}),n.Api.register("keys.enable()",function(e){return this.iterator("table",function(t){t.keytable&&t.keytable.enable(e===i||e)})}),n.ext.selector.cell.push(function(e,t,s){var n=t.focused,a=e.keytable,o=[];if(!a||n===i)return s;for(var l=0,r=s.length;l<r;l++)(n===!0&&a.focused(s[l])||n===!1&&!a.focused(s[l]))&&o.push(s[l]);return o}),e(s).on("preInit.dt.dtk",function(t,s,i){if("dt"===t.namespace){var o=s.oInit.keys,l=n.defaults.keys;if(o||l){var r=e.extend({},l,o);o!==!1&&new a(s,r)}}}),a});