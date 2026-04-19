// KYWC 3D班網 — 考試資訊頁面

import { Link } from "wouter";
import Layout from "@/components/Layout";

const EXAM_SCHEDULE = [
  { date: "2024-01-15", day: "星期一", subject: "中文", time: "08:30 - 10:30", room: "課室", notes: "作文及閱讀理解" },
  { date: "2024-01-16", day: "星期二", subject: "英文", time: "08:30 - 10:30", room: "課室", notes: "Paper 1 & Paper 2" },
  { date: "2024-01-17", day: "星期三", subject: "數學", time: "08:30 - 10:30", room: "課室", notes: "Paper 1 & Paper 2" },
  { date: "2024-01-18", day: "星期四", subject: "物理", time: "08:30 - 09:45", room: "課室", notes: "—" },
  { date: "2024-01-18", day: "星期四", subject: "化學", time: "10:00 - 11:15", room: "課室", notes: "—" },
  { date: "2024-01-19", day: "星期五", subject: "生物", time: "08:30 - 09:45", room: "課室", notes: "—" },
  { date: "2024-01-19", day: "星期五", subject: "歷史", time: "10:00 - 11:15", room: "課室", notes: "—" },
  { date: "2024-01-20", day: "星期六", subject: "中史", time: "08:30 - 09:45", room: "課室", notes: "—" },
  { date: "2024-01-20", day: "星期六", subject: "地理", time: "10:00 - 11:15", room: "課室", notes: "—" },
];

const EXAM_TIPS = [
  { icon: "fa-clock-o", title: "準時到達", desc: "考試前15分鐘到達考場，遲到超過30分鐘不得入場" },
  { icon: "fa-id-card-o", title: "攜帶證件", desc: "必須攜帶學生證，否則不得參加考試" },
  { icon: "fa-pencil", title: "文具準備", desc: "自備鉛筆、原子筆、橡皮擦、尺等文具" },
  { icon: "fa-mobile-phone", title: "電子設備", desc: "考試期間禁止使用手機及任何電子設備" },
];

const SUBJECT_COLORS: Record<string, string> = {
  "中文": "bg-red-100 text-red-700",
  "英文": "bg-blue-100 text-blue-700",
  "數學": "bg-green-100 text-green-700",
  "物理": "bg-purple-100 text-purple-700",
  "化學": "bg-orange-100 text-orange-700",
  "生物": "bg-teal-100 text-teal-700",
  "歷史": "bg-amber-100 text-amber-700",
  "中史": "bg-yellow-100 text-yellow-700",
  "地理": "bg-cyan-100 text-cyan-700",
};

export default function ExamInfo() {
  return (
    <Layout>
      {/* 頁面標題 */}
      <div className="bg-primary text-white py-10">
        <div className="container">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
            <Link href="/" className="hover:text-white">首頁</Link>
            <i className="fa fa-chevron-right text-xs" />
            <span>考試資訊</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">考試資訊</h1>
          <p className="text-blue-200 text-sm mt-1">第一學期期末考試時間表及注意事項</p>
        </div>
      </div>

      <div className="py-10">
        <div className="container">
          {/* 考試注意事項 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {EXAM_TIPS.map(tip => (
              <div key={tip.title} className="bg-white rounded-xl border border-border p-4 shadow-sm">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2">
                  <i className={`fa ${tip.icon} text-red-600`} />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{tip.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>

          {/* 考試時間表 */}
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-primary/5">
              <h2 className="font-bold text-foreground">第一學期期末考試時間表</h2>
              <p className="text-muted-foreground text-sm mt-0.5">2024年1月15日至1月20日</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-3 text-left font-semibold">日期</th>
                    <th className="px-4 py-3 text-left font-semibold">星期</th>
                    <th className="px-4 py-3 text-left font-semibold">科目</th>
                    <th className="px-4 py-3 text-left font-semibold">時間</th>
                    <th className="px-4 py-3 text-left font-semibold">地點</th>
                    <th className="px-4 py-3 text-left font-semibold">備注</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAM_SCHEDULE.map((exam, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-border ${idx % 2 === 0 ? "bg-white" : "bg-muted/30"} hover:bg-primary/5 transition-colors`}
                    >
                      <td className="px-4 py-3 text-foreground font-medium">{exam.date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{exam.day}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${SUBJECT_COLORS[exam.subject] || "bg-gray-100 text-gray-700"}`}>
                          {exam.subject}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground">{exam.time}</td>
                      <td className="px-4 py-3 text-muted-foreground">{exam.room}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{exam.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 溫習建議 */}
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="font-bold text-foreground mb-3">
              <i className="fa fa-lightbulb-o text-primary mr-2" />溫習建議
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <i className="fa fa-check-circle text-primary mt-0.5 flex-shrink-0" />
                制定合理的溫習計劃，均衡分配各科溫習時間
              </li>
              <li className="flex items-start gap-2">
                <i className="fa fa-check-circle text-primary mt-0.5 flex-shrink-0" />
                多做練習題，熟悉考試題型及答題格式
              </li>
              <li className="flex items-start gap-2">
                <i className="fa fa-check-circle text-primary mt-0.5 flex-shrink-0" />
                如有疑問，及時向老師或同學請教
              </li>
              <li className="flex items-start gap-2">
                <i className="fa fa-check-circle text-primary mt-0.5 flex-shrink-0" />
                保持充足睡眠，考試前一晚不要熬夜溫習
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
