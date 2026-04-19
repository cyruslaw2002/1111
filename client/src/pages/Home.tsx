// KYWC 3D班網 — 主頁面
// 設計：港式制服藍
// 包含：Hero 輪播、最新公告、關於我們（班主任、班會幹事、時間表）、快速連結、意見反映、聯絡我們

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const HERO_SLIDES = [
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663574466402/GZmLdjYrSbc9YNMv2Rbaz3/hero1_classroom-5PfMUpir6KaoWBYAoQYE5J.webp",
    title: "3D壁報設計",
    desc: "承夢前行創輝煌，繼往開來展未來，校慶共築夢想之路。",
    btnLabel: "設計預覽",
    btnHref: "#",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663574466402/GZmLdjYrSbc9YNMv2Rbaz3/hero2_campus-axkPQgTMiVvzYXxk4rongM.webp",
    title: "班級相簿",
    desc: "班級相簿是我們共同的回憶，記錄著每一個珍貴的瞬間，讓我們一起珍惜這些美好的時光。",
    btnLabel: "進入相簿",
    btnHref: "/gallery",
  },
  {
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663574466402/GZmLdjYrSbc9YNMv2Rbaz3/hero3_activity-Wy3Gt7uyXQ84br6d9ULCd9.webp",
    title: "學生服務中心",
    desc: "課業輔導、生活諮詢、獎助學金申請一站式服務",
    btnLabel: "服務一覽",
    btnHref: "#links",
  },
];

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "期末考試安排通知",
    date: "2023-12-15",
    author: "班導師",
    content: "期末考試將於1月15日至1月20日舉行，請同學們提前作好準備，合理安排溫習時間。具體考試時間表已上傳至班級群組。",
    tag: "考試",
  },
  {
    id: 2,
    title: "聖誕聯歡活動籌備",
    date: "2023-12-10",
    author: "班會幹事",
    content: "聖誕聯歡活動將於12月22日下午舉行，現開始收集節目和遊戲提案，有意參與策劃的同學請聯繫班長。",
    tag: "活動",
  },
  {
    id: 3,
    title: "校園義工招募",
    date: "2023-12-05",
    author: "服務學習組",
    content: "學校將於12月24日組織校園義工活動，協助社區老人中心舉辦聖誕派對，歡迎同學們踴躍報名參加。",
    tag: "義工",
  },
];

const TEACHERS = [
  {
    name: "吳凱翎老師",
    role: "班主任 | 英文老師 | 歷史老師",
    img: "https://cdn-icons-png.flaticon.com/512/12034/12034958.png",
  },
  {
    name: "黃勁權老師",
    role: "班主任 | 數學科老師",
    img: "https://cdn-icons-png.flaticon.com/512/12034/12034946.png",
  },
];

const COMMITTEE = [
  { name: "許紫妮", role: "班長", desc: "班級管理與領導", img: "https://cdn-icons-png.flaticon.com/512/4478/4478358.png" },
  { name: "阮文謙", role: "班長", desc: "班級管理與領導", img: "https://cdn-icons-png.flaticon.com/512/4478/4478344.png" },
  { name: "曾泯豪", role: "班長", desc: "班級管理與領導", img: "https://cdn-icons-png.flaticon.com/512/4478/4478344.png" },
  { name: "梁穎珈", role: "班會主席", desc: "主持會議及帶領班會", img: "https://cdn-icons-png.flaticon.com/512/4478/4478358.png" },
  { name: "羅卓熹", role: "班會康樂", desc: "策劃及組織班級活動", img: "https://cdn-icons-png.flaticon.com/512/4478/4478344.png" },
  { name: "敖塇苗", role: "班會文書", desc: "負責班會文件及記錄", img: "https://cdn-icons-png.flaticon.com/512/4478/4478358.png" },
  { name: "范琇瑜", role: "班會總務", desc: "管理班會資源分配", img: "https://cdn-icons-png.flaticon.com/512/4478/4478358.png" },
  { name: "鍾卓軒", role: "班會財政", desc: "負責班會財政管理", img: "https://cdn-icons-png.flaticon.com/512/4478/4478344.png" },
  { name: "葉梓淇", role: "班會美術", desc: "負責班會視覺設計", img: "https://cdn-icons-png.flaticon.com/512/4478/4478358.png" },
];

