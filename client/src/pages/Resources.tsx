// KYWC 3D班網 — 學習資源頁面

import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const SUBJECTS = [
  { key: "all", label: "全部科目" },
  { key: "chinese", label: "中文" },
  { key: "english", label: "英文" },
  { key: "math", label: "數學" },
  { key: "science", label: "理科" },
  { key: "humanities", label: "人文學科" },
];

const RESOURCES = [
  { id: 1, subject: "chinese", subjectLabel: "中文", title: "中文閱讀理解技巧", type: "筆記", date: "2023-12-01", desc: "整理常見閱讀理解題型及答題技巧，包括主旨歸納、段落分析等。", icon: "fa-file-text-o", color: "bg-red-100 text-red-700" },
  { id: 2, subject: "english", subjectLabel: "英文", title: "English Grammar Notes", type: "筆記", date: "2023-11-28", desc: "Comprehensive grammar notes covering tenses, conditionals, and reported speech.", icon: "fa-file-text-o", color: "bg-blue-100 text-blue-700" },
  { id: 3, subject: "math", subjectLabel: "數學", title: "代數方程練習題", type: "練習", date: "2023-11-25", desc: "包含一元二次方程、聯立方程等練習題，附有詳細解題步驟。", icon: "fa-calculator", color: "bg-green-100 text-green-700" },
  { id: 4, subject: "science", subjectLabel: "物理", title: "力學基礎概念", type: "筆記", date: "2023-11-20", desc: "牛頓三大定律、動量守恆、能量守恆等核心概念整理。", icon: "fa-flask", color: "bg-purple-100 text-purple-700" },
  { id: 5, subject: "science", subjectLabel: "化學", title: "化學反應方程式", type: "筆記", date: "2023-11-18", desc: "常見化學反應類型及方程式配平方法總結。", icon: "fa-flask", color: "bg-orange-100 text-orange-700" },
  { id: 6, subject: "humanities", subjectLabel: "歷史", title: "近代史重點整理", type: "筆記", date: "2023-11-15", desc: "香港近代史重要事件時間線及考試重點整理。", icon: "fa-book", color: "bg-amber-100 text-amber-700" },
  { id: 7, subject: "math", subjectLabel: "數學", title: "幾何圖形公式", type: "公式表", date: "2023-11-10", desc: "常用幾何圖形面積、周長、體積公式一覽表。", icon: "fa-table", color: "bg-green-100 text-green-700" },
  { id: 8, subject: "english", subjectLabel: "英文", title: "Writing Skills Workshop", type: "練習", date: "2023-11-08", desc: "Essay writing techniques and sample essays for HKDSE preparation.", icon: "fa-pencil", color: "bg-blue-100 text-blue-700" },
];

export default function Resources() {
  const [activeSubject, setActiveSubject] = useState("all");

  const filtered = activeSubject === "all"
    ? RESOURCES
    : RESOURCES.filter(r => r.subject === activeSubject);

  return (
    <Layout>
      {/* 頁面標題 */}
      <div className="bg-primary text-white py-10">
        <div className="container">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
            <Link href="/" className="hover:text-white">首頁</Link>
            <i className="fa fa-chevron-right text-xs" />
            <span>學習資源</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">學習資源</h1>
          <p className="text-blue-200 text-sm mt-1">課程大綱、教材補充、作業參考</p>
        </div>
      </div>

      <div className="py-10">
        <div className="container">
          {/* 科目篩選 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {SUBJECTS.map(sub => (
              <button
                key={sub.key}
                onClick={() => setActiveSubject(sub.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSubject === sub.key
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-foreground hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* 資源列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-border shadow-sm p-5 card-hover">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <i className={`fa ${item.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${item.color}`}>
                        {item.subjectLabel}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.type}</span>
                    </div>
                    <h3 className="font-semibold text-sm text-foreground leading-snug">{item.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">
                    <i className="fa fa-calendar-o mr-1" />{item.date}
                  </span>
                  <button className="text-primary text-xs font-medium hover:underline flex items-center gap-1">
                    <i className="fa fa-download" /> 下載
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <i className="fa fa-folder-open-o text-4xl mb-3 block" />
              <p>暫無相關資源</p>
            </div>
          )}

          {/* 提交資源 */}
          <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <i className="fa fa-upload text-2xl text-primary mb-3 block" />
            <h3 className="font-semibold text-foreground mb-2">分享學習資源</h3>
            <p className="text-muted-foreground text-sm mb-4">如有好的學習資料，歡迎分享給全班同學</p>
            <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
              提交資源
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
