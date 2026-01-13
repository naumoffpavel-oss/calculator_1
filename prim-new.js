const catalogData = [
    {
      id: "manufacturers",
      title: "Производители пленки",
      groups: [
        {
          id: "all",
          title: "Все",
          items: [
            {
              id: "longwai",
              name: "LongWai",
              images: ["/images/Proizvoditeli/Longwai.svg"],
              specs: [
                "Фактура: Мат",
                "Производитель: Китай",
                "Толщина: 0.12-0.13 мм",
                "Прочность: 65 кг/м2",
                "Белизна: 90 %",
                "Ширина: до 3.5 м",
                "Гарантия: 3 года",
                "Сертификат: GB/T 19001-2008 ISO 9001:2008"
              ]
            },
            {
              id: "msd-classic",
              name: "MSD Classic",
              images: ["/images/Proizvoditeli/Classic.svg"],
              specs: [
                "Фактура: Мат, глянец, сатин",
                "Производитель: Китай",
                "Толщина: 0.18–0.2 мм",
                "Прочность:  100 кг/м2",
                "Ширина: до 5.5 м",
                "Белизна: 94%",
                "Зеркальность: 91–94%",
                "Матовость: 3.5–3.9%",
                "Гарантия: 5 лет",
                "Пожарная безопасность: KM5",
                "Сертификаты: EN71-3, ROHS"
              ]
            },
            {
              id: "msd-perfect",
              name: "MSD Perfect",
              images: ["/images/Proizvoditeli/Perfekt.svg"],
              specs: [
                "Фактура: Мат",
                "Производитель: Тайвань",
                "Толщина: 0.21 мм",
                "Ширина: до 5.5 м",
                "Белизна: 94%",
                "Матовость: 4 - 4.5%",
                "Гарантия: 5 лет (ИСО + Сертификат соответствия РФ)",
                "Пожарная безопасность: KM3",
                "Сертификаты: REACH, EN71-3, ROHS",
                "Гарантия: 10 лет"
              ]
            },
            {
              id: "bauf",
              name: "BAUF",
              images: ["/images/Proizvoditeli/Bauf.svg"],
              specs: [
                "Фактура: Мат, глянец, сатин",
                "Страна бренда: Германия",
                "Производитель: Китай",
                "Толщина: 0.21-0.27 мм",
                "Ширина: до 5 м",
                "Плотность: 250-300 гр/кв.м",
                "Прочность на разрыв: 21/28-25/35 H",
                "Прозрачность: 101–106 мкн",
                "Пожарная безопасность: KM3",
                "Сертификаты: А+, REACH, EN71-3, ROHS",
                "Гарантия: 15 лет"
              ]
            },
            {
              id: "teqtum",
              name: "Teqtum",
              images: ["/images/Proizvoditeli/Teqtum.svg"],
              specs: [
                "Фактура: Мат, глянец, сатин",
                "Страна бренда: Германия",
                "Производитель: Китай",
                "Толщина: 0.21-0.24 мм",
                "Ширина: до 5 м",
                "Плотность: 270 гр/кв.м",
                "Пожарная безопасность: KM2",
                "Сертификаты: № RU CCN.ЧС13.В.00101/19, REACH, EN71-3, ROHS",
                "Гарантия: 15 лет"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "profiles",
      title: "Профиля",
      groups: [
        {
          id: "classic",
          title: "Классический",
          items: [
            { id: "profile-pvh", name: "Стеновой ПВХ", images: ["/images/zamer/profiles/pvx.webp"], specs: [] },
            { id: "profile-al", name: "Стеновой Алюминиевый", images: ["/images/zamer/profiles/al.webp"], specs: [] }
          ]
        },
        {
          id: "shadow",
          title: "Теневой",
          items: [
            { id: "bizon-pvh", name: "Бизон ПВХ", images: ["/images/zamer/profiles/bizon.webp","/images/zamer/profiles/bizon_p.webp"], specs: [] },
            { id: "flexy-euro-02", name: "Flexy EURO 02", images: ["/images/zamer/profiles/flexy_euro_02.webp","/images/zamer/profiles/flexy_euro_02_p.webp"], specs: [] },
            { id: "flexy-euro-05", name: "Flexy EURO 05", images: ["/images/zamer/profiles/flexy_euro_05.webp","/images/zamer/profiles/flexy_euro_05_p.webp"], specs: [] },
            { id: "eurokraab", name: "EuroKraab", images: ["/images/zamer/profiles/eurocraab.webp","/images/zamer/profiles/eurocraab_p.webp"], specs: [] }
          ]
        },
        {
          id: "floating",
          title: "Парящий",
          items: [
            { id: "flexy-fly-02", name: "Flexy Fly 02", images: ["/images/zamer/profiles/flexy_fly_02.webp","/images/zamer/profiles/flexy_fly_02_p.webp"], specs: [] },
            { id: "contour-pro-led", name: "Contour Pro LED", images: ["/images/zamer/profiles/contour_pro_led.webp","/images/zamer/profiles/contour_pro_led_p.webp","/images/zamer/profiles/flexy_fly_02_p2.webp"], specs: [] }
          ]
        },
        {
          id: "contour",
          title: "Контурный",
          items: [
            { id: "flexy-kontur-01", name: "Flexy KONTUR 01", images: ["/images/zamer/profiles/flexy_kontur_01.webp","/images/zamer/profiles/flexy_kontur_01_p.webp"], specs: [] },
            { id: "flexy-kontur-02", name: "Flexy KONTUR 02", images: ["/images/zamer/profiles/flexy_kontur_02.webp","/images/zamer/profiles/flexy_kontur_02_p.webp"], specs: [] }
          ]
        },
        {
          id: "divider",
          title: "Разделитель",
          items: [
            { id: "divider-al", name: "Алюминиевый", images: ["/images/zamer/profiles/razdelinel.webp","/images/zamer/profiles/razdelinel_p.webp"], specs: [] },
            { id: "flexy-euro-04", name: "Flexy EURO 04", images: ["/images/zamer/profiles/flexy_euro_04.webp","/images/zamer/profiles/flexy_euro_04_p.webp","/images/zamer/profiles/flexy_euro_04_p2.webp"], specs: [] }
          ]
        }
      ]
    },
    {
      id: "lighting",
      title: "Светильники",
      groups: [
        {
          id: "recessed",
          title: "Встраиваемые",
          items: [
            { id: "white-gx53", name: "Белый GX53", price: "350 ₽", images: ["/images/zamer/svetilniki/vstraimovyye/belyye.webp"], specs: [] },
            { id: "chrome-gx53", name: "Хром GX53", price: "350 ₽", images: ["/images/zamer/svetilniki/vstraimovyye/khrom.webp"], specs: [] },
            { id: "chrome-satin-gx53", name: "Хром сатин GX53", price: "350 ₽", images: ["/images/zamer/svetilniki/vstraimovyye/khrom-satin.webp"], specs: [] },
            { id: "black-matte-gx53", name: "Черный мат GX53", price: "350 ₽", images: ["/images/zamer/svetilniki/vstraimovyye/chernyy-mat.webp"], specs: [] },
            { id: "black-chrome-gx53", name: "Черный хром GX53", price: "350 ₽", images: ["/images/zamer/svetilniki/vstraimovyye/chernyy-khrom.webp"], specs: [] },
            { id: "gold-gx53", name: "Золото GX53", price: "350 ₽", images: ["/images/zamer/svetilniki/vstraimovyye/zoloto.webp"], specs: [] },
            { id: "gold-pearl-gx53", name: "Золото жемчуг GX53", price: "350 ₽", images: ["/images/zamer/svetilniki/vstraimovyye/zoloto-mat.webp"], specs: [] }
          ]
        },
        {
          id: "surface",
          title: "Накладные",
          items: [
            { id: "art-glass-b", name: "Art Glass GX53", price: "870 ₽", images: ["/images/zamer/svetilniki/nakladnyye/art_glass_b.webp"], specs: [] },
            { id: "art-glass-ch", name: "Art Glass GX53", price: "870 ₽", images: ["/images/zamer/svetilniki/nakladnyye/art_glass_ch.webp"], specs: [] },
            { id: "art-shot-b", name: "Art Shot GX53", price: "850 ₽", images: ["/images/zamer/svetilniki/nakladnyye/art_shot_b.webp"], specs: [] },
            { id: "art-shot-ch", name: "Art Shot GX53", price: "850 ₽", images: ["/images/zamer/svetilniki/nakladnyye/art_shot_ch.webp"], specs: [] },
            { id: "art-smart-b", name: "Art Smart GX53", price: "830 ₽", images: ["/images/zamer/svetilniki/nakladnyye/art_smart_b.webp"], specs: [] },
            { id: "art-smart-ch", name: "Art Smart GX53", price: "830 ₽", images: ["/images/zamer/svetilniki/nakladnyye/art_smart_ch.webp"], specs: [] },
            { id: "datts-2110-b", name: "2110 GX53", price: "790 ₽", images: ["/images/zamer/svetilniki/nakladnyye/datts_2110_b.webp"], specs: [] },
            { id: "datts-2110-ch", name: "2110 GX53", price: "790 ₽", images: ["/images/zamer/svetilniki/nakladnyye/datts_2110_ch.webp"], specs: [] },
            { id: "era-ol12-b", name: "OL12 GX53", price: "1 080 ₽", images: ["/images/zamer/svetilniki/nakladnyye/era_ol12_b.webp"], specs: [] },
            { id: "era-ol12-ch", name: "OL12 GX53", price: "1 080 ₽", images: ["/images/zamer/svetilniki/nakladnyye/era_ol12_ch.webp"], specs: [] },
            { id: "era-ol9-b", name: "OL9 GX53", price: "890 ₽", images: ["/images/zamer/svetilniki/nakladnyye/era_ol9_b.webp"], specs: [] },
            { id: "era-ol9-ch", name: "OL9 GX53", price: "890", images: ["/images/zamer/svetilniki/nakladnyye/era_ol9_ch.webp"], specs: [] }
          ]
        }
      ]
    },
    {
      id: "insert",
      title: "Вставка",
      groups: [
        {
          id: "white",
          title: "Белая",
          items: [
            { id: "insert-white", name: "Белая", images: ["/images/zamer/vstavka/vstavka_b.webp","/images/zamer/vstavka/vstavka_b2.webp"], specs: [] }
          ]
        },
        {
          id: "black",
          title: "Черная",
          items: [
            { id: "insert-black", name: "Черная", images: ["/images/zamer/vstavka/vstavka_ch3.webp","/images/zamer/vstavka/vstavka_ch2.webp","/images/zamer/vstavka/vstavka_ch4.webp","/images/zamer/vstavka/vstavka_ch5.webp"], specs: [] }
          ]
        }
      ]
    },
    {
      id: "curtains",
      title: "Карнизы",
      groups: [
        { id: "overhead", title: "Накладные", items: [ { id:"nakladnoy", name:"Накладные", images:["/images/zamer/gardin/nakladnoy.webp","/images/zamer/gardin/nakladnoy_p.webp"], specs:[] } ] },
        { id: "bp-40", title: "БП-40", items: [ { id:"bp-40", name:"БП-40", images:["/images/zamer/gardin/bp_40.webp","/images/zamer/gardin/bp_40_p.webp","/images/zamer/gardin/bp_40_p1.webp"], specs:[] } ] },
        { id: "sigma", title: "Sigma", items: [ { id:"sigma", name:"Sigma", images:["/images/zamer/gardin/sigma.webp","/images/zamer/gardin/sigma_p.webp","/images/zamer/gardin/sigma_p2.webp","/images/zamer/gardin/sigma_p3.webp"], specs:[] } ] },
        { id: "pk-15", title: "ПК-15", items: [ { id:"pk-15", name:"ПК-15", images:["/images/zamer/gardin/pk15.webp","/images/zamer/gardin/pk15_p.webp","/images/zamer/gardin/pk15_p2.webp","/images/zamer/gardin/pk15_p3.webp"], specs:[] } ] },
        { id: "pk-14", title: "ПК-14", items: [ { id:"pk-14", name:"ПК-14", images:["/images/zamer/gardin/pk14.webp","/images/zamer/gardin/pk14_p.webp","/images/zamer/gardin/pk14_p1.webp","/images/zamer/gardin/pk14_p2.webp","/images/zamer/gardin/pk14_p3.webp"], specs:[] } ] },
        { id: "gardina2-02", title: "GARDINA2 02", items: [ { id:"gardina2-02", name:"GARDINA2 02", images:["/images/zamer/gardin/gardina2.webp","/images/zamer/gardin/gardina2_02_p.webp","/images/zamer/gardin/gardina2_02_p2.webp"], specs:[] } ] },
        { id: "gardina3-03", title: "GARDINA3 03", items: [ { id:"gardina3-03", name:"GARDINA3 03", images:["/images/zamer/gardin/gardina3_03.webp","/images/zamer/gardin/gardina3_03_p.webp"], specs:[] } ] },
        { id: "gardina2-05", title: "GARDINA2 05", items: [ { id:"gardina2-05", name:"GARDINA2 05", images:["/images/zamer/gardin/gardina2_05.webp","/images/zamer/gardin/gardina2_05_p.webp","/images/zamer/gardin/gardina2_05_p2.webp","/images/zamer/gardin/gardina2_05_p3.webp","/images/zamer/gardin/gardina2_05_p4.webp"], specs:[] } ] },
        { id: "shtorka-01", title: "SHTORKA 01", items: [ { id:"shtorka-01", name:"SHTORKA 01", images:["/images/zamer/gardin/shtorka_01.webp","/images/zamer/gardin/shtorka_01_p.webp","/images/zamer/gardin/shtorka_01_p2.webp","/images/zamer/gardin/shtorka_01_p3.webp"], specs:[] } ] },
        { id: "am-1", title: "AM-1", items: [ { id:"am-1", name:"AM-1", images:["/images/zamer/gardin/am_1.webp","/images/zamer/gardin/am_1_p.webp","/images/zamer/gardin/am_1_p2.webp","/images/zamer/gardin/am_1_p3.webp"], specs:[] } ] }
      ]
    },
    {
      id: "light-lines",
      title: "Световые линии",
      groups: [
        { id:"line-15", title:"Flexy LINE 15", items:[ { id:"line-15", name:"Flexy LINE 15", images:["/images/zamer/linii/line_15.webp","/images/zamer/linii/15.webp","/images/zamer/linii/15_1.webp","/images/zamer/linii/15_2.webp","/images/zamer/linii/15_3.webp"], specs:[] } ] },
        { id:"line-30", title:"Flexy LINE 30", items:[ { id:"line-30", name:"Flexy LINE 30", images:["/images/zamer/linii/line_30.webp","/images/zamer/linii/30.webp","/images/zamer/linii/30_1.webp","/images/zamer/linii/30_2.webp","/images/zamer/linii/30_3.webp","/images/zamer/linii/30_4.webp"], specs:[] } ] },
        { id:"line-50", title:"Flexy LINE 50", items:[ { id:"line-50", name:"Flexy LINE 50", images:["/images/zamer/linii/line_50.webp","/images/zamer/linii/50.webp","/images/zamer/linii/50_1.webp","/images/zamer/linii/50_2.webp","/images/zamer/linii/50_3.webp","/images/zamer/linii/50_4.webp"], specs:[] } ] },
        { id:"diffuser", title:"Светорассеивающий экран", items:[
          { id:"diffuser-white", name:"Белый", images:["/images/zamer/linii/bel.webp","/images/zamer/linii/bel_vkl.webp"], specs:[] },
          { id:"diffuser-black", name:"Черный", images:["/images/zamer/linii/cher.webp","/images/zamer/linii/cher_.webp","/images/zamer/linii/cher_vkl.webp"], specs:[] }
        ] }
      ]
    },
    {
      id: "tracks",
      title: "Трековые системы",
      groups: [
        { id:"surface", title:"Накладной", items:[ { id:"track-surface", name:"Накладной", images:["/images/zamer/treki/trek_nakl_1.webp","/images/zamer/treki/trek_nakl_2.webp","/images/zamer/treki/trek_nakl_3.webp","/images/zamer/treki/trek_nakl_4.webp","/images/zamer/treki/trek_nakl_5.webp","/images/zamer/treki/trek_nakl_6.webp","/images/zamer/treki/trek_nakl_7.webp","/images/zamer/treki/trek_nakl_8.webp","/images/zamer/treki/trek_nakl_9.webp","/images/zamer/treki/trek_nakl_10.webp"], specs:[] } ] },
        { id:"recessed", title:"Встраиваемые", items:[ { id:"track-recessed", name:"Встраиваемые", images:["/images/zamer/treki/trek_vstr.webp","/images/zamer/treki/trek_vstr_1.webp","/images/zamer/treki/trek_vstr_2.webp","/images/zamer/treki/trek_vstr_3.webp","/images/zamer/treki/trek_vstr_4.webp","/images/zamer/treki/trek_vstr_5.webp","/images/zamer/treki/trek_vstr_6.webp","/images/zamer/treki/trek_vstr_7.webp","/images/zamer/treki/trek_vstr_8.webp","/images/zamer/treki/trek_vstr_9.webp","/images/zamer/treki/trek_vstr_10.webp"], specs:[] } ] },
        { id:"magnetic", title:"Магнитные", items:[ { id:"track-magnetic", name:"Магнитные", images:["/images/zamer/treki/trek_mag.webp","/images/zamer/treki/trek_mag_1.webp","/images/zamer/treki/trek_mag_2.webp","/images/zamer/treki/trek_mag_3.webp","/images/zamer/treki/trek_mag_4.webp","/images/zamer/treki/trek_mag_5.webp","/images/zamer/treki/trek_mag_6.webp"], specs:[] } ] }
      ]
    },
    {
      id: "wardrobes",
      title: "Шкафы купе",
      groups: [
        { id:"overlay", title:"Накладной", items:[ { id:"wardrobe-overlay", name:"Накладной", images:["/images/zamer/shkaf/nakl.webp"], specs:[] } ] },
        { id:"recessed", title:"Утопленный", items:[ { id:"wardrobe-recessed", name:"Утопленный", images:["/images/zamer/shkaf/utop.webp"], specs:[] } ] },
        { id:"false-panel", title:"Фальш-панель", items:[ { id:"wardrobe-false", name:"Фальш-панель", images:["/images/zamer/shkaf/falh.webp"], specs:[] } ] },
        { id:"profile", title:"Профиль", items:[ { id:"wardrobe-profile", name:"Профиль", images:["/images/zamer/shkaf/prof__.webp","/images/zamer/shkaf/prof.webp"], specs:[] } ] }
      ]
    }
  ];

  const elRoot = document.getElementById("snSamples");
  if (!elRoot) {
    console.warn("snSamples root not found");
  } else {

  // ========= HELPERS =========
  const $ = (sel, root = elRoot) => (root || document).querySelector(sel);
  const $$ = (sel, root = elRoot) => Array.from((root || document).querySelectorAll(sel));

  function safeText(v){ return (v ?? "").toString(); }

  function parseSpecsToKV(specs){
    const out = {};
    (specs || []).forEach(line => {
      const s = safeText(line).trim();
      if (!s) return;
      const idx = s.indexOf(":");
      if (idx === -1){
        const k = s;
        out[k] = out[k] ? (out[k] + "; " + s) : s;
        return;
      }
      const k = s.slice(0, idx).trim();
      const v = s.slice(idx + 1).trim();
      if (!k) return;
      out[k] = out[k] ? (out[k] + "; " + v) : v;
    });
    return out;
  }

  function normalize(v){
    return safeText(v).replace(/\s+/g," ").trim().toLowerCase();
  }

  async function copyToClipboard(text){
    const value = safeText(text).trim();
    if (!value) return false;
    try{
      await navigator.clipboard.writeText(value);
      return true;
    }catch(e){
      try{
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        return true;
      }catch(e2){
        return false;
      }
    }
  }

  // ========= INDEX =========
  const sectionById = new Map();
  const itemIndex = new Map(); // itemId -> meta

  catalogData.forEach(section => {
    sectionById.set(section.id, section);
    section.groups.forEach(group => {
      group.items.forEach(item => {
        itemIndex.set(item.id, {
          item,
          sectionId: section.id,
          sectionTitle: section.title,
          groupId: group.id,
          groupTitle: group.title
        });
      });
    });
  });

  // ========= STATE =========
  const STORE = {
    section: "sn-samples-section",
    groups: "sn-samples-groups",
    demo: "sn-samples-demo",
    compare: "sn-samples-compare",
    onlyDiff: "sn-samples-compare-onlydiff"
  };

  const elTabs = $("[data-tabs]");
  const elGroups = $("[data-groups]");
  const elContent = $("[data-content]");
  const elSearch = $("[data-search]");
  const elMeta = $("[data-meta]");

  const elDemoToggle = $("[data-demo-toggle]");
  const elCompareOpen = $("[data-compare-open]");

  const elModal = $("[data-modal]");
  const elModalTitle = $("[data-modal-title]");
  const elModalPrice = $("[data-modal-price]");
  const elModalSpecs = $("[data-modal-specs]");
  const elModalEmpty = $("[data-modal-empty]");
  const elModalClose = elModal ? $("[data-modal-close]", elModal) : null;
  const elModalCopy = $("[data-modal-copy]");
  const elModalCompareToggle = $("[data-modal-compare-toggle]");
  const elItemPrev = $("[data-item-prev]");
  const elItemNext = $("[data-item-next]");

  const elSlider = $("[data-slider]");
  const elSlideImg = $("[data-slide-img]");
  const elSlidePrev = $("[data-slide-prev]");
  const elSlideNext = $("[data-slide-next]");
  const elDots = $("[data-dots]");

  const elCompare = $("[data-compare]");
  const elCompareClose = $("[data-compare-close]");
  const elCompareClear = $("[data-compare-clear]");
  const elPicked = $("[data-picked]");
  const elOnlyDiff = $("[data-only-diff]");
  const elCompareTable = $("[data-compare-table]");

  let state = {
    sectionId: localStorage.getItem(STORE.section) || catalogData[0]?.id || "manufacturers",
    groupBySection: {},
    demo: localStorage.getItem(STORE.demo) === "1",
    compareIds: [],
    onlyDiff: localStorage.getItem(STORE.onlyDiff) === "1",
    query: ""
  };

  try{
    state.groupBySection = JSON.parse(localStorage.getItem(STORE.groups) || "{}") || {};
  }catch(e){
    state.groupBySection = {};
  }

  try{
    const raw = JSON.parse(localStorage.getItem(STORE.compare) || "[]");
    state.compareIds = Array.isArray(raw) ? raw.filter(id => itemIndex.has(id)) : [];
  }catch(e){
    state.compareIds = [];
  }

  elOnlyDiff.checked = state.onlyDiff;

  let scrollLockCount = 0;
  function lockScroll(){
    scrollLockCount += 1;
    if (scrollLockCount === 1){
      document.body.classList.add("sn-no-scroll");
    }
  }

  function unlockScroll(){
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0){
      document.body.classList.remove("sn-no-scroll");
    }
  }

  // ========= LAZY IMG =========
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      const src = img.getAttribute("data-src");
      if (src){
        img.src = src;
        img.removeAttribute("data-src");
      }
      io.unobserve(img);
    });
  }, { rootMargin: "140px" });

  // ========= RENDER =========
  function setDemo(on){
    state.demo = !!on;
    localStorage.setItem(STORE.demo, state.demo ? "1" : "0");
    elRoot.classList.toggle("sn-demo", state.demo);
  }

  function setSection(sectionId){
    state.sectionId = sectionId;
    localStorage.setItem(STORE.section, sectionId);
    render();
  }

  function setGroup(sectionId, groupId){
    state.groupBySection[sectionId] = groupId;
    localStorage.setItem(STORE.groups, JSON.stringify(state.groupBySection));
    render();
  }

  function inManufacturersView(){
    return state.sectionId === "manufacturers" && !state.query;
  }

  function buildTabs(){
    elTabs.innerHTML = "";
    catalogData.forEach(section => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "sn-chip";
      b.setAttribute("role","tab");
      b.setAttribute("aria-pressed", section.id === state.sectionId ? "true" : "false");
      b.textContent = section.title;
      b.addEventListener("click", () => setSection(section.id));
      elTabs.appendChild(b);
    });
  }

  function buildGroups(section){
    elGroups.innerHTML = "";

    const showGroups = section.groups.length > 1 && !state.query;
    if (!showGroups){
      const hint = document.createElement("div");
      hint.className = "sn-metaLine";
      hint.textContent = state.query ? "Показаны результаты поиска по всем разделам" : "Выберите раздел вверху";
      elGroups.appendChild(hint);
      return;
    }

    const stored = state.groupBySection[section.id] || section.groups[0].id;
    section.groups.forEach(group => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "sn-chip";
      b.setAttribute("aria-pressed", stored === group.id ? "true" : "false");
      b.textContent = group.title;
      b.addEventListener("click", () => setGroup(section.id, group.id));
      elGroups.appendChild(b);
    });
  }

  function cardMetaText(item){
    if (item.specs && item.specs.length) return item.specs[0];
    if (item.price) return "Цена указана";
    return " ";
  }

  function createCard(meta){
    const { item, sectionId, groupTitle, sectionTitle } = meta;

    const card = document.createElement("article");
    card.className = "sn-card";
    card.setAttribute("tabindex","0");
    card.setAttribute("role","button");
    card.setAttribute("aria-label", item.name);
    card.dataset.itemId = item.id;

    const inner = document.createElement("div");
    inner.className = "sn-cardInner";

    const media = document.createElement("div");
    media.className = "sn-cardMedia";

    const img = document.createElement("img");
    img.alt = item.name;
    img.setAttribute("loading","lazy");
    img.setAttribute("data-src", item.images?.[0] || "");
    media.appendChild(img);

    const quick = document.createElement("div");
    quick.className = "sn-cardQuick";

    if (groupTitle && groupTitle !== "Все"){
      const tag = document.createElement("div");
      tag.className = "sn-miniTag";
      tag.title = sectionTitle + ", " + groupTitle;
      tag.textContent = groupTitle;
      quick.appendChild(tag);
    } else {
      const spacer = document.createElement("div");
      spacer.style.flex = "1";
      quick.appendChild(spacer);
    }

    // Compare button only in manufacturers
    if (sectionId === "manufacturers"){
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sn-iconBtn";
      const isOn = state.compareIds.includes(item.id);
      btn.setAttribute("aria-pressed", isOn ? "true" : "false");
      btn.textContent = isOn ? "В сравнении" : "В сравнение";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleCompare(item.id);
      });
      quick.appendChild(btn);
    }

    media.appendChild(quick);

    const body = document.createElement("div");
    body.className = "sn-cardBody";

    const t = document.createElement("h3");
    t.className = "sn-cardTitle";
    t.textContent = item.name;

    const m = document.createElement("p");
    m.className = "sn-cardMeta";
    m.textContent = cardMetaText(item);

    body.appendChild(t);
    body.appendChild(m);

    if (item.price){
      const p = document.createElement("div");
      p.className = "sn-cardPrice";
      p.textContent = item.price;
      body.appendChild(p);
    }

    inner.appendChild(media);
    inner.appendChild(body);
    card.appendChild(inner);

    card.addEventListener("click", () => openModal(item.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " "){
        e.preventDefault();
        openModal(item.id);
      }
    });

    io.observe(img);
    return card;
  }

  function getVisibleItemIds(){
    return $$("[data-item-id]", elContent).map(el => el.dataset.itemId).filter(Boolean);
  }

  function renderSection(section, query){
    const wrap = document.createElement("section");

    const h = document.createElement("h2");
    h.className = "sn-sectionTitle";
    h.textContent = section.title;
    wrap.appendChild(h);

    const grid = document.createElement("div");
    grid.className = "sn-grid";

    let count = 0;
    const groupFilter = query ? null : (state.groupBySection[section.id] || section.groups[0]?.id);

    section.groups.forEach(group => {
      if (groupFilter && group.id !== groupFilter) return;
      group.items.forEach(item => {
        if (!query || item.name.toLowerCase().includes(query)){
          const meta = itemIndex.get(item.id);
          const card = createCard(meta);
          card.dataset.itemId = item.id;
          grid.appendChild(card);
          count++;
        }
      });
    });

    if (!count){
      const empty = document.createElement("div");
      empty.className = "sn-empty";
      empty.textContent = "Ничего не найдено в этом разделе.";
      wrap.appendChild(empty);
    } else {
      wrap.appendChild(grid);
    }

    return { node: wrap, count };
  }

  function render(){
    setDemo(state.demo);
    buildTabs();

    elContent.innerHTML = "";
    const q = safeText(elSearch.value).trim().toLowerCase();
    state.query = q;

    // Compare button in header only for manufacturers and when something selected
    updateCompareHeaderButton();

    if (q){
      let total = 0;
      catalogData.forEach(section => {
        const { node, count } = renderSection(section, q);
        total += count;
        elContent.appendChild(node);
      });
      elMeta.textContent = total ? ("Найдено: " + total) : "Ничего не найдено";
      elGroups.innerHTML = "";
      const hint = document.createElement("div");
      hint.className = "sn-metaLine";
      hint.textContent = "Поиск по всем разделам";
      elGroups.appendChild(hint);
      return;
    }

    const section = sectionById.get(state.sectionId) || catalogData[0];
    state.sectionId = section.id;
    localStorage.setItem(STORE.section, state.sectionId);

    buildGroups(section);

    const { node, count } = renderSection(section, "");
    elContent.appendChild(node);

    elMeta.textContent = "Позиции: " + count;
  }

  // ========= COMPARE =========
  function updateCompareHeaderButton(){
    const canShow = inManufacturersView() || state.compareIds.length > 0;
    elCompareOpen.hidden = !canShow;
    elCompareOpen.textContent = "Сравнение (" + state.compareIds.length + ")";
  }

  function toggleCompare(itemId){
    if (!itemIndex.has(itemId)) return;
    const meta = itemIndex.get(itemId);
    if (meta.sectionId !== "manufacturers") return;

    const i = state.compareIds.indexOf(itemId);
    if (i >= 0){
      state.compareIds.splice(i, 1);
    } else {
      // ограничим разумно до 4
      if (state.compareIds.length >= 4){
        state.compareIds.shift();
      }
      state.compareIds.push(itemId);
    }
    localStorage.setItem(STORE.compare, JSON.stringify(state.compareIds));
    updateCompareHeaderButton();
    render(); // обновит состояния кнопок на карточках

    if (!elCompare.hidden){
      renderCompare();
    }
  }

  function openCompare(){
    if (!elCompare.hidden) return;
    renderCompare();
    lockScroll();
    elCompare.hidden = false;
  }

  function closeCompare(){
    if (elCompare.hidden) return;
    elCompare.hidden = true;
    unlockScroll();
  }

  function clearCompare(){
    state.compareIds = [];
    localStorage.setItem(STORE.compare, JSON.stringify(state.compareIds));
    updateCompareHeaderButton();
    render();
    renderCompare();
  }

  function renderCompare(){
    // chips
    elPicked.innerHTML = "";
    if (!state.compareIds.length){
      const empty = document.createElement("div");
      empty.className = "sn-empty";
      empty.textContent = "Ничего не выбрано. Нажмите 'В сравнение' на карточках производителей пленки.";
      elPicked.appendChild(empty);

      elCompareTable.innerHTML = "";
      const tr = document.createElement("tr");
      tr.innerHTML = "<th>Параметр</th><th>Значение</th>";
      elCompareTable.appendChild(tr);
      return;
    }

    const metas = state.compareIds.map(id => itemIndex.get(id)).filter(Boolean);

    metas.forEach(m => {
      const pill = document.createElement("div");
      pill.className = "sn-pill";
      pill.textContent = m.item.name;

      const x = document.createElement("button");
      x.type = "button";
      x.setAttribute("aria-label","Убрать из сравнения");
      x.textContent = "×";
      x.addEventListener("click", () => toggleCompare(m.item.id));
      pill.appendChild(x);

      elPicked.appendChild(pill);
    });

    // table
    const specMaps = metas.map(m => parseSpecsToKV(m.item.specs || []));
    const keys = new Set();
    specMaps.forEach(map => Object.keys(map).forEach(k => keys.add(k)));
    const keyList = Array.from(keys);

    // prefer typical order
    const preferred = ["Фактура","Производитель","Страна бренда","Толщина","Ширина","Белизна","Матовость","Зеркальность","Плотность","Прочность","Прочность на разрыв","Пожарная безопасность","Сертификаты","Сертификат","Гарантия"];
    keyList.sort((a,b) => {
      const ia = preferred.indexOf(a);
      const ib = preferred.indexOf(b);
      if (ia !== -1 || ib !== -1){
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
      }
      return a.localeCompare(b, "ru");
    });

    const onlyDiff = !!state.onlyDiff;

    elCompareTable.innerHTML = "";

    const head = document.createElement("tr");
    head.appendChild(Object.assign(document.createElement("th"), { textContent: "Параметр" }));
    metas.forEach(m => {
      const th = document.createElement("th");
      th.textContent = m.item.name;
      head.appendChild(th);
    });
    elCompareTable.appendChild(head);

    keyList.forEach(k => {
      const vals = specMaps.map(m => m[k] || " ");
      const norm = vals.map(v => normalize(v));
      const allSame = norm.every(v => v === norm[0]);

      if (onlyDiff && allSame) return;

      const tr = document.createElement("tr");
      const tdK = document.createElement("td");
      tdK.textContent = k;
      tr.appendChild(tdK);

      vals.forEach(v => {
        const td = document.createElement("td");
        td.textContent = v;
        tr.appendChild(td);
      });

      // подсветка строк, где реально есть различия
      if (!allSame){
        tr.classList.add("sn-diff");
      }
      elCompareTable.appendChild(tr);
    });
  }

  // ========= MODAL =========
  let modalState = {
    itemId: null,
    slideIndex: 0,
    slides: [],
    visibleItemIds: []
  };

  let lastFocusEl = null;

  function openModal(itemId){
    if (!itemIndex.has(itemId)) return;

    modalState.itemId = itemId;
    modalState.visibleItemIds = getVisibleItemIds();

    const meta = itemIndex.get(itemId);
    const item = meta.item;

    elModalTitle.textContent = item.name;

    // price
    if (item.price){
      elModalPrice.hidden = false;
      elModalPrice.textContent = item.price;
    } else {
      elModalPrice.hidden = true;
      elModalPrice.textContent = "";
    }

    // copy only for lighting
    const isLighting = meta.sectionId === "lighting";
    elModalCopy.hidden = !isLighting;
    elModalCopy.textContent = "Скопировать";

    // compare toggle only for manufacturers
    const isManufacturers = meta.sectionId === "manufacturers";
    elModalCompareToggle.hidden = !isManufacturers;
    if (isManufacturers){
      const on = state.compareIds.includes(item.id);
      elModalCompareToggle.textContent = on ? "Убрать из сравнения" : "В сравнение";
    }

    // specs
    elModalSpecs.innerHTML = "";
    const kv = parseSpecsToKV(item.specs || []);
    const keys = Object.keys(kv);
    if (!keys.length){
      elModalEmpty.hidden = false;
    } else {
      elModalEmpty.hidden = true;
      keys.forEach(k => {
        const row = document.createElement("div");
        row.className = "sn-specRow";

        const dt = document.createElement("div");
        dt.className = "sn-k";
        dt.textContent = k;

        const dd = document.createElement("div");
        dd.className = "sn-v";
        dd.textContent = kv[k];

        row.appendChild(dt);
        row.appendChild(dd);
        elModalSpecs.appendChild(row);
      });
    }

    // slides
    modalState.slides = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
    if (!modalState.slides.length) modalState.slides = [""];

    modalState.slideIndex = 0;
    renderSlider();

    // prev/next item buttons
    const idx = modalState.visibleItemIds.indexOf(itemId);
    elItemPrev.disabled = idx <= 0;
    elItemNext.disabled = idx === -1 || idx >= modalState.visibleItemIds.length - 1;

    lastFocusEl = document.activeElement;

    lockScroll();
    elModal.hidden = false;
    if (elModalClose){
      elModalClose.focus();
    }
  }

  function closeModal(){
    elModal.hidden = true;
    unlockScroll();
    modalState.itemId = null;
    modalState.slides = [];
    modalState.slideIndex = 0;
    if (lastFocusEl && typeof lastFocusEl.focus === "function"){
      lastFocusEl.focus();
    }
  }

  function renderSlider(){
    const meta = itemIndex.get(modalState.itemId);
    const item = meta.item;

    const src = modalState.slides[modalState.slideIndex] || "";
    elSlideImg.src = src;
    elSlideImg.alt = item.name + ", фото " + (modalState.slideIndex + 1);

    elDots.innerHTML = "";
    modalState.slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.type = "button";
      d.className = "sn-dot";
      d.setAttribute("aria-pressed", i === modalState.slideIndex ? "true" : "false");
      d.setAttribute("aria-label", "Перейти к фото " + (i + 1));
      d.addEventListener("click", () => { modalState.slideIndex = i; renderSlider(); });
      elDots.appendChild(d);
    });

    elSlidePrev.disabled = modalState.slides.length <= 1;
    elSlideNext.disabled = modalState.slides.length <= 1;
  }

  function slideBy(delta){
    if (!modalState.slides.length) return;
    const n = modalState.slides.length;
    modalState.slideIndex = (modalState.slideIndex + delta + n) % n;
    renderSlider();
  }

  function openNeighborItem(delta){
    const ids = modalState.visibleItemIds || [];
    const i = ids.indexOf(modalState.itemId);
    if (i === -1) return;
    const next = ids[i + delta];
    if (!next) return;
    openModal(next);
  }

  // focus trap in modal
  function trapFocus(e){
    if (elModal.hidden) return;
    if (e.key !== "Tab") return;

    const focusables = $$("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])", elModal)
      .filter(el => !el.disabled && el.offsetParent !== null);

    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first){
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last){
      e.preventDefault();
      first.focus();
    }
  }

  // swipe for slider
  let swipe = { active:false, x0:0, y0:0, t0:0 };
  function onPointerDown(e){
    swipe.active = true;
    swipe.x0 = e.clientX;
    swipe.y0 = e.clientY;
    swipe.t0 = Date.now();
  }
  function onPointerUp(e){
    if (!swipe.active) return;
    swipe.active = false;

    const dx = e.clientX - swipe.x0;
    const dy = e.clientY - swipe.y0;
    const dt = Date.now() - swipe.t0;

    // горизонтальный свайп
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) && dt < 700){
      slideBy(dx < 0 ? 1 : -1);
    }
  }

  // ========= EVENTS =========
  elSearch.addEventListener("input", () => render());

  elDemoToggle.addEventListener("click", () => {
    setDemo(!state.demo);
    render();
  });

  elCompareOpen.addEventListener("click", () => openCompare());
  elCompareClose.addEventListener("click", () => closeCompare());
  elCompareClear.addEventListener("click", () => clearCompare());

  elOnlyDiff.addEventListener("change", () => {
    state.onlyDiff = elOnlyDiff.checked;
    localStorage.setItem(STORE.onlyDiff, state.onlyDiff ? "1" : "0");
    renderCompare();
  });

  if (elModalClose){
    elModalClose.addEventListener("click", closeModal);
  }

  elModal.addEventListener("click", (e) => {
    if (e.target === elModal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (!elModal.hidden){
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") slideBy(-1);
      if (e.key === "ArrowRight") slideBy(1);
      if (e.key === "PageUp") openNeighborItem(-1);
      if (e.key === "PageDown") openNeighborItem(1);
      trapFocus(e);
      return;
    }
    if (!elCompare.hidden){
      if (e.key === "Escape") closeCompare();
      return;
    }
  }, true);

  elSlidePrev.addEventListener("click", () => slideBy(-1));
  elSlideNext.addEventListener("click", () => slideBy(1));

  elSlider.addEventListener("pointerdown", onPointerDown, { passive:true });
  elSlider.addEventListener("pointerup", onPointerUp, { passive:true });
  elSlider.addEventListener("pointercancel", () => { swipe.active = false; }, { passive:true });

  elItemPrev.addEventListener("click", () => openNeighborItem(-1));
  elItemNext.addEventListener("click", () => openNeighborItem(1));

  elModalCopy.addEventListener("click", async () => {
    if (!modalState.itemId) return;
    const meta = itemIndex.get(modalState.itemId);
    if (meta.sectionId !== "lighting") return;

    const item = meta.item;
    const text = item.price ? (item.name + " - " + item.price) : item.name;
    const ok = await copyToClipboard(text);

    elModalCopy.textContent = ok ? "Скопировано" : "Не удалось";
    setTimeout(() => { elModalCopy.textContent = "Скопировать"; }, 1200);
  });

  elModalCompareToggle.addEventListener("click", () => {
    if (!modalState.itemId) return;
    const meta = itemIndex.get(modalState.itemId);
    if (meta.sectionId !== "manufacturers") return;
    toggleCompare(meta.item.id);
    const on = state.compareIds.includes(meta.item.id);
    elModalCompareToggle.textContent = on ? "Убрать из сравнения" : "В сравнение";
  });

  // Close compare on background click if needed (desktop friendly)
  document.addEventListener("click", (e) => {
    if (elCompare.hidden) return;
    const inside = elCompare.contains(e.target) || elCompareOpen.contains(e.target);
    if (!inside && window.matchMedia("(min-width: 980px)").matches){
      // мягко закрываем по клику вне панели (на десктопе)
      closeCompare();
    }
  });

  // ========= INIT =========
  setDemo(state.demo);
  updateCompareHeaderButton();
  render();
  }
