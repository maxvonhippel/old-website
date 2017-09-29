!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return b(a,c)}):"object"==typeof exports?b(a,require("jquery")):b(a,a.jQuery||a.Zepto)}(this,function(a,b){"use strict";function c(a){if(w&&"none"===a.css("animation-name")&&"none"===a.css("-webkit-animation-name")&&"none"===a.css("-moz-animation-name")&&"none"===a.css("-o-animation-name")&&"none"===a.css("-ms-animation-name"))return 0;var b,c,d,e,f=a.css("animation-duration")||a.css("-webkit-animation-duration")||a.css("-moz-animation-duration")||a.css("-o-animation-duration")||a.css("-ms-animation-duration")||"0s",g=a.css("animation-delay")||a.css("-webkit-animation-delay")||a.css("-moz-animation-delay")||a.css("-o-animation-delay")||a.css("-ms-animation-delay")||"0s",h=a.css("animation-iteration-count")||a.css("-webkit-animation-iteration-count")||a.css("-moz-animation-iteration-count")||a.css("-o-animation-iteration-count")||a.css("-ms-animation-iteration-count")||"1";for(f=f.split(", "),g=g.split(", "),h=h.split(", "),e=0,c=f.length,b=Number.NEGATIVE_INFINITY;e<c;e++)d=parseFloat(f[e])*parseInt(h[e],10)+parseFloat(g[e]),d>b&&(b=d);return b}function d(){if(b(document).height()<=b(window).height())return 0;var a,c,d=document.createElement("div"),e=document.createElement("div");return d.style.visibility="hidden",d.style.width="100px",document.body.appendChild(d),a=d.offsetWidth,d.style.overflow="hidden",e.style.width="100%",d.appendChild(e),c=e.offsetWidth,d.parentNode.removeChild(d),a-c}function e(){if(!x){var a,c,e=b("html"),f=k("is-locked");e.hasClass(f)||(c=b(document.body),a=parseInt(c.css("padding-right"),10)+d(),c.css("padding-right",a+"px"),e.addClass(f))}}function f(){if(!x){var a,c,e=b("html"),f=k("is-locked");e.hasClass(f)&&(c=b(document.body),a=parseInt(c.css("padding-right"),10)-d(),c.css("padding-right",a+"px"),e.removeClass(f))}}function g(a,b,c,d){var e=k("is",b),f=[k("is",u.CLOSING),k("is",u.OPENING),k("is",u.CLOSED),k("is",u.OPENED)].join(" ");a.$bg.removeClass(f).addClass(e),a.$overlay.removeClass(f).addClass(e),a.$wrapper.removeClass(f).addClass(e),a.$modal.removeClass(f).addClass(e),a.state=b,!c&&a.$modal.trigger({type:b,reason:d},[{reason:d}])}function h(a,d,e){var f=0,g=function(a){a.target===this&&f++},h=function(a){a.target===this&&0===--f&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].off(r+" "+s)}),d())};b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].on(r,g).on(s,h)}),a(),0===c(e.$bg)&&0===c(e.$overlay)&&0===c(e.$wrapper)&&0===c(e.$modal)&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(a,b){e[b].off(r+" "+s)}),d())}function i(a){a.state!==u.CLOSED&&(b.each(["$bg","$overlay","$wrapper","$modal"],function(b,c){a[c].off(r+" "+s)}),a.$bg.removeClass(a.settings.modifier),a.$overlay.removeClass(a.settings.modifier).hide(),a.$wrapper.hide(),f(),g(a,u.CLOSED,!0))}function j(a){var b,c,d,e,f={};for(a=a.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,","),b=a.split(","),e=0,c=b.length;e<c;e++)b[e]=b[e].split(":"),d=b[e][1],("string"==typeof d||d instanceof String)&&(d="true"===d||"false"!==d&&d),("string"==typeof d||d instanceof String)&&(d=isNaN(d)?d:+d),f[b[e][0]]=d;return f}function k(){for(var a=q,b=0;b<arguments.length;++b)a+="-"+arguments[b];return a}function l(){var a,c,d=location.hash.replace("#","");if(d){try{c=b('[data-remodal-id="'+d+'"]')}catch(e){}c&&c.length&&(a=b[p].lookup[c.data(p)],a&&a.settings.hashTracking&&a.open())}else n&&n.state===u.OPENED&&n.settings.hashTracking&&n.close()}function m(a,c){var d=b(document.body),e=d,f=this;f.settings=b.extend({},t,c),f.index=b[p].lookup.push(f)-1,f.state=u.CLOSED,f.$overlay=b("."+k("overlay")),null!==f.settings.appendTo&&f.settings.appendTo.length&&(e=b(f.settings.appendTo)),f.$overlay.length||(f.$overlay=b("<div>").addClass(k("overlay")+" "+k("is",u.CLOSED)).hide(),e.append(f.$overlay)),f.$bg=b("."+k("bg")).addClass(k("is",u.CLOSED)),f.$modal=a.addClass(q+" "+k("is-initialized")+" "+f.settings.modifier+" "+k("is",u.CLOSED)).attr("tabindex","-1"),f.$wrapper=b("<div>").addClass(k("wrapper")+" "+f.settings.modifier+" "+k("is",u.CLOSED)).hide().append(f.$modal),e.append(f.$wrapper),f.$wrapper.on("click."+q,'[data-remodal-action="close"]',function(a){a.preventDefault(),f.close()}),f.$wrapper.on("click."+q,'[data-remodal-action="cancel"]',function(a){a.preventDefault(),f.$modal.trigger(v.CANCELLATION),f.settings.closeOnCancel&&f.close(v.CANCELLATION)}),f.$wrapper.on("click."+q,'[data-remodal-action="confirm"]',function(a){a.preventDefault(),f.$modal.trigger(v.CONFIRMATION),f.settings.closeOnConfirm&&f.close(v.CONFIRMATION)}),f.$wrapper.on("click."+q,function(a){var c=b(a.target);c.hasClass(k("wrapper"))&&f.settings.closeOnOutsideClick&&f.close()})}var n,o,p="remodal",q=a.REMODAL_GLOBALS&&a.REMODAL_GLOBALS.NAMESPACE||p,r=b.map(["animationstart","webkitAnimationStart","MSAnimationStart","oAnimationStart"],function(a){return a+"."+q}).join(" "),s=b.map(["animationend","webkitAnimationEnd","MSAnimationEnd","oAnimationEnd"],function(a){return a+"."+q}).join(" "),t=b.extend({hashTracking:!0,closeOnConfirm:!0,closeOnCancel:!0,closeOnEscape:!0,closeOnOutsideClick:!0,modifier:"",appendTo:null},a.REMODAL_GLOBALS&&a.REMODAL_GLOBALS.DEFAULTS),u={CLOSING:"closing",CLOSED:"closed",OPENING:"opening",OPENED:"opened"},v={CONFIRMATION:"confirmation",CANCELLATION:"cancellation"},w=function(){var a=document.createElement("div").style;return void 0!==a.animationName||void 0!==a.WebkitAnimationName||void 0!==a.MozAnimationName||void 0!==a.msAnimationName||void 0!==a.OAnimationName}(),x=/iPad|iPhone|iPod/.test(navigator.platform);m.prototype.open=function(){var a,c=this;c.state!==u.OPENING&&c.state!==u.CLOSING&&(a=c.$modal.attr("data-remodal-id"),a&&c.settings.hashTracking&&(o=b(window).scrollTop(),location.hash=a),n&&n!==c&&i(n),n=c,e(),c.$bg.addClass(c.settings.modifier),c.$overlay.addClass(c.settings.modifier).show(),c.$wrapper.show().scrollTop(0),c.$modal.focus(),h(function(){g(c,u.OPENING)},function(){g(c,u.OPENED)},c))},m.prototype.close=function(a){var c=this;c.state!==u.OPENING&&c.state!==u.CLOSING&&c.state!==u.CLOSED&&(c.settings.hashTracking&&c.$modal.attr("data-remodal-id")===location.hash.substr(1)&&(location.hash="",b(window).scrollTop(o)),h(function(){g(c,u.CLOSING,!1,a)},function(){c.$bg.removeClass(c.settings.modifier),c.$overlay.removeClass(c.settings.modifier).hide(),c.$wrapper.hide(),f(),g(c,u.CLOSED,!1,a)},c))},m.prototype.getState=function(){return this.state},m.prototype.destroy=function(){var a,c=b[p].lookup;i(this),this.$wrapper.remove(),delete c[this.index],a=b.grep(c,function(a){return!!a}).length,0===a&&(this.$overlay.remove(),this.$bg.removeClass(k("is",u.CLOSING)+" "+k("is",u.OPENING)+" "+k("is",u.CLOSED)+" "+k("is",u.OPENED)))},b[p]={lookup:[]},b.fn[p]=function(a){var c,d;return this.each(function(e,f){d=b(f),null==d.data(p)?(c=new m(d,a),d.data(p,c.index),c.settings.hashTracking&&d.attr("data-remodal-id")===location.hash.substr(1)&&c.open()):c=b[p].lookup[d.data(p)]}),c},b(document).ready(function(){b(document).on("click","[data-remodal-target]",function(a){a.preventDefault();var c=a.currentTarget,d=c.getAttribute("data-remodal-target"),e=b('[data-remodal-id="'+d+'"]');b[p].lookup[e.data(p)].open()}),b(document).find("."+q).each(function(a,c){var d=b(c),e=d.data("remodal-options");e?("string"==typeof e||e instanceof String)&&(e=j(e)):e={},d[p](e)}),b(document).on("keydown."+q,function(a){n&&n.settings.closeOnEscape&&n.state===u.OPENED&&27===a.keyCode&&n.close()}),b(window).on("hashchange."+q,l)})});
// is this mobile?
var isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
var isiPad = navigator.userAgent.match(/iPad/i) != null;
// default remodal stylesheet
var def_styles = document.createElement('style');
def_styles.type = 'text/css';
def_styles.innerHTML =
`
@font-face {font-family: GEInspiraBold;src: url(GEInspira/GE%20Inspira%20Bold.ttf);}
@font-face {font-family:GEInspira;src: url(GEInspira/GE%20Inspira.ttf);}
html.remodal-is-locked{overflow:hidden;touch-action:none}
.remodal,[data-remodal-id]{display:none}
.remodal-wrapper{position:fixed;z-index:10000;top:0;right:0;bottom:0;left:0;display:none;overflow:auto;text-align:center;-webkit-overflow-scrolling:touch;padding:10px 10px 0}
.remodal-wrapper:after{display:inline-block;height:100%;margin-left:-.05em;content:""}
.remodal-overlay,.remodal-wrapper{backface-visibility:hidden}
.remodal{position:relative;outline:0;text-size-adjust:100%;box-sizing:border-box;width:100%;margin-bottom:10px;padding:35px;transform:translate3d(0,0,0)}
.remodal-cancel,
.remodal-close,
.remodal-confirm{overflow:visible;margin:0;cursor:pointer;text-decoration:none;outline:0;border:0}.remodal-is-initialized{display:inline-block}
.remodal-close,.remodal-close:before{position:absolute;top:0;right:0;display:block;width:35px}
.remodal-overlay{background:rgba(43,46,56,.9)}
.remodal.remodal-is-closing,.remodal.remodal-is-opening{animation-duration:0.2s;animation-fill-mode:forwards}
.remodal.remodal-is-opening{animation-name:remodal-opening-keyframes}
.remodal.remodal-is-closing{animation-name:remodal-closing-keyframes}
.remodal,.remodal-wrapper:after{vertical-align:middle}
.remodal-close{height:35px;padding:0;transition:color .2s;color:#95979c;background:0 0}
.remodal-close:focus,.remodal-close:hover{color:#2b2e38}
.remodal-close:before{font-family:Helvetica;important;font-size:20px;line-height:35px;content:"x";text-align:center}
.remodal-cancel,.remodal-confirm{font:inherit;display:inline-block;min-width:70%;padding:12px 0;transition:background .2s;text-align:center;vertical-align:middle}
.remodal-confirm{color:#fff;background:#81c784}
.remodal-confirm:focus,.remodal-confirm:hover{background:#66bb6a}
.remodal-cancel{color:#fff;background:#e57373}
.remodal-cancel:focus,.remodal-cancel:hover{background:#ef5350}
.remodal-cancel::-moz-focus-inner,.remodal-close::-moz-focus-inner,.remodal-confirm::-moz-focus-inner{padding:0;border:0}
@keyframes remodal-opening-keyframes{from{transform:opacity:0}to{transform:opacity:1}}
@keyframes remodal-closing-keyframes{from{transform:opacity:1}to{transform:opacity:0}}
@media only screen and (min-width:60%){.remodal{max-width:85%;}}
.lt-ie9 .remodal-overlay{background:#2b2e38}
.lt-ie9 .remodal{width:auto}
.remodal{color:#2b2e38;background:rgba(255,255,255,.85);max-width:95%;max-height:95%;overflow:scroll}
.remodal-bg.remodal-is-opened,.remodal-bg.remodal-is-opening{-webkit-filter:blur(5px);filter:blur(5px)}
.remodal-overlay.remodal-is-opening{-webkit-animation-name:remodal-overlay-opening-keyframes;animation-name:remodal-overlay-opening-keyframes}
.remodal-overlay.remodal-is-closing{-webkit-animation-name:remodal-overlay-closing-keyframes;animation-name:remodal-overlay-closing-keyframes}
@-webkit-keyframes remodal-overlay-opening-keyframes{from{opacity:0}to{opacity:1}}
@keyframes remodal-overlay-opening-keyframes{from{opacity:0}to{opacity:1}}
@-webkit-keyframes remodal-overlay-closing-keyframes{from{opacity:1}to{opacity:0}}
@keyframes remodal-overlay-closing-keyframes{from{opacity:1}to{opacity:0}}
::-webkit-scrollbar {
    width: 0px;
    background: transparent;
    display: none;
}
html *{
	-ms-overflow-style: none !important;
}
.remodal-overlay {
  background: rgba(43, 46, 56, 0.9);
}

.remodal-overlay.remodal-is-opening,
.remodal-overlay.remodal-is-closing {
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

.remodal-overlay.remodal-is-opening {
  animation-name: remodal-overlay-opening-keyframes;
}

.remodal-overlay.remodal-is-closing {
  animation-name: remodal-overlay-closing-keyframes;
}
.remodal-overlay {
  position: fixed;
  z-index: 9999;
  top: -5000px;
  right: -5000px;
  bottom: -5000px;
  left: -5000px;
  display: none;
}
.remodal {
	border-radius: 25px;
	border: 2px solid black;
	-webkit-text-size-adjust: 100%;
}
`;
// find the container for the interactive
var container = document.getElementById("container");
// append all of the above to the container
container.appendChild(def_styles);
// modify the container style sheet
container.style.width = '100%';
container.style.height = 'auto';
container.style.display = 'block';
// unallowed stuff
var unallowed = new Set(['Cabinet']);
// names of the image assets
var layer_names = ["Cabinet","LV Drive","Soft Starter","Relays","Manual Motor Starter","Contactors","Overload Relay","MCB","MCCB","Pilot Devices","Small CPT","Terminal Blocks","Plug-in Relay"];
// what to put for title of respective modal
var modal_names = ["Cabinet","AF-6 Series LV Drive","ASTAT XL Soft Starter","C-2000 Relays","Surion Manual Motor Starter","Efficor Contactors","RE Series EOL Relay","ElfaPlus MCB","GuardEon MCCB","Pilot Devices","Core & Coil CPT","451 Series Terminal Blocks","Series PRC Plug-in Relay"];
// descriptions to show in the modals
var descriptions = ["",
"Drives with built-in features that heighten performance, reduce energy consumption, and simplify installation.<br><ul><li><a href=\"http://www.geindustrial.com/products/drives/af-650-gp-general-purpose-drives\">Learn more about the AF-6</a></li><li><a href=\"http://www.geindustrial.com/products/drives/low-voltage-ac\">View our entire line of drives</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/Low_Voltage_AC_1066\">Configure your drive now!</a></li></ul>",
"Digital soft starters with real-time motor performance graphing and records of previous trip events.<br><ul><li><a href=\"http://www.geindustrial.com/products/starters/astat-xl-low-voltage-soft-starters\">Learn more about ASTAT</a></li><li><a href=\"http://www.geindustrial.com/products/starters/solid-state-reduced-voltage\">View our entire line of starters</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/IEC_1132\">Configure your starter now!</a></li></ul>",
"Relays with features that make them easier to install, allow for more flexible configurations, and make better use of panel space.<br><ul><li><a href=\"http://www.geindustrial.com/products/relays-timers-control/c-2000-relay\">Learn more about C-2000</a></li><li><a href=\"http://www.geindustrial.com/products/relays-timers-control\">View our entire line of relays</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/IEC_Contactors_1053\">Configure your relays now!</a></li></ul>",
"Global manual motor starters that are compact, reliable, easy to install, and offered with a complete range of accessories.<br><ul><li><a href=\"http://www.geindustrial.com/products/starters/surion-manual-motor-starter\">Learn more about Surion</a></li><li><a href=\"http://www.geindustrial.com/products/starters/iec-starters\">View our entire line of starters</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/IEC_1132\">Configure your starter now!</a></li></ul>",
"Global contactors that provide starting and power switching solutions for OEMs and Panel Builders working in demanding markets.<br><ul><li><a href=\"http://www.geindustrial.com/products/contactors/efficor-reliable-starter-solutions-105a\">Learn more about Efficor</a></li><li><a href=\"http://www.geindustrial.com/products/contactors\">View our entire line of contactors</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/IEC_Contactors_1053\">Configure your contactors now!</a></li></ul>",
"Overload relays with multiple trip class protection settings and a wide range of current ratings.<br><ul><li><a href=\"http://www.geindustrial.com/products/overload-relays/electronic-overload-relay\">Learn more about RE Series</a></li></ul>",
"DIN-rail mounted MCBs that ensure your system is up-and-running and protected at all times.<br><ul><li><a href=\"http://www.geindustrial.com/products/circuit-breakers/elfaplus-global-din-rail-devices-ul-approval\">Learn more about ElfaPlus</a></li><li><a href=\"http://www.geindustrial.com/products/circuit-breakers/mini-circuit-breakers-supplementary-protectors\">View our entire line of MCBs</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/Mini_Circuit_Breakers___Supplementary_Protectors_1035\">Configure your MCB now!</a></li></ul>",
"Low-Voltage MCCBs that were designed by users for global industry applications and built for the age of the industrial internet.<br><ul><li><a href=\"http://www.geindustrial.com/products/circuit-breakers/guardeon\">Learn more about GuardEon</a></li><li><a href=\"http://www.geindustrial.com/products/circuit-breakers/molded-case-circuit-breakers\">View our entire line of MCCBs</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/Molded_Case_Circuit_Breakers_1038\">Configure your MCCB now!</a></li></ul>",
"Push buttons and pilot lights that give you simplicity across the line with easy assembly, mounting and operation.<br><ul><li><a href=\"http://www.geindustrial.com/products/push-buttons-pilot-devices/c-2000-iec-pilot-devices\">Learn more about our pilot devices</a></li><li><a href=\"http://www.geindustrial.com/products/push-buttons-pilot-devices\">View our entire line of pilot devices</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/Pilot_Devices_1116\">Configure your pilot devices now!</a></li></ul>",
"Control Power Transformers that provide voltage in applications where regulation compliance and minimal space usage are a must.<br><ul><li><a href=\"http://www.geindustrial.com/products/transformers/terminal-board-connection\">Learn more about our CPTs</a></li><li><a href=\"http://www.geindustrial.com/products/transformers/control-power-core-coil\">View our entire line of transformers</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/Dry_Type__Encapsulated_Core___Coil_1189\">Configure your transformer now!</a></li></ul>",
"Terminal blocks that include a full range of accessories such as end stops, jumpers, and marking tags.<br><ul><li><a href=\"http://www.geindustrial.com/products/terminal-blocks/451-series-terminal-blocks\">Learn more about 451 Series Terminal Blocks</a></li><li><a href=\"http://www.geindustrial.com/products/terminal-blocks\">View our entire line of terminal blocks</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/IEC_1170\">Configure your terminal blocks now!</a></li></ul>",
"Plug-in relays that meet your needs as a cost-effective switching solution for industrial control circuits.<br><ul><li><a href=\"http://uk.geindustrial.com/products/auxiliary-devices/series-prc-plug-relays\">Learn more about PRC Plugin-in Relays</a></li><li><a href=\"http://www.geindustrial.com/products/relays-timers-control\">View our entire line of plugin-in relays</a></li><li><a href=\"https://www.geempower.com/ecatalog/ec/EN_NA/c/IEC_1121\">Configure your relays now!</a></li></ul>"];
var zoomed_images = [];
var layers = [];
// populate the layers array & create the graphic
function add_image_to_layers(name, path) {
	var new_layer = document.createElement("img");
    var new_layer_src = path + name + ".png";
    new_layer.setAttribute("src", new_layer_src);
	new_layer.setAttribute("class", "layer");
	new_layer.setAttribute("id", name.replace(/ /g, "_"));
	new_layer.style.position = "absolute";
	new_layer.style.maxHeight = "100%";
	new_layer.style.maxWidth = "100%";
	container.appendChild(new_layer);
	layers.push(new_layer);
}
var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};
for (var i = 0; i < layer_names.length; i++) {
	// populate full images array
	add_image_to_layers(layer_names[i], 'photos/Full/');
	// populate zoomed layers array
	var this_zoomed_source = "photos/Zoomed/" + layer_names[i] + ".png";
	zoomed_images.push(this_zoomed_source);
	if (!unallowed.has(layer_names[i])) {
		// make the modal
		var modal = document.createElement("div");
		// set the data remodal id
		modal.setAttribute("data-remodal-id", "modal" + layer_names[i].replace(/ /g, "_"));
		modal.setAttribute("class", "modal");
		// create the x close button
		var close_button = document.createElement("button");
		close_button.id = "remodal_close_button";
		close_button.setAttribute("data-remodal-action", "close");
		close_button.setAttribute("class", "remodal-close");
		// add the x close button to the modal
		modal.appendChild(close_button);
		// set the title of the modal
		var modal_title = document.createElement("h1");
		// set the description of the modal]
		var modal_description = document.createElement("p");
		modal_description.setAttribute("id", "modal_description");
		modal_title.style.fontFamily = 'GEInspira';
		modal_title.style.textAlign = 'center';
		modal_title.style.marginTop = '0';
		modal_description.style.fontFamily = 'GEInspira';
		modal_description.style.paddingBottom = '15px';
		// add an image to the modal
		var modal_image = document.createElement("img");
		modal_image.setAttribute("id", "modal_image");
		modal.style.overflow = 'scroll';
		modal_description.style.textAlign = 'left';
		modal_description.style.maxHeight = '95%';
		if (isMobile === false) {
			modal_description.style.maxWidth = '55%';
			modal_image.style.float = 'right' ;
			modal_image.style.maxWidth = '35%';
			modal_description.style.position = 'absolute';
			modal_description.style.float = 'left';
			modal_image.style.position = 'relative';
			modal.style.maxWidth = '70%';
			modal.style.minWidth = '20%';
			modal.style.maxHeight = '55%';
			modal.style.minHeight = '30%';
			modal_description.style.fontSize = '100%';
			modal.appendChild(modal_title);
			modal.appendChild(modal_description);
			modal.appendChild(modal_image);
		} else {
			modal_description.style.maxWidth = '95%';
			modal_image.style.maxHeight = '25%'
			modal_description.style.position = 'relative';
			modal_description.style.float = 'bottom';
			modal_image.style.margin = 'auto';
			modal_image.style.position = 'center';
			modal.style.maxWidth = '90%';
			modal.style.maxHeight = '80%';
			modal_description.style.fontSize = 'calc(21px + 2vw)';
			modal_title.style.fontSize = 'calc(30px + 2vw)';
			modal.appendChild(modal_title);
			modal.appendChild(modal_image);
			modal.appendChild(document.createElement("br"));
			modal.appendChild(modal_description);
		}
		modal_title.innerHTML = modal_names[i];
		modal_description.innerHTML = descriptions[i];
		modal_image.setAttribute("src", this_zoomed_source);
		modal.style.clear = 'both';
		container.appendChild(modal);
	}
}
// get the canvas
var canvas = document.createElement("canvas");
// get the context
var context = canvas.getContext('2d');
// for animation
var currently_animated = null;
// name with hashtag to find div of a layer
function layer_name(name) { return '#'.concat(name); }
// function to change list of divs into array
function toArray(a) {
	var result = [];
	var i = a.length;
	while (i--) { result[i] = a[i]; }
	return result;
}
// function for animating images in component explorer
function moveTo(div, dist) {
	if (unallowed.has(div.id))
		return;
	// get the location of the bottom-most layer
	l_bottom = $('#Cabinet').position().left;
	div.style.left = (l_bottom + dist) + 'px';
	div.style.visibility = 'visible';
	currently_animated = div;
}
// function for animating it back
function moveBack(div) {
	if (unallowed.has(div.id))
		return;
	// use the location of the bottom-most layer
	div.style.left = $('#Cabinet').position().left + 'px';
	div.style.visibility = 'visible';
	div.style.position = 'absolute';
	currently_animated = null;
}
window.onresize = function(event) {
    for (var i = 1; i < layers.length; i++) {
	    moveBack(layers[i]);
    }
    container.style.clear = 'both';
};
// function for assigning callbacks to elements
function assign_callback_for_event(element, event_name) {
	var _name = layer_name(element.id.replace(/ /g, "_"));
	// apply css to make the image position absolute
	$(_name).css('position','absolute');
	// apply the pseudo-mouseover event listener, handler
	$(_name).on(event_name, function(event) {
		var cur_image = which_image(element, event);
		// have we moved to a new animation?
		if (currently_animated !== cur_image && isMobile === false) {
			// undo existing animation
			if (currently_animated !== null) { moveBack(currently_animated); }
			// undo existing arrows
			arrows = document.getElementsByClassName('annotation');
			for (var i = 0; i < arrows.length; i++) { arrows[i].remove(); }
		}
		// are we currently animating nothing, but should be?
		if (currently_animated == null && cur_image !== null) {
			if (isMobile === false && !(unallowed.has(cur_image.id))) {
				// animate the new thing
				moveTo(cur_image, context.canvas.width/150);
				// make the new arrow
				var arrow = document.createElement("img");
				arrow.setAttribute("src", "photos/Annotations/" + cur_image.id.replace(/_/g, " ") + ".png");
				arrow.setAttribute("id", "annotation" + cur_image.id);
				arrow.style.position = "absolute";
				arrow.style.maxHeight = "100%";
				arrow.style.maxWidth = "100%";
				arrow.setAttribute("class", 'annotation');
				container.appendChild(arrow);
				$(layer_name(arrow.id)).on("mousemove", function(event) {
					if (cur_image !== which_image(element, event)) { arrow.remove(); }
				});
				$(layer_name(arrow.id)).on("mousedown", function(event) {
					arrow.remove();
					cur_image = which_image(images[images.length-1], event);
					show_modal(cur_image.id);
				});
			} else if (isMobile === true) {
				cur_image = which_image(images[images.length-1], event);
				show_modal(cur_image.id);
			}
		}
	});
}
// assign callback used in iteration
function assign_callback(element, index, array) {
	element.onload = function() { assign_callback_for_event(element, "mousedown"); }
}
var images = toArray(container.getElementsByClassName("layer"));
images.forEach(assign_callback);
if (isMobile === false) {
	images[images.length-1].onload = function() {
		assign_callback_for_event(images[images.length-1], "mousemove");
	}
} else if (isMobile === true) {
	images[images.length-1].onload = function() {
		assign_callback_for_event(images[images.length-1], "mousedown");
	}
}
// show modal function
function show_modal(name) {
	if (unallowed.has(name) || name === null)
		return;
	var modal_inst = $('[data-remodal-id=modal' + name.replace(/ /g, "_") + ']').remodal();
	modal_inst.open();
}
function which_image(element, event) {
	// Get click coordinates
	var x = event.pageX - element.offsetLeft,
		y = event.pageY - element.offsetTop,
		w = context.canvas.width = element.width,
		h = context.canvas.height = element.height,
		alpha;
	context.drawImage(element, 0, 0, w, h);
	alpha = context.getImageData(x, y, 1, 1).data[3];
	if (alpha !== 0)
		return element;
	index = layer_names.indexOf(element.id.replace(/_/g, " "));
	if (index === 0)
		return element;
	if (index > 0)
		return which_image(images[index - 1], event);
	return null;
}