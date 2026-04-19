// KYWC 3D班網 — 404 頁面
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa fa-exclamation-triangle text-3xl text-primary" />
        </div>
        <h1 className="text-6xl font-bold text-primary mb-3">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-3">找不到頁面</h2>
        <p className="text-muted-foreground text-sm mb-8">
          您所訪問的頁面不存在或已被移除。請返回首頁繼續瀏覽。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
        >
          <i className="fa fa-home" /> 返回首頁
        </Link>
      </div>
    </div>
  );
}
