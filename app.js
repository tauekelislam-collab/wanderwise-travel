/* WanderWise destination data and interaction logic */
const photoUrl = (id, width = 800) =>
  "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + width + "&q=82";

/* Two images per recommendation are required for the Coursera final project. */
const travelPlaces = [
  {category:"beach",name:"Whitehaven Beach",location:"Whitsunday Islands, Australia",summary:"Soft white sand, crystal-clear water and a magnificent stretch of coastline made for unforgettable days.",keywords:["beach","australia","ocean","whitehaven"],pictures:["photo-1507525428034-b723cf961d3e","photo-1519046904884-53103b34b206"]},
  {category:"beach",name:"Tropical Maldives",location:"Maldives",summary:"An island escape of dreamy blue lagoons, coral reefs and endless time to enjoy the sea.",keywords:["beach","island","maldives","ocean"],pictures:["photo-1514282401047-d79a71a590e8","photo-1500375592092-40eb2168fd21"]},
  {category:"beach",name:"Bali Coast",location:"Bali, Indonesia",summary:"Discover warm sunsets, dramatic coastal landscapes and the relaxed rhythm of island life.",keywords:["beach","bali","indonesia","sea"],pictures:["photo-1537996194471-e657df975ab4","photo-1518548419970-58e3b4079ab2"]},
  {category:"temple",name:"Fushimi Inari Shrine",location:"Kyoto, Japan",summary:"Follow sacred forest trails and admire the architecture and traditions of historic Kyoto.",keywords:["temple","japan","kyoto","shrine","heritage"],pictures:["photo-1493976040374-85c8e12f0c0e","photo-1528360983277-13d401cdc186"]},
  {category:"temple",name:"Bali Temple Heritage",location:"Bali, Indonesia",summary:"Explore the fascinating cultural heritage and distinctive spiritual architecture of Bali.",keywords:["temple","bali","indonesia","culture"],pictures:["photo-1537996194471-e657df975ab4","photo-1518548419970-58e3b4079ab2"]},
  {category:"temple",name:"Bangkok Temples",location:"Bangkok, Thailand",summary:"Find elaborate temple details and discover centuries of culture in the Thai capital.",keywords:["temple","bangkok","thailand","history"],pictures:["photo-1563492065599-3520f775eeed","photo-1545569341-9eb8b30979d9"]},
  {category:"country",name:"Japan",location:"East Asia",summary:"From lantern-lit streets and historic shrines to inspiring cities, Japan is full of discovery.",keywords:["country","japan","asia","tokyo","kyoto"],pictures:["photo-1528360983277-13d401cdc186","photo-1542051841857-5f90071e7989"]},
  {category:"country",name:"Brazil",location:"South America",summary:"Colorful cities, iconic views and a vibrant cultural spirit create unforgettable travel memories.",keywords:["country","brazil","rio","south america"],pictures:["photo-1483729558449-99ef09a8c325","photo-1516306580123-e6e52b1b7b5f"]},
  {category:"country",name:"Italy",location:"Southern Europe",summary:"Stroll through beautiful towns and discover an extraordinary mix of art, coastline and culture.",keywords:["country","italy","europe","venice"],pictures:["photo-1533105079780-92b9be482077","photo-1523906834658-6e24ef2386f9"]},
  {category:"country",name:"Australia",location:"Oceania",summary:"Extraordinary landscapes and unforgettable coastal cities await on this beautiful continent.",keywords:["country","australia","sydney"],pictures:["photo-1506973035872-a4ec16b8e8d9","photo-1523482580672-f109ba8cb9be"]}
];

function findPlaces(query) {
  const term = query.trim().toLowerCase();
  if (!term) return [];
  const sets = {
    beach:["beach","beaches","пляж","пляжи"],
    temple:["temple","temples","храм","храмы"],
    country:["country","countries","страна","страны"]
  };
  for (const [category, words] of Object.entries(sets)) {
    if (words.includes(term)) return travelPlaces.filter(p => p.category === category);
  }
  if (["all","destinations","travel","explore"].includes(term)) return travelPlaces;
  return travelPlaces.filter(p => [p.name,p.location,p.summary,p.category,...p.keywords]
    .some(value => value.toLowerCase().includes(term)));
}

