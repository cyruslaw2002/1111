// KYWC 3D班網 — 班級相冊頁面

import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const ALBUMS = [
  {
    id: 1,
    title: "開學典禮",
    date: "2023-09-01",
    count: 12,
    cover: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    desc: "新學年開學典禮，全班同學齊聚一堂，共同迎接新的學年。",
  },
  {
    id: 2,
    title: "班際運動會",
    date: "2023-10-15",
    count: 28,
    cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
    desc: "全班同學積極參與班際運動會，展現體育精神。",
  },
  {
    id: 3,
    title: "戶外學習活動",
    date: "2023-11-08",
    count: 35,
    cover: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    desc: "班級戶外學習活動，探索大自然，增廣見聞。",
  },
  {
    id: 4,
    title: "聖誕聯歡會",
    date: "2023-12-22",
    count: 20,
    cover: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80",
    desc: "聖誕聯歡會，同學們表演節目，共度歡樂時光。",
  },
  {
    id: 5,
    title: "壁報設計比賽",
    date: "2023-11-20",
    count: 15,
    cover: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    desc: "3D班壁報設計比賽作品展示，創意無限。",
  },
  {
    id: 6,
    title: "班級合照",
    date: "2023-09-15",
    count: 5,
    cover: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    desc: "全班師生合照，留下美好回憶。",
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<typeof ALBUMS[0] | null>(null);

  return (
    <Layout>
      {/* 頁面標題 */}
      <div className="bg-primary text-white py-10">
        <div className="container">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-2">
            <Link href="/" className="hover:text-white">首頁</Link>
            <i className="fa fa-chevron-right text-xs" />
            <span>班級相冊</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">班級相冊</h1>
          <p className="text-blue-200 text-sm mt-1">記錄每一個珍貴的班級時刻</p>
        </div>
      </div>

      <div className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALBUMS.map(album => (
              <div
                key={album.id}
                className="bg-white rounded-xl border border-border shadow-sm overflow-hidden card-hover cursor-pointer"
                onClick={() => setSelected(album)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    <i className="fa fa-image mr-1" />{album.count} 張
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{album.title}</h3>
                  <p className="text-muted-foreground text-xs mb-2">
                    <i className="fa fa-calendar-o mr-1" />{album.date}
                  </p>
                  <p className="text-muted-foreground text-sm line-clamp-2">{album.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 相冊詳情 Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <img src={selected.cover} alt={selected.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
              >
                <i className="fa fa-times" />
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-foreground mb-1">{selected.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">
                <i className="fa fa-calendar-o mr-1" />{selected.date}
                <span className="ml-3"><i className="fa fa-image mr-1" />{selected.count} 張相片</span>
              </p>
              <p className="text-muted-foreground text-sm">{selected.desc}</p>
              <p className="text-muted-foreground text-xs mt-4 italic">（相片功能開發中，敬請期待）</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
