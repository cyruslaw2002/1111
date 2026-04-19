// KYWC 3D班網 — 班主任帳號管理介面
// 功能：新增學生帳號、管理帳號、刪除帳號

import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 獲取所有學生帳號
  const { data: students = [] } = trpc.admin.getStudents.useQuery();

  // 新增學生帳號
  const createStudentMutation = trpc.admin.createStudent.useMutation({
    onSuccess: () => {
      setMessage({ type: "success", text: "帳號建立成功！" });
      setFormData({ email: "", password: "", displayName: "" });
      setShowAddForm(false);
      // 重新獲取學生列表
      trpc.useUtils().admin.getStudents.invalidate();
    },
    onError: (error: any) => {
      setMessage({ type: "error", text: error.message || "帳號建立失敗" });
    },
  });

  // 刪除學生帳號
  const deleteStudentMutation = trpc.admin.deleteStudent.useMutation({
    onSuccess: () => {
      setMessage({ type: "success", text: "帳號已刪除" });
      trpc.useUtils().admin.getStudents.invalidate();
    },
    onError: (error: any) => {
      setMessage({ type: "error", text: error.message || "刪除失敗" });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStudentMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (uid: string, email: string) => {
    if (confirm(`確定要刪除帳號 ${email} 嗎？`)) {
      deleteStudentMutation.mutate({ uid });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 頁面標題 */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">帳號管理</h1>
          <p className="text-muted-foreground mt-1">管理班級學生登入帳號</p>
        </div>

        {/* 訊息提示 */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* 新增帳號按鈕 */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-secondary transition-colors"
        >
          <i className="fa fa-plus" /> 新增學生帳號
        </button>

        {/* 新增帳號表單 */}
        {showAddForm && (
          <div className="bg-white rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">新增學生帳號</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  學生名字
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="例：張三"
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  電郵
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="例：student@example.com"
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  密碼
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="至少 6 個字符"
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                  minLength={6}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-60"
                >
                  {loading ? "建立中..." : "建立帳號"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border border-border text-foreground py-2.5 rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 學生帳號列表 */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted">
            <h2 className="font-bold text-foreground">現有學生帳號（{students.length}）</h2>
          </div>

          {students.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <i className="fa fa-users text-3xl mb-3 block" />
              <p>暫無學生帳號</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="px-6 py-3 text-left font-semibold">名字</th>
                    <th className="px-6 py-3 text-left font-semibold">電郵</th>
                    <th className="px-6 py-3 text-left font-semibold">建立日期</th>
                    <th className="px-6 py-3 text-left font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student: any) => (
                    <tr key={student.uid} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-3 font-medium text-foreground">{student.displayName || "—"}</td>
                      <td className="px-6 py-3 text-foreground">{student.email}</td>
                      <td className="px-6 py-3 text-muted-foreground text-xs">
                        {new Date(student.createdAt).toLocaleDateString("zh-HK")}
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleDelete(student.uid, student.email)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          <i className="fa fa-trash-o mr-1" /> 刪除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
