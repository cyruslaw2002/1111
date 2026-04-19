// KYWC 3D班網 — 學校資訊頁面

import { Link } from "wouter";
import Layout from "@/components/Layout";

const SCHOOL_INFO = {
  name: "東華三院黃笏南中學",
  nameEn: "TWGHs Wong Fut Nam College",
  address: "香港九龍灣宏照道38號",
  phone: "2345 6789",
  fax: "2345 6780",
  email: "info@twghkywc.edu.hk",
  website: "https://www.twghkywc.edu.hk",
  principal: "校長（待更新）",
  founded: "1978年",
  type: "資助中學",
  gender: "男女校",
  religion: "無宗教",
  district: "黃大仙區",
};

const SCHOOL_LINKS = [
  { title: "學校官方網站", href: "https://www.twghkywc.edu.hk", icon: "fa-globe", desc: "查閱學校最新消息、活動及通告" },
  { title: "學校 Facebook", href: "#", icon: "fa-facebook", desc: "關注學校 Facebook 專頁獲取最新動態" },
  { title: "學校 Instagram", href: "#", icon: "fa-instagram", desc: "瀏覽學校 Instagram 相片分享" },
  { title: "學校電子郵件", href: "mailto:info@twghkywc.edu.hk", icon: "fa-envelope-o", desc: "透過電子郵件聯絡學校" },
];

const IMPORTANT_DATES = [
  { date: "2024-01-15", event: "第一學期考試開始", type: "exam" },
  { date: "2024-01-20", event: "第一學期考試結束", type: "exam" },
  { date: "2024-01-29", event: "農曆新年假期開始", type: "holiday" },
  { date: "2024-02-12", event: "農曆新年假期結束", type: "holiday" },
  { date: "2024-03-29", event: "耶穌受難節", type: "holiday" },
  { date: "2024-04-04", event: "清明節", type: "holiday" },
  { date: "2024-05-15", event: "第二學期考試開始", type: "exam" },
  { date: "2024-06-21", event: "學年結束", type: "general" },
];

export default function SchoolInfo() {
  return (
    <Layout>
      {/* 頁面標題 */}
      <div className="bg-primary text-white py-10">
        <div className="container">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
            <Link href="/" className="hover:text-white">首頁</Link>
            <i className="fa fa-chevron-right text-xs" />
            <span>學校資訊</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">學校資訊</h1>
          <p className="text-blue-200 text-sm mt-1">東華三院黃笏南中學基本資料</p>
        </div>
      </div>

      <div className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左側：學校基本資料 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 學校簡介 */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src="https://www.twghkywc.edu.hk/sites/default/files/sch_logo.png"
                    alt="學校標誌"
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{SCHOOL_INFO.name}</h2>
                    <p className="text-muted-foreground text-sm">{SCHOOL_INFO.nameEn}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "學校地址", value: SCHOOL_INFO.address, icon: "fa-map-marker" },
                    { label: "聯絡電話", value: SCHOOL_INFO.phone, icon: "fa-phone" },
                    { label: "傳真號碼", value: SCHOOL_INFO.fax, icon: "fa-fax" },
                    { label: "電子郵件", value: SCHOOL_INFO.email, icon: "fa-envelope-o" },
                    { label: "學校類型", value: SCHOOL_INFO.type, icon: "fa-building-o" },
                    { label: "辦學模式", value: SCHOOL_INFO.gender, icon: "fa-users" },
                    { label: "所屬地區", value: SCHOOL_INFO.district, icon: "fa-map-o" },
                    { label: "創校年份", value: SCHOOL_INFO.founded, icon: "fa-calendar" },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1.5 rounded mt-0.5">
                        <i className={`fa ${item.icon} text-primary text-xs`} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-border">
                  <a
                    href={SCHOOL_INFO.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <i className="fa fa-globe" /> 訪問學校官網
                  </a>
                </div>
              </div>

              {/* 重要日期 */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <h3 className="font-bold text-foreground mb-4">重要日期</h3>
                <div className="space-y-2">
                  {IMPORTANT_DATES.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${
                        item.type === "exam" ? "bg-red-100 text-red-700" :
                        item.type === "holiday" ? "bg-green-100 text-green-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {item.type === "exam" ? "考試" : item.type === "holiday" ? "假期" : "活動"}
                      </span>
                      <span className="text-muted-foreground text-xs w-24 flex-shrink-0">{item.date}</span>
                      <span className="text-sm text-foreground">{item.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 右側：快速連結 */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-border shadow-sm p-5">
                <h3 className="font-bold text-foreground mb-4">學校連結</h3>
                <div className="space-y-3">
                  {SCHOOL_LINKS.map(link => (
                    <a
                      key={link.title}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <i className={`fa ${link.icon} text-primary`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{link.title}</p>
                        <p className="text-xs text-muted-foreground">{link.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* 地圖 */}
              <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-bold text-foreground text-sm">學校位置</h3>
                  <p className="text-muted-foreground text-xs mt-0.5">{SCHOOL_INFO.address}</p>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.5!2d114.2!3d22.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE5JzQ4LjAiTiAxMTTCsDEyJzAwLjAiRQ!5e0!3m2!1szh-TW!2shk!4v1234567890"
                  className="w-full h-48"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="學校地圖"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
