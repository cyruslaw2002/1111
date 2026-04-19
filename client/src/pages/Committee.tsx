// KYWC 3D班網 — 班會幹事頁面

import { Link } from "wouter";
import Layout from "@/components/Layout";

const COMMITTEE_MEMBERS = [
  { name: "許紫妮", role: "班長", desc: "負責班級管理與領導，協調各幹事工作", img: "https://cdn-icons-png.flaticon.com/512/4478/4478358.png", badge: "bg-primary text-white" },
  { name: "阮文謙", role: "班長", desc: "協助班長管理班級事務，代理班長職責", img: "https://cdn-icons-png.flaticon.com/512/4478/4478344.png", badge: "bg-primary text-white" },
  { name: "曾泯豪", role: "班長", desc: "負責班級日常管理，協助班主任工作", img: "https://cdn-icons-png.flaticon.com/512/4478/4478344.png", badge: "bg-primary text-white" },
  { name: "梁穎珈", role: "班會主席", desc: "主持班會會議，帶領班會推行各項活動", img: "https://cdn-icons-png.flaticon.com/512/4478/4478358.png", badge: "bg-secondary text-white" },
  { name: "羅卓熹", role: "班會康樂", desc: "策劃及組織班級康樂活動，增進同學感情", img: "https://cdn-icons-png.flaticon.com/512/4478/4478344.png", badge: "bg-blue-500 text-white" },
  { name: "敖塇苗", role: "班會文書", desc: "負責班會文件記錄、通知撰寫及存檔工作", img: "https://cdn-icons-png.flaticon.com/512/4478/4478358.png", badge: "bg-blue-500 text-white" },
  { name: "范琇瑜", role: "班會總務", desc: "管理班會資源分配，負責物資採購及保管", img: "https://cdn-icons-png.flaticon.com/512/4478/4478358.png", badge: "bg-blue-500 text-white" },
  { name: "鍾卓軒", role: "班會財政", desc: "負責班會財政管理，記錄收支及編制預算", img: "https://cdn-icons-png.flaticon.com/512/4478/4478344.png", badge: "bg-blue-500 text-white" },
  { name: "葉梓淇", role: "班會美術", desc: "負責班會視覺設計，製作宣傳海報及壁報", img: "https://cdn-icons-png.flaticon.com/512/4478/4478358.png", badge: "bg-blue-500 text-white" },
];

const RESPONSIBILITIES = [
  { icon: "fa-gavel", title: "班級管理", desc: "協助班主任維持班級秩序，處理日常班務" },
  { icon: "fa-calendar", title: "活動策劃", desc: "策劃及組織班級各類活動，豐富同學校園生活" },
  { icon: "fa-comments", title: "溝通橋樑", desc: "作為同學與老師之間的溝通橋樑，反映同學意見" },
  { icon: "fa-dollar", title: "財務管理", desc: "管理班費收支，確保班級資源合理使用" },
];

export default function Committee() {
  return (
    <Layout>
      {/* 頁面標題 */}
      <div className="bg-primary text-white py-10">
        <div className="container">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
            <Link href="/" className="hover:text-white">首頁</Link>
            <i className="fa fa-chevron-right text-xs" />
            <span>班會幹事</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">班會幹事</h1>
          <p className="text-blue-200 text-sm mt-1">現任 3D 班班會幹事名單</p>
        </div>
      </div>

      <div className="py-10">
        <div className="container">
          {/* 幹事職責 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {RESPONSIBILITIES.map(item => (
              <div key={item.title} className="bg-white rounded-xl border border-border p-4 text-center shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className={`fa ${item.icon} text-primary`} />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 幹事名單 */}
          <h2 className="text-xl font-bold text-foreground mb-6">現任幹事名單</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {COMMITTEE_MEMBERS.map(member => (
              <div key={member.name} className="bg-white rounded-xl border border-border shadow-sm p-5 text-center card-hover">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-3 border-muted shadow-sm">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{member.name}</h3>
                <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${member.badge}`}>
                  {member.role}
                </span>
                <p className="text-muted-foreground text-xs mt-2 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>

          {/* 聯絡班會 */}
          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="font-bold text-foreground mb-2">聯絡班會</h3>
            <p className="text-muted-foreground text-sm mb-4">如有任何班級事務或意見，歡迎透過以下方式聯繫班會幹事：</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.instagram.com/kywc_3d/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white border border-border px-4 py-2 rounded-lg text-sm hover:bg-primary/5 transition-colors">
                <i className="fa fa-instagram text-primary" /> Instagram: kywc_3d
              </a>
              <a href="https://wa.me/85292683237"
                className="flex items-center gap-2 bg-white border border-border px-4 py-2 rounded-lg text-sm hover:bg-primary/5 transition-colors">
                <i className="fa fa-whatsapp text-green-600" /> WhatsApp: 852 9268 3237
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
