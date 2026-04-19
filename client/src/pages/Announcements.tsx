// KYWC 3D班網 — 最新公告頁面

import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const ALL_ANNOUNCEMENTS = [
  { id: 1, title: "期末考試安排通知", date: "2023-12-15", author: "班導師", category: "exam", tag: "考試", content: "期末考試將於1月15日至1月20日舉行，請同學們提前作好準備，合理安排溫習時間。具體考試時間表已上傳至班級群組，請各位同學留意。考試期間請準時到達考場，並攜帶所需文具及學生證。" },
  { id: 2, title: "聖誕聯歡活動籌備", date: "2023-12-10", author: "班會幹事", category: "activity", tag: "活動", content: "聖誕聯歡活動將於12月22日下午舉行，現開始收集節目和遊戲提案，有意參與策劃的同學請聯繫班長。活動包括表演節目、小遊戲及交換禮物環節，請各位同學積極參與。" },
  { id: 3, title: "校園義工招募", date: "2023-12-05", author: "服務學習組", category: "activity", tag: "義工", content: "學校將於12月24日組織校園義工活動，協助社區老人中心舉辦聖誕派對，歡迎同學們踴躍報名參加。義工活動時間為上午10時至下午3時，請有意參加的同學於12月15日前向班長報名。" },
  { id: 4, title: "第一次段考成績公佈", date: "2023-11-28", author: "班導師", category: "exam", tag: "考試", content: "第一次段考成績已公佈，請同學們查閱學校系統。如有疑問請於辦公時間聯繫各科任老師。" },
  { id: 5, title: "班際歌唱比賽通知", date: "2023-11-20", author: "學生會", category: "activity", tag: "活動", content: "本學期班際歌唱比賽將於12月8日舉行，歡迎有興趣的同學報名參加。報名截止日期為11月30日，請聯繫班長報名。" },
  { id: 6, title: "圖書館借閱提醒", date: "2023-11-15", author: "圖書館", category: "general", tag: "通知", content: "學期末圖書館借閱截止日期為12月20日，請各位同學及時歸還借閱的書籍，逾期將收取罰款。" },
];

const CATEGORIES = [
  { key: "all", label: "全部" },
  { key: "exam", label: "考試資訊" },
  { key: "activity", label: "活動通知" },
  { key: "general", label: "一般通知" },
];

export default function Announcements() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? ALL_ANNOUNCEMENTS
    : ALL_ANNOUNCEMENTS.filter(a => a.category === activeCategory);

  return (
    <Layout>
      {/* 頁面標題 */}
      <div className="bg-primary text-white py-10">
        <div className="container">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
            <Link href="/" className="hover:text-white">首頁</Link>
            <i className="fa fa-chevron-right text-xs" />
            <span>最新公告</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">最新公告</h1>
          <p className="text-blue-200 text-sm mt-1">班級最新消息與通知</p>
        </div>
      </div>

      <div className="py-10">
        <div className="container">
          {/* 分類篩選 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.key
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-foreground hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 公告列表 */}
          <div className="space-y-4">
            {filtered.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-border shadow-sm p-6 card-hover">
                <div className="flex flex-wrap items-start gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    item.tag === "考試" ? "bg-red-100 text-red-700" :
                    item.tag === "活動" ? "bg-blue-100 text-blue-700" :
                    item.tag === "義工" ? "bg-green-100 text-green-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {item.tag}
                  </span>
                  <h3 className="text-base md:text-lg font-semibold text-primary">{item.title}</h3>
                </div>
                <div className="text-muted-foreground text-xs mb-3 flex gap-3">
                  <span><i className="fa fa-calendar-o mr-1" />{item.date}</span>
                  <span><i className="fa fa-user-o mr-1" />{item.author}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <i className="fa fa-inbox text-4xl mb-3 block" />
              <p>暫無相關公告</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