function photo(id, description, width) {
  const element = document.createElement("img");
  element.src = photoUrl(id, width);
  element.alt = description;
  element.loading = "lazy";
  element.decoding = "async";
  element.addEventListener("error", () => {
    if (element.dataset.backup) return;
    element.dataset.backup = "1";
    const svg='<svg xmlns="http://www.w3.org/2000/svg" width="600" height="500"><rect width="600" height="500" fill="#b8dfe1"/><circle cx="440" cy="125" r="55" fill="#fff0d4"/><path d="M0 450 170 190 320 350 410 270 600 440V500H0Z" fill="#648e9d"/><text x="300" y="470" font-family="Arial" font-size="18" fill="#fff" text-anchor="middle">Destination photo</text></svg>';
    element.src="data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(svg);
  },{once:true});
  return element;
}

function card(place) {
  const article=document.createElement("article");article.className="place-card";
  const images=document.createElement("div");images.className="place-images";
  images.append(photo(place.pictures[0],place.name+" — first destination image",850),
    photo(place.pictures[1],place.name+" — second destination image",450));
  const body=document.createElement("div");body.className="place-content";
  const category=document.createElement("span");category.className="place-type";
  category.textContent=place.category+" / "+place.location;
  const title=document.createElement("h4");title.textContent=place.name;
  const summary=document.createElement("p");summary.textContent=place.summary;
  const bottom=document.createElement("div");bottom.className="place-bottom";
  const label=document.createElement("span");label.textContent="2 TRAVEL PHOTOS";
  const arrow=document.createElement("span");arrow.textContent="↗";arrow.setAttribute("aria-hidden","true");
  bottom.append(label,arrow);body.append(category,title,summary,bottom);article.append(images,body);
  return article;
}
function initNavigation() {
  const menu=document.getElementById("mobile-menu"), nav=document.getElementById("nav-items");
  if(menu&&nav) {
    menu.addEventListener("click",()=>{const isOpen=nav.classList.toggle("show");menu.setAttribute("aria-expanded",String(isOpen));});
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("show");menu.setAttribute("aria-expanded","false");}));
  }
}
function initSearch() {
  const form=document.getElementById("search-form"),input=document.getElementById("search-box"),clear=document.getElementById("clear-btn");
  if(!form||!input) return;
  const onHome=document.body.dataset.page==="home";
  if(!onHome){if(clear)clear.addEventListener("click",()=>{input.value="";input.focus();});return;}
  const results=document.getElementById("results"),grid=document.getElementById("result-grid"),
    heading=document.getElementById("results-heading"),count=document.getElementById("result-count"),
    preview=document.getElementById("preview"),empty=document.getElementById("no-results"),
    discover=document.getElementById("discover");
  function route(term) {
    const url=new URL(window.location.href);
    if(term)url.searchParams.set("q",term);else url.searchParams.delete("q");
    history.replaceState({},"",url);
  }
  function run(term,shouldScroll=true) {
    const query=term.trim();if(!query)return;
    input.value=query;
    const matches=findPlaces(query);
    grid.replaceChildren(...matches.map(card));
    heading.textContent="Results for “"+query+"”";
    count.textContent=matches.length+" "+(matches.length===1?"PLACE":"PLACES");
    results.hidden=false;empty.hidden=matches.length>0;preview.hidden=true;
    route(query);
    if(shouldScroll)results.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function reset() {
    input.value="";results.hidden=true;empty.hidden=true;preview.hidden=false;
    grid.replaceChildren();route("");discover.scrollIntoView({behavior:"smooth",block:"start"});
    input.focus({preventScroll:true});
  }
  form.addEventListener("submit",event=>{event.preventDefault();run(input.value);});
  if(clear)clear.addEventListener("click",reset);
  document.querySelectorAll("[data-term]").forEach(button=>button.addEventListener("click",()=>run(button.dataset.term)));
  const explore=document.getElementById("start-exploring");
  if(explore)explore.addEventListener("click",()=>{discover.scrollIntoView({behavior:"smooth",block:"start"});});
  const initial=new URLSearchParams(window.location.search).get("q");
  if(initial)run(initial,false);
}
function initContact() {
  const form=document.getElementById("contact-form"),notice=document.getElementById("form-notice");
  if(!form||!notice)return;
  form.addEventListener("submit",event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const name=document.getElementById("full-name").value.trim();
    if(name.length<2){notice.textContent="Please enter your full name.";notice.hidden=false;return;}
    notice.textContent="Thanks, "+name+"! Your form passed validation. This is a demonstration: your message was not emailed or stored.";
    notice.hidden=false;form.reset();
  });
}
document.addEventListener("DOMContentLoaded",()=>{initNavigation();initSearch();initContact();});