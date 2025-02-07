import axios from "axios";
const sampleData = [
  {
      "website": "1mg",
      "products": [
          {
              "name": "Perfectil Skin, Hair, Nail Supplement with Biotin, Vitamin C & Micronutrients | Gluten-Free Tablet",
              "price": "₹580",
              "link": "https://www.1mg.com/otc/perfectil-skin-hair-nail-supplement-with-biotin-vitamin-c-micronutrients-gluten-free-tablet-otc171833",
              "image": "https://onemg.gumlet.io/l_watermark_346,w_150,h_150/c_fit,h_150,w_150,q_auto,f_auto/f5285488d0704661a018588a4b626899.jpg"
          },
          {
              "name": "Zingavita Biotin Tablet with Zinc, Vitamin C & E | For Hair, Skin & Nail Health | Mineral & Vitamin Support",
              "price": "₹249",
              "link": "https://www.1mg.com/otc/zingavita-biotin-tablet-with-zinc-vitamin-c-e-for-hair-skin-nail-health-mineral-vitamin-support-otc682095",
              "image": "https://onemg.gumlet.io/l_watermark_346,w_150,h_150/c_fit,h_150,w_150,q_auto,f_auto/7ad291aa8c984920865b02953ba02d35.jpg"
          },
          {
              "name": "Amrolstar Nail Lacquer",
              "price": "₹511",
              "link": "https://www.1mg.com/drugs/amrolstar-nail-lacquer-556252",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/9cc3b962ba89493d8365aac541f0d310.jpg"
          },
          {
              "name": "Loceryl Nail Lacquer",
              "price": "₹814",
              "link": "https://www.1mg.com/drugs/loceryl-nail-lacquer-59431",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/e50dfbbcfb6d40718d12591ff1bccb14.jpg"
          },
          {
              "name": "Fungicros Nail Lacquer",
              "price": "₹635",
              "link": "https://www.1mg.com/drugs/fungicros-nail-lacquer-611737",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/f09281643add44679954ecbb5c08b5e8.jpg"
          },
          {
              "name": "SBL Ache-Nil Drop",
              "price": "₹110",
              "link": "https://www.1mg.com/otc/sbl-ache-nil-drop-otc357578",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/btjyr9o61nwkcvq7pd8f.jpg"
          },
          {
              "name": "Lichensa Ointment for Cracked Heels, Diaper/ Napkin Rash, Nail & Fungal Infection",
              "price": "₹120",
              "link": "https://www.1mg.com/otc/lichensa-ointment-for-cracked-heels-diaper-napkin-rash-nail-fungal-infection-otc308186",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/cropped/dq4aqdhpapyopomx7qwl.png"
          },
          {
              "name": "Nayl Ophthalmic Suspension BAK Free",
              "price": "₹207",
              "link": "https://www.1mg.com/drugs/nayl-ophthalmic-suspension-bak-free-870852",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/82a4befc8ee84f588d2888a424da0319.jpg"
          },
          {
              "name": "Vega Large Nail Cutter",
              "price": "₹96.6",
              "link": "https://www.1mg.com/otc/vega-large-nail-cutter-otc811811",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/ae99544330354d709042142214ce7cec.jpg"
          },
          {
              "name": "Inatur  Alcohol Free Nail Paint Remover Wipes",
              "price": "₹105",
              "link": "https://www.1mg.com/otc/inatur-alcohol-free-nail-paint-remover-wipes-otc942618",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/e78680d584f5438d8d7bc0d12a5e4c84.jpg"
          },
          {
              "name": "Bare Essentials Nail Polish Remover Pads",
              "price": "₹89.1",
              "link": "https://www.1mg.com/otc/bare-essentials-nail-polish-remover-pads-otc987308",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/80f1ec75569d4eeab7699998ee019448.jpg"
          },
          {
              "name": "Love Earth Nail Growth Serum",
              "price": "₹199",
              "link": "https://www.1mg.com/otc/love-earth-nail-growth-serum-otc893245",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/3581b4af6fd142e3b86a2d7be334772f.jpg"
          },
          {
              "name": "Carbamide Forte Biotin 10,000mcg Vitamin B7 Tablet for Skin, Hair & Nail Health",
              "price": "₹423",
              "link": "https://www.1mg.com/otc/carbamide-forte-biotin-10-000mcg-vitamin-b7-tablet-for-skin-hair-nail-health-otc606055",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/0ecbfb057a5c4a2b9c62ae8c22b88cb8.jpg"
          },
          {
              "name": "Power Gummies- Hair & Nail Vitamin with Zero Added Sugar & New Heart Shape",
              "price": "₹2231",
              "link": "https://www.1mg.com/otc/power-gummies-hair-nail-vitamin-with-zero-added-sugar-new-heart-shape-otc628235",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/87761c9a93604ea4a778884faaa65713.jpg"
          },
          {
              "name": "St. George’s Fung Q Nil Ointment",
              "price": "₹97",
              "link": "https://www.1mg.com/otc/st.-george-s-fung-q-nil-ointment-otc529624",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/cropped/m2b2u5hrmxfproak220a.png"
          },
          {
              "name": "Bare Essentials Nail File-Long",
              "price": "₹99",
              "link": "https://www.1mg.com/otc/bare-essentials-nail-file-long-otc987306",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/8ddcb0a093c64084bb6d59778d317e1d.jpg"
          },
          {
              "name": "SB Sugar Nil",
              "price": "₹103",
              "link": "https://www.1mg.com/otc/sb-sugar-nil-otc852841",
              "image": "https://onemg.gumlet.io/c_fit,h_150,w_150,q_auto,f_auto/5c8643ce905c4f3e9597fbcedf6e8f3f.jpg"
          }
      ]
  },
  {
      "website": "netmeds",
      "products": [
          {
              "name": "S Numlo 2.5mg Tablet 15'S",
              "price": "₹100.20",
              "image": "https://www.netmeds.com/images/product-v1/150x150/840650/s_numlo_2_5mg_tablet_15s_0_2.jpg",
              "link": "https://www.netmeds.com/prescriptions/s-numlo-2-5mg-tablet-15-s"
          },
          {
              "name": "S Numlo 5mg Tablet 15'S",
              "price": "₹164.00",
              "image": "https://www.netmeds.com/images/product-v1/150x150/845479/s_numlo_5mg_tablet_15_s_0.jpg",
              "link": "https://www.netmeds.com/prescriptions/s-numlo-5mg-tablet-15-s"
          },
          {
              "name": "Nulong Trio 20mg Tablet 10'S",
              "price": "₹169.00",
              "image": "https://www.netmeds.com/images/product-v1/150x150/801279/nulong_trio_20mg_tablet_10s_56346_0_1.jpg",
              "link": "https://www.netmeds.com/prescriptions/nulong-trio-20mg-tablet-10-s"
          },
          {
              "name": "Numlo AT Tablet 15'S",
              "price": "₹203.68",
              "image": "https://www.netmeds.com/images/product-v1/150x150/840522/numlo_at_tablet_15_s_0.jpg",
              "link": "https://www.netmeds.com/prescriptions/numlo-at-tablet-15-s"
          },
          {
              "name": "Numlo TM 2.5mg Tablet 15'S",
              "price": "₹221.94",
              "image": "https://www.netmeds.com/images/product-v1/150x150/853972/numlo_tm_2_5mg_tablet_15s_0_0.jpg",
              "link": "https://www.netmeds.com/prescriptions/numlo-tm-2-5mg-tablet-15-s"
          },
          {
              "name": "Numlo D 2.5mg Tablet 15'S",
              "price": "₹147.31",
              "image": "https://www.netmeds.com/images/product-v1/150x150/851053/numlo_d_2_5mg_tablet_15s_0_0.jpg",
              "link": "https://www.netmeds.com/prescriptions/numlo-d-2-5mg-tablet-15-s"
          },
          {
              "name": "Nulong OL 20mg Tablet 10'S",
              "price": "₹168.00",
              "image": "https://www.netmeds.com/images/product-v1/150x150/379636/nulong_ol_20mg_tablet_10s_45446_0_1.jpg",
              "link": "https://www.netmeds.com/prescriptions/nulong-ol-20mg-tablet-10-s"
          },
          {
              "name": "Nuflucon Ear Drops 5ml",
              "price": "₹129.36",
              "image": "https://www.netmeds.com/images/product-v1/150x150/835813/nuflucon_ear_drops_5ml_398255_0_0.jpg",
              "link": "https://www.netmeds.com/prescriptions/nuflucon-ear-drops-5ml"
          },
          {
              "name": "Nulong OL 40mg Tablet 10'S",
              "price": "₹198.00",
              "image": "https://www.netmeds.com/images/product-v1/150x150/379635/nulong_ol_40mg_tablet_10s_0_1.jpg",
              "link": "https://www.netmeds.com/prescriptions/nulong-ol-40mg-tablet-10-s"
          },
          {
              "name": "Nuloc D 20/30mg Capsule 10'S",
              "price": "₹118.80",
              "image": "https://www.netmeds.com/images/product-v1/150x150/413317/nuloc_d_20_30mg_capsule_10s_322402_0_1.jpg",
              "link": "https://www.netmeds.com/prescriptions/nuloc-d-20-30mg-capsule-10-s"
          },
          {
              "name": "Nuflam TH Capsule 5'S",
              "price": "₹173.01",
              "image": "https://www.netmeds.com/images/product-v1/150x150/839627/nuflam_th_capsule_5s_0_0.jpg",
              "link": "https://www.netmeds.com/prescriptions/nuflam-th-capsule-5-s"
          },
          {
              "name": "NUMLO D 5mg Tablet 15's",
              "price": "₹196.02",
              "image": "https://www.netmeds.com/images/product-v1/150x150/884697/numlo_d_5mg_tablet_15s_0_0.jpg",
              "link": "https://www.netmeds.com/prescriptions/numlo-d-5mg-tablet-15-s"
          }
      ]
  },
  {
      "website": "PharmEasy",
      "products": [
          {
              "name": "Nulax Solution 100ml",
              "price": "118.82*",
              "link": "https://www.pharmeasy.in/online-medicine-order/nulax-solution-100ml-20875",
              "image": "https://cdn01.pharmeasy.in/dam/products/192687/nulax-solution-100ml-1-1726140629.jpg?dim=256x256&q=75"
          },
          {
              "name": "Nulax Solution 200ml",
              "price": "MRP 258.30*",
              "link": "https://www.pharmeasy.in/online-medicine-order/nulax-solution-200ml-226220",
              "image": "https://assets.pharmeasy.in/web-assets/_next/icons/syrup.svg?dim=256x256&q=75"
          },
          {
              "name": "Full 365 Suspension 200ml",
              "price": "176.46*",
              "link": "https://www.pharmeasy.in/online-medicine-order/full-365-suspension-200ml-30240",
              "image": "https://cdn01.pharmeasy.in/dam/products/274617/full-365-suspension-200ml-1-1641534106.jpg?dim=256x256&q=75"
          },
          {
              "name": "Pul Fingertip Pulse Oximeter",
              "price": "439.78",
              "link": "https://www.pharmeasy.in/health-care/products/pul-fingertip-pulse-oximeter-501120",
              "image": "https://cdn01.pharmeasy.in/dam/products_otc/T27314/pul-fingertip-pulse-oximeter-2-1641789118.jpg?dim=256x256&q=75"
          },
          {
              "name": "Lulilok Soap 50gm",
              "price": "142.41*",
              "link": "https://www.pharmeasy.in/online-medicine-order/lulilok-1-wrap-of-50gm-soap-2976283",
              "image": "https://cdn01.pharmeasy.in/dam/products/S03757/lulilok-1-wrap-of-50gm-soap-1-1658501526.jpg?dim=256x256&q=75"
          },
          {
              "name": "Luliz 1% Lotion 30ml",
              "price": "MRP 406.85*",
              "link": "https://www.pharmeasy.in/online-medicine-order/luliz-1-lotion-30ml-212516",
              "image": "https://assets.pharmeasy.in/web-assets/_next/icons/tube.svg?dim=256x256&q=75"
          },
          {
              "name": "Pulse Oximeter Device 1",
              "price": "2959.26",
              "link": "https://www.pharmeasy.in/health-care/products/pulse-oxymeter-device-1-3026418",
              "image": "https://cdn01.pharmeasy.in/dam/products_otc/Z08978/pulse-oximeter-device-1-2-1671741743.jpg?dim=256x256&q=75"
          },
          {
              "name": "Luliz 1% Tube Of 30gm Cream",
              "price": "273.15*",
              "link": "https://www.pharmeasy.in/online-medicine-order/luliz-cream-30gm-210132",
              "image": "https://cdn01.pharmeasy.in/dam/products/I35875/luliz-cream-30gm-1-1653982592.jpg?dim=256x256&q=75"
          }
      ]
  }
];
export async function search(query) {
  if(query==null){
    return sampleData;
  }
  try {
    const config = {
      method: "get",
      url: `${import.meta.env.VITE_SERVER_LINK}/price-comparator?q=${query}`,
    };
    console.log(config);
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
   
  }
}