const TIMETABLE = [
  { time: "上午 8:00-8:10", isBreak: true, label: "早會", days: [] },
  { time: "上午 8:10-8:30", isBreak: true, label: "班主任", days: [] },
  { time: "上午 8:30-9:05", isBreak: false, days: ["物理","歷史","生物","價值教育","英文","數學","中史","英文","英文","歷史"] },
  { time: "上午 9:05-9:40", isBreak: false, days: ["物理","數學","生物","價值教育","英文","數學","數學","英文","英文","公經社"] },
  { time: "上午 9:40-10:00", isBreak: true, label: "小息", days: [] },
  { time: "上午 10:00-10:35", isBreak: false, days: ["地理","中文","體育","英文","歷史","綜合科技","學習技能","體育","數學","中文"] },
  { time: "上午 10:35-11:10", isBreak: false, days: ["普通電腦","中文","體育","英文","數學","公經社","中文","體育","數學","中文"] },
  { time: "上午 11:10-11:45", isBreak: false, days: ["中史","生物","中史","音樂","數學","中文","普通電腦","地理","視藝","化學"] },
  { time: "上午 11:45-12:00", isBreak: true, label: "小息", days: [] },
  { time: "下午 12:00-12:35", isBreak: false, days: ["中文","綜合科技","數學","中文","視藝","英文","化學","數學","音樂","英文"] },
  { time: "下午 12:35-13:10", isBreak: false, days: ["中文","綜合科技","數學","中文","視藝","英文","化學","數學","綜合科技","英文"] },
  { time: "下午 13:10-14:15", isBreak: true, label: "午膳", days: [] },
  { time: "下午 14:15-14:20", isBreak: true, label: "點名時段", days: [] },
  { time: "下午 14:20-14:55", isBreak: false, days: ["英文","視藝","英文","地理","中文","歷史","中文","中文","中文","全方"] },
  { time: "下午 14:55-15:30", isBreak: false, days: ["英文","視藝","英文","數學","物理","中史","地理","中文","中文","全方"] },
  { time: "下午 15:30-15:45", isBreak: true, label: "班主任節", days: [] },
];

const QUICK_LINKS = [
  { icon: "fa-book", title: "學習資源", desc: "提供課程大綱、教材補充、作業參考等學習資源。", href: "/resources", label: "學習資源" },
  { icon: "fa-camera", title: "班級相冊", desc: "瀏覽班級活動相片、合照，記錄美好回憶。", href: "/gallery", label: "瀏覽相簿" },
  { icon: "fa-users", title: "班會幹事", desc: "負責班級事務的學生代表，協助班主任管理班級活動。", href: "/committee", label: "查看幹事名單" },
  { icon: "fa-info-circle", title: "學校資訊", desc: "查閱學校最新動態、活動資訊等內容。", href: "/info", label: "學校資訊" },
];

