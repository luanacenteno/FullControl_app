(self.webpackChunkangle=self.webpackChunkangle||[]).push([[708],{8532:function(e,o,r){"use strict";r.r(o),r.d(o,{UsersModule:function(){return Z}});var n=r(6902),i=r(1116),t=r(1628),l=r(9593),s=r(1267),a=r(5366),d=r(2693);let g=(()=>{class e{constructor(e){this.http=e,this.resizeEvent="resize.ag-grid",this.$win=$(window),this.columnDefsFilter=[{headerName:"Nombre",field:"nombre",width:150,filter:"set"},{headerName:"Email",field:"email",width:130,filter:"number"},{headerName:"Tel\xe9fono",field:"telefono",width:130},{headerName:"Rol",field:"rol",width:130},{headerName:"Direccion",field:"direccion",width:130},{headerName:"Rubro",field:"rubro",width:130}],this.apiUrl=s.N.apiUrl,console.log("APIURL",this.apiUrl),e.get(this.apiUrl+"/usuarios").subscribe(e=>{console.log("usuarios",e),this.users=e}),this.gridOptions={headerHeight:40,columnDefs:this.columnDefsFilter};const o=e.get(this.apiUrl+"/usuarios");this.rowData1=o,this.rowData2=o,this.rowData3=o}onQuickFilterChanged(e){var o,r;null===(r=null===(o=this.gridOptions)||void 0===o?void 0:o.api)||void 0===r||r.setQuickFilter(e.target.value)}ngOnInit(){}gridReady(e){e.api.sizeColumnsToFit(),this.$win.on(this.resizeEvent,()=>{setTimeout(()=>{e.api.sizeColumnsToFit()})})}ngOnDestroy(){this.$win.off(this.resizeEvent)}}return e.\u0275fac=function(o){return new(o||e)(a.Y36(d.eN))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-listar"]],decls:10,vars:4,consts:[[1,"content-heading"],[1,"container-fluid"],[1,"row"],[1,"col-xl-4","col-lg-6"],["placeholder","Filter...","type","text",1,"mb","form-control",3,"keyup"],["enableFilter","",1,"ag-angle",2,"width","100%","height","400px",3,"rowData","gridOptions","gridReady"],["agGrid",""]],template:function(e,o){1&e&&(a.TgZ(0,"div",0),a.TgZ(1,"div"),a._uU(2,"Lista de Usuarios "),a.qZA(),a.qZA(),a.TgZ(3,"div",1),a.TgZ(4,"div",2),a.TgZ(5,"div",3),a.TgZ(6,"input",4),a.NdJ("keyup",function(e){return o.onQuickFilterChanged(e)}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(7,"ag-grid-angular",5,6),a.NdJ("gridReady",function(e){return o.gridReady(e)}),a.ALo(9,"async"),a.qZA(),a.qZA()),2&e&&(a.xp6(7),a.Q6J("rowData",a.lcZ(9,2,o.rowData2))("gridOptions",o.gridOptions))},directives:[t.N8],pipes:[i.Ov],styles:[""]}),e})();var u=r(1462);const c=function(){return{standalone:!0}},p=r(1607),m=[{path:"listar",component:g},{path:"crear",component:(()=>{class e{constructor(e){this.http=e,this.apiUrl=s.N.apiUrl,this.userForm={nombre:"",email:"",telefono:"",pass:"",rol:"",direccion:"",rubro:""}}createUser(){console.log("this.userForm",this.userForm),this.http.post(this.apiUrl+"/usuarios",{nombre:this.userForm.nombre,email:this.userForm.email,telefono:this.userForm.telefono,pass:this.userForm.pass,rol:this.userForm.rol,direccion:this.userForm.direccion,rubro:this.userForm.rubro}).subscribe(e=>{this.users=e,this.userForm={nombre:"",email:"",telefono:"",pass:"",rol:"",direccion:"",rubro:""},p("Perfecto!","Usuario creado exitosamente","success")})}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)(a.Y36(d.eN))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-crear"]],decls:47,vars:21,consts:[[1,"col-md-6"],[1,"card","card-default"],[1,"card-header"],[1,"card-body"],[1,"form-horizontal"],[1,"form-group","row"],[1,"col-xl-2","col-form-label"],[1,"col-xl-10"],["name","nombre","type","string","placeholder","Nombre",1,"form-control",3,"ngModel","ngModelOptions","ngModelChange"],["name","email","type","email","placeholder","Email",1,"form-control",3,"ngModel","ngModelOptions","ngModelChange"],["name","telefono","type","string","placeholder","Telefono",1,"form-control",3,"ngModel","ngModelOptions","ngModelChange"],["name","pass","type","string","placeholder","Contrase\xf1a",1,"form-control",3,"ngModel","ngModelOptions","ngModelChange"],["name","rol","type","string","placeholder","Rol",1,"form-control",3,"ngModel","ngModelOptions","ngModelChange"],["name","direccion","type","string","placeholder","Direcci\xf3n",1,"form-control",3,"ngModel","ngModelOptions","ngModelChange"],["name","rubro","type","string","placeholder","Rubro",1,"form-control",3,"ngModel","ngModelOptions","ngModelChange"],["type","submit",1,"btn","btn-sm","btn-secondary",3,"click"]],template:function(e,o){1&e&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a.TgZ(3,"strong"),a._uU(4,"Crear Usuario"),a.qZA(),a.qZA(),a.TgZ(5,"div",3),a.TgZ(6,"form",4),a.TgZ(7,"div",5),a.TgZ(8,"label",6),a._uU(9,"Nombre:"),a.qZA(),a.TgZ(10,"div",7),a.TgZ(11,"input",8),a.NdJ("ngModelChange",function(e){return o.userForm.nombre=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(12,"div",5),a.TgZ(13,"label",6),a._uU(14,"Email:"),a.qZA(),a.TgZ(15,"div",7),a.TgZ(16,"input",9),a.NdJ("ngModelChange",function(e){return o.userForm.email=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(17,"div",5),a.TgZ(18,"label",6),a._uU(19,"Tel\xe9fono:"),a.qZA(),a.TgZ(20,"div",7),a.TgZ(21,"input",10),a.NdJ("ngModelChange",function(e){return o.userForm.telefono=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(22,"div",5),a.TgZ(23,"label",6),a._uU(24,"Contrase\xf1a:"),a.qZA(),a.TgZ(25,"div",7),a.TgZ(26,"input",11),a.NdJ("ngModelChange",function(e){return o.userForm.pass=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(27,"div",5),a.TgZ(28,"label",6),a._uU(29,"Rol:"),a.qZA(),a.TgZ(30,"div",7),a.TgZ(31,"input",12),a.NdJ("ngModelChange",function(e){return o.userForm.rol=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(32,"div",5),a.TgZ(33,"label",6),a._uU(34,"Direcci\xf3n:"),a.qZA(),a.TgZ(35,"div",7),a.TgZ(36,"input",13),a.NdJ("ngModelChange",function(e){return o.userForm.direccion=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(37,"div",5),a.TgZ(38,"label",6),a._uU(39,"Rubro:"),a.qZA(),a.TgZ(40,"div",7),a.TgZ(41,"input",14),a.NdJ("ngModelChange",function(e){return o.userForm.rubro=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(42,"div",5),a._UZ(43,"label",6),a.TgZ(44,"div",7),a.TgZ(45,"button",15),a.NdJ("click",function(){return o.createUser()}),a._uU(46,"Crear"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&e&&(a.xp6(11),a.Q6J("ngModel",o.userForm.nombre)("ngModelOptions",a.DdM(14,c)),a.xp6(5),a.Q6J("ngModel",o.userForm.email)("ngModelOptions",a.DdM(15,c)),a.xp6(5),a.Q6J("ngModel",o.userForm.telefono)("ngModelOptions",a.DdM(16,c)),a.xp6(5),a.Q6J("ngModel",o.userForm.pass)("ngModelOptions",a.DdM(17,c)),a.xp6(5),a.Q6J("ngModel",o.userForm.rol)("ngModelOptions",a.DdM(18,c)),a.xp6(5),a.Q6J("ngModel",o.userForm.direccion)("ngModelOptions",a.DdM(19,c)),a.xp6(5),a.Q6J("ngModel",o.userForm.rubro)("ngModelOptions",a.DdM(20,c)))},directives:[u._Y,u.JL,u.F,u.Fj,u.JJ,u.On],styles:[""]}),e})()}];let Z=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[i.ez,n.Bz.forChild(m),l.m,t.sF.withComponents([g])],n.Bz]}),e})()}}]);