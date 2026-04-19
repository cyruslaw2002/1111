// KYWC 3D班網 — 登入頁面（Firebase Authentication）
// 設計：港式制服藍，簡潔登入表單，帶學校 Logo

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import type { Auth } from "firebase/auth";
import { 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  initializeAuth,
  browserLocalPersistence,
  setPersistence
} from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase 配置
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// 初始化 Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth: Auth = initializeAuth(firebaseApp, {
  persistence: browserLocalPersistence,
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    // 檢查用戶是否已登入
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      const errorCode = err.code;
      let errorMessage = "登入失敗，請檢查電郵和密碼。";

      if (errorCode === "auth/user-not-found") {
        errorMessage = "該電郵帳號不存在。";
      } else if (errorCode === "auth/wrong-password") {
        errorMessage = "密碼錯誤，請重試。";
      } else if (errorCode === "auth/invalid-email") {
        errorMessage = "電郵格式無效。";
      } else if (errorCode === "auth/user-disabled") {
        errorMessage = "該帳號已被停用。";
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* 卡片 */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* 頂部藍色橫幅 */}
          <div className="bg-primary px-8 py-8 text-center">
            <img
              src="https://www.twghkywc.edu.hk/sites/default/files/sch_logo.png"
              alt="KYWC學校標誌"
              className="w-16 h-16 mx-auto mb-3 object-contain"
            />
            <h1 className="text-white text-xl font-bold">KYWC 3D班網</h1>
            <p className="text-blue-200 text-sm mt-1">東華三院黃笏南中學</p>
          </div>

          {/* 表單區域 */}
          <div className="px-8 py-8">
            <h2 className="text-lg font-bold text-foreground mb-6 text-center">登入班級網站</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-5">
                <i className="fas fa-exclamation-circle mr-2" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  電郵
                </label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="請輸入電郵"
                    className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  密碼
                </label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="請輸入密碼"
                    className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-medium text-sm hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner fa-spin" /> 登入中...
                  </span>
                ) : (
                  "登入"
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg text-xs text-muted-foreground">
              <p className="font-medium mb-1">首次登入？</p>
              <p>請聯繫班主任以獲取登入帳號。班主任可在管理介面新增學生帳號。</p>
            </div>
          </div>
        </div>

        <p className="text-center text-blue-200 text-xs mt-6">
          &copy; 2025 KYWC 3D班網 · 東華三院黃笏南中學
        </p>
      </div>
    </div>
  );
}