// 科目顏色映射
const SUBJECT_COLORS: Record<string, string> = {
  "中文": "bg-red-50 text-red-700",
  "英文": "bg-blue-50 text-blue-700",
  "數學": "bg-green-50 text-green-700",
  "物理": "bg-purple-50 text-purple-700",
  "化學": "bg-orange-50 text-orange-700",
  "生物": "bg-teal-50 text-teal-700",
  "歷史": "bg-amber-50 text-amber-700",
  "中史": "bg-yellow-50 text-yellow-700",
  "地理": "bg-cyan-50 text-cyan-700",
  "公經社": "bg-indigo-50 text-indigo-700",
  "視藝": "bg-pink-50 text-pink-700",
  "音樂": "bg-violet-50 text-violet-700",
  "體育": "bg-lime-50 text-lime-700",
  "普通電腦": "bg-sky-50 text-sky-700",
  "綜合科技": "bg-emerald-50 text-emerald-700",
  "價值教育": "bg-rose-50 text-rose-700",
  "學習技能": "bg-fuchsia-50 text-fuchsia-700",
  "全方": "bg-gray-50 text-gray-700",
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
  };

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goToSlide = (idx: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentSlide(idx);
    startInterval();
  };

  const prevSlide = () => goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlide = () => goToSlide((currentSlide + 1) % HERO_SLIDES.length);

  return (
    <Layout>
      {/* ===== HERO 輪播 ===== */}
      <section id="home" className="relative h-[280px] sm:h-[380px] md:h-[480px] lg:h-[560px] overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/75 to-primary/20 z-10" />
            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container">
                <div className="max-w-lg text-white">
                  <h2 className="text-[clamp(1.4rem,4vw,2.8rem)] font-bold leading-tight mb-3 drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-[clamp(0.8rem,2vw,1rem)] mb-5 text-white/90 leading-relaxed">
                    {slide.desc}
                  </p>
                  <Link
                    href={slide.btnHref}
                    className="inline-flex items-center gap-2 bg-white text-primary font-medium px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    {slide.btnLabel} <i className="fa fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 控制按鈕 */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors"
          aria-label="上一張"
        >
          <i className="fa fa-chevron-left" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors"
          aria-label="下一張"
        >
          <i className="fa fa-chevron-right" />
        </button>

        {/* 指示點 */}
        <div className="absolute bottom-5 left-0 right-0 z-30 flex justify-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? "bg-white scale-110" : "bg-white/50"}`}
              aria-label={`跳至第 ${idx + 1} 張`}
            />
          ))}
        </div>
      </section>

      {/* ===== 最新公告 ===== */}
      <section id="announcements" className="py-12 md:py-16 bg-muted scroll-mt-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">最新公告</h2>
          <div className="section-divider" />

          <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8 mt-2">
            <div className="space-y-0">
              {ANNOUNCEMENTS.map((item, idx) => (
                <div
                  key={item.id}
                  className={`py-5 ${idx < ANNOUNCEMENTS.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="flex flex-wrap items-start gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      item.tag === "考試" ? "bg-red-100 text-red-700" :
                      item.tag === "活動" ? "bg-blue-100 text-blue-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {item.tag}
                    </span>
                    <h3 className="text-base md:text-lg font-semibold text-primary">{item.title}</h3>
                  </div>
                  <div className="text-muted-foreground text-xs mb-2 flex gap-3">
                    <span><i className="fa fa-calendar-o mr-1" />{item.date}</span>
                    <span><i className="fa fa-user-o mr-1" />{item.author}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link
                href="/announcements"
                className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                查看全部公告 <i className="fa fa-list-ul" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 關於我們 ===== */}
      <section id="about" className="py-12 md:py-16 bg-white scroll-mt-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">關於我們</h2>
          <div className="section-divider" />

          {/* 班主任 */}
          <div id="about-teachers" className="mt-12 scroll-mt-20">
            <h3 className="text-xl font-semibold text-center mb-8 text-foreground">班主任</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl mx-auto">
              {TEACHERS.map(teacher => (
                <div key={teacher.name} className="text-center group">
                  <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden border-4 border-primary/20 shadow-md group-hover:border-primary/40 transition-colors">
                    <img src={teacher.img} alt={teacher.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-semibold text-base text-foreground">{teacher.name}</h4>
                  <p className="text-primary text-sm mt-1">{teacher.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 班會幹事 */}
          <div id="about-committee" className="mt-16 scroll-mt-20">
            <h3 className="text-xl font-semibold text-center mb-8 text-foreground">現任班會幹事</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {COMMITTEE.map(member => (
                <div key={member.name} className="text-center group">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-3 border-muted shadow-sm group-hover:border-primary/30 transition-colors">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground">{member.name}</h4>
                  <p className="text-primary text-xs mt-0.5">{member.role}</p>
                  <p className="text-muted-foreground text-xs">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 班級上課時間表 */}
          <div id="about-timetable" className="mt-16 scroll-mt-20">
            <h3 className="text-xl font-semibold text-center mb-8 text-foreground">班級上課時間表</h3>
            <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
              <table className="w-full text-xs border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-3 py-2.5 text-left font-semibold min-w-[130px] border-r border-primary/30">上課時間</th>
                    {Array.from({ length: 10 }, (_, i) => (
                      <th key={i} className="px-2 py-2.5 text-center font-semibold min-w-[70px] border-r border-primary/30 last:border-r-0">
                        第{["一","二","三","四","五","六","七","八","九","十"][i]}日
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIMETABLE.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className={`border-b border-border ${row.isBreak ? "bg-primary/5" : rowIdx % 2 === 0 ? "bg-white" : "bg-muted/30"} hover:bg-primary/5 transition-colors`}
                    >
                      <td className="px-3 py-2 font-medium text-foreground border-r border-border whitespace-nowrap">
                        {row.time}
                      </td>
                      {row.isBreak ? (
                        <td colSpan={10} className="px-2 py-2 text-center text-muted-foreground font-medium">
                          {row.label}
                        </td>
                      ) : (
                        row.days.map((subject, dayIdx) => (
                          <td key={dayIdx} className="px-1 py-1.5 text-center border-r border-border last:border-r-0">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-xs ${SUBJECT_COLORS[subject] || "bg-gray-50 text-gray-600"}`}>
                              {subject}
                            </span>
                          </td>
                        ))
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 快速連結 ===== */}
      <section id="links" className="py-12 md:py-16 bg-muted scroll-mt-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">快速連結</h2>
          <div className="section-divider" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
            {QUICK_LINKS.map(item => (
              <div key={item.title} className="bg-white p-5 rounded-xl border border-border shadow-sm flex flex-col sm:flex-row gap-4 card-hover">
                <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <i className={`fa ${item.icon} text-lg text-primary`} />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-base font-semibold mb-1 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{item.desc}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:underline"
                  >
                    {item.label} <i className="fa fa-arrow-right text-xs" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 意見反映 ===== */}
      <section id="suggestion" className="py-12 md:py-16 bg-primary text-white scroll-mt-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">意見反映</h2>
            <div className="w-12 h-0.5 bg-white/50 mx-auto mb-4" />
            <p className="text-blue-200 text-sm">需以學校電郵登入填寫 Google Form</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdqXdGJAw1RHhhFII2oKppML-DPgblundpYjLs6GrW-AHozzw/viewform?embedded=true"
              className="w-full min-h-[580px] bg-white rounded-xl shadow-lg"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="意見反映表格"
            >
              載入中...
            </iframe>
          </div>
        </div>
      </section>

      {/* ===== 聯絡我們 ===== */}
      <section id="contact" className="py-12 md:py-16 bg-muted scroll-mt-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">聯絡我們</h2>
          <div className="section-divider" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            {/* 聯絡信息 */}
            <div className="bg-white rounded-xl border border-border shadow-sm p-6 md:p-7">
              <h3 className="text-lg font-bold text-primary mb-5">聯絡信息</h3>
              <div className="space-y-4">
                {[
                  { icon: "fa-map-marker", title: "學校地址", content: "香港九龍灣宏照道38號" },
                  { icon: "fa-phone", title: "聯絡電話", content: "2345 6789" },
                  { icon: "fa-envelope-o", title: "電子郵箱", content: "3d@kywc.edu.hk" },
                  { icon: "fa-clock-o", title: "上課時間", content: "星期一至星期五：上午八時至下午四時" },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0 mt-0.5">
                      <i className={`fa ${item.icon} text-primary text-sm`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground text-sm mt-0.5">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-sm text-foreground mb-3">關注我們</h4>
                <div className="flex gap-2">
                  {[
                    { icon: "fa-facebook", href: "#" },
                    { icon: "fa-instagram", href: "https://www.instagram.com/kywc_3d/" },
                    { icon: "fa-whatsapp", href: "https://wa.me/85292683237" },
                  ].map(social => (
                    <a
                      key={social.icon}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <i className={`fa ${social.icon} text-sm`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 班級合照 */}
            <div className="bg-white rounded-xl border border-border shadow-sm p-6 md:p-7">
              <h3 className="text-lg font-bold text-primary mb-5">班級合照</h3>
              <div className="w-full rounded-lg overflow-hidden bg-muted aspect-video flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <i className="fa fa-users text-4xl mb-3 block" />
                  <p className="text-sm">3D班集體合照</p>
                  <p className="text-xs mt-1">記錄著全班同學的美好回憶</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm text-center mt-4">
                這是我們3D班的集體合照，記錄著全班同學的美好回憶。
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
