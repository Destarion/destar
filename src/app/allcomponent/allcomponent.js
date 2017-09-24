"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var addrules_1 = require("../RedditRules/addrules");
var all_1 = require("../all/all");
var conservative_1 = require("../conservative/conservative");
var newsub_1 = require("../newsub/newsub");
var comments_1 = require("../all/comments");
var rules_1 = require("../all/rules");
var debates_1 = require("../all/debates");
var userList_1 = require("../all/userList");
var router_deprecated_1 = require("@angular/router-deprecated");
var newUser_1 = require("../all/newUser");
var adminPage_1 = require("../all/adminPage");
var adminOptions_1 = require("../all/adminOptions");
var interDebateComments_ts_1 = require("../all/interDebateComments.ts");
var lol_ts_1 = require("../mktest/lol/lol.ts");
var dsqd_ts_1 = require("../mktest/dsqd/dsqd.ts");
var tdes_ts_1 = require("../mktest/tdes/tdes.ts");
var help_ts_1 = require("../mktest/help/help.ts");
var es_ts_1 = require("../mktest/es/es.ts");
var goodone_ts_1 = require("../mktest/goodone/goodone.ts");
var a = 1;
//The var is used as a way of localization for the place to put newly generated subs.
var AllComponent = (function () {
    function AllComponent() {
    }
    AllComponent = __decorate([
        router_deprecated_1.RouteConfig([
            { path: '/intercomments', name: 'InterPageDebateComments', component: interDebateComments_ts_1.addInterPageComments },
            { path: '/options', name: 'AdminOptions', component: adminOptions_1.adminOptions, },
            { path: '/:id', name: 'Reddit', component: all_1.RedditApp },
            { path: '/', name: 'RedditPages', component: all_1.RedditApp, useAsDefault: true },
            { path: '/adminpage', name: "AdminPage", component: adminPage_1.adminPage },
            { path: '/newuser', name: 'NewUser', component: newUser_1.newUser },
            { path: '/userlist', name: 'UserList', component: userList_1.userList },
            { path: '/rules', name: 'Rules', component: rules_1.Rules },
            { path: '/comments/:id', name: 'Comments', component: comments_1.addComments },
            { path: '/debatecomments/:id', name: 'DebateComments', component: debates_1.addDebateComments },
            { path: '/conservative', component: conservative_1.Conservative },
            { path: '/addsub', name: 'AddSub', component: newsub_1.newsub },
            { path: '/addrules', name: 'AddRules', component: addrules_1.RedditRules },
            { path: '/lol', component: lol_ts_1.lol }, { path: '/dsqd', component: dsqd_ts_1.dsqd }, { path: '/tdes', component: tdes_ts_1.tdes }, { path: '/help', component: help_ts_1.help }, { path: '/es', component: es_ts_1.es }, { path: '/goodone', component: goodone_ts_1.goodone },
        ]),
        core_1.Component({
            selector: 'all-component',
            directives: [router_deprecated_1.RouterOutlet, router_deprecated_1.ROUTER_DIRECTIVES],
            template: "\n  <router-outlet>\n  </router-outlet>\n  "
        })
    ], AllComponent);
    return AllComponent;
}());
exports.AllComponent = AllComponent;
//# sourceMappingURL=allcomponent.js.map