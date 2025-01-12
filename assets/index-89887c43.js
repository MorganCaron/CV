(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const q=e=>Object.keys(e).map(t=>e[t]),A=e=>e.reduce((t,n)=>t.concat(Array.isArray(n)?A(n):n),[]),I=e=>[...new Set(e)],x={openSymbol:"{{",closeSymbol:"}}"},z=()=>new RegExp(x.openSymbol+" *(.+?)? *"+x.closeSymbol,"g"),k=e=>{const t=z();let n,r=[];for(;n=t.exec(e);)r.push({key:n[1],sample:n[0]});return r},N=e=>I(k(e).map(t=>t.key)),F=e=>{const t={};return e.nodeValue&&N(e.nodeValue).forEach(n=>{t[n]||(t[n]=[]),t[n].push({node:e,template:e.nodeValue??""})}),t},$=e=>{let t={};return e.childNodes.forEach(n=>{n.nodeType==Node.TEXT_NODE?t={...t,...F(n)}:n.nodeType==Node.ELEMENT_NODE&&(t={...t,...$(n)})}),t},W=(e,t)=>{t.node.nodeValue=k(t.template).reduce((n,r)=>n.replace(r.sample,e[r.key]),t.template)},L=(e,t)=>{t==null||t.forEach(n=>{n.node.nodeType==Node.TEXT_NODE&&W(e,n)})},d=e=>{if(e.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the component element name.");e={attributes:{},removeContent:!1,useShadow:!1,shadowMode:"open",...e};const t=document.createElement("template");return t.innerHTML=(e.style?`<style>${e.style}</style>`:"")+(e.template??""),n=>{n.prototype.connectedCallback=function(){var i;this.baseContent=this.innerHTML,e.removeContent&&(this.innerHTML="");let r=e.classes||"";const s=this.getAttribute("class");if(r&&s&&(r+=" ",s&&(r+=this.getAttribute("class"))),r&&this.setAttribute("class",r),e.attributes)for(const[l,o]of Object.entries(e.attributes))this.setAttribute(l,o);if(n.__attributes__)for(const l of n.__attributes__)this.getAttribute(l)&&(this[l]=this.getAttribute(l));const a=document.importNode(t.content,!0);e.useShadow?this.attachShadow({mode:e.shadowMode}).appendChild(a):this.appendChild(a),this.constructor.__variables__=$(this),(i=this.connected)==null||i.call(this),this.constructor.__isInitialized__=!0,L(this,A(q(this.constructor.__variables__)))},n.prototype.disconnectedCallback=function(){var r;(r=this.disconnected)==null||r.call(this)},Object.defineProperty(n.prototype.constructor,"observedAttributes",{get(){return this.__attributes__??[]}}),n.prototype.attributeChangedCallback=function(r,s,a){var i;s!==a&&(this["__"+r]=a,this.constructor.__isInitialized__&&((i=this.update)==null||i.call(this),L(this,this.constructor.__variables__[r])))},typeof e.extends<"u"?window.customElements.define(e.selector,n,{extends:e.extends}):window.customElements.define(e.selector,n)}},g=()=>(e,t)=>{var n;(n=e.constructor).__attributes__??(n.__attributes__=[]),e.constructor.__attributes__.push(t),Object.defineProperty(e,t,{get(){return e["__"+t]},set(r){e["__"+t]=r,r?this.setAttribute(t,r):this.removeAttribute(t)},enumerable:!0})};class B{constructor(t){this.routes=[],this.root="/",this._mode=t.mode||history.pushState?"history":"hash",this.currentFragment=null,t.routes&&t.routes.forEach(n=>this.addRoute(n))}set mode(t){this._mode=history.pushState?t:"hash"}get mode(){return this._mode}clearSlashes(t){return t.toString().replace(/\/$/,"").replace(/^\//,"")}getFragment(){let t="";if(this._mode==="history")t=this.clearSlashes(decodeURI(location.pathname+location.search)),t=t.replace(/\?(.*)$/,""),t=this.root!="/"?t.replace(this.root,""):t;else{const n=window.location.href.match(/#(.*)$/);t=n?n[1]:""}return this.clearSlashes(t)}openFragment(t){for(let n=0;n<this.routes.length;++n){const r=this.routes[n];let s=t.match("^"+r.path+"$");s&&(s.shift(),r.controller.apply({},s))}}addRoute(t){this.routes.push(t)}removeRoute(t){for(let n=0;n<this.routes.length;++n){const r=this.routes[n];t.toString()===r.path.toString()&&this.routes.splice(n,1)}}check(t){return this.getFragment().match("^"+t+"$")!=null}listen(){const t=()=>{this.currentFragment!==this.getFragment()&&(this.currentFragment=this.getFragment(),this.openFragment(this.currentFragment))};t(),window.addEventListener("popstate",t.bind(this))}navigate(t){this._mode==="history"?history.pushState(null,"",this.root+this.clearSlashes(t)):window.location.href=window.location.href.replace(/#(.*)$/,"")+"#"+t,this.currentFragment!==this.getFragment()&&(this.currentFragment=this.getFragment(),this.openFragment(this.currentFragment))}}const J=(e,t,n)=>{let r=[];for(let l=0;l<=e.length;++l)r[l]=[l];for(let l=0;l<=t.length;++l)r[0][l]=l;for(let l=1;l<=t.length;++l)for(let o=1;o<=e.length;++o)if(e[o-1]===t[l-1])r[o][l]=r[o-1][l-1];else{const h=r[o-1][l],p=r[o][l-1];if(n.replace){const c=r[o-1][l-1];r[o][l]=Math.min(h,p,c)+1}else r[o][l]=Math.min(h,p)+1}let s=e.length,a=t.length,i=[];for(;s!==0&&a!==0;)e[s-1]===t[a-1]?(i.unshift(0),--s,--a):r[s-1][a]<r[s][a-1]?(i.unshift(3),--s):n.replace&&r[s-1][a]===r[s][a-1]?(i.unshift(2),--s,--a):(i.unshift(1),--a);if(s===0&&a>0)for(;a-- >0;)i.unshift(1);else if(s>0&&a===0)for(;s-- >0;)i.unshift(3);return{distance:r[e.length][t.length],editions:i}};class m{static write(t,n,r,s){let a=[];const i=J(t,n,{replace:r.replace});if(!i.distance)return[];let l=t;const o=r.duration?r.duration/i.distance:r.interval??10;let h=0,p=0;for(let c=0;c<i.editions.length;++c){const u=i.editions[c];u===1?a.push(setTimeout((b,v)=>{l=l.substring(0,v)+n[b]+l.substr(v),r.update(l)},(c+1)*o,h,p)):u===2?a.push(setTimeout((b,v)=>{l=l.substring(0,v)+n[b]+l.substr(v+1),r.update(l)},(c+1)*o,h,p)):u===3&&a.push(setTimeout(b=>{l=l.substring(0,b)+l.substr(b+1),r.update(l)},(c+1)*o,p)),u!==3&&(++p,++h)}return s&&a.push(setTimeout(s,i.distance*o,n)),a}}var G=Object.defineProperty,V=Object.getOwnPropertyDescriptor,U=(e,t,n,r)=>{for(var s=r>1?void 0:r?V(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&G(t,n,s),s};let D=class extends HTMLElement{constructor(){super(...arguments),this.router=new B({mode:"hash"}),this.beforePageChanging=null,this.afterPageChanging=null}set mode(e){this.router.mode=e}get mode(){return this.router.mode}addRoute(e){this.router.addRoute({path:e.path,controller:(...t)=>{this.beforePageChanging!==null&&this.beforePageChanging(),this.innerHTML="",this.appendChild(new e.component(t)),this.afterPageChanging!==null&&this.afterPageChanging()}})}removeRoute(e){this.router.removeRoute(e)}listen(){this.router.listen()}navigate(e=""){this.router.navigate(e)}};D=U([d({selector:"app-router"})],D);class X{constructor(){document.body.style.setProperty("--mouse-x","-1000px"),document.body.style.setProperty("--mouse-y","-1000px"),this.updateParallax(),window.addEventListener("resize",this.onWindowResize.bind(this),!1),window.addEventListener("scroll",this.onWindowScroll.bind(this),!1),window.addEventListener("mousemove",this.onMouseMove.bind(this),!1),document.body.addEventListener("mouseleave",this.onMouseLeave.bind(this),!1),document.querySelectorAll("*[trigger-target]").forEach(t=>t.addEventListener("click",n=>this.onTriggerClick(t,n),!1))}updateParallax(){document.querySelectorAll(".parallax").forEach(t=>{const n=t.getBoundingClientRect().top,r=t.getBoundingClientRect().left,s=t.querySelector(".parallax-background");s==null||s.setAttribute("style","left: "+-r+"px; top: "+-n/2+"px;")})}onWindowResize(){this.updateParallax()}onWindowScroll(){this.updateParallax()}onMouseMove(t){document.body.style.setProperty("--mouse-x",`${t.pageX}`),document.body.style.setProperty("--mouse-y",`${t.pageY}`)}onMouseLeave(){document.body.style.setProperty("--mouse-x",`${window.innerWidth/2}`),document.body.style.setProperty("--mouse-y",`${window.innerHeight/2}`)}onTriggerClick(t,n){var o,h,p;if(t.hasAttribute("preventDefault")&&n.preventDefault(),!t.hasAttribute("trigger-target"))return;const r=t.getAttribute("trigger-target"),s=document.querySelectorAll(r),a=(o=t.getAttribute("add-class"))==null?void 0:o.split(" "),i=(h=t.getAttribute("remove-class"))==null?void 0:h.split(" "),l=(p=t.getAttribute("toggle-class"))==null?void 0:p.split(" ");s.forEach(c=>{a&&a.forEach(u=>c.classList.add(u)),i&&i.forEach(u=>c.classList.remove(u)),l&&l.forEach(u=>c.classList.toggle(u))})}}const Y=`<app-header class="scroll-snap-center"></app-header>

<div class="container scroll-snap-start">
	<h2>Hello World! 👋</h2>

	<p class="lead">
		<strong>I'm Morgan Caron, a French software and web developer. I program mainly in C++.</strong><br>
		<br>
		You can support my work financially by <a href="https://github.com/sponsors/MorganCaron" class="underline underlined">becoming a sponsor</a> 💖<br>
		<br>
		You can join my Discord server (French-speaking community) here:
	</p>
	<div class="text-center">
		<a href="https://discord.gg/mxZvun4"><img src="https://img.shields.io/discord/268838260153909249?label=Chat&logo=Discord&style=for-the-badge" alt="Discord"></a>
	</div>
	<br>
	<div class="row text-center">
		<div class="col-lg-6">
			<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=MorganCaron&theme=github_dark&layout=compact">
		</div>
		<div class="col-lg-6">
			<img src="https://github-readme-stats.vercel.app/api?username=MorganCaron&show_icons=true&theme=github_dark&line_height=20">
		</div>
	</div>
</div>
`;var Q=Object.defineProperty,Z=Object.getOwnPropertyDescriptor,K=(e,t,n,r)=>{for(var s=r>1?void 0:r?Z(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&Q(t,n,s),s};let M=class extends HTMLElement{};M=K([d({selector:"page-home",classes:"d-block",template:Y})],M);const tt=`<a href="#" class="btn lite triangle-left-bullet float-right">Back</a>
<h2>Work in progress</h2>
`;var et=Object.defineProperty,st=Object.getOwnPropertyDescriptor,rt=(e,t,n,r)=>{for(var s=r>1?void 0:r?st(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&et(t,n,s),s};let S=class extends HTMLElement{};S=rt([d({selector:"page-projects",classes:"d-block",template:tt})],S);const nt=`<div id="cv-content" class="container-fluid">
	<header class="primary">
		<div class="container">
			<div class="row py-2">
				<div class="col-lg-8">
					<h1><a href="#">Morgan CARON</a></h1>
					<h2>Ingénieur – <select id="filter" class="primary">
						<option value="all">Développeur Logiciel & Web</option>
						<option value="software">Développeur Logiciel</option>
						<option value="cpp" selected="selected">Développeur C++</option>
						<option value="web">Développeur Web</option>
					</select></h2>
				</div>
				<aside class="col-lg-4">
					<p class="lead">
						<i class="lab la-github"></i> <a href="https://github.com/MorganCaron" class="underlined">github.com/MorganCaron</a><br>
						<i class="lab la-linkedin-in"></i> <a href="https://www.linkedin.com/in/morgancaron/" class="underlined">www.linkedin.com/in/MorganCaron</a><br>
						<i class="lab la-discord"></i> morgancaron<br>
					</p>
				</aside>
			</div>
			<section class="secondary">
				<article class="pr-1 pt-1 pb-0">
					<p class="lead mb-0">
						Passionné de programmation depuis mes 13 ans.<br>
						Diplômé Master 2 à Epitech Paris.<br>
						Spécialisé en C++20, langage dans lequel je créé des compilateurs.<br>
						Je fais également du web, logiciel, jeu-vidéo, systèmes embarqués, machine learning, etc.
					</p>
				</article>
			</section>
		</div>
	</header>
	<hr>
	<div class="container">
		<div class="row">
			<div class="col-lg-8">
				<section>
					<h3><i class="las la-graduation-cap"></i> Formations</h3>
					<article class="bracket">
						<h4>Bac + 5</h4>
						<div class="row">
							<div class="col-10">
								<h5>Architecte Logiciel - Développeur d'Applications (Master 2)<br><small>Epitech Paris</small></h5>
								<p class="lead">Promo 2020</p>
								<p>Etudes sur 5 ans dans l'école d'Expertise en Informatique Epitech.</p>
							</div>
							<div class="col-2">
								<img src="img/epitech.png" alt="Logo Epitech" class="img-fluid">
							</div>
						</div>
					</article>
					<article class="bracket">
						<h5>Baccalauréat STI2D option SIN (Système d'Information Numérique)<br><small>Lycée Notre Dame de Sion (Evry)</small></h5>
						<p>Obtention du <strong>baccalauréat STI2D</strong> (mention assez bien).</p>
					</article>
				</section>
				<hr>
				<section>
					<h3><i class="las la-toolbox"></i> Expériences</h3>
					<article class="bracket">
						<div class="row">
							<div class="col-10">
								<h4>CDD · SGDSN (3 ans)</h4>
								<h5>Services du Premier ministre<br><small>Software Engineer · Développeur C++ – Depuis le 12 décembre 2023, poste actuel</small></h5>
							</div>
							<div class="col-2">
								<img src="img/services_pm.jpg" alt="Logo Services Premier Ministre" class="img-fluid">
							</div>
						</div>
					</article>
					<br>
					<article class="bracket">
						<h4>CDI · Groupe SII (2 ans)</h4>
						<h5>Thales SIX GTS<br><small>Software Engineer · Développeur C++17 – Du 01 octobre 2021 au 08 décembre 2023</small></h5>
						<p>
							<strong>Software Engineer Développeur C++17 Full-Stack React / C# .NET</strong><br>
							<strong>Technologies</strong>: C++17, Python, Java, Visual Studio, Git, Windows<br>
							<strong>Méthodologie</strong>: Agile (Scrum, Kanban), Test Driven Development
						</p>
						<ul class="triangle-right-bullet">
							<li>Développement de nouvelles fonctionnalités en étant force de proposition</li>
							<li>Modernisation du projet (sécurité, généricité, lisibilité)</li>
							<li>MCO (Maintien en Condition Opérationnelle)</li>
							<li>Deploiement et tests sur banc d'essais</li>
						</ul>
					</article>
					<br>
					<article class="bracket">
						<h4>Année Sabbatique</h4>
						<h5>Projet Script<small> · Projet Personnel – Du 01 octobre 2020 au 30 septembre 2021 (1 an)</small></h5>
						<p class="lead">Projet réalisé en C++20</p>
						<p>
							<strong>Création d'un langage de programmation et de son compilateur (from scratch).</strong><br>
							Projet en cours de refonte. Son code a majoritairement été migré dans ma bibliothèque <strong>CppUtils</strong>.
						</p>
						<i class="lab la-github"></i> <a href="https://github.com/MorganCaron/Script" class="underlined">https://github.com/MorganCaron/Script</a><br>
						<i class="lab la-github"></i> <a href="https://github.com/MorganCaron/CppUtils" class="underlined">https://github.com/MorganCaron/CppUtils</a>
					</article>
					<br>
					<article class="bracket">
						<h4>Alternance · Viseo Technologies (2 ans)</h4>
						<h5>Celine<br><small> – Du 01 avril 2019 au 30 septembre 2020 (18 mois)</small></h5>
						<p>
							<strong>Développeur Full-Stack React / C# .NET</strong><br>
							<strong>Technologies</strong>: C#, .Net Core, Typescript, NodeJS, React, Webpack, Azure DevOps, BlobStorage<br>
							<strong>Méthodologie</strong>: Agile (Scrum, Kanban)
						</p>
						<h5>Pernod Ricard<br><small> – Du 01 novembre 2018 au 31 mars 2019 (5 mois)</small></h5>
						<p>
							<strong>Développeur Back-End C# .NET</strong><br>
							<strong>Technologies</strong>: C#, .Net Core, Azure DevOps, BlobStorage<br>
							<strong>Méthodologie</strong>: Agile (Scrum, Kanban)
						</p>
						<h5>Projet R&D – Microsoft Hololens<br><small> – Du 01 octobre 2018 au 31 octobre 2018 (1 mois)</small></h5>
						<p>
							<strong>Développeur C# Unity</strong><br>
							<strong>Technologies</strong>: Unity, API Hololens, C#<br>
							<strong>Méthodologie</strong>: En autonomie
						</p>
					</article>
					<br>
					<article class="bracket">
						<h4>Stages</h4>
						<h5>Analys<br><small>Pendant la 3ème année Epitech – Du 01 mai au 31 août 2018 (4 mois)</small></h5>
						<p>
							<strong>Développeur Full-Stack Angular / NodeJS</strong><br>
							<strong>Technologies</strong>: Typescript, Angular, NodeJS, Sass, Bootstrap<br>
							<strong>Méthodologie</strong>: Stage en autonomie complète. Cycle en V. Rédaction d'un cahier des charges et des spécifications puis développement.
						</p>
						<h5>Cyber'l<br><small>Pendant la 2ème année Epitech – Du 10 août au 18 décembre 2015 (4 mois)</small></h5>
						<p>
							<strong>Développeur Web Symfony/CakePHP</strong><br>
							<strong>Technologies</strong>: PHP, Symfony 2, CakePHP, SQL, Bootstrap<br>
							<strong>Méthodologie</strong>: Gestion de demandes de clients en respectant les cahiers des charges et les deadlines.
						</p>
						<h5>Accor Hotel<br><small>En première STI2D – Du 25 février au 8 mars 2013 (2 semaines)</small></h5>
						<p>
							<strong>Développeur front-end Javascript</strong><br>
							<strong>Technologies</strong>: HTML, CSS, Javascript, Java EE
						</p>
					</article>
				</section>
				<hr>
				<section>
					<h3><i class="las la-medal"></i> Hackathons</h3>
					<article class="bracket">
						<h5>2ème prix au Hackathon Vivatech Microsoft<br><small>15 au 17 juin 2017</small></h5>
						<p>Hackathon de 24h de développement d'Intelligences Artificielles avec l'outil Microsoft Azure.</p>
					</article>
					<article class="bracket">
						<h5>2ème prix à la Project Week de Vente Privée<br><small>30 mars 2017</small></h5>
						<p>
							Week-end de recherche et développement pour proposer des améliorations UI/UX du site de commerce en ligne Vente Privée.<br>
							J'ai remonté les failles de sécurité (injections CSS/Javascript) du site Vente Privée.<br>
							J'ai également recréé un prototype de site Vente Privée avec un design moderne et une expérience utilisateur améliorée.
						</p>
					</article>
				</section>
				<hr>
				<section>
					<h3><i class="las la-tools"></i> Projets Personnels</h3>
					<article class="bracket">
						<h5>Projet Script<br><small>Juin 2012 – Aujourd'hui</small></h5>
						<p class="lead">Projet réalisé en C++20</p>
						<p>
							Création d'un langage de programmation et de son compilateur (from scratch).<br>
							Projet en cours de refonte. Son code a majoritairement été migré dans ma bibliothèque CppUtils (voir ci-dessous).
						</p>
						<i class="lab la-github"></i> <a href="https://github.com/MorganCaron/Script" class="underlined">https://github.com/MorganCaron/Script</a>
					</article>
					<article class="bracket">
						<h5>Projet CppUtils<br><small>Janvier 2020 – Aujourd'hui</small></h5>
						<p class="lead">Projet réalisé en C++20</p>
						<p>Bibliothèque d'utilitaires pour le développement de projets en C++.</p>
						<i class="lab la-github"></i> <a href="https://github.com/MorganCaron/CppUtils" class="underlined">https://github.com/MorganCaron/CppUtils</a>
	
					</article>
					<article class="bracket">
						<h5>Projet IsometricSass</h5>
						<p>Bibliothèque Sass de 2D Isométrique</p>
						<i class="lab la-github"></i> <a href="https://github.com/MorganCaron/IsometricSass" class="underlined">https://github.com/MorganCaron/IsometricSass</a>
					</article>
					<article class="bracket">
						<h5>Projet Nootstrap</h5>
						<p>Bibliothèque Sass de mise en page web (Alternative à Bootstrap)</p>
						<i class="lab la-github"></i> <a href="https://github.com/MorganCaron/Nootstrap" class="underlined">https://github.com/MorganCaron/Nootstrap</a>
					</article>
					<article class="bracket">
						<h5>Projet CustomElementTs</h5>
						<p>Bibliothèque facilitant la création de webapps (Alternative à React)</p>
						<i class="lab la-github"></i> <a href="https://github.com/MorganCaron/custom-element-ts" class="underlined">https://github.com/MorganCaron/custom-element-ts</a>
					</article>
				</section>
				<hr>
				<section>
					<h3><i class="las la-chess-knight"></i> Centres d'intérêt</h3>
					<article class="bracket py-0">
						<ul class="triangle-right-bullet mt-0">
							<li>Sciences de l'information: Logique, Informatique, Intelligence Artificielle, Traitement automatique des langues, électronique</li>
							<li>Sciences humaines: Philosophie, Psychologie</li>
							<li>Culture: Jeux vidéo, Films, Séries, Musiques</li>
						</ul>
					</article>
				</section>
	
			</div>
			<aside class="col-lg-4 muted pb-5">
				<section>
					<h3><i class="las la-wrench"></i> Compétences</h3>
					<article class="bracket" style="min-height: 6rem;">
						<h4>Langages</h4>
						<ul class="triangle-right-bullet">
							<li class="web">HTML5 <app-stars stars="5"></app-stars></li>
							<li class="web">CSS3/SCSS/Sass <app-stars stars="5"></app-stars></li>
							<li class="web">JSON <app-stars stars="5"></app-stars></li>
							<li class="software cpp">C++ (C++11, C++14, C++17, C++20) <app-stars stars="5"></app-stars></li>
							<li class="software cpp">C <app-stars stars="4"></app-stars></li>
							<li class="web">Javascript ES6 <app-stars stars="4"></app-stars></li>
							<li class="web">Typescript <app-stars stars="4"></app-stars></li>
							<li class="web">PHP <app-stars stars="4"></app-stars></li>
							<li class="software">C# <app-stars stars="3"></app-stars></li>
							<li class="web">SQL <app-stars stars="3"></app-stars></li>
							<li class="software cpp">Python <app-stars stars="3"></app-stars></li>
							<li class="software web>">Regex <app-stars stars="3"></app-stars></li>
							<li class="software cpp">ASM <app-stars stars="2"></app-stars></li>
						</ul>
					</article>
					<article class="bracket" style="min-height: 17rem;">
						<h4>Bibliothèques & Frameworks</h4>
						<ul class="triangle-right-bullet">
							<li class="web">Bootstrap <app-stars stars="5"></app-stars></li>
							<li class="software cpp">STL (C++) <app-stars stars="4"></app-stars></li>
							<li class="software cpp">SDL <app-stars stars="4"></app-stars></li>
							<li class="software cpp">SFML <app-stars stars="4"></app-stars></li>
							<li class="web">ThreeJS <app-stars stars="4"></app-stars></li>
							<li class="web">Angular <app-stars stars="4"></app-stars></li>
							<li class="software cpp">Protobuf <app-stars stars="3"></app-stars></li>
							<li class="software cpp">gRPC <app-stars stars="3"></app-stars></li>
							<li class="software cpp">Boost (C++) <app-stars stars="3"></app-stars></li>
							<li class="web">React <app-stars stars="3"></app-stars></li>
							<li class="web">Materialize <app-stars stars="3"></app-stars></li>
							<li class="web">MDL <app-stars stars="3"></app-stars></li>
							<li class="web">MaterialUI <app-stars stars="3"></app-stars></li>
							<li class="web">ExpressJS <app-stars stars="3"></app-stars></li>
							<li class="web">SequelizeJS <app-stars stars="3"></app-stars></li>
							<li class="web">CakePHP <app-stars stars="3"></app-stars></li>
							<li class="web">Java EE <app-stars stars="3"></app-stars></li>
							<li class="web">ASP.NET <app-stars stars="3"></app-stars></li>
							<li class="web">.NET Core <app-stars stars="2"></app-stars></li>
							<li class="web">.NET Framework <app-stars stars="2"></app-stars></li>
							<li class="software cpp">OpenGL <app-stars stars="2"></app-stars></li>
							<li class="software cpp">Qt <app-stars stars="2"></app-stars></li>
							<li class="software">Unity <app-stars stars="2"></app-stars></li>
							<li class="software">Hololens SDK for Unity <app-stars stars="2"></app-stars></li>
							<li class="web">Symfony <app-stars stars="2"></app-stars></li>
							<li class="web">CodeIgniter <app-stars stars="2"></app-stars></li>
							<li class="web">Laravel <app-stars stars="2"></app-stars></li>
							<li class="web">Vue <app-stars stars="2"></app-stars></li>
						</ul>
					</article>
					<article class="bracket" style="min-height: 13rem;">
						<h4>Logiciels, Outils & OS</h4>
						<ul class="triangle-right-bullet">
							<li>OS: Windows & Linux</li>
							<li>IDE: <span class="software cpp">Visual Studio, QtCreator, Eclipse, </span>VSCode</li>
							<li>CI: Github Actions, Travis CI, Jenkins, Microsoft Azure DevOps</li>
							<li>Versioning: Git</li>
							<li>Plateformes Git: Github, Gitlab, BitBucket, Azure Repos</li>
							<li>Build System: <span class="software cpp">Makefile, CMake, XMake, Meson Build</span><span class="all">, </span><span class="web">Webpack, Parsec, Vite, Snowpack</span></li>
							<li>Autres: <span class="web">NodeJS, PhpMyAdmin, Matomo (Piwik), WampServer, Laragon, PM2, Babel, Wordpress, Prestashop, </span>Suite Office, Google Analytics, Azure Dataflow, Azure Databricks, Blender, Cinema4D</li>
						</ul>
					</article>
					<article class="bracket" style="min-height: 6rem;">
						<h4>Langues</h4>
						<ul class="triangle-right-bullet">
							<li>Français (langue natale)</li>
							<li>Anglais Technique</li>
						</ul>
					</article>
				</section>
			</aside>
		</div>
	</div>
	<app-window caption="style.css"></app-window>
	<style id="filter-style"></style>
</div>
<style id="cv-style"></style>
`,C=`* {\r
	transition: all 1s;\r
}\r
\r
body {\r
	--default-bg-color: #112255;\r
}\r
\r
page-cv {\r
	transform: translateZ(-10rem);\r
}\r
\r
app-window {\r
	transform: translate3d(35vw, 0, 10rem);\r
}\r
\r
app-window > section {\r
	font-size: 13px;\r
	line-height: 1;\r
}\r
\r
.primary {\r
	background-color: #1a1c24;\r
	border: 0 solid #1a1c24;\r
	color: #eee;\r
}\r
\r
.secondary {\r
	background-color: #008cba;\r
	border: 0 solid #008cba;\r
	color: #eee;\r
}\r
\r
header article::before {\r
	content: "";\r
	position: absolute;\r
	top: 0;\r
	right: 0;\r
	width: 15px;\r
	height: 15px;\r
	border-color: #1a1c24 #1a1c24 transparent transparent;\r
	border-style: solid;\r
	border-width: 15px;\r
}\r
\r
header + hr {\r
	border-top: 1rem solid #008cba;\r
	border-bottom: 2rem solid #fff;\r
	margin: 0;\r
}\r
\r
.section h2 {\r
	margin: 1rem 0;\r
	padding-bottom: .2rem;\r
	border-bottom: 2px solid currentcolor;\r
}\r
\r
.section h3 {\r
	margin: 1rem 0;\r
	font-size: 30px;\r
	font-weight: 300;\r
}\r
\r
h4 {\r
	transform-origin: top left;\r
	transform: translateX(-1rem) rotate(90deg);\r
	white-space: nowrap;\r
	position: absolute;\r
}\r
\r
article {\r
	margin-left: 2rem;\r
}\r
\r
.section {\r
	position: relative;\r
	margin: .5rem;\r
	padding: 1rem;\r
	border-width: 2px;\r
}\r
\r
li {\r
	margin-bottom: 0.5rem;\r
}\r
\r
.muted {\r
	background-color: grey;\r
	border: 0 solid grey;\r
	color: #eee;\r
}\r
\r
body {\r
	--default-bg-color: #eee;\r
	--default-color: #010101;\r
}\r
\r
#cv-content > .container {\r
	background-color: #fff;\r
}\r
\r
app-window {\r
	transform: translate3d(100vw, 0, 10rem) rotateY(-90deg);\r
	opacity: 0;\r
}\r
\r
::-webkit-scrollbar {\r
	width: 0 !important;\r
}\r
\r
page-cv.d-block {\r
	transform: none;\r
}\r
\r
body .page-corners {\r
	background-image: none;\r
}\r
\r
body.grid-background {\r
	background-image: none;\r
}\r
\r
#cv-content {\r
	padding: 0px;\r
}\r
\r
body app-main {\r
	margin: 0px;\r
	padding: 0px;\r
}\r
\r
.bracket {\r
	padding-left: 0.5rem;\r
	margin-bottom: 1rem;\r
}\r
\r
.bracket::before {\r
	content: "";\r
	display: block;\r
	position: absolute;\r
	width: 6px;\r
	height: 100%;\r
	left: -4px;\r
	border-style: solid;\r
	border-color: rgba(26, 28, 36, .25);\r
	border-width: 2px 0 2px 2px;\r
}\r
\r
.muted .bracket::before {\r
	border-color: white;\r
}\r
\r
* {\r
	transition: all 0s;\r
}\r
\r
app-window {\r
	display: none;\r
	transform: none;\r
}\r
`;var at=Object.defineProperty,it=Object.getOwnPropertyDescriptor,lt=(e,t,n,r)=>{for(var s=r>1?void 0:r?it(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&at(t,n,s),s};let _=class extends HTMLElement{constructor(){super(...arguments),this.timeout=null,this.filter="cpp"}connected(){var e;this.styleElement=this.querySelector("#cv-style"),this.styleRenderElement=this.querySelector("app-window > section"),this.initWriter(),(e=this.querySelector("#filter"))==null||e.addEventListener("change",t=>{this.filter=t.target.options[t.target.selectedIndex].value,this.updateFilter()},!1),this.updateFilter()}disconnected(){this.timeout&&clearTimeout(this.timeout)}updateFilter(){const e=this.querySelector("#filter-style");e&&(e.innerHTML=this.filter==="all"?"section.all, section.software, section.cpp, section.web, article.all, article.software, article.cpp, article.web { display: block; } span.all, span.software, span.cpp, span.web, li.all, li.software, li.cpp, li.web { display: block; }":`section.${this.filter}, article.${this.filter} { display: block; } span.${this.filter}, li.${this.filter} { display: block; }`)}isMobileDevice(){let e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e}initWriter(){if(this.isMobileDevice()){this.styleElement.innerHTML=C;return}let e=0;if(this.styleElement){this.styleElement.innerHTML="";const t=()=>{for(let n=0;n<10;++n){if(e==C.length)return;const r=C[e++];this.styleElement.innerHTML+=r,this.styleRenderElement&&this.parseCss(r,!1)}this.timeout=setTimeout(t,1)};t()}}parseCss(e,t){this.styleRenderElement&&(e==="/"&&t===!1?(t=!0,this.styleRenderElement.innerHTML+=e):e==="/"&&t===!0?(t=!1,this.styleRenderElement.innerHTML=this.styleRenderElement.innerHTML.replace(/(\/[^\/]*\*)$/,'<em class="comment">$1/</em>')):e===":"?this.styleRenderElement.innerHTML=this.styleRenderElement.innerHTML.replace(/([a-zA-Z- ^\n]*)$/,'<em class="key">$1</em>:'):e===";"?this.styleRenderElement.innerHTML=this.styleRenderElement.innerHTML.replace(/([^:]*)$/,'<em class="value">$1</em>;'):e==="{"?this.styleRenderElement.innerHTML=this.styleRenderElement.innerHTML.replace(/(.*)$/,'<em class="selector">$1</em>{'):e===`
`?this.styleRenderElement.innerHTML+="<br>":e==="	"?this.styleRenderElement.innerHTML+="&#09;":this.styleRenderElement.innerHTML+=e)}};_=lt([d({selector:"page-cv",classes:"d-block",template:nt})],_);const ot=`<a href="#" class="btn lite triangle-left-bullet float-right">Back</a>

<div class="container">
	<h2>About</h2>
	<p class="lead">
		Technologies utilisées pour développer ce site:
	</p>
	<ul class="lead triangle-right-bullet">
		<li><a href="https://vitejs.dev" class="underlined"><strong>ViteJS</strong></a>: Front-end build tool</li>
		<li><a href="https://github.com/MorganCaron/Nootstrap" class="underlined"><strong>Nootstrap</strong></a> (Bootstrap-like): Design graphique</li>
		<li><a href="https://github.com/MorganCaron/custom-element-ts" class="underlined"><strong>custom-element-ts</strong></a> (React-like): Composants et pagination</li>
	</ul>
</div>
`;var ct=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,ht=(e,t,n,r)=>{for(var s=r>1?void 0:r?pt(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&ct(t,n,s),s};let P=class extends HTMLElement{};P=ht([d({selector:"page-about",template:ot})],P);const dt=`<header class="scale-2 scale-sm-3 scale-md-4 scale-lg-5">
	<div class="mouse-oriented">
		<div class="title">
			<h1>{{ h1 }}</h1>
			<h2>{{ h2 }}</h2>
			<div class="smoke"></div>
		</div>
		<nav class="lead pl-0">
			<ul class="list-default d-flex justify-content-center my-3">
				<li><a href="https://github.com/MorganCaron?tab=repositories" class="btn lite">Projects</a></li>
				<li><a href="cv" class="btn lite page">CV</a></li>
				<li><a href="about" class="btn lite page">About</a></li>
			</ul>
		</nav>
		<hr>
		<nav class="lead pl-0 ">
			<ul class="list-default d-flex justify-content-center my-3 line-height-normal">
				<li><a class="mx-1" href="https://discord.gg/mxZvun4"><img src="https://img.shields.io/static/v1?label=&message=Discord&color=blue&logo=discord&logoColor=white&style=for-the-badge" alt="Discord"></a></li>
				<li><a class="mx-1" href="https://github.com/MorganCaron"><img src="https://img.shields.io/static/v1?label=&message=Github&color=grey&logo=github&logoColor=white&style=for-the-badge" alt="Github"></a></li>
				<li><a class="mx-1" href="https://www.linkedin.com/in/morgancaron/"><img src="https://img.shields.io/static/v1?label=&message=LinkedIn&color=blue&logo=linkedin&logoColor=white&style=for-the-badge" alt="LinkedIn"></a></li>
			</ul>
		</nav>
		<hr>
	</div>
</header>
<span class="scroll-arrow"></span>
`;var ut=Object.defineProperty,mt=Object.getOwnPropertyDescriptor,E=(e,t,n,r)=>{for(var s=r>1?void 0:r?mt(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&ut(t,n,s),s};let y=class extends HTMLElement{constructor(){super(...arguments),this.h1="",this.h2="",this.timeouts=[]}connected(){this.initWriter(),this.initMenu(),typeof screen.orientation<"u"&&(document.addEventListener("mousemove",this.onMouseMove.bind(this)),document.body.addEventListener("mouseleave",this.onMouseMove.bind(this)))}disconnected(){this.timeouts.forEach(e=>clearTimeout(e))}addTimeouts(e){for(this.timeouts=[...this.timeouts,...e];this.timeouts.length>=100;)this.timeouts.shift()}initWriter(){const e={interval:70,replace:!0,update:this.updateH1.bind(this)},t={interval:50,replace:!0,update:this.updateH2.bind(this)},n=()=>this.addTimeouts(m.write(this.h1,"Hello World !",e,()=>this.addTimeouts([setTimeout(r,1e3)]))),r=()=>this.addTimeouts(m.write(this.h1,"</>",e,s)),s=()=>this.addTimeouts(m.write(this.h1,"<I'm Morgan/>",e,()=>this.addTimeouts([setTimeout(a,1e3)]))),a=()=>this.addTimeouts(m.write(this.h1,"I'm Morgan",e,i)),i=()=>this.addTimeouts(m.write(this.h2,"Welcome to my website",t,()=>{this.addTimeouts([setTimeout(l,5e3)]),this.addTimeouts([setTimeout(h,6e3)])})),l=()=>this.addTimeouts(m.write(this.h1,"Morgan",e,o)),o=()=>this.addTimeouts(m.write(this.h1,"Morgan Caron",e,()=>{this.addTimeouts([setTimeout(p,15e3)]),this.addTimeouts([setTimeout(c,15e3)])})),h=()=>this.addTimeouts(m.write(this.h2,"Software and Web developer",t)),p=()=>this.addTimeouts(m.write(this.h1,"",e,n)),c=()=>this.addTimeouts(m.write(this.h2,"",t));this.addTimeouts([setTimeout(n,0)])}initMenu(){const e=document.querySelector("app-router");this.querySelectorAll("a.page").forEach(t=>{const n=t.getAttribute("href")||"";t.addEventListener("click",r=>{r.preventDefault(),e.navigate(n)})})}updateH1(e){this.h1=e,this.querySelector("h1").innerHTML=e}updateH2(e){this.h2=e,this.querySelector("h2").innerHTML=e}onMouseMove(e){const t=parseInt(document.body.style.getPropertyValue("--mouse-x"))|0,n=parseInt(document.body.style.getPropertyValue("--mouse-y"))|0,r=Math.min(Math.max(-1,(t/window.innerWidth-.5)*2),1),s=Math.min(Math.max(-1,(n/window.innerHeight-.5)*2),1),a=.2,i=-s*a*90,l=r*a*90;this.querySelector(".mouse-oriented").style.transform=`rotateX(${i}deg) rotateY(${l}deg)`}};E([g()],y.prototype,"h1",2);E([g()],y.prototype,"h2",2);y=E([d({selector:"app-header",classes:"w-100 h-100 align-center select-none",template:dt})],y);const gt="";var bt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,vt=(e,t,n,r)=>{for(var s=r>1?void 0:r?ft(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&bt(t,n,s),s};let O=class extends HTMLElement{};O=vt([d({selector:"app-footer",template:gt})],O);const wt=`<header class="d-flex justify-content-between">\r
	<h3 class="lead m-1 inline">{{ caption }}</h3>\r
	<div class="controls d-flex">\r
		<button class="minimize"><i class="las la-minus"></i></button>\r
		<button class="expand"><i class="las la-stop"></i></button>\r
		<button class="close"><i class="las la-times"></i></button>\r
	</div>\r
</header>\r
<section class="p-1">\r
	{{ baseContent }}\r
</section>\r
<button class="resize"></button>\r
`;var yt=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,w=(e,t,n,r)=>{for(var s=r>1?void 0:r?Ct(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&yt(t,n,s),s};let f=class extends HTMLElement{constructor(e,t,n="5rem",r="5rem"){super(),this.caption="",this.anchorX=0,this.anchorY=0,this.moving=!1,this.resizing=!1,this.canMove=e,this.canResize=t,this.minWidth=300,this.minHeight=150,this.style.left=n,this.style.top=r,this.style.minWidth=this.minWidth+"px",this.style.minHeight=this.minHeight+"px",this.style.maxWidth="100%",this.style.maxHeight="100%"}connected(){var t,n,r,s;this.addEventListener("mousedown",this.setFocus.bind(this),!1),document.addEventListener("mouseup",this.unsetFocus.bind(this),!1);const e=this.querySelector("header");e==null||e.addEventListener("mousedown",this.moveGrab.bind(this),!1),document.addEventListener("mousemove",this.drag.bind(this),!1),document.addEventListener("mouseup",this.drop.bind(this),!1),(t=this.querySelector("button.resize"))==null||t.addEventListener("mousedown",this.resizeGrab.bind(this),!1),(n=e==null?void 0:e.querySelector(".minimize"))==null||n.addEventListener("mouseup",this.minimize.bind(this),!1),(r=e==null?void 0:e.querySelector(".expand"))==null||r.addEventListener("mouseup",this.expand.bind(this),!1),(s=e==null?void 0:e.querySelector(".close"))==null||s.addEventListener("mouseup",this.close.bind(this),!1)}setFocus(){this.style.zIndex="3"}unsetFocus(){this.moving=!1}moveGrab(e){if(!this.canMove)return;const t=this.getBoundingClientRect();this.moving=!0,this.anchorX=e.clientX-t.left,this.anchorY=e.clientY-t.top}drag(e){var n;const t=this.getBoundingClientRect();if(this.moving){const r=(n=this.parentElement)==null?void 0:n.getBoundingClientRect();r&&(this.style.left=Math.min(Math.max(r.left,e.clientX-this.anchorX),r.right-t.width)+"px",this.style.top=Math.min(Math.max(r.top,e.clientY-this.anchorY),r.bottom-t.height)+"px")}else this.resizing&&(this.style.width=String(Math.max(this.minWidth,e.clientX-t.left))+"px",this.style.height=String(Math.max(this.minHeight,e.clientY-t.top))+"px")}drop(){this.moving=!1,this.resizing=!1}resizeGrab(){this.resizing=this.canResize}minimize(){}expand(){}close(){this.animate([{opacity:1,transform:"translateY(0) scale(1)"},{opacity:0,transform:"translateY(5rem) scale(.5)"}],{duration:200,easing:"ease-out",iterations:1}),setTimeout(()=>{var e;(e=this.parentElement)==null||e.removeChild(this)},200)}};w([g()],f.prototype,"caption",2);w([g()],f.prototype,"moving",2);w([g()],f.prototype,"resizing",2);w([g()],f.prototype,"canResize",2);f=w([d({selector:"app-window",template:wt,removeContent:!0})],f);var Mt=Object.defineProperty,St=Object.getOwnPropertyDescriptor,_t=(e,t,n,r)=>{for(var s=r>1?void 0:r?St(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&Mt(t,n,s),s};let j=class extends HTMLElement{};j=_t([d({selector:"app-windows-area"})],j);var Pt=Object.defineProperty,Tt=Object.getOwnPropertyDescriptor,R=(e,t,n,r)=>{for(var s=r>1?void 0:r?Tt(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&Pt(t,n,s),s};let T=class extends HTMLElement{connected(){for(let e=0;e<Math.floor(this.stars);++e)this.addStar(0);this.stars%1!=0&&this.addStar(1);for(let e=Math.ceil(this.stars);e<5;++e)this.addStar(2)}addStar(e){const t=document.createElement("i");switch(e){case 0:{t.classList.add("las","la-star");break}case 1:{t.classList.add("las","la-star-half-alt");break}case 2:{t.classList.add("lar","la-star");break}}this.appendChild(t)}};R([g()],T.prototype,"stars",2);T=R([d({selector:"app-stars"})],T);const Et=`<app-router class="d-contents"></app-router>
`;var xt=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,Dt=(e,t,n,r)=>{for(var s=r>1?void 0:r?Lt(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(s=(r?i(t,n,s):i(s))||s);return r&&s&&xt(t,n,s),s};new X;let H=class extends HTMLElement{connected(){this.initRouter()}initRouter(){const e=this.querySelector("app-router");e.mode="hash",Array({path:"",component:M},{path:"projects",component:S},{path:"cv",component:_},{path:"about",component:P}).forEach(t=>e.addRoute(t)),e.listen()}};H=Dt([d({selector:"app-main",classes:"scroll-snap-proximity",template:Et})],H);
